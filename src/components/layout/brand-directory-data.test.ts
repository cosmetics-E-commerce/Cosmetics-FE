import { describe, expect, it } from "vitest";
import type { PublicBrandListItemResponse } from "@/lib/api";
import { filterBrands, groupBrands, selectPopularBrands, sortBrands } from "./brand-directory-data";

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
  it("matches the required alphabetical directory grouping exactly", () => {
    const groups = groupBrands(
      ["CeraVe", "Anua", "Bioderma", "Atelier Nude", "Eucerin", "COSRX"].map((name) =>
        brand(name, 1),
      ),
      "en",
    );

    expect(groups.map(({ key, brands }) => [key, brands.map((entry) => entry.name)])).toEqual([
      ["A", ["Anua", "Atelier Nude"]],
      ["B", ["Bioderma"]],
      ["C", ["CeraVe", "COSRX"]],
      ["E", ["Eucerin"]],
    ]);
  });

  it("normalizes case into one letter group while preserving display names", () => {
    const groups = groupBrands(
      [brand("cerave", 1, "lower"), brand("COSRX", 1), brand("CeraVe", 1, "mixed")],
      "en",
    );

    expect(groups).toHaveLength(1);
    expect(groups[0]?.key).toBe("C");
    expect(groups[0]?.brands.map((entry) => entry.name)).toEqual(["CeraVe", "cerave", "COSRX"]);
  });

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
    expect(groups.find((group) => group.key === "E")?.brands[0]?.name).toBe("Éclat");
    expect(groups.find((group) => group.key === "ب")?.brands[0]?.name).toBe("بيزلين");
    expect(groups.find((group) => group.key === "١")?.brands[0]?.name).toBe("١٠ Moons");
    expect(groups.at(-1)).toMatchObject({ key: "#" });
  });

  it("sorts brands within each group using locale-aware numeric order", () => {
    const [group] = groupBrands([brand("Axis 10", 1), brand("Axis 2", 1), brand("Avène", 1)], "en");

    expect(group?.brands.map((entry) => entry.name)).toEqual(["Avène", "Axis 2", "Axis 10"]);
  });

  it("sorts shuffled API data alphabetically without mutating the shared array", () => {
    const input = [
      brand("The Ordinary", 1, "the-ordinary"),
      brand("COSRX", 1, "cosrx"),
      brand("Avène", 1, "avene"),
      brand("Beauty of Joseon", 1, "beauty-of-joseon"),
      brand("Atelier Nude", 1, "atelier-nude"),
      brand("Anua", 1, "anua"),
      brand("CeraVe", 1, "cerave"),
      brand("Lumiere Beauty", 1, "lumiere-beauty"),
      brand("La Roche-Posay", 1, "la-roche-posay"),
    ];
    const originalOrder = input.map((entry) => entry.id);

    expect(sortBrands(input, "en").map((entry) => entry.name)).toEqual([
      "Anua",
      "Atelier Nude",
      "Avène",
      "Beauty of Joseon",
      "CeraVe",
      "COSRX",
      "La Roche-Posay",
      "Lumiere Beauty",
      "The Ordinary",
    ]);
    expect(input.map((entry) => entry.id)).toEqual(originalOrder);
  });

  it("uses deterministic tie-breakers and Arabic collation regardless of insertion order", () => {
    const equivalentNames = [
      brand("avene", 1, "lower"),
      brand("AVENE", 1, "upper"),
      brand("Avène", 1, "accented"),
    ];
    const forward = sortBrands(equivalentNames, "en").map((entry) => entry.id);
    const reverse = sortBrands([...equivalentNames].reverse(), "en").map((entry) => entry.id);

    expect(reverse).toEqual(forward);
    expect(
      sortBrands(
        [brand("زينة", 1), brand("أنوا", 1), brand("بيزلين", 1), brand("ابتكار", 1)],
        "ar",
      ).map((entry) => entry.name),
    ).toEqual(["ابتكار", "أنوا", "بيزلين", "زينة"]);
  });

  it("orders normalized alphabet groups independently of backend insertion order", () => {
    const groups = groupBrands(
      [brand("Éclat", 1), brand("COSRX", 1), brand("Beauty", 1), brand("Avène", 1)],
      "en",
    );

    expect(groups.map((group) => group.key)).toEqual(["A", "B", "C", "E"]);
  });

  it("shows a deterministic popular shortlist only when the catalogue needs one", () => {
    const brands = [
      brand("Beesline", 9),
      brand("COSRX", 8),
      brand("Axe", 5),
      brand("Avène", 4),
      brand("Aloketa", 4),
      brand("Anua", 1),
      brand("Dior", 4),
      brand("Mizon", 2),
      brand("Nuxe", 3),
    ];

    expect(selectPopularBrands(brands.slice(0, 8), "en")).toEqual([]);
    expect(selectPopularBrands(brands, "en").map((entry) => entry.name)).toEqual([
      "Aloketa",
      "Avène",
      "Axe",
      "Beesline",
      "COSRX",
    ]);
    expect(brands.map((entry) => entry.name)).toEqual([
      "Beesline",
      "COSRX",
      "Axe",
      "Avène",
      "Aloketa",
      "Anua",
      "Dior",
      "Mizon",
      "Nuxe",
    ]);
  });

  it("filters instantly without case or accent sensitivity and also matches slugs", () => {
    const brands = [
      brand("Rare Beauty", 4),
      brand("Lumiere Beauty", 4),
      brand("Beauty Secrets", 4),
      brand("Beauty of Joseon", 4),
      brand("Avène", 4),
      brand("COSRX", 8),
      brand("بيزلين", 9),
    ];

    expect(filterBrands(brands, "avene", "en").map((entry) => entry.name)).toEqual(["Avène"]);
    expect(filterBrands(brands, "cosrx", "en").map((entry) => entry.name)).toEqual(["COSRX"]);
    expect(filterBrands(brands, "بيز", "ar").map((entry) => entry.name)).toEqual(["بيزلين"]);
    expect(filterBrands(brands, "beauty", "en").map((entry) => entry.name)).toEqual([
      "Beauty of Joseon",
      "Beauty Secrets",
      "Lumiere Beauty",
      "Rare Beauty",
    ]);
  });
});
