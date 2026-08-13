import { describe, expect, it } from "vitest";
import {
  canonicalUrl,
  createSeoHead,
  jsonLd,
  pageTitle,
  productSchema,
  productTitle,
  siteOrigin,
} from "@/lib/seo";
import type { Product } from "@/lib/products";

const product: Product = {
  id: "product-1",
  categoryId: "category-1",
  categorySlug: "skin-care",
  brandId: "brand-1",
  brand: { name: "Real Brand", slug: "real-brand" },
  slug: "real-product",
  name: "Real Product",
  category: "Skin Care",
  type: "Real Brand",
  benefit: "Dry Skin",
  description: "A catalog description supplied by the business.",
  price: 125,
  rating: 4.5,
  reviews: 2,
  image: "/product.jpg",
  imageAlt: "Real Product bottle",
  gallery: ["/product.jpg"],
  sizes: [
    { id: "variant-1", sku: "SKU-REAL-1", label: "50 ml", price: 125, stock: 3 },
    { id: "variant-2", sku: "SKU-REAL-2", label: "100 ml", price: 200, stock: 0 },
  ],
  stock: 3,
  concerns: [],
  skinTypes: ["Dry Skin"],
  inStock: true,
  ingredients: "",
  ingredientDetails: [],
  howToUse: "",
  details: "A catalog description supplied by the business.",
  benefits: [],
};

describe("SEO metadata", () => {
  it("creates stable English and Arabic canonicals without preview origins", () => {
    expect(canonicalUrl("/shop", "en", 2)).toBe(`${siteOrigin()}/shop?page=2`);
    expect(canonicalUrl("/shop", "ar", 2)).toBe(`${siteOrigin()}/shop?lang=ar&page=2`);
    expect(siteOrigin()).not.toMatch(/localhost|127\.0\.0\.1/);
  });

  it("emits a self canonical and reciprocal hreflang links", () => {
    const head = createSeoHead({
      title: "Skin Care Products",
      description: "Browse real products.",
      path: "/categories/skin-care",
      locale: "ar",
    });
    expect(head.links.find((link) => link["rel"] === "canonical")?.["href"]).toBe(
      `${siteOrigin()}/categories/skin-care?lang=ar`,
    );
    expect(head.links.find((link) => link["hrefLang"] === "en")?.["href"]).toBe(
      `${siteOrigin()}/categories/skin-care`,
    );
    expect(head.links.find((link) => link["hrefLang"] === "x-default")?.["href"]).toBe(
      `${siteOrigin()}/categories/skin-care`,
    );
  });

  it("makes noindex decisions explicit and suppresses language alternates", () => {
    const head = createSeoHead({
      title: "Search results",
      description: "Internal search results.",
      path: "/shop",
      index: false,
      follow: true,
      alternates: false,
    });
    expect(head.meta.find((meta) => meta["name"] === "robots")?.["content"]).toBe("noindex,follow");
    expect(head.links.filter((link) => link["rel"] === "alternate")).toHaveLength(0);
  });

  it("keeps generated titles meaningful and bounded", () => {
    expect(pageTitle("Skin Care Products")).toContain("BIOREZA Cosmetics");
    expect(pageTitle("BIOREZA LABS Products")).toBe("BIOREZA LABS Products | BIOREZA Cosmetics");
    expect(pageTitle("A ".repeat(100)).length).toBeLessThanOrEqual(65);
    expect(pageTitle("A ".repeat(100))).toMatch(/BIOREZA Cosmetics$/);
    expect(productTitle("كريم السيراميد لدعم حاجز البشرة", "BIOREZA LABS")).toBe(
      "كريم السيراميد لدعم حاجز البشرة",
    );
  });
});

describe("structured data", () => {
  it("uses actual SKUs, brand, price and per-variant stock", () => {
    const schema = productSchema(product) as Record<string, unknown>;
    expect(schema["sku"]).toBe("SKU-REAL-1");
    expect(schema["brand"]).toEqual({ "@type": "Brand", name: "Real Brand" });
    expect(schema["offers"]).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ sku: "SKU-REAL-1", availability: "https://schema.org/InStock" }),
        expect.objectContaining({
          sku: "SKU-REAL-2",
          availability: "https://schema.org/OutOfStock",
        }),
      ]),
    );
  });

  it("does not invent a brand, rating, or SKU when data is absent", () => {
    const schema = productSchema({
      ...product,
      brand: null,
      rating: 0,
      reviews: 0,
      sizes: [{ id: "variant", label: "Standard", price: 125, stock: 1 }],
    }) as Record<string, unknown>;
    expect(schema).not.toHaveProperty("brand");
    expect(schema).not.toHaveProperty("aggregateRating");
    expect(schema).not.toHaveProperty("sku");
  });

  it("escapes HTML-significant characters in JSON-LD scripts", () => {
    expect(jsonLd({ value: "</script>" }).children).toContain("\\u003c/script>");
  });
});
