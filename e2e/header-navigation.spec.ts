import { expect, test, type Locator } from "@playwright/test";

async function expectIndicatorAt(indicator: Locator, label: Locator) {
  await expect(indicator).toHaveAttribute("data-visible", "true", { timeout: 10_000 });
  await expect
    .poll(async () => {
      const indicatorBox = await indicator.boundingBox();
      const labelBox = await label.boundingBox();
      if (!indicatorBox || !labelBox) return false;
      return (
        Math.abs(indicatorBox.x - labelBox.x) < 1 &&
        Math.abs(indicatorBox.width - labelBox.width) < 1
      );
    })
    .toBe(true);
}

test("desktop navigation keeps exactly one underline and restores the active item", async ({
  page,
}, testInfo) => {
  test.setTimeout(60_000);
  test.skip(testInfo.project.name !== "chromium", "The primary navigation is desktop-only");

  await page.goto("/shop?category=skincare");
  const nav = page.getByRole("navigation", { name: "Primary" });
  const indicator = nav.locator(".header-nav-indicator");
  const categories = nav.getByRole("button", { name: "Categories", exact: true });
  const brands = nav.getByRole("button", { name: "Brands", exact: true });
  const newArrivals = nav.getByRole("link", { name: "New Arrivals" });

  await expect(nav.locator('.nav-link[data-active="true"]')).toHaveCount(1);
  await expect(categories).toHaveAttribute("data-active", "true");
  await expectIndicatorAt(indicator, categories.locator("[data-nav-label]"));

  await page.goto("/shop");
  await expect(nav.locator('.nav-link[data-active="true"]')).toHaveCount(1);
  await expect(categories).toHaveAttribute("data-active", "true");
  await expect(indicator).toHaveCount(1);
  await expectIndicatorAt(indicator, categories.locator("[data-nav-label]"));

  await brands.hover();
  await expect(nav.locator(".header-mega-viewport")).toHaveAttribute("data-state", "open");
  await expectIndicatorAt(indicator, brands.locator("[data-nav-label]"));

  for (const target of [categories, brands, newArrivals, categories]) {
    await target.hover();
  }
  await expect(indicator).toHaveCount(1);
  await expectIndicatorAt(indicator, categories.locator("[data-nav-label]"));

  await page.mouse.move(1200, 900);
  await expectIndicatorAt(indicator, categories.locator("[data-nav-label]"));

  await brands.focus();
  await expectIndicatorAt(indicator, brands.locator("[data-nav-label]"));
  await page.keyboard.press("Escape");
  await page.locator("main").focus();
  await expectIndicatorAt(indicator, categories.locator("[data-nav-label]"));

  await nav.getByRole("link", { name: "Offers" }).click();
  await expect(page).toHaveURL(/\/offers$/);
  await expect(nav.locator('.nav-link[data-active="true"]')).toHaveCount(1);
  await expect(nav.getByRole("link", { name: "Offers" })).toHaveAttribute("aria-current", "page");

  await page.reload();
  await expect(nav.locator('.nav-link[data-active="true"]')).toHaveCount(1);
  await expect(nav.getByRole("link", { name: "Offers" })).toHaveAttribute("aria-current", "page");
  await expectIndicatorAt(
    indicator,
    nav.getByRole("link", { name: "Offers" }).locator("[data-nav-label]"),
  );
});
