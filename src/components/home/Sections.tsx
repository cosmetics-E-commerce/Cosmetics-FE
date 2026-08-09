import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import {
  ShieldCheck,
  FlaskConical,
  Leaf,
  Rabbit,
  Recycle,
  ArrowRight,
  Plus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Reveal } from "@/components/brand/Reveal";
import { ImageReveal, Magnetic, ParallaxMedia, TextReveal } from "@/components/motion/Primitives";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/shop/ProductCard";
import { PolishedImage } from "@/components/ui/polished-image";
import { useCatalog, useCategories } from "@/lib/catalog";
import { concerns, formatPrice, images } from "@/lib/products";
import { useStore } from "@/lib/store";
import { apiErrorMessage, subscribeNewsletter } from "@/lib/api";
import { useI18n } from "@/lib/i18n";
import type { PublicCategoryResponse } from "@/lib/api";
import type { Product } from "@/lib/products";
import { toast } from "sonner";

export function Hero() {
  return (
    <section className="hero-intro relative bg-ivory">
      <div className="mx-auto grid max-w-[1560px] items-stretch gap-0 px-0 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="flex flex-col justify-center px-5 py-20 md:px-14 lg:py-32 xl:px-24">
          <div>
            <Reveal variant="fade" delay={160} duration={720} distance={0}>
              <p className="label-xs text-gold">Science-backed beauty</p>
            </Reveal>
            <TextReveal
              as="h1"
              className="display mt-8 text-[clamp(2.9rem,6.4vw,5.4rem)]"
              lines={["Healthy skin", "is beautiful skin."]}
              delay={230}
              staggerMs={105}
            />
            <Reveal delay={500} distance={20}>
              <p className="mt-8 max-w-md text-[0.95rem] leading-relaxed text-muted-foreground">
                Advanced skincare and carefully curated beauty essentials, selected for visible
                results and everyday confidence.
              </p>
            </Reveal>
            <Reveal delay={620} distance={16}>
              <div className="mt-12 flex flex-wrap items-center gap-8">
                <Magnetic>
                  <Button asChild variant="solid" size="pill">
                    <Link to="/shop">Discover the Collection</Link>
                  </Button>
                </Magnetic>
                <Link
                  to="/shop"
                  search={{ sort: "new" }}
                  className="nav-link label-xs inline-flex items-center gap-2 text-taupe"
                >
                  Explore New Arrivals
                  <ArrowRight strokeWidth={1} className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="relative min-h-[62vh] lg:min-h-[86vh]">
          <ImageReveal direction="right" className="absolute inset-0">
            <ParallaxMedia className="size-full" strength={22}>
              <img
                src={images.hero}
                alt="BIOREZA skincare essence and serum arranged on a travertine plinth"
                width={1408}
                height={1712}
                fetchPriority="high"
                decoding="sync"
                className="size-full object-cover"
              />
            </ParallaxMedia>
          </ImageReveal>
          <Reveal
            variant="scale"
            delay={780}
            className="absolute bottom-6 left-6 hidden bg-warm-white/90 px-6 py-5 backdrop-blur-sm md:block"
          >
            <p className="label-xs text-gold">The Renewal Collection</p>
            <p className="mt-2 font-serif text-xl">Renew Serum — Anti-Ageing</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const benefits = [
  { icon: ShieldCheck, label: "Dermatologically Tested" },
  { icon: FlaskConical, label: "Science-Backed Formulas" },
  { icon: Leaf, label: "Premium Ingredients" },
  { icon: Rabbit, label: "Cruelty Free" },
  { icon: Recycle, label: "Sustainable Beauty" },
];

export function Benefits() {
  return (
    <section className="border-y border-border bg-warm-white" aria-label="Brand promises">
      <Reveal
        as="ul"
        stagger
        staggerMs={70}
        distance={18}
        className="mx-auto grid max-w-[1560px] grid-cols-2 gap-y-8 px-5 py-10 md:grid-cols-3 md:px-10 lg:grid-cols-5"
      >
        {benefits.map(({ icon: Icon, label }) => (
          <li key={label} className="flex items-center gap-3">
            <Icon strokeWidth={0.9} className="size-6 shrink-0 text-gold" aria-hidden="true" />
            <span className="label-xs text-[0.6rem] text-foreground/80">{label}</span>
          </li>
        ))}
      </Reveal>
    </section>
  );
}

export function CategoryGrid({
  initialCategories,
}: {
  initialCategories?: PublicCategoryResponse[];
}) {
  const { locale } = useStore();
  const { t } = useI18n();
  const categoryQuery = useCategories(initialCategories);
  const categories = categoryQuery.data ?? [];
  return (
    <section className="mx-auto max-w-[1560px] px-5 py-24 md:px-10 lg:py-32">
      <Reveal stagger className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="label-xs text-gold">{t("home.categoryEyebrow")}</p>
          <h2 className="display mt-5 text-[clamp(2.1rem,4vw,3.4rem)]">
            {t("home.categoryTitle")}
          </h2>
        </div>
        <Link to="/shop" className="nav-link label-xs text-taupe">
          {t("common.viewAll")}
        </Link>
      </Reveal>

      <div className="mt-16 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category, i) => {
          const name = locale === "ar" ? category.nameAr : category.nameEn;
          const categoryImage =
            category.imageUrl?.trim() ||
            {
              skincare: images.catSkincare,
              makeup: images.catMakeup,
              haircare: images.catHaircare,
              fragrance: images.catFragrance,
            }[category.slug.toLowerCase()] ||
            images.collection;
          return (
            <Reveal key={category.id} delay={i * 90}>
              <Link
                to="/shop"
                search={{ category: category.slug }}
                className={`img-zoom group block transition-transform duration-500 hover:-translate-y-1 ${
                  i % 2 === 1 ? "lg:mt-16" : ""
                }`}
              >
                <ImageReveal direction={i % 3 === 1 ? "right" : i % 3 === 2 ? "left" : "up"}>
                  <img
                    src={categoryImage}
                    alt={name}
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                    className="aspect-[3/4] w-full bg-ivory object-cover"
                  />
                </ImageReveal>
                <div className="flex items-end justify-between gap-4 border-b border-border pb-4 pt-5 transition-colors duration-500 group-hover:border-gold">
                  <div>
                    <h3 className="font-serif text-2xl">{name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {category.productCount} {t("common.products")}
                    </p>
                  </div>
                  <ArrowRight
                    strokeWidth={1}
                    className="size-5 shrink-0 text-gold transition-transform duration-500 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

export function Featured({ initialProducts }: { initialProducts?: Product[] }) {
  const { locale } = useStore();
  const { t } = useI18n();
  const catalog = useCatalog(
    { limit: 4, sortBy: "createdAt", sortOrder: "desc" },
    locale,
    initialProducts,
  );
  return (
    <section className="bg-ivory">
      <div className="mx-auto max-w-[1560px] px-5 py-24 md:px-10 lg:py-32">
        <Reveal stagger className="max-w-xl">
          <p className="label-xs text-gold">{t("home.featured")}</p>
          <h2 className="display mt-5 text-[clamp(2.1rem,4vw,3.4rem)]">
            {t("home.featuredTitle")}
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-2 gap-x-6 gap-y-14 lg:grid-cols-4">
          {(catalog.data ?? []).map((p, i) => (
            <Reveal key={p.slug} delay={i * 80}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CollectionFeature() {
  return (
    <section className="mx-auto grid max-w-[1560px] items-center gap-0 lg:grid-cols-[1.15fr_0.85fr]">
      <div className="img-zoom relative min-h-[52vh] lg:min-h-[80vh]">
        <ImageReveal direction="left" className="absolute inset-0">
          <ParallaxMedia className="size-full" strength={34}>
            <img
              src={images.collection}
              alt="The Renewal Collection arranged on warm marble"
              loading="lazy"
              decoding="async"
              draggable={false}
              className="size-full object-cover"
            />
          </ParallaxMedia>
        </ImageReveal>
      </div>
      <Reveal stagger staggerMs={76} className="px-5 py-20 md:px-14 lg:px-20">
        <p className="label-xs text-gold">The Renewal Collection</p>
        <h2 className="display mt-6 text-[clamp(2.2rem,3.6vw,3.6rem)]">
          Restore your natural radiance.
        </h2>
        <div className="rule-gold my-8 max-w-[220px]" />
        <p className="max-w-md text-[0.95rem] leading-relaxed text-muted-foreground">
          A refined ritual developed to hydrate, soften, and visibly renew the complexion — three
          steps, eight weeks, measurable results.
        </p>
        <ul className="mt-8 space-y-3">
          {["Renew Serum", "Hydrating Cream", "Brightening Toner"].map((s) => (
            <li key={s} className="flex items-center gap-3 text-sm text-foreground/80">
              <span className="size-1 rounded-full bg-gold" aria-hidden="true" />
              {s}
            </li>
          ))}
        </ul>
        <Magnetic>
          <Button asChild variant="line" size="pill" className="mt-10">
            <Link to="/shop" search={{ category: "Skincare" }}>
              Explore the Collection
            </Link>
          </Button>
        </Magnetic>
      </Reveal>
    </section>
  );
}

export function Concerns() {
  return (
    <section className="mx-auto max-w-[1560px] px-5 py-24 md:px-10 lg:py-32">
      <Reveal stagger className="max-w-xl">
        <p className="label-xs text-gold">Shop by skin concern</p>
        <h2 className="display mt-5 text-[clamp(2.1rem,4vw,3.4rem)]">Begin with your skin.</h2>
      </Reveal>
      <ul className="mt-14 grid grid-cols-2 gap-px border border-border bg-border md:grid-cols-3 lg:grid-cols-6">
        {concerns.map((c, i) => (
          <li key={c.name}>
            <Reveal delay={i * 60}>
              <Link
                to="/shop"
                search={{ concern: c.name }}
                className="group flex h-full flex-col items-center gap-5 bg-warm-white px-4 py-12 text-center transition-colors duration-500 hover:bg-ivory"
              >
                <span
                  className="size-10 rounded-full border border-border transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundColor: c.token }}
                  aria-hidden="true"
                />
                <span className="label-xs text-[0.6rem]">{c.name}</span>
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function BestSellers({ initialProducts }: { initialProducts?: Product[] }) {
  const { add, locale, pendingVariants } = useStore();
  const { t } = useI18n();
  const catalog = useCatalog(
    { limit: 8, sortBy: "createdAt", sortOrder: "desc" },
    locale,
    initialProducts,
  );
  const list = [...(catalog.data ?? [])].sort(
    (a, b) => b.reviews - a.reviews || b.rating - a.rating,
  );
  const trackRef = useRef<HTMLUListElement>(null);

  const scrollTrack = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({
      left: dir * el.clientWidth * 0.75,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  };

  return (
    <section className="bg-ivory py-24 lg:py-32">
      <Reveal
        stagger
        className="mx-auto flex max-w-[1560px] flex-wrap items-end justify-between gap-6 px-5 md:px-10"
      >
        <div>
          <p className="label-xs text-gold">{t("home.best")}</p>
          <h2 className="display mt-5 text-[clamp(2.1rem,4vw,3.4rem)]">{t("home.bestTitle")}</h2>
        </div>
        <div className="flex items-center gap-6">
          <p className="label-xs text-taupe lg:hidden">Scroll →</p>
          <div className="hidden items-center gap-3 lg:flex">
            <button
              type="button"
              onClick={() => scrollTrack(-1)}
              aria-label="Scroll best sellers left"
              className="grid size-11 place-items-center border border-border text-taupe transition-colors duration-500 hover:border-gold hover:text-gold"
            >
              <ChevronLeft strokeWidth={1} className="size-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => scrollTrack(1)}
              aria-label="Scroll best sellers right"
              className="grid size-11 place-items-center border border-border text-taupe transition-colors duration-500 hover:border-gold hover:text-gold"
            >
              <ChevronRight strokeWidth={1} className="size-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </Reveal>

      <ul
        ref={trackRef}
        className="motion-carousel no-scrollbar mt-14 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-4 md:px-10 lg:edge-fade"
      >
        {list.map((p) => (
          <li key={p.slug} className="w-[72vw] shrink-0 snap-start sm:w-[42vw] lg:w-[23vw]">
            <div className="group relative">
              <a
                href={p.id ? `/product/${p.slug}` : `/shop?search=${encodeURIComponent(p.name)}`}
                className="img-zoom block bg-warm-white"
              >
                <PolishedImage
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  wrapperClassName="aspect-[4/5] w-full"
                  className="size-full object-cover"
                />
              </a>
              <button
                type="button"
                disabled={
                  !p.id || !p.sizes[0]?.id || pendingVariants.includes(p.sizes[0]?.id ?? "")
                }
                onClick={() => {
                  const variant = p.sizes[0];
                  if (!p.id || !variant?.id) return;
                  void add({
                    variantId: variant.id,
                    productId: p.id,
                    categoryId: p.categoryId,
                    brandId: p.brandId,
                    slug: p.slug,
                    name: p.name,
                    image: p.image,
                    size: variant.label,
                    price: variant.price,
                    qty: 1,
                  });
                }}
                aria-label={`Quick add ${p.name} to bag`}
                className="absolute bottom-4 end-4 grid size-11 place-items-center bg-warm-white/95 text-foreground opacity-0 transition-[opacity,transform,background-color,color] duration-200 hover:bg-gold hover:text-warm-white focus-visible:opacity-100 disabled:hidden group-hover:opacity-100"
              >
                <Plus strokeWidth={1} className="size-4" aria-hidden="true" />
              </button>
            </div>
            <div className="flex items-baseline justify-between gap-3 pt-5">
              <h3 className="font-serif text-xl">{p.name}</h3>
              <span className="font-serif text-lg text-gold">{formatPrice(p.price)}</span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{p.benefit}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function BrandStory() {
  return (
    <section className="mx-auto max-w-[1560px] px-5 py-24 md:px-10 lg:py-32">
      <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
        <ImageReveal direction="right" className="img-zoom aspect-[4/5] w-full lg:aspect-[5/6]">
          <ParallaxMedia className="size-full" strength={30}>
            <img
              src={images.storyLarge}
              alt="A woman in a cream silk robe beside a travertine vanity"
              loading="lazy"
              decoding="async"
              draggable={false}
              className="size-full object-cover"
            />
          </ParallaxMedia>
        </ImageReveal>

        <Reveal stagger delay={120} staggerMs={78} className="relative lg:-ml-24">
          <div className="bg-warm-white p-8 md:p-14">
            <p className="label-xs text-gold">Our philosophy</p>
            <h2 className="display mt-6 text-[clamp(2rem,3.4vw,3.2rem)]">
              Beauty grounded in science and refined by nature.
            </h2>
            <div className="rule-gold my-8 max-w-[200px]" />
            <p className="max-w-md text-[0.95rem] leading-relaxed text-muted-foreground">
              BIOREZA began with a simple conviction: efficacy and elegance belong together. Each
              formula is developed with dermatologists, tested over eight weeks, and finished in
              packaging designed to live beautifully on your vanity.
            </p>
            <Link to="/journal" className="nav-link label-xs mt-10 inline-flex items-center gap-2">
              Discover Our Story
              <ArrowRight strokeWidth={1} className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <ImageReveal direction="up" delay={180} className="mt-8 hidden w-56 lg:ml-14 lg:block">
            <img
              src={images.storyDetail}
              alt="Cream texture swatch on marble"
              loading="lazy"
              decoding="async"
              draggable={false}
              className="w-full object-cover"
            />
          </ImageReveal>
        </Reveal>
      </div>
    </section>
  );
}

export function Newsletter() {
  const { locale } = useStore();
  const { t } = useI18n();
  return (
    <section className="bg-ink">
      <div className="mx-auto max-w-3xl px-5 py-24 text-center md:px-10 lg:py-32">
        <Reveal stagger staggerMs={78}>
          <p className="label-xs text-gold">{t("newsletter.label")}</p>
          <h2 className="display mt-6 text-[clamp(2.1rem,4vw,3.4rem)] text-warm-white">
            {t("newsletter.title")}
          </h2>
          <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-warm-white/70">
            {t("newsletter.copy")}
          </p>
          <form
            className="mx-auto mt-12 flex max-w-md items-center gap-4 border-b border-gold/50 pb-3"
            onSubmit={async (e) => {
              e.preventDefault();
              const form = e.currentTarget;
              const email = new FormData(form).get("email");
              if (typeof email !== "string") return;
              try {
                await subscribeNewsletter(email, locale);
                form.reset();
                toast.success(t("newsletter.success"));
              } catch (error) {
                toast.error(apiErrorMessage(error));
              }
            }}
          >
            <label htmlFor="newsletter-email" className="sr-only">
              {t("newsletter.email")}
            </label>
            <input
              id="newsletter-email"
              name="email"
              type="email"
              required
              placeholder={t("newsletter.email")}
              className="w-full bg-transparent text-warm-white outline-none placeholder:text-warm-white/40"
            />
            <button
              type="submit"
              className="label-xs shrink-0 py-2 text-gold transition-colors duration-500 hover:text-warm-white"
            >
              {t("newsletter.subscribe")}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
