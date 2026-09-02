"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.concernListResponseSchema = exports.concernSummarySchema = exports.concernProductQuerySchema = exports.concernListQuerySchema = exports.concernRevisionActionSchema = exports.bulkConcernProductsSchema = exports.concernMappingsSchema = exports.updateConcernDraftSchema = exports.createConcernSchema = exports.concernOrderedEntitySchema = exports.concernIngredientMappingSchema = exports.concernProductMappingSchema = exports.concernConfigSchema = exports.concernContentBlockSchema = exports.concernFaqSchema = exports.concernLocalizedTextSchema = exports.concernIngredientRoleSchema = exports.concernRelevanceSchema = exports.concernKindSchema = exports.concernStateSchema = void 0;
const zod_1 = require("zod");
const pagination_1 = require("../common/pagination");
const primitives_1 = require("../common/primitives");
exports.concernStateSchema = zod_1.z.enum(["DRAFT", "ACTIVE", "ARCHIVED"]);
exports.concernKindSchema = zod_1.z.enum(["SKIN_TYPE", "CONCERN"]);
exports.concernRelevanceSchema = zod_1.z.enum(["PRIMARY", "SECONDARY"]);
exports.concernIngredientRoleSchema = zod_1.z.enum([
    "FEATURED",
    "RELEVANT",
    "USE_WITH_CARE",
]);
exports.concernLocalizedTextSchema = zod_1.z
    .object({
    en: zod_1.z.string().trim().max(8_000).default(""),
    ar: zod_1.z.string().trim().max(8_000).default(""),
})
    .strict();
const shortTextSchema = exports.concernLocalizedTextSchema.extend({
    en: zod_1.z.string().trim().max(500).default(""),
    ar: zod_1.z.string().trim().max(500).default(""),
});
exports.concernFaqSchema = zod_1.z
    .object({
    id: primitives_1.uuidSchema,
    question: shortTextSchema,
    answer: exports.concernLocalizedTextSchema,
    enabled: zod_1.z.boolean().default(true),
    order: zod_1.z.number().int().min(0).max(10_000),
})
    .strict();
exports.concernContentBlockSchema = zod_1.z
    .object({
    id: primitives_1.uuidSchema,
    type: zod_1.z.enum([
        "ABOUT",
        "WHAT_TO_LOOK_FOR",
        "ROUTINE_GUIDANCE",
        "SHOPPING_GUIDANCE",
        "EDUCATION",
    ]),
    heading: shortTextSchema,
    body: exports.concernLocalizedTextSchema,
    enabled: zod_1.z.boolean().default(true),
    order: zod_1.z.number().int().min(0).max(10_000),
})
    .strict();
exports.concernConfigSchema = zod_1.z
    .object({
    schemaVersion: zod_1.z.literal(1).default(1),
    name: shortTextSchema,
    shortDescription: shortTextSchema,
    longDescription: exports.concernLocalizedTextSchema,
    heroMediaKey: zod_1.z.string().trim().max(2_048).nullable().default(null),
    mobileHeroMediaKey: zod_1.z.string().trim().max(2_048).nullable().default(null),
    iconMediaKey: zod_1.z.string().trim().max(2_048).nullable().default(null),
    content: zod_1.z.array(exports.concernContentBlockSchema).max(30).default([]),
    faq: zod_1.z.array(exports.concernFaqSchema).max(50).default([]),
    routine: zod_1.z
        .object({
        signalType: zod_1.z.enum(["SKIN_TYPE", "CONCERN"]).nullable().default(null),
        signalKey: zod_1.z
            .string()
            .trim()
            .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
            .max(80)
            .nullable()
            .default(null),
        templateKeys: zod_1.z
            .array(zod_1.z.string().trim().min(1).max(80))
            .max(30)
            .default([]),
    })
        .strict()
        .default({}),
    seo: zod_1.z
        .object({
        title: shortTextSchema.default({ en: "", ar: "" }),
        description: shortTextSchema.default({ en: "", ar: "" }),
        openGraphTitle: shortTextSchema.default({ en: "", ar: "" }),
        openGraphDescription: shortTextSchema.default({ en: "", ar: "" }),
        openGraphImageKey: zod_1.z
            .string()
            .trim()
            .max(2_048)
            .nullable()
            .default(null),
        indexable: zod_1.z.boolean().default(true),
    })
        .strict()
        .default({}),
    allowEducationalOnly: zod_1.z.boolean().default(false),
    productSort: zod_1.z
        .enum(["RELEVANCE", "NEWEST", "PRICE_LOW", "PRICE_HIGH", "NAME"])
        .default("RELEVANCE"),
    dynamicBrands: zod_1.z.boolean().default(true),
})
    .strict();
exports.concernProductMappingSchema = zod_1.z
    .object({
    productId: primitives_1.uuidSchema,
    relevance: exports.concernRelevanceSchema,
    order: zod_1.z.number().int().min(0).max(1_000_000).nullable().default(null),
})
    .strict();
exports.concernIngredientMappingSchema = zod_1.z
    .object({
    ingredientId: primitives_1.uuidSchema,
    role: exports.concernIngredientRoleSchema,
    order: zod_1.z.number().int().min(0).max(1_000_000).nullable().default(null),
})
    .strict();
exports.concernOrderedEntitySchema = zod_1.z
    .object({
    id: primitives_1.uuidSchema,
    order: zod_1.z.number().int().min(0).max(1_000_000),
})
    .strict();
exports.createConcernSchema = zod_1.z
    .object({
    internalName: zod_1.z.string().trim().min(2).max(160),
    slug: zod_1.z
        .string()
        .trim()
        .toLowerCase()
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
        .max(140),
    kind: exports.concernKindSchema.default("CONCERN"),
    featured: zod_1.z.boolean().default(false),
    sortOrder: zod_1.z.number().int().min(-100_000).max(100_000).default(0),
    config: exports.concernConfigSchema,
    pageId: primitives_1.uuidSchema.nullable().default(null),
})
    .strict();
exports.updateConcernDraftSchema = exports.createConcernSchema
    .omit({ kind: true })
    .partial()
    .extend({
    expectedRevision: zod_1.z.number().int().positive(),
    kind: exports.concernKindSchema.optional(),
})
    .strict();
exports.concernMappingsSchema = zod_1.z
    .object({
    expectedRevision: zod_1.z.number().int().positive(),
    products: zod_1.z.array(exports.concernProductMappingSchema).max(20_000).optional(),
    ingredients: zod_1.z.array(exports.concernIngredientMappingSchema).max(2_000).optional(),
    categories: zod_1.z.array(exports.concernOrderedEntitySchema).max(200).optional(),
    brands: zod_1.z.array(exports.concernOrderedEntitySchema).max(500).optional(),
    relatedConcerns: zod_1.z.array(exports.concernOrderedEntitySchema).max(200).optional(),
})
    .strict();
exports.bulkConcernProductsSchema = zod_1.z
    .object({
    expectedRevision: zod_1.z.number().int().positive(),
    operation: zod_1.z.enum(["ADD", "REMOVE"]),
    productIds: zod_1.z.array(primitives_1.uuidSchema).min(1).max(10_000),
    relevance: exports.concernRelevanceSchema.default("SECONDARY"),
})
    .strict();
exports.concernRevisionActionSchema = zod_1.z
    .object({ expectedRevision: zod_1.z.number().int().positive() })
    .strict();
exports.concernListQuerySchema = pagination_1.paginationQuerySchema.extend({
    state: exports.concernStateSchema.optional(),
    kind: exports.concernKindSchema.optional(),
    search: zod_1.z.string().trim().max(160).optional(),
});
exports.concernProductQuerySchema = pagination_1.paginationQuerySchema.extend({
    category: zod_1.z.string().trim().max(140).optional(),
    brand: zod_1.z.string().trim().max(140).optional(),
    routineRole: zod_1.z.string().trim().max(80).optional(),
    inStock: zod_1.z.coerce.boolean().optional(),
    minPrice: zod_1.z.coerce.number().int().nonnegative().optional(),
    maxPrice: zod_1.z.coerce.number().int().nonnegative().optional(),
    sort: zod_1.z
        .enum(["RELEVANCE", "NEWEST", "PRICE_LOW", "PRICE_HIGH", "NAME"])
        .default("RELEVANCE"),
});
exports.concernSummarySchema = zod_1.z.object({
    id: primitives_1.uuidSchema,
    internalName: zod_1.z.string(),
    slug: zod_1.z.string(),
    kind: exports.concernKindSchema,
    state: exports.concernStateSchema,
    featured: zod_1.z.boolean(),
    sortOrder: zod_1.z.number().int(),
    draftRevision: zod_1.z.number().int(),
    publishedRevision: zod_1.z.number().int().nullable(),
    name: shortTextSchema,
    shortDescription: shortTextSchema,
    productCount: zod_1.z.number().int().nonnegative(),
    ingredientCount: zod_1.z.number().int().nonnegative(),
    brandCount: zod_1.z.number().int().nonnegative(),
    categoryCount: zod_1.z.number().int().nonnegative(),
    routineReady: zod_1.z.boolean(),
    pageReady: zod_1.z.boolean(),
    updatedAt: zod_1.z.string().datetime(),
});
exports.concernListResponseSchema = (0, pagination_1.paginated)(exports.concernSummarySchema);
//# sourceMappingURL=concern.schema.js.map