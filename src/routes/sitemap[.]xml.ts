import { createFileRoute } from "@tanstack/react-router";
import { listProducts } from "@/lib/api";

const siteUrl = () =>
  ((import.meta.env["VITE_SITE_URL"] as string | undefined) ?? "https://bioreza.com").replace(
    /\/$/,
    "",
  );

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const products = await listProducts({ limit: 100, sortBy: "createdAt", sortOrder: "desc" });
        const base = siteUrl();
        const staticPaths = [
          "",
          "/shop",
          "/offers",
          "/journal",
          "/contact",
          "/privacy",
          "/terms",
          "/returns",
          "/shipping-policy",
          "/cookies",
        ];
        const urls = [
          ...staticPaths.map((path) => `${base}${path}`),
          ...products.map((product) => `${base}/product/${encodeURIComponent(product.slug)}`),
        ];
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls
          .map((url) => `\n  <url><loc>${escapeXml(url)}</loc></url>`)
          .join("")}\n</urlset>`;
        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=900",
          },
        });
      },
    },
  },
});

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
