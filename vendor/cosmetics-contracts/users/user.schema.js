"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAdminUserSchema = exports.adminCustomerOrdersQuerySchema = exports.adminUsersQuerySchema = exports.adminUserDetailSchema = exports.adminCustomerSummarySchema = exports.adminCustomerStatisticsSchema = exports.adminCustomerListItemSchema = exports.adminCustomerOrderSchema = exports.userProfileSchema = exports.updateAddressSchema = exports.createAddressSchema = exports.addressSchema = exports.updateMyProfileSchema = void 0;
const zod_1 = require("zod");
const primitives_1 = require("../common/primitives");
const enums_1 = require("../enums");
const isoDateSchema = zod_1.z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format")
    .refine((value) => {
    const date = new Date(`${value}T00:00:00.000Z`);
    return !Number.isNaN(date.getTime()) && date <= new Date();
}, "Date of birth cannot be in the future");
exports.updateMyProfileSchema = zod_1.z
    .object({
    firstName: zod_1.z.string().trim().min(2).max(100).optional(),
    lastName: zod_1.z.string().trim().min(2).max(100).optional(),
    phone: primitives_1.egyptPhoneSchema.optional(),
    profileImage: zod_1.z.string().trim().url().max(2048).nullable().optional(),
    gender: enums_1.GenderEnum.nullable().optional(),
    dateOfBirth: isoDateSchema.nullable().optional(),
})
    .strict();
exports.addressSchema = zod_1.z.object({
    id: primitives_1.uuidSchema,
    label: enums_1.AddressLabelEnum.nullable(),
    receiverName: zod_1.z.string(),
    phone: zod_1.z.string(),
    country: zod_1.z.string(),
    governorate: zod_1.z.string(),
    city: zod_1.z.string(),
    area: zod_1.z.string(),
    street: zod_1.z.string(),
    building: zod_1.z.string(),
    floor: zod_1.z.string().nullable(),
    apartment: zod_1.z.string().nullable(),
    postalCode: zod_1.z.string().nullable(),
    bostaGovernorateId: zod_1.z.string().nullable(),
    bostaCityId: zod_1.z.string().nullable(),
    bostaZoneId: zod_1.z.string().nullable(),
    deliveryInstructions: zod_1.z.string().nullable(),
    landmark: zod_1.z.string().nullable(),
    isDefault: zod_1.z.boolean(),
    createdAt: zod_1.z.string(),
    updatedAt: zod_1.z.string(),
});
const addressWriteSchema = zod_1.z
    .object({
    label: enums_1.AddressLabelEnum.default("HOME"),
    receiverName: zod_1.z.string().trim().min(2).max(150),
    phone: primitives_1.egyptPhoneSchema,
    country: zod_1.z.string().trim().min(2).max(80).default("EG"),
    governorate: zod_1.z.string().trim().min(2).max(64),
    city: zod_1.z.string().trim().min(2).max(100),
    area: zod_1.z.string().trim().min(2).max(100),
    street: zod_1.z.string().trim().min(3).max(500),
    building: zod_1.z.string().trim().min(1).max(50),
    floor: optionalNullableText(1, 50),
    apartment: optionalNullableText(1, 50),
    postalCode: optionalNullableText(3, 20),
    /**
     * Carrier location ids, taken from GET /shipping/cities and
     * /shipping/zones/:cityId. Optional here so the address book still works
     * under the MOCK provider; checkout rejects an address without a city id
     * once a real carrier is active.
     */
    bostaGovernorateId: optionalNullableText(1, 64),
    bostaCityId: optionalNullableText(1, 64),
    bostaZoneId: optionalNullableText(1, 64),
    deliveryInstructions: optionalNullableText(1, 1000),
    landmark: optionalNullableText(1, 500),
    isDefault: zod_1.z.boolean().default(false),
})
    .strict();
function optionalNullableText(min, max) {
    return zod_1.z
        .union([
        zod_1.z.string().trim().min(min).max(max),
        zod_1.z.literal("").transform(() => null),
        zod_1.z.null(),
    ])
        .optional();
}
exports.createAddressSchema = addressWriteSchema;
exports.updateAddressSchema = addressWriteSchema.partial().strict();
exports.userProfileSchema = zod_1.z.object({
    id: primitives_1.uuidSchema,
    firstName: zod_1.z.string(),
    lastName: zod_1.z.string(),
    phone: zod_1.z.string(),
    email: zod_1.z.string().nullable(),
    role: enums_1.RoleEnum,
    status: enums_1.UserStatusEnum,
    isVip: zod_1.z.boolean(),
    profileImage: zod_1.z.string().nullable(),
    gender: enums_1.GenderEnum.nullable(),
    dateOfBirth: zod_1.z.string().nullable(),
    phoneVerified: zod_1.z.boolean(),
    emailVerified: zod_1.z.boolean(),
    createdAt: zod_1.z.string(),
    updatedAt: zod_1.z.string(),
    deletedAt: zod_1.z.string().nullable(),
});
exports.adminCustomerOrderSchema = zod_1.z.object({
    id: primitives_1.uuidSchema,
    orderNumber: zod_1.z.string(),
    status: zod_1.z.string(),
    paymentStatus: zod_1.z.string(),
    paymentMethod: zod_1.z.string(),
    grandTotal: zod_1.z.number(),
    currency: zod_1.z.string(),
    placedAt: zod_1.z.string(),
    updatedAt: zod_1.z.string(),
});
exports.adminCustomerListItemSchema = exports.userProfileSchema.extend({
    ordersCount: zod_1.z.number(),
    totalSpent: zod_1.z.number(),
    lastOrderAt: zod_1.z.string().nullable(),
});
exports.adminCustomerStatisticsSchema = zod_1.z.object({
    totalCustomers: zod_1.z.number(),
    activeCustomers: zod_1.z.number(),
    blockedCustomers: zod_1.z.number(),
    vipCustomers: zod_1.z.number(),
    newThisMonth: zod_1.z.number(),
    ordersCount: zod_1.z.number(),
    totalRevenue: zod_1.z.number(),
    averageOrderValue: zod_1.z.number(),
});
exports.adminCustomerSummarySchema = zod_1.z.object({
    ordersCount: zod_1.z.number(),
    totalSpent: zod_1.z.number(),
    averageOrderValue: zod_1.z.number(),
    lastOrderAt: zod_1.z.string().nullable(),
    addressesCount: zod_1.z.number(),
    cartItemsCount: zod_1.z.number(),
    cartQuantity: zod_1.z.number(),
    wishlistCount: zod_1.z.number(),
    lastLoginAt: zod_1.z.string().nullable(),
});
exports.adminUserDetailSchema = exports.userProfileSchema.extend({
    addresses: zod_1.z.array(exports.addressSchema),
    recentOrders: zod_1.z.array(exports.adminCustomerOrderSchema),
    summary: exports.adminCustomerSummarySchema,
});
exports.adminUsersQuerySchema = zod_1.z.object({
    page: zod_1.z.coerce.number().int().positive().default(1),
    limit: zod_1.z.coerce.number().int().positive().max(100).default(20),
    search: zod_1.z.string().trim().min(1).max(120).optional(),
    status: enums_1.UserStatusEnum.optional(),
    gender: enums_1.GenderEnum.optional(),
    emailVerified: zod_1.z
        .enum(["true", "false"])
        .transform((value) => value === "true")
        .optional(),
    isVip: zod_1.z
        .enum(["true", "false"])
        .transform((value) => value === "true")
        .optional(),
    createdFrom: isoDateSchema.optional(),
    createdTo: isoDateSchema.optional(),
    totalOrdersMin: zod_1.z.coerce.number().int().min(0).optional(),
    totalOrdersMax: zod_1.z.coerce.number().int().min(0).optional(),
    totalSpentMin: zod_1.z.coerce.number().int().min(0).optional(),
    totalSpentMax: zod_1.z.coerce.number().int().min(0).optional(),
    sortBy: zod_1.z
        .enum([
        "createdAt",
        "updatedAt",
        "firstName",
        "newest",
        "oldest",
        "name",
        "orders",
        "spending",
    ])
        .default("newest"),
    sortOrder: zod_1.z.enum(["asc", "desc"]).default("desc"),
});
exports.adminCustomerOrdersQuerySchema = zod_1.z.object({
    page: zod_1.z.coerce.number().int().positive().default(1),
    limit: zod_1.z.coerce.number().int().positive().max(100).default(10),
});
exports.updateAdminUserSchema = zod_1.z
    .object({
    firstName: zod_1.z.string().trim().min(2).max(100).optional(),
    lastName: zod_1.z.string().trim().min(2).max(100).optional(),
    phone: primitives_1.egyptPhoneSchema.optional(),
    status: enums_1.UserStatusEnum.exclude(["DELETED"]).optional(),
    emailVerified: zod_1.z.boolean().optional(),
    gender: enums_1.GenderEnum.nullable().optional(),
    dateOfBirth: isoDateSchema.nullable().optional(),
    isVip: zod_1.z.boolean().optional(),
})
    .strict();
//# sourceMappingURL=user.schema.js.map