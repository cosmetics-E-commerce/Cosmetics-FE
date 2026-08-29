import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { Hero } from "@/components/home/Hero";
import { LandingPageRenderer } from "@/components/page-builder/LandingPageRenderer";
import { brandMarqueeQuery, categoriesQuery, merchandisingQuery } from "@/lib/catalog";
import { getPublishedHomepage } from "@/lib/api";
import { images } from "@/lib/products";
import { absoluteUrl, canonicalUrl, createSeoHead, itemListSchema, jsonLd } from "@/lib/seo";

const HomeBelowFold = lazy(() => import("@/components/home/HomeBelowFold"));

export const Route = createFileRoute("/")({
  loader: async ({ context }) => {
    const locale = context.locale === "ar" ? ("ar" as const) : ("en" as const);
    const builder = await getPublishedHomepage().catch(() => null);
    if (builder) return { mode: "builder" as const, builder, locale };
    const [arrivals, customerEdit, categories, brands] = await Promise.all([
      context.queryClient.ensureQueryData(
        merchandisingQuery(
          { section: "home-arrivals", limit: 5 },
          context.locale === "ar" ? "ar" : "en",
        ),
      ),
      context.queryClient.ensureQueryData(
        merchandisingQuery(
          { section: "home-customer-edit", limit: 8 },
          context.locale === "ar" ? "ar" : "en",
        ),
      ),
      context.queryClient.ensureQueryData(categoriesQuery()),
      // The homepage is a bounded merchandising surface, not the brand
      // directory. Fetching every page here turns one SSR request into an
      // unbounded API request storm as the catalog grows.
      context.queryClient.ensureQueryData(brandMarqueeQuery()),
    ]);
    return {
      mode: "legacy" as const,
      arrivals,
      customerEdit,
      categories,
      brands,
      locale,
    };
  },
  head: ({ loaderData }) => {
    const locale = loaderData?.locale ?? "en";
    if (loaderData?.mode === "builder") {
      const config = loaderData.builder.config;
      const title = config.seo.title[locale] || config.seo.title.en;
      const description = config.seo.description[locale] || config.seo.description.en;
      const og = config.seo.openGraphMediaId
        ? loaderData.builder.media[config.seo.openGraphMediaId]?.url
        : undefined;
      const seo = createSeoHead({
        title,
        description,
        path: "/",
        locale,
        ...(og ? { image: og } : {}),
      });
      return config.seo.indexable
        ? seo
        : { ...seo, meta: [...seo.meta, { name: "robots", content: "noindex,nofollow" }] };
    }
    const title =
      locale === "ar"
        ? "بيوريزا لمستحضرات التجميل | العناية والجمال"
        : "BIOREZA Cosmetics | Skincare & Beauty";
    const description =
      locale === "ar"
        ? "تسوّقي منتجات العناية بالبشرة والشعر والجسم والعطور المتاحة من بيوريزا مع الأسعار وحالة التوفر."
        : "Shop BIOREZA skincare, haircare, body care and fragrance products with current prices, product details and availability.";
    const seo = createSeoHead({
      title,
      description,
      path: "/",
      locale,
      image: images.heroSlide1,
    });
    return {
      ...seo,
      scripts: [
        jsonLd({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": `${canonicalUrl("/", locale)}#webpage`,
          url: canonicalUrl("/", locale),
          name: title,
          description,
          inLanguage: locale,
          primaryImageOfPage: { "@type": "ImageObject", url: absoluteUrl(images.heroSlide1) },
          isPartOf: { "@id": `${canonicalUrl("/", "en")}#website` },
        }),
        ...(loaderData?.mode === "legacy" && loaderData.arrivals.length
          ? [jsonLd(itemListSchema("Featured products", loaderData.arrivals, locale))]
          : []),
      ],
    };
  },
  component: Index,
});

function Index() {
  const data = Route.useLoaderData();
  if (data.mode === "builder")
    return <LandingPageRenderer snapshot={data.builder} locale={data.locale} />;
  const { arrivals, customerEdit, categories, brands } = data;
  return (
    <>
      <Hero />
      <Suspense fallback={null}>
        <HomeBelowFold
          arrivals={arrivals}
          customerEdit={customerEdit}
          categories={categories}
          brands={brands}
        />
      </Suspense>
    </>
  );
}
