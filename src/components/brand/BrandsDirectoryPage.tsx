import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Search, X } from "lucide-react";

import {
  brandAlphabet,
  compareBrandInitials,
  filterBrands,
  groupBrands,
  sortBrands,
} from "@/components/layout/brand-directory-data";
import { useAllBrands } from "@/lib/catalog";
import type { PublicBrandListItemResponse } from "@/lib/api";

const pageCopy = {
  en: {
    eyebrow: "Our brands",
    title: "Beauty, by name.",
    intro:
      "Discover every beauty house available at BIOREZA, from daily essentials to considered rituals.",
    search: "Search all brands",
    clear: "Clear brand search",
    directory: "Brand directory",
    count: (count: number) => `${count} ${count === 1 ? "brand" : "brands"}`,
    products: (count: number) => `${count} ${count === 1 ? "product" : "products"}`,
    noResults: "No brands match that search.",
    empty: "Our brand directory is being curated. Please check again soon.",
    error: "We couldn't load the brand directory. Please try again shortly.",
    loading: "Loading brands",
  },
  ar: {
    eyebrow: "علاماتنا",
    title: "الجمال، بالاسم.",
    intro:
      "اكتشفي كل علامات الجمال المتاحة في بيوريزا، من الأساسيات اليومية إلى طقوس العناية المختارة.",
    search: "ابحثي في كل العلامات",
    clear: "مسح بحث العلامات",
    directory: "دليل العلامات",
    count: (count: number) => `${count} علامة`,
    products: (count: number) => `${count} منتج`,
    noResults: "لا توجد علامات مطابقة لهذا البحث.",
    empty: "نعمل حالياً على تنسيق دليل العلامات. عودي قريباً.",
    error: "تعذر تحميل دليل العلامات حالياً. حاولي مرة أخرى بعد قليل.",
    loading: "جارٍ تحميل العلامات",
  },
} as const;

export function BrandsDirectoryPage({
  initialBrands,
  initialLoadFailed = false,
  locale,
}: {
  initialBrands?: PublicBrandListItemResponse[];
  initialLoadFailed?: boolean;
  locale: "ar" | "en";
}) {
  const copy = pageCopy[locale];
  const brandsQuery = useAllBrands(initialBrands);
  const [search, setSearch] = useState("");
  const brands = useMemo(
    () => sortBrands(brandsQuery.data ?? initialBrands ?? [], locale),
    [brandsQuery.data, initialBrands, locale],
  );
  const filtered = useMemo(() => filterBrands(brands, search, locale), [brands, locale, search]);
  const groups = useMemo(() => groupBrands(filtered, locale), [filtered, locale]);
  const allGroups = useMemo(() => groupBrands(brands, locale), [brands, locale]);
  const availableKeys = useMemo(() => new Set(allGroups.map((group) => group.key)), [allGroups]);
  const alphabet = useMemo(() => buildAlphabet(locale, availableKeys), [availableKeys, locale]);
  const failed = brands.length === 0 && (initialLoadFailed || brandsQuery.isError);

  const navigateToGroup = (key: string) => {
    setSearch("");
    window.requestAnimationFrame(() => {
      const target = document.getElementById(sectionId(key));
      if (!target) return;
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
      target.focus({ preventScroll: true });
    });
  };

  return (
    <div className="brands-page" dir={locale === "ar" ? "rtl" : "ltr"}>
      <header className="brands-page__hero">
        <div className="brands-page__hero-inner">
          <p className="brands-page__eyebrow">{copy.eyebrow}</p>
          <h1>{copy.title}</h1>
          <p className="brands-page__intro">{copy.intro}</p>
          {!failed && brands.length > 0 && (
            <span className="brands-page__count">{copy.count(brands.length)}</span>
          )}
        </div>
      </header>

      <section className="brands-page__directory" aria-labelledby="brands-directory-heading">
        <div className="brands-page__toolbar">
          <div>
            <p className="brands-page__eyebrow">A—Z</p>
            <h2 id="brands-directory-heading">{copy.directory}</h2>
          </div>

          <label className="brands-page__search" htmlFor="brands-page-search">
            <Search aria-hidden="true" strokeWidth={1.35} />
            <span className="sr-only">{copy.search}</span>
            <input
              id="brands-page-search"
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={copy.search}
              autoComplete="off"
            />
            {search && (
              <button type="button" onClick={() => setSearch("")} aria-label={copy.clear}>
                <X aria-hidden="true" />
              </button>
            )}
          </label>
        </div>

        {brands.length >= 15 && (
          <nav className="brands-page__alphabet" aria-label={copy.directory}>
            {alphabet.map((letter) => {
              const enabled = availableKeys.has(letter);
              return (
                <button
                  key={letter}
                  type="button"
                  disabled={!enabled}
                  aria-label={letter}
                  onClick={() => navigateToGroup(letter)}
                >
                  {letter}
                </button>
              );
            })}
          </nav>
        )}

        {brandsQuery.isLoading && brands.length === 0 ? (
          <div className="brands-page__loading" role="status" aria-label={copy.loading}>
            {Array.from({ length: 8 }, (_, index) => (
              <span key={index} />
            ))}
          </div>
        ) : failed ? (
          <DirectoryState message={copy.error} />
        ) : brands.length === 0 ? (
          <DirectoryState message={copy.empty} />
        ) : groups.length === 0 ? (
          <DirectoryState message={copy.noResults} />
        ) : (
          <div className="brands-page__groups" aria-live={search ? "polite" : undefined}>
            {groups.map((group) => (
              <section key={group.key} className="brands-page__group">
                <h3 id={sectionId(group.key)} tabIndex={-1}>
                  {group.key}
                </h3>
                <ul>
                  {group.brands.map((brand) => (
                    <li key={brand.id}>
                      <Link
                        to="/brands/$slug"
                        params={{ slug: brand.slug }}
                        aria-label={`${brand.name} — ${copy.products(brand.productCount)}`}
                      >
                        <span>{brand.name}</span>
                        <span className="brands-page__brand-meta" aria-hidden="true">
                          <small>{copy.products(brand.productCount)}</small>
                          <ArrowUpRight />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function DirectoryState({ message }: { message: string }) {
  return (
    <div className="brands-page__state" role="status">
      <span aria-hidden="true">B</span>
      <p>{message}</p>
    </div>
  );
}

function buildAlphabet(locale: "ar" | "en", available: Set<string>) {
  const primary = brandAlphabet(locale);
  const extras = Array.from(available)
    .filter((letter) => !primary.includes(letter))
    .sort((left, right) => compareBrandInitials(left, right, locale));
  return [...primary, ...extras];
}

function sectionId(key: string) {
  return `brand-group-${Array.from(key)
    .map((character) => character.codePointAt(0)?.toString(16))
    .join("-")}`;
}
