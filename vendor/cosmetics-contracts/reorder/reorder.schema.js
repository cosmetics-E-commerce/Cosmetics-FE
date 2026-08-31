"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reorderEventInputSchema = exports.reorderOrderPreviewSchema = exports.reorderCartInputSchema = exports.reorderGlobalPreferenceSchema = exports.reorderSnoozeSchema = exports.reorderCategoryPolicySchema = exports.reorderProductPolicySchema = exports.reorderEligibilitySchema = exports.reorderConfigPublishSchema = exports.reorderConfigDraftSchema = exports.reorderPolicySchema = exports.reorderOpportunityStateSchema = exports.reorderConfidenceSchema = void 0;
const zod_1 = require("zod");
const primitives_1 = require("../common/primitives");
exports.reorderConfidenceSchema = zod_1.z.enum([
    "INSUFFICIENT",
    "LOW",
    "MEDIUM",
    "HIGH",
]);
exports.reorderOpportunityStateSchema = zod_1.z.enum([
    "NOT_ELIGIBLE",
    "EARLY",
    "READY",
    "SNOOZED",
    "SUPPRESSED",
    "OUT_OF_STOCK",
    "RECENTLY_PURCHASED",
    "IN_CART",
    "ACTIVE_ORDER",
]);
exports.reorderPolicySchema = zod_1.z
    .object({
    engineEnabled: zod_1.z.boolean(),
    smartSuggestionsEnabled: zod_1.z.boolean(),
    minimumPersonalizedPurchases: zod_1.z.number().int().min(2).max(10),
    minimumIntervalDays: zod_1.z.number().int().min(1).max(90),
    maximumIntervalDays: zod_1.z.number().int().min(30).max(730),
    recentPurchaseSuppressionDays: zod_1.z.number().int().min(1).max(90),
    reminderCooldownDays: zod_1.z.number().int().min(1).max(180),
    snoozeOptionsDays: zod_1.z.array(zod_1.z.number().int().min(1).max(180)).min(1).max(6),
    maximumSuggestionsPerPeriod: zod_1.z.number().int().min(1).max(20),
    frequencyPeriodDays: zod_1.z.number().int().min(1).max(90),
    surfaceLimit: zod_1.z.number().int().min(1).max(12),
    windowLeadPercent: zod_1.z.number().int().min(0).max(50),
    windowGracePercent: zod_1.z.number().int().min(5).max(100),
    highConsistencyPermille: zod_1.z.number().int().min(20).max(500),
    mediumConsistencyPermille: zod_1.z.number().int().min(50).max(1000),
    aggregateMinimumCohort: zod_1.z.number().int().min(10).max(10_000),
    scheduledBatchSize: zod_1.z.number().int().min(25).max(2_000),
    cartSuppressionEnabled: zod_1.z.boolean(),
    activeOrderSuppressionEnabled: zod_1.z.boolean(),
})
    .superRefine((value, ctx) => {
    if (value.minimumIntervalDays >= value.maximumIntervalDays)
        ctx.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            path: ["maximumIntervalDays"],
            message: "Maximum interval must be greater than minimum interval.",
        });
    if (value.highConsistencyPermille >= value.mediumConsistencyPermille)
        ctx.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            path: ["mediumConsistencyPermille"],
            message: "Medium threshold must be looser than the high threshold.",
        });
});
exports.reorderConfigDraftSchema = zod_1.z.object({
    expectedDraftRevision: zod_1.z.number().int().nonnegative(),
    config: exports.reorderPolicySchema,
});
exports.reorderConfigPublishSchema = zod_1.z.object({
    expectedDraftRevision: zod_1.z.number().int().positive(),
});
exports.reorderEligibilitySchema = zod_1.z.enum(["AUTO", "ENABLED", "DISABLED"]);
exports.reorderProductPolicySchema = zod_1.z.object({
    eligibility: exports.reorderEligibilitySchema,
    note: zod_1.z.string().trim().max(500).nullable().default(null),
});
exports.reorderCategoryPolicySchema = zod_1.z.object({
    eligibility: exports.reorderEligibilitySchema,
    fallbackDays: zod_1.z.number().int().min(7).max(365).nullable().default(null),
});
exports.reorderSnoozeSchema = zod_1.z.object({
    days: zod_1.z.number().int().min(1).max(180),
});
exports.reorderGlobalPreferenceSchema = zod_1.z.object({
    smartEnabled: zod_1.z.boolean(),
    expectedVersion: zod_1.z.number().int().positive().optional(),
});
exports.reorderCartInputSchema = zod_1.z
    .object({
    sessionId: primitives_1.uuidSchema.default(() => crypto.randomUUID()),
    items: zod_1.z
        .array(zod_1.z.object({
        variantId: primitives_1.uuidSchema,
        quantity: zod_1.z.number().int().min(1).max(99).default(1),
    }))
        .min(1)
        .max(20),
})
    .strict();
exports.reorderOrderPreviewSchema = zod_1.z.object({
    orderId: primitives_1.uuidSchema,
});
exports.reorderEventInputSchema = zod_1.z.object({
    eventKey: zod_1.z.string().trim().min(12).max(180),
    eventType: zod_1.z.enum([
        "BUY_AGAIN_VIEWED",
        "BUY_AGAIN_CLICKED",
        "REORDER_OPPORTUNITY_SHOWN",
        "REORDER_CLICKED",
        "REORDER_SNOOZED",
        "REORDER_DISABLED",
        "REORDER_RESTORED",
        "RESTOCK_CART_CREATED",
        "RESTOCK_ORDER_COMPLETED",
    ]),
    productId: primitives_1.uuidSchema.nullable().default(null),
    variantId: primitives_1.uuidSchema.nullable().default(null),
    orderId: primitives_1.uuidSchema.nullable().default(null),
    sessionId: primitives_1.uuidSchema.nullable().default(null),
});
//# sourceMappingURL=reorder.schema.js.map