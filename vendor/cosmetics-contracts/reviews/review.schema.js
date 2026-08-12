"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerReviewLibrarySchema = exports.reviewEligibilitySchema = exports.reviewSummarySchema = exports.reviewResponseSchema = exports.moderateReviewSchema = exports.reviewQuerySchema = exports.updateReviewSchema = exports.createReviewSchema = exports.reviewStatusSchema = void 0;
const zod_1 = require("zod");
const pagination_1 = require("../common/pagination");
const primitives_1 = require("../common/primitives");
exports.reviewStatusSchema = zod_1.z.enum(["PENDING", "APPROVED", "REJECTED"]);
exports.createReviewSchema = zod_1.z.object({
    rating: zod_1.z.number().int().min(1).max(5),
    title: zod_1.z.string().trim().min(2).max(200).optional(),
    body: zod_1.z.string().trim().min(10).max(5000).optional(),
});
exports.updateReviewSchema = exports.createReviewSchema
    .partial()
    .refine((input) => Object.keys(input).length > 0, {
    message: "Provide a rating, title, or comment to update.",
});
exports.reviewQuerySchema = pagination_1.paginationQuerySchema.extend({
    status: exports.reviewStatusSchema.optional(),
    productId: primitives_1.uuidSchema.optional(),
});
exports.moderateReviewSchema = zod_1.z.object({
    status: zod_1.z.enum(["APPROVED", "REJECTED"]),
});
exports.reviewResponseSchema = zod_1.z.object({
    id: primitives_1.uuidSchema,
    productId: primitives_1.uuidSchema,
    orderId: primitives_1.uuidSchema.nullable(),
    rating: zod_1.z.number().int().min(1).max(5),
    title: zod_1.z.string().nullable(),
    body: zod_1.z.string().nullable(),
    status: exports.reviewStatusSchema,
    createdAt: zod_1.z.string().datetime(),
    updatedAt: zod_1.z.string().datetime(),
    moderatedAt: zod_1.z.string().datetime().nullable(),
    author: zod_1.z.object({
        firstName: zod_1.z.string(),
        lastInitial: zod_1.z.string(),
        verifiedPurchase: zod_1.z.boolean(),
    }),
    product: zod_1.z
        .object({
        id: primitives_1.uuidSchema,
        slug: zod_1.z.string(),
        nameEn: zod_1.z.string(),
        nameAr: zod_1.z.string(),
    })
        .optional(),
});
exports.reviewSummarySchema = zod_1.z.object({
    average: zod_1.z.number().min(0).max(5),
    count: zod_1.z.number().int().nonnegative(),
    distribution: zod_1.z.record(zod_1.z.string(), zod_1.z.number().int().nonnegative()),
});
exports.reviewEligibilitySchema = zod_1.z.object({
    canReview: zod_1.z.boolean(),
    reason: zod_1.z.enum(["ELIGIBLE", "NOT_DELIVERED", "ALREADY_REVIEWED"]),
    purchase: zod_1.z
        .object({
        orderId: primitives_1.uuidSchema,
        orderNumber: zod_1.z.string(),
        placedAt: zod_1.z.string().datetime(),
    })
        .nullable(),
    existingReview: exports.reviewResponseSchema.nullable(),
});
exports.customerReviewLibrarySchema = zod_1.z.object({
    items: zod_1.z.array(exports.reviewResponseSchema),
    total: zod_1.z.number().int().nonnegative(),
});
//# sourceMappingURL=review.schema.js.map