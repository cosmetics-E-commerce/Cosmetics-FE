"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProofRejectReasonEnum =
  exports.CouponTypeEnum =
  exports.StoreStatusEnum =
  exports.ShipmentProviderEnum =
  exports.ShipmentStatusEnum =
  exports.PaymentStatusEnum =
  exports.OrderStatusEnum =
  exports.PROOF_REQUIRED_METHODS =
  exports.PaymentMethodEnum =
  exports.AddressLabelEnum =
  exports.UserStatusEnum =
  exports.GenderEnum =
  exports.RoleEnum =
    void 0;
const zod_1 = require("zod");
exports.RoleEnum = zod_1.z.enum(["SUPER_ADMIN", "ADMIN", "CLIENT"]);
exports.GenderEnum = zod_1.z.enum(["MALE", "FEMALE", "OTHER"]);
exports.UserStatusEnum = zod_1.z.enum(["ACTIVE", "INACTIVE", "DELETED"]);
exports.AddressLabelEnum = zod_1.z.enum(["HOME", "WORK", "OTHER"]);
/**
 * MVP payment methods. All three are settled manually — there is no gateway.
 * Adding a method here surfaces every place that must handle it at compile time.
 */
exports.PaymentMethodEnum = zod_1.z.enum([
  "VODAFONE_CASH",
  "INSTAPAY",
  "CASH_ON_DELIVERY",
  "COD",
  "CARD",
]);
/** Methods that require the customer to submit transfer proof. COD does not. */
exports.PROOF_REQUIRED_METHODS = ["VODAFONE_CASH", "INSTAPAY"];
exports.OrderStatusEnum = zod_1.z.enum([
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
]);
exports.PaymentStatusEnum = zod_1.z.enum([
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
]);
exports.ShipmentStatusEnum = zod_1.z.enum([
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
]);
exports.ShipmentProviderEnum = zod_1.z.enum(["MOCK", "BOSTA"]);
exports.StoreStatusEnum = zod_1.z.enum(["OPEN", "CLOSED", "BUSY"]);
exports.CouponTypeEnum = zod_1.z.enum(["PERCENT", "FIXED", "FREE_SHIPPING"]);
exports.ProofRejectReasonEnum = zod_1.z.enum([
  "WRONG_AMOUNT",
  "ILLEGIBLE_SCREENSHOT",
  "REFERENCE_NOT_FOUND",
  "DUPLICATE_REFERENCE",
  "OTHER",
]);
//# sourceMappingURL=enums.js.map
