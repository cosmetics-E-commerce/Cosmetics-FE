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
  await expect(primaryImage).toHaveCSS("object-fit", "cover");
  await expect(secondaryImage).toHaveCSS("object-fit", "cover");

  if (testInfo.project.name === "chromium") {
    await card.hover();
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
    await expect(primary).toHaveCSS("opacity", "1");
    await expect(secondary).toHaveCSS("opacity", "0");
    const restored = await measureCard(card);
    expect(restored.card.height).toBeCloseTo(initial.card.height, 4);
    expect(restored.media.height).toBeCloseTo(initial.media.height, 4);
  } else {
    await expect(primary).toHaveCSS("opacity", "1");
    await expect(secondary).toHaveCSS("opacity", "0");
    await expect(quickAdd).toHaveCSS("opacity", "1");
  }

  expect(runtimeIssues).toEqual([]);
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
