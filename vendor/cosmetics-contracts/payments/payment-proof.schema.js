"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentMethodAvailabilitySchema = exports.rejectPaymentSchema = exports.verifyPaymentSchema = exports.proofUploadRequestSchema = exports.submitPaymentProofSchema = void 0;
const zod_1 = require("zod");
const enums_1 = require("../enums");
const primitives_1 = require("../common/primitives");
/**
 * Customer-submitted proof of a Vodafone Cash / InstaPay transfer.
 * `txnReference` is the source of truth (unique per method at the DB level);
 * the screenshot is corroboration for the admin reviewer. PLAN.md §7.6.
 */
exports.submitPaymentProofSchema = zod_1.z.object({
    method: zod_1.z.enum(['VODAFONE_CASH', 'INSTAPAY']),
    senderRef: zod_1.z
        .string()
        .trim()
        .min(3, 'Enter the number or InstaPay address you sent from')
        .max(64),
    txnReference: zod_1.z
        .string()
        .trim()
        .min(4, 'Enter the transaction reference from your transfer receipt')
        .max(96),
    amountClaimed: primitives_1.piastresSchema.positive(),
    proofImageKey: zod_1.z.string().trim().min(1, 'Upload a screenshot of the transfer'),
});
/** Presigned upload request — the file goes straight to R2, never through the API. */
exports.proofUploadRequestSchema = zod_1.z.object({
    contentType: zod_1.z.enum(['image/jpeg', 'image/png', 'image/webp']),
    contentLength: zod_1.z
        .number()
        .int()
        .positive()
        .max(5 * 1024 * 1024, 'Screenshot must be 5 MB or smaller'),
});
exports.verifyPaymentSchema = zod_1.z.object({
    /** Set when the admin accepts an amount different from grand_total. */
    amountReceived: primitives_1.piastresSchema.positive().optional(),
    note: zod_1.z.string().trim().max(500).optional(),
});
exports.rejectPaymentSchema = zod_1.z.object({
    reason: enums_1.ProofRejectReasonEnum,
    note: zod_1.z.string().trim().max(500).optional(),
});
exports.paymentMethodAvailabilitySchema = zod_1.z.object({
    method: enums_1.PaymentMethodEnum,
    enabled: zod_1.z.boolean(),
    requiresProof: zod_1.z.boolean(),
    feePiastres: zod_1.z.number().int().nonnegative(),
});
//# sourceMappingURL=payment-proof.schema.js.map