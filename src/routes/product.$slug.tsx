import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Check,
  CircleHelp,
  Headphones,
  Heart,
  Leaf,
  MessageCircleQuestion,
  Minus,
  PackageCheck,
  Plus,
  RotateCcw,
  Share2,
  ShieldCheck,
  Star,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PolishedImage } from "@/components/ui/polished-image";
import { ProductCard } from "@/components/shop/ProductCard";
import { ProductReviews } from "@/components/shop/ProductReviews";
import { formatPrice } from "@/lib/products";
import { loadProduct, useCatalog, useProduct, type Locale } from "@/lib/catalog";
import { useStore } from "@/lib/store";
import { Reveal } from "@/components/motion/Primitives";

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
    reviews: "reviews",
    viewReviews: "VIEW ALL REVIEWS",
    available: "Available:",
    inStock: "In stock",
    tags: "Tags:",
    sku: "SKU:",
    category: "Category:",
    quantity: "Quantity:",
    buyNow: "Buy It Now",
    share: "Share",
    ask: "Ask a question",
    faq: "FAQ",
    benefitsTitle: "The benefits of choosing us",
    organic: "100% original products",
    sustainable: "Fast & secure delivery",
    noChemicals: "Easy returns",
    glutenFree: "Secure payments",
    ordersShip: "Orders ship within 5 to 10 business days.",
    shipsFree: "Free shipping may apply on eligible orders.",
    descriptionTab: "Description",
    deliveryPolicy: "Delivery policy",
    shippingReturn: "Shipping & Return",
    customTab: "Custom Tab",
    freeShipping: "Free Shipping",
    freeShippingCopy: "Enjoy fast delivery across Egypt with clear checkout fees.",
    returnPolicy: "Return Policy",
    returnPolicyCopy: "Returns are available within 14 days when the item is unopened.",
    support: "Support 24/7",
    supportCopy: "Send your questions and our support team will help you.",
    related: "Product Related",
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
    reviews: "مراجعات",
    viewReviews: "عرض كل المراجعات",
    available: "الحالة:",
    inStock: "متوفر",
    tags: "الوسوم:",
    sku: "SKU:",
    category: "القسم:",
    quantity: "الكمية:",
    buyNow: "اشتري الآن",
    share: "مشاركة",
    ask: "اسألي سؤال",
    faq: "الأسئلة الشائعة",
    benefitsTitle: "مميزات الاختيار من بيوريزا",
    organic: "منتجات أصلية 100%",
    sustainable: "توصيل سريع وآمن",
    noChemicals: "استرجاع سهل",
    glutenFree: "دفع آمن",
    ordersShip: "يتم شحن الطلبات خلال 5 إلى 10 أيام عمل.",
    shipsFree: "قد يتاح الشحن المجاني للطلبات المؤهلة.",
    descriptionTab: "الوصف",
    deliveryPolicy: "سياسة التوصيل",
    shippingReturn: "الشحن والاسترجاع",
    customTab: "معلومات إضافية",
    freeShipping: "شحن سريع",
    freeShippingCopy: "توصيل داخل مصر برسوم واضحة عند إتمام الطلب.",
    returnPolicy: "سياسة الاسترجاع",
    returnPolicyCopy: "الاسترجاع متاح خلال 14 يومًا إذا كان المنتج غير مفتوح.",
    support: "دعم طوال الأسبوع",
    supportCopy: "ارسلي أسئلتك وفريق الدعم يساعدك.",
    related: "منتجات مشابهة",
  },
} as const;

type ProductTab = "description" | "delivery" | "returns" | "custom";

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
  const [activeTab, setActiveTab] = useState<ProductTab>("description");
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
  const discountPercent =
    variant?.originalPrice && variant.originalPrice > variant.price
      ? Math.round((1 - variant.price / variant.originalPrice) * 100)
      : null;
  const tags = [product.type, product.category].filter(Boolean).join(", ");
  const categoryLine = [product.category, ...product.concerns].filter(Boolean).join(", ");
  const sku = variant?.id ? variant.id.slice(0, 8) : product.slug;
  const detailTabs: Array<{ id: ProductTab; label: string; content: string }> = [
    {
      id: "description",
      label: labels.descriptionTab,
      content: product.details || product.description,
    },
    { id: "delivery", label: labels.deliveryPolicy, content: labels.ordersShip },
    { id: "returns", label: labels.shippingReturn, content: labels.returnPolicyCopy },
    { id: "custom", label: labels.customTab, content: product.howToUse },
  ];
  const currentTab = detailTabs.find((tab) => tab.id === activeTab) ?? detailTabs[0]!;

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
    <div className="sf-product-page product-template-white pb-24 lg:pb-0">
      <div className="product-shell">
        <Reveal as="nav" variant="fade" distance={0} className="product-reference-breadcrumb">
          <Link to="/">{labels.home}</Link>
          <span aria-hidden="true">•</span>
          <span>{product.name}</span>
        </Reveal>

        <section className="product-reference-layout">
          <Reveal variant="scale" duration={480} distance={0} className="product-reference-gallery">
            <div key={activeImage} className="product-gallery-active product-reference-main-image">
              <PolishedImage
                src={activeImage}
                alt={product.name}
                fetchPriority="high"
                sizes="(min-width: 1200px) 49vw, 100vw"
                wrapperClassName="product-reference-image-shell"
                className="size-full object-contain"
              />
            </div>
            <div className="product-reference-thumbs">
              {product.gallery.map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  onClick={() => setImageIndex(index)}
                  aria-label={labels.image(index + 1)}
                  aria-current={imageIndex === index}
                  className="product-reference-thumb"
                >
                  <PolishedImage
                    src={image}
                    alt=""
                    loading="lazy"
                    sizes="140px"
                    wrapperClassName="product-reference-thumb-shell"
                    className="size-full object-contain"
                  />
                </button>
              ))}
            </div>
          </Reveal>

          <Reveal
            stagger
            delay={120}
            staggerMs={40}
            distance={20}
            className="product-reference-summary"
          >
            <h1>{product.name}</h1>
            <div className="product-reference-rating">
              <span className="product-reference-stars" aria-hidden="true">
                {[1, 2, 3, 4, 5].map((value) => (
                  <Star
                    key={value}
                    className={value <= Math.round(product.rating) ? "is-filled" : undefined}
                  />
                ))}
              </span>
              <span>({product.reviews})</span>
              <a href="#product-reviews">{labels.viewReviews}</a>
            </div>

            <div key={variant?.price} className="product-reference-price count-change">
              <strong>{formatPrice(variant?.price ?? product.price)}</strong>
              {variant?.originalPrice && variant.originalPrice > variant.price && (
                <>
                  <span>{formatPrice(variant.originalPrice)}</span>
                  {discountPercent ? <em>-{discountPercent}%</em> : null}
                </>
              )}
            </div>

            <p className="product-reference-description">{product.description}</p>

            <dl className="product-reference-meta">
              <div>
                <dt>{labels.available}</dt>
                <dd className={outOfStock ? "is-out" : "is-stock"}>
                  {outOfStock ? labels.out : labels.inStock}
                  {!outOfStock ? <Check className="size-4" aria-hidden="true" /> : null}
                </dd>
              </div>
              <div>
                <dt>{labels.tags}</dt>
                <dd>{tags}</dd>
              </div>
              <div>
                <dt>{labels.sku}</dt>
                <dd>{sku}</dd>
              </div>
              <div>
                <dt>{labels.category}</dt>
                <dd>{categoryLine}</dd>
              </div>
            </dl>

            {variant?.promotionTitle && (
              <p className="product-reference-promo">
                <strong>{variant.promotionTitle}</strong>
                <span>{labels.applied}</span>
              </p>
            )}
            {lowStock && !outOfStock && (
              <p className="product-reference-stock">{labels.low(variantStock)}</p>
            )}

            {product.sizes.length > 1 && (
              <fieldset className="product-reference-variants">
                <legend>{labels.variant}</legend>
                <div>
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
                      className="product-variant"
                    >
                      {item.shadeHex && (
                        <span
                          style={{ backgroundColor: item.shadeHex ?? undefined }}
                          aria-hidden="true"
                        />
                      )}
                      {item.label}
                    </button>
                  ))}
                </div>
              </fieldset>
            )}

            <div className="product-reference-quantity-label">{labels.quantity}</div>
            <div className="purchase-actions product-reference-actions">
              <div className="product-reference-quantity">
                <button
                  type="button"
                  disabled={outOfStock || quantity <= 1}
                  onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                  aria-label={labels.decrease}
                >
                  <Minus className="size-4" />
                </button>
                <span key={quantity} className="count-change">
                  {quantity}
                </span>
                <button
                  type="button"
                  disabled={outOfStock || quantity >= (variantStock ?? 99)}
                  onClick={() => setQuantity((value) => Math.min(variantStock ?? 99, value + 1))}
                  aria-label={labels.increase}
                >
                  <Plus className="size-4" />
                </button>
              </div>
              <Button
                variant="solid"
                size="pill"
                className="product-add-to-cart"
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
                  className="product-reference-wish"
                  aria-pressed={wished}
                  aria-label={wished ? labels.wishRemove : labels.wishAdd}
                >
                  <Heart className={wished ? "pop fill-gold text-gold" : ""} />
                </button>
              )}
            </div>

            <Button
              variant="quiet"
              size="pill"
              className="product-reference-buy-now"
              disabled={!variant?.id || outOfStock}
              loading={adding}
              onClick={() => void addToBag()}
            >
              {labels.buyNow}
            </Button>

            <div className="product-reference-links">
              <button type="button">
                <Share2 className="size-4" />
                {labels.share}
              </button>
              <button type="button">
                <MessageCircleQuestion className="size-4" />
                {labels.ask}
              </button>
              <button type="button">
                <CircleHelp className="size-4" />
                {labels.faq}
              </button>
            </div>

            <div className="product-reference-benefits-card">
              <p>{labels.benefitsTitle}</p>
              {[
                { label: labels.organic, icon: ShieldCheck },
                { label: labels.sustainable, icon: Leaf },
                { label: labels.noChemicals, icon: PackageCheck },
                { label: labels.glutenFree, icon: Check },
              ].map(({ label, icon: Icon }) => (
                <span key={label}>
                  <Icon aria-hidden="true" />
                  {label}
                </span>
              ))}
            </div>

            <ul className="product-reference-shipping-notes">
              <li>
                <PackageCheck className="size-5" />
                {labels.ordersShip}
              </li>
              <li>
                <Truck className="size-5" />
                {labels.shipsFree}
              </li>
            </ul>
          </Reveal>
        </section>

        <section className="product-reference-details">
          <div className="product-reference-tabs" role="tablist" aria-label={labels.details}>
            {detailTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="product-reference-tab-panel" role="tabpanel">
            <p>{currentTab.content}</p>
            {activeTab === "description" && product.benefits.length > 0 ? (
              <ul>
                {product.benefits.map((benefit) => (
                  <li key={benefit}>{benefit}</li>
                ))}
              </ul>
            ) : null}
          </div>
        </section>

        <section className="product-reference-service-strip" aria-label={labels.benefitsTitle}>
          {[
            { label: labels.freeShipping, copy: labels.freeShippingCopy, icon: Truck },
            { label: labels.returnPolicy, copy: labels.returnPolicyCopy, icon: RotateCcw },
            { label: labels.support, copy: labels.supportCopy, icon: Headphones },
          ].map(({ label, copy, icon: Icon }) => (
            <article key={label}>
              <Icon aria-hidden="true" />
              <div>
                <h3>{label}</h3>
                <p>{copy}</p>
              </div>
            </article>
          ))}
        </section>
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
      {product.id ? (
        <div id="product-reviews" className="product-reference-reviews">
          <ProductReviews productId={product.id} />
        </div>
      ) : null}
      <RelatedProducts currentSlug={product.slug} locale={locale} title={labels.related} />
    </div>
  );
}

function RelatedProducts({
  currentSlug,
  locale,
  title,
}: {
  currentSlug: string;
  locale: Locale;
  title: string;
}) {
  const related = useCatalog({ limit: 5, sortBy: "createdAt", sortOrder: "desc" }, locale);
  const products = (related.data ?? []).filter((item) => item.slug !== currentSlug).slice(0, 4);

  if (!products.length) return null;

  return (
    <section className="product-reference-related">
      <h2>{title}</h2>
      <div>
        {products.map((item) => (
          <ProductCard key={item.slug} product={item} />
        ))}
      </div>
    </section>
  );
}
