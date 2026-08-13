import { z } from "zod";
export declare const shipmentStatusSchema: z.ZodEnum<["CREATED", "PENDING_PICKUP", "PICKED_UP", "AT_WAREHOUSE", "IN_TRANSIT", "OUT_FOR_DELIVERY", "FULFILLED", "DELIVERED", "EXCEPTION", "TERMINATED", "FAILED", "LOST", "DAMAGED", "RETURNED", "CANCELLED", "AWAITING_ACTION", "ARCHIVED", "ON_HOLD"]>;
export type ShipmentStatusValue = z.infer<typeof shipmentStatusSchema>;
export declare const shipmentProviderSchema: z.ZodEnum<["MOCK", "BOSTA"]>;
export type ShipmentProviderValue = z.infer<typeof shipmentProviderSchema>;
export declare const createShipmentSchema: z.ZodObject<{
    shippingCost: z.ZodOptional<z.ZodNumber>;
    estimatedDelivery: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    shippingCost?: number | undefined;
    estimatedDelivery?: string | undefined;
}, {
    shippingCost?: number | undefined;
    estimatedDelivery?: string | undefined;
}>;
export type CreateShipmentInput = z.infer<typeof createShipmentSchema>;
/**
 * GET /shipping/rates — the checkout shipping estimate.
 *
 * The customer only picks an address; the cart, the package measurements and
 * the provider call are all resolved server-side. The price the customer sees
 * here is re-derived at checkout and never read back from the client.
 */
export declare const shippingRateQuerySchema: z.ZodObject<{
    addressId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    addressId: string;
}, {
    addressId: string;
}>;
export type ShippingRateQuery = z.infer<typeof shippingRateQuerySchema>;
/** Carton measurements in centimetres. */
export declare const packageDimensionsSchema: z.ZodObject<{
    length: z.ZodNumber;
    width: z.ZodNumber;
    height: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    length: number;
    width: number;
    height: number;
}, {
    length: number;
    width: number;
    height: number;
}>;
export type PackageDimensions = z.infer<typeof packageDimensionsSchema>;
export declare const shippingRateResponseSchema: z.ZodObject<{
    provider: z.ZodEnum<["MOCK", "BOSTA"]>;
    /** Integer piastres, like every other money field. 1 EGP = 100 piastres. */
    shippingCost: z.ZodNumber;
    currency: z.ZodString;
    estimatedDays: z.ZodNumber;
    estimatedDeliveryDate: z.ZodString;
    /** Billable package weight in kilograms. */
    weight: z.ZodNumber;
    dimensions: z.ZodObject<{
        length: z.ZodNumber;
        width: z.ZodNumber;
        height: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        length: number;
        width: number;
        height: number;
    }, {
        length: number;
        width: number;
        height: number;
    }>;
}, "strip", z.ZodTypeAny, {
    currency: string;
    shippingCost: number;
    provider: "MOCK" | "BOSTA";
    estimatedDays: number;
    estimatedDeliveryDate: string;
    weight: number;
    dimensions: {
        length: number;
        width: number;
        height: number;
    };
}, {
    currency: string;
    shippingCost: number;
    provider: "MOCK" | "BOSTA";
    estimatedDays: number;
    estimatedDeliveryDate: string;
    weight: number;
    dimensions: {
        length: number;
        width: number;
        height: number;
    };
}>;
export type ShippingRateResponse = z.infer<typeof shippingRateResponseSchema>;
/**
 * GET /orders/:id/tracking — what the customer sees on the tracking screen.
 *
 * Deliberately narrower than the admin shipment view: no provider shipment id,
 * no raw carrier payload. `status` is the shipment's own status; `orderStatus`
 * is the order it drives, so the screen can render one consistent stage.
 */
export declare const orderTrackingResponseSchema: z.ZodObject<{
    orderId: z.ZodString;
    orderNumber: z.ZodString;
    orderStatus: z.ZodString;
    /** Null until the payment is approved and the shipment is booked. */
    shipment: z.ZodNullable<z.ZodObject<{
        provider: z.ZodEnum<["MOCK", "BOSTA"]>;
        trackingNumber: z.ZodString;
        trackingUrl: z.ZodString;
        status: z.ZodEnum<["CREATED", "PENDING_PICKUP", "PICKED_UP", "AT_WAREHOUSE", "IN_TRANSIT", "OUT_FOR_DELIVERY", "FULFILLED", "DELIVERED", "EXCEPTION", "TERMINATED", "FAILED", "LOST", "DAMAGED", "RETURNED", "CANCELLED", "AWAITING_ACTION", "ARCHIVED", "ON_HOLD"]>;
        estimatedDelivery: z.ZodNullable<z.ZodString>;
        bostaState: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        bostaStateLabel: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        bostaType: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        bostaStatusUpdatedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        deliveryPromiseDate: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        exceptionCode: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        exceptionReason: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        numberOfAttempts: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        isConfirmedDelivery: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
        createdAt: z.ZodString;
        updatedAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        status: "IN_TRANSIT" | "OUT_FOR_DELIVERY" | "DELIVERED" | "RETURNED" | "CANCELLED" | "FAILED" | "CREATED" | "PENDING_PICKUP" | "PICKED_UP" | "AT_WAREHOUSE" | "FULFILLED" | "EXCEPTION" | "TERMINATED" | "LOST" | "DAMAGED" | "AWAITING_ACTION" | "ARCHIVED" | "ON_HOLD";
        createdAt: string;
        updatedAt: string;
        estimatedDelivery: string | null;
        provider: "MOCK" | "BOSTA";
        trackingNumber: string;
        trackingUrl: string;
        bostaState?: number | null | undefined;
        bostaStateLabel?: string | null | undefined;
        bostaType?: string | null | undefined;
        bostaStatusUpdatedAt?: string | null | undefined;
        deliveryPromiseDate?: string | null | undefined;
        exceptionCode?: number | null | undefined;
        exceptionReason?: string | null | undefined;
        numberOfAttempts?: number | null | undefined;
        isConfirmedDelivery?: boolean | null | undefined;
    }, {
        status: "IN_TRANSIT" | "OUT_FOR_DELIVERY" | "DELIVERED" | "RETURNED" | "CANCELLED" | "FAILED" | "CREATED" | "PENDING_PICKUP" | "PICKED_UP" | "AT_WAREHOUSE" | "FULFILLED" | "EXCEPTION" | "TERMINATED" | "LOST" | "DAMAGED" | "AWAITING_ACTION" | "ARCHIVED" | "ON_HOLD";
        createdAt: string;
        updatedAt: string;
        estimatedDelivery: string | null;
        provider: "MOCK" | "BOSTA";
        trackingNumber: string;
        trackingUrl: string;
        bostaState?: number | null | undefined;
        bostaStateLabel?: string | null | undefined;
        bostaType?: string | null | undefined;
        bostaStatusUpdatedAt?: string | null | undefined;
        deliveryPromiseDate?: string | null | undefined;
        exceptionCode?: number | null | undefined;
        exceptionReason?: string | null | undefined;
        numberOfAttempts?: number | null | undefined;
        isConfirmedDelivery?: boolean | null | undefined;
    }>>;
    estimatedDeliveryDate: z.ZodNullable<z.ZodString>;
    shippingAddress: z.ZodObject<{
        receiverName: z.ZodNullable<z.ZodString>;
        governorate: z.ZodNullable<z.ZodString>;
        city: z.ZodNullable<z.ZodString>;
        area: z.ZodNullable<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        receiverName: string | null;
        governorate: string | null;
        city: string | null;
        area: string | null;
    }, {
        receiverName: string | null;
        governorate: string | null;
        city: string | null;
        area: string | null;
    }>;
    /** Newest first — the shipment-related order timeline entries. */
    history: z.ZodArray<z.ZodObject<{
        action: z.ZodString;
        description: z.ZodString;
        createdAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        action: string;
        description: string;
        createdAt: string;
    }, {
        action: string;
        description: string;
        createdAt: string;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    orderNumber: string;
    estimatedDeliveryDate: string | null;
    orderId: string;
    orderStatus: string;
    shipment: {
        status: "IN_TRANSIT" | "OUT_FOR_DELIVERY" | "DELIVERED" | "RETURNED" | "CANCELLED" | "FAILED" | "CREATED" | "PENDING_PICKUP" | "PICKED_UP" | "AT_WAREHOUSE" | "FULFILLED" | "EXCEPTION" | "TERMINATED" | "LOST" | "DAMAGED" | "AWAITING_ACTION" | "ARCHIVED" | "ON_HOLD";
        createdAt: string;
        updatedAt: string;
        estimatedDelivery: string | null;
        provider: "MOCK" | "BOSTA";
        trackingNumber: string;
        trackingUrl: string;
        bostaState?: number | null | undefined;
        bostaStateLabel?: string | null | undefined;
        bostaType?: string | null | undefined;
        bostaStatusUpdatedAt?: string | null | undefined;
        deliveryPromiseDate?: string | null | undefined;
        exceptionCode?: number | null | undefined;
        exceptionReason?: string | null | undefined;
        numberOfAttempts?: number | null | undefined;
        isConfirmedDelivery?: boolean | null | undefined;
    } | null;
    shippingAddress: {
        receiverName: string | null;
        governorate: string | null;
        city: string | null;
        area: string | null;
    };
    history: {
        action: string;
        description: string;
        createdAt: string;
    }[];
}, {
    orderNumber: string;
    estimatedDeliveryDate: string | null;
    orderId: string;
    orderStatus: string;
    shipment: {
        status: "IN_TRANSIT" | "OUT_FOR_DELIVERY" | "DELIVERED" | "RETURNED" | "CANCELLED" | "FAILED" | "CREATED" | "PENDING_PICKUP" | "PICKED_UP" | "AT_WAREHOUSE" | "FULFILLED" | "EXCEPTION" | "TERMINATED" | "LOST" | "DAMAGED" | "AWAITING_ACTION" | "ARCHIVED" | "ON_HOLD";
        createdAt: string;
        updatedAt: string;
        estimatedDelivery: string | null;
        provider: "MOCK" | "BOSTA";
        trackingNumber: string;
        trackingUrl: string;
        bostaState?: number | null | undefined;
        bostaStateLabel?: string | null | undefined;
        bostaType?: string | null | undefined;
        bostaStatusUpdatedAt?: string | null | undefined;
        deliveryPromiseDate?: string | null | undefined;
        exceptionCode?: number | null | undefined;
        exceptionReason?: string | null | undefined;
        numberOfAttempts?: number | null | undefined;
        isConfirmedDelivery?: boolean | null | undefined;
    } | null;
    shippingAddress: {
        receiverName: string | null;
        governorate: string | null;
        city: string | null;
        area: string | null;
    };
    history: {
        action: string;
        description: string;
        createdAt: string;
    }[];
}>;
export type OrderTrackingResponse = z.infer<typeof orderTrackingResponseSchema>;
export declare const shipmentResponseSchema: z.ZodObject<{
    id: z.ZodString;
    orderId: z.ZodString;
    provider: z.ZodEnum<["MOCK", "BOSTA"]>;
    shipmentId: z.ZodString;
    trackingNumber: z.ZodString;
    trackingUrl: z.ZodString;
    status: z.ZodEnum<["CREATED", "PENDING_PICKUP", "PICKED_UP", "AT_WAREHOUSE", "IN_TRANSIT", "OUT_FOR_DELIVERY", "FULFILLED", "DELIVERED", "EXCEPTION", "TERMINATED", "FAILED", "LOST", "DAMAGED", "RETURNED", "CANCELLED", "AWAITING_ACTION", "ARCHIVED", "ON_HOLD"]>;
    shippingCost: z.ZodNumber;
    estimatedDelivery: z.ZodNullable<z.ZodString>;
    bostaState: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    bostaStateLabel: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    bostaType: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    bostaStatusUpdatedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    deliveryPromiseDate: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    exceptionCode: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    exceptionReason: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    numberOfAttempts: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    isConfirmedDelivery: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    status: "IN_TRANSIT" | "OUT_FOR_DELIVERY" | "DELIVERED" | "RETURNED" | "CANCELLED" | "FAILED" | "CREATED" | "PENDING_PICKUP" | "PICKED_UP" | "AT_WAREHOUSE" | "FULFILLED" | "EXCEPTION" | "TERMINATED" | "LOST" | "DAMAGED" | "AWAITING_ACTION" | "ARCHIVED" | "ON_HOLD";
    id: string;
    createdAt: string;
    updatedAt: string;
    shippingCost: number;
    estimatedDelivery: string | null;
    provider: "MOCK" | "BOSTA";
    orderId: string;
    trackingNumber: string;
    trackingUrl: string;
    shipmentId: string;
    bostaState?: number | null | undefined;
    bostaStateLabel?: string | null | undefined;
    bostaType?: string | null | undefined;
    bostaStatusUpdatedAt?: string | null | undefined;
    deliveryPromiseDate?: string | null | undefined;
    exceptionCode?: number | null | undefined;
    exceptionReason?: string | null | undefined;
    numberOfAttempts?: number | null | undefined;
    isConfirmedDelivery?: boolean | null | undefined;
}, {
    status: "IN_TRANSIT" | "OUT_FOR_DELIVERY" | "DELIVERED" | "RETURNED" | "CANCELLED" | "FAILED" | "CREATED" | "PENDING_PICKUP" | "PICKED_UP" | "AT_WAREHOUSE" | "FULFILLED" | "EXCEPTION" | "TERMINATED" | "LOST" | "DAMAGED" | "AWAITING_ACTION" | "ARCHIVED" | "ON_HOLD";
    id: string;
    createdAt: string;
    updatedAt: string;
    shippingCost: number;
    estimatedDelivery: string | null;
    provider: "MOCK" | "BOSTA";
    orderId: string;
    trackingNumber: string;
    trackingUrl: string;
    shipmentId: string;
    bostaState?: number | null | undefined;
    bostaStateLabel?: string | null | undefined;
    bostaType?: string | null | undefined;
    bostaStatusUpdatedAt?: string | null | undefined;
    deliveryPromiseDate?: string | null | undefined;
    exceptionCode?: number | null | undefined;
    exceptionReason?: string | null | undefined;
    numberOfAttempts?: number | null | undefined;
    isConfirmedDelivery?: boolean | null | undefined;
}>;
export type ShipmentResponse = z.infer<typeof shipmentResponseSchema>;
//# sourceMappingURL=shipping.schema.d.ts.map