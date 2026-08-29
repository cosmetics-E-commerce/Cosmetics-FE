import { Link } from "@tanstack/react-router";
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type MouseEvent,
  type PointerEvent,
} from "react";

import { Reveal } from "@/components/motion/Primitives";
import { useMotionPreferences } from "@/components/motion/motion-context";
import { PolishedImage } from "@/components/ui/polished-image";
import type { PublicCategoryResponse } from "@/lib/api";
import { useCategories } from "@/lib/catalog";
import { images } from "@/lib/products";
import { useStore } from "@/lib/store";
import { getCategoryCoverflowState } from "./category-coverflow";

type CategoryShowcaseProps = {
  initialCategories?: PublicCategoryResponse[];
};

type EmblaCarouselType = NonNullable<UseEmblaCarouselType[1]>;

type CategoryCardStyle = CSSProperties & {
  "--category-card-opacity": number;
  "--category-card-rotation": string;
  "--category-card-scale": number;
  "--category-card-z": number;
};

type PointerOrigin = {
  id: number;
  x: number;
  y: number;
};

const CAROUSEL_DURATION = 24;

const fallbackImages: Record<string, string> = {
  skincare: images.catSkincare,
  haircare: images.catHaircare,
  fragrance: images.catFragrance,
};

function initialCategoryIndex(categoryCount: number) {
  return categoryCount > 2 ? Math.floor(categoryCount / 2) : 0;
}

export function CategoryShowcase({ initialCategories }: CategoryShowcaseProps) {
  const { locale } = useStore();
  const { reducedMotion } = useMotionPreferences();
  const categoryData = useCategories(initialCategories).data;
  const categories = useMemo(
    () => (categoryData ?? []).filter((category) => category.parentId == null),
    [categoryData],
  );
  const rtl = locale === "ar";
  const startIndex = initialCategoryIndex(categories.length);
  const [activeIndex, setActiveIndex] = useState(startIndex);
  const [canScrollPrevious, setCanScrollPrevious] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const activeIndexRef = useRef(startIndex);
  const pointerOrigin = useRef<PointerOrigin | null>(null);
  const suppressClick = useRef(false);
  const suppressClickTimer = useRef<number | null>(null);
  const [viewportRef, emblaApi] = useEmblaCarousel({
    align: "center",
    containScroll: false,
    direction: rtl ? "rtl" : "ltr",
    dragFree: false,
    duration: reducedMotion ? 20 : CAROUSEL_DURATION,
    skipSnaps: false,
    startIndex,
    watchDrag: categories.length > 1,
  });

  const labels = useMemo(
    () =>
      rtl
        ? {
            previous: "الفئة السابقة",
            next: "الفئة التالية",
            viewAll: "كل المنتجات",
            shopNow: "تسوقي الآن",
            product: "منتج",
            carousel: "فئات المنتجات",
            choose: "اختاري",
            imageFallback: "بيوريزا",
          }
        : {
            previous: "Previous category",
            next: "Next category",
            viewAll: "View all",
            shopNow: "Shop now",
            product: "product",
            carousel: "Product categories",
            choose: "Choose",
            imageFallback: "BIOREZA",
          },
    [rtl],
  );

  const setCarouselMoving = useCallback((moving: boolean) => {
    if (moving) carouselRef.current?.setAttribute("data-moving", "true");
    else carouselRef.current?.removeAttribute("data-moving");
  }, []);

  const warmAdjacentImages = useCallback((api: EmblaCarouselType) => {
    const selectedIndex = api.selectedScrollSnap();
    const slides = api.slideNodes();

    for (const index of [selectedIndex - 1, selectedIndex, selectedIndex + 1]) {
      const image = slides[index]?.querySelector("img");
      if (!image || image.complete) continue;
      image.loading = "eager";
      void image.decode?.().catch(() => undefined);
    }
  }, []);

  const syncCarouselState = useCallback((api: EmblaCarouselType) => {
    const selectedIndex = api.selectedScrollSnap();
    activeIndexRef.current = selectedIndex;
    setActiveIndex(selectedIndex);
    setCanScrollPrevious(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    const handleSelect = (api: EmblaCarouselType) => {
      setCarouselMoving(true);
      syncCarouselState(api);
      warmAdjacentImages(api);
    };
    const handleReInit = (api: EmblaCarouselType) => {
      setCarouselMoving(false);
      syncCarouselState(api);
      warmAdjacentImages(api);
    };
    const handlePointerDown = () => setCarouselMoving(true);
    const handleSettle = () => setCarouselMoving(false);
    const handleVisibilityChange = () => {
      if (!document.hidden) return;
      emblaApi.scrollTo(emblaApi.selectedScrollSnap(), true);
      setCarouselMoving(false);
    };

    handleReInit(emblaApi);
    emblaApi.on("select", handleSelect);
    emblaApi.on("reInit", handleReInit);
    emblaApi.on("pointerDown", handlePointerDown);
    emblaApi.on("settle", handleSettle);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      emblaApi.off("select", handleSelect);
      emblaApi.off("reInit", handleReInit);
      emblaApi.off("pointerDown", handlePointerDown);
      emblaApi.off("settle", handleSettle);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      setCarouselMoving(false);
    };
  }, [emblaApi, setCarouselMoving, syncCarouselState, warmAdjacentImages]);

  useEffect(() => {
    if (!categories.length) return;
    const safeIndex = Math.min(activeIndexRef.current, categories.length - 1);
    if (safeIndex === activeIndexRef.current) return;
    activeIndexRef.current = safeIndex;
    setActiveIndex(safeIndex);
    emblaApi?.scrollTo(safeIndex, true);
  }, [categories.length, emblaApi]);

  useEffect(
    () => () => {
      if (suppressClickTimer.current !== null) {
        window.clearTimeout(suppressClickTimer.current);
      }
    },
    [],
  );

  const movePrevious = useCallback(() => {
    if (!emblaApi) return;
    setCarouselMoving(true);
    emblaApi.scrollPrev(reducedMotion);
    if (reducedMotion) setCarouselMoving(false);
  }, [emblaApi, reducedMotion, setCarouselMoving]);
  const moveNext = useCallback(() => {
    if (!emblaApi) return;
    setCarouselMoving(true);
    emblaApi.scrollNext(reducedMotion);
    if (reducedMotion) setCarouselMoving(false);
  }, [emblaApi, reducedMotion, setCarouselMoving]);

  const moveTo = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      setCarouselMoving(true);
      emblaApi.scrollTo(index, reducedMotion);
      if (reducedMotion) setCarouselMoving(false);
    },
    [emblaApi, reducedMotion, setCarouselMoving],
  );

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (categories.length < 2) return;
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      if (rtl) moveNext();
      else movePrevious();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      if (rtl) movePrevious();
      else moveNext();
    }
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    pointerOrigin.current = { id: event.pointerId, x: event.clientX, y: event.clientY };
    suppressClick.current = false;
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const origin = pointerOrigin.current;
    if (!origin || origin.id !== event.pointerId) return;
    const xDistance = Math.abs(event.clientX - origin.x);
    const yDistance = Math.abs(event.clientY - origin.y);
    if (xDistance > 8 && xDistance > yDistance) suppressClick.current = true;
  };

  const onPointerEnd = (event: PointerEvent<HTMLDivElement>) => {
    if (pointerOrigin.current?.id === event.pointerId) pointerOrigin.current = null;
    if (suppressClickTimer.current !== null) window.clearTimeout(suppressClickTimer.current);
    suppressClickTimer.current = window.setTimeout(() => {
      suppressClick.current = false;
      suppressClickTimer.current = null;
    }, 0);
  };

  const onCategoryClick = (event: MouseEvent<HTMLAnchorElement>, index: number) => {
    if (suppressClick.current) {
      event.preventDefault();
      return;
    }
    if (index !== activeIndex) {
      event.preventDefault();
      moveTo(index);
    }
  };

  if (!categories.length) return null;

  const activeCategory = categories[activeIndex] ?? categories[0]!;
  const activeName = rtl ? activeCategory.nameAr : activeCategory.nameEn;
  const interactive = categories.length > 1;

  return (
    <section
      className="sf-categories sf-category-showcase"
      aria-labelledby="category-showcase-title"
      dir={rtl ? "rtl" : "ltr"}
      data-category-count={categories.length}
      data-enhanced={emblaApi ? "true" : undefined}
    >
      <div className="sf-shell sf-category-showcase__header">
        <Reveal className="sf-section-head sf-category-showcase__heading" stagger>
          <div className="sf-section-intro">
            <p className="sf-kicker">{rtl ? "تسوقي حسب الفئة" : "Shop by category"}</p>
            <h2 id="category-showcase-title" className="sf-display sf-section-title">
              {rtl ? "اختاري روتينك بسرعة." : "Choose your ritual faster."}
            </h2>
          </div>
          <Link to="/shop" className="sf-text-link sf-category-showcase__view-all">
            {labels.viewAll}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </Reveal>
      </div>

      <Reveal className="sf-category-showcase__stage" distance={16}>
        <div
          ref={carouselRef}
          className="sf-category-showcase__carousel"
          role="region"
          aria-roledescription="carousel"
          aria-label={labels.carousel}
          tabIndex={interactive ? 0 : undefined}
          onKeyDown={onKeyDown}
        >
          <div
            ref={viewportRef}
            className="sf-category-showcase__viewport"
            onPointerDownCapture={onPointerDown}
            onPointerMoveCapture={onPointerMove}
            onPointerUpCapture={onPointerEnd}
            onPointerCancelCapture={onPointerEnd}
          >
            <div className="sf-category-showcase__track">
              {categories.map((category, index) => {
                const state = getCategoryCoverflowState(index, activeIndex, rtl);
                const name = rtl ? category.nameAr : category.nameEn;
                const active = index === activeIndex;
                const image = categoryImage(category);
                const style: CategoryCardStyle = {
                  "--category-card-opacity": state.opacity,
                  "--category-card-rotation": `${state.rotation}deg`,
                  "--category-card-scale": state.scale,
                  "--category-card-z": state.zIndex,
                };

                return (
                  <div
                    key={category.id}
                    className="sf-category-showcase__slide"
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`${index + 1} / ${categories.length}: ${name}`}
                  >
                    <article
                      className="sf-category-showcase__card"
                      data-depth={state.depth}
                      data-active={active || undefined}
                      style={style}
                    >
                      <Link
                        to="/categories/$slug"
                        params={{ slug: category.slug }}
                        className="sf-category-showcase__link"
                        aria-current={active ? "true" : undefined}
                        aria-label={`${labels.shopNow}: ${name}`}
                        onClick={(event) => onCategoryClick(event, index)}
                      >
                        <PolishedImage
                          src={image}
                          alt={name}
                          width={760}
                          height={960}
                          loading="lazy"
                          fetchPriority={active ? "auto" : "low"}
                          decoding="async"
                          draggable={false}
                          sizes="(max-width: 639px) 80vw, (max-width: 1023px) 46vw, (max-width: 1439px) 29vw, 340px"
                          wrapperClassName="sf-category-showcase__image-shell"
                          className="sf-category-showcase__image"
                          fallback={
                            <span className="sf-category-showcase__fallback" aria-hidden="true">
                              <small>{labels.imageFallback}</small>
                            </span>
                          }
                        />
                        <span className="sf-category-showcase__scrim" aria-hidden="true" />
                        <span className="sf-category-showcase__copy">
                          <strong className="sf-category-showcase__name">{name}</strong>
                          <span className="sf-category-showcase__meta">
                            {category.aggregateProductCount ?? category.productCount}{" "}
                            {labels.product}
                            {!rtl && (category.aggregateProductCount ?? category.productCount) !== 1
                              ? "s"
                              : ""}
                          </span>
                          <span className="sf-category-showcase__cta">
                            {labels.shopNow}
                            <ArrowRight aria-hidden="true" />
                          </span>
                        </span>
                      </Link>
                    </article>
                  </div>
                );
              })}
            </div>
          </div>

          {interactive && (
            <div className="sf-category-showcase__navigation">
              <button
                type="button"
                className="sf-category-showcase__arrow"
                aria-label={labels.previous}
                disabled={!canScrollPrevious}
                onClick={movePrevious}
              >
                {rtl ? <ChevronRight aria-hidden="true" /> : <ChevronLeft aria-hidden="true" />}
              </button>

              <div className="sf-category-showcase__indicators" aria-label={labels.choose}>
                {categories.map((category, index) => {
                  const name = rtl ? category.nameAr : category.nameEn;
                  return (
                    <button
                      key={category.id}
                      type="button"
                      aria-label={`${labels.choose} ${name}`}
                      aria-current={index === activeIndex ? "true" : undefined}
                      data-active={index === activeIndex || undefined}
                      onClick={() => moveTo(index)}
                    />
                  );
                })}
              </div>

              <button
                type="button"
                className="sf-category-showcase__arrow"
                aria-label={labels.next}
                disabled={!canScrollNext}
                onClick={moveNext}
              >
                {rtl ? <ChevronLeft aria-hidden="true" /> : <ChevronRight aria-hidden="true" />}
              </button>
            </div>
          )}

          <p className="sr-only" aria-live="polite" aria-atomic="true">
            {activeIndex + 1} / {categories.length}: {activeName}
          </p>
        </div>
      </Reveal>

      <div className="sf-shell sf-category-showcase__mobile-footer">
        <Link to="/shop" className="sf-text-link">
          {labels.viewAll}
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}

function categoryImage(category: PublicCategoryResponse) {
  return (
    category.imageUrl?.trim() || fallbackImages[category.slug.toLowerCase()] || images.collection
  );
}
