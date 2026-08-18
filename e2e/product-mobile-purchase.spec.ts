import { expect, test, type Locator, type Page } from "@playwright/test";

const productPath = "/product/acm-depiwhite-eye-contour-gel-15ml";

type PurchaseGeometry = {
  viewportWidth: number;
  documentOverflow: number;
  bar: DOMRectShape;
  price: DOMRectShape;
  action: DOMRectShape;
  actionContentOverflow: number;
  backToTop: DOMRectShape | null;
};

type DOMRectShape = {
  left: number;
  right: number;
  top: number;
  bottom: number;
  width: number;
  height: number;
};

test("the mobile purchase bar protects the Add to Bag action at every breakpoint", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(productPath, { waitUntil: "networkidle" });
  const bar = page.locator(".product-mobile-purchase");
  const action = bar.locator(".product-mobile-purchase__action");
  const price = bar.locator(".product-mobile-purchase__price");
  await expect(bar).toBeVisible();

  for (const width of [320, 360, 375, 390, 393, 414, 430]) {
    await page.setViewportSize({ width, height: 844 });
    await page.evaluate(() => window.scrollTo(0, 900));
    const geometry = await measurePurchase(page);
    assertProtectedAction(geometry);
    expect(geometry.backToTop).toBeNull();
    expect(geometry.bar.bottom).toBeCloseTo(844, 1);
  }

  await page.setViewportSize({ width: 320, height: 844 });
  await price.evaluate((element) => {
    element.textContent = "EGP 999,999.00";
  });
  const stableWidth = (await action.boundingBox())!.width;
  for (const label of ["ADDING...", "ADDED", "OUT OF STOCK"]) {
    await action.locator("span").evaluate((element, text) => {
      element.textContent = text;
    }, label);
    await action.evaluate((element, disabled) => {
      (element as HTMLButtonElement).disabled = disabled;
    }, label === "OUT OF STOCK");
    const geometry = await measurePurchase(page);
    assertProtectedAction(geometry);
    expect(geometry.action.width).toBeCloseTo(stableWidth, 1);
  }

  await page.locator("html").evaluate((element) => {
    element.dir = "rtl";
    element.classList.add("dark");
  });
  const rtlGeometry = await measurePurchase(page);
  assertProtectedAction(rtlGeometry);
  expect(rtlGeometry.price.left).toBeGreaterThan(rtlGeometry.action.left);

  await page.setViewportSize({ width: 768, height: 700 });
  await page.evaluate(() => window.scrollTo(0, 900));
  await expect(page.locator(".site-back-to-top")).toBeVisible();
  const tabletGeometry = await measurePurchase(page);
  assertProtectedAction(tabletGeometry);
  expect(tabletGeometry.backToTop).not.toBeNull();
  expect(tabletGeometry.backToTop!.bottom).toBeLessThan(tabletGeometry.bar.top);

  await page.setViewportSize({ width: 844, height: 390 });
  const landscapeGeometry = await measurePurchase(page);
  assertProtectedAction(landscapeGeometry);
  expect(landscapeGeometry.backToTop!.bottom).toBeLessThan(landscapeGeometry.bar.top);

  await page.setViewportSize({ width: 1024, height: 768 });
  await expect(bar).toBeHidden();
  expect(await pageHasHorizontalOverflow(page)).toBe(false);
});

test("the real loading state does not move or resize the protected action", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 844 });
  await page.goto(productPath, { waitUntil: "networkidle" });
  const action = page.locator(".product-mobile-purchase__action");
  const before = await action.boundingBox();
  expect(before).not.toBeNull();

  let releaseRequest: (() => void) | undefined;
  const requestHeld = new Promise<void>((resolve) => {
    releaseRequest = resolve;
  });
  await page.route("**/api/v1/cart/items", async (route) => {
    if (route.request().method() !== "POST") return route.continue();
    await requestHeld;
    await route.abort();
  });

  await action.click();
  await expect(action).toHaveAttribute("aria-busy", "true");
  const loading = await action.boundingBox();
  expect(loading).not.toBeNull();
  expect(loading!.width).toBeCloseTo(before!.width, 1);
  expect(loading!.height).toBeCloseTo(before!.height, 1);
  assertProtectedAction(await measurePurchase(page));

  releaseRequest?.();
  await expect(action).not.toHaveAttribute("aria-busy", "true");
});

test("Arabic keeps price and action in the correct logical order", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 844 });
  await page.goto(`${productPath}?lang=ar`, { waitUntil: "networkidle" });
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  const geometry = await measurePurchase(page);
  assertProtectedAction(geometry);
  expect(geometry.price.left).toBeGreaterThan(geometry.action.left);
  await expect(page.locator(".product-mobile-purchase__action")).toContainText(/الحقيبة|المخزون/);
});

function assertProtectedAction(geometry: PurchaseGeometry) {
  expect(geometry.documentOverflow).toBeLessThanOrEqual(0.5);
  expect(geometry.bar.left).toBeGreaterThanOrEqual(-0.5);
  expect(geometry.bar.right).toBeLessThanOrEqual(geometry.viewportWidth + 0.5);
  expect(geometry.action.left).toBeGreaterThanOrEqual(geometry.bar.left);
  expect(geometry.action.right).toBeLessThanOrEqual(geometry.bar.right);
  expect(geometry.action.width).toBeGreaterThan(geometry.price.width);
  expect(geometry.action.height).toBeGreaterThanOrEqual(48);
  expect(geometry.actionContentOverflow).toBeLessThanOrEqual(0.5);
  if (geometry.backToTop) expect(overlaps(geometry.action, geometry.backToTop)).toBe(false);
}

async function measurePurchase(page: Page): Promise<PurchaseGeometry> {
  return page.locator(".product-mobile-purchase").evaluate((element) => {
    const shape = (target: Element): DOMRectShape => {
      const rect = target.getBoundingClientRect();
      return {
        left: rect.left,
        right: rect.right,
        top: rect.top,
        bottom: rect.bottom,
        width: rect.width,
        height: rect.height,
      };
    };
    const backToTop = document.querySelector(".site-back-to-top");
    const action = element.querySelector(".product-mobile-purchase__action")!;
    return {
      viewportWidth: document.documentElement.clientWidth,
      documentOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      bar: shape(element),
      price: shape(element.querySelector(".product-mobile-purchase__price")!),
      action: shape(action),
      actionContentOverflow: action.scrollWidth - action.clientWidth,
      backToTop:
        backToTop && getComputedStyle(backToTop).display !== "none" ? shape(backToTop) : null,
    };
  });
}

function overlaps(first: DOMRectShape, second: DOMRectShape) {
  return !(
    first.right <= second.left ||
    first.left >= second.right ||
    first.bottom <= second.top ||
    first.top >= second.bottom
  );
}

async function pageHasHorizontalOverflow(page: Page) {
  return page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  );
}
