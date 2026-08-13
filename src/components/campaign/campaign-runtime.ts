import type { PopupPublishedCampaign, PopupStorefrontContext } from "@/lib/campaign-api";

export type CampaignLifecycle =
  | "IDLE"
  | "ELIGIBLE"
  | "WAITING_FOR_TRIGGER"
  | "QUEUED"
  | "VISIBLE"
  | "INTERACTED"
  | "DISMISSED"
  | "CONVERTED"
  | "COOLDOWN"
  | "COMPLETED";

export type CampaignRuntimeItem = {
  campaign: PopupPublishedCampaign;
  lifecycle: CampaignLifecycle;
  eligibleAt: number;
};

export function resolveCampaignQueue(campaigns: PopupPublishedCampaign[]) {
  const ordered = [...campaigns].sort(
    (left, right) => right.priority - left.priority || left.id.localeCompare(right.id),
  );
  const winner = ordered[0] ?? null;
  if (!winner) return { winner: null, queue: [], suppressed: [] };
  const queue: PopupPublishedCampaign[] = [];
  const suppressed: PopupPublishedCampaign[] = [];
  for (const campaign of ordered.slice(1)) {
    const sameGroup = Boolean(
      winner.collision.exclusivityKey &&
      winner.collision.exclusivityKey === campaign.collision.exclusivityKey,
    );
    if (
      winner.collision.suppressLowerPriority ||
      sameGroup ||
      campaign.collision.queueBehavior === "SUPPRESS"
    ) {
      suppressed.push(campaign);
    } else {
      queue.push(campaign);
    }
  }
  return { winner, queue, suppressed };
}

export function resolveIncomingCampaign(
  active: PopupPublishedCampaign,
  incoming: PopupPublishedCampaign,
): "REPLACE" | "QUEUE" | "SUPPRESS" {
  if (incoming.priority > active.priority && incoming.collision.queueBehavior === "REPLACE_LOWER")
    return "REPLACE";
  const sameGroup = Boolean(
    active.collision.exclusivityKey &&
    active.collision.exclusivityKey === incoming.collision.exclusivityKey,
  );
  if (
    active.collision.suppressLowerPriority ||
    sameGroup ||
    incoming.collision.queueBehavior === "SUPPRESS"
  )
    return "SUPPRESS";
  return "QUEUE";
}

export function pageContext(
  pathname: string,
  search: string,
  productContext?: {
    id?: string;
    slug?: string;
    name?: string;
    categoryId?: string;
    categorySlug?: string;
    categoryName?: string;
  },
): PopupStorefrontContext["page"] {
  const path = `${pathname}${search}`;
  if (pathname === "/") return page("HOME", path);
  if (search.includes("search=")) return page("SEARCH", path);
  if (pathname === "/shop") return page("PRODUCTS", path);
  if (pathname === "/cart") return page("CART", path);
  if (pathname === "/checkout") return page("CHECKOUT", path);
  if (pathname.startsWith("/account")) return page("ACCOUNT", path);
  if (pathname.startsWith("/order-confirmed")) return page("ORDER_TRACKING", path);
  if (pathname.startsWith("/product/")) {
    return {
      ...page("PRODUCT", path),
      productId: productContext?.id ?? null,
      productSlug: productContext?.slug ?? decodeURIComponent(pathname.slice(9)),
      productName: productContext?.name ?? null,
      categoryId: productContext?.categoryId ?? null,
      categorySlug: productContext?.categorySlug ?? null,
      categoryName: productContext?.categoryName ?? null,
    };
  }
  if (pathname.startsWith("/categories/")) {
    return {
      ...page("CATEGORY", path),
      categoryId: productContext?.categoryId ?? null,
      categorySlug: productContext?.categorySlug ?? decodeURIComponent(pathname.slice(12)),
      categoryName: productContext?.categoryName ?? null,
    };
  }
  if (pathname === "/categories") return page("CATEGORY", path);
  return page("CUSTOM", path);
}

export function triggerIsImmediate(
  campaign: PopupPublishedCampaign,
  context: PopupStorefrontContext,
  sessionElapsedSeconds: number,
) {
  const trigger = campaign.trigger;
  if (trigger.type === "IMMEDIATE") return true;
  if (trigger.type === "FIRST_VISIT") return context.visitor.firstVisit;
  if (trigger.type === "RETURNING_SESSION") return context.visitor.returning;
  if (trigger.type === "PAGE_VIEWS") return context.visitor.pageViews >= trigger.pageViewCount;
  if (trigger.type === "SESSION_DURATION")
    return sessionElapsedSeconds >= trigger.sessionDurationSeconds;
  if (trigger.type === "PRODUCT_VIEWS") {
    const views = context.behavior.productViews.filter((view) => {
      const productMatch =
        trigger.productIds.length === 0 ||
        (view.productId ? trigger.productIds.includes(view.productId) : false);
      const categoryMatch =
        trigger.categoryIds.length === 0 ||
        (view.categoryId ? trigger.categoryIds.includes(view.categoryId) : false);
      return productMatch && categoryMatch;
    });
    return views.reduce((sum, view) => sum + view.count, 0) >= trigger.productViewCount;
  }
  if (trigger.type === "CART_THRESHOLD") return context.cart.total >= trigger.cartThreshold;
  return false;
}

export function triggerMatchesEvent(
  campaign: PopupPublishedCampaign,
  event: { name?: unknown; [key: string]: unknown },
) {
  const trigger = campaign.trigger;
  if (trigger.type === "ADD_TO_CART")
    return event.name === "product_added_to_cart" && triggerScopeMatches(trigger, event);
  if (trigger.type === "REMOVE_FROM_CART")
    return event.name === "product_removed_from_cart" && triggerScopeMatches(trigger, event);
  if (trigger.type === "CUSTOM_EVENT") return event.name === trigger.eventName;
  return false;
}

function triggerScopeMatches(
  trigger: PopupPublishedCampaign["trigger"],
  event: { [key: string]: unknown },
) {
  const productMatches =
    trigger.productIds.length === 0 ||
    (typeof event["productId"] === "string" && trigger.productIds.includes(event["productId"]));
  const categoryMatches =
    trigger.categoryIds.length === 0 ||
    (typeof event["categoryId"] === "string" && trigger.categoryIds.includes(event["categoryId"]));
  return productMatches && categoryMatches;
}

export async function copyCampaignText(value: string) {
  try {
    await navigator.clipboard.writeText(value);
    return true;
  } catch {
    try {
      const field = document.createElement("textarea");
      field.value = value;
      field.setAttribute("readonly", "");
      field.style.position = "fixed";
      field.style.opacity = "0";
      document.body.append(field);
      field.select();
      const copied = document.execCommand("copy");
      field.remove();
      return copied;
    } catch {
      return false;
    }
  }
}

function page(type: PopupStorefrontContext["page"]["type"], path: string) {
  return {
    path,
    type,
    productId: null,
    productSlug: null,
    productName: null,
    categoryId: null,
    categorySlug: null,
    categoryName: null,
  };
}
