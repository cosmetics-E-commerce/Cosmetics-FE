import { Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays } from "lucide-react";
import { useState } from "react";
import { PolishedImage } from "@/components/ui/polished-image";
import type { StorefrontOffer } from "@/lib/api";
import type { useBrands, useCategories } from "@/lib/catalog";
import { formatPrice, type Product } from "@/lib/products";
import { dateValue } from "@/lib/offers";

export function OfferCard({
  offer,
  products,
  loading,
  failed,
  onRetry,
  categories,
  brands,
  ar,
  hero = false,
}: {
  offer: StorefrontOffer;
  products: Product[];
  loading: boolean;
  failed: boolean;
  onRetry: () => void;
  categories: NonNullable<ReturnType<typeof useCategories>["data"]>;
  brands: NonNullable<ReturnType<typeof useBrands>["data"]>;
  ar: boolean;
  hero?: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const included = products.filter(
    (product) => product.id && offer.productIds.includes(product.id),
  );
  const visible = expanded ? included : included.slice(0, 3);
  const scopedCategories = categories.filter((category) => offer.categoryIds.includes(category.id));
  const scopedBrands = brands.filter((brand) => offer.brandIds.includes(brand.id));
  const endDate = dateValue(offer.endsAt, 0);
  const image = publicAssetUrl(offer.bannerImageKey);
  return (
    <article className="sf-offer-card">
      {image && (
        <div className="sf-offer-card__banner">
          <PolishedImage src={image} alt="" loading="lazy" />
        </div>
      )}
      <div className="sf-offer-card__heading">
        <div className="sf-offer-card__topline">
          <span>{offer.badgeText?.trim() || (ar ? "عرض خاص" : "Special offer")}</span>
          {offer.featured && <small>{ar ? "عرض مميز" : "Featured"}</small>}
        </div>
        {hero ? <h1>{offer.title}</h1> : <h3>{offer.title}</h3>}
        {offer.description ? (
          <p>{offer.description}</p>
        ) : hero ? (
          <p>
            {ar
              ? "اكتشفي المنتجات المشمولة في هذا العرض. يتم تأكيد التوفير عند إتمام الطلب."
              : "Discover the products included in this offer. Your savings are confirmed at checkout."}
          </p>
        ) : null}
        {hero && included.length > 0 && (
          <a href="#home-offer-products" className="sf-offer-hero__cta">
            {ar ? "تسوقي العرض" : "Shop this offer"}
            <ArrowRight aria-hidden="true" />
          </a>
        )}
      </div>
      {offer.productIds.length > 0 && (
        <div className="sf-offer-products" id={hero ? "home-offer-products" : undefined}>
          <p className="sf-offer-products__label">
            {ar ? "المنتجات المشمولة" : "Included in this offer"}
          </p>
          {loading ? (
            <p role="status">{ar ? "جارٍ تحميل المنتجات…" : "Loading products…"}</p>
          ) : failed ? (
            <p>
              {ar ? "تعذر تحميل المنتجات." : "Products could not be loaded."}{" "}
              <button type="button" onClick={onRetry}>
                {ar ? "حاولي مجدداً" : "Try again"}
              </button>
            </p>
          ) : included.length ? (
            <>
              <ul>
                {visible.map((product) => (
                  <li key={product.id}>
                    <Link
                      to="/product/$slug"
                      params={{ slug: product.slug }}
                      className="sf-offer-product"
                    >
                      <PolishedImage src={product.image} alt="" loading="lazy" />
                      <span className="sf-offer-product__copy">
                        <span className="sf-offer-product__brand">
                          {product.brand?.name || product.category}
                        </span>
                        <strong>{product.name}</strong>
                        <span className="sf-offer-product__price">
                          {formatPrice(product.price)}
                          {product.originalPrice && product.originalPrice > product.price ? (
                            <del>{formatPrice(product.originalPrice)}</del>
                          ) : null}
                        </span>
                      </span>
                      <ArrowRight aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
              {included.length > 3 && (
                <button
                  type="button"
                  className="sf-offer-products__more"
                  aria-expanded={expanded}
                  onClick={() => setExpanded(!expanded)}
                >
                  {expanded
                    ? ar
                      ? "عرض أقل"
                      : "Show fewer products"
                    : ar
                      ? `عرض كل المنتجات (${included.length})`
                      : `View all ${included.length} products`}
                  <ArrowRight aria-hidden="true" />
                </button>
              )}
            </>
          ) : (
            <p>
              {ar
                ? "راجعي المجموعة لمعرفة المنتجات المتاحة حالياً."
                : "Check the collection for current availability."}
            </p>
          )}
        </div>
      )}
      {(scopedCategories.length > 0 || scopedBrands.length > 0) && (
        <div className="sf-offer-scopes">
          {scopedCategories.map((category) => (
            <Link key={category.id} to="/shop" search={{ category: category.slug }}>
              {ar ? category.nameAr : category.nameEn}
              <ArrowRight aria-hidden="true" />
            </Link>
          ))}
          {scopedBrands.map((brand) => (
            <Link key={brand.id} to="/brands/$slug" params={{ slug: brand.slug }}>
              {brand.name}
              <ArrowRight aria-hidden="true" />
            </Link>
          ))}
        </div>
      )}
      <footer className="sf-offer-card__footer">
        <span>
          <CalendarDays aria-hidden="true" />
          {endDate
            ? `${ar ? "حتى" : "Until"} ${new Intl.DateTimeFormat(ar ? "ar-EG" : "en-EG", { day: "numeric", month: "short", year: "numeric", timeZone: "Africa/Cairo" }).format(endDate)}`
            : ar
              ? "متاح الآن"
              : "Available now"}
        </span>
        {!included.length && (
          <Link to="/shop">
            {ar ? "تسوقي المجموعة" : "Browse collection"}
            <ArrowRight aria-hidden="true" />
          </Link>
        )}
      </footer>
    </article>
  );
}

function publicAssetUrl(key?: string | null) {
  if (!key) return null;
  if (/^https?:\/\//i.test(key)) return key;
  const base = import.meta.env["VITE_MEDIA_BASE_URL"] as string | undefined;
  return base ? `${base.replace(/\/+$/, "")}/${key.replace(/^\/+/, "")}` : null;
}
