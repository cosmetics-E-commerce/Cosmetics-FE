import { createFileRoute } from "@tanstack/react-router";
import { listConcerns, listOffers } from "@/lib/api";
import { sitemapFailure, sitemapResponse, urlsetXml } from "@/lib/sitemap";

const PUBLIC_PAGES = [
  "/",
  "/shop",
  "/brands",
  "/about",
  "/faq",
  "/contact",
  "/privacy-policy",
  "/terms",
  "/returns",
  "/shipping-policy",
  "/cookies",
];

export const Route = createFileRoute("/sitemaps/pages.xml")({
  server: {
    handlers: {
      GET: async () => {
        try {
          const [offers, concerns] = await Promise.all([
            listOffers().catch(() => []),
            listConcerns().catch(() => []),
          ]);
          const paths = [
            ...PUBLIC_PAGES,
            "/skin-concerns",
            ...(offers.length ? ["/offers"] : []),
            ...concerns.map((concern) => `/skin-concerns/${encodeURIComponent(concern.slug)}`),
          ];
          return sitemapResponse(urlsetXml(paths.map((path) => ({ path }))));
        } catch (error) {
          return sitemapFailure(error);
        }
      },
    },
  },
});
