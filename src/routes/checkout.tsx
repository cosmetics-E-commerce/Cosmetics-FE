import { useEffect, useRef, useState, type ReactNode } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CheckCircle2,
  Clipboard,
  CreditCard,
  LoaderCircle,
  MapPin,
  PackageCheck,
  Plus,
  ReceiptText,
  ShieldCheck,
  ShoppingBag,
  Upload,
} from "lucide-react";
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
  getShippingRate,
  listAddresses,
  listPaymentInstructions,
  type AddressResponse,
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

const checkoutPaymentOptions = [
  {
    value: "CASH_ON_DELIVERY",
    title: "Cash on delivery",
    copy: "Pay the courier when your order arrives.",
    logo: null,
    logoClassName: "",
  },
  {
    value: "INSTAPAY",
    title: "InstaPay",
    copy: "Transfer, then upload your payment screenshot.",
    logo: "/payment-methods/instapay-logo.png",
    logoClassName: "sf-checkout-payment-logo--instapay",
  },
  {
    value: "VODAFONE_CASH",
    title: "Vodafone Cash",
    copy: "Transfer, then upload your payment screenshot.",
    logo: "/payment-methods/vodafone-icon.svg",
    logoClassName: "sf-checkout-payment-logo--vodafone",
  },
] as const;

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
  const [proofSubmitted, setProofSubmitted] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addressStatus, setAddressStatus] = useState("");
  const [draftLoaded, setDraftLoaded] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(() => new Set());
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
  const selectedAddressRecord = selectedUsableAddress(addresses.data, addressId);
  const selectedAddress = selectedAddressRecord?.id ?? "";
  const cartSignature = lines.map((line) => `${line.variantId}:${line.qty}`).join("|");
  const shippingRate = useQuery({
    queryKey: ["shipping", "rate", selectedAddress, cartSignature],
    queryFn: () => getShippingRate(selectedAddress),
    enabled: Boolean(user && selectedAddress && lines.length && !result),
    retry: 1,
    staleTime: 2 * 60 * 1000,
  });
  const shippingFee = shippingRate.data ? shippingRate.data.shippingCost / 100 : 0;
  const checkoutPreviewTotal = estimatedTotal + shippingFee;
  const selectableGifts = giftOptions.filter((gift) => gift.customerChooses);
  const requiredGiftPromotions = new Set(selectableGifts.map((gift) => gift.promotionId));
  const selectedGiftPromotions = new Set(
    selectableGifts
      .filter((gift) => giftVariantIds.includes(gift.variantId))
      .map((gift) => gift.promotionId),
  );
  const requiresGift = requiredGiftPromotions.size > 0;
  const giftReady = [...requiredGiftPromotions].every((id) => selectedGiftPromotions.has(id));
  const canPlaceOrder = Boolean(selectedAddress) && giftReady && shippingRate.isSuccess;
  const canSubmitCurrentStep = activeStep === 4 && canPlaceOrder;
  const manualPaymentSelected = isManualPayment(method);
  const completeStep = (step: number, nextStep: number) => {
    setCompletedSteps((current) => {
      const next = new Set(current);
      next.add(step);
      return next;
    });
    setActiveStep(nextStep);
  };
  const openCheckoutStep = (step: number) => {
    if (
      step === 1 ||
      step === activeStep ||
      completedSteps.has(step) ||
      completedSteps.has(step - 1)
    ) {
      setActiveStep(step);
    }
  };
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
      checkoutIdempotencyKey.current = null;
      const code = apiErrorCode(error);
      if (code === "CHECKOUT_CART_HAS_ISSUES" || code === "CHECKOUT_CART_EMPTY") {
        void client.invalidateQueries({ queryKey: ["cart"] });
      }
    },
  });
  const submitOrder = () => {
    if (!canSubmitCurrentStep || placingOrder.current) return;
    placingOrder.current = true;
    place.mutate(undefined, {
      onSettled: () => {
        placingOrder.current = false;
      },
    });
  };
  useEffect(() => {
    if (!proofSubmitted) return;
    setCompletedSteps((current) => new Set([...current, 1, 2, 3]));
  }, [proofSubmitted]);
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
    <div className="sf-checkout-page">
      <Reveal stagger staggerMs={45} distance={18} className="sf-checkout-hero">
        <p className="sf-checkout-eyebrow">{t("checkout.eyebrow")}</p>
        <h1 className="display">{t("checkout.title")}</h1>
        <p className="sf-checkout-intro">
          {locale === "ar"
            ? "راجعي الحقيبة، اختاري عنوان التوصيل، ثم أكملي الدفع من تجربة واحدة واضحة."
            : "Review your bag, choose delivery, and complete payment from one calm checkout flow."}
        </p>
      </Reveal>
      <CheckoutSteps
        current={result && manualPaymentSelected ? 4 : activeStep}
        completed={completedSteps}
        manualPending={proofSubmitted || Boolean(result && payment)}
        onSelect={openCheckoutStep}
      />
      {result && payment ? (
        <Proof
          payment={payment}
          order={result}
          submitted={proofSubmitted}
          onSubmitted={() => setProofSubmitted(true)}
        />
      ) : result && manualPaymentSelected ? (
        <PaymentSetup
          pending={paymentSetup.isPending}
          error={paymentSetup.error}
          retry={() => startPaymentSetup(result.order.id, method)}
        />
      ) : (
        <div className="sf-checkout-shell">
          <div className="sf-checkout-main">
            {activeStep === 1 && (
              <Reveal key="checkout-bag" distance={14} className="sf-checkout-step-panel">
                <section className="sf-checkout-card sf-checkout-card--bag">
                  <CheckoutCardHeader
                    icon={<ShoppingBag />}
                    eyebrow="Step 1"
                    title="Bag"
                    copy={`${lines.length} ${lines.length === 1 ? "item" : "items"} ready for checkout`}
                  />
                  <ul className="sf-checkout-bag-list">
                    {lines.map((line) => (
                      <li key={line.variantId} className="sf-checkout-bag-item">
                        <PolishedImage
                          src={line.image}
                          alt=""
                          loading="lazy"
                          wrapperClassName="sf-checkout-bag-item__image"
                          className="size-full object-cover"
                        />
                        <span className="min-w-0">
                          <span className="sf-checkout-bag-item__name">{line.name}</span>
                          <span className="sf-checkout-bag-item__meta">
                            {line.size} · Qty {line.qty}
                          </span>
                        </span>
                        <strong>{formatPrice(line.price * line.qty)}</strong>
                      </li>
                    ))}
                  </ul>
                  <div className="sf-checkout-step-actions">
                    <Button asChild variant="quiet" size="pill">
                      <Link to="/cart">Edit bag</Link>
                    </Button>
                    <Button
                      type="button"
                      variant="solid"
                      size="pill"
                      className="sf-checkout-black-button"
                      onClick={() => completeStep(1, 2)}
                    >
                      Continue to Delivery
                    </Button>
                  </div>
                </section>
              </Reveal>
            )}

            {activeStep === 2 && (
              <Reveal key="checkout-delivery" distance={14} className="sf-checkout-step-panel">
                <section className="sf-checkout-card">
                  <CheckoutCardHeader
                    icon={<MapPin />}
                    eyebrow="Step 2"
                    title="Delivery"
                    copy="Select the address we should ship to."
                  />
                  {addresses.isLoading ? (
                    <div className="sf-checkout-skeletons" aria-label="Loading delivery addresses">
                      <div />
                      <div />
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
                        <div
                          className="sf-checkout-address-list"
                          role="radiogroup"
                          aria-label="Delivery address"
                        >
                          {addresses.data?.map((address) => {
                            const ready = isAddressDeliveryReady(address);
                            return (
                              <label
                                key={address.id}
                                className="sf-checkout-choice"
                                data-active={selectedAddress === address.id || undefined}
                                data-disabled={!ready || undefined}
                              >
                                <input
                                  type="radio"
                                  name="delivery-address"
                                  checked={selectedAddress === address.id}
                                  disabled={!ready}
                                  onChange={() => {
                                    if (!ready) return;
                                    setAddressId(address.id);
                                    setAddressStatus(
                                      `${address.receiverName} selected for delivery.`,
                                    );
                                  }}
                                />
                                <span>
                                  <strong>{address.receiverName}</strong>
                                  <span className="sf-checkout-choice__copy">
                                    {address.building} {address.street}, {address.area},{" "}
                                    {address.city}, {address.governorate}
                                  </span>
                                  <span className="sf-checkout-choice__meta">{address.phone}</span>
                                  {!ready && (
                                    <span className="sf-checkout-choice__warning">
                                      This address needs to be updated before it can be used for
                                      delivery.
                                    </span>
                                  )}
                                </span>
                              </label>
                            );
                          })}
                        </div>
                      )}
                      <p className="sr-only" role="status" aria-live="polite">
                        {addressStatus}
                      </p>
                      {!addresses.data?.length && (
                        <div className="sf-checkout-note">
                          Add a delivery address here. Your bag and checkout choices will stay in
                          place.
                        </div>
                      )}
                      {(showAddressForm || !addresses.data?.length) && (
                        <div className={addresses.data?.length ? "sf-checkout-inline-form" : ""}>
                          <h3>Delivery details</h3>
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
                          variant="solid"
                          size="pill"
                          className="sf-checkout-black-button mt-5"
                          onClick={() => setShowAddressForm(true)}
                        >
                          <Plus /> {selectedAddress ? "Add another address" : "Add updated address"}
                        </Button>
                      )}
                      {selectedAddress && shippingRate.isSuccess && (
                        <p className="sf-checkout-auto-note" role="status">
                          Delivery is ready. Review your order before payment.
                        </p>
                      )}
                      <div className="sf-checkout-step-actions">
                        <Button
                          type="button"
                          variant="quiet"
                          size="pill"
                          onClick={() => setActiveStep(1)}
                        >
                          Back to bag
                        </Button>
                        <Button
                          type="button"
                          variant="solid"
                          size="pill"
                          className="sf-checkout-black-button"
                          disabled={!selectedAddress || !shippingRate.isSuccess}
                          onClick={() => completeStep(2, 3)}
                        >
                          Continue to Review
                        </Button>
                      </div>
                    </div>
                  )}
                </section>
              </Reveal>
            )}

            {activeStep === 3 && (
              <Reveal key="checkout-review" distance={14} className="sf-checkout-step-panel">
                <section className="sf-checkout-card">
                  <CheckoutCardHeader
                    icon={<PackageCheck />}
                    eyebrow="Step 3"
                    title="Review"
                    copy="Check the final details before choosing a payment method."
                  />
                  <div className="sf-checkout-review-grid">
                    <div>
                      <span>Delivery to</span>
                      <strong>{selectedAddressRecord?.receiverName ?? "Select an address"}</strong>
                      <p>
                        {selectedAddressRecord
                          ? `${selectedAddressRecord.building} ${selectedAddressRecord.street}, ${selectedAddressRecord.area}, ${selectedAddressRecord.city}, ${selectedAddressRecord.governorate}`
                          : "Choose where this order should be shipped."}
                      </p>
                    </div>
                    <div>
                      <span>Estimated total</span>
                      <strong>{formatPrice(checkoutPreviewTotal)}</strong>
                      <p>
                        {shippingRate.data
                          ? `${shippingRate.data.provider} · ${shippingRate.data.estimatedDays} days`
                          : "Shipping is calculated after selecting an address."}
                      </p>
                    </div>
                  </div>
                  {requiresGift && (
                    <div className="sf-checkout-review-gift">
                      <CheckoutCardHeader
                        icon={<PackageCheck />}
                        eyebrow="Gift"
                        title="Complimentary gift"
                        copy="Choose the gift attached to your promotion."
                      />
                      <div className="grid gap-3">
                        {selectableGifts.map((gift) => (
                          <label
                            key={gift.variantId}
                            className="sf-checkout-choice"
                            data-active={giftVariantIds.includes(gift.variantId) || undefined}
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
                            <span>
                              <strong>Promotional gift</strong>
                              <span className="sf-checkout-choice__copy">
                                Quantity {gift.quantity}
                              </span>
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="sf-checkout-step-actions">
                    <Button
                      type="button"
                      variant="quiet"
                      size="pill"
                      onClick={() => setActiveStep(2)}
                    >
                      Back to Delivery
                    </Button>
                    <Button
                      type="button"
                      variant="solid"
                      size="pill"
                      className="sf-checkout-black-button"
                      disabled={!canPlaceOrder}
                      onClick={() => completeStep(3, 4)}
                    >
                      Continue to Payment
                    </Button>
                  </div>
                </section>
              </Reveal>
            )}

            {activeStep === 4 && (
              <Reveal key="checkout-payment" distance={14} className="sf-checkout-step-panel">
                <section className="sf-checkout-card">
                  <CheckoutCardHeader
                    icon={<CreditCard />}
                    eyebrow="Step 4"
                    title="Payment"
                    copy="Manual transfers stay pending here until the admin approves them."
                  />
                  <div className="sf-checkout-payment-grid">
                    {checkoutPaymentOptions.map((option) => (
                      <label
                        key={option.value}
                        className="sf-checkout-payment-option"
                        data-active={method === option.value || undefined}
                      >
                        <span className="sf-checkout-payment-option__inner">
                          <input
                            type="radio"
                            checked={method === option.value}
                            onChange={() => setMethod(option.value)}
                          />
                          <span className="sf-checkout-payment-option__body">
                            {option.logo ? (
                              <span
                                className={`sf-checkout-payment-logo ${option.logoClassName}`}
                                aria-hidden="true"
                              >
                                <img src={option.logo} alt="" width={48} height={32} />
                              </span>
                            ) : null}
                            <span className="sf-checkout-payment-option__copy">
                              <strong>{option.title}</strong>
                              <span>{option.copy}</span>
                            </span>
                          </span>
                        </span>
                      </label>
                    ))}
                  </div>
                  {instructions.data?.find((item) => item.method === method) && (
                    <Instruction data={instructions.data.find((item) => item.method === method)!} />
                  )}
                  <label className="sf-checkout-notes">
                    <span>Order notes</span>
                    <textarea
                      value={notes}
                      onChange={(event) => setNotes(event.target.value)}
                      className="min-h-24 w-full border border-input bg-white p-4 text-sm normal-case tracking-normal"
                      maxLength={500}
                      placeholder="Optional delivery instructions"
                    />
                  </label>
                  <div className="sf-checkout-step-actions">
                    <Button
                      type="button"
                      variant="quiet"
                      size="pill"
                      onClick={() => setActiveStep(requiresGift ? 3 : 2)}
                    >
                      Back
                    </Button>
                    <Button
                      type="button"
                      variant="solid"
                      size="pill"
                      className="sf-checkout-black-button"
                      disabled={!canSubmitCurrentStep}
                      loading={place.isPending}
                      onClick={submitOrder}
                    >
                      {manualPaymentSelected
                        ? "Create order and upload proof"
                        : t("checkout.place")}
                    </Button>
                  </div>
                </section>
              </Reveal>
            )}
          </div>
          <aside className="sf-checkout-summary">
            <div className="sf-checkout-summary__top">
              <span className="sf-checkout-summary__icon">
                <ReceiptText />
              </span>
              <div>
                <p className="sf-checkout-eyebrow">{t("checkout.summary")}</p>
                <h2>{formatPrice(checkoutPreviewTotal)}</h2>
              </div>
            </div>
            <div className="sf-checkout-summary-row">
              <span>Subtotal</span>
              <strong>{formatPrice(subtotal)}</strong>
            </div>
            {appliedPromotions.map((promotion) => (
              <div key={promotion.id} className="sf-checkout-summary-row text-gold">
                <span>{promotion.title}</span>
                <span>-{formatPrice(promotion.discountAmount / 100)}</span>
              </div>
            ))}
            {discountTotal > 0 && (
              <div className="sf-checkout-summary-row">
                <span>After promotions</span>
                <strong>{formatPrice(estimatedTotal)}</strong>
              </div>
            )}
            <div className="sf-checkout-summary-row">
              <span>Shipping</span>
              <strong>
                {shippingRate.isLoading || shippingRate.isFetching
                  ? "Calculating..."
                  : shippingRate.data
                    ? formatPrice(shippingFee)
                    : "—"}
              </strong>
            </div>
            {shippingRate.data && (
              <p className="sf-checkout-summary__hint">
                {shippingRate.data.provider} · estimated {shippingRate.data.estimatedDays} day
                {shippingRate.data.estimatedDays === 1 ? "" : "s"}
              </p>
            )}
            {shippingRate.error && (
              <div role="alert" className="sf-checkout-summary__error">
                {apiErrorMessage(shippingRate.error, locale)}
                <button
                  type="button"
                  className="ms-2 underline underline-offset-4"
                  onClick={() => void shippingRate.refetch()}
                >
                  Try again
                </button>
              </div>
            )}
            <div className="sf-checkout-summary-total">
              <span>Total</span>
              <strong>{formatPrice(checkoutPreviewTotal)}</strong>
            </div>
            <p className="sf-checkout-summary__hint">
              The backend recalculates products, stock, promotions and shipping before creating the
              order.
            </p>
            {place.error && (
              <p role="alert" className="sf-checkout-summary__error">
                {apiErrorMessage(place.error, locale)}
              </p>
            )}
            <Button
              variant="solid"
              size="wide"
              className="sf-checkout-black-button mt-7"
              disabled={!canSubmitCurrentStep}
              loading={place.isPending}
              onClick={submitOrder}
            >
              {t("checkout.place")}
            </Button>
            {!selectedAddress && (
              <p className="sf-checkout-summary__hint">
                Add or select a verified delivery address to continue.
              </p>
            )}
            {selectedAddress && !shippingRate.isSuccess && (
              <p className="sf-checkout-summary__hint">
                Wait for the delivery price before placing the order.
              </p>
            )}
            {requiresGift && !giftReady && (
              <p className="sf-checkout-summary__hint">
                Choose your complimentary gift to continue.
              </p>
            )}
            <div className="sf-checkout-secure">
              <ShieldCheck />
              <span>Secure checkout. Payment status is reviewed by the admin team.</span>
            </div>
          </aside>
        </div>
      )}
      {!result && (
        <div className="mobile-primary-bar fixed inset-x-0 bottom-0 z-30 border-t border-border bg-white px-4 pb-[max(0.8rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-12px_30px_-24px_rgba(0,0,0,0.18)] lg:hidden">
          <div className="mx-auto flex max-w-lg items-center gap-3">
            <div className="min-w-0 flex-1">
              <p className="label-xs text-taupe">{t("checkout.beforeDelivery")}</p>
              <p className="font-serif text-xl">{formatPrice(checkoutPreviewTotal)}</p>
            </div>
            <Button
              type="button"
              variant="solid"
              size="pill"
              className="sf-checkout-black-button h-12 shrink-0 px-6"
              disabled={!canSubmitCurrentStep}
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

function isAddressDeliveryReady(address: AddressResponse) {
  return Boolean(address.bostaGovernorateId && address.bostaCityId && address.bostaZoneId);
}

function selectedUsableAddress(addresses: AddressResponse[] | undefined, selectedId: string) {
  const usable = addresses?.filter(isAddressDeliveryReady) ?? [];
  return (
    usable.find((item) => item.id === selectedId) ??
    usable.find((item) => item.isDefault) ??
    usable[0] ??
    null
  );
}

function isManualPayment(method: string) {
  return method === "INSTAPAY" || method === "VODAFONE_CASH";
}

function CheckoutCardHeader({
  icon,
  eyebrow,
  title,
  copy,
}: {
  icon: ReactNode;
  eyebrow: string;
  title: string;
  copy: string;
}) {
  return (
    <header className="sf-checkout-card__header">
      <span className="sf-checkout-card__icon">{icon}</span>
      <span>
        <span className="sf-checkout-eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
        <p>{copy}</p>
      </span>
    </header>
  );
}

function CheckoutSteps({
  current,
  completed,
  manualPending,
  onSelect,
}: {
  current: number;
  completed: Set<number>;
  manualPending: boolean;
  onSelect: (step: number) => void;
}) {
  const steps = [
    { number: 1, label: "Bag" },
    { number: 2, label: "Delivery", sub: "Select address" },
    { number: 3, label: "Review" },
    { number: 4, label: "Payment", sub: manualPending ? "Pending" : undefined },
    { number: 5, label: "Confirmed" },
  ];
  return (
    <ol className="sf-checkout-steps" aria-label="Checkout progress">
      {steps.map((step) => {
        const state =
          step.number === current ? "active" : completed.has(step.number) ? "complete" : "next";
        const canOpen =
          step.number === 1 ||
          step.number === current ||
          completed.has(step.number) ||
          completed.has(step.number - 1);
        return (
          <li
            key={step.number}
            data-state={state}
            aria-current={state === "active" ? "step" : undefined}
          >
            <button type="button" disabled={!canOpen} onClick={() => onSelect(step.number)}>
              <span className="sf-checkout-step__dot">
                {state === "complete" ? <CheckCircle2 /> : step.number}
              </span>
              <span>
                <strong>{step.label}</strong>
                {step.sub && <small>{step.sub}</small>}
              </span>
            </button>
          </li>
        );
      })}
    </ol>
  );
}

function Proof({
  payment,
  order,
  submitted,
  onSubmitted,
}: {
  payment: Payment;
  order: CheckoutResult;
  submitted: boolean;
  onSubmitted: () => void;
}) {
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
    onSuccess: onSubmitted,
  });
  if (submitted) {
    return (
      <section className="sf-checkout-pending" aria-live="polite">
        <span className="sf-checkout-pending__icon">
          <LoaderCircle />
        </span>
        <p className="sf-checkout-eyebrow">Step 4 · Payment</p>
        <h2>Payment pending</h2>
        <p>
          Your transfer proof was received. Stay here while the status remains pending; once the
          admin approves the payment, this order can move to Step 5: Confirmed.
        </p>
        <dl>
          <div>
            <dt>Order</dt>
            <dd>{order.order.orderNumber}</dd>
          </div>
          <div>
            <dt>Payment</dt>
            <dd>{payment.method.replaceAll("_", " ")}</dd>
          </div>
          <div>
            <dt>Status</dt>
            <dd>Pending</dd>
          </div>
        </dl>
        <div className="sf-checkout-pending__actions">
          <Button asChild variant="solid" size="pill" className="sf-checkout-black-button">
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
      </section>
    );
  }
  return (
    <div className="sf-checkout-proof">
      <div className="sf-checkout-card">
        <CheckoutCardHeader
          icon={<CheckCircle2 />}
          eyebrow="Step 4 · Payment"
          title="Transfer details"
          copy={`Order ${order.order.orderNumber} is created and waiting for proof.`}
        />
        <p className="sf-checkout-proof__amount">
          Transfer exactly {formatPrice(payment.amount / 100)} and keep the transaction reference.
        </p>
        {order.paymentInstructions && (
          <div className="sf-checkout-transfer-box">
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
        className="sf-checkout-card"
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
        <CheckoutCardHeader
          icon={<Upload />}
          eyebrow="Keep this page"
          title="Submit transfer proof"
          copy="After upload, the payment stays pending until admin approval."
        />
        <div className="sf-checkout-form-stack">
          <label>
            <span>Sender phone or handle</span>
            <input
              required
              type="tel"
              autoComplete="tel"
              value={sender}
              onChange={(event) => setSender(event.target.value)}
              className="mt-2 h-12 w-full border border-input px-4 text-sm normal-case tracking-normal"
            />
          </label>
          <label>
            <span>Transaction reference</span>
            <input
              required
              autoComplete="off"
              value={reference}
              onChange={(event) => setReference(event.target.value)}
              className="mt-2 h-12 w-full border border-input px-4 text-sm normal-case tracking-normal"
            />
          </label>
          <label>
            <span>Payment screenshot</span>
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
          className="sf-checkout-black-button mt-7"
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
      className="mt-3 inline-flex min-h-11 items-center gap-2 text-gold transition-colors duration-150 hover:text-foreground"
    >
      {value}
      <Clipboard className="size-4" />
      <span className="label-xs" aria-live="polite">
        {copied ? "Copied" : "Copy"}
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
    <div className="sf-checkout-pending" aria-live="polite">
      {pending ? (
        <>
          <span className="sf-checkout-pending__icon">
            <LoaderCircle />
          </span>
          <p className="sf-checkout-eyebrow">Step 4 · Payment</p>
          <h2>Preparing transfer details</h2>
          <p>Your order is safely created. Please keep this page open.</p>
        </>
      ) : (
        <>
          <p className="sf-checkout-eyebrow">Payment setup</p>
          <h2>Your order is safely created</h2>
          <p role="alert">{apiErrorMessage(error)}</p>
          <p>Retrying will not create another order.</p>
          <Button
            type="button"
            variant="solid"
            size="pill"
            className="sf-checkout-black-button mt-7"
            onClick={retry}
          >
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
