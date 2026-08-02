import { z } from 'zod';
export declare const cartOwnerEnum: z.ZodEnum<["GUEST", "USER"]>;
export type CartOwner = z.infer<typeof cartOwnerEnum>;
export declare const cartItemStatusEnum: z.ZodEnum<["AVAILABLE", "OUT_OF_STOCK", "NOT_SELLABLE"]>;
export type CartItemStatus = z.infer<typeof cartItemStatusEnum>;
export declare const addCartItemSchema: z.ZodObject<{
    variantId: z.ZodString;
    quantity: z.ZodDefault<z.ZodNumber>;
}, "strict", z.ZodTypeAny, {
    variantId: string;
    quantity: number;
}, {
    variantId: string;
    quantity?: number | undefined;
}>;
export type AddCartItemInput = z.infer<typeof addCartItemSchema>;
export declare const updateCartItemSchema: z.ZodObject<{
    quantity: z.ZodNumber;
}, "strict", z.ZodTypeAny, {
    quantity: number;
}, {
    quantity: number;
}>;
export type UpdateCartItemInput = z.infer<typeof updateCartItemSchema>;
export declare const cartItemSchema: z.ZodObject<{
    variantId: z.ZodString;
    productId: z.ZodString;
    slug: z.ZodString;
    productNameEn: z.ZodString;
    productNameAr: z.ZodString;
    variantNameEn: z.ZodString;
    variantNameAr: z.ZodString;
    sku: z.ZodString;
    imageUrl: z.ZodNullable<z.ZodString>;
    unitPrice: z.ZodNumber;
    quantity: z.ZodNumber;
    lineTotal: z.ZodNumber;
    available: z.ZodNumber;
    maxAvailable: z.ZodNumber;
    status: z.ZodEnum<["AVAILABLE", "OUT_OF_STOCK", "NOT_SELLABLE"]>;
    issues: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    issues: string[];
    status: "AVAILABLE" | "OUT_OF_STOCK" | "NOT_SELLABLE";
    variantId: string;
    quantity: number;
    sku: string;
    slug: string;
    imageUrl: string | null;
    productId: string;
    productNameEn: string;
    productNameAr: string;
    variantNameEn: string;
    variantNameAr: string;
    unitPrice: number;
    lineTotal: number;
    available: number;
    maxAvailable: number;
}, {
    issues: string[];
    status: "AVAILABLE" | "OUT_OF_STOCK" | "NOT_SELLABLE";
    variantId: string;
    quantity: number;
    sku: string;
    slug: string;
    imageUrl: string | null;
    productId: string;
    productNameEn: string;
    productNameAr: string;
    variantNameEn: string;
    variantNameAr: string;
    unitPrice: number;
    lineTotal: number;
    available: number;
    maxAvailable: number;
}>;
export type CartItemResponse = z.infer<typeof cartItemSchema>;
export declare const cartSchema: z.ZodObject<{
    cartId: z.ZodNullable<z.ZodString>;
    owner: z.ZodEnum<["GUEST", "USER"]>;
    items: z.ZodArray<z.ZodObject<{
        variantId: z.ZodString;
        productId: z.ZodString;
        slug: z.ZodString;
        productNameEn: z.ZodString;
        productNameAr: z.ZodString;
        variantNameEn: z.ZodString;
        variantNameAr: z.ZodString;
        sku: z.ZodString;
        imageUrl: z.ZodNullable<z.ZodString>;
        unitPrice: z.ZodNumber;
        quantity: z.ZodNumber;
        lineTotal: z.ZodNumber;
        available: z.ZodNumber;
        maxAvailable: z.ZodNumber;
        status: z.ZodEnum<["AVAILABLE", "OUT_OF_STOCK", "NOT_SELLABLE"]>;
        issues: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        issues: string[];
        status: "AVAILABLE" | "OUT_OF_STOCK" | "NOT_SELLABLE";
        variantId: string;
        quantity: number;
        sku: string;
        slug: string;
        imageUrl: string | null;
        productId: string;
        productNameEn: string;
        productNameAr: string;
        variantNameEn: string;
        variantNameAr: string;
        unitPrice: number;
        lineTotal: number;
        available: number;
        maxAvailable: number;
    }, {
        issues: string[];
        status: "AVAILABLE" | "OUT_OF_STOCK" | "NOT_SELLABLE";
        variantId: string;
        quantity: number;
        sku: string;
        slug: string;
        imageUrl: string | null;
        productId: string;
        productNameEn: string;
        productNameAr: string;
        variantNameEn: string;
        variantNameAr: string;
        unitPrice: number;
        lineTotal: number;
        available: number;
        maxAvailable: number;
    }>, "many">;
    subtotal: z.ZodNumber;
    totalQuantity: z.ZodNumber;
    hasIssues: z.ZodBoolean;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    updatedAt: string;
    items: {
        issues: string[];
        status: "AVAILABLE" | "OUT_OF_STOCK" | "NOT_SELLABLE";
        variantId: string;
        quantity: number;
        sku: string;
        slug: string;
        imageUrl: string | null;
        productId: string;
        productNameEn: string;
        productNameAr: string;
        variantNameEn: string;
        variantNameAr: string;
        unitPrice: number;
        lineTotal: number;
        available: number;
        maxAvailable: number;
    }[];
    cartId: string | null;
    owner: "GUEST" | "USER";
    subtotal: number;
    totalQuantity: number;
    hasIssues: boolean;
}, {
    updatedAt: string;
    items: {
        issues: string[];
        status: "AVAILABLE" | "OUT_OF_STOCK" | "NOT_SELLABLE";
        variantId: string;
        quantity: number;
        sku: string;
        slug: string;
        imageUrl: string | null;
        productId: string;
        productNameEn: string;
        productNameAr: string;
        variantNameEn: string;
        variantNameAr: string;
        unitPrice: number;
        lineTotal: number;
        available: number;
        maxAvailable: number;
    }[];
    cartId: string | null;
    owner: "GUEST" | "USER";
    subtotal: number;
    totalQuantity: number;
    hasIssues: boolean;
}>;
export type CartResponse = z.infer<typeof cartSchema>;
//# sourceMappingURL=cart.schema.d.ts.map