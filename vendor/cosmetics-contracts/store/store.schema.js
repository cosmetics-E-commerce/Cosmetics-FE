"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSupportRequestSchema = exports.supportRequestStatusSchema = exports.supportRequestSchema = exports.newsletterSubscriptionSchema = exports.updateShippingZoneSchema = exports.createShippingZoneSchema = exports.shippingZoneSchema = exports.updateStoreSettingsSchema = exports.adminStoreSettingsSchema = exports.publicStoreSettingsSchema = exports.brandMarqueeSpeedSchema = exports.storeStatusSchema = void 0;
const zod_1 = require("zod");
const primitives_1 = require("../common/primitives");
exports.storeStatusSchema = zod_1.z.enum(["OPEN", "CLOSED", "BUSY"]);
exports.brandMarqueeSpeedSchema = zod_1.z.enum([
    "SLOW",
    "NORMAL",
    "FAST",
    "VERY_FAST",
]);
exports.publicStoreSettingsSchema = zod_1.z.object({
    status: exports.storeStatusSchema,
    statusMessageEn: zod_1.z.string().nullable(),
    statusMessageAr: zod_1.z.string().nullable(),
    paymentWindowHours: zod_1.z.number().int().positive(),
    codEnabled: zod_1.z.boolean(),
    codFee: primitives_1.piastresSchema,
    freeShippingThreshold: primitives_1.piastresSchema.nullable(),
    brandMarqueeSpeed: exports.brandMarqueeSpeedSchema,
});
exports.adminStoreSettingsSchema = exports.publicStoreSettingsSchema.extend({
    vodafoneCashNumber: zod_1.z.string().nullable(),
    instapayAddress: zod_1.z.string().nullable(),
    updatedAt: zod_1.z.string().datetime(),
});
exports.updateStoreSettingsSchema = zod_1.z
    .object({
    status: exports.storeStatusSchema.optional(),
    statusMessageEn: zod_1.z.string().trim().max(500).nullable().optional(),
    statusMessageAr: zod_1.z.string().trim().max(500).nullable().optional(),
    vodafoneCashNumber: zod_1.z.string().trim().max(20).nullable().optional(),
    instapayAddress: zod_1.z.string().trim().max(120).nullable().optional(),
    paymentWindowHours: zod_1.z.number().int().min(1).max(168).optional(),
    codEnabled: zod_1.z.boolean().optional(),
    codFee: primitives_1.piastresSchema.optional(),
    freeShippingThreshold: primitives_1.piastresSchema.nullable().optional(),
    brandMarqueeSpeed: exports.brandMarqueeSpeedSchema.optional(),
})
    .refine((value) => Object.keys(value).length > 0, "At least one setting is required");
exports.shippingZoneSchema = zod_1.z.object({
    id: primitives_1.uuidSchema,
    governorate: zod_1.z.string(),
    fee: primitives_1.piastresSchema,
    estimatedDays: zod_1.z.number().int().positive(),
    isActive: zod_1.z.boolean(),
    createdAt: zod_1.z.string().datetime(),
});
exports.createShippingZoneSchema = zod_1.z.object({
    governorate: zod_1.z.string().trim().min(2).max(64),
    fee: primitives_1.piastresSchema,
    estimatedDays: zod_1.z.number().int().min(1).max(30).default(3),
    isActive: zod_1.z.boolean().default(true),
});
exports.updateShippingZoneSchema = exports.createShippingZoneSchema
    .partial()
    .refine((value) => Object.keys(value).length > 0, "At least one field is required");
exports.newsletterSubscriptionSchema = zod_1.z.object({
    email: zod_1.z.string().trim().email().max(320),
    locale: zod_1.z.enum(["en", "ar"]).default("en"),
    consent: zod_1.z.literal(true),
});
exports.supportRequestSchema = zod_1.z.object({
    name: zod_1.z.string().trim().min(2).max(140),
    email: zod_1.z.string().trim().email().max(320),
    orderNumber: zod_1.z.string().trim().max(32).optional(),
    subject: zod_1.z.string().trim().min(3).max(200),
    message: zod_1.z.string().trim().min(20).max(5000),
    locale: zod_1.z.enum(["en", "ar"]).default("en"),
});
exports.supportRequestStatusSchema = zod_1.z.enum([
    "OPEN",
    "IN_PROGRESS",
    "RESOLVED",
    "CLOSED",
]);
exports.updateSupportRequestSchema = zod_1.z.object({
    status: exports.supportRequestStatusSchema,
});
//# sourceMappingURL=store.schema.js.map