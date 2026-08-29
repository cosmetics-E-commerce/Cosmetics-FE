"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.landingPageListResponseSchema = exports.landingPageEntityQuerySchema = exports.landingPageEntityTypeSchema = exports.landingPageListQuerySchema = exports.duplicateLandingPageSchema = exports.scheduleLandingPageSchema = exports.landingPageRevisionActionSchema = exports.updateLandingPageDraftSchema = exports.createLandingPageSchema = exports.landingPageTemplateKeySchema = exports.landingPageSlugSchema = exports.landingPageConfigSchema = exports.landingPageSeoSchema = exports.landingPageSectionSchema = exports.landingPageWidthSchema = exports.landingPageSpacingSchema = exports.landingPageSurfaceSchema = exports.landingPageLocalizedTextSchema = exports.landingPageStatusSchema = exports.landingPageTypeSchema = exports.landingPageSchemaVersion = exports.landingPageDestinationSchema = void 0;
const zod_1 = require("zod");
const pagination_1 = require("../common/pagination");
const navigation_schema_1 = require("../navigation/navigation.schema");
exports.landingPageDestinationSchema = zod_1.z.union([
    navigation_schema_1.navigationDestinationSchema,
    zod_1.z.object({ type: zod_1.z.literal("PAGE"), id: zod_1.z.string().uuid() }).strict(),
]);
exports.landingPageSchemaVersion = 1;
exports.landingPageTypeSchema = zod_1.z.enum([
    "HOMEPAGE",
    "CAMPAIGN",
    "BRAND",
    "CATEGORY",
    "OFFER",
    "SEASONAL",
    "COLLECTION",
    "CUSTOM",
]);
exports.landingPageStatusSchema = zod_1.z.enum([
    "DRAFT",
    "SCHEDULED",
    "PUBLISHED",
    "ARCHIVED",
]);
exports.landingPageLocalizedTextSchema = zod_1.z
    .object({
    en: zod_1.z.string().trim().max(2_000).default(""),
    ar: zod_1.z.string().trim().max(2_000).default(""),
})
    .strict();
const localizedShortTextSchema = exports.landingPageLocalizedTextSchema.extend({
    en: zod_1.z.string().trim().max(240).default(""),
    ar: zod_1.z.string().trim().max(240).default(""),
});
const localizedLongTextSchema = exports.landingPageLocalizedTextSchema.extend({
    en: zod_1.z.string().trim().max(4_000).default(""),
    ar: zod_1.z.string().trim().max(4_000).default(""),
});
exports.landingPageSurfaceSchema = zod_1.z.enum([
    "DEFAULT",
    "SOFT",
    "DARK",
    "ACCENT",
]);
exports.landingPageSpacingSchema = zod_1.z.enum([
    "NONE",
    "SMALL",
    "MEDIUM",
    "LARGE",
]);
exports.landingPageWidthSchema = zod_1.z.enum(["CONTENT", "WIDE", "FULL"]);
const sectionBase = {
    id: zod_1.z.string().uuid(),
    analyticsKey: zod_1.z
        .string()
        .trim()
        .regex(/^[a-z0-9][a-z0-9-]*$/)
        .max(80),
    label: zod_1.z.string().trim().min(1).max(80),
    enabled: zod_1.z.boolean().default(true),
    visibility: navigation_schema_1.navigationVisibilitySchema,
    surface: exports.landingPageSurfaceSchema.default("DEFAULT"),
    spacing: exports.landingPageSpacingSchema.default("MEDIUM"),
    width: exports.landingPageWidthSchema.default("WIDE"),
};
const mediaFieldSchema = zod_1.z.string().uuid().nullable().default(null);
const hexColorSchema = zod_1.z
    .string()
    .trim()
    .regex(/^#[0-9a-f]{6}$/i, "Use a six-digit hex colour.");
const productSourceSchema = zod_1.z.discriminatedUnion("mode", [
    zod_1.z
        .object({
        mode: zod_1.z.literal("MANUAL"),
        productIds: zod_1.z.array(zod_1.z.string().uuid()).max(24).default([]),
    })
        .strict(),
    zod_1.z
        .object({
        mode: zod_1.z.literal("CATEGORY"),
        referenceId: zod_1.z.string().uuid(),
    })
        .strict(),
    zod_1.z
        .object({
        mode: zod_1.z.literal("BRAND"),
        referenceId: zod_1.z.string().uuid(),
    })
        .strict(),
    zod_1.z.object({ mode: zod_1.z.literal("TAG"), referenceId: zod_1.z.string().uuid() }).strict(),
    zod_1.z
        .object({
        mode: zod_1.z.literal("PROMOTION"),
        referenceId: zod_1.z.string().uuid(),
    })
        .strict(),
    zod_1.z.object({ mode: zod_1.z.literal("NEWEST") }).strict(),
    zod_1.z.object({ mode: zod_1.z.literal("FEATURED") }).strict(),
]);
const commerceSectionShape = {
    ...sectionBase,
    heading: localizedShortTextSchema,
    description: localizedLongTextSchema,
    source: productSourceSchema,
    limit: zod_1.z.number().int().min(1).max(12).default(8),
    columns: zod_1.z
        .object({
        desktop: zod_1.z.number().int().min(2).max(5).default(4),
        tablet: zod_1.z.number().int().min(1).max(4).default(3),
        mobile: zod_1.z.number().int().min(1).max(2).default(2),
    })
        .strict(),
    showViewAll: zod_1.z.boolean().default(true),
    viewAllLabel: localizedShortTextSchema,
    destination: exports.landingPageDestinationSchema.nullable().default(null),
    style: zod_1.z.enum(["CLEAN", "EDITORIAL", "COMPACT"]).default("CLEAN"),
};
exports.landingPageSectionSchema = zod_1.z.discriminatedUnion("type", [
    zod_1.z
        .object({
        ...sectionBase,
        type: zod_1.z.literal("HERO"),
        desktopMediaId: mediaFieldSchema,
        mobileMediaId: mediaFieldSchema,
        imageAlt: exports.landingPageLocalizedTextSchema,
        eyebrow: localizedShortTextSchema,
        heading: localizedShortTextSchema,
        description: localizedLongTextSchema,
        primaryCtaLabel: localizedShortTextSchema,
        primaryDestination: exports.landingPageDestinationSchema.nullable().default(null),
        secondaryCtaLabel: localizedShortTextSchema,
        secondaryDestination: exports.landingPageDestinationSchema
            .nullable()
            .default(null),
        layout: zod_1.z.enum(["FULL", "SPLIT", "CONTAINED"]).default("FULL"),
        alignment: zod_1.z.enum(["START", "CENTER", "END"]).default("START"),
        contentPosition: zod_1.z.enum(["TOP", "CENTER", "BOTTOM"]).default("CENTER"),
        overlay: zod_1.z.enum(["NONE", "LIGHT", "MEDIUM", "STRONG"]).default("MEDIUM"),
        headingLevel: zod_1.z.enum(["H1", "H2"]).default("H1"),
        // Optional additions keep schema-version-1 pages byte-for-byte compatible.
        // The renderer derives legacy behavior from `layout` when these are absent.
        mediaBehavior: zod_1.z.enum(["BACKGROUND", "SIDE"]).optional(),
        backgroundObjectFit: zod_1.z.enum(["COVER", "CONTAIN"]).optional(),
        backgroundObjectPosition: zod_1.z
            .enum(["CENTER", "TOP", "BOTTOM", "LEFT", "RIGHT"])
            .optional(),
        overlayColor: hexColorSchema.nullable().optional(),
        overlayOpacity: zod_1.z.number().min(0).max(1).optional(),
        gradientOverlay: zod_1.z
            .enum(["NONE", "TO_START", "TO_END", "TO_BOTTOM"])
            .optional(),
        sideImagePosition: zod_1.z.enum(["LEFT", "RIGHT"]).optional(),
        sideImageWidth: zod_1.z.number().int().min(25).max(70).optional(),
        sideImageObjectFit: zod_1.z.enum(["COVER", "CONTAIN"]).optional(),
    })
        .strict(),
    zod_1.z
        .object({
        ...sectionBase,
        type: zod_1.z.literal("IMAGE"),
        desktopMediaId: mediaFieldSchema,
        mobileMediaId: mediaFieldSchema,
        imageAlt: exports.landingPageLocalizedTextSchema,
        caption: exports.landingPageLocalizedTextSchema,
        destination: exports.landingPageDestinationSchema.nullable().default(null),
        openInNewTab: zod_1.z.boolean().default(false),
        imageWidth: zod_1.z.enum(["FULL", "CONTAINER", "CUSTOM"]).default("CONTAINER"),
        customWidthPercent: zod_1.z.number().int().min(10).max(100).default(80),
        alignment: zod_1.z.enum(["START", "CENTER", "END"]).default("CENTER"),
        aspectRatio: zod_1.z
            .enum(["ORIGINAL", "1_1", "4_3", "3_2", "16_9", "21_9", "CUSTOM"])
            .default("ORIGINAL"),
        customAspectRatio: zod_1.z
            .object({
            width: zod_1.z.number().int().min(1).max(100).default(16),
            height: zod_1.z.number().int().min(1).max(100).default(9),
        })
            .strict()
            .default({ width: 16, height: 9 }),
        objectFit: zod_1.z.enum(["COVER", "CONTAIN"]).default("COVER"),
        objectPosition: zod_1.z
            .enum(["CENTER", "TOP", "BOTTOM", "LEFT", "RIGHT"])
            .default("CENTER"),
        borderRadius: zod_1.z.number().int().min(0).max(64).default(0),
        maxHeight: zod_1.z.number().int().min(100).max(2400).nullable().default(null),
        backgroundColor: hexColorSchema.nullable().default(null),
    })
        .strict(),
    zod_1.z
        .object({ ...commerceSectionShape, type: zod_1.z.literal("PRODUCT_GRID") })
        .strict(),
    zod_1.z
        .object({
        ...commerceSectionShape,
        type: zod_1.z.literal("PRODUCT_CAROUSEL"),
        autoplay: zod_1.z.boolean().default(false),
    })
        .strict(),
    zod_1.z
        .object({
        ...sectionBase,
        type: zod_1.z.literal("CATEGORIES"),
        heading: localizedShortTextSchema,
        description: localizedLongTextSchema,
        categoryIds: zod_1.z.array(zod_1.z.string().uuid()).max(12).default([]),
        showChildren: zod_1.z.boolean().default(true),
        showGrandchildren: zod_1.z.boolean().default(false),
        limit: zod_1.z.number().int().min(1).max(18).default(8),
        layout: zod_1.z
            .enum(["CARDS", "IMAGE_TILES", "COMPACT", "EDITORIAL"])
            .default("CARDS"),
    })
        .strict(),
    zod_1.z
        .object({
        ...sectionBase,
        type: zod_1.z.literal("BRANDS"),
        heading: localizedShortTextSchema,
        description: localizedLongTextSchema,
        mode: zod_1.z.enum(["MANUAL", "FEATURED"]).default("FEATURED"),
        brandIds: zod_1.z.array(zod_1.z.string().uuid()).max(30).default([]),
        limit: zod_1.z.number().int().min(1).max(30).default(12),
        layout: zod_1.z
            .enum(["LOGO_RAIL", "LOGO_GRID", "EDITORIAL"])
            .default("LOGO_RAIL"),
    })
        .strict(),
    zod_1.z
        .object({
        ...sectionBase,
        type: zod_1.z.literal("PROMOTION"),
        promotionId: zod_1.z.string().uuid(),
        eyebrow: localizedShortTextSchema,
        heading: localizedShortTextSchema,
        description: localizedLongTextSchema,
        mediaAssetId: mediaFieldSchema,
        imageAlt: exports.landingPageLocalizedTextSchema,
        ctaLabel: localizedShortTextSchema,
        destination: exports.landingPageDestinationSchema.nullable().default(null),
        expiredBehavior: zod_1.z.enum(["HIDE", "SHOW_EXPIRED"]).default("HIDE"),
        style: zod_1.z.enum(["BANNER", "EDITORIAL", "DARK"]).default("BANNER"),
    })
        .strict(),
    zod_1.z
        .object({
        ...sectionBase,
        type: zod_1.z.literal("ROUTINE_CTA"),
        eyebrow: localizedShortTextSchema,
        heading: localizedShortTextSchema,
        description: localizedLongTextSchema,
        mediaAssetId: mediaFieldSchema,
        imageAlt: exports.landingPageLocalizedTextSchema,
        ctaLabel: localizedShortTextSchema,
        destination: exports.landingPageDestinationSchema.default({
            type: "CUSTOM_PATH",
            path: "/routine",
        }),
        style: zod_1.z.enum(["EDITORIAL", "COMPACT", "DARK"]).default("EDITORIAL"),
    })
        .strict(),
    zod_1.z
        .object({
        ...sectionBase,
        type: zod_1.z.literal("IMAGE_TEXT"),
        mediaAssetId: mediaFieldSchema,
        imageAlt: exports.landingPageLocalizedTextSchema,
        eyebrow: localizedShortTextSchema,
        heading: localizedShortTextSchema,
        body: localizedLongTextSchema,
        ctaLabel: localizedShortTextSchema,
        destination: exports.landingPageDestinationSchema.nullable().default(null),
        imageSide: zod_1.z.enum(["START", "END"]).default("START"),
        style: zod_1.z
            .enum(["EDITORIAL", "CONTAINED", "FULL_BLEED"])
            .default("EDITORIAL"),
    })
        .strict(),
    zod_1.z
        .object({
        ...sectionBase,
        type: zod_1.z.literal("PROMO_BANNER"),
        heading: localizedShortTextSchema,
        description: localizedLongTextSchema,
        mediaAssetId: mediaFieldSchema,
        imageAlt: exports.landingPageLocalizedTextSchema,
        ctaLabel: localizedShortTextSchema,
        destination: exports.landingPageDestinationSchema.nullable().default(null),
        style: zod_1.z.enum(["SOFT", "DARK", "ACCENT", "IMAGE"]).default("SOFT"),
    })
        .strict(),
    zod_1.z
        .object({
        ...sectionBase,
        type: zod_1.z.literal("COUNTDOWN"),
        eyebrow: localizedShortTextSchema,
        heading: localizedShortTextSchema,
        description: localizedLongTextSchema,
        endsAt: zod_1.z.string().datetime({ offset: true }),
        expiredBehavior: zod_1.z.enum(["HIDE", "SHOW_EXPIRED"]).default("HIDE"),
        expiredMessage: localizedShortTextSchema,
    })
        .strict(),
    zod_1.z
        .object({
        ...sectionBase,
        type: zod_1.z.literal("NEWSLETTER"),
        eyebrow: localizedShortTextSchema,
        heading: localizedShortTextSchema,
        description: localizedLongTextSchema,
        style: zod_1.z.enum(["COMPACT", "EDITORIAL", "DARK"]).default("COMPACT"),
    })
        .strict(),
    zod_1.z
        .object({
        ...sectionBase,
        type: zod_1.z.literal("FAQ"),
        heading: localizedShortTextSchema,
        description: localizedLongTextSchema,
        items: zod_1.z
            .array(zod_1.z
            .object({
            id: zod_1.z.string().uuid(),
            question: localizedShortTextSchema,
            answer: localizedLongTextSchema,
        })
            .strict())
            .max(20)
            .default([]),
    })
        .strict(),
    zod_1.z
        .object({
        ...sectionBase,
        type: zod_1.z.literal("SPACER"),
        size: zod_1.z.enum(["SMALL", "MEDIUM", "LARGE"]).default("MEDIUM"),
    })
        .strict(),
    zod_1.z.object({ ...sectionBase, type: zod_1.z.literal("DIVIDER") }).strict(),
]);
exports.landingPageSeoSchema = zod_1.z
    .object({
    title: localizedShortTextSchema,
    description: exports.landingPageLocalizedTextSchema.extend({
        en: zod_1.z.string().trim().max(320).default(""),
        ar: zod_1.z.string().trim().max(320).default(""),
    }),
    canonicalPath: zod_1.z
        .string()
        .trim()
        .regex(/^\/(?!\/)[^\s]*$/)
        .max(240)
        .nullable()
        .default(null),
    openGraphMediaId: mediaFieldSchema,
    indexable: zod_1.z.boolean().default(true),
})
    .strict();
exports.landingPageConfigSchema = zod_1.z
    .object({
    schemaVersion: zod_1.z.literal(exports.landingPageSchemaVersion),
    title: localizedShortTextSchema,
    seo: exports.landingPageSeoSchema,
    sections: zod_1.z.array(exports.landingPageSectionSchema).max(25),
})
    .strict()
    .superRefine((config, context) => {
    const ids = new Set();
    const analyticsKeys = new Set();
    let h1Count = 0;
    config.sections.forEach((section, index) => {
        if (ids.has(section.id))
            context.addIssue({
                code: zod_1.z.ZodIssueCode.custom,
                path: ["sections", index, "id"],
                message: "Section IDs must be unique.",
            });
        ids.add(section.id);
        if (analyticsKeys.has(section.analyticsKey))
            context.addIssue({
                code: zod_1.z.ZodIssueCode.custom,
                path: ["sections", index, "analyticsKey"],
                message: "Section analytics keys must be unique.",
            });
        analyticsKeys.add(section.analyticsKey);
        if (section.type === "HERO" &&
            section.headingLevel === "H1" &&
            section.enabled)
            h1Count += 1;
        if (section.type === "FAQ") {
            const itemIds = new Set();
            section.items.forEach((item, itemIndex) => {
                if (itemIds.has(item.id))
                    context.addIssue({
                        code: zod_1.z.ZodIssueCode.custom,
                        path: ["sections", index, "items", itemIndex, "id"],
                        message: "FAQ item IDs must be unique within a section.",
                    });
                itemIds.add(item.id);
            });
        }
    });
    if (h1Count > 1)
        context.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            path: ["sections"],
            message: "A page can contain at most one enabled H1 hero.",
        });
});
exports.landingPageSlugSchema = zod_1.z
    .string()
    .trim()
    .toLowerCase()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .min(2)
    .max(120);
exports.landingPageTemplateKeySchema = zod_1.z.enum([
    "BLANK",
    "HOMEPAGE",
    "CAMPAIGN",
    "BRAND_LANDING",
    "CATEGORY_LANDING",
    "ROUTINE_CAMPAIGN",
]);
exports.createLandingPageSchema = zod_1.z
    .object({
    name: zod_1.z.string().trim().min(2).max(140),
    slug: exports.landingPageSlugSchema,
    type: exports.landingPageTypeSchema,
    templateKey: exports.landingPageTemplateKeySchema.default("BLANK"),
})
    .strict();
exports.updateLandingPageDraftSchema = zod_1.z
    .object({
    expectedRevision: zod_1.z.number().int().min(1),
    name: zod_1.z.string().trim().min(2).max(140),
    slug: exports.landingPageSlugSchema,
    config: exports.landingPageConfigSchema,
})
    .strict();
exports.landingPageRevisionActionSchema = zod_1.z
    .object({ expectedRevision: zod_1.z.number().int().min(1) })
    .strict();
exports.scheduleLandingPageSchema = exports.landingPageRevisionActionSchema
    .extend({
    publishAt: zod_1.z.string().datetime({ offset: true }),
    unpublishAt: zod_1.z.string().datetime({ offset: true }).nullable().default(null),
})
    .strict()
    .superRefine((input, context) => {
    if (input.unpublishAt &&
        Date.parse(input.publishAt) >= Date.parse(input.unpublishAt))
        context.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            path: ["unpublishAt"],
            message: "Unpublish time must be after publish time.",
        });
});
exports.duplicateLandingPageSchema = zod_1.z
    .object({
    name: zod_1.z.string().trim().min(2).max(140),
    slug: exports.landingPageSlugSchema,
})
    .strict();
exports.landingPageListQuerySchema = pagination_1.paginationQuerySchema.extend({
    search: zod_1.z.string().trim().max(120).optional(),
    status: exports.landingPageStatusSchema.optional(),
    type: exports.landingPageTypeSchema.optional(),
});
exports.landingPageEntityTypeSchema = zod_1.z.enum([
    "PRODUCT",
    "CATEGORY",
    "BRAND",
    "TAG",
    "MEDIA",
    "PROMOTION",
    "PAGE",
]);
exports.landingPageEntityQuerySchema = zod_1.z.object({
    type: exports.landingPageEntityTypeSchema,
    search: zod_1.z.string().trim().max(120).optional(),
    page: zod_1.z.coerce.number().int().min(1).default(1),
    limit: zod_1.z.coerce.number().int().min(1).max(50).default(20),
});
exports.landingPageListResponseSchema = zod_1.z.object({
    data: zod_1.z.array(zod_1.z.custom()),
    meta: pagination_1.paginationMetaSchema,
});
//# sourceMappingURL=page-builder.schema.js.map