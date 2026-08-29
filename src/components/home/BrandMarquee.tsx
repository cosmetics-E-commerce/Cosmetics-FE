import { Link } from "@tanstack/react-router";
import { useMemo, useState, type CSSProperties } from "react";

import type { PublicBrandListItemResponse } from "@/lib/api";
import { useBrandMarquee, usePublicStoreSettings } from "@/lib/catalog";
import { useStore } from "@/lib/store";
import { sortBrands } from "@/components/layout/brand-directory-data";
import { brandMarqueeDuration } from "@/lib/brand-marquee";
import { useDraggableMarquee } from "./useDraggableMarquee";

type BrandMarqueeProps = {
  initialBrands?: PublicBrandListItemResponse[];
};

const priorityLogoCount = 10;

export function BrandMarquee({ initialBrands }: BrandMarqueeProps) {
  const { locale } = useStore();
  const { data } = useBrandMarquee(initialBrands);
  const settings = usePublicStoreSettings();
  const brands = useMemo(() => sortBrands(data ?? [], locale), [data, locale]);
  const moving = brands.length > 1;
  const marquee = useDraggableMarquee({
    enabled: moving,
    direction: locale === "ar" ? 1 : -1,
  });

  if (!brands.length) return null;
  const speed = settings.data?.brandMarqueeSpeed;
  const style = {
    "--brand-marquee-duration": `${brandMarqueeDuration(brands.length, speed)}s`,
  } as CSSProperties;
  const heading = locale === "ar" ? "العلامات التجارية المتاحة" : "Available brands";

  return (
    <section
      ref={marquee.rootRef}
      className="sf-brand-marquee"
      aria-labelledby="brand-marquee-title"
      style={style}
    >
      <h2 id="brand-marquee-title" className="sr-only">
        {heading}
      </h2>
      <div ref={marquee.viewportRef} className="sf-brand-marquee__viewport">
        <div
          ref={marquee.trackRef}
          className="sf-brand-marquee__track"
          data-static={!moving || undefined}
        >
          <div ref={marquee.groupRef} className="sf-brand-marquee__group">
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
