"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bulkMoveSavedResponseSchema = exports.cartSchema = exports.cartBundleInstanceSchema = exports.cartBundleLineSchema = exports.cartItemSchema = exports.savedMoveResultSchema = exports.moveSavedItemsSchema = exports.savedForLaterItemSchema = exports.savedForLaterPriceChangeEnum = exports.savedForLaterStatusEnum = exports.updateCartItemSchema = exports.addCartItemsSchema = exports.addCartItemSchema = exports.cartItemStatusEnum = exports.cartOwnerEnum = void 0;
const zod_1 = require("zod");
const primitives_1 = require("../common/primitives");
const promotion_schema_1 = require("../promotions/promotion.schema");
exports.cartOwnerEnum = zod_1.z.enum(["GUEST", "USER"]);
exports.cartItemStatusEnum = zod_1.z.enum([
    "AVAILABLE",
    "OUT_OF_STOCK",
    "NOT_SELLABLE",
]);
exports.addCartItemSchema = zod_1.z
    .object({
    variantId: primitives_1.uuidSchema,
    quantity: zod_1.z.number().int().min(1).max(99).default(1),
})
    .strict();
exports.addCartItemsSchema = zod_1.z
    .object({
    items: zod_1.z.array(exports.addCartItemSchema).min(1).max(20),
})
    .strict();
exports.updateCartItemSchema = zod_1.z
    .object({
    quantity: zod_1.z.number().int().min(1).max(99),
})
    .strict();
exports.savedForLaterStatusEnum = zod_1.z.enum([
    "AVAILABLE",
    "OUT_OF_STOCK",
    "VARIANT_UNAVAILABLE",
    "PRODUCT_UNAVAILABLE",
]);
exports.savedForLaterPriceChangeEnum = zod_1.z.enum([
    "UNCHANGED",
    "INCREASED",
    "DECREASED",
    "UNAVAILABLE",
]);
exports.savedForLaterItemSchema = zod_1.z.object({
    id: primitives_1.uuidSchema,
    productId: primitives_1.uuidSchema.nullable(),
    variantId: primitives_1.uuidSchema.nullable(),
    slug: zod_1.z.string(),
    productNameEn: zod_1.z.string(),
    productNameAr: zod_1.z.string(),
    variantNameEn: zod_1.z.string(),
    variantNameAr: zod_1.z.string(),
    brandName: zod_1.z.string().nullable(),
    imageUrl: zod_1.z.string().nullable(),
    desiredQuantity: zod_1.z.number().int().min(1).max(99),
    priceWhenSaved: primitives_1.piastresSchema,
    currentPrice: primitives_1.piastresSchema.nullable(),
    priceChange: exports.savedForLaterPriceChangeEnum,
    available: zod_1.z.number().int().nonnegative(),
    maxAvailable: zod_1.z.number().int().nonnegative(),
    status: exports.savedForLaterStatusEnum,
    savedAt: zod_1.z.string(),
    issues: zod_1.z.array(zod_1.z.string()),
});
exports.moveSavedItemsSchema = zod_1.z
    .object({
    itemIds: zod_1.z.array(primitives_1.uuidSchema).min(1).max(100).optional(),
})
    .strict();
exports.savedMoveResultSchema = zod_1.z.object({
    itemId: primitives_1.uuidSchema,
    status: zod_1.z.enum([
        "MOVED",
        "OUT_OF_STOCK",
        "VARIANT_UNAVAILABLE",
        "PRODUCT_UNAVAILABLE",
        "INSUFFICIENT_STOCK",
    ]),
    available: zod_1.z.number().int().nonnegative(),
    requested: zod_1.z.number().int().nonnegative(),
});
exports.cartItemSchema = zod_1.z.object({
    variantId: primitives_1.uuidSchema,
    productId: primitives_1.uuidSchema,
    slug: zod_1.z.string(),
    productNameEn: zod_1.z.string(),
    productNameAr: zod_1.z.string(),
    variantNameEn: zod_1.z.string(),
    variantNameAr: zod_1.z.string(),
    variantOptions: zod_1.z.array(zod_1.z.object({
        optionId: primitives_1.uuidSchema,
        optionNameEn: zod_1.z.string(),
        optionNameAr: zod_1.z.string(),
        valueId: primitives_1.uuidSchema,
        valueEn: zod_1.z.string(),
        valueAr: zod_1.z.string(),
    })),
    sku: zod_1.z.string(),
    imageUrl: zod_1.z.string().nullable(),
    categoryId: primitives_1.uuidSchema,
    categoryIds: zod_1.z.array(primitives_1.uuidSchema),
    brandId: primitives_1.uuidSchema.nullable(),
    unitPrice: primitives_1.piastresSchema,
    quantity: zod_1.z.number().int().positive(),
    lineTotal: primitives_1.piastresSchema,
    discount: primitives_1.piastresSchema,
    discountedLineTotal: primitives_1.piastresSchema,
    available: zod_1.z.number().int().nonnegative(),
    maxAvailable: zod_1.z.number().int().nonnegative(),
    status: exports.cartItemStatusEnum,
    issues: zod_1.z.array(zod_1.z.string()),
});
exports.cartBundleLineSchema = zod_1.z.object({
    variantId: primitives_1.uuidSchema,
    slotKey: zod_1.z.string().min(1),
    participatingQuantity: zod_1.z.number().int().positive(),
    allocatedDiscount: primitives_1.piastresSchema,
});
exports.cartBundleInstanceSchema = zod_1.z.object({
    id: primitives_1.uuidSchema,
    bundleId: primitives_1.uuidSchema,
    slug: zod_1.z.string().min(1),
    version: zod_1.z.number().int().positive(),
    name: zod_1.z.object({ en: zod_1.z.string(), ar: zod_1.z.string() }),
    stacking: zod_1.z.enum(["EXCLUSIVE", "COMBINABLE", "BEST_OFFER"]),
    retailTotal: primitives_1.piastresSchema,
    discountTotal: primitives_1.piastresSchema,
    finalTotal: primitives_1.piastresSchema,
    status: zod_1.z.enum(["VALID", "REQUIRES_REVIEW", "INVALID"]),
    issues: zod_1.z.array(zod_1.z.string()),
    lines: zod_1.z.array(exports.cartBundleLineSchema),
});
exports.cartSchema = zod_1.z.object({
    cartId: zod_1.z.string().nullable(),
    owner: exports.cartOwnerEnum,
    items: zod_1.z.array(exports.cartItemSchema),
    subtotal: primitives_1.piastresSchema,
    discountTotal: primitives_1.piastresSchema,
    estimatedTotal: primitives_1.piastresSchema,
    totalSavings: primitives_1.piastresSchema,
    couponCode: zod_1.z.string().nullable(),
    couponInvalidation: zod_1.z
        .object({
        code: zod_1.z.literal("PROMO_NOT_APPLICABLE"),
        promoCode: zod_1.z.string(),
    })
        .nullable()
        .default(null),
    appliedPromotions: zod_1.z.array(promotion_schema_1.appliedPromotionSchema),
    promotionMessages: zod_1.z.array(zod_1.z.string()),
    giftOptions: zod_1.z.array(zod_1.z.object({
        variantId: primitives_1.uuidSchema,
        quantity: zod_1.z.number().int().positive(),
        customerChooses: zod_1.z.boolean(),
        promotionId: primitives_1.uuidSchema,
    })),
    totalQuantity: zod_1.z.number().int().nonnegative(),
    hasIssues: zod_1.z.boolean(),
    savedForLater: zod_1.z.array(exports.savedForLaterItemSchema).optional(),
    savedForLaterCount: zod_1.z.number().int().nonnegative().optional(),
    bundleInstances: zod_1.z.array(exports.cartBundleInstanceSchema).default([]),
    bundleDiscountTotal: primitives_1.piastresSchema.default(0),
    updatedAt: zod_1.z.string(),
});
exports.bulkMoveSavedResponseSchema = zod_1.z.object({
    cart: exports.cartSchema,
    results: zod_1.z.array(exports.savedMoveResultSchema),
    movedCount: zod_1.z.number().int().nonnegative(),
});
//# sourceMappingURL=cart.schema.js.map