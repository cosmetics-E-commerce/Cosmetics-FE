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
import { Stars } from "@/components/brand/Stars";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/shop/ProductCard";
import { PolishedImage } from "@/components/ui/polished-image";
import { useCatalog } from "@/lib/catalog";
import {
  categories,
  concerns,
  formatPrice,
  images,
  journal,
  products,
  testimonials,
} from "@/lib/products";
import { useStore } from "@/lib/store";
import { toast } from "sonner";

export function Hero() {
  return (
    <section className="relative bg-ivory">
      <div className="mx-auto grid max-w-[1560px] items-stretch gap-0 px-0 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="flex flex-col justify-center px-5 py-20 md:px-14 lg:py-32 xl:px-24">
          <Reveal>
            <p className="label-xs text-gold">Science-backed beauty</p>
            <h1 className="display mt-8 text-[clamp(2.9rem,6.4vw,5.4rem)]">
              Healthy skin
              <br />
              is beautiful skin.
            </h1>
            <p className="mt-8 max-w-md text-[0.95rem] leading-relaxed text-muted-foreground">
              Advanced skincare and carefully curated beauty essentials, selected for visible
              results and everyday confidence.
            </p>
            <div className="mt-12 flex flex-wrap items-center gap-8">
              <Button asChild variant="solid" size="pill">
                <Link to="/shop">Discover the Collection</Link>
              </Button>
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

        <div className="relative min-h-[62vh] lg:min-h-[86vh]">
          <img
            src={images.hero}
            alt="BIOREZA skincare essence and serum arranged on a travertine plinth"
            width={1408}
            height={1712}
            fetchPriority="high"
            decoding="sync"
            className="absolute inset-0 size-full object-cover motion-safe:kenburns"
          />
          <div className="absolute bottom-6 left-6 hidden bg-warm-white/90 px-6 py-5 backdrop-blur-sm md:block">
            <p className="label-xs text-gold">The Renewal Collection</p>
            <p className="mt-2 font-serif text-xl">Renew Serum — Anti-Ageing</p>
          </div>
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
      <ul className="mx-auto grid max-w-[1560px] grid-cols-2 gap-y-8 px-5 py-10 md:grid-cols-3 md:px-10 lg:grid-cols-5">
        {benefits.map(({ icon: Icon, label }) => (
          <li key={label} className="flex items-center gap-3">
            <Icon strokeWidth={0.9} className="size-6 shrink-0 text-gold" aria-hidden="true" />
            <span className="label-xs text-[0.6rem] text-foreground/80">{label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function CategoryGrid() {
  return (
    <section className="mx-auto max-w-[1560px] px-5 py-24 md:px-10 lg:py-32">
      <Reveal className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="label-xs text-gold">Shop by category</p>
          <h2 className="display mt-5 text-[clamp(2.1rem,4vw,3.4rem)]">A considered edit.</h2>
        </div>
        <Link to="/shop" className="nav-link label-xs text-taupe">
          View all products
        </Link>
      </Reveal>

      <div className="mt-16 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((c, i) => (
          <Reveal key={c.name} delay={i * 90}>
            <Link
              to="/shop"
              search={{ category: c.name }}
              className={`img-zoom group block transition-transform duration-500 hover:-translate-y-1 ${
                i % 2 === 1 ? "lg:mt-16" : ""
              }`}
            >
              <img
                src={c.image}
                alt={c.name}
                loading="lazy"
                decoding="async"
                draggable={false}
                className="aspect-[3/4] w-full bg-ivory object-cover"
              />
              <div className="flex items-end justify-between gap-4 border-b border-border pb-4 pt-5 transition-colors duration-500 group-hover:border-gold">
                <div>
                  <h3 className="font-serif text-2xl">{c.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{c.copy}</p>
                </div>
                <ArrowRight
                  strokeWidth={1}
                  className="size-5 shrink-0 text-gold transition-transform duration-500 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Featured() {
  return (
    <section className="bg-ivory">
      <div className="mx-auto max-w-[1560px] px-5 py-24 md:px-10 lg:py-32">
        <Reveal className="max-w-xl">
          <p className="label-xs text-gold">Featured</p>
          <h2 className="display mt-5 text-[clamp(2.1rem,4vw,3.4rem)]">
            The essentials our clients return to.
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-2 gap-x-6 gap-y-14 lg:grid-cols-4">
          {products.slice(0, 4).map((p, i) => (
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
        <img
          src={images.collection}
          alt="The Renewal Collection arranged on warm marble"
          loading="lazy"
          decoding="async"
          draggable={false}
          className="absolute inset-0 size-full object-cover"
        />
      </div>
      <Reveal className="px-5 py-20 md:px-14 lg:px-20">
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
        <Button asChild variant="line" size="pill" className="mt-10">
          <Link to="/shop" search={{ category: "Skincare" }}>
            Explore the Collection
          </Link>
        </Button>
      </Reveal>
    </section>
  );
}

export function Concerns() {
  return (
    <section className="mx-auto max-w-[1560px] px-5 py-24 md:px-10 lg:py-32">
      <Reveal className="max-w-xl">
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

export function BestSellers() {
  const { add, locale, pendingVariants } = useStore();
  const catalog = useCatalog({ limit: 8, sortBy: "createdAt", sortOrder: "desc" }, locale);
  const list = catalog.data?.length
    ? catalog.data
    : [...products].sort((a, b) => b.rating - a.rating);
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
      <div className="mx-auto flex max-w-[1560px] flex-wrap items-end justify-between gap-6 px-5 md:px-10">
        <div>
          <p className="label-xs text-gold">Best sellers</p>
          <h2 className="display mt-5 text-[clamp(2.1rem,4vw,3.4rem)]">Quietly loved.</h2>
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
      </div>

      <ul
        ref={trackRef}
        className="no-scrollbar mt-14 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-4 md:px-10 lg:edge-fade"
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
        <Reveal className="img-zoom">
          <img
            src={images.storyLarge}
            alt="A woman in a cream silk robe beside a travertine vanity"
            loading="lazy"
            decoding="async"
            draggable={false}
            className="aspect-[4/5] w-full object-cover lg:aspect-[5/6]"
          />
        </Reveal>

        <Reveal delay={120} className="relative lg:-ml-24">
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
          <img
            src={images.storyDetail}
            alt="Cream texture swatch on marble"
            loading="lazy"
            decoding="async"
            draggable={false}
            className="mt-8 hidden w-56 object-cover lg:ml-14 lg:block"
          />
        </Reveal>
      </div>
    </section>
  );
}

export function Journal() {
  return (
    <section className="border-t border-border bg-warm-white">
      <div className="mx-auto max-w-[1560px] px-5 py-24 md:px-10 lg:py-32">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="label-xs text-gold">Beauty journal</p>
            <h2 className="display mt-5 text-[clamp(2.1rem,4vw,3.4rem)]">Rituals & knowledge.</h2>
          </div>
          <Link to="/journal" className="nav-link label-xs text-taupe">
            All articles
          </Link>
        </Reveal>

        <div className="mt-16 grid gap-x-8 gap-y-14 md:grid-cols-3">
          {journal.map((a, i) => (
            <Reveal key={a.title} delay={i * 90} as="article">
              <Link to="/journal" className="img-zoom group block">
                <img
                  src={a.image}
                  alt={a.title}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  className="aspect-[4/3] w-full bg-ivory object-cover"
                />
              </Link>
              <p className="label-xs mt-6 text-gold">{a.category}</p>
              <h3 className="mt-3 font-serif text-2xl leading-tight">
                <Link to="/journal" className="hover:text-gold">
                  {a.title}
                </Link>
              </h3>
              <p className="mt-3 text-sm text-muted-foreground">{a.read}</p>
              <Link to="/journal" className="nav-link label-xs mt-5 inline-block">
                Read Article
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Testimonials() {
  return (
    <section className="bg-ivory">
      <div className="mx-auto max-w-[1560px] px-5 py-24 md:px-10 lg:py-32">
        <Reveal className="text-center">
          <p className="label-xs text-gold">In their words</p>
        </Reveal>
        <div className="mt-16 grid gap-16 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 100} className="text-center">
              <Stars value={5} size={13} />
              <blockquote className="mt-6 font-serif text-[1.6rem] leading-snug">
                “{t.quote}”
              </blockquote>
              <p className="label-xs mt-8 text-taupe">
                {t.name} — {t.place}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Gallery() {
  const shots = [
    images.collection,
    images.catMakeup,
    images.storyDetail,
    images.catFragrance,
    images.serum,
    images.catHaircare,
  ];
  return (
    <section className="mx-auto max-w-[1560px] px-5 py-24 md:px-10 lg:py-32">
      <Reveal className="text-center">
        <p className="label-xs text-gold">@bioreza.cosmetics</p>
        <h2 className="display mt-5 text-[clamp(2.1rem,4vw,3.4rem)]">The BIOREZA Edit</h2>
      </Reveal>
      <ul className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
        {shots.map((src, i) => (
          <li key={i} className="img-zoom">
            <a href="#" aria-label="View post on Instagram">
              <img
                src={src}
                alt=""
                loading="lazy"
                decoding="async"
                draggable={false}
                className="aspect-square w-full bg-ivory object-cover"
              />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Newsletter() {
  return (
    <section className="bg-ink">
      <div className="mx-auto max-w-3xl px-5 py-24 text-center md:px-10 lg:py-32">
        <Reveal>
          <p className="label-xs text-gold">Newsletter</p>
          <h2 className="display mt-6 text-[clamp(2.1rem,4vw,3.4rem)] text-warm-white">
            Enter the world of BIOREZA.
          </h2>
          <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-warm-white/70">
            Receive private offers, beauty rituals, new arrivals, and editorial stories.
          </p>
          <form
            className="mx-auto mt-12 flex max-w-md items-center gap-4 border-b border-gold/50 pb-3"
            onSubmit={(e) => {
              e.preventDefault();
              toast("Welcome to BIOREZA", { description: "Please confirm via your inbox." });
            }}
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              placeholder="Email address"
              className="w-full bg-transparent text-warm-white outline-none placeholder:text-warm-white/40"
            />
            <button
              type="submit"
              className="label-xs shrink-0 py-2 text-gold transition-colors duration-500 hover:text-warm-white"
            >
              Subscribe
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
