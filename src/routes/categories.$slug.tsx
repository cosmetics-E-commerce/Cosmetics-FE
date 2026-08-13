import { useEffect } from "react";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { SeoCatalogLanding } from "@/components/shop/SeoCatalogLanding";
import { loadCatalogPage, loadCategories } from "@/lib/catalog";
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

const PAGE_SIZE = 24;

export const Route = createFileRoute("/categories/$slug")({
  validateSearch: (raw: Record<string, unknown>): { page?: number } => {
    const page = pageNumber(raw["page"]);
    return page ? { page } : {};
  },
  loaderDeps: ({ search }) => ({ page: search.page }),
  loader: async ({ params, deps, context }) => {
    const locale: SeoLocale = context.locale === "ar" ? "ar" : "en";
    const page = deps.page ?? 1;
    const [categories, catalog] = await Promise.all([
      loadCategories(),
      loadCatalogPage({ categorySlug: params.slug, page, limit: PAGE_SIZE }, locale),
    ]);
    const category = categories.find((item) => item.slug === params.slug);
    if (
      !category ||
      category.productCount < 1 ||
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
    return { category, catalog, locale, name, parent };
  },
  head: ({ loaderData, params, match }) => {
    const locale = loaderData?.locale ?? "en";
    const page = match.search.page ?? 1;
    const name = loaderData?.name ?? params.slug;
    const path = `/categories/${encodeURIComponent(params.slug)}`;
    const description =
      locale === "ar"
        ? `تصفّحي منتجات ${name} المتاحة حالياً من بيوريزا مع الأسعار وخيارات المنتج.`
        : `Browse ${name} products currently available from BIOREZA, with current prices and product options.`;
    const seo = createSeoHead({
      title: page > 1 ? `${name} Products - Page ${page}` : `${name} Products`,
      description,
      path,
      locale,
      page,
      image: loaderData?.category.imageUrl,
      index: Boolean(loaderData?.catalog.items.length),
      prevPath: page > 1 ? localizePath(path, locale, page - 1) : undefined,
      nextPath: loaderData?.catalog.meta.hasNext ? localizePath(path, locale, page + 1) : undefined,
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
      scripts: loaderData
        ? [
            jsonLd(breadcrumbSchema(crumbs, locale)),
            jsonLd(
              itemListSchema(
                `${name} Products`,
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
    />
  );
}

function pageNumber(value: unknown) {
  const page = typeof value === "string" ? Number.parseInt(value, 10) : Number(value);
  return Number.isFinite(page) && page > 1 ? page : undefined;
}
