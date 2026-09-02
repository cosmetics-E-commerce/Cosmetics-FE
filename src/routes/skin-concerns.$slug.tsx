import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ChevronDown, Sparkles } from "lucide-react";

import { BrandLogo } from "@/components/brand/BrandLogo";
import { ProductCard } from "@/components/shop/ProductCard";
import { Button } from "@/components/ui/button";
import { getConcern, type PublicConcernDetail } from "@/lib/api";
import { mapProduct } from "@/lib/catalog";
import { breadcrumbSchema, canonicalUrl, createSeoHead, jsonLd, type SeoLocale } from "@/lib/seo";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/skin-concerns/$slug")({
  loader: async ({ params, context }) => {
    const concern = await context.queryClient
      .ensureQueryData({
        queryKey: ["concern", params.slug],
        queryFn: ({ signal }) => getConcern(params.slug, signal),
        staleTime: 2 * 60_000,
      })
      .catch(() => null);
    if (!concern || "redirectTo" in concern) throw notFound();
    return concern;
  },
  head: ({ loaderData, params, match }) => {
    const locale: SeoLocale = match.search.lang === "ar" ? "ar" : "en";
    const concern = loaderData;
    const name = concern?.config.name[locale] || params.slug;
    const path = `/skin-concerns/${encodeURIComponent(params.slug)}`;
    return {
      ...createSeoHead({
        title: concern?.config.seo.title[locale] || `${name} | BioReza`,
        description:
          concern?.config.seo.description[locale] || concern?.config.shortDescription[locale] || "",
        path,
        locale,
        image: concern?.config.seo.openGraphImageKey ?? undefined,
        index: concern?.config.seo.indexable ?? false,
        follow: true,
      }),
      scripts: concern
        ? [
            jsonLd(
              breadcrumbSchema(
                [
                  { name: locale === "ar" ? "الرئيسية" : "Home", path: "/" },
                  {
                    name: locale === "ar" ? "احتياجات البشرة" : "Skin Concerns",
                    path: "/skin-concerns",
                  },
                  { name, path },
                ],
                locale,
              ),
            ),
            jsonLd({
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              name,
              url: canonicalUrl(path, locale),
              inLanguage: locale,
            }),
            ...(concern.config.faq.some((item) => item.enabled)
              ? [
                  jsonLd({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    mainEntity: concern.config.faq
                      .filter((item) => item.enabled)
                      .map((item) => ({
                        "@type": "Question",
                        name: item.question[locale],
                        acceptedAnswer: { "@type": "Answer", text: item.answer[locale] },
                      })),
                  }),
                ]
              : []),
          ]
        : [],
    };
  },
  component: ConcernPage,
});

function ConcernPage() {
  const concern = Route.useLoaderData();
  const { locale } = useStore();
  const Arrow = locale === "ar" ? ArrowLeft : ArrowRight;
  const products = concern.products.data.map((product) => mapProduct(product, locale));
  const layout = concernLayout(concern);
  return (
    <main className="concern-page pb-28">
      <section className="border-b border-border bg-ivory">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:px-12 lg:py-24">
          <div className="max-w-4xl">
            <nav aria-label="Breadcrumb" className="label-xs text-taupe">
              <Link to="/skin-concerns" className="hover:text-gold">
                {locale === "ar" ? "احتياجات البشرة" : "Skin concerns"}
              </Link>
            </nav>
            <h1 className="display mt-7 text-[clamp(3.2rem,9vw,8.5rem)] leading-[0.86] tracking-[-0.05em]">
              {concern.config.name[locale]}
            </h1>
            <p className="mt-8 max-w-2xl text-base leading-7 text-taupe sm:text-lg">
              {concern.config.shortDescription[locale] || concern.config.longDescription[locale]}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild size="pill">
                <a href="#products">{locale === "ar" ? "تسوقي المنتجات" : "Shop products"}</a>
              </Button>
              {concern.routineHandoff ? (
                <Button asChild variant="line" size="pill">
                  <Link to="/routine" search={{ contextConcernId: concern.id }}>
                    {locale === "ar" ? "ابني روتيني" : "Build my routine"}
                  </Link>
                </Button>
              ) : null}
            </div>
          </div>
          <dl className="grid grid-cols-2 gap-px self-end bg-border">
            {[
              [concern.coverage.products, locale === "ar" ? "منتج" : "Products"],
              [concern.coverage.brands, locale === "ar" ? "علامة" : "Brands"],
              [concern.coverage.ingredients, locale === "ar" ? "مكوّن" : "Ingredients"],
              [concern.coverage.routineRoles.length, locale === "ar" ? "خطوات" : "Routine steps"],
            ].map(([value, label]) => (
              <div key={String(label)} className="bg-warm-white p-5">
                <dt className="label-xs text-taupe">{label}</dt>
                <dd className="mt-2 font-serif text-3xl">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <div
        className="mx-auto flex max-w-[1440px] flex-col px-5 sm:px-8 lg:px-12"
        data-page-revision={concern.page?.revisionId}
      >
        <Editorial concern={concern} locale={locale} order={layout.EDITORIAL} />

        {concern.routineHandoff ? (
          <section
            style={{ order: layout.ROUTINE }}
            className="my-16 grid gap-8 bg-foreground px-6 py-10 text-warm-white sm:px-10 lg:grid-cols-[1fr_auto] lg:items-end lg:px-14 lg:py-14"
          >
            <div>
              <p className="label-xs text-gold">
                {locale === "ar" ? "روتينك، باختياراتك" : "YOUR ROUTINE, YOUR CHOICES"}
              </p>
              <h2 className="mt-4 max-w-3xl font-serif text-4xl sm:text-5xl">
                {locale === "ar"
                  ? "ابدئي بهذا الاحتياج ثم عدّلي كل اختيار."
                  : "Start with this concern, then adjust every choice."}
              </h2>
            </div>
            <Button asChild size="pill" className="bg-gold text-foreground hover:bg-warm-white">
              <Link to="/routine" search={{ contextConcernId: concern.id }}>
                {locale === "ar" ? "ابدئي بناء الروتين" : "Start routine builder"}
                <Arrow className="ms-2 size-4" />
              </Link>
            </Button>
          </section>
        ) : null}

        {concern.featuredCategories.length ? (
          <section style={{ order: layout.CATEGORIES }} className="my-16">
            <SectionTitle
              eyebrow={locale === "ar" ? "تسوقي حسب الفئة" : "SHOP BY CATEGORY"}
              title={locale === "ar" ? "ابدئي بنوع المنتج" : "Start with product type"}
            />
            <div className="mt-8 flex flex-wrap gap-2">
              {concern.featuredCategories.map((category) => (
                <Link
                  key={category.id}
                  to="/categories/$slug"
                  params={{ slug: category.slug }}
                  className="rounded-full border border-border px-5 py-3 text-sm hover:border-gold hover:text-gold"
                >
                  {locale === "ar" ? category.nameAr : category.nameEn}
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        <section id="products" style={{ order: layout.PRODUCTS }} className="my-20 scroll-mt-28">
          <SectionTitle
            eyebrow={locale === "ar" ? "مختارات حالية" : "CURRENT DISCOVERY"}
            title={
              locale === "ar" ? "منتجات لهذا الاحتياج" : `Products for ${concern.config.name.en}`
            }
          />
          <div className="mt-10 grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {concern.products.meta.total > products.length ? (
            <div className="mt-12 text-center">
              <Button asChild variant="line" size="pill">
                <Link to="/skin-concerns/$slug/products" params={{ slug: concern.slug }}>
                  {locale === "ar"
                    ? `عرض كل ${concern.products.meta.total} منتج`
                    : `Shop all ${concern.products.meta.total} products`}
                </Link>
              </Button>
            </div>
          ) : null}
        </section>

        {concern.ingredients.length ? (
          <section style={{ order: layout.INGREDIENTS }} className="my-20">
            <SectionTitle
              eyebrow={locale === "ar" ? "بيانات معتمدة" : "APPROVED CONTEXT"}
              title={locale === "ar" ? "مكونات للاستكشاف" : "Ingredients to explore"}
            />
            <ul className="mt-8 grid gap-px bg-border md:grid-cols-2 lg:grid-cols-3">
              {concern.ingredients.map((ingredient) => (
                <li key={ingredient.id} className="bg-warm-white p-6 sm:p-8">
                  <Sparkles className="size-5 text-gold" aria-hidden="true" />
                  <h3 className="mt-8 font-serif text-2xl">{ingredient.name}</h3>
                  {ingredient.shortDescription[locale] ? (
                    <p className="mt-3 text-sm leading-6 text-taupe">
                      {ingredient.shortDescription[locale]}
                    </p>
                  ) : null}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {concern.curatedBrands.length ? (
          <section style={{ order: layout.BRANDS }} className="my-20">
            <SectionTitle
              eyebrow={locale === "ar" ? "علامات للاستكشاف" : "BRANDS TO EXPLORE"}
              title={locale === "ar" ? "علامات بمنتجات مرتبطة" : "Relevant brand discovery"}
            />
            <ul className="mt-8 grid grid-cols-2 gap-px bg-border sm:grid-cols-3 lg:grid-cols-5">
              {concern.curatedBrands.map((brand) => (
                <li key={brand.id} className="grid min-h-32 place-items-center bg-warm-white p-6">
                  <Link to="/brands/$slug" params={{ slug: brand.slug }} aria-label={brand.name}>
                    <BrandLogo
                      name={brand.name}
                      logoUrl={brand.logoUrl}
                      display={brand.logoDisplay}
                      className="max-h-14 max-w-36"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <FaqAndRelated
          concern={concern}
          locale={locale}
          faqOrder={layout.FAQ}
          relatedOrder={layout.RELATED}
        />
      </div>
    </main>
  );
}

function Editorial({
  concern,
  locale,
  order,
}: {
  concern: PublicConcernDetail;
  locale: "en" | "ar";
  order: number;
}) {
  const blocks = concern.config.content
    .filter((block) => block.enabled)
    .sort((a, b) => a.order - b.order);
  if (!blocks.length && !concern.config.longDescription[locale]) return null;
  return (
    <section style={{ order }} className="my-16 grid gap-px bg-border lg:grid-cols-2">
      {(blocks.length
        ? blocks
        : [
            {
              id: "intro",
              heading: { en: "About this concern", ar: "عن هذا الاحتياج" },
              body: concern.config.longDescription,
              order: 0,
              enabled: true,
              type: "ABOUT",
            },
          ]
      ).map((block) => (
        <article key={block.id} className="bg-warm-white p-6 sm:p-10">
          <h2 className="font-serif text-3xl">{block.heading[locale]}</h2>
          <p className="mt-5 whitespace-pre-line text-sm leading-7 text-taupe">
            {block.body[locale]}
          </p>
        </article>
      ))}
    </section>
  );
}

function FaqAndRelated({
  concern,
  locale,
  faqOrder,
  relatedOrder,
}: {
  concern: PublicConcernDetail;
  locale: "en" | "ar";
  faqOrder: number;
  relatedOrder: number;
}) {
  const faq = concern.config.faq.filter((item) => item.enabled).sort((a, b) => a.order - b.order);
  return (
    <>
      {faq.length ? (
        <section style={{ order: faqOrder }} className="my-20 max-w-4xl">
          <SectionTitle eyebrow="FAQ" title={locale === "ar" ? "أسئلة شائعة" : "Good to know"} />
          <div className="mt-8 divide-y divide-border border-y border-border">
            {faq.map((item) => (
              <details key={item.id} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-medium">
                  {item.question[locale]}{" "}
                  <ChevronDown className="size-4 shrink-0 transition-transform group-open:rotate-180" />
                </summary>
                <p className="max-w-3xl pb-2 pt-4 text-sm leading-7 text-taupe">
                  {item.answer[locale]}
                </p>
              </details>
            ))}
          </div>
        </section>
      ) : null}
      {concern.relatedConcerns.length ? (
        <section style={{ order: relatedOrder }} className="my-20">
          <SectionTitle
            eyebrow={locale === "ar" ? "تابعي الاستكشاف" : "KEEP EXPLORING"}
            title={locale === "ar" ? "احتياجات مرتبطة" : "Related concerns"}
          />
          <div className="mt-8 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
            {concern.relatedConcerns.map((related) => (
              <Link
                key={related.id}
                to="/skin-concerns/$slug"
                params={{ slug: related.slug }}
                className="bg-warm-white p-7 hover:bg-ivory"
              >
                <h3 className="font-serif text-3xl">{related.name[locale]}</h3>
                {related.shortDescription[locale] ? (
                  <p className="mt-3 text-sm leading-6 text-taupe">
                    {related.shortDescription[locale]}
                  </p>
                ) : null}
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
}

type ConcernModule =
  | "EDITORIAL"
  | "ROUTINE"
  | "CATEGORIES"
  | "PRODUCTS"
  | "INGREDIENTS"
  | "BRANDS"
  | "FAQ"
  | "RELATED";

function concernLayout(concern: PublicConcernDetail): Record<ConcernModule, number> {
  const fallback: Record<ConcernModule, number> = {
    EDITORIAL: 10,
    ROUTINE: 20,
    CATEGORIES: 30,
    PRODUCTS: 40,
    INGREDIENTS: 50,
    BRANDS: 60,
    FAQ: 70,
    RELATED: 80,
  };
  if (!concern.page) return fallback;
  const assigned = new Set<ConcernModule>();
  const result = { ...fallback };
  for (const [index, section] of concern.page.config.sections.entries()) {
    const label = section.label.toLowerCase();
    const module: ConcernModule | null =
      section.type === "PRODUCT_GRID" || section.type === "PRODUCT_CAROUSEL"
        ? "PRODUCTS"
        : section.type === "ROUTINE_CTA"
          ? "ROUTINE"
          : section.type === "CATEGORIES"
            ? "CATEGORIES"
            : section.type === "BRANDS"
              ? "BRANDS"
              : section.type === "FAQ"
                ? "FAQ"
                : (section.type === "IMAGE_TEXT" || section.type === "CONTENT_BLOCKS") &&
                    label.includes("ingredient")
                  ? "INGREDIENTS"
                  : section.type === "IMAGE_TEXT" || section.type === "CONTENT_BLOCKS"
                    ? "EDITORIAL"
                    : section.type === "PROMO_BANNER"
                      ? "RELATED"
                      : null;
    if (module && !assigned.has(module)) {
      result[module] = index * 10;
      assigned.add(module);
    }
  }
  const tail = concern.page.config.sections.length * 10 + 10;
  for (const module of Object.keys(result) as ConcernModule[]) {
    if (!assigned.has(module)) result[module] = tail + fallback[module];
  }
  return result;
}

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <header>
      <p className="label-xs text-gold">{eyebrow}</p>
      <h2 className="mt-3 font-serif text-4xl sm:text-5xl">{title}</h2>
    </header>
  );
}
