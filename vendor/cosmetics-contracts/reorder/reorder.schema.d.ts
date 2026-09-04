import { z } from "zod";
export declare const reorderConfidenceSchema: z.ZodEnum<["INSUFFICIENT", "LOW", "MEDIUM", "HIGH"]>;
export type ReorderConfidence = z.infer<typeof reorderConfidenceSchema>;
export declare const reorderOpportunityStateSchema: z.ZodEnum<["NOT_ELIGIBLE", "EARLY", "READY", "SNOOZED", "SUPPRESSED", "OUT_OF_STOCK", "RECENTLY_PURCHASED", "IN_CART", "ACTIVE_ORDER"]>;
export type ReorderOpportunityState = z.infer<typeof reorderOpportunityStateSchema>;
export declare const reorderPolicySchema: z.ZodEffects<z.ZodObject<{
    engineEnabled: z.ZodBoolean;
    smartSuggestionsEnabled: z.ZodBoolean;
    minimumPersonalizedPurchases: z.ZodNumber;
    minimumIntervalDays: z.ZodNumber;
    maximumIntervalDays: z.ZodNumber;
    recentPurchaseSuppressionDays: z.ZodNumber;
    reminderCooldownDays: z.ZodNumber;
    snoozeOptionsDays: z.ZodArray<z.ZodNumber, "many">;
    maximumSuggestionsPerPeriod: z.ZodNumber;
    frequencyPeriodDays: z.ZodNumber;
    surfaceLimit: z.ZodNumber;
    windowLeadPercent: z.ZodNumber;
    windowGracePercent: z.ZodNumber;
    highConsistencyPermille: z.ZodNumber;
    mediumConsistencyPermille: z.ZodNumber;
    aggregateMinimumCohort: z.ZodNumber;
    scheduledBatchSize: z.ZodNumber;
    cartSuppressionEnabled: z.ZodBoolean;
    activeOrderSuppressionEnabled: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    engineEnabled: boolean;
    smartSuggestionsEnabled: boolean;
    minimumPersonalizedPurchases: number;
    minimumIntervalDays: number;
    maximumIntervalDays: number;
    recentPurchaseSuppressionDays: number;
    reminderCooldownDays: number;
    snoozeOptionsDays: number[];
    maximumSuggestionsPerPeriod: number;
    frequencyPeriodDays: number;
    surfaceLimit: number;
    windowLeadPercent: number;
    windowGracePercent: number;
    highConsistencyPermille: number;
    mediumConsistencyPermille: number;
    aggregateMinimumCohort: number;
    scheduledBatchSize: number;
    cartSuppressionEnabled: boolean;
    activeOrderSuppressionEnabled: boolean;
}, {
    engineEnabled: boolean;
    smartSuggestionsEnabled: boolean;
    minimumPersonalizedPurchases: number;
    minimumIntervalDays: number;
    maximumIntervalDays: number;
    recentPurchaseSuppressionDays: number;
    reminderCooldownDays: number;
    snoozeOptionsDays: number[];
    maximumSuggestionsPerPeriod: number;
    frequencyPeriodDays: number;
    surfaceLimit: number;
    windowLeadPercent: number;
    windowGracePercent: number;
    highConsistencyPermille: number;
    mediumConsistencyPermille: number;
    aggregateMinimumCohort: number;
    scheduledBatchSize: number;
    cartSuppressionEnabled: boolean;
    activeOrderSuppressionEnabled: boolean;
}>, {
    engineEnabled: boolean;
    smartSuggestionsEnabled: boolean;
    minimumPersonalizedPurchases: number;
    minimumIntervalDays: number;
    maximumIntervalDays: number;
    recentPurchaseSuppressionDays: number;
    reminderCooldownDays: number;
    snoozeOptionsDays: number[];
    maximumSuggestionsPerPeriod: number;
    frequencyPeriodDays: number;
    surfaceLimit: number;
    windowLeadPercent: number;
    windowGracePercent: number;
    highConsistencyPermille: number;
    mediumConsistencyPermille: number;
    aggregateMinimumCohort: number;
    scheduledBatchSize: number;
    cartSuppressionEnabled: boolean;
    activeOrderSuppressionEnabled: boolean;
}, {
    engineEnabled: boolean;
    smartSuggestionsEnabled: boolean;
    minimumPersonalizedPurchases: number;
    minimumIntervalDays: number;
    maximumIntervalDays: number;
    recentPurchaseSuppressionDays: number;
    reminderCooldownDays: number;
    snoozeOptionsDays: number[];
    maximumSuggestionsPerPeriod: number;
    frequencyPeriodDays: number;
    surfaceLimit: number;
    windowLeadPercent: number;
    windowGracePercent: number;
    highConsistencyPermille: number;
    mediumConsistencyPermille: number;
    aggregateMinimumCohort: number;
    scheduledBatchSize: number;
    cartSuppressionEnabled: boolean;
    activeOrderSuppressionEnabled: boolean;
}>;
export type ReorderPolicy = z.infer<typeof reorderPolicySchema>;
export declare const reorderConfigDraftSchema: z.ZodObject<{
    expectedDraftRevision: z.ZodNumber;
    config: z.ZodEffects<z.ZodObject<{
        engineEnabled: z.ZodBoolean;
        smartSuggestionsEnabled: z.ZodBoolean;
        minimumPersonalizedPurchases: z.ZodNumber;
        minimumIntervalDays: z.ZodNumber;
        maximumIntervalDays: z.ZodNumber;
        recentPurchaseSuppressionDays: z.ZodNumber;
        reminderCooldownDays: z.ZodNumber;
        snoozeOptionsDays: z.ZodArray<z.ZodNumber, "many">;
        maximumSuggestionsPerPeriod: z.ZodNumber;
        frequencyPeriodDays: z.ZodNumber;
        surfaceLimit: z.ZodNumber;
        windowLeadPercent: z.ZodNumber;
        windowGracePercent: z.ZodNumber;
        highConsistencyPermille: z.ZodNumber;
        mediumConsistencyPermille: z.ZodNumber;
        aggregateMinimumCohort: z.ZodNumber;
        scheduledBatchSize: z.ZodNumber;
        cartSuppressionEnabled: z.ZodBoolean;
        activeOrderSuppressionEnabled: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        engineEnabled: boolean;
        smartSuggestionsEnabled: boolean;
        minimumPersonalizedPurchases: number;
        minimumIntervalDays: number;
        maximumIntervalDays: number;
        recentPurchaseSuppressionDays: number;
        reminderCooldownDays: number;
        snoozeOptionsDays: number[];
        maximumSuggestionsPerPeriod: number;
        frequencyPeriodDays: number;
        surfaceLimit: number;
        windowLeadPercent: number;
        windowGracePercent: number;
        highConsistencyPermille: number;
        mediumConsistencyPermille: number;
        aggregateMinimumCohort: number;
        scheduledBatchSize: number;
        cartSuppressionEnabled: boolean;
        activeOrderSuppressionEnabled: boolean;
    }, {
        engineEnabled: boolean;
        smartSuggestionsEnabled: boolean;
        minimumPersonalizedPurchases: number;
        minimumIntervalDays: number;
        maximumIntervalDays: number;
        recentPurchaseSuppressionDays: number;
        reminderCooldownDays: number;
        snoozeOptionsDays: number[];
        maximumSuggestionsPerPeriod: number;
        frequencyPeriodDays: number;
        surfaceLimit: number;
        windowLeadPercent: number;
        windowGracePercent: number;
        highConsistencyPermille: number;
        mediumConsistencyPermille: number;
        aggregateMinimumCohort: number;
        scheduledBatchSize: number;
        cartSuppressionEnabled: boolean;
        activeOrderSuppressionEnabled: boolean;
    }>, {
        engineEnabled: boolean;
        smartSuggestionsEnabled: boolean;
        minimumPersonalizedPurchases: number;
        minimumIntervalDays: number;
        maximumIntervalDays: number;
        recentPurchaseSuppressionDays: number;
        reminderCooldownDays: number;
        snoozeOptionsDays: number[];
        maximumSuggestionsPerPeriod: number;
        frequencyPeriodDays: number;
        surfaceLimit: number;
        windowLeadPercent: number;
        windowGracePercent: number;
        highConsistencyPermille: number;
        mediumConsistencyPermille: number;
        aggregateMinimumCohort: number;
        scheduledBatchSize: number;
        cartSuppressionEnabled: boolean;
        activeOrderSuppressionEnabled: boolean;
    }, {
        engineEnabled: boolean;
        smartSuggestionsEnabled: boolean;
        minimumPersonalizedPurchases: number;
        minimumIntervalDays: number;
        maximumIntervalDays: number;
        recentPurchaseSuppressionDays: number;
        reminderCooldownDays: number;
        snoozeOptionsDays: number[];
        maximumSuggestionsPerPeriod: number;
        frequencyPeriodDays: number;
        surfaceLimit: number;
        windowLeadPercent: number;
        windowGracePercent: number;
        highConsistencyPermille: number;
        mediumConsistencyPermille: number;
        aggregateMinimumCohort: number;
        scheduledBatchSize: number;
        cartSuppressionEnabled: boolean;
        activeOrderSuppressionEnabled: boolean;
    }>;
}, "strip", z.ZodTypeAny, {
    config: {
        engineEnabled: boolean;
        smartSuggestionsEnabled: boolean;
        minimumPersonalizedPurchases: number;
        minimumIntervalDays: number;
        maximumIntervalDays: number;
        recentPurchaseSuppressionDays: number;
        reminderCooldownDays: number;
        snoozeOptionsDays: number[];
        maximumSuggestionsPerPeriod: number;
        frequencyPeriodDays: number;
        surfaceLimit: number;
        windowLeadPercent: number;
        windowGracePercent: number;
        highConsistencyPermille: number;
        mediumConsistencyPermille: number;
        aggregateMinimumCohort: number;
        scheduledBatchSize: number;
        cartSuppressionEnabled: boolean;
        activeOrderSuppressionEnabled: boolean;
    };
    expectedDraftRevision: number;
}, {
    config: {
        engineEnabled: boolean;
        smartSuggestionsEnabled: boolean;
        minimumPersonalizedPurchases: number;
        minimumIntervalDays: number;
        maximumIntervalDays: number;
        recentPurchaseSuppressionDays: number;
        reminderCooldownDays: number;
        snoozeOptionsDays: number[];
        maximumSuggestionsPerPeriod: number;
        frequencyPeriodDays: number;
        surfaceLimit: number;
        windowLeadPercent: number;
        windowGracePercent: number;
        highConsistencyPermille: number;
        mediumConsistencyPermille: number;
        aggregateMinimumCohort: number;
        scheduledBatchSize: number;
        cartSuppressionEnabled: boolean;
        activeOrderSuppressionEnabled: boolean;
    };
    expectedDraftRevision: number;
}>;
export declare const reorderConfigPublishSchema: z.ZodObject<{
    expectedDraftRevision: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    expectedDraftRevision: number;
}, {
    expectedDraftRevision: number;
}>;
export declare const reorderEligibilitySchema: z.ZodEnum<["AUTO", "ENABLED", "DISABLED"]>;
export declare const reorderProductPolicySchema: z.ZodObject<{
    eligibility: z.ZodEnum<["AUTO", "ENABLED", "DISABLED"]>;
    note: z.ZodDefault<z.ZodNullable<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    note: string | null;
    eligibility: "AUTO" | "ENABLED" | "DISABLED";
}, {
    eligibility: "AUTO" | "ENABLED" | "DISABLED";
    note?: string | null | undefined;
}>;
export declare const reorderCategoryPolicySchema: z.ZodObject<{
    eligibility: z.ZodEnum<["AUTO", "ENABLED", "DISABLED"]>;
    fallbackDays: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    eligibility: "AUTO" | "ENABLED" | "DISABLED";
    fallbackDays: number | null;
}, {
    eligibility: "AUTO" | "ENABLED" | "DISABLED";
    fallbackDays?: number | null | undefined;
}>;
export declare const reorderSnoozeSchema: z.ZodObject<{
    days: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    days: number;
}, {
    days: number;
}>;
export declare const reorderGlobalPreferenceSchema: z.ZodObject<{
    smartEnabled: z.ZodBoolean;
    expectedVersion: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    smartEnabled: boolean;
    expectedVersion?: number | undefined;
}, {
    smartEnabled: boolean;
    expectedVersion?: number | undefined;
}>;
export declare const reorderCartInputSchema: z.ZodObject<{
    sessionId: z.ZodDefault<z.ZodString>;
    items: z.ZodArray<z.ZodObject<{
        variantId: z.ZodString;
        quantity: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        quantity: number;
        variantId: string;
    }, {
        variantId: string;
        quantity?: number | undefined;
    }>, "many">;
}, "strict", z.ZodTypeAny, {
    items: {
        quantity: number;
        variantId: string;
    }[];
    sessionId: string;
}, {
    items: {
        variantId: string;
        quantity?: number | undefined;
    }[];
    sessionId?: string | undefined;
}>;
export declare const reorderOrderPreviewSchema: z.ZodObject<{
    orderId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    orderId: string;
}, {
    orderId: string;
}>;
export declare const reorderEventInputSchema: z.ZodObject<{
    eventKey: z.ZodString;
    eventType: z.ZodEnum<["BUY_AGAIN_VIEWED", "BUY_AGAIN_CLICKED", "REORDER_OPPORTUNITY_SHOWN", "REORDER_CLICKED", "REORDER_SNOOZED", "REORDER_DISABLED", "REORDER_RESTORED", "RESTOCK_CART_CREATED", "RESTOCK_ORDER_COMPLETED"]>;
    productId: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    variantId: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    orderId: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    sessionId: z.ZodDefault<z.ZodNullable<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    orderId: string | null;
    variantId: string | null;
    productId: string | null;
    sessionId: string | null;
    eventKey: string;
    eventType: "BUY_AGAIN_VIEWED" | "BUY_AGAIN_CLICKED" | "REORDER_OPPORTUNITY_SHOWN" | "REORDER_CLICKED" | "REORDER_SNOOZED" | "REORDER_DISABLED" | "REORDER_RESTORED" | "RESTOCK_CART_CREATED" | "RESTOCK_ORDER_COMPLETED";
}, {
    eventKey: string;
    eventType: "BUY_AGAIN_VIEWED" | "BUY_AGAIN_CLICKED" | "REORDER_OPPORTUNITY_SHOWN" | "REORDER_CLICKED" | "REORDER_SNOOZED" | "REORDER_DISABLED" | "REORDER_RESTORED" | "RESTOCK_CART_CREATED" | "RESTOCK_ORDER_COMPLETED";
    orderId?: string | null | undefined;
    variantId?: string | null | undefined;
    productId?: string | null | undefined;
    sessionId?: string | null | undefined;
}>;
export type ReorderConfigDraftInput = z.infer<typeof reorderConfigDraftSchema>;
export type ReorderConfigPublishInput = z.infer<typeof reorderConfigPublishSchema>;
export type ReorderProductPolicyInput = z.infer<typeof reorderProductPolicySchema>;
export type ReorderCategoryPolicyInput = z.infer<typeof reorderCategoryPolicySchema>;
export type ReorderCartInput = z.infer<typeof reorderCartInputSchema>;
export type ReorderEventInput = z.infer<typeof reorderEventInputSchema>;
//# sourceMappingURL=reorder.schema.d.ts.map