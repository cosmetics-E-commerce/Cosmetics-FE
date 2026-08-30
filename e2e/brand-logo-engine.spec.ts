import { expect, test } from "@playwright/test";

const viewports = [320, 360, 375, 390, 414, 430, 768, 1024, 1366, 1440, 1920];

test("Page Engine Brand logos share a stable contain-only identity frame", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "chromium", "One browser covers the full geometry matrix");
  test.setTimeout(120_000);

  for (const width of viewports) {
    await page.setViewportSize({ width, height: width < 700 ? 844 : 900 });
    await page.goto("/page-builder-brand-logo-test", { waitUntil: "networkidle" });
    const frames = page.locator(".landing-entities[data-kind=brand] .brand-logo-frame");
    await expect(frames).toHaveCount(8);
    await expect(page.locator('.brand-logo-frame[data-logo-state="fallback"]')).toHaveCount(2);
    await expect(
      page.locator(".brand-logo-frame__fallback", { hasText: "Missing Logo" }),
    ).toBeVisible();
    await expect(
      page.locator(".brand-logo-frame__fallback", { hasText: "Deleted Logo" }),
    ).toBeVisible();

    const geometry = await frames.evaluateAll((elements) => ({
      pageOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      heights: elements.map((element) => element.getBoundingClientRect().height),
      images: elements.flatMap((element) => {
        const image = element.querySelector("img");
        if (!image || image.naturalWidth === 0 || image.naturalHeight === 0) return [];
        const frame = element.getBoundingClientRect();
        const media = image.getBoundingClientRect();
        const style = getComputedStyle(image);
        return [
          {
            name: image.alt,
            objectFit: style.objectFit,
            inside:
              media.left >= frame.left - 1 &&
              media.right <= frame.right + 1 &&
              media.top >= frame.top - 1 &&
              media.bottom <= frame.bottom + 1,
            sourceRatio: image.naturalWidth / image.naturalHeight,
            renderedRatio: media.width / media.height,
            frame: { left: frame.left, right: frame.right, top: frame.top, bottom: frame.bottom },
            media: { left: media.left, right: media.right, top: media.top, bottom: media.bottom },
          },
        ];
      }),
    }));
    expect(geometry.pageOverflow).toBeLessThanOrEqual(1);
    expect(Math.max(...geometry.heights) - Math.min(...geometry.heights)).toBeLessThanOrEqual(1);
    for (const image of geometry.images) {
      expect(image.objectFit).toBe("contain");
      expect(image.inside, JSON.stringify(image)).toBe(true);
      expect(Math.abs(image.sourceRatio - image.renderedRatio)).toBeLessThan(0.03);
    }
  }

  await expect(page.locator('.brand-logo-frame[data-shape="wide"]')).not.toHaveCount(0);
  await expect(page.locator('.brand-logo-frame[data-shape="tall"]')).not.toHaveCount(0);
  await expect(page.locator('.brand-logo-frame[data-shape="square"]')).not.toHaveCount(0);

  await page.goto("/page-builder-brand-logo-test?lang=ar", { waitUntil: "networkidle" });
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  const mirrored = await page
    .locator(".brand-logo-frame__image")
    .evaluateAll((images) =>
      images.some((image) => new DOMMatrixReadOnly(getComputedStyle(image).transform).a < 0),
    );
  expect(mirrored).toBe(false);
});
