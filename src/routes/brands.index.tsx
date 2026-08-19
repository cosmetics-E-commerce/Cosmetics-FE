import { createFileRoute } from "@tanstack/react-router";

import { BrandsDirectoryPage } from "@/components/brand/BrandsDirectoryPage";
import { loadAllBrands } from "@/lib/catalog";
import { breadcrumbSchema, canonicalUrl, createSeoHead, jsonLd, type SeoLocale } from "@/lib/seo";

export const Route = createFileRoute("/brands/")({
  loader: async ({ context }) => {
    const locale: SeoLocale = context.locale === "ar" ? "ar" : "en";
    try {
      return { brands: await loadAllBrands(), initialLoadFailed: false, locale };
    } catch {
      return { brands: undefined, initialLoadFailed: true, locale };
    }
  },
  head: ({ loaderData }) => {
    const locale = loaderData?.locale ?? "en";
    const title = locale === "ar" ? "دليل العلامات التجارية" : "Beauty Brand Directory";
    const description =
      locale === "ar"
        ? "اكتشفي كل علامات العناية والجمال المتاحة لدى بيوريزا وتصفحي منتجات كل علامة."
        : "Explore every skincare, makeup, haircare and fragrance brand available at BIOREZA.";
    return {
      ...createSeoHead({ title, description, path: "/brands", locale }),
      scripts: [
        jsonLd(
          breadcrumbSchema(
            [
              { name: locale === "ar" ? "الرئيسية" : "Home", path: "/" },
              { name: locale === "ar" ? "العلامات" : "Brands", path: "/brands" },
            ],
            locale,
          ),
        ),
        jsonLd({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: title,
          description,
          url: canonicalUrl("/brands", locale),
          inLanguage: locale,
        }),
      ],
    };
  },
  component: BrandsPageRoute,
});

function BrandsPageRoute() {
  const data = Route.useLoaderData();
  return (
    <BrandsDirectoryPage
      {...(data.brands ? { initialBrands: data.brands } : {})}
      initialLoadFailed={data.initialLoadFailed}
      locale={data.locale}
    />
  );
}
