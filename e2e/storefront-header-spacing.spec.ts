import { expect, test } from "@playwright/test";

const routes = [
  "/shop",
  "/shop?search=ACM",
  "/brands/la-roche-posay",
  "/categories/skincare",
  "/product/acm-depiwhite-eye-contour-gel-15ml",
  "/privacy-policy",
  "/shop?lang=ar",
];

test("storefront pages share a comfortable header-to-breadcrumb boundary", async ({
  page,
}, testInfo) => {
  const mobile = testInfo.project.name === "mobile";
  const expected = mobile
    ? { minimumGap: 15, maximumGap: 25, maximumHeader: 70 }
    : { minimumGap: 19, maximumGap: 33, maximumHeader: 82 };

  for (const url of routes) {
    await page.goto(url, { waitUntil: "networkidle" });
    const geometry = await page.evaluate(() => {
      const header = document.querySelector<HTMLElement>(".store-header__bar")!;
      const breadcrumb = document.querySelector<HTMLElement>(".storefront-breadcrumb")!;
      const headerRect = header.getBoundingClientRect();
      const breadcrumbRect = breadcrumb.getBoundingClientRect();
      const breadcrumbStyles = getComputedStyle(breadcrumb);
      const headerStyles = getComputedStyle(header);

      return {
        gap: breadcrumbRect.top - headerRect.bottom,
        headerHeight: headerRect.height,
        headerPosition: getComputedStyle(header.closest(".store-header")!).position,
        separatorWidth: Number.parseFloat(headerStyles.borderBottomWidth),
        paddingTop: Number.parseFloat(breadcrumbStyles.paddingTop),
        paddingBottom: Number.parseFloat(breadcrumbStyles.paddingBottom),
        documentOverflow:
          document.documentElement.scrollWidth - document.documentElement.clientWidth,
      };
    });

    expect(geometry.gap, url).toBeGreaterThanOrEqual(expected.minimumGap);
    expect(geometry.gap, url).toBeLessThanOrEqual(expected.maximumGap);
    expect(geometry.headerHeight, url).toBeLessThanOrEqual(expected.maximumHeader);
    expect(geometry.headerPosition, url).toBe("fixed");
    expect(geometry.separatorWidth, url).toBeGreaterThanOrEqual(1);
    expect(geometry.paddingTop, url).toBeGreaterThanOrEqual(4);
    expect(geometry.paddingBottom, url).toBeGreaterThanOrEqual(4);
    expect(geometry.documentOverflow, url).toBeLessThanOrEqual(0.5);
  }
});
