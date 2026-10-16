import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { ChevronRight, Package, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OrderAgainButton } from "@/components/orders/OrderAgainButton";
import {
  apiErrorMessage,
  lookupGuestOrder,
  rememberedGuestOrders,
  type RememberedGuestOrder,
} from "@/lib/api";
import { getOrderStatusCopy } from "@/lib/i18n";
import { formatPrice } from "@/lib/products";
import { createNoindexHead } from "@/lib/seo";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/track-order")({
  head: ({ match }) =>
    createNoindexHead(
      match.search.lang === "ar" ? "تتبع طلبك" : "Track your order",
      "/track-order",
      match.search.lang === "ar" ? "ar" : "en",
    ),
  component: TrackOrderPage,
});

function TrackOrderPage() {
  const { locale, user } = useStore();
  const ar = locale === "ar";
  const [orderNumber, setOrderNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [recent, setRecent] = useState<RememberedGuestOrder[]>([]);
  useEffect(() => setRecent(rememberedGuestOrders()), []);
  const lookup = useMutation({
    mutationFn: () => lookupGuestOrder(orderNumber.trim(), phone.trim()),
  });
  const result = lookup.data;
  const dateFormat = new Intl.DateTimeFormat(ar ? "ar-EG" : "en-EG", {
    dateStyle: "medium",
    timeZone: "Africa/Cairo",
  });
  const field =
    "mt-2 h-12 w-full border border-input bg-warm-white px-4 text-sm normal-case tracking-normal";

  return (
    <div className="mx-auto max-w-2xl px-5 py-16 md:px-10 md:py-20">
      <p className="label-xs text-gold">{ar ? "طلباتك" : "Your orders"}</p>
      <h1 className="display mt-3 text-[clamp(2rem,4vw,3rem)]">
        {ar ? "تتبع طلبك" : "Track your order"}
      </h1>
      {user && (
        <p className="mt-3 text-sm text-muted-foreground">
          {ar ? "كل طلباتك في " : "All your orders are in "}
          <Link to="/account" search={{ section: "orders" }} className="underline">
            {ar ? "حسابك" : "your account"}
          </Link>
          .
        </p>
      )}

      {recent.length > 0 && (
        <section className="mt-10">
          <h2 className="label-xs text-taupe">
            {ar ? "طلبات على هذا الجهاز" : "Orders on this device"}
          </h2>
          <ul className="mt-3 divide-y divide-border rounded-2xl border border-border">
            {recent.map((order) => (
              <li key={order.token}>
                <Link
                  to="/order/$token"
                  params={{ token: order.token }}
                  className="flex items-center gap-4 p-4 hover:bg-muted/40"
                >
                  <Package className="size-5 text-gold" aria-hidden="true" />
                  <span className="min-w-0 flex-1">
                    <strong className="block">{order.orderNumber}</strong>
                    <small className="text-muted-foreground">
                      {dateFormat.format(new Date(order.placedAt))} ·{" "}
                      {formatPrice(order.total / 100)}
                    </small>
                  </span>
                  <ChevronRight className="size-4 rtl:rotate-180" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <form
        className="mt-10 grid gap-4 rounded-2xl border border-border p-5 sm:grid-cols-2"
        onSubmit={(event) => {
          event.preventDefault();
          if (!lookup.isPending) lookup.mutate();
        }}
      >
        <h2 className="text-lg font-semibold sm:col-span-2">
          {ar ? "ابحثي برقم الطلب" : "Find an order"}
        </h2>
        <label className="label-xs text-taupe">
          {ar ? "رقم الطلب" : "Order number"}
          <input
            required
            value={orderNumber}
            placeholder="ORD-20261014-123456"
            autoComplete="off"
            onChange={(event) => setOrderNumber(event.target.value)}
            className={field}
          />
        </label>
        <label className="label-xs text-taupe">
          {ar ? "رقم الهاتف المستخدم في الطلب" : "Phone used for the order"}
          <input
            required
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            className={field}
          />
        </label>
        {lookup.error && (
          <p role="alert" className="text-sm text-destructive sm:col-span-2">
            {apiErrorMessage(lookup.error, locale)}
          </p>
        )}
        <div className="sm:col-span-2">
          <Button type="submit" variant="solid" size="pill" loading={lookup.isPending}>
            <Search aria-hidden="true" />
            {ar ? "بحث" : "Find order"}
          </Button>
        </div>
      </form>

      {result && (
        <section className="mt-8 rounded-2xl border border-border p-5" aria-live="polite">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="label-xs text-taupe">{result.orderNumber}</p>
              <p className="mt-2 text-lg font-semibold">
                {getOrderStatusCopy(result.status, locale).label}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {dateFormat.format(new Date(result.placedAt))} · {formatPrice(result.total / 100)}
              </p>
            </div>
            <OrderAgainButton items={result.items} locale={locale} variant="solid" />
          </div>
          <ul className="mt-5 grid gap-3">
            {result.items.map((item) => (
              <li key={item.variantId} className="flex items-center gap-3">
                <span className="grid size-14 shrink-0 place-items-center overflow-hidden rounded-xl bg-muted">
                  {item.imageReference ? (
                    <img src={item.imageReference} alt="" className="size-full object-cover" />
                  ) : (
                    <Package className="size-5 text-taupe" aria-hidden="true" />
                  )}
                </span>
                <span className="min-w-0 flex-1">
                  <strong className="block truncate text-sm">{item.productName}</strong>
                  <small className="text-muted-foreground">
                    {item.variantName ? `${item.variantName} · ` : ""}× {item.quantity}
                  </small>
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-xs text-muted-foreground">
            {ar
              ? "للاطلاع على العنوان والتتبع الكامل، افتحي الرابط الخاص المرسل إلى بريدك."
              : "For the address and full tracking, open the private link we emailed you."}
          </p>
        </section>
      )}
    </div>
  );
}
