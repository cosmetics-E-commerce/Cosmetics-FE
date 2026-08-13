"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.popupCampaignDefaults = exports.popupPreviewLinkSchema = exports.popupFormSubmissionSchema = exports.popupAnalyticsBatchSchema = exports.popupAnalyticsEventSchema = exports.popupAnalyticsEventTypeSchema = exports.popupStorefrontResponseSchema = exports.popupPublishedCampaignSchema = exports.popupStorefrontContextSchema = exports.popupDeviceSchema = exports.popupAnalyticsQuerySchema = exports.popupCampaignQuerySchema = exports.updatePopupCampaignSchema = exports.createPopupCampaignSchema = exports.popupVariantInputSchema = exports.popupRecurringScheduleSchema = exports.popupCollisionSchema = exports.popupFrequencySchema = exports.popupTriggerSchema = exports.popupTargetingSchema = exports.popupRuleSchema = exports.popupTargetFieldSchema = exports.popupCountdownSchema = exports.popupFormSchema = exports.popupActionSchema = exports.popupLocaleContentSchema = exports.popupAppearanceSchema = exports.popupPresentationSchema = exports.popupPresentationModeSchema = exports.popupCampaignStatusSchema = exports.popupCampaignStateSchema = exports.popupCampaignTypeSchema = void 0;
const zod_1 = require("zod");
const pagination_1 = require("../common/pagination");
const primitives_1 = require("../common/primitives");
const nullableIsoDateSchema = zod_1.z
    .string()
    .datetime({ offset: true })
    .nullable()
    .default(null);
const colorSchema = zod_1.z
    .string()
    .trim()
    .regex(/^#[0-9a-f]{6}$/i, "Use a six-digit hex colour.");
const safeUrlSchema = zod_1.z
    .string()
    .trim()
    .max(1_000)
    .refine((value) => {
    if (value.startsWith("/"))
        return !value.startsWith("//");
    try {
        return ["http:", "https:"].includes(new URL(value).protocol);
    }
    catch {
        return false;
    }
}, "Use an internal path or a valid HTTP(S) URL.");
const nullableSafeUrlSchema = safeUrlSchema.nullable().default(null);
exports.popupCampaignTypeSchema = zod_1.z.enum([
    "PROMOTIONAL",
    "DISCOUNT",
    "NEWSLETTER",
    "WELCOME",
    "FIRST_ORDER",
    "EXIT_INTENT",
    "ANNOUNCEMENT",
    "PRODUCT_RECOMMENDATION",
    "CART_REMINDER",
    "FREE_SHIPPING",
    "LIMITED_TIME_SALE",
    "PRODUCT_LAUNCH",
    "RESTOCK",
    "PRODUCT_SPECIFIC",
    "CATEGORY_SPECIFIC",
    "CROSS_SELL",
    "ACCOUNT_ENCOURAGEMENT",
    "LOGIN_REMINDER",
    "LOYALTY_VIP",
    "RETURNING_CUSTOMER",
    "NEW_VISITOR",
    "ORDER_UPDATE",
    "STORE_PICKUP",
    "DELIVERY_NOTICE",
    "SYSTEM_NOTICE",
    "MAINTENANCE",
    "SEASONAL",
    "CUSTOM",
]);
exports.popupCampaignStateSchema = zod_1.z.enum([
    "DRAFT",
    "ACTIVE",
    "PAUSED",
    "ARCHIVED",
]);
exports.popupCampaignStatusSchema = zod_1.z.enum([
    "DRAFT",
    "SCHEDULED",
    "ACTIVE",
    "PAUSED",
    "ENDED",
    "ARCHIVED",
]);
exports.popupPresentationModeSchema = zod_1.z.enum([
    "CENTER_MODAL",
    "BOTTOM_SHEET",
    "FLOATING_RIGHT",
    "FLOATING_LEFT",
    "TOP_BANNER",
    "BOTTOM_BANNER",
    "FULLSCREEN",
    "SIDE_PANEL_RIGHT",
    "SIDE_PANEL_LEFT",
    "SLIDE_IN_RIGHT",
    "SLIDE_IN_LEFT",
    "PROMO_TOAST",
    "ANNOUNCEMENT_BAR",
]);
exports.popupPresentationSchema = zod_1.z
    .object({
    desktop: exports.popupPresentationModeSchema.default("CENTER_MODAL"),
    tablet: exports.popupPresentationModeSchema.default("CENTER_MODAL"),
    mobile: exports.popupPresentationModeSchema.default("BOTTOM_SHEET"),
    dismissible: zod_1.z.boolean().default(true),
    closeOnOverlay: zod_1.z.boolean().default(true),
    closeOnEscape: zod_1.z.boolean().default(true),
})
    .default({});
const popupAppearanceObjectSchema = zod_1.z.object({
    theme: zod_1.z
        .enum(["IVORY", "INK", "SAGE", "BLUSH", "GOLD", "BRAND"])
        .default("IVORY"),
    icon: zod_1.z
        .enum(["NONE", "SPARKLE", "GIFT", "MEGAPHONE", "TRUCK", "HEART", "BELL"])
        .default("NONE"),
    layout: zod_1.z
        .enum(["TEXT_ONLY", "SPLIT", "IMAGE_TOP", "IMAGE_BACKGROUND"])
        .default("TEXT_ONLY"),
    width: zod_1.z.enum(["COMPACT", "STANDARD", "WIDE"]).default("STANDARD"),
    maxWidth: zod_1.z.number().int().min(280).max(960).default(560),
    spacing: zod_1.z.enum(["COMPACT", "COMFORTABLE", "AIRY"]).default("COMFORTABLE"),
    alignment: zod_1.z.enum(["START", "CENTER"]).default("START"),
    imagePosition: zod_1.z.enum(["START", "END", "TOP", "BACKGROUND"]).default("END"),
    borderRadius: zod_1.z.enum(["NONE", "SUBTLE", "SOFT", "ROUNDED"]).default("SOFT"),
    overlayOpacity: zod_1.z.number().min(0).max(0.85).default(0.48),
    buttonStyle: zod_1.z.enum(["SOLID", "OUTLINE", "UNDERLINE"]).default("SOLID"),
    surface: zod_1.z.enum(["SOLID", "TINTED", "GLASS"]).default("SOLID"),
    animation: zod_1.z.enum(["FADE", "LIFT", "SCALE", "SLIDE", "NONE"]).default("LIFT"),
    accentColor: colorSchema.nullable().default(null),
});
exports.popupAppearanceSchema = popupAppearanceObjectSchema.default({});
exports.popupLocaleContentSchema = zod_1.z.object({
    locale: zod_1.z.enum(["en", "ar"]),
    eyebrow: zod_1.z.string().trim().max(80).nullable().default(null),
    badge: zod_1.z.string().trim().max(48).nullable().default(null),
    headline: zod_1.z.string().trim().min(1).max(180),
    subtitle: zod_1.z.string().trim().max(240).nullable().default(null),
    body: zod_1.z.string().trim().max(1_200).nullable().default(null),
    imageAlt: zod_1.z.string().trim().max(180).nullable().default(null),
    primaryCtaLabel: zod_1.z.string().trim().max(80).nullable().default(null),
    secondaryCtaLabel: zod_1.z.string().trim().max(80).nullable().default(null),
    disclaimer: zod_1.z.string().trim().max(500).nullable().default(null),
    successHeadline: zod_1.z.string().trim().max(180).nullable().default(null),
    successBody: zod_1.z.string().trim().max(600).nullable().default(null),
    nameLabel: zod_1.z.string().trim().max(80).nullable().default(null),
    emailLabel: zod_1.z.string().trim().max(80).nullable().default(null),
    phoneLabel: zod_1.z.string().trim().max(80).nullable().default(null),
    submitLabel: zod_1.z.string().trim().max(80).nullable().default(null),
    consentLabel: zod_1.z.string().trim().max(300).nullable().default(null),
});
exports.popupActionSchema = zod_1.z
    .object({
    type: zod_1.z
        .enum([
        "NONE",
        "NAVIGATE",
        "APPLY_COUPON",
        "COPY_COUPON",
        "CLOSE",
        "SUBMIT_FORM",
    ])
        .default("NONE"),
    destination: zod_1.z
        .enum(["URL", "PRODUCT", "CATEGORY", "CART", "ACCOUNT", "HOME"])
        .nullable()
        .default(null),
    url: nullableSafeUrlSchema,
    productId: primitives_1.uuidSchema.nullable().default(null),
    categoryId: primitives_1.uuidSchema.nullable().default(null),
    couponId: primitives_1.uuidSchema.nullable().default(null),
    openInNewTab: zod_1.z.boolean().default(false),
    closeAfterAction: zod_1.z.boolean().default(true),
})
    .default({});
exports.popupFormSchema = zod_1.z
    .object({
    type: zod_1.z.enum(["NONE", "NEWSLETTER", "LEAD"]).default("NONE"),
    collectName: zod_1.z.boolean().default(false),
    collectEmail: zod_1.z.boolean().default(true),
    collectPhone: zod_1.z.boolean().default(false),
    consentRequired: zod_1.z.boolean().default(true),
    successAutoCloseSeconds: zod_1.z.number().int().min(0).max(30).default(4),
})
    .default({});
exports.popupCountdownSchema = zod_1.z
    .object({
    enabled: zod_1.z.boolean().default(false),
    mode: zod_1.z.enum(["CAMPAIGN_END", "FIXED_TIMESTAMP"]).default("CAMPAIGN_END"),
    targetAt: nullableIsoDateSchema,
})
    .default({});
const targetingValueSchema = zod_1.z.union([
    zod_1.z.string().max(1_000),
    zod_1.z.number().finite(),
    zod_1.z.boolean(),
    zod_1.z.array(zod_1.z.string().max(500)).max(500),
]);
exports.popupTargetFieldSchema = zod_1.z.enum([
    "PAGE_TYPE",
    "PAGE_PATH",
    "PRODUCT_ID",
    "CATEGORY_ID",
    "DEVICE",
    "LOCALE",
    "AUTH_STATUS",
    "VISITOR_TYPE",
    "CUSTOMER_ORDER_COUNT",
    "CUSTOMER_TOTAL_SPENT",
    "CUSTOMER_AVERAGE_ORDER_VALUE",
    "CUSTOMER_IS_VIP",
    "PURCHASED_PRODUCT",
    "PURCHASED_CATEGORY",
    "CART_TOTAL",
    "CART_ITEM_COUNT",
    "CART_CONTAINS_PRODUCT",
    "CART_CONTAINS_CATEGORY",
    "FREE_SHIPPING_REMAINING",
    "COUNTRY",
    "REGION",
    "CITY",
    "UTM_SOURCE",
    "UTM_CAMPAIGN",
    "REFERRER_DOMAIN",
]);
exports.popupRuleSchema = zod_1.z.object({
    id: zod_1.z.string().trim().min(1).max(80),
    field: exports.popupTargetFieldSchema,
    operator: zod_1.z.enum([
        "EQUALS",
        "NOT_EQUALS",
        "IN",
        "NOT_IN",
        "CONTAINS",
        "NOT_CONTAINS",
        "STARTS_WITH",
        "MATCHES",
        "GT",
        "GTE",
        "LT",
        "LTE",
        "IS_TRUE",
        "IS_FALSE",
    ]),
    value: targetingValueSchema.optional(),
});
exports.popupTargetingSchema = zod_1.z
    .object({
    logic: zod_1.z.enum(["AND", "OR"]).default("AND"),
    rules: zod_1.z.array(exports.popupRuleSchema).max(60).default([]),
    exclusions: zod_1.z.array(exports.popupRuleSchema).max(40).default([]),
})
    .default({});
exports.popupTriggerSchema = zod_1.z
    .object({
    type: zod_1.z
        .enum([
        "IMMEDIATE",
        "DELAY",
        "SCROLL_DEPTH",
        "EXIT_INTENT",
        "INACTIVITY",
        "PAGE_VIEWS",
        "SESSION_DURATION",
        "PRODUCT_VIEWS",
        "ADD_TO_CART",
        "REMOVE_FROM_CART",
        "CART_THRESHOLD",
        "FIRST_VISIT",
        "RETURNING_SESSION",
        "CUSTOM_EVENT",
    ])
        .default("IMMEDIATE"),
    delaySeconds: zod_1.z.number().int().min(0).max(3_600).default(0),
    scrollPercent: zod_1.z.number().int().min(1).max(100).default(50),
    inactivitySeconds: zod_1.z.number().int().min(5).max(3_600).default(25),
    pageViewCount: zod_1.z.number().int().min(1).max(100).default(3),
    sessionDurationSeconds: zod_1.z.number().int().min(1).max(86_400).default(90),
    productViewCount: zod_1.z.number().int().min(1).max(100).default(3),
    cartThreshold: zod_1.z.number().int().min(0).default(0),
    eventName: zod_1.z.string().trim().max(80).nullable().default(null),
    productIds: zod_1.z.array(primitives_1.uuidSchema).max(500).default([]),
    categoryIds: zod_1.z.array(primitives_1.uuidSchema).max(500).default([]),
    mobileExitFallback: zod_1.z
        .enum(["NONE", "INACTIVITY", "SCROLL_DEPTH"])
        .default("INACTIVITY"),
    mobileExitFallbackValue: zod_1.z.number().int().min(1).max(3_600).default(30),
})
    .default({});
exports.popupFrequencySchema = zod_1.z
    .object({
    mode: zod_1.z
        .enum([
        "ONCE_EVER",
        "ONCE_PER_SESSION",
        "ONCE_PER_DAY",
        "EVERY_X_HOURS",
        "EVERY_X_DAYS",
        "MAX_IMPRESSIONS",
        "UNTIL_INTERACTION",
        "UNTIL_CONVERSION",
        "UNTIL_CAMPAIGN_ENDS",
    ])
        .default("ONCE_PER_SESSION"),
    interval: zod_1.z.number().int().min(1).max(365).default(1),
    maxImpressions: zod_1.z.number().int().min(1).max(100).default(3),
    afterDismiss: zod_1.z
        .enum(["DEFAULT", "SESSION", "HOURS", "DAYS", "NEVER"])
        .default("DAYS"),
    afterDismissInterval: zod_1.z.number().int().min(1).max(365).default(7),
    afterPrimaryAction: zod_1.z
        .enum(["DEFAULT", "SESSION", "NEVER"])
        .default("NEVER"),
    afterConversion: zod_1.z.enum(["DEFAULT", "NEVER"]).default("NEVER"),
})
    .default({});
exports.popupCollisionSchema = zod_1.z
    .object({
    queueBehavior: zod_1.z
        .enum(["QUEUE", "SUPPRESS", "REPLACE_LOWER"])
        .default("QUEUE"),
    cooldownSeconds: zod_1.z.number().int().min(0).max(3_600).default(8),
    suppressLowerPriority: zod_1.z.boolean().default(false),
    exclusivityKey: zod_1.z.string().trim().max(80).nullable().default(null),
})
    .default({});
exports.popupRecurringScheduleSchema = zod_1.z
    .object({
    enabled: zod_1.z.boolean().default(false),
    weekdays: zod_1.z.array(zod_1.z.number().int().min(0).max(6)).max(7).default([]),
    startTime: zod_1.z
        .string()
        .regex(/^([01]\d|2[0-3]):[0-5]\d$/)
        .default("00:00"),
    endTime: zod_1.z
        .string()
        .regex(/^([01]\d|2[0-3]):[0-5]\d$/)
        .default("23:59"),
})
    .nullable()
    .default(null);
exports.popupVariantInputSchema = zod_1.z.object({
    id: primitives_1.uuidSchema.optional(),
    name: zod_1.z.string().trim().min(1).max(100),
    weight: zod_1.z.number().int().min(1).max(10_000).default(100),
    isControl: zod_1.z.boolean().default(false),
    content: zod_1.z.array(exports.popupLocaleContentSchema).min(1).max(2),
    appearanceOverride: popupAppearanceObjectSchema.partial().default({}),
});
exports.createPopupCampaignSchema = zod_1.z
    .object({
    internalName: zod_1.z.string().trim().min(2).max(180),
    type: exports.popupCampaignTypeSchema.default("PROMOTIONAL"),
    state: exports.popupCampaignStateSchema.default("DRAFT"),
    priority: zod_1.z.number().int().min(0).max(1_000).default(50),
    startsAt: nullableIsoDateSchema,
    endsAt: nullableIsoDateSchema,
    timezone: zod_1.z.string().trim().min(1).max(80).default("Africa/Cairo"),
    recurringSchedule: exports.popupRecurringScheduleSchema,
    presentation: exports.popupPresentationSchema,
    appearance: exports.popupAppearanceSchema,
    targeting: exports.popupTargetingSchema,
    trigger: exports.popupTriggerSchema,
    frequency: exports.popupFrequencySchema,
    collision: exports.popupCollisionSchema,
    primaryAction: exports.popupActionSchema,
    secondaryAction: exports.popupActionSchema,
    form: exports.popupFormSchema,
    countdown: exports.popupCountdownSchema,
    promotionId: primitives_1.uuidSchema.nullable().default(null),
    couponId: primitives_1.uuidSchema.nullable().default(null),
    productId: primitives_1.uuidSchema.nullable().default(null),
    categoryId: primitives_1.uuidSchema.nullable().default(null),
    mediaAssetId: primitives_1.uuidSchema.nullable().default(null),
    variants: zod_1.z.array(exports.popupVariantInputSchema).min(1).max(8),
})
    .superRefine((value, context) => {
    if (value.startsAt &&
        value.endsAt &&
        new Date(value.endsAt) <= new Date(value.startsAt)) {
        context.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            path: ["endsAt"],
            message: "End time must be after start time.",
        });
    }
    try {
        new Intl.DateTimeFormat("en", { timeZone: value.timezone }).format();
    }
    catch {
        context.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            path: ["timezone"],
            message: "Choose a valid IANA timezone.",
        });
    }
    const controlVariants = value.variants.filter((variant) => variant.isControl);
    if (controlVariants.length > 1) {
        context.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            path: ["variants"],
            message: "Only one variant can be the control.",
        });
    }
    const variantNames = value.variants.map((variant) => variant.name.toLocaleLowerCase("en"));
    if (new Set(variantNames).size !== variantNames.length) {
        context.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            path: ["variants"],
            message: "Variant names must be unique within a campaign.",
        });
    }
    for (const [variantIndex, variant] of value.variants.entries()) {
        const locales = variant.content.map((item) => item.locale);
        if (new Set(locales).size !== locales.length) {
            context.addIssue({
                code: zod_1.z.ZodIssueCode.custom,
                path: ["variants", variantIndex, "content"],
                message: "A locale can only appear once in each variant.",
            });
        }
        if (!locales.includes("en")) {
            context.addIssue({
                code: zod_1.z.ZodIssueCode.custom,
                path: ["variants", variantIndex, "content"],
                message: "English fallback content is required.",
            });
        }
    }
    const ruleIds = [
        ...value.targeting.rules,
        ...value.targeting.exclusions,
    ].map((rule) => rule.id);
    if (new Set(ruleIds).size !== ruleIds.length) {
        context.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            path: ["targeting"],
            message: "Targeting rule identifiers must be unique.",
        });
    }
    validateAction(value.primaryAction, "primaryAction", value, context);
    validateAction(value.secondaryAction, "secondaryAction", value, context);
    const blockingPresentation = [
        value.presentation.desktop,
        value.presentation.tablet,
        value.presentation.mobile,
    ].some((mode) => [
        "CENTER_MODAL",
        "BOTTOM_SHEET",
        "FULLSCREEN",
        "SIDE_PANEL_RIGHT",
        "SIDE_PANEL_LEFT",
    ].includes(mode));
    const actionCanExit = [value.primaryAction, value.secondaryAction].some((action) => ["CLOSE", "NAVIGATE"].includes(action.type) ||
        (!["NONE", "SUBMIT_FORM"].includes(action.type) &&
            action.closeAfterAction));
    const formCanExit = value.form.type !== "NONE" && value.form.successAutoCloseSeconds > 0;
    if (!value.presentation.dismissible &&
        blockingPresentation &&
        !actionCanExit &&
        !formCanExit) {
        context.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            path: ["presentation", "dismissible"],
            message: "A non-dismissible blocking campaign needs an action or timed success state that lets customers continue.",
        });
    }
    for (const [group, rules] of [
        ["rules", value.targeting.rules],
        ["exclusions", value.targeting.exclusions],
    ]) {
        rules.forEach((rule, index) => validateTypedRule(rule, ["targeting", group, index], context));
    }
    validateSingleLinkedReference("product", [
        value.productId,
        value.primaryAction.type === "NAVIGATE" &&
            value.primaryAction.destination === "PRODUCT"
            ? value.primaryAction.productId
            : null,
        value.secondaryAction.type === "NAVIGATE" &&
            value.secondaryAction.destination === "PRODUCT"
            ? value.secondaryAction.productId
            : null,
    ], context);
    validateSingleLinkedReference("category", [
        value.categoryId,
        value.primaryAction.type === "NAVIGATE" &&
            value.primaryAction.destination === "CATEGORY"
            ? value.primaryAction.categoryId
            : null,
        value.secondaryAction.type === "NAVIGATE" &&
            value.secondaryAction.destination === "CATEGORY"
            ? value.secondaryAction.categoryId
            : null,
    ], context);
    validateSingleLinkedReference("coupon", [
        value.couponId,
        ["APPLY_COUPON", "COPY_COUPON"].includes(value.primaryAction.type)
            ? value.primaryAction.couponId
            : null,
        ["APPLY_COUPON", "COPY_COUPON"].includes(value.secondaryAction.type)
            ? value.secondaryAction.couponId
            : null,
    ], context);
    if (value.form.type !== "NONE" && !value.form.collectEmail) {
        context.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            path: ["form", "collectEmail"],
            message: "Newsletter and lead forms must collect an email address.",
        });
    }
    if (value.form.type === "NEWSLETTER" && !value.form.consentRequired) {
        context.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            path: ["form", "consentRequired"],
            message: "Newsletter signup requires explicit consent.",
        });
    }
    if (value.form.type !== "NONE" &&
        value.primaryAction.type !== "SUBMIT_FORM") {
        context.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            path: ["primaryAction", "type"],
            message: "A form campaign needs a submit-form primary action.",
        });
    }
    if (value.countdown.enabled &&
        value.countdown.mode === "FIXED_TIMESTAMP" &&
        !value.countdown.targetAt) {
        context.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            path: ["countdown", "targetAt"],
            message: "Choose a fixed countdown timestamp.",
        });
    }
    if (value.countdown.enabled &&
        value.countdown.mode === "CAMPAIGN_END" &&
        !value.endsAt) {
        context.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            path: ["endsAt"],
            message: "A campaign-end countdown requires an end date.",
        });
    }
    if (value.trigger.type === "CUSTOM_EVENT" && !value.trigger.eventName) {
        context.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            path: ["trigger", "eventName"],
            message: "Choose a supported event name.",
        });
    }
    if (value.trigger.type === "CUSTOM_EVENT" &&
        value.trigger.eventName &&
        !/^[a-z][a-z0-9_.:-]{0,79}$/i.test(value.trigger.eventName)) {
        context.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            path: ["trigger", "eventName"],
            message: "Use a stable event name containing letters, numbers, dot, colon, dash, or underscore.",
        });
    }
    if (value.recurringSchedule?.enabled) {
        if (value.recurringSchedule.weekdays.length === 0) {
            context.addIssue({
                code: zod_1.z.ZodIssueCode.custom,
                path: ["recurringSchedule", "weekdays"],
                message: "Choose at least one active weekday.",
            });
        }
        if (value.recurringSchedule.startTime === value.recurringSchedule.endTime) {
            context.addIssue({
                code: zod_1.z.ZodIssueCode.custom,
                path: ["recurringSchedule", "endTime"],
                message: "The daily start and end time must differ.",
            });
        }
    }
});
function validateAction(action, path, campaign, context) {
    if (action.type === "NAVIGATE" && !action.destination) {
        context.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            path: [path, "destination"],
            message: "Choose where this action navigates.",
        });
    }
    if (action.type === "NAVIGATE" &&
        action.destination === "URL" &&
        !action.url) {
        context.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            path: [path, "url"],
            message: "Enter a destination URL.",
        });
    }
    if (action.type === "NAVIGATE" &&
        action.destination === "PRODUCT" &&
        !(action.productId || campaign.productId)) {
        context.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            path: [path, "productId"],
            message: "Choose a destination product.",
        });
    }
    if (action.type === "NAVIGATE" &&
        action.destination === "CATEGORY" &&
        !(action.categoryId || campaign.categoryId)) {
        context.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            path: [path, "categoryId"],
            message: "Choose a destination category.",
        });
    }
    if (["APPLY_COUPON", "COPY_COUPON"].includes(action.type) &&
        !(action.couponId || campaign.couponId)) {
        context.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            path: [path, "couponId"],
            message: "Choose a coupon from the promotion engine.",
        });
    }
}
function validateSingleLinkedReference(kind, values, context) {
    const unique = new Set(values.filter((value) => Boolean(value)));
    if (unique.size <= 1)
        return;
    context.addIssue({
        code: zod_1.z.ZodIssueCode.custom,
        path: [`${kind}Id`],
        message: `A campaign can link to one ${kind}; use the same ${kind} for its actions.`,
    });
}
const referenceRuleFields = new Set([
    "PRODUCT_ID",
    "CATEGORY_ID",
    "PURCHASED_PRODUCT",
    "PURCHASED_CATEGORY",
    "CART_CONTAINS_PRODUCT",
    "CART_CONTAINS_CATEGORY",
]);
const numericRuleFields = new Set([
    "CUSTOMER_ORDER_COUNT",
    "CUSTOMER_TOTAL_SPENT",
    "CUSTOMER_AVERAGE_ORDER_VALUE",
    "CART_TOTAL",
    "CART_ITEM_COUNT",
    "FREE_SHIPPING_REMAINING",
]);
const numericRuleOperators = new Set([
    "EQUALS",
    "NOT_EQUALS",
    "GT",
    "GTE",
    "LT",
    "LTE",
]);
const textRuleFields = new Set([
    "PAGE_PATH",
    "COUNTRY",
    "REGION",
    "CITY",
    "UTM_SOURCE",
    "UTM_CAMPAIGN",
    "REFERRER_DOMAIN",
]);
const textRuleOperators = new Set([
    "EQUALS",
    "NOT_EQUALS",
    "IN",
    "NOT_IN",
    "CONTAINS",
    "NOT_CONTAINS",
    "STARTS_WITH",
    "MATCHES",
]);
const discreteRuleValues = {
    PAGE_TYPE: new Set([
        "HOME",
        "PRODUCTS",
        "PRODUCT",
        "CATEGORIES",
        "CATEGORY",
        "SEARCH",
        "CART",
        "CHECKOUT",
        "ACCOUNT",
        "ORDER_TRACKING",
        "LANDING",
        "CUSTOM",
    ]),
    DEVICE: new Set(["desktop", "tablet", "mobile"]),
    LOCALE: new Set(["en", "ar"]),
    AUTH_STATUS: new Set(["guest", "logged_in"]),
    VISITOR_TYPE: new Set(["first_time", "returning"]),
};
function validateTypedRule(rule, path, context) {
    const booleanField = rule.field === "CUSTOMER_IS_VIP";
    const validOperator = booleanField
        ? ["IS_TRUE", "IS_FALSE"].includes(rule.operator)
        : numericRuleFields.has(rule.field)
            ? numericRuleOperators.has(rule.operator)
            : textRuleFields.has(rule.field)
                ? textRuleOperators.has(rule.operator)
                : ["EQUALS", "NOT_EQUALS", "IN", "NOT_IN"].includes(rule.operator);
    if (!validOperator) {
        context.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            path: [...path, "operator"],
            message: "Choose an operator compatible with this targeting field.",
        });
    }
    if (booleanField)
        return;
    const values = Array.isArray(rule.value) ? rule.value : [rule.value];
    if (referenceRuleFields.has(rule.field) &&
        (values.length === 0 ||
            values.some((value) => !primitives_1.uuidSchema.safeParse(value).success))) {
        context.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            path: [...path, "value"],
            message: "Choose a valid catalog reference.",
        });
    }
    if (numericRuleFields.has(rule.field) &&
        values.some((value) => typeof value !== "number" || !Number.isFinite(value))) {
        context.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            path: [...path, "value"],
            message: "Enter a numeric comparison value.",
        });
    }
    const allowedValues = discreteRuleValues[rule.field];
    if (allowedValues &&
        (values.length === 0 ||
            values.some((value) => typeof value !== "string" || !allowedValues.has(value)))) {
        context.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            path: [...path, "value"],
            message: "Choose a supported targeting value.",
        });
    }
}
// PATCH payloads are merged with the stored draft and revalidated against the
// full schema by the service. This preserves strict publish validation without
// forcing clients to send every section for a small edit.
exports.updatePopupCampaignSchema = zod_1.z.record(zod_1.z.unknown());
exports.popupCampaignQuerySchema = pagination_1.paginationQuerySchema.extend({
    search: zod_1.z.string().trim().max(180).optional(),
    status: exports.popupCampaignStatusSchema.optional(),
    type: exports.popupCampaignTypeSchema.optional(),
    sortBy: zod_1.z
        .enum([
        "updatedAt",
        "createdAt",
        "priority",
        "startsAt",
        "name",
        "impressions",
    ])
        .default("updatedAt"),
});
exports.popupAnalyticsQuerySchema = zod_1.z
    .object({
    range: zod_1.z.enum(["24h", "7d", "30d", "custom"]).default("7d"),
    from: nullableIsoDateSchema,
    to: nullableIsoDateSchema,
    timezone: zod_1.z.string().trim().max(80).default("Africa/Cairo"),
})
    .superRefine((value, context) => {
    try {
        new Intl.DateTimeFormat("en", { timeZone: value.timezone }).format();
    }
    catch {
        context.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            path: ["timezone"],
            message: "Choose a valid IANA timezone.",
        });
    }
    if (value.range === "custom" && (!value.from || !value.to)) {
        context.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            path: ["from"],
            message: "Custom analytics ranges require start and end timestamps.",
        });
    }
});
exports.popupDeviceSchema = zod_1.z.enum(["desktop", "tablet", "mobile"]);
exports.popupStorefrontContextSchema = zod_1.z.object({
    locale: zod_1.z.enum(["en", "ar"]).default("en"),
    device: exports.popupDeviceSchema.default("desktop"),
    page: zod_1.z.object({
        path: zod_1.z.string().trim().min(1).max(1_000),
        type: zod_1.z
            .enum([
            "HOME",
            "PRODUCTS",
            "PRODUCT",
            "CATEGORIES",
            "CATEGORY",
            "SEARCH",
            "CART",
            "CHECKOUT",
            "ACCOUNT",
            "ORDER_TRACKING",
            "LANDING",
            "CUSTOM",
        ])
            .default("CUSTOM"),
        productId: primitives_1.uuidSchema.nullable().default(null),
        productSlug: zod_1.z.string().trim().max(180).nullable().default(null),
        productName: zod_1.z.string().trim().max(200).nullable().default(null),
        categoryId: primitives_1.uuidSchema.nullable().default(null),
        categorySlug: zod_1.z.string().trim().max(140).nullable().default(null),
        categoryName: zod_1.z.string().trim().max(140).nullable().default(null),
    }),
    visitor: zod_1.z.object({
        visitorId: primitives_1.uuidSchema,
        sessionId: primitives_1.uuidSchema,
        firstVisit: zod_1.z.boolean().default(false),
        returning: zod_1.z.boolean().default(false),
        pageViews: zod_1.z.number().int().min(1).max(10_000).default(1),
        sessionStartedAt: zod_1.z.string().datetime({ offset: true }),
        referrerDomain: zod_1.z.string().trim().max(255).nullable().default(null),
        utmSource: zod_1.z.string().trim().max(255).nullable().default(null),
        utmCampaign: zod_1.z.string().trim().max(255).nullable().default(null),
    }),
    cart: zod_1.z
        .object({
        total: zod_1.z.number().int().min(0).default(0),
        itemCount: zod_1.z.number().int().min(0).default(0),
        productIds: zod_1.z.array(primitives_1.uuidSchema).max(500).default([]),
        categoryIds: zod_1.z.array(primitives_1.uuidSchema).max(500).default([]),
        couponCode: zod_1.z.string().trim().max(64).nullable().default(null),
    })
        .default({}),
    behavior: zod_1.z
        .object({
        productViews: zod_1.z
            .array(zod_1.z.object({
            productId: primitives_1.uuidSchema.nullable().default(null),
            productSlug: zod_1.z.string().trim().max(180).nullable().default(null),
            categoryId: primitives_1.uuidSchema.nullable().default(null),
            categorySlug: zod_1.z.string().trim().max(140).nullable().default(null),
            count: zod_1.z.number().int().min(1).max(10_000),
        }))
            .max(500)
            .default([]),
    })
        .default({}),
    previewToken: zod_1.z.string().trim().min(32).max(128).nullable().default(null),
});
exports.popupPublishedCampaignSchema = zod_1.z.object({
    id: primitives_1.uuidSchema,
    variantId: primitives_1.uuidSchema,
    version: zod_1.z.number().int().positive(),
    type: exports.popupCampaignTypeSchema,
    priority: zod_1.z.number().int().min(0).max(1_000),
    startsAt: nullableIsoDateSchema,
    endsAt: nullableIsoDateSchema,
    timezone: zod_1.z.string().trim().min(1).max(80),
    recurringSchedule: exports.popupRecurringScheduleSchema,
    presentation: exports.popupPresentationSchema,
    appearance: exports.popupAppearanceSchema,
    targeting: exports.popupTargetingSchema,
    trigger: exports.popupTriggerSchema,
    frequency: exports.popupFrequencySchema,
    collision: exports.popupCollisionSchema,
    primaryAction: exports.popupActionSchema,
    secondaryAction: exports.popupActionSchema,
    form: exports.popupFormSchema,
    countdown: exports.popupCountdownSchema,
    content: exports.popupLocaleContentSchema,
    direction: zod_1.z.enum(["ltr", "rtl"]),
    image: zod_1.z
        .object({
        url: safeUrlSchema,
        width: zod_1.z.number().int().positive(),
        height: zod_1.z.number().int().positive(),
        alt: zod_1.z.string().trim().max(180),
    })
        .nullable()
        .default(null),
    coupon: zod_1.z
        .object({ id: primitives_1.uuidSchema, code: zod_1.z.string().trim().max(64) })
        .nullable()
        .default(null),
    product: zod_1.z
        .object({
        id: primitives_1.uuidSchema,
        slug: zod_1.z.string().trim().max(180),
        name: zod_1.z.string().trim().max(200),
    })
        .nullable()
        .default(null),
    category: zod_1.z
        .object({
        id: primitives_1.uuidSchema,
        slug: zod_1.z.string().trim().max(140),
        name: zod_1.z.string().trim().max(140),
    })
        .nullable()
        .default(null),
});
exports.popupStorefrontResponseSchema = zod_1.z.object({
    campaigns: zod_1.z.array(exports.popupPublishedCampaignSchema).max(50),
    serverTime: zod_1.z.string().datetime({ offset: true }),
    freeShippingThreshold: zod_1.z.number().int().min(0).nullable(),
});
exports.popupAnalyticsEventTypeSchema = zod_1.z.enum([
    "ELIGIBLE",
    "IMPRESSION",
    "DISMISS",
    "PRIMARY_CLICK",
    "SECONDARY_CLICK",
    "COUPON_COPY",
    "FORM_SUBMIT",
    "SUCCESS",
    "CONVERSION",
]);
const eventMetadataValueSchema = zod_1.z.union([
    zod_1.z.string().max(500),
    zod_1.z.number().finite(),
    zod_1.z.boolean(),
    zod_1.z.null(),
]);
exports.popupAnalyticsEventSchema = zod_1.z.object({
    eventId: primitives_1.uuidSchema,
    campaignId: primitives_1.uuidSchema,
    variantId: primitives_1.uuidSchema.nullable().default(null),
    type: exports.popupAnalyticsEventTypeSchema,
    sessionId: primitives_1.uuidSchema,
    visitorId: primitives_1.uuidSchema,
    locale: zod_1.z.enum(["en", "ar"]),
    device: exports.popupDeviceSchema,
    page: zod_1.z.string().trim().min(1).max(1_000),
    occurredAt: zod_1.z.string().datetime({ offset: true }).optional(),
    metadata: zod_1.z.record(eventMetadataValueSchema).default({}),
});
exports.popupAnalyticsBatchSchema = zod_1.z.object({
    events: zod_1.z.array(exports.popupAnalyticsEventSchema).min(1).max(25),
});
exports.popupFormSubmissionSchema = zod_1.z.object({
    variantId: primitives_1.uuidSchema,
    sessionId: primitives_1.uuidSchema,
    visitorId: primitives_1.uuidSchema,
    locale: zod_1.z.enum(["en", "ar"]),
    device: exports.popupDeviceSchema,
    page: zod_1.z.string().trim().min(1).max(1_000),
    name: zod_1.z.string().trim().min(2).max(140).nullable().default(null),
    email: zod_1.z.string().trim().email().max(320),
    phone: zod_1.z
        .string()
        .trim()
        .regex(/^\+?[0-9][0-9\s().-]{6,22}$/, "Enter a valid phone number.")
        .max(24)
        .nullable()
        .default(null),
    consent: zod_1.z.boolean(),
    company: zod_1.z.string().max(0).optional(),
});
exports.popupPreviewLinkSchema = zod_1.z.object({
    path: zod_1.z
        .string()
        .trim()
        .min(1)
        .max(1_000)
        .refine((value) => value.startsWith("/") && !value.startsWith("//"), {
        message: "Use an internal storefront path.",
    })
        .default("/"),
});
exports.popupCampaignDefaults = exports.createPopupCampaignSchema.parse({
    internalName: "Untitled campaign",
    targeting: {
        logic: "AND",
        rules: [],
        exclusions: [
            {
                id: "safe-checkout",
                field: "PAGE_TYPE",
                operator: "EQUALS",
                value: "CHECKOUT",
            },
            {
                id: "safe-sign-in",
                field: "PAGE_PATH",
                operator: "STARTS_WITH",
                value: "/sign-in",
            },
            {
                id: "safe-login",
                field: "PAGE_PATH",
                operator: "STARTS_WITH",
                value: "/login",
            },
            {
                id: "safe-register",
                field: "PAGE_PATH",
                operator: "STARTS_WITH",
                value: "/register",
            },
            {
                id: "safe-account-recovery",
                field: "PAGE_PATH",
                operator: "STARTS_WITH",
                value: "/forgot-password",
            },
        ],
    },
    variants: [
        {
            name: "Variant A",
            weight: 100,
            isControl: true,
            content: [
                {
                    locale: "en",
                    eyebrow: "A note from BIOREZA",
                    headline: "A considered message, right when it helps.",
                    body: "Add concise campaign copy here.",
                    primaryCtaLabel: "Continue",
                },
            ],
        },
    ],
});
//# sourceMappingURL=popup-campaign.schema.js.map