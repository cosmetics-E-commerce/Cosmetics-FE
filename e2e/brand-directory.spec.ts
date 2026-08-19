import { expect, test, type Page } from "@playwright/test";

const brandNames = [
  ["ACM", 2],
  ["Alejon", 1],
  ["Aloketa", 4],
  ["Anua", 1],
  ["Avène", 4],
  ["Axe", 5],
  ["Axis-Y", 3],
  ["Beauty of Joseon", 1],
  ["Beesline", 9],
  ["Bioderma", 3],
  ["Clinique", 6],
  ["COSRX", 8],
  ["Dior", 4],
  ["Dr. Jart+", 2],
  ["Eucerin", 7],
  ["Fenty Beauty", 3],
  ["Garnier", 5],
  ["Huda Beauty", 4],
  ["Isntree", 2],
  ["Kérastase", 3],
  ["La Roche-Posay", 8],
  ["Mizon", 2],
  ["Nuxe", 3],
  ["البيوتي", 10],
] as const;

const brands = brandNames.map(([name, productCount], index) => ({
  id: `brand-${index + 1}`,
  name,
  productCount,
  slug: `brand-${index + 1}`,
  logoUrl: null,
}));

async function mockBrands(page: Page) {
  await page.route(/\/api\/v1\/brands(?:\?|$)/, async (route) => {
    await route.fulfill({
      contentType: "application/json",
      body: JSON.stringify({ success: true, data: brands }),
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

test("desktop brand directory uses an open editorial index across supported widths", async ({
  page,
}, testInfo) => {
  test.setTimeout(90_000);
  test.skip(testInfo.project.name !== "chromium", "Desktop-only brand mega-menu");
  await mockBrands(page);
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto("/about");
  await waitForHydration(page);

  const nav = page.getByRole("navigation", { name: "Primary" });
  const brandTrigger = nav.getByRole("button", { name: "Brands", exact: true });
  await brandTrigger.click();
  const directory = page.locator(".brand-index--mega");
  await expect(directory).toBeVisible();
  await expect(directory.locator(".brand-index__popular li")).toHaveCount(5);
  await expect(directory.locator(".brand-index__rank").first()).toHaveText("01");
  await expect(directory.locator(".brand-index__group")).toHaveCount(14);
  await expect(directory.locator(".brand-index__letter", { hasText: "ا" })).toBeVisible();
  await expect(directory.locator('.brand-index__link[href="/brands/brand-9"]')).toHaveAttribute(
    "aria-label",
    "Beesline — 9 products",
  );

  for (const viewport of [
    { width: 1920, height: 1080, columns: "4" },
    { width: 1600, height: 900, columns: "4" },
    { width: 1440, height: 900, columns: "3" },
    { width: 1366, height: 768, columns: "3" },
    { width: 1309, height: 818, columns: "3" },
    { width: 1280, height: 800, columns: "3" },
  ]) {
    await page.setViewportSize(viewport);
    if ((await brandTrigger.getAttribute("data-state")) !== "open") await brandTrigger.click();
    await expect(directory).toBeVisible();
    await expect(directory.locator(".brand-index__groups")).toHaveCSS(
      "column-count",
      viewport.columns,
    );
    const box = await page.locator(".header-mega-viewport").boundingBox();
    expect(box).not.toBeNull();
    expect(box!.x).toBeGreaterThanOrEqual(0);
    expect(box!.x + box!.width).toBeLessThanOrEqual(viewport.width + 1);
    await expectNoPageOverflow(page);
  }

  if ((await brandTrigger.getAttribute("data-state")) !== "open") await brandTrigger.click();
  await expect(directory).toBeVisible();
  const groupStyle = await directory
    .locator(".brand-index__group")
    .first()
    .evaluate((element) => {
      const style = getComputedStyle(element);
      return { border: style.borderTopWidth, radius: style.borderRadius, shadow: style.boxShadow };
    });
  expect(groupStyle).toEqual({ border: "0px", radius: "0px", shadow: "none" });
  const firstBrandLink = directory.locator(".brand-index__link").first();
  await firstBrandLink.focus();
  await page.keyboard.press("Shift+Tab");
  await page.keyboard.press("Tab");
  await expect(firstBrandLink).toBeFocused();
  await expect(firstBrandLink).toHaveCSS("outline-style", "solid");

  await page.setViewportSize({ width: 1440, height: 900 });
  if ((await brandTrigger.getAttribute("data-state")) !== "open") await brandTrigger.click();
  await expect(directory).toBeVisible();
  await page.screenshot({ path: testInfo.outputPath("brand-directory-desktop.png") });
});

test("mobile and tablet brand directories remain responsive, touch-safe, and RTL-aware", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "Mobile drawer coverage");
  await mockBrands(page);
  await page.setViewportSize({ width: 430, height: 932 });
  await page.goto("/about");
  await waitForHydration(page);

  await page.locator(".store-header .header-brand-slot > button").click();
  await page.locator(".mobile-nav__list > li").nth(1).locator(".mobile-nav__link").click();
  const directory = page.locator(".brand-index--mobile");
  await expect(directory).toBeVisible();
  await expect(directory.locator(".brand-index__groups")).toHaveCSS("column-count", "1");
  expect(
    await directory
      .locator(".brand-index__link")
      .first()
      .evaluate((element) => Number.parseFloat(getComputedStyle(element).minHeight)),
  ).toBeGreaterThanOrEqual(44);

  for (const viewport of [
    { width: 1024, height: 768, columns: "2" },
    { width: 1152, height: 720, columns: "2" },
    { width: 820, height: 1180, columns: "2" },
    { width: 768, height: 1024, columns: "2" },
    { width: 430, height: 932, columns: "1" },
    { width: 414, height: 896, columns: "1" },
    { width: 393, height: 852, columns: "1" },
    { width: 390, height: 844, columns: "1" },
    { width: 375, height: 812, columns: "1" },
    { width: 360, height: 800, columns: "1" },
    { width: 320, height: 568, columns: "1" },
  ]) {
    await page.setViewportSize(viewport);
    await expect(directory).toBeVisible();
    await expect(directory.locator(".brand-index__groups")).toHaveCSS(
      "column-count",
      viewport.columns,
    );
    const box = await directory.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.x).toBeGreaterThanOrEqual(0);
    expect(box!.x + box!.width).toBeLessThanOrEqual(viewport.width + 1);
    await expectNoPageOverflow(page);
  }

  await page.setViewportSize({ width: 820, height: 1180 });
  await page.screenshot({ path: testInfo.outputPath("brand-directory-tablet.png") });
  await page.setViewportSize({ width: 393, height: 852 });
  await page.screenshot({ path: testInfo.outputPath("brand-directory-mobile.png") });

  await page.goto("/about?lang=ar");
  await waitForHydration(page);
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  await page.locator(".store-header .header-brand-slot > button").click();
  await page.locator(".mobile-nav__list > li").nth(1).locator(".mobile-nav__link").click();
  const rtlDirectory = page.locator(".brand-index--mobile");
  await expect(rtlDirectory).toHaveAttribute("dir", "rtl");
  await expect(rtlDirectory.getByRole("heading", { name: "ا", exact: true })).toBeVisible();
  await expect(rtlDirectory.getByRole("heading", { name: "#", exact: true })).toHaveCount(0);
  await expectNoPageOverflow(page);
  await page.screenshot({ path: testInfo.outputPath("brand-directory-mobile-rtl.png") });
});
