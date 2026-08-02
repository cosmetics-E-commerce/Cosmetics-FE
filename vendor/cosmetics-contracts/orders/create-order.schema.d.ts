import { z } from 'zod';
export declare const orderItemInputSchema: z.ZodObject<{
    variantId: z.ZodString;
    quantity: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    variantId: string;
    quantity: number;
}, {
    variantId: string;
    quantity: number;
}>;
/**
 * POST /orders — requires an Idempotency-Key header (PLAN.md §6.6).
 * Consumed by the API's ZodValidationPipe and by the checkout form's
 * zodResolver. One definition, both sides.
 */
export declare const createOrderSchema: z.ZodObject<{
    items: z.ZodArray<z.ZodObject<{
        variantId: z.ZodString;
        quantity: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        variantId: string;
        quantity: number;
    }, {
        variantId: string;
        quantity: number;
    }>, "many">;
    shippingAddressId: z.ZodString;
    paymentMethod: z.ZodEnum<["VODAFONE_CASH", "INSTAPAY", "COD"]>;
    couponCode: z.ZodOptional<z.ZodString>;
    notes: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    paymentMethod: "VODAFONE_CASH" | "INSTAPAY" | "COD";
    items: {
        variantId: string;
        quantity: number;
    }[];
    shippingAddressId: string;
    couponCode?: string | undefined;
    notes?: string | undefined;
}, {
    paymentMethod: "VODAFONE_CASH" | "INSTAPAY" | "COD";
    items: {
        variantId: string;
        quantity: number;
    }[];
    shippingAddressId: string;
    couponCode?: string | undefined;
    notes?: string | undefined;
}>;
export type CreateOrderInput = z.infer<typeof createOrderSchema>;
export declare const cancelOrderSchema: z.ZodObject<{
    reason: z.ZodString;
}, "strip", z.ZodTypeAny, {
    reason: string;
}, {
    reason: string;
}>;
export type CancelOrderInput = z.infer<typeof cancelOrderSchema>;
/**
 * Returned on order creation. For VODAFONE_CASH / INSTAPAY this carries the
 * merchant handle the customer must transfer to, plus the deadline after which
 * the reservation is released.
 */
export declare const orderPaymentInstructionsSchema: z.ZodObject<{
    orderNumber: z.ZodString;
    amountDue: z.ZodNumber;
    method: z.ZodEnum<["VODAFONE_CASH", "INSTAPAY", "COD"]>;
    vodafoneCashNumber: z.ZodNullable<z.ZodString>;
    instapayAddress: z.ZodNullable<z.ZodString>;
    paymentDueAt: z.ZodNullable<z.ZodString>;
    transferNote: z.ZodString;
}, "strip", z.ZodTypeAny, {
    orderNumber: string;
    amountDue: number;
    method: "VODAFONE_CASH" | "INSTAPAY" | "COD";
    vodafoneCashNumber: string | null;
    instapayAddress: string | null;
    paymentDueAt: string | null;
    transferNote: string;
}, {
    orderNumber: string;
    amountDue: number;
    method: "VODAFONE_CASH" | "INSTAPAY" | "COD";
    vodafoneCashNumber: string | null;
    instapayAddress: string | null;
    paymentDueAt: string | null;
    transferNote: string;
}>;
export type OrderPaymentInstructions = z.infer<typeof orderPaymentInstructionsSchema>;
//# sourceMappingURL=create-order.schema.d.ts.map