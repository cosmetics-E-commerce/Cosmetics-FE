import { useQuery } from "@tanstack/react-query";
import type {
  LandingPageLocalizedText,
  LandingPagePublicSnapshot,
  LandingPageResolvedEntity,
  LandingPageSection,
} from "@cosmetics/contracts/page-builder/page-builder.schema";
import { ArrowLeft, ArrowRight, ChevronDown } from "lucide-react";
import { useEffect, useState, type CSSProperties, type ReactNode } from "react";

import { ProductCard } from "@/components/shop/ProductCard";
import { PolishedImage } from "@/components/ui/polished-image";
import {
  loadCatalog,
  loadMerchandisingCatalog,
  loadProductsByIds,
  type Locale,
} from "@/lib/catalog";
import { apiErrorMessage, subscribeNewsletter } from "@/lib/api";
import { isLandingSectionVisible } from "@/lib/landing-page";
import { toast } from "sonner";
import "./page-builder.css";

export function LandingPageRenderer({
  snapshot,
  locale,
}: {
  snapshot: LandingPagePublicSnapshot;
  locale: Locale;
}) {
  const resolvedAt = Date.parse(snapshot.resolvedAt);
  const visible = snapshot.config.sections.filter((section) =>
    isLandingSectionVisible(section, locale, resolvedAt),
  );
  return (
    <main
      className="landing-page"
      data-page-id={snapshot.pageId}
      data-revision={snapshot.revisionId}
    >
      {visible.map((section, index) => (
        <LandingSection
          key={section.id}
          section={section}
          snapshot={snapshot}
          locale={locale}
          priority={index === 0 && section.type === "HERO"}
        />
      ))}
    </main>
  );
}

function LandingSection({
  section,
  snapshot,
  locale,
  priority,
}: {
  section: LandingPageSection;
  snapshot: LandingPagePublicSnapshot;
  locale: Locale;
  priority: boolean;
}) {
  const classes = `landing-section landing-section--${section.type.toLowerCase().replace(/_/g, "-")} landing-section--${section.surface.toLowerCase()} landing-section--space-${section.spacing.toLowerCase()}`;
  const content = (() => {
    if (section.type === "HERO")
      return (
        <HeroSection section={section} snapshot={snapshot} locale={locale} priority={priority} />
      );
    if (section.type === "PRODUCT_GRID" || section.type === "PRODUCT_CAROUSEL")
      return <ProductSection section={section} snapshot={snapshot} locale={locale} />;
    if (section.type === "CATEGORIES")
      return (
        <EntitySection
          section={section}
          entities={snapshot.entities[section.id] ?? []}
          locale={locale}
        />
      );
    if (section.type === "BRANDS")
      return (
        <EntitySection
          section={section}
          entities={snapshot.entities[section.id] ?? []}
          locale={locale}
        />
      );
    if (section.type === "PROMOTION")
      return <PromotionSection section={section} snapshot={snapshot} locale={locale} />;
    if (section.type === "ROUTINE_CTA")
      return <EditorialSection section={section} snapshot={snapshot} locale={locale} />;
    if (section.type === "IMAGE_TEXT")
      return <EditorialSection section={section} snapshot={snapshot} locale={locale} />;
    if (section.type === "PROMO_BANNER")
      return <PromoBanner section={section} snapshot={snapshot} locale={locale} />;
    if (section.type === "COUNTDOWN")
      return (
        <Countdown section={section} locale={locale} initialNow={Date.parse(snapshot.resolvedAt)} />
      );
    if (section.type === "NEWSLETTER")
      return <NewsletterSection section={section} locale={locale} />;
    if (section.type === "FAQ") return <FaqSection section={section} locale={locale} />;
    if (section.type === "SPACER")
      return (
        <div
          className={`landing-spacer landing-spacer--${section.size.toLowerCase()}`}
          aria-hidden="true"
        />
      );
    return <hr className="landing-divider" />;
  })();
  if (section.type === "SPACER" || section.type === "DIVIDER")
    return (
      <section
        className={classes}
        data-section-id={section.analyticsKey}
        data-visible-desktop={section.visibility.devices.includes("DESKTOP")}
        data-visible-tablet={section.visibility.devices.includes("TABLET")}
        data-visible-mobile={section.visibility.devices.includes("MOBILE")}
      >
        {content}
      </section>
    );
  return (
    <section
      className={classes}
      data-section-id={section.analyticsKey}
      data-visible-desktop={section.visibility.devices.includes("DESKTOP")}
      data-visible-tablet={section.visibility.devices.includes("TABLET")}
      data-visible-mobile={section.visibility.devices.includes("MOBILE")}
    >
      <div
        className={`landing-section__inner landing-section__inner--${section.width.toLowerCase()}`}
      >
        {content}
      </div>
    </section>
  );
}

function HeroSection({
  section,
  snapshot,
  locale,
  priority,
}: {
  section: Extract<LandingPageSection, { type: "HERO" }>;
  snapshot: LandingPagePublicSnapshot;
  locale: Locale;
  priority: boolean;
}) {
  const desktop = media(snapshot, section.desktopMediaId);
  const mobile = media(snapshot, section.mobileMediaId) ?? desktop;
  return (
    <div
      className="landing-hero"
      data-layout={section.layout}
      data-align={section.alignment}
      data-position={section.contentPosition}
    >
      <picture className="landing-hero__media">
        {mobile?.url ? <source media="(max-width: 680px)" srcSet={mobile.url} /> : null}
        {desktop?.url ? (
          <img
            src={desktop.url}
            alt={text(section.imageAlt, locale)}
            width={desktop.width ?? undefined}
            height={desktop.height ?? undefined}
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : "auto"}
            decoding="async"
          />
        ) : null}
      </picture>
      <span className="landing-hero__overlay" data-strength={section.overlay} />
      <div className="landing-hero__copy">
        <Kicker value={section.eyebrow} locale={locale} />
        {section.headingLevel === "H1" ? (
          <h1>{text(section.heading, locale)}</h1>
        ) : (
          <h2>{text(section.heading, locale)}</h2>
        )}
        <p>{text(section.description, locale)}</p>
        <Actions
          primaryLabel={section.primaryCtaLabel}
          primaryHref={snapshot.links[section.id]}
          secondaryLabel={section.secondaryCtaLabel}
          secondaryHref={snapshot.links[`${section.id}:secondary`]}
          locale={locale}
        />
      </div>
    </div>
  );
}

function ProductSection({
  section,
  snapshot,
  locale,
}: {
  section: Extract<LandingPageSection, { type: "PRODUCT_GRID" | "PRODUCT_CAROUSEL" }>;
  snapshot: LandingPagePublicSnapshot;
  locale: Locale;
}) {
  return (
    <>
      <SectionHeader
        heading={section.heading}
        description={section.description}
        locale={locale}
        action={
          section.showViewAll && snapshot.links[section.id] ? (
            <a href={snapshot.links[section.id]}>
              {text(section.viewAllLabel, locale)} <DirectionalArrow locale={locale} />
            </a>
          ) : null
        }
      />
      <CatalogProducts
        section={section}
        entities={snapshot.entities[section.id] ?? []}
        locale={locale}
      />
    </>
  );
}

function CatalogProducts({
  section,
  entities,
  locale,
}: {
  section: Extract<LandingPageSection, { type: "PRODUCT_GRID" | "PRODUCT_CAROUSEL" }>;
  entities: LandingPageResolvedEntity[];
  locale: Locale;
}) {
  const source = section.source;
  const reference = entities.find((entity) => entity.kind !== "PRODUCT");
  const manualIds = entities
    .filter((entity) => entity.kind === "PRODUCT")
    .map((entity) => entity.id);
  const sourceIdentity =
    source.mode === "FEATURED" ? { source, merchandisingKey: section.analyticsKey } : source;
  const query = useQuery({
    queryKey: [
      "landing-page-products",
      sourceIdentity,
      section.limit,
      entities.map((entity) => entity.id),
      locale,
    ],
    queryFn: async () => {
      if (source.mode === "MANUAL" || source.mode === "PROMOTION")
        return loadProductsByIds(manualIds, locale);
      if (source.mode === "FEATURED")
        return loadMerchandisingCatalog(
          { section: `page-${section.analyticsKey}`, limit: section.limit },
          locale,
        );
      if (source.mode === "NEWEST")
        return loadCatalog({ sort: "newest", limit: section.limit }, locale);
      if (source.mode === "CATEGORY")
        return loadCatalog({ categorySlug: reference?.slug, limit: section.limit }, locale);
      if (source.mode === "BRAND")
        return loadCatalog({ brandSlug: reference?.slug, limit: section.limit }, locale);
      return loadCatalog({ tags: reference?.slug, limit: section.limit }, locale);
    },
    staleTime: 60_000,
  });
  const products = query.data?.slice(0, section.limit) ?? [];
  if (query.isLoading)
    return (
      <div
        className="landing-products landing-products--loading"
        style={{ "--landing-columns": section.columns.desktop } as CSSProperties}
      >
        {Array.from({ length: Math.min(section.limit, 8) }, (_, index) => (
          <i key={index} />
        ))}
      </div>
    );
  if (!products.length) return null;
  return (
    <div
      className={`landing-products ${section.type === "PRODUCT_CAROUSEL" ? "landing-products--carousel" : ""}`}
      data-style={section.style}
      style={
        {
          "--landing-columns": section.columns.desktop,
          "--landing-tablet-columns": section.columns.tablet,
          "--landing-mobile-columns": section.columns.mobile,
        } as CSSProperties
      }
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} compact={section.style === "COMPACT"} />
      ))}
    </div>
  );
}

function EntitySection({
  section,
  entities,
  locale,
}: {
  section: Extract<LandingPageSection, { type: "CATEGORIES" | "BRANDS" }>;
  entities: LandingPageResolvedEntity[];
  locale: Locale;
}) {
  const isCategory = section.type === "CATEGORIES";
  return (
    <>
      <SectionHeader heading={section.heading} description={section.description} locale={locale} />
      <div
        className={`landing-entities landing-entities--${section.layout.toLowerCase().replace(/_/g, "-")}`}
        data-kind={isCategory ? "category" : "brand"}
      >
        {entities.slice(0, section.limit).map((entity) => (
          <a
            href={entity.href}
            key={`${entity.kind}:${entity.id}`}
            className="landing-entity"
            data-depth={isCategory ? pathDepth(entity, locale) : 0}
          >
            {entity.imageUrl ? (
              <PolishedImage
                src={entity.imageUrl}
                alt={label(entity, locale)}
                width={isCategory ? 720 : 360}
                height={isCategory ? 860 : 180}
                loading="lazy"
                sizes={isCategory ? "(min-width: 900px) 25vw, 50vw" : "180px"}
              />
            ) : (
              <span className="landing-entity__placeholder">
                {label(entity, locale).slice(0, 1)}
              </span>
            )}
            <span>
              <strong>{label(entity, locale)}</strong>
              {isCategory && entity.parentId ? <small>{path(entity, locale)}</small> : null}
            </span>
            <DirectionalArrow locale={locale} />
          </a>
        ))}
      </div>
    </>
  );
}

function PromotionSection({
  section,
  snapshot,
  locale,
}: {
  section: Extract<LandingPageSection, { type: "PROMOTION" }>;
  snapshot: LandingPagePublicSnapshot;
  locale: Locale;
}) {
  const image = media(snapshot, section.mediaAssetId);
  const entity = snapshot.entities[section.id]?.find((item) => item.kind === "PROMOTION");
  if (!entity) return null;
  return (
    <div className="landing-promotion" data-style={section.style}>
      {image?.url ? (
        <PolishedImage
          src={image.url}
          alt={text(section.imageAlt, locale)}
          width={image.width ?? 1200}
          height={image.height ?? 720}
          loading="lazy"
        />
      ) : null}
      <div>
        <Kicker value={section.eyebrow} locale={locale} />
        <h2>{text(section.heading, locale)}</h2>
        <p>{text(section.description, locale)}</p>
        <a className="landing-button" href={snapshot.links[section.id] ?? entity.href ?? "/offers"}>
          {text(section.ctaLabel, locale)} <DirectionalArrow locale={locale} />
        </a>
      </div>
    </div>
  );
}
function EditorialSection({
  section,
  snapshot,
  locale,
}: {
  section: Extract<LandingPageSection, { type: "ROUTINE_CTA" | "IMAGE_TEXT" }>;
  snapshot: LandingPagePublicSnapshot;
  locale: Locale;
}) {
  const image = media(snapshot, section.mediaAssetId);
  const body = section.type === "IMAGE_TEXT" ? section.body : section.description;
  return (
    <div
      className="landing-editorial"
      data-side={section.type === "IMAGE_TEXT" ? section.imageSide : "END"}
      data-style={section.style}
    >
      {image?.url ? (
        <PolishedImage
          src={image.url}
          alt={text(section.imageAlt, locale)}
          width={image.width ?? 1000}
          height={image.height ?? 900}
          loading="lazy"
        />
      ) : (
        <span className="landing-editorial__texture" aria-hidden="true" />
      )}
      <div>
        <Kicker value={section.eyebrow} locale={locale} />
        <h2>{text(section.heading, locale)}</h2>
        <p>{text(body, locale)}</p>
        {snapshot.links[section.id] && text(section.ctaLabel, locale) ? (
          <a className="landing-button" href={snapshot.links[section.id]}>
            {text(section.ctaLabel, locale)} <DirectionalArrow locale={locale} />
          </a>
        ) : null}
      </div>
    </div>
  );
}
function PromoBanner({
  section,
  snapshot,
  locale,
}: {
  section: Extract<LandingPageSection, { type: "PROMO_BANNER" }>;
  snapshot: LandingPagePublicSnapshot;
  locale: Locale;
}) {
  const image = media(snapshot, section.mediaAssetId);
  return (
    <div className="landing-promo-banner" data-style={section.style}>
      {image?.url ? (
        <PolishedImage
          src={image.url}
          alt={text(section.imageAlt, locale)}
          width={image.width ?? 1440}
          height={image.height ?? 420}
          loading="lazy"
        />
      ) : null}
      <div>
        <h2>{text(section.heading, locale)}</h2>
        <p>{text(section.description, locale)}</p>
      </div>
      {snapshot.links[section.id] && text(section.ctaLabel, locale) ? (
        <a className="landing-button" href={snapshot.links[section.id]}>
          {text(section.ctaLabel, locale)} <DirectionalArrow locale={locale} />
        </a>
      ) : null}
    </div>
  );
}

function Countdown({
  section,
  locale,
  initialNow,
}: {
  section: Extract<LandingPageSection, { type: "COUNTDOWN" }>;
  locale: Locale;
  initialNow: number;
}) {
  const end = Date.parse(section.endsAt);
  const [now, setNow] = useState(initialNow);
  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);
  const remaining = Math.max(0, end - now);
  if (!remaining && section.expiredBehavior === "HIDE") return null;
  const units = countdownUnits(remaining);
  return (
    <div className="landing-countdown">
      <div>
        <Kicker value={section.eyebrow} locale={locale} />
        <h2>{text(section.heading, locale)}</h2>
        <p>
          {remaining ? text(section.description, locale) : text(section.expiredMessage, locale)}
        </p>
      </div>
      {remaining ? (
        <div>
          {units.map(([value, unit]) => (
            <span key={unit}>
              <strong>{String(value).padStart(2, "0")}</strong>
              <small>{locale === "ar" ? countdownArabic[unit] : unit}</small>
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}
function NewsletterSection({
  section,
  locale,
}: {
  section: Extract<LandingPageSection, { type: "NEWSLETTER" }>;
  locale: Locale;
}) {
  const [pending, setPending] = useState(false);
  return (
    <div className="landing-newsletter" data-style={section.style}>
      <div>
        <Kicker value={section.eyebrow} locale={locale} />
        <h2>{text(section.heading, locale)}</h2>
        <p>{text(section.description, locale)}</p>
      </div>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          if (pending) return;
          const form = event.currentTarget;
          const email = String(new FormData(form).get("email") ?? "");
          setPending(true);
          try {
            await subscribeNewsletter(email, locale);
            form.reset();
            toast.success(locale === "ar" ? "تم الاشتراك" : "You're on the list");
          } catch (error) {
            toast.error(apiErrorMessage(error, locale));
          } finally {
            setPending(false);
          }
        }}
      >
        <label className="sr-only" htmlFor={`newsletter-${section.id}`}>
          {locale === "ar" ? "البريد الإلكتروني" : "Email address"}
        </label>
        <input
          id={`newsletter-${section.id}`}
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder={locale === "ar" ? "بريدك الإلكتروني" : "Email address"}
        />
        <button disabled={pending}>
          {pending ? "…" : locale === "ar" ? "اشتركي" : "Subscribe"}
        </button>
      </form>
    </div>
  );
}
function FaqSection({
  section,
  locale,
}: {
  section: Extract<LandingPageSection, { type: "FAQ" }>;
  locale: Locale;
}) {
  return (
    <div className="landing-faq">
      <SectionHeader heading={section.heading} description={section.description} locale={locale} />
      <div>
        {section.items.map((item) => (
          <details key={item.id}>
            <summary>
              {text(item.question, locale)}
              <ChevronDown size={18} />
            </summary>
            <p>{text(item.answer, locale)}</p>
          </details>
        ))}
      </div>
    </div>
  );
}

function SectionHeader({
  heading,
  description,
  locale,
  action,
}: {
  heading: LandingPageLocalizedText;
  description: LandingPageLocalizedText;
  locale: Locale;
  action?: ReactNode;
}) {
  return (
    <header className="landing-section-header">
      <div>
        <h2>{text(heading, locale)}</h2>
        {text(description, locale) ? <p>{text(description, locale)}</p> : null}
      </div>
      {action}
    </header>
  );
}
function Actions({
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  locale,
}: {
  primaryLabel: LandingPageLocalizedText;
  primaryHref: string | undefined;
  secondaryLabel: LandingPageLocalizedText;
  secondaryHref: string | undefined;
  locale: Locale;
}) {
  return (
    <div className="landing-actions">
      {primaryHref && text(primaryLabel, locale) ? (
        <a className="landing-button" href={primaryHref}>
          {text(primaryLabel, locale)}
        </a>
      ) : null}
      {secondaryHref && text(secondaryLabel, locale) ? (
        <a className="landing-button landing-button--ghost" href={secondaryHref}>
          {text(secondaryLabel, locale)} <DirectionalArrow locale={locale} />
        </a>
      ) : null}
    </div>
  );
}
function Kicker({ value, locale }: { value: LandingPageLocalizedText; locale: Locale }) {
  return text(value, locale) ? <p className="landing-kicker">{text(value, locale)}</p> : null;
}
function DirectionalArrow({ locale }: { locale: Locale }) {
  return locale === "ar" ? <ArrowLeft size={15} /> : <ArrowRight size={15} />;
}
function text(value: LandingPageLocalizedText, locale: Locale) {
  return value[locale] || value.en;
}
function label(entity: LandingPageResolvedEntity, locale: Locale) {
  return locale === "ar" ? entity.labelAr || entity.labelEn : entity.labelEn;
}
function path(entity: LandingPageResolvedEntity, locale: Locale) {
  return locale === "ar" ? entity.pathAr : entity.pathEn;
}
function pathDepth(entity: LandingPageResolvedEntity, locale: Locale) {
  return Math.max(0, (path(entity, locale)?.split("→").length ?? 1) - 1);
}
function media(snapshot: LandingPagePublicSnapshot, id: string | null) {
  return id ? snapshot.media[id] : undefined;
}
function countdownUnits(ms: number): Array<[number, keyof typeof countdownArabic]> {
  const total = Math.floor(ms / 1000);
  return [
    [Math.floor(total / 86400), "Days"],
    [Math.floor(total / 3600) % 24, "Hours"],
    [Math.floor(total / 60) % 60, "Minutes"],
    [total % 60, "Seconds"],
  ];
}
const countdownArabic = { Days: "يوم", Hours: "ساعة", Minutes: "دقيقة", Seconds: "ثانية" };
