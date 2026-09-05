import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { OfferCard } from "./OfferCard";
import type { StorefrontOffer } from "@/lib/api";
import type { Locale } from "@/lib/catalog";
import { useOfferCatalog } from "@/lib/offers";
import "./offer-hero.css";

export function OfferHero({ offers, locale }: { offers: StorefrontOffer[]; locale: Locale }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = Math.max(
    0,
    offers.findIndex((offer) => offer.id === selectedId),
  );
  const active = offers[selected];
  const ar = locale === "ar";
  const { products, categories, brands } = useOfferCatalog(offers, locale);
  if (!active) return null;
  const move = (step: number) =>
    setSelectedId(offers[(selected + step + offers.length) % offers.length]?.id ?? null);
  return (
    <section
      id="home-hero"
      className="sf-offers-home-hero"
      dir={ar ? "rtl" : "ltr"}
      aria-label={ar ? "عروض بيوريزا" : "BIOREZA featured offers"}
      aria-roledescription={offers.length > 1 ? "carousel" : undefined}
    >
      <div className="sf-offers-home-hero__bar">
        <p className="sf-offers-eyebrow">{ar ? "عروض بيوريزا" : "An offer from BIOREZA"}</p>
        {offers.length > 1 && (
          <div className="sf-offers-home-hero__controls">
            <button
              type="button"
              onClick={() => move(-1)}
              aria-label={ar ? "العرض السابق" : "Previous offer"}
            >
              <ChevronLeft aria-hidden="true" />
            </button>
            <span aria-live="polite" aria-atomic="true">
              {selected + 1} / {offers.length}
            </span>
            <button
              type="button"
              onClick={() => move(1)}
              aria-label={ar ? "العرض التالي" : "Next offer"}
            >
              <ChevronRight aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
      <OfferCard
        key={active.id}
        hero
        offer={active}
        products={products.data ?? []}
        loading={products.isFetching && !products.data}
        failed={products.isError}
        onRetry={() => void products.refetch()}
        categories={categories.data ?? []}
        brands={brands.data ?? []}
        ar={ar}
      />
    </section>
  );
}
