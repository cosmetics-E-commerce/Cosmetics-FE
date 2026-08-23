import { createFileRoute, notFound } from "@tanstack/react-router";
import { SeoCatalogLanding } from "@/components/shop/SeoCatalogLanding";
import {
  catalogFacetParams,
  catalogListingParams,
  parseCatalogListingSearch,
} from "@/components/shop/catalog-listing-state";
import { loadAllBrands, loadCatalogFacets, loadCatalogPage } from "@/lib/catalog";
import {
  breadcrumbSchema,
  absoluteUrl,
  canonicalUrl,
  createSeoHead,
  itemListSchema,
  jsonLd,
  localizePath,
  type SeoLocale,
} from "@/lib/seo";

export const Route = createFileRoute("/brands/$slug")({
  validateSearch: parseCatalogListingSearch,
  loaderDeps: ({ search }) => search,
  loader: async ({ params, deps, context }) => {
    const locale: SeoLocale = context.locale === "ar" ? "ar" : "en";
    const page = deps.page ?? 1;
    const scope = { brandSlug: params.slug };
    const [brands, catalog, facets] = await Promise.all([
      loadAllBrands(),
      loadCatalogPage(catalogListingParams(deps, scope, page), locale),
      loadCatalogFacets(catalogFacetParams(deps, scope)),
    ]);
    const brand = brands.find((item) => item.slug === params.slug);
    if (!brand || (page > 1 && page > catalog.meta.totalPages)) {
      throw notFound();
    }
    return { brand, catalog, facets, locale };
  },
  head: ({ loaderData, params, match }) => {
    const locale = loaderData?.locale ?? "en";
    const page = match.search.page ?? 1;
    const filtered = Boolean(
      match.search.category ||
      match.search.sort ||
      match.search.view ||
      match.search.stock ||
      match.search.tags ||
      match.search.minPrice !== undefined ||
      match.search.maxPrice !== undefined,
    );
    const name = loaderData?.brand.name ?? params.slug;
    const path = `/brands/${encodeURIComponent(params.slug)}`;
    const description =
      locale === "ar"
        ? `تصفّحي منتجات ${name} المتاحة حالياً من بيوريزا مع الأسعار وخيارات المنتج.`
        : `Browse ${name} products currently available from BIOREZA, with current prices and product options.`;
    const title =
      locale === "ar"
        ? page > 1
          ? `منتجات ${name} - الصفحة ${page}`
          : `منتجات ${name}`
        : page > 1
          ? `${name} Products - Page ${page}`
          : `${name} Products`;
    const seo = createSeoHead({
      title,
      description,
      path,
      locale,
      page: filtered ? undefined : page,
      image: loaderData?.brand.logoUrl,
      index: !filtered && Boolean(loaderData?.catalog.items.length),
      follow: true,
      alternates: !filtered,
      prevPath: !filtered && page > 1 ? localizePath(path, locale, page - 1) : undefined,
      nextPath:
        !filtered && loaderData?.catalog.meta.hasNext
          ? localizePath(path, locale, page + 1)
          : undefined,
    });
    return {
      ...seo,
      scripts:
        loaderData && !filtered
          ? [
              jsonLd(
                breadcrumbSchema(
                  [
                    { name: locale === "ar" ? "الرئيسية" : "Home", path: "/" },
                    { name: locale === "ar" ? "المتجر" : "Shop", path: "/shop" },
                    { name, path },
                  ],
                  locale,
                ),
              ),
              jsonLd(
                itemListSchema(
                  locale === "ar" ? `منتجات ${name}` : `${name} Products`,
                  loaderData.catalog.items,
                  locale,
                  (page - 1) * loaderData.catalog.meta.limit,
                ),
              ),
              jsonLd({
                "@context": "https://schema.org",
                "@type": "CollectionPage",
                name,
                url: canonicalUrl(path, locale, page),
                inLanguage: locale,
                mainEntity: {
                  "@type": "Brand",
                  name,
                  ...(loaderData.brand.logoUrl
                    ? { logo: absoluteUrl(loaderData.brand.logoUrl) }
                    : {}),
                },
              }),
            ]
          : [],
    };
  },
  component: BrandPage,
});

function BrandPage() {
  const data = Route.useLoaderData();
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  return (
    <SeoCatalogLanding
      kind="brand"
      slug={data.brand.slug}
      name={data.brand.name}
      description=""
      products={data.catalog.items}
      meta={data.catalog.meta}
      locale={data.locale}
      logo={data.brand.logoUrl}
      facets={data.facets}
      search={search}
      onSearchChange={(next) => navigate({ search: next })}
    />
  );
}
