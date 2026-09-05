import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, CalendarDays, LoaderCircle, Tag } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { PolishedImage } from "@/components/ui/polished-image";
import { apiErrorMessage, listOffers, subscribeNewsletter, type StorefrontOffer } from "@/lib/api";
import { loadProductsByIds, useBrands, useCategories } from "@/lib/catalog";
import { formatPrice, type Product } from "@/lib/products";
import { createSeoHead } from "@/lib/seo";
import { useStore } from "@/lib/store";

type SortMode = "latest" | "ending";

export const Route = createFileRoute("/offers")({
  loader: () => listOffers().catch(() => undefined),
  head: ({ loaderData, match }) => {
    const locale = match.search.lang === "ar" ? "ar" : "en";
    return createSeoHead({
      title: locale === "ar" ? "عروض التجميل الحالية" : "Current Beauty Offers",
      description:
        locale === "ar"
          ? "اطلعي على عروض بيوريزا النشطة والتوفير المطبق تلقائياً على المنتجات المؤهلة."
          : "View active BIOREZA offers and automatic savings on eligible beauty products.",
      path: "/offers",
      locale,
      index: Boolean(loaderData?.length),
      follow: true,
    });
  },
  component: OffersPage,
});

function OffersPage() {
  const initialOffers = Route.useLoaderData();
  const query = useQuery({
    queryKey: ["offers"],
    queryFn: listOffers,
    initialData: initialOffers,
    refetchInterval: 60_000,
  });
  const { locale } = useStore();
  const ar = locale === "ar";
  const [sort, setSort] = useState<SortMode>("latest");
  const [subscribing, setSubscribing] = useState(false);
  const offers = useMemo(
    () =>
      [...(query.data ?? [])].sort((a, b) =>
        sort === "ending"
          ? dateValue(a.endsAt, Infinity) - dateValue(b.endsAt, Infinity)
          : dateValue(b.startsAt, 0) - dateValue(a.startsAt, 0),
      ),
    [query.data, sort],
  );
  const productIds = useMemo(
    () => [...new Set(offers.flatMap((offer) => offer.productIds))].sort(),
    [offers],
  );
  const products = useQuery({
    queryKey: ["offer-products", productIds, locale],
    queryFn: async () => {
      const chunks: string[][] = [];
      for (let i = 0; i < productIds.length; i += 24) chunks.push(productIds.slice(i, i + 24));
      return (await Promise.all(chunks.map((ids) => loadProductsByIds(ids, locale)))).flat();
    },
    enabled: productIds.length > 0,
    staleTime: 60_000,
  });
  const categories = useCategories();
  const brands = useBrands();

  return (
    <main className="sf-offers-page" dir={ar ? "rtl" : "ltr"}>
      <section className="sf-offers-hero" aria-labelledby="offers-heading">
        <div>
          <p className="sf-offers-eyebrow">{ar ? "اختيارات بيوريزا" : "The BIOREZA edit"}</p>
          <h1 id="offers-heading">{ar ? "جمالك، بقيمة أجمل." : "Beauty, with a little extra."}</h1>
          <p className="sf-offers-intro">
            {ar
              ? "اكتشفي العروض الحالية والمنتجات المشمولة. يتم تأكيد التوفير عند إتمام الطلب."
              : "Explore current offers and the products included. Your savings are confirmed at checkout."}
          </p>
        </div>
        <Link to="/shop" className="sf-offers-collection-link">
          {ar ? "تسوقي المجموعة" : "Explore the collection"}
          <ArrowRight aria-hidden="true" />
        </Link>
      </section>

      <section className="sf-offers-active" aria-labelledby="active-offers-heading">
        <div className="sf-offers-section-head">
          <h2 id="active-offers-heading">
            {ar ? "العروض الحالية" : "Current offers"}
            <span>{offers.length.toLocaleString(ar ? "ar-EG" : "en-EG")}</span>
          </h2>
          <label className="sf-offers-sort">
            <span>{ar ? "ترتيب حسب" : "Sort by"}</span>
            <select value={sort} onChange={(event) => setSort(event.target.value as SortMode)}>
              <option value="latest">{ar ? "الأحدث" : "Latest"}</option>
              <option value="ending">{ar ? "تنتهي قريباً" : "Ending soon"}</option>
            </select>
          </label>
        </div>
        {query.isLoading ? (
          <div className="sf-offers-empty" role="status">
            {ar ? "جارٍ تحميل العروض…" : "Loading offers…"}
          </div>
        ) : query.isError ? (
          <div className="sf-offers-empty" role="alert">
            <h3>{ar ? "تعذر تحميل العروض" : "Offers could not be loaded"}</h3>
            <button type="button" onClick={() => void query.refetch()}>
              {ar ? "حاولي مجدداً" : "Try again"}
            </button>
          </div>
        ) : offers.length ? (
          <div className="sf-offers-grid">
            {offers.map((offer) => (
              <OfferCard
                key={offer.id}
                offer={offer}
                products={products.data ?? []}
                loading={products.isFetching && !products.data}
                failed={products.isError}
                onRetry={() => void products.refetch()}
                categories={categories.data ?? []}
                brands={brands.data ?? []}
                ar={ar}
              />
            ))}
          </div>
        ) : (
          <div className="sf-offers-empty">
            <Tag aria-hidden="true" />
            <h3>{ar ? "لا توجد عروض نشطة حالياً" : "A new offer is worth the wait."}</h3>
            <p>
              {ar
                ? "تصفحي المجموعة حتى تصل عروضنا القادمة."
                : "There are no active offers right now. Discover the collection while we prepare what’s next."}
            </p>
            <Link to="/shop" className="sf-offers-collection-link">
              {ar ? "تسوقي المجموعة" : "Explore the collection"}
              <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        )}
      </section>
      <section className="sf-offers-newsletter">
        <div>
          <p className="sf-offers-eyebrow">{ar ? "أخبار بيوريزا" : "Beauty notes"}</p>
          <h2>{ar ? "كوني أول من يعرف." : "Good things, in your inbox."}</h2>
          <p>
            {ar
              ? "اشتركي لتصلك أحدث العروض والمنتجات الجديدة."
              : "New arrivals and upcoming offers. Sign up to hear from BIOREZA."}
          </p>
        </div>
        <form
          className="sf-offers-newsletter__form"
          onSubmit={async (event) => {
            event.preventDefault();
            if (subscribing) return;
            const form = event.currentTarget;
            const email = new FormData(form).get("email");
            if (typeof email !== "string" || !email.trim()) return;
            setSubscribing(true);
            try {
              await subscribeNewsletter(email.trim(), locale);
              form.reset();
              toast.success(locale === "ar" ? "تم الاشتراك في النشرة" : "Newsletter subscribed");
            } catch (error) {
              toast.error(apiErrorMessage(error, locale));
            } finally {
              setSubscribing(false);
            }
          }}
        >
          <label htmlFor="offers-newsletter-email" className="sr-only">
            {ar ? "البريد الإلكتروني" : "Email address"}
          </label>
          <input
            id="offers-newsletter-email"
            name="email"
            type="email"
            placeholder={ar ? "البريد الإلكتروني" : "Email address"}
            autoComplete="email"
            required
          />
          <button
            type="submit"
            disabled={subscribing}
            aria-busy={subscribing}
            aria-label={ar ? "اشتركي" : "Subscribe"}
          >
            {subscribing ? (
              <LoaderCircle aria-hidden="true" className="animate-spin" />
            ) : ar ? (
              "اشتركي"
            ) : (
              "Subscribe"
            )}
            {!subscribing && <ArrowRight aria-hidden="true" />}
          </button>
        </form>
      </section>
    </main>
  );
}

function OfferCard({
  offer,
  products,
  loading,
  failed,
  onRetry,
  categories,
  brands,
  ar,
}: {
  offer: StorefrontOffer;
  products: Product[];
  loading: boolean;
  failed: boolean;
  onRetry: () => void;
  categories: NonNullable<ReturnType<typeof useCategories>["data"]>;
  brands: NonNullable<ReturnType<typeof useBrands>["data"]>;
  ar: boolean;
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
        <h3>{offer.title}</h3>
        {offer.description && <p>{offer.description}</p>}
      </div>
      {offer.productIds.length > 0 && (
        <div className="sf-offer-products">
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

function dateValue(value: string | null, fallback: number) {
  const time = value ? new Date(value).getTime() : NaN;
  return Number.isFinite(time) ? time : fallback;
}

function publicAssetUrl(key?: string | null) {
  if (!key) return null;
  if (/^https?:\/\//i.test(key)) return key;
  const base = import.meta.env["VITE_MEDIA_BASE_URL"] as string | undefined;
  return base ? `${base.replace(/\/+$/, "")}/${key.replace(/^\/+/, "")}` : null;
}
