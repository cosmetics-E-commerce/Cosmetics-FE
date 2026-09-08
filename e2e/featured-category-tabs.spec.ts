import { expect, test } from "@playwright/test";

for (const locale of ["en", "ar"] as const) {
  test(`published category tabs keep the chosen order in ${locale}`, async ({ page }, testInfo) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto(`/page-builder-featured-tabs-test?lang=${locale}`);
    await page.locator('html[data-hydrated="true"]').waitFor();
    const tabs = page.locator(".sf-arrivals-tabs");
    const labels =
      locale === "ar"
        ? [
            "الكل",
            "العناية من الشمس",
            "العناية بالشعر",
            "مرطبات الجسم والعناية اليومية المكثفة",
            "العناية بالبشرة",
            "العطور",
          ]
        : [
            "All",
            "Sun Care",
            "Haircare",
            "Body Moisturizer and Intensive Daily Care",
            "Skincare",
            "Fragrance",
          ];
    await expect(tabs.getByRole("link")).toHaveText(labels);
    const slugs = ["sun-care", "haircare", "body-moisturizer", "skincare", "fragrance"];
    for (const [index, slug] of slugs.entries()) {
      await expect(tabs.getByRole("link").nth(index + 1)).toHaveAttribute(
        "href",
        new RegExp(`/categories/${slug}(?:\\?|$)`),
      );
    }
    await tabs.scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        page.evaluate(
          () => document.documentElement.scrollWidth <= document.documentElement.clientWidth,
        ),
      )
      .toBe(true);
    const screenshot = testInfo.outputPath(`category-tabs-${locale}.png`);
    await page.locator(".sf-arrivals-toolbar").screenshot({ path: screenshot });
    await testInfo.attach(`category-tabs-${locale}`, {
      path: screenshot,
      contentType: "image/png",
    });
    await tabs.getByRole("link").nth(1).click();
    await expect(page).toHaveURL(/\/categories\/sun-care(?:\?|$)/);
    expect(errors).toEqual([]);
  });
}
