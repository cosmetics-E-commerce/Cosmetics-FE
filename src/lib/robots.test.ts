import { describe, expect, it } from "vitest";
import { robotsText } from "@/lib/robots";
import { siteOrigin } from "@/lib/seo";

describe("robots policy", () => {
  it("allows public content, restricts private/noise routes, and advertises the sitemap", () => {
    const value = robotsText();
    expect(value).toContain("Allow: /");
    expect(value).toContain("Disallow: /checkout");
    expect(value).toContain("Disallow: /*?*search=");
    expect(value).toContain(`Sitemap: ${siteOrigin()}/sitemap.xml`);
    expect(value).not.toContain("Disallow: /product");
    expect(value).not.toContain("Disallow: /categories");
  });
});
