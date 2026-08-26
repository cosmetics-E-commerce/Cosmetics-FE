import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { Hero } from "@/components/home/Hero";
import { allBrandsQuery, categoriesQuery, merchandisingQuery } from "@/lib/catalog";
import { images } from "@/lib/products";
import { absoluteUrl, canonicalUrl, createSeoHead, itemListSchema, jsonLd } from "@/lib/seo";

const HomeBelowFold = lazy(() => import("@/components/home/HomeBelowFold"));

export const Route = createFileRoute("/")({
  loader: async ({ context }) => {
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
      context.queryClient.ensureQueryData(allBrandsQuery()),
    ]);
    return {
      arrivals,
      customerEdit,
      categories,
      brands,
      locale: context.locale === "ar" ? ("ar" as const) : ("en" as const),
    };
  },
  head: ({ loaderData }) => {
    const locale = loaderData?.locale ?? "en";
    const title =
      locale === "ar"
        ? "بيوريزا لمستحضرات التجميل | العناية والجمال"
        : "BIOREZA Cosmetics | Skincare & Beauty";
    const description =
      locale === "ar"
        ? "تسوّقي منتجات العناية بالبشرة والمكياج والشعر والعطور المتاحة من بيوريزا مع الأسعار وحالة التوفر."
        : "Shop BIOREZA skincare, makeup, haircare and fragrance products with current prices, product details and availability.";
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
        ...(loaderData?.arrivals.length
          ? [jsonLd(itemListSchema("Featured products", loaderData.arrivals, locale))]
          : []),
      ],
    };
  },
  component: Index,
});

function Index() {
  const { arrivals, customerEdit, categories, brands } = Route.useLoaderData();
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
