import { expect, test, type Page } from "@playwright/test";

import {
  popupCampaignDefaults,
  popupPublishedCampaignSchema,
} from "../vendor/cosmetics-contracts/index.js";

const browserErrors = new WeakMap<Page, string[]>();

test.beforeEach(async ({ page }) => {
  const errors: string[] = [];
  browserErrors.set(page, errors);
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error" && !message.text().startsWith("Failed to load resource:")) {
      errors.push(message.text());
    }
  });
  page.on("response", (response) => {
    const path = new URL(response.url()).pathname;
    if (path.includes("/campaigns/") && response.status() >= 400) {
      errors.push(`${response.status()} ${path}`);
    }
  });
});

test.afterEach(async ({ page }) => {
  expect(browserErrors.get(page) ?? []).toEqual([]);
});

const campaignId = "1ea4ff7b-c507-42e5-bd0b-d3530f7509dd";
const variantId = "468f5a74-e056-44f6-9d52-20fef8acf55e";

const campaign = popupPublishedCampaignSchema.parse({
  id: campaignId,
  variantId,
  version: 1,
  type: "NEWSLETTER",
  priority: 60,
  startsAt: null,
  endsAt: "2026-08-20T20:00:00.000Z",
  timezone: "Africa/Cairo",
  recurringSchedule: null,
  presentation: {
    ...popupCampaignDefaults.presentation,
    desktop: "CENTER_MODAL",
    tablet: "SIDE_PANEL_RIGHT",
    mobile: "BOTTOM_SHEET",
  },
  appearance: {
    ...popupCampaignDefaults.appearance,
    width: "STANDARD",
    maxWidth: 560,
    layout: "TEXT_ONLY",
    theme: "INK",
  },
  targeting: popupCampaignDefaults.targeting,
  trigger: { ...popupCampaignDefaults.trigger, type: "IMMEDIATE" },
  frequency: { ...popupCampaignDefaults.frequency, mode: "ONCE_PER_SESSION" },
  collision: popupCampaignDefaults.collision,
  primaryAction: { ...popupCampaignDefaults.primaryAction, type: "SUBMIT_FORM" },
  secondaryAction: { ...popupCampaignDefaults.secondaryAction, type: "CLOSE" },
  form: {
    ...popupCampaignDefaults.form,
    type: "LEAD",
    collectName: true,
    collectPhone: true,
    consentRequired: true,
  },
  countdown: {
    ...popupCampaignDefaults.countdown,
    enabled: true,
    mode: "CAMPAIGN_END",
  },
  content: {
    ...popupCampaignDefaults.variants[0]!.content[0]!,
    headline: "A quieter ritual starts here",
    subtitle: "Private launch notes and considered offers",
    body: "Join the BIOREZA edit for useful product guidance. No noisy daily messages.",
    primaryCtaLabel: "Join the edit",
    secondaryCtaLabel: "Maybe later",
    nameLabel: "Name",
    emailLabel: "Email address",
    phoneLabel: "Phone",
    consentLabel: "I agree to receive occasional store updates.",
  },
  direction: "ltr",
  image: null,
  coupon: null,
  product: null,
  category: null,
});

const viewports = [
  { width: 320, height: 568 },
  { width: 375, height: 667 },
  { width: 390, height: 844 },
  { width: 430, height: 932 },
  { width: 768, height: 900 },
  { width: 1440, height: 900 },
];

async function mockCampaignApi(page: Page, campaigns = [campaign], submissions: unknown[] = []) {
  await page.addInitScript(() => {
    localStorage.removeItem("bioreza.campaign.history.v1");
    sessionStorage.clear();
  });
  await page.route("**/api/v1/campaigns/**", async (route) => {
    const path = new URL(route.request().url()).pathname;
    if (path.endsWith("/campaigns/eligible")) {
      return route.fulfill({
        json: {
          success: true,
          data: {
            campaigns,
            serverTime: "2026-08-13T07:30:00.000Z",
            freeShippingThreshold: 100_000,
          },
        },
      });
    }
    if (path.endsWith("/campaigns/events")) {
      return route.fulfill({
        json: {
          success: true,
          data: { accepted: 1, duplicates: 0, rejected: 0 },
        },
      });
    }
    if (/\/campaigns\/[^/]+\/forms$/.test(path)) {
      submissions.push(route.request().postDataJSON());
      return route.fulfill({
        json: {
          success: true,
          data: { success: true, duplicate: false },
        },
      });
    }
    return route.fulfill({ status: 404, json: { message: "Not mocked" } });
  });
}

test("keeps one accessible campaign inside every supported viewport", async ({ page }) => {
  await mockCampaignApi(page);

  for (const viewport of viewports) {
    await page.setViewportSize(viewport);
    await page.goto(`/privacy?campaign_width=${viewport.width}`);
    await page.keyboard.press("Tab");

    const dialog = page.getByRole("dialog");
    await expect(dialog).toHaveCount(1);
    await expect(dialog).toBeVisible();
    await expect(dialog).toHaveAttribute(
      "data-presentation",
      viewport.width < 640
        ? "BOTTOM_SHEET"
        : viewport.width < 1024
          ? "SIDE_PANEL_RIGHT"
          : "CENTER_MODAL",
    );

    const bounds = await dialog.boundingBox();
    expect(bounds).not.toBeNull();
    expect(bounds!.x).toBeGreaterThanOrEqual(0);
    expect(bounds!.y).toBeGreaterThanOrEqual(0);
    expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(viewport.width + 1);
    expect(bounds!.y + bounds!.height).toBeLessThanOrEqual(viewport.height + 1);
    await expect(dialog.getByRole("button", { name: "Close" })).toBeVisible();
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
    ).toBe(true);

    await page.keyboard.press("Escape");
    await expect(dialog).toHaveCount(0);
  }
});

test("critical priority deterministically suppresses lower campaigns", async ({ page }) => {
  const critical = {
    ...campaign,
    id: "e11d2c2a-31f5-4166-bb25-6198998218db",
    priority: 100,
    collision: { ...campaign.collision, suppressLowerPriority: true },
    content: { ...campaign.content, headline: "Important store notice" },
  };
  await page.addInitScript(() => sessionStorage.clear());
  await page.route("**/api/v1/campaigns/**", async (route) => {
    const path = new URL(route.request().url()).pathname;
    return route.fulfill({
      json: {
        success: true,
        data: path.endsWith("/eligible")
          ? {
              campaigns: [campaign, critical],
              serverTime: new Date().toISOString(),
              freeShippingThreshold: null,
            }
          : { accepted: 1, duplicates: 0, rejected: 0 },
      },
    });
  });
  await page.goto("/privacy?collision=1");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("heading", { name: "Important store notice" })).toBeVisible();
  await expect(page.getByText("A quieter ritual starts here")).toHaveCount(0);
  await expect(page.getByRole("dialog")).toHaveCount(1);
});

test("renders Arabic direction and mobile presentation natively", async ({ page }) => {
  const arabicCampaign = popupPublishedCampaignSchema.parse({
    ...campaign,
    id: "fc791de7-e836-4ab1-a6fa-cf41fb9029d3",
    content: {
      ...campaign.content,
      headline: "رسالة هادئة في الوقت المناسب",
      subtitle: "عروض مختارة بعناية",
      body: "انضمي إلى قائمة بيوريزا للحصول على إرشادات مفيدة بدون رسائل مزعجة.",
      primaryCtaLabel: "انضمي الآن",
      secondaryCtaLabel: "ربما لاحقاً",
      nameLabel: "الاسم",
      emailLabel: "البريد الإلكتروني",
      phoneLabel: "رقم الهاتف",
      consentLabel: "أوافق على استلام تحديثات المتجر.",
    },
    direction: "rtl",
  });
  await mockCampaignApi(page, [arabicCampaign]);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/privacy?lang=ar&campaign_rtl=1");

  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog).toHaveAttribute("dir", "rtl");
  await expect(dialog).toHaveAttribute("data-presentation", "BOTTOM_SHEET");
  await expect(dialog.getByRole("heading", { name: "رسالة هادئة في الوقت المناسب" })).toBeVisible();
  await expect(dialog.getByRole("button", { name: "إغلاق" })).toBeVisible();
});

test("submits a validated lead form and shows its success state", async ({ page }) => {
  const submissions: unknown[] = [];
  const formCampaign = popupPublishedCampaignSchema.parse({
    ...campaign,
    id: "a3dfe237-a0d7-453d-bcc3-115caf641f10",
    content: {
      ...campaign.content,
      successHeadline: "Welcome to the edit",
      successBody: "Your preferences were saved successfully.",
    },
  });
  await mockCampaignApi(page, [formCampaign], submissions);
  await page.setViewportSize({ width: 320, height: 568 });
  await page.goto("/privacy?campaign_form=1");

  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await dialog.getByLabel("Name").fill("Mona Ali");
  await dialog.getByLabel("Email address").fill("mona@example.com");
  await dialog.getByLabel("Phone").fill("+201001234567");
  await dialog.getByLabel("I agree to receive occasional store updates.").check();
  await dialog.getByRole("button", { name: "Join the edit" }).click();

  await expect(dialog.getByRole("heading", { name: "Welcome to the edit" })).toBeVisible();
  await expect.poll(() => submissions.length).toBe(1);
  expect(submissions[0]).toMatchObject({
    email: "mona@example.com",
    phone: "+201001234567",
    consent: true,
    device: "mobile",
    page: "/privacy?campaign_form=1",
  });
});
