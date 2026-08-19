import { memo, useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { groupBrands, selectPopularBrands } from "@/components/layout/brand-directory-data";
import type { PublicBrandListItemResponse } from "@/lib/api";

type BrandDirectoryCopy = {
  brandDirectory: string;
  popular: string;
  viewAllBrands: string;
  brandsEmpty: string;
  products: (count: number) => string;
};

type BrandDirectoryProps = {
  brands: PublicBrandListItemResponse[];
  loading: boolean;
  locale: "ar" | "en";
  onNavigate: () => void;
  copy: BrandDirectoryCopy;
  surface: "mega" | "mobile";
};

export const BrandDirectory = memo(function BrandDirectory({
  brands,
  loading,
  locale,
  onNavigate,
  copy,
  surface,
}: BrandDirectoryProps) {
  const groups = useMemo(() => groupBrands(brands, locale), [brands, locale]);
  const popular = useMemo(() => selectPopularBrands(brands, locale), [brands, locale]);
  const headingId = `brand-directory-${surface}-heading`;
  const DirectoryHeading = surface === "mobile" ? "h4" : "h2";
  const GroupHeading = surface === "mobile" ? "h5" : "h3";

  return (
    <section
      className={`brand-index brand-index--${surface}`}
      dir={locale === "ar" ? "rtl" : "ltr"}
      aria-labelledby={headingId}
    >
      <header className="brand-index__header">
        <DirectoryHeading id={headingId} className="brand-index__title">
          {copy.brandDirectory}
        </DirectoryHeading>
        <Link to="/shop" onClick={onNavigate} className="brand-index__all">
          {copy.viewAllBrands}
          <ChevronRight className="brand-index__all-arrow" aria-hidden="true" />
        </Link>
      </header>

      {loading ? (
        <div className="brand-index__skeleton" aria-hidden="true">
          {Array.from({ length: 8 }, (_, index) => (
            <span key={index} />
          ))}
        </div>
      ) : groups.length ? (
        <>
          {popular.length > 0 && (
            <section className="brand-index__popular" aria-labelledby={`${headingId}-popular`}>
              <GroupHeading id={`${headingId}-popular`} className="brand-index__popular-title">
                {copy.popular}
              </GroupHeading>
              <ul>
                {popular.map((brand, index) => (
                  <li key={brand.id}>
                    <Link
                      to="/brands/$slug"
                      params={{ slug: brand.slug }}
                      onClick={onNavigate}
                      aria-label={`${brand.name} — ${copy.products(brand.productCount)}`}
                    >
                      <span className="brand-index__rank" aria-hidden="true">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span>{brand.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <div className="brand-index__groups">
            {groups.map((group, groupIndex) => {
              const groupHeadingId = `${headingId}-group-${groupIndex}`;
              return (
                <section
                  key={group.key}
                  className="brand-index__group"
                  aria-labelledby={groupHeadingId}
                >
                  <GroupHeading id={groupHeadingId} className="brand-index__letter">
                    {group.key}
                  </GroupHeading>
                  <ul>
                    {group.brands.map((brand) => (
                      <li key={brand.id}>
                        <Link
                          to="/brands/$slug"
                          params={{ slug: brand.slug }}
                          onClick={onNavigate}
                          className="brand-index__link"
                          aria-label={`${brand.name} — ${copy.products(brand.productCount)}`}
                        >
                          <span className="brand-index__name">{brand.name}</span>
                          <span className="brand-index__meta" aria-hidden="true">
                            <small>{brand.productCount}</small>
                            <ChevronRight className="brand-index__arrow" />
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              );
            })}
          </div>
        </>
      ) : (
        <p className="brand-index__empty" role="status">
          {copy.brandsEmpty}
        </p>
      )}
    </section>
  );
});
