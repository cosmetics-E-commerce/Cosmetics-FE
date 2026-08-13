import { describe, expect, it } from "vitest";
import { mapProduct } from "./catalog";

const product = {
  id: "11111111-1111-4111-8111-111111111111",
  slug: "serum",
  nameEn: "Serum",
  nameAr: "سيروم",
  descriptionEn: "English description",
  descriptionAr: "وصف عربي",
  ingredients: "Water",
  howToUse: "Apply once daily",
  skinType: ["DRY" as const],
  basePrice: 12500,
  compareAtPrice: null,
  rating: 4.5,
  reviewCount: 12,
  imageUrl: null,
  category: {
    id: "22222222-2222-4222-8222-222222222222",
    parentId: null,
    slug: "skin",
    nameEn: "Skin",
    nameAr: "بشرة",
    imageUrl: null,
    sortOrder: 0,
  },
  brand: null,
  variants: [
    {
      id: "33333333-3333-4333-8333-333333333333",
      sku: "SER-1",
      nameEn: "30 ml",
      nameAr: "٣٠ مل",
      price: 12500,
      shadeHex: null,
      stock: 3,
    },
  ],
  images: [],
  ingredientDetails: [],
};

describe("mapProduct", () => {
  it("preserves authoritative rating, inventory and Egyptian price units", () => {
    expect(mapProduct(product, "en")).toMatchObject({
      name: "Serum",
      price: 125,
      rating: 4.5,
      reviews: 12,
      stock: 3,
      inStock: true,
    });
  });

  it("selects Arabic contract fields", () => {
    expect(mapProduct(product, "ar")).toMatchObject({
      name: "سيروم",
      description: "وصف عربي",
    });
  });

  it("uses a local fallback when the API returns a blank primary image URL", () => {
    const mapped = mapProduct({ ...product, imageUrl: "   " }, "en");

    expect(mapped.image).not.toBe("");
    expect(mapped.gallery).toEqual([mapped.image]);
  });

  it("tolerates legacy wishlist products with sparse catalog fields", () => {
    const mapped = mapProduct(
      {
        id: "product-id",
        slug: "legacy-serum",
        nameEn: "Legacy Serum",
        nameAr: "سيروم",
        imageUrl: null,
      } as never,
      "en",
    );

    expect(mapped).toMatchObject({
      slug: "legacy-serum",
      name: "Legacy Serum",
      category: "Collection",
      price: 0,
      inStock: false,
    });
  });
});
