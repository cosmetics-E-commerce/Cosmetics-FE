"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.merchandisingProductQuerySchema = exports.adminProductSchema = exports.adminProductImageSchema = exports.adminProductVariantSchema = exports.publicProductSchema = exports.publicProductVariantSchema = exports.publicProductOptionSchema = exports.publicProductOptionValueSchema = exports.publicProductImageSchema = exports.updateBrandSchema = exports.createBrandSchema = exports.publicBrandListItemSchema = exports.publicBrandSchema = exports.updateCategorySchema = exports.createCategorySchema = exports.publicCategorySchema = exports.adminProductQuerySchema = exports.publicBrandQuerySchema = exports.catalogFacetSchema = exports.catalogFacetQuerySchema = exports.publicProductIdsQuerySchema = exports.publicCatalogQuerySchema = exports.receiveBatchSchema = exports.reassignArchivedCategoryProductsSchema = exports.reassignArchivedProductSchema = exports.updateProductSchema = exports.productVariantUpdateSchema = exports.createProductSchema = exports.productDimensionsInputSchema = exports.productOptionInputSchema = exports.productOptionValueInputSchema = exports.productImageInputSchema = exports.productVariantInputSchema = exports.catalogEntityOptionSchema = exports.catalogEntityOptionQuerySchema = exports.updateTagSchema = exports.createTagSchema = exports.tagQuerySchema = exports.adminTagSchema = exports.tagSummarySchema = exports.variantOpeningStockSchema = exports.PRODUCT_VARIANT_LIMIT = exports.PRODUCT_OPTION_VALUE_LIMIT = exports.PRODUCT_OPTION_LIMIT = exports.PRODUCT_GALLERY_LIMIT = exports.skinTypeEnum = void 0;
const zod_1 = require("zod");
const image_reference_schema_1 = require("../media/image-reference.schema");
const primitives_1 = require("../common/primitives");
const pagination_1 = require("../common/pagination");
const ingredient_schema_1 = require("../ingredients/ingredient.schema");
exports.skinTypeEnum = zod_1.z.enum([
    "OILY",
    "DRY",
    "COMBINATION",
    "SENSITIVE",
    "NORMAL",
    "ALL",
]);
exports.PRODUCT_GALLERY_LIMIT = 20;
exports.PRODUCT_OPTION_LIMIT = 4;
exports.PRODUCT_OPTION_VALUE_LIMIT = 20;
exports.PRODUCT_VARIANT_LIMIT = 200;
exports.variantOpeningStockSchema = zod_1.z
    .object({
    quantity: zod_1.z.number().int().positive().max(1_000_000),
    expiresAt: zod_1.z.coerce.date(),
    costPrice: primitives_1.databasePiastresSchema,
    batchNumber: zod_1.z.string().trim().min(1).max(64).optional(),
})
    .refine((value) => value.expiresAt > new Date(), {
    message: "Opening stock expiry date must be in the future",
    path: ["expiresAt"],
});
const skinTypeQuerySchema = zod_1.z.preprocess((value) => {
    if (value === undefined)
        return undefined;
    if (Array.isArray(value))
        return value;
    return String(value)
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
}, zod_1.z.array(exports.skinTypeEnum).optional());
const tagSlugQuerySchema = zod_1.z.preprocess((value) => {
    if (value === undefined)
        return undefined;
    if (Array.isArray(value))
        return value;
    return String(value)
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
}, zod_1.z.array(primitives_1.slugSchema).max(20).optional());
const brandSlugQuerySchema = zod_1.z.preprocess((value) => {
    if (value === undefined)
        return undefined;
    if (Array.isArray(value))
        return value;
    return String(value)
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
}, zod_1.z.array(primitives_1.slugSchema).max(20).transform((items) => [...new Set(items)]).optional());
const booleanQuerySchema = zod_1.z.preprocess((value) => {
    if (value === undefined || value === "")
        return undefined;
    if (value === true || value === "true" || value === "1")
        return true;
    if (value === false || value === "false" || value === "0")
        return false;
    return value;
}, zod_1.z.boolean().optional());
exports.tagSummarySchema = zod_1.z.object({
    id: primitives_1.uuidSchema,
    name: zod_1.z.string(),
    slug: primitives_1.slugSchema,
});
exports.adminTagSchema = exports.tagSummarySchema.extend({
    normalizedName: zod_1.z.string(),
    productCount: zod_1.z.number().int().nonnegative(),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date(),
});
exports.tagQuerySchema = pagination_1.paginationQuerySchema.extend({
    search: zod_1.z.string().trim().min(1).max(80).optional(),
    sortBy: zod_1.z.enum(["name", "createdAt", "productCount"]).default("name"),
});
exports.createTagSchema = zod_1.z
    .object({ name: zod_1.z.string().trim().min(1).max(80) })
    .strict();
exports.updateTagSchema = exports.createTagSchema;
exports.catalogEntityOptionQuerySchema = pagination_1.paginationQuerySchema.extend({
    search: zod_1.z.string().trim().min(1).max(120).optional(),
    rootsOnly: booleanQuerySchema,
    maxDepth: zod_1.z.coerce.number().int().min(1).max(3).optional(),
});
exports.catalogEntityOptionSchema = zod_1.z.object({
    id: primitives_1.uuidSchema,
    slug: primitives_1.slugSchema,
    label: zod_1.z.string(),
    secondaryLabel: zod_1.z.string().nullable(),
    parentId: primitives_1.uuidSchema.nullable().optional(),
    pathEn: zod_1.z.string().optional(),
    pathAr: zod_1.z.string().optional(),
});
exports.productVariantInputSchema = zod_1.z.object({
    id: primitives_1.uuidSchema.optional(),
    sku: (0, primitives_1.compactIdentifierSchema)(1, 64),
    nameEn: zod_1.z.string().trim().min(1).max(100),
    nameAr: zod_1.z.string().trim().min(1).max(100),
    barcode: zod_1.z.string().trim().max(64).optional(),
    priceOverride: primitives_1.databasePiastresSchema.optional(),
    compareAtPrice: primitives_1.databasePiastresSchema.positive().optional(),
    optionValueIds: zod_1.z.array(primitives_1.uuidSchema).max(exports.PRODUCT_OPTION_LIMIT).optional(),
    /** Swatch colour for shade variants, e.g. "#C21807". */
    shadeHex: zod_1.z
        .string()
        .regex(/^#[0-9a-fA-F]{6}$/, "Must be a hex colour like #C21807")
        .optional(),
    /** Optional first receipt for a newly created variant. Uses the inventory batch ledger. */
    openingStock: exports.variantOpeningStockSchema.optional(),
});
function validateUniqueVariantSkus(variants, context) {
    const seen = new Set();
    variants.forEach((variant, index) => {
        if (!variant.sku)
            return;
        const identity = variant.sku.normalize("NFKC").toLocaleUpperCase("en-US");
        if (seen.has(identity)) {
            context.addIssue({
                code: zod_1.z.ZodIssueCode.custom,
                path: ["variants", index, "sku"],
                message: "Each variant SKU must be unique.",
            });
        }
        seen.add(identity);
    });
}
exports.productImageInputSchema = zod_1.z.object({
    id: primitives_1.uuidSchema.optional(),
    variantId: primitives_1.uuidSchema.nullable().optional(),
    objectKey: image_reference_schema_1.imageReferenceValueSchema,
    altText: zod_1.z.string().trim().max(180).optional(),
    sortOrder: zod_1.z.number().int().min(0).default(0),
    isPrimary: zod_1.z.boolean().default(false),
});
exports.productOptionValueInputSchema = zod_1.z.object({
    id: primitives_1.uuidSchema,
    valueEn: zod_1.z.string().trim().min(1).max(100),
    valueAr: zod_1.z.string().trim().min(1).max(100),
    position: zod_1.z.number().int().min(0),
    metadata: zod_1.z
        .record(zod_1.z.union([zod_1.z.string(), zod_1.z.number(), zod_1.z.boolean(), zod_1.z.null()]))
        .optional(),
});
exports.productOptionInputSchema = zod_1.z.object({
    id: primitives_1.uuidSchema,
    nameEn: zod_1.z.string().trim().min(1).max(100),
    nameAr: zod_1.z.string().trim().min(1).max(100),
    position: zod_1.z.number().int().min(0),
    values: zod_1.z
        .array(exports.productOptionValueInputSchema)
        .min(1)
        .max(exports.PRODUCT_OPTION_VALUE_LIMIT),
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
    /** Canonical product-category assignments. Duplicate IDs are normalized. */
    categoryIds: zod_1.z
        .array(primitives_1.uuidSchema)
        .min(1, "Select at least one category")
        .max(50)
        .transform((ids) => [...new Set(ids)])
        .optional(),
    /** @deprecated Send categoryIds instead. */
    categoryId: primitives_1.uuidSchema.optional(),
    brandId: primitives_1.uuidSchema.optional(),
    slug: primitives_1.slugSchema.optional(),
    nameEn: zod_1.z.string().trim().min(2).max(200),
    nameAr: zod_1.z.string().trim().min(2).max(200),
    shortDescriptionEn: zod_1.z.string().trim().max(240).optional(),
    shortDescriptionAr: zod_1.z.string().trim().max(240).optional(),
    descriptionEn: zod_1.z.string().trim().max(5000).optional(),
    descriptionAr: zod_1.z.string().trim().max(5000).optional(),
    /** Allergen disclosure — a regulatory expectation for cosmetics. */
    ingredients: zod_1.z.string().trim().max(5000).optional(),
    /** @deprecated Compatibility field; new clients should send howToUseEn. */
    howToUse: zod_1.z.string().trim().max(2000).optional(),
    howToUseEn: zod_1.z.string().trim().max(2000).optional(),
    howToUseAr: zod_1.z.string().trim().max(2000).optional(),
    skinType: zod_1.z.array(exports.skinTypeEnum).default([]),
    tagIds: zod_1.z.array(primitives_1.uuidSchema).max(50).optional(),
    basePrice: primitives_1.databasePiastresSchema.positive(),
    compareAtPrice: primitives_1.databasePiastresSchema.positive().optional(),
    isActive: zod_1.z.boolean().default(false),
    publishedAt: zod_1.z.coerce.date().nullable().optional(),
    variants: zod_1.z
        .array(exports.productVariantInputSchema)
        .min(1, "A product needs at least one variant")
        .max(exports.PRODUCT_VARIANT_LIMIT),
    options: zod_1.z
        .array(exports.productOptionInputSchema)
        .max(exports.PRODUCT_OPTION_LIMIT)
        .optional(),
    images: zod_1.z
        .array(exports.productImageInputSchema)
        .max(exports.PRODUCT_GALLERY_LIMIT)
        .default([]),
    ingredientLinks: zod_1.z.array(ingredient_schema_1.productIngredientInputSchema).max(300).optional(),
});
exports.createProductSchema = productBaseSchema
    .refine((v) => Boolean(v.categoryIds?.length || v.categoryId), {
    message: "Select at least one category",
    path: ["categoryIds"],
})
    .refine((v) => v.compareAtPrice === undefined || v.compareAtPrice > v.basePrice, {
    message: "Compare-at price must be greater than base price",
    path: ["compareAtPrice"],
})
    .superRefine((value, context) => validateUniqueVariantSkus(value.variants, context));
exports.productVariantUpdateSchema = zod_1.z.union([
    exports.productVariantInputSchema.extend({
        isActive: zod_1.z.boolean().optional(),
    }),
    exports.productVariantInputSchema.partial().extend({
        id: primitives_1.uuidSchema,
        barcode: zod_1.z.string().trim().max(64).nullable().optional(),
        priceOverride: primitives_1.databasePiastresSchema.nullable().optional(),
        compareAtPrice: primitives_1.databasePiastresSchema.positive().nullable().optional(),
        shadeHex: zod_1.z
            .string()
            .regex(/^#[0-9a-fA-F]{6}$/, "Must be a hex colour like #C21807")
            .nullable()
            .optional(),
        isActive: zod_1.z.boolean().optional(),
    }),
]);
exports.updateProductSchema = zod_1.z
    .object({
    categoryIds: zod_1.z
        .array(primitives_1.uuidSchema)
        .min(1, "Select at least one category")
        .max(50)
        .transform((ids) => [...new Set(ids)])
        .optional(),
    /** @deprecated Send categoryIds instead. */
    categoryId: primitives_1.uuidSchema.optional(),
    brandId: primitives_1.uuidSchema.nullable().optional(),
    slug: primitives_1.slugSchema.optional(),
    nameEn: zod_1.z.string().trim().min(2).max(200).optional(),
    nameAr: zod_1.z.string().trim().min(2).max(200).optional(),
    shortDescriptionEn: zod_1.z.string().trim().max(240).nullable().optional(),
    shortDescriptionAr: zod_1.z.string().trim().max(240).nullable().optional(),
    descriptionEn: zod_1.z.string().trim().max(5000).optional(),
    descriptionAr: zod_1.z.string().trim().max(5000).optional(),
    ingredients: zod_1.z.string().trim().max(5000).optional(),
    /** @deprecated Compatibility field; new clients should send howToUseEn. */
    howToUse: zod_1.z.string().trim().max(2000).optional(),
    howToUseEn: zod_1.z.string().trim().max(2000).nullable().optional(),
    howToUseAr: zod_1.z.string().trim().max(2000).nullable().optional(),
    skinType: zod_1.z.array(exports.skinTypeEnum).optional(),
    tagIds: zod_1.z.array(primitives_1.uuidSchema).max(50).optional(),
    basePrice: primitives_1.databasePiastresSchema.positive().optional(),
    compareAtPrice: primitives_1.databasePiastresSchema.positive().nullable().optional(),
    weight: zod_1.z.number().nonnegative().max(1000).nullable().optional(),
    height: zod_1.z.number().nonnegative().max(500).nullable().optional(),
    width: zod_1.z.number().nonnegative().max(500).nullable().optional(),
    length: zod_1.z.number().nonnegative().max(500).nullable().optional(),
    isActive: zod_1.z.boolean().optional(),
    publishedAt: zod_1.z.coerce.date().nullable().optional(),
    options: zod_1.z
        .array(exports.productOptionInputSchema)
        .max(exports.PRODUCT_OPTION_LIMIT)
        .optional(),
    variants: zod_1.z
        .array(exports.productVariantUpdateSchema)
        .min(1, "A product needs at least one variant")
        .max(exports.PRODUCT_VARIANT_LIMIT)
        .optional(),
    images: zod_1.z
        .array(exports.productImageInputSchema)
        .max(exports.PRODUCT_GALLERY_LIMIT)
        .optional(),
    ingredientLinks: zod_1.z.array(ingredient_schema_1.productIngredientInputSchema).max(300).optional(),
})
    .superRefine((value, context) => {
    if (value.variants)
        validateUniqueVariantSkus(value.variants, context);
});
exports.reassignArchivedProductSchema = zod_1.z
    .object({ categoryId: primitives_1.uuidSchema })
    .strict();
exports.reassignArchivedCategoryProductsSchema = zod_1.z
    .object({ targetCategoryId: primitives_1.uuidSchema.optional() })
    .strict();
/** Receiving stock — expiry is mandatory for cosmetics. PLAN.md §10.2. */
exports.receiveBatchSchema = zod_1.z
    .object({
    variantId: primitives_1.uuidSchema,
    batchNumber: zod_1.z.string().trim().min(1).max(64),
    manufacturedAt: zod_1.z.coerce.date().optional(),
    expiresAt: zod_1.z.coerce.date(),
    paoMonths: zod_1.z.number().int().positive().max(120).optional(),
    quantity: zod_1.z.number().int().positive(),
    costPrice: primitives_1.databasePiastresSchema,
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
    brandSlugs: brandSlugQuerySchema,
    skinType: skinTypeQuerySchema,
    tags: tagSlugQuerySchema,
    inStock: booleanQuerySchema,
    minPrice: zod_1.z.coerce.number().int().nonnegative().optional(),
    maxPrice: zod_1.z.coerce.number().int().nonnegative().optional(),
    sortBy: zod_1.z.enum(["createdAt", "basePrice", "nameEn"]).default("createdAt"),
})
    .refine((v) => v.minPrice === undefined ||
    v.maxPrice === undefined ||
    v.minPrice <= v.maxPrice, {
    message: "minPrice must be less than or equal to maxPrice",
    path: ["minPrice"],
});
exports.publicProductIdsQuerySchema = zod_1.z.object({
    ids: zod_1.z.preprocess((value) => typeof value === "string"
        ? value
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean)
        : value, zod_1.z
        .array(primitives_1.uuidSchema)
        .min(1)
        .max(24)
        .transform((ids) => [...new Set(ids)])),
});
exports.catalogFacetQuerySchema = zod_1.z
    .object({
    search: zod_1.z.string().trim().min(1).max(120).optional(),
    categorySlug: primitives_1.slugSchema.optional(),
    brandSlug: primitives_1.slugSchema.optional(),
    skinType: skinTypeQuerySchema,
    tags: tagSlugQuerySchema,
    inStock: booleanQuerySchema,
    minPrice: zod_1.z.coerce.number().int().nonnegative().optional(),
    maxPrice: zod_1.z.coerce.number().int().nonnegative().optional(),
})
    .refine((value) => value.minPrice === undefined ||
    value.maxPrice === undefined ||
    value.minPrice <= value.maxPrice, { message: "minPrice must be less than or equal to maxPrice", path: ["minPrice"] });
exports.catalogFacetSchema = zod_1.z.object({
    brands: zod_1.z.array(zod_1.z.object({
        id: primitives_1.uuidSchema,
        slug: primitives_1.slugSchema,
        name: zod_1.z.string(),
        logoUrl: zod_1.z.string().nullable(),
        count: zod_1.z.number().int().nonnegative(),
    })),
    tags: zod_1.z.array(exports.tagSummarySchema.extend({ count: zod_1.z.number().int().nonnegative() })),
    categories: zod_1.z.array(zod_1.z.object({
        id: primitives_1.uuidSchema,
        parentId: primitives_1.uuidSchema.nullable(),
        slug: primitives_1.slugSchema,
        nameEn: zod_1.z.string(),
        nameAr: zod_1.z.string(),
        count: zod_1.z.number().int().nonnegative(),
    })),
    price: zod_1.z.object({
        min: primitives_1.piastresSchema.nullable(),
        max: primitives_1.piastresSchema.nullable(),
    }),
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
    tags: tagSlugQuerySchema,
    minPrice: zod_1.z.coerce.number().int().nonnegative().optional(),
    maxPrice: zod_1.z.coerce.number().int().nonnegative().optional(),
    sortBy: zod_1.z
        .enum(["createdAt", "updatedAt", "basePrice", "nameEn"])
        .default("createdAt"),
})
    .refine((v) => v.minPrice === undefined ||
    v.maxPrice === undefined ||
    v.minPrice <= v.maxPrice, {
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
    /** Historical direct-assignment count retained for API compatibility. */
    productCount: zod_1.z.number().int(),
    directProductCount: zod_1.z.number().int().optional(),
    aggregateProductCount: zod_1.z.number().int().optional(),
});
exports.createCategorySchema = zod_1.z
    .object({
    parentId: primitives_1.uuidSchema.optional(),
    slug: primitives_1.slugSchema.optional(),
    nameEn: zod_1.z.string().trim().min(2).max(140),
    nameAr: zod_1.z.string().trim().min(2).max(140),
    imageKey: image_reference_schema_1.imageReferenceValueSchema.optional(),
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
    imageKey: image_reference_schema_1.imageReferenceValueSchema.nullable().optional(),
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
    logoKey: image_reference_schema_1.imageReferenceValueSchema.optional(),
    isActive: zod_1.z.boolean().default(true),
})
    .strict();
exports.updateBrandSchema = zod_1.z
    .object({
    slug: primitives_1.slugSchema.optional(),
    name: zod_1.z.string().trim().min(2).max(140).optional(),
    logoKey: image_reference_schema_1.imageReferenceValueSchema.nullable().optional(),
    isActive: zod_1.z.boolean().optional(),
})
    .strict()
    .refine((value) => Object.keys(value).length > 0, "At least one field is required");
exports.publicProductImageSchema = zod_1.z.object({
    id: primitives_1.uuidSchema,
    variantId: primitives_1.uuidSchema.nullable(),
    url: zod_1.z.string(),
    altText: zod_1.z.string().nullable(),
    sortOrder: zod_1.z.number().int(),
    isPrimary: zod_1.z.boolean(),
});
exports.publicProductOptionValueSchema = zod_1.z.object({
    id: primitives_1.uuidSchema,
    valueEn: zod_1.z.string(),
    valueAr: zod_1.z.string(),
    position: zod_1.z.number().int(),
    metadata: zod_1.z.record(zod_1.z.unknown()).nullable(),
});
exports.publicProductOptionSchema = zod_1.z.object({
    id: primitives_1.uuidSchema,
    nameEn: zod_1.z.string(),
    nameAr: zod_1.z.string(),
    position: zod_1.z.number().int(),
    values: zod_1.z.array(exports.publicProductOptionValueSchema),
});
const productVariantResponseSchema = zod_1.z.object({
    id: primitives_1.uuidSchema,
    sku: zod_1.z.string(),
    nameEn: zod_1.z.string(),
    nameAr: zod_1.z.string(),
    price: primitives_1.piastresSchema,
    compareAtPrice: primitives_1.piastresSchema.nullable(),
    shadeHex: zod_1.z.string().nullable(),
    optionValues: zod_1.z.array(exports.publicProductOptionValueSchema),
    images: zod_1.z.array(exports.publicProductImageSchema),
});
exports.publicProductVariantSchema = productVariantResponseSchema.extend({
    stock: zod_1.z.number().int().nonnegative(),
});
exports.publicProductSchema = zod_1.z.object({
    id: primitives_1.uuidSchema,
    slug: primitives_1.slugSchema,
    nameEn: zod_1.z.string(),
    nameAr: zod_1.z.string(),
    shortDescriptionEn: zod_1.z.string().nullable(),
    shortDescriptionAr: zod_1.z.string().nullable(),
    descriptionEn: zod_1.z.string().nullable(),
    descriptionAr: zod_1.z.string().nullable(),
    ingredients: zod_1.z.string().nullable(),
    howToUse: zod_1.z.string().nullable(),
    howToUseEn: zod_1.z.string().nullable().optional(),
    howToUseAr: zod_1.z.string().nullable().optional(),
    skinType: zod_1.z.array(exports.skinTypeEnum),
    tags: zod_1.z.array(exports.tagSummarySchema),
    basePrice: primitives_1.piastresSchema,
    compareAtPrice: primitives_1.piastresSchema.nullable(),
    rating: zod_1.z.number().min(0).max(5),
    reviewCount: zod_1.z.number().int().nonnegative(),
    imageUrl: zod_1.z.string().nullable(),
    category: exports.publicCategorySchema.omit({
        productCount: true,
        directProductCount: true,
        aggregateProductCount: true,
    }),
    categories: zod_1.z.array(exports.publicCategorySchema.omit({
        productCount: true,
        directProductCount: true,
        aggregateProductCount: true,
    })),
    brand: exports.publicBrandSchema.nullable(),
    options: zod_1.z.array(exports.publicProductOptionSchema),
    variants: zod_1.z.array(exports.publicProductVariantSchema),
    images: zod_1.z.array(exports.publicProductImageSchema),
    ingredientDetails: zod_1.z.array(ingredient_schema_1.ingredientSummarySchema),
});
exports.adminProductVariantSchema = productVariantResponseSchema.extend({
    barcode: zod_1.z.string().nullable(),
    priceOverride: primitives_1.piastresSchema.nullable(),
    stock: zod_1.z.number().int().nonnegative(),
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
exports.merchandisingProductQuerySchema = zod_1.z.object({
    section: zod_1.z.string().trim().min(1).max(64).default("default"),
    limit: zod_1.z.coerce.number().int().positive().max(20).default(8),
    categorySlug: primitives_1.slugSchema.optional(),
    excludeProductId: primitives_1.uuidSchema.optional(),
});
//# sourceMappingURL=product.schema.js.map