import { queryOptions } from "@tanstack/react-query";
import type {
  LocalizedNavigationText,
  NavigationPublicSnapshot,
  NavigationVisibility,
} from "@cosmetics/contracts";

import { getPublishedNavigation } from "@/lib/api";

export const publishedNavigationQuery = () =>
  queryOptions({
    queryKey: ["published-navigation"],
    queryFn: ({ signal }) => getPublishedNavigation(signal),
    staleTime: 5 * 60_000,
    gcTime: 30 * 60_000,
    retry: 1,
  });

export function localizedNavigationText(value: LocalizedNavigationText, locale: "en" | "ar") {
  return value[locale].trim() || value[locale === "ar" ? "en" : "ar"].trim();
}

export function navigationVisibilityAllows(
  visibility: NavigationVisibility,
  locale: "en" | "ar",
  device: "DESKTOP" | "TABLET" | "MOBILE",
  now = Date.now(),
) {
  if (!visibility.locales.includes(locale) || !visibility.devices.includes(device)) return false;
  if (visibility.startsAt && Date.parse(visibility.startsAt) > now) return false;
  if (visibility.endsAt && Date.parse(visibility.endsAt) <= now) return false;
  return true;
}

export function publishedNavigationIsUsable(
  snapshot: NavigationPublicSnapshot | undefined,
): snapshot is NavigationPublicSnapshot {
  return Boolean(
    snapshot?.revisionId &&
    snapshot.revisionId !== "fallback" &&
    snapshot.config.schemaVersion === 2 &&
    snapshot.config.items.length,
  );
}
