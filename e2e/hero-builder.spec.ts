import { expect, test } from "@playwright/test";

const mobileViewports = [320, 360, 375, 390, 414, 430];
const desktopViewports = [
  { width: 768, height: 1024 },
  { width: 1024, height: 768 },
  { width: 1366, height: 768 },
  { width: 1440, height: 900 },
  { width: 1920, height: 1080 },
];

test("published Hero Builder config drives responsive EN and AR storefront output", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/page-builder-hero-test", { waitUntil: "networkidle" });

  const hero = page.locator(".landing-hero-builder");
  const media = hero.locator("img");
  await expect(hero).toBeVisible();
  await expect(page.getByRole("heading", { name: /Skin\s+First/ })).toBeVisible();
  await expect(page.getByRole("link", { name: "Shop" })).toHaveAttribute("href", "/shop");

  for (const width of mobileViewports) {
    await page.setViewportSize({ width, height: 844 });
    await expect
      .poll(() =>
        hero.evaluate((element) => Number.parseFloat(getComputedStyle(element).minHeight)),
      )
      .toBeGreaterThan(843.9);
    await expect(media).toHaveCSS("object-position", "38% 50%");
    await expect
      .poll(() =>
        page.evaluate(
          () => document.documentElement.scrollWidth <= document.documentElement.clientWidth,
        ),
      )
      .toBe(true);
  }

  await expect
    .poll(() => media.evaluate((image: HTMLImageElement) => image.currentSrc))
    .toContain("mobile.svg");

  for (const viewport of desktopViewports) {
    await page.setViewportSize(viewport);
    await expect(media).toHaveCSS("object-position", "68% 35%");
    await expect
      .poll(() => media.evaluate((image: HTMLImageElement) => image.currentSrc))
      .toContain("desktop.svg");
    await expect
      .poll(() =>
        page.evaluate(
          () => document.documentElement.scrollWidth <= document.documentElement.clientWidth,
        ),
      )
      .toBe(true);
  }

  await page.goto("/page-builder-hero-test?lang=ar", {
    waitUntil: "networkidle",
  });
  await expect(page.getByRole("heading", { name: /البشرة\s+أولاً/ })).toBeVisible();
  await expect(page.getByRole("link", { name: "تسوقي" })).toHaveAttribute("href", "/shop");
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
});
