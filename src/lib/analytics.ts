import { rawRequest } from "@/lib/api";
import { recordProductView } from "@/components/campaign/campaign-storage";

export type CommerceEventName =
  | "product_viewed"
  | "product_added_to_cart"
  | "product_removed_from_cart"
  | "wishlist_added"
  | "wishlist_removed"
  | "search_performed"
  | "search_result_clicked"
  | "cart_viewed"
  | "checkout_started"
  | "checkout_step_completed"
  | "purchase_completed"
  | "coupon_applied"
  | "offer_viewed"
  | "product_shared";

export const CAMPAIGN_COMMERCE_EVENT = "bioreza:commerce";
export const CAMPAIGN_CONTEXT_EVENT = "bioreza:campaign-context";
const CAMPAIGN_CONTEXT_KEY = "bioreza.campaign.page-context";

export function emitCampaignContext(data: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(
    CAMPAIGN_CONTEXT_KEY,
    JSON.stringify({ path: window.location.pathname, data }),
  );
  window.dispatchEvent(new CustomEvent(CAMPAIGN_CONTEXT_EVENT, { detail: data }));
}

export function campaignPageContext(pathname: string) {
  if (typeof window === "undefined") return undefined;
  try {
    const stored = JSON.parse(window.sessionStorage.getItem(CAMPAIGN_CONTEXT_KEY) ?? "null") as {
      path?: unknown;
      data?: unknown;
    } | null;
    return stored?.path === pathname &&
      stored.data &&
      typeof stored.data === "object" &&
      !Array.isArray(stored.data)
      ? (stored.data as Record<string, unknown>)
      : undefined;
  } catch {
    return undefined;
  }
}

export function emitCampaignEvent(name: string, data: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("bioreza:campaign", { detail: { name, ...data } }));
}

const SESSION_KEY = "bioreza.analytics.session";
function sessionId() {
  if (typeof window === "undefined") return "00000000-0000-4000-8000-000000000000";
  const current = window.sessionStorage.getItem(SESSION_KEY);
  if (current) return current;
  const next = crypto.randomUUID();
  window.sessionStorage.setItem(SESSION_KEY, next);
  return next;
}
function deviceType() {
  if (typeof window === "undefined") return "unknown" as const;
  if (window.matchMedia("(max-width: 639px)").matches) return "mobile" as const;
  if (window.matchMedia("(max-width: 1023px)").matches) return "tablet" as const;
  return "desktop" as const;
}
export function trackCommerceEvent(name: CommerceEventName, data: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  if (name === "product_viewed") {
    emitCampaignContext(data);
    recordProductView(data);
  }
  window.dispatchEvent(new CustomEvent(CAMPAIGN_COMMERCE_EVENT, { detail: { name, ...data } }));
  if (navigator.doNotTrack === "1") return;
  const payload = {
    name,
    sessionId: sessionId(),
    deviceType: deviceType(),
    source: "storefront",
    ...data,
  };
  window.setTimeout(
    () =>
      void rawRequest("/analytics/events", { method: "POST", auth: false, body: payload }).catch(
        () => undefined,
      ),
    0,
  );
}
