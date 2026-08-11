import { z } from "zod";
export declare const cartOwnerEnum: z.ZodEnum<["GUEST", "USER"]>;
export type CartOwner = z.infer<typeof cartOwnerEnum>;
export declare const cartItemStatusEnum: z.ZodEnum<["AVAILABLE", "OUT_OF_STOCK", "NOT_SELLABLE"]>;
export type CartItemStatus = z.infer<typeof cartItemStatusEnum>;
export declare const addCartItemSchema: z.ZodObject<
  {
    variantId: z.ZodString;
    quantity: z.ZodDefault<z.ZodNumber>;
  },
  "strict",
  z.ZodTypeAny,
  {
    variantId: string;
    quantity: number;
  },
  {
    variantId: string;
    quantity?: number | undefined;
  }
>;
export type AddCartItemInput = z.infer<typeof addCartItemSchema>;
export declare const updateCartItemSchema: z.ZodObject<
  {
    quantity: z.ZodNumber;
  },
  "strict",
  z.ZodTypeAny,
  {
    quantity: number;
  },
  {
    quantity: number;
  }
>;
export type UpdateCartItemInput = z.infer<typeof updateCartItemSchema>;
export declare const cartItemSchema: z.ZodObject<
  {
    variantId: z.ZodString;
    productId: z.ZodString;
    slug: z.ZodString;
    productNameEn: z.ZodString;
    productNameAr: z.ZodString;
    variantNameEn: z.ZodString;
    variantNameAr: z.ZodString;
    sku: z.ZodString;
    imageUrl: z.ZodNullable<z.ZodString>;
    categoryId: z.ZodString;
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
  },
  "strip",
  z.ZodTypeAny,
  {
    issues: string[];
    status: "AVAILABLE" | "OUT_OF_STOCK" | "NOT_SELLABLE";
    variantId: string;
    quantity: number;
    productId: string;
    sku: string;
    discount: number;
    imageUrl: string | null;
    slug: string;
    categoryId: string;
    brandId: string | null;
    unitPrice: number;
    discountedLineTotal: number;
    productNameEn: string;
    productNameAr: string;
    variantNameEn: string;
    variantNameAr: string;
    lineTotal: number;
    available: number;
    maxAvailable: number;
  },
  {
    issues: string[];
    status: "AVAILABLE" | "OUT_OF_STOCK" | "NOT_SELLABLE";
    variantId: string;
    quantity: number;
    productId: string;
    sku: string;
    discount: number;
    imageUrl: string | null;
    slug: string;
    categoryId: string;
    brandId: string | null;
    unitPrice: number;
    discountedLineTotal: number;
    productNameEn: string;
    productNameAr: string;
    variantNameEn: string;
    variantNameAr: string;
    lineTotal: number;
    available: number;
    maxAvailable: number;
  }
>;
export type CartItemResponse = z.infer<typeof cartItemSchema>;
export declare const cartSchema: z.ZodObject<
  {
    cartId: z.ZodNullable<z.ZodString>;
    owner: z.ZodEnum<["GUEST", "USER"]>;
    items: z.ZodArray<
      z.ZodObject<
        {
          variantId: z.ZodString;
          productId: z.ZodString;
          slug: z.ZodString;
          productNameEn: z.ZodString;
          productNameAr: z.ZodString;
          variantNameEn: z.ZodString;
          variantNameAr: z.ZodString;
          sku: z.ZodString;
          imageUrl: z.ZodNullable<z.ZodString>;
          categoryId: z.ZodString;
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
        },
        "strip",
        z.ZodTypeAny,
        {
          issues: string[];
          status: "AVAILABLE" | "OUT_OF_STOCK" | "NOT_SELLABLE";
          variantId: string;
          quantity: number;
          productId: string;
          sku: string;
          discount: number;
          imageUrl: string | null;
          slug: string;
          categoryId: string;
          brandId: string | null;
          unitPrice: number;
          discountedLineTotal: number;
          productNameEn: string;
          productNameAr: string;
          variantNameEn: string;
          variantNameAr: string;
          lineTotal: number;
          available: number;
          maxAvailable: number;
        },
        {
          issues: string[];
          status: "AVAILABLE" | "OUT_OF_STOCK" | "NOT_SELLABLE";
          variantId: string;
          quantity: number;
          productId: string;
          sku: string;
          discount: number;
          imageUrl: string | null;
          slug: string;
          categoryId: string;
          brandId: string | null;
          unitPrice: number;
          discountedLineTotal: number;
          productNameEn: string;
          productNameAr: string;
          variantNameEn: string;
          variantNameAr: string;
          lineTotal: number;
          available: number;
          maxAvailable: number;
        }
      >,
      "many"
    >;
    subtotal: z.ZodNumber;
    discountTotal: z.ZodNumber;
    estimatedTotal: z.ZodNumber;
    totalSavings: z.ZodNumber;
    couponCode: z.ZodNullable<z.ZodString>;
    appliedPromotions: z.ZodArray<
      z.ZodObject<
        {
          id: z.ZodString;
          name: z.ZodString;
          title: z.ZodString;
          type: z.ZodEnum<
            [
              "PRODUCT_DISCOUNT",
              "CART_DISCOUNT",
              "BUY_X_GET_Y",
              "BUNDLE",
              "QUANTITY_TIER",
              "SPEND_TIER",
              "FREE_SHIPPING",
              "FREE_GIFT",
              "FLASH_SALE",
            ]
          >;
          couponCode: z.ZodNullable<z.ZodString>;
          discountAmount: z.ZodNumber;
          shippingDiscount: z.ZodNumber;
          discountedUnits: z.ZodNumber;
          message: z.ZodString;
        },
        "strip",
        z.ZodTypeAny,
        {
          message: string;
          type:
            | "FREE_SHIPPING"
            | "PRODUCT_DISCOUNT"
            | "CART_DISCOUNT"
            | "BUY_X_GET_Y"
            | "BUNDLE"
            | "QUANTITY_TIER"
            | "SPEND_TIER"
            | "FREE_GIFT"
            | "FLASH_SALE";
          id: string;
          name: string;
          couponCode: string | null;
          shippingDiscount: number;
          discountAmount: number;
          discountedUnits: number;
          title: string;
        },
        {
          message: string;
          type:
            | "FREE_SHIPPING"
            | "PRODUCT_DISCOUNT"
            | "CART_DISCOUNT"
            | "BUY_X_GET_Y"
            | "BUNDLE"
            | "QUANTITY_TIER"
            | "SPEND_TIER"
            | "FREE_GIFT"
            | "FLASH_SALE";
          id: string;
          name: string;
          couponCode: string | null;
          shippingDiscount: number;
          discountAmount: number;
          discountedUnits: number;
          title: string;
        }
      >,
      "many"
    >;
    promotionMessages: z.ZodArray<z.ZodString, "many">;
    giftOptions: z.ZodArray<
      z.ZodObject<
        {
          variantId: z.ZodString;
          quantity: z.ZodNumber;
          customerChooses: z.ZodBoolean;
          promotionId: z.ZodString;
        },
        "strip",
        z.ZodTypeAny,
        {
          variantId: string;
          quantity: number;
          promotionId: string;
          customerChooses: boolean;
        },
        {
          variantId: string;
          quantity: number;
          promotionId: string;
          customerChooses: boolean;
        }
      >,
      "many"
    >;
    totalQuantity: z.ZodNumber;
    hasIssues: z.ZodBoolean;
    updatedAt: z.ZodString;
  },
  "strip",
  z.ZodTypeAny,
  {
    updatedAt: string;
    items: {
      issues: string[];
      status: "AVAILABLE" | "OUT_OF_STOCK" | "NOT_SELLABLE";
      variantId: string;
      quantity: number;
      productId: string;
      sku: string;
      discount: number;
      imageUrl: string | null;
      slug: string;
      categoryId: string;
      brandId: string | null;
      unitPrice: number;
      discountedLineTotal: number;
      productNameEn: string;
      productNameAr: string;
      variantNameEn: string;
      variantNameAr: string;
      lineTotal: number;
      available: number;
      maxAvailable: number;
    }[];
    couponCode: string | null;
    subtotal: number;
    totalSavings: number;
    appliedPromotions: {
      message: string;
      type:
        | "FREE_SHIPPING"
        | "PRODUCT_DISCOUNT"
        | "CART_DISCOUNT"
        | "BUY_X_GET_Y"
        | "BUNDLE"
        | "QUANTITY_TIER"
        | "SPEND_TIER"
        | "FREE_GIFT"
        | "FLASH_SALE";
      id: string;
      name: string;
      couponCode: string | null;
      shippingDiscount: number;
      discountAmount: number;
      discountedUnits: number;
      title: string;
    }[];
    cartId: string | null;
    owner: "GUEST" | "USER";
    discountTotal: number;
    estimatedTotal: number;
    promotionMessages: string[];
    giftOptions: {
      variantId: string;
      quantity: number;
      promotionId: string;
      customerChooses: boolean;
    }[];
    totalQuantity: number;
    hasIssues: boolean;
  },
  {
    updatedAt: string;
    items: {
      issues: string[];
      status: "AVAILABLE" | "OUT_OF_STOCK" | "NOT_SELLABLE";
      variantId: string;
      quantity: number;
      productId: string;
      sku: string;
      discount: number;
      imageUrl: string | null;
      slug: string;
      categoryId: string;
      brandId: string | null;
      unitPrice: number;
      discountedLineTotal: number;
      productNameEn: string;
      productNameAr: string;
      variantNameEn: string;
      variantNameAr: string;
      lineTotal: number;
      available: number;
      maxAvailable: number;
    }[];
    couponCode: string | null;
    subtotal: number;
    totalSavings: number;
    appliedPromotions: {
      message: string;
      type:
        | "FREE_SHIPPING"
        | "PRODUCT_DISCOUNT"
        | "CART_DISCOUNT"
        | "BUY_X_GET_Y"
        | "BUNDLE"
        | "QUANTITY_TIER"
        | "SPEND_TIER"
        | "FREE_GIFT"
        | "FLASH_SALE";
      id: string;
      name: string;
      couponCode: string | null;
      shippingDiscount: number;
      discountAmount: number;
      discountedUnits: number;
      title: string;
    }[];
    cartId: string | null;
    owner: "GUEST" | "USER";
    discountTotal: number;
    estimatedTotal: number;
    promotionMessages: string[];
    giftOptions: {
      variantId: string;
      quantity: number;
      promotionId: string;
      customerChooses: boolean;
    }[];
    totalQuantity: number;
    hasIssues: boolean;
  }
>;
export type CartResponse = z.infer<typeof cartSchema>;
//# sourceMappingURL=cart.schema.d.ts.map
