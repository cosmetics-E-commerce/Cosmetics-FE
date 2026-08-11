"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginatedPaymentsSchema =
  exports.paymentStatisticsSchema =
  exports.paymentMethodAvailabilitySchema =
  exports.paymentResponseSchema =
  exports.paymentHistoryResponseSchema =
  exports.paymentAttachmentResponseSchema =
  exports.paymentInstructionsResponseSchema =
  exports.paymentQuerySchema =
  exports.refundPaymentSchema =
  exports.rejectPaymentSchema =
  exports.verifyPaymentSchema =
  exports.proofUploadRequestSchema =
  exports.uploadPaymentProofFileSchema =
  exports.submitPaymentProofSchema =
  exports.createPaymentSchema =
  exports.manualPaymentMethodSchema =
    void 0;
const zod_1 = require("zod");
const pagination_1 = require("../common/pagination");
const primitives_1 = require("../common/primitives");
const enums_1 = require("../enums");
exports.manualPaymentMethodSchema = zod_1.z.enum(["VODAFONE_CASH", "INSTAPAY"]);
exports.createPaymentSchema = zod_1.z.object({
  orderId: primitives_1.uuidSchema,
  method: exports.manualPaymentMethodSchema,
});
/**
 * Customer-submitted proof of a Vodafone Cash / InstaPay transfer.
 * The API receives metadata for an uploaded image; binaries stay behind the
 * storage provider abstraction.
 */
exports.submitPaymentProofSchema = zod_1.z.object({
  senderRef: zod_1.z
    .string()
    .trim()
    .min(3, "Enter the number or InstaPay address you sent from")
    .max(64),
  txnReference: zod_1.z
    .string()
    .trim()
    .min(4, "Enter the transaction reference from your transfer receipt")
    .max(96),
  amountClaimed: primitives_1.piastresSchema.positive(),
  proofImageKey: zod_1.z.string().trim().min(1, "Upload a screenshot of the transfer"),
  contentType: zod_1.z.enum(["image/jpeg", "image/png", "image/webp"]),
  contentLength: zod_1.z
    .number()
    .int()
    .positive()
    .max(5 * 1024 * 1024, "Screenshot must be 5 MB or smaller"),
});
/**
 * The text fields that accompany a multipart screenshot upload.
 *
 * No key, type or size here — those come from the file itself, so the client
 * cannot claim a 1 KB png while posting something else.
 */
exports.uploadPaymentProofFileSchema = exports.submitPaymentProofSchema
  .pick({ senderRef: true, txnReference: true })
  // Multipart carries every field as text, so this one is coerced where the
  // JSON variant can take a number straight.
  .extend({ amountClaimed: zod_1.z.coerce.number().int().positive() });
/** Backwards-compatible upload validation used by clients requesting storage metadata. */
exports.proofUploadRequestSchema = exports.submitPaymentProofSchema.pick({
  contentType: true,
  contentLength: true,
});
exports.verifyPaymentSchema = zod_1.z.object({
  amountReceived: primitives_1.piastresSchema.positive().optional(),
  note: zod_1.z.string().trim().max(500).optional(),
});
exports.rejectPaymentSchema = zod_1.z.object({
  reason: enums_1.ProofRejectReasonEnum,
  note: zod_1.z.string().trim().min(3).max(500).optional(),
});
exports.refundPaymentSchema = zod_1.z.object({
  reason: zod_1.z.string().trim().min(3).max(500),
});
exports.paymentQuerySchema = pagination_1.paginationQuerySchema.extend({
  search: zod_1.z.string().trim().min(1).max(120).optional(),
  customer: zod_1.z.string().trim().min(1).max(120).optional(),
  orderNumber: zod_1.z.string().trim().min(3).max(32).optional(),
  referenceNumber: zod_1.z.string().trim().min(3).max(40).optional(),
  method: enums_1.PaymentMethodEnum.optional(),
  status: enums_1.PaymentStatusEnum.optional(),
  amountMin: zod_1.z.coerce.number().int().min(0).optional(),
  amountMax: zod_1.z.coerce.number().int().min(0).optional(),
  dateFrom: zod_1.z.string().datetime().optional(),
  dateTo: zod_1.z.string().datetime().optional(),
  sortBy: zod_1.z
    .enum(["createdAt", "updatedAt", "amount", "referenceNumber"])
    .default("createdAt"),
});
exports.paymentInstructionsResponseSchema = zod_1.z.object({
  method: exports.manualPaymentMethodSchema,
  accountName: zod_1.z.string(),
  accountNumber: zod_1.z.string().nullable(),
  bank: zod_1.z.string().nullable(),
  phoneNumber: zod_1.z.string().nullable(),
  receiverName: zod_1.z.string().nullable(),
  qrCodeUrl: zod_1.z.string().nullable(),
  notes: zod_1.z.string().nullable(),
  isActive: zod_1.z.boolean(),
});
exports.paymentAttachmentResponseSchema = zod_1.z.object({
  id: primitives_1.uuidSchema,
  key: zod_1.z.string(),
  url: zod_1.z.string(),
  contentType: zod_1.z.string(),
  sizeBytes: zod_1.z.number().int(),
  uploadedAt: zod_1.z.string(),
});
exports.paymentHistoryResponseSchema = zod_1.z.object({
  id: primitives_1.uuidSchema,
  action: zod_1.z.string(),
  previousStatus: enums_1.PaymentStatusEnum.nullable(),
  newStatus: enums_1.PaymentStatusEnum,
  source: zod_1.z.string(),
  description: zod_1.z.string(),
  createdAt: zod_1.z.string(),
});
exports.paymentResponseSchema = zod_1.z.object({
  id: primitives_1.uuidSchema,
  orderId: primitives_1.uuidSchema,
  customerId: primitives_1.uuidSchema.nullable(),
  method: enums_1.PaymentMethodEnum,
  status: enums_1.PaymentStatusEnum,
  amount: zod_1.z.number().int(),
  currency: zod_1.z.string(),
  referenceNumber: zod_1.z.string().nullable(),
  transactionReference: zod_1.z.string().nullable(),
  proofImageUrl: zod_1.z.string().nullable(),
  reviewedById: primitives_1.uuidSchema.nullable(),
  reviewedAt: zod_1.z.string().nullable(),
  reviewNotes: zod_1.z.string().nullable(),
  rejectionReason: zod_1.z.string().nullable(),
  approvedAt: zod_1.z.string().nullable(),
  expiresAt: zod_1.z.string().nullable(),
  createdAt: zod_1.z.string(),
  updatedAt: zod_1.z.string(),
  instructions: exports.paymentInstructionsResponseSchema.nullable().optional(),
  attachment: exports.paymentAttachmentResponseSchema.nullable().optional(),
  timeline: zod_1.z.array(exports.paymentHistoryResponseSchema).optional(),
});
exports.paymentMethodAvailabilitySchema = zod_1.z.object({
  method: enums_1.PaymentMethodEnum,
  enabled: zod_1.z.boolean(),
  requiresProof: zod_1.z.boolean(),
  feePiastres: zod_1.z.number().int().nonnegative(),
});
exports.paymentStatisticsSchema = zod_1.z.object({
  pendingReviews: zod_1.z.number().int(),
  todayPayments: zod_1.z.number().int(),
  todayRevenue: zod_1.z.number().int(),
  rejectedPayments: zod_1.z.number().int(),
  approvedPayments: zod_1.z.number().int(),
  refundedPayments: zod_1.z.number().int(),
  revenueByMethod: zod_1.z.array(
    zod_1.z.object({ method: enums_1.PaymentMethodEnum, revenue: zod_1.z.number().int() }),
  ),
  revenueByDay: zod_1.z.array(
    zod_1.z.object({ date: zod_1.z.string(), revenue: zod_1.z.number().int() }),
  ),
});
exports.paginatedPaymentsSchema = zod_1.z.object({
  data: zod_1.z.array(exports.paymentResponseSchema),
  meta: pagination_1.paginationMetaSchema,
});
//# sourceMappingURL=payment-proof.schema.js.map
