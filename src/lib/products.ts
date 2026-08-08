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

const base = {
  sizes: [
    { label: "30 ml", price: 0 },
    { label: "50 ml", price: 28 },
  ],
  skinTypes: ["Dry", "Normal", "Combination"],
  inStock: true,
  ingredients:
    "Aqua, Glycerin, Niacinamide, Squalane, Panthenol, Sodium Hyaluronate, Tocopherol, Bisabolol. Formulated without parabens, sulphates or synthetic fragrance.",
  ingredientDetails: [],
  howToUse:
    "Apply two to three drops to cleansed skin morning and evening. Press gently into the face and neck, then follow with moisturiser.",
  details:
    "Developed in our European laboratory and clinically assessed over eight weeks. Dermatologically tested on all skin types.",
  benefits: [
    "Visibly smoother, more even complexion",
    "Reinforces the moisture barrier",
    "Softens the appearance of fine lines",
  ],
};

export const products: Product[] = [
  {
    ...base,
    slug: "renew-serum",
    name: "Renew Serum",
    category: "Skincare",
    type: "Serum",
    benefit: "Anti-ageing concentrate",
    description:
      "A weightless concentrate of encapsulated retinal and peptides that refines texture and restores luminosity overnight.",
    price: 128,
    rating: 4.9,
    reviews: 214,
    image: serum,
    gallery: [serum, collection, storyDetail],
    badge: "Bestseller",
    concerns: ["Anti-Aging", "Night Repair"],
  },
  {
    ...base,
    slug: "hydrating-cream",
    name: "Hydrating Cream",
    category: "Skincare",
    type: "Moisturiser",
    benefit: "72-hour deep moisture",
    description:
      "A cushioning cream with squalane and ceramides that replenishes the barrier and leaves skin supple for days.",
    price: 96,
    rating: 4.8,
    reviews: 168,
    image: cream,
    gallery: [cream, collection, storyDetail],
    concerns: ["Hydration", "Sensitive Skin"],
  },
  {
    ...base,
    slug: "brightening-toner",
    name: "Brightening Toner",
    category: "Skincare",
    type: "Toner",
    benefit: "Radiance boost",
    description:
      "A clarifying essence with vitamin C derivatives that refines pores and reveals a luminous, even tone.",
    price: 72,
    rating: 4.7,
    reviews: 132,
    image: collection,
    gallery: [collection, serum, storyDetail],
    badge: "New",
    concerns: ["Brightening", "Oily Skin"],
  },
  {
    ...base,
    slug: "renew-cream",
    name: "Renew Cream",
    category: "Skincare",
    type: "Night cream",
    benefit: "Anti-ageing care",
    description:
      "A rich nocturnal balm that works with the skin's natural repair rhythm to restore firmness and density.",
    price: 148,
    rating: 4.9,
    reviews: 96,
    image: cream,
    gallery: [cream, storyDetail, collection],
    badge: "Limited",
    concerns: ["Anti-Aging", "Night Repair"],
  },
  {
    ...base,
    slug: "silk-lip-nude",
    name: "Silk Lip — Nude",
    category: "Makeup",
    type: "Lipstick",
    benefit: "Satin nude finish",
    description:
      "A cashmere-soft lipstick in a warm, wearable nude, enriched with botanical oils for lasting comfort.",
    price: 46,
    rating: 4.6,
    reviews: 88,
    image: catMakeup,
    gallery: [catMakeup, storyDetail],
    concerns: ["Hydration"],
    sizes: [{ label: "3.5 g", price: 0 }],
  },
  {
    ...base,
    slug: "restorative-hair-oil",
    name: "Restorative Hair Oil",
    category: "Haircare",
    type: "Hair oil",
    benefit: "Weightless shine",
    description:
      "A featherlight oil of camellia and marula that smooths the cuticle and restores mirror-like shine.",
    price: 68,
    rating: 4.7,
    reviews: 74,
    image: catHaircare,
    gallery: [catHaircare, storyDetail],
    badge: "Bestseller",
    concerns: ["Hydration"],
    sizes: [{ label: "100 ml", price: 0 }],
  },
  {
    ...base,
    slug: "eau-de-bioreza",
    name: "Eau de BIOREZA",
    category: "Fragrance",
    type: "Eau de parfum",
    benefit: "Amber, iris, warm cedar",
    description:
      "A quiet, skin-close signature: powdery iris drawn over amber and cedarwood, softened by white musk.",
    price: 185,
    rating: 4.8,
    reviews: 61,
    image: catFragrance,
    gallery: [catFragrance, storyLarge],
    concerns: [],
    sizes: [
      { label: "50 ml", price: 0 },
      { label: "100 ml", price: 70 },
    ],
  },
  {
    ...base,
    slug: "barrier-cleansing-milk",
    name: "Barrier Cleansing Milk",
    category: "Skincare",
    type: "Cleanser",
    benefit: "Gentle daily cleanse",
    description:
      "A milky cleanser that dissolves make-up and impurities while leaving the barrier calm and comfortable.",
    price: 58,
    rating: 4.6,
    reviews: 143,
    image: catSkincare,
    gallery: [catSkincare, storyDetail],
    concerns: ["Sensitive Skin", "Hydration"],
    sizes: [{ label: "150 ml", price: 0 }],
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

export const categories = [
  { name: "Skincare", copy: "Rituals for barrier, tone and texture", image: catSkincare },
  { name: "Makeup", copy: "Refined colour, skin-like finishes", image: catMakeup },
  { name: "Haircare", copy: "Nourishment from root to length", image: catHaircare },
  { name: "Fragrance", copy: "Quiet, skin-close signatures", image: catFragrance },
];

export const concerns = [
  { name: "Hydration", token: "var(--color-line-ice)" },
  { name: "Brightening", token: "var(--color-line-rose)" },
  { name: "Sensitive Skin", token: "var(--color-line-sage)" },
  { name: "Anti-Aging", token: "var(--color-line-plum)" },
  { name: "Night Repair", token: "var(--color-line-midnight)" },
  { name: "Oily Skin", token: "var(--color-line-graphite)" },
];

export const journal = [
  {
    title: "How to Build a Complete Skincare Ritual",
    category: "Rituals",
    read: "6 min read",
    image: storyDetail,
  },
  {
    title: "Understanding Your Skin Barrier",
    category: "Science",
    read: "4 min read",
    image: catSkincare,
  },
  {
    title: "The Art of Everyday Radiance",
    category: "Editorial",
    read: "5 min read",
    image: storyLarge,
  },
];

export const testimonials = [
  {
    quote:
      "Six weeks with the Renew Serum and my skin looks like it did a decade ago — quietly, without any drama.",
    name: "Éloïse M.",
    place: "Paris",
  },
  {
    quote: "The formulas feel clinical, the ritual feels like a luxury. That balance is rare.",
    name: "Amira K.",
    place: "Dubai",
  },
  {
    quote: "Everything about BIOREZA is considered — the texture, the scent, the packaging.",
    name: "Hanne S.",
    place: "Copenhagen",
  },
];

export const formatPrice = (n: number) =>
  new Intl.NumberFormat("en-EG", {
    style: "currency",
    currency: "EGP",
    maximumFractionDigits: 2,
  }).format(n);
