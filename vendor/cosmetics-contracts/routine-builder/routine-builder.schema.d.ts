import { z } from "zod";
export declare const routineBuilderSchemaVersion: 1;
export declare const routineKeySchema: z.ZodString;
export declare const routineLocalizedTextSchema: z.ZodObject<{
    en: z.ZodString;
    ar: z.ZodString;
}, "strip", z.ZodTypeAny, {
    en: string;
    ar: string;
}, {
    en: string;
    ar: string;
}>;
export declare const routineQuestionTypeSchema: z.ZodEnum<["SINGLE_CHOICE", "MULTIPLE_CHOICE", "RANKED_CHOICE", "YES_NO", "SCALE", "OPTIONAL_TEXT", "NUMERIC_RANGE", "PRODUCT_SELECTION", "INGREDIENT_PREFERENCE"]>;
export declare const routineOperatorSchema: z.ZodEnum<["EQUALS", "NOT_EQUALS", "CONTAINS", "CONTAINS_ANY", "CONTAINS_ALL", "GREATER_THAN", "LESS_THAN"]>;
export declare const routineConditionSchema: z.ZodObject<{
    id: z.ZodString;
    questionKey: z.ZodString;
    operator: z.ZodEnum<["EQUALS", "NOT_EQUALS", "CONTAINS", "CONTAINS_ANY", "CONTAINS_ALL", "GREATER_THAN", "LESS_THAN"]>;
    value: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodString, "many">]>;
}, "strip", z.ZodTypeAny, {
    value: string | number | boolean | string[];
    id: string;
    operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "CONTAINS_ANY" | "CONTAINS_ALL" | "GREATER_THAN" | "LESS_THAN";
    questionKey: string;
}, {
    value: string | number | boolean | string[];
    id: string;
    operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "CONTAINS_ANY" | "CONTAINS_ALL" | "GREATER_THAN" | "LESS_THAN";
    questionKey: string;
}>;
export declare const routineConditionGroupSchema: z.ZodObject<{
    mode: z.ZodEnum<["ALL", "ANY"]>;
    conditions: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        questionKey: z.ZodString;
        operator: z.ZodEnum<["EQUALS", "NOT_EQUALS", "CONTAINS", "CONTAINS_ANY", "CONTAINS_ALL", "GREATER_THAN", "LESS_THAN"]>;
        value: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodString, "many">]>;
    }, "strip", z.ZodTypeAny, {
        value: string | number | boolean | string[];
        id: string;
        operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "CONTAINS_ANY" | "CONTAINS_ALL" | "GREATER_THAN" | "LESS_THAN";
        questionKey: string;
    }, {
        value: string | number | boolean | string[];
        id: string;
        operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "CONTAINS_ANY" | "CONTAINS_ALL" | "GREATER_THAN" | "LESS_THAN";
        questionKey: string;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    conditions: {
        value: string | number | boolean | string[];
        id: string;
        operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "CONTAINS_ANY" | "CONTAINS_ALL" | "GREATER_THAN" | "LESS_THAN";
        questionKey: string;
    }[];
    mode: "ALL" | "ANY";
}, {
    conditions: {
        value: string | number | boolean | string[];
        id: string;
        operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "CONTAINS_ANY" | "CONTAINS_ALL" | "GREATER_THAN" | "LESS_THAN";
        questionKey: string;
    }[];
    mode: "ALL" | "ANY";
}>;
export declare const routineSignalSchema: z.ZodObject<{
    key: z.ZodString;
    value: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodString, "many">]>;
}, "strip", z.ZodTypeAny, {
    value: string | number | boolean | string[];
    key: string;
}, {
    value: string | number | boolean | string[];
    key: string;
}>;
export declare const routineAnswerSchema: z.ZodObject<{
    id: z.ZodString;
    key: z.ZodString;
    label: z.ZodObject<{
        en: z.ZodString;
        ar: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        en: string;
        ar: string;
    }, {
        en: string;
        ar: string;
    }>;
    description: z.ZodDefault<z.ZodObject<{
        en: z.ZodString;
        ar: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        en: string;
        ar: string;
    }, {
        en: string;
        ar: string;
    }>>;
    signals: z.ZodDefault<z.ZodArray<z.ZodObject<{
        key: z.ZodString;
        value: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodString, "many">]>;
    }, "strip", z.ZodTypeAny, {
        value: string | number | boolean | string[];
        key: string;
    }, {
        value: string | number | boolean | string[];
        key: string;
    }>, "many">>;
    order: z.ZodNumber;
    enabled: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
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
    order: number;
    enabled: boolean;
    signals: {
        value: string | number | boolean | string[];
        key: string;
    }[];
}, {
    id: string;
    key: string;
    label: {
        en: string;
        ar: string;
    };
    order: number;
    description?: {
        en: string;
        ar: string;
    } | undefined;
    enabled?: boolean | undefined;
    signals?: {
        value: string | number | boolean | string[];
        key: string;
    }[] | undefined;
}>;
export declare const routineQuestionSchema: z.ZodEffects<z.ZodObject<{
    id: z.ZodString;
    key: z.ZodString;
    type: z.ZodEnum<["SINGLE_CHOICE", "MULTIPLE_CHOICE", "RANKED_CHOICE", "YES_NO", "SCALE", "OPTIONAL_TEXT", "NUMERIC_RANGE", "PRODUCT_SELECTION", "INGREDIENT_PREFERENCE"]>;
    label: z.ZodObject<{
        en: z.ZodString;
        ar: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        en: string;
        ar: string;
    }, {
        en: string;
        ar: string;
    }>;
    description: z.ZodDefault<z.ZodObject<{
        en: z.ZodString;
        ar: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        en: string;
        ar: string;
    }, {
        en: string;
        ar: string;
    }>>;
    helpText: z.ZodDefault<z.ZodObject<{
        en: z.ZodString;
        ar: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        en: string;
        ar: string;
    }, {
        en: string;
        ar: string;
    }>>;
    required: z.ZodDefault<z.ZodBoolean>;
    enabled: z.ZodDefault<z.ZodBoolean>;
    order: z.ZodNumber;
    visibility: z.ZodDefault<z.ZodNullable<z.ZodObject<{
        mode: z.ZodEnum<["ALL", "ANY"]>;
        conditions: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            questionKey: z.ZodString;
            operator: z.ZodEnum<["EQUALS", "NOT_EQUALS", "CONTAINS", "CONTAINS_ANY", "CONTAINS_ALL", "GREATER_THAN", "LESS_THAN"]>;
            value: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodString, "many">]>;
        }, "strip", z.ZodTypeAny, {
            value: string | number | boolean | string[];
            id: string;
            operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "CONTAINS_ANY" | "CONTAINS_ALL" | "GREATER_THAN" | "LESS_THAN";
            questionKey: string;
        }, {
            value: string | number | boolean | string[];
            id: string;
            operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "CONTAINS_ANY" | "CONTAINS_ALL" | "GREATER_THAN" | "LESS_THAN";
            questionKey: string;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        conditions: {
            value: string | number | boolean | string[];
            id: string;
            operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "CONTAINS_ANY" | "CONTAINS_ALL" | "GREATER_THAN" | "LESS_THAN";
            questionKey: string;
        }[];
        mode: "ALL" | "ANY";
    }, {
        conditions: {
            value: string | number | boolean | string[];
            id: string;
            operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "CONTAINS_ANY" | "CONTAINS_ALL" | "GREATER_THAN" | "LESS_THAN";
            questionKey: string;
        }[];
        mode: "ALL" | "ANY";
    }>>>;
    answers: z.ZodDefault<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        key: z.ZodString;
        label: z.ZodObject<{
            en: z.ZodString;
            ar: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            en: string;
            ar: string;
        }, {
            en: string;
            ar: string;
        }>;
        description: z.ZodDefault<z.ZodObject<{
            en: z.ZodString;
            ar: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            en: string;
            ar: string;
        }, {
            en: string;
            ar: string;
        }>>;
        signals: z.ZodDefault<z.ZodArray<z.ZodObject<{
            key: z.ZodString;
            value: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodString, "many">]>;
        }, "strip", z.ZodTypeAny, {
            value: string | number | boolean | string[];
            key: string;
        }, {
            value: string | number | boolean | string[];
            key: string;
        }>, "many">>;
        order: z.ZodNumber;
        enabled: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
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
        order: number;
        enabled: boolean;
        signals: {
            value: string | number | boolean | string[];
            key: string;
        }[];
    }, {
        id: string;
        key: string;
        label: {
            en: string;
            ar: string;
        };
        order: number;
        description?: {
            en: string;
            ar: string;
        } | undefined;
        enabled?: boolean | undefined;
        signals?: {
            value: string | number | boolean | string[];
            key: string;
        }[] | undefined;
    }>, "many">>;
    minSelections: z.ZodDefault<z.ZodNumber>;
    maxSelections: z.ZodDefault<z.ZodNumber>;
    scale: z.ZodDefault<z.ZodNullable<z.ZodObject<{
        min: z.ZodNumber;
        max: z.ZodNumber;
        step: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        min: number;
        max: number;
        step: number;
    }, {
        min: number;
        max: number;
        step: number;
    }>>>;
}, "strip", z.ZodTypeAny, {
    type: "SINGLE_CHOICE" | "MULTIPLE_CHOICE" | "RANKED_CHOICE" | "YES_NO" | "SCALE" | "OPTIONAL_TEXT" | "NUMERIC_RANGE" | "PRODUCT_SELECTION" | "INGREDIENT_PREFERENCE";
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
    order: number;
    enabled: boolean;
    visibility: {
        conditions: {
            value: string | number | boolean | string[];
            id: string;
            operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "CONTAINS_ANY" | "CONTAINS_ALL" | "GREATER_THAN" | "LESS_THAN";
            questionKey: string;
        }[];
        mode: "ALL" | "ANY";
    } | null;
    helpText: {
        en: string;
        ar: string;
    };
    required: boolean;
    answers: {
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
        order: number;
        enabled: boolean;
        signals: {
            value: string | number | boolean | string[];
            key: string;
        }[];
    }[];
    minSelections: number;
    maxSelections: number;
    scale: {
        min: number;
        max: number;
        step: number;
    } | null;
}, {
    type: "SINGLE_CHOICE" | "MULTIPLE_CHOICE" | "RANKED_CHOICE" | "YES_NO" | "SCALE" | "OPTIONAL_TEXT" | "NUMERIC_RANGE" | "PRODUCT_SELECTION" | "INGREDIENT_PREFERENCE";
    id: string;
    key: string;
    label: {
        en: string;
        ar: string;
    };
    order: number;
    description?: {
        en: string;
        ar: string;
    } | undefined;
    enabled?: boolean | undefined;
    visibility?: {
        conditions: {
            value: string | number | boolean | string[];
            id: string;
            operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "CONTAINS_ANY" | "CONTAINS_ALL" | "GREATER_THAN" | "LESS_THAN";
            questionKey: string;
        }[];
        mode: "ALL" | "ANY";
    } | null | undefined;
    helpText?: {
        en: string;
        ar: string;
    } | undefined;
    required?: boolean | undefined;
    answers?: {
        id: string;
        key: string;
        label: {
            en: string;
            ar: string;
        };
        order: number;
        description?: {
            en: string;
            ar: string;
        } | undefined;
        enabled?: boolean | undefined;
        signals?: {
            value: string | number | boolean | string[];
            key: string;
        }[] | undefined;
    }[] | undefined;
    minSelections?: number | undefined;
    maxSelections?: number | undefined;
    scale?: {
        min: number;
        max: number;
        step: number;
    } | null | undefined;
}>, {
    type: "SINGLE_CHOICE" | "MULTIPLE_CHOICE" | "RANKED_CHOICE" | "YES_NO" | "SCALE" | "OPTIONAL_TEXT" | "NUMERIC_RANGE" | "PRODUCT_SELECTION" | "INGREDIENT_PREFERENCE";
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
    order: number;
    enabled: boolean;
    visibility: {
        conditions: {
            value: string | number | boolean | string[];
            id: string;
            operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "CONTAINS_ANY" | "CONTAINS_ALL" | "GREATER_THAN" | "LESS_THAN";
            questionKey: string;
        }[];
        mode: "ALL" | "ANY";
    } | null;
    helpText: {
        en: string;
        ar: string;
    };
    required: boolean;
    answers: {
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
        order: number;
        enabled: boolean;
        signals: {
            value: string | number | boolean | string[];
            key: string;
        }[];
    }[];
    minSelections: number;
    maxSelections: number;
    scale: {
        min: number;
        max: number;
        step: number;
    } | null;
}, {
    type: "SINGLE_CHOICE" | "MULTIPLE_CHOICE" | "RANKED_CHOICE" | "YES_NO" | "SCALE" | "OPTIONAL_TEXT" | "NUMERIC_RANGE" | "PRODUCT_SELECTION" | "INGREDIENT_PREFERENCE";
    id: string;
    key: string;
    label: {
        en: string;
        ar: string;
    };
    order: number;
    description?: {
        en: string;
        ar: string;
    } | undefined;
    enabled?: boolean | undefined;
    visibility?: {
        conditions: {
            value: string | number | boolean | string[];
            id: string;
            operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "CONTAINS_ANY" | "CONTAINS_ALL" | "GREATER_THAN" | "LESS_THAN";
            questionKey: string;
        }[];
        mode: "ALL" | "ANY";
    } | null | undefined;
    helpText?: {
        en: string;
        ar: string;
    } | undefined;
    required?: boolean | undefined;
    answers?: {
        id: string;
        key: string;
        label: {
            en: string;
            ar: string;
        };
        order: number;
        description?: {
            en: string;
            ar: string;
        } | undefined;
        enabled?: boolean | undefined;
        signals?: {
            value: string | number | boolean | string[];
            key: string;
        }[] | undefined;
    }[] | undefined;
    minSelections?: number | undefined;
    maxSelections?: number | undefined;
    scale?: {
        min: number;
        max: number;
        step: number;
    } | null | undefined;
}>;
export declare const routineConcernSchema: z.ZodObject<{
    id: z.ZodString;
    key: z.ZodString;
    label: z.ZodObject<{
        en: z.ZodString;
        ar: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        en: string;
        ar: string;
    }, {
        en: string;
        ar: string;
    }>;
    description: z.ZodDefault<z.ZodObject<{
        en: z.ZodString;
        ar: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        en: string;
        ar: string;
    }, {
        en: string;
        ar: string;
    }>>;
    enabled: z.ZodDefault<z.ZodBoolean>;
    order: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
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
    order: number;
    enabled: boolean;
}, {
    id: string;
    key: string;
    label: {
        en: string;
        ar: string;
    };
    order: number;
    description?: {
        en: string;
        ar: string;
    } | undefined;
    enabled?: boolean | undefined;
}>;
export declare const routineRoleSchema: z.ZodObject<{
    id: z.ZodString;
    key: z.ZodString;
    label: z.ZodObject<{
        en: z.ZodString;
        ar: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        en: string;
        ar: string;
    }, {
        en: string;
        ar: string;
    }>;
    description: z.ZodDefault<z.ZodObject<{
        en: z.ZodString;
        ar: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        en: string;
        ar: string;
    }, {
        en: string;
        ar: string;
    }>>;
    amOrder: z.ZodNumber;
    pmOrder: z.ZodNumber;
    enabled: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
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
    enabled: boolean;
    amOrder: number;
    pmOrder: number;
}, {
    id: string;
    key: string;
    label: {
        en: string;
        ar: string;
    };
    amOrder: number;
    pmOrder: number;
    description?: {
        en: string;
        ar: string;
    } | undefined;
    enabled?: boolean | undefined;
}>;
export declare const routineTargetSchema: z.ZodObject<{
    kind: z.ZodEnum<["ALL", "PRODUCT", "VARIANT", "CATEGORY", "BRAND", "TAG", "INGREDIENT", "ROLE"]>;
    ids: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    keys: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    keys: string[];
    ids: string[];
    kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
}, {
    kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
    keys?: string[] | undefined;
    ids?: string[] | undefined;
}>;
export declare const routineRuleEffectSchema: z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
    type: z.ZodLiteral<"BOOST">;
    target: z.ZodObject<{
        kind: z.ZodEnum<["ALL", "PRODUCT", "VARIANT", "CATEGORY", "BRAND", "TAG", "INGREDIENT", "ROLE"]>;
        ids: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        keys: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        keys: string[];
        ids: string[];
        kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
    }, {
        kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
        keys?: string[] | undefined;
        ids?: string[] | undefined;
    }>;
    score: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    type: "BOOST";
    target: {
        keys: string[];
        ids: string[];
        kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
    };
    score: number;
}, {
    type: "BOOST";
    target: {
        kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
        keys?: string[] | undefined;
        ids?: string[] | undefined;
    };
    score: number;
}>, z.ZodObject<{
    type: z.ZodLiteral<"EXCLUDE">;
    target: z.ZodObject<{
        kind: z.ZodEnum<["ALL", "PRODUCT", "VARIANT", "CATEGORY", "BRAND", "TAG", "INGREDIENT", "ROLE"]>;
        ids: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        keys: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        keys: string[];
        ids: string[];
        kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
    }, {
        kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
        keys?: string[] | undefined;
        ids?: string[] | undefined;
    }>;
    reason: z.ZodObject<{
        en: z.ZodString;
        ar: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        en: string;
        ar: string;
    }, {
        en: string;
        ar: string;
    }>;
}, "strip", z.ZodTypeAny, {
    type: "EXCLUDE";
    reason: {
        en: string;
        ar: string;
    };
    target: {
        keys: string[];
        ids: string[];
        kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
    };
}, {
    type: "EXCLUDE";
    reason: {
        en: string;
        ar: string;
    };
    target: {
        kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
        keys?: string[] | undefined;
        ids?: string[] | undefined;
    };
}>, z.ZodObject<{
    type: z.ZodLiteral<"SELECT_TEMPLATE">;
    templateKey: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "SELECT_TEMPLATE";
    templateKey: string;
}, {
    type: "SELECT_TEMPLATE";
    templateKey: string;
}>, z.ZodObject<{
    type: z.ZodLiteral<"NO_RESULT">;
    message: z.ZodObject<{
        en: z.ZodString;
        ar: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        en: string;
        ar: string;
    }, {
        en: string;
        ar: string;
    }>;
}, "strip", z.ZodTypeAny, {
    message: {
        en: string;
        ar: string;
    };
    type: "NO_RESULT";
}, {
    message: {
        en: string;
        ar: string;
    };
    type: "NO_RESULT";
}>]>;
export declare const routineRuleSchema: z.ZodObject<{
    id: z.ZodString;
    key: z.ZodString;
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
    enabled: z.ZodDefault<z.ZodBoolean>;
    priority: z.ZodDefault<z.ZodNumber>;
    when: z.ZodObject<{
        mode: z.ZodEnum<["ALL", "ANY"]>;
        conditions: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            questionKey: z.ZodString;
            operator: z.ZodEnum<["EQUALS", "NOT_EQUALS", "CONTAINS", "CONTAINS_ANY", "CONTAINS_ALL", "GREATER_THAN", "LESS_THAN"]>;
            value: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodString, "many">]>;
        }, "strip", z.ZodTypeAny, {
            value: string | number | boolean | string[];
            id: string;
            operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "CONTAINS_ANY" | "CONTAINS_ALL" | "GREATER_THAN" | "LESS_THAN";
            questionKey: string;
        }, {
            value: string | number | boolean | string[];
            id: string;
            operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "CONTAINS_ANY" | "CONTAINS_ALL" | "GREATER_THAN" | "LESS_THAN";
            questionKey: string;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        conditions: {
            value: string | number | boolean | string[];
            id: string;
            operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "CONTAINS_ANY" | "CONTAINS_ALL" | "GREATER_THAN" | "LESS_THAN";
            questionKey: string;
        }[];
        mode: "ALL" | "ANY";
    }, {
        conditions: {
            value: string | number | boolean | string[];
            id: string;
            operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "CONTAINS_ANY" | "CONTAINS_ALL" | "GREATER_THAN" | "LESS_THAN";
            questionKey: string;
        }[];
        mode: "ALL" | "ANY";
    }>;
    effects: z.ZodArray<z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
        type: z.ZodLiteral<"BOOST">;
        target: z.ZodObject<{
            kind: z.ZodEnum<["ALL", "PRODUCT", "VARIANT", "CATEGORY", "BRAND", "TAG", "INGREDIENT", "ROLE"]>;
            ids: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            keys: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            keys: string[];
            ids: string[];
            kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
        }, {
            kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
            keys?: string[] | undefined;
            ids?: string[] | undefined;
        }>;
        score: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        type: "BOOST";
        target: {
            keys: string[];
            ids: string[];
            kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
        };
        score: number;
    }, {
        type: "BOOST";
        target: {
            kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
            keys?: string[] | undefined;
            ids?: string[] | undefined;
        };
        score: number;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"EXCLUDE">;
        target: z.ZodObject<{
            kind: z.ZodEnum<["ALL", "PRODUCT", "VARIANT", "CATEGORY", "BRAND", "TAG", "INGREDIENT", "ROLE"]>;
            ids: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            keys: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            keys: string[];
            ids: string[];
            kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
        }, {
            kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
            keys?: string[] | undefined;
            ids?: string[] | undefined;
        }>;
        reason: z.ZodObject<{
            en: z.ZodString;
            ar: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            en: string;
            ar: string;
        }, {
            en: string;
            ar: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        type: "EXCLUDE";
        reason: {
            en: string;
            ar: string;
        };
        target: {
            keys: string[];
            ids: string[];
            kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
        };
    }, {
        type: "EXCLUDE";
        reason: {
            en: string;
            ar: string;
        };
        target: {
            kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
            keys?: string[] | undefined;
            ids?: string[] | undefined;
        };
    }>, z.ZodObject<{
        type: z.ZodLiteral<"SELECT_TEMPLATE">;
        templateKey: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "SELECT_TEMPLATE";
        templateKey: string;
    }, {
        type: "SELECT_TEMPLATE";
        templateKey: string;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"NO_RESULT">;
        message: z.ZodObject<{
            en: z.ZodString;
            ar: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            en: string;
            ar: string;
        }, {
            en: string;
            ar: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        message: {
            en: string;
            ar: string;
        };
        type: "NO_RESULT";
    }, {
        message: {
            en: string;
            ar: string;
        };
        type: "NO_RESULT";
    }>]>, "many">;
}, "strip", z.ZodTypeAny, {
    id: string;
    key: string;
    name: {
        en: string;
        ar: string;
    };
    enabled: boolean;
    priority: number;
    when: {
        conditions: {
            value: string | number | boolean | string[];
            id: string;
            operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "CONTAINS_ANY" | "CONTAINS_ALL" | "GREATER_THAN" | "LESS_THAN";
            questionKey: string;
        }[];
        mode: "ALL" | "ANY";
    };
    effects: ({
        type: "BOOST";
        target: {
            keys: string[];
            ids: string[];
            kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
        };
        score: number;
    } | {
        type: "EXCLUDE";
        reason: {
            en: string;
            ar: string;
        };
        target: {
            keys: string[];
            ids: string[];
            kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
        };
    } | {
        type: "SELECT_TEMPLATE";
        templateKey: string;
    } | {
        message: {
            en: string;
            ar: string;
        };
        type: "NO_RESULT";
    })[];
}, {
    id: string;
    key: string;
    name: {
        en: string;
        ar: string;
    };
    when: {
        conditions: {
            value: string | number | boolean | string[];
            id: string;
            operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "CONTAINS_ANY" | "CONTAINS_ALL" | "GREATER_THAN" | "LESS_THAN";
            questionKey: string;
        }[];
        mode: "ALL" | "ANY";
    };
    effects: ({
        type: "BOOST";
        target: {
            kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
            keys?: string[] | undefined;
            ids?: string[] | undefined;
        };
        score: number;
    } | {
        type: "EXCLUDE";
        reason: {
            en: string;
            ar: string;
        };
        target: {
            kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
            keys?: string[] | undefined;
            ids?: string[] | undefined;
        };
    } | {
        type: "SELECT_TEMPLATE";
        templateKey: string;
    } | {
        message: {
            en: string;
            ar: string;
        };
        type: "NO_RESULT";
    })[];
    enabled?: boolean | undefined;
    priority?: number | undefined;
}>;
export declare const routineCompatibilityRuleSchema: z.ZodObject<{
    id: z.ZodString;
    key: z.ZodString;
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
    enabled: z.ZodDefault<z.ZodBoolean>;
    priority: z.ZodDefault<z.ZodNumber>;
    effect: z.ZodEnum<["BLOCK_SAME_ROUTINE", "WARN", "AM_ONLY", "PM_ONLY", "ALTERNATE", "MAX_ONE_FROM_GROUP"]>;
    left: z.ZodObject<{
        kind: z.ZodEnum<["ALL", "PRODUCT", "VARIANT", "CATEGORY", "BRAND", "TAG", "INGREDIENT", "ROLE"]>;
        ids: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        keys: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        keys: string[];
        ids: string[];
        kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
    }, {
        kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
        keys?: string[] | undefined;
        ids?: string[] | undefined;
    }>;
    right: z.ZodDefault<z.ZodNullable<z.ZodObject<{
        kind: z.ZodEnum<["ALL", "PRODUCT", "VARIANT", "CATEGORY", "BRAND", "TAG", "INGREDIENT", "ROLE"]>;
        ids: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        keys: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        keys: string[];
        ids: string[];
        kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
    }, {
        kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
        keys?: string[] | undefined;
        ids?: string[] | undefined;
    }>>>;
    message: z.ZodObject<{
        en: z.ZodString;
        ar: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        en: string;
        ar: string;
    }, {
        en: string;
        ar: string;
    }>;
}, "strip", z.ZodTypeAny, {
    message: {
        en: string;
        ar: string;
    };
    id: string;
    key: string;
    name: {
        en: string;
        ar: string;
    };
    enabled: boolean;
    priority: number;
    effect: "BLOCK_SAME_ROUTINE" | "WARN" | "AM_ONLY" | "PM_ONLY" | "ALTERNATE" | "MAX_ONE_FROM_GROUP";
    left: {
        keys: string[];
        ids: string[];
        kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
    };
    right: {
        keys: string[];
        ids: string[];
        kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
    } | null;
}, {
    message: {
        en: string;
        ar: string;
    };
    id: string;
    key: string;
    name: {
        en: string;
        ar: string;
    };
    effect: "BLOCK_SAME_ROUTINE" | "WARN" | "AM_ONLY" | "PM_ONLY" | "ALTERNATE" | "MAX_ONE_FROM_GROUP";
    left: {
        kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
        keys?: string[] | undefined;
        ids?: string[] | undefined;
    };
    enabled?: boolean | undefined;
    priority?: number | undefined;
    right?: {
        kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
        keys?: string[] | undefined;
        ids?: string[] | undefined;
    } | null | undefined;
}>;
export declare const routineTemplateStepSchema: z.ZodObject<{
    id: z.ZodString;
    roleKey: z.ZodString;
    period: z.ZodEnum<["AM", "PM"]>;
    required: z.ZodDefault<z.ZodBoolean>;
    order: z.ZodNumber;
    target: z.ZodDefault<z.ZodObject<{
        kind: z.ZodEnum<["ALL", "PRODUCT", "VARIANT", "CATEGORY", "BRAND", "TAG", "INGREDIENT", "ROLE"]>;
        ids: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        keys: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        keys: string[];
        ids: string[];
        kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
    }, {
        kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
        keys?: string[] | undefined;
        ids?: string[] | undefined;
    }>>;
    preferredProductIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    maxAlternatives: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    id: string;
    order: number;
    required: boolean;
    target: {
        keys: string[];
        ids: string[];
        kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
    };
    roleKey: string;
    period: "AM" | "PM";
    preferredProductIds: string[];
    maxAlternatives: number;
}, {
    id: string;
    order: number;
    roleKey: string;
    period: "AM" | "PM";
    required?: boolean | undefined;
    target?: {
        kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
        keys?: string[] | undefined;
        ids?: string[] | undefined;
    } | undefined;
    preferredProductIds?: string[] | undefined;
    maxAlternatives?: number | undefined;
}>;
export declare const routineTemplateSchema: z.ZodObject<{
    id: z.ZodString;
    key: z.ZodString;
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
    description: z.ZodDefault<z.ZodObject<{
        en: z.ZodString;
        ar: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        en: string;
        ar: string;
    }, {
        en: string;
        ar: string;
    }>>;
    enabled: z.ZodDefault<z.ZodBoolean>;
    priority: z.ZodDefault<z.ZodNumber>;
    conditions: z.ZodDefault<z.ZodNullable<z.ZodObject<{
        mode: z.ZodEnum<["ALL", "ANY"]>;
        conditions: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            questionKey: z.ZodString;
            operator: z.ZodEnum<["EQUALS", "NOT_EQUALS", "CONTAINS", "CONTAINS_ANY", "CONTAINS_ALL", "GREATER_THAN", "LESS_THAN"]>;
            value: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodString, "many">]>;
        }, "strip", z.ZodTypeAny, {
            value: string | number | boolean | string[];
            id: string;
            operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "CONTAINS_ANY" | "CONTAINS_ALL" | "GREATER_THAN" | "LESS_THAN";
            questionKey: string;
        }, {
            value: string | number | boolean | string[];
            id: string;
            operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "CONTAINS_ANY" | "CONTAINS_ALL" | "GREATER_THAN" | "LESS_THAN";
            questionKey: string;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        conditions: {
            value: string | number | boolean | string[];
            id: string;
            operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "CONTAINS_ANY" | "CONTAINS_ALL" | "GREATER_THAN" | "LESS_THAN";
            questionKey: string;
        }[];
        mode: "ALL" | "ANY";
    }, {
        conditions: {
            value: string | number | boolean | string[];
            id: string;
            operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "CONTAINS_ANY" | "CONTAINS_ALL" | "GREATER_THAN" | "LESS_THAN";
            questionKey: string;
        }[];
        mode: "ALL" | "ANY";
    }>>>;
    steps: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        roleKey: z.ZodString;
        period: z.ZodEnum<["AM", "PM"]>;
        required: z.ZodDefault<z.ZodBoolean>;
        order: z.ZodNumber;
        target: z.ZodDefault<z.ZodObject<{
            kind: z.ZodEnum<["ALL", "PRODUCT", "VARIANT", "CATEGORY", "BRAND", "TAG", "INGREDIENT", "ROLE"]>;
            ids: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            keys: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            keys: string[];
            ids: string[];
            kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
        }, {
            kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
            keys?: string[] | undefined;
            ids?: string[] | undefined;
        }>>;
        preferredProductIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        maxAlternatives: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        order: number;
        required: boolean;
        target: {
            keys: string[];
            ids: string[];
            kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
        };
        roleKey: string;
        period: "AM" | "PM";
        preferredProductIds: string[];
        maxAlternatives: number;
    }, {
        id: string;
        order: number;
        roleKey: string;
        period: "AM" | "PM";
        required?: boolean | undefined;
        target?: {
            kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
            keys?: string[] | undefined;
            ids?: string[] | undefined;
        } | undefined;
        preferredProductIds?: string[] | undefined;
        maxAlternatives?: number | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    id: string;
    key: string;
    description: {
        en: string;
        ar: string;
    };
    name: {
        en: string;
        ar: string;
    };
    enabled: boolean;
    priority: number;
    conditions: {
        conditions: {
            value: string | number | boolean | string[];
            id: string;
            operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "CONTAINS_ANY" | "CONTAINS_ALL" | "GREATER_THAN" | "LESS_THAN";
            questionKey: string;
        }[];
        mode: "ALL" | "ANY";
    } | null;
    steps: {
        id: string;
        order: number;
        required: boolean;
        target: {
            keys: string[];
            ids: string[];
            kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
        };
        roleKey: string;
        period: "AM" | "PM";
        preferredProductIds: string[];
        maxAlternatives: number;
    }[];
}, {
    id: string;
    key: string;
    name: {
        en: string;
        ar: string;
    };
    steps: {
        id: string;
        order: number;
        roleKey: string;
        period: "AM" | "PM";
        required?: boolean | undefined;
        target?: {
            kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
            keys?: string[] | undefined;
            ids?: string[] | undefined;
        } | undefined;
        preferredProductIds?: string[] | undefined;
        maxAlternatives?: number | undefined;
    }[];
    description?: {
        en: string;
        ar: string;
    } | undefined;
    enabled?: boolean | undefined;
    priority?: number | undefined;
    conditions?: {
        conditions: {
            value: string | number | boolean | string[];
            id: string;
            operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "CONTAINS_ANY" | "CONTAINS_ALL" | "GREATER_THAN" | "LESS_THAN";
            questionKey: string;
        }[];
        mode: "ALL" | "ANY";
    } | null | undefined;
}>;
export declare const routineBuilderConfigSchema: z.ZodEffects<z.ZodObject<{
    schemaVersion: z.ZodLiteral<1>;
    title: z.ZodObject<{
        en: z.ZodString;
        ar: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        en: string;
        ar: string;
    }, {
        en: string;
        ar: string;
    }>;
    introduction: z.ZodObject<{
        en: z.ZodString;
        ar: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        en: string;
        ar: string;
    }, {
        en: string;
        ar: string;
    }>;
    estimatedMinutes: z.ZodDefault<z.ZodNumber>;
    startLabel: z.ZodObject<{
        en: z.ZodString;
        ar: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        en: string;
        ar: string;
    }, {
        en: string;
        ar: string;
    }>;
    resultTitle: z.ZodObject<{
        en: z.ZodString;
        ar: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        en: string;
        ar: string;
    }, {
        en: string;
        ar: string;
    }>;
    disclaimer: z.ZodObject<{
        en: z.ZodString;
        ar: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        en: string;
        ar: string;
    }, {
        en: string;
        ar: string;
    }>;
    noResult: z.ZodObject<{
        en: z.ZodString;
        ar: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        en: string;
        ar: string;
    }, {
        en: string;
        ar: string;
    }>;
    questions: z.ZodArray<z.ZodEffects<z.ZodObject<{
        id: z.ZodString;
        key: z.ZodString;
        type: z.ZodEnum<["SINGLE_CHOICE", "MULTIPLE_CHOICE", "RANKED_CHOICE", "YES_NO", "SCALE", "OPTIONAL_TEXT", "NUMERIC_RANGE", "PRODUCT_SELECTION", "INGREDIENT_PREFERENCE"]>;
        label: z.ZodObject<{
            en: z.ZodString;
            ar: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            en: string;
            ar: string;
        }, {
            en: string;
            ar: string;
        }>;
        description: z.ZodDefault<z.ZodObject<{
            en: z.ZodString;
            ar: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            en: string;
            ar: string;
        }, {
            en: string;
            ar: string;
        }>>;
        helpText: z.ZodDefault<z.ZodObject<{
            en: z.ZodString;
            ar: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            en: string;
            ar: string;
        }, {
            en: string;
            ar: string;
        }>>;
        required: z.ZodDefault<z.ZodBoolean>;
        enabled: z.ZodDefault<z.ZodBoolean>;
        order: z.ZodNumber;
        visibility: z.ZodDefault<z.ZodNullable<z.ZodObject<{
            mode: z.ZodEnum<["ALL", "ANY"]>;
            conditions: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                questionKey: z.ZodString;
                operator: z.ZodEnum<["EQUALS", "NOT_EQUALS", "CONTAINS", "CONTAINS_ANY", "CONTAINS_ALL", "GREATER_THAN", "LESS_THAN"]>;
                value: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodString, "many">]>;
            }, "strip", z.ZodTypeAny, {
                value: string | number | boolean | string[];
                id: string;
                operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "CONTAINS_ANY" | "CONTAINS_ALL" | "GREATER_THAN" | "LESS_THAN";
                questionKey: string;
            }, {
                value: string | number | boolean | string[];
                id: string;
                operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "CONTAINS_ANY" | "CONTAINS_ALL" | "GREATER_THAN" | "LESS_THAN";
                questionKey: string;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            conditions: {
                value: string | number | boolean | string[];
                id: string;
                operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "CONTAINS_ANY" | "CONTAINS_ALL" | "GREATER_THAN" | "LESS_THAN";
                questionKey: string;
            }[];
            mode: "ALL" | "ANY";
        }, {
            conditions: {
                value: string | number | boolean | string[];
                id: string;
                operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "CONTAINS_ANY" | "CONTAINS_ALL" | "GREATER_THAN" | "LESS_THAN";
                questionKey: string;
            }[];
            mode: "ALL" | "ANY";
        }>>>;
        answers: z.ZodDefault<z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            key: z.ZodString;
            label: z.ZodObject<{
                en: z.ZodString;
                ar: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                en: string;
                ar: string;
            }, {
                en: string;
                ar: string;
            }>;
            description: z.ZodDefault<z.ZodObject<{
                en: z.ZodString;
                ar: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                en: string;
                ar: string;
            }, {
                en: string;
                ar: string;
            }>>;
            signals: z.ZodDefault<z.ZodArray<z.ZodObject<{
                key: z.ZodString;
                value: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodString, "many">]>;
            }, "strip", z.ZodTypeAny, {
                value: string | number | boolean | string[];
                key: string;
            }, {
                value: string | number | boolean | string[];
                key: string;
            }>, "many">>;
            order: z.ZodNumber;
            enabled: z.ZodDefault<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
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
            order: number;
            enabled: boolean;
            signals: {
                value: string | number | boolean | string[];
                key: string;
            }[];
        }, {
            id: string;
            key: string;
            label: {
                en: string;
                ar: string;
            };
            order: number;
            description?: {
                en: string;
                ar: string;
            } | undefined;
            enabled?: boolean | undefined;
            signals?: {
                value: string | number | boolean | string[];
                key: string;
            }[] | undefined;
        }>, "many">>;
        minSelections: z.ZodDefault<z.ZodNumber>;
        maxSelections: z.ZodDefault<z.ZodNumber>;
        scale: z.ZodDefault<z.ZodNullable<z.ZodObject<{
            min: z.ZodNumber;
            max: z.ZodNumber;
            step: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            min: number;
            max: number;
            step: number;
        }, {
            min: number;
            max: number;
            step: number;
        }>>>;
    }, "strip", z.ZodTypeAny, {
        type: "SINGLE_CHOICE" | "MULTIPLE_CHOICE" | "RANKED_CHOICE" | "YES_NO" | "SCALE" | "OPTIONAL_TEXT" | "NUMERIC_RANGE" | "PRODUCT_SELECTION" | "INGREDIENT_PREFERENCE";
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
        order: number;
        enabled: boolean;
        visibility: {
            conditions: {
                value: string | number | boolean | string[];
                id: string;
                operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "CONTAINS_ANY" | "CONTAINS_ALL" | "GREATER_THAN" | "LESS_THAN";
                questionKey: string;
            }[];
            mode: "ALL" | "ANY";
        } | null;
        helpText: {
            en: string;
            ar: string;
        };
        required: boolean;
        answers: {
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
            order: number;
            enabled: boolean;
            signals: {
                value: string | number | boolean | string[];
                key: string;
            }[];
        }[];
        minSelections: number;
        maxSelections: number;
        scale: {
            min: number;
            max: number;
            step: number;
        } | null;
    }, {
        type: "SINGLE_CHOICE" | "MULTIPLE_CHOICE" | "RANKED_CHOICE" | "YES_NO" | "SCALE" | "OPTIONAL_TEXT" | "NUMERIC_RANGE" | "PRODUCT_SELECTION" | "INGREDIENT_PREFERENCE";
        id: string;
        key: string;
        label: {
            en: string;
            ar: string;
        };
        order: number;
        description?: {
            en: string;
            ar: string;
        } | undefined;
        enabled?: boolean | undefined;
        visibility?: {
            conditions: {
                value: string | number | boolean | string[];
                id: string;
                operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "CONTAINS_ANY" | "CONTAINS_ALL" | "GREATER_THAN" | "LESS_THAN";
                questionKey: string;
            }[];
            mode: "ALL" | "ANY";
        } | null | undefined;
        helpText?: {
            en: string;
            ar: string;
        } | undefined;
        required?: boolean | undefined;
        answers?: {
            id: string;
            key: string;
            label: {
                en: string;
                ar: string;
            };
            order: number;
            description?: {
                en: string;
                ar: string;
            } | undefined;
            enabled?: boolean | undefined;
            signals?: {
                value: string | number | boolean | string[];
                key: string;
            }[] | undefined;
        }[] | undefined;
        minSelections?: number | undefined;
        maxSelections?: number | undefined;
        scale?: {
            min: number;
            max: number;
            step: number;
        } | null | undefined;
    }>, {
        type: "SINGLE_CHOICE" | "MULTIPLE_CHOICE" | "RANKED_CHOICE" | "YES_NO" | "SCALE" | "OPTIONAL_TEXT" | "NUMERIC_RANGE" | "PRODUCT_SELECTION" | "INGREDIENT_PREFERENCE";
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
        order: number;
        enabled: boolean;
        visibility: {
            conditions: {
                value: string | number | boolean | string[];
                id: string;
                operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "CONTAINS_ANY" | "CONTAINS_ALL" | "GREATER_THAN" | "LESS_THAN";
                questionKey: string;
            }[];
            mode: "ALL" | "ANY";
        } | null;
        helpText: {
            en: string;
            ar: string;
        };
        required: boolean;
        answers: {
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
            order: number;
            enabled: boolean;
            signals: {
                value: string | number | boolean | string[];
                key: string;
            }[];
        }[];
        minSelections: number;
        maxSelections: number;
        scale: {
            min: number;
            max: number;
            step: number;
        } | null;
    }, {
        type: "SINGLE_CHOICE" | "MULTIPLE_CHOICE" | "RANKED_CHOICE" | "YES_NO" | "SCALE" | "OPTIONAL_TEXT" | "NUMERIC_RANGE" | "PRODUCT_SELECTION" | "INGREDIENT_PREFERENCE";
        id: string;
        key: string;
        label: {
            en: string;
            ar: string;
        };
        order: number;
        description?: {
            en: string;
            ar: string;
        } | undefined;
        enabled?: boolean | undefined;
        visibility?: {
            conditions: {
                value: string | number | boolean | string[];
                id: string;
                operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "CONTAINS_ANY" | "CONTAINS_ALL" | "GREATER_THAN" | "LESS_THAN";
                questionKey: string;
            }[];
            mode: "ALL" | "ANY";
        } | null | undefined;
        helpText?: {
            en: string;
            ar: string;
        } | undefined;
        required?: boolean | undefined;
        answers?: {
            id: string;
            key: string;
            label: {
                en: string;
                ar: string;
            };
            order: number;
            description?: {
                en: string;
                ar: string;
            } | undefined;
            enabled?: boolean | undefined;
            signals?: {
                value: string | number | boolean | string[];
                key: string;
            }[] | undefined;
        }[] | undefined;
        minSelections?: number | undefined;
        maxSelections?: number | undefined;
        scale?: {
            min: number;
            max: number;
            step: number;
        } | null | undefined;
    }>, "many">;
    concerns: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        key: z.ZodString;
        label: z.ZodObject<{
            en: z.ZodString;
            ar: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            en: string;
            ar: string;
        }, {
            en: string;
            ar: string;
        }>;
        description: z.ZodDefault<z.ZodObject<{
            en: z.ZodString;
            ar: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            en: string;
            ar: string;
        }, {
            en: string;
            ar: string;
        }>>;
        enabled: z.ZodDefault<z.ZodBoolean>;
        order: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
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
        order: number;
        enabled: boolean;
    }, {
        id: string;
        key: string;
        label: {
            en: string;
            ar: string;
        };
        order: number;
        description?: {
            en: string;
            ar: string;
        } | undefined;
        enabled?: boolean | undefined;
    }>, "many">;
    roles: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        key: z.ZodString;
        label: z.ZodObject<{
            en: z.ZodString;
            ar: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            en: string;
            ar: string;
        }, {
            en: string;
            ar: string;
        }>;
        description: z.ZodDefault<z.ZodObject<{
            en: z.ZodString;
            ar: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            en: string;
            ar: string;
        }, {
            en: string;
            ar: string;
        }>>;
        amOrder: z.ZodNumber;
        pmOrder: z.ZodNumber;
        enabled: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
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
        enabled: boolean;
        amOrder: number;
        pmOrder: number;
    }, {
        id: string;
        key: string;
        label: {
            en: string;
            ar: string;
        };
        amOrder: number;
        pmOrder: number;
        description?: {
            en: string;
            ar: string;
        } | undefined;
        enabled?: boolean | undefined;
    }>, "many">;
    rules: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        key: z.ZodString;
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
        enabled: z.ZodDefault<z.ZodBoolean>;
        priority: z.ZodDefault<z.ZodNumber>;
        when: z.ZodObject<{
            mode: z.ZodEnum<["ALL", "ANY"]>;
            conditions: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                questionKey: z.ZodString;
                operator: z.ZodEnum<["EQUALS", "NOT_EQUALS", "CONTAINS", "CONTAINS_ANY", "CONTAINS_ALL", "GREATER_THAN", "LESS_THAN"]>;
                value: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodString, "many">]>;
            }, "strip", z.ZodTypeAny, {
                value: string | number | boolean | string[];
                id: string;
                operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "CONTAINS_ANY" | "CONTAINS_ALL" | "GREATER_THAN" | "LESS_THAN";
                questionKey: string;
            }, {
                value: string | number | boolean | string[];
                id: string;
                operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "CONTAINS_ANY" | "CONTAINS_ALL" | "GREATER_THAN" | "LESS_THAN";
                questionKey: string;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            conditions: {
                value: string | number | boolean | string[];
                id: string;
                operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "CONTAINS_ANY" | "CONTAINS_ALL" | "GREATER_THAN" | "LESS_THAN";
                questionKey: string;
            }[];
            mode: "ALL" | "ANY";
        }, {
            conditions: {
                value: string | number | boolean | string[];
                id: string;
                operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "CONTAINS_ANY" | "CONTAINS_ALL" | "GREATER_THAN" | "LESS_THAN";
                questionKey: string;
            }[];
            mode: "ALL" | "ANY";
        }>;
        effects: z.ZodArray<z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
            type: z.ZodLiteral<"BOOST">;
            target: z.ZodObject<{
                kind: z.ZodEnum<["ALL", "PRODUCT", "VARIANT", "CATEGORY", "BRAND", "TAG", "INGREDIENT", "ROLE"]>;
                ids: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                keys: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            }, "strip", z.ZodTypeAny, {
                keys: string[];
                ids: string[];
                kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
            }, {
                kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                keys?: string[] | undefined;
                ids?: string[] | undefined;
            }>;
            score: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            type: "BOOST";
            target: {
                keys: string[];
                ids: string[];
                kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
            };
            score: number;
        }, {
            type: "BOOST";
            target: {
                kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                keys?: string[] | undefined;
                ids?: string[] | undefined;
            };
            score: number;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"EXCLUDE">;
            target: z.ZodObject<{
                kind: z.ZodEnum<["ALL", "PRODUCT", "VARIANT", "CATEGORY", "BRAND", "TAG", "INGREDIENT", "ROLE"]>;
                ids: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                keys: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            }, "strip", z.ZodTypeAny, {
                keys: string[];
                ids: string[];
                kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
            }, {
                kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                keys?: string[] | undefined;
                ids?: string[] | undefined;
            }>;
            reason: z.ZodObject<{
                en: z.ZodString;
                ar: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                en: string;
                ar: string;
            }, {
                en: string;
                ar: string;
            }>;
        }, "strip", z.ZodTypeAny, {
            type: "EXCLUDE";
            reason: {
                en: string;
                ar: string;
            };
            target: {
                keys: string[];
                ids: string[];
                kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
            };
        }, {
            type: "EXCLUDE";
            reason: {
                en: string;
                ar: string;
            };
            target: {
                kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                keys?: string[] | undefined;
                ids?: string[] | undefined;
            };
        }>, z.ZodObject<{
            type: z.ZodLiteral<"SELECT_TEMPLATE">;
            templateKey: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: "SELECT_TEMPLATE";
            templateKey: string;
        }, {
            type: "SELECT_TEMPLATE";
            templateKey: string;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"NO_RESULT">;
            message: z.ZodObject<{
                en: z.ZodString;
                ar: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                en: string;
                ar: string;
            }, {
                en: string;
                ar: string;
            }>;
        }, "strip", z.ZodTypeAny, {
            message: {
                en: string;
                ar: string;
            };
            type: "NO_RESULT";
        }, {
            message: {
                en: string;
                ar: string;
            };
            type: "NO_RESULT";
        }>]>, "many">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        key: string;
        name: {
            en: string;
            ar: string;
        };
        enabled: boolean;
        priority: number;
        when: {
            conditions: {
                value: string | number | boolean | string[];
                id: string;
                operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "CONTAINS_ANY" | "CONTAINS_ALL" | "GREATER_THAN" | "LESS_THAN";
                questionKey: string;
            }[];
            mode: "ALL" | "ANY";
        };
        effects: ({
            type: "BOOST";
            target: {
                keys: string[];
                ids: string[];
                kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
            };
            score: number;
        } | {
            type: "EXCLUDE";
            reason: {
                en: string;
                ar: string;
            };
            target: {
                keys: string[];
                ids: string[];
                kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
            };
        } | {
            type: "SELECT_TEMPLATE";
            templateKey: string;
        } | {
            message: {
                en: string;
                ar: string;
            };
            type: "NO_RESULT";
        })[];
    }, {
        id: string;
        key: string;
        name: {
            en: string;
            ar: string;
        };
        when: {
            conditions: {
                value: string | number | boolean | string[];
                id: string;
                operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "CONTAINS_ANY" | "CONTAINS_ALL" | "GREATER_THAN" | "LESS_THAN";
                questionKey: string;
            }[];
            mode: "ALL" | "ANY";
        };
        effects: ({
            type: "BOOST";
            target: {
                kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                keys?: string[] | undefined;
                ids?: string[] | undefined;
            };
            score: number;
        } | {
            type: "EXCLUDE";
            reason: {
                en: string;
                ar: string;
            };
            target: {
                kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                keys?: string[] | undefined;
                ids?: string[] | undefined;
            };
        } | {
            type: "SELECT_TEMPLATE";
            templateKey: string;
        } | {
            message: {
                en: string;
                ar: string;
            };
            type: "NO_RESULT";
        })[];
        enabled?: boolean | undefined;
        priority?: number | undefined;
    }>, "many">;
    compatibilityRules: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        key: z.ZodString;
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
        enabled: z.ZodDefault<z.ZodBoolean>;
        priority: z.ZodDefault<z.ZodNumber>;
        effect: z.ZodEnum<["BLOCK_SAME_ROUTINE", "WARN", "AM_ONLY", "PM_ONLY", "ALTERNATE", "MAX_ONE_FROM_GROUP"]>;
        left: z.ZodObject<{
            kind: z.ZodEnum<["ALL", "PRODUCT", "VARIANT", "CATEGORY", "BRAND", "TAG", "INGREDIENT", "ROLE"]>;
            ids: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            keys: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            keys: string[];
            ids: string[];
            kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
        }, {
            kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
            keys?: string[] | undefined;
            ids?: string[] | undefined;
        }>;
        right: z.ZodDefault<z.ZodNullable<z.ZodObject<{
            kind: z.ZodEnum<["ALL", "PRODUCT", "VARIANT", "CATEGORY", "BRAND", "TAG", "INGREDIENT", "ROLE"]>;
            ids: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            keys: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            keys: string[];
            ids: string[];
            kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
        }, {
            kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
            keys?: string[] | undefined;
            ids?: string[] | undefined;
        }>>>;
        message: z.ZodObject<{
            en: z.ZodString;
            ar: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            en: string;
            ar: string;
        }, {
            en: string;
            ar: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        message: {
            en: string;
            ar: string;
        };
        id: string;
        key: string;
        name: {
            en: string;
            ar: string;
        };
        enabled: boolean;
        priority: number;
        effect: "BLOCK_SAME_ROUTINE" | "WARN" | "AM_ONLY" | "PM_ONLY" | "ALTERNATE" | "MAX_ONE_FROM_GROUP";
        left: {
            keys: string[];
            ids: string[];
            kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
        };
        right: {
            keys: string[];
            ids: string[];
            kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
        } | null;
    }, {
        message: {
            en: string;
            ar: string;
        };
        id: string;
        key: string;
        name: {
            en: string;
            ar: string;
        };
        effect: "BLOCK_SAME_ROUTINE" | "WARN" | "AM_ONLY" | "PM_ONLY" | "ALTERNATE" | "MAX_ONE_FROM_GROUP";
        left: {
            kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
            keys?: string[] | undefined;
            ids?: string[] | undefined;
        };
        enabled?: boolean | undefined;
        priority?: number | undefined;
        right?: {
            kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
            keys?: string[] | undefined;
            ids?: string[] | undefined;
        } | null | undefined;
    }>, "many">;
    templates: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        key: z.ZodString;
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
        description: z.ZodDefault<z.ZodObject<{
            en: z.ZodString;
            ar: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            en: string;
            ar: string;
        }, {
            en: string;
            ar: string;
        }>>;
        enabled: z.ZodDefault<z.ZodBoolean>;
        priority: z.ZodDefault<z.ZodNumber>;
        conditions: z.ZodDefault<z.ZodNullable<z.ZodObject<{
            mode: z.ZodEnum<["ALL", "ANY"]>;
            conditions: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                questionKey: z.ZodString;
                operator: z.ZodEnum<["EQUALS", "NOT_EQUALS", "CONTAINS", "CONTAINS_ANY", "CONTAINS_ALL", "GREATER_THAN", "LESS_THAN"]>;
                value: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodString, "many">]>;
            }, "strip", z.ZodTypeAny, {
                value: string | number | boolean | string[];
                id: string;
                operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "CONTAINS_ANY" | "CONTAINS_ALL" | "GREATER_THAN" | "LESS_THAN";
                questionKey: string;
            }, {
                value: string | number | boolean | string[];
                id: string;
                operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "CONTAINS_ANY" | "CONTAINS_ALL" | "GREATER_THAN" | "LESS_THAN";
                questionKey: string;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            conditions: {
                value: string | number | boolean | string[];
                id: string;
                operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "CONTAINS_ANY" | "CONTAINS_ALL" | "GREATER_THAN" | "LESS_THAN";
                questionKey: string;
            }[];
            mode: "ALL" | "ANY";
        }, {
            conditions: {
                value: string | number | boolean | string[];
                id: string;
                operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "CONTAINS_ANY" | "CONTAINS_ALL" | "GREATER_THAN" | "LESS_THAN";
                questionKey: string;
            }[];
            mode: "ALL" | "ANY";
        }>>>;
        steps: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            roleKey: z.ZodString;
            period: z.ZodEnum<["AM", "PM"]>;
            required: z.ZodDefault<z.ZodBoolean>;
            order: z.ZodNumber;
            target: z.ZodDefault<z.ZodObject<{
                kind: z.ZodEnum<["ALL", "PRODUCT", "VARIANT", "CATEGORY", "BRAND", "TAG", "INGREDIENT", "ROLE"]>;
                ids: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                keys: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            }, "strip", z.ZodTypeAny, {
                keys: string[];
                ids: string[];
                kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
            }, {
                kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                keys?: string[] | undefined;
                ids?: string[] | undefined;
            }>>;
            preferredProductIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            maxAlternatives: z.ZodDefault<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            id: string;
            order: number;
            required: boolean;
            target: {
                keys: string[];
                ids: string[];
                kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
            };
            roleKey: string;
            period: "AM" | "PM";
            preferredProductIds: string[];
            maxAlternatives: number;
        }, {
            id: string;
            order: number;
            roleKey: string;
            period: "AM" | "PM";
            required?: boolean | undefined;
            target?: {
                kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                keys?: string[] | undefined;
                ids?: string[] | undefined;
            } | undefined;
            preferredProductIds?: string[] | undefined;
            maxAlternatives?: number | undefined;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        key: string;
        description: {
            en: string;
            ar: string;
        };
        name: {
            en: string;
            ar: string;
        };
        enabled: boolean;
        priority: number;
        conditions: {
            conditions: {
                value: string | number | boolean | string[];
                id: string;
                operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "CONTAINS_ANY" | "CONTAINS_ALL" | "GREATER_THAN" | "LESS_THAN";
                questionKey: string;
            }[];
            mode: "ALL" | "ANY";
        } | null;
        steps: {
            id: string;
            order: number;
            required: boolean;
            target: {
                keys: string[];
                ids: string[];
                kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
            };
            roleKey: string;
            period: "AM" | "PM";
            preferredProductIds: string[];
            maxAlternatives: number;
        }[];
    }, {
        id: string;
        key: string;
        name: {
            en: string;
            ar: string;
        };
        steps: {
            id: string;
            order: number;
            roleKey: string;
            period: "AM" | "PM";
            required?: boolean | undefined;
            target?: {
                kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                keys?: string[] | undefined;
                ids?: string[] | undefined;
            } | undefined;
            preferredProductIds?: string[] | undefined;
            maxAlternatives?: number | undefined;
        }[];
        description?: {
            en: string;
            ar: string;
        } | undefined;
        enabled?: boolean | undefined;
        priority?: number | undefined;
        conditions?: {
            conditions: {
                value: string | number | boolean | string[];
                id: string;
                operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "CONTAINS_ANY" | "CONTAINS_ALL" | "GREATER_THAN" | "LESS_THAN";
                questionKey: string;
            }[];
            mode: "ALL" | "ANY";
        } | null | undefined;
    }>, "many">;
    settings: z.ZodObject<{
        maximumProductsPerBrand: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
        preferBrandDiversity: z.ZodDefault<z.ZodBoolean>;
        allowDuplicateProducts: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        maximumProductsPerBrand: number | null;
        preferBrandDiversity: boolean;
        allowDuplicateProducts: boolean;
    }, {
        maximumProductsPerBrand?: number | null | undefined;
        preferBrandDiversity?: boolean | undefined;
        allowDuplicateProducts?: boolean | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    concerns: {
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
        order: number;
        enabled: boolean;
    }[];
    title: {
        en: string;
        ar: string;
    };
    schemaVersion: 1;
    introduction: {
        en: string;
        ar: string;
    };
    estimatedMinutes: number;
    startLabel: {
        en: string;
        ar: string;
    };
    resultTitle: {
        en: string;
        ar: string;
    };
    disclaimer: {
        en: string;
        ar: string;
    };
    noResult: {
        en: string;
        ar: string;
    };
    questions: {
        type: "SINGLE_CHOICE" | "MULTIPLE_CHOICE" | "RANKED_CHOICE" | "YES_NO" | "SCALE" | "OPTIONAL_TEXT" | "NUMERIC_RANGE" | "PRODUCT_SELECTION" | "INGREDIENT_PREFERENCE";
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
        order: number;
        enabled: boolean;
        visibility: {
            conditions: {
                value: string | number | boolean | string[];
                id: string;
                operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "CONTAINS_ANY" | "CONTAINS_ALL" | "GREATER_THAN" | "LESS_THAN";
                questionKey: string;
            }[];
            mode: "ALL" | "ANY";
        } | null;
        helpText: {
            en: string;
            ar: string;
        };
        required: boolean;
        answers: {
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
            order: number;
            enabled: boolean;
            signals: {
                value: string | number | boolean | string[];
                key: string;
            }[];
        }[];
        minSelections: number;
        maxSelections: number;
        scale: {
            min: number;
            max: number;
            step: number;
        } | null;
    }[];
    roles: {
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
        enabled: boolean;
        amOrder: number;
        pmOrder: number;
    }[];
    rules: {
        id: string;
        key: string;
        name: {
            en: string;
            ar: string;
        };
        enabled: boolean;
        priority: number;
        when: {
            conditions: {
                value: string | number | boolean | string[];
                id: string;
                operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "CONTAINS_ANY" | "CONTAINS_ALL" | "GREATER_THAN" | "LESS_THAN";
                questionKey: string;
            }[];
            mode: "ALL" | "ANY";
        };
        effects: ({
            type: "BOOST";
            target: {
                keys: string[];
                ids: string[];
                kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
            };
            score: number;
        } | {
            type: "EXCLUDE";
            reason: {
                en: string;
                ar: string;
            };
            target: {
                keys: string[];
                ids: string[];
                kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
            };
        } | {
            type: "SELECT_TEMPLATE";
            templateKey: string;
        } | {
            message: {
                en: string;
                ar: string;
            };
            type: "NO_RESULT";
        })[];
    }[];
    compatibilityRules: {
        message: {
            en: string;
            ar: string;
        };
        id: string;
        key: string;
        name: {
            en: string;
            ar: string;
        };
        enabled: boolean;
        priority: number;
        effect: "BLOCK_SAME_ROUTINE" | "WARN" | "AM_ONLY" | "PM_ONLY" | "ALTERNATE" | "MAX_ONE_FROM_GROUP";
        left: {
            keys: string[];
            ids: string[];
            kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
        };
        right: {
            keys: string[];
            ids: string[];
            kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
        } | null;
    }[];
    templates: {
        id: string;
        key: string;
        description: {
            en: string;
            ar: string;
        };
        name: {
            en: string;
            ar: string;
        };
        enabled: boolean;
        priority: number;
        conditions: {
            conditions: {
                value: string | number | boolean | string[];
                id: string;
                operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "CONTAINS_ANY" | "CONTAINS_ALL" | "GREATER_THAN" | "LESS_THAN";
                questionKey: string;
            }[];
            mode: "ALL" | "ANY";
        } | null;
        steps: {
            id: string;
            order: number;
            required: boolean;
            target: {
                keys: string[];
                ids: string[];
                kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
            };
            roleKey: string;
            period: "AM" | "PM";
            preferredProductIds: string[];
            maxAlternatives: number;
        }[];
    }[];
    settings: {
        maximumProductsPerBrand: number | null;
        preferBrandDiversity: boolean;
        allowDuplicateProducts: boolean;
    };
}, {
    concerns: {
        id: string;
        key: string;
        label: {
            en: string;
            ar: string;
        };
        order: number;
        description?: {
            en: string;
            ar: string;
        } | undefined;
        enabled?: boolean | undefined;
    }[];
    title: {
        en: string;
        ar: string;
    };
    schemaVersion: 1;
    introduction: {
        en: string;
        ar: string;
    };
    startLabel: {
        en: string;
        ar: string;
    };
    resultTitle: {
        en: string;
        ar: string;
    };
    disclaimer: {
        en: string;
        ar: string;
    };
    noResult: {
        en: string;
        ar: string;
    };
    questions: {
        type: "SINGLE_CHOICE" | "MULTIPLE_CHOICE" | "RANKED_CHOICE" | "YES_NO" | "SCALE" | "OPTIONAL_TEXT" | "NUMERIC_RANGE" | "PRODUCT_SELECTION" | "INGREDIENT_PREFERENCE";
        id: string;
        key: string;
        label: {
            en: string;
            ar: string;
        };
        order: number;
        description?: {
            en: string;
            ar: string;
        } | undefined;
        enabled?: boolean | undefined;
        visibility?: {
            conditions: {
                value: string | number | boolean | string[];
                id: string;
                operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "CONTAINS_ANY" | "CONTAINS_ALL" | "GREATER_THAN" | "LESS_THAN";
                questionKey: string;
            }[];
            mode: "ALL" | "ANY";
        } | null | undefined;
        helpText?: {
            en: string;
            ar: string;
        } | undefined;
        required?: boolean | undefined;
        answers?: {
            id: string;
            key: string;
            label: {
                en: string;
                ar: string;
            };
            order: number;
            description?: {
                en: string;
                ar: string;
            } | undefined;
            enabled?: boolean | undefined;
            signals?: {
                value: string | number | boolean | string[];
                key: string;
            }[] | undefined;
        }[] | undefined;
        minSelections?: number | undefined;
        maxSelections?: number | undefined;
        scale?: {
            min: number;
            max: number;
            step: number;
        } | null | undefined;
    }[];
    roles: {
        id: string;
        key: string;
        label: {
            en: string;
            ar: string;
        };
        amOrder: number;
        pmOrder: number;
        description?: {
            en: string;
            ar: string;
        } | undefined;
        enabled?: boolean | undefined;
    }[];
    rules: {
        id: string;
        key: string;
        name: {
            en: string;
            ar: string;
        };
        when: {
            conditions: {
                value: string | number | boolean | string[];
                id: string;
                operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "CONTAINS_ANY" | "CONTAINS_ALL" | "GREATER_THAN" | "LESS_THAN";
                questionKey: string;
            }[];
            mode: "ALL" | "ANY";
        };
        effects: ({
            type: "BOOST";
            target: {
                kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                keys?: string[] | undefined;
                ids?: string[] | undefined;
            };
            score: number;
        } | {
            type: "EXCLUDE";
            reason: {
                en: string;
                ar: string;
            };
            target: {
                kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                keys?: string[] | undefined;
                ids?: string[] | undefined;
            };
        } | {
            type: "SELECT_TEMPLATE";
            templateKey: string;
        } | {
            message: {
                en: string;
                ar: string;
            };
            type: "NO_RESULT";
        })[];
        enabled?: boolean | undefined;
        priority?: number | undefined;
    }[];
    compatibilityRules: {
        message: {
            en: string;
            ar: string;
        };
        id: string;
        key: string;
        name: {
            en: string;
            ar: string;
        };
        effect: "BLOCK_SAME_ROUTINE" | "WARN" | "AM_ONLY" | "PM_ONLY" | "ALTERNATE" | "MAX_ONE_FROM_GROUP";
        left: {
            kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
            keys?: string[] | undefined;
            ids?: string[] | undefined;
        };
        enabled?: boolean | undefined;
        priority?: number | undefined;
        right?: {
            kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
            keys?: string[] | undefined;
            ids?: string[] | undefined;
        } | null | undefined;
    }[];
    templates: {
        id: string;
        key: string;
        name: {
            en: string;
            ar: string;
        };
        steps: {
            id: string;
            order: number;
            roleKey: string;
            period: "AM" | "PM";
            required?: boolean | undefined;
            target?: {
                kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                keys?: string[] | undefined;
                ids?: string[] | undefined;
            } | undefined;
            preferredProductIds?: string[] | undefined;
            maxAlternatives?: number | undefined;
        }[];
        description?: {
            en: string;
            ar: string;
        } | undefined;
        enabled?: boolean | undefined;
        priority?: number | undefined;
        conditions?: {
            conditions: {
                value: string | number | boolean | string[];
                id: string;
                operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "CONTAINS_ANY" | "CONTAINS_ALL" | "GREATER_THAN" | "LESS_THAN";
                questionKey: string;
            }[];
            mode: "ALL" | "ANY";
        } | null | undefined;
    }[];
    settings: {
        maximumProductsPerBrand?: number | null | undefined;
        preferBrandDiversity?: boolean | undefined;
        allowDuplicateProducts?: boolean | undefined;
    };
    estimatedMinutes?: number | undefined;
}>, {
    concerns: {
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
        order: number;
        enabled: boolean;
    }[];
    title: {
        en: string;
        ar: string;
    };
    schemaVersion: 1;
    introduction: {
        en: string;
        ar: string;
    };
    estimatedMinutes: number;
    startLabel: {
        en: string;
        ar: string;
    };
    resultTitle: {
        en: string;
        ar: string;
    };
    disclaimer: {
        en: string;
        ar: string;
    };
    noResult: {
        en: string;
        ar: string;
    };
    questions: {
        type: "SINGLE_CHOICE" | "MULTIPLE_CHOICE" | "RANKED_CHOICE" | "YES_NO" | "SCALE" | "OPTIONAL_TEXT" | "NUMERIC_RANGE" | "PRODUCT_SELECTION" | "INGREDIENT_PREFERENCE";
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
        order: number;
        enabled: boolean;
        visibility: {
            conditions: {
                value: string | number | boolean | string[];
                id: string;
                operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "CONTAINS_ANY" | "CONTAINS_ALL" | "GREATER_THAN" | "LESS_THAN";
                questionKey: string;
            }[];
            mode: "ALL" | "ANY";
        } | null;
        helpText: {
            en: string;
            ar: string;
        };
        required: boolean;
        answers: {
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
            order: number;
            enabled: boolean;
            signals: {
                value: string | number | boolean | string[];
                key: string;
            }[];
        }[];
        minSelections: number;
        maxSelections: number;
        scale: {
            min: number;
            max: number;
            step: number;
        } | null;
    }[];
    roles: {
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
        enabled: boolean;
        amOrder: number;
        pmOrder: number;
    }[];
    rules: {
        id: string;
        key: string;
        name: {
            en: string;
            ar: string;
        };
        enabled: boolean;
        priority: number;
        when: {
            conditions: {
                value: string | number | boolean | string[];
                id: string;
                operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "CONTAINS_ANY" | "CONTAINS_ALL" | "GREATER_THAN" | "LESS_THAN";
                questionKey: string;
            }[];
            mode: "ALL" | "ANY";
        };
        effects: ({
            type: "BOOST";
            target: {
                keys: string[];
                ids: string[];
                kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
            };
            score: number;
        } | {
            type: "EXCLUDE";
            reason: {
                en: string;
                ar: string;
            };
            target: {
                keys: string[];
                ids: string[];
                kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
            };
        } | {
            type: "SELECT_TEMPLATE";
            templateKey: string;
        } | {
            message: {
                en: string;
                ar: string;
            };
            type: "NO_RESULT";
        })[];
    }[];
    compatibilityRules: {
        message: {
            en: string;
            ar: string;
        };
        id: string;
        key: string;
        name: {
            en: string;
            ar: string;
        };
        enabled: boolean;
        priority: number;
        effect: "BLOCK_SAME_ROUTINE" | "WARN" | "AM_ONLY" | "PM_ONLY" | "ALTERNATE" | "MAX_ONE_FROM_GROUP";
        left: {
            keys: string[];
            ids: string[];
            kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
        };
        right: {
            keys: string[];
            ids: string[];
            kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
        } | null;
    }[];
    templates: {
        id: string;
        key: string;
        description: {
            en: string;
            ar: string;
        };
        name: {
            en: string;
            ar: string;
        };
        enabled: boolean;
        priority: number;
        conditions: {
            conditions: {
                value: string | number | boolean | string[];
                id: string;
                operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "CONTAINS_ANY" | "CONTAINS_ALL" | "GREATER_THAN" | "LESS_THAN";
                questionKey: string;
            }[];
            mode: "ALL" | "ANY";
        } | null;
        steps: {
            id: string;
            order: number;
            required: boolean;
            target: {
                keys: string[];
                ids: string[];
                kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
            };
            roleKey: string;
            period: "AM" | "PM";
            preferredProductIds: string[];
            maxAlternatives: number;
        }[];
    }[];
    settings: {
        maximumProductsPerBrand: number | null;
        preferBrandDiversity: boolean;
        allowDuplicateProducts: boolean;
    };
}, {
    concerns: {
        id: string;
        key: string;
        label: {
            en: string;
            ar: string;
        };
        order: number;
        description?: {
            en: string;
            ar: string;
        } | undefined;
        enabled?: boolean | undefined;
    }[];
    title: {
        en: string;
        ar: string;
    };
    schemaVersion: 1;
    introduction: {
        en: string;
        ar: string;
    };
    startLabel: {
        en: string;
        ar: string;
    };
    resultTitle: {
        en: string;
        ar: string;
    };
    disclaimer: {
        en: string;
        ar: string;
    };
    noResult: {
        en: string;
        ar: string;
    };
    questions: {
        type: "SINGLE_CHOICE" | "MULTIPLE_CHOICE" | "RANKED_CHOICE" | "YES_NO" | "SCALE" | "OPTIONAL_TEXT" | "NUMERIC_RANGE" | "PRODUCT_SELECTION" | "INGREDIENT_PREFERENCE";
        id: string;
        key: string;
        label: {
            en: string;
            ar: string;
        };
        order: number;
        description?: {
            en: string;
            ar: string;
        } | undefined;
        enabled?: boolean | undefined;
        visibility?: {
            conditions: {
                value: string | number | boolean | string[];
                id: string;
                operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "CONTAINS_ANY" | "CONTAINS_ALL" | "GREATER_THAN" | "LESS_THAN";
                questionKey: string;
            }[];
            mode: "ALL" | "ANY";
        } | null | undefined;
        helpText?: {
            en: string;
            ar: string;
        } | undefined;
        required?: boolean | undefined;
        answers?: {
            id: string;
            key: string;
            label: {
                en: string;
                ar: string;
            };
            order: number;
            description?: {
                en: string;
                ar: string;
            } | undefined;
            enabled?: boolean | undefined;
            signals?: {
                value: string | number | boolean | string[];
                key: string;
            }[] | undefined;
        }[] | undefined;
        minSelections?: number | undefined;
        maxSelections?: number | undefined;
        scale?: {
            min: number;
            max: number;
            step: number;
        } | null | undefined;
    }[];
    roles: {
        id: string;
        key: string;
        label: {
            en: string;
            ar: string;
        };
        amOrder: number;
        pmOrder: number;
        description?: {
            en: string;
            ar: string;
        } | undefined;
        enabled?: boolean | undefined;
    }[];
    rules: {
        id: string;
        key: string;
        name: {
            en: string;
            ar: string;
        };
        when: {
            conditions: {
                value: string | number | boolean | string[];
                id: string;
                operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "CONTAINS_ANY" | "CONTAINS_ALL" | "GREATER_THAN" | "LESS_THAN";
                questionKey: string;
            }[];
            mode: "ALL" | "ANY";
        };
        effects: ({
            type: "BOOST";
            target: {
                kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                keys?: string[] | undefined;
                ids?: string[] | undefined;
            };
            score: number;
        } | {
            type: "EXCLUDE";
            reason: {
                en: string;
                ar: string;
            };
            target: {
                kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                keys?: string[] | undefined;
                ids?: string[] | undefined;
            };
        } | {
            type: "SELECT_TEMPLATE";
            templateKey: string;
        } | {
            message: {
                en: string;
                ar: string;
            };
            type: "NO_RESULT";
        })[];
        enabled?: boolean | undefined;
        priority?: number | undefined;
    }[];
    compatibilityRules: {
        message: {
            en: string;
            ar: string;
        };
        id: string;
        key: string;
        name: {
            en: string;
            ar: string;
        };
        effect: "BLOCK_SAME_ROUTINE" | "WARN" | "AM_ONLY" | "PM_ONLY" | "ALTERNATE" | "MAX_ONE_FROM_GROUP";
        left: {
            kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
            keys?: string[] | undefined;
            ids?: string[] | undefined;
        };
        enabled?: boolean | undefined;
        priority?: number | undefined;
        right?: {
            kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
            keys?: string[] | undefined;
            ids?: string[] | undefined;
        } | null | undefined;
    }[];
    templates: {
        id: string;
        key: string;
        name: {
            en: string;
            ar: string;
        };
        steps: {
            id: string;
            order: number;
            roleKey: string;
            period: "AM" | "PM";
            required?: boolean | undefined;
            target?: {
                kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                keys?: string[] | undefined;
                ids?: string[] | undefined;
            } | undefined;
            preferredProductIds?: string[] | undefined;
            maxAlternatives?: number | undefined;
        }[];
        description?: {
            en: string;
            ar: string;
        } | undefined;
        enabled?: boolean | undefined;
        priority?: number | undefined;
        conditions?: {
            conditions: {
                value: string | number | boolean | string[];
                id: string;
                operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "CONTAINS_ANY" | "CONTAINS_ALL" | "GREATER_THAN" | "LESS_THAN";
                questionKey: string;
            }[];
            mode: "ALL" | "ANY";
        } | null | undefined;
    }[];
    settings: {
        maximumProductsPerBrand?: number | null | undefined;
        preferBrandDiversity?: boolean | undefined;
        allowDuplicateProducts?: boolean | undefined;
    };
    estimatedMinutes?: number | undefined;
}>;
export declare const routineAnswerValueSchema: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodString, "many">]>;
export declare const routineAnswersSchema: z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodString, "many">]>>;
export declare const routineEvaluationInputSchema: z.ZodObject<{
    sessionId: z.ZodOptional<z.ZodString>;
    answers: z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodString, "many">]>>;
    locale: z.ZodDefault<z.ZodEnum<["en", "ar"]>>;
    selectedVariants: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodString>>;
    includeDiagnostics: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    answers: Record<string, string | number | boolean | string[]>;
    locale: "en" | "ar";
    selectedVariants: Record<string, string>;
    includeDiagnostics: boolean;
    sessionId?: string | undefined;
}, {
    answers: Record<string, string | number | boolean | string[]>;
    sessionId?: string | undefined;
    locale?: "en" | "ar" | undefined;
    selectedVariants?: Record<string, string> | undefined;
    includeDiagnostics?: boolean | undefined;
}>;
export declare const routineDraftSaveSchema: z.ZodObject<{
    expectedRevision: z.ZodNumber;
    config: z.ZodEffects<z.ZodObject<{
        schemaVersion: z.ZodLiteral<1>;
        title: z.ZodObject<{
            en: z.ZodString;
            ar: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            en: string;
            ar: string;
        }, {
            en: string;
            ar: string;
        }>;
        introduction: z.ZodObject<{
            en: z.ZodString;
            ar: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            en: string;
            ar: string;
        }, {
            en: string;
            ar: string;
        }>;
        estimatedMinutes: z.ZodDefault<z.ZodNumber>;
        startLabel: z.ZodObject<{
            en: z.ZodString;
            ar: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            en: string;
            ar: string;
        }, {
            en: string;
            ar: string;
        }>;
        resultTitle: z.ZodObject<{
            en: z.ZodString;
            ar: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            en: string;
            ar: string;
        }, {
            en: string;
            ar: string;
        }>;
        disclaimer: z.ZodObject<{
            en: z.ZodString;
            ar: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            en: string;
            ar: string;
        }, {
            en: string;
            ar: string;
        }>;
        noResult: z.ZodObject<{
            en: z.ZodString;
            ar: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            en: string;
            ar: string;
        }, {
            en: string;
            ar: string;
        }>;
        questions: z.ZodArray<z.ZodEffects<z.ZodObject<{
            id: z.ZodString;
            key: z.ZodString;
            type: z.ZodEnum<["SINGLE_CHOICE", "MULTIPLE_CHOICE", "RANKED_CHOICE", "YES_NO", "SCALE", "OPTIONAL_TEXT", "NUMERIC_RANGE", "PRODUCT_SELECTION", "INGREDIENT_PREFERENCE"]>;
            label: z.ZodObject<{
                en: z.ZodString;
                ar: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                en: string;
                ar: string;
            }, {
                en: string;
                ar: string;
            }>;
            description: z.ZodDefault<z.ZodObject<{
                en: z.ZodString;
                ar: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                en: string;
                ar: string;
            }, {
                en: string;
                ar: string;
            }>>;
            helpText: z.ZodDefault<z.ZodObject<{
                en: z.ZodString;
                ar: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                en: string;
                ar: string;
            }, {
                en: string;
                ar: string;
            }>>;
            required: z.ZodDefault<z.ZodBoolean>;
            enabled: z.ZodDefault<z.ZodBoolean>;
            order: z.ZodNumber;
            visibility: z.ZodDefault<z.ZodNullable<z.ZodObject<{
                mode: z.ZodEnum<["ALL", "ANY"]>;
                conditions: z.ZodArray<z.ZodObject<{
                    id: z.ZodString;
                    questionKey: z.ZodString;
                    operator: z.ZodEnum<["EQUALS", "NOT_EQUALS", "CONTAINS", "CONTAINS_ANY", "CONTAINS_ALL", "GREATER_THAN", "LESS_THAN"]>;
                    value: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodString, "many">]>;
                }, "strip", z.ZodTypeAny, {
                    value: string | number | boolean | string[];
                    id: string;
                    operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "CONTAINS_ANY" | "CONTAINS_ALL" | "GREATER_THAN" | "LESS_THAN";
                    questionKey: string;
                }, {
                    value: string | number | boolean | string[];
                    id: string;
                    operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "CONTAINS_ANY" | "CONTAINS_ALL" | "GREATER_THAN" | "LESS_THAN";
                    questionKey: string;
                }>, "many">;
            }, "strip", z.ZodTypeAny, {
                conditions: {
                    value: string | number | boolean | string[];
                    id: string;
                    operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "CONTAINS_ANY" | "CONTAINS_ALL" | "GREATER_THAN" | "LESS_THAN";
                    questionKey: string;
                }[];
                mode: "ALL" | "ANY";
            }, {
                conditions: {
                    value: string | number | boolean | string[];
                    id: string;
                    operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "CONTAINS_ANY" | "CONTAINS_ALL" | "GREATER_THAN" | "LESS_THAN";
                    questionKey: string;
                }[];
                mode: "ALL" | "ANY";
            }>>>;
            answers: z.ZodDefault<z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                key: z.ZodString;
                label: z.ZodObject<{
                    en: z.ZodString;
                    ar: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    en: string;
                    ar: string;
                }, {
                    en: string;
                    ar: string;
                }>;
                description: z.ZodDefault<z.ZodObject<{
                    en: z.ZodString;
                    ar: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    en: string;
                    ar: string;
                }, {
                    en: string;
                    ar: string;
                }>>;
                signals: z.ZodDefault<z.ZodArray<z.ZodObject<{
                    key: z.ZodString;
                    value: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodString, "many">]>;
                }, "strip", z.ZodTypeAny, {
                    value: string | number | boolean | string[];
                    key: string;
                }, {
                    value: string | number | boolean | string[];
                    key: string;
                }>, "many">>;
                order: z.ZodNumber;
                enabled: z.ZodDefault<z.ZodBoolean>;
            }, "strip", z.ZodTypeAny, {
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
                order: number;
                enabled: boolean;
                signals: {
                    value: string | number | boolean | string[];
                    key: string;
                }[];
            }, {
                id: string;
                key: string;
                label: {
                    en: string;
                    ar: string;
                };
                order: number;
                description?: {
                    en: string;
                    ar: string;
                } | undefined;
                enabled?: boolean | undefined;
                signals?: {
                    value: string | number | boolean | string[];
                    key: string;
                }[] | undefined;
            }>, "many">>;
            minSelections: z.ZodDefault<z.ZodNumber>;
            maxSelections: z.ZodDefault<z.ZodNumber>;
            scale: z.ZodDefault<z.ZodNullable<z.ZodObject<{
                min: z.ZodNumber;
                max: z.ZodNumber;
                step: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                min: number;
                max: number;
                step: number;
            }, {
                min: number;
                max: number;
                step: number;
            }>>>;
        }, "strip", z.ZodTypeAny, {
            type: "SINGLE_CHOICE" | "MULTIPLE_CHOICE" | "RANKED_CHOICE" | "YES_NO" | "SCALE" | "OPTIONAL_TEXT" | "NUMERIC_RANGE" | "PRODUCT_SELECTION" | "INGREDIENT_PREFERENCE";
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
            order: number;
            enabled: boolean;
            visibility: {
                conditions: {
                    value: string | number | boolean | string[];
                    id: string;
                    operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "CONTAINS_ANY" | "CONTAINS_ALL" | "GREATER_THAN" | "LESS_THAN";
                    questionKey: string;
                }[];
                mode: "ALL" | "ANY";
            } | null;
            helpText: {
                en: string;
                ar: string;
            };
            required: boolean;
            answers: {
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
                order: number;
                enabled: boolean;
                signals: {
                    value: string | number | boolean | string[];
                    key: string;
                }[];
            }[];
            minSelections: number;
            maxSelections: number;
            scale: {
                min: number;
                max: number;
                step: number;
            } | null;
        }, {
            type: "SINGLE_CHOICE" | "MULTIPLE_CHOICE" | "RANKED_CHOICE" | "YES_NO" | "SCALE" | "OPTIONAL_TEXT" | "NUMERIC_RANGE" | "PRODUCT_SELECTION" | "INGREDIENT_PREFERENCE";
            id: string;
            key: string;
            label: {
                en: string;
                ar: string;
            };
            order: number;
            description?: {
                en: string;
                ar: string;
            } | undefined;
            enabled?: boolean | undefined;
            visibility?: {
                conditions: {
                    value: string | number | boolean | string[];
                    id: string;
                    operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "CONTAINS_ANY" | "CONTAINS_ALL" | "GREATER_THAN" | "LESS_THAN";
                    questionKey: string;
                }[];
                mode: "ALL" | "ANY";
            } | null | undefined;
            helpText?: {
                en: string;
                ar: string;
            } | undefined;
            required?: boolean | undefined;
            answers?: {
                id: string;
                key: string;
                label: {
                    en: string;
                    ar: string;
                };
                order: number;
                description?: {
                    en: string;
                    ar: string;
                } | undefined;
                enabled?: boolean | undefined;
                signals?: {
                    value: string | number | boolean | string[];
                    key: string;
                }[] | undefined;
            }[] | undefined;
            minSelections?: number | undefined;
            maxSelections?: number | undefined;
            scale?: {
                min: number;
                max: number;
                step: number;
            } | null | undefined;
        }>, {
            type: "SINGLE_CHOICE" | "MULTIPLE_CHOICE" | "RANKED_CHOICE" | "YES_NO" | "SCALE" | "OPTIONAL_TEXT" | "NUMERIC_RANGE" | "PRODUCT_SELECTION" | "INGREDIENT_PREFERENCE";
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
            order: number;
            enabled: boolean;
            visibility: {
                conditions: {
                    value: string | number | boolean | string[];
                    id: string;
                    operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "CONTAINS_ANY" | "CONTAINS_ALL" | "GREATER_THAN" | "LESS_THAN";
                    questionKey: string;
                }[];
                mode: "ALL" | "ANY";
            } | null;
            helpText: {
                en: string;
                ar: string;
            };
            required: boolean;
            answers: {
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
                order: number;
                enabled: boolean;
                signals: {
                    value: string | number | boolean | string[];
                    key: string;
                }[];
            }[];
            minSelections: number;
            maxSelections: number;
            scale: {
                min: number;
                max: number;
                step: number;
            } | null;
        }, {
            type: "SINGLE_CHOICE" | "MULTIPLE_CHOICE" | "RANKED_CHOICE" | "YES_NO" | "SCALE" | "OPTIONAL_TEXT" | "NUMERIC_RANGE" | "PRODUCT_SELECTION" | "INGREDIENT_PREFERENCE";
            id: string;
            key: string;
            label: {
                en: string;
                ar: string;
            };
            order: number;
            description?: {
                en: string;
                ar: string;
            } | undefined;
            enabled?: boolean | undefined;
            visibility?: {
                conditions: {
                    value: string | number | boolean | string[];
                    id: string;
                    operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "CONTAINS_ANY" | "CONTAINS_ALL" | "GREATER_THAN" | "LESS_THAN";
                    questionKey: string;
                }[];
                mode: "ALL" | "ANY";
            } | null | undefined;
            helpText?: {
                en: string;
                ar: string;
            } | undefined;
            required?: boolean | undefined;
            answers?: {
                id: string;
                key: string;
                label: {
                    en: string;
                    ar: string;
                };
                order: number;
                description?: {
                    en: string;
                    ar: string;
                } | undefined;
                enabled?: boolean | undefined;
                signals?: {
                    value: string | number | boolean | string[];
                    key: string;
                }[] | undefined;
            }[] | undefined;
            minSelections?: number | undefined;
            maxSelections?: number | undefined;
            scale?: {
                min: number;
                max: number;
                step: number;
            } | null | undefined;
        }>, "many">;
        concerns: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            key: z.ZodString;
            label: z.ZodObject<{
                en: z.ZodString;
                ar: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                en: string;
                ar: string;
            }, {
                en: string;
                ar: string;
            }>;
            description: z.ZodDefault<z.ZodObject<{
                en: z.ZodString;
                ar: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                en: string;
                ar: string;
            }, {
                en: string;
                ar: string;
            }>>;
            enabled: z.ZodDefault<z.ZodBoolean>;
            order: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
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
            order: number;
            enabled: boolean;
        }, {
            id: string;
            key: string;
            label: {
                en: string;
                ar: string;
            };
            order: number;
            description?: {
                en: string;
                ar: string;
            } | undefined;
            enabled?: boolean | undefined;
        }>, "many">;
        roles: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            key: z.ZodString;
            label: z.ZodObject<{
                en: z.ZodString;
                ar: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                en: string;
                ar: string;
            }, {
                en: string;
                ar: string;
            }>;
            description: z.ZodDefault<z.ZodObject<{
                en: z.ZodString;
                ar: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                en: string;
                ar: string;
            }, {
                en: string;
                ar: string;
            }>>;
            amOrder: z.ZodNumber;
            pmOrder: z.ZodNumber;
            enabled: z.ZodDefault<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
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
            enabled: boolean;
            amOrder: number;
            pmOrder: number;
        }, {
            id: string;
            key: string;
            label: {
                en: string;
                ar: string;
            };
            amOrder: number;
            pmOrder: number;
            description?: {
                en: string;
                ar: string;
            } | undefined;
            enabled?: boolean | undefined;
        }>, "many">;
        rules: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            key: z.ZodString;
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
            enabled: z.ZodDefault<z.ZodBoolean>;
            priority: z.ZodDefault<z.ZodNumber>;
            when: z.ZodObject<{
                mode: z.ZodEnum<["ALL", "ANY"]>;
                conditions: z.ZodArray<z.ZodObject<{
                    id: z.ZodString;
                    questionKey: z.ZodString;
                    operator: z.ZodEnum<["EQUALS", "NOT_EQUALS", "CONTAINS", "CONTAINS_ANY", "CONTAINS_ALL", "GREATER_THAN", "LESS_THAN"]>;
                    value: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodString, "many">]>;
                }, "strip", z.ZodTypeAny, {
                    value: string | number | boolean | string[];
                    id: string;
                    operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "CONTAINS_ANY" | "CONTAINS_ALL" | "GREATER_THAN" | "LESS_THAN";
                    questionKey: string;
                }, {
                    value: string | number | boolean | string[];
                    id: string;
                    operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "CONTAINS_ANY" | "CONTAINS_ALL" | "GREATER_THAN" | "LESS_THAN";
                    questionKey: string;
                }>, "many">;
            }, "strip", z.ZodTypeAny, {
                conditions: {
                    value: string | number | boolean | string[];
                    id: string;
                    operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "CONTAINS_ANY" | "CONTAINS_ALL" | "GREATER_THAN" | "LESS_THAN";
                    questionKey: string;
                }[];
                mode: "ALL" | "ANY";
            }, {
                conditions: {
                    value: string | number | boolean | string[];
                    id: string;
                    operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "CONTAINS_ANY" | "CONTAINS_ALL" | "GREATER_THAN" | "LESS_THAN";
                    questionKey: string;
                }[];
                mode: "ALL" | "ANY";
            }>;
            effects: z.ZodArray<z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
                type: z.ZodLiteral<"BOOST">;
                target: z.ZodObject<{
                    kind: z.ZodEnum<["ALL", "PRODUCT", "VARIANT", "CATEGORY", "BRAND", "TAG", "INGREDIENT", "ROLE"]>;
                    ids: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                    keys: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                }, "strip", z.ZodTypeAny, {
                    keys: string[];
                    ids: string[];
                    kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                }, {
                    kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                    keys?: string[] | undefined;
                    ids?: string[] | undefined;
                }>;
                score: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                type: "BOOST";
                target: {
                    keys: string[];
                    ids: string[];
                    kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                };
                score: number;
            }, {
                type: "BOOST";
                target: {
                    kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                    keys?: string[] | undefined;
                    ids?: string[] | undefined;
                };
                score: number;
            }>, z.ZodObject<{
                type: z.ZodLiteral<"EXCLUDE">;
                target: z.ZodObject<{
                    kind: z.ZodEnum<["ALL", "PRODUCT", "VARIANT", "CATEGORY", "BRAND", "TAG", "INGREDIENT", "ROLE"]>;
                    ids: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                    keys: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                }, "strip", z.ZodTypeAny, {
                    keys: string[];
                    ids: string[];
                    kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                }, {
                    kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                    keys?: string[] | undefined;
                    ids?: string[] | undefined;
                }>;
                reason: z.ZodObject<{
                    en: z.ZodString;
                    ar: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    en: string;
                    ar: string;
                }, {
                    en: string;
                    ar: string;
                }>;
            }, "strip", z.ZodTypeAny, {
                type: "EXCLUDE";
                reason: {
                    en: string;
                    ar: string;
                };
                target: {
                    keys: string[];
                    ids: string[];
                    kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                };
            }, {
                type: "EXCLUDE";
                reason: {
                    en: string;
                    ar: string;
                };
                target: {
                    kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                    keys?: string[] | undefined;
                    ids?: string[] | undefined;
                };
            }>, z.ZodObject<{
                type: z.ZodLiteral<"SELECT_TEMPLATE">;
                templateKey: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                type: "SELECT_TEMPLATE";
                templateKey: string;
            }, {
                type: "SELECT_TEMPLATE";
                templateKey: string;
            }>, z.ZodObject<{
                type: z.ZodLiteral<"NO_RESULT">;
                message: z.ZodObject<{
                    en: z.ZodString;
                    ar: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    en: string;
                    ar: string;
                }, {
                    en: string;
                    ar: string;
                }>;
            }, "strip", z.ZodTypeAny, {
                message: {
                    en: string;
                    ar: string;
                };
                type: "NO_RESULT";
            }, {
                message: {
                    en: string;
                    ar: string;
                };
                type: "NO_RESULT";
            }>]>, "many">;
        }, "strip", z.ZodTypeAny, {
            id: string;
            key: string;
            name: {
                en: string;
                ar: string;
            };
            enabled: boolean;
            priority: number;
            when: {
                conditions: {
                    value: string | number | boolean | string[];
                    id: string;
                    operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "CONTAINS_ANY" | "CONTAINS_ALL" | "GREATER_THAN" | "LESS_THAN";
                    questionKey: string;
                }[];
                mode: "ALL" | "ANY";
            };
            effects: ({
                type: "BOOST";
                target: {
                    keys: string[];
                    ids: string[];
                    kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                };
                score: number;
            } | {
                type: "EXCLUDE";
                reason: {
                    en: string;
                    ar: string;
                };
                target: {
                    keys: string[];
                    ids: string[];
                    kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                };
            } | {
                type: "SELECT_TEMPLATE";
                templateKey: string;
            } | {
                message: {
                    en: string;
                    ar: string;
                };
                type: "NO_RESULT";
            })[];
        }, {
            id: string;
            key: string;
            name: {
                en: string;
                ar: string;
            };
            when: {
                conditions: {
                    value: string | number | boolean | string[];
                    id: string;
                    operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "CONTAINS_ANY" | "CONTAINS_ALL" | "GREATER_THAN" | "LESS_THAN";
                    questionKey: string;
                }[];
                mode: "ALL" | "ANY";
            };
            effects: ({
                type: "BOOST";
                target: {
                    kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                    keys?: string[] | undefined;
                    ids?: string[] | undefined;
                };
                score: number;
            } | {
                type: "EXCLUDE";
                reason: {
                    en: string;
                    ar: string;
                };
                target: {
                    kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                    keys?: string[] | undefined;
                    ids?: string[] | undefined;
                };
            } | {
                type: "SELECT_TEMPLATE";
                templateKey: string;
            } | {
                message: {
                    en: string;
                    ar: string;
                };
                type: "NO_RESULT";
            })[];
            enabled?: boolean | undefined;
            priority?: number | undefined;
        }>, "many">;
        compatibilityRules: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            key: z.ZodString;
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
            enabled: z.ZodDefault<z.ZodBoolean>;
            priority: z.ZodDefault<z.ZodNumber>;
            effect: z.ZodEnum<["BLOCK_SAME_ROUTINE", "WARN", "AM_ONLY", "PM_ONLY", "ALTERNATE", "MAX_ONE_FROM_GROUP"]>;
            left: z.ZodObject<{
                kind: z.ZodEnum<["ALL", "PRODUCT", "VARIANT", "CATEGORY", "BRAND", "TAG", "INGREDIENT", "ROLE"]>;
                ids: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                keys: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            }, "strip", z.ZodTypeAny, {
                keys: string[];
                ids: string[];
                kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
            }, {
                kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                keys?: string[] | undefined;
                ids?: string[] | undefined;
            }>;
            right: z.ZodDefault<z.ZodNullable<z.ZodObject<{
                kind: z.ZodEnum<["ALL", "PRODUCT", "VARIANT", "CATEGORY", "BRAND", "TAG", "INGREDIENT", "ROLE"]>;
                ids: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                keys: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            }, "strip", z.ZodTypeAny, {
                keys: string[];
                ids: string[];
                kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
            }, {
                kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                keys?: string[] | undefined;
                ids?: string[] | undefined;
            }>>>;
            message: z.ZodObject<{
                en: z.ZodString;
                ar: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                en: string;
                ar: string;
            }, {
                en: string;
                ar: string;
            }>;
        }, "strip", z.ZodTypeAny, {
            message: {
                en: string;
                ar: string;
            };
            id: string;
            key: string;
            name: {
                en: string;
                ar: string;
            };
            enabled: boolean;
            priority: number;
            effect: "BLOCK_SAME_ROUTINE" | "WARN" | "AM_ONLY" | "PM_ONLY" | "ALTERNATE" | "MAX_ONE_FROM_GROUP";
            left: {
                keys: string[];
                ids: string[];
                kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
            };
            right: {
                keys: string[];
                ids: string[];
                kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
            } | null;
        }, {
            message: {
                en: string;
                ar: string;
            };
            id: string;
            key: string;
            name: {
                en: string;
                ar: string;
            };
            effect: "BLOCK_SAME_ROUTINE" | "WARN" | "AM_ONLY" | "PM_ONLY" | "ALTERNATE" | "MAX_ONE_FROM_GROUP";
            left: {
                kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                keys?: string[] | undefined;
                ids?: string[] | undefined;
            };
            enabled?: boolean | undefined;
            priority?: number | undefined;
            right?: {
                kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                keys?: string[] | undefined;
                ids?: string[] | undefined;
            } | null | undefined;
        }>, "many">;
        templates: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            key: z.ZodString;
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
            description: z.ZodDefault<z.ZodObject<{
                en: z.ZodString;
                ar: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                en: string;
                ar: string;
            }, {
                en: string;
                ar: string;
            }>>;
            enabled: z.ZodDefault<z.ZodBoolean>;
            priority: z.ZodDefault<z.ZodNumber>;
            conditions: z.ZodDefault<z.ZodNullable<z.ZodObject<{
                mode: z.ZodEnum<["ALL", "ANY"]>;
                conditions: z.ZodArray<z.ZodObject<{
                    id: z.ZodString;
                    questionKey: z.ZodString;
                    operator: z.ZodEnum<["EQUALS", "NOT_EQUALS", "CONTAINS", "CONTAINS_ANY", "CONTAINS_ALL", "GREATER_THAN", "LESS_THAN"]>;
                    value: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodString, "many">]>;
                }, "strip", z.ZodTypeAny, {
                    value: string | number | boolean | string[];
                    id: string;
                    operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "CONTAINS_ANY" | "CONTAINS_ALL" | "GREATER_THAN" | "LESS_THAN";
                    questionKey: string;
                }, {
                    value: string | number | boolean | string[];
                    id: string;
                    operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "CONTAINS_ANY" | "CONTAINS_ALL" | "GREATER_THAN" | "LESS_THAN";
                    questionKey: string;
                }>, "many">;
            }, "strip", z.ZodTypeAny, {
                conditions: {
                    value: string | number | boolean | string[];
                    id: string;
                    operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "CONTAINS_ANY" | "CONTAINS_ALL" | "GREATER_THAN" | "LESS_THAN";
                    questionKey: string;
                }[];
                mode: "ALL" | "ANY";
            }, {
                conditions: {
                    value: string | number | boolean | string[];
                    id: string;
                    operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "CONTAINS_ANY" | "CONTAINS_ALL" | "GREATER_THAN" | "LESS_THAN";
                    questionKey: string;
                }[];
                mode: "ALL" | "ANY";
            }>>>;
            steps: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                roleKey: z.ZodString;
                period: z.ZodEnum<["AM", "PM"]>;
                required: z.ZodDefault<z.ZodBoolean>;
                order: z.ZodNumber;
                target: z.ZodDefault<z.ZodObject<{
                    kind: z.ZodEnum<["ALL", "PRODUCT", "VARIANT", "CATEGORY", "BRAND", "TAG", "INGREDIENT", "ROLE"]>;
                    ids: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                    keys: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                }, "strip", z.ZodTypeAny, {
                    keys: string[];
                    ids: string[];
                    kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                }, {
                    kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                    keys?: string[] | undefined;
                    ids?: string[] | undefined;
                }>>;
                preferredProductIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                maxAlternatives: z.ZodDefault<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                id: string;
                order: number;
                required: boolean;
                target: {
                    keys: string[];
                    ids: string[];
                    kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                };
                roleKey: string;
                period: "AM" | "PM";
                preferredProductIds: string[];
                maxAlternatives: number;
            }, {
                id: string;
                order: number;
                roleKey: string;
                period: "AM" | "PM";
                required?: boolean | undefined;
                target?: {
                    kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                    keys?: string[] | undefined;
                    ids?: string[] | undefined;
                } | undefined;
                preferredProductIds?: string[] | undefined;
                maxAlternatives?: number | undefined;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            id: string;
            key: string;
            description: {
                en: string;
                ar: string;
            };
            name: {
                en: string;
                ar: string;
            };
            enabled: boolean;
            priority: number;
            conditions: {
                conditions: {
                    value: string | number | boolean | string[];
                    id: string;
                    operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "CONTAINS_ANY" | "CONTAINS_ALL" | "GREATER_THAN" | "LESS_THAN";
                    questionKey: string;
                }[];
                mode: "ALL" | "ANY";
            } | null;
            steps: {
                id: string;
                order: number;
                required: boolean;
                target: {
                    keys: string[];
                    ids: string[];
                    kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                };
                roleKey: string;
                period: "AM" | "PM";
                preferredProductIds: string[];
                maxAlternatives: number;
            }[];
        }, {
            id: string;
            key: string;
            name: {
                en: string;
                ar: string;
            };
            steps: {
                id: string;
                order: number;
                roleKey: string;
                period: "AM" | "PM";
                required?: boolean | undefined;
                target?: {
                    kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                    keys?: string[] | undefined;
                    ids?: string[] | undefined;
                } | undefined;
                preferredProductIds?: string[] | undefined;
                maxAlternatives?: number | undefined;
            }[];
            description?: {
                en: string;
                ar: string;
            } | undefined;
            enabled?: boolean | undefined;
            priority?: number | undefined;
            conditions?: {
                conditions: {
                    value: string | number | boolean | string[];
                    id: string;
                    operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "CONTAINS_ANY" | "CONTAINS_ALL" | "GREATER_THAN" | "LESS_THAN";
                    questionKey: string;
                }[];
                mode: "ALL" | "ANY";
            } | null | undefined;
        }>, "many">;
        settings: z.ZodObject<{
            maximumProductsPerBrand: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
            preferBrandDiversity: z.ZodDefault<z.ZodBoolean>;
            allowDuplicateProducts: z.ZodDefault<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            maximumProductsPerBrand: number | null;
            preferBrandDiversity: boolean;
            allowDuplicateProducts: boolean;
        }, {
            maximumProductsPerBrand?: number | null | undefined;
            preferBrandDiversity?: boolean | undefined;
            allowDuplicateProducts?: boolean | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        concerns: {
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
            order: number;
            enabled: boolean;
        }[];
        title: {
            en: string;
            ar: string;
        };
        schemaVersion: 1;
        introduction: {
            en: string;
            ar: string;
        };
        estimatedMinutes: number;
        startLabel: {
            en: string;
            ar: string;
        };
        resultTitle: {
            en: string;
            ar: string;
        };
        disclaimer: {
            en: string;
            ar: string;
        };
        noResult: {
            en: string;
            ar: string;
        };
        questions: {
            type: "SINGLE_CHOICE" | "MULTIPLE_CHOICE" | "RANKED_CHOICE" | "YES_NO" | "SCALE" | "OPTIONAL_TEXT" | "NUMERIC_RANGE" | "PRODUCT_SELECTION" | "INGREDIENT_PREFERENCE";
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
            order: number;
            enabled: boolean;
            visibility: {
                conditions: {
                    value: string | number | boolean | string[];
                    id: string;
                    operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "CONTAINS_ANY" | "CONTAINS_ALL" | "GREATER_THAN" | "LESS_THAN";
                    questionKey: string;
                }[];
                mode: "ALL" | "ANY";
            } | null;
            helpText: {
                en: string;
                ar: string;
            };
            required: boolean;
            answers: {
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
                order: number;
                enabled: boolean;
                signals: {
                    value: string | number | boolean | string[];
                    key: string;
                }[];
            }[];
            minSelections: number;
            maxSelections: number;
            scale: {
                min: number;
                max: number;
                step: number;
            } | null;
        }[];
        roles: {
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
            enabled: boolean;
            amOrder: number;
            pmOrder: number;
        }[];
        rules: {
            id: string;
            key: string;
            name: {
                en: string;
                ar: string;
            };
            enabled: boolean;
            priority: number;
            when: {
                conditions: {
                    value: string | number | boolean | string[];
                    id: string;
                    operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "CONTAINS_ANY" | "CONTAINS_ALL" | "GREATER_THAN" | "LESS_THAN";
                    questionKey: string;
                }[];
                mode: "ALL" | "ANY";
            };
            effects: ({
                type: "BOOST";
                target: {
                    keys: string[];
                    ids: string[];
                    kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                };
                score: number;
            } | {
                type: "EXCLUDE";
                reason: {
                    en: string;
                    ar: string;
                };
                target: {
                    keys: string[];
                    ids: string[];
                    kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                };
            } | {
                type: "SELECT_TEMPLATE";
                templateKey: string;
            } | {
                message: {
                    en: string;
                    ar: string;
                };
                type: "NO_RESULT";
            })[];
        }[];
        compatibilityRules: {
            message: {
                en: string;
                ar: string;
            };
            id: string;
            key: string;
            name: {
                en: string;
                ar: string;
            };
            enabled: boolean;
            priority: number;
            effect: "BLOCK_SAME_ROUTINE" | "WARN" | "AM_ONLY" | "PM_ONLY" | "ALTERNATE" | "MAX_ONE_FROM_GROUP";
            left: {
                keys: string[];
                ids: string[];
                kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
            };
            right: {
                keys: string[];
                ids: string[];
                kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
            } | null;
        }[];
        templates: {
            id: string;
            key: string;
            description: {
                en: string;
                ar: string;
            };
            name: {
                en: string;
                ar: string;
            };
            enabled: boolean;
            priority: number;
            conditions: {
                conditions: {
                    value: string | number | boolean | string[];
                    id: string;
                    operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "CONTAINS_ANY" | "CONTAINS_ALL" | "GREATER_THAN" | "LESS_THAN";
                    questionKey: string;
                }[];
                mode: "ALL" | "ANY";
            } | null;
            steps: {
                id: string;
                order: number;
                required: boolean;
                target: {
                    keys: string[];
                    ids: string[];
                    kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                };
                roleKey: string;
                period: "AM" | "PM";
                preferredProductIds: string[];
                maxAlternatives: number;
            }[];
        }[];
        settings: {
            maximumProductsPerBrand: number | null;
            preferBrandDiversity: boolean;
            allowDuplicateProducts: boolean;
        };
    }, {
        concerns: {
            id: string;
            key: string;
            label: {
                en: string;
                ar: string;
            };
            order: number;
            description?: {
                en: string;
                ar: string;
            } | undefined;
            enabled?: boolean | undefined;
        }[];
        title: {
            en: string;
            ar: string;
        };
        schemaVersion: 1;
        introduction: {
            en: string;
            ar: string;
        };
        startLabel: {
            en: string;
            ar: string;
        };
        resultTitle: {
            en: string;
            ar: string;
        };
        disclaimer: {
            en: string;
            ar: string;
        };
        noResult: {
            en: string;
            ar: string;
        };
        questions: {
            type: "SINGLE_CHOICE" | "MULTIPLE_CHOICE" | "RANKED_CHOICE" | "YES_NO" | "SCALE" | "OPTIONAL_TEXT" | "NUMERIC_RANGE" | "PRODUCT_SELECTION" | "INGREDIENT_PREFERENCE";
            id: string;
            key: string;
            label: {
                en: string;
                ar: string;
            };
            order: number;
            description?: {
                en: string;
                ar: string;
            } | undefined;
            enabled?: boolean | undefined;
            visibility?: {
                conditions: {
                    value: string | number | boolean | string[];
                    id: string;
                    operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "CONTAINS_ANY" | "CONTAINS_ALL" | "GREATER_THAN" | "LESS_THAN";
                    questionKey: string;
                }[];
                mode: "ALL" | "ANY";
            } | null | undefined;
            helpText?: {
                en: string;
                ar: string;
            } | undefined;
            required?: boolean | undefined;
            answers?: {
                id: string;
                key: string;
                label: {
                    en: string;
                    ar: string;
                };
                order: number;
                description?: {
                    en: string;
                    ar: string;
                } | undefined;
                enabled?: boolean | undefined;
                signals?: {
                    value: string | number | boolean | string[];
                    key: string;
                }[] | undefined;
            }[] | undefined;
            minSelections?: number | undefined;
            maxSelections?: number | undefined;
            scale?: {
                min: number;
                max: number;
                step: number;
            } | null | undefined;
        }[];
        roles: {
            id: string;
            key: string;
            label: {
                en: string;
                ar: string;
            };
            amOrder: number;
            pmOrder: number;
            description?: {
                en: string;
                ar: string;
            } | undefined;
            enabled?: boolean | undefined;
        }[];
        rules: {
            id: string;
            key: string;
            name: {
                en: string;
                ar: string;
            };
            when: {
                conditions: {
                    value: string | number | boolean | string[];
                    id: string;
                    operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "CONTAINS_ANY" | "CONTAINS_ALL" | "GREATER_THAN" | "LESS_THAN";
                    questionKey: string;
                }[];
                mode: "ALL" | "ANY";
            };
            effects: ({
                type: "BOOST";
                target: {
                    kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                    keys?: string[] | undefined;
                    ids?: string[] | undefined;
                };
                score: number;
            } | {
                type: "EXCLUDE";
                reason: {
                    en: string;
                    ar: string;
                };
                target: {
                    kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                    keys?: string[] | undefined;
                    ids?: string[] | undefined;
                };
            } | {
                type: "SELECT_TEMPLATE";
                templateKey: string;
            } | {
                message: {
                    en: string;
                    ar: string;
                };
                type: "NO_RESULT";
            })[];
            enabled?: boolean | undefined;
            priority?: number | undefined;
        }[];
        compatibilityRules: {
            message: {
                en: string;
                ar: string;
            };
            id: string;
            key: string;
            name: {
                en: string;
                ar: string;
            };
            effect: "BLOCK_SAME_ROUTINE" | "WARN" | "AM_ONLY" | "PM_ONLY" | "ALTERNATE" | "MAX_ONE_FROM_GROUP";
            left: {
                kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                keys?: string[] | undefined;
                ids?: string[] | undefined;
            };
            enabled?: boolean | undefined;
            priority?: number | undefined;
            right?: {
                kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                keys?: string[] | undefined;
                ids?: string[] | undefined;
            } | null | undefined;
        }[];
        templates: {
            id: string;
            key: string;
            name: {
                en: string;
                ar: string;
            };
            steps: {
                id: string;
                order: number;
                roleKey: string;
                period: "AM" | "PM";
                required?: boolean | undefined;
                target?: {
                    kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                    keys?: string[] | undefined;
                    ids?: string[] | undefined;
                } | undefined;
                preferredProductIds?: string[] | undefined;
                maxAlternatives?: number | undefined;
            }[];
            description?: {
                en: string;
                ar: string;
            } | undefined;
            enabled?: boolean | undefined;
            priority?: number | undefined;
            conditions?: {
                conditions: {
                    value: string | number | boolean | string[];
                    id: string;
                    operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "CONTAINS_ANY" | "CONTAINS_ALL" | "GREATER_THAN" | "LESS_THAN";
                    questionKey: string;
                }[];
                mode: "ALL" | "ANY";
            } | null | undefined;
        }[];
        settings: {
            maximumProductsPerBrand?: number | null | undefined;
            preferBrandDiversity?: boolean | undefined;
            allowDuplicateProducts?: boolean | undefined;
        };
        estimatedMinutes?: number | undefined;
    }>, {
        concerns: {
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
            order: number;
            enabled: boolean;
        }[];
        title: {
            en: string;
            ar: string;
        };
        schemaVersion: 1;
        introduction: {
            en: string;
            ar: string;
        };
        estimatedMinutes: number;
        startLabel: {
            en: string;
            ar: string;
        };
        resultTitle: {
            en: string;
            ar: string;
        };
        disclaimer: {
            en: string;
            ar: string;
        };
        noResult: {
            en: string;
            ar: string;
        };
        questions: {
            type: "SINGLE_CHOICE" | "MULTIPLE_CHOICE" | "RANKED_CHOICE" | "YES_NO" | "SCALE" | "OPTIONAL_TEXT" | "NUMERIC_RANGE" | "PRODUCT_SELECTION" | "INGREDIENT_PREFERENCE";
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
            order: number;
            enabled: boolean;
            visibility: {
                conditions: {
                    value: string | number | boolean | string[];
                    id: string;
                    operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "CONTAINS_ANY" | "CONTAINS_ALL" | "GREATER_THAN" | "LESS_THAN";
                    questionKey: string;
                }[];
                mode: "ALL" | "ANY";
            } | null;
            helpText: {
                en: string;
                ar: string;
            };
            required: boolean;
            answers: {
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
                order: number;
                enabled: boolean;
                signals: {
                    value: string | number | boolean | string[];
                    key: string;
                }[];
            }[];
            minSelections: number;
            maxSelections: number;
            scale: {
                min: number;
                max: number;
                step: number;
            } | null;
        }[];
        roles: {
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
            enabled: boolean;
            amOrder: number;
            pmOrder: number;
        }[];
        rules: {
            id: string;
            key: string;
            name: {
                en: string;
                ar: string;
            };
            enabled: boolean;
            priority: number;
            when: {
                conditions: {
                    value: string | number | boolean | string[];
                    id: string;
                    operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "CONTAINS_ANY" | "CONTAINS_ALL" | "GREATER_THAN" | "LESS_THAN";
                    questionKey: string;
                }[];
                mode: "ALL" | "ANY";
            };
            effects: ({
                type: "BOOST";
                target: {
                    keys: string[];
                    ids: string[];
                    kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                };
                score: number;
            } | {
                type: "EXCLUDE";
                reason: {
                    en: string;
                    ar: string;
                };
                target: {
                    keys: string[];
                    ids: string[];
                    kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                };
            } | {
                type: "SELECT_TEMPLATE";
                templateKey: string;
            } | {
                message: {
                    en: string;
                    ar: string;
                };
                type: "NO_RESULT";
            })[];
        }[];
        compatibilityRules: {
            message: {
                en: string;
                ar: string;
            };
            id: string;
            key: string;
            name: {
                en: string;
                ar: string;
            };
            enabled: boolean;
            priority: number;
            effect: "BLOCK_SAME_ROUTINE" | "WARN" | "AM_ONLY" | "PM_ONLY" | "ALTERNATE" | "MAX_ONE_FROM_GROUP";
            left: {
                keys: string[];
                ids: string[];
                kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
            };
            right: {
                keys: string[];
                ids: string[];
                kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
            } | null;
        }[];
        templates: {
            id: string;
            key: string;
            description: {
                en: string;
                ar: string;
            };
            name: {
                en: string;
                ar: string;
            };
            enabled: boolean;
            priority: number;
            conditions: {
                conditions: {
                    value: string | number | boolean | string[];
                    id: string;
                    operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "CONTAINS_ANY" | "CONTAINS_ALL" | "GREATER_THAN" | "LESS_THAN";
                    questionKey: string;
                }[];
                mode: "ALL" | "ANY";
            } | null;
            steps: {
                id: string;
                order: number;
                required: boolean;
                target: {
                    keys: string[];
                    ids: string[];
                    kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                };
                roleKey: string;
                period: "AM" | "PM";
                preferredProductIds: string[];
                maxAlternatives: number;
            }[];
        }[];
        settings: {
            maximumProductsPerBrand: number | null;
            preferBrandDiversity: boolean;
            allowDuplicateProducts: boolean;
        };
    }, {
        concerns: {
            id: string;
            key: string;
            label: {
                en: string;
                ar: string;
            };
            order: number;
            description?: {
                en: string;
                ar: string;
            } | undefined;
            enabled?: boolean | undefined;
        }[];
        title: {
            en: string;
            ar: string;
        };
        schemaVersion: 1;
        introduction: {
            en: string;
            ar: string;
        };
        startLabel: {
            en: string;
            ar: string;
        };
        resultTitle: {
            en: string;
            ar: string;
        };
        disclaimer: {
            en: string;
            ar: string;
        };
        noResult: {
            en: string;
            ar: string;
        };
        questions: {
            type: "SINGLE_CHOICE" | "MULTIPLE_CHOICE" | "RANKED_CHOICE" | "YES_NO" | "SCALE" | "OPTIONAL_TEXT" | "NUMERIC_RANGE" | "PRODUCT_SELECTION" | "INGREDIENT_PREFERENCE";
            id: string;
            key: string;
            label: {
                en: string;
                ar: string;
            };
            order: number;
            description?: {
                en: string;
                ar: string;
            } | undefined;
            enabled?: boolean | undefined;
            visibility?: {
                conditions: {
                    value: string | number | boolean | string[];
                    id: string;
                    operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "CONTAINS_ANY" | "CONTAINS_ALL" | "GREATER_THAN" | "LESS_THAN";
                    questionKey: string;
                }[];
                mode: "ALL" | "ANY";
            } | null | undefined;
            helpText?: {
                en: string;
                ar: string;
            } | undefined;
            required?: boolean | undefined;
            answers?: {
                id: string;
                key: string;
                label: {
                    en: string;
                    ar: string;
                };
                order: number;
                description?: {
                    en: string;
                    ar: string;
                } | undefined;
                enabled?: boolean | undefined;
                signals?: {
                    value: string | number | boolean | string[];
                    key: string;
                }[] | undefined;
            }[] | undefined;
            minSelections?: number | undefined;
            maxSelections?: number | undefined;
            scale?: {
                min: number;
                max: number;
                step: number;
            } | null | undefined;
        }[];
        roles: {
            id: string;
            key: string;
            label: {
                en: string;
                ar: string;
            };
            amOrder: number;
            pmOrder: number;
            description?: {
                en: string;
                ar: string;
            } | undefined;
            enabled?: boolean | undefined;
        }[];
        rules: {
            id: string;
            key: string;
            name: {
                en: string;
                ar: string;
            };
            when: {
                conditions: {
                    value: string | number | boolean | string[];
                    id: string;
                    operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "CONTAINS_ANY" | "CONTAINS_ALL" | "GREATER_THAN" | "LESS_THAN";
                    questionKey: string;
                }[];
                mode: "ALL" | "ANY";
            };
            effects: ({
                type: "BOOST";
                target: {
                    kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                    keys?: string[] | undefined;
                    ids?: string[] | undefined;
                };
                score: number;
            } | {
                type: "EXCLUDE";
                reason: {
                    en: string;
                    ar: string;
                };
                target: {
                    kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                    keys?: string[] | undefined;
                    ids?: string[] | undefined;
                };
            } | {
                type: "SELECT_TEMPLATE";
                templateKey: string;
            } | {
                message: {
                    en: string;
                    ar: string;
                };
                type: "NO_RESULT";
            })[];
            enabled?: boolean | undefined;
            priority?: number | undefined;
        }[];
        compatibilityRules: {
            message: {
                en: string;
                ar: string;
            };
            id: string;
            key: string;
            name: {
                en: string;
                ar: string;
            };
            effect: "BLOCK_SAME_ROUTINE" | "WARN" | "AM_ONLY" | "PM_ONLY" | "ALTERNATE" | "MAX_ONE_FROM_GROUP";
            left: {
                kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                keys?: string[] | undefined;
                ids?: string[] | undefined;
            };
            enabled?: boolean | undefined;
            priority?: number | undefined;
            right?: {
                kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                keys?: string[] | undefined;
                ids?: string[] | undefined;
            } | null | undefined;
        }[];
        templates: {
            id: string;
            key: string;
            name: {
                en: string;
                ar: string;
            };
            steps: {
                id: string;
                order: number;
                roleKey: string;
                period: "AM" | "PM";
                required?: boolean | undefined;
                target?: {
                    kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                    keys?: string[] | undefined;
                    ids?: string[] | undefined;
                } | undefined;
                preferredProductIds?: string[] | undefined;
                maxAlternatives?: number | undefined;
            }[];
            description?: {
                en: string;
                ar: string;
            } | undefined;
            enabled?: boolean | undefined;
            priority?: number | undefined;
            conditions?: {
                conditions: {
                    value: string | number | boolean | string[];
                    id: string;
                    operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "CONTAINS_ANY" | "CONTAINS_ALL" | "GREATER_THAN" | "LESS_THAN";
                    questionKey: string;
                }[];
                mode: "ALL" | "ANY";
            } | null | undefined;
        }[];
        settings: {
            maximumProductsPerBrand?: number | null | undefined;
            preferBrandDiversity?: boolean | undefined;
            allowDuplicateProducts?: boolean | undefined;
        };
        estimatedMinutes?: number | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    expectedRevision: number;
    config: {
        concerns: {
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
            order: number;
            enabled: boolean;
        }[];
        title: {
            en: string;
            ar: string;
        };
        schemaVersion: 1;
        introduction: {
            en: string;
            ar: string;
        };
        estimatedMinutes: number;
        startLabel: {
            en: string;
            ar: string;
        };
        resultTitle: {
            en: string;
            ar: string;
        };
        disclaimer: {
            en: string;
            ar: string;
        };
        noResult: {
            en: string;
            ar: string;
        };
        questions: {
            type: "SINGLE_CHOICE" | "MULTIPLE_CHOICE" | "RANKED_CHOICE" | "YES_NO" | "SCALE" | "OPTIONAL_TEXT" | "NUMERIC_RANGE" | "PRODUCT_SELECTION" | "INGREDIENT_PREFERENCE";
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
            order: number;
            enabled: boolean;
            visibility: {
                conditions: {
                    value: string | number | boolean | string[];
                    id: string;
                    operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "CONTAINS_ANY" | "CONTAINS_ALL" | "GREATER_THAN" | "LESS_THAN";
                    questionKey: string;
                }[];
                mode: "ALL" | "ANY";
            } | null;
            helpText: {
                en: string;
                ar: string;
            };
            required: boolean;
            answers: {
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
                order: number;
                enabled: boolean;
                signals: {
                    value: string | number | boolean | string[];
                    key: string;
                }[];
            }[];
            minSelections: number;
            maxSelections: number;
            scale: {
                min: number;
                max: number;
                step: number;
            } | null;
        }[];
        roles: {
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
            enabled: boolean;
            amOrder: number;
            pmOrder: number;
        }[];
        rules: {
            id: string;
            key: string;
            name: {
                en: string;
                ar: string;
            };
            enabled: boolean;
            priority: number;
            when: {
                conditions: {
                    value: string | number | boolean | string[];
                    id: string;
                    operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "CONTAINS_ANY" | "CONTAINS_ALL" | "GREATER_THAN" | "LESS_THAN";
                    questionKey: string;
                }[];
                mode: "ALL" | "ANY";
            };
            effects: ({
                type: "BOOST";
                target: {
                    keys: string[];
                    ids: string[];
                    kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                };
                score: number;
            } | {
                type: "EXCLUDE";
                reason: {
                    en: string;
                    ar: string;
                };
                target: {
                    keys: string[];
                    ids: string[];
                    kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                };
            } | {
                type: "SELECT_TEMPLATE";
                templateKey: string;
            } | {
                message: {
                    en: string;
                    ar: string;
                };
                type: "NO_RESULT";
            })[];
        }[];
        compatibilityRules: {
            message: {
                en: string;
                ar: string;
            };
            id: string;
            key: string;
            name: {
                en: string;
                ar: string;
            };
            enabled: boolean;
            priority: number;
            effect: "BLOCK_SAME_ROUTINE" | "WARN" | "AM_ONLY" | "PM_ONLY" | "ALTERNATE" | "MAX_ONE_FROM_GROUP";
            left: {
                keys: string[];
                ids: string[];
                kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
            };
            right: {
                keys: string[];
                ids: string[];
                kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
            } | null;
        }[];
        templates: {
            id: string;
            key: string;
            description: {
                en: string;
                ar: string;
            };
            name: {
                en: string;
                ar: string;
            };
            enabled: boolean;
            priority: number;
            conditions: {
                conditions: {
                    value: string | number | boolean | string[];
                    id: string;
                    operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "CONTAINS_ANY" | "CONTAINS_ALL" | "GREATER_THAN" | "LESS_THAN";
                    questionKey: string;
                }[];
                mode: "ALL" | "ANY";
            } | null;
            steps: {
                id: string;
                order: number;
                required: boolean;
                target: {
                    keys: string[];
                    ids: string[];
                    kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                };
                roleKey: string;
                period: "AM" | "PM";
                preferredProductIds: string[];
                maxAlternatives: number;
            }[];
        }[];
        settings: {
            maximumProductsPerBrand: number | null;
            preferBrandDiversity: boolean;
            allowDuplicateProducts: boolean;
        };
    };
}, {
    expectedRevision: number;
    config: {
        concerns: {
            id: string;
            key: string;
            label: {
                en: string;
                ar: string;
            };
            order: number;
            description?: {
                en: string;
                ar: string;
            } | undefined;
            enabled?: boolean | undefined;
        }[];
        title: {
            en: string;
            ar: string;
        };
        schemaVersion: 1;
        introduction: {
            en: string;
            ar: string;
        };
        startLabel: {
            en: string;
            ar: string;
        };
        resultTitle: {
            en: string;
            ar: string;
        };
        disclaimer: {
            en: string;
            ar: string;
        };
        noResult: {
            en: string;
            ar: string;
        };
        questions: {
            type: "SINGLE_CHOICE" | "MULTIPLE_CHOICE" | "RANKED_CHOICE" | "YES_NO" | "SCALE" | "OPTIONAL_TEXT" | "NUMERIC_RANGE" | "PRODUCT_SELECTION" | "INGREDIENT_PREFERENCE";
            id: string;
            key: string;
            label: {
                en: string;
                ar: string;
            };
            order: number;
            description?: {
                en: string;
                ar: string;
            } | undefined;
            enabled?: boolean | undefined;
            visibility?: {
                conditions: {
                    value: string | number | boolean | string[];
                    id: string;
                    operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "CONTAINS_ANY" | "CONTAINS_ALL" | "GREATER_THAN" | "LESS_THAN";
                    questionKey: string;
                }[];
                mode: "ALL" | "ANY";
            } | null | undefined;
            helpText?: {
                en: string;
                ar: string;
            } | undefined;
            required?: boolean | undefined;
            answers?: {
                id: string;
                key: string;
                label: {
                    en: string;
                    ar: string;
                };
                order: number;
                description?: {
                    en: string;
                    ar: string;
                } | undefined;
                enabled?: boolean | undefined;
                signals?: {
                    value: string | number | boolean | string[];
                    key: string;
                }[] | undefined;
            }[] | undefined;
            minSelections?: number | undefined;
            maxSelections?: number | undefined;
            scale?: {
                min: number;
                max: number;
                step: number;
            } | null | undefined;
        }[];
        roles: {
            id: string;
            key: string;
            label: {
                en: string;
                ar: string;
            };
            amOrder: number;
            pmOrder: number;
            description?: {
                en: string;
                ar: string;
            } | undefined;
            enabled?: boolean | undefined;
        }[];
        rules: {
            id: string;
            key: string;
            name: {
                en: string;
                ar: string;
            };
            when: {
                conditions: {
                    value: string | number | boolean | string[];
                    id: string;
                    operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "CONTAINS_ANY" | "CONTAINS_ALL" | "GREATER_THAN" | "LESS_THAN";
                    questionKey: string;
                }[];
                mode: "ALL" | "ANY";
            };
            effects: ({
                type: "BOOST";
                target: {
                    kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                    keys?: string[] | undefined;
                    ids?: string[] | undefined;
                };
                score: number;
            } | {
                type: "EXCLUDE";
                reason: {
                    en: string;
                    ar: string;
                };
                target: {
                    kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                    keys?: string[] | undefined;
                    ids?: string[] | undefined;
                };
            } | {
                type: "SELECT_TEMPLATE";
                templateKey: string;
            } | {
                message: {
                    en: string;
                    ar: string;
                };
                type: "NO_RESULT";
            })[];
            enabled?: boolean | undefined;
            priority?: number | undefined;
        }[];
        compatibilityRules: {
            message: {
                en: string;
                ar: string;
            };
            id: string;
            key: string;
            name: {
                en: string;
                ar: string;
            };
            effect: "BLOCK_SAME_ROUTINE" | "WARN" | "AM_ONLY" | "PM_ONLY" | "ALTERNATE" | "MAX_ONE_FROM_GROUP";
            left: {
                kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                keys?: string[] | undefined;
                ids?: string[] | undefined;
            };
            enabled?: boolean | undefined;
            priority?: number | undefined;
            right?: {
                kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                keys?: string[] | undefined;
                ids?: string[] | undefined;
            } | null | undefined;
        }[];
        templates: {
            id: string;
            key: string;
            name: {
                en: string;
                ar: string;
            };
            steps: {
                id: string;
                order: number;
                roleKey: string;
                period: "AM" | "PM";
                required?: boolean | undefined;
                target?: {
                    kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                    keys?: string[] | undefined;
                    ids?: string[] | undefined;
                } | undefined;
                preferredProductIds?: string[] | undefined;
                maxAlternatives?: number | undefined;
            }[];
            description?: {
                en: string;
                ar: string;
            } | undefined;
            enabled?: boolean | undefined;
            priority?: number | undefined;
            conditions?: {
                conditions: {
                    value: string | number | boolean | string[];
                    id: string;
                    operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "CONTAINS_ANY" | "CONTAINS_ALL" | "GREATER_THAN" | "LESS_THAN";
                    questionKey: string;
                }[];
                mode: "ALL" | "ANY";
            } | null | undefined;
        }[];
        settings: {
            maximumProductsPerBrand?: number | null | undefined;
            preferBrandDiversity?: boolean | undefined;
            allowDuplicateProducts?: boolean | undefined;
        };
        estimatedMinutes?: number | undefined;
    };
}>;
export declare const routineProductProfileInputSchema: z.ZodObject<{
    roles: z.ZodArray<z.ZodString, "many">;
    skinTypes: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    concernKeys: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    textures: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    periods: z.ZodDefault<z.ZodArray<z.ZodEnum<["AM", "PM"]>, "many">>;
    experienceLevels: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    recommendationWeight: z.ZodDefault<z.ZodNumber>;
    neverRecommend: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    skinTypes: string[];
    roles: string[];
    concernKeys: string[];
    textures: string[];
    periods: ("AM" | "PM")[];
    experienceLevels: string[];
    recommendationWeight: number;
    neverRecommend: boolean;
}, {
    roles: string[];
    skinTypes?: string[] | undefined;
    concernKeys?: string[] | undefined;
    textures?: string[] | undefined;
    periods?: ("AM" | "PM")[] | undefined;
    experienceLevels?: string[] | undefined;
    recommendationWeight?: number | undefined;
    neverRecommend?: boolean | undefined;
}>;
export declare const routineEventInputSchema: z.ZodObject<{
    sessionId: z.ZodString;
    type: z.ZodEnum<["QUESTION_ANSWERED", "BUILDER_ABANDONED", "ROUTINE_GENERATED", "PRODUCT_SWAPPED", "ROUTINE_ADD_TO_CART", "ROUTINE_PRODUCT_ADD_TO_CART"]>;
    questionKey: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    productId: z.ZodDefault<z.ZodNullable<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    type: "QUESTION_ANSWERED" | "BUILDER_ABANDONED" | "ROUTINE_GENERATED" | "PRODUCT_SWAPPED" | "ROUTINE_ADD_TO_CART" | "ROUTINE_PRODUCT_ADD_TO_CART";
    productId: string | null;
    questionKey: string | null;
    sessionId: string;
}, {
    type: "QUESTION_ANSWERED" | "BUILDER_ABANDONED" | "ROUTINE_GENERATED" | "PRODUCT_SWAPPED" | "ROUTINE_ADD_TO_CART" | "ROUTINE_PRODUCT_ADD_TO_CART";
    sessionId: string;
    productId?: string | null | undefined;
    questionKey?: string | null | undefined;
}>;
export type RoutineBuilderConfig = z.infer<typeof routineBuilderConfigSchema>;
export type RoutineQuestion = z.infer<typeof routineQuestionSchema>;
export type RoutineRule = z.infer<typeof routineRuleSchema>;
export type RoutineTarget = z.infer<typeof routineTargetSchema>;
export type RoutineAnswers = z.infer<typeof routineAnswersSchema>;
export type RoutineEvaluationInput = z.infer<typeof routineEvaluationInputSchema>;
export type RoutineProductProfileInput = z.infer<typeof routineProductProfileInputSchema>;
export declare const DEFAULT_ROUTINE_BUILDER_CONFIG: RoutineBuilderConfig;
//# sourceMappingURL=routine-builder.schema.d.ts.map