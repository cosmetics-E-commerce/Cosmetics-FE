import { expect, test, type Locator, type Page } from "@playwright/test";

const descriptionEn =
  "A lightweight serum that layers hydration and glow without a sticky finish.\n\nashdashdkdhskaldhsalk";
const descriptionAr = "وصف المنتج الأول.\n\nوصف المنتج الثاني.";

test("full product descriptions preserve authored paragraph breaks without overflow", async ({
  page,
}) => {
  await page.route("**/api/v1/**", (route) => route.fulfill({ json: { success: true, data: [] } }));
  await page.goto("/privacy-policy", { waitUntil: "networkidle" });
  await mountDescriptionFixture(page);

  const details = page.locator(".product-reference-description-copy");

  await expect(details).toHaveCSS("white-space", "pre-line");
  await expect(details).toHaveText(descriptionEn);

  await page.setViewportSize({ width: 1440, height: 900 });
  const desktop = await measureDescription(details);
  expect(desktop.visualLines).toBeCloseTo(3, 1);
  expect(desktop.overflows).toBe(false);

  for (const width of [320, 375, 430, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    const measurement = await measureDescription(details);
    expect(measurement.visualLines).toBeGreaterThan(2.9);
    expect(measurement.overflows).toBe(false);
    expect(await pageHasHorizontalOverflow(page)).toBe(false);
  }

  await page.locator("html").evaluate((element) => element.setAttribute("dir", "rtl"));
  await details.evaluate((element, text) => {
    element.textContent = text;
  }, descriptionAr);
  await expect(details).toHaveCSS("direction", "rtl");
  await expect(details).toHaveText(descriptionAr);
  expect((await measureDescription(details)).visualLines).toBeGreaterThan(2.9);
  expect(await pageHasHorizontalOverflow(page)).toBe(false);
});

async function mountDescriptionFixture(page: Page) {
  await page.locator("#main-content").evaluate((main, text) => {
    main.innerHTML = `
      <article style="max-width: 760px; margin: 40px auto; padding-inline: 20px">
        <section class="product-reference-tab-panel">
          <p class="product-reference-description-copy"></p>
        </section>
      </article>`;
    main.querySelectorAll("p").forEach((paragraph) => {
      paragraph.textContent = text;
    });
  }, descriptionEn);
}

async function measureDescription(description: Locator) {
  return description.evaluate((element) => {
    const style = getComputedStyle(element);
    const lineHeight = Number.parseFloat(style.lineHeight);
    const height = element.getBoundingClientRect().height;
    return {
      visualLines: height / lineHeight,
      overflows: element.scrollWidth > element.clientWidth,
    };
  });
}

async function pageHasHorizontalOverflow(page: Page) {
  return page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  );
}
