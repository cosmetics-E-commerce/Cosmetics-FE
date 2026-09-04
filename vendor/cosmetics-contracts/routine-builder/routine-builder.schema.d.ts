import { z } from "zod";
export declare const routineBuilderSchemaVersion: 2;
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
export declare const routineSignalOperatorSchema: z.ZodEnum<["EXISTS", "NOT_EXISTS", "EQUALS", "NOT_EQUALS", "CONTAINS", "GREATER_THAN_OR_EQUAL", "LESS_THAN_OR_EQUAL"]>;
export declare const routineSignalConditionSchema: z.ZodObject<{
    id: z.ZodString;
    signalKey: z.ZodString;
    operator: z.ZodEnum<["EXISTS", "NOT_EXISTS", "EQUALS", "NOT_EQUALS", "CONTAINS", "GREATER_THAN_OR_EQUAL", "LESS_THAN_OR_EQUAL"]>;
    value: z.ZodDefault<z.ZodNullable<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodString, "many">]>>>;
}, "strip", z.ZodTypeAny, {
    value: string | number | boolean | string[] | null;
    id: string;
    operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
    signalKey: string;
}, {
    id: string;
    operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
    signalKey: string;
    value?: string | number | boolean | string[] | null | undefined;
}>;
export declare const routineSignalConditionGroupSchema: z.ZodObject<{
    mode: z.ZodEnum<["ALL", "ANY"]>;
    conditions: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        signalKey: z.ZodString;
        operator: z.ZodEnum<["EXISTS", "NOT_EXISTS", "EQUALS", "NOT_EQUALS", "CONTAINS", "GREATER_THAN_OR_EQUAL", "LESS_THAN_OR_EQUAL"]>;
        value: z.ZodDefault<z.ZodNullable<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodString, "many">]>>>;
    }, "strip", z.ZodTypeAny, {
        value: string | number | boolean | string[] | null;
        id: string;
        operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
        signalKey: string;
    }, {
        id: string;
        operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
        signalKey: string;
        value?: string | number | boolean | string[] | null | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    conditions: {
        value: string | number | boolean | string[] | null;
        id: string;
        operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
        signalKey: string;
    }[];
    mode: "ALL" | "ANY";
}, {
    conditions: {
        id: string;
        operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
        signalKey: string;
        value?: string | number | boolean | string[] | null | undefined;
    }[];
    mode: "ALL" | "ANY";
}>;
export declare const routineSignalSchema: z.ZodObject<{
    key: z.ZodString;
    value: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodString, "many">]>;
    weight: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    value: string | number | boolean | string[];
    key: string;
    weight?: number | undefined;
}, {
    value: string | number | boolean | string[];
    key: string;
    weight?: number | undefined;
}>;
/**
 * Signals are configuration-owned vocabulary. The purpose field gives the
 * engine a small set of safe, non-Turing-complete semantics while normal
 * relevance signals remain completely Admin-defined.
 */
export declare const routineSignalDefinitionSchema: z.ZodObject<{
    id: z.ZodString;
    key: z.ZodString;
    family: z.ZodString;
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
    valueType: z.ZodDefault<z.ZodEnum<["NUMBER", "BOOLEAN", "KEYWORD", "KEYWORD_LIST"]>>;
    aggregation: z.ZodDefault<z.ZodEnum<["SUM", "MAX", "LAST"]>>;
    purpose: z.ZodDefault<z.ZodEnum<["PROFILE", "BUDGET_MAX", "OWNED_ROLE"]>>;
    enabled: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    id: string;
    key: string;
    description: {
        en: string;
        ar: string;
    };
    purpose: "PROFILE" | "BUDGET_MAX" | "OWNED_ROLE";
    label: {
        en: string;
        ar: string;
    };
    enabled: boolean;
    family: string;
    valueType: "NUMBER" | "BOOLEAN" | "KEYWORD" | "KEYWORD_LIST";
    aggregation: "SUM" | "MAX" | "LAST";
}, {
    id: string;
    key: string;
    label: {
        en: string;
        ar: string;
    };
    family: string;
    description?: {
        en: string;
        ar: string;
    } | undefined;
    purpose?: "PROFILE" | "BUDGET_MAX" | "OWNED_ROLE" | undefined;
    enabled?: boolean | undefined;
    valueType?: "NUMBER" | "BOOLEAN" | "KEYWORD" | "KEYWORD_LIST" | undefined;
    aggregation?: "SUM" | "MAX" | "LAST" | undefined;
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
        weight: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        value: string | number | boolean | string[];
        key: string;
        weight?: number | undefined;
    }, {
        value: string | number | boolean | string[];
        key: string;
        weight?: number | undefined;
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
        weight?: number | undefined;
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
        weight?: number | undefined;
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
    modes: z.ZodDefault<z.ZodArray<z.ZodEnum<["FULL", "CONTEXTUAL"]>, "many">>;
    contextualRequired: z.ZodDefault<z.ZodBoolean>;
    contextualOrder: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
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
    /** Optional managed signal receiving SCALE/NUMERIC_RANGE values directly. */
    directSignalKey: z.ZodOptional<z.ZodNullable<z.ZodString>>;
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
            weight: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            value: string | number | boolean | string[];
            key: string;
            weight?: number | undefined;
        }, {
            value: string | number | boolean | string[];
            key: string;
            weight?: number | undefined;
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
            weight?: number | undefined;
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
            weight?: number | undefined;
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
    scale: {
        min: number;
        max: number;
        step: number;
    } | null;
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
    modes: ("FULL" | "CONTEXTUAL")[];
    contextualRequired: boolean;
    contextualOrder: number | null;
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
            weight?: number | undefined;
        }[];
    }[];
    minSelections: number;
    maxSelections: number;
    directSignalKey?: string | null | undefined;
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
    scale?: {
        min: number;
        max: number;
        step: number;
    } | null | undefined;
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
    modes?: ("FULL" | "CONTEXTUAL")[] | undefined;
    contextualRequired?: boolean | undefined;
    contextualOrder?: number | null | undefined;
    directSignalKey?: string | null | undefined;
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
            weight?: number | undefined;
        }[] | undefined;
    }[] | undefined;
    minSelections?: number | undefined;
    maxSelections?: number | undefined;
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
    scale: {
        min: number;
        max: number;
        step: number;
    } | null;
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
    modes: ("FULL" | "CONTEXTUAL")[];
    contextualRequired: boolean;
    contextualOrder: number | null;
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
            weight?: number | undefined;
        }[];
    }[];
    minSelections: number;
    maxSelections: number;
    directSignalKey?: string | null | undefined;
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
    scale?: {
        min: number;
        max: number;
        step: number;
    } | null | undefined;
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
    modes?: ("FULL" | "CONTEXTUAL")[] | undefined;
    contextualRequired?: boolean | undefined;
    contextualOrder?: number | null | undefined;
    directSignalKey?: string | null | undefined;
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
            weight?: number | undefined;
        }[] | undefined;
    }[] | undefined;
    minSelections?: number | undefined;
    maxSelections?: number | undefined;
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
    domain: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    amAllowed: z.ZodDefault<z.ZodBoolean>;
    pmAllowed: z.ZodDefault<z.ZodBoolean>;
    defaultPriority: z.ZodDefault<z.ZodNumber>;
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
    domain: string | null;
    amAllowed: boolean;
    pmAllowed: boolean;
    defaultPriority: number;
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
    domain?: string | null | undefined;
    amAllowed?: boolean | undefined;
    pmAllowed?: boolean | undefined;
    defaultPriority?: number | undefined;
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
    channel: z.ZodOptional<z.ZodEnum<["RECOMMENDATION", "MERCHANDISING"]>>;
}, "strip", z.ZodTypeAny, {
    type: "BOOST";
    target: {
        keys: string[];
        ids: string[];
        kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
    };
    score: number;
    channel?: "RECOMMENDATION" | "MERCHANDISING" | undefined;
}, {
    type: "BOOST";
    target: {
        kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
        keys?: string[] | undefined;
        ids?: string[] | undefined;
    };
    score: number;
    channel?: "RECOMMENDATION" | "MERCHANDISING" | undefined;
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
        channel: z.ZodOptional<z.ZodEnum<["RECOMMENDATION", "MERCHANDISING"]>>;
    }, "strip", z.ZodTypeAny, {
        type: "BOOST";
        target: {
            keys: string[];
            ids: string[];
            kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
        };
        score: number;
        channel?: "RECOMMENDATION" | "MERCHANDISING" | undefined;
    }, {
        type: "BOOST";
        target: {
            kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
            keys?: string[] | undefined;
            ids?: string[] | undefined;
        };
        score: number;
        channel?: "RECOMMENDATION" | "MERCHANDISING" | undefined;
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
    priority: number;
    enabled: boolean;
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
        channel?: "RECOMMENDATION" | "MERCHANDISING" | undefined;
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
        channel?: "RECOMMENDATION" | "MERCHANDISING" | undefined;
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
    priority?: number | undefined;
    enabled?: boolean | undefined;
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
    priority: number;
    enabled: boolean;
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
    priority?: number | undefined;
    enabled?: boolean | undefined;
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
    conditions: z.ZodDefault<z.ZodNullable<z.ZodObject<{
        mode: z.ZodEnum<["ALL", "ANY"]>;
        conditions: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            signalKey: z.ZodString;
            operator: z.ZodEnum<["EXISTS", "NOT_EXISTS", "EQUALS", "NOT_EQUALS", "CONTAINS", "GREATER_THAN_OR_EQUAL", "LESS_THAN_OR_EQUAL"]>;
            value: z.ZodDefault<z.ZodNullable<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodString, "many">]>>>;
        }, "strip", z.ZodTypeAny, {
            value: string | number | boolean | string[] | null;
            id: string;
            operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
            signalKey: string;
        }, {
            id: string;
            operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
            signalKey: string;
            value?: string | number | boolean | string[] | null | undefined;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        conditions: {
            value: string | number | boolean | string[] | null;
            id: string;
            operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
            signalKey: string;
        }[];
        mode: "ALL" | "ANY";
    }, {
        conditions: {
            id: string;
            operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
            signalKey: string;
            value?: string | number | boolean | string[] | null | undefined;
        }[];
        mode: "ALL" | "ANY";
    }>>>;
    optionalPriority: z.ZodDefault<z.ZodNumber>;
    fallbackMode: z.ZodDefault<z.ZodEnum<["FAIL_TEMPLATE", "SKIP_OPTIONAL", "USE_FALLBACK_ROLE"]>>;
    fallbackRoleKeys: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    spendingWeight: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    id: string;
    conditions: {
        conditions: {
            value: string | number | boolean | string[] | null;
            id: string;
            operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
            signalKey: string;
        }[];
        mode: "ALL" | "ANY";
    } | null;
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
    optionalPriority: number;
    fallbackMode: "FAIL_TEMPLATE" | "SKIP_OPTIONAL" | "USE_FALLBACK_ROLE";
    fallbackRoleKeys: string[];
    spendingWeight: number | null;
}, {
    id: string;
    order: number;
    roleKey: string;
    period: "AM" | "PM";
    conditions?: {
        conditions: {
            id: string;
            operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
            signalKey: string;
            value?: string | number | boolean | string[] | null | undefined;
        }[];
        mode: "ALL" | "ANY";
    } | null | undefined;
    required?: boolean | undefined;
    target?: {
        kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
        keys?: string[] | undefined;
        ids?: string[] | undefined;
    } | undefined;
    preferredProductIds?: string[] | undefined;
    maxAlternatives?: number | undefined;
    optionalPriority?: number | undefined;
    fallbackMode?: "FAIL_TEMPLATE" | "SKIP_OPTIONAL" | "USE_FALLBACK_ROLE" | undefined;
    fallbackRoleKeys?: string[] | undefined;
    spendingWeight?: number | null | undefined;
}>;
export declare const routineTemplateFamilySchema: z.ZodObject<{
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
    order: z.ZodDefault<z.ZodNumber>;
    enabled: z.ZodDefault<z.ZodBoolean>;
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
    order: number;
    enabled: boolean;
}, {
    id: string;
    key: string;
    name: {
        en: string;
        ar: string;
    };
    description?: {
        en: string;
        ar: string;
    } | undefined;
    order?: number | undefined;
    enabled?: boolean | undefined;
}>;
export declare const routineTemplatePackSchema: z.ZodObject<{
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
    version: z.ZodDefault<z.ZodNumber>;
    source: z.ZodDefault<z.ZodEnum<["BIOREZA", "ADMIN", "IMPORTED"]>>;
    createdAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    id: string;
    key: string;
    description: {
        en: string;
        ar: string;
    };
    createdAt: string | null;
    name: {
        en: string;
        ar: string;
    };
    source: "ADMIN" | "BIOREZA" | "IMPORTED";
    version: number;
}, {
    id: string;
    key: string;
    name: {
        en: string;
        ar: string;
    };
    description?: {
        en: string;
        ar: string;
    } | undefined;
    createdAt?: string | null | undefined;
    source?: "ADMIN" | "BIOREZA" | "IMPORTED" | undefined;
    version?: number | undefined;
}>;
export declare const routineTemplateTagSchema: z.ZodObject<{
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
    enabled: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    id: string;
    key: string;
    label: {
        en: string;
        ar: string;
    };
    enabled: boolean;
}, {
    id: string;
    key: string;
    label: {
        en: string;
        ar: string;
    };
    enabled?: boolean | undefined;
}>;
export declare const routineStepPresetSchema: z.ZodObject<{
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
    domain: z.ZodString;
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
        conditions: z.ZodDefault<z.ZodNullable<z.ZodObject<{
            mode: z.ZodEnum<["ALL", "ANY"]>;
            conditions: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                signalKey: z.ZodString;
                operator: z.ZodEnum<["EXISTS", "NOT_EXISTS", "EQUALS", "NOT_EQUALS", "CONTAINS", "GREATER_THAN_OR_EQUAL", "LESS_THAN_OR_EQUAL"]>;
                value: z.ZodDefault<z.ZodNullable<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodString, "many">]>>>;
            }, "strip", z.ZodTypeAny, {
                value: string | number | boolean | string[] | null;
                id: string;
                operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                signalKey: string;
            }, {
                id: string;
                operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                signalKey: string;
                value?: string | number | boolean | string[] | null | undefined;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            conditions: {
                value: string | number | boolean | string[] | null;
                id: string;
                operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                signalKey: string;
            }[];
            mode: "ALL" | "ANY";
        }, {
            conditions: {
                id: string;
                operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                signalKey: string;
                value?: string | number | boolean | string[] | null | undefined;
            }[];
            mode: "ALL" | "ANY";
        }>>>;
        optionalPriority: z.ZodDefault<z.ZodNumber>;
        fallbackMode: z.ZodDefault<z.ZodEnum<["FAIL_TEMPLATE", "SKIP_OPTIONAL", "USE_FALLBACK_ROLE"]>>;
        fallbackRoleKeys: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        spendingWeight: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        conditions: {
            conditions: {
                value: string | number | boolean | string[] | null;
                id: string;
                operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                signalKey: string;
            }[];
            mode: "ALL" | "ANY";
        } | null;
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
        optionalPriority: number;
        fallbackMode: "FAIL_TEMPLATE" | "SKIP_OPTIONAL" | "USE_FALLBACK_ROLE";
        fallbackRoleKeys: string[];
        spendingWeight: number | null;
    }, {
        id: string;
        order: number;
        roleKey: string;
        period: "AM" | "PM";
        conditions?: {
            conditions: {
                id: string;
                operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                signalKey: string;
                value?: string | number | boolean | string[] | null | undefined;
            }[];
            mode: "ALL" | "ANY";
        } | null | undefined;
        required?: boolean | undefined;
        target?: {
            kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
            keys?: string[] | undefined;
            ids?: string[] | undefined;
        } | undefined;
        preferredProductIds?: string[] | undefined;
        maxAlternatives?: number | undefined;
        optionalPriority?: number | undefined;
        fallbackMode?: "FAIL_TEMPLATE" | "SKIP_OPTIONAL" | "USE_FALLBACK_ROLE" | undefined;
        fallbackRoleKeys?: string[] | undefined;
        spendingWeight?: number | null | undefined;
    }>, "many">;
    enabled: z.ZodDefault<z.ZodBoolean>;
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
    domain: string;
    steps: {
        id: string;
        conditions: {
            conditions: {
                value: string | number | boolean | string[] | null;
                id: string;
                operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                signalKey: string;
            }[];
            mode: "ALL" | "ANY";
        } | null;
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
        optionalPriority: number;
        fallbackMode: "FAIL_TEMPLATE" | "SKIP_OPTIONAL" | "USE_FALLBACK_ROLE";
        fallbackRoleKeys: string[];
        spendingWeight: number | null;
    }[];
}, {
    id: string;
    key: string;
    name: {
        en: string;
        ar: string;
    };
    domain: string;
    steps: {
        id: string;
        order: number;
        roleKey: string;
        period: "AM" | "PM";
        conditions?: {
            conditions: {
                id: string;
                operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                signalKey: string;
                value?: string | number | boolean | string[] | null | undefined;
            }[];
            mode: "ALL" | "ANY";
        } | null | undefined;
        required?: boolean | undefined;
        target?: {
            kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
            keys?: string[] | undefined;
            ids?: string[] | undefined;
        } | undefined;
        preferredProductIds?: string[] | undefined;
        maxAlternatives?: number | undefined;
        optionalPriority?: number | undefined;
        fallbackMode?: "FAIL_TEMPLATE" | "SKIP_OPTIONAL" | "USE_FALLBACK_ROLE" | undefined;
        fallbackRoleKeys?: string[] | undefined;
        spendingWeight?: number | null | undefined;
    }[];
    description?: {
        en: string;
        ar: string;
    } | undefined;
    enabled?: boolean | undefined;
}>;
export declare const routineTemplateSelectionRuleSchema: z.ZodObject<{
    id: z.ZodString;
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
    when: z.ZodObject<{
        mode: z.ZodEnum<["ALL", "ANY"]>;
        conditions: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            signalKey: z.ZodString;
            operator: z.ZodEnum<["EXISTS", "NOT_EXISTS", "EQUALS", "NOT_EQUALS", "CONTAINS", "GREATER_THAN_OR_EQUAL", "LESS_THAN_OR_EQUAL"]>;
            value: z.ZodDefault<z.ZodNullable<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodString, "many">]>>>;
        }, "strip", z.ZodTypeAny, {
            value: string | number | boolean | string[] | null;
            id: string;
            operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
            signalKey: string;
        }, {
            id: string;
            operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
            signalKey: string;
            value?: string | number | boolean | string[] | null | undefined;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        conditions: {
            value: string | number | boolean | string[] | null;
            id: string;
            operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
            signalKey: string;
        }[];
        mode: "ALL" | "ANY";
    }, {
        conditions: {
            id: string;
            operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
            signalKey: string;
            value?: string | number | boolean | string[] | null | undefined;
        }[];
        mode: "ALL" | "ANY";
    }>;
    score: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    id: string;
    name: {
        en: string;
        ar: string;
    };
    score: number;
    when: {
        conditions: {
            value: string | number | boolean | string[] | null;
            id: string;
            operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
            signalKey: string;
        }[];
        mode: "ALL" | "ANY";
    };
}, {
    id: string;
    name: {
        en: string;
        ar: string;
    };
    score: number;
    when: {
        conditions: {
            id: string;
            operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
            signalKey: string;
            value?: string | number | boolean | string[] | null | undefined;
        }[];
        mode: "ALL" | "ANY";
    };
}>;
export declare const routineTemplateBudgetPolicySchema: z.ZodObject<{
    mode: z.ZodDefault<z.ZodEnum<["IGNORE", "RESPECT_CUSTOMER", "HARD", "SOFT"]>>;
    maximum: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    maximum: number | null;
    mode: "IGNORE" | "RESPECT_CUSTOMER" | "HARD" | "SOFT";
}, {
    maximum?: number | null | undefined;
    mode?: "IGNORE" | "RESPECT_CUSTOMER" | "HARD" | "SOFT" | undefined;
}>;
export declare const routineTemplateFallbackPolicySchema: z.ZodObject<{
    requiredStep: z.ZodDefault<z.ZodEnum<["FAIL_TEMPLATE", "USE_STEP_FALLBACK"]>>;
    optionalStep: z.ZodDefault<z.ZodLiteral<"SKIP">>;
    fallbackTemplateKey: z.ZodDefault<z.ZodNullable<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    requiredStep: "FAIL_TEMPLATE" | "USE_STEP_FALLBACK";
    optionalStep: "SKIP";
    fallbackTemplateKey: string | null;
}, {
    requiredStep?: "FAIL_TEMPLATE" | "USE_STEP_FALLBACK" | undefined;
    optionalStep?: "SKIP" | undefined;
    fallbackTemplateKey?: string | null | undefined;
}>;
export declare const routineTemplatePresentationSchema: z.ZodObject<{
    style: z.ZodDefault<z.ZodEnum<["MINIMAL", "EDITORIAL", "STEP_BY_STEP", "COMPACT", "DETAILED"]>>;
    estimatedMinutes: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
    thumbnailKey: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    themeKey: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    intro: z.ZodDefault<z.ZodObject<{
        en: z.ZodString;
        ar: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        en: string;
        ar: string;
    }, {
        en: string;
        ar: string;
    }>>;
    outro: z.ZodDefault<z.ZodObject<{
        en: z.ZodString;
        ar: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        en: string;
        ar: string;
    }, {
        en: string;
        ar: string;
    }>>;
    customerVisible: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    style: "COMPACT" | "MINIMAL" | "EDITORIAL" | "STEP_BY_STEP" | "DETAILED";
    estimatedMinutes: number | null;
    thumbnailKey: string | null;
    themeKey: string | null;
    intro: {
        en: string;
        ar: string;
    };
    outro: {
        en: string;
        ar: string;
    };
    customerVisible: boolean;
}, {
    style?: "COMPACT" | "MINIMAL" | "EDITORIAL" | "STEP_BY_STEP" | "DETAILED" | undefined;
    estimatedMinutes?: number | null | undefined;
    thumbnailKey?: string | null | undefined;
    themeKey?: string | null | undefined;
    intro?: {
        en: string;
        ar: string;
    } | undefined;
    outro?: {
        en: string;
        ar: string;
    } | undefined;
    customerVisible?: boolean | undefined;
}>;
export declare const routineTemplateConstraintSchema: z.ZodObject<{
    mode: z.ZodDefault<z.ZodEnum<["NONE", "PREFERRED", "ONLY"]>>;
    entityId: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    parameterized: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    mode: "NONE" | "PREFERRED" | "ONLY";
    entityId: string | null;
    parameterized: boolean;
}, {
    mode?: "NONE" | "PREFERRED" | "ONLY" | undefined;
    entityId?: string | null | undefined;
    parameterized?: boolean | undefined;
}>;
export declare const routineTemplateVariantSchema: z.ZodObject<{
    kind: z.ZodDefault<z.ZodEnum<["BASE", "SKIN_TYPE", "CONCERN", "COMPLEXITY", "BUDGET", "SEASONAL", "LIFESTYLE", "ANCHOR_ROLE", "BRAND", "CATEGORY", "CUSTOM"]>>;
    parameters: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodString, "many">]>>>;
}, "strip", z.ZodTypeAny, {
    kind: "CATEGORY" | "BRAND" | "CONCERN" | "CUSTOM" | "BASE" | "SKIN_TYPE" | "COMPLEXITY" | "BUDGET" | "SEASONAL" | "LIFESTYLE" | "ANCHOR_ROLE";
    parameters: Record<string, string | number | boolean | string[]>;
}, {
    kind?: "CATEGORY" | "BRAND" | "CONCERN" | "CUSTOM" | "BASE" | "SKIN_TYPE" | "COMPLEXITY" | "BUDGET" | "SEASONAL" | "LIFESTYLE" | "ANCHOR_ROLE" | undefined;
    parameters?: Record<string, string | number | boolean | string[]> | undefined;
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
    internalName: z.ZodOptional<z.ZodString>;
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
    status: z.ZodDefault<z.ZodEnum<["DRAFT", "PUBLISHED", "SCHEDULED", "PAUSED", "ARCHIVED"]>>;
    version: z.ZodDefault<z.ZodNumber>;
    priority: z.ZodDefault<z.ZodNumber>;
    domain: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    familyKey: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    complexity: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    packKey: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    tags: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    baseTemplateKey: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    variant: z.ZodDefault<z.ZodObject<{
        kind: z.ZodDefault<z.ZodEnum<["BASE", "SKIN_TYPE", "CONCERN", "COMPLEXITY", "BUDGET", "SEASONAL", "LIFESTYLE", "ANCHOR_ROLE", "BRAND", "CATEGORY", "CUSTOM"]>>;
        parameters: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodString, "many">]>>>;
    }, "strip", z.ZodTypeAny, {
        kind: "CATEGORY" | "BRAND" | "CONCERN" | "CUSTOM" | "BASE" | "SKIN_TYPE" | "COMPLEXITY" | "BUDGET" | "SEASONAL" | "LIFESTYLE" | "ANCHOR_ROLE";
        parameters: Record<string, string | number | boolean | string[]>;
    }, {
        kind?: "CATEGORY" | "BRAND" | "CONCERN" | "CUSTOM" | "BASE" | "SKIN_TYPE" | "COMPLEXITY" | "BUDGET" | "SEASONAL" | "LIFESTYLE" | "ANCHOR_ROLE" | undefined;
        parameters?: Record<string, string | number | boolean | string[]> | undefined;
    }>>;
    hardEligibility: z.ZodDefault<z.ZodNullable<z.ZodObject<{
        mode: z.ZodEnum<["ALL", "ANY"]>;
        conditions: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            signalKey: z.ZodString;
            operator: z.ZodEnum<["EXISTS", "NOT_EXISTS", "EQUALS", "NOT_EQUALS", "CONTAINS", "GREATER_THAN_OR_EQUAL", "LESS_THAN_OR_EQUAL"]>;
            value: z.ZodDefault<z.ZodNullable<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodString, "many">]>>>;
        }, "strip", z.ZodTypeAny, {
            value: string | number | boolean | string[] | null;
            id: string;
            operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
            signalKey: string;
        }, {
            id: string;
            operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
            signalKey: string;
            value?: string | number | boolean | string[] | null | undefined;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        conditions: {
            value: string | number | boolean | string[] | null;
            id: string;
            operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
            signalKey: string;
        }[];
        mode: "ALL" | "ANY";
    }, {
        conditions: {
            id: string;
            operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
            signalKey: string;
            value?: string | number | boolean | string[] | null | undefined;
        }[];
        mode: "ALL" | "ANY";
    }>>>;
    selectionRules: z.ZodDefault<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
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
        when: z.ZodObject<{
            mode: z.ZodEnum<["ALL", "ANY"]>;
            conditions: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                signalKey: z.ZodString;
                operator: z.ZodEnum<["EXISTS", "NOT_EXISTS", "EQUALS", "NOT_EQUALS", "CONTAINS", "GREATER_THAN_OR_EQUAL", "LESS_THAN_OR_EQUAL"]>;
                value: z.ZodDefault<z.ZodNullable<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodString, "many">]>>>;
            }, "strip", z.ZodTypeAny, {
                value: string | number | boolean | string[] | null;
                id: string;
                operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                signalKey: string;
            }, {
                id: string;
                operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                signalKey: string;
                value?: string | number | boolean | string[] | null | undefined;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            conditions: {
                value: string | number | boolean | string[] | null;
                id: string;
                operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                signalKey: string;
            }[];
            mode: "ALL" | "ANY";
        }, {
            conditions: {
                id: string;
                operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                signalKey: string;
                value?: string | number | boolean | string[] | null | undefined;
            }[];
            mode: "ALL" | "ANY";
        }>;
        score: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        id: string;
        name: {
            en: string;
            ar: string;
        };
        score: number;
        when: {
            conditions: {
                value: string | number | boolean | string[] | null;
                id: string;
                operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                signalKey: string;
            }[];
            mode: "ALL" | "ANY";
        };
    }, {
        id: string;
        name: {
            en: string;
            ar: string;
        };
        score: number;
        when: {
            conditions: {
                id: string;
                operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                signalKey: string;
                value?: string | number | boolean | string[] | null | undefined;
            }[];
            mode: "ALL" | "ANY";
        };
    }>, "many">>;
    allowedAnchorRoles: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
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
        conditions: z.ZodDefault<z.ZodNullable<z.ZodObject<{
            mode: z.ZodEnum<["ALL", "ANY"]>;
            conditions: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                signalKey: z.ZodString;
                operator: z.ZodEnum<["EXISTS", "NOT_EXISTS", "EQUALS", "NOT_EQUALS", "CONTAINS", "GREATER_THAN_OR_EQUAL", "LESS_THAN_OR_EQUAL"]>;
                value: z.ZodDefault<z.ZodNullable<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodString, "many">]>>>;
            }, "strip", z.ZodTypeAny, {
                value: string | number | boolean | string[] | null;
                id: string;
                operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                signalKey: string;
            }, {
                id: string;
                operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                signalKey: string;
                value?: string | number | boolean | string[] | null | undefined;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            conditions: {
                value: string | number | boolean | string[] | null;
                id: string;
                operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                signalKey: string;
            }[];
            mode: "ALL" | "ANY";
        }, {
            conditions: {
                id: string;
                operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                signalKey: string;
                value?: string | number | boolean | string[] | null | undefined;
            }[];
            mode: "ALL" | "ANY";
        }>>>;
        optionalPriority: z.ZodDefault<z.ZodNumber>;
        fallbackMode: z.ZodDefault<z.ZodEnum<["FAIL_TEMPLATE", "SKIP_OPTIONAL", "USE_FALLBACK_ROLE"]>>;
        fallbackRoleKeys: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        spendingWeight: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        conditions: {
            conditions: {
                value: string | number | boolean | string[] | null;
                id: string;
                operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                signalKey: string;
            }[];
            mode: "ALL" | "ANY";
        } | null;
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
        optionalPriority: number;
        fallbackMode: "FAIL_TEMPLATE" | "SKIP_OPTIONAL" | "USE_FALLBACK_ROLE";
        fallbackRoleKeys: string[];
        spendingWeight: number | null;
    }, {
        id: string;
        order: number;
        roleKey: string;
        period: "AM" | "PM";
        conditions?: {
            conditions: {
                id: string;
                operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                signalKey: string;
                value?: string | number | boolean | string[] | null | undefined;
            }[];
            mode: "ALL" | "ANY";
        } | null | undefined;
        required?: boolean | undefined;
        target?: {
            kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
            keys?: string[] | undefined;
            ids?: string[] | undefined;
        } | undefined;
        preferredProductIds?: string[] | undefined;
        maxAlternatives?: number | undefined;
        optionalPriority?: number | undefined;
        fallbackMode?: "FAIL_TEMPLATE" | "SKIP_OPTIONAL" | "USE_FALLBACK_ROLE" | undefined;
        fallbackRoleKeys?: string[] | undefined;
        spendingWeight?: number | null | undefined;
    }>, "many">;
    budgetPolicy: z.ZodDefault<z.ZodNullable<z.ZodObject<{
        mode: z.ZodDefault<z.ZodEnum<["IGNORE", "RESPECT_CUSTOMER", "HARD", "SOFT"]>>;
        maximum: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
    }, "strip", z.ZodTypeAny, {
        maximum: number | null;
        mode: "IGNORE" | "RESPECT_CUSTOMER" | "HARD" | "SOFT";
    }, {
        maximum?: number | null | undefined;
        mode?: "IGNORE" | "RESPECT_CUSTOMER" | "HARD" | "SOFT" | undefined;
    }>>>;
    fallbackPolicy: z.ZodDefault<z.ZodNullable<z.ZodObject<{
        requiredStep: z.ZodDefault<z.ZodEnum<["FAIL_TEMPLATE", "USE_STEP_FALLBACK"]>>;
        optionalStep: z.ZodDefault<z.ZodLiteral<"SKIP">>;
        fallbackTemplateKey: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        requiredStep: "FAIL_TEMPLATE" | "USE_STEP_FALLBACK";
        optionalStep: "SKIP";
        fallbackTemplateKey: string | null;
    }, {
        requiredStep?: "FAIL_TEMPLATE" | "USE_STEP_FALLBACK" | undefined;
        optionalStep?: "SKIP" | undefined;
        fallbackTemplateKey?: string | null | undefined;
    }>>>;
    compatibilityPolicy: z.ZodDefault<z.ZodEnum<["STRICT", "STANDARD"]>>;
    brandConstraint: z.ZodDefault<z.ZodObject<{
        mode: z.ZodDefault<z.ZodEnum<["NONE", "PREFERRED", "ONLY"]>>;
        entityId: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        parameterized: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        mode: "NONE" | "PREFERRED" | "ONLY";
        entityId: string | null;
        parameterized: boolean;
    }, {
        mode?: "NONE" | "PREFERRED" | "ONLY" | undefined;
        entityId?: string | null | undefined;
        parameterized?: boolean | undefined;
    }>>;
    categoryConstraint: z.ZodDefault<z.ZodObject<{
        mode: z.ZodDefault<z.ZodEnum<["NONE", "PREFERRED", "ONLY"]>>;
        entityId: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        parameterized: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        mode: "NONE" | "PREFERRED" | "ONLY";
        entityId: string | null;
        parameterized: boolean;
    }, {
        mode?: "NONE" | "PREFERRED" | "ONLY" | undefined;
        entityId?: string | null | undefined;
        parameterized?: boolean | undefined;
    }>>;
    presentation: z.ZodDefault<z.ZodObject<{
        style: z.ZodDefault<z.ZodEnum<["MINIMAL", "EDITORIAL", "STEP_BY_STEP", "COMPACT", "DETAILED"]>>;
        estimatedMinutes: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
        thumbnailKey: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        themeKey: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        intro: z.ZodDefault<z.ZodObject<{
            en: z.ZodString;
            ar: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            en: string;
            ar: string;
        }, {
            en: string;
            ar: string;
        }>>;
        outro: z.ZodDefault<z.ZodObject<{
            en: z.ZodString;
            ar: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            en: string;
            ar: string;
        }, {
            en: string;
            ar: string;
        }>>;
        customerVisible: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        style: "COMPACT" | "MINIMAL" | "EDITORIAL" | "STEP_BY_STEP" | "DETAILED";
        estimatedMinutes: number | null;
        thumbnailKey: string | null;
        themeKey: string | null;
        intro: {
            en: string;
            ar: string;
        };
        outro: {
            en: string;
            ar: string;
        };
        customerVisible: boolean;
    }, {
        style?: "COMPACT" | "MINIMAL" | "EDITORIAL" | "STEP_BY_STEP" | "DETAILED" | undefined;
        estimatedMinutes?: number | null | undefined;
        thumbnailKey?: string | null | undefined;
        themeKey?: string | null | undefined;
        intro?: {
            en: string;
            ar: string;
        } | undefined;
        outro?: {
            en: string;
            ar: string;
        } | undefined;
        customerVisible?: boolean | undefined;
    }>>;
    schedule: z.ZodDefault<z.ZodObject<{
        startsAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        endsAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        startsAt: string | null;
        endsAt: string | null;
    }, {
        startsAt?: string | null | undefined;
        endsAt?: string | null | undefined;
    }>>;
    pinned: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    status: "ARCHIVED" | "DRAFT" | "PAUSED" | "SCHEDULED" | "PUBLISHED";
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
    enabled: boolean;
    tags: string[];
    version: number;
    presentation: {
        style: "COMPACT" | "MINIMAL" | "EDITORIAL" | "STEP_BY_STEP" | "DETAILED";
        estimatedMinutes: number | null;
        thumbnailKey: string | null;
        themeKey: string | null;
        intro: {
            en: string;
            ar: string;
        };
        outro: {
            en: string;
            ar: string;
        };
        customerVisible: boolean;
    };
    domain: string | null;
    steps: {
        id: string;
        conditions: {
            conditions: {
                value: string | number | boolean | string[] | null;
                id: string;
                operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                signalKey: string;
            }[];
            mode: "ALL" | "ANY";
        } | null;
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
        optionalPriority: number;
        fallbackMode: "FAIL_TEMPLATE" | "SKIP_OPTIONAL" | "USE_FALLBACK_ROLE";
        fallbackRoleKeys: string[];
        spendingWeight: number | null;
    }[];
    familyKey: string | null;
    complexity: string | null;
    packKey: string | null;
    baseTemplateKey: string | null;
    variant: {
        kind: "CATEGORY" | "BRAND" | "CONCERN" | "CUSTOM" | "BASE" | "SKIN_TYPE" | "COMPLEXITY" | "BUDGET" | "SEASONAL" | "LIFESTYLE" | "ANCHOR_ROLE";
        parameters: Record<string, string | number | boolean | string[]>;
    };
    hardEligibility: {
        conditions: {
            value: string | number | boolean | string[] | null;
            id: string;
            operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
            signalKey: string;
        }[];
        mode: "ALL" | "ANY";
    } | null;
    selectionRules: {
        id: string;
        name: {
            en: string;
            ar: string;
        };
        score: number;
        when: {
            conditions: {
                value: string | number | boolean | string[] | null;
                id: string;
                operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                signalKey: string;
            }[];
            mode: "ALL" | "ANY";
        };
    }[];
    allowedAnchorRoles: string[];
    budgetPolicy: {
        maximum: number | null;
        mode: "IGNORE" | "RESPECT_CUSTOMER" | "HARD" | "SOFT";
    } | null;
    fallbackPolicy: {
        requiredStep: "FAIL_TEMPLATE" | "USE_STEP_FALLBACK";
        optionalStep: "SKIP";
        fallbackTemplateKey: string | null;
    } | null;
    compatibilityPolicy: "STANDARD" | "STRICT";
    brandConstraint: {
        mode: "NONE" | "PREFERRED" | "ONLY";
        entityId: string | null;
        parameterized: boolean;
    };
    categoryConstraint: {
        mode: "NONE" | "PREFERRED" | "ONLY";
        entityId: string | null;
        parameterized: boolean;
    };
    schedule: {
        startsAt: string | null;
        endsAt: string | null;
    };
    pinned: boolean;
    internalName?: string | undefined;
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
        conditions?: {
            conditions: {
                id: string;
                operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                signalKey: string;
                value?: string | number | boolean | string[] | null | undefined;
            }[];
            mode: "ALL" | "ANY";
        } | null | undefined;
        required?: boolean | undefined;
        target?: {
            kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
            keys?: string[] | undefined;
            ids?: string[] | undefined;
        } | undefined;
        preferredProductIds?: string[] | undefined;
        maxAlternatives?: number | undefined;
        optionalPriority?: number | undefined;
        fallbackMode?: "FAIL_TEMPLATE" | "SKIP_OPTIONAL" | "USE_FALLBACK_ROLE" | undefined;
        fallbackRoleKeys?: string[] | undefined;
        spendingWeight?: number | null | undefined;
    }[];
    status?: "ARCHIVED" | "DRAFT" | "PAUSED" | "SCHEDULED" | "PUBLISHED" | undefined;
    description?: {
        en: string;
        ar: string;
    } | undefined;
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
    enabled?: boolean | undefined;
    tags?: string[] | undefined;
    version?: number | undefined;
    presentation?: {
        style?: "COMPACT" | "MINIMAL" | "EDITORIAL" | "STEP_BY_STEP" | "DETAILED" | undefined;
        estimatedMinutes?: number | null | undefined;
        thumbnailKey?: string | null | undefined;
        themeKey?: string | null | undefined;
        intro?: {
            en: string;
            ar: string;
        } | undefined;
        outro?: {
            en: string;
            ar: string;
        } | undefined;
        customerVisible?: boolean | undefined;
    } | undefined;
    domain?: string | null | undefined;
    internalName?: string | undefined;
    familyKey?: string | null | undefined;
    complexity?: string | null | undefined;
    packKey?: string | null | undefined;
    baseTemplateKey?: string | null | undefined;
    variant?: {
        kind?: "CATEGORY" | "BRAND" | "CONCERN" | "CUSTOM" | "BASE" | "SKIN_TYPE" | "COMPLEXITY" | "BUDGET" | "SEASONAL" | "LIFESTYLE" | "ANCHOR_ROLE" | undefined;
        parameters?: Record<string, string | number | boolean | string[]> | undefined;
    } | undefined;
    hardEligibility?: {
        conditions: {
            id: string;
            operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
            signalKey: string;
            value?: string | number | boolean | string[] | null | undefined;
        }[];
        mode: "ALL" | "ANY";
    } | null | undefined;
    selectionRules?: {
        id: string;
        name: {
            en: string;
            ar: string;
        };
        score: number;
        when: {
            conditions: {
                id: string;
                operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                signalKey: string;
                value?: string | number | boolean | string[] | null | undefined;
            }[];
            mode: "ALL" | "ANY";
        };
    }[] | undefined;
    allowedAnchorRoles?: string[] | undefined;
    budgetPolicy?: {
        maximum?: number | null | undefined;
        mode?: "IGNORE" | "RESPECT_CUSTOMER" | "HARD" | "SOFT" | undefined;
    } | null | undefined;
    fallbackPolicy?: {
        requiredStep?: "FAIL_TEMPLATE" | "USE_STEP_FALLBACK" | undefined;
        optionalStep?: "SKIP" | undefined;
        fallbackTemplateKey?: string | null | undefined;
    } | null | undefined;
    compatibilityPolicy?: "STANDARD" | "STRICT" | undefined;
    brandConstraint?: {
        mode?: "NONE" | "PREFERRED" | "ONLY" | undefined;
        entityId?: string | null | undefined;
        parameterized?: boolean | undefined;
    } | undefined;
    categoryConstraint?: {
        mode?: "NONE" | "PREFERRED" | "ONLY" | undefined;
        entityId?: string | null | undefined;
        parameterized?: boolean | undefined;
    } | undefined;
    schedule?: {
        startsAt?: string | null | undefined;
        endsAt?: string | null | undefined;
    } | undefined;
    pinned?: boolean | undefined;
}>;
export declare const routineTemplateUniverseSchema: z.ZodObject<{
    families: z.ZodDefault<z.ZodArray<z.ZodObject<{
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
        order: z.ZodDefault<z.ZodNumber>;
        enabled: z.ZodDefault<z.ZodBoolean>;
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
        order: number;
        enabled: boolean;
    }, {
        id: string;
        key: string;
        name: {
            en: string;
            ar: string;
        };
        description?: {
            en: string;
            ar: string;
        } | undefined;
        order?: number | undefined;
        enabled?: boolean | undefined;
    }>, "many">>;
    packs: z.ZodDefault<z.ZodArray<z.ZodObject<{
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
        version: z.ZodDefault<z.ZodNumber>;
        source: z.ZodDefault<z.ZodEnum<["BIOREZA", "ADMIN", "IMPORTED"]>>;
        createdAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        key: string;
        description: {
            en: string;
            ar: string;
        };
        createdAt: string | null;
        name: {
            en: string;
            ar: string;
        };
        source: "ADMIN" | "BIOREZA" | "IMPORTED";
        version: number;
    }, {
        id: string;
        key: string;
        name: {
            en: string;
            ar: string;
        };
        description?: {
            en: string;
            ar: string;
        } | undefined;
        createdAt?: string | null | undefined;
        source?: "ADMIN" | "BIOREZA" | "IMPORTED" | undefined;
        version?: number | undefined;
    }>, "many">>;
    tags: z.ZodDefault<z.ZodArray<z.ZodObject<{
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
        enabled: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        key: string;
        label: {
            en: string;
            ar: string;
        };
        enabled: boolean;
    }, {
        id: string;
        key: string;
        label: {
            en: string;
            ar: string;
        };
        enabled?: boolean | undefined;
    }>, "many">>;
    stepPresets: z.ZodDefault<z.ZodArray<z.ZodObject<{
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
        domain: z.ZodString;
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
            conditions: z.ZodDefault<z.ZodNullable<z.ZodObject<{
                mode: z.ZodEnum<["ALL", "ANY"]>;
                conditions: z.ZodArray<z.ZodObject<{
                    id: z.ZodString;
                    signalKey: z.ZodString;
                    operator: z.ZodEnum<["EXISTS", "NOT_EXISTS", "EQUALS", "NOT_EQUALS", "CONTAINS", "GREATER_THAN_OR_EQUAL", "LESS_THAN_OR_EQUAL"]>;
                    value: z.ZodDefault<z.ZodNullable<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodString, "many">]>>>;
                }, "strip", z.ZodTypeAny, {
                    value: string | number | boolean | string[] | null;
                    id: string;
                    operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                    signalKey: string;
                }, {
                    id: string;
                    operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                    signalKey: string;
                    value?: string | number | boolean | string[] | null | undefined;
                }>, "many">;
            }, "strip", z.ZodTypeAny, {
                conditions: {
                    value: string | number | boolean | string[] | null;
                    id: string;
                    operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                    signalKey: string;
                }[];
                mode: "ALL" | "ANY";
            }, {
                conditions: {
                    id: string;
                    operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                    signalKey: string;
                    value?: string | number | boolean | string[] | null | undefined;
                }[];
                mode: "ALL" | "ANY";
            }>>>;
            optionalPriority: z.ZodDefault<z.ZodNumber>;
            fallbackMode: z.ZodDefault<z.ZodEnum<["FAIL_TEMPLATE", "SKIP_OPTIONAL", "USE_FALLBACK_ROLE"]>>;
            fallbackRoleKeys: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            spendingWeight: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
        }, "strip", z.ZodTypeAny, {
            id: string;
            conditions: {
                conditions: {
                    value: string | number | boolean | string[] | null;
                    id: string;
                    operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                    signalKey: string;
                }[];
                mode: "ALL" | "ANY";
            } | null;
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
            optionalPriority: number;
            fallbackMode: "FAIL_TEMPLATE" | "SKIP_OPTIONAL" | "USE_FALLBACK_ROLE";
            fallbackRoleKeys: string[];
            spendingWeight: number | null;
        }, {
            id: string;
            order: number;
            roleKey: string;
            period: "AM" | "PM";
            conditions?: {
                conditions: {
                    id: string;
                    operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                    signalKey: string;
                    value?: string | number | boolean | string[] | null | undefined;
                }[];
                mode: "ALL" | "ANY";
            } | null | undefined;
            required?: boolean | undefined;
            target?: {
                kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                keys?: string[] | undefined;
                ids?: string[] | undefined;
            } | undefined;
            preferredProductIds?: string[] | undefined;
            maxAlternatives?: number | undefined;
            optionalPriority?: number | undefined;
            fallbackMode?: "FAIL_TEMPLATE" | "SKIP_OPTIONAL" | "USE_FALLBACK_ROLE" | undefined;
            fallbackRoleKeys?: string[] | undefined;
            spendingWeight?: number | null | undefined;
        }>, "many">;
        enabled: z.ZodDefault<z.ZodBoolean>;
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
        domain: string;
        steps: {
            id: string;
            conditions: {
                conditions: {
                    value: string | number | boolean | string[] | null;
                    id: string;
                    operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                    signalKey: string;
                }[];
                mode: "ALL" | "ANY";
            } | null;
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
            optionalPriority: number;
            fallbackMode: "FAIL_TEMPLATE" | "SKIP_OPTIONAL" | "USE_FALLBACK_ROLE";
            fallbackRoleKeys: string[];
            spendingWeight: number | null;
        }[];
    }, {
        id: string;
        key: string;
        name: {
            en: string;
            ar: string;
        };
        domain: string;
        steps: {
            id: string;
            order: number;
            roleKey: string;
            period: "AM" | "PM";
            conditions?: {
                conditions: {
                    id: string;
                    operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                    signalKey: string;
                    value?: string | number | boolean | string[] | null | undefined;
                }[];
                mode: "ALL" | "ANY";
            } | null | undefined;
            required?: boolean | undefined;
            target?: {
                kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                keys?: string[] | undefined;
                ids?: string[] | undefined;
            } | undefined;
            preferredProductIds?: string[] | undefined;
            maxAlternatives?: number | undefined;
            optionalPriority?: number | undefined;
            fallbackMode?: "FAIL_TEMPLATE" | "SKIP_OPTIONAL" | "USE_FALLBACK_ROLE" | undefined;
            fallbackRoleKeys?: string[] | undefined;
            spendingWeight?: number | null | undefined;
        }[];
        description?: {
            en: string;
            ar: string;
        } | undefined;
        enabled?: boolean | undefined;
    }>, "many">>;
    fallbackTemplateKey: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    customerChoiceEnabled: z.ZodDefault<z.ZodBoolean>;
    customerChoiceFamilies: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    tags: {
        id: string;
        key: string;
        label: {
            en: string;
            ar: string;
        };
        enabled: boolean;
    }[];
    fallbackTemplateKey: string | null;
    families: {
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
        order: number;
        enabled: boolean;
    }[];
    packs: {
        id: string;
        key: string;
        description: {
            en: string;
            ar: string;
        };
        createdAt: string | null;
        name: {
            en: string;
            ar: string;
        };
        source: "ADMIN" | "BIOREZA" | "IMPORTED";
        version: number;
    }[];
    stepPresets: {
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
        domain: string;
        steps: {
            id: string;
            conditions: {
                conditions: {
                    value: string | number | boolean | string[] | null;
                    id: string;
                    operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                    signalKey: string;
                }[];
                mode: "ALL" | "ANY";
            } | null;
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
            optionalPriority: number;
            fallbackMode: "FAIL_TEMPLATE" | "SKIP_OPTIONAL" | "USE_FALLBACK_ROLE";
            fallbackRoleKeys: string[];
            spendingWeight: number | null;
        }[];
    }[];
    customerChoiceEnabled: boolean;
    customerChoiceFamilies: string[];
}, {
    tags?: {
        id: string;
        key: string;
        label: {
            en: string;
            ar: string;
        };
        enabled?: boolean | undefined;
    }[] | undefined;
    fallbackTemplateKey?: string | null | undefined;
    families?: {
        id: string;
        key: string;
        name: {
            en: string;
            ar: string;
        };
        description?: {
            en: string;
            ar: string;
        } | undefined;
        order?: number | undefined;
        enabled?: boolean | undefined;
    }[] | undefined;
    packs?: {
        id: string;
        key: string;
        name: {
            en: string;
            ar: string;
        };
        description?: {
            en: string;
            ar: string;
        } | undefined;
        createdAt?: string | null | undefined;
        source?: "ADMIN" | "BIOREZA" | "IMPORTED" | undefined;
        version?: number | undefined;
    }[] | undefined;
    stepPresets?: {
        id: string;
        key: string;
        name: {
            en: string;
            ar: string;
        };
        domain: string;
        steps: {
            id: string;
            order: number;
            roleKey: string;
            period: "AM" | "PM";
            conditions?: {
                conditions: {
                    id: string;
                    operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                    signalKey: string;
                    value?: string | number | boolean | string[] | null | undefined;
                }[];
                mode: "ALL" | "ANY";
            } | null | undefined;
            required?: boolean | undefined;
            target?: {
                kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                keys?: string[] | undefined;
                ids?: string[] | undefined;
            } | undefined;
            preferredProductIds?: string[] | undefined;
            maxAlternatives?: number | undefined;
            optionalPriority?: number | undefined;
            fallbackMode?: "FAIL_TEMPLATE" | "SKIP_OPTIONAL" | "USE_FALLBACK_ROLE" | undefined;
            fallbackRoleKeys?: string[] | undefined;
            spendingWeight?: number | null | undefined;
        }[];
        description?: {
            en: string;
            ar: string;
        } | undefined;
        enabled?: boolean | undefined;
    }[] | undefined;
    customerChoiceEnabled?: boolean | undefined;
    customerChoiceFamilies?: string[] | undefined;
}>;
export declare const routineAnchorBoostRuleSchema: z.ZodObject<{
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
    anchor: z.ZodObject<{
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
    candidate: z.ZodObject<{
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
    channel: z.ZodDefault<z.ZodEnum<["RECOMMENDATION", "MERCHANDISING"]>>;
}, "strip", z.ZodTypeAny, {
    id: string;
    key: string;
    channel: "RECOMMENDATION" | "MERCHANDISING";
    name: {
        en: string;
        ar: string;
    };
    priority: number;
    enabled: boolean;
    score: number;
    anchor: {
        keys: string[];
        ids: string[];
        kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
    };
    candidate: {
        keys: string[];
        ids: string[];
        kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
    };
}, {
    id: string;
    key: string;
    name: {
        en: string;
        ar: string;
    };
    score: number;
    anchor: {
        kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
        keys?: string[] | undefined;
        ids?: string[] | undefined;
    };
    candidate: {
        kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
        keys?: string[] | undefined;
        ids?: string[] | undefined;
    };
    channel?: "RECOMMENDATION" | "MERCHANDISING" | undefined;
    priority?: number | undefined;
    enabled?: boolean | undefined;
}>;
export declare const routineContextualCompletionSchema: z.ZodObject<{
    enabled: z.ZodDefault<z.ZodBoolean>;
    enabledDomains: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    eligibleAnchorRoles: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    defaultTemplateKeys: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodString>>;
    allowUnavailableAnchorPlanning: z.ZodDefault<z.ZodBoolean>;
    requireApprovedReason: z.ZodDefault<z.ZodBoolean>;
    anchorBoostRules: z.ZodDefault<z.ZodArray<z.ZodObject<{
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
        anchor: z.ZodObject<{
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
        candidate: z.ZodObject<{
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
        channel: z.ZodDefault<z.ZodEnum<["RECOMMENDATION", "MERCHANDISING"]>>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        key: string;
        channel: "RECOMMENDATION" | "MERCHANDISING";
        name: {
            en: string;
            ar: string;
        };
        priority: number;
        enabled: boolean;
        score: number;
        anchor: {
            keys: string[];
            ids: string[];
            kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
        };
        candidate: {
            keys: string[];
            ids: string[];
            kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
        };
    }, {
        id: string;
        key: string;
        name: {
            en: string;
            ar: string;
        };
        score: number;
        anchor: {
            kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
            keys?: string[] | undefined;
            ids?: string[] | undefined;
        };
        candidate: {
            kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
            keys?: string[] | undefined;
            ids?: string[] | undefined;
        };
        channel?: "RECOMMENDATION" | "MERCHANDISING" | undefined;
        priority?: number | undefined;
        enabled?: boolean | undefined;
    }>, "many">>;
    title: z.ZodDefault<z.ZodObject<{
        en: z.ZodString;
        ar: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        en: string;
        ar: string;
    }, {
        en: string;
        ar: string;
    }>>;
    introduction: z.ZodDefault<z.ZodObject<{
        en: z.ZodString;
        ar: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        en: string;
        ar: string;
    }, {
        en: string;
        ar: string;
    }>>;
    unavailableMessage: z.ZodDefault<z.ZodObject<{
        en: z.ZodString;
        ar: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        en: string;
        ar: string;
    }, {
        en: string;
        ar: string;
    }>>;
    anchorExplanation: z.ZodDefault<z.ZodObject<{
        en: z.ZodString;
        ar: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        en: string;
        ar: string;
    }, {
        en: string;
        ar: string;
    }>>;
}, "strip", z.ZodTypeAny, {
    title: {
        en: string;
        ar: string;
    };
    enabled: boolean;
    enabledDomains: string[];
    eligibleAnchorRoles: string[];
    defaultTemplateKeys: Record<string, string>;
    allowUnavailableAnchorPlanning: boolean;
    requireApprovedReason: boolean;
    anchorBoostRules: {
        id: string;
        key: string;
        channel: "RECOMMENDATION" | "MERCHANDISING";
        name: {
            en: string;
            ar: string;
        };
        priority: number;
        enabled: boolean;
        score: number;
        anchor: {
            keys: string[];
            ids: string[];
            kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
        };
        candidate: {
            keys: string[];
            ids: string[];
            kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
        };
    }[];
    introduction: {
        en: string;
        ar: string;
    };
    unavailableMessage: {
        en: string;
        ar: string;
    };
    anchorExplanation: {
        en: string;
        ar: string;
    };
}, {
    title?: {
        en: string;
        ar: string;
    } | undefined;
    enabled?: boolean | undefined;
    enabledDomains?: string[] | undefined;
    eligibleAnchorRoles?: string[] | undefined;
    defaultTemplateKeys?: Record<string, string> | undefined;
    allowUnavailableAnchorPlanning?: boolean | undefined;
    requireApprovedReason?: boolean | undefined;
    anchorBoostRules?: {
        id: string;
        key: string;
        name: {
            en: string;
            ar: string;
        };
        score: number;
        anchor: {
            kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
            keys?: string[] | undefined;
            ids?: string[] | undefined;
        };
        candidate: {
            kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
            keys?: string[] | undefined;
            ids?: string[] | undefined;
        };
        channel?: "RECOMMENDATION" | "MERCHANDISING" | undefined;
        priority?: number | undefined;
        enabled?: boolean | undefined;
    }[] | undefined;
    introduction?: {
        en: string;
        ar: string;
    } | undefined;
    unavailableMessage?: {
        en: string;
        ar: string;
    } | undefined;
    anchorExplanation?: {
        en: string;
        ar: string;
    } | undefined;
}>;
export declare const routineBuilderConfigSchema: z.ZodEffects<z.ZodObject<{
    schemaVersion: z.ZodUnion<[z.ZodLiteral<1>, z.ZodLiteral<2>]>;
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
        modes: z.ZodDefault<z.ZodArray<z.ZodEnum<["FULL", "CONTEXTUAL"]>, "many">>;
        contextualRequired: z.ZodDefault<z.ZodBoolean>;
        contextualOrder: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
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
        /** Optional managed signal receiving SCALE/NUMERIC_RANGE values directly. */
        directSignalKey: z.ZodOptional<z.ZodNullable<z.ZodString>>;
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
                weight: z.ZodOptional<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                value: string | number | boolean | string[];
                key: string;
                weight?: number | undefined;
            }, {
                value: string | number | boolean | string[];
                key: string;
                weight?: number | undefined;
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
                weight?: number | undefined;
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
                weight?: number | undefined;
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
        scale: {
            min: number;
            max: number;
            step: number;
        } | null;
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
        modes: ("FULL" | "CONTEXTUAL")[];
        contextualRequired: boolean;
        contextualOrder: number | null;
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
                weight?: number | undefined;
            }[];
        }[];
        minSelections: number;
        maxSelections: number;
        directSignalKey?: string | null | undefined;
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
        scale?: {
            min: number;
            max: number;
            step: number;
        } | null | undefined;
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
        modes?: ("FULL" | "CONTEXTUAL")[] | undefined;
        contextualRequired?: boolean | undefined;
        contextualOrder?: number | null | undefined;
        directSignalKey?: string | null | undefined;
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
                weight?: number | undefined;
            }[] | undefined;
        }[] | undefined;
        minSelections?: number | undefined;
        maxSelections?: number | undefined;
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
        scale: {
            min: number;
            max: number;
            step: number;
        } | null;
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
        modes: ("FULL" | "CONTEXTUAL")[];
        contextualRequired: boolean;
        contextualOrder: number | null;
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
                weight?: number | undefined;
            }[];
        }[];
        minSelections: number;
        maxSelections: number;
        directSignalKey?: string | null | undefined;
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
        scale?: {
            min: number;
            max: number;
            step: number;
        } | null | undefined;
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
        modes?: ("FULL" | "CONTEXTUAL")[] | undefined;
        contextualRequired?: boolean | undefined;
        contextualOrder?: number | null | undefined;
        directSignalKey?: string | null | undefined;
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
                weight?: number | undefined;
            }[] | undefined;
        }[] | undefined;
        minSelections?: number | undefined;
        maxSelections?: number | undefined;
    }>, "many">;
    signals: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        key: z.ZodString;
        family: z.ZodString;
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
        valueType: z.ZodDefault<z.ZodEnum<["NUMBER", "BOOLEAN", "KEYWORD", "KEYWORD_LIST"]>>;
        aggregation: z.ZodDefault<z.ZodEnum<["SUM", "MAX", "LAST"]>>;
        purpose: z.ZodDefault<z.ZodEnum<["PROFILE", "BUDGET_MAX", "OWNED_ROLE"]>>;
        enabled: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        key: string;
        description: {
            en: string;
            ar: string;
        };
        purpose: "PROFILE" | "BUDGET_MAX" | "OWNED_ROLE";
        label: {
            en: string;
            ar: string;
        };
        enabled: boolean;
        family: string;
        valueType: "NUMBER" | "BOOLEAN" | "KEYWORD" | "KEYWORD_LIST";
        aggregation: "SUM" | "MAX" | "LAST";
    }, {
        id: string;
        key: string;
        label: {
            en: string;
            ar: string;
        };
        family: string;
        description?: {
            en: string;
            ar: string;
        } | undefined;
        purpose?: "PROFILE" | "BUDGET_MAX" | "OWNED_ROLE" | undefined;
        enabled?: boolean | undefined;
        valueType?: "NUMBER" | "BOOLEAN" | "KEYWORD" | "KEYWORD_LIST" | undefined;
        aggregation?: "SUM" | "MAX" | "LAST" | undefined;
    }>, "many">>;
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
        domain: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        amAllowed: z.ZodDefault<z.ZodBoolean>;
        pmAllowed: z.ZodDefault<z.ZodBoolean>;
        defaultPriority: z.ZodDefault<z.ZodNumber>;
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
        domain: string | null;
        amAllowed: boolean;
        pmAllowed: boolean;
        defaultPriority: number;
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
        domain?: string | null | undefined;
        amAllowed?: boolean | undefined;
        pmAllowed?: boolean | undefined;
        defaultPriority?: number | undefined;
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
            channel: z.ZodOptional<z.ZodEnum<["RECOMMENDATION", "MERCHANDISING"]>>;
        }, "strip", z.ZodTypeAny, {
            type: "BOOST";
            target: {
                keys: string[];
                ids: string[];
                kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
            };
            score: number;
            channel?: "RECOMMENDATION" | "MERCHANDISING" | undefined;
        }, {
            type: "BOOST";
            target: {
                kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                keys?: string[] | undefined;
                ids?: string[] | undefined;
            };
            score: number;
            channel?: "RECOMMENDATION" | "MERCHANDISING" | undefined;
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
        priority: number;
        enabled: boolean;
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
            channel?: "RECOMMENDATION" | "MERCHANDISING" | undefined;
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
            channel?: "RECOMMENDATION" | "MERCHANDISING" | undefined;
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
        priority?: number | undefined;
        enabled?: boolean | undefined;
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
        priority: number;
        enabled: boolean;
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
        priority?: number | undefined;
        enabled?: boolean | undefined;
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
        internalName: z.ZodOptional<z.ZodString>;
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
        status: z.ZodDefault<z.ZodEnum<["DRAFT", "PUBLISHED", "SCHEDULED", "PAUSED", "ARCHIVED"]>>;
        version: z.ZodDefault<z.ZodNumber>;
        priority: z.ZodDefault<z.ZodNumber>;
        domain: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        familyKey: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        complexity: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        packKey: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        tags: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        baseTemplateKey: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        variant: z.ZodDefault<z.ZodObject<{
            kind: z.ZodDefault<z.ZodEnum<["BASE", "SKIN_TYPE", "CONCERN", "COMPLEXITY", "BUDGET", "SEASONAL", "LIFESTYLE", "ANCHOR_ROLE", "BRAND", "CATEGORY", "CUSTOM"]>>;
            parameters: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodString, "many">]>>>;
        }, "strip", z.ZodTypeAny, {
            kind: "CATEGORY" | "BRAND" | "CONCERN" | "CUSTOM" | "BASE" | "SKIN_TYPE" | "COMPLEXITY" | "BUDGET" | "SEASONAL" | "LIFESTYLE" | "ANCHOR_ROLE";
            parameters: Record<string, string | number | boolean | string[]>;
        }, {
            kind?: "CATEGORY" | "BRAND" | "CONCERN" | "CUSTOM" | "BASE" | "SKIN_TYPE" | "COMPLEXITY" | "BUDGET" | "SEASONAL" | "LIFESTYLE" | "ANCHOR_ROLE" | undefined;
            parameters?: Record<string, string | number | boolean | string[]> | undefined;
        }>>;
        hardEligibility: z.ZodDefault<z.ZodNullable<z.ZodObject<{
            mode: z.ZodEnum<["ALL", "ANY"]>;
            conditions: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                signalKey: z.ZodString;
                operator: z.ZodEnum<["EXISTS", "NOT_EXISTS", "EQUALS", "NOT_EQUALS", "CONTAINS", "GREATER_THAN_OR_EQUAL", "LESS_THAN_OR_EQUAL"]>;
                value: z.ZodDefault<z.ZodNullable<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodString, "many">]>>>;
            }, "strip", z.ZodTypeAny, {
                value: string | number | boolean | string[] | null;
                id: string;
                operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                signalKey: string;
            }, {
                id: string;
                operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                signalKey: string;
                value?: string | number | boolean | string[] | null | undefined;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            conditions: {
                value: string | number | boolean | string[] | null;
                id: string;
                operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                signalKey: string;
            }[];
            mode: "ALL" | "ANY";
        }, {
            conditions: {
                id: string;
                operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                signalKey: string;
                value?: string | number | boolean | string[] | null | undefined;
            }[];
            mode: "ALL" | "ANY";
        }>>>;
        selectionRules: z.ZodDefault<z.ZodArray<z.ZodObject<{
            id: z.ZodString;
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
            when: z.ZodObject<{
                mode: z.ZodEnum<["ALL", "ANY"]>;
                conditions: z.ZodArray<z.ZodObject<{
                    id: z.ZodString;
                    signalKey: z.ZodString;
                    operator: z.ZodEnum<["EXISTS", "NOT_EXISTS", "EQUALS", "NOT_EQUALS", "CONTAINS", "GREATER_THAN_OR_EQUAL", "LESS_THAN_OR_EQUAL"]>;
                    value: z.ZodDefault<z.ZodNullable<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodString, "many">]>>>;
                }, "strip", z.ZodTypeAny, {
                    value: string | number | boolean | string[] | null;
                    id: string;
                    operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                    signalKey: string;
                }, {
                    id: string;
                    operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                    signalKey: string;
                    value?: string | number | boolean | string[] | null | undefined;
                }>, "many">;
            }, "strip", z.ZodTypeAny, {
                conditions: {
                    value: string | number | boolean | string[] | null;
                    id: string;
                    operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                    signalKey: string;
                }[];
                mode: "ALL" | "ANY";
            }, {
                conditions: {
                    id: string;
                    operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                    signalKey: string;
                    value?: string | number | boolean | string[] | null | undefined;
                }[];
                mode: "ALL" | "ANY";
            }>;
            score: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            id: string;
            name: {
                en: string;
                ar: string;
            };
            score: number;
            when: {
                conditions: {
                    value: string | number | boolean | string[] | null;
                    id: string;
                    operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                    signalKey: string;
                }[];
                mode: "ALL" | "ANY";
            };
        }, {
            id: string;
            name: {
                en: string;
                ar: string;
            };
            score: number;
            when: {
                conditions: {
                    id: string;
                    operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                    signalKey: string;
                    value?: string | number | boolean | string[] | null | undefined;
                }[];
                mode: "ALL" | "ANY";
            };
        }>, "many">>;
        allowedAnchorRoles: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
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
            conditions: z.ZodDefault<z.ZodNullable<z.ZodObject<{
                mode: z.ZodEnum<["ALL", "ANY"]>;
                conditions: z.ZodArray<z.ZodObject<{
                    id: z.ZodString;
                    signalKey: z.ZodString;
                    operator: z.ZodEnum<["EXISTS", "NOT_EXISTS", "EQUALS", "NOT_EQUALS", "CONTAINS", "GREATER_THAN_OR_EQUAL", "LESS_THAN_OR_EQUAL"]>;
                    value: z.ZodDefault<z.ZodNullable<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodString, "many">]>>>;
                }, "strip", z.ZodTypeAny, {
                    value: string | number | boolean | string[] | null;
                    id: string;
                    operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                    signalKey: string;
                }, {
                    id: string;
                    operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                    signalKey: string;
                    value?: string | number | boolean | string[] | null | undefined;
                }>, "many">;
            }, "strip", z.ZodTypeAny, {
                conditions: {
                    value: string | number | boolean | string[] | null;
                    id: string;
                    operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                    signalKey: string;
                }[];
                mode: "ALL" | "ANY";
            }, {
                conditions: {
                    id: string;
                    operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                    signalKey: string;
                    value?: string | number | boolean | string[] | null | undefined;
                }[];
                mode: "ALL" | "ANY";
            }>>>;
            optionalPriority: z.ZodDefault<z.ZodNumber>;
            fallbackMode: z.ZodDefault<z.ZodEnum<["FAIL_TEMPLATE", "SKIP_OPTIONAL", "USE_FALLBACK_ROLE"]>>;
            fallbackRoleKeys: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            spendingWeight: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
        }, "strip", z.ZodTypeAny, {
            id: string;
            conditions: {
                conditions: {
                    value: string | number | boolean | string[] | null;
                    id: string;
                    operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                    signalKey: string;
                }[];
                mode: "ALL" | "ANY";
            } | null;
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
            optionalPriority: number;
            fallbackMode: "FAIL_TEMPLATE" | "SKIP_OPTIONAL" | "USE_FALLBACK_ROLE";
            fallbackRoleKeys: string[];
            spendingWeight: number | null;
        }, {
            id: string;
            order: number;
            roleKey: string;
            period: "AM" | "PM";
            conditions?: {
                conditions: {
                    id: string;
                    operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                    signalKey: string;
                    value?: string | number | boolean | string[] | null | undefined;
                }[];
                mode: "ALL" | "ANY";
            } | null | undefined;
            required?: boolean | undefined;
            target?: {
                kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                keys?: string[] | undefined;
                ids?: string[] | undefined;
            } | undefined;
            preferredProductIds?: string[] | undefined;
            maxAlternatives?: number | undefined;
            optionalPriority?: number | undefined;
            fallbackMode?: "FAIL_TEMPLATE" | "SKIP_OPTIONAL" | "USE_FALLBACK_ROLE" | undefined;
            fallbackRoleKeys?: string[] | undefined;
            spendingWeight?: number | null | undefined;
        }>, "many">;
        budgetPolicy: z.ZodDefault<z.ZodNullable<z.ZodObject<{
            mode: z.ZodDefault<z.ZodEnum<["IGNORE", "RESPECT_CUSTOMER", "HARD", "SOFT"]>>;
            maximum: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
        }, "strip", z.ZodTypeAny, {
            maximum: number | null;
            mode: "IGNORE" | "RESPECT_CUSTOMER" | "HARD" | "SOFT";
        }, {
            maximum?: number | null | undefined;
            mode?: "IGNORE" | "RESPECT_CUSTOMER" | "HARD" | "SOFT" | undefined;
        }>>>;
        fallbackPolicy: z.ZodDefault<z.ZodNullable<z.ZodObject<{
            requiredStep: z.ZodDefault<z.ZodEnum<["FAIL_TEMPLATE", "USE_STEP_FALLBACK"]>>;
            optionalStep: z.ZodDefault<z.ZodLiteral<"SKIP">>;
            fallbackTemplateKey: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
            requiredStep: "FAIL_TEMPLATE" | "USE_STEP_FALLBACK";
            optionalStep: "SKIP";
            fallbackTemplateKey: string | null;
        }, {
            requiredStep?: "FAIL_TEMPLATE" | "USE_STEP_FALLBACK" | undefined;
            optionalStep?: "SKIP" | undefined;
            fallbackTemplateKey?: string | null | undefined;
        }>>>;
        compatibilityPolicy: z.ZodDefault<z.ZodEnum<["STRICT", "STANDARD"]>>;
        brandConstraint: z.ZodDefault<z.ZodObject<{
            mode: z.ZodDefault<z.ZodEnum<["NONE", "PREFERRED", "ONLY"]>>;
            entityId: z.ZodDefault<z.ZodNullable<z.ZodString>>;
            parameterized: z.ZodDefault<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            mode: "NONE" | "PREFERRED" | "ONLY";
            entityId: string | null;
            parameterized: boolean;
        }, {
            mode?: "NONE" | "PREFERRED" | "ONLY" | undefined;
            entityId?: string | null | undefined;
            parameterized?: boolean | undefined;
        }>>;
        categoryConstraint: z.ZodDefault<z.ZodObject<{
            mode: z.ZodDefault<z.ZodEnum<["NONE", "PREFERRED", "ONLY"]>>;
            entityId: z.ZodDefault<z.ZodNullable<z.ZodString>>;
            parameterized: z.ZodDefault<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            mode: "NONE" | "PREFERRED" | "ONLY";
            entityId: string | null;
            parameterized: boolean;
        }, {
            mode?: "NONE" | "PREFERRED" | "ONLY" | undefined;
            entityId?: string | null | undefined;
            parameterized?: boolean | undefined;
        }>>;
        presentation: z.ZodDefault<z.ZodObject<{
            style: z.ZodDefault<z.ZodEnum<["MINIMAL", "EDITORIAL", "STEP_BY_STEP", "COMPACT", "DETAILED"]>>;
            estimatedMinutes: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
            thumbnailKey: z.ZodDefault<z.ZodNullable<z.ZodString>>;
            themeKey: z.ZodDefault<z.ZodNullable<z.ZodString>>;
            intro: z.ZodDefault<z.ZodObject<{
                en: z.ZodString;
                ar: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                en: string;
                ar: string;
            }, {
                en: string;
                ar: string;
            }>>;
            outro: z.ZodDefault<z.ZodObject<{
                en: z.ZodString;
                ar: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                en: string;
                ar: string;
            }, {
                en: string;
                ar: string;
            }>>;
            customerVisible: z.ZodDefault<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            style: "COMPACT" | "MINIMAL" | "EDITORIAL" | "STEP_BY_STEP" | "DETAILED";
            estimatedMinutes: number | null;
            thumbnailKey: string | null;
            themeKey: string | null;
            intro: {
                en: string;
                ar: string;
            };
            outro: {
                en: string;
                ar: string;
            };
            customerVisible: boolean;
        }, {
            style?: "COMPACT" | "MINIMAL" | "EDITORIAL" | "STEP_BY_STEP" | "DETAILED" | undefined;
            estimatedMinutes?: number | null | undefined;
            thumbnailKey?: string | null | undefined;
            themeKey?: string | null | undefined;
            intro?: {
                en: string;
                ar: string;
            } | undefined;
            outro?: {
                en: string;
                ar: string;
            } | undefined;
            customerVisible?: boolean | undefined;
        }>>;
        schedule: z.ZodDefault<z.ZodObject<{
            startsAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
            endsAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
            startsAt: string | null;
            endsAt: string | null;
        }, {
            startsAt?: string | null | undefined;
            endsAt?: string | null | undefined;
        }>>;
        pinned: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        status: "ARCHIVED" | "DRAFT" | "PAUSED" | "SCHEDULED" | "PUBLISHED";
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
        enabled: boolean;
        tags: string[];
        version: number;
        presentation: {
            style: "COMPACT" | "MINIMAL" | "EDITORIAL" | "STEP_BY_STEP" | "DETAILED";
            estimatedMinutes: number | null;
            thumbnailKey: string | null;
            themeKey: string | null;
            intro: {
                en: string;
                ar: string;
            };
            outro: {
                en: string;
                ar: string;
            };
            customerVisible: boolean;
        };
        domain: string | null;
        steps: {
            id: string;
            conditions: {
                conditions: {
                    value: string | number | boolean | string[] | null;
                    id: string;
                    operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                    signalKey: string;
                }[];
                mode: "ALL" | "ANY";
            } | null;
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
            optionalPriority: number;
            fallbackMode: "FAIL_TEMPLATE" | "SKIP_OPTIONAL" | "USE_FALLBACK_ROLE";
            fallbackRoleKeys: string[];
            spendingWeight: number | null;
        }[];
        familyKey: string | null;
        complexity: string | null;
        packKey: string | null;
        baseTemplateKey: string | null;
        variant: {
            kind: "CATEGORY" | "BRAND" | "CONCERN" | "CUSTOM" | "BASE" | "SKIN_TYPE" | "COMPLEXITY" | "BUDGET" | "SEASONAL" | "LIFESTYLE" | "ANCHOR_ROLE";
            parameters: Record<string, string | number | boolean | string[]>;
        };
        hardEligibility: {
            conditions: {
                value: string | number | boolean | string[] | null;
                id: string;
                operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                signalKey: string;
            }[];
            mode: "ALL" | "ANY";
        } | null;
        selectionRules: {
            id: string;
            name: {
                en: string;
                ar: string;
            };
            score: number;
            when: {
                conditions: {
                    value: string | number | boolean | string[] | null;
                    id: string;
                    operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                    signalKey: string;
                }[];
                mode: "ALL" | "ANY";
            };
        }[];
        allowedAnchorRoles: string[];
        budgetPolicy: {
            maximum: number | null;
            mode: "IGNORE" | "RESPECT_CUSTOMER" | "HARD" | "SOFT";
        } | null;
        fallbackPolicy: {
            requiredStep: "FAIL_TEMPLATE" | "USE_STEP_FALLBACK";
            optionalStep: "SKIP";
            fallbackTemplateKey: string | null;
        } | null;
        compatibilityPolicy: "STANDARD" | "STRICT";
        brandConstraint: {
            mode: "NONE" | "PREFERRED" | "ONLY";
            entityId: string | null;
            parameterized: boolean;
        };
        categoryConstraint: {
            mode: "NONE" | "PREFERRED" | "ONLY";
            entityId: string | null;
            parameterized: boolean;
        };
        schedule: {
            startsAt: string | null;
            endsAt: string | null;
        };
        pinned: boolean;
        internalName?: string | undefined;
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
            conditions?: {
                conditions: {
                    id: string;
                    operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                    signalKey: string;
                    value?: string | number | boolean | string[] | null | undefined;
                }[];
                mode: "ALL" | "ANY";
            } | null | undefined;
            required?: boolean | undefined;
            target?: {
                kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                keys?: string[] | undefined;
                ids?: string[] | undefined;
            } | undefined;
            preferredProductIds?: string[] | undefined;
            maxAlternatives?: number | undefined;
            optionalPriority?: number | undefined;
            fallbackMode?: "FAIL_TEMPLATE" | "SKIP_OPTIONAL" | "USE_FALLBACK_ROLE" | undefined;
            fallbackRoleKeys?: string[] | undefined;
            spendingWeight?: number | null | undefined;
        }[];
        status?: "ARCHIVED" | "DRAFT" | "PAUSED" | "SCHEDULED" | "PUBLISHED" | undefined;
        description?: {
            en: string;
            ar: string;
        } | undefined;
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
        enabled?: boolean | undefined;
        tags?: string[] | undefined;
        version?: number | undefined;
        presentation?: {
            style?: "COMPACT" | "MINIMAL" | "EDITORIAL" | "STEP_BY_STEP" | "DETAILED" | undefined;
            estimatedMinutes?: number | null | undefined;
            thumbnailKey?: string | null | undefined;
            themeKey?: string | null | undefined;
            intro?: {
                en: string;
                ar: string;
            } | undefined;
            outro?: {
                en: string;
                ar: string;
            } | undefined;
            customerVisible?: boolean | undefined;
        } | undefined;
        domain?: string | null | undefined;
        internalName?: string | undefined;
        familyKey?: string | null | undefined;
        complexity?: string | null | undefined;
        packKey?: string | null | undefined;
        baseTemplateKey?: string | null | undefined;
        variant?: {
            kind?: "CATEGORY" | "BRAND" | "CONCERN" | "CUSTOM" | "BASE" | "SKIN_TYPE" | "COMPLEXITY" | "BUDGET" | "SEASONAL" | "LIFESTYLE" | "ANCHOR_ROLE" | undefined;
            parameters?: Record<string, string | number | boolean | string[]> | undefined;
        } | undefined;
        hardEligibility?: {
            conditions: {
                id: string;
                operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                signalKey: string;
                value?: string | number | boolean | string[] | null | undefined;
            }[];
            mode: "ALL" | "ANY";
        } | null | undefined;
        selectionRules?: {
            id: string;
            name: {
                en: string;
                ar: string;
            };
            score: number;
            when: {
                conditions: {
                    id: string;
                    operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                    signalKey: string;
                    value?: string | number | boolean | string[] | null | undefined;
                }[];
                mode: "ALL" | "ANY";
            };
        }[] | undefined;
        allowedAnchorRoles?: string[] | undefined;
        budgetPolicy?: {
            maximum?: number | null | undefined;
            mode?: "IGNORE" | "RESPECT_CUSTOMER" | "HARD" | "SOFT" | undefined;
        } | null | undefined;
        fallbackPolicy?: {
            requiredStep?: "FAIL_TEMPLATE" | "USE_STEP_FALLBACK" | undefined;
            optionalStep?: "SKIP" | undefined;
            fallbackTemplateKey?: string | null | undefined;
        } | null | undefined;
        compatibilityPolicy?: "STANDARD" | "STRICT" | undefined;
        brandConstraint?: {
            mode?: "NONE" | "PREFERRED" | "ONLY" | undefined;
            entityId?: string | null | undefined;
            parameterized?: boolean | undefined;
        } | undefined;
        categoryConstraint?: {
            mode?: "NONE" | "PREFERRED" | "ONLY" | undefined;
            entityId?: string | null | undefined;
            parameterized?: boolean | undefined;
        } | undefined;
        schedule?: {
            startsAt?: string | null | undefined;
            endsAt?: string | null | undefined;
        } | undefined;
        pinned?: boolean | undefined;
    }>, "many">;
    templateUniverse: z.ZodDefault<z.ZodObject<{
        families: z.ZodDefault<z.ZodArray<z.ZodObject<{
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
            order: z.ZodDefault<z.ZodNumber>;
            enabled: z.ZodDefault<z.ZodBoolean>;
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
            order: number;
            enabled: boolean;
        }, {
            id: string;
            key: string;
            name: {
                en: string;
                ar: string;
            };
            description?: {
                en: string;
                ar: string;
            } | undefined;
            order?: number | undefined;
            enabled?: boolean | undefined;
        }>, "many">>;
        packs: z.ZodDefault<z.ZodArray<z.ZodObject<{
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
            version: z.ZodDefault<z.ZodNumber>;
            source: z.ZodDefault<z.ZodEnum<["BIOREZA", "ADMIN", "IMPORTED"]>>;
            createdAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
            id: string;
            key: string;
            description: {
                en: string;
                ar: string;
            };
            createdAt: string | null;
            name: {
                en: string;
                ar: string;
            };
            source: "ADMIN" | "BIOREZA" | "IMPORTED";
            version: number;
        }, {
            id: string;
            key: string;
            name: {
                en: string;
                ar: string;
            };
            description?: {
                en: string;
                ar: string;
            } | undefined;
            createdAt?: string | null | undefined;
            source?: "ADMIN" | "BIOREZA" | "IMPORTED" | undefined;
            version?: number | undefined;
        }>, "many">>;
        tags: z.ZodDefault<z.ZodArray<z.ZodObject<{
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
            enabled: z.ZodDefault<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            id: string;
            key: string;
            label: {
                en: string;
                ar: string;
            };
            enabled: boolean;
        }, {
            id: string;
            key: string;
            label: {
                en: string;
                ar: string;
            };
            enabled?: boolean | undefined;
        }>, "many">>;
        stepPresets: z.ZodDefault<z.ZodArray<z.ZodObject<{
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
            domain: z.ZodString;
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
                conditions: z.ZodDefault<z.ZodNullable<z.ZodObject<{
                    mode: z.ZodEnum<["ALL", "ANY"]>;
                    conditions: z.ZodArray<z.ZodObject<{
                        id: z.ZodString;
                        signalKey: z.ZodString;
                        operator: z.ZodEnum<["EXISTS", "NOT_EXISTS", "EQUALS", "NOT_EQUALS", "CONTAINS", "GREATER_THAN_OR_EQUAL", "LESS_THAN_OR_EQUAL"]>;
                        value: z.ZodDefault<z.ZodNullable<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodString, "many">]>>>;
                    }, "strip", z.ZodTypeAny, {
                        value: string | number | boolean | string[] | null;
                        id: string;
                        operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                        signalKey: string;
                    }, {
                        id: string;
                        operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                        signalKey: string;
                        value?: string | number | boolean | string[] | null | undefined;
                    }>, "many">;
                }, "strip", z.ZodTypeAny, {
                    conditions: {
                        value: string | number | boolean | string[] | null;
                        id: string;
                        operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                        signalKey: string;
                    }[];
                    mode: "ALL" | "ANY";
                }, {
                    conditions: {
                        id: string;
                        operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                        signalKey: string;
                        value?: string | number | boolean | string[] | null | undefined;
                    }[];
                    mode: "ALL" | "ANY";
                }>>>;
                optionalPriority: z.ZodDefault<z.ZodNumber>;
                fallbackMode: z.ZodDefault<z.ZodEnum<["FAIL_TEMPLATE", "SKIP_OPTIONAL", "USE_FALLBACK_ROLE"]>>;
                fallbackRoleKeys: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                spendingWeight: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
            }, "strip", z.ZodTypeAny, {
                id: string;
                conditions: {
                    conditions: {
                        value: string | number | boolean | string[] | null;
                        id: string;
                        operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                        signalKey: string;
                    }[];
                    mode: "ALL" | "ANY";
                } | null;
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
                optionalPriority: number;
                fallbackMode: "FAIL_TEMPLATE" | "SKIP_OPTIONAL" | "USE_FALLBACK_ROLE";
                fallbackRoleKeys: string[];
                spendingWeight: number | null;
            }, {
                id: string;
                order: number;
                roleKey: string;
                period: "AM" | "PM";
                conditions?: {
                    conditions: {
                        id: string;
                        operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                        signalKey: string;
                        value?: string | number | boolean | string[] | null | undefined;
                    }[];
                    mode: "ALL" | "ANY";
                } | null | undefined;
                required?: boolean | undefined;
                target?: {
                    kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                    keys?: string[] | undefined;
                    ids?: string[] | undefined;
                } | undefined;
                preferredProductIds?: string[] | undefined;
                maxAlternatives?: number | undefined;
                optionalPriority?: number | undefined;
                fallbackMode?: "FAIL_TEMPLATE" | "SKIP_OPTIONAL" | "USE_FALLBACK_ROLE" | undefined;
                fallbackRoleKeys?: string[] | undefined;
                spendingWeight?: number | null | undefined;
            }>, "many">;
            enabled: z.ZodDefault<z.ZodBoolean>;
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
            domain: string;
            steps: {
                id: string;
                conditions: {
                    conditions: {
                        value: string | number | boolean | string[] | null;
                        id: string;
                        operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                        signalKey: string;
                    }[];
                    mode: "ALL" | "ANY";
                } | null;
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
                optionalPriority: number;
                fallbackMode: "FAIL_TEMPLATE" | "SKIP_OPTIONAL" | "USE_FALLBACK_ROLE";
                fallbackRoleKeys: string[];
                spendingWeight: number | null;
            }[];
        }, {
            id: string;
            key: string;
            name: {
                en: string;
                ar: string;
            };
            domain: string;
            steps: {
                id: string;
                order: number;
                roleKey: string;
                period: "AM" | "PM";
                conditions?: {
                    conditions: {
                        id: string;
                        operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                        signalKey: string;
                        value?: string | number | boolean | string[] | null | undefined;
                    }[];
                    mode: "ALL" | "ANY";
                } | null | undefined;
                required?: boolean | undefined;
                target?: {
                    kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                    keys?: string[] | undefined;
                    ids?: string[] | undefined;
                } | undefined;
                preferredProductIds?: string[] | undefined;
                maxAlternatives?: number | undefined;
                optionalPriority?: number | undefined;
                fallbackMode?: "FAIL_TEMPLATE" | "SKIP_OPTIONAL" | "USE_FALLBACK_ROLE" | undefined;
                fallbackRoleKeys?: string[] | undefined;
                spendingWeight?: number | null | undefined;
            }[];
            description?: {
                en: string;
                ar: string;
            } | undefined;
            enabled?: boolean | undefined;
        }>, "many">>;
        fallbackTemplateKey: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        customerChoiceEnabled: z.ZodDefault<z.ZodBoolean>;
        customerChoiceFamilies: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        tags: {
            id: string;
            key: string;
            label: {
                en: string;
                ar: string;
            };
            enabled: boolean;
        }[];
        fallbackTemplateKey: string | null;
        families: {
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
            order: number;
            enabled: boolean;
        }[];
        packs: {
            id: string;
            key: string;
            description: {
                en: string;
                ar: string;
            };
            createdAt: string | null;
            name: {
                en: string;
                ar: string;
            };
            source: "ADMIN" | "BIOREZA" | "IMPORTED";
            version: number;
        }[];
        stepPresets: {
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
            domain: string;
            steps: {
                id: string;
                conditions: {
                    conditions: {
                        value: string | number | boolean | string[] | null;
                        id: string;
                        operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                        signalKey: string;
                    }[];
                    mode: "ALL" | "ANY";
                } | null;
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
                optionalPriority: number;
                fallbackMode: "FAIL_TEMPLATE" | "SKIP_OPTIONAL" | "USE_FALLBACK_ROLE";
                fallbackRoleKeys: string[];
                spendingWeight: number | null;
            }[];
        }[];
        customerChoiceEnabled: boolean;
        customerChoiceFamilies: string[];
    }, {
        tags?: {
            id: string;
            key: string;
            label: {
                en: string;
                ar: string;
            };
            enabled?: boolean | undefined;
        }[] | undefined;
        fallbackTemplateKey?: string | null | undefined;
        families?: {
            id: string;
            key: string;
            name: {
                en: string;
                ar: string;
            };
            description?: {
                en: string;
                ar: string;
            } | undefined;
            order?: number | undefined;
            enabled?: boolean | undefined;
        }[] | undefined;
        packs?: {
            id: string;
            key: string;
            name: {
                en: string;
                ar: string;
            };
            description?: {
                en: string;
                ar: string;
            } | undefined;
            createdAt?: string | null | undefined;
            source?: "ADMIN" | "BIOREZA" | "IMPORTED" | undefined;
            version?: number | undefined;
        }[] | undefined;
        stepPresets?: {
            id: string;
            key: string;
            name: {
                en: string;
                ar: string;
            };
            domain: string;
            steps: {
                id: string;
                order: number;
                roleKey: string;
                period: "AM" | "PM";
                conditions?: {
                    conditions: {
                        id: string;
                        operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                        signalKey: string;
                        value?: string | number | boolean | string[] | null | undefined;
                    }[];
                    mode: "ALL" | "ANY";
                } | null | undefined;
                required?: boolean | undefined;
                target?: {
                    kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                    keys?: string[] | undefined;
                    ids?: string[] | undefined;
                } | undefined;
                preferredProductIds?: string[] | undefined;
                maxAlternatives?: number | undefined;
                optionalPriority?: number | undefined;
                fallbackMode?: "FAIL_TEMPLATE" | "SKIP_OPTIONAL" | "USE_FALLBACK_ROLE" | undefined;
                fallbackRoleKeys?: string[] | undefined;
                spendingWeight?: number | null | undefined;
            }[];
            description?: {
                en: string;
                ar: string;
            } | undefined;
            enabled?: boolean | undefined;
        }[] | undefined;
        customerChoiceEnabled?: boolean | undefined;
        customerChoiceFamilies?: string[] | undefined;
    }>>;
    contextualCompletion: z.ZodDefault<z.ZodObject<{
        enabled: z.ZodDefault<z.ZodBoolean>;
        enabledDomains: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        eligibleAnchorRoles: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        defaultTemplateKeys: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodString>>;
        allowUnavailableAnchorPlanning: z.ZodDefault<z.ZodBoolean>;
        requireApprovedReason: z.ZodDefault<z.ZodBoolean>;
        anchorBoostRules: z.ZodDefault<z.ZodArray<z.ZodObject<{
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
            anchor: z.ZodObject<{
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
            candidate: z.ZodObject<{
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
            channel: z.ZodDefault<z.ZodEnum<["RECOMMENDATION", "MERCHANDISING"]>>;
        }, "strip", z.ZodTypeAny, {
            id: string;
            key: string;
            channel: "RECOMMENDATION" | "MERCHANDISING";
            name: {
                en: string;
                ar: string;
            };
            priority: number;
            enabled: boolean;
            score: number;
            anchor: {
                keys: string[];
                ids: string[];
                kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
            };
            candidate: {
                keys: string[];
                ids: string[];
                kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
            };
        }, {
            id: string;
            key: string;
            name: {
                en: string;
                ar: string;
            };
            score: number;
            anchor: {
                kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                keys?: string[] | undefined;
                ids?: string[] | undefined;
            };
            candidate: {
                kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                keys?: string[] | undefined;
                ids?: string[] | undefined;
            };
            channel?: "RECOMMENDATION" | "MERCHANDISING" | undefined;
            priority?: number | undefined;
            enabled?: boolean | undefined;
        }>, "many">>;
        title: z.ZodDefault<z.ZodObject<{
            en: z.ZodString;
            ar: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            en: string;
            ar: string;
        }, {
            en: string;
            ar: string;
        }>>;
        introduction: z.ZodDefault<z.ZodObject<{
            en: z.ZodString;
            ar: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            en: string;
            ar: string;
        }, {
            en: string;
            ar: string;
        }>>;
        unavailableMessage: z.ZodDefault<z.ZodObject<{
            en: z.ZodString;
            ar: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            en: string;
            ar: string;
        }, {
            en: string;
            ar: string;
        }>>;
        anchorExplanation: z.ZodDefault<z.ZodObject<{
            en: z.ZodString;
            ar: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            en: string;
            ar: string;
        }, {
            en: string;
            ar: string;
        }>>;
    }, "strip", z.ZodTypeAny, {
        title: {
            en: string;
            ar: string;
        };
        enabled: boolean;
        enabledDomains: string[];
        eligibleAnchorRoles: string[];
        defaultTemplateKeys: Record<string, string>;
        allowUnavailableAnchorPlanning: boolean;
        requireApprovedReason: boolean;
        anchorBoostRules: {
            id: string;
            key: string;
            channel: "RECOMMENDATION" | "MERCHANDISING";
            name: {
                en: string;
                ar: string;
            };
            priority: number;
            enabled: boolean;
            score: number;
            anchor: {
                keys: string[];
                ids: string[];
                kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
            };
            candidate: {
                keys: string[];
                ids: string[];
                kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
            };
        }[];
        introduction: {
            en: string;
            ar: string;
        };
        unavailableMessage: {
            en: string;
            ar: string;
        };
        anchorExplanation: {
            en: string;
            ar: string;
        };
    }, {
        title?: {
            en: string;
            ar: string;
        } | undefined;
        enabled?: boolean | undefined;
        enabledDomains?: string[] | undefined;
        eligibleAnchorRoles?: string[] | undefined;
        defaultTemplateKeys?: Record<string, string> | undefined;
        allowUnavailableAnchorPlanning?: boolean | undefined;
        requireApprovedReason?: boolean | undefined;
        anchorBoostRules?: {
            id: string;
            key: string;
            name: {
                en: string;
                ar: string;
            };
            score: number;
            anchor: {
                kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                keys?: string[] | undefined;
                ids?: string[] | undefined;
            };
            candidate: {
                kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                keys?: string[] | undefined;
                ids?: string[] | undefined;
            };
            channel?: "RECOMMENDATION" | "MERCHANDISING" | undefined;
            priority?: number | undefined;
            enabled?: boolean | undefined;
        }[] | undefined;
        introduction?: {
            en: string;
            ar: string;
        } | undefined;
        unavailableMessage?: {
            en: string;
            ar: string;
        } | undefined;
        anchorExplanation?: {
            en: string;
            ar: string;
        } | undefined;
    }>>;
    settings: z.ZodObject<{
        maximumProductsPerBrand: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
        preferBrandDiversity: z.ZodDefault<z.ZodBoolean>;
        allowDuplicateProducts: z.ZodDefault<z.ZodBoolean>;
        budgetExceeded: z.ZodOptional<z.ZodObject<{
            en: z.ZodString;
            ar: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            en: string;
            ar: string;
        }, {
            en: string;
            ar: string;
        }>>;
    }, "strip", z.ZodTypeAny, {
        maximumProductsPerBrand: number | null;
        preferBrandDiversity: boolean;
        allowDuplicateProducts: boolean;
        budgetExceeded?: {
            en: string;
            ar: string;
        } | undefined;
    }, {
        maximumProductsPerBrand?: number | null | undefined;
        preferBrandDiversity?: boolean | undefined;
        allowDuplicateProducts?: boolean | undefined;
        budgetExceeded?: {
            en: string;
            ar: string;
        } | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    title: {
        en: string;
        ar: string;
    };
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
    schemaVersion: 1 | 2;
    estimatedMinutes: number;
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
        scale: {
            min: number;
            max: number;
            step: number;
        } | null;
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
        modes: ("FULL" | "CONTEXTUAL")[];
        contextualRequired: boolean;
        contextualOrder: number | null;
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
                weight?: number | undefined;
            }[];
        }[];
        minSelections: number;
        maxSelections: number;
        directSignalKey?: string | null | undefined;
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
        domain: string | null;
        amAllowed: boolean;
        pmAllowed: boolean;
        defaultPriority: number;
    }[];
    rules: {
        id: string;
        key: string;
        name: {
            en: string;
            ar: string;
        };
        priority: number;
        enabled: boolean;
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
            channel?: "RECOMMENDATION" | "MERCHANDISING" | undefined;
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
        priority: number;
        enabled: boolean;
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
        status: "ARCHIVED" | "DRAFT" | "PAUSED" | "SCHEDULED" | "PUBLISHED";
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
        enabled: boolean;
        tags: string[];
        version: number;
        presentation: {
            style: "COMPACT" | "MINIMAL" | "EDITORIAL" | "STEP_BY_STEP" | "DETAILED";
            estimatedMinutes: number | null;
            thumbnailKey: string | null;
            themeKey: string | null;
            intro: {
                en: string;
                ar: string;
            };
            outro: {
                en: string;
                ar: string;
            };
            customerVisible: boolean;
        };
        domain: string | null;
        steps: {
            id: string;
            conditions: {
                conditions: {
                    value: string | number | boolean | string[] | null;
                    id: string;
                    operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                    signalKey: string;
                }[];
                mode: "ALL" | "ANY";
            } | null;
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
            optionalPriority: number;
            fallbackMode: "FAIL_TEMPLATE" | "SKIP_OPTIONAL" | "USE_FALLBACK_ROLE";
            fallbackRoleKeys: string[];
            spendingWeight: number | null;
        }[];
        familyKey: string | null;
        complexity: string | null;
        packKey: string | null;
        baseTemplateKey: string | null;
        variant: {
            kind: "CATEGORY" | "BRAND" | "CONCERN" | "CUSTOM" | "BASE" | "SKIN_TYPE" | "COMPLEXITY" | "BUDGET" | "SEASONAL" | "LIFESTYLE" | "ANCHOR_ROLE";
            parameters: Record<string, string | number | boolean | string[]>;
        };
        hardEligibility: {
            conditions: {
                value: string | number | boolean | string[] | null;
                id: string;
                operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                signalKey: string;
            }[];
            mode: "ALL" | "ANY";
        } | null;
        selectionRules: {
            id: string;
            name: {
                en: string;
                ar: string;
            };
            score: number;
            when: {
                conditions: {
                    value: string | number | boolean | string[] | null;
                    id: string;
                    operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                    signalKey: string;
                }[];
                mode: "ALL" | "ANY";
            };
        }[];
        allowedAnchorRoles: string[];
        budgetPolicy: {
            maximum: number | null;
            mode: "IGNORE" | "RESPECT_CUSTOMER" | "HARD" | "SOFT";
        } | null;
        fallbackPolicy: {
            requiredStep: "FAIL_TEMPLATE" | "USE_STEP_FALLBACK";
            optionalStep: "SKIP";
            fallbackTemplateKey: string | null;
        } | null;
        compatibilityPolicy: "STANDARD" | "STRICT";
        brandConstraint: {
            mode: "NONE" | "PREFERRED" | "ONLY";
            entityId: string | null;
            parameterized: boolean;
        };
        categoryConstraint: {
            mode: "NONE" | "PREFERRED" | "ONLY";
            entityId: string | null;
            parameterized: boolean;
        };
        schedule: {
            startsAt: string | null;
            endsAt: string | null;
        };
        pinned: boolean;
        internalName?: string | undefined;
    }[];
    templateUniverse: {
        tags: {
            id: string;
            key: string;
            label: {
                en: string;
                ar: string;
            };
            enabled: boolean;
        }[];
        fallbackTemplateKey: string | null;
        families: {
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
            order: number;
            enabled: boolean;
        }[];
        packs: {
            id: string;
            key: string;
            description: {
                en: string;
                ar: string;
            };
            createdAt: string | null;
            name: {
                en: string;
                ar: string;
            };
            source: "ADMIN" | "BIOREZA" | "IMPORTED";
            version: number;
        }[];
        stepPresets: {
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
            domain: string;
            steps: {
                id: string;
                conditions: {
                    conditions: {
                        value: string | number | boolean | string[] | null;
                        id: string;
                        operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                        signalKey: string;
                    }[];
                    mode: "ALL" | "ANY";
                } | null;
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
                optionalPriority: number;
                fallbackMode: "FAIL_TEMPLATE" | "SKIP_OPTIONAL" | "USE_FALLBACK_ROLE";
                fallbackRoleKeys: string[];
                spendingWeight: number | null;
            }[];
        }[];
        customerChoiceEnabled: boolean;
        customerChoiceFamilies: string[];
    };
    contextualCompletion: {
        title: {
            en: string;
            ar: string;
        };
        enabled: boolean;
        enabledDomains: string[];
        eligibleAnchorRoles: string[];
        defaultTemplateKeys: Record<string, string>;
        allowUnavailableAnchorPlanning: boolean;
        requireApprovedReason: boolean;
        anchorBoostRules: {
            id: string;
            key: string;
            channel: "RECOMMENDATION" | "MERCHANDISING";
            name: {
                en: string;
                ar: string;
            };
            priority: number;
            enabled: boolean;
            score: number;
            anchor: {
                keys: string[];
                ids: string[];
                kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
            };
            candidate: {
                keys: string[];
                ids: string[];
                kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
            };
        }[];
        introduction: {
            en: string;
            ar: string;
        };
        unavailableMessage: {
            en: string;
            ar: string;
        };
        anchorExplanation: {
            en: string;
            ar: string;
        };
    };
    settings: {
        maximumProductsPerBrand: number | null;
        preferBrandDiversity: boolean;
        allowDuplicateProducts: boolean;
        budgetExceeded?: {
            en: string;
            ar: string;
        } | undefined;
    };
    signals?: {
        id: string;
        key: string;
        description: {
            en: string;
            ar: string;
        };
        purpose: "PROFILE" | "BUDGET_MAX" | "OWNED_ROLE";
        label: {
            en: string;
            ar: string;
        };
        enabled: boolean;
        family: string;
        valueType: "NUMBER" | "BOOLEAN" | "KEYWORD" | "KEYWORD_LIST";
        aggregation: "SUM" | "MAX" | "LAST";
    }[] | undefined;
}, {
    title: {
        en: string;
        ar: string;
    };
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
    schemaVersion: 1 | 2;
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
        scale?: {
            min: number;
            max: number;
            step: number;
        } | null | undefined;
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
        modes?: ("FULL" | "CONTEXTUAL")[] | undefined;
        contextualRequired?: boolean | undefined;
        contextualOrder?: number | null | undefined;
        directSignalKey?: string | null | undefined;
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
                weight?: number | undefined;
            }[] | undefined;
        }[] | undefined;
        minSelections?: number | undefined;
        maxSelections?: number | undefined;
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
        domain?: string | null | undefined;
        amAllowed?: boolean | undefined;
        pmAllowed?: boolean | undefined;
        defaultPriority?: number | undefined;
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
            channel?: "RECOMMENDATION" | "MERCHANDISING" | undefined;
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
        priority?: number | undefined;
        enabled?: boolean | undefined;
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
        priority?: number | undefined;
        enabled?: boolean | undefined;
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
            conditions?: {
                conditions: {
                    id: string;
                    operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                    signalKey: string;
                    value?: string | number | boolean | string[] | null | undefined;
                }[];
                mode: "ALL" | "ANY";
            } | null | undefined;
            required?: boolean | undefined;
            target?: {
                kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                keys?: string[] | undefined;
                ids?: string[] | undefined;
            } | undefined;
            preferredProductIds?: string[] | undefined;
            maxAlternatives?: number | undefined;
            optionalPriority?: number | undefined;
            fallbackMode?: "FAIL_TEMPLATE" | "SKIP_OPTIONAL" | "USE_FALLBACK_ROLE" | undefined;
            fallbackRoleKeys?: string[] | undefined;
            spendingWeight?: number | null | undefined;
        }[];
        status?: "ARCHIVED" | "DRAFT" | "PAUSED" | "SCHEDULED" | "PUBLISHED" | undefined;
        description?: {
            en: string;
            ar: string;
        } | undefined;
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
        enabled?: boolean | undefined;
        tags?: string[] | undefined;
        version?: number | undefined;
        presentation?: {
            style?: "COMPACT" | "MINIMAL" | "EDITORIAL" | "STEP_BY_STEP" | "DETAILED" | undefined;
            estimatedMinutes?: number | null | undefined;
            thumbnailKey?: string | null | undefined;
            themeKey?: string | null | undefined;
            intro?: {
                en: string;
                ar: string;
            } | undefined;
            outro?: {
                en: string;
                ar: string;
            } | undefined;
            customerVisible?: boolean | undefined;
        } | undefined;
        domain?: string | null | undefined;
        internalName?: string | undefined;
        familyKey?: string | null | undefined;
        complexity?: string | null | undefined;
        packKey?: string | null | undefined;
        baseTemplateKey?: string | null | undefined;
        variant?: {
            kind?: "CATEGORY" | "BRAND" | "CONCERN" | "CUSTOM" | "BASE" | "SKIN_TYPE" | "COMPLEXITY" | "BUDGET" | "SEASONAL" | "LIFESTYLE" | "ANCHOR_ROLE" | undefined;
            parameters?: Record<string, string | number | boolean | string[]> | undefined;
        } | undefined;
        hardEligibility?: {
            conditions: {
                id: string;
                operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                signalKey: string;
                value?: string | number | boolean | string[] | null | undefined;
            }[];
            mode: "ALL" | "ANY";
        } | null | undefined;
        selectionRules?: {
            id: string;
            name: {
                en: string;
                ar: string;
            };
            score: number;
            when: {
                conditions: {
                    id: string;
                    operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                    signalKey: string;
                    value?: string | number | boolean | string[] | null | undefined;
                }[];
                mode: "ALL" | "ANY";
            };
        }[] | undefined;
        allowedAnchorRoles?: string[] | undefined;
        budgetPolicy?: {
            maximum?: number | null | undefined;
            mode?: "IGNORE" | "RESPECT_CUSTOMER" | "HARD" | "SOFT" | undefined;
        } | null | undefined;
        fallbackPolicy?: {
            requiredStep?: "FAIL_TEMPLATE" | "USE_STEP_FALLBACK" | undefined;
            optionalStep?: "SKIP" | undefined;
            fallbackTemplateKey?: string | null | undefined;
        } | null | undefined;
        compatibilityPolicy?: "STANDARD" | "STRICT" | undefined;
        brandConstraint?: {
            mode?: "NONE" | "PREFERRED" | "ONLY" | undefined;
            entityId?: string | null | undefined;
            parameterized?: boolean | undefined;
        } | undefined;
        categoryConstraint?: {
            mode?: "NONE" | "PREFERRED" | "ONLY" | undefined;
            entityId?: string | null | undefined;
            parameterized?: boolean | undefined;
        } | undefined;
        schedule?: {
            startsAt?: string | null | undefined;
            endsAt?: string | null | undefined;
        } | undefined;
        pinned?: boolean | undefined;
    }[];
    settings: {
        maximumProductsPerBrand?: number | null | undefined;
        preferBrandDiversity?: boolean | undefined;
        allowDuplicateProducts?: boolean | undefined;
        budgetExceeded?: {
            en: string;
            ar: string;
        } | undefined;
    };
    signals?: {
        id: string;
        key: string;
        label: {
            en: string;
            ar: string;
        };
        family: string;
        description?: {
            en: string;
            ar: string;
        } | undefined;
        purpose?: "PROFILE" | "BUDGET_MAX" | "OWNED_ROLE" | undefined;
        enabled?: boolean | undefined;
        valueType?: "NUMBER" | "BOOLEAN" | "KEYWORD" | "KEYWORD_LIST" | undefined;
        aggregation?: "SUM" | "MAX" | "LAST" | undefined;
    }[] | undefined;
    estimatedMinutes?: number | undefined;
    templateUniverse?: {
        tags?: {
            id: string;
            key: string;
            label: {
                en: string;
                ar: string;
            };
            enabled?: boolean | undefined;
        }[] | undefined;
        fallbackTemplateKey?: string | null | undefined;
        families?: {
            id: string;
            key: string;
            name: {
                en: string;
                ar: string;
            };
            description?: {
                en: string;
                ar: string;
            } | undefined;
            order?: number | undefined;
            enabled?: boolean | undefined;
        }[] | undefined;
        packs?: {
            id: string;
            key: string;
            name: {
                en: string;
                ar: string;
            };
            description?: {
                en: string;
                ar: string;
            } | undefined;
            createdAt?: string | null | undefined;
            source?: "ADMIN" | "BIOREZA" | "IMPORTED" | undefined;
            version?: number | undefined;
        }[] | undefined;
        stepPresets?: {
            id: string;
            key: string;
            name: {
                en: string;
                ar: string;
            };
            domain: string;
            steps: {
                id: string;
                order: number;
                roleKey: string;
                period: "AM" | "PM";
                conditions?: {
                    conditions: {
                        id: string;
                        operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                        signalKey: string;
                        value?: string | number | boolean | string[] | null | undefined;
                    }[];
                    mode: "ALL" | "ANY";
                } | null | undefined;
                required?: boolean | undefined;
                target?: {
                    kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                    keys?: string[] | undefined;
                    ids?: string[] | undefined;
                } | undefined;
                preferredProductIds?: string[] | undefined;
                maxAlternatives?: number | undefined;
                optionalPriority?: number | undefined;
                fallbackMode?: "FAIL_TEMPLATE" | "SKIP_OPTIONAL" | "USE_FALLBACK_ROLE" | undefined;
                fallbackRoleKeys?: string[] | undefined;
                spendingWeight?: number | null | undefined;
            }[];
            description?: {
                en: string;
                ar: string;
            } | undefined;
            enabled?: boolean | undefined;
        }[] | undefined;
        customerChoiceEnabled?: boolean | undefined;
        customerChoiceFamilies?: string[] | undefined;
    } | undefined;
    contextualCompletion?: {
        title?: {
            en: string;
            ar: string;
        } | undefined;
        enabled?: boolean | undefined;
        enabledDomains?: string[] | undefined;
        eligibleAnchorRoles?: string[] | undefined;
        defaultTemplateKeys?: Record<string, string> | undefined;
        allowUnavailableAnchorPlanning?: boolean | undefined;
        requireApprovedReason?: boolean | undefined;
        anchorBoostRules?: {
            id: string;
            key: string;
            name: {
                en: string;
                ar: string;
            };
            score: number;
            anchor: {
                kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                keys?: string[] | undefined;
                ids?: string[] | undefined;
            };
            candidate: {
                kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                keys?: string[] | undefined;
                ids?: string[] | undefined;
            };
            channel?: "RECOMMENDATION" | "MERCHANDISING" | undefined;
            priority?: number | undefined;
            enabled?: boolean | undefined;
        }[] | undefined;
        introduction?: {
            en: string;
            ar: string;
        } | undefined;
        unavailableMessage?: {
            en: string;
            ar: string;
        } | undefined;
        anchorExplanation?: {
            en: string;
            ar: string;
        } | undefined;
    } | undefined;
}>, {
    title: {
        en: string;
        ar: string;
    };
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
    schemaVersion: 1 | 2;
    estimatedMinutes: number;
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
        scale: {
            min: number;
            max: number;
            step: number;
        } | null;
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
        modes: ("FULL" | "CONTEXTUAL")[];
        contextualRequired: boolean;
        contextualOrder: number | null;
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
                weight?: number | undefined;
            }[];
        }[];
        minSelections: number;
        maxSelections: number;
        directSignalKey?: string | null | undefined;
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
        domain: string | null;
        amAllowed: boolean;
        pmAllowed: boolean;
        defaultPriority: number;
    }[];
    rules: {
        id: string;
        key: string;
        name: {
            en: string;
            ar: string;
        };
        priority: number;
        enabled: boolean;
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
            channel?: "RECOMMENDATION" | "MERCHANDISING" | undefined;
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
        priority: number;
        enabled: boolean;
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
        status: "ARCHIVED" | "DRAFT" | "PAUSED" | "SCHEDULED" | "PUBLISHED";
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
        enabled: boolean;
        tags: string[];
        version: number;
        presentation: {
            style: "COMPACT" | "MINIMAL" | "EDITORIAL" | "STEP_BY_STEP" | "DETAILED";
            estimatedMinutes: number | null;
            thumbnailKey: string | null;
            themeKey: string | null;
            intro: {
                en: string;
                ar: string;
            };
            outro: {
                en: string;
                ar: string;
            };
            customerVisible: boolean;
        };
        domain: string | null;
        steps: {
            id: string;
            conditions: {
                conditions: {
                    value: string | number | boolean | string[] | null;
                    id: string;
                    operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                    signalKey: string;
                }[];
                mode: "ALL" | "ANY";
            } | null;
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
            optionalPriority: number;
            fallbackMode: "FAIL_TEMPLATE" | "SKIP_OPTIONAL" | "USE_FALLBACK_ROLE";
            fallbackRoleKeys: string[];
            spendingWeight: number | null;
        }[];
        familyKey: string | null;
        complexity: string | null;
        packKey: string | null;
        baseTemplateKey: string | null;
        variant: {
            kind: "CATEGORY" | "BRAND" | "CONCERN" | "CUSTOM" | "BASE" | "SKIN_TYPE" | "COMPLEXITY" | "BUDGET" | "SEASONAL" | "LIFESTYLE" | "ANCHOR_ROLE";
            parameters: Record<string, string | number | boolean | string[]>;
        };
        hardEligibility: {
            conditions: {
                value: string | number | boolean | string[] | null;
                id: string;
                operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                signalKey: string;
            }[];
            mode: "ALL" | "ANY";
        } | null;
        selectionRules: {
            id: string;
            name: {
                en: string;
                ar: string;
            };
            score: number;
            when: {
                conditions: {
                    value: string | number | boolean | string[] | null;
                    id: string;
                    operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                    signalKey: string;
                }[];
                mode: "ALL" | "ANY";
            };
        }[];
        allowedAnchorRoles: string[];
        budgetPolicy: {
            maximum: number | null;
            mode: "IGNORE" | "RESPECT_CUSTOMER" | "HARD" | "SOFT";
        } | null;
        fallbackPolicy: {
            requiredStep: "FAIL_TEMPLATE" | "USE_STEP_FALLBACK";
            optionalStep: "SKIP";
            fallbackTemplateKey: string | null;
        } | null;
        compatibilityPolicy: "STANDARD" | "STRICT";
        brandConstraint: {
            mode: "NONE" | "PREFERRED" | "ONLY";
            entityId: string | null;
            parameterized: boolean;
        };
        categoryConstraint: {
            mode: "NONE" | "PREFERRED" | "ONLY";
            entityId: string | null;
            parameterized: boolean;
        };
        schedule: {
            startsAt: string | null;
            endsAt: string | null;
        };
        pinned: boolean;
        internalName?: string | undefined;
    }[];
    templateUniverse: {
        tags: {
            id: string;
            key: string;
            label: {
                en: string;
                ar: string;
            };
            enabled: boolean;
        }[];
        fallbackTemplateKey: string | null;
        families: {
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
            order: number;
            enabled: boolean;
        }[];
        packs: {
            id: string;
            key: string;
            description: {
                en: string;
                ar: string;
            };
            createdAt: string | null;
            name: {
                en: string;
                ar: string;
            };
            source: "ADMIN" | "BIOREZA" | "IMPORTED";
            version: number;
        }[];
        stepPresets: {
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
            domain: string;
            steps: {
                id: string;
                conditions: {
                    conditions: {
                        value: string | number | boolean | string[] | null;
                        id: string;
                        operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                        signalKey: string;
                    }[];
                    mode: "ALL" | "ANY";
                } | null;
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
                optionalPriority: number;
                fallbackMode: "FAIL_TEMPLATE" | "SKIP_OPTIONAL" | "USE_FALLBACK_ROLE";
                fallbackRoleKeys: string[];
                spendingWeight: number | null;
            }[];
        }[];
        customerChoiceEnabled: boolean;
        customerChoiceFamilies: string[];
    };
    contextualCompletion: {
        title: {
            en: string;
            ar: string;
        };
        enabled: boolean;
        enabledDomains: string[];
        eligibleAnchorRoles: string[];
        defaultTemplateKeys: Record<string, string>;
        allowUnavailableAnchorPlanning: boolean;
        requireApprovedReason: boolean;
        anchorBoostRules: {
            id: string;
            key: string;
            channel: "RECOMMENDATION" | "MERCHANDISING";
            name: {
                en: string;
                ar: string;
            };
            priority: number;
            enabled: boolean;
            score: number;
            anchor: {
                keys: string[];
                ids: string[];
                kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
            };
            candidate: {
                keys: string[];
                ids: string[];
                kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
            };
        }[];
        introduction: {
            en: string;
            ar: string;
        };
        unavailableMessage: {
            en: string;
            ar: string;
        };
        anchorExplanation: {
            en: string;
            ar: string;
        };
    };
    settings: {
        maximumProductsPerBrand: number | null;
        preferBrandDiversity: boolean;
        allowDuplicateProducts: boolean;
        budgetExceeded?: {
            en: string;
            ar: string;
        } | undefined;
    };
    signals?: {
        id: string;
        key: string;
        description: {
            en: string;
            ar: string;
        };
        purpose: "PROFILE" | "BUDGET_MAX" | "OWNED_ROLE";
        label: {
            en: string;
            ar: string;
        };
        enabled: boolean;
        family: string;
        valueType: "NUMBER" | "BOOLEAN" | "KEYWORD" | "KEYWORD_LIST";
        aggregation: "SUM" | "MAX" | "LAST";
    }[] | undefined;
}, {
    title: {
        en: string;
        ar: string;
    };
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
    schemaVersion: 1 | 2;
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
        scale?: {
            min: number;
            max: number;
            step: number;
        } | null | undefined;
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
        modes?: ("FULL" | "CONTEXTUAL")[] | undefined;
        contextualRequired?: boolean | undefined;
        contextualOrder?: number | null | undefined;
        directSignalKey?: string | null | undefined;
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
                weight?: number | undefined;
            }[] | undefined;
        }[] | undefined;
        minSelections?: number | undefined;
        maxSelections?: number | undefined;
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
        domain?: string | null | undefined;
        amAllowed?: boolean | undefined;
        pmAllowed?: boolean | undefined;
        defaultPriority?: number | undefined;
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
            channel?: "RECOMMENDATION" | "MERCHANDISING" | undefined;
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
        priority?: number | undefined;
        enabled?: boolean | undefined;
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
        priority?: number | undefined;
        enabled?: boolean | undefined;
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
            conditions?: {
                conditions: {
                    id: string;
                    operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                    signalKey: string;
                    value?: string | number | boolean | string[] | null | undefined;
                }[];
                mode: "ALL" | "ANY";
            } | null | undefined;
            required?: boolean | undefined;
            target?: {
                kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                keys?: string[] | undefined;
                ids?: string[] | undefined;
            } | undefined;
            preferredProductIds?: string[] | undefined;
            maxAlternatives?: number | undefined;
            optionalPriority?: number | undefined;
            fallbackMode?: "FAIL_TEMPLATE" | "SKIP_OPTIONAL" | "USE_FALLBACK_ROLE" | undefined;
            fallbackRoleKeys?: string[] | undefined;
            spendingWeight?: number | null | undefined;
        }[];
        status?: "ARCHIVED" | "DRAFT" | "PAUSED" | "SCHEDULED" | "PUBLISHED" | undefined;
        description?: {
            en: string;
            ar: string;
        } | undefined;
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
        enabled?: boolean | undefined;
        tags?: string[] | undefined;
        version?: number | undefined;
        presentation?: {
            style?: "COMPACT" | "MINIMAL" | "EDITORIAL" | "STEP_BY_STEP" | "DETAILED" | undefined;
            estimatedMinutes?: number | null | undefined;
            thumbnailKey?: string | null | undefined;
            themeKey?: string | null | undefined;
            intro?: {
                en: string;
                ar: string;
            } | undefined;
            outro?: {
                en: string;
                ar: string;
            } | undefined;
            customerVisible?: boolean | undefined;
        } | undefined;
        domain?: string | null | undefined;
        internalName?: string | undefined;
        familyKey?: string | null | undefined;
        complexity?: string | null | undefined;
        packKey?: string | null | undefined;
        baseTemplateKey?: string | null | undefined;
        variant?: {
            kind?: "CATEGORY" | "BRAND" | "CONCERN" | "CUSTOM" | "BASE" | "SKIN_TYPE" | "COMPLEXITY" | "BUDGET" | "SEASONAL" | "LIFESTYLE" | "ANCHOR_ROLE" | undefined;
            parameters?: Record<string, string | number | boolean | string[]> | undefined;
        } | undefined;
        hardEligibility?: {
            conditions: {
                id: string;
                operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                signalKey: string;
                value?: string | number | boolean | string[] | null | undefined;
            }[];
            mode: "ALL" | "ANY";
        } | null | undefined;
        selectionRules?: {
            id: string;
            name: {
                en: string;
                ar: string;
            };
            score: number;
            when: {
                conditions: {
                    id: string;
                    operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                    signalKey: string;
                    value?: string | number | boolean | string[] | null | undefined;
                }[];
                mode: "ALL" | "ANY";
            };
        }[] | undefined;
        allowedAnchorRoles?: string[] | undefined;
        budgetPolicy?: {
            maximum?: number | null | undefined;
            mode?: "IGNORE" | "RESPECT_CUSTOMER" | "HARD" | "SOFT" | undefined;
        } | null | undefined;
        fallbackPolicy?: {
            requiredStep?: "FAIL_TEMPLATE" | "USE_STEP_FALLBACK" | undefined;
            optionalStep?: "SKIP" | undefined;
            fallbackTemplateKey?: string | null | undefined;
        } | null | undefined;
        compatibilityPolicy?: "STANDARD" | "STRICT" | undefined;
        brandConstraint?: {
            mode?: "NONE" | "PREFERRED" | "ONLY" | undefined;
            entityId?: string | null | undefined;
            parameterized?: boolean | undefined;
        } | undefined;
        categoryConstraint?: {
            mode?: "NONE" | "PREFERRED" | "ONLY" | undefined;
            entityId?: string | null | undefined;
            parameterized?: boolean | undefined;
        } | undefined;
        schedule?: {
            startsAt?: string | null | undefined;
            endsAt?: string | null | undefined;
        } | undefined;
        pinned?: boolean | undefined;
    }[];
    settings: {
        maximumProductsPerBrand?: number | null | undefined;
        preferBrandDiversity?: boolean | undefined;
        allowDuplicateProducts?: boolean | undefined;
        budgetExceeded?: {
            en: string;
            ar: string;
        } | undefined;
    };
    signals?: {
        id: string;
        key: string;
        label: {
            en: string;
            ar: string;
        };
        family: string;
        description?: {
            en: string;
            ar: string;
        } | undefined;
        purpose?: "PROFILE" | "BUDGET_MAX" | "OWNED_ROLE" | undefined;
        enabled?: boolean | undefined;
        valueType?: "NUMBER" | "BOOLEAN" | "KEYWORD" | "KEYWORD_LIST" | undefined;
        aggregation?: "SUM" | "MAX" | "LAST" | undefined;
    }[] | undefined;
    estimatedMinutes?: number | undefined;
    templateUniverse?: {
        tags?: {
            id: string;
            key: string;
            label: {
                en: string;
                ar: string;
            };
            enabled?: boolean | undefined;
        }[] | undefined;
        fallbackTemplateKey?: string | null | undefined;
        families?: {
            id: string;
            key: string;
            name: {
                en: string;
                ar: string;
            };
            description?: {
                en: string;
                ar: string;
            } | undefined;
            order?: number | undefined;
            enabled?: boolean | undefined;
        }[] | undefined;
        packs?: {
            id: string;
            key: string;
            name: {
                en: string;
                ar: string;
            };
            description?: {
                en: string;
                ar: string;
            } | undefined;
            createdAt?: string | null | undefined;
            source?: "ADMIN" | "BIOREZA" | "IMPORTED" | undefined;
            version?: number | undefined;
        }[] | undefined;
        stepPresets?: {
            id: string;
            key: string;
            name: {
                en: string;
                ar: string;
            };
            domain: string;
            steps: {
                id: string;
                order: number;
                roleKey: string;
                period: "AM" | "PM";
                conditions?: {
                    conditions: {
                        id: string;
                        operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                        signalKey: string;
                        value?: string | number | boolean | string[] | null | undefined;
                    }[];
                    mode: "ALL" | "ANY";
                } | null | undefined;
                required?: boolean | undefined;
                target?: {
                    kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                    keys?: string[] | undefined;
                    ids?: string[] | undefined;
                } | undefined;
                preferredProductIds?: string[] | undefined;
                maxAlternatives?: number | undefined;
                optionalPriority?: number | undefined;
                fallbackMode?: "FAIL_TEMPLATE" | "SKIP_OPTIONAL" | "USE_FALLBACK_ROLE" | undefined;
                fallbackRoleKeys?: string[] | undefined;
                spendingWeight?: number | null | undefined;
            }[];
            description?: {
                en: string;
                ar: string;
            } | undefined;
            enabled?: boolean | undefined;
        }[] | undefined;
        customerChoiceEnabled?: boolean | undefined;
        customerChoiceFamilies?: string[] | undefined;
    } | undefined;
    contextualCompletion?: {
        title?: {
            en: string;
            ar: string;
        } | undefined;
        enabled?: boolean | undefined;
        enabledDomains?: string[] | undefined;
        eligibleAnchorRoles?: string[] | undefined;
        defaultTemplateKeys?: Record<string, string> | undefined;
        allowUnavailableAnchorPlanning?: boolean | undefined;
        requireApprovedReason?: boolean | undefined;
        anchorBoostRules?: {
            id: string;
            key: string;
            name: {
                en: string;
                ar: string;
            };
            score: number;
            anchor: {
                kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                keys?: string[] | undefined;
                ids?: string[] | undefined;
            };
            candidate: {
                kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                keys?: string[] | undefined;
                ids?: string[] | undefined;
            };
            channel?: "RECOMMENDATION" | "MERCHANDISING" | undefined;
            priority?: number | undefined;
            enabled?: boolean | undefined;
        }[] | undefined;
        introduction?: {
            en: string;
            ar: string;
        } | undefined;
        unavailableMessage?: {
            en: string;
            ar: string;
        } | undefined;
        anchorExplanation?: {
            en: string;
            ar: string;
        } | undefined;
    } | undefined;
}>;
export declare const routineAnswerValueSchema: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodString, "many">]>;
export declare const routineAnswersSchema: z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodString, "many">]>>;
export declare const routineEvaluationInputSchema: z.ZodObject<{
    sessionId: z.ZodOptional<z.ZodString>;
    answers: z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodString, "many">]>>;
    locale: z.ZodDefault<z.ZodEnum<["en", "ar"]>>;
    mode: z.ZodDefault<z.ZodEnum<["FULL", "CONTEXTUAL"]>>;
    anchor: z.ZodDefault<z.ZodNullable<z.ZodObject<{
        productId: z.ZodString;
        variantId: z.ZodOptional<z.ZodString>;
        alreadyOwned: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        productId: string;
        alreadyOwned: boolean;
        variantId?: string | undefined;
    }, {
        productId: string;
        variantId?: string | undefined;
        alreadyOwned?: boolean | undefined;
    }>>>;
    selectedVariants: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodString>>;
    requestedTemplateKey: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    templateParameters: z.ZodDefault<z.ZodObject<{
        brandId: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        categoryId: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        categoryId: string | null;
        brandId: string | null;
    }, {
        categoryId?: string | null | undefined;
        brandId?: string | null | undefined;
    }>>;
    includeDiagnostics: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    mode: "FULL" | "CONTEXTUAL";
    answers: Record<string, string | number | boolean | string[]>;
    anchor: {
        productId: string;
        alreadyOwned: boolean;
        variantId?: string | undefined;
    } | null;
    locale: "en" | "ar";
    selectedVariants: Record<string, string>;
    requestedTemplateKey: string | null;
    templateParameters: {
        categoryId: string | null;
        brandId: string | null;
    };
    includeDiagnostics: boolean;
    sessionId?: string | undefined;
}, {
    answers: Record<string, string | number | boolean | string[]>;
    mode?: "FULL" | "CONTEXTUAL" | undefined;
    anchor?: {
        productId: string;
        variantId?: string | undefined;
        alreadyOwned?: boolean | undefined;
    } | null | undefined;
    sessionId?: string | undefined;
    locale?: "en" | "ar" | undefined;
    selectedVariants?: Record<string, string> | undefined;
    requestedTemplateKey?: string | null | undefined;
    templateParameters?: {
        categoryId?: string | null | undefined;
        brandId?: string | null | undefined;
    } | undefined;
    includeDiagnostics?: boolean | undefined;
}>;
export declare const routineDraftSaveSchema: z.ZodObject<{
    expectedRevision: z.ZodNumber;
    config: z.ZodEffects<z.ZodObject<{
        schemaVersion: z.ZodUnion<[z.ZodLiteral<1>, z.ZodLiteral<2>]>;
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
            modes: z.ZodDefault<z.ZodArray<z.ZodEnum<["FULL", "CONTEXTUAL"]>, "many">>;
            contextualRequired: z.ZodDefault<z.ZodBoolean>;
            contextualOrder: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
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
            /** Optional managed signal receiving SCALE/NUMERIC_RANGE values directly. */
            directSignalKey: z.ZodOptional<z.ZodNullable<z.ZodString>>;
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
                    weight: z.ZodOptional<z.ZodNumber>;
                }, "strip", z.ZodTypeAny, {
                    value: string | number | boolean | string[];
                    key: string;
                    weight?: number | undefined;
                }, {
                    value: string | number | boolean | string[];
                    key: string;
                    weight?: number | undefined;
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
                    weight?: number | undefined;
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
                    weight?: number | undefined;
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
            scale: {
                min: number;
                max: number;
                step: number;
            } | null;
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
            modes: ("FULL" | "CONTEXTUAL")[];
            contextualRequired: boolean;
            contextualOrder: number | null;
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
                    weight?: number | undefined;
                }[];
            }[];
            minSelections: number;
            maxSelections: number;
            directSignalKey?: string | null | undefined;
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
            scale?: {
                min: number;
                max: number;
                step: number;
            } | null | undefined;
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
            modes?: ("FULL" | "CONTEXTUAL")[] | undefined;
            contextualRequired?: boolean | undefined;
            contextualOrder?: number | null | undefined;
            directSignalKey?: string | null | undefined;
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
                    weight?: number | undefined;
                }[] | undefined;
            }[] | undefined;
            minSelections?: number | undefined;
            maxSelections?: number | undefined;
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
            scale: {
                min: number;
                max: number;
                step: number;
            } | null;
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
            modes: ("FULL" | "CONTEXTUAL")[];
            contextualRequired: boolean;
            contextualOrder: number | null;
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
                    weight?: number | undefined;
                }[];
            }[];
            minSelections: number;
            maxSelections: number;
            directSignalKey?: string | null | undefined;
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
            scale?: {
                min: number;
                max: number;
                step: number;
            } | null | undefined;
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
            modes?: ("FULL" | "CONTEXTUAL")[] | undefined;
            contextualRequired?: boolean | undefined;
            contextualOrder?: number | null | undefined;
            directSignalKey?: string | null | undefined;
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
                    weight?: number | undefined;
                }[] | undefined;
            }[] | undefined;
            minSelections?: number | undefined;
            maxSelections?: number | undefined;
        }>, "many">;
        signals: z.ZodOptional<z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            key: z.ZodString;
            family: z.ZodString;
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
            valueType: z.ZodDefault<z.ZodEnum<["NUMBER", "BOOLEAN", "KEYWORD", "KEYWORD_LIST"]>>;
            aggregation: z.ZodDefault<z.ZodEnum<["SUM", "MAX", "LAST"]>>;
            purpose: z.ZodDefault<z.ZodEnum<["PROFILE", "BUDGET_MAX", "OWNED_ROLE"]>>;
            enabled: z.ZodDefault<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            id: string;
            key: string;
            description: {
                en: string;
                ar: string;
            };
            purpose: "PROFILE" | "BUDGET_MAX" | "OWNED_ROLE";
            label: {
                en: string;
                ar: string;
            };
            enabled: boolean;
            family: string;
            valueType: "NUMBER" | "BOOLEAN" | "KEYWORD" | "KEYWORD_LIST";
            aggregation: "SUM" | "MAX" | "LAST";
        }, {
            id: string;
            key: string;
            label: {
                en: string;
                ar: string;
            };
            family: string;
            description?: {
                en: string;
                ar: string;
            } | undefined;
            purpose?: "PROFILE" | "BUDGET_MAX" | "OWNED_ROLE" | undefined;
            enabled?: boolean | undefined;
            valueType?: "NUMBER" | "BOOLEAN" | "KEYWORD" | "KEYWORD_LIST" | undefined;
            aggregation?: "SUM" | "MAX" | "LAST" | undefined;
        }>, "many">>;
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
            domain: z.ZodDefault<z.ZodNullable<z.ZodString>>;
            amAllowed: z.ZodDefault<z.ZodBoolean>;
            pmAllowed: z.ZodDefault<z.ZodBoolean>;
            defaultPriority: z.ZodDefault<z.ZodNumber>;
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
            domain: string | null;
            amAllowed: boolean;
            pmAllowed: boolean;
            defaultPriority: number;
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
            domain?: string | null | undefined;
            amAllowed?: boolean | undefined;
            pmAllowed?: boolean | undefined;
            defaultPriority?: number | undefined;
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
                channel: z.ZodOptional<z.ZodEnum<["RECOMMENDATION", "MERCHANDISING"]>>;
            }, "strip", z.ZodTypeAny, {
                type: "BOOST";
                target: {
                    keys: string[];
                    ids: string[];
                    kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                };
                score: number;
                channel?: "RECOMMENDATION" | "MERCHANDISING" | undefined;
            }, {
                type: "BOOST";
                target: {
                    kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                    keys?: string[] | undefined;
                    ids?: string[] | undefined;
                };
                score: number;
                channel?: "RECOMMENDATION" | "MERCHANDISING" | undefined;
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
            priority: number;
            enabled: boolean;
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
                channel?: "RECOMMENDATION" | "MERCHANDISING" | undefined;
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
                channel?: "RECOMMENDATION" | "MERCHANDISING" | undefined;
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
            priority?: number | undefined;
            enabled?: boolean | undefined;
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
            priority: number;
            enabled: boolean;
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
            priority?: number | undefined;
            enabled?: boolean | undefined;
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
            internalName: z.ZodOptional<z.ZodString>;
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
            status: z.ZodDefault<z.ZodEnum<["DRAFT", "PUBLISHED", "SCHEDULED", "PAUSED", "ARCHIVED"]>>;
            version: z.ZodDefault<z.ZodNumber>;
            priority: z.ZodDefault<z.ZodNumber>;
            domain: z.ZodDefault<z.ZodNullable<z.ZodString>>;
            familyKey: z.ZodDefault<z.ZodNullable<z.ZodString>>;
            complexity: z.ZodDefault<z.ZodNullable<z.ZodString>>;
            packKey: z.ZodDefault<z.ZodNullable<z.ZodString>>;
            tags: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            baseTemplateKey: z.ZodDefault<z.ZodNullable<z.ZodString>>;
            variant: z.ZodDefault<z.ZodObject<{
                kind: z.ZodDefault<z.ZodEnum<["BASE", "SKIN_TYPE", "CONCERN", "COMPLEXITY", "BUDGET", "SEASONAL", "LIFESTYLE", "ANCHOR_ROLE", "BRAND", "CATEGORY", "CUSTOM"]>>;
                parameters: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodString, "many">]>>>;
            }, "strip", z.ZodTypeAny, {
                kind: "CATEGORY" | "BRAND" | "CONCERN" | "CUSTOM" | "BASE" | "SKIN_TYPE" | "COMPLEXITY" | "BUDGET" | "SEASONAL" | "LIFESTYLE" | "ANCHOR_ROLE";
                parameters: Record<string, string | number | boolean | string[]>;
            }, {
                kind?: "CATEGORY" | "BRAND" | "CONCERN" | "CUSTOM" | "BASE" | "SKIN_TYPE" | "COMPLEXITY" | "BUDGET" | "SEASONAL" | "LIFESTYLE" | "ANCHOR_ROLE" | undefined;
                parameters?: Record<string, string | number | boolean | string[]> | undefined;
            }>>;
            hardEligibility: z.ZodDefault<z.ZodNullable<z.ZodObject<{
                mode: z.ZodEnum<["ALL", "ANY"]>;
                conditions: z.ZodArray<z.ZodObject<{
                    id: z.ZodString;
                    signalKey: z.ZodString;
                    operator: z.ZodEnum<["EXISTS", "NOT_EXISTS", "EQUALS", "NOT_EQUALS", "CONTAINS", "GREATER_THAN_OR_EQUAL", "LESS_THAN_OR_EQUAL"]>;
                    value: z.ZodDefault<z.ZodNullable<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodString, "many">]>>>;
                }, "strip", z.ZodTypeAny, {
                    value: string | number | boolean | string[] | null;
                    id: string;
                    operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                    signalKey: string;
                }, {
                    id: string;
                    operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                    signalKey: string;
                    value?: string | number | boolean | string[] | null | undefined;
                }>, "many">;
            }, "strip", z.ZodTypeAny, {
                conditions: {
                    value: string | number | boolean | string[] | null;
                    id: string;
                    operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                    signalKey: string;
                }[];
                mode: "ALL" | "ANY";
            }, {
                conditions: {
                    id: string;
                    operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                    signalKey: string;
                    value?: string | number | boolean | string[] | null | undefined;
                }[];
                mode: "ALL" | "ANY";
            }>>>;
            selectionRules: z.ZodDefault<z.ZodArray<z.ZodObject<{
                id: z.ZodString;
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
                when: z.ZodObject<{
                    mode: z.ZodEnum<["ALL", "ANY"]>;
                    conditions: z.ZodArray<z.ZodObject<{
                        id: z.ZodString;
                        signalKey: z.ZodString;
                        operator: z.ZodEnum<["EXISTS", "NOT_EXISTS", "EQUALS", "NOT_EQUALS", "CONTAINS", "GREATER_THAN_OR_EQUAL", "LESS_THAN_OR_EQUAL"]>;
                        value: z.ZodDefault<z.ZodNullable<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodString, "many">]>>>;
                    }, "strip", z.ZodTypeAny, {
                        value: string | number | boolean | string[] | null;
                        id: string;
                        operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                        signalKey: string;
                    }, {
                        id: string;
                        operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                        signalKey: string;
                        value?: string | number | boolean | string[] | null | undefined;
                    }>, "many">;
                }, "strip", z.ZodTypeAny, {
                    conditions: {
                        value: string | number | boolean | string[] | null;
                        id: string;
                        operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                        signalKey: string;
                    }[];
                    mode: "ALL" | "ANY";
                }, {
                    conditions: {
                        id: string;
                        operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                        signalKey: string;
                        value?: string | number | boolean | string[] | null | undefined;
                    }[];
                    mode: "ALL" | "ANY";
                }>;
                score: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                id: string;
                name: {
                    en: string;
                    ar: string;
                };
                score: number;
                when: {
                    conditions: {
                        value: string | number | boolean | string[] | null;
                        id: string;
                        operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                        signalKey: string;
                    }[];
                    mode: "ALL" | "ANY";
                };
            }, {
                id: string;
                name: {
                    en: string;
                    ar: string;
                };
                score: number;
                when: {
                    conditions: {
                        id: string;
                        operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                        signalKey: string;
                        value?: string | number | boolean | string[] | null | undefined;
                    }[];
                    mode: "ALL" | "ANY";
                };
            }>, "many">>;
            allowedAnchorRoles: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
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
                conditions: z.ZodDefault<z.ZodNullable<z.ZodObject<{
                    mode: z.ZodEnum<["ALL", "ANY"]>;
                    conditions: z.ZodArray<z.ZodObject<{
                        id: z.ZodString;
                        signalKey: z.ZodString;
                        operator: z.ZodEnum<["EXISTS", "NOT_EXISTS", "EQUALS", "NOT_EQUALS", "CONTAINS", "GREATER_THAN_OR_EQUAL", "LESS_THAN_OR_EQUAL"]>;
                        value: z.ZodDefault<z.ZodNullable<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodString, "many">]>>>;
                    }, "strip", z.ZodTypeAny, {
                        value: string | number | boolean | string[] | null;
                        id: string;
                        operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                        signalKey: string;
                    }, {
                        id: string;
                        operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                        signalKey: string;
                        value?: string | number | boolean | string[] | null | undefined;
                    }>, "many">;
                }, "strip", z.ZodTypeAny, {
                    conditions: {
                        value: string | number | boolean | string[] | null;
                        id: string;
                        operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                        signalKey: string;
                    }[];
                    mode: "ALL" | "ANY";
                }, {
                    conditions: {
                        id: string;
                        operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                        signalKey: string;
                        value?: string | number | boolean | string[] | null | undefined;
                    }[];
                    mode: "ALL" | "ANY";
                }>>>;
                optionalPriority: z.ZodDefault<z.ZodNumber>;
                fallbackMode: z.ZodDefault<z.ZodEnum<["FAIL_TEMPLATE", "SKIP_OPTIONAL", "USE_FALLBACK_ROLE"]>>;
                fallbackRoleKeys: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                spendingWeight: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
            }, "strip", z.ZodTypeAny, {
                id: string;
                conditions: {
                    conditions: {
                        value: string | number | boolean | string[] | null;
                        id: string;
                        operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                        signalKey: string;
                    }[];
                    mode: "ALL" | "ANY";
                } | null;
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
                optionalPriority: number;
                fallbackMode: "FAIL_TEMPLATE" | "SKIP_OPTIONAL" | "USE_FALLBACK_ROLE";
                fallbackRoleKeys: string[];
                spendingWeight: number | null;
            }, {
                id: string;
                order: number;
                roleKey: string;
                period: "AM" | "PM";
                conditions?: {
                    conditions: {
                        id: string;
                        operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                        signalKey: string;
                        value?: string | number | boolean | string[] | null | undefined;
                    }[];
                    mode: "ALL" | "ANY";
                } | null | undefined;
                required?: boolean | undefined;
                target?: {
                    kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                    keys?: string[] | undefined;
                    ids?: string[] | undefined;
                } | undefined;
                preferredProductIds?: string[] | undefined;
                maxAlternatives?: number | undefined;
                optionalPriority?: number | undefined;
                fallbackMode?: "FAIL_TEMPLATE" | "SKIP_OPTIONAL" | "USE_FALLBACK_ROLE" | undefined;
                fallbackRoleKeys?: string[] | undefined;
                spendingWeight?: number | null | undefined;
            }>, "many">;
            budgetPolicy: z.ZodDefault<z.ZodNullable<z.ZodObject<{
                mode: z.ZodDefault<z.ZodEnum<["IGNORE", "RESPECT_CUSTOMER", "HARD", "SOFT"]>>;
                maximum: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
            }, "strip", z.ZodTypeAny, {
                maximum: number | null;
                mode: "IGNORE" | "RESPECT_CUSTOMER" | "HARD" | "SOFT";
            }, {
                maximum?: number | null | undefined;
                mode?: "IGNORE" | "RESPECT_CUSTOMER" | "HARD" | "SOFT" | undefined;
            }>>>;
            fallbackPolicy: z.ZodDefault<z.ZodNullable<z.ZodObject<{
                requiredStep: z.ZodDefault<z.ZodEnum<["FAIL_TEMPLATE", "USE_STEP_FALLBACK"]>>;
                optionalStep: z.ZodDefault<z.ZodLiteral<"SKIP">>;
                fallbackTemplateKey: z.ZodDefault<z.ZodNullable<z.ZodString>>;
            }, "strip", z.ZodTypeAny, {
                requiredStep: "FAIL_TEMPLATE" | "USE_STEP_FALLBACK";
                optionalStep: "SKIP";
                fallbackTemplateKey: string | null;
            }, {
                requiredStep?: "FAIL_TEMPLATE" | "USE_STEP_FALLBACK" | undefined;
                optionalStep?: "SKIP" | undefined;
                fallbackTemplateKey?: string | null | undefined;
            }>>>;
            compatibilityPolicy: z.ZodDefault<z.ZodEnum<["STRICT", "STANDARD"]>>;
            brandConstraint: z.ZodDefault<z.ZodObject<{
                mode: z.ZodDefault<z.ZodEnum<["NONE", "PREFERRED", "ONLY"]>>;
                entityId: z.ZodDefault<z.ZodNullable<z.ZodString>>;
                parameterized: z.ZodDefault<z.ZodBoolean>;
            }, "strip", z.ZodTypeAny, {
                mode: "NONE" | "PREFERRED" | "ONLY";
                entityId: string | null;
                parameterized: boolean;
            }, {
                mode?: "NONE" | "PREFERRED" | "ONLY" | undefined;
                entityId?: string | null | undefined;
                parameterized?: boolean | undefined;
            }>>;
            categoryConstraint: z.ZodDefault<z.ZodObject<{
                mode: z.ZodDefault<z.ZodEnum<["NONE", "PREFERRED", "ONLY"]>>;
                entityId: z.ZodDefault<z.ZodNullable<z.ZodString>>;
                parameterized: z.ZodDefault<z.ZodBoolean>;
            }, "strip", z.ZodTypeAny, {
                mode: "NONE" | "PREFERRED" | "ONLY";
                entityId: string | null;
                parameterized: boolean;
            }, {
                mode?: "NONE" | "PREFERRED" | "ONLY" | undefined;
                entityId?: string | null | undefined;
                parameterized?: boolean | undefined;
            }>>;
            presentation: z.ZodDefault<z.ZodObject<{
                style: z.ZodDefault<z.ZodEnum<["MINIMAL", "EDITORIAL", "STEP_BY_STEP", "COMPACT", "DETAILED"]>>;
                estimatedMinutes: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
                thumbnailKey: z.ZodDefault<z.ZodNullable<z.ZodString>>;
                themeKey: z.ZodDefault<z.ZodNullable<z.ZodString>>;
                intro: z.ZodDefault<z.ZodObject<{
                    en: z.ZodString;
                    ar: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    en: string;
                    ar: string;
                }, {
                    en: string;
                    ar: string;
                }>>;
                outro: z.ZodDefault<z.ZodObject<{
                    en: z.ZodString;
                    ar: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    en: string;
                    ar: string;
                }, {
                    en: string;
                    ar: string;
                }>>;
                customerVisible: z.ZodDefault<z.ZodBoolean>;
            }, "strip", z.ZodTypeAny, {
                style: "COMPACT" | "MINIMAL" | "EDITORIAL" | "STEP_BY_STEP" | "DETAILED";
                estimatedMinutes: number | null;
                thumbnailKey: string | null;
                themeKey: string | null;
                intro: {
                    en: string;
                    ar: string;
                };
                outro: {
                    en: string;
                    ar: string;
                };
                customerVisible: boolean;
            }, {
                style?: "COMPACT" | "MINIMAL" | "EDITORIAL" | "STEP_BY_STEP" | "DETAILED" | undefined;
                estimatedMinutes?: number | null | undefined;
                thumbnailKey?: string | null | undefined;
                themeKey?: string | null | undefined;
                intro?: {
                    en: string;
                    ar: string;
                } | undefined;
                outro?: {
                    en: string;
                    ar: string;
                } | undefined;
                customerVisible?: boolean | undefined;
            }>>;
            schedule: z.ZodDefault<z.ZodObject<{
                startsAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
                endsAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
            }, "strip", z.ZodTypeAny, {
                startsAt: string | null;
                endsAt: string | null;
            }, {
                startsAt?: string | null | undefined;
                endsAt?: string | null | undefined;
            }>>;
            pinned: z.ZodDefault<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            status: "ARCHIVED" | "DRAFT" | "PAUSED" | "SCHEDULED" | "PUBLISHED";
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
            enabled: boolean;
            tags: string[];
            version: number;
            presentation: {
                style: "COMPACT" | "MINIMAL" | "EDITORIAL" | "STEP_BY_STEP" | "DETAILED";
                estimatedMinutes: number | null;
                thumbnailKey: string | null;
                themeKey: string | null;
                intro: {
                    en: string;
                    ar: string;
                };
                outro: {
                    en: string;
                    ar: string;
                };
                customerVisible: boolean;
            };
            domain: string | null;
            steps: {
                id: string;
                conditions: {
                    conditions: {
                        value: string | number | boolean | string[] | null;
                        id: string;
                        operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                        signalKey: string;
                    }[];
                    mode: "ALL" | "ANY";
                } | null;
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
                optionalPriority: number;
                fallbackMode: "FAIL_TEMPLATE" | "SKIP_OPTIONAL" | "USE_FALLBACK_ROLE";
                fallbackRoleKeys: string[];
                spendingWeight: number | null;
            }[];
            familyKey: string | null;
            complexity: string | null;
            packKey: string | null;
            baseTemplateKey: string | null;
            variant: {
                kind: "CATEGORY" | "BRAND" | "CONCERN" | "CUSTOM" | "BASE" | "SKIN_TYPE" | "COMPLEXITY" | "BUDGET" | "SEASONAL" | "LIFESTYLE" | "ANCHOR_ROLE";
                parameters: Record<string, string | number | boolean | string[]>;
            };
            hardEligibility: {
                conditions: {
                    value: string | number | boolean | string[] | null;
                    id: string;
                    operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                    signalKey: string;
                }[];
                mode: "ALL" | "ANY";
            } | null;
            selectionRules: {
                id: string;
                name: {
                    en: string;
                    ar: string;
                };
                score: number;
                when: {
                    conditions: {
                        value: string | number | boolean | string[] | null;
                        id: string;
                        operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                        signalKey: string;
                    }[];
                    mode: "ALL" | "ANY";
                };
            }[];
            allowedAnchorRoles: string[];
            budgetPolicy: {
                maximum: number | null;
                mode: "IGNORE" | "RESPECT_CUSTOMER" | "HARD" | "SOFT";
            } | null;
            fallbackPolicy: {
                requiredStep: "FAIL_TEMPLATE" | "USE_STEP_FALLBACK";
                optionalStep: "SKIP";
                fallbackTemplateKey: string | null;
            } | null;
            compatibilityPolicy: "STANDARD" | "STRICT";
            brandConstraint: {
                mode: "NONE" | "PREFERRED" | "ONLY";
                entityId: string | null;
                parameterized: boolean;
            };
            categoryConstraint: {
                mode: "NONE" | "PREFERRED" | "ONLY";
                entityId: string | null;
                parameterized: boolean;
            };
            schedule: {
                startsAt: string | null;
                endsAt: string | null;
            };
            pinned: boolean;
            internalName?: string | undefined;
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
                conditions?: {
                    conditions: {
                        id: string;
                        operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                        signalKey: string;
                        value?: string | number | boolean | string[] | null | undefined;
                    }[];
                    mode: "ALL" | "ANY";
                } | null | undefined;
                required?: boolean | undefined;
                target?: {
                    kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                    keys?: string[] | undefined;
                    ids?: string[] | undefined;
                } | undefined;
                preferredProductIds?: string[] | undefined;
                maxAlternatives?: number | undefined;
                optionalPriority?: number | undefined;
                fallbackMode?: "FAIL_TEMPLATE" | "SKIP_OPTIONAL" | "USE_FALLBACK_ROLE" | undefined;
                fallbackRoleKeys?: string[] | undefined;
                spendingWeight?: number | null | undefined;
            }[];
            status?: "ARCHIVED" | "DRAFT" | "PAUSED" | "SCHEDULED" | "PUBLISHED" | undefined;
            description?: {
                en: string;
                ar: string;
            } | undefined;
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
            enabled?: boolean | undefined;
            tags?: string[] | undefined;
            version?: number | undefined;
            presentation?: {
                style?: "COMPACT" | "MINIMAL" | "EDITORIAL" | "STEP_BY_STEP" | "DETAILED" | undefined;
                estimatedMinutes?: number | null | undefined;
                thumbnailKey?: string | null | undefined;
                themeKey?: string | null | undefined;
                intro?: {
                    en: string;
                    ar: string;
                } | undefined;
                outro?: {
                    en: string;
                    ar: string;
                } | undefined;
                customerVisible?: boolean | undefined;
            } | undefined;
            domain?: string | null | undefined;
            internalName?: string | undefined;
            familyKey?: string | null | undefined;
            complexity?: string | null | undefined;
            packKey?: string | null | undefined;
            baseTemplateKey?: string | null | undefined;
            variant?: {
                kind?: "CATEGORY" | "BRAND" | "CONCERN" | "CUSTOM" | "BASE" | "SKIN_TYPE" | "COMPLEXITY" | "BUDGET" | "SEASONAL" | "LIFESTYLE" | "ANCHOR_ROLE" | undefined;
                parameters?: Record<string, string | number | boolean | string[]> | undefined;
            } | undefined;
            hardEligibility?: {
                conditions: {
                    id: string;
                    operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                    signalKey: string;
                    value?: string | number | boolean | string[] | null | undefined;
                }[];
                mode: "ALL" | "ANY";
            } | null | undefined;
            selectionRules?: {
                id: string;
                name: {
                    en: string;
                    ar: string;
                };
                score: number;
                when: {
                    conditions: {
                        id: string;
                        operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                        signalKey: string;
                        value?: string | number | boolean | string[] | null | undefined;
                    }[];
                    mode: "ALL" | "ANY";
                };
            }[] | undefined;
            allowedAnchorRoles?: string[] | undefined;
            budgetPolicy?: {
                maximum?: number | null | undefined;
                mode?: "IGNORE" | "RESPECT_CUSTOMER" | "HARD" | "SOFT" | undefined;
            } | null | undefined;
            fallbackPolicy?: {
                requiredStep?: "FAIL_TEMPLATE" | "USE_STEP_FALLBACK" | undefined;
                optionalStep?: "SKIP" | undefined;
                fallbackTemplateKey?: string | null | undefined;
            } | null | undefined;
            compatibilityPolicy?: "STANDARD" | "STRICT" | undefined;
            brandConstraint?: {
                mode?: "NONE" | "PREFERRED" | "ONLY" | undefined;
                entityId?: string | null | undefined;
                parameterized?: boolean | undefined;
            } | undefined;
            categoryConstraint?: {
                mode?: "NONE" | "PREFERRED" | "ONLY" | undefined;
                entityId?: string | null | undefined;
                parameterized?: boolean | undefined;
            } | undefined;
            schedule?: {
                startsAt?: string | null | undefined;
                endsAt?: string | null | undefined;
            } | undefined;
            pinned?: boolean | undefined;
        }>, "many">;
        templateUniverse: z.ZodDefault<z.ZodObject<{
            families: z.ZodDefault<z.ZodArray<z.ZodObject<{
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
                order: z.ZodDefault<z.ZodNumber>;
                enabled: z.ZodDefault<z.ZodBoolean>;
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
                order: number;
                enabled: boolean;
            }, {
                id: string;
                key: string;
                name: {
                    en: string;
                    ar: string;
                };
                description?: {
                    en: string;
                    ar: string;
                } | undefined;
                order?: number | undefined;
                enabled?: boolean | undefined;
            }>, "many">>;
            packs: z.ZodDefault<z.ZodArray<z.ZodObject<{
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
                version: z.ZodDefault<z.ZodNumber>;
                source: z.ZodDefault<z.ZodEnum<["BIOREZA", "ADMIN", "IMPORTED"]>>;
                createdAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
            }, "strip", z.ZodTypeAny, {
                id: string;
                key: string;
                description: {
                    en: string;
                    ar: string;
                };
                createdAt: string | null;
                name: {
                    en: string;
                    ar: string;
                };
                source: "ADMIN" | "BIOREZA" | "IMPORTED";
                version: number;
            }, {
                id: string;
                key: string;
                name: {
                    en: string;
                    ar: string;
                };
                description?: {
                    en: string;
                    ar: string;
                } | undefined;
                createdAt?: string | null | undefined;
                source?: "ADMIN" | "BIOREZA" | "IMPORTED" | undefined;
                version?: number | undefined;
            }>, "many">>;
            tags: z.ZodDefault<z.ZodArray<z.ZodObject<{
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
                enabled: z.ZodDefault<z.ZodBoolean>;
            }, "strip", z.ZodTypeAny, {
                id: string;
                key: string;
                label: {
                    en: string;
                    ar: string;
                };
                enabled: boolean;
            }, {
                id: string;
                key: string;
                label: {
                    en: string;
                    ar: string;
                };
                enabled?: boolean | undefined;
            }>, "many">>;
            stepPresets: z.ZodDefault<z.ZodArray<z.ZodObject<{
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
                domain: z.ZodString;
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
                    conditions: z.ZodDefault<z.ZodNullable<z.ZodObject<{
                        mode: z.ZodEnum<["ALL", "ANY"]>;
                        conditions: z.ZodArray<z.ZodObject<{
                            id: z.ZodString;
                            signalKey: z.ZodString;
                            operator: z.ZodEnum<["EXISTS", "NOT_EXISTS", "EQUALS", "NOT_EQUALS", "CONTAINS", "GREATER_THAN_OR_EQUAL", "LESS_THAN_OR_EQUAL"]>;
                            value: z.ZodDefault<z.ZodNullable<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodString, "many">]>>>;
                        }, "strip", z.ZodTypeAny, {
                            value: string | number | boolean | string[] | null;
                            id: string;
                            operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                            signalKey: string;
                        }, {
                            id: string;
                            operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                            signalKey: string;
                            value?: string | number | boolean | string[] | null | undefined;
                        }>, "many">;
                    }, "strip", z.ZodTypeAny, {
                        conditions: {
                            value: string | number | boolean | string[] | null;
                            id: string;
                            operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                            signalKey: string;
                        }[];
                        mode: "ALL" | "ANY";
                    }, {
                        conditions: {
                            id: string;
                            operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                            signalKey: string;
                            value?: string | number | boolean | string[] | null | undefined;
                        }[];
                        mode: "ALL" | "ANY";
                    }>>>;
                    optionalPriority: z.ZodDefault<z.ZodNumber>;
                    fallbackMode: z.ZodDefault<z.ZodEnum<["FAIL_TEMPLATE", "SKIP_OPTIONAL", "USE_FALLBACK_ROLE"]>>;
                    fallbackRoleKeys: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
                    spendingWeight: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
                }, "strip", z.ZodTypeAny, {
                    id: string;
                    conditions: {
                        conditions: {
                            value: string | number | boolean | string[] | null;
                            id: string;
                            operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                            signalKey: string;
                        }[];
                        mode: "ALL" | "ANY";
                    } | null;
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
                    optionalPriority: number;
                    fallbackMode: "FAIL_TEMPLATE" | "SKIP_OPTIONAL" | "USE_FALLBACK_ROLE";
                    fallbackRoleKeys: string[];
                    spendingWeight: number | null;
                }, {
                    id: string;
                    order: number;
                    roleKey: string;
                    period: "AM" | "PM";
                    conditions?: {
                        conditions: {
                            id: string;
                            operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                            signalKey: string;
                            value?: string | number | boolean | string[] | null | undefined;
                        }[];
                        mode: "ALL" | "ANY";
                    } | null | undefined;
                    required?: boolean | undefined;
                    target?: {
                        kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                        keys?: string[] | undefined;
                        ids?: string[] | undefined;
                    } | undefined;
                    preferredProductIds?: string[] | undefined;
                    maxAlternatives?: number | undefined;
                    optionalPriority?: number | undefined;
                    fallbackMode?: "FAIL_TEMPLATE" | "SKIP_OPTIONAL" | "USE_FALLBACK_ROLE" | undefined;
                    fallbackRoleKeys?: string[] | undefined;
                    spendingWeight?: number | null | undefined;
                }>, "many">;
                enabled: z.ZodDefault<z.ZodBoolean>;
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
                domain: string;
                steps: {
                    id: string;
                    conditions: {
                        conditions: {
                            value: string | number | boolean | string[] | null;
                            id: string;
                            operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                            signalKey: string;
                        }[];
                        mode: "ALL" | "ANY";
                    } | null;
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
                    optionalPriority: number;
                    fallbackMode: "FAIL_TEMPLATE" | "SKIP_OPTIONAL" | "USE_FALLBACK_ROLE";
                    fallbackRoleKeys: string[];
                    spendingWeight: number | null;
                }[];
            }, {
                id: string;
                key: string;
                name: {
                    en: string;
                    ar: string;
                };
                domain: string;
                steps: {
                    id: string;
                    order: number;
                    roleKey: string;
                    period: "AM" | "PM";
                    conditions?: {
                        conditions: {
                            id: string;
                            operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                            signalKey: string;
                            value?: string | number | boolean | string[] | null | undefined;
                        }[];
                        mode: "ALL" | "ANY";
                    } | null | undefined;
                    required?: boolean | undefined;
                    target?: {
                        kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                        keys?: string[] | undefined;
                        ids?: string[] | undefined;
                    } | undefined;
                    preferredProductIds?: string[] | undefined;
                    maxAlternatives?: number | undefined;
                    optionalPriority?: number | undefined;
                    fallbackMode?: "FAIL_TEMPLATE" | "SKIP_OPTIONAL" | "USE_FALLBACK_ROLE" | undefined;
                    fallbackRoleKeys?: string[] | undefined;
                    spendingWeight?: number | null | undefined;
                }[];
                description?: {
                    en: string;
                    ar: string;
                } | undefined;
                enabled?: boolean | undefined;
            }>, "many">>;
            fallbackTemplateKey: z.ZodDefault<z.ZodNullable<z.ZodString>>;
            customerChoiceEnabled: z.ZodDefault<z.ZodBoolean>;
            customerChoiceFamilies: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            tags: {
                id: string;
                key: string;
                label: {
                    en: string;
                    ar: string;
                };
                enabled: boolean;
            }[];
            fallbackTemplateKey: string | null;
            families: {
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
                order: number;
                enabled: boolean;
            }[];
            packs: {
                id: string;
                key: string;
                description: {
                    en: string;
                    ar: string;
                };
                createdAt: string | null;
                name: {
                    en: string;
                    ar: string;
                };
                source: "ADMIN" | "BIOREZA" | "IMPORTED";
                version: number;
            }[];
            stepPresets: {
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
                domain: string;
                steps: {
                    id: string;
                    conditions: {
                        conditions: {
                            value: string | number | boolean | string[] | null;
                            id: string;
                            operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                            signalKey: string;
                        }[];
                        mode: "ALL" | "ANY";
                    } | null;
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
                    optionalPriority: number;
                    fallbackMode: "FAIL_TEMPLATE" | "SKIP_OPTIONAL" | "USE_FALLBACK_ROLE";
                    fallbackRoleKeys: string[];
                    spendingWeight: number | null;
                }[];
            }[];
            customerChoiceEnabled: boolean;
            customerChoiceFamilies: string[];
        }, {
            tags?: {
                id: string;
                key: string;
                label: {
                    en: string;
                    ar: string;
                };
                enabled?: boolean | undefined;
            }[] | undefined;
            fallbackTemplateKey?: string | null | undefined;
            families?: {
                id: string;
                key: string;
                name: {
                    en: string;
                    ar: string;
                };
                description?: {
                    en: string;
                    ar: string;
                } | undefined;
                order?: number | undefined;
                enabled?: boolean | undefined;
            }[] | undefined;
            packs?: {
                id: string;
                key: string;
                name: {
                    en: string;
                    ar: string;
                };
                description?: {
                    en: string;
                    ar: string;
                } | undefined;
                createdAt?: string | null | undefined;
                source?: "ADMIN" | "BIOREZA" | "IMPORTED" | undefined;
                version?: number | undefined;
            }[] | undefined;
            stepPresets?: {
                id: string;
                key: string;
                name: {
                    en: string;
                    ar: string;
                };
                domain: string;
                steps: {
                    id: string;
                    order: number;
                    roleKey: string;
                    period: "AM" | "PM";
                    conditions?: {
                        conditions: {
                            id: string;
                            operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                            signalKey: string;
                            value?: string | number | boolean | string[] | null | undefined;
                        }[];
                        mode: "ALL" | "ANY";
                    } | null | undefined;
                    required?: boolean | undefined;
                    target?: {
                        kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                        keys?: string[] | undefined;
                        ids?: string[] | undefined;
                    } | undefined;
                    preferredProductIds?: string[] | undefined;
                    maxAlternatives?: number | undefined;
                    optionalPriority?: number | undefined;
                    fallbackMode?: "FAIL_TEMPLATE" | "SKIP_OPTIONAL" | "USE_FALLBACK_ROLE" | undefined;
                    fallbackRoleKeys?: string[] | undefined;
                    spendingWeight?: number | null | undefined;
                }[];
                description?: {
                    en: string;
                    ar: string;
                } | undefined;
                enabled?: boolean | undefined;
            }[] | undefined;
            customerChoiceEnabled?: boolean | undefined;
            customerChoiceFamilies?: string[] | undefined;
        }>>;
        contextualCompletion: z.ZodDefault<z.ZodObject<{
            enabled: z.ZodDefault<z.ZodBoolean>;
            enabledDomains: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            eligibleAnchorRoles: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            defaultTemplateKeys: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodString>>;
            allowUnavailableAnchorPlanning: z.ZodDefault<z.ZodBoolean>;
            requireApprovedReason: z.ZodDefault<z.ZodBoolean>;
            anchorBoostRules: z.ZodDefault<z.ZodArray<z.ZodObject<{
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
                anchor: z.ZodObject<{
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
                candidate: z.ZodObject<{
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
                channel: z.ZodDefault<z.ZodEnum<["RECOMMENDATION", "MERCHANDISING"]>>;
            }, "strip", z.ZodTypeAny, {
                id: string;
                key: string;
                channel: "RECOMMENDATION" | "MERCHANDISING";
                name: {
                    en: string;
                    ar: string;
                };
                priority: number;
                enabled: boolean;
                score: number;
                anchor: {
                    keys: string[];
                    ids: string[];
                    kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                };
                candidate: {
                    keys: string[];
                    ids: string[];
                    kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                };
            }, {
                id: string;
                key: string;
                name: {
                    en: string;
                    ar: string;
                };
                score: number;
                anchor: {
                    kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                    keys?: string[] | undefined;
                    ids?: string[] | undefined;
                };
                candidate: {
                    kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                    keys?: string[] | undefined;
                    ids?: string[] | undefined;
                };
                channel?: "RECOMMENDATION" | "MERCHANDISING" | undefined;
                priority?: number | undefined;
                enabled?: boolean | undefined;
            }>, "many">>;
            title: z.ZodDefault<z.ZodObject<{
                en: z.ZodString;
                ar: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                en: string;
                ar: string;
            }, {
                en: string;
                ar: string;
            }>>;
            introduction: z.ZodDefault<z.ZodObject<{
                en: z.ZodString;
                ar: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                en: string;
                ar: string;
            }, {
                en: string;
                ar: string;
            }>>;
            unavailableMessage: z.ZodDefault<z.ZodObject<{
                en: z.ZodString;
                ar: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                en: string;
                ar: string;
            }, {
                en: string;
                ar: string;
            }>>;
            anchorExplanation: z.ZodDefault<z.ZodObject<{
                en: z.ZodString;
                ar: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                en: string;
                ar: string;
            }, {
                en: string;
                ar: string;
            }>>;
        }, "strip", z.ZodTypeAny, {
            title: {
                en: string;
                ar: string;
            };
            enabled: boolean;
            enabledDomains: string[];
            eligibleAnchorRoles: string[];
            defaultTemplateKeys: Record<string, string>;
            allowUnavailableAnchorPlanning: boolean;
            requireApprovedReason: boolean;
            anchorBoostRules: {
                id: string;
                key: string;
                channel: "RECOMMENDATION" | "MERCHANDISING";
                name: {
                    en: string;
                    ar: string;
                };
                priority: number;
                enabled: boolean;
                score: number;
                anchor: {
                    keys: string[];
                    ids: string[];
                    kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                };
                candidate: {
                    keys: string[];
                    ids: string[];
                    kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                };
            }[];
            introduction: {
                en: string;
                ar: string;
            };
            unavailableMessage: {
                en: string;
                ar: string;
            };
            anchorExplanation: {
                en: string;
                ar: string;
            };
        }, {
            title?: {
                en: string;
                ar: string;
            } | undefined;
            enabled?: boolean | undefined;
            enabledDomains?: string[] | undefined;
            eligibleAnchorRoles?: string[] | undefined;
            defaultTemplateKeys?: Record<string, string> | undefined;
            allowUnavailableAnchorPlanning?: boolean | undefined;
            requireApprovedReason?: boolean | undefined;
            anchorBoostRules?: {
                id: string;
                key: string;
                name: {
                    en: string;
                    ar: string;
                };
                score: number;
                anchor: {
                    kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                    keys?: string[] | undefined;
                    ids?: string[] | undefined;
                };
                candidate: {
                    kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                    keys?: string[] | undefined;
                    ids?: string[] | undefined;
                };
                channel?: "RECOMMENDATION" | "MERCHANDISING" | undefined;
                priority?: number | undefined;
                enabled?: boolean | undefined;
            }[] | undefined;
            introduction?: {
                en: string;
                ar: string;
            } | undefined;
            unavailableMessage?: {
                en: string;
                ar: string;
            } | undefined;
            anchorExplanation?: {
                en: string;
                ar: string;
            } | undefined;
        }>>;
        settings: z.ZodObject<{
            maximumProductsPerBrand: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
            preferBrandDiversity: z.ZodDefault<z.ZodBoolean>;
            allowDuplicateProducts: z.ZodDefault<z.ZodBoolean>;
            budgetExceeded: z.ZodOptional<z.ZodObject<{
                en: z.ZodString;
                ar: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                en: string;
                ar: string;
            }, {
                en: string;
                ar: string;
            }>>;
        }, "strip", z.ZodTypeAny, {
            maximumProductsPerBrand: number | null;
            preferBrandDiversity: boolean;
            allowDuplicateProducts: boolean;
            budgetExceeded?: {
                en: string;
                ar: string;
            } | undefined;
        }, {
            maximumProductsPerBrand?: number | null | undefined;
            preferBrandDiversity?: boolean | undefined;
            allowDuplicateProducts?: boolean | undefined;
            budgetExceeded?: {
                en: string;
                ar: string;
            } | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        title: {
            en: string;
            ar: string;
        };
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
        schemaVersion: 1 | 2;
        estimatedMinutes: number;
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
            scale: {
                min: number;
                max: number;
                step: number;
            } | null;
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
            modes: ("FULL" | "CONTEXTUAL")[];
            contextualRequired: boolean;
            contextualOrder: number | null;
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
                    weight?: number | undefined;
                }[];
            }[];
            minSelections: number;
            maxSelections: number;
            directSignalKey?: string | null | undefined;
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
            domain: string | null;
            amAllowed: boolean;
            pmAllowed: boolean;
            defaultPriority: number;
        }[];
        rules: {
            id: string;
            key: string;
            name: {
                en: string;
                ar: string;
            };
            priority: number;
            enabled: boolean;
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
                channel?: "RECOMMENDATION" | "MERCHANDISING" | undefined;
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
            priority: number;
            enabled: boolean;
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
            status: "ARCHIVED" | "DRAFT" | "PAUSED" | "SCHEDULED" | "PUBLISHED";
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
            enabled: boolean;
            tags: string[];
            version: number;
            presentation: {
                style: "COMPACT" | "MINIMAL" | "EDITORIAL" | "STEP_BY_STEP" | "DETAILED";
                estimatedMinutes: number | null;
                thumbnailKey: string | null;
                themeKey: string | null;
                intro: {
                    en: string;
                    ar: string;
                };
                outro: {
                    en: string;
                    ar: string;
                };
                customerVisible: boolean;
            };
            domain: string | null;
            steps: {
                id: string;
                conditions: {
                    conditions: {
                        value: string | number | boolean | string[] | null;
                        id: string;
                        operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                        signalKey: string;
                    }[];
                    mode: "ALL" | "ANY";
                } | null;
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
                optionalPriority: number;
                fallbackMode: "FAIL_TEMPLATE" | "SKIP_OPTIONAL" | "USE_FALLBACK_ROLE";
                fallbackRoleKeys: string[];
                spendingWeight: number | null;
            }[];
            familyKey: string | null;
            complexity: string | null;
            packKey: string | null;
            baseTemplateKey: string | null;
            variant: {
                kind: "CATEGORY" | "BRAND" | "CONCERN" | "CUSTOM" | "BASE" | "SKIN_TYPE" | "COMPLEXITY" | "BUDGET" | "SEASONAL" | "LIFESTYLE" | "ANCHOR_ROLE";
                parameters: Record<string, string | number | boolean | string[]>;
            };
            hardEligibility: {
                conditions: {
                    value: string | number | boolean | string[] | null;
                    id: string;
                    operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                    signalKey: string;
                }[];
                mode: "ALL" | "ANY";
            } | null;
            selectionRules: {
                id: string;
                name: {
                    en: string;
                    ar: string;
                };
                score: number;
                when: {
                    conditions: {
                        value: string | number | boolean | string[] | null;
                        id: string;
                        operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                        signalKey: string;
                    }[];
                    mode: "ALL" | "ANY";
                };
            }[];
            allowedAnchorRoles: string[];
            budgetPolicy: {
                maximum: number | null;
                mode: "IGNORE" | "RESPECT_CUSTOMER" | "HARD" | "SOFT";
            } | null;
            fallbackPolicy: {
                requiredStep: "FAIL_TEMPLATE" | "USE_STEP_FALLBACK";
                optionalStep: "SKIP";
                fallbackTemplateKey: string | null;
            } | null;
            compatibilityPolicy: "STANDARD" | "STRICT";
            brandConstraint: {
                mode: "NONE" | "PREFERRED" | "ONLY";
                entityId: string | null;
                parameterized: boolean;
            };
            categoryConstraint: {
                mode: "NONE" | "PREFERRED" | "ONLY";
                entityId: string | null;
                parameterized: boolean;
            };
            schedule: {
                startsAt: string | null;
                endsAt: string | null;
            };
            pinned: boolean;
            internalName?: string | undefined;
        }[];
        templateUniverse: {
            tags: {
                id: string;
                key: string;
                label: {
                    en: string;
                    ar: string;
                };
                enabled: boolean;
            }[];
            fallbackTemplateKey: string | null;
            families: {
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
                order: number;
                enabled: boolean;
            }[];
            packs: {
                id: string;
                key: string;
                description: {
                    en: string;
                    ar: string;
                };
                createdAt: string | null;
                name: {
                    en: string;
                    ar: string;
                };
                source: "ADMIN" | "BIOREZA" | "IMPORTED";
                version: number;
            }[];
            stepPresets: {
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
                domain: string;
                steps: {
                    id: string;
                    conditions: {
                        conditions: {
                            value: string | number | boolean | string[] | null;
                            id: string;
                            operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                            signalKey: string;
                        }[];
                        mode: "ALL" | "ANY";
                    } | null;
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
                    optionalPriority: number;
                    fallbackMode: "FAIL_TEMPLATE" | "SKIP_OPTIONAL" | "USE_FALLBACK_ROLE";
                    fallbackRoleKeys: string[];
                    spendingWeight: number | null;
                }[];
            }[];
            customerChoiceEnabled: boolean;
            customerChoiceFamilies: string[];
        };
        contextualCompletion: {
            title: {
                en: string;
                ar: string;
            };
            enabled: boolean;
            enabledDomains: string[];
            eligibleAnchorRoles: string[];
            defaultTemplateKeys: Record<string, string>;
            allowUnavailableAnchorPlanning: boolean;
            requireApprovedReason: boolean;
            anchorBoostRules: {
                id: string;
                key: string;
                channel: "RECOMMENDATION" | "MERCHANDISING";
                name: {
                    en: string;
                    ar: string;
                };
                priority: number;
                enabled: boolean;
                score: number;
                anchor: {
                    keys: string[];
                    ids: string[];
                    kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                };
                candidate: {
                    keys: string[];
                    ids: string[];
                    kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                };
            }[];
            introduction: {
                en: string;
                ar: string;
            };
            unavailableMessage: {
                en: string;
                ar: string;
            };
            anchorExplanation: {
                en: string;
                ar: string;
            };
        };
        settings: {
            maximumProductsPerBrand: number | null;
            preferBrandDiversity: boolean;
            allowDuplicateProducts: boolean;
            budgetExceeded?: {
                en: string;
                ar: string;
            } | undefined;
        };
        signals?: {
            id: string;
            key: string;
            description: {
                en: string;
                ar: string;
            };
            purpose: "PROFILE" | "BUDGET_MAX" | "OWNED_ROLE";
            label: {
                en: string;
                ar: string;
            };
            enabled: boolean;
            family: string;
            valueType: "NUMBER" | "BOOLEAN" | "KEYWORD" | "KEYWORD_LIST";
            aggregation: "SUM" | "MAX" | "LAST";
        }[] | undefined;
    }, {
        title: {
            en: string;
            ar: string;
        };
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
        schemaVersion: 1 | 2;
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
            scale?: {
                min: number;
                max: number;
                step: number;
            } | null | undefined;
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
            modes?: ("FULL" | "CONTEXTUAL")[] | undefined;
            contextualRequired?: boolean | undefined;
            contextualOrder?: number | null | undefined;
            directSignalKey?: string | null | undefined;
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
                    weight?: number | undefined;
                }[] | undefined;
            }[] | undefined;
            minSelections?: number | undefined;
            maxSelections?: number | undefined;
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
            domain?: string | null | undefined;
            amAllowed?: boolean | undefined;
            pmAllowed?: boolean | undefined;
            defaultPriority?: number | undefined;
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
                channel?: "RECOMMENDATION" | "MERCHANDISING" | undefined;
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
            priority?: number | undefined;
            enabled?: boolean | undefined;
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
            priority?: number | undefined;
            enabled?: boolean | undefined;
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
                conditions?: {
                    conditions: {
                        id: string;
                        operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                        signalKey: string;
                        value?: string | number | boolean | string[] | null | undefined;
                    }[];
                    mode: "ALL" | "ANY";
                } | null | undefined;
                required?: boolean | undefined;
                target?: {
                    kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                    keys?: string[] | undefined;
                    ids?: string[] | undefined;
                } | undefined;
                preferredProductIds?: string[] | undefined;
                maxAlternatives?: number | undefined;
                optionalPriority?: number | undefined;
                fallbackMode?: "FAIL_TEMPLATE" | "SKIP_OPTIONAL" | "USE_FALLBACK_ROLE" | undefined;
                fallbackRoleKeys?: string[] | undefined;
                spendingWeight?: number | null | undefined;
            }[];
            status?: "ARCHIVED" | "DRAFT" | "PAUSED" | "SCHEDULED" | "PUBLISHED" | undefined;
            description?: {
                en: string;
                ar: string;
            } | undefined;
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
            enabled?: boolean | undefined;
            tags?: string[] | undefined;
            version?: number | undefined;
            presentation?: {
                style?: "COMPACT" | "MINIMAL" | "EDITORIAL" | "STEP_BY_STEP" | "DETAILED" | undefined;
                estimatedMinutes?: number | null | undefined;
                thumbnailKey?: string | null | undefined;
                themeKey?: string | null | undefined;
                intro?: {
                    en: string;
                    ar: string;
                } | undefined;
                outro?: {
                    en: string;
                    ar: string;
                } | undefined;
                customerVisible?: boolean | undefined;
            } | undefined;
            domain?: string | null | undefined;
            internalName?: string | undefined;
            familyKey?: string | null | undefined;
            complexity?: string | null | undefined;
            packKey?: string | null | undefined;
            baseTemplateKey?: string | null | undefined;
            variant?: {
                kind?: "CATEGORY" | "BRAND" | "CONCERN" | "CUSTOM" | "BASE" | "SKIN_TYPE" | "COMPLEXITY" | "BUDGET" | "SEASONAL" | "LIFESTYLE" | "ANCHOR_ROLE" | undefined;
                parameters?: Record<string, string | number | boolean | string[]> | undefined;
            } | undefined;
            hardEligibility?: {
                conditions: {
                    id: string;
                    operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                    signalKey: string;
                    value?: string | number | boolean | string[] | null | undefined;
                }[];
                mode: "ALL" | "ANY";
            } | null | undefined;
            selectionRules?: {
                id: string;
                name: {
                    en: string;
                    ar: string;
                };
                score: number;
                when: {
                    conditions: {
                        id: string;
                        operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                        signalKey: string;
                        value?: string | number | boolean | string[] | null | undefined;
                    }[];
                    mode: "ALL" | "ANY";
                };
            }[] | undefined;
            allowedAnchorRoles?: string[] | undefined;
            budgetPolicy?: {
                maximum?: number | null | undefined;
                mode?: "IGNORE" | "RESPECT_CUSTOMER" | "HARD" | "SOFT" | undefined;
            } | null | undefined;
            fallbackPolicy?: {
                requiredStep?: "FAIL_TEMPLATE" | "USE_STEP_FALLBACK" | undefined;
                optionalStep?: "SKIP" | undefined;
                fallbackTemplateKey?: string | null | undefined;
            } | null | undefined;
            compatibilityPolicy?: "STANDARD" | "STRICT" | undefined;
            brandConstraint?: {
                mode?: "NONE" | "PREFERRED" | "ONLY" | undefined;
                entityId?: string | null | undefined;
                parameterized?: boolean | undefined;
            } | undefined;
            categoryConstraint?: {
                mode?: "NONE" | "PREFERRED" | "ONLY" | undefined;
                entityId?: string | null | undefined;
                parameterized?: boolean | undefined;
            } | undefined;
            schedule?: {
                startsAt?: string | null | undefined;
                endsAt?: string | null | undefined;
            } | undefined;
            pinned?: boolean | undefined;
        }[];
        settings: {
            maximumProductsPerBrand?: number | null | undefined;
            preferBrandDiversity?: boolean | undefined;
            allowDuplicateProducts?: boolean | undefined;
            budgetExceeded?: {
                en: string;
                ar: string;
            } | undefined;
        };
        signals?: {
            id: string;
            key: string;
            label: {
                en: string;
                ar: string;
            };
            family: string;
            description?: {
                en: string;
                ar: string;
            } | undefined;
            purpose?: "PROFILE" | "BUDGET_MAX" | "OWNED_ROLE" | undefined;
            enabled?: boolean | undefined;
            valueType?: "NUMBER" | "BOOLEAN" | "KEYWORD" | "KEYWORD_LIST" | undefined;
            aggregation?: "SUM" | "MAX" | "LAST" | undefined;
        }[] | undefined;
        estimatedMinutes?: number | undefined;
        templateUniverse?: {
            tags?: {
                id: string;
                key: string;
                label: {
                    en: string;
                    ar: string;
                };
                enabled?: boolean | undefined;
            }[] | undefined;
            fallbackTemplateKey?: string | null | undefined;
            families?: {
                id: string;
                key: string;
                name: {
                    en: string;
                    ar: string;
                };
                description?: {
                    en: string;
                    ar: string;
                } | undefined;
                order?: number | undefined;
                enabled?: boolean | undefined;
            }[] | undefined;
            packs?: {
                id: string;
                key: string;
                name: {
                    en: string;
                    ar: string;
                };
                description?: {
                    en: string;
                    ar: string;
                } | undefined;
                createdAt?: string | null | undefined;
                source?: "ADMIN" | "BIOREZA" | "IMPORTED" | undefined;
                version?: number | undefined;
            }[] | undefined;
            stepPresets?: {
                id: string;
                key: string;
                name: {
                    en: string;
                    ar: string;
                };
                domain: string;
                steps: {
                    id: string;
                    order: number;
                    roleKey: string;
                    period: "AM" | "PM";
                    conditions?: {
                        conditions: {
                            id: string;
                            operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                            signalKey: string;
                            value?: string | number | boolean | string[] | null | undefined;
                        }[];
                        mode: "ALL" | "ANY";
                    } | null | undefined;
                    required?: boolean | undefined;
                    target?: {
                        kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                        keys?: string[] | undefined;
                        ids?: string[] | undefined;
                    } | undefined;
                    preferredProductIds?: string[] | undefined;
                    maxAlternatives?: number | undefined;
                    optionalPriority?: number | undefined;
                    fallbackMode?: "FAIL_TEMPLATE" | "SKIP_OPTIONAL" | "USE_FALLBACK_ROLE" | undefined;
                    fallbackRoleKeys?: string[] | undefined;
                    spendingWeight?: number | null | undefined;
                }[];
                description?: {
                    en: string;
                    ar: string;
                } | undefined;
                enabled?: boolean | undefined;
            }[] | undefined;
            customerChoiceEnabled?: boolean | undefined;
            customerChoiceFamilies?: string[] | undefined;
        } | undefined;
        contextualCompletion?: {
            title?: {
                en: string;
                ar: string;
            } | undefined;
            enabled?: boolean | undefined;
            enabledDomains?: string[] | undefined;
            eligibleAnchorRoles?: string[] | undefined;
            defaultTemplateKeys?: Record<string, string> | undefined;
            allowUnavailableAnchorPlanning?: boolean | undefined;
            requireApprovedReason?: boolean | undefined;
            anchorBoostRules?: {
                id: string;
                key: string;
                name: {
                    en: string;
                    ar: string;
                };
                score: number;
                anchor: {
                    kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                    keys?: string[] | undefined;
                    ids?: string[] | undefined;
                };
                candidate: {
                    kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                    keys?: string[] | undefined;
                    ids?: string[] | undefined;
                };
                channel?: "RECOMMENDATION" | "MERCHANDISING" | undefined;
                priority?: number | undefined;
                enabled?: boolean | undefined;
            }[] | undefined;
            introduction?: {
                en: string;
                ar: string;
            } | undefined;
            unavailableMessage?: {
                en: string;
                ar: string;
            } | undefined;
            anchorExplanation?: {
                en: string;
                ar: string;
            } | undefined;
        } | undefined;
    }>, {
        title: {
            en: string;
            ar: string;
        };
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
        schemaVersion: 1 | 2;
        estimatedMinutes: number;
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
            scale: {
                min: number;
                max: number;
                step: number;
            } | null;
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
            modes: ("FULL" | "CONTEXTUAL")[];
            contextualRequired: boolean;
            contextualOrder: number | null;
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
                    weight?: number | undefined;
                }[];
            }[];
            minSelections: number;
            maxSelections: number;
            directSignalKey?: string | null | undefined;
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
            domain: string | null;
            amAllowed: boolean;
            pmAllowed: boolean;
            defaultPriority: number;
        }[];
        rules: {
            id: string;
            key: string;
            name: {
                en: string;
                ar: string;
            };
            priority: number;
            enabled: boolean;
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
                channel?: "RECOMMENDATION" | "MERCHANDISING" | undefined;
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
            priority: number;
            enabled: boolean;
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
            status: "ARCHIVED" | "DRAFT" | "PAUSED" | "SCHEDULED" | "PUBLISHED";
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
            enabled: boolean;
            tags: string[];
            version: number;
            presentation: {
                style: "COMPACT" | "MINIMAL" | "EDITORIAL" | "STEP_BY_STEP" | "DETAILED";
                estimatedMinutes: number | null;
                thumbnailKey: string | null;
                themeKey: string | null;
                intro: {
                    en: string;
                    ar: string;
                };
                outro: {
                    en: string;
                    ar: string;
                };
                customerVisible: boolean;
            };
            domain: string | null;
            steps: {
                id: string;
                conditions: {
                    conditions: {
                        value: string | number | boolean | string[] | null;
                        id: string;
                        operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                        signalKey: string;
                    }[];
                    mode: "ALL" | "ANY";
                } | null;
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
                optionalPriority: number;
                fallbackMode: "FAIL_TEMPLATE" | "SKIP_OPTIONAL" | "USE_FALLBACK_ROLE";
                fallbackRoleKeys: string[];
                spendingWeight: number | null;
            }[];
            familyKey: string | null;
            complexity: string | null;
            packKey: string | null;
            baseTemplateKey: string | null;
            variant: {
                kind: "CATEGORY" | "BRAND" | "CONCERN" | "CUSTOM" | "BASE" | "SKIN_TYPE" | "COMPLEXITY" | "BUDGET" | "SEASONAL" | "LIFESTYLE" | "ANCHOR_ROLE";
                parameters: Record<string, string | number | boolean | string[]>;
            };
            hardEligibility: {
                conditions: {
                    value: string | number | boolean | string[] | null;
                    id: string;
                    operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                    signalKey: string;
                }[];
                mode: "ALL" | "ANY";
            } | null;
            selectionRules: {
                id: string;
                name: {
                    en: string;
                    ar: string;
                };
                score: number;
                when: {
                    conditions: {
                        value: string | number | boolean | string[] | null;
                        id: string;
                        operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                        signalKey: string;
                    }[];
                    mode: "ALL" | "ANY";
                };
            }[];
            allowedAnchorRoles: string[];
            budgetPolicy: {
                maximum: number | null;
                mode: "IGNORE" | "RESPECT_CUSTOMER" | "HARD" | "SOFT";
            } | null;
            fallbackPolicy: {
                requiredStep: "FAIL_TEMPLATE" | "USE_STEP_FALLBACK";
                optionalStep: "SKIP";
                fallbackTemplateKey: string | null;
            } | null;
            compatibilityPolicy: "STANDARD" | "STRICT";
            brandConstraint: {
                mode: "NONE" | "PREFERRED" | "ONLY";
                entityId: string | null;
                parameterized: boolean;
            };
            categoryConstraint: {
                mode: "NONE" | "PREFERRED" | "ONLY";
                entityId: string | null;
                parameterized: boolean;
            };
            schedule: {
                startsAt: string | null;
                endsAt: string | null;
            };
            pinned: boolean;
            internalName?: string | undefined;
        }[];
        templateUniverse: {
            tags: {
                id: string;
                key: string;
                label: {
                    en: string;
                    ar: string;
                };
                enabled: boolean;
            }[];
            fallbackTemplateKey: string | null;
            families: {
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
                order: number;
                enabled: boolean;
            }[];
            packs: {
                id: string;
                key: string;
                description: {
                    en: string;
                    ar: string;
                };
                createdAt: string | null;
                name: {
                    en: string;
                    ar: string;
                };
                source: "ADMIN" | "BIOREZA" | "IMPORTED";
                version: number;
            }[];
            stepPresets: {
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
                domain: string;
                steps: {
                    id: string;
                    conditions: {
                        conditions: {
                            value: string | number | boolean | string[] | null;
                            id: string;
                            operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                            signalKey: string;
                        }[];
                        mode: "ALL" | "ANY";
                    } | null;
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
                    optionalPriority: number;
                    fallbackMode: "FAIL_TEMPLATE" | "SKIP_OPTIONAL" | "USE_FALLBACK_ROLE";
                    fallbackRoleKeys: string[];
                    spendingWeight: number | null;
                }[];
            }[];
            customerChoiceEnabled: boolean;
            customerChoiceFamilies: string[];
        };
        contextualCompletion: {
            title: {
                en: string;
                ar: string;
            };
            enabled: boolean;
            enabledDomains: string[];
            eligibleAnchorRoles: string[];
            defaultTemplateKeys: Record<string, string>;
            allowUnavailableAnchorPlanning: boolean;
            requireApprovedReason: boolean;
            anchorBoostRules: {
                id: string;
                key: string;
                channel: "RECOMMENDATION" | "MERCHANDISING";
                name: {
                    en: string;
                    ar: string;
                };
                priority: number;
                enabled: boolean;
                score: number;
                anchor: {
                    keys: string[];
                    ids: string[];
                    kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                };
                candidate: {
                    keys: string[];
                    ids: string[];
                    kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                };
            }[];
            introduction: {
                en: string;
                ar: string;
            };
            unavailableMessage: {
                en: string;
                ar: string;
            };
            anchorExplanation: {
                en: string;
                ar: string;
            };
        };
        settings: {
            maximumProductsPerBrand: number | null;
            preferBrandDiversity: boolean;
            allowDuplicateProducts: boolean;
            budgetExceeded?: {
                en: string;
                ar: string;
            } | undefined;
        };
        signals?: {
            id: string;
            key: string;
            description: {
                en: string;
                ar: string;
            };
            purpose: "PROFILE" | "BUDGET_MAX" | "OWNED_ROLE";
            label: {
                en: string;
                ar: string;
            };
            enabled: boolean;
            family: string;
            valueType: "NUMBER" | "BOOLEAN" | "KEYWORD" | "KEYWORD_LIST";
            aggregation: "SUM" | "MAX" | "LAST";
        }[] | undefined;
    }, {
        title: {
            en: string;
            ar: string;
        };
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
        schemaVersion: 1 | 2;
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
            scale?: {
                min: number;
                max: number;
                step: number;
            } | null | undefined;
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
            modes?: ("FULL" | "CONTEXTUAL")[] | undefined;
            contextualRequired?: boolean | undefined;
            contextualOrder?: number | null | undefined;
            directSignalKey?: string | null | undefined;
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
                    weight?: number | undefined;
                }[] | undefined;
            }[] | undefined;
            minSelections?: number | undefined;
            maxSelections?: number | undefined;
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
            domain?: string | null | undefined;
            amAllowed?: boolean | undefined;
            pmAllowed?: boolean | undefined;
            defaultPriority?: number | undefined;
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
                channel?: "RECOMMENDATION" | "MERCHANDISING" | undefined;
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
            priority?: number | undefined;
            enabled?: boolean | undefined;
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
            priority?: number | undefined;
            enabled?: boolean | undefined;
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
                conditions?: {
                    conditions: {
                        id: string;
                        operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                        signalKey: string;
                        value?: string | number | boolean | string[] | null | undefined;
                    }[];
                    mode: "ALL" | "ANY";
                } | null | undefined;
                required?: boolean | undefined;
                target?: {
                    kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                    keys?: string[] | undefined;
                    ids?: string[] | undefined;
                } | undefined;
                preferredProductIds?: string[] | undefined;
                maxAlternatives?: number | undefined;
                optionalPriority?: number | undefined;
                fallbackMode?: "FAIL_TEMPLATE" | "SKIP_OPTIONAL" | "USE_FALLBACK_ROLE" | undefined;
                fallbackRoleKeys?: string[] | undefined;
                spendingWeight?: number | null | undefined;
            }[];
            status?: "ARCHIVED" | "DRAFT" | "PAUSED" | "SCHEDULED" | "PUBLISHED" | undefined;
            description?: {
                en: string;
                ar: string;
            } | undefined;
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
            enabled?: boolean | undefined;
            tags?: string[] | undefined;
            version?: number | undefined;
            presentation?: {
                style?: "COMPACT" | "MINIMAL" | "EDITORIAL" | "STEP_BY_STEP" | "DETAILED" | undefined;
                estimatedMinutes?: number | null | undefined;
                thumbnailKey?: string | null | undefined;
                themeKey?: string | null | undefined;
                intro?: {
                    en: string;
                    ar: string;
                } | undefined;
                outro?: {
                    en: string;
                    ar: string;
                } | undefined;
                customerVisible?: boolean | undefined;
            } | undefined;
            domain?: string | null | undefined;
            internalName?: string | undefined;
            familyKey?: string | null | undefined;
            complexity?: string | null | undefined;
            packKey?: string | null | undefined;
            baseTemplateKey?: string | null | undefined;
            variant?: {
                kind?: "CATEGORY" | "BRAND" | "CONCERN" | "CUSTOM" | "BASE" | "SKIN_TYPE" | "COMPLEXITY" | "BUDGET" | "SEASONAL" | "LIFESTYLE" | "ANCHOR_ROLE" | undefined;
                parameters?: Record<string, string | number | boolean | string[]> | undefined;
            } | undefined;
            hardEligibility?: {
                conditions: {
                    id: string;
                    operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                    signalKey: string;
                    value?: string | number | boolean | string[] | null | undefined;
                }[];
                mode: "ALL" | "ANY";
            } | null | undefined;
            selectionRules?: {
                id: string;
                name: {
                    en: string;
                    ar: string;
                };
                score: number;
                when: {
                    conditions: {
                        id: string;
                        operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                        signalKey: string;
                        value?: string | number | boolean | string[] | null | undefined;
                    }[];
                    mode: "ALL" | "ANY";
                };
            }[] | undefined;
            allowedAnchorRoles?: string[] | undefined;
            budgetPolicy?: {
                maximum?: number | null | undefined;
                mode?: "IGNORE" | "RESPECT_CUSTOMER" | "HARD" | "SOFT" | undefined;
            } | null | undefined;
            fallbackPolicy?: {
                requiredStep?: "FAIL_TEMPLATE" | "USE_STEP_FALLBACK" | undefined;
                optionalStep?: "SKIP" | undefined;
                fallbackTemplateKey?: string | null | undefined;
            } | null | undefined;
            compatibilityPolicy?: "STANDARD" | "STRICT" | undefined;
            brandConstraint?: {
                mode?: "NONE" | "PREFERRED" | "ONLY" | undefined;
                entityId?: string | null | undefined;
                parameterized?: boolean | undefined;
            } | undefined;
            categoryConstraint?: {
                mode?: "NONE" | "PREFERRED" | "ONLY" | undefined;
                entityId?: string | null | undefined;
                parameterized?: boolean | undefined;
            } | undefined;
            schedule?: {
                startsAt?: string | null | undefined;
                endsAt?: string | null | undefined;
            } | undefined;
            pinned?: boolean | undefined;
        }[];
        settings: {
            maximumProductsPerBrand?: number | null | undefined;
            preferBrandDiversity?: boolean | undefined;
            allowDuplicateProducts?: boolean | undefined;
            budgetExceeded?: {
                en: string;
                ar: string;
            } | undefined;
        };
        signals?: {
            id: string;
            key: string;
            label: {
                en: string;
                ar: string;
            };
            family: string;
            description?: {
                en: string;
                ar: string;
            } | undefined;
            purpose?: "PROFILE" | "BUDGET_MAX" | "OWNED_ROLE" | undefined;
            enabled?: boolean | undefined;
            valueType?: "NUMBER" | "BOOLEAN" | "KEYWORD" | "KEYWORD_LIST" | undefined;
            aggregation?: "SUM" | "MAX" | "LAST" | undefined;
        }[] | undefined;
        estimatedMinutes?: number | undefined;
        templateUniverse?: {
            tags?: {
                id: string;
                key: string;
                label: {
                    en: string;
                    ar: string;
                };
                enabled?: boolean | undefined;
            }[] | undefined;
            fallbackTemplateKey?: string | null | undefined;
            families?: {
                id: string;
                key: string;
                name: {
                    en: string;
                    ar: string;
                };
                description?: {
                    en: string;
                    ar: string;
                } | undefined;
                order?: number | undefined;
                enabled?: boolean | undefined;
            }[] | undefined;
            packs?: {
                id: string;
                key: string;
                name: {
                    en: string;
                    ar: string;
                };
                description?: {
                    en: string;
                    ar: string;
                } | undefined;
                createdAt?: string | null | undefined;
                source?: "ADMIN" | "BIOREZA" | "IMPORTED" | undefined;
                version?: number | undefined;
            }[] | undefined;
            stepPresets?: {
                id: string;
                key: string;
                name: {
                    en: string;
                    ar: string;
                };
                domain: string;
                steps: {
                    id: string;
                    order: number;
                    roleKey: string;
                    period: "AM" | "PM";
                    conditions?: {
                        conditions: {
                            id: string;
                            operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                            signalKey: string;
                            value?: string | number | boolean | string[] | null | undefined;
                        }[];
                        mode: "ALL" | "ANY";
                    } | null | undefined;
                    required?: boolean | undefined;
                    target?: {
                        kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                        keys?: string[] | undefined;
                        ids?: string[] | undefined;
                    } | undefined;
                    preferredProductIds?: string[] | undefined;
                    maxAlternatives?: number | undefined;
                    optionalPriority?: number | undefined;
                    fallbackMode?: "FAIL_TEMPLATE" | "SKIP_OPTIONAL" | "USE_FALLBACK_ROLE" | undefined;
                    fallbackRoleKeys?: string[] | undefined;
                    spendingWeight?: number | null | undefined;
                }[];
                description?: {
                    en: string;
                    ar: string;
                } | undefined;
                enabled?: boolean | undefined;
            }[] | undefined;
            customerChoiceEnabled?: boolean | undefined;
            customerChoiceFamilies?: string[] | undefined;
        } | undefined;
        contextualCompletion?: {
            title?: {
                en: string;
                ar: string;
            } | undefined;
            enabled?: boolean | undefined;
            enabledDomains?: string[] | undefined;
            eligibleAnchorRoles?: string[] | undefined;
            defaultTemplateKeys?: Record<string, string> | undefined;
            allowUnavailableAnchorPlanning?: boolean | undefined;
            requireApprovedReason?: boolean | undefined;
            anchorBoostRules?: {
                id: string;
                key: string;
                name: {
                    en: string;
                    ar: string;
                };
                score: number;
                anchor: {
                    kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                    keys?: string[] | undefined;
                    ids?: string[] | undefined;
                };
                candidate: {
                    kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                    keys?: string[] | undefined;
                    ids?: string[] | undefined;
                };
                channel?: "RECOMMENDATION" | "MERCHANDISING" | undefined;
                priority?: number | undefined;
                enabled?: boolean | undefined;
            }[] | undefined;
            introduction?: {
                en: string;
                ar: string;
            } | undefined;
            unavailableMessage?: {
                en: string;
                ar: string;
            } | undefined;
            anchorExplanation?: {
                en: string;
                ar: string;
            } | undefined;
        } | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    expectedRevision: number;
    config: {
        title: {
            en: string;
            ar: string;
        };
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
        schemaVersion: 1 | 2;
        estimatedMinutes: number;
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
            scale: {
                min: number;
                max: number;
                step: number;
            } | null;
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
            modes: ("FULL" | "CONTEXTUAL")[];
            contextualRequired: boolean;
            contextualOrder: number | null;
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
                    weight?: number | undefined;
                }[];
            }[];
            minSelections: number;
            maxSelections: number;
            directSignalKey?: string | null | undefined;
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
            domain: string | null;
            amAllowed: boolean;
            pmAllowed: boolean;
            defaultPriority: number;
        }[];
        rules: {
            id: string;
            key: string;
            name: {
                en: string;
                ar: string;
            };
            priority: number;
            enabled: boolean;
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
                channel?: "RECOMMENDATION" | "MERCHANDISING" | undefined;
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
            priority: number;
            enabled: boolean;
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
            status: "ARCHIVED" | "DRAFT" | "PAUSED" | "SCHEDULED" | "PUBLISHED";
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
            enabled: boolean;
            tags: string[];
            version: number;
            presentation: {
                style: "COMPACT" | "MINIMAL" | "EDITORIAL" | "STEP_BY_STEP" | "DETAILED";
                estimatedMinutes: number | null;
                thumbnailKey: string | null;
                themeKey: string | null;
                intro: {
                    en: string;
                    ar: string;
                };
                outro: {
                    en: string;
                    ar: string;
                };
                customerVisible: boolean;
            };
            domain: string | null;
            steps: {
                id: string;
                conditions: {
                    conditions: {
                        value: string | number | boolean | string[] | null;
                        id: string;
                        operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                        signalKey: string;
                    }[];
                    mode: "ALL" | "ANY";
                } | null;
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
                optionalPriority: number;
                fallbackMode: "FAIL_TEMPLATE" | "SKIP_OPTIONAL" | "USE_FALLBACK_ROLE";
                fallbackRoleKeys: string[];
                spendingWeight: number | null;
            }[];
            familyKey: string | null;
            complexity: string | null;
            packKey: string | null;
            baseTemplateKey: string | null;
            variant: {
                kind: "CATEGORY" | "BRAND" | "CONCERN" | "CUSTOM" | "BASE" | "SKIN_TYPE" | "COMPLEXITY" | "BUDGET" | "SEASONAL" | "LIFESTYLE" | "ANCHOR_ROLE";
                parameters: Record<string, string | number | boolean | string[]>;
            };
            hardEligibility: {
                conditions: {
                    value: string | number | boolean | string[] | null;
                    id: string;
                    operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                    signalKey: string;
                }[];
                mode: "ALL" | "ANY";
            } | null;
            selectionRules: {
                id: string;
                name: {
                    en: string;
                    ar: string;
                };
                score: number;
                when: {
                    conditions: {
                        value: string | number | boolean | string[] | null;
                        id: string;
                        operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                        signalKey: string;
                    }[];
                    mode: "ALL" | "ANY";
                };
            }[];
            allowedAnchorRoles: string[];
            budgetPolicy: {
                maximum: number | null;
                mode: "IGNORE" | "RESPECT_CUSTOMER" | "HARD" | "SOFT";
            } | null;
            fallbackPolicy: {
                requiredStep: "FAIL_TEMPLATE" | "USE_STEP_FALLBACK";
                optionalStep: "SKIP";
                fallbackTemplateKey: string | null;
            } | null;
            compatibilityPolicy: "STANDARD" | "STRICT";
            brandConstraint: {
                mode: "NONE" | "PREFERRED" | "ONLY";
                entityId: string | null;
                parameterized: boolean;
            };
            categoryConstraint: {
                mode: "NONE" | "PREFERRED" | "ONLY";
                entityId: string | null;
                parameterized: boolean;
            };
            schedule: {
                startsAt: string | null;
                endsAt: string | null;
            };
            pinned: boolean;
            internalName?: string | undefined;
        }[];
        templateUniverse: {
            tags: {
                id: string;
                key: string;
                label: {
                    en: string;
                    ar: string;
                };
                enabled: boolean;
            }[];
            fallbackTemplateKey: string | null;
            families: {
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
                order: number;
                enabled: boolean;
            }[];
            packs: {
                id: string;
                key: string;
                description: {
                    en: string;
                    ar: string;
                };
                createdAt: string | null;
                name: {
                    en: string;
                    ar: string;
                };
                source: "ADMIN" | "BIOREZA" | "IMPORTED";
                version: number;
            }[];
            stepPresets: {
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
                domain: string;
                steps: {
                    id: string;
                    conditions: {
                        conditions: {
                            value: string | number | boolean | string[] | null;
                            id: string;
                            operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                            signalKey: string;
                        }[];
                        mode: "ALL" | "ANY";
                    } | null;
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
                    optionalPriority: number;
                    fallbackMode: "FAIL_TEMPLATE" | "SKIP_OPTIONAL" | "USE_FALLBACK_ROLE";
                    fallbackRoleKeys: string[];
                    spendingWeight: number | null;
                }[];
            }[];
            customerChoiceEnabled: boolean;
            customerChoiceFamilies: string[];
        };
        contextualCompletion: {
            title: {
                en: string;
                ar: string;
            };
            enabled: boolean;
            enabledDomains: string[];
            eligibleAnchorRoles: string[];
            defaultTemplateKeys: Record<string, string>;
            allowUnavailableAnchorPlanning: boolean;
            requireApprovedReason: boolean;
            anchorBoostRules: {
                id: string;
                key: string;
                channel: "RECOMMENDATION" | "MERCHANDISING";
                name: {
                    en: string;
                    ar: string;
                };
                priority: number;
                enabled: boolean;
                score: number;
                anchor: {
                    keys: string[];
                    ids: string[];
                    kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                };
                candidate: {
                    keys: string[];
                    ids: string[];
                    kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                };
            }[];
            introduction: {
                en: string;
                ar: string;
            };
            unavailableMessage: {
                en: string;
                ar: string;
            };
            anchorExplanation: {
                en: string;
                ar: string;
            };
        };
        settings: {
            maximumProductsPerBrand: number | null;
            preferBrandDiversity: boolean;
            allowDuplicateProducts: boolean;
            budgetExceeded?: {
                en: string;
                ar: string;
            } | undefined;
        };
        signals?: {
            id: string;
            key: string;
            description: {
                en: string;
                ar: string;
            };
            purpose: "PROFILE" | "BUDGET_MAX" | "OWNED_ROLE";
            label: {
                en: string;
                ar: string;
            };
            enabled: boolean;
            family: string;
            valueType: "NUMBER" | "BOOLEAN" | "KEYWORD" | "KEYWORD_LIST";
            aggregation: "SUM" | "MAX" | "LAST";
        }[] | undefined;
    };
}, {
    expectedRevision: number;
    config: {
        title: {
            en: string;
            ar: string;
        };
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
        schemaVersion: 1 | 2;
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
            scale?: {
                min: number;
                max: number;
                step: number;
            } | null | undefined;
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
            modes?: ("FULL" | "CONTEXTUAL")[] | undefined;
            contextualRequired?: boolean | undefined;
            contextualOrder?: number | null | undefined;
            directSignalKey?: string | null | undefined;
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
                    weight?: number | undefined;
                }[] | undefined;
            }[] | undefined;
            minSelections?: number | undefined;
            maxSelections?: number | undefined;
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
            domain?: string | null | undefined;
            amAllowed?: boolean | undefined;
            pmAllowed?: boolean | undefined;
            defaultPriority?: number | undefined;
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
                channel?: "RECOMMENDATION" | "MERCHANDISING" | undefined;
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
            priority?: number | undefined;
            enabled?: boolean | undefined;
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
            priority?: number | undefined;
            enabled?: boolean | undefined;
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
                conditions?: {
                    conditions: {
                        id: string;
                        operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                        signalKey: string;
                        value?: string | number | boolean | string[] | null | undefined;
                    }[];
                    mode: "ALL" | "ANY";
                } | null | undefined;
                required?: boolean | undefined;
                target?: {
                    kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                    keys?: string[] | undefined;
                    ids?: string[] | undefined;
                } | undefined;
                preferredProductIds?: string[] | undefined;
                maxAlternatives?: number | undefined;
                optionalPriority?: number | undefined;
                fallbackMode?: "FAIL_TEMPLATE" | "SKIP_OPTIONAL" | "USE_FALLBACK_ROLE" | undefined;
                fallbackRoleKeys?: string[] | undefined;
                spendingWeight?: number | null | undefined;
            }[];
            status?: "ARCHIVED" | "DRAFT" | "PAUSED" | "SCHEDULED" | "PUBLISHED" | undefined;
            description?: {
                en: string;
                ar: string;
            } | undefined;
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
            enabled?: boolean | undefined;
            tags?: string[] | undefined;
            version?: number | undefined;
            presentation?: {
                style?: "COMPACT" | "MINIMAL" | "EDITORIAL" | "STEP_BY_STEP" | "DETAILED" | undefined;
                estimatedMinutes?: number | null | undefined;
                thumbnailKey?: string | null | undefined;
                themeKey?: string | null | undefined;
                intro?: {
                    en: string;
                    ar: string;
                } | undefined;
                outro?: {
                    en: string;
                    ar: string;
                } | undefined;
                customerVisible?: boolean | undefined;
            } | undefined;
            domain?: string | null | undefined;
            internalName?: string | undefined;
            familyKey?: string | null | undefined;
            complexity?: string | null | undefined;
            packKey?: string | null | undefined;
            baseTemplateKey?: string | null | undefined;
            variant?: {
                kind?: "CATEGORY" | "BRAND" | "CONCERN" | "CUSTOM" | "BASE" | "SKIN_TYPE" | "COMPLEXITY" | "BUDGET" | "SEASONAL" | "LIFESTYLE" | "ANCHOR_ROLE" | undefined;
                parameters?: Record<string, string | number | boolean | string[]> | undefined;
            } | undefined;
            hardEligibility?: {
                conditions: {
                    id: string;
                    operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                    signalKey: string;
                    value?: string | number | boolean | string[] | null | undefined;
                }[];
                mode: "ALL" | "ANY";
            } | null | undefined;
            selectionRules?: {
                id: string;
                name: {
                    en: string;
                    ar: string;
                };
                score: number;
                when: {
                    conditions: {
                        id: string;
                        operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                        signalKey: string;
                        value?: string | number | boolean | string[] | null | undefined;
                    }[];
                    mode: "ALL" | "ANY";
                };
            }[] | undefined;
            allowedAnchorRoles?: string[] | undefined;
            budgetPolicy?: {
                maximum?: number | null | undefined;
                mode?: "IGNORE" | "RESPECT_CUSTOMER" | "HARD" | "SOFT" | undefined;
            } | null | undefined;
            fallbackPolicy?: {
                requiredStep?: "FAIL_TEMPLATE" | "USE_STEP_FALLBACK" | undefined;
                optionalStep?: "SKIP" | undefined;
                fallbackTemplateKey?: string | null | undefined;
            } | null | undefined;
            compatibilityPolicy?: "STANDARD" | "STRICT" | undefined;
            brandConstraint?: {
                mode?: "NONE" | "PREFERRED" | "ONLY" | undefined;
                entityId?: string | null | undefined;
                parameterized?: boolean | undefined;
            } | undefined;
            categoryConstraint?: {
                mode?: "NONE" | "PREFERRED" | "ONLY" | undefined;
                entityId?: string | null | undefined;
                parameterized?: boolean | undefined;
            } | undefined;
            schedule?: {
                startsAt?: string | null | undefined;
                endsAt?: string | null | undefined;
            } | undefined;
            pinned?: boolean | undefined;
        }[];
        settings: {
            maximumProductsPerBrand?: number | null | undefined;
            preferBrandDiversity?: boolean | undefined;
            allowDuplicateProducts?: boolean | undefined;
            budgetExceeded?: {
                en: string;
                ar: string;
            } | undefined;
        };
        signals?: {
            id: string;
            key: string;
            label: {
                en: string;
                ar: string;
            };
            family: string;
            description?: {
                en: string;
                ar: string;
            } | undefined;
            purpose?: "PROFILE" | "BUDGET_MAX" | "OWNED_ROLE" | undefined;
            enabled?: boolean | undefined;
            valueType?: "NUMBER" | "BOOLEAN" | "KEYWORD" | "KEYWORD_LIST" | undefined;
            aggregation?: "SUM" | "MAX" | "LAST" | undefined;
        }[] | undefined;
        estimatedMinutes?: number | undefined;
        templateUniverse?: {
            tags?: {
                id: string;
                key: string;
                label: {
                    en: string;
                    ar: string;
                };
                enabled?: boolean | undefined;
            }[] | undefined;
            fallbackTemplateKey?: string | null | undefined;
            families?: {
                id: string;
                key: string;
                name: {
                    en: string;
                    ar: string;
                };
                description?: {
                    en: string;
                    ar: string;
                } | undefined;
                order?: number | undefined;
                enabled?: boolean | undefined;
            }[] | undefined;
            packs?: {
                id: string;
                key: string;
                name: {
                    en: string;
                    ar: string;
                };
                description?: {
                    en: string;
                    ar: string;
                } | undefined;
                createdAt?: string | null | undefined;
                source?: "ADMIN" | "BIOREZA" | "IMPORTED" | undefined;
                version?: number | undefined;
            }[] | undefined;
            stepPresets?: {
                id: string;
                key: string;
                name: {
                    en: string;
                    ar: string;
                };
                domain: string;
                steps: {
                    id: string;
                    order: number;
                    roleKey: string;
                    period: "AM" | "PM";
                    conditions?: {
                        conditions: {
                            id: string;
                            operator: "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "EXISTS" | "NOT_EXISTS" | "GREATER_THAN_OR_EQUAL" | "LESS_THAN_OR_EQUAL";
                            signalKey: string;
                            value?: string | number | boolean | string[] | null | undefined;
                        }[];
                        mode: "ALL" | "ANY";
                    } | null | undefined;
                    required?: boolean | undefined;
                    target?: {
                        kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                        keys?: string[] | undefined;
                        ids?: string[] | undefined;
                    } | undefined;
                    preferredProductIds?: string[] | undefined;
                    maxAlternatives?: number | undefined;
                    optionalPriority?: number | undefined;
                    fallbackMode?: "FAIL_TEMPLATE" | "SKIP_OPTIONAL" | "USE_FALLBACK_ROLE" | undefined;
                    fallbackRoleKeys?: string[] | undefined;
                    spendingWeight?: number | null | undefined;
                }[];
                description?: {
                    en: string;
                    ar: string;
                } | undefined;
                enabled?: boolean | undefined;
            }[] | undefined;
            customerChoiceEnabled?: boolean | undefined;
            customerChoiceFamilies?: string[] | undefined;
        } | undefined;
        contextualCompletion?: {
            title?: {
                en: string;
                ar: string;
            } | undefined;
            enabled?: boolean | undefined;
            enabledDomains?: string[] | undefined;
            eligibleAnchorRoles?: string[] | undefined;
            defaultTemplateKeys?: Record<string, string> | undefined;
            allowUnavailableAnchorPlanning?: boolean | undefined;
            requireApprovedReason?: boolean | undefined;
            anchorBoostRules?: {
                id: string;
                key: string;
                name: {
                    en: string;
                    ar: string;
                };
                score: number;
                anchor: {
                    kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                    keys?: string[] | undefined;
                    ids?: string[] | undefined;
                };
                candidate: {
                    kind: "ALL" | "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "VARIANT" | "INGREDIENT" | "ROLE";
                    keys?: string[] | undefined;
                    ids?: string[] | undefined;
                };
                channel?: "RECOMMENDATION" | "MERCHANDISING" | undefined;
                priority?: number | undefined;
                enabled?: boolean | undefined;
            }[] | undefined;
            introduction?: {
                en: string;
                ar: string;
            } | undefined;
            unavailableMessage?: {
                en: string;
                ar: string;
            } | undefined;
            anchorExplanation?: {
                en: string;
                ar: string;
            } | undefined;
        } | undefined;
    };
}>;
export declare const routineProductProfileInputSchema: z.ZodObject<{
    roles: z.ZodArray<z.ZodString, "many">;
    primaryRole: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    domain: z.ZodDefault<z.ZodString>;
    completionEligibility: z.ZodDefault<z.ZodEnum<["AUTO", "YES", "NO"]>>;
    skinTypes: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    concernKeys: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    textures: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    periods: z.ZodDefault<z.ZodArray<z.ZodEnum<["AM", "PM"]>, "many">>;
    experienceLevels: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    signalWeights: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodNumber>>;
    approvedReasons: z.ZodDefault<z.ZodArray<z.ZodObject<{
        signalKey: z.ZodString;
        text: z.ZodObject<{
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
        text: {
            en: string;
            ar: string;
        };
        signalKey: string;
    }, {
        text: {
            en: string;
            ar: string;
        };
        signalKey: string;
    }>, "many">>;
    redundancyGroups: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    recommendationWeight: z.ZodDefault<z.ZodNumber>;
    merchandisingBoost: z.ZodDefault<z.ZodNumber>;
    neverRecommend: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    skinTypes: string[];
    domain: string;
    roles: string[];
    primaryRole: string | null;
    completionEligibility: "NO" | "AUTO" | "YES";
    concernKeys: string[];
    textures: string[];
    periods: ("AM" | "PM")[];
    experienceLevels: string[];
    signalWeights: Record<string, number>;
    approvedReasons: {
        text: {
            en: string;
            ar: string;
        };
        signalKey: string;
    }[];
    redundancyGroups: string[];
    recommendationWeight: number;
    merchandisingBoost: number;
    neverRecommend: boolean;
}, {
    roles: string[];
    skinTypes?: string[] | undefined;
    domain?: string | undefined;
    primaryRole?: string | null | undefined;
    completionEligibility?: "NO" | "AUTO" | "YES" | undefined;
    concernKeys?: string[] | undefined;
    textures?: string[] | undefined;
    periods?: ("AM" | "PM")[] | undefined;
    experienceLevels?: string[] | undefined;
    signalWeights?: Record<string, number> | undefined;
    approvedReasons?: {
        text: {
            en: string;
            ar: string;
        };
        signalKey: string;
    }[] | undefined;
    redundancyGroups?: string[] | undefined;
    recommendationWeight?: number | undefined;
    merchandisingBoost?: number | undefined;
    neverRecommend?: boolean | undefined;
}>;
export declare const routineEventInputSchema: z.ZodObject<{
    sessionId: z.ZodString;
    type: z.ZodEnum<["QUESTION_ANSWERED", "BUILDER_ABANDONED", "ROUTINE_GENERATED", "TEMPLATE_SELECTED", "TEMPLATE_ZERO_MATCH", "PRODUCT_SWAPPED", "ROUTINE_ADD_TO_CART", "ROUTINE_PRODUCT_ADD_TO_CART", "COMPLETE_ROUTINE_CTA_VIEWED", "COMPLETE_ROUTINE_CTA_CLICKED", "CONTEXTUAL_FLOW_STARTED", "CONTEXTUAL_FLOW_COMPLETED", "ANCHOR_ALTERNATIVES_OPENED", "ROUTINE_ALTERNATIVE_OPENED", "ROUTINE_ALTERNATIVE_SELECTED"]>;
    questionKey: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    productId: z.ZodDefault<z.ZodNullable<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    type: "QUESTION_ANSWERED" | "BUILDER_ABANDONED" | "ROUTINE_GENERATED" | "TEMPLATE_SELECTED" | "TEMPLATE_ZERO_MATCH" | "PRODUCT_SWAPPED" | "ROUTINE_ADD_TO_CART" | "ROUTINE_PRODUCT_ADD_TO_CART" | "COMPLETE_ROUTINE_CTA_VIEWED" | "COMPLETE_ROUTINE_CTA_CLICKED" | "CONTEXTUAL_FLOW_STARTED" | "CONTEXTUAL_FLOW_COMPLETED" | "ANCHOR_ALTERNATIVES_OPENED" | "ROUTINE_ALTERNATIVE_OPENED" | "ROUTINE_ALTERNATIVE_SELECTED";
    productId: string | null;
    questionKey: string | null;
    sessionId: string;
}, {
    type: "QUESTION_ANSWERED" | "BUILDER_ABANDONED" | "ROUTINE_GENERATED" | "TEMPLATE_SELECTED" | "TEMPLATE_ZERO_MATCH" | "PRODUCT_SWAPPED" | "ROUTINE_ADD_TO_CART" | "ROUTINE_PRODUCT_ADD_TO_CART" | "COMPLETE_ROUTINE_CTA_VIEWED" | "COMPLETE_ROUTINE_CTA_CLICKED" | "CONTEXTUAL_FLOW_STARTED" | "CONTEXTUAL_FLOW_COMPLETED" | "ANCHOR_ALTERNATIVES_OPENED" | "ROUTINE_ALTERNATIVE_OPENED" | "ROUTINE_ALTERNATIVE_SELECTED";
    sessionId: string;
    productId?: string | null | undefined;
    questionKey?: string | null | undefined;
}>;
export declare const routineCartInputSchema: z.ZodObject<{
    selections: z.ZodArray<z.ZodObject<{
        stepId: z.ZodString;
        variantId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        variantId: string;
        stepId: string;
    }, {
        variantId: string;
        stepId: string;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    selections: {
        variantId: string;
        stepId: string;
    }[];
}, {
    selections: {
        variantId: string;
        stepId: string;
    }[];
}>;
export type RoutineCartInput = z.infer<typeof routineCartInputSchema>;
export type RoutineBuilderConfig = z.infer<typeof routineBuilderConfigSchema>;
export type RoutineQuestion = z.infer<typeof routineQuestionSchema>;
export type RoutineRule = z.infer<typeof routineRuleSchema>;
export type RoutineTemplate = z.infer<typeof routineTemplateSchema>;
export type RoutineTemplateStep = z.infer<typeof routineTemplateStepSchema>;
export type RoutineTarget = z.infer<typeof routineTargetSchema>;
export type RoutineAnswers = z.infer<typeof routineAnswersSchema>;
export type RoutineEvaluationInput = z.infer<typeof routineEvaluationInputSchema>;
export type RoutineProductProfileInput = z.infer<typeof routineProductProfileInputSchema>;
export declare const DEFAULT_ROUTINE_BUILDER_CONFIG: RoutineBuilderConfig;
//# sourceMappingURL=routine-builder.schema.d.ts.map