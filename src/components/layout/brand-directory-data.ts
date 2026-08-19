import type { PublicBrandListItemResponse } from "@/lib/api";

export type BrandGroup = {
  key: string;
  brands: PublicBrandListItemResponse[];
};

function firstGrapheme(value: string, locale: string) {
  const normalized = value.trim().normalize("NFC");
  if (!normalized) return "#";

  if (typeof Intl.Segmenter === "function") {
    const segment = new Intl.Segmenter(locale, { granularity: "grapheme" })
      .segment(normalized)
      [Symbol.iterator]()
      .next().value as { segment?: string } | undefined;
    if (segment?.segment) return segment.segment;
  }

  return Array.from(normalized)[0] ?? "#";
}

/** Keep catalogue order locale-aware without reducing non-Latin names to '#'. */
export function groupBrands(
  brands: PublicBrandListItemResponse[],
  locale: "ar" | "en",
): BrandGroup[] {
  const collator = new Intl.Collator(locale, { numeric: true, sensitivity: "base" });
  const grouped = new Map<string, PublicBrandListItemResponse[]>();

  for (const brand of brands) {
    const grapheme = firstGrapheme(brand.name, locale);
    const key = /[\p{Letter}\p{Number}]/u.test(grapheme) ? grapheme.toLocaleUpperCase(locale) : "#";
    const entries = grouped.get(key);
    if (entries) entries.push(brand);
    else grouped.set(key, [brand]);
  }

  return Array.from(grouped, ([key, entries]) => ({
    key,
    brands: [...entries].sort((a, b) => collator.compare(a.name, b.name)),
  })).sort((a, b) => {
    if (a.key === "#") return 1;
    if (b.key === "#") return -1;
    return collator.compare(a.key, b.key);
  });
}

export function selectPopularBrands(brands: PublicBrandListItemResponse[], locale: "ar" | "en") {
  if (brands.length < 6) return [];
  const collator = new Intl.Collator(locale, { numeric: true, sensitivity: "base" });
  return [...brands]
    .sort((a, b) => b.productCount - a.productCount || collator.compare(a.name, b.name))
    .slice(0, 5);
}
