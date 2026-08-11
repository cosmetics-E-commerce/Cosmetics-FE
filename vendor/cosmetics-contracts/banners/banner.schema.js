"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyticsQuerySchema =
  exports.bannerTemplateSchema =
  exports.bannerSettingsSchema =
  exports.activeBannerQuerySchema =
  exports.bannerEventSchema =
  exports.reorderBannersSchema =
  exports.bannerQuerySchema =
  exports.updateBannerSchema =
  exports.createBannerSchema =
  exports.recurringScheduleSchema =
  exports.bannerResponsiveSchema =
  exports.bannerTargetingSchema =
  exports.bannerBehaviorSchema =
  exports.bannerAnimationSchema =
  exports.bannerDesignSchema =
  exports.bannerMessageSchema =
  exports.bannerDisplayStrategySchema =
  exports.bannerStatusSchema =
  exports.bannerPositionSchema =
  exports.bannerStateSchema =
  exports.bannerModeSchema =
    void 0;
const zod_1 = require("zod");
const color = zod_1.z
  .string()
  .trim()
  .regex(/^#[0-9a-f]{6}$/i, "Use a six-digit hex color");
const nullableDate = zod_1.z.string().datetime({ offset: true }).nullable().optional();
const queryBoolean = zod_1.z.preprocess(
  (value) => (value === "true" ? true : value === "false" ? false : value),
  zod_1.z.boolean(),
);
const safeUrl = zod_1.z
  .string()
  .trim()
  .max(1000)
  .refine((value) => {
    if (!value || value.startsWith("/")) return true;
    try {
      return ["http:", "https:"].includes(new URL(value).protocol);
    } catch {
      return false;
    }
  }, "Use an internal path or a valid http(s) URL")
  .nullable()
  .optional();
exports.bannerModeSchema = zod_1.z.enum([
  "STATIC",
  "TICKER",
  "ROTATING",
  "CAROUSEL",
  "COUNTDOWN",
  "FREE_SHIPPING_PROGRESS",
]);
exports.bannerStateSchema = zod_1.z.enum(["DRAFT", "ACTIVE", "PAUSED", "ARCHIVED"]);
exports.bannerPositionSchema = zod_1.z.enum(["TOP", "BELOW_HEADER", "BOTTOM"]);
exports.bannerStatusSchema = zod_1.z.enum([
  "DRAFT",
  "SCHEDULED",
  "ACTIVE",
  "PAUSED",
  "EXPIRED",
  "ARCHIVED",
]);
exports.bannerDisplayStrategySchema = zod_1.z.enum([
  "HIGHEST_PRIORITY",
  "ROTATE",
  "STACK",
  "SEQUENCE",
]);
exports.bannerMessageSchema = zod_1.z.object({
  id: zod_1.z.string().uuid().optional(),
  textEn: zod_1.z.string().trim().min(1).max(500),
  textAr: zod_1.z.string().trim().max(500).nullable().optional(),
  secondaryTextEn: zod_1.z.string().trim().max(500).nullable().optional(),
  secondaryTextAr: zod_1.z.string().trim().max(500).nullable().optional(),
  icon: zod_1.z
    .enum(["truck", "gift", "star", "heart", "bag", "sparkle", "tag", "clock", "info", "warning"])
    .nullable()
    .optional(),
  emoji: zod_1.z.string().trim().max(16).nullable().optional(),
  url: safeUrl,
  openInNewTab: zod_1.z.boolean().default(false),
  ctaTextEn: zod_1.z.string().trim().max(80).nullable().optional(),
  ctaTextAr: zod_1.z.string().trim().max(80).nullable().optional(),
  ctaStyle: zod_1.z.enum(["TEXT", "UNDERLINE", "OUTLINE", "FILLED"]).default("TEXT"),
  couponId: zod_1.z.string().uuid().nullable().optional(),
  couponCode: zod_1.z
    .string()
    .trim()
    .toUpperCase()
    .max(64)
    .regex(/^[A-Z0-9_-]+$/)
    .nullable()
    .optional(),
  countdownAt: nullableDate,
  style: zod_1.z
    .object({
      textColor: color.nullable().optional(),
      emphasis: zod_1.z.boolean().default(false),
    })
    .default({ emphasis: false }),
});
exports.bannerDesignSchema = zod_1.z.object({
  backgroundType: zod_1.z.enum(["SOLID", "GRADIENT", "IMAGE", "PATTERN"]).default("SOLID"),
  backgroundColor: color.default("#191714"),
  gradient: zod_1.z.string().trim().max(300).nullable().optional(),
  backgroundImage: safeUrl,
  pattern: zod_1.z.enum(["NONE", "DOTS", "LINES", "GRID"]).default("NONE"),
  backgroundOpacity: zod_1.z.number().min(0.1).max(1).default(1),
  textColor: color.default("#FFFFFF"),
  fontFamily: zod_1.z.enum(["SANS", "SERIF"]).default("SANS"),
  fontWeight: zod_1.z.enum(["200", "300", "400", "500", "600", "700"]).default("400"),
  fontSizeDesktop: zod_1.z.number().int().min(8).max(32).default(10),
  fontSizeTablet: zod_1.z.number().int().min(8).max(32).default(10),
  fontSizeMobile: zod_1.z.number().int().min(8).max(32).default(9),
  letterSpacing: zod_1.z.number().min(0).max(12).default(3),
  lineHeight: zod_1.z.number().min(1).max(2.5).default(1.4),
  textTransform: zod_1.z
    .enum(["NONE", "UPPERCASE", "LOWERCASE", "CAPITALIZE"])
    .default("UPPERCASE"),
  textAlign: zod_1.z.enum(["LEFT", "CENTER", "RIGHT"]).default("CENTER"),
  heightDesktop: zod_1.z.number().int().min(24).max(180).default(32),
  heightTablet: zod_1.z.number().int().min(24).max(180).default(32),
  heightMobile: zod_1.z.number().int().min(24).max(180).default(34),
  horizontalPadding: zod_1.z.number().int().min(0).max(80).default(20),
  verticalPadding: zod_1.z.number().int().min(0).max(40).default(6),
  borderTop: zod_1.z.boolean().default(false),
  borderBottom: zod_1.z.boolean().default(false),
  borderWidth: zod_1.z.number().int().min(0).max(6).default(1),
  borderColor: color.default("#302E2A"),
  borderStyle: zod_1.z.enum(["SOLID", "DASHED", "DOTTED"]).default("SOLID"),
  shadow: zod_1.z.enum(["NONE", "SUBTLE", "MEDIUM", "STRONG"]).default("NONE"),
  zIndex: zod_1.z.number().int().min(10).max(100).default(40),
  ctaBackground: color.default("#FFFFFF"),
  ctaColor: color.default("#191714"),
  ctaHoverBackground: color.default("#D0AE72"),
  ctaHoverColor: color.default("#191714"),
  ctaBorderColor: color.default("#FFFFFF"),
  ctaRadius: zod_1.z.number().int().min(0).max(30).default(2),
});
exports.bannerAnimationSchema = zod_1.z.object({
  entrance: zod_1.z
    .enum(["NONE", "FADE", "SLIDE_DOWN", "SLIDE_UP", "SCALE", "REVEAL"])
    .default("FADE"),
  exit: zod_1.z.enum(["NONE", "FADE", "SLIDE_DOWN", "SLIDE_UP"]).default("FADE"),
  transition: zod_1.z
    .enum([
      "FADE",
      "SLIDE_LEFT",
      "SLIDE_RIGHT",
      "SLIDE_UP",
      "SLIDE_DOWN",
      "CROSSFADE",
      "BLUR",
      "SCALE",
      "INSTANT",
    ])
    .default("FADE"),
  durationMs: zod_1.z.number().int().min(0).max(2000).default(300),
  delayMs: zod_1.z.number().int().min(0).max(5000).default(0),
  easing: zod_1.z.enum(["STANDARD", "PREMIUM", "LINEAR"]).default("PREMIUM"),
  messageDurationMs: zod_1.z.number().int().min(1000).max(60000).default(5000),
  tickerSpeed: zod_1.z.number().int().min(10).max(180).default(35),
  tickerDirection: zod_1.z.enum(["LTR", "RTL"]).default("RTL"),
  pauseOnHover: zod_1.z.boolean().default(true),
  pauseOnInteraction: zod_1.z.boolean().default(true),
  loop: zod_1.z.boolean().default(true),
  separator: zod_1.z.string().max(12).default("✦"),
  separatorColor: color.default("#D0AE72"),
  separatorSize: zod_1.z.number().int().min(6).max(32).default(9),
  separatorSpacing: zod_1.z.number().int().min(8).max(100).default(32),
});
exports.bannerBehaviorSchema = zod_1.z.object({
  sticky: zod_1.z.enum(["FIXED", "STICKY", "NON_STICKY"]).default("FIXED"),
  dismissible: zod_1.z.boolean().default(false),
  dismissalMode: zod_1.z
    .enum(["REFRESH", "SESSION", "HOURS", "DAYS", "PERMANENT"])
    .default("SESSION"),
  dismissalDuration: zod_1.z.number().int().min(1).max(365).nullable().default(null),
  autoplay: zod_1.z.boolean().default(true),
  intervalMs: zod_1.z.number().int().min(1000).max(60000).default(5000),
  arrows: zod_1.z.boolean().default(false),
  pagination: zod_1.z.boolean().default(false),
  loop: zod_1.z.boolean().default(true),
  swipe: zod_1.z.boolean().default(true),
  countdownEnd: zod_1.z
    .enum(["HIDE", "ZERO", "MESSAGE", "REDIRECT", "NEXT_BANNER"])
    .default("HIDE"),
  expirationMessageEn: zod_1.z.string().trim().max(300).nullable().default(null),
  expirationMessageAr: zod_1.z.string().trim().max(300).nullable().default(null),
  redirectUrl: safeUrl,
  nextBannerId: zod_1.z.string().uuid().nullable().optional(),
  freeShippingThresholdSource: zod_1.z.enum(["STORE", "CUSTOM"]).default("STORE"),
  freeShippingThreshold: zod_1.z.number().int().min(1).nullable().default(null),
  remainingMessageEn: zod_1.z
    .string()
    .trim()
    .max(300)
    .default("YOU'RE {{cart.remainingForFreeShipping}} AWAY FROM FREE SHIPPING"),
  remainingMessageAr: zod_1.z
    .string()
    .trim()
    .max(300)
    .default("متبقي {{cart.remainingForFreeShipping}} للحصول على توصيل مجاني"),
  successMessageEn: zod_1.z.string().trim().max(300).default("YOU'VE UNLOCKED FREE SHIPPING"),
  successMessageAr: zod_1.z.string().trim().max(300).default("لقد حصلت على التوصيل المجاني"),
  showProgress: zod_1.z.boolean().default(true),
  inheritPromotionSchedule: zod_1.z.boolean().default(false),
});
exports.bannerTargetingSchema = zod_1.z.object({
  authentication: zod_1.z.enum(["ALL", "GUEST", "LOGGED_IN"]).default("ALL"),
  customerType: zod_1.z.enum(["ALL", "NEW", "RETURNING"]).default("ALL"),
  devices: zod_1.z
    .array(zod_1.z.enum(["desktop", "tablet", "mobile"]))
    .min(1)
    .default(["desktop", "tablet", "mobile"]),
  pages: zod_1.z
    .array(
      zod_1.z.enum([
        "EVERYWHERE",
        "HOME",
        "PRODUCTS",
        "PRODUCT",
        "CATEGORIES",
        "CATEGORY",
        "COLLECTIONS",
        "CART",
        "CHECKOUT",
        "ACCOUNT",
        "OFFERS",
        "CUSTOM",
      ]),
    )
    .min(1)
    .default(["EVERYWHERE"]),
  urlPatterns: zod_1.z.array(zod_1.z.string().trim().min(1).max(200)).max(30).default([]),
  productIds: zod_1.z.array(zod_1.z.string().uuid()).max(500).default([]),
  categoryIds: zod_1.z.array(zod_1.z.string().uuid()).max(500).default([]),
  cartState: zod_1.z.enum(["ANY", "EMPTY", "HAS_ITEMS"]).default("ANY"),
  cartSubtotalMin: zod_1.z.number().int().min(0).nullable().default(null),
  cartSubtotalMax: zod_1.z.number().int().min(0).nullable().default(null),
  countries: zod_1.z.array(zod_1.z.string().trim().min(2).max(80)).max(100).default([]),
  regions: zod_1.z.array(zod_1.z.string().trim().min(1).max(80)).max(100).default([]),
});
exports.bannerResponsiveSchema = zod_1.z.object({
  showDesktop: zod_1.z.boolean().default(true),
  showTablet: zod_1.z.boolean().default(true),
  showMobile: zod_1.z.boolean().default(true),
  desktopMode: exports.bannerModeSchema.nullable().default(null),
  tabletMode: exports.bannerModeSchema.nullable().default(null),
  mobileMode: exports.bannerModeSchema.nullable().default(null),
  desktopTextEn: zod_1.z.string().trim().max(500).nullable().default(null),
  desktopTextAr: zod_1.z.string().trim().max(500).nullable().default(null),
  mobileTextEn: zod_1.z.string().trim().max(500).nullable().default(null),
  mobileTextAr: zod_1.z.string().trim().max(500).nullable().default(null),
  hideCtaMobile: zod_1.z.boolean().default(false),
  hideIconsMobile: zod_1.z.boolean().default(false),
});
exports.recurringScheduleSchema = zod_1.z
  .object({
    enabled: zod_1.z.boolean().default(false),
    weekdays: zod_1.z.array(zod_1.z.number().int().min(0).max(6)).default([]),
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
exports.createBannerSchema = zod_1.z
  .object({
    internalName: zod_1.z.string().trim().min(2).max(180),
    mode: exports.bannerModeSchema.default("STATIC"),
    state: exports.bannerStateSchema.default("DRAFT"),
    priority: zod_1.z.number().int().min(-10000).max(10000).default(50),
    sortOrder: zod_1.z.number().int().min(0).max(100000).default(0),
    position: exports.bannerPositionSchema.default("TOP"),
    startsAt: nullableDate,
    endsAt: nullableDate,
    timezone: zod_1.z.string().trim().min(1).max(80).default("Africa/Cairo"),
    recurringSchedule: exports.recurringScheduleSchema,
    design: exports.bannerDesignSchema.default({}),
    animation: exports.bannerAnimationSchema.default({}),
    behavior: exports.bannerBehaviorSchema.default({}),
    targeting: exports.bannerTargetingSchema.default({}),
    responsive: exports.bannerResponsiveSchema.default({}),
    promotionId: zod_1.z.string().uuid().nullable().default(null),
    messages: zod_1.z.array(exports.bannerMessageSchema).min(1).max(50),
  })
  .superRefine((value, ctx) => {
    if (value.startsAt && value.endsAt && new Date(value.endsAt) <= new Date(value.startsAt))
      ctx.addIssue({
        code: "custom",
        path: ["endsAt"],
        message: "End time must be after start time",
      });
    if (
      value.mode === "COUNTDOWN" &&
      !value.endsAt &&
      !value.messages.some((message) => message.countdownAt)
    )
      ctx.addIssue({
        code: "custom",
        path: ["endsAt"],
        message: "Countdown banners require an end time",
      });
    if (
      value.behavior.freeShippingThresholdSource === "CUSTOM" &&
      !value.behavior.freeShippingThreshold
    )
      ctx.addIssue({
        code: "custom",
        path: ["behavior", "freeShippingThreshold"],
        message: "Enter a custom free-shipping threshold",
      });
  });
// Updates are merged with the stored draft and then parsed through the complete
// schema in the service. This keeps PATCH ergonomic without weakening the final
// configuration validation.
exports.updateBannerSchema = zod_1.z.record(zod_1.z.unknown());
exports.bannerQuerySchema = zod_1.z.object({
  page: zod_1.z.coerce.number().int().min(1).default(1),
  limit: zod_1.z.coerce.number().int().min(1).max(100).default(20),
  search: zod_1.z.string().trim().max(180).optional(),
  state: exports.bannerStateSchema.optional(),
  mode: exports.bannerModeSchema.optional(),
  sort: zod_1.z.enum(["priority", "updatedAt", "startsAt", "name"]).default("priority"),
  direction: zod_1.z.enum(["asc", "desc"]).default("desc"),
});
exports.reorderBannersSchema = zod_1.z.object({
  ids: zod_1.z.array(zod_1.z.string().uuid()).min(1).max(500),
});
exports.bannerEventSchema = zod_1.z.object({
  type: zod_1.z.enum(["IMPRESSION", "CLICK", "CTA_CLICK", "COUPON_COPY", "DISMISS"]),
  messageId: zod_1.z.string().uuid().nullable().optional(),
  locale: zod_1.z.enum(["en", "ar"]).default("en"),
  device: zod_1.z.enum(["desktop", "tablet", "mobile"]).default("desktop"),
  page: zod_1.z.string().max(500).default("/"),
  sessionHash: zod_1.z
    .string()
    .regex(/^[a-f0-9]{64}$/i)
    .nullable()
    .optional(),
});
exports.activeBannerQuerySchema = zod_1.z.object({
  locale: zod_1.z.enum(["en", "ar"]).default("en"),
  page: zod_1.z.string().max(500).default("/"),
  device: zod_1.z.enum(["desktop", "tablet", "mobile"]).default("desktop"),
  authenticated: queryBoolean.default(false),
  returning: queryBoolean.default(false),
  cartSubtotal: zod_1.z.coerce.number().int().min(0).default(0),
  cartCount: zod_1.z.coerce.number().int().min(0).default(0),
  productId: zod_1.z.string().uuid().optional(),
  categoryId: zod_1.z.string().uuid().optional(),
  country: zod_1.z.string().max(80).optional(),
  region: zod_1.z.string().max(80).optional(),
  customerName: zod_1.z.string().max(100).optional(),
  couponCode: zod_1.z.string().max(64).optional(),
});
exports.bannerSettingsSchema = zod_1.z.object({
  enabled: zod_1.z.boolean(),
  displayStrategy: exports.bannerDisplayStrategySchema,
  defaultPosition: exports.bannerPositionSchema,
  analyticsEnabled: zod_1.z.boolean(),
  defaultConfig: zod_1.z.record(zod_1.z.unknown()).default({}),
});
exports.bannerTemplateSchema = zod_1.z.object({
  name: zod_1.z.string().trim().min(2).max(180),
  description: zod_1.z.string().trim().max(500).nullable().optional(),
  configuration: exports.createBannerSchema,
});
exports.analyticsQuerySchema = zod_1.z.object({
  range: zod_1.z.enum(["24h", "7d", "30d", "custom"]).default("7d"),
  from: nullableDate,
  to: nullableDate,
});
//# sourceMappingURL=banner.schema.js.map
