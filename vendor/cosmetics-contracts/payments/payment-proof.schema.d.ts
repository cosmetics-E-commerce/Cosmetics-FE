import { z } from 'zod';
/**
 * Customer-submitted proof of a Vodafone Cash / InstaPay transfer.
 * `txnReference` is the source of truth (unique per method at the DB level);
 * the screenshot is corroboration for the admin reviewer. PLAN.md §7.6.
 */
export declare const submitPaymentProofSchema: z.ZodObject<{
    method: z.ZodEnum<["VODAFONE_CASH", "INSTAPAY"]>;
    senderRef: z.ZodString;
    txnReference: z.ZodString;
    amountClaimed: z.ZodNumber;
    proofImageKey: z.ZodString;
}, "strip", z.ZodTypeAny, {
    method: "VODAFONE_CASH" | "INSTAPAY";
    senderRef: string;
    txnReference: string;
    amountClaimed: number;
    proofImageKey: string;
}, {
    method: "VODAFONE_CASH" | "INSTAPAY";
    senderRef: string;
    txnReference: string;
    amountClaimed: number;
    proofImageKey: string;
}>;
export type SubmitPaymentProofInput = z.infer<typeof submitPaymentProofSchema>;
/** Presigned upload request — the file goes straight to R2, never through the API. */
export declare const proofUploadRequestSchema: z.ZodObject<{
    contentType: z.ZodEnum<["image/jpeg", "image/png", "image/webp"]>;
    contentLength: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    contentType: "image/jpeg" | "image/png" | "image/webp";
    contentLength: number;
}, {
    contentType: "image/jpeg" | "image/png" | "image/webp";
    contentLength: number;
}>;
export type ProofUploadRequest = z.infer<typeof proofUploadRequestSchema>;
export declare const verifyPaymentSchema: z.ZodObject<{
    /** Set when the admin accepts an amount different from grand_total. */
    amountReceived: z.ZodOptional<z.ZodNumber>;
    note: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    amountReceived?: number | undefined;
    note?: string | undefined;
}, {
    amountReceived?: number | undefined;
    note?: string | undefined;
}>;
export type VerifyPaymentInput = z.infer<typeof verifyPaymentSchema>;
export declare const rejectPaymentSchema: z.ZodObject<{
    reason: z.ZodEnum<["WRONG_AMOUNT", "ILLEGIBLE_SCREENSHOT", "REFERENCE_NOT_FOUND", "DUPLICATE_REFERENCE", "OTHER"]>;
    note: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    reason: "OTHER" | "WRONG_AMOUNT" | "ILLEGIBLE_SCREENSHOT" | "REFERENCE_NOT_FOUND" | "DUPLICATE_REFERENCE";
    note?: string | undefined;
}, {
    reason: "OTHER" | "WRONG_AMOUNT" | "ILLEGIBLE_SCREENSHOT" | "REFERENCE_NOT_FOUND" | "DUPLICATE_REFERENCE";
    note?: string | undefined;
}>;
export type RejectPaymentInput = z.infer<typeof rejectPaymentSchema>;
export declare const paymentMethodAvailabilitySchema: z.ZodObject<{
    method: z.ZodEnum<["VODAFONE_CASH", "INSTAPAY", "COD"]>;
    enabled: z.ZodBoolean;
    requiresProof: z.ZodBoolean;
    feePiastres: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    method: "VODAFONE_CASH" | "INSTAPAY" | "COD";
    enabled: boolean;
    requiresProof: boolean;
    feePiastres: number;
}, {
    method: "VODAFONE_CASH" | "INSTAPAY" | "COD";
    enabled: boolean;
    requiresProof: boolean;
    feePiastres: number;
}>;
export type PaymentMethodAvailability = z.infer<typeof paymentMethodAvailabilitySchema>;
//# sourceMappingURL=payment-proof.schema.d.ts.map