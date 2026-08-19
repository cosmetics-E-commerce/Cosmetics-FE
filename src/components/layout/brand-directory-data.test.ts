import { describe, expect, it } from "vitest";
import type { PublicBrandListItemResponse } from "@/lib/api";
import { groupBrands, selectPopularBrands } from "./brand-directory-data";

function brand(name: string, productCount: number, id = name): PublicBrandListItemResponse {
  return {
    id,
    name,
    productCount,
    slug: id.toLocaleLowerCase().replaceAll(" ", "-"),
    logoUrl: null,
  };
}

describe("brand directory data", () => {
  it("supports empty, single-brand, and large catalogues without special-case layout data", () => {
    expect(groupBrands([], "en")).toEqual([]);
    expect(groupBrands([brand("Nuxe", 1)], "en")).toMatchObject([
      { key: "N", brands: [{ name: "Nuxe" }] },
    ]);

    const largeGroup = groupBrands(
      Array.from({ length: 120 }, (_, index) => brand(`Brand ${index + 1}`, 1, `brand-${index}`)),
      "en",
    );
    expect(largeGroup).toHaveLength(1);
    expect(largeGroup[0]?.brands).toHaveLength(120);
  });

  it("groups Unicode letters, numbers, and symbols without collapsing non-Latin names", () => {
    const groups = groupBrands(
      [
        brand("Avène", 4),
        brand("Éclat", 2),
        brand("بيزلين", 9),
        brand("١٠ Moons", 3),
        brand("✨ Ritual", 1),
      ],
      "ar",
    );

    expect(groups.find((group) => group.key === "A")?.brands[0]?.name).toBe("Avène");
    expect(groups.find((group) => group.key === "É")?.brands[0]?.name).toBe("Éclat");
    expect(groups.find((group) => group.key === "ب")?.brands[0]?.name).toBe("بيزلين");
    expect(groups.find((group) => group.key === "١")?.brands[0]?.name).toBe("١٠ Moons");
    expect(groups.at(-1)).toMatchObject({ key: "#" });
  });

  it("sorts brands within each group using locale-aware numeric order", () => {
    const [group] = groupBrands([brand("Axis 10", 1), brand("Axis 2", 1), brand("Avène", 1)], "en");

    expect(group?.brands.map((entry) => entry.name)).toEqual(["Avène", "Axis 2", "Axis 10"]);
  });

  it("shows a deterministic five-brand popular shortlist only for a real catalogue", () => {
    const brands = [
      brand("Beesline", 9),
      brand("COSRX", 8),
      brand("Axe", 5),
      brand("Avène", 4),
      brand("Aloketa", 4),
      brand("Anua", 1),
    ];

    expect(selectPopularBrands(brands.slice(0, 5), "en")).toEqual([]);
    expect(selectPopularBrands(brands, "en").map((entry) => entry.name)).toEqual([
      "Beesline",
      "COSRX",
      "Axe",
      "Aloketa",
      "Avène",
    ]);
    expect(brands.map((entry) => entry.name)).toEqual([
      "Beesline",
      "COSRX",
      "Axe",
      "Avène",
      "Aloketa",
      "Anua",
    ]);
  });
});
