import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { campaignPageContext, emitCampaignContext, trackCommerceEvent } from "./analytics";
import { productViews } from "@/components/campaign/campaign-storage";

describe("campaign commerce context", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.stubGlobal(
      "matchMedia",
      vi.fn((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    );
    sessionStorage.clear();
    window.history.replaceState({}, "", "/categories/skincare");
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("persists context until the lazy campaign runtime mounts", () => {
    emitCampaignContext({
      categoryId: "20447552-7b3b-4caa-81f7-8c987627816e",
      categoryName: "Skincare",
    });
    expect(campaignPageContext("/categories/skincare")).toMatchObject({
      categoryName: "Skincare",
    });
    expect(campaignPageContext("/cart")).toBeUndefined();
  });

  it("stores product context before dispatching the commerce event", () => {
    trackCommerceEvent("product_viewed", {
      productId: "9f627c5e-355c-4dae-9bb0-cb61df699647",
      productName: "Night Serum",
    });
    expect(campaignPageContext("/categories/skincare")).toMatchObject({
      productName: "Night Serum",
    });
    expect(productViews()).toEqual([
      expect.objectContaining({
        productId: "9f627c5e-355c-4dae-9bb0-cb61df699647",
        count: 1,
      }),
    ]);
  });
});
