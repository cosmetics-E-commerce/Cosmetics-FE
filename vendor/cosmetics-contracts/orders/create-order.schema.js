"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginatedOrderTimelineSchema = exports.createOrderResponseSchema = exports.orderPaymentInstructionsSchema = exports.orderStatisticsSchema = exports.paginatedOrdersSchema = exports.orderResponseSchema = exports.orderEmailDeliveryResponseSchema = exports.orderEmailAttemptResponseSchema = exports.paymentProofResponseSchema = exports.invoiceResponseSchema = exports.orderCustomerSummarySchema = exports.orderTimelineResponseSchema = exports.orderItemResponseSchema = exports.orderQuerySchema = exports.updateOrderStatusSchema = exports.rejectPaymentProofSchema = exports.uploadPaymentProofSchema = exports.cancelOrderSchema = exports.checkoutOrderSchema = exports.createOrderSchema = exports.orderItemInputSchema = void 0;
const zod_1 = require("zod");
const pagination_1 = require("../common/pagination");
const primitives_1 = require("../common/primitives");
const enums_1 = require("../enums");
const shipping_schema_1 = require("../shipping/shipping.schema");
exports.orderItemInputSchema = zod_1.z.object({
    variantId: primitives_1.uuidSchema,
    quantity: zod_1.z.number().int().positive().max(99),
}).strict();
/**
 * POST /orders — requires an Idempotency-Key header.
 * The customer may submit cart-derived items; the API always revalidates
 * product status, price and stock server-side.
 */
exports.createOrderSchema = zod_1.z.object({
    items: zod_1.z
        .array(exports.orderItemInputSchema)
        .min(1, "Order must contain at least one item"),
    shippingAddressId: primitives_1.uuidSchema,
    paymentMethod: enums_1.PaymentMethodEnum,
    couponCode: (0, primitives_1.compactIdentifierSchema)(3, 32)
        .transform((value) => value.toUpperCase())
        .optional(),
    giftVariantIds: zod_1.z.array(primitives_1.uuidSchema).max(10).optional(),
    notes: zod_1.z.string().trim().max(500).optional(),
}).strict();
exports.checkoutOrderSchema = exports.createOrderSchema.omit({ items: true });
exports.cancelOrderSchema = zod_1.z.object({
    reason: zod_1.z.string().trim().min(3).max(500),
});
exports.uploadPaymentProofSchema = zod_1.z.object({
    imageKey: zod_1.z.string().trim().min(3).max(500),
    senderRef: zod_1.z.string().trim().min(3).max(64),
    txnReference: zod_1.z.string().trim().min(3).max(96),
    amountClaimed: primitives_1.piastresSchema,
});
exports.rejectPaymentProofSchema = zod_1.z.object({
    reason: enums_1.ProofRejectReasonEnum.default("OTHER"),
    adminNotes: zod_1.z.string().trim().min(3).max(500).optional(),
});
exports.updateOrderStatusSchema = zod_1.z.object({
    status: enums_1.OrderStatusEnum,
    note: zod_1.z.string().trim().min(3).max(500).optional(),
});
exports.orderQuerySchema = pagination_1.paginationQuerySchema.extend({
    status: enums_1.OrderStatusEnum.optional(),
    paymentStatus: enums_1.PaymentStatusEnum.optional(),
    shippingStatus: enums_1.ShipmentStatusEnum.optional(),
    customer: zod_1.z.string().trim().min(1).max(120).optional(),
    dateFrom: zod_1.z.string().datetime().optional(),
    dateTo: zod_1.z.string().datetime().optional(),
    totalMin: zod_1.z.coerce.number().int().min(0).optional(),
    totalMax: zod_1.z.coerce.number().int().min(0).optional(),
    city: zod_1.z.string().trim().min(1).max(120).optional(),
    governorate: zod_1.z.string().trim().min(1).max(120).optional(),
    search: zod_1.z.string().trim().min(1).max(120).optional(),
    orderNumber: zod_1.z.string().trim().min(3).max(32).optional(),
    trackingNumber: zod_1.z.string().trim().min(3).max(96).optional(),
    invoiceNumber: zod_1.z.string().trim().min(3).max(32).optional(),
    shippingProvider: enums_1.ShipmentProviderEnum.optional(),
    createdBy: primitives_1.uuidSchema.optional(),
    paymentMethod: enums_1.PaymentMethodEnum.optional(),
    sortBy: zod_1.z
        .enum(["placedAt", "updatedAt", "grandTotal", "orderNumber"])
        .default("placedAt"),
});
exports.orderItemResponseSchema = zod_1.z.object({
    id: primitives_1.uuidSchema,
    productId: primitives_1.uuidSchema,
    variantId: primitives_1.uuidSchema,
    productName: zod_1.z.string(),
    variantName: zod_1.z.string().nullable(),
    variantOptions: zod_1.z.array(zod_1.z.object({
        optionId: primitives_1.uuidSchema,
        optionNameEn: zod_1.z.string(),
        optionNameAr: zod_1.z.string(),
        valueId: primitives_1.uuidSchema,
        valueEn: zod_1.z.string(),
        valueAr: zod_1.z.string(),
    })),
    imageReference: zod_1.z.string().nullable(),
    sku: zod_1.z.string(),
    price: zod_1.z.number().int(),
    quantity: zod_1.z.number().int(),
    discount: zod_1.z.number().int(),
    subtotal: zod_1.z.number().int(),
    discountedSubtotal: zod_1.z.number().int(),
    promotionSnapshot: zod_1.z.unknown().nullable(),
});
exports.orderTimelineResponseSchema = zod_1.z.object({
    id: primitives_1.uuidSchema,
    orderId: primitives_1.uuidSchema,
    action: zod_1.z.string(),
    performedById: primitives_1.uuidSchema.nullable(),
    description: zod_1.z.string(),
    createdAt: zod_1.z.string(),
});
exports.orderCustomerSummarySchema = zod_1.z.object({
    id: primitives_1.uuidSchema,
    firstName: zod_1.z.string(),
    lastName: zod_1.z.string(),
    email: zod_1.z.string().nullable(),
    phone: zod_1.z.string(),
});
exports.invoiceResponseSchema = zod_1.z.object({
    id: primitives_1.uuidSchema,
    orderId: primitives_1.uuidSchema,
    invoiceNumber: zod_1.z.string(),
    pdfUrl: zod_1.z.string().nullable(),
    issuedAt: zod_1.z.string(),
    orderNumber: zod_1.z.string().optional(),
    customer: exports.orderCustomerSummarySchema.optional(),
    items: zod_1.z.array(exports.orderItemResponseSchema).optional(),
    subtotal: zod_1.z.number().int().optional(),
    discount: zod_1.z.number().int().optional(),
    shippingCost: zod_1.z.number().int().optional(),
    tax: zod_1.z.number().int().optional(),
    total: zod_1.z.number().int().optional(),
    currency: zod_1.z.string().optional(),
    paymentMethod: enums_1.PaymentMethodEnum.optional(),
    paymentStatus: enums_1.PaymentStatusEnum.optional(),
});
exports.paymentProofResponseSchema = zod_1.z.object({
    id: primitives_1.uuidSchema,
    orderId: primitives_1.uuidSchema,
    imageUrl: zod_1.z.string(),
    status: zod_1.z.string(),
    reviewedById: primitives_1.uuidSchema.nullable(),
    reviewedAt: zod_1.z.string().nullable(),
    adminNotes: zod_1.z.string().nullable(),
    submittedAt: zod_1.z.string(),
});
exports.orderEmailAttemptResponseSchema = zod_1.z.object({
    id: primitives_1.uuidSchema,
    deliveryId: primitives_1.uuidSchema,
    attemptNumber: zod_1.z.number().int().positive(),
    providerEmailId: zod_1.z.string().nullable(),
    status: zod_1.z.enum([
        "QUEUED",
        "SENDING",
        "SENT",
        "DELIVERED",
        "FAILED",
        "BOUNCED",
        "COMPLAINED",
    ]),
    errorCode: zod_1.z.string().nullable(),
    errorMessage: zod_1.z.string().nullable(),
    startedAt: zod_1.z.string(),
    completedAt: zod_1.z.string().nullable(),
});
exports.orderEmailDeliveryResponseSchema = zod_1.z.object({
    id: primitives_1.uuidSchema,
    orderId: primitives_1.uuidSchema,
    customerId: primitives_1.uuidSchema.nullable(),
    type: zod_1.z.enum(["ORDER_CONFIRMATION"]),
    recipientEmail: zod_1.z.string(),
    senderEmail: zod_1.z.string(),
    provider: zod_1.z.string(),
    providerEmailId: zod_1.z.string().nullable(),
    status: zod_1.z.enum([
        "QUEUED",
        "SENDING",
        "SENT",
        "DELIVERED",
        "FAILED",
        "BOUNCED",
        "COMPLAINED",
    ]),
    attemptCount: zod_1.z.number().int().nonnegative(),
    lastAttemptAt: zod_1.z.string().nullable(),
    sentAt: zod_1.z.string().nullable(),
    deliveredAt: zod_1.z.string().nullable(),
    failedAt: zod_1.z.string().nullable(),
    bouncedAt: zod_1.z.string().nullable(),
    complainedAt: zod_1.z.string().nullable(),
    failureReason: zod_1.z.string().nullable(),
    createdAt: zod_1.z.string(),
    updatedAt: zod_1.z.string(),
    attempts: zod_1.z.array(exports.orderEmailAttemptResponseSchema).optional(),
});
exports.orderResponseSchema = zod_1.z.object({
    id: primitives_1.uuidSchema,
    orderNumber: zod_1.z.string(),
    customerId: primitives_1.uuidSchema,
    customer: exports.orderCustomerSummarySchema.optional(),
    status: enums_1.OrderStatusEnum,
    subtotal: zod_1.z.number().int(),
    discount: zod_1.z.number().int(),
    shippingDiscount: zod_1.z.number().int(),
    totalSavings: zod_1.z.number().int(),
    shippingCost: zod_1.z.number().int(),
    tax: zod_1.z.number().int(),
    total: zod_1.z.number().int(),
    paymentMethod: enums_1.PaymentMethodEnum,
    paymentStatus: enums_1.PaymentStatusEnum,
    shippingStatus: enums_1.ShipmentStatusEnum.nullable(),
    shippingAddressId: primitives_1.uuidSchema.nullable(),
    /** The shipping quote frozen at checkout. Immutable once the order exists. */
    shippingProvider: enums_1.ShipmentProviderEnum.nullable(),
    shipment: shipping_schema_1.shipmentResponseSchema.nullable().optional(),
    latestShipmentFailure: zod_1.z
        .object({
        reason: zod_1.z.string().nullable(),
        createdAt: zod_1.z.string(),
    })
        .nullable()
        .optional(),
    estimatedDeliveryDays: zod_1.z.number().int().nonnegative().nullable(),
    estimatedDeliveryDate: zod_1.z.string().nullable(),
    notes: zod_1.z.string().nullable(),
    createdAt: zod_1.z.string(),
    updatedAt: zod_1.z.string(),
    paymentDueAt: zod_1.z.string().nullable(),
    items: zod_1.z.array(exports.orderItemResponseSchema),
    invoice: exports.invoiceResponseSchema.nullable(),
    latestPaymentProof: exports.paymentProofResponseSchema.nullable().optional(),
    customerEmail: exports.orderEmailDeliveryResponseSchema.nullable().optional(),
    appliedPromotions: zod_1.z.array(zod_1.z.object({
        promotionId: primitives_1.uuidSchema.nullable(),
        name: zod_1.z.string(),
        couponCode: zod_1.z.string().nullable(),
        discountAmount: zod_1.z.number().int(),
        shippingDiscount: zod_1.z.number().int(),
    })),
});
exports.paginatedOrdersSchema = (0, pagination_1.paginated)(exports.orderResponseSchema.omit({ items: true }));
exports.orderStatisticsSchema = zod_1.z.object({
    totalOrders: zod_1.z.number().int(),
    pendingPayment: zod_1.z.number().int(),
    paymentReview: zod_1.z.number().int(),
    processing: zod_1.z.number().int(),
    readyForShipping: zod_1.z.number().int(),
    shipped: zod_1.z.number().int(),
    delivered: zod_1.z.number().int(),
    cancelled: zod_1.z.number().int(),
    refunded: zod_1.z.number().int(),
    revenue: zod_1.z.number().int(),
});
exports.orderPaymentInstructionsSchema = zod_1.z.object({
    orderNumber: zod_1.z.string(),
    amountDue: zod_1.z.number().int(),
    method: enums_1.PaymentMethodEnum,
    vodafoneCashNumber: zod_1.z.string().nullable(),
    instapayAddress: zod_1.z.string().nullable(),
    paymentDueAt: zod_1.z.string().datetime().nullable(),
    transferNote: zod_1.z.string(),
});
exports.createOrderResponseSchema = zod_1.z.object({
    order: exports.orderResponseSchema,
    shipment: shipping_schema_1.shipmentResponseSchema.nullable().optional(),
    paymentInstructions: exports.orderPaymentInstructionsSchema,
});
exports.paginatedOrderTimelineSchema = zod_1.z.object({
    data: zod_1.z.array(exports.orderTimelineResponseSchema),
    meta: pagination_1.paginationMetaSchema,
});
//# sourceMappingURL=create-order.schema.js.map