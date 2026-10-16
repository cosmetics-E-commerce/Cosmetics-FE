import { useEffect, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Check, Clipboard, LoaderCircle, Upload, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OrderContents } from "@/components/account/OrderContents";
import { OrderAgainButton } from "@/components/orders/OrderAgainButton";
import { OrderTrackingPanel } from "@/components/orders/OrderTrackingPanel";
import {
  apiErrorMessage,
  getGuestOrder,
  getGuestOrderTracking,
  refreshGuestOrderTracking,
  rememberGuestOrder,
  uploadGuestPaymentProof,
  type GuestOrder,
} from "@/lib/api";
import { getOrderStatusCopy } from "@/lib/i18n";
import { formatPrice } from "@/lib/products";
import { createNoindexHead } from "@/lib/seo";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/order/$token")({
  head: ({ match }) =>
    createNoindexHead(
      match.search.lang === "ar" ? "طلبك" : "Your order",
      "/order",
      match.search.lang === "ar" ? "ar" : "en",
    ),
  component: GuestOrderPage,
});

const MANUAL_METHODS = ["INSTAPAY", "VODAFONE_CASH"];
const AWAITING_PROOF = ["PENDING_PAYMENT", "AWAITING_PAYMENT", "PAYMENT_FAILED"];

/** Private order page reached from the confirmation screen or the receipt email. */
function GuestOrderPage() {
  const { token } = Route.useParams();
  const { locale, user } = useStore();
  const ar = locale === "ar";
  const order = useQuery({
    queryKey: ["guest-order", token],
    queryFn: () => getGuestOrder(token),
    retry: false,
  });

  // Opening the link on any device keeps the order in "recent orders" there.
  useEffect(() => {
    if (!order.data) return;
    rememberGuestOrder({
      token,
      orderNumber: order.data.orderNumber,
      placedAt: order.data.createdAt,
      total: order.data.total,
    });
  }, [order.data, token]);

  if (order.isLoading) {
    return (
      <div className="grid min-h-[60vh] place-items-center">
        <LoaderCircle className="animate-spin text-gold" />
      </div>
    );
  }
  if (order.isError || !order.data) {
    return (
      <div className="mx-auto max-w-xl px-5 py-28 text-center">
        <h1 className="font-serif text-4xl">
          {ar ? "تعذر فتح هذا الطلب" : "We couldn't open this order"}
        </h1>
        <p className="mt-5 text-muted-foreground">
          {order.error
            ? apiErrorMessage(order.error, locale)
            : ar
              ? "تحققي من الرابط وحاولي مرة أخرى."
              : "Check the link and try again."}
        </p>
        <Button asChild variant="solid" size="pill" className="mt-8">
          <Link to="/track-order">{ar ? "ابحثي برقم الطلب" : "Find it by order number"}</Link>
        </Button>
      </div>
    );
  }

  const data = order.data;
  const status = getOrderStatusCopy(data.status, locale);
  const needsProof =
    MANUAL_METHODS.includes(data.paymentMethod) && AWAITING_PROOF.includes(data.status);

  return (
    <div className="mx-auto max-w-3xl px-5 py-16 md:px-10 md:py-20">
      <p className="label-xs text-gold">{ar ? "طلبك" : "Your order"}</p>
      <h1 className="display mt-3 text-[clamp(2rem,4vw,3rem)]">{data.orderNumber}</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {new Intl.DateTimeFormat(ar ? "ar-EG" : "en-EG", {
          dateStyle: "long",
          timeZone: "Africa/Cairo",
        }).format(new Date(data.createdAt))}{" "}
        · {formatPrice(data.total / 100)}
      </p>

      <section className="mt-8 rounded-2xl border border-border p-5">
        <p className="label-xs text-taupe">{ar ? "الحالة" : "Status"}</p>
        <p className="mt-2 text-lg font-semibold">{status.label}</p>
        <p className="mt-1 text-sm text-muted-foreground">{status.description}</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <OrderAgainButton items={data.items} locale={locale} variant="solid" />
          <CopyLinkButton locale={locale} />
        </div>
      </section>

      {needsProof && <GuestProofForm token={token} order={data} locale={locale} />}

      <section className="mt-8">
        <OrderTrackingPanel
          queryKey={["guest-order", token, "tracking"]}
          load={() => getGuestOrderTracking(token)}
          refresh={() => refreshGuestOrderTracking(token)}
          locale={locale}
        />
      </section>

      <section className="mt-8">
        <OrderContents
          orderId={data.id}
          orderNumber={data.orderNumber}
          locale={locale}
          order={data}
        />
      </section>

      {!user && (
        <section className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-muted/40 p-5">
          <p className="max-w-md text-sm">
            {ar
              ? "أنشئي حسابًا بنفس البريد الإلكتروني لتجدي كل طلباتك في مكان واحد."
              : "Create an account with the same email to keep all your orders in one place."}
          </p>
          <Button asChild variant="line" size="pill">
            <Link to="/register">
              <UserPlus aria-hidden="true" />
              {ar ? "إنشاء حساب" : "Create account"}
            </Link>
          </Button>
        </section>
      )}
    </div>
  );
}

function CopyLinkButton({ locale }: { locale: "ar" | "en" }) {
  const [copied, setCopied] = useState(false);
  return (
    <Button
      type="button"
      variant="quiet"
      size="pill"
      onClick={() => {
        void navigator.clipboard
          ?.writeText(window.location.href)
          .then(() => setCopied(true))
          .catch(() => undefined);
      }}
    >
      {copied ? <Check aria-hidden="true" /> : <Clipboard aria-hidden="true" />}
      {copied
        ? locale === "ar"
          ? "تم النسخ"
          : "Link copied"
        : locale === "ar"
          ? "نسخ رابط الطلب"
          : "Copy order link"}
    </Button>
  );
}

function GuestProofForm({
  token,
  order,
  locale,
}: {
  token: string;
  order: GuestOrder;
  locale: "ar" | "en";
}) {
  const ar = locale === "ar";
  const queryClient = useQueryClient();
  const submitting = useRef(false);
  const [file, setFile] = useState<File | null>(null);
  const [sender, setSender] = useState("");
  const [reference, setReference] = useState("");
  const [fileError, setFileError] = useState("");
  const upload = useMutation({
    mutationFn: async () => {
      if (!file) throw new Error(ar ? "اختاري صورة إثبات الدفع." : "Choose a payment screenshot.");
      return uploadGuestPaymentProof(token, file, sender, reference, order.total);
    },
    onSuccess: () => void queryClient.invalidateQueries({ queryKey: ["guest-order", token] }),
  });
  const field = "mt-2 h-12 w-full border border-input px-4 text-sm normal-case tracking-normal";
  return (
    <form
      className="mt-8 rounded-2xl border border-border p-5"
      onSubmit={(event) => {
        event.preventDefault();
        if (submitting.current) return;
        submitting.current = true;
        upload.mutate(undefined, {
          onSettled: () => {
            submitting.current = false;
          },
        });
      }}
    >
      <h2 className="text-lg font-semibold">
        {ar ? "ارفعي إثبات التحويل" : "Upload your transfer proof"}
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        {ar
          ? `حوّلي ${formatPrice(order.total / 100)} ثم ارفعي صورة الإيصال. سنراجعها ونجهز طلبك.`
          : `Transfer ${formatPrice(order.total / 100)}, then upload the receipt screenshot. We'll review it and prepare your order.`}
      </p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="label-xs text-taupe">
          {ar ? "رقم أو اسم المُرسل" : "Sender phone or handle"}
          <input
            required
            type="tel"
            autoComplete="tel"
            value={sender}
            onChange={(event) => setSender(event.target.value)}
            className={field}
          />
        </label>
        <label className="label-xs text-taupe">
          {ar ? "رقم العملية" : "Transaction reference"}
          <input
            required
            autoComplete="off"
            value={reference}
            onChange={(event) => setReference(event.target.value)}
            className={field}
          />
        </label>
        <label className="label-xs text-taupe sm:col-span-2">
          {ar ? "صورة الإيصال" : "Payment screenshot"}
          <input
            required
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={(event) => {
              const selected = event.target.files?.[0] ?? null;
              if (selected && selected.size > 5 * 1024 * 1024) {
                setFile(null);
                setFileError(
                  ar ? "اختاري صورة أصغر من 5 ميجابايت." : "Choose an image under 5 MB.",
                );
                event.target.value = "";
                return;
              }
              setFile(selected);
              setFileError("");
            }}
            className="mt-2 block w-full border border-input p-3 text-sm normal-case tracking-normal"
          />
        </label>
      </div>
      {fileError && (
        <p role="alert" className="mt-4 text-sm text-destructive">
          {fileError}
        </p>
      )}
      {upload.error && (
        <p role="alert" className="mt-4 text-sm text-destructive">
          {apiErrorMessage(upload.error, locale)}
        </p>
      )}
      <Button
        type="submit"
        variant="solid"
        size="pill"
        className="mt-6"
        disabled={!file || !sender.trim() || !reference.trim()}
        loading={upload.isPending}
      >
        <Upload aria-hidden="true" />
        {ar ? "إرسال للمراجعة" : "Submit for review"}
      </Button>
    </form>
  );
}
