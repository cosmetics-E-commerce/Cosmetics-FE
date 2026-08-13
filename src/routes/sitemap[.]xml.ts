import { createFileRoute } from "@tanstack/react-router";
import {
  productSitemapCount,
  sitemapFailure,
  sitemapIndexXml,
  sitemapResponse,
} from "@/lib/sitemap";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        try {
          const productMaps = await productSitemapCount();
          return sitemapResponse(
            sitemapIndexXml([
              "/sitemaps/pages.xml",
              "/sitemaps/categories.xml",
              "/sitemaps/brands.xml",
              ...Array.from(
                { length: productMaps },
                (_, index) => `/sitemaps/products.xml?page=${index + 1}`,
              ),
            ]),
          );
        } catch (error) {
          return sitemapFailure(error);
        }
      },
    },
  },
});
