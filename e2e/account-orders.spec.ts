import { expect, test } from "@playwright/test";

const orderId = "33333333-3333-4333-8333-333333333333";
const orderNumber = "BIO-20260926-1042";
const user = {
  id: "11111111-1111-4111-8111-111111111111",
  firstName: "Sara",
  lastName: "Ali",
  phone: "01012345678",
  email: "sara@example.com",
  role: "CLIENT",
  permissions: [],
};
const order = {
  id: orderId,
  orderNumber,
  status: "PROCESSING",
  paymentStatus: "PAID",
  paymentMethod: "COD",
  total: 55600,
  createdAt: "2026-09-25T12:00:00Z",
  subtotal: 56000,
  discount: 4000,
  shippingCost: 6000,
  shippingDiscount: 2400,
  tax: 0,
  appliedPromotions: [],
};
const details = {
  ...order,
  items: [
    {
      id: "item-1",
      productId: "product-1",
      variantId: "variant-1",
      productName: "Purchased Hydrating Cleanser",
      variantName: "200 ml",
      variantOptions: [
        {
          optionNameEn: "Size",
          optionNameAr: "الحجم",
          valueEn: "200 ml",
          valueAr: "200 مل",
        },
      ],
      imageReference: null,
      price: 25000,
      quantity: 2,
      discount: 4000,
      subtotal: 50000,
      discountedSubtotal: 46000,
    },
    {
      id: "item-2",
      productId: "product-2",
      variantId: "variant-2",
      productName: "Original Serum Name At Purchase",
      variantName: "30 ml",
      variantOptions: [],
      imageReference: null,
      price: 6000,
      quantity: 1,
      discount: 0,
      subtotal: 6000,
      discountedSubtotal: 6000,
    },
  ],
};
const tracking = {
  orderId,
  orderNumber,
  orderStatus: "PROCESSING",
  shipment: {
    provider: "BOSTA",
    trackingNumber: "5791307569",
    trackingUrl: "https://bosta.co/tracking-shipment/?trackingNumber=5791307569",
    status: "CREATED",
    estimatedDelivery: null,
    createdAt: "2026-09-25T12:00:00Z",
    updatedAt: "2026-09-25T12:00:00Z",
  },
  estimatedDeliveryDate: null,
  shippingAddress: {
    receiverName: "Sara Ali",
    governorate: "Cairo",
    city: "Cairo",
    area: "El Maadi",
  },
  history: [],
};

test.beforeEach(async ({ page }) => {
  test.setTimeout(90_000);
  await page.addInitScript(() => window.localStorage.setItem("bioreza.csrf", "x".repeat(32)));
  await page.route("**/api/v1/**", async (route) => {
    const path = new URL(route.request().url()).pathname;
    const fulfill = (data: unknown) => route.fulfill({ json: { success: true, data } });
    if (path.endsWith("/auth/refresh")) {
      return fulfill({
        user,
        tokens: { accessToken: "test-access-token", expiresIn: 900 },
        csrfToken: "y".repeat(32),
      });
    }
    if (path.endsWith("/users/me")) return fulfill(user);
    if (path.endsWith("/users/addresses")) return fulfill([]);
    if (path.endsWith("/wishlist"))
      return fulfill({ items: [], collections: [], totalItems: 0, updatedAt: null });
    if (path.endsWith("/cart") || path.endsWith("/cart/merge")) {
      return fulfill({
        cartId: "cart-1",
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
        updatedAt: "2026-09-25T12:00:00Z",
      });
    }
    if (path.endsWith("/orders")) return fulfill({ data: [order] });
    if (path.endsWith(`/orders/${orderId}`)) return fulfill(details);
    if (path.endsWith(`/orders/${orderId}/tracking`)) return fulfill(tracking);
    if (path.endsWith(`/orders/${orderId}/tracking/refresh`)) {
      return fulfill({
        ...tracking,
        shipment: { ...tracking.shipment, status: "OUT_FOR_DELIVERY" },
      });
    }
    return route.fulfill({ status: 404, json: { code: "NOT_MOCKED", message: path } });
  });
});

test("order history shows purchased items and amounts without expanding tracking", async ({
  page,
}) => {
  await page.goto("/account?section=orders");
  await expect(page.getByRole("heading", { name: "Your orders", exact: true })).toBeVisible({
    timeout: 60_000,
  });
  const contents = page.getByRole("region", { name: `Contents of order ${orderNumber}` });
  await expect(contents.getByText("Purchased Hydrating Cleanser")).toBeVisible();
  await expect(contents.getByText("Original Serum Name At Purchase")).toBeVisible();
  await expect(contents.getByText("200 ml", { exact: true })).toBeVisible();
  await expect(contents.getByText(/Quantity: 2/)).toContainText("250.00");
  await expect(contents.locator("li").first().locator("del")).toContainText("500.00");
  await expect(
    contents.locator("li").first().locator(".account-order-contents__price strong"),
  ).toContainText("460.00");
  await expect(contents.locator(".account-order-contents__totals")).toContainText("560.00");
  await expect(contents.locator(".account-order-contents__totals")).toContainText(
    "Shipping discount",
  );
  await expect(contents.locator(".account-order-contents__grand-total")).toContainText("556.00");
  await expect(page.locator(".account-tracking")).toHaveCount(0);
});

test("tracking remains readable across phone, tablet and desktop widths and Arabic RTL", async ({
  page,
}, testInfo) => {
  test.skip(
    !["chromium", "mobile-webkit"].includes(testInfo.project.name),
    "Run the viewport matrix in Chromium and iPhone Safari",
  );
  test.setTimeout(180_000);
  const widths =
    testInfo.project.name === "mobile-webkit"
      ? [320, 375, 390]
      : [320, 375, 390, 640, 768, 1024, 1366];
  for (const width of widths) {
    await page.setViewportSize({ width, height: 850 });
    await page.goto("/account?section=orders");
    await expect(page.getByRole("heading", { name: "Your orders", exact: true })).toBeVisible({
      timeout: 60_000,
    });
    await expect(page.getByText("Purchased Hydrating Cleanser")).toBeVisible();
    await page.getByRole("button", { name: "Track order", exact: true }).click();
    const header = page.locator(".account-tracking__header");
    await expect(header.locator("strong")).toHaveText("CREATED");
    const geometry = await header.evaluate((element) => {
      const status = element.querySelector("strong")!;
      const copy = element.querySelector("div")!;
      const button = element.querySelector("button")!;
      return {
        textWidth: copy.getBoundingClientRect().width,
        statusHeight: status.getBoundingClientRect().height,
        fontSize: parseFloat(getComputedStyle(status).fontSize),
        headerWidth: element.getBoundingClientRect().width,
        buttonWidth: button.getBoundingClientRect().width,
        contentsBottom: document.querySelector(".account-order-contents")!.getBoundingClientRect()
          .bottom,
        trackingTop: element.getBoundingClientRect().top,
        overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
      };
    });
    expect(geometry.textWidth, `${width}px tracking copy width`).toBeGreaterThan(150);
    expect(geometry.statusHeight, `${width}px single-line status`).toBeLessThan(
      geometry.fontSize * 2,
    );
    expect(geometry.buttonWidth).toBeLessThanOrEqual(geometry.headerWidth + 1);
    expect(geometry.trackingTop).toBeGreaterThan(geometry.contentsBottom);
    expect(geometry.overflow, `${width}px document overflow`).toBe(false);
    await expect(header.locator("small")).toHaveText("El Maadi, Cairo, Cairo");
    if (width === 390) {
      await page.getByRole("button", { name: "Refresh", exact: true }).click();
      await expect(header.locator("strong")).toHaveText("OUT FOR DELIVERY");
      await page.screenshot({ path: testInfo.outputPath("tracking-390px.png"), fullPage: true });
    }
    await page.getByRole("button", { name: "Hide tracking", exact: true }).click();
    await expect(page.locator(".account-tracking")).toHaveCount(0);
    await expect(page.getByText("Purchased Hydrating Cleanser")).toBeVisible();
  }
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/account?section=orders&lang=ar");
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  const contents = page.getByRole("region", { name: `محتويات الطلب ${orderNumber}` });
  await expect(contents.getByText("الحجم: 200 مل")).toBeVisible();
  await expect(contents.getByText(/الكمية: 2/)).toBeVisible();
  await page.getByRole("button", { name: "تتبع الطلب", exact: true }).click();
  await expect(page.locator(".account-tracking__header strong")).toHaveText("CREATED");
  expect(
    await page
      .locator(".account-tracking__header > div")
      .evaluate((element) => element.getBoundingClientRect().width),
  ).toBeGreaterThan(150);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    ),
  ).toBe(false);
  await page.screenshot({ path: testInfo.outputPath("tracking-arabic-375px.png"), fullPage: true });
});

test("a failed order-detail request can be retried without hiding the order or tracking", async ({
  page,
}) => {
  let available = false;
  await page.route(`**/api/v1/orders/${orderId}`, async (route) => {
    if (!available)
      return route.fulfill({ status: 503, json: { message: "Temporarily unavailable" } });
    return route.fulfill({ json: { success: true, data: details } });
  });
  await page.goto("/account?section=orders");
  await expect(page.getByRole("heading", { name: "Your orders", exact: true })).toBeVisible({
    timeout: 60_000,
  });
  const contents = page.getByRole("region", { name: `Contents of order ${orderNumber}` });
  await expect(contents.getByRole("alert")).toHaveText("Order contents couldn't be loaded.");
  await expect(page.getByRole("heading", { name: orderNumber })).toBeVisible();
  await expect(page.getByRole("button", { name: "Track order", exact: true })).toBeVisible();
  available = true;
  await contents.getByRole("button", { name: "Try again", exact: true }).click();
  await expect(contents.getByText("Purchased Hydrating Cleanser")).toBeVisible();
});
