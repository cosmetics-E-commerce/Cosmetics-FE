import { z } from "zod";
export declare const landingPageDestinationSchema: z.ZodUnion<[z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
    type: z.ZodLiteral<"HOME">;
}, "strip", z.ZodTypeAny, {
    type: "HOME";
}, {
    type: "HOME";
}>, z.ZodObject<{
    type: z.ZodLiteral<"SHOP">;
}, "strip", z.ZodTypeAny, {
    type: "SHOP";
}, {
    type: "SHOP";
}>, z.ZodObject<{
    type: z.ZodLiteral<"OFFERS">;
}, "strip", z.ZodTypeAny, {
    type: "OFFERS";
}, {
    type: "OFFERS";
}>, z.ZodObject<{
    type: z.ZodLiteral<"NEW_ARRIVALS">;
}, "strip", z.ZodTypeAny, {
    type: "NEW_ARRIVALS";
}, {
    type: "NEW_ARRIVALS";
}>, z.ZodObject<{
    type: z.ZodLiteral<"ABOUT">;
}, "strip", z.ZodTypeAny, {
    type: "ABOUT";
}, {
    type: "ABOUT";
}>, z.ZodObject<{
    type: z.ZodLiteral<"CONTACT">;
}, "strip", z.ZodTypeAny, {
    type: "CONTACT";
}, {
    type: "CONTACT";
}>, z.ZodObject<{
    type: z.ZodLiteral<"CATEGORY">;
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "CATEGORY";
    id: string;
}, {
    type: "CATEGORY";
    id: string;
}>, z.ZodObject<{
    type: z.ZodLiteral<"BRAND">;
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "BRAND";
    id: string;
}, {
    type: "BRAND";
    id: string;
}>, z.ZodObject<{
    type: z.ZodLiteral<"PRODUCT">;
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "PRODUCT";
    id: string;
}, {
    type: "PRODUCT";
    id: string;
}>, z.ZodObject<{
    type: z.ZodLiteral<"TAG">;
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "TAG";
    id: string;
}, {
    type: "TAG";
    id: string;
}>, z.ZodObject<{
    type: z.ZodLiteral<"CUSTOM_PATH">;
    path: z.ZodString;
}, "strip", z.ZodTypeAny, {
    path: string;
    type: "CUSTOM_PATH";
}, {
    path: string;
    type: "CUSTOM_PATH";
}>, z.ZodObject<{
    type: z.ZodLiteral<"EXTERNAL">;
    url: z.ZodEffects<z.ZodString, string, string>;
    newTab: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    type: "EXTERNAL";
    url: string;
    newTab: boolean;
}, {
    type: "EXTERNAL";
    url: string;
    newTab?: boolean | undefined;
}>]>, z.ZodObject<{
    type: z.ZodLiteral<"PAGE">;
    id: z.ZodString;
}, "strict", z.ZodTypeAny, {
    type: "PAGE";
    id: string;
}, {
    type: "PAGE";
    id: string;
}>]>;
export type LandingPageDestination = z.infer<typeof landingPageDestinationSchema>;
export declare const landingPageSchemaVersion: 1;
export declare const landingPageTypeSchema: z.ZodEnum<["HOMEPAGE", "CAMPAIGN", "BRAND", "CATEGORY", "OFFER", "SEASONAL", "COLLECTION", "CUSTOM"]>;
export type LandingPageType = z.infer<typeof landingPageTypeSchema>;
export declare const landingPageStatusSchema: z.ZodEnum<["DRAFT", "SCHEDULED", "PUBLISHED", "ARCHIVED"]>;
export type LandingPageStatus = z.infer<typeof landingPageStatusSchema>;
export declare const landingPageLocalizedTextSchema: z.ZodObject<{
    en: z.ZodDefault<z.ZodString>;
    ar: z.ZodDefault<z.ZodString>;
}, "strict", z.ZodTypeAny, {
    en: string;
    ar: string;
}, {
    en?: string | undefined;
    ar?: string | undefined;
}>;
export type LandingPageLocalizedText = z.infer<typeof landingPageLocalizedTextSchema>;
export declare const landingPageSurfaceSchema: z.ZodEnum<["DEFAULT", "SOFT", "DARK", "ACCENT"]>;
export declare const landingPageSpacingSchema: z.ZodEnum<["NONE", "SMALL", "MEDIUM", "LARGE"]>;
export declare const landingPageWidthSchema: z.ZodEnum<["CONTENT", "WIDE", "FULL"]>;
declare const productSourceSchema: z.ZodDiscriminatedUnion<"mode", [z.ZodObject<{
    mode: z.ZodLiteral<"MANUAL">;
    productIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
}, "strict", z.ZodTypeAny, {
    productIds: string[];
    mode: "MANUAL";
}, {
    mode: "MANUAL";
    productIds?: string[] | undefined;
}>, z.ZodObject<{
    mode: z.ZodLiteral<"CATEGORY">;
    referenceId: z.ZodString;
}, "strict", z.ZodTypeAny, {
    mode: "CATEGORY";
    referenceId: string;
}, {
    mode: "CATEGORY";
    referenceId: string;
}>, z.ZodObject<{
    mode: z.ZodLiteral<"BRAND">;
    referenceId: z.ZodString;
}, "strict", z.ZodTypeAny, {
    mode: "BRAND";
    referenceId: string;
}, {
    mode: "BRAND";
    referenceId: string;
}>, z.ZodObject<{
    mode: z.ZodLiteral<"TAG">;
    referenceId: z.ZodString;
}, "strict", z.ZodTypeAny, {
    mode: "TAG";
    referenceId: string;
}, {
    mode: "TAG";
    referenceId: string;
}>, z.ZodObject<{
    mode: z.ZodLiteral<"PROMOTION">;
    referenceId: z.ZodString;
}, "strict", z.ZodTypeAny, {
    mode: "PROMOTION";
    referenceId: string;
}, {
    mode: "PROMOTION";
    referenceId: string;
}>, z.ZodObject<{
    mode: z.ZodLiteral<"NEWEST">;
}, "strict", z.ZodTypeAny, {
    mode: "NEWEST";
}, {
    mode: "NEWEST";
}>, z.ZodObject<{
    mode: z.ZodLiteral<"FEATURED">;
}, "strict", z.ZodTypeAny, {
    mode: "FEATURED";
}, {
    mode: "FEATURED";
}>]>;
export type LandingPageProductSource = z.infer<typeof productSourceSchema>;
export declare const landingPageSectionSchema: z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
    type: z.ZodLiteral<"HERO">;
    desktopMediaId: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    mobileMediaId: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    imageAlt: z.ZodObject<{
        en: z.ZodDefault<z.ZodString>;
        ar: z.ZodDefault<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        en: string;
        ar: string;
    }, {
        en?: string | undefined;
        ar?: string | undefined;
    }>;
    eyebrow: z.ZodObject<{} & {
        en: z.ZodDefault<z.ZodString>;
        ar: z.ZodDefault<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        en: string;
        ar: string;
    }, {
        en?: string | undefined;
        ar?: string | undefined;
    }>;
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
    description: z.ZodObject<{} & {
        en: z.ZodDefault<z.ZodString>;
        ar: z.ZodDefault<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        en: string;
        ar: string;
    }, {
        en?: string | undefined;
        ar?: string | undefined;
    }>;
    primaryCtaLabel: z.ZodObject<{} & {
        en: z.ZodDefault<z.ZodString>;
        ar: z.ZodDefault<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        en: string;
        ar: string;
    }, {
        en?: string | undefined;
        ar?: string | undefined;
    }>;
    primaryDestination: z.ZodDefault<z.ZodNullable<z.ZodUnion<[z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
        type: z.ZodLiteral<"HOME">;
    }, "strip", z.ZodTypeAny, {
        type: "HOME";
    }, {
        type: "HOME";
    }>, z.ZodObject<{
        type: z.ZodLiteral<"SHOP">;
    }, "strip", z.ZodTypeAny, {
        type: "SHOP";
    }, {
        type: "SHOP";
    }>, z.ZodObject<{
        type: z.ZodLiteral<"OFFERS">;
    }, "strip", z.ZodTypeAny, {
        type: "OFFERS";
    }, {
        type: "OFFERS";
    }>, z.ZodObject<{
        type: z.ZodLiteral<"NEW_ARRIVALS">;
    }, "strip", z.ZodTypeAny, {
        type: "NEW_ARRIVALS";
    }, {
        type: "NEW_ARRIVALS";
    }>, z.ZodObject<{
        type: z.ZodLiteral<"ABOUT">;
    }, "strip", z.ZodTypeAny, {
        type: "ABOUT";
    }, {
        type: "ABOUT";
    }>, z.ZodObject<{
        type: z.ZodLiteral<"CONTACT">;
    }, "strip", z.ZodTypeAny, {
        type: "CONTACT";
    }, {
        type: "CONTACT";
    }>, z.ZodObject<{
        type: z.ZodLiteral<"CATEGORY">;
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "CATEGORY";
        id: string;
    }, {
        type: "CATEGORY";
        id: string;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"BRAND">;
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "BRAND";
        id: string;
    }, {
        type: "BRAND";
        id: string;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"PRODUCT">;
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "PRODUCT";
        id: string;
    }, {
        type: "PRODUCT";
        id: string;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"TAG">;
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "TAG";
        id: string;
    }, {
        type: "TAG";
        id: string;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"CUSTOM_PATH">;
        path: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        path: string;
        type: "CUSTOM_PATH";
    }, {
        path: string;
        type: "CUSTOM_PATH";
    }>, z.ZodObject<{
        type: z.ZodLiteral<"EXTERNAL">;
        url: z.ZodEffects<z.ZodString, string, string>;
        newTab: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        type: "EXTERNAL";
        url: string;
        newTab: boolean;
    }, {
        type: "EXTERNAL";
        url: string;
        newTab?: boolean | undefined;
    }>]>, z.ZodObject<{
        type: z.ZodLiteral<"PAGE">;
        id: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        type: "PAGE";
        id: string;
    }, {
        type: "PAGE";
        id: string;
    }>]>>>;
    secondaryCtaLabel: z.ZodObject<{} & {
        en: z.ZodDefault<z.ZodString>;
        ar: z.ZodDefault<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        en: string;
        ar: string;
    }, {
        en?: string | undefined;
        ar?: string | undefined;
    }>;
    secondaryDestination: z.ZodDefault<z.ZodNullable<z.ZodUnion<[z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
        type: z.ZodLiteral<"HOME">;
    }, "strip", z.ZodTypeAny, {
        type: "HOME";
    }, {
        type: "HOME";
    }>, z.ZodObject<{
        type: z.ZodLiteral<"SHOP">;
    }, "strip", z.ZodTypeAny, {
        type: "SHOP";
    }, {
        type: "SHOP";
    }>, z.ZodObject<{
        type: z.ZodLiteral<"OFFERS">;
    }, "strip", z.ZodTypeAny, {
        type: "OFFERS";
    }, {
        type: "OFFERS";
    }>, z.ZodObject<{
        type: z.ZodLiteral<"NEW_ARRIVALS">;
    }, "strip", z.ZodTypeAny, {
        type: "NEW_ARRIVALS";
    }, {
        type: "NEW_ARRIVALS";
    }>, z.ZodObject<{
        type: z.ZodLiteral<"ABOUT">;
    }, "strip", z.ZodTypeAny, {
        type: "ABOUT";
    }, {
        type: "ABOUT";
    }>, z.ZodObject<{
        type: z.ZodLiteral<"CONTACT">;
    }, "strip", z.ZodTypeAny, {
        type: "CONTACT";
    }, {
        type: "CONTACT";
    }>, z.ZodObject<{
        type: z.ZodLiteral<"CATEGORY">;
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "CATEGORY";
        id: string;
    }, {
        type: "CATEGORY";
        id: string;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"BRAND">;
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "BRAND";
        id: string;
    }, {
        type: "BRAND";
        id: string;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"PRODUCT">;
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "PRODUCT";
        id: string;
    }, {
        type: "PRODUCT";
        id: string;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"TAG">;
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "TAG";
        id: string;
    }, {
        type: "TAG";
        id: string;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"CUSTOM_PATH">;
        path: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        path: string;
        type: "CUSTOM_PATH";
    }, {
        path: string;
        type: "CUSTOM_PATH";
    }>, z.ZodObject<{
        type: z.ZodLiteral<"EXTERNAL">;
        url: z.ZodEffects<z.ZodString, string, string>;
        newTab: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        type: "EXTERNAL";
        url: string;
        newTab: boolean;
    }, {
        type: "EXTERNAL";
        url: string;
        newTab?: boolean | undefined;
    }>]>, z.ZodObject<{
        type: z.ZodLiteral<"PAGE">;
        id: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        type: "PAGE";
        id: string;
    }, {
        type: "PAGE";
        id: string;
    }>]>>>;
    layout: z.ZodDefault<z.ZodEnum<["FULL", "SPLIT", "CONTAINED"]>>;
    alignment: z.ZodDefault<z.ZodEnum<["START", "CENTER", "END"]>>;
    contentPosition: z.ZodDefault<z.ZodEnum<["TOP", "CENTER", "BOTTOM"]>>;
    overlay: z.ZodDefault<z.ZodEnum<["NONE", "LIGHT", "MEDIUM", "STRONG"]>>;
    headingLevel: z.ZodDefault<z.ZodEnum<["H1", "H2"]>>;
    id: z.ZodString;
    analyticsKey: z.ZodString;
    label: z.ZodString;
    enabled: z.ZodDefault<z.ZodBoolean>;
    visibility: z.ZodEffects<z.ZodObject<{
        devices: z.ZodDefault<z.ZodArray<z.ZodEnum<["DESKTOP", "TABLET", "MOBILE"]>, "many">>;
        locales: z.ZodDefault<z.ZodArray<z.ZodEnum<["en", "ar"]>, "many">>;
        startsAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        endsAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        startsAt: string | null;
        endsAt: string | null;
        devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
        locales: ("en" | "ar")[];
    }, {
        startsAt?: string | null | undefined;
        endsAt?: string | null | undefined;
        devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
        locales?: ("en" | "ar")[] | undefined;
    }>, {
        startsAt: string | null;
        endsAt: string | null;
        devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
        locales: ("en" | "ar")[];
    }, {
        startsAt?: string | null | undefined;
        endsAt?: string | null | undefined;
        devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
        locales?: ("en" | "ar")[] | undefined;
    }>;
    surface: z.ZodDefault<z.ZodEnum<["DEFAULT", "SOFT", "DARK", "ACCENT"]>>;
    spacing: z.ZodDefault<z.ZodEnum<["NONE", "SMALL", "MEDIUM", "LARGE"]>>;
    width: z.ZodDefault<z.ZodEnum<["CONTENT", "WIDE", "FULL"]>>;
}, "strict", z.ZodTypeAny, {
    type: "HERO";
    id: string;
    description: {
        en: string;
        ar: string;
    };
    label: string;
    width: "CONTENT" | "WIDE" | "FULL";
    enabled: boolean;
    heading: {
        en: string;
        ar: string;
    };
    eyebrow: {
        en: string;
        ar: string;
    };
    imageAlt: {
        en: string;
        ar: string;
    };
    visibility: {
        startsAt: string | null;
        endsAt: string | null;
        devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
        locales: ("en" | "ar")[];
    };
    alignment: "START" | "CENTER" | "END";
    desktopMediaId: string | null;
    mobileMediaId: string | null;
    primaryCtaLabel: {
        en: string;
        ar: string;
    };
    primaryDestination: {
        type: "HOME";
    } | {
        type: "SHOP";
    } | {
        type: "OFFERS";
    } | {
        type: "NEW_ARRIVALS";
    } | {
        type: "ABOUT";
    } | {
        type: "CONTACT";
    } | {
        type: "CATEGORY";
        id: string;
    } | {
        type: "BRAND";
        id: string;
    } | {
        type: "PRODUCT";
        id: string;
    } | {
        type: "TAG";
        id: string;
    } | {
        path: string;
        type: "CUSTOM_PATH";
    } | {
        type: "EXTERNAL";
        url: string;
        newTab: boolean;
    } | {
        type: "PAGE";
        id: string;
    } | null;
    secondaryCtaLabel: {
        en: string;
        ar: string;
    };
    secondaryDestination: {
        type: "HOME";
    } | {
        type: "SHOP";
    } | {
        type: "OFFERS";
    } | {
        type: "NEW_ARRIVALS";
    } | {
        type: "ABOUT";
    } | {
        type: "CONTACT";
    } | {
        type: "CATEGORY";
        id: string;
    } | {
        type: "BRAND";
        id: string;
    } | {
        type: "PRODUCT";
        id: string;
    } | {
        type: "TAG";
        id: string;
    } | {
        path: string;
        type: "CUSTOM_PATH";
    } | {
        type: "EXTERNAL";
        url: string;
        newTab: boolean;
    } | {
        type: "PAGE";
        id: string;
    } | null;
    layout: "SPLIT" | "FULL" | "CONTAINED";
    contentPosition: "CENTER" | "TOP" | "BOTTOM";
    overlay: "NONE" | "MEDIUM" | "LIGHT" | "STRONG";
    headingLevel: "H1" | "H2";
    analyticsKey: string;
    surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
    spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
}, {
    type: "HERO";
    id: string;
    description: {
        en?: string | undefined;
        ar?: string | undefined;
    };
    label: string;
    heading: {
        en?: string | undefined;
        ar?: string | undefined;
    };
    eyebrow: {
        en?: string | undefined;
        ar?: string | undefined;
    };
    imageAlt: {
        en?: string | undefined;
        ar?: string | undefined;
    };
    visibility: {
        startsAt?: string | null | undefined;
        endsAt?: string | null | undefined;
        devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
        locales?: ("en" | "ar")[] | undefined;
    };
    primaryCtaLabel: {
        en?: string | undefined;
        ar?: string | undefined;
    };
    secondaryCtaLabel: {
        en?: string | undefined;
        ar?: string | undefined;
    };
    analyticsKey: string;
    width?: "CONTENT" | "WIDE" | "FULL" | undefined;
    enabled?: boolean | undefined;
    alignment?: "START" | "CENTER" | "END" | undefined;
    desktopMediaId?: string | null | undefined;
    mobileMediaId?: string | null | undefined;
    primaryDestination?: {
        type: "HOME";
    } | {
        type: "SHOP";
    } | {
        type: "OFFERS";
    } | {
        type: "NEW_ARRIVALS";
    } | {
        type: "ABOUT";
    } | {
        type: "CONTACT";
    } | {
        type: "CATEGORY";
        id: string;
    } | {
        type: "BRAND";
        id: string;
    } | {
        type: "PRODUCT";
        id: string;
    } | {
        type: "TAG";
        id: string;
    } | {
        path: string;
        type: "CUSTOM_PATH";
    } | {
        type: "EXTERNAL";
        url: string;
        newTab?: boolean | undefined;
    } | {
        type: "PAGE";
        id: string;
    } | null | undefined;
    secondaryDestination?: {
        type: "HOME";
    } | {
        type: "SHOP";
    } | {
        type: "OFFERS";
    } | {
        type: "NEW_ARRIVALS";
    } | {
        type: "ABOUT";
    } | {
        type: "CONTACT";
    } | {
        type: "CATEGORY";
        id: string;
    } | {
        type: "BRAND";
        id: string;
    } | {
        type: "PRODUCT";
        id: string;
    } | {
        type: "TAG";
        id: string;
    } | {
        path: string;
        type: "CUSTOM_PATH";
    } | {
        type: "EXTERNAL";
        url: string;
        newTab?: boolean | undefined;
    } | {
        type: "PAGE";
        id: string;
    } | null | undefined;
    layout?: "SPLIT" | "FULL" | "CONTAINED" | undefined;
    contentPosition?: "CENTER" | "TOP" | "BOTTOM" | undefined;
    overlay?: "NONE" | "MEDIUM" | "LIGHT" | "STRONG" | undefined;
    headingLevel?: "H1" | "H2" | undefined;
    surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
    spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
}>, z.ZodObject<{
    type: z.ZodLiteral<"PRODUCT_GRID">;
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
    description: z.ZodObject<{} & {
        en: z.ZodDefault<z.ZodString>;
        ar: z.ZodDefault<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        en: string;
        ar: string;
    }, {
        en?: string | undefined;
        ar?: string | undefined;
    }>;
    source: z.ZodDiscriminatedUnion<"mode", [z.ZodObject<{
        mode: z.ZodLiteral<"MANUAL">;
        productIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strict", z.ZodTypeAny, {
        productIds: string[];
        mode: "MANUAL";
    }, {
        mode: "MANUAL";
        productIds?: string[] | undefined;
    }>, z.ZodObject<{
        mode: z.ZodLiteral<"CATEGORY">;
        referenceId: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        mode: "CATEGORY";
        referenceId: string;
    }, {
        mode: "CATEGORY";
        referenceId: string;
    }>, z.ZodObject<{
        mode: z.ZodLiteral<"BRAND">;
        referenceId: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        mode: "BRAND";
        referenceId: string;
    }, {
        mode: "BRAND";
        referenceId: string;
    }>, z.ZodObject<{
        mode: z.ZodLiteral<"TAG">;
        referenceId: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        mode: "TAG";
        referenceId: string;
    }, {
        mode: "TAG";
        referenceId: string;
    }>, z.ZodObject<{
        mode: z.ZodLiteral<"PROMOTION">;
        referenceId: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        mode: "PROMOTION";
        referenceId: string;
    }, {
        mode: "PROMOTION";
        referenceId: string;
    }>, z.ZodObject<{
        mode: z.ZodLiteral<"NEWEST">;
    }, "strict", z.ZodTypeAny, {
        mode: "NEWEST";
    }, {
        mode: "NEWEST";
    }>, z.ZodObject<{
        mode: z.ZodLiteral<"FEATURED">;
    }, "strict", z.ZodTypeAny, {
        mode: "FEATURED";
    }, {
        mode: "FEATURED";
    }>]>;
    limit: z.ZodDefault<z.ZodNumber>;
    columns: z.ZodObject<{
        desktop: z.ZodDefault<z.ZodNumber>;
        tablet: z.ZodDefault<z.ZodNumber>;
        mobile: z.ZodDefault<z.ZodNumber>;
    }, "strict", z.ZodTypeAny, {
        desktop: number;
        tablet: number;
        mobile: number;
    }, {
        desktop?: number | undefined;
        tablet?: number | undefined;
        mobile?: number | undefined;
    }>;
    showViewAll: z.ZodDefault<z.ZodBoolean>;
    viewAllLabel: z.ZodObject<{} & {
        en: z.ZodDefault<z.ZodString>;
        ar: z.ZodDefault<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        en: string;
        ar: string;
    }, {
        en?: string | undefined;
        ar?: string | undefined;
    }>;
    destination: z.ZodDefault<z.ZodNullable<z.ZodUnion<[z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
        type: z.ZodLiteral<"HOME">;
    }, "strip", z.ZodTypeAny, {
        type: "HOME";
    }, {
        type: "HOME";
    }>, z.ZodObject<{
        type: z.ZodLiteral<"SHOP">;
    }, "strip", z.ZodTypeAny, {
        type: "SHOP";
    }, {
        type: "SHOP";
    }>, z.ZodObject<{
        type: z.ZodLiteral<"OFFERS">;
    }, "strip", z.ZodTypeAny, {
        type: "OFFERS";
    }, {
        type: "OFFERS";
    }>, z.ZodObject<{
        type: z.ZodLiteral<"NEW_ARRIVALS">;
    }, "strip", z.ZodTypeAny, {
        type: "NEW_ARRIVALS";
    }, {
        type: "NEW_ARRIVALS";
    }>, z.ZodObject<{
        type: z.ZodLiteral<"ABOUT">;
    }, "strip", z.ZodTypeAny, {
        type: "ABOUT";
    }, {
        type: "ABOUT";
    }>, z.ZodObject<{
        type: z.ZodLiteral<"CONTACT">;
    }, "strip", z.ZodTypeAny, {
        type: "CONTACT";
    }, {
        type: "CONTACT";
    }>, z.ZodObject<{
        type: z.ZodLiteral<"CATEGORY">;
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "CATEGORY";
        id: string;
    }, {
        type: "CATEGORY";
        id: string;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"BRAND">;
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "BRAND";
        id: string;
    }, {
        type: "BRAND";
        id: string;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"PRODUCT">;
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "PRODUCT";
        id: string;
    }, {
        type: "PRODUCT";
        id: string;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"TAG">;
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "TAG";
        id: string;
    }, {
        type: "TAG";
        id: string;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"CUSTOM_PATH">;
        path: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        path: string;
        type: "CUSTOM_PATH";
    }, {
        path: string;
        type: "CUSTOM_PATH";
    }>, z.ZodObject<{
        type: z.ZodLiteral<"EXTERNAL">;
        url: z.ZodEffects<z.ZodString, string, string>;
        newTab: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        type: "EXTERNAL";
        url: string;
        newTab: boolean;
    }, {
        type: "EXTERNAL";
        url: string;
        newTab?: boolean | undefined;
    }>]>, z.ZodObject<{
        type: z.ZodLiteral<"PAGE">;
        id: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        type: "PAGE";
        id: string;
    }, {
        type: "PAGE";
        id: string;
    }>]>>>;
    style: z.ZodDefault<z.ZodEnum<["CLEAN", "EDITORIAL", "COMPACT"]>>;
    id: z.ZodString;
    analyticsKey: z.ZodString;
    label: z.ZodString;
    enabled: z.ZodDefault<z.ZodBoolean>;
    visibility: z.ZodEffects<z.ZodObject<{
        devices: z.ZodDefault<z.ZodArray<z.ZodEnum<["DESKTOP", "TABLET", "MOBILE"]>, "many">>;
        locales: z.ZodDefault<z.ZodArray<z.ZodEnum<["en", "ar"]>, "many">>;
        startsAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        endsAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        startsAt: string | null;
        endsAt: string | null;
        devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
        locales: ("en" | "ar")[];
    }, {
        startsAt?: string | null | undefined;
        endsAt?: string | null | undefined;
        devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
        locales?: ("en" | "ar")[] | undefined;
    }>, {
        startsAt: string | null;
        endsAt: string | null;
        devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
        locales: ("en" | "ar")[];
    }, {
        startsAt?: string | null | undefined;
        endsAt?: string | null | undefined;
        devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
        locales?: ("en" | "ar")[] | undefined;
    }>;
    surface: z.ZodDefault<z.ZodEnum<["DEFAULT", "SOFT", "DARK", "ACCENT"]>>;
    spacing: z.ZodDefault<z.ZodEnum<["NONE", "SMALL", "MEDIUM", "LARGE"]>>;
    width: z.ZodDefault<z.ZodEnum<["CONTENT", "WIDE", "FULL"]>>;
}, "strict", z.ZodTypeAny, {
    type: "PRODUCT_GRID";
    limit: number;
    id: string;
    description: {
        en: string;
        ar: string;
    };
    label: string;
    width: "CONTENT" | "WIDE" | "FULL";
    source: {
        productIds: string[];
        mode: "MANUAL";
    } | {
        mode: "CATEGORY";
        referenceId: string;
    } | {
        mode: "BRAND";
        referenceId: string;
    } | {
        mode: "TAG";
        referenceId: string;
    } | {
        mode: "PROMOTION";
        referenceId: string;
    } | {
        mode: "NEWEST";
    } | {
        mode: "FEATURED";
    };
    enabled: boolean;
    heading: {
        en: string;
        ar: string;
    };
    viewAllLabel: {
        en: string;
        ar: string;
    };
    destination: {
        type: "HOME";
    } | {
        type: "SHOP";
    } | {
        type: "OFFERS";
    } | {
        type: "NEW_ARRIVALS";
    } | {
        type: "ABOUT";
    } | {
        type: "CONTACT";
    } | {
        type: "CATEGORY";
        id: string;
    } | {
        type: "BRAND";
        id: string;
    } | {
        type: "PRODUCT";
        id: string;
    } | {
        type: "TAG";
        id: string;
    } | {
        path: string;
        type: "CUSTOM_PATH";
    } | {
        type: "EXTERNAL";
        url: string;
        newTab: boolean;
    } | {
        type: "PAGE";
        id: string;
    } | null;
    style: "COMPACT" | "CLEAN" | "EDITORIAL";
    visibility: {
        startsAt: string | null;
        endsAt: string | null;
        devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
        locales: ("en" | "ar")[];
    };
    showViewAll: boolean;
    columns: {
        desktop: number;
        tablet: number;
        mobile: number;
    };
    analyticsKey: string;
    surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
    spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
}, {
    type: "PRODUCT_GRID";
    id: string;
    description: {
        en?: string | undefined;
        ar?: string | undefined;
    };
    label: string;
    source: {
        mode: "MANUAL";
        productIds?: string[] | undefined;
    } | {
        mode: "CATEGORY";
        referenceId: string;
    } | {
        mode: "BRAND";
        referenceId: string;
    } | {
        mode: "TAG";
        referenceId: string;
    } | {
        mode: "PROMOTION";
        referenceId: string;
    } | {
        mode: "NEWEST";
    } | {
        mode: "FEATURED";
    };
    heading: {
        en?: string | undefined;
        ar?: string | undefined;
    };
    viewAllLabel: {
        en?: string | undefined;
        ar?: string | undefined;
    };
    visibility: {
        startsAt?: string | null | undefined;
        endsAt?: string | null | undefined;
        devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
        locales?: ("en" | "ar")[] | undefined;
    };
    columns: {
        desktop?: number | undefined;
        tablet?: number | undefined;
        mobile?: number | undefined;
    };
    analyticsKey: string;
    limit?: number | undefined;
    width?: "CONTENT" | "WIDE" | "FULL" | undefined;
    enabled?: boolean | undefined;
    destination?: {
        type: "HOME";
    } | {
        type: "SHOP";
    } | {
        type: "OFFERS";
    } | {
        type: "NEW_ARRIVALS";
    } | {
        type: "ABOUT";
    } | {
        type: "CONTACT";
    } | {
        type: "CATEGORY";
        id: string;
    } | {
        type: "BRAND";
        id: string;
    } | {
        type: "PRODUCT";
        id: string;
    } | {
        type: "TAG";
        id: string;
    } | {
        path: string;
        type: "CUSTOM_PATH";
    } | {
        type: "EXTERNAL";
        url: string;
        newTab?: boolean | undefined;
    } | {
        type: "PAGE";
        id: string;
    } | null | undefined;
    style?: "COMPACT" | "CLEAN" | "EDITORIAL" | undefined;
    showViewAll?: boolean | undefined;
    surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
    spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
}>, z.ZodObject<{
    type: z.ZodLiteral<"PRODUCT_CAROUSEL">;
    autoplay: z.ZodDefault<z.ZodBoolean>;
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
    description: z.ZodObject<{} & {
        en: z.ZodDefault<z.ZodString>;
        ar: z.ZodDefault<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        en: string;
        ar: string;
    }, {
        en?: string | undefined;
        ar?: string | undefined;
    }>;
    source: z.ZodDiscriminatedUnion<"mode", [z.ZodObject<{
        mode: z.ZodLiteral<"MANUAL">;
        productIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strict", z.ZodTypeAny, {
        productIds: string[];
        mode: "MANUAL";
    }, {
        mode: "MANUAL";
        productIds?: string[] | undefined;
    }>, z.ZodObject<{
        mode: z.ZodLiteral<"CATEGORY">;
        referenceId: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        mode: "CATEGORY";
        referenceId: string;
    }, {
        mode: "CATEGORY";
        referenceId: string;
    }>, z.ZodObject<{
        mode: z.ZodLiteral<"BRAND">;
        referenceId: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        mode: "BRAND";
        referenceId: string;
    }, {
        mode: "BRAND";
        referenceId: string;
    }>, z.ZodObject<{
        mode: z.ZodLiteral<"TAG">;
        referenceId: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        mode: "TAG";
        referenceId: string;
    }, {
        mode: "TAG";
        referenceId: string;
    }>, z.ZodObject<{
        mode: z.ZodLiteral<"PROMOTION">;
        referenceId: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        mode: "PROMOTION";
        referenceId: string;
    }, {
        mode: "PROMOTION";
        referenceId: string;
    }>, z.ZodObject<{
        mode: z.ZodLiteral<"NEWEST">;
    }, "strict", z.ZodTypeAny, {
        mode: "NEWEST";
    }, {
        mode: "NEWEST";
    }>, z.ZodObject<{
        mode: z.ZodLiteral<"FEATURED">;
    }, "strict", z.ZodTypeAny, {
        mode: "FEATURED";
    }, {
        mode: "FEATURED";
    }>]>;
    limit: z.ZodDefault<z.ZodNumber>;
    columns: z.ZodObject<{
        desktop: z.ZodDefault<z.ZodNumber>;
        tablet: z.ZodDefault<z.ZodNumber>;
        mobile: z.ZodDefault<z.ZodNumber>;
    }, "strict", z.ZodTypeAny, {
        desktop: number;
        tablet: number;
        mobile: number;
    }, {
        desktop?: number | undefined;
        tablet?: number | undefined;
        mobile?: number | undefined;
    }>;
    showViewAll: z.ZodDefault<z.ZodBoolean>;
    viewAllLabel: z.ZodObject<{} & {
        en: z.ZodDefault<z.ZodString>;
        ar: z.ZodDefault<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        en: string;
        ar: string;
    }, {
        en?: string | undefined;
        ar?: string | undefined;
    }>;
    destination: z.ZodDefault<z.ZodNullable<z.ZodUnion<[z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
        type: z.ZodLiteral<"HOME">;
    }, "strip", z.ZodTypeAny, {
        type: "HOME";
    }, {
        type: "HOME";
    }>, z.ZodObject<{
        type: z.ZodLiteral<"SHOP">;
    }, "strip", z.ZodTypeAny, {
        type: "SHOP";
    }, {
        type: "SHOP";
    }>, z.ZodObject<{
        type: z.ZodLiteral<"OFFERS">;
    }, "strip", z.ZodTypeAny, {
        type: "OFFERS";
    }, {
        type: "OFFERS";
    }>, z.ZodObject<{
        type: z.ZodLiteral<"NEW_ARRIVALS">;
    }, "strip", z.ZodTypeAny, {
        type: "NEW_ARRIVALS";
    }, {
        type: "NEW_ARRIVALS";
    }>, z.ZodObject<{
        type: z.ZodLiteral<"ABOUT">;
    }, "strip", z.ZodTypeAny, {
        type: "ABOUT";
    }, {
        type: "ABOUT";
    }>, z.ZodObject<{
        type: z.ZodLiteral<"CONTACT">;
    }, "strip", z.ZodTypeAny, {
        type: "CONTACT";
    }, {
        type: "CONTACT";
    }>, z.ZodObject<{
        type: z.ZodLiteral<"CATEGORY">;
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "CATEGORY";
        id: string;
    }, {
        type: "CATEGORY";
        id: string;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"BRAND">;
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "BRAND";
        id: string;
    }, {
        type: "BRAND";
        id: string;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"PRODUCT">;
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "PRODUCT";
        id: string;
    }, {
        type: "PRODUCT";
        id: string;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"TAG">;
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "TAG";
        id: string;
    }, {
        type: "TAG";
        id: string;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"CUSTOM_PATH">;
        path: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        path: string;
        type: "CUSTOM_PATH";
    }, {
        path: string;
        type: "CUSTOM_PATH";
    }>, z.ZodObject<{
        type: z.ZodLiteral<"EXTERNAL">;
        url: z.ZodEffects<z.ZodString, string, string>;
        newTab: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        type: "EXTERNAL";
        url: string;
        newTab: boolean;
    }, {
        type: "EXTERNAL";
        url: string;
        newTab?: boolean | undefined;
    }>]>, z.ZodObject<{
        type: z.ZodLiteral<"PAGE">;
        id: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        type: "PAGE";
        id: string;
    }, {
        type: "PAGE";
        id: string;
    }>]>>>;
    style: z.ZodDefault<z.ZodEnum<["CLEAN", "EDITORIAL", "COMPACT"]>>;
    id: z.ZodString;
    analyticsKey: z.ZodString;
    label: z.ZodString;
    enabled: z.ZodDefault<z.ZodBoolean>;
    visibility: z.ZodEffects<z.ZodObject<{
        devices: z.ZodDefault<z.ZodArray<z.ZodEnum<["DESKTOP", "TABLET", "MOBILE"]>, "many">>;
        locales: z.ZodDefault<z.ZodArray<z.ZodEnum<["en", "ar"]>, "many">>;
        startsAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        endsAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        startsAt: string | null;
        endsAt: string | null;
        devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
        locales: ("en" | "ar")[];
    }, {
        startsAt?: string | null | undefined;
        endsAt?: string | null | undefined;
        devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
        locales?: ("en" | "ar")[] | undefined;
    }>, {
        startsAt: string | null;
        endsAt: string | null;
        devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
        locales: ("en" | "ar")[];
    }, {
        startsAt?: string | null | undefined;
        endsAt?: string | null | undefined;
        devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
        locales?: ("en" | "ar")[] | undefined;
    }>;
    surface: z.ZodDefault<z.ZodEnum<["DEFAULT", "SOFT", "DARK", "ACCENT"]>>;
    spacing: z.ZodDefault<z.ZodEnum<["NONE", "SMALL", "MEDIUM", "LARGE"]>>;
    width: z.ZodDefault<z.ZodEnum<["CONTENT", "WIDE", "FULL"]>>;
}, "strict", z.ZodTypeAny, {
    type: "PRODUCT_CAROUSEL";
    limit: number;
    id: string;
    description: {
        en: string;
        ar: string;
    };
    label: string;
    width: "CONTENT" | "WIDE" | "FULL";
    source: {
        productIds: string[];
        mode: "MANUAL";
    } | {
        mode: "CATEGORY";
        referenceId: string;
    } | {
        mode: "BRAND";
        referenceId: string;
    } | {
        mode: "TAG";
        referenceId: string;
    } | {
        mode: "PROMOTION";
        referenceId: string;
    } | {
        mode: "NEWEST";
    } | {
        mode: "FEATURED";
    };
    enabled: boolean;
    heading: {
        en: string;
        ar: string;
    };
    viewAllLabel: {
        en: string;
        ar: string;
    };
    destination: {
        type: "HOME";
    } | {
        type: "SHOP";
    } | {
        type: "OFFERS";
    } | {
        type: "NEW_ARRIVALS";
    } | {
        type: "ABOUT";
    } | {
        type: "CONTACT";
    } | {
        type: "CATEGORY";
        id: string;
    } | {
        type: "BRAND";
        id: string;
    } | {
        type: "PRODUCT";
        id: string;
    } | {
        type: "TAG";
        id: string;
    } | {
        path: string;
        type: "CUSTOM_PATH";
    } | {
        type: "EXTERNAL";
        url: string;
        newTab: boolean;
    } | {
        type: "PAGE";
        id: string;
    } | null;
    style: "COMPACT" | "CLEAN" | "EDITORIAL";
    visibility: {
        startsAt: string | null;
        endsAt: string | null;
        devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
        locales: ("en" | "ar")[];
    };
    showViewAll: boolean;
    columns: {
        desktop: number;
        tablet: number;
        mobile: number;
    };
    analyticsKey: string;
    surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
    spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
    autoplay: boolean;
}, {
    type: "PRODUCT_CAROUSEL";
    id: string;
    description: {
        en?: string | undefined;
        ar?: string | undefined;
    };
    label: string;
    source: {
        mode: "MANUAL";
        productIds?: string[] | undefined;
    } | {
        mode: "CATEGORY";
        referenceId: string;
    } | {
        mode: "BRAND";
        referenceId: string;
    } | {
        mode: "TAG";
        referenceId: string;
    } | {
        mode: "PROMOTION";
        referenceId: string;
    } | {
        mode: "NEWEST";
    } | {
        mode: "FEATURED";
    };
    heading: {
        en?: string | undefined;
        ar?: string | undefined;
    };
    viewAllLabel: {
        en?: string | undefined;
        ar?: string | undefined;
    };
    visibility: {
        startsAt?: string | null | undefined;
        endsAt?: string | null | undefined;
        devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
        locales?: ("en" | "ar")[] | undefined;
    };
    columns: {
        desktop?: number | undefined;
        tablet?: number | undefined;
        mobile?: number | undefined;
    };
    analyticsKey: string;
    limit?: number | undefined;
    width?: "CONTENT" | "WIDE" | "FULL" | undefined;
    enabled?: boolean | undefined;
    destination?: {
        type: "HOME";
    } | {
        type: "SHOP";
    } | {
        type: "OFFERS";
    } | {
        type: "NEW_ARRIVALS";
    } | {
        type: "ABOUT";
    } | {
        type: "CONTACT";
    } | {
        type: "CATEGORY";
        id: string;
    } | {
        type: "BRAND";
        id: string;
    } | {
        type: "PRODUCT";
        id: string;
    } | {
        type: "TAG";
        id: string;
    } | {
        path: string;
        type: "CUSTOM_PATH";
    } | {
        type: "EXTERNAL";
        url: string;
        newTab?: boolean | undefined;
    } | {
        type: "PAGE";
        id: string;
    } | null | undefined;
    style?: "COMPACT" | "CLEAN" | "EDITORIAL" | undefined;
    showViewAll?: boolean | undefined;
    surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
    spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
    autoplay?: boolean | undefined;
}>, z.ZodObject<{
    type: z.ZodLiteral<"CATEGORIES">;
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
    description: z.ZodObject<{} & {
        en: z.ZodDefault<z.ZodString>;
        ar: z.ZodDefault<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        en: string;
        ar: string;
    }, {
        en?: string | undefined;
        ar?: string | undefined;
    }>;
    categoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    showChildren: z.ZodDefault<z.ZodBoolean>;
    showGrandchildren: z.ZodDefault<z.ZodBoolean>;
    limit: z.ZodDefault<z.ZodNumber>;
    layout: z.ZodDefault<z.ZodEnum<["CARDS", "IMAGE_TILES", "COMPACT", "EDITORIAL"]>>;
    id: z.ZodString;
    analyticsKey: z.ZodString;
    label: z.ZodString;
    enabled: z.ZodDefault<z.ZodBoolean>;
    visibility: z.ZodEffects<z.ZodObject<{
        devices: z.ZodDefault<z.ZodArray<z.ZodEnum<["DESKTOP", "TABLET", "MOBILE"]>, "many">>;
        locales: z.ZodDefault<z.ZodArray<z.ZodEnum<["en", "ar"]>, "many">>;
        startsAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        endsAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        startsAt: string | null;
        endsAt: string | null;
        devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
        locales: ("en" | "ar")[];
    }, {
        startsAt?: string | null | undefined;
        endsAt?: string | null | undefined;
        devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
        locales?: ("en" | "ar")[] | undefined;
    }>, {
        startsAt: string | null;
        endsAt: string | null;
        devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
        locales: ("en" | "ar")[];
    }, {
        startsAt?: string | null | undefined;
        endsAt?: string | null | undefined;
        devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
        locales?: ("en" | "ar")[] | undefined;
    }>;
    surface: z.ZodDefault<z.ZodEnum<["DEFAULT", "SOFT", "DARK", "ACCENT"]>>;
    spacing: z.ZodDefault<z.ZodEnum<["NONE", "SMALL", "MEDIUM", "LARGE"]>>;
    width: z.ZodDefault<z.ZodEnum<["CONTENT", "WIDE", "FULL"]>>;
}, "strict", z.ZodTypeAny, {
    type: "CATEGORIES";
    limit: number;
    id: string;
    description: {
        en: string;
        ar: string;
    };
    label: string;
    width: "CONTENT" | "WIDE" | "FULL";
    enabled: boolean;
    categoryIds: string[];
    heading: {
        en: string;
        ar: string;
    };
    visibility: {
        startsAt: string | null;
        endsAt: string | null;
        devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
        locales: ("en" | "ar")[];
    };
    layout: "COMPACT" | "CARDS" | "EDITORIAL" | "IMAGE_TILES";
    analyticsKey: string;
    surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
    spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
    showChildren: boolean;
    showGrandchildren: boolean;
}, {
    type: "CATEGORIES";
    id: string;
    description: {
        en?: string | undefined;
        ar?: string | undefined;
    };
    label: string;
    heading: {
        en?: string | undefined;
        ar?: string | undefined;
    };
    visibility: {
        startsAt?: string | null | undefined;
        endsAt?: string | null | undefined;
        devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
        locales?: ("en" | "ar")[] | undefined;
    };
    analyticsKey: string;
    limit?: number | undefined;
    width?: "CONTENT" | "WIDE" | "FULL" | undefined;
    enabled?: boolean | undefined;
    categoryIds?: string[] | undefined;
    layout?: "COMPACT" | "CARDS" | "EDITORIAL" | "IMAGE_TILES" | undefined;
    surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
    spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
    showChildren?: boolean | undefined;
    showGrandchildren?: boolean | undefined;
}>, z.ZodObject<{
    type: z.ZodLiteral<"BRANDS">;
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
    description: z.ZodObject<{} & {
        en: z.ZodDefault<z.ZodString>;
        ar: z.ZodDefault<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        en: string;
        ar: string;
    }, {
        en?: string | undefined;
        ar?: string | undefined;
    }>;
    mode: z.ZodDefault<z.ZodEnum<["MANUAL", "FEATURED"]>>;
    brandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    limit: z.ZodDefault<z.ZodNumber>;
    layout: z.ZodDefault<z.ZodEnum<["LOGO_RAIL", "LOGO_GRID", "EDITORIAL"]>>;
    id: z.ZodString;
    analyticsKey: z.ZodString;
    label: z.ZodString;
    enabled: z.ZodDefault<z.ZodBoolean>;
    visibility: z.ZodEffects<z.ZodObject<{
        devices: z.ZodDefault<z.ZodArray<z.ZodEnum<["DESKTOP", "TABLET", "MOBILE"]>, "many">>;
        locales: z.ZodDefault<z.ZodArray<z.ZodEnum<["en", "ar"]>, "many">>;
        startsAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        endsAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        startsAt: string | null;
        endsAt: string | null;
        devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
        locales: ("en" | "ar")[];
    }, {
        startsAt?: string | null | undefined;
        endsAt?: string | null | undefined;
        devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
        locales?: ("en" | "ar")[] | undefined;
    }>, {
        startsAt: string | null;
        endsAt: string | null;
        devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
        locales: ("en" | "ar")[];
    }, {
        startsAt?: string | null | undefined;
        endsAt?: string | null | undefined;
        devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
        locales?: ("en" | "ar")[] | undefined;
    }>;
    surface: z.ZodDefault<z.ZodEnum<["DEFAULT", "SOFT", "DARK", "ACCENT"]>>;
    spacing: z.ZodDefault<z.ZodEnum<["NONE", "SMALL", "MEDIUM", "LARGE"]>>;
    width: z.ZodDefault<z.ZodEnum<["CONTENT", "WIDE", "FULL"]>>;
}, "strict", z.ZodTypeAny, {
    type: "BRANDS";
    limit: number;
    id: string;
    description: {
        en: string;
        ar: string;
    };
    label: string;
    width: "CONTENT" | "WIDE" | "FULL";
    enabled: boolean;
    brandIds: string[];
    heading: {
        en: string;
        ar: string;
    };
    visibility: {
        startsAt: string | null;
        endsAt: string | null;
        devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
        locales: ("en" | "ar")[];
    };
    mode: "MANUAL" | "FEATURED";
    layout: "LOGO_GRID" | "EDITORIAL" | "LOGO_RAIL";
    analyticsKey: string;
    surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
    spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
}, {
    type: "BRANDS";
    id: string;
    description: {
        en?: string | undefined;
        ar?: string | undefined;
    };
    label: string;
    heading: {
        en?: string | undefined;
        ar?: string | undefined;
    };
    visibility: {
        startsAt?: string | null | undefined;
        endsAt?: string | null | undefined;
        devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
        locales?: ("en" | "ar")[] | undefined;
    };
    analyticsKey: string;
    limit?: number | undefined;
    width?: "CONTENT" | "WIDE" | "FULL" | undefined;
    enabled?: boolean | undefined;
    brandIds?: string[] | undefined;
    mode?: "MANUAL" | "FEATURED" | undefined;
    layout?: "LOGO_GRID" | "EDITORIAL" | "LOGO_RAIL" | undefined;
    surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
    spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
}>, z.ZodObject<{
    type: z.ZodLiteral<"PROMOTION">;
    promotionId: z.ZodString;
    eyebrow: z.ZodObject<{} & {
        en: z.ZodDefault<z.ZodString>;
        ar: z.ZodDefault<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        en: string;
        ar: string;
    }, {
        en?: string | undefined;
        ar?: string | undefined;
    }>;
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
    description: z.ZodObject<{} & {
        en: z.ZodDefault<z.ZodString>;
        ar: z.ZodDefault<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        en: string;
        ar: string;
    }, {
        en?: string | undefined;
        ar?: string | undefined;
    }>;
    mediaAssetId: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    imageAlt: z.ZodObject<{
        en: z.ZodDefault<z.ZodString>;
        ar: z.ZodDefault<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        en: string;
        ar: string;
    }, {
        en?: string | undefined;
        ar?: string | undefined;
    }>;
    ctaLabel: z.ZodObject<{} & {
        en: z.ZodDefault<z.ZodString>;
        ar: z.ZodDefault<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        en: string;
        ar: string;
    }, {
        en?: string | undefined;
        ar?: string | undefined;
    }>;
    destination: z.ZodDefault<z.ZodNullable<z.ZodUnion<[z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
        type: z.ZodLiteral<"HOME">;
    }, "strip", z.ZodTypeAny, {
        type: "HOME";
    }, {
        type: "HOME";
    }>, z.ZodObject<{
        type: z.ZodLiteral<"SHOP">;
    }, "strip", z.ZodTypeAny, {
        type: "SHOP";
    }, {
        type: "SHOP";
    }>, z.ZodObject<{
        type: z.ZodLiteral<"OFFERS">;
    }, "strip", z.ZodTypeAny, {
        type: "OFFERS";
    }, {
        type: "OFFERS";
    }>, z.ZodObject<{
        type: z.ZodLiteral<"NEW_ARRIVALS">;
    }, "strip", z.ZodTypeAny, {
        type: "NEW_ARRIVALS";
    }, {
        type: "NEW_ARRIVALS";
    }>, z.ZodObject<{
        type: z.ZodLiteral<"ABOUT">;
    }, "strip", z.ZodTypeAny, {
        type: "ABOUT";
    }, {
        type: "ABOUT";
    }>, z.ZodObject<{
        type: z.ZodLiteral<"CONTACT">;
    }, "strip", z.ZodTypeAny, {
        type: "CONTACT";
    }, {
        type: "CONTACT";
    }>, z.ZodObject<{
        type: z.ZodLiteral<"CATEGORY">;
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "CATEGORY";
        id: string;
    }, {
        type: "CATEGORY";
        id: string;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"BRAND">;
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "BRAND";
        id: string;
    }, {
        type: "BRAND";
        id: string;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"PRODUCT">;
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "PRODUCT";
        id: string;
    }, {
        type: "PRODUCT";
        id: string;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"TAG">;
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "TAG";
        id: string;
    }, {
        type: "TAG";
        id: string;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"CUSTOM_PATH">;
        path: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        path: string;
        type: "CUSTOM_PATH";
    }, {
        path: string;
        type: "CUSTOM_PATH";
    }>, z.ZodObject<{
        type: z.ZodLiteral<"EXTERNAL">;
        url: z.ZodEffects<z.ZodString, string, string>;
        newTab: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        type: "EXTERNAL";
        url: string;
        newTab: boolean;
    }, {
        type: "EXTERNAL";
        url: string;
        newTab?: boolean | undefined;
    }>]>, z.ZodObject<{
        type: z.ZodLiteral<"PAGE">;
        id: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        type: "PAGE";
        id: string;
    }, {
        type: "PAGE";
        id: string;
    }>]>>>;
    expiredBehavior: z.ZodDefault<z.ZodEnum<["HIDE", "SHOW_EXPIRED"]>>;
    style: z.ZodDefault<z.ZodEnum<["BANNER", "EDITORIAL", "DARK"]>>;
    id: z.ZodString;
    analyticsKey: z.ZodString;
    label: z.ZodString;
    enabled: z.ZodDefault<z.ZodBoolean>;
    visibility: z.ZodEffects<z.ZodObject<{
        devices: z.ZodDefault<z.ZodArray<z.ZodEnum<["DESKTOP", "TABLET", "MOBILE"]>, "many">>;
        locales: z.ZodDefault<z.ZodArray<z.ZodEnum<["en", "ar"]>, "many">>;
        startsAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        endsAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        startsAt: string | null;
        endsAt: string | null;
        devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
        locales: ("en" | "ar")[];
    }, {
        startsAt?: string | null | undefined;
        endsAt?: string | null | undefined;
        devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
        locales?: ("en" | "ar")[] | undefined;
    }>, {
        startsAt: string | null;
        endsAt: string | null;
        devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
        locales: ("en" | "ar")[];
    }, {
        startsAt?: string | null | undefined;
        endsAt?: string | null | undefined;
        devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
        locales?: ("en" | "ar")[] | undefined;
    }>;
    surface: z.ZodDefault<z.ZodEnum<["DEFAULT", "SOFT", "DARK", "ACCENT"]>>;
    spacing: z.ZodDefault<z.ZodEnum<["NONE", "SMALL", "MEDIUM", "LARGE"]>>;
    width: z.ZodDefault<z.ZodEnum<["CONTENT", "WIDE", "FULL"]>>;
}, "strict", z.ZodTypeAny, {
    type: "PROMOTION";
    id: string;
    description: {
        en: string;
        ar: string;
    };
    label: string;
    width: "CONTENT" | "WIDE" | "FULL";
    promotionId: string;
    enabled: boolean;
    heading: {
        en: string;
        ar: string;
    };
    eyebrow: {
        en: string;
        ar: string;
    };
    ctaLabel: {
        en: string;
        ar: string;
    };
    destination: {
        type: "HOME";
    } | {
        type: "SHOP";
    } | {
        type: "OFFERS";
    } | {
        type: "NEW_ARRIVALS";
    } | {
        type: "ABOUT";
    } | {
        type: "CONTACT";
    } | {
        type: "CATEGORY";
        id: string;
    } | {
        type: "BRAND";
        id: string;
    } | {
        type: "PRODUCT";
        id: string;
    } | {
        type: "TAG";
        id: string;
    } | {
        path: string;
        type: "CUSTOM_PATH";
    } | {
        type: "EXTERNAL";
        url: string;
        newTab: boolean;
    } | {
        type: "PAGE";
        id: string;
    } | null;
    mediaAssetId: string | null;
    imageAlt: {
        en: string;
        ar: string;
    };
    style: "DARK" | "EDITORIAL" | "BANNER";
    visibility: {
        startsAt: string | null;
        endsAt: string | null;
        devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
        locales: ("en" | "ar")[];
    };
    analyticsKey: string;
    surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
    spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
    expiredBehavior: "HIDE" | "SHOW_EXPIRED";
}, {
    type: "PROMOTION";
    id: string;
    description: {
        en?: string | undefined;
        ar?: string | undefined;
    };
    label: string;
    promotionId: string;
    heading: {
        en?: string | undefined;
        ar?: string | undefined;
    };
    eyebrow: {
        en?: string | undefined;
        ar?: string | undefined;
    };
    ctaLabel: {
        en?: string | undefined;
        ar?: string | undefined;
    };
    imageAlt: {
        en?: string | undefined;
        ar?: string | undefined;
    };
    visibility: {
        startsAt?: string | null | undefined;
        endsAt?: string | null | undefined;
        devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
        locales?: ("en" | "ar")[] | undefined;
    };
    analyticsKey: string;
    width?: "CONTENT" | "WIDE" | "FULL" | undefined;
    enabled?: boolean | undefined;
    destination?: {
        type: "HOME";
    } | {
        type: "SHOP";
    } | {
        type: "OFFERS";
    } | {
        type: "NEW_ARRIVALS";
    } | {
        type: "ABOUT";
    } | {
        type: "CONTACT";
    } | {
        type: "CATEGORY";
        id: string;
    } | {
        type: "BRAND";
        id: string;
    } | {
        type: "PRODUCT";
        id: string;
    } | {
        type: "TAG";
        id: string;
    } | {
        path: string;
        type: "CUSTOM_PATH";
    } | {
        type: "EXTERNAL";
        url: string;
        newTab?: boolean | undefined;
    } | {
        type: "PAGE";
        id: string;
    } | null | undefined;
    mediaAssetId?: string | null | undefined;
    style?: "DARK" | "EDITORIAL" | "BANNER" | undefined;
    surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
    spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
    expiredBehavior?: "HIDE" | "SHOW_EXPIRED" | undefined;
}>, z.ZodObject<{
    type: z.ZodLiteral<"ROUTINE_CTA">;
    eyebrow: z.ZodObject<{} & {
        en: z.ZodDefault<z.ZodString>;
        ar: z.ZodDefault<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        en: string;
        ar: string;
    }, {
        en?: string | undefined;
        ar?: string | undefined;
    }>;
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
    description: z.ZodObject<{} & {
        en: z.ZodDefault<z.ZodString>;
        ar: z.ZodDefault<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        en: string;
        ar: string;
    }, {
        en?: string | undefined;
        ar?: string | undefined;
    }>;
    mediaAssetId: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    imageAlt: z.ZodObject<{
        en: z.ZodDefault<z.ZodString>;
        ar: z.ZodDefault<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        en: string;
        ar: string;
    }, {
        en?: string | undefined;
        ar?: string | undefined;
    }>;
    ctaLabel: z.ZodObject<{} & {
        en: z.ZodDefault<z.ZodString>;
        ar: z.ZodDefault<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        en: string;
        ar: string;
    }, {
        en?: string | undefined;
        ar?: string | undefined;
    }>;
    destination: z.ZodDefault<z.ZodUnion<[z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
        type: z.ZodLiteral<"HOME">;
    }, "strip", z.ZodTypeAny, {
        type: "HOME";
    }, {
        type: "HOME";
    }>, z.ZodObject<{
        type: z.ZodLiteral<"SHOP">;
    }, "strip", z.ZodTypeAny, {
        type: "SHOP";
    }, {
        type: "SHOP";
    }>, z.ZodObject<{
        type: z.ZodLiteral<"OFFERS">;
    }, "strip", z.ZodTypeAny, {
        type: "OFFERS";
    }, {
        type: "OFFERS";
    }>, z.ZodObject<{
        type: z.ZodLiteral<"NEW_ARRIVALS">;
    }, "strip", z.ZodTypeAny, {
        type: "NEW_ARRIVALS";
    }, {
        type: "NEW_ARRIVALS";
    }>, z.ZodObject<{
        type: z.ZodLiteral<"ABOUT">;
    }, "strip", z.ZodTypeAny, {
        type: "ABOUT";
    }, {
        type: "ABOUT";
    }>, z.ZodObject<{
        type: z.ZodLiteral<"CONTACT">;
    }, "strip", z.ZodTypeAny, {
        type: "CONTACT";
    }, {
        type: "CONTACT";
    }>, z.ZodObject<{
        type: z.ZodLiteral<"CATEGORY">;
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "CATEGORY";
        id: string;
    }, {
        type: "CATEGORY";
        id: string;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"BRAND">;
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "BRAND";
        id: string;
    }, {
        type: "BRAND";
        id: string;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"PRODUCT">;
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "PRODUCT";
        id: string;
    }, {
        type: "PRODUCT";
        id: string;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"TAG">;
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "TAG";
        id: string;
    }, {
        type: "TAG";
        id: string;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"CUSTOM_PATH">;
        path: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        path: string;
        type: "CUSTOM_PATH";
    }, {
        path: string;
        type: "CUSTOM_PATH";
    }>, z.ZodObject<{
        type: z.ZodLiteral<"EXTERNAL">;
        url: z.ZodEffects<z.ZodString, string, string>;
        newTab: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        type: "EXTERNAL";
        url: string;
        newTab: boolean;
    }, {
        type: "EXTERNAL";
        url: string;
        newTab?: boolean | undefined;
    }>]>, z.ZodObject<{
        type: z.ZodLiteral<"PAGE">;
        id: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        type: "PAGE";
        id: string;
    }, {
        type: "PAGE";
        id: string;
    }>]>>;
    style: z.ZodDefault<z.ZodEnum<["EDITORIAL", "COMPACT", "DARK"]>>;
    id: z.ZodString;
    analyticsKey: z.ZodString;
    label: z.ZodString;
    enabled: z.ZodDefault<z.ZodBoolean>;
    visibility: z.ZodEffects<z.ZodObject<{
        devices: z.ZodDefault<z.ZodArray<z.ZodEnum<["DESKTOP", "TABLET", "MOBILE"]>, "many">>;
        locales: z.ZodDefault<z.ZodArray<z.ZodEnum<["en", "ar"]>, "many">>;
        startsAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        endsAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        startsAt: string | null;
        endsAt: string | null;
        devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
        locales: ("en" | "ar")[];
    }, {
        startsAt?: string | null | undefined;
        endsAt?: string | null | undefined;
        devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
        locales?: ("en" | "ar")[] | undefined;
    }>, {
        startsAt: string | null;
        endsAt: string | null;
        devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
        locales: ("en" | "ar")[];
    }, {
        startsAt?: string | null | undefined;
        endsAt?: string | null | undefined;
        devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
        locales?: ("en" | "ar")[] | undefined;
    }>;
    surface: z.ZodDefault<z.ZodEnum<["DEFAULT", "SOFT", "DARK", "ACCENT"]>>;
    spacing: z.ZodDefault<z.ZodEnum<["NONE", "SMALL", "MEDIUM", "LARGE"]>>;
    width: z.ZodDefault<z.ZodEnum<["CONTENT", "WIDE", "FULL"]>>;
}, "strict", z.ZodTypeAny, {
    type: "ROUTINE_CTA";
    id: string;
    description: {
        en: string;
        ar: string;
    };
    label: string;
    width: "CONTENT" | "WIDE" | "FULL";
    enabled: boolean;
    heading: {
        en: string;
        ar: string;
    };
    eyebrow: {
        en: string;
        ar: string;
    };
    ctaLabel: {
        en: string;
        ar: string;
    };
    destination: {
        type: "HOME";
    } | {
        type: "SHOP";
    } | {
        type: "OFFERS";
    } | {
        type: "NEW_ARRIVALS";
    } | {
        type: "ABOUT";
    } | {
        type: "CONTACT";
    } | {
        type: "CATEGORY";
        id: string;
    } | {
        type: "BRAND";
        id: string;
    } | {
        type: "PRODUCT";
        id: string;
    } | {
        type: "TAG";
        id: string;
    } | {
        path: string;
        type: "CUSTOM_PATH";
    } | {
        type: "EXTERNAL";
        url: string;
        newTab: boolean;
    } | {
        type: "PAGE";
        id: string;
    };
    mediaAssetId: string | null;
    imageAlt: {
        en: string;
        ar: string;
    };
    style: "COMPACT" | "DARK" | "EDITORIAL";
    visibility: {
        startsAt: string | null;
        endsAt: string | null;
        devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
        locales: ("en" | "ar")[];
    };
    analyticsKey: string;
    surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
    spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
}, {
    type: "ROUTINE_CTA";
    id: string;
    description: {
        en?: string | undefined;
        ar?: string | undefined;
    };
    label: string;
    heading: {
        en?: string | undefined;
        ar?: string | undefined;
    };
    eyebrow: {
        en?: string | undefined;
        ar?: string | undefined;
    };
    ctaLabel: {
        en?: string | undefined;
        ar?: string | undefined;
    };
    imageAlt: {
        en?: string | undefined;
        ar?: string | undefined;
    };
    visibility: {
        startsAt?: string | null | undefined;
        endsAt?: string | null | undefined;
        devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
        locales?: ("en" | "ar")[] | undefined;
    };
    analyticsKey: string;
    width?: "CONTENT" | "WIDE" | "FULL" | undefined;
    enabled?: boolean | undefined;
    destination?: {
        type: "HOME";
    } | {
        type: "SHOP";
    } | {
        type: "OFFERS";
    } | {
        type: "NEW_ARRIVALS";
    } | {
        type: "ABOUT";
    } | {
        type: "CONTACT";
    } | {
        type: "CATEGORY";
        id: string;
    } | {
        type: "BRAND";
        id: string;
    } | {
        type: "PRODUCT";
        id: string;
    } | {
        type: "TAG";
        id: string;
    } | {
        path: string;
        type: "CUSTOM_PATH";
    } | {
        type: "EXTERNAL";
        url: string;
        newTab?: boolean | undefined;
    } | {
        type: "PAGE";
        id: string;
    } | undefined;
    mediaAssetId?: string | null | undefined;
    style?: "COMPACT" | "DARK" | "EDITORIAL" | undefined;
    surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
    spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
}>, z.ZodObject<{
    type: z.ZodLiteral<"IMAGE_TEXT">;
    mediaAssetId: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    imageAlt: z.ZodObject<{
        en: z.ZodDefault<z.ZodString>;
        ar: z.ZodDefault<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        en: string;
        ar: string;
    }, {
        en?: string | undefined;
        ar?: string | undefined;
    }>;
    eyebrow: z.ZodObject<{} & {
        en: z.ZodDefault<z.ZodString>;
        ar: z.ZodDefault<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        en: string;
        ar: string;
    }, {
        en?: string | undefined;
        ar?: string | undefined;
    }>;
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
    body: z.ZodObject<{} & {
        en: z.ZodDefault<z.ZodString>;
        ar: z.ZodDefault<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        en: string;
        ar: string;
    }, {
        en?: string | undefined;
        ar?: string | undefined;
    }>;
    ctaLabel: z.ZodObject<{} & {
        en: z.ZodDefault<z.ZodString>;
        ar: z.ZodDefault<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        en: string;
        ar: string;
    }, {
        en?: string | undefined;
        ar?: string | undefined;
    }>;
    destination: z.ZodDefault<z.ZodNullable<z.ZodUnion<[z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
        type: z.ZodLiteral<"HOME">;
    }, "strip", z.ZodTypeAny, {
        type: "HOME";
    }, {
        type: "HOME";
    }>, z.ZodObject<{
        type: z.ZodLiteral<"SHOP">;
    }, "strip", z.ZodTypeAny, {
        type: "SHOP";
    }, {
        type: "SHOP";
    }>, z.ZodObject<{
        type: z.ZodLiteral<"OFFERS">;
    }, "strip", z.ZodTypeAny, {
        type: "OFFERS";
    }, {
        type: "OFFERS";
    }>, z.ZodObject<{
        type: z.ZodLiteral<"NEW_ARRIVALS">;
    }, "strip", z.ZodTypeAny, {
        type: "NEW_ARRIVALS";
    }, {
        type: "NEW_ARRIVALS";
    }>, z.ZodObject<{
        type: z.ZodLiteral<"ABOUT">;
    }, "strip", z.ZodTypeAny, {
        type: "ABOUT";
    }, {
        type: "ABOUT";
    }>, z.ZodObject<{
        type: z.ZodLiteral<"CONTACT">;
    }, "strip", z.ZodTypeAny, {
        type: "CONTACT";
    }, {
        type: "CONTACT";
    }>, z.ZodObject<{
        type: z.ZodLiteral<"CATEGORY">;
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "CATEGORY";
        id: string;
    }, {
        type: "CATEGORY";
        id: string;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"BRAND">;
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "BRAND";
        id: string;
    }, {
        type: "BRAND";
        id: string;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"PRODUCT">;
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "PRODUCT";
        id: string;
    }, {
        type: "PRODUCT";
        id: string;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"TAG">;
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "TAG";
        id: string;
    }, {
        type: "TAG";
        id: string;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"CUSTOM_PATH">;
        path: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        path: string;
        type: "CUSTOM_PATH";
    }, {
        path: string;
        type: "CUSTOM_PATH";
    }>, z.ZodObject<{
        type: z.ZodLiteral<"EXTERNAL">;
        url: z.ZodEffects<z.ZodString, string, string>;
        newTab: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        type: "EXTERNAL";
        url: string;
        newTab: boolean;
    }, {
        type: "EXTERNAL";
        url: string;
        newTab?: boolean | undefined;
    }>]>, z.ZodObject<{
        type: z.ZodLiteral<"PAGE">;
        id: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        type: "PAGE";
        id: string;
    }, {
        type: "PAGE";
        id: string;
    }>]>>>;
    imageSide: z.ZodDefault<z.ZodEnum<["START", "END"]>>;
    style: z.ZodDefault<z.ZodEnum<["EDITORIAL", "CONTAINED", "FULL_BLEED"]>>;
    id: z.ZodString;
    analyticsKey: z.ZodString;
    label: z.ZodString;
    enabled: z.ZodDefault<z.ZodBoolean>;
    visibility: z.ZodEffects<z.ZodObject<{
        devices: z.ZodDefault<z.ZodArray<z.ZodEnum<["DESKTOP", "TABLET", "MOBILE"]>, "many">>;
        locales: z.ZodDefault<z.ZodArray<z.ZodEnum<["en", "ar"]>, "many">>;
        startsAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        endsAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        startsAt: string | null;
        endsAt: string | null;
        devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
        locales: ("en" | "ar")[];
    }, {
        startsAt?: string | null | undefined;
        endsAt?: string | null | undefined;
        devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
        locales?: ("en" | "ar")[] | undefined;
    }>, {
        startsAt: string | null;
        endsAt: string | null;
        devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
        locales: ("en" | "ar")[];
    }, {
        startsAt?: string | null | undefined;
        endsAt?: string | null | undefined;
        devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
        locales?: ("en" | "ar")[] | undefined;
    }>;
    surface: z.ZodDefault<z.ZodEnum<["DEFAULT", "SOFT", "DARK", "ACCENT"]>>;
    spacing: z.ZodDefault<z.ZodEnum<["NONE", "SMALL", "MEDIUM", "LARGE"]>>;
    width: z.ZodDefault<z.ZodEnum<["CONTENT", "WIDE", "FULL"]>>;
}, "strict", z.ZodTypeAny, {
    type: "IMAGE_TEXT";
    id: string;
    label: string;
    width: "CONTENT" | "WIDE" | "FULL";
    enabled: boolean;
    heading: {
        en: string;
        ar: string;
    };
    eyebrow: {
        en: string;
        ar: string;
    };
    ctaLabel: {
        en: string;
        ar: string;
    };
    destination: {
        type: "HOME";
    } | {
        type: "SHOP";
    } | {
        type: "OFFERS";
    } | {
        type: "NEW_ARRIVALS";
    } | {
        type: "ABOUT";
    } | {
        type: "CONTACT";
    } | {
        type: "CATEGORY";
        id: string;
    } | {
        type: "BRAND";
        id: string;
    } | {
        type: "PRODUCT";
        id: string;
    } | {
        type: "TAG";
        id: string;
    } | {
        path: string;
        type: "CUSTOM_PATH";
    } | {
        type: "EXTERNAL";
        url: string;
        newTab: boolean;
    } | {
        type: "PAGE";
        id: string;
    } | null;
    mediaAssetId: string | null;
    imageAlt: {
        en: string;
        ar: string;
    };
    style: "EDITORIAL" | "CONTAINED" | "FULL_BLEED";
    visibility: {
        startsAt: string | null;
        endsAt: string | null;
        devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
        locales: ("en" | "ar")[];
    };
    analyticsKey: string;
    surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
    spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
    body: {
        en: string;
        ar: string;
    };
    imageSide: "START" | "END";
}, {
    type: "IMAGE_TEXT";
    id: string;
    label: string;
    heading: {
        en?: string | undefined;
        ar?: string | undefined;
    };
    eyebrow: {
        en?: string | undefined;
        ar?: string | undefined;
    };
    ctaLabel: {
        en?: string | undefined;
        ar?: string | undefined;
    };
    imageAlt: {
        en?: string | undefined;
        ar?: string | undefined;
    };
    visibility: {
        startsAt?: string | null | undefined;
        endsAt?: string | null | undefined;
        devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
        locales?: ("en" | "ar")[] | undefined;
    };
    analyticsKey: string;
    body: {
        en?: string | undefined;
        ar?: string | undefined;
    };
    width?: "CONTENT" | "WIDE" | "FULL" | undefined;
    enabled?: boolean | undefined;
    destination?: {
        type: "HOME";
    } | {
        type: "SHOP";
    } | {
        type: "OFFERS";
    } | {
        type: "NEW_ARRIVALS";
    } | {
        type: "ABOUT";
    } | {
        type: "CONTACT";
    } | {
        type: "CATEGORY";
        id: string;
    } | {
        type: "BRAND";
        id: string;
    } | {
        type: "PRODUCT";
        id: string;
    } | {
        type: "TAG";
        id: string;
    } | {
        path: string;
        type: "CUSTOM_PATH";
    } | {
        type: "EXTERNAL";
        url: string;
        newTab?: boolean | undefined;
    } | {
        type: "PAGE";
        id: string;
    } | null | undefined;
    mediaAssetId?: string | null | undefined;
    style?: "EDITORIAL" | "CONTAINED" | "FULL_BLEED" | undefined;
    surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
    spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
    imageSide?: "START" | "END" | undefined;
}>, z.ZodObject<{
    type: z.ZodLiteral<"PROMO_BANNER">;
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
    description: z.ZodObject<{} & {
        en: z.ZodDefault<z.ZodString>;
        ar: z.ZodDefault<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        en: string;
        ar: string;
    }, {
        en?: string | undefined;
        ar?: string | undefined;
    }>;
    mediaAssetId: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    imageAlt: z.ZodObject<{
        en: z.ZodDefault<z.ZodString>;
        ar: z.ZodDefault<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        en: string;
        ar: string;
    }, {
        en?: string | undefined;
        ar?: string | undefined;
    }>;
    ctaLabel: z.ZodObject<{} & {
        en: z.ZodDefault<z.ZodString>;
        ar: z.ZodDefault<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        en: string;
        ar: string;
    }, {
        en?: string | undefined;
        ar?: string | undefined;
    }>;
    destination: z.ZodDefault<z.ZodNullable<z.ZodUnion<[z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
        type: z.ZodLiteral<"HOME">;
    }, "strip", z.ZodTypeAny, {
        type: "HOME";
    }, {
        type: "HOME";
    }>, z.ZodObject<{
        type: z.ZodLiteral<"SHOP">;
    }, "strip", z.ZodTypeAny, {
        type: "SHOP";
    }, {
        type: "SHOP";
    }>, z.ZodObject<{
        type: z.ZodLiteral<"OFFERS">;
    }, "strip", z.ZodTypeAny, {
        type: "OFFERS";
    }, {
        type: "OFFERS";
    }>, z.ZodObject<{
        type: z.ZodLiteral<"NEW_ARRIVALS">;
    }, "strip", z.ZodTypeAny, {
        type: "NEW_ARRIVALS";
    }, {
        type: "NEW_ARRIVALS";
    }>, z.ZodObject<{
        type: z.ZodLiteral<"ABOUT">;
    }, "strip", z.ZodTypeAny, {
        type: "ABOUT";
    }, {
        type: "ABOUT";
    }>, z.ZodObject<{
        type: z.ZodLiteral<"CONTACT">;
    }, "strip", z.ZodTypeAny, {
        type: "CONTACT";
    }, {
        type: "CONTACT";
    }>, z.ZodObject<{
        type: z.ZodLiteral<"CATEGORY">;
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "CATEGORY";
        id: string;
    }, {
        type: "CATEGORY";
        id: string;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"BRAND">;
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "BRAND";
        id: string;
    }, {
        type: "BRAND";
        id: string;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"PRODUCT">;
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "PRODUCT";
        id: string;
    }, {
        type: "PRODUCT";
        id: string;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"TAG">;
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "TAG";
        id: string;
    }, {
        type: "TAG";
        id: string;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"CUSTOM_PATH">;
        path: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        path: string;
        type: "CUSTOM_PATH";
    }, {
        path: string;
        type: "CUSTOM_PATH";
    }>, z.ZodObject<{
        type: z.ZodLiteral<"EXTERNAL">;
        url: z.ZodEffects<z.ZodString, string, string>;
        newTab: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        type: "EXTERNAL";
        url: string;
        newTab: boolean;
    }, {
        type: "EXTERNAL";
        url: string;
        newTab?: boolean | undefined;
    }>]>, z.ZodObject<{
        type: z.ZodLiteral<"PAGE">;
        id: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        type: "PAGE";
        id: string;
    }, {
        type: "PAGE";
        id: string;
    }>]>>>;
    style: z.ZodDefault<z.ZodEnum<["SOFT", "DARK", "ACCENT", "IMAGE"]>>;
    id: z.ZodString;
    analyticsKey: z.ZodString;
    label: z.ZodString;
    enabled: z.ZodDefault<z.ZodBoolean>;
    visibility: z.ZodEffects<z.ZodObject<{
        devices: z.ZodDefault<z.ZodArray<z.ZodEnum<["DESKTOP", "TABLET", "MOBILE"]>, "many">>;
        locales: z.ZodDefault<z.ZodArray<z.ZodEnum<["en", "ar"]>, "many">>;
        startsAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        endsAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        startsAt: string | null;
        endsAt: string | null;
        devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
        locales: ("en" | "ar")[];
    }, {
        startsAt?: string | null | undefined;
        endsAt?: string | null | undefined;
        devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
        locales?: ("en" | "ar")[] | undefined;
    }>, {
        startsAt: string | null;
        endsAt: string | null;
        devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
        locales: ("en" | "ar")[];
    }, {
        startsAt?: string | null | undefined;
        endsAt?: string | null | undefined;
        devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
        locales?: ("en" | "ar")[] | undefined;
    }>;
    surface: z.ZodDefault<z.ZodEnum<["DEFAULT", "SOFT", "DARK", "ACCENT"]>>;
    spacing: z.ZodDefault<z.ZodEnum<["NONE", "SMALL", "MEDIUM", "LARGE"]>>;
    width: z.ZodDefault<z.ZodEnum<["CONTENT", "WIDE", "FULL"]>>;
}, "strict", z.ZodTypeAny, {
    type: "PROMO_BANNER";
    id: string;
    description: {
        en: string;
        ar: string;
    };
    label: string;
    width: "CONTENT" | "WIDE" | "FULL";
    enabled: boolean;
    heading: {
        en: string;
        ar: string;
    };
    ctaLabel: {
        en: string;
        ar: string;
    };
    destination: {
        type: "HOME";
    } | {
        type: "SHOP";
    } | {
        type: "OFFERS";
    } | {
        type: "NEW_ARRIVALS";
    } | {
        type: "ABOUT";
    } | {
        type: "CONTACT";
    } | {
        type: "CATEGORY";
        id: string;
    } | {
        type: "BRAND";
        id: string;
    } | {
        type: "PRODUCT";
        id: string;
    } | {
        type: "TAG";
        id: string;
    } | {
        path: string;
        type: "CUSTOM_PATH";
    } | {
        type: "EXTERNAL";
        url: string;
        newTab: boolean;
    } | {
        type: "PAGE";
        id: string;
    } | null;
    mediaAssetId: string | null;
    imageAlt: {
        en: string;
        ar: string;
    };
    style: "IMAGE" | "SOFT" | "DARK" | "ACCENT";
    visibility: {
        startsAt: string | null;
        endsAt: string | null;
        devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
        locales: ("en" | "ar")[];
    };
    analyticsKey: string;
    surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
    spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
}, {
    type: "PROMO_BANNER";
    id: string;
    description: {
        en?: string | undefined;
        ar?: string | undefined;
    };
    label: string;
    heading: {
        en?: string | undefined;
        ar?: string | undefined;
    };
    ctaLabel: {
        en?: string | undefined;
        ar?: string | undefined;
    };
    imageAlt: {
        en?: string | undefined;
        ar?: string | undefined;
    };
    visibility: {
        startsAt?: string | null | undefined;
        endsAt?: string | null | undefined;
        devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
        locales?: ("en" | "ar")[] | undefined;
    };
    analyticsKey: string;
    width?: "CONTENT" | "WIDE" | "FULL" | undefined;
    enabled?: boolean | undefined;
    destination?: {
        type: "HOME";
    } | {
        type: "SHOP";
    } | {
        type: "OFFERS";
    } | {
        type: "NEW_ARRIVALS";
    } | {
        type: "ABOUT";
    } | {
        type: "CONTACT";
    } | {
        type: "CATEGORY";
        id: string;
    } | {
        type: "BRAND";
        id: string;
    } | {
        type: "PRODUCT";
        id: string;
    } | {
        type: "TAG";
        id: string;
    } | {
        path: string;
        type: "CUSTOM_PATH";
    } | {
        type: "EXTERNAL";
        url: string;
        newTab?: boolean | undefined;
    } | {
        type: "PAGE";
        id: string;
    } | null | undefined;
    mediaAssetId?: string | null | undefined;
    style?: "IMAGE" | "SOFT" | "DARK" | "ACCENT" | undefined;
    surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
    spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
}>, z.ZodObject<{
    type: z.ZodLiteral<"COUNTDOWN">;
    eyebrow: z.ZodObject<{} & {
        en: z.ZodDefault<z.ZodString>;
        ar: z.ZodDefault<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        en: string;
        ar: string;
    }, {
        en?: string | undefined;
        ar?: string | undefined;
    }>;
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
    description: z.ZodObject<{} & {
        en: z.ZodDefault<z.ZodString>;
        ar: z.ZodDefault<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        en: string;
        ar: string;
    }, {
        en?: string | undefined;
        ar?: string | undefined;
    }>;
    endsAt: z.ZodString;
    expiredBehavior: z.ZodDefault<z.ZodEnum<["HIDE", "SHOW_EXPIRED"]>>;
    expiredMessage: z.ZodObject<{} & {
        en: z.ZodDefault<z.ZodString>;
        ar: z.ZodDefault<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        en: string;
        ar: string;
    }, {
        en?: string | undefined;
        ar?: string | undefined;
    }>;
    id: z.ZodString;
    analyticsKey: z.ZodString;
    label: z.ZodString;
    enabled: z.ZodDefault<z.ZodBoolean>;
    visibility: z.ZodEffects<z.ZodObject<{
        devices: z.ZodDefault<z.ZodArray<z.ZodEnum<["DESKTOP", "TABLET", "MOBILE"]>, "many">>;
        locales: z.ZodDefault<z.ZodArray<z.ZodEnum<["en", "ar"]>, "many">>;
        startsAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        endsAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        startsAt: string | null;
        endsAt: string | null;
        devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
        locales: ("en" | "ar")[];
    }, {
        startsAt?: string | null | undefined;
        endsAt?: string | null | undefined;
        devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
        locales?: ("en" | "ar")[] | undefined;
    }>, {
        startsAt: string | null;
        endsAt: string | null;
        devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
        locales: ("en" | "ar")[];
    }, {
        startsAt?: string | null | undefined;
        endsAt?: string | null | undefined;
        devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
        locales?: ("en" | "ar")[] | undefined;
    }>;
    surface: z.ZodDefault<z.ZodEnum<["DEFAULT", "SOFT", "DARK", "ACCENT"]>>;
    spacing: z.ZodDefault<z.ZodEnum<["NONE", "SMALL", "MEDIUM", "LARGE"]>>;
    width: z.ZodDefault<z.ZodEnum<["CONTENT", "WIDE", "FULL"]>>;
}, "strict", z.ZodTypeAny, {
    type: "COUNTDOWN";
    id: string;
    description: {
        en: string;
        ar: string;
    };
    label: string;
    width: "CONTENT" | "WIDE" | "FULL";
    enabled: boolean;
    endsAt: string;
    heading: {
        en: string;
        ar: string;
    };
    eyebrow: {
        en: string;
        ar: string;
    };
    visibility: {
        startsAt: string | null;
        endsAt: string | null;
        devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
        locales: ("en" | "ar")[];
    };
    analyticsKey: string;
    surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
    spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
    expiredBehavior: "HIDE" | "SHOW_EXPIRED";
    expiredMessage: {
        en: string;
        ar: string;
    };
}, {
    type: "COUNTDOWN";
    id: string;
    description: {
        en?: string | undefined;
        ar?: string | undefined;
    };
    label: string;
    endsAt: string;
    heading: {
        en?: string | undefined;
        ar?: string | undefined;
    };
    eyebrow: {
        en?: string | undefined;
        ar?: string | undefined;
    };
    visibility: {
        startsAt?: string | null | undefined;
        endsAt?: string | null | undefined;
        devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
        locales?: ("en" | "ar")[] | undefined;
    };
    analyticsKey: string;
    expiredMessage: {
        en?: string | undefined;
        ar?: string | undefined;
    };
    width?: "CONTENT" | "WIDE" | "FULL" | undefined;
    enabled?: boolean | undefined;
    surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
    spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
    expiredBehavior?: "HIDE" | "SHOW_EXPIRED" | undefined;
}>, z.ZodObject<{
    type: z.ZodLiteral<"NEWSLETTER">;
    eyebrow: z.ZodObject<{} & {
        en: z.ZodDefault<z.ZodString>;
        ar: z.ZodDefault<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        en: string;
        ar: string;
    }, {
        en?: string | undefined;
        ar?: string | undefined;
    }>;
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
    description: z.ZodObject<{} & {
        en: z.ZodDefault<z.ZodString>;
        ar: z.ZodDefault<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        en: string;
        ar: string;
    }, {
        en?: string | undefined;
        ar?: string | undefined;
    }>;
    style: z.ZodDefault<z.ZodEnum<["COMPACT", "EDITORIAL", "DARK"]>>;
    id: z.ZodString;
    analyticsKey: z.ZodString;
    label: z.ZodString;
    enabled: z.ZodDefault<z.ZodBoolean>;
    visibility: z.ZodEffects<z.ZodObject<{
        devices: z.ZodDefault<z.ZodArray<z.ZodEnum<["DESKTOP", "TABLET", "MOBILE"]>, "many">>;
        locales: z.ZodDefault<z.ZodArray<z.ZodEnum<["en", "ar"]>, "many">>;
        startsAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        endsAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        startsAt: string | null;
        endsAt: string | null;
        devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
        locales: ("en" | "ar")[];
    }, {
        startsAt?: string | null | undefined;
        endsAt?: string | null | undefined;
        devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
        locales?: ("en" | "ar")[] | undefined;
    }>, {
        startsAt: string | null;
        endsAt: string | null;
        devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
        locales: ("en" | "ar")[];
    }, {
        startsAt?: string | null | undefined;
        endsAt?: string | null | undefined;
        devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
        locales?: ("en" | "ar")[] | undefined;
    }>;
    surface: z.ZodDefault<z.ZodEnum<["DEFAULT", "SOFT", "DARK", "ACCENT"]>>;
    spacing: z.ZodDefault<z.ZodEnum<["NONE", "SMALL", "MEDIUM", "LARGE"]>>;
    width: z.ZodDefault<z.ZodEnum<["CONTENT", "WIDE", "FULL"]>>;
}, "strict", z.ZodTypeAny, {
    type: "NEWSLETTER";
    id: string;
    description: {
        en: string;
        ar: string;
    };
    label: string;
    width: "CONTENT" | "WIDE" | "FULL";
    enabled: boolean;
    heading: {
        en: string;
        ar: string;
    };
    eyebrow: {
        en: string;
        ar: string;
    };
    style: "COMPACT" | "DARK" | "EDITORIAL";
    visibility: {
        startsAt: string | null;
        endsAt: string | null;
        devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
        locales: ("en" | "ar")[];
    };
    analyticsKey: string;
    surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
    spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
}, {
    type: "NEWSLETTER";
    id: string;
    description: {
        en?: string | undefined;
        ar?: string | undefined;
    };
    label: string;
    heading: {
        en?: string | undefined;
        ar?: string | undefined;
    };
    eyebrow: {
        en?: string | undefined;
        ar?: string | undefined;
    };
    visibility: {
        startsAt?: string | null | undefined;
        endsAt?: string | null | undefined;
        devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
        locales?: ("en" | "ar")[] | undefined;
    };
    analyticsKey: string;
    width?: "CONTENT" | "WIDE" | "FULL" | undefined;
    enabled?: boolean | undefined;
    style?: "COMPACT" | "DARK" | "EDITORIAL" | undefined;
    surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
    spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
}>, z.ZodObject<{
    type: z.ZodLiteral<"FAQ">;
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
    description: z.ZodObject<{} & {
        en: z.ZodDefault<z.ZodString>;
        ar: z.ZodDefault<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        en: string;
        ar: string;
    }, {
        en?: string | undefined;
        ar?: string | undefined;
    }>;
    items: z.ZodDefault<z.ZodArray<z.ZodObject<{
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
        answer: z.ZodObject<{} & {
            en: z.ZodDefault<z.ZodString>;
            ar: z.ZodDefault<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            en: string;
            ar: string;
        }, {
            en?: string | undefined;
            ar?: string | undefined;
        }>;
    }, "strict", z.ZodTypeAny, {
        id: string;
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
        question: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        answer: {
            en?: string | undefined;
            ar?: string | undefined;
        };
    }>, "many">>;
    id: z.ZodString;
    analyticsKey: z.ZodString;
    label: z.ZodString;
    enabled: z.ZodDefault<z.ZodBoolean>;
    visibility: z.ZodEffects<z.ZodObject<{
        devices: z.ZodDefault<z.ZodArray<z.ZodEnum<["DESKTOP", "TABLET", "MOBILE"]>, "many">>;
        locales: z.ZodDefault<z.ZodArray<z.ZodEnum<["en", "ar"]>, "many">>;
        startsAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        endsAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        startsAt: string | null;
        endsAt: string | null;
        devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
        locales: ("en" | "ar")[];
    }, {
        startsAt?: string | null | undefined;
        endsAt?: string | null | undefined;
        devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
        locales?: ("en" | "ar")[] | undefined;
    }>, {
        startsAt: string | null;
        endsAt: string | null;
        devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
        locales: ("en" | "ar")[];
    }, {
        startsAt?: string | null | undefined;
        endsAt?: string | null | undefined;
        devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
        locales?: ("en" | "ar")[] | undefined;
    }>;
    surface: z.ZodDefault<z.ZodEnum<["DEFAULT", "SOFT", "DARK", "ACCENT"]>>;
    spacing: z.ZodDefault<z.ZodEnum<["NONE", "SMALL", "MEDIUM", "LARGE"]>>;
    width: z.ZodDefault<z.ZodEnum<["CONTENT", "WIDE", "FULL"]>>;
}, "strict", z.ZodTypeAny, {
    type: "FAQ";
    id: string;
    description: {
        en: string;
        ar: string;
    };
    label: string;
    width: "CONTENT" | "WIDE" | "FULL";
    items: {
        id: string;
        question: {
            en: string;
            ar: string;
        };
        answer: {
            en: string;
            ar: string;
        };
    }[];
    enabled: boolean;
    heading: {
        en: string;
        ar: string;
    };
    visibility: {
        startsAt: string | null;
        endsAt: string | null;
        devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
        locales: ("en" | "ar")[];
    };
    analyticsKey: string;
    surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
    spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
}, {
    type: "FAQ";
    id: string;
    description: {
        en?: string | undefined;
        ar?: string | undefined;
    };
    label: string;
    heading: {
        en?: string | undefined;
        ar?: string | undefined;
    };
    visibility: {
        startsAt?: string | null | undefined;
        endsAt?: string | null | undefined;
        devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
        locales?: ("en" | "ar")[] | undefined;
    };
    analyticsKey: string;
    width?: "CONTENT" | "WIDE" | "FULL" | undefined;
    items?: {
        id: string;
        question: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        answer: {
            en?: string | undefined;
            ar?: string | undefined;
        };
    }[] | undefined;
    enabled?: boolean | undefined;
    surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
    spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
}>, z.ZodObject<{
    type: z.ZodLiteral<"SPACER">;
    size: z.ZodDefault<z.ZodEnum<["SMALL", "MEDIUM", "LARGE"]>>;
    id: z.ZodString;
    analyticsKey: z.ZodString;
    label: z.ZodString;
    enabled: z.ZodDefault<z.ZodBoolean>;
    visibility: z.ZodEffects<z.ZodObject<{
        devices: z.ZodDefault<z.ZodArray<z.ZodEnum<["DESKTOP", "TABLET", "MOBILE"]>, "many">>;
        locales: z.ZodDefault<z.ZodArray<z.ZodEnum<["en", "ar"]>, "many">>;
        startsAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        endsAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        startsAt: string | null;
        endsAt: string | null;
        devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
        locales: ("en" | "ar")[];
    }, {
        startsAt?: string | null | undefined;
        endsAt?: string | null | undefined;
        devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
        locales?: ("en" | "ar")[] | undefined;
    }>, {
        startsAt: string | null;
        endsAt: string | null;
        devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
        locales: ("en" | "ar")[];
    }, {
        startsAt?: string | null | undefined;
        endsAt?: string | null | undefined;
        devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
        locales?: ("en" | "ar")[] | undefined;
    }>;
    surface: z.ZodDefault<z.ZodEnum<["DEFAULT", "SOFT", "DARK", "ACCENT"]>>;
    spacing: z.ZodDefault<z.ZodEnum<["NONE", "SMALL", "MEDIUM", "LARGE"]>>;
    width: z.ZodDefault<z.ZodEnum<["CONTENT", "WIDE", "FULL"]>>;
}, "strict", z.ZodTypeAny, {
    type: "SPACER";
    id: string;
    label: string;
    width: "CONTENT" | "WIDE" | "FULL";
    enabled: boolean;
    visibility: {
        startsAt: string | null;
        endsAt: string | null;
        devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
        locales: ("en" | "ar")[];
    };
    size: "SMALL" | "MEDIUM" | "LARGE";
    analyticsKey: string;
    surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
    spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
}, {
    type: "SPACER";
    id: string;
    label: string;
    visibility: {
        startsAt?: string | null | undefined;
        endsAt?: string | null | undefined;
        devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
        locales?: ("en" | "ar")[] | undefined;
    };
    analyticsKey: string;
    width?: "CONTENT" | "WIDE" | "FULL" | undefined;
    enabled?: boolean | undefined;
    size?: "SMALL" | "MEDIUM" | "LARGE" | undefined;
    surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
    spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
}>, z.ZodObject<{
    type: z.ZodLiteral<"DIVIDER">;
    id: z.ZodString;
    analyticsKey: z.ZodString;
    label: z.ZodString;
    enabled: z.ZodDefault<z.ZodBoolean>;
    visibility: z.ZodEffects<z.ZodObject<{
        devices: z.ZodDefault<z.ZodArray<z.ZodEnum<["DESKTOP", "TABLET", "MOBILE"]>, "many">>;
        locales: z.ZodDefault<z.ZodArray<z.ZodEnum<["en", "ar"]>, "many">>;
        startsAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        endsAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        startsAt: string | null;
        endsAt: string | null;
        devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
        locales: ("en" | "ar")[];
    }, {
        startsAt?: string | null | undefined;
        endsAt?: string | null | undefined;
        devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
        locales?: ("en" | "ar")[] | undefined;
    }>, {
        startsAt: string | null;
        endsAt: string | null;
        devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
        locales: ("en" | "ar")[];
    }, {
        startsAt?: string | null | undefined;
        endsAt?: string | null | undefined;
        devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
        locales?: ("en" | "ar")[] | undefined;
    }>;
    surface: z.ZodDefault<z.ZodEnum<["DEFAULT", "SOFT", "DARK", "ACCENT"]>>;
    spacing: z.ZodDefault<z.ZodEnum<["NONE", "SMALL", "MEDIUM", "LARGE"]>>;
    width: z.ZodDefault<z.ZodEnum<["CONTENT", "WIDE", "FULL"]>>;
}, "strict", z.ZodTypeAny, {
    type: "DIVIDER";
    id: string;
    label: string;
    width: "CONTENT" | "WIDE" | "FULL";
    enabled: boolean;
    visibility: {
        startsAt: string | null;
        endsAt: string | null;
        devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
        locales: ("en" | "ar")[];
    };
    analyticsKey: string;
    surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
    spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
}, {
    type: "DIVIDER";
    id: string;
    label: string;
    visibility: {
        startsAt?: string | null | undefined;
        endsAt?: string | null | undefined;
        devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
        locales?: ("en" | "ar")[] | undefined;
    };
    analyticsKey: string;
    width?: "CONTENT" | "WIDE" | "FULL" | undefined;
    enabled?: boolean | undefined;
    surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
    spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
}>]>;
export type LandingPageSection = z.infer<typeof landingPageSectionSchema>;
export declare const landingPageSeoSchema: z.ZodObject<{
    title: z.ZodObject<{} & {
        en: z.ZodDefault<z.ZodString>;
        ar: z.ZodDefault<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        en: string;
        ar: string;
    }, {
        en?: string | undefined;
        ar?: string | undefined;
    }>;
    description: z.ZodObject<{} & {
        en: z.ZodDefault<z.ZodString>;
        ar: z.ZodDefault<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        en: string;
        ar: string;
    }, {
        en?: string | undefined;
        ar?: string | undefined;
    }>;
    canonicalPath: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    openGraphMediaId: z.ZodDefault<z.ZodNullable<z.ZodString>>;
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
    canonicalPath: string | null;
    openGraphMediaId: string | null;
    indexable: boolean;
}, {
    description: {
        en?: string | undefined;
        ar?: string | undefined;
    };
    title: {
        en?: string | undefined;
        ar?: string | undefined;
    };
    canonicalPath?: string | null | undefined;
    openGraphMediaId?: string | null | undefined;
    indexable?: boolean | undefined;
}>;
export declare const landingPageConfigSchema: z.ZodEffects<z.ZodObject<{
    schemaVersion: z.ZodLiteral<1>;
    title: z.ZodObject<{} & {
        en: z.ZodDefault<z.ZodString>;
        ar: z.ZodDefault<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        en: string;
        ar: string;
    }, {
        en?: string | undefined;
        ar?: string | undefined;
    }>;
    seo: z.ZodObject<{
        title: z.ZodObject<{} & {
            en: z.ZodDefault<z.ZodString>;
            ar: z.ZodDefault<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            en: string;
            ar: string;
        }, {
            en?: string | undefined;
            ar?: string | undefined;
        }>;
        description: z.ZodObject<{} & {
            en: z.ZodDefault<z.ZodString>;
            ar: z.ZodDefault<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            en: string;
            ar: string;
        }, {
            en?: string | undefined;
            ar?: string | undefined;
        }>;
        canonicalPath: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        openGraphMediaId: z.ZodDefault<z.ZodNullable<z.ZodString>>;
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
        canonicalPath: string | null;
        openGraphMediaId: string | null;
        indexable: boolean;
    }, {
        description: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        title: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        canonicalPath?: string | null | undefined;
        openGraphMediaId?: string | null | undefined;
        indexable?: boolean | undefined;
    }>;
    sections: z.ZodArray<z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
        type: z.ZodLiteral<"HERO">;
        desktopMediaId: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        mobileMediaId: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        imageAlt: z.ZodObject<{
            en: z.ZodDefault<z.ZodString>;
            ar: z.ZodDefault<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            en: string;
            ar: string;
        }, {
            en?: string | undefined;
            ar?: string | undefined;
        }>;
        eyebrow: z.ZodObject<{} & {
            en: z.ZodDefault<z.ZodString>;
            ar: z.ZodDefault<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            en: string;
            ar: string;
        }, {
            en?: string | undefined;
            ar?: string | undefined;
        }>;
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
        description: z.ZodObject<{} & {
            en: z.ZodDefault<z.ZodString>;
            ar: z.ZodDefault<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            en: string;
            ar: string;
        }, {
            en?: string | undefined;
            ar?: string | undefined;
        }>;
        primaryCtaLabel: z.ZodObject<{} & {
            en: z.ZodDefault<z.ZodString>;
            ar: z.ZodDefault<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            en: string;
            ar: string;
        }, {
            en?: string | undefined;
            ar?: string | undefined;
        }>;
        primaryDestination: z.ZodDefault<z.ZodNullable<z.ZodUnion<[z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
            type: z.ZodLiteral<"HOME">;
        }, "strip", z.ZodTypeAny, {
            type: "HOME";
        }, {
            type: "HOME";
        }>, z.ZodObject<{
            type: z.ZodLiteral<"SHOP">;
        }, "strip", z.ZodTypeAny, {
            type: "SHOP";
        }, {
            type: "SHOP";
        }>, z.ZodObject<{
            type: z.ZodLiteral<"OFFERS">;
        }, "strip", z.ZodTypeAny, {
            type: "OFFERS";
        }, {
            type: "OFFERS";
        }>, z.ZodObject<{
            type: z.ZodLiteral<"NEW_ARRIVALS">;
        }, "strip", z.ZodTypeAny, {
            type: "NEW_ARRIVALS";
        }, {
            type: "NEW_ARRIVALS";
        }>, z.ZodObject<{
            type: z.ZodLiteral<"ABOUT">;
        }, "strip", z.ZodTypeAny, {
            type: "ABOUT";
        }, {
            type: "ABOUT";
        }>, z.ZodObject<{
            type: z.ZodLiteral<"CONTACT">;
        }, "strip", z.ZodTypeAny, {
            type: "CONTACT";
        }, {
            type: "CONTACT";
        }>, z.ZodObject<{
            type: z.ZodLiteral<"CATEGORY">;
            id: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: "CATEGORY";
            id: string;
        }, {
            type: "CATEGORY";
            id: string;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"BRAND">;
            id: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: "BRAND";
            id: string;
        }, {
            type: "BRAND";
            id: string;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"PRODUCT">;
            id: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: "PRODUCT";
            id: string;
        }, {
            type: "PRODUCT";
            id: string;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"TAG">;
            id: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: "TAG";
            id: string;
        }, {
            type: "TAG";
            id: string;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"CUSTOM_PATH">;
            path: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            path: string;
            type: "CUSTOM_PATH";
        }, {
            path: string;
            type: "CUSTOM_PATH";
        }>, z.ZodObject<{
            type: z.ZodLiteral<"EXTERNAL">;
            url: z.ZodEffects<z.ZodString, string, string>;
            newTab: z.ZodDefault<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            type: "EXTERNAL";
            url: string;
            newTab: boolean;
        }, {
            type: "EXTERNAL";
            url: string;
            newTab?: boolean | undefined;
        }>]>, z.ZodObject<{
            type: z.ZodLiteral<"PAGE">;
            id: z.ZodString;
        }, "strict", z.ZodTypeAny, {
            type: "PAGE";
            id: string;
        }, {
            type: "PAGE";
            id: string;
        }>]>>>;
        secondaryCtaLabel: z.ZodObject<{} & {
            en: z.ZodDefault<z.ZodString>;
            ar: z.ZodDefault<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            en: string;
            ar: string;
        }, {
            en?: string | undefined;
            ar?: string | undefined;
        }>;
        secondaryDestination: z.ZodDefault<z.ZodNullable<z.ZodUnion<[z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
            type: z.ZodLiteral<"HOME">;
        }, "strip", z.ZodTypeAny, {
            type: "HOME";
        }, {
            type: "HOME";
        }>, z.ZodObject<{
            type: z.ZodLiteral<"SHOP">;
        }, "strip", z.ZodTypeAny, {
            type: "SHOP";
        }, {
            type: "SHOP";
        }>, z.ZodObject<{
            type: z.ZodLiteral<"OFFERS">;
        }, "strip", z.ZodTypeAny, {
            type: "OFFERS";
        }, {
            type: "OFFERS";
        }>, z.ZodObject<{
            type: z.ZodLiteral<"NEW_ARRIVALS">;
        }, "strip", z.ZodTypeAny, {
            type: "NEW_ARRIVALS";
        }, {
            type: "NEW_ARRIVALS";
        }>, z.ZodObject<{
            type: z.ZodLiteral<"ABOUT">;
        }, "strip", z.ZodTypeAny, {
            type: "ABOUT";
        }, {
            type: "ABOUT";
        }>, z.ZodObject<{
            type: z.ZodLiteral<"CONTACT">;
        }, "strip", z.ZodTypeAny, {
            type: "CONTACT";
        }, {
            type: "CONTACT";
        }>, z.ZodObject<{
            type: z.ZodLiteral<"CATEGORY">;
            id: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: "CATEGORY";
            id: string;
        }, {
            type: "CATEGORY";
            id: string;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"BRAND">;
            id: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: "BRAND";
            id: string;
        }, {
            type: "BRAND";
            id: string;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"PRODUCT">;
            id: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: "PRODUCT";
            id: string;
        }, {
            type: "PRODUCT";
            id: string;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"TAG">;
            id: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: "TAG";
            id: string;
        }, {
            type: "TAG";
            id: string;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"CUSTOM_PATH">;
            path: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            path: string;
            type: "CUSTOM_PATH";
        }, {
            path: string;
            type: "CUSTOM_PATH";
        }>, z.ZodObject<{
            type: z.ZodLiteral<"EXTERNAL">;
            url: z.ZodEffects<z.ZodString, string, string>;
            newTab: z.ZodDefault<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            type: "EXTERNAL";
            url: string;
            newTab: boolean;
        }, {
            type: "EXTERNAL";
            url: string;
            newTab?: boolean | undefined;
        }>]>, z.ZodObject<{
            type: z.ZodLiteral<"PAGE">;
            id: z.ZodString;
        }, "strict", z.ZodTypeAny, {
            type: "PAGE";
            id: string;
        }, {
            type: "PAGE";
            id: string;
        }>]>>>;
        layout: z.ZodDefault<z.ZodEnum<["FULL", "SPLIT", "CONTAINED"]>>;
        alignment: z.ZodDefault<z.ZodEnum<["START", "CENTER", "END"]>>;
        contentPosition: z.ZodDefault<z.ZodEnum<["TOP", "CENTER", "BOTTOM"]>>;
        overlay: z.ZodDefault<z.ZodEnum<["NONE", "LIGHT", "MEDIUM", "STRONG"]>>;
        headingLevel: z.ZodDefault<z.ZodEnum<["H1", "H2"]>>;
        id: z.ZodString;
        analyticsKey: z.ZodString;
        label: z.ZodString;
        enabled: z.ZodDefault<z.ZodBoolean>;
        visibility: z.ZodEffects<z.ZodObject<{
            devices: z.ZodDefault<z.ZodArray<z.ZodEnum<["DESKTOP", "TABLET", "MOBILE"]>, "many">>;
            locales: z.ZodDefault<z.ZodArray<z.ZodEnum<["en", "ar"]>, "many">>;
            startsAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
            endsAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
            startsAt: string | null;
            endsAt: string | null;
            devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
            locales: ("en" | "ar")[];
        }, {
            startsAt?: string | null | undefined;
            endsAt?: string | null | undefined;
            devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
            locales?: ("en" | "ar")[] | undefined;
        }>, {
            startsAt: string | null;
            endsAt: string | null;
            devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
            locales: ("en" | "ar")[];
        }, {
            startsAt?: string | null | undefined;
            endsAt?: string | null | undefined;
            devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
            locales?: ("en" | "ar")[] | undefined;
        }>;
        surface: z.ZodDefault<z.ZodEnum<["DEFAULT", "SOFT", "DARK", "ACCENT"]>>;
        spacing: z.ZodDefault<z.ZodEnum<["NONE", "SMALL", "MEDIUM", "LARGE"]>>;
        width: z.ZodDefault<z.ZodEnum<["CONTENT", "WIDE", "FULL"]>>;
    }, "strict", z.ZodTypeAny, {
        type: "HERO";
        id: string;
        description: {
            en: string;
            ar: string;
        };
        label: string;
        width: "CONTENT" | "WIDE" | "FULL";
        enabled: boolean;
        heading: {
            en: string;
            ar: string;
        };
        eyebrow: {
            en: string;
            ar: string;
        };
        imageAlt: {
            en: string;
            ar: string;
        };
        visibility: {
            startsAt: string | null;
            endsAt: string | null;
            devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
            locales: ("en" | "ar")[];
        };
        alignment: "START" | "CENTER" | "END";
        desktopMediaId: string | null;
        mobileMediaId: string | null;
        primaryCtaLabel: {
            en: string;
            ar: string;
        };
        primaryDestination: {
            type: "HOME";
        } | {
            type: "SHOP";
        } | {
            type: "OFFERS";
        } | {
            type: "NEW_ARRIVALS";
        } | {
            type: "ABOUT";
        } | {
            type: "CONTACT";
        } | {
            type: "CATEGORY";
            id: string;
        } | {
            type: "BRAND";
            id: string;
        } | {
            type: "PRODUCT";
            id: string;
        } | {
            type: "TAG";
            id: string;
        } | {
            path: string;
            type: "CUSTOM_PATH";
        } | {
            type: "EXTERNAL";
            url: string;
            newTab: boolean;
        } | {
            type: "PAGE";
            id: string;
        } | null;
        secondaryCtaLabel: {
            en: string;
            ar: string;
        };
        secondaryDestination: {
            type: "HOME";
        } | {
            type: "SHOP";
        } | {
            type: "OFFERS";
        } | {
            type: "NEW_ARRIVALS";
        } | {
            type: "ABOUT";
        } | {
            type: "CONTACT";
        } | {
            type: "CATEGORY";
            id: string;
        } | {
            type: "BRAND";
            id: string;
        } | {
            type: "PRODUCT";
            id: string;
        } | {
            type: "TAG";
            id: string;
        } | {
            path: string;
            type: "CUSTOM_PATH";
        } | {
            type: "EXTERNAL";
            url: string;
            newTab: boolean;
        } | {
            type: "PAGE";
            id: string;
        } | null;
        layout: "SPLIT" | "FULL" | "CONTAINED";
        contentPosition: "CENTER" | "TOP" | "BOTTOM";
        overlay: "NONE" | "MEDIUM" | "LIGHT" | "STRONG";
        headingLevel: "H1" | "H2";
        analyticsKey: string;
        surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
        spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
    }, {
        type: "HERO";
        id: string;
        description: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        label: string;
        heading: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        eyebrow: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        imageAlt: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        visibility: {
            startsAt?: string | null | undefined;
            endsAt?: string | null | undefined;
            devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
            locales?: ("en" | "ar")[] | undefined;
        };
        primaryCtaLabel: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        secondaryCtaLabel: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        analyticsKey: string;
        width?: "CONTENT" | "WIDE" | "FULL" | undefined;
        enabled?: boolean | undefined;
        alignment?: "START" | "CENTER" | "END" | undefined;
        desktopMediaId?: string | null | undefined;
        mobileMediaId?: string | null | undefined;
        primaryDestination?: {
            type: "HOME";
        } | {
            type: "SHOP";
        } | {
            type: "OFFERS";
        } | {
            type: "NEW_ARRIVALS";
        } | {
            type: "ABOUT";
        } | {
            type: "CONTACT";
        } | {
            type: "CATEGORY";
            id: string;
        } | {
            type: "BRAND";
            id: string;
        } | {
            type: "PRODUCT";
            id: string;
        } | {
            type: "TAG";
            id: string;
        } | {
            path: string;
            type: "CUSTOM_PATH";
        } | {
            type: "EXTERNAL";
            url: string;
            newTab?: boolean | undefined;
        } | {
            type: "PAGE";
            id: string;
        } | null | undefined;
        secondaryDestination?: {
            type: "HOME";
        } | {
            type: "SHOP";
        } | {
            type: "OFFERS";
        } | {
            type: "NEW_ARRIVALS";
        } | {
            type: "ABOUT";
        } | {
            type: "CONTACT";
        } | {
            type: "CATEGORY";
            id: string;
        } | {
            type: "BRAND";
            id: string;
        } | {
            type: "PRODUCT";
            id: string;
        } | {
            type: "TAG";
            id: string;
        } | {
            path: string;
            type: "CUSTOM_PATH";
        } | {
            type: "EXTERNAL";
            url: string;
            newTab?: boolean | undefined;
        } | {
            type: "PAGE";
            id: string;
        } | null | undefined;
        layout?: "SPLIT" | "FULL" | "CONTAINED" | undefined;
        contentPosition?: "CENTER" | "TOP" | "BOTTOM" | undefined;
        overlay?: "NONE" | "MEDIUM" | "LIGHT" | "STRONG" | undefined;
        headingLevel?: "H1" | "H2" | undefined;
        surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
        spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"PRODUCT_GRID">;
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
        description: z.ZodObject<{} & {
            en: z.ZodDefault<z.ZodString>;
            ar: z.ZodDefault<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            en: string;
            ar: string;
        }, {
            en?: string | undefined;
            ar?: string | undefined;
        }>;
        source: z.ZodDiscriminatedUnion<"mode", [z.ZodObject<{
            mode: z.ZodLiteral<"MANUAL">;
            productIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        }, "strict", z.ZodTypeAny, {
            productIds: string[];
            mode: "MANUAL";
        }, {
            mode: "MANUAL";
            productIds?: string[] | undefined;
        }>, z.ZodObject<{
            mode: z.ZodLiteral<"CATEGORY">;
            referenceId: z.ZodString;
        }, "strict", z.ZodTypeAny, {
            mode: "CATEGORY";
            referenceId: string;
        }, {
            mode: "CATEGORY";
            referenceId: string;
        }>, z.ZodObject<{
            mode: z.ZodLiteral<"BRAND">;
            referenceId: z.ZodString;
        }, "strict", z.ZodTypeAny, {
            mode: "BRAND";
            referenceId: string;
        }, {
            mode: "BRAND";
            referenceId: string;
        }>, z.ZodObject<{
            mode: z.ZodLiteral<"TAG">;
            referenceId: z.ZodString;
        }, "strict", z.ZodTypeAny, {
            mode: "TAG";
            referenceId: string;
        }, {
            mode: "TAG";
            referenceId: string;
        }>, z.ZodObject<{
            mode: z.ZodLiteral<"PROMOTION">;
            referenceId: z.ZodString;
        }, "strict", z.ZodTypeAny, {
            mode: "PROMOTION";
            referenceId: string;
        }, {
            mode: "PROMOTION";
            referenceId: string;
        }>, z.ZodObject<{
            mode: z.ZodLiteral<"NEWEST">;
        }, "strict", z.ZodTypeAny, {
            mode: "NEWEST";
        }, {
            mode: "NEWEST";
        }>, z.ZodObject<{
            mode: z.ZodLiteral<"FEATURED">;
        }, "strict", z.ZodTypeAny, {
            mode: "FEATURED";
        }, {
            mode: "FEATURED";
        }>]>;
        limit: z.ZodDefault<z.ZodNumber>;
        columns: z.ZodObject<{
            desktop: z.ZodDefault<z.ZodNumber>;
            tablet: z.ZodDefault<z.ZodNumber>;
            mobile: z.ZodDefault<z.ZodNumber>;
        }, "strict", z.ZodTypeAny, {
            desktop: number;
            tablet: number;
            mobile: number;
        }, {
            desktop?: number | undefined;
            tablet?: number | undefined;
            mobile?: number | undefined;
        }>;
        showViewAll: z.ZodDefault<z.ZodBoolean>;
        viewAllLabel: z.ZodObject<{} & {
            en: z.ZodDefault<z.ZodString>;
            ar: z.ZodDefault<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            en: string;
            ar: string;
        }, {
            en?: string | undefined;
            ar?: string | undefined;
        }>;
        destination: z.ZodDefault<z.ZodNullable<z.ZodUnion<[z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
            type: z.ZodLiteral<"HOME">;
        }, "strip", z.ZodTypeAny, {
            type: "HOME";
        }, {
            type: "HOME";
        }>, z.ZodObject<{
            type: z.ZodLiteral<"SHOP">;
        }, "strip", z.ZodTypeAny, {
            type: "SHOP";
        }, {
            type: "SHOP";
        }>, z.ZodObject<{
            type: z.ZodLiteral<"OFFERS">;
        }, "strip", z.ZodTypeAny, {
            type: "OFFERS";
        }, {
            type: "OFFERS";
        }>, z.ZodObject<{
            type: z.ZodLiteral<"NEW_ARRIVALS">;
        }, "strip", z.ZodTypeAny, {
            type: "NEW_ARRIVALS";
        }, {
            type: "NEW_ARRIVALS";
        }>, z.ZodObject<{
            type: z.ZodLiteral<"ABOUT">;
        }, "strip", z.ZodTypeAny, {
            type: "ABOUT";
        }, {
            type: "ABOUT";
        }>, z.ZodObject<{
            type: z.ZodLiteral<"CONTACT">;
        }, "strip", z.ZodTypeAny, {
            type: "CONTACT";
        }, {
            type: "CONTACT";
        }>, z.ZodObject<{
            type: z.ZodLiteral<"CATEGORY">;
            id: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: "CATEGORY";
            id: string;
        }, {
            type: "CATEGORY";
            id: string;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"BRAND">;
            id: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: "BRAND";
            id: string;
        }, {
            type: "BRAND";
            id: string;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"PRODUCT">;
            id: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: "PRODUCT";
            id: string;
        }, {
            type: "PRODUCT";
            id: string;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"TAG">;
            id: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: "TAG";
            id: string;
        }, {
            type: "TAG";
            id: string;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"CUSTOM_PATH">;
            path: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            path: string;
            type: "CUSTOM_PATH";
        }, {
            path: string;
            type: "CUSTOM_PATH";
        }>, z.ZodObject<{
            type: z.ZodLiteral<"EXTERNAL">;
            url: z.ZodEffects<z.ZodString, string, string>;
            newTab: z.ZodDefault<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            type: "EXTERNAL";
            url: string;
            newTab: boolean;
        }, {
            type: "EXTERNAL";
            url: string;
            newTab?: boolean | undefined;
        }>]>, z.ZodObject<{
            type: z.ZodLiteral<"PAGE">;
            id: z.ZodString;
        }, "strict", z.ZodTypeAny, {
            type: "PAGE";
            id: string;
        }, {
            type: "PAGE";
            id: string;
        }>]>>>;
        style: z.ZodDefault<z.ZodEnum<["CLEAN", "EDITORIAL", "COMPACT"]>>;
        id: z.ZodString;
        analyticsKey: z.ZodString;
        label: z.ZodString;
        enabled: z.ZodDefault<z.ZodBoolean>;
        visibility: z.ZodEffects<z.ZodObject<{
            devices: z.ZodDefault<z.ZodArray<z.ZodEnum<["DESKTOP", "TABLET", "MOBILE"]>, "many">>;
            locales: z.ZodDefault<z.ZodArray<z.ZodEnum<["en", "ar"]>, "many">>;
            startsAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
            endsAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
            startsAt: string | null;
            endsAt: string | null;
            devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
            locales: ("en" | "ar")[];
        }, {
            startsAt?: string | null | undefined;
            endsAt?: string | null | undefined;
            devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
            locales?: ("en" | "ar")[] | undefined;
        }>, {
            startsAt: string | null;
            endsAt: string | null;
            devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
            locales: ("en" | "ar")[];
        }, {
            startsAt?: string | null | undefined;
            endsAt?: string | null | undefined;
            devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
            locales?: ("en" | "ar")[] | undefined;
        }>;
        surface: z.ZodDefault<z.ZodEnum<["DEFAULT", "SOFT", "DARK", "ACCENT"]>>;
        spacing: z.ZodDefault<z.ZodEnum<["NONE", "SMALL", "MEDIUM", "LARGE"]>>;
        width: z.ZodDefault<z.ZodEnum<["CONTENT", "WIDE", "FULL"]>>;
    }, "strict", z.ZodTypeAny, {
        type: "PRODUCT_GRID";
        limit: number;
        id: string;
        description: {
            en: string;
            ar: string;
        };
        label: string;
        width: "CONTENT" | "WIDE" | "FULL";
        source: {
            productIds: string[];
            mode: "MANUAL";
        } | {
            mode: "CATEGORY";
            referenceId: string;
        } | {
            mode: "BRAND";
            referenceId: string;
        } | {
            mode: "TAG";
            referenceId: string;
        } | {
            mode: "PROMOTION";
            referenceId: string;
        } | {
            mode: "NEWEST";
        } | {
            mode: "FEATURED";
        };
        enabled: boolean;
        heading: {
            en: string;
            ar: string;
        };
        viewAllLabel: {
            en: string;
            ar: string;
        };
        destination: {
            type: "HOME";
        } | {
            type: "SHOP";
        } | {
            type: "OFFERS";
        } | {
            type: "NEW_ARRIVALS";
        } | {
            type: "ABOUT";
        } | {
            type: "CONTACT";
        } | {
            type: "CATEGORY";
            id: string;
        } | {
            type: "BRAND";
            id: string;
        } | {
            type: "PRODUCT";
            id: string;
        } | {
            type: "TAG";
            id: string;
        } | {
            path: string;
            type: "CUSTOM_PATH";
        } | {
            type: "EXTERNAL";
            url: string;
            newTab: boolean;
        } | {
            type: "PAGE";
            id: string;
        } | null;
        style: "COMPACT" | "CLEAN" | "EDITORIAL";
        visibility: {
            startsAt: string | null;
            endsAt: string | null;
            devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
            locales: ("en" | "ar")[];
        };
        showViewAll: boolean;
        columns: {
            desktop: number;
            tablet: number;
            mobile: number;
        };
        analyticsKey: string;
        surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
        spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
    }, {
        type: "PRODUCT_GRID";
        id: string;
        description: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        label: string;
        source: {
            mode: "MANUAL";
            productIds?: string[] | undefined;
        } | {
            mode: "CATEGORY";
            referenceId: string;
        } | {
            mode: "BRAND";
            referenceId: string;
        } | {
            mode: "TAG";
            referenceId: string;
        } | {
            mode: "PROMOTION";
            referenceId: string;
        } | {
            mode: "NEWEST";
        } | {
            mode: "FEATURED";
        };
        heading: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        viewAllLabel: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        visibility: {
            startsAt?: string | null | undefined;
            endsAt?: string | null | undefined;
            devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
            locales?: ("en" | "ar")[] | undefined;
        };
        columns: {
            desktop?: number | undefined;
            tablet?: number | undefined;
            mobile?: number | undefined;
        };
        analyticsKey: string;
        limit?: number | undefined;
        width?: "CONTENT" | "WIDE" | "FULL" | undefined;
        enabled?: boolean | undefined;
        destination?: {
            type: "HOME";
        } | {
            type: "SHOP";
        } | {
            type: "OFFERS";
        } | {
            type: "NEW_ARRIVALS";
        } | {
            type: "ABOUT";
        } | {
            type: "CONTACT";
        } | {
            type: "CATEGORY";
            id: string;
        } | {
            type: "BRAND";
            id: string;
        } | {
            type: "PRODUCT";
            id: string;
        } | {
            type: "TAG";
            id: string;
        } | {
            path: string;
            type: "CUSTOM_PATH";
        } | {
            type: "EXTERNAL";
            url: string;
            newTab?: boolean | undefined;
        } | {
            type: "PAGE";
            id: string;
        } | null | undefined;
        style?: "COMPACT" | "CLEAN" | "EDITORIAL" | undefined;
        showViewAll?: boolean | undefined;
        surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
        spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"PRODUCT_CAROUSEL">;
        autoplay: z.ZodDefault<z.ZodBoolean>;
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
        description: z.ZodObject<{} & {
            en: z.ZodDefault<z.ZodString>;
            ar: z.ZodDefault<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            en: string;
            ar: string;
        }, {
            en?: string | undefined;
            ar?: string | undefined;
        }>;
        source: z.ZodDiscriminatedUnion<"mode", [z.ZodObject<{
            mode: z.ZodLiteral<"MANUAL">;
            productIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        }, "strict", z.ZodTypeAny, {
            productIds: string[];
            mode: "MANUAL";
        }, {
            mode: "MANUAL";
            productIds?: string[] | undefined;
        }>, z.ZodObject<{
            mode: z.ZodLiteral<"CATEGORY">;
            referenceId: z.ZodString;
        }, "strict", z.ZodTypeAny, {
            mode: "CATEGORY";
            referenceId: string;
        }, {
            mode: "CATEGORY";
            referenceId: string;
        }>, z.ZodObject<{
            mode: z.ZodLiteral<"BRAND">;
            referenceId: z.ZodString;
        }, "strict", z.ZodTypeAny, {
            mode: "BRAND";
            referenceId: string;
        }, {
            mode: "BRAND";
            referenceId: string;
        }>, z.ZodObject<{
            mode: z.ZodLiteral<"TAG">;
            referenceId: z.ZodString;
        }, "strict", z.ZodTypeAny, {
            mode: "TAG";
            referenceId: string;
        }, {
            mode: "TAG";
            referenceId: string;
        }>, z.ZodObject<{
            mode: z.ZodLiteral<"PROMOTION">;
            referenceId: z.ZodString;
        }, "strict", z.ZodTypeAny, {
            mode: "PROMOTION";
            referenceId: string;
        }, {
            mode: "PROMOTION";
            referenceId: string;
        }>, z.ZodObject<{
            mode: z.ZodLiteral<"NEWEST">;
        }, "strict", z.ZodTypeAny, {
            mode: "NEWEST";
        }, {
            mode: "NEWEST";
        }>, z.ZodObject<{
            mode: z.ZodLiteral<"FEATURED">;
        }, "strict", z.ZodTypeAny, {
            mode: "FEATURED";
        }, {
            mode: "FEATURED";
        }>]>;
        limit: z.ZodDefault<z.ZodNumber>;
        columns: z.ZodObject<{
            desktop: z.ZodDefault<z.ZodNumber>;
            tablet: z.ZodDefault<z.ZodNumber>;
            mobile: z.ZodDefault<z.ZodNumber>;
        }, "strict", z.ZodTypeAny, {
            desktop: number;
            tablet: number;
            mobile: number;
        }, {
            desktop?: number | undefined;
            tablet?: number | undefined;
            mobile?: number | undefined;
        }>;
        showViewAll: z.ZodDefault<z.ZodBoolean>;
        viewAllLabel: z.ZodObject<{} & {
            en: z.ZodDefault<z.ZodString>;
            ar: z.ZodDefault<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            en: string;
            ar: string;
        }, {
            en?: string | undefined;
            ar?: string | undefined;
        }>;
        destination: z.ZodDefault<z.ZodNullable<z.ZodUnion<[z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
            type: z.ZodLiteral<"HOME">;
        }, "strip", z.ZodTypeAny, {
            type: "HOME";
        }, {
            type: "HOME";
        }>, z.ZodObject<{
            type: z.ZodLiteral<"SHOP">;
        }, "strip", z.ZodTypeAny, {
            type: "SHOP";
        }, {
            type: "SHOP";
        }>, z.ZodObject<{
            type: z.ZodLiteral<"OFFERS">;
        }, "strip", z.ZodTypeAny, {
            type: "OFFERS";
        }, {
            type: "OFFERS";
        }>, z.ZodObject<{
            type: z.ZodLiteral<"NEW_ARRIVALS">;
        }, "strip", z.ZodTypeAny, {
            type: "NEW_ARRIVALS";
        }, {
            type: "NEW_ARRIVALS";
        }>, z.ZodObject<{
            type: z.ZodLiteral<"ABOUT">;
        }, "strip", z.ZodTypeAny, {
            type: "ABOUT";
        }, {
            type: "ABOUT";
        }>, z.ZodObject<{
            type: z.ZodLiteral<"CONTACT">;
        }, "strip", z.ZodTypeAny, {
            type: "CONTACT";
        }, {
            type: "CONTACT";
        }>, z.ZodObject<{
            type: z.ZodLiteral<"CATEGORY">;
            id: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: "CATEGORY";
            id: string;
        }, {
            type: "CATEGORY";
            id: string;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"BRAND">;
            id: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: "BRAND";
            id: string;
        }, {
            type: "BRAND";
            id: string;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"PRODUCT">;
            id: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: "PRODUCT";
            id: string;
        }, {
            type: "PRODUCT";
            id: string;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"TAG">;
            id: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: "TAG";
            id: string;
        }, {
            type: "TAG";
            id: string;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"CUSTOM_PATH">;
            path: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            path: string;
            type: "CUSTOM_PATH";
        }, {
            path: string;
            type: "CUSTOM_PATH";
        }>, z.ZodObject<{
            type: z.ZodLiteral<"EXTERNAL">;
            url: z.ZodEffects<z.ZodString, string, string>;
            newTab: z.ZodDefault<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            type: "EXTERNAL";
            url: string;
            newTab: boolean;
        }, {
            type: "EXTERNAL";
            url: string;
            newTab?: boolean | undefined;
        }>]>, z.ZodObject<{
            type: z.ZodLiteral<"PAGE">;
            id: z.ZodString;
        }, "strict", z.ZodTypeAny, {
            type: "PAGE";
            id: string;
        }, {
            type: "PAGE";
            id: string;
        }>]>>>;
        style: z.ZodDefault<z.ZodEnum<["CLEAN", "EDITORIAL", "COMPACT"]>>;
        id: z.ZodString;
        analyticsKey: z.ZodString;
        label: z.ZodString;
        enabled: z.ZodDefault<z.ZodBoolean>;
        visibility: z.ZodEffects<z.ZodObject<{
            devices: z.ZodDefault<z.ZodArray<z.ZodEnum<["DESKTOP", "TABLET", "MOBILE"]>, "many">>;
            locales: z.ZodDefault<z.ZodArray<z.ZodEnum<["en", "ar"]>, "many">>;
            startsAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
            endsAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
            startsAt: string | null;
            endsAt: string | null;
            devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
            locales: ("en" | "ar")[];
        }, {
            startsAt?: string | null | undefined;
            endsAt?: string | null | undefined;
            devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
            locales?: ("en" | "ar")[] | undefined;
        }>, {
            startsAt: string | null;
            endsAt: string | null;
            devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
            locales: ("en" | "ar")[];
        }, {
            startsAt?: string | null | undefined;
            endsAt?: string | null | undefined;
            devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
            locales?: ("en" | "ar")[] | undefined;
        }>;
        surface: z.ZodDefault<z.ZodEnum<["DEFAULT", "SOFT", "DARK", "ACCENT"]>>;
        spacing: z.ZodDefault<z.ZodEnum<["NONE", "SMALL", "MEDIUM", "LARGE"]>>;
        width: z.ZodDefault<z.ZodEnum<["CONTENT", "WIDE", "FULL"]>>;
    }, "strict", z.ZodTypeAny, {
        type: "PRODUCT_CAROUSEL";
        limit: number;
        id: string;
        description: {
            en: string;
            ar: string;
        };
        label: string;
        width: "CONTENT" | "WIDE" | "FULL";
        source: {
            productIds: string[];
            mode: "MANUAL";
        } | {
            mode: "CATEGORY";
            referenceId: string;
        } | {
            mode: "BRAND";
            referenceId: string;
        } | {
            mode: "TAG";
            referenceId: string;
        } | {
            mode: "PROMOTION";
            referenceId: string;
        } | {
            mode: "NEWEST";
        } | {
            mode: "FEATURED";
        };
        enabled: boolean;
        heading: {
            en: string;
            ar: string;
        };
        viewAllLabel: {
            en: string;
            ar: string;
        };
        destination: {
            type: "HOME";
        } | {
            type: "SHOP";
        } | {
            type: "OFFERS";
        } | {
            type: "NEW_ARRIVALS";
        } | {
            type: "ABOUT";
        } | {
            type: "CONTACT";
        } | {
            type: "CATEGORY";
            id: string;
        } | {
            type: "BRAND";
            id: string;
        } | {
            type: "PRODUCT";
            id: string;
        } | {
            type: "TAG";
            id: string;
        } | {
            path: string;
            type: "CUSTOM_PATH";
        } | {
            type: "EXTERNAL";
            url: string;
            newTab: boolean;
        } | {
            type: "PAGE";
            id: string;
        } | null;
        style: "COMPACT" | "CLEAN" | "EDITORIAL";
        visibility: {
            startsAt: string | null;
            endsAt: string | null;
            devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
            locales: ("en" | "ar")[];
        };
        showViewAll: boolean;
        columns: {
            desktop: number;
            tablet: number;
            mobile: number;
        };
        analyticsKey: string;
        surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
        spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
        autoplay: boolean;
    }, {
        type: "PRODUCT_CAROUSEL";
        id: string;
        description: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        label: string;
        source: {
            mode: "MANUAL";
            productIds?: string[] | undefined;
        } | {
            mode: "CATEGORY";
            referenceId: string;
        } | {
            mode: "BRAND";
            referenceId: string;
        } | {
            mode: "TAG";
            referenceId: string;
        } | {
            mode: "PROMOTION";
            referenceId: string;
        } | {
            mode: "NEWEST";
        } | {
            mode: "FEATURED";
        };
        heading: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        viewAllLabel: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        visibility: {
            startsAt?: string | null | undefined;
            endsAt?: string | null | undefined;
            devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
            locales?: ("en" | "ar")[] | undefined;
        };
        columns: {
            desktop?: number | undefined;
            tablet?: number | undefined;
            mobile?: number | undefined;
        };
        analyticsKey: string;
        limit?: number | undefined;
        width?: "CONTENT" | "WIDE" | "FULL" | undefined;
        enabled?: boolean | undefined;
        destination?: {
            type: "HOME";
        } | {
            type: "SHOP";
        } | {
            type: "OFFERS";
        } | {
            type: "NEW_ARRIVALS";
        } | {
            type: "ABOUT";
        } | {
            type: "CONTACT";
        } | {
            type: "CATEGORY";
            id: string;
        } | {
            type: "BRAND";
            id: string;
        } | {
            type: "PRODUCT";
            id: string;
        } | {
            type: "TAG";
            id: string;
        } | {
            path: string;
            type: "CUSTOM_PATH";
        } | {
            type: "EXTERNAL";
            url: string;
            newTab?: boolean | undefined;
        } | {
            type: "PAGE";
            id: string;
        } | null | undefined;
        style?: "COMPACT" | "CLEAN" | "EDITORIAL" | undefined;
        showViewAll?: boolean | undefined;
        surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
        spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
        autoplay?: boolean | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"CATEGORIES">;
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
        description: z.ZodObject<{} & {
            en: z.ZodDefault<z.ZodString>;
            ar: z.ZodDefault<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            en: string;
            ar: string;
        }, {
            en?: string | undefined;
            ar?: string | undefined;
        }>;
        categoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        showChildren: z.ZodDefault<z.ZodBoolean>;
        showGrandchildren: z.ZodDefault<z.ZodBoolean>;
        limit: z.ZodDefault<z.ZodNumber>;
        layout: z.ZodDefault<z.ZodEnum<["CARDS", "IMAGE_TILES", "COMPACT", "EDITORIAL"]>>;
        id: z.ZodString;
        analyticsKey: z.ZodString;
        label: z.ZodString;
        enabled: z.ZodDefault<z.ZodBoolean>;
        visibility: z.ZodEffects<z.ZodObject<{
            devices: z.ZodDefault<z.ZodArray<z.ZodEnum<["DESKTOP", "TABLET", "MOBILE"]>, "many">>;
            locales: z.ZodDefault<z.ZodArray<z.ZodEnum<["en", "ar"]>, "many">>;
            startsAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
            endsAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
            startsAt: string | null;
            endsAt: string | null;
            devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
            locales: ("en" | "ar")[];
        }, {
            startsAt?: string | null | undefined;
            endsAt?: string | null | undefined;
            devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
            locales?: ("en" | "ar")[] | undefined;
        }>, {
            startsAt: string | null;
            endsAt: string | null;
            devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
            locales: ("en" | "ar")[];
        }, {
            startsAt?: string | null | undefined;
            endsAt?: string | null | undefined;
            devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
            locales?: ("en" | "ar")[] | undefined;
        }>;
        surface: z.ZodDefault<z.ZodEnum<["DEFAULT", "SOFT", "DARK", "ACCENT"]>>;
        spacing: z.ZodDefault<z.ZodEnum<["NONE", "SMALL", "MEDIUM", "LARGE"]>>;
        width: z.ZodDefault<z.ZodEnum<["CONTENT", "WIDE", "FULL"]>>;
    }, "strict", z.ZodTypeAny, {
        type: "CATEGORIES";
        limit: number;
        id: string;
        description: {
            en: string;
            ar: string;
        };
        label: string;
        width: "CONTENT" | "WIDE" | "FULL";
        enabled: boolean;
        categoryIds: string[];
        heading: {
            en: string;
            ar: string;
        };
        visibility: {
            startsAt: string | null;
            endsAt: string | null;
            devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
            locales: ("en" | "ar")[];
        };
        layout: "COMPACT" | "CARDS" | "EDITORIAL" | "IMAGE_TILES";
        analyticsKey: string;
        surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
        spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
        showChildren: boolean;
        showGrandchildren: boolean;
    }, {
        type: "CATEGORIES";
        id: string;
        description: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        label: string;
        heading: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        visibility: {
            startsAt?: string | null | undefined;
            endsAt?: string | null | undefined;
            devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
            locales?: ("en" | "ar")[] | undefined;
        };
        analyticsKey: string;
        limit?: number | undefined;
        width?: "CONTENT" | "WIDE" | "FULL" | undefined;
        enabled?: boolean | undefined;
        categoryIds?: string[] | undefined;
        layout?: "COMPACT" | "CARDS" | "EDITORIAL" | "IMAGE_TILES" | undefined;
        surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
        spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
        showChildren?: boolean | undefined;
        showGrandchildren?: boolean | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"BRANDS">;
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
        description: z.ZodObject<{} & {
            en: z.ZodDefault<z.ZodString>;
            ar: z.ZodDefault<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            en: string;
            ar: string;
        }, {
            en?: string | undefined;
            ar?: string | undefined;
        }>;
        mode: z.ZodDefault<z.ZodEnum<["MANUAL", "FEATURED"]>>;
        brandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        limit: z.ZodDefault<z.ZodNumber>;
        layout: z.ZodDefault<z.ZodEnum<["LOGO_RAIL", "LOGO_GRID", "EDITORIAL"]>>;
        id: z.ZodString;
        analyticsKey: z.ZodString;
        label: z.ZodString;
        enabled: z.ZodDefault<z.ZodBoolean>;
        visibility: z.ZodEffects<z.ZodObject<{
            devices: z.ZodDefault<z.ZodArray<z.ZodEnum<["DESKTOP", "TABLET", "MOBILE"]>, "many">>;
            locales: z.ZodDefault<z.ZodArray<z.ZodEnum<["en", "ar"]>, "many">>;
            startsAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
            endsAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
            startsAt: string | null;
            endsAt: string | null;
            devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
            locales: ("en" | "ar")[];
        }, {
            startsAt?: string | null | undefined;
            endsAt?: string | null | undefined;
            devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
            locales?: ("en" | "ar")[] | undefined;
        }>, {
            startsAt: string | null;
            endsAt: string | null;
            devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
            locales: ("en" | "ar")[];
        }, {
            startsAt?: string | null | undefined;
            endsAt?: string | null | undefined;
            devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
            locales?: ("en" | "ar")[] | undefined;
        }>;
        surface: z.ZodDefault<z.ZodEnum<["DEFAULT", "SOFT", "DARK", "ACCENT"]>>;
        spacing: z.ZodDefault<z.ZodEnum<["NONE", "SMALL", "MEDIUM", "LARGE"]>>;
        width: z.ZodDefault<z.ZodEnum<["CONTENT", "WIDE", "FULL"]>>;
    }, "strict", z.ZodTypeAny, {
        type: "BRANDS";
        limit: number;
        id: string;
        description: {
            en: string;
            ar: string;
        };
        label: string;
        width: "CONTENT" | "WIDE" | "FULL";
        enabled: boolean;
        brandIds: string[];
        heading: {
            en: string;
            ar: string;
        };
        visibility: {
            startsAt: string | null;
            endsAt: string | null;
            devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
            locales: ("en" | "ar")[];
        };
        mode: "MANUAL" | "FEATURED";
        layout: "LOGO_GRID" | "EDITORIAL" | "LOGO_RAIL";
        analyticsKey: string;
        surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
        spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
    }, {
        type: "BRANDS";
        id: string;
        description: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        label: string;
        heading: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        visibility: {
            startsAt?: string | null | undefined;
            endsAt?: string | null | undefined;
            devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
            locales?: ("en" | "ar")[] | undefined;
        };
        analyticsKey: string;
        limit?: number | undefined;
        width?: "CONTENT" | "WIDE" | "FULL" | undefined;
        enabled?: boolean | undefined;
        brandIds?: string[] | undefined;
        mode?: "MANUAL" | "FEATURED" | undefined;
        layout?: "LOGO_GRID" | "EDITORIAL" | "LOGO_RAIL" | undefined;
        surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
        spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"PROMOTION">;
        promotionId: z.ZodString;
        eyebrow: z.ZodObject<{} & {
            en: z.ZodDefault<z.ZodString>;
            ar: z.ZodDefault<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            en: string;
            ar: string;
        }, {
            en?: string | undefined;
            ar?: string | undefined;
        }>;
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
        description: z.ZodObject<{} & {
            en: z.ZodDefault<z.ZodString>;
            ar: z.ZodDefault<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            en: string;
            ar: string;
        }, {
            en?: string | undefined;
            ar?: string | undefined;
        }>;
        mediaAssetId: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        imageAlt: z.ZodObject<{
            en: z.ZodDefault<z.ZodString>;
            ar: z.ZodDefault<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            en: string;
            ar: string;
        }, {
            en?: string | undefined;
            ar?: string | undefined;
        }>;
        ctaLabel: z.ZodObject<{} & {
            en: z.ZodDefault<z.ZodString>;
            ar: z.ZodDefault<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            en: string;
            ar: string;
        }, {
            en?: string | undefined;
            ar?: string | undefined;
        }>;
        destination: z.ZodDefault<z.ZodNullable<z.ZodUnion<[z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
            type: z.ZodLiteral<"HOME">;
        }, "strip", z.ZodTypeAny, {
            type: "HOME";
        }, {
            type: "HOME";
        }>, z.ZodObject<{
            type: z.ZodLiteral<"SHOP">;
        }, "strip", z.ZodTypeAny, {
            type: "SHOP";
        }, {
            type: "SHOP";
        }>, z.ZodObject<{
            type: z.ZodLiteral<"OFFERS">;
        }, "strip", z.ZodTypeAny, {
            type: "OFFERS";
        }, {
            type: "OFFERS";
        }>, z.ZodObject<{
            type: z.ZodLiteral<"NEW_ARRIVALS">;
        }, "strip", z.ZodTypeAny, {
            type: "NEW_ARRIVALS";
        }, {
            type: "NEW_ARRIVALS";
        }>, z.ZodObject<{
            type: z.ZodLiteral<"ABOUT">;
        }, "strip", z.ZodTypeAny, {
            type: "ABOUT";
        }, {
            type: "ABOUT";
        }>, z.ZodObject<{
            type: z.ZodLiteral<"CONTACT">;
        }, "strip", z.ZodTypeAny, {
            type: "CONTACT";
        }, {
            type: "CONTACT";
        }>, z.ZodObject<{
            type: z.ZodLiteral<"CATEGORY">;
            id: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: "CATEGORY";
            id: string;
        }, {
            type: "CATEGORY";
            id: string;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"BRAND">;
            id: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: "BRAND";
            id: string;
        }, {
            type: "BRAND";
            id: string;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"PRODUCT">;
            id: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: "PRODUCT";
            id: string;
        }, {
            type: "PRODUCT";
            id: string;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"TAG">;
            id: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: "TAG";
            id: string;
        }, {
            type: "TAG";
            id: string;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"CUSTOM_PATH">;
            path: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            path: string;
            type: "CUSTOM_PATH";
        }, {
            path: string;
            type: "CUSTOM_PATH";
        }>, z.ZodObject<{
            type: z.ZodLiteral<"EXTERNAL">;
            url: z.ZodEffects<z.ZodString, string, string>;
            newTab: z.ZodDefault<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            type: "EXTERNAL";
            url: string;
            newTab: boolean;
        }, {
            type: "EXTERNAL";
            url: string;
            newTab?: boolean | undefined;
        }>]>, z.ZodObject<{
            type: z.ZodLiteral<"PAGE">;
            id: z.ZodString;
        }, "strict", z.ZodTypeAny, {
            type: "PAGE";
            id: string;
        }, {
            type: "PAGE";
            id: string;
        }>]>>>;
        expiredBehavior: z.ZodDefault<z.ZodEnum<["HIDE", "SHOW_EXPIRED"]>>;
        style: z.ZodDefault<z.ZodEnum<["BANNER", "EDITORIAL", "DARK"]>>;
        id: z.ZodString;
        analyticsKey: z.ZodString;
        label: z.ZodString;
        enabled: z.ZodDefault<z.ZodBoolean>;
        visibility: z.ZodEffects<z.ZodObject<{
            devices: z.ZodDefault<z.ZodArray<z.ZodEnum<["DESKTOP", "TABLET", "MOBILE"]>, "many">>;
            locales: z.ZodDefault<z.ZodArray<z.ZodEnum<["en", "ar"]>, "many">>;
            startsAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
            endsAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
            startsAt: string | null;
            endsAt: string | null;
            devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
            locales: ("en" | "ar")[];
        }, {
            startsAt?: string | null | undefined;
            endsAt?: string | null | undefined;
            devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
            locales?: ("en" | "ar")[] | undefined;
        }>, {
            startsAt: string | null;
            endsAt: string | null;
            devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
            locales: ("en" | "ar")[];
        }, {
            startsAt?: string | null | undefined;
            endsAt?: string | null | undefined;
            devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
            locales?: ("en" | "ar")[] | undefined;
        }>;
        surface: z.ZodDefault<z.ZodEnum<["DEFAULT", "SOFT", "DARK", "ACCENT"]>>;
        spacing: z.ZodDefault<z.ZodEnum<["NONE", "SMALL", "MEDIUM", "LARGE"]>>;
        width: z.ZodDefault<z.ZodEnum<["CONTENT", "WIDE", "FULL"]>>;
    }, "strict", z.ZodTypeAny, {
        type: "PROMOTION";
        id: string;
        description: {
            en: string;
            ar: string;
        };
        label: string;
        width: "CONTENT" | "WIDE" | "FULL";
        promotionId: string;
        enabled: boolean;
        heading: {
            en: string;
            ar: string;
        };
        eyebrow: {
            en: string;
            ar: string;
        };
        ctaLabel: {
            en: string;
            ar: string;
        };
        destination: {
            type: "HOME";
        } | {
            type: "SHOP";
        } | {
            type: "OFFERS";
        } | {
            type: "NEW_ARRIVALS";
        } | {
            type: "ABOUT";
        } | {
            type: "CONTACT";
        } | {
            type: "CATEGORY";
            id: string;
        } | {
            type: "BRAND";
            id: string;
        } | {
            type: "PRODUCT";
            id: string;
        } | {
            type: "TAG";
            id: string;
        } | {
            path: string;
            type: "CUSTOM_PATH";
        } | {
            type: "EXTERNAL";
            url: string;
            newTab: boolean;
        } | {
            type: "PAGE";
            id: string;
        } | null;
        mediaAssetId: string | null;
        imageAlt: {
            en: string;
            ar: string;
        };
        style: "DARK" | "EDITORIAL" | "BANNER";
        visibility: {
            startsAt: string | null;
            endsAt: string | null;
            devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
            locales: ("en" | "ar")[];
        };
        analyticsKey: string;
        surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
        spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
        expiredBehavior: "HIDE" | "SHOW_EXPIRED";
    }, {
        type: "PROMOTION";
        id: string;
        description: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        label: string;
        promotionId: string;
        heading: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        eyebrow: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        ctaLabel: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        imageAlt: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        visibility: {
            startsAt?: string | null | undefined;
            endsAt?: string | null | undefined;
            devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
            locales?: ("en" | "ar")[] | undefined;
        };
        analyticsKey: string;
        width?: "CONTENT" | "WIDE" | "FULL" | undefined;
        enabled?: boolean | undefined;
        destination?: {
            type: "HOME";
        } | {
            type: "SHOP";
        } | {
            type: "OFFERS";
        } | {
            type: "NEW_ARRIVALS";
        } | {
            type: "ABOUT";
        } | {
            type: "CONTACT";
        } | {
            type: "CATEGORY";
            id: string;
        } | {
            type: "BRAND";
            id: string;
        } | {
            type: "PRODUCT";
            id: string;
        } | {
            type: "TAG";
            id: string;
        } | {
            path: string;
            type: "CUSTOM_PATH";
        } | {
            type: "EXTERNAL";
            url: string;
            newTab?: boolean | undefined;
        } | {
            type: "PAGE";
            id: string;
        } | null | undefined;
        mediaAssetId?: string | null | undefined;
        style?: "DARK" | "EDITORIAL" | "BANNER" | undefined;
        surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
        spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
        expiredBehavior?: "HIDE" | "SHOW_EXPIRED" | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"ROUTINE_CTA">;
        eyebrow: z.ZodObject<{} & {
            en: z.ZodDefault<z.ZodString>;
            ar: z.ZodDefault<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            en: string;
            ar: string;
        }, {
            en?: string | undefined;
            ar?: string | undefined;
        }>;
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
        description: z.ZodObject<{} & {
            en: z.ZodDefault<z.ZodString>;
            ar: z.ZodDefault<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            en: string;
            ar: string;
        }, {
            en?: string | undefined;
            ar?: string | undefined;
        }>;
        mediaAssetId: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        imageAlt: z.ZodObject<{
            en: z.ZodDefault<z.ZodString>;
            ar: z.ZodDefault<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            en: string;
            ar: string;
        }, {
            en?: string | undefined;
            ar?: string | undefined;
        }>;
        ctaLabel: z.ZodObject<{} & {
            en: z.ZodDefault<z.ZodString>;
            ar: z.ZodDefault<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            en: string;
            ar: string;
        }, {
            en?: string | undefined;
            ar?: string | undefined;
        }>;
        destination: z.ZodDefault<z.ZodUnion<[z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
            type: z.ZodLiteral<"HOME">;
        }, "strip", z.ZodTypeAny, {
            type: "HOME";
        }, {
            type: "HOME";
        }>, z.ZodObject<{
            type: z.ZodLiteral<"SHOP">;
        }, "strip", z.ZodTypeAny, {
            type: "SHOP";
        }, {
            type: "SHOP";
        }>, z.ZodObject<{
            type: z.ZodLiteral<"OFFERS">;
        }, "strip", z.ZodTypeAny, {
            type: "OFFERS";
        }, {
            type: "OFFERS";
        }>, z.ZodObject<{
            type: z.ZodLiteral<"NEW_ARRIVALS">;
        }, "strip", z.ZodTypeAny, {
            type: "NEW_ARRIVALS";
        }, {
            type: "NEW_ARRIVALS";
        }>, z.ZodObject<{
            type: z.ZodLiteral<"ABOUT">;
        }, "strip", z.ZodTypeAny, {
            type: "ABOUT";
        }, {
            type: "ABOUT";
        }>, z.ZodObject<{
            type: z.ZodLiteral<"CONTACT">;
        }, "strip", z.ZodTypeAny, {
            type: "CONTACT";
        }, {
            type: "CONTACT";
        }>, z.ZodObject<{
            type: z.ZodLiteral<"CATEGORY">;
            id: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: "CATEGORY";
            id: string;
        }, {
            type: "CATEGORY";
            id: string;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"BRAND">;
            id: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: "BRAND";
            id: string;
        }, {
            type: "BRAND";
            id: string;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"PRODUCT">;
            id: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: "PRODUCT";
            id: string;
        }, {
            type: "PRODUCT";
            id: string;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"TAG">;
            id: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: "TAG";
            id: string;
        }, {
            type: "TAG";
            id: string;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"CUSTOM_PATH">;
            path: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            path: string;
            type: "CUSTOM_PATH";
        }, {
            path: string;
            type: "CUSTOM_PATH";
        }>, z.ZodObject<{
            type: z.ZodLiteral<"EXTERNAL">;
            url: z.ZodEffects<z.ZodString, string, string>;
            newTab: z.ZodDefault<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            type: "EXTERNAL";
            url: string;
            newTab: boolean;
        }, {
            type: "EXTERNAL";
            url: string;
            newTab?: boolean | undefined;
        }>]>, z.ZodObject<{
            type: z.ZodLiteral<"PAGE">;
            id: z.ZodString;
        }, "strict", z.ZodTypeAny, {
            type: "PAGE";
            id: string;
        }, {
            type: "PAGE";
            id: string;
        }>]>>;
        style: z.ZodDefault<z.ZodEnum<["EDITORIAL", "COMPACT", "DARK"]>>;
        id: z.ZodString;
        analyticsKey: z.ZodString;
        label: z.ZodString;
        enabled: z.ZodDefault<z.ZodBoolean>;
        visibility: z.ZodEffects<z.ZodObject<{
            devices: z.ZodDefault<z.ZodArray<z.ZodEnum<["DESKTOP", "TABLET", "MOBILE"]>, "many">>;
            locales: z.ZodDefault<z.ZodArray<z.ZodEnum<["en", "ar"]>, "many">>;
            startsAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
            endsAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
            startsAt: string | null;
            endsAt: string | null;
            devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
            locales: ("en" | "ar")[];
        }, {
            startsAt?: string | null | undefined;
            endsAt?: string | null | undefined;
            devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
            locales?: ("en" | "ar")[] | undefined;
        }>, {
            startsAt: string | null;
            endsAt: string | null;
            devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
            locales: ("en" | "ar")[];
        }, {
            startsAt?: string | null | undefined;
            endsAt?: string | null | undefined;
            devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
            locales?: ("en" | "ar")[] | undefined;
        }>;
        surface: z.ZodDefault<z.ZodEnum<["DEFAULT", "SOFT", "DARK", "ACCENT"]>>;
        spacing: z.ZodDefault<z.ZodEnum<["NONE", "SMALL", "MEDIUM", "LARGE"]>>;
        width: z.ZodDefault<z.ZodEnum<["CONTENT", "WIDE", "FULL"]>>;
    }, "strict", z.ZodTypeAny, {
        type: "ROUTINE_CTA";
        id: string;
        description: {
            en: string;
            ar: string;
        };
        label: string;
        width: "CONTENT" | "WIDE" | "FULL";
        enabled: boolean;
        heading: {
            en: string;
            ar: string;
        };
        eyebrow: {
            en: string;
            ar: string;
        };
        ctaLabel: {
            en: string;
            ar: string;
        };
        destination: {
            type: "HOME";
        } | {
            type: "SHOP";
        } | {
            type: "OFFERS";
        } | {
            type: "NEW_ARRIVALS";
        } | {
            type: "ABOUT";
        } | {
            type: "CONTACT";
        } | {
            type: "CATEGORY";
            id: string;
        } | {
            type: "BRAND";
            id: string;
        } | {
            type: "PRODUCT";
            id: string;
        } | {
            type: "TAG";
            id: string;
        } | {
            path: string;
            type: "CUSTOM_PATH";
        } | {
            type: "EXTERNAL";
            url: string;
            newTab: boolean;
        } | {
            type: "PAGE";
            id: string;
        };
        mediaAssetId: string | null;
        imageAlt: {
            en: string;
            ar: string;
        };
        style: "COMPACT" | "DARK" | "EDITORIAL";
        visibility: {
            startsAt: string | null;
            endsAt: string | null;
            devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
            locales: ("en" | "ar")[];
        };
        analyticsKey: string;
        surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
        spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
    }, {
        type: "ROUTINE_CTA";
        id: string;
        description: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        label: string;
        heading: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        eyebrow: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        ctaLabel: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        imageAlt: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        visibility: {
            startsAt?: string | null | undefined;
            endsAt?: string | null | undefined;
            devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
            locales?: ("en" | "ar")[] | undefined;
        };
        analyticsKey: string;
        width?: "CONTENT" | "WIDE" | "FULL" | undefined;
        enabled?: boolean | undefined;
        destination?: {
            type: "HOME";
        } | {
            type: "SHOP";
        } | {
            type: "OFFERS";
        } | {
            type: "NEW_ARRIVALS";
        } | {
            type: "ABOUT";
        } | {
            type: "CONTACT";
        } | {
            type: "CATEGORY";
            id: string;
        } | {
            type: "BRAND";
            id: string;
        } | {
            type: "PRODUCT";
            id: string;
        } | {
            type: "TAG";
            id: string;
        } | {
            path: string;
            type: "CUSTOM_PATH";
        } | {
            type: "EXTERNAL";
            url: string;
            newTab?: boolean | undefined;
        } | {
            type: "PAGE";
            id: string;
        } | undefined;
        mediaAssetId?: string | null | undefined;
        style?: "COMPACT" | "DARK" | "EDITORIAL" | undefined;
        surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
        spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"IMAGE_TEXT">;
        mediaAssetId: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        imageAlt: z.ZodObject<{
            en: z.ZodDefault<z.ZodString>;
            ar: z.ZodDefault<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            en: string;
            ar: string;
        }, {
            en?: string | undefined;
            ar?: string | undefined;
        }>;
        eyebrow: z.ZodObject<{} & {
            en: z.ZodDefault<z.ZodString>;
            ar: z.ZodDefault<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            en: string;
            ar: string;
        }, {
            en?: string | undefined;
            ar?: string | undefined;
        }>;
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
        body: z.ZodObject<{} & {
            en: z.ZodDefault<z.ZodString>;
            ar: z.ZodDefault<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            en: string;
            ar: string;
        }, {
            en?: string | undefined;
            ar?: string | undefined;
        }>;
        ctaLabel: z.ZodObject<{} & {
            en: z.ZodDefault<z.ZodString>;
            ar: z.ZodDefault<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            en: string;
            ar: string;
        }, {
            en?: string | undefined;
            ar?: string | undefined;
        }>;
        destination: z.ZodDefault<z.ZodNullable<z.ZodUnion<[z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
            type: z.ZodLiteral<"HOME">;
        }, "strip", z.ZodTypeAny, {
            type: "HOME";
        }, {
            type: "HOME";
        }>, z.ZodObject<{
            type: z.ZodLiteral<"SHOP">;
        }, "strip", z.ZodTypeAny, {
            type: "SHOP";
        }, {
            type: "SHOP";
        }>, z.ZodObject<{
            type: z.ZodLiteral<"OFFERS">;
        }, "strip", z.ZodTypeAny, {
            type: "OFFERS";
        }, {
            type: "OFFERS";
        }>, z.ZodObject<{
            type: z.ZodLiteral<"NEW_ARRIVALS">;
        }, "strip", z.ZodTypeAny, {
            type: "NEW_ARRIVALS";
        }, {
            type: "NEW_ARRIVALS";
        }>, z.ZodObject<{
            type: z.ZodLiteral<"ABOUT">;
        }, "strip", z.ZodTypeAny, {
            type: "ABOUT";
        }, {
            type: "ABOUT";
        }>, z.ZodObject<{
            type: z.ZodLiteral<"CONTACT">;
        }, "strip", z.ZodTypeAny, {
            type: "CONTACT";
        }, {
            type: "CONTACT";
        }>, z.ZodObject<{
            type: z.ZodLiteral<"CATEGORY">;
            id: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: "CATEGORY";
            id: string;
        }, {
            type: "CATEGORY";
            id: string;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"BRAND">;
            id: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: "BRAND";
            id: string;
        }, {
            type: "BRAND";
            id: string;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"PRODUCT">;
            id: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: "PRODUCT";
            id: string;
        }, {
            type: "PRODUCT";
            id: string;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"TAG">;
            id: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: "TAG";
            id: string;
        }, {
            type: "TAG";
            id: string;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"CUSTOM_PATH">;
            path: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            path: string;
            type: "CUSTOM_PATH";
        }, {
            path: string;
            type: "CUSTOM_PATH";
        }>, z.ZodObject<{
            type: z.ZodLiteral<"EXTERNAL">;
            url: z.ZodEffects<z.ZodString, string, string>;
            newTab: z.ZodDefault<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            type: "EXTERNAL";
            url: string;
            newTab: boolean;
        }, {
            type: "EXTERNAL";
            url: string;
            newTab?: boolean | undefined;
        }>]>, z.ZodObject<{
            type: z.ZodLiteral<"PAGE">;
            id: z.ZodString;
        }, "strict", z.ZodTypeAny, {
            type: "PAGE";
            id: string;
        }, {
            type: "PAGE";
            id: string;
        }>]>>>;
        imageSide: z.ZodDefault<z.ZodEnum<["START", "END"]>>;
        style: z.ZodDefault<z.ZodEnum<["EDITORIAL", "CONTAINED", "FULL_BLEED"]>>;
        id: z.ZodString;
        analyticsKey: z.ZodString;
        label: z.ZodString;
        enabled: z.ZodDefault<z.ZodBoolean>;
        visibility: z.ZodEffects<z.ZodObject<{
            devices: z.ZodDefault<z.ZodArray<z.ZodEnum<["DESKTOP", "TABLET", "MOBILE"]>, "many">>;
            locales: z.ZodDefault<z.ZodArray<z.ZodEnum<["en", "ar"]>, "many">>;
            startsAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
            endsAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
            startsAt: string | null;
            endsAt: string | null;
            devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
            locales: ("en" | "ar")[];
        }, {
            startsAt?: string | null | undefined;
            endsAt?: string | null | undefined;
            devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
            locales?: ("en" | "ar")[] | undefined;
        }>, {
            startsAt: string | null;
            endsAt: string | null;
            devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
            locales: ("en" | "ar")[];
        }, {
            startsAt?: string | null | undefined;
            endsAt?: string | null | undefined;
            devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
            locales?: ("en" | "ar")[] | undefined;
        }>;
        surface: z.ZodDefault<z.ZodEnum<["DEFAULT", "SOFT", "DARK", "ACCENT"]>>;
        spacing: z.ZodDefault<z.ZodEnum<["NONE", "SMALL", "MEDIUM", "LARGE"]>>;
        width: z.ZodDefault<z.ZodEnum<["CONTENT", "WIDE", "FULL"]>>;
    }, "strict", z.ZodTypeAny, {
        type: "IMAGE_TEXT";
        id: string;
        label: string;
        width: "CONTENT" | "WIDE" | "FULL";
        enabled: boolean;
        heading: {
            en: string;
            ar: string;
        };
        eyebrow: {
            en: string;
            ar: string;
        };
        ctaLabel: {
            en: string;
            ar: string;
        };
        destination: {
            type: "HOME";
        } | {
            type: "SHOP";
        } | {
            type: "OFFERS";
        } | {
            type: "NEW_ARRIVALS";
        } | {
            type: "ABOUT";
        } | {
            type: "CONTACT";
        } | {
            type: "CATEGORY";
            id: string;
        } | {
            type: "BRAND";
            id: string;
        } | {
            type: "PRODUCT";
            id: string;
        } | {
            type: "TAG";
            id: string;
        } | {
            path: string;
            type: "CUSTOM_PATH";
        } | {
            type: "EXTERNAL";
            url: string;
            newTab: boolean;
        } | {
            type: "PAGE";
            id: string;
        } | null;
        mediaAssetId: string | null;
        imageAlt: {
            en: string;
            ar: string;
        };
        style: "EDITORIAL" | "CONTAINED" | "FULL_BLEED";
        visibility: {
            startsAt: string | null;
            endsAt: string | null;
            devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
            locales: ("en" | "ar")[];
        };
        analyticsKey: string;
        surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
        spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
        body: {
            en: string;
            ar: string;
        };
        imageSide: "START" | "END";
    }, {
        type: "IMAGE_TEXT";
        id: string;
        label: string;
        heading: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        eyebrow: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        ctaLabel: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        imageAlt: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        visibility: {
            startsAt?: string | null | undefined;
            endsAt?: string | null | undefined;
            devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
            locales?: ("en" | "ar")[] | undefined;
        };
        analyticsKey: string;
        body: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        width?: "CONTENT" | "WIDE" | "FULL" | undefined;
        enabled?: boolean | undefined;
        destination?: {
            type: "HOME";
        } | {
            type: "SHOP";
        } | {
            type: "OFFERS";
        } | {
            type: "NEW_ARRIVALS";
        } | {
            type: "ABOUT";
        } | {
            type: "CONTACT";
        } | {
            type: "CATEGORY";
            id: string;
        } | {
            type: "BRAND";
            id: string;
        } | {
            type: "PRODUCT";
            id: string;
        } | {
            type: "TAG";
            id: string;
        } | {
            path: string;
            type: "CUSTOM_PATH";
        } | {
            type: "EXTERNAL";
            url: string;
            newTab?: boolean | undefined;
        } | {
            type: "PAGE";
            id: string;
        } | null | undefined;
        mediaAssetId?: string | null | undefined;
        style?: "EDITORIAL" | "CONTAINED" | "FULL_BLEED" | undefined;
        surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
        spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
        imageSide?: "START" | "END" | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"PROMO_BANNER">;
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
        description: z.ZodObject<{} & {
            en: z.ZodDefault<z.ZodString>;
            ar: z.ZodDefault<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            en: string;
            ar: string;
        }, {
            en?: string | undefined;
            ar?: string | undefined;
        }>;
        mediaAssetId: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        imageAlt: z.ZodObject<{
            en: z.ZodDefault<z.ZodString>;
            ar: z.ZodDefault<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            en: string;
            ar: string;
        }, {
            en?: string | undefined;
            ar?: string | undefined;
        }>;
        ctaLabel: z.ZodObject<{} & {
            en: z.ZodDefault<z.ZodString>;
            ar: z.ZodDefault<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            en: string;
            ar: string;
        }, {
            en?: string | undefined;
            ar?: string | undefined;
        }>;
        destination: z.ZodDefault<z.ZodNullable<z.ZodUnion<[z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
            type: z.ZodLiteral<"HOME">;
        }, "strip", z.ZodTypeAny, {
            type: "HOME";
        }, {
            type: "HOME";
        }>, z.ZodObject<{
            type: z.ZodLiteral<"SHOP">;
        }, "strip", z.ZodTypeAny, {
            type: "SHOP";
        }, {
            type: "SHOP";
        }>, z.ZodObject<{
            type: z.ZodLiteral<"OFFERS">;
        }, "strip", z.ZodTypeAny, {
            type: "OFFERS";
        }, {
            type: "OFFERS";
        }>, z.ZodObject<{
            type: z.ZodLiteral<"NEW_ARRIVALS">;
        }, "strip", z.ZodTypeAny, {
            type: "NEW_ARRIVALS";
        }, {
            type: "NEW_ARRIVALS";
        }>, z.ZodObject<{
            type: z.ZodLiteral<"ABOUT">;
        }, "strip", z.ZodTypeAny, {
            type: "ABOUT";
        }, {
            type: "ABOUT";
        }>, z.ZodObject<{
            type: z.ZodLiteral<"CONTACT">;
        }, "strip", z.ZodTypeAny, {
            type: "CONTACT";
        }, {
            type: "CONTACT";
        }>, z.ZodObject<{
            type: z.ZodLiteral<"CATEGORY">;
            id: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: "CATEGORY";
            id: string;
        }, {
            type: "CATEGORY";
            id: string;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"BRAND">;
            id: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: "BRAND";
            id: string;
        }, {
            type: "BRAND";
            id: string;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"PRODUCT">;
            id: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: "PRODUCT";
            id: string;
        }, {
            type: "PRODUCT";
            id: string;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"TAG">;
            id: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: "TAG";
            id: string;
        }, {
            type: "TAG";
            id: string;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"CUSTOM_PATH">;
            path: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            path: string;
            type: "CUSTOM_PATH";
        }, {
            path: string;
            type: "CUSTOM_PATH";
        }>, z.ZodObject<{
            type: z.ZodLiteral<"EXTERNAL">;
            url: z.ZodEffects<z.ZodString, string, string>;
            newTab: z.ZodDefault<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            type: "EXTERNAL";
            url: string;
            newTab: boolean;
        }, {
            type: "EXTERNAL";
            url: string;
            newTab?: boolean | undefined;
        }>]>, z.ZodObject<{
            type: z.ZodLiteral<"PAGE">;
            id: z.ZodString;
        }, "strict", z.ZodTypeAny, {
            type: "PAGE";
            id: string;
        }, {
            type: "PAGE";
            id: string;
        }>]>>>;
        style: z.ZodDefault<z.ZodEnum<["SOFT", "DARK", "ACCENT", "IMAGE"]>>;
        id: z.ZodString;
        analyticsKey: z.ZodString;
        label: z.ZodString;
        enabled: z.ZodDefault<z.ZodBoolean>;
        visibility: z.ZodEffects<z.ZodObject<{
            devices: z.ZodDefault<z.ZodArray<z.ZodEnum<["DESKTOP", "TABLET", "MOBILE"]>, "many">>;
            locales: z.ZodDefault<z.ZodArray<z.ZodEnum<["en", "ar"]>, "many">>;
            startsAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
            endsAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
            startsAt: string | null;
            endsAt: string | null;
            devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
            locales: ("en" | "ar")[];
        }, {
            startsAt?: string | null | undefined;
            endsAt?: string | null | undefined;
            devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
            locales?: ("en" | "ar")[] | undefined;
        }>, {
            startsAt: string | null;
            endsAt: string | null;
            devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
            locales: ("en" | "ar")[];
        }, {
            startsAt?: string | null | undefined;
            endsAt?: string | null | undefined;
            devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
            locales?: ("en" | "ar")[] | undefined;
        }>;
        surface: z.ZodDefault<z.ZodEnum<["DEFAULT", "SOFT", "DARK", "ACCENT"]>>;
        spacing: z.ZodDefault<z.ZodEnum<["NONE", "SMALL", "MEDIUM", "LARGE"]>>;
        width: z.ZodDefault<z.ZodEnum<["CONTENT", "WIDE", "FULL"]>>;
    }, "strict", z.ZodTypeAny, {
        type: "PROMO_BANNER";
        id: string;
        description: {
            en: string;
            ar: string;
        };
        label: string;
        width: "CONTENT" | "WIDE" | "FULL";
        enabled: boolean;
        heading: {
            en: string;
            ar: string;
        };
        ctaLabel: {
            en: string;
            ar: string;
        };
        destination: {
            type: "HOME";
        } | {
            type: "SHOP";
        } | {
            type: "OFFERS";
        } | {
            type: "NEW_ARRIVALS";
        } | {
            type: "ABOUT";
        } | {
            type: "CONTACT";
        } | {
            type: "CATEGORY";
            id: string;
        } | {
            type: "BRAND";
            id: string;
        } | {
            type: "PRODUCT";
            id: string;
        } | {
            type: "TAG";
            id: string;
        } | {
            path: string;
            type: "CUSTOM_PATH";
        } | {
            type: "EXTERNAL";
            url: string;
            newTab: boolean;
        } | {
            type: "PAGE";
            id: string;
        } | null;
        mediaAssetId: string | null;
        imageAlt: {
            en: string;
            ar: string;
        };
        style: "IMAGE" | "SOFT" | "DARK" | "ACCENT";
        visibility: {
            startsAt: string | null;
            endsAt: string | null;
            devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
            locales: ("en" | "ar")[];
        };
        analyticsKey: string;
        surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
        spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
    }, {
        type: "PROMO_BANNER";
        id: string;
        description: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        label: string;
        heading: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        ctaLabel: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        imageAlt: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        visibility: {
            startsAt?: string | null | undefined;
            endsAt?: string | null | undefined;
            devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
            locales?: ("en" | "ar")[] | undefined;
        };
        analyticsKey: string;
        width?: "CONTENT" | "WIDE" | "FULL" | undefined;
        enabled?: boolean | undefined;
        destination?: {
            type: "HOME";
        } | {
            type: "SHOP";
        } | {
            type: "OFFERS";
        } | {
            type: "NEW_ARRIVALS";
        } | {
            type: "ABOUT";
        } | {
            type: "CONTACT";
        } | {
            type: "CATEGORY";
            id: string;
        } | {
            type: "BRAND";
            id: string;
        } | {
            type: "PRODUCT";
            id: string;
        } | {
            type: "TAG";
            id: string;
        } | {
            path: string;
            type: "CUSTOM_PATH";
        } | {
            type: "EXTERNAL";
            url: string;
            newTab?: boolean | undefined;
        } | {
            type: "PAGE";
            id: string;
        } | null | undefined;
        mediaAssetId?: string | null | undefined;
        style?: "IMAGE" | "SOFT" | "DARK" | "ACCENT" | undefined;
        surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
        spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"COUNTDOWN">;
        eyebrow: z.ZodObject<{} & {
            en: z.ZodDefault<z.ZodString>;
            ar: z.ZodDefault<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            en: string;
            ar: string;
        }, {
            en?: string | undefined;
            ar?: string | undefined;
        }>;
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
        description: z.ZodObject<{} & {
            en: z.ZodDefault<z.ZodString>;
            ar: z.ZodDefault<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            en: string;
            ar: string;
        }, {
            en?: string | undefined;
            ar?: string | undefined;
        }>;
        endsAt: z.ZodString;
        expiredBehavior: z.ZodDefault<z.ZodEnum<["HIDE", "SHOW_EXPIRED"]>>;
        expiredMessage: z.ZodObject<{} & {
            en: z.ZodDefault<z.ZodString>;
            ar: z.ZodDefault<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            en: string;
            ar: string;
        }, {
            en?: string | undefined;
            ar?: string | undefined;
        }>;
        id: z.ZodString;
        analyticsKey: z.ZodString;
        label: z.ZodString;
        enabled: z.ZodDefault<z.ZodBoolean>;
        visibility: z.ZodEffects<z.ZodObject<{
            devices: z.ZodDefault<z.ZodArray<z.ZodEnum<["DESKTOP", "TABLET", "MOBILE"]>, "many">>;
            locales: z.ZodDefault<z.ZodArray<z.ZodEnum<["en", "ar"]>, "many">>;
            startsAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
            endsAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
            startsAt: string | null;
            endsAt: string | null;
            devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
            locales: ("en" | "ar")[];
        }, {
            startsAt?: string | null | undefined;
            endsAt?: string | null | undefined;
            devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
            locales?: ("en" | "ar")[] | undefined;
        }>, {
            startsAt: string | null;
            endsAt: string | null;
            devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
            locales: ("en" | "ar")[];
        }, {
            startsAt?: string | null | undefined;
            endsAt?: string | null | undefined;
            devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
            locales?: ("en" | "ar")[] | undefined;
        }>;
        surface: z.ZodDefault<z.ZodEnum<["DEFAULT", "SOFT", "DARK", "ACCENT"]>>;
        spacing: z.ZodDefault<z.ZodEnum<["NONE", "SMALL", "MEDIUM", "LARGE"]>>;
        width: z.ZodDefault<z.ZodEnum<["CONTENT", "WIDE", "FULL"]>>;
    }, "strict", z.ZodTypeAny, {
        type: "COUNTDOWN";
        id: string;
        description: {
            en: string;
            ar: string;
        };
        label: string;
        width: "CONTENT" | "WIDE" | "FULL";
        enabled: boolean;
        endsAt: string;
        heading: {
            en: string;
            ar: string;
        };
        eyebrow: {
            en: string;
            ar: string;
        };
        visibility: {
            startsAt: string | null;
            endsAt: string | null;
            devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
            locales: ("en" | "ar")[];
        };
        analyticsKey: string;
        surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
        spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
        expiredBehavior: "HIDE" | "SHOW_EXPIRED";
        expiredMessage: {
            en: string;
            ar: string;
        };
    }, {
        type: "COUNTDOWN";
        id: string;
        description: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        label: string;
        endsAt: string;
        heading: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        eyebrow: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        visibility: {
            startsAt?: string | null | undefined;
            endsAt?: string | null | undefined;
            devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
            locales?: ("en" | "ar")[] | undefined;
        };
        analyticsKey: string;
        expiredMessage: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        width?: "CONTENT" | "WIDE" | "FULL" | undefined;
        enabled?: boolean | undefined;
        surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
        spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
        expiredBehavior?: "HIDE" | "SHOW_EXPIRED" | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"NEWSLETTER">;
        eyebrow: z.ZodObject<{} & {
            en: z.ZodDefault<z.ZodString>;
            ar: z.ZodDefault<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            en: string;
            ar: string;
        }, {
            en?: string | undefined;
            ar?: string | undefined;
        }>;
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
        description: z.ZodObject<{} & {
            en: z.ZodDefault<z.ZodString>;
            ar: z.ZodDefault<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            en: string;
            ar: string;
        }, {
            en?: string | undefined;
            ar?: string | undefined;
        }>;
        style: z.ZodDefault<z.ZodEnum<["COMPACT", "EDITORIAL", "DARK"]>>;
        id: z.ZodString;
        analyticsKey: z.ZodString;
        label: z.ZodString;
        enabled: z.ZodDefault<z.ZodBoolean>;
        visibility: z.ZodEffects<z.ZodObject<{
            devices: z.ZodDefault<z.ZodArray<z.ZodEnum<["DESKTOP", "TABLET", "MOBILE"]>, "many">>;
            locales: z.ZodDefault<z.ZodArray<z.ZodEnum<["en", "ar"]>, "many">>;
            startsAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
            endsAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
            startsAt: string | null;
            endsAt: string | null;
            devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
            locales: ("en" | "ar")[];
        }, {
            startsAt?: string | null | undefined;
            endsAt?: string | null | undefined;
            devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
            locales?: ("en" | "ar")[] | undefined;
        }>, {
            startsAt: string | null;
            endsAt: string | null;
            devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
            locales: ("en" | "ar")[];
        }, {
            startsAt?: string | null | undefined;
            endsAt?: string | null | undefined;
            devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
            locales?: ("en" | "ar")[] | undefined;
        }>;
        surface: z.ZodDefault<z.ZodEnum<["DEFAULT", "SOFT", "DARK", "ACCENT"]>>;
        spacing: z.ZodDefault<z.ZodEnum<["NONE", "SMALL", "MEDIUM", "LARGE"]>>;
        width: z.ZodDefault<z.ZodEnum<["CONTENT", "WIDE", "FULL"]>>;
    }, "strict", z.ZodTypeAny, {
        type: "NEWSLETTER";
        id: string;
        description: {
            en: string;
            ar: string;
        };
        label: string;
        width: "CONTENT" | "WIDE" | "FULL";
        enabled: boolean;
        heading: {
            en: string;
            ar: string;
        };
        eyebrow: {
            en: string;
            ar: string;
        };
        style: "COMPACT" | "DARK" | "EDITORIAL";
        visibility: {
            startsAt: string | null;
            endsAt: string | null;
            devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
            locales: ("en" | "ar")[];
        };
        analyticsKey: string;
        surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
        spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
    }, {
        type: "NEWSLETTER";
        id: string;
        description: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        label: string;
        heading: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        eyebrow: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        visibility: {
            startsAt?: string | null | undefined;
            endsAt?: string | null | undefined;
            devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
            locales?: ("en" | "ar")[] | undefined;
        };
        analyticsKey: string;
        width?: "CONTENT" | "WIDE" | "FULL" | undefined;
        enabled?: boolean | undefined;
        style?: "COMPACT" | "DARK" | "EDITORIAL" | undefined;
        surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
        spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"FAQ">;
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
        description: z.ZodObject<{} & {
            en: z.ZodDefault<z.ZodString>;
            ar: z.ZodDefault<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            en: string;
            ar: string;
        }, {
            en?: string | undefined;
            ar?: string | undefined;
        }>;
        items: z.ZodDefault<z.ZodArray<z.ZodObject<{
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
            answer: z.ZodObject<{} & {
                en: z.ZodDefault<z.ZodString>;
                ar: z.ZodDefault<z.ZodString>;
            }, "strict", z.ZodTypeAny, {
                en: string;
                ar: string;
            }, {
                en?: string | undefined;
                ar?: string | undefined;
            }>;
        }, "strict", z.ZodTypeAny, {
            id: string;
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
            question: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            answer: {
                en?: string | undefined;
                ar?: string | undefined;
            };
        }>, "many">>;
        id: z.ZodString;
        analyticsKey: z.ZodString;
        label: z.ZodString;
        enabled: z.ZodDefault<z.ZodBoolean>;
        visibility: z.ZodEffects<z.ZodObject<{
            devices: z.ZodDefault<z.ZodArray<z.ZodEnum<["DESKTOP", "TABLET", "MOBILE"]>, "many">>;
            locales: z.ZodDefault<z.ZodArray<z.ZodEnum<["en", "ar"]>, "many">>;
            startsAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
            endsAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
            startsAt: string | null;
            endsAt: string | null;
            devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
            locales: ("en" | "ar")[];
        }, {
            startsAt?: string | null | undefined;
            endsAt?: string | null | undefined;
            devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
            locales?: ("en" | "ar")[] | undefined;
        }>, {
            startsAt: string | null;
            endsAt: string | null;
            devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
            locales: ("en" | "ar")[];
        }, {
            startsAt?: string | null | undefined;
            endsAt?: string | null | undefined;
            devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
            locales?: ("en" | "ar")[] | undefined;
        }>;
        surface: z.ZodDefault<z.ZodEnum<["DEFAULT", "SOFT", "DARK", "ACCENT"]>>;
        spacing: z.ZodDefault<z.ZodEnum<["NONE", "SMALL", "MEDIUM", "LARGE"]>>;
        width: z.ZodDefault<z.ZodEnum<["CONTENT", "WIDE", "FULL"]>>;
    }, "strict", z.ZodTypeAny, {
        type: "FAQ";
        id: string;
        description: {
            en: string;
            ar: string;
        };
        label: string;
        width: "CONTENT" | "WIDE" | "FULL";
        items: {
            id: string;
            question: {
                en: string;
                ar: string;
            };
            answer: {
                en: string;
                ar: string;
            };
        }[];
        enabled: boolean;
        heading: {
            en: string;
            ar: string;
        };
        visibility: {
            startsAt: string | null;
            endsAt: string | null;
            devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
            locales: ("en" | "ar")[];
        };
        analyticsKey: string;
        surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
        spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
    }, {
        type: "FAQ";
        id: string;
        description: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        label: string;
        heading: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        visibility: {
            startsAt?: string | null | undefined;
            endsAt?: string | null | undefined;
            devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
            locales?: ("en" | "ar")[] | undefined;
        };
        analyticsKey: string;
        width?: "CONTENT" | "WIDE" | "FULL" | undefined;
        items?: {
            id: string;
            question: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            answer: {
                en?: string | undefined;
                ar?: string | undefined;
            };
        }[] | undefined;
        enabled?: boolean | undefined;
        surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
        spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"SPACER">;
        size: z.ZodDefault<z.ZodEnum<["SMALL", "MEDIUM", "LARGE"]>>;
        id: z.ZodString;
        analyticsKey: z.ZodString;
        label: z.ZodString;
        enabled: z.ZodDefault<z.ZodBoolean>;
        visibility: z.ZodEffects<z.ZodObject<{
            devices: z.ZodDefault<z.ZodArray<z.ZodEnum<["DESKTOP", "TABLET", "MOBILE"]>, "many">>;
            locales: z.ZodDefault<z.ZodArray<z.ZodEnum<["en", "ar"]>, "many">>;
            startsAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
            endsAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
            startsAt: string | null;
            endsAt: string | null;
            devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
            locales: ("en" | "ar")[];
        }, {
            startsAt?: string | null | undefined;
            endsAt?: string | null | undefined;
            devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
            locales?: ("en" | "ar")[] | undefined;
        }>, {
            startsAt: string | null;
            endsAt: string | null;
            devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
            locales: ("en" | "ar")[];
        }, {
            startsAt?: string | null | undefined;
            endsAt?: string | null | undefined;
            devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
            locales?: ("en" | "ar")[] | undefined;
        }>;
        surface: z.ZodDefault<z.ZodEnum<["DEFAULT", "SOFT", "DARK", "ACCENT"]>>;
        spacing: z.ZodDefault<z.ZodEnum<["NONE", "SMALL", "MEDIUM", "LARGE"]>>;
        width: z.ZodDefault<z.ZodEnum<["CONTENT", "WIDE", "FULL"]>>;
    }, "strict", z.ZodTypeAny, {
        type: "SPACER";
        id: string;
        label: string;
        width: "CONTENT" | "WIDE" | "FULL";
        enabled: boolean;
        visibility: {
            startsAt: string | null;
            endsAt: string | null;
            devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
            locales: ("en" | "ar")[];
        };
        size: "SMALL" | "MEDIUM" | "LARGE";
        analyticsKey: string;
        surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
        spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
    }, {
        type: "SPACER";
        id: string;
        label: string;
        visibility: {
            startsAt?: string | null | undefined;
            endsAt?: string | null | undefined;
            devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
            locales?: ("en" | "ar")[] | undefined;
        };
        analyticsKey: string;
        width?: "CONTENT" | "WIDE" | "FULL" | undefined;
        enabled?: boolean | undefined;
        size?: "SMALL" | "MEDIUM" | "LARGE" | undefined;
        surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
        spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
    }>, z.ZodObject<{
        type: z.ZodLiteral<"DIVIDER">;
        id: z.ZodString;
        analyticsKey: z.ZodString;
        label: z.ZodString;
        enabled: z.ZodDefault<z.ZodBoolean>;
        visibility: z.ZodEffects<z.ZodObject<{
            devices: z.ZodDefault<z.ZodArray<z.ZodEnum<["DESKTOP", "TABLET", "MOBILE"]>, "many">>;
            locales: z.ZodDefault<z.ZodArray<z.ZodEnum<["en", "ar"]>, "many">>;
            startsAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
            endsAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
            startsAt: string | null;
            endsAt: string | null;
            devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
            locales: ("en" | "ar")[];
        }, {
            startsAt?: string | null | undefined;
            endsAt?: string | null | undefined;
            devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
            locales?: ("en" | "ar")[] | undefined;
        }>, {
            startsAt: string | null;
            endsAt: string | null;
            devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
            locales: ("en" | "ar")[];
        }, {
            startsAt?: string | null | undefined;
            endsAt?: string | null | undefined;
            devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
            locales?: ("en" | "ar")[] | undefined;
        }>;
        surface: z.ZodDefault<z.ZodEnum<["DEFAULT", "SOFT", "DARK", "ACCENT"]>>;
        spacing: z.ZodDefault<z.ZodEnum<["NONE", "SMALL", "MEDIUM", "LARGE"]>>;
        width: z.ZodDefault<z.ZodEnum<["CONTENT", "WIDE", "FULL"]>>;
    }, "strict", z.ZodTypeAny, {
        type: "DIVIDER";
        id: string;
        label: string;
        width: "CONTENT" | "WIDE" | "FULL";
        enabled: boolean;
        visibility: {
            startsAt: string | null;
            endsAt: string | null;
            devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
            locales: ("en" | "ar")[];
        };
        analyticsKey: string;
        surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
        spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
    }, {
        type: "DIVIDER";
        id: string;
        label: string;
        visibility: {
            startsAt?: string | null | undefined;
            endsAt?: string | null | undefined;
            devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
            locales?: ("en" | "ar")[] | undefined;
        };
        analyticsKey: string;
        width?: "CONTENT" | "WIDE" | "FULL" | undefined;
        enabled?: boolean | undefined;
        surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
        spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
    }>]>, "many">;
}, "strict", z.ZodTypeAny, {
    title: {
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
        canonicalPath: string | null;
        openGraphMediaId: string | null;
        indexable: boolean;
    };
    sections: ({
        type: "HERO";
        id: string;
        description: {
            en: string;
            ar: string;
        };
        label: string;
        width: "CONTENT" | "WIDE" | "FULL";
        enabled: boolean;
        heading: {
            en: string;
            ar: string;
        };
        eyebrow: {
            en: string;
            ar: string;
        };
        imageAlt: {
            en: string;
            ar: string;
        };
        visibility: {
            startsAt: string | null;
            endsAt: string | null;
            devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
            locales: ("en" | "ar")[];
        };
        alignment: "START" | "CENTER" | "END";
        desktopMediaId: string | null;
        mobileMediaId: string | null;
        primaryCtaLabel: {
            en: string;
            ar: string;
        };
        primaryDestination: {
            type: "HOME";
        } | {
            type: "SHOP";
        } | {
            type: "OFFERS";
        } | {
            type: "NEW_ARRIVALS";
        } | {
            type: "ABOUT";
        } | {
            type: "CONTACT";
        } | {
            type: "CATEGORY";
            id: string;
        } | {
            type: "BRAND";
            id: string;
        } | {
            type: "PRODUCT";
            id: string;
        } | {
            type: "TAG";
            id: string;
        } | {
            path: string;
            type: "CUSTOM_PATH";
        } | {
            type: "EXTERNAL";
            url: string;
            newTab: boolean;
        } | {
            type: "PAGE";
            id: string;
        } | null;
        secondaryCtaLabel: {
            en: string;
            ar: string;
        };
        secondaryDestination: {
            type: "HOME";
        } | {
            type: "SHOP";
        } | {
            type: "OFFERS";
        } | {
            type: "NEW_ARRIVALS";
        } | {
            type: "ABOUT";
        } | {
            type: "CONTACT";
        } | {
            type: "CATEGORY";
            id: string;
        } | {
            type: "BRAND";
            id: string;
        } | {
            type: "PRODUCT";
            id: string;
        } | {
            type: "TAG";
            id: string;
        } | {
            path: string;
            type: "CUSTOM_PATH";
        } | {
            type: "EXTERNAL";
            url: string;
            newTab: boolean;
        } | {
            type: "PAGE";
            id: string;
        } | null;
        layout: "SPLIT" | "FULL" | "CONTAINED";
        contentPosition: "CENTER" | "TOP" | "BOTTOM";
        overlay: "NONE" | "MEDIUM" | "LIGHT" | "STRONG";
        headingLevel: "H1" | "H2";
        analyticsKey: string;
        surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
        spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
    } | {
        type: "PRODUCT_GRID";
        limit: number;
        id: string;
        description: {
            en: string;
            ar: string;
        };
        label: string;
        width: "CONTENT" | "WIDE" | "FULL";
        source: {
            productIds: string[];
            mode: "MANUAL";
        } | {
            mode: "CATEGORY";
            referenceId: string;
        } | {
            mode: "BRAND";
            referenceId: string;
        } | {
            mode: "TAG";
            referenceId: string;
        } | {
            mode: "PROMOTION";
            referenceId: string;
        } | {
            mode: "NEWEST";
        } | {
            mode: "FEATURED";
        };
        enabled: boolean;
        heading: {
            en: string;
            ar: string;
        };
        viewAllLabel: {
            en: string;
            ar: string;
        };
        destination: {
            type: "HOME";
        } | {
            type: "SHOP";
        } | {
            type: "OFFERS";
        } | {
            type: "NEW_ARRIVALS";
        } | {
            type: "ABOUT";
        } | {
            type: "CONTACT";
        } | {
            type: "CATEGORY";
            id: string;
        } | {
            type: "BRAND";
            id: string;
        } | {
            type: "PRODUCT";
            id: string;
        } | {
            type: "TAG";
            id: string;
        } | {
            path: string;
            type: "CUSTOM_PATH";
        } | {
            type: "EXTERNAL";
            url: string;
            newTab: boolean;
        } | {
            type: "PAGE";
            id: string;
        } | null;
        style: "COMPACT" | "CLEAN" | "EDITORIAL";
        visibility: {
            startsAt: string | null;
            endsAt: string | null;
            devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
            locales: ("en" | "ar")[];
        };
        showViewAll: boolean;
        columns: {
            desktop: number;
            tablet: number;
            mobile: number;
        };
        analyticsKey: string;
        surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
        spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
    } | {
        type: "PRODUCT_CAROUSEL";
        limit: number;
        id: string;
        description: {
            en: string;
            ar: string;
        };
        label: string;
        width: "CONTENT" | "WIDE" | "FULL";
        source: {
            productIds: string[];
            mode: "MANUAL";
        } | {
            mode: "CATEGORY";
            referenceId: string;
        } | {
            mode: "BRAND";
            referenceId: string;
        } | {
            mode: "TAG";
            referenceId: string;
        } | {
            mode: "PROMOTION";
            referenceId: string;
        } | {
            mode: "NEWEST";
        } | {
            mode: "FEATURED";
        };
        enabled: boolean;
        heading: {
            en: string;
            ar: string;
        };
        viewAllLabel: {
            en: string;
            ar: string;
        };
        destination: {
            type: "HOME";
        } | {
            type: "SHOP";
        } | {
            type: "OFFERS";
        } | {
            type: "NEW_ARRIVALS";
        } | {
            type: "ABOUT";
        } | {
            type: "CONTACT";
        } | {
            type: "CATEGORY";
            id: string;
        } | {
            type: "BRAND";
            id: string;
        } | {
            type: "PRODUCT";
            id: string;
        } | {
            type: "TAG";
            id: string;
        } | {
            path: string;
            type: "CUSTOM_PATH";
        } | {
            type: "EXTERNAL";
            url: string;
            newTab: boolean;
        } | {
            type: "PAGE";
            id: string;
        } | null;
        style: "COMPACT" | "CLEAN" | "EDITORIAL";
        visibility: {
            startsAt: string | null;
            endsAt: string | null;
            devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
            locales: ("en" | "ar")[];
        };
        showViewAll: boolean;
        columns: {
            desktop: number;
            tablet: number;
            mobile: number;
        };
        analyticsKey: string;
        surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
        spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
        autoplay: boolean;
    } | {
        type: "CATEGORIES";
        limit: number;
        id: string;
        description: {
            en: string;
            ar: string;
        };
        label: string;
        width: "CONTENT" | "WIDE" | "FULL";
        enabled: boolean;
        categoryIds: string[];
        heading: {
            en: string;
            ar: string;
        };
        visibility: {
            startsAt: string | null;
            endsAt: string | null;
            devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
            locales: ("en" | "ar")[];
        };
        layout: "COMPACT" | "CARDS" | "EDITORIAL" | "IMAGE_TILES";
        analyticsKey: string;
        surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
        spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
        showChildren: boolean;
        showGrandchildren: boolean;
    } | {
        type: "BRANDS";
        limit: number;
        id: string;
        description: {
            en: string;
            ar: string;
        };
        label: string;
        width: "CONTENT" | "WIDE" | "FULL";
        enabled: boolean;
        brandIds: string[];
        heading: {
            en: string;
            ar: string;
        };
        visibility: {
            startsAt: string | null;
            endsAt: string | null;
            devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
            locales: ("en" | "ar")[];
        };
        mode: "MANUAL" | "FEATURED";
        layout: "LOGO_GRID" | "EDITORIAL" | "LOGO_RAIL";
        analyticsKey: string;
        surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
        spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
    } | {
        type: "PROMOTION";
        id: string;
        description: {
            en: string;
            ar: string;
        };
        label: string;
        width: "CONTENT" | "WIDE" | "FULL";
        promotionId: string;
        enabled: boolean;
        heading: {
            en: string;
            ar: string;
        };
        eyebrow: {
            en: string;
            ar: string;
        };
        ctaLabel: {
            en: string;
            ar: string;
        };
        destination: {
            type: "HOME";
        } | {
            type: "SHOP";
        } | {
            type: "OFFERS";
        } | {
            type: "NEW_ARRIVALS";
        } | {
            type: "ABOUT";
        } | {
            type: "CONTACT";
        } | {
            type: "CATEGORY";
            id: string;
        } | {
            type: "BRAND";
            id: string;
        } | {
            type: "PRODUCT";
            id: string;
        } | {
            type: "TAG";
            id: string;
        } | {
            path: string;
            type: "CUSTOM_PATH";
        } | {
            type: "EXTERNAL";
            url: string;
            newTab: boolean;
        } | {
            type: "PAGE";
            id: string;
        } | null;
        mediaAssetId: string | null;
        imageAlt: {
            en: string;
            ar: string;
        };
        style: "DARK" | "EDITORIAL" | "BANNER";
        visibility: {
            startsAt: string | null;
            endsAt: string | null;
            devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
            locales: ("en" | "ar")[];
        };
        analyticsKey: string;
        surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
        spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
        expiredBehavior: "HIDE" | "SHOW_EXPIRED";
    } | {
        type: "ROUTINE_CTA";
        id: string;
        description: {
            en: string;
            ar: string;
        };
        label: string;
        width: "CONTENT" | "WIDE" | "FULL";
        enabled: boolean;
        heading: {
            en: string;
            ar: string;
        };
        eyebrow: {
            en: string;
            ar: string;
        };
        ctaLabel: {
            en: string;
            ar: string;
        };
        destination: {
            type: "HOME";
        } | {
            type: "SHOP";
        } | {
            type: "OFFERS";
        } | {
            type: "NEW_ARRIVALS";
        } | {
            type: "ABOUT";
        } | {
            type: "CONTACT";
        } | {
            type: "CATEGORY";
            id: string;
        } | {
            type: "BRAND";
            id: string;
        } | {
            type: "PRODUCT";
            id: string;
        } | {
            type: "TAG";
            id: string;
        } | {
            path: string;
            type: "CUSTOM_PATH";
        } | {
            type: "EXTERNAL";
            url: string;
            newTab: boolean;
        } | {
            type: "PAGE";
            id: string;
        };
        mediaAssetId: string | null;
        imageAlt: {
            en: string;
            ar: string;
        };
        style: "COMPACT" | "DARK" | "EDITORIAL";
        visibility: {
            startsAt: string | null;
            endsAt: string | null;
            devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
            locales: ("en" | "ar")[];
        };
        analyticsKey: string;
        surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
        spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
    } | {
        type: "IMAGE_TEXT";
        id: string;
        label: string;
        width: "CONTENT" | "WIDE" | "FULL";
        enabled: boolean;
        heading: {
            en: string;
            ar: string;
        };
        eyebrow: {
            en: string;
            ar: string;
        };
        ctaLabel: {
            en: string;
            ar: string;
        };
        destination: {
            type: "HOME";
        } | {
            type: "SHOP";
        } | {
            type: "OFFERS";
        } | {
            type: "NEW_ARRIVALS";
        } | {
            type: "ABOUT";
        } | {
            type: "CONTACT";
        } | {
            type: "CATEGORY";
            id: string;
        } | {
            type: "BRAND";
            id: string;
        } | {
            type: "PRODUCT";
            id: string;
        } | {
            type: "TAG";
            id: string;
        } | {
            path: string;
            type: "CUSTOM_PATH";
        } | {
            type: "EXTERNAL";
            url: string;
            newTab: boolean;
        } | {
            type: "PAGE";
            id: string;
        } | null;
        mediaAssetId: string | null;
        imageAlt: {
            en: string;
            ar: string;
        };
        style: "EDITORIAL" | "CONTAINED" | "FULL_BLEED";
        visibility: {
            startsAt: string | null;
            endsAt: string | null;
            devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
            locales: ("en" | "ar")[];
        };
        analyticsKey: string;
        surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
        spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
        body: {
            en: string;
            ar: string;
        };
        imageSide: "START" | "END";
    } | {
        type: "PROMO_BANNER";
        id: string;
        description: {
            en: string;
            ar: string;
        };
        label: string;
        width: "CONTENT" | "WIDE" | "FULL";
        enabled: boolean;
        heading: {
            en: string;
            ar: string;
        };
        ctaLabel: {
            en: string;
            ar: string;
        };
        destination: {
            type: "HOME";
        } | {
            type: "SHOP";
        } | {
            type: "OFFERS";
        } | {
            type: "NEW_ARRIVALS";
        } | {
            type: "ABOUT";
        } | {
            type: "CONTACT";
        } | {
            type: "CATEGORY";
            id: string;
        } | {
            type: "BRAND";
            id: string;
        } | {
            type: "PRODUCT";
            id: string;
        } | {
            type: "TAG";
            id: string;
        } | {
            path: string;
            type: "CUSTOM_PATH";
        } | {
            type: "EXTERNAL";
            url: string;
            newTab: boolean;
        } | {
            type: "PAGE";
            id: string;
        } | null;
        mediaAssetId: string | null;
        imageAlt: {
            en: string;
            ar: string;
        };
        style: "IMAGE" | "SOFT" | "DARK" | "ACCENT";
        visibility: {
            startsAt: string | null;
            endsAt: string | null;
            devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
            locales: ("en" | "ar")[];
        };
        analyticsKey: string;
        surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
        spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
    } | {
        type: "COUNTDOWN";
        id: string;
        description: {
            en: string;
            ar: string;
        };
        label: string;
        width: "CONTENT" | "WIDE" | "FULL";
        enabled: boolean;
        endsAt: string;
        heading: {
            en: string;
            ar: string;
        };
        eyebrow: {
            en: string;
            ar: string;
        };
        visibility: {
            startsAt: string | null;
            endsAt: string | null;
            devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
            locales: ("en" | "ar")[];
        };
        analyticsKey: string;
        surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
        spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
        expiredBehavior: "HIDE" | "SHOW_EXPIRED";
        expiredMessage: {
            en: string;
            ar: string;
        };
    } | {
        type: "NEWSLETTER";
        id: string;
        description: {
            en: string;
            ar: string;
        };
        label: string;
        width: "CONTENT" | "WIDE" | "FULL";
        enabled: boolean;
        heading: {
            en: string;
            ar: string;
        };
        eyebrow: {
            en: string;
            ar: string;
        };
        style: "COMPACT" | "DARK" | "EDITORIAL";
        visibility: {
            startsAt: string | null;
            endsAt: string | null;
            devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
            locales: ("en" | "ar")[];
        };
        analyticsKey: string;
        surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
        spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
    } | {
        type: "FAQ";
        id: string;
        description: {
            en: string;
            ar: string;
        };
        label: string;
        width: "CONTENT" | "WIDE" | "FULL";
        items: {
            id: string;
            question: {
                en: string;
                ar: string;
            };
            answer: {
                en: string;
                ar: string;
            };
        }[];
        enabled: boolean;
        heading: {
            en: string;
            ar: string;
        };
        visibility: {
            startsAt: string | null;
            endsAt: string | null;
            devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
            locales: ("en" | "ar")[];
        };
        analyticsKey: string;
        surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
        spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
    } | {
        type: "SPACER";
        id: string;
        label: string;
        width: "CONTENT" | "WIDE" | "FULL";
        enabled: boolean;
        visibility: {
            startsAt: string | null;
            endsAt: string | null;
            devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
            locales: ("en" | "ar")[];
        };
        size: "SMALL" | "MEDIUM" | "LARGE";
        analyticsKey: string;
        surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
        spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
    } | {
        type: "DIVIDER";
        id: string;
        label: string;
        width: "CONTENT" | "WIDE" | "FULL";
        enabled: boolean;
        visibility: {
            startsAt: string | null;
            endsAt: string | null;
            devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
            locales: ("en" | "ar")[];
        };
        analyticsKey: string;
        surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
        spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
    })[];
}, {
    title: {
        en?: string | undefined;
        ar?: string | undefined;
    };
    schemaVersion: 1;
    seo: {
        description: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        title: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        canonicalPath?: string | null | undefined;
        openGraphMediaId?: string | null | undefined;
        indexable?: boolean | undefined;
    };
    sections: ({
        type: "HERO";
        id: string;
        description: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        label: string;
        heading: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        eyebrow: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        imageAlt: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        visibility: {
            startsAt?: string | null | undefined;
            endsAt?: string | null | undefined;
            devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
            locales?: ("en" | "ar")[] | undefined;
        };
        primaryCtaLabel: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        secondaryCtaLabel: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        analyticsKey: string;
        width?: "CONTENT" | "WIDE" | "FULL" | undefined;
        enabled?: boolean | undefined;
        alignment?: "START" | "CENTER" | "END" | undefined;
        desktopMediaId?: string | null | undefined;
        mobileMediaId?: string | null | undefined;
        primaryDestination?: {
            type: "HOME";
        } | {
            type: "SHOP";
        } | {
            type: "OFFERS";
        } | {
            type: "NEW_ARRIVALS";
        } | {
            type: "ABOUT";
        } | {
            type: "CONTACT";
        } | {
            type: "CATEGORY";
            id: string;
        } | {
            type: "BRAND";
            id: string;
        } | {
            type: "PRODUCT";
            id: string;
        } | {
            type: "TAG";
            id: string;
        } | {
            path: string;
            type: "CUSTOM_PATH";
        } | {
            type: "EXTERNAL";
            url: string;
            newTab?: boolean | undefined;
        } | {
            type: "PAGE";
            id: string;
        } | null | undefined;
        secondaryDestination?: {
            type: "HOME";
        } | {
            type: "SHOP";
        } | {
            type: "OFFERS";
        } | {
            type: "NEW_ARRIVALS";
        } | {
            type: "ABOUT";
        } | {
            type: "CONTACT";
        } | {
            type: "CATEGORY";
            id: string;
        } | {
            type: "BRAND";
            id: string;
        } | {
            type: "PRODUCT";
            id: string;
        } | {
            type: "TAG";
            id: string;
        } | {
            path: string;
            type: "CUSTOM_PATH";
        } | {
            type: "EXTERNAL";
            url: string;
            newTab?: boolean | undefined;
        } | {
            type: "PAGE";
            id: string;
        } | null | undefined;
        layout?: "SPLIT" | "FULL" | "CONTAINED" | undefined;
        contentPosition?: "CENTER" | "TOP" | "BOTTOM" | undefined;
        overlay?: "NONE" | "MEDIUM" | "LIGHT" | "STRONG" | undefined;
        headingLevel?: "H1" | "H2" | undefined;
        surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
        spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
    } | {
        type: "PRODUCT_GRID";
        id: string;
        description: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        label: string;
        source: {
            mode: "MANUAL";
            productIds?: string[] | undefined;
        } | {
            mode: "CATEGORY";
            referenceId: string;
        } | {
            mode: "BRAND";
            referenceId: string;
        } | {
            mode: "TAG";
            referenceId: string;
        } | {
            mode: "PROMOTION";
            referenceId: string;
        } | {
            mode: "NEWEST";
        } | {
            mode: "FEATURED";
        };
        heading: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        viewAllLabel: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        visibility: {
            startsAt?: string | null | undefined;
            endsAt?: string | null | undefined;
            devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
            locales?: ("en" | "ar")[] | undefined;
        };
        columns: {
            desktop?: number | undefined;
            tablet?: number | undefined;
            mobile?: number | undefined;
        };
        analyticsKey: string;
        limit?: number | undefined;
        width?: "CONTENT" | "WIDE" | "FULL" | undefined;
        enabled?: boolean | undefined;
        destination?: {
            type: "HOME";
        } | {
            type: "SHOP";
        } | {
            type: "OFFERS";
        } | {
            type: "NEW_ARRIVALS";
        } | {
            type: "ABOUT";
        } | {
            type: "CONTACT";
        } | {
            type: "CATEGORY";
            id: string;
        } | {
            type: "BRAND";
            id: string;
        } | {
            type: "PRODUCT";
            id: string;
        } | {
            type: "TAG";
            id: string;
        } | {
            path: string;
            type: "CUSTOM_PATH";
        } | {
            type: "EXTERNAL";
            url: string;
            newTab?: boolean | undefined;
        } | {
            type: "PAGE";
            id: string;
        } | null | undefined;
        style?: "COMPACT" | "CLEAN" | "EDITORIAL" | undefined;
        showViewAll?: boolean | undefined;
        surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
        spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
    } | {
        type: "PRODUCT_CAROUSEL";
        id: string;
        description: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        label: string;
        source: {
            mode: "MANUAL";
            productIds?: string[] | undefined;
        } | {
            mode: "CATEGORY";
            referenceId: string;
        } | {
            mode: "BRAND";
            referenceId: string;
        } | {
            mode: "TAG";
            referenceId: string;
        } | {
            mode: "PROMOTION";
            referenceId: string;
        } | {
            mode: "NEWEST";
        } | {
            mode: "FEATURED";
        };
        heading: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        viewAllLabel: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        visibility: {
            startsAt?: string | null | undefined;
            endsAt?: string | null | undefined;
            devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
            locales?: ("en" | "ar")[] | undefined;
        };
        columns: {
            desktop?: number | undefined;
            tablet?: number | undefined;
            mobile?: number | undefined;
        };
        analyticsKey: string;
        limit?: number | undefined;
        width?: "CONTENT" | "WIDE" | "FULL" | undefined;
        enabled?: boolean | undefined;
        destination?: {
            type: "HOME";
        } | {
            type: "SHOP";
        } | {
            type: "OFFERS";
        } | {
            type: "NEW_ARRIVALS";
        } | {
            type: "ABOUT";
        } | {
            type: "CONTACT";
        } | {
            type: "CATEGORY";
            id: string;
        } | {
            type: "BRAND";
            id: string;
        } | {
            type: "PRODUCT";
            id: string;
        } | {
            type: "TAG";
            id: string;
        } | {
            path: string;
            type: "CUSTOM_PATH";
        } | {
            type: "EXTERNAL";
            url: string;
            newTab?: boolean | undefined;
        } | {
            type: "PAGE";
            id: string;
        } | null | undefined;
        style?: "COMPACT" | "CLEAN" | "EDITORIAL" | undefined;
        showViewAll?: boolean | undefined;
        surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
        spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
        autoplay?: boolean | undefined;
    } | {
        type: "CATEGORIES";
        id: string;
        description: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        label: string;
        heading: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        visibility: {
            startsAt?: string | null | undefined;
            endsAt?: string | null | undefined;
            devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
            locales?: ("en" | "ar")[] | undefined;
        };
        analyticsKey: string;
        limit?: number | undefined;
        width?: "CONTENT" | "WIDE" | "FULL" | undefined;
        enabled?: boolean | undefined;
        categoryIds?: string[] | undefined;
        layout?: "COMPACT" | "CARDS" | "EDITORIAL" | "IMAGE_TILES" | undefined;
        surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
        spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
        showChildren?: boolean | undefined;
        showGrandchildren?: boolean | undefined;
    } | {
        type: "BRANDS";
        id: string;
        description: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        label: string;
        heading: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        visibility: {
            startsAt?: string | null | undefined;
            endsAt?: string | null | undefined;
            devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
            locales?: ("en" | "ar")[] | undefined;
        };
        analyticsKey: string;
        limit?: number | undefined;
        width?: "CONTENT" | "WIDE" | "FULL" | undefined;
        enabled?: boolean | undefined;
        brandIds?: string[] | undefined;
        mode?: "MANUAL" | "FEATURED" | undefined;
        layout?: "LOGO_GRID" | "EDITORIAL" | "LOGO_RAIL" | undefined;
        surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
        spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
    } | {
        type: "PROMOTION";
        id: string;
        description: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        label: string;
        promotionId: string;
        heading: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        eyebrow: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        ctaLabel: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        imageAlt: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        visibility: {
            startsAt?: string | null | undefined;
            endsAt?: string | null | undefined;
            devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
            locales?: ("en" | "ar")[] | undefined;
        };
        analyticsKey: string;
        width?: "CONTENT" | "WIDE" | "FULL" | undefined;
        enabled?: boolean | undefined;
        destination?: {
            type: "HOME";
        } | {
            type: "SHOP";
        } | {
            type: "OFFERS";
        } | {
            type: "NEW_ARRIVALS";
        } | {
            type: "ABOUT";
        } | {
            type: "CONTACT";
        } | {
            type: "CATEGORY";
            id: string;
        } | {
            type: "BRAND";
            id: string;
        } | {
            type: "PRODUCT";
            id: string;
        } | {
            type: "TAG";
            id: string;
        } | {
            path: string;
            type: "CUSTOM_PATH";
        } | {
            type: "EXTERNAL";
            url: string;
            newTab?: boolean | undefined;
        } | {
            type: "PAGE";
            id: string;
        } | null | undefined;
        mediaAssetId?: string | null | undefined;
        style?: "DARK" | "EDITORIAL" | "BANNER" | undefined;
        surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
        spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
        expiredBehavior?: "HIDE" | "SHOW_EXPIRED" | undefined;
    } | {
        type: "ROUTINE_CTA";
        id: string;
        description: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        label: string;
        heading: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        eyebrow: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        ctaLabel: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        imageAlt: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        visibility: {
            startsAt?: string | null | undefined;
            endsAt?: string | null | undefined;
            devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
            locales?: ("en" | "ar")[] | undefined;
        };
        analyticsKey: string;
        width?: "CONTENT" | "WIDE" | "FULL" | undefined;
        enabled?: boolean | undefined;
        destination?: {
            type: "HOME";
        } | {
            type: "SHOP";
        } | {
            type: "OFFERS";
        } | {
            type: "NEW_ARRIVALS";
        } | {
            type: "ABOUT";
        } | {
            type: "CONTACT";
        } | {
            type: "CATEGORY";
            id: string;
        } | {
            type: "BRAND";
            id: string;
        } | {
            type: "PRODUCT";
            id: string;
        } | {
            type: "TAG";
            id: string;
        } | {
            path: string;
            type: "CUSTOM_PATH";
        } | {
            type: "EXTERNAL";
            url: string;
            newTab?: boolean | undefined;
        } | {
            type: "PAGE";
            id: string;
        } | undefined;
        mediaAssetId?: string | null | undefined;
        style?: "COMPACT" | "DARK" | "EDITORIAL" | undefined;
        surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
        spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
    } | {
        type: "IMAGE_TEXT";
        id: string;
        label: string;
        heading: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        eyebrow: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        ctaLabel: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        imageAlt: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        visibility: {
            startsAt?: string | null | undefined;
            endsAt?: string | null | undefined;
            devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
            locales?: ("en" | "ar")[] | undefined;
        };
        analyticsKey: string;
        body: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        width?: "CONTENT" | "WIDE" | "FULL" | undefined;
        enabled?: boolean | undefined;
        destination?: {
            type: "HOME";
        } | {
            type: "SHOP";
        } | {
            type: "OFFERS";
        } | {
            type: "NEW_ARRIVALS";
        } | {
            type: "ABOUT";
        } | {
            type: "CONTACT";
        } | {
            type: "CATEGORY";
            id: string;
        } | {
            type: "BRAND";
            id: string;
        } | {
            type: "PRODUCT";
            id: string;
        } | {
            type: "TAG";
            id: string;
        } | {
            path: string;
            type: "CUSTOM_PATH";
        } | {
            type: "EXTERNAL";
            url: string;
            newTab?: boolean | undefined;
        } | {
            type: "PAGE";
            id: string;
        } | null | undefined;
        mediaAssetId?: string | null | undefined;
        style?: "EDITORIAL" | "CONTAINED" | "FULL_BLEED" | undefined;
        surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
        spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
        imageSide?: "START" | "END" | undefined;
    } | {
        type: "PROMO_BANNER";
        id: string;
        description: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        label: string;
        heading: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        ctaLabel: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        imageAlt: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        visibility: {
            startsAt?: string | null | undefined;
            endsAt?: string | null | undefined;
            devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
            locales?: ("en" | "ar")[] | undefined;
        };
        analyticsKey: string;
        width?: "CONTENT" | "WIDE" | "FULL" | undefined;
        enabled?: boolean | undefined;
        destination?: {
            type: "HOME";
        } | {
            type: "SHOP";
        } | {
            type: "OFFERS";
        } | {
            type: "NEW_ARRIVALS";
        } | {
            type: "ABOUT";
        } | {
            type: "CONTACT";
        } | {
            type: "CATEGORY";
            id: string;
        } | {
            type: "BRAND";
            id: string;
        } | {
            type: "PRODUCT";
            id: string;
        } | {
            type: "TAG";
            id: string;
        } | {
            path: string;
            type: "CUSTOM_PATH";
        } | {
            type: "EXTERNAL";
            url: string;
            newTab?: boolean | undefined;
        } | {
            type: "PAGE";
            id: string;
        } | null | undefined;
        mediaAssetId?: string | null | undefined;
        style?: "IMAGE" | "SOFT" | "DARK" | "ACCENT" | undefined;
        surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
        spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
    } | {
        type: "COUNTDOWN";
        id: string;
        description: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        label: string;
        endsAt: string;
        heading: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        eyebrow: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        visibility: {
            startsAt?: string | null | undefined;
            endsAt?: string | null | undefined;
            devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
            locales?: ("en" | "ar")[] | undefined;
        };
        analyticsKey: string;
        expiredMessage: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        width?: "CONTENT" | "WIDE" | "FULL" | undefined;
        enabled?: boolean | undefined;
        surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
        spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
        expiredBehavior?: "HIDE" | "SHOW_EXPIRED" | undefined;
    } | {
        type: "NEWSLETTER";
        id: string;
        description: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        label: string;
        heading: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        eyebrow: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        visibility: {
            startsAt?: string | null | undefined;
            endsAt?: string | null | undefined;
            devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
            locales?: ("en" | "ar")[] | undefined;
        };
        analyticsKey: string;
        width?: "CONTENT" | "WIDE" | "FULL" | undefined;
        enabled?: boolean | undefined;
        style?: "COMPACT" | "DARK" | "EDITORIAL" | undefined;
        surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
        spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
    } | {
        type: "FAQ";
        id: string;
        description: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        label: string;
        heading: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        visibility: {
            startsAt?: string | null | undefined;
            endsAt?: string | null | undefined;
            devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
            locales?: ("en" | "ar")[] | undefined;
        };
        analyticsKey: string;
        width?: "CONTENT" | "WIDE" | "FULL" | undefined;
        items?: {
            id: string;
            question: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            answer: {
                en?: string | undefined;
                ar?: string | undefined;
            };
        }[] | undefined;
        enabled?: boolean | undefined;
        surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
        spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
    } | {
        type: "SPACER";
        id: string;
        label: string;
        visibility: {
            startsAt?: string | null | undefined;
            endsAt?: string | null | undefined;
            devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
            locales?: ("en" | "ar")[] | undefined;
        };
        analyticsKey: string;
        width?: "CONTENT" | "WIDE" | "FULL" | undefined;
        enabled?: boolean | undefined;
        size?: "SMALL" | "MEDIUM" | "LARGE" | undefined;
        surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
        spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
    } | {
        type: "DIVIDER";
        id: string;
        label: string;
        visibility: {
            startsAt?: string | null | undefined;
            endsAt?: string | null | undefined;
            devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
            locales?: ("en" | "ar")[] | undefined;
        };
        analyticsKey: string;
        width?: "CONTENT" | "WIDE" | "FULL" | undefined;
        enabled?: boolean | undefined;
        surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
        spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
    })[];
}>, {
    title: {
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
        canonicalPath: string | null;
        openGraphMediaId: string | null;
        indexable: boolean;
    };
    sections: ({
        type: "HERO";
        id: string;
        description: {
            en: string;
            ar: string;
        };
        label: string;
        width: "CONTENT" | "WIDE" | "FULL";
        enabled: boolean;
        heading: {
            en: string;
            ar: string;
        };
        eyebrow: {
            en: string;
            ar: string;
        };
        imageAlt: {
            en: string;
            ar: string;
        };
        visibility: {
            startsAt: string | null;
            endsAt: string | null;
            devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
            locales: ("en" | "ar")[];
        };
        alignment: "START" | "CENTER" | "END";
        desktopMediaId: string | null;
        mobileMediaId: string | null;
        primaryCtaLabel: {
            en: string;
            ar: string;
        };
        primaryDestination: {
            type: "HOME";
        } | {
            type: "SHOP";
        } | {
            type: "OFFERS";
        } | {
            type: "NEW_ARRIVALS";
        } | {
            type: "ABOUT";
        } | {
            type: "CONTACT";
        } | {
            type: "CATEGORY";
            id: string;
        } | {
            type: "BRAND";
            id: string;
        } | {
            type: "PRODUCT";
            id: string;
        } | {
            type: "TAG";
            id: string;
        } | {
            path: string;
            type: "CUSTOM_PATH";
        } | {
            type: "EXTERNAL";
            url: string;
            newTab: boolean;
        } | {
            type: "PAGE";
            id: string;
        } | null;
        secondaryCtaLabel: {
            en: string;
            ar: string;
        };
        secondaryDestination: {
            type: "HOME";
        } | {
            type: "SHOP";
        } | {
            type: "OFFERS";
        } | {
            type: "NEW_ARRIVALS";
        } | {
            type: "ABOUT";
        } | {
            type: "CONTACT";
        } | {
            type: "CATEGORY";
            id: string;
        } | {
            type: "BRAND";
            id: string;
        } | {
            type: "PRODUCT";
            id: string;
        } | {
            type: "TAG";
            id: string;
        } | {
            path: string;
            type: "CUSTOM_PATH";
        } | {
            type: "EXTERNAL";
            url: string;
            newTab: boolean;
        } | {
            type: "PAGE";
            id: string;
        } | null;
        layout: "SPLIT" | "FULL" | "CONTAINED";
        contentPosition: "CENTER" | "TOP" | "BOTTOM";
        overlay: "NONE" | "MEDIUM" | "LIGHT" | "STRONG";
        headingLevel: "H1" | "H2";
        analyticsKey: string;
        surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
        spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
    } | {
        type: "PRODUCT_GRID";
        limit: number;
        id: string;
        description: {
            en: string;
            ar: string;
        };
        label: string;
        width: "CONTENT" | "WIDE" | "FULL";
        source: {
            productIds: string[];
            mode: "MANUAL";
        } | {
            mode: "CATEGORY";
            referenceId: string;
        } | {
            mode: "BRAND";
            referenceId: string;
        } | {
            mode: "TAG";
            referenceId: string;
        } | {
            mode: "PROMOTION";
            referenceId: string;
        } | {
            mode: "NEWEST";
        } | {
            mode: "FEATURED";
        };
        enabled: boolean;
        heading: {
            en: string;
            ar: string;
        };
        viewAllLabel: {
            en: string;
            ar: string;
        };
        destination: {
            type: "HOME";
        } | {
            type: "SHOP";
        } | {
            type: "OFFERS";
        } | {
            type: "NEW_ARRIVALS";
        } | {
            type: "ABOUT";
        } | {
            type: "CONTACT";
        } | {
            type: "CATEGORY";
            id: string;
        } | {
            type: "BRAND";
            id: string;
        } | {
            type: "PRODUCT";
            id: string;
        } | {
            type: "TAG";
            id: string;
        } | {
            path: string;
            type: "CUSTOM_PATH";
        } | {
            type: "EXTERNAL";
            url: string;
            newTab: boolean;
        } | {
            type: "PAGE";
            id: string;
        } | null;
        style: "COMPACT" | "CLEAN" | "EDITORIAL";
        visibility: {
            startsAt: string | null;
            endsAt: string | null;
            devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
            locales: ("en" | "ar")[];
        };
        showViewAll: boolean;
        columns: {
            desktop: number;
            tablet: number;
            mobile: number;
        };
        analyticsKey: string;
        surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
        spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
    } | {
        type: "PRODUCT_CAROUSEL";
        limit: number;
        id: string;
        description: {
            en: string;
            ar: string;
        };
        label: string;
        width: "CONTENT" | "WIDE" | "FULL";
        source: {
            productIds: string[];
            mode: "MANUAL";
        } | {
            mode: "CATEGORY";
            referenceId: string;
        } | {
            mode: "BRAND";
            referenceId: string;
        } | {
            mode: "TAG";
            referenceId: string;
        } | {
            mode: "PROMOTION";
            referenceId: string;
        } | {
            mode: "NEWEST";
        } | {
            mode: "FEATURED";
        };
        enabled: boolean;
        heading: {
            en: string;
            ar: string;
        };
        viewAllLabel: {
            en: string;
            ar: string;
        };
        destination: {
            type: "HOME";
        } | {
            type: "SHOP";
        } | {
            type: "OFFERS";
        } | {
            type: "NEW_ARRIVALS";
        } | {
            type: "ABOUT";
        } | {
            type: "CONTACT";
        } | {
            type: "CATEGORY";
            id: string;
        } | {
            type: "BRAND";
            id: string;
        } | {
            type: "PRODUCT";
            id: string;
        } | {
            type: "TAG";
            id: string;
        } | {
            path: string;
            type: "CUSTOM_PATH";
        } | {
            type: "EXTERNAL";
            url: string;
            newTab: boolean;
        } | {
            type: "PAGE";
            id: string;
        } | null;
        style: "COMPACT" | "CLEAN" | "EDITORIAL";
        visibility: {
            startsAt: string | null;
            endsAt: string | null;
            devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
            locales: ("en" | "ar")[];
        };
        showViewAll: boolean;
        columns: {
            desktop: number;
            tablet: number;
            mobile: number;
        };
        analyticsKey: string;
        surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
        spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
        autoplay: boolean;
    } | {
        type: "CATEGORIES";
        limit: number;
        id: string;
        description: {
            en: string;
            ar: string;
        };
        label: string;
        width: "CONTENT" | "WIDE" | "FULL";
        enabled: boolean;
        categoryIds: string[];
        heading: {
            en: string;
            ar: string;
        };
        visibility: {
            startsAt: string | null;
            endsAt: string | null;
            devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
            locales: ("en" | "ar")[];
        };
        layout: "COMPACT" | "CARDS" | "EDITORIAL" | "IMAGE_TILES";
        analyticsKey: string;
        surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
        spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
        showChildren: boolean;
        showGrandchildren: boolean;
    } | {
        type: "BRANDS";
        limit: number;
        id: string;
        description: {
            en: string;
            ar: string;
        };
        label: string;
        width: "CONTENT" | "WIDE" | "FULL";
        enabled: boolean;
        brandIds: string[];
        heading: {
            en: string;
            ar: string;
        };
        visibility: {
            startsAt: string | null;
            endsAt: string | null;
            devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
            locales: ("en" | "ar")[];
        };
        mode: "MANUAL" | "FEATURED";
        layout: "LOGO_GRID" | "EDITORIAL" | "LOGO_RAIL";
        analyticsKey: string;
        surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
        spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
    } | {
        type: "PROMOTION";
        id: string;
        description: {
            en: string;
            ar: string;
        };
        label: string;
        width: "CONTENT" | "WIDE" | "FULL";
        promotionId: string;
        enabled: boolean;
        heading: {
            en: string;
            ar: string;
        };
        eyebrow: {
            en: string;
            ar: string;
        };
        ctaLabel: {
            en: string;
            ar: string;
        };
        destination: {
            type: "HOME";
        } | {
            type: "SHOP";
        } | {
            type: "OFFERS";
        } | {
            type: "NEW_ARRIVALS";
        } | {
            type: "ABOUT";
        } | {
            type: "CONTACT";
        } | {
            type: "CATEGORY";
            id: string;
        } | {
            type: "BRAND";
            id: string;
        } | {
            type: "PRODUCT";
            id: string;
        } | {
            type: "TAG";
            id: string;
        } | {
            path: string;
            type: "CUSTOM_PATH";
        } | {
            type: "EXTERNAL";
            url: string;
            newTab: boolean;
        } | {
            type: "PAGE";
            id: string;
        } | null;
        mediaAssetId: string | null;
        imageAlt: {
            en: string;
            ar: string;
        };
        style: "DARK" | "EDITORIAL" | "BANNER";
        visibility: {
            startsAt: string | null;
            endsAt: string | null;
            devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
            locales: ("en" | "ar")[];
        };
        analyticsKey: string;
        surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
        spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
        expiredBehavior: "HIDE" | "SHOW_EXPIRED";
    } | {
        type: "ROUTINE_CTA";
        id: string;
        description: {
            en: string;
            ar: string;
        };
        label: string;
        width: "CONTENT" | "WIDE" | "FULL";
        enabled: boolean;
        heading: {
            en: string;
            ar: string;
        };
        eyebrow: {
            en: string;
            ar: string;
        };
        ctaLabel: {
            en: string;
            ar: string;
        };
        destination: {
            type: "HOME";
        } | {
            type: "SHOP";
        } | {
            type: "OFFERS";
        } | {
            type: "NEW_ARRIVALS";
        } | {
            type: "ABOUT";
        } | {
            type: "CONTACT";
        } | {
            type: "CATEGORY";
            id: string;
        } | {
            type: "BRAND";
            id: string;
        } | {
            type: "PRODUCT";
            id: string;
        } | {
            type: "TAG";
            id: string;
        } | {
            path: string;
            type: "CUSTOM_PATH";
        } | {
            type: "EXTERNAL";
            url: string;
            newTab: boolean;
        } | {
            type: "PAGE";
            id: string;
        };
        mediaAssetId: string | null;
        imageAlt: {
            en: string;
            ar: string;
        };
        style: "COMPACT" | "DARK" | "EDITORIAL";
        visibility: {
            startsAt: string | null;
            endsAt: string | null;
            devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
            locales: ("en" | "ar")[];
        };
        analyticsKey: string;
        surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
        spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
    } | {
        type: "IMAGE_TEXT";
        id: string;
        label: string;
        width: "CONTENT" | "WIDE" | "FULL";
        enabled: boolean;
        heading: {
            en: string;
            ar: string;
        };
        eyebrow: {
            en: string;
            ar: string;
        };
        ctaLabel: {
            en: string;
            ar: string;
        };
        destination: {
            type: "HOME";
        } | {
            type: "SHOP";
        } | {
            type: "OFFERS";
        } | {
            type: "NEW_ARRIVALS";
        } | {
            type: "ABOUT";
        } | {
            type: "CONTACT";
        } | {
            type: "CATEGORY";
            id: string;
        } | {
            type: "BRAND";
            id: string;
        } | {
            type: "PRODUCT";
            id: string;
        } | {
            type: "TAG";
            id: string;
        } | {
            path: string;
            type: "CUSTOM_PATH";
        } | {
            type: "EXTERNAL";
            url: string;
            newTab: boolean;
        } | {
            type: "PAGE";
            id: string;
        } | null;
        mediaAssetId: string | null;
        imageAlt: {
            en: string;
            ar: string;
        };
        style: "EDITORIAL" | "CONTAINED" | "FULL_BLEED";
        visibility: {
            startsAt: string | null;
            endsAt: string | null;
            devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
            locales: ("en" | "ar")[];
        };
        analyticsKey: string;
        surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
        spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
        body: {
            en: string;
            ar: string;
        };
        imageSide: "START" | "END";
    } | {
        type: "PROMO_BANNER";
        id: string;
        description: {
            en: string;
            ar: string;
        };
        label: string;
        width: "CONTENT" | "WIDE" | "FULL";
        enabled: boolean;
        heading: {
            en: string;
            ar: string;
        };
        ctaLabel: {
            en: string;
            ar: string;
        };
        destination: {
            type: "HOME";
        } | {
            type: "SHOP";
        } | {
            type: "OFFERS";
        } | {
            type: "NEW_ARRIVALS";
        } | {
            type: "ABOUT";
        } | {
            type: "CONTACT";
        } | {
            type: "CATEGORY";
            id: string;
        } | {
            type: "BRAND";
            id: string;
        } | {
            type: "PRODUCT";
            id: string;
        } | {
            type: "TAG";
            id: string;
        } | {
            path: string;
            type: "CUSTOM_PATH";
        } | {
            type: "EXTERNAL";
            url: string;
            newTab: boolean;
        } | {
            type: "PAGE";
            id: string;
        } | null;
        mediaAssetId: string | null;
        imageAlt: {
            en: string;
            ar: string;
        };
        style: "IMAGE" | "SOFT" | "DARK" | "ACCENT";
        visibility: {
            startsAt: string | null;
            endsAt: string | null;
            devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
            locales: ("en" | "ar")[];
        };
        analyticsKey: string;
        surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
        spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
    } | {
        type: "COUNTDOWN";
        id: string;
        description: {
            en: string;
            ar: string;
        };
        label: string;
        width: "CONTENT" | "WIDE" | "FULL";
        enabled: boolean;
        endsAt: string;
        heading: {
            en: string;
            ar: string;
        };
        eyebrow: {
            en: string;
            ar: string;
        };
        visibility: {
            startsAt: string | null;
            endsAt: string | null;
            devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
            locales: ("en" | "ar")[];
        };
        analyticsKey: string;
        surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
        spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
        expiredBehavior: "HIDE" | "SHOW_EXPIRED";
        expiredMessage: {
            en: string;
            ar: string;
        };
    } | {
        type: "NEWSLETTER";
        id: string;
        description: {
            en: string;
            ar: string;
        };
        label: string;
        width: "CONTENT" | "WIDE" | "FULL";
        enabled: boolean;
        heading: {
            en: string;
            ar: string;
        };
        eyebrow: {
            en: string;
            ar: string;
        };
        style: "COMPACT" | "DARK" | "EDITORIAL";
        visibility: {
            startsAt: string | null;
            endsAt: string | null;
            devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
            locales: ("en" | "ar")[];
        };
        analyticsKey: string;
        surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
        spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
    } | {
        type: "FAQ";
        id: string;
        description: {
            en: string;
            ar: string;
        };
        label: string;
        width: "CONTENT" | "WIDE" | "FULL";
        items: {
            id: string;
            question: {
                en: string;
                ar: string;
            };
            answer: {
                en: string;
                ar: string;
            };
        }[];
        enabled: boolean;
        heading: {
            en: string;
            ar: string;
        };
        visibility: {
            startsAt: string | null;
            endsAt: string | null;
            devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
            locales: ("en" | "ar")[];
        };
        analyticsKey: string;
        surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
        spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
    } | {
        type: "SPACER";
        id: string;
        label: string;
        width: "CONTENT" | "WIDE" | "FULL";
        enabled: boolean;
        visibility: {
            startsAt: string | null;
            endsAt: string | null;
            devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
            locales: ("en" | "ar")[];
        };
        size: "SMALL" | "MEDIUM" | "LARGE";
        analyticsKey: string;
        surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
        spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
    } | {
        type: "DIVIDER";
        id: string;
        label: string;
        width: "CONTENT" | "WIDE" | "FULL";
        enabled: boolean;
        visibility: {
            startsAt: string | null;
            endsAt: string | null;
            devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
            locales: ("en" | "ar")[];
        };
        analyticsKey: string;
        surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
        spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
    })[];
}, {
    title: {
        en?: string | undefined;
        ar?: string | undefined;
    };
    schemaVersion: 1;
    seo: {
        description: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        title: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        canonicalPath?: string | null | undefined;
        openGraphMediaId?: string | null | undefined;
        indexable?: boolean | undefined;
    };
    sections: ({
        type: "HERO";
        id: string;
        description: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        label: string;
        heading: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        eyebrow: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        imageAlt: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        visibility: {
            startsAt?: string | null | undefined;
            endsAt?: string | null | undefined;
            devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
            locales?: ("en" | "ar")[] | undefined;
        };
        primaryCtaLabel: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        secondaryCtaLabel: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        analyticsKey: string;
        width?: "CONTENT" | "WIDE" | "FULL" | undefined;
        enabled?: boolean | undefined;
        alignment?: "START" | "CENTER" | "END" | undefined;
        desktopMediaId?: string | null | undefined;
        mobileMediaId?: string | null | undefined;
        primaryDestination?: {
            type: "HOME";
        } | {
            type: "SHOP";
        } | {
            type: "OFFERS";
        } | {
            type: "NEW_ARRIVALS";
        } | {
            type: "ABOUT";
        } | {
            type: "CONTACT";
        } | {
            type: "CATEGORY";
            id: string;
        } | {
            type: "BRAND";
            id: string;
        } | {
            type: "PRODUCT";
            id: string;
        } | {
            type: "TAG";
            id: string;
        } | {
            path: string;
            type: "CUSTOM_PATH";
        } | {
            type: "EXTERNAL";
            url: string;
            newTab?: boolean | undefined;
        } | {
            type: "PAGE";
            id: string;
        } | null | undefined;
        secondaryDestination?: {
            type: "HOME";
        } | {
            type: "SHOP";
        } | {
            type: "OFFERS";
        } | {
            type: "NEW_ARRIVALS";
        } | {
            type: "ABOUT";
        } | {
            type: "CONTACT";
        } | {
            type: "CATEGORY";
            id: string;
        } | {
            type: "BRAND";
            id: string;
        } | {
            type: "PRODUCT";
            id: string;
        } | {
            type: "TAG";
            id: string;
        } | {
            path: string;
            type: "CUSTOM_PATH";
        } | {
            type: "EXTERNAL";
            url: string;
            newTab?: boolean | undefined;
        } | {
            type: "PAGE";
            id: string;
        } | null | undefined;
        layout?: "SPLIT" | "FULL" | "CONTAINED" | undefined;
        contentPosition?: "CENTER" | "TOP" | "BOTTOM" | undefined;
        overlay?: "NONE" | "MEDIUM" | "LIGHT" | "STRONG" | undefined;
        headingLevel?: "H1" | "H2" | undefined;
        surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
        spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
    } | {
        type: "PRODUCT_GRID";
        id: string;
        description: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        label: string;
        source: {
            mode: "MANUAL";
            productIds?: string[] | undefined;
        } | {
            mode: "CATEGORY";
            referenceId: string;
        } | {
            mode: "BRAND";
            referenceId: string;
        } | {
            mode: "TAG";
            referenceId: string;
        } | {
            mode: "PROMOTION";
            referenceId: string;
        } | {
            mode: "NEWEST";
        } | {
            mode: "FEATURED";
        };
        heading: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        viewAllLabel: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        visibility: {
            startsAt?: string | null | undefined;
            endsAt?: string | null | undefined;
            devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
            locales?: ("en" | "ar")[] | undefined;
        };
        columns: {
            desktop?: number | undefined;
            tablet?: number | undefined;
            mobile?: number | undefined;
        };
        analyticsKey: string;
        limit?: number | undefined;
        width?: "CONTENT" | "WIDE" | "FULL" | undefined;
        enabled?: boolean | undefined;
        destination?: {
            type: "HOME";
        } | {
            type: "SHOP";
        } | {
            type: "OFFERS";
        } | {
            type: "NEW_ARRIVALS";
        } | {
            type: "ABOUT";
        } | {
            type: "CONTACT";
        } | {
            type: "CATEGORY";
            id: string;
        } | {
            type: "BRAND";
            id: string;
        } | {
            type: "PRODUCT";
            id: string;
        } | {
            type: "TAG";
            id: string;
        } | {
            path: string;
            type: "CUSTOM_PATH";
        } | {
            type: "EXTERNAL";
            url: string;
            newTab?: boolean | undefined;
        } | {
            type: "PAGE";
            id: string;
        } | null | undefined;
        style?: "COMPACT" | "CLEAN" | "EDITORIAL" | undefined;
        showViewAll?: boolean | undefined;
        surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
        spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
    } | {
        type: "PRODUCT_CAROUSEL";
        id: string;
        description: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        label: string;
        source: {
            mode: "MANUAL";
            productIds?: string[] | undefined;
        } | {
            mode: "CATEGORY";
            referenceId: string;
        } | {
            mode: "BRAND";
            referenceId: string;
        } | {
            mode: "TAG";
            referenceId: string;
        } | {
            mode: "PROMOTION";
            referenceId: string;
        } | {
            mode: "NEWEST";
        } | {
            mode: "FEATURED";
        };
        heading: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        viewAllLabel: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        visibility: {
            startsAt?: string | null | undefined;
            endsAt?: string | null | undefined;
            devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
            locales?: ("en" | "ar")[] | undefined;
        };
        columns: {
            desktop?: number | undefined;
            tablet?: number | undefined;
            mobile?: number | undefined;
        };
        analyticsKey: string;
        limit?: number | undefined;
        width?: "CONTENT" | "WIDE" | "FULL" | undefined;
        enabled?: boolean | undefined;
        destination?: {
            type: "HOME";
        } | {
            type: "SHOP";
        } | {
            type: "OFFERS";
        } | {
            type: "NEW_ARRIVALS";
        } | {
            type: "ABOUT";
        } | {
            type: "CONTACT";
        } | {
            type: "CATEGORY";
            id: string;
        } | {
            type: "BRAND";
            id: string;
        } | {
            type: "PRODUCT";
            id: string;
        } | {
            type: "TAG";
            id: string;
        } | {
            path: string;
            type: "CUSTOM_PATH";
        } | {
            type: "EXTERNAL";
            url: string;
            newTab?: boolean | undefined;
        } | {
            type: "PAGE";
            id: string;
        } | null | undefined;
        style?: "COMPACT" | "CLEAN" | "EDITORIAL" | undefined;
        showViewAll?: boolean | undefined;
        surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
        spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
        autoplay?: boolean | undefined;
    } | {
        type: "CATEGORIES";
        id: string;
        description: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        label: string;
        heading: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        visibility: {
            startsAt?: string | null | undefined;
            endsAt?: string | null | undefined;
            devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
            locales?: ("en" | "ar")[] | undefined;
        };
        analyticsKey: string;
        limit?: number | undefined;
        width?: "CONTENT" | "WIDE" | "FULL" | undefined;
        enabled?: boolean | undefined;
        categoryIds?: string[] | undefined;
        layout?: "COMPACT" | "CARDS" | "EDITORIAL" | "IMAGE_TILES" | undefined;
        surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
        spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
        showChildren?: boolean | undefined;
        showGrandchildren?: boolean | undefined;
    } | {
        type: "BRANDS";
        id: string;
        description: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        label: string;
        heading: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        visibility: {
            startsAt?: string | null | undefined;
            endsAt?: string | null | undefined;
            devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
            locales?: ("en" | "ar")[] | undefined;
        };
        analyticsKey: string;
        limit?: number | undefined;
        width?: "CONTENT" | "WIDE" | "FULL" | undefined;
        enabled?: boolean | undefined;
        brandIds?: string[] | undefined;
        mode?: "MANUAL" | "FEATURED" | undefined;
        layout?: "LOGO_GRID" | "EDITORIAL" | "LOGO_RAIL" | undefined;
        surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
        spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
    } | {
        type: "PROMOTION";
        id: string;
        description: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        label: string;
        promotionId: string;
        heading: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        eyebrow: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        ctaLabel: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        imageAlt: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        visibility: {
            startsAt?: string | null | undefined;
            endsAt?: string | null | undefined;
            devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
            locales?: ("en" | "ar")[] | undefined;
        };
        analyticsKey: string;
        width?: "CONTENT" | "WIDE" | "FULL" | undefined;
        enabled?: boolean | undefined;
        destination?: {
            type: "HOME";
        } | {
            type: "SHOP";
        } | {
            type: "OFFERS";
        } | {
            type: "NEW_ARRIVALS";
        } | {
            type: "ABOUT";
        } | {
            type: "CONTACT";
        } | {
            type: "CATEGORY";
            id: string;
        } | {
            type: "BRAND";
            id: string;
        } | {
            type: "PRODUCT";
            id: string;
        } | {
            type: "TAG";
            id: string;
        } | {
            path: string;
            type: "CUSTOM_PATH";
        } | {
            type: "EXTERNAL";
            url: string;
            newTab?: boolean | undefined;
        } | {
            type: "PAGE";
            id: string;
        } | null | undefined;
        mediaAssetId?: string | null | undefined;
        style?: "DARK" | "EDITORIAL" | "BANNER" | undefined;
        surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
        spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
        expiredBehavior?: "HIDE" | "SHOW_EXPIRED" | undefined;
    } | {
        type: "ROUTINE_CTA";
        id: string;
        description: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        label: string;
        heading: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        eyebrow: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        ctaLabel: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        imageAlt: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        visibility: {
            startsAt?: string | null | undefined;
            endsAt?: string | null | undefined;
            devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
            locales?: ("en" | "ar")[] | undefined;
        };
        analyticsKey: string;
        width?: "CONTENT" | "WIDE" | "FULL" | undefined;
        enabled?: boolean | undefined;
        destination?: {
            type: "HOME";
        } | {
            type: "SHOP";
        } | {
            type: "OFFERS";
        } | {
            type: "NEW_ARRIVALS";
        } | {
            type: "ABOUT";
        } | {
            type: "CONTACT";
        } | {
            type: "CATEGORY";
            id: string;
        } | {
            type: "BRAND";
            id: string;
        } | {
            type: "PRODUCT";
            id: string;
        } | {
            type: "TAG";
            id: string;
        } | {
            path: string;
            type: "CUSTOM_PATH";
        } | {
            type: "EXTERNAL";
            url: string;
            newTab?: boolean | undefined;
        } | {
            type: "PAGE";
            id: string;
        } | undefined;
        mediaAssetId?: string | null | undefined;
        style?: "COMPACT" | "DARK" | "EDITORIAL" | undefined;
        surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
        spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
    } | {
        type: "IMAGE_TEXT";
        id: string;
        label: string;
        heading: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        eyebrow: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        ctaLabel: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        imageAlt: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        visibility: {
            startsAt?: string | null | undefined;
            endsAt?: string | null | undefined;
            devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
            locales?: ("en" | "ar")[] | undefined;
        };
        analyticsKey: string;
        body: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        width?: "CONTENT" | "WIDE" | "FULL" | undefined;
        enabled?: boolean | undefined;
        destination?: {
            type: "HOME";
        } | {
            type: "SHOP";
        } | {
            type: "OFFERS";
        } | {
            type: "NEW_ARRIVALS";
        } | {
            type: "ABOUT";
        } | {
            type: "CONTACT";
        } | {
            type: "CATEGORY";
            id: string;
        } | {
            type: "BRAND";
            id: string;
        } | {
            type: "PRODUCT";
            id: string;
        } | {
            type: "TAG";
            id: string;
        } | {
            path: string;
            type: "CUSTOM_PATH";
        } | {
            type: "EXTERNAL";
            url: string;
            newTab?: boolean | undefined;
        } | {
            type: "PAGE";
            id: string;
        } | null | undefined;
        mediaAssetId?: string | null | undefined;
        style?: "EDITORIAL" | "CONTAINED" | "FULL_BLEED" | undefined;
        surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
        spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
        imageSide?: "START" | "END" | undefined;
    } | {
        type: "PROMO_BANNER";
        id: string;
        description: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        label: string;
        heading: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        ctaLabel: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        imageAlt: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        visibility: {
            startsAt?: string | null | undefined;
            endsAt?: string | null | undefined;
            devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
            locales?: ("en" | "ar")[] | undefined;
        };
        analyticsKey: string;
        width?: "CONTENT" | "WIDE" | "FULL" | undefined;
        enabled?: boolean | undefined;
        destination?: {
            type: "HOME";
        } | {
            type: "SHOP";
        } | {
            type: "OFFERS";
        } | {
            type: "NEW_ARRIVALS";
        } | {
            type: "ABOUT";
        } | {
            type: "CONTACT";
        } | {
            type: "CATEGORY";
            id: string;
        } | {
            type: "BRAND";
            id: string;
        } | {
            type: "PRODUCT";
            id: string;
        } | {
            type: "TAG";
            id: string;
        } | {
            path: string;
            type: "CUSTOM_PATH";
        } | {
            type: "EXTERNAL";
            url: string;
            newTab?: boolean | undefined;
        } | {
            type: "PAGE";
            id: string;
        } | null | undefined;
        mediaAssetId?: string | null | undefined;
        style?: "IMAGE" | "SOFT" | "DARK" | "ACCENT" | undefined;
        surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
        spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
    } | {
        type: "COUNTDOWN";
        id: string;
        description: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        label: string;
        endsAt: string;
        heading: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        eyebrow: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        visibility: {
            startsAt?: string | null | undefined;
            endsAt?: string | null | undefined;
            devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
            locales?: ("en" | "ar")[] | undefined;
        };
        analyticsKey: string;
        expiredMessage: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        width?: "CONTENT" | "WIDE" | "FULL" | undefined;
        enabled?: boolean | undefined;
        surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
        spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
        expiredBehavior?: "HIDE" | "SHOW_EXPIRED" | undefined;
    } | {
        type: "NEWSLETTER";
        id: string;
        description: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        label: string;
        heading: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        eyebrow: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        visibility: {
            startsAt?: string | null | undefined;
            endsAt?: string | null | undefined;
            devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
            locales?: ("en" | "ar")[] | undefined;
        };
        analyticsKey: string;
        width?: "CONTENT" | "WIDE" | "FULL" | undefined;
        enabled?: boolean | undefined;
        style?: "COMPACT" | "DARK" | "EDITORIAL" | undefined;
        surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
        spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
    } | {
        type: "FAQ";
        id: string;
        description: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        label: string;
        heading: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        visibility: {
            startsAt?: string | null | undefined;
            endsAt?: string | null | undefined;
            devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
            locales?: ("en" | "ar")[] | undefined;
        };
        analyticsKey: string;
        width?: "CONTENT" | "WIDE" | "FULL" | undefined;
        items?: {
            id: string;
            question: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            answer: {
                en?: string | undefined;
                ar?: string | undefined;
            };
        }[] | undefined;
        enabled?: boolean | undefined;
        surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
        spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
    } | {
        type: "SPACER";
        id: string;
        label: string;
        visibility: {
            startsAt?: string | null | undefined;
            endsAt?: string | null | undefined;
            devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
            locales?: ("en" | "ar")[] | undefined;
        };
        analyticsKey: string;
        width?: "CONTENT" | "WIDE" | "FULL" | undefined;
        enabled?: boolean | undefined;
        size?: "SMALL" | "MEDIUM" | "LARGE" | undefined;
        surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
        spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
    } | {
        type: "DIVIDER";
        id: string;
        label: string;
        visibility: {
            startsAt?: string | null | undefined;
            endsAt?: string | null | undefined;
            devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
            locales?: ("en" | "ar")[] | undefined;
        };
        analyticsKey: string;
        width?: "CONTENT" | "WIDE" | "FULL" | undefined;
        enabled?: boolean | undefined;
        surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
        spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
    })[];
}>;
export type LandingPageConfig = z.infer<typeof landingPageConfigSchema>;
export declare const landingPageSlugSchema: z.ZodString;
export declare const landingPageTemplateKeySchema: z.ZodEnum<["BLANK", "HOMEPAGE", "CAMPAIGN", "BRAND_LANDING", "CATEGORY_LANDING", "ROUTINE_CAMPAIGN"]>;
export type LandingPageTemplateKey = z.infer<typeof landingPageTemplateKeySchema>;
export declare const createLandingPageSchema: z.ZodObject<{
    name: z.ZodString;
    slug: z.ZodString;
    type: z.ZodEnum<["HOMEPAGE", "CAMPAIGN", "BRAND", "CATEGORY", "OFFER", "SEASONAL", "COLLECTION", "CUSTOM"]>;
    templateKey: z.ZodDefault<z.ZodEnum<["BLANK", "HOMEPAGE", "CAMPAIGN", "BRAND_LANDING", "CATEGORY_LANDING", "ROUTINE_CAMPAIGN"]>>;
}, "strict", z.ZodTypeAny, {
    type: "CATEGORY" | "BRAND" | "HOMEPAGE" | "CAMPAIGN" | "OFFER" | "SEASONAL" | "COLLECTION" | "CUSTOM";
    name: string;
    slug: string;
    templateKey: "HOMEPAGE" | "CAMPAIGN" | "BLANK" | "BRAND_LANDING" | "CATEGORY_LANDING" | "ROUTINE_CAMPAIGN";
}, {
    type: "CATEGORY" | "BRAND" | "HOMEPAGE" | "CAMPAIGN" | "OFFER" | "SEASONAL" | "COLLECTION" | "CUSTOM";
    name: string;
    slug: string;
    templateKey?: "HOMEPAGE" | "CAMPAIGN" | "BLANK" | "BRAND_LANDING" | "CATEGORY_LANDING" | "ROUTINE_CAMPAIGN" | undefined;
}>;
export type CreateLandingPageInput = z.infer<typeof createLandingPageSchema>;
export declare const updateLandingPageDraftSchema: z.ZodObject<{
    expectedRevision: z.ZodNumber;
    name: z.ZodString;
    slug: z.ZodString;
    config: z.ZodEffects<z.ZodObject<{
        schemaVersion: z.ZodLiteral<1>;
        title: z.ZodObject<{} & {
            en: z.ZodDefault<z.ZodString>;
            ar: z.ZodDefault<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            en: string;
            ar: string;
        }, {
            en?: string | undefined;
            ar?: string | undefined;
        }>;
        seo: z.ZodObject<{
            title: z.ZodObject<{} & {
                en: z.ZodDefault<z.ZodString>;
                ar: z.ZodDefault<z.ZodString>;
            }, "strict", z.ZodTypeAny, {
                en: string;
                ar: string;
            }, {
                en?: string | undefined;
                ar?: string | undefined;
            }>;
            description: z.ZodObject<{} & {
                en: z.ZodDefault<z.ZodString>;
                ar: z.ZodDefault<z.ZodString>;
            }, "strict", z.ZodTypeAny, {
                en: string;
                ar: string;
            }, {
                en?: string | undefined;
                ar?: string | undefined;
            }>;
            canonicalPath: z.ZodDefault<z.ZodNullable<z.ZodString>>;
            openGraphMediaId: z.ZodDefault<z.ZodNullable<z.ZodString>>;
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
            canonicalPath: string | null;
            openGraphMediaId: string | null;
            indexable: boolean;
        }, {
            description: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            title: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            canonicalPath?: string | null | undefined;
            openGraphMediaId?: string | null | undefined;
            indexable?: boolean | undefined;
        }>;
        sections: z.ZodArray<z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
            type: z.ZodLiteral<"HERO">;
            desktopMediaId: z.ZodDefault<z.ZodNullable<z.ZodString>>;
            mobileMediaId: z.ZodDefault<z.ZodNullable<z.ZodString>>;
            imageAlt: z.ZodObject<{
                en: z.ZodDefault<z.ZodString>;
                ar: z.ZodDefault<z.ZodString>;
            }, "strict", z.ZodTypeAny, {
                en: string;
                ar: string;
            }, {
                en?: string | undefined;
                ar?: string | undefined;
            }>;
            eyebrow: z.ZodObject<{} & {
                en: z.ZodDefault<z.ZodString>;
                ar: z.ZodDefault<z.ZodString>;
            }, "strict", z.ZodTypeAny, {
                en: string;
                ar: string;
            }, {
                en?: string | undefined;
                ar?: string | undefined;
            }>;
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
            description: z.ZodObject<{} & {
                en: z.ZodDefault<z.ZodString>;
                ar: z.ZodDefault<z.ZodString>;
            }, "strict", z.ZodTypeAny, {
                en: string;
                ar: string;
            }, {
                en?: string | undefined;
                ar?: string | undefined;
            }>;
            primaryCtaLabel: z.ZodObject<{} & {
                en: z.ZodDefault<z.ZodString>;
                ar: z.ZodDefault<z.ZodString>;
            }, "strict", z.ZodTypeAny, {
                en: string;
                ar: string;
            }, {
                en?: string | undefined;
                ar?: string | undefined;
            }>;
            primaryDestination: z.ZodDefault<z.ZodNullable<z.ZodUnion<[z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
                type: z.ZodLiteral<"HOME">;
            }, "strip", z.ZodTypeAny, {
                type: "HOME";
            }, {
                type: "HOME";
            }>, z.ZodObject<{
                type: z.ZodLiteral<"SHOP">;
            }, "strip", z.ZodTypeAny, {
                type: "SHOP";
            }, {
                type: "SHOP";
            }>, z.ZodObject<{
                type: z.ZodLiteral<"OFFERS">;
            }, "strip", z.ZodTypeAny, {
                type: "OFFERS";
            }, {
                type: "OFFERS";
            }>, z.ZodObject<{
                type: z.ZodLiteral<"NEW_ARRIVALS">;
            }, "strip", z.ZodTypeAny, {
                type: "NEW_ARRIVALS";
            }, {
                type: "NEW_ARRIVALS";
            }>, z.ZodObject<{
                type: z.ZodLiteral<"ABOUT">;
            }, "strip", z.ZodTypeAny, {
                type: "ABOUT";
            }, {
                type: "ABOUT";
            }>, z.ZodObject<{
                type: z.ZodLiteral<"CONTACT">;
            }, "strip", z.ZodTypeAny, {
                type: "CONTACT";
            }, {
                type: "CONTACT";
            }>, z.ZodObject<{
                type: z.ZodLiteral<"CATEGORY">;
                id: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                type: "CATEGORY";
                id: string;
            }, {
                type: "CATEGORY";
                id: string;
            }>, z.ZodObject<{
                type: z.ZodLiteral<"BRAND">;
                id: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                type: "BRAND";
                id: string;
            }, {
                type: "BRAND";
                id: string;
            }>, z.ZodObject<{
                type: z.ZodLiteral<"PRODUCT">;
                id: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                type: "PRODUCT";
                id: string;
            }, {
                type: "PRODUCT";
                id: string;
            }>, z.ZodObject<{
                type: z.ZodLiteral<"TAG">;
                id: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                type: "TAG";
                id: string;
            }, {
                type: "TAG";
                id: string;
            }>, z.ZodObject<{
                type: z.ZodLiteral<"CUSTOM_PATH">;
                path: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                path: string;
                type: "CUSTOM_PATH";
            }, {
                path: string;
                type: "CUSTOM_PATH";
            }>, z.ZodObject<{
                type: z.ZodLiteral<"EXTERNAL">;
                url: z.ZodEffects<z.ZodString, string, string>;
                newTab: z.ZodDefault<z.ZodBoolean>;
            }, "strip", z.ZodTypeAny, {
                type: "EXTERNAL";
                url: string;
                newTab: boolean;
            }, {
                type: "EXTERNAL";
                url: string;
                newTab?: boolean | undefined;
            }>]>, z.ZodObject<{
                type: z.ZodLiteral<"PAGE">;
                id: z.ZodString;
            }, "strict", z.ZodTypeAny, {
                type: "PAGE";
                id: string;
            }, {
                type: "PAGE";
                id: string;
            }>]>>>;
            secondaryCtaLabel: z.ZodObject<{} & {
                en: z.ZodDefault<z.ZodString>;
                ar: z.ZodDefault<z.ZodString>;
            }, "strict", z.ZodTypeAny, {
                en: string;
                ar: string;
            }, {
                en?: string | undefined;
                ar?: string | undefined;
            }>;
            secondaryDestination: z.ZodDefault<z.ZodNullable<z.ZodUnion<[z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
                type: z.ZodLiteral<"HOME">;
            }, "strip", z.ZodTypeAny, {
                type: "HOME";
            }, {
                type: "HOME";
            }>, z.ZodObject<{
                type: z.ZodLiteral<"SHOP">;
            }, "strip", z.ZodTypeAny, {
                type: "SHOP";
            }, {
                type: "SHOP";
            }>, z.ZodObject<{
                type: z.ZodLiteral<"OFFERS">;
            }, "strip", z.ZodTypeAny, {
                type: "OFFERS";
            }, {
                type: "OFFERS";
            }>, z.ZodObject<{
                type: z.ZodLiteral<"NEW_ARRIVALS">;
            }, "strip", z.ZodTypeAny, {
                type: "NEW_ARRIVALS";
            }, {
                type: "NEW_ARRIVALS";
            }>, z.ZodObject<{
                type: z.ZodLiteral<"ABOUT">;
            }, "strip", z.ZodTypeAny, {
                type: "ABOUT";
            }, {
                type: "ABOUT";
            }>, z.ZodObject<{
                type: z.ZodLiteral<"CONTACT">;
            }, "strip", z.ZodTypeAny, {
                type: "CONTACT";
            }, {
                type: "CONTACT";
            }>, z.ZodObject<{
                type: z.ZodLiteral<"CATEGORY">;
                id: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                type: "CATEGORY";
                id: string;
            }, {
                type: "CATEGORY";
                id: string;
            }>, z.ZodObject<{
                type: z.ZodLiteral<"BRAND">;
                id: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                type: "BRAND";
                id: string;
            }, {
                type: "BRAND";
                id: string;
            }>, z.ZodObject<{
                type: z.ZodLiteral<"PRODUCT">;
                id: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                type: "PRODUCT";
                id: string;
            }, {
                type: "PRODUCT";
                id: string;
            }>, z.ZodObject<{
                type: z.ZodLiteral<"TAG">;
                id: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                type: "TAG";
                id: string;
            }, {
                type: "TAG";
                id: string;
            }>, z.ZodObject<{
                type: z.ZodLiteral<"CUSTOM_PATH">;
                path: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                path: string;
                type: "CUSTOM_PATH";
            }, {
                path: string;
                type: "CUSTOM_PATH";
            }>, z.ZodObject<{
                type: z.ZodLiteral<"EXTERNAL">;
                url: z.ZodEffects<z.ZodString, string, string>;
                newTab: z.ZodDefault<z.ZodBoolean>;
            }, "strip", z.ZodTypeAny, {
                type: "EXTERNAL";
                url: string;
                newTab: boolean;
            }, {
                type: "EXTERNAL";
                url: string;
                newTab?: boolean | undefined;
            }>]>, z.ZodObject<{
                type: z.ZodLiteral<"PAGE">;
                id: z.ZodString;
            }, "strict", z.ZodTypeAny, {
                type: "PAGE";
                id: string;
            }, {
                type: "PAGE";
                id: string;
            }>]>>>;
            layout: z.ZodDefault<z.ZodEnum<["FULL", "SPLIT", "CONTAINED"]>>;
            alignment: z.ZodDefault<z.ZodEnum<["START", "CENTER", "END"]>>;
            contentPosition: z.ZodDefault<z.ZodEnum<["TOP", "CENTER", "BOTTOM"]>>;
            overlay: z.ZodDefault<z.ZodEnum<["NONE", "LIGHT", "MEDIUM", "STRONG"]>>;
            headingLevel: z.ZodDefault<z.ZodEnum<["H1", "H2"]>>;
            id: z.ZodString;
            analyticsKey: z.ZodString;
            label: z.ZodString;
            enabled: z.ZodDefault<z.ZodBoolean>;
            visibility: z.ZodEffects<z.ZodObject<{
                devices: z.ZodDefault<z.ZodArray<z.ZodEnum<["DESKTOP", "TABLET", "MOBILE"]>, "many">>;
                locales: z.ZodDefault<z.ZodArray<z.ZodEnum<["en", "ar"]>, "many">>;
                startsAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
                endsAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
            }, "strip", z.ZodTypeAny, {
                startsAt: string | null;
                endsAt: string | null;
                devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
                locales: ("en" | "ar")[];
            }, {
                startsAt?: string | null | undefined;
                endsAt?: string | null | undefined;
                devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
                locales?: ("en" | "ar")[] | undefined;
            }>, {
                startsAt: string | null;
                endsAt: string | null;
                devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
                locales: ("en" | "ar")[];
            }, {
                startsAt?: string | null | undefined;
                endsAt?: string | null | undefined;
                devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
                locales?: ("en" | "ar")[] | undefined;
            }>;
            surface: z.ZodDefault<z.ZodEnum<["DEFAULT", "SOFT", "DARK", "ACCENT"]>>;
            spacing: z.ZodDefault<z.ZodEnum<["NONE", "SMALL", "MEDIUM", "LARGE"]>>;
            width: z.ZodDefault<z.ZodEnum<["CONTENT", "WIDE", "FULL"]>>;
        }, "strict", z.ZodTypeAny, {
            type: "HERO";
            id: string;
            description: {
                en: string;
                ar: string;
            };
            label: string;
            width: "CONTENT" | "WIDE" | "FULL";
            enabled: boolean;
            heading: {
                en: string;
                ar: string;
            };
            eyebrow: {
                en: string;
                ar: string;
            };
            imageAlt: {
                en: string;
                ar: string;
            };
            visibility: {
                startsAt: string | null;
                endsAt: string | null;
                devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
                locales: ("en" | "ar")[];
            };
            alignment: "START" | "CENTER" | "END";
            desktopMediaId: string | null;
            mobileMediaId: string | null;
            primaryCtaLabel: {
                en: string;
                ar: string;
            };
            primaryDestination: {
                type: "HOME";
            } | {
                type: "SHOP";
            } | {
                type: "OFFERS";
            } | {
                type: "NEW_ARRIVALS";
            } | {
                type: "ABOUT";
            } | {
                type: "CONTACT";
            } | {
                type: "CATEGORY";
                id: string;
            } | {
                type: "BRAND";
                id: string;
            } | {
                type: "PRODUCT";
                id: string;
            } | {
                type: "TAG";
                id: string;
            } | {
                path: string;
                type: "CUSTOM_PATH";
            } | {
                type: "EXTERNAL";
                url: string;
                newTab: boolean;
            } | {
                type: "PAGE";
                id: string;
            } | null;
            secondaryCtaLabel: {
                en: string;
                ar: string;
            };
            secondaryDestination: {
                type: "HOME";
            } | {
                type: "SHOP";
            } | {
                type: "OFFERS";
            } | {
                type: "NEW_ARRIVALS";
            } | {
                type: "ABOUT";
            } | {
                type: "CONTACT";
            } | {
                type: "CATEGORY";
                id: string;
            } | {
                type: "BRAND";
                id: string;
            } | {
                type: "PRODUCT";
                id: string;
            } | {
                type: "TAG";
                id: string;
            } | {
                path: string;
                type: "CUSTOM_PATH";
            } | {
                type: "EXTERNAL";
                url: string;
                newTab: boolean;
            } | {
                type: "PAGE";
                id: string;
            } | null;
            layout: "SPLIT" | "FULL" | "CONTAINED";
            contentPosition: "CENTER" | "TOP" | "BOTTOM";
            overlay: "NONE" | "MEDIUM" | "LIGHT" | "STRONG";
            headingLevel: "H1" | "H2";
            analyticsKey: string;
            surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
            spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
        }, {
            type: "HERO";
            id: string;
            description: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            label: string;
            heading: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            eyebrow: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            imageAlt: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            visibility: {
                startsAt?: string | null | undefined;
                endsAt?: string | null | undefined;
                devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
                locales?: ("en" | "ar")[] | undefined;
            };
            primaryCtaLabel: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            secondaryCtaLabel: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            analyticsKey: string;
            width?: "CONTENT" | "WIDE" | "FULL" | undefined;
            enabled?: boolean | undefined;
            alignment?: "START" | "CENTER" | "END" | undefined;
            desktopMediaId?: string | null | undefined;
            mobileMediaId?: string | null | undefined;
            primaryDestination?: {
                type: "HOME";
            } | {
                type: "SHOP";
            } | {
                type: "OFFERS";
            } | {
                type: "NEW_ARRIVALS";
            } | {
                type: "ABOUT";
            } | {
                type: "CONTACT";
            } | {
                type: "CATEGORY";
                id: string;
            } | {
                type: "BRAND";
                id: string;
            } | {
                type: "PRODUCT";
                id: string;
            } | {
                type: "TAG";
                id: string;
            } | {
                path: string;
                type: "CUSTOM_PATH";
            } | {
                type: "EXTERNAL";
                url: string;
                newTab?: boolean | undefined;
            } | {
                type: "PAGE";
                id: string;
            } | null | undefined;
            secondaryDestination?: {
                type: "HOME";
            } | {
                type: "SHOP";
            } | {
                type: "OFFERS";
            } | {
                type: "NEW_ARRIVALS";
            } | {
                type: "ABOUT";
            } | {
                type: "CONTACT";
            } | {
                type: "CATEGORY";
                id: string;
            } | {
                type: "BRAND";
                id: string;
            } | {
                type: "PRODUCT";
                id: string;
            } | {
                type: "TAG";
                id: string;
            } | {
                path: string;
                type: "CUSTOM_PATH";
            } | {
                type: "EXTERNAL";
                url: string;
                newTab?: boolean | undefined;
            } | {
                type: "PAGE";
                id: string;
            } | null | undefined;
            layout?: "SPLIT" | "FULL" | "CONTAINED" | undefined;
            contentPosition?: "CENTER" | "TOP" | "BOTTOM" | undefined;
            overlay?: "NONE" | "MEDIUM" | "LIGHT" | "STRONG" | undefined;
            headingLevel?: "H1" | "H2" | undefined;
            surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
            spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"PRODUCT_GRID">;
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
            description: z.ZodObject<{} & {
                en: z.ZodDefault<z.ZodString>;
                ar: z.ZodDefault<z.ZodString>;
            }, "strict", z.ZodTypeAny, {
                en: string;
                ar: string;
            }, {
                en?: string | undefined;
                ar?: string | undefined;
            }>;
            source: z.ZodDiscriminatedUnion<"mode", [z.ZodObject<{
                mode: z.ZodLiteral<"MANUAL">;
                productIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            }, "strict", z.ZodTypeAny, {
                productIds: string[];
                mode: "MANUAL";
            }, {
                mode: "MANUAL";
                productIds?: string[] | undefined;
            }>, z.ZodObject<{
                mode: z.ZodLiteral<"CATEGORY">;
                referenceId: z.ZodString;
            }, "strict", z.ZodTypeAny, {
                mode: "CATEGORY";
                referenceId: string;
            }, {
                mode: "CATEGORY";
                referenceId: string;
            }>, z.ZodObject<{
                mode: z.ZodLiteral<"BRAND">;
                referenceId: z.ZodString;
            }, "strict", z.ZodTypeAny, {
                mode: "BRAND";
                referenceId: string;
            }, {
                mode: "BRAND";
                referenceId: string;
            }>, z.ZodObject<{
                mode: z.ZodLiteral<"TAG">;
                referenceId: z.ZodString;
            }, "strict", z.ZodTypeAny, {
                mode: "TAG";
                referenceId: string;
            }, {
                mode: "TAG";
                referenceId: string;
            }>, z.ZodObject<{
                mode: z.ZodLiteral<"PROMOTION">;
                referenceId: z.ZodString;
            }, "strict", z.ZodTypeAny, {
                mode: "PROMOTION";
                referenceId: string;
            }, {
                mode: "PROMOTION";
                referenceId: string;
            }>, z.ZodObject<{
                mode: z.ZodLiteral<"NEWEST">;
            }, "strict", z.ZodTypeAny, {
                mode: "NEWEST";
            }, {
                mode: "NEWEST";
            }>, z.ZodObject<{
                mode: z.ZodLiteral<"FEATURED">;
            }, "strict", z.ZodTypeAny, {
                mode: "FEATURED";
            }, {
                mode: "FEATURED";
            }>]>;
            limit: z.ZodDefault<z.ZodNumber>;
            columns: z.ZodObject<{
                desktop: z.ZodDefault<z.ZodNumber>;
                tablet: z.ZodDefault<z.ZodNumber>;
                mobile: z.ZodDefault<z.ZodNumber>;
            }, "strict", z.ZodTypeAny, {
                desktop: number;
                tablet: number;
                mobile: number;
            }, {
                desktop?: number | undefined;
                tablet?: number | undefined;
                mobile?: number | undefined;
            }>;
            showViewAll: z.ZodDefault<z.ZodBoolean>;
            viewAllLabel: z.ZodObject<{} & {
                en: z.ZodDefault<z.ZodString>;
                ar: z.ZodDefault<z.ZodString>;
            }, "strict", z.ZodTypeAny, {
                en: string;
                ar: string;
            }, {
                en?: string | undefined;
                ar?: string | undefined;
            }>;
            destination: z.ZodDefault<z.ZodNullable<z.ZodUnion<[z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
                type: z.ZodLiteral<"HOME">;
            }, "strip", z.ZodTypeAny, {
                type: "HOME";
            }, {
                type: "HOME";
            }>, z.ZodObject<{
                type: z.ZodLiteral<"SHOP">;
            }, "strip", z.ZodTypeAny, {
                type: "SHOP";
            }, {
                type: "SHOP";
            }>, z.ZodObject<{
                type: z.ZodLiteral<"OFFERS">;
            }, "strip", z.ZodTypeAny, {
                type: "OFFERS";
            }, {
                type: "OFFERS";
            }>, z.ZodObject<{
                type: z.ZodLiteral<"NEW_ARRIVALS">;
            }, "strip", z.ZodTypeAny, {
                type: "NEW_ARRIVALS";
            }, {
                type: "NEW_ARRIVALS";
            }>, z.ZodObject<{
                type: z.ZodLiteral<"ABOUT">;
            }, "strip", z.ZodTypeAny, {
                type: "ABOUT";
            }, {
                type: "ABOUT";
            }>, z.ZodObject<{
                type: z.ZodLiteral<"CONTACT">;
            }, "strip", z.ZodTypeAny, {
                type: "CONTACT";
            }, {
                type: "CONTACT";
            }>, z.ZodObject<{
                type: z.ZodLiteral<"CATEGORY">;
                id: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                type: "CATEGORY";
                id: string;
            }, {
                type: "CATEGORY";
                id: string;
            }>, z.ZodObject<{
                type: z.ZodLiteral<"BRAND">;
                id: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                type: "BRAND";
                id: string;
            }, {
                type: "BRAND";
                id: string;
            }>, z.ZodObject<{
                type: z.ZodLiteral<"PRODUCT">;
                id: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                type: "PRODUCT";
                id: string;
            }, {
                type: "PRODUCT";
                id: string;
            }>, z.ZodObject<{
                type: z.ZodLiteral<"TAG">;
                id: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                type: "TAG";
                id: string;
            }, {
                type: "TAG";
                id: string;
            }>, z.ZodObject<{
                type: z.ZodLiteral<"CUSTOM_PATH">;
                path: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                path: string;
                type: "CUSTOM_PATH";
            }, {
                path: string;
                type: "CUSTOM_PATH";
            }>, z.ZodObject<{
                type: z.ZodLiteral<"EXTERNAL">;
                url: z.ZodEffects<z.ZodString, string, string>;
                newTab: z.ZodDefault<z.ZodBoolean>;
            }, "strip", z.ZodTypeAny, {
                type: "EXTERNAL";
                url: string;
                newTab: boolean;
            }, {
                type: "EXTERNAL";
                url: string;
                newTab?: boolean | undefined;
            }>]>, z.ZodObject<{
                type: z.ZodLiteral<"PAGE">;
                id: z.ZodString;
            }, "strict", z.ZodTypeAny, {
                type: "PAGE";
                id: string;
            }, {
                type: "PAGE";
                id: string;
            }>]>>>;
            style: z.ZodDefault<z.ZodEnum<["CLEAN", "EDITORIAL", "COMPACT"]>>;
            id: z.ZodString;
            analyticsKey: z.ZodString;
            label: z.ZodString;
            enabled: z.ZodDefault<z.ZodBoolean>;
            visibility: z.ZodEffects<z.ZodObject<{
                devices: z.ZodDefault<z.ZodArray<z.ZodEnum<["DESKTOP", "TABLET", "MOBILE"]>, "many">>;
                locales: z.ZodDefault<z.ZodArray<z.ZodEnum<["en", "ar"]>, "many">>;
                startsAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
                endsAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
            }, "strip", z.ZodTypeAny, {
                startsAt: string | null;
                endsAt: string | null;
                devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
                locales: ("en" | "ar")[];
            }, {
                startsAt?: string | null | undefined;
                endsAt?: string | null | undefined;
                devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
                locales?: ("en" | "ar")[] | undefined;
            }>, {
                startsAt: string | null;
                endsAt: string | null;
                devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
                locales: ("en" | "ar")[];
            }, {
                startsAt?: string | null | undefined;
                endsAt?: string | null | undefined;
                devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
                locales?: ("en" | "ar")[] | undefined;
            }>;
            surface: z.ZodDefault<z.ZodEnum<["DEFAULT", "SOFT", "DARK", "ACCENT"]>>;
            spacing: z.ZodDefault<z.ZodEnum<["NONE", "SMALL", "MEDIUM", "LARGE"]>>;
            width: z.ZodDefault<z.ZodEnum<["CONTENT", "WIDE", "FULL"]>>;
        }, "strict", z.ZodTypeAny, {
            type: "PRODUCT_GRID";
            limit: number;
            id: string;
            description: {
                en: string;
                ar: string;
            };
            label: string;
            width: "CONTENT" | "WIDE" | "FULL";
            source: {
                productIds: string[];
                mode: "MANUAL";
            } | {
                mode: "CATEGORY";
                referenceId: string;
            } | {
                mode: "BRAND";
                referenceId: string;
            } | {
                mode: "TAG";
                referenceId: string;
            } | {
                mode: "PROMOTION";
                referenceId: string;
            } | {
                mode: "NEWEST";
            } | {
                mode: "FEATURED";
            };
            enabled: boolean;
            heading: {
                en: string;
                ar: string;
            };
            viewAllLabel: {
                en: string;
                ar: string;
            };
            destination: {
                type: "HOME";
            } | {
                type: "SHOP";
            } | {
                type: "OFFERS";
            } | {
                type: "NEW_ARRIVALS";
            } | {
                type: "ABOUT";
            } | {
                type: "CONTACT";
            } | {
                type: "CATEGORY";
                id: string;
            } | {
                type: "BRAND";
                id: string;
            } | {
                type: "PRODUCT";
                id: string;
            } | {
                type: "TAG";
                id: string;
            } | {
                path: string;
                type: "CUSTOM_PATH";
            } | {
                type: "EXTERNAL";
                url: string;
                newTab: boolean;
            } | {
                type: "PAGE";
                id: string;
            } | null;
            style: "COMPACT" | "CLEAN" | "EDITORIAL";
            visibility: {
                startsAt: string | null;
                endsAt: string | null;
                devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
                locales: ("en" | "ar")[];
            };
            showViewAll: boolean;
            columns: {
                desktop: number;
                tablet: number;
                mobile: number;
            };
            analyticsKey: string;
            surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
            spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
        }, {
            type: "PRODUCT_GRID";
            id: string;
            description: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            label: string;
            source: {
                mode: "MANUAL";
                productIds?: string[] | undefined;
            } | {
                mode: "CATEGORY";
                referenceId: string;
            } | {
                mode: "BRAND";
                referenceId: string;
            } | {
                mode: "TAG";
                referenceId: string;
            } | {
                mode: "PROMOTION";
                referenceId: string;
            } | {
                mode: "NEWEST";
            } | {
                mode: "FEATURED";
            };
            heading: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            viewAllLabel: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            visibility: {
                startsAt?: string | null | undefined;
                endsAt?: string | null | undefined;
                devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
                locales?: ("en" | "ar")[] | undefined;
            };
            columns: {
                desktop?: number | undefined;
                tablet?: number | undefined;
                mobile?: number | undefined;
            };
            analyticsKey: string;
            limit?: number | undefined;
            width?: "CONTENT" | "WIDE" | "FULL" | undefined;
            enabled?: boolean | undefined;
            destination?: {
                type: "HOME";
            } | {
                type: "SHOP";
            } | {
                type: "OFFERS";
            } | {
                type: "NEW_ARRIVALS";
            } | {
                type: "ABOUT";
            } | {
                type: "CONTACT";
            } | {
                type: "CATEGORY";
                id: string;
            } | {
                type: "BRAND";
                id: string;
            } | {
                type: "PRODUCT";
                id: string;
            } | {
                type: "TAG";
                id: string;
            } | {
                path: string;
                type: "CUSTOM_PATH";
            } | {
                type: "EXTERNAL";
                url: string;
                newTab?: boolean | undefined;
            } | {
                type: "PAGE";
                id: string;
            } | null | undefined;
            style?: "COMPACT" | "CLEAN" | "EDITORIAL" | undefined;
            showViewAll?: boolean | undefined;
            surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
            spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"PRODUCT_CAROUSEL">;
            autoplay: z.ZodDefault<z.ZodBoolean>;
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
            description: z.ZodObject<{} & {
                en: z.ZodDefault<z.ZodString>;
                ar: z.ZodDefault<z.ZodString>;
            }, "strict", z.ZodTypeAny, {
                en: string;
                ar: string;
            }, {
                en?: string | undefined;
                ar?: string | undefined;
            }>;
            source: z.ZodDiscriminatedUnion<"mode", [z.ZodObject<{
                mode: z.ZodLiteral<"MANUAL">;
                productIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            }, "strict", z.ZodTypeAny, {
                productIds: string[];
                mode: "MANUAL";
            }, {
                mode: "MANUAL";
                productIds?: string[] | undefined;
            }>, z.ZodObject<{
                mode: z.ZodLiteral<"CATEGORY">;
                referenceId: z.ZodString;
            }, "strict", z.ZodTypeAny, {
                mode: "CATEGORY";
                referenceId: string;
            }, {
                mode: "CATEGORY";
                referenceId: string;
            }>, z.ZodObject<{
                mode: z.ZodLiteral<"BRAND">;
                referenceId: z.ZodString;
            }, "strict", z.ZodTypeAny, {
                mode: "BRAND";
                referenceId: string;
            }, {
                mode: "BRAND";
                referenceId: string;
            }>, z.ZodObject<{
                mode: z.ZodLiteral<"TAG">;
                referenceId: z.ZodString;
            }, "strict", z.ZodTypeAny, {
                mode: "TAG";
                referenceId: string;
            }, {
                mode: "TAG";
                referenceId: string;
            }>, z.ZodObject<{
                mode: z.ZodLiteral<"PROMOTION">;
                referenceId: z.ZodString;
            }, "strict", z.ZodTypeAny, {
                mode: "PROMOTION";
                referenceId: string;
            }, {
                mode: "PROMOTION";
                referenceId: string;
            }>, z.ZodObject<{
                mode: z.ZodLiteral<"NEWEST">;
            }, "strict", z.ZodTypeAny, {
                mode: "NEWEST";
            }, {
                mode: "NEWEST";
            }>, z.ZodObject<{
                mode: z.ZodLiteral<"FEATURED">;
            }, "strict", z.ZodTypeAny, {
                mode: "FEATURED";
            }, {
                mode: "FEATURED";
            }>]>;
            limit: z.ZodDefault<z.ZodNumber>;
            columns: z.ZodObject<{
                desktop: z.ZodDefault<z.ZodNumber>;
                tablet: z.ZodDefault<z.ZodNumber>;
                mobile: z.ZodDefault<z.ZodNumber>;
            }, "strict", z.ZodTypeAny, {
                desktop: number;
                tablet: number;
                mobile: number;
            }, {
                desktop?: number | undefined;
                tablet?: number | undefined;
                mobile?: number | undefined;
            }>;
            showViewAll: z.ZodDefault<z.ZodBoolean>;
            viewAllLabel: z.ZodObject<{} & {
                en: z.ZodDefault<z.ZodString>;
                ar: z.ZodDefault<z.ZodString>;
            }, "strict", z.ZodTypeAny, {
                en: string;
                ar: string;
            }, {
                en?: string | undefined;
                ar?: string | undefined;
            }>;
            destination: z.ZodDefault<z.ZodNullable<z.ZodUnion<[z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
                type: z.ZodLiteral<"HOME">;
            }, "strip", z.ZodTypeAny, {
                type: "HOME";
            }, {
                type: "HOME";
            }>, z.ZodObject<{
                type: z.ZodLiteral<"SHOP">;
            }, "strip", z.ZodTypeAny, {
                type: "SHOP";
            }, {
                type: "SHOP";
            }>, z.ZodObject<{
                type: z.ZodLiteral<"OFFERS">;
            }, "strip", z.ZodTypeAny, {
                type: "OFFERS";
            }, {
                type: "OFFERS";
            }>, z.ZodObject<{
                type: z.ZodLiteral<"NEW_ARRIVALS">;
            }, "strip", z.ZodTypeAny, {
                type: "NEW_ARRIVALS";
            }, {
                type: "NEW_ARRIVALS";
            }>, z.ZodObject<{
                type: z.ZodLiteral<"ABOUT">;
            }, "strip", z.ZodTypeAny, {
                type: "ABOUT";
            }, {
                type: "ABOUT";
            }>, z.ZodObject<{
                type: z.ZodLiteral<"CONTACT">;
            }, "strip", z.ZodTypeAny, {
                type: "CONTACT";
            }, {
                type: "CONTACT";
            }>, z.ZodObject<{
                type: z.ZodLiteral<"CATEGORY">;
                id: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                type: "CATEGORY";
                id: string;
            }, {
                type: "CATEGORY";
                id: string;
            }>, z.ZodObject<{
                type: z.ZodLiteral<"BRAND">;
                id: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                type: "BRAND";
                id: string;
            }, {
                type: "BRAND";
                id: string;
            }>, z.ZodObject<{
                type: z.ZodLiteral<"PRODUCT">;
                id: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                type: "PRODUCT";
                id: string;
            }, {
                type: "PRODUCT";
                id: string;
            }>, z.ZodObject<{
                type: z.ZodLiteral<"TAG">;
                id: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                type: "TAG";
                id: string;
            }, {
                type: "TAG";
                id: string;
            }>, z.ZodObject<{
                type: z.ZodLiteral<"CUSTOM_PATH">;
                path: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                path: string;
                type: "CUSTOM_PATH";
            }, {
                path: string;
                type: "CUSTOM_PATH";
            }>, z.ZodObject<{
                type: z.ZodLiteral<"EXTERNAL">;
                url: z.ZodEffects<z.ZodString, string, string>;
                newTab: z.ZodDefault<z.ZodBoolean>;
            }, "strip", z.ZodTypeAny, {
                type: "EXTERNAL";
                url: string;
                newTab: boolean;
            }, {
                type: "EXTERNAL";
                url: string;
                newTab?: boolean | undefined;
            }>]>, z.ZodObject<{
                type: z.ZodLiteral<"PAGE">;
                id: z.ZodString;
            }, "strict", z.ZodTypeAny, {
                type: "PAGE";
                id: string;
            }, {
                type: "PAGE";
                id: string;
            }>]>>>;
            style: z.ZodDefault<z.ZodEnum<["CLEAN", "EDITORIAL", "COMPACT"]>>;
            id: z.ZodString;
            analyticsKey: z.ZodString;
            label: z.ZodString;
            enabled: z.ZodDefault<z.ZodBoolean>;
            visibility: z.ZodEffects<z.ZodObject<{
                devices: z.ZodDefault<z.ZodArray<z.ZodEnum<["DESKTOP", "TABLET", "MOBILE"]>, "many">>;
                locales: z.ZodDefault<z.ZodArray<z.ZodEnum<["en", "ar"]>, "many">>;
                startsAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
                endsAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
            }, "strip", z.ZodTypeAny, {
                startsAt: string | null;
                endsAt: string | null;
                devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
                locales: ("en" | "ar")[];
            }, {
                startsAt?: string | null | undefined;
                endsAt?: string | null | undefined;
                devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
                locales?: ("en" | "ar")[] | undefined;
            }>, {
                startsAt: string | null;
                endsAt: string | null;
                devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
                locales: ("en" | "ar")[];
            }, {
                startsAt?: string | null | undefined;
                endsAt?: string | null | undefined;
                devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
                locales?: ("en" | "ar")[] | undefined;
            }>;
            surface: z.ZodDefault<z.ZodEnum<["DEFAULT", "SOFT", "DARK", "ACCENT"]>>;
            spacing: z.ZodDefault<z.ZodEnum<["NONE", "SMALL", "MEDIUM", "LARGE"]>>;
            width: z.ZodDefault<z.ZodEnum<["CONTENT", "WIDE", "FULL"]>>;
        }, "strict", z.ZodTypeAny, {
            type: "PRODUCT_CAROUSEL";
            limit: number;
            id: string;
            description: {
                en: string;
                ar: string;
            };
            label: string;
            width: "CONTENT" | "WIDE" | "FULL";
            source: {
                productIds: string[];
                mode: "MANUAL";
            } | {
                mode: "CATEGORY";
                referenceId: string;
            } | {
                mode: "BRAND";
                referenceId: string;
            } | {
                mode: "TAG";
                referenceId: string;
            } | {
                mode: "PROMOTION";
                referenceId: string;
            } | {
                mode: "NEWEST";
            } | {
                mode: "FEATURED";
            };
            enabled: boolean;
            heading: {
                en: string;
                ar: string;
            };
            viewAllLabel: {
                en: string;
                ar: string;
            };
            destination: {
                type: "HOME";
            } | {
                type: "SHOP";
            } | {
                type: "OFFERS";
            } | {
                type: "NEW_ARRIVALS";
            } | {
                type: "ABOUT";
            } | {
                type: "CONTACT";
            } | {
                type: "CATEGORY";
                id: string;
            } | {
                type: "BRAND";
                id: string;
            } | {
                type: "PRODUCT";
                id: string;
            } | {
                type: "TAG";
                id: string;
            } | {
                path: string;
                type: "CUSTOM_PATH";
            } | {
                type: "EXTERNAL";
                url: string;
                newTab: boolean;
            } | {
                type: "PAGE";
                id: string;
            } | null;
            style: "COMPACT" | "CLEAN" | "EDITORIAL";
            visibility: {
                startsAt: string | null;
                endsAt: string | null;
                devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
                locales: ("en" | "ar")[];
            };
            showViewAll: boolean;
            columns: {
                desktop: number;
                tablet: number;
                mobile: number;
            };
            analyticsKey: string;
            surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
            spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
            autoplay: boolean;
        }, {
            type: "PRODUCT_CAROUSEL";
            id: string;
            description: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            label: string;
            source: {
                mode: "MANUAL";
                productIds?: string[] | undefined;
            } | {
                mode: "CATEGORY";
                referenceId: string;
            } | {
                mode: "BRAND";
                referenceId: string;
            } | {
                mode: "TAG";
                referenceId: string;
            } | {
                mode: "PROMOTION";
                referenceId: string;
            } | {
                mode: "NEWEST";
            } | {
                mode: "FEATURED";
            };
            heading: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            viewAllLabel: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            visibility: {
                startsAt?: string | null | undefined;
                endsAt?: string | null | undefined;
                devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
                locales?: ("en" | "ar")[] | undefined;
            };
            columns: {
                desktop?: number | undefined;
                tablet?: number | undefined;
                mobile?: number | undefined;
            };
            analyticsKey: string;
            limit?: number | undefined;
            width?: "CONTENT" | "WIDE" | "FULL" | undefined;
            enabled?: boolean | undefined;
            destination?: {
                type: "HOME";
            } | {
                type: "SHOP";
            } | {
                type: "OFFERS";
            } | {
                type: "NEW_ARRIVALS";
            } | {
                type: "ABOUT";
            } | {
                type: "CONTACT";
            } | {
                type: "CATEGORY";
                id: string;
            } | {
                type: "BRAND";
                id: string;
            } | {
                type: "PRODUCT";
                id: string;
            } | {
                type: "TAG";
                id: string;
            } | {
                path: string;
                type: "CUSTOM_PATH";
            } | {
                type: "EXTERNAL";
                url: string;
                newTab?: boolean | undefined;
            } | {
                type: "PAGE";
                id: string;
            } | null | undefined;
            style?: "COMPACT" | "CLEAN" | "EDITORIAL" | undefined;
            showViewAll?: boolean | undefined;
            surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
            spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
            autoplay?: boolean | undefined;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"CATEGORIES">;
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
            description: z.ZodObject<{} & {
                en: z.ZodDefault<z.ZodString>;
                ar: z.ZodDefault<z.ZodString>;
            }, "strict", z.ZodTypeAny, {
                en: string;
                ar: string;
            }, {
                en?: string | undefined;
                ar?: string | undefined;
            }>;
            categoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            showChildren: z.ZodDefault<z.ZodBoolean>;
            showGrandchildren: z.ZodDefault<z.ZodBoolean>;
            limit: z.ZodDefault<z.ZodNumber>;
            layout: z.ZodDefault<z.ZodEnum<["CARDS", "IMAGE_TILES", "COMPACT", "EDITORIAL"]>>;
            id: z.ZodString;
            analyticsKey: z.ZodString;
            label: z.ZodString;
            enabled: z.ZodDefault<z.ZodBoolean>;
            visibility: z.ZodEffects<z.ZodObject<{
                devices: z.ZodDefault<z.ZodArray<z.ZodEnum<["DESKTOP", "TABLET", "MOBILE"]>, "many">>;
                locales: z.ZodDefault<z.ZodArray<z.ZodEnum<["en", "ar"]>, "many">>;
                startsAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
                endsAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
            }, "strip", z.ZodTypeAny, {
                startsAt: string | null;
                endsAt: string | null;
                devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
                locales: ("en" | "ar")[];
            }, {
                startsAt?: string | null | undefined;
                endsAt?: string | null | undefined;
                devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
                locales?: ("en" | "ar")[] | undefined;
            }>, {
                startsAt: string | null;
                endsAt: string | null;
                devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
                locales: ("en" | "ar")[];
            }, {
                startsAt?: string | null | undefined;
                endsAt?: string | null | undefined;
                devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
                locales?: ("en" | "ar")[] | undefined;
            }>;
            surface: z.ZodDefault<z.ZodEnum<["DEFAULT", "SOFT", "DARK", "ACCENT"]>>;
            spacing: z.ZodDefault<z.ZodEnum<["NONE", "SMALL", "MEDIUM", "LARGE"]>>;
            width: z.ZodDefault<z.ZodEnum<["CONTENT", "WIDE", "FULL"]>>;
        }, "strict", z.ZodTypeAny, {
            type: "CATEGORIES";
            limit: number;
            id: string;
            description: {
                en: string;
                ar: string;
            };
            label: string;
            width: "CONTENT" | "WIDE" | "FULL";
            enabled: boolean;
            categoryIds: string[];
            heading: {
                en: string;
                ar: string;
            };
            visibility: {
                startsAt: string | null;
                endsAt: string | null;
                devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
                locales: ("en" | "ar")[];
            };
            layout: "COMPACT" | "CARDS" | "EDITORIAL" | "IMAGE_TILES";
            analyticsKey: string;
            surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
            spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
            showChildren: boolean;
            showGrandchildren: boolean;
        }, {
            type: "CATEGORIES";
            id: string;
            description: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            label: string;
            heading: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            visibility: {
                startsAt?: string | null | undefined;
                endsAt?: string | null | undefined;
                devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
                locales?: ("en" | "ar")[] | undefined;
            };
            analyticsKey: string;
            limit?: number | undefined;
            width?: "CONTENT" | "WIDE" | "FULL" | undefined;
            enabled?: boolean | undefined;
            categoryIds?: string[] | undefined;
            layout?: "COMPACT" | "CARDS" | "EDITORIAL" | "IMAGE_TILES" | undefined;
            surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
            spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
            showChildren?: boolean | undefined;
            showGrandchildren?: boolean | undefined;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"BRANDS">;
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
            description: z.ZodObject<{} & {
                en: z.ZodDefault<z.ZodString>;
                ar: z.ZodDefault<z.ZodString>;
            }, "strict", z.ZodTypeAny, {
                en: string;
                ar: string;
            }, {
                en?: string | undefined;
                ar?: string | undefined;
            }>;
            mode: z.ZodDefault<z.ZodEnum<["MANUAL", "FEATURED"]>>;
            brandIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            limit: z.ZodDefault<z.ZodNumber>;
            layout: z.ZodDefault<z.ZodEnum<["LOGO_RAIL", "LOGO_GRID", "EDITORIAL"]>>;
            id: z.ZodString;
            analyticsKey: z.ZodString;
            label: z.ZodString;
            enabled: z.ZodDefault<z.ZodBoolean>;
            visibility: z.ZodEffects<z.ZodObject<{
                devices: z.ZodDefault<z.ZodArray<z.ZodEnum<["DESKTOP", "TABLET", "MOBILE"]>, "many">>;
                locales: z.ZodDefault<z.ZodArray<z.ZodEnum<["en", "ar"]>, "many">>;
                startsAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
                endsAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
            }, "strip", z.ZodTypeAny, {
                startsAt: string | null;
                endsAt: string | null;
                devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
                locales: ("en" | "ar")[];
            }, {
                startsAt?: string | null | undefined;
                endsAt?: string | null | undefined;
                devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
                locales?: ("en" | "ar")[] | undefined;
            }>, {
                startsAt: string | null;
                endsAt: string | null;
                devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
                locales: ("en" | "ar")[];
            }, {
                startsAt?: string | null | undefined;
                endsAt?: string | null | undefined;
                devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
                locales?: ("en" | "ar")[] | undefined;
            }>;
            surface: z.ZodDefault<z.ZodEnum<["DEFAULT", "SOFT", "DARK", "ACCENT"]>>;
            spacing: z.ZodDefault<z.ZodEnum<["NONE", "SMALL", "MEDIUM", "LARGE"]>>;
            width: z.ZodDefault<z.ZodEnum<["CONTENT", "WIDE", "FULL"]>>;
        }, "strict", z.ZodTypeAny, {
            type: "BRANDS";
            limit: number;
            id: string;
            description: {
                en: string;
                ar: string;
            };
            label: string;
            width: "CONTENT" | "WIDE" | "FULL";
            enabled: boolean;
            brandIds: string[];
            heading: {
                en: string;
                ar: string;
            };
            visibility: {
                startsAt: string | null;
                endsAt: string | null;
                devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
                locales: ("en" | "ar")[];
            };
            mode: "MANUAL" | "FEATURED";
            layout: "LOGO_GRID" | "EDITORIAL" | "LOGO_RAIL";
            analyticsKey: string;
            surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
            spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
        }, {
            type: "BRANDS";
            id: string;
            description: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            label: string;
            heading: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            visibility: {
                startsAt?: string | null | undefined;
                endsAt?: string | null | undefined;
                devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
                locales?: ("en" | "ar")[] | undefined;
            };
            analyticsKey: string;
            limit?: number | undefined;
            width?: "CONTENT" | "WIDE" | "FULL" | undefined;
            enabled?: boolean | undefined;
            brandIds?: string[] | undefined;
            mode?: "MANUAL" | "FEATURED" | undefined;
            layout?: "LOGO_GRID" | "EDITORIAL" | "LOGO_RAIL" | undefined;
            surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
            spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"PROMOTION">;
            promotionId: z.ZodString;
            eyebrow: z.ZodObject<{} & {
                en: z.ZodDefault<z.ZodString>;
                ar: z.ZodDefault<z.ZodString>;
            }, "strict", z.ZodTypeAny, {
                en: string;
                ar: string;
            }, {
                en?: string | undefined;
                ar?: string | undefined;
            }>;
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
            description: z.ZodObject<{} & {
                en: z.ZodDefault<z.ZodString>;
                ar: z.ZodDefault<z.ZodString>;
            }, "strict", z.ZodTypeAny, {
                en: string;
                ar: string;
            }, {
                en?: string | undefined;
                ar?: string | undefined;
            }>;
            mediaAssetId: z.ZodDefault<z.ZodNullable<z.ZodString>>;
            imageAlt: z.ZodObject<{
                en: z.ZodDefault<z.ZodString>;
                ar: z.ZodDefault<z.ZodString>;
            }, "strict", z.ZodTypeAny, {
                en: string;
                ar: string;
            }, {
                en?: string | undefined;
                ar?: string | undefined;
            }>;
            ctaLabel: z.ZodObject<{} & {
                en: z.ZodDefault<z.ZodString>;
                ar: z.ZodDefault<z.ZodString>;
            }, "strict", z.ZodTypeAny, {
                en: string;
                ar: string;
            }, {
                en?: string | undefined;
                ar?: string | undefined;
            }>;
            destination: z.ZodDefault<z.ZodNullable<z.ZodUnion<[z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
                type: z.ZodLiteral<"HOME">;
            }, "strip", z.ZodTypeAny, {
                type: "HOME";
            }, {
                type: "HOME";
            }>, z.ZodObject<{
                type: z.ZodLiteral<"SHOP">;
            }, "strip", z.ZodTypeAny, {
                type: "SHOP";
            }, {
                type: "SHOP";
            }>, z.ZodObject<{
                type: z.ZodLiteral<"OFFERS">;
            }, "strip", z.ZodTypeAny, {
                type: "OFFERS";
            }, {
                type: "OFFERS";
            }>, z.ZodObject<{
                type: z.ZodLiteral<"NEW_ARRIVALS">;
            }, "strip", z.ZodTypeAny, {
                type: "NEW_ARRIVALS";
            }, {
                type: "NEW_ARRIVALS";
            }>, z.ZodObject<{
                type: z.ZodLiteral<"ABOUT">;
            }, "strip", z.ZodTypeAny, {
                type: "ABOUT";
            }, {
                type: "ABOUT";
            }>, z.ZodObject<{
                type: z.ZodLiteral<"CONTACT">;
            }, "strip", z.ZodTypeAny, {
                type: "CONTACT";
            }, {
                type: "CONTACT";
            }>, z.ZodObject<{
                type: z.ZodLiteral<"CATEGORY">;
                id: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                type: "CATEGORY";
                id: string;
            }, {
                type: "CATEGORY";
                id: string;
            }>, z.ZodObject<{
                type: z.ZodLiteral<"BRAND">;
                id: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                type: "BRAND";
                id: string;
            }, {
                type: "BRAND";
                id: string;
            }>, z.ZodObject<{
                type: z.ZodLiteral<"PRODUCT">;
                id: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                type: "PRODUCT";
                id: string;
            }, {
                type: "PRODUCT";
                id: string;
            }>, z.ZodObject<{
                type: z.ZodLiteral<"TAG">;
                id: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                type: "TAG";
                id: string;
            }, {
                type: "TAG";
                id: string;
            }>, z.ZodObject<{
                type: z.ZodLiteral<"CUSTOM_PATH">;
                path: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                path: string;
                type: "CUSTOM_PATH";
            }, {
                path: string;
                type: "CUSTOM_PATH";
            }>, z.ZodObject<{
                type: z.ZodLiteral<"EXTERNAL">;
                url: z.ZodEffects<z.ZodString, string, string>;
                newTab: z.ZodDefault<z.ZodBoolean>;
            }, "strip", z.ZodTypeAny, {
                type: "EXTERNAL";
                url: string;
                newTab: boolean;
            }, {
                type: "EXTERNAL";
                url: string;
                newTab?: boolean | undefined;
            }>]>, z.ZodObject<{
                type: z.ZodLiteral<"PAGE">;
                id: z.ZodString;
            }, "strict", z.ZodTypeAny, {
                type: "PAGE";
                id: string;
            }, {
                type: "PAGE";
                id: string;
            }>]>>>;
            expiredBehavior: z.ZodDefault<z.ZodEnum<["HIDE", "SHOW_EXPIRED"]>>;
            style: z.ZodDefault<z.ZodEnum<["BANNER", "EDITORIAL", "DARK"]>>;
            id: z.ZodString;
            analyticsKey: z.ZodString;
            label: z.ZodString;
            enabled: z.ZodDefault<z.ZodBoolean>;
            visibility: z.ZodEffects<z.ZodObject<{
                devices: z.ZodDefault<z.ZodArray<z.ZodEnum<["DESKTOP", "TABLET", "MOBILE"]>, "many">>;
                locales: z.ZodDefault<z.ZodArray<z.ZodEnum<["en", "ar"]>, "many">>;
                startsAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
                endsAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
            }, "strip", z.ZodTypeAny, {
                startsAt: string | null;
                endsAt: string | null;
                devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
                locales: ("en" | "ar")[];
            }, {
                startsAt?: string | null | undefined;
                endsAt?: string | null | undefined;
                devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
                locales?: ("en" | "ar")[] | undefined;
            }>, {
                startsAt: string | null;
                endsAt: string | null;
                devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
                locales: ("en" | "ar")[];
            }, {
                startsAt?: string | null | undefined;
                endsAt?: string | null | undefined;
                devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
                locales?: ("en" | "ar")[] | undefined;
            }>;
            surface: z.ZodDefault<z.ZodEnum<["DEFAULT", "SOFT", "DARK", "ACCENT"]>>;
            spacing: z.ZodDefault<z.ZodEnum<["NONE", "SMALL", "MEDIUM", "LARGE"]>>;
            width: z.ZodDefault<z.ZodEnum<["CONTENT", "WIDE", "FULL"]>>;
        }, "strict", z.ZodTypeAny, {
            type: "PROMOTION";
            id: string;
            description: {
                en: string;
                ar: string;
            };
            label: string;
            width: "CONTENT" | "WIDE" | "FULL";
            promotionId: string;
            enabled: boolean;
            heading: {
                en: string;
                ar: string;
            };
            eyebrow: {
                en: string;
                ar: string;
            };
            ctaLabel: {
                en: string;
                ar: string;
            };
            destination: {
                type: "HOME";
            } | {
                type: "SHOP";
            } | {
                type: "OFFERS";
            } | {
                type: "NEW_ARRIVALS";
            } | {
                type: "ABOUT";
            } | {
                type: "CONTACT";
            } | {
                type: "CATEGORY";
                id: string;
            } | {
                type: "BRAND";
                id: string;
            } | {
                type: "PRODUCT";
                id: string;
            } | {
                type: "TAG";
                id: string;
            } | {
                path: string;
                type: "CUSTOM_PATH";
            } | {
                type: "EXTERNAL";
                url: string;
                newTab: boolean;
            } | {
                type: "PAGE";
                id: string;
            } | null;
            mediaAssetId: string | null;
            imageAlt: {
                en: string;
                ar: string;
            };
            style: "DARK" | "EDITORIAL" | "BANNER";
            visibility: {
                startsAt: string | null;
                endsAt: string | null;
                devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
                locales: ("en" | "ar")[];
            };
            analyticsKey: string;
            surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
            spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
            expiredBehavior: "HIDE" | "SHOW_EXPIRED";
        }, {
            type: "PROMOTION";
            id: string;
            description: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            label: string;
            promotionId: string;
            heading: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            eyebrow: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            ctaLabel: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            imageAlt: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            visibility: {
                startsAt?: string | null | undefined;
                endsAt?: string | null | undefined;
                devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
                locales?: ("en" | "ar")[] | undefined;
            };
            analyticsKey: string;
            width?: "CONTENT" | "WIDE" | "FULL" | undefined;
            enabled?: boolean | undefined;
            destination?: {
                type: "HOME";
            } | {
                type: "SHOP";
            } | {
                type: "OFFERS";
            } | {
                type: "NEW_ARRIVALS";
            } | {
                type: "ABOUT";
            } | {
                type: "CONTACT";
            } | {
                type: "CATEGORY";
                id: string;
            } | {
                type: "BRAND";
                id: string;
            } | {
                type: "PRODUCT";
                id: string;
            } | {
                type: "TAG";
                id: string;
            } | {
                path: string;
                type: "CUSTOM_PATH";
            } | {
                type: "EXTERNAL";
                url: string;
                newTab?: boolean | undefined;
            } | {
                type: "PAGE";
                id: string;
            } | null | undefined;
            mediaAssetId?: string | null | undefined;
            style?: "DARK" | "EDITORIAL" | "BANNER" | undefined;
            surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
            spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
            expiredBehavior?: "HIDE" | "SHOW_EXPIRED" | undefined;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"ROUTINE_CTA">;
            eyebrow: z.ZodObject<{} & {
                en: z.ZodDefault<z.ZodString>;
                ar: z.ZodDefault<z.ZodString>;
            }, "strict", z.ZodTypeAny, {
                en: string;
                ar: string;
            }, {
                en?: string | undefined;
                ar?: string | undefined;
            }>;
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
            description: z.ZodObject<{} & {
                en: z.ZodDefault<z.ZodString>;
                ar: z.ZodDefault<z.ZodString>;
            }, "strict", z.ZodTypeAny, {
                en: string;
                ar: string;
            }, {
                en?: string | undefined;
                ar?: string | undefined;
            }>;
            mediaAssetId: z.ZodDefault<z.ZodNullable<z.ZodString>>;
            imageAlt: z.ZodObject<{
                en: z.ZodDefault<z.ZodString>;
                ar: z.ZodDefault<z.ZodString>;
            }, "strict", z.ZodTypeAny, {
                en: string;
                ar: string;
            }, {
                en?: string | undefined;
                ar?: string | undefined;
            }>;
            ctaLabel: z.ZodObject<{} & {
                en: z.ZodDefault<z.ZodString>;
                ar: z.ZodDefault<z.ZodString>;
            }, "strict", z.ZodTypeAny, {
                en: string;
                ar: string;
            }, {
                en?: string | undefined;
                ar?: string | undefined;
            }>;
            destination: z.ZodDefault<z.ZodUnion<[z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
                type: z.ZodLiteral<"HOME">;
            }, "strip", z.ZodTypeAny, {
                type: "HOME";
            }, {
                type: "HOME";
            }>, z.ZodObject<{
                type: z.ZodLiteral<"SHOP">;
            }, "strip", z.ZodTypeAny, {
                type: "SHOP";
            }, {
                type: "SHOP";
            }>, z.ZodObject<{
                type: z.ZodLiteral<"OFFERS">;
            }, "strip", z.ZodTypeAny, {
                type: "OFFERS";
            }, {
                type: "OFFERS";
            }>, z.ZodObject<{
                type: z.ZodLiteral<"NEW_ARRIVALS">;
            }, "strip", z.ZodTypeAny, {
                type: "NEW_ARRIVALS";
            }, {
                type: "NEW_ARRIVALS";
            }>, z.ZodObject<{
                type: z.ZodLiteral<"ABOUT">;
            }, "strip", z.ZodTypeAny, {
                type: "ABOUT";
            }, {
                type: "ABOUT";
            }>, z.ZodObject<{
                type: z.ZodLiteral<"CONTACT">;
            }, "strip", z.ZodTypeAny, {
                type: "CONTACT";
            }, {
                type: "CONTACT";
            }>, z.ZodObject<{
                type: z.ZodLiteral<"CATEGORY">;
                id: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                type: "CATEGORY";
                id: string;
            }, {
                type: "CATEGORY";
                id: string;
            }>, z.ZodObject<{
                type: z.ZodLiteral<"BRAND">;
                id: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                type: "BRAND";
                id: string;
            }, {
                type: "BRAND";
                id: string;
            }>, z.ZodObject<{
                type: z.ZodLiteral<"PRODUCT">;
                id: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                type: "PRODUCT";
                id: string;
            }, {
                type: "PRODUCT";
                id: string;
            }>, z.ZodObject<{
                type: z.ZodLiteral<"TAG">;
                id: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                type: "TAG";
                id: string;
            }, {
                type: "TAG";
                id: string;
            }>, z.ZodObject<{
                type: z.ZodLiteral<"CUSTOM_PATH">;
                path: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                path: string;
                type: "CUSTOM_PATH";
            }, {
                path: string;
                type: "CUSTOM_PATH";
            }>, z.ZodObject<{
                type: z.ZodLiteral<"EXTERNAL">;
                url: z.ZodEffects<z.ZodString, string, string>;
                newTab: z.ZodDefault<z.ZodBoolean>;
            }, "strip", z.ZodTypeAny, {
                type: "EXTERNAL";
                url: string;
                newTab: boolean;
            }, {
                type: "EXTERNAL";
                url: string;
                newTab?: boolean | undefined;
            }>]>, z.ZodObject<{
                type: z.ZodLiteral<"PAGE">;
                id: z.ZodString;
            }, "strict", z.ZodTypeAny, {
                type: "PAGE";
                id: string;
            }, {
                type: "PAGE";
                id: string;
            }>]>>;
            style: z.ZodDefault<z.ZodEnum<["EDITORIAL", "COMPACT", "DARK"]>>;
            id: z.ZodString;
            analyticsKey: z.ZodString;
            label: z.ZodString;
            enabled: z.ZodDefault<z.ZodBoolean>;
            visibility: z.ZodEffects<z.ZodObject<{
                devices: z.ZodDefault<z.ZodArray<z.ZodEnum<["DESKTOP", "TABLET", "MOBILE"]>, "many">>;
                locales: z.ZodDefault<z.ZodArray<z.ZodEnum<["en", "ar"]>, "many">>;
                startsAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
                endsAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
            }, "strip", z.ZodTypeAny, {
                startsAt: string | null;
                endsAt: string | null;
                devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
                locales: ("en" | "ar")[];
            }, {
                startsAt?: string | null | undefined;
                endsAt?: string | null | undefined;
                devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
                locales?: ("en" | "ar")[] | undefined;
            }>, {
                startsAt: string | null;
                endsAt: string | null;
                devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
                locales: ("en" | "ar")[];
            }, {
                startsAt?: string | null | undefined;
                endsAt?: string | null | undefined;
                devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
                locales?: ("en" | "ar")[] | undefined;
            }>;
            surface: z.ZodDefault<z.ZodEnum<["DEFAULT", "SOFT", "DARK", "ACCENT"]>>;
            spacing: z.ZodDefault<z.ZodEnum<["NONE", "SMALL", "MEDIUM", "LARGE"]>>;
            width: z.ZodDefault<z.ZodEnum<["CONTENT", "WIDE", "FULL"]>>;
        }, "strict", z.ZodTypeAny, {
            type: "ROUTINE_CTA";
            id: string;
            description: {
                en: string;
                ar: string;
            };
            label: string;
            width: "CONTENT" | "WIDE" | "FULL";
            enabled: boolean;
            heading: {
                en: string;
                ar: string;
            };
            eyebrow: {
                en: string;
                ar: string;
            };
            ctaLabel: {
                en: string;
                ar: string;
            };
            destination: {
                type: "HOME";
            } | {
                type: "SHOP";
            } | {
                type: "OFFERS";
            } | {
                type: "NEW_ARRIVALS";
            } | {
                type: "ABOUT";
            } | {
                type: "CONTACT";
            } | {
                type: "CATEGORY";
                id: string;
            } | {
                type: "BRAND";
                id: string;
            } | {
                type: "PRODUCT";
                id: string;
            } | {
                type: "TAG";
                id: string;
            } | {
                path: string;
                type: "CUSTOM_PATH";
            } | {
                type: "EXTERNAL";
                url: string;
                newTab: boolean;
            } | {
                type: "PAGE";
                id: string;
            };
            mediaAssetId: string | null;
            imageAlt: {
                en: string;
                ar: string;
            };
            style: "COMPACT" | "DARK" | "EDITORIAL";
            visibility: {
                startsAt: string | null;
                endsAt: string | null;
                devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
                locales: ("en" | "ar")[];
            };
            analyticsKey: string;
            surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
            spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
        }, {
            type: "ROUTINE_CTA";
            id: string;
            description: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            label: string;
            heading: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            eyebrow: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            ctaLabel: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            imageAlt: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            visibility: {
                startsAt?: string | null | undefined;
                endsAt?: string | null | undefined;
                devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
                locales?: ("en" | "ar")[] | undefined;
            };
            analyticsKey: string;
            width?: "CONTENT" | "WIDE" | "FULL" | undefined;
            enabled?: boolean | undefined;
            destination?: {
                type: "HOME";
            } | {
                type: "SHOP";
            } | {
                type: "OFFERS";
            } | {
                type: "NEW_ARRIVALS";
            } | {
                type: "ABOUT";
            } | {
                type: "CONTACT";
            } | {
                type: "CATEGORY";
                id: string;
            } | {
                type: "BRAND";
                id: string;
            } | {
                type: "PRODUCT";
                id: string;
            } | {
                type: "TAG";
                id: string;
            } | {
                path: string;
                type: "CUSTOM_PATH";
            } | {
                type: "EXTERNAL";
                url: string;
                newTab?: boolean | undefined;
            } | {
                type: "PAGE";
                id: string;
            } | undefined;
            mediaAssetId?: string | null | undefined;
            style?: "COMPACT" | "DARK" | "EDITORIAL" | undefined;
            surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
            spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"IMAGE_TEXT">;
            mediaAssetId: z.ZodDefault<z.ZodNullable<z.ZodString>>;
            imageAlt: z.ZodObject<{
                en: z.ZodDefault<z.ZodString>;
                ar: z.ZodDefault<z.ZodString>;
            }, "strict", z.ZodTypeAny, {
                en: string;
                ar: string;
            }, {
                en?: string | undefined;
                ar?: string | undefined;
            }>;
            eyebrow: z.ZodObject<{} & {
                en: z.ZodDefault<z.ZodString>;
                ar: z.ZodDefault<z.ZodString>;
            }, "strict", z.ZodTypeAny, {
                en: string;
                ar: string;
            }, {
                en?: string | undefined;
                ar?: string | undefined;
            }>;
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
            body: z.ZodObject<{} & {
                en: z.ZodDefault<z.ZodString>;
                ar: z.ZodDefault<z.ZodString>;
            }, "strict", z.ZodTypeAny, {
                en: string;
                ar: string;
            }, {
                en?: string | undefined;
                ar?: string | undefined;
            }>;
            ctaLabel: z.ZodObject<{} & {
                en: z.ZodDefault<z.ZodString>;
                ar: z.ZodDefault<z.ZodString>;
            }, "strict", z.ZodTypeAny, {
                en: string;
                ar: string;
            }, {
                en?: string | undefined;
                ar?: string | undefined;
            }>;
            destination: z.ZodDefault<z.ZodNullable<z.ZodUnion<[z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
                type: z.ZodLiteral<"HOME">;
            }, "strip", z.ZodTypeAny, {
                type: "HOME";
            }, {
                type: "HOME";
            }>, z.ZodObject<{
                type: z.ZodLiteral<"SHOP">;
            }, "strip", z.ZodTypeAny, {
                type: "SHOP";
            }, {
                type: "SHOP";
            }>, z.ZodObject<{
                type: z.ZodLiteral<"OFFERS">;
            }, "strip", z.ZodTypeAny, {
                type: "OFFERS";
            }, {
                type: "OFFERS";
            }>, z.ZodObject<{
                type: z.ZodLiteral<"NEW_ARRIVALS">;
            }, "strip", z.ZodTypeAny, {
                type: "NEW_ARRIVALS";
            }, {
                type: "NEW_ARRIVALS";
            }>, z.ZodObject<{
                type: z.ZodLiteral<"ABOUT">;
            }, "strip", z.ZodTypeAny, {
                type: "ABOUT";
            }, {
                type: "ABOUT";
            }>, z.ZodObject<{
                type: z.ZodLiteral<"CONTACT">;
            }, "strip", z.ZodTypeAny, {
                type: "CONTACT";
            }, {
                type: "CONTACT";
            }>, z.ZodObject<{
                type: z.ZodLiteral<"CATEGORY">;
                id: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                type: "CATEGORY";
                id: string;
            }, {
                type: "CATEGORY";
                id: string;
            }>, z.ZodObject<{
                type: z.ZodLiteral<"BRAND">;
                id: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                type: "BRAND";
                id: string;
            }, {
                type: "BRAND";
                id: string;
            }>, z.ZodObject<{
                type: z.ZodLiteral<"PRODUCT">;
                id: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                type: "PRODUCT";
                id: string;
            }, {
                type: "PRODUCT";
                id: string;
            }>, z.ZodObject<{
                type: z.ZodLiteral<"TAG">;
                id: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                type: "TAG";
                id: string;
            }, {
                type: "TAG";
                id: string;
            }>, z.ZodObject<{
                type: z.ZodLiteral<"CUSTOM_PATH">;
                path: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                path: string;
                type: "CUSTOM_PATH";
            }, {
                path: string;
                type: "CUSTOM_PATH";
            }>, z.ZodObject<{
                type: z.ZodLiteral<"EXTERNAL">;
                url: z.ZodEffects<z.ZodString, string, string>;
                newTab: z.ZodDefault<z.ZodBoolean>;
            }, "strip", z.ZodTypeAny, {
                type: "EXTERNAL";
                url: string;
                newTab: boolean;
            }, {
                type: "EXTERNAL";
                url: string;
                newTab?: boolean | undefined;
            }>]>, z.ZodObject<{
                type: z.ZodLiteral<"PAGE">;
                id: z.ZodString;
            }, "strict", z.ZodTypeAny, {
                type: "PAGE";
                id: string;
            }, {
                type: "PAGE";
                id: string;
            }>]>>>;
            imageSide: z.ZodDefault<z.ZodEnum<["START", "END"]>>;
            style: z.ZodDefault<z.ZodEnum<["EDITORIAL", "CONTAINED", "FULL_BLEED"]>>;
            id: z.ZodString;
            analyticsKey: z.ZodString;
            label: z.ZodString;
            enabled: z.ZodDefault<z.ZodBoolean>;
            visibility: z.ZodEffects<z.ZodObject<{
                devices: z.ZodDefault<z.ZodArray<z.ZodEnum<["DESKTOP", "TABLET", "MOBILE"]>, "many">>;
                locales: z.ZodDefault<z.ZodArray<z.ZodEnum<["en", "ar"]>, "many">>;
                startsAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
                endsAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
            }, "strip", z.ZodTypeAny, {
                startsAt: string | null;
                endsAt: string | null;
                devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
                locales: ("en" | "ar")[];
            }, {
                startsAt?: string | null | undefined;
                endsAt?: string | null | undefined;
                devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
                locales?: ("en" | "ar")[] | undefined;
            }>, {
                startsAt: string | null;
                endsAt: string | null;
                devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
                locales: ("en" | "ar")[];
            }, {
                startsAt?: string | null | undefined;
                endsAt?: string | null | undefined;
                devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
                locales?: ("en" | "ar")[] | undefined;
            }>;
            surface: z.ZodDefault<z.ZodEnum<["DEFAULT", "SOFT", "DARK", "ACCENT"]>>;
            spacing: z.ZodDefault<z.ZodEnum<["NONE", "SMALL", "MEDIUM", "LARGE"]>>;
            width: z.ZodDefault<z.ZodEnum<["CONTENT", "WIDE", "FULL"]>>;
        }, "strict", z.ZodTypeAny, {
            type: "IMAGE_TEXT";
            id: string;
            label: string;
            width: "CONTENT" | "WIDE" | "FULL";
            enabled: boolean;
            heading: {
                en: string;
                ar: string;
            };
            eyebrow: {
                en: string;
                ar: string;
            };
            ctaLabel: {
                en: string;
                ar: string;
            };
            destination: {
                type: "HOME";
            } | {
                type: "SHOP";
            } | {
                type: "OFFERS";
            } | {
                type: "NEW_ARRIVALS";
            } | {
                type: "ABOUT";
            } | {
                type: "CONTACT";
            } | {
                type: "CATEGORY";
                id: string;
            } | {
                type: "BRAND";
                id: string;
            } | {
                type: "PRODUCT";
                id: string;
            } | {
                type: "TAG";
                id: string;
            } | {
                path: string;
                type: "CUSTOM_PATH";
            } | {
                type: "EXTERNAL";
                url: string;
                newTab: boolean;
            } | {
                type: "PAGE";
                id: string;
            } | null;
            mediaAssetId: string | null;
            imageAlt: {
                en: string;
                ar: string;
            };
            style: "EDITORIAL" | "CONTAINED" | "FULL_BLEED";
            visibility: {
                startsAt: string | null;
                endsAt: string | null;
                devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
                locales: ("en" | "ar")[];
            };
            analyticsKey: string;
            surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
            spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
            body: {
                en: string;
                ar: string;
            };
            imageSide: "START" | "END";
        }, {
            type: "IMAGE_TEXT";
            id: string;
            label: string;
            heading: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            eyebrow: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            ctaLabel: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            imageAlt: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            visibility: {
                startsAt?: string | null | undefined;
                endsAt?: string | null | undefined;
                devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
                locales?: ("en" | "ar")[] | undefined;
            };
            analyticsKey: string;
            body: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            width?: "CONTENT" | "WIDE" | "FULL" | undefined;
            enabled?: boolean | undefined;
            destination?: {
                type: "HOME";
            } | {
                type: "SHOP";
            } | {
                type: "OFFERS";
            } | {
                type: "NEW_ARRIVALS";
            } | {
                type: "ABOUT";
            } | {
                type: "CONTACT";
            } | {
                type: "CATEGORY";
                id: string;
            } | {
                type: "BRAND";
                id: string;
            } | {
                type: "PRODUCT";
                id: string;
            } | {
                type: "TAG";
                id: string;
            } | {
                path: string;
                type: "CUSTOM_PATH";
            } | {
                type: "EXTERNAL";
                url: string;
                newTab?: boolean | undefined;
            } | {
                type: "PAGE";
                id: string;
            } | null | undefined;
            mediaAssetId?: string | null | undefined;
            style?: "EDITORIAL" | "CONTAINED" | "FULL_BLEED" | undefined;
            surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
            spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
            imageSide?: "START" | "END" | undefined;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"PROMO_BANNER">;
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
            description: z.ZodObject<{} & {
                en: z.ZodDefault<z.ZodString>;
                ar: z.ZodDefault<z.ZodString>;
            }, "strict", z.ZodTypeAny, {
                en: string;
                ar: string;
            }, {
                en?: string | undefined;
                ar?: string | undefined;
            }>;
            mediaAssetId: z.ZodDefault<z.ZodNullable<z.ZodString>>;
            imageAlt: z.ZodObject<{
                en: z.ZodDefault<z.ZodString>;
                ar: z.ZodDefault<z.ZodString>;
            }, "strict", z.ZodTypeAny, {
                en: string;
                ar: string;
            }, {
                en?: string | undefined;
                ar?: string | undefined;
            }>;
            ctaLabel: z.ZodObject<{} & {
                en: z.ZodDefault<z.ZodString>;
                ar: z.ZodDefault<z.ZodString>;
            }, "strict", z.ZodTypeAny, {
                en: string;
                ar: string;
            }, {
                en?: string | undefined;
                ar?: string | undefined;
            }>;
            destination: z.ZodDefault<z.ZodNullable<z.ZodUnion<[z.ZodDiscriminatedUnion<"type", [z.ZodObject<{
                type: z.ZodLiteral<"HOME">;
            }, "strip", z.ZodTypeAny, {
                type: "HOME";
            }, {
                type: "HOME";
            }>, z.ZodObject<{
                type: z.ZodLiteral<"SHOP">;
            }, "strip", z.ZodTypeAny, {
                type: "SHOP";
            }, {
                type: "SHOP";
            }>, z.ZodObject<{
                type: z.ZodLiteral<"OFFERS">;
            }, "strip", z.ZodTypeAny, {
                type: "OFFERS";
            }, {
                type: "OFFERS";
            }>, z.ZodObject<{
                type: z.ZodLiteral<"NEW_ARRIVALS">;
            }, "strip", z.ZodTypeAny, {
                type: "NEW_ARRIVALS";
            }, {
                type: "NEW_ARRIVALS";
            }>, z.ZodObject<{
                type: z.ZodLiteral<"ABOUT">;
            }, "strip", z.ZodTypeAny, {
                type: "ABOUT";
            }, {
                type: "ABOUT";
            }>, z.ZodObject<{
                type: z.ZodLiteral<"CONTACT">;
            }, "strip", z.ZodTypeAny, {
                type: "CONTACT";
            }, {
                type: "CONTACT";
            }>, z.ZodObject<{
                type: z.ZodLiteral<"CATEGORY">;
                id: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                type: "CATEGORY";
                id: string;
            }, {
                type: "CATEGORY";
                id: string;
            }>, z.ZodObject<{
                type: z.ZodLiteral<"BRAND">;
                id: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                type: "BRAND";
                id: string;
            }, {
                type: "BRAND";
                id: string;
            }>, z.ZodObject<{
                type: z.ZodLiteral<"PRODUCT">;
                id: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                type: "PRODUCT";
                id: string;
            }, {
                type: "PRODUCT";
                id: string;
            }>, z.ZodObject<{
                type: z.ZodLiteral<"TAG">;
                id: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                type: "TAG";
                id: string;
            }, {
                type: "TAG";
                id: string;
            }>, z.ZodObject<{
                type: z.ZodLiteral<"CUSTOM_PATH">;
                path: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                path: string;
                type: "CUSTOM_PATH";
            }, {
                path: string;
                type: "CUSTOM_PATH";
            }>, z.ZodObject<{
                type: z.ZodLiteral<"EXTERNAL">;
                url: z.ZodEffects<z.ZodString, string, string>;
                newTab: z.ZodDefault<z.ZodBoolean>;
            }, "strip", z.ZodTypeAny, {
                type: "EXTERNAL";
                url: string;
                newTab: boolean;
            }, {
                type: "EXTERNAL";
                url: string;
                newTab?: boolean | undefined;
            }>]>, z.ZodObject<{
                type: z.ZodLiteral<"PAGE">;
                id: z.ZodString;
            }, "strict", z.ZodTypeAny, {
                type: "PAGE";
                id: string;
            }, {
                type: "PAGE";
                id: string;
            }>]>>>;
            style: z.ZodDefault<z.ZodEnum<["SOFT", "DARK", "ACCENT", "IMAGE"]>>;
            id: z.ZodString;
            analyticsKey: z.ZodString;
            label: z.ZodString;
            enabled: z.ZodDefault<z.ZodBoolean>;
            visibility: z.ZodEffects<z.ZodObject<{
                devices: z.ZodDefault<z.ZodArray<z.ZodEnum<["DESKTOP", "TABLET", "MOBILE"]>, "many">>;
                locales: z.ZodDefault<z.ZodArray<z.ZodEnum<["en", "ar"]>, "many">>;
                startsAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
                endsAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
            }, "strip", z.ZodTypeAny, {
                startsAt: string | null;
                endsAt: string | null;
                devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
                locales: ("en" | "ar")[];
            }, {
                startsAt?: string | null | undefined;
                endsAt?: string | null | undefined;
                devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
                locales?: ("en" | "ar")[] | undefined;
            }>, {
                startsAt: string | null;
                endsAt: string | null;
                devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
                locales: ("en" | "ar")[];
            }, {
                startsAt?: string | null | undefined;
                endsAt?: string | null | undefined;
                devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
                locales?: ("en" | "ar")[] | undefined;
            }>;
            surface: z.ZodDefault<z.ZodEnum<["DEFAULT", "SOFT", "DARK", "ACCENT"]>>;
            spacing: z.ZodDefault<z.ZodEnum<["NONE", "SMALL", "MEDIUM", "LARGE"]>>;
            width: z.ZodDefault<z.ZodEnum<["CONTENT", "WIDE", "FULL"]>>;
        }, "strict", z.ZodTypeAny, {
            type: "PROMO_BANNER";
            id: string;
            description: {
                en: string;
                ar: string;
            };
            label: string;
            width: "CONTENT" | "WIDE" | "FULL";
            enabled: boolean;
            heading: {
                en: string;
                ar: string;
            };
            ctaLabel: {
                en: string;
                ar: string;
            };
            destination: {
                type: "HOME";
            } | {
                type: "SHOP";
            } | {
                type: "OFFERS";
            } | {
                type: "NEW_ARRIVALS";
            } | {
                type: "ABOUT";
            } | {
                type: "CONTACT";
            } | {
                type: "CATEGORY";
                id: string;
            } | {
                type: "BRAND";
                id: string;
            } | {
                type: "PRODUCT";
                id: string;
            } | {
                type: "TAG";
                id: string;
            } | {
                path: string;
                type: "CUSTOM_PATH";
            } | {
                type: "EXTERNAL";
                url: string;
                newTab: boolean;
            } | {
                type: "PAGE";
                id: string;
            } | null;
            mediaAssetId: string | null;
            imageAlt: {
                en: string;
                ar: string;
            };
            style: "IMAGE" | "SOFT" | "DARK" | "ACCENT";
            visibility: {
                startsAt: string | null;
                endsAt: string | null;
                devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
                locales: ("en" | "ar")[];
            };
            analyticsKey: string;
            surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
            spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
        }, {
            type: "PROMO_BANNER";
            id: string;
            description: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            label: string;
            heading: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            ctaLabel: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            imageAlt: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            visibility: {
                startsAt?: string | null | undefined;
                endsAt?: string | null | undefined;
                devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
                locales?: ("en" | "ar")[] | undefined;
            };
            analyticsKey: string;
            width?: "CONTENT" | "WIDE" | "FULL" | undefined;
            enabled?: boolean | undefined;
            destination?: {
                type: "HOME";
            } | {
                type: "SHOP";
            } | {
                type: "OFFERS";
            } | {
                type: "NEW_ARRIVALS";
            } | {
                type: "ABOUT";
            } | {
                type: "CONTACT";
            } | {
                type: "CATEGORY";
                id: string;
            } | {
                type: "BRAND";
                id: string;
            } | {
                type: "PRODUCT";
                id: string;
            } | {
                type: "TAG";
                id: string;
            } | {
                path: string;
                type: "CUSTOM_PATH";
            } | {
                type: "EXTERNAL";
                url: string;
                newTab?: boolean | undefined;
            } | {
                type: "PAGE";
                id: string;
            } | null | undefined;
            mediaAssetId?: string | null | undefined;
            style?: "IMAGE" | "SOFT" | "DARK" | "ACCENT" | undefined;
            surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
            spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"COUNTDOWN">;
            eyebrow: z.ZodObject<{} & {
                en: z.ZodDefault<z.ZodString>;
                ar: z.ZodDefault<z.ZodString>;
            }, "strict", z.ZodTypeAny, {
                en: string;
                ar: string;
            }, {
                en?: string | undefined;
                ar?: string | undefined;
            }>;
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
            description: z.ZodObject<{} & {
                en: z.ZodDefault<z.ZodString>;
                ar: z.ZodDefault<z.ZodString>;
            }, "strict", z.ZodTypeAny, {
                en: string;
                ar: string;
            }, {
                en?: string | undefined;
                ar?: string | undefined;
            }>;
            endsAt: z.ZodString;
            expiredBehavior: z.ZodDefault<z.ZodEnum<["HIDE", "SHOW_EXPIRED"]>>;
            expiredMessage: z.ZodObject<{} & {
                en: z.ZodDefault<z.ZodString>;
                ar: z.ZodDefault<z.ZodString>;
            }, "strict", z.ZodTypeAny, {
                en: string;
                ar: string;
            }, {
                en?: string | undefined;
                ar?: string | undefined;
            }>;
            id: z.ZodString;
            analyticsKey: z.ZodString;
            label: z.ZodString;
            enabled: z.ZodDefault<z.ZodBoolean>;
            visibility: z.ZodEffects<z.ZodObject<{
                devices: z.ZodDefault<z.ZodArray<z.ZodEnum<["DESKTOP", "TABLET", "MOBILE"]>, "many">>;
                locales: z.ZodDefault<z.ZodArray<z.ZodEnum<["en", "ar"]>, "many">>;
                startsAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
                endsAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
            }, "strip", z.ZodTypeAny, {
                startsAt: string | null;
                endsAt: string | null;
                devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
                locales: ("en" | "ar")[];
            }, {
                startsAt?: string | null | undefined;
                endsAt?: string | null | undefined;
                devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
                locales?: ("en" | "ar")[] | undefined;
            }>, {
                startsAt: string | null;
                endsAt: string | null;
                devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
                locales: ("en" | "ar")[];
            }, {
                startsAt?: string | null | undefined;
                endsAt?: string | null | undefined;
                devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
                locales?: ("en" | "ar")[] | undefined;
            }>;
            surface: z.ZodDefault<z.ZodEnum<["DEFAULT", "SOFT", "DARK", "ACCENT"]>>;
            spacing: z.ZodDefault<z.ZodEnum<["NONE", "SMALL", "MEDIUM", "LARGE"]>>;
            width: z.ZodDefault<z.ZodEnum<["CONTENT", "WIDE", "FULL"]>>;
        }, "strict", z.ZodTypeAny, {
            type: "COUNTDOWN";
            id: string;
            description: {
                en: string;
                ar: string;
            };
            label: string;
            width: "CONTENT" | "WIDE" | "FULL";
            enabled: boolean;
            endsAt: string;
            heading: {
                en: string;
                ar: string;
            };
            eyebrow: {
                en: string;
                ar: string;
            };
            visibility: {
                startsAt: string | null;
                endsAt: string | null;
                devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
                locales: ("en" | "ar")[];
            };
            analyticsKey: string;
            surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
            spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
            expiredBehavior: "HIDE" | "SHOW_EXPIRED";
            expiredMessage: {
                en: string;
                ar: string;
            };
        }, {
            type: "COUNTDOWN";
            id: string;
            description: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            label: string;
            endsAt: string;
            heading: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            eyebrow: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            visibility: {
                startsAt?: string | null | undefined;
                endsAt?: string | null | undefined;
                devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
                locales?: ("en" | "ar")[] | undefined;
            };
            analyticsKey: string;
            expiredMessage: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            width?: "CONTENT" | "WIDE" | "FULL" | undefined;
            enabled?: boolean | undefined;
            surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
            spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
            expiredBehavior?: "HIDE" | "SHOW_EXPIRED" | undefined;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"NEWSLETTER">;
            eyebrow: z.ZodObject<{} & {
                en: z.ZodDefault<z.ZodString>;
                ar: z.ZodDefault<z.ZodString>;
            }, "strict", z.ZodTypeAny, {
                en: string;
                ar: string;
            }, {
                en?: string | undefined;
                ar?: string | undefined;
            }>;
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
            description: z.ZodObject<{} & {
                en: z.ZodDefault<z.ZodString>;
                ar: z.ZodDefault<z.ZodString>;
            }, "strict", z.ZodTypeAny, {
                en: string;
                ar: string;
            }, {
                en?: string | undefined;
                ar?: string | undefined;
            }>;
            style: z.ZodDefault<z.ZodEnum<["COMPACT", "EDITORIAL", "DARK"]>>;
            id: z.ZodString;
            analyticsKey: z.ZodString;
            label: z.ZodString;
            enabled: z.ZodDefault<z.ZodBoolean>;
            visibility: z.ZodEffects<z.ZodObject<{
                devices: z.ZodDefault<z.ZodArray<z.ZodEnum<["DESKTOP", "TABLET", "MOBILE"]>, "many">>;
                locales: z.ZodDefault<z.ZodArray<z.ZodEnum<["en", "ar"]>, "many">>;
                startsAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
                endsAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
            }, "strip", z.ZodTypeAny, {
                startsAt: string | null;
                endsAt: string | null;
                devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
                locales: ("en" | "ar")[];
            }, {
                startsAt?: string | null | undefined;
                endsAt?: string | null | undefined;
                devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
                locales?: ("en" | "ar")[] | undefined;
            }>, {
                startsAt: string | null;
                endsAt: string | null;
                devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
                locales: ("en" | "ar")[];
            }, {
                startsAt?: string | null | undefined;
                endsAt?: string | null | undefined;
                devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
                locales?: ("en" | "ar")[] | undefined;
            }>;
            surface: z.ZodDefault<z.ZodEnum<["DEFAULT", "SOFT", "DARK", "ACCENT"]>>;
            spacing: z.ZodDefault<z.ZodEnum<["NONE", "SMALL", "MEDIUM", "LARGE"]>>;
            width: z.ZodDefault<z.ZodEnum<["CONTENT", "WIDE", "FULL"]>>;
        }, "strict", z.ZodTypeAny, {
            type: "NEWSLETTER";
            id: string;
            description: {
                en: string;
                ar: string;
            };
            label: string;
            width: "CONTENT" | "WIDE" | "FULL";
            enabled: boolean;
            heading: {
                en: string;
                ar: string;
            };
            eyebrow: {
                en: string;
                ar: string;
            };
            style: "COMPACT" | "DARK" | "EDITORIAL";
            visibility: {
                startsAt: string | null;
                endsAt: string | null;
                devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
                locales: ("en" | "ar")[];
            };
            analyticsKey: string;
            surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
            spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
        }, {
            type: "NEWSLETTER";
            id: string;
            description: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            label: string;
            heading: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            eyebrow: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            visibility: {
                startsAt?: string | null | undefined;
                endsAt?: string | null | undefined;
                devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
                locales?: ("en" | "ar")[] | undefined;
            };
            analyticsKey: string;
            width?: "CONTENT" | "WIDE" | "FULL" | undefined;
            enabled?: boolean | undefined;
            style?: "COMPACT" | "DARK" | "EDITORIAL" | undefined;
            surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
            spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"FAQ">;
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
            description: z.ZodObject<{} & {
                en: z.ZodDefault<z.ZodString>;
                ar: z.ZodDefault<z.ZodString>;
            }, "strict", z.ZodTypeAny, {
                en: string;
                ar: string;
            }, {
                en?: string | undefined;
                ar?: string | undefined;
            }>;
            items: z.ZodDefault<z.ZodArray<z.ZodObject<{
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
                answer: z.ZodObject<{} & {
                    en: z.ZodDefault<z.ZodString>;
                    ar: z.ZodDefault<z.ZodString>;
                }, "strict", z.ZodTypeAny, {
                    en: string;
                    ar: string;
                }, {
                    en?: string | undefined;
                    ar?: string | undefined;
                }>;
            }, "strict", z.ZodTypeAny, {
                id: string;
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
                question: {
                    en?: string | undefined;
                    ar?: string | undefined;
                };
                answer: {
                    en?: string | undefined;
                    ar?: string | undefined;
                };
            }>, "many">>;
            id: z.ZodString;
            analyticsKey: z.ZodString;
            label: z.ZodString;
            enabled: z.ZodDefault<z.ZodBoolean>;
            visibility: z.ZodEffects<z.ZodObject<{
                devices: z.ZodDefault<z.ZodArray<z.ZodEnum<["DESKTOP", "TABLET", "MOBILE"]>, "many">>;
                locales: z.ZodDefault<z.ZodArray<z.ZodEnum<["en", "ar"]>, "many">>;
                startsAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
                endsAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
            }, "strip", z.ZodTypeAny, {
                startsAt: string | null;
                endsAt: string | null;
                devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
                locales: ("en" | "ar")[];
            }, {
                startsAt?: string | null | undefined;
                endsAt?: string | null | undefined;
                devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
                locales?: ("en" | "ar")[] | undefined;
            }>, {
                startsAt: string | null;
                endsAt: string | null;
                devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
                locales: ("en" | "ar")[];
            }, {
                startsAt?: string | null | undefined;
                endsAt?: string | null | undefined;
                devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
                locales?: ("en" | "ar")[] | undefined;
            }>;
            surface: z.ZodDefault<z.ZodEnum<["DEFAULT", "SOFT", "DARK", "ACCENT"]>>;
            spacing: z.ZodDefault<z.ZodEnum<["NONE", "SMALL", "MEDIUM", "LARGE"]>>;
            width: z.ZodDefault<z.ZodEnum<["CONTENT", "WIDE", "FULL"]>>;
        }, "strict", z.ZodTypeAny, {
            type: "FAQ";
            id: string;
            description: {
                en: string;
                ar: string;
            };
            label: string;
            width: "CONTENT" | "WIDE" | "FULL";
            items: {
                id: string;
                question: {
                    en: string;
                    ar: string;
                };
                answer: {
                    en: string;
                    ar: string;
                };
            }[];
            enabled: boolean;
            heading: {
                en: string;
                ar: string;
            };
            visibility: {
                startsAt: string | null;
                endsAt: string | null;
                devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
                locales: ("en" | "ar")[];
            };
            analyticsKey: string;
            surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
            spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
        }, {
            type: "FAQ";
            id: string;
            description: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            label: string;
            heading: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            visibility: {
                startsAt?: string | null | undefined;
                endsAt?: string | null | undefined;
                devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
                locales?: ("en" | "ar")[] | undefined;
            };
            analyticsKey: string;
            width?: "CONTENT" | "WIDE" | "FULL" | undefined;
            items?: {
                id: string;
                question: {
                    en?: string | undefined;
                    ar?: string | undefined;
                };
                answer: {
                    en?: string | undefined;
                    ar?: string | undefined;
                };
            }[] | undefined;
            enabled?: boolean | undefined;
            surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
            spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"SPACER">;
            size: z.ZodDefault<z.ZodEnum<["SMALL", "MEDIUM", "LARGE"]>>;
            id: z.ZodString;
            analyticsKey: z.ZodString;
            label: z.ZodString;
            enabled: z.ZodDefault<z.ZodBoolean>;
            visibility: z.ZodEffects<z.ZodObject<{
                devices: z.ZodDefault<z.ZodArray<z.ZodEnum<["DESKTOP", "TABLET", "MOBILE"]>, "many">>;
                locales: z.ZodDefault<z.ZodArray<z.ZodEnum<["en", "ar"]>, "many">>;
                startsAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
                endsAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
            }, "strip", z.ZodTypeAny, {
                startsAt: string | null;
                endsAt: string | null;
                devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
                locales: ("en" | "ar")[];
            }, {
                startsAt?: string | null | undefined;
                endsAt?: string | null | undefined;
                devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
                locales?: ("en" | "ar")[] | undefined;
            }>, {
                startsAt: string | null;
                endsAt: string | null;
                devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
                locales: ("en" | "ar")[];
            }, {
                startsAt?: string | null | undefined;
                endsAt?: string | null | undefined;
                devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
                locales?: ("en" | "ar")[] | undefined;
            }>;
            surface: z.ZodDefault<z.ZodEnum<["DEFAULT", "SOFT", "DARK", "ACCENT"]>>;
            spacing: z.ZodDefault<z.ZodEnum<["NONE", "SMALL", "MEDIUM", "LARGE"]>>;
            width: z.ZodDefault<z.ZodEnum<["CONTENT", "WIDE", "FULL"]>>;
        }, "strict", z.ZodTypeAny, {
            type: "SPACER";
            id: string;
            label: string;
            width: "CONTENT" | "WIDE" | "FULL";
            enabled: boolean;
            visibility: {
                startsAt: string | null;
                endsAt: string | null;
                devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
                locales: ("en" | "ar")[];
            };
            size: "SMALL" | "MEDIUM" | "LARGE";
            analyticsKey: string;
            surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
            spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
        }, {
            type: "SPACER";
            id: string;
            label: string;
            visibility: {
                startsAt?: string | null | undefined;
                endsAt?: string | null | undefined;
                devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
                locales?: ("en" | "ar")[] | undefined;
            };
            analyticsKey: string;
            width?: "CONTENT" | "WIDE" | "FULL" | undefined;
            enabled?: boolean | undefined;
            size?: "SMALL" | "MEDIUM" | "LARGE" | undefined;
            surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
            spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
        }>, z.ZodObject<{
            type: z.ZodLiteral<"DIVIDER">;
            id: z.ZodString;
            analyticsKey: z.ZodString;
            label: z.ZodString;
            enabled: z.ZodDefault<z.ZodBoolean>;
            visibility: z.ZodEffects<z.ZodObject<{
                devices: z.ZodDefault<z.ZodArray<z.ZodEnum<["DESKTOP", "TABLET", "MOBILE"]>, "many">>;
                locales: z.ZodDefault<z.ZodArray<z.ZodEnum<["en", "ar"]>, "many">>;
                startsAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
                endsAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
            }, "strip", z.ZodTypeAny, {
                startsAt: string | null;
                endsAt: string | null;
                devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
                locales: ("en" | "ar")[];
            }, {
                startsAt?: string | null | undefined;
                endsAt?: string | null | undefined;
                devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
                locales?: ("en" | "ar")[] | undefined;
            }>, {
                startsAt: string | null;
                endsAt: string | null;
                devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
                locales: ("en" | "ar")[];
            }, {
                startsAt?: string | null | undefined;
                endsAt?: string | null | undefined;
                devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
                locales?: ("en" | "ar")[] | undefined;
            }>;
            surface: z.ZodDefault<z.ZodEnum<["DEFAULT", "SOFT", "DARK", "ACCENT"]>>;
            spacing: z.ZodDefault<z.ZodEnum<["NONE", "SMALL", "MEDIUM", "LARGE"]>>;
            width: z.ZodDefault<z.ZodEnum<["CONTENT", "WIDE", "FULL"]>>;
        }, "strict", z.ZodTypeAny, {
            type: "DIVIDER";
            id: string;
            label: string;
            width: "CONTENT" | "WIDE" | "FULL";
            enabled: boolean;
            visibility: {
                startsAt: string | null;
                endsAt: string | null;
                devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
                locales: ("en" | "ar")[];
            };
            analyticsKey: string;
            surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
            spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
        }, {
            type: "DIVIDER";
            id: string;
            label: string;
            visibility: {
                startsAt?: string | null | undefined;
                endsAt?: string | null | undefined;
                devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
                locales?: ("en" | "ar")[] | undefined;
            };
            analyticsKey: string;
            width?: "CONTENT" | "WIDE" | "FULL" | undefined;
            enabled?: boolean | undefined;
            surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
            spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
        }>]>, "many">;
    }, "strict", z.ZodTypeAny, {
        title: {
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
            canonicalPath: string | null;
            openGraphMediaId: string | null;
            indexable: boolean;
        };
        sections: ({
            type: "HERO";
            id: string;
            description: {
                en: string;
                ar: string;
            };
            label: string;
            width: "CONTENT" | "WIDE" | "FULL";
            enabled: boolean;
            heading: {
                en: string;
                ar: string;
            };
            eyebrow: {
                en: string;
                ar: string;
            };
            imageAlt: {
                en: string;
                ar: string;
            };
            visibility: {
                startsAt: string | null;
                endsAt: string | null;
                devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
                locales: ("en" | "ar")[];
            };
            alignment: "START" | "CENTER" | "END";
            desktopMediaId: string | null;
            mobileMediaId: string | null;
            primaryCtaLabel: {
                en: string;
                ar: string;
            };
            primaryDestination: {
                type: "HOME";
            } | {
                type: "SHOP";
            } | {
                type: "OFFERS";
            } | {
                type: "NEW_ARRIVALS";
            } | {
                type: "ABOUT";
            } | {
                type: "CONTACT";
            } | {
                type: "CATEGORY";
                id: string;
            } | {
                type: "BRAND";
                id: string;
            } | {
                type: "PRODUCT";
                id: string;
            } | {
                type: "TAG";
                id: string;
            } | {
                path: string;
                type: "CUSTOM_PATH";
            } | {
                type: "EXTERNAL";
                url: string;
                newTab: boolean;
            } | {
                type: "PAGE";
                id: string;
            } | null;
            secondaryCtaLabel: {
                en: string;
                ar: string;
            };
            secondaryDestination: {
                type: "HOME";
            } | {
                type: "SHOP";
            } | {
                type: "OFFERS";
            } | {
                type: "NEW_ARRIVALS";
            } | {
                type: "ABOUT";
            } | {
                type: "CONTACT";
            } | {
                type: "CATEGORY";
                id: string;
            } | {
                type: "BRAND";
                id: string;
            } | {
                type: "PRODUCT";
                id: string;
            } | {
                type: "TAG";
                id: string;
            } | {
                path: string;
                type: "CUSTOM_PATH";
            } | {
                type: "EXTERNAL";
                url: string;
                newTab: boolean;
            } | {
                type: "PAGE";
                id: string;
            } | null;
            layout: "SPLIT" | "FULL" | "CONTAINED";
            contentPosition: "CENTER" | "TOP" | "BOTTOM";
            overlay: "NONE" | "MEDIUM" | "LIGHT" | "STRONG";
            headingLevel: "H1" | "H2";
            analyticsKey: string;
            surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
            spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
        } | {
            type: "PRODUCT_GRID";
            limit: number;
            id: string;
            description: {
                en: string;
                ar: string;
            };
            label: string;
            width: "CONTENT" | "WIDE" | "FULL";
            source: {
                productIds: string[];
                mode: "MANUAL";
            } | {
                mode: "CATEGORY";
                referenceId: string;
            } | {
                mode: "BRAND";
                referenceId: string;
            } | {
                mode: "TAG";
                referenceId: string;
            } | {
                mode: "PROMOTION";
                referenceId: string;
            } | {
                mode: "NEWEST";
            } | {
                mode: "FEATURED";
            };
            enabled: boolean;
            heading: {
                en: string;
                ar: string;
            };
            viewAllLabel: {
                en: string;
                ar: string;
            };
            destination: {
                type: "HOME";
            } | {
                type: "SHOP";
            } | {
                type: "OFFERS";
            } | {
                type: "NEW_ARRIVALS";
            } | {
                type: "ABOUT";
            } | {
                type: "CONTACT";
            } | {
                type: "CATEGORY";
                id: string;
            } | {
                type: "BRAND";
                id: string;
            } | {
                type: "PRODUCT";
                id: string;
            } | {
                type: "TAG";
                id: string;
            } | {
                path: string;
                type: "CUSTOM_PATH";
            } | {
                type: "EXTERNAL";
                url: string;
                newTab: boolean;
            } | {
                type: "PAGE";
                id: string;
            } | null;
            style: "COMPACT" | "CLEAN" | "EDITORIAL";
            visibility: {
                startsAt: string | null;
                endsAt: string | null;
                devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
                locales: ("en" | "ar")[];
            };
            showViewAll: boolean;
            columns: {
                desktop: number;
                tablet: number;
                mobile: number;
            };
            analyticsKey: string;
            surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
            spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
        } | {
            type: "PRODUCT_CAROUSEL";
            limit: number;
            id: string;
            description: {
                en: string;
                ar: string;
            };
            label: string;
            width: "CONTENT" | "WIDE" | "FULL";
            source: {
                productIds: string[];
                mode: "MANUAL";
            } | {
                mode: "CATEGORY";
                referenceId: string;
            } | {
                mode: "BRAND";
                referenceId: string;
            } | {
                mode: "TAG";
                referenceId: string;
            } | {
                mode: "PROMOTION";
                referenceId: string;
            } | {
                mode: "NEWEST";
            } | {
                mode: "FEATURED";
            };
            enabled: boolean;
            heading: {
                en: string;
                ar: string;
            };
            viewAllLabel: {
                en: string;
                ar: string;
            };
            destination: {
                type: "HOME";
            } | {
                type: "SHOP";
            } | {
                type: "OFFERS";
            } | {
                type: "NEW_ARRIVALS";
            } | {
                type: "ABOUT";
            } | {
                type: "CONTACT";
            } | {
                type: "CATEGORY";
                id: string;
            } | {
                type: "BRAND";
                id: string;
            } | {
                type: "PRODUCT";
                id: string;
            } | {
                type: "TAG";
                id: string;
            } | {
                path: string;
                type: "CUSTOM_PATH";
            } | {
                type: "EXTERNAL";
                url: string;
                newTab: boolean;
            } | {
                type: "PAGE";
                id: string;
            } | null;
            style: "COMPACT" | "CLEAN" | "EDITORIAL";
            visibility: {
                startsAt: string | null;
                endsAt: string | null;
                devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
                locales: ("en" | "ar")[];
            };
            showViewAll: boolean;
            columns: {
                desktop: number;
                tablet: number;
                mobile: number;
            };
            analyticsKey: string;
            surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
            spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
            autoplay: boolean;
        } | {
            type: "CATEGORIES";
            limit: number;
            id: string;
            description: {
                en: string;
                ar: string;
            };
            label: string;
            width: "CONTENT" | "WIDE" | "FULL";
            enabled: boolean;
            categoryIds: string[];
            heading: {
                en: string;
                ar: string;
            };
            visibility: {
                startsAt: string | null;
                endsAt: string | null;
                devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
                locales: ("en" | "ar")[];
            };
            layout: "COMPACT" | "CARDS" | "EDITORIAL" | "IMAGE_TILES";
            analyticsKey: string;
            surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
            spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
            showChildren: boolean;
            showGrandchildren: boolean;
        } | {
            type: "BRANDS";
            limit: number;
            id: string;
            description: {
                en: string;
                ar: string;
            };
            label: string;
            width: "CONTENT" | "WIDE" | "FULL";
            enabled: boolean;
            brandIds: string[];
            heading: {
                en: string;
                ar: string;
            };
            visibility: {
                startsAt: string | null;
                endsAt: string | null;
                devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
                locales: ("en" | "ar")[];
            };
            mode: "MANUAL" | "FEATURED";
            layout: "LOGO_GRID" | "EDITORIAL" | "LOGO_RAIL";
            analyticsKey: string;
            surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
            spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
        } | {
            type: "PROMOTION";
            id: string;
            description: {
                en: string;
                ar: string;
            };
            label: string;
            width: "CONTENT" | "WIDE" | "FULL";
            promotionId: string;
            enabled: boolean;
            heading: {
                en: string;
                ar: string;
            };
            eyebrow: {
                en: string;
                ar: string;
            };
            ctaLabel: {
                en: string;
                ar: string;
            };
            destination: {
                type: "HOME";
            } | {
                type: "SHOP";
            } | {
                type: "OFFERS";
            } | {
                type: "NEW_ARRIVALS";
            } | {
                type: "ABOUT";
            } | {
                type: "CONTACT";
            } | {
                type: "CATEGORY";
                id: string;
            } | {
                type: "BRAND";
                id: string;
            } | {
                type: "PRODUCT";
                id: string;
            } | {
                type: "TAG";
                id: string;
            } | {
                path: string;
                type: "CUSTOM_PATH";
            } | {
                type: "EXTERNAL";
                url: string;
                newTab: boolean;
            } | {
                type: "PAGE";
                id: string;
            } | null;
            mediaAssetId: string | null;
            imageAlt: {
                en: string;
                ar: string;
            };
            style: "DARK" | "EDITORIAL" | "BANNER";
            visibility: {
                startsAt: string | null;
                endsAt: string | null;
                devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
                locales: ("en" | "ar")[];
            };
            analyticsKey: string;
            surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
            spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
            expiredBehavior: "HIDE" | "SHOW_EXPIRED";
        } | {
            type: "ROUTINE_CTA";
            id: string;
            description: {
                en: string;
                ar: string;
            };
            label: string;
            width: "CONTENT" | "WIDE" | "FULL";
            enabled: boolean;
            heading: {
                en: string;
                ar: string;
            };
            eyebrow: {
                en: string;
                ar: string;
            };
            ctaLabel: {
                en: string;
                ar: string;
            };
            destination: {
                type: "HOME";
            } | {
                type: "SHOP";
            } | {
                type: "OFFERS";
            } | {
                type: "NEW_ARRIVALS";
            } | {
                type: "ABOUT";
            } | {
                type: "CONTACT";
            } | {
                type: "CATEGORY";
                id: string;
            } | {
                type: "BRAND";
                id: string;
            } | {
                type: "PRODUCT";
                id: string;
            } | {
                type: "TAG";
                id: string;
            } | {
                path: string;
                type: "CUSTOM_PATH";
            } | {
                type: "EXTERNAL";
                url: string;
                newTab: boolean;
            } | {
                type: "PAGE";
                id: string;
            };
            mediaAssetId: string | null;
            imageAlt: {
                en: string;
                ar: string;
            };
            style: "COMPACT" | "DARK" | "EDITORIAL";
            visibility: {
                startsAt: string | null;
                endsAt: string | null;
                devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
                locales: ("en" | "ar")[];
            };
            analyticsKey: string;
            surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
            spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
        } | {
            type: "IMAGE_TEXT";
            id: string;
            label: string;
            width: "CONTENT" | "WIDE" | "FULL";
            enabled: boolean;
            heading: {
                en: string;
                ar: string;
            };
            eyebrow: {
                en: string;
                ar: string;
            };
            ctaLabel: {
                en: string;
                ar: string;
            };
            destination: {
                type: "HOME";
            } | {
                type: "SHOP";
            } | {
                type: "OFFERS";
            } | {
                type: "NEW_ARRIVALS";
            } | {
                type: "ABOUT";
            } | {
                type: "CONTACT";
            } | {
                type: "CATEGORY";
                id: string;
            } | {
                type: "BRAND";
                id: string;
            } | {
                type: "PRODUCT";
                id: string;
            } | {
                type: "TAG";
                id: string;
            } | {
                path: string;
                type: "CUSTOM_PATH";
            } | {
                type: "EXTERNAL";
                url: string;
                newTab: boolean;
            } | {
                type: "PAGE";
                id: string;
            } | null;
            mediaAssetId: string | null;
            imageAlt: {
                en: string;
                ar: string;
            };
            style: "EDITORIAL" | "CONTAINED" | "FULL_BLEED";
            visibility: {
                startsAt: string | null;
                endsAt: string | null;
                devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
                locales: ("en" | "ar")[];
            };
            analyticsKey: string;
            surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
            spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
            body: {
                en: string;
                ar: string;
            };
            imageSide: "START" | "END";
        } | {
            type: "PROMO_BANNER";
            id: string;
            description: {
                en: string;
                ar: string;
            };
            label: string;
            width: "CONTENT" | "WIDE" | "FULL";
            enabled: boolean;
            heading: {
                en: string;
                ar: string;
            };
            ctaLabel: {
                en: string;
                ar: string;
            };
            destination: {
                type: "HOME";
            } | {
                type: "SHOP";
            } | {
                type: "OFFERS";
            } | {
                type: "NEW_ARRIVALS";
            } | {
                type: "ABOUT";
            } | {
                type: "CONTACT";
            } | {
                type: "CATEGORY";
                id: string;
            } | {
                type: "BRAND";
                id: string;
            } | {
                type: "PRODUCT";
                id: string;
            } | {
                type: "TAG";
                id: string;
            } | {
                path: string;
                type: "CUSTOM_PATH";
            } | {
                type: "EXTERNAL";
                url: string;
                newTab: boolean;
            } | {
                type: "PAGE";
                id: string;
            } | null;
            mediaAssetId: string | null;
            imageAlt: {
                en: string;
                ar: string;
            };
            style: "IMAGE" | "SOFT" | "DARK" | "ACCENT";
            visibility: {
                startsAt: string | null;
                endsAt: string | null;
                devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
                locales: ("en" | "ar")[];
            };
            analyticsKey: string;
            surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
            spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
        } | {
            type: "COUNTDOWN";
            id: string;
            description: {
                en: string;
                ar: string;
            };
            label: string;
            width: "CONTENT" | "WIDE" | "FULL";
            enabled: boolean;
            endsAt: string;
            heading: {
                en: string;
                ar: string;
            };
            eyebrow: {
                en: string;
                ar: string;
            };
            visibility: {
                startsAt: string | null;
                endsAt: string | null;
                devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
                locales: ("en" | "ar")[];
            };
            analyticsKey: string;
            surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
            spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
            expiredBehavior: "HIDE" | "SHOW_EXPIRED";
            expiredMessage: {
                en: string;
                ar: string;
            };
        } | {
            type: "NEWSLETTER";
            id: string;
            description: {
                en: string;
                ar: string;
            };
            label: string;
            width: "CONTENT" | "WIDE" | "FULL";
            enabled: boolean;
            heading: {
                en: string;
                ar: string;
            };
            eyebrow: {
                en: string;
                ar: string;
            };
            style: "COMPACT" | "DARK" | "EDITORIAL";
            visibility: {
                startsAt: string | null;
                endsAt: string | null;
                devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
                locales: ("en" | "ar")[];
            };
            analyticsKey: string;
            surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
            spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
        } | {
            type: "FAQ";
            id: string;
            description: {
                en: string;
                ar: string;
            };
            label: string;
            width: "CONTENT" | "WIDE" | "FULL";
            items: {
                id: string;
                question: {
                    en: string;
                    ar: string;
                };
                answer: {
                    en: string;
                    ar: string;
                };
            }[];
            enabled: boolean;
            heading: {
                en: string;
                ar: string;
            };
            visibility: {
                startsAt: string | null;
                endsAt: string | null;
                devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
                locales: ("en" | "ar")[];
            };
            analyticsKey: string;
            surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
            spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
        } | {
            type: "SPACER";
            id: string;
            label: string;
            width: "CONTENT" | "WIDE" | "FULL";
            enabled: boolean;
            visibility: {
                startsAt: string | null;
                endsAt: string | null;
                devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
                locales: ("en" | "ar")[];
            };
            size: "SMALL" | "MEDIUM" | "LARGE";
            analyticsKey: string;
            surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
            spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
        } | {
            type: "DIVIDER";
            id: string;
            label: string;
            width: "CONTENT" | "WIDE" | "FULL";
            enabled: boolean;
            visibility: {
                startsAt: string | null;
                endsAt: string | null;
                devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
                locales: ("en" | "ar")[];
            };
            analyticsKey: string;
            surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
            spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
        })[];
    }, {
        title: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        schemaVersion: 1;
        seo: {
            description: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            title: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            canonicalPath?: string | null | undefined;
            openGraphMediaId?: string | null | undefined;
            indexable?: boolean | undefined;
        };
        sections: ({
            type: "HERO";
            id: string;
            description: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            label: string;
            heading: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            eyebrow: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            imageAlt: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            visibility: {
                startsAt?: string | null | undefined;
                endsAt?: string | null | undefined;
                devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
                locales?: ("en" | "ar")[] | undefined;
            };
            primaryCtaLabel: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            secondaryCtaLabel: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            analyticsKey: string;
            width?: "CONTENT" | "WIDE" | "FULL" | undefined;
            enabled?: boolean | undefined;
            alignment?: "START" | "CENTER" | "END" | undefined;
            desktopMediaId?: string | null | undefined;
            mobileMediaId?: string | null | undefined;
            primaryDestination?: {
                type: "HOME";
            } | {
                type: "SHOP";
            } | {
                type: "OFFERS";
            } | {
                type: "NEW_ARRIVALS";
            } | {
                type: "ABOUT";
            } | {
                type: "CONTACT";
            } | {
                type: "CATEGORY";
                id: string;
            } | {
                type: "BRAND";
                id: string;
            } | {
                type: "PRODUCT";
                id: string;
            } | {
                type: "TAG";
                id: string;
            } | {
                path: string;
                type: "CUSTOM_PATH";
            } | {
                type: "EXTERNAL";
                url: string;
                newTab?: boolean | undefined;
            } | {
                type: "PAGE";
                id: string;
            } | null | undefined;
            secondaryDestination?: {
                type: "HOME";
            } | {
                type: "SHOP";
            } | {
                type: "OFFERS";
            } | {
                type: "NEW_ARRIVALS";
            } | {
                type: "ABOUT";
            } | {
                type: "CONTACT";
            } | {
                type: "CATEGORY";
                id: string;
            } | {
                type: "BRAND";
                id: string;
            } | {
                type: "PRODUCT";
                id: string;
            } | {
                type: "TAG";
                id: string;
            } | {
                path: string;
                type: "CUSTOM_PATH";
            } | {
                type: "EXTERNAL";
                url: string;
                newTab?: boolean | undefined;
            } | {
                type: "PAGE";
                id: string;
            } | null | undefined;
            layout?: "SPLIT" | "FULL" | "CONTAINED" | undefined;
            contentPosition?: "CENTER" | "TOP" | "BOTTOM" | undefined;
            overlay?: "NONE" | "MEDIUM" | "LIGHT" | "STRONG" | undefined;
            headingLevel?: "H1" | "H2" | undefined;
            surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
            spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
        } | {
            type: "PRODUCT_GRID";
            id: string;
            description: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            label: string;
            source: {
                mode: "MANUAL";
                productIds?: string[] | undefined;
            } | {
                mode: "CATEGORY";
                referenceId: string;
            } | {
                mode: "BRAND";
                referenceId: string;
            } | {
                mode: "TAG";
                referenceId: string;
            } | {
                mode: "PROMOTION";
                referenceId: string;
            } | {
                mode: "NEWEST";
            } | {
                mode: "FEATURED";
            };
            heading: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            viewAllLabel: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            visibility: {
                startsAt?: string | null | undefined;
                endsAt?: string | null | undefined;
                devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
                locales?: ("en" | "ar")[] | undefined;
            };
            columns: {
                desktop?: number | undefined;
                tablet?: number | undefined;
                mobile?: number | undefined;
            };
            analyticsKey: string;
            limit?: number | undefined;
            width?: "CONTENT" | "WIDE" | "FULL" | undefined;
            enabled?: boolean | undefined;
            destination?: {
                type: "HOME";
            } | {
                type: "SHOP";
            } | {
                type: "OFFERS";
            } | {
                type: "NEW_ARRIVALS";
            } | {
                type: "ABOUT";
            } | {
                type: "CONTACT";
            } | {
                type: "CATEGORY";
                id: string;
            } | {
                type: "BRAND";
                id: string;
            } | {
                type: "PRODUCT";
                id: string;
            } | {
                type: "TAG";
                id: string;
            } | {
                path: string;
                type: "CUSTOM_PATH";
            } | {
                type: "EXTERNAL";
                url: string;
                newTab?: boolean | undefined;
            } | {
                type: "PAGE";
                id: string;
            } | null | undefined;
            style?: "COMPACT" | "CLEAN" | "EDITORIAL" | undefined;
            showViewAll?: boolean | undefined;
            surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
            spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
        } | {
            type: "PRODUCT_CAROUSEL";
            id: string;
            description: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            label: string;
            source: {
                mode: "MANUAL";
                productIds?: string[] | undefined;
            } | {
                mode: "CATEGORY";
                referenceId: string;
            } | {
                mode: "BRAND";
                referenceId: string;
            } | {
                mode: "TAG";
                referenceId: string;
            } | {
                mode: "PROMOTION";
                referenceId: string;
            } | {
                mode: "NEWEST";
            } | {
                mode: "FEATURED";
            };
            heading: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            viewAllLabel: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            visibility: {
                startsAt?: string | null | undefined;
                endsAt?: string | null | undefined;
                devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
                locales?: ("en" | "ar")[] | undefined;
            };
            columns: {
                desktop?: number | undefined;
                tablet?: number | undefined;
                mobile?: number | undefined;
            };
            analyticsKey: string;
            limit?: number | undefined;
            width?: "CONTENT" | "WIDE" | "FULL" | undefined;
            enabled?: boolean | undefined;
            destination?: {
                type: "HOME";
            } | {
                type: "SHOP";
            } | {
                type: "OFFERS";
            } | {
                type: "NEW_ARRIVALS";
            } | {
                type: "ABOUT";
            } | {
                type: "CONTACT";
            } | {
                type: "CATEGORY";
                id: string;
            } | {
                type: "BRAND";
                id: string;
            } | {
                type: "PRODUCT";
                id: string;
            } | {
                type: "TAG";
                id: string;
            } | {
                path: string;
                type: "CUSTOM_PATH";
            } | {
                type: "EXTERNAL";
                url: string;
                newTab?: boolean | undefined;
            } | {
                type: "PAGE";
                id: string;
            } | null | undefined;
            style?: "COMPACT" | "CLEAN" | "EDITORIAL" | undefined;
            showViewAll?: boolean | undefined;
            surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
            spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
            autoplay?: boolean | undefined;
        } | {
            type: "CATEGORIES";
            id: string;
            description: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            label: string;
            heading: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            visibility: {
                startsAt?: string | null | undefined;
                endsAt?: string | null | undefined;
                devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
                locales?: ("en" | "ar")[] | undefined;
            };
            analyticsKey: string;
            limit?: number | undefined;
            width?: "CONTENT" | "WIDE" | "FULL" | undefined;
            enabled?: boolean | undefined;
            categoryIds?: string[] | undefined;
            layout?: "COMPACT" | "CARDS" | "EDITORIAL" | "IMAGE_TILES" | undefined;
            surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
            spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
            showChildren?: boolean | undefined;
            showGrandchildren?: boolean | undefined;
        } | {
            type: "BRANDS";
            id: string;
            description: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            label: string;
            heading: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            visibility: {
                startsAt?: string | null | undefined;
                endsAt?: string | null | undefined;
                devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
                locales?: ("en" | "ar")[] | undefined;
            };
            analyticsKey: string;
            limit?: number | undefined;
            width?: "CONTENT" | "WIDE" | "FULL" | undefined;
            enabled?: boolean | undefined;
            brandIds?: string[] | undefined;
            mode?: "MANUAL" | "FEATURED" | undefined;
            layout?: "LOGO_GRID" | "EDITORIAL" | "LOGO_RAIL" | undefined;
            surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
            spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
        } | {
            type: "PROMOTION";
            id: string;
            description: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            label: string;
            promotionId: string;
            heading: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            eyebrow: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            ctaLabel: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            imageAlt: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            visibility: {
                startsAt?: string | null | undefined;
                endsAt?: string | null | undefined;
                devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
                locales?: ("en" | "ar")[] | undefined;
            };
            analyticsKey: string;
            width?: "CONTENT" | "WIDE" | "FULL" | undefined;
            enabled?: boolean | undefined;
            destination?: {
                type: "HOME";
            } | {
                type: "SHOP";
            } | {
                type: "OFFERS";
            } | {
                type: "NEW_ARRIVALS";
            } | {
                type: "ABOUT";
            } | {
                type: "CONTACT";
            } | {
                type: "CATEGORY";
                id: string;
            } | {
                type: "BRAND";
                id: string;
            } | {
                type: "PRODUCT";
                id: string;
            } | {
                type: "TAG";
                id: string;
            } | {
                path: string;
                type: "CUSTOM_PATH";
            } | {
                type: "EXTERNAL";
                url: string;
                newTab?: boolean | undefined;
            } | {
                type: "PAGE";
                id: string;
            } | null | undefined;
            mediaAssetId?: string | null | undefined;
            style?: "DARK" | "EDITORIAL" | "BANNER" | undefined;
            surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
            spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
            expiredBehavior?: "HIDE" | "SHOW_EXPIRED" | undefined;
        } | {
            type: "ROUTINE_CTA";
            id: string;
            description: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            label: string;
            heading: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            eyebrow: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            ctaLabel: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            imageAlt: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            visibility: {
                startsAt?: string | null | undefined;
                endsAt?: string | null | undefined;
                devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
                locales?: ("en" | "ar")[] | undefined;
            };
            analyticsKey: string;
            width?: "CONTENT" | "WIDE" | "FULL" | undefined;
            enabled?: boolean | undefined;
            destination?: {
                type: "HOME";
            } | {
                type: "SHOP";
            } | {
                type: "OFFERS";
            } | {
                type: "NEW_ARRIVALS";
            } | {
                type: "ABOUT";
            } | {
                type: "CONTACT";
            } | {
                type: "CATEGORY";
                id: string;
            } | {
                type: "BRAND";
                id: string;
            } | {
                type: "PRODUCT";
                id: string;
            } | {
                type: "TAG";
                id: string;
            } | {
                path: string;
                type: "CUSTOM_PATH";
            } | {
                type: "EXTERNAL";
                url: string;
                newTab?: boolean | undefined;
            } | {
                type: "PAGE";
                id: string;
            } | undefined;
            mediaAssetId?: string | null | undefined;
            style?: "COMPACT" | "DARK" | "EDITORIAL" | undefined;
            surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
            spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
        } | {
            type: "IMAGE_TEXT";
            id: string;
            label: string;
            heading: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            eyebrow: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            ctaLabel: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            imageAlt: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            visibility: {
                startsAt?: string | null | undefined;
                endsAt?: string | null | undefined;
                devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
                locales?: ("en" | "ar")[] | undefined;
            };
            analyticsKey: string;
            body: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            width?: "CONTENT" | "WIDE" | "FULL" | undefined;
            enabled?: boolean | undefined;
            destination?: {
                type: "HOME";
            } | {
                type: "SHOP";
            } | {
                type: "OFFERS";
            } | {
                type: "NEW_ARRIVALS";
            } | {
                type: "ABOUT";
            } | {
                type: "CONTACT";
            } | {
                type: "CATEGORY";
                id: string;
            } | {
                type: "BRAND";
                id: string;
            } | {
                type: "PRODUCT";
                id: string;
            } | {
                type: "TAG";
                id: string;
            } | {
                path: string;
                type: "CUSTOM_PATH";
            } | {
                type: "EXTERNAL";
                url: string;
                newTab?: boolean | undefined;
            } | {
                type: "PAGE";
                id: string;
            } | null | undefined;
            mediaAssetId?: string | null | undefined;
            style?: "EDITORIAL" | "CONTAINED" | "FULL_BLEED" | undefined;
            surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
            spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
            imageSide?: "START" | "END" | undefined;
        } | {
            type: "PROMO_BANNER";
            id: string;
            description: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            label: string;
            heading: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            ctaLabel: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            imageAlt: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            visibility: {
                startsAt?: string | null | undefined;
                endsAt?: string | null | undefined;
                devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
                locales?: ("en" | "ar")[] | undefined;
            };
            analyticsKey: string;
            width?: "CONTENT" | "WIDE" | "FULL" | undefined;
            enabled?: boolean | undefined;
            destination?: {
                type: "HOME";
            } | {
                type: "SHOP";
            } | {
                type: "OFFERS";
            } | {
                type: "NEW_ARRIVALS";
            } | {
                type: "ABOUT";
            } | {
                type: "CONTACT";
            } | {
                type: "CATEGORY";
                id: string;
            } | {
                type: "BRAND";
                id: string;
            } | {
                type: "PRODUCT";
                id: string;
            } | {
                type: "TAG";
                id: string;
            } | {
                path: string;
                type: "CUSTOM_PATH";
            } | {
                type: "EXTERNAL";
                url: string;
                newTab?: boolean | undefined;
            } | {
                type: "PAGE";
                id: string;
            } | null | undefined;
            mediaAssetId?: string | null | undefined;
            style?: "IMAGE" | "SOFT" | "DARK" | "ACCENT" | undefined;
            surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
            spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
        } | {
            type: "COUNTDOWN";
            id: string;
            description: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            label: string;
            endsAt: string;
            heading: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            eyebrow: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            visibility: {
                startsAt?: string | null | undefined;
                endsAt?: string | null | undefined;
                devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
                locales?: ("en" | "ar")[] | undefined;
            };
            analyticsKey: string;
            expiredMessage: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            width?: "CONTENT" | "WIDE" | "FULL" | undefined;
            enabled?: boolean | undefined;
            surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
            spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
            expiredBehavior?: "HIDE" | "SHOW_EXPIRED" | undefined;
        } | {
            type: "NEWSLETTER";
            id: string;
            description: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            label: string;
            heading: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            eyebrow: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            visibility: {
                startsAt?: string | null | undefined;
                endsAt?: string | null | undefined;
                devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
                locales?: ("en" | "ar")[] | undefined;
            };
            analyticsKey: string;
            width?: "CONTENT" | "WIDE" | "FULL" | undefined;
            enabled?: boolean | undefined;
            style?: "COMPACT" | "DARK" | "EDITORIAL" | undefined;
            surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
            spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
        } | {
            type: "FAQ";
            id: string;
            description: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            label: string;
            heading: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            visibility: {
                startsAt?: string | null | undefined;
                endsAt?: string | null | undefined;
                devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
                locales?: ("en" | "ar")[] | undefined;
            };
            analyticsKey: string;
            width?: "CONTENT" | "WIDE" | "FULL" | undefined;
            items?: {
                id: string;
                question: {
                    en?: string | undefined;
                    ar?: string | undefined;
                };
                answer: {
                    en?: string | undefined;
                    ar?: string | undefined;
                };
            }[] | undefined;
            enabled?: boolean | undefined;
            surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
            spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
        } | {
            type: "SPACER";
            id: string;
            label: string;
            visibility: {
                startsAt?: string | null | undefined;
                endsAt?: string | null | undefined;
                devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
                locales?: ("en" | "ar")[] | undefined;
            };
            analyticsKey: string;
            width?: "CONTENT" | "WIDE" | "FULL" | undefined;
            enabled?: boolean | undefined;
            size?: "SMALL" | "MEDIUM" | "LARGE" | undefined;
            surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
            spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
        } | {
            type: "DIVIDER";
            id: string;
            label: string;
            visibility: {
                startsAt?: string | null | undefined;
                endsAt?: string | null | undefined;
                devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
                locales?: ("en" | "ar")[] | undefined;
            };
            analyticsKey: string;
            width?: "CONTENT" | "WIDE" | "FULL" | undefined;
            enabled?: boolean | undefined;
            surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
            spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
        })[];
    }>, {
        title: {
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
            canonicalPath: string | null;
            openGraphMediaId: string | null;
            indexable: boolean;
        };
        sections: ({
            type: "HERO";
            id: string;
            description: {
                en: string;
                ar: string;
            };
            label: string;
            width: "CONTENT" | "WIDE" | "FULL";
            enabled: boolean;
            heading: {
                en: string;
                ar: string;
            };
            eyebrow: {
                en: string;
                ar: string;
            };
            imageAlt: {
                en: string;
                ar: string;
            };
            visibility: {
                startsAt: string | null;
                endsAt: string | null;
                devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
                locales: ("en" | "ar")[];
            };
            alignment: "START" | "CENTER" | "END";
            desktopMediaId: string | null;
            mobileMediaId: string | null;
            primaryCtaLabel: {
                en: string;
                ar: string;
            };
            primaryDestination: {
                type: "HOME";
            } | {
                type: "SHOP";
            } | {
                type: "OFFERS";
            } | {
                type: "NEW_ARRIVALS";
            } | {
                type: "ABOUT";
            } | {
                type: "CONTACT";
            } | {
                type: "CATEGORY";
                id: string;
            } | {
                type: "BRAND";
                id: string;
            } | {
                type: "PRODUCT";
                id: string;
            } | {
                type: "TAG";
                id: string;
            } | {
                path: string;
                type: "CUSTOM_PATH";
            } | {
                type: "EXTERNAL";
                url: string;
                newTab: boolean;
            } | {
                type: "PAGE";
                id: string;
            } | null;
            secondaryCtaLabel: {
                en: string;
                ar: string;
            };
            secondaryDestination: {
                type: "HOME";
            } | {
                type: "SHOP";
            } | {
                type: "OFFERS";
            } | {
                type: "NEW_ARRIVALS";
            } | {
                type: "ABOUT";
            } | {
                type: "CONTACT";
            } | {
                type: "CATEGORY";
                id: string;
            } | {
                type: "BRAND";
                id: string;
            } | {
                type: "PRODUCT";
                id: string;
            } | {
                type: "TAG";
                id: string;
            } | {
                path: string;
                type: "CUSTOM_PATH";
            } | {
                type: "EXTERNAL";
                url: string;
                newTab: boolean;
            } | {
                type: "PAGE";
                id: string;
            } | null;
            layout: "SPLIT" | "FULL" | "CONTAINED";
            contentPosition: "CENTER" | "TOP" | "BOTTOM";
            overlay: "NONE" | "MEDIUM" | "LIGHT" | "STRONG";
            headingLevel: "H1" | "H2";
            analyticsKey: string;
            surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
            spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
        } | {
            type: "PRODUCT_GRID";
            limit: number;
            id: string;
            description: {
                en: string;
                ar: string;
            };
            label: string;
            width: "CONTENT" | "WIDE" | "FULL";
            source: {
                productIds: string[];
                mode: "MANUAL";
            } | {
                mode: "CATEGORY";
                referenceId: string;
            } | {
                mode: "BRAND";
                referenceId: string;
            } | {
                mode: "TAG";
                referenceId: string;
            } | {
                mode: "PROMOTION";
                referenceId: string;
            } | {
                mode: "NEWEST";
            } | {
                mode: "FEATURED";
            };
            enabled: boolean;
            heading: {
                en: string;
                ar: string;
            };
            viewAllLabel: {
                en: string;
                ar: string;
            };
            destination: {
                type: "HOME";
            } | {
                type: "SHOP";
            } | {
                type: "OFFERS";
            } | {
                type: "NEW_ARRIVALS";
            } | {
                type: "ABOUT";
            } | {
                type: "CONTACT";
            } | {
                type: "CATEGORY";
                id: string;
            } | {
                type: "BRAND";
                id: string;
            } | {
                type: "PRODUCT";
                id: string;
            } | {
                type: "TAG";
                id: string;
            } | {
                path: string;
                type: "CUSTOM_PATH";
            } | {
                type: "EXTERNAL";
                url: string;
                newTab: boolean;
            } | {
                type: "PAGE";
                id: string;
            } | null;
            style: "COMPACT" | "CLEAN" | "EDITORIAL";
            visibility: {
                startsAt: string | null;
                endsAt: string | null;
                devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
                locales: ("en" | "ar")[];
            };
            showViewAll: boolean;
            columns: {
                desktop: number;
                tablet: number;
                mobile: number;
            };
            analyticsKey: string;
            surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
            spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
        } | {
            type: "PRODUCT_CAROUSEL";
            limit: number;
            id: string;
            description: {
                en: string;
                ar: string;
            };
            label: string;
            width: "CONTENT" | "WIDE" | "FULL";
            source: {
                productIds: string[];
                mode: "MANUAL";
            } | {
                mode: "CATEGORY";
                referenceId: string;
            } | {
                mode: "BRAND";
                referenceId: string;
            } | {
                mode: "TAG";
                referenceId: string;
            } | {
                mode: "PROMOTION";
                referenceId: string;
            } | {
                mode: "NEWEST";
            } | {
                mode: "FEATURED";
            };
            enabled: boolean;
            heading: {
                en: string;
                ar: string;
            };
            viewAllLabel: {
                en: string;
                ar: string;
            };
            destination: {
                type: "HOME";
            } | {
                type: "SHOP";
            } | {
                type: "OFFERS";
            } | {
                type: "NEW_ARRIVALS";
            } | {
                type: "ABOUT";
            } | {
                type: "CONTACT";
            } | {
                type: "CATEGORY";
                id: string;
            } | {
                type: "BRAND";
                id: string;
            } | {
                type: "PRODUCT";
                id: string;
            } | {
                type: "TAG";
                id: string;
            } | {
                path: string;
                type: "CUSTOM_PATH";
            } | {
                type: "EXTERNAL";
                url: string;
                newTab: boolean;
            } | {
                type: "PAGE";
                id: string;
            } | null;
            style: "COMPACT" | "CLEAN" | "EDITORIAL";
            visibility: {
                startsAt: string | null;
                endsAt: string | null;
                devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
                locales: ("en" | "ar")[];
            };
            showViewAll: boolean;
            columns: {
                desktop: number;
                tablet: number;
                mobile: number;
            };
            analyticsKey: string;
            surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
            spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
            autoplay: boolean;
        } | {
            type: "CATEGORIES";
            limit: number;
            id: string;
            description: {
                en: string;
                ar: string;
            };
            label: string;
            width: "CONTENT" | "WIDE" | "FULL";
            enabled: boolean;
            categoryIds: string[];
            heading: {
                en: string;
                ar: string;
            };
            visibility: {
                startsAt: string | null;
                endsAt: string | null;
                devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
                locales: ("en" | "ar")[];
            };
            layout: "COMPACT" | "CARDS" | "EDITORIAL" | "IMAGE_TILES";
            analyticsKey: string;
            surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
            spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
            showChildren: boolean;
            showGrandchildren: boolean;
        } | {
            type: "BRANDS";
            limit: number;
            id: string;
            description: {
                en: string;
                ar: string;
            };
            label: string;
            width: "CONTENT" | "WIDE" | "FULL";
            enabled: boolean;
            brandIds: string[];
            heading: {
                en: string;
                ar: string;
            };
            visibility: {
                startsAt: string | null;
                endsAt: string | null;
                devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
                locales: ("en" | "ar")[];
            };
            mode: "MANUAL" | "FEATURED";
            layout: "LOGO_GRID" | "EDITORIAL" | "LOGO_RAIL";
            analyticsKey: string;
            surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
            spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
        } | {
            type: "PROMOTION";
            id: string;
            description: {
                en: string;
                ar: string;
            };
            label: string;
            width: "CONTENT" | "WIDE" | "FULL";
            promotionId: string;
            enabled: boolean;
            heading: {
                en: string;
                ar: string;
            };
            eyebrow: {
                en: string;
                ar: string;
            };
            ctaLabel: {
                en: string;
                ar: string;
            };
            destination: {
                type: "HOME";
            } | {
                type: "SHOP";
            } | {
                type: "OFFERS";
            } | {
                type: "NEW_ARRIVALS";
            } | {
                type: "ABOUT";
            } | {
                type: "CONTACT";
            } | {
                type: "CATEGORY";
                id: string;
            } | {
                type: "BRAND";
                id: string;
            } | {
                type: "PRODUCT";
                id: string;
            } | {
                type: "TAG";
                id: string;
            } | {
                path: string;
                type: "CUSTOM_PATH";
            } | {
                type: "EXTERNAL";
                url: string;
                newTab: boolean;
            } | {
                type: "PAGE";
                id: string;
            } | null;
            mediaAssetId: string | null;
            imageAlt: {
                en: string;
                ar: string;
            };
            style: "DARK" | "EDITORIAL" | "BANNER";
            visibility: {
                startsAt: string | null;
                endsAt: string | null;
                devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
                locales: ("en" | "ar")[];
            };
            analyticsKey: string;
            surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
            spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
            expiredBehavior: "HIDE" | "SHOW_EXPIRED";
        } | {
            type: "ROUTINE_CTA";
            id: string;
            description: {
                en: string;
                ar: string;
            };
            label: string;
            width: "CONTENT" | "WIDE" | "FULL";
            enabled: boolean;
            heading: {
                en: string;
                ar: string;
            };
            eyebrow: {
                en: string;
                ar: string;
            };
            ctaLabel: {
                en: string;
                ar: string;
            };
            destination: {
                type: "HOME";
            } | {
                type: "SHOP";
            } | {
                type: "OFFERS";
            } | {
                type: "NEW_ARRIVALS";
            } | {
                type: "ABOUT";
            } | {
                type: "CONTACT";
            } | {
                type: "CATEGORY";
                id: string;
            } | {
                type: "BRAND";
                id: string;
            } | {
                type: "PRODUCT";
                id: string;
            } | {
                type: "TAG";
                id: string;
            } | {
                path: string;
                type: "CUSTOM_PATH";
            } | {
                type: "EXTERNAL";
                url: string;
                newTab: boolean;
            } | {
                type: "PAGE";
                id: string;
            };
            mediaAssetId: string | null;
            imageAlt: {
                en: string;
                ar: string;
            };
            style: "COMPACT" | "DARK" | "EDITORIAL";
            visibility: {
                startsAt: string | null;
                endsAt: string | null;
                devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
                locales: ("en" | "ar")[];
            };
            analyticsKey: string;
            surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
            spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
        } | {
            type: "IMAGE_TEXT";
            id: string;
            label: string;
            width: "CONTENT" | "WIDE" | "FULL";
            enabled: boolean;
            heading: {
                en: string;
                ar: string;
            };
            eyebrow: {
                en: string;
                ar: string;
            };
            ctaLabel: {
                en: string;
                ar: string;
            };
            destination: {
                type: "HOME";
            } | {
                type: "SHOP";
            } | {
                type: "OFFERS";
            } | {
                type: "NEW_ARRIVALS";
            } | {
                type: "ABOUT";
            } | {
                type: "CONTACT";
            } | {
                type: "CATEGORY";
                id: string;
            } | {
                type: "BRAND";
                id: string;
            } | {
                type: "PRODUCT";
                id: string;
            } | {
                type: "TAG";
                id: string;
            } | {
                path: string;
                type: "CUSTOM_PATH";
            } | {
                type: "EXTERNAL";
                url: string;
                newTab: boolean;
            } | {
                type: "PAGE";
                id: string;
            } | null;
            mediaAssetId: string | null;
            imageAlt: {
                en: string;
                ar: string;
            };
            style: "EDITORIAL" | "CONTAINED" | "FULL_BLEED";
            visibility: {
                startsAt: string | null;
                endsAt: string | null;
                devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
                locales: ("en" | "ar")[];
            };
            analyticsKey: string;
            surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
            spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
            body: {
                en: string;
                ar: string;
            };
            imageSide: "START" | "END";
        } | {
            type: "PROMO_BANNER";
            id: string;
            description: {
                en: string;
                ar: string;
            };
            label: string;
            width: "CONTENT" | "WIDE" | "FULL";
            enabled: boolean;
            heading: {
                en: string;
                ar: string;
            };
            ctaLabel: {
                en: string;
                ar: string;
            };
            destination: {
                type: "HOME";
            } | {
                type: "SHOP";
            } | {
                type: "OFFERS";
            } | {
                type: "NEW_ARRIVALS";
            } | {
                type: "ABOUT";
            } | {
                type: "CONTACT";
            } | {
                type: "CATEGORY";
                id: string;
            } | {
                type: "BRAND";
                id: string;
            } | {
                type: "PRODUCT";
                id: string;
            } | {
                type: "TAG";
                id: string;
            } | {
                path: string;
                type: "CUSTOM_PATH";
            } | {
                type: "EXTERNAL";
                url: string;
                newTab: boolean;
            } | {
                type: "PAGE";
                id: string;
            } | null;
            mediaAssetId: string | null;
            imageAlt: {
                en: string;
                ar: string;
            };
            style: "IMAGE" | "SOFT" | "DARK" | "ACCENT";
            visibility: {
                startsAt: string | null;
                endsAt: string | null;
                devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
                locales: ("en" | "ar")[];
            };
            analyticsKey: string;
            surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
            spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
        } | {
            type: "COUNTDOWN";
            id: string;
            description: {
                en: string;
                ar: string;
            };
            label: string;
            width: "CONTENT" | "WIDE" | "FULL";
            enabled: boolean;
            endsAt: string;
            heading: {
                en: string;
                ar: string;
            };
            eyebrow: {
                en: string;
                ar: string;
            };
            visibility: {
                startsAt: string | null;
                endsAt: string | null;
                devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
                locales: ("en" | "ar")[];
            };
            analyticsKey: string;
            surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
            spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
            expiredBehavior: "HIDE" | "SHOW_EXPIRED";
            expiredMessage: {
                en: string;
                ar: string;
            };
        } | {
            type: "NEWSLETTER";
            id: string;
            description: {
                en: string;
                ar: string;
            };
            label: string;
            width: "CONTENT" | "WIDE" | "FULL";
            enabled: boolean;
            heading: {
                en: string;
                ar: string;
            };
            eyebrow: {
                en: string;
                ar: string;
            };
            style: "COMPACT" | "DARK" | "EDITORIAL";
            visibility: {
                startsAt: string | null;
                endsAt: string | null;
                devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
                locales: ("en" | "ar")[];
            };
            analyticsKey: string;
            surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
            spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
        } | {
            type: "FAQ";
            id: string;
            description: {
                en: string;
                ar: string;
            };
            label: string;
            width: "CONTENT" | "WIDE" | "FULL";
            items: {
                id: string;
                question: {
                    en: string;
                    ar: string;
                };
                answer: {
                    en: string;
                    ar: string;
                };
            }[];
            enabled: boolean;
            heading: {
                en: string;
                ar: string;
            };
            visibility: {
                startsAt: string | null;
                endsAt: string | null;
                devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
                locales: ("en" | "ar")[];
            };
            analyticsKey: string;
            surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
            spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
        } | {
            type: "SPACER";
            id: string;
            label: string;
            width: "CONTENT" | "WIDE" | "FULL";
            enabled: boolean;
            visibility: {
                startsAt: string | null;
                endsAt: string | null;
                devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
                locales: ("en" | "ar")[];
            };
            size: "SMALL" | "MEDIUM" | "LARGE";
            analyticsKey: string;
            surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
            spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
        } | {
            type: "DIVIDER";
            id: string;
            label: string;
            width: "CONTENT" | "WIDE" | "FULL";
            enabled: boolean;
            visibility: {
                startsAt: string | null;
                endsAt: string | null;
                devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
                locales: ("en" | "ar")[];
            };
            analyticsKey: string;
            surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
            spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
        })[];
    }, {
        title: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        schemaVersion: 1;
        seo: {
            description: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            title: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            canonicalPath?: string | null | undefined;
            openGraphMediaId?: string | null | undefined;
            indexable?: boolean | undefined;
        };
        sections: ({
            type: "HERO";
            id: string;
            description: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            label: string;
            heading: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            eyebrow: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            imageAlt: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            visibility: {
                startsAt?: string | null | undefined;
                endsAt?: string | null | undefined;
                devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
                locales?: ("en" | "ar")[] | undefined;
            };
            primaryCtaLabel: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            secondaryCtaLabel: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            analyticsKey: string;
            width?: "CONTENT" | "WIDE" | "FULL" | undefined;
            enabled?: boolean | undefined;
            alignment?: "START" | "CENTER" | "END" | undefined;
            desktopMediaId?: string | null | undefined;
            mobileMediaId?: string | null | undefined;
            primaryDestination?: {
                type: "HOME";
            } | {
                type: "SHOP";
            } | {
                type: "OFFERS";
            } | {
                type: "NEW_ARRIVALS";
            } | {
                type: "ABOUT";
            } | {
                type: "CONTACT";
            } | {
                type: "CATEGORY";
                id: string;
            } | {
                type: "BRAND";
                id: string;
            } | {
                type: "PRODUCT";
                id: string;
            } | {
                type: "TAG";
                id: string;
            } | {
                path: string;
                type: "CUSTOM_PATH";
            } | {
                type: "EXTERNAL";
                url: string;
                newTab?: boolean | undefined;
            } | {
                type: "PAGE";
                id: string;
            } | null | undefined;
            secondaryDestination?: {
                type: "HOME";
            } | {
                type: "SHOP";
            } | {
                type: "OFFERS";
            } | {
                type: "NEW_ARRIVALS";
            } | {
                type: "ABOUT";
            } | {
                type: "CONTACT";
            } | {
                type: "CATEGORY";
                id: string;
            } | {
                type: "BRAND";
                id: string;
            } | {
                type: "PRODUCT";
                id: string;
            } | {
                type: "TAG";
                id: string;
            } | {
                path: string;
                type: "CUSTOM_PATH";
            } | {
                type: "EXTERNAL";
                url: string;
                newTab?: boolean | undefined;
            } | {
                type: "PAGE";
                id: string;
            } | null | undefined;
            layout?: "SPLIT" | "FULL" | "CONTAINED" | undefined;
            contentPosition?: "CENTER" | "TOP" | "BOTTOM" | undefined;
            overlay?: "NONE" | "MEDIUM" | "LIGHT" | "STRONG" | undefined;
            headingLevel?: "H1" | "H2" | undefined;
            surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
            spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
        } | {
            type: "PRODUCT_GRID";
            id: string;
            description: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            label: string;
            source: {
                mode: "MANUAL";
                productIds?: string[] | undefined;
            } | {
                mode: "CATEGORY";
                referenceId: string;
            } | {
                mode: "BRAND";
                referenceId: string;
            } | {
                mode: "TAG";
                referenceId: string;
            } | {
                mode: "PROMOTION";
                referenceId: string;
            } | {
                mode: "NEWEST";
            } | {
                mode: "FEATURED";
            };
            heading: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            viewAllLabel: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            visibility: {
                startsAt?: string | null | undefined;
                endsAt?: string | null | undefined;
                devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
                locales?: ("en" | "ar")[] | undefined;
            };
            columns: {
                desktop?: number | undefined;
                tablet?: number | undefined;
                mobile?: number | undefined;
            };
            analyticsKey: string;
            limit?: number | undefined;
            width?: "CONTENT" | "WIDE" | "FULL" | undefined;
            enabled?: boolean | undefined;
            destination?: {
                type: "HOME";
            } | {
                type: "SHOP";
            } | {
                type: "OFFERS";
            } | {
                type: "NEW_ARRIVALS";
            } | {
                type: "ABOUT";
            } | {
                type: "CONTACT";
            } | {
                type: "CATEGORY";
                id: string;
            } | {
                type: "BRAND";
                id: string;
            } | {
                type: "PRODUCT";
                id: string;
            } | {
                type: "TAG";
                id: string;
            } | {
                path: string;
                type: "CUSTOM_PATH";
            } | {
                type: "EXTERNAL";
                url: string;
                newTab?: boolean | undefined;
            } | {
                type: "PAGE";
                id: string;
            } | null | undefined;
            style?: "COMPACT" | "CLEAN" | "EDITORIAL" | undefined;
            showViewAll?: boolean | undefined;
            surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
            spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
        } | {
            type: "PRODUCT_CAROUSEL";
            id: string;
            description: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            label: string;
            source: {
                mode: "MANUAL";
                productIds?: string[] | undefined;
            } | {
                mode: "CATEGORY";
                referenceId: string;
            } | {
                mode: "BRAND";
                referenceId: string;
            } | {
                mode: "TAG";
                referenceId: string;
            } | {
                mode: "PROMOTION";
                referenceId: string;
            } | {
                mode: "NEWEST";
            } | {
                mode: "FEATURED";
            };
            heading: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            viewAllLabel: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            visibility: {
                startsAt?: string | null | undefined;
                endsAt?: string | null | undefined;
                devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
                locales?: ("en" | "ar")[] | undefined;
            };
            columns: {
                desktop?: number | undefined;
                tablet?: number | undefined;
                mobile?: number | undefined;
            };
            analyticsKey: string;
            limit?: number | undefined;
            width?: "CONTENT" | "WIDE" | "FULL" | undefined;
            enabled?: boolean | undefined;
            destination?: {
                type: "HOME";
            } | {
                type: "SHOP";
            } | {
                type: "OFFERS";
            } | {
                type: "NEW_ARRIVALS";
            } | {
                type: "ABOUT";
            } | {
                type: "CONTACT";
            } | {
                type: "CATEGORY";
                id: string;
            } | {
                type: "BRAND";
                id: string;
            } | {
                type: "PRODUCT";
                id: string;
            } | {
                type: "TAG";
                id: string;
            } | {
                path: string;
                type: "CUSTOM_PATH";
            } | {
                type: "EXTERNAL";
                url: string;
                newTab?: boolean | undefined;
            } | {
                type: "PAGE";
                id: string;
            } | null | undefined;
            style?: "COMPACT" | "CLEAN" | "EDITORIAL" | undefined;
            showViewAll?: boolean | undefined;
            surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
            spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
            autoplay?: boolean | undefined;
        } | {
            type: "CATEGORIES";
            id: string;
            description: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            label: string;
            heading: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            visibility: {
                startsAt?: string | null | undefined;
                endsAt?: string | null | undefined;
                devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
                locales?: ("en" | "ar")[] | undefined;
            };
            analyticsKey: string;
            limit?: number | undefined;
            width?: "CONTENT" | "WIDE" | "FULL" | undefined;
            enabled?: boolean | undefined;
            categoryIds?: string[] | undefined;
            layout?: "COMPACT" | "CARDS" | "EDITORIAL" | "IMAGE_TILES" | undefined;
            surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
            spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
            showChildren?: boolean | undefined;
            showGrandchildren?: boolean | undefined;
        } | {
            type: "BRANDS";
            id: string;
            description: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            label: string;
            heading: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            visibility: {
                startsAt?: string | null | undefined;
                endsAt?: string | null | undefined;
                devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
                locales?: ("en" | "ar")[] | undefined;
            };
            analyticsKey: string;
            limit?: number | undefined;
            width?: "CONTENT" | "WIDE" | "FULL" | undefined;
            enabled?: boolean | undefined;
            brandIds?: string[] | undefined;
            mode?: "MANUAL" | "FEATURED" | undefined;
            layout?: "LOGO_GRID" | "EDITORIAL" | "LOGO_RAIL" | undefined;
            surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
            spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
        } | {
            type: "PROMOTION";
            id: string;
            description: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            label: string;
            promotionId: string;
            heading: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            eyebrow: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            ctaLabel: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            imageAlt: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            visibility: {
                startsAt?: string | null | undefined;
                endsAt?: string | null | undefined;
                devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
                locales?: ("en" | "ar")[] | undefined;
            };
            analyticsKey: string;
            width?: "CONTENT" | "WIDE" | "FULL" | undefined;
            enabled?: boolean | undefined;
            destination?: {
                type: "HOME";
            } | {
                type: "SHOP";
            } | {
                type: "OFFERS";
            } | {
                type: "NEW_ARRIVALS";
            } | {
                type: "ABOUT";
            } | {
                type: "CONTACT";
            } | {
                type: "CATEGORY";
                id: string;
            } | {
                type: "BRAND";
                id: string;
            } | {
                type: "PRODUCT";
                id: string;
            } | {
                type: "TAG";
                id: string;
            } | {
                path: string;
                type: "CUSTOM_PATH";
            } | {
                type: "EXTERNAL";
                url: string;
                newTab?: boolean | undefined;
            } | {
                type: "PAGE";
                id: string;
            } | null | undefined;
            mediaAssetId?: string | null | undefined;
            style?: "DARK" | "EDITORIAL" | "BANNER" | undefined;
            surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
            spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
            expiredBehavior?: "HIDE" | "SHOW_EXPIRED" | undefined;
        } | {
            type: "ROUTINE_CTA";
            id: string;
            description: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            label: string;
            heading: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            eyebrow: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            ctaLabel: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            imageAlt: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            visibility: {
                startsAt?: string | null | undefined;
                endsAt?: string | null | undefined;
                devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
                locales?: ("en" | "ar")[] | undefined;
            };
            analyticsKey: string;
            width?: "CONTENT" | "WIDE" | "FULL" | undefined;
            enabled?: boolean | undefined;
            destination?: {
                type: "HOME";
            } | {
                type: "SHOP";
            } | {
                type: "OFFERS";
            } | {
                type: "NEW_ARRIVALS";
            } | {
                type: "ABOUT";
            } | {
                type: "CONTACT";
            } | {
                type: "CATEGORY";
                id: string;
            } | {
                type: "BRAND";
                id: string;
            } | {
                type: "PRODUCT";
                id: string;
            } | {
                type: "TAG";
                id: string;
            } | {
                path: string;
                type: "CUSTOM_PATH";
            } | {
                type: "EXTERNAL";
                url: string;
                newTab?: boolean | undefined;
            } | {
                type: "PAGE";
                id: string;
            } | undefined;
            mediaAssetId?: string | null | undefined;
            style?: "COMPACT" | "DARK" | "EDITORIAL" | undefined;
            surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
            spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
        } | {
            type: "IMAGE_TEXT";
            id: string;
            label: string;
            heading: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            eyebrow: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            ctaLabel: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            imageAlt: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            visibility: {
                startsAt?: string | null | undefined;
                endsAt?: string | null | undefined;
                devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
                locales?: ("en" | "ar")[] | undefined;
            };
            analyticsKey: string;
            body: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            width?: "CONTENT" | "WIDE" | "FULL" | undefined;
            enabled?: boolean | undefined;
            destination?: {
                type: "HOME";
            } | {
                type: "SHOP";
            } | {
                type: "OFFERS";
            } | {
                type: "NEW_ARRIVALS";
            } | {
                type: "ABOUT";
            } | {
                type: "CONTACT";
            } | {
                type: "CATEGORY";
                id: string;
            } | {
                type: "BRAND";
                id: string;
            } | {
                type: "PRODUCT";
                id: string;
            } | {
                type: "TAG";
                id: string;
            } | {
                path: string;
                type: "CUSTOM_PATH";
            } | {
                type: "EXTERNAL";
                url: string;
                newTab?: boolean | undefined;
            } | {
                type: "PAGE";
                id: string;
            } | null | undefined;
            mediaAssetId?: string | null | undefined;
            style?: "EDITORIAL" | "CONTAINED" | "FULL_BLEED" | undefined;
            surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
            spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
            imageSide?: "START" | "END" | undefined;
        } | {
            type: "PROMO_BANNER";
            id: string;
            description: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            label: string;
            heading: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            ctaLabel: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            imageAlt: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            visibility: {
                startsAt?: string | null | undefined;
                endsAt?: string | null | undefined;
                devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
                locales?: ("en" | "ar")[] | undefined;
            };
            analyticsKey: string;
            width?: "CONTENT" | "WIDE" | "FULL" | undefined;
            enabled?: boolean | undefined;
            destination?: {
                type: "HOME";
            } | {
                type: "SHOP";
            } | {
                type: "OFFERS";
            } | {
                type: "NEW_ARRIVALS";
            } | {
                type: "ABOUT";
            } | {
                type: "CONTACT";
            } | {
                type: "CATEGORY";
                id: string;
            } | {
                type: "BRAND";
                id: string;
            } | {
                type: "PRODUCT";
                id: string;
            } | {
                type: "TAG";
                id: string;
            } | {
                path: string;
                type: "CUSTOM_PATH";
            } | {
                type: "EXTERNAL";
                url: string;
                newTab?: boolean | undefined;
            } | {
                type: "PAGE";
                id: string;
            } | null | undefined;
            mediaAssetId?: string | null | undefined;
            style?: "IMAGE" | "SOFT" | "DARK" | "ACCENT" | undefined;
            surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
            spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
        } | {
            type: "COUNTDOWN";
            id: string;
            description: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            label: string;
            endsAt: string;
            heading: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            eyebrow: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            visibility: {
                startsAt?: string | null | undefined;
                endsAt?: string | null | undefined;
                devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
                locales?: ("en" | "ar")[] | undefined;
            };
            analyticsKey: string;
            expiredMessage: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            width?: "CONTENT" | "WIDE" | "FULL" | undefined;
            enabled?: boolean | undefined;
            surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
            spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
            expiredBehavior?: "HIDE" | "SHOW_EXPIRED" | undefined;
        } | {
            type: "NEWSLETTER";
            id: string;
            description: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            label: string;
            heading: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            eyebrow: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            visibility: {
                startsAt?: string | null | undefined;
                endsAt?: string | null | undefined;
                devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
                locales?: ("en" | "ar")[] | undefined;
            };
            analyticsKey: string;
            width?: "CONTENT" | "WIDE" | "FULL" | undefined;
            enabled?: boolean | undefined;
            style?: "COMPACT" | "DARK" | "EDITORIAL" | undefined;
            surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
            spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
        } | {
            type: "FAQ";
            id: string;
            description: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            label: string;
            heading: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            visibility: {
                startsAt?: string | null | undefined;
                endsAt?: string | null | undefined;
                devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
                locales?: ("en" | "ar")[] | undefined;
            };
            analyticsKey: string;
            width?: "CONTENT" | "WIDE" | "FULL" | undefined;
            items?: {
                id: string;
                question: {
                    en?: string | undefined;
                    ar?: string | undefined;
                };
                answer: {
                    en?: string | undefined;
                    ar?: string | undefined;
                };
            }[] | undefined;
            enabled?: boolean | undefined;
            surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
            spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
        } | {
            type: "SPACER";
            id: string;
            label: string;
            visibility: {
                startsAt?: string | null | undefined;
                endsAt?: string | null | undefined;
                devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
                locales?: ("en" | "ar")[] | undefined;
            };
            analyticsKey: string;
            width?: "CONTENT" | "WIDE" | "FULL" | undefined;
            enabled?: boolean | undefined;
            size?: "SMALL" | "MEDIUM" | "LARGE" | undefined;
            surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
            spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
        } | {
            type: "DIVIDER";
            id: string;
            label: string;
            visibility: {
                startsAt?: string | null | undefined;
                endsAt?: string | null | undefined;
                devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
                locales?: ("en" | "ar")[] | undefined;
            };
            analyticsKey: string;
            width?: "CONTENT" | "WIDE" | "FULL" | undefined;
            enabled?: boolean | undefined;
            surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
            spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
        })[];
    }>;
}, "strict", z.ZodTypeAny, {
    name: string;
    slug: string;
    expectedRevision: number;
    config: {
        title: {
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
            canonicalPath: string | null;
            openGraphMediaId: string | null;
            indexable: boolean;
        };
        sections: ({
            type: "HERO";
            id: string;
            description: {
                en: string;
                ar: string;
            };
            label: string;
            width: "CONTENT" | "WIDE" | "FULL";
            enabled: boolean;
            heading: {
                en: string;
                ar: string;
            };
            eyebrow: {
                en: string;
                ar: string;
            };
            imageAlt: {
                en: string;
                ar: string;
            };
            visibility: {
                startsAt: string | null;
                endsAt: string | null;
                devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
                locales: ("en" | "ar")[];
            };
            alignment: "START" | "CENTER" | "END";
            desktopMediaId: string | null;
            mobileMediaId: string | null;
            primaryCtaLabel: {
                en: string;
                ar: string;
            };
            primaryDestination: {
                type: "HOME";
            } | {
                type: "SHOP";
            } | {
                type: "OFFERS";
            } | {
                type: "NEW_ARRIVALS";
            } | {
                type: "ABOUT";
            } | {
                type: "CONTACT";
            } | {
                type: "CATEGORY";
                id: string;
            } | {
                type: "BRAND";
                id: string;
            } | {
                type: "PRODUCT";
                id: string;
            } | {
                type: "TAG";
                id: string;
            } | {
                path: string;
                type: "CUSTOM_PATH";
            } | {
                type: "EXTERNAL";
                url: string;
                newTab: boolean;
            } | {
                type: "PAGE";
                id: string;
            } | null;
            secondaryCtaLabel: {
                en: string;
                ar: string;
            };
            secondaryDestination: {
                type: "HOME";
            } | {
                type: "SHOP";
            } | {
                type: "OFFERS";
            } | {
                type: "NEW_ARRIVALS";
            } | {
                type: "ABOUT";
            } | {
                type: "CONTACT";
            } | {
                type: "CATEGORY";
                id: string;
            } | {
                type: "BRAND";
                id: string;
            } | {
                type: "PRODUCT";
                id: string;
            } | {
                type: "TAG";
                id: string;
            } | {
                path: string;
                type: "CUSTOM_PATH";
            } | {
                type: "EXTERNAL";
                url: string;
                newTab: boolean;
            } | {
                type: "PAGE";
                id: string;
            } | null;
            layout: "SPLIT" | "FULL" | "CONTAINED";
            contentPosition: "CENTER" | "TOP" | "BOTTOM";
            overlay: "NONE" | "MEDIUM" | "LIGHT" | "STRONG";
            headingLevel: "H1" | "H2";
            analyticsKey: string;
            surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
            spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
        } | {
            type: "PRODUCT_GRID";
            limit: number;
            id: string;
            description: {
                en: string;
                ar: string;
            };
            label: string;
            width: "CONTENT" | "WIDE" | "FULL";
            source: {
                productIds: string[];
                mode: "MANUAL";
            } | {
                mode: "CATEGORY";
                referenceId: string;
            } | {
                mode: "BRAND";
                referenceId: string;
            } | {
                mode: "TAG";
                referenceId: string;
            } | {
                mode: "PROMOTION";
                referenceId: string;
            } | {
                mode: "NEWEST";
            } | {
                mode: "FEATURED";
            };
            enabled: boolean;
            heading: {
                en: string;
                ar: string;
            };
            viewAllLabel: {
                en: string;
                ar: string;
            };
            destination: {
                type: "HOME";
            } | {
                type: "SHOP";
            } | {
                type: "OFFERS";
            } | {
                type: "NEW_ARRIVALS";
            } | {
                type: "ABOUT";
            } | {
                type: "CONTACT";
            } | {
                type: "CATEGORY";
                id: string;
            } | {
                type: "BRAND";
                id: string;
            } | {
                type: "PRODUCT";
                id: string;
            } | {
                type: "TAG";
                id: string;
            } | {
                path: string;
                type: "CUSTOM_PATH";
            } | {
                type: "EXTERNAL";
                url: string;
                newTab: boolean;
            } | {
                type: "PAGE";
                id: string;
            } | null;
            style: "COMPACT" | "CLEAN" | "EDITORIAL";
            visibility: {
                startsAt: string | null;
                endsAt: string | null;
                devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
                locales: ("en" | "ar")[];
            };
            showViewAll: boolean;
            columns: {
                desktop: number;
                tablet: number;
                mobile: number;
            };
            analyticsKey: string;
            surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
            spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
        } | {
            type: "PRODUCT_CAROUSEL";
            limit: number;
            id: string;
            description: {
                en: string;
                ar: string;
            };
            label: string;
            width: "CONTENT" | "WIDE" | "FULL";
            source: {
                productIds: string[];
                mode: "MANUAL";
            } | {
                mode: "CATEGORY";
                referenceId: string;
            } | {
                mode: "BRAND";
                referenceId: string;
            } | {
                mode: "TAG";
                referenceId: string;
            } | {
                mode: "PROMOTION";
                referenceId: string;
            } | {
                mode: "NEWEST";
            } | {
                mode: "FEATURED";
            };
            enabled: boolean;
            heading: {
                en: string;
                ar: string;
            };
            viewAllLabel: {
                en: string;
                ar: string;
            };
            destination: {
                type: "HOME";
            } | {
                type: "SHOP";
            } | {
                type: "OFFERS";
            } | {
                type: "NEW_ARRIVALS";
            } | {
                type: "ABOUT";
            } | {
                type: "CONTACT";
            } | {
                type: "CATEGORY";
                id: string;
            } | {
                type: "BRAND";
                id: string;
            } | {
                type: "PRODUCT";
                id: string;
            } | {
                type: "TAG";
                id: string;
            } | {
                path: string;
                type: "CUSTOM_PATH";
            } | {
                type: "EXTERNAL";
                url: string;
                newTab: boolean;
            } | {
                type: "PAGE";
                id: string;
            } | null;
            style: "COMPACT" | "CLEAN" | "EDITORIAL";
            visibility: {
                startsAt: string | null;
                endsAt: string | null;
                devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
                locales: ("en" | "ar")[];
            };
            showViewAll: boolean;
            columns: {
                desktop: number;
                tablet: number;
                mobile: number;
            };
            analyticsKey: string;
            surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
            spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
            autoplay: boolean;
        } | {
            type: "CATEGORIES";
            limit: number;
            id: string;
            description: {
                en: string;
                ar: string;
            };
            label: string;
            width: "CONTENT" | "WIDE" | "FULL";
            enabled: boolean;
            categoryIds: string[];
            heading: {
                en: string;
                ar: string;
            };
            visibility: {
                startsAt: string | null;
                endsAt: string | null;
                devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
                locales: ("en" | "ar")[];
            };
            layout: "COMPACT" | "CARDS" | "EDITORIAL" | "IMAGE_TILES";
            analyticsKey: string;
            surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
            spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
            showChildren: boolean;
            showGrandchildren: boolean;
        } | {
            type: "BRANDS";
            limit: number;
            id: string;
            description: {
                en: string;
                ar: string;
            };
            label: string;
            width: "CONTENT" | "WIDE" | "FULL";
            enabled: boolean;
            brandIds: string[];
            heading: {
                en: string;
                ar: string;
            };
            visibility: {
                startsAt: string | null;
                endsAt: string | null;
                devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
                locales: ("en" | "ar")[];
            };
            mode: "MANUAL" | "FEATURED";
            layout: "LOGO_GRID" | "EDITORIAL" | "LOGO_RAIL";
            analyticsKey: string;
            surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
            spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
        } | {
            type: "PROMOTION";
            id: string;
            description: {
                en: string;
                ar: string;
            };
            label: string;
            width: "CONTENT" | "WIDE" | "FULL";
            promotionId: string;
            enabled: boolean;
            heading: {
                en: string;
                ar: string;
            };
            eyebrow: {
                en: string;
                ar: string;
            };
            ctaLabel: {
                en: string;
                ar: string;
            };
            destination: {
                type: "HOME";
            } | {
                type: "SHOP";
            } | {
                type: "OFFERS";
            } | {
                type: "NEW_ARRIVALS";
            } | {
                type: "ABOUT";
            } | {
                type: "CONTACT";
            } | {
                type: "CATEGORY";
                id: string;
            } | {
                type: "BRAND";
                id: string;
            } | {
                type: "PRODUCT";
                id: string;
            } | {
                type: "TAG";
                id: string;
            } | {
                path: string;
                type: "CUSTOM_PATH";
            } | {
                type: "EXTERNAL";
                url: string;
                newTab: boolean;
            } | {
                type: "PAGE";
                id: string;
            } | null;
            mediaAssetId: string | null;
            imageAlt: {
                en: string;
                ar: string;
            };
            style: "DARK" | "EDITORIAL" | "BANNER";
            visibility: {
                startsAt: string | null;
                endsAt: string | null;
                devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
                locales: ("en" | "ar")[];
            };
            analyticsKey: string;
            surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
            spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
            expiredBehavior: "HIDE" | "SHOW_EXPIRED";
        } | {
            type: "ROUTINE_CTA";
            id: string;
            description: {
                en: string;
                ar: string;
            };
            label: string;
            width: "CONTENT" | "WIDE" | "FULL";
            enabled: boolean;
            heading: {
                en: string;
                ar: string;
            };
            eyebrow: {
                en: string;
                ar: string;
            };
            ctaLabel: {
                en: string;
                ar: string;
            };
            destination: {
                type: "HOME";
            } | {
                type: "SHOP";
            } | {
                type: "OFFERS";
            } | {
                type: "NEW_ARRIVALS";
            } | {
                type: "ABOUT";
            } | {
                type: "CONTACT";
            } | {
                type: "CATEGORY";
                id: string;
            } | {
                type: "BRAND";
                id: string;
            } | {
                type: "PRODUCT";
                id: string;
            } | {
                type: "TAG";
                id: string;
            } | {
                path: string;
                type: "CUSTOM_PATH";
            } | {
                type: "EXTERNAL";
                url: string;
                newTab: boolean;
            } | {
                type: "PAGE";
                id: string;
            };
            mediaAssetId: string | null;
            imageAlt: {
                en: string;
                ar: string;
            };
            style: "COMPACT" | "DARK" | "EDITORIAL";
            visibility: {
                startsAt: string | null;
                endsAt: string | null;
                devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
                locales: ("en" | "ar")[];
            };
            analyticsKey: string;
            surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
            spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
        } | {
            type: "IMAGE_TEXT";
            id: string;
            label: string;
            width: "CONTENT" | "WIDE" | "FULL";
            enabled: boolean;
            heading: {
                en: string;
                ar: string;
            };
            eyebrow: {
                en: string;
                ar: string;
            };
            ctaLabel: {
                en: string;
                ar: string;
            };
            destination: {
                type: "HOME";
            } | {
                type: "SHOP";
            } | {
                type: "OFFERS";
            } | {
                type: "NEW_ARRIVALS";
            } | {
                type: "ABOUT";
            } | {
                type: "CONTACT";
            } | {
                type: "CATEGORY";
                id: string;
            } | {
                type: "BRAND";
                id: string;
            } | {
                type: "PRODUCT";
                id: string;
            } | {
                type: "TAG";
                id: string;
            } | {
                path: string;
                type: "CUSTOM_PATH";
            } | {
                type: "EXTERNAL";
                url: string;
                newTab: boolean;
            } | {
                type: "PAGE";
                id: string;
            } | null;
            mediaAssetId: string | null;
            imageAlt: {
                en: string;
                ar: string;
            };
            style: "EDITORIAL" | "CONTAINED" | "FULL_BLEED";
            visibility: {
                startsAt: string | null;
                endsAt: string | null;
                devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
                locales: ("en" | "ar")[];
            };
            analyticsKey: string;
            surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
            spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
            body: {
                en: string;
                ar: string;
            };
            imageSide: "START" | "END";
        } | {
            type: "PROMO_BANNER";
            id: string;
            description: {
                en: string;
                ar: string;
            };
            label: string;
            width: "CONTENT" | "WIDE" | "FULL";
            enabled: boolean;
            heading: {
                en: string;
                ar: string;
            };
            ctaLabel: {
                en: string;
                ar: string;
            };
            destination: {
                type: "HOME";
            } | {
                type: "SHOP";
            } | {
                type: "OFFERS";
            } | {
                type: "NEW_ARRIVALS";
            } | {
                type: "ABOUT";
            } | {
                type: "CONTACT";
            } | {
                type: "CATEGORY";
                id: string;
            } | {
                type: "BRAND";
                id: string;
            } | {
                type: "PRODUCT";
                id: string;
            } | {
                type: "TAG";
                id: string;
            } | {
                path: string;
                type: "CUSTOM_PATH";
            } | {
                type: "EXTERNAL";
                url: string;
                newTab: boolean;
            } | {
                type: "PAGE";
                id: string;
            } | null;
            mediaAssetId: string | null;
            imageAlt: {
                en: string;
                ar: string;
            };
            style: "IMAGE" | "SOFT" | "DARK" | "ACCENT";
            visibility: {
                startsAt: string | null;
                endsAt: string | null;
                devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
                locales: ("en" | "ar")[];
            };
            analyticsKey: string;
            surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
            spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
        } | {
            type: "COUNTDOWN";
            id: string;
            description: {
                en: string;
                ar: string;
            };
            label: string;
            width: "CONTENT" | "WIDE" | "FULL";
            enabled: boolean;
            endsAt: string;
            heading: {
                en: string;
                ar: string;
            };
            eyebrow: {
                en: string;
                ar: string;
            };
            visibility: {
                startsAt: string | null;
                endsAt: string | null;
                devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
                locales: ("en" | "ar")[];
            };
            analyticsKey: string;
            surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
            spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
            expiredBehavior: "HIDE" | "SHOW_EXPIRED";
            expiredMessage: {
                en: string;
                ar: string;
            };
        } | {
            type: "NEWSLETTER";
            id: string;
            description: {
                en: string;
                ar: string;
            };
            label: string;
            width: "CONTENT" | "WIDE" | "FULL";
            enabled: boolean;
            heading: {
                en: string;
                ar: string;
            };
            eyebrow: {
                en: string;
                ar: string;
            };
            style: "COMPACT" | "DARK" | "EDITORIAL";
            visibility: {
                startsAt: string | null;
                endsAt: string | null;
                devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
                locales: ("en" | "ar")[];
            };
            analyticsKey: string;
            surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
            spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
        } | {
            type: "FAQ";
            id: string;
            description: {
                en: string;
                ar: string;
            };
            label: string;
            width: "CONTENT" | "WIDE" | "FULL";
            items: {
                id: string;
                question: {
                    en: string;
                    ar: string;
                };
                answer: {
                    en: string;
                    ar: string;
                };
            }[];
            enabled: boolean;
            heading: {
                en: string;
                ar: string;
            };
            visibility: {
                startsAt: string | null;
                endsAt: string | null;
                devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
                locales: ("en" | "ar")[];
            };
            analyticsKey: string;
            surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
            spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
        } | {
            type: "SPACER";
            id: string;
            label: string;
            width: "CONTENT" | "WIDE" | "FULL";
            enabled: boolean;
            visibility: {
                startsAt: string | null;
                endsAt: string | null;
                devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
                locales: ("en" | "ar")[];
            };
            size: "SMALL" | "MEDIUM" | "LARGE";
            analyticsKey: string;
            surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
            spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
        } | {
            type: "DIVIDER";
            id: string;
            label: string;
            width: "CONTENT" | "WIDE" | "FULL";
            enabled: boolean;
            visibility: {
                startsAt: string | null;
                endsAt: string | null;
                devices: ("DESKTOP" | "TABLET" | "MOBILE")[];
                locales: ("en" | "ar")[];
            };
            analyticsKey: string;
            surface: "DEFAULT" | "SOFT" | "DARK" | "ACCENT";
            spacing: "NONE" | "SMALL" | "MEDIUM" | "LARGE";
        })[];
    };
}, {
    name: string;
    slug: string;
    expectedRevision: number;
    config: {
        title: {
            en?: string | undefined;
            ar?: string | undefined;
        };
        schemaVersion: 1;
        seo: {
            description: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            title: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            canonicalPath?: string | null | undefined;
            openGraphMediaId?: string | null | undefined;
            indexable?: boolean | undefined;
        };
        sections: ({
            type: "HERO";
            id: string;
            description: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            label: string;
            heading: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            eyebrow: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            imageAlt: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            visibility: {
                startsAt?: string | null | undefined;
                endsAt?: string | null | undefined;
                devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
                locales?: ("en" | "ar")[] | undefined;
            };
            primaryCtaLabel: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            secondaryCtaLabel: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            analyticsKey: string;
            width?: "CONTENT" | "WIDE" | "FULL" | undefined;
            enabled?: boolean | undefined;
            alignment?: "START" | "CENTER" | "END" | undefined;
            desktopMediaId?: string | null | undefined;
            mobileMediaId?: string | null | undefined;
            primaryDestination?: {
                type: "HOME";
            } | {
                type: "SHOP";
            } | {
                type: "OFFERS";
            } | {
                type: "NEW_ARRIVALS";
            } | {
                type: "ABOUT";
            } | {
                type: "CONTACT";
            } | {
                type: "CATEGORY";
                id: string;
            } | {
                type: "BRAND";
                id: string;
            } | {
                type: "PRODUCT";
                id: string;
            } | {
                type: "TAG";
                id: string;
            } | {
                path: string;
                type: "CUSTOM_PATH";
            } | {
                type: "EXTERNAL";
                url: string;
                newTab?: boolean | undefined;
            } | {
                type: "PAGE";
                id: string;
            } | null | undefined;
            secondaryDestination?: {
                type: "HOME";
            } | {
                type: "SHOP";
            } | {
                type: "OFFERS";
            } | {
                type: "NEW_ARRIVALS";
            } | {
                type: "ABOUT";
            } | {
                type: "CONTACT";
            } | {
                type: "CATEGORY";
                id: string;
            } | {
                type: "BRAND";
                id: string;
            } | {
                type: "PRODUCT";
                id: string;
            } | {
                type: "TAG";
                id: string;
            } | {
                path: string;
                type: "CUSTOM_PATH";
            } | {
                type: "EXTERNAL";
                url: string;
                newTab?: boolean | undefined;
            } | {
                type: "PAGE";
                id: string;
            } | null | undefined;
            layout?: "SPLIT" | "FULL" | "CONTAINED" | undefined;
            contentPosition?: "CENTER" | "TOP" | "BOTTOM" | undefined;
            overlay?: "NONE" | "MEDIUM" | "LIGHT" | "STRONG" | undefined;
            headingLevel?: "H1" | "H2" | undefined;
            surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
            spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
        } | {
            type: "PRODUCT_GRID";
            id: string;
            description: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            label: string;
            source: {
                mode: "MANUAL";
                productIds?: string[] | undefined;
            } | {
                mode: "CATEGORY";
                referenceId: string;
            } | {
                mode: "BRAND";
                referenceId: string;
            } | {
                mode: "TAG";
                referenceId: string;
            } | {
                mode: "PROMOTION";
                referenceId: string;
            } | {
                mode: "NEWEST";
            } | {
                mode: "FEATURED";
            };
            heading: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            viewAllLabel: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            visibility: {
                startsAt?: string | null | undefined;
                endsAt?: string | null | undefined;
                devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
                locales?: ("en" | "ar")[] | undefined;
            };
            columns: {
                desktop?: number | undefined;
                tablet?: number | undefined;
                mobile?: number | undefined;
            };
            analyticsKey: string;
            limit?: number | undefined;
            width?: "CONTENT" | "WIDE" | "FULL" | undefined;
            enabled?: boolean | undefined;
            destination?: {
                type: "HOME";
            } | {
                type: "SHOP";
            } | {
                type: "OFFERS";
            } | {
                type: "NEW_ARRIVALS";
            } | {
                type: "ABOUT";
            } | {
                type: "CONTACT";
            } | {
                type: "CATEGORY";
                id: string;
            } | {
                type: "BRAND";
                id: string;
            } | {
                type: "PRODUCT";
                id: string;
            } | {
                type: "TAG";
                id: string;
            } | {
                path: string;
                type: "CUSTOM_PATH";
            } | {
                type: "EXTERNAL";
                url: string;
                newTab?: boolean | undefined;
            } | {
                type: "PAGE";
                id: string;
            } | null | undefined;
            style?: "COMPACT" | "CLEAN" | "EDITORIAL" | undefined;
            showViewAll?: boolean | undefined;
            surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
            spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
        } | {
            type: "PRODUCT_CAROUSEL";
            id: string;
            description: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            label: string;
            source: {
                mode: "MANUAL";
                productIds?: string[] | undefined;
            } | {
                mode: "CATEGORY";
                referenceId: string;
            } | {
                mode: "BRAND";
                referenceId: string;
            } | {
                mode: "TAG";
                referenceId: string;
            } | {
                mode: "PROMOTION";
                referenceId: string;
            } | {
                mode: "NEWEST";
            } | {
                mode: "FEATURED";
            };
            heading: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            viewAllLabel: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            visibility: {
                startsAt?: string | null | undefined;
                endsAt?: string | null | undefined;
                devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
                locales?: ("en" | "ar")[] | undefined;
            };
            columns: {
                desktop?: number | undefined;
                tablet?: number | undefined;
                mobile?: number | undefined;
            };
            analyticsKey: string;
            limit?: number | undefined;
            width?: "CONTENT" | "WIDE" | "FULL" | undefined;
            enabled?: boolean | undefined;
            destination?: {
                type: "HOME";
            } | {
                type: "SHOP";
            } | {
                type: "OFFERS";
            } | {
                type: "NEW_ARRIVALS";
            } | {
                type: "ABOUT";
            } | {
                type: "CONTACT";
            } | {
                type: "CATEGORY";
                id: string;
            } | {
                type: "BRAND";
                id: string;
            } | {
                type: "PRODUCT";
                id: string;
            } | {
                type: "TAG";
                id: string;
            } | {
                path: string;
                type: "CUSTOM_PATH";
            } | {
                type: "EXTERNAL";
                url: string;
                newTab?: boolean | undefined;
            } | {
                type: "PAGE";
                id: string;
            } | null | undefined;
            style?: "COMPACT" | "CLEAN" | "EDITORIAL" | undefined;
            showViewAll?: boolean | undefined;
            surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
            spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
            autoplay?: boolean | undefined;
        } | {
            type: "CATEGORIES";
            id: string;
            description: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            label: string;
            heading: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            visibility: {
                startsAt?: string | null | undefined;
                endsAt?: string | null | undefined;
                devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
                locales?: ("en" | "ar")[] | undefined;
            };
            analyticsKey: string;
            limit?: number | undefined;
            width?: "CONTENT" | "WIDE" | "FULL" | undefined;
            enabled?: boolean | undefined;
            categoryIds?: string[] | undefined;
            layout?: "COMPACT" | "CARDS" | "EDITORIAL" | "IMAGE_TILES" | undefined;
            surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
            spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
            showChildren?: boolean | undefined;
            showGrandchildren?: boolean | undefined;
        } | {
            type: "BRANDS";
            id: string;
            description: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            label: string;
            heading: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            visibility: {
                startsAt?: string | null | undefined;
                endsAt?: string | null | undefined;
                devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
                locales?: ("en" | "ar")[] | undefined;
            };
            analyticsKey: string;
            limit?: number | undefined;
            width?: "CONTENT" | "WIDE" | "FULL" | undefined;
            enabled?: boolean | undefined;
            brandIds?: string[] | undefined;
            mode?: "MANUAL" | "FEATURED" | undefined;
            layout?: "LOGO_GRID" | "EDITORIAL" | "LOGO_RAIL" | undefined;
            surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
            spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
        } | {
            type: "PROMOTION";
            id: string;
            description: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            label: string;
            promotionId: string;
            heading: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            eyebrow: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            ctaLabel: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            imageAlt: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            visibility: {
                startsAt?: string | null | undefined;
                endsAt?: string | null | undefined;
                devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
                locales?: ("en" | "ar")[] | undefined;
            };
            analyticsKey: string;
            width?: "CONTENT" | "WIDE" | "FULL" | undefined;
            enabled?: boolean | undefined;
            destination?: {
                type: "HOME";
            } | {
                type: "SHOP";
            } | {
                type: "OFFERS";
            } | {
                type: "NEW_ARRIVALS";
            } | {
                type: "ABOUT";
            } | {
                type: "CONTACT";
            } | {
                type: "CATEGORY";
                id: string;
            } | {
                type: "BRAND";
                id: string;
            } | {
                type: "PRODUCT";
                id: string;
            } | {
                type: "TAG";
                id: string;
            } | {
                path: string;
                type: "CUSTOM_PATH";
            } | {
                type: "EXTERNAL";
                url: string;
                newTab?: boolean | undefined;
            } | {
                type: "PAGE";
                id: string;
            } | null | undefined;
            mediaAssetId?: string | null | undefined;
            style?: "DARK" | "EDITORIAL" | "BANNER" | undefined;
            surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
            spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
            expiredBehavior?: "HIDE" | "SHOW_EXPIRED" | undefined;
        } | {
            type: "ROUTINE_CTA";
            id: string;
            description: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            label: string;
            heading: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            eyebrow: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            ctaLabel: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            imageAlt: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            visibility: {
                startsAt?: string | null | undefined;
                endsAt?: string | null | undefined;
                devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
                locales?: ("en" | "ar")[] | undefined;
            };
            analyticsKey: string;
            width?: "CONTENT" | "WIDE" | "FULL" | undefined;
            enabled?: boolean | undefined;
            destination?: {
                type: "HOME";
            } | {
                type: "SHOP";
            } | {
                type: "OFFERS";
            } | {
                type: "NEW_ARRIVALS";
            } | {
                type: "ABOUT";
            } | {
                type: "CONTACT";
            } | {
                type: "CATEGORY";
                id: string;
            } | {
                type: "BRAND";
                id: string;
            } | {
                type: "PRODUCT";
                id: string;
            } | {
                type: "TAG";
                id: string;
            } | {
                path: string;
                type: "CUSTOM_PATH";
            } | {
                type: "EXTERNAL";
                url: string;
                newTab?: boolean | undefined;
            } | {
                type: "PAGE";
                id: string;
            } | undefined;
            mediaAssetId?: string | null | undefined;
            style?: "COMPACT" | "DARK" | "EDITORIAL" | undefined;
            surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
            spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
        } | {
            type: "IMAGE_TEXT";
            id: string;
            label: string;
            heading: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            eyebrow: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            ctaLabel: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            imageAlt: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            visibility: {
                startsAt?: string | null | undefined;
                endsAt?: string | null | undefined;
                devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
                locales?: ("en" | "ar")[] | undefined;
            };
            analyticsKey: string;
            body: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            width?: "CONTENT" | "WIDE" | "FULL" | undefined;
            enabled?: boolean | undefined;
            destination?: {
                type: "HOME";
            } | {
                type: "SHOP";
            } | {
                type: "OFFERS";
            } | {
                type: "NEW_ARRIVALS";
            } | {
                type: "ABOUT";
            } | {
                type: "CONTACT";
            } | {
                type: "CATEGORY";
                id: string;
            } | {
                type: "BRAND";
                id: string;
            } | {
                type: "PRODUCT";
                id: string;
            } | {
                type: "TAG";
                id: string;
            } | {
                path: string;
                type: "CUSTOM_PATH";
            } | {
                type: "EXTERNAL";
                url: string;
                newTab?: boolean | undefined;
            } | {
                type: "PAGE";
                id: string;
            } | null | undefined;
            mediaAssetId?: string | null | undefined;
            style?: "EDITORIAL" | "CONTAINED" | "FULL_BLEED" | undefined;
            surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
            spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
            imageSide?: "START" | "END" | undefined;
        } | {
            type: "PROMO_BANNER";
            id: string;
            description: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            label: string;
            heading: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            ctaLabel: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            imageAlt: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            visibility: {
                startsAt?: string | null | undefined;
                endsAt?: string | null | undefined;
                devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
                locales?: ("en" | "ar")[] | undefined;
            };
            analyticsKey: string;
            width?: "CONTENT" | "WIDE" | "FULL" | undefined;
            enabled?: boolean | undefined;
            destination?: {
                type: "HOME";
            } | {
                type: "SHOP";
            } | {
                type: "OFFERS";
            } | {
                type: "NEW_ARRIVALS";
            } | {
                type: "ABOUT";
            } | {
                type: "CONTACT";
            } | {
                type: "CATEGORY";
                id: string;
            } | {
                type: "BRAND";
                id: string;
            } | {
                type: "PRODUCT";
                id: string;
            } | {
                type: "TAG";
                id: string;
            } | {
                path: string;
                type: "CUSTOM_PATH";
            } | {
                type: "EXTERNAL";
                url: string;
                newTab?: boolean | undefined;
            } | {
                type: "PAGE";
                id: string;
            } | null | undefined;
            mediaAssetId?: string | null | undefined;
            style?: "IMAGE" | "SOFT" | "DARK" | "ACCENT" | undefined;
            surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
            spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
        } | {
            type: "COUNTDOWN";
            id: string;
            description: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            label: string;
            endsAt: string;
            heading: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            eyebrow: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            visibility: {
                startsAt?: string | null | undefined;
                endsAt?: string | null | undefined;
                devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
                locales?: ("en" | "ar")[] | undefined;
            };
            analyticsKey: string;
            expiredMessage: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            width?: "CONTENT" | "WIDE" | "FULL" | undefined;
            enabled?: boolean | undefined;
            surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
            spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
            expiredBehavior?: "HIDE" | "SHOW_EXPIRED" | undefined;
        } | {
            type: "NEWSLETTER";
            id: string;
            description: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            label: string;
            heading: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            eyebrow: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            visibility: {
                startsAt?: string | null | undefined;
                endsAt?: string | null | undefined;
                devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
                locales?: ("en" | "ar")[] | undefined;
            };
            analyticsKey: string;
            width?: "CONTENT" | "WIDE" | "FULL" | undefined;
            enabled?: boolean | undefined;
            style?: "COMPACT" | "DARK" | "EDITORIAL" | undefined;
            surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
            spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
        } | {
            type: "FAQ";
            id: string;
            description: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            label: string;
            heading: {
                en?: string | undefined;
                ar?: string | undefined;
            };
            visibility: {
                startsAt?: string | null | undefined;
                endsAt?: string | null | undefined;
                devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
                locales?: ("en" | "ar")[] | undefined;
            };
            analyticsKey: string;
            width?: "CONTENT" | "WIDE" | "FULL" | undefined;
            items?: {
                id: string;
                question: {
                    en?: string | undefined;
                    ar?: string | undefined;
                };
                answer: {
                    en?: string | undefined;
                    ar?: string | undefined;
                };
            }[] | undefined;
            enabled?: boolean | undefined;
            surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
            spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
        } | {
            type: "SPACER";
            id: string;
            label: string;
            visibility: {
                startsAt?: string | null | undefined;
                endsAt?: string | null | undefined;
                devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
                locales?: ("en" | "ar")[] | undefined;
            };
            analyticsKey: string;
            width?: "CONTENT" | "WIDE" | "FULL" | undefined;
            enabled?: boolean | undefined;
            size?: "SMALL" | "MEDIUM" | "LARGE" | undefined;
            surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
            spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
        } | {
            type: "DIVIDER";
            id: string;
            label: string;
            visibility: {
                startsAt?: string | null | undefined;
                endsAt?: string | null | undefined;
                devices?: ("DESKTOP" | "TABLET" | "MOBILE")[] | undefined;
                locales?: ("en" | "ar")[] | undefined;
            };
            analyticsKey: string;
            width?: "CONTENT" | "WIDE" | "FULL" | undefined;
            enabled?: boolean | undefined;
            surface?: "DEFAULT" | "SOFT" | "DARK" | "ACCENT" | undefined;
            spacing?: "NONE" | "SMALL" | "MEDIUM" | "LARGE" | undefined;
        })[];
    };
}>;
export type UpdateLandingPageDraftInput = z.infer<typeof updateLandingPageDraftSchema>;
export declare const landingPageRevisionActionSchema: z.ZodObject<{
    expectedRevision: z.ZodNumber;
}, "strict", z.ZodTypeAny, {
    expectedRevision: number;
}, {
    expectedRevision: number;
}>;
export declare const scheduleLandingPageSchema: z.ZodEffects<z.ZodObject<{
    expectedRevision: z.ZodNumber;
} & {
    publishAt: z.ZodString;
    unpublishAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
}, "strict", z.ZodTypeAny, {
    expectedRevision: number;
    publishAt: string;
    unpublishAt: string | null;
}, {
    expectedRevision: number;
    publishAt: string;
    unpublishAt?: string | null | undefined;
}>, {
    expectedRevision: number;
    publishAt: string;
    unpublishAt: string | null;
}, {
    expectedRevision: number;
    publishAt: string;
    unpublishAt?: string | null | undefined;
}>;
export type ScheduleLandingPageInput = z.infer<typeof scheduleLandingPageSchema>;
export declare const duplicateLandingPageSchema: z.ZodObject<{
    name: z.ZodString;
    slug: z.ZodString;
}, "strict", z.ZodTypeAny, {
    name: string;
    slug: string;
}, {
    name: string;
    slug: string;
}>;
export declare const landingPageListQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    sortBy: z.ZodOptional<z.ZodString>;
    sortOrder: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
} & {
    search: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<["DRAFT", "SCHEDULED", "PUBLISHED", "ARCHIVED"]>>;
    type: z.ZodOptional<z.ZodEnum<["HOMEPAGE", "CAMPAIGN", "BRAND", "CATEGORY", "OFFER", "SEASONAL", "COLLECTION", "CUSTOM"]>>;
}, "strip", z.ZodTypeAny, {
    page: number;
    limit: number;
    sortOrder: "asc" | "desc";
    type?: "CATEGORY" | "BRAND" | "HOMEPAGE" | "CAMPAIGN" | "OFFER" | "SEASONAL" | "COLLECTION" | "CUSTOM" | undefined;
    status?: "ARCHIVED" | "DRAFT" | "PUBLISHED" | "SCHEDULED" | undefined;
    sortBy?: string | undefined;
    search?: string | undefined;
}, {
    type?: "CATEGORY" | "BRAND" | "HOMEPAGE" | "CAMPAIGN" | "OFFER" | "SEASONAL" | "COLLECTION" | "CUSTOM" | undefined;
    status?: "ARCHIVED" | "DRAFT" | "PUBLISHED" | "SCHEDULED" | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sortBy?: string | undefined;
    sortOrder?: "asc" | "desc" | undefined;
    search?: string | undefined;
}>;
export type LandingPageListQuery = z.infer<typeof landingPageListQuerySchema>;
export declare const landingPageEntityTypeSchema: z.ZodEnum<["PRODUCT", "CATEGORY", "BRAND", "TAG", "MEDIA", "PROMOTION", "PAGE"]>;
export declare const landingPageEntityQuerySchema: z.ZodObject<{
    type: z.ZodEnum<["PRODUCT", "CATEGORY", "BRAND", "TAG", "MEDIA", "PROMOTION", "PAGE"]>;
    search: z.ZodOptional<z.ZodString>;
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    type: "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "MEDIA" | "PAGE" | "PROMOTION";
    page: number;
    limit: number;
    search?: string | undefined;
}, {
    type: "CATEGORY" | "BRAND" | "PRODUCT" | "TAG" | "MEDIA" | "PAGE" | "PROMOTION";
    page?: number | undefined;
    limit?: number | undefined;
    search?: string | undefined;
}>;
export type LandingPageEntityQuery = z.infer<typeof landingPageEntityQuerySchema>;
export type LandingPageValidationIssue = {
    level: "ERROR" | "WARNING";
    code: string;
    message: string;
    path: string;
    entityId?: string;
};
export type LandingPageVersionSummary = {
    id: string;
    revision: number;
    publishedAt: string;
    publishedBy: {
        id: string;
        name: string;
    } | null;
};
export type LandingPageListItem = {
    id: string;
    name: string;
    slug: string;
    type: LandingPageType;
    status: LandingPageStatus;
    draftRevision: number;
    sectionCount: number;
    updatedAt: string;
    updatedBy: {
        id: string;
        name: string;
    } | null;
    publishedVersion: LandingPageVersionSummary | null;
    scheduledAt: string | null;
    unpublishAt: string | null;
};
export type LandingPageAdminState = LandingPageListItem & {
    draftConfig: LandingPageConfig;
    hasUnpublishedChanges: boolean;
    versions: LandingPageVersionSummary[];
    scheduledVersion: LandingPageVersionSummary | null;
    issues: LandingPageValidationIssue[];
};
export type LandingPageTemplate = {
    key: LandingPageTemplateKey;
    name: string;
    description: string;
    sectionTypes: LandingPageSection["type"][];
    recommendedType: LandingPageType;
};
export type LandingPageResolvedEntity = {
    kind: z.infer<typeof landingPageEntityTypeSchema>;
    id: string;
    labelEn: string;
    labelAr: string;
    slug?: string;
    href?: string;
    imageUrl?: string | null;
    parentId?: string | null;
    pathEn?: string;
    pathAr?: string;
};
export type LandingPagePublicSnapshot = {
    pageId: string;
    slug: string;
    type: LandingPageType;
    revisionId: string;
    revision: number;
    publishedAt: string;
    /** Server-resolved clock used for hydration-stable visibility and countdown output. */
    resolvedAt: string;
    preview: boolean;
    config: LandingPageConfig;
    entities: Record<string, LandingPageResolvedEntity[]>;
    products: Record<string, unknown[]>;
    media: Record<string, {
        id: string;
        url: string;
        width: number;
        height: number;
        altText: string | null;
    }>;
    links: Record<string, string>;
};
export declare const landingPageListResponseSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodType<LandingPageListItem, z.ZodTypeDef, LandingPageListItem>, "many">;
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
    data: LandingPageListItem[];
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    };
}, {
    data: LandingPageListItem[];
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    };
}>;
export {};
//# sourceMappingURL=page-builder.schema.d.ts.map