import { createFileRoute, notFound } from "@tanstack/react-router";
import { SeoCatalogLanding } from "@/components/shop/SeoCatalogLanding";
import { loadBrands, loadCatalogPage } from "@/lib/catalog";
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

const PAGE_SIZE = 24;

export const Route = createFileRoute("/brands/$slug")({
  validateSearch: (raw: Record<string, unknown>): { page?: number } => {
    const page = pageNumber(raw["page"]);
    return page ? { page } : {};
  },
  loaderDeps: ({ search }) => ({ page: search.page }),
  loader: async ({ params, deps, context }) => {
    const locale: SeoLocale = context.locale === "ar" ? "ar" : "en";
    const page = deps.page ?? 1;
    const [brands, catalog] = await Promise.all([
      loadBrands(),
      loadCatalogPage({ brandSlug: params.slug, page, limit: PAGE_SIZE }, locale),
    ]);
    const brand = brands.find((item) => item.slug === params.slug);
    if (
      !brand ||
      brand.productCount < 1 ||
      (catalog.meta.total > 0 && page > catalog.meta.totalPages)
    ) {
      throw notFound();
    }
    return { brand, catalog, locale };
  },
  head: ({ loaderData, params, match }) => {
    const locale = loaderData?.locale ?? "en";
    const page = match.search.page ?? 1;
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
      page,
      image: loaderData?.brand.logoUrl,
      index: Boolean(loaderData?.catalog.items.length),
      prevPath: page > 1 ? localizePath(path, locale, page - 1) : undefined,
      nextPath: loaderData?.catalog.meta.hasNext ? localizePath(path, locale, page + 1) : undefined,
    });
    return {
      ...seo,
      scripts: loaderData
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
  const description =
    data.locale === "ar"
      ? `تصفّحي منتجات ${data.brand.name} المتاحة حالياً من بيوريزا مع الأسعار وخيارات المنتج.`
      : `Browse ${data.brand.name} products currently available from BIOREZA, with current prices and product options.`;
  return (
    <SeoCatalogLanding
      kind="brand"
      slug={data.brand.slug}
      name={data.brand.name}
      description={description}
      products={data.catalog.items}
      meta={data.catalog.meta}
      locale={data.locale}
      logo={data.brand.logoUrl}
    />
  );
}

function pageNumber(value: unknown) {
  const page = typeof value === "string" ? Number.parseInt(value, 10) : Number(value);
  return Number.isFinite(page) && page > 1 ? page : undefined;
}
