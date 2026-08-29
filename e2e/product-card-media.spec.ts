import { expect, test, type Locator, type Page } from "@playwright/test";

const portrait = svgImage(800, 1200, "#eee4da", "PORTRAIT");
const landscape = svgImage(1600, 900, "#d8c6b7", "LANDSCAPE");

test("product media keeps mixed aspect-ratio gallery images in one stable frame", async ({
  page,
}, testInfo) => {
  const runtimeIssues: string[] = [];
  page.on("pageerror", (error) => runtimeIssues.push(error.message));
  await page.route("**/api/v1/**", (route) => route.fulfill({ json: { success: true, data: [] } }));
  await page.goto("/privacy-policy", { waitUntil: "networkidle" });
  await expect(page.locator("html")).toHaveAttribute("data-hydrated", "true");
  await mountProductCardFixture(page);

  const card = page.locator(".sf-product-card");
  const media = card.locator(".sf-product-card__media");
  const primary = card.locator(".product-card-primary");
  const secondary = card.locator(".product-card-secondary");
  const primaryImage = card.locator(".product-card-image--primary");
  const secondaryImage = card.locator(".product-card-image--secondary");
  const quickAdd = card.locator(".quick-add");

  await expect(card).toBeVisible();
  await expect(media).toHaveAttribute("data-secondary-ready", "true");

  const initial = await measureCard(card);
  expect(initial.media.width / initial.media.height).toBeCloseTo(4 / 5, 2);
  expect(initial.primary).toEqual(initial.secondary);
  expect(initial.primary).toEqual(initial.mediaLayer);
  await expect(primary).toHaveCSS("position", "absolute");
  await expect(secondary).toHaveCSS("position", "absolute");
  await expect(primary).toHaveCSS("transition-duration", "0.8s");
  await expect(secondary).toHaveCSS("transition-duration", "0.8s");
  await expect(primary).toHaveCSS("transition-timing-function", "cubic-bezier(0.4, 0, 0.2, 1)");
  await expect(secondary).toHaveCSS("transition-timing-function", "cubic-bezier(0.4, 0, 0.2, 1)");
  await expect(primaryImage).toHaveCSS("object-fit", "cover");
  await expect(secondaryImage).toHaveCSS("object-fit", "cover");
  await expect(card.locator(".quick-add__divider")).toHaveCount(0);

  if (testInfo.project.name === "chromium") {
    await expect(quickAdd).toHaveCSS("opacity", "0");
    await card.hover();
    await page.waitForTimeout(140);
    const midpoint = await layerOpacity(primary, secondary);
    expect(midpoint.primary).toBeGreaterThan(0);
    expect(midpoint.primary).toBeLessThan(1);
    expect(midpoint.secondary).toBeGreaterThan(0);
    expect(midpoint.secondary).toBeLessThan(1);
    const actionMidpoint = await quickAdd.evaluate((element) =>
      Number.parseFloat(getComputedStyle(element).opacity),
    );
    expect(actionMidpoint).toBeGreaterThan(0);
    expect(actionMidpoint).toBeLessThan(1);
    await expect(secondary).toHaveCSS("opacity", "1");
    await expect(primary).toHaveCSS("opacity", "0");
    await expect(quickAdd).toHaveCSS("opacity", "1");

    const hovered = await measureCard(card);
    expect(hovered.card.width).toBeCloseTo(initial.card.width, 4);
    expect(hovered.card.height).toBeCloseTo(initial.card.height, 4);
    expect(hovered.media.width).toBeCloseTo(initial.media.width, 4);
    expect(hovered.media.height).toBeCloseTo(initial.media.height, 4);
    expect(hovered.primary).toEqual(hovered.secondary);

    await page.locator(".sf-shop-meta").hover();
    await page.waitForTimeout(80);
    const reversing = await layerOpacity(primary, secondary);
    expect(reversing.primary).toBeGreaterThan(0);
    expect(reversing.primary).toBeLessThan(1);
    expect(reversing.secondary).toBeGreaterThan(0);
    expect(reversing.secondary).toBeLessThan(1);
    await card.hover();
    await page.waitForTimeout(60);
    const reentering = await layerOpacity(primary, secondary);
    expect(reentering.primary).toBeGreaterThan(0);
    expect(reentering.primary).toBeLessThan(1);
    expect(reentering.secondary).toBeGreaterThan(0);
    expect(reentering.secondary).toBeLessThan(1);
    await page.locator(".sf-shop-meta").hover();
    await expect(primary).toHaveCSS("opacity", "1");
    await expect(secondary).toHaveCSS("opacity", "0");
    const restored = await measureCard(card);
    expect(restored.card.height).toBeCloseTo(initial.card.height, 4);
    expect(restored.media.height).toBeCloseTo(initial.media.height, 4);
  } else if (
    await page.evaluate(() => window.matchMedia("(hover: hover) and (pointer: fine)").matches)
  ) {
    await expect(primary).toHaveCSS("opacity", "1");
    await expect(secondary).toHaveCSS("opacity", "0");
    await expect(quickAdd).toHaveCSS("opacity", "0");
    await card.hover();
    await expect(quickAdd).toHaveCSS("opacity", "1");
  } else {
    await expect(primary).toHaveCSS("opacity", "1");
    await expect(secondary).toHaveCSS("opacity", "0");
    await expect(quickAdd).toHaveCSS("opacity", "1");
  }

  expect(runtimeIssues).toEqual([]);
});

test("a one-image product never fades into an empty media layer", async ({ page }, testInfo) => {
  await page.route("**/api/v1/**", (route) => route.fulfill({ json: { success: true, data: [] } }));
  await page.goto("/privacy-policy", { waitUntil: "networkidle" });
  await expect(page.locator("html")).toHaveAttribute("data-hydrated", "true");
  await mountProductCardFixture(page);
  const media = page.locator(".sf-product-card__media");
  await media.evaluate((element) => {
    element.querySelector(".product-card-secondary")?.remove();
    element.setAttribute("data-has-secondary", "false");
    element.setAttribute("data-secondary-ready", "false");
  });

  if (testInfo.project.name === "chromium") await media.hover();
  await expect(media.locator(".product-card-primary")).toHaveCSS("opacity", "1");
  await expect(media.locator(".product-card-secondary")).toHaveCount(0);
});

test("the real product card keeps its secondary image node mounted through first hover", async ({
  page,
}) => {
  await page.goto("/shop", { waitUntil: "networkidle" });
  const card = page.locator(".sf-shop-page .sf-product-card").first();
  const media = card.locator(".product-card-media");
  const secondary = media.locator(".product-card-secondary");

  await expect(secondary).toHaveCount(1);
  await expect(secondary.locator("img")).toHaveCount(1);
  await secondary.evaluate((element) => {
    (window as typeof window & { __productCardSecondary?: Element }).__productCardSecondary =
      element;
  });
  await expect(media).toHaveAttribute("data-secondary-ready", "true");

  await card.hover();
  expect(
    await secondary.evaluate(
      (element) =>
        (window as typeof window & { __productCardSecondary?: Element }).__productCardSecondary ===
        element,
    ),
  ).toBe(true);
  await expect(card.locator(".quick-add__divider")).toHaveCount(0);
});

async function mountProductCardFixture(page: Page) {
  await page.locator("#main-content").evaluate(
    (main, images) => {
      main.innerHTML = `
        <section class="sf-shop-page">
          <div class="sf-shop-meta"><h2>Product media regression</h2></div>
          <div class="sf-shop-products sf-shop-products--grid">
            <article class="product-card sf-product-card group relative flex h-full flex-col" data-layout="grid">
              <div class="product-card-media sf-product-card__media relative overflow-hidden" data-has-secondary="true" data-secondary-ready="true">
                <a class="product-card-media__link" href="#product">
                  <span class="image-reveal-shell product-card-layer product-card-primary" data-loaded="true">
                    <img class="image-reveal-media product-card-image product-card-image--primary" src="${images.portrait}" alt="Portrait product image" width="800" height="1200" />
                  </span>
                  <span class="image-reveal-shell product-card-layer product-card-secondary" data-loaded="true">
                    <img class="image-reveal-media product-card-image product-card-image--secondary" src="${images.landscape}" alt="" width="1600" height="900" />
                  </span>
                </a>
                <div class="quick-add">
                  <div class="quick-add__content">
                    <div class="quick-add__quantity"><button type="button">−</button><output>1</output><button type="button">+</button></div>
                    <button class="quick-add__action" type="button">Add to bag</button>
                  </div>
                </div>
              </div>
              <div class="product-card__info sf-product-card__info"><p class="sf-product-card__category">Skincare</p><h3 class="sf-product-card__title">Mixed Ratio Serum</h3><div class="sf-product-card__footer"><span class="sf-product-card__price">EGP 3,200.00</span></div></div>
            </article>
          </div>
        </section>`;
    },
    { portrait, landscape },
  );
}

async function layerOpacity(primary: Locator, secondary: Locator) {
  const [primaryOpacity, secondaryOpacity] = await Promise.all([
    primary.evaluate((element) => Number.parseFloat(getComputedStyle(element).opacity)),
    secondary.evaluate((element) => Number.parseFloat(getComputedStyle(element).opacity)),
  ]);
  return { primary: primaryOpacity, secondary: secondaryOpacity };
}

async function measureCard(card: Locator) {
  return card.evaluate((element) => {
    const rect = (selector?: string) => {
      const target = selector ? element.querySelector<HTMLElement>(selector)! : element;
      const bounds = target.getBoundingClientRect();
      return { width: bounds.width, height: bounds.height };
    };
    return {
      card: rect(),
      media: rect(".sf-product-card__media"),
      mediaLayer: rect(".product-card-media__link"),
      primary: rect(".product-card-primary"),
      secondary: rect(".product-card-secondary"),
    };
  });
}

function svgImage(width: number, height: number, color: string, label: string) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><rect width="100%" height="100%" fill="${color}"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="64" fill="#4a3b31">${label}</text></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}
