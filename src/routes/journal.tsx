import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { images } from "@/lib/products";
import { useStore } from "@/lib/store";
import { ImageReveal, ParallaxMedia, Reveal } from "@/components/motion/Primitives";

export const Route = createFileRoute("/journal")({
  head: () => ({
    meta: [
      { title: "About BIOREZA Cosmetics" },
      {
        name: "description",
        content: "BIOREZA's approach to curated beauty, transparent ingredients and customer care.",
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
  const { locale } = useStore();
  const ar = locale === "ar";
  return (
    <div>
      <Reveal
        as="section"
        stagger
        staggerMs={45}
        className="mx-auto max-w-[1560px] px-5 py-16 md:px-10"
      >
        <p className="label-xs text-gold">{ar ? "عن بيوريزا" : "About BIOREZA"}</p>
        <h1 className="display mt-5 max-w-3xl text-[clamp(2.4rem,5vw,4rem)]">
          {ar
            ? "جمال قائم على معلومات واضحة واختيارات مدروسة."
            : "Beauty grounded in clear information and considered choices."}
        </h1>
        <p className="mt-8 max-w-xl text-[0.95rem] leading-relaxed text-muted-foreground">
          {ar
            ? "نقدم منتجات تجميل مختارة مع عرض المكونات وطريقة الاستخدام والمخزون والمراجعات الموثقة بوضوح. لا ننشر ادعاءات مختبرية أو تحريرية لا يدعمها سجل منتج حقيقي."
            : "We curate beauty products while making ingredients, directions, stock, and verified-customer reviews clear. We do not publish laboratory claims or editorial stories without a real, reviewable product record behind them."}
        </p>
      </Reveal>

      <section className="img-zoom mx-auto max-w-[1560px] px-5 md:px-10">
        <ImageReveal direction="left" className="aspect-[21/9] w-full">
          <ParallaxMedia className="size-full" strength={24}>
            <img
              src={images.collection}
              alt="The BIOREZA collection on warm marble"
              loading="lazy"
              decoding="async"
              draggable={false}
              className="size-full object-cover"
            />
          </ParallaxMedia>
        </ImageReveal>
      </section>

      <section className="mx-auto max-w-[1560px] px-5 py-24 md:px-10">
        <Reveal className="mt-24 border-t border-border pt-16 text-center">
          <h2 className="display text-[clamp(1.9rem,3.2vw,2.8rem)]">
            {ar ? "ابدئي اختيارك." : "Begin your selection."}
          </h2>
          <Button asChild variant="solid" size="pill" className="mt-8">
            <Link to="/shop">{ar ? "تصفحي المجموعة" : "Discover the collection"}</Link>
          </Button>
        </Reveal>
      </section>
    </div>
  );
}
