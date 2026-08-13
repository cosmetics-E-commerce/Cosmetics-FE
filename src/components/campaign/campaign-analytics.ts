import { sendCampaignEvents, type PopupAnalyticsEvent } from "@/lib/campaign-api";

const queue: PopupAnalyticsEvent[] = [];
const retried = new Set<string>();
let timer: number | null = null;

export function queueCampaignEvent(event: PopupAnalyticsEvent) {
  if (typeof window === "undefined" || navigator.doNotTrack === "1") return;
  queue.push(event);
  if (queue.length >= 10) void flushCampaignEvents();
  else if (timer === null) timer = window.setTimeout(flushCampaignEvents, 2_000);
}

export async function flushCampaignEvents() {
  if (timer !== null) window.clearTimeout(timer);
  timer = null;
  const batch = queue.splice(0, 25);
  if (!batch.length) return;
  try {
    await sendCampaignEvents(batch);
    batch.forEach((event) => retried.delete(event.eventId));
  } catch {
    // Campaign telemetry must never interfere with shopping. Keep only a small
    // one-shot retry buffer so an offline or rejected batch cannot loop forever.
    const retryable = batch.filter((event) => {
      if (retried.has(event.eventId)) {
        retried.delete(event.eventId);
        return false;
      }
      retried.add(event.eventId);
      return true;
    });
    queue.unshift(...retryable.slice(-10));
  }
  if (queue.length) timer = window.setTimeout(flushCampaignEvents, 4_000);
}
