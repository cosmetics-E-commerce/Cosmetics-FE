import type { CatalogFacetResponse } from "@/lib/api";
import type { Product } from "@/lib/products";

export function groupBrandProducts(
  products: Product[],
  facets: CatalogFacetResponse,
  locale: "ar" | "en",
) {
  const byId = new Map(
    facets.categories.map((category, order) => [category.id, { ...category, order }]),
  );
  const depth = (id: string): number => {
    let current = byId.get(id);
    let value = 0;
    const seen = new Set<string>();
    while (current?.parentId && !seen.has(current.id)) {
      seen.add(current.id);
      value += 1;
      current = byId.get(current.parentId);
    }
    return value;
  };
  const groups = new Map<
    string,
    { id: string; slug: string; name: string; order: number; products: Product[] }
  >();

  for (const product of products) {
    const assigned = (product.categories ?? [])
      .map((category) => ({ category, facet: byId.get(category.id) }))
      .sort((left, right) => {
        const depthDifference = depth(right.category.id) - depth(left.category.id);
        if (depthDifference) return depthDifference;
        return (
          (left.facet?.order ?? Number.MAX_SAFE_INTEGER) -
          (right.facet?.order ?? Number.MAX_SAFE_INTEGER)
        );
      })[0];
    if (!assigned) continue;
    const key = assigned.category.id || assigned.category.slug;
    const existing = groups.get(key) ?? {
      id: key,
      slug: assigned.category.slug,
      name: assigned.facet
        ? locale === "ar"
          ? assigned.facet.nameAr
          : assigned.facet.nameEn
        : assigned.category.name,
      order: assigned.facet?.order ?? Number.MAX_SAFE_INTEGER,
      products: [],
    };
    if (!existing.products.some((item) => item.id === product.id)) existing.products.push(product);
    groups.set(key, existing);
  }

  return [...groups.values()].sort(
    (left, right) => left.order - right.order || left.name.localeCompare(right.name, locale),
  );
}
