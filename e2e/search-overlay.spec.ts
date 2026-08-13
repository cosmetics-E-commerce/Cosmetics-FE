import { expect, test } from "@playwright/test";

test("search opens focused, presents live results, and dismisses with Escape", async ({ page }) => {
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
                shadeHex: null,
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
  await page.goto("/privacy", { waitUntil: "networkidle" });

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
});
