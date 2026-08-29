"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_ROUTINE_BUILDER_CONFIG = exports.routineEventInputSchema = exports.routineProductProfileInputSchema = exports.routineDraftSaveSchema = exports.routineEvaluationInputSchema = exports.routineAnswersSchema = exports.routineAnswerValueSchema = exports.routineBuilderConfigSchema = exports.routineTemplateSchema = exports.routineTemplateStepSchema = exports.routineCompatibilityRuleSchema = exports.routineRuleSchema = exports.routineRuleEffectSchema = exports.routineTargetSchema = exports.routineRoleSchema = exports.routineConcernSchema = exports.routineQuestionSchema = exports.routineAnswerSchema = exports.routineSignalSchema = exports.routineConditionGroupSchema = exports.routineConditionSchema = exports.routineOperatorSchema = exports.routineQuestionTypeSchema = exports.routineLocalizedTextSchema = exports.routineKeySchema = exports.routineBuilderSchemaVersion = void 0;
const zod_1 = require("zod");
exports.routineBuilderSchemaVersion = 1;
exports.routineKeySchema = zod_1.z
    .string()
    .trim()
    .min(2)
    .max(80)
    .regex(/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/, "Use a stable kebab-case key.");
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
exports.routineSignalSchema = zod_1.z.object({
    key: exports.routineKeySchema,
    value: zod_1.z.union([
        zod_1.z.string().max(160),
        zod_1.z.number().finite(),
        zod_1.z.boolean(),
        zod_1.z.array(zod_1.z.string().max(160)).max(30),
    ]),
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
    enabled: zod_1.z.boolean().default(true),
    order: zod_1.z.number().int().min(0).max(1_000),
    visibility: exports.routineConditionGroupSchema.nullable().default(null),
    answers: zod_1.z.array(exports.routineAnswerSchema).max(60).default([]),
    minSelections: zod_1.z.number().int().min(0).max(20).default(0),
    maxSelections: zod_1.z.number().int().min(1).max(20).default(1),
    scale: zod_1.z
        .object({ min: zod_1.z.number().finite(), max: zod_1.z.number().finite(), step: zod_1.z.number().positive() })
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
    if (choice && question.answers.filter((answer) => answer.enabled).length < 1) {
        context.addIssue({ code: zod_1.z.ZodIssueCode.custom, path: ["answers"], message: "Choice questions need at least one enabled answer." });
    }
    if (question.minSelections > question.maxSelections) {
        context.addIssue({ code: zod_1.z.ZodIssueCode.custom, path: ["minSelections"], message: "Minimum selections cannot exceed maximum selections." });
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
    enabled: zod_1.z.boolean().default(true),
});
exports.routineTargetSchema = zod_1.z.object({
    kind: zod_1.z.enum(["ALL", "PRODUCT", "VARIANT", "CATEGORY", "BRAND", "TAG", "INGREDIENT", "ROLE"]),
    ids: zod_1.z.array(zod_1.z.string().uuid()).max(200).default([]),
    keys: zod_1.z.array(exports.routineKeySchema).max(80).default([]),
});
exports.routineRuleEffectSchema = zod_1.z.discriminatedUnion("type", [
    zod_1.z.object({ type: zod_1.z.literal("BOOST"), target: exports.routineTargetSchema, score: zod_1.z.number().int().min(-10_000).max(10_000) }),
    zod_1.z.object({ type: zod_1.z.literal("EXCLUDE"), target: exports.routineTargetSchema, reason: exports.routineLocalizedTextSchema }),
    zod_1.z.object({ type: zod_1.z.literal("SELECT_TEMPLATE"), templateKey: exports.routineKeySchema }),
    zod_1.z.object({ type: zod_1.z.literal("NO_RESULT"), message: exports.routineLocalizedTextSchema }),
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
    effect: zod_1.z.enum(["BLOCK_SAME_ROUTINE", "WARN", "AM_ONLY", "PM_ONLY", "ALTERNATE", "MAX_ONE_FROM_GROUP"]),
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
});
exports.routineTemplateSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    key: exports.routineKeySchema,
    name: exports.routineLocalizedTextSchema,
    description: exports.routineLocalizedTextSchema.default({ en: "", ar: "" }),
    enabled: zod_1.z.boolean().default(true),
    priority: zod_1.z.number().int().min(-10_000).max(10_000).default(0),
    conditions: exports.routineConditionGroupSchema.nullable().default(null),
    steps: zod_1.z.array(exports.routineTemplateStepSchema).min(1).max(20),
});
exports.routineBuilderConfigSchema = zod_1.z
    .object({
    schemaVersion: zod_1.z.literal(exports.routineBuilderSchemaVersion),
    title: exports.routineLocalizedTextSchema,
    introduction: exports.routineLocalizedTextSchema,
    estimatedMinutes: zod_1.z.number().int().min(1).max(20).default(3),
    startLabel: exports.routineLocalizedTextSchema,
    resultTitle: exports.routineLocalizedTextSchema,
    disclaimer: exports.routineLocalizedTextSchema,
    noResult: exports.routineLocalizedTextSchema,
    questions: zod_1.z.array(exports.routineQuestionSchema).max(80),
    concerns: zod_1.z.array(exports.routineConcernSchema).max(100),
    roles: zod_1.z.array(exports.routineRoleSchema).max(40),
    rules: zod_1.z.array(exports.routineRuleSchema).max(300),
    compatibilityRules: zod_1.z.array(exports.routineCompatibilityRuleSchema).max(300),
    templates: zod_1.z.array(exports.routineTemplateSchema).max(50),
    settings: zod_1.z.object({
        maximumProductsPerBrand: zod_1.z.number().int().min(0).max(20).nullable().default(null),
        preferBrandDiversity: zod_1.z.boolean().default(false),
        allowDuplicateProducts: zod_1.z.boolean().default(false),
    }),
})
    .superRefine((config, context) => {
    const collections = [
        ["questions", config.questions], ["concerns", config.concerns], ["roles", config.roles],
        ["rules", config.rules], ["compatibilityRules", config.compatibilityRules], ["templates", config.templates],
    ];
    for (const [path, values] of collections) {
        const seen = new Set();
        values.forEach((value, index) => {
            if (seen.has(value.key))
                context.addIssue({ code: zod_1.z.ZodIssueCode.custom, path: [path, index, "key"], message: `Duplicate stable key: ${value.key}` });
            seen.add(value.key);
        });
    }
});
exports.routineAnswerValueSchema = zod_1.z.union([
    zod_1.z.string().max(2_000), zod_1.z.number().finite(), zod_1.z.boolean(), zod_1.z.array(zod_1.z.string().max(160)).max(100),
]);
exports.routineAnswersSchema = zod_1.z.record(exports.routineKeySchema, exports.routineAnswerValueSchema);
exports.routineEvaluationInputSchema = zod_1.z.object({
    sessionId: zod_1.z.string().uuid().optional(),
    answers: exports.routineAnswersSchema,
    locale: zod_1.z.enum(["en", "ar"]).default("en"),
    selectedVariants: zod_1.z.record(zod_1.z.string().uuid(), zod_1.z.string().uuid()).default({}),
    includeDiagnostics: zod_1.z.boolean().default(false),
});
exports.routineDraftSaveSchema = zod_1.z.object({
    expectedRevision: zod_1.z.number().int().min(1),
    config: exports.routineBuilderConfigSchema,
});
exports.routineProductProfileInputSchema = zod_1.z.object({
    roles: zod_1.z.array(exports.routineKeySchema).max(20),
    skinTypes: zod_1.z.array(exports.routineKeySchema).max(30).default([]),
    concernKeys: zod_1.z.array(exports.routineKeySchema).max(100).default([]),
    textures: zod_1.z.array(exports.routineKeySchema).max(30).default([]),
    periods: zod_1.z.array(zod_1.z.enum(["AM", "PM"])).max(2).default(["AM", "PM"]),
    experienceLevels: zod_1.z.array(exports.routineKeySchema).max(20).default([]),
    recommendationWeight: zod_1.z.number().int().min(-10_000).max(10_000).default(0),
    neverRecommend: zod_1.z.boolean().default(false),
});
exports.routineEventInputSchema = zod_1.z.object({
    sessionId: zod_1.z.string().uuid(),
    type: zod_1.z.enum(["QUESTION_ANSWERED", "BUILDER_ABANDONED", "ROUTINE_GENERATED", "PRODUCT_SWAPPED", "ROUTINE_ADD_TO_CART", "ROUTINE_PRODUCT_ADD_TO_CART"]),
    questionKey: exports.routineKeySchema.nullable().default(null),
    productId: zod_1.z.string().uuid().nullable().default(null),
});
exports.DEFAULT_ROUTINE_BUILDER_CONFIG = {
    schemaVersion: 1,
    title: { en: "Build Your Routine", ar: "ابني روتينك" },
    introduction: { en: "A guided routine built around the preferences you choose.", ar: "روتين إرشادي مبني على التفضيلات التي تختارينها." },
    estimatedMinutes: 3,
    startLabel: { en: "Build my routine", ar: "ابدئي بناء روتينك" },
    resultTitle: { en: "Your BioReza Routine", ar: "روتين BioReza الخاص بك" },
    disclaimer: { en: "Personalized product guidance, not medical diagnosis. Consult a qualified professional for medical concerns.", ar: "إرشادات مخصصة للمنتجات وليست تشخيصاً طبياً. استشيري مختصاً مؤهلاً للمخاوف الطبية." },
    noResult: { en: "We cannot confidently complete this routine from the current configuration.", ar: "لا يمكننا إكمال هذا الروتين بثقة من الإعداد الحالي." },
    questions: [], concerns: [], roles: [], rules: [], compatibilityRules: [], templates: [],
    settings: { maximumProductsPerBrand: null, preferBrandDiversity: false, allowDuplicateProducts: false },
};
//# sourceMappingURL=routine-builder.schema.js.map