import { useQuery } from "@tanstack/react-query";
import type { PublicProductResponse } from "@/lib/api";
import {
  getProduct,
  getPromotionPrices,
  listBrands,
  listCategories,
  listProductsPage,
  listProducts,
  type PaginationMeta,
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
  const categoryFallback = fallbackImages[category.slug.toLowerCase()] ?? images.collection;
  const skinType = product.skinType ?? [];
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
    categorySlug: category.slug,
    brandId: product.brand?.id ?? null,
    brand: product.brand ? { name: product.brand.name, slug: product.brand.slug } : null,
    slug: product.slug,
    name: arabic ? product.nameAr : product.nameEn,
    category: categoryName,
    type: product.brand?.name ?? categoryName,
    benefit: skinType.length ? skinType.map(prettyEnum).join(" · ") : "",
    shortDescription,
    description,
    price: (product.basePrice ?? 0) / 100,
    rating: product.rating ?? 0,
    reviews: product.reviewCount ?? 0,
    image: primary,
    imageAlt: primaryImage?.altText?.trim() || product.nameEn,
    gallery: gallery.length ? gallery : [primary],
    media: media.length
      ? media
      : [{ id: `legacy-${product.id}`, url: primary, altText: product.nameEn }],
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
    concerns: skinType.map(prettyEnum),
    skinTypes: skinType.map(prettyEnum),
    inStock: stock === undefined ? variants.length > 0 : stock > 0,
    ingredients: product.ingredients?.trim() ?? "",
    ingredientDetails: product.ingredientDetails,
    howToUse: product.howToUse?.trim() ?? "",
    details: description,
    benefits: skinType.map((type) => `Suitable for ${prettyEnum(type).toLowerCase()} skin`),
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
    queryKey: ["catalog-page", params, locale],
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
    initialData,
    placeholderData: (previous) => previous,
    staleTime: 60_000,
  });
}

export function useProduct(slug: string, locale: Locale = "en", initialData?: Product) {
  return useQuery({
    queryKey: ["product", slug, locale],
    queryFn: async () => {
      const record = await getProduct(slug);
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
    queryFn: async () => filterEntitiesWithProducts(await listCategories()),
    initialData: initialData ? filterEntitiesWithProducts(initialData) : undefined,
    staleTime: 60_000,
    refetchOnWindowFocus: "always",
  });
}

export function useBrands(initialData?: Awaited<ReturnType<typeof listBrands>>) {
  return useQuery({
    queryKey: ["brands"],
    queryFn: async () => filterEntitiesWithProducts(await listBrands()),
    initialData: initialData ? filterEntitiesWithProducts(initialData) : undefined,
    staleTime: 60_000,
    refetchOnWindowFocus: "always",
  });
}

export function useAllBrands(initialData?: Awaited<ReturnType<typeof listBrands>>) {
  return useQuery({
    queryKey: ["brands", "all"],
    queryFn: listBrands,
    initialData,
    staleTime: 60_000,
    refetchOnWindowFocus: "always",
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
  return listBrands();
}

function filterEntitiesWithProducts<T extends { productCount: number }>(entities: T[]) {
  return entities.filter((entity) => entity.productCount > 0);
}

function prettyEnum(value: string) {
  return value
    .toLowerCase()
    .replace(
      /(^|_)([a-z])/g,
      (_, space, letter: string) => `${space ? " " : ""}${letter.toUpperCase()}`,
    );
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
