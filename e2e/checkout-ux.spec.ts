import { expect, test } from "@playwright/test";

const addressId = "22222222-2222-4222-8222-222222222222";
const governorateId = "EG01";
const cityId = "EG0126";
const areaId = "EG012601";
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
  unitPrice: 125000,
  quantity: 1,
  lineTotal: 125000,
  discount: 0,
  discountedLineTotal: 125000,
  available: 8,
  maxAvailable: 8,
  status: "AVAILABLE",
  issues: [],
};

const cart = (empty = false) => ({
  cartId: "66666666-6666-4666-8666-666666666666",
  owner: "USER",
  items: empty ? [] : [cartItem],
  subtotal: empty ? 0 : 125000,
  discountTotal: 0,
  estimatedTotal: empty ? 0 : 125000,
  totalSavings: 0,
  couponCode: null,
  couponInvalidation: null,
  appliedPromotions: [],
  promotionMessages: [],
  giftOptions: [],
  totalQuantity: empty ? 0 : 1,
  hasIssues: false,
  updatedAt: new Date().toISOString(),
});

test("adds an address in checkout and prevents duplicate order intent", async ({
  page,
}, testInfo) => {
  test.setTimeout(120_000);
  let ordered = false;
  let checkoutKey = "";
  let checkoutRequests = 0;

  await page.addInitScript(() => {
    window.localStorage.setItem("bioreza.csrf", "x".repeat(32));
  });

  await page.route("**/api/v1/**", async (route) => {
    const request = route.request();
    const path = new URL(request.url()).pathname;
    const fulfill = (data: unknown) => route.fulfill({ json: { success: true, data } });

    if (path.endsWith("/auth/refresh")) {
      return fulfill({
        user: {
          id: "11111111-1111-4111-8111-111111111111",
          firstName: "Sara",
          lastName: "Ali",
          phone: "01012345678",
          email: "sara@example.com",
          role: "CLIENT",
          permissions: [],
        },
        tokens: { accessToken: "test-access-token", expiresIn: 900 },
        csrfToken: "y".repeat(32),
      });
    }
    if (path.endsWith("/cart/merge")) return fulfill(cart(ordered));
    if (path.endsWith("/cart")) return fulfill(cart(ordered));
    if (path.endsWith("/wishlist")) return fulfill({ items: [], totalItems: 0, updatedAt: null });
    if (path.endsWith("/users/addresses") && request.method() === "GET") return fulfill([]);
    if (path.endsWith("/payments/instructions")) return fulfill([]);
    if (path.endsWith("/shipping/locations/governorates")) {
      return fulfill([{ id: governorateId, name: "Cairo", nameAr: "القاهرة", code: "CAI" }]);
    }
    if (path.endsWith("/shipping/locations/cities")) {
      expect(new URL(request.url()).searchParams.get("governorate")).toBe(governorateId);
      return fulfill([
        { id: cityId, name: "Nasr City", nameAr: "مدينة نصر", governorateId, code: "NASR" },
      ]);
    }
    if (path.endsWith("/shipping/locations/areas")) {
      expect(new URL(request.url()).searchParams.get("city")).toBe(cityId);
      return fulfill([{ id: areaId, name: "El-Tawfiq", nameAr: "التوفيق" }]);
    }
    if (path.endsWith("/orders/checkout/preview")) {
      expect(request.postDataJSON()).toMatchObject({
        shippingAddressId: addressId,
        paymentMethod: "CASH_ON_DELIVERY",
      });
      return fulfill({
        subtotal: 125000,
        discount: 0,
        shippingDiscount: 0,
        codFee: 0,
        total: 125000,
        totalSavings: 0,
        couponCode: null,
        appliedPromotions: [],
        provider: "MOCK",
        shippingCost: 0,
        estimatedDays: 3,
        estimatedDeliveryDate: new Date(Date.now() + 3 * 86_400_000).toISOString(),
      });
    }
    if (path.endsWith("/users/addresses") && request.method() === "POST") {
      expect(request.postDataJSON()).toMatchObject({
        receiverName: "Sara Ali",
        phone: "+201012345678",
        country: "EG",
        bostaGovernorateId: governorateId,
        bostaCityId: cityId,
        bostaZoneId: areaId,
      });
      return fulfill({
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
        bostaGovernorateId: governorateId,
        bostaCityId: cityId,
        bostaZoneId: areaId,
        deliveryInstructions: null,
        landmark: null,
        isDefault: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }
    if (path.endsWith("/orders/checkout")) {
      checkoutRequests += 1;
      checkoutKey = request.headers()["idempotency-key"] ?? "";
      expect(checkoutKey).toMatch(/^[0-9a-f-]{36}$/);
      expect(request.postDataJSON()).toMatchObject({
        shippingAddressId: addressId,
        paymentMethod: "CASH_ON_DELIVERY",
      });
      ordered = true;
      return fulfill({
        order: {
          id: "77777777-7777-4777-8777-777777777777",
          orderNumber: "BRZ-1007",
          status: "CONFIRMED",
          paymentStatus: "UNPAID",
          paymentMethod: "CASH_ON_DELIVERY",
          grandTotal: 125000,
        },
      });
    }

    return route.fulfill({ status: 404, json: { code: "NOT_MOCKED", message: path } });
  });

  await page.goto("/cart");
  await expect(page.locator("html")).toHaveAttribute("data-hydrated", "true");
  await page.getByRole("link", { name: "Proceed to checkout" }).click();
  await expect(page).toHaveURL(/\/checkout/);
  await expect(page.getByRole("heading", { name: "Delivery", exact: true })).toBeVisible({
    // Cold Vite route splitting plus the mocked auth/cart bootstrap can exceed
    // the global assertion budget when another route-heavy test runs in the
    // second worker. This waits for the actual ready state; it does not mask a
    // missing heading because the route must still complete before proceeding.
    timeout: 30_000,
  });
  // Focused checkout: the store navigation and footer step aside.
  await expect(page.locator(".site-footer")).toHaveCount(0);
  await expect(page.getByRole("navigation", { name: "Store policies" })).toBeVisible();

  await page.getByRole("button", { name: "التبديل إلى العربية" }).click();
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  await expect(page.getByRole("heading", { name: "التوصيل", exact: true })).toBeVisible();

  const originalViewport = page.viewportSize()!;
  for (const width of [320, 360, 375, 390, 414, 430]) {
    await page.setViewportSize({ width, height: 820 });
    const layout = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      offenders: [...document.querySelectorAll<HTMLElement>("body *")]
        .map((element) => ({
          element: `${element.tagName.toLowerCase()}.${element.className}`,
          left: Math.round(element.getBoundingClientRect().left),
          right: Math.round(element.getBoundingClientRect().right),
          client: element.clientWidth,
          scroll: element.scrollWidth,
          width: getComputedStyle(element).width,
          minWidth: getComputedStyle(element).minWidth,
          columns: getComputedStyle(element).gridTemplateColumns,
        }))
        .filter(({ left, right }) => left < -1 || right > window.innerWidth + 1)
        .sort((a, b) => b.scroll - b.client - (a.scroll - a.client))
        .slice(0, 12),
    }));
    expect(layout.overflow, JSON.stringify(layout.offenders)).toBeLessThanOrEqual(1);
  }
  await page.setViewportSize(originalViewport);

  await page.getByRole("button", { name: "Switch to English" }).click();
  await expect(page.locator("html")).toHaveAttribute("dir", "ltr");

  // One page, no stepper: delivery, shipping and payment are all present, and
  // nothing can be placed until there is an address — the page says so.
  await expect(page.getByRole("list", { name: "Checkout progress" })).toHaveCount(0);
  await expect(page.getByRole("heading", { name: "Delivery", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Shipping method", exact: true })).toBeAttached();
  await expect(page.getByRole("heading", { name: "Payment", exact: true })).toBeAttached();
  await expect(page.getByText("Complete your delivery details above.")).toBeAttached();
  // On phones the order summary starts collapsed behind "Show order summary".
  await expect(
    page.getByRole("list", { name: "Order products", includeHidden: true }),
  ).toContainText("Calm Serum");
  await expect(page.getByLabel("Receiver name")).toHaveValue("Sara Ali");

  // Like a hosted "Pay now", placing early validates the address instead of ordering.
  await page.locator(".sf-checkout-place-order:visible").first().click();
  await expect(page.getByLabel("Street")).toHaveAttribute("aria-invalid", "true");
  expect(checkoutRequests).toBe(0);

  // Governorate → city → area is one chained choice: each pick opens the next list.
  await page.getByRole("combobox", { name: "Governorate" }).click();
  await page
    .getByRole("option", { name: /^Cairo/ })
    .first()
    .click();
  await page.getByRole("option", { name: /^Nasr City/ }).click();
  await page.getByRole("option", { name: /^El-Tawfiq/ }).click();
  await expect(page.getByRole("combobox", { name: "District / area" })).toContainText("El-Tawfiq");
  await page.getByLabel("Street").fill("Mostafa El Nahas");
  await page.getByLabel("Building").fill("12");
  await page.getByRole("button", { name: "Use this address" }).click();

  // Saving the address prices delivery and goes straight to payment.
  await expect(page.getByText("12 Mostafa El Nahas", { exact: false })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Payment", exact: true })).toBeInViewport();
  await expect(page.getByText("Complete your delivery details above.")).toHaveCount(0);
  await expect(page.getByText("Standard delivery")).toBeVisible();

  // The optional note is folded away until asked for, and keeps its text.
  await page.getByText("Add a note to your order (optional)").click();
  await page.getByPlaceholder("Optional delivery instructions").fill("Leave with reception");
  await page.getByText("Add a note to your order (optional)").click();
  await page.getByText("Add a note to your order (optional)").click();
  await expect(page.getByPlaceholder("Optional delivery instructions")).toHaveValue(
    "Leave with reception",
  );

  const visiblePlaceOrders = page.locator(".sf-checkout-place-order:visible");
  await expect(visiblePlaceOrders).toHaveCount(1);
  if (testInfo.project.name.startsWith("mobile")) {
    await expect(page.locator(".sf-checkout-place-order--inline")).toBeHidden();
    const mobileBar = page.locator(".sf-checkout-mobile-purchase");
    await expect(page.locator(".sf-checkout-place-order--sticky")).toBeVisible();
    await expect(page.getByText("Final total", { exact: true }).last()).toBeVisible();
    const originalViewport = page.viewportSize()!;
    for (const width of [320, 360, 375, 390, 414, 430]) {
      await page.setViewportSize({ width, height: width === 320 ? 568 : 844 });
      // The compact checkout can fit its end on screen; at the top the bar must float.
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
      await expect(mobileBar).toHaveAttribute("data-position", "fixed");
      const stickyGeometry = await mobileBar.evaluate((element) => {
        const bounds = element.getBoundingClientRect();
        return {
          bottom: bounds.bottom,
          viewportHeight: window.innerHeight,
          position: getComputedStyle(element).position,
        };
      });
      expect(stickyGeometry.position).toBe("fixed");
      expect(stickyGeometry.bottom).toBeCloseTo(stickyGeometry.viewportHeight, 0);

      await page.locator(".ck-footer").evaluate((element) =>
        element.scrollIntoView({
          block: "start",
          behavior: "instant",
        }),
      );
      await expect(mobileBar).toHaveAttribute("data-position", "docked");
      const footerBoundary = await page.evaluate(() => {
        const checkout = document.querySelector<HTMLElement>(".sf-checkout-page");
        const footer = document.querySelector<HTMLElement>(".ck-footer");
        const bar = document.querySelector<HTMLElement>(".sf-checkout-mobile-purchase");
        if (!checkout || !footer || !bar) return null;
        const footerBounds = footer.getBoundingClientRect();
        const barBounds = bar.getBoundingClientRect();
        return {
          barBottom: barBounds.bottom,
          checkoutBottom: checkout.getBoundingClientRect().bottom,
          footerTop: footerBounds.top,
          overlap: Math.max(
            0,
            Math.min(barBounds.bottom, footerBounds.bottom) -
              Math.max(barBounds.top, footerBounds.top),
          ),
          position: getComputedStyle(bar).position,
          checkoutPaddingBottom: Number.parseFloat(getComputedStyle(checkout).paddingBottom),
        };
      });
      expect(footerBoundary).not.toBeNull();
      expect(footerBoundary!.position).toBe("absolute");
      expect(footerBoundary!.barBottom).toBeLessThanOrEqual(footerBoundary!.checkoutBottom + 1);
      expect(footerBoundary!.barBottom).toBeLessThanOrEqual(footerBoundary!.footerTop + 1);
      expect(footerBoundary!.overlap).toBeLessThanOrEqual(0.5);
      expect(footerBoundary!.checkoutPaddingBottom).toBeLessThanOrEqual(1);
    }
    await page.setViewportSize(originalViewport);
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await expect(mobileBar).toHaveAttribute("data-position", "fixed");
    await expect(page.locator(".sf-checkout-place-order--sticky")).toBeVisible();
  } else {
    await expect(page.locator(".sf-checkout-place-order--inline")).toBeVisible();
    await expect(page.locator(".sf-checkout-place-order--sticky")).toBeHidden();
  }

  const placeOrder = visiblePlaceOrders.first();
  await expect(placeOrder).toBeEnabled();
  await placeOrder.dblclick();

  await expect(page).toHaveURL(/\/order-confirmed/);
  await expect(page.getByRole("heading", { name: "Thank you." })).toBeVisible();
  expect(checkoutKey).not.toBe("");
  expect(checkoutRequests).toBe(1);
});

test("guests get live delivery pricing and one-click ordering without a continue step", async ({
  page,
}) => {
  test.setTimeout(120_000);
  const sessionId = "guest-session-1";
  const guestAddress = {
    id: addressId,
    label: "HOME",
    receiverName: "Mona Hassan",
    phone: "+201012345678",
    country: "EG",
    governorate: "Cairo",
    city: "Nasr City",
    area: "El-Tawfiq",
    street: "Abbas El Akkad",
    building: "7",
    floor: null,
    apartment: null,
    postalCode: null,
    bostaGovernorateId: governorateId,
    bostaCityId: cityId,
    bostaZoneId: areaId,
    deliveryInstructions: null,
    landmark: null,
    isDefault: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  let ordered = false;
  let starts = 0;
  let places = 0;
  let placeKey = "";

  await page.route("**/api/v1/**", async (route) => {
    const request = route.request();
    const path = new URL(request.url()).pathname;
    const fulfill = (data: unknown) => route.fulfill({ json: { success: true, data } });

    if (path.endsWith("/auth/refresh")) {
      return route.fulfill({ status: 401, json: { success: false, code: "UNAUTHORIZED" } });
    }
    if (path.endsWith("/cart")) return fulfill({ ...cart(ordered), owner: "GUEST" });
    if (path.endsWith("/wishlist")) return fulfill({ items: [], totalItems: 0, updatedAt: null });
    if (path.endsWith("/guest-checkout/payment-instructions")) return fulfill([]);
    if (path.endsWith("/shipping/locations/governorates")) {
      return fulfill([{ id: governorateId, name: "Cairo", nameAr: "القاهرة", code: "CAI" }]);
    }
    if (path.endsWith("/shipping/locations/cities")) {
      return fulfill([
        { id: cityId, name: "Nasr City", nameAr: "مدينة نصر", governorateId, code: "NASR" },
      ]);
    }
    if (path.endsWith("/shipping/locations/areas")) {
      return fulfill([{ id: areaId, name: "El-Tawfiq", nameAr: "التوفيق" }]);
    }
    if (path.endsWith("/guest-checkout/start")) {
      starts += 1;
      expect(request.postDataJSON()).toMatchObject({
        contact: { firstName: "Mona", lastName: "Hassan", email: "mona@example.com" },
        address: { street: "Abbas El Akkad", building: "7", bostaZoneId: areaId },
      });
      return fulfill({
        sessionId,
        expiresAt: new Date(Date.now() + 2 * 3_600_000).toISOString(),
        address: guestAddress,
      });
    }
    if (path.endsWith(`/guest-checkout/${sessionId}/preview`)) {
      return fulfill({
        subtotal: 125000,
        discount: 0,
        shippingDiscount: 0,
        codFee: 0,
        total: 129000,
        totalSavings: 0,
        couponCode: null,
        appliedPromotions: [],
        provider: "MOCK",
        shippingCost: 4000,
        estimatedDays: 2,
        estimatedDeliveryDate: new Date(Date.now() + 2 * 86_400_000).toISOString(),
      });
    }
    if (path.endsWith(`/guest-checkout/${sessionId}/place`)) {
      places += 1;
      placeKey = request.headers()["idempotency-key"] ?? "";
      ordered = true;
      return fulfill({
        order: {
          id: "77777777-7777-4777-8777-777777777777",
          orderNumber: "BRZ-2001",
          status: "CONFIRMED",
          paymentStatus: "UNPAID",
          paymentMethod: "CASH_ON_DELIVERY",
          grandTotal: 129000,
        },
        guestOrderToken: "guest-order-token",
      });
    }
    return route.fulfill({ status: 404, json: { code: "NOT_MOCKED", message: path } });
  });

  await page.goto("/checkout");
  await expect(page.locator("html")).toHaveAttribute("data-hydrated", "true");
  await expect(page.getByRole("heading", { name: "Delivery", exact: true })).toBeVisible({
    timeout: 30_000,
  });
  await expect(page.getByText("Enter your delivery address to see shipping")).toBeVisible();

  await page.getByLabel("Full name").fill("Mona Hassan");
  await page.locator("#phone-number").fill("01012345678");
  await page.getByLabel("Email").fill("mona@example.com");
  await page.getByRole("combobox", { name: "Governorate" }).click();
  await page
    .getByRole("option", { name: /^Cairo/ })
    .first()
    .click();
  await page.getByRole("option", { name: /^Nasr City/ }).click();
  await page.getByRole("option", { name: /^El-Tawfiq/ }).click();
  await page.getByLabel("Street").fill("Abbas El Akkad");
  await page.getByLabel("Building").fill("7");
  // Done typing: on phones the purchase bar stays out of the keyboard's way until then.
  await page.getByLabel("Building").blur();

  // No "continue" button: delivery is priced as soon as the address is complete.
  await expect(page.getByRole("button", { name: /continue to payment/i })).toHaveCount(0);
  await expect(page.getByText("Standard delivery")).toBeVisible();
  await expect(page.locator(".ck-shipping")).toContainText("EGP 40.00");
  await expect(page.locator(".sf-checkout-place-order:visible").first()).toContainText(
    /Place order/,
  );
  expect(starts).toBe(1);

  await page.locator(".sf-checkout-place-order:visible").first().dblclick();
  await expect(page).toHaveURL(/\/order-confirmed/);
  expect(places).toBe(1);
  expect(placeKey).toMatch(/^[0-9a-f-]{36}$/);
  expect(starts).toBe(1);
});

test("empty carts cannot enter checkout steps", async ({ page }) => {
  await page.addInitScript(() => {
    window.localStorage.setItem("bioreza.csrf", "x".repeat(32));
  });
  await page.route("**/api/v1/**", async (route) => {
    const path = new URL(route.request().url()).pathname;
    const fulfill = (data: unknown) => route.fulfill({ json: { success: true, data } });
    if (path.endsWith("/auth/refresh")) {
      return fulfill({
        user: {
          id: "11111111-1111-4111-8111-111111111111",
          firstName: "Sara",
          lastName: "Ali",
          phone: "01012345678",
          email: "sara@example.com",
          role: "CLIENT",
          permissions: [],
        },
        tokens: { accessToken: "test-access-token", expiresIn: 900 },
        csrfToken: "y".repeat(32),
      });
    }
    if (path.endsWith("/cart/merge") || path.endsWith("/cart")) return fulfill(cart(true));
    if (path.endsWith("/wishlist")) {
      return fulfill({ items: [], totalItems: 0, updatedAt: null });
    }
    return route.fallback();
  });

  await page.goto("/checkout", { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("heading", { name: "Your bag is empty" })).toBeVisible();
  await expect(page.getByRole("list", { name: "Checkout progress" })).toHaveCount(0);
  await expect(page.getByRole("link", { name: "Browse products" })).toHaveAttribute(
    "href",
    "/shop",
  );
});
