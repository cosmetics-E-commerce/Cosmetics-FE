import { useLocation } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import {
  CAMPAIGN_COMMERCE_EVENT,
  CAMPAIGN_CONTEXT_EVENT,
  campaignPageContext,
} from "@/lib/analytics";
import {
  getEligibleCampaigns,
  type PopupAnalyticsEventType,
  type PopupDevice,
  type PopupPublishedCampaign,
  type PopupStorefrontContext,
} from "@/lib/campaign-api";
import { useStore } from "@/lib/store";
import { CampaignRenderer } from "./CampaignRenderer";
import { flushCampaignEvents, queueCampaignEvent } from "./campaign-analytics";
import {
  attributableCampaign,
  clearAttribution,
  clientFrequencyAllows,
  history,
  markSessionShown,
  productViews,
  recordAttribution,
  recordProductView,
  updateHistory,
  visitState,
} from "./campaign-storage";
import {
  copyCampaignText,
  pageContext,
  resolveCampaignQueue,
  resolveIncomingCampaign,
  triggerIsImmediate,
  triggerMatchesEvent,
} from "./campaign-runtime";

type ActiveState = {
  campaign: PopupPublishedCampaign;
  presentation: PopupPublishedCampaign["presentation"]["desktop"];
  contextKey: string;
  lifecycle: "VISIBLE" | "INTERACTED" | "CONVERTED";
};

type CampaignPageDetails = NonNullable<Parameters<typeof pageContext>[2]>;

export default function CampaignEngine() {
  const location = useLocation();
  const store = useStore();
  const [device, setDevice] = useState<PopupDevice>("desktop");
  const [campaigns, setCampaigns] = useState<PopupPublishedCampaign[]>([]);
  const [active, setActive] = useState<ActiveState | null>(null);
  const [queued, setQueued] = useState<PopupPublishedCampaign[]>([]);
  const [context, setContext] = useState<PopupStorefrontContext | null>(null);
  const [serverTimeOffsetMs, setServerTimeOffsetMs] = useState(0);
  const timers = useRef(new Map<string, number>());
  const cleanupFns = useRef<Array<() => void>>([]);
  const activeRef = useRef(active);
  const queuedRef = useRef(queued);
  const latestProduct = useRef<{
    path: string;
    data: CampaignPageDetails;
  } | null>(null);
  const requestSequence = useRef(0);
  const cooldownUntil = useRef(0);
  const queueTimer = useRef<number | null>(null);
  const eligibleTracked = useRef(new Set<string>());
  const lastBehaviorEvent = useRef<{
    detail: Record<string, unknown>;
    occurredAt: number;
  } | null>(null);
  activeRef.current = active;
  queuedRef.current = queued;

  const path = `${location.pathname}${location.searchStr || ""}`;
  const currentContextKey = `${path}|${store.locale}|${device}`;
  const previewToken = useMemo(() => {
    const search = new URLSearchParams(location.searchStr || "");
    return search.get("campaign_preview");
  }, [location.searchStr]);

  const buildContext = useCallback((): PopupStorefrontContext => {
    const visit = visitState(path);
    const referrer = document.referrer ? safeHost(document.referrer) : null;
    const search = new URLSearchParams(location.searchStr || "");
    const persistedContext = campaignPageContext(location.pathname);
    const pageDetails =
      (latestProduct.current?.path === location.pathname
        ? latestProduct.current.data
        : undefined) ??
      (persistedContext
        ? compactStrings({
            id: persistedContext["productId"],
            slug: persistedContext["productSlug"],
            name: persistedContext["productName"],
            categoryId: persistedContext["categoryId"],
            categorySlug: persistedContext["categorySlug"],
            categoryName: persistedContext["categoryName"],
          })
        : undefined);
    return {
      locale: store.locale,
      device,
      page: pageContext(location.pathname, location.searchStr || "", pageDetails),
      visitor: {
        ...visit,
        referrerDomain: referrer,
        utmSource: search.get("utm_source"),
        utmCampaign: search.get("utm_campaign"),
      },
      cart: {
        total: Math.round(store.subtotal * 100),
        itemCount: store.count,
        productIds: [...new Set(store.lines.map((line) => line.productId))],
        categoryIds: [...new Set(store.lines.map((line) => line.categoryId).filter(Boolean))],
        couponCode: store.couponCode,
      },
      behavior: { productViews: productViews() },
      previewToken,
    };
  }, [
    device,
    location.pathname,
    location.searchStr,
    path,
    previewToken,
    store.count,
    store.couponCode,
    store.lines,
    store.locale,
    store.subtotal,
  ]);

  const fetchEligible = useCallback(async () => {
    const sequence = ++requestSequence.current;
    const nextContext = buildContext();
    setContext(nextContext);
    try {
      const result = await getEligibleCampaigns(nextContext);
      if (sequence !== requestSequence.current) return;
      const serverTime = new Date(result.serverTime).getTime();
      if (Number.isFinite(serverTime)) setServerTimeOffsetMs(serverTime - Date.now());
      setCampaigns(result.campaigns.filter((campaign) => clientFrequencyAllows(campaign)));
    } catch {
      if (sequence === requestSequence.current) setCampaigns([]);
    }
  }, [buildContext]);

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 639px)");
    const tablet = window.matchMedia("(min-width: 640px) and (max-width: 1023px)");
    const update = () =>
      setDevice(mobile.matches ? "mobile" : tablet.matches ? "tablet" : "desktop");
    update();
    mobile.addEventListener("change", update);
    tablet.addEventListener("change", update);
    return () => {
      mobile.removeEventListener("change", update);
      tablet.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => void fetchEligible(), 180);
    return () => window.clearTimeout(timer);
  }, [fetchEligible]);

  useEffect(() => {
    if (!active || active.contextKey === currentContextKey) return;
    setActive(null);
    setQueued([]);
    if (queueTimer.current !== null) {
      window.clearTimeout(queueTimer.current);
      queueTimer.current = null;
    }
  }, [active, currentContextKey]);

  const showCampaign = useCallback(
    (campaign: PopupPublishedCampaign) => {
      if (!context || !clientFrequencyAllows(campaign)) return;
      const shownAt = new Date().toISOString();
      const previous = history(campaign.id);
      updateHistory(campaign.id, {
        impressions: previous.impressions + 1,
        lastShownAt: shownAt,
      });
      markSessionShown(campaign.id);
      setActive({
        campaign,
        presentation: presentationFor(campaign, device),
        contextKey: currentContextKey,
        lifecycle: "VISIBLE",
      });
      track("IMPRESSION", campaign, context);
    },
    [context, currentContextKey, device],
  );

  const offer = useCallback(
    (candidates: PopupPublishedCampaign[]) => {
      if (!context) return;
      const activeId = activeRef.current?.campaign.id;
      const available = candidates.filter(
        (campaign) => campaign.id !== activeId && clientFrequencyAllows(campaign),
      );
      if (!available.length) return;
      if (Date.now() < cooldownUntil.current) {
        setQueued((items) => orderedQueue([...items, ...available]));
        return;
      }
      const { winner, queue } = resolveCampaignQueue(available);
      if (!winner) return;
      if (activeRef.current) {
        const current = activeRef.current.campaign;
        const resolution = resolveIncomingCampaign(current, winner);
        if (resolution === "REPLACE") {
          setQueued((items) => orderedQueue([...queue, ...items]));
          showCampaign(winner);
        } else if (resolution === "QUEUE") {
          setQueued((items) => orderedQueue([...items, winner, ...queue]));
        }
        return;
      }
      showCampaign(winner);
      setQueued((items) => orderedQueue([...items, ...queue]));
    },
    [context, showCampaign],
  );

  useEffect(() => {
    const onCommerce = (event: Event) => {
      const detail = (event as CustomEvent<Record<string, unknown>>).detail ?? {};
      if (
        detail["name"] === "product_added_to_cart" ||
        detail["name"] === "product_removed_from_cart"
      ) {
        lastBehaviorEvent.current = { detail, occurredAt: Date.now() };
        void fetchEligible();
      }
      if (detail["name"] === "product_viewed") {
        latestProduct.current = {
          path: location.pathname,
          data: compactStrings({
            id: detail["productId"],
            slug: detail["productSlug"],
            name: detail["productName"],
            categoryId: detail["categoryId"],
            categorySlug: detail["categorySlug"],
            categoryName: detail["categoryName"],
          }),
        };
        recordProductView(detail);
        void fetchEligible();
      }
      if (detail["name"] === "purchase_completed" && context) {
        const attribution = attributableCampaign();
        if (attribution && !history(attribution.campaignId).completed) {
          queueCampaignEvent({
            eventId: crypto.randomUUID(),
            campaignId: attribution.campaignId,
            variantId: attribution.variantId,
            type: "CONVERSION",
            sessionId: context.visitor.sessionId,
            visitorId: context.visitor.visitorId,
            locale: context.locale,
            device: context.device,
            page: context.page.path,
            occurredAt: new Date().toISOString(),
            metadata: {
              attribution: "last_campaign_cta",
              orderId: typeof detail["orderId"] === "string" ? detail["orderId"] : null,
            },
          });
          updateHistory(attribution.campaignId, {
            convertedAt: new Date().toISOString(),
            completed: true,
          });
          clearAttribution();
        }
      }
      const eventMatches = campaigns.filter(
        (campaign) => clientFrequencyAllows(campaign) && triggerMatchesEvent(campaign, detail),
      );
      if (eventMatches.length) offer(eventMatches);
    };
    const onCustom = (event: Event) => {
      const detail = (event as CustomEvent<Record<string, unknown>>).detail ?? {};
      lastBehaviorEvent.current = { detail, occurredAt: Date.now() };
      const matches = campaigns.filter(
        (campaign) => clientFrequencyAllows(campaign) && triggerMatchesEvent(campaign, detail),
      );
      if (matches.length) offer(matches);
    };
    const onPageContext = (event: Event) => {
      const detail = (event as CustomEvent<Record<string, unknown>>).detail ?? {};
      latestProduct.current = {
        path: location.pathname,
        data: compactStrings({
          id: detail["productId"],
          slug: detail["productSlug"],
          name: detail["productName"],
          categoryId: detail["categoryId"],
          categorySlug: detail["categorySlug"],
          categoryName: detail["categoryName"],
        }),
      };
      void fetchEligible();
    };
    window.addEventListener(CAMPAIGN_COMMERCE_EVENT, onCommerce);
    window.addEventListener(CAMPAIGN_CONTEXT_EVENT, onPageContext);
    window.addEventListener("bioreza:campaign", onCustom);
    return () => {
      window.removeEventListener(CAMPAIGN_COMMERCE_EVENT, onCommerce);
      window.removeEventListener(CAMPAIGN_CONTEXT_EVENT, onPageContext);
      window.removeEventListener("bioreza:campaign", onCustom);
    };
  }, [campaigns, context, fetchEligible, location.pathname, offer]);

  useEffect(() => {
    const activeTimers = timers.current;
    const activeCleanups = cleanupFns.current;
    activeTimers.forEach((timer) => window.clearTimeout(timer));
    activeTimers.clear();
    activeCleanups.splice(0).forEach((cleanup) => cleanup());
    if (!context || campaigns.length === 0) return;

    const immediate: PopupPublishedCampaign[] = [];
    for (const campaign of campaigns) {
      const eligibleKey = `${context.visitor.sessionId}:${campaign.id}:${campaign.version}:${context.page.path}`;
      if (!eligibleTracked.current.has(eligibleKey)) {
        eligibleTracked.current.add(eligibleKey);
        if (eligibleTracked.current.size > 500) {
          eligibleTracked.current = new Set([eligibleKey]);
        }
        track("ELIGIBLE", campaign, context);
      }
      const elapsed = Math.floor(
        (Date.now() - new Date(context.visitor.sessionStartedAt).getTime()) / 1_000,
      );
      if (triggerIsImmediate(campaign, context, elapsed)) {
        immediate.push(campaign);
        continue;
      }
      const recentEvent = lastBehaviorEvent.current;
      if (
        recentEvent &&
        Date.now() - recentEvent.occurredAt <= 5_000 &&
        triggerMatchesEvent(campaign, recentEvent.detail)
      ) {
        immediate.push(campaign);
        continue;
      }
      setupTrigger(campaign, context, () => offer([campaign]), activeTimers, activeCleanups);
    }
    if (immediate.length) offer(immediate);
    return () => {
      activeTimers.forEach((timer) => window.clearTimeout(timer));
      activeTimers.clear();
      activeCleanups.splice(0).forEach((cleanup) => cleanup());
    };
  }, [campaigns, context, offer]);

  useEffect(() => {
    const flush = () => void flushCampaignEvents();
    window.addEventListener("pagehide", flush);
    document.addEventListener("visibilitychange", flush);
    return () => {
      window.removeEventListener("pagehide", flush);
      document.removeEventListener("visibilitychange", flush);
      flush();
    };
  }, []);

  useEffect(
    () => () => {
      if (queueTimer.current !== null) window.clearTimeout(queueTimer.current);
    },
    [],
  );

  const dismiss = useCallback(
    (reason: "customer" | "action" | "completion" | "expired" = "customer") => {
      if (!active || !context) return;
      if (reason === "customer") {
        updateHistory(active.campaign.id, { dismissedAt: new Date().toISOString() });
        track("DISMISS", active.campaign, context);
      }
      const cooldown = active.campaign.collision.cooldownSeconds * 1_000;
      cooldownUntil.current = Date.now() + cooldown;
      setActive(null);
      if (queueTimer.current !== null) window.clearTimeout(queueTimer.current);
      queueTimer.current = window.setTimeout(() => {
        queueTimer.current = null;
        const items = queuedRef.current;
        const available = items.filter((item) => clientFrequencyAllows(item));
        const { winner, queue } = resolveCampaignQueue(available);
        setQueued(queue);
        if (winner) showCampaign(winner);
      }, cooldown);
    },
    [active, context, showCampaign],
  );

  const action = useCallback(
    async (kind: "primary" | "secondary") => {
      if (!active || !context) return false;
      const campaign = active.campaign;
      const config = kind === "primary" ? campaign.primaryAction : campaign.secondaryAction;
      const type = kind === "primary" ? "PRIMARY_CLICK" : "SECONDARY_CLICK";
      setActive((current) =>
        current?.campaign.id === campaign.id ? { ...current, lifecycle: "INTERACTED" } : current,
      );
      updateHistory(campaign.id, { interactedAt: new Date().toISOString() });
      track(type, campaign, context);
      let succeeded = true;
      if (config.type === "COPY_COUPON" && campaign.coupon) {
        succeeded = await copyCampaignText(campaign.coupon.code);
        if (succeeded) {
          recordAttribution(campaign);
          track("COUPON_COPY", campaign, context);
        }
      } else if (config.type === "APPLY_COUPON" && campaign.coupon) {
        const applied = await store.applyCoupon(campaign.coupon.code);
        succeeded = applied;
        if (applied) {
          recordAttribution(campaign);
          track("SUCCESS", campaign, context);
        }
      } else if (config.type === "NAVIGATE") {
        const destination = destinationUrl(campaign, config);
        if (destination) {
          recordAttribution(campaign);
          if (config.openInNewTab) window.open(destination, "_blank", "noopener,noreferrer");
          else window.location.assign(localized(destination, store.locale));
        } else succeeded = false;
      } else if (["COPY_COUPON", "APPLY_COUPON"].includes(config.type) && !campaign.coupon) {
        succeeded = false;
      }
      if (config.type === "CLOSE" || (succeeded && config.closeAfterAction)) dismiss("action");
      return succeeded;
    },
    [active, context, dismiss, store],
  );

  if (!active || !context) return null;
  return (
    <CampaignRenderer
      key={`${active.campaign.id}:${active.campaign.variantId}:${active.campaign.version}`}
      campaign={active.campaign}
      locale={store.locale}
      presentation={active.presentation}
      visitorId={context.visitor.visitorId}
      sessionId={context.visitor.sessionId}
      device={context.device}
      page={context.page.path}
      serverTimeOffsetMs={serverTimeOffsetMs}
      onDismiss={dismiss}
      onPrimary={() => action("primary")}
      onSecondary={() => action("secondary")}
      onCopyCoupon={() => {
        recordAttribution(active.campaign);
        track("COUPON_COPY", active.campaign, context);
      }}
      onConvert={() => {
        setActive((current) =>
          current?.campaign.id === active.campaign.id
            ? { ...current, lifecycle: "CONVERTED" }
            : current,
        );
        updateHistory(active.campaign.id, {
          convertedAt: new Date().toISOString(),
          completed: true,
        });
      }}
    />
  );
}

function setupTrigger(
  campaign: PopupPublishedCampaign,
  context: PopupStorefrontContext,
  show: () => void,
  timers: Map<string, number>,
  cleanups: Array<() => void>,
) {
  const trigger = campaign.trigger;
  if (trigger.type === "DELAY") {
    timers.set(campaign.id, window.setTimeout(show, trigger.delaySeconds * 1_000));
  } else if (trigger.type === "SESSION_DURATION") {
    const elapsed = Date.now() - new Date(context.visitor.sessionStartedAt).getTime();
    timers.set(
      campaign.id,
      window.setTimeout(show, Math.max(0, trigger.sessionDurationSeconds * 1_000 - elapsed)),
    );
  } else if (
    trigger.type === "INACTIVITY" ||
    (trigger.type === "EXIT_INTENT" &&
      context.device !== "desktop" &&
      trigger.mobileExitFallback === "INACTIVITY")
  ) {
    const seconds =
      trigger.type === "INACTIVITY" ? trigger.inactivitySeconds : trigger.mobileExitFallbackValue;
    let fired = false;
    let timer = 0;
    const cleanup = () => {
      window.clearTimeout(timer);
      ["pointerdown", "keydown", "scroll"].forEach((name) =>
        window.removeEventListener(name, reset),
      );
    };
    const finish = () => {
      if (fired) return;
      fired = true;
      cleanup();
      show();
    };
    function reset() {
      if (fired) return;
      window.clearTimeout(timer);
      timer = window.setTimeout(finish, seconds * 1_000);
    }
    timer = window.setTimeout(finish, seconds * 1_000);
    ["pointerdown", "keydown", "scroll"].forEach((name) =>
      window.addEventListener(name, reset, { passive: true }),
    );
    cleanups.push(cleanup);
  } else if (
    trigger.type === "SCROLL_DEPTH" ||
    (trigger.type === "EXIT_INTENT" &&
      context.device !== "desktop" &&
      trigger.mobileExitFallback === "SCROLL_DEPTH")
  ) {
    const target =
      trigger.type === "SCROLL_DEPTH" ? trigger.scrollPercent : trigger.mobileExitFallbackValue;
    let frame = 0;
    let fired = false;
    const cleanup = () => {
      window.removeEventListener("scroll", scroll);
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    };
    function scroll() {
      if (frame || fired) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        if (max > 0 && (window.scrollY / max) * 100 >= target) {
          fired = true;
          cleanup();
          show();
        }
      });
    }
    window.addEventListener("scroll", scroll, { passive: true });
    scroll();
    cleanups.push(cleanup);
  } else if (trigger.type === "EXIT_INTENT" && context.device === "desktop") {
    const enteredAt = Date.now();
    const exit = (event: MouseEvent) => {
      if (
        event.clientY <= 8 &&
        event.relatedTarget === null &&
        Date.now() - enteredAt > 4_000 &&
        document.hasFocus()
      ) {
        document.removeEventListener("mouseout", exit);
        show();
      }
    };
    document.addEventListener("mouseout", exit);
    cleanups.push(() => document.removeEventListener("mouseout", exit));
  }
}

function track(
  type: PopupAnalyticsEventType,
  campaign: PopupPublishedCampaign,
  context: PopupStorefrontContext,
) {
  queueCampaignEvent({
    eventId: crypto.randomUUID(),
    campaignId: campaign.id,
    variantId: campaign.variantId,
    type,
    sessionId: context.visitor.sessionId,
    visitorId: context.visitor.visitorId,
    locale: context.locale,
    device: context.device,
    page: context.page.path,
    occurredAt: new Date().toISOString(),
    metadata: {},
  });
}

function destinationUrl(
  campaign: PopupPublishedCampaign,
  action: PopupPublishedCampaign["primaryAction"],
) {
  if (action.destination === "URL") return action.url;
  if (action.destination === "PRODUCT") return `/product/${campaign.product?.slug ?? ""}`;
  if (action.destination === "CATEGORY") return `/categories/${campaign.category?.slug ?? ""}`;
  if (action.destination === "CART") return "/cart";
  if (action.destination === "ACCOUNT") return "/account";
  if (action.destination === "HOME") return "/";
  return null;
}

function localized(url: string, locale: "en" | "ar") {
  if (locale !== "ar" || !url.startsWith("/")) return url;
  const parsed = new URL(url, window.location.origin);
  parsed.searchParams.set("lang", "ar");
  return `${parsed.pathname}${parsed.search}${parsed.hash}`;
}

function dedupe(campaigns: PopupPublishedCampaign[]) {
  return campaigns.filter(
    (campaign, index) => campaigns.findIndex((item) => item.id === campaign.id) === index,
  );
}

function orderedQueue(campaigns: PopupPublishedCampaign[]) {
  return dedupe(campaigns).sort(
    (left, right) => right.priority - left.priority || left.id.localeCompare(right.id),
  );
}

function safeHost(value: string) {
  try {
    return new URL(value).hostname.slice(0, 255);
  } catch {
    return null;
  }
}

function compactStrings(values: Record<string, unknown>) {
  return Object.fromEntries(
    Object.entries(values).filter(
      (entry): entry is [string, string] => typeof entry[1] === "string",
    ),
  );
}

function presentationFor(campaign: PopupPublishedCampaign, device: PopupDevice) {
  return device === "mobile"
    ? campaign.presentation.mobile
    : device === "tablet"
      ? campaign.presentation.tablet
      : campaign.presentation.desktop;
}
