import { useState, useSyncExternalStore } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Grid2X2, Grid3X3, List, SlidersHorizontal, X } from "lucide-react";
import { ProductCard } from "@/components/shop/ProductCard";
import { Reveal } from "@/components/brand/Reveal";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { useCatalog, useCategories } from "@/lib/catalog";
import { useStore } from "@/lib/store";

type Search = {
  category?: string | undefined;
  concern?: string | undefined;
  sort?: string | undefined;
  search?: string | undefined;
  view?: "compact" | "grid" | "list" | undefined;
};

const subscribeToHydration = () => () => undefined;

export const Route = createFileRoute("/shop")({
  validateSearch: (raw: Record<string, unknown>): Search => ({
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
      categorySlug: search.category?.toLowerCase(),
      search: search.search ?? search.concern,
      ...sort,
    },
    locale,
  );
  const categories = useCategories();
  const FilterList = (
    <div>
      <p className="label-xs text-taupe">Category</p>
      <ul className="mt-5 space-y-3">
        <li>
          <Link
            to="/shop"
            search={{}}
            className={!search.category ? "text-gold" : "hover:text-gold"}
          >
            All products
          </Link>
        </li>
        {hydrated &&
          categories.data?.map((category) => (
            <li key={category.id}>
              <button
                type="button"
                onClick={() => {
                  navigate({ search: { category: category.slug } });
                  setFilters(false);
                }}
                className={search.category === category.slug ? "text-gold" : "hover:text-gold"}
              >
                {locale === "ar" ? category.nameAr : category.nameEn}{" "}
                <span className="text-xs text-taupe">({category.productCount})</span>
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
  return (
    <div className="mx-auto max-w-[1560px] px-5 py-14 md:px-10 lg:py-20">
      <nav aria-label="Breadcrumb" className="label-xs text-taupe">
        <Link to="/">Home</Link> / Shop
      </nav>
      <Reveal className="mt-8 max-w-2xl">
        <p className="label-xs text-gold">The live collection</p>
        <h1 className="display mt-5 text-[clamp(2.4rem,5vw,4rem)]">
          {locale === "ar" ? "اختيارات بيوريزا" : "The BIOREZA collection"}
        </h1>
        <p className="mt-6 text-muted-foreground">
          Authentic beauty essentials, priced and stocked directly from our current catalog.
        </p>
      </Reveal>
      <div className="mt-14 grid gap-12 lg:grid-cols-[240px_1fr]">
        <aside className="hidden border-e border-border pe-8 lg:block">{FilterList}</aside>
        <section>
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
            <p className="label-xs text-taupe">
              {hydrated ? (catalog.data?.length ?? 0) : 0} products
            </p>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setFilters(true)}
                className="label-xs inline-flex min-h-11 items-center gap-2 lg:hidden"
              >
                <SlidersHorizontal className="size-4" /> Filters
              </button>
              <div
                role="group"
                aria-label="Product view"
                className="hidden items-center border border-border sm:flex"
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
                    className={`grid size-11 place-items-center transition-colors ${
                      view === value
                        ? "bg-ink text-warm-white"
                        : "text-taupe hover:bg-ivory hover:text-foreground"
                    }`}
                  >
                    <Icon className="size-4" strokeWidth={1.25} />
                  </button>
                ))}
              </div>
              <select
                value={search.sort ?? ""}
                onChange={(event) =>
                  navigate({ search: { ...search, sort: event.target.value || undefined } })
                }
                className="editorial-select label-xs min-h-11 border-b border-border bg-transparent"
              >
                <option value="">Newest</option>
                <option value="price-asc">Price: low to high</option>
                <option value="price-desc">Price: high to low</option>
              </select>
            </div>
          </div>
          {(!hydrated || catalog.isLoading) && <ProductGridSkeleton view={view} />}
          {hydrated && catalog.error && (
            <State
              title="The collection is taking a moment"
              copy="Check that the API is running, then try again."
              action={() => void catalog.refetch()}
            />
          )}
          {hydrated && !catalog.isLoading && !catalog.error && catalog.data?.length === 0 && (
            <State
              title="Nothing matches yet"
              copy="Choose another category or clear the filters."
              action={() => navigate({ search: {} })}
            />
          )}
          {hydrated && catalog.data && (
            <div
              className={`mt-10 grid ${
                view === "list"
                  ? "grid-cols-1 gap-y-6"
                  : view === "grid"
                    ? "grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 xl:grid-cols-3"
                    : "grid-cols-2 gap-x-5 gap-y-14 md:grid-cols-3 xl:grid-cols-4"
              }`}
            >
              {catalog.data.map((product, index) => (
                <Reveal key={product.slug} delay={index * 45}>
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
      </div>
      <Sheet open={filters} onOpenChange={setFilters}>
        <SheetContent
          side="bottom"
          showCloseButton={false}
          className="max-h-[80vh] bg-warm-white p-6"
        >
          <SheetTitle className="flex items-center justify-between">
            Filters{" "}
            <button onClick={() => setFilters(false)}>
              <X />
            </button>
          </SheetTitle>
          <div className="py-8">{FilterList}</div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
function State({ title, copy, action }: { title: string; copy: string; action: () => void }) {
  return (
    <div className="mt-10 border border-border px-8 py-20 text-center">
      <h2 className="font-serif text-3xl">{title}</h2>
      <p className="mt-4 text-sm text-muted-foreground">{copy}</p>
      <Button variant="line" size="pill" className="mt-8" onClick={action}>
        Try again
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
