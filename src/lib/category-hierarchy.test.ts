import { describe, expect, it } from "vitest";

import type { PublicCategoryResponse } from "@/lib/api";
import {
  buildCategoryTree,
  categoryProductCount,
  flattenCategoryHierarchy,
} from "./category-hierarchy";

const root = category({
  id: "10000000-0000-4000-8000-000000000001",
  slug: "hair-products",
  nameEn: "Hair Products",
  parentId: null,
  productCount: 1,
  aggregateProductCount: 5,
});
const child = category({
  id: "10000000-0000-4000-8000-000000000002",
  slug: "shampoo",
  nameEn: "Shampoo",
  parentId: root.id,
  productCount: 4,
  aggregateProductCount: 4,
});

describe("storefront category hierarchy", () => {
  it("keeps children out of the root rail and indexes them by parent", () => {
    const tree = buildCategoryTree([child, root]);
    expect(tree.roots.map((item) => item.id)).toEqual([root.id]);
    expect(tree.children.get(root.id)?.map((item) => item.id)).toEqual([child.id]);
  });

  it("uses aggregate counts for parents while retaining legacy direct counts", () => {
    expect(root.productCount).toBe(1);
    expect(categoryProductCount(root)).toBe(5);
    expect(categoryProductCount(child)).toBe(4);
  });

  it("promotes a category with a missing parent to a safe visible root", () => {
    const orphan = category({
      id: "10000000-0000-4000-8000-000000000003",
      slug: "legacy-child",
      nameEn: "Legacy child",
      parentId: "10000000-0000-4000-8000-000000000099",
    });
    expect(buildCategoryTree([orphan]).roots).toEqual([orphan]);
  });

  it("groups filter options as root followed by children without losing API order", () => {
    const secondRoot = category({
      id: "10000000-0000-4000-8000-000000000004",
      slug: "skincare",
      nameEn: "Skincare",
      parentId: null,
    });
    expect(flattenCategoryHierarchy([child, secondRoot, root]).map((item) => item.id)).toEqual([
      secondRoot.id,
      root.id,
      child.id,
    ]);
  });
});

function category(
  overrides: Partial<PublicCategoryResponse> &
    Pick<PublicCategoryResponse, "id" | "slug" | "nameEn" | "parentId">,
): PublicCategoryResponse {
  return {
    nameAr: overrides.nameEn,
    imageUrl: null,
    sortOrder: 0,
    productCount: 0,
    ...overrides,
  };
}
