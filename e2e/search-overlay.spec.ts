import { expect, test, type Page } from "@playwright/test";

function monitorRuntime(page: Page) {
  const issues: string[] = [];

  page.on("pageerror", (error) => issues.push(`pageerror: ${error.message}`));
  page.on("console", (message) => {
    const text = message.text();
    if (
      message.type() === "error" ||
      (message.type() === "warning" && /hydration|did not match|server rendered/i.test(text))
    ) {
      issues.push(`${message.type()}: ${text}`);
    }
  });

  return issues;
}

async function prepareSearch(page: Page) {
  await page.route("**/api/v1/cart", (route) =>
    route.fulfill({
      json: {
        success: true,
        data: {
          id: "00000000-0000-4000-8000-000000000004",
          currency: "EGP",
          items: [],
          subtotal: 0,
          discountTotal: 0,
          estimatedTotal: 0,
          totalSavings: 0,
          couponCode: null,
          appliedPromotions: [],
          promotionMessages: [],
          giftOptions: [],
          totalQuantity: 0,
          hasIssues: false,
          updatedAt: "2026-01-01T00:00:00.000Z",
        },
      },
    }),
  );
  for (const endpoint of [
    "categories**",
    "brands**",
    "banners/active**",
    "campaigns/eligible**",
    "analytics/events**",
  ]) {
    await page.route(`**/api/v1/${endpoint}`, (route) =>
      route.fulfill({ json: { success: true, data: [] } }),
    );
  }
  await page.route("**/api/v1/products**", (route) =>
    route.fulfill({
      json: {
        data: [
          {
            id: "00000000-0000-4000-8000-000000000001",
            slug: "ceramide-barrier-comfort-cream",
            nameEn: "Ceramide Barrier Comfort Cream",
            nameAr: "كريم السيراميد المريح",
            descriptionEn: "A comforting moisturizer.",
            descriptionAr: "مرطب مريح للبشرة.",
            ingredients: null,
            ingredientDetails: [],
            howToUse: null,
            skinType: [],
            basePrice: 89000,
            compareAtPrice: null,
            rating: 4.8,
            reviewCount: 12,
            imageUrl: "/favicon.png",
            category: {
              id: "00000000-0000-4000-8000-000000000002",
              parentId: null,
              slug: "skincare",
              nameEn: "Skincare",
              nameAr: "العناية بالبشرة",
              imageUrl: null,
              sortOrder: 1,
            },
            brand: null,
            variants: [
              {
                id: "00000000-0000-4000-8000-000000000003",
                sku: "TEST-CERAMIDE",
                nameEn: "50 ml",
                nameAr: "50 مل",
                price: 89000,
                compareAtPrice: null,
                shadeHex: null,
                optionValues: [],
                images: [],
                stock: 5,
              },
            ],
            images: [],
          },
        ],
      },
    }),
  );
  await page.route("**/api/v1/promotions/prices", (route) =>
    route.fulfill({ json: { success: true, data: [] } }),
  );
  // Use a static route so this browser-level mock does not have to intercept a
  // server-side catalog loader before Playwright has a page to control.
  await page.goto("/privacy-policy", { waitUntil: "networkidle" });
  await page.locator('html[data-hydrated="true"]').waitFor();
}

test("search opens focused, presents live results, and dismisses with Escape", async ({ page }) => {
  const runtimeIssues = monitorRuntime(page);
  await prepareSearch(page);

  await page.getByRole("banner").getByRole("button", { name: "Search" }).click();
  const dialog = page.getByRole("dialog");
  const input = dialog.getByRole("searchbox", { name: "Search BIOREZA" });

  await expect(dialog).toBeVisible();
  await expect(input).toBeFocused();
  await expect(dialog.getByText("Browse by category")).toBeVisible();

  await input.fill("Ceramide");
  await expect(dialog.getByText(/result/i).first()).toBeVisible();
  await expect(dialog.getByRole("link", { name: /Ceramide Barrier Comfort Cream/i })).toBeVisible();

  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  expect(runtimeIssues).toEqual([]);
});

test("mobile search stays anchored when tapping the trigger does not move focus", async ({
  page,
}) => {
  const runtimeIssues = monitorRuntime(page);
  await page.setViewportSize({ width: 390, height: 844 });
  await prepareSearch(page);

  const trigger = page.getByRole("banner").getByRole("button", { name: "Search" });

  // Mobile Safari does not focus buttons on tap. A DOM click reproduces that
  // focus behavior while still exercising the real React click handler.
  await trigger.evaluate((button) => button.click());

  const dialog = page.getByRole("dialog");
  const input = dialog.getByRole("searchbox", { name: "Search BIOREZA" });

  await expect(dialog).toBeVisible();
  await expect(dialog).toBeInViewport();
  await expect(input).toBeFocused();

  await input.click();
  await input.fill("Ceramide");
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("link", { name: /Ceramide Barrier Comfort Cream/i })).toBeVisible();

  await dialog.getByRole("button", { name: "Close search" }).click();
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();

  await trigger.click();
  await expect(dialog).toBeVisible();
  await page.locator(".search-overlay__backdrop").click({ position: { x: 5, y: 5 } });
  await expect(dialog).not.toBeVisible();
  expect(runtimeIssues).toEqual([]);
});
