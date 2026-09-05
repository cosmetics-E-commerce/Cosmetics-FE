"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.promotionOverviewSchema = exports.promotionRedemptionListSchema = exports.promotionRedemptionSchema = exports.promotionRedemptionQuerySchema = exports.promotionAnalyticsSchema = exports.permanentDeletePromotionResponseSchema = exports.permanentDeletePromotionSchema = exports.promotionListResponseSchema = exports.promotionResponseSchema = exports.promotionEvaluationSchema = exports.appliedPromotionSchema = exports.couponInputSchema = exports.promotionPreviewSchema = exports.promotionLineSchema = exports.promotionQuerySchema = exports.updatePromotionSchema = exports.createPromotionSchema = exports.couponConfigurationSchema = exports.promotionDisplaySchema = exports.promotionLimitsSchema = exports.promotionTargetsSchema = exports.promotionActionSchema = exports.promotionConditionSchema = exports.promotionSelectorSchema = exports.promotionStackingEnum = exports.promotionResolvedStatusEnum = exports.promotionStateEnum = exports.promotionTriggerEnum = exports.promotionTypeEnum = void 0;
const zod_1 = require("zod");
const pagination_1 = require("../common/pagination");
const primitives_1 = require("../common/primitives");
const databaseIntSchema = zod_1.z.number().int().max(primitives_1.DATABASE_INT_MAX);
const uniqueUuidArray = zod_1.z
    .array(primitives_1.uuidSchema)
    .max(10_000)
    .refine((values) => new Set(values).size === values.length, {
    message: "Duplicate target IDs are not allowed.",
});
exports.promotionTypeEnum = zod_1.z.enum([
    "PRODUCT_DISCOUNT",
    "CART_DISCOUNT",
    "BUY_X_GET_Y",
    "BUNDLE",
    "QUANTITY_TIER",
    "SPEND_TIER",
    "FREE_SHIPPING",
    "FREE_GIFT",
    "FLASH_SALE",
]);
exports.promotionTriggerEnum = zod_1.z.enum(["AUTOMATIC", "CODE"]);
exports.promotionStateEnum = zod_1.z.enum([
    "DRAFT",
    "ACTIVE",
    "PAUSED",
    "ARCHIVED",
]);
exports.promotionResolvedStatusEnum = zod_1.z.enum([
    "DRAFT",
    "SCHEDULED",
    "ACTIVE",
    "PAUSED",
    "EXPIRED",
    "EXHAUSTED",
    "ARCHIVED",
]);
exports.promotionStackingEnum = zod_1.z.enum([
    "EXCLUSIVE",
    "COMBINABLE",
    "BEST_OFFER",
]);
const promotionSelectorShape = {
    productIds: uniqueUuidArray.default([]),
    variantIds: uniqueUuidArray.default([]),
    categoryIds: uniqueUuidArray.default([]),
    brandIds: uniqueUuidArray.default([]),
    excludedProductIds: uniqueUuidArray.default([]),
    excludedVariantIds: uniqueUuidArray.default([]),
    excludedCategoryIds: uniqueUuidArray.default([]),
    excludedBrandIds: uniqueUuidArray.default([]),
};
function validateSelectorOverlap(value, context) {
    const pairs = [
        ["productIds", "excludedProductIds"],
        ["variantIds", "excludedVariantIds"],
        ["categoryIds", "excludedCategoryIds"],
        ["brandIds", "excludedBrandIds"],
    ];
    for (const [includedKey, excludedKey] of pairs) {
        const excluded = new Set(value[excludedKey]);
        if (value[includedKey].some((id) => excluded.has(id))) {
            context.addIssue({
                code: zod_1.z.ZodIssueCode.custom,
                path: [excludedKey],
                message: "The same target cannot be both included and excluded.",
            });
        }
    }
}
exports.promotionSelectorSchema = zod_1.z
    .object(promotionSelectorShape)
    .superRefine(validateSelectorOverlap);
const numericOperatorEnum = zod_1.z.enum(["GT", "GTE", "LT", "LTE", "EQ"]);
const quantityConditionSchema = zod_1.z.object({
    type: zod_1.z.literal("QUANTITY"),
    operator: numericOperatorEnum.default("GTE"),
    value: zod_1.z.number().int().positive(),
    selector: exports.promotionSelectorSchema.optional(),
});
exports.promotionConditionSchema = zod_1.z.discriminatedUnion("type", [
    zod_1.z.object({
        type: zod_1.z.literal("SUBTOTAL"),
        operator: numericOperatorEnum.default("GTE"),
        value: primitives_1.piastresSchema,
    }),
    quantityConditionSchema,
    zod_1.z.object({ type: zod_1.z.literal("HAS_ITEMS"), selector: exports.promotionSelectorSchema }),
    zod_1.z.object({
        type: zod_1.z.literal("MISSING_ITEMS"),
        selector: exports.promotionSelectorSchema,
    }),
    zod_1.z.object({
        type: zod_1.z.literal("CUSTOMER_TYPE"),
        value: zod_1.z.enum([
            "EVERYONE",
            "AUTHENTICATED",
            "GUEST",
            "FIRST_ORDER",
            "RETURNING",
            "VIP",
        ]),
    }),
    zod_1.z.object({
        type: zod_1.z.literal("CUSTOMER"),
        customerIds: zod_1.z.array(primitives_1.uuidSchema).min(1),
    }),
    zod_1.z.object({
        type: zod_1.z.literal("PAST_ORDER_COUNT"),
        operator: numericOperatorEnum.default("GTE"),
        value: zod_1.z.number().int().nonnegative(),
    }),
    zod_1.z.object({
        type: zod_1.z.literal("LIFETIME_SPEND"),
        operator: numericOperatorEnum.default("GTE"),
        value: primitives_1.piastresSchema,
    }),
    zod_1.z.object({
        type: zod_1.z.literal("INACTIVE_DAYS"),
        operator: numericOperatorEnum.default("GTE"),
        value: zod_1.z.number().int().positive(),
    }),
    zod_1.z.object({
        type: zod_1.z.literal("COUPON_ENTERED"),
        code: zod_1.z.string().trim().toUpperCase().min(3).max(64).optional(),
    }),
    zod_1.z.object({
        type: zod_1.z.literal("PAYMENT_METHOD"),
        values: zod_1.z.array(zod_1.z.string().min(1)).min(1),
    }),
    zod_1.z.object({
        type: zod_1.z.literal("GOVERNORATE"),
        values: zod_1.z.array(zod_1.z.string().min(1)).min(1),
    }),
]);
const cappedAction = {
    maxDiscount: primitives_1.piastresSchema.optional(),
    selector: exports.promotionSelectorSchema.optional(),
};
const tierSchema = zod_1.z.object({
    threshold: databaseIntSchema.positive(),
    value: databaseIntSchema.positive(),
});
exports.promotionActionSchema = zod_1.z.discriminatedUnion("type", [
    zod_1.z.object({
        type: zod_1.z.literal("PERCENT_OFF"),
        value: zod_1.z.number().int().min(1).max(10_000),
        ...cappedAction,
    }),
    zod_1.z.object({
        type: zod_1.z.literal("FIXED_OFF"),
        value: primitives_1.piastresSchema.positive(),
        ...cappedAction,
    }),
    zod_1.z.object({
        type: zod_1.z.literal("PRICE_OVERRIDE"),
        price: primitives_1.piastresSchema,
        selector: exports.promotionSelectorSchema.optional(),
    }),
    zod_1.z.object({
        type: zod_1.z.literal("CHEAPEST_FREE"),
        quantity: zod_1.z.number().int().positive().default(1),
        selector: exports.promotionSelectorSchema.optional(),
    }),
    zod_1.z.object({
        type: zod_1.z.literal("ITEM_PERCENT_OFF"),
        value: zod_1.z.number().int().min(1).max(10_000),
        ...cappedAction,
    }),
    zod_1.z.object({
        type: zod_1.z.literal("ITEM_FIXED_OFF"),
        value: primitives_1.piastresSchema.positive(),
        ...cappedAction,
    }),
    zod_1.z.object({ type: zod_1.z.literal("FREE_SHIPPING") }),
    zod_1.z.object({
        type: zod_1.z.literal("BUY_X_GET_Y"),
        buyQuantity: zod_1.z.number().int().positive(),
        rewardQuantity: zod_1.z.number().int().positive().default(1),
        rewardPercentOff: zod_1.z.number().int().min(1).max(10_000).default(10_000),
        qualifier: exports.promotionSelectorSchema.optional(),
        reward: exports.promotionSelectorSchema.optional(),
        strategy: zod_1.z.enum(["CHEAPEST", "HIGHEST"]).default("CHEAPEST"),
    }),
    zod_1.z.object({
        type: zod_1.z.literal("BUNDLE_PRICE"),
        price: primitives_1.piastresSchema,
        items: zod_1.z
            .array(zod_1.z.object({
            variantId: primitives_1.uuidSchema.optional(),
            productId: primitives_1.uuidSchema.optional(),
            quantity: zod_1.z.number().int().positive(),
        }))
            .min(2),
    }),
    zod_1.z.object({
        type: zod_1.z.literal("QUANTITY_TIERS"),
        tiers: zod_1.z
            .array(tierSchema.extend({ value: zod_1.z.number().int().min(1).max(10_000) }))
            .min(1),
        selector: exports.promotionSelectorSchema.optional(),
    }),
    zod_1.z.object({
        type: zod_1.z.literal("SPEND_TIERS"),
        tiers: zod_1.z
            .array(tierSchema.extend({ value: zod_1.z.number().int().min(1).max(10_000) }))
            .min(1),
    }),
    zod_1.z.object({
        type: zod_1.z.literal("FREE_GIFT"),
        variantIds: zod_1.z.array(primitives_1.uuidSchema).min(1),
        quantity: zod_1.z.number().int().positive().default(1),
        customerChooses: zod_1.z.boolean().default(false),
    }),
]);
exports.promotionTargetsSchema = zod_1.z
    .object({
    ...promotionSelectorShape,
    customerIds: uniqueUuidArray.default([]),
})
    .superRefine(validateSelectorOverlap);
exports.promotionLimitsSchema = zod_1.z
    .object({
    totalUses: databaseIntSchema.positive().nullable().default(null),
    uniqueCustomers: databaseIntSchema.positive().nullable().default(null),
    usesPerCustomer: databaseIntSchema.positive().nullable().default(null),
    discountedUnits: databaseIntSchema.positive().nullable().default(null),
    maximumTotalDiscount: primitives_1.piastresSchema.positive().nullable().default(null),
})
    .default({});
exports.promotionDisplaySchema = zod_1.z
    .object({
    badgeText: zod_1.z.string().trim().max(48).nullable().default(null),
    showCountdown: zod_1.z.boolean().default(false),
    showOnOffers: zod_1.z.boolean().default(true),
    placement: zod_1.z.enum(["OFFERS_PAGE", "HOME_HERO"]).default("OFFERS_PAGE"),
    featured: zod_1.z.boolean().default(false),
    bannerImageKey: zod_1.z.string().trim().max(2048).nullable().default(null),
})
    .default({});
exports.couponConfigurationSchema = zod_1.z
    .object({
    codes: zod_1.z
        .array((0, primitives_1.compactIdentifierSchema)(3, 64).transform((value) => value.toUpperCase()))
        .max(500)
        .default([]),
    generateCount: zod_1.z.number().int().min(0).max(500).default(0),
    prefix: (0, primitives_1.compactIdentifierSchema)(0, 12)
        .transform((value) => value.toUpperCase())
        .default(""),
})
    .superRefine((value, context) => {
    if (new Set(value.codes).size !== value.codes.length) {
        context.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            path: ["codes"],
            message: "Equivalent coupon codes are not allowed.",
        });
    }
})
    .optional();
exports.createPromotionSchema = zod_1.z
    .object({
    name: zod_1.z.string().trim().min(2).max(180),
    internalDescription: zod_1.z.string().trim().max(3000).nullable().optional(),
    customerTitle: zod_1.z.string().trim().min(2).max(180),
    customerDescription: zod_1.z.string().trim().max(3000).nullable().optional(),
    type: exports.promotionTypeEnum,
    trigger: exports.promotionTriggerEnum.default("AUTOMATIC"),
    state: exports.promotionStateEnum.default("DRAFT"),
    priority: zod_1.z.number().int().min(-10_000).max(10_000).default(100),
    stacking: exports.promotionStackingEnum.default("EXCLUSIVE"),
    combinableWith: zod_1.z.array(exports.promotionTypeEnum).default([]),
    startsAt: zod_1.z.string().datetime().nullable().default(null),
    endsAt: zod_1.z.string().datetime().nullable().default(null),
    timezone: zod_1.z.string().trim().min(1).max(80).default("Africa/Cairo"),
    conditions: zod_1.z.array(exports.promotionConditionSchema).max(30).default([]),
    actions: zod_1.z.array(exports.promotionActionSchema).min(1).max(20),
    targets: exports.promotionTargetsSchema.default({}),
    limits: exports.promotionLimitsSchema,
    display: exports.promotionDisplaySchema,
    coupon: exports.couponConfigurationSchema,
})
    .strict()
    .superRefine((value, context) => {
    if (value.startsAt &&
        value.endsAt &&
        new Date(value.startsAt) >= new Date(value.endsAt)) {
        context.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            path: ["endsAt"],
            message: "End time must be after start time.",
        });
    }
    if (value.trigger === "CODE" &&
        (!value.coupon ||
            (value.coupon.codes.length === 0 && value.coupon.generateCount === 0))) {
        context.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            path: ["coupon"],
            message: "Code promotions require coupon configuration.",
        });
    }
});
exports.updatePromotionSchema = exports.createPromotionSchema
    .innerType()
    .partial();
exports.promotionQuerySchema = pagination_1.paginationQuerySchema.extend({
    search: zod_1.z.string().trim().max(120).optional(),
    type: exports.promotionTypeEnum.optional(),
    status: exports.promotionResolvedStatusEnum.optional(),
    trigger: exports.promotionTriggerEnum.optional(),
    sortBy: zod_1.z
        .enum(["createdAt", "updatedAt", "priority", "startsAt", "usedCount"])
        .default("createdAt"),
});
exports.promotionLineSchema = zod_1.z.object({
    variantId: primitives_1.uuidSchema,
    productId: primitives_1.uuidSchema,
    categoryId: primitives_1.uuidSchema,
    categoryIds: zod_1.z.array(primitives_1.uuidSchema).default([]),
    brandId: primitives_1.uuidSchema.nullable(),
    name: zod_1.z.string(),
    unitPrice: primitives_1.piastresSchema,
    quantity: zod_1.z.number().int().positive().max(10_000),
});
exports.promotionPreviewSchema = zod_1.z.object({
    promotion: exports.createPromotionSchema.innerType().optional(),
    customerId: primitives_1.uuidSchema.nullable().default(null),
    couponCode: zod_1.z.string().trim().toUpperCase().max(64).nullable().default(null),
    shippingCost: primitives_1.piastresSchema.default(0),
    governorate: zod_1.z.string().trim().nullable().default(null),
    paymentMethod: zod_1.z.string().trim().nullable().default(null),
    lines: zod_1.z.array(exports.promotionLineSchema).min(1).max(100),
    diagnostic: zod_1.z.boolean().default(true),
});
exports.couponInputSchema = zod_1.z.object({
    code: zod_1.z.string().trim().toUpperCase().min(3).max(64),
});
exports.appliedPromotionSchema = zod_1.z.object({
    id: primitives_1.uuidSchema,
    name: zod_1.z.string(),
    title: zod_1.z.string(),
    type: exports.promotionTypeEnum,
    couponCode: zod_1.z.string().nullable(),
    discountAmount: primitives_1.piastresSchema,
    shippingDiscount: primitives_1.piastresSchema,
    discountedUnits: zod_1.z.number().int().nonnegative(),
    message: zod_1.z.string(),
});
exports.promotionEvaluationSchema = zod_1.z.object({
    originalSubtotal: primitives_1.piastresSchema,
    itemDiscount: primitives_1.piastresSchema,
    shippingDiscount: primitives_1.piastresSchema,
    subtotalAfterDiscount: primitives_1.piastresSchema,
    shippingAfterDiscount: primitives_1.piastresSchema,
    total: primitives_1.piastresSchema,
    totalSavings: primitives_1.piastresSchema,
    lineDiscounts: zod_1.z.array(zod_1.z.object({
        variantId: primitives_1.uuidSchema,
        discount: primitives_1.piastresSchema,
        discountedLineTotal: primitives_1.piastresSchema,
    })),
    appliedPromotions: zod_1.z.array(exports.appliedPromotionSchema),
    gifts: zod_1.z.array(zod_1.z.object({
        variantId: primitives_1.uuidSchema,
        quantity: zod_1.z.number().int().positive(),
        customerChooses: zod_1.z.boolean(),
        promotionId: primitives_1.uuidSchema,
    })),
    messages: zod_1.z.array(zod_1.z.string()),
    diagnostics: zod_1.z
        .array(zod_1.z.object({
        promotionId: primitives_1.uuidSchema,
        name: zod_1.z.string(),
        eligible: zod_1.z.boolean(),
        reasons: zod_1.z.array(zod_1.z.string()),
    }))
        .optional(),
});
exports.promotionResponseSchema = zod_1.z.object({
    id: primitives_1.uuidSchema,
    name: zod_1.z.string(),
    internalDescription: zod_1.z.string().nullable(),
    customerTitle: zod_1.z.string(),
    customerDescription: zod_1.z.string().nullable(),
    type: exports.promotionTypeEnum,
    trigger: exports.promotionTriggerEnum,
    state: exports.promotionStateEnum,
    status: exports.promotionResolvedStatusEnum,
    priority: zod_1.z.number().int(),
    stacking: exports.promotionStackingEnum,
    combinableWith: zod_1.z.array(zod_1.z.string()),
    startsAt: zod_1.z.string().nullable(),
    endsAt: zod_1.z.string().nullable(),
    timezone: zod_1.z.string(),
    conditions: zod_1.z.array(exports.promotionConditionSchema),
    actions: zod_1.z.array(exports.promotionActionSchema),
    targets: exports.promotionTargetsSchema,
    limits: exports.promotionLimitsSchema,
    display: exports.promotionDisplaySchema,
    coupons: zod_1.z.array(zod_1.z.object({
        id: primitives_1.uuidSchema,
        code: zod_1.z.string(),
        usedCount: zod_1.z.number().int(),
        uniqueCustomerCount: zod_1.z.number().int().nonnegative(),
        usageLimitTotal: zod_1.z.number().int().nullable(),
        usageLimitUniqueCustomers: zod_1.z.number().int().nullable(),
    })),
    usedCount: zod_1.z.number().int(),
    uniqueCustomerCount: zod_1.z.number().int().nonnegative(),
    discountGranted: primitives_1.piastresSchema,
    discountedUnits: zod_1.z.number().int(),
    createdAt: zod_1.z.string(),
    updatedAt: zod_1.z.string(),
    createdBy: zod_1.z.object({
        id: primitives_1.uuidSchema,
        name: zod_1.z.string(),
    }),
    summary: zod_1.z.string(),
});
exports.promotionListResponseSchema = (0, pagination_1.paginated)(exports.promotionResponseSchema);
exports.permanentDeletePromotionSchema = zod_1.z
    .object({ confirmation: zod_1.z.literal("DELETE") })
    .strict();
exports.permanentDeletePromotionResponseSchema = zod_1.z.object({
    ok: zod_1.z.literal(true),
    preservedHistory: zod_1.z.object({
        orderSnapshots: zod_1.z.number().int().nonnegative(),
        redemptionSnapshots: zod_1.z.number().int().nonnegative(),
        couponRedemptions: zod_1.z.number().int().nonnegative(),
    }),
    detachedConfiguration: zod_1.z.object({
        coupons: zod_1.z.number().int().nonnegative(),
        banners: zod_1.z.number().int().nonnegative(),
        popupCampaigns: zod_1.z.number().int().nonnegative(),
    }),
});
exports.promotionAnalyticsSchema = zod_1.z.object({
    promotionId: primitives_1.uuidSchema,
    redemptions: zod_1.z.number().int(),
    uniqueCustomers: zod_1.z.number().int(),
    generatedOrders: zod_1.z.number().int(),
    revenue: primitives_1.piastresSchema,
    discountGranted: primitives_1.piastresSchema,
    averageOrderValue: primitives_1.piastresSchema,
    remainingUses: zod_1.z.number().int().nullable(),
    remainingUniqueCustomers: zod_1.z.number().int().nullable(),
    usageByDate: zod_1.z.array(zod_1.z.object({
        date: zod_1.z.string(),
        redemptions: zod_1.z.number().int(),
        revenue: primitives_1.piastresSchema,
        discount: primitives_1.piastresSchema,
    })),
});
exports.promotionRedemptionQuerySchema = pagination_1.paginationQuerySchema.extend({
    search: zod_1.z.string().trim().max(120).optional(),
    sortBy: zod_1.z.enum(["createdAt", "discountAmount"]).default("createdAt"),
});
exports.promotionRedemptionSchema = zod_1.z.object({
    id: primitives_1.uuidSchema,
    customer: zod_1.z.object({
        id: primitives_1.uuidSchema,
        name: zod_1.z.string(),
        email: zod_1.z.string().nullable(),
        phone: zod_1.z.string(),
    }),
    order: zod_1.z.object({
        id: primitives_1.uuidSchema,
        orderNumber: zod_1.z.string(),
        status: zod_1.z.string(),
    }),
    couponCode: zod_1.z.string().nullable(),
    discountAmount: primitives_1.piastresSchema,
    shippingDiscount: primitives_1.piastresSchema,
    status: zod_1.z.literal("REDEEMED"),
    redeemedAt: zod_1.z.string(),
});
exports.promotionRedemptionListSchema = (0, pagination_1.paginated)(exports.promotionRedemptionSchema);
exports.promotionOverviewSchema = zod_1.z.object({
    total: zod_1.z.number().int().nonnegative(),
    active: zod_1.z.number().int().nonnegative(),
    scheduled: zod_1.z.number().int().nonnegative(),
    draft: zod_1.z.number().int().nonnegative(),
    paused: zod_1.z.number().int().nonnegative(),
    expired: zod_1.z.number().int().nonnegative(),
    exhausted: zod_1.z.number().int().nonnegative(),
    redemptions: zod_1.z.number().int().nonnegative(),
    discountGranted: primitives_1.piastresSchema,
});
//# sourceMappingURL=promotion.schema.js.map