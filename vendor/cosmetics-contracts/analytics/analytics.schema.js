"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyticsDashboardSchema =
  exports.savedViewSchema =
  exports.commerceEventSchema =
  exports.commerceEventNames =
  exports.businessAnalyticsQuerySchema =
    void 0;
const zod_1 = require("zod");
const csv = zod_1.z.string().trim().max(2000).optional();
exports.businessAnalyticsQuerySchema = zod_1.z.object({
  from: zod_1.z.string().datetime({ offset: true }).optional(),
  to: zod_1.z.string().datetime({ offset: true }).optional(),
  range: zod_1.z
    .enum([
      "today",
      "yesterday",
      "7d",
      "14d",
      "30d",
      "90d",
      "this_week",
      "last_week",
      "this_month",
      "last_month",
      "this_year",
      "last_year",
      "all",
    ])
    .default("30d"),
  compare: zod_1.z
    .enum(["none", "previous_period", "previous_week", "previous_month", "previous_year"])
    .default("previous_period"),
  interval: zod_1.z
    .enum(["auto", "hour", "day", "week", "month", "quarter", "year"])
    .default("auto"),
  timezone: zod_1.z.string().trim().max(64).default("Africa/Cairo"),
  productIds: csv,
  variantIds: csv,
  categoryIds: csv,
  brandIds: csv,
  statuses: csv,
  governorates: csv,
  paymentMethods: csv,
  couponIds: csv,
  promotionIds: csv,
  customerType: zod_1.z.enum(["all", "new", "returning", "guest", "registered"]).default("all"),
  limit: zod_1.z.coerce.number().int().min(5).max(100).default(25),
  page: zod_1.z.coerce.number().int().min(1).default(1),
  search: zod_1.z.string().trim().max(160).optional(),
  metric: zod_1.z.string().trim().max(64).optional(),
});
exports.commerceEventNames = [
  "product_viewed",
  "product_added_to_cart",
  "product_removed_from_cart",
  "wishlist_added",
  "wishlist_removed",
  "search_performed",
  "search_result_clicked",
  "cart_viewed",
  "checkout_started",
  "checkout_step_completed",
  "purchase_completed",
  "coupon_applied",
  "offer_viewed",
  "product_shared",
];
exports.commerceEventSchema = zod_1.z.object({
  name: zod_1.z.enum(exports.commerceEventNames),
  sessionId: zod_1.z.string().uuid(),
  productId: zod_1.z.string().uuid().nullable().optional(),
  variantId: zod_1.z.string().uuid().nullable().optional(),
  categoryId: zod_1.z.string().uuid().nullable().optional(),
  orderId: zod_1.z.string().uuid().nullable().optional(),
  searchTerm: zod_1.z.string().trim().max(240).nullable().optional(),
  resultCount: zod_1.z.number().int().min(0).nullable().optional(),
  source: zod_1.z.enum(["storefront", "admin", "server"]).default("storefront"),
  deviceType: zod_1.z.enum(["mobile", "tablet", "desktop", "unknown"]).default("unknown"),
  metadata: zod_1.z
    .record(zod_1.z.union([zod_1.z.string(), zod_1.z.number(), zod_1.z.boolean(), zod_1.z.null()]))
    .default({}),
});
exports.savedViewSchema = zod_1.z.object({
  name: zod_1.z.string().trim().min(2).max(120),
  filters: zod_1.z.record(zod_1.z.unknown()),
  isDefault: zod_1.z.boolean().default(false),
});
const widgetSchema = zod_1.z.object({
  id: zod_1.z.string().min(1).max(80),
  type: zod_1.z.enum(["KPI", "LINE", "BAR", "TABLE", "HEATMAP", "FUNNEL", "RANKING", "INSIGHTS"]),
  title: zod_1.z.string().trim().min(1).max(120),
  metric: zod_1.z.string().trim().max(64),
  dimension: zod_1.z.string().trim().max(64),
  size: zod_1.z.enum(["S", "M", "L", "XL"]).default("M"),
  filters: zod_1.z.record(zod_1.z.unknown()).default({}),
});
exports.analyticsDashboardSchema = zod_1.z.object({
  name: zod_1.z.string().trim().min(2).max(120),
  isDefault: zod_1.z.boolean().default(false),
  layout: zod_1.z.object({ widgets: zod_1.z.array(widgetSchema).max(40) }),
});
//# sourceMappingURL=analytics.schema.js.map
