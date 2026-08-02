"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.receiveBatchSchema = exports.publicProductResponseSchema = exports.publicCategoryResponseSchema = exports.updateProductSchema = exports.createProductSchema = exports.productVariantInputSchema = exports.skinTypeEnum = void 0;
const zod_1 = require("zod");
const primitives_1 = require("../common/primitives");
exports.skinTypeEnum = zod_1.z.enum(['OILY', 'DRY', 'COMBINATION', 'SENSITIVE', 'NORMAL', 'ALL']);
exports.productVariantInputSchema = zod_1.z.object({
    sku: zod_1.z.string().trim().min(1).max(64),
    nameEn: zod_1.z.string().trim().min(1).max(100),
    nameAr: zod_1.z.string().trim().min(1).max(100),
    barcode: zod_1.z.string().trim().max(64).optional(),
    priceOverride: primitives_1.piastresSchema.optional(),
    /** Swatch colour for shade variants, e.g. "#C21807". */
    shadeHex: zod_1.z
        .string()
        .regex(/^#[0-9a-fA-F]{6}$/, 'Must be a hex colour like #C21807')
        .optional(),
});
exports.createProductSchema = zod_1.z.object({
    categoryId: primitives_1.uuidSchema,
    brandId: primitives_1.uuidSchema.optional(),
    slug: primitives_1.slugSchema,
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
    variants: zod_1.z.array(exports.productVariantInputSchema).min(1, 'A product needs at least one variant'),
});
exports.updateProductSchema = exports.createProductSchema.partial().omit({ variants: true });
/** Minimal public catalogue projections shared with storefront clients. */
exports.publicCategoryResponseSchema = zod_1.z.object({
    id: primitives_1.uuidSchema,
    slug: primitives_1.slugSchema,
    nameEn: zod_1.z.string(),
    nameAr: zod_1.z.string(),
    imageUrl: zod_1.z.string().url().nullable(),
    productCount: zod_1.z.number().int().nonnegative(),
});
exports.publicProductResponseSchema = zod_1.z.object({
    id: primitives_1.uuidSchema,
    slug: primitives_1.slugSchema,
    nameEn: zod_1.z.string(),
    nameAr: zod_1.z.string(),
    basePrice: primitives_1.piastresSchema,
    imageUrl: zod_1.z.string().url().nullable(),
    category: exports.publicCategoryResponseSchema.pick({
        id: true,
        slug: true,
        nameEn: true,
        nameAr: true,
    }),
    brand: zod_1.z.object({
        id: primitives_1.uuidSchema,
        name: zod_1.z.string(),
    }).nullable(),
});
/** Receiving stock — expiry is mandatory for cosmetics. PLAN.md §10.2. */
exports.receiveBatchSchema = zod_1.z.object({
    variantId: primitives_1.uuidSchema,
    batchNumber: zod_1.z.string().trim().min(1).max(64),
    manufacturedAt: zod_1.z.coerce.date().optional(),
    expiresAt: zod_1.z.coerce.date(),
    paoMonths: zod_1.z.number().int().positive().max(120).optional(),
    quantity: zod_1.z.number().int().positive(),
    costPrice: primitives_1.piastresSchema,
}).refine((v) => v.expiresAt > new Date(), {
    message: 'Cannot receive stock that has already expired',
    path: ['expiresAt'],
}).refine((v) => !v.manufacturedAt || v.manufacturedAt < v.expiresAt, {
    message: 'Manufacture date must precede expiry date',
    path: ['manufacturedAt'],
});
//# sourceMappingURL=product.schema.js.map