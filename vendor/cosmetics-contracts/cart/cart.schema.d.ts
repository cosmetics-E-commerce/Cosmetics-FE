import { z } from "zod";
export declare const cartOwnerEnum: z.ZodEnum<["GUEST", "USER"]>;
export type CartOwner = z.infer<typeof cartOwnerEnum>;
export declare const cartItemStatusEnum: z.ZodEnum<["AVAILABLE", "OUT_OF_STOCK", "NOT_SELLABLE"]>;
export type CartItemStatus = z.infer<typeof cartItemStatusEnum>;
export declare const addCartItemSchema: z.ZodObject<{
    variantId: z.ZodString;
    quantity: z.ZodDefault<z.ZodNumber>;
}, "strict", z.ZodTypeAny, {
    quantity: number;
    variantId: string;
}, {
    variantId: string;
    quantity?: number | undefined;
}>;
export type AddCartItemInput = z.infer<typeof addCartItemSchema>;
export declare const addCartItemsSchema: z.ZodObject<{
    items: z.ZodArray<z.ZodObject<{
        variantId: z.ZodString;
        quantity: z.ZodDefault<z.ZodNumber>;
    }, "strict", z.ZodTypeAny, {
        quantity: number;
        variantId: string;
    }, {
        variantId: string;
        quantity?: number | undefined;
    }>, "many">;
}, "strict", z.ZodTypeAny, {
    items: {
        quantity: number;
        variantId: string;
    }[];
}, {
    items: {
        variantId: string;
        quantity?: number | undefined;
    }[];
}>;
export type AddCartItemsInput = z.infer<typeof addCartItemsSchema>;
export declare const updateCartItemSchema: z.ZodObject<{
    quantity: z.ZodNumber;
}, "strict", z.ZodTypeAny, {
    quantity: number;
}, {
    quantity: number;
}>;
export type UpdateCartItemInput = z.infer<typeof updateCartItemSchema>;
export declare const savedForLaterStatusEnum: z.ZodEnum<["AVAILABLE", "OUT_OF_STOCK", "VARIANT_UNAVAILABLE", "PRODUCT_UNAVAILABLE"]>;
export type SavedForLaterStatus = z.infer<typeof savedForLaterStatusEnum>;
export declare const savedForLaterPriceChangeEnum: z.ZodEnum<["UNCHANGED", "INCREASED", "DECREASED", "UNAVAILABLE"]>;
export declare const savedForLaterItemSchema: z.ZodObject<{
    id: z.ZodString;
    productId: z.ZodNullable<z.ZodString>;
    variantId: z.ZodNullable<z.ZodString>;
    slug: z.ZodString;
    productNameEn: z.ZodString;
    productNameAr: z.ZodString;
    variantNameEn: z.ZodString;
    variantNameAr: z.ZodString;
    brandName: z.ZodNullable<z.ZodString>;
    imageUrl: z.ZodNullable<z.ZodString>;
    desiredQuantity: z.ZodNumber;
    priceWhenSaved: z.ZodNumber;
    currentPrice: z.ZodNullable<z.ZodNumber>;
    priceChange: z.ZodEnum<["UNCHANGED", "INCREASED", "DECREASED", "UNAVAILABLE"]>;
    available: z.ZodNumber;
    maxAvailable: z.ZodNumber;
    status: z.ZodEnum<["AVAILABLE", "OUT_OF_STOCK", "VARIANT_UNAVAILABLE", "PRODUCT_UNAVAILABLE"]>;
    savedAt: z.ZodString;
    issues: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    issues: string[];
    status: "AVAILABLE" | "OUT_OF_STOCK" | "VARIANT_UNAVAILABLE" | "PRODUCT_UNAVAILABLE";
    id: string;
    variantId: string | null;
    productId: string | null;
    imageUrl: string | null;
    slug: string;
    productNameEn: string;
    productNameAr: string;
    variantNameEn: string;
    variantNameAr: string;
    brandName: string | null;
    desiredQuantity: number;
    priceWhenSaved: number;
    currentPrice: number | null;
    priceChange: "UNCHANGED" | "INCREASED" | "DECREASED" | "UNAVAILABLE";
    available: number;
    maxAvailable: number;
    savedAt: string;
}, {
    issues: string[];
    status: "AVAILABLE" | "OUT_OF_STOCK" | "VARIANT_UNAVAILABLE" | "PRODUCT_UNAVAILABLE";
    id: string;
    variantId: string | null;
    productId: string | null;
    imageUrl: string | null;
    slug: string;
    productNameEn: string;
    productNameAr: string;
    variantNameEn: string;
    variantNameAr: string;
    brandName: string | null;
    desiredQuantity: number;
    priceWhenSaved: number;
    currentPrice: number | null;
    priceChange: "UNCHANGED" | "INCREASED" | "DECREASED" | "UNAVAILABLE";
    available: number;
    maxAvailable: number;
    savedAt: string;
}>;
export type SavedForLaterItemResponse = z.infer<typeof savedForLaterItemSchema>;
export declare const moveSavedItemsSchema: z.ZodObject<{
    itemIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strict", z.ZodTypeAny, {
    itemIds?: string[] | undefined;
}, {
    itemIds?: string[] | undefined;
}>;
export type MoveSavedItemsInput = z.infer<typeof moveSavedItemsSchema>;
export declare const savedMoveResultSchema: z.ZodObject<{
    itemId: z.ZodString;
    status: z.ZodEnum<["MOVED", "OUT_OF_STOCK", "VARIANT_UNAVAILABLE", "PRODUCT_UNAVAILABLE", "INSUFFICIENT_STOCK"]>;
    available: z.ZodNumber;
    requested: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    status: "OUT_OF_STOCK" | "VARIANT_UNAVAILABLE" | "PRODUCT_UNAVAILABLE" | "MOVED" | "INSUFFICIENT_STOCK";
    available: number;
    itemId: string;
    requested: number;
}, {
    status: "OUT_OF_STOCK" | "VARIANT_UNAVAILABLE" | "PRODUCT_UNAVAILABLE" | "MOVED" | "INSUFFICIENT_STOCK";
    available: number;
    itemId: string;
    requested: number;
}>;
export type SavedMoveResult = z.infer<typeof savedMoveResultSchema>;
export declare const cartItemSchema: z.ZodObject<{
    variantId: z.ZodString;
    productId: z.ZodString;
    slug: z.ZodString;
    productNameEn: z.ZodString;
    productNameAr: z.ZodString;
    variantNameEn: z.ZodString;
    variantNameAr: z.ZodString;
    variantOptions: z.ZodArray<z.ZodObject<{
        optionId: z.ZodString;
        optionNameEn: z.ZodString;
        optionNameAr: z.ZodString;
        valueId: z.ZodString;
        valueEn: z.ZodString;
        valueAr: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        optionId: string;
        optionNameEn: string;
        optionNameAr: string;
        valueId: string;
        valueEn: string;
        valueAr: string;
    }, {
        optionId: string;
        optionNameEn: string;
        optionNameAr: string;
        valueId: string;
        valueEn: string;
        valueAr: string;
    }>, "many">;
    sku: z.ZodString;
    imageUrl: z.ZodNullable<z.ZodString>;
    categoryId: z.ZodString;
    categoryIds: z.ZodArray<z.ZodString, "many">;
    brandId: z.ZodNullable<z.ZodString>;
    unitPrice: z.ZodNumber;
    quantity: z.ZodNumber;
    lineTotal: z.ZodNumber;
    discount: z.ZodNumber;
    discountedLineTotal: z.ZodNumber;
    available: z.ZodNumber;
    maxAvailable: z.ZodNumber;
    status: z.ZodEnum<["AVAILABLE", "OUT_OF_STOCK", "NOT_SELLABLE"]>;
    issues: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    issues: string[];
    status: "AVAILABLE" | "OUT_OF_STOCK" | "NOT_SELLABLE";
    categoryIds: string[];
    quantity: number;
    variantId: string;
    productId: string;
    categoryId: string;
    brandId: string | null;
    unitPrice: number;
    discount: number;
    discountedLineTotal: number;
    variantOptions: {
        optionId: string;
        optionNameEn: string;
        optionNameAr: string;
        valueId: string;
        valueEn: string;
        valueAr: string;
    }[];
    sku: string;
    imageUrl: string | null;
    slug: string;
    productNameEn: string;
    productNameAr: string;
    variantNameEn: string;
    variantNameAr: string;
    available: number;
    maxAvailable: number;
    lineTotal: number;
}, {
    issues: string[];
    status: "AVAILABLE" | "OUT_OF_STOCK" | "NOT_SELLABLE";
    categoryIds: string[];
    quantity: number;
    variantId: string;
    productId: string;
    categoryId: string;
    brandId: string | null;
    unitPrice: number;
    discount: number;
    discountedLineTotal: number;
    variantOptions: {
        optionId: string;
        optionNameEn: string;
        optionNameAr: string;
        valueId: string;
        valueEn: string;
        valueAr: string;
    }[];
    sku: string;
    imageUrl: string | null;
    slug: string;
    productNameEn: string;
    productNameAr: string;
    variantNameEn: string;
    variantNameAr: string;
    available: number;
    maxAvailable: number;
    lineTotal: number;
}>;
export type CartItemResponse = z.infer<typeof cartItemSchema>;
export declare const cartBundleLineSchema: z.ZodObject<{
    variantId: z.ZodString;
    slotKey: z.ZodString;
    participatingQuantity: z.ZodNumber;
    allocatedDiscount: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    variantId: string;
    slotKey: string;
    participatingQuantity: number;
    allocatedDiscount: number;
}, {
    variantId: string;
    slotKey: string;
    participatingQuantity: number;
    allocatedDiscount: number;
}>;
export declare const cartBundleInstanceSchema: z.ZodObject<{
    id: z.ZodString;
    bundleId: z.ZodString;
    slug: z.ZodString;
    version: z.ZodNumber;
    name: z.ZodObject<{
        en: z.ZodString;
        ar: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        en: string;
        ar: string;
    }, {
        en: string;
        ar: string;
    }>;
    stacking: z.ZodEnum<["EXCLUSIVE", "COMBINABLE", "BEST_OFFER"]>;
    retailTotal: z.ZodNumber;
    discountTotal: z.ZodNumber;
    finalTotal: z.ZodNumber;
    status: z.ZodEnum<["VALID", "REQUIRES_REVIEW", "INVALID"]>;
    issues: z.ZodArray<z.ZodString, "many">;
    lines: z.ZodArray<z.ZodObject<{
        variantId: z.ZodString;
        slotKey: z.ZodString;
        participatingQuantity: z.ZodNumber;
        allocatedDiscount: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        variantId: string;
        slotKey: string;
        participatingQuantity: number;
        allocatedDiscount: number;
    }, {
        variantId: string;
        slotKey: string;
        participatingQuantity: number;
        allocatedDiscount: number;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    issues: string[];
    status: "VALID" | "REQUIRES_REVIEW" | "INVALID";
    id: string;
    name: {
        en: string;
        ar: string;
    };
    stacking: "EXCLUSIVE" | "COMBINABLE" | "BEST_OFFER";
    lines: {
        variantId: string;
        slotKey: string;
        participatingQuantity: number;
        allocatedDiscount: number;
    }[];
    slug: string;
    bundleId: string;
    version: number;
    retailTotal: number;
    discountTotal: number;
    finalTotal: number;
}, {
    issues: string[];
    status: "VALID" | "REQUIRES_REVIEW" | "INVALID";
    id: string;
    name: {
        en: string;
        ar: string;
    };
    stacking: "EXCLUSIVE" | "COMBINABLE" | "BEST_OFFER";
    lines: {
        variantId: string;
        slotKey: string;
        participatingQuantity: number;
        allocatedDiscount: number;
    }[];
    slug: string;
    bundleId: string;
    version: number;
    retailTotal: number;
    discountTotal: number;
    finalTotal: number;
}>;
export type CartBundleInstanceResponse = z.infer<typeof cartBundleInstanceSchema>;
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
        variantOptions: z.ZodArray<z.ZodObject<{
            optionId: z.ZodString;
            optionNameEn: z.ZodString;
            optionNameAr: z.ZodString;
            valueId: z.ZodString;
            valueEn: z.ZodString;
            valueAr: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            optionId: string;
            optionNameEn: string;
            optionNameAr: string;
            valueId: string;
            valueEn: string;
            valueAr: string;
        }, {
            optionId: string;
            optionNameEn: string;
            optionNameAr: string;
            valueId: string;
            valueEn: string;
            valueAr: string;
        }>, "many">;
        sku: z.ZodString;
        imageUrl: z.ZodNullable<z.ZodString>;
        categoryId: z.ZodString;
        categoryIds: z.ZodArray<z.ZodString, "many">;
        brandId: z.ZodNullable<z.ZodString>;
        unitPrice: z.ZodNumber;
        quantity: z.ZodNumber;
        lineTotal: z.ZodNumber;
        discount: z.ZodNumber;
        discountedLineTotal: z.ZodNumber;
        available: z.ZodNumber;
        maxAvailable: z.ZodNumber;
        status: z.ZodEnum<["AVAILABLE", "OUT_OF_STOCK", "NOT_SELLABLE"]>;
        issues: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        issues: string[];
        status: "AVAILABLE" | "OUT_OF_STOCK" | "NOT_SELLABLE";
        categoryIds: string[];
        quantity: number;
        variantId: string;
        productId: string;
        categoryId: string;
        brandId: string | null;
        unitPrice: number;
        discount: number;
        discountedLineTotal: number;
        variantOptions: {
            optionId: string;
            optionNameEn: string;
            optionNameAr: string;
            valueId: string;
            valueEn: string;
            valueAr: string;
        }[];
        sku: string;
        imageUrl: string | null;
        slug: string;
        productNameEn: string;
        productNameAr: string;
        variantNameEn: string;
        variantNameAr: string;
        available: number;
        maxAvailable: number;
        lineTotal: number;
    }, {
        issues: string[];
        status: "AVAILABLE" | "OUT_OF_STOCK" | "NOT_SELLABLE";
        categoryIds: string[];
        quantity: number;
        variantId: string;
        productId: string;
        categoryId: string;
        brandId: string | null;
        unitPrice: number;
        discount: number;
        discountedLineTotal: number;
        variantOptions: {
            optionId: string;
            optionNameEn: string;
            optionNameAr: string;
            valueId: string;
            valueEn: string;
            valueAr: string;
        }[];
        sku: string;
        imageUrl: string | null;
        slug: string;
        productNameEn: string;
        productNameAr: string;
        variantNameEn: string;
        variantNameAr: string;
        available: number;
        maxAvailable: number;
        lineTotal: number;
    }>, "many">;
    subtotal: z.ZodNumber;
    discountTotal: z.ZodNumber;
    estimatedTotal: z.ZodNumber;
    totalSavings: z.ZodNumber;
    couponCode: z.ZodNullable<z.ZodString>;
    couponInvalidation: z.ZodDefault<z.ZodNullable<z.ZodObject<{
        code: z.ZodLiteral<"PROMO_NOT_APPLICABLE">;
        promoCode: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        code: "PROMO_NOT_APPLICABLE";
        promoCode: string;
    }, {
        code: "PROMO_NOT_APPLICABLE";
        promoCode: string;
    }>>>;
    appliedPromotions: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        title: z.ZodString;
        type: z.ZodEnum<["PRODUCT_DISCOUNT", "CART_DISCOUNT", "BUY_X_GET_Y", "BUNDLE", "QUANTITY_TIER", "SPEND_TIER", "FREE_SHIPPING", "FREE_GIFT", "FLASH_SALE"]>;
        couponCode: z.ZodNullable<z.ZodString>;
        discountAmount: z.ZodNumber;
        shippingDiscount: z.ZodNumber;
        discountedUnits: z.ZodNumber;
        message: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        message: string;
        type: "FREE_SHIPPING" | "PRODUCT_DISCOUNT" | "CART_DISCOUNT" | "BUY_X_GET_Y" | "BUNDLE" | "QUANTITY_TIER" | "SPEND_TIER" | "FREE_GIFT" | "FLASH_SALE";
        id: string;
        name: string;
        discountedUnits: number;
        couponCode: string | null;
        title: string;
        discountAmount: number;
        shippingDiscount: number;
    }, {
        message: string;
        type: "FREE_SHIPPING" | "PRODUCT_DISCOUNT" | "CART_DISCOUNT" | "BUY_X_GET_Y" | "BUNDLE" | "QUANTITY_TIER" | "SPEND_TIER" | "FREE_GIFT" | "FLASH_SALE";
        id: string;
        name: string;
        discountedUnits: number;
        couponCode: string | null;
        title: string;
        discountAmount: number;
        shippingDiscount: number;
    }>, "many">;
    promotionMessages: z.ZodArray<z.ZodString, "many">;
    giftOptions: z.ZodArray<z.ZodObject<{
        variantId: z.ZodString;
        quantity: z.ZodNumber;
        customerChooses: z.ZodBoolean;
        promotionId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        quantity: number;
        variantId: string;
        customerChooses: boolean;
        promotionId: string;
    }, {
        quantity: number;
        variantId: string;
        customerChooses: boolean;
        promotionId: string;
    }>, "many">;
    totalQuantity: z.ZodNumber;
    hasIssues: z.ZodBoolean;
    savedForLater: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        productId: z.ZodNullable<z.ZodString>;
        variantId: z.ZodNullable<z.ZodString>;
        slug: z.ZodString;
        productNameEn: z.ZodString;
        productNameAr: z.ZodString;
        variantNameEn: z.ZodString;
        variantNameAr: z.ZodString;
        brandName: z.ZodNullable<z.ZodString>;
        imageUrl: z.ZodNullable<z.ZodString>;
        desiredQuantity: z.ZodNumber;
        priceWhenSaved: z.ZodNumber;
        currentPrice: z.ZodNullable<z.ZodNumber>;
        priceChange: z.ZodEnum<["UNCHANGED", "INCREASED", "DECREASED", "UNAVAILABLE"]>;
        available: z.ZodNumber;
        maxAvailable: z.ZodNumber;
        status: z.ZodEnum<["AVAILABLE", "OUT_OF_STOCK", "VARIANT_UNAVAILABLE", "PRODUCT_UNAVAILABLE"]>;
        savedAt: z.ZodString;
        issues: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        issues: string[];
        status: "AVAILABLE" | "OUT_OF_STOCK" | "VARIANT_UNAVAILABLE" | "PRODUCT_UNAVAILABLE";
        id: string;
        variantId: string | null;
        productId: string | null;
        imageUrl: string | null;
        slug: string;
        productNameEn: string;
        productNameAr: string;
        variantNameEn: string;
        variantNameAr: string;
        brandName: string | null;
        desiredQuantity: number;
        priceWhenSaved: number;
        currentPrice: number | null;
        priceChange: "UNCHANGED" | "INCREASED" | "DECREASED" | "UNAVAILABLE";
        available: number;
        maxAvailable: number;
        savedAt: string;
    }, {
        issues: string[];
        status: "AVAILABLE" | "OUT_OF_STOCK" | "VARIANT_UNAVAILABLE" | "PRODUCT_UNAVAILABLE";
        id: string;
        variantId: string | null;
        productId: string | null;
        imageUrl: string | null;
        slug: string;
        productNameEn: string;
        productNameAr: string;
        variantNameEn: string;
        variantNameAr: string;
        brandName: string | null;
        desiredQuantity: number;
        priceWhenSaved: number;
        currentPrice: number | null;
        priceChange: "UNCHANGED" | "INCREASED" | "DECREASED" | "UNAVAILABLE";
        available: number;
        maxAvailable: number;
        savedAt: string;
    }>, "many">>;
    savedForLaterCount: z.ZodOptional<z.ZodNumber>;
    bundleInstances: z.ZodDefault<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        bundleId: z.ZodString;
        slug: z.ZodString;
        version: z.ZodNumber;
        name: z.ZodObject<{
            en: z.ZodString;
            ar: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            en: string;
            ar: string;
        }, {
            en: string;
            ar: string;
        }>;
        stacking: z.ZodEnum<["EXCLUSIVE", "COMBINABLE", "BEST_OFFER"]>;
        retailTotal: z.ZodNumber;
        discountTotal: z.ZodNumber;
        finalTotal: z.ZodNumber;
        status: z.ZodEnum<["VALID", "REQUIRES_REVIEW", "INVALID"]>;
        issues: z.ZodArray<z.ZodString, "many">;
        lines: z.ZodArray<z.ZodObject<{
            variantId: z.ZodString;
            slotKey: z.ZodString;
            participatingQuantity: z.ZodNumber;
            allocatedDiscount: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            variantId: string;
            slotKey: string;
            participatingQuantity: number;
            allocatedDiscount: number;
        }, {
            variantId: string;
            slotKey: string;
            participatingQuantity: number;
            allocatedDiscount: number;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        issues: string[];
        status: "VALID" | "REQUIRES_REVIEW" | "INVALID";
        id: string;
        name: {
            en: string;
            ar: string;
        };
        stacking: "EXCLUSIVE" | "COMBINABLE" | "BEST_OFFER";
        lines: {
            variantId: string;
            slotKey: string;
            participatingQuantity: number;
            allocatedDiscount: number;
        }[];
        slug: string;
        bundleId: string;
        version: number;
        retailTotal: number;
        discountTotal: number;
        finalTotal: number;
    }, {
        issues: string[];
        status: "VALID" | "REQUIRES_REVIEW" | "INVALID";
        id: string;
        name: {
            en: string;
            ar: string;
        };
        stacking: "EXCLUSIVE" | "COMBINABLE" | "BEST_OFFER";
        lines: {
            variantId: string;
            slotKey: string;
            participatingQuantity: number;
            allocatedDiscount: number;
        }[];
        slug: string;
        bundleId: string;
        version: number;
        retailTotal: number;
        discountTotal: number;
        finalTotal: number;
    }>, "many">>;
    bundleDiscountTotal: z.ZodDefault<z.ZodNumber>;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    updatedAt: string;
    items: {
        issues: string[];
        status: "AVAILABLE" | "OUT_OF_STOCK" | "NOT_SELLABLE";
        categoryIds: string[];
        quantity: number;
        variantId: string;
        productId: string;
        categoryId: string;
        brandId: string | null;
        unitPrice: number;
        discount: number;
        discountedLineTotal: number;
        variantOptions: {
            optionId: string;
            optionNameEn: string;
            optionNameAr: string;
            valueId: string;
            valueEn: string;
            valueAr: string;
        }[];
        sku: string;
        imageUrl: string | null;
        slug: string;
        productNameEn: string;
        productNameAr: string;
        variantNameEn: string;
        variantNameAr: string;
        available: number;
        maxAvailable: number;
        lineTotal: number;
    }[];
    couponCode: string | null;
    totalSavings: number;
    appliedPromotions: {
        message: string;
        type: "FREE_SHIPPING" | "PRODUCT_DISCOUNT" | "CART_DISCOUNT" | "BUY_X_GET_Y" | "BUNDLE" | "QUANTITY_TIER" | "SPEND_TIER" | "FREE_GIFT" | "FLASH_SALE";
        id: string;
        name: string;
        discountedUnits: number;
        couponCode: string | null;
        title: string;
        discountAmount: number;
        shippingDiscount: number;
    }[];
    subtotal: number;
    discountTotal: number;
    cartId: string | null;
    owner: "GUEST" | "USER";
    estimatedTotal: number;
    couponInvalidation: {
        code: "PROMO_NOT_APPLICABLE";
        promoCode: string;
    } | null;
    promotionMessages: string[];
    giftOptions: {
        quantity: number;
        variantId: string;
        customerChooses: boolean;
        promotionId: string;
    }[];
    totalQuantity: number;
    hasIssues: boolean;
    bundleInstances: {
        issues: string[];
        status: "VALID" | "REQUIRES_REVIEW" | "INVALID";
        id: string;
        name: {
            en: string;
            ar: string;
        };
        stacking: "EXCLUSIVE" | "COMBINABLE" | "BEST_OFFER";
        lines: {
            variantId: string;
            slotKey: string;
            participatingQuantity: number;
            allocatedDiscount: number;
        }[];
        slug: string;
        bundleId: string;
        version: number;
        retailTotal: number;
        discountTotal: number;
        finalTotal: number;
    }[];
    bundleDiscountTotal: number;
    savedForLater?: {
        issues: string[];
        status: "AVAILABLE" | "OUT_OF_STOCK" | "VARIANT_UNAVAILABLE" | "PRODUCT_UNAVAILABLE";
        id: string;
        variantId: string | null;
        productId: string | null;
        imageUrl: string | null;
        slug: string;
        productNameEn: string;
        productNameAr: string;
        variantNameEn: string;
        variantNameAr: string;
        brandName: string | null;
        desiredQuantity: number;
        priceWhenSaved: number;
        currentPrice: number | null;
        priceChange: "UNCHANGED" | "INCREASED" | "DECREASED" | "UNAVAILABLE";
        available: number;
        maxAvailable: number;
        savedAt: string;
    }[] | undefined;
    savedForLaterCount?: number | undefined;
}, {
    updatedAt: string;
    items: {
        issues: string[];
        status: "AVAILABLE" | "OUT_OF_STOCK" | "NOT_SELLABLE";
        categoryIds: string[];
        quantity: number;
        variantId: string;
        productId: string;
        categoryId: string;
        brandId: string | null;
        unitPrice: number;
        discount: number;
        discountedLineTotal: number;
        variantOptions: {
            optionId: string;
            optionNameEn: string;
            optionNameAr: string;
            valueId: string;
            valueEn: string;
            valueAr: string;
        }[];
        sku: string;
        imageUrl: string | null;
        slug: string;
        productNameEn: string;
        productNameAr: string;
        variantNameEn: string;
        variantNameAr: string;
        available: number;
        maxAvailable: number;
        lineTotal: number;
    }[];
    couponCode: string | null;
    totalSavings: number;
    appliedPromotions: {
        message: string;
        type: "FREE_SHIPPING" | "PRODUCT_DISCOUNT" | "CART_DISCOUNT" | "BUY_X_GET_Y" | "BUNDLE" | "QUANTITY_TIER" | "SPEND_TIER" | "FREE_GIFT" | "FLASH_SALE";
        id: string;
        name: string;
        discountedUnits: number;
        couponCode: string | null;
        title: string;
        discountAmount: number;
        shippingDiscount: number;
    }[];
    subtotal: number;
    discountTotal: number;
    cartId: string | null;
    owner: "GUEST" | "USER";
    estimatedTotal: number;
    promotionMessages: string[];
    giftOptions: {
        quantity: number;
        variantId: string;
        customerChooses: boolean;
        promotionId: string;
    }[];
    totalQuantity: number;
    hasIssues: boolean;
    couponInvalidation?: {
        code: "PROMO_NOT_APPLICABLE";
        promoCode: string;
    } | null | undefined;
    savedForLater?: {
        issues: string[];
        status: "AVAILABLE" | "OUT_OF_STOCK" | "VARIANT_UNAVAILABLE" | "PRODUCT_UNAVAILABLE";
        id: string;
        variantId: string | null;
        productId: string | null;
        imageUrl: string | null;
        slug: string;
        productNameEn: string;
        productNameAr: string;
        variantNameEn: string;
        variantNameAr: string;
        brandName: string | null;
        desiredQuantity: number;
        priceWhenSaved: number;
        currentPrice: number | null;
        priceChange: "UNCHANGED" | "INCREASED" | "DECREASED" | "UNAVAILABLE";
        available: number;
        maxAvailable: number;
        savedAt: string;
    }[] | undefined;
    savedForLaterCount?: number | undefined;
    bundleInstances?: {
        issues: string[];
        status: "VALID" | "REQUIRES_REVIEW" | "INVALID";
        id: string;
        name: {
            en: string;
            ar: string;
        };
        stacking: "EXCLUSIVE" | "COMBINABLE" | "BEST_OFFER";
        lines: {
            variantId: string;
            slotKey: string;
            participatingQuantity: number;
            allocatedDiscount: number;
        }[];
        slug: string;
        bundleId: string;
        version: number;
        retailTotal: number;
        discountTotal: number;
        finalTotal: number;
    }[] | undefined;
    bundleDiscountTotal?: number | undefined;
}>;
export type CartResponse = z.infer<typeof cartSchema>;
export declare const bulkMoveSavedResponseSchema: z.ZodObject<{
    cart: z.ZodObject<{
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
            variantOptions: z.ZodArray<z.ZodObject<{
                optionId: z.ZodString;
                optionNameEn: z.ZodString;
                optionNameAr: z.ZodString;
                valueId: z.ZodString;
                valueEn: z.ZodString;
                valueAr: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                optionId: string;
                optionNameEn: string;
                optionNameAr: string;
                valueId: string;
                valueEn: string;
                valueAr: string;
            }, {
                optionId: string;
                optionNameEn: string;
                optionNameAr: string;
                valueId: string;
                valueEn: string;
                valueAr: string;
            }>, "many">;
            sku: z.ZodString;
            imageUrl: z.ZodNullable<z.ZodString>;
            categoryId: z.ZodString;
            categoryIds: z.ZodArray<z.ZodString, "many">;
            brandId: z.ZodNullable<z.ZodString>;
            unitPrice: z.ZodNumber;
            quantity: z.ZodNumber;
            lineTotal: z.ZodNumber;
            discount: z.ZodNumber;
            discountedLineTotal: z.ZodNumber;
            available: z.ZodNumber;
            maxAvailable: z.ZodNumber;
            status: z.ZodEnum<["AVAILABLE", "OUT_OF_STOCK", "NOT_SELLABLE"]>;
            issues: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            issues: string[];
            status: "AVAILABLE" | "OUT_OF_STOCK" | "NOT_SELLABLE";
            categoryIds: string[];
            quantity: number;
            variantId: string;
            productId: string;
            categoryId: string;
            brandId: string | null;
            unitPrice: number;
            discount: number;
            discountedLineTotal: number;
            variantOptions: {
                optionId: string;
                optionNameEn: string;
                optionNameAr: string;
                valueId: string;
                valueEn: string;
                valueAr: string;
            }[];
            sku: string;
            imageUrl: string | null;
            slug: string;
            productNameEn: string;
            productNameAr: string;
            variantNameEn: string;
            variantNameAr: string;
            available: number;
            maxAvailable: number;
            lineTotal: number;
        }, {
            issues: string[];
            status: "AVAILABLE" | "OUT_OF_STOCK" | "NOT_SELLABLE";
            categoryIds: string[];
            quantity: number;
            variantId: string;
            productId: string;
            categoryId: string;
            brandId: string | null;
            unitPrice: number;
            discount: number;
            discountedLineTotal: number;
            variantOptions: {
                optionId: string;
                optionNameEn: string;
                optionNameAr: string;
                valueId: string;
                valueEn: string;
                valueAr: string;
            }[];
            sku: string;
            imageUrl: string | null;
            slug: string;
            productNameEn: string;
            productNameAr: string;
            variantNameEn: string;
            variantNameAr: string;
            available: number;
            maxAvailable: number;
            lineTotal: number;
        }>, "many">;
        subtotal: z.ZodNumber;
        discountTotal: z.ZodNumber;
        estimatedTotal: z.ZodNumber;
        totalSavings: z.ZodNumber;
        couponCode: z.ZodNullable<z.ZodString>;
        couponInvalidation: z.ZodDefault<z.ZodNullable<z.ZodObject<{
            code: z.ZodLiteral<"PROMO_NOT_APPLICABLE">;
            promoCode: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            code: "PROMO_NOT_APPLICABLE";
            promoCode: string;
        }, {
            code: "PROMO_NOT_APPLICABLE";
            promoCode: string;
        }>>>;
        appliedPromotions: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
            title: z.ZodString;
            type: z.ZodEnum<["PRODUCT_DISCOUNT", "CART_DISCOUNT", "BUY_X_GET_Y", "BUNDLE", "QUANTITY_TIER", "SPEND_TIER", "FREE_SHIPPING", "FREE_GIFT", "FLASH_SALE"]>;
            couponCode: z.ZodNullable<z.ZodString>;
            discountAmount: z.ZodNumber;
            shippingDiscount: z.ZodNumber;
            discountedUnits: z.ZodNumber;
            message: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            message: string;
            type: "FREE_SHIPPING" | "PRODUCT_DISCOUNT" | "CART_DISCOUNT" | "BUY_X_GET_Y" | "BUNDLE" | "QUANTITY_TIER" | "SPEND_TIER" | "FREE_GIFT" | "FLASH_SALE";
            id: string;
            name: string;
            discountedUnits: number;
            couponCode: string | null;
            title: string;
            discountAmount: number;
            shippingDiscount: number;
        }, {
            message: string;
            type: "FREE_SHIPPING" | "PRODUCT_DISCOUNT" | "CART_DISCOUNT" | "BUY_X_GET_Y" | "BUNDLE" | "QUANTITY_TIER" | "SPEND_TIER" | "FREE_GIFT" | "FLASH_SALE";
            id: string;
            name: string;
            discountedUnits: number;
            couponCode: string | null;
            title: string;
            discountAmount: number;
            shippingDiscount: number;
        }>, "many">;
        promotionMessages: z.ZodArray<z.ZodString, "many">;
        giftOptions: z.ZodArray<z.ZodObject<{
            variantId: z.ZodString;
            quantity: z.ZodNumber;
            customerChooses: z.ZodBoolean;
            promotionId: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            quantity: number;
            variantId: string;
            customerChooses: boolean;
            promotionId: string;
        }, {
            quantity: number;
            variantId: string;
            customerChooses: boolean;
            promotionId: string;
        }>, "many">;
        totalQuantity: z.ZodNumber;
        hasIssues: z.ZodBoolean;
        savedForLater: z.ZodOptional<z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            productId: z.ZodNullable<z.ZodString>;
            variantId: z.ZodNullable<z.ZodString>;
            slug: z.ZodString;
            productNameEn: z.ZodString;
            productNameAr: z.ZodString;
            variantNameEn: z.ZodString;
            variantNameAr: z.ZodString;
            brandName: z.ZodNullable<z.ZodString>;
            imageUrl: z.ZodNullable<z.ZodString>;
            desiredQuantity: z.ZodNumber;
            priceWhenSaved: z.ZodNumber;
            currentPrice: z.ZodNullable<z.ZodNumber>;
            priceChange: z.ZodEnum<["UNCHANGED", "INCREASED", "DECREASED", "UNAVAILABLE"]>;
            available: z.ZodNumber;
            maxAvailable: z.ZodNumber;
            status: z.ZodEnum<["AVAILABLE", "OUT_OF_STOCK", "VARIANT_UNAVAILABLE", "PRODUCT_UNAVAILABLE"]>;
            savedAt: z.ZodString;
            issues: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            issues: string[];
            status: "AVAILABLE" | "OUT_OF_STOCK" | "VARIANT_UNAVAILABLE" | "PRODUCT_UNAVAILABLE";
            id: string;
            variantId: string | null;
            productId: string | null;
            imageUrl: string | null;
            slug: string;
            productNameEn: string;
            productNameAr: string;
            variantNameEn: string;
            variantNameAr: string;
            brandName: string | null;
            desiredQuantity: number;
            priceWhenSaved: number;
            currentPrice: number | null;
            priceChange: "UNCHANGED" | "INCREASED" | "DECREASED" | "UNAVAILABLE";
            available: number;
            maxAvailable: number;
            savedAt: string;
        }, {
            issues: string[];
            status: "AVAILABLE" | "OUT_OF_STOCK" | "VARIANT_UNAVAILABLE" | "PRODUCT_UNAVAILABLE";
            id: string;
            variantId: string | null;
            productId: string | null;
            imageUrl: string | null;
            slug: string;
            productNameEn: string;
            productNameAr: string;
            variantNameEn: string;
            variantNameAr: string;
            brandName: string | null;
            desiredQuantity: number;
            priceWhenSaved: number;
            currentPrice: number | null;
            priceChange: "UNCHANGED" | "INCREASED" | "DECREASED" | "UNAVAILABLE";
            available: number;
            maxAvailable: number;
            savedAt: string;
        }>, "many">>;
        savedForLaterCount: z.ZodOptional<z.ZodNumber>;
        bundleInstances: z.ZodDefault<z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            bundleId: z.ZodString;
            slug: z.ZodString;
            version: z.ZodNumber;
            name: z.ZodObject<{
                en: z.ZodString;
                ar: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                en: string;
                ar: string;
            }, {
                en: string;
                ar: string;
            }>;
            stacking: z.ZodEnum<["EXCLUSIVE", "COMBINABLE", "BEST_OFFER"]>;
            retailTotal: z.ZodNumber;
            discountTotal: z.ZodNumber;
            finalTotal: z.ZodNumber;
            status: z.ZodEnum<["VALID", "REQUIRES_REVIEW", "INVALID"]>;
            issues: z.ZodArray<z.ZodString, "many">;
            lines: z.ZodArray<z.ZodObject<{
                variantId: z.ZodString;
                slotKey: z.ZodString;
                participatingQuantity: z.ZodNumber;
                allocatedDiscount: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                variantId: string;
                slotKey: string;
                participatingQuantity: number;
                allocatedDiscount: number;
            }, {
                variantId: string;
                slotKey: string;
                participatingQuantity: number;
                allocatedDiscount: number;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            issues: string[];
            status: "VALID" | "REQUIRES_REVIEW" | "INVALID";
            id: string;
            name: {
                en: string;
                ar: string;
            };
            stacking: "EXCLUSIVE" | "COMBINABLE" | "BEST_OFFER";
            lines: {
                variantId: string;
                slotKey: string;
                participatingQuantity: number;
                allocatedDiscount: number;
            }[];
            slug: string;
            bundleId: string;
            version: number;
            retailTotal: number;
            discountTotal: number;
            finalTotal: number;
        }, {
            issues: string[];
            status: "VALID" | "REQUIRES_REVIEW" | "INVALID";
            id: string;
            name: {
                en: string;
                ar: string;
            };
            stacking: "EXCLUSIVE" | "COMBINABLE" | "BEST_OFFER";
            lines: {
                variantId: string;
                slotKey: string;
                participatingQuantity: number;
                allocatedDiscount: number;
            }[];
            slug: string;
            bundleId: string;
            version: number;
            retailTotal: number;
            discountTotal: number;
            finalTotal: number;
        }>, "many">>;
        bundleDiscountTotal: z.ZodDefault<z.ZodNumber>;
        updatedAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        updatedAt: string;
        items: {
            issues: string[];
            status: "AVAILABLE" | "OUT_OF_STOCK" | "NOT_SELLABLE";
            categoryIds: string[];
            quantity: number;
            variantId: string;
            productId: string;
            categoryId: string;
            brandId: string | null;
            unitPrice: number;
            discount: number;
            discountedLineTotal: number;
            variantOptions: {
                optionId: string;
                optionNameEn: string;
                optionNameAr: string;
                valueId: string;
                valueEn: string;
                valueAr: string;
            }[];
            sku: string;
            imageUrl: string | null;
            slug: string;
            productNameEn: string;
            productNameAr: string;
            variantNameEn: string;
            variantNameAr: string;
            available: number;
            maxAvailable: number;
            lineTotal: number;
        }[];
        couponCode: string | null;
        totalSavings: number;
        appliedPromotions: {
            message: string;
            type: "FREE_SHIPPING" | "PRODUCT_DISCOUNT" | "CART_DISCOUNT" | "BUY_X_GET_Y" | "BUNDLE" | "QUANTITY_TIER" | "SPEND_TIER" | "FREE_GIFT" | "FLASH_SALE";
            id: string;
            name: string;
            discountedUnits: number;
            couponCode: string | null;
            title: string;
            discountAmount: number;
            shippingDiscount: number;
        }[];
        subtotal: number;
        discountTotal: number;
        cartId: string | null;
        owner: "GUEST" | "USER";
        estimatedTotal: number;
        couponInvalidation: {
            code: "PROMO_NOT_APPLICABLE";
            promoCode: string;
        } | null;
        promotionMessages: string[];
        giftOptions: {
            quantity: number;
            variantId: string;
            customerChooses: boolean;
            promotionId: string;
        }[];
        totalQuantity: number;
        hasIssues: boolean;
        bundleInstances: {
            issues: string[];
            status: "VALID" | "REQUIRES_REVIEW" | "INVALID";
            id: string;
            name: {
                en: string;
                ar: string;
            };
            stacking: "EXCLUSIVE" | "COMBINABLE" | "BEST_OFFER";
            lines: {
                variantId: string;
                slotKey: string;
                participatingQuantity: number;
                allocatedDiscount: number;
            }[];
            slug: string;
            bundleId: string;
            version: number;
            retailTotal: number;
            discountTotal: number;
            finalTotal: number;
        }[];
        bundleDiscountTotal: number;
        savedForLater?: {
            issues: string[];
            status: "AVAILABLE" | "OUT_OF_STOCK" | "VARIANT_UNAVAILABLE" | "PRODUCT_UNAVAILABLE";
            id: string;
            variantId: string | null;
            productId: string | null;
            imageUrl: string | null;
            slug: string;
            productNameEn: string;
            productNameAr: string;
            variantNameEn: string;
            variantNameAr: string;
            brandName: string | null;
            desiredQuantity: number;
            priceWhenSaved: number;
            currentPrice: number | null;
            priceChange: "UNCHANGED" | "INCREASED" | "DECREASED" | "UNAVAILABLE";
            available: number;
            maxAvailable: number;
            savedAt: string;
        }[] | undefined;
        savedForLaterCount?: number | undefined;
    }, {
        updatedAt: string;
        items: {
            issues: string[];
            status: "AVAILABLE" | "OUT_OF_STOCK" | "NOT_SELLABLE";
            categoryIds: string[];
            quantity: number;
            variantId: string;
            productId: string;
            categoryId: string;
            brandId: string | null;
            unitPrice: number;
            discount: number;
            discountedLineTotal: number;
            variantOptions: {
                optionId: string;
                optionNameEn: string;
                optionNameAr: string;
                valueId: string;
                valueEn: string;
                valueAr: string;
            }[];
            sku: string;
            imageUrl: string | null;
            slug: string;
            productNameEn: string;
            productNameAr: string;
            variantNameEn: string;
            variantNameAr: string;
            available: number;
            maxAvailable: number;
            lineTotal: number;
        }[];
        couponCode: string | null;
        totalSavings: number;
        appliedPromotions: {
            message: string;
            type: "FREE_SHIPPING" | "PRODUCT_DISCOUNT" | "CART_DISCOUNT" | "BUY_X_GET_Y" | "BUNDLE" | "QUANTITY_TIER" | "SPEND_TIER" | "FREE_GIFT" | "FLASH_SALE";
            id: string;
            name: string;
            discountedUnits: number;
            couponCode: string | null;
            title: string;
            discountAmount: number;
            shippingDiscount: number;
        }[];
        subtotal: number;
        discountTotal: number;
        cartId: string | null;
        owner: "GUEST" | "USER";
        estimatedTotal: number;
        promotionMessages: string[];
        giftOptions: {
            quantity: number;
            variantId: string;
            customerChooses: boolean;
            promotionId: string;
        }[];
        totalQuantity: number;
        hasIssues: boolean;
        couponInvalidation?: {
            code: "PROMO_NOT_APPLICABLE";
            promoCode: string;
        } | null | undefined;
        savedForLater?: {
            issues: string[];
            status: "AVAILABLE" | "OUT_OF_STOCK" | "VARIANT_UNAVAILABLE" | "PRODUCT_UNAVAILABLE";
            id: string;
            variantId: string | null;
            productId: string | null;
            imageUrl: string | null;
            slug: string;
            productNameEn: string;
            productNameAr: string;
            variantNameEn: string;
            variantNameAr: string;
            brandName: string | null;
            desiredQuantity: number;
            priceWhenSaved: number;
            currentPrice: number | null;
            priceChange: "UNCHANGED" | "INCREASED" | "DECREASED" | "UNAVAILABLE";
            available: number;
            maxAvailable: number;
            savedAt: string;
        }[] | undefined;
        savedForLaterCount?: number | undefined;
        bundleInstances?: {
            issues: string[];
            status: "VALID" | "REQUIRES_REVIEW" | "INVALID";
            id: string;
            name: {
                en: string;
                ar: string;
            };
            stacking: "EXCLUSIVE" | "COMBINABLE" | "BEST_OFFER";
            lines: {
                variantId: string;
                slotKey: string;
                participatingQuantity: number;
                allocatedDiscount: number;
            }[];
            slug: string;
            bundleId: string;
            version: number;
            retailTotal: number;
            discountTotal: number;
            finalTotal: number;
        }[] | undefined;
        bundleDiscountTotal?: number | undefined;
    }>;
    results: z.ZodArray<z.ZodObject<{
        itemId: z.ZodString;
        status: z.ZodEnum<["MOVED", "OUT_OF_STOCK", "VARIANT_UNAVAILABLE", "PRODUCT_UNAVAILABLE", "INSUFFICIENT_STOCK"]>;
        available: z.ZodNumber;
        requested: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        status: "OUT_OF_STOCK" | "VARIANT_UNAVAILABLE" | "PRODUCT_UNAVAILABLE" | "MOVED" | "INSUFFICIENT_STOCK";
        available: number;
        itemId: string;
        requested: number;
    }, {
        status: "OUT_OF_STOCK" | "VARIANT_UNAVAILABLE" | "PRODUCT_UNAVAILABLE" | "MOVED" | "INSUFFICIENT_STOCK";
        available: number;
        itemId: string;
        requested: number;
    }>, "many">;
    movedCount: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    cart: {
        updatedAt: string;
        items: {
            issues: string[];
            status: "AVAILABLE" | "OUT_OF_STOCK" | "NOT_SELLABLE";
            categoryIds: string[];
            quantity: number;
            variantId: string;
            productId: string;
            categoryId: string;
            brandId: string | null;
            unitPrice: number;
            discount: number;
            discountedLineTotal: number;
            variantOptions: {
                optionId: string;
                optionNameEn: string;
                optionNameAr: string;
                valueId: string;
                valueEn: string;
                valueAr: string;
            }[];
            sku: string;
            imageUrl: string | null;
            slug: string;
            productNameEn: string;
            productNameAr: string;
            variantNameEn: string;
            variantNameAr: string;
            available: number;
            maxAvailable: number;
            lineTotal: number;
        }[];
        couponCode: string | null;
        totalSavings: number;
        appliedPromotions: {
            message: string;
            type: "FREE_SHIPPING" | "PRODUCT_DISCOUNT" | "CART_DISCOUNT" | "BUY_X_GET_Y" | "BUNDLE" | "QUANTITY_TIER" | "SPEND_TIER" | "FREE_GIFT" | "FLASH_SALE";
            id: string;
            name: string;
            discountedUnits: number;
            couponCode: string | null;
            title: string;
            discountAmount: number;
            shippingDiscount: number;
        }[];
        subtotal: number;
        discountTotal: number;
        cartId: string | null;
        owner: "GUEST" | "USER";
        estimatedTotal: number;
        couponInvalidation: {
            code: "PROMO_NOT_APPLICABLE";
            promoCode: string;
        } | null;
        promotionMessages: string[];
        giftOptions: {
            quantity: number;
            variantId: string;
            customerChooses: boolean;
            promotionId: string;
        }[];
        totalQuantity: number;
        hasIssues: boolean;
        bundleInstances: {
            issues: string[];
            status: "VALID" | "REQUIRES_REVIEW" | "INVALID";
            id: string;
            name: {
                en: string;
                ar: string;
            };
            stacking: "EXCLUSIVE" | "COMBINABLE" | "BEST_OFFER";
            lines: {
                variantId: string;
                slotKey: string;
                participatingQuantity: number;
                allocatedDiscount: number;
            }[];
            slug: string;
            bundleId: string;
            version: number;
            retailTotal: number;
            discountTotal: number;
            finalTotal: number;
        }[];
        bundleDiscountTotal: number;
        savedForLater?: {
            issues: string[];
            status: "AVAILABLE" | "OUT_OF_STOCK" | "VARIANT_UNAVAILABLE" | "PRODUCT_UNAVAILABLE";
            id: string;
            variantId: string | null;
            productId: string | null;
            imageUrl: string | null;
            slug: string;
            productNameEn: string;
            productNameAr: string;
            variantNameEn: string;
            variantNameAr: string;
            brandName: string | null;
            desiredQuantity: number;
            priceWhenSaved: number;
            currentPrice: number | null;
            priceChange: "UNCHANGED" | "INCREASED" | "DECREASED" | "UNAVAILABLE";
            available: number;
            maxAvailable: number;
            savedAt: string;
        }[] | undefined;
        savedForLaterCount?: number | undefined;
    };
    results: {
        status: "OUT_OF_STOCK" | "VARIANT_UNAVAILABLE" | "PRODUCT_UNAVAILABLE" | "MOVED" | "INSUFFICIENT_STOCK";
        available: number;
        itemId: string;
        requested: number;
    }[];
    movedCount: number;
}, {
    cart: {
        updatedAt: string;
        items: {
            issues: string[];
            status: "AVAILABLE" | "OUT_OF_STOCK" | "NOT_SELLABLE";
            categoryIds: string[];
            quantity: number;
            variantId: string;
            productId: string;
            categoryId: string;
            brandId: string | null;
            unitPrice: number;
            discount: number;
            discountedLineTotal: number;
            variantOptions: {
                optionId: string;
                optionNameEn: string;
                optionNameAr: string;
                valueId: string;
                valueEn: string;
                valueAr: string;
            }[];
            sku: string;
            imageUrl: string | null;
            slug: string;
            productNameEn: string;
            productNameAr: string;
            variantNameEn: string;
            variantNameAr: string;
            available: number;
            maxAvailable: number;
            lineTotal: number;
        }[];
        couponCode: string | null;
        totalSavings: number;
        appliedPromotions: {
            message: string;
            type: "FREE_SHIPPING" | "PRODUCT_DISCOUNT" | "CART_DISCOUNT" | "BUY_X_GET_Y" | "BUNDLE" | "QUANTITY_TIER" | "SPEND_TIER" | "FREE_GIFT" | "FLASH_SALE";
            id: string;
            name: string;
            discountedUnits: number;
            couponCode: string | null;
            title: string;
            discountAmount: number;
            shippingDiscount: number;
        }[];
        subtotal: number;
        discountTotal: number;
        cartId: string | null;
        owner: "GUEST" | "USER";
        estimatedTotal: number;
        promotionMessages: string[];
        giftOptions: {
            quantity: number;
            variantId: string;
            customerChooses: boolean;
            promotionId: string;
        }[];
        totalQuantity: number;
        hasIssues: boolean;
        couponInvalidation?: {
            code: "PROMO_NOT_APPLICABLE";
            promoCode: string;
        } | null | undefined;
        savedForLater?: {
            issues: string[];
            status: "AVAILABLE" | "OUT_OF_STOCK" | "VARIANT_UNAVAILABLE" | "PRODUCT_UNAVAILABLE";
            id: string;
            variantId: string | null;
            productId: string | null;
            imageUrl: string | null;
            slug: string;
            productNameEn: string;
            productNameAr: string;
            variantNameEn: string;
            variantNameAr: string;
            brandName: string | null;
            desiredQuantity: number;
            priceWhenSaved: number;
            currentPrice: number | null;
            priceChange: "UNCHANGED" | "INCREASED" | "DECREASED" | "UNAVAILABLE";
            available: number;
            maxAvailable: number;
            savedAt: string;
        }[] | undefined;
        savedForLaterCount?: number | undefined;
        bundleInstances?: {
            issues: string[];
            status: "VALID" | "REQUIRES_REVIEW" | "INVALID";
            id: string;
            name: {
                en: string;
                ar: string;
            };
            stacking: "EXCLUSIVE" | "COMBINABLE" | "BEST_OFFER";
            lines: {
                variantId: string;
                slotKey: string;
                participatingQuantity: number;
                allocatedDiscount: number;
            }[];
            slug: string;
            bundleId: string;
            version: number;
            retailTotal: number;
            discountTotal: number;
            finalTotal: number;
        }[] | undefined;
        bundleDiscountTotal?: number | undefined;
    };
    results: {
        status: "OUT_OF_STOCK" | "VARIANT_UNAVAILABLE" | "PRODUCT_UNAVAILABLE" | "MOVED" | "INSUFFICIENT_STOCK";
        available: number;
        itemId: string;
        requested: number;
    }[];
    movedCount: number;
}>;
export type BulkMoveSavedResponse = z.infer<typeof bulkMoveSavedResponseSchema>;
//# sourceMappingURL=cart.schema.d.ts.map