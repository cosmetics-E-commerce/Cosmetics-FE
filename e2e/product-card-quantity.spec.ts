import { expect, test, type Locator, type Page } from "@playwright/test";

const mobileWidths = [320, 360, 375, 390, 393, 414, 430];

test("mobile grid cards keep the quantity stepper symmetric and isolated", async ({ page }) => {
  await page.goto("/shop", { waitUntil: "networkidle" });

  for (const width of mobileWidths) {
    await page.setViewportSize({ width, height: 900 });
    const toolbar = page.locator(".sf-shop-page .quick-add").first();
    await expect(toolbar).toBeVisible();
    const geometry = await measureToolbar(toolbar);

    assertStableToolbar(geometry);
    expect(geometry.layout).toBe("stacked");
    expect(geometry.root.top).toBeGreaterThanOrEqual(geometry.media.bottom + 6);
    expect(geometry.root.left).toBeGreaterThanOrEqual(geometry.purchase.left - 0.5);
    expect(geometry.root.right).toBeLessThanOrEqual(geometry.purchase.right + 0.5);
    expect(geometry.documentOverflow).toBeLessThanOrEqual(0.5);
    expect(geometry.minus.height).toBeGreaterThanOrEqual(44);
    expect(geometry.plus.height).toBeGreaterThanOrEqual(44);
    expect(geometry.minus.width).toBeGreaterThanOrEqual(40);
    expect(geometry.plus.width).toBeGreaterThanOrEqual(40);
  }
});

test("commerce controls respond to their card width instead of the viewport alone", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 900 });
  await page.goto("/shop", { waitUntil: "networkidle" });
  const products = page.locator(".sf-shop-products");
  const toolbar = page.locator(".sf-shop-page .quick-add").first();

  for (const width of [160, 180, 200, 240, 280, 320]) {
    await products.evaluate((element, nextWidth) => {
      const grid = element as HTMLElement;
      grid.style.width = `${nextWidth}px`;
      grid.style.gridTemplateColumns = "minmax(0, 1fr)";
      grid.style.marginInline = "auto";
    }, width);

    const geometry = await measureToolbar(toolbar);
    assertStableToolbar(geometry);
    expect(geometry.layout).toBe(width <= 300 ? "stacked" : "inline");
    expect(geometry.root.width).toBeCloseTo(width, 0);
    expect(geometry.documentOverflow).toBeLessThanOrEqual(0.5);
  }
});

test("quantity digits and stock states do not move the stepper zones", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 900 });
  await page.goto("/shop", { waitUntil: "networkidle" });
  const toolbar = page.locator(".sf-shop-page .quick-add").first();
  const decrement = toolbar.getByRole("button", { name: /Decrease quantity/ });
  const increment = toolbar.getByRole("button", { name: /Increase quantity/ });
  const output = toolbar.locator("output");

  await expect(output).toHaveText("1");
  await expect(decrement).toBeDisabled();
  await increment.click();
  await expect(output).toHaveText("2");
  await expect(decrement).toBeEnabled();

  for (let quantity = 3; quantity <= 8; quantity += 1) await increment.click();
  await expect(output).toHaveText("8");
  await expect(increment).toBeDisabled();
  await expect(page.locator(".sf-product-card__badge--low")).toHaveCount(0);

  const stableButtons = await buttonGeometry(toolbar);
  for (const quantity of [1, 2, 9, 10]) {
    await output.evaluate((element, value) => {
      element.textContent = String(value);
    }, quantity);
    expect(await buttonGeometry(toolbar)).toEqual(stableButtons);
  }

  await page.goto("/shop?search=out-of-stock", { waitUntil: "networkidle" });
  const unavailableToolbar = page.locator(".sf-shop-page .quick-add").first();
  await expect(unavailableToolbar.getByRole("button", { name: /^Out of stock:/ })).toBeDisabled();
  await expect(unavailableToolbar.locator(".quick-add__quantity")).toHaveCount(0);
  await expect(unavailableToolbar.locator(".quick-add__divider")).toHaveCount(0);
  await expect(unavailableToolbar.locator("svg")).toHaveCount(0);
});

test("list view and Arabic RTL preserve the same logical separation", async ({ page }) => {
  for (const scenario of [
    { url: "/shop?view=list", width: 320, direction: "ltr" },
    { url: "/shop?view=list&lang=ar", width: 390, direction: "rtl" },
  ]) {
    await page.setViewportSize({ width: scenario.width, height: 900 });
    await page.goto(scenario.url, { waitUntil: "networkidle" });
    const toolbar = page.locator(".sf-shop-page .quick-add").first();
    await expect(toolbar).toBeVisible();
    const geometry = await measureToolbar(toolbar);

    assertStableToolbar(geometry);
    expect(geometry.direction).toBe(scenario.direction);
    expect(geometry.layout).toBe(scenario.width === 320 ? "stacked" : "inline");
    expect(geometry.minus.width).toBeGreaterThanOrEqual(38);
    expect(geometry.plus.width).toBeGreaterThanOrEqual(38);
    expect(geometry.documentOverflow).toBeLessThanOrEqual(0.5);

    await page.locator("html").evaluate((element) => element.classList.add("dark"));
    assertStableToolbar(await measureToolbar(toolbar));
  }
});

test("desktop grid and list cards keep the toolbar inside the product media", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });

  for (const url of ["/shop", "/shop?view=list"]) {
    await page.goto(url, { waitUntil: "networkidle" });
    const card = page.locator(".sf-product-card").first();
    await card.hover();
    const toolbar = card.locator(".quick-add");
    await expect(toolbar).toBeVisible();
    const geometry = await measureToolbar(toolbar);
    const media = await box(card.locator(".sf-product-card__media"));

    assertStableToolbar(geometry);
    expect(geometry.layout).toBe("inline");
    expect(geometry.root.left).toBeGreaterThanOrEqual(media.left);
    expect(geometry.root.right).toBeLessThanOrEqual(media.right);
    expect(geometry.root.top).toBeGreaterThanOrEqual(media.top);
    expect(geometry.root.bottom).toBeLessThanOrEqual(media.bottom);
  }
});

type Rect = {
  left: number;
  right: number;
  top: number;
  bottom: number;
  width: number;
  height: number;
};

type ToolbarGeometry = {
  layout: "stacked" | "inline";
  mobileComposition: boolean;
  direction: string;
  documentOverflow: number;
  labelLines: number;
  labelOverflow: number;
  root: Rect;
  content: Rect;
  purchase: Rect;
  media: Rect;
  quantity: Rect;
  minus: Rect;
  output: Rect;
  plus: Rect;
  action: Rect;
};

function assertStableToolbar(geometry: ToolbarGeometry) {
  expect(geometry.root.width).toBeGreaterThan(0);
  expect(geometry.root.height).toBeGreaterThanOrEqual(42);
  expect(geometry.minus.height).toBeGreaterThanOrEqual(40);
  expect(geometry.plus.height).toBeGreaterThanOrEqual(40);
  expect(geometry.action.height).toBeGreaterThanOrEqual(40);
  expect(geometry.labelLines).toBeLessThanOrEqual(1.1);
  if (geometry.mobileComposition) expect(geometry.labelOverflow).toBeLessThanOrEqual(0.5);
  expect(geometry.minus.width).toBeCloseTo(geometry.output.width, 1);
  expect(geometry.output.width).toBeCloseTo(geometry.plus.width, 1);
  expect(center(geometry.minus, "x") - center(geometry.output, "x")).toBeCloseTo(
    center(geometry.output, "x") - center(geometry.plus, "x"),
    1,
  );

  for (const item of [geometry.minus, geometry.output, geometry.plus]) {
    expect(center(item, "y")).toBeCloseTo(center(geometry.quantity, "y"), 1);
  }

  expect(geometry.minus.right).toBeLessThanOrEqual(geometry.output.left + 0.5);
  expect(geometry.output.right).toBeLessThanOrEqual(geometry.plus.left + 0.5);
  if (geometry.layout === "stacked") {
    expect(geometry.quantity.width).toBeCloseTo(geometry.content.width, 1);
    expect(geometry.action.width).toBeCloseTo(geometry.content.width, 1);
    expect(geometry.action.top).toBeGreaterThanOrEqual(geometry.quantity.bottom + 5);
  } else {
    expect(center(geometry.action, "y")).toBeCloseTo(center(geometry.content, "y"), 1);
    const outerZones = [geometry.quantity, geometry.action].sort(
      (first, second) => first.left - second.left,
    );
    expect(outerZones[0]!.right).toBeLessThanOrEqual(outerZones[1]!.left - 1.5);
  }
}

async function measureToolbar(toolbar: Locator): Promise<ToolbarGeometry> {
  return toolbar.evaluate((root) => {
    const rect = (element: Element): Rect => {
      const value = element.getBoundingClientRect();
      return {
        left: value.left,
        right: value.right,
        top: value.top,
        bottom: value.bottom,
        width: value.width,
        height: value.height,
      };
    };
    const quantity = root.querySelector(".quick-add__quantity")!;
    const buttons = quantity.querySelectorAll("button");
    const label = root.querySelector(".quick-add__action span")!;
    const labelStyles = getComputedStyle(label);
    const quantityRect = rect(quantity);
    const actionRect = rect(root.querySelector(".quick-add__action")!);
    const card = root.closest(".product-card")!;
    return {
      layout: actionRect.top >= quantityRect.bottom - 0.5 ? "stacked" : "inline",
      mobileComposition: getComputedStyle(root).position === "relative",
      direction: getComputedStyle(root).direction,
      documentOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      labelLines: label.getBoundingClientRect().height / Number.parseFloat(labelStyles.lineHeight),
      labelOverflow: label.scrollWidth - label.clientWidth,
      root: rect(root),
      content: rect(root.querySelector(".quick-add__content")!),
      purchase: rect(root.parentElement!),
      media: rect(card.querySelector(".product-card-media")!),
      quantity: quantityRect,
      minus: rect(buttons[0]!),
      output: rect(quantity.querySelector("output")!),
      plus: rect(buttons[1]!),
      action: actionRect,
    };
  });
}

async function buttonGeometry(toolbar: Locator) {
  return toolbar.locator(".quick-add__quantity").evaluate((quantity) =>
    [...quantity.querySelectorAll("button")].map((button) => {
      const rect = button.getBoundingClientRect();
      return { left: rect.left, width: rect.width };
    }),
  );
}

async function box(locator: Locator): Promise<Rect> {
  return locator.evaluate((element) => {
    const rect = element.getBoundingClientRect();
    return {
      left: rect.left,
      right: rect.right,
      top: rect.top,
      bottom: rect.bottom,
      width: rect.width,
      height: rect.height,
    };
  });
}

function center(rect: Rect, axis: "x" | "y") {
  return axis === "x" ? rect.left + rect.width / 2 : rect.top + rect.height / 2;
}
