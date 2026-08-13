import { describe, expect, it } from "vitest";
import { siteOrigin } from "@/lib/seo";
import { sitemapIndexXml, urlsetXml } from "@/lib/sitemap";

describe("sitemap XML", () => {
  it("lists both language URLs with reciprocal alternates and escaped queries", () => {
    const xml = urlsetXml([{ path: "/product/cleanser" }]);
    expect(xml).toContain(`${siteOrigin()}/product/cleanser`);
    expect(xml).toContain(`${siteOrigin()}/product/cleanser?lang=ar`.replace("&", "&amp;"));
    expect(xml).toContain('hreflang="x-default"');
    expect(xml).not.toContain("<lastmod>");
  });

  it("escapes sitemap-index query parameters", () => {
    const xml = sitemapIndexXml(["/sitemaps/products.xml?page=1&batch=active"]);
    expect(xml).toContain("?page=1&amp;batch=active");
  });
});
