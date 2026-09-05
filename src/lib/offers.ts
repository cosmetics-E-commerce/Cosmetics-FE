import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { loadProductsByIds, useBrands, useCategories, type Locale } from "@/lib/catalog";
import { listHeroOffers, type StorefrontOffer } from "@/lib/api";

export const heroOffersQuery = () => ({
  queryKey: ["hero-offers"] as const,
  queryFn: listHeroOffers,
  retry: false,
  staleTime: 60_000,
});

export function useOfferCatalog(offers: StorefrontOffer[], locale: Locale) {
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

  return { products, categories, brands };
}

export function dateValue(value: string | null, fallback: number) {
  const time = value ? new Date(value).getTime() : NaN;
  return Number.isFinite(time) ? time : fallback;
}
