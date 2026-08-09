import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { useRef, useState, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";
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
  const cardRef = useRef<HTMLElement>(null);
  const secondaryImage = product.gallery.find((image) => image !== product.image);
  const [secondaryReady, setSecondaryReady] = useState(false);
  const followPointer = (event: ReactPointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse" || !cardRef.current) return;
    const bounds = cardRef.current.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 4;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 4;
    cardRef.current.style.setProperty("--card-pan-x", `${x}px`);
    cardRef.current.style.setProperty("--card-pan-y", `${y}px`);
  };
  const resetPointer = () => {
    cardRef.current?.style.removeProperty("--card-pan-x");
    cardRef.current?.style.removeProperty("--card-pan-y");
  };
  return (
    <article
      ref={cardRef}
      className={`product-card group relative h-full transition-transform duration-500 hover:-translate-y-1 ${
        layout === "list"
          ? "grid grid-cols-[7rem_minmax(0,1fr)] gap-4 border-b border-border pb-6 sm:grid-cols-[12rem_minmax(0,1fr)] sm:gap-7"
          : "flex flex-col"
      }`}
      data-layout={layout}
      onPointerMove={followPointer}
      onPointerLeave={resetPointer}
    >
      <div
        className="product-card-media relative overflow-hidden bg-ivory"
        data-secondary-ready={secondaryReady ? "true" : "false"}
      >
        <ProductLink product={product} ariaLabel={product.name} className="relative block">
          <PolishedImage
            src={product.image}
            alt={product.name}
            loading="lazy"
            decoding="async"
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
            className="absolute end-2 top-2 grid size-11 place-items-center bg-warm-white/85 text-taupe backdrop-blur-sm hover:text-gold"
          >
            <Heart
              strokeWidth={1}
              className={wished ? "pop size-[18px] fill-gold text-gold" : "size-[18px]"}
            />
          </button>
        )}
        {outOfStock && (
          <span className="label-xs absolute start-2 top-2 border border-red-300 bg-red-50 px-2.5 py-1.5 text-red-700">
            Out of stock
          </span>
        )}
        {lowStock && (
          <span className="label-xs absolute start-2 top-2 border border-amber-300 bg-amber-50 px-2.5 py-1.5 text-amber-800">
            Low stock
          </span>
        )}
        {product.promotionBadge && !outOfStock && !lowStock && (
          <span className="label-xs absolute start-2 top-2 border border-gold bg-warm-white px-2.5 py-1.5 text-gold">
            {product.promotionBadge}
          </span>
        )}
        <QuickAddToolbar product={product} variant={variant} outOfStock={outOfStock} />
      </div>
      <div
        className={`product-card__info flex min-w-0 flex-1 flex-col ${layout === "list" ? "py-2" : "pt-5"}`}
      >
        <p className="label-xs text-taupe">{product.category}</p>
        <h3 className="mt-2 font-serif text-xl leading-tight">
          <ProductLink product={product} className="transition-colors hover:text-gold">
            {product.name}
          </ProductLink>
        </h3>
        {!compact && (
          <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">{product.benefit}</p>
        )}
        {product.rating > 0 && (
          <div className="mt-3 flex items-center gap-2">
            <Stars value={product.rating} />
            <span className="text-xs text-muted-foreground">({product.reviews})</span>
          </div>
        )}
        <div className="mt-auto flex flex-col items-stretch gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
          <ProductLink
            product={product}
            ariaLabel={`View ${product.name}, ${formatPrice(variant?.price ?? product.price)}`}
            className="product-card__price inline-flex min-h-11 w-full min-w-[7.25rem] items-center justify-center whitespace-nowrap border border-ink bg-ink px-3 py-2 font-serif text-lg leading-none text-warm-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 sm:w-auto"
          >
            <span className="flex flex-col items-center gap-0.5">
              <span>{formatPrice(variant?.price ?? product.price)}</span>
              {variant?.originalPrice && variant.originalPrice > variant.price && (
                <span className="text-[10px] font-sans line-through opacity-70">
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
