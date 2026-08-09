import { z } from "zod";
export declare const storeStatusSchema: z.ZodEnum<["OPEN", "CLOSED", "BUSY"]>;
export declare const publicStoreSettingsSchema: z.ZodObject<{
    status: z.ZodEnum<["OPEN", "CLOSED", "BUSY"]>;
    statusMessageEn: z.ZodNullable<z.ZodString>;
    statusMessageAr: z.ZodNullable<z.ZodString>;
    paymentWindowHours: z.ZodNumber;
    codEnabled: z.ZodBoolean;
    codFee: z.ZodNumber;
    freeShippingThreshold: z.ZodNullable<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    status: "OPEN" | "CLOSED" | "BUSY";
    freeShippingThreshold: number | null;
    statusMessageEn: string | null;
    statusMessageAr: string | null;
    paymentWindowHours: number;
    codEnabled: boolean;
    codFee: number;
}, {
    status: "OPEN" | "CLOSED" | "BUSY";
    freeShippingThreshold: number | null;
    statusMessageEn: string | null;
    statusMessageAr: string | null;
    paymentWindowHours: number;
    codEnabled: boolean;
    codFee: number;
}>;
export type PublicStoreSettingsResponse = z.infer<typeof publicStoreSettingsSchema>;
export declare const adminStoreSettingsSchema: z.ZodObject<{
    status: z.ZodEnum<["OPEN", "CLOSED", "BUSY"]>;
    statusMessageEn: z.ZodNullable<z.ZodString>;
    statusMessageAr: z.ZodNullable<z.ZodString>;
    paymentWindowHours: z.ZodNumber;
    codEnabled: z.ZodBoolean;
    codFee: z.ZodNumber;
    freeShippingThreshold: z.ZodNullable<z.ZodNumber>;
} & {
    vodafoneCashNumber: z.ZodNullable<z.ZodString>;
    instapayAddress: z.ZodNullable<z.ZodString>;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    status: "OPEN" | "CLOSED" | "BUSY";
    updatedAt: string;
    vodafoneCashNumber: string | null;
    instapayAddress: string | null;
    freeShippingThreshold: number | null;
    statusMessageEn: string | null;
    statusMessageAr: string | null;
    paymentWindowHours: number;
    codEnabled: boolean;
    codFee: number;
}, {
    status: "OPEN" | "CLOSED" | "BUSY";
    updatedAt: string;
    vodafoneCashNumber: string | null;
    instapayAddress: string | null;
    freeShippingThreshold: number | null;
    statusMessageEn: string | null;
    statusMessageAr: string | null;
    paymentWindowHours: number;
    codEnabled: boolean;
    codFee: number;
}>;
export type AdminStoreSettingsResponse = z.infer<typeof adminStoreSettingsSchema>;
export declare const updateStoreSettingsSchema: z.ZodEffects<z.ZodObject<{
    status: z.ZodOptional<z.ZodEnum<["OPEN", "CLOSED", "BUSY"]>>;
    statusMessageEn: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    statusMessageAr: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    vodafoneCashNumber: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    instapayAddress: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    paymentWindowHours: z.ZodOptional<z.ZodNumber>;
    codEnabled: z.ZodOptional<z.ZodBoolean>;
    codFee: z.ZodOptional<z.ZodNumber>;
    freeShippingThreshold: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    status?: "OPEN" | "CLOSED" | "BUSY" | undefined;
    vodafoneCashNumber?: string | null | undefined;
    instapayAddress?: string | null | undefined;
    freeShippingThreshold?: number | null | undefined;
    statusMessageEn?: string | null | undefined;
    statusMessageAr?: string | null | undefined;
    paymentWindowHours?: number | undefined;
    codEnabled?: boolean | undefined;
    codFee?: number | undefined;
}, {
    status?: "OPEN" | "CLOSED" | "BUSY" | undefined;
    vodafoneCashNumber?: string | null | undefined;
    instapayAddress?: string | null | undefined;
    freeShippingThreshold?: number | null | undefined;
    statusMessageEn?: string | null | undefined;
    statusMessageAr?: string | null | undefined;
    paymentWindowHours?: number | undefined;
    codEnabled?: boolean | undefined;
    codFee?: number | undefined;
}>, {
    status?: "OPEN" | "CLOSED" | "BUSY" | undefined;
    vodafoneCashNumber?: string | null | undefined;
    instapayAddress?: string | null | undefined;
    freeShippingThreshold?: number | null | undefined;
    statusMessageEn?: string | null | undefined;
    statusMessageAr?: string | null | undefined;
    paymentWindowHours?: number | undefined;
    codEnabled?: boolean | undefined;
    codFee?: number | undefined;
}, {
    status?: "OPEN" | "CLOSED" | "BUSY" | undefined;
    vodafoneCashNumber?: string | null | undefined;
    instapayAddress?: string | null | undefined;
    freeShippingThreshold?: number | null | undefined;
    statusMessageEn?: string | null | undefined;
    statusMessageAr?: string | null | undefined;
    paymentWindowHours?: number | undefined;
    codEnabled?: boolean | undefined;
    codFee?: number | undefined;
}>;
export type UpdateStoreSettingsInput = z.infer<typeof updateStoreSettingsSchema>;
export declare const shippingZoneSchema: z.ZodObject<{
    id: z.ZodString;
    governorate: z.ZodString;
    fee: z.ZodNumber;
    estimatedDays: z.ZodNumber;
    isActive: z.ZodBoolean;
    createdAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    createdAt: string;
    governorate: string;
    estimatedDays: number;
    isActive: boolean;
    fee: number;
}, {
    id: string;
    createdAt: string;
    governorate: string;
    estimatedDays: number;
    isActive: boolean;
    fee: number;
}>;
export type ShippingZoneResponse = z.infer<typeof shippingZoneSchema>;
export declare const createShippingZoneSchema: z.ZodObject<{
    governorate: z.ZodString;
    fee: z.ZodNumber;
    estimatedDays: z.ZodDefault<z.ZodNumber>;
    isActive: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    governorate: string;
    estimatedDays: number;
    isActive: boolean;
    fee: number;
}, {
    governorate: string;
    fee: number;
    estimatedDays?: number | undefined;
    isActive?: boolean | undefined;
}>;
export type CreateShippingZoneInput = z.infer<typeof createShippingZoneSchema>;
export declare const updateShippingZoneSchema: z.ZodEffects<z.ZodObject<{
    governorate: z.ZodOptional<z.ZodString>;
    fee: z.ZodOptional<z.ZodNumber>;
    estimatedDays: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    isActive: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
}, "strip", z.ZodTypeAny, {
    governorate?: string | undefined;
    estimatedDays?: number | undefined;
    isActive?: boolean | undefined;
    fee?: number | undefined;
}, {
    governorate?: string | undefined;
    estimatedDays?: number | undefined;
    isActive?: boolean | undefined;
    fee?: number | undefined;
}>, {
    governorate?: string | undefined;
    estimatedDays?: number | undefined;
    isActive?: boolean | undefined;
    fee?: number | undefined;
}, {
    governorate?: string | undefined;
    estimatedDays?: number | undefined;
    isActive?: boolean | undefined;
    fee?: number | undefined;
}>;
export type UpdateShippingZoneInput = z.infer<typeof updateShippingZoneSchema>;
export declare const newsletterSubscriptionSchema: z.ZodObject<{
    email: z.ZodString;
    locale: z.ZodDefault<z.ZodEnum<["en", "ar"]>>;
    consent: z.ZodLiteral<true>;
}, "strip", z.ZodTypeAny, {
    email: string;
    locale: "en" | "ar";
    consent: true;
}, {
    email: string;
    consent: true;
    locale?: "en" | "ar" | undefined;
}>;
export type NewsletterSubscriptionInput = z.infer<typeof newsletterSubscriptionSchema>;
export declare const supportRequestSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    orderNumber: z.ZodOptional<z.ZodString>;
    subject: z.ZodString;
    message: z.ZodString;
    locale: z.ZodDefault<z.ZodEnum<["en", "ar"]>>;
}, "strip", z.ZodTypeAny, {
    message: string;
    email: string;
    name: string;
    locale: "en" | "ar";
    subject: string;
    orderNumber?: string | undefined;
}, {
    message: string;
    email: string;
    name: string;
    subject: string;
    orderNumber?: string | undefined;
    locale?: "en" | "ar" | undefined;
}>;
export type SupportRequestInput = z.infer<typeof supportRequestSchema>;
export declare const supportRequestStatusSchema: z.ZodEnum<["OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"]>;
export declare const updateSupportRequestSchema: z.ZodObject<{
    status: z.ZodEnum<["OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"]>;
}, "strip", z.ZodTypeAny, {
    status: "OPEN" | "CLOSED" | "IN_PROGRESS" | "RESOLVED";
}, {
    status: "OPEN" | "CLOSED" | "IN_PROGRESS" | "RESOLVED";
}>;
export type UpdateSupportRequestInput = z.infer<typeof updateSupportRequestSchema>;
//# sourceMappingURL=store.schema.d.ts.map