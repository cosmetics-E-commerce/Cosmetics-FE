import { z } from 'zod';
export declare const skinTypeEnum: z.ZodEnum<["OILY", "DRY", "COMBINATION", "SENSITIVE", "NORMAL", "ALL"]>;
export type SkinType = z.infer<typeof skinTypeEnum>;
export declare const productVariantInputSchema: z.ZodObject<{
    sku: z.ZodString;
    nameEn: z.ZodString;
    nameAr: z.ZodString;
    barcode: z.ZodOptional<z.ZodString>;
    priceOverride: z.ZodOptional<z.ZodNumber>;
    /** Swatch colour for shade variants, e.g. "#C21807". */
    shadeHex: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    sku: string;
    nameEn: string;
    nameAr: string;
    barcode?: string | undefined;
    priceOverride?: number | undefined;
    shadeHex?: string | undefined;
}, {
    sku: string;
    nameEn: string;
    nameAr: string;
    barcode?: string | undefined;
    priceOverride?: number | undefined;
    shadeHex?: string | undefined;
}>;
export type ProductVariantInput = z.infer<typeof productVariantInputSchema>;
export declare const productImageInputSchema: z.ZodObject<{
    objectKey: z.ZodString;
    altText: z.ZodOptional<z.ZodString>;
    sortOrder: z.ZodDefault<z.ZodNumber>;
    isPrimary: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    sortOrder: number;
    objectKey: string;
    isPrimary: boolean;
    altText?: string | undefined;
}, {
    objectKey: string;
    sortOrder?: number | undefined;
    altText?: string | undefined;
    isPrimary?: boolean | undefined;
}>;
export type ProductImageInput = z.infer<typeof productImageInputSchema>;
export declare const createProductSchema: z.ZodEffects<z.ZodObject<{
    categoryId: z.ZodString;
    brandId: z.ZodOptional<z.ZodString>;
    slug: z.ZodOptional<z.ZodString>;
    nameEn: z.ZodString;
    nameAr: z.ZodString;
    descriptionEn: z.ZodOptional<z.ZodString>;
    descriptionAr: z.ZodOptional<z.ZodString>;
    /** Allergen disclosure — a regulatory expectation for cosmetics. */
    ingredients: z.ZodOptional<z.ZodString>;
    howToUse: z.ZodOptional<z.ZodString>;
    skinType: z.ZodDefault<z.ZodArray<z.ZodEnum<["OILY", "DRY", "COMBINATION", "SENSITIVE", "NORMAL", "ALL"]>, "many">>;
    basePrice: z.ZodNumber;
    compareAtPrice: z.ZodOptional<z.ZodNumber>;
    isActive: z.ZodDefault<z.ZodBoolean>;
    publishedAt: z.ZodOptional<z.ZodNullable<z.ZodDate>>;
    variants: z.ZodArray<z.ZodObject<{
        sku: z.ZodString;
        nameEn: z.ZodString;
        nameAr: z.ZodString;
        barcode: z.ZodOptional<z.ZodString>;
        priceOverride: z.ZodOptional<z.ZodNumber>;
        /** Swatch colour for shade variants, e.g. "#C21807". */
        shadeHex: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        sku: string;
        nameEn: string;
        nameAr: string;
        barcode?: string | undefined;
        priceOverride?: number | undefined;
        shadeHex?: string | undefined;
    }, {
        sku: string;
        nameEn: string;
        nameAr: string;
        barcode?: string | undefined;
        priceOverride?: number | undefined;
        shadeHex?: string | undefined;
    }>, "many">;
    images: z.ZodDefault<z.ZodArray<z.ZodObject<{
        objectKey: z.ZodString;
        altText: z.ZodOptional<z.ZodString>;
        sortOrder: z.ZodDefault<z.ZodNumber>;
        isPrimary: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        sortOrder: number;
        objectKey: string;
        isPrimary: boolean;
        altText?: string | undefined;
    }, {
        objectKey: string;
        sortOrder?: number | undefined;
        altText?: string | undefined;
        isPrimary?: boolean | undefined;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    nameEn: string;
    nameAr: string;
    categoryId: string;
    skinType: ("OILY" | "DRY" | "COMBINATION" | "SENSITIVE" | "NORMAL" | "ALL")[];
    basePrice: number;
    isActive: boolean;
    variants: {
        sku: string;
        nameEn: string;
        nameAr: string;
        barcode?: string | undefined;
        priceOverride?: number | undefined;
        shadeHex?: string | undefined;
    }[];
    images: {
        sortOrder: number;
        objectKey: string;
        isPrimary: boolean;
        altText?: string | undefined;
    }[];
    brandId?: string | undefined;
    slug?: string | undefined;
    descriptionEn?: string | undefined;
    descriptionAr?: string | undefined;
    ingredients?: string | undefined;
    howToUse?: string | undefined;
    compareAtPrice?: number | undefined;
    publishedAt?: Date | null | undefined;
}, {
    nameEn: string;
    nameAr: string;
    categoryId: string;
    basePrice: number;
    variants: {
        sku: string;
        nameEn: string;
        nameAr: string;
        barcode?: string | undefined;
        priceOverride?: number | undefined;
        shadeHex?: string | undefined;
    }[];
    brandId?: string | undefined;
    slug?: string | undefined;
    descriptionEn?: string | undefined;
    descriptionAr?: string | undefined;
    ingredients?: string | undefined;
    howToUse?: string | undefined;
    skinType?: ("OILY" | "DRY" | "COMBINATION" | "SENSITIVE" | "NORMAL" | "ALL")[] | undefined;
    compareAtPrice?: number | undefined;
    isActive?: boolean | undefined;
    publishedAt?: Date | null | undefined;
    images?: {
        objectKey: string;
        sortOrder?: number | undefined;
        altText?: string | undefined;
        isPrimary?: boolean | undefined;
    }[] | undefined;
}>, {
    nameEn: string;
    nameAr: string;
    categoryId: string;
    skinType: ("OILY" | "DRY" | "COMBINATION" | "SENSITIVE" | "NORMAL" | "ALL")[];
    basePrice: number;
    isActive: boolean;
    variants: {
        sku: string;
        nameEn: string;
        nameAr: string;
        barcode?: string | undefined;
        priceOverride?: number | undefined;
        shadeHex?: string | undefined;
    }[];
    images: {
        sortOrder: number;
        objectKey: string;
        isPrimary: boolean;
        altText?: string | undefined;
    }[];
    brandId?: string | undefined;
    slug?: string | undefined;
    descriptionEn?: string | undefined;
    descriptionAr?: string | undefined;
    ingredients?: string | undefined;
    howToUse?: string | undefined;
    compareAtPrice?: number | undefined;
    publishedAt?: Date | null | undefined;
}, {
    nameEn: string;
    nameAr: string;
    categoryId: string;
    basePrice: number;
    variants: {
        sku: string;
        nameEn: string;
        nameAr: string;
        barcode?: string | undefined;
        priceOverride?: number | undefined;
        shadeHex?: string | undefined;
    }[];
    brandId?: string | undefined;
    slug?: string | undefined;
    descriptionEn?: string | undefined;
    descriptionAr?: string | undefined;
    ingredients?: string | undefined;
    howToUse?: string | undefined;
    skinType?: ("OILY" | "DRY" | "COMBINATION" | "SENSITIVE" | "NORMAL" | "ALL")[] | undefined;
    compareAtPrice?: number | undefined;
    isActive?: boolean | undefined;
    publishedAt?: Date | null | undefined;
    images?: {
        objectKey: string;
        sortOrder?: number | undefined;
        altText?: string | undefined;
        isPrimary?: boolean | undefined;
    }[] | undefined;
}>;
export type CreateProductInput = z.infer<typeof createProductSchema>;
export declare const productVariantUpdateSchema: z.ZodUnion<[z.ZodObject<{
    sku: z.ZodString;
    nameEn: z.ZodString;
    nameAr: z.ZodString;
    barcode: z.ZodOptional<z.ZodString>;
    priceOverride: z.ZodOptional<z.ZodNumber>;
    /** Swatch colour for shade variants, e.g. "#C21807". */
    shadeHex: z.ZodOptional<z.ZodString>;
} & {
    isActive: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    sku: string;
    nameEn: string;
    nameAr: string;
    barcode?: string | undefined;
    priceOverride?: number | undefined;
    shadeHex?: string | undefined;
    isActive?: boolean | undefined;
}, {
    sku: string;
    nameEn: string;
    nameAr: string;
    barcode?: string | undefined;
    priceOverride?: number | undefined;
    shadeHex?: string | undefined;
    isActive?: boolean | undefined;
}>, z.ZodObject<{
    sku: z.ZodOptional<z.ZodString>;
    nameEn: z.ZodOptional<z.ZodString>;
    nameAr: z.ZodOptional<z.ZodString>;
    barcode: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    priceOverride: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    shadeHex: z.ZodOptional<z.ZodOptional<z.ZodString>>;
} & {
    id: z.ZodString;
    isActive: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    id: string;
    sku?: string | undefined;
    nameEn?: string | undefined;
    nameAr?: string | undefined;
    barcode?: string | undefined;
    priceOverride?: number | undefined;
    shadeHex?: string | undefined;
    isActive?: boolean | undefined;
}, {
    id: string;
    sku?: string | undefined;
    nameEn?: string | undefined;
    nameAr?: string | undefined;
    barcode?: string | undefined;
    priceOverride?: number | undefined;
    shadeHex?: string | undefined;
    isActive?: boolean | undefined;
}>]>;
export type ProductVariantUpdateInput = z.infer<typeof productVariantUpdateSchema>;
export declare const updateProductSchema: z.ZodObject<{
    categoryId: z.ZodOptional<z.ZodString>;
    brandId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    slug: z.ZodOptional<z.ZodString>;
    nameEn: z.ZodOptional<z.ZodString>;
    nameAr: z.ZodOptional<z.ZodString>;
    descriptionEn: z.ZodOptional<z.ZodString>;
    descriptionAr: z.ZodOptional<z.ZodString>;
    ingredients: z.ZodOptional<z.ZodString>;
    howToUse: z.ZodOptional<z.ZodString>;
    skinType: z.ZodOptional<z.ZodArray<z.ZodEnum<["OILY", "DRY", "COMBINATION", "SENSITIVE", "NORMAL", "ALL"]>, "many">>;
    basePrice: z.ZodOptional<z.ZodNumber>;
    compareAtPrice: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    isActive: z.ZodOptional<z.ZodBoolean>;
    publishedAt: z.ZodOptional<z.ZodNullable<z.ZodDate>>;
    variants: z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodObject<{
        sku: z.ZodString;
        nameEn: z.ZodString;
        nameAr: z.ZodString;
        barcode: z.ZodOptional<z.ZodString>;
        priceOverride: z.ZodOptional<z.ZodNumber>;
        /** Swatch colour for shade variants, e.g. "#C21807". */
        shadeHex: z.ZodOptional<z.ZodString>;
    } & {
        isActive: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        sku: string;
        nameEn: string;
        nameAr: string;
        barcode?: string | undefined;
        priceOverride?: number | undefined;
        shadeHex?: string | undefined;
        isActive?: boolean | undefined;
    }, {
        sku: string;
        nameEn: string;
        nameAr: string;
        barcode?: string | undefined;
        priceOverride?: number | undefined;
        shadeHex?: string | undefined;
        isActive?: boolean | undefined;
    }>, z.ZodObject<{
        sku: z.ZodOptional<z.ZodString>;
        nameEn: z.ZodOptional<z.ZodString>;
        nameAr: z.ZodOptional<z.ZodString>;
        barcode: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        priceOverride: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
        shadeHex: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    } & {
        id: z.ZodString;
        isActive: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        sku?: string | undefined;
        nameEn?: string | undefined;
        nameAr?: string | undefined;
        barcode?: string | undefined;
        priceOverride?: number | undefined;
        shadeHex?: string | undefined;
        isActive?: boolean | undefined;
    }, {
        id: string;
        sku?: string | undefined;
        nameEn?: string | undefined;
        nameAr?: string | undefined;
        barcode?: string | undefined;
        priceOverride?: number | undefined;
        shadeHex?: string | undefined;
        isActive?: boolean | undefined;
    }>]>, "many">>;
    images: z.ZodOptional<z.ZodArray<z.ZodObject<{
        objectKey: z.ZodString;
        altText: z.ZodOptional<z.ZodString>;
        sortOrder: z.ZodDefault<z.ZodNumber>;
        isPrimary: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        sortOrder: number;
        objectKey: string;
        isPrimary: boolean;
        altText?: string | undefined;
    }, {
        objectKey: string;
        sortOrder?: number | undefined;
        altText?: string | undefined;
        isPrimary?: boolean | undefined;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    nameEn?: string | undefined;
    nameAr?: string | undefined;
    categoryId?: string | undefined;
    brandId?: string | null | undefined;
    slug?: string | undefined;
    descriptionEn?: string | undefined;
    descriptionAr?: string | undefined;
    ingredients?: string | undefined;
    howToUse?: string | undefined;
    skinType?: ("OILY" | "DRY" | "COMBINATION" | "SENSITIVE" | "NORMAL" | "ALL")[] | undefined;
    basePrice?: number | undefined;
    compareAtPrice?: number | null | undefined;
    isActive?: boolean | undefined;
    publishedAt?: Date | null | undefined;
    variants?: ({
        sku: string;
        nameEn: string;
        nameAr: string;
        barcode?: string | undefined;
        priceOverride?: number | undefined;
        shadeHex?: string | undefined;
        isActive?: boolean | undefined;
    } | {
        id: string;
        sku?: string | undefined;
        nameEn?: string | undefined;
        nameAr?: string | undefined;
        barcode?: string | undefined;
        priceOverride?: number | undefined;
        shadeHex?: string | undefined;
        isActive?: boolean | undefined;
    })[] | undefined;
    images?: {
        sortOrder: number;
        objectKey: string;
        isPrimary: boolean;
        altText?: string | undefined;
    }[] | undefined;
}, {
    nameEn?: string | undefined;
    nameAr?: string | undefined;
    categoryId?: string | undefined;
    brandId?: string | null | undefined;
    slug?: string | undefined;
    descriptionEn?: string | undefined;
    descriptionAr?: string | undefined;
    ingredients?: string | undefined;
    howToUse?: string | undefined;
    skinType?: ("OILY" | "DRY" | "COMBINATION" | "SENSITIVE" | "NORMAL" | "ALL")[] | undefined;
    basePrice?: number | undefined;
    compareAtPrice?: number | null | undefined;
    isActive?: boolean | undefined;
    publishedAt?: Date | null | undefined;
    variants?: ({
        sku: string;
        nameEn: string;
        nameAr: string;
        barcode?: string | undefined;
        priceOverride?: number | undefined;
        shadeHex?: string | undefined;
        isActive?: boolean | undefined;
    } | {
        id: string;
        sku?: string | undefined;
        nameEn?: string | undefined;
        nameAr?: string | undefined;
        barcode?: string | undefined;
        priceOverride?: number | undefined;
        shadeHex?: string | undefined;
        isActive?: boolean | undefined;
    })[] | undefined;
    images?: {
        objectKey: string;
        sortOrder?: number | undefined;
        altText?: string | undefined;
        isPrimary?: boolean | undefined;
    }[] | undefined;
}>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
/** Receiving stock — expiry is mandatory for cosmetics. PLAN.md §10.2. */
export declare const receiveBatchSchema: z.ZodEffects<z.ZodEffects<z.ZodObject<{
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
export type ReceiveBatchInput = z.infer<typeof receiveBatchSchema>;
export declare const publicCatalogQuerySchema: z.ZodEffects<z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    sortOrder: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
} & {
    search: z.ZodOptional<z.ZodString>;
    categorySlug: z.ZodOptional<z.ZodString>;
    brandSlug: z.ZodOptional<z.ZodString>;
    skinType: z.ZodEffects<z.ZodOptional<z.ZodArray<z.ZodEnum<["OILY", "DRY", "COMBINATION", "SENSITIVE", "NORMAL", "ALL"]>, "many">>, ("OILY" | "DRY" | "COMBINATION" | "SENSITIVE" | "NORMAL" | "ALL")[] | undefined, unknown>;
    minPrice: z.ZodOptional<z.ZodNumber>;
    maxPrice: z.ZodOptional<z.ZodNumber>;
    sortBy: z.ZodDefault<z.ZodEnum<["createdAt", "basePrice", "nameEn"]>>;
}, "strip", z.ZodTypeAny, {
    page: number;
    limit: number;
    sortBy: "createdAt" | "nameEn" | "basePrice";
    sortOrder: "asc" | "desc";
    search?: string | undefined;
    skinType?: ("OILY" | "DRY" | "COMBINATION" | "SENSITIVE" | "NORMAL" | "ALL")[] | undefined;
    categorySlug?: string | undefined;
    brandSlug?: string | undefined;
    minPrice?: number | undefined;
    maxPrice?: number | undefined;
}, {
    page?: number | undefined;
    limit?: number | undefined;
    sortBy?: "createdAt" | "nameEn" | "basePrice" | undefined;
    sortOrder?: "asc" | "desc" | undefined;
    search?: string | undefined;
    skinType?: unknown;
    categorySlug?: string | undefined;
    brandSlug?: string | undefined;
    minPrice?: number | undefined;
    maxPrice?: number | undefined;
}>, {
    page: number;
    limit: number;
    sortBy: "createdAt" | "nameEn" | "basePrice";
    sortOrder: "asc" | "desc";
    search?: string | undefined;
    skinType?: ("OILY" | "DRY" | "COMBINATION" | "SENSITIVE" | "NORMAL" | "ALL")[] | undefined;
    categorySlug?: string | undefined;
    brandSlug?: string | undefined;
    minPrice?: number | undefined;
    maxPrice?: number | undefined;
}, {
    page?: number | undefined;
    limit?: number | undefined;
    sortBy?: "createdAt" | "nameEn" | "basePrice" | undefined;
    sortOrder?: "asc" | "desc" | undefined;
    search?: string | undefined;
    skinType?: unknown;
    categorySlug?: string | undefined;
    brandSlug?: string | undefined;
    minPrice?: number | undefined;
    maxPrice?: number | undefined;
}>;
export type PublicCatalogQuery = z.infer<typeof publicCatalogQuerySchema>;
export declare const publicBrandQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    sortOrder: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
} & {
    search: z.ZodOptional<z.ZodString>;
    sortBy: z.ZodDefault<z.ZodEnum<["name", "createdAt"]>>;
}, "strip", z.ZodTypeAny, {
    page: number;
    limit: number;
    sortBy: "createdAt" | "name";
    sortOrder: "asc" | "desc";
    search?: string | undefined;
}, {
    page?: number | undefined;
    limit?: number | undefined;
    sortBy?: "createdAt" | "name" | undefined;
    sortOrder?: "asc" | "desc" | undefined;
    search?: string | undefined;
}>;
export type PublicBrandQuery = z.infer<typeof publicBrandQuerySchema>;
export declare const adminProductQuerySchema: z.ZodEffects<z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    sortOrder: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
} & {
    search: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<["DRAFT", "PUBLISHED", "INACTIVE", "DELETED"]>>;
    categoryId: z.ZodOptional<z.ZodString>;
    categorySlug: z.ZodOptional<z.ZodString>;
    brandId: z.ZodOptional<z.ZodString>;
    brandSlug: z.ZodOptional<z.ZodString>;
    skinType: z.ZodEffects<z.ZodOptional<z.ZodArray<z.ZodEnum<["OILY", "DRY", "COMBINATION", "SENSITIVE", "NORMAL", "ALL"]>, "many">>, ("OILY" | "DRY" | "COMBINATION" | "SENSITIVE" | "NORMAL" | "ALL")[] | undefined, unknown>;
    minPrice: z.ZodOptional<z.ZodNumber>;
    maxPrice: z.ZodOptional<z.ZodNumber>;
    sortBy: z.ZodDefault<z.ZodEnum<["createdAt", "updatedAt", "basePrice", "nameEn"]>>;
}, "strip", z.ZodTypeAny, {
    page: number;
    limit: number;
    sortBy: "createdAt" | "updatedAt" | "nameEn" | "basePrice";
    sortOrder: "asc" | "desc";
    status?: "INACTIVE" | "DELETED" | "DRAFT" | "PUBLISHED" | undefined;
    search?: string | undefined;
    categoryId?: string | undefined;
    brandId?: string | undefined;
    skinType?: ("OILY" | "DRY" | "COMBINATION" | "SENSITIVE" | "NORMAL" | "ALL")[] | undefined;
    categorySlug?: string | undefined;
    brandSlug?: string | undefined;
    minPrice?: number | undefined;
    maxPrice?: number | undefined;
}, {
    status?: "INACTIVE" | "DELETED" | "DRAFT" | "PUBLISHED" | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sortBy?: "createdAt" | "updatedAt" | "nameEn" | "basePrice" | undefined;
    sortOrder?: "asc" | "desc" | undefined;
    search?: string | undefined;
    categoryId?: string | undefined;
    brandId?: string | undefined;
    skinType?: unknown;
    categorySlug?: string | undefined;
    brandSlug?: string | undefined;
    minPrice?: number | undefined;
    maxPrice?: number | undefined;
}>, {
    page: number;
    limit: number;
    sortBy: "createdAt" | "updatedAt" | "nameEn" | "basePrice";
    sortOrder: "asc" | "desc";
    status?: "INACTIVE" | "DELETED" | "DRAFT" | "PUBLISHED" | undefined;
    search?: string | undefined;
    categoryId?: string | undefined;
    brandId?: string | undefined;
    skinType?: ("OILY" | "DRY" | "COMBINATION" | "SENSITIVE" | "NORMAL" | "ALL")[] | undefined;
    categorySlug?: string | undefined;
    brandSlug?: string | undefined;
    minPrice?: number | undefined;
    maxPrice?: number | undefined;
}, {
    status?: "INACTIVE" | "DELETED" | "DRAFT" | "PUBLISHED" | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sortBy?: "createdAt" | "updatedAt" | "nameEn" | "basePrice" | undefined;
    sortOrder?: "asc" | "desc" | undefined;
    search?: string | undefined;
    categoryId?: string | undefined;
    brandId?: string | undefined;
    skinType?: unknown;
    categorySlug?: string | undefined;
    brandSlug?: string | undefined;
    minPrice?: number | undefined;
    maxPrice?: number | undefined;
}>;
export type AdminProductQuery = z.infer<typeof adminProductQuerySchema>;
export declare const publicCategorySchema: z.ZodObject<{
    id: z.ZodString;
    parentId: z.ZodNullable<z.ZodString>;
    slug: z.ZodString;
    nameEn: z.ZodString;
    nameAr: z.ZodString;
    imageUrl: z.ZodNullable<z.ZodString>;
    sortOrder: z.ZodNumber;
    productCount: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    sortOrder: number;
    id: string;
    nameEn: string;
    nameAr: string;
    slug: string;
    parentId: string | null;
    imageUrl: string | null;
    productCount: number;
}, {
    sortOrder: number;
    id: string;
    nameEn: string;
    nameAr: string;
    slug: string;
    parentId: string | null;
    imageUrl: string | null;
    productCount: number;
}>;
export type PublicCategoryResponse = z.infer<typeof publicCategorySchema>;
export declare const createCategorySchema: z.ZodObject<{
    parentId: z.ZodOptional<z.ZodString>;
    slug: z.ZodOptional<z.ZodString>;
    nameEn: z.ZodString;
    nameAr: z.ZodString;
    imageKey: z.ZodOptional<z.ZodString>;
    sortOrder: z.ZodDefault<z.ZodNumber>;
    isActive: z.ZodDefault<z.ZodBoolean>;
}, "strict", z.ZodTypeAny, {
    sortOrder: number;
    nameEn: string;
    nameAr: string;
    isActive: boolean;
    slug?: string | undefined;
    parentId?: string | undefined;
    imageKey?: string | undefined;
}, {
    nameEn: string;
    nameAr: string;
    sortOrder?: number | undefined;
    slug?: string | undefined;
    isActive?: boolean | undefined;
    parentId?: string | undefined;
    imageKey?: string | undefined;
}>;
export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export declare const publicBrandSchema: z.ZodObject<{
    id: z.ZodString;
    slug: z.ZodString;
    name: z.ZodString;
    logoUrl: z.ZodNullable<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id: string;
    name: string;
    slug: string;
    logoUrl: string | null;
}, {
    id: string;
    name: string;
    slug: string;
    logoUrl: string | null;
}>;
export type PublicBrandResponse = z.infer<typeof publicBrandSchema>;
export declare const publicBrandListItemSchema: z.ZodObject<{
    id: z.ZodString;
    slug: z.ZodString;
    name: z.ZodString;
    logoUrl: z.ZodNullable<z.ZodString>;
} & {
    productCount: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    id: string;
    name: string;
    slug: string;
    productCount: number;
    logoUrl: string | null;
}, {
    id: string;
    name: string;
    slug: string;
    productCount: number;
    logoUrl: string | null;
}>;
export type PublicBrandListItemResponse = z.infer<typeof publicBrandListItemSchema>;
export declare const createBrandSchema: z.ZodObject<{
    slug: z.ZodOptional<z.ZodString>;
    name: z.ZodString;
    logoKey: z.ZodOptional<z.ZodString>;
    isActive: z.ZodDefault<z.ZodBoolean>;
}, "strict", z.ZodTypeAny, {
    name: string;
    isActive: boolean;
    slug?: string | undefined;
    logoKey?: string | undefined;
}, {
    name: string;
    slug?: string | undefined;
    isActive?: boolean | undefined;
    logoKey?: string | undefined;
}>;
export type CreateBrandInput = z.infer<typeof createBrandSchema>;
export declare const publicProductImageSchema: z.ZodObject<{
    id: z.ZodString;
    url: z.ZodString;
    altText: z.ZodNullable<z.ZodString>;
    sortOrder: z.ZodNumber;
    isPrimary: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    sortOrder: number;
    id: string;
    altText: string | null;
    isPrimary: boolean;
    url: string;
}, {
    sortOrder: number;
    id: string;
    altText: string | null;
    isPrimary: boolean;
    url: string;
}>;
export type PublicProductImageResponse = z.infer<typeof publicProductImageSchema>;
export declare const publicProductVariantSchema: z.ZodObject<{
    id: z.ZodString;
    sku: z.ZodString;
    nameEn: z.ZodString;
    nameAr: z.ZodString;
    price: z.ZodNumber;
    shadeHex: z.ZodNullable<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id: string;
    sku: string;
    nameEn: string;
    nameAr: string;
    shadeHex: string | null;
    price: number;
}, {
    id: string;
    sku: string;
    nameEn: string;
    nameAr: string;
    shadeHex: string | null;
    price: number;
}>;
export type PublicProductVariantResponse = z.infer<typeof publicProductVariantSchema>;
export declare const publicProductSchema: z.ZodObject<{
    id: z.ZodString;
    slug: z.ZodString;
    nameEn: z.ZodString;
    nameAr: z.ZodString;
    descriptionEn: z.ZodNullable<z.ZodString>;
    descriptionAr: z.ZodNullable<z.ZodString>;
    ingredients: z.ZodNullable<z.ZodString>;
    howToUse: z.ZodNullable<z.ZodString>;
    skinType: z.ZodArray<z.ZodEnum<["OILY", "DRY", "COMBINATION", "SENSITIVE", "NORMAL", "ALL"]>, "many">;
    basePrice: z.ZodNumber;
    compareAtPrice: z.ZodNullable<z.ZodNumber>;
    imageUrl: z.ZodNullable<z.ZodString>;
    category: z.ZodObject<Omit<{
        id: z.ZodString;
        parentId: z.ZodNullable<z.ZodString>;
        slug: z.ZodString;
        nameEn: z.ZodString;
        nameAr: z.ZodString;
        imageUrl: z.ZodNullable<z.ZodString>;
        sortOrder: z.ZodNumber;
        productCount: z.ZodNumber;
    }, "productCount">, "strip", z.ZodTypeAny, {
        sortOrder: number;
        id: string;
        nameEn: string;
        nameAr: string;
        slug: string;
        parentId: string | null;
        imageUrl: string | null;
    }, {
        sortOrder: number;
        id: string;
        nameEn: string;
        nameAr: string;
        slug: string;
        parentId: string | null;
        imageUrl: string | null;
    }>;
    brand: z.ZodNullable<z.ZodObject<{
        id: z.ZodString;
        slug: z.ZodString;
        name: z.ZodString;
        logoUrl: z.ZodNullable<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        name: string;
        slug: string;
        logoUrl: string | null;
    }, {
        id: string;
        name: string;
        slug: string;
        logoUrl: string | null;
    }>>;
    variants: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        sku: z.ZodString;
        nameEn: z.ZodString;
        nameAr: z.ZodString;
        price: z.ZodNumber;
        shadeHex: z.ZodNullable<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        sku: string;
        nameEn: string;
        nameAr: string;
        shadeHex: string | null;
        price: number;
    }, {
        id: string;
        sku: string;
        nameEn: string;
        nameAr: string;
        shadeHex: string | null;
        price: number;
    }>, "many">;
    images: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        url: z.ZodString;
        altText: z.ZodNullable<z.ZodString>;
        sortOrder: z.ZodNumber;
        isPrimary: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        sortOrder: number;
        id: string;
        altText: string | null;
        isPrimary: boolean;
        url: string;
    }, {
        sortOrder: number;
        id: string;
        altText: string | null;
        isPrimary: boolean;
        url: string;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    id: string;
    nameEn: string;
    nameAr: string;
    slug: string;
    descriptionEn: string | null;
    descriptionAr: string | null;
    ingredients: string | null;
    howToUse: string | null;
    skinType: ("OILY" | "DRY" | "COMBINATION" | "SENSITIVE" | "NORMAL" | "ALL")[];
    basePrice: number;
    compareAtPrice: number | null;
    variants: {
        id: string;
        sku: string;
        nameEn: string;
        nameAr: string;
        shadeHex: string | null;
        price: number;
    }[];
    images: {
        sortOrder: number;
        id: string;
        altText: string | null;
        isPrimary: boolean;
        url: string;
    }[];
    imageUrl: string | null;
    category: {
        sortOrder: number;
        id: string;
        nameEn: string;
        nameAr: string;
        slug: string;
        parentId: string | null;
        imageUrl: string | null;
    };
    brand: {
        id: string;
        name: string;
        slug: string;
        logoUrl: string | null;
    } | null;
}, {
    id: string;
    nameEn: string;
    nameAr: string;
    slug: string;
    descriptionEn: string | null;
    descriptionAr: string | null;
    ingredients: string | null;
    howToUse: string | null;
    skinType: ("OILY" | "DRY" | "COMBINATION" | "SENSITIVE" | "NORMAL" | "ALL")[];
    basePrice: number;
    compareAtPrice: number | null;
    variants: {
        id: string;
        sku: string;
        nameEn: string;
        nameAr: string;
        shadeHex: string | null;
        price: number;
    }[];
    images: {
        sortOrder: number;
        id: string;
        altText: string | null;
        isPrimary: boolean;
        url: string;
    }[];
    imageUrl: string | null;
    category: {
        sortOrder: number;
        id: string;
        nameEn: string;
        nameAr: string;
        slug: string;
        parentId: string | null;
        imageUrl: string | null;
    };
    brand: {
        id: string;
        name: string;
        slug: string;
        logoUrl: string | null;
    } | null;
}>;
export type PublicProductResponse = z.infer<typeof publicProductSchema>;
export declare const adminProductVariantSchema: z.ZodObject<{
    id: z.ZodString;
    sku: z.ZodString;
    nameEn: z.ZodString;
    nameAr: z.ZodString;
    price: z.ZodNumber;
    shadeHex: z.ZodNullable<z.ZodString>;
} & {
    barcode: z.ZodNullable<z.ZodString>;
    priceOverride: z.ZodNullable<z.ZodNumber>;
    isActive: z.ZodBoolean;
    createdAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: string;
    createdAt: Date;
    sku: string;
    nameEn: string;
    nameAr: string;
    barcode: string | null;
    priceOverride: number | null;
    shadeHex: string | null;
    isActive: boolean;
    price: number;
}, {
    id: string;
    createdAt: Date;
    sku: string;
    nameEn: string;
    nameAr: string;
    barcode: string | null;
    priceOverride: number | null;
    shadeHex: string | null;
    isActive: boolean;
    price: number;
}>;
export type AdminProductVariantResponse = z.infer<typeof adminProductVariantSchema>;
export declare const adminProductImageSchema: z.ZodObject<{
    id: z.ZodString;
    url: z.ZodString;
    altText: z.ZodNullable<z.ZodString>;
    sortOrder: z.ZodNumber;
    isPrimary: z.ZodBoolean;
} & {
    objectKey: z.ZodString;
}, "strip", z.ZodTypeAny, {
    sortOrder: number;
    id: string;
    objectKey: string;
    altText: string | null;
    isPrimary: boolean;
    url: string;
}, {
    sortOrder: number;
    id: string;
    objectKey: string;
    altText: string | null;
    isPrimary: boolean;
    url: string;
}>;
export type AdminProductImageResponse = z.infer<typeof adminProductImageSchema>;
export declare const adminProductSchema: z.ZodObject<{
    id: z.ZodString;
    slug: z.ZodString;
    nameEn: z.ZodString;
    nameAr: z.ZodString;
    descriptionEn: z.ZodNullable<z.ZodString>;
    descriptionAr: z.ZodNullable<z.ZodString>;
    ingredients: z.ZodNullable<z.ZodString>;
    howToUse: z.ZodNullable<z.ZodString>;
    skinType: z.ZodArray<z.ZodEnum<["OILY", "DRY", "COMBINATION", "SENSITIVE", "NORMAL", "ALL"]>, "many">;
    basePrice: z.ZodNumber;
    compareAtPrice: z.ZodNullable<z.ZodNumber>;
    imageUrl: z.ZodNullable<z.ZodString>;
    category: z.ZodObject<Omit<{
        id: z.ZodString;
        parentId: z.ZodNullable<z.ZodString>;
        slug: z.ZodString;
        nameEn: z.ZodString;
        nameAr: z.ZodString;
        imageUrl: z.ZodNullable<z.ZodString>;
        sortOrder: z.ZodNumber;
        productCount: z.ZodNumber;
    }, "productCount">, "strip", z.ZodTypeAny, {
        sortOrder: number;
        id: string;
        nameEn: string;
        nameAr: string;
        slug: string;
        parentId: string | null;
        imageUrl: string | null;
    }, {
        sortOrder: number;
        id: string;
        nameEn: string;
        nameAr: string;
        slug: string;
        parentId: string | null;
        imageUrl: string | null;
    }>;
    brand: z.ZodNullable<z.ZodObject<{
        id: z.ZodString;
        slug: z.ZodString;
        name: z.ZodString;
        logoUrl: z.ZodNullable<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        name: string;
        slug: string;
        logoUrl: string | null;
    }, {
        id: string;
        name: string;
        slug: string;
        logoUrl: string | null;
    }>>;
} & {
    isActive: z.ZodBoolean;
    publishedAt: z.ZodNullable<z.ZodDate>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    deletedAt: z.ZodNullable<z.ZodDate>;
    variants: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        sku: z.ZodString;
        nameEn: z.ZodString;
        nameAr: z.ZodString;
        price: z.ZodNumber;
        shadeHex: z.ZodNullable<z.ZodString>;
    } & {
        barcode: z.ZodNullable<z.ZodString>;
        priceOverride: z.ZodNullable<z.ZodNumber>;
        isActive: z.ZodBoolean;
        createdAt: z.ZodDate;
    }, "strip", z.ZodTypeAny, {
        id: string;
        createdAt: Date;
        sku: string;
        nameEn: string;
        nameAr: string;
        barcode: string | null;
        priceOverride: number | null;
        shadeHex: string | null;
        isActive: boolean;
        price: number;
    }, {
        id: string;
        createdAt: Date;
        sku: string;
        nameEn: string;
        nameAr: string;
        barcode: string | null;
        priceOverride: number | null;
        shadeHex: string | null;
        isActive: boolean;
        price: number;
    }>, "many">;
    images: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        url: z.ZodString;
        altText: z.ZodNullable<z.ZodString>;
        sortOrder: z.ZodNumber;
        isPrimary: z.ZodBoolean;
    } & {
        objectKey: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        sortOrder: number;
        id: string;
        objectKey: string;
        altText: string | null;
        isPrimary: boolean;
        url: string;
    }, {
        sortOrder: number;
        id: string;
        objectKey: string;
        altText: string | null;
        isPrimary: boolean;
        url: string;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    nameEn: string;
    nameAr: string;
    slug: string;
    descriptionEn: string | null;
    descriptionAr: string | null;
    ingredients: string | null;
    howToUse: string | null;
    skinType: ("OILY" | "DRY" | "COMBINATION" | "SENSITIVE" | "NORMAL" | "ALL")[];
    basePrice: number;
    compareAtPrice: number | null;
    isActive: boolean;
    publishedAt: Date | null;
    variants: {
        id: string;
        createdAt: Date;
        sku: string;
        nameEn: string;
        nameAr: string;
        barcode: string | null;
        priceOverride: number | null;
        shadeHex: string | null;
        isActive: boolean;
        price: number;
    }[];
    images: {
        sortOrder: number;
        id: string;
        objectKey: string;
        altText: string | null;
        isPrimary: boolean;
        url: string;
    }[];
    imageUrl: string | null;
    category: {
        sortOrder: number;
        id: string;
        nameEn: string;
        nameAr: string;
        slug: string;
        parentId: string | null;
        imageUrl: string | null;
    };
    brand: {
        id: string;
        name: string;
        slug: string;
        logoUrl: string | null;
    } | null;
}, {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    nameEn: string;
    nameAr: string;
    slug: string;
    descriptionEn: string | null;
    descriptionAr: string | null;
    ingredients: string | null;
    howToUse: string | null;
    skinType: ("OILY" | "DRY" | "COMBINATION" | "SENSITIVE" | "NORMAL" | "ALL")[];
    basePrice: number;
    compareAtPrice: number | null;
    isActive: boolean;
    publishedAt: Date | null;
    variants: {
        id: string;
        createdAt: Date;
        sku: string;
        nameEn: string;
        nameAr: string;
        barcode: string | null;
        priceOverride: number | null;
        shadeHex: string | null;
        isActive: boolean;
        price: number;
    }[];
    images: {
        sortOrder: number;
        id: string;
        objectKey: string;
        altText: string | null;
        isPrimary: boolean;
        url: string;
    }[];
    imageUrl: string | null;
    category: {
        sortOrder: number;
        id: string;
        nameEn: string;
        nameAr: string;
        slug: string;
        parentId: string | null;
        imageUrl: string | null;
    };
    brand: {
        id: string;
        name: string;
        slug: string;
        logoUrl: string | null;
    } | null;
}>;
export type AdminProductResponse = z.infer<typeof adminProductSchema>;
//# sourceMappingURL=product.schema.d.ts.map