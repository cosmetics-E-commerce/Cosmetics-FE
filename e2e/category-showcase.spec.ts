import { expect, test } from "@playwright/test";

const mobileViewports = [
  { width: 320, height: 568 },
  { width: 360, height: 800 },
  { width: 375, height: 812 },
  { width: 390, height: 844 },
  { width: 393, height: 852 },
  { width: 414, height: 896 },
  { width: 430, height: 932 },
];

const largerViewports = [
  { width: 768, height: 1024 },
  { width: 820, height: 1180 },
  { width: 1024, height: 768 },
  { width: 1280, height: 800 },
  { width: 1366, height: 768 },
  { width: 1440, height: 900 },
  { width: 1600, height: 900 },
  { width: 1920, height: 1080 },
];

test.describe("homepage category showcase", () => {
  test("uses live categories, deterministic depth, arrows, keyboard, and active-card routing", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/", { waitUntil: "domcontentloaded" });

    const showcase = page.locator(".sf-category-showcase");
    const cards = showcase.locator(".sf-category-showcase__card");
    await expect(showcase).toBeVisible();
    await expect(showcase).toHaveAttribute("data-enhanced", "true");
    await expect(showcase.locator(".sf-category-showcase__slide")).toHaveCount(7);
    await expect(
      cards.filter({ has: page.getByText("Fragrance", { exact: true }) }),
    ).toHaveAttribute("data-active", "true");
    await expect(showcase.locator('.sf-category-showcase__card[data-depth="near"]')).toHaveCount(2);
    await expect(showcase.getByRole("link", { name: "View all" })).toHaveAttribute("href", "/shop");

    await showcase.locator(".sf-category-showcase__carousel").focus();
    await page.keyboard.press("ArrowRight");
    await expect(
      cards.filter({
        has: page.getByText("Body Moisturizer and Intensive Daily Care", { exact: true }),
      }),
    ).toHaveAttribute("data-active", "true");

    await showcase.getByRole("button", { name: "Previous category" }).click();
    await expect(
      cards.filter({ has: page.getByText("Fragrance", { exact: true }) }),
    ).toHaveAttribute("data-active", "true");

    const haircare = showcase.getByRole("link", { name: "Shop now: Haircare" });
    await haircare.click();
    await expect(
      cards.filter({ has: page.getByText("Haircare", { exact: true }) }),
    ).toHaveAttribute("data-active", "true");
    await expect(page).toHaveURL(/\/$/);
    await haircare.click();
    await expect(page).toHaveURL(/\/categories\/haircare$/);
  });

  test("keeps mobile cards breathable, swipeable, and free of page overflow", async ({ page }) => {
    for (const viewport of mobileViewports) {
      await page.setViewportSize(viewport);
      await page.goto("/", { waitUntil: "domcontentloaded" });
      const showcase = page.locator(".sf-category-showcase");
      await expect(showcase).toHaveAttribute("data-enhanced", "true");
      const activeCard = showcase.locator('.sf-category-showcase__card[data-active="true"]');
      await expect(activeCard).toBeVisible();

      const metrics = await showcase.evaluate((element) => {
        const viewportElement = element.querySelector<HTMLElement>(
          ".sf-category-showcase__viewport",
        )!;
        const active = element.querySelector<HTMLElement>(
          '.sf-category-showcase__card[data-active="true"]',
        )!;
        const rect = active.getBoundingClientRect();
        return {
          bodyOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
          cardRatio: rect.width / window.innerWidth,
          inlineStart: rect.left,
          inlineEnd: window.innerWidth - rect.right,
          touchAction: getComputedStyle(viewportElement).touchAction,
        };
      });

      expect(metrics.bodyOverflow).toBeLessThanOrEqual(1);
      expect(metrics.cardRatio).toBeGreaterThanOrEqual(0.75);
      expect(metrics.cardRatio).toBeLessThanOrEqual(0.84);
      expect(metrics.inlineStart).toBeGreaterThan(12);
      expect(metrics.inlineEnd).toBeGreaterThan(12);
      expect(metrics.touchAction).toContain("pan-y");
    }
  });

  test("keeps the active card centered across tablet and desktop viewports", async ({ page }) => {
    for (const viewport of largerViewports) {
      await page.setViewportSize(viewport);
      await page.goto("/", { waitUntil: "domcontentloaded" });
      const showcase = page.locator(".sf-category-showcase");
      await expect(showcase).toHaveAttribute("data-enhanced", "true");
      await expect
        .poll(() =>
          showcase.evaluate((element) => {
            const active = element.querySelector<HTMLElement>(
              '.sf-category-showcase__card[data-active="true"]',
            )!;
            const carouselViewport = element.querySelector<HTMLElement>(
              ".sf-category-showcase__viewport",
            )!;
            const rect = active.getBoundingClientRect();
            const viewportRect = carouselViewport.getBoundingClientRect();
            return Math.abs(
              rect.left + rect.width / 2 - (viewportRect.left + viewportRect.width / 2),
            );
          }),
        )
        .toBeLessThanOrEqual(2);

      const metrics = await showcase.evaluate((element) => {
        const active = element.querySelector<HTMLElement>(
          '.sf-category-showcase__card[data-active="true"]',
        )!;
        const activeRect = active.getBoundingClientRect();
        const viewportRect = element
          .querySelector<HTMLElement>(".sf-category-showcase__viewport")!
          .getBoundingClientRect();
        const visibleSlides = Array.from(
          element.querySelectorAll<HTMLElement>(".sf-category-showcase__slide"),
        ).filter((slide) => {
          const rect = slide.getBoundingClientRect();
          return rect.right > 0 && rect.left < window.innerWidth;
        }).length;
        return {
          bodyOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
          centerOffset: Math.abs(
            activeRect.left + activeRect.width / 2 - (viewportRect.left + viewportRect.width / 2),
          ),
          cardHeight: activeRect.height,
          visibleSlides,
        };
      });

      expect(metrics.bodyOverflow).toBeLessThanOrEqual(1);
      expect(metrics.centerOffset).toBeLessThanOrEqual(2);
      expect(metrics.cardHeight).toBeGreaterThanOrEqual(320);
      expect(metrics.cardHeight).toBeLessThanOrEqual(430);
      expect(metrics.visibleSlides).toBeGreaterThanOrEqual(viewport.width >= 1440 ? 5 : 3);
    }
  });

  test("captures horizontal touch intent without blocking vertical page scroll", async ({
    page,
    context,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/", { waitUntil: "domcontentloaded" });
    const showcase = page.locator(".sf-category-showcase");
    await expect(showcase).toHaveAttribute("data-enhanced", "true");
    await showcase.scrollIntoViewIfNeeded();

    const viewport = showcase.locator(".sf-category-showcase__viewport");
    const box = await viewport.boundingBox();
    expect(box).not.toBeNull();
    const x = box!.x + box!.width / 2;
    const y = Math.min(box!.y + box!.height / 2, 760);
    const initialUrl = page.url();
    const client = await context.newCDPSession(page);

    await client.send("Input.dispatchTouchEvent", {
      type: "touchStart",
      touchPoints: [{ x, y }],
    });
    await client.send("Input.dispatchTouchEvent", {
      type: "touchMove",
      touchPoints: [{ x: x - 110, y: y + 2 }],
    });
    await client.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });

    await expect(showcase.locator('.sf-category-showcase__card[data-active="true"]')).toContainText(
      "Body Moisturizer and Intensive Daily Care",
    );
    expect(page.url()).toBe(initialUrl);

    const scrollBefore = await page.evaluate(() => window.scrollY);
    await client.send("Input.dispatchTouchEvent", {
      type: "touchStart",
      touchPoints: [{ x, y }],
    });
    await client.send("Input.dispatchTouchEvent", {
      type: "touchMove",
      touchPoints: [{ x: x + 2, y: y - 110 }],
    });
    await client.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(scrollBefore);
  });

  test("remains contained at common browser zoom levels", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/", { waitUntil: "domcontentloaded" });
    const showcase = page.locator(".sf-category-showcase");
    await expect(showcase).toHaveAttribute("data-enhanced", "true");

    for (const zoom of [0.9, 1, 1.1, 1.25]) {
      await page.evaluate((value) => {
        document.documentElement.style.zoom = String(value);
      }, zoom);
      await page.waitForTimeout(100);
      const metrics = await showcase.evaluate((element) => {
        const active = element.querySelector<HTMLElement>(
          '.sf-category-showcase__card[data-active="true"]',
        )!;
        const rect = active.getBoundingClientRect();
        return {
          bodyOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
          activeVisible: rect.right > 0 && rect.left < window.innerWidth,
          cardWidth: rect.width,
        };
      });
      expect(metrics.bodyOverflow).toBeLessThanOrEqual(1);
      expect(metrics.activeVisible).toBe(true);
      expect(metrics.cardWidth).toBeGreaterThan(220);
    }
  });

  test("mirrors depth and keyboard direction for Arabic without changing category routes", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/?lang=ar", { waitUntil: "domcontentloaded" });
    const showcase = page.locator(".sf-category-showcase");
    await expect(showcase).toHaveAttribute("dir", "rtl");
    await expect(showcase).toHaveAttribute("data-enhanced", "true");
    await expect(showcase.getByRole("link", { name: "تسوقي الآن: العطور" })).toHaveAttribute(
      "href",
      "/categories/fragrance?lang=ar",
    );
    await showcase.locator(".sf-category-showcase__carousel").focus();
    await page.keyboard.press("ArrowLeft");
    await expect(
      showcase.locator(".sf-category-showcase__card", {
        has: page.getByText("مرطبات الجسم والعناية اليومية المكثفة", { exact: true }),
      }),
    ).toHaveAttribute("data-active", "true");
  });

  test("reduced motion removes card rotation while controls remain usable", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize({ width: 1024, height: 768 });
    await page.goto("/", { waitUntil: "domcontentloaded" });
    const showcase = page.locator(".sf-category-showcase");
    const nearCard = showcase.locator('.sf-category-showcase__card[data-depth="near"]').first();
    const transform = await nearCard.evaluate((element) => getComputedStyle(element).transform);
    expect(transform.startsWith("matrix(")).toBe(true);
    await showcase.getByRole("button", { name: "Next category" }).click();
    await expect(showcase.locator('.sf-category-showcase__card[data-active="true"]')).toContainText(
      "Body Moisturizer and Intensive Daily Care",
    );
  });
});
