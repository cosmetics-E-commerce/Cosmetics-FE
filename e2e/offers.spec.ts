import { expect, test } from "@playwright/test";

const ids = Array.from({ length: 28 }, (_, i) => `offer-product-${i}`);
const offers = [
  {
    id: "first",
    title: "Flash Sale",
    description: null,
    type: "PRODUCT_DISCOUNT",
    badgeText: "SALE",
    startsAt: "2026-09-01",
    endsAt: null,
    featured: false,
    showCountdown: false,
    productIds: ids,
    categoryIds: [],
    brandIds: [],
  },
  {
    id: "second",
    title: "Flash Sale",
    description: "Selected skincare essentials.",
    type: "PRODUCT_DISCOUNT",
    badgeText: "SALE",
    startsAt: "2026-08-01",
    endsAt: "2026-12-01",
    featured: true,
    showCountdown: true,
    productIds: [],
    categoryIds: [],
    brandIds: [],
  },
];

test("offers show real products and prices, expand all targets, and sort without losing promotions", async ({
  page,
  request,
}) => {
  const response = await request.get("http://127.0.0.1:4174/api/v1/products");
  const body = await response.json();
  const template = (Array.isArray(body.data) ? body.data : body.data.items)[0];
  const batches: string[][] = [];
  await page.route("**/promotions/offers", (route) =>
    route.fulfill({ json: { success: true, data: offers } }),
  );
  await page.route("**/products/by-ids?*", (route) => {
    const requested = new URL(route.request().url()).searchParams.get("ids")!.split(",");
    batches.push(requested);
    return route.fulfill({
      json: {
        success: true,
        data: requested.map((id) => ({
          ...template,
          id,
          slug: id,
          nameEn: `Offer product ${ids.indexOf(id) + 1}`,
        })),
      },
    });
  });
  await page.route("**/promotions/prices", async (route) => {
    const { lines } = route.request().postDataJSON();
    await route.fulfill({
      json: {
        success: true,
        data: lines.map((line: { variantId: string }) => ({
          variantId: line.variantId,
          originalPrice: 41900,
          price: 35000,
          promotions: [],
        })),
      },
    });
  });
  await page.goto("/privacy-policy");
  await expect(page.locator("html")).toHaveAttribute("data-hydrated", "true");
  await page.getByRole("link", { name: "Offers", exact: true }).first().click();
  const cards = page.locator(".sf-offer-card");
  await expect(cards).toHaveCount(2);
  await expect(cards.first().locator(".sf-offer-product")).toHaveCount(3);
  await expect(cards.first().locator(".sf-offer-product__price").first()).toContainText("350");
  await expect(cards.first().locator("del").first()).toContainText("419");
  expect(new Set(batches.flat()).size).toBe(28);
  expect(batches.every((batch) => batch.length <= 24)).toBe(true);
  await cards.first().getByRole("button", { name: "View all 28 products" }).click();
  await expect(cards.first().locator(".sf-offer-product")).toHaveCount(28);
  await cards.first().getByRole("button", { name: "Show fewer products" }).click();
  await expect(cards.first().locator(".sf-offer-product")).toHaveCount(3);
  await expect(cards.first().locator(".sf-offer-product").first()).toHaveAttribute(
    "href",
    /\/product\/offer-product-/,
  );
  await page.getByRole("combobox", { name: "Sort by" }).selectOption("ending");
  await expect(cards.first()).toContainText("Selected skincare essentials.");
  await expect(cards.first().getByRole("link", { name: "Browse collection" })).toHaveAttribute(
    "href",
    "/shop",
  );
  await expect(page.locator(".sf-offer-card__art, .sf-offers-emblem")).toHaveCount(0);
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth - innerWidth),
    ).toBeLessThanOrEqual(1);
  }
});

test("empty offers stay useful and Arabic layout fits mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/offers?lang=ar");
  await expect(page.locator("html")).toHaveAttribute("data-hydrated", "true");
  await expect(page.locator(".sf-offers-page")).toHaveAttribute("dir", "rtl");
  await expect(page.locator(".sf-offers-empty")).toBeVisible();
  await expect(page.locator(".sf-offers-empty a")).toHaveAttribute("href", /\/shop/);
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth - innerWidth),
  ).toBeLessThanOrEqual(1);
});

test("product failures preserve the offer and provide a working retry", async ({
  page,
  request,
}) => {
  const response = await request.get("http://127.0.0.1:4174/api/v1/products");
  const body = await response.json();
  const template = (Array.isArray(body.data) ? body.data : body.data.items)[0];
  await page.route("**/promotions/offers", (route) =>
    route.fulfill({
      json: { success: true, data: [{ ...offers[0], productIds: [ids[0]], endsAt: "invalid" }] },
    }),
  );
  let fail = true;
  await page.route("**/products/by-ids?*", (route) =>
    fail
      ? route.fulfill({ status: 500, json: { message: "Unavailable" } })
      : route.fulfill({ json: { success: true, data: [{ ...template, id: ids[0] }] } }),
  );
  await page.goto("/privacy-policy");
  await expect(page.locator("html")).toHaveAttribute("data-hydrated", "true");
  await page.getByRole("link", { name: "Offers", exact: true }).first().click();
  await expect(page.getByText("Products could not be loaded.")).toBeVisible({ timeout: 30_000 });
  await expect(page.locator(".sf-offer-card")).toContainText("Available now");
  fail = false;
  await page.getByRole("button", { name: "Try again" }).click();
  await expect(page.locator(".sf-offer-product")).toHaveCount(1);
});
