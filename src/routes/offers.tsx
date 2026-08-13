import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  CalendarDays,
  Copy,
  Gift,
  LoaderCircle,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
  Tag,
  Timer,
  Truck,
  Undo2,
} from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Reveal } from "@/components/brand/Reveal";
import { Button } from "@/components/ui/button";
import { PolishedImage } from "@/components/ui/polished-image";
import { apiErrorMessage, listOffers, subscribeNewsletter, type StorefrontOffer } from "@/lib/api";
import { createSeoHead } from "@/lib/seo";
import { useStore } from "@/lib/store";

type SortMode = "latest" | "ending";
type DisplayOffer = StorefrontOffer & {
  couponCode?: string | null;
  bannerImageUrl?: string | null;
  bannerImageKey?: string | null;
};

const benefitItems = [
  {
    icon: ShieldCheck,
    title: "Genuine offers",
    copy: "Only real, verified offers.",
  },
  {
    icon: LockKeyhole,
    title: "Secure savings",
    copy: "Applied safely at checkout.",
  },
  {
    icon: Gift,
    title: "Exclusive benefits",
    copy: "Special offers for you.",
  },
  {
    icon: Timer,
    title: "Limited time",
    copy: "Don't miss out.",
  },
] as const;

const trustItems = [
  { icon: Truck, title: "Free Shipping" },
  { icon: Undo2, title: "Easy Returns" },
  { icon: ShieldCheck, title: "100% Authentic" },
  { icon: Sparkles, title: "Customer Care" },
] as const;

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
  const query = useQuery({
    queryKey: ["offers"],
    queryFn: listOffers,
    initialData: initialOffers,
    refetchInterval: 60_000,
  });
  const { locale } = useStore();
  const [sort, setSort] = useState<SortMode>("latest");
  const [subscribing, setSubscribing] = useState(false);
  const offers = useMemo(() => {
    const data = ((query.data ?? []) as DisplayOffer[]).slice();
    return data.sort((a, b) => {
      if (sort === "ending") {
        return (
          dateValue(a.endsAt, Number.POSITIVE_INFINITY) -
          dateValue(b.endsAt, Number.POSITIVE_INFINITY)
        );
      }
      return dateValue(b.startsAt, 0) - dateValue(a.startsAt, 0);
    });
  }, [query.data, sort]);

  return (
    <main className="sf-offers-page">
      <section className="sf-offers-hero" aria-labelledby="offers-heading">
        <Reveal stagger staggerMs={45} distance={22} className="sf-offers-hero__copy">
          <p className="sf-offers-eyebrow">Current offers</p>
          <h1 id="offers-heading">Offers, thoughtfully applied.</h1>
          <p>
            Every eligible saving is calculated automatically and confirmed again securely at
            checkout.
          </p>
        </Reveal>
        <OffersEmblem />
      </section>

      <Reveal as="section" className="sf-offers-benefits" aria-label="Offer benefits">
        {benefitItems.map((item) => (
          <article key={item.title} className="sf-offers-benefit">
            <item.icon aria-hidden="true" />
            <div>
              <h2>{item.title}</h2>
              <p>{item.copy}</p>
            </div>
          </article>
        ))}
      </Reveal>

      <div className="sf-offers-divider" aria-hidden="true" />

      <section className="sf-offers-active" aria-labelledby="active-offers-heading">
        <div className="sf-offers-section-head">
          <div>
            <p className="sf-offers-eyebrow">Active savings</p>
            <h2 id="active-offers-heading">Active Offers</h2>
          </div>
          <label className="sf-offers-sort">
            <span>Sort by:</span>
            <select value={sort} onChange={(event) => setSort(event.target.value as SortMode)}>
              <option value="latest">Latest</option>
              <option value="ending">Ending soon</option>
            </select>
          </label>
        </div>

        {query.isLoading ? (
          <div className="sf-offers-grid" aria-label="Loading offers">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="sf-offer-card sf-offer-card--loading" />
            ))}
          </div>
        ) : query.isError ? (
          <div className="sf-offers-empty" role="alert">
            <h2>Offers could not be loaded</h2>
            <p>Refresh the page or return to the collection while we reconnect to the store.</p>
            <Button asChild variant="line" size="pill">
              <Link to="/shop">Explore the collection</Link>
            </Button>
          </div>
        ) : offers.length ? (
          <div className="sf-offers-grid">
            {offers.map((offer, index) => (
              <Reveal key={offer.id} delay={index * 70}>
                <article className="sf-offer-card" data-featured={offer.featured || undefined}>
                  <div className="sf-offer-card__content">
                    <div className="sf-offer-card__topline">
                      <span>{offer.badgeText ?? readableType(offer.type)}</span>
                      <Sparkles aria-hidden="true" />
                    </div>
                    <h3>{offer.title}</h3>
                    {offer.description && <p>{offer.description}</p>}
                    <OfferCode code={offer.couponCode ?? null} />
                    <div className="sf-offer-card__meta">
                      <CalendarDays aria-hidden="true" />
                      <span>
                        {offer.endsAt
                          ? `Valid until ${formatOfferDate(offer.endsAt)}`
                          : "Available while the offer is active"}
                      </span>
                    </div>
                  </div>
                  <OfferVisual offer={offer} />
                </article>
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="sf-offers-empty">
            <h2>No active offers right now</h2>
            <p>The collection is still available at its regular pricing.</p>
            <Button asChild variant="line" size="pill" className="mt-7">
              <Link to="/shop">Explore the collection</Link>
            </Button>
          </div>
        )}
      </section>

      <Reveal as="section" className="sf-offers-newsletter">
        <div className="sf-offers-newsletter__visual" aria-hidden="true">
          <Gift />
        </div>
        <div>
          <p className="sf-offers-eyebrow">Private beauty notes</p>
          <h2>More beauty, more benefits.</h2>
          <p>
            Subscribe to our newsletter and be the first to know about exclusive offers and new
            arrivals.
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
            Email address
          </label>
          <input
            id="offers-newsletter-email"
            name="email"
            type="email"
            placeholder="Email address"
            autoComplete="email"
            required
          />
          <button type="submit" disabled={subscribing}>
            {subscribing ? (
              <LoaderCircle aria-hidden="true" className="animate-spin" />
            ) : (
              "Subscribe"
            )}
            {!subscribing && <ArrowRight aria-hidden="true" />}
          </button>
        </form>
      </Reveal>

      <Reveal as="section" className="sf-offers-trust" aria-label="Service benefits">
        {trustItems.map((item) => (
          <div key={item.title}>
            <item.icon aria-hidden="true" />
            <span>{item.title}</span>
          </div>
        ))}
      </Reveal>
    </main>
  );
}

/** Decorative offers seal: a rotating engraved ring around a gold percentage mark. */
function OffersEmblem() {
  return (
    <div className="sf-offers-emblem" aria-hidden="true">
      <svg viewBox="0 0 400 400" role="presentation" focusable="false">
        <defs>
          <linearGradient id="sfOffersGold" x1="0.1" y1="0" x2="0.9" y2="1">
            <stop offset="0%" stopColor="#e2c085" />
            <stop offset="48%" stopColor="#a3742f" />
            <stop offset="100%" stopColor="#6d4a1c" />
          </linearGradient>
          <radialGradient id="sfOffersHalo" cx="0.5" cy="0.45" r="0.55">
            <stop offset="0%" stopColor="#f4e3c6" stopOpacity="0.72" />
            <stop offset="70%" stopColor="#f6ecdc" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
          <path
            id="sfOffersRingPath"
            fill="none"
            d="M200,200 m-152,0 a152,152 0 1,1 304,0 a152,152 0 1,1 -304,0"
          />
        </defs>

        <circle cx="200" cy="200" r="200" fill="url(#sfOffersHalo)" />
        <circle className="sf-offers-emblem__ring" cx="200" cy="200" r="178" />
        <circle
          className="sf-offers-emblem__ring sf-offers-emblem__ring--dashed"
          cx="200"
          cy="200"
          r="132"
        />
        <circle className="sf-offers-emblem__disc" cx="200" cy="200" r="120" />

        <g className="sf-offers-emblem__rotor">
          <text className="sf-offers-emblem__caption">
            <textPath href="#sfOffersRingPath" xlinkHref="#sfOffersRingPath" startOffset="0">
              BIOREZA · EXCLUSIVE OFFERS · SAVE MORE · BIOREZA · EXCLUSIVE OFFERS · SAVE MORE ·
            </textPath>
          </text>
        </g>

        <text className="sf-offers-emblem__glyph" x="200" y="196">
          %
        </text>
        <text className="sf-offers-emblem__word" x="200" y="256">
          SAVE MORE
        </text>
      </svg>
    </div>
  );
}

function OfferCode({ code }: { code?: string | null }) {
  const [copied, setCopied] = useState(false);

  if (!code) {
    return (
      <p className="sf-offer-code">
        <Tag aria-hidden="true" />
        <span>No code needed</span>
      </p>
    );
  }

  return (
    <button
      type="button"
      className="sf-offer-code sf-offer-code--button"
      onClick={() => {
        const copiedToClipboard = navigator.clipboard?.writeText(code);
        if (!copiedToClipboard) return;
        void copiedToClipboard.then(() => {
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1600);
        });
      }}
      aria-label={`Copy offer code ${code}`}
    >
      <span>Code: {code}</span>
      <Copy aria-hidden="true" />
      {copied && <small>Copied</small>}
    </button>
  );
}

function OfferVisual({ offer }: { offer: DisplayOffer }) {
  const image = offer.bannerImageUrl ?? publicAssetUrl(offer.bannerImageKey);
  return (
    <div className="sf-offer-card__visual" aria-hidden={!image}>
      {image ? (
        <PolishedImage src={image} alt="" loading="lazy" className="size-full object-contain" />
      ) : (
        <div className="sf-offer-card__art" aria-hidden="true">
          <span />
          <strong>{offer.badgeText ?? readableType(offer.type)}</strong>
        </div>
      )}
    </div>
  );
}

function readableType(type: string) {
  return type.replaceAll("_", " ").toLowerCase();
}

function formatOfferDate(value: string) {
  return new Intl.DateTimeFormat("en-EG", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "Africa/Cairo",
  }).format(new Date(value));
}

function dateValue(value: string | null, fallback: number) {
  return value ? new Date(value).getTime() : fallback;
}

function publicAssetUrl(key?: string | null) {
  if (!key) return null;
  if (/^https?:\/\//i.test(key)) return key;
  const base = import.meta.env["VITE_MEDIA_BASE_URL"] as string | undefined;
  return base ? `${base.replace(/\/+$/, "")}/${key.replace(/^\/+/, "")}` : null;
}
