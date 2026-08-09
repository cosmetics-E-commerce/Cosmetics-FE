import { useEffect, useRef, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CheckCircle2, Clipboard, LoaderCircle, Plus, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PolishedImage } from "@/components/ui/polished-image";
import { AddressForm } from "@/components/forms/AddressForm";
import { StatePanel } from "@/components/feedback/StatePanel";
import {
  apiErrorCode,
  apiErrorMessage,
  checkout,
  createAddress,
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
import { Reveal } from "@/components/motion/Primitives";
import { useI18n } from "@/lib/i18n";
export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — BIOREZA" }] }),
  component: Checkout,
});
function Checkout() {
  const { t } = useI18n();
  const {
    user,
    authHydrated,
    lines,
    subtotal,
    discountTotal,
    estimatedTotal,
    appliedPromotions,
    giftOptions,
    locale,
  } = useStore();
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
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addressStatus, setAddressStatus] = useState("");
  const [draftLoaded, setDraftLoaded] = useState(false);
  const initialLineCount = useRef(lines.length);
  const checkoutIdempotencyKey = useRef<string | null>(null);
  const paymentIdempotencyKey = useRef<string | null>(null);
  const placingOrder = useRef(false);
  const preparingPayment = useRef(false);
  const idempotencyKey = (ref: { current: string | null }) => {
    ref.current ??= crypto.randomUUID();
    return ref.current;
  };
  const paymentSetup = useMutation({
    mutationFn: ({ orderId, paymentMethod }: { orderId: string; paymentMethod: string }) =>
      createPayment(orderId, paymentMethod, idempotencyKey(paymentIdempotencyKey)),
    onSuccess: setPayment,
  });
  const startPaymentSetup = (orderId: string, paymentMethod: string) => {
    if (preparingPayment.current) return;
    preparingPayment.current = true;
    paymentSetup.mutate(
      { orderId, paymentMethod },
      {
        onSettled: () => {
          preparingPayment.current = false;
        },
      },
    );
  };
  const addressMutation = useMutation({
    mutationFn: createAddress,
    onSuccess: (address) => {
      client.setQueryData<Awaited<ReturnType<typeof listAddresses>>>(
        ["account", "addresses"],
        (current = []) => [...current, address],
      );
      setAddressId(address.id);
      setShowAddressForm(false);
      setAddressStatus("Address saved and selected for this order.");
    },
  });
  useEffect(() => {
    trackCommerceEvent("checkout_started", {
      metadata: { lineCount: initialLineCount.current },
    });
  }, []);
  useEffect(() => {
    try {
      const saved = window.sessionStorage.getItem("bioreza.checkout-draft");
      if (saved) {
        const draft = JSON.parse(saved) as {
          addressId?: string;
          method?: string;
          notes?: string;
        };
        if (draft.addressId) setAddressId(draft.addressId);
        if (["CASH_ON_DELIVERY", "INSTAPAY", "VODAFONE_CASH"].includes(draft.method ?? "")) {
          setMethod(draft.method!);
        }
        if (typeof draft.notes === "string") setNotes(draft.notes);
      }
    } catch {
      window.sessionStorage.removeItem("bioreza.checkout-draft");
    } finally {
      setDraftLoaded(true);
    }
  }, []);
  useEffect(() => {
    if (!draftLoaded || result) return;
    window.sessionStorage.setItem(
      "bioreza.checkout-draft",
      JSON.stringify({ addressId, method, notes }),
    );
  }, [addressId, draftLoaded, method, notes, result]);
  const selectedAddress =
    addressId ||
    addresses.data?.find((item) => item.isDefault)?.id ||
    addresses.data?.[0]?.id ||
    "";
  const selectableGifts = giftOptions.filter((gift) => gift.customerChooses);
  const requiredGiftPromotions = new Set(selectableGifts.map((gift) => gift.promotionId));
  const selectedGiftPromotions = new Set(
    selectableGifts
      .filter((gift) => giftVariantIds.includes(gift.variantId))
      .map((gift) => gift.promotionId),
  );
  const requiresGift = requiredGiftPromotions.size > 0;
  const giftReady = [...requiredGiftPromotions].every((id) => selectedGiftPromotions.has(id));
  const canPlaceOrder = Boolean(selectedAddress) && giftReady;
  const place = useMutation({
    mutationFn: () =>
      checkout(
        selectedAddress,
        method,
        notes.trim() || undefined,
        giftVariantIds,
        idempotencyKey(checkoutIdempotencyKey),
      ),
    onSuccess: (order) => {
      trackCommerceEvent("purchase_completed", { orderId: order.order.id });
      setResult(order);
      window.sessionStorage.removeItem("bioreza.checkout-draft");
      void client.invalidateQueries({ queryKey: ["cart"] });
      if (method === "INSTAPAY" || method === "VODAFONE_CASH") {
        startPaymentSetup(order.order.id, method);
      } else {
        void navigate({
          to: "/order-confirmed",
          search: {
            order: order.order.orderNumber,
            status: order.order.status,
            payment: order.order.paymentMethod,
          },
        });
      }
    },
    onError: (error) => {
      const code = apiErrorCode(error);
      if (code === "CHECKOUT_CART_HAS_ISSUES" || code === "CHECKOUT_CART_EMPTY") {
        void client.invalidateQueries({ queryKey: ["cart"] });
      }
    },
  });
  const submitOrder = () => {
    if (!canPlaceOrder || placingOrder.current) return;
    placingOrder.current = true;
    place.mutate(undefined, {
      onSettled: () => {
        placingOrder.current = false;
      },
    });
  };
  if (!authHydrated) return <Loading />;
  if (!user)
    return (
      <Gate
        title="An account is required"
        copy="Checkout uses your saved delivery address and keeps payment review connected to your order."
        to="/sign-in"
        action="Sign in to checkout"
        returnTo="/checkout"
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
    <div className="mx-auto max-w-[1400px] px-5 pb-32 pt-14 md:px-10 lg:py-20">
      <Reveal stagger staggerMs={72} distance={20}>
        <p className="label-xs text-gold">{t("checkout.eyebrow")}</p>
        <h1 className="display mt-5 text-[clamp(2.2rem,4.4vw,3.4rem)]">{t("checkout.title")}</h1>
        <ol
          aria-label="Checkout progress"
          className="mt-8 flex max-w-xl items-center gap-3 text-xs text-taupe"
        >
          <li className="text-foreground">{t("checkout.bag")}</li>
          <li aria-hidden="true" className="h-px flex-1 bg-border" />
          <li aria-current="step" className="text-gold">
            {t("checkout.deliveryPayment")}
          </li>
          <li aria-hidden="true" className="h-px flex-1 bg-border" />
          <li>{t("checkout.confirmation")}</li>
        </ol>
      </Reveal>
      {result && payment ? (
        <Proof payment={payment} order={result} />
      ) : result && (method === "INSTAPAY" || method === "VODAFONE_CASH") ? (
        <PaymentSetup
          pending={paymentSetup.isPending}
          error={paymentSetup.error}
          retry={() => startPaymentSetup(result.order.id, method)}
        />
      ) : (
        <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_380px]">
          <div className="min-w-0 space-y-12">
            <section className="checkout-section">
              <h2 className="label-sm">{t("checkout.address")}</h2>
              <div className="rule-gold my-6" />
              {addresses.isLoading ? (
                <div className="space-y-3" aria-label="Loading delivery addresses">
                  <div className="h-24 animate-pulse bg-stone" />
                  <div className="h-24 animate-pulse bg-stone" />
                </div>
              ) : addresses.isError ? (
                <StatePanel
                  kind="error"
                  title="Addresses did not load"
                  description="Your checkout details are still here. Try loading your saved addresses again."
                  action={() => void addresses.refetch()}
                  actionLabel="Try again"
                  className="py-10"
                />
              ) : (
                <div>
                  {Boolean(addresses.data?.length) && (
                    <div className="grid gap-3" role="radiogroup" aria-label="Delivery address">
                      {addresses.data?.map((address) => (
                        <label
                          key={address.id}
                          className={`choice-card flex cursor-pointer gap-4 border p-5 ${selectedAddress === address.id ? "border-gold bg-ivory" : "border-border"}`}
                        >
                          <input
                            type="radio"
                            name="delivery-address"
                            checked={selectedAddress === address.id}
                            onChange={() => {
                              setAddressId(address.id);
                              setAddressStatus(`${address.receiverName} selected for delivery.`);
                            }}
                          />
                          <span>
                            <strong className="font-serif text-xl">{address.receiverName}</strong>
                            <span className="mt-1 block text-sm text-muted-foreground">
                              {address.building} {address.street}, {address.area}, {address.city},{" "}
                              {address.governorate}
                            </span>
                            <span className="mt-1 block text-xs text-taupe">{address.phone}</span>
                          </span>
                        </label>
                      ))}
                    </div>
                  )}
                  <p className="sr-only" role="status" aria-live="polite">
                    {addressStatus}
                  </p>
                  {!addresses.data?.length && (
                    <div className="mb-6 border-s-2 border-gold bg-ivory px-5 py-4 text-sm">
                      Add a delivery address here. Your bag and checkout choices will stay in place.
                    </div>
                  )}
                  {(showAddressForm || !addresses.data?.length) && (
                    <div
                      className={addresses.data?.length ? "mt-7 border-t border-border pt-7" : ""}
                    >
                      <h3 className="mb-5 font-serif text-2xl">Delivery details</h3>
                      <AddressForm
                        initialName={`${user.firstName} ${user.lastName}`.trim()}
                        initialPhone={user.phone ?? ""}
                        pending={addressMutation.isPending}
                        {...(addresses.data?.length
                          ? { onCancel: () => setShowAddressForm(false) }
                          : {})}
                        onSubmit={(input) =>
                          addressMutation
                            .mutateAsync({
                              ...input,
                              isDefault: !addresses.data?.length,
                            })
                            .then(() => undefined)
                        }
                      />
                      {addressMutation.error && (
                        <p role="alert" className="mt-4 text-sm text-destructive">
                          {apiErrorMessage(addressMutation.error, locale)}
                        </p>
                      )}
                    </div>
                  )}
                  {Boolean(addresses.data?.length) && !showAddressForm && (
                    <Button
                      type="button"
                      variant="quiet"
                      size="pill"
                      className="mt-5"
                      onClick={() => setShowAddressForm(true)}
                    >
                      <Plus /> Add another address
                    </Button>
                  )}
                </div>
              )}
            </section>
            {requiresGift && (
              <section className="checkout-section">
                <h2 className="label-sm">Choose your complimentary gift</h2>
                <div className="rule-gold my-6" />
                <div className="grid gap-3">
                  {selectableGifts.map((gift) => (
                    <label
                      key={gift.variantId}
                      className={`cursor-pointer border p-5 ${giftVariantIds.includes(gift.variantId) ? "border-gold" : "border-border"}`}
                    >
                      <input
                        type="radio"
                        name={`gift-${gift.promotionId}`}
                        checked={giftVariantIds.includes(gift.variantId)}
                        onChange={() =>
                          setGiftVariantIds((current) => [
                            ...current.filter((variantId) => {
                              const option = selectableGifts.find(
                                (candidate) => candidate.variantId === variantId,
                              );
                              return option?.promotionId !== gift.promotionId;
                            }),
                            gift.variantId,
                          ])
                        }
                      />{" "}
                      <span className="ms-3">Promotional gift · quantity {gift.quantity}</span>
                    </label>
                  ))}
                </div>
              </section>
            )}
            <section className="checkout-section">
              <h2 className="label-sm">{t("checkout.payment")}</h2>
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
                maxLength={500}
                placeholder="Optional delivery instructions"
              />
            </label>
          </div>
          <aside className="h-fit border border-border bg-ivory p-8 lg:sticky lg:top-32">
            <h2 className="label-sm">{t("checkout.summary")}</h2>
            <ul className="my-6 space-y-4">
              {lines.map((line) => (
                <li key={line.variantId} className="flex gap-3">
                  <PolishedImage
                    src={line.image}
                    alt=""
                    loading="lazy"
                    wrapperClassName="h-16 w-12 shrink-0"
                    className="size-full object-cover"
                  />
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
            {appliedPromotions.map((promotion) => (
              <div key={promotion.id} className="mt-3 flex justify-between text-sm text-gold">
                <span>{promotion.title}</span>
                <span>-{formatPrice(promotion.discountAmount / 100)}</span>
              </div>
            ))}
            {discountTotal > 0 && (
              <div className="mt-5 flex items-baseline justify-between border-t border-border pt-5">
                <span>After promotions</span>
                <span className="font-serif text-2xl">{formatPrice(estimatedTotal)}</span>
              </div>
            )}
            <p className="mt-3 text-xs text-muted-foreground">
              The final total, including shipping and COD fees, is priced by the backend.
            </p>
            {place.error && (
              <p role="alert" className="mt-5 text-sm text-destructive">
                {apiErrorMessage(place.error, locale)}
              </p>
            )}
            <Button
              variant="solid"
              size="wide"
              className="mt-8"
              disabled={!canPlaceOrder}
              loading={place.isPending}
              onClick={submitOrder}
            >
              {t("checkout.place")}
            </Button>
            {!selectedAddress && (
              <p className="mt-3 text-xs text-muted-foreground">
                Add or select a delivery address to continue.
              </p>
            )}
            {requiresGift && !giftReady && (
              <p className="mt-3 text-xs text-muted-foreground">
                Choose your complimentary gift to continue.
              </p>
            )}
          </aside>
        </div>
      )}
      {!result && (
        <div className="mobile-primary-bar fixed inset-x-0 bottom-0 z-30 border-t border-border bg-warm-white/96 px-4 pb-[max(0.8rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-12px_30px_-24px_rgba(0,0,0,0.4)] backdrop-blur-sm lg:hidden">
          <div className="mx-auto flex max-w-lg items-center gap-3">
            <div className="min-w-0 flex-1">
              <p className="label-xs text-taupe">{t("checkout.beforeDelivery")}</p>
              <p className="font-serif text-xl">{formatPrice(estimatedTotal)}</p>
            </div>
            <Button
              type="button"
              variant="solid"
              size="pill"
              className="h-12 shrink-0 px-6"
              disabled={!canPlaceOrder}
              loading={place.isPending}
              onClick={submitOrder}
            >
              {t("checkout.place")}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
function Proof({ payment, order }: { payment: Payment; order: CheckoutResult }) {
  const navigate = useNavigate();
  const submittingProof = useRef(false);
  const [file, setFile] = useState<File | null>(null);
  const [sender, setSender] = useState("");
  const [reference, setReference] = useState("");
  const [fileError, setFileError] = useState("");
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
          if (submittingProof.current) return;
          submittingProof.current = true;
          mutation.mutate(undefined, {
            onSettled: () => {
              submittingProof.current = false;
            },
          });
        }}
      >
        <p className="label-sm">Submit transfer proof</p>
        <div className="mt-6 space-y-5">
          <label className="label-xs block text-taupe">
            Sender phone or handle
            <input
              required
              type="tel"
              autoComplete="tel"
              value={sender}
              onChange={(event) => setSender(event.target.value)}
              className="mt-2 h-12 w-full border border-input px-4 text-sm normal-case tracking-normal"
            />
          </label>
          <label className="label-xs block text-taupe">
            Transaction reference
            <input
              required
              autoComplete="off"
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
              onChange={(event) => {
                const selected = event.target.files?.[0] ?? null;
                if (selected && selected.size > 8 * 1024 * 1024) {
                  setFile(null);
                  setFileError("Choose an image smaller than 8 MB.");
                  event.target.value = "";
                  return;
                }
                setFile(selected);
                setFileError("");
              }}
              aria-describedby="proof-help"
              className="mt-2 block w-full border border-input p-3 text-sm normal-case tracking-normal"
            />
            <span
              id="proof-help"
              className="mt-2 block text-xs normal-case tracking-normal text-muted-foreground"
            >
              JPG, PNG or WebP, up to 8 MB.
            </span>
          </label>
        </div>
        {fileError && (
          <p role="alert" className="mt-4 text-sm text-destructive">
            {fileError}
          </p>
        )}
        {mutation.error && (
          <p className="mt-5 text-sm text-destructive">{apiErrorMessage(mutation.error)}</p>
        )}
        <Button
          type="submit"
          variant="solid"
          size="wide"
          className="mt-7"
          disabled={!file || !sender.trim() || !reference.trim()}
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
  const [copied, setCopied] = useState(false);
  if (!value) return null;
  return (
    <button
      type="button"
      onClick={() =>
        void navigator.clipboard.writeText(value).then(() => {
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1400);
        })
      }
      className="mt-3 inline-flex items-center gap-2 text-gold"
    >
      {value}
      <Clipboard className="size-4" />
      <span className="sr-only" aria-live="polite">
        {copied ? "Copied" : "Copy transfer details"}
      </span>
    </button>
  );
}
function PaymentSetup({
  pending,
  error,
  retry,
}: {
  pending: boolean;
  error: unknown;
  retry: () => void;
}) {
  return (
    <div className="mx-auto mt-14 max-w-xl border border-border p-8 text-center" aria-live="polite">
      {pending ? (
        <>
          <LoaderCircle className="mx-auto animate-spin text-gold" />
          <h2 className="mt-5 font-serif text-3xl">Preparing transfer details</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Your order is safely created. Please keep this page open.
          </p>
        </>
      ) : (
        <>
          <h2 className="font-serif text-3xl">Your order is safely created</h2>
          <p role="alert" className="mt-3 text-sm text-muted-foreground">
            {apiErrorMessage(error)}
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            Retrying will not create another order.
          </p>
          <Button type="button" variant="solid" size="pill" className="mt-7" onClick={retry}>
            Retry payment setup
          </Button>
        </>
      )}
    </div>
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
  returnTo,
}: {
  title: string;
  copy: string;
  to: "/sign-in" | "/shop";
  action: string;
  returnTo?: "/checkout";
}) {
  return (
    <div className="mx-auto max-w-xl px-5 py-28 text-center">
      <h1 className="font-serif text-4xl">{title}</h1>
      <p className="mt-5 text-muted-foreground">{copy}</p>
      <Button asChild variant="solid" size="pill" className="mt-8">
        {to === "/sign-in" ? (
          <Link to="/sign-in" search={{ returnTo }}>
            {action}
          </Link>
        ) : (
          <Link to="/shop">{action}</Link>
        )}
      </Button>
    </div>
  );
}
