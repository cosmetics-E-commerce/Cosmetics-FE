import { expect, test } from "@playwright/test";

test("published Brands is a searchable alphabetical directory in English and Arabic", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "chromium", "The primary menu is desktop-only");
  await page.goto("/about");
  const navigation = page.getByRole("navigation", { name: "Primary" });
  await navigation.getByRole("button", { name: "Brands", exact: true }).hover();
  const directory = page.locator(".published-brand-directory");
  await expect(directory).toBeVisible();
  await expect(directory.locator(".published-brand-directory__group > h3")).toHaveText([
    "A",
    "B",
    "C",
    "E",
  ]);
  await expect(
    directory.locator(".published-brand-directory__group").first().getByRole("link"),
  ).toHaveText(["Anua", "Atelier Nude"]);
  await directory.getByPlaceholder("Search brands…").fill("cer");
  await expect(directory.getByRole("link", { name: "CeraVe" })).toBeVisible();
  await expect(directory.getByRole("link", { name: "COSRX" })).toHaveCount(0);
  await directory.getByRole("link", { name: "CeraVe" }).click();
  await expect(page).toHaveURL(/\/brands\/cerave$/);

  await page.goto("/about?lang=ar");
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  await page
    .getByRole("navigation", { name: "Primary" })
    .getByRole("button", { name: "العلامات", exact: true })
    .hover();
  await expect(page.locator(".published-brand-directory")).toHaveAttribute("dir", "rtl");
  await expect(page.getByRole("link", { name: "Anua" })).toBeVisible();
});

test("published navigation renders resolved categories in English and Arabic", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "chromium", "The primary menu is desktop-only");
  await page.goto("/about");
  const primaryNavigation = page.getByRole("navigation", { name: "Primary" });
  const categoriesTrigger = primaryNavigation.getByRole("button", {
    name: "Categories",
    exact: true,
  });
  await categoriesTrigger.hover();
  await expect(categoriesTrigger).toHaveAttribute("data-state", "open");
  const classicMenu = page.locator('.published-mega[data-menu-style="classic"]');
  await expect(classicMenu).toBeVisible();
  await expect(classicMenu.getByText("All Categories", { exact: true })).toBeVisible();
  await expect(classicMenu.getByText("View all products", { exact: true })).toBeVisible();
  await expect(classicMenu.locator('[data-presentation="utility"]')).toHaveCount(1);
  const classicContent = classicMenu.locator('[data-separators="true"]');
  await expect(classicContent.locator(".published-mega__column")).toHaveCount(6);
  await expect(classicContent.locator(".published-mega__entity-list.is-rail")).toBeVisible();
  await expect(page.getByRole("link", { name: /Face Care/ })).toBeVisible();
  await expect(page.getByRole("link", { name: "Cleansers" })).toBeVisible();
  await expect(classicMenu).toHaveScreenshot("classic-categories-mega-menu.png", {
    animations: "disabled",
    // Playwright's Linux runners rasterize the editorial display font slightly
    // differently even after document.fonts is ready. Keep the tolerance below
    // a layout-level change while ignoring glyph-edge antialiasing noise.
    maxDiffPixelRatio: 0.01,
  });

  await page.goto("/about?lang=ar");
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  const arabicNavigation = page.getByRole("navigation", { name: "Primary" });
  const arabicCategoriesTrigger = arabicNavigation.getByRole("button", {
    name: "الفئات",
    exact: true,
  });
  await arabicCategoriesTrigger.hover();
  await expect(page.getByRole("link", { name: /العناية بالوجه/ })).toBeVisible();
  await expect(page.getByRole("link", { name: "منظفات الوجه" })).toBeVisible();
});

test("published categories remain usable in the mobile menu", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "This assertion targets the mobile drawer");
  await page.goto("/about", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Open menu", exact: true }).click();
  const mobileNavigation = page.getByRole("dialog", { name: "Open menu" });
  await mobileNavigation.getByRole("button", { name: "Categories", exact: true }).click();
  await expect(mobileNavigation.getByRole("link", { name: /Face Care/ })).toBeVisible();
  await expect(mobileNavigation.getByRole("link", { name: "Cleansers" })).toBeVisible();
});

test("published alphabetical Brands remains usable in the mobile menu", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "This assertion targets the mobile drawer");
  await page.goto("/about", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Open menu", exact: true }).click();
  const mobileNavigation = page.getByRole("dialog", { name: "Open menu" });
  await mobileNavigation.getByRole("button", { name: "Brands", exact: true }).click();
  const directory = mobileNavigation.locator(".published-brand-directory");
  await expect(directory.locator(".published-brand-directory__group > h3")).toHaveText([
    "A",
    "B",
    "C",
    "E",
  ]);
  await directory.getByPlaceholder("Search brands…").fill("cos");
  await expect(directory.getByRole("link", { name: "COSRX" })).toBeVisible();
  await expect(directory.getByRole("link", { name: "Anua" })).toHaveCount(0);
});
