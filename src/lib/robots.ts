import { siteOrigin } from "@/lib/seo";

export function robotsText() {
  return [
    "User-agent: *",
    "Allow: /",
    "Disallow: /account",
    "Disallow: /cart",
    "Disallow: /checkout",
    "Disallow: /forgot-password",
    "Disallow: /login",
    "Disallow: /order-confirmed",
    "Disallow: /register",
    "Disallow: /sign-in",
    "Disallow: /verify-email",
    "Disallow: /wishlist/",
    "Disallow: /api/",
    "Disallow: /*?*search=",
    "Disallow: /*?*sort=",
    "Disallow: /*?*view=",
    "Disallow: /*?*concern=",
    `Sitemap: ${siteOrigin()}/sitemap.xml`,
    "",
  ].join("\n");
}
