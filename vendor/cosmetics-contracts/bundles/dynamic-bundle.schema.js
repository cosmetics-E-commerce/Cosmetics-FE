"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bundleListResponseSchema = exports.bundleSummarySchema = exports.bundlePreviewResponseSchema = exports.bundleLinePricingSchema = exports.bundleSlotProductsQuerySchema = exports.bundleListQuerySchema = exports.addDynamicBundleToCartSchema = exports.previewDynamicBundleSchema = exports.bundleSelectionSchema = exports.dynamicBundleRevisionActionSchema = exports.updateDynamicBundleDraftSchema = exports.createDynamicBundleSchema = exports.dynamicBundleDefinitionSchema = exports.bundleDiscountSchema = exports.bundleSlotSchema = exports.bundleRuleSchema = exports.dynamicBundleTypeSchema = exports.dynamicBundleStateSchema = void 0;
const zod_1 = require("zod");
const pagination_1 = require("../common/pagination");
const primitives_1 = require("../common/primitives");
const promotion_schema_1 = require("../promotions/promotion.schema");
const page_builder_schema_1 = require("../page-builder/page-builder.schema");
exports.dynamicBundleStateSchema = zod_1.z.enum([
    "DRAFT",
    "ACTIVE",
    "PAUSED",
    "ARCHIVED",
]);
exports.dynamicBundleTypeSchema = zod_1.z.enum(["FIXED", "DYNAMIC"]);
exports.bundleRuleSchema = zod_1.z
    .object({
    id: primitives_1.uuidSchema,
    field: zod_1.z.enum([
        "CATEGORY",
        "BRAND",
        "PRODUCT",
        "TAG",
        "ROUTINE_ROLE",
        "VARIANT",
    ]),
    operator: zod_1.z.enum(["IS", "IS_NOT", "INCLUDES_DESCENDANTS"]),
    values: zod_1.z
        .array(zod_1.z.union([primitives_1.uuidSchema, zod_1.z.string().trim().min(1).max(120)]))
        .min(1)
        .max(1_000),
})
    .strict()
    .superRefine((rule, context) => {
    if (rule.operator === "INCLUDES_DESCENDANTS" && rule.field !== "CATEGORY") {
        context.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            path: ["operator"],
            message: "Descendant matching is available only for Category rules.",
        });
    }
    if (["CATEGORY", "BRAND", "PRODUCT", "TAG", "VARIANT"].includes(rule.field)) {
        for (const [index, value] of rule.values.entries()) {
            if (!primitives_1.uuidSchema.safeParse(value).success)
                context.addIssue({
                    code: zod_1.z.ZodIssueCode.custom,
                    path: ["values", index],
                    message: `${rule.field} rules require canonical UUID identifiers.`,
                });
        }
    }
});
exports.bundleSlotSchema = zod_1.z
    .object({
    id: primitives_1.uuidSchema,
    key: zod_1.z
        .string()
        .trim()
        .toLowerCase()
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
        .max(80),
    internalName: zod_1.z.string().trim().min(1).max(120),
    label: page_builder_schema_1.landingPageLocalizedTextSchema,
    description: page_builder_schema_1.landingPageLocalizedTextSchema,
    required: zod_1.z.boolean().default(true),
    quantity: zod_1.z
        .object({
        minimum: zod_1.z.number().int().min(0).max(50),
        maximum: zod_1.z.number().int().min(1).max(50),
    })
        .strict(),
    mode: zod_1.z.enum(["RULE_BASED", "CURATED", "HYBRID"]),
    match: zod_1.z.enum(["ALL", "ANY"]).default("ALL"),
    rules: zod_1.z.array(exports.bundleRuleSchema).max(40).default([]),
    curatedProductIds: zod_1.z.array(primitives_1.uuidSchema).max(10_000).default([]),
    pinnedProductIds: zod_1.z.array(primitives_1.uuidSchema).max(500).default([]),
    allowSameProduct: zod_1.z.boolean().default(false),
    order: zod_1.z.number().int().min(0).max(1_000),
})
    .strict()
    .superRefine((slot, context) => {
    if (slot.quantity.maximum < slot.quantity.minimum) {
        context.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            path: ["quantity", "maximum"],
            message: "Maximum quantity must be at least the minimum quantity.",
        });
    }
    if (slot.required && slot.quantity.minimum < 1) {
        context.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            path: ["quantity", "minimum"],
            message: "A required slot must require at least one item.",
        });
    }
    if (slot.mode !== "CURATED" && slot.rules.length === 0) {
        context.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            path: ["rules"],
            message: "Rule-based and hybrid slots require at least one rule.",
        });
    }
    if (slot.mode === "CURATED" && slot.curatedProductIds.length === 0) {
        context.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            path: ["curatedProductIds"],
            message: "Curated slots require at least one Product.",
        });
    }
});
exports.bundleDiscountSchema = zod_1.z.discriminatedUnion("type", [
    zod_1.z
        .object({
        type: zod_1.z.literal("PERCENT_OFF"),
        basisPoints: zod_1.z.number().int().min(1).max(10_000),
        maximumDiscount: primitives_1.piastresSchema.positive().nullable().default(null),
    })
        .strict(),
    zod_1.z
        .object({
        type: zod_1.z.literal("FIXED_OFF"),
        amount: primitives_1.piastresSchema.positive(),
    })
        .strict(),
    zod_1.z
        .object({
        type: zod_1.z.literal("FIXED_TOTAL"),
        total: primitives_1.piastresSchema.nonnegative(),
    })
        .strict(),
    zod_1.z
        .object({
        type: zod_1.z.literal("CHEAPEST_PERCENT_OFF"),
        basisPoints: zod_1.z.number().int().min(1).max(10_000),
        quantity: zod_1.z.number().int().min(1).max(50).default(1),
    })
        .strict(),
    zod_1.z
        .object({
        type: zod_1.z.literal("CHEAPEST_FREE"),
        quantity: zod_1.z.number().int().min(1).max(50).default(1),
    })
        .strict(),
]);
exports.dynamicBundleDefinitionSchema = zod_1.z
    .object({
    schemaVersion: zod_1.z.literal(1).default(1),
    type: exports.dynamicBundleTypeSchema.default("DYNAMIC"),
    name: page_builder_schema_1.landingPageLocalizedTextSchema,
    description: page_builder_schema_1.landingPageLocalizedTextSchema,
    instructions: page_builder_schema_1.landingPageLocalizedTextSchema,
    terms: page_builder_schema_1.landingPageLocalizedTextSchema,
    cardMediaKey: zod_1.z.string().trim().max(2_048).nullable().default(null),
    heroMediaKey: zod_1.z.string().trim().max(2_048).nullable().default(null),
    slots: zod_1.z.array(exports.bundleSlotSchema).min(1).max(20),
    discount: exports.bundleDiscountSchema,
    minimumRetailSubtotal: primitives_1.piastresSchema
        .nonnegative()
        .nullable()
        .default(null),
    stacking: promotion_schema_1.promotionStackingEnum,
    combinableWith: zod_1.z.array(primitives_1.uuidSchema).max(1_000).default([]),
    allowMultipleInstances: zod_1.z.boolean().default(true),
    allowCrossSlotProductReuse: zod_1.z.boolean().default(false),
    usage: zod_1.z
        .object({
        total: zod_1.z.number().int().positive().nullable().default(null),
        perCustomer: zod_1.z.number().int().positive().nullable().default(null),
        uniqueCustomers: zod_1.z.number().int().positive().nullable().default(null),
    })
        .strict()
        .default({}),
    presentation: zod_1.z
        .object({
        badge: page_builder_schema_1.landingPageLocalizedTextSchema.default({ en: "", ar: "" }),
        showRetailTotal: zod_1.z.boolean().default(true),
        showSavings: zod_1.z.boolean().default(true),
        indexable: zod_1.z.boolean().default(false),
    })
        .strict()
        .default({}),
})
    .strict()
    .superRefine((definition, context) => {
    const keys = new Set();
    const ids = new Set();
    for (const [index, slot] of definition.slots.entries()) {
        if (keys.has(slot.key)) {
            context.addIssue({
                code: zod_1.z.ZodIssueCode.custom,
                path: ["slots", index, "key"],
                message: "Slot keys must be unique.",
            });
        }
        if (ids.has(slot.id)) {
            context.addIssue({
                code: zod_1.z.ZodIssueCode.custom,
                path: ["slots", index, "id"],
                message: "Slot IDs must be unique.",
            });
        }
        keys.add(slot.key);
        ids.add(slot.id);
    }
    if (!definition.slots.some((slot) => slot.required)) {
        context.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            path: ["slots"],
            message: "A bundle requires at least one required Slot.",
        });
    }
});
const dynamicBundleDraftFieldsSchema = zod_1.z
    .object({
    internalName: zod_1.z.string().trim().min(2).max(180),
    slug: zod_1.z
        .string()
        .trim()
        .toLowerCase()
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
        .max(140),
    definition: exports.dynamicBundleDefinitionSchema,
    startsAt: zod_1.z.string().datetime({ offset: true }).nullable().default(null),
    endsAt: zod_1.z.string().datetime({ offset: true }).nullable().default(null),
    pageId: primitives_1.uuidSchema.nullable().default(null),
})
    .strict();
exports.createDynamicBundleSchema = dynamicBundleDraftFieldsSchema.superRefine((value, context) => {
    if (value.startsAt &&
        value.endsAt &&
        Date.parse(value.startsAt) >= Date.parse(value.endsAt)) {
        context.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            path: ["endsAt"],
            message: "End time must be after start time.",
        });
    }
});
exports.updateDynamicBundleDraftSchema = dynamicBundleDraftFieldsSchema
    .partial()
    .extend({ expectedRevision: zod_1.z.number().int().positive() })
    .strict();
exports.dynamicBundleRevisionActionSchema = zod_1.z
    .object({ expectedRevision: zod_1.z.number().int().positive() })
    .strict();
exports.bundleSelectionSchema = zod_1.z
    .object({
    slotKey: zod_1.z.string().trim().min(1).max(80),
    productId: primitives_1.uuidSchema,
    variantId: primitives_1.uuidSchema,
    quantity: zod_1.z.number().int().min(1).max(50),
})
    .strict();
exports.previewDynamicBundleSchema = zod_1.z
    .object({
    selections: zod_1.z.array(exports.bundleSelectionSchema).max(100),
    couponCode: zod_1.z.string().trim().max(64).nullable().default(null),
    expectedVersion: zod_1.z.number().int().positive().optional(),
    diagnostic: zod_1.z.boolean().default(false),
})
    .strict();
exports.addDynamicBundleToCartSchema = exports.previewDynamicBundleSchema.extend({
    clientMutationId: zod_1.z.string().uuid(),
});
exports.bundleListQuerySchema = pagination_1.paginationQuerySchema.extend({
    state: exports.dynamicBundleStateSchema.optional(),
    search: zod_1.z.string().trim().max(180).optional(),
});
exports.bundleSlotProductsQuerySchema = pagination_1.paginationQuerySchema.extend({
    search: zod_1.z.string().trim().max(180).optional(),
    brandId: primitives_1.uuidSchema.optional(),
    categoryId: primitives_1.uuidSchema.optional(),
    minPrice: zod_1.z.coerce.number().int().nonnegative().optional(),
    maxPrice: zod_1.z.coerce.number().int().nonnegative().optional(),
    inStock: zod_1.z.coerce.boolean().default(true),
    sort: zod_1.z
        .enum(["RECOMMENDED", "NEWEST", "PRICE_LOW", "PRICE_HIGH", "NAME"])
        .default("RECOMMENDED"),
});
exports.bundleLinePricingSchema = zod_1.z.object({
    slotKey: zod_1.z.string(),
    productId: primitives_1.uuidSchema,
    variantId: primitives_1.uuidSchema,
    quantity: zod_1.z.number().int().positive(),
    unitPrice: primitives_1.piastresSchema,
    retailTotal: primitives_1.piastresSchema,
    discount: primitives_1.piastresSchema,
    finalTotal: primitives_1.piastresSchema,
});
exports.bundlePreviewResponseSchema = zod_1.z.object({
    valid: zod_1.z.boolean(),
    bundleId: primitives_1.uuidSchema,
    version: zod_1.z.number().int().positive(),
    state: zod_1.z.enum(["INCOMPLETE", "VALID", "INVALID", "STALE"]),
    missingSlots: zod_1.z.array(zod_1.z.string()),
    errors: zod_1.z.array(zod_1.z.object({
        code: zod_1.z.string(),
        slotKey: zod_1.z.string().nullable(),
        message: page_builder_schema_1.landingPageLocalizedTextSchema,
    })),
    lines: zod_1.z.array(exports.bundleLinePricingSchema),
    retailTotal: primitives_1.piastresSchema,
    discountTotal: primitives_1.piastresSchema,
    finalTotal: primitives_1.piastresSchema,
    stacking: promotion_schema_1.promotionStackingEnum,
    diagnostics: zod_1.z.array(zod_1.z.string()).optional(),
});
exports.bundleSummarySchema = zod_1.z.object({
    id: primitives_1.uuidSchema,
    internalName: zod_1.z.string(),
    slug: zod_1.z.string(),
    state: exports.dynamicBundleStateSchema,
    draftRevision: zod_1.z.number().int().positive(),
    publishedRevision: zod_1.z.number().int().positive().nullable(),
    name: page_builder_schema_1.landingPageLocalizedTextSchema,
    slotCount: zod_1.z.number().int().nonnegative(),
    discountLabel: page_builder_schema_1.landingPageLocalizedTextSchema,
    startsAt: zod_1.z.string().datetime().nullable(),
    endsAt: zod_1.z.string().datetime().nullable(),
    health: zod_1.z.enum(["HEALTHY", "WARNING", "BROKEN"]),
    updatedAt: zod_1.z.string().datetime(),
});
exports.bundleListResponseSchema = (0, pagination_1.paginated)(exports.bundleSummarySchema);
//# sourceMappingURL=dynamic-bundle.schema.js.map