import { expect, test, type Locator, type Page } from "@playwright/test";

type Brand = {
  id: string;
  name: string;
  productCount: number;
  slug: string;
  logoUrl: null;
};

const TEST_LETTERS = "ABCDEFGHIJKLMNOPRSTUVWXYZ";

function createBrands(count: number): Brand[] {
  return Array.from({ length: count }, (_, index) => {
    const number = index + 1;
    const name =
      number === count
        ? "Avène Maison de Beauté Internationale"
        : number === count - 1
          ? "البيوتي العربية"
          : number === 1
            ? "Brand 001"
            : `${TEST_LETTERS[(number - 1) % TEST_LETTERS.length]} Brand ${String(number).padStart(3, "0")}`;
    return {
      id: `brand-${number}`,
      name,
      productCount: (number * 7) % 19,
      slug: `brand-${number}`,
      logoUrl: null,
    };
  }).reverse();
}

async function mockBrands(page: Page, current: { brands: Brand[] }) {
  await page.route(/\/api\/v1\/brands(?:\?|$)/, async (route) => {
    await route.fulfill({
      contentType: "application/json",
      body: JSON.stringify({
        success: true,
        data: current.brands,
        meta: {
          page: 1,
          limit: 100,
          total: current.brands.length,
          totalPages: 1,
          hasNext: false,
          hasPrev: false,
        },
      }),
    });
  });
}

async function waitForHydration(page: Page) {
  await expect
    .poll(() =>
      page.evaluate(() => document.documentElement.style.getPropertyValue("--store-header-height")),
    )
    .not.toBe("");
}

async function expectNoPageOverflow(page: Page) {
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1),
  ).toBe(true);
}

async function expectAlphabetical(names: Locator, locale: "ar" | "en" = "en") {
  const actual = (await names.allTextContents()).map((name) => name.trim());
  const collator = new Intl.Collator(locale, { numeric: true, sensitivity: "base" });
  const expected = [...actual].sort(
    (left, right) => collator.compare(left, right) || (left < right ? -1 : left > right ? 1 : 0),
  );
  expect(actual).toEqual(expected);
}

test("published desktop navigation reaches catalogues from 2 to 100 brands", async ({
  page,
}, testInfo) => {
  test.setTimeout(120_000);
  test.skip(testInfo.project.name !== "chromium", "Desktop-only brand navigation");
  const current = { brands: createBrands(2) };
  await mockBrands(page, current);
  await page.setViewportSize({ width: 1440, height: 900 });

  for (const count of [2, 6, 15, 30, 100]) {
    current.brands = createBrands(count);
    await page.goto(`/about?catalogue=${count}`);
    await waitForHydration(page);
    const nav = page.getByRole("navigation", { name: "Primary" });
    const brandsTrigger = nav.getByRole("button", { name: "Brands", exact: true });
    await brandsTrigger.click();
    const publishedDirectory = page.locator(".published-brand-directory");
    await expect(publishedDirectory).toBeVisible();
    const viewAllBrands = publishedDirectory.getByRole("link", { name: /View all brands/ });
    await expect(viewAllBrands).toHaveAttribute("href", "/brands");
    await viewAllBrands.click();
    await expect(page).toHaveURL(/\/brands$/);
    await expect(page.getByRole("heading", { name: "Beauty, by name." })).toBeVisible();
    await expect(page.getByText(`${count} brands`)).toBeVisible();
    await expect(page.locator(".brands-page__group a")).toHaveCount(count);
    await expectAlphabetical(page.locator(".brands-page__group a > span:first-child"));
    await expectNoPageOverflow(page);
  }
});

test("mobile and tablet published navigation reaches the full brand directory", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "Mobile drawer coverage");
  const current = { brands: createBrands(100) };
  await mockBrands(page, current);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/about");
  await waitForHydration(page);

  await page.locator(".store-header .header-brand-slot > button").click();
  const mobileNavigation = page.getByRole("dialog", { name: "Open menu" });
  await mobileNavigation.getByRole("button", { name: "Brands", exact: true }).click();
  const publishedDirectory = mobileNavigation.locator(".published-brand-directory");
  const viewAllBrands = publishedDirectory.getByRole("link", { name: /View all brands/ });
  await expect(viewAllBrands).toHaveAttribute("href", "/brands");
  await viewAllBrands.click();
  await expect(page).toHaveURL(/\/brands$/);
  await expect(page.getByText("100 brands")).toBeVisible();
  await expect(page.locator(".brands-page__group a")).toHaveCount(100);

  for (const viewport of [
    { width: 320, height: 568 },
    { width: 360, height: 800 },
    { width: 390, height: 844 },
    { width: 430, height: 932 },
    { width: 768, height: 1024 },
    { width: 1024, height: 768 },
  ]) {
    await page.setViewportSize(viewport);
    await expectNoPageOverflow(page);
  }

  await page.goto("/brands?lang=ar");
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  await expect(page.locator(".brands-page")).toHaveAttribute("dir", "rtl");
  await expectNoPageOverflow(page);
});

test("the dedicated brands page owns full search and alphabet exploration", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "chromium", "One cross-viewport route pass is enough");
  const current = { brands: createBrands(100) };
  await mockBrands(page, current);
  await page.goto("/about", { waitUntil: "networkidle" });
  const brandsTrigger = page
    .getByRole("navigation", { name: "Primary" })
    .getByRole("button", { name: "Brands", exact: true });
  await brandsTrigger.click();
  const viewAllBrands = page
    .locator(".published-brand-directory")
    .getByRole("link", { name: /View all brands/ });
  await expect(viewAllBrands).toHaveAttribute("href", "/brands");
  await viewAllBrands.click();
  await expect(page).toHaveURL(/\/brands$/);

  await expect(page.getByRole("heading", { name: "Beauty, by name." })).toBeVisible();
  await expect(page.getByText("100 brands")).toBeVisible();
  await expect(page.locator(".brands-page__group")).not.toHaveCount(0);
  await expect(page.locator('.brands-page__alphabet button[aria-label="B"]')).toBeEnabled();
  await expect(page.locator('.brands-page__alphabet button[aria-label="Q"]')).toBeDisabled();
  await expect(page.locator(".brands-page__group > h3", { hasText: /^Q$/ })).toHaveCount(0);
  await expect(page.locator(".brands-page__group > h3").nth(0)).toHaveText("A");
  await expect(page.locator(".brands-page__group > h3").nth(1)).toHaveText("B");
  await expect(page.locator(".brands-page__group > h3").nth(2)).toHaveText("C");
  await expect(page.locator(".brands-page__group > h3").nth(3)).toHaveText("D");
  await expect(page.locator(".brands-page__group > h3").last()).toHaveText("ا");
  const directoryGroups = page.locator(".brands-page__group");
  for (let index = 0; index < (await directoryGroups.count()); index += 1) {
    await expectAlphabetical(directoryGroups.nth(index).locator("a > span:first-child"));
  }

  const search = page.getByPlaceholder("Search all brands");
  await search.fill("brand");
  await expectAlphabetical(page.locator(".brands-page__group a > span:first-child"));
  await search.fill("AVENE");
  await expect(page.locator(".brands-page__group a")).toHaveCount(1);
  await expect(page.getByText("Avène Maison de Beauté Internationale")).toBeVisible();
  await search.fill("missing");
  await expect(page.getByText("No brands match that search.")).toBeVisible();
  await page.getByRole("button", { name: "Clear brand search" }).click();

  for (const viewport of [
    { width: 320, height: 568 },
    { width: 360, height: 800 },
    { width: 390, height: 844 },
    { width: 430, height: 932 },
    { width: 768, height: 1024 },
    { width: 1024, height: 768 },
    { width: 1280, height: 800 },
    { width: 1440, height: 900 },
    { width: 1920, height: 1080 },
  ]) {
    await page.setViewportSize(viewport);
    await expectNoPageOverflow(page);
  }

  await page.getByRole("link", { name: /Brand 001/ }).click();
  await expect(page).toHaveURL(/\/brands\/brand-1$/);
  await expect(page.getByRole("heading", { name: "Brand 001", exact: true })).toBeVisible();

  await page.goto("/brands?lang=ar");
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  await expect(page.getByRole("heading", { name: "الجمال، بالاسم." })).toBeVisible();
  await expect(page.locator(".brands-page")).toHaveAttribute("dir", "rtl");
});
