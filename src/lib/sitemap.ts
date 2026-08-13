import {
  listBrandsPage,
  listCategoriesPage,
  listProductsPage,
  type PaginatedResult,
} from "@/lib/api";
import { canonicalUrl, siteOrigin } from "@/lib/seo";

const API_PAGE_SIZE = 100;
export const PRODUCTS_PER_SITEMAP = 5_000;
export const SITEMAP_HEADERS = {
  "Content-Type": "application/xml; charset=utf-8",
  "Cache-Control": "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400",
  "X-Content-Type-Options": "nosniff",
};

type SitemapUrl = { path: string; lastmod?: string };

export function urlsetXml(entries: SitemapUrl[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${entries
    .flatMap(({ path, lastmod }) =>
      (["en", "ar"] as const).map((locale) => urlEntry(path, locale, lastmod)),
    )
    .join("")}\n</urlset>`;
}

export function sitemapIndexXml(paths: string[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths
    .map(
      (path) =>
        `\n  <sitemap><loc>${escapeXml(new URL(path, siteOrigin()).toString())}</loc></sitemap>`,
    )
    .join("")}\n</sitemapindex>`;
}

export function sitemapResponse(xml: string) {
  return new Response(xml, { headers: SITEMAP_HEADERS });
}

export function sitemapFailure(error: unknown) {
  console.error("Sitemap generation failed", error);
  return new Response("Sitemap temporarily unavailable", {
    status: 503,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      "Retry-After": "300",
      "X-Robots-Tag": "noindex",
    },
  });
}

export async function productSitemapCount() {
  const first = await listProductsPage({ page: 1, limit: API_PAGE_SIZE });
  return Math.max(1, Math.ceil(first.meta.total / PRODUCTS_PER_SITEMAP));
}

export async function productPathsForSitemap(sitemapPage: number) {
  const firstProductIndex = (sitemapPage - 1) * PRODUCTS_PER_SITEMAP;
  const firstApiPage = Math.floor(firstProductIndex / API_PAGE_SIZE) + 1;
  const lastApiPage = firstApiPage + PRODUCTS_PER_SITEMAP / API_PAGE_SIZE - 1;
  const first = await listProductsPage({ page: firstApiPage, limit: API_PAGE_SIZE });
  const totalApiPages = first.meta.totalPages;
  if (sitemapPage < 1 || firstApiPage > Math.max(totalApiPages, 1)) return null;

  const pages = [first];
  const remainingPages = Array.from(
    { length: Math.max(0, Math.min(lastApiPage, totalApiPages) - firstApiPage) },
    (_, index) => firstApiPage + index + 1,
  );
  for (let index = 0; index < remainingPages.length; index += 5) {
    const batch = remainingPages.slice(index, index + 5);
    pages.push(
      ...(await Promise.all(batch.map((page) => listProductsPage({ page, limit: API_PAGE_SIZE })))),
    );
  }
  return pages.flatMap((page) =>
    page.items.map((product) => `/product/${encodeURIComponent(product.slug)}`),
  );
}

export async function categoryPathsForSitemap() {
  const categories = await collectPages((page) =>
    listCategoriesPage({ page, limit: API_PAGE_SIZE, sortBy: "nameEn", sortOrder: "asc" }),
  );
  return categories
    .filter((category) => category.productCount > 0)
    .map((category) => `/categories/${encodeURIComponent(category.slug)}`);
}

export async function brandPathsForSitemap() {
  const brands = await collectPages((page) =>
    listBrandsPage({ page, limit: API_PAGE_SIZE, sortBy: "name", sortOrder: "asc" }),
  );
  return brands
    .filter((brand) => brand.productCount > 0)
    .map((brand) => `/brands/${encodeURIComponent(brand.slug)}`);
}

async function collectPages<T>(loader: (page: number) => Promise<PaginatedResult<T>>) {
  const first = await loader(1);
  const items = [...first.items];
  for (let page = 2; page <= first.meta.totalPages; page += 5) {
    const batch = Array.from(
      { length: Math.min(5, first.meta.totalPages - page + 1) },
      (_, index) => page + index,
    );
    const results = await Promise.all(batch.map(loader));
    items.push(...results.flatMap((result) => result.items));
  }
  return items;
}

function urlEntry(path: string, locale: "en" | "ar", lastmod?: string) {
  const loc = canonicalUrl(path, locale);
  return `\n  <url>\n    <loc>${escapeXml(loc)}</loc>${lastmod ? `\n    <lastmod>${escapeXml(lastmod)}</lastmod>` : ""}\n    <xhtml:link rel="alternate" hreflang="en" href="${escapeXml(canonicalUrl(path, "en"))}" />\n    <xhtml:link rel="alternate" hreflang="ar" href="${escapeXml(canonicalUrl(path, "ar"))}" />\n    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(canonicalUrl(path, "en"))}" />\n  </url>`;
}

export function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}
