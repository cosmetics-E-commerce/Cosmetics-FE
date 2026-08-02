import { z } from 'zod';
export declare const reservationStatusEnum: z.ZodEnum<["ACTIVE", "COMMITTED", "RELEASED"]>;
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
    sortBy: "sku" | "available" | "productName" | "nextExpiryAt";
    sortOrder: "asc" | "desc";
    status?: "OUT_OF_STOCK" | "IN_STOCK" | "LOW_STOCK" | undefined;
    search?: string | undefined;
    categoryId?: string | undefined;
    brandId?: string | undefined;
}, {
    status?: "OUT_OF_STOCK" | "IN_STOCK" | "LOW_STOCK" | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sortBy?: "sku" | "available" | "productName" | "nextExpiryAt" | undefined;
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
    sortBy: "batchNumber" | "expiresAt" | "available" | "receivedAt";
    sortOrder: "asc" | "desc";
    status?: "AVAILABLE" | "DEPLETED" | "EXPIRED" | undefined;
    search?: string | undefined;
    variantId?: string | undefined;
}, {
    status?: "AVAILABLE" | "DEPLETED" | "EXPIRED" | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sortBy?: "batchNumber" | "expiresAt" | "available" | "receivedAt" | undefined;
    sortOrder?: "asc" | "desc" | undefined;
    search?: string | undefined;
    variantId?: string | undefined;
}>;
export type InventoryBatchQuery = z.infer<typeof inventoryBatchQuerySchema>;
export declare const stockReservationQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    sortOrder: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
} & {
    search: z.ZodOptional<z.ZodString>;
    variantId: z.ZodOptional<z.ZodString>;
    orderId: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<["ACTIVE", "COMMITTED", "RELEASED"]>>;
    sortBy: z.ZodDefault<z.ZodEnum<["createdAt", "expiresAt", "quantity"]>>;
}, "strip", z.ZodTypeAny, {
    page: number;
    limit: number;
    sortBy: "createdAt" | "quantity" | "expiresAt";
    sortOrder: "asc" | "desc";
    status?: "ACTIVE" | "COMMITTED" | "RELEASED" | undefined;
    search?: string | undefined;
    variantId?: string | undefined;
    orderId?: string | undefined;
}, {
    status?: "ACTIVE" | "COMMITTED" | "RELEASED" | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sortBy?: "createdAt" | "quantity" | "expiresAt" | undefined;
    sortOrder?: "asc" | "desc" | undefined;
    search?: string | undefined;
    variantId?: string | undefined;
    orderId?: string | undefined;
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
    nameEn: string;
    nameAr: string;
    slug: string;
    isActive: boolean;
    publishedAt: string | null;
}, {
    id: string;
    nameEn: string;
    nameAr: string;
    slug: string;
    isActive: boolean;
    publishedAt: string | null;
}>;
export declare const inventoryCategorySummarySchema: z.ZodObject<{
    id: z.ZodString;
    slug: z.ZodString;
    nameEn: z.ZodString;
    nameAr: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    nameEn: string;
    nameAr: string;
    slug: string;
}, {
    id: string;
    nameEn: string;
    nameAr: string;
    slug: string;
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
        nameEn: string;
        nameAr: string;
        slug: string;
        isActive: boolean;
        publishedAt: string | null;
    }, {
        id: string;
        nameEn: string;
        nameAr: string;
        slug: string;
        isActive: boolean;
        publishedAt: string | null;
    }>;
    category: z.ZodObject<{
        id: z.ZodString;
        slug: z.ZodString;
        nameEn: z.ZodString;
        nameAr: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        nameEn: string;
        nameAr: string;
        slug: string;
    }, {
        id: string;
        nameEn: string;
        nameAr: string;
        slug: string;
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
        nameEn: string;
        nameAr: string;
        slug: string;
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
        nameEn: string;
        nameAr: string;
        slug: string;
        isActive: boolean;
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
        nameEn: string;
        nameAr: string;
        slug: string;
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
        nameEn: string;
        nameAr: string;
        slug: string;
        isActive: boolean;
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
            nameEn: string;
            nameAr: string;
            slug: string;
            isActive: boolean;
            publishedAt: string | null;
        }, {
            id: string;
            nameEn: string;
            nameAr: string;
            slug: string;
            isActive: boolean;
            publishedAt: string | null;
        }>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        sku: string;
        nameEn: string;
        nameAr: string;
        product: {
            id: string;
            nameEn: string;
            nameAr: string;
            slug: string;
            isActive: boolean;
            publishedAt: string | null;
        };
    }, {
        id: string;
        sku: string;
        nameEn: string;
        nameAr: string;
        product: {
            id: string;
            nameEn: string;
            nameAr: string;
            slug: string;
            isActive: boolean;
            publishedAt: string | null;
        };
    }>;
}, "strip", z.ZodTypeAny, {
    id: string;
    variantId: string;
    batchNumber: string;
    manufacturedAt: string | null;
    expiresAt: string;
    paoMonths: number | null;
    costPrice: number;
    available: number;
    receivedAt: string;
    quantityOnHand: number;
    quantityReserved: number;
    variant: {
        id: string;
        sku: string;
        nameEn: string;
        nameAr: string;
        product: {
            id: string;
            nameEn: string;
            nameAr: string;
            slug: string;
            isActive: boolean;
            publishedAt: string | null;
        };
    };
}, {
    id: string;
    variantId: string;
    batchNumber: string;
    manufacturedAt: string | null;
    expiresAt: string;
    paoMonths: number | null;
    costPrice: number;
    available: number;
    receivedAt: string;
    quantityOnHand: number;
    quantityReserved: number;
    variant: {
        id: string;
        sku: string;
        nameEn: string;
        nameAr: string;
        product: {
            id: string;
            nameEn: string;
            nameAr: string;
            slug: string;
            isActive: boolean;
            publishedAt: string | null;
        };
    };
}>;
export type InventoryBatchResponse = z.infer<typeof inventoryBatchSchema>;
export declare const stockReservationSchema: z.ZodObject<{
    id: z.ZodString;
    orderId: z.ZodString;
    variantId: z.ZodString;
    batchId: z.ZodString;
    quantity: z.ZodNumber;
    status: z.ZodEnum<["ACTIVE", "COMMITTED", "RELEASED"]>;
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
            nameEn: string;
            nameAr: string;
            slug: string;
            isActive: boolean;
            publishedAt: string | null;
        }, {
            id: string;
            nameEn: string;
            nameAr: string;
            slug: string;
            isActive: boolean;
            publishedAt: string | null;
        }>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        sku: string;
        nameEn: string;
        nameAr: string;
        product: {
            id: string;
            nameEn: string;
            nameAr: string;
            slug: string;
            isActive: boolean;
            publishedAt: string | null;
        };
    }, {
        id: string;
        sku: string;
        nameEn: string;
        nameAr: string;
        product: {
            id: string;
            nameEn: string;
            nameAr: string;
            slug: string;
            isActive: boolean;
            publishedAt: string | null;
        };
    }>;
    batch: z.ZodObject<{
        id: z.ZodString;
        batchNumber: z.ZodString;
        expiresAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        batchNumber: string;
        expiresAt: string;
    }, {
        id: string;
        batchNumber: string;
        expiresAt: string;
    }>;
}, "strip", z.ZodTypeAny, {
    status: "ACTIVE" | "COMMITTED" | "RELEASED";
    id: string;
    createdAt: string;
    variantId: string;
    quantity: number;
    expiresAt: string;
    orderId: string;
    variant: {
        id: string;
        sku: string;
        nameEn: string;
        nameAr: string;
        product: {
            id: string;
            nameEn: string;
            nameAr: string;
            slug: string;
            isActive: boolean;
            publishedAt: string | null;
        };
    };
    batchId: string;
    batch: {
        id: string;
        batchNumber: string;
        expiresAt: string;
    };
}, {
    status: "ACTIVE" | "COMMITTED" | "RELEASED";
    id: string;
    createdAt: string;
    variantId: string;
    quantity: number;
    expiresAt: string;
    orderId: string;
    variant: {
        id: string;
        sku: string;
        nameEn: string;
        nameAr: string;
        product: {
            id: string;
            nameEn: string;
            nameAr: string;
            slug: string;
            isActive: boolean;
            publishedAt: string | null;
        };
    };
    batchId: string;
    batch: {
        id: string;
        batchNumber: string;
        expiresAt: string;
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
            nameEn: string;
            nameAr: string;
            slug: string;
            isActive: boolean;
            publishedAt: string | null;
        }, {
            id: string;
            nameEn: string;
            nameAr: string;
            slug: string;
            isActive: boolean;
            publishedAt: string | null;
        }>;
        category: z.ZodObject<{
            id: z.ZodString;
            slug: z.ZodString;
            nameEn: z.ZodString;
            nameAr: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            id: string;
            nameEn: string;
            nameAr: string;
            slug: string;
        }, {
            id: string;
            nameEn: string;
            nameAr: string;
            slug: string;
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
            nameEn: string;
            nameAr: string;
            slug: string;
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
            nameEn: string;
            nameAr: string;
            slug: string;
            isActive: boolean;
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
            nameEn: string;
            nameAr: string;
            slug: string;
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
            nameEn: string;
            nameAr: string;
            slug: string;
            isActive: boolean;
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
            nameEn: string;
            nameAr: string;
            slug: string;
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
            nameEn: string;
            nameAr: string;
            slug: string;
            isActive: boolean;
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
            nameEn: string;
            nameAr: string;
            slug: string;
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
            nameEn: string;
            nameAr: string;
            slug: string;
            isActive: boolean;
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
                nameEn: string;
                nameAr: string;
                slug: string;
                isActive: boolean;
                publishedAt: string | null;
            }, {
                id: string;
                nameEn: string;
                nameAr: string;
                slug: string;
                isActive: boolean;
                publishedAt: string | null;
            }>;
        }, "strip", z.ZodTypeAny, {
            id: string;
            sku: string;
            nameEn: string;
            nameAr: string;
            product: {
                id: string;
                nameEn: string;
                nameAr: string;
                slug: string;
                isActive: boolean;
                publishedAt: string | null;
            };
        }, {
            id: string;
            sku: string;
            nameEn: string;
            nameAr: string;
            product: {
                id: string;
                nameEn: string;
                nameAr: string;
                slug: string;
                isActive: boolean;
                publishedAt: string | null;
            };
        }>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        variantId: string;
        batchNumber: string;
        manufacturedAt: string | null;
        expiresAt: string;
        paoMonths: number | null;
        costPrice: number;
        available: number;
        receivedAt: string;
        quantityOnHand: number;
        quantityReserved: number;
        variant: {
            id: string;
            sku: string;
            nameEn: string;
            nameAr: string;
            product: {
                id: string;
                nameEn: string;
                nameAr: string;
                slug: string;
                isActive: boolean;
                publishedAt: string | null;
            };
        };
    }, {
        id: string;
        variantId: string;
        batchNumber: string;
        manufacturedAt: string | null;
        expiresAt: string;
        paoMonths: number | null;
        costPrice: number;
        available: number;
        receivedAt: string;
        quantityOnHand: number;
        quantityReserved: number;
        variant: {
            id: string;
            sku: string;
            nameEn: string;
            nameAr: string;
            product: {
                id: string;
                nameEn: string;
                nameAr: string;
                slug: string;
                isActive: boolean;
                publishedAt: string | null;
            };
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
        variantId: string;
        batchNumber: string;
        manufacturedAt: string | null;
        expiresAt: string;
        paoMonths: number | null;
        costPrice: number;
        available: number;
        receivedAt: string;
        quantityOnHand: number;
        quantityReserved: number;
        variant: {
            id: string;
            sku: string;
            nameEn: string;
            nameAr: string;
            product: {
                id: string;
                nameEn: string;
                nameAr: string;
                slug: string;
                isActive: boolean;
                publishedAt: string | null;
            };
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
        variantId: string;
        batchNumber: string;
        manufacturedAt: string | null;
        expiresAt: string;
        paoMonths: number | null;
        costPrice: number;
        available: number;
        receivedAt: string;
        quantityOnHand: number;
        quantityReserved: number;
        variant: {
            id: string;
            sku: string;
            nameEn: string;
            nameAr: string;
            product: {
                id: string;
                nameEn: string;
                nameAr: string;
                slug: string;
                isActive: boolean;
                publishedAt: string | null;
            };
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
        status: z.ZodEnum<["ACTIVE", "COMMITTED", "RELEASED"]>;
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
                nameEn: string;
                nameAr: string;
                slug: string;
                isActive: boolean;
                publishedAt: string | null;
            }, {
                id: string;
                nameEn: string;
                nameAr: string;
                slug: string;
                isActive: boolean;
                publishedAt: string | null;
            }>;
        }, "strip", z.ZodTypeAny, {
            id: string;
            sku: string;
            nameEn: string;
            nameAr: string;
            product: {
                id: string;
                nameEn: string;
                nameAr: string;
                slug: string;
                isActive: boolean;
                publishedAt: string | null;
            };
        }, {
            id: string;
            sku: string;
            nameEn: string;
            nameAr: string;
            product: {
                id: string;
                nameEn: string;
                nameAr: string;
                slug: string;
                isActive: boolean;
                publishedAt: string | null;
            };
        }>;
        batch: z.ZodObject<{
            id: z.ZodString;
            batchNumber: z.ZodString;
            expiresAt: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            id: string;
            batchNumber: string;
            expiresAt: string;
        }, {
            id: string;
            batchNumber: string;
            expiresAt: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        status: "ACTIVE" | "COMMITTED" | "RELEASED";
        id: string;
        createdAt: string;
        variantId: string;
        quantity: number;
        expiresAt: string;
        orderId: string;
        variant: {
            id: string;
            sku: string;
            nameEn: string;
            nameAr: string;
            product: {
                id: string;
                nameEn: string;
                nameAr: string;
                slug: string;
                isActive: boolean;
                publishedAt: string | null;
            };
        };
        batchId: string;
        batch: {
            id: string;
            batchNumber: string;
            expiresAt: string;
        };
    }, {
        status: "ACTIVE" | "COMMITTED" | "RELEASED";
        id: string;
        createdAt: string;
        variantId: string;
        quantity: number;
        expiresAt: string;
        orderId: string;
        variant: {
            id: string;
            sku: string;
            nameEn: string;
            nameAr: string;
            product: {
                id: string;
                nameEn: string;
                nameAr: string;
                slug: string;
                isActive: boolean;
                publishedAt: string | null;
            };
        };
        batchId: string;
        batch: {
            id: string;
            batchNumber: string;
            expiresAt: string;
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
        status: "ACTIVE" | "COMMITTED" | "RELEASED";
        id: string;
        createdAt: string;
        variantId: string;
        quantity: number;
        expiresAt: string;
        orderId: string;
        variant: {
            id: string;
            sku: string;
            nameEn: string;
            nameAr: string;
            product: {
                id: string;
                nameEn: string;
                nameAr: string;
                slug: string;
                isActive: boolean;
                publishedAt: string | null;
            };
        };
        batchId: string;
        batch: {
            id: string;
            batchNumber: string;
            expiresAt: string;
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
        status: "ACTIVE" | "COMMITTED" | "RELEASED";
        id: string;
        createdAt: string;
        variantId: string;
        quantity: number;
        expiresAt: string;
        orderId: string;
        variant: {
            id: string;
            sku: string;
            nameEn: string;
            nameAr: string;
            product: {
                id: string;
                nameEn: string;
                nameAr: string;
                slug: string;
                isActive: boolean;
                publishedAt: string | null;
            };
        };
        batchId: string;
        batch: {
            id: string;
            batchNumber: string;
            expiresAt: string;
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
    variantId: string;
    quantity: number;
    batchNumber: string;
    expiresAt: Date;
    costPrice: number;
    manufacturedAt?: Date | undefined;
    paoMonths?: number | undefined;
}, {
    variantId: string;
    quantity: number;
    batchNumber: string;
    expiresAt: Date;
    costPrice: number;
    manufacturedAt?: Date | undefined;
    paoMonths?: number | undefined;
}>, {
    variantId: string;
    quantity: number;
    batchNumber: string;
    expiresAt: Date;
    costPrice: number;
    manufacturedAt?: Date | undefined;
    paoMonths?: number | undefined;
}, {
    variantId: string;
    quantity: number;
    batchNumber: string;
    expiresAt: Date;
    costPrice: number;
    manufacturedAt?: Date | undefined;
    paoMonths?: number | undefined;
}>, {
    variantId: string;
    quantity: number;
    batchNumber: string;
    expiresAt: Date;
    costPrice: number;
    manufacturedAt?: Date | undefined;
    paoMonths?: number | undefined;
}, {
    variantId: string;
    quantity: number;
    batchNumber: string;
    expiresAt: Date;
    costPrice: number;
    manufacturedAt?: Date | undefined;
    paoMonths?: number | undefined;
}>;
export type ReceiveInventoryBatchInput = z.infer<typeof receiveInventoryBatchSchema>;
//# sourceMappingURL=inventory.schema.d.ts.map