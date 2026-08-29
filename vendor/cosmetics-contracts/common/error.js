"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiErrorResponseSchema = exports.apiErrorProblemSchema = exports.apiFieldErrorsSchema = void 0;
const zod_1 = require("zod");
exports.apiFieldErrorsSchema = zod_1.z.record(zod_1.z.string(), zod_1.z.array(zod_1.z.string()).min(1));
exports.apiErrorProblemSchema = zod_1.z.object({
    code: zod_1.z.string().trim().min(1),
    message: zod_1.z.string().trim().min(1),
    details: zod_1.z.unknown().optional(),
    fieldErrors: exports.apiFieldErrorsSchema.default({}),
    retryable: zod_1.z.boolean(),
    requestId: zod_1.z.string().trim().min(1),
});
/**
 * Canonical public failure response. The duplicated top-level fields preserve
 * compatibility with older BioReza clients while they migrate to `error`.
 */
exports.apiErrorResponseSchema = zod_1.z.object({
    success: zod_1.z.literal(false),
    error: exports.apiErrorProblemSchema,
    statusCode: zod_1.z.number().int().min(400).max(599),
    code: zod_1.z.string().trim().min(1),
    message: zod_1.z.string().trim().min(1),
    details: zod_1.z.unknown().optional(),
    fieldErrors: exports.apiFieldErrorsSchema.default({}),
    retryable: zod_1.z.boolean(),
    requestId: zod_1.z.string().trim().min(1),
    path: zod_1.z.string(),
    timestamp: zod_1.z.string().datetime(),
});
//# sourceMappingURL=error.js.map