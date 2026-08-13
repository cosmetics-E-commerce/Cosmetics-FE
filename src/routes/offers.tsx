import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Clock, Sparkles } from "lucide-react";
import { Reveal } from "@/components/brand/Reveal";
import { Button } from "@/components/ui/button";
import { listOffers } from "@/lib/api";
import { createSeoHead } from "@/lib/seo";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/offers")({
  loader: () => listOffers(),
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
  const { locale } = useStore();
  const ar = locale === "ar";
  const query = useQuery({
    queryKey: ["offers"],
    queryFn: listOffers,
    initialData: initialOffers,
    refetchInterval: 60_000,
  });
  return (
    <main className="sf-offers-page mx-auto min-h-[70vh] max-w-[1400px] px-5 py-14 md:px-10 lg:py-20">
      <Reveal stagger staggerMs={45} distance={22}>
        <p className="label-xs text-gold">{ar ? "عروض حالية" : "Current offers"}</p>
        <h1 className="display mt-5 text-[clamp(2.5rem,5vw,4.8rem)]">
          {ar ? "توفير يُطبّق بوضوح." : "Offers, thoughtfully applied."}
        </h1>
        <p className="mt-5 max-w-2xl text-muted-foreground">
          {ar
            ? "يُحسب كل توفير مؤهل تلقائياً ويُؤكد مرة أخرى بأمان عند إتمام الطلب."
            : "Every eligible saving is calculated automatically and confirmed again securely at checkout."}
        </p>
      </Reveal>
      {query.isLoading ? (
        <div className="mt-14 grid grid-cols-[minmax(0,1fr)] gap-5 md:grid-cols-2">
          <div className="h-64 animate-pulse bg-stone" />
          <div className="h-64 animate-pulse bg-stone" />
        </div>
      ) : query.data?.length ? (
        <div className="mt-14 grid grid-cols-[minmax(0,1fr)] gap-5 md:grid-cols-2">
          {query.data.map((offer, index) => (
            <Reveal key={offer.id} delay={index * 70} className="min-w-0">
              <article
                className={`offer-card min-w-0 h-full border p-5 sm:p-7 md:p-9 ${offer.featured ? "border-gold bg-ivory" : "border-border"}`}
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="label-xs text-gold">
                    {offer.badgeText ?? offer.type.replaceAll("_", " ")}
                  </span>
                  <Sparkles className="size-5 text-gold" />
                </div>
                <h2 className="mt-8 font-serif text-3xl">{offer.title}</h2>
                {offer.description && (
                  <p className="mt-4 leading-relaxed text-muted-foreground">{offer.description}</p>
                )}
                {offer.endsAt && (
                  <p className="mt-7 flex items-center gap-2 text-sm text-taupe">
                    <Clock className="size-4" />
                    {ar ? "ينتهي" : "Ends"}{" "}
                    {new Intl.DateTimeFormat(ar ? "ar-EG" : "en-EG", {
                      dateStyle: "medium",
                      timeStyle: "short",
                      timeZone: "Africa/Cairo",
                    }).format(new Date(offer.endsAt))}
                  </p>
                )}
                <Button
                  asChild
                  variant="line"
                  size="pill"
                  className="mt-8 max-w-full px-4 text-center sm:px-6"
                >
                  <Link to="/shop">
                    {ar ? "تصفّحي المنتجات المؤهلة" : "Explore eligible products"}
                  </Link>
                </Button>
              </article>
            </Reveal>
          ))}
        </div>
      ) : (
        <div className="mt-14 border border-border px-5 py-14 text-center sm:p-14">
          <h2 className="font-serif text-3xl">
            {ar ? "لا توجد عروض نشطة حالياً" : "No active offers right now"}
          </h2>
          <p className="mt-3 text-muted-foreground">
            {ar
              ? "تظل المنتجات متاحة بأسعارها العادية."
              : "The collection is still available at its regular pricing."}
          </p>
          <Button asChild variant="line" size="pill" className="mt-7 max-w-full px-5 text-center">
            <Link to="/shop">{ar ? "تصفّحي المنتجات" : "Explore the collection"}</Link>
          </Button>
        </div>
      )}
    </main>
  );
}
