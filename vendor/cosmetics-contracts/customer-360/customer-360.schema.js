"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customer360OverviewSchema = exports.customer360TimelineResponseSchema = exports.customer360TimelineEventSchema = exports.customer360ReconciliationConfigInputSchema = exports.customer360LayoutInputSchema = exports.customer360LayoutWidgetSchema = exports.customer360WidgetIdSchema = exports.customerMergeReverseInputSchema = exports.customerMergeExecuteInputSchema = exports.customerMergePreviewInputSchema = exports.customerExportInputSchema = exports.customerInsightRuleInputSchema = exports.customerSegmentMembersQuerySchema = exports.customerSegmentPreviewSchema = exports.customerSegmentDeleteInputSchema = exports.customerSegmentDuplicateInputSchema = exports.customerSegmentLifecycleInputSchema = exports.customerSegmentListQuerySchema = exports.customerSegmentDraftInputSchema = exports.customerSegmentInputSchema = exports.customerSegmentRuleGroupSchema = exports.customerSegmentConditionSchema = exports.customerSegmentOperatorSchema = exports.customerSegmentDimensionSchema = exports.customer360TagAssignmentSchema = exports.customer360TagInputSchema = exports.customer360NoteInputSchema = exports.customer360PaymentsResponseSchema = exports.customer360PaymentsQuerySchema = exports.customer360TimelineQuerySchema = exports.customer360TimelineFilterSchema = void 0;
const zod_1 = require("zod");
const primitives_1 = require("../common/primitives");
exports.customer360TimelineFilterSchema = zod_1.z.enum([
    "ALL",
    "ACCOUNT",
    "ORDERS",
    "SHOPPING",
    "WISHLIST",
    "PROMOTIONS",
    "ROUTINE",
    "SUPPORT",
    "REVIEWS",
    "PAYMENTS",
    "ADMIN",
]);
exports.customer360TimelineQuerySchema = zod_1.z.object({
    cursor: zod_1.z.string().trim().min(1).max(400).optional(),
    limit: zod_1.z.coerce.number().int().min(1).max(100).default(30),
    filter: exports.customer360TimelineFilterSchema.default("ALL"),
    search: zod_1.z.string().trim().min(2).max(120).optional(),
});
exports.customer360PaymentsQuerySchema = zod_1.z.object({
    cursor: zod_1.z.string().trim().min(1).max(400).optional(),
    limit: zod_1.z.coerce.number().int().min(1).max(100).default(30),
    kind: zod_1.z.enum(["ALL", "REFUNDS"]).default("ALL"),
});
exports.customer360PaymentsResponseSchema = zod_1.z.object({
    summary: zod_1.z.object({
        recognizedPayments: zod_1.z.number().int(),
        refundedAmount: zod_1.z.number().int(),
        pendingRefunds: zod_1.z.null(),
        failedPayments: zod_1.z.number().int(),
        lastPaymentAt: zod_1.z.string().nullable(),
        lastRefundAt: zod_1.z.string().nullable(),
    }),
    data: zod_1.z.array(zod_1.z.object({
        id: primitives_1.uuidSchema,
        orderId: primitives_1.uuidSchema,
        orderNumber: zod_1.z.string(),
        method: zod_1.z.string(),
        amount: zod_1.z.number().int(),
        currency: zod_1.z.string(),
        status: zod_1.z.string(),
        createdAt: zod_1.z.string(),
        updatedAt: zod_1.z.string(),
    })),
    nextCursor: zod_1.z.string().nullable(),
    hasMore: zod_1.z.boolean(),
});
exports.customer360NoteInputSchema = zod_1.z
    .object({
    content: zod_1.z.string().trim().min(2).max(2000),
})
    .strict();
exports.customer360TagInputSchema = zod_1.z
    .object({
    key: zod_1.z
        .string()
        .trim()
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
        .max(64),
    labelEn: zod_1.z.string().trim().min(2).max(80),
    labelAr: zod_1.z.string().trim().min(2).max(80),
    description: zod_1.z.string().trim().max(500).default(""),
    color: zod_1.z
        .enum(["NEUTRAL", "GOLD", "GREEN", "BLUE", "RED"])
        .default("NEUTRAL"),
})
    .strict();
exports.customer360TagAssignmentSchema = zod_1.z
    .object({ tagId: primitives_1.uuidSchema })
    .strict();
exports.customerSegmentDimensionSchema = zod_1.z.enum([
    "ACCOUNT_AGE_DAYS",
    "VERIFIED",
    "ORDER_COUNT",
    "COMPLETED_ORDER_COUNT",
    "NET_SPEND",
    "AVERAGE_ORDER_VALUE",
    "DAYS_SINCE_LAST_ORDER",
    "REFUND_COUNT",
    "WISHLIST_COUNT",
    "ACTIVE_CART",
    "ROUTINE_COMPLETION_COUNT",
    "REVIEW_COUNT",
    "COUPON_USAGE_COUNT",
    "PURCHASED_PRODUCT",
    "PURCHASED_BRAND",
    "PURCHASED_CATEGORY",
    "MANAGED_TAG",
    "PREFERRED_LANGUAGE",
    "ACCOUNT_STATUS",
]);
exports.customerSegmentOperatorSchema = zod_1.z.enum([
    "EQUALS",
    "NOT_EQUALS",
    "GREATER_THAN",
    "GREATER_THAN_OR_EQUAL",
    "LESS_THAN",
    "LESS_THAN_OR_EQUAL",
    "IN",
    "NOT_IN",
    "HAS_TAG",
    "DOES_NOT_HAVE_TAG",
    "HAS_ANY_OF",
    "HAS_ALL_OF",
]);
exports.customerSegmentConditionSchema = zod_1.z
    .object({
    id: primitives_1.uuidSchema,
    dimension: exports.customerSegmentDimensionSchema,
    operator: exports.customerSegmentOperatorSchema,
    value: zod_1.z.union([
        zod_1.z.boolean(),
        zod_1.z.number().int(),
        zod_1.z.string().trim().min(1).max(180),
        zod_1.z.array(zod_1.z.string().trim().min(1).max(180)).min(1).max(100),
    ]),
})
    .strict();
exports.customerSegmentRuleGroupSchema = zod_1.z.lazy(() => zod_1.z
    .object({
    mode: zod_1.z.enum(["ALL", "ANY"]),
    conditions: zod_1.z.array(exports.customerSegmentConditionSchema).max(30),
    groups: zod_1.z.array(exports.customerSegmentRuleGroupSchema).max(8),
})
    .strict()
    .refine((value) => value.conditions.length + value.groups.length > 0, "A segment group cannot be empty"));
exports.customerSegmentInputSchema = zod_1.z
    .object({
    key: zod_1.z
        .string()
        .trim()
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
        .max(80),
    internalName: zod_1.z.string().trim().min(2).max(120),
    nameEn: zod_1.z.string().trim().min(2).max(120),
    nameAr: zod_1.z.string().trim().min(2).max(120),
    descriptionEn: zod_1.z.string().trim().max(500).default(""),
    descriptionAr: zod_1.z.string().trim().max(500).default(""),
    status: zod_1.z.enum(["DRAFT", "ACTIVE", "ARCHIVED"]).default("DRAFT"),
    rules: exports.customerSegmentRuleGroupSchema,
})
    .strict();
exports.customerSegmentDraftInputSchema = exports.customerSegmentInputSchema
    .omit({ status: true })
    .extend({
    expectedRevisionToken: zod_1.z.number().int().positive(),
})
    .strict();
exports.customerSegmentListQuerySchema = zod_1.z
    .object({
    page: zod_1.z.coerce.number().int().positive().default(1),
    limit: zod_1.z.coerce.number().int().positive().max(100).default(25),
    search: zod_1.z.string().trim().min(1).max(120).optional(),
    status: zod_1.z.enum(["DRAFT", "ACTIVE", "ARCHIVED"]).optional(),
    usage: zod_1.z.enum(["USED", "UNUSED"]).optional(),
    sortBy: zod_1.z.enum(["updatedAt", "name", "members", "createdAt"]).default("updatedAt"),
    sortOrder: zod_1.z.enum(["asc", "desc"]).default("desc"),
})
    .strict();
exports.customerSegmentLifecycleInputSchema = zod_1.z
    .object({
    expectedRevisionToken: zod_1.z.number().int().positive(),
    reason: zod_1.z.string().trim().min(3).max(500),
    confirmImpact: zod_1.z.boolean().default(false),
})
    .strict();
exports.customerSegmentDuplicateInputSchema = zod_1.z
    .object({
    key: zod_1.z.string().trim().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).max(80),
    nameEn: zod_1.z.string().trim().min(2).max(120),
    nameAr: zod_1.z.string().trim().min(2).max(120),
})
    .strict();
exports.customerSegmentDeleteInputSchema = zod_1.z
    .object({
    expectedRevisionToken: zod_1.z.number().int().positive(),
    confirmation: zod_1.z.literal("DELETE"),
    reason: zod_1.z.string().trim().min(3).max(500),
})
    .strict();
exports.customerSegmentPreviewSchema = zod_1.z
    .object({
    rules: exports.customerSegmentRuleGroupSchema,
    limit: zod_1.z.coerce.number().int().min(1).max(25).default(10),
    customerId: primitives_1.uuidSchema.optional(),
})
    .strict();
exports.customerSegmentMembersQuerySchema = zod_1.z
    .object({
    page: zod_1.z.coerce.number().int().positive().default(1),
    limit: zod_1.z.coerce.number().int().min(1).max(100).default(25),
    cursor: zod_1.z.string().max(500).optional(),
    search: zod_1.z.string().trim().min(1).max(120).optional(),
    sortBy: zod_1.z.enum(["createdAt", "name", "orders", "netSpend", "lastOrder"]).default("createdAt"),
    sortOrder: zod_1.z.enum(["asc", "desc"]).default("desc"),
    configuration: zod_1.z.enum(["ACTIVE", "DRAFT"]).default("ACTIVE"),
})
    .strict();
exports.customerInsightRuleInputSchema = zod_1.z
    .object({
    labelEn: zod_1.z.string().trim().min(2).max(120),
    labelAr: zod_1.z.string().trim().min(2).max(120),
    tone: zod_1.z.enum(["INFO", "POSITIVE", "WARNING"]),
    enabled: zod_1.z.boolean(),
    priority: zod_1.z.number().int().min(0).max(10_000),
    rules: exports.customerSegmentRuleGroupSchema,
})
    .strict();
exports.customerExportInputSchema = zod_1.z
    .object({
    scope: zod_1.z.discriminatedUnion("kind", [
        zod_1.z.object({ kind: zod_1.z.literal("SINGLE"), customerId: primitives_1.uuidSchema }).strict(),
        zod_1.z
            .object({
            kind: zod_1.z.literal("SELECTED"),
            customerIds: zod_1.z.array(primitives_1.uuidSchema).min(1).max(5000),
        })
            .strict(),
        zod_1.z.object({ kind: zod_1.z.literal("SEGMENT"), segmentId: primitives_1.uuidSchema }).strict(),
        zod_1.z.object({ kind: zod_1.z.literal("ALL") }).strict(),
    ]),
    fieldGroups: zod_1.z
        .array(zod_1.z.enum([
        "IDENTITY",
        "COMMERCE_SUMMARY",
        "TAGS",
        "SEGMENTS",
        "PROMOTIONS",
        "ROUTINE_SUMMARY",
        "SUPPORT_METADATA",
    ]))
        .min(1),
    includeDynamicSegmentMemberships: zod_1.z.boolean().default(false),
})
    .strict();
const mergeFieldResolutionSchema = zod_1.z.enum(["SOURCE", "TARGET"]);
exports.customerMergePreviewInputSchema = zod_1.z
    .object({
    sourceCustomerId: primitives_1.uuidSchema,
    targetCustomerId: primitives_1.uuidSchema,
})
    .strict()
    .refine((value) => value.sourceCustomerId !== value.targetCustomerId, "Source and target customers must be different");
exports.customerMergeExecuteInputSchema = zod_1.z
    .object({
    previewHash: zod_1.z.string().trim().min(32).max(96),
    expectedVersion: zod_1.z.number().int().positive(),
    reason: zod_1.z.string().trim().min(10).max(500),
    confirmation: zod_1.z.literal("MERGE"),
    resolutions: zod_1.z
        .object({
        firstName: mergeFieldResolutionSchema,
        lastName: mergeFieldResolutionSchema,
        email: mergeFieldResolutionSchema,
        phone: mergeFieldResolutionSchema,
        preferredLocale: mergeFieldResolutionSchema,
        isVip: mergeFieldResolutionSchema,
        defaultAddressId: primitives_1.uuidSchema.nullable(),
        cart: zod_1.z.enum(["MERGE", "KEEP_SOURCE", "KEEP_TARGET"]),
        duplicateReviews: zod_1.z.enum(["KEEP_SOURCE", "KEEP_TARGET"]),
    })
        .strict(),
})
    .strict();
exports.customerMergeReverseInputSchema = zod_1.z
    .object({
    expectedVersion: zod_1.z.number().int().positive(),
    reason: zod_1.z.string().trim().min(10).max(500),
    confirmation: zod_1.z.literal("REVERSE"),
})
    .strict();
exports.customer360WidgetIdSchema = zod_1.z.enum([
    "IDENTITY",
    "COMMERCIAL_SUMMARY",
    "LATEST_ORDER",
    "ORDERS",
    "PAYMENTS",
    "CART",
    "WISHLIST",
    "ROUTINE",
    "PROMOTIONS",
    "SUPPORT",
    "REVIEWS",
    "ADDRESSES",
    "AFFINITY",
    "SEGMENTS",
    "INSIGHTS",
    "ACTIVITY",
    "NOTES",
    "TAGS",
]);
exports.customer360LayoutWidgetSchema = zod_1.z
    .object({
    widgetId: exports.customer360WidgetIdSchema,
    size: zod_1.z.enum(["SMALL", "MEDIUM", "WIDE"]),
    visible: zod_1.z.boolean(),
})
    .strict();
exports.customer360LayoutInputSchema = zod_1.z
    .object({
    expectedVersion: zod_1.z.number().int().nonnegative(),
    widgets: zod_1.z
        .array(exports.customer360LayoutWidgetSchema)
        .min(1)
        .max(exports.customer360WidgetIdSchema.options.length)
        .refine((items) => new Set(items.map((item) => item.widgetId)).size === items.length, "A widget may appear only once"),
})
    .strict();
exports.customer360ReconciliationConfigInputSchema = zod_1.z
    .object({
    enabled: zod_1.z.boolean(),
    frequentBatchSize: zod_1.z.number().int().min(1).max(2000),
    rollingBatchSize: zod_1.z.number().int().min(1).max(2000),
    recentWindowMinutes: zod_1.z.number().int().min(5).max(10080),
    autoRepairDerived: zod_1.z.boolean(),
    driftWarningBps: zod_1.z.number().int().min(0).max(10000),
})
    .strict();
exports.customer360TimelineEventSchema = zod_1.z.object({
    id: zod_1.z.string(),
    type: zod_1.z.string(),
    group: exports.customer360TimelineFilterSchema.exclude(["ALL"]),
    source: zod_1.z.string(),
    entityType: zod_1.z.string(),
    entityId: zod_1.z.string().nullable(),
    occurredAt: zod_1.z.string(),
    title: zod_1.z.string(),
    detail: zod_1.z.string().nullable(),
    amount: zod_1.z.number().int().nullable(),
    metadata: zod_1.z.record(zod_1.z.string(), zod_1.z.unknown()),
    recordedAt: zod_1.z.string().optional(),
    schemaVersion: zod_1.z.number().int().positive().optional(),
    captureMode: zod_1.z
        .enum([
        "LIVE_EVENT",
        "BACKFILLED",
        "BACKFILLED_CURRENT",
        "BACKFILLED_REPAIR",
    ])
        .optional(),
    correlationId: zod_1.z.string().nullable().optional(),
});
exports.customer360TimelineResponseSchema = zod_1.z.object({
    data: zod_1.z.array(exports.customer360TimelineEventSchema),
    nextCursor: zod_1.z.string().nullable(),
    hasMore: zod_1.z.boolean(),
});
const identitySchema = zod_1.z.object({
    id: primitives_1.uuidSchema,
    firstName: zod_1.z.string(),
    lastName: zod_1.z.string(),
    email: zod_1.z.string().nullable(),
    phone: zod_1.z.string(),
    piiMasked: zod_1.z.boolean(),
    status: zod_1.z.enum(["ACTIVE", "INACTIVE", "DELETED"]),
    verification: zod_1.z.enum(["VERIFIED", "PARTIALLY_VERIFIED", "UNVERIFIED"]),
    phoneVerified: zod_1.z.boolean(),
    emailVerified: zod_1.z.boolean(),
    isVip: zod_1.z.boolean(),
    preferredLanguage: zod_1.z.string().nullable(),
    createdAt: zod_1.z.string(),
    updatedAt: zod_1.z.string(),
    lastActivityAt: zod_1.z.string().nullable(),
});
const metricsSchema = zod_1.z.object({
    orders: zod_1.z.number().int(),
    completedOrders: zod_1.z.number().int(),
    cancelledOrders: zod_1.z.number().int(),
    refundedOrders: zod_1.z.number().int(),
    recognizedRevenue: zod_1.z.number().int(),
    refunds: zod_1.z.number().int(),
    netSpend: zod_1.z.number().int(),
    averageOrderValue: zod_1.z.number().int(),
    discountsReceived: zod_1.z.number().int(),
    firstOrderAt: zod_1.z.string().nullable(),
    lastOrderAt: zod_1.z.string().nullable(),
    daysSinceLastOrder: zod_1.z.number().int().nullable(),
    wishlistCount: zod_1.z.number().int(),
    wishlistValue: zod_1.z.number().int(),
    activeCartValue: zod_1.z.number().int(),
    activeCartLines: zod_1.z.number().int(),
    reviewsCount: zod_1.z.number().int(),
    supportThreads: zod_1.z.number().int(),
    openSupportThreads: zod_1.z.number().int(),
});
const compactProductSchema = zod_1.z.object({
    productId: primitives_1.uuidSchema,
    variantId: primitives_1.uuidSchema.nullable(),
    slug: zod_1.z.string(),
    name: zod_1.z.string(),
    imageUrl: zod_1.z.string().nullable(),
    quantity: zod_1.z.number().int().positive(),
    unitPrice: zod_1.z.number().int(),
    currentValue: zod_1.z.number().int(),
});
const compactOrderSchema = zod_1.z.object({
    id: primitives_1.uuidSchema,
    orderNumber: zod_1.z.string(),
    status: zod_1.z.string(),
    paymentStatus: zod_1.z.string(),
    paymentMethod: zod_1.z.string(),
    grandTotal: zod_1.z.number().int(),
    discountTotal: zod_1.z.number().int(),
    currency: zod_1.z.string(),
    placedAt: zod_1.z.string(),
    updatedAt: zod_1.z.string(),
});
const affinitySchema = zod_1.z.object({
    id: zod_1.z.string(),
    label: zod_1.z.string(),
    strength: zod_1.z.number().int(),
    reasons: zod_1.z.array(zod_1.z.string()),
});
const insightSchema = zod_1.z.object({
    key: zod_1.z.string(),
    label: zod_1.z.string(),
    tone: zod_1.z.enum(["INFO", "POSITIVE", "WARNING"]),
    reasons: zod_1.z.array(zod_1.z.string()),
});
const tagSchema = zod_1.z.object({
    id: primitives_1.uuidSchema,
    key: zod_1.z.string(),
    labelEn: zod_1.z.string(),
    labelAr: zod_1.z.string(),
    color: zod_1.z.string(),
    assignedAt: zod_1.z.string().nullable(),
});
const noteSchema = zod_1.z.object({
    id: primitives_1.uuidSchema,
    content: zod_1.z.string(),
    author: zod_1.z.object({ id: primitives_1.uuidSchema, name: zod_1.z.string() }),
    createdAt: zod_1.z.string(),
});
exports.customer360OverviewSchema = zod_1.z.object({
    identity: identitySchema,
    metrics: metricsSchema,
    relationship: zod_1.z.object({
        label: zod_1.z.enum(["NEW", "ACTIVE", "RETURNING", "LAPSED", "HIGH_VALUE"]),
        recencyDays: zod_1.z.number().int().nullable(),
        frequency: zod_1.z.number().int(),
        monetary: zod_1.z.number().int(),
        reasons: zod_1.z.array(zod_1.z.string()),
    }),
    insights: zod_1.z.array(insightSchema),
    recentOrders: zod_1.z.array(compactOrderSchema),
    cart: zod_1.z.object({
        exists: zod_1.z.boolean(),
        updatedAt: zod_1.z.string().nullable(),
        couponCode: zod_1.z.string().nullable(),
        total: zod_1.z.number().int(),
        lineCount: zod_1.z.number().int(),
        quantity: zod_1.z.number().int(),
        items: zod_1.z.array(compactProductSchema),
    }),
    wishlist: zod_1.z.object({
        count: zod_1.z.number().int(),
        currentValue: zod_1.z.number().int(),
        updatedAt: zod_1.z.string().nullable(),
        items: zod_1.z.array(compactProductSchema),
    }),
    affinities: zod_1.z.object({
        products: zod_1.z.array(affinitySchema),
        brands: zod_1.z.array(affinitySchema),
        categories: zod_1.z.array(affinitySchema),
    }),
    promotions: zod_1.z.object({
        usageCount: zod_1.z.number().int(),
        totalDiscount: zod_1.z.number().int(),
        recent: zod_1.z.array(zod_1.z.object({
            id: zod_1.z.string(),
            name: zod_1.z.string(),
            couponCode: zod_1.z.string().nullable(),
            discount: zod_1.z.number().int(),
            orderId: primitives_1.uuidSchema,
            orderNumber: zod_1.z.string(),
            usedAt: zod_1.z.string(),
        })),
    }),
    routine: zod_1.z.object({
        available: zod_1.z.boolean(),
        completedCount: zod_1.z.number().int(),
        latest: zod_1.z
            .object({
            id: primitives_1.uuidSchema,
            templateKey: zod_1.z.string().nullable(),
            templateVersion: zod_1.z.number().int().nullable(),
            engineVersion: zod_1.z.number().int(),
            mode: zod_1.z.string(),
            generatedAt: zod_1.z.string(),
            answers: zod_1.z.record(zod_1.z.string(), zod_1.z.unknown()),
            result: zod_1.z.unknown().nullable(),
        })
            .nullable(),
    }),
    support: zod_1.z.object({
        total: zod_1.z.number().int(),
        open: zod_1.z.number().int(),
        latest: zod_1.z
            .object({
            id: primitives_1.uuidSchema,
            subject: zod_1.z.string(),
            status: zod_1.z.string(),
            priority: zod_1.z.string(),
            lastMessageAt: zod_1.z.string(),
        })
            .nullable(),
    }),
    reviews: zod_1.z.object({
        count: zod_1.z.number().int(),
        averageRating: zod_1.z.number().nullable(),
        recent: zod_1.z.array(zod_1.z.object({
            id: primitives_1.uuidSchema,
            productId: primitives_1.uuidSchema,
            productName: zod_1.z.string(),
            rating: zod_1.z.number().int(),
            status: zod_1.z.string(),
            verifiedPurchase: zod_1.z.boolean(),
            createdAt: zod_1.z.string(),
        })),
    }),
    addresses: zod_1.z.array(zod_1.z.object({
        id: primitives_1.uuidSchema,
        label: zod_1.z.string().nullable(),
        receiverName: zod_1.z.string(),
        phone: zod_1.z.string(),
        line: zod_1.z.string(),
        isDefault: zod_1.z.boolean(),
        updatedAt: zod_1.z.string(),
    })),
    communications: zod_1.z.object({
        orderEmail: zod_1.z.enum(["ENABLED", "UNAVAILABLE"]),
        marketingEmail: zod_1.z.enum(["SUBSCRIBED", "UNSUBSCRIBED", "UNKNOWN"]),
        sms: zod_1.z.literal("UNKNOWN"),
        push: zod_1.z.literal("UNKNOWN"),
        source: zod_1.z.string(),
    }),
    notes: zod_1.z.array(noteSchema),
    tags: zod_1.z.array(tagSchema),
    segments: zod_1.z.array(zod_1.z.object({
        id: primitives_1.uuidSchema,
        key: zod_1.z.string(),
        name: zod_1.z.string(),
        reasons: zod_1.z.array(zod_1.z.string()),
    })),
    recentTimeline: zod_1.z.array(exports.customer360TimelineEventSchema),
    freshness: zod_1.z.object({
        generatedAt: zod_1.z.string(),
        sourceMode: zod_1.z.literal("READ_THROUGH"),
        stale: zod_1.z.literal(false),
        optionalFailures: zod_1.z.array(zod_1.z.object({ widget: zod_1.z.string(), message: zod_1.z.string() })),
    }),
    capabilities: zod_1.z.object({
        viewPii: zod_1.z.boolean(),
        addNote: zod_1.z.boolean(),
        manageTags: zod_1.z.boolean(),
        manageSegments: zod_1.z.boolean(),
        viewOrders: zod_1.z.boolean(),
        viewPayments: zod_1.z.boolean(),
        viewSupport: zod_1.z.boolean(),
        viewRoutine: zod_1.z.boolean(),
    }),
});
//# sourceMappingURL=customer-360.schema.js.map