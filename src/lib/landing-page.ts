import type { LandingPageSection } from "@cosmetics/contracts/page-builder/page-builder.schema";
import type { Locale } from "@/lib/catalog";

export function isLandingSectionVisible(
  section: LandingPageSection,
  locale: Locale,
  now = Date.now(),
) {
  if (!section.enabled || !section.visibility.locales.includes(locale)) return false;
  return (
    (!section.visibility.startsAt || Date.parse(section.visibility.startsAt) <= now) &&
    (!section.visibility.endsAt || now < Date.parse(section.visibility.endsAt))
  );
}
