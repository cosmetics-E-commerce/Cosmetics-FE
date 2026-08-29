import { createFileRoute } from "@tanstack/react-router";

import { LandingPageRenderer } from "@/components/page-builder/LandingPageRenderer";
import { getLandingPagePreview } from "@/lib/api";

export const Route = createFileRoute("/preview/page/$token")({
  loader: ({ params }) => getLandingPagePreview(params.token),
  head: () => ({
    meta: [
      { title: "Private BioReza page preview" },
      { name: "robots", content: "noindex,nofollow,noarchive" },
    ],
  }),
  component: PreviewPage,
});

function PreviewPage() {
  const snapshot = Route.useLoaderData();
  const { locale } = Route.useRouteContext();
  return <LandingPageRenderer snapshot={snapshot} locale={locale === "ar" ? "ar" : "en"} />;
}
