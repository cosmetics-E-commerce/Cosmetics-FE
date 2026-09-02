import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { getConcern, listConcerns } from "@/lib/api";
import { createSeoHead } from "@/lib/seo";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/skin-concerns/")({
  loader: ({ context }) =>
    context.queryClient.ensureQueryData({
      queryKey: ["concerns", "public"],
      queryFn: ({ signal }) => listConcerns(signal),
      staleTime: 5 * 60_000,
    }),
  head: ({ match }) => {
    const ar = match.search.lang === "ar";
    return createSeoHead({
      title: ar ? "تسوقي حسب احتياج البشرة | BioReza" : "Shop by Skin Concern | BioReza",
      description: ar
        ? "اكتشفي احتياجات البشرة المعتمدة من بيوريزا والمنتجات والمكونات والروتينات المرتبطة بها."
        : "Explore BioReza's approved skin-concern guides, products, ingredients and routine paths.",
      path: "/skin-concerns",
      locale: ar ? "ar" : "en",
      index: true,
      follow: true,
    });
  },
  component: ConcernHub,
});

function ConcernHub() {
  const concerns = Route.useLoaderData();
  const { locale } = useStore();
  const Arrow = locale === "ar" ? ArrowLeft : ArrowRight;
  return (
    <main className="concern-hub mx-auto max-w-[1440px] px-5 pb-28 pt-14 sm:px-8 lg:px-12 lg:pt-20">
      <header className="max-w-3xl border-s border-gold ps-5 sm:ps-8">
        <p className="label-xs text-gold">
          {locale === "ar" ? "اكتشفي حسب احتياجك" : "DISCOVER BY NEED"}
        </p>
        <h1 className="display mt-5 text-[clamp(2.6rem,7vw,6.5rem)] leading-[0.92]">
          {locale === "ar" ? "احتياجات البشرة" : "Skin concerns"}
        </h1>
        <p className="mt-7 max-w-2xl text-base leading-7 text-taupe sm:text-lg">
          {locale === "ar"
            ? "مسارات واضحة تجمع المحتوى المعتمد والمنتجات الحالية وبناء الروتين، من دون تشخيص أو وعود علاجية."
            : "Clear paths through approved education, current products and routine building—without diagnosis or treatment claims."}
        </p>
      </header>

      <ul className="mt-16 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
        {concerns.map((concern, index) => (
          <li key={concern.id} className="group min-w-0 bg-warm-white p-6 sm:p-8 lg:min-h-72">
            <Link
              to="/skin-concerns/$slug"
              params={{ slug: concern.slug }}
              preload="intent"
              className="flex h-full flex-col focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="font-mono text-xs text-taupe">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="label-xs text-taupe">
                  {concern.productCount} {locale === "ar" ? "منتج" : "products"}
                </span>
              </div>
              <h2 className="mt-12 font-serif text-3xl leading-tight sm:text-4xl">
                {concern.name[locale]}
              </h2>
              {concern.shortDescription[locale] ? (
                <p className="mt-4 line-clamp-3 text-sm leading-6 text-taupe">
                  {concern.shortDescription[locale]}
                </p>
              ) : null}
              <span className="mt-auto flex items-center gap-2 pt-8 text-sm font-medium text-gold">
                {locale === "ar" ? "استكشفي" : "Explore"}
                <Arrow className="size-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

void getConcern;
