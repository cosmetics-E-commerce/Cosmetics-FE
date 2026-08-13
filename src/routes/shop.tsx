import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Check, Grid2X2, Grid3X3, List, SlidersHorizontal, X } from "lucide-react";
import { ProductCard } from "@/components/shop/ProductCard";
import { Reveal } from "@/components/brand/Reveal";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import {
  loadBrands,
  loadCatalogPage,
  loadCategories,
  useBrands,
  useCatalogPage,
  useCategories,
} from "@/lib/catalog";
import { useStore } from "@/lib/store";
import { useI18n } from "@/lib/i18n";
import {
  breadcrumbSchema,
  createSeoHead,
  itemListSchema,
  jsonLd,
  localizePath,
  type SeoLocale,
} from "@/lib/seo";

type Search = {
  brand?: string | undefined;
  category?: string | undefined;
  concern?: string | undefined;
  sort?: string | undefined;
  search?: string | undefined;
  view?: "compact" | "grid" | "list" | undefined;
  page?: number | undefined;
};

const PAGE_SIZE = 24;

export const Route = createFileRoute("/shop")({
  validateSearch: (raw: Record<string, unknown>): Search => ({
    ...(typeof raw["brand"] === "string" ? { brand: raw["brand"] } : {}),
    ...(typeof raw["category"] === "string" ? { category: raw["category"] } : {}),
    ...(typeof raw["concern"] === "string" ? { concern: raw["concern"] } : {}),
    ...(typeof raw["sort"] === "string" ? { sort: raw["sort"] } : {}),
    ...(typeof raw["search"] === "string" ? { search: raw["search"] } : {}),
    ...(raw["view"] === "compact" || raw["view"] === "grid" || raw["view"] === "list"
      ? { view: raw["view"] }
      : {}),
    ...(toPage(raw["page"]) ? { page: toPage(raw["page"]) } : {}),
  }),
  loaderDeps: ({ search }) => ({
    brand: search.brand,
    category: search.category,
    concern: search.concern,
    sort: search.sort,
    search: search.search,
    view: search.view,
    page: search.page,
  }),
  loader: async ({ deps, context }) => {
    const locale: SeoLocale = context.locale === "ar" ? "ar" : "en";
    const page = deps.page ?? 1;
    const [catalog, categories, brands] = await Promise.all([
      loadCatalogPage(catalogParams(deps, page), locale),
      loadCategories(),
      loadBrands(),
    ]);
    if (catalog.meta.total > 0 && page > catalog.meta.totalPages) throw notFound();
    return { catalog, categories, brands, locale };
  },
  head: ({ loaderData, match }) => {
    const locale = loaderData?.locale ?? "en";
    const search = match.search;
    const page = search.page ?? 1;
    const filtered = Boolean(
      search.brand ||
      search.category ||
      search.concern ||
      search.search ||
      search.sort ||
      search.view,
    );
    const category = loaderData?.categories.find((item) => item.slug === search.category);
    const brand = loaderData?.brands.find((item) => item.slug === search.brand);
    const canonicalPath =
      category && !search.brand && !search.concern && !search.search
        ? `/categories/${encodeURIComponent(category.slug)}`
        : brand && !search.category && !search.concern && !search.search
          ? `/brands/${encodeURIComponent(brand.slug)}`
          : "/shop";
    const title = search.search
      ? locale === "ar"
        ? `نتائج البحث عن ${search.search}`
        : `Search results for ${search.search}`
      : page > 1
        ? locale === "ar"
          ? `المتجر - الصفحة ${page}`
          : `Shop Products - Page ${page}`
        : locale === "ar"
          ? "تسوّقي منتجات العناية والجمال"
          : "Shop Skincare, Makeup, Haircare & Fragrance";
    const seo = createSeoHead({
      title,
      description:
        locale === "ar"
          ? "تصفّحي منتجات العناية بالبشرة والمكياج والشعر والعطور المتاحة من بيوريزا."
          : "Browse BIOREZA skincare, makeup, haircare and fragrance products with current prices and availability.",
      path: canonicalPath,
      locale,
      page: filtered ? undefined : page,
      index: !filtered && Boolean(loaderData?.catalog.items.length),
      follow: true,
      alternates: !filtered,
      prevPath: !filtered && page > 1 ? localizePath("/shop", locale, page - 1) : undefined,
      nextPath:
        !filtered && loaderData?.catalog.meta.hasNext
          ? localizePath("/shop", locale, page + 1)
          : undefined,
    });
    return {
      ...seo,
      scripts:
        !filtered && loaderData
          ? [
              jsonLd(
                breadcrumbSchema(
                  [
                    { name: locale === "ar" ? "الرئيسية" : "Home", path: "/" },
                    { name: locale === "ar" ? "المتجر" : "Shop", path: "/shop" },
                  ],
                  locale,
                ),
              ),
              jsonLd(
                itemListSchema(
                  title,
                  loaderData.catalog.items,
                  locale,
                  (page - 1) * loaderData.catalog.meta.limit,
                ),
              ),
            ]
          : [],
    };
  },
  component: Shop,
});

function Shop() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const { locale } = useStore();
  const { t } = useI18n();
  const [filters, setFilters] = useState(false);
  const view = search.view ?? "compact";
  const page = search.page ?? 1;
  const initial = Route.useLoaderData();
  const catalog = useCatalogPage(catalogParams(search, page), locale, initial.catalog);
  const categories = useCategories(initial.categories);
  const brands = useBrands(initial.brands);
  const activeFilters = [
    search.brand ? { key: "brand" as const, label: search.brand } : null,
    search.category ? { key: "category" as const, label: search.category } : null,
    search.concern ? { key: "concern" as const, label: search.concern } : null,
    search.search
      ? {
          key: "search" as const,
          label: `${locale === "ar" ? "بحث" : "Search"}: ${search.search}`,
        }
      : null,
  ].filter(Boolean) as Array<{
    key: "brand" | "category" | "concern" | "search";
    label: string;
  }>;
  const clearFilters = () =>
    navigate({
      search: {
        ...(search.sort ? { sort: search.sort } : {}),
        ...(search.view ? { view: search.view } : {}),
      },
    });
  const categoryTabs = [
    { id: "all", slug: undefined, label: t("shop.all"), count: undefined },
    ...(categories.data ?? [])
      .filter((category) => category.productCount > 0)
      .map((category) => ({
        id: category.id,
        slug: category.slug,
        label: locale === "ar" ? category.nameAr : category.nameEn,
        count: category.productCount,
      })),
  ];
  const products = catalog.data?.items ?? [];
  const meta = catalog.data?.meta;
  const productCount = meta?.total ?? products.length;
  const pageStart = meta && meta.total > 0 ? (meta.page - 1) * meta.limit + 1 : 0;
  const pageEnd = meta ? Math.min(meta.page * meta.limit, meta.total) : products.length;
  const resetPageSearch = (next: Search): Search => ({
    ...next,
    page: undefined,
  });
  const shopHeadline =
    locale === "ar"
      ? "تسوّقي العناية بالبشرة والمكياج والشعر والعطور"
      : "Shop Skincare, Makeup, Haircare & Fragrance";
  const FilterList = (
    <div className="sf-shop-filter-panel__group">
      <p className="sf-shop-filter-panel__eyebrow">{t("shop.category")}</p>
      <ul className="sf-shop-filter-panel__list">
        <li>
          <button
            type="button"
            onClick={() => {
              navigate({ search: resetPageSearch({ ...search, category: undefined }) });
              setFilters(false);
            }}
            className="sf-shop-filter-panel__option"
            data-active={!search.category || undefined}
          >
            <span>{t("shop.all")}</span>
            {!search.category && <Check className="size-4" aria-hidden="true" />}
          </button>
        </li>
        {categories.data?.map((category) => (
          <li key={category.id}>
            <Link
              to="/categories/$slug"
              params={{ slug: category.slug }}
              onClick={() => setFilters(false)}
              className="sf-shop-filter-panel__option"
            >
              <span>{locale === "ar" ? category.nameAr : category.nameEn}</span>
              <span className="sf-shop-filter-panel__meta">{category.productCount}</span>
            </Link>
          </li>
        ))}
      </ul>
      {brands.data && brands.data.length > 0 && (
        <div className="sf-shop-filter-panel__group sf-shop-filter-panel__group--divided">
          <p className="sf-shop-filter-panel__eyebrow">
            {locale === "ar" ? "العلامة التجارية" : "Brand"}
          </p>
          <ul className="sf-shop-filter-panel__list">
            {brands.data
              .filter((brand) => brand.productCount > 0)
              .map((brand) => (
                <li key={brand.id}>
                  <Link
                    to="/brands/$slug"
                    params={{ slug: brand.slug }}
                    onClick={() => setFilters(false)}
                    className="sf-shop-filter-panel__option"
                  >
                    <span>{brand.name}</span>
                    <span className="sf-shop-filter-panel__meta">{brand.productCount}</span>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
  return (
    <div className="sf-shop-page sf-shop-page--minimal">
      <nav aria-label="Breadcrumb" className="sf-shop-breadcrumb">
        <Link to="/">{t("common.home")}</Link>
        <span aria-hidden="true">/</span>
        <span>{t("common.shop")}</span>
      </nav>
      <Reveal className="sf-shop-hero">
        <h1>{shopHeadline}</h1>
      </Reveal>
      <section className="sf-shop-catalog" aria-labelledby="shop-products-title">
        <div className="sf-shop-filterbar">
          <div className="sf-shop-tabs" role="tablist" aria-label={t("shop.category")}>
            {categoryTabs.map((category) => {
              const selected =
                search.category === category.slug || (!search.category && !category.slug);

              return (
                <button
                  key={category.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  className="sf-shop-tab"
                  onClick={() =>
                    navigate({ search: resetPageSearch({ ...search, category: category.slug }) })
                  }
                >
                  {category.label}
                  {category.count ? <span>({category.count})</span> : null}
                </button>
              );
            })}
          </div>
          <button type="button" onClick={() => setFilters(true)} className="sf-shop-filter-button">
            <SlidersHorizontal className="size-4" aria-hidden="true" />
            {t("shop.filters")}
            {activeFilters.length > 0 && <span>{activeFilters.length}</span>}
          </button>
        </div>
        <div className="sf-shop-meta">
          <h2 id="shop-products-title">
            {productCount} {t("common.products")}
          </h2>
          {meta && meta.total > 0 && (
            <p className="sf-shop-page-count">
              {locale === "ar"
                ? `عرض ${pageStart}-${pageEnd} من ${meta.total}`
                : `Showing ${pageStart}-${pageEnd} of ${meta.total}`}
            </p>
          )}
          <select
            aria-label={locale === "ar" ? "ترتيب المنتجات" : "Sort products"}
            value={search.sort ?? ""}
            onChange={(event) =>
              navigate({
                search: resetPageSearch({ ...search, sort: event.target.value || undefined }),
              })
            }
            className="sf-shop-sort"
          >
            <option value="">{t("shop.sortNewest")}</option>
            <option value="price-asc">{t("shop.sortLow")}</option>
            <option value="price-desc">{t("shop.sortHigh")}</option>
          </select>
        </div>
        {activeFilters.length > 0 && (
          <div className="sf-shop-active-filters" aria-label="Active filters">
            {activeFilters.map((filter) => (
              <button
                key={filter.key}
                type="button"
                onClick={() =>
                  navigate({ search: resetPageSearch({ ...search, [filter.key]: undefined }) })
                }
                aria-label={`Remove ${filter.label} filter`}
              >
                {filter.label}
                <X className="size-3" aria-hidden="true" />
              </button>
            ))}
            <button type="button" onClick={clearFilters}>
              {t("common.clearAll")}
            </button>
          </div>
        )}
        {catalog.isLoading && <ProductGridSkeleton view={view} />}
        {catalog.error && (
          <State
            title={t("shop.errorTitle")}
            copy={t("shop.errorCopy")}
            action={() => void catalog.refetch()}
            actionLabel={t("common.tryAgain")}
          />
        )}
        {!catalog.isLoading && !catalog.error && products.length === 0 && (
          <State
            title={t("shop.emptyTitle")}
            copy={t("shop.emptyCopy")}
            action={clearFilters}
            actionLabel={t("shop.clearFilters")}
          />
        )}
        {catalog.data && (
          <>
            <div
              className={`sf-shop-products ${
                view === "list"
                  ? "sf-shop-products--list"
                  : view === "grid"
                    ? "sf-shop-products--grid"
                    : "sf-shop-products--compact"
              }`}
            >
              {products.map((product, index) => (
                <Reveal key={product.slug} delay={(index % 4) * 35}>
                  <ProductCard
                    product={product}
                    compact={view === "compact"}
                    layout={view === "list" ? "list" : "grid"}
                  />
                </Reveal>
              ))}
            </div>
            {meta && meta.totalPages > 1 && (
              <ShopPagination
                page={meta.page}
                totalPages={meta.totalPages}
                onPageChange={(nextPage) =>
                  navigate({ search: { ...search, page: nextPage > 1 ? nextPage : undefined } })
                }
                locale={locale}
                search={search}
                crawlable={
                  !search.brand &&
                  !search.category &&
                  !search.concern &&
                  !search.search &&
                  !search.sort &&
                  !search.view
                }
              />
            )}
          </>
        )}
      </section>
      <Sheet open={filters} onOpenChange={setFilters}>
        <SheetContent side="right" showCloseButton={false} className="sf-shop-filter-drawer">
          <div className="sf-shop-filter-panel__header">
            <div>
              <p className="sf-shop-filter-panel__eyebrow">
                {locale === "ar" ? "تخصيص النتائج" : "Refine results"}
              </p>
              <SheetTitle className="sf-shop-filter-panel__title">{t("shop.filters")}</SheetTitle>
            </div>
            <button
              type="button"
              onClick={() => setFilters(false)}
              aria-label={locale === "ar" ? "إغلاق الفلاتر" : "Close filters"}
              className="sf-shop-filter-panel__close"
            >
              <X aria-hidden="true" />
            </button>
          </div>
          <div className="sf-shop-filter-panel__body">
            {FilterList}
            <div className="sf-shop-filter-panel__group sf-shop-filter-panel__group--divided">
              <p className="sf-shop-filter-panel__eyebrow">
                {locale === "ar" ? "العرض والترتيب" : "View and sort"}
              </p>
              <select
                aria-label={locale === "ar" ? "ترتيب المنتجات" : "Sort products"}
                value={search.sort ?? ""}
                onChange={(event) =>
                  navigate({
                    search: resetPageSearch({ ...search, sort: event.target.value || undefined }),
                  })
                }
                className="sf-shop-filter-panel__select"
              >
                <option value="">{t("shop.sortNewest")}</option>
                <option value="price-asc">{t("shop.sortLow")}</option>
                <option value="price-desc">{t("shop.sortHigh")}</option>
              </select>
              <div
                role="group"
                aria-label="Product view"
                className="sf-shop-filter-panel__view-toggle"
              >
                {[
                  { value: "compact" as const, label: "Compact grid", Icon: Grid3X3 },
                  { value: "grid" as const, label: "Grid view", Icon: Grid2X2 },
                  { value: "list" as const, label: "List view", Icon: List },
                ].map(({ value, label, Icon }) => (
                  <button
                    key={value}
                    type="button"
                    aria-label={label}
                    aria-pressed={view === value}
                    title={label}
                    onClick={() => navigate({ search: { ...search, view: value } })}
                    className="sf-shop-filter-panel__view-button"
                    data-active={view === value || undefined}
                  >
                    <Icon className="size-4" strokeWidth={1.25} />
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="sf-shop-filter-panel__footer">
            <button type="button" onClick={clearFilters} className="sf-shop-filter-panel__clear">
              {t("common.clearAll")}
            </button>
            <button
              type="button"
              onClick={() => setFilters(false)}
              className="sf-shop-filter-panel__apply"
            >
              {locale === "ar" ? "عرض النتائج" : "Show results"}
            </button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

function toPage(value: unknown) {
  const page = typeof value === "string" ? Number.parseInt(value, 10) : Number(value);
  return Number.isFinite(page) && page > 1 ? page : undefined;
}

function catalogParams(search: Search, page: number) {
  const sort =
    search.sort === "price-asc"
      ? { sortBy: "basePrice", sortOrder: "asc" }
      : search.sort === "price-desc"
        ? { sortBy: "basePrice", sortOrder: "desc" }
        : { sortBy: "createdAt", sortOrder: "desc" };
  return {
    page,
    limit: PAGE_SIZE,
    brandSlug: search.brand?.toLowerCase(),
    categorySlug: search.category?.toLowerCase(),
    search: search.search ?? search.concern,
    ...sort,
  };
}

function visiblePages(page: number, totalPages: number) {
  const pages = new Set(
    [1, totalPages, page - 1, page, page + 1].filter((p) => p >= 1 && p <= totalPages),
  );
  return [...pages].sort((a, b) => a - b);
}

function ShopPagination({
  page,
  totalPages,
  onPageChange,
  locale,
  search,
  crawlable,
}: {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  locale: "ar" | "en";
  search: Search;
  crawlable: boolean;
}) {
  const pages = visiblePages(page, totalPages);
  let previous = 0;

  return (
    <nav
      className="sf-shop-pagination"
      aria-label={locale === "ar" ? "صفحات المنتجات" : "Product pages"}
    >
      {crawlable && page > 1 ? (
        <Link to="/shop" search={{ ...search, page: page > 2 ? page - 1 : undefined }}>
          {locale === "ar" ? "السابق" : "Previous"}
        </Link>
      ) : (
        <button type="button" onClick={() => onPageChange(page - 1)} disabled={page <= 1}>
          {locale === "ar" ? "السابق" : "Previous"}
        </button>
      )}
      <ol>
        {pages.map((item) => {
          const gap = item - previous > 1;
          previous = item;
          return (
            <li key={item}>
              {gap && <span className="sf-shop-pagination__ellipsis">...</span>}
              {crawlable ? (
                <Link
                  to="/shop"
                  search={{ ...search, page: item > 1 ? item : undefined }}
                  aria-current={item === page ? "page" : undefined}
                >
                  {item}
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => onPageChange(item)}
                  aria-current={item === page ? "page" : undefined}
                >
                  {item}
                </button>
              )}
            </li>
          );
        })}
      </ol>
      {crawlable && page < totalPages ? (
        <Link to="/shop" search={{ ...search, page: page + 1 }}>
          {locale === "ar" ? "التالي" : "Next"}
        </Link>
      ) : (
        <button type="button" onClick={() => onPageChange(page + 1)} disabled={page >= totalPages}>
          {locale === "ar" ? "التالي" : "Next"}
        </button>
      )}
    </nav>
  );
}

function State({
  title,
  copy,
  action,
  actionLabel = "Try again",
}: {
  title: string;
  copy: string;
  action: () => void;
  actionLabel?: string;
}) {
  return (
    <div className="mt-10 border border-border px-8 py-20 text-center">
      <h2 className="font-serif text-3xl">{title}</h2>
      <p className="mt-4 text-sm text-muted-foreground">{copy}</p>
      <Button variant="line" size="pill" className="mt-8" onClick={action}>
        {actionLabel}
      </Button>
    </div>
  );
}
function ProductGridSkeleton({ view }: { view: "compact" | "grid" | "list" }) {
  return (
    <div
      className={`mt-10 grid gap-5 ${
        view === "list"
          ? "grid-cols-1"
          : view === "grid"
            ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
            : "grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
      }`}
    >
      {Array.from({ length: 8 }, (_, index) => (
        <div key={index} className="animate-pulse">
          <div className="aspect-[4/5] bg-stone" />
          <div className="mt-4 h-3 w-20 bg-stone" />
          <div className="mt-3 h-5 w-3/4 bg-stone" />
        </div>
      ))}
    </div>
  );
}
