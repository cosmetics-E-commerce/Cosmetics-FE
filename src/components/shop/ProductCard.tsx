import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Stars } from "@/components/brand/Stars";
import { PolishedImage } from "@/components/ui/polished-image";
import { QuickAddToolbar } from "@/components/shop/QuickAddToolbar";
import { formatPrice, type Product } from "@/lib/products";
import { useStore } from "@/lib/store";

export function ProductCard({
  product,
  compact = false,
  layout = "grid",
}: {
  product: Product;
  compact?: boolean;
  layout?: "grid" | "list";
}) {
  const { wishlist, toggleWish } = useStore();
  const wished = wishlist.includes(product.slug);
  const variant =
    product.sizes.find((item) => item.stock === undefined || item.stock > 0) ?? product.sizes[0];
  const stock = product.id ? product.stock : undefined;
  const outOfStock = product.inStock === false || stock === 0;
  const lowStock = stock !== undefined && stock > 0 && stock < 10;
  const secondaryImage = product.gallery.find((image) => image !== product.image);
  const [secondaryReady, setSecondaryReady] = useState(false);
  return (
    <article
      className={`product-card sf-product-card group relative h-full ${
        layout === "list"
          ? "sf-product-card--list grid grid-cols-[7rem_minmax(0,1fr)] gap-4 border-b border-border pb-6 sm:grid-cols-[12rem_minmax(0,1fr)] sm:gap-7"
          : "flex flex-col"
      }`}
      data-layout={layout}
    >
      <div
        className="product-card-media sf-product-card__media relative overflow-hidden"
        data-secondary-ready={secondaryReady ? "true" : "false"}
      >
        <ProductLink product={product} ariaLabel={product.name} className="relative block">
          <PolishedImage
            src={product.image}
            alt={product.name}
            loading="lazy"
            decoding="async"
            sizes={
              layout === "list"
                ? "(min-width: 640px) 12rem, 7rem"
                : "(min-width: 1280px) 24vw, (min-width: 768px) 33vw, 50vw"
            }
            wrapperClassName="product-card-primary aspect-[4/5]"
            className="product-card-image product-card-image--primary size-full object-cover"
          />
          {secondaryImage ? (
            <PolishedImage
              src={secondaryImage}
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
              sizes={
                layout === "list"
                  ? "(min-width: 640px) 12rem, 7rem"
                  : "(min-width: 1280px) 24vw, (min-width: 768px) 33vw, 50vw"
              }
              onLoad={(event) => setSecondaryReady(event.currentTarget.naturalWidth > 0)}
              onError={() => setSecondaryReady(false)}
              wrapperClassName="product-card-secondary absolute inset-0"
              className="product-card-image product-card-image--secondary size-full object-cover"
            />
          ) : null}
        </ProductLink>
        {product.id && (
          <button
            type="button"
            onClick={() => void toggleWish(product.id!, product.slug)}
            aria-label={wished ? `Remove ${product.name} from wishlist` : `Save ${product.name}`}
            aria-pressed={wished}
            className="sf-product-card__wish absolute end-3 top-3 grid size-11 place-items-center text-taupe"
          >
            <Heart
              strokeWidth={1}
              className={wished ? "pop size-[18px] fill-gold text-gold" : "size-[18px]"}
            />
          </button>
        )}
        {outOfStock && (
          <span className="sf-product-card__badge absolute start-3 top-3 bg-red-50 text-red-700">
            Out of stock
          </span>
        )}
        {lowStock && (
          <span className="sf-product-card__badge absolute start-3 top-3 bg-amber-50 text-amber-800">
            Low stock
          </span>
        )}
        {product.promotionBadge && !outOfStock && !lowStock && (
          <span className="sf-product-card__badge sf-product-card__badge--sale absolute start-3 top-3">
            {product.promotionBadge}
          </span>
        )}
        <QuickAddToolbar product={product} variant={variant} outOfStock={outOfStock} />
      </div>
      <div
        className={`product-card__info sf-product-card__info flex min-w-0 flex-1 flex-col ${layout === "list" ? "py-2" : "pt-4"}`}
      >
        <p className="sf-product-card__category">{product.category}</p>
        <h3 className="sf-product-card__title">
          <ProductLink product={product} className="transition-colors hover:text-gold">
            {product.name}
          </ProductLink>
        </h3>
        {!compact && <p className="sf-product-card__benefit line-clamp-2">{product.benefit}</p>}
        {product.rating > 0 && (
          <div className="sf-product-card__rating flex items-center gap-2">
            <Stars value={product.rating} />
            <span className="text-xs text-muted-foreground">({product.reviews})</span>
          </div>
        )}
        <div className="sf-product-card__footer mt-auto flex items-end justify-between gap-3">
          <ProductLink
            product={product}
            ariaLabel={`View ${product.name}, ${formatPrice(variant?.price ?? product.price)}`}
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
