import { z } from 'zod';
export declare const RoleEnum: z.ZodEnum<["SUPER_ADMIN", "ADMIN", "CLIENT"]>;
export type Role = z.infer<typeof RoleEnum>;
export declare const GenderEnum: z.ZodEnum<["MALE", "FEMALE", "OTHER"]>;
export type Gender = z.infer<typeof GenderEnum>;
export declare const UserStatusEnum: z.ZodEnum<["ACTIVE", "INACTIVE", "DELETED"]>;
export type UserStatus = z.infer<typeof UserStatusEnum>;
export declare const AddressLabelEnum: z.ZodEnum<["HOME", "WORK", "OTHER"]>;
export type AddressLabel = z.infer<typeof AddressLabelEnum>;
/**
 * MVP payment methods. All three are settled manually — there is no gateway.
 * Adding a method here surfaces every place that must handle it at compile time.
 */
export declare const PaymentMethodEnum: z.ZodEnum<["VODAFONE_CASH", "INSTAPAY", "COD"]>;
export type PaymentMethod = z.infer<typeof PaymentMethodEnum>;
/** Methods that require the customer to submit transfer proof. COD does not. */
export declare const PROOF_REQUIRED_METHODS: readonly ["VODAFONE_CASH", "INSTAPAY"];
export declare const OrderStatusEnum: z.ZodEnum<["AWAITING_PAYMENT", "PAYMENT_REVIEW", "CONFIRMED", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED", "REFUNDED"]>;
export type OrderStatus = z.infer<typeof OrderStatusEnum>;
export declare const PaymentStatusEnum: z.ZodEnum<["UNPAID", "PROOF_SUBMITTED", "VERIFIED", "REJECTED", "REFUNDED"]>;
export type PaymentStatus = z.infer<typeof PaymentStatusEnum>;
export declare const StoreStatusEnum: z.ZodEnum<["OPEN", "CLOSED", "BUSY"]>;
export type StoreStatus = z.infer<typeof StoreStatusEnum>;
export declare const CouponTypeEnum: z.ZodEnum<["PERCENT", "FIXED", "FREE_SHIPPING"]>;
export type CouponType = z.infer<typeof CouponTypeEnum>;
export declare const ProofRejectReasonEnum: z.ZodEnum<["WRONG_AMOUNT", "ILLEGIBLE_SCREENSHOT", "REFERENCE_NOT_FOUND", "DUPLICATE_REFERENCE", "OTHER"]>;
export type ProofRejectReason = z.infer<typeof ProofRejectReasonEnum>;
//# sourceMappingURL=enums.d.ts.map