import { z } from 'zod';

import { request } from '@/lib/http/client';

const manualPaymentMethodSchema = z.enum(['INSTAPAY', 'VODAFONE_CASH']);

const paymentInstructionsSchema = z.object({
  method: manualPaymentMethodSchema,
  accountName: z.string(),
  accountNumber: z.string().nullable(),
  bank: z.string().nullable(),
  phoneNumber: z.string().nullable(),
  receiverName: z.string().nullable(),
  qrCodeUrl: z.string().nullable(),
  notes: z.string().nullable(),
  isActive: z.boolean(),
});

const paymentAttachmentSchema = z.object({
  id: z.string(),
  key: z.string(),
  url: z.string(),
  contentType: z.string(),
  sizeBytes: z.number(),
  uploadedAt: z.string(),
});

const paymentHistorySchema = z.object({
  id: z.string(),
  action: z.string(),
  previousStatus: z.string().nullable(),
  newStatus: z.string(),
  source: z.string(),
  description: z.string(),
  createdAt: z.string(),
});

const paymentSchema = z.object({
  id: z.string(),
  orderId: z.string(),
  customerId: z.string().nullable(),
  method: z.string(),
  status: z.string(),
  amount: z.number(),
  currency: z.string(),
  referenceNumber: z.string().nullable(),
  transactionReference: z.string().nullable(),
  proofImageUrl: z.string().nullable(),
  reviewedById: z.string().nullable(),
  reviewedAt: z.string().nullable(),
  reviewNotes: z.string().nullable(),
  rejectionReason: z.string().nullable(),
  approvedAt: z.string().nullable(),
  expiresAt: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
  instructions: paymentInstructionsSchema.nullable().optional(),
  attachment: paymentAttachmentSchema.nullable().optional(),
  timeline: z.array(paymentHistorySchema).optional(),
});

export type ManualPaymentMethod = z.infer<typeof manualPaymentMethodSchema>;
export type PaymentInstructions = z.infer<typeof paymentInstructionsSchema>;
export type PaymentResponse = z.infer<typeof paymentSchema>;

export type SubmitPaymentProofInput = {
  senderRef: string;
  txnReference: string;
  amountClaimed: number;
  proofImageKey: string;
  contentType: 'image/jpeg' | 'image/png' | 'image/webp';
  contentLength: number;
};

export async function listPaymentInstructions(): Promise<PaymentInstructions[]> {
  const response = await request<unknown>({
    method: 'GET',
    url: '/payments/instructions',
  });

  return z.array(paymentInstructionsSchema).parse(response);
}

export async function createPayment(input: { orderId: string; method: ManualPaymentMethod }): Promise<PaymentResponse> {
  const response = await request<unknown>({
    method: 'POST',
    url: '/payments',
    data: input,
    headers: {
      'Idempotency-Key': crypto.randomUUID(),
    },
  });

  return paymentSchema.parse(response);
}

export async function submitPaymentProof(paymentId: string, input: SubmitPaymentProofInput): Promise<PaymentResponse> {
  const response = await request<unknown>({
    method: 'POST',
    url: `/payments/${paymentId}/proof`,
    data: input,
    headers: {
      'Idempotency-Key': crypto.randomUUID(),
    },
  });

  return paymentSchema.parse(response);
}
