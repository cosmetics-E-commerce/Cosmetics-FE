import { useQuery } from "@tanstack/react-query";
import type { PublicProductResponse } from "@/lib/api";
import {
  getProduct,
  getPromotionPrices,
  listBrands,
  listCategories,
  listProducts,
} from "@/lib/api";
import { images, type Product } from "@/lib/products";
import { trackCommerceEvent } from "@/lib/analytics";

export type Locale = "ar" | "en";

const fallbackImages: Record<string, string> = {
  skincare: images.catSkincare,
  makeup: images.catMakeup,
  haircare: images.catHaircare,
  fragrance: images.catFragrance,
};

export function mapProduct(product: PublicProductResponse, locale: Locale): Product {
  const arabic = locale === "ar";
  const variants = product.variants as Array<
    (typeof product.variants)[number] & { stock?: number }
  >;
  const hasStockData = variants.some((variant) => typeof variant.stock === "number");
  const stock = hasStockData
    ? variants.reduce((total, variant) => total + (variant.stock ?? 0), 0)
    : undefined;
  const categoryName = arabic ? product.category.nameAr : product.category.nameEn;
  const categoryFallback = fallbackImages[product.category.slug.toLowerCase()] ?? images.collection;
  const gallery = product.images
    .slice()
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((image) => image.url.trim())
    .filter(Boolean);
  const primary = product.imageUrl?.trim() || gallery[0] || categoryFallback;
  return {
    id: product.id,
    categoryId: product.category.id,
    brandId: product.brand?.id ?? null,
    slug: product.slug,
    name: arabic ? product.nameAr : product.nameEn,
    category: categoryName,
    type: product.brand?.name ?? categoryName,
    benefit: product.skinType.length
      ? product.skinType.map(prettyEnum).join(" · ")
      : "Curated beauty essential",
    description:
      (arabic ? product.descriptionAr : product.descriptionEn) ??
      product.descriptionEn ??
      product.descriptionAr ??
      "A carefully selected BIOREZA essential.",
    price: product.basePrice / 100,
    rating: product.rating,
    reviews: product.reviewCount,
    image: primary,
    gallery: gallery.length ? gallery : [primary],
    sizes: variants.map((variant) => ({
      id: variant.id,
      label: arabic ? variant.nameAr : variant.nameEn,
      price: variant.price / 100,
      shadeHex: variant.shadeHex,
      ...(variant.stock !== undefined ? { stock: variant.stock } : {}),
    })),
    ...(stock !== undefined ? { stock } : {}),
    concerns: product.skinType.map(prettyEnum),
    skinTypes: product.skinType.map(prettyEnum),
    inStock: stock === undefined ? variants.length > 0 : stock > 0,
    ingredients: product.ingredients ?? "Ingredient details are being prepared.",
    ingredientDetails: product.ingredientDetails,
    howToUse: product.howToUse ?? "Follow the directions on the product packaging.",
    details:
      (arabic ? product.descriptionAr : product.descriptionEn) ??
      "Authentic product supplied through BIOREZA.",
    benefits: product.skinType.map((type) => `Suitable for ${prettyEnum(type).toLowerCase()} skin`),
  };
}

export function useCatalog(
  params: Record<string, string | number | undefined> = {},
  locale: Locale = "en",
  initialData?: Product[],
) {
  return useQuery({
    queryKey: ["catalog", params, locale],
    queryFn: async ({ signal }) => {
      const records = await listProducts(params, signal);
      if (
        typeof window !== "undefined" &&
        typeof params["search"] === "string" &&
        params["search"].trim()
      )
        trackCommerceEvent("search_performed", {
          searchTerm: params["search"].trim(),
          resultCount: records.length,
        });
      const prices = await promotionalPrices(records);
      return records.map((product) => applyPrices(mapProduct(product, locale), prices));
    },
    initialData,
    staleTime: 60_000,
  });
}

export function useProduct(slug: string, locale: Locale = "en", initialData?: Product) {
  return useQuery({
    queryKey: ["product", slug, locale],
    queryFn: async () => {
      const record = await getProduct(slug);
      if (typeof window !== "undefined")
        trackCommerceEvent("product_viewed", { productId: record.id });
      return applyPrices(mapProduct(record, locale), await promotionalPrices([record]));
    },
    enabled: Boolean(slug),
    initialData,
    staleTime: 60_000,
  });
}

export function useCategories(initialData?: Awaited<ReturnType<typeof listCategories>>) {
  return useQuery({
    queryKey: ["categories"],
    queryFn: listCategories,
    initialData,
    staleTime: 300_000,
  });
}

export function useBrands(initialData?: Awaited<ReturnType<typeof listBrands>>) {
  return useQuery({
    queryKey: ["brands"],
    queryFn: listBrands,
    initialData,
    staleTime: 300_000,
  });
}

export async function loadCatalog(
  params: Record<string, string | number | undefined> = {},
  locale: Locale = "en",
) {
  const records = await listProducts(params);
  const prices = await promotionalPrices(records);
  return records.map((product) => applyPrices(mapProduct(product, locale), prices));
}

export async function loadProduct(slug: string, locale: Locale = "en") {
  const record = await getProduct(slug);
  return applyPrices(mapProduct(record, locale), await promotionalPrices([record]));
}

export const loadCategories = listCategories;
export const loadBrands = listBrands;

function prettyEnum(value: string) {
  return value
    .toLowerCase()
    .replace(
      /(^|_)([a-z])/g,
      (_, space, letter: string) => `${space ? " " : ""}${letter.toUpperCase()}`,
    );
}

async function promotionalPrices(products: PublicProductResponse[]) {
  const lines = products.flatMap((product) =>
    product.variants.map((variant) => ({
      variantId: variant.id,
      productId: product.id,
      categoryId: product.category.id,
      brandId: product.brand?.id ?? null,
      name: product.nameEn,
      unitPrice: variant.price,
      quantity: 1,
    })),
  );
  if (!lines.length)
    return new Map<string, Awaited<ReturnType<typeof getPromotionPrices>>[number]>();
  const results = await getPromotionPrices(lines);
  return new Map(results.map((result) => [result.variantId, result]));
}

function applyPrices(
  product: Product,
  prices: Map<string, Awaited<ReturnType<typeof getPromotionPrices>>[number]>,
): Product {
  const sizes = product.sizes.map((size) => {
    const offer = size.id ? prices.get(size.id) : undefined;
    return offer
      ? {
          ...size,
          originalPrice: offer.originalPrice / 100,
          price: offer.price / 100,
          ...(offer.promotions[0]?.title ? { promotionTitle: offer.promotions[0].title } : {}),
        }
      : size;
  });
  const active =
    sizes.find((size) => size.originalPrice !== undefined && size.price < size.originalPrice) ??
    sizes[0];
  const originalPrice = active?.originalPrice;
  return {
    ...product,
    sizes,
    price: active?.price ?? product.price,
    ...(originalPrice !== undefined ? { originalPrice } : {}),
    ...(originalPrice && active
      ? { savingsPercent: Math.round((1 - active.price / originalPrice) * 100) }
      : {}),
    ...(active?.promotionTitle
      ? { promotionTitle: active.promotionTitle, promotionBadge: "SALE" as const }
      : {}),
  };
}
