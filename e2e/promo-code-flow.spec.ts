import { expect, test, type Page, type Route } from "@playwright/test";

const customerId = "11111111-1111-4111-8111-111111111111";
const addressId = "22222222-2222-4222-8222-222222222222";
const promoCode = "FUCKINGTEST20";

const cartItem = {
  variantId: "33333333-3333-4333-8333-333333333333",
  productId: "44444444-4444-4444-8444-444444444444",
  categoryId: "55555555-5555-4555-8555-555555555555",
  categoryIds: ["55555555-5555-4555-8555-555555555555"],
  brandId: null,
  slug: "bioreza-serum",
  productNameEn: "BIOREZA Serum",
  productNameAr: "سيروم بيوريزا",
  variantNameEn: "30 ml",
  variantNameAr: "30 مل",
  variantOptions: [],
  sku: "BIO-30",
  imageUrl: "/favicon.png",
  unitPrice: 150_000,
  quantity: 1,
  lineTotal: 150_000,
  available: 10,
  maxAvailable: 10,
  status: "AVAILABLE",
  issues: [],
};

const application = {
  id: "66666666-6666-4666-8666-666666666666",
  name: promoCode,
  title: "20% discount applied",
  type: "PRODUCT_DISCOUNT",
  couponCode: promoCode,
  discountAmount: 30_000,
  shippingDiscount: 0,
  discountedUnits: 1,
  message: "20% discount applied",
};

function cart(applied: boolean) {
  return {
    cartId: "77777777-7777-4777-8777-777777777777",
    owner: "USER",
    items: [
      {
        ...cartItem,
        discount: applied ? 30_000 : 0,
        discountedLineTotal: applied ? 120_000 : 150_000,
      },
    ],
    subtotal: 150_000,
    discountTotal: applied ? 30_000 : 0,
    estimatedTotal: applied ? 120_000 : 150_000,
    totalSavings: applied ? 30_000 : 0,
    couponCode: applied ? promoCode : null,
    couponInvalidation: null,
    appliedPromotions: applied ? [application] : [],
    promotionMessages: applied ? ["20% discount applied"] : [],
    giftOptions: [],
    bundleInstances: [],
    bundleDiscountTotal: 0,
    totalQuantity: 1,
    hasIssues: false,
    updatedAt: new Date().toISOString(),
  };
}

async function fulfill(route: Route, data: unknown) {
  await route.fulfill({ json: { success: true, data } });
}

async function installApi(page: Page) {
  let applied = false;
  let applyRequests = 0;
  let checkoutRequests = 0;

  await page.addInitScript(() => {
    window.localStorage.setItem("bioreza.csrf", "x".repeat(32));
  });
  await page.route("**/api/v1/**", async (route) => {
    const request = route.request();
    const path = new URL(request.url()).pathname;
    if (path.endsWith("/auth/refresh")) {
      return fulfill(route, {
        user: {
          id: customerId,
          firstName: "Sara",
          lastName: "Ali",
          phone: "01012345678",
          email: "sara@example.com",
          role: "CLIENT",
          permissions: [],
        },
        tokens: { accessToken: "promo-test-token", expiresIn: 900 },
        csrfToken: "y".repeat(32),
      });
    }
    if (path.endsWith("/cart/merge")) return fulfill(route, cart(applied));
    if (path.endsWith("/cart/coupon") && request.method() === "POST") {
      applyRequests += 1;
      const submittedCode = request.postDataJSON().code as string;
      if (submittedCode === "EXPIREDTEST20") {
        return route.fulfill({
          status: 409,
          json: { success: false, error: { code: "PROMO_CODE_EXPIRED" } },
        });
      }
      expect(submittedCode).toBe(promoCode);
      await new Promise((resolve) => setTimeout(resolve, 40));
      applied = true;
      return fulfill(route, cart(true));
    }
    if (path.endsWith("/cart/coupon") && request.method() === "DELETE") {
      applied = false;
      return fulfill(route, cart(false));
    }
    if (path.endsWith("/cart") && request.method() === "GET") {
      return fulfill(route, cart(applied));
    }
    if (path.endsWith("/wishlist")) {
      return fulfill(route, { items: [], totalItems: 0, updatedAt: null });
    }
    if (path.endsWith("/users/addresses")) {
      return fulfill(route, [
        {
          id: addressId,
          label: "HOME",
          receiverName: "Sara Ali",
          phone: "+201012345678",
          country: "EG",
          governorate: "Cairo",
          city: "Nasr City",
          area: "El-Tawfiq",
          street: "Mostafa El Nahas",
          building: "12",
          floor: null,
          apartment: null,
          postalCode: null,
          bostaGovernorateId: "EG01",
          bostaCityId: "EG0126",
          bostaZoneId: "EG012601",
          deliveryInstructions: null,
          landmark: null,
          isDefault: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ]);
    }
    if (path.endsWith("/payments/instructions")) return fulfill(route, []);
    if (path.endsWith("/orders/checkout/preview")) {
      return fulfill(route, {
        subtotal: 150_000,
        discount: applied ? 30_000 : 0,
        shippingCost: 0,
        shippingDiscount: 0,
        codFee: 0,
        total: applied ? 120_000 : 150_000,
        totalSavings: applied ? 30_000 : 0,
        couponCode: applied ? promoCode : null,
        appliedPromotions: applied ? [application] : [],
        provider: "MOCK",
        estimatedDays: 2,
        estimatedDeliveryDate: new Date(Date.now() + 172_800_000).toISOString(),
      });
    }
    if (path.endsWith("/orders/checkout")) {
      checkoutRequests += 1;
      expect(request.postDataJSON()).toMatchObject({
        shippingAddressId: addressId,
        paymentMethod: "CASH_ON_DELIVERY",
      });
      return fulfill(route, {
        order: {
          id: "88888888-8888-4888-8888-888888888888",
          orderNumber: "BRZ-PROMO-20",
          status: "CONFIRMED",
          paymentStatus: "COD_PENDING",
          paymentMethod: "CASH_ON_DELIVERY",
          grandTotal: 120_000,
          discount: 30_000,
          appliedPromotions: [application],
        },
        paymentInstructions: null,
      });
    }
    return route.fulfill({ status: 404, json: { code: "NOT_MOCKED", message: path } });
  });

  return {
    counts: () => ({ applyRequests, checkoutRequests }),
  };
}

test("FUCKINGTEST20 survives cart refresh and checkout, then is revalidated at order placement", async ({
  page,
}) => {
  test.setTimeout(120_000);
  const api = await installApi(page);
  await page.goto("/cart", { waitUntil: "networkidle" });

  const input = page.getByLabel("Promo code");
  await input.fill("  fuckingtest20 ");
  await page.getByRole("button", { name: "Apply" }).dblclick();
  await expect(page.getByText(promoCode, { exact: false }).first()).toBeVisible();
  await expect(page.getByText("20% discount applied")).toBeVisible();
  await expect(page.getByText(/You saved/).first()).toContainText("300");
  expect(api.counts().applyRequests).toBe(1);

  await page.reload({ waitUntil: "networkidle" });
  await expect(page.getByText(promoCode, { exact: false }).first()).toBeVisible();

  for (const width of [320, 360, 375, 390, 414, 430]) {
    await page.setViewportSize({ width, height: 820 });
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(1);
  }

  await page.goto("/cart?lang=ar", { waitUntil: "networkidle" });
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  await expect(page.getByRole("button", { name: "إزالة" })).toBeVisible();
  await page.getByRole("button", { name: "إزالة" }).click();
  await expect(page.getByLabel("رمز الخصم")).toBeVisible();

  await page.goto("/cart", { waitUntil: "networkidle" });
  await page.getByLabel("Promo code").fill(promoCode);
  await page.getByRole("button", { name: "Apply" }).click();
  await page.getByRole("link", { name: "Proceed to checkout" }).click();
  await expect(page).toHaveURL(/\/checkout/);
  await page.getByRole("button", { name: "Continue to Review" }).click();

  await expect(page.getByRole("heading", { name: "Review", exact: true })).toBeVisible();
  const reviewPromo = page.locator(".sf-checkout-review-promo-control");
  await expect(reviewPromo).toContainText(promoCode);
  await expect(reviewPromo).toContainText("EGP 300");
  await expect(reviewPromo.getByRole("button", { name: "Remove" })).toBeVisible();

  await page.getByRole("button", { name: "Continue to Payment" }).click();
  await page.locator(".sf-checkout-place-order:visible").first().click();
  await expect(page).toHaveURL(/\/order-confirmed/);
  expect(api.counts().checkoutRequests).toBe(1);
});

test("checkout review can apply and remove the same canonical cart promo state", async ({
  page,
}) => {
  test.setTimeout(120_000);
  await installApi(page);
  await page.goto("/checkout", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Continue to Review" }).click();

  const reviewPromo = page.locator(".sf-checkout-review-promo-control");
  await reviewPromo.getByLabel("Promo code").fill(promoCode);
  await reviewPromo.getByRole("button", { name: "Apply" }).click();
  await expect(reviewPromo).toContainText(promoCode);
  await expect(reviewPromo).toContainText("You saved");

  await page.goto("/cart", { waitUntil: "networkidle" });
  await expect(page.getByText(promoCode, { exact: false }).first()).toBeVisible();
  await page.goto("/checkout", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Continue to Review" }).click();
  await page
    .locator(".sf-checkout-review-promo-control")
    .getByRole("button", { name: "Remove" })
    .click();
  await expect(
    page.locator(".sf-checkout-review-promo-control").getByLabel("Promo code"),
  ).toBeVisible();

  await page.goto("/cart", { waitUntil: "networkidle" });
  await expect(page.getByLabel("Promo code")).toBeVisible();
  await expect(page.getByText(promoCode, { exact: false })).toHaveCount(0);
});

test("an expired admin-created code returns an actionable storefront error", async ({ page }) => {
  await installApi(page);
  await page.goto("/cart", { waitUntil: "networkidle" });
  await page.getByLabel("Promo code").fill("EXPIREDTEST20");
  await page.getByRole("button", { name: "Apply" }).click();

  await expect(page.getByRole("alert")).toContainText("expired");
  await expect(page.getByLabel("Promo code")).toHaveValue("EXPIREDTEST20");
});
