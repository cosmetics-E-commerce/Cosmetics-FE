import { z } from 'zod';

import { request } from '@/lib/http/client';

const paymentMethodSchema = z.enum(['INSTAPAY', 'VODAFONE_CASH', 'CASH_ON_DELIVERY', 'COD']);

const checkoutOrderSchema = z.object({
  id: z.string(),
  orderNumber: z.string(),
  total: z.number(),
  paymentMethod: z.string(),
  paymentStatus: z.string(),
  status: z.string(),
  paymentDueAt: z.string().nullable(),
});

const orderPaymentInstructionsSchema = z.object({
  orderNumber: z.string(),
  amountDue: z.number(),
  method: z.string(),
  vodafoneCashNumber: z.string().nullable(),
  instapayAddress: z.string().nullable(),
  paymentDueAt: z.string().nullable(),
  transferNote: z.string(),
});

const checkoutResponseSchema = z.object({
  order: checkoutOrderSchema.passthrough(),
  shipment: z.unknown().nullable().optional(),
  paymentInstructions: orderPaymentInstructionsSchema,
});

export type CheckoutPaymentMethod = z.infer<typeof paymentMethodSchema>;
export type CheckoutResponse = z.infer<typeof checkoutResponseSchema>;

export async function checkoutFromCart(input: {
  shippingAddressId: string;
  paymentMethod: CheckoutPaymentMethod;
  notes?: string;
}): Promise<CheckoutResponse> {
  const response = await request<unknown>({
    method: 'POST',
    url: '/orders/checkout',
    data: input,
    headers: {
      'Idempotency-Key': crypto.randomUUID(),
    },
  });

  return checkoutResponseSchema.parse(response);
}
