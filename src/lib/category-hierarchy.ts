import type { PublicCategoryResponse } from "@/lib/api";

export function categoryProductCount(category: {
  productCount: number;
  aggregateProductCount?: number | undefined;
}): number {
  return category.aggregateProductCount ?? category.productCount;
}

export function buildCategoryTree(categories: PublicCategoryResponse[]) {
  const sorted = [...categories].sort(
    (left, right) =>
      left.sortOrder - right.sortOrder || left.nameEn.localeCompare(right.nameEn, "en"),
  );
  return partitionCategoryHierarchy(sorted);
}

/** Keeps each root next to its children while preserving the API order within each level. */
export function flattenCategoryHierarchy<T extends { id: string; parentId?: string | null }>(
  categories: T[],
): T[] {
  const { roots, children } = partitionCategoryHierarchy(categories);
  return roots.flatMap((root) => [root, ...(children.get(root.id) ?? [])]);
}

function partitionCategoryHierarchy<T extends { id: string; parentId?: string | null }>(
  categories: T[],
) {
  const children = new Map<string, T[]>();
  const knownIds = new Set(categories.map((category) => category.id));
  const roots: T[] = [];

  for (const category of categories) {
    if (category.parentId && knownIds.has(category.parentId)) {
      children.set(category.parentId, [...(children.get(category.parentId) ?? []), category]);
    } else {
      // An unavailable parent must not make a valid category disappear.
      roots.push(category);
    }
  }

  return { roots, children };
}
