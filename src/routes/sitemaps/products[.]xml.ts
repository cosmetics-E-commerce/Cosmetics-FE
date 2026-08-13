import { createFileRoute } from "@tanstack/react-router";
import { productPathsForSitemap, sitemapFailure, sitemapResponse, urlsetXml } from "@/lib/sitemap";

export const Route = createFileRoute("/sitemaps/products.xml")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        try {
          const value = new URL(request.url).searchParams.get("page") ?? "1";
          const page = Number.parseInt(value, 10);
          if (!Number.isInteger(page) || page < 1) {
            return new Response("Sitemap not found", {
              status: 404,
              headers: { "Content-Type": "text/plain; charset=utf-8", "X-Robots-Tag": "noindex" },
            });
          }
          const paths = await productPathsForSitemap(page);
          if (!paths) {
            return new Response("Sitemap not found", {
              status: 404,
              headers: { "Content-Type": "text/plain; charset=utf-8", "X-Robots-Tag": "noindex" },
            });
          }
          return sitemapResponse(urlsetXml(paths.map((path) => ({ path }))));
        } catch (error) {
          return sitemapFailure(error);
        }
      },
    },
  },
});
