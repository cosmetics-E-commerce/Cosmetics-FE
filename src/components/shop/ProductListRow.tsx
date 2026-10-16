import { Link } from "@tanstack/react-router";
import { ArrowRight, Heart } from "lucide-react";
import { memo, type ReactNode } from "react";
import { Stars } from "@/components/brand/Stars";
import { PolishedImage } from "@/components/ui/polished-image";
import { QuickAddToolbar } from "@/components/shop/QuickAddToolbar";
import { selectProductCardImages } from "@/components/shop/product-card-media";
import { formatPrice, type Product } from "@/lib/products";
import { useProductCardStore } from "@/lib/store";

const rowCopy = {
  en: {
    out: "Out of stock",
    inStock: "In stock",
    low: (count: number) => `Only ${count} left`,
    save: (percent: number) => `Save ${percent}%`,
    options: (count: number) => `${count} options`,
    reviews: (count: number) => (count === 1 ? "1 review" : `${count} reviews`),
    details: "View details",
    view: (name: string, price: string) => `View ${name}, ${price}`,
    wishAdd: (name: string) => `Add ${name} to wishlist`,
    wishRemove: (name: string) => `Remove ${name} from wishlist`,
  },
  ar: {
    out: "غير متوفر",
    inStock: "متوفر",
    low: (count: number) => `متبقي ${count} فقط`,
    save: (percent: number) => `وفّري ${percent}%`,
    options: (count: number) => `${count} خيارات`,
    reviews: (count: number) => `${count} مراجعة`,
    details: "عرض التفاصيل",
    view: (name: string, price: string) => `عرض ${name}، ${price}`,
    wishAdd: (name: string) => `إضافة ${name} إلى المفضلة`,
    wishRemove: (name: string) => `إزالة ${name} من المفضلة`,
  },
} as const;

const LOW_STOCK = 5;

/**
 * Editorial list-view row for catalog pages: media, story and purchase column.
 * Keeps `.product-card` / `.product-card-media` so shared quick-add behaviour and
 * tests apply, but uses `data-layout="row"` so the legacy grid-card list rules do not.
 */
export const ProductListRow = memo(function ProductListRow({ product }: { product: Product }) {
  const { locale, wishlist, toggleWish } = useProductCardStore();
  const labels = rowCopy[locale];
  const wished = wishlist.includes(product.slug);
  const variant =
    product.sizes.find((item) => item.stock === undefined || item.stock > 0) ?? product.sizes[0];
  const outOfStock = product.inStock === false || !variant || variant.stock === 0;
  const stock = variant?.stock;
  const lowStock = !outOfStock && stock !== undefined && stock > 0 && stock <= LOW_STOCK;
  const price = variant?.price ?? product.price;
  const originalPrice =
    variant?.originalPrice && variant.originalPrice > variant.price
      ? variant.originalPrice
      : undefined;
  const savings = originalPrice ? Math.round((1 - price / originalPrice) * 100) : 0;
  const { primary: image } = selectProductCardImages(product);
  // `benefit` is the tag labels joined, already shown as chips below.
  const story = product.shortDescription;
  const tags = [...new Set(product.concerns.filter(Boolean))].slice(0, 3);
  const optionCount = product.sizes.length;

  return (
    <article className="product-card pl-row" data-layout="row">
      <div className="pl-row__media product-card-media">
        <RowLink product={product} ariaLabel={product.name} className="pl-row__media-link">
          <PolishedImage
            src={image}
            alt={product.imageAlt || product.name}
            width={480}
            height={480}
            loading="lazy"
            decoding="async"
            sizes="(min-width: 1024px) 220px, (min-width: 768px) 180px, 112px"
            wrapperClassName="pl-row__image-shell"
            className="pl-row__image"
          />
        </RowLink>
        {outOfStock ? (
          <span className="pl-row__badge pl-row__badge--muted">{labels.out}</span>
        ) : product.promotionBadge || savings > 0 ? (
          <span className="pl-row__badge pl-row__badge--sale">
            {savings > 0 ? <bdi dir="ltr">{`−${savings}%`}</bdi> : product.promotionBadge}
          </span>
        ) : null}
        {product.id ? (
          <button
            type="button"
            onClick={() => void toggleWish(product.id!, product.slug)}
            aria-label={wished ? labels.wishRemove(product.name) : labels.wishAdd(product.name)}
            aria-pressed={wished}
            className="pl-row__wish"
          >
            <Heart strokeWidth={1.8} aria-hidden="true" />
          </button>
        ) : null}
      </div>

      <div className="pl-row__story">
        <p className="pl-row__eyebrow">
          {product.brand ? <span className="pl-row__brand">{product.brand.name}</span> : null}
          <span>{product.category}</span>
        </p>
        <h3 className="pl-row__title" dir="auto">
          <RowLink product={product}>{product.name}</RowLink>
        </h3>
        {story ? (
          <p className="pl-row__copy" dir="auto">
            {story}
          </p>
        ) : null}
        {tags.length || product.rating > 0 || optionCount > 1 ? (
          <div className="pl-row__meta">
            {product.rating > 0 ? (
              <span className="pl-row__rating">
                <Stars value={product.rating} size={13} />
                <span>{labels.reviews(product.reviews)}</span>
              </span>
            ) : null}
            {tags.map((tag) => (
              <span key={tag} className="pl-row__chip" dir="auto">
                {tag}
              </span>
            ))}
            {optionCount > 1 ? (
              <span className="pl-row__chip pl-row__chip--quiet">
                {labels.options(optionCount)}
              </span>
            ) : null}
          </div>
        ) : null}
      </div>

      <div className="pl-row__buy">
        <div className="pl-row__price-block">
          <RowLink
            product={product}
            ariaLabel={labels.view(product.name, formatPrice(price))}
            className="pl-row__price"
          >
            {formatPrice(price)}
          </RowLink>
          {originalPrice ? (
            <span className="pl-row__was">
              <s>{formatPrice(originalPrice)}</s>
              <span className="pl-row__save">{labels.save(savings)}</span>
            </span>
          ) : null}
          {outOfStock ? null : (
            <span className={`pl-row__stock ${lowStock ? "is-low" : "is-in"}`}>
              <span aria-hidden="true" />
              {lowStock ? labels.low(stock!) : labels.inStock}
            </span>
          )}
        </div>
        <QuickAddToolbar product={product} variant={variant} outOfStock={outOfStock} />
        <RowLink product={product} className="pl-row__details">
          {labels.details}
          <ArrowRight aria-hidden="true" />
        </RowLink>
      </div>
    </article>
  );
});

function RowLink({
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
      preloadDelay={0}
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
