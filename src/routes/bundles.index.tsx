import { createFileRoute, Link } from "@tanstack/react-router";

import { listDynamicBundles } from "@/lib/api";
import { createSeoHead } from "@/lib/seo";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/bundles/")({
  loader: ({ context }) =>
    context.queryClient.ensureQueryData({
      queryKey: ["dynamic-bundles", "public"],
      queryFn: ({ signal }) => listDynamicBundles(signal),
      staleTime: 60_000,
    }),
  head: ({ match }) => {
    const ar = match.search.lang === "ar";
    return createSeoHead({
      title: ar ? "ابني مجموعتك | BioReza" : "Build Your Bundle | BioReza",
      description: ar
        ? "اختاري المنتجات المؤهلة لكل خطوة وشاهدي السعر الحالي والتوفير من المصدر الرسمي."
        : "Choose eligible products for each step and see current, server-validated bundle pricing.",
      path: "/bundles",
      locale: ar ? "ar" : "en",
      index: true,
      follow: true,
    });
  },
  component: BundlesIndex,
});

function BundlesIndex() {
  const bundles = Route.useLoaderData();
  const { locale } = useStore();
  return (
    <main className="mx-auto max-w-[1440px] px-5 pb-28 pt-14 sm:px-8 lg:px-12 lg:pt-20">
      <p className="label-xs text-gold">
        {locale === "ar" ? "اختياراتك، مجموعتك" : "YOUR PICKS, ONE SET"}
      </p>
      <h1 className="display mt-5 max-w-5xl text-[clamp(3rem,8vw,7rem)] leading-[0.9]">
        {locale === "ar" ? "ابني مجموعتك" : "Build your bundle"}
      </h1>
      <p className="mt-7 max-w-2xl text-taupe">
        {locale === "ar"
          ? "اختاري منتجاً مؤهلاً لكل خطوة. السعر والمخزون والخصم يعاد التحقق منها على الخادم."
          : "Choose an eligible product for every step. Price, stock and savings are revalidated by the server."}
      </p>
      <ul className="mt-14 grid gap-5 md:grid-cols-2">
        {bundles.map((bundle) => (
          <li key={bundle.id} className="border border-border bg-ivory p-7 sm:p-10">
            <p className="label-xs text-gold">{bundle.discountLabel[locale]}</p>
            <h2 className="mt-5 font-serif text-4xl">{bundle.name[locale]}</h2>
            <p className="mt-4 text-sm leading-6 text-taupe">{bundle.description[locale]}</p>
            <p className="mt-8 text-sm">
              {bundle.slots.length} {locale === "ar" ? "خطوات" : "steps"}
            </p>
            <Link
              to="/bundles/$slug"
              params={{ slug: bundle.slug }}
              className="mt-8 inline-flex rounded-full bg-foreground px-6 py-3 text-sm font-medium text-warm-white hover:bg-gold hover:text-foreground"
            >
              {locale === "ar" ? "ابدئي البناء" : "Build this bundle"}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
