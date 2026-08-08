import { rawRequest } from "./api";

export type BannerMode =
  "STATIC" | "TICKER" | "ROTATING" | "CAROUSEL" | "COUNTDOWN" | "FREE_SHIPPING_PROGRESS";
export type Device = "desktop" | "tablet" | "mobile";
export type EventType = "IMPRESSION" | "CLICK" | "CTA_CLICK" | "COUPON_COPY" | "DISMISS";
export type BannerMessage = {
  id?: string;
  text: string;
  secondaryText?: string | null;
  icon?: string | null;
  emoji?: string | null;
  url?: string | null;
  openInNewTab?: boolean;
  ctaText?: string | null;
  ctaStyle?: "TEXT" | "UNDERLINE" | "OUTLINE" | "FILLED";
  couponCode?: string | null;
  countdownAt?: string | null;
  style?: { textColor?: string | null; emphasis?: boolean };
};
export type BannerDesign = Record<string, unknown> & {
  backgroundType?: string;
  backgroundColor?: string;
  backgroundImage?: string;
  gradient?: string;
  textColor?: string;
  fontFamily?: string;
  fontWeight?: string | number;
  fontSizeDesktop?: number;
  fontSizeTablet?: number;
  fontSizeMobile?: number;
  heightDesktop?: number;
  heightTablet?: number;
  heightMobile?: number;
  horizontalPadding?: number;
  verticalPadding?: number;
  letterSpacing?: number;
  lineHeight?: number;
  textAlign?: string;
  textTransform?: string;
  ctaBackground?: string;
  ctaColor?: string;
  zIndex?: number;
};
export type BannerAnimation = {
  entrance?: string;
  transition?: string;
  durationMs?: number;
  messageDurationMs?: number;
  pauseOnHover?: boolean;
  tickerSpeed?: number;
  tickerDirection?: string;
  separator?: string;
  separatorColor?: string;
  separatorSize?: number;
  separatorSpacing?: number;
};
export type BannerBehavior = {
  autoplay?: boolean;
  intervalMs?: number;
  arrows?: boolean;
  pagination?: boolean;
  dismissible?: boolean;
  dismissalMode?: "REFRESH" | "SESSION" | "HOURS" | "DAYS" | "PERMANENT";
  dismissalDuration?: number | null;
  countdownEnd?: "HIDE" | "ZERO" | "MESSAGE" | "REDIRECT" | "NEXT_BANNER";
  redirectUrl?: string | null;
  expirationMessageEn?: string | null;
  expirationMessageAr?: string | null;
  successMessageEn?: string;
  successMessageAr?: string;
  remainingMessageEn?: string;
  remainingMessageAr?: string;
  showProgress?: boolean;
};
export type StoreBanner = {
  id: string;
  mode: BannerMode;
  effectiveMode: BannerMode;
  priority: number;
  position: "TOP" | "BELOW_HEADER" | "BOTTOM";
  startsAt: string | null;
  endsAt: string | null;
  design: BannerDesign;
  animation: BannerAnimation;
  behavior: BannerBehavior;
  responsive: Record<string, unknown>;
  messages: BannerMessage[];
  freeShipping: {
    threshold: number;
    remaining: number;
    unlocked: boolean;
    progress: number;
  } | null;
};
export type BannerContext = {
  locale: "en" | "ar";
  page: string;
  device: Device;
  authenticated: boolean;
  returning: boolean;
  cartSubtotal: number;
  cartCount: number;
  customerName?: string | undefined;
  couponCode?: string | undefined;
};

export function getActiveBanners(context: BannerContext) {
  const query = new URLSearchParams();
  Object.entries(context).forEach(([key, value]) => {
    if (value !== undefined) query.set(key, String(value));
  });
  return rawRequest<{
    strategy: "HIGHEST_PRIORITY" | "ROTATE" | "STACK" | "SEQUENCE";
    banners: StoreBanner[];
  }>(`/banners/active?${query}`, { auth: false });
}

export async function trackBannerEvent(
  id: string,
  body: {
    type: EventType;
    messageId?: string | null | undefined;
    locale: "en" | "ar";
    device: Device;
    page: string;
    sessionHash: string;
  },
) {
  await rawRequest(`/banners/${encodeURIComponent(id)}/events`, {
    method: "POST",
    auth: false,
    body,
  });
}
