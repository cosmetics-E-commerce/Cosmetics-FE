import { Link } from "@tanstack/react-router";
import { useMemo, useState, type CSSProperties } from "react";

import type { PublicBrandListItemResponse } from "@/lib/api";
import { useAllBrands } from "@/lib/catalog";
import { useStore } from "@/lib/store";

type BrandMarqueeProps = {
  initialBrands?: PublicBrandListItemResponse[];
};

const marqueeSecondsPerBrand = 4.6;
const minimumMarqueeDuration = 36;
const priorityLogoCount = 10;

export function BrandMarquee({ initialBrands }: BrandMarqueeProps) {
  const { locale } = useStore();
  const { data } = useAllBrands(initialBrands);
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
    "--brand-marquee-duration": `${Math.max(
      minimumMarqueeDuration,
      brands.length * marqueeSecondsPerBrand,
    )}s`,
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
            {brands.map((brand, index) => (
              <BrandLink key={brand.id} brand={brand} priority={index < priorityLogoCount} />
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
  priority = false,
}: {
  brand: PublicBrandListItemResponse;
  decorative?: boolean;
  priority?: boolean;
}) {
  return (
    <Link
      to="/brands/$slug"
      params={{ slug: brand.slug }}
      className="sf-brand-marquee__item"
      aria-label={decorative ? undefined : brand.name}
      title={decorative ? undefined : brand.name}
      tabIndex={decorative ? -1 : undefined}
    >
      <BrandMark brand={brand} decorative={decorative} priority={priority} />
    </Link>
  );
}

function BrandMark({
  brand,
  decorative = false,
  priority = false,
}: {
  brand: PublicBrandListItemResponse;
  decorative?: boolean;
  priority?: boolean;
}) {
  const logoUrl = brand.logoUrl?.trim();
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <span className="sf-brand-marquee__logo">
      {logoUrl && !imageFailed ? (
        <img
          src={logoUrl}
          alt={decorative ? "" : brand.name}
          width={190}
          height={66}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "low"}
          decoding="async"
          draggable={false}
          onError={() => setImageFailed(true)}
        />
      ) : (
        <span className="sf-brand-marquee__name">{brand.name}</span>
      )}
    </span>
  );
}
