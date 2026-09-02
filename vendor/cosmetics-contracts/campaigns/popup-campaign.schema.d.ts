import { z } from "zod";
export declare const popupCampaignTypeSchema: z.ZodEnum<["PROMOTIONAL", "DISCOUNT", "NEWSLETTER", "WELCOME", "FIRST_ORDER", "EXIT_INTENT", "ANNOUNCEMENT", "PRODUCT_RECOMMENDATION", "CART_REMINDER", "FREE_SHIPPING", "LIMITED_TIME_SALE", "PRODUCT_LAUNCH", "RESTOCK", "PRODUCT_SPECIFIC", "CATEGORY_SPECIFIC", "CROSS_SELL", "ACCOUNT_ENCOURAGEMENT", "LOGIN_REMINDER", "LOYALTY_VIP", "RETURNING_CUSTOMER", "NEW_VISITOR", "ORDER_UPDATE", "STORE_PICKUP", "DELIVERY_NOTICE", "SYSTEM_NOTICE", "MAINTENANCE", "SEASONAL", "CUSTOM"]>;
export type PopupCampaignType = z.infer<typeof popupCampaignTypeSchema>;
export declare const popupCampaignStateSchema: z.ZodEnum<["DRAFT", "ACTIVE", "PAUSED", "ARCHIVED"]>;
export declare const popupCampaignStatusSchema: z.ZodEnum<["DRAFT", "SCHEDULED", "ACTIVE", "PAUSED", "ENDED", "ARCHIVED"]>;
export type PopupCampaignStatus = z.infer<typeof popupCampaignStatusSchema>;
export declare const popupPresentationModeSchema: z.ZodEnum<["CENTER_MODAL", "BOTTOM_SHEET", "FLOATING_RIGHT", "FLOATING_LEFT", "TOP_BANNER", "BOTTOM_BANNER", "FULLSCREEN", "SIDE_PANEL_RIGHT", "SIDE_PANEL_LEFT", "SLIDE_IN_RIGHT", "SLIDE_IN_LEFT", "PROMO_TOAST", "ANNOUNCEMENT_BAR"]>;
export type PopupPresentationMode = z.infer<typeof popupPresentationModeSchema>;
export declare const popupPresentationSchema: z.ZodDefault<z.ZodObject<{
    desktop: z.ZodDefault<z.ZodEnum<["CENTER_MODAL", "BOTTOM_SHEET", "FLOATING_RIGHT", "FLOATING_LEFT", "TOP_BANNER", "BOTTOM_BANNER", "FULLSCREEN", "SIDE_PANEL_RIGHT", "SIDE_PANEL_LEFT", "SLIDE_IN_RIGHT", "SLIDE_IN_LEFT", "PROMO_TOAST", "ANNOUNCEMENT_BAR"]>>;
    tablet: z.ZodDefault<z.ZodEnum<["CENTER_MODAL", "BOTTOM_SHEET", "FLOATING_RIGHT", "FLOATING_LEFT", "TOP_BANNER", "BOTTOM_BANNER", "FULLSCREEN", "SIDE_PANEL_RIGHT", "SIDE_PANEL_LEFT", "SLIDE_IN_RIGHT", "SLIDE_IN_LEFT", "PROMO_TOAST", "ANNOUNCEMENT_BAR"]>>;
    mobile: z.ZodDefault<z.ZodEnum<["CENTER_MODAL", "BOTTOM_SHEET", "FLOATING_RIGHT", "FLOATING_LEFT", "TOP_BANNER", "BOTTOM_BANNER", "FULLSCREEN", "SIDE_PANEL_RIGHT", "SIDE_PANEL_LEFT", "SLIDE_IN_RIGHT", "SLIDE_IN_LEFT", "PROMO_TOAST", "ANNOUNCEMENT_BAR"]>>;
    dismissible: z.ZodDefault<z.ZodBoolean>;
    closeOnOverlay: z.ZodDefault<z.ZodBoolean>;
    closeOnEscape: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    tablet: "CENTER_MODAL" | "BOTTOM_SHEET" | "FLOATING_RIGHT" | "FLOATING_LEFT" | "TOP_BANNER" | "BOTTOM_BANNER" | "FULLSCREEN" | "SIDE_PANEL_RIGHT" | "SIDE_PANEL_LEFT" | "SLIDE_IN_RIGHT" | "SLIDE_IN_LEFT" | "PROMO_TOAST" | "ANNOUNCEMENT_BAR";
    mobile: "CENTER_MODAL" | "BOTTOM_SHEET" | "FLOATING_RIGHT" | "FLOATING_LEFT" | "TOP_BANNER" | "BOTTOM_BANNER" | "FULLSCREEN" | "SIDE_PANEL_RIGHT" | "SIDE_PANEL_LEFT" | "SLIDE_IN_RIGHT" | "SLIDE_IN_LEFT" | "PROMO_TOAST" | "ANNOUNCEMENT_BAR";
    desktop: "CENTER_MODAL" | "BOTTOM_SHEET" | "FLOATING_RIGHT" | "FLOATING_LEFT" | "TOP_BANNER" | "BOTTOM_BANNER" | "FULLSCREEN" | "SIDE_PANEL_RIGHT" | "SIDE_PANEL_LEFT" | "SLIDE_IN_RIGHT" | "SLIDE_IN_LEFT" | "PROMO_TOAST" | "ANNOUNCEMENT_BAR";
    dismissible: boolean;
    closeOnOverlay: boolean;
    closeOnEscape: boolean;
}, {
    tablet?: "CENTER_MODAL" | "BOTTOM_SHEET" | "FLOATING_RIGHT" | "FLOATING_LEFT" | "TOP_BANNER" | "BOTTOM_BANNER" | "FULLSCREEN" | "SIDE_PANEL_RIGHT" | "SIDE_PANEL_LEFT" | "SLIDE_IN_RIGHT" | "SLIDE_IN_LEFT" | "PROMO_TOAST" | "ANNOUNCEMENT_BAR" | undefined;
    mobile?: "CENTER_MODAL" | "BOTTOM_SHEET" | "FLOATING_RIGHT" | "FLOATING_LEFT" | "TOP_BANNER" | "BOTTOM_BANNER" | "FULLSCREEN" | "SIDE_PANEL_RIGHT" | "SIDE_PANEL_LEFT" | "SLIDE_IN_RIGHT" | "SLIDE_IN_LEFT" | "PROMO_TOAST" | "ANNOUNCEMENT_BAR" | undefined;
    desktop?: "CENTER_MODAL" | "BOTTOM_SHEET" | "FLOATING_RIGHT" | "FLOATING_LEFT" | "TOP_BANNER" | "BOTTOM_BANNER" | "FULLSCREEN" | "SIDE_PANEL_RIGHT" | "SIDE_PANEL_LEFT" | "SLIDE_IN_RIGHT" | "SLIDE_IN_LEFT" | "PROMO_TOAST" | "ANNOUNCEMENT_BAR" | undefined;
    dismissible?: boolean | undefined;
    closeOnOverlay?: boolean | undefined;
    closeOnEscape?: boolean | undefined;
}>>;
export declare const popupAppearanceSchema: z.ZodDefault<z.ZodObject<{
    theme: z.ZodDefault<z.ZodEnum<["IVORY", "INK", "SAGE", "BLUSH", "GOLD", "BRAND"]>>;
    icon: z.ZodDefault<z.ZodEnum<["NONE", "SPARKLE", "GIFT", "MEGAPHONE", "TRUCK", "HEART", "BELL"]>>;
    layout: z.ZodDefault<z.ZodEnum<["TEXT_ONLY", "SPLIT", "IMAGE_TOP", "IMAGE_BACKGROUND"]>>;
    width: z.ZodDefault<z.ZodEnum<["COMPACT", "STANDARD", "WIDE"]>>;
    maxWidth: z.ZodDefault<z.ZodNumber>;
    spacing: z.ZodDefault<z.ZodEnum<["COMPACT", "COMFORTABLE", "AIRY"]>>;
    alignment: z.ZodDefault<z.ZodEnum<["START", "CENTER"]>>;
    imagePosition: z.ZodDefault<z.ZodEnum<["START", "END", "TOP", "BACKGROUND"]>>;
    borderRadius: z.ZodDefault<z.ZodEnum<["NONE", "SUBTLE", "SOFT", "ROUNDED"]>>;
    overlayOpacity: z.ZodDefault<z.ZodNumber>;
    buttonStyle: z.ZodDefault<z.ZodEnum<["SOLID", "OUTLINE", "UNDERLINE"]>>;
    surface: z.ZodDefault<z.ZodEnum<["SOLID", "TINTED", "GLASS"]>>;
    animation: z.ZodDefault<z.ZodEnum<["FADE", "LIFT", "SCALE", "SLIDE", "NONE"]>>;
    accentColor: z.ZodDefault<z.ZodNullable<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    width: "STANDARD" | "COMPACT" | "WIDE";
    alignment: "START" | "CENTER";
    icon: "NONE" | "TRUCK" | "SPARKLE" | "GIFT" | "MEGAPHONE" | "HEART" | "BELL";
    spacing: "COMPACT" | "COMFORTABLE" | "AIRY";
    layout: "IMAGE_TOP" | "SPLIT" | "TEXT_ONLY" | "IMAGE_BACKGROUND";
    animation: "NONE" | "SCALE" | "FADE" | "SLIDE" | "LIFT";
    overlayOpacity: number;
    surface: "SOLID" | "TINTED" | "GLASS";
    borderRadius: "NONE" | "SUBTLE" | "SOFT" | "ROUNDED";
    theme: "BRAND" | "IVORY" | "INK" | "SAGE" | "BLUSH" | "GOLD";
    maxWidth: number;
    imagePosition: "START" | "END" | "TOP" | "BACKGROUND";
    buttonStyle: "OUTLINE" | "SOLID" | "UNDERLINE";
    accentColor: string | null;
}, {
    width?: "STANDARD" | "COMPACT" | "WIDE" | undefined;
    alignment?: "START" | "CENTER" | undefined;
    icon?: "NONE" | "TRUCK" | "SPARKLE" | "GIFT" | "MEGAPHONE" | "HEART" | "BELL" | undefined;
    spacing?: "COMPACT" | "COMFORTABLE" | "AIRY" | undefined;
    layout?: "IMAGE_TOP" | "SPLIT" | "TEXT_ONLY" | "IMAGE_BACKGROUND" | undefined;
    animation?: "NONE" | "SCALE" | "FADE" | "SLIDE" | "LIFT" | undefined;
    overlayOpacity?: number | undefined;
    surface?: "SOLID" | "TINTED" | "GLASS" | undefined;
    borderRadius?: "NONE" | "SUBTLE" | "SOFT" | "ROUNDED" | undefined;
    theme?: "BRAND" | "IVORY" | "INK" | "SAGE" | "BLUSH" | "GOLD" | undefined;
    maxWidth?: number | undefined;
    imagePosition?: "START" | "END" | "TOP" | "BACKGROUND" | undefined;
    buttonStyle?: "OUTLINE" | "SOLID" | "UNDERLINE" | undefined;
    accentColor?: string | null | undefined;
}>>;
export type PopupAppearance = z.infer<typeof popupAppearanceSchema>;
export declare const popupLocaleContentSchema: z.ZodObject<{
    locale: z.ZodEnum<["en", "ar"]>;
    eyebrow: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    badge: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    headline: z.ZodString;
    subtitle: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    body: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    imageAlt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    primaryCtaLabel: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    secondaryCtaLabel: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    disclaimer: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    successHeadline: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    successBody: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    nameLabel: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    emailLabel: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    phoneLabel: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    submitLabel: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    consentLabel: z.ZodDefault<z.ZodNullable<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    eyebrow: string | null;
    imageAlt: string | null;
    disclaimer: string | null;
    locale: "en" | "ar";
    body: string | null;
    primaryCtaLabel: string | null;
    secondaryCtaLabel: string | null;
    badge: string | null;
    headline: string;
    subtitle: string | null;
    successHeadline: string | null;
    successBody: string | null;
    nameLabel: string | null;
    emailLabel: string | null;
    phoneLabel: string | null;
    submitLabel: string | null;
    consentLabel: string | null;
}, {
    locale: "en" | "ar";
    headline: string;
    eyebrow?: string | null | undefined;
    imageAlt?: string | null | undefined;
    disclaimer?: string | null | undefined;
    body?: string | null | undefined;
    primaryCtaLabel?: string | null | undefined;
    secondaryCtaLabel?: string | null | undefined;
    badge?: string | null | undefined;
    subtitle?: string | null | undefined;
    successHeadline?: string | null | undefined;
    successBody?: string | null | undefined;
    nameLabel?: string | null | undefined;
    emailLabel?: string | null | undefined;
    phoneLabel?: string | null | undefined;
    submitLabel?: string | null | undefined;
    consentLabel?: string | null | undefined;
}>;
export type PopupLocaleContent = z.infer<typeof popupLocaleContentSchema>;
export declare const popupActionSchema: z.ZodDefault<z.ZodObject<{
    type: z.ZodDefault<z.ZodEnum<["NONE", "NAVIGATE", "APPLY_COUPON", "COPY_COUPON", "CLOSE", "SUBMIT_FORM"]>>;
    destination: z.ZodDefault<z.ZodNullable<z.ZodEnum<["URL", "PRODUCT", "CATEGORY", "CART", "ACCOUNT", "HOME"]>>>;
    url: z.ZodDefault<z.ZodNullable<z.ZodEffects<z.ZodString, string, string>>>;
    productId: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    categoryId: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    couponId: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    openInNewTab: z.ZodDefault<z.ZodBoolean>;
    closeAfterAction: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    type: "NONE" | "NAVIGATE" | "APPLY_COUPON" | "COPY_COUPON" | "CLOSE" | "SUBMIT_FORM";
    productId: string | null;
    url: string | null;
    categoryId: string | null;
    destination: "HOME" | "CATEGORY" | "PRODUCT" | "CART" | "ACCOUNT" | "URL" | null;
    openInNewTab: boolean;
    couponId: string | null;
    closeAfterAction: boolean;
}, {
    type?: "NONE" | "NAVIGATE" | "APPLY_COUPON" | "COPY_COUPON" | "CLOSE" | "SUBMIT_FORM" | undefined;
    productId?: string | null | undefined;
    url?: string | null | undefined;
    categoryId?: string | null | undefined;
    destination?: "HOME" | "CATEGORY" | "PRODUCT" | "CART" | "ACCOUNT" | "URL" | null | undefined;
    openInNewTab?: boolean | undefined;
    couponId?: string | null | undefined;
    closeAfterAction?: boolean | undefined;
}>>;
export type PopupAction = z.infer<typeof popupActionSchema>;
export declare const popupFormSchema: z.ZodDefault<z.ZodObject<{
    type: z.ZodDefault<z.ZodEnum<["NONE", "NEWSLETTER", "LEAD"]>>;
    collectName: z.ZodDefault<z.ZodBoolean>;
    collectEmail: z.ZodDefault<z.ZodBoolean>;
    collectPhone: z.ZodDefault<z.ZodBoolean>;
    consentRequired: z.ZodDefault<z.ZodBoolean>;
    successAutoCloseSeconds: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    type: "NONE" | "NEWSLETTER" | "LEAD";
    collectName: boolean;
    collectEmail: boolean;
    collectPhone: boolean;
    consentRequired: boolean;
    successAutoCloseSeconds: number;
}, {
    type?: "NONE" | "NEWSLETTER" | "LEAD" | undefined;
    collectName?: boolean | undefined;
    collectEmail?: boolean | undefined;
    collectPhone?: boolean | undefined;
    consentRequired?: boolean | undefined;
    successAutoCloseSeconds?: number | undefined;
}>>;
export declare const popupCountdownSchema: z.ZodDefault<z.ZodObject<{
    enabled: z.ZodDefault<z.ZodBoolean>;
    mode: z.ZodDefault<z.ZodEnum<["CAMPAIGN_END", "FIXED_TIMESTAMP"]>>;
    targetAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    enabled: boolean;
    mode: "CAMPAIGN_END" | "FIXED_TIMESTAMP";
    targetAt: string | null;
}, {
    enabled?: boolean | undefined;
    mode?: "CAMPAIGN_END" | "FIXED_TIMESTAMP" | undefined;
    targetAt?: string | null | undefined;
}>>;
export declare const popupTargetFieldSchema: z.ZodEnum<["PAGE_TYPE", "PAGE_PATH", "PRODUCT_ID", "CATEGORY_ID", "DEVICE", "LOCALE", "AUTH_STATUS", "VISITOR_TYPE", "CUSTOMER_ORDER_COUNT", "CUSTOMER_TOTAL_SPENT", "CUSTOMER_AVERAGE_ORDER_VALUE", "CUSTOMER_IS_VIP", "PURCHASED_PRODUCT", "PURCHASED_CATEGORY", "CART_TOTAL", "CART_ITEM_COUNT", "CART_CONTAINS_PRODUCT", "CART_CONTAINS_CATEGORY", "FREE_SHIPPING_REMAINING", "COUNTRY", "REGION", "CITY", "UTM_SOURCE", "UTM_CAMPAIGN", "REFERRER_DOMAIN"]>;
export type PopupTargetField = z.infer<typeof popupTargetFieldSchema>;
export declare const popupRuleSchema: z.ZodObject<{
    id: z.ZodString;
    field: z.ZodEnum<["PAGE_TYPE", "PAGE_PATH", "PRODUCT_ID", "CATEGORY_ID", "DEVICE", "LOCALE", "AUTH_STATUS", "VISITOR_TYPE", "CUSTOMER_ORDER_COUNT", "CUSTOMER_TOTAL_SPENT", "CUSTOMER_AVERAGE_ORDER_VALUE", "CUSTOMER_IS_VIP", "PURCHASED_PRODUCT", "PURCHASED_CATEGORY", "CART_TOTAL", "CART_ITEM_COUNT", "CART_CONTAINS_PRODUCT", "CART_CONTAINS_CATEGORY", "FREE_SHIPPING_REMAINING", "COUNTRY", "REGION", "CITY", "UTM_SOURCE", "UTM_CAMPAIGN", "REFERRER_DOMAIN"]>;
    operator: z.ZodEnum<["EQUALS", "NOT_EQUALS", "IN", "NOT_IN", "CONTAINS", "NOT_CONTAINS", "STARTS_WITH", "MATCHES", "GT", "GTE", "LT", "LTE", "IS_TRUE", "IS_FALSE"]>;
    value: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodString, "many">]>>;
}, "strip", z.ZodTypeAny, {
    id: string;
    operator: "GT" | "IN" | "LT" | "GTE" | "LTE" | "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "NOT_IN" | "NOT_CONTAINS" | "STARTS_WITH" | "MATCHES" | "IS_TRUE" | "IS_FALSE";
    field: "PAGE_TYPE" | "PAGE_PATH" | "PRODUCT_ID" | "CATEGORY_ID" | "DEVICE" | "LOCALE" | "AUTH_STATUS" | "VISITOR_TYPE" | "CUSTOMER_ORDER_COUNT" | "CUSTOMER_TOTAL_SPENT" | "CUSTOMER_AVERAGE_ORDER_VALUE" | "CUSTOMER_IS_VIP" | "PURCHASED_PRODUCT" | "PURCHASED_CATEGORY" | "CART_TOTAL" | "CART_ITEM_COUNT" | "CART_CONTAINS_PRODUCT" | "CART_CONTAINS_CATEGORY" | "FREE_SHIPPING_REMAINING" | "COUNTRY" | "REGION" | "CITY" | "UTM_SOURCE" | "UTM_CAMPAIGN" | "REFERRER_DOMAIN";
    value?: string | number | boolean | string[] | undefined;
}, {
    id: string;
    operator: "GT" | "IN" | "LT" | "GTE" | "LTE" | "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "NOT_IN" | "NOT_CONTAINS" | "STARTS_WITH" | "MATCHES" | "IS_TRUE" | "IS_FALSE";
    field: "PAGE_TYPE" | "PAGE_PATH" | "PRODUCT_ID" | "CATEGORY_ID" | "DEVICE" | "LOCALE" | "AUTH_STATUS" | "VISITOR_TYPE" | "CUSTOMER_ORDER_COUNT" | "CUSTOMER_TOTAL_SPENT" | "CUSTOMER_AVERAGE_ORDER_VALUE" | "CUSTOMER_IS_VIP" | "PURCHASED_PRODUCT" | "PURCHASED_CATEGORY" | "CART_TOTAL" | "CART_ITEM_COUNT" | "CART_CONTAINS_PRODUCT" | "CART_CONTAINS_CATEGORY" | "FREE_SHIPPING_REMAINING" | "COUNTRY" | "REGION" | "CITY" | "UTM_SOURCE" | "UTM_CAMPAIGN" | "REFERRER_DOMAIN";
    value?: string | number | boolean | string[] | undefined;
}>;
export type PopupRule = z.infer<typeof popupRuleSchema>;
export declare const popupTargetingSchema: z.ZodDefault<z.ZodObject<{
    logic: z.ZodDefault<z.ZodEnum<["AND", "OR"]>>;
    rules: z.ZodDefault<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        field: z.ZodEnum<["PAGE_TYPE", "PAGE_PATH", "PRODUCT_ID", "CATEGORY_ID", "DEVICE", "LOCALE", "AUTH_STATUS", "VISITOR_TYPE", "CUSTOMER_ORDER_COUNT", "CUSTOMER_TOTAL_SPENT", "CUSTOMER_AVERAGE_ORDER_VALUE", "CUSTOMER_IS_VIP", "PURCHASED_PRODUCT", "PURCHASED_CATEGORY", "CART_TOTAL", "CART_ITEM_COUNT", "CART_CONTAINS_PRODUCT", "CART_CONTAINS_CATEGORY", "FREE_SHIPPING_REMAINING", "COUNTRY", "REGION", "CITY", "UTM_SOURCE", "UTM_CAMPAIGN", "REFERRER_DOMAIN"]>;
        operator: z.ZodEnum<["EQUALS", "NOT_EQUALS", "IN", "NOT_IN", "CONTAINS", "NOT_CONTAINS", "STARTS_WITH", "MATCHES", "GT", "GTE", "LT", "LTE", "IS_TRUE", "IS_FALSE"]>;
        value: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodString, "many">]>>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        operator: "GT" | "IN" | "LT" | "GTE" | "LTE" | "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "NOT_IN" | "NOT_CONTAINS" | "STARTS_WITH" | "MATCHES" | "IS_TRUE" | "IS_FALSE";
        field: "PAGE_TYPE" | "PAGE_PATH" | "PRODUCT_ID" | "CATEGORY_ID" | "DEVICE" | "LOCALE" | "AUTH_STATUS" | "VISITOR_TYPE" | "CUSTOMER_ORDER_COUNT" | "CUSTOMER_TOTAL_SPENT" | "CUSTOMER_AVERAGE_ORDER_VALUE" | "CUSTOMER_IS_VIP" | "PURCHASED_PRODUCT" | "PURCHASED_CATEGORY" | "CART_TOTAL" | "CART_ITEM_COUNT" | "CART_CONTAINS_PRODUCT" | "CART_CONTAINS_CATEGORY" | "FREE_SHIPPING_REMAINING" | "COUNTRY" | "REGION" | "CITY" | "UTM_SOURCE" | "UTM_CAMPAIGN" | "REFERRER_DOMAIN";
        value?: string | number | boolean | string[] | undefined;
    }, {
        id: string;
        operator: "GT" | "IN" | "LT" | "GTE" | "LTE" | "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "NOT_IN" | "NOT_CONTAINS" | "STARTS_WITH" | "MATCHES" | "IS_TRUE" | "IS_FALSE";
        field: "PAGE_TYPE" | "PAGE_PATH" | "PRODUCT_ID" | "CATEGORY_ID" | "DEVICE" | "LOCALE" | "AUTH_STATUS" | "VISITOR_TYPE" | "CUSTOMER_ORDER_COUNT" | "CUSTOMER_TOTAL_SPENT" | "CUSTOMER_AVERAGE_ORDER_VALUE" | "CUSTOMER_IS_VIP" | "PURCHASED_PRODUCT" | "PURCHASED_CATEGORY" | "CART_TOTAL" | "CART_ITEM_COUNT" | "CART_CONTAINS_PRODUCT" | "CART_CONTAINS_CATEGORY" | "FREE_SHIPPING_REMAINING" | "COUNTRY" | "REGION" | "CITY" | "UTM_SOURCE" | "UTM_CAMPAIGN" | "REFERRER_DOMAIN";
        value?: string | number | boolean | string[] | undefined;
    }>, "many">>;
    exclusions: z.ZodDefault<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        field: z.ZodEnum<["PAGE_TYPE", "PAGE_PATH", "PRODUCT_ID", "CATEGORY_ID", "DEVICE", "LOCALE", "AUTH_STATUS", "VISITOR_TYPE", "CUSTOMER_ORDER_COUNT", "CUSTOMER_TOTAL_SPENT", "CUSTOMER_AVERAGE_ORDER_VALUE", "CUSTOMER_IS_VIP", "PURCHASED_PRODUCT", "PURCHASED_CATEGORY", "CART_TOTAL", "CART_ITEM_COUNT", "CART_CONTAINS_PRODUCT", "CART_CONTAINS_CATEGORY", "FREE_SHIPPING_REMAINING", "COUNTRY", "REGION", "CITY", "UTM_SOURCE", "UTM_CAMPAIGN", "REFERRER_DOMAIN"]>;
        operator: z.ZodEnum<["EQUALS", "NOT_EQUALS", "IN", "NOT_IN", "CONTAINS", "NOT_CONTAINS", "STARTS_WITH", "MATCHES", "GT", "GTE", "LT", "LTE", "IS_TRUE", "IS_FALSE"]>;
        value: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodString, "many">]>>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        operator: "GT" | "IN" | "LT" | "GTE" | "LTE" | "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "NOT_IN" | "NOT_CONTAINS" | "STARTS_WITH" | "MATCHES" | "IS_TRUE" | "IS_FALSE";
        field: "PAGE_TYPE" | "PAGE_PATH" | "PRODUCT_ID" | "CATEGORY_ID" | "DEVICE" | "LOCALE" | "AUTH_STATUS" | "VISITOR_TYPE" | "CUSTOMER_ORDER_COUNT" | "CUSTOMER_TOTAL_SPENT" | "CUSTOMER_AVERAGE_ORDER_VALUE" | "CUSTOMER_IS_VIP" | "PURCHASED_PRODUCT" | "PURCHASED_CATEGORY" | "CART_TOTAL" | "CART_ITEM_COUNT" | "CART_CONTAINS_PRODUCT" | "CART_CONTAINS_CATEGORY" | "FREE_SHIPPING_REMAINING" | "COUNTRY" | "REGION" | "CITY" | "UTM_SOURCE" | "UTM_CAMPAIGN" | "REFERRER_DOMAIN";
        value?: string | number | boolean | string[] | undefined;
    }, {
        id: string;
        operator: "GT" | "IN" | "LT" | "GTE" | "LTE" | "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "NOT_IN" | "NOT_CONTAINS" | "STARTS_WITH" | "MATCHES" | "IS_TRUE" | "IS_FALSE";
        field: "PAGE_TYPE" | "PAGE_PATH" | "PRODUCT_ID" | "CATEGORY_ID" | "DEVICE" | "LOCALE" | "AUTH_STATUS" | "VISITOR_TYPE" | "CUSTOMER_ORDER_COUNT" | "CUSTOMER_TOTAL_SPENT" | "CUSTOMER_AVERAGE_ORDER_VALUE" | "CUSTOMER_IS_VIP" | "PURCHASED_PRODUCT" | "PURCHASED_CATEGORY" | "CART_TOTAL" | "CART_ITEM_COUNT" | "CART_CONTAINS_PRODUCT" | "CART_CONTAINS_CATEGORY" | "FREE_SHIPPING_REMAINING" | "COUNTRY" | "REGION" | "CITY" | "UTM_SOURCE" | "UTM_CAMPAIGN" | "REFERRER_DOMAIN";
        value?: string | number | boolean | string[] | undefined;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    rules: {
        id: string;
        operator: "GT" | "IN" | "LT" | "GTE" | "LTE" | "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "NOT_IN" | "NOT_CONTAINS" | "STARTS_WITH" | "MATCHES" | "IS_TRUE" | "IS_FALSE";
        field: "PAGE_TYPE" | "PAGE_PATH" | "PRODUCT_ID" | "CATEGORY_ID" | "DEVICE" | "LOCALE" | "AUTH_STATUS" | "VISITOR_TYPE" | "CUSTOMER_ORDER_COUNT" | "CUSTOMER_TOTAL_SPENT" | "CUSTOMER_AVERAGE_ORDER_VALUE" | "CUSTOMER_IS_VIP" | "PURCHASED_PRODUCT" | "PURCHASED_CATEGORY" | "CART_TOTAL" | "CART_ITEM_COUNT" | "CART_CONTAINS_PRODUCT" | "CART_CONTAINS_CATEGORY" | "FREE_SHIPPING_REMAINING" | "COUNTRY" | "REGION" | "CITY" | "UTM_SOURCE" | "UTM_CAMPAIGN" | "REFERRER_DOMAIN";
        value?: string | number | boolean | string[] | undefined;
    }[];
    logic: "AND" | "OR";
    exclusions: {
        id: string;
        operator: "GT" | "IN" | "LT" | "GTE" | "LTE" | "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "NOT_IN" | "NOT_CONTAINS" | "STARTS_WITH" | "MATCHES" | "IS_TRUE" | "IS_FALSE";
        field: "PAGE_TYPE" | "PAGE_PATH" | "PRODUCT_ID" | "CATEGORY_ID" | "DEVICE" | "LOCALE" | "AUTH_STATUS" | "VISITOR_TYPE" | "CUSTOMER_ORDER_COUNT" | "CUSTOMER_TOTAL_SPENT" | "CUSTOMER_AVERAGE_ORDER_VALUE" | "CUSTOMER_IS_VIP" | "PURCHASED_PRODUCT" | "PURCHASED_CATEGORY" | "CART_TOTAL" | "CART_ITEM_COUNT" | "CART_CONTAINS_PRODUCT" | "CART_CONTAINS_CATEGORY" | "FREE_SHIPPING_REMAINING" | "COUNTRY" | "REGION" | "CITY" | "UTM_SOURCE" | "UTM_CAMPAIGN" | "REFERRER_DOMAIN";
        value?: string | number | boolean | string[] | undefined;
    }[];
}, {
    rules?: {
        id: string;
        operator: "GT" | "IN" | "LT" | "GTE" | "LTE" | "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "NOT_IN" | "NOT_CONTAINS" | "STARTS_WITH" | "MATCHES" | "IS_TRUE" | "IS_FALSE";
        field: "PAGE_TYPE" | "PAGE_PATH" | "PRODUCT_ID" | "CATEGORY_ID" | "DEVICE" | "LOCALE" | "AUTH_STATUS" | "VISITOR_TYPE" | "CUSTOMER_ORDER_COUNT" | "CUSTOMER_TOTAL_SPENT" | "CUSTOMER_AVERAGE_ORDER_VALUE" | "CUSTOMER_IS_VIP" | "PURCHASED_PRODUCT" | "PURCHASED_CATEGORY" | "CART_TOTAL" | "CART_ITEM_COUNT" | "CART_CONTAINS_PRODUCT" | "CART_CONTAINS_CATEGORY" | "FREE_SHIPPING_REMAINING" | "COUNTRY" | "REGION" | "CITY" | "UTM_SOURCE" | "UTM_CAMPAIGN" | "REFERRER_DOMAIN";
        value?: string | number | boolean | string[] | undefined;
    }[] | undefined;
    logic?: "AND" | "OR" | undefined;
    exclusions?: {
        id: string;
        operator: "GT" | "IN" | "LT" | "GTE" | "LTE" | "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "NOT_IN" | "NOT_CONTAINS" | "STARTS_WITH" | "MATCHES" | "IS_TRUE" | "IS_FALSE";
        field: "PAGE_TYPE" | "PAGE_PATH" | "PRODUCT_ID" | "CATEGORY_ID" | "DEVICE" | "LOCALE" | "AUTH_STATUS" | "VISITOR_TYPE" | "CUSTOMER_ORDER_COUNT" | "CUSTOMER_TOTAL_SPENT" | "CUSTOMER_AVERAGE_ORDER_VALUE" | "CUSTOMER_IS_VIP" | "PURCHASED_PRODUCT" | "PURCHASED_CATEGORY" | "CART_TOTAL" | "CART_ITEM_COUNT" | "CART_CONTAINS_PRODUCT" | "CART_CONTAINS_CATEGORY" | "FREE_SHIPPING_REMAINING" | "COUNTRY" | "REGION" | "CITY" | "UTM_SOURCE" | "UTM_CAMPAIGN" | "REFERRER_DOMAIN";
        value?: string | number | boolean | string[] | undefined;
    }[] | undefined;
}>>;
export type PopupTargeting = z.infer<typeof popupTargetingSchema>;
export declare const popupTriggerSchema: z.ZodDefault<z.ZodObject<{
    type: z.ZodDefault<z.ZodEnum<["IMMEDIATE", "DELAY", "SCROLL_DEPTH", "EXIT_INTENT", "INACTIVITY", "PAGE_VIEWS", "SESSION_DURATION", "PRODUCT_VIEWS", "ADD_TO_CART", "REMOVE_FROM_CART", "CART_THRESHOLD", "FIRST_VISIT", "RETURNING_SESSION", "CUSTOM_EVENT"]>>;
    delaySeconds: z.ZodDefault<z.ZodNumber>;
    scrollPercent: z.ZodDefault<z.ZodNumber>;
    inactivitySeconds: z.ZodDefault<z.ZodNumber>;
    pageViewCount: z.ZodDefault<z.ZodNumber>;
    sessionDurationSeconds: z.ZodDefault<z.ZodNumber>;
    productViewCount: z.ZodDefault<z.ZodNumber>;
    cartThreshold: z.ZodDefault<z.ZodNumber>;
    eventName: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    productIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    categoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    mobileExitFallback: z.ZodDefault<z.ZodEnum<["NONE", "INACTIVITY", "SCROLL_DEPTH"]>>;
    mobileExitFallbackValue: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    type: "EXIT_INTENT" | "IMMEDIATE" | "DELAY" | "SCROLL_DEPTH" | "INACTIVITY" | "PAGE_VIEWS" | "SESSION_DURATION" | "PRODUCT_VIEWS" | "ADD_TO_CART" | "REMOVE_FROM_CART" | "CART_THRESHOLD" | "FIRST_VISIT" | "RETURNING_SESSION" | "CUSTOM_EVENT";
    categoryIds: string[];
    productIds: string[];
    delaySeconds: number;
    scrollPercent: number;
    inactivitySeconds: number;
    pageViewCount: number;
    sessionDurationSeconds: number;
    productViewCount: number;
    cartThreshold: number;
    eventName: string | null;
    mobileExitFallback: "NONE" | "SCROLL_DEPTH" | "INACTIVITY";
    mobileExitFallbackValue: number;
}, {
    type?: "EXIT_INTENT" | "IMMEDIATE" | "DELAY" | "SCROLL_DEPTH" | "INACTIVITY" | "PAGE_VIEWS" | "SESSION_DURATION" | "PRODUCT_VIEWS" | "ADD_TO_CART" | "REMOVE_FROM_CART" | "CART_THRESHOLD" | "FIRST_VISIT" | "RETURNING_SESSION" | "CUSTOM_EVENT" | undefined;
    categoryIds?: string[] | undefined;
    productIds?: string[] | undefined;
    delaySeconds?: number | undefined;
    scrollPercent?: number | undefined;
    inactivitySeconds?: number | undefined;
    pageViewCount?: number | undefined;
    sessionDurationSeconds?: number | undefined;
    productViewCount?: number | undefined;
    cartThreshold?: number | undefined;
    eventName?: string | null | undefined;
    mobileExitFallback?: "NONE" | "SCROLL_DEPTH" | "INACTIVITY" | undefined;
    mobileExitFallbackValue?: number | undefined;
}>>;
export type PopupTrigger = z.infer<typeof popupTriggerSchema>;
export declare const popupFrequencySchema: z.ZodDefault<z.ZodObject<{
    mode: z.ZodDefault<z.ZodEnum<["ONCE_EVER", "ONCE_PER_SESSION", "ONCE_PER_DAY", "EVERY_X_HOURS", "EVERY_X_DAYS", "MAX_IMPRESSIONS", "UNTIL_INTERACTION", "UNTIL_CONVERSION", "UNTIL_CAMPAIGN_ENDS"]>>;
    interval: z.ZodDefault<z.ZodNumber>;
    maxImpressions: z.ZodDefault<z.ZodNumber>;
    afterDismiss: z.ZodDefault<z.ZodEnum<["DEFAULT", "SESSION", "HOURS", "DAYS", "NEVER"]>>;
    afterDismissInterval: z.ZodDefault<z.ZodNumber>;
    afterPrimaryAction: z.ZodDefault<z.ZodEnum<["DEFAULT", "SESSION", "NEVER"]>>;
    afterConversion: z.ZodDefault<z.ZodEnum<["DEFAULT", "NEVER"]>>;
}, "strip", z.ZodTypeAny, {
    mode: "ONCE_EVER" | "ONCE_PER_SESSION" | "ONCE_PER_DAY" | "EVERY_X_HOURS" | "EVERY_X_DAYS" | "MAX_IMPRESSIONS" | "UNTIL_INTERACTION" | "UNTIL_CONVERSION" | "UNTIL_CAMPAIGN_ENDS";
    interval: number;
    maxImpressions: number;
    afterDismiss: "DEFAULT" | "SESSION" | "HOURS" | "DAYS" | "NEVER";
    afterDismissInterval: number;
    afterPrimaryAction: "DEFAULT" | "SESSION" | "NEVER";
    afterConversion: "DEFAULT" | "NEVER";
}, {
    mode?: "ONCE_EVER" | "ONCE_PER_SESSION" | "ONCE_PER_DAY" | "EVERY_X_HOURS" | "EVERY_X_DAYS" | "MAX_IMPRESSIONS" | "UNTIL_INTERACTION" | "UNTIL_CONVERSION" | "UNTIL_CAMPAIGN_ENDS" | undefined;
    interval?: number | undefined;
    maxImpressions?: number | undefined;
    afterDismiss?: "DEFAULT" | "SESSION" | "HOURS" | "DAYS" | "NEVER" | undefined;
    afterDismissInterval?: number | undefined;
    afterPrimaryAction?: "DEFAULT" | "SESSION" | "NEVER" | undefined;
    afterConversion?: "DEFAULT" | "NEVER" | undefined;
}>>;
export type PopupFrequency = z.infer<typeof popupFrequencySchema>;
export declare const popupCollisionSchema: z.ZodDefault<z.ZodObject<{
    queueBehavior: z.ZodDefault<z.ZodEnum<["QUEUE", "SUPPRESS", "REPLACE_LOWER"]>>;
    cooldownSeconds: z.ZodDefault<z.ZodNumber>;
    suppressLowerPriority: z.ZodDefault<z.ZodBoolean>;
    exclusivityKey: z.ZodDefault<z.ZodNullable<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    queueBehavior: "QUEUE" | "SUPPRESS" | "REPLACE_LOWER";
    cooldownSeconds: number;
    suppressLowerPriority: boolean;
    exclusivityKey: string | null;
}, {
    queueBehavior?: "QUEUE" | "SUPPRESS" | "REPLACE_LOWER" | undefined;
    cooldownSeconds?: number | undefined;
    suppressLowerPriority?: boolean | undefined;
    exclusivityKey?: string | null | undefined;
}>>;
export type PopupCollision = z.infer<typeof popupCollisionSchema>;
export declare const popupRecurringScheduleSchema: z.ZodDefault<z.ZodNullable<z.ZodObject<{
    enabled: z.ZodDefault<z.ZodBoolean>;
    weekdays: z.ZodDefault<z.ZodArray<z.ZodNumber, "many">>;
    startTime: z.ZodDefault<z.ZodString>;
    endTime: z.ZodDefault<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    enabled: boolean;
    weekdays: number[];
    startTime: string;
    endTime: string;
}, {
    enabled?: boolean | undefined;
    weekdays?: number[] | undefined;
    startTime?: string | undefined;
    endTime?: string | undefined;
}>>>;
export type PopupRecurringSchedule = z.infer<typeof popupRecurringScheduleSchema>;
export declare const popupVariantInputSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    name: z.ZodString;
    weight: z.ZodDefault<z.ZodNumber>;
    isControl: z.ZodDefault<z.ZodBoolean>;
    content: z.ZodArray<z.ZodObject<{
        locale: z.ZodEnum<["en", "ar"]>;
        eyebrow: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        badge: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        headline: z.ZodString;
        subtitle: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        body: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        imageAlt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        primaryCtaLabel: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        secondaryCtaLabel: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        disclaimer: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        successHeadline: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        successBody: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        nameLabel: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        emailLabel: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        phoneLabel: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        submitLabel: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        consentLabel: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        eyebrow: string | null;
        imageAlt: string | null;
        disclaimer: string | null;
        locale: "en" | "ar";
        body: string | null;
        primaryCtaLabel: string | null;
        secondaryCtaLabel: string | null;
        badge: string | null;
        headline: string;
        subtitle: string | null;
        successHeadline: string | null;
        successBody: string | null;
        nameLabel: string | null;
        emailLabel: string | null;
        phoneLabel: string | null;
        submitLabel: string | null;
        consentLabel: string | null;
    }, {
        locale: "en" | "ar";
        headline: string;
        eyebrow?: string | null | undefined;
        imageAlt?: string | null | undefined;
        disclaimer?: string | null | undefined;
        body?: string | null | undefined;
        primaryCtaLabel?: string | null | undefined;
        secondaryCtaLabel?: string | null | undefined;
        badge?: string | null | undefined;
        subtitle?: string | null | undefined;
        successHeadline?: string | null | undefined;
        successBody?: string | null | undefined;
        nameLabel?: string | null | undefined;
        emailLabel?: string | null | undefined;
        phoneLabel?: string | null | undefined;
        submitLabel?: string | null | undefined;
        consentLabel?: string | null | undefined;
    }>, "many">;
    appearanceOverride: z.ZodDefault<z.ZodObject<{
        theme: z.ZodOptional<z.ZodDefault<z.ZodEnum<["IVORY", "INK", "SAGE", "BLUSH", "GOLD", "BRAND"]>>>;
        icon: z.ZodOptional<z.ZodDefault<z.ZodEnum<["NONE", "SPARKLE", "GIFT", "MEGAPHONE", "TRUCK", "HEART", "BELL"]>>>;
        layout: z.ZodOptional<z.ZodDefault<z.ZodEnum<["TEXT_ONLY", "SPLIT", "IMAGE_TOP", "IMAGE_BACKGROUND"]>>>;
        width: z.ZodOptional<z.ZodDefault<z.ZodEnum<["COMPACT", "STANDARD", "WIDE"]>>>;
        maxWidth: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
        spacing: z.ZodOptional<z.ZodDefault<z.ZodEnum<["COMPACT", "COMFORTABLE", "AIRY"]>>>;
        alignment: z.ZodOptional<z.ZodDefault<z.ZodEnum<["START", "CENTER"]>>>;
        imagePosition: z.ZodOptional<z.ZodDefault<z.ZodEnum<["START", "END", "TOP", "BACKGROUND"]>>>;
        borderRadius: z.ZodOptional<z.ZodDefault<z.ZodEnum<["NONE", "SUBTLE", "SOFT", "ROUNDED"]>>>;
        overlayOpacity: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
        buttonStyle: z.ZodOptional<z.ZodDefault<z.ZodEnum<["SOLID", "OUTLINE", "UNDERLINE"]>>>;
        surface: z.ZodOptional<z.ZodDefault<z.ZodEnum<["SOLID", "TINTED", "GLASS"]>>>;
        animation: z.ZodOptional<z.ZodDefault<z.ZodEnum<["FADE", "LIFT", "SCALE", "SLIDE", "NONE"]>>>;
        accentColor: z.ZodOptional<z.ZodDefault<z.ZodNullable<z.ZodString>>>;
    }, "strip", z.ZodTypeAny, {
        width?: "STANDARD" | "COMPACT" | "WIDE" | undefined;
        alignment?: "START" | "CENTER" | undefined;
        icon?: "NONE" | "TRUCK" | "SPARKLE" | "GIFT" | "MEGAPHONE" | "HEART" | "BELL" | undefined;
        spacing?: "COMPACT" | "COMFORTABLE" | "AIRY" | undefined;
        layout?: "IMAGE_TOP" | "SPLIT" | "TEXT_ONLY" | "IMAGE_BACKGROUND" | undefined;
        animation?: "NONE" | "SCALE" | "FADE" | "SLIDE" | "LIFT" | undefined;
        overlayOpacity?: number | undefined;
        surface?: "SOLID" | "TINTED" | "GLASS" | undefined;
        borderRadius?: "NONE" | "SUBTLE" | "SOFT" | "ROUNDED" | undefined;
        theme?: "BRAND" | "IVORY" | "INK" | "SAGE" | "BLUSH" | "GOLD" | undefined;
        maxWidth?: number | undefined;
        imagePosition?: "START" | "END" | "TOP" | "BACKGROUND" | undefined;
        buttonStyle?: "OUTLINE" | "SOLID" | "UNDERLINE" | undefined;
        accentColor?: string | null | undefined;
    }, {
        width?: "STANDARD" | "COMPACT" | "WIDE" | undefined;
        alignment?: "START" | "CENTER" | undefined;
        icon?: "NONE" | "TRUCK" | "SPARKLE" | "GIFT" | "MEGAPHONE" | "HEART" | "BELL" | undefined;
        spacing?: "COMPACT" | "COMFORTABLE" | "AIRY" | undefined;
        layout?: "IMAGE_TOP" | "SPLIT" | "TEXT_ONLY" | "IMAGE_BACKGROUND" | undefined;
        animation?: "NONE" | "SCALE" | "FADE" | "SLIDE" | "LIFT" | undefined;
        overlayOpacity?: number | undefined;
        surface?: "SOLID" | "TINTED" | "GLASS" | undefined;
        borderRadius?: "NONE" | "SUBTLE" | "SOFT" | "ROUNDED" | undefined;
        theme?: "BRAND" | "IVORY" | "INK" | "SAGE" | "BLUSH" | "GOLD" | undefined;
        maxWidth?: number | undefined;
        imagePosition?: "START" | "END" | "TOP" | "BACKGROUND" | undefined;
        buttonStyle?: "OUTLINE" | "SOLID" | "UNDERLINE" | undefined;
        accentColor?: string | null | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    name: string;
    weight: number;
    isControl: boolean;
    content: {
        eyebrow: string | null;
        imageAlt: string | null;
        disclaimer: string | null;
        locale: "en" | "ar";
        body: string | null;
        primaryCtaLabel: string | null;
        secondaryCtaLabel: string | null;
        badge: string | null;
        headline: string;
        subtitle: string | null;
        successHeadline: string | null;
        successBody: string | null;
        nameLabel: string | null;
        emailLabel: string | null;
        phoneLabel: string | null;
        submitLabel: string | null;
        consentLabel: string | null;
    }[];
    appearanceOverride: {
        width?: "STANDARD" | "COMPACT" | "WIDE" | undefined;
        alignment?: "START" | "CENTER" | undefined;
        icon?: "NONE" | "TRUCK" | "SPARKLE" | "GIFT" | "MEGAPHONE" | "HEART" | "BELL" | undefined;
        spacing?: "COMPACT" | "COMFORTABLE" | "AIRY" | undefined;
        layout?: "IMAGE_TOP" | "SPLIT" | "TEXT_ONLY" | "IMAGE_BACKGROUND" | undefined;
        animation?: "NONE" | "SCALE" | "FADE" | "SLIDE" | "LIFT" | undefined;
        overlayOpacity?: number | undefined;
        surface?: "SOLID" | "TINTED" | "GLASS" | undefined;
        borderRadius?: "NONE" | "SUBTLE" | "SOFT" | "ROUNDED" | undefined;
        theme?: "BRAND" | "IVORY" | "INK" | "SAGE" | "BLUSH" | "GOLD" | undefined;
        maxWidth?: number | undefined;
        imagePosition?: "START" | "END" | "TOP" | "BACKGROUND" | undefined;
        buttonStyle?: "OUTLINE" | "SOLID" | "UNDERLINE" | undefined;
        accentColor?: string | null | undefined;
    };
    id?: string | undefined;
}, {
    name: string;
    content: {
        locale: "en" | "ar";
        headline: string;
        eyebrow?: string | null | undefined;
        imageAlt?: string | null | undefined;
        disclaimer?: string | null | undefined;
        body?: string | null | undefined;
        primaryCtaLabel?: string | null | undefined;
        secondaryCtaLabel?: string | null | undefined;
        badge?: string | null | undefined;
        subtitle?: string | null | undefined;
        successHeadline?: string | null | undefined;
        successBody?: string | null | undefined;
        nameLabel?: string | null | undefined;
        emailLabel?: string | null | undefined;
        phoneLabel?: string | null | undefined;
        submitLabel?: string | null | undefined;
        consentLabel?: string | null | undefined;
    }[];
    id?: string | undefined;
    weight?: number | undefined;
    isControl?: boolean | undefined;
    appearanceOverride?: {
        width?: "STANDARD" | "COMPACT" | "WIDE" | undefined;
        alignment?: "START" | "CENTER" | undefined;
        icon?: "NONE" | "TRUCK" | "SPARKLE" | "GIFT" | "MEGAPHONE" | "HEART" | "BELL" | undefined;
        spacing?: "COMPACT" | "COMFORTABLE" | "AIRY" | undefined;
        layout?: "IMAGE_TOP" | "SPLIT" | "TEXT_ONLY" | "IMAGE_BACKGROUND" | undefined;
        animation?: "NONE" | "SCALE" | "FADE" | "SLIDE" | "LIFT" | undefined;
        overlayOpacity?: number | undefined;
        surface?: "SOLID" | "TINTED" | "GLASS" | undefined;
        borderRadius?: "NONE" | "SUBTLE" | "SOFT" | "ROUNDED" | undefined;
        theme?: "BRAND" | "IVORY" | "INK" | "SAGE" | "BLUSH" | "GOLD" | undefined;
        maxWidth?: number | undefined;
        imagePosition?: "START" | "END" | "TOP" | "BACKGROUND" | undefined;
        buttonStyle?: "OUTLINE" | "SOLID" | "UNDERLINE" | undefined;
        accentColor?: string | null | undefined;
    } | undefined;
}>;
export type PopupVariantInput = z.infer<typeof popupVariantInputSchema>;
export declare const createPopupCampaignSchema: z.ZodEffects<z.ZodObject<{
    internalName: z.ZodString;
    type: z.ZodDefault<z.ZodEnum<["PROMOTIONAL", "DISCOUNT", "NEWSLETTER", "WELCOME", "FIRST_ORDER", "EXIT_INTENT", "ANNOUNCEMENT", "PRODUCT_RECOMMENDATION", "CART_REMINDER", "FREE_SHIPPING", "LIMITED_TIME_SALE", "PRODUCT_LAUNCH", "RESTOCK", "PRODUCT_SPECIFIC", "CATEGORY_SPECIFIC", "CROSS_SELL", "ACCOUNT_ENCOURAGEMENT", "LOGIN_REMINDER", "LOYALTY_VIP", "RETURNING_CUSTOMER", "NEW_VISITOR", "ORDER_UPDATE", "STORE_PICKUP", "DELIVERY_NOTICE", "SYSTEM_NOTICE", "MAINTENANCE", "SEASONAL", "CUSTOM"]>>;
    state: z.ZodDefault<z.ZodEnum<["DRAFT", "ACTIVE", "PAUSED", "ARCHIVED"]>>;
    priority: z.ZodDefault<z.ZodNumber>;
    startsAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    endsAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    timezone: z.ZodDefault<z.ZodString>;
    recurringSchedule: z.ZodDefault<z.ZodNullable<z.ZodObject<{
        enabled: z.ZodDefault<z.ZodBoolean>;
        weekdays: z.ZodDefault<z.ZodArray<z.ZodNumber, "many">>;
        startTime: z.ZodDefault<z.ZodString>;
        endTime: z.ZodDefault<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        enabled: boolean;
        weekdays: number[];
        startTime: string;
        endTime: string;
    }, {
        enabled?: boolean | undefined;
        weekdays?: number[] | undefined;
        startTime?: string | undefined;
        endTime?: string | undefined;
    }>>>;
    presentation: z.ZodDefault<z.ZodObject<{
        desktop: z.ZodDefault<z.ZodEnum<["CENTER_MODAL", "BOTTOM_SHEET", "FLOATING_RIGHT", "FLOATING_LEFT", "TOP_BANNER", "BOTTOM_BANNER", "FULLSCREEN", "SIDE_PANEL_RIGHT", "SIDE_PANEL_LEFT", "SLIDE_IN_RIGHT", "SLIDE_IN_LEFT", "PROMO_TOAST", "ANNOUNCEMENT_BAR"]>>;
        tablet: z.ZodDefault<z.ZodEnum<["CENTER_MODAL", "BOTTOM_SHEET", "FLOATING_RIGHT", "FLOATING_LEFT", "TOP_BANNER", "BOTTOM_BANNER", "FULLSCREEN", "SIDE_PANEL_RIGHT", "SIDE_PANEL_LEFT", "SLIDE_IN_RIGHT", "SLIDE_IN_LEFT", "PROMO_TOAST", "ANNOUNCEMENT_BAR"]>>;
        mobile: z.ZodDefault<z.ZodEnum<["CENTER_MODAL", "BOTTOM_SHEET", "FLOATING_RIGHT", "FLOATING_LEFT", "TOP_BANNER", "BOTTOM_BANNER", "FULLSCREEN", "SIDE_PANEL_RIGHT", "SIDE_PANEL_LEFT", "SLIDE_IN_RIGHT", "SLIDE_IN_LEFT", "PROMO_TOAST", "ANNOUNCEMENT_BAR"]>>;
        dismissible: z.ZodDefault<z.ZodBoolean>;
        closeOnOverlay: z.ZodDefault<z.ZodBoolean>;
        closeOnEscape: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        tablet: "CENTER_MODAL" | "BOTTOM_SHEET" | "FLOATING_RIGHT" | "FLOATING_LEFT" | "TOP_BANNER" | "BOTTOM_BANNER" | "FULLSCREEN" | "SIDE_PANEL_RIGHT" | "SIDE_PANEL_LEFT" | "SLIDE_IN_RIGHT" | "SLIDE_IN_LEFT" | "PROMO_TOAST" | "ANNOUNCEMENT_BAR";
        mobile: "CENTER_MODAL" | "BOTTOM_SHEET" | "FLOATING_RIGHT" | "FLOATING_LEFT" | "TOP_BANNER" | "BOTTOM_BANNER" | "FULLSCREEN" | "SIDE_PANEL_RIGHT" | "SIDE_PANEL_LEFT" | "SLIDE_IN_RIGHT" | "SLIDE_IN_LEFT" | "PROMO_TOAST" | "ANNOUNCEMENT_BAR";
        desktop: "CENTER_MODAL" | "BOTTOM_SHEET" | "FLOATING_RIGHT" | "FLOATING_LEFT" | "TOP_BANNER" | "BOTTOM_BANNER" | "FULLSCREEN" | "SIDE_PANEL_RIGHT" | "SIDE_PANEL_LEFT" | "SLIDE_IN_RIGHT" | "SLIDE_IN_LEFT" | "PROMO_TOAST" | "ANNOUNCEMENT_BAR";
        dismissible: boolean;
        closeOnOverlay: boolean;
        closeOnEscape: boolean;
    }, {
        tablet?: "CENTER_MODAL" | "BOTTOM_SHEET" | "FLOATING_RIGHT" | "FLOATING_LEFT" | "TOP_BANNER" | "BOTTOM_BANNER" | "FULLSCREEN" | "SIDE_PANEL_RIGHT" | "SIDE_PANEL_LEFT" | "SLIDE_IN_RIGHT" | "SLIDE_IN_LEFT" | "PROMO_TOAST" | "ANNOUNCEMENT_BAR" | undefined;
        mobile?: "CENTER_MODAL" | "BOTTOM_SHEET" | "FLOATING_RIGHT" | "FLOATING_LEFT" | "TOP_BANNER" | "BOTTOM_BANNER" | "FULLSCREEN" | "SIDE_PANEL_RIGHT" | "SIDE_PANEL_LEFT" | "SLIDE_IN_RIGHT" | "SLIDE_IN_LEFT" | "PROMO_TOAST" | "ANNOUNCEMENT_BAR" | undefined;
        desktop?: "CENTER_MODAL" | "BOTTOM_SHEET" | "FLOATING_RIGHT" | "FLOATING_LEFT" | "TOP_BANNER" | "BOTTOM_BANNER" | "FULLSCREEN" | "SIDE_PANEL_RIGHT" | "SIDE_PANEL_LEFT" | "SLIDE_IN_RIGHT" | "SLIDE_IN_LEFT" | "PROMO_TOAST" | "ANNOUNCEMENT_BAR" | undefined;
        dismissible?: boolean | undefined;
        closeOnOverlay?: boolean | undefined;
        closeOnEscape?: boolean | undefined;
    }>>;
    appearance: z.ZodDefault<z.ZodObject<{
        theme: z.ZodDefault<z.ZodEnum<["IVORY", "INK", "SAGE", "BLUSH", "GOLD", "BRAND"]>>;
        icon: z.ZodDefault<z.ZodEnum<["NONE", "SPARKLE", "GIFT", "MEGAPHONE", "TRUCK", "HEART", "BELL"]>>;
        layout: z.ZodDefault<z.ZodEnum<["TEXT_ONLY", "SPLIT", "IMAGE_TOP", "IMAGE_BACKGROUND"]>>;
        width: z.ZodDefault<z.ZodEnum<["COMPACT", "STANDARD", "WIDE"]>>;
        maxWidth: z.ZodDefault<z.ZodNumber>;
        spacing: z.ZodDefault<z.ZodEnum<["COMPACT", "COMFORTABLE", "AIRY"]>>;
        alignment: z.ZodDefault<z.ZodEnum<["START", "CENTER"]>>;
        imagePosition: z.ZodDefault<z.ZodEnum<["START", "END", "TOP", "BACKGROUND"]>>;
        borderRadius: z.ZodDefault<z.ZodEnum<["NONE", "SUBTLE", "SOFT", "ROUNDED"]>>;
        overlayOpacity: z.ZodDefault<z.ZodNumber>;
        buttonStyle: z.ZodDefault<z.ZodEnum<["SOLID", "OUTLINE", "UNDERLINE"]>>;
        surface: z.ZodDefault<z.ZodEnum<["SOLID", "TINTED", "GLASS"]>>;
        animation: z.ZodDefault<z.ZodEnum<["FADE", "LIFT", "SCALE", "SLIDE", "NONE"]>>;
        accentColor: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        width: "STANDARD" | "COMPACT" | "WIDE";
        alignment: "START" | "CENTER";
        icon: "NONE" | "TRUCK" | "SPARKLE" | "GIFT" | "MEGAPHONE" | "HEART" | "BELL";
        spacing: "COMPACT" | "COMFORTABLE" | "AIRY";
        layout: "IMAGE_TOP" | "SPLIT" | "TEXT_ONLY" | "IMAGE_BACKGROUND";
        animation: "NONE" | "SCALE" | "FADE" | "SLIDE" | "LIFT";
        overlayOpacity: number;
        surface: "SOLID" | "TINTED" | "GLASS";
        borderRadius: "NONE" | "SUBTLE" | "SOFT" | "ROUNDED";
        theme: "BRAND" | "IVORY" | "INK" | "SAGE" | "BLUSH" | "GOLD";
        maxWidth: number;
        imagePosition: "START" | "END" | "TOP" | "BACKGROUND";
        buttonStyle: "OUTLINE" | "SOLID" | "UNDERLINE";
        accentColor: string | null;
    }, {
        width?: "STANDARD" | "COMPACT" | "WIDE" | undefined;
        alignment?: "START" | "CENTER" | undefined;
        icon?: "NONE" | "TRUCK" | "SPARKLE" | "GIFT" | "MEGAPHONE" | "HEART" | "BELL" | undefined;
        spacing?: "COMPACT" | "COMFORTABLE" | "AIRY" | undefined;
        layout?: "IMAGE_TOP" | "SPLIT" | "TEXT_ONLY" | "IMAGE_BACKGROUND" | undefined;
        animation?: "NONE" | "SCALE" | "FADE" | "SLIDE" | "LIFT" | undefined;
        overlayOpacity?: number | undefined;
        surface?: "SOLID" | "TINTED" | "GLASS" | undefined;
        borderRadius?: "NONE" | "SUBTLE" | "SOFT" | "ROUNDED" | undefined;
        theme?: "BRAND" | "IVORY" | "INK" | "SAGE" | "BLUSH" | "GOLD" | undefined;
        maxWidth?: number | undefined;
        imagePosition?: "START" | "END" | "TOP" | "BACKGROUND" | undefined;
        buttonStyle?: "OUTLINE" | "SOLID" | "UNDERLINE" | undefined;
        accentColor?: string | null | undefined;
    }>>;
    targeting: z.ZodDefault<z.ZodObject<{
        logic: z.ZodDefault<z.ZodEnum<["AND", "OR"]>>;
        rules: z.ZodDefault<z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            field: z.ZodEnum<["PAGE_TYPE", "PAGE_PATH", "PRODUCT_ID", "CATEGORY_ID", "DEVICE", "LOCALE", "AUTH_STATUS", "VISITOR_TYPE", "CUSTOMER_ORDER_COUNT", "CUSTOMER_TOTAL_SPENT", "CUSTOMER_AVERAGE_ORDER_VALUE", "CUSTOMER_IS_VIP", "PURCHASED_PRODUCT", "PURCHASED_CATEGORY", "CART_TOTAL", "CART_ITEM_COUNT", "CART_CONTAINS_PRODUCT", "CART_CONTAINS_CATEGORY", "FREE_SHIPPING_REMAINING", "COUNTRY", "REGION", "CITY", "UTM_SOURCE", "UTM_CAMPAIGN", "REFERRER_DOMAIN"]>;
            operator: z.ZodEnum<["EQUALS", "NOT_EQUALS", "IN", "NOT_IN", "CONTAINS", "NOT_CONTAINS", "STARTS_WITH", "MATCHES", "GT", "GTE", "LT", "LTE", "IS_TRUE", "IS_FALSE"]>;
            value: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodString, "many">]>>;
        }, "strip", z.ZodTypeAny, {
            id: string;
            operator: "GT" | "IN" | "LT" | "GTE" | "LTE" | "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "NOT_IN" | "NOT_CONTAINS" | "STARTS_WITH" | "MATCHES" | "IS_TRUE" | "IS_FALSE";
            field: "PAGE_TYPE" | "PAGE_PATH" | "PRODUCT_ID" | "CATEGORY_ID" | "DEVICE" | "LOCALE" | "AUTH_STATUS" | "VISITOR_TYPE" | "CUSTOMER_ORDER_COUNT" | "CUSTOMER_TOTAL_SPENT" | "CUSTOMER_AVERAGE_ORDER_VALUE" | "CUSTOMER_IS_VIP" | "PURCHASED_PRODUCT" | "PURCHASED_CATEGORY" | "CART_TOTAL" | "CART_ITEM_COUNT" | "CART_CONTAINS_PRODUCT" | "CART_CONTAINS_CATEGORY" | "FREE_SHIPPING_REMAINING" | "COUNTRY" | "REGION" | "CITY" | "UTM_SOURCE" | "UTM_CAMPAIGN" | "REFERRER_DOMAIN";
            value?: string | number | boolean | string[] | undefined;
        }, {
            id: string;
            operator: "GT" | "IN" | "LT" | "GTE" | "LTE" | "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "NOT_IN" | "NOT_CONTAINS" | "STARTS_WITH" | "MATCHES" | "IS_TRUE" | "IS_FALSE";
            field: "PAGE_TYPE" | "PAGE_PATH" | "PRODUCT_ID" | "CATEGORY_ID" | "DEVICE" | "LOCALE" | "AUTH_STATUS" | "VISITOR_TYPE" | "CUSTOMER_ORDER_COUNT" | "CUSTOMER_TOTAL_SPENT" | "CUSTOMER_AVERAGE_ORDER_VALUE" | "CUSTOMER_IS_VIP" | "PURCHASED_PRODUCT" | "PURCHASED_CATEGORY" | "CART_TOTAL" | "CART_ITEM_COUNT" | "CART_CONTAINS_PRODUCT" | "CART_CONTAINS_CATEGORY" | "FREE_SHIPPING_REMAINING" | "COUNTRY" | "REGION" | "CITY" | "UTM_SOURCE" | "UTM_CAMPAIGN" | "REFERRER_DOMAIN";
            value?: string | number | boolean | string[] | undefined;
        }>, "many">>;
        exclusions: z.ZodDefault<z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            field: z.ZodEnum<["PAGE_TYPE", "PAGE_PATH", "PRODUCT_ID", "CATEGORY_ID", "DEVICE", "LOCALE", "AUTH_STATUS", "VISITOR_TYPE", "CUSTOMER_ORDER_COUNT", "CUSTOMER_TOTAL_SPENT", "CUSTOMER_AVERAGE_ORDER_VALUE", "CUSTOMER_IS_VIP", "PURCHASED_PRODUCT", "PURCHASED_CATEGORY", "CART_TOTAL", "CART_ITEM_COUNT", "CART_CONTAINS_PRODUCT", "CART_CONTAINS_CATEGORY", "FREE_SHIPPING_REMAINING", "COUNTRY", "REGION", "CITY", "UTM_SOURCE", "UTM_CAMPAIGN", "REFERRER_DOMAIN"]>;
            operator: z.ZodEnum<["EQUALS", "NOT_EQUALS", "IN", "NOT_IN", "CONTAINS", "NOT_CONTAINS", "STARTS_WITH", "MATCHES", "GT", "GTE", "LT", "LTE", "IS_TRUE", "IS_FALSE"]>;
            value: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodString, "many">]>>;
        }, "strip", z.ZodTypeAny, {
            id: string;
            operator: "GT" | "IN" | "LT" | "GTE" | "LTE" | "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "NOT_IN" | "NOT_CONTAINS" | "STARTS_WITH" | "MATCHES" | "IS_TRUE" | "IS_FALSE";
            field: "PAGE_TYPE" | "PAGE_PATH" | "PRODUCT_ID" | "CATEGORY_ID" | "DEVICE" | "LOCALE" | "AUTH_STATUS" | "VISITOR_TYPE" | "CUSTOMER_ORDER_COUNT" | "CUSTOMER_TOTAL_SPENT" | "CUSTOMER_AVERAGE_ORDER_VALUE" | "CUSTOMER_IS_VIP" | "PURCHASED_PRODUCT" | "PURCHASED_CATEGORY" | "CART_TOTAL" | "CART_ITEM_COUNT" | "CART_CONTAINS_PRODUCT" | "CART_CONTAINS_CATEGORY" | "FREE_SHIPPING_REMAINING" | "COUNTRY" | "REGION" | "CITY" | "UTM_SOURCE" | "UTM_CAMPAIGN" | "REFERRER_DOMAIN";
            value?: string | number | boolean | string[] | undefined;
        }, {
            id: string;
            operator: "GT" | "IN" | "LT" | "GTE" | "LTE" | "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "NOT_IN" | "NOT_CONTAINS" | "STARTS_WITH" | "MATCHES" | "IS_TRUE" | "IS_FALSE";
            field: "PAGE_TYPE" | "PAGE_PATH" | "PRODUCT_ID" | "CATEGORY_ID" | "DEVICE" | "LOCALE" | "AUTH_STATUS" | "VISITOR_TYPE" | "CUSTOMER_ORDER_COUNT" | "CUSTOMER_TOTAL_SPENT" | "CUSTOMER_AVERAGE_ORDER_VALUE" | "CUSTOMER_IS_VIP" | "PURCHASED_PRODUCT" | "PURCHASED_CATEGORY" | "CART_TOTAL" | "CART_ITEM_COUNT" | "CART_CONTAINS_PRODUCT" | "CART_CONTAINS_CATEGORY" | "FREE_SHIPPING_REMAINING" | "COUNTRY" | "REGION" | "CITY" | "UTM_SOURCE" | "UTM_CAMPAIGN" | "REFERRER_DOMAIN";
            value?: string | number | boolean | string[] | undefined;
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        rules: {
            id: string;
            operator: "GT" | "IN" | "LT" | "GTE" | "LTE" | "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "NOT_IN" | "NOT_CONTAINS" | "STARTS_WITH" | "MATCHES" | "IS_TRUE" | "IS_FALSE";
            field: "PAGE_TYPE" | "PAGE_PATH" | "PRODUCT_ID" | "CATEGORY_ID" | "DEVICE" | "LOCALE" | "AUTH_STATUS" | "VISITOR_TYPE" | "CUSTOMER_ORDER_COUNT" | "CUSTOMER_TOTAL_SPENT" | "CUSTOMER_AVERAGE_ORDER_VALUE" | "CUSTOMER_IS_VIP" | "PURCHASED_PRODUCT" | "PURCHASED_CATEGORY" | "CART_TOTAL" | "CART_ITEM_COUNT" | "CART_CONTAINS_PRODUCT" | "CART_CONTAINS_CATEGORY" | "FREE_SHIPPING_REMAINING" | "COUNTRY" | "REGION" | "CITY" | "UTM_SOURCE" | "UTM_CAMPAIGN" | "REFERRER_DOMAIN";
            value?: string | number | boolean | string[] | undefined;
        }[];
        logic: "AND" | "OR";
        exclusions: {
            id: string;
            operator: "GT" | "IN" | "LT" | "GTE" | "LTE" | "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "NOT_IN" | "NOT_CONTAINS" | "STARTS_WITH" | "MATCHES" | "IS_TRUE" | "IS_FALSE";
            field: "PAGE_TYPE" | "PAGE_PATH" | "PRODUCT_ID" | "CATEGORY_ID" | "DEVICE" | "LOCALE" | "AUTH_STATUS" | "VISITOR_TYPE" | "CUSTOMER_ORDER_COUNT" | "CUSTOMER_TOTAL_SPENT" | "CUSTOMER_AVERAGE_ORDER_VALUE" | "CUSTOMER_IS_VIP" | "PURCHASED_PRODUCT" | "PURCHASED_CATEGORY" | "CART_TOTAL" | "CART_ITEM_COUNT" | "CART_CONTAINS_PRODUCT" | "CART_CONTAINS_CATEGORY" | "FREE_SHIPPING_REMAINING" | "COUNTRY" | "REGION" | "CITY" | "UTM_SOURCE" | "UTM_CAMPAIGN" | "REFERRER_DOMAIN";
            value?: string | number | boolean | string[] | undefined;
        }[];
    }, {
        rules?: {
            id: string;
            operator: "GT" | "IN" | "LT" | "GTE" | "LTE" | "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "NOT_IN" | "NOT_CONTAINS" | "STARTS_WITH" | "MATCHES" | "IS_TRUE" | "IS_FALSE";
            field: "PAGE_TYPE" | "PAGE_PATH" | "PRODUCT_ID" | "CATEGORY_ID" | "DEVICE" | "LOCALE" | "AUTH_STATUS" | "VISITOR_TYPE" | "CUSTOMER_ORDER_COUNT" | "CUSTOMER_TOTAL_SPENT" | "CUSTOMER_AVERAGE_ORDER_VALUE" | "CUSTOMER_IS_VIP" | "PURCHASED_PRODUCT" | "PURCHASED_CATEGORY" | "CART_TOTAL" | "CART_ITEM_COUNT" | "CART_CONTAINS_PRODUCT" | "CART_CONTAINS_CATEGORY" | "FREE_SHIPPING_REMAINING" | "COUNTRY" | "REGION" | "CITY" | "UTM_SOURCE" | "UTM_CAMPAIGN" | "REFERRER_DOMAIN";
            value?: string | number | boolean | string[] | undefined;
        }[] | undefined;
        logic?: "AND" | "OR" | undefined;
        exclusions?: {
            id: string;
            operator: "GT" | "IN" | "LT" | "GTE" | "LTE" | "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "NOT_IN" | "NOT_CONTAINS" | "STARTS_WITH" | "MATCHES" | "IS_TRUE" | "IS_FALSE";
            field: "PAGE_TYPE" | "PAGE_PATH" | "PRODUCT_ID" | "CATEGORY_ID" | "DEVICE" | "LOCALE" | "AUTH_STATUS" | "VISITOR_TYPE" | "CUSTOMER_ORDER_COUNT" | "CUSTOMER_TOTAL_SPENT" | "CUSTOMER_AVERAGE_ORDER_VALUE" | "CUSTOMER_IS_VIP" | "PURCHASED_PRODUCT" | "PURCHASED_CATEGORY" | "CART_TOTAL" | "CART_ITEM_COUNT" | "CART_CONTAINS_PRODUCT" | "CART_CONTAINS_CATEGORY" | "FREE_SHIPPING_REMAINING" | "COUNTRY" | "REGION" | "CITY" | "UTM_SOURCE" | "UTM_CAMPAIGN" | "REFERRER_DOMAIN";
            value?: string | number | boolean | string[] | undefined;
        }[] | undefined;
    }>>;
    trigger: z.ZodDefault<z.ZodObject<{
        type: z.ZodDefault<z.ZodEnum<["IMMEDIATE", "DELAY", "SCROLL_DEPTH", "EXIT_INTENT", "INACTIVITY", "PAGE_VIEWS", "SESSION_DURATION", "PRODUCT_VIEWS", "ADD_TO_CART", "REMOVE_FROM_CART", "CART_THRESHOLD", "FIRST_VISIT", "RETURNING_SESSION", "CUSTOM_EVENT"]>>;
        delaySeconds: z.ZodDefault<z.ZodNumber>;
        scrollPercent: z.ZodDefault<z.ZodNumber>;
        inactivitySeconds: z.ZodDefault<z.ZodNumber>;
        pageViewCount: z.ZodDefault<z.ZodNumber>;
        sessionDurationSeconds: z.ZodDefault<z.ZodNumber>;
        productViewCount: z.ZodDefault<z.ZodNumber>;
        cartThreshold: z.ZodDefault<z.ZodNumber>;
        eventName: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        productIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        categoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        mobileExitFallback: z.ZodDefault<z.ZodEnum<["NONE", "INACTIVITY", "SCROLL_DEPTH"]>>;
        mobileExitFallbackValue: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        type: "EXIT_INTENT" | "IMMEDIATE" | "DELAY" | "SCROLL_DEPTH" | "INACTIVITY" | "PAGE_VIEWS" | "SESSION_DURATION" | "PRODUCT_VIEWS" | "ADD_TO_CART" | "REMOVE_FROM_CART" | "CART_THRESHOLD" | "FIRST_VISIT" | "RETURNING_SESSION" | "CUSTOM_EVENT";
        categoryIds: string[];
        productIds: string[];
        delaySeconds: number;
        scrollPercent: number;
        inactivitySeconds: number;
        pageViewCount: number;
        sessionDurationSeconds: number;
        productViewCount: number;
        cartThreshold: number;
        eventName: string | null;
        mobileExitFallback: "NONE" | "SCROLL_DEPTH" | "INACTIVITY";
        mobileExitFallbackValue: number;
    }, {
        type?: "EXIT_INTENT" | "IMMEDIATE" | "DELAY" | "SCROLL_DEPTH" | "INACTIVITY" | "PAGE_VIEWS" | "SESSION_DURATION" | "PRODUCT_VIEWS" | "ADD_TO_CART" | "REMOVE_FROM_CART" | "CART_THRESHOLD" | "FIRST_VISIT" | "RETURNING_SESSION" | "CUSTOM_EVENT" | undefined;
        categoryIds?: string[] | undefined;
        productIds?: string[] | undefined;
        delaySeconds?: number | undefined;
        scrollPercent?: number | undefined;
        inactivitySeconds?: number | undefined;
        pageViewCount?: number | undefined;
        sessionDurationSeconds?: number | undefined;
        productViewCount?: number | undefined;
        cartThreshold?: number | undefined;
        eventName?: string | null | undefined;
        mobileExitFallback?: "NONE" | "SCROLL_DEPTH" | "INACTIVITY" | undefined;
        mobileExitFallbackValue?: number | undefined;
    }>>;
    frequency: z.ZodDefault<z.ZodObject<{
        mode: z.ZodDefault<z.ZodEnum<["ONCE_EVER", "ONCE_PER_SESSION", "ONCE_PER_DAY", "EVERY_X_HOURS", "EVERY_X_DAYS", "MAX_IMPRESSIONS", "UNTIL_INTERACTION", "UNTIL_CONVERSION", "UNTIL_CAMPAIGN_ENDS"]>>;
        interval: z.ZodDefault<z.ZodNumber>;
        maxImpressions: z.ZodDefault<z.ZodNumber>;
        afterDismiss: z.ZodDefault<z.ZodEnum<["DEFAULT", "SESSION", "HOURS", "DAYS", "NEVER"]>>;
        afterDismissInterval: z.ZodDefault<z.ZodNumber>;
        afterPrimaryAction: z.ZodDefault<z.ZodEnum<["DEFAULT", "SESSION", "NEVER"]>>;
        afterConversion: z.ZodDefault<z.ZodEnum<["DEFAULT", "NEVER"]>>;
    }, "strip", z.ZodTypeAny, {
        mode: "ONCE_EVER" | "ONCE_PER_SESSION" | "ONCE_PER_DAY" | "EVERY_X_HOURS" | "EVERY_X_DAYS" | "MAX_IMPRESSIONS" | "UNTIL_INTERACTION" | "UNTIL_CONVERSION" | "UNTIL_CAMPAIGN_ENDS";
        interval: number;
        maxImpressions: number;
        afterDismiss: "DEFAULT" | "SESSION" | "HOURS" | "DAYS" | "NEVER";
        afterDismissInterval: number;
        afterPrimaryAction: "DEFAULT" | "SESSION" | "NEVER";
        afterConversion: "DEFAULT" | "NEVER";
    }, {
        mode?: "ONCE_EVER" | "ONCE_PER_SESSION" | "ONCE_PER_DAY" | "EVERY_X_HOURS" | "EVERY_X_DAYS" | "MAX_IMPRESSIONS" | "UNTIL_INTERACTION" | "UNTIL_CONVERSION" | "UNTIL_CAMPAIGN_ENDS" | undefined;
        interval?: number | undefined;
        maxImpressions?: number | undefined;
        afterDismiss?: "DEFAULT" | "SESSION" | "HOURS" | "DAYS" | "NEVER" | undefined;
        afterDismissInterval?: number | undefined;
        afterPrimaryAction?: "DEFAULT" | "SESSION" | "NEVER" | undefined;
        afterConversion?: "DEFAULT" | "NEVER" | undefined;
    }>>;
    collision: z.ZodDefault<z.ZodObject<{
        queueBehavior: z.ZodDefault<z.ZodEnum<["QUEUE", "SUPPRESS", "REPLACE_LOWER"]>>;
        cooldownSeconds: z.ZodDefault<z.ZodNumber>;
        suppressLowerPriority: z.ZodDefault<z.ZodBoolean>;
        exclusivityKey: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        queueBehavior: "QUEUE" | "SUPPRESS" | "REPLACE_LOWER";
        cooldownSeconds: number;
        suppressLowerPriority: boolean;
        exclusivityKey: string | null;
    }, {
        queueBehavior?: "QUEUE" | "SUPPRESS" | "REPLACE_LOWER" | undefined;
        cooldownSeconds?: number | undefined;
        suppressLowerPriority?: boolean | undefined;
        exclusivityKey?: string | null | undefined;
    }>>;
    primaryAction: z.ZodDefault<z.ZodObject<{
        type: z.ZodDefault<z.ZodEnum<["NONE", "NAVIGATE", "APPLY_COUPON", "COPY_COUPON", "CLOSE", "SUBMIT_FORM"]>>;
        destination: z.ZodDefault<z.ZodNullable<z.ZodEnum<["URL", "PRODUCT", "CATEGORY", "CART", "ACCOUNT", "HOME"]>>>;
        url: z.ZodDefault<z.ZodNullable<z.ZodEffects<z.ZodString, string, string>>>;
        productId: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        categoryId: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        couponId: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        openInNewTab: z.ZodDefault<z.ZodBoolean>;
        closeAfterAction: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        type: "NONE" | "NAVIGATE" | "APPLY_COUPON" | "COPY_COUPON" | "CLOSE" | "SUBMIT_FORM";
        productId: string | null;
        url: string | null;
        categoryId: string | null;
        destination: "HOME" | "CATEGORY" | "PRODUCT" | "CART" | "ACCOUNT" | "URL" | null;
        openInNewTab: boolean;
        couponId: string | null;
        closeAfterAction: boolean;
    }, {
        type?: "NONE" | "NAVIGATE" | "APPLY_COUPON" | "COPY_COUPON" | "CLOSE" | "SUBMIT_FORM" | undefined;
        productId?: string | null | undefined;
        url?: string | null | undefined;
        categoryId?: string | null | undefined;
        destination?: "HOME" | "CATEGORY" | "PRODUCT" | "CART" | "ACCOUNT" | "URL" | null | undefined;
        openInNewTab?: boolean | undefined;
        couponId?: string | null | undefined;
        closeAfterAction?: boolean | undefined;
    }>>;
    secondaryAction: z.ZodDefault<z.ZodObject<{
        type: z.ZodDefault<z.ZodEnum<["NONE", "NAVIGATE", "APPLY_COUPON", "COPY_COUPON", "CLOSE", "SUBMIT_FORM"]>>;
        destination: z.ZodDefault<z.ZodNullable<z.ZodEnum<["URL", "PRODUCT", "CATEGORY", "CART", "ACCOUNT", "HOME"]>>>;
        url: z.ZodDefault<z.ZodNullable<z.ZodEffects<z.ZodString, string, string>>>;
        productId: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        categoryId: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        couponId: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        openInNewTab: z.ZodDefault<z.ZodBoolean>;
        closeAfterAction: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        type: "NONE" | "NAVIGATE" | "APPLY_COUPON" | "COPY_COUPON" | "CLOSE" | "SUBMIT_FORM";
        productId: string | null;
        url: string | null;
        categoryId: string | null;
        destination: "HOME" | "CATEGORY" | "PRODUCT" | "CART" | "ACCOUNT" | "URL" | null;
        openInNewTab: boolean;
        couponId: string | null;
        closeAfterAction: boolean;
    }, {
        type?: "NONE" | "NAVIGATE" | "APPLY_COUPON" | "COPY_COUPON" | "CLOSE" | "SUBMIT_FORM" | undefined;
        productId?: string | null | undefined;
        url?: string | null | undefined;
        categoryId?: string | null | undefined;
        destination?: "HOME" | "CATEGORY" | "PRODUCT" | "CART" | "ACCOUNT" | "URL" | null | undefined;
        openInNewTab?: boolean | undefined;
        couponId?: string | null | undefined;
        closeAfterAction?: boolean | undefined;
    }>>;
    form: z.ZodDefault<z.ZodObject<{
        type: z.ZodDefault<z.ZodEnum<["NONE", "NEWSLETTER", "LEAD"]>>;
        collectName: z.ZodDefault<z.ZodBoolean>;
        collectEmail: z.ZodDefault<z.ZodBoolean>;
        collectPhone: z.ZodDefault<z.ZodBoolean>;
        consentRequired: z.ZodDefault<z.ZodBoolean>;
        successAutoCloseSeconds: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        type: "NONE" | "NEWSLETTER" | "LEAD";
        collectName: boolean;
        collectEmail: boolean;
        collectPhone: boolean;
        consentRequired: boolean;
        successAutoCloseSeconds: number;
    }, {
        type?: "NONE" | "NEWSLETTER" | "LEAD" | undefined;
        collectName?: boolean | undefined;
        collectEmail?: boolean | undefined;
        collectPhone?: boolean | undefined;
        consentRequired?: boolean | undefined;
        successAutoCloseSeconds?: number | undefined;
    }>>;
    countdown: z.ZodDefault<z.ZodObject<{
        enabled: z.ZodDefault<z.ZodBoolean>;
        mode: z.ZodDefault<z.ZodEnum<["CAMPAIGN_END", "FIXED_TIMESTAMP"]>>;
        targetAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        enabled: boolean;
        mode: "CAMPAIGN_END" | "FIXED_TIMESTAMP";
        targetAt: string | null;
    }, {
        enabled?: boolean | undefined;
        mode?: "CAMPAIGN_END" | "FIXED_TIMESTAMP" | undefined;
        targetAt?: string | null | undefined;
    }>>;
    promotionId: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    couponId: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    productId: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    categoryId: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    mediaAssetId: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    variants: z.ZodArray<z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        name: z.ZodString;
        weight: z.ZodDefault<z.ZodNumber>;
        isControl: z.ZodDefault<z.ZodBoolean>;
        content: z.ZodArray<z.ZodObject<{
            locale: z.ZodEnum<["en", "ar"]>;
            eyebrow: z.ZodDefault<z.ZodNullable<z.ZodString>>;
            badge: z.ZodDefault<z.ZodNullable<z.ZodString>>;
            headline: z.ZodString;
            subtitle: z.ZodDefault<z.ZodNullable<z.ZodString>>;
            body: z.ZodDefault<z.ZodNullable<z.ZodString>>;
            imageAlt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
            primaryCtaLabel: z.ZodDefault<z.ZodNullable<z.ZodString>>;
            secondaryCtaLabel: z.ZodDefault<z.ZodNullable<z.ZodString>>;
            disclaimer: z.ZodDefault<z.ZodNullable<z.ZodString>>;
            successHeadline: z.ZodDefault<z.ZodNullable<z.ZodString>>;
            successBody: z.ZodDefault<z.ZodNullable<z.ZodString>>;
            nameLabel: z.ZodDefault<z.ZodNullable<z.ZodString>>;
            emailLabel: z.ZodDefault<z.ZodNullable<z.ZodString>>;
            phoneLabel: z.ZodDefault<z.ZodNullable<z.ZodString>>;
            submitLabel: z.ZodDefault<z.ZodNullable<z.ZodString>>;
            consentLabel: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
            eyebrow: string | null;
            imageAlt: string | null;
            disclaimer: string | null;
            locale: "en" | "ar";
            body: string | null;
            primaryCtaLabel: string | null;
            secondaryCtaLabel: string | null;
            badge: string | null;
            headline: string;
            subtitle: string | null;
            successHeadline: string | null;
            successBody: string | null;
            nameLabel: string | null;
            emailLabel: string | null;
            phoneLabel: string | null;
            submitLabel: string | null;
            consentLabel: string | null;
        }, {
            locale: "en" | "ar";
            headline: string;
            eyebrow?: string | null | undefined;
            imageAlt?: string | null | undefined;
            disclaimer?: string | null | undefined;
            body?: string | null | undefined;
            primaryCtaLabel?: string | null | undefined;
            secondaryCtaLabel?: string | null | undefined;
            badge?: string | null | undefined;
            subtitle?: string | null | undefined;
            successHeadline?: string | null | undefined;
            successBody?: string | null | undefined;
            nameLabel?: string | null | undefined;
            emailLabel?: string | null | undefined;
            phoneLabel?: string | null | undefined;
            submitLabel?: string | null | undefined;
            consentLabel?: string | null | undefined;
        }>, "many">;
        appearanceOverride: z.ZodDefault<z.ZodObject<{
            theme: z.ZodOptional<z.ZodDefault<z.ZodEnum<["IVORY", "INK", "SAGE", "BLUSH", "GOLD", "BRAND"]>>>;
            icon: z.ZodOptional<z.ZodDefault<z.ZodEnum<["NONE", "SPARKLE", "GIFT", "MEGAPHONE", "TRUCK", "HEART", "BELL"]>>>;
            layout: z.ZodOptional<z.ZodDefault<z.ZodEnum<["TEXT_ONLY", "SPLIT", "IMAGE_TOP", "IMAGE_BACKGROUND"]>>>;
            width: z.ZodOptional<z.ZodDefault<z.ZodEnum<["COMPACT", "STANDARD", "WIDE"]>>>;
            maxWidth: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
            spacing: z.ZodOptional<z.ZodDefault<z.ZodEnum<["COMPACT", "COMFORTABLE", "AIRY"]>>>;
            alignment: z.ZodOptional<z.ZodDefault<z.ZodEnum<["START", "CENTER"]>>>;
            imagePosition: z.ZodOptional<z.ZodDefault<z.ZodEnum<["START", "END", "TOP", "BACKGROUND"]>>>;
            borderRadius: z.ZodOptional<z.ZodDefault<z.ZodEnum<["NONE", "SUBTLE", "SOFT", "ROUNDED"]>>>;
            overlayOpacity: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
            buttonStyle: z.ZodOptional<z.ZodDefault<z.ZodEnum<["SOLID", "OUTLINE", "UNDERLINE"]>>>;
            surface: z.ZodOptional<z.ZodDefault<z.ZodEnum<["SOLID", "TINTED", "GLASS"]>>>;
            animation: z.ZodOptional<z.ZodDefault<z.ZodEnum<["FADE", "LIFT", "SCALE", "SLIDE", "NONE"]>>>;
            accentColor: z.ZodOptional<z.ZodDefault<z.ZodNullable<z.ZodString>>>;
        }, "strip", z.ZodTypeAny, {
            width?: "STANDARD" | "COMPACT" | "WIDE" | undefined;
            alignment?: "START" | "CENTER" | undefined;
            icon?: "NONE" | "TRUCK" | "SPARKLE" | "GIFT" | "MEGAPHONE" | "HEART" | "BELL" | undefined;
            spacing?: "COMPACT" | "COMFORTABLE" | "AIRY" | undefined;
            layout?: "IMAGE_TOP" | "SPLIT" | "TEXT_ONLY" | "IMAGE_BACKGROUND" | undefined;
            animation?: "NONE" | "SCALE" | "FADE" | "SLIDE" | "LIFT" | undefined;
            overlayOpacity?: number | undefined;
            surface?: "SOLID" | "TINTED" | "GLASS" | undefined;
            borderRadius?: "NONE" | "SUBTLE" | "SOFT" | "ROUNDED" | undefined;
            theme?: "BRAND" | "IVORY" | "INK" | "SAGE" | "BLUSH" | "GOLD" | undefined;
            maxWidth?: number | undefined;
            imagePosition?: "START" | "END" | "TOP" | "BACKGROUND" | undefined;
            buttonStyle?: "OUTLINE" | "SOLID" | "UNDERLINE" | undefined;
            accentColor?: string | null | undefined;
        }, {
            width?: "STANDARD" | "COMPACT" | "WIDE" | undefined;
            alignment?: "START" | "CENTER" | undefined;
            icon?: "NONE" | "TRUCK" | "SPARKLE" | "GIFT" | "MEGAPHONE" | "HEART" | "BELL" | undefined;
            spacing?: "COMPACT" | "COMFORTABLE" | "AIRY" | undefined;
            layout?: "IMAGE_TOP" | "SPLIT" | "TEXT_ONLY" | "IMAGE_BACKGROUND" | undefined;
            animation?: "NONE" | "SCALE" | "FADE" | "SLIDE" | "LIFT" | undefined;
            overlayOpacity?: number | undefined;
            surface?: "SOLID" | "TINTED" | "GLASS" | undefined;
            borderRadius?: "NONE" | "SUBTLE" | "SOFT" | "ROUNDED" | undefined;
            theme?: "BRAND" | "IVORY" | "INK" | "SAGE" | "BLUSH" | "GOLD" | undefined;
            maxWidth?: number | undefined;
            imagePosition?: "START" | "END" | "TOP" | "BACKGROUND" | undefined;
            buttonStyle?: "OUTLINE" | "SOLID" | "UNDERLINE" | undefined;
            accentColor?: string | null | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        weight: number;
        isControl: boolean;
        content: {
            eyebrow: string | null;
            imageAlt: string | null;
            disclaimer: string | null;
            locale: "en" | "ar";
            body: string | null;
            primaryCtaLabel: string | null;
            secondaryCtaLabel: string | null;
            badge: string | null;
            headline: string;
            subtitle: string | null;
            successHeadline: string | null;
            successBody: string | null;
            nameLabel: string | null;
            emailLabel: string | null;
            phoneLabel: string | null;
            submitLabel: string | null;
            consentLabel: string | null;
        }[];
        appearanceOverride: {
            width?: "STANDARD" | "COMPACT" | "WIDE" | undefined;
            alignment?: "START" | "CENTER" | undefined;
            icon?: "NONE" | "TRUCK" | "SPARKLE" | "GIFT" | "MEGAPHONE" | "HEART" | "BELL" | undefined;
            spacing?: "COMPACT" | "COMFORTABLE" | "AIRY" | undefined;
            layout?: "IMAGE_TOP" | "SPLIT" | "TEXT_ONLY" | "IMAGE_BACKGROUND" | undefined;
            animation?: "NONE" | "SCALE" | "FADE" | "SLIDE" | "LIFT" | undefined;
            overlayOpacity?: number | undefined;
            surface?: "SOLID" | "TINTED" | "GLASS" | undefined;
            borderRadius?: "NONE" | "SUBTLE" | "SOFT" | "ROUNDED" | undefined;
            theme?: "BRAND" | "IVORY" | "INK" | "SAGE" | "BLUSH" | "GOLD" | undefined;
            maxWidth?: number | undefined;
            imagePosition?: "START" | "END" | "TOP" | "BACKGROUND" | undefined;
            buttonStyle?: "OUTLINE" | "SOLID" | "UNDERLINE" | undefined;
            accentColor?: string | null | undefined;
        };
        id?: string | undefined;
    }, {
        name: string;
        content: {
            locale: "en" | "ar";
            headline: string;
            eyebrow?: string | null | undefined;
            imageAlt?: string | null | undefined;
            disclaimer?: string | null | undefined;
            body?: string | null | undefined;
            primaryCtaLabel?: string | null | undefined;
            secondaryCtaLabel?: string | null | undefined;
            badge?: string | null | undefined;
            subtitle?: string | null | undefined;
            successHeadline?: string | null | undefined;
            successBody?: string | null | undefined;
            nameLabel?: string | null | undefined;
            emailLabel?: string | null | undefined;
            phoneLabel?: string | null | undefined;
            submitLabel?: string | null | undefined;
            consentLabel?: string | null | undefined;
        }[];
        id?: string | undefined;
        weight?: number | undefined;
        isControl?: boolean | undefined;
        appearanceOverride?: {
            width?: "STANDARD" | "COMPACT" | "WIDE" | undefined;
            alignment?: "START" | "CENTER" | undefined;
            icon?: "NONE" | "TRUCK" | "SPARKLE" | "GIFT" | "MEGAPHONE" | "HEART" | "BELL" | undefined;
            spacing?: "COMPACT" | "COMFORTABLE" | "AIRY" | undefined;
            layout?: "IMAGE_TOP" | "SPLIT" | "TEXT_ONLY" | "IMAGE_BACKGROUND" | undefined;
            animation?: "NONE" | "SCALE" | "FADE" | "SLIDE" | "LIFT" | undefined;
            overlayOpacity?: number | undefined;
            surface?: "SOLID" | "TINTED" | "GLASS" | undefined;
            borderRadius?: "NONE" | "SUBTLE" | "SOFT" | "ROUNDED" | undefined;
            theme?: "BRAND" | "IVORY" | "INK" | "SAGE" | "BLUSH" | "GOLD" | undefined;
            maxWidth?: number | undefined;
            imagePosition?: "START" | "END" | "TOP" | "BACKGROUND" | undefined;
            buttonStyle?: "OUTLINE" | "SOLID" | "UNDERLINE" | undefined;
            accentColor?: string | null | undefined;
        } | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    type: "FREE_SHIPPING" | "FIRST_ORDER" | "CUSTOM" | "PROMOTIONAL" | "SEASONAL" | "NEWSLETTER" | "PRODUCT_LAUNCH" | "DISCOUNT" | "WELCOME" | "EXIT_INTENT" | "ANNOUNCEMENT" | "PRODUCT_RECOMMENDATION" | "CART_REMINDER" | "LIMITED_TIME_SALE" | "RESTOCK" | "PRODUCT_SPECIFIC" | "CATEGORY_SPECIFIC" | "CROSS_SELL" | "ACCOUNT_ENCOURAGEMENT" | "LOGIN_REMINDER" | "LOYALTY_VIP" | "RETURNING_CUSTOMER" | "NEW_VISITOR" | "ORDER_UPDATE" | "STORE_PICKUP" | "DELIVERY_NOTICE" | "SYSTEM_NOTICE" | "MAINTENANCE";
    productId: string | null;
    promotionId: string | null;
    categoryId: string | null;
    variants: {
        name: string;
        weight: number;
        isControl: boolean;
        content: {
            eyebrow: string | null;
            imageAlt: string | null;
            disclaimer: string | null;
            locale: "en" | "ar";
            body: string | null;
            primaryCtaLabel: string | null;
            secondaryCtaLabel: string | null;
            badge: string | null;
            headline: string;
            subtitle: string | null;
            successHeadline: string | null;
            successBody: string | null;
            nameLabel: string | null;
            emailLabel: string | null;
            phoneLabel: string | null;
            submitLabel: string | null;
            consentLabel: string | null;
        }[];
        appearanceOverride: {
            width?: "STANDARD" | "COMPACT" | "WIDE" | undefined;
            alignment?: "START" | "CENTER" | undefined;
            icon?: "NONE" | "TRUCK" | "SPARKLE" | "GIFT" | "MEGAPHONE" | "HEART" | "BELL" | undefined;
            spacing?: "COMPACT" | "COMFORTABLE" | "AIRY" | undefined;
            layout?: "IMAGE_TOP" | "SPLIT" | "TEXT_ONLY" | "IMAGE_BACKGROUND" | undefined;
            animation?: "NONE" | "SCALE" | "FADE" | "SLIDE" | "LIFT" | undefined;
            overlayOpacity?: number | undefined;
            surface?: "SOLID" | "TINTED" | "GLASS" | undefined;
            borderRadius?: "NONE" | "SUBTLE" | "SOFT" | "ROUNDED" | undefined;
            theme?: "BRAND" | "IVORY" | "INK" | "SAGE" | "BLUSH" | "GOLD" | undefined;
            maxWidth?: number | undefined;
            imagePosition?: "START" | "END" | "TOP" | "BACKGROUND" | undefined;
            buttonStyle?: "OUTLINE" | "SOLID" | "UNDERLINE" | undefined;
            accentColor?: string | null | undefined;
        };
        id?: string | undefined;
    }[];
    trigger: {
        type: "EXIT_INTENT" | "IMMEDIATE" | "DELAY" | "SCROLL_DEPTH" | "INACTIVITY" | "PAGE_VIEWS" | "SESSION_DURATION" | "PRODUCT_VIEWS" | "ADD_TO_CART" | "REMOVE_FROM_CART" | "CART_THRESHOLD" | "FIRST_VISIT" | "RETURNING_SESSION" | "CUSTOM_EVENT";
        categoryIds: string[];
        productIds: string[];
        delaySeconds: number;
        scrollPercent: number;
        inactivitySeconds: number;
        pageViewCount: number;
        sessionDurationSeconds: number;
        productViewCount: number;
        cartThreshold: number;
        eventName: string | null;
        mobileExitFallback: "NONE" | "SCROLL_DEPTH" | "INACTIVITY";
        mobileExitFallbackValue: number;
    };
    state: "ACTIVE" | "ARCHIVED" | "DRAFT" | "PAUSED";
    priority: number;
    startsAt: string | null;
    endsAt: string | null;
    timezone: string;
    mediaAssetId: string | null;
    presentation: {
        tablet: "CENTER_MODAL" | "BOTTOM_SHEET" | "FLOATING_RIGHT" | "FLOATING_LEFT" | "TOP_BANNER" | "BOTTOM_BANNER" | "FULLSCREEN" | "SIDE_PANEL_RIGHT" | "SIDE_PANEL_LEFT" | "SLIDE_IN_RIGHT" | "SLIDE_IN_LEFT" | "PROMO_TOAST" | "ANNOUNCEMENT_BAR";
        mobile: "CENTER_MODAL" | "BOTTOM_SHEET" | "FLOATING_RIGHT" | "FLOATING_LEFT" | "TOP_BANNER" | "BOTTOM_BANNER" | "FULLSCREEN" | "SIDE_PANEL_RIGHT" | "SIDE_PANEL_LEFT" | "SLIDE_IN_RIGHT" | "SLIDE_IN_LEFT" | "PROMO_TOAST" | "ANNOUNCEMENT_BAR";
        desktop: "CENTER_MODAL" | "BOTTOM_SHEET" | "FLOATING_RIGHT" | "FLOATING_LEFT" | "TOP_BANNER" | "BOTTOM_BANNER" | "FULLSCREEN" | "SIDE_PANEL_RIGHT" | "SIDE_PANEL_LEFT" | "SLIDE_IN_RIGHT" | "SLIDE_IN_LEFT" | "PROMO_TOAST" | "ANNOUNCEMENT_BAR";
        dismissible: boolean;
        closeOnOverlay: boolean;
        closeOnEscape: boolean;
    };
    internalName: string;
    couponId: string | null;
    recurringSchedule: {
        enabled: boolean;
        weekdays: number[];
        startTime: string;
        endTime: string;
    } | null;
    targeting: {
        rules: {
            id: string;
            operator: "GT" | "IN" | "LT" | "GTE" | "LTE" | "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "NOT_IN" | "NOT_CONTAINS" | "STARTS_WITH" | "MATCHES" | "IS_TRUE" | "IS_FALSE";
            field: "PAGE_TYPE" | "PAGE_PATH" | "PRODUCT_ID" | "CATEGORY_ID" | "DEVICE" | "LOCALE" | "AUTH_STATUS" | "VISITOR_TYPE" | "CUSTOMER_ORDER_COUNT" | "CUSTOMER_TOTAL_SPENT" | "CUSTOMER_AVERAGE_ORDER_VALUE" | "CUSTOMER_IS_VIP" | "PURCHASED_PRODUCT" | "PURCHASED_CATEGORY" | "CART_TOTAL" | "CART_ITEM_COUNT" | "CART_CONTAINS_PRODUCT" | "CART_CONTAINS_CATEGORY" | "FREE_SHIPPING_REMAINING" | "COUNTRY" | "REGION" | "CITY" | "UTM_SOURCE" | "UTM_CAMPAIGN" | "REFERRER_DOMAIN";
            value?: string | number | boolean | string[] | undefined;
        }[];
        logic: "AND" | "OR";
        exclusions: {
            id: string;
            operator: "GT" | "IN" | "LT" | "GTE" | "LTE" | "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "NOT_IN" | "NOT_CONTAINS" | "STARTS_WITH" | "MATCHES" | "IS_TRUE" | "IS_FALSE";
            field: "PAGE_TYPE" | "PAGE_PATH" | "PRODUCT_ID" | "CATEGORY_ID" | "DEVICE" | "LOCALE" | "AUTH_STATUS" | "VISITOR_TYPE" | "CUSTOMER_ORDER_COUNT" | "CUSTOMER_TOTAL_SPENT" | "CUSTOMER_AVERAGE_ORDER_VALUE" | "CUSTOMER_IS_VIP" | "PURCHASED_PRODUCT" | "PURCHASED_CATEGORY" | "CART_TOTAL" | "CART_ITEM_COUNT" | "CART_CONTAINS_PRODUCT" | "CART_CONTAINS_CATEGORY" | "FREE_SHIPPING_REMAINING" | "COUNTRY" | "REGION" | "CITY" | "UTM_SOURCE" | "UTM_CAMPAIGN" | "REFERRER_DOMAIN";
            value?: string | number | boolean | string[] | undefined;
        }[];
    };
    appearance: {
        width: "STANDARD" | "COMPACT" | "WIDE";
        alignment: "START" | "CENTER";
        icon: "NONE" | "TRUCK" | "SPARKLE" | "GIFT" | "MEGAPHONE" | "HEART" | "BELL";
        spacing: "COMPACT" | "COMFORTABLE" | "AIRY";
        layout: "IMAGE_TOP" | "SPLIT" | "TEXT_ONLY" | "IMAGE_BACKGROUND";
        animation: "NONE" | "SCALE" | "FADE" | "SLIDE" | "LIFT";
        overlayOpacity: number;
        surface: "SOLID" | "TINTED" | "GLASS";
        borderRadius: "NONE" | "SUBTLE" | "SOFT" | "ROUNDED";
        theme: "BRAND" | "IVORY" | "INK" | "SAGE" | "BLUSH" | "GOLD";
        maxWidth: number;
        imagePosition: "START" | "END" | "TOP" | "BACKGROUND";
        buttonStyle: "OUTLINE" | "SOLID" | "UNDERLINE";
        accentColor: string | null;
    };
    frequency: {
        mode: "ONCE_EVER" | "ONCE_PER_SESSION" | "ONCE_PER_DAY" | "EVERY_X_HOURS" | "EVERY_X_DAYS" | "MAX_IMPRESSIONS" | "UNTIL_INTERACTION" | "UNTIL_CONVERSION" | "UNTIL_CAMPAIGN_ENDS";
        interval: number;
        maxImpressions: number;
        afterDismiss: "DEFAULT" | "SESSION" | "HOURS" | "DAYS" | "NEVER";
        afterDismissInterval: number;
        afterPrimaryAction: "DEFAULT" | "SESSION" | "NEVER";
        afterConversion: "DEFAULT" | "NEVER";
    };
    collision: {
        queueBehavior: "QUEUE" | "SUPPRESS" | "REPLACE_LOWER";
        cooldownSeconds: number;
        suppressLowerPriority: boolean;
        exclusivityKey: string | null;
    };
    primaryAction: {
        type: "NONE" | "NAVIGATE" | "APPLY_COUPON" | "COPY_COUPON" | "CLOSE" | "SUBMIT_FORM";
        productId: string | null;
        url: string | null;
        categoryId: string | null;
        destination: "HOME" | "CATEGORY" | "PRODUCT" | "CART" | "ACCOUNT" | "URL" | null;
        openInNewTab: boolean;
        couponId: string | null;
        closeAfterAction: boolean;
    };
    secondaryAction: {
        type: "NONE" | "NAVIGATE" | "APPLY_COUPON" | "COPY_COUPON" | "CLOSE" | "SUBMIT_FORM";
        productId: string | null;
        url: string | null;
        categoryId: string | null;
        destination: "HOME" | "CATEGORY" | "PRODUCT" | "CART" | "ACCOUNT" | "URL" | null;
        openInNewTab: boolean;
        couponId: string | null;
        closeAfterAction: boolean;
    };
    form: {
        type: "NONE" | "NEWSLETTER" | "LEAD";
        collectName: boolean;
        collectEmail: boolean;
        collectPhone: boolean;
        consentRequired: boolean;
        successAutoCloseSeconds: number;
    };
    countdown: {
        enabled: boolean;
        mode: "CAMPAIGN_END" | "FIXED_TIMESTAMP";
        targetAt: string | null;
    };
}, {
    variants: {
        name: string;
        content: {
            locale: "en" | "ar";
            headline: string;
            eyebrow?: string | null | undefined;
            imageAlt?: string | null | undefined;
            disclaimer?: string | null | undefined;
            body?: string | null | undefined;
            primaryCtaLabel?: string | null | undefined;
            secondaryCtaLabel?: string | null | undefined;
            badge?: string | null | undefined;
            subtitle?: string | null | undefined;
            successHeadline?: string | null | undefined;
            successBody?: string | null | undefined;
            nameLabel?: string | null | undefined;
            emailLabel?: string | null | undefined;
            phoneLabel?: string | null | undefined;
            submitLabel?: string | null | undefined;
            consentLabel?: string | null | undefined;
        }[];
        id?: string | undefined;
        weight?: number | undefined;
        isControl?: boolean | undefined;
        appearanceOverride?: {
            width?: "STANDARD" | "COMPACT" | "WIDE" | undefined;
            alignment?: "START" | "CENTER" | undefined;
            icon?: "NONE" | "TRUCK" | "SPARKLE" | "GIFT" | "MEGAPHONE" | "HEART" | "BELL" | undefined;
            spacing?: "COMPACT" | "COMFORTABLE" | "AIRY" | undefined;
            layout?: "IMAGE_TOP" | "SPLIT" | "TEXT_ONLY" | "IMAGE_BACKGROUND" | undefined;
            animation?: "NONE" | "SCALE" | "FADE" | "SLIDE" | "LIFT" | undefined;
            overlayOpacity?: number | undefined;
            surface?: "SOLID" | "TINTED" | "GLASS" | undefined;
            borderRadius?: "NONE" | "SUBTLE" | "SOFT" | "ROUNDED" | undefined;
            theme?: "BRAND" | "IVORY" | "INK" | "SAGE" | "BLUSH" | "GOLD" | undefined;
            maxWidth?: number | undefined;
            imagePosition?: "START" | "END" | "TOP" | "BACKGROUND" | undefined;
            buttonStyle?: "OUTLINE" | "SOLID" | "UNDERLINE" | undefined;
            accentColor?: string | null | undefined;
        } | undefined;
    }[];
    internalName: string;
    type?: "FREE_SHIPPING" | "FIRST_ORDER" | "CUSTOM" | "PROMOTIONAL" | "SEASONAL" | "NEWSLETTER" | "PRODUCT_LAUNCH" | "DISCOUNT" | "WELCOME" | "EXIT_INTENT" | "ANNOUNCEMENT" | "PRODUCT_RECOMMENDATION" | "CART_REMINDER" | "LIMITED_TIME_SALE" | "RESTOCK" | "PRODUCT_SPECIFIC" | "CATEGORY_SPECIFIC" | "CROSS_SELL" | "ACCOUNT_ENCOURAGEMENT" | "LOGIN_REMINDER" | "LOYALTY_VIP" | "RETURNING_CUSTOMER" | "NEW_VISITOR" | "ORDER_UPDATE" | "STORE_PICKUP" | "DELIVERY_NOTICE" | "SYSTEM_NOTICE" | "MAINTENANCE" | undefined;
    productId?: string | null | undefined;
    promotionId?: string | null | undefined;
    categoryId?: string | null | undefined;
    trigger?: {
        type?: "EXIT_INTENT" | "IMMEDIATE" | "DELAY" | "SCROLL_DEPTH" | "INACTIVITY" | "PAGE_VIEWS" | "SESSION_DURATION" | "PRODUCT_VIEWS" | "ADD_TO_CART" | "REMOVE_FROM_CART" | "CART_THRESHOLD" | "FIRST_VISIT" | "RETURNING_SESSION" | "CUSTOM_EVENT" | undefined;
        categoryIds?: string[] | undefined;
        productIds?: string[] | undefined;
        delaySeconds?: number | undefined;
        scrollPercent?: number | undefined;
        inactivitySeconds?: number | undefined;
        pageViewCount?: number | undefined;
        sessionDurationSeconds?: number | undefined;
        productViewCount?: number | undefined;
        cartThreshold?: number | undefined;
        eventName?: string | null | undefined;
        mobileExitFallback?: "NONE" | "SCROLL_DEPTH" | "INACTIVITY" | undefined;
        mobileExitFallbackValue?: number | undefined;
    } | undefined;
    state?: "ACTIVE" | "ARCHIVED" | "DRAFT" | "PAUSED" | undefined;
    priority?: number | undefined;
    startsAt?: string | null | undefined;
    endsAt?: string | null | undefined;
    timezone?: string | undefined;
    mediaAssetId?: string | null | undefined;
    presentation?: {
        tablet?: "CENTER_MODAL" | "BOTTOM_SHEET" | "FLOATING_RIGHT" | "FLOATING_LEFT" | "TOP_BANNER" | "BOTTOM_BANNER" | "FULLSCREEN" | "SIDE_PANEL_RIGHT" | "SIDE_PANEL_LEFT" | "SLIDE_IN_RIGHT" | "SLIDE_IN_LEFT" | "PROMO_TOAST" | "ANNOUNCEMENT_BAR" | undefined;
        mobile?: "CENTER_MODAL" | "BOTTOM_SHEET" | "FLOATING_RIGHT" | "FLOATING_LEFT" | "TOP_BANNER" | "BOTTOM_BANNER" | "FULLSCREEN" | "SIDE_PANEL_RIGHT" | "SIDE_PANEL_LEFT" | "SLIDE_IN_RIGHT" | "SLIDE_IN_LEFT" | "PROMO_TOAST" | "ANNOUNCEMENT_BAR" | undefined;
        desktop?: "CENTER_MODAL" | "BOTTOM_SHEET" | "FLOATING_RIGHT" | "FLOATING_LEFT" | "TOP_BANNER" | "BOTTOM_BANNER" | "FULLSCREEN" | "SIDE_PANEL_RIGHT" | "SIDE_PANEL_LEFT" | "SLIDE_IN_RIGHT" | "SLIDE_IN_LEFT" | "PROMO_TOAST" | "ANNOUNCEMENT_BAR" | undefined;
        dismissible?: boolean | undefined;
        closeOnOverlay?: boolean | undefined;
        closeOnEscape?: boolean | undefined;
    } | undefined;
    couponId?: string | null | undefined;
    recurringSchedule?: {
        enabled?: boolean | undefined;
        weekdays?: number[] | undefined;
        startTime?: string | undefined;
        endTime?: string | undefined;
    } | null | undefined;
    targeting?: {
        rules?: {
            id: string;
            operator: "GT" | "IN" | "LT" | "GTE" | "LTE" | "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "NOT_IN" | "NOT_CONTAINS" | "STARTS_WITH" | "MATCHES" | "IS_TRUE" | "IS_FALSE";
            field: "PAGE_TYPE" | "PAGE_PATH" | "PRODUCT_ID" | "CATEGORY_ID" | "DEVICE" | "LOCALE" | "AUTH_STATUS" | "VISITOR_TYPE" | "CUSTOMER_ORDER_COUNT" | "CUSTOMER_TOTAL_SPENT" | "CUSTOMER_AVERAGE_ORDER_VALUE" | "CUSTOMER_IS_VIP" | "PURCHASED_PRODUCT" | "PURCHASED_CATEGORY" | "CART_TOTAL" | "CART_ITEM_COUNT" | "CART_CONTAINS_PRODUCT" | "CART_CONTAINS_CATEGORY" | "FREE_SHIPPING_REMAINING" | "COUNTRY" | "REGION" | "CITY" | "UTM_SOURCE" | "UTM_CAMPAIGN" | "REFERRER_DOMAIN";
            value?: string | number | boolean | string[] | undefined;
        }[] | undefined;
        logic?: "AND" | "OR" | undefined;
        exclusions?: {
            id: string;
            operator: "GT" | "IN" | "LT" | "GTE" | "LTE" | "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "NOT_IN" | "NOT_CONTAINS" | "STARTS_WITH" | "MATCHES" | "IS_TRUE" | "IS_FALSE";
            field: "PAGE_TYPE" | "PAGE_PATH" | "PRODUCT_ID" | "CATEGORY_ID" | "DEVICE" | "LOCALE" | "AUTH_STATUS" | "VISITOR_TYPE" | "CUSTOMER_ORDER_COUNT" | "CUSTOMER_TOTAL_SPENT" | "CUSTOMER_AVERAGE_ORDER_VALUE" | "CUSTOMER_IS_VIP" | "PURCHASED_PRODUCT" | "PURCHASED_CATEGORY" | "CART_TOTAL" | "CART_ITEM_COUNT" | "CART_CONTAINS_PRODUCT" | "CART_CONTAINS_CATEGORY" | "FREE_SHIPPING_REMAINING" | "COUNTRY" | "REGION" | "CITY" | "UTM_SOURCE" | "UTM_CAMPAIGN" | "REFERRER_DOMAIN";
            value?: string | number | boolean | string[] | undefined;
        }[] | undefined;
    } | undefined;
    appearance?: {
        width?: "STANDARD" | "COMPACT" | "WIDE" | undefined;
        alignment?: "START" | "CENTER" | undefined;
        icon?: "NONE" | "TRUCK" | "SPARKLE" | "GIFT" | "MEGAPHONE" | "HEART" | "BELL" | undefined;
        spacing?: "COMPACT" | "COMFORTABLE" | "AIRY" | undefined;
        layout?: "IMAGE_TOP" | "SPLIT" | "TEXT_ONLY" | "IMAGE_BACKGROUND" | undefined;
        animation?: "NONE" | "SCALE" | "FADE" | "SLIDE" | "LIFT" | undefined;
        overlayOpacity?: number | undefined;
        surface?: "SOLID" | "TINTED" | "GLASS" | undefined;
        borderRadius?: "NONE" | "SUBTLE" | "SOFT" | "ROUNDED" | undefined;
        theme?: "BRAND" | "IVORY" | "INK" | "SAGE" | "BLUSH" | "GOLD" | undefined;
        maxWidth?: number | undefined;
        imagePosition?: "START" | "END" | "TOP" | "BACKGROUND" | undefined;
        buttonStyle?: "OUTLINE" | "SOLID" | "UNDERLINE" | undefined;
        accentColor?: string | null | undefined;
    } | undefined;
    frequency?: {
        mode?: "ONCE_EVER" | "ONCE_PER_SESSION" | "ONCE_PER_DAY" | "EVERY_X_HOURS" | "EVERY_X_DAYS" | "MAX_IMPRESSIONS" | "UNTIL_INTERACTION" | "UNTIL_CONVERSION" | "UNTIL_CAMPAIGN_ENDS" | undefined;
        interval?: number | undefined;
        maxImpressions?: number | undefined;
        afterDismiss?: "DEFAULT" | "SESSION" | "HOURS" | "DAYS" | "NEVER" | undefined;
        afterDismissInterval?: number | undefined;
        afterPrimaryAction?: "DEFAULT" | "SESSION" | "NEVER" | undefined;
        afterConversion?: "DEFAULT" | "NEVER" | undefined;
    } | undefined;
    collision?: {
        queueBehavior?: "QUEUE" | "SUPPRESS" | "REPLACE_LOWER" | undefined;
        cooldownSeconds?: number | undefined;
        suppressLowerPriority?: boolean | undefined;
        exclusivityKey?: string | null | undefined;
    } | undefined;
    primaryAction?: {
        type?: "NONE" | "NAVIGATE" | "APPLY_COUPON" | "COPY_COUPON" | "CLOSE" | "SUBMIT_FORM" | undefined;
        productId?: string | null | undefined;
        url?: string | null | undefined;
        categoryId?: string | null | undefined;
        destination?: "HOME" | "CATEGORY" | "PRODUCT" | "CART" | "ACCOUNT" | "URL" | null | undefined;
        openInNewTab?: boolean | undefined;
        couponId?: string | null | undefined;
        closeAfterAction?: boolean | undefined;
    } | undefined;
    secondaryAction?: {
        type?: "NONE" | "NAVIGATE" | "APPLY_COUPON" | "COPY_COUPON" | "CLOSE" | "SUBMIT_FORM" | undefined;
        productId?: string | null | undefined;
        url?: string | null | undefined;
        categoryId?: string | null | undefined;
        destination?: "HOME" | "CATEGORY" | "PRODUCT" | "CART" | "ACCOUNT" | "URL" | null | undefined;
        openInNewTab?: boolean | undefined;
        couponId?: string | null | undefined;
        closeAfterAction?: boolean | undefined;
    } | undefined;
    form?: {
        type?: "NONE" | "NEWSLETTER" | "LEAD" | undefined;
        collectName?: boolean | undefined;
        collectEmail?: boolean | undefined;
        collectPhone?: boolean | undefined;
        consentRequired?: boolean | undefined;
        successAutoCloseSeconds?: number | undefined;
    } | undefined;
    countdown?: {
        enabled?: boolean | undefined;
        mode?: "CAMPAIGN_END" | "FIXED_TIMESTAMP" | undefined;
        targetAt?: string | null | undefined;
    } | undefined;
}>, {
    type: "FREE_SHIPPING" | "FIRST_ORDER" | "CUSTOM" | "PROMOTIONAL" | "SEASONAL" | "NEWSLETTER" | "PRODUCT_LAUNCH" | "DISCOUNT" | "WELCOME" | "EXIT_INTENT" | "ANNOUNCEMENT" | "PRODUCT_RECOMMENDATION" | "CART_REMINDER" | "LIMITED_TIME_SALE" | "RESTOCK" | "PRODUCT_SPECIFIC" | "CATEGORY_SPECIFIC" | "CROSS_SELL" | "ACCOUNT_ENCOURAGEMENT" | "LOGIN_REMINDER" | "LOYALTY_VIP" | "RETURNING_CUSTOMER" | "NEW_VISITOR" | "ORDER_UPDATE" | "STORE_PICKUP" | "DELIVERY_NOTICE" | "SYSTEM_NOTICE" | "MAINTENANCE";
    productId: string | null;
    promotionId: string | null;
    categoryId: string | null;
    variants: {
        name: string;
        weight: number;
        isControl: boolean;
        content: {
            eyebrow: string | null;
            imageAlt: string | null;
            disclaimer: string | null;
            locale: "en" | "ar";
            body: string | null;
            primaryCtaLabel: string | null;
            secondaryCtaLabel: string | null;
            badge: string | null;
            headline: string;
            subtitle: string | null;
            successHeadline: string | null;
            successBody: string | null;
            nameLabel: string | null;
            emailLabel: string | null;
            phoneLabel: string | null;
            submitLabel: string | null;
            consentLabel: string | null;
        }[];
        appearanceOverride: {
            width?: "STANDARD" | "COMPACT" | "WIDE" | undefined;
            alignment?: "START" | "CENTER" | undefined;
            icon?: "NONE" | "TRUCK" | "SPARKLE" | "GIFT" | "MEGAPHONE" | "HEART" | "BELL" | undefined;
            spacing?: "COMPACT" | "COMFORTABLE" | "AIRY" | undefined;
            layout?: "IMAGE_TOP" | "SPLIT" | "TEXT_ONLY" | "IMAGE_BACKGROUND" | undefined;
            animation?: "NONE" | "SCALE" | "FADE" | "SLIDE" | "LIFT" | undefined;
            overlayOpacity?: number | undefined;
            surface?: "SOLID" | "TINTED" | "GLASS" | undefined;
            borderRadius?: "NONE" | "SUBTLE" | "SOFT" | "ROUNDED" | undefined;
            theme?: "BRAND" | "IVORY" | "INK" | "SAGE" | "BLUSH" | "GOLD" | undefined;
            maxWidth?: number | undefined;
            imagePosition?: "START" | "END" | "TOP" | "BACKGROUND" | undefined;
            buttonStyle?: "OUTLINE" | "SOLID" | "UNDERLINE" | undefined;
            accentColor?: string | null | undefined;
        };
        id?: string | undefined;
    }[];
    trigger: {
        type: "EXIT_INTENT" | "IMMEDIATE" | "DELAY" | "SCROLL_DEPTH" | "INACTIVITY" | "PAGE_VIEWS" | "SESSION_DURATION" | "PRODUCT_VIEWS" | "ADD_TO_CART" | "REMOVE_FROM_CART" | "CART_THRESHOLD" | "FIRST_VISIT" | "RETURNING_SESSION" | "CUSTOM_EVENT";
        categoryIds: string[];
        productIds: string[];
        delaySeconds: number;
        scrollPercent: number;
        inactivitySeconds: number;
        pageViewCount: number;
        sessionDurationSeconds: number;
        productViewCount: number;
        cartThreshold: number;
        eventName: string | null;
        mobileExitFallback: "NONE" | "SCROLL_DEPTH" | "INACTIVITY";
        mobileExitFallbackValue: number;
    };
    state: "ACTIVE" | "ARCHIVED" | "DRAFT" | "PAUSED";
    priority: number;
    startsAt: string | null;
    endsAt: string | null;
    timezone: string;
    mediaAssetId: string | null;
    presentation: {
        tablet: "CENTER_MODAL" | "BOTTOM_SHEET" | "FLOATING_RIGHT" | "FLOATING_LEFT" | "TOP_BANNER" | "BOTTOM_BANNER" | "FULLSCREEN" | "SIDE_PANEL_RIGHT" | "SIDE_PANEL_LEFT" | "SLIDE_IN_RIGHT" | "SLIDE_IN_LEFT" | "PROMO_TOAST" | "ANNOUNCEMENT_BAR";
        mobile: "CENTER_MODAL" | "BOTTOM_SHEET" | "FLOATING_RIGHT" | "FLOATING_LEFT" | "TOP_BANNER" | "BOTTOM_BANNER" | "FULLSCREEN" | "SIDE_PANEL_RIGHT" | "SIDE_PANEL_LEFT" | "SLIDE_IN_RIGHT" | "SLIDE_IN_LEFT" | "PROMO_TOAST" | "ANNOUNCEMENT_BAR";
        desktop: "CENTER_MODAL" | "BOTTOM_SHEET" | "FLOATING_RIGHT" | "FLOATING_LEFT" | "TOP_BANNER" | "BOTTOM_BANNER" | "FULLSCREEN" | "SIDE_PANEL_RIGHT" | "SIDE_PANEL_LEFT" | "SLIDE_IN_RIGHT" | "SLIDE_IN_LEFT" | "PROMO_TOAST" | "ANNOUNCEMENT_BAR";
        dismissible: boolean;
        closeOnOverlay: boolean;
        closeOnEscape: boolean;
    };
    internalName: string;
    couponId: string | null;
    recurringSchedule: {
        enabled: boolean;
        weekdays: number[];
        startTime: string;
        endTime: string;
    } | null;
    targeting: {
        rules: {
            id: string;
            operator: "GT" | "IN" | "LT" | "GTE" | "LTE" | "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "NOT_IN" | "NOT_CONTAINS" | "STARTS_WITH" | "MATCHES" | "IS_TRUE" | "IS_FALSE";
            field: "PAGE_TYPE" | "PAGE_PATH" | "PRODUCT_ID" | "CATEGORY_ID" | "DEVICE" | "LOCALE" | "AUTH_STATUS" | "VISITOR_TYPE" | "CUSTOMER_ORDER_COUNT" | "CUSTOMER_TOTAL_SPENT" | "CUSTOMER_AVERAGE_ORDER_VALUE" | "CUSTOMER_IS_VIP" | "PURCHASED_PRODUCT" | "PURCHASED_CATEGORY" | "CART_TOTAL" | "CART_ITEM_COUNT" | "CART_CONTAINS_PRODUCT" | "CART_CONTAINS_CATEGORY" | "FREE_SHIPPING_REMAINING" | "COUNTRY" | "REGION" | "CITY" | "UTM_SOURCE" | "UTM_CAMPAIGN" | "REFERRER_DOMAIN";
            value?: string | number | boolean | string[] | undefined;
        }[];
        logic: "AND" | "OR";
        exclusions: {
            id: string;
            operator: "GT" | "IN" | "LT" | "GTE" | "LTE" | "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "NOT_IN" | "NOT_CONTAINS" | "STARTS_WITH" | "MATCHES" | "IS_TRUE" | "IS_FALSE";
            field: "PAGE_TYPE" | "PAGE_PATH" | "PRODUCT_ID" | "CATEGORY_ID" | "DEVICE" | "LOCALE" | "AUTH_STATUS" | "VISITOR_TYPE" | "CUSTOMER_ORDER_COUNT" | "CUSTOMER_TOTAL_SPENT" | "CUSTOMER_AVERAGE_ORDER_VALUE" | "CUSTOMER_IS_VIP" | "PURCHASED_PRODUCT" | "PURCHASED_CATEGORY" | "CART_TOTAL" | "CART_ITEM_COUNT" | "CART_CONTAINS_PRODUCT" | "CART_CONTAINS_CATEGORY" | "FREE_SHIPPING_REMAINING" | "COUNTRY" | "REGION" | "CITY" | "UTM_SOURCE" | "UTM_CAMPAIGN" | "REFERRER_DOMAIN";
            value?: string | number | boolean | string[] | undefined;
        }[];
    };
    appearance: {
        width: "STANDARD" | "COMPACT" | "WIDE";
        alignment: "START" | "CENTER";
        icon: "NONE" | "TRUCK" | "SPARKLE" | "GIFT" | "MEGAPHONE" | "HEART" | "BELL";
        spacing: "COMPACT" | "COMFORTABLE" | "AIRY";
        layout: "IMAGE_TOP" | "SPLIT" | "TEXT_ONLY" | "IMAGE_BACKGROUND";
        animation: "NONE" | "SCALE" | "FADE" | "SLIDE" | "LIFT";
        overlayOpacity: number;
        surface: "SOLID" | "TINTED" | "GLASS";
        borderRadius: "NONE" | "SUBTLE" | "SOFT" | "ROUNDED";
        theme: "BRAND" | "IVORY" | "INK" | "SAGE" | "BLUSH" | "GOLD";
        maxWidth: number;
        imagePosition: "START" | "END" | "TOP" | "BACKGROUND";
        buttonStyle: "OUTLINE" | "SOLID" | "UNDERLINE";
        accentColor: string | null;
    };
    frequency: {
        mode: "ONCE_EVER" | "ONCE_PER_SESSION" | "ONCE_PER_DAY" | "EVERY_X_HOURS" | "EVERY_X_DAYS" | "MAX_IMPRESSIONS" | "UNTIL_INTERACTION" | "UNTIL_CONVERSION" | "UNTIL_CAMPAIGN_ENDS";
        interval: number;
        maxImpressions: number;
        afterDismiss: "DEFAULT" | "SESSION" | "HOURS" | "DAYS" | "NEVER";
        afterDismissInterval: number;
        afterPrimaryAction: "DEFAULT" | "SESSION" | "NEVER";
        afterConversion: "DEFAULT" | "NEVER";
    };
    collision: {
        queueBehavior: "QUEUE" | "SUPPRESS" | "REPLACE_LOWER";
        cooldownSeconds: number;
        suppressLowerPriority: boolean;
        exclusivityKey: string | null;
    };
    primaryAction: {
        type: "NONE" | "NAVIGATE" | "APPLY_COUPON" | "COPY_COUPON" | "CLOSE" | "SUBMIT_FORM";
        productId: string | null;
        url: string | null;
        categoryId: string | null;
        destination: "HOME" | "CATEGORY" | "PRODUCT" | "CART" | "ACCOUNT" | "URL" | null;
        openInNewTab: boolean;
        couponId: string | null;
        closeAfterAction: boolean;
    };
    secondaryAction: {
        type: "NONE" | "NAVIGATE" | "APPLY_COUPON" | "COPY_COUPON" | "CLOSE" | "SUBMIT_FORM";
        productId: string | null;
        url: string | null;
        categoryId: string | null;
        destination: "HOME" | "CATEGORY" | "PRODUCT" | "CART" | "ACCOUNT" | "URL" | null;
        openInNewTab: boolean;
        couponId: string | null;
        closeAfterAction: boolean;
    };
    form: {
        type: "NONE" | "NEWSLETTER" | "LEAD";
        collectName: boolean;
        collectEmail: boolean;
        collectPhone: boolean;
        consentRequired: boolean;
        successAutoCloseSeconds: number;
    };
    countdown: {
        enabled: boolean;
        mode: "CAMPAIGN_END" | "FIXED_TIMESTAMP";
        targetAt: string | null;
    };
}, {
    variants: {
        name: string;
        content: {
            locale: "en" | "ar";
            headline: string;
            eyebrow?: string | null | undefined;
            imageAlt?: string | null | undefined;
            disclaimer?: string | null | undefined;
            body?: string | null | undefined;
            primaryCtaLabel?: string | null | undefined;
            secondaryCtaLabel?: string | null | undefined;
            badge?: string | null | undefined;
            subtitle?: string | null | undefined;
            successHeadline?: string | null | undefined;
            successBody?: string | null | undefined;
            nameLabel?: string | null | undefined;
            emailLabel?: string | null | undefined;
            phoneLabel?: string | null | undefined;
            submitLabel?: string | null | undefined;
            consentLabel?: string | null | undefined;
        }[];
        id?: string | undefined;
        weight?: number | undefined;
        isControl?: boolean | undefined;
        appearanceOverride?: {
            width?: "STANDARD" | "COMPACT" | "WIDE" | undefined;
            alignment?: "START" | "CENTER" | undefined;
            icon?: "NONE" | "TRUCK" | "SPARKLE" | "GIFT" | "MEGAPHONE" | "HEART" | "BELL" | undefined;
            spacing?: "COMPACT" | "COMFORTABLE" | "AIRY" | undefined;
            layout?: "IMAGE_TOP" | "SPLIT" | "TEXT_ONLY" | "IMAGE_BACKGROUND" | undefined;
            animation?: "NONE" | "SCALE" | "FADE" | "SLIDE" | "LIFT" | undefined;
            overlayOpacity?: number | undefined;
            surface?: "SOLID" | "TINTED" | "GLASS" | undefined;
            borderRadius?: "NONE" | "SUBTLE" | "SOFT" | "ROUNDED" | undefined;
            theme?: "BRAND" | "IVORY" | "INK" | "SAGE" | "BLUSH" | "GOLD" | undefined;
            maxWidth?: number | undefined;
            imagePosition?: "START" | "END" | "TOP" | "BACKGROUND" | undefined;
            buttonStyle?: "OUTLINE" | "SOLID" | "UNDERLINE" | undefined;
            accentColor?: string | null | undefined;
        } | undefined;
    }[];
    internalName: string;
    type?: "FREE_SHIPPING" | "FIRST_ORDER" | "CUSTOM" | "PROMOTIONAL" | "SEASONAL" | "NEWSLETTER" | "PRODUCT_LAUNCH" | "DISCOUNT" | "WELCOME" | "EXIT_INTENT" | "ANNOUNCEMENT" | "PRODUCT_RECOMMENDATION" | "CART_REMINDER" | "LIMITED_TIME_SALE" | "RESTOCK" | "PRODUCT_SPECIFIC" | "CATEGORY_SPECIFIC" | "CROSS_SELL" | "ACCOUNT_ENCOURAGEMENT" | "LOGIN_REMINDER" | "LOYALTY_VIP" | "RETURNING_CUSTOMER" | "NEW_VISITOR" | "ORDER_UPDATE" | "STORE_PICKUP" | "DELIVERY_NOTICE" | "SYSTEM_NOTICE" | "MAINTENANCE" | undefined;
    productId?: string | null | undefined;
    promotionId?: string | null | undefined;
    categoryId?: string | null | undefined;
    trigger?: {
        type?: "EXIT_INTENT" | "IMMEDIATE" | "DELAY" | "SCROLL_DEPTH" | "INACTIVITY" | "PAGE_VIEWS" | "SESSION_DURATION" | "PRODUCT_VIEWS" | "ADD_TO_CART" | "REMOVE_FROM_CART" | "CART_THRESHOLD" | "FIRST_VISIT" | "RETURNING_SESSION" | "CUSTOM_EVENT" | undefined;
        categoryIds?: string[] | undefined;
        productIds?: string[] | undefined;
        delaySeconds?: number | undefined;
        scrollPercent?: number | undefined;
        inactivitySeconds?: number | undefined;
        pageViewCount?: number | undefined;
        sessionDurationSeconds?: number | undefined;
        productViewCount?: number | undefined;
        cartThreshold?: number | undefined;
        eventName?: string | null | undefined;
        mobileExitFallback?: "NONE" | "SCROLL_DEPTH" | "INACTIVITY" | undefined;
        mobileExitFallbackValue?: number | undefined;
    } | undefined;
    state?: "ACTIVE" | "ARCHIVED" | "DRAFT" | "PAUSED" | undefined;
    priority?: number | undefined;
    startsAt?: string | null | undefined;
    endsAt?: string | null | undefined;
    timezone?: string | undefined;
    mediaAssetId?: string | null | undefined;
    presentation?: {
        tablet?: "CENTER_MODAL" | "BOTTOM_SHEET" | "FLOATING_RIGHT" | "FLOATING_LEFT" | "TOP_BANNER" | "BOTTOM_BANNER" | "FULLSCREEN" | "SIDE_PANEL_RIGHT" | "SIDE_PANEL_LEFT" | "SLIDE_IN_RIGHT" | "SLIDE_IN_LEFT" | "PROMO_TOAST" | "ANNOUNCEMENT_BAR" | undefined;
        mobile?: "CENTER_MODAL" | "BOTTOM_SHEET" | "FLOATING_RIGHT" | "FLOATING_LEFT" | "TOP_BANNER" | "BOTTOM_BANNER" | "FULLSCREEN" | "SIDE_PANEL_RIGHT" | "SIDE_PANEL_LEFT" | "SLIDE_IN_RIGHT" | "SLIDE_IN_LEFT" | "PROMO_TOAST" | "ANNOUNCEMENT_BAR" | undefined;
        desktop?: "CENTER_MODAL" | "BOTTOM_SHEET" | "FLOATING_RIGHT" | "FLOATING_LEFT" | "TOP_BANNER" | "BOTTOM_BANNER" | "FULLSCREEN" | "SIDE_PANEL_RIGHT" | "SIDE_PANEL_LEFT" | "SLIDE_IN_RIGHT" | "SLIDE_IN_LEFT" | "PROMO_TOAST" | "ANNOUNCEMENT_BAR" | undefined;
        dismissible?: boolean | undefined;
        closeOnOverlay?: boolean | undefined;
        closeOnEscape?: boolean | undefined;
    } | undefined;
    couponId?: string | null | undefined;
    recurringSchedule?: {
        enabled?: boolean | undefined;
        weekdays?: number[] | undefined;
        startTime?: string | undefined;
        endTime?: string | undefined;
    } | null | undefined;
    targeting?: {
        rules?: {
            id: string;
            operator: "GT" | "IN" | "LT" | "GTE" | "LTE" | "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "NOT_IN" | "NOT_CONTAINS" | "STARTS_WITH" | "MATCHES" | "IS_TRUE" | "IS_FALSE";
            field: "PAGE_TYPE" | "PAGE_PATH" | "PRODUCT_ID" | "CATEGORY_ID" | "DEVICE" | "LOCALE" | "AUTH_STATUS" | "VISITOR_TYPE" | "CUSTOMER_ORDER_COUNT" | "CUSTOMER_TOTAL_SPENT" | "CUSTOMER_AVERAGE_ORDER_VALUE" | "CUSTOMER_IS_VIP" | "PURCHASED_PRODUCT" | "PURCHASED_CATEGORY" | "CART_TOTAL" | "CART_ITEM_COUNT" | "CART_CONTAINS_PRODUCT" | "CART_CONTAINS_CATEGORY" | "FREE_SHIPPING_REMAINING" | "COUNTRY" | "REGION" | "CITY" | "UTM_SOURCE" | "UTM_CAMPAIGN" | "REFERRER_DOMAIN";
            value?: string | number | boolean | string[] | undefined;
        }[] | undefined;
        logic?: "AND" | "OR" | undefined;
        exclusions?: {
            id: string;
            operator: "GT" | "IN" | "LT" | "GTE" | "LTE" | "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "NOT_IN" | "NOT_CONTAINS" | "STARTS_WITH" | "MATCHES" | "IS_TRUE" | "IS_FALSE";
            field: "PAGE_TYPE" | "PAGE_PATH" | "PRODUCT_ID" | "CATEGORY_ID" | "DEVICE" | "LOCALE" | "AUTH_STATUS" | "VISITOR_TYPE" | "CUSTOMER_ORDER_COUNT" | "CUSTOMER_TOTAL_SPENT" | "CUSTOMER_AVERAGE_ORDER_VALUE" | "CUSTOMER_IS_VIP" | "PURCHASED_PRODUCT" | "PURCHASED_CATEGORY" | "CART_TOTAL" | "CART_ITEM_COUNT" | "CART_CONTAINS_PRODUCT" | "CART_CONTAINS_CATEGORY" | "FREE_SHIPPING_REMAINING" | "COUNTRY" | "REGION" | "CITY" | "UTM_SOURCE" | "UTM_CAMPAIGN" | "REFERRER_DOMAIN";
            value?: string | number | boolean | string[] | undefined;
        }[] | undefined;
    } | undefined;
    appearance?: {
        width?: "STANDARD" | "COMPACT" | "WIDE" | undefined;
        alignment?: "START" | "CENTER" | undefined;
        icon?: "NONE" | "TRUCK" | "SPARKLE" | "GIFT" | "MEGAPHONE" | "HEART" | "BELL" | undefined;
        spacing?: "COMPACT" | "COMFORTABLE" | "AIRY" | undefined;
        layout?: "IMAGE_TOP" | "SPLIT" | "TEXT_ONLY" | "IMAGE_BACKGROUND" | undefined;
        animation?: "NONE" | "SCALE" | "FADE" | "SLIDE" | "LIFT" | undefined;
        overlayOpacity?: number | undefined;
        surface?: "SOLID" | "TINTED" | "GLASS" | undefined;
        borderRadius?: "NONE" | "SUBTLE" | "SOFT" | "ROUNDED" | undefined;
        theme?: "BRAND" | "IVORY" | "INK" | "SAGE" | "BLUSH" | "GOLD" | undefined;
        maxWidth?: number | undefined;
        imagePosition?: "START" | "END" | "TOP" | "BACKGROUND" | undefined;
        buttonStyle?: "OUTLINE" | "SOLID" | "UNDERLINE" | undefined;
        accentColor?: string | null | undefined;
    } | undefined;
    frequency?: {
        mode?: "ONCE_EVER" | "ONCE_PER_SESSION" | "ONCE_PER_DAY" | "EVERY_X_HOURS" | "EVERY_X_DAYS" | "MAX_IMPRESSIONS" | "UNTIL_INTERACTION" | "UNTIL_CONVERSION" | "UNTIL_CAMPAIGN_ENDS" | undefined;
        interval?: number | undefined;
        maxImpressions?: number | undefined;
        afterDismiss?: "DEFAULT" | "SESSION" | "HOURS" | "DAYS" | "NEVER" | undefined;
        afterDismissInterval?: number | undefined;
        afterPrimaryAction?: "DEFAULT" | "SESSION" | "NEVER" | undefined;
        afterConversion?: "DEFAULT" | "NEVER" | undefined;
    } | undefined;
    collision?: {
        queueBehavior?: "QUEUE" | "SUPPRESS" | "REPLACE_LOWER" | undefined;
        cooldownSeconds?: number | undefined;
        suppressLowerPriority?: boolean | undefined;
        exclusivityKey?: string | null | undefined;
    } | undefined;
    primaryAction?: {
        type?: "NONE" | "NAVIGATE" | "APPLY_COUPON" | "COPY_COUPON" | "CLOSE" | "SUBMIT_FORM" | undefined;
        productId?: string | null | undefined;
        url?: string | null | undefined;
        categoryId?: string | null | undefined;
        destination?: "HOME" | "CATEGORY" | "PRODUCT" | "CART" | "ACCOUNT" | "URL" | null | undefined;
        openInNewTab?: boolean | undefined;
        couponId?: string | null | undefined;
        closeAfterAction?: boolean | undefined;
    } | undefined;
    secondaryAction?: {
        type?: "NONE" | "NAVIGATE" | "APPLY_COUPON" | "COPY_COUPON" | "CLOSE" | "SUBMIT_FORM" | undefined;
        productId?: string | null | undefined;
        url?: string | null | undefined;
        categoryId?: string | null | undefined;
        destination?: "HOME" | "CATEGORY" | "PRODUCT" | "CART" | "ACCOUNT" | "URL" | null | undefined;
        openInNewTab?: boolean | undefined;
        couponId?: string | null | undefined;
        closeAfterAction?: boolean | undefined;
    } | undefined;
    form?: {
        type?: "NONE" | "NEWSLETTER" | "LEAD" | undefined;
        collectName?: boolean | undefined;
        collectEmail?: boolean | undefined;
        collectPhone?: boolean | undefined;
        consentRequired?: boolean | undefined;
        successAutoCloseSeconds?: number | undefined;
    } | undefined;
    countdown?: {
        enabled?: boolean | undefined;
        mode?: "CAMPAIGN_END" | "FIXED_TIMESTAMP" | undefined;
        targetAt?: string | null | undefined;
    } | undefined;
}>;
export type CreatePopupCampaignInput = z.infer<typeof createPopupCampaignSchema>;
export declare const updatePopupCampaignSchema: z.ZodRecord<z.ZodString, z.ZodUnknown>;
export declare const popupCampaignQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    sortOrder: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
} & {
    search: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<["DRAFT", "SCHEDULED", "ACTIVE", "PAUSED", "ENDED", "ARCHIVED"]>>;
    type: z.ZodOptional<z.ZodEnum<["PROMOTIONAL", "DISCOUNT", "NEWSLETTER", "WELCOME", "FIRST_ORDER", "EXIT_INTENT", "ANNOUNCEMENT", "PRODUCT_RECOMMENDATION", "CART_REMINDER", "FREE_SHIPPING", "LIMITED_TIME_SALE", "PRODUCT_LAUNCH", "RESTOCK", "PRODUCT_SPECIFIC", "CATEGORY_SPECIFIC", "CROSS_SELL", "ACCOUNT_ENCOURAGEMENT", "LOGIN_REMINDER", "LOYALTY_VIP", "RETURNING_CUSTOMER", "NEW_VISITOR", "ORDER_UPDATE", "STORE_PICKUP", "DELIVERY_NOTICE", "SYSTEM_NOTICE", "MAINTENANCE", "SEASONAL", "CUSTOM"]>>;
    sortBy: z.ZodDefault<z.ZodEnum<["updatedAt", "createdAt", "priority", "startsAt", "name", "impressions"]>>;
}, "strip", z.ZodTypeAny, {
    page: number;
    limit: number;
    sortBy: "createdAt" | "updatedAt" | "name" | "priority" | "startsAt" | "impressions";
    sortOrder: "asc" | "desc";
    type?: "FREE_SHIPPING" | "FIRST_ORDER" | "CUSTOM" | "PROMOTIONAL" | "SEASONAL" | "NEWSLETTER" | "PRODUCT_LAUNCH" | "DISCOUNT" | "WELCOME" | "EXIT_INTENT" | "ANNOUNCEMENT" | "PRODUCT_RECOMMENDATION" | "CART_REMINDER" | "LIMITED_TIME_SALE" | "RESTOCK" | "PRODUCT_SPECIFIC" | "CATEGORY_SPECIFIC" | "CROSS_SELL" | "ACCOUNT_ENCOURAGEMENT" | "LOGIN_REMINDER" | "LOYALTY_VIP" | "RETURNING_CUSTOMER" | "NEW_VISITOR" | "ORDER_UPDATE" | "STORE_PICKUP" | "DELIVERY_NOTICE" | "SYSTEM_NOTICE" | "MAINTENANCE" | undefined;
    status?: "ACTIVE" | "ARCHIVED" | "DRAFT" | "PAUSED" | "SCHEDULED" | "ENDED" | undefined;
    search?: string | undefined;
}, {
    type?: "FREE_SHIPPING" | "FIRST_ORDER" | "CUSTOM" | "PROMOTIONAL" | "SEASONAL" | "NEWSLETTER" | "PRODUCT_LAUNCH" | "DISCOUNT" | "WELCOME" | "EXIT_INTENT" | "ANNOUNCEMENT" | "PRODUCT_RECOMMENDATION" | "CART_REMINDER" | "LIMITED_TIME_SALE" | "RESTOCK" | "PRODUCT_SPECIFIC" | "CATEGORY_SPECIFIC" | "CROSS_SELL" | "ACCOUNT_ENCOURAGEMENT" | "LOGIN_REMINDER" | "LOYALTY_VIP" | "RETURNING_CUSTOMER" | "NEW_VISITOR" | "ORDER_UPDATE" | "STORE_PICKUP" | "DELIVERY_NOTICE" | "SYSTEM_NOTICE" | "MAINTENANCE" | undefined;
    status?: "ACTIVE" | "ARCHIVED" | "DRAFT" | "PAUSED" | "SCHEDULED" | "ENDED" | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sortBy?: "createdAt" | "updatedAt" | "name" | "priority" | "startsAt" | "impressions" | undefined;
    sortOrder?: "asc" | "desc" | undefined;
    search?: string | undefined;
}>;
export type PopupCampaignQuery = z.infer<typeof popupCampaignQuerySchema>;
export declare const popupAnalyticsQuerySchema: z.ZodEffects<z.ZodObject<{
    range: z.ZodDefault<z.ZodEnum<["24h", "7d", "30d", "custom"]>>;
    from: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    to: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    timezone: z.ZodDefault<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    timezone: string;
    range: "custom" | "24h" | "7d" | "30d";
    from: string | null;
    to: string | null;
}, {
    timezone?: string | undefined;
    range?: "custom" | "24h" | "7d" | "30d" | undefined;
    from?: string | null | undefined;
    to?: string | null | undefined;
}>, {
    timezone: string;
    range: "custom" | "24h" | "7d" | "30d";
    from: string | null;
    to: string | null;
}, {
    timezone?: string | undefined;
    range?: "custom" | "24h" | "7d" | "30d" | undefined;
    from?: string | null | undefined;
    to?: string | null | undefined;
}>;
export declare const popupDeviceSchema: z.ZodEnum<["desktop", "tablet", "mobile"]>;
export declare const popupStorefrontContextSchema: z.ZodObject<{
    locale: z.ZodDefault<z.ZodEnum<["en", "ar"]>>;
    device: z.ZodDefault<z.ZodEnum<["desktop", "tablet", "mobile"]>>;
    page: z.ZodObject<{
        path: z.ZodString;
        type: z.ZodDefault<z.ZodEnum<["HOME", "PRODUCTS", "PRODUCT", "CATEGORIES", "CATEGORY", "SEARCH", "CART", "CHECKOUT", "ACCOUNT", "ORDER_TRACKING", "LANDING", "CUSTOM"]>>;
        productId: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        productSlug: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        productName: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        categoryId: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        categorySlug: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        categoryName: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        path: string;
        type: "HOME" | "CATEGORY" | "PRODUCT" | "CUSTOM" | "CATEGORIES" | "PRODUCTS" | "CART" | "CHECKOUT" | "ACCOUNT" | "SEARCH" | "ORDER_TRACKING" | "LANDING";
        productId: string | null;
        productName: string | null;
        categoryId: string | null;
        categorySlug: string | null;
        productSlug: string | null;
        categoryName: string | null;
    }, {
        path: string;
        type?: "HOME" | "CATEGORY" | "PRODUCT" | "CUSTOM" | "CATEGORIES" | "PRODUCTS" | "CART" | "CHECKOUT" | "ACCOUNT" | "SEARCH" | "ORDER_TRACKING" | "LANDING" | undefined;
        productId?: string | null | undefined;
        productName?: string | null | undefined;
        categoryId?: string | null | undefined;
        categorySlug?: string | null | undefined;
        productSlug?: string | null | undefined;
        categoryName?: string | null | undefined;
    }>;
    visitor: z.ZodObject<{
        visitorId: z.ZodString;
        sessionId: z.ZodString;
        firstVisit: z.ZodDefault<z.ZodBoolean>;
        returning: z.ZodDefault<z.ZodBoolean>;
        pageViews: z.ZodDefault<z.ZodNumber>;
        sessionStartedAt: z.ZodString;
        referrerDomain: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        utmSource: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        utmCampaign: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        sessionId: string;
        returning: boolean;
        visitorId: string;
        firstVisit: boolean;
        pageViews: number;
        sessionStartedAt: string;
        referrerDomain: string | null;
        utmSource: string | null;
        utmCampaign: string | null;
    }, {
        sessionId: string;
        visitorId: string;
        sessionStartedAt: string;
        returning?: boolean | undefined;
        firstVisit?: boolean | undefined;
        pageViews?: number | undefined;
        referrerDomain?: string | null | undefined;
        utmSource?: string | null | undefined;
        utmCampaign?: string | null | undefined;
    }>;
    cart: z.ZodDefault<z.ZodObject<{
        total: z.ZodDefault<z.ZodNumber>;
        itemCount: z.ZodDefault<z.ZodNumber>;
        productIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        categoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        couponCode: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        total: number;
        couponCode: string | null;
        categoryIds: string[];
        productIds: string[];
        itemCount: number;
    }, {
        total?: number | undefined;
        couponCode?: string | null | undefined;
        categoryIds?: string[] | undefined;
        productIds?: string[] | undefined;
        itemCount?: number | undefined;
    }>>;
    behavior: z.ZodDefault<z.ZodObject<{
        productViews: z.ZodDefault<z.ZodArray<z.ZodObject<{
            productId: z.ZodDefault<z.ZodNullable<z.ZodString>>;
            productSlug: z.ZodDefault<z.ZodNullable<z.ZodString>>;
            categoryId: z.ZodDefault<z.ZodNullable<z.ZodString>>;
            categorySlug: z.ZodDefault<z.ZodNullable<z.ZodString>>;
            count: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            productId: string | null;
            categoryId: string | null;
            categorySlug: string | null;
            count: number;
            productSlug: string | null;
        }, {
            count: number;
            productId?: string | null | undefined;
            categoryId?: string | null | undefined;
            categorySlug?: string | null | undefined;
            productSlug?: string | null | undefined;
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        productViews: {
            productId: string | null;
            categoryId: string | null;
            categorySlug: string | null;
            count: number;
            productSlug: string | null;
        }[];
    }, {
        productViews?: {
            count: number;
            productId?: string | null | undefined;
            categoryId?: string | null | undefined;
            categorySlug?: string | null | undefined;
            productSlug?: string | null | undefined;
        }[] | undefined;
    }>>;
    previewToken: z.ZodDefault<z.ZodNullable<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    page: {
        path: string;
        type: "HOME" | "CATEGORY" | "PRODUCT" | "CUSTOM" | "CATEGORIES" | "PRODUCTS" | "CART" | "CHECKOUT" | "ACCOUNT" | "SEARCH" | "ORDER_TRACKING" | "LANDING";
        productId: string | null;
        productName: string | null;
        categoryId: string | null;
        categorySlug: string | null;
        productSlug: string | null;
        categoryName: string | null;
    };
    cart: {
        total: number;
        couponCode: string | null;
        categoryIds: string[];
        productIds: string[];
        itemCount: number;
    };
    locale: "en" | "ar";
    behavior: {
        productViews: {
            productId: string | null;
            categoryId: string | null;
            categorySlug: string | null;
            count: number;
            productSlug: string | null;
        }[];
    };
    device: "tablet" | "mobile" | "desktop";
    visitor: {
        sessionId: string;
        returning: boolean;
        visitorId: string;
        firstVisit: boolean;
        pageViews: number;
        sessionStartedAt: string;
        referrerDomain: string | null;
        utmSource: string | null;
        utmCampaign: string | null;
    };
    previewToken: string | null;
}, {
    page: {
        path: string;
        type?: "HOME" | "CATEGORY" | "PRODUCT" | "CUSTOM" | "CATEGORIES" | "PRODUCTS" | "CART" | "CHECKOUT" | "ACCOUNT" | "SEARCH" | "ORDER_TRACKING" | "LANDING" | undefined;
        productId?: string | null | undefined;
        productName?: string | null | undefined;
        categoryId?: string | null | undefined;
        categorySlug?: string | null | undefined;
        productSlug?: string | null | undefined;
        categoryName?: string | null | undefined;
    };
    visitor: {
        sessionId: string;
        visitorId: string;
        sessionStartedAt: string;
        returning?: boolean | undefined;
        firstVisit?: boolean | undefined;
        pageViews?: number | undefined;
        referrerDomain?: string | null | undefined;
        utmSource?: string | null | undefined;
        utmCampaign?: string | null | undefined;
    };
    cart?: {
        total?: number | undefined;
        couponCode?: string | null | undefined;
        categoryIds?: string[] | undefined;
        productIds?: string[] | undefined;
        itemCount?: number | undefined;
    } | undefined;
    locale?: "en" | "ar" | undefined;
    behavior?: {
        productViews?: {
            count: number;
            productId?: string | null | undefined;
            categoryId?: string | null | undefined;
            categorySlug?: string | null | undefined;
            productSlug?: string | null | undefined;
        }[] | undefined;
    } | undefined;
    device?: "tablet" | "mobile" | "desktop" | undefined;
    previewToken?: string | null | undefined;
}>;
export type PopupStorefrontContext = z.infer<typeof popupStorefrontContextSchema>;
export declare const popupPublishedCampaignSchema: z.ZodObject<{
    id: z.ZodString;
    variantId: z.ZodString;
    version: z.ZodNumber;
    type: z.ZodEnum<["PROMOTIONAL", "DISCOUNT", "NEWSLETTER", "WELCOME", "FIRST_ORDER", "EXIT_INTENT", "ANNOUNCEMENT", "PRODUCT_RECOMMENDATION", "CART_REMINDER", "FREE_SHIPPING", "LIMITED_TIME_SALE", "PRODUCT_LAUNCH", "RESTOCK", "PRODUCT_SPECIFIC", "CATEGORY_SPECIFIC", "CROSS_SELL", "ACCOUNT_ENCOURAGEMENT", "LOGIN_REMINDER", "LOYALTY_VIP", "RETURNING_CUSTOMER", "NEW_VISITOR", "ORDER_UPDATE", "STORE_PICKUP", "DELIVERY_NOTICE", "SYSTEM_NOTICE", "MAINTENANCE", "SEASONAL", "CUSTOM"]>;
    priority: z.ZodNumber;
    startsAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    endsAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    timezone: z.ZodString;
    recurringSchedule: z.ZodDefault<z.ZodNullable<z.ZodObject<{
        enabled: z.ZodDefault<z.ZodBoolean>;
        weekdays: z.ZodDefault<z.ZodArray<z.ZodNumber, "many">>;
        startTime: z.ZodDefault<z.ZodString>;
        endTime: z.ZodDefault<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        enabled: boolean;
        weekdays: number[];
        startTime: string;
        endTime: string;
    }, {
        enabled?: boolean | undefined;
        weekdays?: number[] | undefined;
        startTime?: string | undefined;
        endTime?: string | undefined;
    }>>>;
    presentation: z.ZodDefault<z.ZodObject<{
        desktop: z.ZodDefault<z.ZodEnum<["CENTER_MODAL", "BOTTOM_SHEET", "FLOATING_RIGHT", "FLOATING_LEFT", "TOP_BANNER", "BOTTOM_BANNER", "FULLSCREEN", "SIDE_PANEL_RIGHT", "SIDE_PANEL_LEFT", "SLIDE_IN_RIGHT", "SLIDE_IN_LEFT", "PROMO_TOAST", "ANNOUNCEMENT_BAR"]>>;
        tablet: z.ZodDefault<z.ZodEnum<["CENTER_MODAL", "BOTTOM_SHEET", "FLOATING_RIGHT", "FLOATING_LEFT", "TOP_BANNER", "BOTTOM_BANNER", "FULLSCREEN", "SIDE_PANEL_RIGHT", "SIDE_PANEL_LEFT", "SLIDE_IN_RIGHT", "SLIDE_IN_LEFT", "PROMO_TOAST", "ANNOUNCEMENT_BAR"]>>;
        mobile: z.ZodDefault<z.ZodEnum<["CENTER_MODAL", "BOTTOM_SHEET", "FLOATING_RIGHT", "FLOATING_LEFT", "TOP_BANNER", "BOTTOM_BANNER", "FULLSCREEN", "SIDE_PANEL_RIGHT", "SIDE_PANEL_LEFT", "SLIDE_IN_RIGHT", "SLIDE_IN_LEFT", "PROMO_TOAST", "ANNOUNCEMENT_BAR"]>>;
        dismissible: z.ZodDefault<z.ZodBoolean>;
        closeOnOverlay: z.ZodDefault<z.ZodBoolean>;
        closeOnEscape: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        tablet: "CENTER_MODAL" | "BOTTOM_SHEET" | "FLOATING_RIGHT" | "FLOATING_LEFT" | "TOP_BANNER" | "BOTTOM_BANNER" | "FULLSCREEN" | "SIDE_PANEL_RIGHT" | "SIDE_PANEL_LEFT" | "SLIDE_IN_RIGHT" | "SLIDE_IN_LEFT" | "PROMO_TOAST" | "ANNOUNCEMENT_BAR";
        mobile: "CENTER_MODAL" | "BOTTOM_SHEET" | "FLOATING_RIGHT" | "FLOATING_LEFT" | "TOP_BANNER" | "BOTTOM_BANNER" | "FULLSCREEN" | "SIDE_PANEL_RIGHT" | "SIDE_PANEL_LEFT" | "SLIDE_IN_RIGHT" | "SLIDE_IN_LEFT" | "PROMO_TOAST" | "ANNOUNCEMENT_BAR";
        desktop: "CENTER_MODAL" | "BOTTOM_SHEET" | "FLOATING_RIGHT" | "FLOATING_LEFT" | "TOP_BANNER" | "BOTTOM_BANNER" | "FULLSCREEN" | "SIDE_PANEL_RIGHT" | "SIDE_PANEL_LEFT" | "SLIDE_IN_RIGHT" | "SLIDE_IN_LEFT" | "PROMO_TOAST" | "ANNOUNCEMENT_BAR";
        dismissible: boolean;
        closeOnOverlay: boolean;
        closeOnEscape: boolean;
    }, {
        tablet?: "CENTER_MODAL" | "BOTTOM_SHEET" | "FLOATING_RIGHT" | "FLOATING_LEFT" | "TOP_BANNER" | "BOTTOM_BANNER" | "FULLSCREEN" | "SIDE_PANEL_RIGHT" | "SIDE_PANEL_LEFT" | "SLIDE_IN_RIGHT" | "SLIDE_IN_LEFT" | "PROMO_TOAST" | "ANNOUNCEMENT_BAR" | undefined;
        mobile?: "CENTER_MODAL" | "BOTTOM_SHEET" | "FLOATING_RIGHT" | "FLOATING_LEFT" | "TOP_BANNER" | "BOTTOM_BANNER" | "FULLSCREEN" | "SIDE_PANEL_RIGHT" | "SIDE_PANEL_LEFT" | "SLIDE_IN_RIGHT" | "SLIDE_IN_LEFT" | "PROMO_TOAST" | "ANNOUNCEMENT_BAR" | undefined;
        desktop?: "CENTER_MODAL" | "BOTTOM_SHEET" | "FLOATING_RIGHT" | "FLOATING_LEFT" | "TOP_BANNER" | "BOTTOM_BANNER" | "FULLSCREEN" | "SIDE_PANEL_RIGHT" | "SIDE_PANEL_LEFT" | "SLIDE_IN_RIGHT" | "SLIDE_IN_LEFT" | "PROMO_TOAST" | "ANNOUNCEMENT_BAR" | undefined;
        dismissible?: boolean | undefined;
        closeOnOverlay?: boolean | undefined;
        closeOnEscape?: boolean | undefined;
    }>>;
    appearance: z.ZodDefault<z.ZodObject<{
        theme: z.ZodDefault<z.ZodEnum<["IVORY", "INK", "SAGE", "BLUSH", "GOLD", "BRAND"]>>;
        icon: z.ZodDefault<z.ZodEnum<["NONE", "SPARKLE", "GIFT", "MEGAPHONE", "TRUCK", "HEART", "BELL"]>>;
        layout: z.ZodDefault<z.ZodEnum<["TEXT_ONLY", "SPLIT", "IMAGE_TOP", "IMAGE_BACKGROUND"]>>;
        width: z.ZodDefault<z.ZodEnum<["COMPACT", "STANDARD", "WIDE"]>>;
        maxWidth: z.ZodDefault<z.ZodNumber>;
        spacing: z.ZodDefault<z.ZodEnum<["COMPACT", "COMFORTABLE", "AIRY"]>>;
        alignment: z.ZodDefault<z.ZodEnum<["START", "CENTER"]>>;
        imagePosition: z.ZodDefault<z.ZodEnum<["START", "END", "TOP", "BACKGROUND"]>>;
        borderRadius: z.ZodDefault<z.ZodEnum<["NONE", "SUBTLE", "SOFT", "ROUNDED"]>>;
        overlayOpacity: z.ZodDefault<z.ZodNumber>;
        buttonStyle: z.ZodDefault<z.ZodEnum<["SOLID", "OUTLINE", "UNDERLINE"]>>;
        surface: z.ZodDefault<z.ZodEnum<["SOLID", "TINTED", "GLASS"]>>;
        animation: z.ZodDefault<z.ZodEnum<["FADE", "LIFT", "SCALE", "SLIDE", "NONE"]>>;
        accentColor: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        width: "STANDARD" | "COMPACT" | "WIDE";
        alignment: "START" | "CENTER";
        icon: "NONE" | "TRUCK" | "SPARKLE" | "GIFT" | "MEGAPHONE" | "HEART" | "BELL";
        spacing: "COMPACT" | "COMFORTABLE" | "AIRY";
        layout: "IMAGE_TOP" | "SPLIT" | "TEXT_ONLY" | "IMAGE_BACKGROUND";
        animation: "NONE" | "SCALE" | "FADE" | "SLIDE" | "LIFT";
        overlayOpacity: number;
        surface: "SOLID" | "TINTED" | "GLASS";
        borderRadius: "NONE" | "SUBTLE" | "SOFT" | "ROUNDED";
        theme: "BRAND" | "IVORY" | "INK" | "SAGE" | "BLUSH" | "GOLD";
        maxWidth: number;
        imagePosition: "START" | "END" | "TOP" | "BACKGROUND";
        buttonStyle: "OUTLINE" | "SOLID" | "UNDERLINE";
        accentColor: string | null;
    }, {
        width?: "STANDARD" | "COMPACT" | "WIDE" | undefined;
        alignment?: "START" | "CENTER" | undefined;
        icon?: "NONE" | "TRUCK" | "SPARKLE" | "GIFT" | "MEGAPHONE" | "HEART" | "BELL" | undefined;
        spacing?: "COMPACT" | "COMFORTABLE" | "AIRY" | undefined;
        layout?: "IMAGE_TOP" | "SPLIT" | "TEXT_ONLY" | "IMAGE_BACKGROUND" | undefined;
        animation?: "NONE" | "SCALE" | "FADE" | "SLIDE" | "LIFT" | undefined;
        overlayOpacity?: number | undefined;
        surface?: "SOLID" | "TINTED" | "GLASS" | undefined;
        borderRadius?: "NONE" | "SUBTLE" | "SOFT" | "ROUNDED" | undefined;
        theme?: "BRAND" | "IVORY" | "INK" | "SAGE" | "BLUSH" | "GOLD" | undefined;
        maxWidth?: number | undefined;
        imagePosition?: "START" | "END" | "TOP" | "BACKGROUND" | undefined;
        buttonStyle?: "OUTLINE" | "SOLID" | "UNDERLINE" | undefined;
        accentColor?: string | null | undefined;
    }>>;
    targeting: z.ZodDefault<z.ZodObject<{
        logic: z.ZodDefault<z.ZodEnum<["AND", "OR"]>>;
        rules: z.ZodDefault<z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            field: z.ZodEnum<["PAGE_TYPE", "PAGE_PATH", "PRODUCT_ID", "CATEGORY_ID", "DEVICE", "LOCALE", "AUTH_STATUS", "VISITOR_TYPE", "CUSTOMER_ORDER_COUNT", "CUSTOMER_TOTAL_SPENT", "CUSTOMER_AVERAGE_ORDER_VALUE", "CUSTOMER_IS_VIP", "PURCHASED_PRODUCT", "PURCHASED_CATEGORY", "CART_TOTAL", "CART_ITEM_COUNT", "CART_CONTAINS_PRODUCT", "CART_CONTAINS_CATEGORY", "FREE_SHIPPING_REMAINING", "COUNTRY", "REGION", "CITY", "UTM_SOURCE", "UTM_CAMPAIGN", "REFERRER_DOMAIN"]>;
            operator: z.ZodEnum<["EQUALS", "NOT_EQUALS", "IN", "NOT_IN", "CONTAINS", "NOT_CONTAINS", "STARTS_WITH", "MATCHES", "GT", "GTE", "LT", "LTE", "IS_TRUE", "IS_FALSE"]>;
            value: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodString, "many">]>>;
        }, "strip", z.ZodTypeAny, {
            id: string;
            operator: "GT" | "IN" | "LT" | "GTE" | "LTE" | "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "NOT_IN" | "NOT_CONTAINS" | "STARTS_WITH" | "MATCHES" | "IS_TRUE" | "IS_FALSE";
            field: "PAGE_TYPE" | "PAGE_PATH" | "PRODUCT_ID" | "CATEGORY_ID" | "DEVICE" | "LOCALE" | "AUTH_STATUS" | "VISITOR_TYPE" | "CUSTOMER_ORDER_COUNT" | "CUSTOMER_TOTAL_SPENT" | "CUSTOMER_AVERAGE_ORDER_VALUE" | "CUSTOMER_IS_VIP" | "PURCHASED_PRODUCT" | "PURCHASED_CATEGORY" | "CART_TOTAL" | "CART_ITEM_COUNT" | "CART_CONTAINS_PRODUCT" | "CART_CONTAINS_CATEGORY" | "FREE_SHIPPING_REMAINING" | "COUNTRY" | "REGION" | "CITY" | "UTM_SOURCE" | "UTM_CAMPAIGN" | "REFERRER_DOMAIN";
            value?: string | number | boolean | string[] | undefined;
        }, {
            id: string;
            operator: "GT" | "IN" | "LT" | "GTE" | "LTE" | "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "NOT_IN" | "NOT_CONTAINS" | "STARTS_WITH" | "MATCHES" | "IS_TRUE" | "IS_FALSE";
            field: "PAGE_TYPE" | "PAGE_PATH" | "PRODUCT_ID" | "CATEGORY_ID" | "DEVICE" | "LOCALE" | "AUTH_STATUS" | "VISITOR_TYPE" | "CUSTOMER_ORDER_COUNT" | "CUSTOMER_TOTAL_SPENT" | "CUSTOMER_AVERAGE_ORDER_VALUE" | "CUSTOMER_IS_VIP" | "PURCHASED_PRODUCT" | "PURCHASED_CATEGORY" | "CART_TOTAL" | "CART_ITEM_COUNT" | "CART_CONTAINS_PRODUCT" | "CART_CONTAINS_CATEGORY" | "FREE_SHIPPING_REMAINING" | "COUNTRY" | "REGION" | "CITY" | "UTM_SOURCE" | "UTM_CAMPAIGN" | "REFERRER_DOMAIN";
            value?: string | number | boolean | string[] | undefined;
        }>, "many">>;
        exclusions: z.ZodDefault<z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            field: z.ZodEnum<["PAGE_TYPE", "PAGE_PATH", "PRODUCT_ID", "CATEGORY_ID", "DEVICE", "LOCALE", "AUTH_STATUS", "VISITOR_TYPE", "CUSTOMER_ORDER_COUNT", "CUSTOMER_TOTAL_SPENT", "CUSTOMER_AVERAGE_ORDER_VALUE", "CUSTOMER_IS_VIP", "PURCHASED_PRODUCT", "PURCHASED_CATEGORY", "CART_TOTAL", "CART_ITEM_COUNT", "CART_CONTAINS_PRODUCT", "CART_CONTAINS_CATEGORY", "FREE_SHIPPING_REMAINING", "COUNTRY", "REGION", "CITY", "UTM_SOURCE", "UTM_CAMPAIGN", "REFERRER_DOMAIN"]>;
            operator: z.ZodEnum<["EQUALS", "NOT_EQUALS", "IN", "NOT_IN", "CONTAINS", "NOT_CONTAINS", "STARTS_WITH", "MATCHES", "GT", "GTE", "LT", "LTE", "IS_TRUE", "IS_FALSE"]>;
            value: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodString, "many">]>>;
        }, "strip", z.ZodTypeAny, {
            id: string;
            operator: "GT" | "IN" | "LT" | "GTE" | "LTE" | "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "NOT_IN" | "NOT_CONTAINS" | "STARTS_WITH" | "MATCHES" | "IS_TRUE" | "IS_FALSE";
            field: "PAGE_TYPE" | "PAGE_PATH" | "PRODUCT_ID" | "CATEGORY_ID" | "DEVICE" | "LOCALE" | "AUTH_STATUS" | "VISITOR_TYPE" | "CUSTOMER_ORDER_COUNT" | "CUSTOMER_TOTAL_SPENT" | "CUSTOMER_AVERAGE_ORDER_VALUE" | "CUSTOMER_IS_VIP" | "PURCHASED_PRODUCT" | "PURCHASED_CATEGORY" | "CART_TOTAL" | "CART_ITEM_COUNT" | "CART_CONTAINS_PRODUCT" | "CART_CONTAINS_CATEGORY" | "FREE_SHIPPING_REMAINING" | "COUNTRY" | "REGION" | "CITY" | "UTM_SOURCE" | "UTM_CAMPAIGN" | "REFERRER_DOMAIN";
            value?: string | number | boolean | string[] | undefined;
        }, {
            id: string;
            operator: "GT" | "IN" | "LT" | "GTE" | "LTE" | "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "NOT_IN" | "NOT_CONTAINS" | "STARTS_WITH" | "MATCHES" | "IS_TRUE" | "IS_FALSE";
            field: "PAGE_TYPE" | "PAGE_PATH" | "PRODUCT_ID" | "CATEGORY_ID" | "DEVICE" | "LOCALE" | "AUTH_STATUS" | "VISITOR_TYPE" | "CUSTOMER_ORDER_COUNT" | "CUSTOMER_TOTAL_SPENT" | "CUSTOMER_AVERAGE_ORDER_VALUE" | "CUSTOMER_IS_VIP" | "PURCHASED_PRODUCT" | "PURCHASED_CATEGORY" | "CART_TOTAL" | "CART_ITEM_COUNT" | "CART_CONTAINS_PRODUCT" | "CART_CONTAINS_CATEGORY" | "FREE_SHIPPING_REMAINING" | "COUNTRY" | "REGION" | "CITY" | "UTM_SOURCE" | "UTM_CAMPAIGN" | "REFERRER_DOMAIN";
            value?: string | number | boolean | string[] | undefined;
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        rules: {
            id: string;
            operator: "GT" | "IN" | "LT" | "GTE" | "LTE" | "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "NOT_IN" | "NOT_CONTAINS" | "STARTS_WITH" | "MATCHES" | "IS_TRUE" | "IS_FALSE";
            field: "PAGE_TYPE" | "PAGE_PATH" | "PRODUCT_ID" | "CATEGORY_ID" | "DEVICE" | "LOCALE" | "AUTH_STATUS" | "VISITOR_TYPE" | "CUSTOMER_ORDER_COUNT" | "CUSTOMER_TOTAL_SPENT" | "CUSTOMER_AVERAGE_ORDER_VALUE" | "CUSTOMER_IS_VIP" | "PURCHASED_PRODUCT" | "PURCHASED_CATEGORY" | "CART_TOTAL" | "CART_ITEM_COUNT" | "CART_CONTAINS_PRODUCT" | "CART_CONTAINS_CATEGORY" | "FREE_SHIPPING_REMAINING" | "COUNTRY" | "REGION" | "CITY" | "UTM_SOURCE" | "UTM_CAMPAIGN" | "REFERRER_DOMAIN";
            value?: string | number | boolean | string[] | undefined;
        }[];
        logic: "AND" | "OR";
        exclusions: {
            id: string;
            operator: "GT" | "IN" | "LT" | "GTE" | "LTE" | "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "NOT_IN" | "NOT_CONTAINS" | "STARTS_WITH" | "MATCHES" | "IS_TRUE" | "IS_FALSE";
            field: "PAGE_TYPE" | "PAGE_PATH" | "PRODUCT_ID" | "CATEGORY_ID" | "DEVICE" | "LOCALE" | "AUTH_STATUS" | "VISITOR_TYPE" | "CUSTOMER_ORDER_COUNT" | "CUSTOMER_TOTAL_SPENT" | "CUSTOMER_AVERAGE_ORDER_VALUE" | "CUSTOMER_IS_VIP" | "PURCHASED_PRODUCT" | "PURCHASED_CATEGORY" | "CART_TOTAL" | "CART_ITEM_COUNT" | "CART_CONTAINS_PRODUCT" | "CART_CONTAINS_CATEGORY" | "FREE_SHIPPING_REMAINING" | "COUNTRY" | "REGION" | "CITY" | "UTM_SOURCE" | "UTM_CAMPAIGN" | "REFERRER_DOMAIN";
            value?: string | number | boolean | string[] | undefined;
        }[];
    }, {
        rules?: {
            id: string;
            operator: "GT" | "IN" | "LT" | "GTE" | "LTE" | "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "NOT_IN" | "NOT_CONTAINS" | "STARTS_WITH" | "MATCHES" | "IS_TRUE" | "IS_FALSE";
            field: "PAGE_TYPE" | "PAGE_PATH" | "PRODUCT_ID" | "CATEGORY_ID" | "DEVICE" | "LOCALE" | "AUTH_STATUS" | "VISITOR_TYPE" | "CUSTOMER_ORDER_COUNT" | "CUSTOMER_TOTAL_SPENT" | "CUSTOMER_AVERAGE_ORDER_VALUE" | "CUSTOMER_IS_VIP" | "PURCHASED_PRODUCT" | "PURCHASED_CATEGORY" | "CART_TOTAL" | "CART_ITEM_COUNT" | "CART_CONTAINS_PRODUCT" | "CART_CONTAINS_CATEGORY" | "FREE_SHIPPING_REMAINING" | "COUNTRY" | "REGION" | "CITY" | "UTM_SOURCE" | "UTM_CAMPAIGN" | "REFERRER_DOMAIN";
            value?: string | number | boolean | string[] | undefined;
        }[] | undefined;
        logic?: "AND" | "OR" | undefined;
        exclusions?: {
            id: string;
            operator: "GT" | "IN" | "LT" | "GTE" | "LTE" | "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "NOT_IN" | "NOT_CONTAINS" | "STARTS_WITH" | "MATCHES" | "IS_TRUE" | "IS_FALSE";
            field: "PAGE_TYPE" | "PAGE_PATH" | "PRODUCT_ID" | "CATEGORY_ID" | "DEVICE" | "LOCALE" | "AUTH_STATUS" | "VISITOR_TYPE" | "CUSTOMER_ORDER_COUNT" | "CUSTOMER_TOTAL_SPENT" | "CUSTOMER_AVERAGE_ORDER_VALUE" | "CUSTOMER_IS_VIP" | "PURCHASED_PRODUCT" | "PURCHASED_CATEGORY" | "CART_TOTAL" | "CART_ITEM_COUNT" | "CART_CONTAINS_PRODUCT" | "CART_CONTAINS_CATEGORY" | "FREE_SHIPPING_REMAINING" | "COUNTRY" | "REGION" | "CITY" | "UTM_SOURCE" | "UTM_CAMPAIGN" | "REFERRER_DOMAIN";
            value?: string | number | boolean | string[] | undefined;
        }[] | undefined;
    }>>;
    trigger: z.ZodDefault<z.ZodObject<{
        type: z.ZodDefault<z.ZodEnum<["IMMEDIATE", "DELAY", "SCROLL_DEPTH", "EXIT_INTENT", "INACTIVITY", "PAGE_VIEWS", "SESSION_DURATION", "PRODUCT_VIEWS", "ADD_TO_CART", "REMOVE_FROM_CART", "CART_THRESHOLD", "FIRST_VISIT", "RETURNING_SESSION", "CUSTOM_EVENT"]>>;
        delaySeconds: z.ZodDefault<z.ZodNumber>;
        scrollPercent: z.ZodDefault<z.ZodNumber>;
        inactivitySeconds: z.ZodDefault<z.ZodNumber>;
        pageViewCount: z.ZodDefault<z.ZodNumber>;
        sessionDurationSeconds: z.ZodDefault<z.ZodNumber>;
        productViewCount: z.ZodDefault<z.ZodNumber>;
        cartThreshold: z.ZodDefault<z.ZodNumber>;
        eventName: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        productIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        categoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        mobileExitFallback: z.ZodDefault<z.ZodEnum<["NONE", "INACTIVITY", "SCROLL_DEPTH"]>>;
        mobileExitFallbackValue: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        type: "EXIT_INTENT" | "IMMEDIATE" | "DELAY" | "SCROLL_DEPTH" | "INACTIVITY" | "PAGE_VIEWS" | "SESSION_DURATION" | "PRODUCT_VIEWS" | "ADD_TO_CART" | "REMOVE_FROM_CART" | "CART_THRESHOLD" | "FIRST_VISIT" | "RETURNING_SESSION" | "CUSTOM_EVENT";
        categoryIds: string[];
        productIds: string[];
        delaySeconds: number;
        scrollPercent: number;
        inactivitySeconds: number;
        pageViewCount: number;
        sessionDurationSeconds: number;
        productViewCount: number;
        cartThreshold: number;
        eventName: string | null;
        mobileExitFallback: "NONE" | "SCROLL_DEPTH" | "INACTIVITY";
        mobileExitFallbackValue: number;
    }, {
        type?: "EXIT_INTENT" | "IMMEDIATE" | "DELAY" | "SCROLL_DEPTH" | "INACTIVITY" | "PAGE_VIEWS" | "SESSION_DURATION" | "PRODUCT_VIEWS" | "ADD_TO_CART" | "REMOVE_FROM_CART" | "CART_THRESHOLD" | "FIRST_VISIT" | "RETURNING_SESSION" | "CUSTOM_EVENT" | undefined;
        categoryIds?: string[] | undefined;
        productIds?: string[] | undefined;
        delaySeconds?: number | undefined;
        scrollPercent?: number | undefined;
        inactivitySeconds?: number | undefined;
        pageViewCount?: number | undefined;
        sessionDurationSeconds?: number | undefined;
        productViewCount?: number | undefined;
        cartThreshold?: number | undefined;
        eventName?: string | null | undefined;
        mobileExitFallback?: "NONE" | "SCROLL_DEPTH" | "INACTIVITY" | undefined;
        mobileExitFallbackValue?: number | undefined;
    }>>;
    frequency: z.ZodDefault<z.ZodObject<{
        mode: z.ZodDefault<z.ZodEnum<["ONCE_EVER", "ONCE_PER_SESSION", "ONCE_PER_DAY", "EVERY_X_HOURS", "EVERY_X_DAYS", "MAX_IMPRESSIONS", "UNTIL_INTERACTION", "UNTIL_CONVERSION", "UNTIL_CAMPAIGN_ENDS"]>>;
        interval: z.ZodDefault<z.ZodNumber>;
        maxImpressions: z.ZodDefault<z.ZodNumber>;
        afterDismiss: z.ZodDefault<z.ZodEnum<["DEFAULT", "SESSION", "HOURS", "DAYS", "NEVER"]>>;
        afterDismissInterval: z.ZodDefault<z.ZodNumber>;
        afterPrimaryAction: z.ZodDefault<z.ZodEnum<["DEFAULT", "SESSION", "NEVER"]>>;
        afterConversion: z.ZodDefault<z.ZodEnum<["DEFAULT", "NEVER"]>>;
    }, "strip", z.ZodTypeAny, {
        mode: "ONCE_EVER" | "ONCE_PER_SESSION" | "ONCE_PER_DAY" | "EVERY_X_HOURS" | "EVERY_X_DAYS" | "MAX_IMPRESSIONS" | "UNTIL_INTERACTION" | "UNTIL_CONVERSION" | "UNTIL_CAMPAIGN_ENDS";
        interval: number;
        maxImpressions: number;
        afterDismiss: "DEFAULT" | "SESSION" | "HOURS" | "DAYS" | "NEVER";
        afterDismissInterval: number;
        afterPrimaryAction: "DEFAULT" | "SESSION" | "NEVER";
        afterConversion: "DEFAULT" | "NEVER";
    }, {
        mode?: "ONCE_EVER" | "ONCE_PER_SESSION" | "ONCE_PER_DAY" | "EVERY_X_HOURS" | "EVERY_X_DAYS" | "MAX_IMPRESSIONS" | "UNTIL_INTERACTION" | "UNTIL_CONVERSION" | "UNTIL_CAMPAIGN_ENDS" | undefined;
        interval?: number | undefined;
        maxImpressions?: number | undefined;
        afterDismiss?: "DEFAULT" | "SESSION" | "HOURS" | "DAYS" | "NEVER" | undefined;
        afterDismissInterval?: number | undefined;
        afterPrimaryAction?: "DEFAULT" | "SESSION" | "NEVER" | undefined;
        afterConversion?: "DEFAULT" | "NEVER" | undefined;
    }>>;
    collision: z.ZodDefault<z.ZodObject<{
        queueBehavior: z.ZodDefault<z.ZodEnum<["QUEUE", "SUPPRESS", "REPLACE_LOWER"]>>;
        cooldownSeconds: z.ZodDefault<z.ZodNumber>;
        suppressLowerPriority: z.ZodDefault<z.ZodBoolean>;
        exclusivityKey: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        queueBehavior: "QUEUE" | "SUPPRESS" | "REPLACE_LOWER";
        cooldownSeconds: number;
        suppressLowerPriority: boolean;
        exclusivityKey: string | null;
    }, {
        queueBehavior?: "QUEUE" | "SUPPRESS" | "REPLACE_LOWER" | undefined;
        cooldownSeconds?: number | undefined;
        suppressLowerPriority?: boolean | undefined;
        exclusivityKey?: string | null | undefined;
    }>>;
    primaryAction: z.ZodDefault<z.ZodObject<{
        type: z.ZodDefault<z.ZodEnum<["NONE", "NAVIGATE", "APPLY_COUPON", "COPY_COUPON", "CLOSE", "SUBMIT_FORM"]>>;
        destination: z.ZodDefault<z.ZodNullable<z.ZodEnum<["URL", "PRODUCT", "CATEGORY", "CART", "ACCOUNT", "HOME"]>>>;
        url: z.ZodDefault<z.ZodNullable<z.ZodEffects<z.ZodString, string, string>>>;
        productId: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        categoryId: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        couponId: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        openInNewTab: z.ZodDefault<z.ZodBoolean>;
        closeAfterAction: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        type: "NONE" | "NAVIGATE" | "APPLY_COUPON" | "COPY_COUPON" | "CLOSE" | "SUBMIT_FORM";
        productId: string | null;
        url: string | null;
        categoryId: string | null;
        destination: "HOME" | "CATEGORY" | "PRODUCT" | "CART" | "ACCOUNT" | "URL" | null;
        openInNewTab: boolean;
        couponId: string | null;
        closeAfterAction: boolean;
    }, {
        type?: "NONE" | "NAVIGATE" | "APPLY_COUPON" | "COPY_COUPON" | "CLOSE" | "SUBMIT_FORM" | undefined;
        productId?: string | null | undefined;
        url?: string | null | undefined;
        categoryId?: string | null | undefined;
        destination?: "HOME" | "CATEGORY" | "PRODUCT" | "CART" | "ACCOUNT" | "URL" | null | undefined;
        openInNewTab?: boolean | undefined;
        couponId?: string | null | undefined;
        closeAfterAction?: boolean | undefined;
    }>>;
    secondaryAction: z.ZodDefault<z.ZodObject<{
        type: z.ZodDefault<z.ZodEnum<["NONE", "NAVIGATE", "APPLY_COUPON", "COPY_COUPON", "CLOSE", "SUBMIT_FORM"]>>;
        destination: z.ZodDefault<z.ZodNullable<z.ZodEnum<["URL", "PRODUCT", "CATEGORY", "CART", "ACCOUNT", "HOME"]>>>;
        url: z.ZodDefault<z.ZodNullable<z.ZodEffects<z.ZodString, string, string>>>;
        productId: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        categoryId: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        couponId: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        openInNewTab: z.ZodDefault<z.ZodBoolean>;
        closeAfterAction: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        type: "NONE" | "NAVIGATE" | "APPLY_COUPON" | "COPY_COUPON" | "CLOSE" | "SUBMIT_FORM";
        productId: string | null;
        url: string | null;
        categoryId: string | null;
        destination: "HOME" | "CATEGORY" | "PRODUCT" | "CART" | "ACCOUNT" | "URL" | null;
        openInNewTab: boolean;
        couponId: string | null;
        closeAfterAction: boolean;
    }, {
        type?: "NONE" | "NAVIGATE" | "APPLY_COUPON" | "COPY_COUPON" | "CLOSE" | "SUBMIT_FORM" | undefined;
        productId?: string | null | undefined;
        url?: string | null | undefined;
        categoryId?: string | null | undefined;
        destination?: "HOME" | "CATEGORY" | "PRODUCT" | "CART" | "ACCOUNT" | "URL" | null | undefined;
        openInNewTab?: boolean | undefined;
        couponId?: string | null | undefined;
        closeAfterAction?: boolean | undefined;
    }>>;
    form: z.ZodDefault<z.ZodObject<{
        type: z.ZodDefault<z.ZodEnum<["NONE", "NEWSLETTER", "LEAD"]>>;
        collectName: z.ZodDefault<z.ZodBoolean>;
        collectEmail: z.ZodDefault<z.ZodBoolean>;
        collectPhone: z.ZodDefault<z.ZodBoolean>;
        consentRequired: z.ZodDefault<z.ZodBoolean>;
        successAutoCloseSeconds: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        type: "NONE" | "NEWSLETTER" | "LEAD";
        collectName: boolean;
        collectEmail: boolean;
        collectPhone: boolean;
        consentRequired: boolean;
        successAutoCloseSeconds: number;
    }, {
        type?: "NONE" | "NEWSLETTER" | "LEAD" | undefined;
        collectName?: boolean | undefined;
        collectEmail?: boolean | undefined;
        collectPhone?: boolean | undefined;
        consentRequired?: boolean | undefined;
        successAutoCloseSeconds?: number | undefined;
    }>>;
    countdown: z.ZodDefault<z.ZodObject<{
        enabled: z.ZodDefault<z.ZodBoolean>;
        mode: z.ZodDefault<z.ZodEnum<["CAMPAIGN_END", "FIXED_TIMESTAMP"]>>;
        targetAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        enabled: boolean;
        mode: "CAMPAIGN_END" | "FIXED_TIMESTAMP";
        targetAt: string | null;
    }, {
        enabled?: boolean | undefined;
        mode?: "CAMPAIGN_END" | "FIXED_TIMESTAMP" | undefined;
        targetAt?: string | null | undefined;
    }>>;
    content: z.ZodObject<{
        locale: z.ZodEnum<["en", "ar"]>;
        eyebrow: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        badge: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        headline: z.ZodString;
        subtitle: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        body: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        imageAlt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        primaryCtaLabel: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        secondaryCtaLabel: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        disclaimer: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        successHeadline: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        successBody: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        nameLabel: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        emailLabel: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        phoneLabel: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        submitLabel: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        consentLabel: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        eyebrow: string | null;
        imageAlt: string | null;
        disclaimer: string | null;
        locale: "en" | "ar";
        body: string | null;
        primaryCtaLabel: string | null;
        secondaryCtaLabel: string | null;
        badge: string | null;
        headline: string;
        subtitle: string | null;
        successHeadline: string | null;
        successBody: string | null;
        nameLabel: string | null;
        emailLabel: string | null;
        phoneLabel: string | null;
        submitLabel: string | null;
        consentLabel: string | null;
    }, {
        locale: "en" | "ar";
        headline: string;
        eyebrow?: string | null | undefined;
        imageAlt?: string | null | undefined;
        disclaimer?: string | null | undefined;
        body?: string | null | undefined;
        primaryCtaLabel?: string | null | undefined;
        secondaryCtaLabel?: string | null | undefined;
        badge?: string | null | undefined;
        subtitle?: string | null | undefined;
        successHeadline?: string | null | undefined;
        successBody?: string | null | undefined;
        nameLabel?: string | null | undefined;
        emailLabel?: string | null | undefined;
        phoneLabel?: string | null | undefined;
        submitLabel?: string | null | undefined;
        consentLabel?: string | null | undefined;
    }>;
    direction: z.ZodEnum<["ltr", "rtl"]>;
    image: z.ZodDefault<z.ZodNullable<z.ZodObject<{
        url: z.ZodEffects<z.ZodString, string, string>;
        width: z.ZodNumber;
        height: z.ZodNumber;
        alt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        width: number;
        height: number;
        url: string;
        alt: string;
    }, {
        width: number;
        height: number;
        url: string;
        alt: string;
    }>>>;
    coupon: z.ZodDefault<z.ZodNullable<z.ZodObject<{
        id: z.ZodString;
        code: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        code: string;
        id: string;
    }, {
        code: string;
        id: string;
    }>>>;
    product: z.ZodDefault<z.ZodNullable<z.ZodObject<{
        id: z.ZodString;
        slug: z.ZodString;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        name: string;
        slug: string;
    }, {
        id: string;
        name: string;
        slug: string;
    }>>>;
    category: z.ZodDefault<z.ZodNullable<z.ZodObject<{
        id: z.ZodString;
        slug: z.ZodString;
        name: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        name: string;
        slug: string;
    }, {
        id: string;
        name: string;
        slug: string;
    }>>>;
}, "strip", z.ZodTypeAny, {
    type: "FREE_SHIPPING" | "FIRST_ORDER" | "CUSTOM" | "PROMOTIONAL" | "SEASONAL" | "NEWSLETTER" | "PRODUCT_LAUNCH" | "DISCOUNT" | "WELCOME" | "EXIT_INTENT" | "ANNOUNCEMENT" | "PRODUCT_RECOMMENDATION" | "CART_REMINDER" | "LIMITED_TIME_SALE" | "RESTOCK" | "PRODUCT_SPECIFIC" | "CATEGORY_SPECIFIC" | "CROSS_SELL" | "ACCOUNT_ENCOURAGEMENT" | "LOGIN_REMINDER" | "LOYALTY_VIP" | "RETURNING_CUSTOMER" | "NEW_VISITOR" | "ORDER_UPDATE" | "STORE_PICKUP" | "DELIVERY_NOTICE" | "SYSTEM_NOTICE" | "MAINTENANCE";
    id: string;
    variantId: string;
    category: {
        id: string;
        name: string;
        slug: string;
    } | null;
    trigger: {
        type: "EXIT_INTENT" | "IMMEDIATE" | "DELAY" | "SCROLL_DEPTH" | "INACTIVITY" | "PAGE_VIEWS" | "SESSION_DURATION" | "PRODUCT_VIEWS" | "ADD_TO_CART" | "REMOVE_FROM_CART" | "CART_THRESHOLD" | "FIRST_VISIT" | "RETURNING_SESSION" | "CUSTOM_EVENT";
        categoryIds: string[];
        productIds: string[];
        delaySeconds: number;
        scrollPercent: number;
        inactivitySeconds: number;
        pageViewCount: number;
        sessionDurationSeconds: number;
        productViewCount: number;
        cartThreshold: number;
        eventName: string | null;
        mobileExitFallback: "NONE" | "SCROLL_DEPTH" | "INACTIVITY";
        mobileExitFallbackValue: number;
    };
    priority: number;
    startsAt: string | null;
    endsAt: string | null;
    timezone: string;
    coupon: {
        code: string;
        id: string;
    } | null;
    version: number;
    product: {
        id: string;
        name: string;
        slug: string;
    } | null;
    presentation: {
        tablet: "CENTER_MODAL" | "BOTTOM_SHEET" | "FLOATING_RIGHT" | "FLOATING_LEFT" | "TOP_BANNER" | "BOTTOM_BANNER" | "FULLSCREEN" | "SIDE_PANEL_RIGHT" | "SIDE_PANEL_LEFT" | "SLIDE_IN_RIGHT" | "SLIDE_IN_LEFT" | "PROMO_TOAST" | "ANNOUNCEMENT_BAR";
        mobile: "CENTER_MODAL" | "BOTTOM_SHEET" | "FLOATING_RIGHT" | "FLOATING_LEFT" | "TOP_BANNER" | "BOTTOM_BANNER" | "FULLSCREEN" | "SIDE_PANEL_RIGHT" | "SIDE_PANEL_LEFT" | "SLIDE_IN_RIGHT" | "SLIDE_IN_LEFT" | "PROMO_TOAST" | "ANNOUNCEMENT_BAR";
        desktop: "CENTER_MODAL" | "BOTTOM_SHEET" | "FLOATING_RIGHT" | "FLOATING_LEFT" | "TOP_BANNER" | "BOTTOM_BANNER" | "FULLSCREEN" | "SIDE_PANEL_RIGHT" | "SIDE_PANEL_LEFT" | "SLIDE_IN_RIGHT" | "SLIDE_IN_LEFT" | "PROMO_TOAST" | "ANNOUNCEMENT_BAR";
        dismissible: boolean;
        closeOnOverlay: boolean;
        closeOnEscape: boolean;
    };
    recurringSchedule: {
        enabled: boolean;
        weekdays: number[];
        startTime: string;
        endTime: string;
    } | null;
    targeting: {
        rules: {
            id: string;
            operator: "GT" | "IN" | "LT" | "GTE" | "LTE" | "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "NOT_IN" | "NOT_CONTAINS" | "STARTS_WITH" | "MATCHES" | "IS_TRUE" | "IS_FALSE";
            field: "PAGE_TYPE" | "PAGE_PATH" | "PRODUCT_ID" | "CATEGORY_ID" | "DEVICE" | "LOCALE" | "AUTH_STATUS" | "VISITOR_TYPE" | "CUSTOMER_ORDER_COUNT" | "CUSTOMER_TOTAL_SPENT" | "CUSTOMER_AVERAGE_ORDER_VALUE" | "CUSTOMER_IS_VIP" | "PURCHASED_PRODUCT" | "PURCHASED_CATEGORY" | "CART_TOTAL" | "CART_ITEM_COUNT" | "CART_CONTAINS_PRODUCT" | "CART_CONTAINS_CATEGORY" | "FREE_SHIPPING_REMAINING" | "COUNTRY" | "REGION" | "CITY" | "UTM_SOURCE" | "UTM_CAMPAIGN" | "REFERRER_DOMAIN";
            value?: string | number | boolean | string[] | undefined;
        }[];
        logic: "AND" | "OR";
        exclusions: {
            id: string;
            operator: "GT" | "IN" | "LT" | "GTE" | "LTE" | "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "NOT_IN" | "NOT_CONTAINS" | "STARTS_WITH" | "MATCHES" | "IS_TRUE" | "IS_FALSE";
            field: "PAGE_TYPE" | "PAGE_PATH" | "PRODUCT_ID" | "CATEGORY_ID" | "DEVICE" | "LOCALE" | "AUTH_STATUS" | "VISITOR_TYPE" | "CUSTOMER_ORDER_COUNT" | "CUSTOMER_TOTAL_SPENT" | "CUSTOMER_AVERAGE_ORDER_VALUE" | "CUSTOMER_IS_VIP" | "PURCHASED_PRODUCT" | "PURCHASED_CATEGORY" | "CART_TOTAL" | "CART_ITEM_COUNT" | "CART_CONTAINS_PRODUCT" | "CART_CONTAINS_CATEGORY" | "FREE_SHIPPING_REMAINING" | "COUNTRY" | "REGION" | "CITY" | "UTM_SOURCE" | "UTM_CAMPAIGN" | "REFERRER_DOMAIN";
            value?: string | number | boolean | string[] | undefined;
        }[];
    };
    direction: "ltr" | "rtl";
    content: {
        eyebrow: string | null;
        imageAlt: string | null;
        disclaimer: string | null;
        locale: "en" | "ar";
        body: string | null;
        primaryCtaLabel: string | null;
        secondaryCtaLabel: string | null;
        badge: string | null;
        headline: string;
        subtitle: string | null;
        successHeadline: string | null;
        successBody: string | null;
        nameLabel: string | null;
        emailLabel: string | null;
        phoneLabel: string | null;
        submitLabel: string | null;
        consentLabel: string | null;
    };
    appearance: {
        width: "STANDARD" | "COMPACT" | "WIDE";
        alignment: "START" | "CENTER";
        icon: "NONE" | "TRUCK" | "SPARKLE" | "GIFT" | "MEGAPHONE" | "HEART" | "BELL";
        spacing: "COMPACT" | "COMFORTABLE" | "AIRY";
        layout: "IMAGE_TOP" | "SPLIT" | "TEXT_ONLY" | "IMAGE_BACKGROUND";
        animation: "NONE" | "SCALE" | "FADE" | "SLIDE" | "LIFT";
        overlayOpacity: number;
        surface: "SOLID" | "TINTED" | "GLASS";
        borderRadius: "NONE" | "SUBTLE" | "SOFT" | "ROUNDED";
        theme: "BRAND" | "IVORY" | "INK" | "SAGE" | "BLUSH" | "GOLD";
        maxWidth: number;
        imagePosition: "START" | "END" | "TOP" | "BACKGROUND";
        buttonStyle: "OUTLINE" | "SOLID" | "UNDERLINE";
        accentColor: string | null;
    };
    frequency: {
        mode: "ONCE_EVER" | "ONCE_PER_SESSION" | "ONCE_PER_DAY" | "EVERY_X_HOURS" | "EVERY_X_DAYS" | "MAX_IMPRESSIONS" | "UNTIL_INTERACTION" | "UNTIL_CONVERSION" | "UNTIL_CAMPAIGN_ENDS";
        interval: number;
        maxImpressions: number;
        afterDismiss: "DEFAULT" | "SESSION" | "HOURS" | "DAYS" | "NEVER";
        afterDismissInterval: number;
        afterPrimaryAction: "DEFAULT" | "SESSION" | "NEVER";
        afterConversion: "DEFAULT" | "NEVER";
    };
    collision: {
        queueBehavior: "QUEUE" | "SUPPRESS" | "REPLACE_LOWER";
        cooldownSeconds: number;
        suppressLowerPriority: boolean;
        exclusivityKey: string | null;
    };
    primaryAction: {
        type: "NONE" | "NAVIGATE" | "APPLY_COUPON" | "COPY_COUPON" | "CLOSE" | "SUBMIT_FORM";
        productId: string | null;
        url: string | null;
        categoryId: string | null;
        destination: "HOME" | "CATEGORY" | "PRODUCT" | "CART" | "ACCOUNT" | "URL" | null;
        openInNewTab: boolean;
        couponId: string | null;
        closeAfterAction: boolean;
    };
    secondaryAction: {
        type: "NONE" | "NAVIGATE" | "APPLY_COUPON" | "COPY_COUPON" | "CLOSE" | "SUBMIT_FORM";
        productId: string | null;
        url: string | null;
        categoryId: string | null;
        destination: "HOME" | "CATEGORY" | "PRODUCT" | "CART" | "ACCOUNT" | "URL" | null;
        openInNewTab: boolean;
        couponId: string | null;
        closeAfterAction: boolean;
    };
    form: {
        type: "NONE" | "NEWSLETTER" | "LEAD";
        collectName: boolean;
        collectEmail: boolean;
        collectPhone: boolean;
        consentRequired: boolean;
        successAutoCloseSeconds: number;
    };
    countdown: {
        enabled: boolean;
        mode: "CAMPAIGN_END" | "FIXED_TIMESTAMP";
        targetAt: string | null;
    };
    image: {
        width: number;
        height: number;
        url: string;
        alt: string;
    } | null;
}, {
    type: "FREE_SHIPPING" | "FIRST_ORDER" | "CUSTOM" | "PROMOTIONAL" | "SEASONAL" | "NEWSLETTER" | "PRODUCT_LAUNCH" | "DISCOUNT" | "WELCOME" | "EXIT_INTENT" | "ANNOUNCEMENT" | "PRODUCT_RECOMMENDATION" | "CART_REMINDER" | "LIMITED_TIME_SALE" | "RESTOCK" | "PRODUCT_SPECIFIC" | "CATEGORY_SPECIFIC" | "CROSS_SELL" | "ACCOUNT_ENCOURAGEMENT" | "LOGIN_REMINDER" | "LOYALTY_VIP" | "RETURNING_CUSTOMER" | "NEW_VISITOR" | "ORDER_UPDATE" | "STORE_PICKUP" | "DELIVERY_NOTICE" | "SYSTEM_NOTICE" | "MAINTENANCE";
    id: string;
    variantId: string;
    priority: number;
    timezone: string;
    version: number;
    direction: "ltr" | "rtl";
    content: {
        locale: "en" | "ar";
        headline: string;
        eyebrow?: string | null | undefined;
        imageAlt?: string | null | undefined;
        disclaimer?: string | null | undefined;
        body?: string | null | undefined;
        primaryCtaLabel?: string | null | undefined;
        secondaryCtaLabel?: string | null | undefined;
        badge?: string | null | undefined;
        subtitle?: string | null | undefined;
        successHeadline?: string | null | undefined;
        successBody?: string | null | undefined;
        nameLabel?: string | null | undefined;
        emailLabel?: string | null | undefined;
        phoneLabel?: string | null | undefined;
        submitLabel?: string | null | undefined;
        consentLabel?: string | null | undefined;
    };
    category?: {
        id: string;
        name: string;
        slug: string;
    } | null | undefined;
    trigger?: {
        type?: "EXIT_INTENT" | "IMMEDIATE" | "DELAY" | "SCROLL_DEPTH" | "INACTIVITY" | "PAGE_VIEWS" | "SESSION_DURATION" | "PRODUCT_VIEWS" | "ADD_TO_CART" | "REMOVE_FROM_CART" | "CART_THRESHOLD" | "FIRST_VISIT" | "RETURNING_SESSION" | "CUSTOM_EVENT" | undefined;
        categoryIds?: string[] | undefined;
        productIds?: string[] | undefined;
        delaySeconds?: number | undefined;
        scrollPercent?: number | undefined;
        inactivitySeconds?: number | undefined;
        pageViewCount?: number | undefined;
        sessionDurationSeconds?: number | undefined;
        productViewCount?: number | undefined;
        cartThreshold?: number | undefined;
        eventName?: string | null | undefined;
        mobileExitFallback?: "NONE" | "SCROLL_DEPTH" | "INACTIVITY" | undefined;
        mobileExitFallbackValue?: number | undefined;
    } | undefined;
    startsAt?: string | null | undefined;
    endsAt?: string | null | undefined;
    coupon?: {
        code: string;
        id: string;
    } | null | undefined;
    product?: {
        id: string;
        name: string;
        slug: string;
    } | null | undefined;
    presentation?: {
        tablet?: "CENTER_MODAL" | "BOTTOM_SHEET" | "FLOATING_RIGHT" | "FLOATING_LEFT" | "TOP_BANNER" | "BOTTOM_BANNER" | "FULLSCREEN" | "SIDE_PANEL_RIGHT" | "SIDE_PANEL_LEFT" | "SLIDE_IN_RIGHT" | "SLIDE_IN_LEFT" | "PROMO_TOAST" | "ANNOUNCEMENT_BAR" | undefined;
        mobile?: "CENTER_MODAL" | "BOTTOM_SHEET" | "FLOATING_RIGHT" | "FLOATING_LEFT" | "TOP_BANNER" | "BOTTOM_BANNER" | "FULLSCREEN" | "SIDE_PANEL_RIGHT" | "SIDE_PANEL_LEFT" | "SLIDE_IN_RIGHT" | "SLIDE_IN_LEFT" | "PROMO_TOAST" | "ANNOUNCEMENT_BAR" | undefined;
        desktop?: "CENTER_MODAL" | "BOTTOM_SHEET" | "FLOATING_RIGHT" | "FLOATING_LEFT" | "TOP_BANNER" | "BOTTOM_BANNER" | "FULLSCREEN" | "SIDE_PANEL_RIGHT" | "SIDE_PANEL_LEFT" | "SLIDE_IN_RIGHT" | "SLIDE_IN_LEFT" | "PROMO_TOAST" | "ANNOUNCEMENT_BAR" | undefined;
        dismissible?: boolean | undefined;
        closeOnOverlay?: boolean | undefined;
        closeOnEscape?: boolean | undefined;
    } | undefined;
    recurringSchedule?: {
        enabled?: boolean | undefined;
        weekdays?: number[] | undefined;
        startTime?: string | undefined;
        endTime?: string | undefined;
    } | null | undefined;
    targeting?: {
        rules?: {
            id: string;
            operator: "GT" | "IN" | "LT" | "GTE" | "LTE" | "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "NOT_IN" | "NOT_CONTAINS" | "STARTS_WITH" | "MATCHES" | "IS_TRUE" | "IS_FALSE";
            field: "PAGE_TYPE" | "PAGE_PATH" | "PRODUCT_ID" | "CATEGORY_ID" | "DEVICE" | "LOCALE" | "AUTH_STATUS" | "VISITOR_TYPE" | "CUSTOMER_ORDER_COUNT" | "CUSTOMER_TOTAL_SPENT" | "CUSTOMER_AVERAGE_ORDER_VALUE" | "CUSTOMER_IS_VIP" | "PURCHASED_PRODUCT" | "PURCHASED_CATEGORY" | "CART_TOTAL" | "CART_ITEM_COUNT" | "CART_CONTAINS_PRODUCT" | "CART_CONTAINS_CATEGORY" | "FREE_SHIPPING_REMAINING" | "COUNTRY" | "REGION" | "CITY" | "UTM_SOURCE" | "UTM_CAMPAIGN" | "REFERRER_DOMAIN";
            value?: string | number | boolean | string[] | undefined;
        }[] | undefined;
        logic?: "AND" | "OR" | undefined;
        exclusions?: {
            id: string;
            operator: "GT" | "IN" | "LT" | "GTE" | "LTE" | "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "NOT_IN" | "NOT_CONTAINS" | "STARTS_WITH" | "MATCHES" | "IS_TRUE" | "IS_FALSE";
            field: "PAGE_TYPE" | "PAGE_PATH" | "PRODUCT_ID" | "CATEGORY_ID" | "DEVICE" | "LOCALE" | "AUTH_STATUS" | "VISITOR_TYPE" | "CUSTOMER_ORDER_COUNT" | "CUSTOMER_TOTAL_SPENT" | "CUSTOMER_AVERAGE_ORDER_VALUE" | "CUSTOMER_IS_VIP" | "PURCHASED_PRODUCT" | "PURCHASED_CATEGORY" | "CART_TOTAL" | "CART_ITEM_COUNT" | "CART_CONTAINS_PRODUCT" | "CART_CONTAINS_CATEGORY" | "FREE_SHIPPING_REMAINING" | "COUNTRY" | "REGION" | "CITY" | "UTM_SOURCE" | "UTM_CAMPAIGN" | "REFERRER_DOMAIN";
            value?: string | number | boolean | string[] | undefined;
        }[] | undefined;
    } | undefined;
    appearance?: {
        width?: "STANDARD" | "COMPACT" | "WIDE" | undefined;
        alignment?: "START" | "CENTER" | undefined;
        icon?: "NONE" | "TRUCK" | "SPARKLE" | "GIFT" | "MEGAPHONE" | "HEART" | "BELL" | undefined;
        spacing?: "COMPACT" | "COMFORTABLE" | "AIRY" | undefined;
        layout?: "IMAGE_TOP" | "SPLIT" | "TEXT_ONLY" | "IMAGE_BACKGROUND" | undefined;
        animation?: "NONE" | "SCALE" | "FADE" | "SLIDE" | "LIFT" | undefined;
        overlayOpacity?: number | undefined;
        surface?: "SOLID" | "TINTED" | "GLASS" | undefined;
        borderRadius?: "NONE" | "SUBTLE" | "SOFT" | "ROUNDED" | undefined;
        theme?: "BRAND" | "IVORY" | "INK" | "SAGE" | "BLUSH" | "GOLD" | undefined;
        maxWidth?: number | undefined;
        imagePosition?: "START" | "END" | "TOP" | "BACKGROUND" | undefined;
        buttonStyle?: "OUTLINE" | "SOLID" | "UNDERLINE" | undefined;
        accentColor?: string | null | undefined;
    } | undefined;
    frequency?: {
        mode?: "ONCE_EVER" | "ONCE_PER_SESSION" | "ONCE_PER_DAY" | "EVERY_X_HOURS" | "EVERY_X_DAYS" | "MAX_IMPRESSIONS" | "UNTIL_INTERACTION" | "UNTIL_CONVERSION" | "UNTIL_CAMPAIGN_ENDS" | undefined;
        interval?: number | undefined;
        maxImpressions?: number | undefined;
        afterDismiss?: "DEFAULT" | "SESSION" | "HOURS" | "DAYS" | "NEVER" | undefined;
        afterDismissInterval?: number | undefined;
        afterPrimaryAction?: "DEFAULT" | "SESSION" | "NEVER" | undefined;
        afterConversion?: "DEFAULT" | "NEVER" | undefined;
    } | undefined;
    collision?: {
        queueBehavior?: "QUEUE" | "SUPPRESS" | "REPLACE_LOWER" | undefined;
        cooldownSeconds?: number | undefined;
        suppressLowerPriority?: boolean | undefined;
        exclusivityKey?: string | null | undefined;
    } | undefined;
    primaryAction?: {
        type?: "NONE" | "NAVIGATE" | "APPLY_COUPON" | "COPY_COUPON" | "CLOSE" | "SUBMIT_FORM" | undefined;
        productId?: string | null | undefined;
        url?: string | null | undefined;
        categoryId?: string | null | undefined;
        destination?: "HOME" | "CATEGORY" | "PRODUCT" | "CART" | "ACCOUNT" | "URL" | null | undefined;
        openInNewTab?: boolean | undefined;
        couponId?: string | null | undefined;
        closeAfterAction?: boolean | undefined;
    } | undefined;
    secondaryAction?: {
        type?: "NONE" | "NAVIGATE" | "APPLY_COUPON" | "COPY_COUPON" | "CLOSE" | "SUBMIT_FORM" | undefined;
        productId?: string | null | undefined;
        url?: string | null | undefined;
        categoryId?: string | null | undefined;
        destination?: "HOME" | "CATEGORY" | "PRODUCT" | "CART" | "ACCOUNT" | "URL" | null | undefined;
        openInNewTab?: boolean | undefined;
        couponId?: string | null | undefined;
        closeAfterAction?: boolean | undefined;
    } | undefined;
    form?: {
        type?: "NONE" | "NEWSLETTER" | "LEAD" | undefined;
        collectName?: boolean | undefined;
        collectEmail?: boolean | undefined;
        collectPhone?: boolean | undefined;
        consentRequired?: boolean | undefined;
        successAutoCloseSeconds?: number | undefined;
    } | undefined;
    countdown?: {
        enabled?: boolean | undefined;
        mode?: "CAMPAIGN_END" | "FIXED_TIMESTAMP" | undefined;
        targetAt?: string | null | undefined;
    } | undefined;
    image?: {
        width: number;
        height: number;
        url: string;
        alt: string;
    } | null | undefined;
}>;
export type PopupPublishedCampaign = z.infer<typeof popupPublishedCampaignSchema>;
export declare const popupStorefrontResponseSchema: z.ZodObject<{
    campaigns: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        variantId: z.ZodString;
        version: z.ZodNumber;
        type: z.ZodEnum<["PROMOTIONAL", "DISCOUNT", "NEWSLETTER", "WELCOME", "FIRST_ORDER", "EXIT_INTENT", "ANNOUNCEMENT", "PRODUCT_RECOMMENDATION", "CART_REMINDER", "FREE_SHIPPING", "LIMITED_TIME_SALE", "PRODUCT_LAUNCH", "RESTOCK", "PRODUCT_SPECIFIC", "CATEGORY_SPECIFIC", "CROSS_SELL", "ACCOUNT_ENCOURAGEMENT", "LOGIN_REMINDER", "LOYALTY_VIP", "RETURNING_CUSTOMER", "NEW_VISITOR", "ORDER_UPDATE", "STORE_PICKUP", "DELIVERY_NOTICE", "SYSTEM_NOTICE", "MAINTENANCE", "SEASONAL", "CUSTOM"]>;
        priority: z.ZodNumber;
        startsAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        endsAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        timezone: z.ZodString;
        recurringSchedule: z.ZodDefault<z.ZodNullable<z.ZodObject<{
            enabled: z.ZodDefault<z.ZodBoolean>;
            weekdays: z.ZodDefault<z.ZodArray<z.ZodNumber, "many">>;
            startTime: z.ZodDefault<z.ZodString>;
            endTime: z.ZodDefault<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            enabled: boolean;
            weekdays: number[];
            startTime: string;
            endTime: string;
        }, {
            enabled?: boolean | undefined;
            weekdays?: number[] | undefined;
            startTime?: string | undefined;
            endTime?: string | undefined;
        }>>>;
        presentation: z.ZodDefault<z.ZodObject<{
            desktop: z.ZodDefault<z.ZodEnum<["CENTER_MODAL", "BOTTOM_SHEET", "FLOATING_RIGHT", "FLOATING_LEFT", "TOP_BANNER", "BOTTOM_BANNER", "FULLSCREEN", "SIDE_PANEL_RIGHT", "SIDE_PANEL_LEFT", "SLIDE_IN_RIGHT", "SLIDE_IN_LEFT", "PROMO_TOAST", "ANNOUNCEMENT_BAR"]>>;
            tablet: z.ZodDefault<z.ZodEnum<["CENTER_MODAL", "BOTTOM_SHEET", "FLOATING_RIGHT", "FLOATING_LEFT", "TOP_BANNER", "BOTTOM_BANNER", "FULLSCREEN", "SIDE_PANEL_RIGHT", "SIDE_PANEL_LEFT", "SLIDE_IN_RIGHT", "SLIDE_IN_LEFT", "PROMO_TOAST", "ANNOUNCEMENT_BAR"]>>;
            mobile: z.ZodDefault<z.ZodEnum<["CENTER_MODAL", "BOTTOM_SHEET", "FLOATING_RIGHT", "FLOATING_LEFT", "TOP_BANNER", "BOTTOM_BANNER", "FULLSCREEN", "SIDE_PANEL_RIGHT", "SIDE_PANEL_LEFT", "SLIDE_IN_RIGHT", "SLIDE_IN_LEFT", "PROMO_TOAST", "ANNOUNCEMENT_BAR"]>>;
            dismissible: z.ZodDefault<z.ZodBoolean>;
            closeOnOverlay: z.ZodDefault<z.ZodBoolean>;
            closeOnEscape: z.ZodDefault<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            tablet: "CENTER_MODAL" | "BOTTOM_SHEET" | "FLOATING_RIGHT" | "FLOATING_LEFT" | "TOP_BANNER" | "BOTTOM_BANNER" | "FULLSCREEN" | "SIDE_PANEL_RIGHT" | "SIDE_PANEL_LEFT" | "SLIDE_IN_RIGHT" | "SLIDE_IN_LEFT" | "PROMO_TOAST" | "ANNOUNCEMENT_BAR";
            mobile: "CENTER_MODAL" | "BOTTOM_SHEET" | "FLOATING_RIGHT" | "FLOATING_LEFT" | "TOP_BANNER" | "BOTTOM_BANNER" | "FULLSCREEN" | "SIDE_PANEL_RIGHT" | "SIDE_PANEL_LEFT" | "SLIDE_IN_RIGHT" | "SLIDE_IN_LEFT" | "PROMO_TOAST" | "ANNOUNCEMENT_BAR";
            desktop: "CENTER_MODAL" | "BOTTOM_SHEET" | "FLOATING_RIGHT" | "FLOATING_LEFT" | "TOP_BANNER" | "BOTTOM_BANNER" | "FULLSCREEN" | "SIDE_PANEL_RIGHT" | "SIDE_PANEL_LEFT" | "SLIDE_IN_RIGHT" | "SLIDE_IN_LEFT" | "PROMO_TOAST" | "ANNOUNCEMENT_BAR";
            dismissible: boolean;
            closeOnOverlay: boolean;
            closeOnEscape: boolean;
        }, {
            tablet?: "CENTER_MODAL" | "BOTTOM_SHEET" | "FLOATING_RIGHT" | "FLOATING_LEFT" | "TOP_BANNER" | "BOTTOM_BANNER" | "FULLSCREEN" | "SIDE_PANEL_RIGHT" | "SIDE_PANEL_LEFT" | "SLIDE_IN_RIGHT" | "SLIDE_IN_LEFT" | "PROMO_TOAST" | "ANNOUNCEMENT_BAR" | undefined;
            mobile?: "CENTER_MODAL" | "BOTTOM_SHEET" | "FLOATING_RIGHT" | "FLOATING_LEFT" | "TOP_BANNER" | "BOTTOM_BANNER" | "FULLSCREEN" | "SIDE_PANEL_RIGHT" | "SIDE_PANEL_LEFT" | "SLIDE_IN_RIGHT" | "SLIDE_IN_LEFT" | "PROMO_TOAST" | "ANNOUNCEMENT_BAR" | undefined;
            desktop?: "CENTER_MODAL" | "BOTTOM_SHEET" | "FLOATING_RIGHT" | "FLOATING_LEFT" | "TOP_BANNER" | "BOTTOM_BANNER" | "FULLSCREEN" | "SIDE_PANEL_RIGHT" | "SIDE_PANEL_LEFT" | "SLIDE_IN_RIGHT" | "SLIDE_IN_LEFT" | "PROMO_TOAST" | "ANNOUNCEMENT_BAR" | undefined;
            dismissible?: boolean | undefined;
            closeOnOverlay?: boolean | undefined;
            closeOnEscape?: boolean | undefined;
        }>>;
        appearance: z.ZodDefault<z.ZodObject<{
            theme: z.ZodDefault<z.ZodEnum<["IVORY", "INK", "SAGE", "BLUSH", "GOLD", "BRAND"]>>;
            icon: z.ZodDefault<z.ZodEnum<["NONE", "SPARKLE", "GIFT", "MEGAPHONE", "TRUCK", "HEART", "BELL"]>>;
            layout: z.ZodDefault<z.ZodEnum<["TEXT_ONLY", "SPLIT", "IMAGE_TOP", "IMAGE_BACKGROUND"]>>;
            width: z.ZodDefault<z.ZodEnum<["COMPACT", "STANDARD", "WIDE"]>>;
            maxWidth: z.ZodDefault<z.ZodNumber>;
            spacing: z.ZodDefault<z.ZodEnum<["COMPACT", "COMFORTABLE", "AIRY"]>>;
            alignment: z.ZodDefault<z.ZodEnum<["START", "CENTER"]>>;
            imagePosition: z.ZodDefault<z.ZodEnum<["START", "END", "TOP", "BACKGROUND"]>>;
            borderRadius: z.ZodDefault<z.ZodEnum<["NONE", "SUBTLE", "SOFT", "ROUNDED"]>>;
            overlayOpacity: z.ZodDefault<z.ZodNumber>;
            buttonStyle: z.ZodDefault<z.ZodEnum<["SOLID", "OUTLINE", "UNDERLINE"]>>;
            surface: z.ZodDefault<z.ZodEnum<["SOLID", "TINTED", "GLASS"]>>;
            animation: z.ZodDefault<z.ZodEnum<["FADE", "LIFT", "SCALE", "SLIDE", "NONE"]>>;
            accentColor: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
            width: "STANDARD" | "COMPACT" | "WIDE";
            alignment: "START" | "CENTER";
            icon: "NONE" | "TRUCK" | "SPARKLE" | "GIFT" | "MEGAPHONE" | "HEART" | "BELL";
            spacing: "COMPACT" | "COMFORTABLE" | "AIRY";
            layout: "IMAGE_TOP" | "SPLIT" | "TEXT_ONLY" | "IMAGE_BACKGROUND";
            animation: "NONE" | "SCALE" | "FADE" | "SLIDE" | "LIFT";
            overlayOpacity: number;
            surface: "SOLID" | "TINTED" | "GLASS";
            borderRadius: "NONE" | "SUBTLE" | "SOFT" | "ROUNDED";
            theme: "BRAND" | "IVORY" | "INK" | "SAGE" | "BLUSH" | "GOLD";
            maxWidth: number;
            imagePosition: "START" | "END" | "TOP" | "BACKGROUND";
            buttonStyle: "OUTLINE" | "SOLID" | "UNDERLINE";
            accentColor: string | null;
        }, {
            width?: "STANDARD" | "COMPACT" | "WIDE" | undefined;
            alignment?: "START" | "CENTER" | undefined;
            icon?: "NONE" | "TRUCK" | "SPARKLE" | "GIFT" | "MEGAPHONE" | "HEART" | "BELL" | undefined;
            spacing?: "COMPACT" | "COMFORTABLE" | "AIRY" | undefined;
            layout?: "IMAGE_TOP" | "SPLIT" | "TEXT_ONLY" | "IMAGE_BACKGROUND" | undefined;
            animation?: "NONE" | "SCALE" | "FADE" | "SLIDE" | "LIFT" | undefined;
            overlayOpacity?: number | undefined;
            surface?: "SOLID" | "TINTED" | "GLASS" | undefined;
            borderRadius?: "NONE" | "SUBTLE" | "SOFT" | "ROUNDED" | undefined;
            theme?: "BRAND" | "IVORY" | "INK" | "SAGE" | "BLUSH" | "GOLD" | undefined;
            maxWidth?: number | undefined;
            imagePosition?: "START" | "END" | "TOP" | "BACKGROUND" | undefined;
            buttonStyle?: "OUTLINE" | "SOLID" | "UNDERLINE" | undefined;
            accentColor?: string | null | undefined;
        }>>;
        targeting: z.ZodDefault<z.ZodObject<{
            logic: z.ZodDefault<z.ZodEnum<["AND", "OR"]>>;
            rules: z.ZodDefault<z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                field: z.ZodEnum<["PAGE_TYPE", "PAGE_PATH", "PRODUCT_ID", "CATEGORY_ID", "DEVICE", "LOCALE", "AUTH_STATUS", "VISITOR_TYPE", "CUSTOMER_ORDER_COUNT", "CUSTOMER_TOTAL_SPENT", "CUSTOMER_AVERAGE_ORDER_VALUE", "CUSTOMER_IS_VIP", "PURCHASED_PRODUCT", "PURCHASED_CATEGORY", "CART_TOTAL", "CART_ITEM_COUNT", "CART_CONTAINS_PRODUCT", "CART_CONTAINS_CATEGORY", "FREE_SHIPPING_REMAINING", "COUNTRY", "REGION", "CITY", "UTM_SOURCE", "UTM_CAMPAIGN", "REFERRER_DOMAIN"]>;
                operator: z.ZodEnum<["EQUALS", "NOT_EQUALS", "IN", "NOT_IN", "CONTAINS", "NOT_CONTAINS", "STARTS_WITH", "MATCHES", "GT", "GTE", "LT", "LTE", "IS_TRUE", "IS_FALSE"]>;
                value: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodString, "many">]>>;
            }, "strip", z.ZodTypeAny, {
                id: string;
                operator: "GT" | "IN" | "LT" | "GTE" | "LTE" | "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "NOT_IN" | "NOT_CONTAINS" | "STARTS_WITH" | "MATCHES" | "IS_TRUE" | "IS_FALSE";
                field: "PAGE_TYPE" | "PAGE_PATH" | "PRODUCT_ID" | "CATEGORY_ID" | "DEVICE" | "LOCALE" | "AUTH_STATUS" | "VISITOR_TYPE" | "CUSTOMER_ORDER_COUNT" | "CUSTOMER_TOTAL_SPENT" | "CUSTOMER_AVERAGE_ORDER_VALUE" | "CUSTOMER_IS_VIP" | "PURCHASED_PRODUCT" | "PURCHASED_CATEGORY" | "CART_TOTAL" | "CART_ITEM_COUNT" | "CART_CONTAINS_PRODUCT" | "CART_CONTAINS_CATEGORY" | "FREE_SHIPPING_REMAINING" | "COUNTRY" | "REGION" | "CITY" | "UTM_SOURCE" | "UTM_CAMPAIGN" | "REFERRER_DOMAIN";
                value?: string | number | boolean | string[] | undefined;
            }, {
                id: string;
                operator: "GT" | "IN" | "LT" | "GTE" | "LTE" | "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "NOT_IN" | "NOT_CONTAINS" | "STARTS_WITH" | "MATCHES" | "IS_TRUE" | "IS_FALSE";
                field: "PAGE_TYPE" | "PAGE_PATH" | "PRODUCT_ID" | "CATEGORY_ID" | "DEVICE" | "LOCALE" | "AUTH_STATUS" | "VISITOR_TYPE" | "CUSTOMER_ORDER_COUNT" | "CUSTOMER_TOTAL_SPENT" | "CUSTOMER_AVERAGE_ORDER_VALUE" | "CUSTOMER_IS_VIP" | "PURCHASED_PRODUCT" | "PURCHASED_CATEGORY" | "CART_TOTAL" | "CART_ITEM_COUNT" | "CART_CONTAINS_PRODUCT" | "CART_CONTAINS_CATEGORY" | "FREE_SHIPPING_REMAINING" | "COUNTRY" | "REGION" | "CITY" | "UTM_SOURCE" | "UTM_CAMPAIGN" | "REFERRER_DOMAIN";
                value?: string | number | boolean | string[] | undefined;
            }>, "many">>;
            exclusions: z.ZodDefault<z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                field: z.ZodEnum<["PAGE_TYPE", "PAGE_PATH", "PRODUCT_ID", "CATEGORY_ID", "DEVICE", "LOCALE", "AUTH_STATUS", "VISITOR_TYPE", "CUSTOMER_ORDER_COUNT", "CUSTOMER_TOTAL_SPENT", "CUSTOMER_AVERAGE_ORDER_VALUE", "CUSTOMER_IS_VIP", "PURCHASED_PRODUCT", "PURCHASED_CATEGORY", "CART_TOTAL", "CART_ITEM_COUNT", "CART_CONTAINS_PRODUCT", "CART_CONTAINS_CATEGORY", "FREE_SHIPPING_REMAINING", "COUNTRY", "REGION", "CITY", "UTM_SOURCE", "UTM_CAMPAIGN", "REFERRER_DOMAIN"]>;
                operator: z.ZodEnum<["EQUALS", "NOT_EQUALS", "IN", "NOT_IN", "CONTAINS", "NOT_CONTAINS", "STARTS_WITH", "MATCHES", "GT", "GTE", "LT", "LTE", "IS_TRUE", "IS_FALSE"]>;
                value: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodString, "many">]>>;
            }, "strip", z.ZodTypeAny, {
                id: string;
                operator: "GT" | "IN" | "LT" | "GTE" | "LTE" | "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "NOT_IN" | "NOT_CONTAINS" | "STARTS_WITH" | "MATCHES" | "IS_TRUE" | "IS_FALSE";
                field: "PAGE_TYPE" | "PAGE_PATH" | "PRODUCT_ID" | "CATEGORY_ID" | "DEVICE" | "LOCALE" | "AUTH_STATUS" | "VISITOR_TYPE" | "CUSTOMER_ORDER_COUNT" | "CUSTOMER_TOTAL_SPENT" | "CUSTOMER_AVERAGE_ORDER_VALUE" | "CUSTOMER_IS_VIP" | "PURCHASED_PRODUCT" | "PURCHASED_CATEGORY" | "CART_TOTAL" | "CART_ITEM_COUNT" | "CART_CONTAINS_PRODUCT" | "CART_CONTAINS_CATEGORY" | "FREE_SHIPPING_REMAINING" | "COUNTRY" | "REGION" | "CITY" | "UTM_SOURCE" | "UTM_CAMPAIGN" | "REFERRER_DOMAIN";
                value?: string | number | boolean | string[] | undefined;
            }, {
                id: string;
                operator: "GT" | "IN" | "LT" | "GTE" | "LTE" | "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "NOT_IN" | "NOT_CONTAINS" | "STARTS_WITH" | "MATCHES" | "IS_TRUE" | "IS_FALSE";
                field: "PAGE_TYPE" | "PAGE_PATH" | "PRODUCT_ID" | "CATEGORY_ID" | "DEVICE" | "LOCALE" | "AUTH_STATUS" | "VISITOR_TYPE" | "CUSTOMER_ORDER_COUNT" | "CUSTOMER_TOTAL_SPENT" | "CUSTOMER_AVERAGE_ORDER_VALUE" | "CUSTOMER_IS_VIP" | "PURCHASED_PRODUCT" | "PURCHASED_CATEGORY" | "CART_TOTAL" | "CART_ITEM_COUNT" | "CART_CONTAINS_PRODUCT" | "CART_CONTAINS_CATEGORY" | "FREE_SHIPPING_REMAINING" | "COUNTRY" | "REGION" | "CITY" | "UTM_SOURCE" | "UTM_CAMPAIGN" | "REFERRER_DOMAIN";
                value?: string | number | boolean | string[] | undefined;
            }>, "many">>;
        }, "strip", z.ZodTypeAny, {
            rules: {
                id: string;
                operator: "GT" | "IN" | "LT" | "GTE" | "LTE" | "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "NOT_IN" | "NOT_CONTAINS" | "STARTS_WITH" | "MATCHES" | "IS_TRUE" | "IS_FALSE";
                field: "PAGE_TYPE" | "PAGE_PATH" | "PRODUCT_ID" | "CATEGORY_ID" | "DEVICE" | "LOCALE" | "AUTH_STATUS" | "VISITOR_TYPE" | "CUSTOMER_ORDER_COUNT" | "CUSTOMER_TOTAL_SPENT" | "CUSTOMER_AVERAGE_ORDER_VALUE" | "CUSTOMER_IS_VIP" | "PURCHASED_PRODUCT" | "PURCHASED_CATEGORY" | "CART_TOTAL" | "CART_ITEM_COUNT" | "CART_CONTAINS_PRODUCT" | "CART_CONTAINS_CATEGORY" | "FREE_SHIPPING_REMAINING" | "COUNTRY" | "REGION" | "CITY" | "UTM_SOURCE" | "UTM_CAMPAIGN" | "REFERRER_DOMAIN";
                value?: string | number | boolean | string[] | undefined;
            }[];
            logic: "AND" | "OR";
            exclusions: {
                id: string;
                operator: "GT" | "IN" | "LT" | "GTE" | "LTE" | "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "NOT_IN" | "NOT_CONTAINS" | "STARTS_WITH" | "MATCHES" | "IS_TRUE" | "IS_FALSE";
                field: "PAGE_TYPE" | "PAGE_PATH" | "PRODUCT_ID" | "CATEGORY_ID" | "DEVICE" | "LOCALE" | "AUTH_STATUS" | "VISITOR_TYPE" | "CUSTOMER_ORDER_COUNT" | "CUSTOMER_TOTAL_SPENT" | "CUSTOMER_AVERAGE_ORDER_VALUE" | "CUSTOMER_IS_VIP" | "PURCHASED_PRODUCT" | "PURCHASED_CATEGORY" | "CART_TOTAL" | "CART_ITEM_COUNT" | "CART_CONTAINS_PRODUCT" | "CART_CONTAINS_CATEGORY" | "FREE_SHIPPING_REMAINING" | "COUNTRY" | "REGION" | "CITY" | "UTM_SOURCE" | "UTM_CAMPAIGN" | "REFERRER_DOMAIN";
                value?: string | number | boolean | string[] | undefined;
            }[];
        }, {
            rules?: {
                id: string;
                operator: "GT" | "IN" | "LT" | "GTE" | "LTE" | "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "NOT_IN" | "NOT_CONTAINS" | "STARTS_WITH" | "MATCHES" | "IS_TRUE" | "IS_FALSE";
                field: "PAGE_TYPE" | "PAGE_PATH" | "PRODUCT_ID" | "CATEGORY_ID" | "DEVICE" | "LOCALE" | "AUTH_STATUS" | "VISITOR_TYPE" | "CUSTOMER_ORDER_COUNT" | "CUSTOMER_TOTAL_SPENT" | "CUSTOMER_AVERAGE_ORDER_VALUE" | "CUSTOMER_IS_VIP" | "PURCHASED_PRODUCT" | "PURCHASED_CATEGORY" | "CART_TOTAL" | "CART_ITEM_COUNT" | "CART_CONTAINS_PRODUCT" | "CART_CONTAINS_CATEGORY" | "FREE_SHIPPING_REMAINING" | "COUNTRY" | "REGION" | "CITY" | "UTM_SOURCE" | "UTM_CAMPAIGN" | "REFERRER_DOMAIN";
                value?: string | number | boolean | string[] | undefined;
            }[] | undefined;
            logic?: "AND" | "OR" | undefined;
            exclusions?: {
                id: string;
                operator: "GT" | "IN" | "LT" | "GTE" | "LTE" | "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "NOT_IN" | "NOT_CONTAINS" | "STARTS_WITH" | "MATCHES" | "IS_TRUE" | "IS_FALSE";
                field: "PAGE_TYPE" | "PAGE_PATH" | "PRODUCT_ID" | "CATEGORY_ID" | "DEVICE" | "LOCALE" | "AUTH_STATUS" | "VISITOR_TYPE" | "CUSTOMER_ORDER_COUNT" | "CUSTOMER_TOTAL_SPENT" | "CUSTOMER_AVERAGE_ORDER_VALUE" | "CUSTOMER_IS_VIP" | "PURCHASED_PRODUCT" | "PURCHASED_CATEGORY" | "CART_TOTAL" | "CART_ITEM_COUNT" | "CART_CONTAINS_PRODUCT" | "CART_CONTAINS_CATEGORY" | "FREE_SHIPPING_REMAINING" | "COUNTRY" | "REGION" | "CITY" | "UTM_SOURCE" | "UTM_CAMPAIGN" | "REFERRER_DOMAIN";
                value?: string | number | boolean | string[] | undefined;
            }[] | undefined;
        }>>;
        trigger: z.ZodDefault<z.ZodObject<{
            type: z.ZodDefault<z.ZodEnum<["IMMEDIATE", "DELAY", "SCROLL_DEPTH", "EXIT_INTENT", "INACTIVITY", "PAGE_VIEWS", "SESSION_DURATION", "PRODUCT_VIEWS", "ADD_TO_CART", "REMOVE_FROM_CART", "CART_THRESHOLD", "FIRST_VISIT", "RETURNING_SESSION", "CUSTOM_EVENT"]>>;
            delaySeconds: z.ZodDefault<z.ZodNumber>;
            scrollPercent: z.ZodDefault<z.ZodNumber>;
            inactivitySeconds: z.ZodDefault<z.ZodNumber>;
            pageViewCount: z.ZodDefault<z.ZodNumber>;
            sessionDurationSeconds: z.ZodDefault<z.ZodNumber>;
            productViewCount: z.ZodDefault<z.ZodNumber>;
            cartThreshold: z.ZodDefault<z.ZodNumber>;
            eventName: z.ZodDefault<z.ZodNullable<z.ZodString>>;
            productIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            categoryIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            mobileExitFallback: z.ZodDefault<z.ZodEnum<["NONE", "INACTIVITY", "SCROLL_DEPTH"]>>;
            mobileExitFallbackValue: z.ZodDefault<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            type: "EXIT_INTENT" | "IMMEDIATE" | "DELAY" | "SCROLL_DEPTH" | "INACTIVITY" | "PAGE_VIEWS" | "SESSION_DURATION" | "PRODUCT_VIEWS" | "ADD_TO_CART" | "REMOVE_FROM_CART" | "CART_THRESHOLD" | "FIRST_VISIT" | "RETURNING_SESSION" | "CUSTOM_EVENT";
            categoryIds: string[];
            productIds: string[];
            delaySeconds: number;
            scrollPercent: number;
            inactivitySeconds: number;
            pageViewCount: number;
            sessionDurationSeconds: number;
            productViewCount: number;
            cartThreshold: number;
            eventName: string | null;
            mobileExitFallback: "NONE" | "SCROLL_DEPTH" | "INACTIVITY";
            mobileExitFallbackValue: number;
        }, {
            type?: "EXIT_INTENT" | "IMMEDIATE" | "DELAY" | "SCROLL_DEPTH" | "INACTIVITY" | "PAGE_VIEWS" | "SESSION_DURATION" | "PRODUCT_VIEWS" | "ADD_TO_CART" | "REMOVE_FROM_CART" | "CART_THRESHOLD" | "FIRST_VISIT" | "RETURNING_SESSION" | "CUSTOM_EVENT" | undefined;
            categoryIds?: string[] | undefined;
            productIds?: string[] | undefined;
            delaySeconds?: number | undefined;
            scrollPercent?: number | undefined;
            inactivitySeconds?: number | undefined;
            pageViewCount?: number | undefined;
            sessionDurationSeconds?: number | undefined;
            productViewCount?: number | undefined;
            cartThreshold?: number | undefined;
            eventName?: string | null | undefined;
            mobileExitFallback?: "NONE" | "SCROLL_DEPTH" | "INACTIVITY" | undefined;
            mobileExitFallbackValue?: number | undefined;
        }>>;
        frequency: z.ZodDefault<z.ZodObject<{
            mode: z.ZodDefault<z.ZodEnum<["ONCE_EVER", "ONCE_PER_SESSION", "ONCE_PER_DAY", "EVERY_X_HOURS", "EVERY_X_DAYS", "MAX_IMPRESSIONS", "UNTIL_INTERACTION", "UNTIL_CONVERSION", "UNTIL_CAMPAIGN_ENDS"]>>;
            interval: z.ZodDefault<z.ZodNumber>;
            maxImpressions: z.ZodDefault<z.ZodNumber>;
            afterDismiss: z.ZodDefault<z.ZodEnum<["DEFAULT", "SESSION", "HOURS", "DAYS", "NEVER"]>>;
            afterDismissInterval: z.ZodDefault<z.ZodNumber>;
            afterPrimaryAction: z.ZodDefault<z.ZodEnum<["DEFAULT", "SESSION", "NEVER"]>>;
            afterConversion: z.ZodDefault<z.ZodEnum<["DEFAULT", "NEVER"]>>;
        }, "strip", z.ZodTypeAny, {
            mode: "ONCE_EVER" | "ONCE_PER_SESSION" | "ONCE_PER_DAY" | "EVERY_X_HOURS" | "EVERY_X_DAYS" | "MAX_IMPRESSIONS" | "UNTIL_INTERACTION" | "UNTIL_CONVERSION" | "UNTIL_CAMPAIGN_ENDS";
            interval: number;
            maxImpressions: number;
            afterDismiss: "DEFAULT" | "SESSION" | "HOURS" | "DAYS" | "NEVER";
            afterDismissInterval: number;
            afterPrimaryAction: "DEFAULT" | "SESSION" | "NEVER";
            afterConversion: "DEFAULT" | "NEVER";
        }, {
            mode?: "ONCE_EVER" | "ONCE_PER_SESSION" | "ONCE_PER_DAY" | "EVERY_X_HOURS" | "EVERY_X_DAYS" | "MAX_IMPRESSIONS" | "UNTIL_INTERACTION" | "UNTIL_CONVERSION" | "UNTIL_CAMPAIGN_ENDS" | undefined;
            interval?: number | undefined;
            maxImpressions?: number | undefined;
            afterDismiss?: "DEFAULT" | "SESSION" | "HOURS" | "DAYS" | "NEVER" | undefined;
            afterDismissInterval?: number | undefined;
            afterPrimaryAction?: "DEFAULT" | "SESSION" | "NEVER" | undefined;
            afterConversion?: "DEFAULT" | "NEVER" | undefined;
        }>>;
        collision: z.ZodDefault<z.ZodObject<{
            queueBehavior: z.ZodDefault<z.ZodEnum<["QUEUE", "SUPPRESS", "REPLACE_LOWER"]>>;
            cooldownSeconds: z.ZodDefault<z.ZodNumber>;
            suppressLowerPriority: z.ZodDefault<z.ZodBoolean>;
            exclusivityKey: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
            queueBehavior: "QUEUE" | "SUPPRESS" | "REPLACE_LOWER";
            cooldownSeconds: number;
            suppressLowerPriority: boolean;
            exclusivityKey: string | null;
        }, {
            queueBehavior?: "QUEUE" | "SUPPRESS" | "REPLACE_LOWER" | undefined;
            cooldownSeconds?: number | undefined;
            suppressLowerPriority?: boolean | undefined;
            exclusivityKey?: string | null | undefined;
        }>>;
        primaryAction: z.ZodDefault<z.ZodObject<{
            type: z.ZodDefault<z.ZodEnum<["NONE", "NAVIGATE", "APPLY_COUPON", "COPY_COUPON", "CLOSE", "SUBMIT_FORM"]>>;
            destination: z.ZodDefault<z.ZodNullable<z.ZodEnum<["URL", "PRODUCT", "CATEGORY", "CART", "ACCOUNT", "HOME"]>>>;
            url: z.ZodDefault<z.ZodNullable<z.ZodEffects<z.ZodString, string, string>>>;
            productId: z.ZodDefault<z.ZodNullable<z.ZodString>>;
            categoryId: z.ZodDefault<z.ZodNullable<z.ZodString>>;
            couponId: z.ZodDefault<z.ZodNullable<z.ZodString>>;
            openInNewTab: z.ZodDefault<z.ZodBoolean>;
            closeAfterAction: z.ZodDefault<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            type: "NONE" | "NAVIGATE" | "APPLY_COUPON" | "COPY_COUPON" | "CLOSE" | "SUBMIT_FORM";
            productId: string | null;
            url: string | null;
            categoryId: string | null;
            destination: "HOME" | "CATEGORY" | "PRODUCT" | "CART" | "ACCOUNT" | "URL" | null;
            openInNewTab: boolean;
            couponId: string | null;
            closeAfterAction: boolean;
        }, {
            type?: "NONE" | "NAVIGATE" | "APPLY_COUPON" | "COPY_COUPON" | "CLOSE" | "SUBMIT_FORM" | undefined;
            productId?: string | null | undefined;
            url?: string | null | undefined;
            categoryId?: string | null | undefined;
            destination?: "HOME" | "CATEGORY" | "PRODUCT" | "CART" | "ACCOUNT" | "URL" | null | undefined;
            openInNewTab?: boolean | undefined;
            couponId?: string | null | undefined;
            closeAfterAction?: boolean | undefined;
        }>>;
        secondaryAction: z.ZodDefault<z.ZodObject<{
            type: z.ZodDefault<z.ZodEnum<["NONE", "NAVIGATE", "APPLY_COUPON", "COPY_COUPON", "CLOSE", "SUBMIT_FORM"]>>;
            destination: z.ZodDefault<z.ZodNullable<z.ZodEnum<["URL", "PRODUCT", "CATEGORY", "CART", "ACCOUNT", "HOME"]>>>;
            url: z.ZodDefault<z.ZodNullable<z.ZodEffects<z.ZodString, string, string>>>;
            productId: z.ZodDefault<z.ZodNullable<z.ZodString>>;
            categoryId: z.ZodDefault<z.ZodNullable<z.ZodString>>;
            couponId: z.ZodDefault<z.ZodNullable<z.ZodString>>;
            openInNewTab: z.ZodDefault<z.ZodBoolean>;
            closeAfterAction: z.ZodDefault<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            type: "NONE" | "NAVIGATE" | "APPLY_COUPON" | "COPY_COUPON" | "CLOSE" | "SUBMIT_FORM";
            productId: string | null;
            url: string | null;
            categoryId: string | null;
            destination: "HOME" | "CATEGORY" | "PRODUCT" | "CART" | "ACCOUNT" | "URL" | null;
            openInNewTab: boolean;
            couponId: string | null;
            closeAfterAction: boolean;
        }, {
            type?: "NONE" | "NAVIGATE" | "APPLY_COUPON" | "COPY_COUPON" | "CLOSE" | "SUBMIT_FORM" | undefined;
            productId?: string | null | undefined;
            url?: string | null | undefined;
            categoryId?: string | null | undefined;
            destination?: "HOME" | "CATEGORY" | "PRODUCT" | "CART" | "ACCOUNT" | "URL" | null | undefined;
            openInNewTab?: boolean | undefined;
            couponId?: string | null | undefined;
            closeAfterAction?: boolean | undefined;
        }>>;
        form: z.ZodDefault<z.ZodObject<{
            type: z.ZodDefault<z.ZodEnum<["NONE", "NEWSLETTER", "LEAD"]>>;
            collectName: z.ZodDefault<z.ZodBoolean>;
            collectEmail: z.ZodDefault<z.ZodBoolean>;
            collectPhone: z.ZodDefault<z.ZodBoolean>;
            consentRequired: z.ZodDefault<z.ZodBoolean>;
            successAutoCloseSeconds: z.ZodDefault<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            type: "NONE" | "NEWSLETTER" | "LEAD";
            collectName: boolean;
            collectEmail: boolean;
            collectPhone: boolean;
            consentRequired: boolean;
            successAutoCloseSeconds: number;
        }, {
            type?: "NONE" | "NEWSLETTER" | "LEAD" | undefined;
            collectName?: boolean | undefined;
            collectEmail?: boolean | undefined;
            collectPhone?: boolean | undefined;
            consentRequired?: boolean | undefined;
            successAutoCloseSeconds?: number | undefined;
        }>>;
        countdown: z.ZodDefault<z.ZodObject<{
            enabled: z.ZodDefault<z.ZodBoolean>;
            mode: z.ZodDefault<z.ZodEnum<["CAMPAIGN_END", "FIXED_TIMESTAMP"]>>;
            targetAt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
            enabled: boolean;
            mode: "CAMPAIGN_END" | "FIXED_TIMESTAMP";
            targetAt: string | null;
        }, {
            enabled?: boolean | undefined;
            mode?: "CAMPAIGN_END" | "FIXED_TIMESTAMP" | undefined;
            targetAt?: string | null | undefined;
        }>>;
        content: z.ZodObject<{
            locale: z.ZodEnum<["en", "ar"]>;
            eyebrow: z.ZodDefault<z.ZodNullable<z.ZodString>>;
            badge: z.ZodDefault<z.ZodNullable<z.ZodString>>;
            headline: z.ZodString;
            subtitle: z.ZodDefault<z.ZodNullable<z.ZodString>>;
            body: z.ZodDefault<z.ZodNullable<z.ZodString>>;
            imageAlt: z.ZodDefault<z.ZodNullable<z.ZodString>>;
            primaryCtaLabel: z.ZodDefault<z.ZodNullable<z.ZodString>>;
            secondaryCtaLabel: z.ZodDefault<z.ZodNullable<z.ZodString>>;
            disclaimer: z.ZodDefault<z.ZodNullable<z.ZodString>>;
            successHeadline: z.ZodDefault<z.ZodNullable<z.ZodString>>;
            successBody: z.ZodDefault<z.ZodNullable<z.ZodString>>;
            nameLabel: z.ZodDefault<z.ZodNullable<z.ZodString>>;
            emailLabel: z.ZodDefault<z.ZodNullable<z.ZodString>>;
            phoneLabel: z.ZodDefault<z.ZodNullable<z.ZodString>>;
            submitLabel: z.ZodDefault<z.ZodNullable<z.ZodString>>;
            consentLabel: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
            eyebrow: string | null;
            imageAlt: string | null;
            disclaimer: string | null;
            locale: "en" | "ar";
            body: string | null;
            primaryCtaLabel: string | null;
            secondaryCtaLabel: string | null;
            badge: string | null;
            headline: string;
            subtitle: string | null;
            successHeadline: string | null;
            successBody: string | null;
            nameLabel: string | null;
            emailLabel: string | null;
            phoneLabel: string | null;
            submitLabel: string | null;
            consentLabel: string | null;
        }, {
            locale: "en" | "ar";
            headline: string;
            eyebrow?: string | null | undefined;
            imageAlt?: string | null | undefined;
            disclaimer?: string | null | undefined;
            body?: string | null | undefined;
            primaryCtaLabel?: string | null | undefined;
            secondaryCtaLabel?: string | null | undefined;
            badge?: string | null | undefined;
            subtitle?: string | null | undefined;
            successHeadline?: string | null | undefined;
            successBody?: string | null | undefined;
            nameLabel?: string | null | undefined;
            emailLabel?: string | null | undefined;
            phoneLabel?: string | null | undefined;
            submitLabel?: string | null | undefined;
            consentLabel?: string | null | undefined;
        }>;
        direction: z.ZodEnum<["ltr", "rtl"]>;
        image: z.ZodDefault<z.ZodNullable<z.ZodObject<{
            url: z.ZodEffects<z.ZodString, string, string>;
            width: z.ZodNumber;
            height: z.ZodNumber;
            alt: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            width: number;
            height: number;
            url: string;
            alt: string;
        }, {
            width: number;
            height: number;
            url: string;
            alt: string;
        }>>>;
        coupon: z.ZodDefault<z.ZodNullable<z.ZodObject<{
            id: z.ZodString;
            code: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            code: string;
            id: string;
        }, {
            code: string;
            id: string;
        }>>>;
        product: z.ZodDefault<z.ZodNullable<z.ZodObject<{
            id: z.ZodString;
            slug: z.ZodString;
            name: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            id: string;
            name: string;
            slug: string;
        }, {
            id: string;
            name: string;
            slug: string;
        }>>>;
        category: z.ZodDefault<z.ZodNullable<z.ZodObject<{
            id: z.ZodString;
            slug: z.ZodString;
            name: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            id: string;
            name: string;
            slug: string;
        }, {
            id: string;
            name: string;
            slug: string;
        }>>>;
    }, "strip", z.ZodTypeAny, {
        type: "FREE_SHIPPING" | "FIRST_ORDER" | "CUSTOM" | "PROMOTIONAL" | "SEASONAL" | "NEWSLETTER" | "PRODUCT_LAUNCH" | "DISCOUNT" | "WELCOME" | "EXIT_INTENT" | "ANNOUNCEMENT" | "PRODUCT_RECOMMENDATION" | "CART_REMINDER" | "LIMITED_TIME_SALE" | "RESTOCK" | "PRODUCT_SPECIFIC" | "CATEGORY_SPECIFIC" | "CROSS_SELL" | "ACCOUNT_ENCOURAGEMENT" | "LOGIN_REMINDER" | "LOYALTY_VIP" | "RETURNING_CUSTOMER" | "NEW_VISITOR" | "ORDER_UPDATE" | "STORE_PICKUP" | "DELIVERY_NOTICE" | "SYSTEM_NOTICE" | "MAINTENANCE";
        id: string;
        variantId: string;
        category: {
            id: string;
            name: string;
            slug: string;
        } | null;
        trigger: {
            type: "EXIT_INTENT" | "IMMEDIATE" | "DELAY" | "SCROLL_DEPTH" | "INACTIVITY" | "PAGE_VIEWS" | "SESSION_DURATION" | "PRODUCT_VIEWS" | "ADD_TO_CART" | "REMOVE_FROM_CART" | "CART_THRESHOLD" | "FIRST_VISIT" | "RETURNING_SESSION" | "CUSTOM_EVENT";
            categoryIds: string[];
            productIds: string[];
            delaySeconds: number;
            scrollPercent: number;
            inactivitySeconds: number;
            pageViewCount: number;
            sessionDurationSeconds: number;
            productViewCount: number;
            cartThreshold: number;
            eventName: string | null;
            mobileExitFallback: "NONE" | "SCROLL_DEPTH" | "INACTIVITY";
            mobileExitFallbackValue: number;
        };
        priority: number;
        startsAt: string | null;
        endsAt: string | null;
        timezone: string;
        coupon: {
            code: string;
            id: string;
        } | null;
        version: number;
        product: {
            id: string;
            name: string;
            slug: string;
        } | null;
        presentation: {
            tablet: "CENTER_MODAL" | "BOTTOM_SHEET" | "FLOATING_RIGHT" | "FLOATING_LEFT" | "TOP_BANNER" | "BOTTOM_BANNER" | "FULLSCREEN" | "SIDE_PANEL_RIGHT" | "SIDE_PANEL_LEFT" | "SLIDE_IN_RIGHT" | "SLIDE_IN_LEFT" | "PROMO_TOAST" | "ANNOUNCEMENT_BAR";
            mobile: "CENTER_MODAL" | "BOTTOM_SHEET" | "FLOATING_RIGHT" | "FLOATING_LEFT" | "TOP_BANNER" | "BOTTOM_BANNER" | "FULLSCREEN" | "SIDE_PANEL_RIGHT" | "SIDE_PANEL_LEFT" | "SLIDE_IN_RIGHT" | "SLIDE_IN_LEFT" | "PROMO_TOAST" | "ANNOUNCEMENT_BAR";
            desktop: "CENTER_MODAL" | "BOTTOM_SHEET" | "FLOATING_RIGHT" | "FLOATING_LEFT" | "TOP_BANNER" | "BOTTOM_BANNER" | "FULLSCREEN" | "SIDE_PANEL_RIGHT" | "SIDE_PANEL_LEFT" | "SLIDE_IN_RIGHT" | "SLIDE_IN_LEFT" | "PROMO_TOAST" | "ANNOUNCEMENT_BAR";
            dismissible: boolean;
            closeOnOverlay: boolean;
            closeOnEscape: boolean;
        };
        recurringSchedule: {
            enabled: boolean;
            weekdays: number[];
            startTime: string;
            endTime: string;
        } | null;
        targeting: {
            rules: {
                id: string;
                operator: "GT" | "IN" | "LT" | "GTE" | "LTE" | "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "NOT_IN" | "NOT_CONTAINS" | "STARTS_WITH" | "MATCHES" | "IS_TRUE" | "IS_FALSE";
                field: "PAGE_TYPE" | "PAGE_PATH" | "PRODUCT_ID" | "CATEGORY_ID" | "DEVICE" | "LOCALE" | "AUTH_STATUS" | "VISITOR_TYPE" | "CUSTOMER_ORDER_COUNT" | "CUSTOMER_TOTAL_SPENT" | "CUSTOMER_AVERAGE_ORDER_VALUE" | "CUSTOMER_IS_VIP" | "PURCHASED_PRODUCT" | "PURCHASED_CATEGORY" | "CART_TOTAL" | "CART_ITEM_COUNT" | "CART_CONTAINS_PRODUCT" | "CART_CONTAINS_CATEGORY" | "FREE_SHIPPING_REMAINING" | "COUNTRY" | "REGION" | "CITY" | "UTM_SOURCE" | "UTM_CAMPAIGN" | "REFERRER_DOMAIN";
                value?: string | number | boolean | string[] | undefined;
            }[];
            logic: "AND" | "OR";
            exclusions: {
                id: string;
                operator: "GT" | "IN" | "LT" | "GTE" | "LTE" | "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "NOT_IN" | "NOT_CONTAINS" | "STARTS_WITH" | "MATCHES" | "IS_TRUE" | "IS_FALSE";
                field: "PAGE_TYPE" | "PAGE_PATH" | "PRODUCT_ID" | "CATEGORY_ID" | "DEVICE" | "LOCALE" | "AUTH_STATUS" | "VISITOR_TYPE" | "CUSTOMER_ORDER_COUNT" | "CUSTOMER_TOTAL_SPENT" | "CUSTOMER_AVERAGE_ORDER_VALUE" | "CUSTOMER_IS_VIP" | "PURCHASED_PRODUCT" | "PURCHASED_CATEGORY" | "CART_TOTAL" | "CART_ITEM_COUNT" | "CART_CONTAINS_PRODUCT" | "CART_CONTAINS_CATEGORY" | "FREE_SHIPPING_REMAINING" | "COUNTRY" | "REGION" | "CITY" | "UTM_SOURCE" | "UTM_CAMPAIGN" | "REFERRER_DOMAIN";
                value?: string | number | boolean | string[] | undefined;
            }[];
        };
        direction: "ltr" | "rtl";
        content: {
            eyebrow: string | null;
            imageAlt: string | null;
            disclaimer: string | null;
            locale: "en" | "ar";
            body: string | null;
            primaryCtaLabel: string | null;
            secondaryCtaLabel: string | null;
            badge: string | null;
            headline: string;
            subtitle: string | null;
            successHeadline: string | null;
            successBody: string | null;
            nameLabel: string | null;
            emailLabel: string | null;
            phoneLabel: string | null;
            submitLabel: string | null;
            consentLabel: string | null;
        };
        appearance: {
            width: "STANDARD" | "COMPACT" | "WIDE";
            alignment: "START" | "CENTER";
            icon: "NONE" | "TRUCK" | "SPARKLE" | "GIFT" | "MEGAPHONE" | "HEART" | "BELL";
            spacing: "COMPACT" | "COMFORTABLE" | "AIRY";
            layout: "IMAGE_TOP" | "SPLIT" | "TEXT_ONLY" | "IMAGE_BACKGROUND";
            animation: "NONE" | "SCALE" | "FADE" | "SLIDE" | "LIFT";
            overlayOpacity: number;
            surface: "SOLID" | "TINTED" | "GLASS";
            borderRadius: "NONE" | "SUBTLE" | "SOFT" | "ROUNDED";
            theme: "BRAND" | "IVORY" | "INK" | "SAGE" | "BLUSH" | "GOLD";
            maxWidth: number;
            imagePosition: "START" | "END" | "TOP" | "BACKGROUND";
            buttonStyle: "OUTLINE" | "SOLID" | "UNDERLINE";
            accentColor: string | null;
        };
        frequency: {
            mode: "ONCE_EVER" | "ONCE_PER_SESSION" | "ONCE_PER_DAY" | "EVERY_X_HOURS" | "EVERY_X_DAYS" | "MAX_IMPRESSIONS" | "UNTIL_INTERACTION" | "UNTIL_CONVERSION" | "UNTIL_CAMPAIGN_ENDS";
            interval: number;
            maxImpressions: number;
            afterDismiss: "DEFAULT" | "SESSION" | "HOURS" | "DAYS" | "NEVER";
            afterDismissInterval: number;
            afterPrimaryAction: "DEFAULT" | "SESSION" | "NEVER";
            afterConversion: "DEFAULT" | "NEVER";
        };
        collision: {
            queueBehavior: "QUEUE" | "SUPPRESS" | "REPLACE_LOWER";
            cooldownSeconds: number;
            suppressLowerPriority: boolean;
            exclusivityKey: string | null;
        };
        primaryAction: {
            type: "NONE" | "NAVIGATE" | "APPLY_COUPON" | "COPY_COUPON" | "CLOSE" | "SUBMIT_FORM";
            productId: string | null;
            url: string | null;
            categoryId: string | null;
            destination: "HOME" | "CATEGORY" | "PRODUCT" | "CART" | "ACCOUNT" | "URL" | null;
            openInNewTab: boolean;
            couponId: string | null;
            closeAfterAction: boolean;
        };
        secondaryAction: {
            type: "NONE" | "NAVIGATE" | "APPLY_COUPON" | "COPY_COUPON" | "CLOSE" | "SUBMIT_FORM";
            productId: string | null;
            url: string | null;
            categoryId: string | null;
            destination: "HOME" | "CATEGORY" | "PRODUCT" | "CART" | "ACCOUNT" | "URL" | null;
            openInNewTab: boolean;
            couponId: string | null;
            closeAfterAction: boolean;
        };
        form: {
            type: "NONE" | "NEWSLETTER" | "LEAD";
            collectName: boolean;
            collectEmail: boolean;
            collectPhone: boolean;
            consentRequired: boolean;
            successAutoCloseSeconds: number;
        };
        countdown: {
            enabled: boolean;
            mode: "CAMPAIGN_END" | "FIXED_TIMESTAMP";
            targetAt: string | null;
        };
        image: {
            width: number;
            height: number;
            url: string;
            alt: string;
        } | null;
    }, {
        type: "FREE_SHIPPING" | "FIRST_ORDER" | "CUSTOM" | "PROMOTIONAL" | "SEASONAL" | "NEWSLETTER" | "PRODUCT_LAUNCH" | "DISCOUNT" | "WELCOME" | "EXIT_INTENT" | "ANNOUNCEMENT" | "PRODUCT_RECOMMENDATION" | "CART_REMINDER" | "LIMITED_TIME_SALE" | "RESTOCK" | "PRODUCT_SPECIFIC" | "CATEGORY_SPECIFIC" | "CROSS_SELL" | "ACCOUNT_ENCOURAGEMENT" | "LOGIN_REMINDER" | "LOYALTY_VIP" | "RETURNING_CUSTOMER" | "NEW_VISITOR" | "ORDER_UPDATE" | "STORE_PICKUP" | "DELIVERY_NOTICE" | "SYSTEM_NOTICE" | "MAINTENANCE";
        id: string;
        variantId: string;
        priority: number;
        timezone: string;
        version: number;
        direction: "ltr" | "rtl";
        content: {
            locale: "en" | "ar";
            headline: string;
            eyebrow?: string | null | undefined;
            imageAlt?: string | null | undefined;
            disclaimer?: string | null | undefined;
            body?: string | null | undefined;
            primaryCtaLabel?: string | null | undefined;
            secondaryCtaLabel?: string | null | undefined;
            badge?: string | null | undefined;
            subtitle?: string | null | undefined;
            successHeadline?: string | null | undefined;
            successBody?: string | null | undefined;
            nameLabel?: string | null | undefined;
            emailLabel?: string | null | undefined;
            phoneLabel?: string | null | undefined;
            submitLabel?: string | null | undefined;
            consentLabel?: string | null | undefined;
        };
        category?: {
            id: string;
            name: string;
            slug: string;
        } | null | undefined;
        trigger?: {
            type?: "EXIT_INTENT" | "IMMEDIATE" | "DELAY" | "SCROLL_DEPTH" | "INACTIVITY" | "PAGE_VIEWS" | "SESSION_DURATION" | "PRODUCT_VIEWS" | "ADD_TO_CART" | "REMOVE_FROM_CART" | "CART_THRESHOLD" | "FIRST_VISIT" | "RETURNING_SESSION" | "CUSTOM_EVENT" | undefined;
            categoryIds?: string[] | undefined;
            productIds?: string[] | undefined;
            delaySeconds?: number | undefined;
            scrollPercent?: number | undefined;
            inactivitySeconds?: number | undefined;
            pageViewCount?: number | undefined;
            sessionDurationSeconds?: number | undefined;
            productViewCount?: number | undefined;
            cartThreshold?: number | undefined;
            eventName?: string | null | undefined;
            mobileExitFallback?: "NONE" | "SCROLL_DEPTH" | "INACTIVITY" | undefined;
            mobileExitFallbackValue?: number | undefined;
        } | undefined;
        startsAt?: string | null | undefined;
        endsAt?: string | null | undefined;
        coupon?: {
            code: string;
            id: string;
        } | null | undefined;
        product?: {
            id: string;
            name: string;
            slug: string;
        } | null | undefined;
        presentation?: {
            tablet?: "CENTER_MODAL" | "BOTTOM_SHEET" | "FLOATING_RIGHT" | "FLOATING_LEFT" | "TOP_BANNER" | "BOTTOM_BANNER" | "FULLSCREEN" | "SIDE_PANEL_RIGHT" | "SIDE_PANEL_LEFT" | "SLIDE_IN_RIGHT" | "SLIDE_IN_LEFT" | "PROMO_TOAST" | "ANNOUNCEMENT_BAR" | undefined;
            mobile?: "CENTER_MODAL" | "BOTTOM_SHEET" | "FLOATING_RIGHT" | "FLOATING_LEFT" | "TOP_BANNER" | "BOTTOM_BANNER" | "FULLSCREEN" | "SIDE_PANEL_RIGHT" | "SIDE_PANEL_LEFT" | "SLIDE_IN_RIGHT" | "SLIDE_IN_LEFT" | "PROMO_TOAST" | "ANNOUNCEMENT_BAR" | undefined;
            desktop?: "CENTER_MODAL" | "BOTTOM_SHEET" | "FLOATING_RIGHT" | "FLOATING_LEFT" | "TOP_BANNER" | "BOTTOM_BANNER" | "FULLSCREEN" | "SIDE_PANEL_RIGHT" | "SIDE_PANEL_LEFT" | "SLIDE_IN_RIGHT" | "SLIDE_IN_LEFT" | "PROMO_TOAST" | "ANNOUNCEMENT_BAR" | undefined;
            dismissible?: boolean | undefined;
            closeOnOverlay?: boolean | undefined;
            closeOnEscape?: boolean | undefined;
        } | undefined;
        recurringSchedule?: {
            enabled?: boolean | undefined;
            weekdays?: number[] | undefined;
            startTime?: string | undefined;
            endTime?: string | undefined;
        } | null | undefined;
        targeting?: {
            rules?: {
                id: string;
                operator: "GT" | "IN" | "LT" | "GTE" | "LTE" | "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "NOT_IN" | "NOT_CONTAINS" | "STARTS_WITH" | "MATCHES" | "IS_TRUE" | "IS_FALSE";
                field: "PAGE_TYPE" | "PAGE_PATH" | "PRODUCT_ID" | "CATEGORY_ID" | "DEVICE" | "LOCALE" | "AUTH_STATUS" | "VISITOR_TYPE" | "CUSTOMER_ORDER_COUNT" | "CUSTOMER_TOTAL_SPENT" | "CUSTOMER_AVERAGE_ORDER_VALUE" | "CUSTOMER_IS_VIP" | "PURCHASED_PRODUCT" | "PURCHASED_CATEGORY" | "CART_TOTAL" | "CART_ITEM_COUNT" | "CART_CONTAINS_PRODUCT" | "CART_CONTAINS_CATEGORY" | "FREE_SHIPPING_REMAINING" | "COUNTRY" | "REGION" | "CITY" | "UTM_SOURCE" | "UTM_CAMPAIGN" | "REFERRER_DOMAIN";
                value?: string | number | boolean | string[] | undefined;
            }[] | undefined;
            logic?: "AND" | "OR" | undefined;
            exclusions?: {
                id: string;
                operator: "GT" | "IN" | "LT" | "GTE" | "LTE" | "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "NOT_IN" | "NOT_CONTAINS" | "STARTS_WITH" | "MATCHES" | "IS_TRUE" | "IS_FALSE";
                field: "PAGE_TYPE" | "PAGE_PATH" | "PRODUCT_ID" | "CATEGORY_ID" | "DEVICE" | "LOCALE" | "AUTH_STATUS" | "VISITOR_TYPE" | "CUSTOMER_ORDER_COUNT" | "CUSTOMER_TOTAL_SPENT" | "CUSTOMER_AVERAGE_ORDER_VALUE" | "CUSTOMER_IS_VIP" | "PURCHASED_PRODUCT" | "PURCHASED_CATEGORY" | "CART_TOTAL" | "CART_ITEM_COUNT" | "CART_CONTAINS_PRODUCT" | "CART_CONTAINS_CATEGORY" | "FREE_SHIPPING_REMAINING" | "COUNTRY" | "REGION" | "CITY" | "UTM_SOURCE" | "UTM_CAMPAIGN" | "REFERRER_DOMAIN";
                value?: string | number | boolean | string[] | undefined;
            }[] | undefined;
        } | undefined;
        appearance?: {
            width?: "STANDARD" | "COMPACT" | "WIDE" | undefined;
            alignment?: "START" | "CENTER" | undefined;
            icon?: "NONE" | "TRUCK" | "SPARKLE" | "GIFT" | "MEGAPHONE" | "HEART" | "BELL" | undefined;
            spacing?: "COMPACT" | "COMFORTABLE" | "AIRY" | undefined;
            layout?: "IMAGE_TOP" | "SPLIT" | "TEXT_ONLY" | "IMAGE_BACKGROUND" | undefined;
            animation?: "NONE" | "SCALE" | "FADE" | "SLIDE" | "LIFT" | undefined;
            overlayOpacity?: number | undefined;
            surface?: "SOLID" | "TINTED" | "GLASS" | undefined;
            borderRadius?: "NONE" | "SUBTLE" | "SOFT" | "ROUNDED" | undefined;
            theme?: "BRAND" | "IVORY" | "INK" | "SAGE" | "BLUSH" | "GOLD" | undefined;
            maxWidth?: number | undefined;
            imagePosition?: "START" | "END" | "TOP" | "BACKGROUND" | undefined;
            buttonStyle?: "OUTLINE" | "SOLID" | "UNDERLINE" | undefined;
            accentColor?: string | null | undefined;
        } | undefined;
        frequency?: {
            mode?: "ONCE_EVER" | "ONCE_PER_SESSION" | "ONCE_PER_DAY" | "EVERY_X_HOURS" | "EVERY_X_DAYS" | "MAX_IMPRESSIONS" | "UNTIL_INTERACTION" | "UNTIL_CONVERSION" | "UNTIL_CAMPAIGN_ENDS" | undefined;
            interval?: number | undefined;
            maxImpressions?: number | undefined;
            afterDismiss?: "DEFAULT" | "SESSION" | "HOURS" | "DAYS" | "NEVER" | undefined;
            afterDismissInterval?: number | undefined;
            afterPrimaryAction?: "DEFAULT" | "SESSION" | "NEVER" | undefined;
            afterConversion?: "DEFAULT" | "NEVER" | undefined;
        } | undefined;
        collision?: {
            queueBehavior?: "QUEUE" | "SUPPRESS" | "REPLACE_LOWER" | undefined;
            cooldownSeconds?: number | undefined;
            suppressLowerPriority?: boolean | undefined;
            exclusivityKey?: string | null | undefined;
        } | undefined;
        primaryAction?: {
            type?: "NONE" | "NAVIGATE" | "APPLY_COUPON" | "COPY_COUPON" | "CLOSE" | "SUBMIT_FORM" | undefined;
            productId?: string | null | undefined;
            url?: string | null | undefined;
            categoryId?: string | null | undefined;
            destination?: "HOME" | "CATEGORY" | "PRODUCT" | "CART" | "ACCOUNT" | "URL" | null | undefined;
            openInNewTab?: boolean | undefined;
            couponId?: string | null | undefined;
            closeAfterAction?: boolean | undefined;
        } | undefined;
        secondaryAction?: {
            type?: "NONE" | "NAVIGATE" | "APPLY_COUPON" | "COPY_COUPON" | "CLOSE" | "SUBMIT_FORM" | undefined;
            productId?: string | null | undefined;
            url?: string | null | undefined;
            categoryId?: string | null | undefined;
            destination?: "HOME" | "CATEGORY" | "PRODUCT" | "CART" | "ACCOUNT" | "URL" | null | undefined;
            openInNewTab?: boolean | undefined;
            couponId?: string | null | undefined;
            closeAfterAction?: boolean | undefined;
        } | undefined;
        form?: {
            type?: "NONE" | "NEWSLETTER" | "LEAD" | undefined;
            collectName?: boolean | undefined;
            collectEmail?: boolean | undefined;
            collectPhone?: boolean | undefined;
            consentRequired?: boolean | undefined;
            successAutoCloseSeconds?: number | undefined;
        } | undefined;
        countdown?: {
            enabled?: boolean | undefined;
            mode?: "CAMPAIGN_END" | "FIXED_TIMESTAMP" | undefined;
            targetAt?: string | null | undefined;
        } | undefined;
        image?: {
            width: number;
            height: number;
            url: string;
            alt: string;
        } | null | undefined;
    }>, "many">;
    serverTime: z.ZodString;
    freeShippingThreshold: z.ZodNullable<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    freeShippingThreshold: number | null;
    campaigns: {
        type: "FREE_SHIPPING" | "FIRST_ORDER" | "CUSTOM" | "PROMOTIONAL" | "SEASONAL" | "NEWSLETTER" | "PRODUCT_LAUNCH" | "DISCOUNT" | "WELCOME" | "EXIT_INTENT" | "ANNOUNCEMENT" | "PRODUCT_RECOMMENDATION" | "CART_REMINDER" | "LIMITED_TIME_SALE" | "RESTOCK" | "PRODUCT_SPECIFIC" | "CATEGORY_SPECIFIC" | "CROSS_SELL" | "ACCOUNT_ENCOURAGEMENT" | "LOGIN_REMINDER" | "LOYALTY_VIP" | "RETURNING_CUSTOMER" | "NEW_VISITOR" | "ORDER_UPDATE" | "STORE_PICKUP" | "DELIVERY_NOTICE" | "SYSTEM_NOTICE" | "MAINTENANCE";
        id: string;
        variantId: string;
        category: {
            id: string;
            name: string;
            slug: string;
        } | null;
        trigger: {
            type: "EXIT_INTENT" | "IMMEDIATE" | "DELAY" | "SCROLL_DEPTH" | "INACTIVITY" | "PAGE_VIEWS" | "SESSION_DURATION" | "PRODUCT_VIEWS" | "ADD_TO_CART" | "REMOVE_FROM_CART" | "CART_THRESHOLD" | "FIRST_VISIT" | "RETURNING_SESSION" | "CUSTOM_EVENT";
            categoryIds: string[];
            productIds: string[];
            delaySeconds: number;
            scrollPercent: number;
            inactivitySeconds: number;
            pageViewCount: number;
            sessionDurationSeconds: number;
            productViewCount: number;
            cartThreshold: number;
            eventName: string | null;
            mobileExitFallback: "NONE" | "SCROLL_DEPTH" | "INACTIVITY";
            mobileExitFallbackValue: number;
        };
        priority: number;
        startsAt: string | null;
        endsAt: string | null;
        timezone: string;
        coupon: {
            code: string;
            id: string;
        } | null;
        version: number;
        product: {
            id: string;
            name: string;
            slug: string;
        } | null;
        presentation: {
            tablet: "CENTER_MODAL" | "BOTTOM_SHEET" | "FLOATING_RIGHT" | "FLOATING_LEFT" | "TOP_BANNER" | "BOTTOM_BANNER" | "FULLSCREEN" | "SIDE_PANEL_RIGHT" | "SIDE_PANEL_LEFT" | "SLIDE_IN_RIGHT" | "SLIDE_IN_LEFT" | "PROMO_TOAST" | "ANNOUNCEMENT_BAR";
            mobile: "CENTER_MODAL" | "BOTTOM_SHEET" | "FLOATING_RIGHT" | "FLOATING_LEFT" | "TOP_BANNER" | "BOTTOM_BANNER" | "FULLSCREEN" | "SIDE_PANEL_RIGHT" | "SIDE_PANEL_LEFT" | "SLIDE_IN_RIGHT" | "SLIDE_IN_LEFT" | "PROMO_TOAST" | "ANNOUNCEMENT_BAR";
            desktop: "CENTER_MODAL" | "BOTTOM_SHEET" | "FLOATING_RIGHT" | "FLOATING_LEFT" | "TOP_BANNER" | "BOTTOM_BANNER" | "FULLSCREEN" | "SIDE_PANEL_RIGHT" | "SIDE_PANEL_LEFT" | "SLIDE_IN_RIGHT" | "SLIDE_IN_LEFT" | "PROMO_TOAST" | "ANNOUNCEMENT_BAR";
            dismissible: boolean;
            closeOnOverlay: boolean;
            closeOnEscape: boolean;
        };
        recurringSchedule: {
            enabled: boolean;
            weekdays: number[];
            startTime: string;
            endTime: string;
        } | null;
        targeting: {
            rules: {
                id: string;
                operator: "GT" | "IN" | "LT" | "GTE" | "LTE" | "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "NOT_IN" | "NOT_CONTAINS" | "STARTS_WITH" | "MATCHES" | "IS_TRUE" | "IS_FALSE";
                field: "PAGE_TYPE" | "PAGE_PATH" | "PRODUCT_ID" | "CATEGORY_ID" | "DEVICE" | "LOCALE" | "AUTH_STATUS" | "VISITOR_TYPE" | "CUSTOMER_ORDER_COUNT" | "CUSTOMER_TOTAL_SPENT" | "CUSTOMER_AVERAGE_ORDER_VALUE" | "CUSTOMER_IS_VIP" | "PURCHASED_PRODUCT" | "PURCHASED_CATEGORY" | "CART_TOTAL" | "CART_ITEM_COUNT" | "CART_CONTAINS_PRODUCT" | "CART_CONTAINS_CATEGORY" | "FREE_SHIPPING_REMAINING" | "COUNTRY" | "REGION" | "CITY" | "UTM_SOURCE" | "UTM_CAMPAIGN" | "REFERRER_DOMAIN";
                value?: string | number | boolean | string[] | undefined;
            }[];
            logic: "AND" | "OR";
            exclusions: {
                id: string;
                operator: "GT" | "IN" | "LT" | "GTE" | "LTE" | "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "NOT_IN" | "NOT_CONTAINS" | "STARTS_WITH" | "MATCHES" | "IS_TRUE" | "IS_FALSE";
                field: "PAGE_TYPE" | "PAGE_PATH" | "PRODUCT_ID" | "CATEGORY_ID" | "DEVICE" | "LOCALE" | "AUTH_STATUS" | "VISITOR_TYPE" | "CUSTOMER_ORDER_COUNT" | "CUSTOMER_TOTAL_SPENT" | "CUSTOMER_AVERAGE_ORDER_VALUE" | "CUSTOMER_IS_VIP" | "PURCHASED_PRODUCT" | "PURCHASED_CATEGORY" | "CART_TOTAL" | "CART_ITEM_COUNT" | "CART_CONTAINS_PRODUCT" | "CART_CONTAINS_CATEGORY" | "FREE_SHIPPING_REMAINING" | "COUNTRY" | "REGION" | "CITY" | "UTM_SOURCE" | "UTM_CAMPAIGN" | "REFERRER_DOMAIN";
                value?: string | number | boolean | string[] | undefined;
            }[];
        };
        direction: "ltr" | "rtl";
        content: {
            eyebrow: string | null;
            imageAlt: string | null;
            disclaimer: string | null;
            locale: "en" | "ar";
            body: string | null;
            primaryCtaLabel: string | null;
            secondaryCtaLabel: string | null;
            badge: string | null;
            headline: string;
            subtitle: string | null;
            successHeadline: string | null;
            successBody: string | null;
            nameLabel: string | null;
            emailLabel: string | null;
            phoneLabel: string | null;
            submitLabel: string | null;
            consentLabel: string | null;
        };
        appearance: {
            width: "STANDARD" | "COMPACT" | "WIDE";
            alignment: "START" | "CENTER";
            icon: "NONE" | "TRUCK" | "SPARKLE" | "GIFT" | "MEGAPHONE" | "HEART" | "BELL";
            spacing: "COMPACT" | "COMFORTABLE" | "AIRY";
            layout: "IMAGE_TOP" | "SPLIT" | "TEXT_ONLY" | "IMAGE_BACKGROUND";
            animation: "NONE" | "SCALE" | "FADE" | "SLIDE" | "LIFT";
            overlayOpacity: number;
            surface: "SOLID" | "TINTED" | "GLASS";
            borderRadius: "NONE" | "SUBTLE" | "SOFT" | "ROUNDED";
            theme: "BRAND" | "IVORY" | "INK" | "SAGE" | "BLUSH" | "GOLD";
            maxWidth: number;
            imagePosition: "START" | "END" | "TOP" | "BACKGROUND";
            buttonStyle: "OUTLINE" | "SOLID" | "UNDERLINE";
            accentColor: string | null;
        };
        frequency: {
            mode: "ONCE_EVER" | "ONCE_PER_SESSION" | "ONCE_PER_DAY" | "EVERY_X_HOURS" | "EVERY_X_DAYS" | "MAX_IMPRESSIONS" | "UNTIL_INTERACTION" | "UNTIL_CONVERSION" | "UNTIL_CAMPAIGN_ENDS";
            interval: number;
            maxImpressions: number;
            afterDismiss: "DEFAULT" | "SESSION" | "HOURS" | "DAYS" | "NEVER";
            afterDismissInterval: number;
            afterPrimaryAction: "DEFAULT" | "SESSION" | "NEVER";
            afterConversion: "DEFAULT" | "NEVER";
        };
        collision: {
            queueBehavior: "QUEUE" | "SUPPRESS" | "REPLACE_LOWER";
            cooldownSeconds: number;
            suppressLowerPriority: boolean;
            exclusivityKey: string | null;
        };
        primaryAction: {
            type: "NONE" | "NAVIGATE" | "APPLY_COUPON" | "COPY_COUPON" | "CLOSE" | "SUBMIT_FORM";
            productId: string | null;
            url: string | null;
            categoryId: string | null;
            destination: "HOME" | "CATEGORY" | "PRODUCT" | "CART" | "ACCOUNT" | "URL" | null;
            openInNewTab: boolean;
            couponId: string | null;
            closeAfterAction: boolean;
        };
        secondaryAction: {
            type: "NONE" | "NAVIGATE" | "APPLY_COUPON" | "COPY_COUPON" | "CLOSE" | "SUBMIT_FORM";
            productId: string | null;
            url: string | null;
            categoryId: string | null;
            destination: "HOME" | "CATEGORY" | "PRODUCT" | "CART" | "ACCOUNT" | "URL" | null;
            openInNewTab: boolean;
            couponId: string | null;
            closeAfterAction: boolean;
        };
        form: {
            type: "NONE" | "NEWSLETTER" | "LEAD";
            collectName: boolean;
            collectEmail: boolean;
            collectPhone: boolean;
            consentRequired: boolean;
            successAutoCloseSeconds: number;
        };
        countdown: {
            enabled: boolean;
            mode: "CAMPAIGN_END" | "FIXED_TIMESTAMP";
            targetAt: string | null;
        };
        image: {
            width: number;
            height: number;
            url: string;
            alt: string;
        } | null;
    }[];
    serverTime: string;
}, {
    freeShippingThreshold: number | null;
    campaigns: {
        type: "FREE_SHIPPING" | "FIRST_ORDER" | "CUSTOM" | "PROMOTIONAL" | "SEASONAL" | "NEWSLETTER" | "PRODUCT_LAUNCH" | "DISCOUNT" | "WELCOME" | "EXIT_INTENT" | "ANNOUNCEMENT" | "PRODUCT_RECOMMENDATION" | "CART_REMINDER" | "LIMITED_TIME_SALE" | "RESTOCK" | "PRODUCT_SPECIFIC" | "CATEGORY_SPECIFIC" | "CROSS_SELL" | "ACCOUNT_ENCOURAGEMENT" | "LOGIN_REMINDER" | "LOYALTY_VIP" | "RETURNING_CUSTOMER" | "NEW_VISITOR" | "ORDER_UPDATE" | "STORE_PICKUP" | "DELIVERY_NOTICE" | "SYSTEM_NOTICE" | "MAINTENANCE";
        id: string;
        variantId: string;
        priority: number;
        timezone: string;
        version: number;
        direction: "ltr" | "rtl";
        content: {
            locale: "en" | "ar";
            headline: string;
            eyebrow?: string | null | undefined;
            imageAlt?: string | null | undefined;
            disclaimer?: string | null | undefined;
            body?: string | null | undefined;
            primaryCtaLabel?: string | null | undefined;
            secondaryCtaLabel?: string | null | undefined;
            badge?: string | null | undefined;
            subtitle?: string | null | undefined;
            successHeadline?: string | null | undefined;
            successBody?: string | null | undefined;
            nameLabel?: string | null | undefined;
            emailLabel?: string | null | undefined;
            phoneLabel?: string | null | undefined;
            submitLabel?: string | null | undefined;
            consentLabel?: string | null | undefined;
        };
        category?: {
            id: string;
            name: string;
            slug: string;
        } | null | undefined;
        trigger?: {
            type?: "EXIT_INTENT" | "IMMEDIATE" | "DELAY" | "SCROLL_DEPTH" | "INACTIVITY" | "PAGE_VIEWS" | "SESSION_DURATION" | "PRODUCT_VIEWS" | "ADD_TO_CART" | "REMOVE_FROM_CART" | "CART_THRESHOLD" | "FIRST_VISIT" | "RETURNING_SESSION" | "CUSTOM_EVENT" | undefined;
            categoryIds?: string[] | undefined;
            productIds?: string[] | undefined;
            delaySeconds?: number | undefined;
            scrollPercent?: number | undefined;
            inactivitySeconds?: number | undefined;
            pageViewCount?: number | undefined;
            sessionDurationSeconds?: number | undefined;
            productViewCount?: number | undefined;
            cartThreshold?: number | undefined;
            eventName?: string | null | undefined;
            mobileExitFallback?: "NONE" | "SCROLL_DEPTH" | "INACTIVITY" | undefined;
            mobileExitFallbackValue?: number | undefined;
        } | undefined;
        startsAt?: string | null | undefined;
        endsAt?: string | null | undefined;
        coupon?: {
            code: string;
            id: string;
        } | null | undefined;
        product?: {
            id: string;
            name: string;
            slug: string;
        } | null | undefined;
        presentation?: {
            tablet?: "CENTER_MODAL" | "BOTTOM_SHEET" | "FLOATING_RIGHT" | "FLOATING_LEFT" | "TOP_BANNER" | "BOTTOM_BANNER" | "FULLSCREEN" | "SIDE_PANEL_RIGHT" | "SIDE_PANEL_LEFT" | "SLIDE_IN_RIGHT" | "SLIDE_IN_LEFT" | "PROMO_TOAST" | "ANNOUNCEMENT_BAR" | undefined;
            mobile?: "CENTER_MODAL" | "BOTTOM_SHEET" | "FLOATING_RIGHT" | "FLOATING_LEFT" | "TOP_BANNER" | "BOTTOM_BANNER" | "FULLSCREEN" | "SIDE_PANEL_RIGHT" | "SIDE_PANEL_LEFT" | "SLIDE_IN_RIGHT" | "SLIDE_IN_LEFT" | "PROMO_TOAST" | "ANNOUNCEMENT_BAR" | undefined;
            desktop?: "CENTER_MODAL" | "BOTTOM_SHEET" | "FLOATING_RIGHT" | "FLOATING_LEFT" | "TOP_BANNER" | "BOTTOM_BANNER" | "FULLSCREEN" | "SIDE_PANEL_RIGHT" | "SIDE_PANEL_LEFT" | "SLIDE_IN_RIGHT" | "SLIDE_IN_LEFT" | "PROMO_TOAST" | "ANNOUNCEMENT_BAR" | undefined;
            dismissible?: boolean | undefined;
            closeOnOverlay?: boolean | undefined;
            closeOnEscape?: boolean | undefined;
        } | undefined;
        recurringSchedule?: {
            enabled?: boolean | undefined;
            weekdays?: number[] | undefined;
            startTime?: string | undefined;
            endTime?: string | undefined;
        } | null | undefined;
        targeting?: {
            rules?: {
                id: string;
                operator: "GT" | "IN" | "LT" | "GTE" | "LTE" | "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "NOT_IN" | "NOT_CONTAINS" | "STARTS_WITH" | "MATCHES" | "IS_TRUE" | "IS_FALSE";
                field: "PAGE_TYPE" | "PAGE_PATH" | "PRODUCT_ID" | "CATEGORY_ID" | "DEVICE" | "LOCALE" | "AUTH_STATUS" | "VISITOR_TYPE" | "CUSTOMER_ORDER_COUNT" | "CUSTOMER_TOTAL_SPENT" | "CUSTOMER_AVERAGE_ORDER_VALUE" | "CUSTOMER_IS_VIP" | "PURCHASED_PRODUCT" | "PURCHASED_CATEGORY" | "CART_TOTAL" | "CART_ITEM_COUNT" | "CART_CONTAINS_PRODUCT" | "CART_CONTAINS_CATEGORY" | "FREE_SHIPPING_REMAINING" | "COUNTRY" | "REGION" | "CITY" | "UTM_SOURCE" | "UTM_CAMPAIGN" | "REFERRER_DOMAIN";
                value?: string | number | boolean | string[] | undefined;
            }[] | undefined;
            logic?: "AND" | "OR" | undefined;
            exclusions?: {
                id: string;
                operator: "GT" | "IN" | "LT" | "GTE" | "LTE" | "EQUALS" | "NOT_EQUALS" | "CONTAINS" | "NOT_IN" | "NOT_CONTAINS" | "STARTS_WITH" | "MATCHES" | "IS_TRUE" | "IS_FALSE";
                field: "PAGE_TYPE" | "PAGE_PATH" | "PRODUCT_ID" | "CATEGORY_ID" | "DEVICE" | "LOCALE" | "AUTH_STATUS" | "VISITOR_TYPE" | "CUSTOMER_ORDER_COUNT" | "CUSTOMER_TOTAL_SPENT" | "CUSTOMER_AVERAGE_ORDER_VALUE" | "CUSTOMER_IS_VIP" | "PURCHASED_PRODUCT" | "PURCHASED_CATEGORY" | "CART_TOTAL" | "CART_ITEM_COUNT" | "CART_CONTAINS_PRODUCT" | "CART_CONTAINS_CATEGORY" | "FREE_SHIPPING_REMAINING" | "COUNTRY" | "REGION" | "CITY" | "UTM_SOURCE" | "UTM_CAMPAIGN" | "REFERRER_DOMAIN";
                value?: string | number | boolean | string[] | undefined;
            }[] | undefined;
        } | undefined;
        appearance?: {
            width?: "STANDARD" | "COMPACT" | "WIDE" | undefined;
            alignment?: "START" | "CENTER" | undefined;
            icon?: "NONE" | "TRUCK" | "SPARKLE" | "GIFT" | "MEGAPHONE" | "HEART" | "BELL" | undefined;
            spacing?: "COMPACT" | "COMFORTABLE" | "AIRY" | undefined;
            layout?: "IMAGE_TOP" | "SPLIT" | "TEXT_ONLY" | "IMAGE_BACKGROUND" | undefined;
            animation?: "NONE" | "SCALE" | "FADE" | "SLIDE" | "LIFT" | undefined;
            overlayOpacity?: number | undefined;
            surface?: "SOLID" | "TINTED" | "GLASS" | undefined;
            borderRadius?: "NONE" | "SUBTLE" | "SOFT" | "ROUNDED" | undefined;
            theme?: "BRAND" | "IVORY" | "INK" | "SAGE" | "BLUSH" | "GOLD" | undefined;
            maxWidth?: number | undefined;
            imagePosition?: "START" | "END" | "TOP" | "BACKGROUND" | undefined;
            buttonStyle?: "OUTLINE" | "SOLID" | "UNDERLINE" | undefined;
            accentColor?: string | null | undefined;
        } | undefined;
        frequency?: {
            mode?: "ONCE_EVER" | "ONCE_PER_SESSION" | "ONCE_PER_DAY" | "EVERY_X_HOURS" | "EVERY_X_DAYS" | "MAX_IMPRESSIONS" | "UNTIL_INTERACTION" | "UNTIL_CONVERSION" | "UNTIL_CAMPAIGN_ENDS" | undefined;
            interval?: number | undefined;
            maxImpressions?: number | undefined;
            afterDismiss?: "DEFAULT" | "SESSION" | "HOURS" | "DAYS" | "NEVER" | undefined;
            afterDismissInterval?: number | undefined;
            afterPrimaryAction?: "DEFAULT" | "SESSION" | "NEVER" | undefined;
            afterConversion?: "DEFAULT" | "NEVER" | undefined;
        } | undefined;
        collision?: {
            queueBehavior?: "QUEUE" | "SUPPRESS" | "REPLACE_LOWER" | undefined;
            cooldownSeconds?: number | undefined;
            suppressLowerPriority?: boolean | undefined;
            exclusivityKey?: string | null | undefined;
        } | undefined;
        primaryAction?: {
            type?: "NONE" | "NAVIGATE" | "APPLY_COUPON" | "COPY_COUPON" | "CLOSE" | "SUBMIT_FORM" | undefined;
            productId?: string | null | undefined;
            url?: string | null | undefined;
            categoryId?: string | null | undefined;
            destination?: "HOME" | "CATEGORY" | "PRODUCT" | "CART" | "ACCOUNT" | "URL" | null | undefined;
            openInNewTab?: boolean | undefined;
            couponId?: string | null | undefined;
            closeAfterAction?: boolean | undefined;
        } | undefined;
        secondaryAction?: {
            type?: "NONE" | "NAVIGATE" | "APPLY_COUPON" | "COPY_COUPON" | "CLOSE" | "SUBMIT_FORM" | undefined;
            productId?: string | null | undefined;
            url?: string | null | undefined;
            categoryId?: string | null | undefined;
            destination?: "HOME" | "CATEGORY" | "PRODUCT" | "CART" | "ACCOUNT" | "URL" | null | undefined;
            openInNewTab?: boolean | undefined;
            couponId?: string | null | undefined;
            closeAfterAction?: boolean | undefined;
        } | undefined;
        form?: {
            type?: "NONE" | "NEWSLETTER" | "LEAD" | undefined;
            collectName?: boolean | undefined;
            collectEmail?: boolean | undefined;
            collectPhone?: boolean | undefined;
            consentRequired?: boolean | undefined;
            successAutoCloseSeconds?: number | undefined;
        } | undefined;
        countdown?: {
            enabled?: boolean | undefined;
            mode?: "CAMPAIGN_END" | "FIXED_TIMESTAMP" | undefined;
            targetAt?: string | null | undefined;
        } | undefined;
        image?: {
            width: number;
            height: number;
            url: string;
            alt: string;
        } | null | undefined;
    }[];
    serverTime: string;
}>;
export type PopupStorefrontResponse = z.infer<typeof popupStorefrontResponseSchema>;
export declare const popupAnalyticsEventTypeSchema: z.ZodEnum<["ELIGIBLE", "IMPRESSION", "DISMISS", "PRIMARY_CLICK", "SECONDARY_CLICK", "COUPON_COPY", "FORM_SUBMIT", "SUCCESS", "CONVERSION"]>;
export type PopupAnalyticsEventType = z.infer<typeof popupAnalyticsEventTypeSchema>;
export declare const popupAnalyticsEventSchema: z.ZodObject<{
    eventId: z.ZodString;
    campaignId: z.ZodString;
    variantId: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    type: z.ZodEnum<["ELIGIBLE", "IMPRESSION", "DISMISS", "PRIMARY_CLICK", "SECONDARY_CLICK", "COUPON_COPY", "FORM_SUBMIT", "SUCCESS", "CONVERSION"]>;
    sessionId: z.ZodString;
    visitorId: z.ZodString;
    locale: z.ZodEnum<["en", "ar"]>;
    device: z.ZodEnum<["desktop", "tablet", "mobile"]>;
    page: z.ZodString;
    occurredAt: z.ZodOptional<z.ZodString>;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull]>>>;
}, "strip", z.ZodTypeAny, {
    type: "IMPRESSION" | "COUPON_COPY" | "DISMISS" | "ELIGIBLE" | "PRIMARY_CLICK" | "SECONDARY_CLICK" | "FORM_SUBMIT" | "SUCCESS" | "CONVERSION";
    page: string;
    variantId: string | null;
    metadata: Record<string, string | number | boolean | null>;
    sessionId: string;
    locale: "en" | "ar";
    device: "tablet" | "mobile" | "desktop";
    visitorId: string;
    eventId: string;
    campaignId: string;
    occurredAt?: string | undefined;
}, {
    type: "IMPRESSION" | "COUPON_COPY" | "DISMISS" | "ELIGIBLE" | "PRIMARY_CLICK" | "SECONDARY_CLICK" | "FORM_SUBMIT" | "SUCCESS" | "CONVERSION";
    page: string;
    sessionId: string;
    locale: "en" | "ar";
    device: "tablet" | "mobile" | "desktop";
    visitorId: string;
    eventId: string;
    campaignId: string;
    variantId?: string | null | undefined;
    metadata?: Record<string, string | number | boolean | null> | undefined;
    occurredAt?: string | undefined;
}>;
export declare const popupAnalyticsBatchSchema: z.ZodObject<{
    events: z.ZodArray<z.ZodObject<{
        eventId: z.ZodString;
        campaignId: z.ZodString;
        variantId: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        type: z.ZodEnum<["ELIGIBLE", "IMPRESSION", "DISMISS", "PRIMARY_CLICK", "SECONDARY_CLICK", "COUPON_COPY", "FORM_SUBMIT", "SUCCESS", "CONVERSION"]>;
        sessionId: z.ZodString;
        visitorId: z.ZodString;
        locale: z.ZodEnum<["en", "ar"]>;
        device: z.ZodEnum<["desktop", "tablet", "mobile"]>;
        page: z.ZodString;
        occurredAt: z.ZodOptional<z.ZodString>;
        metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull]>>>;
    }, "strip", z.ZodTypeAny, {
        type: "IMPRESSION" | "COUPON_COPY" | "DISMISS" | "ELIGIBLE" | "PRIMARY_CLICK" | "SECONDARY_CLICK" | "FORM_SUBMIT" | "SUCCESS" | "CONVERSION";
        page: string;
        variantId: string | null;
        metadata: Record<string, string | number | boolean | null>;
        sessionId: string;
        locale: "en" | "ar";
        device: "tablet" | "mobile" | "desktop";
        visitorId: string;
        eventId: string;
        campaignId: string;
        occurredAt?: string | undefined;
    }, {
        type: "IMPRESSION" | "COUPON_COPY" | "DISMISS" | "ELIGIBLE" | "PRIMARY_CLICK" | "SECONDARY_CLICK" | "FORM_SUBMIT" | "SUCCESS" | "CONVERSION";
        page: string;
        sessionId: string;
        locale: "en" | "ar";
        device: "tablet" | "mobile" | "desktop";
        visitorId: string;
        eventId: string;
        campaignId: string;
        variantId?: string | null | undefined;
        metadata?: Record<string, string | number | boolean | null> | undefined;
        occurredAt?: string | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    events: {
        type: "IMPRESSION" | "COUPON_COPY" | "DISMISS" | "ELIGIBLE" | "PRIMARY_CLICK" | "SECONDARY_CLICK" | "FORM_SUBMIT" | "SUCCESS" | "CONVERSION";
        page: string;
        variantId: string | null;
        metadata: Record<string, string | number | boolean | null>;
        sessionId: string;
        locale: "en" | "ar";
        device: "tablet" | "mobile" | "desktop";
        visitorId: string;
        eventId: string;
        campaignId: string;
        occurredAt?: string | undefined;
    }[];
}, {
    events: {
        type: "IMPRESSION" | "COUPON_COPY" | "DISMISS" | "ELIGIBLE" | "PRIMARY_CLICK" | "SECONDARY_CLICK" | "FORM_SUBMIT" | "SUCCESS" | "CONVERSION";
        page: string;
        sessionId: string;
        locale: "en" | "ar";
        device: "tablet" | "mobile" | "desktop";
        visitorId: string;
        eventId: string;
        campaignId: string;
        variantId?: string | null | undefined;
        metadata?: Record<string, string | number | boolean | null> | undefined;
        occurredAt?: string | undefined;
    }[];
}>;
export declare const popupFormSubmissionSchema: z.ZodObject<{
    variantId: z.ZodString;
    sessionId: z.ZodString;
    visitorId: z.ZodString;
    locale: z.ZodEnum<["en", "ar"]>;
    device: z.ZodEnum<["desktop", "tablet", "mobile"]>;
    page: z.ZodString;
    name: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    email: z.ZodString;
    phone: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    consent: z.ZodBoolean;
    company: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    page: string;
    phone: string | null;
    email: string;
    name: string | null;
    variantId: string;
    sessionId: string;
    locale: "en" | "ar";
    device: "tablet" | "mobile" | "desktop";
    consent: boolean;
    visitorId: string;
    company?: string | undefined;
}, {
    page: string;
    email: string;
    variantId: string;
    sessionId: string;
    locale: "en" | "ar";
    device: "tablet" | "mobile" | "desktop";
    consent: boolean;
    visitorId: string;
    phone?: string | null | undefined;
    name?: string | null | undefined;
    company?: string | undefined;
}>;
export declare const popupPreviewLinkSchema: z.ZodObject<{
    path: z.ZodDefault<z.ZodEffects<z.ZodString, string, string>>;
}, "strip", z.ZodTypeAny, {
    path: string;
}, {
    path?: string | undefined;
}>;
export declare const popupCampaignDefaults: CreatePopupCampaignInput;
//# sourceMappingURL=popup-campaign.schema.d.ts.map