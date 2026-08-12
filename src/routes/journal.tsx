import { createFileRoute, Link } from "@tanstack/react-router";
import { images } from "@/lib/products";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/journal")({
  head: () => ({
    meta: [
      { title: "About BIOREZA Cosmetics" },
      {
        name: "description",
        content: "BIOREZA's approach to curated beauty, transparent information and customer care.",
      },
      { property: "og:title", content: "About BIOREZA Cosmetics" },
      {
        property: "og:description",
        content: "A clearer way to discover and shop beauty products.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

const principles = {
  en: [
    {
      title: "Clear details",
      body: "Ingredients, directions, price, and availability shown before you buy.",
    },
    {
      title: "Real feedback",
      body: "Verified customer reviews stay connected to the products they describe.",
    },
    {
      title: "Human support",
      body: "Our customer-care team is available when you need a straight answer.",
    },
  ],
  ar: [
    {
      title: "تفاصيل واضحة",
      body: "المكونات وطريقة الاستخدام والسعر والتوفر ظاهرة قبل الشراء.",
    },
    {
      title: "آراء حقيقية",
      body: "تظل مراجعات العملاء الموثقة مرتبطة بالمنتجات التي تصفها.",
    },
    {
      title: "دعم بشري",
      body: "فريق خدمة العملاء متاح عندما تحتاجين إلى إجابة واضحة.",
    },
  ],
};

function AboutPage() {
  const { locale } = useStore();
  const ar = locale === "ar";
  const copy = ar
    ? {
        eyebrow: "عن بيوريزا",
        title: "اختيارات جمال أوضح.",
        intro: "نساعدك على فهم منتجات الجمال ومقارنتها واختيار ما يناسبك بثقة.",
        primaryCta: "تصفحي المنتجات",
        principlesTitle: "لا غموض. لا ضغط.",
        principlesBody: "كل منتج يجب أن يمنحك المعلومات التي تحتاجينها لاتخاذ قرارك بنفسك.",
        selectionTitle: "نختار لسبب واضح.",
        selectionBody:
          "بيوريزا متجر متعدد العلامات، لذلك لا ندفعك نحو اسم واحد. ننظم المنتجات حسب احتياجك ونوضح الفروق المهمة بينها.",
        closingTitle: "اعثري على ما يناسب روتينك.",
        closingBody: "تصفحي المجموعة وقارني التفاصيل قبل أن تقرري.",
      }
    : {
        eyebrow: "About BIOREZA",
        title: "Beauty, clearly chosen.",
        intro: "We make beauty products easier to understand, compare, and choose with confidence.",
        primaryCta: "Shop beauty",
        principlesTitle: "No mystery. No pressure.",
        principlesBody:
          "Every product should give you enough information to make your own decision.",
        selectionTitle: "Selected with a reason.",
        selectionBody:
          "BIOREZA is a multi-brand store, so we are not here to push one label. We organize products around your needs and explain the differences that matter.",
        closingTitle: "Find what fits your routine.",
        closingBody: "Browse the collection and compare the details before you decide.",
      };

  return (
    <div className="sf-about-page">
      <section className="sf-about-hero" aria-labelledby="about-title">
        <div className="sf-about-hero__copy">
          <p className="sf-about-eyebrow">{copy.eyebrow}</p>
          <h1 id="about-title">{copy.title}</h1>
          <p className="sf-about-hero__intro">{copy.intro}</p>
          <Link className="sf-about-primary-link" to="/shop">
            {copy.primaryCta}
          </Link>
        </div>

        <div className="sf-about-hero__media">
          <img
            src={images.heroSlide3}
            alt={ar ? "امرأة تحمل منتج عناية بالبشرة" : "Woman holding a skincare product"}
            fetchPriority="high"
            decoding="async"
            draggable={false}
          />
        </div>
      </section>

      <section className="sf-about-principles" aria-labelledby="principles-title">
        <div className="sf-about-principles__intro">
          <h2 id="principles-title">{copy.principlesTitle}</h2>
          <p>{copy.principlesBody}</p>
        </div>

        <dl className="sf-about-principles__list">
          {principles[locale].map((principle) => (
            <div key={principle.title}>
              <dt>{principle.title}</dt>
              <dd>{principle.body}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="sf-about-selection" aria-labelledby="selection-title">
        <div className="sf-about-selection__media">
          <img
            src={images.heroSlide1}
            alt={ar ? "روتين عناية بسيط بالبشرة" : "A simple skincare routine"}
            loading="lazy"
            decoding="async"
            draggable={false}
          />
        </div>

        <div className="sf-about-selection__copy">
          <h2 id="selection-title">{copy.selectionTitle}</h2>
          <p>{copy.selectionBody}</p>
        </div>
      </section>

      <section
        className="sf-about-product-view"
        aria-label={ar ? "مجموعة بيوريزا" : "BIOREZA collection"}
      >
        <img
          src={images.collection}
          alt={ar ? "مجموعة مختارة من مستحضرات العناية" : "A curated skincare collection"}
          loading="lazy"
          decoding="async"
          draggable={false}
        />
      </section>

      <section className="sf-about-closing" aria-labelledby="about-closing-title">
        <div>
          <h2 id="about-closing-title">{copy.closingTitle}</h2>
          <p>{copy.closingBody}</p>
        </div>
        <Link className="sf-about-primary-link" to="/shop">
          {copy.primaryCta}
        </Link>
      </section>
    </div>
  );
}
