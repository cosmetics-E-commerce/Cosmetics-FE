import { expect, test, type Page } from "@playwright/test";

const cartItem = {
  variantId: "33333333-3333-4333-8333-333333333333",
  productId: "44444444-4444-4444-8444-444444444444",
  categoryId: "55555555-5555-4555-8555-555555555555",
  brandId: null,
  slug: "calm-serum",
  productNameEn: "Calm Serum",
  productNameAr: "سيروم التهدئة",
  variantNameEn: "30 ml",
  variantNameAr: "30 مل",
  variantOptions: [],
  sku: "SERUM-30",
  imageUrl: "/favicon.png",
  unitPrice: 181300,
  quantity: 5,
  lineTotal: 906500,
  discount: 0,
  discountedLineTotal: 906500,
  available: 20,
  maxAvailable: 20,
  status: "AVAILABLE",
  issues: [],
};

const nonEmptyCart = {
  cartId: "66666666-6666-4666-8666-666666666666",
  owner: "USER",
  items: [cartItem],
  subtotal: 906500,
  discountTotal: 0,
  estimatedTotal: 906500,
  totalSavings: 0,
  couponCode: null,
  appliedPromotions: [],
  promotionMessages: [],
  giftOptions: [],
  totalQuantity: 5,
  hasIssues: false,
  updatedAt: "2026-08-29T00:00:00.000Z",
};

const affectedMobileWidths = [320, 360, 375, 390, 414, 430];

async function expectNoPageOverflow(page: Page) {
  for (const width of affectedMobileWidths) {
    await page.setViewportSize({ width, height: 820 });
    const geometry = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      offenders: [...document.querySelectorAll<HTMLElement>("body *")]
        .map((element) => {
          const bounds = element.getBoundingClientRect();
          return {
            selector: `${element.tagName.toLowerCase()}.${element.className}`,
            left: Math.round(bounds.left),
            right: Math.round(bounds.right),
            scrollWidth: element.scrollWidth,
            clientWidth: element.clientWidth,
          };
        })
        .filter(
          ({ left, right, scrollWidth, clientWidth }) =>
            left < -1 || right > window.innerWidth + 1 || scrollWidth > clientWidth + 1,
        )
        .slice(0, 15),
    }));
    expect(
      geometry.overflow,
      `${width}px viewport: ${JSON.stringify(geometry.offenders)}`,
    ).toBeLessThanOrEqual(1);
  }
}

async function installAccountState(page: Page) {
  await page.addInitScript(() => window.localStorage.setItem("bioreza.csrf", "x".repeat(32)));
  await page.route("**/api/v1/auth/refresh", (route) =>
    route.fulfill({
      json: {
        success: true,
        data: {
          user: {
            id: "11111111-1111-4111-8111-111111111111",
            firstName: "Sara",
            lastName: "Ali",
            phone: "+201012345678",
            email: "sara@example.com",
            role: "CLIENT",
            permissions: [],
          },
          tokens: { accessToken: "test-access-token", expiresIn: 900 },
          csrfToken: "y".repeat(32),
        },
      },
    }),
  );
  await page.route("**/api/v1/cart{,/**}", (route) =>
    route.fulfill({ json: { success: true, data: nonEmptyCart } }),
  );
  await page.route("**/api/v1/wishlist", (route) =>
    route.fulfill({
      json: {
        success: true,
        data: {
          items: [
            {
              productId: "product-a",
              collectionId: "collection-a",
              addedAt: "2026-08-29T00:00:00.000Z",
              product: { id: "product-a", slug: "product-a" },
            },
            {
              productId: "product-b",
              collectionId: "collection-a",
              addedAt: "2026-08-29T00:00:00.000Z",
              product: { id: "product-b", slug: "product-b" },
            },
          ],
          totalItems: 2,
          updatedAt: "2026-08-29T00:00:00.000Z",
        },
      },
    }),
  );
}

test("mobile header exposes wishlist and canonical quantity badges without overflow", async ({
  page,
}) => {
  await installAccountState(page);
  await page.setViewportSize({ width: 320, height: 700 });
  await page.goto("/shop");
  await expect(page.locator("html")).toHaveAttribute("data-hydrated", "true");

  const wishlist = page.getByRole("link", { name: "Wishlist, 2" });
  const cart = page.getByRole("button", { name: "Shopping bag, 5" });
  await expect(wishlist).toBeVisible();
  await expect(cart).toBeVisible();
  await expect(wishlist.locator(".header-badge")).toHaveText("2");
  await expect(cart.locator(".header-badge")).toHaveText("5");
  await expectNoPageOverflow(page);
});

test("mobile cart presents exactly one compact checkout action", async ({ page }) => {
  await installAccountState(page);
  await page.setViewportSize({ width: 320, height: 700 });
  await page.goto("/cart");
  await expect(page.locator("html")).toHaveAttribute("data-hydrated", "true");

  await expect(page.getByRole("link", { name: "Proceed to checkout" })).toHaveCount(1);
  await expect(page.getByText("EGP 9,065.00", { exact: true }).last()).toBeVisible();
  const geometry = await page.evaluate(() => ({
    overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    offenders: [...document.querySelectorAll<HTMLElement>("body *")]
      .map((element) => ({
        selector: `${element.tagName.toLowerCase()}.${element.className}`,
        left: Math.round(element.getBoundingClientRect().left),
        right: Math.round(element.getBoundingClientRect().right),
        scrollWidth: element.scrollWidth,
        clientWidth: element.clientWidth,
      }))
      .filter(
        ({ left, right, scrollWidth, clientWidth }) =>
          left < -1 || right > window.innerWidth + 1 || scrollWidth > clientWidth + 1,
      )
      .slice(0, 15),
  }));
  expect(geometry.overflow, JSON.stringify(geometry.offenders)).toBeLessThanOrEqual(1);
  await expectNoPageOverflow(page);
});

test("signup removes gender and emits an international E.164 phone value", async ({ page }) => {
  await page.goto("/register");
  await expect(page.locator("html")).toHaveAttribute("data-hydrated", "true");
  await expect(page.getByText("Gender", { exact: true })).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Choose country calling code" })).toContainText(
    "+20",
  );

  await page.getByRole("button", { name: "Choose country calling code" }).click();
  await page.getByPlaceholder("Search country or calling code…").fill("Saudi Arabia");
  await page.getByRole("option", { name: /Saudi Arabia.*\+966/ }).click();
  await page.getByLabel("Phone Number").fill("501234567");
  await expect(page.locator('input[name="phone"]')).toHaveValue("+966501234567");
  await expectNoPageOverflow(page);
});

test("concern links, brand filtering, and grouped brand merchandising use canonical data", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-hydrated", "true");
  const concernList = page.locator(".sf-concern-list");
  await expect(concernList).toBeVisible();
  await expect(concernList.locator("a")).toHaveText([
    /Dry Skin/,
    /Sensitive Skin/,
    /Combination Skin/,
    /Oily Skin/,
    /Acne-Prone Skin/,
    /All Skin Types/,
  ]);
  await expect(concernList.locator("a").first()).toHaveAttribute("href", "/skin-concerns/dry-skin");

  await page.goto("/shop");
  await expect(page.locator("html")).toHaveAttribute("data-hydrated", "true");
  await page.getByRole("button", { name: "Filters" }).click();
  await page.getByRole("button", { name: /La Roche-Posay/ }).click();
  await expect(page).toHaveURL(/brand=la-roche-posay/);

  await page.goto("/brands/la-roche-posay");
  await expect(page.locator("html")).toHaveAttribute("data-hydrated", "true");
  await expect(page.getByRole("heading", { name: "Cleansers" })).toBeVisible();
  await expect(page.locator(".sf-brand-category-group .product-card")).toHaveCount(1);
  await expectNoPageOverflow(page);

  await page.goto("/?lang=ar");
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  await expect(page.locator(".sf-concern-list a")).toHaveText([
    /البشرة الجافة/,
    /البشرة الحساسة/,
    /البشرة المختلطة/,
    /البشرة الدهنية/,
    /البشرة المعرّضة للحبوب/,
    /جميع أنواع البشرة/,
  ]);
  await page.goto("/brands/la-roche-posay?lang=ar");
  await expect(page.getByRole("heading", { name: "منظفات البشرة" })).toBeVisible();
  await expectNoPageOverflow(page);
});
