import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CheckCircle2, Clipboard, LoaderCircle, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  apiErrorMessage,
  checkout,
  createPayment,
  listAddresses,
  listPaymentInstructions,
  uploadPaymentProof,
  type CheckoutResult,
  type Payment,
} from "@/lib/api";
import { formatPrice } from "@/lib/products";
import { useStore } from "@/lib/store";
import { trackCommerceEvent } from "@/lib/analytics";
export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — BIOREZA" }] }),
  component: Checkout,
});
function Checkout() {
  const { user, authHydrated, lines, subtotal, discountTotal, estimatedTotal, appliedPromotions, giftOptions } = useStore();
  const navigate = useNavigate();
  const client = useQueryClient();
  const addresses = useQuery({
    queryKey: ["account", "addresses"],
    queryFn: listAddresses,
    enabled: Boolean(user),
  });
  const instructions = useQuery({
    queryKey: ["payment-instructions"],
    queryFn: listPaymentInstructions,
    enabled: Boolean(user),
  });
  const [addressId, setAddressId] = useState("");
  const [method, setMethod] = useState("CASH_ON_DELIVERY");
  const [notes, setNotes] = useState("");
  const [giftVariantIds, setGiftVariantIds] = useState<string[]>([]);
  const [result, setResult] = useState<CheckoutResult | null>(null);
  const [payment, setPayment] = useState<Payment | null>(null);
  useEffect(() => { trackCommerceEvent("checkout_started", { metadata: { lineCount: lines.length } }); }, []);
  const selectedAddress =
    addressId ||
    addresses.data?.find((item) => item.isDefault)?.id ||
    addresses.data?.[0]?.id ||
    "";
  const place = useMutation({
    mutationFn: async () => {
      const order = await checkout(selectedAddress, method, notes.trim() || undefined, giftVariantIds);
      const manual =
        method === "INSTAPAY" || method === "VODAFONE_CASH"
          ? await createPayment(order.order.id, method)
          : null;
      return { order, manual };
    },
    onSuccess: ({ order, manual }) => {
      trackCommerceEvent("purchase_completed", { orderId: order.order.id });
      setResult(order);
      setPayment(manual);
      void client.invalidateQueries({ queryKey: ["cart"] });
      if (!manual)
        void navigate({
          to: "/order-confirmed",
          search: {
            order: order.order.orderNumber,
            status: order.order.status,
            payment: order.order.paymentMethod,
          },
        });
    },
  });
  if (!authHydrated) return <Loading />;
  if (!user)
    return (
      <Gate
        title="An account is required"
        copy="Checkout uses your saved delivery address and keeps payment review connected to your order."
        to="/sign-in"
        action="Sign in to checkout"
      />
    );
  if (!lines.length && !result)
    return (
      <Gate
        title="Your bag is empty"
        copy="Add at least one available product before checkout."
        to="/shop"
        action="Browse products"
      />
    );
  return (
    <div className="mx-auto max-w-[1400px] px-5 py-14 md:px-10 lg:py-20">
      <p className="label-xs text-gold">Secure checkout</p>
      <h1 className="display mt-5 text-[clamp(2.2rem,4.4vw,3.4rem)]">
        Confirm delivery and payment.
      </h1>
      {result && payment ? (
        <Proof payment={payment} order={result} />
      ) : (
        <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_380px]">
          <div className="space-y-12">
            <section>
              <h2 className="label-sm">Delivery address</h2>
              <div className="rule-gold my-6" />
              {addresses.isLoading ? (
                <p>Loading addresses...</p>
              ) : addresses.data?.length ? (
                <div className="grid gap-3">
                  {addresses.data.map((address) => (
                    <label
                      key={address.id}
                      className={`flex cursor-pointer gap-4 border p-5 ${selectedAddress === address.id ? "border-gold" : "border-border"}`}
                    >
                      <input
                        type="radio"
                        checked={selectedAddress === address.id}
                        onChange={() => setAddressId(address.id)}
                      />
                      <span>
                        <strong className="font-serif text-xl">{address.receiverName}</strong>
                        <span className="mt-1 block text-sm text-muted-foreground">
                          {address.building} {address.street}, {address.area}, {address.city},{" "}
                          {address.governorate}
                        </span>
                      </span>
                    </label>
                  ))}
                </div>
              ) : (
                <p className="border border-border p-5 text-sm">
                  No delivery address found.{" "}
                  <Link to="/account" className="text-gold underline">
                    Add one in your account
                  </Link>
                  .
                </p>
              )}
            </section>
            {giftOptions.some((gift) => gift.customerChooses) && <section><h2 className="label-sm">Choose your complimentary gift</h2><div className="rule-gold my-6" /><div className="grid gap-3">{giftOptions.filter((gift) => gift.customerChooses).map((gift) => <label key={gift.variantId} className={`cursor-pointer border p-5 ${giftVariantIds.includes(gift.variantId) ? "border-gold" : "border-border"}`}><input type="radio" checked={giftVariantIds.includes(gift.variantId)} onChange={() => setGiftVariantIds([gift.variantId])} /> <span className="ms-3">Promotional gift · quantity {gift.quantity}</span></label>)}</div></section>}
            <section>
              <h2 className="label-sm">Payment method</h2>
              <div className="rule-gold my-6" />
              <div className="grid gap-3">
                {[
                  [
                    "CASH_ON_DELIVERY",
                    "Cash on delivery",
                    "Pay the courier when your order arrives.",
                  ],
                  ["INSTAPAY", "InstaPay", "Transfer, then upload your payment screenshot."],
                  [
                    "VODAFONE_CASH",
                    "Vodafone Cash",
                    "Transfer, then upload your payment screenshot.",
                  ],
                ].map(([value, title, copy]) => (
                  <label
                    key={value}
                    className={`cursor-pointer border p-5 ${method === value ? "border-gold" : "border-border"}`}
                  >
                    <span className="flex gap-3">
                      <input
                        type="radio"
                        checked={method === value}
                        onChange={() => setMethod(value ?? "CASH_ON_DELIVERY")}
                      />
                      <span>
                        <strong>{title}</strong>
                        <span className="mt-1 block text-sm text-muted-foreground">{copy}</span>
                      </span>
                    </span>
                  </label>
                ))}
              </div>
              {instructions.data?.find((item) => item.method === method) && (
                <Instruction data={instructions.data.find((item) => item.method === method)!} />
              )}
            </section>
            <label className="label-xs block text-taupe">
              Order notes
              <textarea
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                className="mt-2 min-h-28 w-full border border-input bg-warm-white p-4 text-sm normal-case tracking-normal"
              />
            </label>
          </div>
          <aside className="h-fit border border-border bg-ivory p-8 lg:sticky lg:top-32">
            <h2 className="label-sm">Order summary</h2>
            <ul className="my-6 space-y-4">
              {lines.map((line) => (
                <li key={line.variantId} className="flex gap-3">
                  <img src={line.image} alt="" className="h-16 w-12 object-cover" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-serif">{line.name}</span>
                    <span className="text-xs text-taupe">
                      {line.size} · {line.qty}
                    </span>
                  </span>
                  <span className="text-sm">{formatPrice(line.price * line.qty)}</span>
                </li>
              ))}
            </ul>
            <div className="flex items-baseline justify-between border-t border-border pt-5">
              <span>Subtotal</span>
              <span className="font-serif text-3xl">{formatPrice(subtotal)}</span>
            </div>
            {appliedPromotions.map((promotion) => <div key={promotion.id} className="mt-3 flex justify-between text-sm text-gold"><span>{promotion.title}</span><span>-{formatPrice(promotion.discountAmount / 100)}</span></div>)}
            {discountTotal > 0 && <div className="mt-5 flex items-baseline justify-between border-t border-border pt-5"><span>After promotions</span><span className="font-serif text-2xl">{formatPrice(estimatedTotal)}</span></div>}
            <p className="mt-3 text-xs text-muted-foreground">
              The final total, including shipping and COD fees, is priced by the backend.
            </p>
            {place.error && (
              <p role="alert" className="mt-5 text-sm text-destructive">
                {apiErrorMessage(place.error)}
              </p>
            )}
            <Button
              variant="solid"
              size="wide"
              className="mt-8"
              disabled={!selectedAddress}
              loading={place.isPending}
              onClick={() => place.mutate()}
            >
              Place order
            </Button>
          </aside>
        </div>
      )}
    </div>
  );
}
function Proof({ payment, order }: { payment: Payment; order: CheckoutResult }) {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [sender, setSender] = useState("");
  const [reference, setReference] = useState("");
  const mutation = useMutation({
    mutationFn: () => {
      if (!file) throw new Error("Choose a payment screenshot.");
      return uploadPaymentProof(payment.id, file, sender, reference, payment.amount);
    },
    onSuccess: () =>
      void navigate({
        to: "/order-confirmed",
        search: {
          order: order.order.orderNumber,
          status: "PAYMENT_REVIEW",
          payment: payment.method,
        },
      }),
  });
  return (
    <div className="mt-14 grid gap-10 lg:grid-cols-2">
      <div className="border border-gold/40 bg-ivory p-8">
        <CheckCircle2 className="text-gold" />
        <p className="label-xs mt-6 text-gold">Order created</p>
        <h2 className="mt-3 font-serif text-3xl">{order.order.orderNumber}</h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Transfer exactly {formatPrice(payment.amount / 100)} and keep the transaction reference.
        </p>
        {order.paymentInstructions && (
          <div className="mt-6 space-y-2 text-sm">
            <Copy
              value={
                order.paymentInstructions.instapayAddress ??
                order.paymentInstructions.vodafoneCashNumber ??
                ""
              }
            />
            <p>{order.paymentInstructions.transferNote}</p>
          </div>
        )}
      </div>
      <form
        className="border border-border p-8"
        onSubmit={(event) => {
          event.preventDefault();
          mutation.mutate();
        }}
      >
        <p className="label-sm">Submit transfer proof</p>
        <div className="mt-6 space-y-5">
          <label className="label-xs block text-taupe">
            Sender phone or handle
            <input
              required
              value={sender}
              onChange={(event) => setSender(event.target.value)}
              className="mt-2 h-12 w-full border border-input px-4 text-sm normal-case tracking-normal"
            />
          </label>
          <label className="label-xs block text-taupe">
            Transaction reference
            <input
              required
              value={reference}
              onChange={(event) => setReference(event.target.value)}
              className="mt-2 h-12 w-full border border-input px-4 text-sm normal-case tracking-normal"
            />
          </label>
          <label className="label-xs block text-taupe">
            Payment screenshot
            <input
              required
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={(event) => setFile(event.target.files?.[0] ?? null)}
              className="mt-2 block w-full border border-input p-3 text-sm normal-case tracking-normal"
            />
          </label>
        </div>
        {mutation.error && (
          <p className="mt-5 text-sm text-destructive">{apiErrorMessage(mutation.error)}</p>
        )}
        <Button
          type="submit"
          variant="solid"
          size="wide"
          className="mt-7"
          disabled={!file}
          loading={mutation.isPending}
        >
          <Upload />
          Submit for review
        </Button>
      </form>
    </div>
  );
}
function Instruction({
  data,
}: {
  data: {
    accountName: string;
    accountNumber: string | null;
    phoneNumber: string | null;
    notes: string | null;
  };
}) {
  return (
    <div className="mt-5 border border-gold/30 bg-ivory p-5 text-sm">
      <p className="font-medium">Transfer to {data.accountName}</p>
      <Copy value={data.accountNumber ?? data.phoneNumber ?? data.notes ?? ""} />
    </div>
  );
}
function Copy({ value }: { value: string }) {
  if (!value) return null;
  return (
    <button
      type="button"
      onClick={() => void navigator.clipboard.writeText(value)}
      className="mt-3 inline-flex items-center gap-2 text-gold"
    >
      {value}
      <Clipboard className="size-4" />
    </button>
  );
}
function Loading() {
  return (
    <div className="grid min-h-[60vh] place-items-center">
      <LoaderCircle className="animate-spin text-gold" />
    </div>
  );
}
function Gate({
  title,
  copy,
  to,
  action,
}: {
  title: string;
  copy: string;
  to: "/sign-in" | "/shop";
  action: string;
}) {
  return (
    <div className="mx-auto max-w-xl px-5 py-28 text-center">
      <h1 className="font-serif text-4xl">{title}</h1>
      <p className="mt-5 text-muted-foreground">{copy}</p>
      <Button asChild variant="solid" size="pill" className="mt-8">
        <Link to={to}>{action}</Link>
      </Button>
    </div>
  );
}
