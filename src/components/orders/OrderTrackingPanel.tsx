import type { CSSProperties } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CalendarDays,
  ExternalLink,
  Home,
  Package,
  PackageCheck,
  RefreshCw,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { apiErrorMessage, type OrderTracking } from "@/lib/api";

/** Shipment timeline for one order; the caller decides how tracking is fetched. */
export function OrderTrackingPanel({
  queryKey,
  load,
  refresh: refreshTracking,
  onRefreshed,
  locale,
  compact = false,
}: {
  queryKey: readonly unknown[];
  load: () => Promise<OrderTracking>;
  refresh: () => Promise<OrderTracking>;
  onRefreshed?: () => void;
  locale: "ar" | "en";
  compact?: boolean;
}) {
  const queryClient = useQueryClient();
  const tracking = useQuery({
    queryKey,
    queryFn: load,
    refetchInterval: 15_000,
    refetchOnWindowFocus: true,
  });
  const refresh = useMutation({
    mutationFn: refreshTracking,
    onSuccess: (data) => {
      queryClient.setQueryData(queryKey, data);
      onRefreshed?.();
    },
  });

  if (tracking.isLoading) {
    return (
      <div
        className="account-tracking account-tracking--loading"
        data-compact={compact || undefined}
      >
        {locale === "ar" ? "جارٍ تحميل التتبع…" : "Loading tracking…"}
      </div>
    );
  }

  if (tracking.isError) {
    return (
      <div className="account-tracking account-tracking--error" data-compact={compact || undefined}>
        {apiErrorMessage(tracking.error, locale)}
      </div>
    );
  }

  const data = tracking.data;
  if (!data) return null;
  const steps = trackingSteps(data, locale);
  const activeIndex = Math.max(
    0,
    steps.findIndex((step) => step.state === "active"),
  );
  const carrier = data.shipment?.provider ?? "BOSTA";

  return (
    <div className="account-tracking" data-compact={compact || undefined}>
      <div className="account-tracking__header">
        <div>
          <p>{locale === "ar" ? "تتبع الشحنة" : "Order tracking"}</p>
          <strong>
            {data.shipment ? data.shipment.status.replace(/_/g, " ") : "Preparing after payment"}
          </strong>
          <small>{trackingAddress(data)}</small>
        </div>
        <Button
          type="button"
          variant="quiet"
          size="pill"
          loading={refresh.isPending}
          onClick={() => refresh.mutate()}
        >
          <RefreshCw className="size-4" />
          {locale === "ar" ? "تحديث" : "Refresh"}
        </Button>
      </div>

      <div className="account-tracking__carrier">
        <span>{carrier}</span>
        <strong>
          {data.shipment?.trackingNumber ??
            (locale === "ar" ? "لم يتم الحجز بعد" : "Not booked yet")}
        </strong>
      </div>

      <ol
        className="account-tracking__timeline"
        style={
          {
            "--tracking-progress": `${(activeIndex / Math.max(steps.length - 1, 1)) * 100}%`,
          } as CSSProperties
        }
      >
        {steps.map((step) => (
          <li key={step.id} data-state={step.state}>
            <span className="account-tracking__step-icon">{step.icon}</span>
            <strong>{step.label}</strong>
            <small>{step.detail}</small>
          </li>
        ))}
      </ol>

      {data.shipment ? (
        <div className="account-tracking__details">
          <div>
            <small>{locale === "ar" ? "شركة الشحن" : "Carrier"}</small>
            <strong>{data.shipment.provider}</strong>
          </div>
          <div>
            <small>{locale === "ar" ? "رقم التتبع" : "Tracking number"}</small>
            <strong>{data.shipment.trackingNumber}</strong>
          </div>
          <a href={data.shipment.trackingUrl} target="_blank" rel="noreferrer">
            {locale === "ar" ? "فتح موقع شركة الشحن" : "Open carrier tracking"}
            <ExternalLink aria-hidden="true" />
          </a>
        </div>
      ) : (
        <p className="account-tracking__empty">
          {locale === "ar"
            ? "سيظهر التتبع بعد اعتماد الدفع وحجز الشحنة."
            : "Tracking appears after payment approval and shipment booking."}
        </p>
      )}
      {data.history.length > 0 && (
        <ol className="account-tracking__history">
          {data.history.slice(0, 4).map((entry) => (
            <li key={`${entry.action}-${entry.createdAt}`}>
              <p>{entry.description}</p>
              <small>
                {new Intl.DateTimeFormat(locale === "ar" ? "ar-EG" : "en-EG", {
                  dateStyle: "medium",
                  timeStyle: "short",
                  timeZone: "Africa/Cairo",
                }).format(new Date(entry.createdAt))}
              </small>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

function trackingSteps(data: OrderTracking, locale: "ar" | "en") {
  const ar = locale === "ar";
  const status = `${data.shipment?.status ?? data.orderStatus ?? ""}`.toUpperCase();
  const isDelivered = status.includes("DELIVER");
  const isOut = status.includes("OUT") || status.includes("DELIVERY");
  const isBooked = Boolean(data.shipment);
  const isTransit =
    isBooked &&
    !isDelivered &&
    (status.includes("TRANSIT") ||
      status.includes("PICK") ||
      status.includes("SENT") ||
      status.includes("BOOK") ||
      status.includes("CREATED"));
  const active = isDelivered ? 4 : isOut ? 3 : isTransit ? 2 : isBooked ? 1 : 0;
  const placedDate =
    data.history[0]?.createdAt || data.shipment?.createdAt || data.estimatedDeliveryDate || null;

  return [
    {
      id: "placed",
      label: ar ? "تم الطلب" : "Order placed",
      detail: placedDate ? formatTrackingDate(placedDate, locale) : "-",
      icon: <Package aria-hidden="true" />,
    },
    {
      id: "booked",
      label: ar ? "حجز Bosta" : "Bosta booked",
      detail: isBooked ? (data.shipment?.provider ?? "BOSTA") : "-",
      icon: <PackageCheck aria-hidden="true" />,
    },
    {
      id: "transit",
      label: ar ? "في الطريق" : "In transit",
      detail: isTransit || isOut || isDelivered ? (data.shipment?.status ?? "-") : "-",
      icon: <Truck aria-hidden="true" />,
    },
    {
      id: "out",
      label: ar ? "خارج للتوصيل" : "Out for delivery",
      detail:
        isOut || isDelivered
          ? data.shipment?.estimatedDelivery
            ? formatTrackingDate(data.shipment.estimatedDelivery, locale)
            : (data.shipment?.status ?? "-")
          : "-",
      icon: <CalendarDays aria-hidden="true" />,
    },
    {
      id: "delivered",
      label: ar ? "تم التسليم" : "Delivered",
      detail: isDelivered
        ? data.shipment?.updatedAt
          ? formatTrackingDate(data.shipment.updatedAt, locale)
          : (data.shipment?.status ?? "-")
        : "-",
      icon: <Home aria-hidden="true" />,
    },
  ].map((step, index) => ({
    ...step,
    state: index < active ? "complete" : index === active ? "active" : "idle",
  }));
}

function formatTrackingDate(value: string, locale: "ar" | "en") {
  return new Intl.DateTimeFormat(locale === "ar" ? "ar-EG" : "en-EG", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Africa/Cairo",
  }).format(new Date(value));
}

function trackingAddress(data: OrderTracking) {
  return [data.shippingAddress.area, data.shippingAddress.city, data.shippingAddress.governorate]
    .filter(Boolean)
    .join(", ");
}
