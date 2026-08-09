import { createFileRoute } from "@tanstack/react-router";
import {
  Hero,
  Benefits,
  CategoryGrid,
  Featured,
  CollectionFeature,
  Concerns,
  BestSellers,
  BrandStory,
  Newsletter,
} from "@/components/home/Sections";
import { loadCatalog, loadCategories } from "@/lib/catalog";

export const Route = createFileRoute("/")({
  loader: async ({ context }) => {
    const [products, categories] = await Promise.all([
      loadCatalog(
        { limit: 8, sortBy: "createdAt", sortOrder: "desc" },
        context.locale === "ar" ? "ar" : "en",
      ),
      loadCategories(),
    ]);
    return { products, categories };
  },
  head: () => ({
    meta: [
      { title: "BIOREZA Cosmetics — Healthy skin is beautiful skin" },
      {
        name: "description",
        content:
          "Advanced skincare and curated beauty essentials from BIOREZA. Science-backed formulas, dermatologically tested, made for visible results.",
      },
      { property: "og:title", content: "BIOREZA Cosmetics — Healthy skin is beautiful skin" },
      {
        property: "og:description",
        content: "Advanced skincare and curated beauty essentials, selected for visible results.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const { products, categories } = Route.useLoaderData();
  return (
    <>
      <Hero />
      <Benefits />
      <CategoryGrid initialCategories={categories} />
      <Featured initialProducts={products.slice(0, 5)} />
      <CollectionFeature />
      <Concerns />
      <BestSellers initialProducts={products} />
      <BrandStory />
      <Newsletter />
    </>
  );
}
