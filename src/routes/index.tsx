import { createFileRoute } from "@tanstack/react-router";
import {
  Hero,
  Benefits,
  Featured,
  CollectionFeature,
  Concerns,
  BestSellers,
  BrandStory,
  BeautyDifference,
} from "@/components/home/Sections";
import { CategoryShowcase } from "@/components/home/CategoryShowcase";
import { BrandMarquee } from "@/components/home/BrandMarquee";
import { loadAllBrands, loadCatalog, loadCategories } from "@/lib/catalog";
import { images } from "@/lib/products";
import { absoluteUrl, canonicalUrl, createSeoHead, itemListSchema, jsonLd } from "@/lib/seo";

export const Route = createFileRoute("/")({
  loader: async ({ context }) => {
    const [products, categories, brands] = await Promise.all([
      loadCatalog(
        { limit: 8, sortBy: "createdAt", sortOrder: "desc" },
        context.locale === "ar" ? "ar" : "en",
      ),
      loadCategories(),
      loadAllBrands(),
    ]);
    return {
      products,
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
        ...(loaderData?.products.length
          ? [jsonLd(itemListSchema("Featured products", loaderData.products, locale))]
          : []),
      ],
    };
  },
  component: Index,
});

function Index() {
  const { products, categories, brands } = Route.useLoaderData();
  return (
    <>
      <Hero />
      <BrandMarquee initialBrands={brands} />
      <Benefits />
      <CategoryShowcase initialCategories={categories} />
      <Featured initialProducts={products.slice(0, 5)} />
      <CollectionFeature />
      <Concerns />
      <BestSellers initialProducts={products} />
      <BrandStory />
      <BeautyDifference />
    </>
  );
}
