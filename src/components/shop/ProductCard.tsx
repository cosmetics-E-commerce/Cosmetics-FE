import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { Stars } from "@/components/brand/Stars";
import { PolishedImage } from "@/components/ui/polished-image";
import { QuickAddToolbar } from "@/components/shop/QuickAddToolbar";
import { selectProductCardImages } from "@/components/shop/product-card-media";
import { formatPrice, type Product } from "@/lib/products";
import { useStore } from "@/lib/store";

const cardCopy = {
  en: {
    out: "Out of stock",
    view: (name: string, price: string) => `View ${name}, ${price}`,
    wishAdd: (name: string) => `Add ${name} to wishlist`,
    wishRemove: (name: string) => `Remove ${name} from wishlist`,
  },
  ar: {
    out: "غير متوفر",
    view: (name: string, price: string) => `عرض ${name}، ${price}`,
    wishAdd: (name: string) => `إضافة ${name} إلى المفضلة`,
    wishRemove: (name: string) => `إزالة ${name} من المفضلة`,
  },
} as const;

export function ProductCard({
  product,
  compact = false,
  layout = "grid",
}: {
  product: Product;
  compact?: boolean;
  layout?: "grid" | "list";
}) {
  const { locale, wishlist, toggleWish } = useStore();
  const labels = cardCopy[locale];
  const wished = wishlist.includes(product.slug);
  const variant =
    product.sizes.find((item) => item.stock === undefined || item.stock > 0) ?? product.sizes[0];
  const outOfStock = product.inStock === false || !variant || variant.stock === 0;
  const { primary: primaryImage, secondary: secondaryImage } = selectProductCardImages(product);
  const mediaRef = useRef<HTMLDivElement>(null);
  const secondaryImageRef = useRef<HTMLImageElement>(null);
  const mountedRef = useRef(true);
  const [secondaryReady, setSecondaryReady] = useState(false);

  const prepareSecondary = useCallback((image: HTMLImageElement | null, loadIfNeeded = false) => {
    if (!image) return;
    if (!image.complete) {
      if (loadIfNeeded) image.loading = "eager";
      return;
    }
    if (image.naturalWidth <= 0 || image.naturalHeight <= 0) return;

    const markReady = () => {
      if (mountedRef.current && secondaryImageRef.current === image) setSecondaryReady(true);
    };

    if (typeof image.decode === "function") void image.decode().then(markReady, markReady);
    else markReady();
  }, []);

  useEffect(() => {
    setSecondaryReady(false);
    prepareSecondary(secondaryImageRef.current);
  }, [prepareSecondary, secondaryImage]);

  useEffect(() => {
    const media = mediaRef.current;
    if (!secondaryImage || !media || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        prepareSecondary(secondaryImageRef.current, true);
        observer.disconnect();
      },
      { rootMargin: "720px 0px" },
    );
    observer.observe(media);
    return () => observer.disconnect();
  }, [prepareSecondary, secondaryImage]);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const preloadSecondary = useCallback(() => {
    if (!secondaryImage || secondaryReady) return;
    if (
      typeof window !== "undefined" &&
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches
    )
      return;
    prepareSecondary(secondaryImageRef.current, true);
  }, [prepareSecondary, secondaryImage, secondaryReady]);

  return (
    <article
      className={`product-card sf-product-card group relative h-full ${
        layout === "list"
          ? "sf-product-card--list grid grid-cols-[7rem_minmax(0,1fr)] gap-4 border-b border-border pb-6 sm:grid-cols-[12rem_minmax(0,1fr)] sm:gap-7"
          : "flex flex-col"
      }`}
      data-layout={layout}
      onPointerEnter={preloadSecondary}
      onFocusCapture={preloadSecondary}
    >
      <div className="product-card__purchase relative min-w-0">
        <div
          ref={mediaRef}
          className="product-card-media sf-product-card__media relative overflow-hidden"
          data-has-secondary={secondaryImage ? "true" : "false"}
          data-secondary-ready={secondaryReady ? "true" : "false"}
        >
          <ProductLink
            product={product}
            ariaLabel={product.name}
            className="product-card-media__link"
          >
            <PolishedImage
              src={primaryImage}
              alt={product.imageAlt || product.name}
              width={800}
              height={1000}
              loading="lazy"
              decoding="async"
              sizes={
                layout === "list"
                  ? "(min-width: 640px) 12rem, 7rem"
                  : "(min-width: 1280px) 24vw, (min-width: 768px) 33vw, 50vw"
              }
              wrapperClassName="product-card-layer product-card-primary"
              className="product-card-image product-card-image--primary"
            />
            {secondaryImage ? (
              <PolishedImage
                ref={secondaryImageRef}
                src={secondaryImage}
                alt=""
                aria-hidden="true"
                width={800}
                height={1000}
                loading="lazy"
                decoding="async"
                fetchPriority="low"
                sizes={
                  layout === "list"
                    ? "(min-width: 640px) 12rem, 7rem"
                    : "(min-width: 1280px) 24vw, (min-width: 768px) 33vw, 50vw"
                }
                onLoad={(event) => {
                  prepareSecondary(event.currentTarget);
                }}
                onError={() => setSecondaryReady(false)}
                wrapperClassName="product-card-layer product-card-secondary"
                className="product-card-image product-card-image--secondary"
              />
            ) : null}
          </ProductLink>
          {product.id && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                void toggleWish(product.id!, product.slug);
              }}
              aria-label={wished ? labels.wishRemove(product.name) : labels.wishAdd(product.name)}
              aria-pressed={wished}
              className="sf-product-card__wish"
            >
              <Heart className="sf-product-card__wish-icon" strokeWidth={1.8} aria-hidden="true" />
            </button>
          )}
          {outOfStock && (
            <span className="sf-product-card__badge sf-product-card__badge--stock absolute start-3 top-3">
              {labels.out}
            </span>
          )}
          {product.promotionBadge && !outOfStock && (
            <span className="sf-product-card__badge sf-product-card__badge--sale absolute start-3 top-3">
              {product.promotionBadge}
            </span>
          )}
        </div>
        <QuickAddToolbar product={product} variant={variant} outOfStock={outOfStock} />
      </div>
      <div
        className={`product-card__info sf-product-card__info flex min-w-0 flex-1 flex-col ${layout === "list" ? "py-2" : "pt-4"}`}
      >
        <p className="sf-product-card__category">{product.category}</p>
        <h3 className="sf-product-card__title" dir="auto">
          <ProductLink product={product} className="transition-colors hover:text-gold">
            {product.name}
          </ProductLink>
        </h3>
        {!compact && product.benefit ? (
          <p className="sf-product-card__benefit line-clamp-2" dir="auto">
            {product.benefit}
          </p>
        ) : null}
        {product.rating > 0 && (
          <div className="sf-product-card__rating flex items-center gap-2">
            <Stars value={product.rating} />
            <span className="text-xs text-muted-foreground">({product.reviews})</span>
          </div>
        )}
        <div className="sf-product-card__footer mt-auto flex items-end justify-between gap-3">
          <ProductLink
            product={product}
            ariaLabel={labels.view(product.name, formatPrice(variant?.price ?? product.price))}
            className="product-card__price sf-product-card__price inline-flex min-h-11 items-center whitespace-nowrap focus-visible:outline-none"
          >
            <span className="flex flex-wrap items-baseline gap-2">
              <span>{formatPrice(variant?.price ?? product.price)}</span>
              {variant?.originalPrice && variant.originalPrice > variant.price && (
                <span className="sf-product-card__original line-through">
                  {formatPrice(variant.originalPrice)}
                </span>
              )}
            </span>
          </ProductLink>
        </div>
      </div>
    </article>
  );
}

function ProductLink({
  product,
  children,
  className,
  ariaLabel,
}: {
  product: Product;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
}) {
  return product.id ? (
    <Link
      to="/product/$slug"
      params={{ slug: product.slug }}
      preload="intent"
      className={className}
      aria-label={ariaLabel}
    >
      {children}
    </Link>
  ) : (
    <Link to="/shop" search={{ search: product.name }} className={className} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}
