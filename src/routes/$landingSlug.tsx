import { createFileRoute, notFound } from "@tanstack/react-router";

import { LandingPageRenderer } from "@/components/page-builder/LandingPageRenderer";
import { getPublishedLandingPage } from "@/lib/api";
import { createSeoHead } from "@/lib/seo";

export const Route = createFileRoute("/$landingSlug")({
  loader: async ({ params, context }) => {
    try {
      const snapshot = await getPublishedLandingPage(params.landingSlug);
      return { snapshot, locale: context.locale === "ar" ? ("ar" as const) : ("en" as const) };
    } catch {
      throw notFound();
    }
  },
  head: ({ loaderData, params }) => {
    const locale = loaderData?.locale ?? "en";
    const config = loaderData?.snapshot.config;
    const title = config?.seo.title[locale] || config?.seo.title.en || "BIOREZA";
    const description = config?.seo.description[locale] || config?.seo.description.en || "";
    const og =
      config?.seo.openGraphMediaId && loaderData
        ? loaderData.snapshot.media[config.seo.openGraphMediaId]?.url
        : undefined;
    const seo = createSeoHead({
      title,
      description,
      path: config?.seo.canonicalPath || `/${params.landingSlug}`,
      locale,
      ...(og ? { image: og } : {}),
    });
    return config?.seo.indexable === false
      ? { ...seo, meta: [...seo.meta, { name: "robots", content: "noindex,nofollow" }] }
      : seo;
  },
  component: LandingPage,
});

function LandingPage() {
  const { snapshot, locale } = Route.useLoaderData();
  return <LandingPageRenderer snapshot={snapshot} locale={locale} />;
}
