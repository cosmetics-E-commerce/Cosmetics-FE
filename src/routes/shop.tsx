import { useMemo } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { Reveal } from "@/components/brand/Reveal";
import { sortBrands } from "@/components/layout/brand-directory-data";
import { CatalogListingControls } from "@/components/shop/CatalogListingControls";
import {
  catalogFacetParams,
  catalogListingParams,
  parseCatalogListingSearch,
  type CatalogListingSearch,
  withListingPage,
  withResetPage,
} from "@/components/shop/catalog-listing-state";
import { ProductCard } from "@/components/shop/ProductCard";
import { Button } from "@/components/ui/button";
import {
  loadBrands,
  loadCatalogFacets,
  loadCatalogPage,
  loadCategories,
  useBrands,
  useCatalogFacets,
  useCatalogPage,
  useCategories,
} from "@/lib/catalog";
import { useI18n } from "@/lib/i18n";
import {
  breadcrumbSchema,
  createSeoHead,
  itemListSchema,
  jsonLd,
  localizePath,
  type SeoLocale,
} from "@/lib/seo";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/shop")({
  validateSearch: parseCatalogListingSearch,
  loaderDeps: ({ search }) => search,
  loader: async ({ deps, context }) => {
    const locale: SeoLocale = context.locale === "ar" ? "ar" : "en";
    const page = deps.page ?? 1;
    const [catalog, facets, categories, brands] = await Promise.all([
      loadCatalogPage(catalogListingParams(deps, {}, page), locale),
      loadCatalogFacets(catalogFacetParams(deps)),
      loadCategories(),
      loadBrands(),
    ]);
    if (catalog.meta.total > 0 && page > catalog.meta.totalPages) throw notFound();
    return { catalog, facets, categories, brands, locale };
  },
  head: ({ loaderData, match }) => {
    const locale = loaderData?.locale ?? "en";
    const search = match.search;
    const page = search.page ?? 1;
    const filtered = hasCatalogState(search);
    const category = loaderData?.categories.find((item) => item.slug === search.category);
    const brand = loaderData?.brands.find((item) => item.slug === search.brand);
    const canonicalPath =
      category && onlyEntityFilter(search, "category")
        ? `/categories/${encodeURIComponent(category.slug)}`
        : brand && onlyEntityFilter(search, "brand")
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
  const page = search.page ?? 1;
  const initial = Route.useLoaderData();
  const catalog = useCatalogPage(catalogListingParams(search, {}, page), locale, initial.catalog);
  const facets = useCatalogFacets(catalogFacetParams(search), initial.facets);
  const categories = useCategories(initial.categories);
  const brands = useBrands(initial.brands);
  const sortedBrands = useMemo(() => sortBrands(brands.data ?? [], locale), [brands.data, locale]);
  const products = catalog.data?.items ?? [];
  const meta = catalog.data?.meta;
  const view = search.view ?? "grid";
  const categoryTabs = [
    { id: "all", slug: undefined, label: t("shop.all"), count: undefined },
    ...(categories.data ?? [])
      .filter(
        (category) =>
          category.parentId === null &&
          (category.aggregateProductCount ?? category.productCount) > 0,
      )
      .map((category) => ({
        id: category.id,
        slug: category.slug,
        label: locale === "ar" ? category.nameAr : category.nameEn,
        count: category.aggregateProductCount ?? category.productCount,
      })),
  ];
  const categoryOptions = (categories.data ?? []).map((category) => ({
    id: category.id,
    parentId: category.parentId,
    slug: category.slug,
    label: locale === "ar" ? category.nameAr : category.nameEn,
    count: category.aggregateProductCount ?? category.productCount,
  }));
  const brandOptions = sortedBrands.map((brand) => ({
    id: brand.id,
    slug: brand.slug,
    label: brand.name,
    count: brand.productCount,
  }));
  const setSearch = (next: CatalogListingSearch) => navigate({ search: next });
  const clearFilters = () =>
    setSearch({
      ...(search.search ? { search: search.search } : {}),
      ...(search.sort ? { sort: search.sort } : {}),
      ...(search.view ? { view: search.view } : {}),
    });
  const shopHeadline = search.search
    ? locale === "ar"
      ? `نتائج البحث عن «${search.search}»`
      : `Search results for “${search.search}”`
    : locale === "ar"
      ? "تسوّقي العناية بالبشرة والمكياج والشعر والعطور"
      : "Shop Skincare, Makeup, Haircare & Fragrance";

  return (
    <div className="sf-shop-page sf-shop-page--minimal">
      <nav
        aria-label={locale === "ar" ? "مسار الصفحة" : "Breadcrumb"}
        className="storefront-breadcrumb sf-shop-breadcrumb"
      >
        <Link to="/">{t("common.home")}</Link>
        <span aria-hidden="true">/</span>
        <span>{t("common.shop")}</span>
      </nav>
      <Reveal className="sf-shop-hero">
        <h1>{shopHeadline}</h1>
      </Reveal>
      <section className="sf-shop-catalog" aria-labelledby="shop-products-title">
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
                onClick={() => setSearch(withResetPage(search, { category: category.slug }))}
              >
                {category.label}
                {category.count ? <span>({category.count})</span> : null}
              </button>
            );
          })}
        </div>

        <h2 id="shop-products-title" className="sr-only">
          {shopHeadline}
        </h2>
        <CatalogListingControls
          locale={locale}
          search={search}
          resultCount={meta?.total ?? products.length}
          {...(facets.data ? { facets: facets.data } : {})}
          categories={categoryOptions}
          brands={brandOptions}
          onChange={setSearch}
        />

        {catalog.isLoading ? <ProductGridSkeleton view={view} /> : null}
        {catalog.error ? (
          <State
            title={t("shop.errorTitle")}
            copy={t("shop.errorCopy")}
            action={() => void catalog.refetch()}
            actionLabel={t("common.tryAgain")}
          />
        ) : null}
        {!catalog.isLoading && !catalog.error && products.length === 0 ? (
          <State
            title={t("shop.emptyTitle")}
            copy={t("shop.emptyCopy")}
            action={clearFilters}
            actionLabel={t("shop.clearFilters")}
          />
        ) : null}
        {catalog.data ? (
          <>
            <div
              className={`sf-shop-products ${view === "list" ? "sf-shop-products--list" : "sf-shop-products--grid"}`}
            >
              {products.map((product, index) => (
                <Reveal key={product.slug} delay={(index % 4) * 35}>
                  <ProductCard product={product} compact={view !== "list"} layout={view} />
                </Reveal>
              ))}
            </div>
            {meta && meta.totalPages > 1 ? (
              <ShopPagination
                page={meta.page}
                totalPages={meta.totalPages}
                locale={locale}
                search={search}
                onPageChange={(nextPage) => setSearch(withListingPage(search, nextPage))}
                crawlable={!hasCatalogState(withListingPage(search, 1))}
              />
            ) : null}
          </>
        ) : null}
      </section>
    </div>
  );
}

const paginationActiveOptions = { exact: true, includeSearch: true } as const;

function visiblePages(page: number, totalPages: number) {
  const pages = new Set(
    [1, totalPages, page - 2, page - 1, page, page + 1, page + 2].filter(
      (item) => item >= 1 && item <= totalPages,
    ),
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
  search: CatalogListingSearch;
  crawlable: boolean;
}) {
  const pages = visiblePages(page, totalPages);
  let previous = 0;
  const pageControl = (item: number) =>
    crawlable ? (
      <Link
        to="/shop"
        search={withListingPage(search, item)}
        activeOptions={paginationActiveOptions}
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
    );

  return (
    <nav
      className="sf-shop-pagination"
      aria-label={locale === "ar" ? "صفحات المنتجات" : "Product pages"}
    >
      <button type="button" onClick={() => onPageChange(page - 1)} disabled={page <= 1}>
        {locale === "ar" ? "السابق" : "Previous"}
      </button>
      <ol>
        {pages.map((item) => {
          const gap = item - previous > 1;
          previous = item;
          return (
            <li key={item}>
              {gap ? <span className="sf-shop-pagination__ellipsis">…</span> : null}
              {pageControl(item)}
            </li>
          );
        })}
      </ol>
      <button type="button" onClick={() => onPageChange(page + 1)} disabled={page >= totalPages}>
        {locale === "ar" ? "التالي" : "Next"}
      </button>
    </nav>
  );
}

function State({
  title,
  copy,
  action,
  actionLabel,
}: {
  title: string;
  copy: string;
  action: () => void;
  actionLabel: string;
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

function ProductGridSkeleton({ view }: { view: "grid" | "list" }) {
  return (
    <div
      className={`mt-10 grid gap-5 ${view === "list" ? "grid-cols-1" : "grid-cols-2 md:grid-cols-3 xl:grid-cols-4"}`}
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

function hasCatalogState(search: CatalogListingSearch) {
  return Boolean(
    search.brand ||
    search.category ||
    search.concern ||
    search.search ||
    search.sort ||
    search.view ||
    search.stock ||
    search.tags ||
    search.minPrice !== undefined ||
    search.maxPrice !== undefined,
  );
}

function onlyEntityFilter(search: CatalogListingSearch, key: "brand" | "category") {
  const { page: _page, ...withoutPage } = search;
  const copy = { ...withoutPage };
  delete copy[key];
  return Boolean(search[key]) && !hasCatalogState(copy);
}
