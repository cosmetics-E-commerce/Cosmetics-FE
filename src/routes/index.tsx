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
  Journal,
  Testimonials,
  Gallery,
  Newsletter,
} from "@/components/home/Sections";

export const Route = createFileRoute("/")({
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
  return (
    <>
      <Hero />
      <Benefits />
      <CategoryGrid />
      <Featured />
      <CollectionFeature />
      <Concerns />
      <BestSellers />
      <BrandStory />
      <Journal />
      <Testimonials />
      <Gallery />
      <Newsletter />
    </>
  );
}
