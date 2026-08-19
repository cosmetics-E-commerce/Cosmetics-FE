import { expect, test, type Locator, type Page } from "@playwright/test";

const mobileWidths = [320, 360, 375, 390, 393, 414, 430];

test("stock states render mutually exclusive product-card actions", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 900 });

  await page.goto("/shop?search=stock-ten", { waitUntil: "networkidle" });
  const inStockCard = page.locator(".sf-product-card").first();
  await expect(inStockCard.locator(".quick-add__quantity")).toBeVisible();
  await expect(inStockCard.getByRole("button", { name: /^Add to bag:/ })).toBeEnabled();
  await expect(inStockCard.locator(".sf-product-card__badge--low")).toHaveCount(0);
  const purchasableHeight = (await inStockCard.locator(".quick-add").boundingBox())!.height;

  await page.goto("/shop?search=stock-one", { waitUntil: "networkidle" });
  const lowStockCard = page.locator(".sf-product-card").first();
  await expect(lowStockCard.locator(".sf-product-card__badge--low")).toBeVisible();
  await expect(lowStockCard.locator(".sf-product-card__badge--stock")).toHaveCount(0);
  await expect(lowStockCard.locator(".quick-add__quantity")).toBeVisible();
  await expect(lowStockCard.getByRole("button", { name: /^Add to bag:/ })).toBeEnabled();

  await page.goto("/shop?search=out-of-stock", { waitUntil: "networkidle" });
  const outOfStockCard = page.locator(".sf-product-card").first();
  const unavailable = outOfStockCard.locator(".quick-add__unavailable");
  await expect(outOfStockCard.locator(".sf-product-card__badge--stock")).toBeVisible();
  await expect(outOfStockCard.locator(".sf-product-card__badge--low")).toHaveCount(0);
  await expect(unavailable).toBeVisible();
  await expect(unavailable).toBeDisabled();
  await expect(unavailable).toHaveText("Out of stock");
  await expect(outOfStockCard.locator(".quick-add__quantity")).toHaveCount(0);
  await expect(outOfStockCard.locator(".quick-add__divider")).toHaveCount(0);
  await expect(outOfStockCard.locator(".quick-add svg")).toHaveCount(0);
  await expect(outOfStockCard.getByRole("button", { name: /^Add to bag:/ })).toHaveCount(0);
  await expect(outOfStockCard.locator(".sf-product-card__title a")).toHaveAttribute(
    "href",
    "/product/out-of-stock-product",
  );
  expect((await outOfStockCard.locator(".quick-add").boundingBox())!.height).toBeCloseTo(
    purchasableHeight,
    1,
  );

  let cartRequests = 0;
  page.on("request", (request) => {
    if (request.url().includes("/api/v1/cart/items") && request.method() === "POST") {
      cartRequests += 1;
    }
  });
  await unavailable.evaluate((button: HTMLButtonElement) => button.click());
  await page.waitForTimeout(100);
  expect(cartRequests).toBe(0);
});

test("out-of-stock action stays clean at every mobile width and in Arabic", async ({ page }) => {
  for (const width of mobileWidths) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/shop?search=out-of-stock", { waitUntil: "networkidle" });
    await assertUnavailableAction(page, "Out of stock");
  }

  await page.setViewportSize({ width: 320, height: 900 });
  await page.goto("/shop?search=out-of-stock&lang=ar", { waitUntil: "networkidle" });
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  await assertUnavailableAction(page, "غير متوفر");
  await expect(page.locator(".sf-product-card__badge--stock").first()).toHaveText("غير متوفر");
});

test("the card selects an available variant and never submits its sold-out sibling", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 900 });
  await page.goto("/shop?search=variant-stock", { waitUntil: "networkidle" });
  const card = page.locator(".sf-product-card").first();

  await expect(card.locator(".quick-add__quantity")).toBeVisible();
  const add = card.getByRole("button", { name: /^Add to bag:/ });
  await expect(add).toBeEnabled();

  await page.route("**/api/v1/cart/items", (route) => route.abort());
  const requestPromise = page.waitForRequest(
    (request) => request.url().includes("/api/v1/cart/items") && request.method() === "POST",
  );
  await add.click();
  const request = await requestPromise;
  expect(request.postDataJSON()).toEqual({
    variantId: "10000000-0000-4000-8000-000000000002",
    quantity: 1,
  });
});

test("wishlist control is balanced, separated from badges, and mirrors in RTL", async ({
  page,
}) => {
  await page.goto("/shop?search=stock-one", { waitUntil: "networkidle" });

  for (const width of mobileWidths) {
    await page.setViewportSize({ width, height: 900 });
    const card = page.locator(".sf-product-card").first();
    const wish = card.locator(".sf-product-card__wish");
    const icon = wish.locator(".sf-product-card__wish-icon");
    const badge = card.locator(".sf-product-card__badge--low");
    await expect(wish).toBeVisible();
    await expect(badge).toBeVisible();

    const geometry = await measureWishlist(card);
    expect(geometry.button.width).toBeCloseTo(42, 1);
    expect(geometry.button.height).toBeCloseTo(42, 1);
    expect(geometry.icon.width).toBeCloseTo(22, 1);
    expect(geometry.icon.height).toBeCloseTo(22, 1);
    expect(center(geometry.button, "x")).toBeCloseTo(center(geometry.icon, "x"), 1);
    expect(center(geometry.button, "y")).toBeCloseTo(center(geometry.icon, "y"), 1);
    expect(overlaps(geometry.button, geometry.badge)).toBe(false);
    expect(geometry.button.right).toBeLessThanOrEqual(geometry.media.right);
    expect(geometry.button.top).toBeGreaterThanOrEqual(geometry.media.top);
    await expect(icon).toHaveAttribute("stroke-width", "1.8");
  }

  const wish = page.locator(".sf-product-card__wish").first();
  const initialUrl = page.url();
  await expect(wish).toHaveAttribute("aria-pressed", "false");
  await expect(wish).toHaveAccessibleName(/Add .* to wishlist/);
  await wish.click();
  expect(page.url()).toBe(initialUrl);

  await wish.evaluate((button) => button.setAttribute("aria-pressed", "true"));
  await page.waitForTimeout(200);
  const activeColors = await wish.locator("svg").evaluate((icon) => {
    const styles = getComputedStyle(icon);
    return { color: styles.color, fill: styles.fill };
  });
  expect(activeColors.fill).toBe(activeColors.color);

  await page.setViewportSize({ width: 390, height: 900 });
  await page.goto("/shop?search=stock-one&lang=ar", { waitUntil: "networkidle" });
  const rtlCard = page.locator(".sf-product-card").first();
  const rtlGeometry = await measureWishlist(rtlCard);
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  await expect(rtlCard.locator(".sf-product-card__wish")).toHaveAccessibleName(/إضافة .* المفضلة/);
  expect(rtlGeometry.button.left).toBeLessThan(rtlGeometry.badge.left);
  expect(overlaps(rtlGeometry.button, rtlGeometry.badge)).toBe(false);
});

type Rect = {
  left: number;
  right: number;
  top: number;
  bottom: number;
  width: number;
  height: number;
};

async function assertUnavailableAction(page: Page, label: string) {
  const card = page.locator(".sf-product-card").first();
  const root = card.locator(".quick-add--unavailable");
  const action = root.locator(".quick-add__unavailable");
  await expect(root).toBeVisible();
  await expect(action).toBeDisabled();
  await expect(action).toHaveText(label);
  await expect(root.locator("button")).toHaveCount(1);
  await expect(root.locator("svg, output, .quick-add__divider")).toHaveCount(0);
  const geometry = await action.evaluate((element) => {
    const rect = element.getBoundingClientRect();
    const styles = getComputedStyle(element);
    const text = document.createRange();
    text.selectNodeContents(element);
    return {
      width: rect.width,
      height: rect.height,
      lines: text.getClientRects().length,
      cursor: styles.cursor,
      overflow: element.scrollWidth - element.clientWidth,
    };
  });
  expect(geometry.width).toBeGreaterThan(0);
  expect(geometry.height).toBeGreaterThanOrEqual(44);
  expect(geometry.lines).toBeLessThanOrEqual(1.1);
  expect(geometry.cursor).toBe("not-allowed");
  expect(geometry.overflow).toBeLessThanOrEqual(0.5);
}

async function measureWishlist(card: Locator) {
  return card.evaluate((element) => {
    const rect = (target: Element): Rect => {
      const value = target.getBoundingClientRect();
      return {
        left: value.left,
        right: value.right,
        top: value.top,
        bottom: value.bottom,
        width: value.width,
        height: value.height,
      };
    };
    return {
      media: rect(element.querySelector(".sf-product-card__media")!),
      button: rect(element.querySelector(".sf-product-card__wish")!),
      icon: rect(element.querySelector(".sf-product-card__wish-icon")!),
      badge: rect(element.querySelector(".sf-product-card__badge")!),
    };
  });
}

function center(rect: Rect, axis: "x" | "y") {
  return axis === "x" ? rect.left + rect.width / 2 : rect.top + rect.height / 2;
}

function overlaps(first: Rect, second: Rect) {
  return !(
    first.right <= second.left ||
    first.left >= second.right ||
    first.bottom <= second.top ||
    first.top >= second.bottom
  );
}
