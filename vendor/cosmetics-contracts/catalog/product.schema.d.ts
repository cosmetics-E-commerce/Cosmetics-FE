import { z } from "zod";
export declare const skinTypeEnum: z.ZodEnum<["OILY", "DRY", "COMBINATION", "SENSITIVE", "NORMAL", "ALL"]>;
export type SkinType = z.infer<typeof skinTypeEnum>;
export declare const PRODUCT_GALLERY_LIMIT = 20;
export declare const PRODUCT_OPTION_LIMIT = 4;
export declare const PRODUCT_OPTION_VALUE_LIMIT = 20;
export declare const PRODUCT_VARIANT_LIMIT = 200;
export declare const variantOpeningStockSchema: z.ZodEffects<z.ZodObject<{
    quantity: z.ZodNumber;
    expiresAt: z.ZodDate;
    costPrice: z.ZodNumber;
    batchNumber: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    quantity: number;
    expiresAt: Date;
    costPrice: number;
    batchNumber?: string | undefined;
}, {
    quantity: number;
    expiresAt: Date;
    costPrice: number;
    batchNumber?: string | undefined;
}>, {
    quantity: number;
    expiresAt: Date;
    costPrice: number;
    batchNumber?: string | undefined;
}, {
    quantity: number;
    expiresAt: Date;
    costPrice: number;
    batchNumber?: string | undefined;
}>;
export type VariantOpeningStockInput = z.infer<typeof variantOpeningStockSchema>;
export declare const productVariantInputSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    sku: z.ZodString;
    nameEn: z.ZodString;
    nameAr: z.ZodString;
    barcode: z.ZodOptional<z.ZodString>;
    priceOverride: z.ZodOptional<z.ZodNumber>;
    compareAtPrice: z.ZodOptional<z.ZodNumber>;
    optionValueIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    /** Swatch colour for shade variants, e.g. "#C21807". */
    shadeHex: z.ZodOptional<z.ZodString>;
    /** Optional first receipt for a newly created variant. Uses the inventory batch ledger. */
    openingStock: z.ZodOptional<z.ZodEffects<z.ZodObject<{
        quantity: z.ZodNumber;
        expiresAt: z.ZodDate;
        costPrice: z.ZodNumber;
        batchNumber: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        quantity: number;
        expiresAt: Date;
        costPrice: number;
        batchNumber?: string | undefined;
    }, {
        quantity: number;
        expiresAt: Date;
        costPrice: number;
        batchNumber?: string | undefined;
    }>, {
        quantity: number;
        expiresAt: Date;
        costPrice: number;
        batchNumber?: string | undefined;
    }, {
        quantity: number;
        expiresAt: Date;
        costPrice: number;
        batchNumber?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    sku: string;
    nameEn: string;
    nameAr: string;
    id?: string | undefined;
    barcode?: string | undefined;
    priceOverride?: number | undefined;
    compareAtPrice?: number | undefined;
    optionValueIds?: string[] | undefined;
    shadeHex?: string | undefined;
    openingStock?: {
        quantity: number;
        expiresAt: Date;
        costPrice: number;
        batchNumber?: string | undefined;
    } | undefined;
}, {
    sku: string;
    nameEn: string;
    nameAr: string;
    id?: string | undefined;
    barcode?: string | undefined;
    priceOverride?: number | undefined;
    compareAtPrice?: number | undefined;
    optionValueIds?: string[] | undefined;
    shadeHex?: string | undefined;
    openingStock?: {
        quantity: number;
        expiresAt: Date;
        costPrice: number;
        batchNumber?: string | undefined;
    } | undefined;
}>;
export type ProductVariantInput = z.infer<typeof productVariantInputSchema>;
export declare const productImageInputSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    variantId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    objectKey: z.ZodEffects<z.ZodString, string, string>;
    altText: z.ZodOptional<z.ZodString>;
    sortOrder: z.ZodDefault<z.ZodNumber>;
    isPrimary: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    sortOrder: number;
    objectKey: string;
    isPrimary: boolean;
    id?: string | undefined;
    variantId?: string | null | undefined;
    altText?: string | undefined;
}, {
    objectKey: string;
    sortOrder?: number | undefined;
    id?: string | undefined;
    variantId?: string | null | undefined;
    altText?: string | undefined;
    isPrimary?: boolean | undefined;
}>;
export type ProductImageInput = z.infer<typeof productImageInputSchema>;
export declare const productOptionValueInputSchema: z.ZodObject<{
    id: z.ZodString;
    valueEn: z.ZodString;
    valueAr: z.ZodString;
    position: z.ZodNumber;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull]>>>;
}, "strip", z.ZodTypeAny, {
    id: string;
    valueEn: string;
    valueAr: string;
    position: number;
    metadata?: Record<string, string | number | boolean | null> | undefined;
}, {
    id: string;
    valueEn: string;
    valueAr: string;
    position: number;
    metadata?: Record<string, string | number | boolean | null> | undefined;
}>;
export type ProductOptionValueInput = z.infer<typeof productOptionValueInputSchema>;
export declare const productOptionInputSchema: z.ZodObject<{
    id: z.ZodString;
    nameEn: z.ZodString;
    nameAr: z.ZodString;
    position: z.ZodNumber;
    values: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        valueEn: z.ZodString;
        valueAr: z.ZodString;
        position: z.ZodNumber;
        metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull]>>>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        valueEn: string;
        valueAr: string;
        position: number;
        metadata?: Record<string, string | number | boolean | null> | undefined;
    }, {
        id: string;
        valueEn: string;
        valueAr: string;
        position: number;
        metadata?: Record<string, string | number | boolean | null> | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    values: {
        id: string;
        valueEn: string;
        valueAr: string;
        position: number;
        metadata?: Record<string, string | number | boolean | null> | undefined;
    }[];
    id: string;
    position: number;
    nameEn: string;
    nameAr: string;
}, {
    values: {
        id: string;
        valueEn: string;
        valueAr: string;
        position: number;
        metadata?: Record<string, string | number | boolean | null> | undefined;
    }[];
    id: string;
    position: number;
    nameEn: string;
    nameAr: string;
}>;
export type ProductOptionInput = z.infer<typeof productOptionInputSchema>;
/**
 * Physical shipping attributes. Optional because a product can be catalogued
 * before it has been weighed — the package calculator falls back to configured
 * defaults, so an unmeasured product still quotes rather than failing checkout.
 */
export declare const productDimensionsInputSchema: {
    /** Kilograms. */
    weight: z.ZodOptional<z.ZodNumber>;
    /** Centimetres. */
    height: z.ZodOptional<z.ZodNumber>;
    width: z.ZodOptional<z.ZodNumber>;
    length: z.ZodOptional<z.ZodNumber>;
};
export declare const createProductSchema: z.ZodEffects<z.ZodObject<{
    categoryId: z.ZodString;
    brandId: z.ZodOptional<z.ZodString>;
    slug: z.ZodOptional<z.ZodString>;
    nameEn: z.ZodString;
    nameAr: z.ZodString;
    shortDescriptionEn: z.ZodOptional<z.ZodString>;
    shortDescriptionAr: z.ZodOptional<z.ZodString>;
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
        id: z.ZodOptional<z.ZodString>;
        sku: z.ZodString;
        nameEn: z.ZodString;
        nameAr: z.ZodString;
        barcode: z.ZodOptional<z.ZodString>;
        priceOverride: z.ZodOptional<z.ZodNumber>;
        compareAtPrice: z.ZodOptional<z.ZodNumber>;
        optionValueIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        /** Swatch colour for shade variants, e.g. "#C21807". */
        shadeHex: z.ZodOptional<z.ZodString>;
        /** Optional first receipt for a newly created variant. Uses the inventory batch ledger. */
        openingStock: z.ZodOptional<z.ZodEffects<z.ZodObject<{
            quantity: z.ZodNumber;
            expiresAt: z.ZodDate;
            costPrice: z.ZodNumber;
            batchNumber: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            quantity: number;
            expiresAt: Date;
            costPrice: number;
            batchNumber?: string | undefined;
        }, {
            quantity: number;
            expiresAt: Date;
            costPrice: number;
            batchNumber?: string | undefined;
        }>, {
            quantity: number;
            expiresAt: Date;
            costPrice: number;
            batchNumber?: string | undefined;
        }, {
            quantity: number;
            expiresAt: Date;
            costPrice: number;
            batchNumber?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        sku: string;
        nameEn: string;
        nameAr: string;
        id?: string | undefined;
        barcode?: string | undefined;
        priceOverride?: number | undefined;
        compareAtPrice?: number | undefined;
        optionValueIds?: string[] | undefined;
        shadeHex?: string | undefined;
        openingStock?: {
            quantity: number;
            expiresAt: Date;
            costPrice: number;
            batchNumber?: string | undefined;
        } | undefined;
    }, {
        sku: string;
        nameEn: string;
        nameAr: string;
        id?: string | undefined;
        barcode?: string | undefined;
        priceOverride?: number | undefined;
        compareAtPrice?: number | undefined;
        optionValueIds?: string[] | undefined;
        shadeHex?: string | undefined;
        openingStock?: {
            quantity: number;
            expiresAt: Date;
            costPrice: number;
            batchNumber?: string | undefined;
        } | undefined;
    }>, "many">;
    options: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        nameEn: z.ZodString;
        nameAr: z.ZodString;
        position: z.ZodNumber;
        values: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            valueEn: z.ZodString;
            valueAr: z.ZodString;
            position: z.ZodNumber;
            metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull]>>>;
        }, "strip", z.ZodTypeAny, {
            id: string;
            valueEn: string;
            valueAr: string;
            position: number;
            metadata?: Record<string, string | number | boolean | null> | undefined;
        }, {
            id: string;
            valueEn: string;
            valueAr: string;
            position: number;
            metadata?: Record<string, string | number | boolean | null> | undefined;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        values: {
            id: string;
            valueEn: string;
            valueAr: string;
            position: number;
            metadata?: Record<string, string | number | boolean | null> | undefined;
        }[];
        id: string;
        position: number;
        nameEn: string;
        nameAr: string;
    }, {
        values: {
            id: string;
            valueEn: string;
            valueAr: string;
            position: number;
            metadata?: Record<string, string | number | boolean | null> | undefined;
        }[];
        id: string;
        position: number;
        nameEn: string;
        nameAr: string;
    }>, "many">>;
    images: z.ZodDefault<z.ZodArray<z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        variantId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        objectKey: z.ZodEffects<z.ZodString, string, string>;
        altText: z.ZodOptional<z.ZodString>;
        sortOrder: z.ZodDefault<z.ZodNumber>;
        isPrimary: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        sortOrder: number;
        objectKey: string;
        isPrimary: boolean;
        id?: string | undefined;
        variantId?: string | null | undefined;
        altText?: string | undefined;
    }, {
        objectKey: string;
        sortOrder?: number | undefined;
        id?: string | undefined;
        variantId?: string | null | undefined;
        altText?: string | undefined;
        isPrimary?: boolean | undefined;
    }>, "many">>;
    ingredientLinks: z.ZodOptional<z.ZodArray<z.ZodObject<{
        ingredientId: z.ZodString;
        position: z.ZodOptional<z.ZodNumber>;
        concentration: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        concentrationUnit: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        notes: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        ingredientId: string;
        notes?: string | null | undefined;
        position?: number | undefined;
        concentration?: string | null | undefined;
        concentrationUnit?: string | null | undefined;
    }, {
        ingredientId: string;
        notes?: string | null | undefined;
        position?: number | undefined;
        concentration?: string | null | undefined;
        concentrationUnit?: string | null | undefined;
    }>, "many">>;
    /** Kilograms. */
    weight: z.ZodOptional<z.ZodNumber>;
    /** Centimetres. */
    height: z.ZodOptional<z.ZodNumber>;
    width: z.ZodOptional<z.ZodNumber>;
    length: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    isActive: boolean;
    nameEn: string;
    nameAr: string;
    categoryId: string;
    skinType: ("OILY" | "DRY" | "COMBINATION" | "SENSITIVE" | "NORMAL" | "ALL")[];
    basePrice: number;
    variants: {
        sku: string;
        nameEn: string;
        nameAr: string;
        id?: string | undefined;
        barcode?: string | undefined;
        priceOverride?: number | undefined;
        compareAtPrice?: number | undefined;
        optionValueIds?: string[] | undefined;
        shadeHex?: string | undefined;
        openingStock?: {
            quantity: number;
            expiresAt: Date;
            costPrice: number;
            batchNumber?: string | undefined;
        } | undefined;
    }[];
    images: {
        sortOrder: number;
        objectKey: string;
        isPrimary: boolean;
        id?: string | undefined;
        variantId?: string | null | undefined;
        altText?: string | undefined;
    }[];
    length?: number | undefined;
    options?: {
        values: {
            id: string;
            valueEn: string;
            valueAr: string;
            position: number;
            metadata?: Record<string, string | number | boolean | null> | undefined;
        }[];
        id: string;
        position: number;
        nameEn: string;
        nameAr: string;
    }[] | undefined;
    width?: number | undefined;
    height?: number | undefined;
    weight?: number | undefined;
    slug?: string | undefined;
    descriptionEn?: string | undefined;
    descriptionAr?: string | undefined;
    shortDescriptionEn?: string | undefined;
    shortDescriptionAr?: string | undefined;
    compareAtPrice?: number | undefined;
    brandId?: string | undefined;
    ingredients?: string | undefined;
    howToUse?: string | undefined;
    publishedAt?: Date | null | undefined;
    ingredientLinks?: {
        ingredientId: string;
        notes?: string | null | undefined;
        position?: number | undefined;
        concentration?: string | null | undefined;
        concentrationUnit?: string | null | undefined;
    }[] | undefined;
}, {
    nameEn: string;
    nameAr: string;
    categoryId: string;
    basePrice: number;
    variants: {
        sku: string;
        nameEn: string;
        nameAr: string;
        id?: string | undefined;
        barcode?: string | undefined;
        priceOverride?: number | undefined;
        compareAtPrice?: number | undefined;
        optionValueIds?: string[] | undefined;
        shadeHex?: string | undefined;
        openingStock?: {
            quantity: number;
            expiresAt: Date;
            costPrice: number;
            batchNumber?: string | undefined;
        } | undefined;
    }[];
    length?: number | undefined;
    options?: {
        values: {
            id: string;
            valueEn: string;
            valueAr: string;
            position: number;
            metadata?: Record<string, string | number | boolean | null> | undefined;
        }[];
        id: string;
        position: number;
        nameEn: string;
        nameAr: string;
    }[] | undefined;
    width?: number | undefined;
    height?: number | undefined;
    weight?: number | undefined;
    isActive?: boolean | undefined;
    slug?: string | undefined;
    descriptionEn?: string | undefined;
    descriptionAr?: string | undefined;
    shortDescriptionEn?: string | undefined;
    shortDescriptionAr?: string | undefined;
    compareAtPrice?: number | undefined;
    brandId?: string | undefined;
    ingredients?: string | undefined;
    howToUse?: string | undefined;
    skinType?: ("OILY" | "DRY" | "COMBINATION" | "SENSITIVE" | "NORMAL" | "ALL")[] | undefined;
    publishedAt?: Date | null | undefined;
    images?: {
        objectKey: string;
        sortOrder?: number | undefined;
        id?: string | undefined;
        variantId?: string | null | undefined;
        altText?: string | undefined;
        isPrimary?: boolean | undefined;
    }[] | undefined;
    ingredientLinks?: {
        ingredientId: string;
        notes?: string | null | undefined;
        position?: number | undefined;
        concentration?: string | null | undefined;
        concentrationUnit?: string | null | undefined;
    }[] | undefined;
}>, {
    isActive: boolean;
    nameEn: string;
    nameAr: string;
    categoryId: string;
    skinType: ("OILY" | "DRY" | "COMBINATION" | "SENSITIVE" | "NORMAL" | "ALL")[];
    basePrice: number;
    variants: {
        sku: string;
        nameEn: string;
        nameAr: string;
        id?: string | undefined;
        barcode?: string | undefined;
        priceOverride?: number | undefined;
        compareAtPrice?: number | undefined;
        optionValueIds?: string[] | undefined;
        shadeHex?: string | undefined;
        openingStock?: {
            quantity: number;
            expiresAt: Date;
            costPrice: number;
            batchNumber?: string | undefined;
        } | undefined;
    }[];
    images: {
        sortOrder: number;
        objectKey: string;
        isPrimary: boolean;
        id?: string | undefined;
        variantId?: string | null | undefined;
        altText?: string | undefined;
    }[];
    length?: number | undefined;
    options?: {
        values: {
            id: string;
            valueEn: string;
            valueAr: string;
            position: number;
            metadata?: Record<string, string | number | boolean | null> | undefined;
        }[];
        id: string;
        position: number;
        nameEn: string;
        nameAr: string;
    }[] | undefined;
    width?: number | undefined;
    height?: number | undefined;
    weight?: number | undefined;
    slug?: string | undefined;
    descriptionEn?: string | undefined;
    descriptionAr?: string | undefined;
    shortDescriptionEn?: string | undefined;
    shortDescriptionAr?: string | undefined;
    compareAtPrice?: number | undefined;
    brandId?: string | undefined;
    ingredients?: string | undefined;
    howToUse?: string | undefined;
    publishedAt?: Date | null | undefined;
    ingredientLinks?: {
        ingredientId: string;
        notes?: string | null | undefined;
        position?: number | undefined;
        concentration?: string | null | undefined;
        concentrationUnit?: string | null | undefined;
    }[] | undefined;
}, {
    nameEn: string;
    nameAr: string;
    categoryId: string;
    basePrice: number;
    variants: {
        sku: string;
        nameEn: string;
        nameAr: string;
        id?: string | undefined;
        barcode?: string | undefined;
        priceOverride?: number | undefined;
        compareAtPrice?: number | undefined;
        optionValueIds?: string[] | undefined;
        shadeHex?: string | undefined;
        openingStock?: {
            quantity: number;
            expiresAt: Date;
            costPrice: number;
            batchNumber?: string | undefined;
        } | undefined;
    }[];
    length?: number | undefined;
    options?: {
        values: {
            id: string;
            valueEn: string;
            valueAr: string;
            position: number;
            metadata?: Record<string, string | number | boolean | null> | undefined;
        }[];
        id: string;
        position: number;
        nameEn: string;
        nameAr: string;
    }[] | undefined;
    width?: number | undefined;
    height?: number | undefined;
    weight?: number | undefined;
    isActive?: boolean | undefined;
    slug?: string | undefined;
    descriptionEn?: string | undefined;
    descriptionAr?: string | undefined;
    shortDescriptionEn?: string | undefined;
    shortDescriptionAr?: string | undefined;
    compareAtPrice?: number | undefined;
    brandId?: string | undefined;
    ingredients?: string | undefined;
    howToUse?: string | undefined;
    skinType?: ("OILY" | "DRY" | "COMBINATION" | "SENSITIVE" | "NORMAL" | "ALL")[] | undefined;
    publishedAt?: Date | null | undefined;
    images?: {
        objectKey: string;
        sortOrder?: number | undefined;
        id?: string | undefined;
        variantId?: string | null | undefined;
        altText?: string | undefined;
        isPrimary?: boolean | undefined;
    }[] | undefined;
    ingredientLinks?: {
        ingredientId: string;
        notes?: string | null | undefined;
        position?: number | undefined;
        concentration?: string | null | undefined;
        concentrationUnit?: string | null | undefined;
    }[] | undefined;
}>;
export type CreateProductInput = z.infer<typeof createProductSchema>;
export declare const productVariantUpdateSchema: z.ZodUnion<[z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    sku: z.ZodString;
    nameEn: z.ZodString;
    nameAr: z.ZodString;
    barcode: z.ZodOptional<z.ZodString>;
    priceOverride: z.ZodOptional<z.ZodNumber>;
    compareAtPrice: z.ZodOptional<z.ZodNumber>;
    optionValueIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    /** Swatch colour for shade variants, e.g. "#C21807". */
    shadeHex: z.ZodOptional<z.ZodString>;
    /** Optional first receipt for a newly created variant. Uses the inventory batch ledger. */
    openingStock: z.ZodOptional<z.ZodEffects<z.ZodObject<{
        quantity: z.ZodNumber;
        expiresAt: z.ZodDate;
        costPrice: z.ZodNumber;
        batchNumber: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        quantity: number;
        expiresAt: Date;
        costPrice: number;
        batchNumber?: string | undefined;
    }, {
        quantity: number;
        expiresAt: Date;
        costPrice: number;
        batchNumber?: string | undefined;
    }>, {
        quantity: number;
        expiresAt: Date;
        costPrice: number;
        batchNumber?: string | undefined;
    }, {
        quantity: number;
        expiresAt: Date;
        costPrice: number;
        batchNumber?: string | undefined;
    }>>;
} & {
    isActive: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    sku: string;
    nameEn: string;
    nameAr: string;
    id?: string | undefined;
    isActive?: boolean | undefined;
    barcode?: string | undefined;
    priceOverride?: number | undefined;
    compareAtPrice?: number | undefined;
    optionValueIds?: string[] | undefined;
    shadeHex?: string | undefined;
    openingStock?: {
        quantity: number;
        expiresAt: Date;
        costPrice: number;
        batchNumber?: string | undefined;
    } | undefined;
}, {
    sku: string;
    nameEn: string;
    nameAr: string;
    id?: string | undefined;
    isActive?: boolean | undefined;
    barcode?: string | undefined;
    priceOverride?: number | undefined;
    compareAtPrice?: number | undefined;
    optionValueIds?: string[] | undefined;
    shadeHex?: string | undefined;
    openingStock?: {
        quantity: number;
        expiresAt: Date;
        costPrice: number;
        batchNumber?: string | undefined;
    } | undefined;
}>, z.ZodObject<{
    sku: z.ZodOptional<z.ZodString>;
    nameEn: z.ZodOptional<z.ZodString>;
    nameAr: z.ZodOptional<z.ZodString>;
    optionValueIds: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
    openingStock: z.ZodOptional<z.ZodOptional<z.ZodEffects<z.ZodObject<{
        quantity: z.ZodNumber;
        expiresAt: z.ZodDate;
        costPrice: z.ZodNumber;
        batchNumber: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        quantity: number;
        expiresAt: Date;
        costPrice: number;
        batchNumber?: string | undefined;
    }, {
        quantity: number;
        expiresAt: Date;
        costPrice: number;
        batchNumber?: string | undefined;
    }>, {
        quantity: number;
        expiresAt: Date;
        costPrice: number;
        batchNumber?: string | undefined;
    }, {
        quantity: number;
        expiresAt: Date;
        costPrice: number;
        batchNumber?: string | undefined;
    }>>>;
} & {
    id: z.ZodString;
    barcode: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    priceOverride: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    compareAtPrice: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    shadeHex: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    isActive: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    id: string;
    sku?: string | undefined;
    isActive?: boolean | undefined;
    nameEn?: string | undefined;
    nameAr?: string | undefined;
    barcode?: string | null | undefined;
    priceOverride?: number | null | undefined;
    compareAtPrice?: number | null | undefined;
    optionValueIds?: string[] | undefined;
    shadeHex?: string | null | undefined;
    openingStock?: {
        quantity: number;
        expiresAt: Date;
        costPrice: number;
        batchNumber?: string | undefined;
    } | undefined;
}, {
    id: string;
    sku?: string | undefined;
    isActive?: boolean | undefined;
    nameEn?: string | undefined;
    nameAr?: string | undefined;
    barcode?: string | null | undefined;
    priceOverride?: number | null | undefined;
    compareAtPrice?: number | null | undefined;
    optionValueIds?: string[] | undefined;
    shadeHex?: string | null | undefined;
    openingStock?: {
        quantity: number;
        expiresAt: Date;
        costPrice: number;
        batchNumber?: string | undefined;
    } | undefined;
}>]>;
export type ProductVariantUpdateInput = z.infer<typeof productVariantUpdateSchema>;
export declare const updateProductSchema: z.ZodObject<{
    categoryId: z.ZodOptional<z.ZodString>;
    brandId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    slug: z.ZodOptional<z.ZodString>;
    nameEn: z.ZodOptional<z.ZodString>;
    nameAr: z.ZodOptional<z.ZodString>;
    shortDescriptionEn: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    shortDescriptionAr: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    descriptionEn: z.ZodOptional<z.ZodString>;
    descriptionAr: z.ZodOptional<z.ZodString>;
    ingredients: z.ZodOptional<z.ZodString>;
    howToUse: z.ZodOptional<z.ZodString>;
    skinType: z.ZodOptional<z.ZodArray<z.ZodEnum<["OILY", "DRY", "COMBINATION", "SENSITIVE", "NORMAL", "ALL"]>, "many">>;
    basePrice: z.ZodOptional<z.ZodNumber>;
    compareAtPrice: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    weight: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    height: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    width: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    length: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    isActive: z.ZodOptional<z.ZodBoolean>;
    publishedAt: z.ZodOptional<z.ZodNullable<z.ZodDate>>;
    options: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        nameEn: z.ZodString;
        nameAr: z.ZodString;
        position: z.ZodNumber;
        values: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            valueEn: z.ZodString;
            valueAr: z.ZodString;
            position: z.ZodNumber;
            metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull]>>>;
        }, "strip", z.ZodTypeAny, {
            id: string;
            valueEn: string;
            valueAr: string;
            position: number;
            metadata?: Record<string, string | number | boolean | null> | undefined;
        }, {
            id: string;
            valueEn: string;
            valueAr: string;
            position: number;
            metadata?: Record<string, string | number | boolean | null> | undefined;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        values: {
            id: string;
            valueEn: string;
            valueAr: string;
            position: number;
            metadata?: Record<string, string | number | boolean | null> | undefined;
        }[];
        id: string;
        position: number;
        nameEn: string;
        nameAr: string;
    }, {
        values: {
            id: string;
            valueEn: string;
            valueAr: string;
            position: number;
            metadata?: Record<string, string | number | boolean | null> | undefined;
        }[];
        id: string;
        position: number;
        nameEn: string;
        nameAr: string;
    }>, "many">>;
    variants: z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        sku: z.ZodString;
        nameEn: z.ZodString;
        nameAr: z.ZodString;
        barcode: z.ZodOptional<z.ZodString>;
        priceOverride: z.ZodOptional<z.ZodNumber>;
        compareAtPrice: z.ZodOptional<z.ZodNumber>;
        optionValueIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        /** Swatch colour for shade variants, e.g. "#C21807". */
        shadeHex: z.ZodOptional<z.ZodString>;
        /** Optional first receipt for a newly created variant. Uses the inventory batch ledger. */
        openingStock: z.ZodOptional<z.ZodEffects<z.ZodObject<{
            quantity: z.ZodNumber;
            expiresAt: z.ZodDate;
            costPrice: z.ZodNumber;
            batchNumber: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            quantity: number;
            expiresAt: Date;
            costPrice: number;
            batchNumber?: string | undefined;
        }, {
            quantity: number;
            expiresAt: Date;
            costPrice: number;
            batchNumber?: string | undefined;
        }>, {
            quantity: number;
            expiresAt: Date;
            costPrice: number;
            batchNumber?: string | undefined;
        }, {
            quantity: number;
            expiresAt: Date;
            costPrice: number;
            batchNumber?: string | undefined;
        }>>;
    } & {
        isActive: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        sku: string;
        nameEn: string;
        nameAr: string;
        id?: string | undefined;
        isActive?: boolean | undefined;
        barcode?: string | undefined;
        priceOverride?: number | undefined;
        compareAtPrice?: number | undefined;
        optionValueIds?: string[] | undefined;
        shadeHex?: string | undefined;
        openingStock?: {
            quantity: number;
            expiresAt: Date;
            costPrice: number;
            batchNumber?: string | undefined;
        } | undefined;
    }, {
        sku: string;
        nameEn: string;
        nameAr: string;
        id?: string | undefined;
        isActive?: boolean | undefined;
        barcode?: string | undefined;
        priceOverride?: number | undefined;
        compareAtPrice?: number | undefined;
        optionValueIds?: string[] | undefined;
        shadeHex?: string | undefined;
        openingStock?: {
            quantity: number;
            expiresAt: Date;
            costPrice: number;
            batchNumber?: string | undefined;
        } | undefined;
    }>, z.ZodObject<{
        sku: z.ZodOptional<z.ZodString>;
        nameEn: z.ZodOptional<z.ZodString>;
        nameAr: z.ZodOptional<z.ZodString>;
        optionValueIds: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>;
        openingStock: z.ZodOptional<z.ZodOptional<z.ZodEffects<z.ZodObject<{
            quantity: z.ZodNumber;
            expiresAt: z.ZodDate;
            costPrice: z.ZodNumber;
            batchNumber: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            quantity: number;
            expiresAt: Date;
            costPrice: number;
            batchNumber?: string | undefined;
        }, {
            quantity: number;
            expiresAt: Date;
            costPrice: number;
            batchNumber?: string | undefined;
        }>, {
            quantity: number;
            expiresAt: Date;
            costPrice: number;
            batchNumber?: string | undefined;
        }, {
            quantity: number;
            expiresAt: Date;
            costPrice: number;
            batchNumber?: string | undefined;
        }>>>;
    } & {
        id: z.ZodString;
        barcode: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        priceOverride: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        compareAtPrice: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        shadeHex: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        isActive: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        sku?: string | undefined;
        isActive?: boolean | undefined;
        nameEn?: string | undefined;
        nameAr?: string | undefined;
        barcode?: string | null | undefined;
        priceOverride?: number | null | undefined;
        compareAtPrice?: number | null | undefined;
        optionValueIds?: string[] | undefined;
        shadeHex?: string | null | undefined;
        openingStock?: {
            quantity: number;
            expiresAt: Date;
            costPrice: number;
            batchNumber?: string | undefined;
        } | undefined;
    }, {
        id: string;
        sku?: string | undefined;
        isActive?: boolean | undefined;
        nameEn?: string | undefined;
        nameAr?: string | undefined;
        barcode?: string | null | undefined;
        priceOverride?: number | null | undefined;
        compareAtPrice?: number | null | undefined;
        optionValueIds?: string[] | undefined;
        shadeHex?: string | null | undefined;
        openingStock?: {
            quantity: number;
            expiresAt: Date;
            costPrice: number;
            batchNumber?: string | undefined;
        } | undefined;
    }>]>, "many">>;
    images: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        variantId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        objectKey: z.ZodEffects<z.ZodString, string, string>;
        altText: z.ZodOptional<z.ZodString>;
        sortOrder: z.ZodDefault<z.ZodNumber>;
        isPrimary: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        sortOrder: number;
        objectKey: string;
        isPrimary: boolean;
        id?: string | undefined;
        variantId?: string | null | undefined;
        altText?: string | undefined;
    }, {
        objectKey: string;
        sortOrder?: number | undefined;
        id?: string | undefined;
        variantId?: string | null | undefined;
        altText?: string | undefined;
        isPrimary?: boolean | undefined;
    }>, "many">>;
    ingredientLinks: z.ZodOptional<z.ZodArray<z.ZodObject<{
        ingredientId: z.ZodString;
        position: z.ZodOptional<z.ZodNumber>;
        concentration: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        concentrationUnit: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        notes: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        ingredientId: string;
        notes?: string | null | undefined;
        position?: number | undefined;
        concentration?: string | null | undefined;
        concentrationUnit?: string | null | undefined;
    }, {
        ingredientId: string;
        notes?: string | null | undefined;
        position?: number | undefined;
        concentration?: string | null | undefined;
        concentrationUnit?: string | null | undefined;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    length?: number | null | undefined;
    options?: {
        values: {
            id: string;
            valueEn: string;
            valueAr: string;
            position: number;
            metadata?: Record<string, string | number | boolean | null> | undefined;
        }[];
        id: string;
        position: number;
        nameEn: string;
        nameAr: string;
    }[] | undefined;
    width?: number | null | undefined;
    height?: number | null | undefined;
    weight?: number | null | undefined;
    isActive?: boolean | undefined;
    slug?: string | undefined;
    descriptionEn?: string | undefined;
    descriptionAr?: string | undefined;
    shortDescriptionEn?: string | null | undefined;
    shortDescriptionAr?: string | null | undefined;
    nameEn?: string | undefined;
    nameAr?: string | undefined;
    compareAtPrice?: number | null | undefined;
    categoryId?: string | undefined;
    brandId?: string | null | undefined;
    ingredients?: string | undefined;
    howToUse?: string | undefined;
    skinType?: ("OILY" | "DRY" | "COMBINATION" | "SENSITIVE" | "NORMAL" | "ALL")[] | undefined;
    basePrice?: number | undefined;
    publishedAt?: Date | null | undefined;
    variants?: ({
        sku: string;
        nameEn: string;
        nameAr: string;
        id?: string | undefined;
        isActive?: boolean | undefined;
        barcode?: string | undefined;
        priceOverride?: number | undefined;
        compareAtPrice?: number | undefined;
        optionValueIds?: string[] | undefined;
        shadeHex?: string | undefined;
        openingStock?: {
            quantity: number;
            expiresAt: Date;
            costPrice: number;
            batchNumber?: string | undefined;
        } | undefined;
    } | {
        id: string;
        sku?: string | undefined;
        isActive?: boolean | undefined;
        nameEn?: string | undefined;
        nameAr?: string | undefined;
        barcode?: string | null | undefined;
        priceOverride?: number | null | undefined;
        compareAtPrice?: number | null | undefined;
        optionValueIds?: string[] | undefined;
        shadeHex?: string | null | undefined;
        openingStock?: {
            quantity: number;
            expiresAt: Date;
            costPrice: number;
            batchNumber?: string | undefined;
        } | undefined;
    })[] | undefined;
    images?: {
        sortOrder: number;
        objectKey: string;
        isPrimary: boolean;
        id?: string | undefined;
        variantId?: string | null | undefined;
        altText?: string | undefined;
    }[] | undefined;
    ingredientLinks?: {
        ingredientId: string;
        notes?: string | null | undefined;
        position?: number | undefined;
        concentration?: string | null | undefined;
        concentrationUnit?: string | null | undefined;
    }[] | undefined;
}, {
    length?: number | null | undefined;
    options?: {
        values: {
            id: string;
            valueEn: string;
            valueAr: string;
            position: number;
            metadata?: Record<string, string | number | boolean | null> | undefined;
        }[];
        id: string;
        position: number;
        nameEn: string;
        nameAr: string;
    }[] | undefined;
    width?: number | null | undefined;
    height?: number | null | undefined;
    weight?: number | null | undefined;
    isActive?: boolean | undefined;
    slug?: string | undefined;
    descriptionEn?: string | undefined;
    descriptionAr?: string | undefined;
    shortDescriptionEn?: string | null | undefined;
    shortDescriptionAr?: string | null | undefined;
    nameEn?: string | undefined;
    nameAr?: string | undefined;
    compareAtPrice?: number | null | undefined;
    categoryId?: string | undefined;
    brandId?: string | null | undefined;
    ingredients?: string | undefined;
    howToUse?: string | undefined;
    skinType?: ("OILY" | "DRY" | "COMBINATION" | "SENSITIVE" | "NORMAL" | "ALL")[] | undefined;
    basePrice?: number | undefined;
    publishedAt?: Date | null | undefined;
    variants?: ({
        sku: string;
        nameEn: string;
        nameAr: string;
        id?: string | undefined;
        isActive?: boolean | undefined;
        barcode?: string | undefined;
        priceOverride?: number | undefined;
        compareAtPrice?: number | undefined;
        optionValueIds?: string[] | undefined;
        shadeHex?: string | undefined;
        openingStock?: {
            quantity: number;
            expiresAt: Date;
            costPrice: number;
            batchNumber?: string | undefined;
        } | undefined;
    } | {
        id: string;
        sku?: string | undefined;
        isActive?: boolean | undefined;
        nameEn?: string | undefined;
        nameAr?: string | undefined;
        barcode?: string | null | undefined;
        priceOverride?: number | null | undefined;
        compareAtPrice?: number | null | undefined;
        optionValueIds?: string[] | undefined;
        shadeHex?: string | null | undefined;
        openingStock?: {
            quantity: number;
            expiresAt: Date;
            costPrice: number;
            batchNumber?: string | undefined;
        } | undefined;
    })[] | undefined;
    images?: {
        objectKey: string;
        sortOrder?: number | undefined;
        id?: string | undefined;
        variantId?: string | null | undefined;
        altText?: string | undefined;
        isPrimary?: boolean | undefined;
    }[] | undefined;
    ingredientLinks?: {
        ingredientId: string;
        notes?: string | null | undefined;
        position?: number | undefined;
        concentration?: string | null | undefined;
        concentrationUnit?: string | null | undefined;
    }[] | undefined;
}>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
export declare const reassignArchivedProductSchema: z.ZodObject<{
    categoryId: z.ZodString;
}, "strict", z.ZodTypeAny, {
    categoryId: string;
}, {
    categoryId: string;
}>;
export type ReassignArchivedProductInput = z.infer<typeof reassignArchivedProductSchema>;
export declare const reassignArchivedCategoryProductsSchema: z.ZodObject<{
    targetCategoryId: z.ZodOptional<z.ZodString>;
}, "strict", z.ZodTypeAny, {
    targetCategoryId?: string | undefined;
}, {
    targetCategoryId?: string | undefined;
}>;
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
    expiresAt: Date;
    costPrice: number;
    batchNumber: string;
    manufacturedAt?: Date | undefined;
    paoMonths?: number | undefined;
}, {
    variantId: string;
    quantity: number;
    expiresAt: Date;
    costPrice: number;
    batchNumber: string;
    manufacturedAt?: Date | undefined;
    paoMonths?: number | undefined;
}>, {
    variantId: string;
    quantity: number;
    expiresAt: Date;
    costPrice: number;
    batchNumber: string;
    manufacturedAt?: Date | undefined;
    paoMonths?: number | undefined;
}, {
    variantId: string;
    quantity: number;
    expiresAt: Date;
    costPrice: number;
    batchNumber: string;
    manufacturedAt?: Date | undefined;
    paoMonths?: number | undefined;
}>, {
    variantId: string;
    quantity: number;
    expiresAt: Date;
    costPrice: number;
    batchNumber: string;
    manufacturedAt?: Date | undefined;
    paoMonths?: number | undefined;
}, {
    variantId: string;
    quantity: number;
    expiresAt: Date;
    costPrice: number;
    batchNumber: string;
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
    imageUrl: string | null;
    slug: string;
    productCount: number;
    nameEn: string;
    nameAr: string;
    parentId: string | null;
}, {
    sortOrder: number;
    id: string;
    imageUrl: string | null;
    slug: string;
    productCount: number;
    nameEn: string;
    nameAr: string;
    parentId: string | null;
}>;
export type PublicCategoryResponse = z.infer<typeof publicCategorySchema>;
export declare const createCategorySchema: z.ZodObject<{
    parentId: z.ZodOptional<z.ZodString>;
    slug: z.ZodOptional<z.ZodString>;
    nameEn: z.ZodString;
    nameAr: z.ZodString;
    imageKey: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
    sortOrder: z.ZodDefault<z.ZodNumber>;
    isActive: z.ZodDefault<z.ZodBoolean>;
}, "strict", z.ZodTypeAny, {
    sortOrder: number;
    isActive: boolean;
    nameEn: string;
    nameAr: string;
    imageKey?: string | undefined;
    slug?: string | undefined;
    parentId?: string | undefined;
}, {
    nameEn: string;
    nameAr: string;
    sortOrder?: number | undefined;
    imageKey?: string | undefined;
    isActive?: boolean | undefined;
    slug?: string | undefined;
    parentId?: string | undefined;
}>;
export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export declare const updateCategorySchema: z.ZodEffects<z.ZodObject<{
    parentId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    slug: z.ZodOptional<z.ZodString>;
    nameEn: z.ZodOptional<z.ZodString>;
    nameAr: z.ZodOptional<z.ZodString>;
    imageKey: z.ZodOptional<z.ZodNullable<z.ZodEffects<z.ZodString, string, string>>>;
    sortOrder: z.ZodOptional<z.ZodNumber>;
    isActive: z.ZodOptional<z.ZodBoolean>;
}, "strict", z.ZodTypeAny, {
    sortOrder?: number | undefined;
    imageKey?: string | null | undefined;
    isActive?: boolean | undefined;
    slug?: string | undefined;
    nameEn?: string | undefined;
    nameAr?: string | undefined;
    parentId?: string | null | undefined;
}, {
    sortOrder?: number | undefined;
    imageKey?: string | null | undefined;
    isActive?: boolean | undefined;
    slug?: string | undefined;
    nameEn?: string | undefined;
    nameAr?: string | undefined;
    parentId?: string | null | undefined;
}>, {
    sortOrder?: number | undefined;
    imageKey?: string | null | undefined;
    isActive?: boolean | undefined;
    slug?: string | undefined;
    nameEn?: string | undefined;
    nameAr?: string | undefined;
    parentId?: string | null | undefined;
}, {
    sortOrder?: number | undefined;
    imageKey?: string | null | undefined;
    isActive?: boolean | undefined;
    slug?: string | undefined;
    nameEn?: string | undefined;
    nameAr?: string | undefined;
    parentId?: string | null | undefined;
}>;
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;
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
    logoKey: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
    isActive: z.ZodDefault<z.ZodBoolean>;
}, "strict", z.ZodTypeAny, {
    name: string;
    isActive: boolean;
    slug?: string | undefined;
    logoKey?: string | undefined;
}, {
    name: string;
    isActive?: boolean | undefined;
    slug?: string | undefined;
    logoKey?: string | undefined;
}>;
export type CreateBrandInput = z.infer<typeof createBrandSchema>;
export declare const updateBrandSchema: z.ZodEffects<z.ZodObject<{
    slug: z.ZodOptional<z.ZodString>;
    name: z.ZodOptional<z.ZodString>;
    logoKey: z.ZodOptional<z.ZodNullable<z.ZodEffects<z.ZodString, string, string>>>;
    isActive: z.ZodOptional<z.ZodBoolean>;
}, "strict", z.ZodTypeAny, {
    name?: string | undefined;
    isActive?: boolean | undefined;
    slug?: string | undefined;
    logoKey?: string | null | undefined;
}, {
    name?: string | undefined;
    isActive?: boolean | undefined;
    slug?: string | undefined;
    logoKey?: string | null | undefined;
}>, {
    name?: string | undefined;
    isActive?: boolean | undefined;
    slug?: string | undefined;
    logoKey?: string | null | undefined;
}, {
    name?: string | undefined;
    isActive?: boolean | undefined;
    slug?: string | undefined;
    logoKey?: string | null | undefined;
}>;
export type UpdateBrandInput = z.infer<typeof updateBrandSchema>;
export declare const publicProductImageSchema: z.ZodObject<{
    id: z.ZodString;
    variantId: z.ZodNullable<z.ZodString>;
    url: z.ZodString;
    altText: z.ZodNullable<z.ZodString>;
    sortOrder: z.ZodNumber;
    isPrimary: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    sortOrder: number;
    id: string;
    variantId: string | null;
    url: string;
    altText: string | null;
    isPrimary: boolean;
}, {
    sortOrder: number;
    id: string;
    variantId: string | null;
    url: string;
    altText: string | null;
    isPrimary: boolean;
}>;
export type PublicProductImageResponse = z.infer<typeof publicProductImageSchema>;
export declare const publicProductOptionValueSchema: z.ZodObject<{
    id: z.ZodString;
    valueEn: z.ZodString;
    valueAr: z.ZodString;
    position: z.ZodNumber;
    metadata: z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    id: string;
    valueEn: string;
    valueAr: string;
    position: number;
    metadata: Record<string, unknown> | null;
}, {
    id: string;
    valueEn: string;
    valueAr: string;
    position: number;
    metadata: Record<string, unknown> | null;
}>;
export type PublicProductOptionValueResponse = z.infer<typeof publicProductOptionValueSchema>;
export declare const publicProductOptionSchema: z.ZodObject<{
    id: z.ZodString;
    nameEn: z.ZodString;
    nameAr: z.ZodString;
    position: z.ZodNumber;
    values: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        valueEn: z.ZodString;
        valueAr: z.ZodString;
        position: z.ZodNumber;
        metadata: z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        valueEn: string;
        valueAr: string;
        position: number;
        metadata: Record<string, unknown> | null;
    }, {
        id: string;
        valueEn: string;
        valueAr: string;
        position: number;
        metadata: Record<string, unknown> | null;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    values: {
        id: string;
        valueEn: string;
        valueAr: string;
        position: number;
        metadata: Record<string, unknown> | null;
    }[];
    id: string;
    position: number;
    nameEn: string;
    nameAr: string;
}, {
    values: {
        id: string;
        valueEn: string;
        valueAr: string;
        position: number;
        metadata: Record<string, unknown> | null;
    }[];
    id: string;
    position: number;
    nameEn: string;
    nameAr: string;
}>;
export type PublicProductOptionResponse = z.infer<typeof publicProductOptionSchema>;
export declare const publicProductVariantSchema: z.ZodObject<{
    id: z.ZodString;
    sku: z.ZodString;
    nameEn: z.ZodString;
    nameAr: z.ZodString;
    price: z.ZodNumber;
    compareAtPrice: z.ZodNullable<z.ZodNumber>;
    shadeHex: z.ZodNullable<z.ZodString>;
    optionValues: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        valueEn: z.ZodString;
        valueAr: z.ZodString;
        position: z.ZodNumber;
        metadata: z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        valueEn: string;
        valueAr: string;
        position: number;
        metadata: Record<string, unknown> | null;
    }, {
        id: string;
        valueEn: string;
        valueAr: string;
        position: number;
        metadata: Record<string, unknown> | null;
    }>, "many">;
    images: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        variantId: z.ZodNullable<z.ZodString>;
        url: z.ZodString;
        altText: z.ZodNullable<z.ZodString>;
        sortOrder: z.ZodNumber;
        isPrimary: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        sortOrder: number;
        id: string;
        variantId: string | null;
        url: string;
        altText: string | null;
        isPrimary: boolean;
    }, {
        sortOrder: number;
        id: string;
        variantId: string | null;
        url: string;
        altText: string | null;
        isPrimary: boolean;
    }>, "many">;
} & {
    stock: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    id: string;
    sku: string;
    price: number;
    nameEn: string;
    nameAr: string;
    compareAtPrice: number | null;
    shadeHex: string | null;
    images: {
        sortOrder: number;
        id: string;
        variantId: string | null;
        url: string;
        altText: string | null;
        isPrimary: boolean;
    }[];
    optionValues: {
        id: string;
        valueEn: string;
        valueAr: string;
        position: number;
        metadata: Record<string, unknown> | null;
    }[];
    stock: number;
}, {
    id: string;
    sku: string;
    price: number;
    nameEn: string;
    nameAr: string;
    compareAtPrice: number | null;
    shadeHex: string | null;
    images: {
        sortOrder: number;
        id: string;
        variantId: string | null;
        url: string;
        altText: string | null;
        isPrimary: boolean;
    }[];
    optionValues: {
        id: string;
        valueEn: string;
        valueAr: string;
        position: number;
        metadata: Record<string, unknown> | null;
    }[];
    stock: number;
}>;
export type PublicProductVariantResponse = z.infer<typeof publicProductVariantSchema>;
export declare const publicProductSchema: z.ZodObject<{
    id: z.ZodString;
    slug: z.ZodString;
    nameEn: z.ZodString;
    nameAr: z.ZodString;
    shortDescriptionEn: z.ZodNullable<z.ZodString>;
    shortDescriptionAr: z.ZodNullable<z.ZodString>;
    descriptionEn: z.ZodNullable<z.ZodString>;
    descriptionAr: z.ZodNullable<z.ZodString>;
    ingredients: z.ZodNullable<z.ZodString>;
    howToUse: z.ZodNullable<z.ZodString>;
    skinType: z.ZodArray<z.ZodEnum<["OILY", "DRY", "COMBINATION", "SENSITIVE", "NORMAL", "ALL"]>, "many">;
    basePrice: z.ZodNumber;
    compareAtPrice: z.ZodNullable<z.ZodNumber>;
    rating: z.ZodNumber;
    reviewCount: z.ZodNumber;
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
        imageUrl: string | null;
        slug: string;
        nameEn: string;
        nameAr: string;
        parentId: string | null;
    }, {
        sortOrder: number;
        id: string;
        imageUrl: string | null;
        slug: string;
        nameEn: string;
        nameAr: string;
        parentId: string | null;
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
    options: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        nameEn: z.ZodString;
        nameAr: z.ZodString;
        position: z.ZodNumber;
        values: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            valueEn: z.ZodString;
            valueAr: z.ZodString;
            position: z.ZodNumber;
            metadata: z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        }, "strip", z.ZodTypeAny, {
            id: string;
            valueEn: string;
            valueAr: string;
            position: number;
            metadata: Record<string, unknown> | null;
        }, {
            id: string;
            valueEn: string;
            valueAr: string;
            position: number;
            metadata: Record<string, unknown> | null;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        values: {
            id: string;
            valueEn: string;
            valueAr: string;
            position: number;
            metadata: Record<string, unknown> | null;
        }[];
        id: string;
        position: number;
        nameEn: string;
        nameAr: string;
    }, {
        values: {
            id: string;
            valueEn: string;
            valueAr: string;
            position: number;
            metadata: Record<string, unknown> | null;
        }[];
        id: string;
        position: number;
        nameEn: string;
        nameAr: string;
    }>, "many">;
    variants: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        sku: z.ZodString;
        nameEn: z.ZodString;
        nameAr: z.ZodString;
        price: z.ZodNumber;
        compareAtPrice: z.ZodNullable<z.ZodNumber>;
        shadeHex: z.ZodNullable<z.ZodString>;
        optionValues: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            valueEn: z.ZodString;
            valueAr: z.ZodString;
            position: z.ZodNumber;
            metadata: z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        }, "strip", z.ZodTypeAny, {
            id: string;
            valueEn: string;
            valueAr: string;
            position: number;
            metadata: Record<string, unknown> | null;
        }, {
            id: string;
            valueEn: string;
            valueAr: string;
            position: number;
            metadata: Record<string, unknown> | null;
        }>, "many">;
        images: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            variantId: z.ZodNullable<z.ZodString>;
            url: z.ZodString;
            altText: z.ZodNullable<z.ZodString>;
            sortOrder: z.ZodNumber;
            isPrimary: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            sortOrder: number;
            id: string;
            variantId: string | null;
            url: string;
            altText: string | null;
            isPrimary: boolean;
        }, {
            sortOrder: number;
            id: string;
            variantId: string | null;
            url: string;
            altText: string | null;
            isPrimary: boolean;
        }>, "many">;
    } & {
        stock: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        id: string;
        sku: string;
        price: number;
        nameEn: string;
        nameAr: string;
        compareAtPrice: number | null;
        shadeHex: string | null;
        images: {
            sortOrder: number;
            id: string;
            variantId: string | null;
            url: string;
            altText: string | null;
            isPrimary: boolean;
        }[];
        optionValues: {
            id: string;
            valueEn: string;
            valueAr: string;
            position: number;
            metadata: Record<string, unknown> | null;
        }[];
        stock: number;
    }, {
        id: string;
        sku: string;
        price: number;
        nameEn: string;
        nameAr: string;
        compareAtPrice: number | null;
        shadeHex: string | null;
        images: {
            sortOrder: number;
            id: string;
            variantId: string | null;
            url: string;
            altText: string | null;
            isPrimary: boolean;
        }[];
        optionValues: {
            id: string;
            valueEn: string;
            valueAr: string;
            position: number;
            metadata: Record<string, unknown> | null;
        }[];
        stock: number;
    }>, "many">;
    images: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        variantId: z.ZodNullable<z.ZodString>;
        url: z.ZodString;
        altText: z.ZodNullable<z.ZodString>;
        sortOrder: z.ZodNumber;
        isPrimary: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        sortOrder: number;
        id: string;
        variantId: string | null;
        url: string;
        altText: string | null;
        isPrimary: boolean;
    }, {
        sortOrder: number;
        id: string;
        variantId: string | null;
        url: string;
        altText: string | null;
        isPrimary: boolean;
    }>, "many">;
    ingredientDetails: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        inciName: z.ZodString;
        commonName: z.ZodNullable<z.ZodString>;
        slug: z.ZodString;
        position: z.ZodNumber;
        concentration: z.ZodNullable<z.ZodString>;
        concentrationUnit: z.ZodNullable<z.ZodString>;
        notes: z.ZodNullable<z.ZodString>;
        shortDescriptionEn: z.ZodNullable<z.ZodString>;
        shortDescriptionAr: z.ZodNullable<z.ZodString>;
        functions: z.ZodArray<z.ZodString, "many">;
        benefits: z.ZodArray<z.ZodString, "many">;
        concerns: z.ZodArray<z.ZodString, "many">;
        goodFor: z.ZodArray<z.ZodString, "many">;
        avoidIf: z.ZodArray<z.ZodString, "many">;
        skinTypes: z.ZodArray<z.ZodString, "many">;
        skinConcerns: z.ZodArray<z.ZodString, "many">;
        regulatoryNotes: z.ZodNullable<z.ZodString>;
        restrictions: z.ZodNullable<z.ZodString>;
        safetyNotes: z.ZodNullable<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        notes: string | null;
        inciName: string;
        commonName: string | null;
        slug: string;
        shortDescriptionEn: string | null;
        shortDescriptionAr: string | null;
        functions: string[];
        benefits: string[];
        concerns: string[];
        goodFor: string[];
        avoidIf: string[];
        skinTypes: string[];
        skinConcerns: string[];
        regulatoryNotes: string | null;
        restrictions: string | null;
        safetyNotes: string | null;
        position: number;
        concentration: string | null;
        concentrationUnit: string | null;
    }, {
        id: string;
        notes: string | null;
        inciName: string;
        commonName: string | null;
        slug: string;
        shortDescriptionEn: string | null;
        shortDescriptionAr: string | null;
        functions: string[];
        benefits: string[];
        concerns: string[];
        goodFor: string[];
        avoidIf: string[];
        skinTypes: string[];
        skinConcerns: string[];
        regulatoryNotes: string | null;
        restrictions: string | null;
        safetyNotes: string | null;
        position: number;
        concentration: string | null;
        concentrationUnit: string | null;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    options: {
        values: {
            id: string;
            valueEn: string;
            valueAr: string;
            position: number;
            metadata: Record<string, unknown> | null;
        }[];
        id: string;
        position: number;
        nameEn: string;
        nameAr: string;
    }[];
    id: string;
    imageUrl: string | null;
    slug: string;
    descriptionEn: string | null;
    descriptionAr: string | null;
    shortDescriptionEn: string | null;
    shortDescriptionAr: string | null;
    nameEn: string;
    nameAr: string;
    compareAtPrice: number | null;
    ingredients: string | null;
    howToUse: string | null;
    skinType: ("OILY" | "DRY" | "COMBINATION" | "SENSITIVE" | "NORMAL" | "ALL")[];
    basePrice: number;
    variants: {
        id: string;
        sku: string;
        price: number;
        nameEn: string;
        nameAr: string;
        compareAtPrice: number | null;
        shadeHex: string | null;
        images: {
            sortOrder: number;
            id: string;
            variantId: string | null;
            url: string;
            altText: string | null;
            isPrimary: boolean;
        }[];
        optionValues: {
            id: string;
            valueEn: string;
            valueAr: string;
            position: number;
            metadata: Record<string, unknown> | null;
        }[];
        stock: number;
    }[];
    images: {
        sortOrder: number;
        id: string;
        variantId: string | null;
        url: string;
        altText: string | null;
        isPrimary: boolean;
    }[];
    rating: number;
    reviewCount: number;
    category: {
        sortOrder: number;
        id: string;
        imageUrl: string | null;
        slug: string;
        nameEn: string;
        nameAr: string;
        parentId: string | null;
    };
    brand: {
        id: string;
        name: string;
        slug: string;
        logoUrl: string | null;
    } | null;
    ingredientDetails: {
        id: string;
        notes: string | null;
        inciName: string;
        commonName: string | null;
        slug: string;
        shortDescriptionEn: string | null;
        shortDescriptionAr: string | null;
        functions: string[];
        benefits: string[];
        concerns: string[];
        goodFor: string[];
        avoidIf: string[];
        skinTypes: string[];
        skinConcerns: string[];
        regulatoryNotes: string | null;
        restrictions: string | null;
        safetyNotes: string | null;
        position: number;
        concentration: string | null;
        concentrationUnit: string | null;
    }[];
}, {
    options: {
        values: {
            id: string;
            valueEn: string;
            valueAr: string;
            position: number;
            metadata: Record<string, unknown> | null;
        }[];
        id: string;
        position: number;
        nameEn: string;
        nameAr: string;
    }[];
    id: string;
    imageUrl: string | null;
    slug: string;
    descriptionEn: string | null;
    descriptionAr: string | null;
    shortDescriptionEn: string | null;
    shortDescriptionAr: string | null;
    nameEn: string;
    nameAr: string;
    compareAtPrice: number | null;
    ingredients: string | null;
    howToUse: string | null;
    skinType: ("OILY" | "DRY" | "COMBINATION" | "SENSITIVE" | "NORMAL" | "ALL")[];
    basePrice: number;
    variants: {
        id: string;
        sku: string;
        price: number;
        nameEn: string;
        nameAr: string;
        compareAtPrice: number | null;
        shadeHex: string | null;
        images: {
            sortOrder: number;
            id: string;
            variantId: string | null;
            url: string;
            altText: string | null;
            isPrimary: boolean;
        }[];
        optionValues: {
            id: string;
            valueEn: string;
            valueAr: string;
            position: number;
            metadata: Record<string, unknown> | null;
        }[];
        stock: number;
    }[];
    images: {
        sortOrder: number;
        id: string;
        variantId: string | null;
        url: string;
        altText: string | null;
        isPrimary: boolean;
    }[];
    rating: number;
    reviewCount: number;
    category: {
        sortOrder: number;
        id: string;
        imageUrl: string | null;
        slug: string;
        nameEn: string;
        nameAr: string;
        parentId: string | null;
    };
    brand: {
        id: string;
        name: string;
        slug: string;
        logoUrl: string | null;
    } | null;
    ingredientDetails: {
        id: string;
        notes: string | null;
        inciName: string;
        commonName: string | null;
        slug: string;
        shortDescriptionEn: string | null;
        shortDescriptionAr: string | null;
        functions: string[];
        benefits: string[];
        concerns: string[];
        goodFor: string[];
        avoidIf: string[];
        skinTypes: string[];
        skinConcerns: string[];
        regulatoryNotes: string | null;
        restrictions: string | null;
        safetyNotes: string | null;
        position: number;
        concentration: string | null;
        concentrationUnit: string | null;
    }[];
}>;
export type PublicProductResponse = z.infer<typeof publicProductSchema>;
export declare const adminProductVariantSchema: z.ZodObject<{
    id: z.ZodString;
    sku: z.ZodString;
    nameEn: z.ZodString;
    nameAr: z.ZodString;
    price: z.ZodNumber;
    compareAtPrice: z.ZodNullable<z.ZodNumber>;
    shadeHex: z.ZodNullable<z.ZodString>;
    optionValues: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        valueEn: z.ZodString;
        valueAr: z.ZodString;
        position: z.ZodNumber;
        metadata: z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        valueEn: string;
        valueAr: string;
        position: number;
        metadata: Record<string, unknown> | null;
    }, {
        id: string;
        valueEn: string;
        valueAr: string;
        position: number;
        metadata: Record<string, unknown> | null;
    }>, "many">;
    images: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        variantId: z.ZodNullable<z.ZodString>;
        url: z.ZodString;
        altText: z.ZodNullable<z.ZodString>;
        sortOrder: z.ZodNumber;
        isPrimary: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        sortOrder: number;
        id: string;
        variantId: string | null;
        url: string;
        altText: string | null;
        isPrimary: boolean;
    }, {
        sortOrder: number;
        id: string;
        variantId: string | null;
        url: string;
        altText: string | null;
        isPrimary: boolean;
    }>, "many">;
} & {
    barcode: z.ZodNullable<z.ZodString>;
    priceOverride: z.ZodNullable<z.ZodNumber>;
    stock: z.ZodNumber;
    isActive: z.ZodBoolean;
    createdAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: string;
    createdAt: Date;
    sku: string;
    price: number;
    isActive: boolean;
    nameEn: string;
    nameAr: string;
    barcode: string | null;
    priceOverride: number | null;
    compareAtPrice: number | null;
    shadeHex: string | null;
    images: {
        sortOrder: number;
        id: string;
        variantId: string | null;
        url: string;
        altText: string | null;
        isPrimary: boolean;
    }[];
    optionValues: {
        id: string;
        valueEn: string;
        valueAr: string;
        position: number;
        metadata: Record<string, unknown> | null;
    }[];
    stock: number;
}, {
    id: string;
    createdAt: Date;
    sku: string;
    price: number;
    isActive: boolean;
    nameEn: string;
    nameAr: string;
    barcode: string | null;
    priceOverride: number | null;
    compareAtPrice: number | null;
    shadeHex: string | null;
    images: {
        sortOrder: number;
        id: string;
        variantId: string | null;
        url: string;
        altText: string | null;
        isPrimary: boolean;
    }[];
    optionValues: {
        id: string;
        valueEn: string;
        valueAr: string;
        position: number;
        metadata: Record<string, unknown> | null;
    }[];
    stock: number;
}>;
export type AdminProductVariantResponse = z.infer<typeof adminProductVariantSchema>;
export declare const adminProductImageSchema: z.ZodObject<{
    id: z.ZodString;
    variantId: z.ZodNullable<z.ZodString>;
    url: z.ZodString;
    altText: z.ZodNullable<z.ZodString>;
    sortOrder: z.ZodNumber;
    isPrimary: z.ZodBoolean;
} & {
    objectKey: z.ZodString;
}, "strip", z.ZodTypeAny, {
    sortOrder: number;
    id: string;
    variantId: string | null;
    url: string;
    objectKey: string;
    altText: string | null;
    isPrimary: boolean;
}, {
    sortOrder: number;
    id: string;
    variantId: string | null;
    url: string;
    objectKey: string;
    altText: string | null;
    isPrimary: boolean;
}>;
export type AdminProductImageResponse = z.infer<typeof adminProductImageSchema>;
export declare const adminProductSchema: z.ZodObject<{
    id: z.ZodString;
    slug: z.ZodString;
    nameEn: z.ZodString;
    nameAr: z.ZodString;
    shortDescriptionEn: z.ZodNullable<z.ZodString>;
    shortDescriptionAr: z.ZodNullable<z.ZodString>;
    descriptionEn: z.ZodNullable<z.ZodString>;
    descriptionAr: z.ZodNullable<z.ZodString>;
    ingredients: z.ZodNullable<z.ZodString>;
    howToUse: z.ZodNullable<z.ZodString>;
    skinType: z.ZodArray<z.ZodEnum<["OILY", "DRY", "COMBINATION", "SENSITIVE", "NORMAL", "ALL"]>, "many">;
    basePrice: z.ZodNumber;
    compareAtPrice: z.ZodNullable<z.ZodNumber>;
    rating: z.ZodNumber;
    reviewCount: z.ZodNumber;
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
        imageUrl: string | null;
        slug: string;
        nameEn: string;
        nameAr: string;
        parentId: string | null;
    }, {
        sortOrder: number;
        id: string;
        imageUrl: string | null;
        slug: string;
        nameEn: string;
        nameAr: string;
        parentId: string | null;
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
    options: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        nameEn: z.ZodString;
        nameAr: z.ZodString;
        position: z.ZodNumber;
        values: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            valueEn: z.ZodString;
            valueAr: z.ZodString;
            position: z.ZodNumber;
            metadata: z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        }, "strip", z.ZodTypeAny, {
            id: string;
            valueEn: string;
            valueAr: string;
            position: number;
            metadata: Record<string, unknown> | null;
        }, {
            id: string;
            valueEn: string;
            valueAr: string;
            position: number;
            metadata: Record<string, unknown> | null;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        values: {
            id: string;
            valueEn: string;
            valueAr: string;
            position: number;
            metadata: Record<string, unknown> | null;
        }[];
        id: string;
        position: number;
        nameEn: string;
        nameAr: string;
    }, {
        values: {
            id: string;
            valueEn: string;
            valueAr: string;
            position: number;
            metadata: Record<string, unknown> | null;
        }[];
        id: string;
        position: number;
        nameEn: string;
        nameAr: string;
    }>, "many">;
    ingredientDetails: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        inciName: z.ZodString;
        commonName: z.ZodNullable<z.ZodString>;
        slug: z.ZodString;
        position: z.ZodNumber;
        concentration: z.ZodNullable<z.ZodString>;
        concentrationUnit: z.ZodNullable<z.ZodString>;
        notes: z.ZodNullable<z.ZodString>;
        shortDescriptionEn: z.ZodNullable<z.ZodString>;
        shortDescriptionAr: z.ZodNullable<z.ZodString>;
        functions: z.ZodArray<z.ZodString, "many">;
        benefits: z.ZodArray<z.ZodString, "many">;
        concerns: z.ZodArray<z.ZodString, "many">;
        goodFor: z.ZodArray<z.ZodString, "many">;
        avoidIf: z.ZodArray<z.ZodString, "many">;
        skinTypes: z.ZodArray<z.ZodString, "many">;
        skinConcerns: z.ZodArray<z.ZodString, "many">;
        regulatoryNotes: z.ZodNullable<z.ZodString>;
        restrictions: z.ZodNullable<z.ZodString>;
        safetyNotes: z.ZodNullable<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        notes: string | null;
        inciName: string;
        commonName: string | null;
        slug: string;
        shortDescriptionEn: string | null;
        shortDescriptionAr: string | null;
        functions: string[];
        benefits: string[];
        concerns: string[];
        goodFor: string[];
        avoidIf: string[];
        skinTypes: string[];
        skinConcerns: string[];
        regulatoryNotes: string | null;
        restrictions: string | null;
        safetyNotes: string | null;
        position: number;
        concentration: string | null;
        concentrationUnit: string | null;
    }, {
        id: string;
        notes: string | null;
        inciName: string;
        commonName: string | null;
        slug: string;
        shortDescriptionEn: string | null;
        shortDescriptionAr: string | null;
        functions: string[];
        benefits: string[];
        concerns: string[];
        goodFor: string[];
        avoidIf: string[];
        skinTypes: string[];
        skinConcerns: string[];
        regulatoryNotes: string | null;
        restrictions: string | null;
        safetyNotes: string | null;
        position: number;
        concentration: string | null;
        concentrationUnit: string | null;
    }>, "many">;
} & {
    weight: z.ZodNullable<z.ZodNumber>;
    height: z.ZodNullable<z.ZodNumber>;
    width: z.ZodNullable<z.ZodNumber>;
    length: z.ZodNullable<z.ZodNumber>;
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
        compareAtPrice: z.ZodNullable<z.ZodNumber>;
        shadeHex: z.ZodNullable<z.ZodString>;
        optionValues: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            valueEn: z.ZodString;
            valueAr: z.ZodString;
            position: z.ZodNumber;
            metadata: z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        }, "strip", z.ZodTypeAny, {
            id: string;
            valueEn: string;
            valueAr: string;
            position: number;
            metadata: Record<string, unknown> | null;
        }, {
            id: string;
            valueEn: string;
            valueAr: string;
            position: number;
            metadata: Record<string, unknown> | null;
        }>, "many">;
        images: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            variantId: z.ZodNullable<z.ZodString>;
            url: z.ZodString;
            altText: z.ZodNullable<z.ZodString>;
            sortOrder: z.ZodNumber;
            isPrimary: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            sortOrder: number;
            id: string;
            variantId: string | null;
            url: string;
            altText: string | null;
            isPrimary: boolean;
        }, {
            sortOrder: number;
            id: string;
            variantId: string | null;
            url: string;
            altText: string | null;
            isPrimary: boolean;
        }>, "many">;
    } & {
        barcode: z.ZodNullable<z.ZodString>;
        priceOverride: z.ZodNullable<z.ZodNumber>;
        stock: z.ZodNumber;
        isActive: z.ZodBoolean;
        createdAt: z.ZodDate;
    }, "strip", z.ZodTypeAny, {
        id: string;
        createdAt: Date;
        sku: string;
        price: number;
        isActive: boolean;
        nameEn: string;
        nameAr: string;
        barcode: string | null;
        priceOverride: number | null;
        compareAtPrice: number | null;
        shadeHex: string | null;
        images: {
            sortOrder: number;
            id: string;
            variantId: string | null;
            url: string;
            altText: string | null;
            isPrimary: boolean;
        }[];
        optionValues: {
            id: string;
            valueEn: string;
            valueAr: string;
            position: number;
            metadata: Record<string, unknown> | null;
        }[];
        stock: number;
    }, {
        id: string;
        createdAt: Date;
        sku: string;
        price: number;
        isActive: boolean;
        nameEn: string;
        nameAr: string;
        barcode: string | null;
        priceOverride: number | null;
        compareAtPrice: number | null;
        shadeHex: string | null;
        images: {
            sortOrder: number;
            id: string;
            variantId: string | null;
            url: string;
            altText: string | null;
            isPrimary: boolean;
        }[];
        optionValues: {
            id: string;
            valueEn: string;
            valueAr: string;
            position: number;
            metadata: Record<string, unknown> | null;
        }[];
        stock: number;
    }>, "many">;
    images: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        variantId: z.ZodNullable<z.ZodString>;
        url: z.ZodString;
        altText: z.ZodNullable<z.ZodString>;
        sortOrder: z.ZodNumber;
        isPrimary: z.ZodBoolean;
    } & {
        objectKey: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        sortOrder: number;
        id: string;
        variantId: string | null;
        url: string;
        objectKey: string;
        altText: string | null;
        isPrimary: boolean;
    }, {
        sortOrder: number;
        id: string;
        variantId: string | null;
        url: string;
        objectKey: string;
        altText: string | null;
        isPrimary: boolean;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    length: number | null;
    options: {
        values: {
            id: string;
            valueEn: string;
            valueAr: string;
            position: number;
            metadata: Record<string, unknown> | null;
        }[];
        id: string;
        position: number;
        nameEn: string;
        nameAr: string;
    }[];
    id: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    width: number | null;
    height: number | null;
    weight: number | null;
    imageUrl: string | null;
    isActive: boolean;
    slug: string;
    descriptionEn: string | null;
    descriptionAr: string | null;
    shortDescriptionEn: string | null;
    shortDescriptionAr: string | null;
    nameEn: string;
    nameAr: string;
    compareAtPrice: number | null;
    ingredients: string | null;
    howToUse: string | null;
    skinType: ("OILY" | "DRY" | "COMBINATION" | "SENSITIVE" | "NORMAL" | "ALL")[];
    basePrice: number;
    publishedAt: Date | null;
    variants: {
        id: string;
        createdAt: Date;
        sku: string;
        price: number;
        isActive: boolean;
        nameEn: string;
        nameAr: string;
        barcode: string | null;
        priceOverride: number | null;
        compareAtPrice: number | null;
        shadeHex: string | null;
        images: {
            sortOrder: number;
            id: string;
            variantId: string | null;
            url: string;
            altText: string | null;
            isPrimary: boolean;
        }[];
        optionValues: {
            id: string;
            valueEn: string;
            valueAr: string;
            position: number;
            metadata: Record<string, unknown> | null;
        }[];
        stock: number;
    }[];
    images: {
        sortOrder: number;
        id: string;
        variantId: string | null;
        url: string;
        objectKey: string;
        altText: string | null;
        isPrimary: boolean;
    }[];
    rating: number;
    reviewCount: number;
    category: {
        sortOrder: number;
        id: string;
        imageUrl: string | null;
        slug: string;
        nameEn: string;
        nameAr: string;
        parentId: string | null;
    };
    brand: {
        id: string;
        name: string;
        slug: string;
        logoUrl: string | null;
    } | null;
    ingredientDetails: {
        id: string;
        notes: string | null;
        inciName: string;
        commonName: string | null;
        slug: string;
        shortDescriptionEn: string | null;
        shortDescriptionAr: string | null;
        functions: string[];
        benefits: string[];
        concerns: string[];
        goodFor: string[];
        avoidIf: string[];
        skinTypes: string[];
        skinConcerns: string[];
        regulatoryNotes: string | null;
        restrictions: string | null;
        safetyNotes: string | null;
        position: number;
        concentration: string | null;
        concentrationUnit: string | null;
    }[];
}, {
    length: number | null;
    options: {
        values: {
            id: string;
            valueEn: string;
            valueAr: string;
            position: number;
            metadata: Record<string, unknown> | null;
        }[];
        id: string;
        position: number;
        nameEn: string;
        nameAr: string;
    }[];
    id: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    width: number | null;
    height: number | null;
    weight: number | null;
    imageUrl: string | null;
    isActive: boolean;
    slug: string;
    descriptionEn: string | null;
    descriptionAr: string | null;
    shortDescriptionEn: string | null;
    shortDescriptionAr: string | null;
    nameEn: string;
    nameAr: string;
    compareAtPrice: number | null;
    ingredients: string | null;
    howToUse: string | null;
    skinType: ("OILY" | "DRY" | "COMBINATION" | "SENSITIVE" | "NORMAL" | "ALL")[];
    basePrice: number;
    publishedAt: Date | null;
    variants: {
        id: string;
        createdAt: Date;
        sku: string;
        price: number;
        isActive: boolean;
        nameEn: string;
        nameAr: string;
        barcode: string | null;
        priceOverride: number | null;
        compareAtPrice: number | null;
        shadeHex: string | null;
        images: {
            sortOrder: number;
            id: string;
            variantId: string | null;
            url: string;
            altText: string | null;
            isPrimary: boolean;
        }[];
        optionValues: {
            id: string;
            valueEn: string;
            valueAr: string;
            position: number;
            metadata: Record<string, unknown> | null;
        }[];
        stock: number;
    }[];
    images: {
        sortOrder: number;
        id: string;
        variantId: string | null;
        url: string;
        objectKey: string;
        altText: string | null;
        isPrimary: boolean;
    }[];
    rating: number;
    reviewCount: number;
    category: {
        sortOrder: number;
        id: string;
        imageUrl: string | null;
        slug: string;
        nameEn: string;
        nameAr: string;
        parentId: string | null;
    };
    brand: {
        id: string;
        name: string;
        slug: string;
        logoUrl: string | null;
    } | null;
    ingredientDetails: {
        id: string;
        notes: string | null;
        inciName: string;
        commonName: string | null;
        slug: string;
        shortDescriptionEn: string | null;
        shortDescriptionAr: string | null;
        functions: string[];
        benefits: string[];
        concerns: string[];
        goodFor: string[];
        avoidIf: string[];
        skinTypes: string[];
        skinConcerns: string[];
        regulatoryNotes: string | null;
        restrictions: string | null;
        safetyNotes: string | null;
        position: number;
        concentration: string | null;
        concentrationUnit: string | null;
    }[];
}>;
export type AdminProductResponse = z.infer<typeof adminProductSchema>;
//# sourceMappingURL=product.schema.d.ts.map