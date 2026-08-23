export type CatalogListingSearch = {
  brand?: string;
  category?: string;
  concern?: string;
  search?: string;
  sort?: "newest" | "price-asc" | "price-desc";
  view?: "grid" | "list";
  stock?: "in-stock";
  tags?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
};

export function parseCatalogListingSearch(raw: Record<string, unknown>): CatalogListingSearch {
  const page = positiveInteger(raw["page"]);
  const minPrice = nonNegativeNumber(raw["minPrice"]);
  const maxPrice = nonNegativeNumber(raw["maxPrice"]);
  const view = raw["view"] === "list" ? "list" : raw["view"] === "grid" ? "grid" : undefined;
  const sort =
    raw["sort"] === "price-asc" || raw["sort"] === "price-desc" || raw["sort"] === "newest"
      ? raw["sort"]
      : undefined;
  const tags = tagSlugs(raw["tags"]);
  return {
    ...stringValue("brand", raw["brand"]),
    ...stringValue("category", raw["category"]),
    ...stringValue("concern", raw["concern"]),
    ...stringValue("search", raw["search"]),
    ...(sort ? { sort } : {}),
    ...(view ? { view } : {}),
    ...(raw["stock"] === "in-stock" ? { stock: "in-stock" as const } : {}),
    ...(tags ? { tags } : {}),
    ...(minPrice !== undefined ? { minPrice } : {}),
    ...(maxPrice !== undefined ? { maxPrice } : {}),
    ...(page && page > 1 ? { page } : {}),
  };
}

export function catalogListingParams(
  search: CatalogListingSearch,
  scope: { brandSlug?: string; categorySlug?: string } = {},
  page = search.page ?? 1,
) {
  const sort =
    search.sort === "price-asc"
      ? { sortBy: "basePrice", sortOrder: "asc" }
      : search.sort === "price-desc"
        ? { sortBy: "basePrice", sortOrder: "desc" }
        : { sortBy: "createdAt", sortOrder: "desc" };
  return {
    page,
    limit: 24,
    brandSlug: scope.brandSlug ?? search.brand?.toLowerCase(),
    categorySlug: scope.categorySlug ?? search.category?.toLowerCase(),
    search: search.search ?? search.concern,
    tags: search.tags,
    inStock: search.stock === "in-stock" ? "true" : undefined,
    minPrice: search.minPrice !== undefined ? Math.round(search.minPrice * 100) : undefined,
    maxPrice: search.maxPrice !== undefined ? Math.round(search.maxPrice * 100) : undefined,
    ...sort,
  };
}

export function catalogFacetParams(
  search: CatalogListingSearch,
  scope: { brandSlug?: string; categorySlug?: string } = {},
) {
  return {
    brandSlug: scope.brandSlug ?? search.brand?.toLowerCase(),
    categorySlug: scope.categorySlug ?? search.category?.toLowerCase(),
    search: search.search ?? search.concern,
    inStock: search.stock === "in-stock" ? "true" : undefined,
  };
}

export function selectedTagSlugs(search: CatalogListingSearch) {
  return search.tags?.split(",").filter(Boolean) ?? [];
}

export function withResetPage(
  search: CatalogListingSearch,
  patch: CatalogListingPatch,
): CatalogListingSearch {
  const next: Record<string, unknown> = { ...search, ...patch };
  delete next["page"];
  for (const [key, value] of Object.entries(next)) {
    if (value === undefined) delete next[key];
  }
  return next as CatalogListingSearch;
}

export function withListingPage(search: CatalogListingSearch, page: number): CatalogListingSearch {
  const { page: _currentPage, ...rest } = search;
  return page > 1 ? { ...rest, page } : rest;
}

type CatalogListingPatch = {
  [Key in keyof CatalogListingSearch]?: CatalogListingSearch[Key] | undefined;
};

function positiveInteger(value: unknown) {
  const number = typeof value === "string" ? Number.parseInt(value, 10) : Number(value);
  return Number.isInteger(number) && number > 0 ? number : undefined;
}

function nonNegativeNumber(value: unknown) {
  if (value === undefined || value === "") return undefined;
  const number = typeof value === "string" ? Number(value) : Number(value);
  return Number.isFinite(number) && number >= 0 ? number : undefined;
}

function tagSlugs(value: unknown) {
  if (typeof value !== "string") return undefined;
  const tags = value
    .split(",")
    .map((tag) => tag.trim().toLowerCase())
    .filter((tag) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(tag))
    .slice(0, 20);
  return tags.length ? [...new Set(tags)].join(",") : undefined;
}

function stringValue<Key extends "brand" | "category" | "concern" | "search">(
  key: Key,
  value: unknown,
): Partial<Record<Key, string>> {
  if (typeof value !== "string" || !value.trim()) return {};
  return { [key]: value.trim() } as Partial<Record<Key, string>>;
}
