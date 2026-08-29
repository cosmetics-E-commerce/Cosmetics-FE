"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginatedInventoryMovementsSchema = exports.inventoryMovementSchema = exports.inventoryMovementQuerySchema = exports.removeInventoryStockResponseSchema = exports.inventoryRemovalAllocationSchema = exports.removeInventoryStockSchema = exports.inventoryRemovalReasonEnum = exports.writeOffInventorySchema = exports.adjustInventorySchema = exports.receiveInventoryBatchSchema = exports.paginatedStockReservationsSchema = exports.paginatedInventoryVariantOptionsSchema = exports.paginatedInventoryBatchesSchema = exports.paginatedInventoryStockSchema = exports.stockReservationSchema = exports.inventoryVariantOptionSchema = exports.inventoryBatchSchema = exports.inventoryStockItemSchema = exports.inventoryBrandSummarySchema = exports.inventoryCategorySummarySchema = exports.inventoryProductSummarySchema = exports.stockReservationQuerySchema = exports.inventoryVariantOptionQuerySchema = exports.inventoryBatchQuerySchema = exports.inventoryStockQuerySchema = exports.stockStatusEnum = exports.reservationStatusEnum = exports.INVENTORY_OPERATION_MAX_QUANTITY = void 0;
const zod_1 = require("zod");
const product_schema_1 = require("../catalog/product.schema");
const pagination_1 = require("../common/pagination");
const primitives_1 = require("../common/primitives");
exports.INVENTORY_OPERATION_MAX_QUANTITY = 1_000_000;
exports.reservationStatusEnum = zod_1.z.enum([
    "ACTIVE",
    "COMMITTED",
    "RELEASED",
    "RESTORED",
]);
exports.stockStatusEnum = zod_1.z.enum([
    "IN_STOCK",
    "LOW_STOCK",
    "OUT_OF_STOCK",
]);
exports.inventoryStockQuerySchema = pagination_1.paginationQuerySchema.extend({
    search: zod_1.z.string().trim().min(1).max(120).optional(),
    status: exports.stockStatusEnum.optional(),
    categoryId: primitives_1.uuidSchema.optional(),
    brandId: primitives_1.uuidSchema.optional(),
    sortBy: zod_1.z
        .enum(["productName", "sku", "available", "nextExpiryAt"])
        .default("productName"),
});
exports.inventoryBatchQuerySchema = pagination_1.paginationQuerySchema.extend({
    search: zod_1.z.string().trim().min(1).max(120).optional(),
    variantId: primitives_1.uuidSchema.optional(),
    status: zod_1.z.enum(["AVAILABLE", "DEPLETED", "EXPIRED"]).optional(),
    sortBy: zod_1.z
        .enum(["expiresAt", "receivedAt", "batchNumber", "available"])
        .default("expiresAt"),
});
exports.inventoryVariantOptionQuerySchema = pagination_1.paginationQuerySchema.extend({
    search: zod_1.z.string().trim().min(1).max(120).optional(),
});
exports.stockReservationQuerySchema = pagination_1.paginationQuerySchema.extend({
    search: zod_1.z.string().trim().min(1).max(120).optional(),
    variantId: primitives_1.uuidSchema.optional(),
    orderId: primitives_1.uuidSchema.optional(),
    status: exports.reservationStatusEnum.optional(),
    sortBy: zod_1.z.enum(["createdAt", "expiresAt", "quantity"]).default("createdAt"),
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
exports.inventoryVariantOptionSchema = zod_1.z.object({
    id: primitives_1.uuidSchema,
    sku: zod_1.z.string(),
    barcode: zod_1.z.string().nullable(),
    nameEn: zod_1.z.string(),
    nameAr: zod_1.z.string(),
    product: exports.inventoryProductSummarySchema,
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
exports.paginatedInventoryVariantOptionsSchema = zod_1.z.object({
    data: zod_1.z.array(exports.inventoryVariantOptionSchema),
    meta: pagination_1.paginationMetaSchema,
});
exports.paginatedStockReservationsSchema = zod_1.z.object({
    data: zod_1.z.array(exports.stockReservationSchema),
    meta: pagination_1.paginationMetaSchema,
});
exports.receiveInventoryBatchSchema = product_schema_1.receiveBatchSchema;
exports.adjustInventorySchema = zod_1.z.object({
    batchId: primitives_1.uuidSchema,
    quantityDelta: zod_1.z
        .number()
        .int()
        .min(-exports.INVENTORY_OPERATION_MAX_QUANTITY)
        .max(exports.INVENTORY_OPERATION_MAX_QUANTITY)
        .refine((value) => value !== 0, "Quantity delta cannot be zero"),
    reason: zod_1.z.string().trim().min(5).max(500),
});
exports.writeOffInventorySchema = zod_1.z.object({
    batchId: primitives_1.uuidSchema,
    quantity: zod_1.z
        .number()
        .int()
        .positive()
        .max(exports.INVENTORY_OPERATION_MAX_QUANTITY),
    reason: zod_1.z.string().trim().min(5).max(500),
});
exports.inventoryRemovalReasonEnum = zod_1.z.enum([
    "STOCK_CORRECTION",
    "DAMAGED",
    "EXPIRED",
    "LOST_MISSING",
    "INTERNAL_USE",
    "SUPPLIER_ISSUE",
    "OTHER",
]);
/**
 * User-facing stock removal command. Batch allocation is automatic (FEFO) by
 * default; batchId is only supplied when an administrator intentionally
 * chooses a specific batch.
 */
exports.removeInventoryStockSchema = zod_1.z
    .object({
    variantId: primitives_1.uuidSchema,
    quantity: zod_1.z
        .number()
        .int()
        .positive()
        .max(exports.INVENTORY_OPERATION_MAX_QUANTITY)
        .optional(),
    removeAllAvailable: zod_1.z.boolean().default(false),
    reason: exports.inventoryRemovalReasonEnum.default("STOCK_CORRECTION"),
    note: zod_1.z.string().trim().max(500).optional(),
    batchId: primitives_1.uuidSchema.optional(),
})
    .superRefine((value, ctx) => {
    if (!value.removeAllAvailable && value.quantity == null) {
        ctx.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            path: ["quantity"],
            message: "Enter a quantity to remove",
        });
    }
    if (value.removeAllAvailable && value.quantity != null) {
        ctx.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            path: ["quantity"],
            message: "Quantity is not used when removing all available stock",
        });
    }
    if (value.reason === "OTHER" && !value.note?.trim()) {
        ctx.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            path: ["note"],
            message: "Add a note when Other is selected",
        });
    }
});
exports.inventoryRemovalAllocationSchema = zod_1.z.object({
    batchId: primitives_1.uuidSchema,
    batchNumber: zod_1.z.string(),
    quantity: zod_1.z.number().int().positive(),
});
exports.removeInventoryStockResponseSchema = zod_1.z.object({
    variantId: primitives_1.uuidSchema,
    removedQuantity: zod_1.z.number().int().positive(),
    onHand: zod_1.z.number().int().nonnegative(),
    reserved: zod_1.z.number().int().nonnegative(),
    available: zod_1.z.number().int().nonnegative(),
    allocations: zod_1.z.array(exports.inventoryRemovalAllocationSchema).min(1),
});
exports.inventoryMovementQuerySchema = pagination_1.paginationQuerySchema.extend({
    variantId: primitives_1.uuidSchema.optional(),
    search: zod_1.z.string().trim().min(1).max(120).optional(),
});
exports.inventoryMovementSchema = zod_1.z.object({
    id: primitives_1.uuidSchema,
    variantId: primitives_1.uuidSchema,
    batchId: primitives_1.uuidSchema.nullable(),
    batchNumber: zod_1.z.string().nullable(),
    type: zod_1.z.enum([
        "RECEIPT",
        "RESERVE",
        "RELEASE",
        "COMMIT",
        "ADJUSTMENT",
        "RETURN",
        "EXPIRY_WRITE_OFF",
    ]),
    quantity: zod_1.z.number().int(),
    reason: zod_1.z.string().nullable(),
    createdAt: zod_1.z.string(),
    createdBy: zod_1.z
        .object({ id: primitives_1.uuidSchema, name: zod_1.z.string() })
        .nullable(),
});
exports.paginatedInventoryMovementsSchema = zod_1.z.object({
    data: zod_1.z.array(exports.inventoryMovementSchema),
    meta: pagination_1.paginationMetaSchema,
});
//# sourceMappingURL=inventory.schema.js.map