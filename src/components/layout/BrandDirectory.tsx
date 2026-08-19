import { memo, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Search, X } from "lucide-react";

import { filterBrands, groupBrands, sortBrands } from "@/components/layout/brand-directory-data";
import type { PublicBrandListItemResponse } from "@/lib/api";

export type BrandDirectoryCopy = {
  brandDirectory: string;
  viewAllBrands: string;
  searchBrands: string;
  clearSearch: string;
  noBrandMatches: string;
  brandsEmpty: string;
  brandsUnavailable: string;
  products: (count: number) => string;
};

type BrandDirectoryProps = {
  brands: PublicBrandListItemResponse[];
  loading: boolean;
  error?: boolean;
  locale: "ar" | "en";
  onNavigate: () => void;
  copy: BrandDirectoryCopy;
  surface: "mega" | "mobile";
};

const DESKTOP_SEARCH_MINIMUM = 25;
const MOBILE_SEARCH_THRESHOLD = 20;
const MOBILE_RESULT_LIMIT = 8;

export const BrandDirectory = memo(function BrandDirectory(props: BrandDirectoryProps) {
  return props.surface === "mobile" ? (
    <MobileBrandMenu {...props} />
  ) : (
    <DesktopBrandMenu {...props} />
  );
});

function DesktopBrandMenu({
  brands,
  loading,
  error,
  locale,
  onNavigate,
  copy,
}: BrandDirectoryProps) {
  const [search, setSearch] = useState("");
  const sorted = useMemo(() => sortBrands(brands, locale), [brands, locale]);
  const searchEnabled = sorted.length >= DESKTOP_SEARCH_MINIMUM;
  const showingSearch = searchEnabled && search.trim().length > 0;
  const visibleBrands = useMemo(
    () => (showingSearch ? filterBrands(sorted, search, locale) : sorted),
    [locale, search, showingSearch, sorted],
  );
  const groups = useMemo(() => groupBrands(visibleBrands, locale), [locale, visibleBrands]);
  const totalGroups = useMemo(() => groupBrands(sorted, locale).length, [locale, sorted]);
  const columns = Math.min(Math.max(totalGroups, 1), 4);

  return (
    <section
      className="brand-menu brand-menu--mega"
      data-size={sorted.length <= 8 ? "small" : sorted.length <= 25 ? "medium" : "large"}
      data-columns={columns}
      dir={locale === "ar" ? "rtl" : "ltr"}
      aria-labelledby="brand-menu-mega-heading"
    >
      <header className="brand-menu__header">
        <div>
          <span className="brand-menu__eyebrow" aria-hidden="true">
            BIOREZA
          </span>
          <h2 id="brand-menu-mega-heading">{copy.brandDirectory}</h2>
        </div>
        <AllBrandsLink copy={copy} onNavigate={onNavigate} />
      </header>

      {loading ? (
        <BrandMenuSkeleton count={6} />
      ) : error ? (
        <p className="brand-menu__state" role="status">
          {copy.brandsUnavailable}
        </p>
      ) : sorted.length === 0 ? (
        <p className="brand-menu__state" role="status">
          {copy.brandsEmpty}
        </p>
      ) : (
        <div className="brand-menu__content">
          {searchEnabled && (
            <BrandSearch
              value={search}
              onChange={setSearch}
              copy={copy}
              locale={locale}
              inputId="brand-menu-search"
            />
          )}

          {groups.length ? (
            <div className="brand-menu__alphabet-scroll">
              <div
                className="brand-menu__alphabet-grid"
                aria-live={showingSearch ? "polite" : undefined}
              >
                {groups.map((group, index) => {
                  const headingId = `brand-menu-group-${index}`;
                  return (
                    <section
                      key={group.key}
                      className="brand-menu__alphabet-group"
                      aria-labelledby={headingId}
                    >
                      <h3 id={headingId}>{group.key}</h3>
                      <ul>
                        {group.brands.map((brand) => (
                          <li key={brand.id}>
                            <AlphabetBrandLink brand={brand} copy={copy} onNavigate={onNavigate} />
                          </li>
                        ))}
                      </ul>
                    </section>
                  );
                })}
              </div>
            </div>
          ) : (
            <p className="brand-menu__no-results" role="status">
              {copy.noBrandMatches}
            </p>
          )}
        </div>
      )}
    </section>
  );
}

function MobileBrandMenu({
  brands,
  loading,
  error,
  locale,
  onNavigate,
  copy,
}: BrandDirectoryProps) {
  const [search, setSearch] = useState("");
  const sorted = useMemo(() => sortBrands(brands, locale), [brands, locale]);
  const searchEnabled = sorted.length > MOBILE_SEARCH_THRESHOLD;
  const matches = useMemo(
    () => filterBrands(sorted, search, locale).slice(0, MOBILE_RESULT_LIMIT),
    [locale, search, sorted],
  );
  const list = search.trim() ? matches : sorted.slice(0, MOBILE_RESULT_LIMIT);

  return (
    <section className="brand-menu brand-menu--mobile" dir={locale === "ar" ? "rtl" : "ltr"}>
      {searchEnabled && (
        <BrandSearch
          value={search}
          onChange={setSearch}
          copy={copy}
          locale={locale}
          inputId="mobile-brand-search"
        />
      )}

      {loading ? (
        <BrandMenuSkeleton count={5} />
      ) : error ? (
        <p className="brand-menu__state" role="status">
          {copy.brandsUnavailable}
        </p>
      ) : list.length ? (
        <ul className="brand-menu__mobile-list" aria-live={search.trim() ? "polite" : undefined}>
          {list.map((brand) => (
            <li key={brand.id}>
              <BrandLink brand={brand} copy={copy} onNavigate={onNavigate} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="brand-menu__state" role="status">
          {search.trim() ? copy.noBrandMatches : copy.brandsEmpty}
        </p>
      )}

      <AllBrandsLink copy={copy} onNavigate={onNavigate} mobile />
    </section>
  );
}

function BrandSearch({
  value,
  onChange,
  copy,
  locale,
  inputId,
}: {
  value: string;
  onChange: (value: string) => void;
  copy: BrandDirectoryCopy;
  locale: "ar" | "en";
  inputId: string;
}) {
  return (
    <label className="brand-menu__search" htmlFor={inputId}>
      <Search aria-hidden="true" strokeWidth={1.35} />
      <span className="sr-only">{copy.searchBrands}</span>
      <input
        id={inputId}
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={copy.searchBrands}
        autoComplete="off"
        dir={locale === "ar" ? "rtl" : "ltr"}
      />
      {value && (
        <button type="button" onClick={() => onChange("")} aria-label={copy.clearSearch}>
          <X aria-hidden="true" />
        </button>
      )}
    </label>
  );
}

function BrandLink({
  brand,
  copy,
  onNavigate,
}: {
  brand: PublicBrandListItemResponse;
  copy: BrandDirectoryCopy;
  onNavigate: () => void;
}) {
  return (
    <Link
      to="/brands/$slug"
      params={{ slug: brand.slug }}
      onClick={onNavigate}
      className="brand-menu__brand-link"
      aria-label={`${brand.name} — ${copy.products(brand.productCount)}`}
    >
      <span className="brand-menu__brand-name">{brand.name}</span>
      <span className="brand-menu__product-count" aria-hidden="true">
        {brand.productCount}
      </span>
    </Link>
  );
}

function AlphabetBrandLink({
  brand,
  copy,
  onNavigate,
}: {
  brand: PublicBrandListItemResponse;
  copy: BrandDirectoryCopy;
  onNavigate: () => void;
}) {
  return (
    <Link
      to="/brands/$slug"
      params={{ slug: brand.slug }}
      onClick={onNavigate}
      className="brand-menu__alphabet-link"
      aria-label={`${brand.name} — ${copy.products(brand.productCount)}`}
    >
      {brand.name}
    </Link>
  );
}

function AllBrandsLink({
  copy,
  onNavigate,
  mobile = false,
}: {
  copy: BrandDirectoryCopy;
  onNavigate: () => void;
  mobile?: boolean;
}) {
  return (
    <Link
      to="/brands"
      onClick={onNavigate}
      className={mobile ? "brand-menu__all brand-menu__all--mobile" : "brand-menu__all"}
    >
      {copy.viewAllBrands}
      <ArrowRight aria-hidden="true" />
    </Link>
  );
}

function BrandMenuSkeleton({ count }: { count: number }) {
  return (
    <div className="brand-menu__skeleton" aria-hidden="true">
      {Array.from({ length: count }, (_, index) => (
        <span key={index} />
      ))}
    </div>
  );
}
