import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Heart, Minus, Plus, RotateCcw, Truck } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { PolishedImage } from "@/components/ui/polished-image";
import { IngredientExplorer } from "@/components/shop/IngredientExplorer";
import { ProductReviews } from "@/components/shop/ProductReviews";
import { formatPrice } from "@/lib/products";
import { loadProduct, useProduct } from "@/lib/catalog";
import { useStore } from "@/lib/store";
import { Reveal, TextReveal } from "@/components/motion/Primitives";

const productCopy = {
  en: {
    home: "Home",
    shop: "Shop",
    unavailable: "Product unavailable",
    unavailableCopy: "This product may be unpublished or the store may be temporarily offline.",
    retry: "Try again",
    return: "Return to shop",
    image: (index: number) => `View product image ${index}`,
    save: "Save",
    applied: "Applied automatically in your bag while eligible.",
    out: "Out of stock",
    low: (stock: number) => `Low stock · ${stock} remaining`,
    variant: "Variant",
    decrease: "Decrease quantity",
    increase: "Increase quantity",
    add: "Add to bag",
    added: "Added to bag",
    addedShort: "Added",
    wishAdd: "Add to wishlist",
    wishRemove: "Remove from wishlist",
    live: "Live catalog item",
    delivery: "Delivery calculated for your Egyptian address",
    payment: "Cash on delivery and manual transfer available",
    details: "Product details",
    ingredients: "Ingredients",
    use: "How to use",
  },
  ar: {
    home: "الرئيسية",
    shop: "المتجر",
    unavailable: "المنتج غير متاح",
    unavailableCopy: "قد يكون المنتج غير منشور أو المتجر غير متاح مؤقتاً.",
    retry: "حاولي مرة أخرى",
    return: "العودة إلى المتجر",
    image: (index: number) => `عرض صورة المنتج ${index}`,
    save: "وفّري",
    applied: "يُطبّق تلقائياً في حقيبتك عند استيفاء الشروط.",
    out: "نفد المخزون",
    low: (stock: number) => `مخزون محدود · متبقي ${stock}`,
    variant: "الخيار",
    decrease: "تقليل الكمية",
    increase: "زيادة الكمية",
    add: "أضيفي إلى الحقيبة",
    added: "تمت الإضافة إلى الحقيبة",
    addedShort: "تمت الإضافة",
    wishAdd: "إضافة إلى المفضلة",
    wishRemove: "إزالة من المفضلة",
    live: "متوفر الآن في المتجر",
    delivery: "يُحسب التوصيل حسب عنوانك في مصر",
    payment: "الدفع عند الاستلام والتحويل اليدوي متاحان",
    details: "تفاصيل المنتج",
    ingredients: "المكونات",
    use: "طريقة الاستخدام",
  },
} as const;

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params, context }) => loadProduct(params.slug, context.locale === "ar" ? "ar" : "en"),
  head: ({ loaderData, params }) => {
    const product = loaderData;
    const site = (
      (import.meta.env["VITE_SITE_URL"] as string | undefined) ?? "https://bioreza.com"
    ).replace(/\/$/, "");
    const canonical = `${site}/product/${encodeURIComponent(params.slug)}`;
    if (!product) return { meta: [{ title: "Product — BIOREZA Cosmetics" }] };
    const description = product.description.slice(0, 160);
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.name,
      description,
      image: product.gallery,
      sku: product.sizes[0]?.id,
      brand: { "@type": "Brand", name: product.type },
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "EGP",
        lowPrice: Math.min(...product.sizes.map((variant) => variant.price)),
        highPrice: Math.max(...product.sizes.map((variant) => variant.price)),
        availability: product.inStock
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
        url: canonical,
      },
      ...(product.reviews > 0
        ? {
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: product.rating,
              reviewCount: product.reviews,
            },
          }
        : {}),
    };
    const breadcrumbData = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site },
        { "@type": "ListItem", position: 2, name: "Shop", item: `${site}/shop` },
        { "@type": "ListItem", position: 3, name: product.name, item: canonical },
      ],
    };
    return {
      meta: [
        { title: `${product.name} — BIOREZA Cosmetics` },
        { name: "description", content: description },
        { property: "og:title", content: `${product.name} — BIOREZA Cosmetics` },
        { property: "og:description", content: description },
        { property: "og:type", content: "product" },
        { property: "og:image", content: product.image },
      ],
      links: [
        { rel: "canonical", href: canonical },
        { rel: "alternate", hrefLang: "en", href: `${canonical}?lang=en` },
        { rel: "alternate", hrefLang: "ar", href: `${canonical}?lang=ar` },
        { rel: "alternate", hrefLang: "x-default", href: canonical },
      ],
      scripts: [
        { type: "application/ld+json", children: JSON.stringify(structuredData) },
        { type: "application/ld+json", children: JSON.stringify(breadcrumbData) },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { slug } = Route.useParams();
  const { locale, add, wishlist, toggleWish, pendingVariants } = useStore();
  const labels = productCopy[locale];
  const initialProduct = Route.useLoaderData();
  const query = useProduct(slug, locale, initialProduct);
  const product = query.data;
  const [variantIndex, setVariantIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [imageIndex, setImageIndex] = useState(0);
  const [added, setAdded] = useState(false);
  const firstAvailableVariant =
    product?.sizes.findIndex((item) => item.stock === undefined || item.stock > 0) ?? -1;

  useEffect(() => {
    setVariantIndex(firstAvailableVariant >= 0 ? firstAvailableVariant : 0);
    setImageIndex(0);
    setQuantity(1);
    setAdded(false);
  }, [firstAvailableVariant, slug]);

  useEffect(() => {
    if (!added) return;
    const timer = window.setTimeout(() => setAdded(false), 1400);
    return () => window.clearTimeout(timer);
  }, [added]);

  if (query.isLoading) {
    return (
      <div className="mx-auto min-h-[70vh] max-w-[1560px] px-5 py-14 md:px-10">
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="aspect-[4/5] animate-pulse bg-stone" />
          <div className="space-y-6 pt-10">
            <div className="h-4 w-28 animate-pulse bg-stone" />
            <div className="h-14 w-3/4 animate-pulse bg-stone" />
            <div className="h-24 animate-pulse bg-stone" />
          </div>
        </div>
      </div>
    );
  }

  if (!product || query.error) {
    return (
      <div className="mx-auto max-w-xl px-5 py-28 text-center">
        <h1 className="font-serif text-4xl">{labels.unavailable}</h1>
        <p className="mt-4 text-muted-foreground">{labels.unavailableCopy}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {query.error && (
            <Button type="button" variant="solid" size="pill" onClick={() => void query.refetch()}>
              {labels.retry}
            </Button>
          )}
          <Button asChild variant="quiet" size="pill">
            <Link to="/shop">{labels.return}</Link>
          </Button>
        </div>
      </div>
    );
  }

  const variant = product.sizes[variantIndex] ?? product.sizes[0];
  const variantStock = variant?.stock;
  const outOfStock = variantStock === 0;
  const lowStock = variantStock !== undefined && variantStock > 0 && variantStock < 10;
  const wished = wishlist.includes(product.slug);
  const adding = Boolean(variant?.id && pendingVariants.includes(variant.id));
  const activeImage = product.gallery[imageIndex] ?? product.image;

  const addToBag = async () => {
    if (!variant?.id || outOfStock) return;
    const succeeded = await add({
      variantId: variant.id,
      productId: product.id,
      categoryId: product.categoryId,
      brandId: product.brandId,
      slug: product.slug,
      name: product.name,
      image: product.image,
      size: variant.label,
      price: variant.price,
      qty: quantity,
    });
    if (succeeded) setAdded(true);
  };

  return (
    <div className="sf-product-page pb-24 lg:pb-0">
      <div className="mx-auto max-w-[1560px] px-5 py-10 md:px-10">
        <Reveal
          as="nav"
          variant="fade"
          distance={0}
          className="label-xs text-taupe"
          aria-label="Breadcrumb"
        >
          <Link to="/">{labels.home}</Link> / <Link to="/shop">{labels.shop}</Link> / {product.name}
        </Reveal>

        <div className="mt-10 grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <Reveal
            variant="scale"
            duration={480}
            distance={0}
            className="grid gap-5 md:grid-cols-[84px_1fr]"
          >
            <div className="no-scrollbar order-2 flex gap-3 overflow-x-auto md:order-1 md:flex-col">
              {product.gallery.map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  onClick={() => setImageIndex(index)}
                  aria-label={labels.image(index + 1)}
                  aria-current={imageIndex === index}
                  className={`shrink-0 border transition-colors duration-200 ${
                    imageIndex === index ? "border-gold" : "border-border hover:border-taupe"
                  }`}
                >
                  <PolishedImage
                    src={image}
                    alt=""
                    loading="lazy"
                    sizes="80px"
                    wrapperClassName="aspect-[3/4] w-20"
                    className="size-full object-cover"
                  />
                </button>
              ))}
            </div>
            <div key={activeImage} className="product-gallery-active order-1 bg-ivory md:order-2">
              <PolishedImage
                src={activeImage}
                alt={product.name}
                fetchPriority="high"
                sizes="(min-width: 1024px) 46vw, 100vw"
                wrapperClassName="aspect-[4/5] w-full"
                className="size-full object-cover"
              />
            </div>
          </Reveal>

          <Reveal
            stagger
            delay={140}
            staggerMs={45}
            distance={22}
            className="product-purchase-panel lg:sticky lg:self-start lg:pt-6"
          >
            <p className="label-xs text-gold">BIOREZA · {product.type}</p>
            <TextReveal
              as="h1"
              className="display mt-5 text-[clamp(2.2rem,4vw,3.4rem)]"
              lines={[product.name]}
              delay={100}
            />
            <p className="mt-7 max-w-md leading-relaxed text-muted-foreground">
              {product.description}
            </p>
            <div
              key={variant?.price}
              className="count-change mt-8 flex flex-wrap items-baseline gap-3"
            >
              <p className="font-serif text-3xl text-gold">
                {formatPrice(variant?.price ?? product.price)}
              </p>
              {variant?.originalPrice && variant.originalPrice > variant.price && (
                <>
                  <p className="font-serif text-xl text-taupe line-through">
                    {formatPrice(variant.originalPrice)}
                  </p>
                  <span className="label-xs border border-gold px-2 py-1 text-gold">
                    {labels.save} {Math.round((1 - variant.price / variant.originalPrice) * 100)}%
                  </span>
                </>
              )}
            </div>
            {variant?.promotionTitle && (
              <p className="mt-4 border-s-2 border-gold bg-ivory px-4 py-3 text-sm">
                <strong>{variant.promotionTitle}</strong>
                <span className="mt-1 block text-muted-foreground">{labels.applied}</span>
              </p>
            )}
            {outOfStock && (
              <p className="label-xs mt-4 inline-flex border border-red-300 bg-red-50 px-3 py-2 text-red-700">
                {labels.out}
              </p>
            )}
            {lowStock && (
              <p className="label-xs mt-4 inline-flex border border-amber-300 bg-amber-50 px-3 py-2 text-amber-800">
                {labels.low(variantStock)}
              </p>
            )}

            <fieldset className="mt-10">
              <legend className="label-xs text-taupe">{labels.variant}</legend>
              <div className="mt-4 flex flex-wrap gap-3">
                {product.sizes.map((item, index) => (
                  <button
                    key={item.id ?? item.label}
                    type="button"
                    disabled={item.stock === 0}
                    onClick={() => {
                      setVariantIndex(index);
                      setQuantity(1);
                    }}
                    aria-pressed={variantIndex === index}
                    aria-label={`${item.label}${item.stock === 0 ? ", out of stock" : ""}`}
                    className={`product-variant label-xs min-h-11 border px-5 transition-[border-color,color,background-color,transform] duration-200 disabled:cursor-not-allowed disabled:opacity-40 ${
                      variantIndex === index
                        ? "border-ink bg-ink text-warm-white"
                        : "border-border hover:border-taupe"
                    }`}
                  >
                    {item.shadeHex && (
                      <span
                        className="me-2 inline-block size-3 rounded-full border"
                        style={{ backgroundColor: item.shadeHex ?? undefined }}
                        aria-hidden="true"
                      />
                    )}
                    {item.label}
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="purchase-actions mt-8 flex flex-wrap items-center gap-4">
              <div className="flex items-center border border-border">
                <button
                  type="button"
                  disabled={outOfStock || quantity <= 1}
                  onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                  aria-label={labels.decrease}
                  className="grid size-12 place-items-center text-taupe hover:text-gold disabled:cursor-not-allowed disabled:opacity-35"
                >
                  <Minus className="size-4" />
                </button>
                <span key={quantity} className="count-change w-10 text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  disabled={outOfStock || quantity >= (variantStock ?? 99)}
                  onClick={() => setQuantity((value) => Math.min(variantStock ?? 99, value + 1))}
                  aria-label={labels.increase}
                  className="grid size-12 place-items-center text-taupe hover:text-gold disabled:cursor-not-allowed disabled:opacity-35"
                >
                  <Plus className="size-4" />
                </button>
              </div>
              <Button
                variant="solid"
                size="pill"
                className="product-add-to-cart min-w-[220px] flex-1"
                disabled={!variant?.id || outOfStock}
                loading={adding}
                onClick={() => void addToBag()}
              >
                {outOfStock ? labels.out : added ? labels.added : labels.add}
              </Button>
              {product.id && (
                <button
                  type="button"
                  onClick={() => void toggleWish(product.id!, product.slug)}
                  className="grid size-12 place-items-center border border-border text-taupe transition-[border-color,color,transform] duration-200 hover:border-gold hover:text-gold active:scale-95"
                  aria-pressed={wished}
                  aria-label={wished ? labels.wishRemove : labels.wishAdd}
                >
                  <Heart className={wished ? "pop fill-gold text-gold" : ""} />
                </button>
              )}
            </div>

            <ul className="mt-8 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-3">
                <Check className="size-4 text-gold" />
                {labels.live}
              </li>
              <li className="flex items-center gap-3">
                <Truck className="size-4 text-gold" />
                {labels.delivery}
              </li>
              <li className="flex items-center gap-3">
                <RotateCcw className="size-4 text-gold" />
                {labels.payment}
              </li>
            </ul>

            <Accordion type="single" collapsible className="mt-12 border-t border-border">
              {[
                [labels.details, product.details],
                [labels.ingredients, product.ingredients],
                [labels.use, product.howToUse],
              ].map(([title, content]) => (
                <AccordionItem key={title} value={title ?? "details"}>
                  <AccordionTrigger>{title}</AccordionTrigger>
                  <AccordionContent className="leading-relaxed text-muted-foreground">
                    {title === labels.ingredients ? (
                      <IngredientExplorer
                        ingredients={product.ingredientDetails}
                        {...(content !== undefined ? { fallback: content } : {})}
                      />
                    ) : (
                      content
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-warm-white px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-12px_30px_-24px_rgba(0,0,0,0.4)] lg:hidden">
        <div className="mx-auto flex max-w-lg items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate font-serif text-lg">{product.name}</p>
            <p className="font-serif text-gold">
              {formatPrice(variant?.price ?? product.price)}
              {variant?.originalPrice && variant.originalPrice > variant.price && (
                <span className="ms-2 text-sm text-taupe line-through">
                  {formatPrice(variant.originalPrice)}
                </span>
              )}
            </p>
          </div>
          <Button
            variant="solid"
            size="pill"
            className="h-12 shrink-0 px-6"
            loading={adding}
            disabled={!variant?.id || outOfStock}
            onClick={() => void addToBag()}
          >
            {outOfStock ? labels.out : added ? labels.addedShort : labels.add}
          </Button>
        </div>
      </div>
      {product.id ? <ProductReviews productId={product.id} /> : null}
    </div>
  );
}
