import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  popupCampaignDefaults,
  popupPublishedCampaignSchema,
} from "../../../vendor/cosmetics-contracts/index.js";
import {
  pageContext,
  copyCampaignText,
  resolveCampaignQueue,
  resolveIncomingCampaign,
  triggerIsImmediate,
  triggerMatchesEvent,
} from "./campaign-runtime";
import {
  clientFrequencyAllows,
  attributableCampaign,
  clearAttribution,
  history,
  markSessionShown,
  recordAttribution,
  updateHistory,
} from "./campaign-storage";

const campaign = (patch: Record<string, unknown> = {}) =>
  popupPublishedCampaignSchema.parse({
    id: "1ea4ff7b-c507-42e5-bd0b-d3530f7509dd",
    variantId: "468f5a74-e056-44f6-9d52-20fef8acf55e",
    version: 1,
    type: popupCampaignDefaults.type,
    priority: 50,
    startsAt: null,
    endsAt: null,
    timezone: "Africa/Cairo",
    recurringSchedule: null,
    presentation: popupCampaignDefaults.presentation,
    appearance: popupCampaignDefaults.appearance,
    targeting: popupCampaignDefaults.targeting,
    trigger: popupCampaignDefaults.trigger,
    frequency: popupCampaignDefaults.frequency,
    collision: popupCampaignDefaults.collision,
    primaryAction: popupCampaignDefaults.primaryAction,
    secondaryAction: popupCampaignDefaults.secondaryAction,
    form: popupCampaignDefaults.form,
    countdown: popupCampaignDefaults.countdown,
    content: popupCampaignDefaults.variants[0]?.content[0],
    direction: "ltr",
    image: null,
    coupon: null,
    product: null,
    category: null,
    ...patch,
  });

const context = {
  locale: "en" as const,
  device: "mobile" as const,
  page: pageContext("/", ""),
  visitor: {
    visitorId: "088f8678-3714-4c6b-a4c4-2702e32905a3",
    sessionId: "ed1925a9-197f-4702-a1d8-782657478027",
    firstVisit: false,
    returning: true,
    pageViews: 3,
    sessionStartedAt: "2026-08-13T10:00:00.000Z",
    referrerDomain: null,
    utmSource: null,
    utmCampaign: null,
  },
  cart: {
    total: 85_000,
    itemCount: 2,
    productIds: [],
    categoryIds: [],
    couponCode: null,
  },
  behavior: { productViews: [] },
  previewToken: null,
};

describe("campaign runtime", () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });
  it("maps SPA routes without browser globals", () => {
    expect(pageContext("/product/serum", "?lang=ar").type).toBe("PRODUCT");
    expect(pageContext("/categories/skincare", "").categorySlug).toBe("skincare");
    expect(
      pageContext("/categories/skincare", "", {
        categoryId: "20447552-7b3b-4caa-81f7-8c987627816e",
        categorySlug: "skincare",
        categoryName: "Skincare",
      }),
    ).toMatchObject({
      categoryId: "20447552-7b3b-4caa-81f7-8c987627816e",
      categoryName: "Skincare",
    });
    expect(pageContext("/categories", "").type).toBe("CATEGORY");
    expect(pageContext("/shop", "?search=serum").type).toBe("SEARCH");
    expect(pageContext("/checkout", "").type).toBe("CHECKOUT");
  });

  it("handles page-view, session and cart-threshold triggers", () => {
    expect(
      triggerIsImmediate(
        campaign({ trigger: { type: "PAGE_VIEWS", pageViewCount: 3 } }),
        context,
        5,
      ),
    ).toBe(true);
    expect(
      triggerIsImmediate(
        campaign({ trigger: { type: "CART_THRESHOLD", cartThreshold: 100_000 } }),
        context,
        5,
      ),
    ).toBe(false);
    expect(
      triggerIsImmediate(
        campaign({ trigger: { type: "SESSION_DURATION", sessionDurationSeconds: 90 } }),
        context,
        90,
      ),
    ).toBe(true);
  });

  it("matches add/remove/custom events exactly", () => {
    expect(
      triggerMatchesEvent(campaign({ trigger: { type: "ADD_TO_CART" } }), {
        name: "product_added_to_cart",
      }),
    ).toBe(true);
    expect(
      triggerMatchesEvent(
        campaign({
          trigger: {
            type: "ADD_TO_CART",
            categoryIds: ["3be086d2-e042-4762-8040-ae803a0cc24e"],
          },
        }),
        {
          name: "product_added_to_cart",
          categoryId: "55a5d8c8-e29a-41ba-9aef-052e9e3d0abf",
        },
      ),
    ).toBe(false);
    expect(
      triggerMatchesEvent(
        campaign({ trigger: { type: "CUSTOM_EVENT", eventName: "quiz_finished" } }),
        { name: "quiz_finished" },
      ),
    ).toBe(true);
  });

  it("copies coupon text with a safe fallback when Clipboard API is unavailable", async () => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText: vi.fn().mockRejectedValue(new Error("blocked")) },
    });
    document.execCommand = vi.fn().mockReturnValue(true);
    await expect(copyCampaignText("WELCOME10")).resolves.toBe(true);
    expect(document.execCommand).toHaveBeenCalledWith("copy");
    expect(document.querySelector("textarea")).toBeNull();
  });

  it("always produces one priority winner and suppresses critical conflicts", () => {
    const critical = campaign({
      id: "e11d2c2a-31f5-4166-bb25-6198998218db",
      priority: 100,
      collision: { suppressLowerPriority: true },
    });
    const promo = campaign({ priority: 60 });
    const result = resolveCampaignQueue([promo, critical]);
    expect(result.winner?.id).toBe(critical.id);
    expect(result.queue).toEqual([]);
    expect(result.suppressed).toHaveLength(1);
  });

  it("replaces, queues, or suppresses incoming campaigns deterministically", () => {
    const visible = campaign({ priority: 60 });
    expect(
      resolveIncomingCampaign(
        visible,
        campaign({
          id: "e11d2c2a-31f5-4166-bb25-6198998218db",
          priority: 100,
          collision: { queueBehavior: "REPLACE_LOWER" },
        }),
      ),
    ).toBe("REPLACE");
    expect(
      resolveIncomingCampaign(
        visible,
        campaign({
          id: "e11d2c2a-31f5-4166-bb25-6198998218db",
          priority: 30,
        }),
      ),
    ).toBe("QUEUE");
    expect(
      resolveIncomingCampaign(
        campaign({ collision: { suppressLowerPriority: true } }),
        campaign({
          id: "e11d2c2a-31f5-4166-bb25-6198998218db",
          priority: 30,
        }),
      ),
    ).toBe("SUPPRESS");
  });
});

describe("campaign browser frequency", () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });
  it("persists once-ever completion", () => {
    const item = campaign({ frequency: { mode: "ONCE_EVER" } });
    expect(clientFrequencyAllows(item)).toBe(true);
    updateHistory(item.id, { impressions: 1 });
    expect(history(item.id).impressions).toBe(1);
    expect(clientFrequencyAllows(item)).toBe(false);
  });

  it("caps once per session without leaking across session storage", () => {
    const item = campaign({ frequency: { mode: "ONCE_PER_SESSION" } });
    markSessionShown(item.id);
    expect(clientFrequencyAllows(item)).toBe(false);
  });

  it("never resurfaces after conversion", () => {
    const item = campaign({ frequency: { mode: "UNTIL_CONVERSION" } });
    updateHistory(item.id, { convertedAt: new Date().toISOString(), completed: true });
    expect(clientFrequencyAllows(item)).toBe(false);
  });

  it("uses a safe session cooldown for default dismiss and action behavior", () => {
    const item = campaign({
      frequency: {
        mode: "UNTIL_CONVERSION",
        afterDismiss: "DEFAULT",
        afterPrimaryAction: "DEFAULT",
      },
    });
    markSessionShown(item.id);
    updateHistory(item.id, { dismissedAt: new Date().toISOString() });
    expect(clientFrequencyAllows(item)).toBe(false);
    updateHistory(item.id, { dismissedAt: null, interactedAt: new Date().toISOString() });
    expect(clientFrequencyAllows(item)).toBe(false);
  });

  it("enforces an exact daily boundary", () => {
    const item = campaign({ frequency: { mode: "ONCE_PER_DAY" } });
    updateHistory(item.id, { lastShownAt: "2026-08-12T12:00:00.000Z" });
    expect(clientFrequencyAllows(item, new Date("2026-08-13T11:59:59.999Z"))).toBe(false);
    expect(clientFrequencyAllows(item, new Date("2026-08-13T12:00:00.000Z"))).toBe(true);
  });

  it("keeps a stable seven-day last-touch attribution and expires stale clicks", () => {
    const item = campaign();
    recordAttribution(item);
    expect(attributableCampaign()).toMatchObject({
      campaignId: item.id,
      variantId: item.variantId,
    });
    expect(attributableCampaign(new Date(Date.now() + 8 * 86_400_000))).toBeNull();
    clearAttribution();
    expect(attributableCampaign()).toBeNull();
  });
});
