import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
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
  const outOfStock = stock === 0;
  const lowStock = stock !== undefined && stock > 0 && stock < 10;
  return (
    <article
      className={`product-card group relative h-full transition-transform duration-500 hover:-translate-y-1 ${
        layout === "list"
          ? "grid grid-cols-[7rem_minmax(0,1fr)] gap-4 border-b border-border pb-6 sm:grid-cols-[12rem_minmax(0,1fr)] sm:gap-7"
          : "flex flex-col"
      }`}
      data-layout={layout}
    >
      <div className="product-card-media relative overflow-hidden bg-ivory">
        <a
          href={
            product.id
              ? `/product/${product.slug}`
              : `/shop?search=${encodeURIComponent(product.name)}`
          }
          aria-label={product.name}
        >
          <PolishedImage
            src={product.image}
            alt={product.name}
            loading="lazy"
            decoding="async"
            wrapperClassName="aspect-[4/5]"
            className="product-card-image size-full object-cover"
          />
        </a>
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
      <div className={`flex min-w-0 flex-1 flex-col ${layout === "list" ? "py-2" : "pt-5"}`}>
        <p className="label-xs text-taupe">{product.category}</p>
        <h3 className="mt-2 font-serif text-xl leading-tight">
          <a
            href={
              product.id
                ? `/product/${product.slug}`
                : `/shop?search=${encodeURIComponent(product.name)}`
            }
            className="transition-colors hover:text-gold"
          >
            {product.name}
          </a>
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
          <a
            href={
              product.id
                ? `/product/${product.slug}`
                : `/shop?search=${encodeURIComponent(product.name)}`
            }
            aria-label={`View ${product.name}, ${formatPrice(variant?.price ?? product.price)}`}
            className="inline-flex min-h-11 w-full min-w-[7.25rem] items-center justify-center whitespace-nowrap border border-ink bg-ink px-3 py-2 font-serif text-lg leading-none text-warm-white shadow-[0_5px_16px_rgba(51,46,42,0.1)] transition-[transform,background-color,border-color,box-shadow] duration-200 ease-out hover:-translate-y-px hover:border-gold hover:bg-gold hover:shadow-[0_8px_22px_rgba(51,46,42,0.16)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 sm:w-auto"
          >
            <span className="flex flex-col items-center gap-0.5">
              <span>{formatPrice(variant?.price ?? product.price)}</span>
              {variant?.originalPrice && variant.originalPrice > variant.price && (
                <span className="text-[10px] font-sans line-through opacity-70">
                  {formatPrice(variant.originalPrice)}
                </span>
              )}
            </span>
          </a>
        </div>
      </div>
    </article>
  );
}
