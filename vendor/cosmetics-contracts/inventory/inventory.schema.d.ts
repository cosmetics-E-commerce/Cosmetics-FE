import { z } from "zod";
export declare const INVENTORY_OPERATION_MAX_QUANTITY = 1000000;
export declare const reservationStatusEnum: z.ZodEnum<["ACTIVE", "COMMITTED", "RELEASED", "RESTORED"]>;
export type ReservationStatusValue = z.infer<typeof reservationStatusEnum>;
export declare const stockStatusEnum: z.ZodEnum<["IN_STOCK", "LOW_STOCK", "OUT_OF_STOCK"]>;
export type StockStatus = z.infer<typeof stockStatusEnum>;
export declare const inventoryStockQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    sortOrder: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
} & {
    search: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<["IN_STOCK", "LOW_STOCK", "OUT_OF_STOCK"]>>;
    categoryId: z.ZodOptional<z.ZodString>;
    brandId: z.ZodOptional<z.ZodString>;
    sortBy: z.ZodDefault<z.ZodEnum<["productName", "sku", "available", "nextExpiryAt"]>>;
}, "strip", z.ZodTypeAny, {
    page: number;
    limit: number;
    sortBy: "productName" | "sku" | "available" | "nextExpiryAt";
    sortOrder: "asc" | "desc";
    status?: "OUT_OF_STOCK" | "IN_STOCK" | "LOW_STOCK" | undefined;
    search?: string | undefined;
    categoryId?: string | undefined;
    brandId?: string | undefined;
}, {
    status?: "OUT_OF_STOCK" | "IN_STOCK" | "LOW_STOCK" | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sortBy?: "productName" | "sku" | "available" | "nextExpiryAt" | undefined;
    sortOrder?: "asc" | "desc" | undefined;
    search?: string | undefined;
    categoryId?: string | undefined;
    brandId?: string | undefined;
}>;
export type InventoryStockQuery = z.infer<typeof inventoryStockQuerySchema>;
export declare const inventoryBatchQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    sortOrder: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
} & {
    search: z.ZodOptional<z.ZodString>;
    variantId: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<["AVAILABLE", "DEPLETED", "EXPIRED"]>>;
    sortBy: z.ZodDefault<z.ZodEnum<["expiresAt", "receivedAt", "batchNumber", "available"]>>;
}, "strip", z.ZodTypeAny, {
    page: number;
    limit: number;
    sortBy: "expiresAt" | "batchNumber" | "available" | "receivedAt";
    sortOrder: "asc" | "desc";
    status?: "EXPIRED" | "AVAILABLE" | "DEPLETED" | undefined;
    search?: string | undefined;
    variantId?: string | undefined;
}, {
    status?: "EXPIRED" | "AVAILABLE" | "DEPLETED" | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sortBy?: "expiresAt" | "batchNumber" | "available" | "receivedAt" | undefined;
    sortOrder?: "asc" | "desc" | undefined;
    search?: string | undefined;
    variantId?: string | undefined;
}>;
export type InventoryBatchQuery = z.infer<typeof inventoryBatchQuerySchema>;
export declare const inventoryVariantOptionQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    sortBy: z.ZodOptional<z.ZodString>;
    sortOrder: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
} & {
    search: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    page: number;
    limit: number;
    sortOrder: "asc" | "desc";
    sortBy?: string | undefined;
    search?: string | undefined;
}, {
    page?: number | undefined;
    limit?: number | undefined;
    sortBy?: string | undefined;
    sortOrder?: "asc" | "desc" | undefined;
    search?: string | undefined;
}>;
export type InventoryVariantOptionQuery = z.infer<typeof inventoryVariantOptionQuerySchema>;
export declare const stockReservationQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    sortOrder: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
} & {
    search: z.ZodOptional<z.ZodString>;
    variantId: z.ZodOptional<z.ZodString>;
    orderId: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<["ACTIVE", "COMMITTED", "RELEASED", "RESTORED"]>>;
    sortBy: z.ZodDefault<z.ZodEnum<["createdAt", "expiresAt", "quantity"]>>;
}, "strip", z.ZodTypeAny, {
    page: number;
    limit: number;
    sortBy: "createdAt" | "quantity" | "expiresAt";
    sortOrder: "asc" | "desc";
    status?: "ACTIVE" | "COMMITTED" | "RELEASED" | "RESTORED" | undefined;
    search?: string | undefined;
    orderId?: string | undefined;
    variantId?: string | undefined;
}, {
    status?: "ACTIVE" | "COMMITTED" | "RELEASED" | "RESTORED" | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sortBy?: "createdAt" | "quantity" | "expiresAt" | undefined;
    sortOrder?: "asc" | "desc" | undefined;
    search?: string | undefined;
    orderId?: string | undefined;
    variantId?: string | undefined;
}>;
export type StockReservationQuery = z.infer<typeof stockReservationQuerySchema>;
export declare const inventoryProductSummarySchema: z.ZodObject<{
    id: z.ZodString;
    slug: z.ZodString;
    nameEn: z.ZodString;
    nameAr: z.ZodString;
    isActive: z.ZodBoolean;
    publishedAt: z.ZodNullable<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id: string;
    isActive: boolean;
    slug: string;
    nameEn: string;
    nameAr: string;
    publishedAt: string | null;
}, {
    id: string;
    isActive: boolean;
    slug: string;
    nameEn: string;
    nameAr: string;
    publishedAt: string | null;
}>;
export declare const inventoryCategorySummarySchema: z.ZodObject<{
    id: z.ZodString;
    slug: z.ZodString;
    nameEn: z.ZodString;
    nameAr: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    slug: string;
    nameEn: string;
    nameAr: string;
}, {
    id: string;
    slug: string;
    nameEn: string;
    nameAr: string;
}>;
export declare const inventoryBrandSummarySchema: z.ZodObject<{
    id: z.ZodString;
    slug: z.ZodString;
    name: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    name: string;
    slug: string;
}, {
    id: string;
    name: string;
    slug: string;
}>;
export declare const inventoryStockItemSchema: z.ZodObject<{
    variantId: z.ZodString;
    sku: z.ZodString;
    variantNameEn: z.ZodString;
    variantNameAr: z.ZodString;
    product: z.ZodObject<{
        id: z.ZodString;
        slug: z.ZodString;
        nameEn: z.ZodString;
        nameAr: z.ZodString;
        isActive: z.ZodBoolean;
        publishedAt: z.ZodNullable<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        isActive: boolean;
        slug: string;
        nameEn: string;
        nameAr: string;
        publishedAt: string | null;
    }, {
        id: string;
        isActive: boolean;
        slug: string;
        nameEn: string;
        nameAr: string;
        publishedAt: string | null;
    }>;
    category: z.ZodObject<{
        id: z.ZodString;
        slug: z.ZodString;
        nameEn: z.ZodString;
        nameAr: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        slug: string;
        nameEn: string;
        nameAr: string;
    }, {
        id: string;
        slug: string;
        nameEn: string;
        nameAr: string;
    }>;
    brand: z.ZodNullable<z.ZodObject<{
        id: z.ZodString;
        slug: z.ZodString;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        name: string;
        slug: string;
    }, {
        id: string;
        name: string;
        slug: string;
    }>>;
    onHand: z.ZodNumber;
    reserved: z.ZodNumber;
    available: z.ZodNumber;
    unavailable: z.ZodNumber;
    batchCount: z.ZodNumber;
    nextExpiryAt: z.ZodNullable<z.ZodString>;
    status: z.ZodEnum<["IN_STOCK", "LOW_STOCK", "OUT_OF_STOCK"]>;
}, "strip", z.ZodTypeAny, {
    status: "OUT_OF_STOCK" | "IN_STOCK" | "LOW_STOCK";
    variantId: string;
    sku: string;
    category: {
        id: string;
        slug: string;
        nameEn: string;
        nameAr: string;
    };
    brand: {
        id: string;
        name: string;
        slug: string;
    } | null;
    variantNameEn: string;
    variantNameAr: string;
    available: number;
    product: {
        id: string;
        isActive: boolean;
        slug: string;
        nameEn: string;
        nameAr: string;
        publishedAt: string | null;
    };
    nextExpiryAt: string | null;
    onHand: number;
    reserved: number;
    unavailable: number;
    batchCount: number;
}, {
    status: "OUT_OF_STOCK" | "IN_STOCK" | "LOW_STOCK";
    variantId: string;
    sku: string;
    category: {
        id: string;
        slug: string;
        nameEn: string;
        nameAr: string;
    };
    brand: {
        id: string;
        name: string;
        slug: string;
    } | null;
    variantNameEn: string;
    variantNameAr: string;
    available: number;
    product: {
        id: string;
        isActive: boolean;
        slug: string;
        nameEn: string;
        nameAr: string;
        publishedAt: string | null;
    };
    nextExpiryAt: string | null;
    onHand: number;
    reserved: number;
    unavailable: number;
    batchCount: number;
}>;
export type InventoryStockItemResponse = z.infer<typeof inventoryStockItemSchema>;
export declare const inventoryBatchSchema: z.ZodObject<{
    id: z.ZodString;
    variantId: z.ZodString;
    batchNumber: z.ZodString;
    manufacturedAt: z.ZodNullable<z.ZodString>;
    expiresAt: z.ZodString;
    paoMonths: z.ZodNullable<z.ZodNumber>;
    quantityOnHand: z.ZodNumber;
    quantityReserved: z.ZodNumber;
    available: z.ZodNumber;
    costPrice: z.ZodNumber;
    receivedAt: z.ZodString;
    variant: z.ZodObject<{
        id: z.ZodString;
        sku: z.ZodString;
        nameEn: z.ZodString;
        nameAr: z.ZodString;
        product: z.ZodObject<{
            id: z.ZodString;
            slug: z.ZodString;
            nameEn: z.ZodString;
            nameAr: z.ZodString;
            isActive: z.ZodBoolean;
            publishedAt: z.ZodNullable<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            id: string;
            isActive: boolean;
            slug: string;
            nameEn: string;
            nameAr: string;
            publishedAt: string | null;
        }, {
            id: string;
            isActive: boolean;
            slug: string;
            nameEn: string;
            nameAr: string;
            publishedAt: string | null;
        }>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        sku: string;
        nameEn: string;
        nameAr: string;
        product: {
            id: string;
            isActive: boolean;
            slug: string;
            nameEn: string;
            nameAr: string;
            publishedAt: string | null;
        };
    }, {
        id: string;
        sku: string;
        nameEn: string;
        nameAr: string;
        product: {
            id: string;
            isActive: boolean;
            slug: string;
            nameEn: string;
            nameAr: string;
            publishedAt: string | null;
        };
    }>;
}, "strip", z.ZodTypeAny, {
    id: string;
    variantId: string;
    expiresAt: string;
    costPrice: number;
    batchNumber: string;
    manufacturedAt: string | null;
    paoMonths: number | null;
    available: number;
    variant: {
        id: string;
        sku: string;
        nameEn: string;
        nameAr: string;
        product: {
            id: string;
            isActive: boolean;
            slug: string;
            nameEn: string;
            nameAr: string;
            publishedAt: string | null;
        };
    };
    receivedAt: string;
    quantityOnHand: number;
    quantityReserved: number;
}, {
    id: string;
    variantId: string;
    expiresAt: string;
    costPrice: number;
    batchNumber: string;
    manufacturedAt: string | null;
    paoMonths: number | null;
    available: number;
    variant: {
        id: string;
        sku: string;
        nameEn: string;
        nameAr: string;
        product: {
            id: string;
            isActive: boolean;
            slug: string;
            nameEn: string;
            nameAr: string;
            publishedAt: string | null;
        };
    };
    receivedAt: string;
    quantityOnHand: number;
    quantityReserved: number;
}>;
export type InventoryBatchResponse = z.infer<typeof inventoryBatchSchema>;
export declare const inventoryVariantOptionSchema: z.ZodObject<{
    id: z.ZodString;
    sku: z.ZodString;
    barcode: z.ZodNullable<z.ZodString>;
    nameEn: z.ZodString;
    nameAr: z.ZodString;
    product: z.ZodObject<{
        id: z.ZodString;
        slug: z.ZodString;
        nameEn: z.ZodString;
        nameAr: z.ZodString;
        isActive: z.ZodBoolean;
        publishedAt: z.ZodNullable<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        isActive: boolean;
        slug: string;
        nameEn: string;
        nameAr: string;
        publishedAt: string | null;
    }, {
        id: string;
        isActive: boolean;
        slug: string;
        nameEn: string;
        nameAr: string;
        publishedAt: string | null;
    }>;
}, "strip", z.ZodTypeAny, {
    id: string;
    sku: string;
    nameEn: string;
    nameAr: string;
    barcode: string | null;
    product: {
        id: string;
        isActive: boolean;
        slug: string;
        nameEn: string;
        nameAr: string;
        publishedAt: string | null;
    };
}, {
    id: string;
    sku: string;
    nameEn: string;
    nameAr: string;
    barcode: string | null;
    product: {
        id: string;
        isActive: boolean;
        slug: string;
        nameEn: string;
        nameAr: string;
        publishedAt: string | null;
    };
}>;
export type InventoryVariantOptionResponse = z.infer<typeof inventoryVariantOptionSchema>;
export declare const stockReservationSchema: z.ZodObject<{
    id: z.ZodString;
    orderId: z.ZodString;
    variantId: z.ZodString;
    batchId: z.ZodString;
    quantity: z.ZodNumber;
    status: z.ZodEnum<["ACTIVE", "COMMITTED", "RELEASED", "RESTORED"]>;
    expiresAt: z.ZodString;
    createdAt: z.ZodString;
    variant: z.ZodObject<{
        id: z.ZodString;
        sku: z.ZodString;
        nameEn: z.ZodString;
        nameAr: z.ZodString;
        product: z.ZodObject<{
            id: z.ZodString;
            slug: z.ZodString;
            nameEn: z.ZodString;
            nameAr: z.ZodString;
            isActive: z.ZodBoolean;
            publishedAt: z.ZodNullable<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            id: string;
            isActive: boolean;
            slug: string;
            nameEn: string;
            nameAr: string;
            publishedAt: string | null;
        }, {
            id: string;
            isActive: boolean;
            slug: string;
            nameEn: string;
            nameAr: string;
            publishedAt: string | null;
        }>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        sku: string;
        nameEn: string;
        nameAr: string;
        product: {
            id: string;
            isActive: boolean;
            slug: string;
            nameEn: string;
            nameAr: string;
            publishedAt: string | null;
        };
    }, {
        id: string;
        sku: string;
        nameEn: string;
        nameAr: string;
        product: {
            id: string;
            isActive: boolean;
            slug: string;
            nameEn: string;
            nameAr: string;
            publishedAt: string | null;
        };
    }>;
    batch: z.ZodObject<{
        id: z.ZodString;
        batchNumber: z.ZodString;
        expiresAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        expiresAt: string;
        batchNumber: string;
    }, {
        id: string;
        expiresAt: string;
        batchNumber: string;
    }>;
}, "strip", z.ZodTypeAny, {
    status: "ACTIVE" | "COMMITTED" | "RELEASED" | "RESTORED";
    id: string;
    createdAt: string;
    orderId: string;
    quantity: number;
    variantId: string;
    expiresAt: string;
    variant: {
        id: string;
        sku: string;
        nameEn: string;
        nameAr: string;
        product: {
            id: string;
            isActive: boolean;
            slug: string;
            nameEn: string;
            nameAr: string;
            publishedAt: string | null;
        };
    };
    batchId: string;
    batch: {
        id: string;
        expiresAt: string;
        batchNumber: string;
    };
}, {
    status: "ACTIVE" | "COMMITTED" | "RELEASED" | "RESTORED";
    id: string;
    createdAt: string;
    orderId: string;
    quantity: number;
    variantId: string;
    expiresAt: string;
    variant: {
        id: string;
        sku: string;
        nameEn: string;
        nameAr: string;
        product: {
            id: string;
            isActive: boolean;
            slug: string;
            nameEn: string;
            nameAr: string;
            publishedAt: string | null;
        };
    };
    batchId: string;
    batch: {
        id: string;
        expiresAt: string;
        batchNumber: string;
    };
}>;
export type StockReservationResponse = z.infer<typeof stockReservationSchema>;
export declare const paginatedInventoryStockSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
        variantId: z.ZodString;
        sku: z.ZodString;
        variantNameEn: z.ZodString;
        variantNameAr: z.ZodString;
        product: z.ZodObject<{
            id: z.ZodString;
            slug: z.ZodString;
            nameEn: z.ZodString;
            nameAr: z.ZodString;
            isActive: z.ZodBoolean;
            publishedAt: z.ZodNullable<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            id: string;
            isActive: boolean;
            slug: string;
            nameEn: string;
            nameAr: string;
            publishedAt: string | null;
        }, {
            id: string;
            isActive: boolean;
            slug: string;
            nameEn: string;
            nameAr: string;
            publishedAt: string | null;
        }>;
        category: z.ZodObject<{
            id: z.ZodString;
            slug: z.ZodString;
            nameEn: z.ZodString;
            nameAr: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            id: string;
            slug: string;
            nameEn: string;
            nameAr: string;
        }, {
            id: string;
            slug: string;
            nameEn: string;
            nameAr: string;
        }>;
        brand: z.ZodNullable<z.ZodObject<{
            id: z.ZodString;
            slug: z.ZodString;
            name: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            id: string;
            name: string;
            slug: string;
        }, {
            id: string;
            name: string;
            slug: string;
        }>>;
        onHand: z.ZodNumber;
        reserved: z.ZodNumber;
        available: z.ZodNumber;
        unavailable: z.ZodNumber;
        batchCount: z.ZodNumber;
        nextExpiryAt: z.ZodNullable<z.ZodString>;
        status: z.ZodEnum<["IN_STOCK", "LOW_STOCK", "OUT_OF_STOCK"]>;
    }, "strip", z.ZodTypeAny, {
        status: "OUT_OF_STOCK" | "IN_STOCK" | "LOW_STOCK";
        variantId: string;
        sku: string;
        category: {
            id: string;
            slug: string;
            nameEn: string;
            nameAr: string;
        };
        brand: {
            id: string;
            name: string;
            slug: string;
        } | null;
        variantNameEn: string;
        variantNameAr: string;
        available: number;
        product: {
            id: string;
            isActive: boolean;
            slug: string;
            nameEn: string;
            nameAr: string;
            publishedAt: string | null;
        };
        nextExpiryAt: string | null;
        onHand: number;
        reserved: number;
        unavailable: number;
        batchCount: number;
    }, {
        status: "OUT_OF_STOCK" | "IN_STOCK" | "LOW_STOCK";
        variantId: string;
        sku: string;
        category: {
            id: string;
            slug: string;
            nameEn: string;
            nameAr: string;
        };
        brand: {
            id: string;
            name: string;
            slug: string;
        } | null;
        variantNameEn: string;
        variantNameAr: string;
        available: number;
        product: {
            id: string;
            isActive: boolean;
            slug: string;
            nameEn: string;
            nameAr: string;
            publishedAt: string | null;
        };
        nextExpiryAt: string | null;
        onHand: number;
        reserved: number;
        unavailable: number;
        batchCount: number;
    }>, "many">;
    meta: z.ZodObject<{
        page: z.ZodNumber;
        limit: z.ZodNumber;
        total: z.ZodNumber;
        totalPages: z.ZodNumber;
        hasNext: z.ZodBoolean;
        hasPrev: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    }, {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    }>;
}, "strip", z.ZodTypeAny, {
    data: {
        status: "OUT_OF_STOCK" | "IN_STOCK" | "LOW_STOCK";
        variantId: string;
        sku: string;
        category: {
            id: string;
            slug: string;
            nameEn: string;
            nameAr: string;
        };
        brand: {
            id: string;
            name: string;
            slug: string;
        } | null;
        variantNameEn: string;
        variantNameAr: string;
        available: number;
        product: {
            id: string;
            isActive: boolean;
            slug: string;
            nameEn: string;
            nameAr: string;
            publishedAt: string | null;
        };
        nextExpiryAt: string | null;
        onHand: number;
        reserved: number;
        unavailable: number;
        batchCount: number;
    }[];
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    };
}, {
    data: {
        status: "OUT_OF_STOCK" | "IN_STOCK" | "LOW_STOCK";
        variantId: string;
        sku: string;
        category: {
            id: string;
            slug: string;
            nameEn: string;
            nameAr: string;
        };
        brand: {
            id: string;
            name: string;
            slug: string;
        } | null;
        variantNameEn: string;
        variantNameAr: string;
        available: number;
        product: {
            id: string;
            isActive: boolean;
            slug: string;
            nameEn: string;
            nameAr: string;
            publishedAt: string | null;
        };
        nextExpiryAt: string | null;
        onHand: number;
        reserved: number;
        unavailable: number;
        batchCount: number;
    }[];
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    };
}>;
export declare const paginatedInventoryBatchesSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        variantId: z.ZodString;
        batchNumber: z.ZodString;
        manufacturedAt: z.ZodNullable<z.ZodString>;
        expiresAt: z.ZodString;
        paoMonths: z.ZodNullable<z.ZodNumber>;
        quantityOnHand: z.ZodNumber;
        quantityReserved: z.ZodNumber;
        available: z.ZodNumber;
        costPrice: z.ZodNumber;
        receivedAt: z.ZodString;
        variant: z.ZodObject<{
            id: z.ZodString;
            sku: z.ZodString;
            nameEn: z.ZodString;
            nameAr: z.ZodString;
            product: z.ZodObject<{
                id: z.ZodString;
                slug: z.ZodString;
                nameEn: z.ZodString;
                nameAr: z.ZodString;
                isActive: z.ZodBoolean;
                publishedAt: z.ZodNullable<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                id: string;
                isActive: boolean;
                slug: string;
                nameEn: string;
                nameAr: string;
                publishedAt: string | null;
            }, {
                id: string;
                isActive: boolean;
                slug: string;
                nameEn: string;
                nameAr: string;
                publishedAt: string | null;
            }>;
        }, "strip", z.ZodTypeAny, {
            id: string;
            sku: string;
            nameEn: string;
            nameAr: string;
            product: {
                id: string;
                isActive: boolean;
                slug: string;
                nameEn: string;
                nameAr: string;
                publishedAt: string | null;
            };
        }, {
            id: string;
            sku: string;
            nameEn: string;
            nameAr: string;
            product: {
                id: string;
                isActive: boolean;
                slug: string;
                nameEn: string;
                nameAr: string;
                publishedAt: string | null;
            };
        }>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        variantId: string;
        expiresAt: string;
        costPrice: number;
        batchNumber: string;
        manufacturedAt: string | null;
        paoMonths: number | null;
        available: number;
        variant: {
            id: string;
            sku: string;
            nameEn: string;
            nameAr: string;
            product: {
                id: string;
                isActive: boolean;
                slug: string;
                nameEn: string;
                nameAr: string;
                publishedAt: string | null;
            };
        };
        receivedAt: string;
        quantityOnHand: number;
        quantityReserved: number;
    }, {
        id: string;
        variantId: string;
        expiresAt: string;
        costPrice: number;
        batchNumber: string;
        manufacturedAt: string | null;
        paoMonths: number | null;
        available: number;
        variant: {
            id: string;
            sku: string;
            nameEn: string;
            nameAr: string;
            product: {
                id: string;
                isActive: boolean;
                slug: string;
                nameEn: string;
                nameAr: string;
                publishedAt: string | null;
            };
        };
        receivedAt: string;
        quantityOnHand: number;
        quantityReserved: number;
    }>, "many">;
    meta: z.ZodObject<{
        page: z.ZodNumber;
        limit: z.ZodNumber;
        total: z.ZodNumber;
        totalPages: z.ZodNumber;
        hasNext: z.ZodBoolean;
        hasPrev: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    }, {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    }>;
}, "strip", z.ZodTypeAny, {
    data: {
        id: string;
        variantId: string;
        expiresAt: string;
        costPrice: number;
        batchNumber: string;
        manufacturedAt: string | null;
        paoMonths: number | null;
        available: number;
        variant: {
            id: string;
            sku: string;
            nameEn: string;
            nameAr: string;
            product: {
                id: string;
                isActive: boolean;
                slug: string;
                nameEn: string;
                nameAr: string;
                publishedAt: string | null;
            };
        };
        receivedAt: string;
        quantityOnHand: number;
        quantityReserved: number;
    }[];
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    };
}, {
    data: {
        id: string;
        variantId: string;
        expiresAt: string;
        costPrice: number;
        batchNumber: string;
        manufacturedAt: string | null;
        paoMonths: number | null;
        available: number;
        variant: {
            id: string;
            sku: string;
            nameEn: string;
            nameAr: string;
            product: {
                id: string;
                isActive: boolean;
                slug: string;
                nameEn: string;
                nameAr: string;
                publishedAt: string | null;
            };
        };
        receivedAt: string;
        quantityOnHand: number;
        quantityReserved: number;
    }[];
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    };
}>;
export declare const paginatedInventoryVariantOptionsSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        sku: z.ZodString;
        barcode: z.ZodNullable<z.ZodString>;
        nameEn: z.ZodString;
        nameAr: z.ZodString;
        product: z.ZodObject<{
            id: z.ZodString;
            slug: z.ZodString;
            nameEn: z.ZodString;
            nameAr: z.ZodString;
            isActive: z.ZodBoolean;
            publishedAt: z.ZodNullable<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            id: string;
            isActive: boolean;
            slug: string;
            nameEn: string;
            nameAr: string;
            publishedAt: string | null;
        }, {
            id: string;
            isActive: boolean;
            slug: string;
            nameEn: string;
            nameAr: string;
            publishedAt: string | null;
        }>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        sku: string;
        nameEn: string;
        nameAr: string;
        barcode: string | null;
        product: {
            id: string;
            isActive: boolean;
            slug: string;
            nameEn: string;
            nameAr: string;
            publishedAt: string | null;
        };
    }, {
        id: string;
        sku: string;
        nameEn: string;
        nameAr: string;
        barcode: string | null;
        product: {
            id: string;
            isActive: boolean;
            slug: string;
            nameEn: string;
            nameAr: string;
            publishedAt: string | null;
        };
    }>, "many">;
    meta: z.ZodObject<{
        page: z.ZodNumber;
        limit: z.ZodNumber;
        total: z.ZodNumber;
        totalPages: z.ZodNumber;
        hasNext: z.ZodBoolean;
        hasPrev: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    }, {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    }>;
}, "strip", z.ZodTypeAny, {
    data: {
        id: string;
        sku: string;
        nameEn: string;
        nameAr: string;
        barcode: string | null;
        product: {
            id: string;
            isActive: boolean;
            slug: string;
            nameEn: string;
            nameAr: string;
            publishedAt: string | null;
        };
    }[];
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    };
}, {
    data: {
        id: string;
        sku: string;
        nameEn: string;
        nameAr: string;
        barcode: string | null;
        product: {
            id: string;
            isActive: boolean;
            slug: string;
            nameEn: string;
            nameAr: string;
            publishedAt: string | null;
        };
    }[];
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    };
}>;
export declare const paginatedStockReservationsSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        orderId: z.ZodString;
        variantId: z.ZodString;
        batchId: z.ZodString;
        quantity: z.ZodNumber;
        status: z.ZodEnum<["ACTIVE", "COMMITTED", "RELEASED", "RESTORED"]>;
        expiresAt: z.ZodString;
        createdAt: z.ZodString;
        variant: z.ZodObject<{
            id: z.ZodString;
            sku: z.ZodString;
            nameEn: z.ZodString;
            nameAr: z.ZodString;
            product: z.ZodObject<{
                id: z.ZodString;
                slug: z.ZodString;
                nameEn: z.ZodString;
                nameAr: z.ZodString;
                isActive: z.ZodBoolean;
                publishedAt: z.ZodNullable<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                id: string;
                isActive: boolean;
                slug: string;
                nameEn: string;
                nameAr: string;
                publishedAt: string | null;
            }, {
                id: string;
                isActive: boolean;
                slug: string;
                nameEn: string;
                nameAr: string;
                publishedAt: string | null;
            }>;
        }, "strip", z.ZodTypeAny, {
            id: string;
            sku: string;
            nameEn: string;
            nameAr: string;
            product: {
                id: string;
                isActive: boolean;
                slug: string;
                nameEn: string;
                nameAr: string;
                publishedAt: string | null;
            };
        }, {
            id: string;
            sku: string;
            nameEn: string;
            nameAr: string;
            product: {
                id: string;
                isActive: boolean;
                slug: string;
                nameEn: string;
                nameAr: string;
                publishedAt: string | null;
            };
        }>;
        batch: z.ZodObject<{
            id: z.ZodString;
            batchNumber: z.ZodString;
            expiresAt: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            id: string;
            expiresAt: string;
            batchNumber: string;
        }, {
            id: string;
            expiresAt: string;
            batchNumber: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        status: "ACTIVE" | "COMMITTED" | "RELEASED" | "RESTORED";
        id: string;
        createdAt: string;
        orderId: string;
        quantity: number;
        variantId: string;
        expiresAt: string;
        variant: {
            id: string;
            sku: string;
            nameEn: string;
            nameAr: string;
            product: {
                id: string;
                isActive: boolean;
                slug: string;
                nameEn: string;
                nameAr: string;
                publishedAt: string | null;
            };
        };
        batchId: string;
        batch: {
            id: string;
            expiresAt: string;
            batchNumber: string;
        };
    }, {
        status: "ACTIVE" | "COMMITTED" | "RELEASED" | "RESTORED";
        id: string;
        createdAt: string;
        orderId: string;
        quantity: number;
        variantId: string;
        expiresAt: string;
        variant: {
            id: string;
            sku: string;
            nameEn: string;
            nameAr: string;
            product: {
                id: string;
                isActive: boolean;
                slug: string;
                nameEn: string;
                nameAr: string;
                publishedAt: string | null;
            };
        };
        batchId: string;
        batch: {
            id: string;
            expiresAt: string;
            batchNumber: string;
        };
    }>, "many">;
    meta: z.ZodObject<{
        page: z.ZodNumber;
        limit: z.ZodNumber;
        total: z.ZodNumber;
        totalPages: z.ZodNumber;
        hasNext: z.ZodBoolean;
        hasPrev: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    }, {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    }>;
}, "strip", z.ZodTypeAny, {
    data: {
        status: "ACTIVE" | "COMMITTED" | "RELEASED" | "RESTORED";
        id: string;
        createdAt: string;
        orderId: string;
        quantity: number;
        variantId: string;
        expiresAt: string;
        variant: {
            id: string;
            sku: string;
            nameEn: string;
            nameAr: string;
            product: {
                id: string;
                isActive: boolean;
                slug: string;
                nameEn: string;
                nameAr: string;
                publishedAt: string | null;
            };
        };
        batchId: string;
        batch: {
            id: string;
            expiresAt: string;
            batchNumber: string;
        };
    }[];
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    };
}, {
    data: {
        status: "ACTIVE" | "COMMITTED" | "RELEASED" | "RESTORED";
        id: string;
        createdAt: string;
        orderId: string;
        quantity: number;
        variantId: string;
        expiresAt: string;
        variant: {
            id: string;
            sku: string;
            nameEn: string;
            nameAr: string;
            product: {
                id: string;
                isActive: boolean;
                slug: string;
                nameEn: string;
                nameAr: string;
                publishedAt: string | null;
            };
        };
        batchId: string;
        batch: {
            id: string;
            expiresAt: string;
            batchNumber: string;
        };
    }[];
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    };
}>;
export declare const receiveInventoryBatchSchema: z.ZodEffects<z.ZodEffects<z.ZodObject<{
    variantId: z.ZodString;
    batchNumber: z.ZodString;
    manufacturedAt: z.ZodOptional<z.ZodDate>;
    expiresAt: z.ZodDate;
    paoMonths: z.ZodOptional<z.ZodNumber>;
    quantity: z.ZodNumber;
    costPrice: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    quantity: number;
    variantId: string;
    expiresAt: Date;
    costPrice: number;
    batchNumber: string;
    manufacturedAt?: Date | undefined;
    paoMonths?: number | undefined;
}, {
    quantity: number;
    variantId: string;
    expiresAt: Date;
    costPrice: number;
    batchNumber: string;
    manufacturedAt?: Date | undefined;
    paoMonths?: number | undefined;
}>, {
    quantity: number;
    variantId: string;
    expiresAt: Date;
    costPrice: number;
    batchNumber: string;
    manufacturedAt?: Date | undefined;
    paoMonths?: number | undefined;
}, {
    quantity: number;
    variantId: string;
    expiresAt: Date;
    costPrice: number;
    batchNumber: string;
    manufacturedAt?: Date | undefined;
    paoMonths?: number | undefined;
}>, {
    quantity: number;
    variantId: string;
    expiresAt: Date;
    costPrice: number;
    batchNumber: string;
    manufacturedAt?: Date | undefined;
    paoMonths?: number | undefined;
}, {
    quantity: number;
    variantId: string;
    expiresAt: Date;
    costPrice: number;
    batchNumber: string;
    manufacturedAt?: Date | undefined;
    paoMonths?: number | undefined;
}>;
export type ReceiveInventoryBatchInput = z.infer<typeof receiveInventoryBatchSchema>;
export declare const adjustInventorySchema: z.ZodObject<{
    batchId: z.ZodString;
    quantityDelta: z.ZodEffects<z.ZodNumber, number, number>;
    reason: z.ZodString;
}, "strip", z.ZodTypeAny, {
    reason: string;
    batchId: string;
    quantityDelta: number;
}, {
    reason: string;
    batchId: string;
    quantityDelta: number;
}>;
export type AdjustInventoryInput = z.infer<typeof adjustInventorySchema>;
export declare const writeOffInventorySchema: z.ZodObject<{
    batchId: z.ZodString;
    quantity: z.ZodNumber;
    reason: z.ZodString;
}, "strip", z.ZodTypeAny, {
    quantity: number;
    reason: string;
    batchId: string;
}, {
    quantity: number;
    reason: string;
    batchId: string;
}>;
export type WriteOffInventoryInput = z.infer<typeof writeOffInventorySchema>;
export declare const inventoryRemovalReasonEnum: z.ZodEnum<["STOCK_CORRECTION", "DAMAGED", "EXPIRED", "LOST_MISSING", "INTERNAL_USE", "SUPPLIER_ISSUE", "OTHER"]>;
export type InventoryRemovalReason = z.infer<typeof inventoryRemovalReasonEnum>;
/**
 * User-facing stock removal command. Batch allocation is automatic (FEFO) by
 * default; batchId is only supplied when an administrator intentionally
 * chooses a specific batch.
 */
export declare const removeInventoryStockSchema: z.ZodEffects<z.ZodObject<{
    variantId: z.ZodString;
    quantity: z.ZodOptional<z.ZodNumber>;
    removeAllAvailable: z.ZodDefault<z.ZodBoolean>;
    reason: z.ZodDefault<z.ZodEnum<["STOCK_CORRECTION", "DAMAGED", "EXPIRED", "LOST_MISSING", "INTERNAL_USE", "SUPPLIER_ISSUE", "OTHER"]>>;
    note: z.ZodOptional<z.ZodString>;
    batchId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    variantId: string;
    reason: "OTHER" | "EXPIRED" | "DAMAGED" | "STOCK_CORRECTION" | "LOST_MISSING" | "INTERNAL_USE" | "SUPPLIER_ISSUE";
    removeAllAvailable: boolean;
    quantity?: number | undefined;
    note?: string | undefined;
    batchId?: string | undefined;
}, {
    variantId: string;
    quantity?: number | undefined;
    reason?: "OTHER" | "EXPIRED" | "DAMAGED" | "STOCK_CORRECTION" | "LOST_MISSING" | "INTERNAL_USE" | "SUPPLIER_ISSUE" | undefined;
    note?: string | undefined;
    batchId?: string | undefined;
    removeAllAvailable?: boolean | undefined;
}>, {
    variantId: string;
    reason: "OTHER" | "EXPIRED" | "DAMAGED" | "STOCK_CORRECTION" | "LOST_MISSING" | "INTERNAL_USE" | "SUPPLIER_ISSUE";
    removeAllAvailable: boolean;
    quantity?: number | undefined;
    note?: string | undefined;
    batchId?: string | undefined;
}, {
    variantId: string;
    quantity?: number | undefined;
    reason?: "OTHER" | "EXPIRED" | "DAMAGED" | "STOCK_CORRECTION" | "LOST_MISSING" | "INTERNAL_USE" | "SUPPLIER_ISSUE" | undefined;
    note?: string | undefined;
    batchId?: string | undefined;
    removeAllAvailable?: boolean | undefined;
}>;
export type RemoveInventoryStockInput = z.infer<typeof removeInventoryStockSchema>;
export declare const inventoryRemovalAllocationSchema: z.ZodObject<{
    batchId: z.ZodString;
    batchNumber: z.ZodString;
    quantity: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    quantity: number;
    batchNumber: string;
    batchId: string;
}, {
    quantity: number;
    batchNumber: string;
    batchId: string;
}>;
export declare const removeInventoryStockResponseSchema: z.ZodObject<{
    variantId: z.ZodString;
    removedQuantity: z.ZodNumber;
    onHand: z.ZodNumber;
    reserved: z.ZodNumber;
    available: z.ZodNumber;
    allocations: z.ZodArray<z.ZodObject<{
        batchId: z.ZodString;
        batchNumber: z.ZodString;
        quantity: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        quantity: number;
        batchNumber: string;
        batchId: string;
    }, {
        quantity: number;
        batchNumber: string;
        batchId: string;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    variantId: string;
    available: number;
    onHand: number;
    reserved: number;
    removedQuantity: number;
    allocations: {
        quantity: number;
        batchNumber: string;
        batchId: string;
    }[];
}, {
    variantId: string;
    available: number;
    onHand: number;
    reserved: number;
    removedQuantity: number;
    allocations: {
        quantity: number;
        batchNumber: string;
        batchId: string;
    }[];
}>;
export type RemoveInventoryStockResponse = z.infer<typeof removeInventoryStockResponseSchema>;
export declare const inventoryMovementQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    sortBy: z.ZodOptional<z.ZodString>;
    sortOrder: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
} & {
    variantId: z.ZodOptional<z.ZodString>;
    search: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    page: number;
    limit: number;
    sortOrder: "asc" | "desc";
    sortBy?: string | undefined;
    search?: string | undefined;
    variantId?: string | undefined;
}, {
    page?: number | undefined;
    limit?: number | undefined;
    sortBy?: string | undefined;
    sortOrder?: "asc" | "desc" | undefined;
    search?: string | undefined;
    variantId?: string | undefined;
}>;
export type InventoryMovementQuery = z.infer<typeof inventoryMovementQuerySchema>;
export declare const inventoryMovementSchema: z.ZodObject<{
    id: z.ZodString;
    variantId: z.ZodString;
    batchId: z.ZodNullable<z.ZodString>;
    batchNumber: z.ZodNullable<z.ZodString>;
    type: z.ZodEnum<["RECEIPT", "RESERVE", "RELEASE", "COMMIT", "ADJUSTMENT", "RETURN", "EXPIRY_WRITE_OFF"]>;
    quantity: z.ZodNumber;
    reason: z.ZodNullable<z.ZodString>;
    createdAt: z.ZodString;
    createdBy: z.ZodNullable<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        name: string;
    }, {
        id: string;
        name: string;
    }>>;
}, "strip", z.ZodTypeAny, {
    type: "RECEIPT" | "RESERVE" | "RELEASE" | "COMMIT" | "ADJUSTMENT" | "RETURN" | "EXPIRY_WRITE_OFF";
    id: string;
    createdAt: string;
    quantity: number;
    variantId: string;
    createdBy: {
        id: string;
        name: string;
    } | null;
    reason: string | null;
    batchNumber: string | null;
    batchId: string | null;
}, {
    type: "RECEIPT" | "RESERVE" | "RELEASE" | "COMMIT" | "ADJUSTMENT" | "RETURN" | "EXPIRY_WRITE_OFF";
    id: string;
    createdAt: string;
    quantity: number;
    variantId: string;
    createdBy: {
        id: string;
        name: string;
    } | null;
    reason: string | null;
    batchNumber: string | null;
    batchId: string | null;
}>;
export declare const paginatedInventoryMovementsSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        variantId: z.ZodString;
        batchId: z.ZodNullable<z.ZodString>;
        batchNumber: z.ZodNullable<z.ZodString>;
        type: z.ZodEnum<["RECEIPT", "RESERVE", "RELEASE", "COMMIT", "ADJUSTMENT", "RETURN", "EXPIRY_WRITE_OFF"]>;
        quantity: z.ZodNumber;
        reason: z.ZodNullable<z.ZodString>;
        createdAt: z.ZodString;
        createdBy: z.ZodNullable<z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            id: string;
            name: string;
        }, {
            id: string;
            name: string;
        }>>;
    }, "strip", z.ZodTypeAny, {
        type: "RECEIPT" | "RESERVE" | "RELEASE" | "COMMIT" | "ADJUSTMENT" | "RETURN" | "EXPIRY_WRITE_OFF";
        id: string;
        createdAt: string;
        quantity: number;
        variantId: string;
        createdBy: {
            id: string;
            name: string;
        } | null;
        reason: string | null;
        batchNumber: string | null;
        batchId: string | null;
    }, {
        type: "RECEIPT" | "RESERVE" | "RELEASE" | "COMMIT" | "ADJUSTMENT" | "RETURN" | "EXPIRY_WRITE_OFF";
        id: string;
        createdAt: string;
        quantity: number;
        variantId: string;
        createdBy: {
            id: string;
            name: string;
        } | null;
        reason: string | null;
        batchNumber: string | null;
        batchId: string | null;
    }>, "many">;
    meta: z.ZodObject<{
        page: z.ZodNumber;
        limit: z.ZodNumber;
        total: z.ZodNumber;
        totalPages: z.ZodNumber;
        hasNext: z.ZodBoolean;
        hasPrev: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    }, {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    }>;
}, "strip", z.ZodTypeAny, {
    data: {
        type: "RECEIPT" | "RESERVE" | "RELEASE" | "COMMIT" | "ADJUSTMENT" | "RETURN" | "EXPIRY_WRITE_OFF";
        id: string;
        createdAt: string;
        quantity: number;
        variantId: string;
        createdBy: {
            id: string;
            name: string;
        } | null;
        reason: string | null;
        batchNumber: string | null;
        batchId: string | null;
    }[];
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    };
}, {
    data: {
        type: "RECEIPT" | "RESERVE" | "RELEASE" | "COMMIT" | "ADJUSTMENT" | "RETURN" | "EXPIRY_WRITE_OFF";
        id: string;
        createdAt: string;
        quantity: number;
        variantId: string;
        createdBy: {
            id: string;
            name: string;
        } | null;
        reason: string | null;
        batchNumber: string | null;
        batchId: string | null;
    }[];
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    };
}>;
export type InventoryMovementResponse = z.infer<typeof inventoryMovementSchema>;
//# sourceMappingURL=inventory.schema.d.ts.map