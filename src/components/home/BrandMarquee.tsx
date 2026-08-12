import { Link } from "@tanstack/react-router";
import { useMemo, type CSSProperties } from "react";

import type { PublicBrandListItemResponse } from "@/lib/api";
import { useBrands } from "@/lib/catalog";
import { useStore } from "@/lib/store";

type BrandMarqueeProps = {
  initialBrands?: PublicBrandListItemResponse[];
};

export function BrandMarquee({ initialBrands }: BrandMarqueeProps) {
  const { locale } = useStore();
  const { data } = useBrands(initialBrands);
  const brands = useMemo(
    () =>
      [...(data ?? [])].sort((left, right) =>
        left.name.localeCompare(right.name, locale, { sensitivity: "base" }),
      ),
    [data, locale],
  );

  if (!brands.length) return null;

  const moving = brands.length > 1;
  const style = {
    "--brand-marquee-duration": `${Math.min(72, Math.max(28, brands.length * 5))}s`,
  } as CSSProperties;
  const heading = locale === "ar" ? "العلامات التجارية المتاحة" : "Available brands";

  return (
    <section className="sf-brand-marquee" aria-labelledby="brand-marquee-title" style={style}>
      <h2 id="brand-marquee-title" className="sr-only">
        {heading}
      </h2>
      <div className="sf-brand-marquee__viewport">
        <div className="sf-brand-marquee__track" data-static={!moving || undefined}>
          <div className="sf-brand-marquee__group">
            {brands.map((brand) => (
              <BrandLink key={brand.id} brand={brand} />
            ))}
          </div>

          {moving && (
            <div
              className="sf-brand-marquee__group sf-brand-marquee__group--clone"
              aria-hidden="true"
            >
              {brands.map((brand) => (
                <BrandLink key={brand.id} brand={brand} decorative />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function BrandLink({
  brand,
  decorative = false,
}: {
  brand: PublicBrandListItemResponse;
  decorative?: boolean;
}) {
  return (
    <Link
      to="/shop"
      search={{ brand: brand.slug }}
      className="sf-brand-marquee__item"
      title={decorative ? undefined : brand.name}
      tabIndex={decorative ? -1 : undefined}
    >
      <BrandMark brand={brand} decorative={decorative} />
    </Link>
  );
}

function BrandMark({
  brand,
  decorative = false,
}: {
  brand: PublicBrandListItemResponse;
  decorative?: boolean;
}) {
  const logoUrl = brand.logoUrl?.trim();

  return logoUrl ? (
    <img
      src={logoUrl}
      alt={decorative ? "" : brand.name}
      width={144}
      height={42}
      loading="lazy"
      decoding="async"
    />
  ) : (
    <span className="sf-brand-marquee__name">{brand.name}</span>
  );
}
