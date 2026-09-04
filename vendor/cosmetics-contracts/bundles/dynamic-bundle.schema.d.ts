import { z } from "zod";
export declare const dynamicBundleStateSchema: z.ZodEnum<["DRAFT", "ACTIVE", "PAUSED", "ARCHIVED"]>;
export declare const dynamicBundleTypeSchema: z.ZodEnum<["FIXED", "DYNAMIC"]>;
export declare const bundleRuleSchema: z.ZodEffects<z.ZodObject<{
    id: z.ZodString;
    field: z.ZodEnum<["CATEGORY", "BRAND", "PRODUCT", "TAG", "ROUTINE_ROLE", "VARIANT"]>;
    operator: z.ZodEnum<["IS", "IS_NOT", "INCLUDES_DESCENDANTS"]>;
    values: z.ZodArray<z.ZodUnion<[z.ZodString, z.ZodString]>, "many">;
}, "strict", z.ZodTypeAny, {
    values: string[];
    id: string;
    operator: "IS" | "IS_NOT" | "INCLUDES_DESCENDANTS";
    field: "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "ROUTINE_ROLE";
}, {
    values: string[];
    id: string;
    operator: "IS" | "IS_NOT" | "INCLUDES_DESCENDANTS";
    field: "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "ROUTINE_ROLE";
}>, {
    values: string[];
    id: string;
    operator: "IS" | "IS_NOT" | "INCLUDES_DESCENDANTS";
    field: "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "ROUTINE_ROLE";
}, {
    values: string[];
    id: string;
    operator: "IS" | "IS_NOT" | "INCLUDES_DESCENDANTS";
    field: "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "ROUTINE_ROLE";
}>;
export declare const bundleSlotSchema: z.ZodEffects<z.ZodObject<{
    id: z.ZodString;
    key: z.ZodString;
    internalName: z.ZodString;
    label: z.ZodObject<{
        en: z.ZodDefault<z.ZodString>;
        ar: z.ZodDefault<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        en: string;
        ar: string;
    }, {
        en?: string | undefined;
        ar?: string | undefined;
    }>;
    description: z.ZodObject<{
        en: z.ZodDefault<z.ZodString>;
        ar: z.ZodDefault<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        en: string;
        ar: string;
    }, {
        en?: string | undefined;
        ar?: string | undefined;
    }>;
    required: z.ZodDefault<z.ZodBoolean>;
    quantity: z.ZodObject<{
        minimum: z.ZodNumber;
        maximum: z.ZodNumber;
    }, "strict", z.ZodTypeAny, {
        minimum: number;
        maximum: number;
    }, {
        minimum: number;
        maximum: number;
    }>;
    mode: z.ZodEnum<["RULE_BASED", "CURATED", "HYBRID"]>;
    match: z.ZodDefault<z.ZodEnum<["ALL", "ANY"]>>;
    rules: z.ZodDefault<z.ZodArray<z.ZodEffects<z.ZodObject<{
        id: z.ZodString;
        field: z.ZodEnum<["CATEGORY", "BRAND", "PRODUCT", "TAG", "ROUTINE_ROLE", "VARIANT"]>;
        operator: z.ZodEnum<["IS", "IS_NOT", "INCLUDES_DESCENDANTS"]>;
        values: z.ZodArray<z.ZodUnion<[z.ZodString, z.ZodString]>, "many">;
    }, "strict", z.ZodTypeAny, {
        values: string[];
        id: string;
        operator: "IS" | "IS_NOT" | "INCLUDES_DESCENDANTS";
        field: "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "ROUTINE_ROLE";
    }, {
        values: string[];
        id: string;
        operator: "IS" | "IS_NOT" | "INCLUDES_DESCENDANTS";
        field: "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "ROUTINE_ROLE";
    }>, {
        values: string[];
        id: string;
        operator: "IS" | "IS_NOT" | "INCLUDES_DESCENDANTS";
        field: "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "ROUTINE_ROLE";
    }, {
        values: string[];
        id: string;
        operator: "IS" | "IS_NOT" | "INCLUDES_DESCENDANTS";
        field: "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "ROUTINE_ROLE";
    }>, "many">>;
    curatedProductIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    pinnedProductIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    allowSameProduct: z.ZodDefault<z.ZodBoolean>;
    order: z.ZodNumber;
}, "strict", z.ZodTypeAny, {
    id: string;
    key: string;
    description: {
        en: string;
        ar: string;
    };
    label: {
        en: string;
        ar: string;
    };
    quantity: {
        minimum: number;
        maximum: number;
    };
    order: number;
    mode: "CURATED" | "RULE_BASED" | "HYBRID";
    required: boolean;
    internalName: string;
    rules: {
        values: string[];
        id: string;
        operator: "IS" | "IS_NOT" | "INCLUDES_DESCENDANTS";
        field: "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "ROUTINE_ROLE";
    }[];
    match: "ALL" | "ANY";
    curatedProductIds: string[];
    pinnedProductIds: string[];
    allowSameProduct: boolean;
}, {
    id: string;
    key: string;
    description: {
        en?: string | undefined;
        ar?: string | undefined;
    };
    label: {
        en?: string | undefined;
        ar?: string | undefined;
    };
    quantity: {
        minimum: number;
        maximum: number;
    };
    order: number;
    mode: "CURATED" | "RULE_BASED" | "HYBRID";
    internalName: string;
    required?: boolean | undefined;
    rules?: {
        values: string[];
        id: string;
        operator: "IS" | "IS_NOT" | "INCLUDES_DESCENDANTS";
        field: "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "ROUTINE_ROLE";
    }[] | undefined;
    match?: "ALL" | "ANY" | undefined;
    curatedProductIds?: string[] | undefined;
    pinnedProductIds?: string[] | undefined;
    allowSameProduct?: boolean | undefined;
}>, {
    id: string;
    key: string;
    description: {
        en: string;
        ar: string;
    };
    label: {
        en: string;
        ar: string;
    };
    quantity: {
        minimum: number;
        maximum: number;
    };
    order: number;
    mode: "CURATED" | "RULE_BASED" | "HYBRID";
    required: boolean;
    internalName: string;
    rules: {
        values: string[];
        id: string;
        operator: "IS" | "IS_NOT" | "INCLUDES_DESCENDANTS";
        field: "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "ROUTINE_ROLE";
    }[];
    match: "ALL" | "ANY";
    curatedProductIds: string[];
    pinnedProductIds: string[];
    allowSameProduct: boolean;
}, {
    id: string;
    key: string;
    description: {
        en?: string | undefined;
        ar?: string | undefined;
    };
    label: {
        en?: string | undefined;
        ar?: string | undefined;
    };
    quantity: {
        minimum: number;
        maximum: number;
    };
    order: number;
    mode: "CURATED" | "RULE_BASED" | "HYBRID";
    internalName: string;
    required?: boolean | undefined;
    rules?: {
        values: string[];
        id: string;
        operator: "IS" | "IS_NOT" | "INCLUDES_DESCENDANTS";
        field: "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "ROUTINE_ROLE";
    }[] | undefined;
    match?: "ALL" | "ANY" | undefined;
    curatedProductIds?: string[] | undefined;
    pinnedProductIds?: string[] | undefined;
    allowSameProduct?: boolean | undefined;
}>;
export declare const bundleDiscountSchema: z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
    type: z.ZodLiteral<"PERCENT_OFF">;
    basisPoints: z.ZodNumber;
    maximumDiscount: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
}, "strict", z.ZodTypeAny, {
    type: "PERCENT_OFF";
    basisPoints: number;
    maximumDiscount: number | null;
}, {
    type: "PERCENT_OFF";
    basisPoints: number;
    maximumDiscount?: number | null | undefined;
}>, z.ZodObject<{
    type: z.ZodLiteral<"FIXED_OFF">;
    amount: z.ZodNumber;
}, "strict", z.ZodTypeAny, {
    type: "FIXED_OFF";
    amount: number;
}, {
    type: "FIXED_OFF";
    amount: number;
}>, z.ZodObject<{
    type: z.ZodLiteral<"FIXED_TOTAL">;
    total: z.ZodNumber;
}, "strict", z.ZodTypeAny, {
    type: "FIXED_TOTAL";
    total: number;
}, {
    type: "FIXED_TOTAL";
    total: number;
}>, z.ZodObject<{
    type: z.ZodLiteral<"CHEAPEST_PERCENT_OFF">;
    basisPoints: z.ZodNumber;
    quantity: z.ZodDefault<z.ZodNumber>;
}, "strict", z.ZodTypeAny, {
    type: "CHEAPEST_PERCENT_OFF";
    quantity: number;
    basisPoints: number;
}, {
    type: "CHEAPEST_PERCENT_OFF";
    basisPoints: number;
    quantity?: number | undefined;
}>, z.ZodObject<{
    type: z.ZodLiteral<"CHEAPEST_FREE">;
    quantity: z.ZodDefault<z.ZodNumber>;
}, "strict", z.ZodTypeAny, {
    type: "CHEAPEST_FREE";
    quantity: number;
}, {
    type: "CHEAPEST_FREE";
    quantity?: number | undefined;
}>]>;
export declare const dynamicBundleDefinitionSchema: z.ZodEffects<z.ZodObject<{
    schemaVersion: z.ZodDefault<z.ZodLiteral<1>>;
    type: z.ZodDefault<z.ZodEnum<["FIXED", "DYNAMIC"]>>;
    name: z.ZodObject<{
        en: z.ZodDefault<z.ZodString>;
        ar: z.ZodDefault<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        en: string;
        ar: string;
    }, {
        en?: string | undefined;
        ar?: string | undefined;
    }>;
    description: z.ZodObject<{
        en: z.ZodDefault<z.ZodString>;
        ar: z.ZodDefault<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        en: string;
        ar: string;
    }, {
        en?: string | undefined;
        ar?: string | undefined;
    }>;
    instructions: z.ZodObject<{
        en: z.ZodDefault<z.ZodString>;
        ar: z.ZodDefault<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        en: string;
        ar: string;
    }, {
        en?: string | undefined;
        ar?: string | undefined;
    }>;
    terms: z.ZodObject<{
        en: z.ZodDefault<z.ZodString>;
        ar: z.ZodDefault<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        en: string;
        ar: string;
    }, {
        en?: string | undefined;
        ar?: string | undefined;
    }>;
    cardMediaKey: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    heroMediaKey: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    slots: z.ZodArray<z.ZodEffects<z.ZodObject<{
        id: z.ZodString;
        key: z.ZodString;
        internalName: z.ZodString;
        label: z.ZodObject<{
            en: z.ZodDefault<z.ZodString>;
            ar: z.ZodDefault<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            en: string;
            ar: string;
        }, {
            en?: string | undefined;
            ar?: string | undefined;
        }>;
        description: z.ZodObject<{
            en: z.ZodDefault<z.ZodString>;
            ar: z.ZodDefault<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            en: string;
            ar: string;
        }, {
            en?: string | undefined;
            ar?: string | undefined;
        }>;
        required: z.ZodDefault<z.ZodBoolean>;
        quantity: z.ZodObject<{
            minimum: z.ZodNumber;
            maximum: z.ZodNumber;
        }, "strict", z.ZodTypeAny, {
            minimum: number;
            maximum: number;
        }, {
            minimum: number;
            maximum: number;
        }>;
        mode: z.ZodEnum<["RULE_BASED", "CURATED", "HYBRID"]>;
        match: z.ZodDefault<z.ZodEnum<["ALL", "ANY"]>>;
        rules: z.ZodDefault<z.ZodArray<z.ZodEffects<z.ZodObject<{
            id: z.ZodString;
            field: z.ZodEnum<["CATEGORY", "BRAND", "PRODUCT", "TAG", "ROUTINE_ROLE", "VARIANT"]>;
            operator: z.ZodEnum<["IS", "IS_NOT", "INCLUDES_DESCENDANTS"]>;
            values: z.ZodArray<z.ZodUnion<[z.ZodString, z.ZodString]>, "many">;
        }, "strict", z.ZodTypeAny, {
            values: string[];
            id: string;
            operator: "IS" | "IS_NOT" | "INCLUDES_DESCENDANTS";
            field: "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "ROUTINE_ROLE";
        }, {
            values: string[];
            id: string;
            operator: "IS" | "IS_NOT" | "INCLUDES_DESCENDANTS";
            field: "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "ROUTINE_ROLE";
        }>, {
            values: string[];
            id: string;
            operator: "IS" | "IS_NOT" | "INCLUDES_DESCENDANTS";
            field: "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "ROUTINE_ROLE";
        }, {
            values: string[];
            id: string;
            operator: "IS" | "IS_NOT" | "INCLUDES_DESCENDANTS";
            field: "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "ROUTINE_ROLE";
        }>, "many">>;
        curatedProductIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        pinnedProductIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        allowSameProduct: z.ZodDefault<z.ZodBoolean>;
        order: z.ZodNumber;
    }, "strict", z.ZodTypeAny, {
        id: string;
        key: string;
        description: {
            en: string;
            ar: string;
        };
        label: {
            en: string;
            ar: string;
        };
        quantity: {
            minimum: number;
            maximum: number;
        };
        order: number;
        mode: "CURATED" | "RULE_BASED" | "HYBRID";
        required: boolean;
        internalName: string;
        rules: {
            values: string[];
            id: string;
            operator: "IS" | "IS_NOT" | "INCLUDES_DESCENDANTS";
            field: "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "ROUTINE_ROLE";
        }[];
        match: "ALL" | "ANY";
        curatedProductIds: string[];
        pinnedProductIds: string[];
        allowSameProduct: boolean;
    }, {
        id: string;
        key: string;
        description: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        label: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        quantity: {
            minimum: number;
            maximum: number;
        };
        order: number;
        mode: "CURATED" | "RULE_BASED" | "HYBRID";
        internalName: string;
        required?: boolean | undefined;
        rules?: {
            values: string[];
            id: string;
            operator: "IS" | "IS_NOT" | "INCLUDES_DESCENDANTS";
            field: "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "ROUTINE_ROLE";
        }[] | undefined;
        match?: "ALL" | "ANY" | undefined;
        curatedProductIds?: string[] | undefined;
        pinnedProductIds?: string[] | undefined;
        allowSameProduct?: boolean | undefined;
    }>, {
        id: string;
        key: string;
        description: {
            en: string;
            ar: string;
        };
        label: {
            en: string;
            ar: string;
        };
        quantity: {
            minimum: number;
            maximum: number;
        };
        order: number;
        mode: "CURATED" | "RULE_BASED" | "HYBRID";
        required: boolean;
        internalName: string;
        rules: {
            values: string[];
            id: string;
            operator: "IS" | "IS_NOT" | "INCLUDES_DESCENDANTS";
            field: "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "ROUTINE_ROLE";
        }[];
        match: "ALL" | "ANY";
        curatedProductIds: string[];
        pinnedProductIds: string[];
        allowSameProduct: boolean;
    }, {
        id: string;
        key: string;
        description: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        label: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        quantity: {
            minimum: number;
            maximum: number;
        };
        order: number;
        mode: "CURATED" | "RULE_BASED" | "HYBRID";
        internalName: string;
        required?: boolean | undefined;
        rules?: {
            values: string[];
            id: string;
            operator: "IS" | "IS_NOT" | "INCLUDES_DESCENDANTS";
            field: "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "ROUTINE_ROLE";
        }[] | undefined;
        match?: "ALL" | "ANY" | undefined;
        curatedProductIds?: string[] | undefined;
        pinnedProductIds?: string[] | undefined;
        allowSameProduct?: boolean | undefined;
    }>, "many">;
    discount: z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
        type: z.ZodLiteral<"PERCENT_OFF">;
        basisPoints: z.ZodNumber;
        maximumDiscount: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
    }, "strict", z.ZodTypeAny, {
        type: "PERCENT_OFF";
        basisPoints: number;
        maximumDiscount: number | null;
    }, {
        type: "PERCENT_OFF";
        basisPoints: number;
        maximumDiscount?: number | null | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"FIXED_OFF">;
        amount: z.ZodNumber;
    }, "strict", z.ZodTypeAny, {
        type: "FIXED_OFF";
        amount: number;
    }, {
        type: "FIXED_OFF";
        amount: number;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"FIXED_TOTAL">;
        total: z.ZodNumber;
    }, "strict", z.ZodTypeAny, {
        type: "FIXED_TOTAL";
        total: number;
    }, {
        type: "FIXED_TOTAL";
        total: number;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"CHEAPEST_PERCENT_OFF">;
        basisPoints: z.ZodNumber;
        quantity: z.ZodDefault<z.ZodNumber>;
    }, "strict", z.ZodTypeAny, {
        type: "CHEAPEST_PERCENT_OFF";
        quantity: number;
        basisPoints: number;
    }, {
        type: "CHEAPEST_PERCENT_OFF";
        basisPoints: number;
        quantity?: number | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"CHEAPEST_FREE">;
        quantity: z.ZodDefault<z.ZodNumber>;
    }, "strict", z.ZodTypeAny, {
        type: "CHEAPEST_FREE";
        quantity: number;
    }, {
        type: "CHEAPEST_FREE";
        quantity?: number | undefined;
    }>]>;
    minimumRetailSubtotal: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
    stacking: z.ZodEnum<["EXCLUSIVE", "COMBINABLE", "BEST_OFFER"]>;
    combinableWith: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    allowMultipleInstances: z.ZodDefault<z.ZodBoolean>;
    allowCrossSlotProductReuse: z.ZodDefault<z.ZodBoolean>;
    usage: z.ZodDefault<z.ZodObject<{
        total: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
        perCustomer: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
        uniqueCustomers: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
    }, "strict", z.ZodTypeAny, {
        total: number | null;
        uniqueCustomers: number | null;
        perCustomer: number | null;
    }, {
        total?: number | null | undefined;
        uniqueCustomers?: number | null | undefined;
        perCustomer?: number | null | undefined;
    }>>;
    presentation: z.ZodDefault<z.ZodObject<{
        badge: z.ZodDefault<z.ZodObject<{
            en: z.ZodDefault<z.ZodString>;
            ar: z.ZodDefault<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            en: string;
            ar: string;
        }, {
            en?: string | undefined;
            ar?: string | undefined;
        }>>;
        showRetailTotal: z.ZodDefault<z.ZodBoolean>;
        showSavings: z.ZodDefault<z.ZodBoolean>;
        indexable: z.ZodDefault<z.ZodBoolean>;
    }, "strict", z.ZodTypeAny, {
        indexable: boolean;
        badge: {
            en: string;
            ar: string;
        };
        showRetailTotal: boolean;
        showSavings: boolean;
    }, {
        indexable?: boolean | undefined;
        badge?: {
            en?: string | undefined;
            ar?: string | undefined;
        } | undefined;
        showRetailTotal?: boolean | undefined;
        showSavings?: boolean | undefined;
    }>>;
}, "strict", z.ZodTypeAny, {
    type: "FIXED" | "DYNAMIC";
    description: {
        en: string;
        ar: string;
    };
    name: {
        en: string;
        ar: string;
    };
    stacking: "EXCLUSIVE" | "COMBINABLE" | "BEST_OFFER";
    combinableWith: string[];
    discount: {
        type: "PERCENT_OFF";
        basisPoints: number;
        maximumDiscount: number | null;
    } | {
        type: "FIXED_OFF";
        amount: number;
    } | {
        type: "FIXED_TOTAL";
        total: number;
    } | {
        type: "CHEAPEST_PERCENT_OFF";
        quantity: number;
        basisPoints: number;
    } | {
        type: "CHEAPEST_FREE";
        quantity: number;
    };
    instructions: {
        en: string;
        ar: string;
    };
    presentation: {
        indexable: boolean;
        badge: {
            en: string;
            ar: string;
        };
        showRetailTotal: boolean;
        showSavings: boolean;
    };
    schemaVersion: 1;
    usage: {
        total: number | null;
        uniqueCustomers: number | null;
        perCustomer: number | null;
    };
    heroMediaKey: string | null;
    terms: {
        en: string;
        ar: string;
    };
    cardMediaKey: string | null;
    slots: {
        id: string;
        key: string;
        description: {
            en: string;
            ar: string;
        };
        label: {
            en: string;
            ar: string;
        };
        quantity: {
            minimum: number;
            maximum: number;
        };
        order: number;
        mode: "CURATED" | "RULE_BASED" | "HYBRID";
        required: boolean;
        internalName: string;
        rules: {
            values: string[];
            id: string;
            operator: "IS" | "IS_NOT" | "INCLUDES_DESCENDANTS";
            field: "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "ROUTINE_ROLE";
        }[];
        match: "ALL" | "ANY";
        curatedProductIds: string[];
        pinnedProductIds: string[];
        allowSameProduct: boolean;
    }[];
    minimumRetailSubtotal: number | null;
    allowMultipleInstances: boolean;
    allowCrossSlotProductReuse: boolean;
}, {
    description: {
        en?: string | undefined;
        ar?: string | undefined;
    };
    name: {
        en?: string | undefined;
        ar?: string | undefined;
    };
    stacking: "EXCLUSIVE" | "COMBINABLE" | "BEST_OFFER";
    discount: {
        type: "PERCENT_OFF";
        basisPoints: number;
        maximumDiscount?: number | null | undefined;
    } | {
        type: "FIXED_OFF";
        amount: number;
    } | {
        type: "FIXED_TOTAL";
        total: number;
    } | {
        type: "CHEAPEST_PERCENT_OFF";
        basisPoints: number;
        quantity?: number | undefined;
    } | {
        type: "CHEAPEST_FREE";
        quantity?: number | undefined;
    };
    instructions: {
        en?: string | undefined;
        ar?: string | undefined;
    };
    terms: {
        en?: string | undefined;
        ar?: string | undefined;
    };
    slots: {
        id: string;
        key: string;
        description: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        label: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        quantity: {
            minimum: number;
            maximum: number;
        };
        order: number;
        mode: "CURATED" | "RULE_BASED" | "HYBRID";
        internalName: string;
        required?: boolean | undefined;
        rules?: {
            values: string[];
            id: string;
            operator: "IS" | "IS_NOT" | "INCLUDES_DESCENDANTS";
            field: "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "ROUTINE_ROLE";
        }[] | undefined;
        match?: "ALL" | "ANY" | undefined;
        curatedProductIds?: string[] | undefined;
        pinnedProductIds?: string[] | undefined;
        allowSameProduct?: boolean | undefined;
    }[];
    type?: "FIXED" | "DYNAMIC" | undefined;
    combinableWith?: string[] | undefined;
    presentation?: {
        indexable?: boolean | undefined;
        badge?: {
            en?: string | undefined;
            ar?: string | undefined;
        } | undefined;
        showRetailTotal?: boolean | undefined;
        showSavings?: boolean | undefined;
    } | undefined;
    schemaVersion?: 1 | undefined;
    usage?: {
        total?: number | null | undefined;
        uniqueCustomers?: number | null | undefined;
        perCustomer?: number | null | undefined;
    } | undefined;
    heroMediaKey?: string | null | undefined;
    cardMediaKey?: string | null | undefined;
    minimumRetailSubtotal?: number | null | undefined;
    allowMultipleInstances?: boolean | undefined;
    allowCrossSlotProductReuse?: boolean | undefined;
}>, {
    type: "FIXED" | "DYNAMIC";
    description: {
        en: string;
        ar: string;
    };
    name: {
        en: string;
        ar: string;
    };
    stacking: "EXCLUSIVE" | "COMBINABLE" | "BEST_OFFER";
    combinableWith: string[];
    discount: {
        type: "PERCENT_OFF";
        basisPoints: number;
        maximumDiscount: number | null;
    } | {
        type: "FIXED_OFF";
        amount: number;
    } | {
        type: "FIXED_TOTAL";
        total: number;
    } | {
        type: "CHEAPEST_PERCENT_OFF";
        quantity: number;
        basisPoints: number;
    } | {
        type: "CHEAPEST_FREE";
        quantity: number;
    };
    instructions: {
        en: string;
        ar: string;
    };
    presentation: {
        indexable: boolean;
        badge: {
            en: string;
            ar: string;
        };
        showRetailTotal: boolean;
        showSavings: boolean;
    };
    schemaVersion: 1;
    usage: {
        total: number | null;
        uniqueCustomers: number | null;
        perCustomer: number | null;
    };
    heroMediaKey: string | null;
    terms: {
        en: string;
        ar: string;
    };
    cardMediaKey: string | null;
    slots: {
        id: string;
        key: string;
        description: {
            en: string;
            ar: string;
        };
        label: {
            en: string;
            ar: string;
        };
        quantity: {
            minimum: number;
            maximum: number;
        };
        order: number;
        mode: "CURATED" | "RULE_BASED" | "HYBRID";
        required: boolean;
        internalName: string;
        rules: {
            values: string[];
            id: string;
            operator: "IS" | "IS_NOT" | "INCLUDES_DESCENDANTS";
            field: "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "ROUTINE_ROLE";
        }[];
        match: "ALL" | "ANY";
        curatedProductIds: string[];
        pinnedProductIds: string[];
        allowSameProduct: boolean;
    }[];
    minimumRetailSubtotal: number | null;
    allowMultipleInstances: boolean;
    allowCrossSlotProductReuse: boolean;
}, {
    description: {
        en?: string | undefined;
        ar?: string | undefined;
    };
    name: {
        en?: string | undefined;
        ar?: string | undefined;
    };
    stacking: "EXCLUSIVE" | "COMBINABLE" | "BEST_OFFER";
    discount: {
        type: "PERCENT_OFF";
        basisPoints: number;
        maximumDiscount?: number | null | undefined;
    } | {
        type: "FIXED_OFF";
        amount: number;
    } | {
        type: "FIXED_TOTAL";
        total: number;
    } | {
        type: "CHEAPEST_PERCENT_OFF";
        basisPoints: number;
        quantity?: number | undefined;
    } | {
        type: "CHEAPEST_FREE";
        quantity?: number | undefined;
    };
    instructions: {
        en?: string | undefined;
        ar?: string | undefined;
    };
    terms: {
        en?: string | undefined;
        ar?: string | undefined;
    };
    slots: {
        id: string;
        key: string;
        description: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        label: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        quantity: {
            minimum: number;
            maximum: number;
        };
        order: number;
        mode: "CURATED" | "RULE_BASED" | "HYBRID";
        internalName: string;
        required?: boolean | undefined;
        rules?: {
            values: string[];
            id: string;
            operator: "IS" | "IS_NOT" | "INCLUDES_DESCENDANTS";
            field: "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "ROUTINE_ROLE";
        }[] | undefined;
        match?: "ALL" | "ANY" | undefined;
        curatedProductIds?: string[] | undefined;
        pinnedProductIds?: string[] | undefined;
        allowSameProduct?: boolean | undefined;
    }[];
    type?: "FIXED" | "DYNAMIC" | undefined;
    combinableWith?: string[] | undefined;
    presentation?: {
        indexable?: boolean | undefined;
        badge?: {
            en?: string | undefined;
            ar?: string | undefined;
        } | undefined;
        showRetailTotal?: boolean | undefined;
        showSavings?: boolean | undefined;
    } | undefined;
    schemaVersion?: 1 | undefined;
    usage?: {
        total?: number | null | undefined;
        uniqueCustomers?: number | null | undefined;
        perCustomer?: number | null | undefined;
    } | undefined;
    heroMediaKey?: string | null | undefined;
    cardMediaKey?: string | null | undefined;
    minimumRetailSubtotal?: number | null | undefined;
    allowMultipleInstances?: boolean | undefined;
    allowCrossSlotProductReuse?: boolean | undefined;
}>;
export declare const createDynamicBundleSchema: z.ZodEffects<z.ZodObject<{
    internalName: z.ZodString;
    slug: z.ZodString;
    definition: z.ZodEffects<z.ZodObject<{
        schemaVersion: z.ZodDefault<z.ZodLiteral<1>>;
        type: z.ZodDefault<z.ZodEnum<["FIXED", "DYNAMIC"]>>;
        name: z.ZodObject<{
            en: z.ZodDefault<z.ZodString>;
            ar: z.ZodDefault<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            en: string;
            ar: string;
        }, {
            en?: string | undefined;
            ar?: string | undefined;
        }>;
        description: z.ZodObject<{
            en: z.ZodDefault<z.ZodString>;
            ar: z.ZodDefault<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            en: string;
            ar: string;
        }, {
            en?: string | undefined;
            ar?: string | undefined;
        }>;
        instructions: z.ZodObject<{
            en: z.ZodDefault<z.ZodString>;
            ar: z.ZodDefault<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            en: string;
            ar: string;
        }, {
            en?: string | undefined;
            ar?: string | undefined;
        }>;
        terms: z.ZodObject<{
            en: z.ZodDefault<z.ZodString>;
            ar: z.ZodDefault<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            en: string;
            ar: string;
        }, {
            en?: string | undefined;
            ar?: string | undefined;
        }>;
        cardMediaKey: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        heroMediaKey: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        slots: z.ZodArray<z.ZodEffects<z.ZodObject<{
            id: z.ZodString;
            key: z.ZodString;
            internalName: z.ZodString;
            label: z.ZodObject<{
                en: z.ZodDefault<z.ZodString>;
                ar: z.ZodDefault<z.ZodString>;
            }, "strict", z.ZodTypeAny, {
                en: string;
                ar: string;
            }, {
                en?: string | undefined;
                ar?: string | undefined;
            }>;
            description: z.ZodObject<{
                en: z.ZodDefault<z.ZodString>;
                ar: z.ZodDefault<z.ZodString>;
            }, "strict", z.ZodTypeAny, {
                en: string;
                ar: string;
            }, {
                en?: string | undefined;
                ar?: string | undefined;
            }>;
            required: z.ZodDefault<z.ZodBoolean>;
            quantity: z.ZodObject<{
                minimum: z.ZodNumber;
                maximum: z.ZodNumber;
            }, "strict", z.ZodTypeAny, {
                minimum: number;
                maximum: number;
            }, {
                minimum: number;
                maximum: number;
            }>;
            mode: z.ZodEnum<["RULE_BASED", "CURATED", "HYBRID"]>;
            match: z.ZodDefault<z.ZodEnum<["ALL", "ANY"]>>;
            rules: z.ZodDefault<z.ZodArray<z.ZodEffects<z.ZodObject<{
                id: z.ZodString;
                field: z.ZodEnum<["CATEGORY", "BRAND", "PRODUCT", "TAG", "ROUTINE_ROLE", "VARIANT"]>;
                operator: z.ZodEnum<["IS", "IS_NOT", "INCLUDES_DESCENDANTS"]>;
                values: z.ZodArray<z.ZodUnion<[z.ZodString, z.ZodString]>, "many">;
            }, "strict", z.ZodTypeAny, {
                values: string[];
                id: string;
                operator: "IS" | "IS_NOT" | "INCLUDES_DESCENDANTS";
                field: "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "ROUTINE_ROLE";
            }, {
                values: string[];
                id: string;
                operator: "IS" | "IS_NOT" | "INCLUDES_DESCENDANTS";
                field: "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "ROUTINE_ROLE";
            }>, {
                values: string[];
                id: string;
                operator: "IS" | "IS_NOT" | "INCLUDES_DESCENDANTS";
                field: "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "ROUTINE_ROLE";
            }, {
                values: string[];
                id: string;
                operator: "IS" | "IS_NOT" | "INCLUDES_DESCENDANTS";
                field: "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "ROUTINE_ROLE";
            }>, "many">>;
            curatedProductIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            pinnedProductIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            allowSameProduct: z.ZodDefault<z.ZodBoolean>;
            order: z.ZodNumber;
        }, "strict", z.ZodTypeAny, {
            id: string;
            key: string;
            description: {
                en: string;
                ar: string;
            };
            label: {
                en: string;
                ar: string;
            };
            quantity: {
                minimum: number;
                maximum: number;
            };
            order: number;
            mode: "CURATED" | "RULE_BASED" | "HYBRID";
            required: boolean;
            internalName: string;
            rules: {
                values: string[];
                id: string;
                operator: "IS" | "IS_NOT" | "INCLUDES_DESCENDANTS";
                field: "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "ROUTINE_ROLE";
            }[];
            match: "ALL" | "ANY";
            curatedProductIds: string[];
            pinnedProductIds: string[];
            allowSameProduct: boolean;
        }, {
            id: string;
            key: string;
            description: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            label: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            quantity: {
                minimum: number;
                maximum: number;
            };
            order: number;
            mode: "CURATED" | "RULE_BASED" | "HYBRID";
            internalName: string;
            required?: boolean | undefined;
            rules?: {
                values: string[];
                id: string;
                operator: "IS" | "IS_NOT" | "INCLUDES_DESCENDANTS";
                field: "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "ROUTINE_ROLE";
            }[] | undefined;
            match?: "ALL" | "ANY" | undefined;
            curatedProductIds?: string[] | undefined;
            pinnedProductIds?: string[] | undefined;
            allowSameProduct?: boolean | undefined;
        }>, {
            id: string;
            key: string;
            description: {
                en: string;
                ar: string;
            };
            label: {
                en: string;
                ar: string;
            };
            quantity: {
                minimum: number;
                maximum: number;
            };
            order: number;
            mode: "CURATED" | "RULE_BASED" | "HYBRID";
            required: boolean;
            internalName: string;
            rules: {
                values: string[];
                id: string;
                operator: "IS" | "IS_NOT" | "INCLUDES_DESCENDANTS";
                field: "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "ROUTINE_ROLE";
            }[];
            match: "ALL" | "ANY";
            curatedProductIds: string[];
            pinnedProductIds: string[];
            allowSameProduct: boolean;
        }, {
            id: string;
            key: string;
            description: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            label: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            quantity: {
                minimum: number;
                maximum: number;
            };
            order: number;
            mode: "CURATED" | "RULE_BASED" | "HYBRID";
            internalName: string;
            required?: boolean | undefined;
            rules?: {
                values: string[];
                id: string;
                operator: "IS" | "IS_NOT" | "INCLUDES_DESCENDANTS";
                field: "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "ROUTINE_ROLE";
            }[] | undefined;
            match?: "ALL" | "ANY" | undefined;
            curatedProductIds?: string[] | undefined;
            pinnedProductIds?: string[] | undefined;
            allowSameProduct?: boolean | undefined;
        }>, "many">;
        discount: z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
            type: z.ZodLiteral<"PERCENT_OFF">;
            basisPoints: z.ZodNumber;
            maximumDiscount: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
        }, "strict", z.ZodTypeAny, {
            type: "PERCENT_OFF";
            basisPoints: number;
            maximumDiscount: number | null;
        }, {
            type: "PERCENT_OFF";
            basisPoints: number;
            maximumDiscount?: number | null | undefined;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"FIXED_OFF">;
            amount: z.ZodNumber;
        }, "strict", z.ZodTypeAny, {
            type: "FIXED_OFF";
            amount: number;
        }, {
            type: "FIXED_OFF";
            amount: number;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"FIXED_TOTAL">;
            total: z.ZodNumber;
        }, "strict", z.ZodTypeAny, {
            type: "FIXED_TOTAL";
            total: number;
        }, {
            type: "FIXED_TOTAL";
            total: number;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"CHEAPEST_PERCENT_OFF">;
            basisPoints: z.ZodNumber;
            quantity: z.ZodDefault<z.ZodNumber>;
        }, "strict", z.ZodTypeAny, {
            type: "CHEAPEST_PERCENT_OFF";
            quantity: number;
            basisPoints: number;
        }, {
            type: "CHEAPEST_PERCENT_OFF";
            basisPoints: number;
            quantity?: number | undefined;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"CHEAPEST_FREE">;
            quantity: z.ZodDefault<z.ZodNumber>;
        }, "strict", z.ZodTypeAny, {
            type: "CHEAPEST_FREE";
            quantity: number;
        }, {
            type: "CHEAPEST_FREE";
            quantity?: number | undefined;
        }>]>;
        minimumRetailSubtotal: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
        stacking: z.ZodEnum<["EXCLUSIVE", "COMBINABLE", "BEST_OFFER"]>;
        combinableWith: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        allowMultipleInstances: z.ZodDefault<z.ZodBoolean>;
        allowCrossSlotProductReuse: z.ZodDefault<z.ZodBoolean>;
        usage: z.ZodDefault<z.ZodObject<{
            total: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
            perCustomer: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
            uniqueCustomers: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
        }, "strict", z.ZodTypeAny, {
            total: number | null;
            uniqueCustomers: number | null;
            perCustomer: number | null;
        }, {
            total?: number | null | undefined;
            uniqueCustomers?: number | null | undefined;
            perCustomer?: number | null | undefined;
        }>>;
        presentation: z.ZodDefault<z.ZodObject<{
            badge: z.ZodDefault<z.ZodObject<{
                en: z.ZodDefault<z.ZodString>;
                ar: z.ZodDefault<z.ZodString>;
            }, "strict", z.ZodTypeAny, {
                en: string;
                ar: string;
            }, {
                en?: string | undefined;
                ar?: string | undefined;
            }>>;
            showRetailTotal: z.ZodDefault<z.ZodBoolean>;
            showSavings: z.ZodDefault<z.ZodBoolean>;
            indexable: z.ZodDefault<z.ZodBoolean>;
        }, "strict", z.ZodTypeAny, {
            indexable: boolean;
            badge: {
                en: string;
                ar: string;
            };
            showRetailTotal: boolean;
            showSavings: boolean;
        }, {
            indexable?: boolean | undefined;
            badge?: {
                en?: string | undefined;
                ar?: string | undefined;
            } | undefined;
            showRetailTotal?: boolean | undefined;
            showSavings?: boolean | undefined;
        }>>;
    }, "strict", z.ZodTypeAny, {
        type: "FIXED" | "DYNAMIC";
        description: {
            en: string;
            ar: string;
        };
        name: {
            en: string;
            ar: string;
        };
        stacking: "EXCLUSIVE" | "COMBINABLE" | "BEST_OFFER";
        combinableWith: string[];
        discount: {
            type: "PERCENT_OFF";
            basisPoints: number;
            maximumDiscount: number | null;
        } | {
            type: "FIXED_OFF";
            amount: number;
        } | {
            type: "FIXED_TOTAL";
            total: number;
        } | {
            type: "CHEAPEST_PERCENT_OFF";
            quantity: number;
            basisPoints: number;
        } | {
            type: "CHEAPEST_FREE";
            quantity: number;
        };
        instructions: {
            en: string;
            ar: string;
        };
        presentation: {
            indexable: boolean;
            badge: {
                en: string;
                ar: string;
            };
            showRetailTotal: boolean;
            showSavings: boolean;
        };
        schemaVersion: 1;
        usage: {
            total: number | null;
            uniqueCustomers: number | null;
            perCustomer: number | null;
        };
        heroMediaKey: string | null;
        terms: {
            en: string;
            ar: string;
        };
        cardMediaKey: string | null;
        slots: {
            id: string;
            key: string;
            description: {
                en: string;
                ar: string;
            };
            label: {
                en: string;
                ar: string;
            };
            quantity: {
                minimum: number;
                maximum: number;
            };
            order: number;
            mode: "CURATED" | "RULE_BASED" | "HYBRID";
            required: boolean;
            internalName: string;
            rules: {
                values: string[];
                id: string;
                operator: "IS" | "IS_NOT" | "INCLUDES_DESCENDANTS";
                field: "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "ROUTINE_ROLE";
            }[];
            match: "ALL" | "ANY";
            curatedProductIds: string[];
            pinnedProductIds: string[];
            allowSameProduct: boolean;
        }[];
        minimumRetailSubtotal: number | null;
        allowMultipleInstances: boolean;
        allowCrossSlotProductReuse: boolean;
    }, {
        description: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        name: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        stacking: "EXCLUSIVE" | "COMBINABLE" | "BEST_OFFER";
        discount: {
            type: "PERCENT_OFF";
            basisPoints: number;
            maximumDiscount?: number | null | undefined;
        } | {
            type: "FIXED_OFF";
            amount: number;
        } | {
            type: "FIXED_TOTAL";
            total: number;
        } | {
            type: "CHEAPEST_PERCENT_OFF";
            basisPoints: number;
            quantity?: number | undefined;
        } | {
            type: "CHEAPEST_FREE";
            quantity?: number | undefined;
        };
        instructions: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        terms: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        slots: {
            id: string;
            key: string;
            description: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            label: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            quantity: {
                minimum: number;
                maximum: number;
            };
            order: number;
            mode: "CURATED" | "RULE_BASED" | "HYBRID";
            internalName: string;
            required?: boolean | undefined;
            rules?: {
                values: string[];
                id: string;
                operator: "IS" | "IS_NOT" | "INCLUDES_DESCENDANTS";
                field: "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "ROUTINE_ROLE";
            }[] | undefined;
            match?: "ALL" | "ANY" | undefined;
            curatedProductIds?: string[] | undefined;
            pinnedProductIds?: string[] | undefined;
            allowSameProduct?: boolean | undefined;
        }[];
        type?: "FIXED" | "DYNAMIC" | undefined;
        combinableWith?: string[] | undefined;
        presentation?: {
            indexable?: boolean | undefined;
            badge?: {
                en?: string | undefined;
                ar?: string | undefined;
            } | undefined;
            showRetailTotal?: boolean | undefined;
            showSavings?: boolean | undefined;
        } | undefined;
        schemaVersion?: 1 | undefined;
        usage?: {
            total?: number | null | undefined;
            uniqueCustomers?: number | null | undefined;
            perCustomer?: number | null | undefined;
        } | undefined;
        heroMediaKey?: string | null | undefined;
        cardMediaKey?: string | null | undefined;
        minimumRetailSubtotal?: number | null | undefined;
        allowMultipleInstances?: boolean | undefined;
        allowCrossSlotProductReuse?: boolean | undefined;
    }>, {
        type: "FIXED" | "DYNAMIC";
        description: {
            en: string;
            ar: string;
        };
        name: {
            en: string;
            ar: string;
        };
        stacking: "EXCLUSIVE" | "COMBINABLE" | "BEST_OFFER";
        combinableWith: string[];
        discount: {
            type: "PERCENT_OFF";
            basisPoints: number;
            maximumDiscount: number | null;
        } | {
            type: "FIXED_OFF";
            amount: number;
        } | {
            type: "FIXED_TOTAL";
            total: number;
        } | {
            type: "CHEAPEST_PERCENT_OFF";
            quantity: number;
            basisPoints: number;
        } | {
            type: "CHEAPEST_FREE";
            quantity: number;
        };
        instructions: {
            en: string;
            ar: string;
        };
        presentation: {
            indexable: boolean;
            badge: {
                en: string;
                ar: string;
            };
            showRetailTotal: boolean;
            showSavings: boolean;
        };
        schemaVersion: 1;
        usage: {
            total: number | null;
            uniqueCustomers: number | null;
            perCustomer: number | null;
        };
        heroMediaKey: string | null;
        terms: {
            en: string;
            ar: string;
        };
        cardMediaKey: string | null;
        slots: {
            id: string;
            key: string;
            description: {
                en: string;
                ar: string;
            };
            label: {
                en: string;
                ar: string;
            };
            quantity: {
                minimum: number;
                maximum: number;
            };
            order: number;
            mode: "CURATED" | "RULE_BASED" | "HYBRID";
            required: boolean;
            internalName: string;
            rules: {
                values: string[];
                id: string;
                operator: "IS" | "IS_NOT" | "INCLUDES_DESCENDANTS";
                field: "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "ROUTINE_ROLE";
            }[];
            match: "ALL" | "ANY";
            curatedProductIds: string[];
            pinnedProductIds: string[];
            allowSameProduct: boolean;
        }[];
        minimumRetailSubtotal: number | null;
        allowMultipleInstances: boolean;
        allowCrossSlotProductReuse: boolean;
    }, {
        description: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        name: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        stacking: "EXCLUSIVE" | "COMBINABLE" | "BEST_OFFER";
        discount: {
            type: "PERCENT_OFF";
            basisPoints: number;
            maximumDiscount?: number | null | undefined;
        } | {
            type: "FIXED_OFF";
            amount: number;
        } | {
            type: "FIXED_TOTAL";
            total: number;
        } | {
            type: "CHEAPEST_PERCENT_OFF";
            basisPoints: number;
            quantity?: number | undefined;
        } | {
            type: "CHEAPEST_FREE";
            quantity?: number | undefined;
        };
        instructions: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        terms: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        slots: {
            id: string;
            key: string;
            description: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            label: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            quantity: {
                minimum: number;
                maximum: number;
            };
            order: number;
            mode: "CURATED" | "RULE_BASED" | "HYBRID";
            internalName: string;
            required?: boolean | undefined;
            rules?: {
                values: string[];
                id: string;
                operator: "IS" | "IS_NOT" | "INCLUDES_DESCENDANTS";
                field: "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "ROUTINE_ROLE";
            }[] | undefined;
            match?: "ALL" | "ANY" | undefined;
            curatedProductIds?: string[] | undefined;
            pinnedProductIds?: string[] | undefined;
            allowSameProduct?: boolean | undefined;
        }[];
        type?: "FIXED" | "DYNAMIC" | undefined;
        combinableWith?: string[] | undefined;
        presentation?: {
            indexable?: boolean | undefined;
            badge?: {
                en?: string | undefined;
                ar?: string | undefined;
            } | undefined;
            showRetailTotal?: boolean | undefined;
            showSavings?: boolean | undefined;
        } | undefined;
        schemaVersion?: 1 | undefined;
        usage?: {
            total?: number | null | undefined;
            uniqueCustomers?: number | null | undefined;
            perCustomer?: number | null | undefined;
        } | undefined;
        heroMediaKey?: string | null | undefined;
        cardMediaKey?: string | null | undefined;
        minimumRetailSubtotal?: number | null | undefined;
        allowMultipleInstances?: boolean | undefined;
        allowCrossSlotProductReuse?: boolean | undefined;
    }>;
    startsAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    endsAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    pageId: z.ZodDefault<z.ZodNullable<z.ZodString>>;
}, "strict", z.ZodTypeAny, {
    startsAt: string | null;
    endsAt: string | null;
    slug: string;
    internalName: string;
    pageId: string | null;
    definition: {
        type: "FIXED" | "DYNAMIC";
        description: {
            en: string;
            ar: string;
        };
        name: {
            en: string;
            ar: string;
        };
        stacking: "EXCLUSIVE" | "COMBINABLE" | "BEST_OFFER";
        combinableWith: string[];
        discount: {
            type: "PERCENT_OFF";
            basisPoints: number;
            maximumDiscount: number | null;
        } | {
            type: "FIXED_OFF";
            amount: number;
        } | {
            type: "FIXED_TOTAL";
            total: number;
        } | {
            type: "CHEAPEST_PERCENT_OFF";
            quantity: number;
            basisPoints: number;
        } | {
            type: "CHEAPEST_FREE";
            quantity: number;
        };
        instructions: {
            en: string;
            ar: string;
        };
        presentation: {
            indexable: boolean;
            badge: {
                en: string;
                ar: string;
            };
            showRetailTotal: boolean;
            showSavings: boolean;
        };
        schemaVersion: 1;
        usage: {
            total: number | null;
            uniqueCustomers: number | null;
            perCustomer: number | null;
        };
        heroMediaKey: string | null;
        terms: {
            en: string;
            ar: string;
        };
        cardMediaKey: string | null;
        slots: {
            id: string;
            key: string;
            description: {
                en: string;
                ar: string;
            };
            label: {
                en: string;
                ar: string;
            };
            quantity: {
                minimum: number;
                maximum: number;
            };
            order: number;
            mode: "CURATED" | "RULE_BASED" | "HYBRID";
            required: boolean;
            internalName: string;
            rules: {
                values: string[];
                id: string;
                operator: "IS" | "IS_NOT" | "INCLUDES_DESCENDANTS";
                field: "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "ROUTINE_ROLE";
            }[];
            match: "ALL" | "ANY";
            curatedProductIds: string[];
            pinnedProductIds: string[];
            allowSameProduct: boolean;
        }[];
        minimumRetailSubtotal: number | null;
        allowMultipleInstances: boolean;
        allowCrossSlotProductReuse: boolean;
    };
}, {
    slug: string;
    internalName: string;
    definition: {
        description: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        name: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        stacking: "EXCLUSIVE" | "COMBINABLE" | "BEST_OFFER";
        discount: {
            type: "PERCENT_OFF";
            basisPoints: number;
            maximumDiscount?: number | null | undefined;
        } | {
            type: "FIXED_OFF";
            amount: number;
        } | {
            type: "FIXED_TOTAL";
            total: number;
        } | {
            type: "CHEAPEST_PERCENT_OFF";
            basisPoints: number;
            quantity?: number | undefined;
        } | {
            type: "CHEAPEST_FREE";
            quantity?: number | undefined;
        };
        instructions: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        terms: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        slots: {
            id: string;
            key: string;
            description: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            label: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            quantity: {
                minimum: number;
                maximum: number;
            };
            order: number;
            mode: "CURATED" | "RULE_BASED" | "HYBRID";
            internalName: string;
            required?: boolean | undefined;
            rules?: {
                values: string[];
                id: string;
                operator: "IS" | "IS_NOT" | "INCLUDES_DESCENDANTS";
                field: "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "ROUTINE_ROLE";
            }[] | undefined;
            match?: "ALL" | "ANY" | undefined;
            curatedProductIds?: string[] | undefined;
            pinnedProductIds?: string[] | undefined;
            allowSameProduct?: boolean | undefined;
        }[];
        type?: "FIXED" | "DYNAMIC" | undefined;
        combinableWith?: string[] | undefined;
        presentation?: {
            indexable?: boolean | undefined;
            badge?: {
                en?: string | undefined;
                ar?: string | undefined;
            } | undefined;
            showRetailTotal?: boolean | undefined;
            showSavings?: boolean | undefined;
        } | undefined;
        schemaVersion?: 1 | undefined;
        usage?: {
            total?: number | null | undefined;
            uniqueCustomers?: number | null | undefined;
            perCustomer?: number | null | undefined;
        } | undefined;
        heroMediaKey?: string | null | undefined;
        cardMediaKey?: string | null | undefined;
        minimumRetailSubtotal?: number | null | undefined;
        allowMultipleInstances?: boolean | undefined;
        allowCrossSlotProductReuse?: boolean | undefined;
    };
    startsAt?: string | null | undefined;
    endsAt?: string | null | undefined;
    pageId?: string | null | undefined;
}>, {
    startsAt: string | null;
    endsAt: string | null;
    slug: string;
    internalName: string;
    pageId: string | null;
    definition: {
        type: "FIXED" | "DYNAMIC";
        description: {
            en: string;
            ar: string;
        };
        name: {
            en: string;
            ar: string;
        };
        stacking: "EXCLUSIVE" | "COMBINABLE" | "BEST_OFFER";
        combinableWith: string[];
        discount: {
            type: "PERCENT_OFF";
            basisPoints: number;
            maximumDiscount: number | null;
        } | {
            type: "FIXED_OFF";
            amount: number;
        } | {
            type: "FIXED_TOTAL";
            total: number;
        } | {
            type: "CHEAPEST_PERCENT_OFF";
            quantity: number;
            basisPoints: number;
        } | {
            type: "CHEAPEST_FREE";
            quantity: number;
        };
        instructions: {
            en: string;
            ar: string;
        };
        presentation: {
            indexable: boolean;
            badge: {
                en: string;
                ar: string;
            };
            showRetailTotal: boolean;
            showSavings: boolean;
        };
        schemaVersion: 1;
        usage: {
            total: number | null;
            uniqueCustomers: number | null;
            perCustomer: number | null;
        };
        heroMediaKey: string | null;
        terms: {
            en: string;
            ar: string;
        };
        cardMediaKey: string | null;
        slots: {
            id: string;
            key: string;
            description: {
                en: string;
                ar: string;
            };
            label: {
                en: string;
                ar: string;
            };
            quantity: {
                minimum: number;
                maximum: number;
            };
            order: number;
            mode: "CURATED" | "RULE_BASED" | "HYBRID";
            required: boolean;
            internalName: string;
            rules: {
                values: string[];
                id: string;
                operator: "IS" | "IS_NOT" | "INCLUDES_DESCENDANTS";
                field: "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "ROUTINE_ROLE";
            }[];
            match: "ALL" | "ANY";
            curatedProductIds: string[];
            pinnedProductIds: string[];
            allowSameProduct: boolean;
        }[];
        minimumRetailSubtotal: number | null;
        allowMultipleInstances: boolean;
        allowCrossSlotProductReuse: boolean;
    };
}, {
    slug: string;
    internalName: string;
    definition: {
        description: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        name: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        stacking: "EXCLUSIVE" | "COMBINABLE" | "BEST_OFFER";
        discount: {
            type: "PERCENT_OFF";
            basisPoints: number;
            maximumDiscount?: number | null | undefined;
        } | {
            type: "FIXED_OFF";
            amount: number;
        } | {
            type: "FIXED_TOTAL";
            total: number;
        } | {
            type: "CHEAPEST_PERCENT_OFF";
            basisPoints: number;
            quantity?: number | undefined;
        } | {
            type: "CHEAPEST_FREE";
            quantity?: number | undefined;
        };
        instructions: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        terms: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        slots: {
            id: string;
            key: string;
            description: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            label: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            quantity: {
                minimum: number;
                maximum: number;
            };
            order: number;
            mode: "CURATED" | "RULE_BASED" | "HYBRID";
            internalName: string;
            required?: boolean | undefined;
            rules?: {
                values: string[];
                id: string;
                operator: "IS" | "IS_NOT" | "INCLUDES_DESCENDANTS";
                field: "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "ROUTINE_ROLE";
            }[] | undefined;
            match?: "ALL" | "ANY" | undefined;
            curatedProductIds?: string[] | undefined;
            pinnedProductIds?: string[] | undefined;
            allowSameProduct?: boolean | undefined;
        }[];
        type?: "FIXED" | "DYNAMIC" | undefined;
        combinableWith?: string[] | undefined;
        presentation?: {
            indexable?: boolean | undefined;
            badge?: {
                en?: string | undefined;
                ar?: string | undefined;
            } | undefined;
            showRetailTotal?: boolean | undefined;
            showSavings?: boolean | undefined;
        } | undefined;
        schemaVersion?: 1 | undefined;
        usage?: {
            total?: number | null | undefined;
            uniqueCustomers?: number | null | undefined;
            perCustomer?: number | null | undefined;
        } | undefined;
        heroMediaKey?: string | null | undefined;
        cardMediaKey?: string | null | undefined;
        minimumRetailSubtotal?: number | null | undefined;
        allowMultipleInstances?: boolean | undefined;
        allowCrossSlotProductReuse?: boolean | undefined;
    };
    startsAt?: string | null | undefined;
    endsAt?: string | null | undefined;
    pageId?: string | null | undefined;
}>;
export declare const updateDynamicBundleDraftSchema: z.ZodObject<{
    internalName: z.ZodOptional<z.ZodString>;
    slug: z.ZodOptional<z.ZodString>;
    definition: z.ZodOptional<z.ZodEffects<z.ZodObject<{
        schemaVersion: z.ZodDefault<z.ZodLiteral<1>>;
        type: z.ZodDefault<z.ZodEnum<["FIXED", "DYNAMIC"]>>;
        name: z.ZodObject<{
            en: z.ZodDefault<z.ZodString>;
            ar: z.ZodDefault<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            en: string;
            ar: string;
        }, {
            en?: string | undefined;
            ar?: string | undefined;
        }>;
        description: z.ZodObject<{
            en: z.ZodDefault<z.ZodString>;
            ar: z.ZodDefault<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            en: string;
            ar: string;
        }, {
            en?: string | undefined;
            ar?: string | undefined;
        }>;
        instructions: z.ZodObject<{
            en: z.ZodDefault<z.ZodString>;
            ar: z.ZodDefault<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            en: string;
            ar: string;
        }, {
            en?: string | undefined;
            ar?: string | undefined;
        }>;
        terms: z.ZodObject<{
            en: z.ZodDefault<z.ZodString>;
            ar: z.ZodDefault<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            en: string;
            ar: string;
        }, {
            en?: string | undefined;
            ar?: string | undefined;
        }>;
        cardMediaKey: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        heroMediaKey: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        slots: z.ZodArray<z.ZodEffects<z.ZodObject<{
            id: z.ZodString;
            key: z.ZodString;
            internalName: z.ZodString;
            label: z.ZodObject<{
                en: z.ZodDefault<z.ZodString>;
                ar: z.ZodDefault<z.ZodString>;
            }, "strict", z.ZodTypeAny, {
                en: string;
                ar: string;
            }, {
                en?: string | undefined;
                ar?: string | undefined;
            }>;
            description: z.ZodObject<{
                en: z.ZodDefault<z.ZodString>;
                ar: z.ZodDefault<z.ZodString>;
            }, "strict", z.ZodTypeAny, {
                en: string;
                ar: string;
            }, {
                en?: string | undefined;
                ar?: string | undefined;
            }>;
            required: z.ZodDefault<z.ZodBoolean>;
            quantity: z.ZodObject<{
                minimum: z.ZodNumber;
                maximum: z.ZodNumber;
            }, "strict", z.ZodTypeAny, {
                minimum: number;
                maximum: number;
            }, {
                minimum: number;
                maximum: number;
            }>;
            mode: z.ZodEnum<["RULE_BASED", "CURATED", "HYBRID"]>;
            match: z.ZodDefault<z.ZodEnum<["ALL", "ANY"]>>;
            rules: z.ZodDefault<z.ZodArray<z.ZodEffects<z.ZodObject<{
                id: z.ZodString;
                field: z.ZodEnum<["CATEGORY", "BRAND", "PRODUCT", "TAG", "ROUTINE_ROLE", "VARIANT"]>;
                operator: z.ZodEnum<["IS", "IS_NOT", "INCLUDES_DESCENDANTS"]>;
                values: z.ZodArray<z.ZodUnion<[z.ZodString, z.ZodString]>, "many">;
            }, "strict", z.ZodTypeAny, {
                values: string[];
                id: string;
                operator: "IS" | "IS_NOT" | "INCLUDES_DESCENDANTS";
                field: "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "ROUTINE_ROLE";
            }, {
                values: string[];
                id: string;
                operator: "IS" | "IS_NOT" | "INCLUDES_DESCENDANTS";
                field: "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "ROUTINE_ROLE";
            }>, {
                values: string[];
                id: string;
                operator: "IS" | "IS_NOT" | "INCLUDES_DESCENDANTS";
                field: "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "ROUTINE_ROLE";
            }, {
                values: string[];
                id: string;
                operator: "IS" | "IS_NOT" | "INCLUDES_DESCENDANTS";
                field: "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "ROUTINE_ROLE";
            }>, "many">>;
            curatedProductIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            pinnedProductIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            allowSameProduct: z.ZodDefault<z.ZodBoolean>;
            order: z.ZodNumber;
        }, "strict", z.ZodTypeAny, {
            id: string;
            key: string;
            description: {
                en: string;
                ar: string;
            };
            label: {
                en: string;
                ar: string;
            };
            quantity: {
                minimum: number;
                maximum: number;
            };
            order: number;
            mode: "CURATED" | "RULE_BASED" | "HYBRID";
            required: boolean;
            internalName: string;
            rules: {
                values: string[];
                id: string;
                operator: "IS" | "IS_NOT" | "INCLUDES_DESCENDANTS";
                field: "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "ROUTINE_ROLE";
            }[];
            match: "ALL" | "ANY";
            curatedProductIds: string[];
            pinnedProductIds: string[];
            allowSameProduct: boolean;
        }, {
            id: string;
            key: string;
            description: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            label: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            quantity: {
                minimum: number;
                maximum: number;
            };
            order: number;
            mode: "CURATED" | "RULE_BASED" | "HYBRID";
            internalName: string;
            required?: boolean | undefined;
            rules?: {
                values: string[];
                id: string;
                operator: "IS" | "IS_NOT" | "INCLUDES_DESCENDANTS";
                field: "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "ROUTINE_ROLE";
            }[] | undefined;
            match?: "ALL" | "ANY" | undefined;
            curatedProductIds?: string[] | undefined;
            pinnedProductIds?: string[] | undefined;
            allowSameProduct?: boolean | undefined;
        }>, {
            id: string;
            key: string;
            description: {
                en: string;
                ar: string;
            };
            label: {
                en: string;
                ar: string;
            };
            quantity: {
                minimum: number;
                maximum: number;
            };
            order: number;
            mode: "CURATED" | "RULE_BASED" | "HYBRID";
            required: boolean;
            internalName: string;
            rules: {
                values: string[];
                id: string;
                operator: "IS" | "IS_NOT" | "INCLUDES_DESCENDANTS";
                field: "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "ROUTINE_ROLE";
            }[];
            match: "ALL" | "ANY";
            curatedProductIds: string[];
            pinnedProductIds: string[];
            allowSameProduct: boolean;
        }, {
            id: string;
            key: string;
            description: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            label: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            quantity: {
                minimum: number;
                maximum: number;
            };
            order: number;
            mode: "CURATED" | "RULE_BASED" | "HYBRID";
            internalName: string;
            required?: boolean | undefined;
            rules?: {
                values: string[];
                id: string;
                operator: "IS" | "IS_NOT" | "INCLUDES_DESCENDANTS";
                field: "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "ROUTINE_ROLE";
            }[] | undefined;
            match?: "ALL" | "ANY" | undefined;
            curatedProductIds?: string[] | undefined;
            pinnedProductIds?: string[] | undefined;
            allowSameProduct?: boolean | undefined;
        }>, "many">;
        discount: z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
            type: z.ZodLiteral<"PERCENT_OFF">;
            basisPoints: z.ZodNumber;
            maximumDiscount: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
        }, "strict", z.ZodTypeAny, {
            type: "PERCENT_OFF";
            basisPoints: number;
            maximumDiscount: number | null;
        }, {
            type: "PERCENT_OFF";
            basisPoints: number;
            maximumDiscount?: number | null | undefined;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"FIXED_OFF">;
            amount: z.ZodNumber;
        }, "strict", z.ZodTypeAny, {
            type: "FIXED_OFF";
            amount: number;
        }, {
            type: "FIXED_OFF";
            amount: number;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"FIXED_TOTAL">;
            total: z.ZodNumber;
        }, "strict", z.ZodTypeAny, {
            type: "FIXED_TOTAL";
            total: number;
        }, {
            type: "FIXED_TOTAL";
            total: number;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"CHEAPEST_PERCENT_OFF">;
            basisPoints: z.ZodNumber;
            quantity: z.ZodDefault<z.ZodNumber>;
        }, "strict", z.ZodTypeAny, {
            type: "CHEAPEST_PERCENT_OFF";
            quantity: number;
            basisPoints: number;
        }, {
            type: "CHEAPEST_PERCENT_OFF";
            basisPoints: number;
            quantity?: number | undefined;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"CHEAPEST_FREE">;
            quantity: z.ZodDefault<z.ZodNumber>;
        }, "strict", z.ZodTypeAny, {
            type: "CHEAPEST_FREE";
            quantity: number;
        }, {
            type: "CHEAPEST_FREE";
            quantity?: number | undefined;
        }>]>;
        minimumRetailSubtotal: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
        stacking: z.ZodEnum<["EXCLUSIVE", "COMBINABLE", "BEST_OFFER"]>;
        combinableWith: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        allowMultipleInstances: z.ZodDefault<z.ZodBoolean>;
        allowCrossSlotProductReuse: z.ZodDefault<z.ZodBoolean>;
        usage: z.ZodDefault<z.ZodObject<{
            total: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
            perCustomer: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
            uniqueCustomers: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
        }, "strict", z.ZodTypeAny, {
            total: number | null;
            uniqueCustomers: number | null;
            perCustomer: number | null;
        }, {
            total?: number | null | undefined;
            uniqueCustomers?: number | null | undefined;
            perCustomer?: number | null | undefined;
        }>>;
        presentation: z.ZodDefault<z.ZodObject<{
            badge: z.ZodDefault<z.ZodObject<{
                en: z.ZodDefault<z.ZodString>;
                ar: z.ZodDefault<z.ZodString>;
            }, "strict", z.ZodTypeAny, {
                en: string;
                ar: string;
            }, {
                en?: string | undefined;
                ar?: string | undefined;
            }>>;
            showRetailTotal: z.ZodDefault<z.ZodBoolean>;
            showSavings: z.ZodDefault<z.ZodBoolean>;
            indexable: z.ZodDefault<z.ZodBoolean>;
        }, "strict", z.ZodTypeAny, {
            indexable: boolean;
            badge: {
                en: string;
                ar: string;
            };
            showRetailTotal: boolean;
            showSavings: boolean;
        }, {
            indexable?: boolean | undefined;
            badge?: {
                en?: string | undefined;
                ar?: string | undefined;
            } | undefined;
            showRetailTotal?: boolean | undefined;
            showSavings?: boolean | undefined;
        }>>;
    }, "strict", z.ZodTypeAny, {
        type: "FIXED" | "DYNAMIC";
        description: {
            en: string;
            ar: string;
        };
        name: {
            en: string;
            ar: string;
        };
        stacking: "EXCLUSIVE" | "COMBINABLE" | "BEST_OFFER";
        combinableWith: string[];
        discount: {
            type: "PERCENT_OFF";
            basisPoints: number;
            maximumDiscount: number | null;
        } | {
            type: "FIXED_OFF";
            amount: number;
        } | {
            type: "FIXED_TOTAL";
            total: number;
        } | {
            type: "CHEAPEST_PERCENT_OFF";
            quantity: number;
            basisPoints: number;
        } | {
            type: "CHEAPEST_FREE";
            quantity: number;
        };
        instructions: {
            en: string;
            ar: string;
        };
        presentation: {
            indexable: boolean;
            badge: {
                en: string;
                ar: string;
            };
            showRetailTotal: boolean;
            showSavings: boolean;
        };
        schemaVersion: 1;
        usage: {
            total: number | null;
            uniqueCustomers: number | null;
            perCustomer: number | null;
        };
        heroMediaKey: string | null;
        terms: {
            en: string;
            ar: string;
        };
        cardMediaKey: string | null;
        slots: {
            id: string;
            key: string;
            description: {
                en: string;
                ar: string;
            };
            label: {
                en: string;
                ar: string;
            };
            quantity: {
                minimum: number;
                maximum: number;
            };
            order: number;
            mode: "CURATED" | "RULE_BASED" | "HYBRID";
            required: boolean;
            internalName: string;
            rules: {
                values: string[];
                id: string;
                operator: "IS" | "IS_NOT" | "INCLUDES_DESCENDANTS";
                field: "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "ROUTINE_ROLE";
            }[];
            match: "ALL" | "ANY";
            curatedProductIds: string[];
            pinnedProductIds: string[];
            allowSameProduct: boolean;
        }[];
        minimumRetailSubtotal: number | null;
        allowMultipleInstances: boolean;
        allowCrossSlotProductReuse: boolean;
    }, {
        description: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        name: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        stacking: "EXCLUSIVE" | "COMBINABLE" | "BEST_OFFER";
        discount: {
            type: "PERCENT_OFF";
            basisPoints: number;
            maximumDiscount?: number | null | undefined;
        } | {
            type: "FIXED_OFF";
            amount: number;
        } | {
            type: "FIXED_TOTAL";
            total: number;
        } | {
            type: "CHEAPEST_PERCENT_OFF";
            basisPoints: number;
            quantity?: number | undefined;
        } | {
            type: "CHEAPEST_FREE";
            quantity?: number | undefined;
        };
        instructions: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        terms: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        slots: {
            id: string;
            key: string;
            description: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            label: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            quantity: {
                minimum: number;
                maximum: number;
            };
            order: number;
            mode: "CURATED" | "RULE_BASED" | "HYBRID";
            internalName: string;
            required?: boolean | undefined;
            rules?: {
                values: string[];
                id: string;
                operator: "IS" | "IS_NOT" | "INCLUDES_DESCENDANTS";
                field: "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "ROUTINE_ROLE";
            }[] | undefined;
            match?: "ALL" | "ANY" | undefined;
            curatedProductIds?: string[] | undefined;
            pinnedProductIds?: string[] | undefined;
            allowSameProduct?: boolean | undefined;
        }[];
        type?: "FIXED" | "DYNAMIC" | undefined;
        combinableWith?: string[] | undefined;
        presentation?: {
            indexable?: boolean | undefined;
            badge?: {
                en?: string | undefined;
                ar?: string | undefined;
            } | undefined;
            showRetailTotal?: boolean | undefined;
            showSavings?: boolean | undefined;
        } | undefined;
        schemaVersion?: 1 | undefined;
        usage?: {
            total?: number | null | undefined;
            uniqueCustomers?: number | null | undefined;
            perCustomer?: number | null | undefined;
        } | undefined;
        heroMediaKey?: string | null | undefined;
        cardMediaKey?: string | null | undefined;
        minimumRetailSubtotal?: number | null | undefined;
        allowMultipleInstances?: boolean | undefined;
        allowCrossSlotProductReuse?: boolean | undefined;
    }>, {
        type: "FIXED" | "DYNAMIC";
        description: {
            en: string;
            ar: string;
        };
        name: {
            en: string;
            ar: string;
        };
        stacking: "EXCLUSIVE" | "COMBINABLE" | "BEST_OFFER";
        combinableWith: string[];
        discount: {
            type: "PERCENT_OFF";
            basisPoints: number;
            maximumDiscount: number | null;
        } | {
            type: "FIXED_OFF";
            amount: number;
        } | {
            type: "FIXED_TOTAL";
            total: number;
        } | {
            type: "CHEAPEST_PERCENT_OFF";
            quantity: number;
            basisPoints: number;
        } | {
            type: "CHEAPEST_FREE";
            quantity: number;
        };
        instructions: {
            en: string;
            ar: string;
        };
        presentation: {
            indexable: boolean;
            badge: {
                en: string;
                ar: string;
            };
            showRetailTotal: boolean;
            showSavings: boolean;
        };
        schemaVersion: 1;
        usage: {
            total: number | null;
            uniqueCustomers: number | null;
            perCustomer: number | null;
        };
        heroMediaKey: string | null;
        terms: {
            en: string;
            ar: string;
        };
        cardMediaKey: string | null;
        slots: {
            id: string;
            key: string;
            description: {
                en: string;
                ar: string;
            };
            label: {
                en: string;
                ar: string;
            };
            quantity: {
                minimum: number;
                maximum: number;
            };
            order: number;
            mode: "CURATED" | "RULE_BASED" | "HYBRID";
            required: boolean;
            internalName: string;
            rules: {
                values: string[];
                id: string;
                operator: "IS" | "IS_NOT" | "INCLUDES_DESCENDANTS";
                field: "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "ROUTINE_ROLE";
            }[];
            match: "ALL" | "ANY";
            curatedProductIds: string[];
            pinnedProductIds: string[];
            allowSameProduct: boolean;
        }[];
        minimumRetailSubtotal: number | null;
        allowMultipleInstances: boolean;
        allowCrossSlotProductReuse: boolean;
    }, {
        description: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        name: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        stacking: "EXCLUSIVE" | "COMBINABLE" | "BEST_OFFER";
        discount: {
            type: "PERCENT_OFF";
            basisPoints: number;
            maximumDiscount?: number | null | undefined;
        } | {
            type: "FIXED_OFF";
            amount: number;
        } | {
            type: "FIXED_TOTAL";
            total: number;
        } | {
            type: "CHEAPEST_PERCENT_OFF";
            basisPoints: number;
            quantity?: number | undefined;
        } | {
            type: "CHEAPEST_FREE";
            quantity?: number | undefined;
        };
        instructions: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        terms: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        slots: {
            id: string;
            key: string;
            description: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            label: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            quantity: {
                minimum: number;
                maximum: number;
            };
            order: number;
            mode: "CURATED" | "RULE_BASED" | "HYBRID";
            internalName: string;
            required?: boolean | undefined;
            rules?: {
                values: string[];
                id: string;
                operator: "IS" | "IS_NOT" | "INCLUDES_DESCENDANTS";
                field: "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "ROUTINE_ROLE";
            }[] | undefined;
            match?: "ALL" | "ANY" | undefined;
            curatedProductIds?: string[] | undefined;
            pinnedProductIds?: string[] | undefined;
            allowSameProduct?: boolean | undefined;
        }[];
        type?: "FIXED" | "DYNAMIC" | undefined;
        combinableWith?: string[] | undefined;
        presentation?: {
            indexable?: boolean | undefined;
            badge?: {
                en?: string | undefined;
                ar?: string | undefined;
            } | undefined;
            showRetailTotal?: boolean | undefined;
            showSavings?: boolean | undefined;
        } | undefined;
        schemaVersion?: 1 | undefined;
        usage?: {
            total?: number | null | undefined;
            uniqueCustomers?: number | null | undefined;
            perCustomer?: number | null | undefined;
        } | undefined;
        heroMediaKey?: string | null | undefined;
        cardMediaKey?: string | null | undefined;
        minimumRetailSubtotal?: number | null | undefined;
        allowMultipleInstances?: boolean | undefined;
        allowCrossSlotProductReuse?: boolean | undefined;
    }>>;
    startsAt: z.ZodOptional<z.ZodDefault<z.ZodNullable<z.ZodString>>>;
    endsAt: z.ZodOptional<z.ZodDefault<z.ZodNullable<z.ZodString>>>;
    pageId: z.ZodOptional<z.ZodDefault<z.ZodNullable<z.ZodString>>>;
} & {
    expectedRevision: z.ZodNumber;
}, "strict", z.ZodTypeAny, {
    expectedRevision: number;
    startsAt?: string | null | undefined;
    endsAt?: string | null | undefined;
    slug?: string | undefined;
    internalName?: string | undefined;
    pageId?: string | null | undefined;
    definition?: {
        type: "FIXED" | "DYNAMIC";
        description: {
            en: string;
            ar: string;
        };
        name: {
            en: string;
            ar: string;
        };
        stacking: "EXCLUSIVE" | "COMBINABLE" | "BEST_OFFER";
        combinableWith: string[];
        discount: {
            type: "PERCENT_OFF";
            basisPoints: number;
            maximumDiscount: number | null;
        } | {
            type: "FIXED_OFF";
            amount: number;
        } | {
            type: "FIXED_TOTAL";
            total: number;
        } | {
            type: "CHEAPEST_PERCENT_OFF";
            quantity: number;
            basisPoints: number;
        } | {
            type: "CHEAPEST_FREE";
            quantity: number;
        };
        instructions: {
            en: string;
            ar: string;
        };
        presentation: {
            indexable: boolean;
            badge: {
                en: string;
                ar: string;
            };
            showRetailTotal: boolean;
            showSavings: boolean;
        };
        schemaVersion: 1;
        usage: {
            total: number | null;
            uniqueCustomers: number | null;
            perCustomer: number | null;
        };
        heroMediaKey: string | null;
        terms: {
            en: string;
            ar: string;
        };
        cardMediaKey: string | null;
        slots: {
            id: string;
            key: string;
            description: {
                en: string;
                ar: string;
            };
            label: {
                en: string;
                ar: string;
            };
            quantity: {
                minimum: number;
                maximum: number;
            };
            order: number;
            mode: "CURATED" | "RULE_BASED" | "HYBRID";
            required: boolean;
            internalName: string;
            rules: {
                values: string[];
                id: string;
                operator: "IS" | "IS_NOT" | "INCLUDES_DESCENDANTS";
                field: "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "ROUTINE_ROLE";
            }[];
            match: "ALL" | "ANY";
            curatedProductIds: string[];
            pinnedProductIds: string[];
            allowSameProduct: boolean;
        }[];
        minimumRetailSubtotal: number | null;
        allowMultipleInstances: boolean;
        allowCrossSlotProductReuse: boolean;
    } | undefined;
}, {
    expectedRevision: number;
    startsAt?: string | null | undefined;
    endsAt?: string | null | undefined;
    slug?: string | undefined;
    internalName?: string | undefined;
    pageId?: string | null | undefined;
    definition?: {
        description: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        name: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        stacking: "EXCLUSIVE" | "COMBINABLE" | "BEST_OFFER";
        discount: {
            type: "PERCENT_OFF";
            basisPoints: number;
            maximumDiscount?: number | null | undefined;
        } | {
            type: "FIXED_OFF";
            amount: number;
        } | {
            type: "FIXED_TOTAL";
            total: number;
        } | {
            type: "CHEAPEST_PERCENT_OFF";
            basisPoints: number;
            quantity?: number | undefined;
        } | {
            type: "CHEAPEST_FREE";
            quantity?: number | undefined;
        };
        instructions: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        terms: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        slots: {
            id: string;
            key: string;
            description: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            label: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            quantity: {
                minimum: number;
                maximum: number;
            };
            order: number;
            mode: "CURATED" | "RULE_BASED" | "HYBRID";
            internalName: string;
            required?: boolean | undefined;
            rules?: {
                values: string[];
                id: string;
                operator: "IS" | "IS_NOT" | "INCLUDES_DESCENDANTS";
                field: "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "ROUTINE_ROLE";
            }[] | undefined;
            match?: "ALL" | "ANY" | undefined;
            curatedProductIds?: string[] | undefined;
            pinnedProductIds?: string[] | undefined;
            allowSameProduct?: boolean | undefined;
        }[];
        type?: "FIXED" | "DYNAMIC" | undefined;
        combinableWith?: string[] | undefined;
        presentation?: {
            indexable?: boolean | undefined;
            badge?: {
                en?: string | undefined;
                ar?: string | undefined;
            } | undefined;
            showRetailTotal?: boolean | undefined;
            showSavings?: boolean | undefined;
        } | undefined;
        schemaVersion?: 1 | undefined;
        usage?: {
            total?: number | null | undefined;
            uniqueCustomers?: number | null | undefined;
            perCustomer?: number | null | undefined;
        } | undefined;
        heroMediaKey?: string | null | undefined;
        cardMediaKey?: string | null | undefined;
        minimumRetailSubtotal?: number | null | undefined;
        allowMultipleInstances?: boolean | undefined;
        allowCrossSlotProductReuse?: boolean | undefined;
    } | undefined;
}>;
export declare const dynamicBundleRevisionActionSchema: z.ZodObject<{
    expectedRevision: z.ZodNumber;
}, "strict", z.ZodTypeAny, {
    expectedRevision: number;
}, {
    expectedRevision: number;
}>;
export declare const bundleSelectionSchema: z.ZodObject<{
    slotKey: z.ZodString;
    productId: z.ZodString;
    variantId: z.ZodString;
    quantity: z.ZodNumber;
}, "strict", z.ZodTypeAny, {
    quantity: number;
    variantId: string;
    productId: string;
    slotKey: string;
}, {
    quantity: number;
    variantId: string;
    productId: string;
    slotKey: string;
}>;
export declare const previewDynamicBundleSchema: z.ZodObject<{
    selections: z.ZodArray<z.ZodObject<{
        slotKey: z.ZodString;
        productId: z.ZodString;
        variantId: z.ZodString;
        quantity: z.ZodNumber;
    }, "strict", z.ZodTypeAny, {
        quantity: number;
        variantId: string;
        productId: string;
        slotKey: string;
    }, {
        quantity: number;
        variantId: string;
        productId: string;
        slotKey: string;
    }>, "many">;
    couponCode: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    expectedVersion: z.ZodOptional<z.ZodNumber>;
    diagnostic: z.ZodDefault<z.ZodBoolean>;
}, "strict", z.ZodTypeAny, {
    couponCode: string | null;
    diagnostic: boolean;
    selections: {
        quantity: number;
        variantId: string;
        productId: string;
        slotKey: string;
    }[];
    expectedVersion?: number | undefined;
}, {
    selections: {
        quantity: number;
        variantId: string;
        productId: string;
        slotKey: string;
    }[];
    couponCode?: string | null | undefined;
    diagnostic?: boolean | undefined;
    expectedVersion?: number | undefined;
}>;
export declare const addDynamicBundleToCartSchema: z.ZodObject<{
    selections: z.ZodArray<z.ZodObject<{
        slotKey: z.ZodString;
        productId: z.ZodString;
        variantId: z.ZodString;
        quantity: z.ZodNumber;
    }, "strict", z.ZodTypeAny, {
        quantity: number;
        variantId: string;
        productId: string;
        slotKey: string;
    }, {
        quantity: number;
        variantId: string;
        productId: string;
        slotKey: string;
    }>, "many">;
    couponCode: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    expectedVersion: z.ZodOptional<z.ZodNumber>;
    diagnostic: z.ZodDefault<z.ZodBoolean>;
} & {
    clientMutationId: z.ZodString;
}, "strict", z.ZodTypeAny, {
    couponCode: string | null;
    diagnostic: boolean;
    selections: {
        quantity: number;
        variantId: string;
        productId: string;
        slotKey: string;
    }[];
    clientMutationId: string;
    expectedVersion?: number | undefined;
}, {
    selections: {
        quantity: number;
        variantId: string;
        productId: string;
        slotKey: string;
    }[];
    clientMutationId: string;
    couponCode?: string | null | undefined;
    diagnostic?: boolean | undefined;
    expectedVersion?: number | undefined;
}>;
export declare const bundleListQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    sortBy: z.ZodOptional<z.ZodString>;
    sortOrder: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
} & {
    state: z.ZodOptional<z.ZodEnum<["DRAFT", "ACTIVE", "PAUSED", "ARCHIVED"]>>;
    search: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    page: number;
    limit: number;
    sortOrder: "asc" | "desc";
    sortBy?: string | undefined;
    search?: string | undefined;
    state?: "ACTIVE" | "ARCHIVED" | "DRAFT" | "PAUSED" | undefined;
}, {
    page?: number | undefined;
    limit?: number | undefined;
    sortBy?: string | undefined;
    sortOrder?: "asc" | "desc" | undefined;
    search?: string | undefined;
    state?: "ACTIVE" | "ARCHIVED" | "DRAFT" | "PAUSED" | undefined;
}>;
export declare const bundleSlotProductsQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    sortBy: z.ZodOptional<z.ZodString>;
    sortOrder: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
} & {
    search: z.ZodOptional<z.ZodString>;
    brandId: z.ZodOptional<z.ZodString>;
    categoryId: z.ZodOptional<z.ZodString>;
    minPrice: z.ZodOptional<z.ZodNumber>;
    maxPrice: z.ZodOptional<z.ZodNumber>;
    inStock: z.ZodDefault<z.ZodBoolean>;
    sort: z.ZodDefault<z.ZodEnum<["RECOMMENDED", "NEWEST", "PRICE_LOW", "PRICE_HIGH", "NAME"]>>;
}, "strip", z.ZodTypeAny, {
    sort: "NEWEST" | "NAME" | "PRICE_LOW" | "PRICE_HIGH" | "RECOMMENDED";
    page: number;
    limit: number;
    sortOrder: "asc" | "desc";
    inStock: boolean;
    sortBy?: string | undefined;
    search?: string | undefined;
    categoryId?: string | undefined;
    brandId?: string | undefined;
    minPrice?: number | undefined;
    maxPrice?: number | undefined;
}, {
    sort?: "NEWEST" | "NAME" | "PRICE_LOW" | "PRICE_HIGH" | "RECOMMENDED" | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sortBy?: string | undefined;
    sortOrder?: "asc" | "desc" | undefined;
    search?: string | undefined;
    categoryId?: string | undefined;
    brandId?: string | undefined;
    inStock?: boolean | undefined;
    minPrice?: number | undefined;
    maxPrice?: number | undefined;
}>;
export declare const bundleLinePricingSchema: z.ZodObject<{
    slotKey: z.ZodString;
    productId: z.ZodString;
    variantId: z.ZodString;
    quantity: z.ZodNumber;
    unitPrice: z.ZodNumber;
    retailTotal: z.ZodNumber;
    discount: z.ZodNumber;
    finalTotal: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    quantity: number;
    variantId: string;
    productId: string;
    unitPrice: number;
    discount: number;
    slotKey: string;
    retailTotal: number;
    finalTotal: number;
}, {
    quantity: number;
    variantId: string;
    productId: string;
    unitPrice: number;
    discount: number;
    slotKey: string;
    retailTotal: number;
    finalTotal: number;
}>;
export declare const bundlePreviewResponseSchema: z.ZodObject<{
    valid: z.ZodBoolean;
    bundleId: z.ZodString;
    version: z.ZodNumber;
    state: z.ZodEnum<["INCOMPLETE", "VALID", "INVALID", "STALE"]>;
    missingSlots: z.ZodArray<z.ZodString, "many">;
    errors: z.ZodArray<z.ZodObject<{
        code: z.ZodString;
        slotKey: z.ZodNullable<z.ZodString>;
        message: z.ZodObject<{
            en: z.ZodDefault<z.ZodString>;
            ar: z.ZodDefault<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            en: string;
            ar: string;
        }, {
            en?: string | undefined;
            ar?: string | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        code: string;
        message: {
            en: string;
            ar: string;
        };
        slotKey: string | null;
    }, {
        code: string;
        message: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        slotKey: string | null;
    }>, "many">;
    lines: z.ZodArray<z.ZodObject<{
        slotKey: z.ZodString;
        productId: z.ZodString;
        variantId: z.ZodString;
        quantity: z.ZodNumber;
        unitPrice: z.ZodNumber;
        retailTotal: z.ZodNumber;
        discount: z.ZodNumber;
        finalTotal: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        quantity: number;
        variantId: string;
        productId: string;
        unitPrice: number;
        discount: number;
        slotKey: string;
        retailTotal: number;
        finalTotal: number;
    }, {
        quantity: number;
        variantId: string;
        productId: string;
        unitPrice: number;
        discount: number;
        slotKey: string;
        retailTotal: number;
        finalTotal: number;
    }>, "many">;
    retailTotal: z.ZodNumber;
    discountTotal: z.ZodNumber;
    finalTotal: z.ZodNumber;
    stacking: z.ZodEnum<["EXCLUSIVE", "COMBINABLE", "BEST_OFFER"]>;
    diagnostics: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    valid: boolean;
    state: "VALID" | "INVALID" | "INCOMPLETE" | "STALE";
    stacking: "EXCLUSIVE" | "COMBINABLE" | "BEST_OFFER";
    lines: {
        quantity: number;
        variantId: string;
        productId: string;
        unitPrice: number;
        discount: number;
        slotKey: string;
        retailTotal: number;
        finalTotal: number;
    }[];
    bundleId: string;
    version: number;
    retailTotal: number;
    discountTotal: number;
    finalTotal: number;
    missingSlots: string[];
    errors: {
        code: string;
        message: {
            en: string;
            ar: string;
        };
        slotKey: string | null;
    }[];
    diagnostics?: string[] | undefined;
}, {
    valid: boolean;
    state: "VALID" | "INVALID" | "INCOMPLETE" | "STALE";
    stacking: "EXCLUSIVE" | "COMBINABLE" | "BEST_OFFER";
    lines: {
        quantity: number;
        variantId: string;
        productId: string;
        unitPrice: number;
        discount: number;
        slotKey: string;
        retailTotal: number;
        finalTotal: number;
    }[];
    bundleId: string;
    version: number;
    retailTotal: number;
    discountTotal: number;
    finalTotal: number;
    missingSlots: string[];
    errors: {
        code: string;
        message: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        slotKey: string | null;
    }[];
    diagnostics?: string[] | undefined;
}>;
export declare const bundleSummarySchema: z.ZodObject<{
    id: z.ZodString;
    internalName: z.ZodString;
    slug: z.ZodString;
    state: z.ZodEnum<["DRAFT", "ACTIVE", "PAUSED", "ARCHIVED"]>;
    draftRevision: z.ZodNumber;
    publishedRevision: z.ZodNullable<z.ZodNumber>;
    name: z.ZodObject<{
        en: z.ZodDefault<z.ZodString>;
        ar: z.ZodDefault<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        en: string;
        ar: string;
    }, {
        en?: string | undefined;
        ar?: string | undefined;
    }>;
    slotCount: z.ZodNumber;
    discountLabel: z.ZodObject<{
        en: z.ZodDefault<z.ZodString>;
        ar: z.ZodDefault<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        en: string;
        ar: string;
    }, {
        en?: string | undefined;
        ar?: string | undefined;
    }>;
    startsAt: z.ZodNullable<z.ZodString>;
    endsAt: z.ZodNullable<z.ZodString>;
    health: z.ZodEnum<["HEALTHY", "WARNING", "BROKEN"]>;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    updatedAt: string;
    name: {
        en: string;
        ar: string;
    };
    state: "ACTIVE" | "ARCHIVED" | "DRAFT" | "PAUSED";
    startsAt: string | null;
    endsAt: string | null;
    slug: string;
    internalName: string;
    draftRevision: number;
    publishedRevision: number | null;
    slotCount: number;
    discountLabel: {
        en: string;
        ar: string;
    };
    health: "WARNING" | "HEALTHY" | "BROKEN";
}, {
    id: string;
    updatedAt: string;
    name: {
        en?: string | undefined;
        ar?: string | undefined;
    };
    state: "ACTIVE" | "ARCHIVED" | "DRAFT" | "PAUSED";
    startsAt: string | null;
    endsAt: string | null;
    slug: string;
    internalName: string;
    draftRevision: number;
    publishedRevision: number | null;
    slotCount: number;
    discountLabel: {
        en?: string | undefined;
        ar?: string | undefined;
    };
    health: "WARNING" | "HEALTHY" | "BROKEN";
}>;
export declare const bundleListResponseSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        internalName: z.ZodString;
        slug: z.ZodString;
        state: z.ZodEnum<["DRAFT", "ACTIVE", "PAUSED", "ARCHIVED"]>;
        draftRevision: z.ZodNumber;
        publishedRevision: z.ZodNullable<z.ZodNumber>;
        name: z.ZodObject<{
            en: z.ZodDefault<z.ZodString>;
            ar: z.ZodDefault<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            en: string;
            ar: string;
        }, {
            en?: string | undefined;
            ar?: string | undefined;
        }>;
        slotCount: z.ZodNumber;
        discountLabel: z.ZodObject<{
            en: z.ZodDefault<z.ZodString>;
            ar: z.ZodDefault<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            en: string;
            ar: string;
        }, {
            en?: string | undefined;
            ar?: string | undefined;
        }>;
        startsAt: z.ZodNullable<z.ZodString>;
        endsAt: z.ZodNullable<z.ZodString>;
        health: z.ZodEnum<["HEALTHY", "WARNING", "BROKEN"]>;
        updatedAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        updatedAt: string;
        name: {
            en: string;
            ar: string;
        };
        state: "ACTIVE" | "ARCHIVED" | "DRAFT" | "PAUSED";
        startsAt: string | null;
        endsAt: string | null;
        slug: string;
        internalName: string;
        draftRevision: number;
        publishedRevision: number | null;
        slotCount: number;
        discountLabel: {
            en: string;
            ar: string;
        };
        health: "WARNING" | "HEALTHY" | "BROKEN";
    }, {
        id: string;
        updatedAt: string;
        name: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        state: "ACTIVE" | "ARCHIVED" | "DRAFT" | "PAUSED";
        startsAt: string | null;
        endsAt: string | null;
        slug: string;
        internalName: string;
        draftRevision: number;
        publishedRevision: number | null;
        slotCount: number;
        discountLabel: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        health: "WARNING" | "HEALTHY" | "BROKEN";
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
        updatedAt: string;
        name: {
            en: string;
            ar: string;
        };
        state: "ACTIVE" | "ARCHIVED" | "DRAFT" | "PAUSED";
        startsAt: string | null;
        endsAt: string | null;
        slug: string;
        internalName: string;
        draftRevision: number;
        publishedRevision: number | null;
        slotCount: number;
        discountLabel: {
            en: string;
            ar: string;
        };
        health: "WARNING" | "HEALTHY" | "BROKEN";
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
        updatedAt: string;
        name: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        state: "ACTIVE" | "ARCHIVED" | "DRAFT" | "PAUSED";
        startsAt: string | null;
        endsAt: string | null;
        slug: string;
        internalName: string;
        draftRevision: number;
        publishedRevision: number | null;
        slotCount: number;
        discountLabel: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        health: "WARNING" | "HEALTHY" | "BROKEN";
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
export type DynamicBundleDefinition = z.infer<typeof dynamicBundleDefinitionSchema>;
export type BundleSlot = z.infer<typeof bundleSlotSchema>;
export type BundleRule = z.infer<typeof bundleRuleSchema>;
export type CreateDynamicBundleInput = z.infer<typeof createDynamicBundleSchema>;
export type UpdateDynamicBundleDraftInput = z.infer<typeof updateDynamicBundleDraftSchema>;
export type BundleSelection = z.infer<typeof bundleSelectionSchema>;
export type PreviewDynamicBundleInput = z.infer<typeof previewDynamicBundleSchema>;
export type AddDynamicBundleToCartInput = z.infer<typeof addDynamicBundleToCartSchema>;
export type BundleListQuery = z.infer<typeof bundleListQuerySchema>;
export type BundleSlotProductsQuery = z.infer<typeof bundleSlotProductsQuerySchema>;
export type BundlePreviewResponse = z.infer<typeof bundlePreviewResponseSchema>;
//# sourceMappingURL=dynamic-bundle.schema.d.ts.map