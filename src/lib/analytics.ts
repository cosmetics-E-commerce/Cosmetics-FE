import { rawRequest } from "@/lib/api";

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
  if (typeof window === "undefined" || navigator.doNotTrack === "1") return;
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
