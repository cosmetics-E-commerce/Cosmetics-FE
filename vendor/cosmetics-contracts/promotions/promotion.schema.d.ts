import { z } from "zod";
export declare const promotionTypeEnum: z.ZodEnum<["PRODUCT_DISCOUNT", "CART_DISCOUNT", "BUY_X_GET_Y", "BUNDLE", "QUANTITY_TIER", "SPEND_TIER", "FREE_SHIPPING", "FREE_GIFT", "FLASH_SALE"]>;
export declare const promotionTriggerEnum: z.ZodEnum<["AUTOMATIC", "CODE"]>;
export declare const promotionStateEnum: z.ZodEnum<["DRAFT", "ACTIVE", "PAUSED", "ARCHIVED"]>;
export declare const promotionResolvedStatusEnum: z.ZodEnum<["DRAFT", "SCHEDULED", "ACTIVE", "PAUSED", "EXPIRED", "EXHAUSTED", "ARCHIVED"]>;
export declare const promotionStackingEnum: z.ZodEnum<["EXCLUSIVE", "COMBINABLE", "BEST_OFFER"]>;
export declare const promotionSelectorSchema: z.ZodObject<{
    productIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    variantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    categoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    brandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    excludedProductIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    excludedVariantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    excludedCategoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    excludedBrandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    productIds: string[];
    variantIds: string[];
    categoryIds: string[];
    brandIds: string[];
    excludedProductIds: string[];
    excludedVariantIds: string[];
    excludedCategoryIds: string[];
    excludedBrandIds: string[];
}, {
    productIds?: string[] | undefined;
    variantIds?: string[] | undefined;
    categoryIds?: string[] | undefined;
    brandIds?: string[] | undefined;
    excludedProductIds?: string[] | undefined;
    excludedVariantIds?: string[] | undefined;
    excludedCategoryIds?: string[] | undefined;
    excludedBrandIds?: string[] | undefined;
}>;
export type PromotionSelector = z.infer<typeof promotionSelectorSchema>;
export declare const promotionConditionSchema: z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
    type: z.ZodLiteral<"SUBTOTAL">;
    operator: z.ZodDefault<z.ZodEnum<["GT", "GTE", "LT", "LTE", "EQ"]>>;
    value: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    value: number;
    type: "SUBTOTAL";
    operator: "GT" | "GTE" | "LT" | "LTE" | "EQ";
}, {
    value: number;
    type: "SUBTOTAL";
    operator?: "GT" | "GTE" | "LT" | "LTE" | "EQ" | undefined;
}>, z.ZodObject<{
    type: z.ZodLiteral<"QUANTITY">;
    operator: z.ZodDefault<z.ZodEnum<["GT", "GTE", "LT", "LTE", "EQ"]>>;
    value: z.ZodNumber;
    selector: z.ZodOptional<z.ZodObject<{
        productIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        variantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        categoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        brandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        excludedProductIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        excludedVariantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        excludedCategoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        excludedBrandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        productIds: string[];
        variantIds: string[];
        categoryIds: string[];
        brandIds: string[];
        excludedProductIds: string[];
        excludedVariantIds: string[];
        excludedCategoryIds: string[];
        excludedBrandIds: string[];
    }, {
        productIds?: string[] | undefined;
        variantIds?: string[] | undefined;
        categoryIds?: string[] | undefined;
        brandIds?: string[] | undefined;
        excludedProductIds?: string[] | undefined;
        excludedVariantIds?: string[] | undefined;
        excludedCategoryIds?: string[] | undefined;
        excludedBrandIds?: string[] | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    value: number;
    type: "QUANTITY";
    operator: "GT" | "GTE" | "LT" | "LTE" | "EQ";
    selector?: {
        productIds: string[];
        variantIds: string[];
        categoryIds: string[];
        brandIds: string[];
        excludedProductIds: string[];
        excludedVariantIds: string[];
        excludedCategoryIds: string[];
        excludedBrandIds: string[];
    } | undefined;
}, {
    value: number;
    type: "QUANTITY";
    operator?: "GT" | "GTE" | "LT" | "LTE" | "EQ" | undefined;
    selector?: {
        productIds?: string[] | undefined;
        variantIds?: string[] | undefined;
        categoryIds?: string[] | undefined;
        brandIds?: string[] | undefined;
        excludedProductIds?: string[] | undefined;
        excludedVariantIds?: string[] | undefined;
        excludedCategoryIds?: string[] | undefined;
        excludedBrandIds?: string[] | undefined;
    } | undefined;
}>, z.ZodObject<{
    type: z.ZodLiteral<"HAS_ITEMS">;
    selector: z.ZodObject<{
        productIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        variantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        categoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        brandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        excludedProductIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        excludedVariantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        excludedCategoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        excludedBrandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        productIds: string[];
        variantIds: string[];
        categoryIds: string[];
        brandIds: string[];
        excludedProductIds: string[];
        excludedVariantIds: string[];
        excludedCategoryIds: string[];
        excludedBrandIds: string[];
    }, {
        productIds?: string[] | undefined;
        variantIds?: string[] | undefined;
        categoryIds?: string[] | undefined;
        brandIds?: string[] | undefined;
        excludedProductIds?: string[] | undefined;
        excludedVariantIds?: string[] | undefined;
        excludedCategoryIds?: string[] | undefined;
        excludedBrandIds?: string[] | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    type: "HAS_ITEMS";
    selector: {
        productIds: string[];
        variantIds: string[];
        categoryIds: string[];
        brandIds: string[];
        excludedProductIds: string[];
        excludedVariantIds: string[];
        excludedCategoryIds: string[];
        excludedBrandIds: string[];
    };
}, {
    type: "HAS_ITEMS";
    selector: {
        productIds?: string[] | undefined;
        variantIds?: string[] | undefined;
        categoryIds?: string[] | undefined;
        brandIds?: string[] | undefined;
        excludedProductIds?: string[] | undefined;
        excludedVariantIds?: string[] | undefined;
        excludedCategoryIds?: string[] | undefined;
        excludedBrandIds?: string[] | undefined;
    };
}>, z.ZodObject<{
    type: z.ZodLiteral<"MISSING_ITEMS">;
    selector: z.ZodObject<{
        productIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        variantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        categoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        brandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        excludedProductIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        excludedVariantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        excludedCategoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        excludedBrandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        productIds: string[];
        variantIds: string[];
        categoryIds: string[];
        brandIds: string[];
        excludedProductIds: string[];
        excludedVariantIds: string[];
        excludedCategoryIds: string[];
        excludedBrandIds: string[];
    }, {
        productIds?: string[] | undefined;
        variantIds?: string[] | undefined;
        categoryIds?: string[] | undefined;
        brandIds?: string[] | undefined;
        excludedProductIds?: string[] | undefined;
        excludedVariantIds?: string[] | undefined;
        excludedCategoryIds?: string[] | undefined;
        excludedBrandIds?: string[] | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    type: "MISSING_ITEMS";
    selector: {
        productIds: string[];
        variantIds: string[];
        categoryIds: string[];
        brandIds: string[];
        excludedProductIds: string[];
        excludedVariantIds: string[];
        excludedCategoryIds: string[];
        excludedBrandIds: string[];
    };
}, {
    type: "MISSING_ITEMS";
    selector: {
        productIds?: string[] | undefined;
        variantIds?: string[] | undefined;
        categoryIds?: string[] | undefined;
        brandIds?: string[] | undefined;
        excludedProductIds?: string[] | undefined;
        excludedVariantIds?: string[] | undefined;
        excludedCategoryIds?: string[] | undefined;
        excludedBrandIds?: string[] | undefined;
    };
}>, z.ZodObject<{
    type: z.ZodLiteral<"CUSTOMER_TYPE">;
    value: z.ZodEnum<["EVERYONE", "AUTHENTICATED", "GUEST", "FIRST_ORDER", "RETURNING", "VIP"]>;
}, "strip", z.ZodTypeAny, {
    value: "EVERYONE" | "AUTHENTICATED" | "GUEST" | "FIRST_ORDER" | "RETURNING" | "VIP";
    type: "CUSTOMER_TYPE";
}, {
    value: "EVERYONE" | "AUTHENTICATED" | "GUEST" | "FIRST_ORDER" | "RETURNING" | "VIP";
    type: "CUSTOMER_TYPE";
}>, z.ZodObject<{
    type: z.ZodLiteral<"CUSTOMER">;
    customerIds: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    type: "CUSTOMER";
    customerIds: string[];
}, {
    type: "CUSTOMER";
    customerIds: string[];
}>, z.ZodObject<{
    type: z.ZodLiteral<"PAST_ORDER_COUNT">;
    operator: z.ZodDefault<z.ZodEnum<["GT", "GTE", "LT", "LTE", "EQ"]>>;
    value: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    value: number;
    type: "PAST_ORDER_COUNT";
    operator: "GT" | "GTE" | "LT" | "LTE" | "EQ";
}, {
    value: number;
    type: "PAST_ORDER_COUNT";
    operator?: "GT" | "GTE" | "LT" | "LTE" | "EQ" | undefined;
}>, z.ZodObject<{
    type: z.ZodLiteral<"LIFETIME_SPEND">;
    operator: z.ZodDefault<z.ZodEnum<["GT", "GTE", "LT", "LTE", "EQ"]>>;
    value: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    value: number;
    type: "LIFETIME_SPEND";
    operator: "GT" | "GTE" | "LT" | "LTE" | "EQ";
}, {
    value: number;
    type: "LIFETIME_SPEND";
    operator?: "GT" | "GTE" | "LT" | "LTE" | "EQ" | undefined;
}>, z.ZodObject<{
    type: z.ZodLiteral<"INACTIVE_DAYS">;
    operator: z.ZodDefault<z.ZodEnum<["GT", "GTE", "LT", "LTE", "EQ"]>>;
    value: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    value: number;
    type: "INACTIVE_DAYS";
    operator: "GT" | "GTE" | "LT" | "LTE" | "EQ";
}, {
    value: number;
    type: "INACTIVE_DAYS";
    operator?: "GT" | "GTE" | "LT" | "LTE" | "EQ" | undefined;
}>, z.ZodObject<{
    type: z.ZodLiteral<"COUPON_ENTERED">;
    code: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    type: "COUPON_ENTERED";
    code?: string | undefined;
}, {
    type: "COUPON_ENTERED";
    code?: string | undefined;
}>, z.ZodObject<{
    type: z.ZodLiteral<"PAYMENT_METHOD">;
    values: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    values: string[];
    type: "PAYMENT_METHOD";
}, {
    values: string[];
    type: "PAYMENT_METHOD";
}>, z.ZodObject<{
    type: z.ZodLiteral<"GOVERNORATE">;
    values: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    values: string[];
    type: "GOVERNORATE";
}, {
    values: string[];
    type: "GOVERNORATE";
}>]>;
export type PromotionCondition = z.infer<typeof promotionConditionSchema>;
export declare const promotionActionSchema: z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
    maxDiscount: z.ZodOptional<z.ZodNumber>;
    selector: z.ZodOptional<z.ZodObject<{
        productIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        variantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        categoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        brandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        excludedProductIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        excludedVariantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        excludedCategoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        excludedBrandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        productIds: string[];
        variantIds: string[];
        categoryIds: string[];
        brandIds: string[];
        excludedProductIds: string[];
        excludedVariantIds: string[];
        excludedCategoryIds: string[];
        excludedBrandIds: string[];
    }, {
        productIds?: string[] | undefined;
        variantIds?: string[] | undefined;
        categoryIds?: string[] | undefined;
        brandIds?: string[] | undefined;
        excludedProductIds?: string[] | undefined;
        excludedVariantIds?: string[] | undefined;
        excludedCategoryIds?: string[] | undefined;
        excludedBrandIds?: string[] | undefined;
    }>>;
    type: z.ZodLiteral<"PERCENT_OFF">;
    value: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    value: number;
    type: "PERCENT_OFF";
    selector?: {
        productIds: string[];
        variantIds: string[];
        categoryIds: string[];
        brandIds: string[];
        excludedProductIds: string[];
        excludedVariantIds: string[];
        excludedCategoryIds: string[];
        excludedBrandIds: string[];
    } | undefined;
    maxDiscount?: number | undefined;
}, {
    value: number;
    type: "PERCENT_OFF";
    selector?: {
        productIds?: string[] | undefined;
        variantIds?: string[] | undefined;
        categoryIds?: string[] | undefined;
        brandIds?: string[] | undefined;
        excludedProductIds?: string[] | undefined;
        excludedVariantIds?: string[] | undefined;
        excludedCategoryIds?: string[] | undefined;
        excludedBrandIds?: string[] | undefined;
    } | undefined;
    maxDiscount?: number | undefined;
}>, z.ZodObject<{
    maxDiscount: z.ZodOptional<z.ZodNumber>;
    selector: z.ZodOptional<z.ZodObject<{
        productIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        variantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        categoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        brandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        excludedProductIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        excludedVariantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        excludedCategoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        excludedBrandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        productIds: string[];
        variantIds: string[];
        categoryIds: string[];
        brandIds: string[];
        excludedProductIds: string[];
        excludedVariantIds: string[];
        excludedCategoryIds: string[];
        excludedBrandIds: string[];
    }, {
        productIds?: string[] | undefined;
        variantIds?: string[] | undefined;
        categoryIds?: string[] | undefined;
        brandIds?: string[] | undefined;
        excludedProductIds?: string[] | undefined;
        excludedVariantIds?: string[] | undefined;
        excludedCategoryIds?: string[] | undefined;
        excludedBrandIds?: string[] | undefined;
    }>>;
    type: z.ZodLiteral<"FIXED_OFF">;
    value: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    value: number;
    type: "FIXED_OFF";
    selector?: {
        productIds: string[];
        variantIds: string[];
        categoryIds: string[];
        brandIds: string[];
        excludedProductIds: string[];
        excludedVariantIds: string[];
        excludedCategoryIds: string[];
        excludedBrandIds: string[];
    } | undefined;
    maxDiscount?: number | undefined;
}, {
    value: number;
    type: "FIXED_OFF";
    selector?: {
        productIds?: string[] | undefined;
        variantIds?: string[] | undefined;
        categoryIds?: string[] | undefined;
        brandIds?: string[] | undefined;
        excludedProductIds?: string[] | undefined;
        excludedVariantIds?: string[] | undefined;
        excludedCategoryIds?: string[] | undefined;
        excludedBrandIds?: string[] | undefined;
    } | undefined;
    maxDiscount?: number | undefined;
}>, z.ZodObject<{
    type: z.ZodLiteral<"PRICE_OVERRIDE">;
    price: z.ZodNumber;
    selector: z.ZodOptional<z.ZodObject<{
        productIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        variantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        categoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        brandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        excludedProductIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        excludedVariantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        excludedCategoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        excludedBrandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        productIds: string[];
        variantIds: string[];
        categoryIds: string[];
        brandIds: string[];
        excludedProductIds: string[];
        excludedVariantIds: string[];
        excludedCategoryIds: string[];
        excludedBrandIds: string[];
    }, {
        productIds?: string[] | undefined;
        variantIds?: string[] | undefined;
        categoryIds?: string[] | undefined;
        brandIds?: string[] | undefined;
        excludedProductIds?: string[] | undefined;
        excludedVariantIds?: string[] | undefined;
        excludedCategoryIds?: string[] | undefined;
        excludedBrandIds?: string[] | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    type: "PRICE_OVERRIDE";
    price: number;
    selector?: {
        productIds: string[];
        variantIds: string[];
        categoryIds: string[];
        brandIds: string[];
        excludedProductIds: string[];
        excludedVariantIds: string[];
        excludedCategoryIds: string[];
        excludedBrandIds: string[];
    } | undefined;
}, {
    type: "PRICE_OVERRIDE";
    price: number;
    selector?: {
        productIds?: string[] | undefined;
        variantIds?: string[] | undefined;
        categoryIds?: string[] | undefined;
        brandIds?: string[] | undefined;
        excludedProductIds?: string[] | undefined;
        excludedVariantIds?: string[] | undefined;
        excludedCategoryIds?: string[] | undefined;
        excludedBrandIds?: string[] | undefined;
    } | undefined;
}>, z.ZodObject<{
    type: z.ZodLiteral<"CHEAPEST_FREE">;
    quantity: z.ZodDefault<z.ZodNumber>;
    selector: z.ZodOptional<z.ZodObject<{
        productIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        variantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        categoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        brandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        excludedProductIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        excludedVariantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        excludedCategoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        excludedBrandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        productIds: string[];
        variantIds: string[];
        categoryIds: string[];
        brandIds: string[];
        excludedProductIds: string[];
        excludedVariantIds: string[];
        excludedCategoryIds: string[];
        excludedBrandIds: string[];
    }, {
        productIds?: string[] | undefined;
        variantIds?: string[] | undefined;
        categoryIds?: string[] | undefined;
        brandIds?: string[] | undefined;
        excludedProductIds?: string[] | undefined;
        excludedVariantIds?: string[] | undefined;
        excludedCategoryIds?: string[] | undefined;
        excludedBrandIds?: string[] | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    type: "CHEAPEST_FREE";
    quantity: number;
    selector?: {
        productIds: string[];
        variantIds: string[];
        categoryIds: string[];
        brandIds: string[];
        excludedProductIds: string[];
        excludedVariantIds: string[];
        excludedCategoryIds: string[];
        excludedBrandIds: string[];
    } | undefined;
}, {
    type: "CHEAPEST_FREE";
    quantity?: number | undefined;
    selector?: {
        productIds?: string[] | undefined;
        variantIds?: string[] | undefined;
        categoryIds?: string[] | undefined;
        brandIds?: string[] | undefined;
        excludedProductIds?: string[] | undefined;
        excludedVariantIds?: string[] | undefined;
        excludedCategoryIds?: string[] | undefined;
        excludedBrandIds?: string[] | undefined;
    } | undefined;
}>, z.ZodObject<{
    maxDiscount: z.ZodOptional<z.ZodNumber>;
    selector: z.ZodOptional<z.ZodObject<{
        productIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        variantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        categoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        brandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        excludedProductIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        excludedVariantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        excludedCategoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        excludedBrandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        productIds: string[];
        variantIds: string[];
        categoryIds: string[];
        brandIds: string[];
        excludedProductIds: string[];
        excludedVariantIds: string[];
        excludedCategoryIds: string[];
        excludedBrandIds: string[];
    }, {
        productIds?: string[] | undefined;
        variantIds?: string[] | undefined;
        categoryIds?: string[] | undefined;
        brandIds?: string[] | undefined;
        excludedProductIds?: string[] | undefined;
        excludedVariantIds?: string[] | undefined;
        excludedCategoryIds?: string[] | undefined;
        excludedBrandIds?: string[] | undefined;
    }>>;
    type: z.ZodLiteral<"ITEM_PERCENT_OFF">;
    value: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    value: number;
    type: "ITEM_PERCENT_OFF";
    selector?: {
        productIds: string[];
        variantIds: string[];
        categoryIds: string[];
        brandIds: string[];
        excludedProductIds: string[];
        excludedVariantIds: string[];
        excludedCategoryIds: string[];
        excludedBrandIds: string[];
    } | undefined;
    maxDiscount?: number | undefined;
}, {
    value: number;
    type: "ITEM_PERCENT_OFF";
    selector?: {
        productIds?: string[] | undefined;
        variantIds?: string[] | undefined;
        categoryIds?: string[] | undefined;
        brandIds?: string[] | undefined;
        excludedProductIds?: string[] | undefined;
        excludedVariantIds?: string[] | undefined;
        excludedCategoryIds?: string[] | undefined;
        excludedBrandIds?: string[] | undefined;
    } | undefined;
    maxDiscount?: number | undefined;
}>, z.ZodObject<{
    maxDiscount: z.ZodOptional<z.ZodNumber>;
    selector: z.ZodOptional<z.ZodObject<{
        productIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        variantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        categoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        brandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        excludedProductIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        excludedVariantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        excludedCategoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        excludedBrandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        productIds: string[];
        variantIds: string[];
        categoryIds: string[];
        brandIds: string[];
        excludedProductIds: string[];
        excludedVariantIds: string[];
        excludedCategoryIds: string[];
        excludedBrandIds: string[];
    }, {
        productIds?: string[] | undefined;
        variantIds?: string[] | undefined;
        categoryIds?: string[] | undefined;
        brandIds?: string[] | undefined;
        excludedProductIds?: string[] | undefined;
        excludedVariantIds?: string[] | undefined;
        excludedCategoryIds?: string[] | undefined;
        excludedBrandIds?: string[] | undefined;
    }>>;
    type: z.ZodLiteral<"ITEM_FIXED_OFF">;
    value: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    value: number;
    type: "ITEM_FIXED_OFF";
    selector?: {
        productIds: string[];
        variantIds: string[];
        categoryIds: string[];
        brandIds: string[];
        excludedProductIds: string[];
        excludedVariantIds: string[];
        excludedCategoryIds: string[];
        excludedBrandIds: string[];
    } | undefined;
    maxDiscount?: number | undefined;
}, {
    value: number;
    type: "ITEM_FIXED_OFF";
    selector?: {
        productIds?: string[] | undefined;
        variantIds?: string[] | undefined;
        categoryIds?: string[] | undefined;
        brandIds?: string[] | undefined;
        excludedProductIds?: string[] | undefined;
        excludedVariantIds?: string[] | undefined;
        excludedCategoryIds?: string[] | undefined;
        excludedBrandIds?: string[] | undefined;
    } | undefined;
    maxDiscount?: number | undefined;
}>, z.ZodObject<{
    type: z.ZodLiteral<"FREE_SHIPPING">;
}, "strip", z.ZodTypeAny, {
    type: "FREE_SHIPPING";
}, {
    type: "FREE_SHIPPING";
}>, z.ZodObject<{
    type: z.ZodLiteral<"BUY_X_GET_Y">;
    buyQuantity: z.ZodNumber;
    rewardQuantity: z.ZodDefault<z.ZodNumber>;
    rewardPercentOff: z.ZodDefault<z.ZodNumber>;
    qualifier: z.ZodOptional<z.ZodObject<{
        productIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        variantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        categoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        brandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        excludedProductIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        excludedVariantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        excludedCategoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        excludedBrandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        productIds: string[];
        variantIds: string[];
        categoryIds: string[];
        brandIds: string[];
        excludedProductIds: string[];
        excludedVariantIds: string[];
        excludedCategoryIds: string[];
        excludedBrandIds: string[];
    }, {
        productIds?: string[] | undefined;
        variantIds?: string[] | undefined;
        categoryIds?: string[] | undefined;
        brandIds?: string[] | undefined;
        excludedProductIds?: string[] | undefined;
        excludedVariantIds?: string[] | undefined;
        excludedCategoryIds?: string[] | undefined;
        excludedBrandIds?: string[] | undefined;
    }>>;
    reward: z.ZodOptional<z.ZodObject<{
        productIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        variantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        categoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        brandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        excludedProductIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        excludedVariantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        excludedCategoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        excludedBrandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        productIds: string[];
        variantIds: string[];
        categoryIds: string[];
        brandIds: string[];
        excludedProductIds: string[];
        excludedVariantIds: string[];
        excludedCategoryIds: string[];
        excludedBrandIds: string[];
    }, {
        productIds?: string[] | undefined;
        variantIds?: string[] | undefined;
        categoryIds?: string[] | undefined;
        brandIds?: string[] | undefined;
        excludedProductIds?: string[] | undefined;
        excludedVariantIds?: string[] | undefined;
        excludedCategoryIds?: string[] | undefined;
        excludedBrandIds?: string[] | undefined;
    }>>;
    strategy: z.ZodDefault<z.ZodEnum<["CHEAPEST", "HIGHEST"]>>;
}, "strip", z.ZodTypeAny, {
    type: "BUY_X_GET_Y";
    buyQuantity: number;
    rewardQuantity: number;
    rewardPercentOff: number;
    strategy: "CHEAPEST" | "HIGHEST";
    qualifier?: {
        productIds: string[];
        variantIds: string[];
        categoryIds: string[];
        brandIds: string[];
        excludedProductIds: string[];
        excludedVariantIds: string[];
        excludedCategoryIds: string[];
        excludedBrandIds: string[];
    } | undefined;
    reward?: {
        productIds: string[];
        variantIds: string[];
        categoryIds: string[];
        brandIds: string[];
        excludedProductIds: string[];
        excludedVariantIds: string[];
        excludedCategoryIds: string[];
        excludedBrandIds: string[];
    } | undefined;
}, {
    type: "BUY_X_GET_Y";
    buyQuantity: number;
    rewardQuantity?: number | undefined;
    rewardPercentOff?: number | undefined;
    qualifier?: {
        productIds?: string[] | undefined;
        variantIds?: string[] | undefined;
        categoryIds?: string[] | undefined;
        brandIds?: string[] | undefined;
        excludedProductIds?: string[] | undefined;
        excludedVariantIds?: string[] | undefined;
        excludedCategoryIds?: string[] | undefined;
        excludedBrandIds?: string[] | undefined;
    } | undefined;
    reward?: {
        productIds?: string[] | undefined;
        variantIds?: string[] | undefined;
        categoryIds?: string[] | undefined;
        brandIds?: string[] | undefined;
        excludedProductIds?: string[] | undefined;
        excludedVariantIds?: string[] | undefined;
        excludedCategoryIds?: string[] | undefined;
        excludedBrandIds?: string[] | undefined;
    } | undefined;
    strategy?: "CHEAPEST" | "HIGHEST" | undefined;
}>, z.ZodObject<{
    type: z.ZodLiteral<"BUNDLE_PRICE">;
    price: z.ZodNumber;
    items: z.ZodArray<z.ZodObject<{
        variantId: z.ZodOptional<z.ZodString>;
        productId: z.ZodOptional<z.ZodString>;
        quantity: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        quantity: number;
        variantId?: string | undefined;
        productId?: string | undefined;
    }, {
        quantity: number;
        variantId?: string | undefined;
        productId?: string | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    type: "BUNDLE_PRICE";
    items: {
        quantity: number;
        variantId?: string | undefined;
        productId?: string | undefined;
    }[];
    price: number;
}, {
    type: "BUNDLE_PRICE";
    items: {
        quantity: number;
        variantId?: string | undefined;
        productId?: string | undefined;
    }[];
    price: number;
}>, z.ZodObject<{
    type: z.ZodLiteral<"QUANTITY_TIERS">;
    tiers: z.ZodArray<z.ZodObject<{
        threshold: z.ZodNumber;
    } & {
        value: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        value: number;
        threshold: number;
    }, {
        value: number;
        threshold: number;
    }>, "many">;
    selector: z.ZodOptional<z.ZodObject<{
        productIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        variantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        categoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        brandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        excludedProductIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        excludedVariantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        excludedCategoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        excludedBrandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        productIds: string[];
        variantIds: string[];
        categoryIds: string[];
        brandIds: string[];
        excludedProductIds: string[];
        excludedVariantIds: string[];
        excludedCategoryIds: string[];
        excludedBrandIds: string[];
    }, {
        productIds?: string[] | undefined;
        variantIds?: string[] | undefined;
        categoryIds?: string[] | undefined;
        brandIds?: string[] | undefined;
        excludedProductIds?: string[] | undefined;
        excludedVariantIds?: string[] | undefined;
        excludedCategoryIds?: string[] | undefined;
        excludedBrandIds?: string[] | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    type: "QUANTITY_TIERS";
    tiers: {
        value: number;
        threshold: number;
    }[];
    selector?: {
        productIds: string[];
        variantIds: string[];
        categoryIds: string[];
        brandIds: string[];
        excludedProductIds: string[];
        excludedVariantIds: string[];
        excludedCategoryIds: string[];
        excludedBrandIds: string[];
    } | undefined;
}, {
    type: "QUANTITY_TIERS";
    tiers: {
        value: number;
        threshold: number;
    }[];
    selector?: {
        productIds?: string[] | undefined;
        variantIds?: string[] | undefined;
        categoryIds?: string[] | undefined;
        brandIds?: string[] | undefined;
        excludedProductIds?: string[] | undefined;
        excludedVariantIds?: string[] | undefined;
        excludedCategoryIds?: string[] | undefined;
        excludedBrandIds?: string[] | undefined;
    } | undefined;
}>, z.ZodObject<{
    type: z.ZodLiteral<"SPEND_TIERS">;
    tiers: z.ZodArray<z.ZodObject<{
        threshold: z.ZodNumber;
    } & {
        value: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        value: number;
        threshold: number;
    }, {
        value: number;
        threshold: number;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    type: "SPEND_TIERS";
    tiers: {
        value: number;
        threshold: number;
    }[];
}, {
    type: "SPEND_TIERS";
    tiers: {
        value: number;
        threshold: number;
    }[];
}>, z.ZodObject<{
    type: z.ZodLiteral<"FREE_GIFT">;
    variantIds: z.ZodArray<z.ZodString, "many">;
    quantity: z.ZodDefault<z.ZodNumber>;
    customerChooses: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    type: "FREE_GIFT";
    quantity: number;
    variantIds: string[];
    customerChooses: boolean;
}, {
    type: "FREE_GIFT";
    variantIds: string[];
    quantity?: number | undefined;
    customerChooses?: boolean | undefined;
}>]>;
export type PromotionAction = z.infer<typeof promotionActionSchema>;
export declare const promotionTargetsSchema: z.ZodObject<{
    productIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    variantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    categoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    brandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    excludedProductIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    excludedVariantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    excludedCategoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    excludedBrandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
} & {
    customerIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    productIds: string[];
    variantIds: string[];
    categoryIds: string[];
    brandIds: string[];
    excludedProductIds: string[];
    excludedVariantIds: string[];
    excludedCategoryIds: string[];
    excludedBrandIds: string[];
    customerIds: string[];
}, {
    productIds?: string[] | undefined;
    variantIds?: string[] | undefined;
    categoryIds?: string[] | undefined;
    brandIds?: string[] | undefined;
    excludedProductIds?: string[] | undefined;
    excludedVariantIds?: string[] | undefined;
    excludedCategoryIds?: string[] | undefined;
    excludedBrandIds?: string[] | undefined;
    customerIds?: string[] | undefined;
}>;
export declare const promotionLimitsSchema: z.ZodDefault<z.ZodObject<{
    totalUses: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
    usesPerCustomer: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
    discountedUnits: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
    maximumTotalDiscount: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    totalUses: number | null;
    usesPerCustomer: number | null;
    discountedUnits: number | null;
    maximumTotalDiscount: number | null;
}, {
    totalUses?: number | null | undefined;
    usesPerCustomer?: number | null | undefined;
    discountedUnits?: number | null | undefined;
    maximumTotalDiscount?: number | null | undefined;
}>>;
export declare const promotionDisplaySchema: z.ZodDefault<z.ZodObject<{
    badgeText: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    showCountdown: z.ZodDefault<z.ZodBoolean>;
    showOnOffers: z.ZodDefault<z.ZodBoolean>;
    featured: z.ZodDefault<z.ZodBoolean>;
    bannerImageKey: z.ZodDefault<z.ZodNullable<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    featured: boolean;
    badgeText: string | null;
    showCountdown: boolean;
    showOnOffers: boolean;
    bannerImageKey: string | null;
}, {
    featured?: boolean | undefined;
    badgeText?: string | null | undefined;
    showCountdown?: boolean | undefined;
    showOnOffers?: boolean | undefined;
    bannerImageKey?: string | null | undefined;
}>>;
export declare const couponConfigurationSchema: z.ZodOptional<z.ZodObject<{
    codes: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    generateCount: z.ZodDefault<z.ZodNumber>;
    prefix: z.ZodDefault<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    codes: string[];
    generateCount: number;
    prefix: string;
}, {
    codes?: string[] | undefined;
    generateCount?: number | undefined;
    prefix?: string | undefined;
}>>;
export declare const createPromotionSchema: z.ZodEffects<z.ZodObject<{
    name: z.ZodString;
    internalDescription: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    customerTitle: z.ZodString;
    customerDescription: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    type: z.ZodEnum<["PRODUCT_DISCOUNT", "CART_DISCOUNT", "BUY_X_GET_Y", "BUNDLE", "QUANTITY_TIER", "SPEND_TIER", "FREE_SHIPPING", "FREE_GIFT", "FLASH_SALE"]>;
    trigger: z.ZodDefault<z.ZodEnum<["AUTOMATIC", "CODE"]>>;
    state: z.ZodDefault<z.ZodEnum<["DRAFT", "ACTIVE", "PAUSED", "ARCHIVED"]>>;
    priority: z.ZodDefault<z.ZodNumber>;
    stacking: z.ZodDefault<z.ZodEnum<["EXCLUSIVE", "COMBINABLE", "BEST_OFFER"]>>;
    combinableWith: z.ZodDefault<z.ZodArray<z.ZodEnum<["PRODUCT_DISCOUNT", "CART_DISCOUNT", "BUY_X_GET_Y", "BUNDLE", "QUANTITY_TIER", "SPEND_TIER", "FREE_SHIPPING", "FREE_GIFT", "FLASH_SALE"]>, "many">>;
    startsAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    endsAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    timezone: z.ZodDefault<z.ZodString>;
    conditions: z.ZodDefault<z.ZodArray<z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
        type: z.ZodLiteral<"SUBTOTAL">;
        operator: z.ZodDefault<z.ZodEnum<["GT", "GTE", "LT", "LTE", "EQ"]>>;
        value: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        value: number;
        type: "SUBTOTAL";
        operator: "GT" | "GTE" | "LT" | "LTE" | "EQ";
    }, {
        value: number;
        type: "SUBTOTAL";
        operator?: "GT" | "GTE" | "LT" | "LTE" | "EQ" | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"QUANTITY">;
        operator: z.ZodDefault<z.ZodEnum<["GT", "GTE", "LT", "LTE", "EQ"]>>;
        value: z.ZodNumber;
        selector: z.ZodOptional<z.ZodObject<{
            productIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            variantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            categoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            brandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedProductIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedVariantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedCategoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedBrandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        }, {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        value: number;
        type: "QUANTITY";
        operator: "GT" | "GTE" | "LT" | "LTE" | "EQ";
        selector?: {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        } | undefined;
    }, {
        value: number;
        type: "QUANTITY";
        operator?: "GT" | "GTE" | "LT" | "LTE" | "EQ" | undefined;
        selector?: {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        } | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"HAS_ITEMS">;
        selector: z.ZodObject<{
            productIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            variantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            categoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            brandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedProductIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedVariantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedCategoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedBrandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        }, {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        type: "HAS_ITEMS";
        selector: {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        };
    }, {
        type: "HAS_ITEMS";
        selector: {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        };
    }>, z.ZodObject<{
        type: z.ZodLiteral<"MISSING_ITEMS">;
        selector: z.ZodObject<{
            productIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            variantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            categoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            brandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedProductIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedVariantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedCategoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedBrandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        }, {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        type: "MISSING_ITEMS";
        selector: {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        };
    }, {
        type: "MISSING_ITEMS";
        selector: {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        };
    }>, z.ZodObject<{
        type: z.ZodLiteral<"CUSTOMER_TYPE">;
        value: z.ZodEnum<["EVERYONE", "AUTHENTICATED", "GUEST", "FIRST_ORDER", "RETURNING", "VIP"]>;
    }, "strip", z.ZodTypeAny, {
        value: "EVERYONE" | "AUTHENTICATED" | "GUEST" | "FIRST_ORDER" | "RETURNING" | "VIP";
        type: "CUSTOMER_TYPE";
    }, {
        value: "EVERYONE" | "AUTHENTICATED" | "GUEST" | "FIRST_ORDER" | "RETURNING" | "VIP";
        type: "CUSTOMER_TYPE";
    }>, z.ZodObject<{
        type: z.ZodLiteral<"CUSTOMER">;
        customerIds: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        type: "CUSTOMER";
        customerIds: string[];
    }, {
        type: "CUSTOMER";
        customerIds: string[];
    }>, z.ZodObject<{
        type: z.ZodLiteral<"PAST_ORDER_COUNT">;
        operator: z.ZodDefault<z.ZodEnum<["GT", "GTE", "LT", "LTE", "EQ"]>>;
        value: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        value: number;
        type: "PAST_ORDER_COUNT";
        operator: "GT" | "GTE" | "LT" | "LTE" | "EQ";
    }, {
        value: number;
        type: "PAST_ORDER_COUNT";
        operator?: "GT" | "GTE" | "LT" | "LTE" | "EQ" | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"LIFETIME_SPEND">;
        operator: z.ZodDefault<z.ZodEnum<["GT", "GTE", "LT", "LTE", "EQ"]>>;
        value: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        value: number;
        type: "LIFETIME_SPEND";
        operator: "GT" | "GTE" | "LT" | "LTE" | "EQ";
    }, {
        value: number;
        type: "LIFETIME_SPEND";
        operator?: "GT" | "GTE" | "LT" | "LTE" | "EQ" | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"INACTIVE_DAYS">;
        operator: z.ZodDefault<z.ZodEnum<["GT", "GTE", "LT", "LTE", "EQ"]>>;
        value: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        value: number;
        type: "INACTIVE_DAYS";
        operator: "GT" | "GTE" | "LT" | "LTE" | "EQ";
    }, {
        value: number;
        type: "INACTIVE_DAYS";
        operator?: "GT" | "GTE" | "LT" | "LTE" | "EQ" | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"COUPON_ENTERED">;
        code: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        type: "COUPON_ENTERED";
        code?: string | undefined;
    }, {
        type: "COUPON_ENTERED";
        code?: string | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"PAYMENT_METHOD">;
        values: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        values: string[];
        type: "PAYMENT_METHOD";
    }, {
        values: string[];
        type: "PAYMENT_METHOD";
    }>, z.ZodObject<{
        type: z.ZodLiteral<"GOVERNORATE">;
        values: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        values: string[];
        type: "GOVERNORATE";
    }, {
        values: string[];
        type: "GOVERNORATE";
    }>]>, "many">>;
    actions: z.ZodArray<z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
        maxDiscount: z.ZodOptional<z.ZodNumber>;
        selector: z.ZodOptional<z.ZodObject<{
            productIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            variantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            categoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            brandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedProductIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedVariantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedCategoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedBrandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        }, {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        }>>;
        type: z.ZodLiteral<"PERCENT_OFF">;
        value: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        value: number;
        type: "PERCENT_OFF";
        selector?: {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        } | undefined;
        maxDiscount?: number | undefined;
    }, {
        value: number;
        type: "PERCENT_OFF";
        selector?: {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        } | undefined;
        maxDiscount?: number | undefined;
    }>, z.ZodObject<{
        maxDiscount: z.ZodOptional<z.ZodNumber>;
        selector: z.ZodOptional<z.ZodObject<{
            productIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            variantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            categoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            brandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedProductIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedVariantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedCategoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedBrandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        }, {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        }>>;
        type: z.ZodLiteral<"FIXED_OFF">;
        value: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        value: number;
        type: "FIXED_OFF";
        selector?: {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        } | undefined;
        maxDiscount?: number | undefined;
    }, {
        value: number;
        type: "FIXED_OFF";
        selector?: {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        } | undefined;
        maxDiscount?: number | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"PRICE_OVERRIDE">;
        price: z.ZodNumber;
        selector: z.ZodOptional<z.ZodObject<{
            productIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            variantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            categoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            brandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedProductIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedVariantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedCategoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedBrandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        }, {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        type: "PRICE_OVERRIDE";
        price: number;
        selector?: {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        } | undefined;
    }, {
        type: "PRICE_OVERRIDE";
        price: number;
        selector?: {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        } | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"CHEAPEST_FREE">;
        quantity: z.ZodDefault<z.ZodNumber>;
        selector: z.ZodOptional<z.ZodObject<{
            productIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            variantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            categoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            brandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedProductIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedVariantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedCategoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedBrandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        }, {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        type: "CHEAPEST_FREE";
        quantity: number;
        selector?: {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        } | undefined;
    }, {
        type: "CHEAPEST_FREE";
        quantity?: number | undefined;
        selector?: {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        } | undefined;
    }>, z.ZodObject<{
        maxDiscount: z.ZodOptional<z.ZodNumber>;
        selector: z.ZodOptional<z.ZodObject<{
            productIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            variantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            categoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            brandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedProductIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedVariantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedCategoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedBrandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        }, {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        }>>;
        type: z.ZodLiteral<"ITEM_PERCENT_OFF">;
        value: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        value: number;
        type: "ITEM_PERCENT_OFF";
        selector?: {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        } | undefined;
        maxDiscount?: number | undefined;
    }, {
        value: number;
        type: "ITEM_PERCENT_OFF";
        selector?: {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        } | undefined;
        maxDiscount?: number | undefined;
    }>, z.ZodObject<{
        maxDiscount: z.ZodOptional<z.ZodNumber>;
        selector: z.ZodOptional<z.ZodObject<{
            productIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            variantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            categoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            brandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedProductIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedVariantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedCategoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedBrandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        }, {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        }>>;
        type: z.ZodLiteral<"ITEM_FIXED_OFF">;
        value: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        value: number;
        type: "ITEM_FIXED_OFF";
        selector?: {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        } | undefined;
        maxDiscount?: number | undefined;
    }, {
        value: number;
        type: "ITEM_FIXED_OFF";
        selector?: {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        } | undefined;
        maxDiscount?: number | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"FREE_SHIPPING">;
    }, "strip", z.ZodTypeAny, {
        type: "FREE_SHIPPING";
    }, {
        type: "FREE_SHIPPING";
    }>, z.ZodObject<{
        type: z.ZodLiteral<"BUY_X_GET_Y">;
        buyQuantity: z.ZodNumber;
        rewardQuantity: z.ZodDefault<z.ZodNumber>;
        rewardPercentOff: z.ZodDefault<z.ZodNumber>;
        qualifier: z.ZodOptional<z.ZodObject<{
            productIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            variantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            categoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            brandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedProductIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedVariantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedCategoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedBrandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        }, {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        }>>;
        reward: z.ZodOptional<z.ZodObject<{
            productIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            variantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            categoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            brandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedProductIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedVariantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedCategoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedBrandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        }, {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        }>>;
        strategy: z.ZodDefault<z.ZodEnum<["CHEAPEST", "HIGHEST"]>>;
    }, "strip", z.ZodTypeAny, {
        type: "BUY_X_GET_Y";
        buyQuantity: number;
        rewardQuantity: number;
        rewardPercentOff: number;
        strategy: "CHEAPEST" | "HIGHEST";
        qualifier?: {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        } | undefined;
        reward?: {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        } | undefined;
    }, {
        type: "BUY_X_GET_Y";
        buyQuantity: number;
        rewardQuantity?: number | undefined;
        rewardPercentOff?: number | undefined;
        qualifier?: {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        } | undefined;
        reward?: {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        } | undefined;
        strategy?: "CHEAPEST" | "HIGHEST" | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"BUNDLE_PRICE">;
        price: z.ZodNumber;
        items: z.ZodArray<z.ZodObject<{
            variantId: z.ZodOptional<z.ZodString>;
            productId: z.ZodOptional<z.ZodString>;
            quantity: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            quantity: number;
            variantId?: string | undefined;
            productId?: string | undefined;
        }, {
            quantity: number;
            variantId?: string | undefined;
            productId?: string | undefined;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        type: "BUNDLE_PRICE";
        items: {
            quantity: number;
            variantId?: string | undefined;
            productId?: string | undefined;
        }[];
        price: number;
    }, {
        type: "BUNDLE_PRICE";
        items: {
            quantity: number;
            variantId?: string | undefined;
            productId?: string | undefined;
        }[];
        price: number;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"QUANTITY_TIERS">;
        tiers: z.ZodArray<z.ZodObject<{
            threshold: z.ZodNumber;
        } & {
            value: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            value: number;
            threshold: number;
        }, {
            value: number;
            threshold: number;
        }>, "many">;
        selector: z.ZodOptional<z.ZodObject<{
            productIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            variantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            categoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            brandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedProductIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedVariantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedCategoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedBrandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        }, {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        type: "QUANTITY_TIERS";
        tiers: {
            value: number;
            threshold: number;
        }[];
        selector?: {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        } | undefined;
    }, {
        type: "QUANTITY_TIERS";
        tiers: {
            value: number;
            threshold: number;
        }[];
        selector?: {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        } | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"SPEND_TIERS">;
        tiers: z.ZodArray<z.ZodObject<{
            threshold: z.ZodNumber;
        } & {
            value: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            value: number;
            threshold: number;
        }, {
            value: number;
            threshold: number;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        type: "SPEND_TIERS";
        tiers: {
            value: number;
            threshold: number;
        }[];
    }, {
        type: "SPEND_TIERS";
        tiers: {
            value: number;
            threshold: number;
        }[];
    }>, z.ZodObject<{
        type: z.ZodLiteral<"FREE_GIFT">;
        variantIds: z.ZodArray<z.ZodString, "many">;
        quantity: z.ZodDefault<z.ZodNumber>;
        customerChooses: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        type: "FREE_GIFT";
        quantity: number;
        variantIds: string[];
        customerChooses: boolean;
    }, {
        type: "FREE_GIFT";
        variantIds: string[];
        quantity?: number | undefined;
        customerChooses?: boolean | undefined;
    }>]>, "many">;
    targets: z.ZodDefault<z.ZodObject<{
        productIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        variantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        categoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        brandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        excludedProductIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        excludedVariantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        excludedCategoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        excludedBrandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    } & {
        customerIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        productIds: string[];
        variantIds: string[];
        categoryIds: string[];
        brandIds: string[];
        excludedProductIds: string[];
        excludedVariantIds: string[];
        excludedCategoryIds: string[];
        excludedBrandIds: string[];
        customerIds: string[];
    }, {
        productIds?: string[] | undefined;
        variantIds?: string[] | undefined;
        categoryIds?: string[] | undefined;
        brandIds?: string[] | undefined;
        excludedProductIds?: string[] | undefined;
        excludedVariantIds?: string[] | undefined;
        excludedCategoryIds?: string[] | undefined;
        excludedBrandIds?: string[] | undefined;
        customerIds?: string[] | undefined;
    }>>;
    limits: z.ZodDefault<z.ZodObject<{
        totalUses: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
        usesPerCustomer: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
        discountedUnits: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
        maximumTotalDiscount: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
    }, "strip", z.ZodTypeAny, {
        totalUses: number | null;
        usesPerCustomer: number | null;
        discountedUnits: number | null;
        maximumTotalDiscount: number | null;
    }, {
        totalUses?: number | null | undefined;
        usesPerCustomer?: number | null | undefined;
        discountedUnits?: number | null | undefined;
        maximumTotalDiscount?: number | null | undefined;
    }>>;
    display: z.ZodDefault<z.ZodObject<{
        badgeText: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        showCountdown: z.ZodDefault<z.ZodBoolean>;
        showOnOffers: z.ZodDefault<z.ZodBoolean>;
        featured: z.ZodDefault<z.ZodBoolean>;
        bannerImageKey: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        featured: boolean;
        badgeText: string | null;
        showCountdown: boolean;
        showOnOffers: boolean;
        bannerImageKey: string | null;
    }, {
        featured?: boolean | undefined;
        badgeText?: string | null | undefined;
        showCountdown?: boolean | undefined;
        showOnOffers?: boolean | undefined;
        bannerImageKey?: string | null | undefined;
    }>>;
    coupon: z.ZodOptional<z.ZodObject<{
        codes: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        generateCount: z.ZodDefault<z.ZodNumber>;
        prefix: z.ZodDefault<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        codes: string[];
        generateCount: number;
        prefix: string;
    }, {
        codes?: string[] | undefined;
        generateCount?: number | undefined;
        prefix?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    type: "FREE_SHIPPING" | "PRODUCT_DISCOUNT" | "CART_DISCOUNT" | "BUY_X_GET_Y" | "BUNDLE" | "QUANTITY_TIER" | "SPEND_TIER" | "FREE_GIFT" | "FLASH_SALE";
    name: string;
    customerTitle: string;
    trigger: "AUTOMATIC" | "CODE";
    state: "ACTIVE" | "DRAFT" | "PAUSED" | "ARCHIVED";
    priority: number;
    stacking: "EXCLUSIVE" | "COMBINABLE" | "BEST_OFFER";
    combinableWith: ("FREE_SHIPPING" | "PRODUCT_DISCOUNT" | "CART_DISCOUNT" | "BUY_X_GET_Y" | "BUNDLE" | "QUANTITY_TIER" | "SPEND_TIER" | "FREE_GIFT" | "FLASH_SALE")[];
    startsAt: string | null;
    endsAt: string | null;
    timezone: string;
    conditions: ({
        value: number;
        type: "QUANTITY";
        operator: "GT" | "GTE" | "LT" | "LTE" | "EQ";
        selector?: {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        } | undefined;
    } | {
        value: number;
        type: "SUBTOTAL";
        operator: "GT" | "GTE" | "LT" | "LTE" | "EQ";
    } | {
        type: "HAS_ITEMS";
        selector: {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        };
    } | {
        type: "MISSING_ITEMS";
        selector: {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        };
    } | {
        value: "EVERYONE" | "AUTHENTICATED" | "GUEST" | "FIRST_ORDER" | "RETURNING" | "VIP";
        type: "CUSTOMER_TYPE";
    } | {
        type: "CUSTOMER";
        customerIds: string[];
    } | {
        value: number;
        type: "PAST_ORDER_COUNT";
        operator: "GT" | "GTE" | "LT" | "LTE" | "EQ";
    } | {
        value: number;
        type: "LIFETIME_SPEND";
        operator: "GT" | "GTE" | "LT" | "LTE" | "EQ";
    } | {
        value: number;
        type: "INACTIVE_DAYS";
        operator: "GT" | "GTE" | "LT" | "LTE" | "EQ";
    } | {
        type: "COUPON_ENTERED";
        code?: string | undefined;
    } | {
        values: string[];
        type: "PAYMENT_METHOD";
    } | {
        values: string[];
        type: "GOVERNORATE";
    })[];
    actions: ({
        value: number;
        type: "PERCENT_OFF";
        selector?: {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        } | undefined;
        maxDiscount?: number | undefined;
    } | {
        value: number;
        type: "FIXED_OFF";
        selector?: {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        } | undefined;
        maxDiscount?: number | undefined;
    } | {
        type: "PRICE_OVERRIDE";
        price: number;
        selector?: {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        } | undefined;
    } | {
        type: "CHEAPEST_FREE";
        quantity: number;
        selector?: {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        } | undefined;
    } | {
        value: number;
        type: "ITEM_PERCENT_OFF";
        selector?: {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        } | undefined;
        maxDiscount?: number | undefined;
    } | {
        value: number;
        type: "ITEM_FIXED_OFF";
        selector?: {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        } | undefined;
        maxDiscount?: number | undefined;
    } | {
        type: "FREE_SHIPPING";
    } | {
        type: "BUY_X_GET_Y";
        buyQuantity: number;
        rewardQuantity: number;
        rewardPercentOff: number;
        strategy: "CHEAPEST" | "HIGHEST";
        qualifier?: {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        } | undefined;
        reward?: {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        } | undefined;
    } | {
        type: "BUNDLE_PRICE";
        items: {
            quantity: number;
            variantId?: string | undefined;
            productId?: string | undefined;
        }[];
        price: number;
    } | {
        type: "QUANTITY_TIERS";
        tiers: {
            value: number;
            threshold: number;
        }[];
        selector?: {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        } | undefined;
    } | {
        type: "SPEND_TIERS";
        tiers: {
            value: number;
            threshold: number;
        }[];
    } | {
        type: "FREE_GIFT";
        quantity: number;
        variantIds: string[];
        customerChooses: boolean;
    })[];
    targets: {
        productIds: string[];
        variantIds: string[];
        categoryIds: string[];
        brandIds: string[];
        excludedProductIds: string[];
        excludedVariantIds: string[];
        excludedCategoryIds: string[];
        excludedBrandIds: string[];
        customerIds: string[];
    };
    limits: {
        totalUses: number | null;
        usesPerCustomer: number | null;
        discountedUnits: number | null;
        maximumTotalDiscount: number | null;
    };
    display: {
        featured: boolean;
        badgeText: string | null;
        showCountdown: boolean;
        showOnOffers: boolean;
        bannerImageKey: string | null;
    };
    internalDescription?: string | null | undefined;
    customerDescription?: string | null | undefined;
    coupon?: {
        codes: string[];
        generateCount: number;
        prefix: string;
    } | undefined;
}, {
    type: "FREE_SHIPPING" | "PRODUCT_DISCOUNT" | "CART_DISCOUNT" | "BUY_X_GET_Y" | "BUNDLE" | "QUANTITY_TIER" | "SPEND_TIER" | "FREE_GIFT" | "FLASH_SALE";
    name: string;
    customerTitle: string;
    actions: ({
        value: number;
        type: "PERCENT_OFF";
        selector?: {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        } | undefined;
        maxDiscount?: number | undefined;
    } | {
        value: number;
        type: "FIXED_OFF";
        selector?: {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        } | undefined;
        maxDiscount?: number | undefined;
    } | {
        type: "PRICE_OVERRIDE";
        price: number;
        selector?: {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        } | undefined;
    } | {
        type: "CHEAPEST_FREE";
        quantity?: number | undefined;
        selector?: {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        } | undefined;
    } | {
        value: number;
        type: "ITEM_PERCENT_OFF";
        selector?: {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        } | undefined;
        maxDiscount?: number | undefined;
    } | {
        value: number;
        type: "ITEM_FIXED_OFF";
        selector?: {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        } | undefined;
        maxDiscount?: number | undefined;
    } | {
        type: "FREE_SHIPPING";
    } | {
        type: "BUY_X_GET_Y";
        buyQuantity: number;
        rewardQuantity?: number | undefined;
        rewardPercentOff?: number | undefined;
        qualifier?: {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        } | undefined;
        reward?: {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        } | undefined;
        strategy?: "CHEAPEST" | "HIGHEST" | undefined;
    } | {
        type: "BUNDLE_PRICE";
        items: {
            quantity: number;
            variantId?: string | undefined;
            productId?: string | undefined;
        }[];
        price: number;
    } | {
        type: "QUANTITY_TIERS";
        tiers: {
            value: number;
            threshold: number;
        }[];
        selector?: {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        } | undefined;
    } | {
        type: "SPEND_TIERS";
        tiers: {
            value: number;
            threshold: number;
        }[];
    } | {
        type: "FREE_GIFT";
        variantIds: string[];
        quantity?: number | undefined;
        customerChooses?: boolean | undefined;
    })[];
    internalDescription?: string | null | undefined;
    customerDescription?: string | null | undefined;
    trigger?: "AUTOMATIC" | "CODE" | undefined;
    state?: "ACTIVE" | "DRAFT" | "PAUSED" | "ARCHIVED" | undefined;
    priority?: number | undefined;
    stacking?: "EXCLUSIVE" | "COMBINABLE" | "BEST_OFFER" | undefined;
    combinableWith?: ("FREE_SHIPPING" | "PRODUCT_DISCOUNT" | "CART_DISCOUNT" | "BUY_X_GET_Y" | "BUNDLE" | "QUANTITY_TIER" | "SPEND_TIER" | "FREE_GIFT" | "FLASH_SALE")[] | undefined;
    startsAt?: string | null | undefined;
    endsAt?: string | null | undefined;
    timezone?: string | undefined;
    conditions?: ({
        value: number;
        type: "QUANTITY";
        operator?: "GT" | "GTE" | "LT" | "LTE" | "EQ" | undefined;
        selector?: {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        } | undefined;
    } | {
        value: number;
        type: "SUBTOTAL";
        operator?: "GT" | "GTE" | "LT" | "LTE" | "EQ" | undefined;
    } | {
        type: "HAS_ITEMS";
        selector: {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        };
    } | {
        type: "MISSING_ITEMS";
        selector: {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        };
    } | {
        value: "EVERYONE" | "AUTHENTICATED" | "GUEST" | "FIRST_ORDER" | "RETURNING" | "VIP";
        type: "CUSTOMER_TYPE";
    } | {
        type: "CUSTOMER";
        customerIds: string[];
    } | {
        value: number;
        type: "PAST_ORDER_COUNT";
        operator?: "GT" | "GTE" | "LT" | "LTE" | "EQ" | undefined;
    } | {
        value: number;
        type: "LIFETIME_SPEND";
        operator?: "GT" | "GTE" | "LT" | "LTE" | "EQ" | undefined;
    } | {
        value: number;
        type: "INACTIVE_DAYS";
        operator?: "GT" | "GTE" | "LT" | "LTE" | "EQ" | undefined;
    } | {
        type: "COUPON_ENTERED";
        code?: string | undefined;
    } | {
        values: string[];
        type: "PAYMENT_METHOD";
    } | {
        values: string[];
        type: "GOVERNORATE";
    })[] | undefined;
    targets?: {
        productIds?: string[] | undefined;
        variantIds?: string[] | undefined;
        categoryIds?: string[] | undefined;
        brandIds?: string[] | undefined;
        excludedProductIds?: string[] | undefined;
        excludedVariantIds?: string[] | undefined;
        excludedCategoryIds?: string[] | undefined;
        excludedBrandIds?: string[] | undefined;
        customerIds?: string[] | undefined;
    } | undefined;
    limits?: {
        totalUses?: number | null | undefined;
        usesPerCustomer?: number | null | undefined;
        discountedUnits?: number | null | undefined;
        maximumTotalDiscount?: number | null | undefined;
    } | undefined;
    display?: {
        featured?: boolean | undefined;
        badgeText?: string | null | undefined;
        showCountdown?: boolean | undefined;
        showOnOffers?: boolean | undefined;
        bannerImageKey?: string | null | undefined;
    } | undefined;
    coupon?: {
        codes?: string[] | undefined;
        generateCount?: number | undefined;
        prefix?: string | undefined;
    } | undefined;
}>, {
    type: "FREE_SHIPPING" | "PRODUCT_DISCOUNT" | "CART_DISCOUNT" | "BUY_X_GET_Y" | "BUNDLE" | "QUANTITY_TIER" | "SPEND_TIER" | "FREE_GIFT" | "FLASH_SALE";
    name: string;
    customerTitle: string;
    trigger: "AUTOMATIC" | "CODE";
    state: "ACTIVE" | "DRAFT" | "PAUSED" | "ARCHIVED";
    priority: number;
    stacking: "EXCLUSIVE" | "COMBINABLE" | "BEST_OFFER";
    combinableWith: ("FREE_SHIPPING" | "PRODUCT_DISCOUNT" | "CART_DISCOUNT" | "BUY_X_GET_Y" | "BUNDLE" | "QUANTITY_TIER" | "SPEND_TIER" | "FREE_GIFT" | "FLASH_SALE")[];
    startsAt: string | null;
    endsAt: string | null;
    timezone: string;
    conditions: ({
        value: number;
        type: "QUANTITY";
        operator: "GT" | "GTE" | "LT" | "LTE" | "EQ";
        selector?: {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        } | undefined;
    } | {
        value: number;
        type: "SUBTOTAL";
        operator: "GT" | "GTE" | "LT" | "LTE" | "EQ";
    } | {
        type: "HAS_ITEMS";
        selector: {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        };
    } | {
        type: "MISSING_ITEMS";
        selector: {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        };
    } | {
        value: "EVERYONE" | "AUTHENTICATED" | "GUEST" | "FIRST_ORDER" | "RETURNING" | "VIP";
        type: "CUSTOMER_TYPE";
    } | {
        type: "CUSTOMER";
        customerIds: string[];
    } | {
        value: number;
        type: "PAST_ORDER_COUNT";
        operator: "GT" | "GTE" | "LT" | "LTE" | "EQ";
    } | {
        value: number;
        type: "LIFETIME_SPEND";
        operator: "GT" | "GTE" | "LT" | "LTE" | "EQ";
    } | {
        value: number;
        type: "INACTIVE_DAYS";
        operator: "GT" | "GTE" | "LT" | "LTE" | "EQ";
    } | {
        type: "COUPON_ENTERED";
        code?: string | undefined;
    } | {
        values: string[];
        type: "PAYMENT_METHOD";
    } | {
        values: string[];
        type: "GOVERNORATE";
    })[];
    actions: ({
        value: number;
        type: "PERCENT_OFF";
        selector?: {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        } | undefined;
        maxDiscount?: number | undefined;
    } | {
        value: number;
        type: "FIXED_OFF";
        selector?: {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        } | undefined;
        maxDiscount?: number | undefined;
    } | {
        type: "PRICE_OVERRIDE";
        price: number;
        selector?: {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        } | undefined;
    } | {
        type: "CHEAPEST_FREE";
        quantity: number;
        selector?: {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        } | undefined;
    } | {
        value: number;
        type: "ITEM_PERCENT_OFF";
        selector?: {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        } | undefined;
        maxDiscount?: number | undefined;
    } | {
        value: number;
        type: "ITEM_FIXED_OFF";
        selector?: {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        } | undefined;
        maxDiscount?: number | undefined;
    } | {
        type: "FREE_SHIPPING";
    } | {
        type: "BUY_X_GET_Y";
        buyQuantity: number;
        rewardQuantity: number;
        rewardPercentOff: number;
        strategy: "CHEAPEST" | "HIGHEST";
        qualifier?: {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        } | undefined;
        reward?: {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        } | undefined;
    } | {
        type: "BUNDLE_PRICE";
        items: {
            quantity: number;
            variantId?: string | undefined;
            productId?: string | undefined;
        }[];
        price: number;
    } | {
        type: "QUANTITY_TIERS";
        tiers: {
            value: number;
            threshold: number;
        }[];
        selector?: {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        } | undefined;
    } | {
        type: "SPEND_TIERS";
        tiers: {
            value: number;
            threshold: number;
        }[];
    } | {
        type: "FREE_GIFT";
        quantity: number;
        variantIds: string[];
        customerChooses: boolean;
    })[];
    targets: {
        productIds: string[];
        variantIds: string[];
        categoryIds: string[];
        brandIds: string[];
        excludedProductIds: string[];
        excludedVariantIds: string[];
        excludedCategoryIds: string[];
        excludedBrandIds: string[];
        customerIds: string[];
    };
    limits: {
        totalUses: number | null;
        usesPerCustomer: number | null;
        discountedUnits: number | null;
        maximumTotalDiscount: number | null;
    };
    display: {
        featured: boolean;
        badgeText: string | null;
        showCountdown: boolean;
        showOnOffers: boolean;
        bannerImageKey: string | null;
    };
    internalDescription?: string | null | undefined;
    customerDescription?: string | null | undefined;
    coupon?: {
        codes: string[];
        generateCount: number;
        prefix: string;
    } | undefined;
}, {
    type: "FREE_SHIPPING" | "PRODUCT_DISCOUNT" | "CART_DISCOUNT" | "BUY_X_GET_Y" | "BUNDLE" | "QUANTITY_TIER" | "SPEND_TIER" | "FREE_GIFT" | "FLASH_SALE";
    name: string;
    customerTitle: string;
    actions: ({
        value: number;
        type: "PERCENT_OFF";
        selector?: {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        } | undefined;
        maxDiscount?: number | undefined;
    } | {
        value: number;
        type: "FIXED_OFF";
        selector?: {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        } | undefined;
        maxDiscount?: number | undefined;
    } | {
        type: "PRICE_OVERRIDE";
        price: number;
        selector?: {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        } | undefined;
    } | {
        type: "CHEAPEST_FREE";
        quantity?: number | undefined;
        selector?: {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        } | undefined;
    } | {
        value: number;
        type: "ITEM_PERCENT_OFF";
        selector?: {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        } | undefined;
        maxDiscount?: number | undefined;
    } | {
        value: number;
        type: "ITEM_FIXED_OFF";
        selector?: {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        } | undefined;
        maxDiscount?: number | undefined;
    } | {
        type: "FREE_SHIPPING";
    } | {
        type: "BUY_X_GET_Y";
        buyQuantity: number;
        rewardQuantity?: number | undefined;
        rewardPercentOff?: number | undefined;
        qualifier?: {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        } | undefined;
        reward?: {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        } | undefined;
        strategy?: "CHEAPEST" | "HIGHEST" | undefined;
    } | {
        type: "BUNDLE_PRICE";
        items: {
            quantity: number;
            variantId?: string | undefined;
            productId?: string | undefined;
        }[];
        price: number;
    } | {
        type: "QUANTITY_TIERS";
        tiers: {
            value: number;
            threshold: number;
        }[];
        selector?: {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        } | undefined;
    } | {
        type: "SPEND_TIERS";
        tiers: {
            value: number;
            threshold: number;
        }[];
    } | {
        type: "FREE_GIFT";
        variantIds: string[];
        quantity?: number | undefined;
        customerChooses?: boolean | undefined;
    })[];
    internalDescription?: string | null | undefined;
    customerDescription?: string | null | undefined;
    trigger?: "AUTOMATIC" | "CODE" | undefined;
    state?: "ACTIVE" | "DRAFT" | "PAUSED" | "ARCHIVED" | undefined;
    priority?: number | undefined;
    stacking?: "EXCLUSIVE" | "COMBINABLE" | "BEST_OFFER" | undefined;
    combinableWith?: ("FREE_SHIPPING" | "PRODUCT_DISCOUNT" | "CART_DISCOUNT" | "BUY_X_GET_Y" | "BUNDLE" | "QUANTITY_TIER" | "SPEND_TIER" | "FREE_GIFT" | "FLASH_SALE")[] | undefined;
    startsAt?: string | null | undefined;
    endsAt?: string | null | undefined;
    timezone?: string | undefined;
    conditions?: ({
        value: number;
        type: "QUANTITY";
        operator?: "GT" | "GTE" | "LT" | "LTE" | "EQ" | undefined;
        selector?: {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        } | undefined;
    } | {
        value: number;
        type: "SUBTOTAL";
        operator?: "GT" | "GTE" | "LT" | "LTE" | "EQ" | undefined;
    } | {
        type: "HAS_ITEMS";
        selector: {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        };
    } | {
        type: "MISSING_ITEMS";
        selector: {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        };
    } | {
        value: "EVERYONE" | "AUTHENTICATED" | "GUEST" | "FIRST_ORDER" | "RETURNING" | "VIP";
        type: "CUSTOMER_TYPE";
    } | {
        type: "CUSTOMER";
        customerIds: string[];
    } | {
        value: number;
        type: "PAST_ORDER_COUNT";
        operator?: "GT" | "GTE" | "LT" | "LTE" | "EQ" | undefined;
    } | {
        value: number;
        type: "LIFETIME_SPEND";
        operator?: "GT" | "GTE" | "LT" | "LTE" | "EQ" | undefined;
    } | {
        value: number;
        type: "INACTIVE_DAYS";
        operator?: "GT" | "GTE" | "LT" | "LTE" | "EQ" | undefined;
    } | {
        type: "COUPON_ENTERED";
        code?: string | undefined;
    } | {
        values: string[];
        type: "PAYMENT_METHOD";
    } | {
        values: string[];
        type: "GOVERNORATE";
    })[] | undefined;
    targets?: {
        productIds?: string[] | undefined;
        variantIds?: string[] | undefined;
        categoryIds?: string[] | undefined;
        brandIds?: string[] | undefined;
        excludedProductIds?: string[] | undefined;
        excludedVariantIds?: string[] | undefined;
        excludedCategoryIds?: string[] | undefined;
        excludedBrandIds?: string[] | undefined;
        customerIds?: string[] | undefined;
    } | undefined;
    limits?: {
        totalUses?: number | null | undefined;
        usesPerCustomer?: number | null | undefined;
        discountedUnits?: number | null | undefined;
        maximumTotalDiscount?: number | null | undefined;
    } | undefined;
    display?: {
        featured?: boolean | undefined;
        badgeText?: string | null | undefined;
        showCountdown?: boolean | undefined;
        showOnOffers?: boolean | undefined;
        bannerImageKey?: string | null | undefined;
    } | undefined;
    coupon?: {
        codes?: string[] | undefined;
        generateCount?: number | undefined;
        prefix?: string | undefined;
    } | undefined;
}>;
export type CreatePromotionInput = z.infer<typeof createPromotionSchema>;
export declare const updatePromotionSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    internalDescription: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    customerTitle: z.ZodOptional<z.ZodString>;
    customerDescription: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    type: z.ZodOptional<z.ZodEnum<["PRODUCT_DISCOUNT", "CART_DISCOUNT", "BUY_X_GET_Y", "BUNDLE", "QUANTITY_TIER", "SPEND_TIER", "FREE_SHIPPING", "FREE_GIFT", "FLASH_SALE"]>>;
    trigger: z.ZodOptional<z.ZodDefault<z.ZodEnum<["AUTOMATIC", "CODE"]>>>;
    state: z.ZodOptional<z.ZodDefault<z.ZodEnum<["DRAFT", "ACTIVE", "PAUSED", "ARCHIVED"]>>>;
    priority: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    stacking: z.ZodOptional<z.ZodDefault<z.ZodEnum<["EXCLUSIVE", "COMBINABLE", "BEST_OFFER"]>>>;
    combinableWith: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodEnum<["PRODUCT_DISCOUNT", "CART_DISCOUNT", "BUY_X_GET_Y", "BUNDLE", "QUANTITY_TIER", "SPEND_TIER", "FREE_SHIPPING", "FREE_GIFT", "FLASH_SALE"]>, "many">>>;
    startsAt: z.ZodOptional<z.ZodDefault<z.ZodNullable<z.ZodString>>>;
    endsAt: z.ZodOptional<z.ZodDefault<z.ZodNullable<z.ZodString>>>;
    timezone: z.ZodOptional<z.ZodDefault<z.ZodString>>;
    conditions: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
        type: z.ZodLiteral<"SUBTOTAL">;
        operator: z.ZodDefault<z.ZodEnum<["GT", "GTE", "LT", "LTE", "EQ"]>>;
        value: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        value: number;
        type: "SUBTOTAL";
        operator: "GT" | "GTE" | "LT" | "LTE" | "EQ";
    }, {
        value: number;
        type: "SUBTOTAL";
        operator?: "GT" | "GTE" | "LT" | "LTE" | "EQ" | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"QUANTITY">;
        operator: z.ZodDefault<z.ZodEnum<["GT", "GTE", "LT", "LTE", "EQ"]>>;
        value: z.ZodNumber;
        selector: z.ZodOptional<z.ZodObject<{
            productIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            variantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            categoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            brandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedProductIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedVariantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedCategoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedBrandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        }, {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        value: number;
        type: "QUANTITY";
        operator: "GT" | "GTE" | "LT" | "LTE" | "EQ";
        selector?: {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        } | undefined;
    }, {
        value: number;
        type: "QUANTITY";
        operator?: "GT" | "GTE" | "LT" | "LTE" | "EQ" | undefined;
        selector?: {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        } | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"HAS_ITEMS">;
        selector: z.ZodObject<{
            productIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            variantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            categoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            brandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedProductIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedVariantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedCategoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedBrandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        }, {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        type: "HAS_ITEMS";
        selector: {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        };
    }, {
        type: "HAS_ITEMS";
        selector: {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        };
    }>, z.ZodObject<{
        type: z.ZodLiteral<"MISSING_ITEMS">;
        selector: z.ZodObject<{
            productIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            variantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            categoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            brandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedProductIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedVariantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedCategoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedBrandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        }, {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        type: "MISSING_ITEMS";
        selector: {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        };
    }, {
        type: "MISSING_ITEMS";
        selector: {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        };
    }>, z.ZodObject<{
        type: z.ZodLiteral<"CUSTOMER_TYPE">;
        value: z.ZodEnum<["EVERYONE", "AUTHENTICATED", "GUEST", "FIRST_ORDER", "RETURNING", "VIP"]>;
    }, "strip", z.ZodTypeAny, {
        value: "EVERYONE" | "AUTHENTICATED" | "GUEST" | "FIRST_ORDER" | "RETURNING" | "VIP";
        type: "CUSTOMER_TYPE";
    }, {
        value: "EVERYONE" | "AUTHENTICATED" | "GUEST" | "FIRST_ORDER" | "RETURNING" | "VIP";
        type: "CUSTOMER_TYPE";
    }>, z.ZodObject<{
        type: z.ZodLiteral<"CUSTOMER">;
        customerIds: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        type: "CUSTOMER";
        customerIds: string[];
    }, {
        type: "CUSTOMER";
        customerIds: string[];
    }>, z.ZodObject<{
        type: z.ZodLiteral<"PAST_ORDER_COUNT">;
        operator: z.ZodDefault<z.ZodEnum<["GT", "GTE", "LT", "LTE", "EQ"]>>;
        value: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        value: number;
        type: "PAST_ORDER_COUNT";
        operator: "GT" | "GTE" | "LT" | "LTE" | "EQ";
    }, {
        value: number;
        type: "PAST_ORDER_COUNT";
        operator?: "GT" | "GTE" | "LT" | "LTE" | "EQ" | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"LIFETIME_SPEND">;
        operator: z.ZodDefault<z.ZodEnum<["GT", "GTE", "LT", "LTE", "EQ"]>>;
        value: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        value: number;
        type: "LIFETIME_SPEND";
        operator: "GT" | "GTE" | "LT" | "LTE" | "EQ";
    }, {
        value: number;
        type: "LIFETIME_SPEND";
        operator?: "GT" | "GTE" | "LT" | "LTE" | "EQ" | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"INACTIVE_DAYS">;
        operator: z.ZodDefault<z.ZodEnum<["GT", "GTE", "LT", "LTE", "EQ"]>>;
        value: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        value: number;
        type: "INACTIVE_DAYS";
        operator: "GT" | "GTE" | "LT" | "LTE" | "EQ";
    }, {
        value: number;
        type: "INACTIVE_DAYS";
        operator?: "GT" | "GTE" | "LT" | "LTE" | "EQ" | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"COUPON_ENTERED">;
        code: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        type: "COUPON_ENTERED";
        code?: string | undefined;
    }, {
        type: "COUPON_ENTERED";
        code?: string | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"PAYMENT_METHOD">;
        values: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        values: string[];
        type: "PAYMENT_METHOD";
    }, {
        values: string[];
        type: "PAYMENT_METHOD";
    }>, z.ZodObject<{
        type: z.ZodLiteral<"GOVERNORATE">;
        values: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        values: string[];
        type: "GOVERNORATE";
    }, {
        values: string[];
        type: "GOVERNORATE";
    }>]>, "many">>>;
    actions: z.ZodOptional<z.ZodArray<z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
        maxDiscount: z.ZodOptional<z.ZodNumber>;
        selector: z.ZodOptional<z.ZodObject<{
            productIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            variantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            categoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            brandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedProductIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedVariantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedCategoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedBrandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        }, {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        }>>;
        type: z.ZodLiteral<"PERCENT_OFF">;
        value: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        value: number;
        type: "PERCENT_OFF";
        selector?: {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        } | undefined;
        maxDiscount?: number | undefined;
    }, {
        value: number;
        type: "PERCENT_OFF";
        selector?: {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        } | undefined;
        maxDiscount?: number | undefined;
    }>, z.ZodObject<{
        maxDiscount: z.ZodOptional<z.ZodNumber>;
        selector: z.ZodOptional<z.ZodObject<{
            productIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            variantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            categoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            brandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedProductIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedVariantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedCategoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedBrandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        }, {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        }>>;
        type: z.ZodLiteral<"FIXED_OFF">;
        value: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        value: number;
        type: "FIXED_OFF";
        selector?: {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        } | undefined;
        maxDiscount?: number | undefined;
    }, {
        value: number;
        type: "FIXED_OFF";
        selector?: {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        } | undefined;
        maxDiscount?: number | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"PRICE_OVERRIDE">;
        price: z.ZodNumber;
        selector: z.ZodOptional<z.ZodObject<{
            productIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            variantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            categoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            brandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedProductIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedVariantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedCategoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedBrandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        }, {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        type: "PRICE_OVERRIDE";
        price: number;
        selector?: {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        } | undefined;
    }, {
        type: "PRICE_OVERRIDE";
        price: number;
        selector?: {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        } | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"CHEAPEST_FREE">;
        quantity: z.ZodDefault<z.ZodNumber>;
        selector: z.ZodOptional<z.ZodObject<{
            productIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            variantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            categoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            brandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedProductIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedVariantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedCategoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedBrandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        }, {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        type: "CHEAPEST_FREE";
        quantity: number;
        selector?: {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        } | undefined;
    }, {
        type: "CHEAPEST_FREE";
        quantity?: number | undefined;
        selector?: {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        } | undefined;
    }>, z.ZodObject<{
        maxDiscount: z.ZodOptional<z.ZodNumber>;
        selector: z.ZodOptional<z.ZodObject<{
            productIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            variantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            categoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            brandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedProductIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedVariantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedCategoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedBrandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        }, {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        }>>;
        type: z.ZodLiteral<"ITEM_PERCENT_OFF">;
        value: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        value: number;
        type: "ITEM_PERCENT_OFF";
        selector?: {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        } | undefined;
        maxDiscount?: number | undefined;
    }, {
        value: number;
        type: "ITEM_PERCENT_OFF";
        selector?: {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        } | undefined;
        maxDiscount?: number | undefined;
    }>, z.ZodObject<{
        maxDiscount: z.ZodOptional<z.ZodNumber>;
        selector: z.ZodOptional<z.ZodObject<{
            productIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            variantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            categoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            brandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedProductIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedVariantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedCategoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedBrandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        }, {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        }>>;
        type: z.ZodLiteral<"ITEM_FIXED_OFF">;
        value: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        value: number;
        type: "ITEM_FIXED_OFF";
        selector?: {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        } | undefined;
        maxDiscount?: number | undefined;
    }, {
        value: number;
        type: "ITEM_FIXED_OFF";
        selector?: {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        } | undefined;
        maxDiscount?: number | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"FREE_SHIPPING">;
    }, "strip", z.ZodTypeAny, {
        type: "FREE_SHIPPING";
    }, {
        type: "FREE_SHIPPING";
    }>, z.ZodObject<{
        type: z.ZodLiteral<"BUY_X_GET_Y">;
        buyQuantity: z.ZodNumber;
        rewardQuantity: z.ZodDefault<z.ZodNumber>;
        rewardPercentOff: z.ZodDefault<z.ZodNumber>;
        qualifier: z.ZodOptional<z.ZodObject<{
            productIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            variantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            categoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            brandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedProductIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedVariantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedCategoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedBrandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        }, {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        }>>;
        reward: z.ZodOptional<z.ZodObject<{
            productIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            variantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            categoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            brandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedProductIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedVariantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedCategoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedBrandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        }, {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        }>>;
        strategy: z.ZodDefault<z.ZodEnum<["CHEAPEST", "HIGHEST"]>>;
    }, "strip", z.ZodTypeAny, {
        type: "BUY_X_GET_Y";
        buyQuantity: number;
        rewardQuantity: number;
        rewardPercentOff: number;
        strategy: "CHEAPEST" | "HIGHEST";
        qualifier?: {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        } | undefined;
        reward?: {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        } | undefined;
    }, {
        type: "BUY_X_GET_Y";
        buyQuantity: number;
        rewardQuantity?: number | undefined;
        rewardPercentOff?: number | undefined;
        qualifier?: {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        } | undefined;
        reward?: {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        } | undefined;
        strategy?: "CHEAPEST" | "HIGHEST" | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"BUNDLE_PRICE">;
        price: z.ZodNumber;
        items: z.ZodArray<z.ZodObject<{
            variantId: z.ZodOptional<z.ZodString>;
            productId: z.ZodOptional<z.ZodString>;
            quantity: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            quantity: number;
            variantId?: string | undefined;
            productId?: string | undefined;
        }, {
            quantity: number;
            variantId?: string | undefined;
            productId?: string | undefined;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        type: "BUNDLE_PRICE";
        items: {
            quantity: number;
            variantId?: string | undefined;
            productId?: string | undefined;
        }[];
        price: number;
    }, {
        type: "BUNDLE_PRICE";
        items: {
            quantity: number;
            variantId?: string | undefined;
            productId?: string | undefined;
        }[];
        price: number;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"QUANTITY_TIERS">;
        tiers: z.ZodArray<z.ZodObject<{
            threshold: z.ZodNumber;
        } & {
            value: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            value: number;
            threshold: number;
        }, {
            value: number;
            threshold: number;
        }>, "many">;
        selector: z.ZodOptional<z.ZodObject<{
            productIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            variantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            categoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            brandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedProductIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedVariantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedCategoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedBrandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        }, {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        type: "QUANTITY_TIERS";
        tiers: {
            value: number;
            threshold: number;
        }[];
        selector?: {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        } | undefined;
    }, {
        type: "QUANTITY_TIERS";
        tiers: {
            value: number;
            threshold: number;
        }[];
        selector?: {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        } | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"SPEND_TIERS">;
        tiers: z.ZodArray<z.ZodObject<{
            threshold: z.ZodNumber;
        } & {
            value: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            value: number;
            threshold: number;
        }, {
            value: number;
            threshold: number;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        type: "SPEND_TIERS";
        tiers: {
            value: number;
            threshold: number;
        }[];
    }, {
        type: "SPEND_TIERS";
        tiers: {
            value: number;
            threshold: number;
        }[];
    }>, z.ZodObject<{
        type: z.ZodLiteral<"FREE_GIFT">;
        variantIds: z.ZodArray<z.ZodString, "many">;
        quantity: z.ZodDefault<z.ZodNumber>;
        customerChooses: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        type: "FREE_GIFT";
        quantity: number;
        variantIds: string[];
        customerChooses: boolean;
    }, {
        type: "FREE_GIFT";
        variantIds: string[];
        quantity?: number | undefined;
        customerChooses?: boolean | undefined;
    }>]>, "many">>;
    targets: z.ZodOptional<z.ZodDefault<z.ZodObject<{
        productIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        variantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        categoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        brandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        excludedProductIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        excludedVariantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        excludedCategoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        excludedBrandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    } & {
        customerIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        productIds: string[];
        variantIds: string[];
        categoryIds: string[];
        brandIds: string[];
        excludedProductIds: string[];
        excludedVariantIds: string[];
        excludedCategoryIds: string[];
        excludedBrandIds: string[];
        customerIds: string[];
    }, {
        productIds?: string[] | undefined;
        variantIds?: string[] | undefined;
        categoryIds?: string[] | undefined;
        brandIds?: string[] | undefined;
        excludedProductIds?: string[] | undefined;
        excludedVariantIds?: string[] | undefined;
        excludedCategoryIds?: string[] | undefined;
        excludedBrandIds?: string[] | undefined;
        customerIds?: string[] | undefined;
    }>>>;
    limits: z.ZodOptional<z.ZodDefault<z.ZodObject<{
        totalUses: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
        usesPerCustomer: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
        discountedUnits: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
        maximumTotalDiscount: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
    }, "strip", z.ZodTypeAny, {
        totalUses: number | null;
        usesPerCustomer: number | null;
        discountedUnits: number | null;
        maximumTotalDiscount: number | null;
    }, {
        totalUses?: number | null | undefined;
        usesPerCustomer?: number | null | undefined;
        discountedUnits?: number | null | undefined;
        maximumTotalDiscount?: number | null | undefined;
    }>>>;
    display: z.ZodOptional<z.ZodDefault<z.ZodObject<{
        badgeText: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        showCountdown: z.ZodDefault<z.ZodBoolean>;
        showOnOffers: z.ZodDefault<z.ZodBoolean>;
        featured: z.ZodDefault<z.ZodBoolean>;
        bannerImageKey: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        featured: boolean;
        badgeText: string | null;
        showCountdown: boolean;
        showOnOffers: boolean;
        bannerImageKey: string | null;
    }, {
        featured?: boolean | undefined;
        badgeText?: string | null | undefined;
        showCountdown?: boolean | undefined;
        showOnOffers?: boolean | undefined;
        bannerImageKey?: string | null | undefined;
    }>>>;
    coupon: z.ZodOptional<z.ZodOptional<z.ZodObject<{
        codes: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        generateCount: z.ZodDefault<z.ZodNumber>;
        prefix: z.ZodDefault<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        codes: string[];
        generateCount: number;
        prefix: string;
    }, {
        codes?: string[] | undefined;
        generateCount?: number | undefined;
        prefix?: string | undefined;
    }>>>;
}, "strip", z.ZodTypeAny, {
    type?: "FREE_SHIPPING" | "PRODUCT_DISCOUNT" | "CART_DISCOUNT" | "BUY_X_GET_Y" | "BUNDLE" | "QUANTITY_TIER" | "SPEND_TIER" | "FREE_GIFT" | "FLASH_SALE" | undefined;
    name?: string | undefined;
    internalDescription?: string | null | undefined;
    customerTitle?: string | undefined;
    customerDescription?: string | null | undefined;
    trigger?: "AUTOMATIC" | "CODE" | undefined;
    state?: "ACTIVE" | "DRAFT" | "PAUSED" | "ARCHIVED" | undefined;
    priority?: number | undefined;
    stacking?: "EXCLUSIVE" | "COMBINABLE" | "BEST_OFFER" | undefined;
    combinableWith?: ("FREE_SHIPPING" | "PRODUCT_DISCOUNT" | "CART_DISCOUNT" | "BUY_X_GET_Y" | "BUNDLE" | "QUANTITY_TIER" | "SPEND_TIER" | "FREE_GIFT" | "FLASH_SALE")[] | undefined;
    startsAt?: string | null | undefined;
    endsAt?: string | null | undefined;
    timezone?: string | undefined;
    conditions?: ({
        value: number;
        type: "QUANTITY";
        operator: "GT" | "GTE" | "LT" | "LTE" | "EQ";
        selector?: {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        } | undefined;
    } | {
        value: number;
        type: "SUBTOTAL";
        operator: "GT" | "GTE" | "LT" | "LTE" | "EQ";
    } | {
        type: "HAS_ITEMS";
        selector: {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        };
    } | {
        type: "MISSING_ITEMS";
        selector: {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        };
    } | {
        value: "EVERYONE" | "AUTHENTICATED" | "GUEST" | "FIRST_ORDER" | "RETURNING" | "VIP";
        type: "CUSTOMER_TYPE";
    } | {
        type: "CUSTOMER";
        customerIds: string[];
    } | {
        value: number;
        type: "PAST_ORDER_COUNT";
        operator: "GT" | "GTE" | "LT" | "LTE" | "EQ";
    } | {
        value: number;
        type: "LIFETIME_SPEND";
        operator: "GT" | "GTE" | "LT" | "LTE" | "EQ";
    } | {
        value: number;
        type: "INACTIVE_DAYS";
        operator: "GT" | "GTE" | "LT" | "LTE" | "EQ";
    } | {
        type: "COUPON_ENTERED";
        code?: string | undefined;
    } | {
        values: string[];
        type: "PAYMENT_METHOD";
    } | {
        values: string[];
        type: "GOVERNORATE";
    })[] | undefined;
    actions?: ({
        value: number;
        type: "PERCENT_OFF";
        selector?: {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        } | undefined;
        maxDiscount?: number | undefined;
    } | {
        value: number;
        type: "FIXED_OFF";
        selector?: {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        } | undefined;
        maxDiscount?: number | undefined;
    } | {
        type: "PRICE_OVERRIDE";
        price: number;
        selector?: {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        } | undefined;
    } | {
        type: "CHEAPEST_FREE";
        quantity: number;
        selector?: {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        } | undefined;
    } | {
        value: number;
        type: "ITEM_PERCENT_OFF";
        selector?: {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        } | undefined;
        maxDiscount?: number | undefined;
    } | {
        value: number;
        type: "ITEM_FIXED_OFF";
        selector?: {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        } | undefined;
        maxDiscount?: number | undefined;
    } | {
        type: "FREE_SHIPPING";
    } | {
        type: "BUY_X_GET_Y";
        buyQuantity: number;
        rewardQuantity: number;
        rewardPercentOff: number;
        strategy: "CHEAPEST" | "HIGHEST";
        qualifier?: {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        } | undefined;
        reward?: {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        } | undefined;
    } | {
        type: "BUNDLE_PRICE";
        items: {
            quantity: number;
            variantId?: string | undefined;
            productId?: string | undefined;
        }[];
        price: number;
    } | {
        type: "QUANTITY_TIERS";
        tiers: {
            value: number;
            threshold: number;
        }[];
        selector?: {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        } | undefined;
    } | {
        type: "SPEND_TIERS";
        tiers: {
            value: number;
            threshold: number;
        }[];
    } | {
        type: "FREE_GIFT";
        quantity: number;
        variantIds: string[];
        customerChooses: boolean;
    })[] | undefined;
    targets?: {
        productIds: string[];
        variantIds: string[];
        categoryIds: string[];
        brandIds: string[];
        excludedProductIds: string[];
        excludedVariantIds: string[];
        excludedCategoryIds: string[];
        excludedBrandIds: string[];
        customerIds: string[];
    } | undefined;
    limits?: {
        totalUses: number | null;
        usesPerCustomer: number | null;
        discountedUnits: number | null;
        maximumTotalDiscount: number | null;
    } | undefined;
    display?: {
        featured: boolean;
        badgeText: string | null;
        showCountdown: boolean;
        showOnOffers: boolean;
        bannerImageKey: string | null;
    } | undefined;
    coupon?: {
        codes: string[];
        generateCount: number;
        prefix: string;
    } | undefined;
}, {
    type?: "FREE_SHIPPING" | "PRODUCT_DISCOUNT" | "CART_DISCOUNT" | "BUY_X_GET_Y" | "BUNDLE" | "QUANTITY_TIER" | "SPEND_TIER" | "FREE_GIFT" | "FLASH_SALE" | undefined;
    name?: string | undefined;
    internalDescription?: string | null | undefined;
    customerTitle?: string | undefined;
    customerDescription?: string | null | undefined;
    trigger?: "AUTOMATIC" | "CODE" | undefined;
    state?: "ACTIVE" | "DRAFT" | "PAUSED" | "ARCHIVED" | undefined;
    priority?: number | undefined;
    stacking?: "EXCLUSIVE" | "COMBINABLE" | "BEST_OFFER" | undefined;
    combinableWith?: ("FREE_SHIPPING" | "PRODUCT_DISCOUNT" | "CART_DISCOUNT" | "BUY_X_GET_Y" | "BUNDLE" | "QUANTITY_TIER" | "SPEND_TIER" | "FREE_GIFT" | "FLASH_SALE")[] | undefined;
    startsAt?: string | null | undefined;
    endsAt?: string | null | undefined;
    timezone?: string | undefined;
    conditions?: ({
        value: number;
        type: "QUANTITY";
        operator?: "GT" | "GTE" | "LT" | "LTE" | "EQ" | undefined;
        selector?: {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        } | undefined;
    } | {
        value: number;
        type: "SUBTOTAL";
        operator?: "GT" | "GTE" | "LT" | "LTE" | "EQ" | undefined;
    } | {
        type: "HAS_ITEMS";
        selector: {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        };
    } | {
        type: "MISSING_ITEMS";
        selector: {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        };
    } | {
        value: "EVERYONE" | "AUTHENTICATED" | "GUEST" | "FIRST_ORDER" | "RETURNING" | "VIP";
        type: "CUSTOMER_TYPE";
    } | {
        type: "CUSTOMER";
        customerIds: string[];
    } | {
        value: number;
        type: "PAST_ORDER_COUNT";
        operator?: "GT" | "GTE" | "LT" | "LTE" | "EQ" | undefined;
    } | {
        value: number;
        type: "LIFETIME_SPEND";
        operator?: "GT" | "GTE" | "LT" | "LTE" | "EQ" | undefined;
    } | {
        value: number;
        type: "INACTIVE_DAYS";
        operator?: "GT" | "GTE" | "LT" | "LTE" | "EQ" | undefined;
    } | {
        type: "COUPON_ENTERED";
        code?: string | undefined;
    } | {
        values: string[];
        type: "PAYMENT_METHOD";
    } | {
        values: string[];
        type: "GOVERNORATE";
    })[] | undefined;
    actions?: ({
        value: number;
        type: "PERCENT_OFF";
        selector?: {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        } | undefined;
        maxDiscount?: number | undefined;
    } | {
        value: number;
        type: "FIXED_OFF";
        selector?: {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        } | undefined;
        maxDiscount?: number | undefined;
    } | {
        type: "PRICE_OVERRIDE";
        price: number;
        selector?: {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        } | undefined;
    } | {
        type: "CHEAPEST_FREE";
        quantity?: number | undefined;
        selector?: {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        } | undefined;
    } | {
        value: number;
        type: "ITEM_PERCENT_OFF";
        selector?: {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        } | undefined;
        maxDiscount?: number | undefined;
    } | {
        value: number;
        type: "ITEM_FIXED_OFF";
        selector?: {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        } | undefined;
        maxDiscount?: number | undefined;
    } | {
        type: "FREE_SHIPPING";
    } | {
        type: "BUY_X_GET_Y";
        buyQuantity: number;
        rewardQuantity?: number | undefined;
        rewardPercentOff?: number | undefined;
        qualifier?: {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        } | undefined;
        reward?: {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        } | undefined;
        strategy?: "CHEAPEST" | "HIGHEST" | undefined;
    } | {
        type: "BUNDLE_PRICE";
        items: {
            quantity: number;
            variantId?: string | undefined;
            productId?: string | undefined;
        }[];
        price: number;
    } | {
        type: "QUANTITY_TIERS";
        tiers: {
            value: number;
            threshold: number;
        }[];
        selector?: {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        } | undefined;
    } | {
        type: "SPEND_TIERS";
        tiers: {
            value: number;
            threshold: number;
        }[];
    } | {
        type: "FREE_GIFT";
        variantIds: string[];
        quantity?: number | undefined;
        customerChooses?: boolean | undefined;
    })[] | undefined;
    targets?: {
        productIds?: string[] | undefined;
        variantIds?: string[] | undefined;
        categoryIds?: string[] | undefined;
        brandIds?: string[] | undefined;
        excludedProductIds?: string[] | undefined;
        excludedVariantIds?: string[] | undefined;
        excludedCategoryIds?: string[] | undefined;
        excludedBrandIds?: string[] | undefined;
        customerIds?: string[] | undefined;
    } | undefined;
    limits?: {
        totalUses?: number | null | undefined;
        usesPerCustomer?: number | null | undefined;
        discountedUnits?: number | null | undefined;
        maximumTotalDiscount?: number | null | undefined;
    } | undefined;
    display?: {
        featured?: boolean | undefined;
        badgeText?: string | null | undefined;
        showCountdown?: boolean | undefined;
        showOnOffers?: boolean | undefined;
        bannerImageKey?: string | null | undefined;
    } | undefined;
    coupon?: {
        codes?: string[] | undefined;
        generateCount?: number | undefined;
        prefix?: string | undefined;
    } | undefined;
}>;
export type UpdatePromotionInput = z.infer<typeof updatePromotionSchema>;
export declare const promotionQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    sortOrder: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
} & {
    search: z.ZodOptional<z.ZodString>;
    type: z.ZodOptional<z.ZodEnum<["PRODUCT_DISCOUNT", "CART_DISCOUNT", "BUY_X_GET_Y", "BUNDLE", "QUANTITY_TIER", "SPEND_TIER", "FREE_SHIPPING", "FREE_GIFT", "FLASH_SALE"]>>;
    status: z.ZodOptional<z.ZodEnum<["DRAFT", "SCHEDULED", "ACTIVE", "PAUSED", "EXPIRED", "EXHAUSTED", "ARCHIVED"]>>;
    trigger: z.ZodOptional<z.ZodEnum<["AUTOMATIC", "CODE"]>>;
    sortBy: z.ZodDefault<z.ZodEnum<["createdAt", "updatedAt", "priority", "startsAt", "usedCount"]>>;
}, "strip", z.ZodTypeAny, {
    page: number;
    limit: number;
    sortBy: "createdAt" | "updatedAt" | "priority" | "startsAt" | "usedCount";
    sortOrder: "asc" | "desc";
    type?: "FREE_SHIPPING" | "PRODUCT_DISCOUNT" | "CART_DISCOUNT" | "BUY_X_GET_Y" | "BUNDLE" | "QUANTITY_TIER" | "SPEND_TIER" | "FREE_GIFT" | "FLASH_SALE" | undefined;
    status?: "ACTIVE" | "EXPIRED" | "DRAFT" | "PAUSED" | "ARCHIVED" | "SCHEDULED" | "EXHAUSTED" | undefined;
    search?: string | undefined;
    trigger?: "AUTOMATIC" | "CODE" | undefined;
}, {
    type?: "FREE_SHIPPING" | "PRODUCT_DISCOUNT" | "CART_DISCOUNT" | "BUY_X_GET_Y" | "BUNDLE" | "QUANTITY_TIER" | "SPEND_TIER" | "FREE_GIFT" | "FLASH_SALE" | undefined;
    status?: "ACTIVE" | "EXPIRED" | "DRAFT" | "PAUSED" | "ARCHIVED" | "SCHEDULED" | "EXHAUSTED" | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sortBy?: "createdAt" | "updatedAt" | "priority" | "startsAt" | "usedCount" | undefined;
    sortOrder?: "asc" | "desc" | undefined;
    search?: string | undefined;
    trigger?: "AUTOMATIC" | "CODE" | undefined;
}>;
export type PromotionQuery = z.infer<typeof promotionQuerySchema>;
export declare const promotionLineSchema: z.ZodObject<{
    variantId: z.ZodString;
    productId: z.ZodString;
    categoryId: z.ZodString;
    brandId: z.ZodNullable<z.ZodString>;
    name: z.ZodString;
    unitPrice: z.ZodNumber;
    quantity: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    name: string;
    variantId: string;
    quantity: number;
    productId: string;
    categoryId: string;
    brandId: string | null;
    unitPrice: number;
}, {
    name: string;
    variantId: string;
    quantity: number;
    productId: string;
    categoryId: string;
    brandId: string | null;
    unitPrice: number;
}>;
export declare const promotionPreviewSchema: z.ZodObject<{
    promotion: z.ZodOptional<z.ZodObject<{
        name: z.ZodString;
        internalDescription: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        customerTitle: z.ZodString;
        customerDescription: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        type: z.ZodEnum<["PRODUCT_DISCOUNT", "CART_DISCOUNT", "BUY_X_GET_Y", "BUNDLE", "QUANTITY_TIER", "SPEND_TIER", "FREE_SHIPPING", "FREE_GIFT", "FLASH_SALE"]>;
        trigger: z.ZodDefault<z.ZodEnum<["AUTOMATIC", "CODE"]>>;
        state: z.ZodDefault<z.ZodEnum<["DRAFT", "ACTIVE", "PAUSED", "ARCHIVED"]>>;
        priority: z.ZodDefault<z.ZodNumber>;
        stacking: z.ZodDefault<z.ZodEnum<["EXCLUSIVE", "COMBINABLE", "BEST_OFFER"]>>;
        combinableWith: z.ZodDefault<z.ZodArray<z.ZodEnum<["PRODUCT_DISCOUNT", "CART_DISCOUNT", "BUY_X_GET_Y", "BUNDLE", "QUANTITY_TIER", "SPEND_TIER", "FREE_SHIPPING", "FREE_GIFT", "FLASH_SALE"]>, "many">>;
        startsAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        endsAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        timezone: z.ZodDefault<z.ZodString>;
        conditions: z.ZodDefault<z.ZodArray<z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
            type: z.ZodLiteral<"SUBTOTAL">;
            operator: z.ZodDefault<z.ZodEnum<["GT", "GTE", "LT", "LTE", "EQ"]>>;
            value: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            value: number;
            type: "SUBTOTAL";
            operator: "GT" | "GTE" | "LT" | "LTE" | "EQ";
        }, {
            value: number;
            type: "SUBTOTAL";
            operator?: "GT" | "GTE" | "LT" | "LTE" | "EQ" | undefined;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"QUANTITY">;
            operator: z.ZodDefault<z.ZodEnum<["GT", "GTE", "LT", "LTE", "EQ"]>>;
            value: z.ZodNumber;
            selector: z.ZodOptional<z.ZodObject<{
                productIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                variantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                categoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                brandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                excludedProductIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                excludedVariantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                excludedCategoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                excludedBrandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            }, "strip", z.ZodTypeAny, {
                productIds: string[];
                variantIds: string[];
                categoryIds: string[];
                brandIds: string[];
                excludedProductIds: string[];
                excludedVariantIds: string[];
                excludedCategoryIds: string[];
                excludedBrandIds: string[];
            }, {
                productIds?: string[] | undefined;
                variantIds?: string[] | undefined;
                categoryIds?: string[] | undefined;
                brandIds?: string[] | undefined;
                excludedProductIds?: string[] | undefined;
                excludedVariantIds?: string[] | undefined;
                excludedCategoryIds?: string[] | undefined;
                excludedBrandIds?: string[] | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            value: number;
            type: "QUANTITY";
            operator: "GT" | "GTE" | "LT" | "LTE" | "EQ";
            selector?: {
                productIds: string[];
                variantIds: string[];
                categoryIds: string[];
                brandIds: string[];
                excludedProductIds: string[];
                excludedVariantIds: string[];
                excludedCategoryIds: string[];
                excludedBrandIds: string[];
            } | undefined;
        }, {
            value: number;
            type: "QUANTITY";
            operator?: "GT" | "GTE" | "LT" | "LTE" | "EQ" | undefined;
            selector?: {
                productIds?: string[] | undefined;
                variantIds?: string[] | undefined;
                categoryIds?: string[] | undefined;
                brandIds?: string[] | undefined;
                excludedProductIds?: string[] | undefined;
                excludedVariantIds?: string[] | undefined;
                excludedCategoryIds?: string[] | undefined;
                excludedBrandIds?: string[] | undefined;
            } | undefined;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"HAS_ITEMS">;
            selector: z.ZodObject<{
                productIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                variantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                categoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                brandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                excludedProductIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                excludedVariantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                excludedCategoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                excludedBrandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            }, "strip", z.ZodTypeAny, {
                productIds: string[];
                variantIds: string[];
                categoryIds: string[];
                brandIds: string[];
                excludedProductIds: string[];
                excludedVariantIds: string[];
                excludedCategoryIds: string[];
                excludedBrandIds: string[];
            }, {
                productIds?: string[] | undefined;
                variantIds?: string[] | undefined;
                categoryIds?: string[] | undefined;
                brandIds?: string[] | undefined;
                excludedProductIds?: string[] | undefined;
                excludedVariantIds?: string[] | undefined;
                excludedCategoryIds?: string[] | undefined;
                excludedBrandIds?: string[] | undefined;
            }>;
        }, "strip", z.ZodTypeAny, {
            type: "HAS_ITEMS";
            selector: {
                productIds: string[];
                variantIds: string[];
                categoryIds: string[];
                brandIds: string[];
                excludedProductIds: string[];
                excludedVariantIds: string[];
                excludedCategoryIds: string[];
                excludedBrandIds: string[];
            };
        }, {
            type: "HAS_ITEMS";
            selector: {
                productIds?: string[] | undefined;
                variantIds?: string[] | undefined;
                categoryIds?: string[] | undefined;
                brandIds?: string[] | undefined;
                excludedProductIds?: string[] | undefined;
                excludedVariantIds?: string[] | undefined;
                excludedCategoryIds?: string[] | undefined;
                excludedBrandIds?: string[] | undefined;
            };
        }>, z.ZodObject<{
            type: z.ZodLiteral<"MISSING_ITEMS">;
            selector: z.ZodObject<{
                productIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                variantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                categoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                brandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                excludedProductIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                excludedVariantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                excludedCategoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                excludedBrandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            }, "strip", z.ZodTypeAny, {
                productIds: string[];
                variantIds: string[];
                categoryIds: string[];
                brandIds: string[];
                excludedProductIds: string[];
                excludedVariantIds: string[];
                excludedCategoryIds: string[];
                excludedBrandIds: string[];
            }, {
                productIds?: string[] | undefined;
                variantIds?: string[] | undefined;
                categoryIds?: string[] | undefined;
                brandIds?: string[] | undefined;
                excludedProductIds?: string[] | undefined;
                excludedVariantIds?: string[] | undefined;
                excludedCategoryIds?: string[] | undefined;
                excludedBrandIds?: string[] | undefined;
            }>;
        }, "strip", z.ZodTypeAny, {
            type: "MISSING_ITEMS";
            selector: {
                productIds: string[];
                variantIds: string[];
                categoryIds: string[];
                brandIds: string[];
                excludedProductIds: string[];
                excludedVariantIds: string[];
                excludedCategoryIds: string[];
                excludedBrandIds: string[];
            };
        }, {
            type: "MISSING_ITEMS";
            selector: {
                productIds?: string[] | undefined;
                variantIds?: string[] | undefined;
                categoryIds?: string[] | undefined;
                brandIds?: string[] | undefined;
                excludedProductIds?: string[] | undefined;
                excludedVariantIds?: string[] | undefined;
                excludedCategoryIds?: string[] | undefined;
                excludedBrandIds?: string[] | undefined;
            };
        }>, z.ZodObject<{
            type: z.ZodLiteral<"CUSTOMER_TYPE">;
            value: z.ZodEnum<["EVERYONE", "AUTHENTICATED", "GUEST", "FIRST_ORDER", "RETURNING", "VIP"]>;
        }, "strip", z.ZodTypeAny, {
            value: "EVERYONE" | "AUTHENTICATED" | "GUEST" | "FIRST_ORDER" | "RETURNING" | "VIP";
            type: "CUSTOMER_TYPE";
        }, {
            value: "EVERYONE" | "AUTHENTICATED" | "GUEST" | "FIRST_ORDER" | "RETURNING" | "VIP";
            type: "CUSTOMER_TYPE";
        }>, z.ZodObject<{
            type: z.ZodLiteral<"CUSTOMER">;
            customerIds: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            type: "CUSTOMER";
            customerIds: string[];
        }, {
            type: "CUSTOMER";
            customerIds: string[];
        }>, z.ZodObject<{
            type: z.ZodLiteral<"PAST_ORDER_COUNT">;
            operator: z.ZodDefault<z.ZodEnum<["GT", "GTE", "LT", "LTE", "EQ"]>>;
            value: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            value: number;
            type: "PAST_ORDER_COUNT";
            operator: "GT" | "GTE" | "LT" | "LTE" | "EQ";
        }, {
            value: number;
            type: "PAST_ORDER_COUNT";
            operator?: "GT" | "GTE" | "LT" | "LTE" | "EQ" | undefined;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"LIFETIME_SPEND">;
            operator: z.ZodDefault<z.ZodEnum<["GT", "GTE", "LT", "LTE", "EQ"]>>;
            value: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            value: number;
            type: "LIFETIME_SPEND";
            operator: "GT" | "GTE" | "LT" | "LTE" | "EQ";
        }, {
            value: number;
            type: "LIFETIME_SPEND";
            operator?: "GT" | "GTE" | "LT" | "LTE" | "EQ" | undefined;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"INACTIVE_DAYS">;
            operator: z.ZodDefault<z.ZodEnum<["GT", "GTE", "LT", "LTE", "EQ"]>>;
            value: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            value: number;
            type: "INACTIVE_DAYS";
            operator: "GT" | "GTE" | "LT" | "LTE" | "EQ";
        }, {
            value: number;
            type: "INACTIVE_DAYS";
            operator?: "GT" | "GTE" | "LT" | "LTE" | "EQ" | undefined;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"COUPON_ENTERED">;
            code: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            type: "COUPON_ENTERED";
            code?: string | undefined;
        }, {
            type: "COUPON_ENTERED";
            code?: string | undefined;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"PAYMENT_METHOD">;
            values: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            values: string[];
            type: "PAYMENT_METHOD";
        }, {
            values: string[];
            type: "PAYMENT_METHOD";
        }>, z.ZodObject<{
            type: z.ZodLiteral<"GOVERNORATE">;
            values: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            values: string[];
            type: "GOVERNORATE";
        }, {
            values: string[];
            type: "GOVERNORATE";
        }>]>, "many">>;
        actions: z.ZodArray<z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
            maxDiscount: z.ZodOptional<z.ZodNumber>;
            selector: z.ZodOptional<z.ZodObject<{
                productIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                variantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                categoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                brandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                excludedProductIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                excludedVariantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                excludedCategoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                excludedBrandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            }, "strip", z.ZodTypeAny, {
                productIds: string[];
                variantIds: string[];
                categoryIds: string[];
                brandIds: string[];
                excludedProductIds: string[];
                excludedVariantIds: string[];
                excludedCategoryIds: string[];
                excludedBrandIds: string[];
            }, {
                productIds?: string[] | undefined;
                variantIds?: string[] | undefined;
                categoryIds?: string[] | undefined;
                brandIds?: string[] | undefined;
                excludedProductIds?: string[] | undefined;
                excludedVariantIds?: string[] | undefined;
                excludedCategoryIds?: string[] | undefined;
                excludedBrandIds?: string[] | undefined;
            }>>;
            type: z.ZodLiteral<"PERCENT_OFF">;
            value: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            value: number;
            type: "PERCENT_OFF";
            selector?: {
                productIds: string[];
                variantIds: string[];
                categoryIds: string[];
                brandIds: string[];
                excludedProductIds: string[];
                excludedVariantIds: string[];
                excludedCategoryIds: string[];
                excludedBrandIds: string[];
            } | undefined;
            maxDiscount?: number | undefined;
        }, {
            value: number;
            type: "PERCENT_OFF";
            selector?: {
                productIds?: string[] | undefined;
                variantIds?: string[] | undefined;
                categoryIds?: string[] | undefined;
                brandIds?: string[] | undefined;
                excludedProductIds?: string[] | undefined;
                excludedVariantIds?: string[] | undefined;
                excludedCategoryIds?: string[] | undefined;
                excludedBrandIds?: string[] | undefined;
            } | undefined;
            maxDiscount?: number | undefined;
        }>, z.ZodObject<{
            maxDiscount: z.ZodOptional<z.ZodNumber>;
            selector: z.ZodOptional<z.ZodObject<{
                productIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                variantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                categoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                brandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                excludedProductIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                excludedVariantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                excludedCategoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                excludedBrandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            }, "strip", z.ZodTypeAny, {
                productIds: string[];
                variantIds: string[];
                categoryIds: string[];
                brandIds: string[];
                excludedProductIds: string[];
                excludedVariantIds: string[];
                excludedCategoryIds: string[];
                excludedBrandIds: string[];
            }, {
                productIds?: string[] | undefined;
                variantIds?: string[] | undefined;
                categoryIds?: string[] | undefined;
                brandIds?: string[] | undefined;
                excludedProductIds?: string[] | undefined;
                excludedVariantIds?: string[] | undefined;
                excludedCategoryIds?: string[] | undefined;
                excludedBrandIds?: string[] | undefined;
            }>>;
            type: z.ZodLiteral<"FIXED_OFF">;
            value: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            value: number;
            type: "FIXED_OFF";
            selector?: {
                productIds: string[];
                variantIds: string[];
                categoryIds: string[];
                brandIds: string[];
                excludedProductIds: string[];
                excludedVariantIds: string[];
                excludedCategoryIds: string[];
                excludedBrandIds: string[];
            } | undefined;
            maxDiscount?: number | undefined;
        }, {
            value: number;
            type: "FIXED_OFF";
            selector?: {
                productIds?: string[] | undefined;
                variantIds?: string[] | undefined;
                categoryIds?: string[] | undefined;
                brandIds?: string[] | undefined;
                excludedProductIds?: string[] | undefined;
                excludedVariantIds?: string[] | undefined;
                excludedCategoryIds?: string[] | undefined;
                excludedBrandIds?: string[] | undefined;
            } | undefined;
            maxDiscount?: number | undefined;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"PRICE_OVERRIDE">;
            price: z.ZodNumber;
            selector: z.ZodOptional<z.ZodObject<{
                productIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                variantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                categoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                brandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                excludedProductIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                excludedVariantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                excludedCategoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                excludedBrandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            }, "strip", z.ZodTypeAny, {
                productIds: string[];
                variantIds: string[];
                categoryIds: string[];
                brandIds: string[];
                excludedProductIds: string[];
                excludedVariantIds: string[];
                excludedCategoryIds: string[];
                excludedBrandIds: string[];
            }, {
                productIds?: string[] | undefined;
                variantIds?: string[] | undefined;
                categoryIds?: string[] | undefined;
                brandIds?: string[] | undefined;
                excludedProductIds?: string[] | undefined;
                excludedVariantIds?: string[] | undefined;
                excludedCategoryIds?: string[] | undefined;
                excludedBrandIds?: string[] | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            type: "PRICE_OVERRIDE";
            price: number;
            selector?: {
                productIds: string[];
                variantIds: string[];
                categoryIds: string[];
                brandIds: string[];
                excludedProductIds: string[];
                excludedVariantIds: string[];
                excludedCategoryIds: string[];
                excludedBrandIds: string[];
            } | undefined;
        }, {
            type: "PRICE_OVERRIDE";
            price: number;
            selector?: {
                productIds?: string[] | undefined;
                variantIds?: string[] | undefined;
                categoryIds?: string[] | undefined;
                brandIds?: string[] | undefined;
                excludedProductIds?: string[] | undefined;
                excludedVariantIds?: string[] | undefined;
                excludedCategoryIds?: string[] | undefined;
                excludedBrandIds?: string[] | undefined;
            } | undefined;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"CHEAPEST_FREE">;
            quantity: z.ZodDefault<z.ZodNumber>;
            selector: z.ZodOptional<z.ZodObject<{
                productIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                variantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                categoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                brandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                excludedProductIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                excludedVariantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                excludedCategoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                excludedBrandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            }, "strip", z.ZodTypeAny, {
                productIds: string[];
                variantIds: string[];
                categoryIds: string[];
                brandIds: string[];
                excludedProductIds: string[];
                excludedVariantIds: string[];
                excludedCategoryIds: string[];
                excludedBrandIds: string[];
            }, {
                productIds?: string[] | undefined;
                variantIds?: string[] | undefined;
                categoryIds?: string[] | undefined;
                brandIds?: string[] | undefined;
                excludedProductIds?: string[] | undefined;
                excludedVariantIds?: string[] | undefined;
                excludedCategoryIds?: string[] | undefined;
                excludedBrandIds?: string[] | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            type: "CHEAPEST_FREE";
            quantity: number;
            selector?: {
                productIds: string[];
                variantIds: string[];
                categoryIds: string[];
                brandIds: string[];
                excludedProductIds: string[];
                excludedVariantIds: string[];
                excludedCategoryIds: string[];
                excludedBrandIds: string[];
            } | undefined;
        }, {
            type: "CHEAPEST_FREE";
            quantity?: number | undefined;
            selector?: {
                productIds?: string[] | undefined;
                variantIds?: string[] | undefined;
                categoryIds?: string[] | undefined;
                brandIds?: string[] | undefined;
                excludedProductIds?: string[] | undefined;
                excludedVariantIds?: string[] | undefined;
                excludedCategoryIds?: string[] | undefined;
                excludedBrandIds?: string[] | undefined;
            } | undefined;
        }>, z.ZodObject<{
            maxDiscount: z.ZodOptional<z.ZodNumber>;
            selector: z.ZodOptional<z.ZodObject<{
                productIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                variantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                categoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                brandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                excludedProductIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                excludedVariantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                excludedCategoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                excludedBrandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            }, "strip", z.ZodTypeAny, {
                productIds: string[];
                variantIds: string[];
                categoryIds: string[];
                brandIds: string[];
                excludedProductIds: string[];
                excludedVariantIds: string[];
                excludedCategoryIds: string[];
                excludedBrandIds: string[];
            }, {
                productIds?: string[] | undefined;
                variantIds?: string[] | undefined;
                categoryIds?: string[] | undefined;
                brandIds?: string[] | undefined;
                excludedProductIds?: string[] | undefined;
                excludedVariantIds?: string[] | undefined;
                excludedCategoryIds?: string[] | undefined;
                excludedBrandIds?: string[] | undefined;
            }>>;
            type: z.ZodLiteral<"ITEM_PERCENT_OFF">;
            value: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            value: number;
            type: "ITEM_PERCENT_OFF";
            selector?: {
                productIds: string[];
                variantIds: string[];
                categoryIds: string[];
                brandIds: string[];
                excludedProductIds: string[];
                excludedVariantIds: string[];
                excludedCategoryIds: string[];
                excludedBrandIds: string[];
            } | undefined;
            maxDiscount?: number | undefined;
        }, {
            value: number;
            type: "ITEM_PERCENT_OFF";
            selector?: {
                productIds?: string[] | undefined;
                variantIds?: string[] | undefined;
                categoryIds?: string[] | undefined;
                brandIds?: string[] | undefined;
                excludedProductIds?: string[] | undefined;
                excludedVariantIds?: string[] | undefined;
                excludedCategoryIds?: string[] | undefined;
                excludedBrandIds?: string[] | undefined;
            } | undefined;
            maxDiscount?: number | undefined;
        }>, z.ZodObject<{
            maxDiscount: z.ZodOptional<z.ZodNumber>;
            selector: z.ZodOptional<z.ZodObject<{
                productIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                variantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                categoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                brandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                excludedProductIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                excludedVariantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                excludedCategoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                excludedBrandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            }, "strip", z.ZodTypeAny, {
                productIds: string[];
                variantIds: string[];
                categoryIds: string[];
                brandIds: string[];
                excludedProductIds: string[];
                excludedVariantIds: string[];
                excludedCategoryIds: string[];
                excludedBrandIds: string[];
            }, {
                productIds?: string[] | undefined;
                variantIds?: string[] | undefined;
                categoryIds?: string[] | undefined;
                brandIds?: string[] | undefined;
                excludedProductIds?: string[] | undefined;
                excludedVariantIds?: string[] | undefined;
                excludedCategoryIds?: string[] | undefined;
                excludedBrandIds?: string[] | undefined;
            }>>;
            type: z.ZodLiteral<"ITEM_FIXED_OFF">;
            value: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            value: number;
            type: "ITEM_FIXED_OFF";
            selector?: {
                productIds: string[];
                variantIds: string[];
                categoryIds: string[];
                brandIds: string[];
                excludedProductIds: string[];
                excludedVariantIds: string[];
                excludedCategoryIds: string[];
                excludedBrandIds: string[];
            } | undefined;
            maxDiscount?: number | undefined;
        }, {
            value: number;
            type: "ITEM_FIXED_OFF";
            selector?: {
                productIds?: string[] | undefined;
                variantIds?: string[] | undefined;
                categoryIds?: string[] | undefined;
                brandIds?: string[] | undefined;
                excludedProductIds?: string[] | undefined;
                excludedVariantIds?: string[] | undefined;
                excludedCategoryIds?: string[] | undefined;
                excludedBrandIds?: string[] | undefined;
            } | undefined;
            maxDiscount?: number | undefined;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"FREE_SHIPPING">;
        }, "strip", z.ZodTypeAny, {
            type: "FREE_SHIPPING";
        }, {
            type: "FREE_SHIPPING";
        }>, z.ZodObject<{
            type: z.ZodLiteral<"BUY_X_GET_Y">;
            buyQuantity: z.ZodNumber;
            rewardQuantity: z.ZodDefault<z.ZodNumber>;
            rewardPercentOff: z.ZodDefault<z.ZodNumber>;
            qualifier: z.ZodOptional<z.ZodObject<{
                productIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                variantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                categoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                brandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                excludedProductIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                excludedVariantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                excludedCategoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                excludedBrandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            }, "strip", z.ZodTypeAny, {
                productIds: string[];
                variantIds: string[];
                categoryIds: string[];
                brandIds: string[];
                excludedProductIds: string[];
                excludedVariantIds: string[];
                excludedCategoryIds: string[];
                excludedBrandIds: string[];
            }, {
                productIds?: string[] | undefined;
                variantIds?: string[] | undefined;
                categoryIds?: string[] | undefined;
                brandIds?: string[] | undefined;
                excludedProductIds?: string[] | undefined;
                excludedVariantIds?: string[] | undefined;
                excludedCategoryIds?: string[] | undefined;
                excludedBrandIds?: string[] | undefined;
            }>>;
            reward: z.ZodOptional<z.ZodObject<{
                productIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                variantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                categoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                brandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                excludedProductIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                excludedVariantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                excludedCategoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                excludedBrandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            }, "strip", z.ZodTypeAny, {
                productIds: string[];
                variantIds: string[];
                categoryIds: string[];
                brandIds: string[];
                excludedProductIds: string[];
                excludedVariantIds: string[];
                excludedCategoryIds: string[];
                excludedBrandIds: string[];
            }, {
                productIds?: string[] | undefined;
                variantIds?: string[] | undefined;
                categoryIds?: string[] | undefined;
                brandIds?: string[] | undefined;
                excludedProductIds?: string[] | undefined;
                excludedVariantIds?: string[] | undefined;
                excludedCategoryIds?: string[] | undefined;
                excludedBrandIds?: string[] | undefined;
            }>>;
            strategy: z.ZodDefault<z.ZodEnum<["CHEAPEST", "HIGHEST"]>>;
        }, "strip", z.ZodTypeAny, {
            type: "BUY_X_GET_Y";
            buyQuantity: number;
            rewardQuantity: number;
            rewardPercentOff: number;
            strategy: "CHEAPEST" | "HIGHEST";
            qualifier?: {
                productIds: string[];
                variantIds: string[];
                categoryIds: string[];
                brandIds: string[];
                excludedProductIds: string[];
                excludedVariantIds: string[];
                excludedCategoryIds: string[];
                excludedBrandIds: string[];
            } | undefined;
            reward?: {
                productIds: string[];
                variantIds: string[];
                categoryIds: string[];
                brandIds: string[];
                excludedProductIds: string[];
                excludedVariantIds: string[];
                excludedCategoryIds: string[];
                excludedBrandIds: string[];
            } | undefined;
        }, {
            type: "BUY_X_GET_Y";
            buyQuantity: number;
            rewardQuantity?: number | undefined;
            rewardPercentOff?: number | undefined;
            qualifier?: {
                productIds?: string[] | undefined;
                variantIds?: string[] | undefined;
                categoryIds?: string[] | undefined;
                brandIds?: string[] | undefined;
                excludedProductIds?: string[] | undefined;
                excludedVariantIds?: string[] | undefined;
                excludedCategoryIds?: string[] | undefined;
                excludedBrandIds?: string[] | undefined;
            } | undefined;
            reward?: {
                productIds?: string[] | undefined;
                variantIds?: string[] | undefined;
                categoryIds?: string[] | undefined;
                brandIds?: string[] | undefined;
                excludedProductIds?: string[] | undefined;
                excludedVariantIds?: string[] | undefined;
                excludedCategoryIds?: string[] | undefined;
                excludedBrandIds?: string[] | undefined;
            } | undefined;
            strategy?: "CHEAPEST" | "HIGHEST" | undefined;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"BUNDLE_PRICE">;
            price: z.ZodNumber;
            items: z.ZodArray<z.ZodObject<{
                variantId: z.ZodOptional<z.ZodString>;
                productId: z.ZodOptional<z.ZodString>;
                quantity: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                quantity: number;
                variantId?: string | undefined;
                productId?: string | undefined;
            }, {
                quantity: number;
                variantId?: string | undefined;
                productId?: string | undefined;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            type: "BUNDLE_PRICE";
            items: {
                quantity: number;
                variantId?: string | undefined;
                productId?: string | undefined;
            }[];
            price: number;
        }, {
            type: "BUNDLE_PRICE";
            items: {
                quantity: number;
                variantId?: string | undefined;
                productId?: string | undefined;
            }[];
            price: number;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"QUANTITY_TIERS">;
            tiers: z.ZodArray<z.ZodObject<{
                threshold: z.ZodNumber;
            } & {
                value: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                value: number;
                threshold: number;
            }, {
                value: number;
                threshold: number;
            }>, "many">;
            selector: z.ZodOptional<z.ZodObject<{
                productIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                variantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                categoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                brandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                excludedProductIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                excludedVariantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                excludedCategoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                excludedBrandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            }, "strip", z.ZodTypeAny, {
                productIds: string[];
                variantIds: string[];
                categoryIds: string[];
                brandIds: string[];
                excludedProductIds: string[];
                excludedVariantIds: string[];
                excludedCategoryIds: string[];
                excludedBrandIds: string[];
            }, {
                productIds?: string[] | undefined;
                variantIds?: string[] | undefined;
                categoryIds?: string[] | undefined;
                brandIds?: string[] | undefined;
                excludedProductIds?: string[] | undefined;
                excludedVariantIds?: string[] | undefined;
                excludedCategoryIds?: string[] | undefined;
                excludedBrandIds?: string[] | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            type: "QUANTITY_TIERS";
            tiers: {
                value: number;
                threshold: number;
            }[];
            selector?: {
                productIds: string[];
                variantIds: string[];
                categoryIds: string[];
                brandIds: string[];
                excludedProductIds: string[];
                excludedVariantIds: string[];
                excludedCategoryIds: string[];
                excludedBrandIds: string[];
            } | undefined;
        }, {
            type: "QUANTITY_TIERS";
            tiers: {
                value: number;
                threshold: number;
            }[];
            selector?: {
                productIds?: string[] | undefined;
                variantIds?: string[] | undefined;
                categoryIds?: string[] | undefined;
                brandIds?: string[] | undefined;
                excludedProductIds?: string[] | undefined;
                excludedVariantIds?: string[] | undefined;
                excludedCategoryIds?: string[] | undefined;
                excludedBrandIds?: string[] | undefined;
            } | undefined;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"SPEND_TIERS">;
            tiers: z.ZodArray<z.ZodObject<{
                threshold: z.ZodNumber;
            } & {
                value: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                value: number;
                threshold: number;
            }, {
                value: number;
                threshold: number;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            type: "SPEND_TIERS";
            tiers: {
                value: number;
                threshold: number;
            }[];
        }, {
            type: "SPEND_TIERS";
            tiers: {
                value: number;
                threshold: number;
            }[];
        }>, z.ZodObject<{
            type: z.ZodLiteral<"FREE_GIFT">;
            variantIds: z.ZodArray<z.ZodString, "many">;
            quantity: z.ZodDefault<z.ZodNumber>;
            customerChooses: z.ZodDefault<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            type: "FREE_GIFT";
            quantity: number;
            variantIds: string[];
            customerChooses: boolean;
        }, {
            type: "FREE_GIFT";
            variantIds: string[];
            quantity?: number | undefined;
            customerChooses?: boolean | undefined;
        }>]>, "many">;
        targets: z.ZodDefault<z.ZodObject<{
            productIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            variantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            categoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            brandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedProductIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedVariantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedCategoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedBrandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        } & {
            customerIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
            customerIds: string[];
        }, {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
            customerIds?: string[] | undefined;
        }>>;
        limits: z.ZodDefault<z.ZodObject<{
            totalUses: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
            usesPerCustomer: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
            discountedUnits: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
            maximumTotalDiscount: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
        }, "strip", z.ZodTypeAny, {
            totalUses: number | null;
            usesPerCustomer: number | null;
            discountedUnits: number | null;
            maximumTotalDiscount: number | null;
        }, {
            totalUses?: number | null | undefined;
            usesPerCustomer?: number | null | undefined;
            discountedUnits?: number | null | undefined;
            maximumTotalDiscount?: number | null | undefined;
        }>>;
        display: z.ZodDefault<z.ZodObject<{
            badgeText: z.ZodDefault<z.ZodNullable<z.ZodString>>;
            showCountdown: z.ZodDefault<z.ZodBoolean>;
            showOnOffers: z.ZodDefault<z.ZodBoolean>;
            featured: z.ZodDefault<z.ZodBoolean>;
            bannerImageKey: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
            featured: boolean;
            badgeText: string | null;
            showCountdown: boolean;
            showOnOffers: boolean;
            bannerImageKey: string | null;
        }, {
            featured?: boolean | undefined;
            badgeText?: string | null | undefined;
            showCountdown?: boolean | undefined;
            showOnOffers?: boolean | undefined;
            bannerImageKey?: string | null | undefined;
        }>>;
        coupon: z.ZodOptional<z.ZodObject<{
            codes: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            generateCount: z.ZodDefault<z.ZodNumber>;
            prefix: z.ZodDefault<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            codes: string[];
            generateCount: number;
            prefix: string;
        }, {
            codes?: string[] | undefined;
            generateCount?: number | undefined;
            prefix?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        type: "FREE_SHIPPING" | "PRODUCT_DISCOUNT" | "CART_DISCOUNT" | "BUY_X_GET_Y" | "BUNDLE" | "QUANTITY_TIER" | "SPEND_TIER" | "FREE_GIFT" | "FLASH_SALE";
        name: string;
        customerTitle: string;
        trigger: "AUTOMATIC" | "CODE";
        state: "ACTIVE" | "DRAFT" | "PAUSED" | "ARCHIVED";
        priority: number;
        stacking: "EXCLUSIVE" | "COMBINABLE" | "BEST_OFFER";
        combinableWith: ("FREE_SHIPPING" | "PRODUCT_DISCOUNT" | "CART_DISCOUNT" | "BUY_X_GET_Y" | "BUNDLE" | "QUANTITY_TIER" | "SPEND_TIER" | "FREE_GIFT" | "FLASH_SALE")[];
        startsAt: string | null;
        endsAt: string | null;
        timezone: string;
        conditions: ({
            value: number;
            type: "QUANTITY";
            operator: "GT" | "GTE" | "LT" | "LTE" | "EQ";
            selector?: {
                productIds: string[];
                variantIds: string[];
                categoryIds: string[];
                brandIds: string[];
                excludedProductIds: string[];
                excludedVariantIds: string[];
                excludedCategoryIds: string[];
                excludedBrandIds: string[];
            } | undefined;
        } | {
            value: number;
            type: "SUBTOTAL";
            operator: "GT" | "GTE" | "LT" | "LTE" | "EQ";
        } | {
            type: "HAS_ITEMS";
            selector: {
                productIds: string[];
                variantIds: string[];
                categoryIds: string[];
                brandIds: string[];
                excludedProductIds: string[];
                excludedVariantIds: string[];
                excludedCategoryIds: string[];
                excludedBrandIds: string[];
            };
        } | {
            type: "MISSING_ITEMS";
            selector: {
                productIds: string[];
                variantIds: string[];
                categoryIds: string[];
                brandIds: string[];
                excludedProductIds: string[];
                excludedVariantIds: string[];
                excludedCategoryIds: string[];
                excludedBrandIds: string[];
            };
        } | {
            value: "EVERYONE" | "AUTHENTICATED" | "GUEST" | "FIRST_ORDER" | "RETURNING" | "VIP";
            type: "CUSTOMER_TYPE";
        } | {
            type: "CUSTOMER";
            customerIds: string[];
        } | {
            value: number;
            type: "PAST_ORDER_COUNT";
            operator: "GT" | "GTE" | "LT" | "LTE" | "EQ";
        } | {
            value: number;
            type: "LIFETIME_SPEND";
            operator: "GT" | "GTE" | "LT" | "LTE" | "EQ";
        } | {
            value: number;
            type: "INACTIVE_DAYS";
            operator: "GT" | "GTE" | "LT" | "LTE" | "EQ";
        } | {
            type: "COUPON_ENTERED";
            code?: string | undefined;
        } | {
            values: string[];
            type: "PAYMENT_METHOD";
        } | {
            values: string[];
            type: "GOVERNORATE";
        })[];
        actions: ({
            value: number;
            type: "PERCENT_OFF";
            selector?: {
                productIds: string[];
                variantIds: string[];
                categoryIds: string[];
                brandIds: string[];
                excludedProductIds: string[];
                excludedVariantIds: string[];
                excludedCategoryIds: string[];
                excludedBrandIds: string[];
            } | undefined;
            maxDiscount?: number | undefined;
        } | {
            value: number;
            type: "FIXED_OFF";
            selector?: {
                productIds: string[];
                variantIds: string[];
                categoryIds: string[];
                brandIds: string[];
                excludedProductIds: string[];
                excludedVariantIds: string[];
                excludedCategoryIds: string[];
                excludedBrandIds: string[];
            } | undefined;
            maxDiscount?: number | undefined;
        } | {
            type: "PRICE_OVERRIDE";
            price: number;
            selector?: {
                productIds: string[];
                variantIds: string[];
                categoryIds: string[];
                brandIds: string[];
                excludedProductIds: string[];
                excludedVariantIds: string[];
                excludedCategoryIds: string[];
                excludedBrandIds: string[];
            } | undefined;
        } | {
            type: "CHEAPEST_FREE";
            quantity: number;
            selector?: {
                productIds: string[];
                variantIds: string[];
                categoryIds: string[];
                brandIds: string[];
                excludedProductIds: string[];
                excludedVariantIds: string[];
                excludedCategoryIds: string[];
                excludedBrandIds: string[];
            } | undefined;
        } | {
            value: number;
            type: "ITEM_PERCENT_OFF";
            selector?: {
                productIds: string[];
                variantIds: string[];
                categoryIds: string[];
                brandIds: string[];
                excludedProductIds: string[];
                excludedVariantIds: string[];
                excludedCategoryIds: string[];
                excludedBrandIds: string[];
            } | undefined;
            maxDiscount?: number | undefined;
        } | {
            value: number;
            type: "ITEM_FIXED_OFF";
            selector?: {
                productIds: string[];
                variantIds: string[];
                categoryIds: string[];
                brandIds: string[];
                excludedProductIds: string[];
                excludedVariantIds: string[];
                excludedCategoryIds: string[];
                excludedBrandIds: string[];
            } | undefined;
            maxDiscount?: number | undefined;
        } | {
            type: "FREE_SHIPPING";
        } | {
            type: "BUY_X_GET_Y";
            buyQuantity: number;
            rewardQuantity: number;
            rewardPercentOff: number;
            strategy: "CHEAPEST" | "HIGHEST";
            qualifier?: {
                productIds: string[];
                variantIds: string[];
                categoryIds: string[];
                brandIds: string[];
                excludedProductIds: string[];
                excludedVariantIds: string[];
                excludedCategoryIds: string[];
                excludedBrandIds: string[];
            } | undefined;
            reward?: {
                productIds: string[];
                variantIds: string[];
                categoryIds: string[];
                brandIds: string[];
                excludedProductIds: string[];
                excludedVariantIds: string[];
                excludedCategoryIds: string[];
                excludedBrandIds: string[];
            } | undefined;
        } | {
            type: "BUNDLE_PRICE";
            items: {
                quantity: number;
                variantId?: string | undefined;
                productId?: string | undefined;
            }[];
            price: number;
        } | {
            type: "QUANTITY_TIERS";
            tiers: {
                value: number;
                threshold: number;
            }[];
            selector?: {
                productIds: string[];
                variantIds: string[];
                categoryIds: string[];
                brandIds: string[];
                excludedProductIds: string[];
                excludedVariantIds: string[];
                excludedCategoryIds: string[];
                excludedBrandIds: string[];
            } | undefined;
        } | {
            type: "SPEND_TIERS";
            tiers: {
                value: number;
                threshold: number;
            }[];
        } | {
            type: "FREE_GIFT";
            quantity: number;
            variantIds: string[];
            customerChooses: boolean;
        })[];
        targets: {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
            customerIds: string[];
        };
        limits: {
            totalUses: number | null;
            usesPerCustomer: number | null;
            discountedUnits: number | null;
            maximumTotalDiscount: number | null;
        };
        display: {
            featured: boolean;
            badgeText: string | null;
            showCountdown: boolean;
            showOnOffers: boolean;
            bannerImageKey: string | null;
        };
        internalDescription?: string | null | undefined;
        customerDescription?: string | null | undefined;
        coupon?: {
            codes: string[];
            generateCount: number;
            prefix: string;
        } | undefined;
    }, {
        type: "FREE_SHIPPING" | "PRODUCT_DISCOUNT" | "CART_DISCOUNT" | "BUY_X_GET_Y" | "BUNDLE" | "QUANTITY_TIER" | "SPEND_TIER" | "FREE_GIFT" | "FLASH_SALE";
        name: string;
        customerTitle: string;
        actions: ({
            value: number;
            type: "PERCENT_OFF";
            selector?: {
                productIds?: string[] | undefined;
                variantIds?: string[] | undefined;
                categoryIds?: string[] | undefined;
                brandIds?: string[] | undefined;
                excludedProductIds?: string[] | undefined;
                excludedVariantIds?: string[] | undefined;
                excludedCategoryIds?: string[] | undefined;
                excludedBrandIds?: string[] | undefined;
            } | undefined;
            maxDiscount?: number | undefined;
        } | {
            value: number;
            type: "FIXED_OFF";
            selector?: {
                productIds?: string[] | undefined;
                variantIds?: string[] | undefined;
                categoryIds?: string[] | undefined;
                brandIds?: string[] | undefined;
                excludedProductIds?: string[] | undefined;
                excludedVariantIds?: string[] | undefined;
                excludedCategoryIds?: string[] | undefined;
                excludedBrandIds?: string[] | undefined;
            } | undefined;
            maxDiscount?: number | undefined;
        } | {
            type: "PRICE_OVERRIDE";
            price: number;
            selector?: {
                productIds?: string[] | undefined;
                variantIds?: string[] | undefined;
                categoryIds?: string[] | undefined;
                brandIds?: string[] | undefined;
                excludedProductIds?: string[] | undefined;
                excludedVariantIds?: string[] | undefined;
                excludedCategoryIds?: string[] | undefined;
                excludedBrandIds?: string[] | undefined;
            } | undefined;
        } | {
            type: "CHEAPEST_FREE";
            quantity?: number | undefined;
            selector?: {
                productIds?: string[] | undefined;
                variantIds?: string[] | undefined;
                categoryIds?: string[] | undefined;
                brandIds?: string[] | undefined;
                excludedProductIds?: string[] | undefined;
                excludedVariantIds?: string[] | undefined;
                excludedCategoryIds?: string[] | undefined;
                excludedBrandIds?: string[] | undefined;
            } | undefined;
        } | {
            value: number;
            type: "ITEM_PERCENT_OFF";
            selector?: {
                productIds?: string[] | undefined;
                variantIds?: string[] | undefined;
                categoryIds?: string[] | undefined;
                brandIds?: string[] | undefined;
                excludedProductIds?: string[] | undefined;
                excludedVariantIds?: string[] | undefined;
                excludedCategoryIds?: string[] | undefined;
                excludedBrandIds?: string[] | undefined;
            } | undefined;
            maxDiscount?: number | undefined;
        } | {
            value: number;
            type: "ITEM_FIXED_OFF";
            selector?: {
                productIds?: string[] | undefined;
                variantIds?: string[] | undefined;
                categoryIds?: string[] | undefined;
                brandIds?: string[] | undefined;
                excludedProductIds?: string[] | undefined;
                excludedVariantIds?: string[] | undefined;
                excludedCategoryIds?: string[] | undefined;
                excludedBrandIds?: string[] | undefined;
            } | undefined;
            maxDiscount?: number | undefined;
        } | {
            type: "FREE_SHIPPING";
        } | {
            type: "BUY_X_GET_Y";
            buyQuantity: number;
            rewardQuantity?: number | undefined;
            rewardPercentOff?: number | undefined;
            qualifier?: {
                productIds?: string[] | undefined;
                variantIds?: string[] | undefined;
                categoryIds?: string[] | undefined;
                brandIds?: string[] | undefined;
                excludedProductIds?: string[] | undefined;
                excludedVariantIds?: string[] | undefined;
                excludedCategoryIds?: string[] | undefined;
                excludedBrandIds?: string[] | undefined;
            } | undefined;
            reward?: {
                productIds?: string[] | undefined;
                variantIds?: string[] | undefined;
                categoryIds?: string[] | undefined;
                brandIds?: string[] | undefined;
                excludedProductIds?: string[] | undefined;
                excludedVariantIds?: string[] | undefined;
                excludedCategoryIds?: string[] | undefined;
                excludedBrandIds?: string[] | undefined;
            } | undefined;
            strategy?: "CHEAPEST" | "HIGHEST" | undefined;
        } | {
            type: "BUNDLE_PRICE";
            items: {
                quantity: number;
                variantId?: string | undefined;
                productId?: string | undefined;
            }[];
            price: number;
        } | {
            type: "QUANTITY_TIERS";
            tiers: {
                value: number;
                threshold: number;
            }[];
            selector?: {
                productIds?: string[] | undefined;
                variantIds?: string[] | undefined;
                categoryIds?: string[] | undefined;
                brandIds?: string[] | undefined;
                excludedProductIds?: string[] | undefined;
                excludedVariantIds?: string[] | undefined;
                excludedCategoryIds?: string[] | undefined;
                excludedBrandIds?: string[] | undefined;
            } | undefined;
        } | {
            type: "SPEND_TIERS";
            tiers: {
                value: number;
                threshold: number;
            }[];
        } | {
            type: "FREE_GIFT";
            variantIds: string[];
            quantity?: number | undefined;
            customerChooses?: boolean | undefined;
        })[];
        internalDescription?: string | null | undefined;
        customerDescription?: string | null | undefined;
        trigger?: "AUTOMATIC" | "CODE" | undefined;
        state?: "ACTIVE" | "DRAFT" | "PAUSED" | "ARCHIVED" | undefined;
        priority?: number | undefined;
        stacking?: "EXCLUSIVE" | "COMBINABLE" | "BEST_OFFER" | undefined;
        combinableWith?: ("FREE_SHIPPING" | "PRODUCT_DISCOUNT" | "CART_DISCOUNT" | "BUY_X_GET_Y" | "BUNDLE" | "QUANTITY_TIER" | "SPEND_TIER" | "FREE_GIFT" | "FLASH_SALE")[] | undefined;
        startsAt?: string | null | undefined;
        endsAt?: string | null | undefined;
        timezone?: string | undefined;
        conditions?: ({
            value: number;
            type: "QUANTITY";
            operator?: "GT" | "GTE" | "LT" | "LTE" | "EQ" | undefined;
            selector?: {
                productIds?: string[] | undefined;
                variantIds?: string[] | undefined;
                categoryIds?: string[] | undefined;
                brandIds?: string[] | undefined;
                excludedProductIds?: string[] | undefined;
                excludedVariantIds?: string[] | undefined;
                excludedCategoryIds?: string[] | undefined;
                excludedBrandIds?: string[] | undefined;
            } | undefined;
        } | {
            value: number;
            type: "SUBTOTAL";
            operator?: "GT" | "GTE" | "LT" | "LTE" | "EQ" | undefined;
        } | {
            type: "HAS_ITEMS";
            selector: {
                productIds?: string[] | undefined;
                variantIds?: string[] | undefined;
                categoryIds?: string[] | undefined;
                brandIds?: string[] | undefined;
                excludedProductIds?: string[] | undefined;
                excludedVariantIds?: string[] | undefined;
                excludedCategoryIds?: string[] | undefined;
                excludedBrandIds?: string[] | undefined;
            };
        } | {
            type: "MISSING_ITEMS";
            selector: {
                productIds?: string[] | undefined;
                variantIds?: string[] | undefined;
                categoryIds?: string[] | undefined;
                brandIds?: string[] | undefined;
                excludedProductIds?: string[] | undefined;
                excludedVariantIds?: string[] | undefined;
                excludedCategoryIds?: string[] | undefined;
                excludedBrandIds?: string[] | undefined;
            };
        } | {
            value: "EVERYONE" | "AUTHENTICATED" | "GUEST" | "FIRST_ORDER" | "RETURNING" | "VIP";
            type: "CUSTOMER_TYPE";
        } | {
            type: "CUSTOMER";
            customerIds: string[];
        } | {
            value: number;
            type: "PAST_ORDER_COUNT";
            operator?: "GT" | "GTE" | "LT" | "LTE" | "EQ" | undefined;
        } | {
            value: number;
            type: "LIFETIME_SPEND";
            operator?: "GT" | "GTE" | "LT" | "LTE" | "EQ" | undefined;
        } | {
            value: number;
            type: "INACTIVE_DAYS";
            operator?: "GT" | "GTE" | "LT" | "LTE" | "EQ" | undefined;
        } | {
            type: "COUPON_ENTERED";
            code?: string | undefined;
        } | {
            values: string[];
            type: "PAYMENT_METHOD";
        } | {
            values: string[];
            type: "GOVERNORATE";
        })[] | undefined;
        targets?: {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
            customerIds?: string[] | undefined;
        } | undefined;
        limits?: {
            totalUses?: number | null | undefined;
            usesPerCustomer?: number | null | undefined;
            discountedUnits?: number | null | undefined;
            maximumTotalDiscount?: number | null | undefined;
        } | undefined;
        display?: {
            featured?: boolean | undefined;
            badgeText?: string | null | undefined;
            showCountdown?: boolean | undefined;
            showOnOffers?: boolean | undefined;
            bannerImageKey?: string | null | undefined;
        } | undefined;
        coupon?: {
            codes?: string[] | undefined;
            generateCount?: number | undefined;
            prefix?: string | undefined;
        } | undefined;
    }>>;
    customerId: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    couponCode: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    shippingCost: z.ZodDefault<z.ZodNumber>;
    governorate: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    paymentMethod: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    lines: z.ZodArray<z.ZodObject<{
        variantId: z.ZodString;
        productId: z.ZodString;
        categoryId: z.ZodString;
        brandId: z.ZodNullable<z.ZodString>;
        name: z.ZodString;
        unitPrice: z.ZodNumber;
        quantity: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        name: string;
        variantId: string;
        quantity: number;
        productId: string;
        categoryId: string;
        brandId: string | null;
        unitPrice: number;
    }, {
        name: string;
        variantId: string;
        quantity: number;
        productId: string;
        categoryId: string;
        brandId: string | null;
        unitPrice: number;
    }>, "many">;
    diagnostic: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    governorate: string | null;
    paymentMethod: string | null;
    shippingCost: number;
    couponCode: string | null;
    customerId: string | null;
    lines: {
        name: string;
        variantId: string;
        quantity: number;
        productId: string;
        categoryId: string;
        brandId: string | null;
        unitPrice: number;
    }[];
    diagnostic: boolean;
    promotion?: {
        type: "FREE_SHIPPING" | "PRODUCT_DISCOUNT" | "CART_DISCOUNT" | "BUY_X_GET_Y" | "BUNDLE" | "QUANTITY_TIER" | "SPEND_TIER" | "FREE_GIFT" | "FLASH_SALE";
        name: string;
        customerTitle: string;
        trigger: "AUTOMATIC" | "CODE";
        state: "ACTIVE" | "DRAFT" | "PAUSED" | "ARCHIVED";
        priority: number;
        stacking: "EXCLUSIVE" | "COMBINABLE" | "BEST_OFFER";
        combinableWith: ("FREE_SHIPPING" | "PRODUCT_DISCOUNT" | "CART_DISCOUNT" | "BUY_X_GET_Y" | "BUNDLE" | "QUANTITY_TIER" | "SPEND_TIER" | "FREE_GIFT" | "FLASH_SALE")[];
        startsAt: string | null;
        endsAt: string | null;
        timezone: string;
        conditions: ({
            value: number;
            type: "QUANTITY";
            operator: "GT" | "GTE" | "LT" | "LTE" | "EQ";
            selector?: {
                productIds: string[];
                variantIds: string[];
                categoryIds: string[];
                brandIds: string[];
                excludedProductIds: string[];
                excludedVariantIds: string[];
                excludedCategoryIds: string[];
                excludedBrandIds: string[];
            } | undefined;
        } | {
            value: number;
            type: "SUBTOTAL";
            operator: "GT" | "GTE" | "LT" | "LTE" | "EQ";
        } | {
            type: "HAS_ITEMS";
            selector: {
                productIds: string[];
                variantIds: string[];
                categoryIds: string[];
                brandIds: string[];
                excludedProductIds: string[];
                excludedVariantIds: string[];
                excludedCategoryIds: string[];
                excludedBrandIds: string[];
            };
        } | {
            type: "MISSING_ITEMS";
            selector: {
                productIds: string[];
                variantIds: string[];
                categoryIds: string[];
                brandIds: string[];
                excludedProductIds: string[];
                excludedVariantIds: string[];
                excludedCategoryIds: string[];
                excludedBrandIds: string[];
            };
        } | {
            value: "EVERYONE" | "AUTHENTICATED" | "GUEST" | "FIRST_ORDER" | "RETURNING" | "VIP";
            type: "CUSTOMER_TYPE";
        } | {
            type: "CUSTOMER";
            customerIds: string[];
        } | {
            value: number;
            type: "PAST_ORDER_COUNT";
            operator: "GT" | "GTE" | "LT" | "LTE" | "EQ";
        } | {
            value: number;
            type: "LIFETIME_SPEND";
            operator: "GT" | "GTE" | "LT" | "LTE" | "EQ";
        } | {
            value: number;
            type: "INACTIVE_DAYS";
            operator: "GT" | "GTE" | "LT" | "LTE" | "EQ";
        } | {
            type: "COUPON_ENTERED";
            code?: string | undefined;
        } | {
            values: string[];
            type: "PAYMENT_METHOD";
        } | {
            values: string[];
            type: "GOVERNORATE";
        })[];
        actions: ({
            value: number;
            type: "PERCENT_OFF";
            selector?: {
                productIds: string[];
                variantIds: string[];
                categoryIds: string[];
                brandIds: string[];
                excludedProductIds: string[];
                excludedVariantIds: string[];
                excludedCategoryIds: string[];
                excludedBrandIds: string[];
            } | undefined;
            maxDiscount?: number | undefined;
        } | {
            value: number;
            type: "FIXED_OFF";
            selector?: {
                productIds: string[];
                variantIds: string[];
                categoryIds: string[];
                brandIds: string[];
                excludedProductIds: string[];
                excludedVariantIds: string[];
                excludedCategoryIds: string[];
                excludedBrandIds: string[];
            } | undefined;
            maxDiscount?: number | undefined;
        } | {
            type: "PRICE_OVERRIDE";
            price: number;
            selector?: {
                productIds: string[];
                variantIds: string[];
                categoryIds: string[];
                brandIds: string[];
                excludedProductIds: string[];
                excludedVariantIds: string[];
                excludedCategoryIds: string[];
                excludedBrandIds: string[];
            } | undefined;
        } | {
            type: "CHEAPEST_FREE";
            quantity: number;
            selector?: {
                productIds: string[];
                variantIds: string[];
                categoryIds: string[];
                brandIds: string[];
                excludedProductIds: string[];
                excludedVariantIds: string[];
                excludedCategoryIds: string[];
                excludedBrandIds: string[];
            } | undefined;
        } | {
            value: number;
            type: "ITEM_PERCENT_OFF";
            selector?: {
                productIds: string[];
                variantIds: string[];
                categoryIds: string[];
                brandIds: string[];
                excludedProductIds: string[];
                excludedVariantIds: string[];
                excludedCategoryIds: string[];
                excludedBrandIds: string[];
            } | undefined;
            maxDiscount?: number | undefined;
        } | {
            value: number;
            type: "ITEM_FIXED_OFF";
            selector?: {
                productIds: string[];
                variantIds: string[];
                categoryIds: string[];
                brandIds: string[];
                excludedProductIds: string[];
                excludedVariantIds: string[];
                excludedCategoryIds: string[];
                excludedBrandIds: string[];
            } | undefined;
            maxDiscount?: number | undefined;
        } | {
            type: "FREE_SHIPPING";
        } | {
            type: "BUY_X_GET_Y";
            buyQuantity: number;
            rewardQuantity: number;
            rewardPercentOff: number;
            strategy: "CHEAPEST" | "HIGHEST";
            qualifier?: {
                productIds: string[];
                variantIds: string[];
                categoryIds: string[];
                brandIds: string[];
                excludedProductIds: string[];
                excludedVariantIds: string[];
                excludedCategoryIds: string[];
                excludedBrandIds: string[];
            } | undefined;
            reward?: {
                productIds: string[];
                variantIds: string[];
                categoryIds: string[];
                brandIds: string[];
                excludedProductIds: string[];
                excludedVariantIds: string[];
                excludedCategoryIds: string[];
                excludedBrandIds: string[];
            } | undefined;
        } | {
            type: "BUNDLE_PRICE";
            items: {
                quantity: number;
                variantId?: string | undefined;
                productId?: string | undefined;
            }[];
            price: number;
        } | {
            type: "QUANTITY_TIERS";
            tiers: {
                value: number;
                threshold: number;
            }[];
            selector?: {
                productIds: string[];
                variantIds: string[];
                categoryIds: string[];
                brandIds: string[];
                excludedProductIds: string[];
                excludedVariantIds: string[];
                excludedCategoryIds: string[];
                excludedBrandIds: string[];
            } | undefined;
        } | {
            type: "SPEND_TIERS";
            tiers: {
                value: number;
                threshold: number;
            }[];
        } | {
            type: "FREE_GIFT";
            quantity: number;
            variantIds: string[];
            customerChooses: boolean;
        })[];
        targets: {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
            customerIds: string[];
        };
        limits: {
            totalUses: number | null;
            usesPerCustomer: number | null;
            discountedUnits: number | null;
            maximumTotalDiscount: number | null;
        };
        display: {
            featured: boolean;
            badgeText: string | null;
            showCountdown: boolean;
            showOnOffers: boolean;
            bannerImageKey: string | null;
        };
        internalDescription?: string | null | undefined;
        customerDescription?: string | null | undefined;
        coupon?: {
            codes: string[];
            generateCount: number;
            prefix: string;
        } | undefined;
    } | undefined;
}, {
    lines: {
        name: string;
        variantId: string;
        quantity: number;
        productId: string;
        categoryId: string;
        brandId: string | null;
        unitPrice: number;
    }[];
    governorate?: string | null | undefined;
    paymentMethod?: string | null | undefined;
    shippingCost?: number | undefined;
    couponCode?: string | null | undefined;
    customerId?: string | null | undefined;
    promotion?: {
        type: "FREE_SHIPPING" | "PRODUCT_DISCOUNT" | "CART_DISCOUNT" | "BUY_X_GET_Y" | "BUNDLE" | "QUANTITY_TIER" | "SPEND_TIER" | "FREE_GIFT" | "FLASH_SALE";
        name: string;
        customerTitle: string;
        actions: ({
            value: number;
            type: "PERCENT_OFF";
            selector?: {
                productIds?: string[] | undefined;
                variantIds?: string[] | undefined;
                categoryIds?: string[] | undefined;
                brandIds?: string[] | undefined;
                excludedProductIds?: string[] | undefined;
                excludedVariantIds?: string[] | undefined;
                excludedCategoryIds?: string[] | undefined;
                excludedBrandIds?: string[] | undefined;
            } | undefined;
            maxDiscount?: number | undefined;
        } | {
            value: number;
            type: "FIXED_OFF";
            selector?: {
                productIds?: string[] | undefined;
                variantIds?: string[] | undefined;
                categoryIds?: string[] | undefined;
                brandIds?: string[] | undefined;
                excludedProductIds?: string[] | undefined;
                excludedVariantIds?: string[] | undefined;
                excludedCategoryIds?: string[] | undefined;
                excludedBrandIds?: string[] | undefined;
            } | undefined;
            maxDiscount?: number | undefined;
        } | {
            type: "PRICE_OVERRIDE";
            price: number;
            selector?: {
                productIds?: string[] | undefined;
                variantIds?: string[] | undefined;
                categoryIds?: string[] | undefined;
                brandIds?: string[] | undefined;
                excludedProductIds?: string[] | undefined;
                excludedVariantIds?: string[] | undefined;
                excludedCategoryIds?: string[] | undefined;
                excludedBrandIds?: string[] | undefined;
            } | undefined;
        } | {
            type: "CHEAPEST_FREE";
            quantity?: number | undefined;
            selector?: {
                productIds?: string[] | undefined;
                variantIds?: string[] | undefined;
                categoryIds?: string[] | undefined;
                brandIds?: string[] | undefined;
                excludedProductIds?: string[] | undefined;
                excludedVariantIds?: string[] | undefined;
                excludedCategoryIds?: string[] | undefined;
                excludedBrandIds?: string[] | undefined;
            } | undefined;
        } | {
            value: number;
            type: "ITEM_PERCENT_OFF";
            selector?: {
                productIds?: string[] | undefined;
                variantIds?: string[] | undefined;
                categoryIds?: string[] | undefined;
                brandIds?: string[] | undefined;
                excludedProductIds?: string[] | undefined;
                excludedVariantIds?: string[] | undefined;
                excludedCategoryIds?: string[] | undefined;
                excludedBrandIds?: string[] | undefined;
            } | undefined;
            maxDiscount?: number | undefined;
        } | {
            value: number;
            type: "ITEM_FIXED_OFF";
            selector?: {
                productIds?: string[] | undefined;
                variantIds?: string[] | undefined;
                categoryIds?: string[] | undefined;
                brandIds?: string[] | undefined;
                excludedProductIds?: string[] | undefined;
                excludedVariantIds?: string[] | undefined;
                excludedCategoryIds?: string[] | undefined;
                excludedBrandIds?: string[] | undefined;
            } | undefined;
            maxDiscount?: number | undefined;
        } | {
            type: "FREE_SHIPPING";
        } | {
            type: "BUY_X_GET_Y";
            buyQuantity: number;
            rewardQuantity?: number | undefined;
            rewardPercentOff?: number | undefined;
            qualifier?: {
                productIds?: string[] | undefined;
                variantIds?: string[] | undefined;
                categoryIds?: string[] | undefined;
                brandIds?: string[] | undefined;
                excludedProductIds?: string[] | undefined;
                excludedVariantIds?: string[] | undefined;
                excludedCategoryIds?: string[] | undefined;
                excludedBrandIds?: string[] | undefined;
            } | undefined;
            reward?: {
                productIds?: string[] | undefined;
                variantIds?: string[] | undefined;
                categoryIds?: string[] | undefined;
                brandIds?: string[] | undefined;
                excludedProductIds?: string[] | undefined;
                excludedVariantIds?: string[] | undefined;
                excludedCategoryIds?: string[] | undefined;
                excludedBrandIds?: string[] | undefined;
            } | undefined;
            strategy?: "CHEAPEST" | "HIGHEST" | undefined;
        } | {
            type: "BUNDLE_PRICE";
            items: {
                quantity: number;
                variantId?: string | undefined;
                productId?: string | undefined;
            }[];
            price: number;
        } | {
            type: "QUANTITY_TIERS";
            tiers: {
                value: number;
                threshold: number;
            }[];
            selector?: {
                productIds?: string[] | undefined;
                variantIds?: string[] | undefined;
                categoryIds?: string[] | undefined;
                brandIds?: string[] | undefined;
                excludedProductIds?: string[] | undefined;
                excludedVariantIds?: string[] | undefined;
                excludedCategoryIds?: string[] | undefined;
                excludedBrandIds?: string[] | undefined;
            } | undefined;
        } | {
            type: "SPEND_TIERS";
            tiers: {
                value: number;
                threshold: number;
            }[];
        } | {
            type: "FREE_GIFT";
            variantIds: string[];
            quantity?: number | undefined;
            customerChooses?: boolean | undefined;
        })[];
        internalDescription?: string | null | undefined;
        customerDescription?: string | null | undefined;
        trigger?: "AUTOMATIC" | "CODE" | undefined;
        state?: "ACTIVE" | "DRAFT" | "PAUSED" | "ARCHIVED" | undefined;
        priority?: number | undefined;
        stacking?: "EXCLUSIVE" | "COMBINABLE" | "BEST_OFFER" | undefined;
        combinableWith?: ("FREE_SHIPPING" | "PRODUCT_DISCOUNT" | "CART_DISCOUNT" | "BUY_X_GET_Y" | "BUNDLE" | "QUANTITY_TIER" | "SPEND_TIER" | "FREE_GIFT" | "FLASH_SALE")[] | undefined;
        startsAt?: string | null | undefined;
        endsAt?: string | null | undefined;
        timezone?: string | undefined;
        conditions?: ({
            value: number;
            type: "QUANTITY";
            operator?: "GT" | "GTE" | "LT" | "LTE" | "EQ" | undefined;
            selector?: {
                productIds?: string[] | undefined;
                variantIds?: string[] | undefined;
                categoryIds?: string[] | undefined;
                brandIds?: string[] | undefined;
                excludedProductIds?: string[] | undefined;
                excludedVariantIds?: string[] | undefined;
                excludedCategoryIds?: string[] | undefined;
                excludedBrandIds?: string[] | undefined;
            } | undefined;
        } | {
            value: number;
            type: "SUBTOTAL";
            operator?: "GT" | "GTE" | "LT" | "LTE" | "EQ" | undefined;
        } | {
            type: "HAS_ITEMS";
            selector: {
                productIds?: string[] | undefined;
                variantIds?: string[] | undefined;
                categoryIds?: string[] | undefined;
                brandIds?: string[] | undefined;
                excludedProductIds?: string[] | undefined;
                excludedVariantIds?: string[] | undefined;
                excludedCategoryIds?: string[] | undefined;
                excludedBrandIds?: string[] | undefined;
            };
        } | {
            type: "MISSING_ITEMS";
            selector: {
                productIds?: string[] | undefined;
                variantIds?: string[] | undefined;
                categoryIds?: string[] | undefined;
                brandIds?: string[] | undefined;
                excludedProductIds?: string[] | undefined;
                excludedVariantIds?: string[] | undefined;
                excludedCategoryIds?: string[] | undefined;
                excludedBrandIds?: string[] | undefined;
            };
        } | {
            value: "EVERYONE" | "AUTHENTICATED" | "GUEST" | "FIRST_ORDER" | "RETURNING" | "VIP";
            type: "CUSTOMER_TYPE";
        } | {
            type: "CUSTOMER";
            customerIds: string[];
        } | {
            value: number;
            type: "PAST_ORDER_COUNT";
            operator?: "GT" | "GTE" | "LT" | "LTE" | "EQ" | undefined;
        } | {
            value: number;
            type: "LIFETIME_SPEND";
            operator?: "GT" | "GTE" | "LT" | "LTE" | "EQ" | undefined;
        } | {
            value: number;
            type: "INACTIVE_DAYS";
            operator?: "GT" | "GTE" | "LT" | "LTE" | "EQ" | undefined;
        } | {
            type: "COUPON_ENTERED";
            code?: string | undefined;
        } | {
            values: string[];
            type: "PAYMENT_METHOD";
        } | {
            values: string[];
            type: "GOVERNORATE";
        })[] | undefined;
        targets?: {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
            customerIds?: string[] | undefined;
        } | undefined;
        limits?: {
            totalUses?: number | null | undefined;
            usesPerCustomer?: number | null | undefined;
            discountedUnits?: number | null | undefined;
            maximumTotalDiscount?: number | null | undefined;
        } | undefined;
        display?: {
            featured?: boolean | undefined;
            badgeText?: string | null | undefined;
            showCountdown?: boolean | undefined;
            showOnOffers?: boolean | undefined;
            bannerImageKey?: string | null | undefined;
        } | undefined;
        coupon?: {
            codes?: string[] | undefined;
            generateCount?: number | undefined;
            prefix?: string | undefined;
        } | undefined;
    } | undefined;
    diagnostic?: boolean | undefined;
}>;
export type PromotionPreviewInput = z.infer<typeof promotionPreviewSchema>;
export declare const couponInputSchema: z.ZodObject<{
    code: z.ZodString;
}, "strip", z.ZodTypeAny, {
    code: string;
}, {
    code: string;
}>;
export declare const appliedPromotionSchema: z.ZodObject<{
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
    couponCode: string | null;
    shippingDiscount: number;
    discountAmount: number;
    discountedUnits: number;
    title: string;
}, {
    message: string;
    type: "FREE_SHIPPING" | "PRODUCT_DISCOUNT" | "CART_DISCOUNT" | "BUY_X_GET_Y" | "BUNDLE" | "QUANTITY_TIER" | "SPEND_TIER" | "FREE_GIFT" | "FLASH_SALE";
    id: string;
    name: string;
    couponCode: string | null;
    shippingDiscount: number;
    discountAmount: number;
    discountedUnits: number;
    title: string;
}>;
export declare const promotionEvaluationSchema: z.ZodObject<{
    originalSubtotal: z.ZodNumber;
    itemDiscount: z.ZodNumber;
    shippingDiscount: z.ZodNumber;
    subtotalAfterDiscount: z.ZodNumber;
    shippingAfterDiscount: z.ZodNumber;
    total: z.ZodNumber;
    totalSavings: z.ZodNumber;
    lineDiscounts: z.ZodArray<z.ZodObject<{
        variantId: z.ZodString;
        discount: z.ZodNumber;
        discountedLineTotal: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        variantId: string;
        discount: number;
        discountedLineTotal: number;
    }, {
        variantId: string;
        discount: number;
        discountedLineTotal: number;
    }>, "many">;
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
        couponCode: string | null;
        shippingDiscount: number;
        discountAmount: number;
        discountedUnits: number;
        title: string;
    }, {
        message: string;
        type: "FREE_SHIPPING" | "PRODUCT_DISCOUNT" | "CART_DISCOUNT" | "BUY_X_GET_Y" | "BUNDLE" | "QUANTITY_TIER" | "SPEND_TIER" | "FREE_GIFT" | "FLASH_SALE";
        id: string;
        name: string;
        couponCode: string | null;
        shippingDiscount: number;
        discountAmount: number;
        discountedUnits: number;
        title: string;
    }>, "many">;
    gifts: z.ZodArray<z.ZodObject<{
        variantId: z.ZodString;
        quantity: z.ZodNumber;
        customerChooses: z.ZodBoolean;
        promotionId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        variantId: string;
        quantity: number;
        promotionId: string;
        customerChooses: boolean;
    }, {
        variantId: string;
        quantity: number;
        promotionId: string;
        customerChooses: boolean;
    }>, "many">;
    messages: z.ZodArray<z.ZodString, "many">;
    diagnostics: z.ZodOptional<z.ZodArray<z.ZodObject<{
        promotionId: z.ZodString;
        name: z.ZodString;
        eligible: z.ZodBoolean;
        reasons: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        name: string;
        promotionId: string;
        eligible: boolean;
        reasons: string[];
    }, {
        name: string;
        promotionId: string;
        eligible: boolean;
        reasons: string[];
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    total: number;
    shippingDiscount: number;
    totalSavings: number;
    appliedPromotions: {
        message: string;
        type: "FREE_SHIPPING" | "PRODUCT_DISCOUNT" | "CART_DISCOUNT" | "BUY_X_GET_Y" | "BUNDLE" | "QUANTITY_TIER" | "SPEND_TIER" | "FREE_GIFT" | "FLASH_SALE";
        id: string;
        name: string;
        couponCode: string | null;
        shippingDiscount: number;
        discountAmount: number;
        discountedUnits: number;
        title: string;
    }[];
    originalSubtotal: number;
    itemDiscount: number;
    subtotalAfterDiscount: number;
    shippingAfterDiscount: number;
    lineDiscounts: {
        variantId: string;
        discount: number;
        discountedLineTotal: number;
    }[];
    gifts: {
        variantId: string;
        quantity: number;
        promotionId: string;
        customerChooses: boolean;
    }[];
    messages: string[];
    diagnostics?: {
        name: string;
        promotionId: string;
        eligible: boolean;
        reasons: string[];
    }[] | undefined;
}, {
    total: number;
    shippingDiscount: number;
    totalSavings: number;
    appliedPromotions: {
        message: string;
        type: "FREE_SHIPPING" | "PRODUCT_DISCOUNT" | "CART_DISCOUNT" | "BUY_X_GET_Y" | "BUNDLE" | "QUANTITY_TIER" | "SPEND_TIER" | "FREE_GIFT" | "FLASH_SALE";
        id: string;
        name: string;
        couponCode: string | null;
        shippingDiscount: number;
        discountAmount: number;
        discountedUnits: number;
        title: string;
    }[];
    originalSubtotal: number;
    itemDiscount: number;
    subtotalAfterDiscount: number;
    shippingAfterDiscount: number;
    lineDiscounts: {
        variantId: string;
        discount: number;
        discountedLineTotal: number;
    }[];
    gifts: {
        variantId: string;
        quantity: number;
        promotionId: string;
        customerChooses: boolean;
    }[];
    messages: string[];
    diagnostics?: {
        name: string;
        promotionId: string;
        eligible: boolean;
        reasons: string[];
    }[] | undefined;
}>;
export type PromotionEvaluation = z.infer<typeof promotionEvaluationSchema>;
export declare const promotionResponseSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    internalDescription: z.ZodNullable<z.ZodString>;
    customerTitle: z.ZodString;
    customerDescription: z.ZodNullable<z.ZodString>;
    type: z.ZodEnum<["PRODUCT_DISCOUNT", "CART_DISCOUNT", "BUY_X_GET_Y", "BUNDLE", "QUANTITY_TIER", "SPEND_TIER", "FREE_SHIPPING", "FREE_GIFT", "FLASH_SALE"]>;
    trigger: z.ZodEnum<["AUTOMATIC", "CODE"]>;
    state: z.ZodEnum<["DRAFT", "ACTIVE", "PAUSED", "ARCHIVED"]>;
    status: z.ZodEnum<["DRAFT", "SCHEDULED", "ACTIVE", "PAUSED", "EXPIRED", "EXHAUSTED", "ARCHIVED"]>;
    priority: z.ZodNumber;
    stacking: z.ZodEnum<["EXCLUSIVE", "COMBINABLE", "BEST_OFFER"]>;
    combinableWith: z.ZodArray<z.ZodString, "many">;
    startsAt: z.ZodNullable<z.ZodString>;
    endsAt: z.ZodNullable<z.ZodString>;
    timezone: z.ZodString;
    conditions: z.ZodArray<z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
        type: z.ZodLiteral<"SUBTOTAL">;
        operator: z.ZodDefault<z.ZodEnum<["GT", "GTE", "LT", "LTE", "EQ"]>>;
        value: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        value: number;
        type: "SUBTOTAL";
        operator: "GT" | "GTE" | "LT" | "LTE" | "EQ";
    }, {
        value: number;
        type: "SUBTOTAL";
        operator?: "GT" | "GTE" | "LT" | "LTE" | "EQ" | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"QUANTITY">;
        operator: z.ZodDefault<z.ZodEnum<["GT", "GTE", "LT", "LTE", "EQ"]>>;
        value: z.ZodNumber;
        selector: z.ZodOptional<z.ZodObject<{
            productIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            variantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            categoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            brandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedProductIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedVariantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedCategoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedBrandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        }, {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        value: number;
        type: "QUANTITY";
        operator: "GT" | "GTE" | "LT" | "LTE" | "EQ";
        selector?: {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        } | undefined;
    }, {
        value: number;
        type: "QUANTITY";
        operator?: "GT" | "GTE" | "LT" | "LTE" | "EQ" | undefined;
        selector?: {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        } | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"HAS_ITEMS">;
        selector: z.ZodObject<{
            productIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            variantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            categoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            brandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedProductIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedVariantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedCategoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedBrandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        }, {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        type: "HAS_ITEMS";
        selector: {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        };
    }, {
        type: "HAS_ITEMS";
        selector: {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        };
    }>, z.ZodObject<{
        type: z.ZodLiteral<"MISSING_ITEMS">;
        selector: z.ZodObject<{
            productIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            variantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            categoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            brandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedProductIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedVariantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedCategoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedBrandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        }, {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        type: "MISSING_ITEMS";
        selector: {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        };
    }, {
        type: "MISSING_ITEMS";
        selector: {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        };
    }>, z.ZodObject<{
        type: z.ZodLiteral<"CUSTOMER_TYPE">;
        value: z.ZodEnum<["EVERYONE", "AUTHENTICATED", "GUEST", "FIRST_ORDER", "RETURNING", "VIP"]>;
    }, "strip", z.ZodTypeAny, {
        value: "EVERYONE" | "AUTHENTICATED" | "GUEST" | "FIRST_ORDER" | "RETURNING" | "VIP";
        type: "CUSTOMER_TYPE";
    }, {
        value: "EVERYONE" | "AUTHENTICATED" | "GUEST" | "FIRST_ORDER" | "RETURNING" | "VIP";
        type: "CUSTOMER_TYPE";
    }>, z.ZodObject<{
        type: z.ZodLiteral<"CUSTOMER">;
        customerIds: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        type: "CUSTOMER";
        customerIds: string[];
    }, {
        type: "CUSTOMER";
        customerIds: string[];
    }>, z.ZodObject<{
        type: z.ZodLiteral<"PAST_ORDER_COUNT">;
        operator: z.ZodDefault<z.ZodEnum<["GT", "GTE", "LT", "LTE", "EQ"]>>;
        value: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        value: number;
        type: "PAST_ORDER_COUNT";
        operator: "GT" | "GTE" | "LT" | "LTE" | "EQ";
    }, {
        value: number;
        type: "PAST_ORDER_COUNT";
        operator?: "GT" | "GTE" | "LT" | "LTE" | "EQ" | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"LIFETIME_SPEND">;
        operator: z.ZodDefault<z.ZodEnum<["GT", "GTE", "LT", "LTE", "EQ"]>>;
        value: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        value: number;
        type: "LIFETIME_SPEND";
        operator: "GT" | "GTE" | "LT" | "LTE" | "EQ";
    }, {
        value: number;
        type: "LIFETIME_SPEND";
        operator?: "GT" | "GTE" | "LT" | "LTE" | "EQ" | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"INACTIVE_DAYS">;
        operator: z.ZodDefault<z.ZodEnum<["GT", "GTE", "LT", "LTE", "EQ"]>>;
        value: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        value: number;
        type: "INACTIVE_DAYS";
        operator: "GT" | "GTE" | "LT" | "LTE" | "EQ";
    }, {
        value: number;
        type: "INACTIVE_DAYS";
        operator?: "GT" | "GTE" | "LT" | "LTE" | "EQ" | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"COUPON_ENTERED">;
        code: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        type: "COUPON_ENTERED";
        code?: string | undefined;
    }, {
        type: "COUPON_ENTERED";
        code?: string | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"PAYMENT_METHOD">;
        values: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        values: string[];
        type: "PAYMENT_METHOD";
    }, {
        values: string[];
        type: "PAYMENT_METHOD";
    }>, z.ZodObject<{
        type: z.ZodLiteral<"GOVERNORATE">;
        values: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        values: string[];
        type: "GOVERNORATE";
    }, {
        values: string[];
        type: "GOVERNORATE";
    }>]>, "many">;
    actions: z.ZodArray<z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
        maxDiscount: z.ZodOptional<z.ZodNumber>;
        selector: z.ZodOptional<z.ZodObject<{
            productIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            variantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            categoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            brandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedProductIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedVariantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedCategoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedBrandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        }, {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        }>>;
        type: z.ZodLiteral<"PERCENT_OFF">;
        value: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        value: number;
        type: "PERCENT_OFF";
        selector?: {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        } | undefined;
        maxDiscount?: number | undefined;
    }, {
        value: number;
        type: "PERCENT_OFF";
        selector?: {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        } | undefined;
        maxDiscount?: number | undefined;
    }>, z.ZodObject<{
        maxDiscount: z.ZodOptional<z.ZodNumber>;
        selector: z.ZodOptional<z.ZodObject<{
            productIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            variantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            categoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            brandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedProductIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedVariantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedCategoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedBrandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        }, {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        }>>;
        type: z.ZodLiteral<"FIXED_OFF">;
        value: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        value: number;
        type: "FIXED_OFF";
        selector?: {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        } | undefined;
        maxDiscount?: number | undefined;
    }, {
        value: number;
        type: "FIXED_OFF";
        selector?: {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        } | undefined;
        maxDiscount?: number | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"PRICE_OVERRIDE">;
        price: z.ZodNumber;
        selector: z.ZodOptional<z.ZodObject<{
            productIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            variantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            categoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            brandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedProductIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedVariantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedCategoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedBrandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        }, {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        type: "PRICE_OVERRIDE";
        price: number;
        selector?: {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        } | undefined;
    }, {
        type: "PRICE_OVERRIDE";
        price: number;
        selector?: {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        } | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"CHEAPEST_FREE">;
        quantity: z.ZodDefault<z.ZodNumber>;
        selector: z.ZodOptional<z.ZodObject<{
            productIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            variantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            categoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            brandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedProductIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedVariantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedCategoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedBrandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        }, {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        type: "CHEAPEST_FREE";
        quantity: number;
        selector?: {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        } | undefined;
    }, {
        type: "CHEAPEST_FREE";
        quantity?: number | undefined;
        selector?: {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        } | undefined;
    }>, z.ZodObject<{
        maxDiscount: z.ZodOptional<z.ZodNumber>;
        selector: z.ZodOptional<z.ZodObject<{
            productIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            variantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            categoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            brandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedProductIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedVariantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedCategoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedBrandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        }, {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        }>>;
        type: z.ZodLiteral<"ITEM_PERCENT_OFF">;
        value: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        value: number;
        type: "ITEM_PERCENT_OFF";
        selector?: {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        } | undefined;
        maxDiscount?: number | undefined;
    }, {
        value: number;
        type: "ITEM_PERCENT_OFF";
        selector?: {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        } | undefined;
        maxDiscount?: number | undefined;
    }>, z.ZodObject<{
        maxDiscount: z.ZodOptional<z.ZodNumber>;
        selector: z.ZodOptional<z.ZodObject<{
            productIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            variantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            categoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            brandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedProductIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedVariantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedCategoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedBrandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        }, {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        }>>;
        type: z.ZodLiteral<"ITEM_FIXED_OFF">;
        value: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        value: number;
        type: "ITEM_FIXED_OFF";
        selector?: {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        } | undefined;
        maxDiscount?: number | undefined;
    }, {
        value: number;
        type: "ITEM_FIXED_OFF";
        selector?: {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        } | undefined;
        maxDiscount?: number | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"FREE_SHIPPING">;
    }, "strip", z.ZodTypeAny, {
        type: "FREE_SHIPPING";
    }, {
        type: "FREE_SHIPPING";
    }>, z.ZodObject<{
        type: z.ZodLiteral<"BUY_X_GET_Y">;
        buyQuantity: z.ZodNumber;
        rewardQuantity: z.ZodDefault<z.ZodNumber>;
        rewardPercentOff: z.ZodDefault<z.ZodNumber>;
        qualifier: z.ZodOptional<z.ZodObject<{
            productIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            variantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            categoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            brandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedProductIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedVariantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedCategoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedBrandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        }, {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        }>>;
        reward: z.ZodOptional<z.ZodObject<{
            productIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            variantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            categoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            brandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedProductIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedVariantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedCategoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedBrandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        }, {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        }>>;
        strategy: z.ZodDefault<z.ZodEnum<["CHEAPEST", "HIGHEST"]>>;
    }, "strip", z.ZodTypeAny, {
        type: "BUY_X_GET_Y";
        buyQuantity: number;
        rewardQuantity: number;
        rewardPercentOff: number;
        strategy: "CHEAPEST" | "HIGHEST";
        qualifier?: {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        } | undefined;
        reward?: {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        } | undefined;
    }, {
        type: "BUY_X_GET_Y";
        buyQuantity: number;
        rewardQuantity?: number | undefined;
        rewardPercentOff?: number | undefined;
        qualifier?: {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        } | undefined;
        reward?: {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        } | undefined;
        strategy?: "CHEAPEST" | "HIGHEST" | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"BUNDLE_PRICE">;
        price: z.ZodNumber;
        items: z.ZodArray<z.ZodObject<{
            variantId: z.ZodOptional<z.ZodString>;
            productId: z.ZodOptional<z.ZodString>;
            quantity: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            quantity: number;
            variantId?: string | undefined;
            productId?: string | undefined;
        }, {
            quantity: number;
            variantId?: string | undefined;
            productId?: string | undefined;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        type: "BUNDLE_PRICE";
        items: {
            quantity: number;
            variantId?: string | undefined;
            productId?: string | undefined;
        }[];
        price: number;
    }, {
        type: "BUNDLE_PRICE";
        items: {
            quantity: number;
            variantId?: string | undefined;
            productId?: string | undefined;
        }[];
        price: number;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"QUANTITY_TIERS">;
        tiers: z.ZodArray<z.ZodObject<{
            threshold: z.ZodNumber;
        } & {
            value: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            value: number;
            threshold: number;
        }, {
            value: number;
            threshold: number;
        }>, "many">;
        selector: z.ZodOptional<z.ZodObject<{
            productIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            variantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            categoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            brandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedProductIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedVariantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedCategoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedBrandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        }, {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        type: "QUANTITY_TIERS";
        tiers: {
            value: number;
            threshold: number;
        }[];
        selector?: {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        } | undefined;
    }, {
        type: "QUANTITY_TIERS";
        tiers: {
            value: number;
            threshold: number;
        }[];
        selector?: {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        } | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"SPEND_TIERS">;
        tiers: z.ZodArray<z.ZodObject<{
            threshold: z.ZodNumber;
        } & {
            value: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            value: number;
            threshold: number;
        }, {
            value: number;
            threshold: number;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        type: "SPEND_TIERS";
        tiers: {
            value: number;
            threshold: number;
        }[];
    }, {
        type: "SPEND_TIERS";
        tiers: {
            value: number;
            threshold: number;
        }[];
    }>, z.ZodObject<{
        type: z.ZodLiteral<"FREE_GIFT">;
        variantIds: z.ZodArray<z.ZodString, "many">;
        quantity: z.ZodDefault<z.ZodNumber>;
        customerChooses: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        type: "FREE_GIFT";
        quantity: number;
        variantIds: string[];
        customerChooses: boolean;
    }, {
        type: "FREE_GIFT";
        variantIds: string[];
        quantity?: number | undefined;
        customerChooses?: boolean | undefined;
    }>]>, "many">;
    targets: z.ZodObject<{
        productIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        variantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        categoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        brandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        excludedProductIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        excludedVariantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        excludedCategoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        excludedBrandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    } & {
        customerIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        productIds: string[];
        variantIds: string[];
        categoryIds: string[];
        brandIds: string[];
        excludedProductIds: string[];
        excludedVariantIds: string[];
        excludedCategoryIds: string[];
        excludedBrandIds: string[];
        customerIds: string[];
    }, {
        productIds?: string[] | undefined;
        variantIds?: string[] | undefined;
        categoryIds?: string[] | undefined;
        brandIds?: string[] | undefined;
        excludedProductIds?: string[] | undefined;
        excludedVariantIds?: string[] | undefined;
        excludedCategoryIds?: string[] | undefined;
        excludedBrandIds?: string[] | undefined;
        customerIds?: string[] | undefined;
    }>;
    limits: z.ZodDefault<z.ZodObject<{
        totalUses: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
        usesPerCustomer: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
        discountedUnits: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
        maximumTotalDiscount: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
    }, "strip", z.ZodTypeAny, {
        totalUses: number | null;
        usesPerCustomer: number | null;
        discountedUnits: number | null;
        maximumTotalDiscount: number | null;
    }, {
        totalUses?: number | null | undefined;
        usesPerCustomer?: number | null | undefined;
        discountedUnits?: number | null | undefined;
        maximumTotalDiscount?: number | null | undefined;
    }>>;
    display: z.ZodDefault<z.ZodObject<{
        badgeText: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        showCountdown: z.ZodDefault<z.ZodBoolean>;
        showOnOffers: z.ZodDefault<z.ZodBoolean>;
        featured: z.ZodDefault<z.ZodBoolean>;
        bannerImageKey: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        featured: boolean;
        badgeText: string | null;
        showCountdown: boolean;
        showOnOffers: boolean;
        bannerImageKey: string | null;
    }, {
        featured?: boolean | undefined;
        badgeText?: string | null | undefined;
        showCountdown?: boolean | undefined;
        showOnOffers?: boolean | undefined;
        bannerImageKey?: string | null | undefined;
    }>>;
    coupons: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        code: z.ZodString;
        usedCount: z.ZodNumber;
        usageLimitTotal: z.ZodNullable<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        code: string;
        id: string;
        usedCount: number;
        usageLimitTotal: number | null;
    }, {
        code: string;
        id: string;
        usedCount: number;
        usageLimitTotal: number | null;
    }>, "many">;
    usedCount: z.ZodNumber;
    discountGranted: z.ZodNumber;
    discountedUnits: z.ZodNumber;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
    summary: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "FREE_SHIPPING" | "PRODUCT_DISCOUNT" | "CART_DISCOUNT" | "BUY_X_GET_Y" | "BUNDLE" | "QUANTITY_TIER" | "SPEND_TIER" | "FREE_GIFT" | "FLASH_SALE";
    status: "ACTIVE" | "EXPIRED" | "DRAFT" | "PAUSED" | "ARCHIVED" | "SCHEDULED" | "EXHAUSTED";
    id: string;
    createdAt: string;
    updatedAt: string;
    summary: string;
    name: string;
    discountedUnits: number;
    internalDescription: string | null;
    customerTitle: string;
    customerDescription: string | null;
    trigger: "AUTOMATIC" | "CODE";
    state: "ACTIVE" | "DRAFT" | "PAUSED" | "ARCHIVED";
    priority: number;
    stacking: "EXCLUSIVE" | "COMBINABLE" | "BEST_OFFER";
    combinableWith: string[];
    startsAt: string | null;
    endsAt: string | null;
    timezone: string;
    conditions: ({
        value: number;
        type: "QUANTITY";
        operator: "GT" | "GTE" | "LT" | "LTE" | "EQ";
        selector?: {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        } | undefined;
    } | {
        value: number;
        type: "SUBTOTAL";
        operator: "GT" | "GTE" | "LT" | "LTE" | "EQ";
    } | {
        type: "HAS_ITEMS";
        selector: {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        };
    } | {
        type: "MISSING_ITEMS";
        selector: {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        };
    } | {
        value: "EVERYONE" | "AUTHENTICATED" | "GUEST" | "FIRST_ORDER" | "RETURNING" | "VIP";
        type: "CUSTOMER_TYPE";
    } | {
        type: "CUSTOMER";
        customerIds: string[];
    } | {
        value: number;
        type: "PAST_ORDER_COUNT";
        operator: "GT" | "GTE" | "LT" | "LTE" | "EQ";
    } | {
        value: number;
        type: "LIFETIME_SPEND";
        operator: "GT" | "GTE" | "LT" | "LTE" | "EQ";
    } | {
        value: number;
        type: "INACTIVE_DAYS";
        operator: "GT" | "GTE" | "LT" | "LTE" | "EQ";
    } | {
        type: "COUPON_ENTERED";
        code?: string | undefined;
    } | {
        values: string[];
        type: "PAYMENT_METHOD";
    } | {
        values: string[];
        type: "GOVERNORATE";
    })[];
    actions: ({
        value: number;
        type: "PERCENT_OFF";
        selector?: {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        } | undefined;
        maxDiscount?: number | undefined;
    } | {
        value: number;
        type: "FIXED_OFF";
        selector?: {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        } | undefined;
        maxDiscount?: number | undefined;
    } | {
        type: "PRICE_OVERRIDE";
        price: number;
        selector?: {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        } | undefined;
    } | {
        type: "CHEAPEST_FREE";
        quantity: number;
        selector?: {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        } | undefined;
    } | {
        value: number;
        type: "ITEM_PERCENT_OFF";
        selector?: {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        } | undefined;
        maxDiscount?: number | undefined;
    } | {
        value: number;
        type: "ITEM_FIXED_OFF";
        selector?: {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        } | undefined;
        maxDiscount?: number | undefined;
    } | {
        type: "FREE_SHIPPING";
    } | {
        type: "BUY_X_GET_Y";
        buyQuantity: number;
        rewardQuantity: number;
        rewardPercentOff: number;
        strategy: "CHEAPEST" | "HIGHEST";
        qualifier?: {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        } | undefined;
        reward?: {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        } | undefined;
    } | {
        type: "BUNDLE_PRICE";
        items: {
            quantity: number;
            variantId?: string | undefined;
            productId?: string | undefined;
        }[];
        price: number;
    } | {
        type: "QUANTITY_TIERS";
        tiers: {
            value: number;
            threshold: number;
        }[];
        selector?: {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
        } | undefined;
    } | {
        type: "SPEND_TIERS";
        tiers: {
            value: number;
            threshold: number;
        }[];
    } | {
        type: "FREE_GIFT";
        quantity: number;
        variantIds: string[];
        customerChooses: boolean;
    })[];
    targets: {
        productIds: string[];
        variantIds: string[];
        categoryIds: string[];
        brandIds: string[];
        excludedProductIds: string[];
        excludedVariantIds: string[];
        excludedCategoryIds: string[];
        excludedBrandIds: string[];
        customerIds: string[];
    };
    limits: {
        totalUses: number | null;
        usesPerCustomer: number | null;
        discountedUnits: number | null;
        maximumTotalDiscount: number | null;
    };
    display: {
        featured: boolean;
        badgeText: string | null;
        showCountdown: boolean;
        showOnOffers: boolean;
        bannerImageKey: string | null;
    };
    usedCount: number;
    coupons: {
        code: string;
        id: string;
        usedCount: number;
        usageLimitTotal: number | null;
    }[];
    discountGranted: number;
}, {
    type: "FREE_SHIPPING" | "PRODUCT_DISCOUNT" | "CART_DISCOUNT" | "BUY_X_GET_Y" | "BUNDLE" | "QUANTITY_TIER" | "SPEND_TIER" | "FREE_GIFT" | "FLASH_SALE";
    status: "ACTIVE" | "EXPIRED" | "DRAFT" | "PAUSED" | "ARCHIVED" | "SCHEDULED" | "EXHAUSTED";
    id: string;
    createdAt: string;
    updatedAt: string;
    summary: string;
    name: string;
    discountedUnits: number;
    internalDescription: string | null;
    customerTitle: string;
    customerDescription: string | null;
    trigger: "AUTOMATIC" | "CODE";
    state: "ACTIVE" | "DRAFT" | "PAUSED" | "ARCHIVED";
    priority: number;
    stacking: "EXCLUSIVE" | "COMBINABLE" | "BEST_OFFER";
    combinableWith: string[];
    startsAt: string | null;
    endsAt: string | null;
    timezone: string;
    conditions: ({
        value: number;
        type: "QUANTITY";
        operator?: "GT" | "GTE" | "LT" | "LTE" | "EQ" | undefined;
        selector?: {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        } | undefined;
    } | {
        value: number;
        type: "SUBTOTAL";
        operator?: "GT" | "GTE" | "LT" | "LTE" | "EQ" | undefined;
    } | {
        type: "HAS_ITEMS";
        selector: {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        };
    } | {
        type: "MISSING_ITEMS";
        selector: {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        };
    } | {
        value: "EVERYONE" | "AUTHENTICATED" | "GUEST" | "FIRST_ORDER" | "RETURNING" | "VIP";
        type: "CUSTOMER_TYPE";
    } | {
        type: "CUSTOMER";
        customerIds: string[];
    } | {
        value: number;
        type: "PAST_ORDER_COUNT";
        operator?: "GT" | "GTE" | "LT" | "LTE" | "EQ" | undefined;
    } | {
        value: number;
        type: "LIFETIME_SPEND";
        operator?: "GT" | "GTE" | "LT" | "LTE" | "EQ" | undefined;
    } | {
        value: number;
        type: "INACTIVE_DAYS";
        operator?: "GT" | "GTE" | "LT" | "LTE" | "EQ" | undefined;
    } | {
        type: "COUPON_ENTERED";
        code?: string | undefined;
    } | {
        values: string[];
        type: "PAYMENT_METHOD";
    } | {
        values: string[];
        type: "GOVERNORATE";
    })[];
    actions: ({
        value: number;
        type: "PERCENT_OFF";
        selector?: {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        } | undefined;
        maxDiscount?: number | undefined;
    } | {
        value: number;
        type: "FIXED_OFF";
        selector?: {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        } | undefined;
        maxDiscount?: number | undefined;
    } | {
        type: "PRICE_OVERRIDE";
        price: number;
        selector?: {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        } | undefined;
    } | {
        type: "CHEAPEST_FREE";
        quantity?: number | undefined;
        selector?: {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        } | undefined;
    } | {
        value: number;
        type: "ITEM_PERCENT_OFF";
        selector?: {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        } | undefined;
        maxDiscount?: number | undefined;
    } | {
        value: number;
        type: "ITEM_FIXED_OFF";
        selector?: {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        } | undefined;
        maxDiscount?: number | undefined;
    } | {
        type: "FREE_SHIPPING";
    } | {
        type: "BUY_X_GET_Y";
        buyQuantity: number;
        rewardQuantity?: number | undefined;
        rewardPercentOff?: number | undefined;
        qualifier?: {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        } | undefined;
        reward?: {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        } | undefined;
        strategy?: "CHEAPEST" | "HIGHEST" | undefined;
    } | {
        type: "BUNDLE_PRICE";
        items: {
            quantity: number;
            variantId?: string | undefined;
            productId?: string | undefined;
        }[];
        price: number;
    } | {
        type: "QUANTITY_TIERS";
        tiers: {
            value: number;
            threshold: number;
        }[];
        selector?: {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
        } | undefined;
    } | {
        type: "SPEND_TIERS";
        tiers: {
            value: number;
            threshold: number;
        }[];
    } | {
        type: "FREE_GIFT";
        variantIds: string[];
        quantity?: number | undefined;
        customerChooses?: boolean | undefined;
    })[];
    targets: {
        productIds?: string[] | undefined;
        variantIds?: string[] | undefined;
        categoryIds?: string[] | undefined;
        brandIds?: string[] | undefined;
        excludedProductIds?: string[] | undefined;
        excludedVariantIds?: string[] | undefined;
        excludedCategoryIds?: string[] | undefined;
        excludedBrandIds?: string[] | undefined;
        customerIds?: string[] | undefined;
    };
    usedCount: number;
    coupons: {
        code: string;
        id: string;
        usedCount: number;
        usageLimitTotal: number | null;
    }[];
    discountGranted: number;
    limits?: {
        totalUses?: number | null | undefined;
        usesPerCustomer?: number | null | undefined;
        discountedUnits?: number | null | undefined;
        maximumTotalDiscount?: number | null | undefined;
    } | undefined;
    display?: {
        featured?: boolean | undefined;
        badgeText?: string | null | undefined;
        showCountdown?: boolean | undefined;
        showOnOffers?: boolean | undefined;
        bannerImageKey?: string | null | undefined;
    } | undefined;
}>;
export type PromotionResponse = z.infer<typeof promotionResponseSchema>;
export declare const promotionListResponseSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        internalDescription: z.ZodNullable<z.ZodString>;
        customerTitle: z.ZodString;
        customerDescription: z.ZodNullable<z.ZodString>;
        type: z.ZodEnum<["PRODUCT_DISCOUNT", "CART_DISCOUNT", "BUY_X_GET_Y", "BUNDLE", "QUANTITY_TIER", "SPEND_TIER", "FREE_SHIPPING", "FREE_GIFT", "FLASH_SALE"]>;
        trigger: z.ZodEnum<["AUTOMATIC", "CODE"]>;
        state: z.ZodEnum<["DRAFT", "ACTIVE", "PAUSED", "ARCHIVED"]>;
        status: z.ZodEnum<["DRAFT", "SCHEDULED", "ACTIVE", "PAUSED", "EXPIRED", "EXHAUSTED", "ARCHIVED"]>;
        priority: z.ZodNumber;
        stacking: z.ZodEnum<["EXCLUSIVE", "COMBINABLE", "BEST_OFFER"]>;
        combinableWith: z.ZodArray<z.ZodString, "many">;
        startsAt: z.ZodNullable<z.ZodString>;
        endsAt: z.ZodNullable<z.ZodString>;
        timezone: z.ZodString;
        conditions: z.ZodArray<z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
            type: z.ZodLiteral<"SUBTOTAL">;
            operator: z.ZodDefault<z.ZodEnum<["GT", "GTE", "LT", "LTE", "EQ"]>>;
            value: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            value: number;
            type: "SUBTOTAL";
            operator: "GT" | "GTE" | "LT" | "LTE" | "EQ";
        }, {
            value: number;
            type: "SUBTOTAL";
            operator?: "GT" | "GTE" | "LT" | "LTE" | "EQ" | undefined;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"QUANTITY">;
            operator: z.ZodDefault<z.ZodEnum<["GT", "GTE", "LT", "LTE", "EQ"]>>;
            value: z.ZodNumber;
            selector: z.ZodOptional<z.ZodObject<{
                productIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                variantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                categoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                brandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                excludedProductIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                excludedVariantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                excludedCategoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                excludedBrandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            }, "strip", z.ZodTypeAny, {
                productIds: string[];
                variantIds: string[];
                categoryIds: string[];
                brandIds: string[];
                excludedProductIds: string[];
                excludedVariantIds: string[];
                excludedCategoryIds: string[];
                excludedBrandIds: string[];
            }, {
                productIds?: string[] | undefined;
                variantIds?: string[] | undefined;
                categoryIds?: string[] | undefined;
                brandIds?: string[] | undefined;
                excludedProductIds?: string[] | undefined;
                excludedVariantIds?: string[] | undefined;
                excludedCategoryIds?: string[] | undefined;
                excludedBrandIds?: string[] | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            value: number;
            type: "QUANTITY";
            operator: "GT" | "GTE" | "LT" | "LTE" | "EQ";
            selector?: {
                productIds: string[];
                variantIds: string[];
                categoryIds: string[];
                brandIds: string[];
                excludedProductIds: string[];
                excludedVariantIds: string[];
                excludedCategoryIds: string[];
                excludedBrandIds: string[];
            } | undefined;
        }, {
            value: number;
            type: "QUANTITY";
            operator?: "GT" | "GTE" | "LT" | "LTE" | "EQ" | undefined;
            selector?: {
                productIds?: string[] | undefined;
                variantIds?: string[] | undefined;
                categoryIds?: string[] | undefined;
                brandIds?: string[] | undefined;
                excludedProductIds?: string[] | undefined;
                excludedVariantIds?: string[] | undefined;
                excludedCategoryIds?: string[] | undefined;
                excludedBrandIds?: string[] | undefined;
            } | undefined;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"HAS_ITEMS">;
            selector: z.ZodObject<{
                productIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                variantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                categoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                brandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                excludedProductIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                excludedVariantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                excludedCategoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                excludedBrandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            }, "strip", z.ZodTypeAny, {
                productIds: string[];
                variantIds: string[];
                categoryIds: string[];
                brandIds: string[];
                excludedProductIds: string[];
                excludedVariantIds: string[];
                excludedCategoryIds: string[];
                excludedBrandIds: string[];
            }, {
                productIds?: string[] | undefined;
                variantIds?: string[] | undefined;
                categoryIds?: string[] | undefined;
                brandIds?: string[] | undefined;
                excludedProductIds?: string[] | undefined;
                excludedVariantIds?: string[] | undefined;
                excludedCategoryIds?: string[] | undefined;
                excludedBrandIds?: string[] | undefined;
            }>;
        }, "strip", z.ZodTypeAny, {
            type: "HAS_ITEMS";
            selector: {
                productIds: string[];
                variantIds: string[];
                categoryIds: string[];
                brandIds: string[];
                excludedProductIds: string[];
                excludedVariantIds: string[];
                excludedCategoryIds: string[];
                excludedBrandIds: string[];
            };
        }, {
            type: "HAS_ITEMS";
            selector: {
                productIds?: string[] | undefined;
                variantIds?: string[] | undefined;
                categoryIds?: string[] | undefined;
                brandIds?: string[] | undefined;
                excludedProductIds?: string[] | undefined;
                excludedVariantIds?: string[] | undefined;
                excludedCategoryIds?: string[] | undefined;
                excludedBrandIds?: string[] | undefined;
            };
        }>, z.ZodObject<{
            type: z.ZodLiteral<"MISSING_ITEMS">;
            selector: z.ZodObject<{
                productIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                variantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                categoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                brandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                excludedProductIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                excludedVariantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                excludedCategoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                excludedBrandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            }, "strip", z.ZodTypeAny, {
                productIds: string[];
                variantIds: string[];
                categoryIds: string[];
                brandIds: string[];
                excludedProductIds: string[];
                excludedVariantIds: string[];
                excludedCategoryIds: string[];
                excludedBrandIds: string[];
            }, {
                productIds?: string[] | undefined;
                variantIds?: string[] | undefined;
                categoryIds?: string[] | undefined;
                brandIds?: string[] | undefined;
                excludedProductIds?: string[] | undefined;
                excludedVariantIds?: string[] | undefined;
                excludedCategoryIds?: string[] | undefined;
                excludedBrandIds?: string[] | undefined;
            }>;
        }, "strip", z.ZodTypeAny, {
            type: "MISSING_ITEMS";
            selector: {
                productIds: string[];
                variantIds: string[];
                categoryIds: string[];
                brandIds: string[];
                excludedProductIds: string[];
                excludedVariantIds: string[];
                excludedCategoryIds: string[];
                excludedBrandIds: string[];
            };
        }, {
            type: "MISSING_ITEMS";
            selector: {
                productIds?: string[] | undefined;
                variantIds?: string[] | undefined;
                categoryIds?: string[] | undefined;
                brandIds?: string[] | undefined;
                excludedProductIds?: string[] | undefined;
                excludedVariantIds?: string[] | undefined;
                excludedCategoryIds?: string[] | undefined;
                excludedBrandIds?: string[] | undefined;
            };
        }>, z.ZodObject<{
            type: z.ZodLiteral<"CUSTOMER_TYPE">;
            value: z.ZodEnum<["EVERYONE", "AUTHENTICATED", "GUEST", "FIRST_ORDER", "RETURNING", "VIP"]>;
        }, "strip", z.ZodTypeAny, {
            value: "EVERYONE" | "AUTHENTICATED" | "GUEST" | "FIRST_ORDER" | "RETURNING" | "VIP";
            type: "CUSTOMER_TYPE";
        }, {
            value: "EVERYONE" | "AUTHENTICATED" | "GUEST" | "FIRST_ORDER" | "RETURNING" | "VIP";
            type: "CUSTOMER_TYPE";
        }>, z.ZodObject<{
            type: z.ZodLiteral<"CUSTOMER">;
            customerIds: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            type: "CUSTOMER";
            customerIds: string[];
        }, {
            type: "CUSTOMER";
            customerIds: string[];
        }>, z.ZodObject<{
            type: z.ZodLiteral<"PAST_ORDER_COUNT">;
            operator: z.ZodDefault<z.ZodEnum<["GT", "GTE", "LT", "LTE", "EQ"]>>;
            value: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            value: number;
            type: "PAST_ORDER_COUNT";
            operator: "GT" | "GTE" | "LT" | "LTE" | "EQ";
        }, {
            value: number;
            type: "PAST_ORDER_COUNT";
            operator?: "GT" | "GTE" | "LT" | "LTE" | "EQ" | undefined;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"LIFETIME_SPEND">;
            operator: z.ZodDefault<z.ZodEnum<["GT", "GTE", "LT", "LTE", "EQ"]>>;
            value: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            value: number;
            type: "LIFETIME_SPEND";
            operator: "GT" | "GTE" | "LT" | "LTE" | "EQ";
        }, {
            value: number;
            type: "LIFETIME_SPEND";
            operator?: "GT" | "GTE" | "LT" | "LTE" | "EQ" | undefined;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"INACTIVE_DAYS">;
            operator: z.ZodDefault<z.ZodEnum<["GT", "GTE", "LT", "LTE", "EQ"]>>;
            value: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            value: number;
            type: "INACTIVE_DAYS";
            operator: "GT" | "GTE" | "LT" | "LTE" | "EQ";
        }, {
            value: number;
            type: "INACTIVE_DAYS";
            operator?: "GT" | "GTE" | "LT" | "LTE" | "EQ" | undefined;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"COUPON_ENTERED">;
            code: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            type: "COUPON_ENTERED";
            code?: string | undefined;
        }, {
            type: "COUPON_ENTERED";
            code?: string | undefined;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"PAYMENT_METHOD">;
            values: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            values: string[];
            type: "PAYMENT_METHOD";
        }, {
            values: string[];
            type: "PAYMENT_METHOD";
        }>, z.ZodObject<{
            type: z.ZodLiteral<"GOVERNORATE">;
            values: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            values: string[];
            type: "GOVERNORATE";
        }, {
            values: string[];
            type: "GOVERNORATE";
        }>]>, "many">;
        actions: z.ZodArray<z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
            maxDiscount: z.ZodOptional<z.ZodNumber>;
            selector: z.ZodOptional<z.ZodObject<{
                productIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                variantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                categoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                brandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                excludedProductIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                excludedVariantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                excludedCategoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                excludedBrandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            }, "strip", z.ZodTypeAny, {
                productIds: string[];
                variantIds: string[];
                categoryIds: string[];
                brandIds: string[];
                excludedProductIds: string[];
                excludedVariantIds: string[];
                excludedCategoryIds: string[];
                excludedBrandIds: string[];
            }, {
                productIds?: string[] | undefined;
                variantIds?: string[] | undefined;
                categoryIds?: string[] | undefined;
                brandIds?: string[] | undefined;
                excludedProductIds?: string[] | undefined;
                excludedVariantIds?: string[] | undefined;
                excludedCategoryIds?: string[] | undefined;
                excludedBrandIds?: string[] | undefined;
            }>>;
            type: z.ZodLiteral<"PERCENT_OFF">;
            value: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            value: number;
            type: "PERCENT_OFF";
            selector?: {
                productIds: string[];
                variantIds: string[];
                categoryIds: string[];
                brandIds: string[];
                excludedProductIds: string[];
                excludedVariantIds: string[];
                excludedCategoryIds: string[];
                excludedBrandIds: string[];
            } | undefined;
            maxDiscount?: number | undefined;
        }, {
            value: number;
            type: "PERCENT_OFF";
            selector?: {
                productIds?: string[] | undefined;
                variantIds?: string[] | undefined;
                categoryIds?: string[] | undefined;
                brandIds?: string[] | undefined;
                excludedProductIds?: string[] | undefined;
                excludedVariantIds?: string[] | undefined;
                excludedCategoryIds?: string[] | undefined;
                excludedBrandIds?: string[] | undefined;
            } | undefined;
            maxDiscount?: number | undefined;
        }>, z.ZodObject<{
            maxDiscount: z.ZodOptional<z.ZodNumber>;
            selector: z.ZodOptional<z.ZodObject<{
                productIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                variantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                categoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                brandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                excludedProductIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                excludedVariantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                excludedCategoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                excludedBrandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            }, "strip", z.ZodTypeAny, {
                productIds: string[];
                variantIds: string[];
                categoryIds: string[];
                brandIds: string[];
                excludedProductIds: string[];
                excludedVariantIds: string[];
                excludedCategoryIds: string[];
                excludedBrandIds: string[];
            }, {
                productIds?: string[] | undefined;
                variantIds?: string[] | undefined;
                categoryIds?: string[] | undefined;
                brandIds?: string[] | undefined;
                excludedProductIds?: string[] | undefined;
                excludedVariantIds?: string[] | undefined;
                excludedCategoryIds?: string[] | undefined;
                excludedBrandIds?: string[] | undefined;
            }>>;
            type: z.ZodLiteral<"FIXED_OFF">;
            value: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            value: number;
            type: "FIXED_OFF";
            selector?: {
                productIds: string[];
                variantIds: string[];
                categoryIds: string[];
                brandIds: string[];
                excludedProductIds: string[];
                excludedVariantIds: string[];
                excludedCategoryIds: string[];
                excludedBrandIds: string[];
            } | undefined;
            maxDiscount?: number | undefined;
        }, {
            value: number;
            type: "FIXED_OFF";
            selector?: {
                productIds?: string[] | undefined;
                variantIds?: string[] | undefined;
                categoryIds?: string[] | undefined;
                brandIds?: string[] | undefined;
                excludedProductIds?: string[] | undefined;
                excludedVariantIds?: string[] | undefined;
                excludedCategoryIds?: string[] | undefined;
                excludedBrandIds?: string[] | undefined;
            } | undefined;
            maxDiscount?: number | undefined;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"PRICE_OVERRIDE">;
            price: z.ZodNumber;
            selector: z.ZodOptional<z.ZodObject<{
                productIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                variantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                categoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                brandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                excludedProductIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                excludedVariantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                excludedCategoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                excludedBrandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            }, "strip", z.ZodTypeAny, {
                productIds: string[];
                variantIds: string[];
                categoryIds: string[];
                brandIds: string[];
                excludedProductIds: string[];
                excludedVariantIds: string[];
                excludedCategoryIds: string[];
                excludedBrandIds: string[];
            }, {
                productIds?: string[] | undefined;
                variantIds?: string[] | undefined;
                categoryIds?: string[] | undefined;
                brandIds?: string[] | undefined;
                excludedProductIds?: string[] | undefined;
                excludedVariantIds?: string[] | undefined;
                excludedCategoryIds?: string[] | undefined;
                excludedBrandIds?: string[] | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            type: "PRICE_OVERRIDE";
            price: number;
            selector?: {
                productIds: string[];
                variantIds: string[];
                categoryIds: string[];
                brandIds: string[];
                excludedProductIds: string[];
                excludedVariantIds: string[];
                excludedCategoryIds: string[];
                excludedBrandIds: string[];
            } | undefined;
        }, {
            type: "PRICE_OVERRIDE";
            price: number;
            selector?: {
                productIds?: string[] | undefined;
                variantIds?: string[] | undefined;
                categoryIds?: string[] | undefined;
                brandIds?: string[] | undefined;
                excludedProductIds?: string[] | undefined;
                excludedVariantIds?: string[] | undefined;
                excludedCategoryIds?: string[] | undefined;
                excludedBrandIds?: string[] | undefined;
            } | undefined;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"CHEAPEST_FREE">;
            quantity: z.ZodDefault<z.ZodNumber>;
            selector: z.ZodOptional<z.ZodObject<{
                productIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                variantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                categoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                brandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                excludedProductIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                excludedVariantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                excludedCategoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                excludedBrandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            }, "strip", z.ZodTypeAny, {
                productIds: string[];
                variantIds: string[];
                categoryIds: string[];
                brandIds: string[];
                excludedProductIds: string[];
                excludedVariantIds: string[];
                excludedCategoryIds: string[];
                excludedBrandIds: string[];
            }, {
                productIds?: string[] | undefined;
                variantIds?: string[] | undefined;
                categoryIds?: string[] | undefined;
                brandIds?: string[] | undefined;
                excludedProductIds?: string[] | undefined;
                excludedVariantIds?: string[] | undefined;
                excludedCategoryIds?: string[] | undefined;
                excludedBrandIds?: string[] | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            type: "CHEAPEST_FREE";
            quantity: number;
            selector?: {
                productIds: string[];
                variantIds: string[];
                categoryIds: string[];
                brandIds: string[];
                excludedProductIds: string[];
                excludedVariantIds: string[];
                excludedCategoryIds: string[];
                excludedBrandIds: string[];
            } | undefined;
        }, {
            type: "CHEAPEST_FREE";
            quantity?: number | undefined;
            selector?: {
                productIds?: string[] | undefined;
                variantIds?: string[] | undefined;
                categoryIds?: string[] | undefined;
                brandIds?: string[] | undefined;
                excludedProductIds?: string[] | undefined;
                excludedVariantIds?: string[] | undefined;
                excludedCategoryIds?: string[] | undefined;
                excludedBrandIds?: string[] | undefined;
            } | undefined;
        }>, z.ZodObject<{
            maxDiscount: z.ZodOptional<z.ZodNumber>;
            selector: z.ZodOptional<z.ZodObject<{
                productIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                variantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                categoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                brandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                excludedProductIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                excludedVariantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                excludedCategoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                excludedBrandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            }, "strip", z.ZodTypeAny, {
                productIds: string[];
                variantIds: string[];
                categoryIds: string[];
                brandIds: string[];
                excludedProductIds: string[];
                excludedVariantIds: string[];
                excludedCategoryIds: string[];
                excludedBrandIds: string[];
            }, {
                productIds?: string[] | undefined;
                variantIds?: string[] | undefined;
                categoryIds?: string[] | undefined;
                brandIds?: string[] | undefined;
                excludedProductIds?: string[] | undefined;
                excludedVariantIds?: string[] | undefined;
                excludedCategoryIds?: string[] | undefined;
                excludedBrandIds?: string[] | undefined;
            }>>;
            type: z.ZodLiteral<"ITEM_PERCENT_OFF">;
            value: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            value: number;
            type: "ITEM_PERCENT_OFF";
            selector?: {
                productIds: string[];
                variantIds: string[];
                categoryIds: string[];
                brandIds: string[];
                excludedProductIds: string[];
                excludedVariantIds: string[];
                excludedCategoryIds: string[];
                excludedBrandIds: string[];
            } | undefined;
            maxDiscount?: number | undefined;
        }, {
            value: number;
            type: "ITEM_PERCENT_OFF";
            selector?: {
                productIds?: string[] | undefined;
                variantIds?: string[] | undefined;
                categoryIds?: string[] | undefined;
                brandIds?: string[] | undefined;
                excludedProductIds?: string[] | undefined;
                excludedVariantIds?: string[] | undefined;
                excludedCategoryIds?: string[] | undefined;
                excludedBrandIds?: string[] | undefined;
            } | undefined;
            maxDiscount?: number | undefined;
        }>, z.ZodObject<{
            maxDiscount: z.ZodOptional<z.ZodNumber>;
            selector: z.ZodOptional<z.ZodObject<{
                productIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                variantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                categoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                brandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                excludedProductIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                excludedVariantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                excludedCategoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                excludedBrandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            }, "strip", z.ZodTypeAny, {
                productIds: string[];
                variantIds: string[];
                categoryIds: string[];
                brandIds: string[];
                excludedProductIds: string[];
                excludedVariantIds: string[];
                excludedCategoryIds: string[];
                excludedBrandIds: string[];
            }, {
                productIds?: string[] | undefined;
                variantIds?: string[] | undefined;
                categoryIds?: string[] | undefined;
                brandIds?: string[] | undefined;
                excludedProductIds?: string[] | undefined;
                excludedVariantIds?: string[] | undefined;
                excludedCategoryIds?: string[] | undefined;
                excludedBrandIds?: string[] | undefined;
            }>>;
            type: z.ZodLiteral<"ITEM_FIXED_OFF">;
            value: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            value: number;
            type: "ITEM_FIXED_OFF";
            selector?: {
                productIds: string[];
                variantIds: string[];
                categoryIds: string[];
                brandIds: string[];
                excludedProductIds: string[];
                excludedVariantIds: string[];
                excludedCategoryIds: string[];
                excludedBrandIds: string[];
            } | undefined;
            maxDiscount?: number | undefined;
        }, {
            value: number;
            type: "ITEM_FIXED_OFF";
            selector?: {
                productIds?: string[] | undefined;
                variantIds?: string[] | undefined;
                categoryIds?: string[] | undefined;
                brandIds?: string[] | undefined;
                excludedProductIds?: string[] | undefined;
                excludedVariantIds?: string[] | undefined;
                excludedCategoryIds?: string[] | undefined;
                excludedBrandIds?: string[] | undefined;
            } | undefined;
            maxDiscount?: number | undefined;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"FREE_SHIPPING">;
        }, "strip", z.ZodTypeAny, {
            type: "FREE_SHIPPING";
        }, {
            type: "FREE_SHIPPING";
        }>, z.ZodObject<{
            type: z.ZodLiteral<"BUY_X_GET_Y">;
            buyQuantity: z.ZodNumber;
            rewardQuantity: z.ZodDefault<z.ZodNumber>;
            rewardPercentOff: z.ZodDefault<z.ZodNumber>;
            qualifier: z.ZodOptional<z.ZodObject<{
                productIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                variantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                categoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                brandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                excludedProductIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                excludedVariantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                excludedCategoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                excludedBrandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            }, "strip", z.ZodTypeAny, {
                productIds: string[];
                variantIds: string[];
                categoryIds: string[];
                brandIds: string[];
                excludedProductIds: string[];
                excludedVariantIds: string[];
                excludedCategoryIds: string[];
                excludedBrandIds: string[];
            }, {
                productIds?: string[] | undefined;
                variantIds?: string[] | undefined;
                categoryIds?: string[] | undefined;
                brandIds?: string[] | undefined;
                excludedProductIds?: string[] | undefined;
                excludedVariantIds?: string[] | undefined;
                excludedCategoryIds?: string[] | undefined;
                excludedBrandIds?: string[] | undefined;
            }>>;
            reward: z.ZodOptional<z.ZodObject<{
                productIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                variantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                categoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                brandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                excludedProductIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                excludedVariantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                excludedCategoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                excludedBrandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            }, "strip", z.ZodTypeAny, {
                productIds: string[];
                variantIds: string[];
                categoryIds: string[];
                brandIds: string[];
                excludedProductIds: string[];
                excludedVariantIds: string[];
                excludedCategoryIds: string[];
                excludedBrandIds: string[];
            }, {
                productIds?: string[] | undefined;
                variantIds?: string[] | undefined;
                categoryIds?: string[] | undefined;
                brandIds?: string[] | undefined;
                excludedProductIds?: string[] | undefined;
                excludedVariantIds?: string[] | undefined;
                excludedCategoryIds?: string[] | undefined;
                excludedBrandIds?: string[] | undefined;
            }>>;
            strategy: z.ZodDefault<z.ZodEnum<["CHEAPEST", "HIGHEST"]>>;
        }, "strip", z.ZodTypeAny, {
            type: "BUY_X_GET_Y";
            buyQuantity: number;
            rewardQuantity: number;
            rewardPercentOff: number;
            strategy: "CHEAPEST" | "HIGHEST";
            qualifier?: {
                productIds: string[];
                variantIds: string[];
                categoryIds: string[];
                brandIds: string[];
                excludedProductIds: string[];
                excludedVariantIds: string[];
                excludedCategoryIds: string[];
                excludedBrandIds: string[];
            } | undefined;
            reward?: {
                productIds: string[];
                variantIds: string[];
                categoryIds: string[];
                brandIds: string[];
                excludedProductIds: string[];
                excludedVariantIds: string[];
                excludedCategoryIds: string[];
                excludedBrandIds: string[];
            } | undefined;
        }, {
            type: "BUY_X_GET_Y";
            buyQuantity: number;
            rewardQuantity?: number | undefined;
            rewardPercentOff?: number | undefined;
            qualifier?: {
                productIds?: string[] | undefined;
                variantIds?: string[] | undefined;
                categoryIds?: string[] | undefined;
                brandIds?: string[] | undefined;
                excludedProductIds?: string[] | undefined;
                excludedVariantIds?: string[] | undefined;
                excludedCategoryIds?: string[] | undefined;
                excludedBrandIds?: string[] | undefined;
            } | undefined;
            reward?: {
                productIds?: string[] | undefined;
                variantIds?: string[] | undefined;
                categoryIds?: string[] | undefined;
                brandIds?: string[] | undefined;
                excludedProductIds?: string[] | undefined;
                excludedVariantIds?: string[] | undefined;
                excludedCategoryIds?: string[] | undefined;
                excludedBrandIds?: string[] | undefined;
            } | undefined;
            strategy?: "CHEAPEST" | "HIGHEST" | undefined;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"BUNDLE_PRICE">;
            price: z.ZodNumber;
            items: z.ZodArray<z.ZodObject<{
                variantId: z.ZodOptional<z.ZodString>;
                productId: z.ZodOptional<z.ZodString>;
                quantity: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                quantity: number;
                variantId?: string | undefined;
                productId?: string | undefined;
            }, {
                quantity: number;
                variantId?: string | undefined;
                productId?: string | undefined;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            type: "BUNDLE_PRICE";
            items: {
                quantity: number;
                variantId?: string | undefined;
                productId?: string | undefined;
            }[];
            price: number;
        }, {
            type: "BUNDLE_PRICE";
            items: {
                quantity: number;
                variantId?: string | undefined;
                productId?: string | undefined;
            }[];
            price: number;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"QUANTITY_TIERS">;
            tiers: z.ZodArray<z.ZodObject<{
                threshold: z.ZodNumber;
            } & {
                value: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                value: number;
                threshold: number;
            }, {
                value: number;
                threshold: number;
            }>, "many">;
            selector: z.ZodOptional<z.ZodObject<{
                productIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                variantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                categoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                brandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                excludedProductIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                excludedVariantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                excludedCategoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                excludedBrandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            }, "strip", z.ZodTypeAny, {
                productIds: string[];
                variantIds: string[];
                categoryIds: string[];
                brandIds: string[];
                excludedProductIds: string[];
                excludedVariantIds: string[];
                excludedCategoryIds: string[];
                excludedBrandIds: string[];
            }, {
                productIds?: string[] | undefined;
                variantIds?: string[] | undefined;
                categoryIds?: string[] | undefined;
                brandIds?: string[] | undefined;
                excludedProductIds?: string[] | undefined;
                excludedVariantIds?: string[] | undefined;
                excludedCategoryIds?: string[] | undefined;
                excludedBrandIds?: string[] | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            type: "QUANTITY_TIERS";
            tiers: {
                value: number;
                threshold: number;
            }[];
            selector?: {
                productIds: string[];
                variantIds: string[];
                categoryIds: string[];
                brandIds: string[];
                excludedProductIds: string[];
                excludedVariantIds: string[];
                excludedCategoryIds: string[];
                excludedBrandIds: string[];
            } | undefined;
        }, {
            type: "QUANTITY_TIERS";
            tiers: {
                value: number;
                threshold: number;
            }[];
            selector?: {
                productIds?: string[] | undefined;
                variantIds?: string[] | undefined;
                categoryIds?: string[] | undefined;
                brandIds?: string[] | undefined;
                excludedProductIds?: string[] | undefined;
                excludedVariantIds?: string[] | undefined;
                excludedCategoryIds?: string[] | undefined;
                excludedBrandIds?: string[] | undefined;
            } | undefined;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"SPEND_TIERS">;
            tiers: z.ZodArray<z.ZodObject<{
                threshold: z.ZodNumber;
            } & {
                value: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                value: number;
                threshold: number;
            }, {
                value: number;
                threshold: number;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            type: "SPEND_TIERS";
            tiers: {
                value: number;
                threshold: number;
            }[];
        }, {
            type: "SPEND_TIERS";
            tiers: {
                value: number;
                threshold: number;
            }[];
        }>, z.ZodObject<{
            type: z.ZodLiteral<"FREE_GIFT">;
            variantIds: z.ZodArray<z.ZodString, "many">;
            quantity: z.ZodDefault<z.ZodNumber>;
            customerChooses: z.ZodDefault<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            type: "FREE_GIFT";
            quantity: number;
            variantIds: string[];
            customerChooses: boolean;
        }, {
            type: "FREE_GIFT";
            variantIds: string[];
            quantity?: number | undefined;
            customerChooses?: boolean | undefined;
        }>]>, "many">;
        targets: z.ZodObject<{
            productIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            variantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            categoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            brandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedProductIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedVariantIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedCategoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            excludedBrandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        } & {
            customerIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
            customerIds: string[];
        }, {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
            customerIds?: string[] | undefined;
        }>;
        limits: z.ZodDefault<z.ZodObject<{
            totalUses: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
            usesPerCustomer: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
            discountedUnits: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
            maximumTotalDiscount: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
        }, "strip", z.ZodTypeAny, {
            totalUses: number | null;
            usesPerCustomer: number | null;
            discountedUnits: number | null;
            maximumTotalDiscount: number | null;
        }, {
            totalUses?: number | null | undefined;
            usesPerCustomer?: number | null | undefined;
            discountedUnits?: number | null | undefined;
            maximumTotalDiscount?: number | null | undefined;
        }>>;
        display: z.ZodDefault<z.ZodObject<{
            badgeText: z.ZodDefault<z.ZodNullable<z.ZodString>>;
            showCountdown: z.ZodDefault<z.ZodBoolean>;
            showOnOffers: z.ZodDefault<z.ZodBoolean>;
            featured: z.ZodDefault<z.ZodBoolean>;
            bannerImageKey: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
            featured: boolean;
            badgeText: string | null;
            showCountdown: boolean;
            showOnOffers: boolean;
            bannerImageKey: string | null;
        }, {
            featured?: boolean | undefined;
            badgeText?: string | null | undefined;
            showCountdown?: boolean | undefined;
            showOnOffers?: boolean | undefined;
            bannerImageKey?: string | null | undefined;
        }>>;
        coupons: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            code: z.ZodString;
            usedCount: z.ZodNumber;
            usageLimitTotal: z.ZodNullable<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            code: string;
            id: string;
            usedCount: number;
            usageLimitTotal: number | null;
        }, {
            code: string;
            id: string;
            usedCount: number;
            usageLimitTotal: number | null;
        }>, "many">;
        usedCount: z.ZodNumber;
        discountGranted: z.ZodNumber;
        discountedUnits: z.ZodNumber;
        createdAt: z.ZodString;
        updatedAt: z.ZodString;
        summary: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "FREE_SHIPPING" | "PRODUCT_DISCOUNT" | "CART_DISCOUNT" | "BUY_X_GET_Y" | "BUNDLE" | "QUANTITY_TIER" | "SPEND_TIER" | "FREE_GIFT" | "FLASH_SALE";
        status: "ACTIVE" | "EXPIRED" | "DRAFT" | "PAUSED" | "ARCHIVED" | "SCHEDULED" | "EXHAUSTED";
        id: string;
        createdAt: string;
        updatedAt: string;
        summary: string;
        name: string;
        discountedUnits: number;
        internalDescription: string | null;
        customerTitle: string;
        customerDescription: string | null;
        trigger: "AUTOMATIC" | "CODE";
        state: "ACTIVE" | "DRAFT" | "PAUSED" | "ARCHIVED";
        priority: number;
        stacking: "EXCLUSIVE" | "COMBINABLE" | "BEST_OFFER";
        combinableWith: string[];
        startsAt: string | null;
        endsAt: string | null;
        timezone: string;
        conditions: ({
            value: number;
            type: "QUANTITY";
            operator: "GT" | "GTE" | "LT" | "LTE" | "EQ";
            selector?: {
                productIds: string[];
                variantIds: string[];
                categoryIds: string[];
                brandIds: string[];
                excludedProductIds: string[];
                excludedVariantIds: string[];
                excludedCategoryIds: string[];
                excludedBrandIds: string[];
            } | undefined;
        } | {
            value: number;
            type: "SUBTOTAL";
            operator: "GT" | "GTE" | "LT" | "LTE" | "EQ";
        } | {
            type: "HAS_ITEMS";
            selector: {
                productIds: string[];
                variantIds: string[];
                categoryIds: string[];
                brandIds: string[];
                excludedProductIds: string[];
                excludedVariantIds: string[];
                excludedCategoryIds: string[];
                excludedBrandIds: string[];
            };
        } | {
            type: "MISSING_ITEMS";
            selector: {
                productIds: string[];
                variantIds: string[];
                categoryIds: string[];
                brandIds: string[];
                excludedProductIds: string[];
                excludedVariantIds: string[];
                excludedCategoryIds: string[];
                excludedBrandIds: string[];
            };
        } | {
            value: "EVERYONE" | "AUTHENTICATED" | "GUEST" | "FIRST_ORDER" | "RETURNING" | "VIP";
            type: "CUSTOMER_TYPE";
        } | {
            type: "CUSTOMER";
            customerIds: string[];
        } | {
            value: number;
            type: "PAST_ORDER_COUNT";
            operator: "GT" | "GTE" | "LT" | "LTE" | "EQ";
        } | {
            value: number;
            type: "LIFETIME_SPEND";
            operator: "GT" | "GTE" | "LT" | "LTE" | "EQ";
        } | {
            value: number;
            type: "INACTIVE_DAYS";
            operator: "GT" | "GTE" | "LT" | "LTE" | "EQ";
        } | {
            type: "COUPON_ENTERED";
            code?: string | undefined;
        } | {
            values: string[];
            type: "PAYMENT_METHOD";
        } | {
            values: string[];
            type: "GOVERNORATE";
        })[];
        actions: ({
            value: number;
            type: "PERCENT_OFF";
            selector?: {
                productIds: string[];
                variantIds: string[];
                categoryIds: string[];
                brandIds: string[];
                excludedProductIds: string[];
                excludedVariantIds: string[];
                excludedCategoryIds: string[];
                excludedBrandIds: string[];
            } | undefined;
            maxDiscount?: number | undefined;
        } | {
            value: number;
            type: "FIXED_OFF";
            selector?: {
                productIds: string[];
                variantIds: string[];
                categoryIds: string[];
                brandIds: string[];
                excludedProductIds: string[];
                excludedVariantIds: string[];
                excludedCategoryIds: string[];
                excludedBrandIds: string[];
            } | undefined;
            maxDiscount?: number | undefined;
        } | {
            type: "PRICE_OVERRIDE";
            price: number;
            selector?: {
                productIds: string[];
                variantIds: string[];
                categoryIds: string[];
                brandIds: string[];
                excludedProductIds: string[];
                excludedVariantIds: string[];
                excludedCategoryIds: string[];
                excludedBrandIds: string[];
            } | undefined;
        } | {
            type: "CHEAPEST_FREE";
            quantity: number;
            selector?: {
                productIds: string[];
                variantIds: string[];
                categoryIds: string[];
                brandIds: string[];
                excludedProductIds: string[];
                excludedVariantIds: string[];
                excludedCategoryIds: string[];
                excludedBrandIds: string[];
            } | undefined;
        } | {
            value: number;
            type: "ITEM_PERCENT_OFF";
            selector?: {
                productIds: string[];
                variantIds: string[];
                categoryIds: string[];
                brandIds: string[];
                excludedProductIds: string[];
                excludedVariantIds: string[];
                excludedCategoryIds: string[];
                excludedBrandIds: string[];
            } | undefined;
            maxDiscount?: number | undefined;
        } | {
            value: number;
            type: "ITEM_FIXED_OFF";
            selector?: {
                productIds: string[];
                variantIds: string[];
                categoryIds: string[];
                brandIds: string[];
                excludedProductIds: string[];
                excludedVariantIds: string[];
                excludedCategoryIds: string[];
                excludedBrandIds: string[];
            } | undefined;
            maxDiscount?: number | undefined;
        } | {
            type: "FREE_SHIPPING";
        } | {
            type: "BUY_X_GET_Y";
            buyQuantity: number;
            rewardQuantity: number;
            rewardPercentOff: number;
            strategy: "CHEAPEST" | "HIGHEST";
            qualifier?: {
                productIds: string[];
                variantIds: string[];
                categoryIds: string[];
                brandIds: string[];
                excludedProductIds: string[];
                excludedVariantIds: string[];
                excludedCategoryIds: string[];
                excludedBrandIds: string[];
            } | undefined;
            reward?: {
                productIds: string[];
                variantIds: string[];
                categoryIds: string[];
                brandIds: string[];
                excludedProductIds: string[];
                excludedVariantIds: string[];
                excludedCategoryIds: string[];
                excludedBrandIds: string[];
            } | undefined;
        } | {
            type: "BUNDLE_PRICE";
            items: {
                quantity: number;
                variantId?: string | undefined;
                productId?: string | undefined;
            }[];
            price: number;
        } | {
            type: "QUANTITY_TIERS";
            tiers: {
                value: number;
                threshold: number;
            }[];
            selector?: {
                productIds: string[];
                variantIds: string[];
                categoryIds: string[];
                brandIds: string[];
                excludedProductIds: string[];
                excludedVariantIds: string[];
                excludedCategoryIds: string[];
                excludedBrandIds: string[];
            } | undefined;
        } | {
            type: "SPEND_TIERS";
            tiers: {
                value: number;
                threshold: number;
            }[];
        } | {
            type: "FREE_GIFT";
            quantity: number;
            variantIds: string[];
            customerChooses: boolean;
        })[];
        targets: {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
            customerIds: string[];
        };
        limits: {
            totalUses: number | null;
            usesPerCustomer: number | null;
            discountedUnits: number | null;
            maximumTotalDiscount: number | null;
        };
        display: {
            featured: boolean;
            badgeText: string | null;
            showCountdown: boolean;
            showOnOffers: boolean;
            bannerImageKey: string | null;
        };
        usedCount: number;
        coupons: {
            code: string;
            id: string;
            usedCount: number;
            usageLimitTotal: number | null;
        }[];
        discountGranted: number;
    }, {
        type: "FREE_SHIPPING" | "PRODUCT_DISCOUNT" | "CART_DISCOUNT" | "BUY_X_GET_Y" | "BUNDLE" | "QUANTITY_TIER" | "SPEND_TIER" | "FREE_GIFT" | "FLASH_SALE";
        status: "ACTIVE" | "EXPIRED" | "DRAFT" | "PAUSED" | "ARCHIVED" | "SCHEDULED" | "EXHAUSTED";
        id: string;
        createdAt: string;
        updatedAt: string;
        summary: string;
        name: string;
        discountedUnits: number;
        internalDescription: string | null;
        customerTitle: string;
        customerDescription: string | null;
        trigger: "AUTOMATIC" | "CODE";
        state: "ACTIVE" | "DRAFT" | "PAUSED" | "ARCHIVED";
        priority: number;
        stacking: "EXCLUSIVE" | "COMBINABLE" | "BEST_OFFER";
        combinableWith: string[];
        startsAt: string | null;
        endsAt: string | null;
        timezone: string;
        conditions: ({
            value: number;
            type: "QUANTITY";
            operator?: "GT" | "GTE" | "LT" | "LTE" | "EQ" | undefined;
            selector?: {
                productIds?: string[] | undefined;
                variantIds?: string[] | undefined;
                categoryIds?: string[] | undefined;
                brandIds?: string[] | undefined;
                excludedProductIds?: string[] | undefined;
                excludedVariantIds?: string[] | undefined;
                excludedCategoryIds?: string[] | undefined;
                excludedBrandIds?: string[] | undefined;
            } | undefined;
        } | {
            value: number;
            type: "SUBTOTAL";
            operator?: "GT" | "GTE" | "LT" | "LTE" | "EQ" | undefined;
        } | {
            type: "HAS_ITEMS";
            selector: {
                productIds?: string[] | undefined;
                variantIds?: string[] | undefined;
                categoryIds?: string[] | undefined;
                brandIds?: string[] | undefined;
                excludedProductIds?: string[] | undefined;
                excludedVariantIds?: string[] | undefined;
                excludedCategoryIds?: string[] | undefined;
                excludedBrandIds?: string[] | undefined;
            };
        } | {
            type: "MISSING_ITEMS";
            selector: {
                productIds?: string[] | undefined;
                variantIds?: string[] | undefined;
                categoryIds?: string[] | undefined;
                brandIds?: string[] | undefined;
                excludedProductIds?: string[] | undefined;
                excludedVariantIds?: string[] | undefined;
                excludedCategoryIds?: string[] | undefined;
                excludedBrandIds?: string[] | undefined;
            };
        } | {
            value: "EVERYONE" | "AUTHENTICATED" | "GUEST" | "FIRST_ORDER" | "RETURNING" | "VIP";
            type: "CUSTOMER_TYPE";
        } | {
            type: "CUSTOMER";
            customerIds: string[];
        } | {
            value: number;
            type: "PAST_ORDER_COUNT";
            operator?: "GT" | "GTE" | "LT" | "LTE" | "EQ" | undefined;
        } | {
            value: number;
            type: "LIFETIME_SPEND";
            operator?: "GT" | "GTE" | "LT" | "LTE" | "EQ" | undefined;
        } | {
            value: number;
            type: "INACTIVE_DAYS";
            operator?: "GT" | "GTE" | "LT" | "LTE" | "EQ" | undefined;
        } | {
            type: "COUPON_ENTERED";
            code?: string | undefined;
        } | {
            values: string[];
            type: "PAYMENT_METHOD";
        } | {
            values: string[];
            type: "GOVERNORATE";
        })[];
        actions: ({
            value: number;
            type: "PERCENT_OFF";
            selector?: {
                productIds?: string[] | undefined;
                variantIds?: string[] | undefined;
                categoryIds?: string[] | undefined;
                brandIds?: string[] | undefined;
                excludedProductIds?: string[] | undefined;
                excludedVariantIds?: string[] | undefined;
                excludedCategoryIds?: string[] | undefined;
                excludedBrandIds?: string[] | undefined;
            } | undefined;
            maxDiscount?: number | undefined;
        } | {
            value: number;
            type: "FIXED_OFF";
            selector?: {
                productIds?: string[] | undefined;
                variantIds?: string[] | undefined;
                categoryIds?: string[] | undefined;
                brandIds?: string[] | undefined;
                excludedProductIds?: string[] | undefined;
                excludedVariantIds?: string[] | undefined;
                excludedCategoryIds?: string[] | undefined;
                excludedBrandIds?: string[] | undefined;
            } | undefined;
            maxDiscount?: number | undefined;
        } | {
            type: "PRICE_OVERRIDE";
            price: number;
            selector?: {
                productIds?: string[] | undefined;
                variantIds?: string[] | undefined;
                categoryIds?: string[] | undefined;
                brandIds?: string[] | undefined;
                excludedProductIds?: string[] | undefined;
                excludedVariantIds?: string[] | undefined;
                excludedCategoryIds?: string[] | undefined;
                excludedBrandIds?: string[] | undefined;
            } | undefined;
        } | {
            type: "CHEAPEST_FREE";
            quantity?: number | undefined;
            selector?: {
                productIds?: string[] | undefined;
                variantIds?: string[] | undefined;
                categoryIds?: string[] | undefined;
                brandIds?: string[] | undefined;
                excludedProductIds?: string[] | undefined;
                excludedVariantIds?: string[] | undefined;
                excludedCategoryIds?: string[] | undefined;
                excludedBrandIds?: string[] | undefined;
            } | undefined;
        } | {
            value: number;
            type: "ITEM_PERCENT_OFF";
            selector?: {
                productIds?: string[] | undefined;
                variantIds?: string[] | undefined;
                categoryIds?: string[] | undefined;
                brandIds?: string[] | undefined;
                excludedProductIds?: string[] | undefined;
                excludedVariantIds?: string[] | undefined;
                excludedCategoryIds?: string[] | undefined;
                excludedBrandIds?: string[] | undefined;
            } | undefined;
            maxDiscount?: number | undefined;
        } | {
            value: number;
            type: "ITEM_FIXED_OFF";
            selector?: {
                productIds?: string[] | undefined;
                variantIds?: string[] | undefined;
                categoryIds?: string[] | undefined;
                brandIds?: string[] | undefined;
                excludedProductIds?: string[] | undefined;
                excludedVariantIds?: string[] | undefined;
                excludedCategoryIds?: string[] | undefined;
                excludedBrandIds?: string[] | undefined;
            } | undefined;
            maxDiscount?: number | undefined;
        } | {
            type: "FREE_SHIPPING";
        } | {
            type: "BUY_X_GET_Y";
            buyQuantity: number;
            rewardQuantity?: number | undefined;
            rewardPercentOff?: number | undefined;
            qualifier?: {
                productIds?: string[] | undefined;
                variantIds?: string[] | undefined;
                categoryIds?: string[] | undefined;
                brandIds?: string[] | undefined;
                excludedProductIds?: string[] | undefined;
                excludedVariantIds?: string[] | undefined;
                excludedCategoryIds?: string[] | undefined;
                excludedBrandIds?: string[] | undefined;
            } | undefined;
            reward?: {
                productIds?: string[] | undefined;
                variantIds?: string[] | undefined;
                categoryIds?: string[] | undefined;
                brandIds?: string[] | undefined;
                excludedProductIds?: string[] | undefined;
                excludedVariantIds?: string[] | undefined;
                excludedCategoryIds?: string[] | undefined;
                excludedBrandIds?: string[] | undefined;
            } | undefined;
            strategy?: "CHEAPEST" | "HIGHEST" | undefined;
        } | {
            type: "BUNDLE_PRICE";
            items: {
                quantity: number;
                variantId?: string | undefined;
                productId?: string | undefined;
            }[];
            price: number;
        } | {
            type: "QUANTITY_TIERS";
            tiers: {
                value: number;
                threshold: number;
            }[];
            selector?: {
                productIds?: string[] | undefined;
                variantIds?: string[] | undefined;
                categoryIds?: string[] | undefined;
                brandIds?: string[] | undefined;
                excludedProductIds?: string[] | undefined;
                excludedVariantIds?: string[] | undefined;
                excludedCategoryIds?: string[] | undefined;
                excludedBrandIds?: string[] | undefined;
            } | undefined;
        } | {
            type: "SPEND_TIERS";
            tiers: {
                value: number;
                threshold: number;
            }[];
        } | {
            type: "FREE_GIFT";
            variantIds: string[];
            quantity?: number | undefined;
            customerChooses?: boolean | undefined;
        })[];
        targets: {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
            customerIds?: string[] | undefined;
        };
        usedCount: number;
        coupons: {
            code: string;
            id: string;
            usedCount: number;
            usageLimitTotal: number | null;
        }[];
        discountGranted: number;
        limits?: {
            totalUses?: number | null | undefined;
            usesPerCustomer?: number | null | undefined;
            discountedUnits?: number | null | undefined;
            maximumTotalDiscount?: number | null | undefined;
        } | undefined;
        display?: {
            featured?: boolean | undefined;
            badgeText?: string | null | undefined;
            showCountdown?: boolean | undefined;
            showOnOffers?: boolean | undefined;
            bannerImageKey?: string | null | undefined;
        } | undefined;
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
        type: "FREE_SHIPPING" | "PRODUCT_DISCOUNT" | "CART_DISCOUNT" | "BUY_X_GET_Y" | "BUNDLE" | "QUANTITY_TIER" | "SPEND_TIER" | "FREE_GIFT" | "FLASH_SALE";
        status: "ACTIVE" | "EXPIRED" | "DRAFT" | "PAUSED" | "ARCHIVED" | "SCHEDULED" | "EXHAUSTED";
        id: string;
        createdAt: string;
        updatedAt: string;
        summary: string;
        name: string;
        discountedUnits: number;
        internalDescription: string | null;
        customerTitle: string;
        customerDescription: string | null;
        trigger: "AUTOMATIC" | "CODE";
        state: "ACTIVE" | "DRAFT" | "PAUSED" | "ARCHIVED";
        priority: number;
        stacking: "EXCLUSIVE" | "COMBINABLE" | "BEST_OFFER";
        combinableWith: string[];
        startsAt: string | null;
        endsAt: string | null;
        timezone: string;
        conditions: ({
            value: number;
            type: "QUANTITY";
            operator: "GT" | "GTE" | "LT" | "LTE" | "EQ";
            selector?: {
                productIds: string[];
                variantIds: string[];
                categoryIds: string[];
                brandIds: string[];
                excludedProductIds: string[];
                excludedVariantIds: string[];
                excludedCategoryIds: string[];
                excludedBrandIds: string[];
            } | undefined;
        } | {
            value: number;
            type: "SUBTOTAL";
            operator: "GT" | "GTE" | "LT" | "LTE" | "EQ";
        } | {
            type: "HAS_ITEMS";
            selector: {
                productIds: string[];
                variantIds: string[];
                categoryIds: string[];
                brandIds: string[];
                excludedProductIds: string[];
                excludedVariantIds: string[];
                excludedCategoryIds: string[];
                excludedBrandIds: string[];
            };
        } | {
            type: "MISSING_ITEMS";
            selector: {
                productIds: string[];
                variantIds: string[];
                categoryIds: string[];
                brandIds: string[];
                excludedProductIds: string[];
                excludedVariantIds: string[];
                excludedCategoryIds: string[];
                excludedBrandIds: string[];
            };
        } | {
            value: "EVERYONE" | "AUTHENTICATED" | "GUEST" | "FIRST_ORDER" | "RETURNING" | "VIP";
            type: "CUSTOMER_TYPE";
        } | {
            type: "CUSTOMER";
            customerIds: string[];
        } | {
            value: number;
            type: "PAST_ORDER_COUNT";
            operator: "GT" | "GTE" | "LT" | "LTE" | "EQ";
        } | {
            value: number;
            type: "LIFETIME_SPEND";
            operator: "GT" | "GTE" | "LT" | "LTE" | "EQ";
        } | {
            value: number;
            type: "INACTIVE_DAYS";
            operator: "GT" | "GTE" | "LT" | "LTE" | "EQ";
        } | {
            type: "COUPON_ENTERED";
            code?: string | undefined;
        } | {
            values: string[];
            type: "PAYMENT_METHOD";
        } | {
            values: string[];
            type: "GOVERNORATE";
        })[];
        actions: ({
            value: number;
            type: "PERCENT_OFF";
            selector?: {
                productIds: string[];
                variantIds: string[];
                categoryIds: string[];
                brandIds: string[];
                excludedProductIds: string[];
                excludedVariantIds: string[];
                excludedCategoryIds: string[];
                excludedBrandIds: string[];
            } | undefined;
            maxDiscount?: number | undefined;
        } | {
            value: number;
            type: "FIXED_OFF";
            selector?: {
                productIds: string[];
                variantIds: string[];
                categoryIds: string[];
                brandIds: string[];
                excludedProductIds: string[];
                excludedVariantIds: string[];
                excludedCategoryIds: string[];
                excludedBrandIds: string[];
            } | undefined;
            maxDiscount?: number | undefined;
        } | {
            type: "PRICE_OVERRIDE";
            price: number;
            selector?: {
                productIds: string[];
                variantIds: string[];
                categoryIds: string[];
                brandIds: string[];
                excludedProductIds: string[];
                excludedVariantIds: string[];
                excludedCategoryIds: string[];
                excludedBrandIds: string[];
            } | undefined;
        } | {
            type: "CHEAPEST_FREE";
            quantity: number;
            selector?: {
                productIds: string[];
                variantIds: string[];
                categoryIds: string[];
                brandIds: string[];
                excludedProductIds: string[];
                excludedVariantIds: string[];
                excludedCategoryIds: string[];
                excludedBrandIds: string[];
            } | undefined;
        } | {
            value: number;
            type: "ITEM_PERCENT_OFF";
            selector?: {
                productIds: string[];
                variantIds: string[];
                categoryIds: string[];
                brandIds: string[];
                excludedProductIds: string[];
                excludedVariantIds: string[];
                excludedCategoryIds: string[];
                excludedBrandIds: string[];
            } | undefined;
            maxDiscount?: number | undefined;
        } | {
            value: number;
            type: "ITEM_FIXED_OFF";
            selector?: {
                productIds: string[];
                variantIds: string[];
                categoryIds: string[];
                brandIds: string[];
                excludedProductIds: string[];
                excludedVariantIds: string[];
                excludedCategoryIds: string[];
                excludedBrandIds: string[];
            } | undefined;
            maxDiscount?: number | undefined;
        } | {
            type: "FREE_SHIPPING";
        } | {
            type: "BUY_X_GET_Y";
            buyQuantity: number;
            rewardQuantity: number;
            rewardPercentOff: number;
            strategy: "CHEAPEST" | "HIGHEST";
            qualifier?: {
                productIds: string[];
                variantIds: string[];
                categoryIds: string[];
                brandIds: string[];
                excludedProductIds: string[];
                excludedVariantIds: string[];
                excludedCategoryIds: string[];
                excludedBrandIds: string[];
            } | undefined;
            reward?: {
                productIds: string[];
                variantIds: string[];
                categoryIds: string[];
                brandIds: string[];
                excludedProductIds: string[];
                excludedVariantIds: string[];
                excludedCategoryIds: string[];
                excludedBrandIds: string[];
            } | undefined;
        } | {
            type: "BUNDLE_PRICE";
            items: {
                quantity: number;
                variantId?: string | undefined;
                productId?: string | undefined;
            }[];
            price: number;
        } | {
            type: "QUANTITY_TIERS";
            tiers: {
                value: number;
                threshold: number;
            }[];
            selector?: {
                productIds: string[];
                variantIds: string[];
                categoryIds: string[];
                brandIds: string[];
                excludedProductIds: string[];
                excludedVariantIds: string[];
                excludedCategoryIds: string[];
                excludedBrandIds: string[];
            } | undefined;
        } | {
            type: "SPEND_TIERS";
            tiers: {
                value: number;
                threshold: number;
            }[];
        } | {
            type: "FREE_GIFT";
            quantity: number;
            variantIds: string[];
            customerChooses: boolean;
        })[];
        targets: {
            productIds: string[];
            variantIds: string[];
            categoryIds: string[];
            brandIds: string[];
            excludedProductIds: string[];
            excludedVariantIds: string[];
            excludedCategoryIds: string[];
            excludedBrandIds: string[];
            customerIds: string[];
        };
        limits: {
            totalUses: number | null;
            usesPerCustomer: number | null;
            discountedUnits: number | null;
            maximumTotalDiscount: number | null;
        };
        display: {
            featured: boolean;
            badgeText: string | null;
            showCountdown: boolean;
            showOnOffers: boolean;
            bannerImageKey: string | null;
        };
        usedCount: number;
        coupons: {
            code: string;
            id: string;
            usedCount: number;
            usageLimitTotal: number | null;
        }[];
        discountGranted: number;
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
        type: "FREE_SHIPPING" | "PRODUCT_DISCOUNT" | "CART_DISCOUNT" | "BUY_X_GET_Y" | "BUNDLE" | "QUANTITY_TIER" | "SPEND_TIER" | "FREE_GIFT" | "FLASH_SALE";
        status: "ACTIVE" | "EXPIRED" | "DRAFT" | "PAUSED" | "ARCHIVED" | "SCHEDULED" | "EXHAUSTED";
        id: string;
        createdAt: string;
        updatedAt: string;
        summary: string;
        name: string;
        discountedUnits: number;
        internalDescription: string | null;
        customerTitle: string;
        customerDescription: string | null;
        trigger: "AUTOMATIC" | "CODE";
        state: "ACTIVE" | "DRAFT" | "PAUSED" | "ARCHIVED";
        priority: number;
        stacking: "EXCLUSIVE" | "COMBINABLE" | "BEST_OFFER";
        combinableWith: string[];
        startsAt: string | null;
        endsAt: string | null;
        timezone: string;
        conditions: ({
            value: number;
            type: "QUANTITY";
            operator?: "GT" | "GTE" | "LT" | "LTE" | "EQ" | undefined;
            selector?: {
                productIds?: string[] | undefined;
                variantIds?: string[] | undefined;
                categoryIds?: string[] | undefined;
                brandIds?: string[] | undefined;
                excludedProductIds?: string[] | undefined;
                excludedVariantIds?: string[] | undefined;
                excludedCategoryIds?: string[] | undefined;
                excludedBrandIds?: string[] | undefined;
            } | undefined;
        } | {
            value: number;
            type: "SUBTOTAL";
            operator?: "GT" | "GTE" | "LT" | "LTE" | "EQ" | undefined;
        } | {
            type: "HAS_ITEMS";
            selector: {
                productIds?: string[] | undefined;
                variantIds?: string[] | undefined;
                categoryIds?: string[] | undefined;
                brandIds?: string[] | undefined;
                excludedProductIds?: string[] | undefined;
                excludedVariantIds?: string[] | undefined;
                excludedCategoryIds?: string[] | undefined;
                excludedBrandIds?: string[] | undefined;
            };
        } | {
            type: "MISSING_ITEMS";
            selector: {
                productIds?: string[] | undefined;
                variantIds?: string[] | undefined;
                categoryIds?: string[] | undefined;
                brandIds?: string[] | undefined;
                excludedProductIds?: string[] | undefined;
                excludedVariantIds?: string[] | undefined;
                excludedCategoryIds?: string[] | undefined;
                excludedBrandIds?: string[] | undefined;
            };
        } | {
            value: "EVERYONE" | "AUTHENTICATED" | "GUEST" | "FIRST_ORDER" | "RETURNING" | "VIP";
            type: "CUSTOMER_TYPE";
        } | {
            type: "CUSTOMER";
            customerIds: string[];
        } | {
            value: number;
            type: "PAST_ORDER_COUNT";
            operator?: "GT" | "GTE" | "LT" | "LTE" | "EQ" | undefined;
        } | {
            value: number;
            type: "LIFETIME_SPEND";
            operator?: "GT" | "GTE" | "LT" | "LTE" | "EQ" | undefined;
        } | {
            value: number;
            type: "INACTIVE_DAYS";
            operator?: "GT" | "GTE" | "LT" | "LTE" | "EQ" | undefined;
        } | {
            type: "COUPON_ENTERED";
            code?: string | undefined;
        } | {
            values: string[];
            type: "PAYMENT_METHOD";
        } | {
            values: string[];
            type: "GOVERNORATE";
        })[];
        actions: ({
            value: number;
            type: "PERCENT_OFF";
            selector?: {
                productIds?: string[] | undefined;
                variantIds?: string[] | undefined;
                categoryIds?: string[] | undefined;
                brandIds?: string[] | undefined;
                excludedProductIds?: string[] | undefined;
                excludedVariantIds?: string[] | undefined;
                excludedCategoryIds?: string[] | undefined;
                excludedBrandIds?: string[] | undefined;
            } | undefined;
            maxDiscount?: number | undefined;
        } | {
            value: number;
            type: "FIXED_OFF";
            selector?: {
                productIds?: string[] | undefined;
                variantIds?: string[] | undefined;
                categoryIds?: string[] | undefined;
                brandIds?: string[] | undefined;
                excludedProductIds?: string[] | undefined;
                excludedVariantIds?: string[] | undefined;
                excludedCategoryIds?: string[] | undefined;
                excludedBrandIds?: string[] | undefined;
            } | undefined;
            maxDiscount?: number | undefined;
        } | {
            type: "PRICE_OVERRIDE";
            price: number;
            selector?: {
                productIds?: string[] | undefined;
                variantIds?: string[] | undefined;
                categoryIds?: string[] | undefined;
                brandIds?: string[] | undefined;
                excludedProductIds?: string[] | undefined;
                excludedVariantIds?: string[] | undefined;
                excludedCategoryIds?: string[] | undefined;
                excludedBrandIds?: string[] | undefined;
            } | undefined;
        } | {
            type: "CHEAPEST_FREE";
            quantity?: number | undefined;
            selector?: {
                productIds?: string[] | undefined;
                variantIds?: string[] | undefined;
                categoryIds?: string[] | undefined;
                brandIds?: string[] | undefined;
                excludedProductIds?: string[] | undefined;
                excludedVariantIds?: string[] | undefined;
                excludedCategoryIds?: string[] | undefined;
                excludedBrandIds?: string[] | undefined;
            } | undefined;
        } | {
            value: number;
            type: "ITEM_PERCENT_OFF";
            selector?: {
                productIds?: string[] | undefined;
                variantIds?: string[] | undefined;
                categoryIds?: string[] | undefined;
                brandIds?: string[] | undefined;
                excludedProductIds?: string[] | undefined;
                excludedVariantIds?: string[] | undefined;
                excludedCategoryIds?: string[] | undefined;
                excludedBrandIds?: string[] | undefined;
            } | undefined;
            maxDiscount?: number | undefined;
        } | {
            value: number;
            type: "ITEM_FIXED_OFF";
            selector?: {
                productIds?: string[] | undefined;
                variantIds?: string[] | undefined;
                categoryIds?: string[] | undefined;
                brandIds?: string[] | undefined;
                excludedProductIds?: string[] | undefined;
                excludedVariantIds?: string[] | undefined;
                excludedCategoryIds?: string[] | undefined;
                excludedBrandIds?: string[] | undefined;
            } | undefined;
            maxDiscount?: number | undefined;
        } | {
            type: "FREE_SHIPPING";
        } | {
            type: "BUY_X_GET_Y";
            buyQuantity: number;
            rewardQuantity?: number | undefined;
            rewardPercentOff?: number | undefined;
            qualifier?: {
                productIds?: string[] | undefined;
                variantIds?: string[] | undefined;
                categoryIds?: string[] | undefined;
                brandIds?: string[] | undefined;
                excludedProductIds?: string[] | undefined;
                excludedVariantIds?: string[] | undefined;
                excludedCategoryIds?: string[] | undefined;
                excludedBrandIds?: string[] | undefined;
            } | undefined;
            reward?: {
                productIds?: string[] | undefined;
                variantIds?: string[] | undefined;
                categoryIds?: string[] | undefined;
                brandIds?: string[] | undefined;
                excludedProductIds?: string[] | undefined;
                excludedVariantIds?: string[] | undefined;
                excludedCategoryIds?: string[] | undefined;
                excludedBrandIds?: string[] | undefined;
            } | undefined;
            strategy?: "CHEAPEST" | "HIGHEST" | undefined;
        } | {
            type: "BUNDLE_PRICE";
            items: {
                quantity: number;
                variantId?: string | undefined;
                productId?: string | undefined;
            }[];
            price: number;
        } | {
            type: "QUANTITY_TIERS";
            tiers: {
                value: number;
                threshold: number;
            }[];
            selector?: {
                productIds?: string[] | undefined;
                variantIds?: string[] | undefined;
                categoryIds?: string[] | undefined;
                brandIds?: string[] | undefined;
                excludedProductIds?: string[] | undefined;
                excludedVariantIds?: string[] | undefined;
                excludedCategoryIds?: string[] | undefined;
                excludedBrandIds?: string[] | undefined;
            } | undefined;
        } | {
            type: "SPEND_TIERS";
            tiers: {
                value: number;
                threshold: number;
            }[];
        } | {
            type: "FREE_GIFT";
            variantIds: string[];
            quantity?: number | undefined;
            customerChooses?: boolean | undefined;
        })[];
        targets: {
            productIds?: string[] | undefined;
            variantIds?: string[] | undefined;
            categoryIds?: string[] | undefined;
            brandIds?: string[] | undefined;
            excludedProductIds?: string[] | undefined;
            excludedVariantIds?: string[] | undefined;
            excludedCategoryIds?: string[] | undefined;
            excludedBrandIds?: string[] | undefined;
            customerIds?: string[] | undefined;
        };
        usedCount: number;
        coupons: {
            code: string;
            id: string;
            usedCount: number;
            usageLimitTotal: number | null;
        }[];
        discountGranted: number;
        limits?: {
            totalUses?: number | null | undefined;
            usesPerCustomer?: number | null | undefined;
            discountedUnits?: number | null | undefined;
            maximumTotalDiscount?: number | null | undefined;
        } | undefined;
        display?: {
            featured?: boolean | undefined;
            badgeText?: string | null | undefined;
            showCountdown?: boolean | undefined;
            showOnOffers?: boolean | undefined;
            bannerImageKey?: string | null | undefined;
        } | undefined;
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
export declare const promotionAnalyticsSchema: z.ZodObject<{
    promotionId: z.ZodString;
    redemptions: z.ZodNumber;
    uniqueCustomers: z.ZodNumber;
    generatedOrders: z.ZodNumber;
    revenue: z.ZodNumber;
    discountGranted: z.ZodNumber;
    averageOrderValue: z.ZodNumber;
    remainingUses: z.ZodNullable<z.ZodNumber>;
    usageByDate: z.ZodArray<z.ZodObject<{
        date: z.ZodString;
        redemptions: z.ZodNumber;
        revenue: z.ZodNumber;
        discount: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        date: string;
        discount: number;
        revenue: number;
        redemptions: number;
    }, {
        date: string;
        discount: number;
        revenue: number;
        redemptions: number;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    averageOrderValue: number;
    promotionId: string;
    revenue: number;
    discountGranted: number;
    redemptions: number;
    uniqueCustomers: number;
    generatedOrders: number;
    remainingUses: number | null;
    usageByDate: {
        date: string;
        discount: number;
        revenue: number;
        redemptions: number;
    }[];
}, {
    averageOrderValue: number;
    promotionId: string;
    revenue: number;
    discountGranted: number;
    redemptions: number;
    uniqueCustomers: number;
    generatedOrders: number;
    remainingUses: number | null;
    usageByDate: {
        date: string;
        discount: number;
        revenue: number;
        redemptions: number;
    }[];
}>;
export type PromotionType = z.infer<typeof promotionTypeEnum>;
export type PromotionResolvedStatus = z.infer<typeof promotionResolvedStatusEnum>;
//# sourceMappingURL=promotion.schema.d.ts.map