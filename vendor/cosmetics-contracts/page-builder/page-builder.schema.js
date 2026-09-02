"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.landingPageListResponseSchema = exports.landingPageSectionRegistry = exports.updateGlobalSectionDraftSchema = exports.createGlobalSectionSchema = exports.previewPageTemplateSchema = exports.updatePageTemplateSchema = exports.savePageAsTemplateSchema = exports.pageTemplateFamilySchema = exports.landingPageEntityQuerySchema = exports.landingPageEntityTypeSchema = exports.landingPageListQuerySchema = exports.duplicateLandingPageSchema = exports.scheduleLandingPageSchema = exports.landingPageRevisionActionSchema = exports.updateLandingPageDraftSchema = exports.createLandingPageSchema = exports.landingPageTemplateKeySchema = exports.landingPageSlugSchema = exports.landingPageConfigSchema = exports.landingPageSeoSchema = exports.landingPageSectionSchema = exports.landingPageHeroSlideSchema = exports.landingPageWidthSchema = exports.landingPageSpacingSchema = exports.landingPageSurfaceSchema = exports.landingPageLocalizedTextSchema = exports.landingPageStatusSchema = exports.landingPageTypeSchema = exports.landingPageSchemaVersion = exports.landingPageDestinationSchema = void 0;
exports.migrateLandingPageConfig = migrateLandingPageConfig;
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
    "CONCERN",
    "BUNDLE",
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
    "XS",
    "SMALL",
    "MEDIUM",
    "LARGE",
    "XL",
]);
exports.landingPageWidthSchema = zod_1.z.enum(["CONTENT", "WIDE", "FULL"]);
const sectionBase = {
    id: zod_1.z.string().uuid(),
    /** Independent section evolution; absent legacy values migrate to v1. */
    schemaVersion: zod_1.z.number().int().min(1).max(20).optional(),
    /** Optional published Global Section binding; the embedded config is an editor fallback. */
    globalSectionId: zod_1.z.string().uuid().nullable().optional(),
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
    responsiveOverrides: zod_1.z
        .object({
        tablet: zod_1.z
            .object({
            width: exports.landingPageWidthSchema.optional(),
            spacing: exports.landingPageSpacingSchema.optional(),
        })
            .strict()
            .default({}),
        mobile: zod_1.z
            .object({
            width: exports.landingPageWidthSchema.optional(),
            spacing: exports.landingPageSpacingSchema.optional(),
        })
            .strict()
            .default({}),
    })
        .strict()
        .optional(),
};
const mediaFieldSchema = zod_1.z.string().uuid().nullable().default(null);
const hexColorSchema = zod_1.z
    .string()
    .trim()
    .regex(/^#[0-9a-f]{6}$/i, "Use a six-digit hex colour.");
const heroObjectPositionSchema = zod_1.z.enum([
    "CENTER",
    "TOP",
    "BOTTOM",
    "LEFT",
    "RIGHT",
    "TOP_LEFT",
    "TOP_RIGHT",
    "BOTTOM_LEFT",
    "BOTTOM_RIGHT",
    "FOCAL_POINT",
]);
const heroFocalPointSchema = zod_1.z
    .object({
    x: zod_1.z.number().min(0).max(100).default(50),
    y: zod_1.z.number().min(0).max(100).default(50),
})
    .strict();
const heroCtaSchema = zod_1.z
    .object({
    label: localizedShortTextSchema,
    destination: exports.landingPageDestinationSchema.nullable().default(null),
    variant: zod_1.z.enum(["PRIMARY", "SECONDARY", "TEXT"]).default("PRIMARY"),
    newTab: zod_1.z.boolean().default(false),
})
    .strict();
const heroDesktopLayoutSchema = zod_1.z
    .object({
    mediaBehavior: zod_1.z.enum(["BACKGROUND", "SIDE"]).default("BACKGROUND"),
    objectFit: zod_1.z.enum(["COVER", "CONTAIN"]).default("COVER"),
    objectPosition: heroObjectPositionSchema.default("CENTER"),
    focalPoint: heroFocalPointSchema.default({ x: 50, y: 50 }),
    zoom: zod_1.z.number().int().min(100).max(130).default(100),
    sideImagePosition: zod_1.z.enum(["LEFT", "RIGHT"]).default("RIGHT"),
    sideImageWidth: zod_1.z.number().int().min(25).max(70).default(50),
    horizontalAlignment: zod_1.z.enum(["START", "CENTER", "END"]).default("START"),
    verticalAlignment: zod_1.z.enum(["TOP", "CENTER", "BOTTOM"]).default("CENTER"),
    textAlignment: zod_1.z.enum(["START", "CENTER", "END"]).default("START"),
    contentWidth: zod_1.z.enum(["NARROW", "MEDIUM", "WIDE"]).default("MEDIUM"),
    height: zod_1.z.enum(["COMPACT", "STANDARD", "TALL", "FULL"]).default("STANDARD"),
    overlay: zod_1.z.enum(["NONE", "LIGHT", "MEDIUM", "STRONG"]).default("MEDIUM"),
    overlayStyle: zod_1.z
        .enum(["SOLID", "TO_START", "TO_END", "TO_TOP", "TO_BOTTOM"])
        .default("TO_END"),
    overlayColor: hexColorSchema.default("#0f0c09"),
    textTheme: zod_1.z.enum(["LIGHT", "DARK", "AUTO"]).default("LIGHT"),
})
    .strict();
const heroMobileOverrideSchema = zod_1.z
    .object({
    enabled: zod_1.z.boolean().default(false),
    objectFit: zod_1.z.enum(["COVER", "CONTAIN"]).default("COVER"),
    objectPosition: heroObjectPositionSchema.default("CENTER"),
    focalPoint: heroFocalPointSchema.default({ x: 50, y: 50 }),
    zoom: zod_1.z.number().int().min(100).max(130).default(100),
    horizontalAlignment: zod_1.z.enum(["START", "CENTER", "END"]).default("START"),
    verticalAlignment: zod_1.z.enum(["TOP", "CENTER", "BOTTOM"]).default("CENTER"),
    textAlignment: zod_1.z.enum(["START", "CENTER", "END"]).default("START"),
    height: zod_1.z.enum(["COMPACT", "STANDARD", "TALL", "FULL"]).default("STANDARD"),
    overlay: zod_1.z.enum(["NONE", "LIGHT", "MEDIUM", "STRONG"]).default("MEDIUM"),
    overlayStyle: zod_1.z
        .enum(["SOLID", "TO_START", "TO_END", "TO_TOP", "TO_BOTTOM"])
        .default("TO_END"),
    textTheme: zod_1.z.enum(["LIGHT", "DARK", "AUTO"]).default("LIGHT"),
    contentOrder: zod_1.z
        .enum(["CONTENT_FIRST", "MEDIA_FIRST"])
        .default("MEDIA_FIRST"),
    ctaLayout: zod_1.z.enum(["INLINE", "STACK"]).default("STACK"),
    headlineScale: zod_1.z.enum(["SMALL", "MEDIUM", "LARGE"]).default("MEDIUM"),
    showDescription: zod_1.z.boolean().default(true),
    showSecondaryCta: zod_1.z.boolean().default(true),
})
    .strict();
exports.landingPageHeroSlideSchema = zod_1.z
    .object({
    id: zod_1.z.string().uuid(),
    label: zod_1.z.string().trim().min(1).max(100),
    enabled: zod_1.z.boolean().default(true),
    mediaType: zod_1.z.enum(["IMAGE", "VIDEO", "NONE"]).default("IMAGE"),
    /** Source-backed compatibility asset used only by Signature Hero defaults. */
    signatureMedia: zod_1.z
        .enum(["RADIANCE", "SERUM", "MINIMAL"])
        .nullable()
        .default(null),
    desktopMediaId: mediaFieldSchema,
    mobileMediaId: mediaFieldSchema,
    posterMediaId: mediaFieldSchema,
    imageAlt: exports.landingPageLocalizedTextSchema,
    decorative: zod_1.z.boolean().default(false),
    eyebrow: localizedShortTextSchema,
    heading: localizedShortTextSchema,
    secondaryHeading: localizedShortTextSchema,
    description: localizedLongTextSchema,
    supportingText: localizedLongTextSchema,
    primaryCta: heroCtaSchema,
    secondaryCta: heroCtaSchema,
    layout: heroDesktopLayoutSchema,
    mobile: heroMobileOverrideSchema,
    video: zod_1.z
        .object({
        autoplay: zod_1.z.boolean().default(true),
        muted: zod_1.z.boolean().default(true),
        loop: zod_1.z.boolean().default(true),
        controls: zod_1.z.boolean().default(false),
        playsInline: zod_1.z.boolean().default(true),
        preload: zod_1.z.enum(["NONE", "METADATA", "AUTO"]).default("METADATA"),
    })
        .strict(),
    schedule: zod_1.z
        .object({
        startsAt: zod_1.z
            .string()
            .datetime({ offset: true })
            .nullable()
            .default(null),
        endsAt: zod_1.z.string().datetime({ offset: true }).nullable().default(null),
    })
        .strict()
        .superRefine((schedule, context) => {
        if (schedule.startsAt &&
            schedule.endsAt &&
            Date.parse(schedule.startsAt) >= Date.parse(schedule.endsAt))
            context.addIssue({
                code: zod_1.z.ZodIssueCode.custom,
                path: ["endsAt"],
                message: "Slide end time must be after its start time.",
            });
    }),
})
    .strict();
const heroCarouselSchema = zod_1.z
    .object({
    autoplay: zod_1.z.boolean().default(true),
    durationSeconds: zod_1.z.number().int().min(3).max(15).default(6),
    pauseOnHover: zod_1.z.boolean().default(true),
    showArrows: zod_1.z.boolean().default(true),
    showIndicators: zod_1.z.boolean().default(true),
    indicatorStyle: zod_1.z.enum(["DOTS", "PROGRESS"]).default("DOTS"),
    animation: zod_1.z.enum(["NONE", "FADE", "SLIDE", "CROSSFADE"]).default("FADE"),
})
    .strict();
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
    zod_1.z.object({ mode: zod_1.z.literal("BEST_SELLERS") }).strict(),
    zod_1.z.object({ mode: zod_1.z.literal("CURRENT_CONTEXT") }).strict(),
    zod_1.z
        .object({
        mode: zod_1.z.literal("DYNAMIC_RULE"),
        categoryId: zod_1.z.string().uuid().nullable().default(null),
        brandId: zod_1.z.string().uuid().nullable().default(null),
        tagId: zod_1.z.string().uuid().nullable().default(null),
        availability: zod_1.z.enum(["ALL", "IN_STOCK"]).default("IN_STOCK"),
        sort: zod_1.z
            .enum(["NEWEST", "NAME", "PRICE_LOW", "PRICE_HIGH"])
            .default("NEWEST"),
    })
        .strict(),
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
const landingPageContentBlockSchema = zod_1.z.discriminatedUnion("type", [
    zod_1.z
        .object({
        id: zod_1.z.string().uuid(),
        type: zod_1.z.literal("TEXT"),
        eyebrow: localizedShortTextSchema,
        title: localizedShortTextSchema,
        body: localizedLongTextSchema,
        ctaLabel: localizedShortTextSchema,
        destination: exports.landingPageDestinationSchema.nullable().default(null),
    })
        .strict(),
    zod_1.z
        .object({
        id: zod_1.z.string().uuid(),
        type: zod_1.z.literal("BENEFIT"),
        icon: zod_1.z.enum(["SHIELD", "TRUCK", "LEAF", "SPARKLES"]),
        title: localizedShortTextSchema,
        body: localizedLongTextSchema,
    })
        .strict(),
    zod_1.z
        .object({
        id: zod_1.z.string().uuid(),
        type: zod_1.z.literal("QUOTE"),
        quote: localizedLongTextSchema,
        attribution: localizedShortTextSchema,
    })
        .strict(),
]);
exports.landingPageSectionSchema = zod_1.z.discriminatedUnion("type", [
    zod_1.z
        .object({
        ...sectionBase,
        type: zod_1.z.literal("HERO"),
        preset: zod_1.z
            .enum([
            "STANDARD",
            "BIOREZA_SIGNATURE",
            "FULL_BLEED_EDITORIAL",
            "MINIMAL_CENTERED",
            "EDITORIAL_LEFT",
            "EDITORIAL_RIGHT",
            "SPLIT_MEDIA_LEFT",
            "SPLIT_MEDIA_RIGHT",
            "FULL_BLEED_VIDEO",
            "PRODUCT_SPOTLIGHT",
            "BRAND_SPOTLIGHT",
            "CATEGORY_SPOTLIGHT",
            "CAMPAIGN",
            "PROMOTION",
            "TWO_CTA",
            "MOBILE_FIRST",
            "CAROUSEL",
            "CLEAN_IMAGE",
            "TEXT_FIRST",
        ])
            .default("STANDARD"),
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
        // New Hero Builder records use slides. The legacy single-hero fields
        // above remain readable so existing immutable versions require no data
        // migration and can be restored safely.
        slides: zod_1.z.array(exports.landingPageHeroSlideSchema).max(12).optional(),
        carousel: heroCarouselSchema.optional(),
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
        type: zod_1.z.literal("BIOREZA_HOME_MODULE"),
        module: zod_1.z.enum([
            "BRAND_MARQUEE",
            "BENEFITS",
            "CATEGORY_SHOWCASE",
            "FEATURED",
            "COLLECTION_FEATURE",
            "CONCERNS",
            "BEST_SELLERS",
            "BRAND_STORY",
            "BEAUTY_DIFFERENCE",
        ]),
    })
        .strict(),
    zod_1.z
        .object({
        ...sectionBase,
        type: zod_1.z.literal("CONTENT_BLOCKS"),
        heading: localizedShortTextSchema,
        description: localizedLongTextSchema,
        layout: zod_1.z.enum(["GRID", "LIST"]).default("GRID"),
        columns: zod_1.z.number().int().min(1).max(4).default(3),
        blocks: zod_1.z.array(landingPageContentBlockSchema).min(1).max(12),
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
        if (section.type === "CONTENT_BLOCKS") {
            const blockIds = new Set();
            section.blocks.forEach((block, blockIndex) => {
                if (blockIds.has(block.id))
                    context.addIssue({
                        code: zod_1.z.ZodIssueCode.custom,
                        path: ["sections", index, "blocks", blockIndex, "id"],
                        message: "Block IDs must be unique within a section.",
                    });
                blockIds.add(block.id);
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
/** Deterministically upgrades stored legacy JSON before validation/rendering. */
function migrateLandingPageConfig(input) {
    if (!input || typeof input !== "object" || Array.isArray(input))
        return exports.landingPageConfigSchema.parse(input);
    const source = structuredClone(input);
    if (source.schemaVersion !== exports.landingPageSchemaVersion)
        return exports.landingPageConfigSchema.parse(source);
    if (Array.isArray(source.sections))
        source.sections = source.sections.map((section) => section && typeof section === "object" && !Array.isArray(section)
            ? { schemaVersion: 1, ...section }
            : section);
    return exports.landingPageConfigSchema.parse(source);
}
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
    "BIOREZA_DEFAULT_HOME",
    "LUXURY_EDITORIAL_HOME",
    "PRODUCT_DISCOVERY_HOME",
    "BRAND_DISCOVERY_HOME",
    "MINIMAL_BEAUTY_HOME",
    "CAMPAIGN_HOME",
    "SEASONAL_CAMPAIGN",
    "RAMADAN_CAMPAIGN",
    "EID_CAMPAIGN",
    "SUMMER_ESSENTIALS",
    "WINTER_SKINCARE",
    "SALE_PROMOTION",
    "NEW_ARRIVALS_CAMPAIGN",
    "BEST_SELLERS_CAMPAIGN",
    "PRODUCT_LAUNCH",
    "SINGLE_PRODUCT_SPOTLIGHT",
    "PRODUCT_FAMILY",
    "ROUTINE_COLLECTION",
    "PRODUCT_COMPARISON",
    "BUNDLE_SET_LANDING",
    "BRAND_EDITORIAL",
    "BRAND_CATALOG",
    "BRAND_STORY_PRODUCTS",
    "BRAND_CATEGORY_SHOWCASE",
    "CATEGORY_EDITORIAL",
    "CATEGORY_PRODUCT_DISCOVERY",
    "CATEGORY_FEATURED_PRODUCTS",
    "CATEGORY_STORY",
    "ABOUT_BIOREZA",
    "BEAUTY_GUIDE",
    "INGREDIENT_STORY",
    "ROUTINE_GUIDE",
    "FAQ_INFORMATION",
    "EDITORIAL_STORY",
    "BIOREZA_CONCERN_SIGNATURE",
    "CONCERN_EDITORIAL",
    "CONCERN_PRODUCT_DISCOVERY",
    "CONCERN_ROUTINE_FIRST",
    "CONCERN_EDUCATION_FIRST",
    "MINIMAL_CONCERN",
    "INGREDIENT_LED_CONCERN",
    "PREMIUM_EDITORIAL_CONCERN",
    "BLANK_CAMPAIGN",
]);
exports.createLandingPageSchema = zod_1.z
    .object({
    name: zod_1.z.string().trim().min(2).max(140),
    slug: exports.landingPageSlugSchema,
    type: exports.landingPageTypeSchema,
    templateKey: exports.landingPageTemplateKeySchema.default("BLANK"),
    templateId: zod_1.z.string().uuid().nullable().optional(),
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
    sortBy: zod_1.z
        .enum(["UPDATED_AT", "NAME", "STATUS", "PUBLISHED_AT"])
        .default("UPDATED_AT"),
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
exports.pageTemplateFamilySchema = zod_1.z.enum([
    "HOMEPAGE",
    "CAMPAIGN",
    "PRODUCT",
    "BRAND",
    "CATEGORY",
    "CONCERN",
    "CONTENT",
    "BLANK",
]);
exports.savePageAsTemplateSchema = zod_1.z
    .object({
    name: zod_1.z.string().trim().min(2).max(140),
    slug: exports.landingPageSlugSchema,
    description: zod_1.z.string().trim().min(2).max(500),
    family: exports.pageTemplateFamilySchema,
    thumbnailMediaId: mediaFieldSchema.optional(),
})
    .strict();
exports.updatePageTemplateSchema = exports.savePageAsTemplateSchema
    .pick({ name: true, description: true, family: true })
    .partial()
    .strict();
exports.previewPageTemplateSchema = zod_1.z
    .object({
    key: exports.landingPageTemplateKeySchema.nullable().default(null),
    templateId: zod_1.z.string().uuid().nullable().default(null),
})
    .strict()
    .refine((input) => Boolean(input.key) !== Boolean(input.templateId), {
    message: "Select exactly one built-in or custom template.",
});
exports.createGlobalSectionSchema = zod_1.z
    .object({
    name: zod_1.z.string().trim().min(2).max(140),
    section: exports.landingPageSectionSchema,
})
    .strict();
exports.updateGlobalSectionDraftSchema = zod_1.z
    .object({
    expectedRevision: zod_1.z.number().int().min(1),
    name: zod_1.z.string().trim().min(2).max(140),
    section: exports.landingPageSectionSchema,
})
    .strict();
/**
 * Cross-application registry metadata. Runtime editor/renderer implementations
 * remain local to their application, but type identity, version and supported
 * capabilities have one contract-level source of truth.
 */
exports.landingPageSectionRegistry = [
    [
        "HERO",
        "Hero banner",
        "HERO",
        "Editorial image, video or content-only Hero",
        false,
        true,
        false,
        true,
    ],
    [
        "PRODUCT_GRID",
        "Product grid",
        "COMMERCE",
        "Canonical products in a responsive grid",
        true,
        true,
        false,
        false,
    ],
    [
        "PRODUCT_CAROUSEL",
        "Product carousel",
        "COMMERCE",
        "Canonical products in a swipeable rail",
        true,
        true,
        false,
        false,
    ],
    [
        "CATEGORIES",
        "Categories",
        "COMMERCE",
        "Canonical category hierarchy",
        true,
        true,
        false,
        true,
    ],
    [
        "BRANDS",
        "Brands",
        "COMMERCE",
        "Canonical brand discovery",
        true,
        true,
        false,
        true,
    ],
    [
        "PROMOTION",
        "Promotion",
        "MARKETING",
        "Presentation bound to a canonical promotion",
        true,
        true,
        false,
        true,
    ],
    [
        "ROUTINE_CTA",
        "Build your routine",
        "MARKETING",
        "Route into the canonical Routine Builder",
        false,
        true,
        false,
        true,
    ],
    [
        "IMAGE_TEXT",
        "Image + text",
        "CONTENT",
        "Controlled editorial media and copy",
        false,
        true,
        false,
        true,
    ],
    [
        "IMAGE",
        "Image",
        "CONTENT",
        "Responsive standalone Media Library asset",
        false,
        true,
        false,
        true,
    ],
    [
        "PROMO_BANNER",
        "Promo banner",
        "MARKETING",
        "Compact campaign callout",
        false,
        true,
        false,
        true,
    ],
    [
        "COUNTDOWN",
        "Countdown",
        "MARKETING",
        "Server-timed campaign countdown",
        false,
        true,
        false,
        false,
    ],
    [
        "NEWSLETTER",
        "Newsletter",
        "UTILITY",
        "Existing newsletter subscription flow",
        false,
        true,
        false,
        false,
    ],
    [
        "FAQ",
        "FAQ",
        "CONTENT",
        "Structured questions and answers",
        false,
        true,
        true,
        false,
    ],
    [
        "BIOREZA_HOME_MODULE",
        "BioReza homepage module",
        "CONTENT",
        "Signature homepage composition with canonical Storefront behavior",
        true,
        true,
        false,
        true,
    ],
    [
        "CONTENT_BLOCKS",
        "Content blocks",
        "CONTENT",
        "Repeatable benefits, text cards and quotes",
        false,
        true,
        true,
        false,
    ],
    [
        "SPACER",
        "Spacer",
        "UTILITY",
        "Controlled vertical rhythm",
        false,
        true,
        false,
        false,
    ],
    [
        "DIVIDER",
        "Divider",
        "UTILITY",
        "Controlled section separator",
        false,
        true,
        false,
        false,
    ],
].map(([type, name, category, description, dataSource, responsive, blocks, media,]) => ({
    type: type,
    schemaVersion: 1,
    name: name,
    category: category,
    description: description,
    capabilities: {
        dataSource: dataSource,
        responsive: responsive,
        blocks: blocks,
        media: media,
        scheduling: true,
    },
}));
exports.landingPageListResponseSchema = zod_1.z.object({
    data: zod_1.z.array(zod_1.z.custom()),
    meta: pagination_1.paginationMetaSchema,
});
//# sourceMappingURL=page-builder.schema.js.map