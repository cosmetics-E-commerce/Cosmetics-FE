import { z } from "zod";
export declare const concernStateSchema: z.ZodEnum<["DRAFT", "ACTIVE", "ARCHIVED"]>;
export declare const concernKindSchema: z.ZodEnum<["SKIN_TYPE", "CONCERN"]>;
export declare const concernRelevanceSchema: z.ZodEnum<["PRIMARY", "SECONDARY"]>;
export declare const concernIngredientRoleSchema: z.ZodEnum<["FEATURED", "RELEVANT", "USE_WITH_CARE"]>;
export declare const concernLocalizedTextSchema: z.ZodObject<{
    en: z.ZodDefault<z.ZodString>;
    ar: z.ZodDefault<z.ZodString>;
}, "strict", z.ZodTypeAny, {
    en: string;
    ar: string;
}, {
    en?: string | undefined;
    ar?: string | undefined;
}>;
export declare const concernFaqSchema: z.ZodObject<{
    id: z.ZodString;
    question: z.ZodObject<{} & {
        en: z.ZodDefault<z.ZodString>;
        ar: z.ZodDefault<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        en: string;
        ar: string;
    }, {
        en?: string | undefined;
        ar?: string | undefined;
    }>;
    answer: z.ZodObject<{
        en: z.ZodDefault<z.ZodString>;
        ar: z.ZodDefault<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        en: string;
        ar: string;
    }, {
        en?: string | undefined;
        ar?: string | undefined;
    }>;
    enabled: z.ZodDefault<z.ZodBoolean>;
    order: z.ZodNumber;
}, "strict", z.ZodTypeAny, {
    id: string;
    order: number;
    enabled: boolean;
    question: {
        en: string;
        ar: string;
    };
    answer: {
        en: string;
        ar: string;
    };
}, {
    id: string;
    order: number;
    question: {
        en?: string | undefined;
        ar?: string | undefined;
    };
    answer: {
        en?: string | undefined;
        ar?: string | undefined;
    };
    enabled?: boolean | undefined;
}>;
export declare const concernContentBlockSchema: z.ZodObject<{
    id: z.ZodString;
    type: z.ZodEnum<["ABOUT", "WHAT_TO_LOOK_FOR", "ROUTINE_GUIDANCE", "SHOPPING_GUIDANCE", "EDUCATION"]>;
    heading: z.ZodObject<{} & {
        en: z.ZodDefault<z.ZodString>;
        ar: z.ZodDefault<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        en: string;
        ar: string;
    }, {
        en?: string | undefined;
        ar?: string | undefined;
    }>;
    body: z.ZodObject<{
        en: z.ZodDefault<z.ZodString>;
        ar: z.ZodDefault<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        en: string;
        ar: string;
    }, {
        en?: string | undefined;
        ar?: string | undefined;
    }>;
    enabled: z.ZodDefault<z.ZodBoolean>;
    order: z.ZodNumber;
}, "strict", z.ZodTypeAny, {
    type: "ABOUT" | "WHAT_TO_LOOK_FOR" | "ROUTINE_GUIDANCE" | "SHOPPING_GUIDANCE" | "EDUCATION";
    id: string;
    order: number;
    enabled: boolean;
    heading: {
        en: string;
        ar: string;
    };
    body: {
        en: string;
        ar: string;
    };
}, {
    type: "ABOUT" | "WHAT_TO_LOOK_FOR" | "ROUTINE_GUIDANCE" | "SHOPPING_GUIDANCE" | "EDUCATION";
    id: string;
    order: number;
    heading: {
        en?: string | undefined;
        ar?: string | undefined;
    };
    body: {
        en?: string | undefined;
        ar?: string | undefined;
    };
    enabled?: boolean | undefined;
}>;
export declare const concernConfigSchema: z.ZodObject<{
    schemaVersion: z.ZodDefault<z.ZodLiteral<1>>;
    name: z.ZodObject<{} & {
        en: z.ZodDefault<z.ZodString>;
        ar: z.ZodDefault<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        en: string;
        ar: string;
    }, {
        en?: string | undefined;
        ar?: string | undefined;
    }>;
    shortDescription: z.ZodObject<{} & {
        en: z.ZodDefault<z.ZodString>;
        ar: z.ZodDefault<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        en: string;
        ar: string;
    }, {
        en?: string | undefined;
        ar?: string | undefined;
    }>;
    longDescription: z.ZodObject<{
        en: z.ZodDefault<z.ZodString>;
        ar: z.ZodDefault<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        en: string;
        ar: string;
    }, {
        en?: string | undefined;
        ar?: string | undefined;
    }>;
    heroMediaKey: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    mobileHeroMediaKey: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    iconMediaKey: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    content: z.ZodDefault<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        type: z.ZodEnum<["ABOUT", "WHAT_TO_LOOK_FOR", "ROUTINE_GUIDANCE", "SHOPPING_GUIDANCE", "EDUCATION"]>;
        heading: z.ZodObject<{} & {
            en: z.ZodDefault<z.ZodString>;
            ar: z.ZodDefault<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            en: string;
            ar: string;
        }, {
            en?: string | undefined;
            ar?: string | undefined;
        }>;
        body: z.ZodObject<{
            en: z.ZodDefault<z.ZodString>;
            ar: z.ZodDefault<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            en: string;
            ar: string;
        }, {
            en?: string | undefined;
            ar?: string | undefined;
        }>;
        enabled: z.ZodDefault<z.ZodBoolean>;
        order: z.ZodNumber;
    }, "strict", z.ZodTypeAny, {
        type: "ABOUT" | "WHAT_TO_LOOK_FOR" | "ROUTINE_GUIDANCE" | "SHOPPING_GUIDANCE" | "EDUCATION";
        id: string;
        order: number;
        enabled: boolean;
        heading: {
            en: string;
            ar: string;
        };
        body: {
            en: string;
            ar: string;
        };
    }, {
        type: "ABOUT" | "WHAT_TO_LOOK_FOR" | "ROUTINE_GUIDANCE" | "SHOPPING_GUIDANCE" | "EDUCATION";
        id: string;
        order: number;
        heading: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        body: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        enabled?: boolean | undefined;
    }>, "many">>;
    faq: z.ZodDefault<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        question: z.ZodObject<{} & {
            en: z.ZodDefault<z.ZodString>;
            ar: z.ZodDefault<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            en: string;
            ar: string;
        }, {
            en?: string | undefined;
            ar?: string | undefined;
        }>;
        answer: z.ZodObject<{
            en: z.ZodDefault<z.ZodString>;
            ar: z.ZodDefault<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            en: string;
            ar: string;
        }, {
            en?: string | undefined;
            ar?: string | undefined;
        }>;
        enabled: z.ZodDefault<z.ZodBoolean>;
        order: z.ZodNumber;
    }, "strict", z.ZodTypeAny, {
        id: string;
        order: number;
        enabled: boolean;
        question: {
            en: string;
            ar: string;
        };
        answer: {
            en: string;
            ar: string;
        };
    }, {
        id: string;
        order: number;
        question: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        answer: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        enabled?: boolean | undefined;
    }>, "many">>;
    routine: z.ZodDefault<z.ZodObject<{
        signalType: z.ZodDefault<z.ZodNullable<z.ZodEnum<["SKIN_TYPE", "CONCERN"]>>>;
        signalKey: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        templateKeys: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strict", z.ZodTypeAny, {
        signalKey: string | null;
        signalType: "CONCERN" | "SKIN_TYPE" | null;
        templateKeys: string[];
    }, {
        signalKey?: string | null | undefined;
        signalType?: "CONCERN" | "SKIN_TYPE" | null | undefined;
        templateKeys?: string[] | undefined;
    }>>;
    seo: z.ZodDefault<z.ZodObject<{
        title: z.ZodDefault<z.ZodObject<{} & {
            en: z.ZodDefault<z.ZodString>;
            ar: z.ZodDefault<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            en: string;
            ar: string;
        }, {
            en?: string | undefined;
            ar?: string | undefined;
        }>>;
        description: z.ZodDefault<z.ZodObject<{} & {
            en: z.ZodDefault<z.ZodString>;
            ar: z.ZodDefault<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            en: string;
            ar: string;
        }, {
            en?: string | undefined;
            ar?: string | undefined;
        }>>;
        openGraphTitle: z.ZodDefault<z.ZodObject<{} & {
            en: z.ZodDefault<z.ZodString>;
            ar: z.ZodDefault<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            en: string;
            ar: string;
        }, {
            en?: string | undefined;
            ar?: string | undefined;
        }>>;
        openGraphDescription: z.ZodDefault<z.ZodObject<{} & {
            en: z.ZodDefault<z.ZodString>;
            ar: z.ZodDefault<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            en: string;
            ar: string;
        }, {
            en?: string | undefined;
            ar?: string | undefined;
        }>>;
        openGraphImageKey: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        indexable: z.ZodDefault<z.ZodBoolean>;
    }, "strict", z.ZodTypeAny, {
        description: {
            en: string;
            ar: string;
        };
        title: {
            en: string;
            ar: string;
        };
        indexable: boolean;
        openGraphTitle: {
            en: string;
            ar: string;
        };
        openGraphDescription: {
            en: string;
            ar: string;
        };
        openGraphImageKey: string | null;
    }, {
        description?: {
            en?: string | undefined;
            ar?: string | undefined;
        } | undefined;
        title?: {
            en?: string | undefined;
            ar?: string | undefined;
        } | undefined;
        indexable?: boolean | undefined;
        openGraphTitle?: {
            en?: string | undefined;
            ar?: string | undefined;
        } | undefined;
        openGraphDescription?: {
            en?: string | undefined;
            ar?: string | undefined;
        } | undefined;
        openGraphImageKey?: string | null | undefined;
    }>>;
    allowEducationalOnly: z.ZodDefault<z.ZodBoolean>;
    productSort: z.ZodDefault<z.ZodEnum<["RELEVANCE", "NEWEST", "PRICE_LOW", "PRICE_HIGH", "NAME"]>>;
    dynamicBrands: z.ZodDefault<z.ZodBoolean>;
}, "strict", z.ZodTypeAny, {
    name: {
        en: string;
        ar: string;
    };
    schemaVersion: 1;
    seo: {
        description: {
            en: string;
            ar: string;
        };
        title: {
            en: string;
            ar: string;
        };
        indexable: boolean;
        openGraphTitle: {
            en: string;
            ar: string;
        };
        openGraphDescription: {
            en: string;
            ar: string;
        };
        openGraphImageKey: string | null;
    };
    content: {
        type: "ABOUT" | "WHAT_TO_LOOK_FOR" | "ROUTINE_GUIDANCE" | "SHOPPING_GUIDANCE" | "EDUCATION";
        id: string;
        order: number;
        enabled: boolean;
        heading: {
            en: string;
            ar: string;
        };
        body: {
            en: string;
            ar: string;
        };
    }[];
    routine: {
        signalKey: string | null;
        signalType: "CONCERN" | "SKIN_TYPE" | null;
        templateKeys: string[];
    };
    shortDescription: {
        en: string;
        ar: string;
    };
    longDescription: {
        en: string;
        ar: string;
    };
    heroMediaKey: string | null;
    mobileHeroMediaKey: string | null;
    iconMediaKey: string | null;
    faq: {
        id: string;
        order: number;
        enabled: boolean;
        question: {
            en: string;
            ar: string;
        };
        answer: {
            en: string;
            ar: string;
        };
    }[];
    allowEducationalOnly: boolean;
    productSort: "NEWEST" | "NAME" | "PRICE_LOW" | "PRICE_HIGH" | "RELEVANCE";
    dynamicBrands: boolean;
}, {
    name: {
        en?: string | undefined;
        ar?: string | undefined;
    };
    shortDescription: {
        en?: string | undefined;
        ar?: string | undefined;
    };
    longDescription: {
        en?: string | undefined;
        ar?: string | undefined;
    };
    schemaVersion?: 1 | undefined;
    seo?: {
        description?: {
            en?: string | undefined;
            ar?: string | undefined;
        } | undefined;
        title?: {
            en?: string | undefined;
            ar?: string | undefined;
        } | undefined;
        indexable?: boolean | undefined;
        openGraphTitle?: {
            en?: string | undefined;
            ar?: string | undefined;
        } | undefined;
        openGraphDescription?: {
            en?: string | undefined;
            ar?: string | undefined;
        } | undefined;
        openGraphImageKey?: string | null | undefined;
    } | undefined;
    content?: {
        type: "ABOUT" | "WHAT_TO_LOOK_FOR" | "ROUTINE_GUIDANCE" | "SHOPPING_GUIDANCE" | "EDUCATION";
        id: string;
        order: number;
        heading: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        body: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        enabled?: boolean | undefined;
    }[] | undefined;
    routine?: {
        signalKey?: string | null | undefined;
        signalType?: "CONCERN" | "SKIN_TYPE" | null | undefined;
        templateKeys?: string[] | undefined;
    } | undefined;
    heroMediaKey?: string | null | undefined;
    mobileHeroMediaKey?: string | null | undefined;
    iconMediaKey?: string | null | undefined;
    faq?: {
        id: string;
        order: number;
        question: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        answer: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        enabled?: boolean | undefined;
    }[] | undefined;
    allowEducationalOnly?: boolean | undefined;
    productSort?: "NEWEST" | "NAME" | "PRICE_LOW" | "PRICE_HIGH" | "RELEVANCE" | undefined;
    dynamicBrands?: boolean | undefined;
}>;
export declare const concernProductMappingSchema: z.ZodObject<{
    productId: z.ZodString;
    relevance: z.ZodEnum<["PRIMARY", "SECONDARY"]>;
    order: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
}, "strict", z.ZodTypeAny, {
    productId: string;
    order: number | null;
    relevance: "PRIMARY" | "SECONDARY";
}, {
    productId: string;
    relevance: "PRIMARY" | "SECONDARY";
    order?: number | null | undefined;
}>;
export declare const concernIngredientMappingSchema: z.ZodObject<{
    ingredientId: z.ZodString;
    role: z.ZodEnum<["FEATURED", "RELEVANT", "USE_WITH_CARE"]>;
    order: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
}, "strict", z.ZodTypeAny, {
    role: "FEATURED" | "RELEVANT" | "USE_WITH_CARE";
    order: number | null;
    ingredientId: string;
}, {
    role: "FEATURED" | "RELEVANT" | "USE_WITH_CARE";
    ingredientId: string;
    order?: number | null | undefined;
}>;
export declare const concernOrderedEntitySchema: z.ZodObject<{
    id: z.ZodString;
    order: z.ZodNumber;
}, "strict", z.ZodTypeAny, {
    id: string;
    order: number;
}, {
    id: string;
    order: number;
}>;
export declare const createConcernSchema: z.ZodObject<{
    internalName: z.ZodString;
    slug: z.ZodString;
    kind: z.ZodDefault<z.ZodEnum<["SKIN_TYPE", "CONCERN"]>>;
    featured: z.ZodDefault<z.ZodBoolean>;
    sortOrder: z.ZodDefault<z.ZodNumber>;
    config: z.ZodObject<{
        schemaVersion: z.ZodDefault<z.ZodLiteral<1>>;
        name: z.ZodObject<{} & {
            en: z.ZodDefault<z.ZodString>;
            ar: z.ZodDefault<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            en: string;
            ar: string;
        }, {
            en?: string | undefined;
            ar?: string | undefined;
        }>;
        shortDescription: z.ZodObject<{} & {
            en: z.ZodDefault<z.ZodString>;
            ar: z.ZodDefault<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            en: string;
            ar: string;
        }, {
            en?: string | undefined;
            ar?: string | undefined;
        }>;
        longDescription: z.ZodObject<{
            en: z.ZodDefault<z.ZodString>;
            ar: z.ZodDefault<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            en: string;
            ar: string;
        }, {
            en?: string | undefined;
            ar?: string | undefined;
        }>;
        heroMediaKey: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        mobileHeroMediaKey: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        iconMediaKey: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        content: z.ZodDefault<z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            type: z.ZodEnum<["ABOUT", "WHAT_TO_LOOK_FOR", "ROUTINE_GUIDANCE", "SHOPPING_GUIDANCE", "EDUCATION"]>;
            heading: z.ZodObject<{} & {
                en: z.ZodDefault<z.ZodString>;
                ar: z.ZodDefault<z.ZodString>;
            }, "strict", z.ZodTypeAny, {
                en: string;
                ar: string;
            }, {
                en?: string | undefined;
                ar?: string | undefined;
            }>;
            body: z.ZodObject<{
                en: z.ZodDefault<z.ZodString>;
                ar: z.ZodDefault<z.ZodString>;
            }, "strict", z.ZodTypeAny, {
                en: string;
                ar: string;
            }, {
                en?: string | undefined;
                ar?: string | undefined;
            }>;
            enabled: z.ZodDefault<z.ZodBoolean>;
            order: z.ZodNumber;
        }, "strict", z.ZodTypeAny, {
            type: "ABOUT" | "WHAT_TO_LOOK_FOR" | "ROUTINE_GUIDANCE" | "SHOPPING_GUIDANCE" | "EDUCATION";
            id: string;
            order: number;
            enabled: boolean;
            heading: {
                en: string;
                ar: string;
            };
            body: {
                en: string;
                ar: string;
            };
        }, {
            type: "ABOUT" | "WHAT_TO_LOOK_FOR" | "ROUTINE_GUIDANCE" | "SHOPPING_GUIDANCE" | "EDUCATION";
            id: string;
            order: number;
            heading: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            body: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            enabled?: boolean | undefined;
        }>, "many">>;
        faq: z.ZodDefault<z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            question: z.ZodObject<{} & {
                en: z.ZodDefault<z.ZodString>;
                ar: z.ZodDefault<z.ZodString>;
            }, "strict", z.ZodTypeAny, {
                en: string;
                ar: string;
            }, {
                en?: string | undefined;
                ar?: string | undefined;
            }>;
            answer: z.ZodObject<{
                en: z.ZodDefault<z.ZodString>;
                ar: z.ZodDefault<z.ZodString>;
            }, "strict", z.ZodTypeAny, {
                en: string;
                ar: string;
            }, {
                en?: string | undefined;
                ar?: string | undefined;
            }>;
            enabled: z.ZodDefault<z.ZodBoolean>;
            order: z.ZodNumber;
        }, "strict", z.ZodTypeAny, {
            id: string;
            order: number;
            enabled: boolean;
            question: {
                en: string;
                ar: string;
            };
            answer: {
                en: string;
                ar: string;
            };
        }, {
            id: string;
            order: number;
            question: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            answer: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            enabled?: boolean | undefined;
        }>, "many">>;
        routine: z.ZodDefault<z.ZodObject<{
            signalType: z.ZodDefault<z.ZodNullable<z.ZodEnum<["SKIN_TYPE", "CONCERN"]>>>;
            signalKey: z.ZodDefault<z.ZodNullable<z.ZodString>>;
            templateKeys: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        }, "strict", z.ZodTypeAny, {
            signalKey: string | null;
            signalType: "CONCERN" | "SKIN_TYPE" | null;
            templateKeys: string[];
        }, {
            signalKey?: string | null | undefined;
            signalType?: "CONCERN" | "SKIN_TYPE" | null | undefined;
            templateKeys?: string[] | undefined;
        }>>;
        seo: z.ZodDefault<z.ZodObject<{
            title: z.ZodDefault<z.ZodObject<{} & {
                en: z.ZodDefault<z.ZodString>;
                ar: z.ZodDefault<z.ZodString>;
            }, "strict", z.ZodTypeAny, {
                en: string;
                ar: string;
            }, {
                en?: string | undefined;
                ar?: string | undefined;
            }>>;
            description: z.ZodDefault<z.ZodObject<{} & {
                en: z.ZodDefault<z.ZodString>;
                ar: z.ZodDefault<z.ZodString>;
            }, "strict", z.ZodTypeAny, {
                en: string;
                ar: string;
            }, {
                en?: string | undefined;
                ar?: string | undefined;
            }>>;
            openGraphTitle: z.ZodDefault<z.ZodObject<{} & {
                en: z.ZodDefault<z.ZodString>;
                ar: z.ZodDefault<z.ZodString>;
            }, "strict", z.ZodTypeAny, {
                en: string;
                ar: string;
            }, {
                en?: string | undefined;
                ar?: string | undefined;
            }>>;
            openGraphDescription: z.ZodDefault<z.ZodObject<{} & {
                en: z.ZodDefault<z.ZodString>;
                ar: z.ZodDefault<z.ZodString>;
            }, "strict", z.ZodTypeAny, {
                en: string;
                ar: string;
            }, {
                en?: string | undefined;
                ar?: string | undefined;
            }>>;
            openGraphImageKey: z.ZodDefault<z.ZodNullable<z.ZodString>>;
            indexable: z.ZodDefault<z.ZodBoolean>;
        }, "strict", z.ZodTypeAny, {
            description: {
                en: string;
                ar: string;
            };
            title: {
                en: string;
                ar: string;
            };
            indexable: boolean;
            openGraphTitle: {
                en: string;
                ar: string;
            };
            openGraphDescription: {
                en: string;
                ar: string;
            };
            openGraphImageKey: string | null;
        }, {
            description?: {
                en?: string | undefined;
                ar?: string | undefined;
            } | undefined;
            title?: {
                en?: string | undefined;
                ar?: string | undefined;
            } | undefined;
            indexable?: boolean | undefined;
            openGraphTitle?: {
                en?: string | undefined;
                ar?: string | undefined;
            } | undefined;
            openGraphDescription?: {
                en?: string | undefined;
                ar?: string | undefined;
            } | undefined;
            openGraphImageKey?: string | null | undefined;
        }>>;
        allowEducationalOnly: z.ZodDefault<z.ZodBoolean>;
        productSort: z.ZodDefault<z.ZodEnum<["RELEVANCE", "NEWEST", "PRICE_LOW", "PRICE_HIGH", "NAME"]>>;
        dynamicBrands: z.ZodDefault<z.ZodBoolean>;
    }, "strict", z.ZodTypeAny, {
        name: {
            en: string;
            ar: string;
        };
        schemaVersion: 1;
        seo: {
            description: {
                en: string;
                ar: string;
            };
            title: {
                en: string;
                ar: string;
            };
            indexable: boolean;
            openGraphTitle: {
                en: string;
                ar: string;
            };
            openGraphDescription: {
                en: string;
                ar: string;
            };
            openGraphImageKey: string | null;
        };
        content: {
            type: "ABOUT" | "WHAT_TO_LOOK_FOR" | "ROUTINE_GUIDANCE" | "SHOPPING_GUIDANCE" | "EDUCATION";
            id: string;
            order: number;
            enabled: boolean;
            heading: {
                en: string;
                ar: string;
            };
            body: {
                en: string;
                ar: string;
            };
        }[];
        routine: {
            signalKey: string | null;
            signalType: "CONCERN" | "SKIN_TYPE" | null;
            templateKeys: string[];
        };
        shortDescription: {
            en: string;
            ar: string;
        };
        longDescription: {
            en: string;
            ar: string;
        };
        heroMediaKey: string | null;
        mobileHeroMediaKey: string | null;
        iconMediaKey: string | null;
        faq: {
            id: string;
            order: number;
            enabled: boolean;
            question: {
                en: string;
                ar: string;
            };
            answer: {
                en: string;
                ar: string;
            };
        }[];
        allowEducationalOnly: boolean;
        productSort: "NEWEST" | "NAME" | "PRICE_LOW" | "PRICE_HIGH" | "RELEVANCE";
        dynamicBrands: boolean;
    }, {
        name: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        shortDescription: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        longDescription: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        schemaVersion?: 1 | undefined;
        seo?: {
            description?: {
                en?: string | undefined;
                ar?: string | undefined;
            } | undefined;
            title?: {
                en?: string | undefined;
                ar?: string | undefined;
            } | undefined;
            indexable?: boolean | undefined;
            openGraphTitle?: {
                en?: string | undefined;
                ar?: string | undefined;
            } | undefined;
            openGraphDescription?: {
                en?: string | undefined;
                ar?: string | undefined;
            } | undefined;
            openGraphImageKey?: string | null | undefined;
        } | undefined;
        content?: {
            type: "ABOUT" | "WHAT_TO_LOOK_FOR" | "ROUTINE_GUIDANCE" | "SHOPPING_GUIDANCE" | "EDUCATION";
            id: string;
            order: number;
            heading: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            body: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            enabled?: boolean | undefined;
        }[] | undefined;
        routine?: {
            signalKey?: string | null | undefined;
            signalType?: "CONCERN" | "SKIN_TYPE" | null | undefined;
            templateKeys?: string[] | undefined;
        } | undefined;
        heroMediaKey?: string | null | undefined;
        mobileHeroMediaKey?: string | null | undefined;
        iconMediaKey?: string | null | undefined;
        faq?: {
            id: string;
            order: number;
            question: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            answer: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            enabled?: boolean | undefined;
        }[] | undefined;
        allowEducationalOnly?: boolean | undefined;
        productSort?: "NEWEST" | "NAME" | "PRICE_LOW" | "PRICE_HIGH" | "RELEVANCE" | undefined;
        dynamicBrands?: boolean | undefined;
    }>;
    pageId: z.ZodDefault<z.ZodNullable<z.ZodString>>;
}, "strict", z.ZodTypeAny, {
    sortOrder: number;
    slug: string;
    featured: boolean;
    config: {
        name: {
            en: string;
            ar: string;
        };
        schemaVersion: 1;
        seo: {
            description: {
                en: string;
                ar: string;
            };
            title: {
                en: string;
                ar: string;
            };
            indexable: boolean;
            openGraphTitle: {
                en: string;
                ar: string;
            };
            openGraphDescription: {
                en: string;
                ar: string;
            };
            openGraphImageKey: string | null;
        };
        content: {
            type: "ABOUT" | "WHAT_TO_LOOK_FOR" | "ROUTINE_GUIDANCE" | "SHOPPING_GUIDANCE" | "EDUCATION";
            id: string;
            order: number;
            enabled: boolean;
            heading: {
                en: string;
                ar: string;
            };
            body: {
                en: string;
                ar: string;
            };
        }[];
        routine: {
            signalKey: string | null;
            signalType: "CONCERN" | "SKIN_TYPE" | null;
            templateKeys: string[];
        };
        shortDescription: {
            en: string;
            ar: string;
        };
        longDescription: {
            en: string;
            ar: string;
        };
        heroMediaKey: string | null;
        mobileHeroMediaKey: string | null;
        iconMediaKey: string | null;
        faq: {
            id: string;
            order: number;
            enabled: boolean;
            question: {
                en: string;
                ar: string;
            };
            answer: {
                en: string;
                ar: string;
            };
        }[];
        allowEducationalOnly: boolean;
        productSort: "NEWEST" | "NAME" | "PRICE_LOW" | "PRICE_HIGH" | "RELEVANCE";
        dynamicBrands: boolean;
    };
    kind: "CONCERN" | "SKIN_TYPE";
    internalName: string;
    pageId: string | null;
}, {
    slug: string;
    config: {
        name: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        shortDescription: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        longDescription: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        schemaVersion?: 1 | undefined;
        seo?: {
            description?: {
                en?: string | undefined;
                ar?: string | undefined;
            } | undefined;
            title?: {
                en?: string | undefined;
                ar?: string | undefined;
            } | undefined;
            indexable?: boolean | undefined;
            openGraphTitle?: {
                en?: string | undefined;
                ar?: string | undefined;
            } | undefined;
            openGraphDescription?: {
                en?: string | undefined;
                ar?: string | undefined;
            } | undefined;
            openGraphImageKey?: string | null | undefined;
        } | undefined;
        content?: {
            type: "ABOUT" | "WHAT_TO_LOOK_FOR" | "ROUTINE_GUIDANCE" | "SHOPPING_GUIDANCE" | "EDUCATION";
            id: string;
            order: number;
            heading: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            body: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            enabled?: boolean | undefined;
        }[] | undefined;
        routine?: {
            signalKey?: string | null | undefined;
            signalType?: "CONCERN" | "SKIN_TYPE" | null | undefined;
            templateKeys?: string[] | undefined;
        } | undefined;
        heroMediaKey?: string | null | undefined;
        mobileHeroMediaKey?: string | null | undefined;
        iconMediaKey?: string | null | undefined;
        faq?: {
            id: string;
            order: number;
            question: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            answer: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            enabled?: boolean | undefined;
        }[] | undefined;
        allowEducationalOnly?: boolean | undefined;
        productSort?: "NEWEST" | "NAME" | "PRICE_LOW" | "PRICE_HIGH" | "RELEVANCE" | undefined;
        dynamicBrands?: boolean | undefined;
    };
    internalName: string;
    sortOrder?: number | undefined;
    featured?: boolean | undefined;
    kind?: "CONCERN" | "SKIN_TYPE" | undefined;
    pageId?: string | null | undefined;
}>;
export declare const updateConcernDraftSchema: z.ZodObject<{
    sortOrder: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    slug: z.ZodOptional<z.ZodString>;
    featured: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    config: z.ZodOptional<z.ZodObject<{
        schemaVersion: z.ZodDefault<z.ZodLiteral<1>>;
        name: z.ZodObject<{} & {
            en: z.ZodDefault<z.ZodString>;
            ar: z.ZodDefault<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            en: string;
            ar: string;
        }, {
            en?: string | undefined;
            ar?: string | undefined;
        }>;
        shortDescription: z.ZodObject<{} & {
            en: z.ZodDefault<z.ZodString>;
            ar: z.ZodDefault<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            en: string;
            ar: string;
        }, {
            en?: string | undefined;
            ar?: string | undefined;
        }>;
        longDescription: z.ZodObject<{
            en: z.ZodDefault<z.ZodString>;
            ar: z.ZodDefault<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            en: string;
            ar: string;
        }, {
            en?: string | undefined;
            ar?: string | undefined;
        }>;
        heroMediaKey: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        mobileHeroMediaKey: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        iconMediaKey: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        content: z.ZodDefault<z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            type: z.ZodEnum<["ABOUT", "WHAT_TO_LOOK_FOR", "ROUTINE_GUIDANCE", "SHOPPING_GUIDANCE", "EDUCATION"]>;
            heading: z.ZodObject<{} & {
                en: z.ZodDefault<z.ZodString>;
                ar: z.ZodDefault<z.ZodString>;
            }, "strict", z.ZodTypeAny, {
                en: string;
                ar: string;
            }, {
                en?: string | undefined;
                ar?: string | undefined;
            }>;
            body: z.ZodObject<{
                en: z.ZodDefault<z.ZodString>;
                ar: z.ZodDefault<z.ZodString>;
            }, "strict", z.ZodTypeAny, {
                en: string;
                ar: string;
            }, {
                en?: string | undefined;
                ar?: string | undefined;
            }>;
            enabled: z.ZodDefault<z.ZodBoolean>;
            order: z.ZodNumber;
        }, "strict", z.ZodTypeAny, {
            type: "ABOUT" | "WHAT_TO_LOOK_FOR" | "ROUTINE_GUIDANCE" | "SHOPPING_GUIDANCE" | "EDUCATION";
            id: string;
            order: number;
            enabled: boolean;
            heading: {
                en: string;
                ar: string;
            };
            body: {
                en: string;
                ar: string;
            };
        }, {
            type: "ABOUT" | "WHAT_TO_LOOK_FOR" | "ROUTINE_GUIDANCE" | "SHOPPING_GUIDANCE" | "EDUCATION";
            id: string;
            order: number;
            heading: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            body: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            enabled?: boolean | undefined;
        }>, "many">>;
        faq: z.ZodDefault<z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            question: z.ZodObject<{} & {
                en: z.ZodDefault<z.ZodString>;
                ar: z.ZodDefault<z.ZodString>;
            }, "strict", z.ZodTypeAny, {
                en: string;
                ar: string;
            }, {
                en?: string | undefined;
                ar?: string | undefined;
            }>;
            answer: z.ZodObject<{
                en: z.ZodDefault<z.ZodString>;
                ar: z.ZodDefault<z.ZodString>;
            }, "strict", z.ZodTypeAny, {
                en: string;
                ar: string;
            }, {
                en?: string | undefined;
                ar?: string | undefined;
            }>;
            enabled: z.ZodDefault<z.ZodBoolean>;
            order: z.ZodNumber;
        }, "strict", z.ZodTypeAny, {
            id: string;
            order: number;
            enabled: boolean;
            question: {
                en: string;
                ar: string;
            };
            answer: {
                en: string;
                ar: string;
            };
        }, {
            id: string;
            order: number;
            question: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            answer: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            enabled?: boolean | undefined;
        }>, "many">>;
        routine: z.ZodDefault<z.ZodObject<{
            signalType: z.ZodDefault<z.ZodNullable<z.ZodEnum<["SKIN_TYPE", "CONCERN"]>>>;
            signalKey: z.ZodDefault<z.ZodNullable<z.ZodString>>;
            templateKeys: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        }, "strict", z.ZodTypeAny, {
            signalKey: string | null;
            signalType: "CONCERN" | "SKIN_TYPE" | null;
            templateKeys: string[];
        }, {
            signalKey?: string | null | undefined;
            signalType?: "CONCERN" | "SKIN_TYPE" | null | undefined;
            templateKeys?: string[] | undefined;
        }>>;
        seo: z.ZodDefault<z.ZodObject<{
            title: z.ZodDefault<z.ZodObject<{} & {
                en: z.ZodDefault<z.ZodString>;
                ar: z.ZodDefault<z.ZodString>;
            }, "strict", z.ZodTypeAny, {
                en: string;
                ar: string;
            }, {
                en?: string | undefined;
                ar?: string | undefined;
            }>>;
            description: z.ZodDefault<z.ZodObject<{} & {
                en: z.ZodDefault<z.ZodString>;
                ar: z.ZodDefault<z.ZodString>;
            }, "strict", z.ZodTypeAny, {
                en: string;
                ar: string;
            }, {
                en?: string | undefined;
                ar?: string | undefined;
            }>>;
            openGraphTitle: z.ZodDefault<z.ZodObject<{} & {
                en: z.ZodDefault<z.ZodString>;
                ar: z.ZodDefault<z.ZodString>;
            }, "strict", z.ZodTypeAny, {
                en: string;
                ar: string;
            }, {
                en?: string | undefined;
                ar?: string | undefined;
            }>>;
            openGraphDescription: z.ZodDefault<z.ZodObject<{} & {
                en: z.ZodDefault<z.ZodString>;
                ar: z.ZodDefault<z.ZodString>;
            }, "strict", z.ZodTypeAny, {
                en: string;
                ar: string;
            }, {
                en?: string | undefined;
                ar?: string | undefined;
            }>>;
            openGraphImageKey: z.ZodDefault<z.ZodNullable<z.ZodString>>;
            indexable: z.ZodDefault<z.ZodBoolean>;
        }, "strict", z.ZodTypeAny, {
            description: {
                en: string;
                ar: string;
            };
            title: {
                en: string;
                ar: string;
            };
            indexable: boolean;
            openGraphTitle: {
                en: string;
                ar: string;
            };
            openGraphDescription: {
                en: string;
                ar: string;
            };
            openGraphImageKey: string | null;
        }, {
            description?: {
                en?: string | undefined;
                ar?: string | undefined;
            } | undefined;
            title?: {
                en?: string | undefined;
                ar?: string | undefined;
            } | undefined;
            indexable?: boolean | undefined;
            openGraphTitle?: {
                en?: string | undefined;
                ar?: string | undefined;
            } | undefined;
            openGraphDescription?: {
                en?: string | undefined;
                ar?: string | undefined;
            } | undefined;
            openGraphImageKey?: string | null | undefined;
        }>>;
        allowEducationalOnly: z.ZodDefault<z.ZodBoolean>;
        productSort: z.ZodDefault<z.ZodEnum<["RELEVANCE", "NEWEST", "PRICE_LOW", "PRICE_HIGH", "NAME"]>>;
        dynamicBrands: z.ZodDefault<z.ZodBoolean>;
    }, "strict", z.ZodTypeAny, {
        name: {
            en: string;
            ar: string;
        };
        schemaVersion: 1;
        seo: {
            description: {
                en: string;
                ar: string;
            };
            title: {
                en: string;
                ar: string;
            };
            indexable: boolean;
            openGraphTitle: {
                en: string;
                ar: string;
            };
            openGraphDescription: {
                en: string;
                ar: string;
            };
            openGraphImageKey: string | null;
        };
        content: {
            type: "ABOUT" | "WHAT_TO_LOOK_FOR" | "ROUTINE_GUIDANCE" | "SHOPPING_GUIDANCE" | "EDUCATION";
            id: string;
            order: number;
            enabled: boolean;
            heading: {
                en: string;
                ar: string;
            };
            body: {
                en: string;
                ar: string;
            };
        }[];
        routine: {
            signalKey: string | null;
            signalType: "CONCERN" | "SKIN_TYPE" | null;
            templateKeys: string[];
        };
        shortDescription: {
            en: string;
            ar: string;
        };
        longDescription: {
            en: string;
            ar: string;
        };
        heroMediaKey: string | null;
        mobileHeroMediaKey: string | null;
        iconMediaKey: string | null;
        faq: {
            id: string;
            order: number;
            enabled: boolean;
            question: {
                en: string;
                ar: string;
            };
            answer: {
                en: string;
                ar: string;
            };
        }[];
        allowEducationalOnly: boolean;
        productSort: "NEWEST" | "NAME" | "PRICE_LOW" | "PRICE_HIGH" | "RELEVANCE";
        dynamicBrands: boolean;
    }, {
        name: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        shortDescription: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        longDescription: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        schemaVersion?: 1 | undefined;
        seo?: {
            description?: {
                en?: string | undefined;
                ar?: string | undefined;
            } | undefined;
            title?: {
                en?: string | undefined;
                ar?: string | undefined;
            } | undefined;
            indexable?: boolean | undefined;
            openGraphTitle?: {
                en?: string | undefined;
                ar?: string | undefined;
            } | undefined;
            openGraphDescription?: {
                en?: string | undefined;
                ar?: string | undefined;
            } | undefined;
            openGraphImageKey?: string | null | undefined;
        } | undefined;
        content?: {
            type: "ABOUT" | "WHAT_TO_LOOK_FOR" | "ROUTINE_GUIDANCE" | "SHOPPING_GUIDANCE" | "EDUCATION";
            id: string;
            order: number;
            heading: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            body: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            enabled?: boolean | undefined;
        }[] | undefined;
        routine?: {
            signalKey?: string | null | undefined;
            signalType?: "CONCERN" | "SKIN_TYPE" | null | undefined;
            templateKeys?: string[] | undefined;
        } | undefined;
        heroMediaKey?: string | null | undefined;
        mobileHeroMediaKey?: string | null | undefined;
        iconMediaKey?: string | null | undefined;
        faq?: {
            id: string;
            order: number;
            question: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            answer: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            enabled?: boolean | undefined;
        }[] | undefined;
        allowEducationalOnly?: boolean | undefined;
        productSort?: "NEWEST" | "NAME" | "PRICE_LOW" | "PRICE_HIGH" | "RELEVANCE" | undefined;
        dynamicBrands?: boolean | undefined;
    }>>;
    internalName: z.ZodOptional<z.ZodString>;
    pageId: z.ZodOptional<z.ZodDefault<z.ZodNullable<z.ZodString>>>;
} & {
    expectedRevision: z.ZodNumber;
    kind: z.ZodOptional<z.ZodEnum<["SKIN_TYPE", "CONCERN"]>>;
}, "strict", z.ZodTypeAny, {
    expectedRevision: number;
    sortOrder?: number | undefined;
    slug?: string | undefined;
    featured?: boolean | undefined;
    config?: {
        name: {
            en: string;
            ar: string;
        };
        schemaVersion: 1;
        seo: {
            description: {
                en: string;
                ar: string;
            };
            title: {
                en: string;
                ar: string;
            };
            indexable: boolean;
            openGraphTitle: {
                en: string;
                ar: string;
            };
            openGraphDescription: {
                en: string;
                ar: string;
            };
            openGraphImageKey: string | null;
        };
        content: {
            type: "ABOUT" | "WHAT_TO_LOOK_FOR" | "ROUTINE_GUIDANCE" | "SHOPPING_GUIDANCE" | "EDUCATION";
            id: string;
            order: number;
            enabled: boolean;
            heading: {
                en: string;
                ar: string;
            };
            body: {
                en: string;
                ar: string;
            };
        }[];
        routine: {
            signalKey: string | null;
            signalType: "CONCERN" | "SKIN_TYPE" | null;
            templateKeys: string[];
        };
        shortDescription: {
            en: string;
            ar: string;
        };
        longDescription: {
            en: string;
            ar: string;
        };
        heroMediaKey: string | null;
        mobileHeroMediaKey: string | null;
        iconMediaKey: string | null;
        faq: {
            id: string;
            order: number;
            enabled: boolean;
            question: {
                en: string;
                ar: string;
            };
            answer: {
                en: string;
                ar: string;
            };
        }[];
        allowEducationalOnly: boolean;
        productSort: "NEWEST" | "NAME" | "PRICE_LOW" | "PRICE_HIGH" | "RELEVANCE";
        dynamicBrands: boolean;
    } | undefined;
    kind?: "CONCERN" | "SKIN_TYPE" | undefined;
    internalName?: string | undefined;
    pageId?: string | null | undefined;
}, {
    expectedRevision: number;
    sortOrder?: number | undefined;
    slug?: string | undefined;
    featured?: boolean | undefined;
    config?: {
        name: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        shortDescription: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        longDescription: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        schemaVersion?: 1 | undefined;
        seo?: {
            description?: {
                en?: string | undefined;
                ar?: string | undefined;
            } | undefined;
            title?: {
                en?: string | undefined;
                ar?: string | undefined;
            } | undefined;
            indexable?: boolean | undefined;
            openGraphTitle?: {
                en?: string | undefined;
                ar?: string | undefined;
            } | undefined;
            openGraphDescription?: {
                en?: string | undefined;
                ar?: string | undefined;
            } | undefined;
            openGraphImageKey?: string | null | undefined;
        } | undefined;
        content?: {
            type: "ABOUT" | "WHAT_TO_LOOK_FOR" | "ROUTINE_GUIDANCE" | "SHOPPING_GUIDANCE" | "EDUCATION";
            id: string;
            order: number;
            heading: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            body: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            enabled?: boolean | undefined;
        }[] | undefined;
        routine?: {
            signalKey?: string | null | undefined;
            signalType?: "CONCERN" | "SKIN_TYPE" | null | undefined;
            templateKeys?: string[] | undefined;
        } | undefined;
        heroMediaKey?: string | null | undefined;
        mobileHeroMediaKey?: string | null | undefined;
        iconMediaKey?: string | null | undefined;
        faq?: {
            id: string;
            order: number;
            question: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            answer: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            enabled?: boolean | undefined;
        }[] | undefined;
        allowEducationalOnly?: boolean | undefined;
        productSort?: "NEWEST" | "NAME" | "PRICE_LOW" | "PRICE_HIGH" | "RELEVANCE" | undefined;
        dynamicBrands?: boolean | undefined;
    } | undefined;
    kind?: "CONCERN" | "SKIN_TYPE" | undefined;
    internalName?: string | undefined;
    pageId?: string | null | undefined;
}>;
export declare const concernMappingsSchema: z.ZodObject<{
    expectedRevision: z.ZodNumber;
    products: z.ZodOptional<z.ZodArray<z.ZodObject<{
        productId: z.ZodString;
        relevance: z.ZodEnum<["PRIMARY", "SECONDARY"]>;
        order: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
    }, "strict", z.ZodTypeAny, {
        productId: string;
        order: number | null;
        relevance: "PRIMARY" | "SECONDARY";
    }, {
        productId: string;
        relevance: "PRIMARY" | "SECONDARY";
        order?: number | null | undefined;
    }>, "many">>;
    ingredients: z.ZodOptional<z.ZodArray<z.ZodObject<{
        ingredientId: z.ZodString;
        role: z.ZodEnum<["FEATURED", "RELEVANT", "USE_WITH_CARE"]>;
        order: z.ZodDefault<z.ZodNullable<z.ZodNumber>>;
    }, "strict", z.ZodTypeAny, {
        role: "FEATURED" | "RELEVANT" | "USE_WITH_CARE";
        order: number | null;
        ingredientId: string;
    }, {
        role: "FEATURED" | "RELEVANT" | "USE_WITH_CARE";
        ingredientId: string;
        order?: number | null | undefined;
    }>, "many">>;
    categories: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        order: z.ZodNumber;
    }, "strict", z.ZodTypeAny, {
        id: string;
        order: number;
    }, {
        id: string;
        order: number;
    }>, "many">>;
    brands: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        order: z.ZodNumber;
    }, "strict", z.ZodTypeAny, {
        id: string;
        order: number;
    }, {
        id: string;
        order: number;
    }>, "many">>;
    relatedConcerns: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        order: z.ZodNumber;
    }, "strict", z.ZodTypeAny, {
        id: string;
        order: number;
    }, {
        id: string;
        order: number;
    }>, "many">>;
}, "strict", z.ZodTypeAny, {
    expectedRevision: number;
    ingredients?: {
        role: "FEATURED" | "RELEVANT" | "USE_WITH_CARE";
        order: number | null;
        ingredientId: string;
    }[] | undefined;
    brands?: {
        id: string;
        order: number;
    }[] | undefined;
    categories?: {
        id: string;
        order: number;
    }[] | undefined;
    products?: {
        productId: string;
        order: number | null;
        relevance: "PRIMARY" | "SECONDARY";
    }[] | undefined;
    relatedConcerns?: {
        id: string;
        order: number;
    }[] | undefined;
}, {
    expectedRevision: number;
    ingredients?: {
        role: "FEATURED" | "RELEVANT" | "USE_WITH_CARE";
        ingredientId: string;
        order?: number | null | undefined;
    }[] | undefined;
    brands?: {
        id: string;
        order: number;
    }[] | undefined;
    categories?: {
        id: string;
        order: number;
    }[] | undefined;
    products?: {
        productId: string;
        relevance: "PRIMARY" | "SECONDARY";
        order?: number | null | undefined;
    }[] | undefined;
    relatedConcerns?: {
        id: string;
        order: number;
    }[] | undefined;
}>;
export declare const bulkConcernProductsSchema: z.ZodObject<{
    expectedRevision: z.ZodNumber;
    operation: z.ZodEnum<["ADD", "REMOVE"]>;
    productIds: z.ZodArray<z.ZodString, "many">;
    relevance: z.ZodDefault<z.ZodEnum<["PRIMARY", "SECONDARY"]>>;
}, "strict", z.ZodTypeAny, {
    productIds: string[];
    expectedRevision: number;
    relevance: "PRIMARY" | "SECONDARY";
    operation: "ADD" | "REMOVE";
}, {
    productIds: string[];
    expectedRevision: number;
    operation: "ADD" | "REMOVE";
    relevance?: "PRIMARY" | "SECONDARY" | undefined;
}>;
export declare const concernRevisionActionSchema: z.ZodObject<{
    expectedRevision: z.ZodNumber;
}, "strict", z.ZodTypeAny, {
    expectedRevision: number;
}, {
    expectedRevision: number;
}>;
export declare const concernListQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    sortBy: z.ZodOptional<z.ZodString>;
    sortOrder: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
} & {
    state: z.ZodOptional<z.ZodEnum<["DRAFT", "ACTIVE", "ARCHIVED"]>>;
    kind: z.ZodOptional<z.ZodEnum<["SKIN_TYPE", "CONCERN"]>>;
    search: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    page: number;
    limit: number;
    sortOrder: "asc" | "desc";
    sortBy?: string | undefined;
    search?: string | undefined;
    state?: "ACTIVE" | "ARCHIVED" | "DRAFT" | undefined;
    kind?: "CONCERN" | "SKIN_TYPE" | undefined;
}, {
    page?: number | undefined;
    limit?: number | undefined;
    sortBy?: string | undefined;
    sortOrder?: "asc" | "desc" | undefined;
    search?: string | undefined;
    state?: "ACTIVE" | "ARCHIVED" | "DRAFT" | undefined;
    kind?: "CONCERN" | "SKIN_TYPE" | undefined;
}>;
export declare const concernProductQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    sortBy: z.ZodOptional<z.ZodString>;
    sortOrder: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
} & {
    category: z.ZodOptional<z.ZodString>;
    brand: z.ZodOptional<z.ZodString>;
    routineRole: z.ZodOptional<z.ZodString>;
    inStock: z.ZodOptional<z.ZodBoolean>;
    minPrice: z.ZodOptional<z.ZodNumber>;
    maxPrice: z.ZodOptional<z.ZodNumber>;
    sort: z.ZodDefault<z.ZodEnum<["RELEVANCE", "NEWEST", "PRICE_LOW", "PRICE_HIGH", "NAME"]>>;
}, "strip", z.ZodTypeAny, {
    sort: "NEWEST" | "NAME" | "PRICE_LOW" | "PRICE_HIGH" | "RELEVANCE";
    page: number;
    limit: number;
    sortOrder: "asc" | "desc";
    sortBy?: string | undefined;
    inStock?: boolean | undefined;
    minPrice?: number | undefined;
    maxPrice?: number | undefined;
    category?: string | undefined;
    brand?: string | undefined;
    routineRole?: string | undefined;
}, {
    sort?: "NEWEST" | "NAME" | "PRICE_LOW" | "PRICE_HIGH" | "RELEVANCE" | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sortBy?: string | undefined;
    sortOrder?: "asc" | "desc" | undefined;
    inStock?: boolean | undefined;
    minPrice?: number | undefined;
    maxPrice?: number | undefined;
    category?: string | undefined;
    brand?: string | undefined;
    routineRole?: string | undefined;
}>;
export declare const concernSummarySchema: z.ZodObject<{
    id: z.ZodString;
    internalName: z.ZodString;
    slug: z.ZodString;
    kind: z.ZodEnum<["SKIN_TYPE", "CONCERN"]>;
    state: z.ZodEnum<["DRAFT", "ACTIVE", "ARCHIVED"]>;
    featured: z.ZodBoolean;
    sortOrder: z.ZodNumber;
    draftRevision: z.ZodNumber;
    publishedRevision: z.ZodNullable<z.ZodNumber>;
    name: z.ZodObject<{} & {
        en: z.ZodDefault<z.ZodString>;
        ar: z.ZodDefault<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        en: string;
        ar: string;
    }, {
        en?: string | undefined;
        ar?: string | undefined;
    }>;
    shortDescription: z.ZodObject<{} & {
        en: z.ZodDefault<z.ZodString>;
        ar: z.ZodDefault<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        en: string;
        ar: string;
    }, {
        en?: string | undefined;
        ar?: string | undefined;
    }>;
    productCount: z.ZodNumber;
    ingredientCount: z.ZodNumber;
    brandCount: z.ZodNumber;
    categoryCount: z.ZodNumber;
    routineReady: z.ZodBoolean;
    pageReady: z.ZodBoolean;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    sortOrder: number;
    id: string;
    updatedAt: string;
    name: {
        en: string;
        ar: string;
    };
    slug: string;
    featured: boolean;
    productCount: number;
    state: "ACTIVE" | "ARCHIVED" | "DRAFT";
    kind: "CONCERN" | "SKIN_TYPE";
    internalName: string;
    shortDescription: {
        en: string;
        ar: string;
    };
    draftRevision: number;
    publishedRevision: number | null;
    ingredientCount: number;
    brandCount: number;
    categoryCount: number;
    routineReady: boolean;
    pageReady: boolean;
}, {
    sortOrder: number;
    id: string;
    updatedAt: string;
    name: {
        en?: string | undefined;
        ar?: string | undefined;
    };
    slug: string;
    featured: boolean;
    productCount: number;
    state: "ACTIVE" | "ARCHIVED" | "DRAFT";
    kind: "CONCERN" | "SKIN_TYPE";
    internalName: string;
    shortDescription: {
        en?: string | undefined;
        ar?: string | undefined;
    };
    draftRevision: number;
    publishedRevision: number | null;
    ingredientCount: number;
    brandCount: number;
    categoryCount: number;
    routineReady: boolean;
    pageReady: boolean;
}>;
export declare const concernListResponseSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        internalName: z.ZodString;
        slug: z.ZodString;
        kind: z.ZodEnum<["SKIN_TYPE", "CONCERN"]>;
        state: z.ZodEnum<["DRAFT", "ACTIVE", "ARCHIVED"]>;
        featured: z.ZodBoolean;
        sortOrder: z.ZodNumber;
        draftRevision: z.ZodNumber;
        publishedRevision: z.ZodNullable<z.ZodNumber>;
        name: z.ZodObject<{} & {
            en: z.ZodDefault<z.ZodString>;
            ar: z.ZodDefault<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            en: string;
            ar: string;
        }, {
            en?: string | undefined;
            ar?: string | undefined;
        }>;
        shortDescription: z.ZodObject<{} & {
            en: z.ZodDefault<z.ZodString>;
            ar: z.ZodDefault<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            en: string;
            ar: string;
        }, {
            en?: string | undefined;
            ar?: string | undefined;
        }>;
        productCount: z.ZodNumber;
        ingredientCount: z.ZodNumber;
        brandCount: z.ZodNumber;
        categoryCount: z.ZodNumber;
        routineReady: z.ZodBoolean;
        pageReady: z.ZodBoolean;
        updatedAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        sortOrder: number;
        id: string;
        updatedAt: string;
        name: {
            en: string;
            ar: string;
        };
        slug: string;
        featured: boolean;
        productCount: number;
        state: "ACTIVE" | "ARCHIVED" | "DRAFT";
        kind: "CONCERN" | "SKIN_TYPE";
        internalName: string;
        shortDescription: {
            en: string;
            ar: string;
        };
        draftRevision: number;
        publishedRevision: number | null;
        ingredientCount: number;
        brandCount: number;
        categoryCount: number;
        routineReady: boolean;
        pageReady: boolean;
    }, {
        sortOrder: number;
        id: string;
        updatedAt: string;
        name: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        slug: string;
        featured: boolean;
        productCount: number;
        state: "ACTIVE" | "ARCHIVED" | "DRAFT";
        kind: "CONCERN" | "SKIN_TYPE";
        internalName: string;
        shortDescription: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        draftRevision: number;
        publishedRevision: number | null;
        ingredientCount: number;
        brandCount: number;
        categoryCount: number;
        routineReady: boolean;
        pageReady: boolean;
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
        sortOrder: number;
        id: string;
        updatedAt: string;
        name: {
            en: string;
            ar: string;
        };
        slug: string;
        featured: boolean;
        productCount: number;
        state: "ACTIVE" | "ARCHIVED" | "DRAFT";
        kind: "CONCERN" | "SKIN_TYPE";
        internalName: string;
        shortDescription: {
            en: string;
            ar: string;
        };
        draftRevision: number;
        publishedRevision: number | null;
        ingredientCount: number;
        brandCount: number;
        categoryCount: number;
        routineReady: boolean;
        pageReady: boolean;
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
        sortOrder: number;
        id: string;
        updatedAt: string;
        name: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        slug: string;
        featured: boolean;
        productCount: number;
        state: "ACTIVE" | "ARCHIVED" | "DRAFT";
        kind: "CONCERN" | "SKIN_TYPE";
        internalName: string;
        shortDescription: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        draftRevision: number;
        publishedRevision: number | null;
        ingredientCount: number;
        brandCount: number;
        categoryCount: number;
        routineReady: boolean;
        pageReady: boolean;
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
export type ConcernConfig = z.infer<typeof concernConfigSchema>;
export type CreateConcernInput = z.infer<typeof createConcernSchema>;
export type UpdateConcernDraftInput = z.infer<typeof updateConcernDraftSchema>;
export type ConcernMappingsInput = z.infer<typeof concernMappingsSchema>;
export type BulkConcernProductsInput = z.infer<typeof bulkConcernProductsSchema>;
export type ConcernListQuery = z.infer<typeof concernListQuerySchema>;
export type ConcernProductQuery = z.infer<typeof concernProductQuerySchema>;
//# sourceMappingURL=concern.schema.d.ts.map