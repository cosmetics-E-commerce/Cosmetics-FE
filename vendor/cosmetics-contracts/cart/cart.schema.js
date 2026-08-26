"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartSchema = exports.cartItemSchema = exports.updateCartItemSchema = exports.addCartItemSchema = exports.cartItemStatusEnum = exports.cartOwnerEnum = void 0;
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
exports.updateCartItemSchema = zod_1.z
    .object({
    quantity: zod_1.z.number().int().min(1).max(99),
})
    .strict();
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
exports.cartSchema = zod_1.z.object({
    cartId: zod_1.z.string().nullable(),
    owner: exports.cartOwnerEnum,
    items: zod_1.z.array(exports.cartItemSchema),
    subtotal: primitives_1.piastresSchema,
    discountTotal: primitives_1.piastresSchema,
    estimatedTotal: primitives_1.piastresSchema,
    totalSavings: primitives_1.piastresSchema,
    couponCode: zod_1.z.string().nullable(),
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
    updatedAt: zod_1.z.string(),
});
//# sourceMappingURL=cart.schema.js.map