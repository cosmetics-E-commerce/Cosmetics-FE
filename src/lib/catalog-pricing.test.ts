import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/api", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@/lib/api")>()),
  getProduct: vi.fn(),
  getPromotionPrices: vi.fn(),
}));

import { getProduct, getPromotionPrices } from "@/lib/api";
import { loadProduct } from "./catalog";

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
  categories: [
    {
      id: "22222222-2222-4222-8222-222222222222",
      parentId: null,
      slug: "skin",
      nameEn: "Skin",
      nameAr: "بشرة",
      imageUrl: null,
      sortOrder: 0,
    },
  ],
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

const flashSale = {
  variantId: "33333333-3333-4333-8333-333333333333",
  originalPrice: 12500,
  price: 10000,
  discount: 2500,
  promotions: [{ title: "Flash Sale" }],
};

describe("product promotional prices", () => {
  beforeEach(() => vi.clearAllMocks());

  it("uses prices embedded in the product response without a second request", async () => {
    vi.mocked(getProduct).mockResolvedValue({ ...product, promotionPrices: [flashSale] } as never);

    const loaded = await loadProduct("serum");

    expect(getPromotionPrices).not.toHaveBeenCalled();
    expect(loaded).toMatchObject({ price: 100, originalPrice: 125, promotionTitle: "Flash Sale" });
  });

  it("asks for prices when an older API response does not embed them", async () => {
    vi.mocked(getProduct).mockResolvedValue(product as never);
    vi.mocked(getPromotionPrices).mockResolvedValue([flashSale] as never);

    const loaded = await loadProduct("serum");

    expect(getPromotionPrices).toHaveBeenCalledTimes(1);
    expect(loaded).toMatchObject({ price: 100, originalPrice: 125 });
  });
});
