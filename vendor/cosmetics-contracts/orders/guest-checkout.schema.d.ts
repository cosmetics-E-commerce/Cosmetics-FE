import { z } from "zod";
export declare const guestContactSchema: z.ZodObject<{
    firstName: z.ZodString;
    lastName: z.ZodString;
    phone: z.ZodEffects<z.ZodString, string, string>;
    email: z.ZodString;
}, "strict", z.ZodTypeAny, {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
}, {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
}>;
export type GuestContactInput = z.infer<typeof guestContactSchema>;
/** Contact details plus the delivery address; opens a short checkout session. */
export declare const guestCheckoutStartSchema: z.ZodObject<{
    contact: z.ZodObject<{
        firstName: z.ZodString;
        lastName: z.ZodString;
        phone: z.ZodEffects<z.ZodString, string, string>;
        email: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        firstName: string;
        lastName: string;
        phone: string;
        email: string;
    }, {
        firstName: string;
        lastName: string;
        phone: string;
        email: string;
    }>;
    address: z.ZodObject<{
        label: z.ZodDefault<z.ZodEnum<["HOME", "WORK", "OTHER"]>>;
        receiverName: z.ZodString;
        phone: z.ZodEffects<z.ZodString, string, string>;
        country: z.ZodDefault<z.ZodString>;
        governorate: z.ZodString;
        city: z.ZodString;
        area: z.ZodString;
        street: z.ZodString;
        building: z.ZodString;
        floor: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodEffects<z.ZodLiteral<"">, null, "">, z.ZodNull]>>;
        apartment: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodEffects<z.ZodLiteral<"">, null, "">, z.ZodNull]>>;
        postalCode: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodEffects<z.ZodLiteral<"">, null, "">, z.ZodNull]>>;
        bostaGovernorateId: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodEffects<z.ZodLiteral<"">, null, "">, z.ZodNull]>>;
        bostaCityId: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodEffects<z.ZodLiteral<"">, null, "">, z.ZodNull]>>;
        bostaZoneId: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodEffects<z.ZodLiteral<"">, null, "">, z.ZodNull]>>;
        deliveryInstructions: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodEffects<z.ZodLiteral<"">, null, "">, z.ZodNull]>>;
        landmark: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodEffects<z.ZodLiteral<"">, null, "">, z.ZodNull]>>;
        isDefault: z.ZodDefault<z.ZodBoolean>;
    }, "strict", z.ZodTypeAny, {
        phone: string;
        label: "OTHER" | "HOME" | "WORK";
        receiverName: string;
        country: string;
        governorate: string;
        city: string;
        area: string;
        street: string;
        building: string;
        isDefault: boolean;
        floor?: string | null | undefined;
        apartment?: string | null | undefined;
        postalCode?: string | null | undefined;
        bostaGovernorateId?: string | null | undefined;
        bostaCityId?: string | null | undefined;
        bostaZoneId?: string | null | undefined;
        deliveryInstructions?: string | null | undefined;
        landmark?: string | null | undefined;
    }, {
        phone: string;
        receiverName: string;
        governorate: string;
        city: string;
        area: string;
        street: string;
        building: string;
        label?: "OTHER" | "HOME" | "WORK" | undefined;
        country?: string | undefined;
        floor?: string | null | undefined;
        apartment?: string | null | undefined;
        postalCode?: string | null | undefined;
        bostaGovernorateId?: string | null | undefined;
        bostaCityId?: string | null | undefined;
        bostaZoneId?: string | null | undefined;
        deliveryInstructions?: string | null | undefined;
        landmark?: string | null | undefined;
        isDefault?: boolean | undefined;
    }>;
}, "strict", z.ZodTypeAny, {
    contact: {
        firstName: string;
        lastName: string;
        phone: string;
        email: string;
    };
    address: {
        phone: string;
        label: "OTHER" | "HOME" | "WORK";
        receiverName: string;
        country: string;
        governorate: string;
        city: string;
        area: string;
        street: string;
        building: string;
        isDefault: boolean;
        floor?: string | null | undefined;
        apartment?: string | null | undefined;
        postalCode?: string | null | undefined;
        bostaGovernorateId?: string | null | undefined;
        bostaCityId?: string | null | undefined;
        bostaZoneId?: string | null | undefined;
        deliveryInstructions?: string | null | undefined;
        landmark?: string | null | undefined;
    };
}, {
    contact: {
        firstName: string;
        lastName: string;
        phone: string;
        email: string;
    };
    address: {
        phone: string;
        receiverName: string;
        governorate: string;
        city: string;
        area: string;
        street: string;
        building: string;
        label?: "OTHER" | "HOME" | "WORK" | undefined;
        country?: string | undefined;
        floor?: string | null | undefined;
        apartment?: string | null | undefined;
        postalCode?: string | null | undefined;
        bostaGovernorateId?: string | null | undefined;
        bostaCityId?: string | null | undefined;
        bostaZoneId?: string | null | undefined;
        deliveryInstructions?: string | null | undefined;
        landmark?: string | null | undefined;
        isDefault?: boolean | undefined;
    };
}>;
export type GuestCheckoutStartInput = z.infer<typeof guestCheckoutStartSchema>;
export declare const guestCheckoutPreviewSchema: z.ZodObject<Pick<Omit<{
    items: z.ZodArray<z.ZodObject<{
        variantId: z.ZodString;
        quantity: z.ZodNumber;
    }, "strict", z.ZodTypeAny, {
        quantity: number;
        variantId: string;
    }, {
        quantity: number;
        variantId: string;
    }>, "many">;
    shippingAddressId: z.ZodString;
    paymentMethod: z.ZodEnum<["VODAFONE_CASH", "INSTAPAY", "CASH_ON_DELIVERY", "COD", "CARD"]>;
    couponCode: z.ZodOptional<z.ZodEffects<z.ZodPipeline<z.ZodEffects<z.ZodString, string, string>, z.ZodEffects<z.ZodString, string, string>>, string, string>>;
    giftVariantIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    notes: z.ZodOptional<z.ZodString>;
}, "items">, "paymentMethod">, "strict", z.ZodTypeAny, {
    paymentMethod: "VODAFONE_CASH" | "INSTAPAY" | "CASH_ON_DELIVERY" | "COD" | "CARD";
}, {
    paymentMethod: "VODAFONE_CASH" | "INSTAPAY" | "CASH_ON_DELIVERY" | "COD" | "CARD";
}>;
export type GuestCheckoutPreviewInput = z.infer<typeof guestCheckoutPreviewSchema>;
export declare const guestCheckoutPlaceSchema: z.ZodObject<Omit<Omit<{
    items: z.ZodArray<z.ZodObject<{
        variantId: z.ZodString;
        quantity: z.ZodNumber;
    }, "strict", z.ZodTypeAny, {
        quantity: number;
        variantId: string;
    }, {
        quantity: number;
        variantId: string;
    }>, "many">;
    shippingAddressId: z.ZodString;
    paymentMethod: z.ZodEnum<["VODAFONE_CASH", "INSTAPAY", "CASH_ON_DELIVERY", "COD", "CARD"]>;
    couponCode: z.ZodOptional<z.ZodEffects<z.ZodPipeline<z.ZodEffects<z.ZodString, string, string>, z.ZodEffects<z.ZodString, string, string>>, string, string>>;
    giftVariantIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    notes: z.ZodOptional<z.ZodString>;
}, "items">, "couponCode" | "shippingAddressId">, "strict", z.ZodTypeAny, {
    paymentMethod: "VODAFONE_CASH" | "INSTAPAY" | "CASH_ON_DELIVERY" | "COD" | "CARD";
    giftVariantIds?: string[] | undefined;
    notes?: string | undefined;
}, {
    paymentMethod: "VODAFONE_CASH" | "INSTAPAY" | "CASH_ON_DELIVERY" | "COD" | "CARD";
    giftVariantIds?: string[] | undefined;
    notes?: string | undefined;
}>;
export type GuestCheckoutPlaceInput = z.infer<typeof guestCheckoutPlaceSchema>;
export declare const guestOrderLookupSchema: z.ZodObject<{
    orderNumber: z.ZodString;
    phone: z.ZodEffects<z.ZodString, string, string>;
}, "strict", z.ZodTypeAny, {
    phone: string;
    orderNumber: string;
}, {
    phone: string;
    orderNumber: string;
}>;
export type GuestOrderLookupInput = z.infer<typeof guestOrderLookupSchema>;
//# sourceMappingURL=guest-checkout.schema.d.ts.map