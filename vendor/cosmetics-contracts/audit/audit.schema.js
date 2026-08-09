"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auditLogListSchema = exports.auditLogQuerySchema = exports.auditLogSchema = exports.auditActorSchema = void 0;
const zod_1 = require("zod");
const pagination_1 = require("../common/pagination");
const primitives_1 = require("../common/primitives");
const dateFilterSchema = zod_1.z
    .string()
    .trim()
    .min(1)
    .refine((value) => !Number.isNaN(Date.parse(value)), {
    message: "Date filter must be a valid date or ISO datetime.",
});
exports.auditActorSchema = zod_1.z
    .object({
    id: primitives_1.uuidSchema,
    firstName: zod_1.z.string(),
    lastName: zod_1.z.string(),
    email: zod_1.z.string().nullable(),
    phone: zod_1.z.string(),
    role: zod_1.z.string(),
})
    .nullable();
exports.auditLogSchema = zod_1.z.object({
    id: primitives_1.uuidSchema,
    actorId: primitives_1.uuidSchema.nullable(),
    actor: exports.auditActorSchema,
    action: zod_1.z.string(),
    resourceType: zod_1.z.string(),
    resourceId: primitives_1.uuidSchema.nullable(),
    before: zod_1.z.unknown().nullable(),
    after: zod_1.z.unknown().nullable(),
    ip: zod_1.z.string().nullable(),
    userAgent: zod_1.z.string().nullable(),
    createdAt: zod_1.z.string(),
});
exports.auditLogQuerySchema = zod_1.z
    .object({
    page: zod_1.z.coerce.number().int().positive().default(1),
    limit: zod_1.z.coerce.number().int().positive().max(100).default(25),
    search: zod_1.z.string().trim().min(1).max(120).optional(),
    action: zod_1.z.string().trim().min(1).max(64).optional(),
    resourceType: zod_1.z.string().trim().min(1).max(64).optional(),
    actorId: primitives_1.uuidSchema.optional(),
    resourceId: primitives_1.uuidSchema.optional(),
    dateFrom: dateFilterSchema.optional(),
    dateTo: dateFilterSchema.optional(),
    sortOrder: zod_1.z.enum(["asc", "desc"]).default("desc"),
})
    .strict();
exports.auditLogListSchema = zod_1.z.object({
    data: zod_1.z.array(exports.auditLogSchema),
    meta: pagination_1.paginationMetaSchema,
});
//# sourceMappingURL=audit.schema.js.map