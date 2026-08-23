import { describe, expect, it } from "vitest";

import {
  catalogListingParams,
  parseCatalogListingSearch,
  withListingPage,
  withResetPage,
} from "./catalog-listing-state";

describe("catalog listing URL state", () => {
  it("normalizes supported values and rejects broken query input", () => {
    expect(
      parseCatalogListingSearch({
        page: "0",
        minPrice: "-1",
        maxPrice: "1500",
        view: "table",
        sort: "random",
        tags: " Matte , vegan,../../bad,matte ",
        stock: "in-stock",
      }),
    ).toEqual({ maxPrice: 1500, stock: "in-stock", tags: "matte,vegan" });
  });

  it("preserves filters, sorting and view while paging and resets only the page on refinement", () => {
    const state = {
      search: "serum",
      sort: "price-asc" as const,
      view: "list" as const,
      stock: "in-stock" as const,
      tags: "vegan",
      page: 4,
    };

    expect(withListingPage(state, 7)).toEqual({ ...state, page: 7 });
    expect(withListingPage(state, 1)).toEqual({
      search: "serum",
      sort: "price-asc",
      view: "list",
      stock: "in-stock",
      tags: "vegan",
    });
    expect(withResetPage(state, { tags: undefined, minPrice: 500 })).toEqual({
      search: "serum",
      sort: "price-asc",
      view: "list",
      stock: "in-stock",
      minPrice: 500,
    });
  });

  it("converts customer-facing Egyptian pound ranges to API piastres", () => {
    expect(
      catalogListingParams(
        { minPrice: 500, maxPrice: 1500, stock: "in-stock", sort: "price-desc" },
        { brandSlug: "capixy" },
      ),
    ).toMatchObject({
      brandSlug: "capixy",
      minPrice: 50_000,
      maxPrice: 150_000,
      inStock: "true",
      sortBy: "basePrice",
      sortOrder: "desc",
    });
  });
});
