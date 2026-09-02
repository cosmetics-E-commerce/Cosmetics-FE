import { expect, test, type Page, type Route } from "@playwright/test";

const viewports = [320, 360, 375, 390, 414, 430, 768, 1024, 1366, 1440, 1920];

test("Saved for Later stays usable without horizontal overflow at every required viewport", async ({
  page,
}) => {
  await installSavedCartApi(page);
  await page.goto("/cart", { waitUntil: "networkidle" });

  for (const width of viewports) {
    await page.setViewportSize({ width, height: width < 768 ? 780 : 900 });
    await expect(page.getByRole("heading", { name: /Saved for later/ })).toBeVisible();
    const dimensions = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      content: document.documentElement.scrollWidth,
      offenders: [...document.querySelectorAll<HTMLElement>("body *")]
        .filter((element) => {
          const box = element.getBoundingClientRect();
          return box.left < -0.5 || box.right > document.documentElement.clientWidth + 0.5;
        })
        .slice(0, 8)
        .map((element) => ({
          tag: element.tagName,
          className: element.className,
          box: element.getBoundingClientRect().toJSON(),
        })),
    }));
    expect(dimensions.viewport).toBe(width);
    expect(
      dimensions.content,
      `${width}px viewport overflow: ${JSON.stringify(dimensions.offenders)}`,
    ).toBeLessThanOrEqual(dimensions.viewport);
    await expect(page.getByRole("button", { name: "Move to bag" }).first()).toBeVisible();
  }
});

test("one-click Save and Move Back commit authoritative server state", async ({ page }) => {
  const api = await installSavedCartApi(page);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/cart", { waitUntil: "networkidle" });

  await page.getByRole("button", { name: "Save for later" }).click();
  await expect(page.getByRole("heading", { name: "Your bag is empty" })).toBeVisible();
  await expect(page.getByRole("heading", { name: /Saved for later \(3\)/ })).toBeVisible();
  expect(api.savedVariantIds()).toContain("active-variant");
  await expect(page.locator(".header-badge")).toHaveCount(0);

  await page
    .getByRole("listitem")
    .filter({ hasText: "Body Lotion" })
    .getByRole("button", { name: "Move to bag" })
    .click();
  await expect(page.getByText("Body Lotion", { exact: true })).toBeVisible();
  expect(api.activeVariantIds()).toContain("saved-variant");
  expect(api.savedVariantIds()).not.toContain("saved-variant");
});

test("Arabic Cart uses RTL and keeps unavailable intent removable", async ({ page }) => {
  await installSavedCartApi(page);
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto("/cart?lang=ar", { waitUntil: "networkidle" });

  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  await expect(page.getByRole("heading", { name: /محفوظ لوقت لاحق/ })).toBeVisible();
  const unavailable = page.getByRole("listitem").filter({ hasText: "عطر محفوظ" });
  await expect(unavailable.getByRole("button", { name: "نقل إلى الحقيبة" })).toBeDisabled();
  await unavailable.getByRole("button", { name: "إزالة" }).click();
  await expect(unavailable).toHaveCount(0);
  const dimensions = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    content: document.documentElement.scrollWidth,
  }));
  expect(dimensions.content).toBeLessThanOrEqual(dimensions.viewport);
});

async function installSavedCartApi(page: Page) {
  let active = [cartItem("active-variant", "Face Cleanser", "غسول الوجه", 1, 50_000)];
  let saved = [
    savedItem("saved-1", "saved-variant", "Body Lotion", "لوشن الجسم", "AVAILABLE", 8),
    savedItem("saved-2", "unavailable-variant", "Saved Fragrance", "عطر محفوظ", "OUT_OF_STOCK", 0),
  ];

  await page.route("**/api/v1/cart**", async (route) => {
    const request = route.request();
    const path = new URL(request.url()).pathname.replace(/^\/api\/v1/, "");
    const method = request.method();
    if (path === "/cart" && method === "GET") return fulfill(route, response(active, saved));

    const save = path.match(/^\/cart\/items\/(.+)\/save-for-later$/);
    if (save && method === "POST") {
      const line = active.find((item) => item.variantId === save[1]);
      if (line) {
        active = active.filter((item) => item.variantId !== save[1]);
        saved = [
          savedItem(
            "saved-from-cart",
            line.variantId,
            line.productNameEn,
            line.productNameAr,
            "AVAILABLE",
            9,
            line.quantity,
          ),
          ...saved,
        ];
      }
      return fulfill(route, response(active, saved));
    }

    const move = path.match(/^\/cart\/saved-for-later\/(.+)\/move-to-cart$/);
    if (move && method === "POST") {
      const item = saved.find((entry) => entry.id === move[1]);
      if (item?.status === "AVAILABLE") {
        saved = saved.filter((entry) => entry.id !== item.id);
        active = [
          ...active,
          cartItem(
            item.variantId,
            item.productNameEn,
            item.productNameAr,
            item.desiredQuantity,
            item.currentPrice!,
          ),
        ];
      }
      return fulfill(route, response(active, saved));
    }

    const remove = path.match(/^\/cart\/saved-for-later\/(.+)$/);
    if (remove && method === "DELETE") {
      saved = saved.filter((entry) => entry.id !== remove[1]);
      return fulfill(route, response(active, saved));
    }
    return route.continue();
  });

  return {
    activeVariantIds: () => active.map((item) => item.variantId),
    savedVariantIds: () => saved.map((item) => item.variantId),
  };
}

function cartItem(
  variantId: string,
  productNameEn: string,
  productNameAr: string,
  quantity: number,
  unitPrice: number,
) {
  return {
    variantId,
    productId: `product-${variantId}`,
    categoryId: "category-1",
    categoryIds: ["category-1"],
    brandId: null,
    slug: variantId,
    productNameEn,
    productNameAr,
    variantNameEn: "Default",
    variantNameAr: "افتراضي",
    variantOptions: [],
    sku: variantId,
    imageUrl: "/favicon.png",
    unitPrice,
    quantity,
    lineTotal: unitPrice * quantity,
    discount: 0,
    discountedLineTotal: unitPrice * quantity,
    available: 10,
    maxAvailable: 10,
    status: "AVAILABLE",
    issues: [],
  };
}

function savedItem(
  id: string,
  variantId: string,
  productNameEn: string,
  productNameAr: string,
  status: "AVAILABLE" | "OUT_OF_STOCK",
  available: number,
  desiredQuantity = 2,
) {
  return {
    id,
    productId: `product-${variantId}`,
    variantId,
    slug: variantId,
    productNameEn,
    productNameAr,
    variantNameEn: "473ml",
    variantNameAr: "473 مل",
    brandName: "BioReza",
    imageUrl: "/favicon.png",
    desiredQuantity,
    priceWhenSaved: 50_000,
    currentPrice: 60_000,
    priceChange: "INCREASED",
    available,
    maxAvailable: available,
    status,
    savedAt: "2026-09-02T00:00:00.000Z",
    issues: status === "AVAILABLE" ? [] : ["This item is currently out of stock."],
  };
}

function response(active: ReturnType<typeof cartItem>[], saved: ReturnType<typeof savedItem>[]) {
  const subtotal = active.reduce((sum, item) => sum + item.lineTotal, 0);
  return {
    cartId: "40000000-0000-4000-8000-000000000001",
    owner: "GUEST",
    items: active,
    subtotal,
    discountTotal: 0,
    estimatedTotal: subtotal,
    totalSavings: 0,
    couponCode: null,
    appliedPromotions: [],
    promotionMessages: [],
    giftOptions: [],
    totalQuantity: active.reduce((sum, item) => sum + item.quantity, 0),
    hasIssues: false,
    savedForLater: saved,
    savedForLaterCount: saved.length,
    updatedAt: new Date().toISOString(),
  };
}

function fulfill(route: Route, data: unknown) {
  return route.fulfill({
    status: 200,
    contentType: "application/json",
    body: JSON.stringify({ success: true, data }),
  });
}
