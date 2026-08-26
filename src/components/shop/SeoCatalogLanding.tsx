import { Link } from "@tanstack/react-router";
import { ProductCard } from "@/components/shop/ProductCard";
import { CatalogListingControls } from "@/components/shop/CatalogListingControls";
import {
  type CatalogListingSearch,
  withListingPage,
} from "@/components/shop/catalog-listing-state";
import { PolishedImage } from "@/components/ui/polished-image";
import type { CatalogFacetResponse, PaginationMeta } from "@/lib/api";
import type { Product } from "@/lib/products";

type Props = {
  kind: "brand" | "category";
  slug: string;
  name: string;
  description: string;
  products: Product[];
  meta: PaginationMeta;
  locale: "ar" | "en";
  ancestors?: Array<{ name: string; slug: string }>;
  children?: Array<{
    id: string;
    slug: string;
    name: string;
    imageUrl: string | null;
    productCount: number;
  }>;
  logo?: string | null;
  facets: CatalogFacetResponse;
  search: CatalogListingSearch;
  onSearchChange: (search: CatalogListingSearch) => void;
};

export function SeoCatalogLanding({
  kind,
  slug,
  name,
  description,
  products,
  meta,
  locale,
  ancestors = [],
  children = [],
  logo,
  facets,
  search,
  onSearchChange,
}: Props) {
  const hasBrandLogo = kind === "brand" && Boolean(logo);

  return (
    <div className={`sf-shop-page sf-shop-page--minimal sf-shop-page--${kind}`}>
      <nav
        aria-label={locale === "ar" ? "مسار الصفحة" : "Breadcrumb"}
        className="storefront-breadcrumb sf-shop-breadcrumb"
      >
        <Link to="/">{locale === "ar" ? "الرئيسية" : "Home"}</Link>
        <span aria-hidden="true">/</span>
        <Link to="/shop">{locale === "ar" ? "المتجر" : "Shop"}</Link>
        {ancestors.map((ancestor) => (
          <span key={ancestor.slug} className="contents">
            <span aria-hidden="true">/</span>
            <Link to="/categories/$slug" params={{ slug: ancestor.slug }}>
              {ancestor.name}
            </Link>
          </span>
        ))}
        <span aria-hidden="true">/</span>
        <span aria-current="page">{name}</span>
      </nav>

      <header
        className={
          kind === "brand"
            ? "sf-catalog-landing-intro"
            : "mx-auto max-w-3xl px-5 pb-10 pt-14 text-center md:px-10 md:pb-14 md:pt-20"
        }
      >
        {hasBrandLogo && logo ? (
          <PolishedImage
            src={logo}
            alt={locale === "ar" ? `شعار ${name}` : `${name} logo`}
            width={560}
            height={240}
            loading="eager"
            wrapperClassName="sf-brand-landing-logo-shell mx-auto"
            className="sf-brand-landing-logo h-full w-full object-contain"
            fallback={<span className="sf-brand-landing-logo-fallback">{name}</span>}
          />
        ) : null}
        {kind === "category" ? (
          <p className="label-xs text-gold">{locale === "ar" ? "القسم" : "Category"}</p>
        ) : null}
        <h1 className={hasBrandLogo ? "sr-only" : "display mt-4 text-[clamp(2.5rem,6vw,5rem)]"}>
          {name}
        </h1>
        {kind === "category" ? (
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-muted-foreground">
            {description}
          </p>
        ) : null}
      </header>

      {kind === "category" && children.length ? (
        <section className="sf-category-children" aria-labelledby="category-children-title">
          <div className="sf-category-children__heading">
            <p className="label-xs text-gold">
              {locale === "ar" ? "اكتشفي الأقسام" : "Explore the range"}
            </p>
            <h2 id="category-children-title">
              {locale === "ar" ? "تسوّقي حسب الفئة" : "Shop by category"}
            </h2>
          </div>
          <div className="sf-category-children__grid">
            {children.map((child) => (
              <Link
                key={child.id}
                to="/categories/$slug"
                params={{ slug: child.slug }}
                className="sf-category-child"
              >
                {child.imageUrl ? (
                  <PolishedImage
                    src={child.imageUrl}
                    alt=""
                    width={360}
                    height={240}
                    wrapperClassName="sf-category-child__image"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="sf-category-child__monogram" aria-hidden="true">
                    {child.name.slice(0, 1)}
                  </span>
                )}
                <span>
                  <strong>{child.name}</strong>
                  <small>
                    {child.productCount} {locale === "ar" ? "منتج" : "products"}
                  </small>
                </span>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <section className="sf-shop-catalog" aria-labelledby="catalog-products-title">
        <h2 id="catalog-products-title" className="sr-only">
          {locale === "ar" ? `منتجات ${name}` : `${name} products`}
        </h2>
        <CatalogListingControls
          locale={locale}
          search={search}
          resultCount={meta.total}
          facets={facets}
          hideCategory={kind === "category"}
          hideBrand
          onChange={onSearchChange}
        />
        <div
          className={`sf-shop-products ${search.view === "list" ? "sf-shop-products--list" : "sf-shop-products--grid"}`}
        >
          {products.map((product) => (
            <ProductCard
              key={product.slug}
              product={product}
              compact={search.view !== "list"}
              layout={search.view === "list" ? "list" : "grid"}
            />
          ))}
        </div>
        {meta.total === 0 ? (
          <div className="sf-catalog-empty" role="status">
            <p className="label-xs text-gold">{locale === "ar" ? "قريباً" : "Coming soon"}</p>
            <h2>
              {kind === "brand"
                ? locale === "ar"
                  ? `لا توجد منتجات متاحة من ${name} حالياً.`
                  : `No ${name} products are available yet.`
                : locale === "ar"
                  ? "لا توجد منتجات متاحة في هذا القسم حالياً."
                  : "No products are available in this category yet."}
            </h2>
            <p>
              {locale === "ar"
                ? "تصفّحي المجموعة الكاملة الآن، وعودي قريباً لرؤية المنتجات الجديدة."
                : "Explore the full collection now, and check back soon for new arrivals."}
            </p>
            <Link to="/shop">{locale === "ar" ? "تصفّح كل المنتجات" : "Shop all products"}</Link>
          </div>
        ) : null}
        {meta.totalPages > 1 ? (
          <LandingPagination
            kind={kind}
            slug={slug}
            page={meta.page}
            totalPages={meta.totalPages}
            locale={locale}
            search={search}
          />
        ) : null}
      </section>
    </div>
  );
}

function LandingPagination({
  kind,
  slug,
  page,
  totalPages,
  locale,
  search,
}: {
  kind: Props["kind"];
  slug: string;
  page: number;
  totalPages: number;
  locale: Props["locale"];
  search: CatalogListingSearch;
}) {
  const pages = [...new Set([1, page - 1, page, page + 1, totalPages])]
    .filter((item) => item > 0 && item <= totalPages)
    .sort((a, b) => a - b);
  const link = (targetPage: number, label: React.ReactNode, current = false) =>
    kind === "category" ? (
      <Link
        to="/categories/$slug"
        params={{ slug }}
        search={withListingPage(search, targetPage)}
        aria-current={current ? "page" : undefined}
      >
        {label}
      </Link>
    ) : (
      <Link
        to="/brands/$slug"
        params={{ slug }}
        search={withListingPage(search, targetPage)}
        aria-current={current ? "page" : undefined}
      >
        {label}
      </Link>
    );

  return (
    <nav
      className="sf-shop-pagination"
      aria-label={locale === "ar" ? "صفحات المنتجات" : "Product pages"}
    >
      {page > 1 ? link(page - 1, locale === "ar" ? "السابق" : "Previous") : <span />}
      <ol>
        {pages.map((item) => (
          <li key={item}>{link(item, item, item === page)}</li>
        ))}
      </ol>
      {page < totalPages ? link(page + 1, locale === "ar" ? "التالي" : "Next") : <span />}
    </nav>
  );
}
