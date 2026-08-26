import { useEffect } from "react";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { SeoCatalogLanding } from "@/components/shop/SeoCatalogLanding";
import {
  catalogFacetParams,
  catalogListingParams,
  parseCatalogListingSearch,
} from "@/components/shop/catalog-listing-state";
import { catalogFacetsQuery, catalogPageQuery, categoriesQuery } from "@/lib/catalog";
import { emitCampaignContext } from "@/lib/analytics";
import {
  breadcrumbSchema,
  canonicalUrl,
  createSeoHead,
  itemListSchema,
  jsonLd,
  localizePath,
  type SeoLocale,
} from "@/lib/seo";

export const Route = createFileRoute("/categories/$slug")({
  validateSearch: parseCatalogListingSearch,
  loaderDeps: ({ search }) => search,
  loader: async ({ params, deps, context }) => {
    const locale: SeoLocale = context.locale === "ar" ? "ar" : "en";
    const page = deps.page ?? 1;
    const scope = { categorySlug: params.slug };
    const [categories, catalog, facets] = await Promise.all([
      context.queryClient.ensureQueryData(categoriesQuery()),
      context.queryClient.ensureQueryData(
        catalogPageQuery(catalogListingParams(deps, scope, page), locale),
      ),
      context.queryClient.ensureQueryData(catalogFacetsQuery(catalogFacetParams(deps, scope))),
    ]);
    const category = categories.find((item) => item.slug === params.slug);
    if (
      !category ||
      (category.aggregateProductCount ?? category.productCount) < 1 ||
      (catalog.meta.total > 0 && page > catalog.meta.totalPages)
    ) {
      throw notFound();
    }
    const parentRecord = category.parentId
      ? categories.find((item) => item.id === category.parentId)
      : undefined;
    const name = locale === "ar" ? category.nameAr : category.nameEn;
    const parent = parentRecord
      ? {
          name: locale === "ar" ? parentRecord.nameAr : parentRecord.nameEn,
          slug: parentRecord.slug,
        }
      : undefined;
    const children = categories
      .filter((item) => item.parentId === category.id)
      .map((item) => ({
        id: item.id,
        slug: item.slug,
        name: locale === "ar" ? item.nameAr : item.nameEn,
        imageUrl: item.imageUrl,
        productCount: item.aggregateProductCount ?? item.productCount,
      }));
    return { category, catalog, facets, locale, name, parent, children };
  },
  head: ({ loaderData, params, match }) => {
    const locale = loaderData?.locale ?? "en";
    const page = match.search.page ?? 1;
    const filtered = Boolean(
      match.search.sort ||
      match.search.view ||
      match.search.stock ||
      match.search.tags ||
      match.search.minPrice !== undefined ||
      match.search.maxPrice !== undefined,
    );
    const name = loaderData?.name ?? params.slug;
    const path = `/categories/${encodeURIComponent(params.slug)}`;
    const description =
      locale === "ar"
        ? `تصفّحي منتجات ${name} المتاحة حالياً من بيوريزا مع الأسعار وخيارات المنتج.`
        : `Browse ${name} products currently available from BIOREZA, with current prices and product options.`;
    const seo = createSeoHead({
      title:
        locale === "ar"
          ? page > 1
            ? `منتجات ${name} - الصفحة ${page}`
            : `منتجات ${name}`
          : page > 1
            ? `${name} Products - Page ${page}`
            : `${name} Products`,
      description,
      path,
      locale,
      page: filtered ? undefined : page,
      image: loaderData?.category.imageUrl,
      index: !filtered && Boolean(loaderData?.catalog.items.length),
      follow: true,
      alternates: !filtered,
      prevPath: !filtered && page > 1 ? localizePath(path, locale, page - 1) : undefined,
      nextPath:
        !filtered && loaderData?.catalog.meta.hasNext
          ? localizePath(path, locale, page + 1)
          : undefined,
    });
    const crumbs = [
      { name: locale === "ar" ? "الرئيسية" : "Home", path: "/" },
      { name: locale === "ar" ? "المتجر" : "Shop", path: "/shop" },
      ...(loaderData?.parent
        ? [{ name: loaderData.parent.name, path: `/categories/${loaderData.parent.slug}` }]
        : []),
      { name, path },
    ];
    return {
      ...seo,
      scripts:
        loaderData && !filtered
          ? [
              jsonLd(breadcrumbSchema(crumbs, locale)),
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
                mainEntity: { "@type": "ItemList", numberOfItems: loaderData.catalog.meta.total },
              }),
            ]
          : [],
    };
  },
  component: CategoryPage,
});

function CategoryPage() {
  const data = Route.useLoaderData();
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  useEffect(() => {
    emitCampaignContext({
      categoryId: data.category.id,
      categorySlug: data.category.slug,
      categoryName: data.name,
    });
  }, [data.category.id, data.category.slug, data.name]);
  const description =
    data.locale === "ar"
      ? `تصفّحي منتجات ${data.name} المتاحة حالياً من بيوريزا مع الأسعار وخيارات المنتج.`
      : `Browse ${data.name} products currently available from BIOREZA, with current prices and product options.`;
  return (
    <SeoCatalogLanding
      kind="category"
      slug={data.category.slug}
      name={data.name}
      description={description}
      products={data.catalog.items}
      meta={data.catalog.meta}
      locale={data.locale}
      parent={data.parent}
      children={data.children}
      facets={data.facets}
      search={search}
      onSearchChange={(next) => navigate({ search: next })}
    />
  );
}
