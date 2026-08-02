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
export declare const createProductSchema: z.ZodObject<{
    categoryId: z.ZodString;
    brandId: z.ZodOptional<z.ZodString>;
    slug: z.ZodString;
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
}, "strip", z.ZodTypeAny, {
    nameEn: string;
    nameAr: string;
    categoryId: string;
    slug: string;
    skinType: ("OILY" | "DRY" | "COMBINATION" | "SENSITIVE" | "NORMAL" | "ALL")[];
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
    descriptionEn?: string | undefined;
    descriptionAr?: string | undefined;
    ingredients?: string | undefined;
    howToUse?: string | undefined;
    compareAtPrice?: number | undefined;
}, {
    nameEn: string;
    nameAr: string;
    categoryId: string;
    slug: string;
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
    descriptionEn?: string | undefined;
    descriptionAr?: string | undefined;
    ingredients?: string | undefined;
    howToUse?: string | undefined;
    skinType?: ("OILY" | "DRY" | "COMBINATION" | "SENSITIVE" | "NORMAL" | "ALL")[] | undefined;
    compareAtPrice?: number | undefined;
}>;
export type CreateProductInput = z.infer<typeof createProductSchema>;
export declare const updateProductSchema: z.ZodObject<Omit<{
    categoryId: z.ZodOptional<z.ZodString>;
    brandId: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    slug: z.ZodOptional<z.ZodString>;
    nameEn: z.ZodOptional<z.ZodString>;
    nameAr: z.ZodOptional<z.ZodString>;
    descriptionEn: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    descriptionAr: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    ingredients: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    howToUse: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    skinType: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodEnum<["OILY", "DRY", "COMBINATION", "SENSITIVE", "NORMAL", "ALL"]>, "many">>>;
    basePrice: z.ZodOptional<z.ZodNumber>;
    compareAtPrice: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    variants: z.ZodOptional<z.ZodArray<z.ZodObject<{
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
    }>, "many">>;
}, "variants">, "strip", z.ZodTypeAny, {
    nameEn?: string | undefined;
    nameAr?: string | undefined;
    categoryId?: string | undefined;
    brandId?: string | undefined;
    slug?: string | undefined;
    descriptionEn?: string | undefined;
    descriptionAr?: string | undefined;
    ingredients?: string | undefined;
    howToUse?: string | undefined;
    skinType?: ("OILY" | "DRY" | "COMBINATION" | "SENSITIVE" | "NORMAL" | "ALL")[] | undefined;
    basePrice?: number | undefined;
    compareAtPrice?: number | undefined;
}, {
    nameEn?: string | undefined;
    nameAr?: string | undefined;
    categoryId?: string | undefined;
    brandId?: string | undefined;
    slug?: string | undefined;
    descriptionEn?: string | undefined;
    descriptionAr?: string | undefined;
    ingredients?: string | undefined;
    howToUse?: string | undefined;
    skinType?: ("OILY" | "DRY" | "COMBINATION" | "SENSITIVE" | "NORMAL" | "ALL")[] | undefined;
    basePrice?: number | undefined;
    compareAtPrice?: number | undefined;
}>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
/** Minimal public catalogue projections shared with storefront clients. */
export declare const publicCategoryResponseSchema: z.ZodObject<{
    id: z.ZodString;
    slug: z.ZodString;
    nameEn: z.ZodString;
    nameAr: z.ZodString;
    imageUrl: z.ZodNullable<z.ZodString>;
    productCount: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    id: string;
    nameEn: string;
    nameAr: string;
    slug: string;
    imageUrl: string | null;
    productCount: number;
}, {
    id: string;
    nameEn: string;
    nameAr: string;
    slug: string;
    imageUrl: string | null;
    productCount: number;
}>;
export type PublicCategoryResponse = z.infer<typeof publicCategoryResponseSchema>;
export declare const publicProductResponseSchema: z.ZodObject<{
    id: z.ZodString;
    slug: z.ZodString;
    nameEn: z.ZodString;
    nameAr: z.ZodString;
    basePrice: z.ZodNumber;
    imageUrl: z.ZodNullable<z.ZodString>;
    category: z.ZodObject<Pick<{
        id: z.ZodString;
        slug: z.ZodString;
        nameEn: z.ZodString;
        nameAr: z.ZodString;
        imageUrl: z.ZodNullable<z.ZodString>;
        productCount: z.ZodNumber;
    }, "id" | "nameEn" | "nameAr" | "slug">, "strip", z.ZodTypeAny, {
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
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        name: string;
    }, {
        id: string;
        name: string;
    }>>;
}, "strip", z.ZodTypeAny, {
    id: string;
    nameEn: string;
    nameAr: string;
    slug: string;
    basePrice: number;
    imageUrl: string | null;
    category: {
        id: string;
        nameEn: string;
        nameAr: string;
        slug: string;
    };
    brand: {
        id: string;
        name: string;
    } | null;
}, {
    id: string;
    nameEn: string;
    nameAr: string;
    slug: string;
    basePrice: number;
    imageUrl: string | null;
    category: {
        id: string;
        nameEn: string;
        nameAr: string;
        slug: string;
    };
    brand: {
        id: string;
        name: string;
    } | null;
}>;
export type PublicProductResponse = z.infer<typeof publicProductResponseSchema>;
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
//# sourceMappingURL=product.schema.d.ts.map