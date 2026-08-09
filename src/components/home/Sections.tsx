import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  FlaskConical,
  Leaf,
  LoaderCircle,
  Rabbit,
  Recycle,
  ShieldCheck,
} from "lucide-react";
import { useRef, useState } from "react";
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
import { apiErrorMessage, subscribeNewsletter, type PublicCategoryResponse } from "@/lib/api";
import { useCatalog, useCategories } from "@/lib/catalog";
import { useI18n } from "@/lib/i18n";
import { concerns, images, type Product } from "@/lib/products";
import { useStore } from "@/lib/store";

export function Hero() {
  const { locale } = useStore();
  const ar = locale === "ar";

  return (
    <section
      className="sf-hero"
      aria-label={ar ? "واجهة متجر بيوريزا" : "BIOREZA storefront introduction"}
    >
      <ImageReveal direction="right" className="sf-hero__media">
        <ParallaxMedia className="size-full" strength={22}>
          <img
            src={images.hero}
            alt={
              ar ? "مجموعة عناية بالبشرة على منصة حجرية" : "Skincare arranged on a mineral plinth"
            }
            width={1408}
            height={1712}
            fetchPriority="high"
            decoding="sync"
            className="size-full object-cover"
          />
        </ParallaxMedia>
      </ImageReveal>

      <div className="sf-hero__veil" aria-hidden="true" />
      <div className="sf-shell sf-hero__content">
        <Reveal stagger staggerMs={50} distance={24} className="sf-hero__copy">
          <p className="sf-kicker sf-kicker--light">
            {ar ? "طقوس يومية، مختارة بعناية" : "Considered beauty for every day"}
          </p>
          <TextReveal
            as="h1"
            className="sf-display sf-hero__title"
            lines={ar ? ["جمالك الحقيقي", "بخطوات أوضح"] : ["Your best skin.", "A clearer ritual."]}
            delay={120}
          />
          <p className="sf-hero__lede">
            {ar
              ? "منتجات أصلية، مكونات واضحة، وأسعار ومخزون محدثان مباشرة من متجر بيوريزا."
              : "Authentic beauty, transparent ingredients, and live pricing selected for the way you actually shop."}
          </p>
          <div className="sf-hero__actions">
            <Magnetic>
              <Button asChild variant="solid" size="pill">
                <Link to="/shop">{ar ? "تسوقي المجموعة" : "Shop the collection"}</Link>
              </Button>
            </Magnetic>
            <Link to="/offers" className="sf-text-link sf-text-link--light">
              {ar ? "شاهدي العروض الحالية" : "View current offers"}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
      </div>

      <div className="sf-hero__note">
        <span>01</span>
        <p>{ar ? "توصيل إلى جميع أنحاء مصر" : "Delivery across Egypt"}</p>
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
  }> = categories.slice(0, 5).map((category) => ({
    id: category.id,
    slug: category.slug,
    name: ar ? category.nameAr : category.nameEn,
    image: categoryImage(category),
    productCount: category.productCount,
  }));

  if (categoryTiles.length < 5) {
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
        <h2 id="category-grid-title" className="sr-only">
          {ar ? "تسوقي حسب الفئة" : "Shop by category"}
        </h2>
        <Reveal as="ul" stagger staggerMs={45} distance={18} className="sf-category-orbits">
          {categoryTiles.map((category) => (
            <li key={category.id} className="sf-category-orbit">
              <Link
                to="/shop"
                search={category.slug ? { category: category.slug } : {}}
                className="sf-category-orbit__link"
              >
                <span className="sf-category-orbit__media">
                  <PolishedImage
                    src={category.image}
                    alt=""
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
              </Link>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

export function Featured({ initialProducts }: { initialProducts?: Product[] }) {
  const { locale } = useStore();
  const products =
    useCatalog({ limit: 5, sortBy: "createdAt", sortOrder: "desc" }, locale, initialProducts)
      .data ?? [];
  const ar = locale === "ar";

  return (
    <section className="sf-products-section">
      <div className="sf-shell">
        <Reveal className="sf-section-head" stagger>
          <div className="sf-section-intro">
            <p className="sf-kicker">{ar ? "وصل حديثاً" : "New arrivals"}</p>
            <h2 className="sf-display sf-section-title">
              {ar ? "جديد في روتينك." : "New to the ritual."}
            </h2>
          </div>
          <Link to="/shop" className="sf-text-link">
            {ar ? "تسوقي الجديد" : "Shop new arrivals"}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </Reveal>
        <div className="sf-product-grid sf-product-grid--five">
          {products.map((product, index) => (
            <Reveal key={product.slug} delay={index * 55}>
              <ProductCard product={product} compact />
            </Reveal>
          ))}
        </div>
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
        <img src={images.storyLarge} alt="" loading="lazy" className="size-full object-cover" />
      </ImageReveal>
      <Reveal className="sf-editorial-card sf-editorial-card--detail">
        <img src={images.storyDetail} alt="" loading="lazy" className="size-full object-cover" />
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
  const ar = locale === "ar";
  const arabicConcerns: Record<string, string> = {
    Hydration: "الترطيب",
    Brightening: "الإشراقة",
    "Sensitive Skin": "البشرة الحساسة",
    "Anti-Aging": "مقاومة علامات التقدم",
    "Night Repair": "العناية الليلية",
    "Oily Skin": "البشرة الدهنية",
  };

  return (
    <section className="sf-concerns">
      <div className="sf-shell sf-concerns__layout">
        <Reveal className="sf-section-intro">
          <p className="sf-kicker">{ar ? "تسوقي حسب احتياجك" : "Shop by concern"}</p>
          <h2 className="sf-display sf-section-title">
            {ar ? "روتين يبدأ من بشرتك." : "A ritual that begins with your skin."}
          </h2>
        </Reveal>
        <Reveal as="ul" stagger className="sf-concern-list">
          {concerns.map((concern) => (
            <li key={concern.name}>
              <Link to="/shop" search={{ concern: concern.name }}>
                <i style={{ backgroundColor: concern.token }} aria-hidden="true" />
                <span>{ar ? arabicConcerns[concern.name] : concern.name}</span>
                <ArrowRight aria-hidden="true" />
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
          <img src={images.collection} alt="" loading="lazy" className="size-full object-cover" />
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
