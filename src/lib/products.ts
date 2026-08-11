import serum from "@/assets/product-serum.jpg";
import cream from "@/assets/product-cream.jpg";
import collection from "@/assets/collection.jpg";
import catSkincare from "@/assets/cat-skincare.jpg";
import catMakeup from "@/assets/cat-makeup.jpg";
import catHaircare from "@/assets/cat-haircare.jpg";
import catFragrance from "@/assets/cat-fragrance.jpg";
import storyLarge from "@/assets/story-large.jpg";
import storyDetail from "@/assets/story-detail.jpg";
import hero from "@/assets/hero.jpg";
import heroSlide1 from "@/assets/hero-slide-1.jpg";
import heroSlide2 from "@/assets/hero-slide-2.jpg";
import heroSlide3 from "@/assets/hero-slide-3.jpg";
import beautyDifferenceBefore from "@/assets/beauty-difference-before.jpg";
import beautyDifferenceAfter from "@/assets/beauty-difference-after.jpg";

export const images = {
  serum,
  cream,
  collection,
  catSkincare,
  catMakeup,
  catHaircare,
  catFragrance,
  storyLarge,
  storyDetail,
  hero,
  heroSlide1,
  heroSlide2,
  heroSlide3,
  beautyDifferenceBefore,
  beautyDifferenceAfter,
};

export type IngredientInfo = {
  id: string;
  inciName: string;
  commonName: string | null;
  slug: string;
  position: number;
  concentration: string | null;
  concentrationUnit: string | null;
  notes: string | null;
  shortDescriptionEn: string | null;
  shortDescriptionAr: string | null;
  functions: string[];
  benefits: string[];
  concerns: string[];
  goodFor: string[];
  avoidIf: string[];
  skinTypes: string[];
  skinConcerns: string[];
  regulatoryNotes: string | null;
  restrictions: string | null;
  safetyNotes: string | null;
};

export type Product = {
  id?: string;
  categoryId?: string;
  brandId?: string | null;
  slug: string;
  name: string;
  category: string;
  type: string;
  benefit: string;
  description: string;
  price: number;
  originalPrice?: number;
  savingsPercent?: number;
  promotionTitle?: string;
  promotionBadge?: string;
  promotionEndsAt?: string | null;
  rating: number;
  reviews: number;
  image: string;
  gallery: string[];
  badge?: "New" | "Bestseller" | "Limited";
  sizes: {
    id?: string;
    label: string;
    price: number;
    originalPrice?: number;
    promotionTitle?: string;
    shadeHex?: string | null;
    stock?: number;
  }[];
  stock?: number;
  concerns: string[];
  skinTypes: string[];
  inStock: boolean;
  ingredients: string;
  ingredientDetails: IngredientInfo[];
  howToUse: string;
  details: string;
  benefits: string[];
};

export const concerns = [
  { name: "Hydration", token: "var(--color-line-ice)" },
  { name: "Brightening", token: "var(--color-line-rose)" },
  { name: "Sensitive Skin", token: "var(--color-line-sage)" },
  { name: "Anti-Aging", token: "var(--color-line-plum)" },
  { name: "Night Repair", token: "var(--color-line-midnight)" },
  { name: "Oily Skin", token: "var(--color-line-graphite)" },
];

export const formatPrice = (n: number) =>
  new Intl.NumberFormat("en-EG", {
    style: "currency",
    currency: "EGP",
    maximumFractionDigits: 2,
  }).format(n);
