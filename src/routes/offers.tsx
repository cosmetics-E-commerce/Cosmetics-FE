import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, LoaderCircle, Tag } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { OfferCard } from "@/components/offers/OfferCard";
import { apiErrorMessage, listOffers, subscribeNewsletter } from "@/lib/api";
import { dateValue, useOfferCatalog } from "@/lib/offers";
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
  const { products, categories, brands } = useOfferCatalog(offers, locale);

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
