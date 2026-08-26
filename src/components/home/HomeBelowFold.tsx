import type { PublicBrandListItemResponse, PublicCategoryResponse } from "@/lib/api";
import type { Product } from "@/lib/products";
import { BrandMarquee } from "./BrandMarquee";
import { CategoryShowcase } from "./CategoryShowcase";
import {
  Benefits,
  Featured,
  CollectionFeature,
  Concerns,
  BestSellers,
  BrandStory,
  BeautyDifference,
} from "./Sections";

export default function HomeBelowFold({
  arrivals,
  customerEdit,
  categories,
  brands,
}: {
  arrivals: Product[];
  customerEdit: Product[];
  categories: PublicCategoryResponse[];
  brands: PublicBrandListItemResponse[];
}) {
  return (
    <>
      <BrandMarquee initialBrands={brands} />
      <Benefits />
      <CategoryShowcase initialCategories={categories} />
      <Featured initialProducts={arrivals} />
      <CollectionFeature />
      <Concerns />
      <BestSellers initialProducts={customerEdit} />
      <BrandStory />
      <BeautyDifference />
    </>
  );
}
