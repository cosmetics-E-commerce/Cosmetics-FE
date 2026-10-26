import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Reveal } from "@/components/brand/Reveal";
import { ProductCard } from "@/components/shop/ProductCard";
import { Button } from "@/components/ui/button";
import { CategoryScrollStrip } from "@/components/ui/horizontal-scroll";
import { PolishedImage } from "@/components/ui/polished-image";
import { listOffers, type StorefrontOffer } from "@/lib/api";
import { dateValue, useOfferCatalog } from "@/lib/offers";
import { formatPrice, type Product } from "@/lib/products";
import { createSeoHead } from "@/lib/seo";
import offersPhoto from "@/assets/cat-skincare.webp";
import { useStore } from "@/lib/store";
import "@/components/offers/offers-page.css";

type SortMode = "saving" | "price-asc" | "price-desc" | "ending";
type Tier = 0 | 20 | 40;

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

function savingOf(product: Product) {
  if (product.savingsPercent) return product.savingsPercent;
  if (product.originalPrice && product.originalPrice > product.price) {
    return Math.round((1 - product.price / product.originalPrice) * 100);
  }
  return 0;
}

/** Only offers with their own artwork or copy get a row; the grid already shows the rest. */
function hasOwnContent(offer: StorefrontOffer) {
  return Boolean(offer.bannerImageKey || offer.description?.trim());
}

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
  const number = (value: number) => value.toLocaleString(ar ? "ar-EG" : "en-EG");
  const percent = (value: number) => (ar ? `${number(value)}٪` : `${value}%`);
  const offers = useMemo(() => query.data ?? [], [query.data]);
  const { products, categories, brands } = useOfferCatalog(offers, locale);
  const gridRef = useRef<HTMLElement>(null);

  const [category, setCategory] = useState<string | null>(null);
  const [brand, setBrand] = useState<string | null>(null);
  const [tier, setTier] = useState<Tier>(0);
  const [offerId, setOfferId] = useState<string | null>(null);
  const [sort, setSort] = useState<SortMode>("saving");

  const offersByProduct = useMemo(() => {
    const map = new Map<string, StorefrontOffer[]>();
    for (const offer of offers) {
      for (const id of offer.productIds) map.set(id, [...(map.get(id) ?? []), offer]);
    }
    return map;
  }, [offers]);

  const deals = useMemo(() => {
    const seen = new Set<string>();
    return (products.data ?? []).filter((product) => {
      if (!product.id || seen.has(product.id) || !offersByProduct.has(product.id)) return false;
      seen.add(product.id);
      return true;
    });
  }, [offersByProduct, products.data]);

  const endsFor = (product: Product) =>
    Math.min(
      ...(offersByProduct.get(product.id!) ?? []).map((offer) => dateValue(offer.endsAt, Infinity)),
    );

  const visible = useMemo(() => {
    const filtered = deals.filter(
      (product) =>
        (!category || product.category === category) &&
        (!brand || product.brand?.name === brand) &&
        savingOf(product) >= tier &&
        (!offerId ||
          offers.find((offer) => offer.id === offerId)?.productIds.includes(product.id!)),
    );
    return filtered.sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "ending") return endsFor(a) - endsFor(b);
      return savingOf(b) - savingOf(a);
    });
    // endsFor is derived from offersByProduct, which is already a dependency.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brand, category, deals, offerId, offers, offersByProduct, sort, tier]);

  const count = (key: (product: Product) => string | undefined) => {
    const counts = new Map<string, number>();
    for (const product of deals) {
      const value = key(product);
      if (value) counts.set(value, (counts.get(value) ?? 0) + 1);
    }
    return [...counts].sort((a, b) => b[1] - a[1]);
  };
  const categoryTiles = count((product) => product.category).map(([name, total]) => {
    const inCategory = deals.filter((product) => product.category === name);
    const best = [...inCategory].sort((a, b) => savingOf(b) - savingOf(a));
    return {
      name,
      count: total,
      saving: best.length ? savingOf(best[0]!) : 0,
      images: best.flatMap((product) => (product.image ? [product.image] : [])),
    };
  });
  const brandOptions = count((product) => product.brand?.name);

  const maxSaving = deals.reduce((max, product) => Math.max(max, savingOf(product)), 0);
  const hasEndDates = offers.some((offer) => dateValue(offer.endsAt, 0) > Date.now());
  const countdownOffer = offers
    .filter((offer) => offer.showCountdown && dateValue(offer.endsAt, 0) > Date.now())
    .sort((a, b) => dateValue(a.endsAt, 0) - dateValue(b.endsAt, 0))[0];
  const featured = offers.filter(hasOwnContent);
  // Campaign artwork uploaded by the admin replaces the stock photograph.
  const heroBanner = offers.map((offer) => publicAssetUrl(offer.bannerImageKey)).find(Boolean);
  const topDeal = deals
    .filter((product) => product.image && savingOf(product) > 0)
    .sort((a, b) => savingOf(b) - savingOf(a))[0];
  const scopeOffers = offers.filter(
    (offer) => !offer.productIds.length && (offer.categoryIds.length || offer.brandIds.length),
  );
  const selectedOffer = offers.find((offer) => offer.id === offerId);
  const activeFilters = Boolean(category || brand || tier || offerId);
  const clearFilters = () => {
    setCategory(null);
    setBrand(null);
    setTier(0);
    setOfferId(null);
  };
  const scrollToGrid = () =>
    gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const loadingProducts = products.isLoading && offers.some((offer) => offer.productIds.length);

  const lede = deals.length
    ? ar
      ? `${maxSaving ? `خصم حتى ${percent(maxSaving)} على ` : ""}${number(deals.length)} منتجاً. الأسعار المعروضة تشمل الخصم، بدون كود.`
      : `${maxSaving ? `Up to ${maxSaving}% off ` : ""}${deals.length} products. Prices shown already include the discount, no code needed.`
    : ar
      ? "يُطبّق التوفير تلقائياً على المنتجات المؤهلة عند إتمام الطلب."
      : "Savings apply automatically to eligible products at checkout.";

  return (
    <main className="sf-shop-page sf-deals" dir={ar ? "rtl" : "ltr"}>
      <nav
        aria-label={ar ? "مسار الصفحة" : "Breadcrumb"}
        className="storefront-breadcrumb sf-shop-breadcrumb"
      >
        <Link to="/">{ar ? "الرئيسية" : "Home"}</Link>
        <span aria-hidden="true">/</span>
        <span>{ar ? "العروض" : "Offers"}</span>
      </nav>

      <section className="sf-deals-hero" aria-labelledby="offers-heading">
        <Reveal className="sf-deals-hero__copy">
          <p className="sf-deals-eyebrow">{ar ? "عروض بيوريزا" : "BIOREZA offers"}</p>
          <h1 id="offers-heading">
            {ar ? "روتينك،" : "Your ritual,"} <em>{ar ? "بسعر أجمل." : "for less."}</em>
          </h1>
          <p className="sf-deals-hero__lede">{lede}</p>
          <div className="sf-deals-hero__actions">
            {deals.length > 0 ? (
              <Button variant="solid" size="pill" onClick={scrollToGrid}>
                {ar ? "تسوقي كل العروض" : "Shop all offers"}
              </Button>
            ) : (
              <Button asChild variant="solid" size="pill">
                <Link to="/shop">{ar ? "تسوقي المجموعة" : "Shop the collection"}</Link>
              </Button>
            )}
            {countdownOffer && <Countdown offer={countdownOffer} ar={ar} number={number} />}
          </div>
        </Reveal>
        <div className="sf-deals-hero__visual">
          <img
            src={heroBanner ?? offersPhoto}
            alt=""
            className="sf-deals-hero__photo"
            fetchPriority="high"
          />
          {topDeal && (
            <DealTag product={topDeal} saving={savingOf(topDeal)} ar={ar} percent={percent} />
          )}
        </div>
      </section>

      {featured.length > 0 && (
        <section className="sf-deals-featured" aria-labelledby="featured-offers-heading">
          <h2 id="featured-offers-heading" className="sf-deals-label">
            {ar ? "عروض مميزة" : "Featured offers"}
          </h2>
          <ul>
            {featured.map((offer) => (
              <li key={offer.id}>
                <OfferSpotlight
                  offer={offer}
                  ar={ar}
                  active={offerId === offer.id}
                  onShop={() => {
                    setOfferId(offer.id);
                    scrollToGrid();
                  }}
                />
              </li>
            ))}
          </ul>
        </section>
      )}

      <section
        className="sf-shop-catalog sf-deals-catalog"
        aria-labelledby="deals-heading"
        ref={gridRef}
      >
        <h2 id="deals-heading" className="sr-only">
          {ar ? "كل العروض" : "All deals"}
        </h2>

        {categoryTiles.length > 1 && (
          <>
            <h3 className="sf-deals-section-title">
              {ar ? "تسوقي العروض حسب الفئة" : "Shop offers by category"}
            </h3>
            <CategoryScrollStrip
              locale={locale}
              viewportClassName="sf-deals-tiles"
              tabs
              label={ar ? "تصفية حسب الفئة" : "Filter by category"}
              activeKey={category ?? "all"}
            >
              <button
                type="button"
                role="tab"
                aria-selected={!category}
                className="sf-deals-tile sf-deals-tile--all"
                onClick={() => setCategory(null)}
              >
                <span className="sf-deals-tile__media" aria-hidden="true">
                  {categoryTiles.slice(0, categoryTiles.length >= 4 ? 4 : 2).map((tile) => (
                    <span key={tile.name} className="sf-deals-tile__cell">
                      <TileImage sources={tile.images} />
                    </span>
                  ))}
                </span>
                <span className="sf-deals-tile__name">{ar ? "كل العروض" : "All offers"}</span>
                <span className="sf-deals-tile__meta">
                  {maxSaving
                    ? ar
                      ? `خصم حتى ${percent(maxSaving)}`
                      : `Up to ${maxSaving}% off`
                    : ar
                      ? `${number(deals.length)} منتجاً`
                      : `${deals.length} products`}
                </span>
              </button>
              {categoryTiles.map((tile) => (
                <button
                  key={tile.name}
                  type="button"
                  role="tab"
                  aria-selected={category === tile.name}
                  className="sf-deals-tile"
                  onClick={() => setCategory(category === tile.name ? null : tile.name)}
                >
                  <span className="sf-deals-tile__media" aria-hidden="true">
                    <TileImage sources={tile.images} />
                  </span>
                  <span className="sf-deals-tile__name">{tile.name}</span>
                  <span className="sf-deals-tile__meta">
                    {tile.saving
                      ? ar
                        ? `خصم حتى ${percent(tile.saving)}`
                        : `Up to ${tile.saving}% off`
                      : ar
                        ? `${number(tile.count)} منتجات`
                        : `${tile.count} products`}
                  </span>
                </button>
              ))}
            </CategoryScrollStrip>
          </>
        )}

        {deals.length > 0 && (
          <div className="sf-deals-toolbar">
            <p className="sf-deals-toolbar__count" aria-live="polite">
              {visible.length !== deals.length ? (
                ar ? (
                  <>
                    <strong>{number(visible.length)}</strong> من {number(deals.length)} منتجاً
                  </>
                ) : (
                  <>
                    <strong>{visible.length}</strong> of {deals.length} products
                  </>
                )
              ) : (
                <>
                  <strong>{number(deals.length)}</strong> {ar ? "منتجاً" : "products"}
                </>
              )}
            </p>
            <div className="sf-deals-toolbar__actions">
              <div
                className="sf-deals-tiers"
                role="group"
                aria-label={ar ? "حد التوفير" : "Minimum saving"}
              >
                {([0, 20, 40] as const).map((value) => (
                  <button
                    key={value}
                    type="button"
                    aria-pressed={tier === value}
                    onClick={() => setTier(value)}
                  >
                    {value === 0
                      ? ar
                        ? "أي توفير"
                        : "Any saving"
                      : ar
                        ? `${percent(value)} فأكثر`
                        : `${value}%+ off`}
                  </button>
                ))}
              </div>
              {brandOptions.length > 1 && (
                <select
                  className="sf-deals-select"
                  aria-label={ar ? "العلامة التجارية" : "Brand"}
                  value={brand ?? ""}
                  onChange={(event) => setBrand(event.target.value || null)}
                >
                  <option value="">{ar ? "كل العلامات" : "All brands"}</option>
                  {brandOptions.map(([name, total]) => (
                    <option key={name} value={name}>
                      {name} ({number(total)})
                    </option>
                  ))}
                </select>
              )}
              <select
                className="sf-deals-select"
                aria-label={ar ? "ترتيب حسب" : "Sort by"}
                value={sort}
                onChange={(event) => setSort(event.target.value as SortMode)}
              >
                <option value="saving">{ar ? "الأكثر توفيراً" : "Biggest saving"}</option>
                <option value="price-asc">{ar ? "السعر: من الأقل" : "Price: low to high"}</option>
                <option value="price-desc">{ar ? "السعر: من الأعلى" : "Price: high to low"}</option>
                {hasEndDates && (
                  <option value="ending">{ar ? "ينتهي قريباً" : "Ending soon"}</option>
                )}
              </select>
            </div>
          </div>
        )}

        {(selectedOffer || brand) && (
          <div
            className="sf-shop-active-filters"
            aria-label={ar ? "الفلاتر النشطة" : "Active filters"}
          >
            {selectedOffer && (
              <button type="button" onClick={() => setOfferId(null)}>
                {selectedOffer.title}
                <X aria-hidden="true" />
              </button>
            )}
            {brand && (
              <button type="button" onClick={() => setBrand(null)}>
                {brand}
                <X aria-hidden="true" />
              </button>
            )}
            {activeFilters && (
              <button type="button" onClick={clearFilters}>
                {ar ? "مسح الكل" : "Clear all"}
              </button>
            )}
          </div>
        )}

        {query.isError ? (
          <EmptyState title={ar ? "تعذر تحميل العروض" : "Offers could not be loaded"} alert>
            <Button variant="line" size="pill" onClick={() => void query.refetch()}>
              {ar ? "حاولي مجدداً" : "Try again"}
            </Button>
          </EmptyState>
        ) : query.isLoading || loadingProducts ? (
          <div
            className="sf-shop-products sf-shop-products--grid sf-deals-grid"
            role="status"
            aria-label={ar ? "جارٍ التحميل" : "Loading deals"}
          >
            {Array.from({ length: 8 }, (_, index) => (
              <div key={index} className="animate-pulse">
                <div className="aspect-[4/5] bg-stone" />
                <div className="mt-4 h-3 w-20 bg-stone" />
                <div className="mt-3 h-5 w-3/4 bg-stone" />
              </div>
            ))}
          </div>
        ) : products.isError ? (
          <EmptyState title={ar ? "تعذر تحميل المنتجات." : "Products could not be loaded."} alert>
            <Button variant="line" size="pill" onClick={() => void products.refetch()}>
              {ar ? "حاولي مجدداً" : "Try again"}
            </Button>
          </EmptyState>
        ) : visible.length ? (
          <div className="sf-shop-products sf-shop-products--grid sf-deals-grid">
            {visible.map((product, index) => (
              <Reveal key={product.id} delay={(index % 4) * 35}>
                <ProductCard product={product} compact />
              </Reveal>
            ))}
          </div>
        ) : deals.length ? (
          <EmptyState title={ar ? "لا توجد عروض بهذه الفلاتر" : "No deals match these filters"}>
            <Button variant="line" size="pill" onClick={clearFilters}>
              {ar ? "مسح الفلاتر" : "Clear filters"}
            </Button>
          </EmptyState>
        ) : !scopeOffers.length ? (
          <EmptyState
            title={ar ? "لا توجد عروض نشطة حالياً" : "No offers are running right now"}
            copy={
              ar
                ? "تصفحي المجموعة الكاملة، وستظهر العروض الجديدة هنا فور إطلاقها."
                : "Browse the full collection. New offers will appear here as soon as they start."
            }
          >
            <Button asChild variant="line" size="pill">
              <Link to="/shop">{ar ? "تسوقي المجموعة" : "Shop the collection"}</Link>
            </Button>
          </EmptyState>
        ) : null}
      </section>

      {scopeOffers.length > 0 && (
        <section className="sf-deals-scopes" aria-labelledby="collection-deals-heading">
          <h2 id="collection-deals-heading" className="sf-deals-section-title">
            {ar ? "خصومات على مجموعات كاملة" : "Whole-collection deals"}
          </h2>
          <ul>
            {scopeOffers.flatMap((offer) => {
              const label = offer.badgeText?.trim() || offer.title;
              return [
                ...(categories.data ?? [])
                  .filter((item) => offer.categoryIds.includes(item.id))
                  .map((item) => (
                    <li key={`${offer.id}-${item.id}`}>
                      <Link to="/shop" search={{ category: item.slug }}>
                        <strong>{ar ? item.nameAr : item.nameEn}</strong>
                        <span>{label}</span>
                        <ArrowRight aria-hidden="true" />
                      </Link>
                    </li>
                  )),
                ...(brands.data ?? [])
                  .filter((item) => offer.brandIds.includes(item.id))
                  .map((item) => (
                    <li key={`${offer.id}-${item.id}`}>
                      <Link to="/brands/$slug" params={{ slug: item.slug }}>
                        <strong>{item.name}</strong>
                        <span>{label}</span>
                        <ArrowRight aria-hidden="true" />
                      </Link>
                    </li>
                  )),
              ];
            })}
          </ul>
        </section>
      )}
    </main>
  );
}

function useNow(intervalMs: number) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), intervalMs);
    return () => window.clearInterval(timer);
  }, [intervalMs]);
  return now;
}

/** Shown only when the admin enabled a countdown for the offer. Minute precision, no ticking seconds. */
function Countdown({
  offer,
  ar,
  number,
}: {
  offer: StorefrontOffer;
  ar: boolean;
  number: (value: number) => string;
}) {
  const now = useNow(30_000);
  const left = Math.max(0, dateValue(offer.endsAt, 0) - now);
  if (!left) return null;
  const days = Math.floor(left / 86_400_000);
  const hours = Math.floor(left / 3_600_000) % 24;
  const minutes = Math.floor(left / 60_000) % 60;
  const parts = ar
    ? [
        days && `${number(days)} يوم`,
        (days || hours) && `${number(hours)} ساعة`,
        !days && `${number(minutes)} دقيقة`,
      ]
    : [days && `${days}d`, (days || hours) && `${hours}h`, !days && `${minutes}m`];
  return (
    <p className="sf-deals-hero__ends" role="timer" aria-live="off">
      {ar ? `ينتهي ${offer.title} خلال ` : `${offer.title} ends in `}
      <strong>{parts.filter(Boolean).join(" ")}</strong>
    </p>
  );
}

/** Some catalog images are hotlinked and can fail; fall back to the category's next product. */
function TileImage({ sources }: { sources: string[] }) {
  const [index, setIndex] = useState(0);
  const src = sources[index];
  if (!src) return null;
  return <img src={src} alt="" loading="lazy" onError={() => setIndex((value) => value + 1)} />;
}

/** The single biggest saving, pinned to the photograph like a shelf price tag. */
function DealTag({
  product,
  saving,
  ar,
  percent,
}: {
  product: Product;
  saving: number;
  ar: boolean;
  percent: (value: number) => string;
}) {
  return (
    <Link to="/product/$slug" params={{ slug: product.slug }} className="sf-deals-tag">
      <span className="sf-deals-tag__image" aria-hidden="true">
        <img src={product.image} alt="" />
      </span>
      <span className="sf-deals-tag__body">
        <span className="sf-deals-tag__label">{ar ? "أكبر توفير" : "Biggest saving"}</span>
        <span className="sf-deals-tag__name">{product.name}</span>
        <span className="sf-deals-tag__price">
          <strong>{formatPrice(product.price)}</strong>
          {product.originalPrice && product.originalPrice > product.price && (
            <s>{formatPrice(product.originalPrice)}</s>
          )}
        </span>
      </span>
      <span className="sf-deals-tag__seal">
        <bdi dir="ltr">−{percent(saving)}</bdi>
      </span>
    </Link>
  );
}

function OfferSpotlight({
  offer,
  ar,
  active,
  onShop,
}: {
  offer: StorefrontOffer;
  ar: boolean;
  active: boolean;
  onShop: () => void;
}) {
  const image = publicAssetUrl(offer.bannerImageKey);
  const end = dateValue(offer.endsAt, 0);
  const meta = [
    offer.badgeText?.trim(),
    end > Date.now() &&
      `${ar ? "حتى" : "Until"} ${new Intl.DateTimeFormat(ar ? "ar-EG" : "en-EG", {
        day: "numeric",
        month: "long",
        timeZone: "Africa/Cairo",
      }).format(end)}`,
  ].filter(Boolean);
  return (
    <article className="sf-deals-spotlight" data-active={active || undefined}>
      {image && (
        <PolishedImage
          src={image}
          alt=""
          loading="lazy"
          wrapperClassName="sf-deals-spotlight__media"
        />
      )}
      <div className="sf-deals-spotlight__body">
        {meta.length > 0 && <p className="sf-deals-spotlight__meta">{meta.join(" · ")}</p>}
        <h3>{offer.title}</h3>
        {offer.description && <p>{offer.description}</p>}
        {offer.productIds.length > 0 && (
          <Button variant="underline" aria-pressed={active} onClick={onShop}>
            {ar
              ? `تسوقي ${offer.productIds.length} منتجات`
              : `Shop ${offer.productIds.length} products`}
            <ArrowRight aria-hidden="true" className="rtl:-scale-x-100" />
          </Button>
        )}
      </div>
    </article>
  );
}

function EmptyState({
  title,
  copy,
  alert,
  children,
}: {
  title: string;
  copy?: string;
  alert?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="sf-deals-empty" role={alert ? "alert" : undefined}>
      <h3>{title}</h3>
      {copy && <p>{copy}</p>}
      {children}
    </div>
  );
}

function publicAssetUrl(key?: string | null) {
  if (!key) return null;
  if (/^https?:\/\//i.test(key)) return key;
  const base = import.meta.env["VITE_MEDIA_BASE_URL"] as string | undefined;
  return base ? `${base.replace(/\/+$/, "")}/${key.replace(/^\/+/, "")}` : null;
}
