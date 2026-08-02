"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderPaymentInstructionsSchema = exports.cancelOrderSchema = exports.createOrderSchema = exports.orderItemInputSchema = void 0;
const zod_1 = require("zod");
const enums_1 = require("../enums");
const primitives_1 = require("../common/primitives");
exports.orderItemInputSchema = zod_1.z.object({
    variantId: primitives_1.uuidSchema,
    quantity: zod_1.z.number().int().positive().max(99),
});
/**
 * POST /orders — requires an Idempotency-Key header (PLAN.md §6.6).
 * Consumed by the API's ZodValidationPipe and by the checkout form's
 * zodResolver. One definition, both sides.
 */
exports.createOrderSchema = zod_1.z.object({
    items: zod_1.z.array(exports.orderItemInputSchema).min(1, 'Order must contain at least one item'),
    shippingAddressId: primitives_1.uuidSchema,
    paymentMethod: enums_1.PaymentMethodEnum,
    couponCode: zod_1.z.string().trim().toUpperCase().min(3).max(32).optional(),
    notes: zod_1.z.string().trim().max(500).optional(),
});
exports.cancelOrderSchema = zod_1.z.object({
    reason: zod_1.z.string().trim().min(3).max(500),
});
/**
 * Returned on order creation. For VODAFONE_CASH / INSTAPAY this carries the
 * merchant handle the customer must transfer to, plus the deadline after which
 * the reservation is released.
 */
exports.orderPaymentInstructionsSchema = zod_1.z.object({
    orderNumber: zod_1.z.string(),
    amountDue: zod_1.z.number().int(),
    method: enums_1.PaymentMethodEnum,
    vodafoneCashNumber: zod_1.z.string().nullable(),
    instapayAddress: zod_1.z.string().nullable(),
    paymentDueAt: zod_1.z.string().datetime().nullable(),
    transferNote: zod_1.z.string(),
});
//# sourceMappingURL=create-order.schema.js.map