import { z } from "zod";
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
export declare const PaymentMethodEnum: z.ZodEnum<
  ["VODAFONE_CASH", "INSTAPAY", "CASH_ON_DELIVERY", "COD", "CARD"]
>;
export type PaymentMethod = z.infer<typeof PaymentMethodEnum>;
/** Methods that require the customer to submit transfer proof. COD does not. */
export declare const PROOF_REQUIRED_METHODS: readonly ["VODAFONE_CASH", "INSTAPAY"];
export declare const OrderStatusEnum: z.ZodEnum<
  [
    "PENDING_PAYMENT",
    "AWAITING_PAYMENT",
    "PAYMENT_REVIEW",
    "PAYMENT_FAILED",
    "PAID",
    "CONFIRMED",
    "PROCESSING",
    "READY_TO_SHIP",
    "READY_FOR_SHIPPING",
    "SHIPPED",
    "IN_TRANSIT",
    "OUT_FOR_DELIVERY",
    "DELIVERED",
    "RETURNED",
    "CANCELLED",
    "REFUNDED",
    "FAILED",
  ]
>;
export type OrderStatus = z.infer<typeof OrderStatusEnum>;
export declare const PaymentStatusEnum: z.ZodEnum<
  [
    "UNPAID",
    "PENDING",
    "WAITING_REVIEW",
    "UNDER_REVIEW",
    "PROOF_SUBMITTED",
    "APPROVED",
    "VERIFIED",
    "REJECTED",
    "REFUNDED",
    "EXPIRED",
    "FAILED",
  ]
>;
export type PaymentStatus = z.infer<typeof PaymentStatusEnum>;
export declare const ShipmentStatusEnum: z.ZodEnum<
  [
    "CREATED",
    "PENDING_PICKUP",
    "PICKED_UP",
    "AT_WAREHOUSE",
    "IN_TRANSIT",
    "OUT_FOR_DELIVERY",
    "FULFILLED",
    "DELIVERED",
    "EXCEPTION",
    "TERMINATED",
    "FAILED",
    "LOST",
    "DAMAGED",
    "RETURNED",
    "CANCELLED",
    "AWAITING_ACTION",
    "ARCHIVED",
    "ON_HOLD",
  ]
>;
export type ShipmentStatus = z.infer<typeof ShipmentStatusEnum>;
export declare const ShipmentProviderEnum: z.ZodEnum<["MOCK", "BOSTA"]>;
export type ShipmentProvider = z.infer<typeof ShipmentProviderEnum>;
export declare const StoreStatusEnum: z.ZodEnum<["OPEN", "CLOSED", "BUSY"]>;
export type StoreStatus = z.infer<typeof StoreStatusEnum>;
export declare const CouponTypeEnum: z.ZodEnum<["PERCENT", "FIXED", "FREE_SHIPPING"]>;
export type CouponType = z.infer<typeof CouponTypeEnum>;
export declare const ProofRejectReasonEnum: z.ZodEnum<
  ["WRONG_AMOUNT", "ILLEGIBLE_SCREENSHOT", "REFERENCE_NOT_FOUND", "DUPLICATE_REFERENCE", "OTHER"]
>;
export type ProofRejectReason = z.infer<typeof ProofRejectReasonEnum>;
//# sourceMappingURL=enums.d.ts.map
