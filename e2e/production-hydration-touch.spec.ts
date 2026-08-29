import { expect, test, type Locator, type Page } from "@playwright/test";

const affectedMobileWidths = [320, 360, 375, 390, 414, 430];

function monitorRuntime(page: Page) {
  const issues: string[] = [];
  page.on("pageerror", (error) => issues.push(`pageerror: ${error.message}`));
  page.on("console", (message) => {
    const value = message.text();
    if (
      message.type() === "error" ||
      (message.type() === "warning" && /hydration|did not match|server rendered/i.test(value))
    ) {
      issues.push(`${message.type()}: ${value}`);
    }
  });
  return issues;
}

async function expectOwnsHitTarget(page: Page, control: Locator) {
  const bounds = await control.boundingBox();
  expect(bounds).not.toBeNull();
  const ownsTarget = await control.evaluate(
    (element, { x, y }) => element.contains(document.elementFromPoint(x, y)),
    {
      x: bounds!.x + bounds!.width / 2,
      y: bounds!.y + bounds!.height / 2,
    },
  );
  expect(ownsTarget).toBe(true);
}

test("SSR media stays visible if client JavaScript cannot hydrate", async ({ page }) => {
  await page.route(/\/assets\/.*\.js(?:\?.*)?$/, (route) => route.abort());
  await page.goto("/", { waitUntil: "domcontentloaded" });

  const image = page.locator(".image-reveal-media").first();
  await expect(image).toBeAttached();
  await expect(image).toHaveCSS("opacity", "1");
  await expect(page.locator("html")).not.toHaveAttribute("data-hydrated", "true");
});

test("the production bundle hydrates and mobile layers do not intercept header taps", async ({
  browser,
}) => {
  for (const width of affectedMobileWidths) {
    const page = await browser.newPage({ viewport: { width, height: 820 } });
    const runtimeIssues = monitorRuntime(page);
    await page.goto("/shop", { waitUntil: "domcontentloaded" });
    await expect(page.locator("html")).toHaveAttribute("data-hydrated", "true");

    const menu = page.getByRole("button", { name: "Open menu" });
    const search = page.getByRole("button", { name: "Search" });
    const wishlist = page.getByRole("link", { name: /^Wishlist,/ });
    const cart = page.getByRole("button", { name: /^Shopping bag,/ });
    const logo = page.locator(".header-mobile-logo a");
    for (const control of [menu, search, wishlist, cart, logo]) {
      await expect(control).toBeVisible();
      await expectOwnsHitTarget(page, control);
    }

    await menu.click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await page.getByRole("button", { name: "Close menu" }).click();

    await search.click();
    await expect(page.locator("#storefront-search-dialog")).toBeVisible();
    await page.getByRole("button", { name: "Close search" }).click();

    await cart.click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await page.keyboard.press("Escape");

    expect(runtimeIssues, `${width}px production runtime issues`).toEqual([]);
    await page.close();
  }
});

test("the production bundle hydrates in Arabic RTL and accepts primary PLP controls", async ({
  page,
}) => {
  const runtimeIssues = monitorRuntime(page);
  await page.setViewportSize({ width: 390, height: 820 });
  await page.goto("/shop?lang=ar", { waitUntil: "domcontentloaded" });
  await expect(page.locator("html")).toHaveAttribute("data-hydrated", "true");
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");

  await page.getByRole("button", { name: /التصفية|Filters/ }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  expect(runtimeIssues).toEqual([]);
});
