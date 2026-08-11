"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminProductSchema =
  exports.adminProductImageSchema =
  exports.adminProductVariantSchema =
  exports.publicProductSchema =
  exports.publicProductVariantSchema =
  exports.publicProductImageSchema =
  exports.updateBrandSchema =
  exports.createBrandSchema =
  exports.publicBrandListItemSchema =
  exports.publicBrandSchema =
  exports.updateCategorySchema =
  exports.createCategorySchema =
  exports.publicCategorySchema =
  exports.adminProductQuerySchema =
  exports.publicBrandQuerySchema =
  exports.publicCatalogQuerySchema =
  exports.receiveBatchSchema =
  exports.updateProductSchema =
  exports.productVariantUpdateSchema =
  exports.createProductSchema =
  exports.productDimensionsInputSchema =
  exports.productImageInputSchema =
  exports.productVariantInputSchema =
  exports.skinTypeEnum =
    void 0;
const zod_1 = require("zod");
const primitives_1 = require("../common/primitives");
const pagination_1 = require("../common/pagination");
const ingredient_schema_1 = require("../ingredients/ingredient.schema");
exports.skinTypeEnum = zod_1.z.enum(["OILY", "DRY", "COMBINATION", "SENSITIVE", "NORMAL", "ALL"]);
const skinTypeQuerySchema = zod_1.z.preprocess((value) => {
  if (value === undefined) return undefined;
  if (Array.isArray(value)) return value;
  return String(value)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}, zod_1.z.array(exports.skinTypeEnum).optional());
exports.productVariantInputSchema = zod_1.z.object({
  sku: zod_1.z.string().trim().min(1).max(64),
  nameEn: zod_1.z.string().trim().min(1).max(100),
  nameAr: zod_1.z.string().trim().min(1).max(100),
  barcode: zod_1.z.string().trim().max(64).optional(),
  priceOverride: primitives_1.piastresSchema.optional(),
  /** Swatch colour for shade variants, e.g. "#C21807". */
  shadeHex: zod_1.z
    .string()
    .regex(/^#[0-9a-fA-F]{6}$/, "Must be a hex colour like #C21807")
    .optional(),
});
exports.productImageInputSchema = zod_1.z.object({
  objectKey: zod_1.z.string().trim().min(1).max(2048),
  altText: zod_1.z.string().trim().max(180).optional(),
  sortOrder: zod_1.z.number().int().min(0).default(0),
  isPrimary: zod_1.z.boolean().default(false),
});
/**
 * Physical shipping attributes. Optional because a product can be catalogued
 * before it has been weighed — the package calculator falls back to configured
 * defaults, so an unmeasured product still quotes rather than failing checkout.
 */
exports.productDimensionsInputSchema = {
  /** Kilograms. */
  weight: zod_1.z.number().nonnegative().max(1000).optional(),
  /** Centimetres. */
  height: zod_1.z.number().nonnegative().max(500).optional(),
  width: zod_1.z.number().nonnegative().max(500).optional(),
  length: zod_1.z.number().nonnegative().max(500).optional(),
};
const productBaseSchema = zod_1.z.object({
  ...exports.productDimensionsInputSchema,
  categoryId: primitives_1.uuidSchema,
  brandId: primitives_1.uuidSchema.optional(),
  slug: primitives_1.slugSchema.optional(),
  nameEn: zod_1.z.string().trim().min(2).max(200),
  nameAr: zod_1.z.string().trim().min(2).max(200),
  descriptionEn: zod_1.z.string().trim().max(5000).optional(),
  descriptionAr: zod_1.z.string().trim().max(5000).optional(),
  /** Allergen disclosure — a regulatory expectation for cosmetics. */
  ingredients: zod_1.z.string().trim().max(5000).optional(),
  howToUse: zod_1.z.string().trim().max(2000).optional(),
  skinType: zod_1.z.array(exports.skinTypeEnum).default([]),
  basePrice: primitives_1.piastresSchema.positive(),
  compareAtPrice: primitives_1.piastresSchema.positive().optional(),
  isActive: zod_1.z.boolean().default(false),
  publishedAt: zod_1.z.coerce.date().nullable().optional(),
  variants: zod_1.z
    .array(exports.productVariantInputSchema)
    .min(1, "A product needs at least one variant"),
  images: zod_1.z.array(exports.productImageInputSchema).max(20).default([]),
  ingredientLinks: zod_1.z
    .array(ingredient_schema_1.productIngredientInputSchema)
    .max(300)
    .optional(),
});
exports.createProductSchema = productBaseSchema.refine(
  (v) => v.compareAtPrice === undefined || v.compareAtPrice > v.basePrice,
  {
    message: "Compare-at price must be greater than base price",
    path: ["compareAtPrice"],
  },
);
exports.productVariantUpdateSchema = zod_1.z.union([
  exports.productVariantInputSchema.extend({
    isActive: zod_1.z.boolean().optional(),
  }),
  exports.productVariantInputSchema.partial().extend({
    id: primitives_1.uuidSchema,
    isActive: zod_1.z.boolean().optional(),
  }),
]);
exports.updateProductSchema = zod_1.z.object({
  categoryId: primitives_1.uuidSchema.optional(),
  brandId: primitives_1.uuidSchema.nullable().optional(),
  slug: primitives_1.slugSchema.optional(),
  nameEn: zod_1.z.string().trim().min(2).max(200).optional(),
  nameAr: zod_1.z.string().trim().min(2).max(200).optional(),
  descriptionEn: zod_1.z.string().trim().max(5000).optional(),
  descriptionAr: zod_1.z.string().trim().max(5000).optional(),
  ingredients: zod_1.z.string().trim().max(5000).optional(),
  howToUse: zod_1.z.string().trim().max(2000).optional(),
  skinType: zod_1.z.array(exports.skinTypeEnum).optional(),
  basePrice: primitives_1.piastresSchema.positive().optional(),
  compareAtPrice: primitives_1.piastresSchema.positive().nullable().optional(),
  weight: zod_1.z.number().nonnegative().max(1000).nullable().optional(),
  height: zod_1.z.number().nonnegative().max(500).nullable().optional(),
  width: zod_1.z.number().nonnegative().max(500).nullable().optional(),
  length: zod_1.z.number().nonnegative().max(500).nullable().optional(),
  isActive: zod_1.z.boolean().optional(),
  publishedAt: zod_1.z.coerce.date().nullable().optional(),
  variants: zod_1.z.array(exports.productVariantUpdateSchema).max(50).optional(),
  images: zod_1.z.array(exports.productImageInputSchema).max(20).optional(),
  ingredientLinks: zod_1.z
    .array(ingredient_schema_1.productIngredientInputSchema)
    .max(300)
    .optional(),
});
/** Receiving stock — expiry is mandatory for cosmetics. PLAN.md §10.2. */
exports.receiveBatchSchema = zod_1.z
  .object({
    variantId: primitives_1.uuidSchema,
    batchNumber: zod_1.z.string().trim().min(1).max(64),
    manufacturedAt: zod_1.z.coerce.date().optional(),
    expiresAt: zod_1.z.coerce.date(),
    paoMonths: zod_1.z.number().int().positive().max(120).optional(),
    quantity: zod_1.z.number().int().positive(),
    costPrice: primitives_1.piastresSchema,
  })
  .refine((v) => v.expiresAt > new Date(), {
    message: "Cannot receive stock that has already expired",
    path: ["expiresAt"],
  })
  .refine((v) => !v.manufacturedAt || v.manufacturedAt < v.expiresAt, {
    message: "Manufacture date must precede expiry date",
    path: ["manufacturedAt"],
  });
exports.publicCatalogQuerySchema = pagination_1.paginationQuerySchema
  .extend({
    search: zod_1.z.string().trim().min(1).max(120).optional(),
    categorySlug: primitives_1.slugSchema.optional(),
    brandSlug: primitives_1.slugSchema.optional(),
    skinType: skinTypeQuerySchema,
    minPrice: zod_1.z.coerce.number().int().nonnegative().optional(),
    maxPrice: zod_1.z.coerce.number().int().nonnegative().optional(),
    sortBy: zod_1.z.enum(["createdAt", "basePrice", "nameEn"]).default("createdAt"),
  })
  .refine((v) => v.minPrice === undefined || v.maxPrice === undefined || v.minPrice <= v.maxPrice, {
    message: "minPrice must be less than or equal to maxPrice",
    path: ["minPrice"],
  });
exports.publicBrandQuerySchema = pagination_1.paginationQuerySchema.extend({
  search: zod_1.z.string().trim().min(1).max(120).optional(),
  sortBy: zod_1.z.enum(["name", "createdAt"]).default("name"),
});
exports.adminProductQuerySchema = pagination_1.paginationQuerySchema
  .extend({
    search: zod_1.z.string().trim().min(1).max(120).optional(),
    status: zod_1.z.enum(["DRAFT", "PUBLISHED", "INACTIVE", "DELETED"]).optional(),
    categoryId: primitives_1.uuidSchema.optional(),
    categorySlug: primitives_1.slugSchema.optional(),
    brandId: primitives_1.uuidSchema.optional(),
    brandSlug: primitives_1.slugSchema.optional(),
    skinType: skinTypeQuerySchema,
    minPrice: zod_1.z.coerce.number().int().nonnegative().optional(),
    maxPrice: zod_1.z.coerce.number().int().nonnegative().optional(),
    sortBy: zod_1.z.enum(["createdAt", "updatedAt", "basePrice", "nameEn"]).default("createdAt"),
  })
  .refine((v) => v.minPrice === undefined || v.maxPrice === undefined || v.minPrice <= v.maxPrice, {
    message: "minPrice must be less than or equal to maxPrice",
    path: ["minPrice"],
  });
exports.publicCategorySchema = zod_1.z.object({
  id: primitives_1.uuidSchema,
  parentId: primitives_1.uuidSchema.nullable(),
  slug: primitives_1.slugSchema,
  nameEn: zod_1.z.string(),
  nameAr: zod_1.z.string(),
  imageUrl: zod_1.z.string().nullable(),
  sortOrder: zod_1.z.number().int(),
  productCount: zod_1.z.number().int(),
});
exports.createCategorySchema = zod_1.z
  .object({
    parentId: primitives_1.uuidSchema.optional(),
    slug: primitives_1.slugSchema.optional(),
    nameEn: zod_1.z.string().trim().min(2).max(140),
    nameAr: zod_1.z.string().trim().min(2).max(140),
    imageKey: zod_1.z.string().trim().min(1).max(2048).optional(),
    sortOrder: zod_1.z.number().int().min(0).default(0),
    isActive: zod_1.z.boolean().default(true),
  })
  .strict();
exports.updateCategorySchema = zod_1.z
  .object({
    parentId: primitives_1.uuidSchema.nullable().optional(),
    slug: primitives_1.slugSchema.optional(),
    nameEn: zod_1.z.string().trim().min(2).max(140).optional(),
    nameAr: zod_1.z.string().trim().min(2).max(140).optional(),
    imageKey: zod_1.z.string().trim().min(1).max(2048).nullable().optional(),
    sortOrder: zod_1.z.number().int().min(0).optional(),
    isActive: zod_1.z.boolean().optional(),
  })
  .strict()
  .refine((value) => Object.keys(value).length > 0, "At least one field is required");
exports.publicBrandSchema = zod_1.z.object({
  id: primitives_1.uuidSchema,
  slug: primitives_1.slugSchema,
  name: zod_1.z.string(),
  logoUrl: zod_1.z.string().nullable(),
});
exports.publicBrandListItemSchema = exports.publicBrandSchema.extend({
  productCount: zod_1.z.number().int(),
});
exports.createBrandSchema = zod_1.z
  .object({
    slug: primitives_1.slugSchema.optional(),
    name: zod_1.z.string().trim().min(2).max(140),
    logoKey: zod_1.z.string().trim().min(1).max(2048).optional(),
    isActive: zod_1.z.boolean().default(true),
  })
  .strict();
exports.updateBrandSchema = zod_1.z
  .object({
    slug: primitives_1.slugSchema.optional(),
    name: zod_1.z.string().trim().min(2).max(140).optional(),
    logoKey: zod_1.z.string().trim().min(1).max(2048).nullable().optional(),
    isActive: zod_1.z.boolean().optional(),
  })
  .strict()
  .refine((value) => Object.keys(value).length > 0, "At least one field is required");
exports.publicProductImageSchema = zod_1.z.object({
  id: primitives_1.uuidSchema,
  url: zod_1.z.string(),
  altText: zod_1.z.string().nullable(),
  sortOrder: zod_1.z.number().int(),
  isPrimary: zod_1.z.boolean(),
});
const productVariantResponseSchema = zod_1.z.object({
  id: primitives_1.uuidSchema,
  sku: zod_1.z.string(),
  nameEn: zod_1.z.string(),
  nameAr: zod_1.z.string(),
  price: primitives_1.piastresSchema,
  shadeHex: zod_1.z.string().nullable(),
});
exports.publicProductVariantSchema = productVariantResponseSchema.extend({
  stock: zod_1.z.number().int().nonnegative(),
});
exports.publicProductSchema = zod_1.z.object({
  id: primitives_1.uuidSchema,
  slug: primitives_1.slugSchema,
  nameEn: zod_1.z.string(),
  nameAr: zod_1.z.string(),
  descriptionEn: zod_1.z.string().nullable(),
  descriptionAr: zod_1.z.string().nullable(),
  ingredients: zod_1.z.string().nullable(),
  howToUse: zod_1.z.string().nullable(),
  skinType: zod_1.z.array(exports.skinTypeEnum),
  basePrice: primitives_1.piastresSchema,
  compareAtPrice: primitives_1.piastresSchema.nullable(),
  rating: zod_1.z.number().min(0).max(5),
  reviewCount: zod_1.z.number().int().nonnegative(),
  imageUrl: zod_1.z.string().nullable(),
  category: exports.publicCategorySchema.omit({ productCount: true }),
  brand: exports.publicBrandSchema.nullable(),
  variants: zod_1.z.array(exports.publicProductVariantSchema),
  images: zod_1.z.array(exports.publicProductImageSchema),
  ingredientDetails: zod_1.z.array(ingredient_schema_1.ingredientSummarySchema),
});
exports.adminProductVariantSchema = productVariantResponseSchema.extend({
  barcode: zod_1.z.string().nullable(),
  priceOverride: primitives_1.piastresSchema.nullable(),
  isActive: zod_1.z.boolean(),
  createdAt: zod_1.z.date(),
});
exports.adminProductImageSchema = exports.publicProductImageSchema.extend({
  objectKey: zod_1.z.string(),
});
exports.adminProductSchema = exports.publicProductSchema.extend({
  /** Shipping attributes — kilograms and centimetres. Null when unmeasured. */
  weight: zod_1.z.number().nullable(),
  height: zod_1.z.number().nullable(),
  width: zod_1.z.number().nullable(),
  length: zod_1.z.number().nullable(),
  isActive: zod_1.z.boolean(),
  publishedAt: zod_1.z.date().nullable(),
  createdAt: zod_1.z.date(),
  updatedAt: zod_1.z.date(),
  deletedAt: zod_1.z.date().nullable(),
  variants: zod_1.z.array(exports.adminProductVariantSchema),
  images: zod_1.z.array(exports.adminProductImageSchema),
});
//# sourceMappingURL=product.schema.js.map
