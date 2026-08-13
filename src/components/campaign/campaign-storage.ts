import type { PopupPublishedCampaign } from "@/lib/campaign-api";

const VISITOR_KEY = "bioreza.campaign.visitor";
const SESSION_KEY = "bioreza.campaign.session";
const VISIT_KEY = "bioreza.campaign.visit";
const HISTORY_KEY = "bioreza.campaign.history.v1";
const PRODUCT_VIEWS_KEY = "bioreza.campaign.product-views.v1";
const ATTRIBUTION_KEY = "bioreza.campaign.attribution.v1";

export type CampaignHistory = {
  impressions: number;
  lastShownAt: string | null;
  dismissedAt: string | null;
  interactedAt: string | null;
  convertedAt: string | null;
  completed: boolean;
};

export type CampaignVisit = {
  visitorId: string;
  sessionId: string;
  firstVisit: boolean;
  returning: boolean;
  pageViews: number;
  sessionStartedAt: string;
};

export type CampaignAttribution = {
  campaignId: string;
  variantId: string;
  interactedAt: string;
};

export function visitState(path: string): CampaignVisit {
  const visitorId = uuid(localStorage, VISITOR_KEY);
  const existingSession = sessionStorage.getItem(SESSION_KEY);
  const sessionId = existingSession || crypto.randomUUID();
  if (!existingSession) sessionStorage.setItem(SESSION_KEY, sessionId);
  const persistedVisit = localStorage.getItem(VISIT_KEY);
  const firstVisitKey = "bioreza.campaign.first-visit";
  const returningKey = "bioreza.campaign.returning-session";
  if (!existingSession) {
    sessionStorage.setItem(firstVisitKey, persistedVisit ? "0" : "1");
    sessionStorage.setItem(returningKey, persistedVisit ? "1" : "0");
  }
  const firstVisit = sessionStorage.getItem(firstVisitKey) === "1";
  const returning = sessionStorage.getItem(returningKey) === "1";
  localStorage.setItem(VISIT_KEY, new Date().toISOString());
  const seenKey = `bioreza.campaign.page:${path}`;
  const pageViews =
    Number(sessionStorage.getItem("bioreza.campaign.page-count") ?? 0) +
    (sessionStorage.getItem(seenKey) ? 0 : 1);
  sessionStorage.setItem(seenKey, "1");
  sessionStorage.setItem("bioreza.campaign.page-count", String(pageViews));
  const started = sessionStorage.getItem("bioreza.campaign.started") ?? new Date().toISOString();
  sessionStorage.setItem("bioreza.campaign.started", started);
  return { visitorId, sessionId, firstVisit, returning, pageViews, sessionStartedAt: started };
}

export function productViews() {
  return readJson<
    Array<{
      productId: string | null;
      productSlug: string | null;
      categoryId: string | null;
      categorySlug: string | null;
      count: number;
    }>
  >(sessionStorage, PRODUCT_VIEWS_KEY, []);
}

export function recordProductView(detail: Record<string, unknown>) {
  const entries = productViews();
  const productId = stringOrNull(detail["productId"]);
  const productSlug = stringOrNull(detail["productSlug"]);
  const categoryId = stringOrNull(detail["categoryId"]);
  const categorySlug = stringOrNull(detail["categorySlug"]);
  const dedupeKey = `bioreza.campaign.product-seen:${productId ?? productSlug ?? "unknown"}`;
  if (sessionStorage.getItem(dedupeKey)) return;
  sessionStorage.setItem(dedupeKey, "1");
  const existing = entries.find(
    (item) =>
      (productId && item.productId === productId) ||
      (productSlug && item.productSlug === productSlug),
  );
  if (existing) existing.count += 1;
  else entries.push({ productId, productSlug, categoryId, categorySlug, count: 1 });
  sessionStorage.setItem(PRODUCT_VIEWS_KEY, JSON.stringify(entries.slice(-100)));
}

export function history(campaignId: string): CampaignHistory {
  return (
    readJson<Record<string, CampaignHistory>>(localStorage, HISTORY_KEY, {})[campaignId] ?? {
      impressions: 0,
      lastShownAt: null,
      dismissedAt: null,
      interactedAt: null,
      convertedAt: null,
      completed: false,
    }
  );
}

export function updateHistory(campaignId: string, patch: Partial<CampaignHistory>) {
  const all = readJson<Record<string, CampaignHistory>>(localStorage, HISTORY_KEY, {});
  all[campaignId] = { ...history(campaignId), ...patch };
  localStorage.setItem(HISTORY_KEY, JSON.stringify(all));
}

export function markSessionShown(campaignId: string) {
  sessionStorage.setItem(`bioreza.campaign.shown:${campaignId}`, "1");
}

export function recordAttribution(campaign: PopupPublishedCampaign) {
  const value: CampaignAttribution = {
    campaignId: campaign.id,
    variantId: campaign.variantId,
    interactedAt: new Date().toISOString(),
  };
  localStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(value));
}

export function attributableCampaign(now = new Date(), windowDays = 7) {
  const value = readJson<CampaignAttribution | null>(localStorage, ATTRIBUTION_KEY, null);
  if (!value || !value.campaignId || !value.variantId) return null;
  const age = now.getTime() - new Date(value.interactedAt).getTime();
  if (!Number.isFinite(age) || age < 0 || age > windowDays * 86_400_000) {
    localStorage.removeItem(ATTRIBUTION_KEY);
    return null;
  }
  return value;
}

export function clearAttribution() {
  localStorage.removeItem(ATTRIBUTION_KEY);
}

export function clientFrequencyAllows(campaign: PopupPublishedCampaign, now = new Date()) {
  const item = history(campaign.id);
  const frequency = campaign.frequency;
  if (item.completed || item.convertedAt) return false;
  if (sessionStorage.getItem(`bioreza.campaign.shown:${campaign.id}`)) {
    if (frequency.mode === "ONCE_PER_SESSION") return false;
    if (["DEFAULT", "SESSION"].includes(frequency.afterDismiss) && item.dismissedAt) return false;
    if (["DEFAULT", "SESSION"].includes(frequency.afterPrimaryAction) && item.interactedAt)
      return false;
  }
  if (item.dismissedAt) {
    if (frequency.afterDismiss === "NEVER") return false;
    const hours =
      frequency.afterDismiss === "HOURS"
        ? frequency.afterDismissInterval
        : frequency.afterDismiss === "DAYS"
          ? frequency.afterDismissInterval * 24
          : 0;
    if (hours && !elapsed(item.dismissedAt, now, hours)) return false;
  }
  if (item.interactedAt && frequency.afterPrimaryAction === "NEVER") return false;
  if (frequency.mode === "ONCE_EVER") return item.impressions === 0;
  if (frequency.mode === "MAX_IMPRESSIONS") return item.impressions < frequency.maxImpressions;
  if (frequency.mode === "UNTIL_INTERACTION") return !item.interactedAt;
  if (frequency.mode === "UNTIL_CONVERSION") return !item.convertedAt;
  if (frequency.mode === "ONCE_PER_DAY") return elapsed(item.lastShownAt, now, 24);
  if (frequency.mode === "EVERY_X_HOURS") return elapsed(item.lastShownAt, now, frequency.interval);
  if (frequency.mode === "EVERY_X_DAYS")
    return elapsed(item.lastShownAt, now, frequency.interval * 24);
  return true;
}

function elapsed(value: string | null, now: Date, hours: number) {
  return !value || now.getTime() - new Date(value).getTime() >= hours * 3_600_000;
}

function uuid(storage: Storage, key: string) {
  const existing = storage.getItem(key);
  if (existing) return existing;
  const next = crypto.randomUUID();
  storage.setItem(key, next);
  return next;
}

function readJson<T>(storage: Storage, key: string, fallback: T): T {
  try {
    const raw = storage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function stringOrNull(value: unknown) {
  return typeof value === "string" && value ? value : null;
}
