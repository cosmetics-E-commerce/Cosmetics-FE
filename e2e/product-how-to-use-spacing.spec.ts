import { expect, test } from "@playwright/test";

const authoredCopy =
  "Apply   a small amount around the eye contour.\n  Massage gently until absorbed.";

test("How to use preserves authored spacing while wrapping responsively", async ({ page }) => {
  for (const width of [390, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/product/acm-depiwhite-eye-contour-gel-15ml", {
      waitUntil: "networkidle",
    });

    await page.getByRole("button", { name: "How to use", exact: true }).click();
    const copy = page.locator(".product-how-to-use-copy");
    await expect(copy).toBeVisible();

    const rendering = await copy.evaluate((element) => ({
      textContent: element.textContent,
      innerText: (element as HTMLElement).innerText,
      whiteSpace: getComputedStyle(element).whiteSpace,
      clientWidth: element.clientWidth,
      scrollWidth: element.scrollWidth,
    }));

    expect(rendering.textContent).toBe(authoredCopy);
    expect(rendering.innerText).toBe(authoredCopy);
    expect(rendering.whiteSpace).toBe("pre-wrap");
    expect(rendering.scrollWidth).toBeLessThanOrEqual(rendering.clientWidth + 1);
  }
});
