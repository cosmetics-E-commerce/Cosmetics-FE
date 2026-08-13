"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mediaUploadMetadataSchema = exports.mediaQuerySchema = void 0;
const zod_1 = require("zod");
const pagination_1 = require("../common/pagination");
exports.mediaQuerySchema = pagination_1.paginationQuerySchema.extend({
    folder: zod_1.z.string().trim().min(1).max(64).optional(),
    search: zod_1.z.string().trim().min(1).max(180).optional(),
});
exports.mediaUploadMetadataSchema = zod_1.z.object({
    altText: zod_1.z.string().trim().max(180).optional(),
    folder: zod_1.z
        .string()
        .trim()
        .regex(/^[a-z0-9-]+$/)
        .default("catalog"),
});
//# sourceMappingURL=media.schema.js.map