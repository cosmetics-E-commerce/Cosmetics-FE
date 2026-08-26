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

/** Keeps every category next to its descendants while preserving sibling API order. */
export function flattenCategoryHierarchy<T extends { id: string; parentId?: string | null }>(
  categories: T[],
): T[] {
  return flattenCategoryHierarchyWithDepth(categories).map(({ category }) => category);
}

export function flattenCategoryHierarchyWithDepth<
  T extends { id: string; parentId?: string | null },
>(categories: T[]): Array<{ category: T; depth: number }> {
  const { roots, children } = partitionCategoryHierarchy(categories);
  const result: Array<{ category: T; depth: number }> = [];
  const visited = new Set<string>();
  const visit = (category: T, depth: number) => {
    if (visited.has(category.id)) return;
    visited.add(category.id);
    result.push({ category, depth });
    for (const child of children.get(category.id) ?? []) visit(child, depth + 1);
  };
  for (const root of roots) visit(root, 0);
  for (const category of categories) visit(category, 0);
  return result;
}

export function categoryAncestors<T extends { id: string; parentId?: string | null }>(
  categories: T[],
  categoryId: string,
): T[] {
  const byId = new Map(categories.map((category) => [category.id, category]));
  const ancestors: T[] = [];
  const visited = new Set([categoryId]);
  let parentId = byId.get(categoryId)?.parentId;
  while (parentId) {
    if (visited.has(parentId)) break;
    visited.add(parentId);
    const parent = byId.get(parentId);
    if (!parent) break;
    ancestors.unshift(parent);
    parentId = parent.parentId;
  }
  return ancestors;
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
