"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginated = exports.paginationMetaSchema = exports.paginationQuerySchema = void 0;
const zod_1 = require("zod");
exports.paginationQuerySchema = zod_1.z.object({
    page: zod_1.z.coerce.number().int().positive().default(1),
    limit: zod_1.z.coerce.number().int().positive().max(100).default(20),
    sortBy: zod_1.z.string().trim().optional(),
    sortOrder: zod_1.z.enum(['asc', 'desc']).default('desc'),
});
exports.paginationMetaSchema = zod_1.z.object({
    page: zod_1.z.number().int(),
    limit: zod_1.z.number().int(),
    total: zod_1.z.number().int(),
    totalPages: zod_1.z.number().int(),
    hasNext: zod_1.z.boolean(),
    hasPrev: zod_1.z.boolean(),
});
const paginated = (item) => zod_1.z.object({ data: zod_1.z.array(item), meta: exports.paginationMetaSchema });
exports.paginated = paginated;
//# sourceMappingURL=pagination.js.map