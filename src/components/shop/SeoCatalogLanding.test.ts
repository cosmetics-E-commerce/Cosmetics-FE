import { describe, expect, it } from "vitest";

import { groupBrandProducts } from "./brand-product-groups";

describe("brand category merchandising", () => {
  it("places a multi-category product once in its deepest canonical category", () => {
    const product = {
      id: "product-1",
      slug: "cleanser",
      categories: [
        { id: "root", slug: "skin", name: "Skin" },
        { id: "child", slug: "face", name: "Face" },
        { id: "leaf", slug: "cleansers", name: "Cleansers" },
      ],
    };
    const facets = {
      brands: [],
      tags: [],
      price: { min: 100, max: 100 },
      categories: [
        { id: "root", parentId: null, slug: "skin", nameEn: "Skin", nameAr: "البشرة", count: 1 },
        { id: "child", parentId: "root", slug: "face", nameEn: "Face", nameAr: "الوجه", count: 1 },
        {
          id: "leaf",
          parentId: "child",
          slug: "cleansers",
          nameEn: "Cleansers",
          nameAr: "الغسول",
          count: 1,
        },
      ],
    };

    const groups = groupBrandProducts([product as never], facets, "en");
    expect(groups).toHaveLength(1);
    expect(groups[0]).toMatchObject({ slug: "cleansers", name: "Cleansers" });
    expect(groups[0]?.products.map((item) => item.id)).toEqual(["product-1"]);
  });

  it("preserves canonical facet order instead of database return order", () => {
    const products = [
      {
        id: "second-product",
        slug: "second",
        categories: [{ id: "second", slug: "second", name: "Second" }],
      },
      {
        id: "first-product",
        slug: "first",
        categories: [{ id: "first", slug: "first", name: "First" }],
      },
    ];
    const facets = {
      brands: [],
      tags: [],
      price: { min: null, max: null },
      categories: [
        { id: "first", parentId: null, slug: "first", nameEn: "First", nameAr: "الأول", count: 1 },
        {
          id: "second",
          parentId: null,
          slug: "second",
          nameEn: "Second",
          nameAr: "الثاني",
          count: 1,
        },
      ],
    };
    expect(groupBrandProducts(products as never, facets, "en").map((group) => group.id)).toEqual([
      "first",
      "second",
    ]);
  });
});
