import { expect, test } from "@playwright/test";

test("parent and child category pages preserve flat URLs and expose the hierarchy", async ({
  page,
}) => {
  await page.goto("/categories/skincare");

  await expect(page).toHaveURL(/\/categories\/skincare$/);
  await expect(page.getByRole("heading", { name: "Skincare", level: 1 })).toBeVisible();
  const discovery = page.getByRole("region", { name: "Shop by category" });
  await expect(discovery.getByRole("link", { name: /Cleansers/ })).toBeVisible();
  await expect(discovery.getByText("3 products")).toBeVisible();

  await discovery.getByRole("link", { name: /Cleansers/ }).click();
  await expect(page).toHaveURL(/\/categories\/cleansers$/);
  const childBreadcrumb = page.getByRole("navigation", { name: "Breadcrumb" });
  await expect(childBreadcrumb.getByRole("link", { name: "Skincare" })).toHaveAttribute(
    "href",
    "/categories/skincare",
  );
  await expect(childBreadcrumb.getByText("Cleansers", { exact: true })).toHaveAttribute(
    "aria-current",
    "page",
  );
  await expect(page.getByRole("region", { name: "Shop by category" })).toHaveCount(0);
});

test("category hierarchy remains understandable in Arabic and on mobile", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "This assertion targets the narrow layout");

  await page.goto("/categories/skincare?lang=ar");
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  await expect(page.getByRole("heading", { name: "العناية بالبشرة", level: 1 })).toBeVisible();
  const discovery = page.getByRole("region", { name: "تسوّقي حسب الفئة" });
  await expect(discovery.getByRole("link", { name: /منظفات البشرة/ })).toBeVisible();

  await discovery.getByRole("link", { name: /منظفات البشرة/ }).click();
  const childBreadcrumb = page.getByRole("navigation", { name: "مسار الصفحة" });
  await expect(childBreadcrumb.getByRole("link", { name: "العناية بالبشرة" })).toBeVisible();
  await expect(childBreadcrumb.getByText("منظفات البشرة", { exact: true })).toHaveAttribute(
    "aria-current",
    "page",
  );
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
    await page.evaluate(() => window.innerWidth + 1),
  );
});

test("shop filters group children beneath their parent and keep parent filtering addressable", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "chromium", "The narrow workflow is covered separately");

  await page.goto("/shop", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Filters" }).click();
  const categoryOptions = page.locator(".sf-shop-filter-panel__option[data-depth]");
  await expect(categoryOptions.nth(0)).toContainText("Skincare");
  await expect(categoryOptions.nth(0)).toHaveAttribute("data-depth", "root");
  await expect(categoryOptions.nth(1)).toContainText("Cleansers");
  await expect(categoryOptions.nth(1)).toHaveAttribute("data-depth", "child");

  await categoryOptions.nth(0).click();
  await expect.poll(() => new URL(page.url()).searchParams.get("category")).toBe("skincare");
});
