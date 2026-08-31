"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_ROUTINE_BUILDER_CONFIG = exports.routineCartInputSchema = exports.routineEventInputSchema = exports.routineProductProfileInputSchema = exports.routineDraftSaveSchema = exports.routineEvaluationInputSchema = exports.routineAnswersSchema = exports.routineAnswerValueSchema = exports.routineBuilderConfigSchema = exports.routineContextualCompletionSchema = exports.routineAnchorBoostRuleSchema = exports.routineTemplateUniverseSchema = exports.routineTemplateSchema = exports.routineTemplateVariantSchema = exports.routineTemplateConstraintSchema = exports.routineTemplatePresentationSchema = exports.routineTemplateFallbackPolicySchema = exports.routineTemplateBudgetPolicySchema = exports.routineTemplateSelectionRuleSchema = exports.routineStepPresetSchema = exports.routineTemplateTagSchema = exports.routineTemplatePackSchema = exports.routineTemplateFamilySchema = exports.routineTemplateStepSchema = exports.routineCompatibilityRuleSchema = exports.routineRuleSchema = exports.routineRuleEffectSchema = exports.routineTargetSchema = exports.routineRoleSchema = exports.routineConcernSchema = exports.routineQuestionSchema = exports.routineAnswerSchema = exports.routineSignalDefinitionSchema = exports.routineSignalSchema = exports.routineSignalConditionGroupSchema = exports.routineSignalConditionSchema = exports.routineSignalOperatorSchema = exports.routineConditionGroupSchema = exports.routineConditionSchema = exports.routineOperatorSchema = exports.routineQuestionTypeSchema = exports.routineLocalizedTextSchema = exports.routineKeySchema = exports.routineBuilderSchemaVersion = void 0;
const zod_1 = require("zod");
exports.routineBuilderSchemaVersion = 2;
exports.routineKeySchema = zod_1.z
    .string()
    .trim()
    .min(2)
    .max(80)
    .regex(/^[a-z][a-z0-9]*(?:(?:-|\.)[a-z0-9]+)*$/, "Use a stable lowercase key with hyphen or dot-separated segments.");
exports.routineLocalizedTextSchema = zod_1.z.object({
    en: zod_1.z.string().trim().max(500),
    ar: zod_1.z.string().trim().max(500),
});
exports.routineQuestionTypeSchema = zod_1.z.enum([
    "SINGLE_CHOICE",
    "MULTIPLE_CHOICE",
    "RANKED_CHOICE",
    "YES_NO",
    "SCALE",
    "OPTIONAL_TEXT",
    "NUMERIC_RANGE",
    "PRODUCT_SELECTION",
    "INGREDIENT_PREFERENCE",
]);
exports.routineOperatorSchema = zod_1.z.enum([
    "EQUALS",
    "NOT_EQUALS",
    "CONTAINS",
    "CONTAINS_ANY",
    "CONTAINS_ALL",
    "GREATER_THAN",
    "LESS_THAN",
]);
exports.routineConditionSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    questionKey: exports.routineKeySchema,
    operator: exports.routineOperatorSchema,
    value: zod_1.z.union([
        zod_1.z.string().max(160),
        zod_1.z.number().finite(),
        zod_1.z.boolean(),
        zod_1.z.array(zod_1.z.string().max(160)).max(30),
    ]),
});
exports.routineConditionGroupSchema = zod_1.z.object({
    mode: zod_1.z.enum(["ALL", "ANY"]),
    conditions: zod_1.z.array(exports.routineConditionSchema).max(20),
});
exports.routineSignalOperatorSchema = zod_1.z.enum([
    "EXISTS",
    "NOT_EXISTS",
    "EQUALS",
    "NOT_EQUALS",
    "CONTAINS",
    "GREATER_THAN_OR_EQUAL",
    "LESS_THAN_OR_EQUAL",
]);
exports.routineSignalConditionSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    signalKey: exports.routineKeySchema,
    operator: exports.routineSignalOperatorSchema,
    value: zod_1.z
        .union([
        zod_1.z.string().max(160),
        zod_1.z.number().finite(),
        zod_1.z.boolean(),
        zod_1.z.array(zod_1.z.string().max(160)).max(30),
    ])
        .nullable()
        .default(null),
});
exports.routineSignalConditionGroupSchema = zod_1.z.object({
    mode: zod_1.z.enum(["ALL", "ANY"]),
    conditions: zod_1.z.array(exports.routineSignalConditionSchema).max(30),
});
exports.routineSignalSchema = zod_1.z.object({
    key: exports.routineKeySchema,
    value: zod_1.z.union([
        zod_1.z.string().max(160),
        zod_1.z.number().finite(),
        zod_1.z.boolean(),
        zod_1.z.array(zod_1.z.string().max(160)).max(30),
    ]),
    weight: zod_1.z.number().finite().min(-100).max(100).optional(),
});
/**
 * Signals are configuration-owned vocabulary. The purpose field gives the
 * engine a small set of safe, non-Turing-complete semantics while normal
 * relevance signals remain completely Admin-defined.
 */
exports.routineSignalDefinitionSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    key: exports.routineKeySchema,
    family: exports.routineKeySchema,
    label: exports.routineLocalizedTextSchema,
    description: exports.routineLocalizedTextSchema.default({ en: "", ar: "" }),
    valueType: zod_1.z
        .enum(["NUMBER", "BOOLEAN", "KEYWORD", "KEYWORD_LIST"])
        .default("NUMBER"),
    aggregation: zod_1.z.enum(["SUM", "MAX", "LAST"]).default("SUM"),
    purpose: zod_1.z.enum(["PROFILE", "BUDGET_MAX", "OWNED_ROLE"]).default("PROFILE"),
    enabled: zod_1.z.boolean().default(true),
});
exports.routineAnswerSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    key: exports.routineKeySchema,
    label: exports.routineLocalizedTextSchema,
    description: exports.routineLocalizedTextSchema.default({ en: "", ar: "" }),
    signals: zod_1.z.array(exports.routineSignalSchema).max(12).default([]),
    order: zod_1.z.number().int().min(0).max(1_000),
    enabled: zod_1.z.boolean().default(true),
});
exports.routineQuestionSchema = zod_1.z
    .object({
    id: zod_1.z.string().uuid(),
    key: exports.routineKeySchema,
    type: exports.routineQuestionTypeSchema,
    label: exports.routineLocalizedTextSchema,
    description: exports.routineLocalizedTextSchema.default({ en: "", ar: "" }),
    helpText: exports.routineLocalizedTextSchema.default({ en: "", ar: "" }),
    required: zod_1.z.boolean().default(true),
    modes: zod_1.z
        .array(zod_1.z.enum(["FULL", "CONTEXTUAL"]))
        .min(1)
        .max(2)
        .default(["FULL", "CONTEXTUAL"]),
    contextualRequired: zod_1.z.boolean().default(false),
    contextualOrder: zod_1.z
        .number()
        .int()
        .min(0)
        .max(1_000)
        .nullable()
        .default(null),
    enabled: zod_1.z.boolean().default(true),
    order: zod_1.z.number().int().min(0).max(1_000),
    visibility: exports.routineConditionGroupSchema.nullable().default(null),
    /** Optional managed signal receiving SCALE/NUMERIC_RANGE values directly. */
    directSignalKey: exports.routineKeySchema.nullable().optional(),
    answers: zod_1.z.array(exports.routineAnswerSchema).max(60).default([]),
    minSelections: zod_1.z.number().int().min(0).max(20).default(0),
    maxSelections: zod_1.z.number().int().min(1).max(20).default(1),
    scale: zod_1.z
        .object({
        min: zod_1.z.number().finite(),
        max: zod_1.z.number().finite(),
        step: zod_1.z.number().positive(),
    })
        .nullable()
        .default(null),
})
    .superRefine((question, context) => {
    const choice = [
        "SINGLE_CHOICE",
        "MULTIPLE_CHOICE",
        "RANKED_CHOICE",
        "YES_NO",
    ].includes(question.type);
    if (choice &&
        question.answers.filter((answer) => answer.enabled).length < 1) {
        context.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            path: ["answers"],
            message: "Choice questions need at least one enabled answer.",
        });
    }
    if (question.minSelections > question.maxSelections) {
        context.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            path: ["minSelections"],
            message: "Minimum selections cannot exceed maximum selections.",
        });
    }
});
exports.routineConcernSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    key: exports.routineKeySchema,
    label: exports.routineLocalizedTextSchema,
    description: exports.routineLocalizedTextSchema.default({ en: "", ar: "" }),
    enabled: zod_1.z.boolean().default(true),
    order: zod_1.z.number().int().min(0).max(1_000),
});
exports.routineRoleSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    key: exports.routineKeySchema,
    label: exports.routineLocalizedTextSchema,
    description: exports.routineLocalizedTextSchema.default({ en: "", ar: "" }),
    amOrder: zod_1.z.number().int().min(0).max(100),
    pmOrder: zod_1.z.number().int().min(0).max(100),
    domain: exports.routineKeySchema.nullable().default(null),
    amAllowed: zod_1.z.boolean().default(true),
    pmAllowed: zod_1.z.boolean().default(true),
    defaultPriority: zod_1.z.number().int().min(0).max(100).default(50),
    enabled: zod_1.z.boolean().default(true),
});
exports.routineTargetSchema = zod_1.z.object({
    kind: zod_1.z.enum([
        "ALL",
        "PRODUCT",
        "VARIANT",
        "CATEGORY",
        "BRAND",
        "TAG",
        "INGREDIENT",
        "ROLE",
    ]),
    ids: zod_1.z.array(zod_1.z.string().uuid()).max(200).default([]),
    keys: zod_1.z.array(exports.routineKeySchema).max(80).default([]),
});
exports.routineRuleEffectSchema = zod_1.z.discriminatedUnion("type", [
    zod_1.z.object({
        type: zod_1.z.literal("BOOST"),
        target: exports.routineTargetSchema,
        score: zod_1.z.number().int().min(-10_000).max(10_000),
        channel: zod_1.z.enum(["RECOMMENDATION", "MERCHANDISING"]).optional(),
    }),
    zod_1.z.object({
        type: zod_1.z.literal("EXCLUDE"),
        target: exports.routineTargetSchema,
        reason: exports.routineLocalizedTextSchema,
    }),
    zod_1.z.object({
        type: zod_1.z.literal("SELECT_TEMPLATE"),
        templateKey: exports.routineKeySchema,
    }),
    zod_1.z.object({
        type: zod_1.z.literal("NO_RESULT"),
        message: exports.routineLocalizedTextSchema,
    }),
]);
exports.routineRuleSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    key: exports.routineKeySchema,
    name: exports.routineLocalizedTextSchema,
    enabled: zod_1.z.boolean().default(true),
    priority: zod_1.z.number().int().min(-10_000).max(10_000).default(0),
    when: exports.routineConditionGroupSchema,
    effects: zod_1.z.array(exports.routineRuleEffectSchema).min(1).max(20),
});
exports.routineCompatibilityRuleSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    key: exports.routineKeySchema,
    name: exports.routineLocalizedTextSchema,
    enabled: zod_1.z.boolean().default(true),
    priority: zod_1.z.number().int().min(-10_000).max(10_000).default(0),
    effect: zod_1.z.enum([
        "BLOCK_SAME_ROUTINE",
        "WARN",
        "AM_ONLY",
        "PM_ONLY",
        "ALTERNATE",
        "MAX_ONE_FROM_GROUP",
    ]),
    left: exports.routineTargetSchema,
    right: exports.routineTargetSchema.nullable().default(null),
    message: exports.routineLocalizedTextSchema,
});
exports.routineTemplateStepSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    roleKey: exports.routineKeySchema,
    period: zod_1.z.enum(["AM", "PM"]),
    required: zod_1.z.boolean().default(true),
    order: zod_1.z.number().int().min(0).max(100),
    target: exports.routineTargetSchema.default({ kind: "ALL", ids: [], keys: [] }),
    preferredProductIds: zod_1.z.array(zod_1.z.string().uuid()).max(20).default([]),
    maxAlternatives: zod_1.z.number().int().min(0).max(5).default(2),
    conditions: exports.routineSignalConditionGroupSchema.nullable().default(null),
    optionalPriority: zod_1.z.number().int().min(0).max(100).default(50),
    fallbackMode: zod_1.z
        .enum(["FAIL_TEMPLATE", "SKIP_OPTIONAL", "USE_FALLBACK_ROLE"])
        .default("FAIL_TEMPLATE"),
    fallbackRoleKeys: zod_1.z.array(exports.routineKeySchema).max(10).default([]),
    spendingWeight: zod_1.z.number().min(0).max(1).nullable().default(null),
});
exports.routineTemplateFamilySchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    key: exports.routineKeySchema,
    name: exports.routineLocalizedTextSchema,
    description: exports.routineLocalizedTextSchema.default({ en: "", ar: "" }),
    order: zod_1.z.number().int().min(0).max(10_000).default(0),
    enabled: zod_1.z.boolean().default(true),
});
exports.routineTemplatePackSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    key: exports.routineKeySchema,
    name: exports.routineLocalizedTextSchema,
    description: exports.routineLocalizedTextSchema.default({ en: "", ar: "" }),
    version: zod_1.z.number().int().min(1).max(100_000).default(1),
    source: zod_1.z.enum(["BIOREZA", "ADMIN", "IMPORTED"]).default("ADMIN"),
    createdAt: zod_1.z.string().datetime().nullable().default(null),
});
exports.routineTemplateTagSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    key: exports.routineKeySchema,
    label: exports.routineLocalizedTextSchema,
    enabled: zod_1.z.boolean().default(true),
});
exports.routineStepPresetSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    key: exports.routineKeySchema,
    name: exports.routineLocalizedTextSchema,
    description: exports.routineLocalizedTextSchema.default({ en: "", ar: "" }),
    domain: exports.routineKeySchema,
    steps: zod_1.z.array(exports.routineTemplateStepSchema).min(1).max(30),
    enabled: zod_1.z.boolean().default(true),
});
exports.routineTemplateSelectionRuleSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    name: exports.routineLocalizedTextSchema,
    when: exports.routineSignalConditionGroupSchema,
    score: zod_1.z.number().int().min(-10_000).max(10_000),
});
exports.routineTemplateBudgetPolicySchema = zod_1.z.object({
    mode: zod_1.z
        .enum(["IGNORE", "RESPECT_CUSTOMER", "HARD", "SOFT"])
        .default("RESPECT_CUSTOMER"),
    maximum: zod_1.z.number().int().positive().nullable().default(null),
});
exports.routineTemplateFallbackPolicySchema = zod_1.z.object({
    requiredStep: zod_1.z
        .enum(["FAIL_TEMPLATE", "USE_STEP_FALLBACK"])
        .default("FAIL_TEMPLATE"),
    optionalStep: zod_1.z.literal("SKIP").default("SKIP"),
    fallbackTemplateKey: exports.routineKeySchema.nullable().default(null),
});
exports.routineTemplatePresentationSchema = zod_1.z.object({
    style: zod_1.z
        .enum(["MINIMAL", "EDITORIAL", "STEP_BY_STEP", "COMPACT", "DETAILED"])
        .default("STEP_BY_STEP"),
    estimatedMinutes: zod_1.z.number().int().min(1).max(120).nullable().default(null),
    thumbnailKey: zod_1.z.string().trim().max(500).nullable().default(null),
    themeKey: exports.routineKeySchema.nullable().default(null),
    intro: exports.routineLocalizedTextSchema.default({ en: "", ar: "" }),
    outro: exports.routineLocalizedTextSchema.default({ en: "", ar: "" }),
    customerVisible: zod_1.z.boolean().default(true),
});
exports.routineTemplateConstraintSchema = zod_1.z.object({
    mode: zod_1.z.enum(["NONE", "PREFERRED", "ONLY"]).default("NONE"),
    entityId: zod_1.z.string().uuid().nullable().default(null),
    parameterized: zod_1.z.boolean().default(false),
});
exports.routineTemplateVariantSchema = zod_1.z.object({
    kind: zod_1.z
        .enum([
        "BASE",
        "SKIN_TYPE",
        "CONCERN",
        "COMPLEXITY",
        "BUDGET",
        "SEASONAL",
        "LIFESTYLE",
        "ANCHOR_ROLE",
        "BRAND",
        "CATEGORY",
        "CUSTOM",
    ])
        .default("BASE"),
    parameters: zod_1.z
        .record(exports.routineKeySchema, zod_1.z.union([
        zod_1.z.string().max(160),
        zod_1.z.number().finite(),
        zod_1.z.boolean(),
        zod_1.z.array(zod_1.z.string().max(160)).max(30),
    ]))
        .default({}),
});
exports.routineTemplateSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    key: exports.routineKeySchema,
    name: exports.routineLocalizedTextSchema,
    internalName: zod_1.z.string().trim().min(2).max(160).optional(),
    description: exports.routineLocalizedTextSchema.default({ en: "", ar: "" }),
    enabled: zod_1.z.boolean().default(true),
    status: zod_1.z
        .enum(["DRAFT", "PUBLISHED", "SCHEDULED", "PAUSED", "ARCHIVED"])
        .default("PUBLISHED"),
    version: zod_1.z.number().int().min(1).max(100_000).default(1),
    priority: zod_1.z.number().int().min(-10_000).max(10_000).default(0),
    domain: exports.routineKeySchema.nullable().default(null),
    familyKey: exports.routineKeySchema.nullable().default(null),
    complexity: exports.routineKeySchema.nullable().default(null),
    packKey: exports.routineKeySchema.nullable().default(null),
    tags: zod_1.z.array(exports.routineKeySchema).max(40).default([]),
    baseTemplateKey: exports.routineKeySchema.nullable().default(null),
    variant: exports.routineTemplateVariantSchema.default({}),
    hardEligibility: exports.routineSignalConditionGroupSchema.nullable().default(null),
    selectionRules: zod_1.z
        .array(exports.routineTemplateSelectionRuleSchema)
        .max(60)
        .default([]),
    allowedAnchorRoles: zod_1.z.array(exports.routineKeySchema).max(40).default([]),
    conditions: exports.routineConditionGroupSchema.nullable().default(null),
    steps: zod_1.z.array(exports.routineTemplateStepSchema).max(30),
    budgetPolicy: exports.routineTemplateBudgetPolicySchema.nullable().default(null),
    fallbackPolicy: exports.routineTemplateFallbackPolicySchema.nullable().default(null),
    compatibilityPolicy: zod_1.z
        .enum(["STRICT", "STANDARD"])
        .default("STRICT"),
    brandConstraint: exports.routineTemplateConstraintSchema.default({}),
    categoryConstraint: exports.routineTemplateConstraintSchema.default({}),
    presentation: exports.routineTemplatePresentationSchema.default({}),
    schedule: zod_1.z
        .object({
        startsAt: zod_1.z.string().datetime().nullable().default(null),
        endsAt: zod_1.z.string().datetime().nullable().default(null),
    })
        .default({}),
    pinned: zod_1.z.boolean().default(false),
});
exports.routineTemplateUniverseSchema = zod_1.z.object({
    families: zod_1.z.array(exports.routineTemplateFamilySchema).max(100).default([]),
    packs: zod_1.z.array(exports.routineTemplatePackSchema).max(100).default([]),
    tags: zod_1.z.array(exports.routineTemplateTagSchema).max(200).default([]),
    stepPresets: zod_1.z.array(exports.routineStepPresetSchema).max(200).default([]),
    fallbackTemplateKey: exports.routineKeySchema.nullable().default(null),
    customerChoiceEnabled: zod_1.z.boolean().default(false),
    customerChoiceFamilies: zod_1.z.array(exports.routineKeySchema).max(20).default([]),
});
exports.routineAnchorBoostRuleSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    key: exports.routineKeySchema,
    name: exports.routineLocalizedTextSchema,
    enabled: zod_1.z.boolean().default(true),
    priority: zod_1.z.number().int().min(-10_000).max(10_000).default(0),
    anchor: exports.routineTargetSchema,
    candidate: exports.routineTargetSchema,
    score: zod_1.z.number().int().min(-10_000).max(10_000),
    channel: zod_1.z
        .enum(["RECOMMENDATION", "MERCHANDISING"])
        .default("RECOMMENDATION"),
});
exports.routineContextualCompletionSchema = zod_1.z.object({
    enabled: zod_1.z.boolean().default(false),
    enabledDomains: zod_1.z.array(exports.routineKeySchema).max(40).default([]),
    eligibleAnchorRoles: zod_1.z.array(exports.routineKeySchema).max(40).default([]),
    defaultTemplateKeys: zod_1.z.record(exports.routineKeySchema, exports.routineKeySchema).default({}),
    allowUnavailableAnchorPlanning: zod_1.z.boolean().default(false),
    requireApprovedReason: zod_1.z.boolean().default(false),
    anchorBoostRules: zod_1.z.array(exports.routineAnchorBoostRuleSchema).max(200).default([]),
    title: exports.routineLocalizedTextSchema.default({
        en: "Complete Your Routine",
        ar: "أكملي روتينك",
    }),
    introduction: exports.routineLocalizedTextSchema.default({
        en: "Build a compatible routine around the product you selected.",
        ar: "ابني روتيناً متوافقاً حول المنتج الذي اخترته.",
    }),
    unavailableMessage: exports.routineLocalizedTextSchema.default({
        en: "This product isn't currently available for routine building.",
        ar: "هذا المنتج غير متاح حالياً لبناء روتين حوله.",
    }),
    anchorExplanation: exports.routineLocalizedTextSchema.default({
        en: "This is the product you chose to build your routine around.",
        ar: "هذا هو المنتج الذي اخترته لبناء روتينك حوله.",
    }),
});
exports.routineBuilderConfigSchema = zod_1.z
    .object({
    schemaVersion: zod_1.z.union([zod_1.z.literal(1), zod_1.z.literal(exports.routineBuilderSchemaVersion)]),
    title: exports.routineLocalizedTextSchema,
    introduction: exports.routineLocalizedTextSchema,
    estimatedMinutes: zod_1.z.number().int().min(1).max(20).default(3),
    startLabel: exports.routineLocalizedTextSchema,
    resultTitle: exports.routineLocalizedTextSchema,
    disclaimer: exports.routineLocalizedTextSchema,
    noResult: exports.routineLocalizedTextSchema,
    questions: zod_1.z.array(exports.routineQuestionSchema).max(80),
    signals: zod_1.z.array(exports.routineSignalDefinitionSchema).max(300).optional(),
    concerns: zod_1.z.array(exports.routineConcernSchema).max(100),
    roles: zod_1.z.array(exports.routineRoleSchema).max(40),
    rules: zod_1.z.array(exports.routineRuleSchema).max(300),
    compatibilityRules: zod_1.z.array(exports.routineCompatibilityRuleSchema).max(300),
    templates: zod_1.z.array(exports.routineTemplateSchema).max(2_000),
    templateUniverse: exports.routineTemplateUniverseSchema.default({}),
    contextualCompletion: exports.routineContextualCompletionSchema.default({}),
    settings: zod_1.z.object({
        maximumProductsPerBrand: zod_1.z
            .number()
            .int()
            .min(0)
            .max(20)
            .nullable()
            .default(null),
        preferBrandDiversity: zod_1.z.boolean().default(false),
        allowDuplicateProducts: zod_1.z.boolean().default(false),
        budgetExceeded: exports.routineLocalizedTextSchema.optional(),
    }),
})
    .superRefine((config, context) => {
    const collections = [
        ["questions", config.questions],
        ["signals", config.signals ?? []],
        ["concerns", config.concerns],
        ["roles", config.roles],
        ["rules", config.rules],
        ["compatibilityRules", config.compatibilityRules],
        ["templates", config.templates],
        ["templateUniverse.families", config.templateUniverse.families],
        ["templateUniverse.packs", config.templateUniverse.packs],
        ["templateUniverse.tags", config.templateUniverse.tags],
        ["templateUniverse.stepPresets", config.templateUniverse.stepPresets],
    ];
    for (const [path, values] of collections) {
        const seen = new Set();
        values.forEach((value, index) => {
            if (seen.has(value.key))
                context.addIssue({
                    code: zod_1.z.ZodIssueCode.custom,
                    path: [path, index, "key"],
                    message: `Duplicate stable key: ${value.key}`,
                });
            seen.add(value.key);
        });
    }
});
exports.routineAnswerValueSchema = zod_1.z.union([
    zod_1.z.string().max(2_000),
    zod_1.z.number().finite(),
    zod_1.z.boolean(),
    zod_1.z.array(zod_1.z.string().max(160)).max(100),
]);
exports.routineAnswersSchema = zod_1.z.record(exports.routineKeySchema, exports.routineAnswerValueSchema);
exports.routineEvaluationInputSchema = zod_1.z.object({
    sessionId: zod_1.z.string().uuid().optional(),
    answers: exports.routineAnswersSchema,
    locale: zod_1.z.enum(["en", "ar"]).default("en"),
    mode: zod_1.z.enum(["FULL", "CONTEXTUAL"]).default("FULL"),
    anchor: zod_1.z
        .object({
        productId: zod_1.z.string().uuid(),
        variantId: zod_1.z.string().uuid().optional(),
        alreadyOwned: zod_1.z.boolean().default(false),
    })
        .nullable()
        .default(null),
    selectedVariants: zod_1.z.record(zod_1.z.string().uuid(), zod_1.z.string().uuid()).default({}),
    requestedTemplateKey: exports.routineKeySchema.nullable().default(null),
    templateParameters: zod_1.z
        .object({
        brandId: zod_1.z.string().uuid().nullable().default(null),
        categoryId: zod_1.z.string().uuid().nullable().default(null),
    })
        .default({}),
    includeDiagnostics: zod_1.z.boolean().default(false),
});
exports.routineDraftSaveSchema = zod_1.z.object({
    expectedRevision: zod_1.z.number().int().min(1),
    config: exports.routineBuilderConfigSchema,
});
exports.routineProductProfileInputSchema = zod_1.z.object({
    roles: zod_1.z.array(exports.routineKeySchema).max(20),
    primaryRole: exports.routineKeySchema.nullable().default(null),
    domain: exports.routineKeySchema.default("skin-care"),
    completionEligibility: zod_1.z.enum(["AUTO", "YES", "NO"]).default("AUTO"),
    skinTypes: zod_1.z.array(exports.routineKeySchema).max(30).default([]),
    concernKeys: zod_1.z.array(exports.routineKeySchema).max(100).default([]),
    textures: zod_1.z.array(exports.routineKeySchema).max(30).default([]),
    periods: zod_1.z
        .array(zod_1.z.enum(["AM", "PM"]))
        .max(2)
        .default(["AM", "PM"]),
    experienceLevels: zod_1.z.array(exports.routineKeySchema).max(20).default([]),
    signalWeights: zod_1.z
        .record(exports.routineKeySchema, zod_1.z.number().int().min(-1_000).max(1_000))
        .default({}),
    approvedReasons: zod_1.z
        .array(zod_1.z.object({
        signalKey: exports.routineKeySchema,
        text: exports.routineLocalizedTextSchema,
    }))
        .max(60)
        .default([]),
    redundancyGroups: zod_1.z.array(exports.routineKeySchema).max(30).default([]),
    recommendationWeight: zod_1.z.number().int().min(-10_000).max(10_000).default(0),
    merchandisingBoost: zod_1.z.number().int().min(-1_000).max(1_000).default(0),
    neverRecommend: zod_1.z.boolean().default(false),
});
exports.routineEventInputSchema = zod_1.z.object({
    sessionId: zod_1.z.string().uuid(),
    type: zod_1.z.enum([
        "QUESTION_ANSWERED",
        "BUILDER_ABANDONED",
        "ROUTINE_GENERATED",
        "TEMPLATE_SELECTED",
        "TEMPLATE_ZERO_MATCH",
        "PRODUCT_SWAPPED",
        "ROUTINE_ADD_TO_CART",
        "ROUTINE_PRODUCT_ADD_TO_CART",
        "COMPLETE_ROUTINE_CTA_VIEWED",
        "COMPLETE_ROUTINE_CTA_CLICKED",
        "CONTEXTUAL_FLOW_STARTED",
        "CONTEXTUAL_FLOW_COMPLETED",
        "ANCHOR_ALTERNATIVES_OPENED",
        "ROUTINE_ALTERNATIVE_OPENED",
        "ROUTINE_ALTERNATIVE_SELECTED",
    ]),
    questionKey: exports.routineKeySchema.nullable().default(null),
    productId: zod_1.z.string().uuid().nullable().default(null),
});
exports.routineCartInputSchema = zod_1.z.object({
    selections: zod_1.z
        .array(zod_1.z.object({
        stepId: zod_1.z.string().uuid(),
        variantId: zod_1.z.string().uuid(),
    }))
        .min(1)
        .max(20),
});
exports.DEFAULT_ROUTINE_BUILDER_CONFIG = {
    schemaVersion: exports.routineBuilderSchemaVersion,
    title: { en: "Build Your Routine", ar: "ابني روتينك" },
    introduction: {
        en: "A guided routine built around the preferences you choose.",
        ar: "روتين إرشادي مبني على التفضيلات التي تختارينها.",
    },
    estimatedMinutes: 3,
    startLabel: { en: "Build my routine", ar: "ابدئي بناء روتينك" },
    resultTitle: { en: "Your BioReza Routine", ar: "روتين BioReza الخاص بك" },
    disclaimer: {
        en: "Personalized product guidance, not medical diagnosis. Consult a qualified professional for medical concerns.",
        ar: "إرشادات مخصصة للمنتجات وليست تشخيصاً طبياً. استشيري مختصاً مؤهلاً للمخاوف الطبية.",
    },
    noResult: {
        en: "We cannot confidently complete this routine from the current configuration.",
        ar: "لا يمكننا إكمال هذا الروتين بثقة من الإعداد الحالي.",
    },
    questions: [],
    signals: [],
    concerns: [],
    roles: [],
    rules: [],
    compatibilityRules: [],
    templates: [],
    templateUniverse: {
        families: [],
        packs: [],
        tags: [],
        stepPresets: [],
        fallbackTemplateKey: null,
        customerChoiceEnabled: false,
        customerChoiceFamilies: [],
    },
    settings: {
        maximumProductsPerBrand: null,
        preferBrandDiversity: false,
        allowDuplicateProducts: false,
        budgetExceeded: {
            en: "A complete routine is not currently available inside your selected budget. This is the closest complete option.",
            ar: "لا يتوفر حالياً روتين كامل ضمن ميزانيتك المحددة. هذا هو أقرب خيار كامل.",
        },
    },
    contextualCompletion: {
        enabled: false,
        enabledDomains: [],
        eligibleAnchorRoles: [],
        defaultTemplateKeys: {},
        allowUnavailableAnchorPlanning: false,
        requireApprovedReason: false,
        anchorBoostRules: [],
        title: { en: "Complete Your Routine", ar: "أكملي روتينك" },
        introduction: {
            en: "Build a compatible routine around the product you selected.",
            ar: "ابني روتيناً متوافقاً حول المنتج الذي اخترته.",
        },
        unavailableMessage: {
            en: "This product isn't currently available for routine building.",
            ar: "هذا المنتج غير متاح حالياً لبناء روتين حوله.",
        },
        anchorExplanation: {
            en: "This is the product you chose to build your routine around.",
            ar: "هذا هو المنتج الذي اخترته لبناء روتينك حوله.",
        },
    },
};
//# sourceMappingURL=routine-builder.schema.js.map