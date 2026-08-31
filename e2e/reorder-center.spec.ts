import { expect, test } from "@playwright/test";

const user = {
  id: "11111111-1111-4111-8111-111111111111",
  firstName: "Sara",
  lastName: "Ali",
  phone: "01012345678",
  email: "sara@example.com",
  role: "CLIENT",
  permissions: [],
};
const cart = {
  cartId: "22222222-2222-4222-8222-222222222222",
  owner: "USER",
  items: [],
  subtotal: 0,
  discountTotal: 0,
  estimatedTotal: 0,
  totalSavings: 0,
  couponCode: null,
  appliedPromotions: [],
  promotionMessages: [],
  giftOptions: [],
  totalQuantity: 0,
  hasIssues: false,
  updatedAt: new Date().toISOString(),
};
const item = {
  profileId: "p1",
  productId: "33333333-3333-4333-8333-333333333333",
  variantId: "44444444-4444-4444-8444-444444444444",
  slug: "cerave-cleanser",
  productNameEn: "CeraVe Hydrating Cleanser",
  productNameAr: "غسول سيرافي المرطب",
  variantNameEn: "473ml",
  variantNameAr: "473 مل",
  variantOptions: [],
  imageUrl: null,
  currentPrice: 52000,
  currency: "EGP",
  availableQuantity: 8,
  availability: "AVAILABLE",
  purchaseCount: 4,
  totalQuantity: 4,
  lastPurchaseAt: "2026-07-14T00:00:00.000Z",
  estimatedIntervalDays: 48,
  confidence: "HIGH",
  replenishmentWindow: {
    start: "2026-08-24T00:00:00.000Z",
    center: "2026-08-31T00:00:00.000Z",
    end: "2026-09-12T00:00:00.000Z",
  },
  decision: {
    state: "READY",
    priority: 145,
    reasons: [{ code: "CADENCE", detail: "Median retained interval 48 days" }],
  },
  reminder: { state: "ACTIVE", snoozedUntil: null },
};

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => window.localStorage.setItem("bioreza.csrf", "x".repeat(32)));
  await page.route("**/api/v1/**", async (route) => {
    const request = route.request();
    const path = new URL(request.url()).pathname;
    const fulfill = (data: unknown) => route.fulfill({ json: { success: true, data } });
    if (path.endsWith("/auth/refresh"))
      return fulfill({
        user,
        tokens: { accessToken: "test-access-token", expiresIn: 900 },
        csrfToken: "y".repeat(32),
      });
    if (path.endsWith("/cart/merge") || path.endsWith("/cart"))
      return fulfill(
        path.endsWith("/me/reorder/cart")
          ? { cart, sessionId: "55555555-5555-4555-8555-555555555555" }
          : cart,
      );
    if (path.endsWith("/users/me")) return fulfill(user);
    if (path.endsWith("/users/addresses") || path.endsWith("/orders")) return fulfill([]);
    if (path.endsWith("/wishlist"))
      return fulfill({ items: [], collections: [], totalItems: 0, updatedAt: null });
    if (path.endsWith("/me/reorder/buy-again")) {
      const pageNumber = Number(new URL(request.url()).searchParams.get("page") ?? 1);
      const items =
        pageNumber === 1
          ? [
              item,
              {
                ...item,
                profileId: "p2",
                productId: "66666666-6666-4666-8666-666666666666",
                variantId: "77777777-7777-4777-8777-777777777777",
                productNameEn: "Previous Moisturizer",
                productNameAr: "مرطب سابق",
                variantNameEn: "50ml",
                variantNameAr: "50 مل",
                availability: "PREVIOUS_VARIANT_UNAVAILABLE",
                availableQuantity: 0,
                purchaseCount: 1,
                estimatedIntervalDays: null,
                confidence: "INSUFFICIENT",
              },
            ]
          : [
              {
                ...item,
                profileId: "p3",
                productId: "88888888-8888-4888-8888-888888888888",
                variantId: "99999999-9999-4999-8999-999999999999",
                productNameEn: "Later purchase",
                productNameAr: "مشتريات أقدم",
              },
            ];
      return fulfill({
        items,
        preference: { smartEnabled: true, version: 1 },
        meta: {
          page: pageNumber,
          limit: 24,
          total: 25,
          totalPages: 2,
          hasNext: pageNumber === 1,
          hasPrev: pageNumber > 1,
        },
        freshness: { evaluatedAt: "2026-08-31T00:00:00Z", source: "REBUILDABLE_ORDER_PROJECTION" },
      });
    }
    if (path.endsWith("/me/reorder/opportunities"))
      return fulfill({
        items: [item],
        suppressedReason: null,
        configVersion: 2,
        snoozeOptionsDays: [7, 14, 30],
      });
    if (
      path.includes("/me/reorder/items/") ||
      path.endsWith("/me/reorder/preferences") ||
      path.endsWith("/me/reorder/events")
    )
      return fulfill({ ok: true });
    return route.fulfill({ status: 404, json: { code: "NOT_MOCKED", message: path } });
  });
});

test("Buy Again is usable at every required viewport and in Arabic RTL", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "chromium", "Exact viewport matrix runs once in Chromium");
  test.setTimeout(180_000);
  const widths = [320, 360, 375, 390, 414, 430, 768, 1024, 1366, 1440, 1920];
  for (const width of widths) {
    await page.setViewportSize({ width, height: width <= 430 ? 780 : 900 });
    await page.goto("/account?section=buy-again");
    await expect(page.getByRole("heading", { name: "The things you return to" })).toBeVisible({
      timeout: width === 320 ? 60_000 : 15_000,
    });
    await expect(page.getByText("CeraVe Hydrating Cleanser").first()).toBeVisible();
    await expect(page.getByText("Your previous size is no longer available")).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1,
      ),
      `${width}px overflow`,
    ).toBe(true);
  }
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/account?section=buy-again&lang=ar");
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  await expect(
    page.getByRole("heading", { name: "منتجاتك المألوفة، عندما تريدينها" }),
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "ليس الآن" })).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1,
    ),
  ).toBe(true);
});

test("Not Yet and Buy Again use server-authoritative actions", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium", "Interaction contract runs once");
  await page.goto("/account?section=buy-again");
  const snooze = page.waitForRequest(
    (request) => request.url().includes("/me/reorder/items/") && request.url().endsWith("/snooze"),
  );
  await page.getByRole("button", { name: "Not yet" }).click();
  expect((await snooze).postDataJSON()).toEqual({ days: 14 });
  const add = page.waitForRequest((request) => request.url().endsWith("/me/reorder/cart"));
  await page.getByRole("button", { name: "Add to bag" }).first().click();
  const request = await add;
  expect(request.postDataJSON().items).toEqual([{ variantId: item.variantId, quantity: 1 }]);
  expect(request.postDataJSON()).not.toHaveProperty("price");
});

test("Buy Again loads subsequent server pages without replacing prior purchases", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "chromium", "Pagination contract runs once");
  await page.goto("/account?section=buy-again");
  await page.getByRole("button", { name: "Load more purchases" }).click();
  await expect(page.getByText("Later purchase")).toBeVisible();
  await expect(page.getByText("CeraVe Hydrating Cleanser").first()).toBeVisible();
  await expect(page.getByRole("button", { name: "Load more purchases" })).toHaveCount(0);
});
