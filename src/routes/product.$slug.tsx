import { useEffect, useState } from "react";
import { createFileRoute, Link, notFound, useNavigate, useRouter } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  BadgeCheck,
  Check,
  ChevronRight,
  CircleHelp,
  Headphones,
  MessageCircleQuestion,
  Minus,
  Plus,
  RotateCcw,
  Share2,
  ShieldCheck,
  Sparkles,
  Star,
  Truck,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PolishedImage } from "@/components/ui/polished-image";
import { ProductCard } from "@/components/shop/ProductCard";
import { ProductImageViewer } from "@/components/shop/ProductImageViewer";
import {
  ProductInfoAccordion,
  type ProductInfoSection,
} from "@/components/shop/ProductInfoAccordion";
import { ProductReviews } from "@/components/shop/ProductReviews";
import { StatePanel } from "@/components/feedback/StatePanel";
import { IngredientExplorer } from "@/components/shop/IngredientExplorer";
import { WishlistPicker } from "@/components/shop/WishlistPicker";
import { formatPrice, type Product } from "@/lib/products";
import { merchandisingQuery, productQuery, useProduct } from "@/lib/catalog";
import { getRoutineAnchorEligibility, listProductReviews } from "@/lib/api";
import { useStore } from "@/lib/store";
import { trackCommerceEvent } from "@/lib/analytics";
import {
  optionValueState,
  resolveVariant,
  selectionForVariant,
  type VariantSelection,
} from "@/lib/variant-selection";
import { Reveal } from "@/components/motion/Primitives";
import {
  breadcrumbSchema,
  createSeoHead,
  jsonLd,
  productSchema,
  productTitle,
  type SeoLocale,
} from "@/lib/seo";

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
    unavailableCombination: "Unavailable with your current selection",
    soldOutValue: "Sold out",
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
    ingredientTitle: "Ingredient intelligence",
    ingredientCopy:
      "Hover or select an ingredient to see its role, benefits, concerns, and suitability from our curated catalog.",
    ingredientCount: (count: number) => `${count} mapped ingredients`,
    use: "How to use",
    reviewCount: (count: number) => (count === 1 ? "1 review" : `${count} reviews`),
    noReviews: "No reviews yet",
    inStock: "In stock, ready to ship",
    tags: "Suitable for",
    sku: "SKU",
    brand: "Brand",
    category: "Category",
    quantity: "Quantity",
    buyNow: "Buy it now",
    share: "Share",
    shared: "Link copied",
    ask: "Ask a question",
    benefitsTitle: "Why shop with BioReza",
    organic: "100% original products",
    sustainable: "Fast & secure delivery",
    noChemicals: "Easy returns",
    glutenFree: "Secure payments",
    ordersShip: "Delivery timing is calculated for your address at checkout.",
    descriptionTab: "Description",
    deliveryPolicy: "Delivery policy",
    shippingReturn: "Shipping & Return",
    customTab: "How to use",
    freeShipping: "Delivery across Egypt",
    freeShippingCopy: "Enjoy fast delivery across Egypt with clear checkout fees.",
    returnPolicy: "Return Policy",
    returnPolicyCopy: "Returns are available within 14 days when the item is unopened.",
    support: "Customer support",
    supportCopy: "Send your questions during customer-care hours and our team will help.",
    related: "You may also like",
    completeRoutine: "Complete your routine",
    completeRoutineCopy: "Build a compatible AM and PM routine around this product.",
    buildRoutine: "Build my routine",
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
    unavailableCombination: "غير متاح مع اختيارك الحالي",
    soldOutValue: "نفد المخزون",
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
    ingredientTitle: "دليل المكونات",
    ingredientCopy: "مرري المؤشر أو اختاري أي مكوّن لمعرفة دوره وفوائده ومحاذيره ومدى ملاءمته.",
    ingredientCount: (count: number) => `${count} مكوّن موثق`,
    use: "طريقة الاستخدام",
    reviewCount: (count: number) => `${count} مراجعة`,
    noReviews: "لا توجد مراجعات بعد",
    inStock: "متوفر وجاهز للشحن",
    tags: "مناسب لـ",
    sku: "SKU",
    brand: "العلامة التجارية",
    category: "القسم",
    quantity: "الكمية",
    buyNow: "اشتري الآن",
    share: "مشاركة",
    shared: "تم نسخ الرابط",
    ask: "اسألي سؤال",
    benefitsTitle: "مميزات الاختيار من بيوريزا",
    organic: "منتجات أصلية 100%",
    sustainable: "توصيل سريع وآمن",
    noChemicals: "استرجاع سهل",
    glutenFree: "دفع آمن",
    ordersShip: "تُحسب مدة التوصيل لعنوانك عند إتمام الطلب.",
    descriptionTab: "الوصف",
    deliveryPolicy: "سياسة التوصيل",
    shippingReturn: "الشحن والاسترجاع",
    customTab: "طريقة الاستخدام",
    freeShipping: "توصيل داخل مصر",
    freeShippingCopy: "توصيل داخل مصر برسوم واضحة عند إتمام الطلب.",
    returnPolicy: "سياسة الاسترجاع",
    returnPolicyCopy: "الاسترجاع متاح خلال 14 يومًا إذا كان المنتج غير مفتوح.",
    support: "خدمة العملاء",
    supportCopy: "أرسلي أسئلتك خلال ساعات خدمة العملاء وسيساعدك فريقنا.",
    related: "قد يعجبك أيضاً",
    completeRoutine: "أكملي روتينك",
    completeRoutineCopy: "كوّني روتيناً صباحياً ومسائياً متوافقاً حول هذا المنتج.",
    buildRoutine: "كوّني روتيني",
  },
} as const;

export const Route = createFileRoute("/product/$slug")({
  loader: async ({ params, context }) => {
    const locale: SeoLocale = context.locale === "ar" ? "ar" : "en";
    try {
      const product = await context.queryClient.ensureQueryData(productQuery(params.slug, locale));
      const [reviews, relatedResult] = await Promise.all([
        product.id
          ? listProductReviews(product.id).catch(() => undefined)
          : Promise.resolve(undefined),
        context.queryClient
          .ensureQueryData(
            merchandisingQuery(
              {
                section: `related-${product.id}`,
                ...(product.categorySlug ? { categorySlug: product.categorySlug } : {}),
                ...(product.id ? { excludeProductId: product.id } : {}),
                limit: 4,
              },
              locale,
            ),
          )
          .then((products) => ({ products, unavailable: false }))
          .catch(() => ({ products: [] as Product[], unavailable: true })),
      ]);
      return {
        product,
        reviews,
        related: relatedResult.products,
        relatedUnavailable: relatedResult.unavailable,
        locale,
      };
    } catch (error) {
      if (isNotFoundError(error)) throw notFound();
      throw error;
    }
  },
  head: ({ loaderData, params }) => {
    const product = loaderData?.product;
    const locale = loaderData?.locale ?? "en";
    if (!product) {
      return createSeoHead({
        title: locale === "ar" ? "المنتج غير موجود" : "Product not found",
        description: locale === "ar" ? "هذا المنتج غير متاح." : "This product is not available.",
        path: `/product/${encodeURIComponent(params.slug)}`,
        locale,
        index: false,
        follow: true,
        alternates: false,
      });
    }
    const description = product.shortDescription
      ? product.shortDescription
      : product.description
        ? product.description
        : locale === "ar"
          ? `${product.name} ضمن قسم ${product.category}. اطلعي على السعر الحالي وخيارات المنتج وحالة التوفر.`
          : `${product.name} in ${product.category}. View its current price, available variants and stock status.`;
    const path = `/product/${encodeURIComponent(product.slug)}`;
    const seo = createSeoHead({
      title: productTitle(product.name, product.brand?.name),
      description,
      path,
      locale,
      type: "product",
      image: product.image,
      index: product.sizes.length > 0,
    });
    const crumbs = [
      { name: locale === "ar" ? "الرئيسية" : "Home", path: "/" },
      { name: locale === "ar" ? "المتجر" : "Shop", path: "/shop" },
      {
        name: product.category,
        path: `/categories/${encodeURIComponent(product.categorySlug ?? product.categoryId ?? "")}`,
      },
      { name: product.name, path },
    ];
    return {
      ...seo,
      scripts: [
        jsonLd(productSchema(product, locale, loaderData?.reviews?.items ?? [])),
        jsonLd(breadcrumbSchema(crumbs, locale)),
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { slug } = Route.useParams();
  const navigate = useNavigate();
  const router = useRouter();
  const { locale, add, wishlist, pendingVariants } = useStore();
  const labels = productCopy[locale];
  const initial = Route.useLoaderData();
  const query = useProduct(slug, locale, initial.product);
  const product = query.data;
  const [variantIndex, setVariantIndex] = useState(0);
  const [variantSelection, setVariantSelection] = useState<VariantSelection>({});
  const [quantity, setQuantity] = useState(1);
  const [imageIndex, setImageIndex] = useState(0);
  const [hydrated, setHydrated] = useState(false);
  const [added, setAdded] = useState(false);
  const [buyNowLoading, setBuyNowLoading] = useState(false);
  const [shared, setShared] = useState(false);
  const firstAvailableVariant =
    product?.sizes.findIndex((item) => item.stock === undefined || item.stock > 0) ?? -1;

  useEffect(() => setHydrated(true), []);

  useEffect(() => {
    if (!product?.id) return;
    trackCommerceEvent("product_viewed", {
      productId: product.id,
      categoryId: product.categoryId,
      productSlug: product.slug,
      categorySlug: product.categorySlug,
      productName: product.name,
      categoryName: product.category,
    });
  }, [
    product?.category,
    product?.categoryId,
    product?.categorySlug,
    product?.id,
    product?.name,
    product?.slug,
  ]);

  useEffect(() => {
    const nextIndex = firstAvailableVariant >= 0 ? firstAvailableVariant : 0;
    setVariantIndex(nextIndex);
    if (product) {
      setVariantSelection(selectionForVariant(product.options ?? [], product.sizes[nextIndex]));
    }
    setImageIndex(0);
    setQuantity(1);
    setAdded(false);
  }, [firstAvailableVariant, product, slug]);

  const selectedVariant = product
    ? product.options?.length
      ? resolveVariant(product.options, product.sizes, variantSelection)
      : (product.sizes[variantIndex] ?? product.sizes[0])
    : undefined;
  const routineEligibility = useQuery({
    queryKey: ["routine-anchor-eligibility", product?.id, selectedVariant?.id, locale],
    queryFn: () => getRoutineAnchorEligibility(product!.id!, selectedVariant?.id, locale),
    enabled: Boolean(product?.id && selectedVariant?.id),
    retry: false,
    staleTime: 60_000,
  });

  useEffect(() => {
    setImageIndex(0);
    setQuantity(1);
  }, [selectedVariant?.id]);

  useEffect(() => {
    if (!routineEligibility.data?.eligible || !product?.id) return;
    trackCommerceEvent("complete_routine_cta_viewed", {
      productId: product.id,
      variantId: selectedVariant?.id,
    });
  }, [product?.id, routineEligibility.data?.eligible, selectedVariant?.id]);

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

  const variant = selectedVariant;
  const variantStock = variant?.stock;
  const outOfStock = variantStock === 0;
  const lowStock = variantStock !== undefined && variantStock > 0 && variantStock < 10;
  const wished = wishlist.includes(product.slug);
  const adding = Boolean(variant?.id && pendingVariants.includes(variant.id));
  const activeMedia = variant?.media?.length
    ? variant.media
    : product.media?.length
      ? product.media
      : product.gallery.map((url, index) => ({
          id: `legacy-${index}`,
          url,
          altText: product.imageAlt || product.name,
        }));
  const discountPercent =
    variant?.originalPrice && variant.originalPrice > variant.price
      ? Math.round((1 - variant.price / variant.originalPrice) * 100)
      : null;
  const concerns = product.concerns.filter(Boolean);
  const sku = variant?.sku;
  const detailSections = (
    [
      {
        id: "description",
        label: labels.descriptionTab,
        content: product.description,
        benefits: product.benefits,
      },
      { id: "custom", label: labels.customTab, content: product.howToUse },
      { id: "delivery", label: labels.deliveryPolicy, content: labels.ordersShip },
      { id: "returns", label: labels.shippingReturn, content: labels.returnPolicyCopy },
    ] satisfies ProductInfoSection[]
  ).filter((section) => Boolean(section.content.trim()) || section.benefits?.length);

  const addToBag = async () => {
    if (!variant?.id || outOfStock) return false;
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
    return succeeded;
  };

  const buyNow = async () => {
    if (!variant?.id || outOfStock || buyNowLoading) return;
    setBuyNowLoading(true);
    try {
      const succeeded = await addToBag();
      if (succeeded) {
        await navigate({ to: "/checkout" });
      }
    } finally {
      setBuyNowLoading(false);
    }
  };

  const shareProduct = async () => {
    const shareData = {
      title: product.name,
      text: product.shortDescription || product.description,
      url: window.location.href,
    };
    if (navigator.share) {
      await navigator.share(shareData).catch(() => undefined);
      return;
    }
    await navigator.clipboard?.writeText(window.location.href);
    setShared(true);
    window.setTimeout(() => setShared(false), 1_500);
  };

  const stockMessage = outOfStock
    ? labels.out
    : variantStock !== undefined && lowStock
      ? labels.low(variantStock)
      : labels.inStock;
  const stockTone = outOfStock ? "is-out" : lowStock ? "is-low" : "is-in";
  const stockMeter =
    variantStock !== undefined && lowStock ? Math.max(10, Math.min(100, variantStock * 10)) : null;

  return (
    <div className="sf-product-page product-template-white pdp">
      <div className="product-shell pdp-shell">
        <Reveal
          as="nav"
          variant="fade"
          distance={0}
          className="storefront-breadcrumb pdp-breadcrumb"
        >
          <Link to="/">{labels.home}</Link>
          <ChevronRight className="pdp-breadcrumb__sep" aria-hidden="true" />
          <Link to="/shop">{labels.shop}</Link>
          <ChevronRight className="pdp-breadcrumb__sep" aria-hidden="true" />
          {product.categorySlug ? (
            <Link to="/categories/$slug" params={{ slug: product.categorySlug }}>
              {product.category}
            </Link>
          ) : (
            <span>{product.category}</span>
          )}
          <ChevronRight className="pdp-breadcrumb__sep" aria-hidden="true" />
          <span aria-current="page">{product.name}</span>
        </Reveal>

        <section className="pdp-hero">
          <Reveal
            variant="scale"
            duration={480}
            distance={0}
            className="product-reference-gallery pdp-gallery"
          >
            <div className="pdp-gallery__stage">
              {discountPercent || product.promotionBadge ? (
                <div className="pdp-gallery__badges">
                  {discountPercent ? (
                    <span className="pdp-badge pdp-badge--sale">-{discountPercent}%</span>
                  ) : null}
                  {product.promotionBadge ? (
                    <span className="pdp-badge">{product.promotionBadge}</span>
                  ) : null}
                </div>
              ) : null}
              <ProductImageViewer
                images={activeMedia}
                index={imageIndex}
                onIndexChange={setImageIndex}
                locale={locale}
              />
            </div>
            {activeMedia.length > 1 ? (
              <div className="pdp-thumbs">
                {activeMedia.map((image, index) => (
                  <button
                    key={image.id}
                    type="button"
                    disabled={!hydrated}
                    onClick={() => setImageIndex(index)}
                    aria-label={labels.image(index + 1)}
                    aria-current={imageIndex === index}
                    className="pdp-thumb"
                  >
                    <PolishedImage
                      src={image.url}
                      alt={image.altText}
                      width={140}
                      height={175}
                      loading="lazy"
                      sizes="88px"
                      wrapperClassName="pdp-thumb__shell"
                      className="size-full object-contain"
                    />
                  </button>
                ))}
              </div>
            ) : null}
          </Reveal>

          <Reveal stagger delay={120} staggerMs={40} distance={20} className="pdp-summary">
            <div className="pdp-eyebrow">
              {product.brand ? (
                <Link
                  to="/brands/$slug"
                  params={{ slug: product.brand.slug }}
                  className="pdp-eyebrow__brand"
                >
                  {product.brand.name}
                </Link>
              ) : null}
              {product.categorySlug ? (
                <Link
                  to="/categories/$slug"
                  params={{ slug: product.categorySlug }}
                  className="pdp-eyebrow__category"
                >
                  {product.category}
                </Link>
              ) : (
                <span className="pdp-eyebrow__category">{product.category}</span>
              )}
            </div>

            <h1 className="pdp-title" dir="auto">
              {product.name}
            </h1>

            <a href="#product-reviews" className="pdp-rating">
              <span className="pdp-stars" aria-hidden="true">
                {[1, 2, 3, 4, 5].map((value) => (
                  <Star
                    key={value}
                    className={value <= Math.round(product.rating) ? "is-filled" : undefined}
                  />
                ))}
              </span>
              {product.reviews > 0 ? (
                <>
                  <strong>{product.rating.toFixed(1)}</strong>
                  <span>{labels.reviewCount(product.reviews)}</span>
                </>
              ) : (
                <span>{labels.noReviews}</span>
              )}
            </a>

            <div key={variant?.price} className="pdp-price count-change">
              <strong>{formatPrice(variant?.price ?? product.price)}</strong>
              {variant?.originalPrice && variant.originalPrice > variant.price ? (
                <>
                  <s>{formatPrice(variant.originalPrice)}</s>
                  {discountPercent ? (
                    <span className="pdp-price__save">
                      {labels.save} {discountPercent}%
                    </span>
                  ) : null}
                </>
              ) : null}
            </div>

            {product.shortDescription ? (
              <p className="pdp-lede" dir="auto">
                {product.shortDescription}
              </p>
            ) : null}

            {concerns.length > 0 ? (
              <dl className="pdp-chips">
                <dt>{labels.tags}</dt>
                {concerns.map((concern) => (
                  <dd key={concern} dir="auto">
                    {concern}
                  </dd>
                ))}
              </dl>
            ) : null}

            <div className="pdp-buy">
              <div className={`pdp-stock ${stockTone}`} role="status">
                <span className="pdp-stock__dot" aria-hidden="true" />
                <span>{stockMessage}</span>
              </div>
              {stockMeter !== null ? (
                <div className="pdp-stock__meter" aria-hidden="true">
                  <span style={{ width: `${stockMeter}%` }} />
                </div>
              ) : null}

              {variant?.promotionTitle ? (
                <p className="pdp-promo">
                  <Sparkles aria-hidden="true" />
                  <span>
                    <strong>{variant.promotionTitle}</strong>
                    {labels.applied}
                  </span>
                </p>
              ) : null}

              {(product.options?.length ?? 0) > 0 ? (
                <div className="pdp-options">
                  {product.options!.map((option) => (
                    <fieldset key={option.id} className="pdp-variants">
                      <legend>{option.label}</legend>
                      <div>
                        {option.values.map((value) => {
                          const valueState = optionValueState({
                            optionId: option.id,
                            valueId: value.id,
                            options: product.options!,
                            variants: product.sizes,
                            selection: variantSelection,
                          });
                          const available = valueState === "available";
                          const selected = variantSelection[option.id] === value.id;
                          const metadataHex =
                            typeof value.metadata?.["hex"] === "string" &&
                            /^#[0-9a-f]{6}$/i.test(value.metadata["hex"])
                              ? value.metadata["hex"]
                              : undefined;
                          const swatch =
                            metadataHex ??
                            product.sizes.find((item) => item.optionValueIds?.includes(value.id))
                              ?.shadeHex;
                          return (
                            <button
                              key={value.id}
                              type="button"
                              disabled={!available}
                              title={
                                valueState === "sold-out"
                                  ? labels.soldOutValue
                                  : valueState === "unavailable"
                                    ? labels.unavailableCombination
                                    : undefined
                              }
                              onClick={() => {
                                setVariantSelection((current) => ({
                                  ...current,
                                  [option.id]: value.id,
                                }));
                              }}
                              aria-pressed={selected}
                              aria-label={`${option.label}: ${value.label}${valueState === "sold-out" ? `, ${labels.soldOutValue}` : valueState === "unavailable" ? `, ${labels.unavailableCombination}` : ""}`}
                              className={`product-variant${swatch ? " has-swatch" : ""}`}
                            >
                              {swatch ? (
                                <span
                                  className="product-variant-swatch"
                                  style={{ backgroundColor: swatch }}
                                  aria-hidden="true"
                                />
                              ) : null}
                              <span className="product-variant-label">
                                {value.label}
                                {valueState === "sold-out" ? (
                                  <small>{labels.soldOutValue}</small>
                                ) : null}
                              </span>
                              {selected ? (
                                <Check
                                  className="product-variant-check"
                                  size={14}
                                  aria-hidden="true"
                                />
                              ) : null}
                            </button>
                          );
                        })}
                      </div>
                    </fieldset>
                  ))}
                </div>
              ) : product.sizes.length > 1 ? (
                <fieldset className="pdp-variants">
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
                        aria-label={`${item.label}${item.stock === 0 ? `, ${labels.out}` : ""}`}
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
              ) : null}

              <div className="pdp-buy__row">
                <div
                  className="product-reference-quantity pdp-qty"
                  role="group"
                  aria-label={labels.quantity}
                >
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
                  className="pdp-add"
                  disabled={!variant?.id || outOfStock}
                  loading={adding}
                  onClick={() => void addToBag()}
                >
                  {outOfStock ? labels.out : added ? labels.added : labels.add}
                </Button>
                {product.id && (
                  <WishlistPicker
                    productId={product.id}
                    slug={product.slug}
                    wished={wished}
                    addLabel={labels.wishAdd}
                    removeLabel={labels.wishRemove}
                  />
                )}
              </div>

              <Button
                variant="quiet"
                size="pill"
                className="pdp-buy-now"
                disabled={!variant?.id || outOfStock || buyNowLoading}
                loading={buyNowLoading}
                onClick={() => void buyNow()}
              >
                {labels.buyNow}
              </Button>

              <ul className="pdp-buy__notes">
                <li>
                  <Truck aria-hidden="true" />
                  {labels.delivery}
                </li>
                <li>
                  <Wallet aria-hidden="true" />
                  {labels.payment}
                </li>
              </ul>
            </div>

            {routineEligibility.data?.eligible && variant?.id ? (
              <aside
                className="product-routine-entry pdp-routine"
                aria-labelledby="product-routine-title"
              >
                <div>
                  <p id="product-routine-title">{labels.completeRoutine}</p>
                  <span>{labels.completeRoutineCopy}</span>
                  {routineEligibility.data.anchor?.roles.length ? (
                    <small>
                      {routineEligibility.data.anchor.roles.join(" · ")} ·{" "}
                      {routineEligibility.data.anchor.periods.join(" + ")}
                    </small>
                  ) : null}
                </div>
                <Button asChild variant="outline" size="pill">
                  <Link
                    to="/routine"
                    search={{
                      anchorProductId: product.id!,
                      anchorVariantId: variant.id!,
                    }}
                    onClick={() =>
                      trackCommerceEvent("complete_routine_cta_clicked", {
                        productId: product.id,
                        variantId: variant.id,
                      })
                    }
                  >
                    {labels.buildRoutine}
                  </Link>
                </Button>
              </aside>
            ) : null}

            <ul className="pdp-assurances" aria-label={labels.benefitsTitle}>
              {[
                { label: labels.organic, icon: BadgeCheck },
                { label: labels.sustainable, icon: Truck },
                { label: labels.noChemicals, icon: RotateCcw },
                { label: labels.glutenFree, icon: ShieldCheck },
              ].map(({ label, icon: Icon }) => (
                <li key={label}>
                  <span className="pdp-assurances__icon">
                    <Icon aria-hidden="true" />
                  </span>
                  {label}
                </li>
              ))}
            </ul>

            <dl className="pdp-specs">
              {product.brand ? (
                <div>
                  <dt>{labels.brand}</dt>
                  <dd>
                    <Link to="/brands/$slug" params={{ slug: product.brand.slug }}>
                      {product.brand.name}
                    </Link>
                  </dd>
                </div>
              ) : null}
              <div>
                <dt>{labels.category}</dt>
                <dd>
                  {product.categorySlug ? (
                    <Link to="/categories/$slug" params={{ slug: product.categorySlug }}>
                      {product.category}
                    </Link>
                  ) : (
                    product.category
                  )}
                </dd>
              </div>
              {sku ? (
                <div>
                  <dt>{labels.sku}</dt>
                  <dd dir="ltr">{sku}</dd>
                </div>
              ) : null}
            </dl>

            <div className="pdp-links">
              <button type="button" onClick={() => void shareProduct()}>
                <Share2 aria-hidden="true" />
                {shared ? labels.shared : labels.share}
              </button>
              <a
                href={`mailto:hello@bioreza.com?subject=${encodeURIComponent(
                  locale === "ar" ? `سؤال عن ${product.name}` : `Question about ${product.name}`,
                )}`}
              >
                <MessageCircleQuestion aria-hidden="true" />
                {labels.ask}
              </a>
              <a href="#product-details">
                <CircleHelp aria-hidden="true" />
                {labels.details}
              </a>
            </div>
          </Reveal>
        </section>

        {product.ingredientDetails.length > 0 || product.ingredients ? (
          <section
            className="product-ingredient-intelligence pdp-section"
            aria-labelledby="ingredient-intelligence-title"
          >
            <header>
              <div>
                <p>{labels.ingredients}</p>
                <h2 id="ingredient-intelligence-title">{labels.ingredientTitle}</h2>
              </div>
              {product.ingredientDetails.length > 0 ? (
                <span>{labels.ingredientCount(product.ingredientDetails.length)}</span>
              ) : null}
            </header>
            {product.ingredientDetails.length > 0 ? (
              <p className="product-ingredient-intelligence__intro">{labels.ingredientCopy}</p>
            ) : null}
            <IngredientExplorer
              ingredients={product.ingredientDetails}
              fallback={product.ingredients}
              locale={locale}
            />
          </section>
        ) : null}

        <section id="product-details" className="pdp-section pdp-details">
          <h2 className="pdp-section__title">{labels.details}</h2>
          <ProductInfoAccordion key={product.id} sections={detailSections} label={labels.details} />
        </section>

        <section className="pdp-services" aria-label={labels.benefitsTitle}>
          {[
            { label: labels.freeShipping, copy: labels.freeShippingCopy, icon: Truck },
            { label: labels.returnPolicy, copy: labels.returnPolicyCopy, icon: RotateCcw },
            { label: labels.support, copy: labels.supportCopy, icon: Headphones },
          ].map(({ label, copy, icon: Icon }) => (
            <article key={label}>
              <span className="pdp-services__icon">
                <Icon aria-hidden="true" />
              </span>
              <div>
                <h3>{label}</h3>
                <p>{copy}</p>
              </div>
            </article>
          ))}
        </section>
      </div>

      <div className="product-mobile-purchase">
        <div className="product-mobile-purchase__inner">
          <p className="product-mobile-purchase__price">
            {formatPrice(variant?.price ?? product.price)}
          </p>
          <Button
            variant="solid"
            size="pill"
            className="product-mobile-purchase__action"
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
          <ProductReviews
            productId={product.id}
            {...(initial.reviews ? { initialData: initial.reviews } : {})}
          />
        </div>
      ) : null}
      <RelatedProducts
        products={initial.related}
        title={labels.related}
        eyebrow={product.category}
        unavailable={initial.relatedUnavailable}
        locale={locale}
        onRetry={() => void router.invalidate()}
      />
    </div>
  );
}

function RelatedProducts({
  products,
  title,
  eyebrow,
  unavailable,
  locale,
  onRetry,
}: {
  products: Product[];
  title: string;
  eyebrow: string;
  unavailable: boolean;
  locale: "en" | "ar";
  onRetry: () => void;
}) {
  if (unavailable) {
    return (
      <StatePanel
        kind="error"
        title={
          locale === "ar"
            ? "التوصيات غير متاحة مؤقتاً"
            : "Recommendations are temporarily unavailable"
        }
        description={
          locale === "ar"
            ? "تعذر تحميل المنتجات المشابهة، لكن بقية صفحة المنتج تعمل بشكل طبيعي."
            : "Similar products could not be loaded, but the rest of this product page is still available."
        }
        action={onRetry}
        actionLabel={locale === "ar" ? "إعادة المحاولة" : "Try again"}
        className="product-reference-related"
      />
    );
  }
  if (!products.length) return null;

  return (
    <section className="product-reference-related pdp-related">
      <header className="pdp-related__header">
        <p>{eyebrow}</p>
        <h2>{title}</h2>
      </header>
      <div>
        {products.map((item) => (
          <ProductCard key={item.slug} product={item} />
        ))}
      </div>
    </section>
  );
}

function isNotFoundError(error: unknown) {
  return (
    typeof error === "object" && error !== null && "statusCode" in error && error.statusCode === 404
  );
}
