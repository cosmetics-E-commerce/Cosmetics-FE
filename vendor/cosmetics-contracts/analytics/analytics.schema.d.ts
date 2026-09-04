import { z } from "zod";
export declare const businessAnalyticsQuerySchema: z.ZodObject<{
    from: z.ZodOptional<z.ZodString>;
    to: z.ZodOptional<z.ZodString>;
    range: z.ZodDefault<z.ZodEnum<["today", "yesterday", "7d", "14d", "30d", "90d", "this_week", "last_week", "this_month", "last_month", "this_year", "last_year", "all"]>>;
    compare: z.ZodDefault<z.ZodEnum<["none", "previous_period", "previous_week", "previous_month", "previous_year"]>>;
    interval: z.ZodDefault<z.ZodEnum<["auto", "hour", "day", "week", "month", "quarter", "year"]>>;
    timezone: z.ZodDefault<z.ZodString>;
    productIds: z.ZodOptional<z.ZodString>;
    variantIds: z.ZodOptional<z.ZodString>;
    categoryIds: z.ZodOptional<z.ZodString>;
    brandIds: z.ZodOptional<z.ZodString>;
    statuses: z.ZodOptional<z.ZodString>;
    governorates: z.ZodOptional<z.ZodString>;
    paymentMethods: z.ZodOptional<z.ZodString>;
    couponIds: z.ZodOptional<z.ZodString>;
    promotionIds: z.ZodOptional<z.ZodString>;
    customerType: z.ZodDefault<z.ZodEnum<["all", "new", "returning", "guest", "registered"]>>;
    limit: z.ZodDefault<z.ZodNumber>;
    page: z.ZodDefault<z.ZodNumber>;
    search: z.ZodOptional<z.ZodString>;
    metric: z.ZodOptional<z.ZodString>;
    sortBy: z.ZodDefault<z.ZodEnum<["nameEn", "category", "brand", "revenue", "units", "growth", "conversion", "views", "stock"]>>;
    sortOrder: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
}, "strip", z.ZodTypeAny, {
    page: number;
    limit: number;
    sortBy: "revenue" | "nameEn" | "stock" | "category" | "brand" | "units" | "growth" | "conversion" | "views";
    sortOrder: "asc" | "desc";
    timezone: string;
    customerType: "all" | "new" | "returning" | "guest" | "registered";
    range: "all" | "7d" | "30d" | "today" | "yesterday" | "14d" | "90d" | "this_week" | "last_week" | "this_month" | "last_month" | "this_year" | "last_year";
    compare: "none" | "previous_period" | "previous_week" | "previous_month" | "previous_year";
    interval: "auto" | "hour" | "day" | "week" | "month" | "quarter" | "year";
    search?: string | undefined;
    productIds?: string | undefined;
    variantIds?: string | undefined;
    categoryIds?: string | undefined;
    brandIds?: string | undefined;
    from?: string | undefined;
    to?: string | undefined;
    statuses?: string | undefined;
    governorates?: string | undefined;
    paymentMethods?: string | undefined;
    couponIds?: string | undefined;
    promotionIds?: string | undefined;
    metric?: string | undefined;
}, {
    page?: number | undefined;
    limit?: number | undefined;
    sortBy?: "revenue" | "nameEn" | "stock" | "category" | "brand" | "units" | "growth" | "conversion" | "views" | undefined;
    sortOrder?: "asc" | "desc" | undefined;
    search?: string | undefined;
    productIds?: string | undefined;
    variantIds?: string | undefined;
    categoryIds?: string | undefined;
    brandIds?: string | undefined;
    timezone?: string | undefined;
    customerType?: "all" | "new" | "returning" | "guest" | "registered" | undefined;
    range?: "all" | "7d" | "30d" | "today" | "yesterday" | "14d" | "90d" | "this_week" | "last_week" | "this_month" | "last_month" | "this_year" | "last_year" | undefined;
    from?: string | undefined;
    to?: string | undefined;
    compare?: "none" | "previous_period" | "previous_week" | "previous_month" | "previous_year" | undefined;
    interval?: "auto" | "hour" | "day" | "week" | "month" | "quarter" | "year" | undefined;
    statuses?: string | undefined;
    governorates?: string | undefined;
    paymentMethods?: string | undefined;
    couponIds?: string | undefined;
    promotionIds?: string | undefined;
    metric?: string | undefined;
}>;
export declare const commerceEventNames: readonly ["product_viewed", "product_added_to_cart", "product_removed_from_cart", "save_for_later_clicked", "saved_item_moved_to_cart", "saved_item_removed", "move_all_saved_to_cart", "wishlist_added", "wishlist_removed", "search_performed", "search_result_clicked", "cart_viewed", "checkout_started", "checkout_step_completed", "purchase_completed", "coupon_applied", "offer_viewed", "product_shared"];
export declare const commerceEventSchema: z.ZodObject<{
    name: z.ZodEnum<["product_viewed", "product_added_to_cart", "product_removed_from_cart", "save_for_later_clicked", "saved_item_moved_to_cart", "saved_item_removed", "move_all_saved_to_cart", "wishlist_added", "wishlist_removed", "search_performed", "search_result_clicked", "cart_viewed", "checkout_started", "checkout_step_completed", "purchase_completed", "coupon_applied", "offer_viewed", "product_shared"]>;
    sessionId: z.ZodString;
    productId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    variantId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    categoryId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    orderId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    searchTerm: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    resultCount: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    source: z.ZodDefault<z.ZodEnum<["storefront", "admin", "server"]>>;
    deviceType: z.ZodDefault<z.ZodEnum<["mobile", "tablet", "desktop", "unknown"]>>;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull]>>>;
}, "strip", z.ZodTypeAny, {
    name: "product_viewed" | "product_added_to_cart" | "product_removed_from_cart" | "save_for_later_clicked" | "saved_item_moved_to_cart" | "saved_item_removed" | "move_all_saved_to_cart" | "wishlist_added" | "wishlist_removed" | "search_performed" | "search_result_clicked" | "cart_viewed" | "checkout_started" | "checkout_step_completed" | "purchase_completed" | "coupon_applied" | "offer_viewed" | "product_shared";
    source: "storefront" | "admin" | "server";
    metadata: Record<string, string | number | boolean | null>;
    sessionId: string;
    deviceType: "unknown" | "tablet" | "mobile" | "desktop";
    orderId?: string | null | undefined;
    variantId?: string | null | undefined;
    productId?: string | null | undefined;
    categoryId?: string | null | undefined;
    searchTerm?: string | null | undefined;
    resultCount?: number | null | undefined;
}, {
    name: "product_viewed" | "product_added_to_cart" | "product_removed_from_cart" | "save_for_later_clicked" | "saved_item_moved_to_cart" | "saved_item_removed" | "move_all_saved_to_cart" | "wishlist_added" | "wishlist_removed" | "search_performed" | "search_result_clicked" | "cart_viewed" | "checkout_started" | "checkout_step_completed" | "purchase_completed" | "coupon_applied" | "offer_viewed" | "product_shared";
    sessionId: string;
    orderId?: string | null | undefined;
    variantId?: string | null | undefined;
    productId?: string | null | undefined;
    categoryId?: string | null | undefined;
    source?: "storefront" | "admin" | "server" | undefined;
    metadata?: Record<string, string | number | boolean | null> | undefined;
    searchTerm?: string | null | undefined;
    resultCount?: number | null | undefined;
    deviceType?: "unknown" | "tablet" | "mobile" | "desktop" | undefined;
}>;
export declare const savedViewSchema: z.ZodObject<{
    name: z.ZodString;
    filters: z.ZodRecord<z.ZodString, z.ZodUnknown>;
    isDefault: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    isDefault: boolean;
    name: string;
    filters: Record<string, unknown>;
}, {
    name: string;
    filters: Record<string, unknown>;
    isDefault?: boolean | undefined;
}>;
export declare const analyticsDashboardSchema: z.ZodObject<{
    name: z.ZodString;
    isDefault: z.ZodDefault<z.ZodBoolean>;
    layout: z.ZodObject<{
        widgets: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            type: z.ZodEnum<["KPI", "LINE", "BAR", "TABLE", "HEATMAP", "FUNNEL", "RANKING", "INSIGHTS"]>;
            title: z.ZodString;
            metric: z.ZodString;
            dimension: z.ZodString;
            size: z.ZodDefault<z.ZodEnum<["S", "M", "L", "XL"]>>;
            filters: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        }, "strip", z.ZodTypeAny, {
            type: "KPI" | "LINE" | "BAR" | "TABLE" | "HEATMAP" | "FUNNEL" | "RANKING" | "INSIGHTS";
            id: string;
            title: string;
            size: "XL" | "S" | "M" | "L";
            metric: string;
            filters: Record<string, unknown>;
            dimension: string;
        }, {
            type: "KPI" | "LINE" | "BAR" | "TABLE" | "HEATMAP" | "FUNNEL" | "RANKING" | "INSIGHTS";
            id: string;
            title: string;
            metric: string;
            dimension: string;
            size?: "XL" | "S" | "M" | "L" | undefined;
            filters?: Record<string, unknown> | undefined;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        widgets: {
            type: "KPI" | "LINE" | "BAR" | "TABLE" | "HEATMAP" | "FUNNEL" | "RANKING" | "INSIGHTS";
            id: string;
            title: string;
            size: "XL" | "S" | "M" | "L";
            metric: string;
            filters: Record<string, unknown>;
            dimension: string;
        }[];
    }, {
        widgets: {
            type: "KPI" | "LINE" | "BAR" | "TABLE" | "HEATMAP" | "FUNNEL" | "RANKING" | "INSIGHTS";
            id: string;
            title: string;
            metric: string;
            dimension: string;
            size?: "XL" | "S" | "M" | "L" | undefined;
            filters?: Record<string, unknown> | undefined;
        }[];
    }>;
}, "strip", z.ZodTypeAny, {
    isDefault: boolean;
    name: string;
    layout: {
        widgets: {
            type: "KPI" | "LINE" | "BAR" | "TABLE" | "HEATMAP" | "FUNNEL" | "RANKING" | "INSIGHTS";
            id: string;
            title: string;
            size: "XL" | "S" | "M" | "L";
            metric: string;
            filters: Record<string, unknown>;
            dimension: string;
        }[];
    };
}, {
    name: string;
    layout: {
        widgets: {
            type: "KPI" | "LINE" | "BAR" | "TABLE" | "HEATMAP" | "FUNNEL" | "RANKING" | "INSIGHTS";
            id: string;
            title: string;
            metric: string;
            dimension: string;
            size?: "XL" | "S" | "M" | "L" | undefined;
            filters?: Record<string, unknown> | undefined;
        }[];
    };
    isDefault?: boolean | undefined;
}>;
export type AnalyticsQuery = z.infer<typeof businessAnalyticsQuerySchema>;
export type CommerceEventInput = z.infer<typeof commerceEventSchema>;
//# sourceMappingURL=analytics.schema.d.ts.map