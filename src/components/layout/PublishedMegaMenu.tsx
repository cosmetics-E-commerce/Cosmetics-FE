import { Component, useMemo, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import type {
  NavigationBlock,
  NavigationItem,
  NavigationPublicSnapshot,
  NavigationResolvedEntity,
} from "@cosmetics/contracts";
import { ChevronRight, Grid2X2, Image as ImageIcon, Search } from "lucide-react";

import legacyPromoImage from "@/assets/product-serum.jpg";
import { filterBrands, groupBrandItems } from "@/components/layout/brand-directory-data";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { localizedNavigationText, navigationVisibilityAllows } from "@/lib/navigation";

type Locale = "en" | "ar";

export function PublishedMegaMenu({
  item,
  snapshot,
  locale,
  onNavigate,
}: {
  item: NavigationItem;
  snapshot: NavigationPublicSnapshot;
  locale: Locale;
  onNavigate: () => void;
}) {
  const rows = item.megaMenu?.rows
    .filter((row) => row.enabled && navigationVisibilityAllows(row.visibility, locale, "DESKTOP"))
    .map((row) => ({
      row,
      columns: row.columns
        .map((column) => ({
          ...column,
          blocks: column.blocks.filter(
            (block) =>
              block.enabled && navigationVisibilityAllows(block.visibility, locale, "DESKTOP"),
          ),
        }))
        .filter((column) => column.blocks.length > 0),
    }))
    .filter(({ columns }) => columns.length > 0);
  if (!rows?.length) return null;
  const categoryColumnCount = Math.max(
    0,
    ...rows.map(({ columns }) => (isCategoryColumnRow(columns) ? columns.length : 0)),
  );
  return (
    <div
      className="header-mega-panel published-mega"
      data-menu-width={item.megaMenu?.width.toLowerCase()}
      data-menu-style={item.megaMenu?.style.toLowerCase()}
      data-category-columns={categoryColumnCount || undefined}
      dir={locale === "ar" ? "rtl" : "ltr"}
      style={
        categoryColumnCount
          ? ({ "--published-category-column-count": categoryColumnCount } as React.CSSProperties)
          : undefined
      }
    >
      {rows.map(({ row, columns }) => {
        const categoryColumns = isCategoryColumnRow(columns);
        return (
          <div
            className="published-mega__row"
            key={row.id}
            data-presentation={row.presentation.toLowerCase()}
            data-separators={row.columnSeparators || undefined}
            data-layout={categoryColumns ? "category-columns" : undefined}
            style={
              categoryColumns
                ? ({ "--published-row-column-count": columns.length } as React.CSSProperties)
                : undefined
            }
          >
            {columns.map((column) => (
              <div
                className="published-mega__column"
                key={column.id}
                style={{ "--published-column-span": column.span } as React.CSSProperties}
              >
                {column.blocks.map((block) => (
                  <SafePublishedBlock
                    key={block.id}
                    block={block}
                    snapshot={snapshot}
                    locale={locale}
                    onNavigate={onNavigate}
                  />
                ))}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}

function isCategoryColumnRow(columns: Array<{ blocks: NavigationBlock[] }>) {
  return (
    columns.length > 0 &&
    columns.every(
      ({ blocks }) =>
        blocks.length === 1 &&
        blocks[0]?.type === "CATEGORY_LIST" &&
        blocks[0].mode === "CHILDREN" &&
        blocks[0].presentation === "PLAIN",
    )
  );
}

export function PublishedMobileMenuItem({
  item,
  snapshot,
  locale,
  onNavigate,
}: {
  item: NavigationItem;
  snapshot: NavigationPublicSnapshot;
  locale: Locale;
  onNavigate: () => void;
}) {
  const blocks = useMemo(
    () =>
      (item.megaMenu?.rows ?? [])
        .filter(
          (row) => row.enabled && navigationVisibilityAllows(row.visibility, locale, "MOBILE"),
        )
        .flatMap((row) => row.columns.flatMap((column) => column.blocks))
        .filter(
          (block) =>
            block.enabled && navigationVisibilityAllows(block.visibility, locale, "MOBILE"),
        )
        .sort((left, right) => (left.mobileOrder ?? 100) - (right.mobileOrder ?? 100)),
    [item.megaMenu?.rows, locale],
  );
  return (
    <div className="published-mobile-menu">
      {blocks.map((block) => (
        <SafePublishedBlock
          key={block.id}
          block={block}
          snapshot={snapshot}
          locale={locale}
          onNavigate={onNavigate}
          mobile
        />
      ))}
    </div>
  );
}

type PublishedBlockProps = {
  block: NavigationBlock;
  snapshot: NavigationPublicSnapshot;
  locale: Locale;
  onNavigate: () => void;
  mobile?: boolean;
};

class SafePublishedBlock extends Component<PublishedBlockProps, { failed: boolean }> {
  override state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  override render(): ReactNode {
    if (this.state.failed) return null;
    return <PublishedBlock {...this.props} />;
  }
}

function PublishedBlock({
  block,
  snapshot,
  locale,
  onNavigate,
  mobile = false,
}: PublishedBlockProps) {
  const entities = snapshot.resolvedBlocks[block.id] ?? [];
  if (block.type === "CATEGORY_EXPLORER")
    return (
      <CategoryExplorer
        block={block}
        entities={entities}
        snapshot={snapshot}
        locale={locale}
        onNavigate={onNavigate}
        mobile={mobile}
      />
    );
  if (block.type === "BRAND_DIRECTORY")
    return (
      <BrandDirectoryBlock
        block={block}
        entities={entities}
        locale={locale}
        onNavigate={onNavigate}
      />
    );
  if (block.type === "CATEGORY_LIST" || block.type === "BRAND_LIST" || block.type === "TAG_LIST")
    return (
      <EntityList
        block={block}
        entities={entities}
        snapshot={snapshot}
        locale={locale}
        onNavigate={onNavigate}
        mobile={mobile}
      />
    );
  if (block.type === "PRODUCT_LIST")
    return (
      <ProductList
        block={block}
        entities={entities}
        snapshot={snapshot}
        locale={locale}
        onNavigate={onNavigate}
      />
    );
  if (block.type === "PROMO_CARD")
    return (
      <PromoCard
        promo={block}
        href={snapshot.resolvedLinks[block.id]}
        mediaUrl={block.mediaAssetId ? snapshot.media[block.mediaAssetId]?.url : undefined}
        locale={locale}
        onNavigate={onNavigate}
      />
    );
  if (block.type === "CUSTOM_LINKS")
    return (
      <section className={`published-mega__links is-${block.presentation.toLowerCase()}`}>
        {block.showHeading ? <BlockHeading value={block.heading} locale={locale} /> : null}
        {block.links.map((link) => {
          const href = snapshot.resolvedLinks[link.id];
          return href ? (
            <SafeLink
              href={href}
              key={link.id}
              onNavigate={onNavigate}
              newTab={link.destination.type === "EXTERNAL" && link.destination.newTab}
            >
              {localizedNavigationText(link.label, locale)}
            </SafeLink>
          ) : null;
        })}
      </section>
    );
  if (block.type === "HEADING")
    return (
      <h3 className={`published-mega__heading is-${block.level.toLowerCase()}`}>
        {localizedNavigationText(block.text, locale)}
      </h3>
    );
  if (block.type === "TEXT")
    return (
      <p className={`published-mega__text is-${block.tone.toLowerCase()}`}>
        {localizedNavigationText(block.text, locale)}
      </p>
    );
  if (block.type === "CTA" || block.type === "SHOP_ALL") {
    const href = snapshot.resolvedLinks[block.id];
    return href ? (
      <SafeLink
        href={href}
        onNavigate={onNavigate}
        newTab={block.destination.type === "EXTERNAL" && block.destination.newTab}
        className={`published-mega__cta is-${block.style.toLowerCase()} ${block.type === "CTA" ? `align-${block.alignment.toLowerCase()}` : ""}`}
      >
        {block.type === "CTA" && block.icon !== "NONE" && block.iconPosition === "START" ? (
          block.icon === "GRID" ? (
            <Grid2X2 aria-hidden="true" />
          ) : (
            <ChevronRight aria-hidden="true" />
          )
        ) : null}
        {localizedNavigationText(block.label, locale)}
        {block.type === "CTA" && block.icon !== "NONE" && block.iconPosition === "END" ? (
          block.icon === "GRID" ? (
            <Grid2X2 aria-hidden="true" />
          ) : (
            <ChevronRight aria-hidden="true" />
          )
        ) : null}
      </SafeLink>
    ) : null;
  }
  if (block.type === "IMAGE") {
    const media = block.mediaAssetId ? snapshot.media[block.mediaAssetId] : undefined;
    if (!media) return null;
    const image = (
      <img
        className={`published-mega__image is-${block.aspect.toLowerCase()}`}
        src={media.url}
        alt={localizedNavigationText(block.alt, locale) || media.altText || ""}
      />
    );
    const href = snapshot.resolvedLinks[block.id];
    return href ? (
      <SafeLink
        href={href}
        onNavigate={onNavigate}
        className="published-mega__image-link"
        newTab={Boolean(block.destination?.type === "EXTERNAL" && block.destination.newTab)}
      >
        {image}
      </SafeLink>
    ) : (
      image
    );
  }
  if (block.type === "DIVIDER") return <hr className="published-mega__divider" />;
  if (block.type === "SPACER")
    return (
      <span
        aria-hidden="true"
        className={`published-mega__spacer is-${block.size.toLowerCase()}`}
      />
    );
  return null;
}

function CategoryExplorer({
  block,
  entities,
  snapshot,
  locale,
  onNavigate,
  mobile,
}: {
  block: Extract<NavigationBlock, { type: "CATEGORY_EXPLORER" }>;
  entities: NavigationResolvedEntity[];
  snapshot: NavigationPublicSnapshot;
  locale: Locale;
  onNavigate: () => void;
  mobile: boolean;
}) {
  const parents = entities.filter(
    (entity) => entity.kind === "CATEGORY" && entity.secondaryLabel === "root",
  );
  const brands = entities.filter((entity) => entity.kind === "BRAND");
  const categoryColumns = mobile
    ? [parents]
    : Array.from({ length: 3 }, (_, columnIndex) =>
        parents.filter((_, parentIndex) => parentIndex % 3 === columnIndex),
      );
  return (
    <section className="published-category-explorer" data-mobile={mobile || undefined}>
      <div className="published-category-explorer__groups">
        <BlockHeading value={block.heading} locale={locale} />
        <div className="published-category-explorer__columns">
          {categoryColumns.map((column, columnIndex) => (
            <div className="published-category-explorer__column" key={columnIndex}>
              {column.map((parent) => (
                <CategoryGroup
                  key={parent.id}
                  parent={parent}
                  children={entities.filter(
                    (entity) => entity.kind === "CATEGORY" && entity.secondaryLabel === parent.id,
                  )}
                  entities={entities}
                  locale={locale}
                  showProductCount={block.showProductCounts}
                  onNavigate={onNavigate}
                />
              ))}
            </div>
          ))}
        </div>
        {snapshot.resolvedLinks[block.id] ? (
          <SafeLink
            href={snapshot.resolvedLinks[block.id]!}
            onNavigate={onNavigate}
            className="published-mega__view-all"
          >
            {localizedNavigationText(block.viewAllLabel, locale)}
            <ChevronRight aria-hidden="true" />
          </SafeLink>
        ) : null}
      </div>
      {brands.length ? (
        <section className="published-category-explorer__brands">
          <BlockHeading value={{ en: "Featured Brands", ar: "علامات مميزة" }} locale={locale} />
          {brands.map((brand) => (
            <SafeLink
              href={brand.href}
              key={brand.id}
              onNavigate={onNavigate}
              className="published-category-explorer__brand"
              ariaLabel={entityLabel(brand, locale)}
            >
              {brand.imageUrl ? (
                <img
                  src={brand.imageUrl}
                  alt={`${entityLabel(brand, locale)} logo`}
                  width={104}
                  height={52}
                  loading="eager"
                  decoding="async"
                  draggable={false}
                  onLoad={normalizeFeaturedBrandLogo}
                />
              ) : null}
            </SafeLink>
          ))}
        </section>
      ) : null}
      {block.promo.enabled ? (
        <PromoCard
          promo={block.promo}
          href={
            snapshot.resolvedLinks[`${block.id}:promo`] ??
            resolveDestinationHref(block.promo.destination)
          }
          mediaUrl={
            block.promo.mediaAssetId
              ? snapshot.media[block.promo.mediaAssetId]?.url
              : block.id === "40000000-0000-4000-8000-000000000002"
                ? legacyPromoImage
                : undefined
          }
          locale={locale}
          onNavigate={onNavigate}
        />
      ) : null}
    </section>
  );
}

function CategoryGroup({
  parent,
  children,
  entities,
  locale,
  showProductCount,
  onNavigate,
}: {
  parent: NavigationResolvedEntity;
  children: NavigationResolvedEntity[];
  entities: NavigationResolvedEntity[];
  locale: Locale;
  showProductCount: boolean;
  onNavigate: () => void;
}) {
  return (
    <section>
      <SafeLink
        href={parent.href}
        onNavigate={onNavigate}
        className="published-category-explorer__parent"
      >
        {entityLabel(parent, locale)}
        {showProductCount && parent.productCount !== undefined ? (
          <small>{parent.productCount}</small>
        ) : null}
      </SafeLink>
      {children.flatMap((child) => [
        <SafeLink
          href={child.href}
          key={child.id}
          onNavigate={onNavigate}
          className="published-category-explorer__child"
        >
          {entityLabel(child, locale)}
        </SafeLink>,
        ...entities
          .filter((entity) => entity.kind === "CATEGORY" && entity.secondaryLabel === child.id)
          .map((grandchild) => (
            <SafeLink
              href={grandchild.href}
              key={grandchild.id}
              onNavigate={onNavigate}
              className="published-category-explorer__grandchild"
            >
              {entityLabel(grandchild, locale)}
            </SafeLink>
          )),
      ])}
    </section>
  );
}

function BrandDirectoryBlock({
  block,
  entities,
  locale,
  onNavigate,
}: {
  block: Extract<NavigationBlock, { type: "BRAND_DIRECTORY" }>;
  entities: NavigationResolvedEntity[];
  locale: Locale;
  onNavigate: () => void;
}) {
  const [search, setSearch] = useState("");
  const groups = useMemo(() => {
    const brands = entities
      .filter((entity) => entity.kind === "BRAND")
      .map((entity) => ({
        id: entity.id,
        name: entityLabel(entity, locale),
        slug: entity.href,
        entity,
      }));
    return groupBrandItems(filterBrands(brands, search, locale), locale);
  }, [entities, locale, search]);
  return (
    <section className="published-brand-directory" dir={locale === "ar" ? "rtl" : "ltr"}>
      <header>
        <BlockHeading value={block.heading} locale={locale} />
        {block.showSearch ? (
          <label>
            <Search aria-hidden="true" />
            <span className="sr-only">
              {localizedNavigationText(block.searchPlaceholder, locale)}
            </span>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={localizedNavigationText(block.searchPlaceholder, locale)}
            />
          </label>
        ) : null}
      </header>
      {groups.length ? (
        <div className="published-brand-directory__groups" aria-live="polite">
          {groups.map((group) => (
            <section className="published-brand-directory__group" key={group.key}>
              <h3>{group.key}</h3>
              <ul>
                {group.brands.map((brand) => (
                  <li key={brand.id}>
                    <SafeLink href={brand.entity.href} onNavigate={onNavigate}>
                      {brand.name}
                    </SafeLink>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      ) : (
        <p className="published-brand-directory__empty" role="status">
          {locale === "ar" ? "لا توجد علامات مطابقة للبحث." : "No brands match your search."}
        </p>
      )}
      <SafeLink href="/brands" onNavigate={onNavigate} className="published-mega__view-all">
        {localizedNavigationText(block.viewAllLabel, locale)}
        <ChevronRight aria-hidden="true" />
      </SafeLink>
    </section>
  );
}

function EntityList({
  block,
  entities,
  snapshot,
  locale,
  onNavigate,
  mobile,
}: {
  block: Extract<NavigationBlock, { type: "CATEGORY_LIST" | "BRAND_LIST" | "TAG_LIST" }>;
  entities: NavigationResolvedEntity[];
  snapshot: NavigationPublicSnapshot;
  locale: Locale;
  onNavigate: () => void;
  mobile: boolean;
}) {
  const presentation = "presentation" in block ? block.presentation.toLowerCase() : "plain";
  const tree =
    block.type === "CATEGORY_LIST" ? (
      <CategoryEntityTree
        block={block}
        entities={entities}
        locale={locale}
        onNavigate={onNavigate}
      />
    ) : (
      <div>
        {entities.map((entity) => (
          <SafeLink href={entity.href} key={entity.id} onNavigate={onNavigate}>
            {block.type === "BRAND_LIST" ? (
              <BrandLogo
                name={entityLabel(entity, locale)}
                logoUrl={entity.imageUrl}
                display={entity.logoDisplay}
                className="published-mega__brand-logo"
                decorative
                surface="transparent"
                sizes="42px"
              />
            ) : "presentation" in block && entity.imageUrl ? (
              <img src={entity.imageUrl} alt="" />
            ) : null}
            <span>{entityLabel(entity, locale)}</span>
          </SafeLink>
        ))}
      </div>
    );
  const viewAll =
    block.showViewAll && snapshot.resolvedLinks[block.id] ? (
      <SafeLink
        href={snapshot.resolvedLinks[block.id]!}
        onNavigate={onNavigate}
        className="published-mega__view-all"
      >
        {localizedNavigationText(block.viewAllLabel, locale)}
      </SafeLink>
    ) : null;
  if (mobile && block.type === "CATEGORY_LIST" && block.mode === "CHILDREN" && block.showHeading) {
    return (
      <section className={`published-mega__entity-list is-${presentation}`}>
        <details className="published-mobile-category-group">
          <summary>
            <span>{localizedNavigationText(block.heading, locale)}</span>
            <ChevronRight aria-hidden="true" />
          </summary>
          <div className="published-mobile-category-group__content">
            {tree}
            {viewAll}
          </div>
        </details>
      </section>
    );
  }
  return (
    <section className={`published-mega__entity-list is-${presentation}`}>
      {block.showHeading ? <BlockHeading value={block.heading} locale={locale} /> : null}
      {tree}
      {viewAll}
    </section>
  );
}

function CategoryEntityTree({
  block,
  entities,
  locale,
  onNavigate,
}: {
  block: Extract<NavigationBlock, { type: "CATEGORY_LIST" }>;
  entities: NavigationResolvedEntity[];
  locale: Locale;
  onNavigate: () => void;
}) {
  const categories = [
    ...new Map(
      entities.filter((entity) => entity.kind === "CATEGORY").map((entity) => [entity.id, entity]),
    ).values(),
  ];
  const ids = new Set(categories.map((entity) => entity.id));
  const children = new Map<string, NavigationResolvedEntity[]>();
  categories.forEach((entity) => {
    const parentId = entity.secondaryLabel ?? "root";
    const key = ids.has(parentId) ? parentId : "root";
    children.set(key, [...(children.get(key) ?? []), entity]);
  });
  const renderCategory = (entity: NavigationResolvedEntity, depth: number) => {
    const descendants = children.get(entity.id) ?? [];
    return (
      <li key={entity.id} data-depth={Math.min(depth, 2)}>
        <SafeLink
          href={entity.href}
          onNavigate={onNavigate}
          className={`published-mega__category-item is-depth-${Math.min(depth, 2)}${descendants.length ? " has-children" : ""}`}
        >
          {block.showIcon && depth === 0 ? (
            entity.imageUrl ? (
              <img src={entity.imageUrl} alt="" />
            ) : (
              <Grid2X2 aria-hidden="true" />
            )
          ) : null}
          <span>{entityLabel(entity, locale)}</span>
          {block.showProductCount && entity.productCount !== undefined ? (
            <small>{entity.productCount}</small>
          ) : null}
          {block.showChevron || descendants.length ? (
            <ChevronRight className="published-mega__entity-chevron" aria-hidden="true" />
          ) : null}
        </SafeLink>
        {descendants.length ? (
          <ul>{descendants.map((child) => renderCategory(child, depth + 1))}</ul>
        ) : null}
      </li>
    );
  };
  return (
    <ul className="published-mega__category-tree">
      {(children.get("root") ?? []).map((entity) => renderCategory(entity, 0))}
    </ul>
  );
}

function ProductList({
  block,
  entities,
  snapshot,
  locale,
  onNavigate,
}: {
  block: Extract<NavigationBlock, { type: "PRODUCT_LIST" }>;
  entities: NavigationResolvedEntity[];
  snapshot: NavigationPublicSnapshot;
  locale: Locale;
  onNavigate: () => void;
}) {
  if (!entities.length) return null;
  return (
    <section className={`published-mega__products is-${block.presentation.toLowerCase()}`}>
      {block.showHeading ? <BlockHeading value={block.heading} locale={locale} /> : null}
      <div>
        {entities.map((product) => (
          <SafeLink href={product.href} key={product.id} onNavigate={onNavigate}>
            {block.showImage ? (
              <span className="published-mega__product-image">
                {product.imageUrl ? (
                  <img src={product.imageUrl} alt="" />
                ) : (
                  <ImageIcon aria-hidden="true" />
                )}
              </span>
            ) : null}
            <span>
              <strong>{entityLabel(product, locale)}</strong>
              {block.showPrice && product.price !== undefined ? (
                <small>{formatPrice(product.price, locale)}</small>
              ) : null}
            </span>
          </SafeLink>
        ))}
      </div>
      {block.showViewAll && snapshot.resolvedLinks[block.id] ? (
        <SafeLink
          href={snapshot.resolvedLinks[block.id]!}
          onNavigate={onNavigate}
          className="published-mega__view-all"
        >
          {localizedNavigationText(block.viewAllLabel, locale)}
        </SafeLink>
      ) : null}
    </section>
  );
}

type Promo =
  | Extract<NavigationBlock, { type: "PROMO_CARD" }>
  | Extract<NavigationBlock, { type: "CATEGORY_EXPLORER" }>["promo"];

function PromoCard({
  promo,
  href,
  mediaUrl,
  locale,
  onNavigate,
}: {
  promo: Promo;
  href?: string | undefined;
  mediaUrl?: string | undefined;
  locale: Locale;
  onNavigate: () => void;
}) {
  const showImage = "showImage" in promo ? promo.showImage : true;
  const showDescription = "showDescription" in promo ? promo.showDescription : true;
  const showCta = "showCta" in promo ? promo.showCta : true;
  return (
    <article className={`published-mega__promo is-${promo.style.toLowerCase()}`}>
      <div>
        <p>{localizedNavigationText(promo.eyebrow, locale)}</p>
        <h3>{localizedNavigationText(promo.title, locale)}</h3>
        {showDescription ? <span>{localizedNavigationText(promo.description, locale)}</span> : null}
        {showCta && href ? (
          <SafeLink
            href={href}
            onNavigate={onNavigate}
            newTab={promo.destination.type === "EXTERNAL" && promo.destination.newTab}
          >
            {localizedNavigationText(promo.ctaLabel, locale)}
          </SafeLink>
        ) : null}
      </div>
      {showImage && mediaUrl ? (
        <img src={mediaUrl} alt={localizedNavigationText(promo.imageAlt, locale)} />
      ) : null}
    </article>
  );
}

function BlockHeading({ value, locale }: { value: { en: string; ar: string }; locale: Locale }) {
  const text = localizedNavigationText(value, locale);
  return text ? <h3 className="published-mega__heading">{text}</h3> : null;
}

function normalizeFeaturedBrandLogo(event: React.SyntheticEvent<HTMLImageElement>) {
  const image = event.currentTarget;
  const link = image.parentElement;
  if (!link || !image.naturalWidth || !image.naturalHeight) return;

  const sourceAspectRatio = image.naturalWidth / image.naturalHeight;
  link.dataset["logoShape"] =
    sourceAspectRatio > 1.12 ? "wide" : sourceAspectRatio < 0.88 ? "tall" : "square";
}

function SafeLink({
  href,
  onNavigate,
  className,
  ariaLabel,
  newTab = false,
  children,
}: {
  href: string;
  onNavigate: () => void;
  className?: string;
  ariaLabel?: string;
  newTab?: boolean;
  children: React.ReactNode;
}) {
  const external = /^https?:\/\//i.test(href);
  if (!external) {
    return (
      <Link
        to={href}
        preload="intent"
        preloadDelay={0}
        className={className}
        aria-label={ariaLabel}
        onClick={onNavigate}
      >
        {children}
      </Link>
    );
  }
  return (
    <a
      href={href}
      className={className}
      aria-label={ariaLabel}
      onClick={onNavigate}
      {...(external && newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}

function entityLabel(entity: NavigationResolvedEntity, locale: Locale) {
  return (locale === "ar" ? entity.labelAr : entity.labelEn) || entity.labelEn || entity.labelAr;
}

function formatPrice(value: number, locale: Locale) {
  return new Intl.NumberFormat(locale === "ar" ? "ar-EG" : "en-EG", {
    style: "currency",
    currency: "EGP",
    maximumFractionDigits: 0,
  }).format(value / 100);
}

function resolveDestinationHref(
  destination: Extract<NavigationBlock, { type: "CATEGORY_EXPLORER" }>["promo"]["destination"],
) {
  if (destination.type === "HOME") return "/";
  if (destination.type === "SHOP" || destination.type === "NEW_ARRIVALS") return "/shop";
  if (destination.type === "OFFERS") return "/offers";
  if (destination.type === "ABOUT") return "/about";
  if (destination.type === "CONTACT") return "/contact";
  if (destination.type === "CUSTOM_PATH") return destination.path;
  if (destination.type === "EXTERNAL") return destination.url;
  return undefined;
}
