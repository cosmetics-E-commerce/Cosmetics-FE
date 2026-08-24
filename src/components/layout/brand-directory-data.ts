import type { PublicBrandListItemResponse } from "@/lib/api";

export type BrandDirectoryItem = Pick<PublicBrandListItemResponse, "id" | "name" | "slug">;

export type BrandGroup<TBrand extends BrandDirectoryItem = PublicBrandListItemResponse> = {
  key: string;
  brands: TBrand[];
};

const LATIN_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const ARABIC_ALPHABET = Array.from("ابتثجحخدذرزسشصضطظعغفقكلمنهوي");
const BRAND_COLLATION = {
  en: {
    base: new Intl.Collator("en", { usage: "sort", numeric: true, sensitivity: "base" }),
    accent: new Intl.Collator("en", { usage: "sort", numeric: true, sensitivity: "accent" }),
  },
  ar: {
    base: new Intl.Collator("ar", { usage: "sort", numeric: true, sensitivity: "base" }),
    accent: new Intl.Collator("ar", { usage: "sort", numeric: true, sensitivity: "accent" }),
  },
} as const;

function firstGrapheme(value: string, locale: string) {
  const normalized = value
    .trim()
    .normalize("NFKD")
    .replace(/\p{Mark}/gu, "");
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

export function brandInitial(value: string, locale: "ar" | "en") {
  const grapheme = firstGrapheme(value, locale);
  return /[\p{Letter}\p{Number}]/u.test(grapheme) ? grapheme.toLocaleUpperCase(locale) : "#";
}

export function brandAlphabet(locale: "ar" | "en") {
  return [...primaryAlphabet(locale)];
}

export function compareBrandInitials(left: string, right: string, locale: "ar" | "en") {
  if (left === right) return 0;
  if (left === "#") return 1;
  if (right === "#") return -1;

  const primary = primaryAlphabet(locale);
  const secondary = locale === "ar" ? LATIN_ALPHABET : ARABIC_ALPHABET;
  const leftRank = alphabetRank(left, primary, secondary);
  const rightRank = alphabetRank(right, primary, secondary);
  if (leftRank !== rightRank) return leftRank - rightRank;

  return BRAND_COLLATION[locale].base.compare(left, right) || compareCodePoints(left, right);
}

export function compareBrands<TBrand extends BrandDirectoryItem>(
  left: TBrand,
  right: TBrand,
  locale: "ar" | "en",
) {
  const { base, accent } = BRAND_COLLATION[locale];

  return (
    base.compare(left.name, right.name) ||
    accent.compare(left.name, right.name) ||
    compareCodePoints(left.name.normalize("NFC"), right.name.normalize("NFC")) ||
    base.compare(left.slug, right.slug) ||
    compareCodePoints(left.slug, right.slug) ||
    compareCodePoints(left.id, right.id)
  );
}

export function sortBrands<TBrand extends BrandDirectoryItem>(
  brands: TBrand[],
  locale: "ar" | "en",
) {
  return [...brands].sort((left, right) => compareBrands(left, right, locale));
}

export function filterBrands<TBrand extends BrandDirectoryItem>(
  brands: TBrand[],
  search: string,
  locale: "ar" | "en",
) {
  const needle = searchable(search, locale);
  return sortBrands(
    needle
      ? brands.filter(
          (brand) =>
            searchable(brand.name, locale).includes(needle) ||
            searchable(brand.slug, locale).includes(needle),
        )
      : brands,
    locale,
  );
}

/** Keep catalogue order locale-aware without reducing non-Latin names to '#'. */
export function groupBrands(
  brands: PublicBrandListItemResponse[],
  locale: "ar" | "en",
): BrandGroup[] {
  return groupBrandItems(brands, locale);
}

export function groupBrandItems<TBrand extends BrandDirectoryItem>(
  brands: TBrand[],
  locale: "ar" | "en",
): BrandGroup<TBrand>[] {
  const grouped = new Map<string, TBrand[]>();

  for (const brand of sortBrands(brands, locale)) {
    const key = brandInitial(brand.name, locale);
    const entries = grouped.get(key);
    if (entries) entries.push(brand);
    else grouped.set(key, [brand]);
  }

  return Array.from(grouped, ([key, entries]) => ({
    key,
    brands: entries,
  })).sort((left, right) => compareBrandInitials(left.key, right.key, locale));
}

export function selectPopularBrands(
  brands: PublicBrandListItemResponse[],
  locale: "ar" | "en",
  limit = 5,
) {
  if (brands.length < 9) return [];
  const selected = [...brands]
    .sort(
      (left, right) => right.productCount - left.productCount || compareBrands(left, right, locale),
    )
    .slice(0, limit);
  return sortBrands(selected, locale);
}

function alphabetRank(letter: string, primary: string[], secondary: string[]) {
  const primaryIndex = primary.indexOf(letter);
  if (primaryIndex >= 0) return primaryIndex;
  const secondaryIndex = secondary.indexOf(letter);
  if (secondaryIndex >= 0) return primary.length + secondaryIndex;
  return primary.length + secondary.length;
}

function primaryAlphabet(locale: "ar" | "en") {
  return locale === "ar" ? ARABIC_ALPHABET : LATIN_ALPHABET;
}

function compareCodePoints(left: string, right: string) {
  if (left === right) return 0;
  return left < right ? -1 : 1;
}

function searchable(value: string, locale: "ar" | "en") {
  return value
    .trim()
    .normalize("NFKD")
    .replace(/\p{Mark}/gu, "")
    .toLocaleLowerCase(locale);
}
