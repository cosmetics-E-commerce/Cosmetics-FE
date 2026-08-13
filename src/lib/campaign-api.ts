import type {
  PopupAnalyticsEventType,
  PopupPublishedCampaign,
  PopupStorefrontContext,
  PopupStorefrontResponse,
} from "../../vendor/cosmetics-contracts/index.js";

import { rawRequest } from "./api";

export type {
  PopupAnalyticsEventType,
  PopupPublishedCampaign,
  PopupStorefrontContext,
  PopupStorefrontResponse,
};

export type PopupDevice = "desktop" | "tablet" | "mobile";

export function getEligibleCampaigns(context: PopupStorefrontContext) {
  return rawRequest<PopupStorefrontResponse>("/campaigns/eligible", {
    method: "POST",
    body: context,
  });
}

export type PopupAnalyticsEvent = {
  eventId: string;
  campaignId: string;
  variantId: string | null;
  type: PopupAnalyticsEventType;
  sessionId: string;
  visitorId: string;
  locale: "en" | "ar";
  device: PopupDevice;
  page: string;
  occurredAt: string;
  metadata: Record<string, string | number | boolean | null>;
};

export function sendCampaignEvents(events: PopupAnalyticsEvent[]) {
  return rawRequest<{ accepted: number; duplicates: number; rejected: number }>(
    "/campaigns/events",
    { method: "POST", retry: false, keepalive: true, body: { events } },
  );
}

export function submitCampaignForm(
  campaignId: string,
  body: {
    variantId: string;
    sessionId: string;
    visitorId: string;
    locale: "en" | "ar";
    device: PopupDevice;
    page: string;
    name: string | null;
    email: string;
    phone: string | null;
    consent: boolean;
    company?: string;
  },
) {
  return rawRequest<{ success: boolean; duplicate: boolean }>(
    `/campaigns/${encodeURIComponent(campaignId)}/forms`,
    { method: "POST", body },
  );
}
