import { describe, expect, it } from "vitest";
import { mapProduct } from "./catalog";

const product = {
  id: "11111111-1111-4111-8111-111111111111",
  slug: "serum",
  nameEn: "Serum",
  nameAr: "سيروم",
  shortDescriptionEn: null,
  shortDescriptionAr: null,
  descriptionEn: "English description",
  descriptionAr: "وصف عربي",
  ingredients: "Water",
  howToUse: "Apply once daily",
  howToUseEn: "Apply to clean skin once daily",
  howToUseAr: "يُستخدم على بشرة نظيفة مرة يومياً",
  skinType: ["DRY" as const],
  tags: [],
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
  options: [],
  variants: [
    {
      id: "33333333-3333-4333-8333-333333333333",
      sku: "SER-1",
      nameEn: "30 ml",
      nameAr: "٣٠ مل",
      price: 12500,
      compareAtPrice: null,
      shadeHex: null,
      optionValues: [],
      images: [],
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

  it("treats an existing zero-stock variant as out of stock", () => {
    const mapped = mapProduct(
      {
        ...product,
        variants: product.variants.map((variant) => ({ ...variant, stock: 0 })),
      },
      "en",
    );

    expect(mapped).toMatchObject({ stock: 0, inStock: false });
  });

  it("selects Arabic contract fields", () => {
    expect(mapProduct(product, "ar")).toMatchObject({
      name: "سيروم",
      description: "وصف عربي",
      howToUse: "يُستخدم على بشرة نظيفة مرة يومياً",
    });
  });

  it("uses a deliberate opposite-locale fallback only when usage copy is missing", () => {
    expect(mapProduct({ ...product, howToUseAr: null }, "ar").howToUse).toBe(
      "Apply to clean skin once daily",
    );
    expect(mapProduct({ ...product, howToUseEn: null, howToUse: null }, "en").howToUse).toBe(
      "يُستخدم على بشرة نظيفة مرة يومياً",
    );
  });

  it("preserves authored paragraph breaks in English and Arabic descriptions", () => {
    const descriptionEn =
      "A lightweight serum that layers hydration and glow without a sticky finish.\n\nashdashdkdhskaldhsalk";
    const descriptionAr = "وصف المنتج الأول.\n\nوصف المنتج الثاني.";
    const multilineProduct = { ...product, descriptionEn, descriptionAr };

    expect(mapProduct(multilineProduct, "en").description).toBe(descriptionEn);
    expect(mapProduct(multilineProduct, "ar").description).toBe(descriptionAr);
  });

  it("keeps concise and full product copy separate for each locale", () => {
    const mappedEn = mapProduct(
      {
        ...product,
        shortDescriptionEn: "A concise English summary.",
        shortDescriptionAr: "ملخص عربي قصير.",
        descriptionEn: "Detailed English copy.\n\nSecond paragraph.",
        descriptionAr: "وصف عربي مفصل.\n\nالفقرة الثانية.",
      },
      "en",
    );
    const mappedAr = mapProduct(
      {
        ...product,
        shortDescriptionEn: "A concise English summary.",
        shortDescriptionAr: "ملخص عربي قصير.",
        descriptionEn: "Detailed English copy.\n\nSecond paragraph.",
        descriptionAr: "وصف عربي مفصل.\n\nالفقرة الثانية.",
      },
      "ar",
    );

    expect(mappedEn).toMatchObject({
      shortDescription: "A concise English summary.",
      description: "Detailed English copy.\n\nSecond paragraph.",
      details: "Detailed English copy.\n\nSecond paragraph.",
    });
    expect(mappedAr).toMatchObject({
      shortDescription: "ملخص عربي قصير.",
      description: "وصف عربي مفصل.\n\nالفقرة الثانية.",
      details: "وصف عربي مفصل.\n\nالفقرة الثانية.",
    });
  });

  it("does not promote a legacy full description into the top summary", () => {
    const mapped = mapProduct(
      {
        ...product,
        shortDescriptionEn: null,
        shortDescriptionAr: null,
        descriptionEn: "Legacy full description remains available below.",
      },
      "en",
    );

    expect(mapped.shortDescription).toBe("");
    expect(mapped.description).toBe("Legacy full description remains available below.");
  });

  it("never uses short copy as a fallback for an empty full description", () => {
    const mapped = mapProduct(
      {
        ...product,
        shortDescriptionEn: "Top summary only.",
        descriptionEn: null,
        descriptionAr: null,
      },
      "en",
    );

    expect(mapped.shortDescription).toBe("Top summary only.");
    expect(mapped.description).toBe("");
    expect(mapped.details).toBe("");
  });

  it("uses a local fallback when the API returns a blank primary image URL", () => {
    const mapped = mapProduct({ ...product, imageUrl: "   " }, "en");

    expect(mapped.image).not.toBe("");
    expect(mapped.gallery).toEqual([mapped.image]);
  });

  it("preserves external image URLs with transformation query parameters", () => {
    const externalUrl = "https://cdn.example.com/serum.webp?id=123&w=800";
    const mapped = mapProduct(
      {
        ...product,
        imageUrl: externalUrl,
        images: [
          {
            id: "44444444-4444-4444-8444-444444444444",
            variantId: null,
            url: externalUrl,
            altText: "Serum bottle",
            sortOrder: 0,
            isPrimary: true,
          },
        ],
      },
      "en",
    );

    expect(mapped.image).toBe(externalUrl);
    expect(mapped.gallery).toEqual([externalUrl]);
  });

  it("keeps backward-compatible storage-key image references renderable", () => {
    const mapped = mapProduct(
      {
        ...product,
        imageUrl: "products/test/test.webp",
      },
      "en",
    );

    expect(mapped.image).toBe("products/test/test.webp");
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
