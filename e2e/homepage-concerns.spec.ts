import { expect, test } from "@playwright/test";

const viewports = [320, 360, 375, 390, 414, 430, 768, 1024, 1366, 1440, 1920];

for (const width of viewports) {
  test(`homepage exposes every published Concern without overflow at ${width}px`, async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== "chromium", "Chromium owns the exact viewport matrix");
    await page.setViewportSize({
      width,
      height: width <= 430 ? 844 : width <= 1024 ? 900 : 1000,
    });
    await page.goto("/", { waitUntil: "networkidle" });
    await expect(page.locator("html")).toHaveAttribute("data-hydrated", "true");

    const section = page.locator(".sf-concerns");
    await section.scrollIntoViewIfNeeded();
    await expect(section.locator(".sf-concern-list > li > a")).toHaveCount(6);
    await expect(section.getByRole("link", { name: "Dry Skin" })).toHaveAttribute(
      "href",
      "/skin-concerns/dry-skin",
    );

    const geometry = await page.evaluate(() => {
      const concernSection = document.querySelector<HTMLElement>(".sf-concerns");
      const sectionBounds = concernSection?.getBoundingClientRect();
      return {
        documentOverflow:
          document.documentElement.scrollWidth - document.documentElement.clientWidth,
        sectionLeft: sectionBounds?.left ?? -1,
        sectionRight: sectionBounds?.right ?? window.innerWidth + 1,
      };
    });
    expect(geometry.documentOverflow).toBeLessThanOrEqual(1);
    expect(geometry.sectionLeft).toBeGreaterThanOrEqual(-1);
    expect(geometry.sectionRight).toBeLessThanOrEqual(width + 1);
  });
}
