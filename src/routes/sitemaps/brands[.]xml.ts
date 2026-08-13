import { createFileRoute } from "@tanstack/react-router";
import { brandPathsForSitemap, sitemapFailure, sitemapResponse, urlsetXml } from "@/lib/sitemap";

export const Route = createFileRoute("/sitemaps/brands.xml")({
  server: {
    handlers: {
      GET: async () => {
        try {
          const paths = await brandPathsForSitemap();
          return sitemapResponse(urlsetXml(paths.map((path) => ({ path }))));
        } catch (error) {
          return sitemapFailure(error);
        }
      },
    },
  },
});
