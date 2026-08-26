import { queryOptions, useQuery } from "@tanstack/react-query";
import type { PublicProductResponse } from "@/lib/api";
import {
  getProduct,
  getProductFacets,
  getPromotionPrices,
  listAllBrands,
  listBrands,
  listCategories,
  listProductsPage,
  listMerchandisingProducts,
  listProducts,
  type PaginationMeta,
} from "@/lib/api";
import { categoryProductCount } from "@/lib/category-hierarchy";
import { images, type Product } from "@/lib/products";
import { trackCommerceEvent } from "@/lib/analytics";

export type Locale = "ar" | "en";

const CATALOG_STALE_TIME = 2 * 60_000;
const REFERENCE_STALE_TIME = 15 * 60_000;
const REFERENCE_GC_TIME = 30 * 60_000;

const fallbackImages: Record<string, string> = {
  skincare: images.catSkincare,
  makeup: images.catMakeup,
  haircare: images.catHaircare,
  fragrance: images.catFragrance,
};

export function mapProduct(product: PublicProductResponse, locale: Locale): Product {
  const arabic = locale === "ar";
  const variants = (product.variants ?? []) as Array<
    (typeof product.variants)[number] & { stock?: number }
  >;
  const hasStockData = variants.some((variant) => typeof variant.stock === "number");
  const stock = hasStockData
    ? variants.reduce((total, variant) => total + (variant.stock ?? 0), 0)
    : undefined;
  const category = product.category ?? {
    id: "",
    slug: "collection",
    nameEn: "Collection",
    nameAr: "المجموعة",
  };
  const categoryName = arabic ? category.nameAr : category.nameEn;
  const assignedCategories = (product.categories?.length ? product.categories : [category]).map(
    (assigned) => ({
      id: assigned.id,
      slug: assigned.slug,
      name: arabic ? assigned.nameAr : assigned.nameEn,
    }),
  );
  const categoryFallback = fallbackImages[category.slug.toLowerCase()] ?? images.collection;
  const skinType = product.skinType ?? [];
  const tagNames = (product.tags ?? []).map((tag) => localizeTagName(tag, locale));
  const discoveryLabels = tagNames.length
    ? tagNames
    : skinType.map((value) => localizedSkinType(value, locale));
  const gallery = (product.images ?? [])
    .slice()
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((image) => renderableImage(image.url))
    .filter((url): url is string => Boolean(url));
  const media = (product.images ?? [])
    .slice()
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .flatMap((image) => {
      const url = renderableImage(image.url);
      return url
        ? [
            {
              id: image.id,
              url,
              altText: image.altText?.trim() || (arabic ? product.nameAr : product.nameEn),
            },
          ]
        : [];
    });
  const primary = renderableImage(product.imageUrl) || gallery[0] || categoryFallback;
  const primaryImage = (product.images ?? []).find(
    (image) => renderableImage(image.url) === primary,
  );
  const description = firstNonEmpty(
    arabic ? product.descriptionAr : product.descriptionEn,
    arabic ? product.descriptionEn : product.descriptionAr,
  );
  const shortDescription = firstNonEmpty(
    arabic ? product.shortDescriptionAr : product.shortDescriptionEn,
    arabic ? product.shortDescriptionEn : product.shortDescriptionAr,
  );
  return {
    id: product.id,
    categoryId: category.id,
    categoryIds: assignedCategories.map((assigned) => assigned.id),
    categories: assignedCategories,
    categorySlug: category.slug,
    brandId: product.brand?.id ?? null,
    brand: product.brand ? { name: product.brand.name, slug: product.brand.slug } : null,
    slug: product.slug,
    name: arabic ? product.nameAr : product.nameEn,
    category: categoryName,
    type: product.brand?.name ?? categoryName,
    benefit: discoveryLabels.join(" · "),
    shortDescription,
    description,
    price: (product.basePrice ?? 0) / 100,
    rating: product.rating ?? 0,
    reviews: product.reviewCount ?? 0,
    image: primary,
    imageAlt: primaryImage?.altText?.trim() || (arabic ? product.nameAr : product.nameEn),
    gallery: gallery.length ? gallery : [primary],
    media: media.length
      ? media
      : [
          {
            id: `legacy-${product.id}`,
            url: primary,
            altText: arabic ? product.nameAr : product.nameEn,
          },
        ],
    options: (product.options ?? []).map((option) => ({
      id: option.id,
      label: arabic ? option.nameAr : option.nameEn,
      values: option.values.map((value) => ({
        id: value.id,
        label: arabic ? value.valueAr : value.valueEn,
        metadata: value.metadata,
      })),
    })),
    sizes: variants.map((variant) => ({
      id: variant.id,
      sku: variant.sku,
      label: arabic ? variant.nameAr : variant.nameEn,
      price: variant.price / 100,
      ...(variant.compareAtPrice !== null ? { originalPrice: variant.compareAtPrice / 100 } : {}),
      shadeHex: variant.shadeHex,
      optionValueIds: variant.optionValues.map((value) => value.id),
      optionValues: variant.optionValues.map((value) => ({
        id: value.id,
        label: arabic ? value.valueAr : value.valueEn,
      })),
      media: variant.images.flatMap((image) => {
        const url = renderableImage(image.url);
        return url
          ? [
              {
                id: image.id,
                url,
                altText: image.altText?.trim() || (arabic ? product.nameAr : product.nameEn),
              },
            ]
          : [];
      }),
      ...(variant.stock !== undefined ? { stock: variant.stock } : {}),
    })),
    ...(stock !== undefined ? { stock } : {}),
    concerns: discoveryLabels,
    skinTypes: skinType.map((value) => localizedSkinType(value, locale)),
    inStock: stock === undefined ? variants.length > 0 : stock > 0,
    ingredients: product.ingredients?.trim() ?? "",
    ingredientDetails: product.ingredientDetails,
    howToUse: firstNonEmpty(
      arabic ? product.howToUseAr : (product.howToUseEn ?? product.howToUse),
      arabic ? (product.howToUseEn ?? product.howToUse) : product.howToUseAr,
    ),
    details: description,
    benefits: discoveryLabels,
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

export function useCatalogPage(
  params: Record<string, string | number | undefined> = {},
  locale: Locale = "en",
  initialData?: { items: Product[]; meta: PaginationMeta },
) {
  return useQuery({
    ...catalogPageQuery(params, locale),
    ...(initialData !== undefined ? { initialData } : {}),
    placeholderData: (previous) => previous,
  });
}

export function useCatalogFacets(
  params: Record<string, string | number | undefined> = {},
  initialData?: Awaited<ReturnType<typeof getProductFacets>>,
) {
  return useQuery({
    ...catalogFacetsQuery(params),
    ...(initialData !== undefined ? { initialData } : {}),
  });
}

export function useMerchandisingCatalog(
  params: { section: string; limit?: number; categorySlug?: string; excludeProductId?: string },
  locale: Locale = "en",
  initialData?: Product[],
) {
  return useQuery({
    ...merchandisingQuery(params, locale),
    ...(initialData !== undefined ? { initialData } : {}),
  });
}

export function useProduct(slug: string, locale: Locale = "en", initialData?: Product) {
  return useQuery({
    ...productQuery(slug, locale),
    enabled: Boolean(slug),
    ...(initialData !== undefined ? { initialData } : {}),
  });
}

export function useCategories(initialData?: Awaited<ReturnType<typeof listCategories>>) {
  return useQuery({
    ...categoriesQuery(),
    ...(initialData ? { initialData: filterEntitiesWithProducts(initialData) } : {}),
  });
}

export function useBrands(initialData?: Awaited<ReturnType<typeof listBrands>>) {
  return useQuery({
    ...brandsQuery(),
    ...(initialData ? { initialData: filterEntitiesWithProducts(initialData) } : {}),
  });
}

export function useAllBrands(initialData?: Awaited<ReturnType<typeof listAllBrands>>) {
  return useQuery({
    ...allBrandsQuery(),
    ...(initialData !== undefined ? { initialData } : {}),
  });
}

export function catalogPageQuery(
  params: Record<string, string | number | undefined> = {},
  locale: Locale = "en",
) {
  return queryOptions({
    queryKey: ["catalog-page", params, locale] as const,
    queryFn: async ({ signal }) => {
      const records = await listProductsPage(params, signal);
      if (
        typeof window !== "undefined" &&
        typeof params["search"] === "string" &&
        params["search"].trim()
      ) {
        trackCommerceEvent("search_performed", {
          searchTerm: params["search"].trim(),
          resultCount: records.meta.total,
        });
      }
      const prices = await promotionalPrices(records.items);
      return {
        items: records.items.map((product) => applyPrices(mapProduct(product, locale), prices)),
        meta: records.meta,
      };
    },
    staleTime: CATALOG_STALE_TIME,
  });
}

export function catalogFacetsQuery(params: Record<string, string | number | undefined> = {}) {
  return queryOptions({
    queryKey: ["catalog-facets", params] as const,
    queryFn: ({ signal }) => getProductFacets(params, signal),
    staleTime: CATALOG_STALE_TIME,
  });
}

export function merchandisingQuery(
  params: { section: string; limit?: number; categorySlug?: string; excludeProductId?: string },
  locale: Locale = "en",
) {
  return queryOptions({
    queryKey: ["merchandising", params, locale] as const,
    queryFn: async ({ signal }) => {
      const records = await listMerchandisingProducts(params, signal);
      const prices = await promotionalPrices(records);
      return records.map((product) => applyPrices(mapProduct(product, locale), prices));
    },
    staleTime: CATALOG_STALE_TIME,
  });
}

export function productQuery(slug: string, locale: Locale = "en") {
  return queryOptions({
    queryKey: ["product", slug, locale] as const,
    queryFn: async () => {
      const record = await getProduct(slug);
      return applyPrices(mapProduct(record, locale), await promotionalPrices([record]));
    },
    staleTime: CATALOG_STALE_TIME,
  });
}

export function categoriesQuery() {
  return queryOptions({
    queryKey: ["categories"] as const,
    queryFn: async () => filterEntitiesWithProducts(await listCategories()),
    staleTime: REFERENCE_STALE_TIME,
    gcTime: REFERENCE_GC_TIME,
  });
}

export function brandsQuery() {
  return queryOptions({
    queryKey: ["brands"] as const,
    queryFn: async () => filterEntitiesWithProducts(await listBrands()),
    staleTime: REFERENCE_STALE_TIME,
    gcTime: REFERENCE_GC_TIME,
  });
}

export function allBrandsQuery() {
  return queryOptions({
    queryKey: ["brands", "all"] as const,
    queryFn: ({ signal }) => listAllBrands(signal),
    staleTime: REFERENCE_STALE_TIME,
    gcTime: REFERENCE_GC_TIME,
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

export async function loadCatalogPage(
  params: Record<string, string | number | undefined> = {},
  locale: Locale = "en",
) {
  const records = await listProductsPage(params);
  const prices = await promotionalPrices(records.items);
  return {
    items: records.items.map((product) => applyPrices(mapProduct(product, locale), prices)),
    meta: records.meta,
  };
}

export async function loadCatalogFacets(params: Record<string, string | number | undefined> = {}) {
  return getProductFacets(params);
}

export async function loadMerchandisingCatalog(
  params: { section: string; limit?: number; categorySlug?: string; excludeProductId?: string },
  locale: Locale = "en",
) {
  const records = await listMerchandisingProducts(params);
  const prices = await promotionalPrices(records);
  return records.map((product) => applyPrices(mapProduct(product, locale), prices));
}

export async function loadProduct(slug: string, locale: Locale = "en") {
  const record = await getProduct(slug);
  return applyPrices(mapProduct(record, locale), await promotionalPrices([record]));
}

export async function loadCategories() {
  return filterEntitiesWithProducts(await listCategories());
}

export async function loadBrands() {
  return filterEntitiesWithProducts(await listBrands());
}

export async function loadAllBrands() {
  return listAllBrands();
}

function filterEntitiesWithProducts<T extends { productCount: number }>(entities: T[]) {
  return entities.filter((entity) => categoryProductCount(entity) > 0);
}

function prettyEnum(value: string) {
  return value
    .toLowerCase()
    .replace(
      /(^|_)([a-z])/g,
      (_, space, letter: string) => `${space ? " " : ""}${letter.toUpperCase()}`,
    );
}

const arabicSkinTypes = {
  ALL: "مناسب لجميع أنواع البشرة",
  OILY: "البشرة الدهنية",
  DRY: "البشرة الجافة",
  COMBINATION: "البشرة المختلطة",
  SENSITIVE: "البشرة الحساسة",
  NORMAL: "البشرة العادية",
} as const satisfies Record<string, string>;

const migratedSkinTagArabic: Record<string, string> = {
  "all-skin-types": arabicSkinTypes.ALL,
  "oily-skin": arabicSkinTypes.OILY,
  "dry-skin": arabicSkinTypes.DRY,
  "combination-skin": arabicSkinTypes.COMBINATION,
  "sensitive-skin": arabicSkinTypes.SENSITIVE,
  "normal-skin": arabicSkinTypes.NORMAL,
};

function localizedSkinType(value: string, locale: Locale) {
  const arabicLabel = (arabicSkinTypes as Record<string, string>)[value];
  return locale === "ar" ? (arabicLabel ?? prettyEnum(value)) : prettyEnum(value);
}

export function localizeTagName(tag: { name: string; slug: string }, locale: Locale) {
  if (locale === "ar") return migratedSkinTagArabic[tag.slug] ?? tag.name;
  return tag.name;
}

function firstNonEmpty(...values: Array<string | null | undefined>) {
  return values.find((value) => value?.trim())?.trim() ?? "";
}

function renderableImage(value: string | null | undefined): string | null {
  return value?.trim() || null;
}

async function promotionalPrices(products: PublicProductResponse[]) {
  const lines = products.flatMap((product) =>
    product.variants.map((variant) => ({
      variantId: variant.id,
      productId: product.id,
      categoryId: product.category.id,
      categoryIds: product.categories.map((category) => category.id),
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
