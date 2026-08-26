import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState, type CSSProperties } from "react";

import { Button } from "@/components/ui/button";
import { Magnetic, ParallaxMedia, TextReveal } from "@/components/motion/Primitives";
import { useMotionPreferences } from "@/components/motion/motion-context";
import { images } from "@/lib/products";
import { useStore } from "@/lib/store";

const heroSlides = [
  {
    id: "radiance",
    image: images.heroSlide1,
    position: { desktop: "center center", mobile: "52% center" },
    eyebrow: { en: "Curated beauty", ar: "اختيارات جمال منتقاة" },
    title: { en: ["Skincare & Beauty", "Collection"], ar: ["مجموعة العناية", "والجمال"] },
    copy: {
      en: "Explore skincare, makeup, haircare, and fragrance with clear product details and current availability.",
      ar: "اكتشفي العناية بالبشرة والمكياج والشعر والعطور مع تفاصيل واضحة وحالة التوفر الحالية.",
    },
    cta: { en: "Shop Now", ar: "تسوقي الآن" },
    note: { en: "Daily skincare essentials", ar: "أساسيات العناية اليومية" },
  },
  {
    id: "serum",
    image: images.heroSlide2,
    position: { desktop: "center center", mobile: "66% center" },
    eyebrow: { en: "Skincare essentials", ar: "أساسيات العناية بالبشرة" },
    title: { en: ["Glow Skin", "Every Day"], ar: ["بشرة مشرقة", "كل يوم"] },
    copy: {
      en: "Compare formulas, ingredients, prices, and options before choosing what fits your routine.",
      ar: "قارني التركيبات والمكونات والأسعار والخيارات قبل اختيار ما يناسب روتينك.",
    },
    cta: { en: "Explore Products", ar: "اكتشفي المنتجات" },
    note: { en: "Original products only", ar: "منتجات أصلية فقط" },
  },
  {
    id: "minimal",
    image: images.heroSlide3,
    position: { desktop: "center center", mobile: "69% center" },
    eyebrow: { en: "Beauty with confidence", ar: "جمال بثقة" },
    title: { en: ["Beauty, Clearly", "Chosen"], ar: ["جمال مختار", "بوضوح"] },
    copy: {
      en: "A considered edit of skincare and beauty pieces for calm, polished routines.",
      ar: "اختيارات مدروسة من العناية والجمال لروتين هادئ وأنيق.",
    },
    cta: { en: "Discover More", ar: "اكتشفي المزيد" },
    note: { en: "Curated by BioReza", ar: "مختار من بيوريزا" },
  },
] as const;

export function Hero() {
  const { locale } = useStore();
  const { reducedMotion } = useMotionPreferences();
  const ar = locale === "ar";
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [deferredMediaReady, setDeferredMediaReady] = useState(false);
  const active = heroSlides[activeSlide] ?? heroSlides[0];
  const goToSlide = (index: number) =>
    setActiveSlide((index + heroSlides.length) % heroSlides.length);
  const nextSlide = () => goToSlide(activeSlide + 1);
  const previousSlide = () => goToSlide(activeSlide - 1);

  useEffect(() => {
    if (isPaused || reducedMotion) return;
    const timer = window.setInterval(
      () => setActiveSlide((current) => (current + 1) % heroSlides.length),
      6_200,
    );
    return () => window.clearInterval(timer);
  }, [isPaused, reducedMotion]);

  useEffect(() => {
    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof globalThis.setTimeout> | undefined;
    const loadDeferredMedia = () => {
      if ("requestIdleCallback" in window) {
        idleId = window.requestIdleCallback(() => setDeferredMediaReady(true), { timeout: 2_000 });
      } else {
        setDeferredMediaReady(true);
      }
    };
    const schedule = () => {
      timeoutId = globalThis.setTimeout(loadDeferredMedia, 1_500);
    };
    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });
    return () => {
      window.removeEventListener("load", schedule);
      if (idleId !== undefined && "cancelIdleCallback" in window) window.cancelIdleCallback(idleId);
      if (timeoutId !== undefined) globalThis.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <section
      className="sf-hero"
      aria-label={ar ? "واجهة متجر بيوريزا" : "BIOREZA storefront introduction"}
      onPointerEnter={() => setIsPaused(true)}
      onPointerLeave={() => setIsPaused(false)}
    >
      <div className="sf-hero__slides" aria-hidden="true">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className="sf-hero__media"
            data-slide-id={slide.id}
            data-active={activeSlide === index || undefined}
            style={
              {
                "--hero-image-position": slide.position.desktop,
                "--hero-image-position-mobile": slide.position.mobile,
              } as CSSProperties
            }
          >
            <ParallaxMedia className="size-full" strength={activeSlide === index ? 18 : 0}>
              {index === 0 || activeSlide === index || deferredMediaReady ? (
                <img
                  src={slide.image}
                  alt=""
                  width={2880}
                  height={1425}
                  loading={index === 0 || activeSlide === index ? "eager" : "lazy"}
                  fetchPriority={index === 0 || activeSlide === index ? "high" : "low"}
                  decoding="async"
                  className="size-full object-cover"
                />
              ) : null}
            </ParallaxMedia>
          </div>
        ))}
      </div>

      <div className="sf-hero__veil" aria-hidden="true" />
      <div className="sf-shell sf-hero__content">
        <div key={active.id} className="sf-hero__copy">
          <p className="sf-hero__eyebrow">
            <span>{active.eyebrow[ar ? "ar" : "en"]}</span>
          </p>
          <TextReveal
            as="h1"
            className="sf-display sf-hero__title"
            lines={[...active.title[ar ? "ar" : "en"]]}
            delay={90}
          />
          <p className="sf-hero__lede">{active.copy[ar ? "ar" : "en"]}</p>
          <div className="sf-hero__actions">
            <Magnetic>
              <Button asChild variant="solid" size="pill">
                <Link to="/shop" preload="intent">
                  {active.cta[ar ? "ar" : "en"]}
                </Link>
              </Button>
            </Magnetic>
            <Link to="/offers" preload="intent" className="sf-text-link sf-text-link--light">
              {ar ? "شاهدي العروض الحالية" : "View current offers"}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>

      <div className="sf-hero__note">
        <span>{String(activeSlide + 1).padStart(2, "0")}</span>
        <p>{active.note[ar ? "ar" : "en"]}</p>
      </div>

      <div className="sf-hero__controls" aria-label={ar ? "شرائح الواجهة" : "Hero slides"}>
        <button
          type="button"
          onClick={previousSlide}
          aria-label={ar ? "الشريحة السابقة" : "Previous slide"}
        >
          <ChevronLeft aria-hidden="true" />
        </button>
        <div
          className="sf-hero__dots"
          role="tablist"
          aria-label={ar ? "اختيار الشريحة" : "Choose slide"}
        >
          {heroSlides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              role="tab"
              aria-selected={activeSlide === index}
              aria-label={`${ar ? "الشريحة" : "Slide"} ${index + 1}`}
              data-active={activeSlide === index || undefined}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={nextSlide}
          aria-label={ar ? "الشريحة التالية" : "Next slide"}
        >
          <ChevronRight aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
