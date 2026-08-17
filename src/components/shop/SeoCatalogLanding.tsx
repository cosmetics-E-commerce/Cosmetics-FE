import { Link } from "@tanstack/react-router";
import { ProductCard } from "@/components/shop/ProductCard";
import { PolishedImage } from "@/components/ui/polished-image";
import type { PaginationMeta } from "@/lib/api";
import type { Product } from "@/lib/products";

type Props = {
  kind: "brand" | "category";
  slug: string;
  name: string;
  description: string;
  products: Product[];
  meta: PaginationMeta;
  locale: "ar" | "en";
  parent?: { name: string; slug: string } | undefined;
  logo?: string | null;
};

export function SeoCatalogLanding({
  kind,
  slug,
  name,
  description,
  products,
  meta,
  locale,
  parent,
  logo,
}: Props) {
  const hasBrandLogo = kind === "brand" && Boolean(logo);

  return (
    <div className="sf-shop-page sf-shop-page--minimal">
      <nav
        aria-label={locale === "ar" ? "مسار الصفحة" : "Breadcrumb"}
        className="sf-shop-breadcrumb"
      >
        <Link to="/">{locale === "ar" ? "الرئيسية" : "Home"}</Link>
        <span aria-hidden="true">/</span>
        <Link to="/shop">{locale === "ar" ? "المتجر" : "Shop"}</Link>
        {parent ? (
          <>
            <span aria-hidden="true">/</span>
            <Link to="/categories/$slug" params={{ slug: parent.slug }}>
              {parent.name}
            </Link>
          </>
        ) : null}
        <span aria-hidden="true">/</span>
        <span aria-current="page">{name}</span>
      </nav>

      <header className="mx-auto max-w-3xl px-5 pb-10 pt-14 text-center md:px-10 md:pb-14 md:pt-20">
        {hasBrandLogo && logo ? (
          <PolishedImage
            src={logo}
            alt={`${name} logo`}
            width={288}
            height={136}
            loading="eager"
            wrapperClassName="sf-brand-landing-logo-shell mx-auto"
            className="sf-brand-landing-logo h-full w-full object-contain"
            fallback={<span className="sf-brand-landing-logo-fallback">{name}</span>}
          />
        ) : null}
        <p className="label-xs text-gold">
          {kind === "brand"
            ? locale === "ar"
              ? "العلامة التجارية"
              : "Brand"
            : locale === "ar"
              ? "القسم"
              : "Category"}
        </p>
        <h1 className={hasBrandLogo ? "sr-only" : "display mt-4 text-[clamp(2.5rem,6vw,5rem)]"}>
          {name}
        </h1>
        <p
          className={`mx-auto max-w-2xl text-sm leading-7 text-muted-foreground ${
            hasBrandLogo ? "mt-5" : "mt-6"
          }`}
        >
          {description}
        </p>
      </header>

      <section className="sf-shop-catalog" aria-labelledby="catalog-products-title">
        <div className="sf-shop-meta">
          <h2 id="catalog-products-title">
            {meta.total} {locale === "ar" ? "منتج" : meta.total === 1 ? "product" : "products"}
          </h2>
          {meta.total > 0 ? (
            <p className="sf-shop-page-count">
              {locale === "ar"
                ? `عرض ${(meta.page - 1) * meta.limit + 1}-${Math.min(meta.page * meta.limit, meta.total)} من ${meta.total}`
                : `Showing ${(meta.page - 1) * meta.limit + 1}-${Math.min(meta.page * meta.limit, meta.total)} of ${meta.total}`}
            </p>
          ) : null}
        </div>
        <div className="sf-shop-products sf-shop-products--compact">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} compact layout="grid" />
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
}: {
  kind: Props["kind"];
  slug: string;
  page: number;
  totalPages: number;
  locale: Props["locale"];
}) {
  const pages = [...new Set([1, page - 1, page, page + 1, totalPages])]
    .filter((item) => item > 0 && item <= totalPages)
    .sort((a, b) => a - b);
  const link = (targetPage: number, label: React.ReactNode, current = false) =>
    kind === "category" ? (
      <Link
        to="/categories/$slug"
        params={{ slug }}
        search={targetPage > 1 ? { page: targetPage } : {}}
        aria-current={current ? "page" : undefined}
      >
        {label}
      </Link>
    ) : (
      <Link
        to="/brands/$slug"
        params={{ slug }}
        search={targetPage > 1 ? { page: targetPage } : {}}
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
