import { z } from "zod";
export declare const manualPaymentMethodSchema: z.ZodEnum<["VODAFONE_CASH", "INSTAPAY"]>;
export type ManualPaymentMethod = z.infer<typeof manualPaymentMethodSchema>;
export declare const createPaymentSchema: z.ZodObject<{
    orderId: z.ZodString;
    method: z.ZodEnum<["VODAFONE_CASH", "INSTAPAY"]>;
}, "strip", z.ZodTypeAny, {
    orderId: string;
    method: "VODAFONE_CASH" | "INSTAPAY";
}, {
    orderId: string;
    method: "VODAFONE_CASH" | "INSTAPAY";
}>;
export type CreatePaymentInput = z.infer<typeof createPaymentSchema>;
/**
 * Customer-submitted proof of a Vodafone Cash / InstaPay transfer.
 * The API receives metadata for an uploaded image; binaries stay behind the
 * storage provider abstraction.
 */
export declare const submitPaymentProofSchema: z.ZodObject<{
    senderRef: z.ZodString;
    txnReference: z.ZodString;
    amountClaimed: z.ZodNumber;
    proofImageKey: z.ZodString;
    contentType: z.ZodEnum<["image/jpeg", "image/png", "image/webp"]>;
    contentLength: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    senderRef: string;
    txnReference: string;
    amountClaimed: number;
    proofImageKey: string;
    contentType: "image/jpeg" | "image/png" | "image/webp";
    contentLength: number;
}, {
    senderRef: string;
    txnReference: string;
    amountClaimed: number;
    proofImageKey: string;
    contentType: "image/jpeg" | "image/png" | "image/webp";
    contentLength: number;
}>;
export type SubmitPaymentProofInput = z.infer<typeof submitPaymentProofSchema>;
/**
 * The text fields that accompany a multipart screenshot upload.
 *
 * No key, type or size here — those come from the file itself, so the client
 * cannot claim a 1 KB png while posting something else.
 */
export declare const uploadPaymentProofFileSchema: z.ZodObject<Pick<{
    senderRef: z.ZodString;
    txnReference: z.ZodString;
    amountClaimed: z.ZodNumber;
    proofImageKey: z.ZodString;
    contentType: z.ZodEnum<["image/jpeg", "image/png", "image/webp"]>;
    contentLength: z.ZodNumber;
}, "senderRef" | "txnReference"> & {
    amountClaimed: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    senderRef: string;
    txnReference: string;
    amountClaimed: number;
}, {
    senderRef: string;
    txnReference: string;
    amountClaimed: number;
}>;
export type UploadPaymentProofFileInput = z.infer<typeof uploadPaymentProofFileSchema>;
/** Backwards-compatible upload validation used by clients requesting storage metadata. */
export declare const proofUploadRequestSchema: z.ZodObject<Pick<{
    senderRef: z.ZodString;
    txnReference: z.ZodString;
    amountClaimed: z.ZodNumber;
    proofImageKey: z.ZodString;
    contentType: z.ZodEnum<["image/jpeg", "image/png", "image/webp"]>;
    contentLength: z.ZodNumber;
}, "contentType" | "contentLength">, "strip", z.ZodTypeAny, {
    contentType: "image/jpeg" | "image/png" | "image/webp";
    contentLength: number;
}, {
    contentType: "image/jpeg" | "image/png" | "image/webp";
    contentLength: number;
}>;
export type ProofUploadRequest = z.infer<typeof proofUploadRequestSchema>;
export declare const verifyPaymentSchema: z.ZodObject<{
    amountReceived: z.ZodOptional<z.ZodNumber>;
    note: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    note?: string | undefined;
    amountReceived?: number | undefined;
}, {
    note?: string | undefined;
    amountReceived?: number | undefined;
}>;
export type VerifyPaymentInput = z.infer<typeof verifyPaymentSchema>;
export declare const rejectPaymentSchema: z.ZodObject<{
    reason: z.ZodEnum<["WRONG_AMOUNT", "ILLEGIBLE_SCREENSHOT", "REFERENCE_NOT_FOUND", "DUPLICATE_REFERENCE", "OTHER"]>;
    amountReceived: z.ZodOptional<z.ZodNumber>;
    note: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    reason: "OTHER" | "WRONG_AMOUNT" | "ILLEGIBLE_SCREENSHOT" | "REFERENCE_NOT_FOUND" | "DUPLICATE_REFERENCE";
    note?: string | undefined;
    amountReceived?: number | undefined;
}, {
    reason: "OTHER" | "WRONG_AMOUNT" | "ILLEGIBLE_SCREENSHOT" | "REFERENCE_NOT_FOUND" | "DUPLICATE_REFERENCE";
    note?: string | undefined;
    amountReceived?: number | undefined;
}>;
export type RejectPaymentInput = z.infer<typeof rejectPaymentSchema>;
export declare const refundPaymentSchema: z.ZodObject<{
    reason: z.ZodString;
}, "strip", z.ZodTypeAny, {
    reason: string;
}, {
    reason: string;
}>;
export type RefundPaymentInput = z.infer<typeof refundPaymentSchema>;
export declare const paymentQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    sortOrder: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
} & {
    search: z.ZodOptional<z.ZodString>;
    customer: z.ZodOptional<z.ZodString>;
    orderNumber: z.ZodOptional<z.ZodString>;
    referenceNumber: z.ZodOptional<z.ZodString>;
    method: z.ZodOptional<z.ZodEnum<["VODAFONE_CASH", "INSTAPAY", "CASH_ON_DELIVERY", "COD", "CARD"]>>;
    status: z.ZodOptional<z.ZodEnum<["UNPAID", "PENDING", "WAITING_REVIEW", "UNDER_REVIEW", "PROOF_SUBMITTED", "APPROVED", "VERIFIED", "REJECTED", "REFUNDED", "EXPIRED", "FAILED"]>>;
    amountMin: z.ZodOptional<z.ZodNumber>;
    amountMax: z.ZodOptional<z.ZodNumber>;
    dateFrom: z.ZodOptional<z.ZodString>;
    dateTo: z.ZodOptional<z.ZodString>;
    sortBy: z.ZodDefault<z.ZodEnum<["createdAt", "updatedAt", "amount", "referenceNumber"]>>;
}, "strip", z.ZodTypeAny, {
    page: number;
    limit: number;
    sortBy: "createdAt" | "updatedAt" | "referenceNumber" | "amount";
    sortOrder: "asc" | "desc";
    status?: "REFUNDED" | "FAILED" | "UNPAID" | "PENDING" | "WAITING_REVIEW" | "UNDER_REVIEW" | "PROOF_SUBMITTED" | "APPROVED" | "VERIFIED" | "REJECTED" | "EXPIRED" | undefined;
    search?: string | undefined;
    orderNumber?: string | undefined;
    customer?: string | undefined;
    dateFrom?: string | undefined;
    dateTo?: string | undefined;
    method?: "VODAFONE_CASH" | "INSTAPAY" | "CASH_ON_DELIVERY" | "COD" | "CARD" | undefined;
    referenceNumber?: string | undefined;
    amountMin?: number | undefined;
    amountMax?: number | undefined;
}, {
    status?: "REFUNDED" | "FAILED" | "UNPAID" | "PENDING" | "WAITING_REVIEW" | "UNDER_REVIEW" | "PROOF_SUBMITTED" | "APPROVED" | "VERIFIED" | "REJECTED" | "EXPIRED" | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sortBy?: "createdAt" | "updatedAt" | "referenceNumber" | "amount" | undefined;
    sortOrder?: "asc" | "desc" | undefined;
    search?: string | undefined;
    orderNumber?: string | undefined;
    customer?: string | undefined;
    dateFrom?: string | undefined;
    dateTo?: string | undefined;
    method?: "VODAFONE_CASH" | "INSTAPAY" | "CASH_ON_DELIVERY" | "COD" | "CARD" | undefined;
    referenceNumber?: string | undefined;
    amountMin?: number | undefined;
    amountMax?: number | undefined;
}>;
export type PaymentQuery = z.infer<typeof paymentQuerySchema>;
export declare const paymentInstructionsResponseSchema: z.ZodObject<{
    method: z.ZodEnum<["VODAFONE_CASH", "INSTAPAY"]>;
    accountName: z.ZodString;
    accountNumber: z.ZodNullable<z.ZodString>;
    bank: z.ZodNullable<z.ZodString>;
    phoneNumber: z.ZodNullable<z.ZodString>;
    receiverName: z.ZodNullable<z.ZodString>;
    qrCodeUrl: z.ZodNullable<z.ZodString>;
    notes: z.ZodNullable<z.ZodString>;
    isActive: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    receiverName: string | null;
    notes: string | null;
    method: "VODAFONE_CASH" | "INSTAPAY";
    accountName: string;
    accountNumber: string | null;
    bank: string | null;
    phoneNumber: string | null;
    qrCodeUrl: string | null;
    isActive: boolean;
}, {
    receiverName: string | null;
    notes: string | null;
    method: "VODAFONE_CASH" | "INSTAPAY";
    accountName: string;
    accountNumber: string | null;
    bank: string | null;
    phoneNumber: string | null;
    qrCodeUrl: string | null;
    isActive: boolean;
}>;
export type PaymentInstructionsResponse = z.infer<typeof paymentInstructionsResponseSchema>;
export declare const paymentAttachmentResponseSchema: z.ZodObject<{
    id: z.ZodString;
    key: z.ZodString;
    url: z.ZodString;
    contentType: z.ZodString;
    sizeBytes: z.ZodNumber;
    uploadedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    key: string;
    contentType: string;
    url: string;
    sizeBytes: number;
    uploadedAt: string;
}, {
    id: string;
    key: string;
    contentType: string;
    url: string;
    sizeBytes: number;
    uploadedAt: string;
}>;
export type PaymentAttachmentResponse = z.infer<typeof paymentAttachmentResponseSchema>;
export declare const paymentHistoryResponseSchema: z.ZodObject<{
    id: z.ZodString;
    action: z.ZodString;
    previousStatus: z.ZodNullable<z.ZodEnum<["UNPAID", "PENDING", "WAITING_REVIEW", "UNDER_REVIEW", "PROOF_SUBMITTED", "APPROVED", "VERIFIED", "REJECTED", "REFUNDED", "EXPIRED", "FAILED"]>>;
    newStatus: z.ZodEnum<["UNPAID", "PENDING", "WAITING_REVIEW", "UNDER_REVIEW", "PROOF_SUBMITTED", "APPROVED", "VERIFIED", "REJECTED", "REFUNDED", "EXPIRED", "FAILED"]>;
    source: z.ZodString;
    description: z.ZodString;
    createdAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    action: string;
    description: string;
    createdAt: string;
    previousStatus: "REFUNDED" | "FAILED" | "UNPAID" | "PENDING" | "WAITING_REVIEW" | "UNDER_REVIEW" | "PROOF_SUBMITTED" | "APPROVED" | "VERIFIED" | "REJECTED" | "EXPIRED" | null;
    newStatus: "REFUNDED" | "FAILED" | "UNPAID" | "PENDING" | "WAITING_REVIEW" | "UNDER_REVIEW" | "PROOF_SUBMITTED" | "APPROVED" | "VERIFIED" | "REJECTED" | "EXPIRED";
    source: string;
}, {
    id: string;
    action: string;
    description: string;
    createdAt: string;
    previousStatus: "REFUNDED" | "FAILED" | "UNPAID" | "PENDING" | "WAITING_REVIEW" | "UNDER_REVIEW" | "PROOF_SUBMITTED" | "APPROVED" | "VERIFIED" | "REJECTED" | "EXPIRED" | null;
    newStatus: "REFUNDED" | "FAILED" | "UNPAID" | "PENDING" | "WAITING_REVIEW" | "UNDER_REVIEW" | "PROOF_SUBMITTED" | "APPROVED" | "VERIFIED" | "REJECTED" | "EXPIRED";
    source: string;
}>;
export type PaymentHistoryResponse = z.infer<typeof paymentHistoryResponseSchema>;
export declare const paymentCustomerResponseSchema: z.ZodObject<{
    id: z.ZodString;
    firstName: z.ZodString;
    lastName: z.ZodString;
    email: z.ZodNullable<z.ZodString>;
    phone: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string | null;
}, {
    id: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string | null;
}>;
export type PaymentCustomerResponse = z.infer<typeof paymentCustomerResponseSchema>;
export declare const paymentProofSummaryResponseSchema: z.ZodObject<{
    id: z.ZodString;
    senderRef: z.ZodString;
    txnReference: z.ZodString;
    amountClaimed: z.ZodNumber;
    submittedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    senderRef: string;
    txnReference: string;
    amountClaimed: number;
    submittedAt: string;
}, {
    id: string;
    senderRef: string;
    txnReference: string;
    amountClaimed: number;
    submittedAt: string;
}>;
export type PaymentProofSummaryResponse = z.infer<typeof paymentProofSummaryResponseSchema>;
export declare const paymentResponseSchema: z.ZodObject<{
    id: z.ZodString;
    orderId: z.ZodString;
    customerId: z.ZodNullable<z.ZodString>;
    method: z.ZodEnum<["VODAFONE_CASH", "INSTAPAY", "CASH_ON_DELIVERY", "COD", "CARD"]>;
    status: z.ZodEnum<["UNPAID", "PENDING", "WAITING_REVIEW", "UNDER_REVIEW", "PROOF_SUBMITTED", "APPROVED", "VERIFIED", "REJECTED", "REFUNDED", "EXPIRED", "FAILED"]>;
    amount: z.ZodNumber;
    currency: z.ZodString;
    referenceNumber: z.ZodNullable<z.ZodString>;
    transactionReference: z.ZodNullable<z.ZodString>;
    proofImageUrl: z.ZodNullable<z.ZodString>;
    reviewedById: z.ZodNullable<z.ZodString>;
    reviewedAt: z.ZodNullable<z.ZodString>;
    reviewNotes: z.ZodNullable<z.ZodString>;
    rejectionReason: z.ZodNullable<z.ZodString>;
    approvedAt: z.ZodNullable<z.ZodString>;
    expiresAt: z.ZodNullable<z.ZodString>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
    instructions: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        method: z.ZodEnum<["VODAFONE_CASH", "INSTAPAY"]>;
        accountName: z.ZodString;
        accountNumber: z.ZodNullable<z.ZodString>;
        bank: z.ZodNullable<z.ZodString>;
        phoneNumber: z.ZodNullable<z.ZodString>;
        receiverName: z.ZodNullable<z.ZodString>;
        qrCodeUrl: z.ZodNullable<z.ZodString>;
        notes: z.ZodNullable<z.ZodString>;
        isActive: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        receiverName: string | null;
        notes: string | null;
        method: "VODAFONE_CASH" | "INSTAPAY";
        accountName: string;
        accountNumber: string | null;
        bank: string | null;
        phoneNumber: string | null;
        qrCodeUrl: string | null;
        isActive: boolean;
    }, {
        receiverName: string | null;
        notes: string | null;
        method: "VODAFONE_CASH" | "INSTAPAY";
        accountName: string;
        accountNumber: string | null;
        bank: string | null;
        phoneNumber: string | null;
        qrCodeUrl: string | null;
        isActive: boolean;
    }>>>;
    customer: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        id: z.ZodString;
        firstName: z.ZodString;
        lastName: z.ZodString;
        email: z.ZodNullable<z.ZodString>;
        phone: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        firstName: string;
        lastName: string;
        phone: string;
        email: string | null;
    }, {
        id: string;
        firstName: string;
        lastName: string;
        phone: string;
        email: string | null;
    }>>>;
    latestProof: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        id: z.ZodString;
        senderRef: z.ZodString;
        txnReference: z.ZodString;
        amountClaimed: z.ZodNumber;
        submittedAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        senderRef: string;
        txnReference: string;
        amountClaimed: number;
        submittedAt: string;
    }, {
        id: string;
        senderRef: string;
        txnReference: string;
        amountClaimed: number;
        submittedAt: string;
    }>>>;
    attachment: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        id: z.ZodString;
        key: z.ZodString;
        url: z.ZodString;
        contentType: z.ZodString;
        sizeBytes: z.ZodNumber;
        uploadedAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        key: string;
        contentType: string;
        url: string;
        sizeBytes: number;
        uploadedAt: string;
    }, {
        id: string;
        key: string;
        contentType: string;
        url: string;
        sizeBytes: number;
        uploadedAt: string;
    }>>>;
    timeline: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        action: z.ZodString;
        previousStatus: z.ZodNullable<z.ZodEnum<["UNPAID", "PENDING", "WAITING_REVIEW", "UNDER_REVIEW", "PROOF_SUBMITTED", "APPROVED", "VERIFIED", "REJECTED", "REFUNDED", "EXPIRED", "FAILED"]>>;
        newStatus: z.ZodEnum<["UNPAID", "PENDING", "WAITING_REVIEW", "UNDER_REVIEW", "PROOF_SUBMITTED", "APPROVED", "VERIFIED", "REJECTED", "REFUNDED", "EXPIRED", "FAILED"]>;
        source: z.ZodString;
        description: z.ZodString;
        createdAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        action: string;
        description: string;
        createdAt: string;
        previousStatus: "REFUNDED" | "FAILED" | "UNPAID" | "PENDING" | "WAITING_REVIEW" | "UNDER_REVIEW" | "PROOF_SUBMITTED" | "APPROVED" | "VERIFIED" | "REJECTED" | "EXPIRED" | null;
        newStatus: "REFUNDED" | "FAILED" | "UNPAID" | "PENDING" | "WAITING_REVIEW" | "UNDER_REVIEW" | "PROOF_SUBMITTED" | "APPROVED" | "VERIFIED" | "REJECTED" | "EXPIRED";
        source: string;
    }, {
        id: string;
        action: string;
        description: string;
        createdAt: string;
        previousStatus: "REFUNDED" | "FAILED" | "UNPAID" | "PENDING" | "WAITING_REVIEW" | "UNDER_REVIEW" | "PROOF_SUBMITTED" | "APPROVED" | "VERIFIED" | "REJECTED" | "EXPIRED" | null;
        newStatus: "REFUNDED" | "FAILED" | "UNPAID" | "PENDING" | "WAITING_REVIEW" | "UNDER_REVIEW" | "PROOF_SUBMITTED" | "APPROVED" | "VERIFIED" | "REJECTED" | "EXPIRED";
        source: string;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    status: "REFUNDED" | "FAILED" | "UNPAID" | "PENDING" | "WAITING_REVIEW" | "UNDER_REVIEW" | "PROOF_SUBMITTED" | "APPROVED" | "VERIFIED" | "REJECTED" | "EXPIRED";
    id: string;
    createdAt: string;
    updatedAt: string;
    currency: string;
    orderId: string;
    reviewedById: string | null;
    reviewedAt: string | null;
    customerId: string | null;
    method: "VODAFONE_CASH" | "INSTAPAY" | "CASH_ON_DELIVERY" | "COD" | "CARD";
    referenceNumber: string | null;
    amount: number;
    transactionReference: string | null;
    proofImageUrl: string | null;
    reviewNotes: string | null;
    rejectionReason: string | null;
    approvedAt: string | null;
    expiresAt: string | null;
    customer?: {
        id: string;
        firstName: string;
        lastName: string;
        phone: string;
        email: string | null;
    } | null | undefined;
    instructions?: {
        receiverName: string | null;
        notes: string | null;
        method: "VODAFONE_CASH" | "INSTAPAY";
        accountName: string;
        accountNumber: string | null;
        bank: string | null;
        phoneNumber: string | null;
        qrCodeUrl: string | null;
        isActive: boolean;
    } | null | undefined;
    latestProof?: {
        id: string;
        senderRef: string;
        txnReference: string;
        amountClaimed: number;
        submittedAt: string;
    } | null | undefined;
    attachment?: {
        id: string;
        key: string;
        contentType: string;
        url: string;
        sizeBytes: number;
        uploadedAt: string;
    } | null | undefined;
    timeline?: {
        id: string;
        action: string;
        description: string;
        createdAt: string;
        previousStatus: "REFUNDED" | "FAILED" | "UNPAID" | "PENDING" | "WAITING_REVIEW" | "UNDER_REVIEW" | "PROOF_SUBMITTED" | "APPROVED" | "VERIFIED" | "REJECTED" | "EXPIRED" | null;
        newStatus: "REFUNDED" | "FAILED" | "UNPAID" | "PENDING" | "WAITING_REVIEW" | "UNDER_REVIEW" | "PROOF_SUBMITTED" | "APPROVED" | "VERIFIED" | "REJECTED" | "EXPIRED";
        source: string;
    }[] | undefined;
}, {
    status: "REFUNDED" | "FAILED" | "UNPAID" | "PENDING" | "WAITING_REVIEW" | "UNDER_REVIEW" | "PROOF_SUBMITTED" | "APPROVED" | "VERIFIED" | "REJECTED" | "EXPIRED";
    id: string;
    createdAt: string;
    updatedAt: string;
    currency: string;
    orderId: string;
    reviewedById: string | null;
    reviewedAt: string | null;
    customerId: string | null;
    method: "VODAFONE_CASH" | "INSTAPAY" | "CASH_ON_DELIVERY" | "COD" | "CARD";
    referenceNumber: string | null;
    amount: number;
    transactionReference: string | null;
    proofImageUrl: string | null;
    reviewNotes: string | null;
    rejectionReason: string | null;
    approvedAt: string | null;
    expiresAt: string | null;
    customer?: {
        id: string;
        firstName: string;
        lastName: string;
        phone: string;
        email: string | null;
    } | null | undefined;
    instructions?: {
        receiverName: string | null;
        notes: string | null;
        method: "VODAFONE_CASH" | "INSTAPAY";
        accountName: string;
        accountNumber: string | null;
        bank: string | null;
        phoneNumber: string | null;
        qrCodeUrl: string | null;
        isActive: boolean;
    } | null | undefined;
    latestProof?: {
        id: string;
        senderRef: string;
        txnReference: string;
        amountClaimed: number;
        submittedAt: string;
    } | null | undefined;
    attachment?: {
        id: string;
        key: string;
        contentType: string;
        url: string;
        sizeBytes: number;
        uploadedAt: string;
    } | null | undefined;
    timeline?: {
        id: string;
        action: string;
        description: string;
        createdAt: string;
        previousStatus: "REFUNDED" | "FAILED" | "UNPAID" | "PENDING" | "WAITING_REVIEW" | "UNDER_REVIEW" | "PROOF_SUBMITTED" | "APPROVED" | "VERIFIED" | "REJECTED" | "EXPIRED" | null;
        newStatus: "REFUNDED" | "FAILED" | "UNPAID" | "PENDING" | "WAITING_REVIEW" | "UNDER_REVIEW" | "PROOF_SUBMITTED" | "APPROVED" | "VERIFIED" | "REJECTED" | "EXPIRED";
        source: string;
    }[] | undefined;
}>;
export type PaymentResponse = z.infer<typeof paymentResponseSchema>;
export declare const paymentMethodAvailabilitySchema: z.ZodObject<{
    method: z.ZodEnum<["VODAFONE_CASH", "INSTAPAY", "CASH_ON_DELIVERY", "COD", "CARD"]>;
    enabled: z.ZodBoolean;
    requiresProof: z.ZodBoolean;
    feePiastres: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    method: "VODAFONE_CASH" | "INSTAPAY" | "CASH_ON_DELIVERY" | "COD" | "CARD";
    enabled: boolean;
    requiresProof: boolean;
    feePiastres: number;
}, {
    method: "VODAFONE_CASH" | "INSTAPAY" | "CASH_ON_DELIVERY" | "COD" | "CARD";
    enabled: boolean;
    requiresProof: boolean;
    feePiastres: number;
}>;
export type PaymentMethodAvailability = z.infer<typeof paymentMethodAvailabilitySchema>;
export declare const paymentStatisticsSchema: z.ZodObject<{
    pendingReviews: z.ZodNumber;
    todayPayments: z.ZodNumber;
    todayRevenue: z.ZodNumber;
    rejectedPayments: z.ZodNumber;
    approvedPayments: z.ZodNumber;
    refundedPayments: z.ZodNumber;
    revenueByMethod: z.ZodArray<z.ZodObject<{
        method: z.ZodEnum<["VODAFONE_CASH", "INSTAPAY", "CASH_ON_DELIVERY", "COD", "CARD"]>;
        revenue: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        revenue: number;
        method: "VODAFONE_CASH" | "INSTAPAY" | "CASH_ON_DELIVERY" | "COD" | "CARD";
    }, {
        revenue: number;
        method: "VODAFONE_CASH" | "INSTAPAY" | "CASH_ON_DELIVERY" | "COD" | "CARD";
    }>, "many">;
    revenueByDay: z.ZodArray<z.ZodObject<{
        date: z.ZodString;
        revenue: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        date: string;
        revenue: number;
    }, {
        date: string;
        revenue: number;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    pendingReviews: number;
    todayPayments: number;
    todayRevenue: number;
    rejectedPayments: number;
    approvedPayments: number;
    refundedPayments: number;
    revenueByMethod: {
        revenue: number;
        method: "VODAFONE_CASH" | "INSTAPAY" | "CASH_ON_DELIVERY" | "COD" | "CARD";
    }[];
    revenueByDay: {
        date: string;
        revenue: number;
    }[];
}, {
    pendingReviews: number;
    todayPayments: number;
    todayRevenue: number;
    rejectedPayments: number;
    approvedPayments: number;
    refundedPayments: number;
    revenueByMethod: {
        revenue: number;
        method: "VODAFONE_CASH" | "INSTAPAY" | "CASH_ON_DELIVERY" | "COD" | "CARD";
    }[];
    revenueByDay: {
        date: string;
        revenue: number;
    }[];
}>;
export type PaymentStatisticsResponse = z.infer<typeof paymentStatisticsSchema>;
export declare const paginatedPaymentsSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        orderId: z.ZodString;
        customerId: z.ZodNullable<z.ZodString>;
        method: z.ZodEnum<["VODAFONE_CASH", "INSTAPAY", "CASH_ON_DELIVERY", "COD", "CARD"]>;
        status: z.ZodEnum<["UNPAID", "PENDING", "WAITING_REVIEW", "UNDER_REVIEW", "PROOF_SUBMITTED", "APPROVED", "VERIFIED", "REJECTED", "REFUNDED", "EXPIRED", "FAILED"]>;
        amount: z.ZodNumber;
        currency: z.ZodString;
        referenceNumber: z.ZodNullable<z.ZodString>;
        transactionReference: z.ZodNullable<z.ZodString>;
        proofImageUrl: z.ZodNullable<z.ZodString>;
        reviewedById: z.ZodNullable<z.ZodString>;
        reviewedAt: z.ZodNullable<z.ZodString>;
        reviewNotes: z.ZodNullable<z.ZodString>;
        rejectionReason: z.ZodNullable<z.ZodString>;
        approvedAt: z.ZodNullable<z.ZodString>;
        expiresAt: z.ZodNullable<z.ZodString>;
        createdAt: z.ZodString;
        updatedAt: z.ZodString;
        instructions: z.ZodOptional<z.ZodNullable<z.ZodObject<{
            method: z.ZodEnum<["VODAFONE_CASH", "INSTAPAY"]>;
            accountName: z.ZodString;
            accountNumber: z.ZodNullable<z.ZodString>;
            bank: z.ZodNullable<z.ZodString>;
            phoneNumber: z.ZodNullable<z.ZodString>;
            receiverName: z.ZodNullable<z.ZodString>;
            qrCodeUrl: z.ZodNullable<z.ZodString>;
            notes: z.ZodNullable<z.ZodString>;
            isActive: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            receiverName: string | null;
            notes: string | null;
            method: "VODAFONE_CASH" | "INSTAPAY";
            accountName: string;
            accountNumber: string | null;
            bank: string | null;
            phoneNumber: string | null;
            qrCodeUrl: string | null;
            isActive: boolean;
        }, {
            receiverName: string | null;
            notes: string | null;
            method: "VODAFONE_CASH" | "INSTAPAY";
            accountName: string;
            accountNumber: string | null;
            bank: string | null;
            phoneNumber: string | null;
            qrCodeUrl: string | null;
            isActive: boolean;
        }>>>;
        customer: z.ZodOptional<z.ZodNullable<z.ZodObject<{
            id: z.ZodString;
            firstName: z.ZodString;
            lastName: z.ZodString;
            email: z.ZodNullable<z.ZodString>;
            phone: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            id: string;
            firstName: string;
            lastName: string;
            phone: string;
            email: string | null;
        }, {
            id: string;
            firstName: string;
            lastName: string;
            phone: string;
            email: string | null;
        }>>>;
        latestProof: z.ZodOptional<z.ZodNullable<z.ZodObject<{
            id: z.ZodString;
            senderRef: z.ZodString;
            txnReference: z.ZodString;
            amountClaimed: z.ZodNumber;
            submittedAt: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            id: string;
            senderRef: string;
            txnReference: string;
            amountClaimed: number;
            submittedAt: string;
        }, {
            id: string;
            senderRef: string;
            txnReference: string;
            amountClaimed: number;
            submittedAt: string;
        }>>>;
        attachment: z.ZodOptional<z.ZodNullable<z.ZodObject<{
            id: z.ZodString;
            key: z.ZodString;
            url: z.ZodString;
            contentType: z.ZodString;
            sizeBytes: z.ZodNumber;
            uploadedAt: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            id: string;
            key: string;
            contentType: string;
            url: string;
            sizeBytes: number;
            uploadedAt: string;
        }, {
            id: string;
            key: string;
            contentType: string;
            url: string;
            sizeBytes: number;
            uploadedAt: string;
        }>>>;
        timeline: z.ZodOptional<z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            action: z.ZodString;
            previousStatus: z.ZodNullable<z.ZodEnum<["UNPAID", "PENDING", "WAITING_REVIEW", "UNDER_REVIEW", "PROOF_SUBMITTED", "APPROVED", "VERIFIED", "REJECTED", "REFUNDED", "EXPIRED", "FAILED"]>>;
            newStatus: z.ZodEnum<["UNPAID", "PENDING", "WAITING_REVIEW", "UNDER_REVIEW", "PROOF_SUBMITTED", "APPROVED", "VERIFIED", "REJECTED", "REFUNDED", "EXPIRED", "FAILED"]>;
            source: z.ZodString;
            description: z.ZodString;
            createdAt: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            id: string;
            action: string;
            description: string;
            createdAt: string;
            previousStatus: "REFUNDED" | "FAILED" | "UNPAID" | "PENDING" | "WAITING_REVIEW" | "UNDER_REVIEW" | "PROOF_SUBMITTED" | "APPROVED" | "VERIFIED" | "REJECTED" | "EXPIRED" | null;
            newStatus: "REFUNDED" | "FAILED" | "UNPAID" | "PENDING" | "WAITING_REVIEW" | "UNDER_REVIEW" | "PROOF_SUBMITTED" | "APPROVED" | "VERIFIED" | "REJECTED" | "EXPIRED";
            source: string;
        }, {
            id: string;
            action: string;
            description: string;
            createdAt: string;
            previousStatus: "REFUNDED" | "FAILED" | "UNPAID" | "PENDING" | "WAITING_REVIEW" | "UNDER_REVIEW" | "PROOF_SUBMITTED" | "APPROVED" | "VERIFIED" | "REJECTED" | "EXPIRED" | null;
            newStatus: "REFUNDED" | "FAILED" | "UNPAID" | "PENDING" | "WAITING_REVIEW" | "UNDER_REVIEW" | "PROOF_SUBMITTED" | "APPROVED" | "VERIFIED" | "REJECTED" | "EXPIRED";
            source: string;
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        status: "REFUNDED" | "FAILED" | "UNPAID" | "PENDING" | "WAITING_REVIEW" | "UNDER_REVIEW" | "PROOF_SUBMITTED" | "APPROVED" | "VERIFIED" | "REJECTED" | "EXPIRED";
        id: string;
        createdAt: string;
        updatedAt: string;
        currency: string;
        orderId: string;
        reviewedById: string | null;
        reviewedAt: string | null;
        customerId: string | null;
        method: "VODAFONE_CASH" | "INSTAPAY" | "CASH_ON_DELIVERY" | "COD" | "CARD";
        referenceNumber: string | null;
        amount: number;
        transactionReference: string | null;
        proofImageUrl: string | null;
        reviewNotes: string | null;
        rejectionReason: string | null;
        approvedAt: string | null;
        expiresAt: string | null;
        customer?: {
            id: string;
            firstName: string;
            lastName: string;
            phone: string;
            email: string | null;
        } | null | undefined;
        instructions?: {
            receiverName: string | null;
            notes: string | null;
            method: "VODAFONE_CASH" | "INSTAPAY";
            accountName: string;
            accountNumber: string | null;
            bank: string | null;
            phoneNumber: string | null;
            qrCodeUrl: string | null;
            isActive: boolean;
        } | null | undefined;
        latestProof?: {
            id: string;
            senderRef: string;
            txnReference: string;
            amountClaimed: number;
            submittedAt: string;
        } | null | undefined;
        attachment?: {
            id: string;
            key: string;
            contentType: string;
            url: string;
            sizeBytes: number;
            uploadedAt: string;
        } | null | undefined;
        timeline?: {
            id: string;
            action: string;
            description: string;
            createdAt: string;
            previousStatus: "REFUNDED" | "FAILED" | "UNPAID" | "PENDING" | "WAITING_REVIEW" | "UNDER_REVIEW" | "PROOF_SUBMITTED" | "APPROVED" | "VERIFIED" | "REJECTED" | "EXPIRED" | null;
            newStatus: "REFUNDED" | "FAILED" | "UNPAID" | "PENDING" | "WAITING_REVIEW" | "UNDER_REVIEW" | "PROOF_SUBMITTED" | "APPROVED" | "VERIFIED" | "REJECTED" | "EXPIRED";
            source: string;
        }[] | undefined;
    }, {
        status: "REFUNDED" | "FAILED" | "UNPAID" | "PENDING" | "WAITING_REVIEW" | "UNDER_REVIEW" | "PROOF_SUBMITTED" | "APPROVED" | "VERIFIED" | "REJECTED" | "EXPIRED";
        id: string;
        createdAt: string;
        updatedAt: string;
        currency: string;
        orderId: string;
        reviewedById: string | null;
        reviewedAt: string | null;
        customerId: string | null;
        method: "VODAFONE_CASH" | "INSTAPAY" | "CASH_ON_DELIVERY" | "COD" | "CARD";
        referenceNumber: string | null;
        amount: number;
        transactionReference: string | null;
        proofImageUrl: string | null;
        reviewNotes: string | null;
        rejectionReason: string | null;
        approvedAt: string | null;
        expiresAt: string | null;
        customer?: {
            id: string;
            firstName: string;
            lastName: string;
            phone: string;
            email: string | null;
        } | null | undefined;
        instructions?: {
            receiverName: string | null;
            notes: string | null;
            method: "VODAFONE_CASH" | "INSTAPAY";
            accountName: string;
            accountNumber: string | null;
            bank: string | null;
            phoneNumber: string | null;
            qrCodeUrl: string | null;
            isActive: boolean;
        } | null | undefined;
        latestProof?: {
            id: string;
            senderRef: string;
            txnReference: string;
            amountClaimed: number;
            submittedAt: string;
        } | null | undefined;
        attachment?: {
            id: string;
            key: string;
            contentType: string;
            url: string;
            sizeBytes: number;
            uploadedAt: string;
        } | null | undefined;
        timeline?: {
            id: string;
            action: string;
            description: string;
            createdAt: string;
            previousStatus: "REFUNDED" | "FAILED" | "UNPAID" | "PENDING" | "WAITING_REVIEW" | "UNDER_REVIEW" | "PROOF_SUBMITTED" | "APPROVED" | "VERIFIED" | "REJECTED" | "EXPIRED" | null;
            newStatus: "REFUNDED" | "FAILED" | "UNPAID" | "PENDING" | "WAITING_REVIEW" | "UNDER_REVIEW" | "PROOF_SUBMITTED" | "APPROVED" | "VERIFIED" | "REJECTED" | "EXPIRED";
            source: string;
        }[] | undefined;
    }>, "many">;
    meta: z.ZodObject<{
        page: z.ZodNumber;
        limit: z.ZodNumber;
        total: z.ZodNumber;
        totalPages: z.ZodNumber;
        hasNext: z.ZodBoolean;
        hasPrev: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    }, {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    }>;
}, "strip", z.ZodTypeAny, {
    data: {
        status: "REFUNDED" | "FAILED" | "UNPAID" | "PENDING" | "WAITING_REVIEW" | "UNDER_REVIEW" | "PROOF_SUBMITTED" | "APPROVED" | "VERIFIED" | "REJECTED" | "EXPIRED";
        id: string;
        createdAt: string;
        updatedAt: string;
        currency: string;
        orderId: string;
        reviewedById: string | null;
        reviewedAt: string | null;
        customerId: string | null;
        method: "VODAFONE_CASH" | "INSTAPAY" | "CASH_ON_DELIVERY" | "COD" | "CARD";
        referenceNumber: string | null;
        amount: number;
        transactionReference: string | null;
        proofImageUrl: string | null;
        reviewNotes: string | null;
        rejectionReason: string | null;
        approvedAt: string | null;
        expiresAt: string | null;
        customer?: {
            id: string;
            firstName: string;
            lastName: string;
            phone: string;
            email: string | null;
        } | null | undefined;
        instructions?: {
            receiverName: string | null;
            notes: string | null;
            method: "VODAFONE_CASH" | "INSTAPAY";
            accountName: string;
            accountNumber: string | null;
            bank: string | null;
            phoneNumber: string | null;
            qrCodeUrl: string | null;
            isActive: boolean;
        } | null | undefined;
        latestProof?: {
            id: string;
            senderRef: string;
            txnReference: string;
            amountClaimed: number;
            submittedAt: string;
        } | null | undefined;
        attachment?: {
            id: string;
            key: string;
            contentType: string;
            url: string;
            sizeBytes: number;
            uploadedAt: string;
        } | null | undefined;
        timeline?: {
            id: string;
            action: string;
            description: string;
            createdAt: string;
            previousStatus: "REFUNDED" | "FAILED" | "UNPAID" | "PENDING" | "WAITING_REVIEW" | "UNDER_REVIEW" | "PROOF_SUBMITTED" | "APPROVED" | "VERIFIED" | "REJECTED" | "EXPIRED" | null;
            newStatus: "REFUNDED" | "FAILED" | "UNPAID" | "PENDING" | "WAITING_REVIEW" | "UNDER_REVIEW" | "PROOF_SUBMITTED" | "APPROVED" | "VERIFIED" | "REJECTED" | "EXPIRED";
            source: string;
        }[] | undefined;
    }[];
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    };
}, {
    data: {
        status: "REFUNDED" | "FAILED" | "UNPAID" | "PENDING" | "WAITING_REVIEW" | "UNDER_REVIEW" | "PROOF_SUBMITTED" | "APPROVED" | "VERIFIED" | "REJECTED" | "EXPIRED";
        id: string;
        createdAt: string;
        updatedAt: string;
        currency: string;
        orderId: string;
        reviewedById: string | null;
        reviewedAt: string | null;
        customerId: string | null;
        method: "VODAFONE_CASH" | "INSTAPAY" | "CASH_ON_DELIVERY" | "COD" | "CARD";
        referenceNumber: string | null;
        amount: number;
        transactionReference: string | null;
        proofImageUrl: string | null;
        reviewNotes: string | null;
        rejectionReason: string | null;
        approvedAt: string | null;
        expiresAt: string | null;
        customer?: {
            id: string;
            firstName: string;
            lastName: string;
            phone: string;
            email: string | null;
        } | null | undefined;
        instructions?: {
            receiverName: string | null;
            notes: string | null;
            method: "VODAFONE_CASH" | "INSTAPAY";
            accountName: string;
            accountNumber: string | null;
            bank: string | null;
            phoneNumber: string | null;
            qrCodeUrl: string | null;
            isActive: boolean;
        } | null | undefined;
        latestProof?: {
            id: string;
            senderRef: string;
            txnReference: string;
            amountClaimed: number;
            submittedAt: string;
        } | null | undefined;
        attachment?: {
            id: string;
            key: string;
            contentType: string;
            url: string;
            sizeBytes: number;
            uploadedAt: string;
        } | null | undefined;
        timeline?: {
            id: string;
            action: string;
            description: string;
            createdAt: string;
            previousStatus: "REFUNDED" | "FAILED" | "UNPAID" | "PENDING" | "WAITING_REVIEW" | "UNDER_REVIEW" | "PROOF_SUBMITTED" | "APPROVED" | "VERIFIED" | "REJECTED" | "EXPIRED" | null;
            newStatus: "REFUNDED" | "FAILED" | "UNPAID" | "PENDING" | "WAITING_REVIEW" | "UNDER_REVIEW" | "PROOF_SUBMITTED" | "APPROVED" | "VERIFIED" | "REJECTED" | "EXPIRED";
            source: string;
        }[] | undefined;
    }[];
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    };
}>;
//# sourceMappingURL=payment-proof.schema.d.ts.map