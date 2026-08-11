"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shipmentResponseSchema =
  exports.orderTrackingResponseSchema =
  exports.shippingRateResponseSchema =
  exports.packageDimensionsSchema =
  exports.shippingRateQuerySchema =
  exports.createShipmentSchema =
  exports.shipmentProviderSchema =
  exports.shipmentStatusSchema =
    void 0;
const zod_1 = require("zod");
const primitives_1 = require("../common/primitives");
exports.shipmentStatusSchema = zod_1.z.enum([
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
exports.shipmentProviderSchema = zod_1.z.enum(["MOCK", "BOSTA"]);
exports.createShipmentSchema = zod_1.z.object({
  shippingCost: zod_1.z.number().int().min(0).optional(),
  estimatedDelivery: zod_1.z.string().datetime().optional(),
});
/**
 * GET /shipping/rates — the checkout shipping estimate.
 *
 * The customer only picks an address; the cart, the package measurements and
 * the provider call are all resolved server-side. The price the customer sees
 * here is re-derived at checkout and never read back from the client.
 */
exports.shippingRateQuerySchema = zod_1.z.object({
  addressId: primitives_1.uuidSchema,
});
/** Carton measurements in centimetres. */
exports.packageDimensionsSchema = zod_1.z.object({
  length: zod_1.z.number().nonnegative(),
  width: zod_1.z.number().nonnegative(),
  height: zod_1.z.number().nonnegative(),
});
exports.shippingRateResponseSchema = zod_1.z.object({
  provider: exports.shipmentProviderSchema,
  /** Integer piastres, like every other money field. 1 EGP = 100 piastres. */
  shippingCost: primitives_1.piastresSchema,
  currency: zod_1.z.string().length(3),
  estimatedDays: zod_1.z.number().int().nonnegative(),
  estimatedDeliveryDate: zod_1.z.string(),
  /** Billable package weight in kilograms. */
  weight: zod_1.z.number().nonnegative(),
  dimensions: exports.packageDimensionsSchema,
});
/**
 * GET /orders/:id/tracking — what the customer sees on the tracking screen.
 *
 * Deliberately narrower than the admin shipment view: no provider shipment id,
 * no raw carrier payload. `status` is the shipment's own status; `orderStatus`
 * is the order it drives, so the screen can render one consistent stage.
 */
exports.orderTrackingResponseSchema = zod_1.z.object({
  orderId: primitives_1.uuidSchema,
  orderNumber: zod_1.z.string(),
  orderStatus: zod_1.z.string(),
  /** Null until the payment is approved and the shipment is booked. */
  shipment: zod_1.z
    .object({
      provider: exports.shipmentProviderSchema,
      trackingNumber: zod_1.z.string(),
      trackingUrl: zod_1.z.string().url(),
      status: exports.shipmentStatusSchema,
      estimatedDelivery: zod_1.z.string().nullable(),
      bostaState: zod_1.z.number().int().nullable().optional(),
      bostaStateLabel: zod_1.z.string().nullable().optional(),
      bostaType: zod_1.z.string().nullable().optional(),
      bostaStatusUpdatedAt: zod_1.z.string().nullable().optional(),
      deliveryPromiseDate: zod_1.z.string().nullable().optional(),
      exceptionCode: zod_1.z.number().int().nullable().optional(),
      exceptionReason: zod_1.z.string().nullable().optional(),
      numberOfAttempts: zod_1.z.number().int().nullable().optional(),
      isConfirmedDelivery: zod_1.z.boolean().nullable().optional(),
      createdAt: zod_1.z.string(),
      updatedAt: zod_1.z.string(),
    })
    .nullable(),
  estimatedDeliveryDate: zod_1.z.string().nullable(),
  shippingAddress: zod_1.z.object({
    receiverName: zod_1.z.string().nullable(),
    governorate: zod_1.z.string().nullable(),
    city: zod_1.z.string().nullable(),
    area: zod_1.z.string().nullable(),
  }),
  /** Newest first — the shipment-related order timeline entries. */
  history: zod_1.z.array(
    zod_1.z.object({
      action: zod_1.z.string(),
      description: zod_1.z.string(),
      createdAt: zod_1.z.string(),
    }),
  ),
});
exports.shipmentResponseSchema = zod_1.z.object({
  id: primitives_1.uuidSchema,
  orderId: primitives_1.uuidSchema,
  provider: exports.shipmentProviderSchema,
  shipmentId: zod_1.z.string(),
  trackingNumber: zod_1.z.string(),
  trackingUrl: zod_1.z.string().url(),
  status: exports.shipmentStatusSchema,
  shippingCost: zod_1.z.number().int().min(0),
  estimatedDelivery: zod_1.z.string().nullable(),
  bostaState: zod_1.z.number().int().nullable().optional(),
  bostaStateLabel: zod_1.z.string().nullable().optional(),
  bostaType: zod_1.z.string().nullable().optional(),
  bostaStatusUpdatedAt: zod_1.z.string().nullable().optional(),
  deliveryPromiseDate: zod_1.z.string().nullable().optional(),
  exceptionCode: zod_1.z.number().int().nullable().optional(),
  exceptionReason: zod_1.z.string().nullable().optional(),
  numberOfAttempts: zod_1.z.number().int().nullable().optional(),
  isConfirmedDelivery: zod_1.z.boolean().nullable().optional(),
  createdAt: zod_1.z.string(),
  updatedAt: zod_1.z.string(),
});
//# sourceMappingURL=shipping.schema.js.map
