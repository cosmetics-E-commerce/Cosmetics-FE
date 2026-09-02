"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_NAVIGATION_CONFIG = exports.NAVIGATION_LAYOUT_PRESETS = exports.navigationEntityQuerySchema = exports.navigationEntityTypeSchema = exports.navigationDraftSaveSchema = exports.navigationConfigSchema = exports.navigationItemSchema = exports.navigationMegaMenuSchema = exports.navigationRowSchema = exports.navigationColumnSchema = exports.navigationLayoutPresetSchema = exports.navigationBlockSchema = exports.categoryMenuTemplateSchema = exports.categoryColumnSchema = exports.navigationDestinationSchema = exports.navigationVisibilitySchema = exports.navigationLocaleSchema = exports.navigationDeviceSchema = exports.localizedNavigationTextSchema = exports.navigationSchemaVersion = void 0;
exports.migrateNavigationConfig = migrateNavigationConfig;
const zod_1 = require("zod");
exports.navigationSchemaVersion = 2;
exports.localizedNavigationTextSchema = zod_1.z.object({
    en: zod_1.z.string().trim().max(180).default(""),
    ar: zod_1.z.string().trim().max(180).default(""),
});
exports.navigationDeviceSchema = zod_1.z.enum(["DESKTOP", "TABLET", "MOBILE"]);
exports.navigationLocaleSchema = zod_1.z.enum(["en", "ar"]);
exports.navigationVisibilitySchema = zod_1.z
    .object({
    devices: zod_1.z
        .array(exports.navigationDeviceSchema)
        .min(1)
        .max(3)
        .default(["DESKTOP", "TABLET", "MOBILE"]),
    locales: zod_1.z
        .array(exports.navigationLocaleSchema)
        .min(1)
        .max(2)
        .default(["en", "ar"]),
    startsAt: zod_1.z.string().datetime({ offset: true }).nullable().default(null),
    endsAt: zod_1.z.string().datetime({ offset: true }).nullable().default(null),
})
    .superRefine((value, context) => {
    if (value.startsAt &&
        value.endsAt &&
        Date.parse(value.startsAt) >= Date.parse(value.endsAt)) {
        context.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            path: ["endsAt"],
            message: "Visibility end must be after its start.",
        });
    }
});
exports.navigationDestinationSchema = zod_1.z.discriminatedUnion("type", [
    zod_1.z.object({ type: zod_1.z.literal("HOME") }),
    zod_1.z.object({ type: zod_1.z.literal("SHOP") }),
    zod_1.z.object({ type: zod_1.z.literal("OFFERS") }),
    zod_1.z.object({ type: zod_1.z.literal("NEW_ARRIVALS") }),
    zod_1.z.object({ type: zod_1.z.literal("ABOUT") }),
    zod_1.z.object({ type: zod_1.z.literal("CONTACT") }),
    zod_1.z.object({ type: zod_1.z.literal("CATEGORY"), id: zod_1.z.string().uuid() }),
    zod_1.z.object({ type: zod_1.z.literal("BRAND"), id: zod_1.z.string().uuid() }),
    zod_1.z.object({ type: zod_1.z.literal("PRODUCT"), id: zod_1.z.string().uuid() }),
    zod_1.z.object({ type: zod_1.z.literal("TAG"), id: zod_1.z.string().uuid() }),
    zod_1.z.object({ type: zod_1.z.literal("CONCERN"), id: zod_1.z.string().uuid() }),
    zod_1.z.object({ type: zod_1.z.literal("BUNDLE"), id: zod_1.z.string().uuid() }),
    zod_1.z.object({
        type: zod_1.z.literal("CUSTOM_PATH"),
        path: zod_1.z
            .string()
            .trim()
            .regex(/^\/(?!\/)[^\s]*$/, "Use an internal path beginning with /.")
            .max(500),
    }),
    zod_1.z.object({
        type: zod_1.z.literal("EXTERNAL"),
        url: zod_1.z
            .string()
            .url()
            .max(1000)
            .refine((url) => /^https?:\/\//i.test(url), "Only HTTP(S) URLs are allowed."),
        newTab: zod_1.z.boolean().default(true),
    }),
]);
const blockBaseShape = {
    id: zod_1.z.string().uuid(),
    enabled: zod_1.z.boolean().default(true),
    visibility: exports.navigationVisibilitySchema,
    mobileOrder: zod_1.z.number().int().min(0).max(100).nullable().default(null),
};
const listHeadingShape = {
    heading: exports.localizedNavigationTextSchema,
    showHeading: zod_1.z.boolean().default(true),
    showViewAll: zod_1.z.boolean().default(false),
    viewAllLabel: exports.localizedNavigationTextSchema,
    viewAllDestination: exports.navigationDestinationSchema.nullable().default(null),
};
exports.categoryColumnSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    enabled: zod_1.z.boolean().default(true),
    parentCategoryId: zod_1.z.string().uuid().nullable().default(null),
    childMode: zod_1.z
        .enum(["ALL_ACTIVE", "SELECTED", "ALL_EXCEPT"])
        .default("ALL_ACTIVE"),
    selectedChildIds: zod_1.z.array(zod_1.z.string().uuid()).max(60).default([]),
    excludedChildIds: zod_1.z.array(zod_1.z.string().uuid()).max(60).default([]),
    orderMode: zod_1.z
        .enum(["CANONICAL", "ALPHABETICAL", "CUSTOM"])
        .default("CANONICAL"),
    customOrder: zod_1.z.array(zod_1.z.string().uuid()).max(60).default([]),
    headingMode: zod_1.z.enum(["PARENT", "CUSTOM", "NONE"]).default("PARENT"),
    customHeading: exports.localizedNavigationTextSchema.default({ en: "", ar: "" }),
    parentClickable: zod_1.z.boolean().default(true),
    showViewAll: zod_1.z.boolean().default(true),
    viewAllLabel: exports.localizedNavigationTextSchema.default({
        en: "View all",
        ar: "عرض الكل",
    }),
    depth: zod_1.z.enum(["LEVEL_2", "LEVEL_3"]).default("LEVEL_2"),
    grandchildDisplay: zod_1.z
        .enum(["INDENTED", "COMPACT", "EXPANDABLE"])
        .default("INDENTED"),
    maximumChildren: zod_1.z.number().int().min(1).max(60).nullable().default(12),
});
exports.categoryMenuTemplateSchema = zod_1.z.enum([
    "CATEGORY_COLUMNS",
    "CATEGORY_TREE",
    "EXPANDED_CATEGORY_TREE",
    "COMPACT_CATEGORIES",
    "CATEGORIES_FEATURED",
    "MULTI_CATEGORY_MEGA_MENU",
    "CATEGORY_GRID",
]);
exports.navigationBlockSchema = zod_1.z.discriminatedUnion("type", [
    zod_1.z.object({
        ...blockBaseShape,
        type: zod_1.z.literal("CATEGORY_COLUMNS"),
        template: exports.categoryMenuTemplateSchema.default("CATEGORY_COLUMNS"),
        columns: zod_1.z.array(exports.categoryColumnSchema).min(1).max(8),
        padding: zod_1.z.enum(["COMPACT", "STANDARD", "COMFORTABLE"]).default("STANDARD"),
        columnGap: zod_1.z.enum(["TIGHT", "STANDARD", "WIDE"]).default("STANDARD"),
        density: zod_1.z.enum(["COMPACT", "STANDARD", "RELAXED"]).default("STANDARD"),
        parentStyle: zod_1.z.enum(["SMALL", "STANDARD", "PROMINENT"]).default("STANDARD"),
        childStyle: zod_1.z.enum(["COMPACT", "STANDARD"]).default("STANDARD"),
        separators: zod_1.z.enum(["NONE", "SUBTLE"]).default("NONE"),
        alignment: zod_1.z.enum(["START", "CENTER"]).default("START"),
        tabletColumns: zod_1.z.enum(["AUTO", "TWO", "THREE", "FOUR"]).default("AUTO"),
        mobilePresentation: zod_1.z.enum(["ACCORDION", "LIST"]).default("ACCORDION"),
    }),
    zod_1.z.object({
        ...blockBaseShape,
        type: zod_1.z.literal("CATEGORY_EXPLORER"),
        heading: exports.localizedNavigationTextSchema,
        viewAllLabel: exports.localizedNavigationTextSchema,
        viewAllDestination: exports.navigationDestinationSchema,
        maximumParents: zod_1.z.number().int().min(1).max(12).default(8),
        maximumChildren: zod_1.z.number().int().min(1).max(16).default(8),
        showProductCounts: zod_1.z.boolean().default(true),
        featuredBrandIds: zod_1.z.array(zod_1.z.string().uuid()).max(8).default([]),
        promo: zod_1.z
            .object({
            enabled: zod_1.z.boolean().default(true),
            eyebrow: exports.localizedNavigationTextSchema,
            title: exports.localizedNavigationTextSchema,
            description: exports.localizedNavigationTextSchema,
            ctaLabel: exports.localizedNavigationTextSchema,
            destination: exports.navigationDestinationSchema,
            mediaAssetId: zod_1.z.string().uuid().nullable().default(null),
            imageAlt: exports.localizedNavigationTextSchema,
            style: zod_1.z
                .enum(["IMAGE_BOTTOM", "IMAGE_TOP", "SPLIT", "MINIMAL"])
                .default("IMAGE_BOTTOM"),
        })
            .default({
            enabled: true,
            eyebrow: { en: "Shop by category", ar: "تسوقي حسب الفئة" },
            title: { en: "Skincare That Cares", ar: "عناية بالبشرة تهتم بك" },
            description: {
                en: "Discover products that love your skin.",
                ar: "اكتشفي منتجات تمنح بشرتك عناية يومية هادئة.",
            },
            ctaLabel: { en: "Shop Now", ar: "تسوقي الآن" },
            destination: { type: "SHOP" },
            mediaAssetId: null,
            imageAlt: { en: "", ar: "" },
            style: "IMAGE_BOTTOM",
        }),
    }),
    zod_1.z.object({
        ...blockBaseShape,
        type: zod_1.z.literal("BRAND_DIRECTORY"),
        heading: exports.localizedNavigationTextSchema,
        searchPlaceholder: exports.localizedNavigationTextSchema,
        viewAllLabel: exports.localizedNavigationTextSchema,
        maximumItems: zod_1.z.number().int().min(12).max(500).default(160),
        showSearch: zod_1.z.boolean().default(true),
    }),
    zod_1.z.object({
        ...blockBaseShape,
        ...listHeadingShape,
        type: zod_1.z.literal("CATEGORY_LIST"),
        mode: zod_1.z.enum(["MANUAL", "TOP_LEVEL", "CHILDREN"]).default("MANUAL"),
        categoryIds: zod_1.z.array(zod_1.z.string().uuid()).max(40).default([]),
        parentCategoryId: zod_1.z.string().uuid().nullable().default(null),
        maximumItems: zod_1.z.number().int().min(1).max(40).default(8),
        order: zod_1.z
            .enum(["MANUAL", "NAME_ASC", "NAME_DESC", "SORT_ORDER"])
            .default("MANUAL"),
        presentation: zod_1.z
            .enum(["PLAIN", "ICONS", "COMPACT", "RAIL"])
            .default("PLAIN"),
        showIcon: zod_1.z.boolean().default(false),
        showProductCount: zod_1.z.boolean().default(false),
        showChevron: zod_1.z.boolean().default(false),
    }),
    zod_1.z.object({
        ...blockBaseShape,
        ...listHeadingShape,
        type: zod_1.z.literal("BRAND_LIST"),
        mode: zod_1.z.enum(["MANUAL", "ALL_ACTIVE"]).default("MANUAL"),
        brandIds: zod_1.z.array(zod_1.z.string().uuid()).max(60).default([]),
        maximumItems: zod_1.z.number().int().min(1).max(60).default(8),
        order: zod_1.z.enum(["MANUAL", "NAME_ASC", "NAME_DESC"]).default("MANUAL"),
        presentation: zod_1.z.enum(["TEXT", "LOGOS", "LOGO_GRID"]).default("TEXT"),
    }),
    zod_1.z.object({
        ...blockBaseShape,
        ...listHeadingShape,
        type: zod_1.z.literal("PRODUCT_LIST"),
        mode: zod_1.z
            .enum(["MANUAL", "NEW_ARRIVALS", "CATEGORY", "BRAND", "TAG", "SALE"])
            .default("MANUAL"),
        productIds: zod_1.z.array(zod_1.z.string().uuid()).max(24).default([]),
        referenceId: zod_1.z.string().uuid().nullable().default(null),
        maximumItems: zod_1.z.number().int().min(1).max(12).default(4),
        presentation: zod_1.z.enum(["CARDS", "COMPACT", "FEATURED"]).default("COMPACT"),
        showImage: zod_1.z.boolean().default(true),
        showPrice: zod_1.z.boolean().default(true),
    }),
    zod_1.z.object({
        ...blockBaseShape,
        ...listHeadingShape,
        type: zod_1.z.literal("TAG_LIST"),
        mode: zod_1.z.enum(["MANUAL", "ALL"]).default("MANUAL"),
        tagIds: zod_1.z.array(zod_1.z.string().uuid()).max(40).default([]),
        maximumItems: zod_1.z.number().int().min(1).max(40).default(10),
        order: zod_1.z.enum(["MANUAL", "NAME_ASC", "NAME_DESC"]).default("MANUAL"),
    }),
    zod_1.z.object({
        ...blockBaseShape,
        type: zod_1.z.literal("PROMO_CARD"),
        eyebrow: exports.localizedNavigationTextSchema,
        title: exports.localizedNavigationTextSchema,
        description: exports.localizedNavigationTextSchema,
        ctaLabel: exports.localizedNavigationTextSchema,
        destination: exports.navigationDestinationSchema,
        mediaAssetId: zod_1.z.string().uuid().nullable().default(null),
        imageAlt: exports.localizedNavigationTextSchema,
        showImage: zod_1.z.boolean().default(true),
        showDescription: zod_1.z.boolean().default(true),
        showCta: zod_1.z.boolean().default(true),
        alignment: zod_1.z.enum(["START", "CENTER"]).default("START"),
        style: zod_1.z
            .enum(["IMAGE_BOTTOM", "IMAGE_TOP", "SPLIT", "MINIMAL"])
            .default("IMAGE_BOTTOM"),
    }),
    zod_1.z.object({
        ...blockBaseShape,
        type: zod_1.z.literal("CUSTOM_LINKS"),
        heading: exports.localizedNavigationTextSchema,
        showHeading: zod_1.z.boolean().default(true),
        links: zod_1.z
            .array(zod_1.z.object({
            id: zod_1.z.string().uuid(),
            label: exports.localizedNavigationTextSchema,
            destination: exports.navigationDestinationSchema,
        }))
            .max(30)
            .default([]),
        presentation: zod_1.z.enum(["PLAIN", "COMPACT", "EMPHASIS"]).default("PLAIN"),
    }),
    zod_1.z.object({
        ...blockBaseShape,
        type: zod_1.z.literal("HEADING"),
        text: exports.localizedNavigationTextSchema,
        level: zod_1.z.enum(["PRIMARY", "SECONDARY", "EYEBROW"]).default("PRIMARY"),
        alignment: zod_1.z.enum(["START", "CENTER"]).default("START"),
    }),
    zod_1.z.object({
        ...blockBaseShape,
        type: zod_1.z.literal("TEXT"),
        text: exports.localizedNavigationTextSchema,
        tone: zod_1.z.enum(["DEFAULT", "MUTED", "EMPHASIS"]).default("DEFAULT"),
    }),
    zod_1.z.object({
        ...blockBaseShape,
        type: zod_1.z.literal("CTA"),
        label: exports.localizedNavigationTextSchema,
        destination: exports.navigationDestinationSchema,
        style: zod_1.z.enum(["TEXT", "OUTLINE", "SOLID"]).default("TEXT"),
        alignment: zod_1.z.enum(["START", "CENTER", "END", "STRETCH"]).default("START"),
        icon: zod_1.z.enum(["NONE", "GRID", "CHEVRON"]).default("NONE"),
        iconPosition: zod_1.z.enum(["START", "END"]).default("END"),
    }),
    zod_1.z.object({
        ...blockBaseShape,
        type: zod_1.z.literal("IMAGE"),
        mediaAssetId: zod_1.z.string().uuid().nullable().default(null),
        alt: exports.localizedNavigationTextSchema,
        destination: exports.navigationDestinationSchema.nullable().default(null),
        aspect: zod_1.z.enum(["AUTO", "SQUARE", "LANDSCAPE", "PORTRAIT"]).default("AUTO"),
    }),
    zod_1.z.object({ ...blockBaseShape, type: zod_1.z.literal("DIVIDER") }),
    zod_1.z.object({
        ...blockBaseShape,
        type: zod_1.z.literal("SPACER"),
        size: zod_1.z.enum(["SMALL", "MEDIUM", "LARGE"]).default("MEDIUM"),
    }),
    zod_1.z.object({
        ...blockBaseShape,
        type: zod_1.z.literal("SHOP_ALL"),
        label: exports.localizedNavigationTextSchema,
        destination: exports.navigationDestinationSchema.default({ type: "SHOP" }),
        style: zod_1.z.enum(["TEXT", "OUTLINE", "SOLID"]).default("TEXT"),
    }),
]);
exports.navigationLayoutPresetSchema = zod_1.z.enum([
    "TWO_EQUAL",
    "THREE_EQUAL",
    "FOUR_EQUAL",
    "FIVE_EQUAL",
    "TWO_THIRDS_ONE_THIRD",
    "ONE_THIRD_TWO_THIRDS",
    "QUARTER_HALF_QUARTER",
    "CONTENT_PROMO",
    "CLASSIC_SIX",
]);
exports.navigationColumnSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    span: zod_1.z.number().int().min(1).max(12),
    blocks: zod_1.z.array(exports.navigationBlockSchema).max(10),
});
exports.navigationRowSchema = zod_1.z
    .object({
    id: zod_1.z.string().uuid(),
    preset: exports.navigationLayoutPresetSchema,
    presentation: zod_1.z.enum(["DEFAULT", "UTILITY"]).default("DEFAULT"),
    columnSeparators: zod_1.z.boolean().default(false),
    enabled: zod_1.z.boolean().default(true),
    visibility: exports.navigationVisibilitySchema,
    columns: zod_1.z.array(exports.navigationColumnSchema).min(1).max(6),
})
    .superRefine((row, context) => {
    if (row.columns.reduce((sum, column) => sum + column.span, 0) !== 12) {
        context.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            path: ["columns"],
            message: "Column spans must total 12.",
        });
    }
});
exports.navigationMegaMenuSchema = zod_1.z.object({
    enabled: zod_1.z.boolean().default(true),
    width: zod_1.z.enum(["CONTENT", "WIDE", "FULL"]).default("FULL"),
    style: zod_1.z.enum(["MINIMAL", "CLASSIC", "PROMOTIONAL"]).default("MINIMAL"),
    mobilePresentation: zod_1.z.enum(["STACK", "ACCORDION"]).default("ACCORDION"),
    rows: zod_1.z.array(exports.navigationRowSchema).max(6),
});
exports.navigationItemSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    key: zod_1.z
        .string()
        .trim()
        .regex(/^[a-z0-9][a-z0-9-]*$/)
        .max(64),
    label: exports.localizedNavigationTextSchema,
    destination: exports.navigationDestinationSchema,
    enabled: zod_1.z.boolean().default(true),
    locked: zod_1.z.boolean().default(false),
    visibility: exports.navigationVisibilitySchema,
    megaMenu: exports.navigationMegaMenuSchema.nullable().default(null),
});
const navigationConfigV2Schema = zod_1.z
    .object({
    schemaVersion: zod_1.z.literal(exports.navigationSchemaVersion),
    items: zod_1.z.array(exports.navigationItemSchema).min(1).max(16),
})
    .superRefine((config, context) => {
    const ids = new Set();
    const keys = new Set();
    let blocks = 0;
    const registerId = (id, path, label) => {
        if (ids.has(id))
            context.addIssue({
                code: zod_1.z.ZodIssueCode.custom,
                path,
                message: `${label} IDs must be unique across the navigation configuration.`,
            });
        ids.add(id);
    };
    config.items.forEach((item, itemIndex) => {
        registerId(item.id, ["items", itemIndex, "id"], "Navigation item");
        if (keys.has(item.key))
            context.addIssue({
                code: zod_1.z.ZodIssueCode.custom,
                path: ["items", itemIndex, "key"],
                message: "Navigation item keys must be unique.",
            });
        keys.add(item.key);
        item.megaMenu?.rows.forEach((row, rowIndex) => {
            registerId(row.id, ["items", itemIndex, "megaMenu", "rows", rowIndex, "id"], "Row");
            row.columns.forEach((column, columnIndex) => {
                registerId(column.id, [
                    "items",
                    itemIndex,
                    "megaMenu",
                    "rows",
                    rowIndex,
                    "columns",
                    columnIndex,
                    "id",
                ], "Column");
                blocks += column.blocks.length;
                column.blocks.forEach((block, blockIndex) => {
                    const blockPath = [
                        "items",
                        itemIndex,
                        "megaMenu",
                        "rows",
                        rowIndex,
                        "columns",
                        columnIndex,
                        "blocks",
                        blockIndex,
                    ];
                    registerId(block.id, [...blockPath, "id"], "Block");
                    if (block.type === "CUSTOM_LINKS")
                        block.links.forEach((link, linkIndex) => registerId(link.id, [...blockPath, "links", linkIndex, "id"], "Custom link"));
                    if (block.type === "CATEGORY_COLUMNS")
                        block.columns.forEach((categoryColumn, categoryColumnIndex) => registerId(categoryColumn.id, [...blockPath, "columns", categoryColumnIndex, "id"], "Category column"));
                });
            });
        });
    });
    if (blocks > 60)
        context.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            path: ["items"],
            message: "A navigation configuration can contain at most 60 blocks.",
        });
});
/**
 * Navigation v2 is additive. Existing v1 publications are deterministically
 * upgraded at the contract boundary, preserving every item, row and block.
 */
function migrateNavigationConfig(value) {
    if (!value || typeof value !== "object" || Array.isArray(value))
        return value;
    const candidate = value;
    if (candidate.schemaVersion !== 1)
        return value;
    return { ...candidate, schemaVersion: exports.navigationSchemaVersion };
}
exports.navigationConfigSchema = zod_1.z.preprocess(migrateNavigationConfig, navigationConfigV2Schema);
exports.navigationDraftSaveSchema = zod_1.z.object({
    expectedRevision: zod_1.z.number().int().min(1),
    config: exports.navigationConfigSchema,
});
exports.navigationEntityTypeSchema = zod_1.z.enum([
    "CATEGORY",
    "BRAND",
    "PRODUCT",
    "TAG",
    "CONCERN",
    "BUNDLE",
    "MEDIA",
]);
exports.navigationEntityQuerySchema = zod_1.z.object({
    type: exports.navigationEntityTypeSchema,
    search: zod_1.z.string().trim().max(120).optional(),
    rootsOnly: zod_1.z.preprocess((value) => {
        if (value === undefined || value === "")
            return undefined;
        if (value === true || value === "true" || value === "1")
            return true;
        if (value === false || value === "false" || value === "0")
            return false;
        return value;
    }, zod_1.z.boolean().optional()),
    page: zod_1.z.coerce.number().int().min(1).default(1),
    limit: zod_1.z.coerce.number().int().min(1).max(50).default(20),
});
exports.NAVIGATION_LAYOUT_PRESETS = {
    TWO_EQUAL: [6, 6],
    THREE_EQUAL: [4, 4, 4],
    FOUR_EQUAL: [3, 3, 3, 3],
    FIVE_EQUAL: [2, 2, 2, 2, 4],
    TWO_THIRDS_ONE_THIRD: [8, 4],
    ONE_THIRD_TWO_THIRDS: [4, 8],
    QUARTER_HALF_QUARTER: [3, 6, 3],
    CONTENT_PROMO: [8, 4],
    CLASSIC_SIX: [2, 2, 2, 2, 1, 3],
};
const visibleEverywhere = {
    devices: ["DESKTOP", "TABLET", "MOBILE"],
    locales: ["en", "ar"],
    startsAt: null,
    endsAt: null,
};
exports.DEFAULT_NAVIGATION_CONFIG = exports.navigationConfigSchema.parse({
    schemaVersion: exports.navigationSchemaVersion,
    items: [
        {
            id: "10000000-0000-4000-8000-000000000001",
            key: "home",
            label: { en: "Home", ar: "الرئيسية" },
            destination: { type: "HOME" },
            enabled: true,
            locked: true,
            visibility: visibleEverywhere,
            megaMenu: null,
        },
        {
            id: "10000000-0000-4000-8000-000000000002",
            key: "brands",
            label: { en: "Brands", ar: "العلامات" },
            destination: { type: "CUSTOM_PATH", path: "/brands" },
            enabled: true,
            locked: true,
            visibility: visibleEverywhere,
            megaMenu: {
                enabled: true,
                width: "FULL",
                mobilePresentation: "STACK",
                rows: [
                    {
                        id: "20000000-0000-4000-8000-000000000001",
                        preset: "TWO_EQUAL",
                        enabled: true,
                        visibility: visibleEverywhere,
                        columns: [
                            {
                                id: "30000000-0000-4000-8000-000000000001",
                                span: 12,
                                blocks: [
                                    {
                                        id: "40000000-0000-4000-8000-000000000001",
                                        type: "BRAND_DIRECTORY",
                                        enabled: true,
                                        visibility: visibleEverywhere,
                                        mobileOrder: null,
                                        heading: { en: "Brands", ar: "العلامات التجارية" },
                                        searchPlaceholder: {
                                            en: "Search brands…",
                                            ar: "ابحثي عن علامة…",
                                        },
                                        viewAllLabel: {
                                            en: "View all brands",
                                            ar: "عرض كل العلامات",
                                        },
                                        maximumItems: 160,
                                        showSearch: true,
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        },
        {
            id: "10000000-0000-4000-8000-000000000003",
            key: "categories",
            label: { en: "Categories", ar: "الفئات" },
            destination: { type: "SHOP" },
            enabled: true,
            locked: true,
            visibility: visibleEverywhere,
            megaMenu: {
                enabled: true,
                width: "FULL",
                mobilePresentation: "ACCORDION",
                rows: [
                    {
                        id: "20000000-0000-4000-8000-000000000002",
                        preset: "TWO_EQUAL",
                        enabled: true,
                        visibility: visibleEverywhere,
                        columns: [
                            {
                                id: "30000000-0000-4000-8000-000000000002",
                                span: 12,
                                blocks: [
                                    {
                                        id: "40000000-0000-4000-8000-000000000002",
                                        type: "CATEGORY_EXPLORER",
                                        enabled: true,
                                        visibility: visibleEverywhere,
                                        mobileOrder: null,
                                        heading: { en: "All Categories", ar: "كل الفئات" },
                                        viewAllLabel: {
                                            en: "View all products",
                                            ar: "عرض كل المنتجات",
                                        },
                                        viewAllDestination: { type: "SHOP" },
                                        maximumParents: 8,
                                        maximumChildren: 8,
                                        showProductCounts: true,
                                        featuredBrandIds: [],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        },
        {
            id: "10000000-0000-4000-8000-000000000004",
            key: "new",
            label: { en: "New Arrivals", ar: "وصل حديثاً" },
            destination: { type: "NEW_ARRIVALS" },
            enabled: true,
            locked: false,
            visibility: visibleEverywhere,
            megaMenu: null,
        },
        {
            id: "10000000-0000-4000-8000-000000000005",
            key: "offers",
            label: { en: "Offers", ar: "العروض" },
            destination: { type: "OFFERS" },
            enabled: true,
            locked: false,
            visibility: visibleEverywhere,
            megaMenu: null,
        },
        {
            id: "10000000-0000-4000-8000-000000000006",
            key: "about",
            label: { en: "About", ar: "عن بيوريزا" },
            destination: { type: "ABOUT" },
            enabled: true,
            locked: false,
            visibility: visibleEverywhere,
            megaMenu: null,
        },
        {
            id: "10000000-0000-4000-8000-000000000007",
            key: "contact",
            label: { en: "Contact Us", ar: "تواصلي معنا" },
            destination: { type: "CONTACT" },
            enabled: true,
            locked: false,
            visibility: visibleEverywhere,
            megaMenu: null,
        },
    ],
});
//# sourceMappingURL=navigation.schema.js.map