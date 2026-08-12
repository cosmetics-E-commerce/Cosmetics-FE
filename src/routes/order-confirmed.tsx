import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { CheckoutStepper } from "@/components/checkout/CheckoutStepper";
import { Button } from "@/components/ui/button";
import { readCheckoutSuccess, type CheckoutSuccessSnapshot } from "@/lib/checkout-flow";
import { paymentMethodName, type PaymentMethod } from "@/lib/checkout-presentation";
import { formatPrice } from "@/lib/products";
import { getOrderStatusCopy } from "@/lib/i18n";
import { useStore } from "@/lib/store";

type Search = { order?: string; status?: string; payment?: string };

export const Route = createFileRoute("/order-confirmed")({
  validateSearch: (raw: Record<string, unknown>): Search => ({
    ...(typeof raw["order"] === "string" ? { order: raw["order"] } : {}),
    ...(typeof raw["status"] === "string" ? { status: raw["status"] } : {}),
    ...(typeof raw["payment"] === "string" ? { payment: raw["payment"] } : {}),
  }),
  head: () => ({ meta: [{ title: "Order received — BIOREZA" }] }),
  component: Confirmed,
});

function Confirmed() {
  const search = Route.useSearch();
  const { locale } = useStore();
  const [snapshot, setSnapshot] = useState<CheckoutSuccessSnapshot | null>(null);
  const underReview = search.status === "PAYMENT_REVIEW";
  const statusCopy = getOrderStatusCopy(search.status ?? "CONFIRMED", locale);
  const ar = locale === "ar";

  useEffect(() => {
    setSnapshot(readCheckoutSuccess(search.order));
  }, [search.order]);

  return (
    <div className="order-success">
      <header className="order-success__topline">
        <p>{ar ? "تم استلام طلبك" : "Order received"}</p>
        <span>{search.order ?? (ar ? "تم التسجيل" : "Recorded")}</span>
      </header>

      <CheckoutStepper current="confirmation" furthest="confirmation" locale={locale} />

      <section className="order-success__hero" aria-labelledby="confirmation-title">
        <span className="order-success__mark" aria-hidden="true">
          <Check />
        </span>
        <p>
          {underReview
            ? ar
              ? "تم استلام إثبات الدفع"
              : "Proof received"
            : ar
              ? "تم تأكيد الطلب"
              : "Order confirmed"}
        </p>
        <h1 id="confirmation-title">
          {underReview
            ? ar
              ? "سنراجع التحويل الآن."
              : "We'll review the transfer now."
            : ar
              ? "شكراً لاختيارك بيوريزا."
              : "Thank you for choosing BIOREZA."}
        </h1>
        <div>
          {underReview
            ? ar
              ? "تم حفظ طلبك وإثبات التحويل بأمان. يمكنك متابعة آخر حالة من حسابك."
              : "Your order and transfer proof are safely recorded. Follow the latest status from your account."
            : ar
              ? "سيبدأ الفريق في تجهيز طلبك للتوصيل. ستجدين آخر حالة دائماً في حسابك."
              : "The team will begin preparing your order for delivery. Its latest status is always available in your account."}
        </div>
      </section>

      <section
        className="order-success__details"
        aria-label={ar ? "تفاصيل الطلب" : "Order details"}
      >
        <article>
          <p>{ar ? "الحالة" : "Status"}</p>
          <strong>{statusCopy.label}</strong>
          <small>{statusCopy.description}</small>
        </article>
        <article>
          <p>{ar ? "الدفع" : "Payment"}</p>
          <strong>{displayPayment(snapshot?.paymentMethod ?? search.payment, locale)}</strong>
          {snapshot && <small>{formatPrice(snapshot.amount)}</small>}
        </article>
        <article>
          <p>{ar ? "التوصيل" : "Delivery"}</p>
          <strong>{snapshot?.recipient ?? (ar ? "العنوان المحفوظ" : "Saved destination")}</strong>
          <small>
            {snapshot?.destination ??
              (ar ? "راجعي الطلب في حسابك" : "Review the order in your account")}
          </small>
        </article>
        <article>
          <p>{ar ? "الموعد المتوقع" : "Estimated arrival"}</p>
          <strong>
            {snapshot?.deliveryEstimate ?? (ar ? "يُحدّث عند الشحن" : "Updated at dispatch")}
          </strong>
          <small>
            {ar
              ? "قد تتأثر العطلات ومواعيد المندوب."
              : "Courier timing and holidays may affect arrival."}
          </small>
        </article>
      </section>

      <div className="order-success__actions">
        <Button asChild variant="solid" size="pill">
          <Link to="/account" search={{ section: "orders" }}>
            {ar ? "متابعة الطلب" : "Track this order"}
          </Link>
        </Button>
        <Button asChild variant="quiet" size="pill">
          <Link to="/shop">{ar ? "متابعة التسوق" : "Continue shopping"}</Link>
        </Button>
      </div>
    </div>
  );
}

function displayPayment(method: string | undefined, locale: "en" | "ar") {
  if (method === "CASH_ON_DELIVERY" || method === "INSTAPAY" || method === "VODAFONE_CASH") {
    return paymentMethodName(method as PaymentMethod, locale);
  }
  if (!method) return locale === "ar" ? "تم التسجيل" : "Recorded";
  return method
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/^./, (letter) => letter.toUpperCase());
}
