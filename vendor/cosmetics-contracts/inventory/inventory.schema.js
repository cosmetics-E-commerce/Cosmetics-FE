"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.receiveInventoryBatchSchema = exports.paginatedStockReservationsSchema = exports.paginatedInventoryBatchesSchema = exports.paginatedInventoryStockSchema = exports.stockReservationSchema = exports.inventoryBatchSchema = exports.inventoryStockItemSchema = exports.inventoryBrandSummarySchema = exports.inventoryCategorySummarySchema = exports.inventoryProductSummarySchema = exports.stockReservationQuerySchema = exports.inventoryBatchQuerySchema = exports.inventoryStockQuerySchema = exports.stockStatusEnum = exports.reservationStatusEnum = void 0;
const zod_1 = require("zod");
const product_schema_1 = require("../catalog/product.schema");
const pagination_1 = require("../common/pagination");
const primitives_1 = require("../common/primitives");
exports.reservationStatusEnum = zod_1.z.enum(['ACTIVE', 'COMMITTED', 'RELEASED']);
exports.stockStatusEnum = zod_1.z.enum(['IN_STOCK', 'LOW_STOCK', 'OUT_OF_STOCK']);
exports.inventoryStockQuerySchema = pagination_1.paginationQuerySchema.extend({
    search: zod_1.z.string().trim().min(1).max(120).optional(),
    status: exports.stockStatusEnum.optional(),
    categoryId: primitives_1.uuidSchema.optional(),
    brandId: primitives_1.uuidSchema.optional(),
    sortBy: zod_1.z.enum(['productName', 'sku', 'available', 'nextExpiryAt']).default('productName'),
});
exports.inventoryBatchQuerySchema = pagination_1.paginationQuerySchema.extend({
    search: zod_1.z.string().trim().min(1).max(120).optional(),
    variantId: primitives_1.uuidSchema.optional(),
    status: zod_1.z.enum(['AVAILABLE', 'DEPLETED', 'EXPIRED']).optional(),
    sortBy: zod_1.z.enum(['expiresAt', 'receivedAt', 'batchNumber', 'available']).default('expiresAt'),
});
exports.stockReservationQuerySchema = pagination_1.paginationQuerySchema.extend({
    search: zod_1.z.string().trim().min(1).max(120).optional(),
    variantId: primitives_1.uuidSchema.optional(),
    orderId: primitives_1.uuidSchema.optional(),
    status: exports.reservationStatusEnum.optional(),
    sortBy: zod_1.z.enum(['createdAt', 'expiresAt', 'quantity']).default('createdAt'),
});
exports.inventoryProductSummarySchema = zod_1.z.object({
    id: primitives_1.uuidSchema,
    slug: zod_1.z.string(),
    nameEn: zod_1.z.string(),
    nameAr: zod_1.z.string(),
    isActive: zod_1.z.boolean(),
    publishedAt: zod_1.z.string().nullable(),
});
exports.inventoryCategorySummarySchema = zod_1.z.object({
    id: primitives_1.uuidSchema,
    slug: zod_1.z.string(),
    nameEn: zod_1.z.string(),
    nameAr: zod_1.z.string(),
});
exports.inventoryBrandSummarySchema = zod_1.z.object({
    id: primitives_1.uuidSchema,
    slug: zod_1.z.string(),
    name: zod_1.z.string(),
});
exports.inventoryStockItemSchema = zod_1.z.object({
    variantId: primitives_1.uuidSchema,
    sku: zod_1.z.string(),
    variantNameEn: zod_1.z.string(),
    variantNameAr: zod_1.z.string(),
    product: exports.inventoryProductSummarySchema,
    category: exports.inventoryCategorySummarySchema,
    brand: exports.inventoryBrandSummarySchema.nullable(),
    onHand: zod_1.z.number().int(),
    reserved: zod_1.z.number().int(),
    available: zod_1.z.number().int(),
    unavailable: zod_1.z.number().int(),
    batchCount: zod_1.z.number().int(),
    nextExpiryAt: zod_1.z.string().nullable(),
    status: exports.stockStatusEnum,
});
exports.inventoryBatchSchema = zod_1.z.object({
    id: primitives_1.uuidSchema,
    variantId: primitives_1.uuidSchema,
    batchNumber: zod_1.z.string(),
    manufacturedAt: zod_1.z.string().nullable(),
    expiresAt: zod_1.z.string(),
    paoMonths: zod_1.z.number().int().nullable(),
    quantityOnHand: zod_1.z.number().int(),
    quantityReserved: zod_1.z.number().int(),
    available: zod_1.z.number().int(),
    costPrice: zod_1.z.number().int(),
    receivedAt: zod_1.z.string(),
    variant: zod_1.z.object({
        id: primitives_1.uuidSchema,
        sku: zod_1.z.string(),
        nameEn: zod_1.z.string(),
        nameAr: zod_1.z.string(),
        product: exports.inventoryProductSummarySchema,
    }),
});
exports.stockReservationSchema = zod_1.z.object({
    id: primitives_1.uuidSchema,
    orderId: primitives_1.uuidSchema,
    variantId: primitives_1.uuidSchema,
    batchId: primitives_1.uuidSchema,
    quantity: zod_1.z.number().int(),
    status: exports.reservationStatusEnum,
    expiresAt: zod_1.z.string(),
    createdAt: zod_1.z.string(),
    variant: zod_1.z.object({
        id: primitives_1.uuidSchema,
        sku: zod_1.z.string(),
        nameEn: zod_1.z.string(),
        nameAr: zod_1.z.string(),
        product: exports.inventoryProductSummarySchema,
    }),
    batch: zod_1.z.object({
        id: primitives_1.uuidSchema,
        batchNumber: zod_1.z.string(),
        expiresAt: zod_1.z.string(),
    }),
});
exports.paginatedInventoryStockSchema = zod_1.z.object({
    data: zod_1.z.array(exports.inventoryStockItemSchema),
    meta: pagination_1.paginationMetaSchema,
});
exports.paginatedInventoryBatchesSchema = zod_1.z.object({
    data: zod_1.z.array(exports.inventoryBatchSchema),
    meta: pagination_1.paginationMetaSchema,
});
exports.paginatedStockReservationsSchema = zod_1.z.object({
    data: zod_1.z.array(exports.stockReservationSchema),
    meta: pagination_1.paginationMetaSchema,
});
exports.receiveInventoryBatchSchema = product_schema_1.receiveBatchSchema;
//# sourceMappingURL=inventory.schema.js.map