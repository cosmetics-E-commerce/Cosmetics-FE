import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  FlaskConical,
  GripVertical,
  Grid2X2,
  Leaf,
  List,
  LoaderCircle,
  Rabbit,
  Recycle,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import { toast } from "sonner";

import { ProductCard } from "@/components/shop/ProductCard";
import { Button } from "@/components/ui/button";
import { PolishedImage } from "@/components/ui/polished-image";
import {
  ImageReveal,
  Magnetic,
  ParallaxMedia,
  Reveal,
  TextReveal,
} from "@/components/motion/Primitives";
import { useMotionPreferences } from "@/components/motion/motion-context";
import { apiErrorMessage, subscribeNewsletter, type PublicCategoryResponse } from "@/lib/api";
import { useCatalog, useCategories } from "@/lib/catalog";
import { useI18n } from "@/lib/i18n";
import { concerns, images, type Product } from "@/lib/products";
import { useStore } from "@/lib/store";

const heroSlides = [
  {
    id: "radiance",
    image: images.heroSlide1,
    position: "center center",
    eyebrow: {
      en: "Curated beauty",
      ar: "اختيارات جمال منتقاة",
    },
    title: {
      en: ["Skincare & Beauty", "Collection"],
      ar: ["مجموعة العناية", "والجمال"],
    },
    copy: {
      en: "Explore skincare, makeup, haircare, and fragrance with clear product details and current availability.",
      ar: "اكتشفي العناية بالبشرة والمكياج والشعر والعطور مع تفاصيل واضحة وحالة التوفر الحالية.",
    },
    cta: {
      en: "Shop Now",
      ar: "تسوقي الآن",
    },
    note: {
      en: "Daily skincare essentials",
      ar: "أساسيات العناية اليومية",
    },
  },
  {
    id: "serum",
    image: images.heroSlide2,
    position: "center center",
    eyebrow: {
      en: "Skincare essentials",
      ar: "أساسيات العناية بالبشرة",
    },
    title: {
      en: ["Glow Skin", "Every Day"],
      ar: ["بشرة مشرقة", "كل يوم"],
    },
    copy: {
      en: "Compare formulas, ingredients, prices, and options before choosing what fits your routine.",
      ar: "قارني التركيبات والمكونات والأسعار والخيارات قبل اختيار ما يناسب روتينك.",
    },
    cta: {
      en: "Explore Products",
      ar: "اكتشفي المنتجات",
    },
    note: {
      en: "Original products only",
      ar: "منتجات أصلية فقط",
    },
  },
  {
    id: "minimal",
    image: images.heroSlide3,
    position: "center center",
    eyebrow: {
      en: "Beauty with confidence",
      ar: "جمال بثقة",
    },
    title: {
      en: ["Beauty, Clearly", "Chosen"],
      ar: ["جمال مختار", "بوضوح"],
    },
    copy: {
      en: "A considered edit of skincare and beauty pieces for calm, polished routines.",
      ar: "اختيارات مدروسة من العناية والجمال لروتين هادئ وأنيق.",
    },
    cta: {
      en: "Discover More",
      ar: "اكتشفي المزيد",
    },
    note: {
      en: "Curated by BioReza",
      ar: "مختار من بيوريزا",
    },
  },
] as const;

export function Hero() {
  const { locale } = useStore();
  const { reducedMotion } = useMotionPreferences();
  const ar = locale === "ar";
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const active = heroSlides[activeSlide] ?? heroSlides[0];
  const goToSlide = (index: number) =>
    setActiveSlide((index + heroSlides.length) % heroSlides.length);
  const nextSlide = () => goToSlide(activeSlide + 1);
  const previousSlide = () => goToSlide(activeSlide - 1);

  useEffect(() => {
    if (isPaused || reducedMotion) return;
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 6200);
    return () => window.clearInterval(timer);
  }, [isPaused, reducedMotion]);

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
            data-active={activeSlide === index || undefined}
            style={{ "--hero-image-position": slide.position } as CSSProperties}
          >
            <ParallaxMedia className="size-full" strength={activeSlide === index ? 18 : 0}>
              <img
                src={slide.image}
                alt=""
                width={2880}
                height={1425}
                loading={index === 0 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : "low"}
                decoding="async"
                className="size-full object-cover"
              />
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
                <Link to="/shop">{active.cta[ar ? "ar" : "en"]}</Link>
              </Button>
            </Magnetic>
            <Link to="/offers" className="sf-text-link sf-text-link--light">
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

const benefits = [
  { icon: ShieldCheck, en: "Authenticated products", ar: "منتجات أصلية" },
  { icon: FlaskConical, en: "Clear ingredient details", ar: "مكونات واضحة" },
  { icon: Leaf, en: "Curated for your ritual", ar: "اختيارات لروتينك" },
  { icon: Rabbit, en: "Verified customer reviews", ar: "مراجعات موثقة" },
  { icon: Recycle, en: "Responsive customer care", ar: "خدمة عملاء سريعة" },
];

export function Benefits() {
  const { locale } = useStore();
  return (
    <section className="sf-proof" aria-labelledby="proof-title">
      <div className="sf-shell">
        <Reveal className="sf-section-intro sf-section-intro--center">
          <p className="sf-kicker">{locale === "ar" ? "لماذا بيوريزا؟" : "Why BIOREZA?"}</p>
          <h2 id="proof-title" className="sf-display sf-section-title">
            {locale === "ar" ? "الثقة جزء من روتينك." : "Confidence, built into the ritual."}
          </h2>
        </Reveal>
        <Reveal as="ul" stagger staggerMs={40} distance={14} className="sf-proof__list">
          {benefits.map(({ icon: Icon, en, ar }) => (
            <li key={en}>
              <Icon strokeWidth={1.1} aria-hidden="true" />
              <span>{locale === "ar" ? ar : en}</span>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

export function CategoryGrid({
  initialCategories,
}: {
  initialCategories?: PublicCategoryResponse[];
}) {
  const { locale } = useStore();
  const categories = useCategories(initialCategories).data ?? [];
  const ar = locale === "ar";
  const categoryTiles: Array<{
    id: string;
    slug: string | null;
    name: string;
    image: string;
    productCount: number;
  }> = categories.slice(0, 4).map((category) => ({
    id: category.id,
    slug: category.slug,
    name: ar ? category.nameAr : category.nameEn,
    image: categoryImage(category),
    productCount: category.productCount,
  }));

  if (categoryTiles.length < 4) {
    categoryTiles.push({
      id: "all-products",
      slug: null,
      name: ar ? "كل المنتجات" : "All beauty",
      image: images.collection,
      productCount: categories.reduce((total, category) => total + category.productCount, 0),
    });
  }

  return (
    <section className="sf-categories" aria-labelledby="category-grid-title">
      <div className="sf-shell">
        <Reveal className="sf-section-head sf-category-head" stagger>
          <div className="sf-section-intro">
            <p className="sf-kicker">{ar ? "تسوقي حسب الفئة" : "Shop by category"}</p>
            <h2 id="category-grid-title" className="sf-display sf-section-title">
              {ar ? "اختاري روتينك بسرعة." : "Choose your ritual faster."}
            </h2>
          </div>
          <Link to="/shop" className="sf-text-link">
            {ar ? "كل المنتجات" : "View all"}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </Reveal>
        <Reveal as="ul" stagger staggerMs={45} distance={18} className="sf-category-orbits">
          {categoryTiles.map((category) => (
            <li key={category.id} className="sf-category-orbit">
              <CategoryTileLink slug={category.slug} className="sf-category-orbit__link">
                <span className="sf-category-orbit__media">
                  <PolishedImage
                    src={category.image}
                    alt={category.name}
                    width={640}
                    height={640}
                    loading="lazy"
                    decoding="async"
                    sizes="(max-width: 640px) 42vw, (max-width: 900px) 31vw, 260px"
                    wrapperClassName="sf-category-orbit__image-shell"
                    className="sf-category-orbit__image"
                  />
                </span>
                <strong className="sf-category-orbit__title">{category.name}</strong>
                <small className="sf-category-orbit__count">
                  {category.productCount}{" "}
                  {ar ? "منتج" : category.productCount === 1 ? "product" : "products"}
                </small>
                <span className="sf-category-orbit__cta">
                  {ar ? "تسوقي الآن" : "Shop now"}
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </span>
              </CategoryTileLink>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function CategoryTileLink({
  slug,
  className,
  children,
}: {
  slug: string | null;
  className: string;
  children: ReactNode;
}) {
  return slug ? (
    <Link to="/categories/$slug" params={{ slug }} className={className}>
      {children}
    </Link>
  ) : (
    <Link to="/shop" className={className}>
      {children}
    </Link>
  );
}

export function Featured({ initialProducts }: { initialProducts?: Product[] }) {
  const { locale } = useStore();
  const products =
    useCatalog({ limit: 5, sortBy: "createdAt", sortOrder: "desc" }, locale, initialProducts)
      .data ?? [];
  const categories = useCategories().data ?? [];
  const ar = locale === "ar";
  const tabs = categories.slice(0, 4).map((category) => ({
    slug: category.slug,
    label: ar ? category.nameAr : category.nameEn,
  }));
  const arrivalBenefits = [
    {
      icon: ShieldCheck,
      title: ar ? "منتجات أصلية 100%" : "100% Original",
      copy: ar ? "نضمن لك الأصالة" : "We guarantee authenticity",
    },
    {
      icon: Truck,
      title: ar ? "توصيل سريع وآمن" : "Fast & Secure Delivery",
      copy: ar ? "داخل جميع محافظات مصر" : "Across all Egypt",
    },
    {
      icon: RotateCcw,
      title: ar ? "استرجاع سهل" : "Easy Returns",
      copy: ar ? "سياسة استرجاع خلال 14 يوم" : "14-day return policy",
    },
    {
      icon: CreditCard,
      title: ar ? "دفع آمن" : "Secure Payments",
      copy: ar ? "خيارات دفع متعددة وآمنة" : "Multiple safe payment options",
    },
  ];

  return (
    <section className="sf-products-section">
      <div className="sf-shell">
        <Reveal className="sf-arrivals-hero" stagger>
          <div className="sf-arrivals-hero__copy">
            <p className="sf-kicker">{ar ? "وصل حديثاً" : "New arrivals"}</p>
            <h2 className="sf-display sf-arrivals-hero__title">
              {ar ? "جديد في روتينك." : "New to the ritual."}
            </h2>
            <p className="sf-arrivals-hero__text">
              {ar
                ? "اكتشفي أحدث الإضافات المختارة بعناية لروتين جمال أكثر نعومة ووضوحاً."
                : "Discover the latest additions to our collection, handpicked for your beauty ritual and crafted for visible results."}
            </p>
            <Link to="/shop" search={{ sort: "newest" }} className="sf-arrivals-hero__cta">
              {ar ? "تسوقي الجديد" : "Shop new arrivals"}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="sf-arrivals-hero__media" aria-hidden="true">
            <img
              src={images.cream}
              alt=""
              width={900}
              height={1100}
              loading="lazy"
              decoding="async"
            />
          </div>
        </Reveal>

        <Reveal className="sf-arrivals-toolbar" stagger>
          <nav
            className="sf-arrivals-tabs"
            aria-label={ar ? "فئات المنتجات الجديدة" : "New arrival categories"}
          >
            <Link to="/shop" className="sf-arrivals-tab sf-arrivals-tab--active">
              {ar ? "الكل" : "All"}
            </Link>
            {tabs.map((tab) => (
              <Link
                key={tab.slug}
                to="/categories/$slug"
                params={{ slug: tab.slug }}
                className="sf-arrivals-tab"
              >
                {tab.label}
              </Link>
            ))}
          </nav>
          <div
            className="sf-arrivals-controls"
            aria-label={ar ? "عرض المنتجات" : "Product display"}
          >
            <span>{ar ? "ترتيب:" : "Sort by:"}</span>
            <Link to="/shop" search={{ sort: "newest" }} className="sf-arrivals-sort">
              {ar ? "الأحدث أولاً" : "Newest First"}
              <ChevronRight className="size-3.5" aria-hidden="true" />
            </Link>
            <Link
              to="/shop"
              search={{ view: "grid" }}
              className="sf-arrivals-view sf-arrivals-view--active"
              aria-label={ar ? "عرض شبكي" : "Grid view"}
            >
              <Grid2X2 className="size-4" aria-hidden="true" />
            </Link>
            <Link
              to="/shop"
              search={{ view: "list" }}
              className="sf-arrivals-view"
              aria-label={ar ? "عرض قائمة" : "List view"}
            >
              <List className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>

        <div className="sf-product-grid sf-product-grid--five">
          {products.map((product, index) => (
            <Reveal key={product.slug} delay={index * 55}>
              <ProductCard product={product} compact />
            </Reveal>
          ))}
        </div>

        <Reveal as="ul" className="sf-arrivals-benefits" stagger staggerMs={45}>
          {arrivalBenefits.map(({ icon: Icon, title, copy }) => (
            <li key={title}>
              <span>
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <div>
                <strong>{title}</strong>
                <small>{copy}</small>
              </div>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

export function CollectionFeature() {
  const { locale } = useStore();
  const ar = locale === "ar";
  return (
    <section className="sf-editorial-grid">
      <Reveal className="sf-editorial-card sf-editorial-card--copy" stagger>
        <p className="sf-kicker">{ar ? "اختيارات أكثر وضوحاً" : "Beauty, with context"}</p>
        <h2 className="sf-display sf-section-title">
          {ar
            ? "لا تختاري منتجاً فقط. اختاري ما يناسبك."
            : "Choose more than a product. Choose what fits."}
        </h2>
        <p className="sf-section-copy">
          {ar
            ? "قارني المكونات، الاستخدام، الملاءمة والمراجعات قبل أن تضيفي أي منتج إلى حقيبتك."
            : "Compare ingredients, suitability, directions, stock, and verified reviews before anything reaches your bag."}
        </p>
        <Button asChild variant="solid" size="pill">
          <Link to="/shop">{ar ? "اكتشفي المنتجات" : "Explore products"}</Link>
        </Button>
      </Reveal>
      <ImageReveal direction="up" className="sf-editorial-card sf-editorial-card--image">
        <img
          src={images.storyLarge}
          alt=""
          width={1100}
          height={1300}
          loading="lazy"
          decoding="async"
          className="size-full object-cover"
        />
      </ImageReveal>
      <Reveal className="sf-editorial-card sf-editorial-card--detail">
        <img
          src={images.storyDetail}
          alt=""
          width={900}
          height={900}
          loading="lazy"
          decoding="async"
          className="size-full object-cover"
        />
        <div>
          <p className="sf-kicker">{ar ? "الجمال في التفاصيل" : "Texture, clearly seen"}</p>
          <p>
            {ar
              ? "معلومات عملية، بدون ادعاءات غامضة."
              : "Useful product context, without vague claims."}
          </p>
        </div>
      </Reveal>
    </section>
  );
}

export function Concerns() {
  const { locale } = useStore();
  const { finePointer, reducedMotion } = useMotionPreferences();
  const ar = locale === "ar";
  const sectionRef = useRef<HTMLElement>(null);
  const pointerFrameRef = useRef<number | null>(null);
  const arabicConcerns: Record<string, string> = {
    Hydration: "الترطيب",
    Brightening: "الإشراقة",
    "Sensitive Skin": "البشرة الحساسة",
    "Anti-Aging": "مقاومة علامات التقدم",
    "Night Repair": "العناية الليلية",
    "Oily Skin": "البشرة الدهنية",
  };
  const concernIds: Record<string, string> = {
    Hydration: "hydration",
    Brightening: "brightening",
    "Sensitive Skin": "sensitive-skin",
    "Anti-Aging": "anti-aging",
    "Night Repair": "night-repair",
    "Oily Skin": "oily-skin",
  };
  const headlineLines = ar
    ? ["روتين يبدأ", "من بشرتك."]
    : ["A ritual that", "begins with", "your skin."];

  const handlePointerMove = useCallback(
    (event: ReactPointerEvent<HTMLElement>) => {
      if (!finePointer || reducedMotion || pointerFrameRef.current !== null) return;
      const clientX = event.clientX;
      const clientY = event.clientY;
      pointerFrameRef.current = window.requestAnimationFrame(() => {
        const section = sectionRef.current;
        if (section) {
          const bounds = section.getBoundingClientRect();
          section.style.setProperty("--concern-pointer-x", `${clientX - bounds.left}px`);
          section.style.setProperty("--concern-pointer-y", `${clientY - bounds.top}px`);
        }
        pointerFrameRef.current = null;
      });
    },
    [finePointer, reducedMotion],
  );

  useEffect(
    () => () => {
      if (pointerFrameRef.current !== null) {
        window.cancelAnimationFrame(pointerFrameRef.current);
      }
    },
    [],
  );

  return (
    <section ref={sectionRef} className="sf-concerns" onPointerMove={handlePointerMove}>
      <div className="sf-concerns__atmosphere" aria-hidden="true">
        {concerns.map((concern) => (
          <span
            key={concern.name}
            data-concern={concernIds[concern.name]}
            style={{ "--concern-color": concern.token } as CSSProperties}
          />
        ))}
      </div>
      <div className="sf-shell sf-concerns__layout">
        <Reveal className="sf-section-intro sf-concerns__intro" duration={760} distance={22}>
          <p className="sf-kicker sf-concerns__kicker">
            <span>{ar ? "تسوقي حسب احتياجك" : "Shop by concern"}</span>
          </p>
          <TextReveal
            className="sf-display sf-section-title sf-concerns__title"
            lines={headlineLines}
            delay={90}
            staggerMs={105}
          />
        </Reveal>
        <Reveal
          as="ul"
          stagger
          staggerMs={72}
          delay={150}
          duration={700}
          distance={18}
          className="sf-concern-list"
        >
          {concerns.map((concern) => (
            <li
              key={concern.name}
              data-concern={concernIds[concern.name]}
              style={{ "--concern-color": concern.token } as CSSProperties}
            >
              <Link to="/shop" search={{ concern: concern.name }}>
                <span className="sf-concern-list__dot" aria-hidden="true" />
                <span className="sf-concern-list__label">
                  {ar ? arabicConcerns[concern.name] : concern.name}
                </span>
                <span className="sf-concern-list__arrow" aria-hidden="true">
                  <ArrowRight className="sf-concern-list__arrow-primary" />
                  <ArrowRight className="sf-concern-list__arrow-echo" />
                </span>
              </Link>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

export function BestSellers({ initialProducts }: { initialProducts?: Product[] }) {
  const { locale } = useStore();
  const products =
    useCatalog({ limit: 8, sortBy: "createdAt", sortOrder: "desc" }, locale, initialProducts)
      .data ?? [];
  const list = [...products].sort((a, b) => b.reviews - a.reviews || b.rating - a.rating);
  const trackRef = useRef<HTMLUListElement>(null);
  const ar = locale === "ar";
  const scroll = (direction: 1 | -1) =>
    trackRef.current?.scrollBy({
      left: direction * trackRef.current.clientWidth * 0.78,
      behavior: "smooth",
    });

  return (
    <section className="sf-bestsellers">
      <div className="sf-shell">
        <Reveal className="sf-section-head" stagger>
          <div className="sf-section-intro">
            <p className="sf-kicker">{ar ? "الأكثر مبيعاً" : "Most loved"}</p>
            <h2 className="sf-display sf-section-title">
              {ar ? "اختيارات العملاء." : "The customer edit."}
            </h2>
          </div>
          <div className="sf-rail-controls">
            <button type="button" onClick={() => scroll(-1)} aria-label="Previous products">
              <ChevronLeft />
            </button>
            <button type="button" onClick={() => scroll(1)} aria-label="Next products">
              <ChevronRight />
            </button>
          </div>
        </Reveal>
        <ul ref={trackRef} className="sf-product-rail no-scrollbar">
          {list.map((product) => (
            <li key={product.slug}>
              <ProductCard product={product} compact />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function BrandStory() {
  const { locale } = useStore();
  const ar = locale === "ar";
  return (
    <section className="sf-story">
      <div className="sf-shell sf-story__layout">
        <ImageReveal direction="left" className="sf-story__image">
          <img
            src={images.collection}
            alt=""
            width={1600}
            height={1104}
            loading="lazy"
            decoding="async"
            className="size-full object-cover"
          />
        </ImageReveal>
        <Reveal stagger className="sf-story__copy">
          <p className="sf-kicker">{ar ? "اختيار بيوريزا" : "The BIOREZA standard"}</p>
          <h2 className="sf-display sf-section-title">
            {ar
              ? "الجمال أسهل عندما تكون التفاصيل واضحة."
              : "Beauty is easier when the details are clear."}
          </h2>
          <p className="sf-section-copy">
            {ar
              ? "نعرض ما يمكنكِ معرفته فعلاً: السعر الحالي، المخزون، المكونات، طريقة الاستخدام وتجارب العملاء الموثقة."
              : "We show what you can actually use: current price, live availability, ingredients, directions, and verified customer experience."}
          </p>
          <div className="sf-story__facts">
            <div>
              <strong>01</strong>
              <span>{ar ? "بيانات مباشرة" : "Live catalog data"}</span>
            </div>
            <div>
              <strong>02</strong>
              <span>{ar ? "عروض تلقائية" : "Automatic offers"}</span>
            </div>
            <div>
              <strong>03</strong>
              <span>{ar ? "دعم واضح" : "Clear support"}</span>
            </div>
          </div>
          <Link to="/journal" className="sf-text-link">
            {ar ? "تعرفي على بيوريزا" : "Discover our approach"}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

export function BeautyDifference() {
  const { locale } = useStore();
  const ar = locale === "ar";
  const frameRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(38);
  const [dragging, setDragging] = useState(false);

  const clampPosition = useCallback((value: number) => Math.min(92, Math.max(8, value)), []);

  const updateFromClientX = useCallback(
    (clientX: number) => {
      const frame = frameRef.current;
      if (!frame) return;
      const rect = frame.getBoundingClientRect();
      const next = ((clientX - rect.left) / rect.width) * 100;
      setPosition(clampPosition(next));
    },
    [clampPosition],
  );

  const nudge = (amount: number) => {
    setPosition((current) => clampPosition(current + amount));
  };

  return (
    <section className="sf-beauty-difference" aria-labelledby="beauty-difference-title">
      <div className="sf-shell">
        <Reveal className="sf-beauty-difference__head" stagger>
          <div className="sf-section-intro">
            <p className="sf-kicker">{ar ? "قبل وبعد" : "Visible comparison"}</p>
            <h2 id="beauty-difference-title" className="sf-display sf-section-title">
              {ar ? "شاهدي الفرق في لمسة واحدة." : "See the beauty difference."}
            </h2>
            <p className="sf-section-copy">
              {ar
                ? "حرّكي الخط يميناً أو يساراً لمقارنة ملمس البشرة قبل العناية وبعدها."
                : "Drag the handle left or right to compare the skin finish before and after care."}
            </p>
          </div>
          <Magnetic>
            <Button asChild variant="solid" size="pill">
              <Link to="/shop">
                {ar ? "اكتشفي الروتين" : "Explore now"}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
          </Magnetic>
        </Reveal>

        <Reveal className="sf-beauty-difference__stage">
          <div
            ref={frameRef}
            className="sf-comparison"
            data-dragging={dragging || undefined}
            style={{ "--comparison-position": `${position}%` } as CSSProperties}
            onPointerDown={(event) => {
              setDragging(true);
              event.currentTarget.setPointerCapture(event.pointerId);
              updateFromClientX(event.clientX);
            }}
            onPointerMove={(event) => {
              if (!dragging) return;
              updateFromClientX(event.clientX);
            }}
            onPointerUp={(event) => {
              setDragging(false);
              event.currentTarget.releasePointerCapture(event.pointerId);
            }}
            onPointerCancel={() => setDragging(false)}
          >
            <img
              src={images.beautyDifferenceBefore}
              alt={ar ? "البشرة قبل العناية" : "Skin before care"}
              loading="lazy"
              decoding="async"
              width={1920}
              height={940}
              className="sf-comparison__image"
              draggable={false}
            />
            <img
              src={images.beautyDifferenceAfter}
              alt={ar ? "البشرة بعد العناية" : "Skin after care"}
              loading="lazy"
              decoding="async"
              width={1920}
              height={940}
              className="sf-comparison__image sf-comparison__image--after"
              draggable={false}
            />

            <span className="sf-comparison__label sf-comparison__label--before">
              {ar ? "قبل" : "Before"}
            </span>
            <span className="sf-comparison__label sf-comparison__label--after">
              {ar ? "بعد" : "After"}
            </span>

            <button
              type="button"
              className="sf-comparison__handle"
              role="slider"
              aria-label={ar ? "مقارنة قبل وبعد" : "Before and after comparison"}
              aria-valuemin={8}
              aria-valuemax={92}
              aria-valuenow={Math.round(position)}
              onKeyDown={(event) => {
                if (event.key === "ArrowLeft") {
                  event.preventDefault();
                  nudge(-4);
                }
                if (event.key === "ArrowRight") {
                  event.preventDefault();
                  nudge(4);
                }
                if (event.key === "Home") {
                  event.preventDefault();
                  setPosition(8);
                }
                if (event.key === "End") {
                  event.preventDefault();
                  setPosition(92);
                }
              }}
            >
              <span aria-hidden="true">
                <GripVertical className="size-5" />
              </span>
            </button>
          </div>
          <div className="sf-beauty-difference__caption" aria-hidden="true">
            <Sparkles className="size-4" />
            <span>{ar ? "اسحبي الخط للمقارنة" : "Drag to compare"}</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Newsletter() {
  const { locale } = useStore();
  const { t } = useI18n();
  const [subscribing, setSubscribing] = useState(false);
  return (
    <section className="sf-newsletter">
      <div className="sf-shell sf-newsletter__layout">
        <Reveal stagger className="sf-section-intro">
          <p className="sf-kicker sf-kicker--light">{t("newsletter.label")}</p>
          <h2 className="sf-display sf-section-title">
            {locale === "ar" ? "الجديد، عندما يستحق الوصول." : "Only the news worth opening."}
          </h2>
          <p>{t("newsletter.copy")}</p>
        </Reveal>
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            if (subscribing) return;
            const form = event.currentTarget;
            const email = new FormData(form).get("email");
            if (typeof email !== "string") return;
            setSubscribing(true);
            try {
              await subscribeNewsletter(email, locale);
              form.reset();
              toast.success(t("newsletter.success"));
            } catch (error) {
              toast.error(apiErrorMessage(error, locale));
            } finally {
              setSubscribing(false);
            }
          }}
        >
          <label htmlFor="home-newsletter-email" className="sr-only">
            {t("newsletter.email")}
          </label>
          <input
            id="home-newsletter-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            inputMode="email"
            placeholder={t("newsletter.email")}
          />
          <button type="submit" disabled={subscribing} aria-busy={subscribing || undefined}>
            {t("newsletter.subscribe")}
            {subscribing ? (
              <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
            ) : (
              <ArrowRight className="size-4" aria-hidden="true" />
            )}
          </button>
        </form>
      </div>
    </section>
  );
}

function categoryImage(category: PublicCategoryResponse) {
  return (
    category.imageUrl?.trim() ||
    {
      skincare: images.catSkincare,
      makeup: images.catMakeup,
      haircare: images.catHaircare,
      fragrance: images.catFragrance,
    }[category.slug.toLowerCase()] ||
    images.collection
  );
}
