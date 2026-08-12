"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sharedWishlistSchema = exports.wishlistSchema = exports.wishlistCollectionSchema = exports.wishlistItemSchema = exports.addWishlistItemSchema = exports.updateWishlistCollectionSchema = exports.createWishlistCollectionSchema = void 0;
const zod_1 = require("zod");
const primitives_1 = require("../common/primitives");
const product_schema_1 = require("../catalog/product.schema");
const wishlistNameSchema = zod_1.z.string().trim().min(1).max(80);
exports.createWishlistCollectionSchema = zod_1.z
    .object({
    name: wishlistNameSchema,
    isPrivate: zod_1.z.boolean().default(true),
})
    .strict();
exports.updateWishlistCollectionSchema = zod_1.z
    .object({
    name: wishlistNameSchema.optional(),
    isPrivate: zod_1.z.boolean().optional(),
})
    .strict()
    .refine((input) => Object.keys(input).length > 0, {
    message: "Provide a name or privacy setting to update.",
});
exports.addWishlistItemSchema = zod_1.z
    .object({
    productId: primitives_1.uuidSchema,
})
    .strict();
exports.wishlistItemSchema = zod_1.z.object({
    id: primitives_1.uuidSchema,
    collectionId: primitives_1.uuidSchema,
    productId: primitives_1.uuidSchema,
    product: product_schema_1.publicProductSchema,
    addedAt: zod_1.z.string().datetime(),
});
exports.wishlistCollectionSchema = zod_1.z.object({
    id: primitives_1.uuidSchema,
    name: zod_1.z.string(),
    isPrivate: zod_1.z.boolean(),
    isDefault: zod_1.z.boolean(),
    shareToken: primitives_1.uuidSchema.nullable(),
    items: zod_1.z.array(exports.wishlistItemSchema),
    totalItems: zod_1.z.number().int().nonnegative(),
    createdAt: zod_1.z.string().datetime(),
    updatedAt: zod_1.z.string().datetime(),
});
exports.wishlistSchema = zod_1.z.object({
    collections: zod_1.z.array(exports.wishlistCollectionSchema),
    items: zod_1.z.array(exports.wishlistItemSchema),
    totalItems: zod_1.z.number().int().nonnegative(),
    updatedAt: zod_1.z.string().datetime().nullable(),
});
exports.sharedWishlistSchema = zod_1.z.object({
    owner: zod_1.z.object({ firstName: zod_1.z.string() }),
    collection: exports.wishlistCollectionSchema.extend({
        isPrivate: zod_1.z.literal(false),
        shareToken: primitives_1.uuidSchema,
    }),
});
//# sourceMappingURL=wishlist.schema.js.map