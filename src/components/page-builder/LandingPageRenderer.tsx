import { useQuery } from "@tanstack/react-query";
import type {
  LandingPageLocalizedText,
  LandingPageHeroSlide,
  LandingPagePublicSnapshot,
  LandingPageResolvedEntity,
  LandingPageSection,
} from "@cosmetics/contracts/page-builder/page-builder.schema";
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Leaf,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";
import { BrandLogo } from "@/components/brand/BrandLogo";
import {
  Component,
  useEffect,
  useState,
  type CSSProperties,
  type ErrorInfo,
  type ReactNode,
} from "react";

import { ProductCard } from "@/components/shop/ProductCard";
import { BrandMarquee } from "@/components/home/BrandMarquee";
import { CategoryShowcase } from "@/components/home/CategoryShowcase";
import {
  Benefits,
  Featured,
  CollectionFeature,
  Concerns,
  BestSellers,
  BrandStory,
  BeautyDifference,
} from "@/components/home/Sections";
import { PolishedImage } from "@/components/ui/polished-image";
import { Button } from "@/components/ui/button";
import { Magnetic, ParallaxMedia, TextReveal } from "@/components/motion/Primitives";
import { useMotionPreferences } from "@/components/motion/motion-context";
import {
  loadCatalog,
  loadMerchandisingCatalog,
  loadProductsByIds,
  type Locale,
} from "@/lib/catalog";
import { apiErrorMessage, subscribeNewsletter } from "@/lib/api";
import { isLandingSectionVisible } from "@/lib/landing-page";
import { images } from "@/lib/products";
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
        <LandingSectionBoundary key={section.id} section={section}>
          <LandingSection
            section={section}
            snapshot={snapshot}
            locale={locale}
            priority={index === 0 && section.type === "HERO"}
          />
        </LandingSectionBoundary>
      ))}
    </main>
  );
}

class LandingSectionBoundary extends Component<
  { section: LandingPageSection; children: ReactNode },
  { failed: boolean }
> {
  override state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  override componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(
      `Page Engine section ${this.props.section.type} (${this.props.section.id}) failed to render`,
      error,
      info,
    );
  }

  override render() {
    if (this.state.failed) return null;
    return this.props.children;
  }
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
  if (section.type === "BIOREZA_HOME_MODULE")
    return (
      <div
        className="landing-signature-module"
        data-section-id={section.analyticsKey}
        data-visible-desktop={section.visibility.devices.includes("DESKTOP")}
        data-visible-tablet={section.visibility.devices.includes("TABLET")}
        data-visible-mobile={section.visibility.devices.includes("MOBILE")}
      >
        <BioRezaHomeModule module={section.module} />
      </div>
    );
  const classes = `landing-section landing-section--${section.type.toLowerCase().replace(/_/g, "-")} landing-section--${section.surface.toLowerCase()} landing-section--space-${section.spacing.toLowerCase()}`;
  const content = (() => {
    if (section.type === "HERO")
      return (
        <HeroSection section={section} snapshot={snapshot} locale={locale} priority={priority} />
      );
    if (section.type === "IMAGE")
      return <ImageSection section={section} snapshot={snapshot} locale={locale} />;
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
    if (section.type === "CONTENT_BLOCKS")
      return <ContentBlocksSection section={section} snapshot={snapshot} locale={locale} />;
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
        data-tablet-width={section.responsiveOverrides?.tablet.width}
        data-tablet-spacing={section.responsiveOverrides?.tablet.spacing}
        data-mobile-width={section.responsiveOverrides?.mobile.width}
        data-mobile-spacing={section.responsiveOverrides?.mobile.spacing}
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
      data-tablet-width={section.responsiveOverrides?.tablet.width}
      data-tablet-spacing={section.responsiveOverrides?.tablet.spacing}
      data-mobile-width={section.responsiveOverrides?.mobile.width}
      data-mobile-spacing={section.responsiveOverrides?.mobile.spacing}
    >
      <div
        className={`landing-section__inner landing-section__inner--${section.width.toLowerCase()}`}
      >
        {content}
      </div>
    </section>
  );
}

function ContentBlocksSection({
  section,
  snapshot,
  locale,
}: {
  section: Extract<LandingPageSection, { type: "CONTENT_BLOCKS" }>;
  snapshot: LandingPagePublicSnapshot;
  locale: Locale;
}) {
  const icons = {
    SHIELD: ShieldCheck,
    TRUCK: Truck,
    LEAF: Leaf,
    SPARKLES: Sparkles,
  };
  return (
    <>
      <SectionHeader heading={section.heading} description={section.description} locale={locale} />
      <div
        className="landing-content-blocks"
        data-layout={section.layout}
        style={{ "--landing-block-columns": section.columns } as CSSProperties}
      >
        {section.blocks.map((block) => {
          if (block.type === "QUOTE")
            return (
              <blockquote
                key={block.id}
                className="landing-content-block landing-content-block--quote"
              >
                <p>{text(block.quote, locale)}</p>
                {text(block.attribution, locale) ? (
                  <cite>{text(block.attribution, locale)}</cite>
                ) : null}
              </blockquote>
            );
          const Icon = block.type === "BENEFIT" ? icons[block.icon] : null;
          const content = (
            <>
              {Icon ? <Icon aria-hidden="true" /> : null}
              {block.type === "TEXT" && text(block.eyebrow, locale) ? (
                <small>{text(block.eyebrow, locale)}</small>
              ) : null}
              <h3>{text(block.title, locale)}</h3>
              {text(block.body, locale) ? <p>{text(block.body, locale)}</p> : null}
              {block.type === "TEXT" && text(block.ctaLabel, locale) ? (
                <span className="landing-content-block__action">
                  {text(block.ctaLabel, locale)} <DirectionalArrow locale={locale} />
                </span>
              ) : null}
            </>
          );
          const href = snapshot.links[`${section.id}:block:${block.id}`];
          return href && block.type === "TEXT" ? (
            <a key={block.id} href={href} className="landing-content-block">
              {content}
            </a>
          ) : (
            <article key={block.id} className="landing-content-block">
              {content}
            </article>
          );
        })}
      </div>
    </>
  );
}

function BioRezaHomeModule({
  module,
}: {
  module: Extract<LandingPageSection, { type: "BIOREZA_HOME_MODULE" }>["module"];
}) {
  if (module === "BRAND_MARQUEE") return <BrandMarquee />;
  if (module === "BENEFITS") return <Benefits />;
  if (module === "CATEGORY_SHOWCASE") return <CategoryShowcase />;
  if (module === "FEATURED") return <Featured />;
  if (module === "COLLECTION_FEATURE") return <CollectionFeature />;
  if (module === "CONCERNS") return <Concerns />;
  if (module === "BEST_SELLERS") return <BestSellers />;
  if (module === "BRAND_STORY") return <BrandStory />;
  return <BeautyDifference />;
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
  if (section.slides && section.preset === "BIOREZA_SIGNATURE")
    return <BioRezaSignatureHero section={section} snapshot={snapshot} locale={locale} />;
  if (section.slides)
    return <HeroSlides section={section} snapshot={snapshot} locale={locale} priority={priority} />;
  const desktop = media(snapshot, section.desktopMediaId);
  const mobile = media(snapshot, section.mobileMediaId) ?? desktop;
  const behavior = heroMediaBehavior(section);
  const customOverlay = heroOverlay(section, locale);
  return (
    <div
      className="landing-hero"
      data-layout={section.layout}
      data-media-behavior={behavior}
      data-media-side={section.sideImagePosition ?? "RIGHT"}
      data-align={section.alignment}
      data-position={section.contentPosition}
      style={
        {
          "--landing-hero-fit": (behavior === "SIDE"
            ? (section.sideImageObjectFit ?? "COVER")
            : (section.backgroundObjectFit ?? "COVER")
          ).toLowerCase(),
          "--landing-hero-position": (section.backgroundObjectPosition ?? "CENTER").toLowerCase(),
          "--landing-hero-side-width": `${section.sideImageWidth ?? 50}%`,
        } as CSSProperties
      }
    >
      <ResponsiveLandingPicture
        className="landing-hero__media"
        desktop={desktop}
        mobile={mobile}
        alt={text(section.imageAlt, locale)}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
      />
      <span
        className="landing-hero__overlay"
        data-strength={section.overlay}
        style={customOverlay ? { background: customOverlay } : undefined}
      />
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

function HeroSlides({
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
  const slides = section.slides?.filter((slide) => slide.enabled) ?? [];
  const carousel = section.carousel ?? {
    autoplay: true,
    durationSeconds: 6,
    pauseOnHover: true,
    showArrows: true,
    showIndicators: true,
    animation: "FADE" as const,
  };
  const { reducedMotion } = useMotionPreferences();
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (activeIndex >= slides.length) setActiveIndex(0);
  }, [activeIndex, slides.length]);
  useEffect(() => {
    if (slides.length < 2 || !carousel.autoplay || paused || reducedMotion) return;
    const timer = window.setInterval(
      () => setActiveIndex((current) => (current + 1) % slides.length),
      carousel.durationSeconds * 1000,
    );
    return () => window.clearInterval(timer);
  }, [carousel.autoplay, carousel.durationSeconds, paused, reducedMotion, slides.length]);
  if (!slides.length) return null;
  const active = slides[activeIndex] ?? slides[0]!;
  const desktopLayout = active.layout;
  const mobileLayout = active.mobile.enabled ? active.mobile : null;
  const theme =
    desktopLayout.textTheme === "AUTO"
      ? desktopLayout.mediaBehavior === "SIDE"
        ? "DARK"
        : "LIGHT"
      : desktopLayout.textTheme;
  const mobileTheme =
    mobileLayout?.textTheme === "AUTO"
      ? desktopLayout.mediaBehavior === "SIDE"
        ? "DARK"
        : "LIGHT"
      : (mobileLayout?.textTheme ?? theme);
  const go = (index: number) => setActiveIndex((index + slides.length) % slides.length);
  return (
    <div
      className="landing-hero landing-hero-builder"
      data-layout="FULL"
      data-media-behavior={desktopLayout.mediaBehavior}
      data-media-side={desktopLayout.sideImagePosition}
      data-align={desktopLayout.horizontalAlignment}
      data-position={desktopLayout.verticalAlignment}
      data-text-align={desktopLayout.textAlignment}
      data-content-width={desktopLayout.contentWidth}
      data-height={desktopLayout.height}
      data-mobile-height={mobileLayout?.height ?? desktopLayout.height}
      data-mobile-align={mobileLayout?.horizontalAlignment ?? desktopLayout.horizontalAlignment}
      data-mobile-position={mobileLayout?.verticalAlignment ?? desktopLayout.verticalAlignment}
      data-mobile-text-align={mobileLayout?.textAlignment ?? desktopLayout.textAlignment}
      data-mobile-order={mobileLayout?.contentOrder ?? "MEDIA_FIRST"}
      data-mobile-description={mobileLayout?.showDescription === false ? "HIDDEN" : "VISIBLE"}
      data-mobile-secondary={mobileLayout?.showSecondaryCta === false ? "HIDDEN" : "VISIBLE"}
      data-theme={theme}
      data-mobile-theme={mobileTheme}
      data-mobile-cta={mobileLayout?.ctaLayout ?? "INLINE"}
      data-mobile-headline={mobileLayout?.headlineScale ?? "MEDIUM"}
      data-animation={reducedMotion ? "NONE" : carousel.animation}
      onPointerEnter={() => carousel.pauseOnHover && setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
      }}
      style={
        {
          "--landing-hero-fit": desktopLayout.objectFit.toLowerCase(),
          "--landing-hero-position": heroObjectPosition(
            desktopLayout.objectPosition,
            desktopLayout.focalPoint,
          ),
          "--landing-hero-zoom": desktopLayout.zoom / 100,
          "--landing-hero-side-width": `${desktopLayout.sideImageWidth}%`,
          "--landing-hero-mobile-fit": (
            mobileLayout?.objectFit ?? desktopLayout.objectFit
          ).toLowerCase(),
          "--landing-hero-mobile-position": heroObjectPosition(
            mobileLayout?.objectPosition ?? desktopLayout.objectPosition,
            mobileLayout?.focalPoint ?? desktopLayout.focalPoint,
          ),
          "--landing-hero-mobile-zoom": (mobileLayout?.zoom ?? desktopLayout.zoom) / 100,
          "--landing-hero-overlay": heroSlideOverlay(desktopLayout, locale),
          "--landing-hero-mobile-overlay": heroSlideOverlay(
            mobileLayout ? { ...desktopLayout, ...mobileLayout } : desktopLayout,
            locale,
          ),
        } as CSSProperties
      }
    >
      <HeroSlideMedia
        slide={active}
        snapshot={snapshot}
        locale={locale}
        priority={priority && activeIndex === 0}
      />
      <span className="landing-hero__overlay" aria-hidden="true" />
      <div className="landing-hero__copy" key={active.id}>
        <Kicker value={active.eyebrow} locale={locale} />
        {text(active.heading, locale) ? (
          section.headingLevel === "H1" ? (
            <h1 className="landing-hero-builder__heading">{text(active.heading, locale)}</h1>
          ) : (
            <h2 className="landing-hero-builder__heading">{text(active.heading, locale)}</h2>
          )
        ) : null}
        {text(active.secondaryHeading, locale) ? (
          <p className="landing-hero-builder__secondary">{text(active.secondaryHeading, locale)}</p>
        ) : null}
        {text(active.description, locale) ? (
          <p className="landing-hero-builder__description">{text(active.description, locale)}</p>
        ) : null}
        {text(active.supportingText, locale) ? (
          <p className="landing-hero-builder__supporting">{text(active.supportingText, locale)}</p>
        ) : null}
        <HeroSlideActions
          sectionId={section.id}
          slide={active}
          snapshot={snapshot}
          locale={locale}
        />
      </div>
      {slides.length > 1 ? (
        <div
          className="landing-hero-builder__controls"
          aria-label={locale === "ar" ? "شرائح الواجهة" : "Hero slides"}
        >
          {carousel.showArrows ? (
            <button
              type="button"
              onClick={() => go(activeIndex - 1)}
              aria-label={locale === "ar" ? "الشريحة السابقة" : "Previous slide"}
            >
              {locale === "ar" ? (
                <ChevronRight aria-hidden="true" />
              ) : (
                <ChevronLeft aria-hidden="true" />
              )}
            </button>
          ) : null}
          {carousel.showIndicators ? (
            <div role="tablist" aria-label={locale === "ar" ? "اختيار الشريحة" : "Choose slide"}>
              {slides.map((slide, index) => (
                <button
                  type="button"
                  role="tab"
                  key={slide.id}
                  aria-selected={index === activeIndex}
                  aria-label={`${locale === "ar" ? "الشريحة" : "Slide"} ${index + 1}`}
                  onClick={() => go(index)}
                />
              ))}
            </div>
          ) : null}
          {carousel.showArrows ? (
            <button
              type="button"
              onClick={() => go(activeIndex + 1)}
              aria-label={locale === "ar" ? "الشريحة التالية" : "Next slide"}
            >
              {locale === "ar" ? (
                <ChevronLeft aria-hidden="true" />
              ) : (
                <ChevronRight aria-hidden="true" />
              )}
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

function BioRezaSignatureHero({
  section,
  snapshot,
  locale,
}: {
  section: Extract<LandingPageSection, { type: "HERO" }>;
  snapshot: LandingPagePublicSnapshot;
  locale: Locale;
}) {
  const slides = section.slides?.filter((slide) => slide.enabled) ?? [];
  const carousel = section.carousel ?? {
    autoplay: true,
    durationSeconds: 6,
    pauseOnHover: true,
    showArrows: true,
    showIndicators: true,
    indicatorStyle: "DOTS" as const,
    animation: "FADE" as const,
  };
  const { reducedMotion } = useMotionPreferences();
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [deferredMediaReady, setDeferredMediaReady] = useState(false);
  const active = slides[activeIndex] ?? slides[0];
  useEffect(() => {
    if (activeIndex >= slides.length) setActiveIndex(0);
  }, [activeIndex, slides.length]);
  useEffect(() => {
    if (slides.length < 2 || !carousel.autoplay || paused || reducedMotion) return;
    const timer = window.setInterval(
      () => setActiveIndex((current) => (current + 1) % slides.length),
      carousel.durationSeconds * 1_000,
    );
    return () => window.clearInterval(timer);
  }, [carousel.autoplay, carousel.durationSeconds, paused, reducedMotion, slides.length]);
  useEffect(() => {
    const timer = window.setTimeout(() => setDeferredMediaReady(true), 1_500);
    return () => window.clearTimeout(timer);
  }, []);
  if (!active) return null;
  const go = (index: number) => setActiveIndex((index + slides.length) % slides.length);
  const ar = locale === "ar";
  return (
    <section
      id="home-hero"
      className="sf-hero landing-signature-hero"
      aria-label={ar ? "واجهة متجر بيوريزا" : "BIOREZA storefront introduction"}
      onPointerEnter={() => carousel.pauseOnHover && setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
      }}
    >
      <div className="sf-hero__slides" aria-hidden="true">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className="sf-hero__media"
            data-slide-id={slide.id}
            data-active={activeIndex === index || undefined}
            style={
              {
                "--hero-image-position": heroObjectPosition(
                  slide.layout.objectPosition,
                  slide.layout.focalPoint,
                ),
                "--hero-image-position-mobile": heroObjectPosition(
                  slide.mobile.enabled ? slide.mobile.objectPosition : slide.layout.objectPosition,
                  slide.mobile.enabled ? slide.mobile.focalPoint : slide.layout.focalPoint,
                ),
              } as CSSProperties
            }
          >
            <ParallaxMedia
              className="size-full"
              strength={activeIndex === index && !reducedMotion ? 18 : 0}
            >
              {index === 0 || activeIndex === index || deferredMediaReady ? (
                <SignatureSlideMedia
                  slide={slide}
                  snapshot={snapshot}
                  priority={index === 0 || activeIndex === index}
                />
              ) : null}
            </ParallaxMedia>
          </div>
        ))}
      </div>

      <div className="sf-hero__veil" aria-hidden="true" />
      <div className="sf-shell sf-hero__content">
        <div key={active.id} className="sf-hero__copy">
          {text(active.eyebrow, locale) ? (
            <p className="sf-hero__eyebrow">
              <span>{text(active.eyebrow, locale)}</span>
            </p>
          ) : null}
          {text(active.heading, locale) ? (
            <TextReveal
              as={section.headingLevel === "H1" ? "h1" : "h2"}
              className="sf-display sf-hero__title"
              lines={text(active.heading, locale).split("\n")}
              delay={90}
            />
          ) : null}
          {text(active.secondaryHeading, locale) ? (
            <p className="sf-hero__secondary">{text(active.secondaryHeading, locale)}</p>
          ) : null}
          {text(active.description, locale) ? (
            <p className="sf-hero__lede">{text(active.description, locale)}</p>
          ) : null}
          <div className="sf-hero__actions">
            <SignatureCta
              cta={active.primaryCta}
              href={snapshot.links[`${section.id}:slide:${active.id}:primary`]}
              locale={locale}
              primary
            />
            <SignatureCta
              cta={active.secondaryCta}
              href={snapshot.links[`${section.id}:slide:${active.id}:secondary`]}
              locale={locale}
            />
          </div>
        </div>
      </div>

      {text(active.supportingText, locale) ? (
        <div className="sf-hero__note">
          <span>{String(activeIndex + 1).padStart(2, "0")}</span>
          <p>{text(active.supportingText, locale)}</p>
        </div>
      ) : null}

      {slides.length > 1 ? (
        <div
          className="sf-hero__controls"
          aria-label={ar ? "شرائح الواجهة" : "Hero slides"}
          data-indicator={carousel.indicatorStyle}
        >
          {carousel.showArrows ? (
            <button
              type="button"
              onClick={() => go(activeIndex - 1)}
              aria-label={ar ? "الشريحة السابقة" : "Previous slide"}
            >
              {ar ? <ChevronRight aria-hidden="true" /> : <ChevronLeft aria-hidden="true" />}
            </button>
          ) : null}
          {carousel.showIndicators ? (
            <div
              className="sf-hero__dots"
              role="tablist"
              aria-label={ar ? "اختيار الشريحة" : "Choose slide"}
            >
              {slides.map((slide, index) => (
                <button
                  key={slide.id}
                  type="button"
                  role="tab"
                  aria-selected={activeIndex === index}
                  aria-label={`${ar ? "الشريحة" : "Slide"} ${index + 1}`}
                  data-active={activeIndex === index || undefined}
                  onClick={() => go(index)}
                />
              ))}
            </div>
          ) : null}
          {carousel.showArrows ? (
            <button
              type="button"
              onClick={() => go(activeIndex + 1)}
              aria-label={ar ? "الشريحة التالية" : "Next slide"}
            >
              {ar ? <ChevronLeft aria-hidden="true" /> : <ChevronRight aria-hidden="true" />}
            </button>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}

function SignatureCta({
  cta,
  href,
  locale,
  primary = false,
}: {
  cta: LandingPageHeroSlide["primaryCta"];
  href: string | undefined;
  locale: Locale;
  primary?: boolean;
}) {
  const label = text(cta.label, locale);
  if (!href || !label) return null;
  const anchor = (
    <a
      href={href}
      target={cta.newTab ? "_blank" : undefined}
      rel={cta.newTab ? "noopener noreferrer" : undefined}
      className={primary ? undefined : "sf-text-link sf-text-link--light"}
    >
      {label}
      {!primary ? <DirectionalArrow locale={locale} /> : null}
    </a>
  );
  return primary ? (
    <Magnetic>
      <Button asChild variant="solid" size="pill">
        {anchor}
      </Button>
    </Magnetic>
  ) : (
    anchor
  );
}

function SignatureSlideMedia({
  slide,
  snapshot,
  priority,
}: {
  slide: LandingPageHeroSlide;
  snapshot: LandingPagePublicSnapshot;
  priority: boolean;
}) {
  const signature = signatureMedia(slide.signatureMedia);
  const desktop = media(snapshot, slide.desktopMediaId) ?? signature;
  const mobile = media(snapshot, slide.mobileMediaId) ?? desktop;
  const poster = media(snapshot, slide.posterMediaId);
  if (slide.mediaType === "NONE") return null;
  if (slide.mediaType === "VIDEO" && desktop)
    return (
      <video
        className="size-full object-cover"
        poster={poster?.url}
        autoPlay={slide.video.autoplay}
        muted={slide.video.autoplay ? true : slide.video.muted}
        loop={slide.video.loop}
        controls={slide.video.controls}
        playsInline={slide.video.playsInline}
        preload={
          priority ? "auto" : (slide.video.preload.toLowerCase() as "none" | "metadata" | "auto")
        }
      >
        {mobile && mobile.id !== desktop.id ? (
          <source src={mobile.url} type={mobile.contentType} media="(max-width: 680px)" />
        ) : null}
        <source src={desktop.url} type={desktop.contentType} />
      </video>
    );
  if (!desktop) return <span className="landing-image-placeholder size-full" />;
  return (
    <picture>
      {mobile && mobile.url !== desktop.url ? (
        <source media="(max-width: 680px)" srcSet={mobile.url} />
      ) : null}
      <img
        src={desktop.url}
        alt=""
        width={desktop.width || 2880}
        height={desktop.height || 1425}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "low"}
        decoding="async"
        className="size-full object-cover"
      />
    </picture>
  );
}

function signatureMedia(value: LandingPageHeroSlide["signatureMedia"]): SnapshotMedia | undefined {
  const url = value
    ? {
        RADIANCE: images.heroSlide1,
        SERUM: images.heroSlide2,
        MINIMAL: images.heroSlide3,
      }[value]
    : undefined;
  return url
    ? {
        id: `signature:${value}`,
        url,
        width: 2880,
        height: 1425,
        altText: null,
        contentType: "image/jpeg",
      }
    : undefined;
}

function HeroSlideMedia({
  slide,
  snapshot,
  priority,
  locale,
}: {
  slide: LandingPageHeroSlide;
  snapshot: LandingPagePublicSnapshot;
  priority: boolean;
  locale: Locale;
}) {
  const desktop = media(snapshot, slide.desktopMediaId);
  const mobile = media(snapshot, slide.mobileMediaId) ?? desktop;
  const poster = media(snapshot, slide.posterMediaId);
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [desktop?.url, mobile?.url]);
  if (slide.mediaType === "NONE") return null;
  if (!desktop || failed)
    return <span className="landing-hero__media landing-image-placeholder" aria-hidden="true" />;
  if (slide.mediaType === "VIDEO")
    return (
      <video
        className="landing-hero__media"
        poster={poster?.url}
        autoPlay={slide.video.autoplay}
        muted={slide.video.autoplay ? true : slide.video.muted}
        loop={slide.video.loop}
        controls={slide.video.controls}
        playsInline={slide.video.playsInline}
        preload={
          priority ? "auto" : (slide.video.preload.toLowerCase() as "none" | "metadata" | "auto")
        }
        onError={() => setFailed(true)}
      >
        {mobile && mobile.id !== desktop.id ? (
          <source
            src={mobile.url}
            type={mobile.contentType ?? "video/mp4"}
            media="(max-width: 680px)"
          />
        ) : null}
        <source src={desktop.url} type={desktop.contentType ?? "video/mp4"} />
      </video>
    );
  return (
    <ResponsiveLandingPicture
      className="landing-hero__media"
      desktop={desktop}
      mobile={mobile}
      alt={slide.decorative ? "" : text(slide.imageAlt, locale)}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
    />
  );
}

function HeroSlideActions({
  sectionId,
  slide,
  snapshot,
  locale,
}: {
  sectionId: string;
  slide: LandingPageHeroSlide;
  snapshot: LandingPagePublicSnapshot;
  locale: Locale;
}) {
  const entries = [
    ["primary", slide.primaryCta],
    ["secondary", slide.secondaryCta],
  ] as const;
  return (
    <div className="landing-actions">
      {entries.map(([key, cta]) => {
        const href = snapshot.links[`${sectionId}:slide:${slide.id}:${key}`];
        const label = text(cta.label, locale);
        if (!href || !label) return null;
        return (
          <a
            key={key}
            className={`landing-button landing-button--${cta.variant.toLowerCase()}`}
            href={href}
            target={cta.newTab ? "_blank" : undefined}
            rel={cta.newTab ? "noopener noreferrer" : undefined}
          >
            {label}
            {cta.variant === "TEXT" ? <DirectionalArrow locale={locale} /> : null}
          </a>
        );
      })}
    </div>
  );
}

function heroObjectPosition(
  position: LandingPageHeroSlide["layout"]["objectPosition"],
  focalPoint: { x: number; y: number },
) {
  if (position === "FOCAL_POINT") return `${focalPoint.x}% ${focalPoint.y}%`;
  return position.toLowerCase().replace("_", " ");
}

function heroSlideOverlay(
  layout: Pick<LandingPageHeroSlide["layout"], "overlay" | "overlayStyle" | "overlayColor">,
  locale: Locale,
) {
  const opacity = { NONE: 0, LIGHT: 0.18, MEDIUM: 0.42, STRONG: 0.62 }[layout.overlay];
  const solid = hexToRgba(layout.overlayColor, opacity);
  if (layout.overlayStyle === "SOLID") return solid;
  const transparent = hexToRgba(layout.overlayColor, 0);
  const direction = {
    TO_TOP: "0deg",
    TO_BOTTOM: "180deg",
    TO_START: locale === "ar" ? "90deg" : "-90deg",
    TO_END: locale === "ar" ? "-90deg" : "90deg",
  }[layout.overlayStyle];
  return `linear-gradient(${direction}, ${solid}, ${transparent})`;
}

function ImageSection({
  section,
  snapshot,
  locale,
}: {
  section: Extract<LandingPageSection, { type: "IMAGE" }>;
  snapshot: LandingPagePublicSnapshot;
  locale: Locale;
}) {
  const desktop = media(snapshot, section.desktopMediaId);
  const mobile = media(snapshot, section.mobileMediaId) ?? desktop;
  const alt = text(section.imageAlt, locale);
  const picture = (
    <ResponsiveLandingPicture
      className="landing-image__media"
      desktop={desktop}
      mobile={mobile}
      alt={alt}
      loading="lazy"
      fetchPriority="auto"
    />
  );
  const href = snapshot.links[section.id];
  return (
    <figure
      className="landing-image"
      data-width={section.imageWidth}
      data-align={section.alignment}
      data-ratio={section.aspectRatio}
      style={
        {
          "--landing-image-width": `${section.customWidthPercent}%`,
          "--landing-image-ratio": storefrontAspectRatio(section, desktop),
          "--landing-image-fit": section.objectFit.toLowerCase(),
          "--landing-image-position": section.objectPosition.toLowerCase(),
          "--landing-image-radius": `${section.borderRadius}px`,
          "--landing-image-max-height": section.maxHeight ? `${section.maxHeight}px` : "none",
          "--landing-image-background": section.backgroundColor ?? "transparent",
        } as CSSProperties
      }
    >
      {href ? (
        <a
          className="landing-image__link"
          href={href}
          target={section.openInNewTab ? "_blank" : undefined}
          rel={section.openInNewTab ? "noopener noreferrer" : undefined}
        >
          {picture}
        </a>
      ) : (
        picture
      )}
      {text(section.caption, locale) ? (
        <figcaption>{text(section.caption, locale)}</figcaption>
      ) : null}
    </figure>
  );
}

type SnapshotMedia = LandingPagePublicSnapshot["media"][string];

function ResponsiveLandingPicture({
  className,
  desktop,
  mobile,
  alt,
  loading,
  fetchPriority,
}: {
  className: string;
  desktop: SnapshotMedia | undefined;
  mobile: SnapshotMedia | undefined;
  alt: string;
  loading: "eager" | "lazy";
  fetchPriority: "high" | "auto";
}) {
  const [mobileFailed, setMobileFailed] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    setMobileFailed(false);
    setFailed(false);
  }, [desktop?.url, mobile?.url]);
  if (!desktop?.url || failed)
    return (
      <span
        className={`${className} landing-image-placeholder`}
        role="img"
        aria-label={alt ? `${alt} unavailable` : "Image unavailable"}
      />
    );
  return (
    <picture className={className}>
      {mobile?.url && mobile.url !== desktop.url && !mobileFailed ? (
        <source media="(max-width: 680px)" srcSet={mobile.url} />
      ) : null}
      <img
        src={desktop.url}
        alt={alt}
        width={desktop.width || undefined}
        height={desktop.height || undefined}
        loading={loading}
        fetchPriority={fetchPriority}
        decoding="async"
        onError={(event) => {
          const currentUrl = event.currentTarget.currentSrc;
          if (mobile?.url && !mobileFailed && currentUrl === mobile.url) {
            setMobileFailed(true);
            return;
          }
          setFailed(true);
        }}
      />
    </picture>
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
  const categoryReference = entities.find((entity) => entity.kind === "CATEGORY");
  const brandReference = entities.find((entity) => entity.kind === "BRAND");
  const tagReference = entities.find((entity) => entity.kind === "TAG");
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
      if (source.mode === "BEST_SELLERS")
        return loadMerchandisingCatalog(
          { section: `page-${section.analyticsKey}-best-sellers`, limit: section.limit },
          locale,
        );
      if (source.mode === "NEWEST")
        return loadCatalog(
          { sortBy: "createdAt", sortOrder: "desc", limit: section.limit },
          locale,
        );
      if (source.mode === "CATEGORY")
        return loadCatalog({ categorySlug: reference?.slug, limit: section.limit }, locale);
      if (source.mode === "BRAND")
        return loadCatalog({ brandSlug: reference?.slug, limit: section.limit }, locale);
      if (source.mode === "CURRENT_CONTEXT") {
        if (categoryReference)
          return loadCatalog(
            { categorySlug: categoryReference.slug, limit: section.limit },
            locale,
          );
        if (brandReference)
          return loadCatalog({ brandSlug: brandReference.slug, limit: section.limit }, locale);
        return [];
      }
      if (source.mode === "DYNAMIC_RULE") {
        const sort = {
          NEWEST: { sortBy: "createdAt", sortOrder: "desc" },
          NAME: { sortBy: "nameEn", sortOrder: "asc" },
          PRICE_LOW: { sortBy: "basePrice", sortOrder: "asc" },
          PRICE_HIGH: { sortBy: "basePrice", sortOrder: "desc" },
        }[source.sort];
        return loadCatalog(
          {
            categorySlug: categoryReference?.slug,
            brandSlug: brandReference?.slug,
            tags: tagReference?.slug,
            inStock: source.availability === "IN_STOCK" ? "true" : undefined,
            ...sort,
            limit: section.limit,
          },
          locale,
        );
      }
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
            {isCategory && entity.imageUrl ? (
              <PolishedImage
                src={entity.imageUrl}
                alt={label(entity, locale)}
                width={isCategory ? 720 : 360}
                height={isCategory ? 860 : 180}
                loading="lazy"
                sizes={isCategory ? "(min-width: 900px) 25vw, 50vw" : "180px"}
              />
            ) : isCategory ? (
              <span className="landing-entity__placeholder">
                {label(entity, locale).slice(0, 1)}
              </span>
            ) : (
              <BrandLogo
                name={label(entity, locale)}
                logoUrl={entity.imageUrl}
                display={entity.logoDisplay}
                className="landing-entity__brand-logo"
                sizes="(min-width: 900px) 220px, 42vw"
              />
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
function heroMediaBehavior(section: Extract<LandingPageSection, { type: "HERO" }>) {
  return section.mediaBehavior ?? (section.layout === "SPLIT" ? "SIDE" : "BACKGROUND");
}
function heroOverlay(section: Extract<LandingPageSection, { type: "HERO" }>, locale: Locale) {
  if (
    section.overlayColor === undefined &&
    section.overlayOpacity === undefined &&
    section.gradientOverlay === undefined
  )
    return null;
  const color = section.overlayColor ?? "#0f0c09";
  const opacity = section.overlayOpacity ?? 0.42;
  const solid = hexToRgba(color, opacity);
  const transparent = hexToRgba(color, 0);
  const gradient = section.gradientOverlay ?? "NONE";
  if (gradient === "NONE") return solid;
  if (gradient === "TO_BOTTOM") return `linear-gradient(180deg, ${solid}, ${transparent})`;
  const towardsEnd = gradient === "TO_END";
  const angle =
    (towardsEnd && locale === "en") || (!towardsEnd && locale === "ar") ? "90deg" : "-90deg";
  return `linear-gradient(${angle}, ${solid}, ${transparent})`;
}
function hexToRgba(hex: string, opacity: number) {
  const value = hex.replace("#", "");
  const red = Number.parseInt(value.slice(0, 2), 16);
  const green = Number.parseInt(value.slice(2, 4), 16);
  const blue = Number.parseInt(value.slice(4, 6), 16);
  return `rgba(${red}, ${green}, ${blue}, ${opacity})`;
}
function storefrontAspectRatio(
  section: Extract<LandingPageSection, { type: "IMAGE" }>,
  desktop: SnapshotMedia | undefined,
) {
  if (section.aspectRatio === "ORIGINAL")
    return desktop?.width && desktop.height ? `${desktop.width} / ${desktop.height}` : "auto";
  if (section.aspectRatio === "CUSTOM")
    return `${section.customAspectRatio.width} / ${section.customAspectRatio.height}`;
  return section.aspectRatio.replace("_", " / ");
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
