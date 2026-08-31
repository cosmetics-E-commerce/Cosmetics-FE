import { z } from "zod";
export declare const customer360TimelineFilterSchema: z.ZodEnum<["ALL", "ACCOUNT", "ORDERS", "SHOPPING", "WISHLIST", "PROMOTIONS", "ROUTINE", "SUPPORT", "REVIEWS", "PAYMENTS", "ADMIN"]>;
export declare const customer360TimelineQuerySchema: z.ZodObject<{
    cursor: z.ZodOptional<z.ZodString>;
    limit: z.ZodDefault<z.ZodNumber>;
    filter: z.ZodDefault<z.ZodEnum<["ALL", "ACCOUNT", "ORDERS", "SHOPPING", "WISHLIST", "PROMOTIONS", "ROUTINE", "SUPPORT", "REVIEWS", "PAYMENTS", "ADMIN"]>>;
    search: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    filter: "ADMIN" | "ALL" | "ACCOUNT" | "ORDERS" | "SHOPPING" | "WISHLIST" | "PROMOTIONS" | "ROUTINE" | "SUPPORT" | "REVIEWS" | "PAYMENTS";
    limit: number;
    search?: string | undefined;
    cursor?: string | undefined;
}, {
    filter?: "ADMIN" | "ALL" | "ACCOUNT" | "ORDERS" | "SHOPPING" | "WISHLIST" | "PROMOTIONS" | "ROUTINE" | "SUPPORT" | "REVIEWS" | "PAYMENTS" | undefined;
    limit?: number | undefined;
    search?: string | undefined;
    cursor?: string | undefined;
}>;
export type Customer360TimelineQuery = z.infer<typeof customer360TimelineQuerySchema>;
export declare const customer360PaymentsQuerySchema: z.ZodObject<{
    cursor: z.ZodOptional<z.ZodString>;
    limit: z.ZodDefault<z.ZodNumber>;
    kind: z.ZodDefault<z.ZodEnum<["ALL", "REFUNDS"]>>;
}, "strip", z.ZodTypeAny, {
    limit: number;
    kind: "ALL" | "REFUNDS";
    cursor?: string | undefined;
}, {
    limit?: number | undefined;
    kind?: "ALL" | "REFUNDS" | undefined;
    cursor?: string | undefined;
}>;
export type Customer360PaymentsQuery = z.infer<typeof customer360PaymentsQuerySchema>;
export declare const customer360PaymentsResponseSchema: z.ZodObject<{
    summary: z.ZodObject<{
        recognizedPayments: z.ZodNumber;
        refundedAmount: z.ZodNumber;
        pendingRefunds: z.ZodNull;
        failedPayments: z.ZodNumber;
        lastPaymentAt: z.ZodNullable<z.ZodString>;
        lastRefundAt: z.ZodNullable<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        recognizedPayments: number;
        refundedAmount: number;
        pendingRefunds: null;
        failedPayments: number;
        lastPaymentAt: string | null;
        lastRefundAt: string | null;
    }, {
        recognizedPayments: number;
        refundedAmount: number;
        pendingRefunds: null;
        failedPayments: number;
        lastPaymentAt: string | null;
        lastRefundAt: string | null;
    }>;
    data: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        orderId: z.ZodString;
        orderNumber: z.ZodString;
        method: z.ZodString;
        amount: z.ZodNumber;
        currency: z.ZodString;
        status: z.ZodString;
        createdAt: z.ZodString;
        updatedAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        status: string;
        id: string;
        createdAt: string;
        updatedAt: string;
        orderNumber: string;
        currency: string;
        orderId: string;
        method: string;
        amount: number;
    }, {
        status: string;
        id: string;
        createdAt: string;
        updatedAt: string;
        orderNumber: string;
        currency: string;
        orderId: string;
        method: string;
        amount: number;
    }>, "many">;
    nextCursor: z.ZodNullable<z.ZodString>;
    hasMore: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    data: {
        status: string;
        id: string;
        createdAt: string;
        updatedAt: string;
        orderNumber: string;
        currency: string;
        orderId: string;
        method: string;
        amount: number;
    }[];
    summary: {
        recognizedPayments: number;
        refundedAmount: number;
        pendingRefunds: null;
        failedPayments: number;
        lastPaymentAt: string | null;
        lastRefundAt: string | null;
    };
    nextCursor: string | null;
    hasMore: boolean;
}, {
    data: {
        status: string;
        id: string;
        createdAt: string;
        updatedAt: string;
        orderNumber: string;
        currency: string;
        orderId: string;
        method: string;
        amount: number;
    }[];
    summary: {
        recognizedPayments: number;
        refundedAmount: number;
        pendingRefunds: null;
        failedPayments: number;
        lastPaymentAt: string | null;
        lastRefundAt: string | null;
    };
    nextCursor: string | null;
    hasMore: boolean;
}>;
export declare const customer360NoteInputSchema: z.ZodObject<{
    content: z.ZodString;
}, "strict", z.ZodTypeAny, {
    content: string;
}, {
    content: string;
}>;
export type Customer360NoteInput = z.infer<typeof customer360NoteInputSchema>;
export declare const customer360TagInputSchema: z.ZodObject<{
    key: z.ZodString;
    labelEn: z.ZodString;
    labelAr: z.ZodString;
    description: z.ZodDefault<z.ZodString>;
    color: z.ZodDefault<z.ZodEnum<["NEUTRAL", "GOLD", "GREEN", "BLUE", "RED"]>>;
}, "strict", z.ZodTypeAny, {
    key: string;
    description: string;
    labelEn: string;
    labelAr: string;
    color: "GOLD" | "NEUTRAL" | "GREEN" | "BLUE" | "RED";
}, {
    key: string;
    labelEn: string;
    labelAr: string;
    description?: string | undefined;
    color?: "GOLD" | "NEUTRAL" | "GREEN" | "BLUE" | "RED" | undefined;
}>;
export type Customer360TagInput = z.infer<typeof customer360TagInputSchema>;
export declare const customer360TagAssignmentSchema: z.ZodObject<{
    tagId: z.ZodString;
}, "strict", z.ZodTypeAny, {
    tagId: string;
}, {
    tagId: string;
}>;
export declare const customerSegmentDimensionSchema: z.ZodEnum<["ACCOUNT_AGE_DAYS", "VERIFIED", "ORDER_COUNT", "COMPLETED_ORDER_COUNT", "NET_SPEND", "AVERAGE_ORDER_VALUE", "DAYS_SINCE_LAST_ORDER", "REFUND_COUNT", "WISHLIST_COUNT", "ACTIVE_CART", "ROUTINE_COMPLETION_COUNT", "REVIEW_COUNT", "COUPON_USAGE_COUNT", "PURCHASED_PRODUCT", "PURCHASED_BRAND", "PURCHASED_CATEGORY", "MANAGED_TAG", "PREFERRED_LANGUAGE", "ACCOUNT_STATUS"]>;
export type CustomerSegmentDimension = z.infer<typeof customerSegmentDimensionSchema>;
export declare const customerSegmentOperatorSchema: z.ZodEnum<["EQUALS", "NOT_EQUALS", "GREATER_THAN", "GREATER_THAN_OR_EQUAL", "LESS_THAN", "LESS_THAN_OR_EQUAL", "IN", "NOT_IN", "HAS_TAG", "DOES_NOT_HAVE_TAG", "HAS_ANY_OF", "HAS_ALL_OF"]>;
export declare const customerSegmentConditionSchema: z.ZodObject<{
    id: z.ZodString;
    dimension: z.ZodEnum<["ACCOUNT_AGE_DAYS", "VERIFIED", "ORDER_COUNT", "COMPLETED_ORDER_COUNT", "NET_SPEND", "AVERAGE_ORDER_VALUE", "DAYS_SINCE_LAST_ORDER", "REFUND_COUNT", "WISHLIST_COUNT", "ACTIVE_CART", "ROUTINE_COMPLETION_COUNT", "REVIEW_COUNT", "COUPON_USAGE_COUNT", "PURCHASED_PRODUCT", "PURCHASED_BRAND", "PURCHASED_CATEGORY", "MANAGED_TAG", "PREFERRED_LANGUAGE", "ACCOUNT_STATUS"]>;
    operator: z.ZodEnum<["EQUALS", "NOT_EQUALS", "GREATER_THAN", "GREATER_THAN_OR_EQUAL", "LESS_THAN", "LESS_THAN_OR_EQUAL", "IN", "NOT_IN", "HAS_TAG", "DOES_NOT_HAVE_TAG", "HAS_ANY_OF", "HAS_ALL_OF"]>;
    value: z.ZodUnion<[z.ZodBoolean, z.ZodNumber, z.ZodString, z.ZodArray<z.ZodString, "many">]>;
}, "strict", z.ZodTypeAny, {
    value: string | number | boolean | string[];
    id: string;
    operator: "IN" | "EQUALS" | "NOT_EQUALS" | "GREATER_THAN" | "LESS_THAN" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL" | "NOT_IN" | "HAS_TAG" | "DOES_NOT_HAVE_TAG" | "HAS_ANY_OF" | "HAS_ALL_OF";
    dimension: "VERIFIED" | "PURCHASED_PRODUCT" | "PURCHASED_CATEGORY" | "ACCOUNT_AGE_DAYS" | "ORDER_COUNT" | "COMPLETED_ORDER_COUNT" | "NET_SPEND" | "AVERAGE_ORDER_VALUE" | "DAYS_SINCE_LAST_ORDER" | "REFUND_COUNT" | "WISHLIST_COUNT" | "ACTIVE_CART" | "ROUTINE_COMPLETION_COUNT" | "REVIEW_COUNT" | "COUPON_USAGE_COUNT" | "PURCHASED_BRAND" | "MANAGED_TAG" | "PREFERRED_LANGUAGE" | "ACCOUNT_STATUS";
}, {
    value: string | number | boolean | string[];
    id: string;
    operator: "IN" | "EQUALS" | "NOT_EQUALS" | "GREATER_THAN" | "LESS_THAN" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL" | "NOT_IN" | "HAS_TAG" | "DOES_NOT_HAVE_TAG" | "HAS_ANY_OF" | "HAS_ALL_OF";
    dimension: "VERIFIED" | "PURCHASED_PRODUCT" | "PURCHASED_CATEGORY" | "ACCOUNT_AGE_DAYS" | "ORDER_COUNT" | "COMPLETED_ORDER_COUNT" | "NET_SPEND" | "AVERAGE_ORDER_VALUE" | "DAYS_SINCE_LAST_ORDER" | "REFUND_COUNT" | "WISHLIST_COUNT" | "ACTIVE_CART" | "ROUTINE_COMPLETION_COUNT" | "REVIEW_COUNT" | "COUPON_USAGE_COUNT" | "PURCHASED_BRAND" | "MANAGED_TAG" | "PREFERRED_LANGUAGE" | "ACCOUNT_STATUS";
}>;
export type CustomerSegmentCondition = z.infer<typeof customerSegmentConditionSchema>;
export type CustomerSegmentRuleGroup = {
    mode: "ALL" | "ANY";
    conditions: z.infer<typeof customerSegmentConditionSchema>[];
    groups: CustomerSegmentRuleGroup[];
};
export declare const customerSegmentRuleGroupSchema: z.ZodType<CustomerSegmentRuleGroup>;
export declare const customerSegmentInputSchema: z.ZodObject<{
    key: z.ZodString;
    internalName: z.ZodString;
    nameEn: z.ZodString;
    nameAr: z.ZodString;
    descriptionEn: z.ZodDefault<z.ZodString>;
    descriptionAr: z.ZodDefault<z.ZodString>;
    status: z.ZodDefault<z.ZodEnum<["DRAFT", "ACTIVE", "ARCHIVED"]>>;
    rules: z.ZodType<CustomerSegmentRuleGroup, z.ZodTypeDef, CustomerSegmentRuleGroup>;
}, "strict", z.ZodTypeAny, {
    status: "ACTIVE" | "ARCHIVED" | "DRAFT";
    key: string;
    descriptionEn: string;
    descriptionAr: string;
    nameEn: string;
    nameAr: string;
    internalName: string;
    rules: CustomerSegmentRuleGroup;
}, {
    key: string;
    nameEn: string;
    nameAr: string;
    internalName: string;
    rules: CustomerSegmentRuleGroup;
    status?: "ACTIVE" | "ARCHIVED" | "DRAFT" | undefined;
    descriptionEn?: string | undefined;
    descriptionAr?: string | undefined;
}>;
export type CustomerSegmentInput = z.infer<typeof customerSegmentInputSchema>;
export declare const customerSegmentDraftInputSchema: z.ZodObject<Omit<{
    key: z.ZodString;
    internalName: z.ZodString;
    nameEn: z.ZodString;
    nameAr: z.ZodString;
    descriptionEn: z.ZodDefault<z.ZodString>;
    descriptionAr: z.ZodDefault<z.ZodString>;
    status: z.ZodDefault<z.ZodEnum<["DRAFT", "ACTIVE", "ARCHIVED"]>>;
    rules: z.ZodType<CustomerSegmentRuleGroup, z.ZodTypeDef, CustomerSegmentRuleGroup>;
}, "status"> & {
    expectedRevisionToken: z.ZodNumber;
}, "strict", z.ZodTypeAny, {
    key: string;
    descriptionEn: string;
    descriptionAr: string;
    nameEn: string;
    nameAr: string;
    internalName: string;
    rules: CustomerSegmentRuleGroup;
    expectedRevisionToken: number;
}, {
    key: string;
    nameEn: string;
    nameAr: string;
    internalName: string;
    rules: CustomerSegmentRuleGroup;
    expectedRevisionToken: number;
    descriptionEn?: string | undefined;
    descriptionAr?: string | undefined;
}>;
export type CustomerSegmentDraftInput = z.infer<typeof customerSegmentDraftInputSchema>;
export declare const customerSegmentListQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    search: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<["DRAFT", "ACTIVE", "ARCHIVED"]>>;
    usage: z.ZodOptional<z.ZodEnum<["USED", "UNUSED"]>>;
    sortBy: z.ZodDefault<z.ZodEnum<["updatedAt", "name", "members", "createdAt"]>>;
    sortOrder: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
}, "strict", z.ZodTypeAny, {
    page: number;
    limit: number;
    sortBy: "createdAt" | "updatedAt" | "name" | "members";
    sortOrder: "asc" | "desc";
    status?: "ACTIVE" | "ARCHIVED" | "DRAFT" | undefined;
    search?: string | undefined;
    usage?: "USED" | "UNUSED" | undefined;
}, {
    status?: "ACTIVE" | "ARCHIVED" | "DRAFT" | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sortBy?: "createdAt" | "updatedAt" | "name" | "members" | undefined;
    sortOrder?: "asc" | "desc" | undefined;
    search?: string | undefined;
    usage?: "USED" | "UNUSED" | undefined;
}>;
export type CustomerSegmentListQuery = z.infer<typeof customerSegmentListQuerySchema>;
export declare const customerSegmentLifecycleInputSchema: z.ZodObject<{
    expectedRevisionToken: z.ZodNumber;
    reason: z.ZodString;
    confirmImpact: z.ZodDefault<z.ZodBoolean>;
}, "strict", z.ZodTypeAny, {
    reason: string;
    expectedRevisionToken: number;
    confirmImpact: boolean;
}, {
    reason: string;
    expectedRevisionToken: number;
    confirmImpact?: boolean | undefined;
}>;
export type CustomerSegmentLifecycleInput = z.infer<typeof customerSegmentLifecycleInputSchema>;
export declare const customerSegmentDuplicateInputSchema: z.ZodObject<{
    key: z.ZodString;
    nameEn: z.ZodString;
    nameAr: z.ZodString;
}, "strict", z.ZodTypeAny, {
    key: string;
    nameEn: string;
    nameAr: string;
}, {
    key: string;
    nameEn: string;
    nameAr: string;
}>;
export type CustomerSegmentDuplicateInput = z.infer<typeof customerSegmentDuplicateInputSchema>;
export declare const customerSegmentDeleteInputSchema: z.ZodObject<{
    expectedRevisionToken: z.ZodNumber;
    confirmation: z.ZodLiteral<"DELETE">;
    reason: z.ZodString;
}, "strict", z.ZodTypeAny, {
    reason: string;
    confirmation: "DELETE";
    expectedRevisionToken: number;
}, {
    reason: string;
    confirmation: "DELETE";
    expectedRevisionToken: number;
}>;
export type CustomerSegmentDeleteInput = z.infer<typeof customerSegmentDeleteInputSchema>;
export declare const customerSegmentPreviewSchema: z.ZodObject<{
    rules: z.ZodType<CustomerSegmentRuleGroup, z.ZodTypeDef, CustomerSegmentRuleGroup>;
    limit: z.ZodDefault<z.ZodNumber>;
    customerId: z.ZodOptional<z.ZodString>;
}, "strict", z.ZodTypeAny, {
    limit: number;
    rules: CustomerSegmentRuleGroup;
    customerId?: string | undefined;
}, {
    rules: CustomerSegmentRuleGroup;
    limit?: number | undefined;
    customerId?: string | undefined;
}>;
export type CustomerSegmentPreviewInput = z.infer<typeof customerSegmentPreviewSchema>;
export declare const customerSegmentMembersQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    cursor: z.ZodOptional<z.ZodString>;
    search: z.ZodOptional<z.ZodString>;
    sortBy: z.ZodDefault<z.ZodEnum<["createdAt", "name", "orders", "netSpend", "lastOrder"]>>;
    sortOrder: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
    configuration: z.ZodDefault<z.ZodEnum<["ACTIVE", "DRAFT"]>>;
}, "strict", z.ZodTypeAny, {
    page: number;
    limit: number;
    sortBy: "createdAt" | "name" | "orders" | "netSpend" | "lastOrder";
    sortOrder: "asc" | "desc";
    configuration: "ACTIVE" | "DRAFT";
    search?: string | undefined;
    cursor?: string | undefined;
}, {
    page?: number | undefined;
    limit?: number | undefined;
    sortBy?: "createdAt" | "name" | "orders" | "netSpend" | "lastOrder" | undefined;
    sortOrder?: "asc" | "desc" | undefined;
    search?: string | undefined;
    configuration?: "ACTIVE" | "DRAFT" | undefined;
    cursor?: string | undefined;
}>;
export type CustomerSegmentMembersQuery = z.infer<typeof customerSegmentMembersQuerySchema>;
export declare const customerInsightRuleInputSchema: z.ZodObject<{
    labelEn: z.ZodString;
    labelAr: z.ZodString;
    tone: z.ZodEnum<["INFO", "POSITIVE", "WARNING"]>;
    enabled: z.ZodBoolean;
    priority: z.ZodNumber;
    rules: z.ZodType<CustomerSegmentRuleGroup, z.ZodTypeDef, CustomerSegmentRuleGroup>;
}, "strict", z.ZodTypeAny, {
    enabled: boolean;
    priority: number;
    tone: "WARNING" | "INFO" | "POSITIVE";
    rules: CustomerSegmentRuleGroup;
    labelEn: string;
    labelAr: string;
}, {
    enabled: boolean;
    priority: number;
    tone: "WARNING" | "INFO" | "POSITIVE";
    rules: CustomerSegmentRuleGroup;
    labelEn: string;
    labelAr: string;
}>;
export type CustomerInsightRuleInput = z.infer<typeof customerInsightRuleInputSchema>;
export declare const customerExportInputSchema: z.ZodObject<{
    scope: z.ZodDiscriminatedUnion<"kind", [z.ZodObject<{
        kind: z.ZodLiteral<"SINGLE">;
        customerId: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        customerId: string;
        kind: "SINGLE";
    }, {
        customerId: string;
        kind: "SINGLE";
    }>, z.ZodObject<{
        kind: z.ZodLiteral<"SELECTED">;
        customerIds: z.ZodArray<z.ZodString, "many">;
    }, "strict", z.ZodTypeAny, {
        customerIds: string[];
        kind: "SELECTED";
    }, {
        customerIds: string[];
        kind: "SELECTED";
    }>, z.ZodObject<{
        kind: z.ZodLiteral<"SEGMENT">;
        segmentId: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        segmentId: string;
        kind: "SEGMENT";
    }, {
        segmentId: string;
        kind: "SEGMENT";
    }>, z.ZodObject<{
        kind: z.ZodLiteral<"ALL">;
    }, "strict", z.ZodTypeAny, {
        kind: "ALL";
    }, {
        kind: "ALL";
    }>]>;
    fieldGroups: z.ZodArray<z.ZodEnum<["IDENTITY", "COMMERCE_SUMMARY", "TAGS", "SEGMENTS", "PROMOTIONS", "ROUTINE_SUMMARY", "SUPPORT_METADATA"]>, "many">;
    includeDynamicSegmentMemberships: z.ZodDefault<z.ZodBoolean>;
}, "strict", z.ZodTypeAny, {
    scope: {
        customerId: string;
        kind: "SINGLE";
    } | {
        customerIds: string[];
        kind: "SELECTED";
    } | {
        segmentId: string;
        kind: "SEGMENT";
    } | {
        kind: "ALL";
    };
    fieldGroups: ("PROMOTIONS" | "IDENTITY" | "COMMERCE_SUMMARY" | "TAGS" | "SEGMENTS" | "ROUTINE_SUMMARY" | "SUPPORT_METADATA")[];
    includeDynamicSegmentMemberships: boolean;
}, {
    scope: {
        customerId: string;
        kind: "SINGLE";
    } | {
        customerIds: string[];
        kind: "SELECTED";
    } | {
        segmentId: string;
        kind: "SEGMENT";
    } | {
        kind: "ALL";
    };
    fieldGroups: ("PROMOTIONS" | "IDENTITY" | "COMMERCE_SUMMARY" | "TAGS" | "SEGMENTS" | "ROUTINE_SUMMARY" | "SUPPORT_METADATA")[];
    includeDynamicSegmentMemberships?: boolean | undefined;
}>;
export type CustomerExportInput = z.infer<typeof customerExportInputSchema>;
export declare const customerMergePreviewInputSchema: z.ZodEffects<z.ZodObject<{
    sourceCustomerId: z.ZodString;
    targetCustomerId: z.ZodString;
}, "strict", z.ZodTypeAny, {
    sourceCustomerId: string;
    targetCustomerId: string;
}, {
    sourceCustomerId: string;
    targetCustomerId: string;
}>, {
    sourceCustomerId: string;
    targetCustomerId: string;
}, {
    sourceCustomerId: string;
    targetCustomerId: string;
}>;
export type CustomerMergePreviewInput = z.infer<typeof customerMergePreviewInputSchema>;
export declare const customerMergeExecuteInputSchema: z.ZodObject<{
    previewHash: z.ZodString;
    expectedVersion: z.ZodNumber;
    reason: z.ZodString;
    confirmation: z.ZodLiteral<"MERGE">;
    resolutions: z.ZodObject<{
        firstName: z.ZodEnum<["SOURCE", "TARGET"]>;
        lastName: z.ZodEnum<["SOURCE", "TARGET"]>;
        email: z.ZodEnum<["SOURCE", "TARGET"]>;
        phone: z.ZodEnum<["SOURCE", "TARGET"]>;
        preferredLocale: z.ZodEnum<["SOURCE", "TARGET"]>;
        isVip: z.ZodEnum<["SOURCE", "TARGET"]>;
        defaultAddressId: z.ZodNullable<z.ZodString>;
        cart: z.ZodEnum<["MERGE", "KEEP_SOURCE", "KEEP_TARGET"]>;
        duplicateReviews: z.ZodEnum<["KEEP_SOURCE", "KEEP_TARGET"]>;
    }, "strict", z.ZodTypeAny, {
        firstName: "SOURCE" | "TARGET";
        lastName: "SOURCE" | "TARGET";
        phone: "SOURCE" | "TARGET";
        email: "SOURCE" | "TARGET";
        isVip: "SOURCE" | "TARGET";
        cart: "MERGE" | "KEEP_SOURCE" | "KEEP_TARGET";
        preferredLocale: "SOURCE" | "TARGET";
        defaultAddressId: string | null;
        duplicateReviews: "KEEP_SOURCE" | "KEEP_TARGET";
    }, {
        firstName: "SOURCE" | "TARGET";
        lastName: "SOURCE" | "TARGET";
        phone: "SOURCE" | "TARGET";
        email: "SOURCE" | "TARGET";
        isVip: "SOURCE" | "TARGET";
        cart: "MERGE" | "KEEP_SOURCE" | "KEEP_TARGET";
        preferredLocale: "SOURCE" | "TARGET";
        defaultAddressId: string | null;
        duplicateReviews: "KEEP_SOURCE" | "KEEP_TARGET";
    }>;
}, "strict", z.ZodTypeAny, {
    reason: string;
    confirmation: "MERGE";
    previewHash: string;
    expectedVersion: number;
    resolutions: {
        firstName: "SOURCE" | "TARGET";
        lastName: "SOURCE" | "TARGET";
        phone: "SOURCE" | "TARGET";
        email: "SOURCE" | "TARGET";
        isVip: "SOURCE" | "TARGET";
        cart: "MERGE" | "KEEP_SOURCE" | "KEEP_TARGET";
        preferredLocale: "SOURCE" | "TARGET";
        defaultAddressId: string | null;
        duplicateReviews: "KEEP_SOURCE" | "KEEP_TARGET";
    };
}, {
    reason: string;
    confirmation: "MERGE";
    previewHash: string;
    expectedVersion: number;
    resolutions: {
        firstName: "SOURCE" | "TARGET";
        lastName: "SOURCE" | "TARGET";
        phone: "SOURCE" | "TARGET";
        email: "SOURCE" | "TARGET";
        isVip: "SOURCE" | "TARGET";
        cart: "MERGE" | "KEEP_SOURCE" | "KEEP_TARGET";
        preferredLocale: "SOURCE" | "TARGET";
        defaultAddressId: string | null;
        duplicateReviews: "KEEP_SOURCE" | "KEEP_TARGET";
    };
}>;
export type CustomerMergeExecuteInput = z.infer<typeof customerMergeExecuteInputSchema>;
export declare const customerMergeReverseInputSchema: z.ZodObject<{
    expectedVersion: z.ZodNumber;
    reason: z.ZodString;
    confirmation: z.ZodLiteral<"REVERSE">;
}, "strict", z.ZodTypeAny, {
    reason: string;
    confirmation: "REVERSE";
    expectedVersion: number;
}, {
    reason: string;
    confirmation: "REVERSE";
    expectedVersion: number;
}>;
export type CustomerMergeReverseInput = z.infer<typeof customerMergeReverseInputSchema>;
export declare const customer360WidgetIdSchema: z.ZodEnum<["IDENTITY", "COMMERCIAL_SUMMARY", "LATEST_ORDER", "ORDERS", "PAYMENTS", "CART", "WISHLIST", "ROUTINE", "PROMOTIONS", "SUPPORT", "REVIEWS", "ADDRESSES", "AFFINITY", "SEGMENTS", "INSIGHTS", "ACTIVITY", "NOTES", "TAGS"]>;
export declare const customer360LayoutWidgetSchema: z.ZodObject<{
    widgetId: z.ZodEnum<["IDENTITY", "COMMERCIAL_SUMMARY", "LATEST_ORDER", "ORDERS", "PAYMENTS", "CART", "WISHLIST", "ROUTINE", "PROMOTIONS", "SUPPORT", "REVIEWS", "ADDRESSES", "AFFINITY", "SEGMENTS", "INSIGHTS", "ACTIVITY", "NOTES", "TAGS"]>;
    size: z.ZodEnum<["SMALL", "MEDIUM", "WIDE"]>;
    visible: z.ZodBoolean;
}, "strict", z.ZodTypeAny, {
    size: "SMALL" | "MEDIUM" | "WIDE";
    widgetId: "CART" | "INSIGHTS" | "ORDERS" | "WISHLIST" | "PROMOTIONS" | "ROUTINE" | "SUPPORT" | "REVIEWS" | "PAYMENTS" | "IDENTITY" | "TAGS" | "SEGMENTS" | "COMMERCIAL_SUMMARY" | "LATEST_ORDER" | "ADDRESSES" | "AFFINITY" | "ACTIVITY" | "NOTES";
    visible: boolean;
}, {
    size: "SMALL" | "MEDIUM" | "WIDE";
    widgetId: "CART" | "INSIGHTS" | "ORDERS" | "WISHLIST" | "PROMOTIONS" | "ROUTINE" | "SUPPORT" | "REVIEWS" | "PAYMENTS" | "IDENTITY" | "TAGS" | "SEGMENTS" | "COMMERCIAL_SUMMARY" | "LATEST_ORDER" | "ADDRESSES" | "AFFINITY" | "ACTIVITY" | "NOTES";
    visible: boolean;
}>;
export declare const customer360LayoutInputSchema: z.ZodObject<{
    expectedVersion: z.ZodNumber;
    widgets: z.ZodEffects<z.ZodArray<z.ZodObject<{
        widgetId: z.ZodEnum<["IDENTITY", "COMMERCIAL_SUMMARY", "LATEST_ORDER", "ORDERS", "PAYMENTS", "CART", "WISHLIST", "ROUTINE", "PROMOTIONS", "SUPPORT", "REVIEWS", "ADDRESSES", "AFFINITY", "SEGMENTS", "INSIGHTS", "ACTIVITY", "NOTES", "TAGS"]>;
        size: z.ZodEnum<["SMALL", "MEDIUM", "WIDE"]>;
        visible: z.ZodBoolean;
    }, "strict", z.ZodTypeAny, {
        size: "SMALL" | "MEDIUM" | "WIDE";
        widgetId: "CART" | "INSIGHTS" | "ORDERS" | "WISHLIST" | "PROMOTIONS" | "ROUTINE" | "SUPPORT" | "REVIEWS" | "PAYMENTS" | "IDENTITY" | "TAGS" | "SEGMENTS" | "COMMERCIAL_SUMMARY" | "LATEST_ORDER" | "ADDRESSES" | "AFFINITY" | "ACTIVITY" | "NOTES";
        visible: boolean;
    }, {
        size: "SMALL" | "MEDIUM" | "WIDE";
        widgetId: "CART" | "INSIGHTS" | "ORDERS" | "WISHLIST" | "PROMOTIONS" | "ROUTINE" | "SUPPORT" | "REVIEWS" | "PAYMENTS" | "IDENTITY" | "TAGS" | "SEGMENTS" | "COMMERCIAL_SUMMARY" | "LATEST_ORDER" | "ADDRESSES" | "AFFINITY" | "ACTIVITY" | "NOTES";
        visible: boolean;
    }>, "many">, {
        size: "SMALL" | "MEDIUM" | "WIDE";
        widgetId: "CART" | "INSIGHTS" | "ORDERS" | "WISHLIST" | "PROMOTIONS" | "ROUTINE" | "SUPPORT" | "REVIEWS" | "PAYMENTS" | "IDENTITY" | "TAGS" | "SEGMENTS" | "COMMERCIAL_SUMMARY" | "LATEST_ORDER" | "ADDRESSES" | "AFFINITY" | "ACTIVITY" | "NOTES";
        visible: boolean;
    }[], {
        size: "SMALL" | "MEDIUM" | "WIDE";
        widgetId: "CART" | "INSIGHTS" | "ORDERS" | "WISHLIST" | "PROMOTIONS" | "ROUTINE" | "SUPPORT" | "REVIEWS" | "PAYMENTS" | "IDENTITY" | "TAGS" | "SEGMENTS" | "COMMERCIAL_SUMMARY" | "LATEST_ORDER" | "ADDRESSES" | "AFFINITY" | "ACTIVITY" | "NOTES";
        visible: boolean;
    }[]>;
}, "strict", z.ZodTypeAny, {
    widgets: {
        size: "SMALL" | "MEDIUM" | "WIDE";
        widgetId: "CART" | "INSIGHTS" | "ORDERS" | "WISHLIST" | "PROMOTIONS" | "ROUTINE" | "SUPPORT" | "REVIEWS" | "PAYMENTS" | "IDENTITY" | "TAGS" | "SEGMENTS" | "COMMERCIAL_SUMMARY" | "LATEST_ORDER" | "ADDRESSES" | "AFFINITY" | "ACTIVITY" | "NOTES";
        visible: boolean;
    }[];
    expectedVersion: number;
}, {
    widgets: {
        size: "SMALL" | "MEDIUM" | "WIDE";
        widgetId: "CART" | "INSIGHTS" | "ORDERS" | "WISHLIST" | "PROMOTIONS" | "ROUTINE" | "SUPPORT" | "REVIEWS" | "PAYMENTS" | "IDENTITY" | "TAGS" | "SEGMENTS" | "COMMERCIAL_SUMMARY" | "LATEST_ORDER" | "ADDRESSES" | "AFFINITY" | "ACTIVITY" | "NOTES";
        visible: boolean;
    }[];
    expectedVersion: number;
}>;
export type Customer360LayoutInput = z.infer<typeof customer360LayoutInputSchema>;
export declare const customer360ReconciliationConfigInputSchema: z.ZodObject<{
    enabled: z.ZodBoolean;
    frequentBatchSize: z.ZodNumber;
    rollingBatchSize: z.ZodNumber;
    recentWindowMinutes: z.ZodNumber;
    autoRepairDerived: z.ZodBoolean;
    driftWarningBps: z.ZodNumber;
}, "strict", z.ZodTypeAny, {
    enabled: boolean;
    frequentBatchSize: number;
    rollingBatchSize: number;
    recentWindowMinutes: number;
    autoRepairDerived: boolean;
    driftWarningBps: number;
}, {
    enabled: boolean;
    frequentBatchSize: number;
    rollingBatchSize: number;
    recentWindowMinutes: number;
    autoRepairDerived: boolean;
    driftWarningBps: number;
}>;
export type Customer360ReconciliationConfigInput = z.infer<typeof customer360ReconciliationConfigInputSchema>;
export declare const customer360TimelineEventSchema: z.ZodObject<{
    id: z.ZodString;
    type: z.ZodString;
    group: z.ZodEnum<["ACCOUNT", "ORDERS", "SHOPPING", "WISHLIST", "PROMOTIONS", "ROUTINE", "SUPPORT", "REVIEWS", "PAYMENTS", "ADMIN"]>;
    source: z.ZodString;
    entityType: z.ZodString;
    entityId: z.ZodNullable<z.ZodString>;
    occurredAt: z.ZodString;
    title: z.ZodString;
    detail: z.ZodNullable<z.ZodString>;
    amount: z.ZodNullable<z.ZodNumber>;
    metadata: z.ZodRecord<z.ZodString, z.ZodUnknown>;
    recordedAt: z.ZodOptional<z.ZodString>;
    schemaVersion: z.ZodOptional<z.ZodNumber>;
    captureMode: z.ZodOptional<z.ZodEnum<["LIVE_EVENT", "BACKFILLED", "BACKFILLED_CURRENT", "BACKFILLED_REPAIR"]>>;
    correlationId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    type: string;
    id: string;
    amount: number | null;
    source: string;
    metadata: Record<string, unknown>;
    title: string;
    entityId: string | null;
    occurredAt: string;
    group: "ADMIN" | "ACCOUNT" | "ORDERS" | "SHOPPING" | "WISHLIST" | "PROMOTIONS" | "ROUTINE" | "SUPPORT" | "REVIEWS" | "PAYMENTS";
    entityType: string;
    detail: string | null;
    schemaVersion?: number | undefined;
    recordedAt?: string | undefined;
    captureMode?: "LIVE_EVENT" | "BACKFILLED" | "BACKFILLED_CURRENT" | "BACKFILLED_REPAIR" | undefined;
    correlationId?: string | null | undefined;
}, {
    type: string;
    id: string;
    amount: number | null;
    source: string;
    metadata: Record<string, unknown>;
    title: string;
    entityId: string | null;
    occurredAt: string;
    group: "ADMIN" | "ACCOUNT" | "ORDERS" | "SHOPPING" | "WISHLIST" | "PROMOTIONS" | "ROUTINE" | "SUPPORT" | "REVIEWS" | "PAYMENTS";
    entityType: string;
    detail: string | null;
    schemaVersion?: number | undefined;
    recordedAt?: string | undefined;
    captureMode?: "LIVE_EVENT" | "BACKFILLED" | "BACKFILLED_CURRENT" | "BACKFILLED_REPAIR" | undefined;
    correlationId?: string | null | undefined;
}>;
export type Customer360TimelineEvent = z.infer<typeof customer360TimelineEventSchema>;
export declare const customer360TimelineResponseSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        type: z.ZodString;
        group: z.ZodEnum<["ACCOUNT", "ORDERS", "SHOPPING", "WISHLIST", "PROMOTIONS", "ROUTINE", "SUPPORT", "REVIEWS", "PAYMENTS", "ADMIN"]>;
        source: z.ZodString;
        entityType: z.ZodString;
        entityId: z.ZodNullable<z.ZodString>;
        occurredAt: z.ZodString;
        title: z.ZodString;
        detail: z.ZodNullable<z.ZodString>;
        amount: z.ZodNullable<z.ZodNumber>;
        metadata: z.ZodRecord<z.ZodString, z.ZodUnknown>;
        recordedAt: z.ZodOptional<z.ZodString>;
        schemaVersion: z.ZodOptional<z.ZodNumber>;
        captureMode: z.ZodOptional<z.ZodEnum<["LIVE_EVENT", "BACKFILLED", "BACKFILLED_CURRENT", "BACKFILLED_REPAIR"]>>;
        correlationId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        type: string;
        id: string;
        amount: number | null;
        source: string;
        metadata: Record<string, unknown>;
        title: string;
        entityId: string | null;
        occurredAt: string;
        group: "ADMIN" | "ACCOUNT" | "ORDERS" | "SHOPPING" | "WISHLIST" | "PROMOTIONS" | "ROUTINE" | "SUPPORT" | "REVIEWS" | "PAYMENTS";
        entityType: string;
        detail: string | null;
        schemaVersion?: number | undefined;
        recordedAt?: string | undefined;
        captureMode?: "LIVE_EVENT" | "BACKFILLED" | "BACKFILLED_CURRENT" | "BACKFILLED_REPAIR" | undefined;
        correlationId?: string | null | undefined;
    }, {
        type: string;
        id: string;
        amount: number | null;
        source: string;
        metadata: Record<string, unknown>;
        title: string;
        entityId: string | null;
        occurredAt: string;
        group: "ADMIN" | "ACCOUNT" | "ORDERS" | "SHOPPING" | "WISHLIST" | "PROMOTIONS" | "ROUTINE" | "SUPPORT" | "REVIEWS" | "PAYMENTS";
        entityType: string;
        detail: string | null;
        schemaVersion?: number | undefined;
        recordedAt?: string | undefined;
        captureMode?: "LIVE_EVENT" | "BACKFILLED" | "BACKFILLED_CURRENT" | "BACKFILLED_REPAIR" | undefined;
        correlationId?: string | null | undefined;
    }>, "many">;
    nextCursor: z.ZodNullable<z.ZodString>;
    hasMore: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    data: {
        type: string;
        id: string;
        amount: number | null;
        source: string;
        metadata: Record<string, unknown>;
        title: string;
        entityId: string | null;
        occurredAt: string;
        group: "ADMIN" | "ACCOUNT" | "ORDERS" | "SHOPPING" | "WISHLIST" | "PROMOTIONS" | "ROUTINE" | "SUPPORT" | "REVIEWS" | "PAYMENTS";
        entityType: string;
        detail: string | null;
        schemaVersion?: number | undefined;
        recordedAt?: string | undefined;
        captureMode?: "LIVE_EVENT" | "BACKFILLED" | "BACKFILLED_CURRENT" | "BACKFILLED_REPAIR" | undefined;
        correlationId?: string | null | undefined;
    }[];
    nextCursor: string | null;
    hasMore: boolean;
}, {
    data: {
        type: string;
        id: string;
        amount: number | null;
        source: string;
        metadata: Record<string, unknown>;
        title: string;
        entityId: string | null;
        occurredAt: string;
        group: "ADMIN" | "ACCOUNT" | "ORDERS" | "SHOPPING" | "WISHLIST" | "PROMOTIONS" | "ROUTINE" | "SUPPORT" | "REVIEWS" | "PAYMENTS";
        entityType: string;
        detail: string | null;
        schemaVersion?: number | undefined;
        recordedAt?: string | undefined;
        captureMode?: "LIVE_EVENT" | "BACKFILLED" | "BACKFILLED_CURRENT" | "BACKFILLED_REPAIR" | undefined;
        correlationId?: string | null | undefined;
    }[];
    nextCursor: string | null;
    hasMore: boolean;
}>;
export declare const customer360OverviewSchema: z.ZodObject<{
    identity: z.ZodObject<{
        id: z.ZodString;
        firstName: z.ZodString;
        lastName: z.ZodString;
        email: z.ZodNullable<z.ZodString>;
        phone: z.ZodString;
        piiMasked: z.ZodBoolean;
        status: z.ZodEnum<["ACTIVE", "INACTIVE", "DELETED"]>;
        verification: z.ZodEnum<["VERIFIED", "PARTIALLY_VERIFIED", "UNVERIFIED"]>;
        phoneVerified: z.ZodBoolean;
        emailVerified: z.ZodBoolean;
        isVip: z.ZodBoolean;
        preferredLanguage: z.ZodNullable<z.ZodString>;
        createdAt: z.ZodString;
        updatedAt: z.ZodString;
        lastActivityAt: z.ZodNullable<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        status: "ACTIVE" | "INACTIVE" | "DELETED";
        id: string;
        firstName: string;
        lastName: string;
        phone: string;
        email: string | null;
        createdAt: string;
        updatedAt: string;
        isVip: boolean;
        phoneVerified: boolean;
        emailVerified: boolean;
        piiMasked: boolean;
        verification: "VERIFIED" | "PARTIALLY_VERIFIED" | "UNVERIFIED";
        preferredLanguage: string | null;
        lastActivityAt: string | null;
    }, {
        status: "ACTIVE" | "INACTIVE" | "DELETED";
        id: string;
        firstName: string;
        lastName: string;
        phone: string;
        email: string | null;
        createdAt: string;
        updatedAt: string;
        isVip: boolean;
        phoneVerified: boolean;
        emailVerified: boolean;
        piiMasked: boolean;
        verification: "VERIFIED" | "PARTIALLY_VERIFIED" | "UNVERIFIED";
        preferredLanguage: string | null;
        lastActivityAt: string | null;
    }>;
    metrics: z.ZodObject<{
        orders: z.ZodNumber;
        completedOrders: z.ZodNumber;
        cancelledOrders: z.ZodNumber;
        refundedOrders: z.ZodNumber;
        recognizedRevenue: z.ZodNumber;
        refunds: z.ZodNumber;
        netSpend: z.ZodNumber;
        averageOrderValue: z.ZodNumber;
        discountsReceived: z.ZodNumber;
        firstOrderAt: z.ZodNullable<z.ZodString>;
        lastOrderAt: z.ZodNullable<z.ZodString>;
        daysSinceLastOrder: z.ZodNullable<z.ZodNumber>;
        wishlistCount: z.ZodNumber;
        wishlistValue: z.ZodNumber;
        activeCartValue: z.ZodNumber;
        activeCartLines: z.ZodNumber;
        reviewsCount: z.ZodNumber;
        supportThreads: z.ZodNumber;
        openSupportThreads: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        lastOrderAt: string | null;
        averageOrderValue: number;
        wishlistCount: number;
        orders: number;
        netSpend: number;
        completedOrders: number;
        cancelledOrders: number;
        refundedOrders: number;
        recognizedRevenue: number;
        refunds: number;
        discountsReceived: number;
        firstOrderAt: string | null;
        daysSinceLastOrder: number | null;
        wishlistValue: number;
        activeCartValue: number;
        activeCartLines: number;
        reviewsCount: number;
        supportThreads: number;
        openSupportThreads: number;
    }, {
        lastOrderAt: string | null;
        averageOrderValue: number;
        wishlistCount: number;
        orders: number;
        netSpend: number;
        completedOrders: number;
        cancelledOrders: number;
        refundedOrders: number;
        recognizedRevenue: number;
        refunds: number;
        discountsReceived: number;
        firstOrderAt: string | null;
        daysSinceLastOrder: number | null;
        wishlistValue: number;
        activeCartValue: number;
        activeCartLines: number;
        reviewsCount: number;
        supportThreads: number;
        openSupportThreads: number;
    }>;
    relationship: z.ZodObject<{
        label: z.ZodEnum<["NEW", "ACTIVE", "RETURNING", "LAPSED", "HIGH_VALUE"]>;
        recencyDays: z.ZodNullable<z.ZodNumber>;
        frequency: z.ZodNumber;
        monetary: z.ZodNumber;
        reasons: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        label: "ACTIVE" | "RETURNING" | "NEW" | "LAPSED" | "HIGH_VALUE";
        reasons: string[];
        frequency: number;
        recencyDays: number | null;
        monetary: number;
    }, {
        label: "ACTIVE" | "RETURNING" | "NEW" | "LAPSED" | "HIGH_VALUE";
        reasons: string[];
        frequency: number;
        recencyDays: number | null;
        monetary: number;
    }>;
    insights: z.ZodArray<z.ZodObject<{
        key: z.ZodString;
        label: z.ZodString;
        tone: z.ZodEnum<["INFO", "POSITIVE", "WARNING"]>;
        reasons: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        key: string;
        label: string;
        reasons: string[];
        tone: "WARNING" | "INFO" | "POSITIVE";
    }, {
        key: string;
        label: string;
        reasons: string[];
        tone: "WARNING" | "INFO" | "POSITIVE";
    }>, "many">;
    recentOrders: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        orderNumber: z.ZodString;
        status: z.ZodString;
        paymentStatus: z.ZodString;
        paymentMethod: z.ZodString;
        grandTotal: z.ZodNumber;
        discountTotal: z.ZodNumber;
        currency: z.ZodString;
        placedAt: z.ZodString;
        updatedAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        status: string;
        id: string;
        updatedAt: string;
        orderNumber: string;
        paymentStatus: string;
        paymentMethod: string;
        grandTotal: number;
        currency: string;
        placedAt: string;
        discountTotal: number;
    }, {
        status: string;
        id: string;
        updatedAt: string;
        orderNumber: string;
        paymentStatus: string;
        paymentMethod: string;
        grandTotal: number;
        currency: string;
        placedAt: string;
        discountTotal: number;
    }>, "many">;
    cart: z.ZodObject<{
        exists: z.ZodBoolean;
        updatedAt: z.ZodNullable<z.ZodString>;
        couponCode: z.ZodNullable<z.ZodString>;
        total: z.ZodNumber;
        lineCount: z.ZodNumber;
        quantity: z.ZodNumber;
        items: z.ZodArray<z.ZodObject<{
            productId: z.ZodString;
            variantId: z.ZodNullable<z.ZodString>;
            slug: z.ZodString;
            name: z.ZodString;
            imageUrl: z.ZodNullable<z.ZodString>;
            quantity: z.ZodNumber;
            unitPrice: z.ZodNumber;
            currentValue: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            name: string;
            variantId: string | null;
            quantity: number;
            productId: string;
            imageUrl: string | null;
            slug: string;
            unitPrice: number;
            currentValue: number;
        }, {
            name: string;
            variantId: string | null;
            quantity: number;
            productId: string;
            imageUrl: string | null;
            slug: string;
            unitPrice: number;
            currentValue: number;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        total: number;
        updatedAt: string | null;
        quantity: number;
        items: {
            name: string;
            variantId: string | null;
            quantity: number;
            productId: string;
            imageUrl: string | null;
            slug: string;
            unitPrice: number;
            currentValue: number;
        }[];
        couponCode: string | null;
        exists: boolean;
        lineCount: number;
    }, {
        total: number;
        updatedAt: string | null;
        quantity: number;
        items: {
            name: string;
            variantId: string | null;
            quantity: number;
            productId: string;
            imageUrl: string | null;
            slug: string;
            unitPrice: number;
            currentValue: number;
        }[];
        couponCode: string | null;
        exists: boolean;
        lineCount: number;
    }>;
    wishlist: z.ZodObject<{
        count: z.ZodNumber;
        currentValue: z.ZodNumber;
        updatedAt: z.ZodNullable<z.ZodString>;
        items: z.ZodArray<z.ZodObject<{
            productId: z.ZodString;
            variantId: z.ZodNullable<z.ZodString>;
            slug: z.ZodString;
            name: z.ZodString;
            imageUrl: z.ZodNullable<z.ZodString>;
            quantity: z.ZodNumber;
            unitPrice: z.ZodNumber;
            currentValue: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            name: string;
            variantId: string | null;
            quantity: number;
            productId: string;
            imageUrl: string | null;
            slug: string;
            unitPrice: number;
            currentValue: number;
        }, {
            name: string;
            variantId: string | null;
            quantity: number;
            productId: string;
            imageUrl: string | null;
            slug: string;
            unitPrice: number;
            currentValue: number;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        updatedAt: string | null;
        items: {
            name: string;
            variantId: string | null;
            quantity: number;
            productId: string;
            imageUrl: string | null;
            slug: string;
            unitPrice: number;
            currentValue: number;
        }[];
        count: number;
        currentValue: number;
    }, {
        updatedAt: string | null;
        items: {
            name: string;
            variantId: string | null;
            quantity: number;
            productId: string;
            imageUrl: string | null;
            slug: string;
            unitPrice: number;
            currentValue: number;
        }[];
        count: number;
        currentValue: number;
    }>;
    affinities: z.ZodObject<{
        products: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            label: z.ZodString;
            strength: z.ZodNumber;
            reasons: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            id: string;
            label: string;
            reasons: string[];
            strength: number;
        }, {
            id: string;
            label: string;
            reasons: string[];
            strength: number;
        }>, "many">;
        brands: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            label: z.ZodString;
            strength: z.ZodNumber;
            reasons: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            id: string;
            label: string;
            reasons: string[];
            strength: number;
        }, {
            id: string;
            label: string;
            reasons: string[];
            strength: number;
        }>, "many">;
        categories: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            label: z.ZodString;
            strength: z.ZodNumber;
            reasons: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            id: string;
            label: string;
            reasons: string[];
            strength: number;
        }, {
            id: string;
            label: string;
            reasons: string[];
            strength: number;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        brands: {
            id: string;
            label: string;
            reasons: string[];
            strength: number;
        }[];
        categories: {
            id: string;
            label: string;
            reasons: string[];
            strength: number;
        }[];
        products: {
            id: string;
            label: string;
            reasons: string[];
            strength: number;
        }[];
    }, {
        brands: {
            id: string;
            label: string;
            reasons: string[];
            strength: number;
        }[];
        categories: {
            id: string;
            label: string;
            reasons: string[];
            strength: number;
        }[];
        products: {
            id: string;
            label: string;
            reasons: string[];
            strength: number;
        }[];
    }>;
    promotions: z.ZodObject<{
        usageCount: z.ZodNumber;
        totalDiscount: z.ZodNumber;
        recent: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
            couponCode: z.ZodNullable<z.ZodString>;
            discount: z.ZodNumber;
            orderId: z.ZodString;
            orderNumber: z.ZodString;
            usedAt: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            id: string;
            orderNumber: string;
            name: string;
            orderId: string;
            couponCode: string | null;
            discount: number;
            usedAt: string;
        }, {
            id: string;
            orderNumber: string;
            name: string;
            orderId: string;
            couponCode: string | null;
            discount: number;
            usedAt: string;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        usageCount: number;
        totalDiscount: number;
        recent: {
            id: string;
            orderNumber: string;
            name: string;
            orderId: string;
            couponCode: string | null;
            discount: number;
            usedAt: string;
        }[];
    }, {
        usageCount: number;
        totalDiscount: number;
        recent: {
            id: string;
            orderNumber: string;
            name: string;
            orderId: string;
            couponCode: string | null;
            discount: number;
            usedAt: string;
        }[];
    }>;
    routine: z.ZodObject<{
        available: z.ZodBoolean;
        completedCount: z.ZodNumber;
        latest: z.ZodNullable<z.ZodObject<{
            id: z.ZodString;
            templateKey: z.ZodNullable<z.ZodString>;
            templateVersion: z.ZodNullable<z.ZodNumber>;
            engineVersion: z.ZodNumber;
            mode: z.ZodString;
            generatedAt: z.ZodString;
            answers: z.ZodRecord<z.ZodString, z.ZodUnknown>;
            result: z.ZodNullable<z.ZodUnknown>;
        }, "strip", z.ZodTypeAny, {
            id: string;
            mode: string;
            answers: Record<string, unknown>;
            templateKey: string | null;
            templateVersion: number | null;
            engineVersion: number;
            generatedAt: string;
            result?: unknown;
        }, {
            id: string;
            mode: string;
            answers: Record<string, unknown>;
            templateKey: string | null;
            templateVersion: number | null;
            engineVersion: number;
            generatedAt: string;
            result?: unknown;
        }>>;
    }, "strip", z.ZodTypeAny, {
        available: boolean;
        completedCount: number;
        latest: {
            id: string;
            mode: string;
            answers: Record<string, unknown>;
            templateKey: string | null;
            templateVersion: number | null;
            engineVersion: number;
            generatedAt: string;
            result?: unknown;
        } | null;
    }, {
        available: boolean;
        completedCount: number;
        latest: {
            id: string;
            mode: string;
            answers: Record<string, unknown>;
            templateKey: string | null;
            templateVersion: number | null;
            engineVersion: number;
            generatedAt: string;
            result?: unknown;
        } | null;
    }>;
    support: z.ZodObject<{
        total: z.ZodNumber;
        open: z.ZodNumber;
        latest: z.ZodNullable<z.ZodObject<{
            id: z.ZodString;
            subject: z.ZodString;
            status: z.ZodString;
            priority: z.ZodString;
            lastMessageAt: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            status: string;
            id: string;
            priority: string;
            subject: string;
            lastMessageAt: string;
        }, {
            status: string;
            id: string;
            priority: string;
            subject: string;
            lastMessageAt: string;
        }>>;
    }, "strip", z.ZodTypeAny, {
        total: number;
        latest: {
            status: string;
            id: string;
            priority: string;
            subject: string;
            lastMessageAt: string;
        } | null;
        open: number;
    }, {
        total: number;
        latest: {
            status: string;
            id: string;
            priority: string;
            subject: string;
            lastMessageAt: string;
        } | null;
        open: number;
    }>;
    reviews: z.ZodObject<{
        count: z.ZodNumber;
        averageRating: z.ZodNullable<z.ZodNumber>;
        recent: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            productId: z.ZodString;
            productName: z.ZodString;
            rating: z.ZodNumber;
            status: z.ZodString;
            verifiedPurchase: z.ZodBoolean;
            createdAt: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            status: string;
            id: string;
            createdAt: string;
            productId: string;
            productName: string;
            rating: number;
            verifiedPurchase: boolean;
        }, {
            status: string;
            id: string;
            createdAt: string;
            productId: string;
            productName: string;
            rating: number;
            verifiedPurchase: boolean;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        count: number;
        recent: {
            status: string;
            id: string;
            createdAt: string;
            productId: string;
            productName: string;
            rating: number;
            verifiedPurchase: boolean;
        }[];
        averageRating: number | null;
    }, {
        count: number;
        recent: {
            status: string;
            id: string;
            createdAt: string;
            productId: string;
            productName: string;
            rating: number;
            verifiedPurchase: boolean;
        }[];
        averageRating: number | null;
    }>;
    addresses: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        label: z.ZodNullable<z.ZodString>;
        receiverName: z.ZodString;
        phone: z.ZodString;
        line: z.ZodString;
        isDefault: z.ZodBoolean;
        updatedAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        phone: string;
        updatedAt: string;
        label: string | null;
        receiverName: string;
        isDefault: boolean;
        line: string;
    }, {
        id: string;
        phone: string;
        updatedAt: string;
        label: string | null;
        receiverName: string;
        isDefault: boolean;
        line: string;
    }>, "many">;
    communications: z.ZodObject<{
        orderEmail: z.ZodEnum<["ENABLED", "UNAVAILABLE"]>;
        marketingEmail: z.ZodEnum<["SUBSCRIBED", "UNSUBSCRIBED", "UNKNOWN"]>;
        sms: z.ZodLiteral<"UNKNOWN">;
        push: z.ZodLiteral<"UNKNOWN">;
        source: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        push: "UNKNOWN";
        source: string;
        orderEmail: "ENABLED" | "UNAVAILABLE";
        marketingEmail: "SUBSCRIBED" | "UNSUBSCRIBED" | "UNKNOWN";
        sms: "UNKNOWN";
    }, {
        push: "UNKNOWN";
        source: string;
        orderEmail: "ENABLED" | "UNAVAILABLE";
        marketingEmail: "SUBSCRIBED" | "UNSUBSCRIBED" | "UNKNOWN";
        sms: "UNKNOWN";
    }>;
    notes: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        content: z.ZodString;
        author: z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            id: string;
            name: string;
        }, {
            id: string;
            name: string;
        }>;
        createdAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        createdAt: string;
        author: {
            id: string;
            name: string;
        };
        content: string;
    }, {
        id: string;
        createdAt: string;
        author: {
            id: string;
            name: string;
        };
        content: string;
    }>, "many">;
    tags: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        key: z.ZodString;
        labelEn: z.ZodString;
        labelAr: z.ZodString;
        color: z.ZodString;
        assignedAt: z.ZodNullable<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        key: string;
        labelEn: string;
        labelAr: string;
        color: string;
        assignedAt: string | null;
    }, {
        id: string;
        key: string;
        labelEn: string;
        labelAr: string;
        color: string;
        assignedAt: string | null;
    }>, "many">;
    segments: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        key: z.ZodString;
        name: z.ZodString;
        reasons: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        key: string;
        name: string;
        reasons: string[];
    }, {
        id: string;
        key: string;
        name: string;
        reasons: string[];
    }>, "many">;
    recentTimeline: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        type: z.ZodString;
        group: z.ZodEnum<["ACCOUNT", "ORDERS", "SHOPPING", "WISHLIST", "PROMOTIONS", "ROUTINE", "SUPPORT", "REVIEWS", "PAYMENTS", "ADMIN"]>;
        source: z.ZodString;
        entityType: z.ZodString;
        entityId: z.ZodNullable<z.ZodString>;
        occurredAt: z.ZodString;
        title: z.ZodString;
        detail: z.ZodNullable<z.ZodString>;
        amount: z.ZodNullable<z.ZodNumber>;
        metadata: z.ZodRecord<z.ZodString, z.ZodUnknown>;
        recordedAt: z.ZodOptional<z.ZodString>;
        schemaVersion: z.ZodOptional<z.ZodNumber>;
        captureMode: z.ZodOptional<z.ZodEnum<["LIVE_EVENT", "BACKFILLED", "BACKFILLED_CURRENT", "BACKFILLED_REPAIR"]>>;
        correlationId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        type: string;
        id: string;
        amount: number | null;
        source: string;
        metadata: Record<string, unknown>;
        title: string;
        entityId: string | null;
        occurredAt: string;
        group: "ADMIN" | "ACCOUNT" | "ORDERS" | "SHOPPING" | "WISHLIST" | "PROMOTIONS" | "ROUTINE" | "SUPPORT" | "REVIEWS" | "PAYMENTS";
        entityType: string;
        detail: string | null;
        schemaVersion?: number | undefined;
        recordedAt?: string | undefined;
        captureMode?: "LIVE_EVENT" | "BACKFILLED" | "BACKFILLED_CURRENT" | "BACKFILLED_REPAIR" | undefined;
        correlationId?: string | null | undefined;
    }, {
        type: string;
        id: string;
        amount: number | null;
        source: string;
        metadata: Record<string, unknown>;
        title: string;
        entityId: string | null;
        occurredAt: string;
        group: "ADMIN" | "ACCOUNT" | "ORDERS" | "SHOPPING" | "WISHLIST" | "PROMOTIONS" | "ROUTINE" | "SUPPORT" | "REVIEWS" | "PAYMENTS";
        entityType: string;
        detail: string | null;
        schemaVersion?: number | undefined;
        recordedAt?: string | undefined;
        captureMode?: "LIVE_EVENT" | "BACKFILLED" | "BACKFILLED_CURRENT" | "BACKFILLED_REPAIR" | undefined;
        correlationId?: string | null | undefined;
    }>, "many">;
    freshness: z.ZodObject<{
        generatedAt: z.ZodString;
        sourceMode: z.ZodLiteral<"READ_THROUGH">;
        stale: z.ZodLiteral<false>;
        optionalFailures: z.ZodArray<z.ZodObject<{
            widget: z.ZodString;
            message: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            message: string;
            widget: string;
        }, {
            message: string;
            widget: string;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        generatedAt: string;
        sourceMode: "READ_THROUGH";
        stale: false;
        optionalFailures: {
            message: string;
            widget: string;
        }[];
    }, {
        generatedAt: string;
        sourceMode: "READ_THROUGH";
        stale: false;
        optionalFailures: {
            message: string;
            widget: string;
        }[];
    }>;
    capabilities: z.ZodObject<{
        viewPii: z.ZodBoolean;
        addNote: z.ZodBoolean;
        manageTags: z.ZodBoolean;
        manageSegments: z.ZodBoolean;
        viewOrders: z.ZodBoolean;
        viewPayments: z.ZodBoolean;
        viewSupport: z.ZodBoolean;
        viewRoutine: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        viewPii: boolean;
        addNote: boolean;
        manageTags: boolean;
        manageSegments: boolean;
        viewOrders: boolean;
        viewPayments: boolean;
        viewSupport: boolean;
        viewRoutine: boolean;
    }, {
        viewPii: boolean;
        addNote: boolean;
        manageTags: boolean;
        manageSegments: boolean;
        viewOrders: boolean;
        viewPayments: boolean;
        viewSupport: boolean;
        viewRoutine: boolean;
    }>;
}, "strip", z.ZodTypeAny, {
    addresses: {
        id: string;
        phone: string;
        updatedAt: string;
        label: string | null;
        receiverName: string;
        isDefault: boolean;
        line: string;
    }[];
    recentOrders: {
        status: string;
        id: string;
        updatedAt: string;
        orderNumber: string;
        paymentStatus: string;
        paymentMethod: string;
        grandTotal: number;
        currency: string;
        placedAt: string;
        discountTotal: number;
    }[];
    notes: {
        id: string;
        createdAt: string;
        author: {
            id: string;
            name: string;
        };
        content: string;
    }[];
    tags: {
        id: string;
        key: string;
        labelEn: string;
        labelAr: string;
        color: string;
        assignedAt: string | null;
    }[];
    cart: {
        total: number;
        updatedAt: string | null;
        quantity: number;
        items: {
            name: string;
            variantId: string | null;
            quantity: number;
            productId: string;
            imageUrl: string | null;
            slug: string;
            unitPrice: number;
            currentValue: number;
        }[];
        couponCode: string | null;
        exists: boolean;
        lineCount: number;
    };
    identity: {
        status: "ACTIVE" | "INACTIVE" | "DELETED";
        id: string;
        firstName: string;
        lastName: string;
        phone: string;
        email: string | null;
        createdAt: string;
        updatedAt: string;
        isVip: boolean;
        phoneVerified: boolean;
        emailVerified: boolean;
        piiMasked: boolean;
        verification: "VERIFIED" | "PARTIALLY_VERIFIED" | "UNVERIFIED";
        preferredLanguage: string | null;
        lastActivityAt: string | null;
    };
    metrics: {
        lastOrderAt: string | null;
        averageOrderValue: number;
        wishlistCount: number;
        orders: number;
        netSpend: number;
        completedOrders: number;
        cancelledOrders: number;
        refundedOrders: number;
        recognizedRevenue: number;
        refunds: number;
        discountsReceived: number;
        firstOrderAt: string | null;
        daysSinceLastOrder: number | null;
        wishlistValue: number;
        activeCartValue: number;
        activeCartLines: number;
        reviewsCount: number;
        supportThreads: number;
        openSupportThreads: number;
    };
    relationship: {
        label: "ACTIVE" | "RETURNING" | "NEW" | "LAPSED" | "HIGH_VALUE";
        reasons: string[];
        frequency: number;
        recencyDays: number | null;
        monetary: number;
    };
    insights: {
        key: string;
        label: string;
        reasons: string[];
        tone: "WARNING" | "INFO" | "POSITIVE";
    }[];
    wishlist: {
        updatedAt: string | null;
        items: {
            name: string;
            variantId: string | null;
            quantity: number;
            productId: string;
            imageUrl: string | null;
            slug: string;
            unitPrice: number;
            currentValue: number;
        }[];
        count: number;
        currentValue: number;
    };
    affinities: {
        brands: {
            id: string;
            label: string;
            reasons: string[];
            strength: number;
        }[];
        categories: {
            id: string;
            label: string;
            reasons: string[];
            strength: number;
        }[];
        products: {
            id: string;
            label: string;
            reasons: string[];
            strength: number;
        }[];
    };
    promotions: {
        usageCount: number;
        totalDiscount: number;
        recent: {
            id: string;
            orderNumber: string;
            name: string;
            orderId: string;
            couponCode: string | null;
            discount: number;
            usedAt: string;
        }[];
    };
    routine: {
        available: boolean;
        completedCount: number;
        latest: {
            id: string;
            mode: string;
            answers: Record<string, unknown>;
            templateKey: string | null;
            templateVersion: number | null;
            engineVersion: number;
            generatedAt: string;
            result?: unknown;
        } | null;
    };
    support: {
        total: number;
        latest: {
            status: string;
            id: string;
            priority: string;
            subject: string;
            lastMessageAt: string;
        } | null;
        open: number;
    };
    reviews: {
        count: number;
        recent: {
            status: string;
            id: string;
            createdAt: string;
            productId: string;
            productName: string;
            rating: number;
            verifiedPurchase: boolean;
        }[];
        averageRating: number | null;
    };
    communications: {
        push: "UNKNOWN";
        source: string;
        orderEmail: "ENABLED" | "UNAVAILABLE";
        marketingEmail: "SUBSCRIBED" | "UNSUBSCRIBED" | "UNKNOWN";
        sms: "UNKNOWN";
    };
    segments: {
        id: string;
        key: string;
        name: string;
        reasons: string[];
    }[];
    recentTimeline: {
        type: string;
        id: string;
        amount: number | null;
        source: string;
        metadata: Record<string, unknown>;
        title: string;
        entityId: string | null;
        occurredAt: string;
        group: "ADMIN" | "ACCOUNT" | "ORDERS" | "SHOPPING" | "WISHLIST" | "PROMOTIONS" | "ROUTINE" | "SUPPORT" | "REVIEWS" | "PAYMENTS";
        entityType: string;
        detail: string | null;
        schemaVersion?: number | undefined;
        recordedAt?: string | undefined;
        captureMode?: "LIVE_EVENT" | "BACKFILLED" | "BACKFILLED_CURRENT" | "BACKFILLED_REPAIR" | undefined;
        correlationId?: string | null | undefined;
    }[];
    freshness: {
        generatedAt: string;
        sourceMode: "READ_THROUGH";
        stale: false;
        optionalFailures: {
            message: string;
            widget: string;
        }[];
    };
    capabilities: {
        viewPii: boolean;
        addNote: boolean;
        manageTags: boolean;
        manageSegments: boolean;
        viewOrders: boolean;
        viewPayments: boolean;
        viewSupport: boolean;
        viewRoutine: boolean;
    };
}, {
    addresses: {
        id: string;
        phone: string;
        updatedAt: string;
        label: string | null;
        receiverName: string;
        isDefault: boolean;
        line: string;
    }[];
    recentOrders: {
        status: string;
        id: string;
        updatedAt: string;
        orderNumber: string;
        paymentStatus: string;
        paymentMethod: string;
        grandTotal: number;
        currency: string;
        placedAt: string;
        discountTotal: number;
    }[];
    notes: {
        id: string;
        createdAt: string;
        author: {
            id: string;
            name: string;
        };
        content: string;
    }[];
    tags: {
        id: string;
        key: string;
        labelEn: string;
        labelAr: string;
        color: string;
        assignedAt: string | null;
    }[];
    cart: {
        total: number;
        updatedAt: string | null;
        quantity: number;
        items: {
            name: string;
            variantId: string | null;
            quantity: number;
            productId: string;
            imageUrl: string | null;
            slug: string;
            unitPrice: number;
            currentValue: number;
        }[];
        couponCode: string | null;
        exists: boolean;
        lineCount: number;
    };
    identity: {
        status: "ACTIVE" | "INACTIVE" | "DELETED";
        id: string;
        firstName: string;
        lastName: string;
        phone: string;
        email: string | null;
        createdAt: string;
        updatedAt: string;
        isVip: boolean;
        phoneVerified: boolean;
        emailVerified: boolean;
        piiMasked: boolean;
        verification: "VERIFIED" | "PARTIALLY_VERIFIED" | "UNVERIFIED";
        preferredLanguage: string | null;
        lastActivityAt: string | null;
    };
    metrics: {
        lastOrderAt: string | null;
        averageOrderValue: number;
        wishlistCount: number;
        orders: number;
        netSpend: number;
        completedOrders: number;
        cancelledOrders: number;
        refundedOrders: number;
        recognizedRevenue: number;
        refunds: number;
        discountsReceived: number;
        firstOrderAt: string | null;
        daysSinceLastOrder: number | null;
        wishlistValue: number;
        activeCartValue: number;
        activeCartLines: number;
        reviewsCount: number;
        supportThreads: number;
        openSupportThreads: number;
    };
    relationship: {
        label: "ACTIVE" | "RETURNING" | "NEW" | "LAPSED" | "HIGH_VALUE";
        reasons: string[];
        frequency: number;
        recencyDays: number | null;
        monetary: number;
    };
    insights: {
        key: string;
        label: string;
        reasons: string[];
        tone: "WARNING" | "INFO" | "POSITIVE";
    }[];
    wishlist: {
        updatedAt: string | null;
        items: {
            name: string;
            variantId: string | null;
            quantity: number;
            productId: string;
            imageUrl: string | null;
            slug: string;
            unitPrice: number;
            currentValue: number;
        }[];
        count: number;
        currentValue: number;
    };
    affinities: {
        brands: {
            id: string;
            label: string;
            reasons: string[];
            strength: number;
        }[];
        categories: {
            id: string;
            label: string;
            reasons: string[];
            strength: number;
        }[];
        products: {
            id: string;
            label: string;
            reasons: string[];
            strength: number;
        }[];
    };
    promotions: {
        usageCount: number;
        totalDiscount: number;
        recent: {
            id: string;
            orderNumber: string;
            name: string;
            orderId: string;
            couponCode: string | null;
            discount: number;
            usedAt: string;
        }[];
    };
    routine: {
        available: boolean;
        completedCount: number;
        latest: {
            id: string;
            mode: string;
            answers: Record<string, unknown>;
            templateKey: string | null;
            templateVersion: number | null;
            engineVersion: number;
            generatedAt: string;
            result?: unknown;
        } | null;
    };
    support: {
        total: number;
        latest: {
            status: string;
            id: string;
            priority: string;
            subject: string;
            lastMessageAt: string;
        } | null;
        open: number;
    };
    reviews: {
        count: number;
        recent: {
            status: string;
            id: string;
            createdAt: string;
            productId: string;
            productName: string;
            rating: number;
            verifiedPurchase: boolean;
        }[];
        averageRating: number | null;
    };
    communications: {
        push: "UNKNOWN";
        source: string;
        orderEmail: "ENABLED" | "UNAVAILABLE";
        marketingEmail: "SUBSCRIBED" | "UNSUBSCRIBED" | "UNKNOWN";
        sms: "UNKNOWN";
    };
    segments: {
        id: string;
        key: string;
        name: string;
        reasons: string[];
    }[];
    recentTimeline: {
        type: string;
        id: string;
        amount: number | null;
        source: string;
        metadata: Record<string, unknown>;
        title: string;
        entityId: string | null;
        occurredAt: string;
        group: "ADMIN" | "ACCOUNT" | "ORDERS" | "SHOPPING" | "WISHLIST" | "PROMOTIONS" | "ROUTINE" | "SUPPORT" | "REVIEWS" | "PAYMENTS";
        entityType: string;
        detail: string | null;
        schemaVersion?: number | undefined;
        recordedAt?: string | undefined;
        captureMode?: "LIVE_EVENT" | "BACKFILLED" | "BACKFILLED_CURRENT" | "BACKFILLED_REPAIR" | undefined;
        correlationId?: string | null | undefined;
    }[];
    freshness: {
        generatedAt: string;
        sourceMode: "READ_THROUGH";
        stale: false;
        optionalFailures: {
            message: string;
            widget: string;
        }[];
    };
    capabilities: {
        viewPii: boolean;
        addNote: boolean;
        manageTags: boolean;
        manageSegments: boolean;
        viewOrders: boolean;
        viewPayments: boolean;
        viewSupport: boolean;
        viewRoutine: boolean;
    };
}>;
export type Customer360Overview = z.infer<typeof customer360OverviewSchema>;
//# sourceMappingURL=customer-360.schema.d.ts.map