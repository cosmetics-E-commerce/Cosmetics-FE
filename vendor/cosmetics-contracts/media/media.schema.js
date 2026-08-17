"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvedImageReferenceSchema = exports.resolveImageReferenceQuerySchema = exports.mediaUploadMetadataSchema = exports.mediaQuerySchema = void 0;
const zod_1 = require("zod");
const pagination_1 = require("../common/pagination");
const image_reference_schema_1 = require("./image-reference.schema");
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
exports.resolveImageReferenceQuerySchema = zod_1.z.object({
    reference: image_reference_schema_1.imageReferenceValueSchema,
});
exports.resolvedImageReferenceSchema = zod_1.z.object({
    reference: image_reference_schema_1.imageReferenceValueSchema,
    source: zod_1.z.enum(["storage_key", "external_url"]),
    url: zod_1.z.string().url(),
    ownedByApplication: zod_1.z.boolean(),
});
//# sourceMappingURL=media.schema.js.map