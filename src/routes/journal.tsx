import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/brand/Reveal";
import { Button } from "@/components/ui/button";
import { images, journal } from "@/lib/products";

export const Route = createFileRoute("/journal")({
  head: () => ({
    meta: [
      { title: "The Journal — BIOREZA Cosmetics" },
      {
        name: "description",
        content: "Rituals, ingredient science and editorial stories from the BIOREZA laboratory.",
      },
      { property: "og:title", content: "The Journal — BIOREZA Cosmetics" },
      {
        property: "og:description",
        content: "Rituals, ingredient science and editorial stories from BIOREZA.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: JournalPage,
});

function JournalPage() {
  return (
    <div>
      <section className="mx-auto max-w-[1560px] px-5 py-16 md:px-10">
        <p className="label-xs text-gold">The Journal</p>
        <h1 className="display mt-5 max-w-3xl text-[clamp(2.4rem,5vw,4rem)]">
          Beauty grounded in science and refined by nature.
        </h1>
        <p className="mt-8 max-w-xl text-[0.95rem] leading-relaxed text-muted-foreground">
          BIOREZA began in a small European laboratory with a simple conviction: efficacy and
          elegance belong together. Every formula is developed with dermatologists, assessed over
          eight weeks and finished in packaging designed to live beautifully on your vanity.
        </p>
      </section>

      <section className="img-zoom mx-auto max-w-[1560px] px-5 md:px-10">
        <img
          src={images.collection}
          alt="The BIOREZA collection on warm marble"
          loading="lazy"
          decoding="async"
          draggable={false}
          className="aspect-[21/9] w-full object-cover"
        />
      </section>

      <section className="mx-auto max-w-[1560px] px-5 py-24 md:px-10">
        <div className="grid gap-x-8 gap-y-14 md:grid-cols-3">
          {journal.map((a, i) => (
            <Reveal key={a.title} delay={i * 90} as="article">
              <div className="img-zoom">
                <img
                  src={a.image}
                  alt={a.title}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  className="aspect-[4/3] w-full bg-ivory object-cover"
                />
              </div>
              <p className="label-xs mt-6 text-gold">{a.category}</p>
              <h2 className="mt-3 font-serif text-2xl leading-tight">{a.title}</h2>
              <p className="mt-3 text-sm text-muted-foreground">{a.read}</p>
              <span className="nav-link label-xs mt-5 inline-block">Read Article</span>
            </Reveal>
          ))}
        </div>

        <div className="mt-24 border-t border-border pt-16 text-center">
          <h2 className="display text-[clamp(1.9rem,3.2vw,2.8rem)]">Begin your ritual.</h2>
          <Button asChild variant="solid" size="pill" className="mt-8">
            <Link to="/shop">Discover the Collection</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
