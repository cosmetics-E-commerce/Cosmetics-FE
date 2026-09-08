import { expect, test, type Locator, type Page } from "@playwright/test";

async function ready(page: Page, path: string) {
  await page.goto(path);
  await page.locator('html[data-hydrated="true"]').waitFor();
}

async function mouseDrag(page: Page, target: Locator, dx: number) {
  await target.scrollIntoViewIfNeeded();
  const rect = await target.boundingBox();
  expect(rect).not.toBeNull();
  const x = rect!.x + rect!.width / 2;
  const y = Math.max(150, rect!.y + Math.min(rect!.height / 2, 140));
  await page.mouse.move(x, y);
  await page.mouse.down();
  await page.mouse.move(x + dx, y, { steps: 20 });
}

async function expectInside(scroller: Locator, target: Locator) {
  const clip = await scroller.boundingBox();
  const bounds = await target.boundingBox();
  expect(bounds!.x).toBeGreaterThanOrEqual(clip!.x - 2);
  expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(clip!.x + clip!.width + 2);
}

for (const locale of ["en", "ar"] as const) {
  const rtl = locale === "ar";

  test(`page-builder product carousels share dragging and arrow controls (${locale})`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 960 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await ready(page, `/page-builder-scroll-test?lang=${locale}`);
    const rail = page.locator(".landing-products--carousel");
    await expect(rail.locator(".product-card")).toHaveCount(8);
    await rail.scrollIntoViewIfNeeded();
    await expect(rail).toHaveAttribute("data-scrollable", "");
    const initialUrl = page.url();
    await mouseDrag(page, rail.locator(".product-card-media__link").nth(1), rtl ? 280 : -280);
    await expect.poll(() => rail.evaluate((el) => Math.abs(el.scrollLeft))).toBeGreaterThan(180);
    await page.mouse.up();
    expect(page.url()).toBe(initialUrl);
    await expect(rail).toHaveCSS("scrollbar-width", "none");
    await rail.focus();
    await page.keyboard.press("End");
    await expect(
      page.getByRole("button", { name: rtl ? "المزيد من المنتجات" : "More products", exact: true }),
    ).toBeDisabled();
    await expectInside(rail, rail.locator(".product-card").last());
  });

  test(`customer edit drags from product images without opening links (${locale})`, async ({
    page,
  }, testInfo) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await ready(page, `/?lang=${locale}`);
    const section = page.locator(".sf-bestsellers");
    const rail = section.locator(".sf-product-rail");
    await rail.scrollIntoViewIfNeeded();
    await expect(rail).toHaveAttribute("data-scrollable", "");
    await expect(rail.locator("li")).toHaveCount(8);
    const previous = section.getByRole("button", {
      name: rtl ? "المنتجات السابقة" : "Previous products",
      exact: true,
    });
    const more = section.getByRole("button", {
      name: rtl ? "المزيد من المنتجات" : "More products",
      exact: true,
    });
    await expect(previous).toBeDisabled();
    await expect(more).toBeEnabled();
    const originalUrl = page.url();
    await mouseDrag(page, rail.locator(".product-card-media__link").nth(1), rtl ? 300 : -300);
    // Check movement while held: a drag must follow the hand, not only move on release.
    await expect(rail).toHaveAttribute("data-dragging", "true");
    await expect.poll(() => rail.evaluate((el) => Math.abs(el.scrollLeft))).toBeGreaterThan(200);
    await page.mouse.up();
    await expect(rail).not.toHaveAttribute("data-dragging");
    expect(page.url()).toBe(originalUrl);
    await expect(previous).toBeEnabled();
    await expect(rail).toHaveCSS("scrollbar-width", "none");

    await rail.focus();
    await page.keyboard.press("End");
    await expect(more).toBeDisabled();
    await expectInside(rail, rail.locator("li").last());
    await page.keyboard.press("Home");
    await expect(previous).toBeDisabled();
    const before = await rail.evaluate((el) => el.scrollLeft);
    await more.click();
    await expect
      .poll(() => rail.evaluate((el) => Math.abs(el.scrollLeft)))
      .toBeGreaterThan(Math.abs(before) + 100);
    await rail.focus();
    await page.keyboard.press("Home");
    await expect(previous).toBeDisabled();
    await section.screenshot({ path: testInfo.outputPath(`customer-edit-${locale}.png`) });

    // A normal click still operates the card's wishlist button after a drag.
    const card = rail.locator("li").first();
    const wish = card.getByRole("button", { name: rtl ? /إضافة.*المفضلة/ : /Add .* to wishlist/ });
    await wish.click();
    await expect(
      page.getByText(rtl ? "سجّلي الدخول لحفظ قائمة المفضلة" : "Sign in to save a wishlist", {
        exact: true,
      }),
    ).toBeVisible();
    await card.getByRole("button", { name: rtl ? /زيادة الكمية/ : /Increase quantity/ }).click();
    await expect(card.locator(".quick-add output")).toHaveText("2");
    const link = rail.locator(".product-card-media__link").first();
    const href = await link.getAttribute("href");
    await link.click();
    await expect
      .poll(() => new URL(page.url()).pathname)
      .toBe(new URL(href!, originalUrl).pathname);
    expect(errors).toEqual([]);
  });

  test(`shop categories drag, reveal hidden names, and keep real clicks and keyboard navigation (${locale})`, async ({
    page,
  }, testInfo) => {
    await page.setViewportSize({ width: 1000, height: 900 });
    await ready(page, `/shop?lang=${locale}&sort=price-desc`);
    const strip = page.locator(".sf-shop-tabs");
    await strip.scrollIntoViewIfNeeded();
    await expect(strip).toHaveAttribute("data-scrollable", "");
    const previous = page.getByRole("button", {
      name: rtl ? "الفئات السابقة" : "Previous categories",
      exact: true,
    });
    const more = page.getByRole("button", {
      name: rtl ? "المزيد من الفئات" : "More categories",
      exact: true,
    });
    await expect(previous).toBeDisabled();
    await expect(more).toBeEnabled();
    const originalUrl = page.url();
    await mouseDrag(page, strip.getByRole("tab").nth(1), rtl ? 180 : -180);
    await expect.poll(() => strip.evaluate((el) => Math.abs(el.scrollLeft))).toBeGreaterThan(80);
    await page.mouse.up();
    expect(page.url()).toBe(originalUrl);
    await expect(previous).toBeEnabled();
    const first = strip.getByRole("tab").first();
    const last = strip.getByRole("tab").last();
    await first.focus();
    await page.keyboard.press("End");
    await expect(last).toBeFocused();
    await expectInside(strip, last);
    await expect(more).toBeDisabled();
    await page.keyboard.press("Home");
    await expect(first).toBeFocused();
    await expect(previous).toBeDisabled();
    await page.keyboard.press(rtl ? "ArrowLeft" : "ArrowRight");
    await expect(strip.getByRole("tab").nth(1)).toBeFocused();
    expect(page.url()).toBe(originalUrl);
    await more.click();
    await expect(previous).toBeEnabled();
    await page
      .locator(".sf-category-strip")
      .screenshot({ path: testInfo.outputPath(`shop-categories-${locale}.png`) });
    await last.focus();
    await page.keyboard.press("Enter");
    await expect(last).toHaveAttribute("aria-selected", "true");
    expect(new URL(page.url()).searchParams.get("category")).toBeTruthy();
    expect(new URL(page.url()).searchParams.get("sort")).toBe("price-desc");
    await expect(strip).toHaveCSS("touch-action", /^(manipulation|pan-x pan-y pinch-zoom)$/);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth - innerWidth),
    ).toBeLessThanOrEqual(1);
  });

  test(`homepage categories use arrows on small screens and hide them when everything fits (${locale})`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await ready(page, `/page-builder-featured-tabs-test?lang=${locale}`);
    const wrapper = page.locator(".sf-arrivals-category-strip");
    const strip = wrapper.locator(".sf-arrivals-tabs");
    await strip.scrollIntoViewIfNeeded();
    await expect(strip).toHaveAttribute("data-scrollable", "");
    await wrapper
      .getByRole("button", { name: rtl ? "المزيد من الفئات" : "More categories", exact: true })
      .click();
    await expect.poll(() => strip.evaluate((el) => Math.abs(el.scrollLeft))).toBeGreaterThan(30);
    const last = strip.getByRole("link").last();
    await last.focus();
    await expectInside(strip, last);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth - innerWidth),
    ).toBeLessThanOrEqual(1);
    await page.setViewportSize({ width: 1920, height: 1080 });
    await expect(wrapper.locator(".sf-scroll-arrow")).toHaveCount(0);
    await last.click();
    await expect(page).toHaveURL(/\/categories\/fragrance(?:\?|$)/);
  });
}

test("native touch gestures scroll categories horizontally and the page vertically", async ({
  browser,
  browserName,
}) => {
  test.skip(browserName !== "chromium", "Touch movement uses Chromium's native input API");
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });
  const page = await context.newPage();
  try {
    await ready(page, "http://127.0.0.1:4173/shop");
    const strip = page.locator(".sf-shop-tabs");
    await strip.scrollIntoViewIfNeeded();
    const rect = await strip.boundingBox();
    const session = await context.newCDPSession(page);
    const swipe = async (x: number, y: number, dx: number, dy: number) => {
      await session.send("Input.dispatchTouchEvent", {
        type: "touchStart",
        touchPoints: [{ x, y }],
      });
      for (let i = 1; i <= 12; i++) {
        await session.send("Input.dispatchTouchEvent", {
          type: "touchMove",
          touchPoints: [{ x: x + (dx * i) / 12, y: y + (dy * i) / 12 }],
        });
        await page.waitForTimeout(16);
      }
      await session.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
    };
    await swipe(rect!.x + rect!.width - 12, rect!.y + rect!.height / 2, -140, 0);
    await expect.poll(() => strip.evaluate((el) => el.scrollLeft)).toBeGreaterThan(50);
    expect(new URL(page.url()).searchParams.has("category")).toBe(false);
    const yBefore = await page.evaluate(() => scrollY);
    await swipe(rect!.x + rect!.width / 2, rect!.y + rect!.height / 2, 0, -150);
    await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(yBefore + 50);
  } finally {
    await context.close();
  }
});
