import { Check, Grid2X2, List, SlidersHorizontal, X } from "lucide-react";
import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";

import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import type { CatalogFacetResponse } from "@/lib/api";
import { localizeTagName } from "@/lib/catalog";
import { flattenCategoryHierarchyWithDepth } from "@/lib/category-hierarchy";
import {
  selectedTagSlugs,
  type CatalogListingSearch,
  withResetPage,
} from "@/components/shop/catalog-listing-state";

type ListingOption = {
  id: string;
  parentId?: string | null;
  slug: string;
  label: string;
  count: number;
};

type Props = {
  locale: "ar" | "en";
  search: CatalogListingSearch;
  resultCount: number;
  facets?: CatalogFacetResponse;
  categories?: ListingOption[];
  brands?: ListingOption[];
  hideCategory?: boolean;
  hideBrand?: boolean;
  onChange: (search: CatalogListingSearch) => void;
};

export function CatalogListingControls({
  locale,
  search,
  resultCount,
  facets,
  categories = [],
  brands = [],
  hideCategory = false,
  hideBrand = false,
  onChange,
}: Props) {
  const copy = listingCopy[locale];
  const [hydrated, setHydrated] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [minimum, setMinimum] = useState(search.minPrice?.toString() ?? "");
  const [maximum, setMaximum] = useState(search.maxPrice?.toString() ?? "");
  const [brandSearch, setBrandSearch] = useState("");
  const selectedTags = selectedTagSlugs(search);
  const selectedBrands = useMemo(
    () => search.brand?.split(",").filter(Boolean) ?? [],
    [search.brand],
  );
  const brandOptions = (
    facets?.brands?.length
      ? facets.brands.map((brand) => ({
          id: brand.id,
          slug: brand.slug,
          label: brand.name,
          count: brand.count,
        }))
      : brands
  ).filter((brand) =>
    brand.label.toLocaleLowerCase().includes(brandSearch.trim().toLocaleLowerCase()),
  );
  const categoryOptions = flattenCategoryHierarchyWithDepth(
    categories.length
      ? categories
      : (facets?.categories ?? []).map((category) => ({
          id: category.id,
          parentId: category.parentId,
          slug: category.slug,
          label: locale === "ar" ? category.nameAr : category.nameEn,
          count: category.count,
        })),
  );

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    setMinimum(search.minPrice?.toString() ?? "");
    setMaximum(search.maxPrice?.toString() ?? "");
  }, [search.maxPrice, search.minPrice]);

  const activeFilters = useMemo(() => {
    const filters: Array<{ key: string; label: string; remove: () => void }> = [];
    if (search.stock === "in-stock") {
      filters.push({
        key: "stock",
        label: copy.inStock,
        remove: () => onChange(withResetPage(search, { stock: undefined })),
      });
    }
    if (search.concern) {
      filters.push({
        key: "concern",
        label: search.concern,
        remove: () => onChange(withResetPage(search, { concern: undefined })),
      });
    }
    for (const slug of selectedTags) {
      const tag = facets?.tags.find((item) => item.slug === slug);
      filters.push({
        key: `tag-${slug}`,
        label: tag ? localizeTagName(tag, locale) : slug,
        remove: () =>
          onChange(
            withResetPage(search, {
              tags: selectedTags.filter((item) => item !== slug).join(",") || undefined,
            }),
          ),
      });
    }
    if (!hideCategory && search.category) {
      const category = categoryOptions.find((item) => item.category.slug === search.category);
      filters.push({
        key: "category",
        label: category?.category.label ?? search.category,
        remove: () => onChange(withResetPage(search, { category: undefined })),
      });
    }
    if (!hideBrand) {
      for (const slug of selectedBrands) {
        const brand = (facets?.brands ?? []).find((item) => item.slug === slug);
        filters.push({
          key: `brand-${slug}`,
          label: brand?.name ?? brands.find((item) => item.slug === slug)?.label ?? slug,
          remove: () =>
            onChange(
              withResetPage(search, {
                brand: selectedBrands.filter((item) => item !== slug).join(",") || undefined,
              }),
            ),
        });
      }
    }
    if (search.minPrice !== undefined || search.maxPrice !== undefined) {
      filters.push({
        key: "price",
        label: priceLabel(search.minPrice, search.maxPrice, locale),
        remove: () => onChange(withResetPage(search, { minPrice: undefined, maxPrice: undefined })),
      });
    }
    return filters;
  }, [
    brands,
    facets?.brands,
    categoryOptions,
    copy.inStock,
    facets?.tags,
    hideBrand,
    hideCategory,
    locale,
    onChange,
    search,
    selectedTags,
    selectedBrands,
  ]);

  const clearAll = () =>
    onChange({
      ...(search.search ? { search: search.search } : {}),
      ...(search.sort ? { sort: search.sort } : {}),
      ...(search.view ? { view: search.view } : {}),
    });

  const toggleTag = (slug: string) => {
    const next = selectedTags.includes(slug)
      ? selectedTags.filter((item) => item !== slug)
      : [...selectedTags, slug];
    onChange(withResetPage(search, { tags: next.join(",") || undefined }));
  };

  const toggleBrand = (slug: string) => {
    const next = selectedBrands.includes(slug)
      ? selectedBrands.filter((item) => item !== slug)
      : [...selectedBrands, slug];
    onChange(withResetPage(search, { brand: next.join(",") || undefined }));
  };

  const applyPrice = (event: FormEvent) => {
    event.preventDefault();
    const min = optionalPrice(minimum);
    const max = optionalPrice(maximum);
    if (min !== undefined && max !== undefined && min > max) return;
    onChange(withResetPage(search, { minPrice: min, maxPrice: max }));
  };

  return (
    <>
      <div className="catalog-listing-toolbar">
        <div className="catalog-listing-toolbar__count" aria-live="polite">
          <strong>{resultCount}</strong> {copy.products}
        </div>
        <div className="catalog-listing-toolbar__actions">
          <button
            type="button"
            disabled={!hydrated}
            className="sf-shop-filter-button"
            onClick={() => setFiltersOpen(true)}
          >
            <SlidersHorizontal aria-hidden="true" />
            {copy.filters}
            {activeFilters.length ? <span>{activeFilters.length}</span> : null}
          </button>
          <label className="catalog-listing-toolbar__sort">
            <span className="catalog-listing-toolbar__sort-prefix" aria-hidden="true">
              {copy.sortPrefix}
            </span>
            <select
              aria-label={copy.sort}
              disabled={!hydrated}
              value={search.sort ?? "newest"}
              onChange={(event) =>
                onChange(
                  withResetPage(search, {
                    sort: event.target.value as CatalogListingSearch["sort"],
                  }),
                )
              }
            >
              <option value="newest">{copy.newest}</option>
              <option value="price-asc">{copy.priceLow}</option>
              <option value="price-desc">{copy.priceHigh}</option>
            </select>
          </label>
          <div className="catalog-listing-toolbar__views" role="group" aria-label={copy.view}>
            <button
              type="button"
              disabled={!hydrated}
              aria-label={copy.grid}
              aria-pressed={(search.view ?? "grid") === "grid"}
              onClick={() => onChange({ ...search, view: "grid" })}
            >
              <Grid2X2 aria-hidden="true" />
            </button>
            <button
              type="button"
              disabled={!hydrated}
              aria-label={copy.list}
              aria-pressed={search.view === "list"}
              onClick={() => onChange({ ...search, view: "list" })}
            >
              <List aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {activeFilters.length ? (
        <div className="sf-shop-active-filters" aria-label={copy.activeFilters}>
          {activeFilters.map((filter) => (
            <button key={filter.key} type="button" disabled={!hydrated} onClick={filter.remove}>
              {filter.label}
              <X aria-hidden="true" />
            </button>
          ))}
          <button type="button" disabled={!hydrated} onClick={clearAll}>
            {copy.clearAll}
          </button>
        </div>
      ) : null}

      <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
        <SheetContent
          side={locale === "ar" ? "left" : "right"}
          showCloseButton={false}
          className="sf-shop-filter-drawer"
        >
          <div className="sf-shop-filter-panel__header">
            <div>
              <p className="sf-shop-filter-panel__eyebrow">{copy.refine}</p>
              <SheetTitle className="sf-shop-filter-panel__title">{copy.filters}</SheetTitle>
            </div>
            <button
              type="button"
              onClick={() => setFiltersOpen(false)}
              aria-label={copy.close}
              className="sf-shop-filter-panel__close"
            >
              <X aria-hidden="true" />
            </button>
          </div>
          <div className="sf-shop-filter-panel__body">
            <FilterGroup label={copy.availability}>
              <button
                type="button"
                className="sf-shop-filter-panel__option"
                data-active={search.stock === "in-stock" || undefined}
                onClick={() =>
                  onChange(
                    withResetPage(search, {
                      stock: search.stock === "in-stock" ? undefined : "in-stock",
                    }),
                  )
                }
              >
                <span>{copy.inStock}</span>
                {search.stock === "in-stock" ? <Check aria-hidden="true" /> : null}
              </button>
            </FilterGroup>

            {!hideCategory && categoryOptions.length ? (
              <FilterGroup label={copy.category}>
                {categoryOptions.map(({ category, depth }) => (
                  <button
                    key={category.id}
                    type="button"
                    className="sf-shop-filter-panel__option"
                    data-depth={categoryDepthName(depth)}
                    data-active={search.category === category.slug || undefined}
                    onClick={() =>
                      onChange(
                        withResetPage(search, {
                          category: search.category === category.slug ? undefined : category.slug,
                        }),
                      )
                    }
                  >
                    <span>{category.label}</span>
                    <span className="sf-shop-filter-panel__meta">{category.count}</span>
                  </button>
                ))}
              </FilterGroup>
            ) : null}

            {!hideBrand && (facets?.brands.length || brands.length) ? (
              <FilterGroup label={copy.brands}>
                <label className="sf-shop-filter-panel__search">
                  <span className="sr-only">{copy.searchBrands}</span>
                  <input
                    type="search"
                    value={brandSearch}
                    placeholder={copy.searchBrands}
                    onChange={(event) => setBrandSearch(event.target.value)}
                  />
                </label>
                {brandOptions.map((brand) => {
                  const active = selectedBrands.includes(brand.slug);
                  return (
                    <button
                      key={brand.id}
                      type="button"
                      className="sf-shop-filter-panel__option"
                      data-active={active || undefined}
                      aria-pressed={active}
                      onClick={() => toggleBrand(brand.slug)}
                    >
                      <span>{brand.label}</span>
                      <span className="sf-shop-filter-panel__meta">
                        {brand.count}
                        {active ? <Check aria-hidden="true" /> : null}
                      </span>
                    </button>
                  );
                })}
              </FilterGroup>
            ) : null}

            {facets?.tags.length ? (
              <FilterGroup label={copy.tags}>
                {facets.tags.map((tag) => {
                  const active = selectedTags.includes(tag.slug);
                  return (
                    <button
                      key={tag.id}
                      type="button"
                      className="sf-shop-filter-panel__option"
                      data-active={active || undefined}
                      onClick={() => toggleTag(tag.slug)}
                    >
                      <span>{localizeTagName(tag, locale)}</span>
                      <span className="sf-shop-filter-panel__meta">
                        {tag.count}
                        {active ? <Check aria-hidden="true" /> : null}
                      </span>
                    </button>
                  );
                })}
              </FilterGroup>
            ) : null}

            <FilterGroup label={copy.priceRange}>
              <form className="catalog-price-filter" onSubmit={applyPrice}>
                <label>
                  <span>{copy.minimum}</span>
                  <input
                    type="number"
                    inputMode="decimal"
                    min="0"
                    step="1"
                    value={minimum}
                    placeholder={
                      facets?.price.min === null || facets?.price.min === undefined
                        ? "0"
                        : String(Math.floor(facets.price.min / 100))
                    }
                    onChange={(event) => setMinimum(event.target.value)}
                  />
                </label>
                <label>
                  <span>{copy.maximum}</span>
                  <input
                    type="number"
                    inputMode="decimal"
                    min="0"
                    step="1"
                    value={maximum}
                    placeholder={
                      facets?.price.max === null || facets?.price.max === undefined
                        ? ""
                        : String(Math.ceil(facets.price.max / 100))
                    }
                    onChange={(event) => setMaximum(event.target.value)}
                  />
                </label>
                <button type="submit" disabled={invalidPriceRange(minimum, maximum)}>
                  {copy.applyPrice}
                </button>
              </form>
            </FilterGroup>
          </div>
          <div className="sf-shop-filter-panel__footer">
            <button type="button" onClick={clearAll} className="sf-shop-filter-panel__clear">
              {copy.clearAll}
            </button>
            <button
              type="button"
              onClick={() => setFiltersOpen(false)}
              className="sf-shop-filter-panel__apply"
            >
              {copy.showResults(resultCount)}
            </button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

function categoryDepthName(depth: number): string {
  return ["root", "child", "grandchild"][depth] ?? `level-${depth + 1}`;
}

function FilterGroup({ label, children }: { label: string; children: ReactNode }) {
  return (
    <section className="sf-shop-filter-panel__group">
      <h3 className="sf-shop-filter-panel__eyebrow">{label}</h3>
      <div className="sf-shop-filter-panel__list">{children}</div>
    </section>
  );
}

const listingCopy = {
  en: {
    products: "products",
    filters: "Filters",
    sort: "Sort products",
    sortPrefix: "Sort:",
    newest: "Newest",
    priceLow: "Price: low to high",
    priceHigh: "Price: high to low",
    view: "Product view",
    grid: "Grid view",
    list: "List view",
    activeFilters: "Active filters",
    clearAll: "Clear all",
    refine: "Refine results",
    close: "Close filters",
    availability: "Availability",
    inStock: "In stock",
    category: "Category",
    brand: "Brand",
    brands: "Brands",
    searchBrands: "Search brands…",
    tags: "Tags",
    priceRange: "Price range (EGP)",
    minimum: "Minimum",
    maximum: "Maximum",
    applyPrice: "Apply price",
    showResults: (count: number) => `Show ${count} results`,
  },
  ar: {
    products: "منتج",
    filters: "التصفية",
    sort: "ترتيب المنتجات",
    sortPrefix: "الترتيب:",
    newest: "الأحدث",
    priceLow: "السعر: من الأقل إلى الأعلى",
    priceHigh: "السعر: من الأعلى إلى الأقل",
    view: "طريقة عرض المنتجات",
    grid: "عرض شبكي",
    list: "عرض قائمة",
    activeFilters: "الفلاتر النشطة",
    clearAll: "مسح الكل",
    refine: "تخصيص النتائج",
    close: "إغلاق الفلاتر",
    availability: "التوفر",
    inStock: "متوفر في المخزون",
    category: "الفئة",
    brand: "العلامة التجارية",
    brands: "العلامات التجارية",
    searchBrands: "ابحثي عن علامة…",
    tags: "الوسوم",
    priceRange: "نطاق السعر (جنيه)",
    minimum: "الحد الأدنى",
    maximum: "الحد الأقصى",
    applyPrice: "تطبيق السعر",
    showResults: (count: number) => `عرض ${count} نتيجة`,
  },
} as const;

function optionalPrice(value: string) {
  if (!value.trim()) return undefined;
  const number = Number(value);
  return Number.isFinite(number) && number >= 0 ? number : undefined;
}

function invalidPriceRange(minimum: string, maximum: string) {
  const min = optionalPrice(minimum);
  const max = optionalPrice(maximum);
  return min !== undefined && max !== undefined && min > max;
}

function priceLabel(minimum: number | undefined, maximum: number | undefined, locale: "ar" | "en") {
  if (minimum !== undefined && maximum !== undefined) {
    return locale === "ar" ? `${minimum}–${maximum} جنيه` : `EGP ${minimum}–${maximum}`;
  }
  if (minimum !== undefined) return locale === "ar" ? `من ${minimum} جنيه` : `From EGP ${minimum}`;
  return locale === "ar" ? `حتى ${maximum} جنيه` : `Up to EGP ${maximum}`;
}
