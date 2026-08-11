"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wishlistSchema = exports.wishlistItemSchema = exports.addWishlistItemSchema = void 0;
const zod_1 = require("zod");
const primitives_1 = require("../common/primitives");
const product_schema_1 = require("../catalog/product.schema");
exports.addWishlistItemSchema = zod_1.z
  .object({
    productId: primitives_1.uuidSchema,
  })
  .strict();
exports.wishlistItemSchema = zod_1.z.object({
  id: primitives_1.uuidSchema,
  userId: primitives_1.uuidSchema,
  productId: primitives_1.uuidSchema,
  product: product_schema_1.publicProductSchema,
  addedAt: zod_1.z.string(),
});
exports.wishlistSchema = zod_1.z.object({
  items: zod_1.z.array(exports.wishlistItemSchema),
  totalItems: zod_1.z.number().int().nonnegative(),
  updatedAt: zod_1.z.string().nullable(),
});
//# sourceMappingURL=wishlist.schema.js.map
