import { expect, test, type Page } from "@playwright/test";

async function expectNoPageOverflow(page: Page) {
  await expect
    .poll(() =>
      page.evaluate(
        () => document.documentElement.scrollWidth <= document.documentElement.clientWidth,
      ),
    )
    .toBe(true);
}

test("a published Page Builder image uses its mobile source and production layout", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/page-builder-image-test", { waitUntil: "networkidle" });

  const figure = page.locator(".landing-image");
  const image = page.getByAltText("Published responsive image");
  await expect(figure).toBeVisible();
  await expect(image).toBeVisible();
  await expect(image).toHaveJSProperty(
    "currentSrc",
    "http://127.0.0.1:4174/api/v1/page-builder-fixtures/mobile.svg",
  );
  await expect(image).toHaveAttribute("loading", "lazy");
  await expect(image).toHaveCSS("object-fit", "cover");
  await expect(image).toHaveCSS("object-position", "50% 50%");
  await expect(page.getByText("Published from Page Builder")).toBeVisible();
  await expect(image.locator("xpath=ancestor::a")).toHaveAttribute("href", "/shop");
  await expect(image.locator("xpath=ancestor::a")).toHaveAttribute("target", "_blank");
  await expectNoPageOverflow(page);

  const layout = await figure.evaluate((element) => {
    const rect = element.getBoundingClientRect();
    return { width: rect.width, viewport: document.documentElement.clientWidth };
  });
  expect(layout.width).toBeLessThan(layout.viewport);
  expect(layout.width).toBeGreaterThan(0);
});
