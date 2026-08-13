import { createFileRoute } from "@tanstack/react-router";
import { listOffers } from "@/lib/api";
import { sitemapFailure, sitemapResponse, urlsetXml } from "@/lib/sitemap";

const PUBLIC_PAGES = [
  "/",
  "/shop",
  "/journal",
  "/contact",
  "/privacy",
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
          const offers = await listOffers().catch(() => []);
          const paths = offers.length ? [...PUBLIC_PAGES, "/offers"] : PUBLIC_PAGES;
          return sitemapResponse(urlsetXml(paths.map((path) => ({ path }))));
        } catch (error) {
          return sitemapFailure(error);
        }
      },
    },
  },
});
