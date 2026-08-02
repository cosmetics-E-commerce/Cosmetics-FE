"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateManagedAdminSchema = exports.adminAccountsQuerySchema = exports.adminAccountSchema = exports.managedAdminRoleSchema = void 0;
const zod_1 = require("zod");
const primitives_1 = require("../common/primitives");
const enums_1 = require("../enums");
exports.managedAdminRoleSchema = zod_1.z.enum(['SUPER_ADMIN', 'ADMIN']);
exports.adminAccountSchema = zod_1.z.object({
    id: primitives_1.uuidSchema,
    firstName: zod_1.z.string(),
    lastName: zod_1.z.string(),
    phone: zod_1.z.string(),
    email: zod_1.z.string().nullable(),
    role: exports.managedAdminRoleSchema,
    status: enums_1.UserStatusEnum,
    permissions: zod_1.z.array(zod_1.z.string()),
    createdAt: zod_1.z.string(),
    updatedAt: zod_1.z.string(),
    deletedAt: zod_1.z.string().nullable(),
});
exports.adminAccountsQuerySchema = zod_1.z.object({
    page: zod_1.z.coerce.number().int().positive().default(1),
    limit: zod_1.z.coerce.number().int().positive().max(100).default(20),
    search: zod_1.z.string().trim().min(1).max(120).optional(),
    role: exports.managedAdminRoleSchema.optional(),
    status: enums_1.UserStatusEnum.optional(),
    sortBy: zod_1.z.enum(['createdAt', 'updatedAt', 'firstName']).default('createdAt'),
    sortOrder: zod_1.z.enum(['asc', 'desc']).default('desc'),
});
exports.updateManagedAdminSchema = zod_1.z.object({
    firstName: zod_1.z.string().trim().min(2).max(100).optional(),
    lastName: zod_1.z.string().trim().min(2).max(100).optional(),
    phone: primitives_1.egyptPhoneSchema.optional(),
    email: primitives_1.emailSchema.optional(),
}).strict().refine((input) => Object.keys(input).length > 0, {
    message: 'At least one field must be provided.',
});
//# sourceMappingURL=admin.schema.js.map