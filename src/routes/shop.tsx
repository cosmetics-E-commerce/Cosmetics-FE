import { useState, useSyncExternalStore } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Grid2X2, Grid3X3, List, SlidersHorizontal, X } from "lucide-react";
import { ProductCard } from "@/components/shop/ProductCard";
import { Reveal } from "@/components/brand/Reveal";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { useBrands, useCatalog, useCategories } from "@/lib/catalog";
import { useStore } from "@/lib/store";
import { useI18n } from "@/lib/i18n";

type Search = {
  brand?: string | undefined;
  category?: string | undefined;
  concern?: string | undefined;
  sort?: string | undefined;
  search?: string | undefined;
  view?: "compact" | "grid" | "list" | undefined;
};

const subscribeToHydration = () => () => undefined;

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
  }),
  head: () => ({
    meta: [
      { title: "Shop — BIOREZA Cosmetics" },
      { name: "description", content: "Explore BIOREZA skincare, makeup, haircare and fragrance." },
    ],
  }),
  component: Shop,
});

function Shop() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const { locale } = useStore();
  const { t } = useI18n();
  const [filters, setFilters] = useState(false);
  const view = search.view ?? "compact";
  const hydrated = useSyncExternalStore(
    subscribeToHydration,
    () => true,
    () => false,
  );
  const sort =
    search.sort === "price-asc"
      ? { sortBy: "basePrice", sortOrder: "asc" }
      : search.sort === "price-desc"
        ? { sortBy: "basePrice", sortOrder: "desc" }
        : { sortBy: "createdAt", sortOrder: "desc" };
  const catalog = useCatalog(
    {
      limit: 100,
      brandSlug: search.brand?.toLowerCase(),
      categorySlug: search.category?.toLowerCase(),
      search: search.search ?? search.concern,
      ...sort,
    },
    locale,
  );
  const categories = useCategories();
  const brands = useBrands();
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
  const productCount = hydrated ? (catalog.data?.length ?? 0) : 0;
  const shopHeadline =
    locale === "ar"
      ? "تسوّقي منتجات تجميل نظيفة وعالية الجودة"
      : "Shop environment friendly quality goods";
  const FilterList = (
    <div>
      <p className="label-xs text-taupe">{t("shop.category")}</p>
      <ul className="mt-5 space-y-3">
        <li>
          <button
            type="button"
            onClick={() => {
              navigate({ search: { ...search, category: undefined } });
              setFilters(false);
            }}
            className={`inline-flex min-h-11 items-center ${!search.category ? "text-gold" : "hover:text-gold"}`}
          >
            {t("shop.all")}
          </button>
        </li>
        {hydrated &&
          categories.data?.map((category) => (
            <li key={category.id}>
              <button
                type="button"
                onClick={() => {
                  navigate({ search: { ...search, category: category.slug } });
                  setFilters(false);
                }}
                className={`inline-flex min-h-11 items-center ${search.category === category.slug ? "text-gold" : "hover:text-gold"}`}
              >
                {locale === "ar" ? category.nameAr : category.nameEn}{" "}
                <span className="text-xs text-taupe">({category.productCount})</span>
              </button>
            </li>
          ))}
      </ul>
      {brands.data && brands.data.length > 0 && (
        <div className="mt-10 border-t border-border pt-8">
          <p className="label-xs text-taupe">{locale === "ar" ? "العلامة التجارية" : "Brand"}</p>
          <ul className="mt-5 space-y-2">
            {brands.data
              .filter((brand) => brand.productCount > 0)
              .map((brand) => (
                <li key={brand.id}>
                  <button
                    type="button"
                    onClick={() => {
                      navigate({ search: { ...search, brand: brand.slug } });
                      setFilters(false);
                    }}
                    className={`inline-flex min-h-11 items-center ${search.brand === brand.slug ? "text-gold" : "hover:text-gold"}`}
                  >
                    {brand.name} <span className="text-xs text-taupe">({brand.productCount})</span>
                  </button>
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
                  onClick={() => navigate({ search: { ...search, category: category.slug } })}
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
          <select
            aria-label={locale === "ar" ? "ترتيب المنتجات" : "Sort products"}
            value={search.sort ?? ""}
            onChange={(event) =>
              navigate({ search: { ...search, sort: event.target.value || undefined } })
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
                onClick={() => navigate({ search: { ...search, [filter.key]: undefined } })}
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
        {(!hydrated || catalog.isLoading) && <ProductGridSkeleton view={view} />}
        {hydrated && catalog.error && (
          <State
            title={t("shop.errorTitle")}
            copy={t("shop.errorCopy")}
            action={() => void catalog.refetch()}
            actionLabel={t("common.tryAgain")}
          />
        )}
        {hydrated && !catalog.isLoading && !catalog.error && catalog.data?.length === 0 && (
          <State
            title={t("shop.emptyTitle")}
            copy={t("shop.emptyCopy")}
            action={clearFilters}
            actionLabel={t("shop.clearFilters")}
          />
        )}
        {hydrated && catalog.data && (
          <div
            className={`sf-shop-products ${
              view === "list"
                ? "sf-shop-products--list"
                : view === "grid"
                  ? "sf-shop-products--grid"
                  : "sf-shop-products--compact"
            }`}
          >
            {catalog.data.map((product, index) => (
              <Reveal key={product.slug} delay={(index % 4) * 35}>
                <ProductCard
                  product={product}
                  compact={view === "compact"}
                  layout={view === "list" ? "list" : "grid"}
                />
              </Reveal>
            ))}
          </div>
        )}
      </section>
      <Sheet open={filters} onOpenChange={setFilters}>
        <SheetContent
          side="bottom"
          showCloseButton={false}
          className="max-h-[80dvh] overscroll-contain bg-warm-white p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]"
        >
          <SheetTitle className="flex items-center justify-between">
            {t("shop.filters")}{" "}
            <button
              type="button"
              onClick={() => setFilters(false)}
              aria-label={locale === "ar" ? "إغلاق الفلاتر" : "Close filters"}
              className="grid size-11 place-items-center"
            >
              <X aria-hidden="true" />
            </button>
          </SheetTitle>
          <div className="grid gap-8 py-8 md:grid-cols-[1fr_1fr]">
            {FilterList}
            <div>
              <p className="label-xs text-taupe">
                {locale === "ar" ? "العرض والترتيب" : "View and sort"}
              </p>
              <select
                aria-label={locale === "ar" ? "ترتيب المنتجات" : "Sort products"}
                value={search.sort ?? ""}
                onChange={(event) =>
                  navigate({ search: { ...search, sort: event.target.value || undefined } })
                }
                className="mt-5 min-h-12 w-full border border-border bg-white px-4"
              >
                <option value="">{t("shop.sortNewest")}</option>
                <option value="price-asc">{t("shop.sortLow")}</option>
                <option value="price-desc">{t("shop.sortHigh")}</option>
              </select>
              <div
                role="group"
                aria-label="Product view"
                className="mt-5 grid grid-cols-3 border border-border"
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
                    className={`grid min-h-12 place-items-center transition-colors ${
                      view === value
                        ? "bg-ink text-warm-white"
                        : "text-taupe hover:bg-ivory hover:text-foreground"
                    }`}
                  >
                    <Icon className="size-4" strokeWidth={1.25} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
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
