import type { ProductReview } from "@/lib/api";
import type { Product } from "@/lib/products";
import { siteConfig } from "@/lib/site-config";

export type SeoLocale = "en" | "ar";
export type SeoPageType = "website" | "article" | "product";

export const SITE_NAME = "BIOREZA Cosmetics";
export const DEFAULT_SITE_ORIGIN = "https://bioreza.com";
export const DEFAULT_SOCIAL_IMAGE = "/brand/bioreza-og.jpg";

type SeoOptions = {
  title: string;
  description: string;
  path: string;
  locale?: SeoLocale;
  page?: number | undefined;
  index?: boolean;
  follow?: boolean;
  type?: SeoPageType;
  image?: string | null | undefined;
  alternates?: boolean;
  prevPath?: string | undefined;
  nextPath?: string | undefined;
};

type Breadcrumb = { name: string; path: string };

function configuredOrigin() {
  const configured = (import.meta.env["VITE_SITE_URL"] as string | undefined)?.trim();
  if (!configured) return DEFAULT_SITE_ORIGIN;

  try {
    const url = new URL(configured);
    if (!/^https?:$/.test(url.protocol)) return DEFAULT_SITE_ORIGIN;
    if (import.meta.env.PROD && ["localhost", "127.0.0.1", "0.0.0.0"].includes(url.hostname)) {
      return DEFAULT_SITE_ORIGIN;
    }
    return url.origin;
  } catch {
    return DEFAULT_SITE_ORIGIN;
  }
}

export function siteOrigin() {
  return configuredOrigin().replace(/\/$/, "");
}

export function absoluteUrl(pathOrUrl: string) {
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  if (pathOrUrl.startsWith("//")) return `https:${pathOrUrl}`;
  const path = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
  return `${siteOrigin()}${path}`;
}

export function localizePath(path: string, locale: SeoLocale = "en", page?: number) {
  const url = new URL(path, siteOrigin());
  const parameters = new URLSearchParams();
  if (locale === "ar") parameters.set("lang", "ar");
  if (page && page > 1) parameters.set("page", String(page));
  const query = parameters.toString();
  return `${url.pathname}${query ? `?${query}` : ""}`;
}

export function canonicalUrl(path: string, locale: SeoLocale = "en", page?: number) {
  return absoluteUrl(localizePath(path, locale, page));
}

export function pageTitle(subject: string) {
  const normalized = cleanText(subject);
  if (!normalized) return SITE_NAME;
  if (normalized.toLowerCase().includes(SITE_NAME.toLowerCase())) return truncate(normalized, 65);
  const suffix = ` | ${SITE_NAME}`;
  return `${truncate(normalized, 65 - suffix.length)}${suffix}`;
}

export function productTitle(name: string, brand?: string | null) {
  const branded = [cleanText(name), cleanText(brand ?? "")].filter(Boolean).join(" | ");
  return `${branded} | ${SITE_NAME}`.length <= 65 ? branded : cleanText(name);
}

export function metaDescription(value: string) {
  return truncate(cleanText(value), 160);
}

export function createSeoHead(options: SeoOptions) {
  const locale = options.locale ?? "en";
  const index = options.index ?? true;
  const follow = options.follow ?? true;
  const canonical = canonicalUrl(options.path, locale, options.page);
  const title = pageTitle(options.title);
  const description = metaDescription(options.description);
  const image = absoluteUrl(options.image || DEFAULT_SOCIAL_IMAGE);
  const robots = index
    ? `${follow ? "index,follow" : "index,nofollow"},max-image-preview:large,max-snippet:-1,max-video-preview:-1`
    : `noindex,${follow ? "follow" : "nofollow"}`;

  const meta: Array<Record<string, string>> = [
    { title },
    { name: "description", content: description },
    { name: "robots", content: robots },
    { name: "googlebot", content: robots },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: options.type ?? "website" },
    { property: "og:url", content: canonical },
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:locale", content: locale === "ar" ? "ar_EG" : "en_US" },
    { property: "og:image", content: image },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: image },
  ];

  const links: Array<Record<string, string>> = [{ rel: "canonical", href: canonical }];
  if (options.alternates !== false && index) {
    links.push(
      { rel: "alternate", hrefLang: "en", href: canonicalUrl(options.path, "en", options.page) },
      { rel: "alternate", hrefLang: "ar", href: canonicalUrl(options.path, "ar", options.page) },
      {
        rel: "alternate",
        hrefLang: "x-default",
        href: canonicalUrl(options.path, "en", options.page),
      },
    );
  }
  if (options.prevPath) links.push({ rel: "prev", href: absoluteUrl(options.prevPath) });
  if (options.nextPath) links.push({ rel: "next", href: absoluteUrl(options.nextPath) });

  return { meta, links };
}

export function createNoindexHead(
  title: string,
  path: string,
  locale: SeoLocale = "en",
  description = "This page is not included in public search results.",
) {
  return createSeoHead({
    title,
    description,
    path,
    locale,
    index: false,
    follow: false,
    alternates: false,
  });
}

export function jsonLd(data: unknown) {
  return {
    type: "application/ld+json",
    children: JSON.stringify(data).replace(/</g, "\\u003c"),
  };
}

export function organizationGraph() {
  const origin = siteOrigin();
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${origin}/#organization`,
        name: SITE_NAME,
        url: origin,
        logo: {
          "@type": "ImageObject",
          url: absoluteUrl("/brand/bioreza-lockup-dark.png"),
        },
        email: "hello@bioreza.com",
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer support",
          email: "hello@bioreza.com",
          telephone: siteConfig.customerCare.phoneE164,
          availableLanguage: ["English", "Arabic"],
        },
      },
      {
        "@type": "WebSite",
        "@id": `${origin}/#website`,
        url: origin,
        name: SITE_NAME,
        publisher: { "@id": `${origin}/#organization` },
        inLanguage: ["en", "ar"],
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${origin}/shop?search={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };
}

export function breadcrumbSchema(items: Breadcrumb[], locale: SeoLocale = "en") {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: canonicalUrl(item.path, locale),
    })),
  };
}

export function faqPageSchema(items: ReadonlyArray<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function itemListSchema(
  name: string,
  products: Product[],
  locale: SeoLocale = "en",
  offset = 0,
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: offset + index + 1,
      url: canonicalUrl(`/product/${encodeURIComponent(product.slug)}`, locale),
      name: product.name,
      image: absoluteUrl(product.image),
    })),
  };
}

export function productSchema(
  product: Product,
  locale: SeoLocale = "en",
  reviews: ProductReview[] = [],
) {
  const url = canonicalUrl(`/product/${encodeURIComponent(product.slug)}`, locale);
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${url}#product`,
    mainEntityOfPage: url,
    name: product.name,
    image: [...new Set(product.gallery.map(absoluteUrl))],
    category: product.category,
    url,
  };

  const description = product.shortDescription || product.description;
  if (description) schema["description"] = metaDescription(description);
  if (product.brand?.name) schema["brand"] = { "@type": "Brand", name: product.brand.name };
  const sku = product.sizes.find((variant) => variant.sku)?.sku;
  if (sku) schema["sku"] = sku;

  const offers = product.sizes
    .filter((variant) => Number.isFinite(variant.price))
    .map((variant) => ({
      "@type": "Offer",
      ...(variant.sku ? { sku: variant.sku } : {}),
      name: variant.label,
      price: variant.price.toFixed(2),
      priceCurrency: "EGP",
      availability:
        variant.stock === undefined || variant.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
      url,
    }));
  if (offers.length) schema["offers"] = offers.length === 1 ? offers[0] : offers;

  if (product.reviews > 0 && product.rating > 0) {
    schema["aggregateRating"] = {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviews,
    };
  }

  const approvedReviews = reviews
    .filter((review) => review.status === "APPROVED")
    .slice(0, 10)
    .map((review) => ({
      "@type": "Review",
      author: {
        "@type": "Person",
        name: `${review.author.firstName} ${review.author.lastInitial}.`,
      },
      datePublished: review.createdAt,
      reviewRating: { "@type": "Rating", ratingValue: review.rating, bestRating: 5 },
      ...(review.title ? { name: review.title } : {}),
      ...(review.body ? { reviewBody: review.body } : {}),
    }));
  if (approvedReviews.length) schema["review"] = approvedReviews;

  if (product.skinTypes.length) {
    schema["additionalProperty"] = [
      {
        "@type": "PropertyValue",
        name: locale === "ar" ? "نوع البشرة" : "Skin type",
        value: product.skinTypes.join(", "),
      },
    ];
  }
  return schema;
}

export function verificationMeta() {
  const google = (import.meta.env["VITE_GOOGLE_SITE_VERIFICATION"] as string | undefined)?.trim();
  const bing = (import.meta.env["VITE_BING_SITE_VERIFICATION"] as string | undefined)?.trim();
  return [
    ...(google ? [{ name: "google-site-verification", content: google }] : []),
    ...(bing ? [{ name: "msvalidate.01", content: bing }] : []),
  ];
}

function cleanText(value: string) {
  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function truncate(value: string, limit: number) {
  if (value.length <= limit) return value;
  const shortened = value.slice(0, limit - 1);
  const wordBoundary = shortened.lastIndexOf(" ");
  return `${shortened.slice(0, wordBoundary > limit * 0.65 ? wordBoundary : limit - 1).trim()}…`;
}
