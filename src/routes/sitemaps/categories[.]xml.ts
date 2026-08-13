import { createFileRoute } from "@tanstack/react-router";
import { categoryPathsForSitemap, sitemapFailure, sitemapResponse, urlsetXml } from "@/lib/sitemap";

export const Route = createFileRoute("/sitemaps/categories.xml")({
  server: {
    handlers: {
      GET: async () => {
        try {
          const paths = await categoryPathsForSitemap();
          return sitemapResponse(urlsetXml(paths.map((path) => ({ path }))));
        } catch (error) {
          return sitemapFailure(error);
        }
      },
    },
  },
});
