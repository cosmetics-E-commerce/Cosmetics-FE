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
    if (path.endsWith("/shipping/rates")) {
      expect(new URL(request.url()).searchParams.get("addressId")).toBe(addressId);
      return fulfill({
        provider: "MOCK",
        shippingCost: 0,
        estimatedDays: 3,
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
  await expect(page.getByRole("heading", { name: "Confirm delivery and payment." })).toBeVisible({
    // Cold Vite route splitting plus the mocked auth/cart bootstrap can exceed
    // the global assertion budget when another route-heavy test runs in the
    // second worker. This waits for the actual ready state; it does not mask a
    // missing heading because the route must still complete before proceeding.
    timeout: 30_000,
  });

  if (testInfo.project.name.startsWith("mobile")) {
    await page.getByRole("button", { name: "Open menu" }).click();
    await page.getByRole("button", { name: "العربية" }).click();
    await expect(page).toHaveURL(/(?:\?|&)lang=ar(?:&|$)/);
  } else {
    await page.getByRole("button", { name: "التبديل إلى العربية" }).click();
  }
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  await expect(page.getByRole("heading", { name: "أكّدي التوصيل وطريقة الدفع." })).toBeVisible();

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

  if (testInfo.project.name.startsWith("mobile")) {
    await page.getByRole("button", { name: "فتح القائمة" }).click();
    await page.getByRole("button", { name: "English" }).click();
    await expect(page).not.toHaveURL(/(?:\?|&)lang=ar(?:&|$)/);
  } else {
    await page.getByRole("button", { name: "Switch to English" }).click();
  }
  await expect(page.locator("html")).toHaveAttribute("dir", "ltr");

  const stepper = page.getByRole("list", { name: "Checkout progress" });
  await expect(stepper.getByRole("listitem")).toHaveCount(4);
  await expect(stepper.getByText("Bag", { exact: true })).toHaveCount(0);
  await expect(page.getByRole("heading", { name: "Delivery Address", exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: "Place order" })).toHaveCount(0);
  await expect(page.getByLabel("Receiver name")).toHaveValue("Sara Ali");
  await page.getByRole("combobox", { name: "Governorate" }).click();
  await page.getByText("Cairo", { exact: true }).click();
  const city = page.getByRole("combobox", { name: "City / Markaz" });
  await expect(city).toBeEnabled();
  await city.click();
  await page.getByText("Nasr City", { exact: true }).click();
  const area = page.getByRole("combobox", { name: "District / area" });
  await expect(area).toBeEnabled();
  await area.click();
  await page.getByText("El-Tawfiq", { exact: true }).click();
  await page.getByLabel("Street").fill("Mostafa El Nahas");
  await page.getByLabel("Building").fill("12");
  await page.getByRole("button", { name: "Save and use this address" }).click();

  await expect(page.getByText("12 Mostafa El Nahas", { exact: false })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Delivery Address", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Payment", exact: true })).toBeHidden();

  await page.getByRole("button", { name: "Continue to Review" }).click();
  await expect(page.getByRole("heading", { name: "Review", exact: true })).toBeVisible();
  await expect(page.getByRole("list", { name: "Order products" })).toContainText("Calm Serum");
  await expect(page.getByText("12 Mostafa El Nahas", { exact: false })).toBeVisible();

  await page.getByRole("button", { name: "Back to Delivery Address" }).click();
  await expect(page.getByRole("heading", { name: "Delivery Address", exact: true })).toBeVisible();
  await expect(page.getByText("12 Mostafa El Nahas", { exact: false })).toBeVisible();
  await page.getByRole("button", { name: "Continue to Review" }).click();

  await page.getByRole("button", { name: "Continue to Payment" }).click();
  await expect(page.getByRole("heading", { name: "Payment", exact: true })).toBeVisible();
  await page.getByPlaceholder("Optional delivery instructions").fill("Leave with reception");
  await page.getByRole("button", { name: "Back to Review" }).click();
  await expect(page.getByRole("heading", { name: "Review", exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Continue to Payment" }).click();
  await expect(page.getByPlaceholder("Optional delivery instructions")).toHaveValue(
    "Leave with reception",
  );

  const visiblePlaceOrders = page.locator(".sf-checkout-place-order:visible");
  await expect(visiblePlaceOrders).toHaveCount(1);
  if (testInfo.project.name.startsWith("mobile")) {
    await expect(page.locator(".sf-checkout-place-order--inline")).toBeHidden();
    await expect(page.locator(".sf-checkout-place-order--sticky")).toBeVisible();
    await expect(page.getByText("Final total", { exact: true })).toBeVisible();
    await page.locator(".site-footer__bottom").scrollIntoViewIfNeeded();
    const footerClearance = await page.evaluate(() => {
      const footer = document.querySelector<HTMLElement>(".site-footer__bottom");
      const bar = document.querySelector<HTMLElement>(".sf-checkout-mobile-purchase");
      if (!footer || !bar) return -1;
      return bar.getBoundingClientRect().top - footer.getBoundingClientRect().bottom;
    });
    expect(footerClearance).toBeGreaterThanOrEqual(-1);
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
