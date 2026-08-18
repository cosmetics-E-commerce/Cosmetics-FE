import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/Primitives";
import { getOrderStatusCopy } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import { createNoindexHead } from "@/lib/seo";
type Search = { order?: string; status?: string; payment?: string };
export const Route = createFileRoute("/order-confirmed")({
  validateSearch: (raw: Record<string, unknown>): Search => ({
    ...(typeof raw["order"] === "string" ? { order: raw["order"] } : {}),
    ...(typeof raw["status"] === "string" ? { status: raw["status"] } : {}),
    ...(typeof raw["payment"] === "string" ? { payment: raw["payment"] } : {}),
  }),
  head: ({ match }) =>
    createNoindexHead(
      match.search.lang === "ar" ? "تم استلام الطلب" : "Order Received",
      "/order-confirmed",
      match.search.lang === "ar" ? "ar" : "en",
    ),
  component: Confirmed,
});
function Confirmed() {
  const search = Route.useSearch();
  const { locale } = useStore();
  const underReview = search.status === "PAYMENT_REVIEW";
  const statusCopy = getOrderStatusCopy(search.status ?? "CONFIRMED", locale);
  return (
    <Reveal
      stagger
      staggerMs={45}
      distance={20}
      className="sf-order-confirmation mx-auto max-w-2xl px-5 py-28 text-center md:px-10"
    >
      <span className="mx-auto grid size-16 place-items-center rounded-full border border-gold text-gold">
        <Check className="size-6" />
      </span>
      <p className="label-xs mt-10 text-gold">Order {search.order ?? "received"}</p>
      <h1 className="display mt-6 text-[clamp(2.2rem,4.4vw,3.4rem)]">
        {underReview ? "Proof received." : "Thank you."}
      </h1>
      <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
        {underReview
          ? "Your transfer is awaiting human verification. You can follow its status from your account."
          : "Your order is confirmed. The team will prepare it for delivery using the current order status shown in your account."}
      </p>
      <div className="rule-gold my-10" />
      <dl className="grid gap-6 text-start sm:grid-cols-3">
        <div>
          <dt className="label-xs text-taupe">Payment</dt>
          <dd className="mt-2 text-sm">{search.payment?.replaceAll("_", " ") ?? "Recorded"}</dd>
        </div>
        <div>
          <dt className="label-xs text-taupe">Status</dt>
          <dd className="mt-2 text-sm">{statusCopy.label}</dd>
          <dd className="mt-1 text-xs text-muted-foreground">{statusCopy.description}</dd>
        </div>
        <div>
          <dt className="label-xs text-taupe">Support</dt>
          <dd className="mt-2 text-sm">Order number required</dd>
        </div>
      </dl>
      <div className="mt-14 flex flex-wrap justify-center gap-4">
        <Button asChild variant="solid" size="pill">
          <Link to="/account" search={{ section: "orders" }}>
            Track Order
          </Link>
        </Button>
        <Button asChild variant="quiet" size="pill">
          <Link to="/account" search={{ section: "orders" }}>
            View my order
          </Link>
        </Button>
      </div>
    </Reveal>
  );
}
