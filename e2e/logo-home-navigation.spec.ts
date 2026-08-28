import { expect, test } from "@playwright/test";

test("the shared BIOREZA logo always returns to the homepage hero", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/shop", { waitUntil: "networkidle" });

  await page.locator(".store-header .brand-logo").first().click();
  await expect(page).toHaveURL(/\/#home-hero$/);
  await expect(page.locator("#home-hero")).toBeVisible();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThanOrEqual(1);

  await page.locator(".sf-concerns").scrollIntoViewIfNeeded();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(100);

  await page.locator(".store-header .brand-logo").first().click();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThanOrEqual(1);
});
