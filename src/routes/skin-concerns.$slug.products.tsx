import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { ProductCard } from "@/components/shop/ProductCard";
import { getConcern, getConcernProducts } from "@/lib/api";
import { mapProduct } from "@/lib/catalog";
import { createSeoHead } from "@/lib/seo";
import { useStore } from "@/lib/store";

type ConcernSearch = {
  page?: number;
  brand?: string;
  category?: string;
  sort?: "RELEVANCE" | "NEWEST" | "PRICE_LOW" | "PRICE_HIGH" | "NAME";
  stock?: "1";
  lang?: "ar";
};

export const Route = createFileRoute("/skin-concerns/$slug/products")({
  validateSearch: (raw: Record<string, unknown>): ConcernSearch => ({
    ...(Number(raw["page"]) > 1 ? { page: Math.floor(Number(raw["page"])) } : {}),
    ...(typeof raw["brand"] === "string" && raw["brand"] ? { brand: raw["brand"] } : {}),
    ...(typeof raw["category"] === "string" && raw["category"]
      ? { category: raw["category"] }
      : {}),
    ...(["RELEVANCE", "NEWEST", "PRICE_LOW", "PRICE_HIGH", "NAME"].includes(String(raw["sort"]))
      ? { sort: raw["sort"] as NonNullable<ConcernSearch["sort"]> }
      : {}),
    ...(raw["stock"] === "1" ? { stock: "1" as const } : {}),
    ...(raw["lang"] === "ar" ? { lang: "ar" as const } : {}),
  }),
  loaderDeps: ({ search }) => search,
  loader: async ({ params, deps, context }) => {
    const [concern, catalog] = await Promise.all([
      context.queryClient.ensureQueryData({
        queryKey: ["concern", params.slug],
        queryFn: ({ signal }) => getConcern(params.slug, signal),
      }),
      context.queryClient.ensureQueryData({
        queryKey: ["concern-products", params.slug, deps],
        queryFn: ({ signal }) =>
          getConcernProducts(
            params.slug,
            {
              page: deps.page ?? 1,
              limit: 24,
              brand: deps.brand,
              category: deps.category,
              sort: deps.sort ?? "RELEVANCE",
              inStock: deps.stock === "1" ? true : undefined,
            },
            signal,
          ),
      }),
    ]);
    if (!concern || (catalog.meta.totalPages && (deps.page ?? 1) > catalog.meta.totalPages))
      throw notFound();
    return { concern, catalog };
  },
  head: ({ loaderData, params, match }) => {
    const ar = match.search.lang === "ar";
    const locale = ar ? "ar" : "en";
    const name = loaderData?.concern.config.name[locale] ?? params.slug;
    return createSeoHead({
      title: ar ? `منتجات ${name}` : `${name} Products`,
      description: loaderData?.concern.config.shortDescription[locale] ?? "",
      path: `/skin-concerns/${params.slug}/products`,
      locale,
      page: match.search.page,
      index: !match.search.brand && !match.search.category && !match.search.stock,
      follow: true,
    });
  },
  component: ConcernProducts,
});

function ConcernProducts() {
  const { concern, catalog } = Route.useLoaderData();
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const { locale } = useStore();
  const products = catalog.data.map((product) => mapProduct(product, locale));
  const change = (patch: { [Key in keyof ConcernSearch]?: ConcernSearch[Key] | null }) =>
    navigate({
      search: (current) => {
        const next: ConcernSearch = { ...current };
        delete next.page;
        for (const [key, value] of Object.entries(patch)) {
          if (value === null) delete next[key as keyof ConcernSearch];
          else Object.assign(next, { [key]: value });
        }
        return next;
      },
    });
  return (
    <main className="mx-auto max-w-[1500px] px-5 pb-28 pt-12 sm:px-8 lg:px-12 lg:pt-18">
      <Link
        to="/skin-concerns/$slug"
        params={{ slug: concern.slug }}
        className="label-xs text-gold"
      >
        {locale === "ar" ? "العودة إلى الدليل" : "BACK TO GUIDE"}
      </Link>
      <div className="mt-5 flex flex-wrap items-end justify-between gap-6 border-b border-border pb-8">
        <div>
          <h1 className="font-serif text-5xl sm:text-6xl">{concern.config.name[locale]}</h1>
          <p className="mt-3 text-sm text-taupe">
            {catalog.meta.total} {locale === "ar" ? "منتج" : "products"}
          </p>
        </div>
        <label className="text-sm">
          <span className="sr-only">{locale === "ar" ? "الترتيب" : "Sort"}</span>
          <select
            value={search.sort ?? "RELEVANCE"}
            onChange={(event) =>
              change({
                sort: event.target.value as NonNullable<ConcernSearch["sort"]>,
              })
            }
            className="min-h-11 border border-border bg-warm-white px-4"
          >
            <option value="RELEVANCE">{locale === "ar" ? "الأكثر صلة" : "Recommended"}</option>
            <option value="NEWEST">{locale === "ar" ? "الأحدث" : "Newest"}</option>
            <option value="PRICE_LOW">
              {locale === "ar" ? "السعر: الأقل" : "Price low to high"}
            </option>
            <option value="PRICE_HIGH">
              {locale === "ar" ? "السعر: الأعلى" : "Price high to low"}
            </option>
          </select>
        </label>
      </div>
      <div className="mt-6 flex gap-3 overflow-x-auto pb-2">
        <button
          type="button"
          onClick={() => change({ category: null, brand: null })}
          className="shrink-0 rounded-full border border-border px-4 py-2 text-sm"
        >
          {locale === "ar" ? "الكل" : "All"}
        </button>
        {catalog.facets.categories.map((facet) => (
          <button
            key={facet.id}
            type="button"
            onClick={() => change({ category: facet.slug })}
            className={`shrink-0 rounded-full border px-4 py-2 text-sm ${search.category === facet.slug ? "border-gold text-gold" : "border-border"}`}
          >
            {locale === "ar" ? facet.nameAr : facet.nameEn} ({facet.count})
          </button>
        ))}
      </div>
      {products.length ? (
        <div className="mt-10 grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="my-24 text-center text-taupe">
          {locale === "ar"
            ? "لا توجد منتجات مطابقة لهذه الفلاتر."
            : "No products match these filters."}
        </p>
      )}
      {catalog.meta.totalPages > 1 ? (
        <nav aria-label="Pagination" className="mt-14 flex items-center justify-center gap-4">
          <button
            type="button"
            disabled={!catalog.meta.hasPrev}
            onClick={() =>
              navigate({ search: (current) => ({ ...current, page: catalog.meta.page - 1 }) })
            }
            className="grid size-11 place-items-center border border-border disabled:opacity-30"
          >
            <ChevronLeft className="size-4" />
          </button>
          <span className="text-sm">
            {catalog.meta.page} / {catalog.meta.totalPages}
          </span>
          <button
            type="button"
            disabled={!catalog.meta.hasNext}
            onClick={() =>
              navigate({ search: (current) => ({ ...current, page: catalog.meta.page + 1 }) })
            }
            className="grid size-11 place-items-center border border-border disabled:opacity-30"
          >
            <ChevronRight className="size-4" />
          </button>
        </nav>
      ) : null}
    </main>
  );
}
