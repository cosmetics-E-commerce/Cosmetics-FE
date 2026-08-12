import { useCallback, useEffect, useRef, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Check, Clipboard, FileCheck2, LoaderCircle, LockKeyhole, Upload } from "lucide-react";
import { CheckoutStepper } from "@/components/checkout/CheckoutStepper";
import { CheckoutSummary } from "@/components/checkout/CheckoutSummary";
import { PolishedImage } from "@/components/ui/polished-image";
import {
  DeliveryStep,
  PaymentStep,
  ReviewStep,
  type GiftOption,
} from "@/components/checkout/CheckoutSteps";
import { Button } from "@/components/ui/button";
import {
  apiErrorCode,
  apiErrorMessage,
  checkout,
  createAddress,
  createPayment,
  getShippingRate,
  listAddresses,
  listPaymentInstructions,
  updateAddress,
  uploadPaymentProof,
  type AddressResponse,
  type CheckoutResult,
  type CreateAddressInput,
  type Payment,
} from "@/lib/api";
import {
  checkoutStepIndex,
  isAddressDeliveryReady,
  parseCheckoutStep,
  saveCheckoutSuccess,
  type CheckoutRouteStep,
  type CheckoutStep,
} from "@/lib/checkout-flow";
import {
  formatDeliveryEstimate,
  paymentMethods,
  paymentMethodName,
  type PaymentMethod,
} from "@/lib/checkout-presentation";
import { formatPrice } from "@/lib/products";
import { useStore, type CartLine } from "@/lib/store";
import { trackCommerceEvent } from "@/lib/analytics";

type CheckoutSearch = { step?: CheckoutRouteStep };

export const Route = createFileRoute("/checkout")({
  validateSearch: (raw: Record<string, unknown>): CheckoutSearch => {
    const step = parseCheckoutStep(raw["step"]);
    return step ? { step } : {};
  },
  head: () => ({ meta: [{ title: "Checkout — BIOREZA" }] }),
  component: Checkout,
});

type Draft = {
  addressId?: string;
  method?: PaymentMethod;
  notes?: string;
  giftVariantIds?: string[];
  furthestStep?: CheckoutRouteStep;
};

type CompletedCheckoutSnapshot = {
  address: AddressResponse;
  method: PaymentMethod;
  notes: string;
  lines: CartLine[];
  subtotal: number;
  discountTotal: number;
  estimatedTotal: number;
  shippingFee: number;
};

function Checkout() {
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
  const search = Route.useSearch();
  const navigate = useNavigate();
  const client = useQueryClient();
  const requestedStep = search.step ?? "delivery";
  const [addressId, setAddressId] = useState("");
  const [method, setMethod] = useState<PaymentMethod>("CASH_ON_DELIVERY");
  const [notes, setNotes] = useState("");
  const [giftVariantIds, setGiftVariantIds] = useState<string[]>([]);
  const [furthestStep, setFurthestStep] = useState<CheckoutRouteStep>("delivery");
  const [result, setResult] = useState<CheckoutResult | null>(null);
  const [payment, setPayment] = useState<Payment | null>(null);
  const [postOrderStep, setPostOrderStep] = useState<CheckoutStep>("confirmation");
  const [completedCheckout, setCompletedCheckout] = useState<CompletedCheckoutSnapshot | null>(
    null,
  );
  const [addingAddress, setAddingAddress] = useState(false);
  const [editingAddress, setEditingAddress] = useState<AddressResponse | null>(null);
  const [addressStatus, setAddressStatus] = useState("");
  const [deliveryError, setDeliveryError] = useState("");
  const [draftLoaded, setDraftLoaded] = useState(false);
  const stepHeadingRef = useRef<HTMLHeadingElement>(null);
  const previousStep = useRef(requestedStep);
  const initialLineCount = useRef(lines.length);
  const checkoutIdempotencyKey = useRef<string | null>(null);
  const paymentIdempotencyKey = useRef<string | null>(null);
  const placingOrder = useRef(false);
  const preparingPayment = useRef(false);

  const addresses = useQuery({
    queryKey: ["account", "addresses"],
    queryFn: listAddresses,
    enabled: Boolean(user),
    staleTime: 2 * 60 * 1000,
  });
  const instructions = useQuery({
    queryKey: ["payment-instructions"],
    queryFn: listPaymentInstructions,
    enabled: Boolean(user && requestedStep === "payment"),
    staleTime: 5 * 60 * 1000,
  });

  const idempotencyKey = (ref: { current: string | null }) => {
    ref.current ??= crypto.randomUUID();
    return ref.current;
  };

  const paymentSetup = useMutation({
    mutationFn: ({ orderId, paymentMethod }: { orderId: string; paymentMethod: string }) =>
      createPayment(orderId, paymentMethod, idempotencyKey(paymentIdempotencyKey)),
    onSuccess: setPayment,
  });

  const startPaymentSetup = useCallback(
    (orderId: string, paymentMethod: string) => {
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
    },
    [paymentSetup],
  );

  const addressMutation = useMutation({
    mutationFn: ({ input, editingId }: { input: CreateAddressInput; editingId?: string }) =>
      editingId ? updateAddress(editingId, input) : createAddress(input),
    onSuccess: (address, variables) => {
      client.setQueryData<Awaited<ReturnType<typeof listAddresses>>>(
        ["account", "addresses"],
        (current = []) =>
          variables.editingId
            ? current.map((item) => (item.id === address.id ? address : item))
            : [...current, address],
      );
      setAddressId(address.id);
      setEditingAddress(null);
      setAddingAddress(false);
      setDeliveryError("");
      setAddressStatus(
        locale === "ar"
          ? "تم حفظ العنوان واختياره لهذا الطلب."
          : "Address saved and selected for this order.",
      );
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
        const draft = JSON.parse(saved) as Draft;
        if (draft.addressId) setAddressId(draft.addressId);
        if (
          draft.method === "CASH_ON_DELIVERY" ||
          draft.method === "INSTAPAY" ||
          draft.method === "VODAFONE_CASH"
        ) {
          setMethod(draft.method);
        }
        if (typeof draft.notes === "string") setNotes(draft.notes);
        if (Array.isArray(draft.giftVariantIds)) setGiftVariantIds(draft.giftVariantIds);
        if (draft.furthestStep) setFurthestStep(draft.furthestStep);
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
      JSON.stringify({ addressId, method, notes, giftVariantIds, furthestStep } satisfies Draft),
    );
  }, [addressId, draftLoaded, furthestStep, giftVariantIds, method, notes, result]);

  const selectedAddressRecord = selectedUsableAddress(addresses.data, addressId);
  const selectedAddress = selectedAddressRecord?.id ?? "";

  useEffect(() => {
    if (selectedAddress && selectedAddress !== addressId) setAddressId(selectedAddress);
  }, [addressId, selectedAddress]);

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
  const selectableGifts = giftOptions.filter((gift) => gift.customerChooses) as GiftOption[];
  const requiredGiftPromotions = new Set(selectableGifts.map((gift) => gift.promotionId));
  const selectedGiftPromotions = new Set(
    selectableGifts
      .filter((gift) => giftVariantIds.includes(gift.variantId))
      .map((gift) => gift.promotionId),
  );
  const giftReady = [...requiredGiftPromotions].every((id) => selectedGiftPromotions.has(id));
  const canPlaceOrder = Boolean(selectedAddress && method && giftReady && shippingRate.isSuccess);
  const currentStep = result ? postOrderStep : requestedStep;

  const goToStep = useCallback(
    (step: CheckoutRouteStep, replace = false) => {
      setFurthestStep((current) =>
        checkoutStepIndex(step) > checkoutStepIndex(current) ? step : current,
      );
      void navigate({
        to: "/checkout",
        search: step === "delivery" ? {} : { step },
        replace,
      });
    },
    [navigate],
  );

  useEffect(() => {
    if (addresses.isLoading || !draftLoaded || result) return;
    if ((requestedStep === "payment" || requestedStep === "review") && !selectedAddressRecord) {
      goToStep("delivery", true);
      return;
    }
    if (requestedStep === "review" && !method) goToStep("payment", true);
  }, [
    addresses.isLoading,
    draftLoaded,
    goToStep,
    method,
    requestedStep,
    result,
    selectedAddressRecord,
  ]);

  useEffect(() => {
    if (previousStep.current === requestedStep || result) return;
    previousStep.current = requestedStep;
    requestAnimationFrame(() => {
      document.getElementById("checkout-flow")?.scrollIntoView({ block: "start" });
      stepHeadingRef.current?.focus({ preventScroll: true });
    });
  }, [requestedStep, result]);

  useEffect(() => {
    if ((!addingAddress && !editingAddress) || result) return;
    requestAnimationFrame(() => {
      document.getElementById("checkout-flow")?.scrollIntoView({ block: "start" });
      document.getElementById("delivery-editor-title")?.focus({ preventScroll: true });
    });
  }, [addingAddress, editingAddress, result]);

  const rememberOrder = useCallback(
    (order: CheckoutResult) => {
      if (!selectedAddressRecord) return;
      const backendAmount = order.order.grandTotal ?? order.order.total;
      saveCheckoutSuccess({
        orderNumber: order.order.orderNumber,
        amount: backendAmount === undefined ? checkoutPreviewTotal : backendAmount / 100,
        paymentMethod: method,
        recipient: selectedAddressRecord.receiverName,
        destination: formatAddress(selectedAddressRecord),
        deliveryEstimate: shippingRate.data
          ? formatDeliveryEstimate(shippingRate.data, locale)
          : "Confirmed after dispatch",
      });
    },
    [checkoutPreviewTotal, locale, method, selectedAddressRecord, shippingRate.data],
  );

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
      rememberOrder(order);
      if (selectedAddressRecord) {
        setCompletedCheckout({
          address: selectedAddressRecord,
          method,
          notes,
          lines: lines.map((line) => ({ ...line, issues: [...line.issues] })),
          subtotal,
          discountTotal,
          estimatedTotal,
          shippingFee,
        });
      }
      setPostOrderStep("confirmation");
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
    if (!canPlaceOrder || placingOrder.current || place.isPending) return;
    placingOrder.current = true;
    place.mutate(undefined, {
      onSettled: () => {
        placingOrder.current = false;
      },
    });
  };

  if (!authHydrated) return <CheckoutLoading locale={locale} />;
  if (!user) {
    return (
      <CheckoutGate
        title={locale === "ar" ? "يلزم تسجيل الدخول" : "An account is required"}
        copy={
          locale === "ar"
            ? "يستخدم إتمام الطلب عناوينك المحفوظة ويربط مراجعة الدفع بطلبك."
            : "Checkout uses your saved delivery addresses and keeps payment review connected to your order."
        }
        to="/sign-in"
        action={locale === "ar" ? "تسجيل الدخول لإتمام الطلب" : "Sign in to checkout"}
        returnTo="/checkout"
      />
    );
  }
  if (!lines.length && !result) {
    return (
      <CheckoutGate
        title={locale === "ar" ? "حقيبتك فارغة" : "Your bag is empty"}
        copy={
          locale === "ar"
            ? "أضيفي منتجاً متاحاً واحداً على الأقل قبل إتمام الطلب."
            : "Add at least one available product before checkout."
        }
        to="/shop"
        action={locale === "ar" ? "تصفح المنتجات" : "Browse products"}
      />
    );
  }

  return (
    <div className="luxury-checkout">
      <header className="luxury-checkout__header">
        <div>
          <p>{locale === "ar" ? "إتمام طلب آمن" : "Secure checkout"}</p>
          <h1>{locale === "ar" ? "تفاصيل قليلة. طلب واضح." : "A few details. One clear order."}</h1>
        </div>
        {!result && (
          <Link to="/cart" className="luxury-checkout__bag-link">
            {locale === "ar" ? "العودة إلى الحقيبة" : "Return to bag"}
          </Link>
        )}
      </header>

      <CheckoutStepper
        current={currentStep}
        locale={locale}
        furthest={result ? "confirmation" : furthestStep}
        completedThrough={result ? "confirmation" : currentStep}
        allowConfirmationNavigation={Boolean(result)}
        onNavigate={(step: CheckoutStep) => {
          if (!result) {
            if (step === "confirmation") return;
            if ((step === "payment" || step === "review") && !selectedAddressRecord) {
              setDeliveryError(
                locale === "ar"
                  ? "اختاري عنوان توصيل صالحاً قبل الانتقال إلى الخطوة التالية."
                  : "Choose a delivery-ready address before moving to the next step.",
              );
              goToStep("delivery");
              return;
            }
            goToStep(step);
            return;
          }

          setPostOrderStep(step);
          requestAnimationFrame(() => {
            document.getElementById("checkout-post-order")?.scrollIntoView({ block: "start" });
          });
        }}
      />

      {result ? (
        <div id="checkout-post-order" className="checkout-post-order">
          {postOrderStep === "delivery" && completedCheckout ? (
            <CompletedDeliveryView snapshot={completedCheckout} order={result} locale={locale} />
          ) : postOrderStep === "payment" && completedCheckout ? (
            <CompletedPaymentView snapshot={completedCheckout} order={result} locale={locale} />
          ) : postOrderStep === "review" && completedCheckout ? (
            <CompletedReviewView snapshot={completedCheckout} order={result} locale={locale} />
          ) : payment ? (
            <PaymentProof payment={payment} order={result} locale={locale} />
          ) : (
            <PaymentSetup
              locale={locale}
              pending={paymentSetup.isPending}
              error={paymentSetup.error}
              retry={() => startPaymentSetup(result.order.id, method)}
            />
          )}
        </div>
      ) : (
        <div className="checkout-layout">
          <CheckoutSummary
            lines={lines}
            subtotal={subtotal}
            discountTotal={discountTotal}
            estimatedTotal={estimatedTotal}
            promotions={appliedPromotions}
            shippingFee={shippingFee}
            shippingRate={shippingRate.data}
            shippingPending={shippingRate.isLoading || shippingRate.isFetching}
            shippingError={shippingRate.error}
            onRetryShipping={() => void shippingRate.refetch()}
            locale={locale}
          />

          <section
            id="checkout-flow"
            className="checkout-flow"
            aria-label={locale === "ar" ? "خطوات إتمام الطلب" : "Checkout details"}
          >
            <div className="checkout-step-stage" key={requestedStep}>
              {requestedStep === "delivery" && (
                <DeliveryStep
                  locale={locale}
                  addresses={addresses.data}
                  addressesLoading={addresses.isLoading}
                  addressesError={addresses.isError}
                  onRetryAddresses={() => void addresses.refetch()}
                  selectedId={selectedAddress}
                  onSelect={(address) => {
                    setAddressId(address.id);
                    setDeliveryError("");
                    setAddressStatus(
                      locale === "ar"
                        ? `تم اختيار ${address.receiverName} للتوصيل.`
                        : `${address.receiverName} selected for delivery.`,
                    );
                  }}
                  addressStatus={addressStatus}
                  editingAddress={editingAddress}
                  addingAddress={addingAddress}
                  onEditAddress={(address) => {
                    setEditingAddress(address);
                    setAddingAddress(false);
                  }}
                  onAddAddress={() => {
                    setEditingAddress(null);
                    setAddingAddress(true);
                  }}
                  onCancelAddress={() => {
                    setEditingAddress(null);
                    setAddingAddress(false);
                  }}
                  onSaveAddress={(input, editingId) =>
                    addressMutation
                      .mutateAsync({
                        input: {
                          ...input,
                          isDefault: editingId
                            ? Boolean(editingAddress?.isDefault)
                            : !addresses.data?.length,
                        },
                        ...(editingId ? { editingId } : {}),
                      })
                      .then(() => undefined)
                  }
                  addressMutationPending={addressMutation.isPending}
                  addressMutationError={
                    addressMutation.error ? apiErrorMessage(addressMutation.error, locale) : ""
                  }
                  userName={`${user.firstName} ${user.lastName}`.trim()}
                  userPhone={user.phone ?? ""}
                  notes={notes}
                  onNotesChange={setNotes}
                  deliveryPending={Boolean(
                    selectedAddress && (shippingRate.isLoading || shippingRate.isFetching),
                  )}
                  deliveryError={
                    deliveryError ||
                    (shippingRate.error ? apiErrorMessage(shippingRate.error, locale) : "")
                  }
                  onRetryDelivery={() => {
                    setDeliveryError("");
                    void shippingRate.refetch();
                  }}
                  onContinue={() => {
                    if (!selectedAddressRecord) {
                      setDeliveryError(
                        locale === "ar"
                          ? "اختاري عنوان توصيل صالحاً للمتابعة."
                          : "Choose a delivery-ready address to continue.",
                      );
                      return;
                    }
                    if (!shippingRate.isSuccess) {
                      setDeliveryError(
                        locale === "ar"
                          ? "نحتاج لتأكيد سعر التوصيل قبل المتابعة."
                          : "We need to confirm the delivery price before continuing.",
                      );
                      return;
                    }
                    setDeliveryError("");
                    goToStep("payment");
                  }}
                  headingRef={stepHeadingRef}
                />
              )}

              {requestedStep === "payment" && (
                <PaymentStep
                  locale={locale}
                  method={method}
                  onMethodChange={setMethod}
                  instructions={instructions.data}
                  instructionsPending={instructions.isLoading || instructions.isFetching}
                  instructionsError={instructions.isError}
                  onRetryInstructions={() => void instructions.refetch()}
                  onBack={() => goToStep("delivery")}
                  onContinue={() => goToStep("review")}
                  headingRef={stepHeadingRef}
                />
              )}

              {requestedStep === "review" && selectedAddressRecord && (
                <ReviewStep
                  locale={locale}
                  address={selectedAddressRecord}
                  method={method}
                  notes={notes}
                  lines={lines}
                  selectableGifts={selectableGifts}
                  selectedGiftIds={giftVariantIds}
                  onGiftChange={(gift) =>
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
                  onEditDelivery={() => goToStep("delivery")}
                  onEditPayment={() => goToStep("payment")}
                  onBack={() => goToStep("payment")}
                  canPlaceOrder={canPlaceOrder}
                  placingOrder={place.isPending}
                  placeError={place.error ? apiErrorMessage(place.error, locale) : ""}
                  blockingMessage={
                    !giftReady
                      ? locale === "ar"
                        ? "اختاري هديتك المجانية قبل إنشاء الطلب."
                        : "Choose your complimentary gift before placing the order."
                      : !shippingRate.isSuccess
                        ? locale === "ar"
                          ? "نؤكد تكلفة التوصيل قبل إنشاء الطلب."
                          : "We're confirming delivery before the order can be placed."
                        : ""
                  }
                  onPlaceOrder={submitOrder}
                  headingRef={stepHeadingRef}
                />
              )}
            </div>
          </section>
        </div>
      )}
    </div>
  );
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

function formatAddress(address: AddressResponse) {
  return `${address.building} ${address.street}, ${address.area}, ${address.city}, ${address.governorate}`;
}

function completedOrderTotal(snapshot: CompletedCheckoutSnapshot, order: CheckoutResult) {
  const backendTotal = order.order.grandTotal ?? order.order.total;
  return backendTotal === undefined
    ? snapshot.estimatedTotal + snapshot.shippingFee
    : backendTotal / 100;
}

function CompletedDeliveryView({
  snapshot,
  order,
  locale,
}: {
  snapshot: CompletedCheckoutSnapshot;
  order: CheckoutResult;
  locale: "en" | "ar";
}) {
  const ar = locale === "ar";

  return (
    <section className="checkout-completed-view" aria-labelledby="completed-delivery-title">
      <header className="checkout-completed-view__header">
        <span aria-hidden="true">01</span>
        <div>
          <p>{ar ? "تفاصيل الطلب المحفوظ" : "Secured order detail"}</p>
          <h2 id="completed-delivery-title">
            {ar ? "عنوان التوصيل لهذا الطلب." : "Delivery for this order."}
          </h2>
          <div>
            {ar
              ? "تم إنشاء الطلب، لذلك نعرض التفاصيل المحفوظة بدون تغيير الطلب الحالي."
              : "The order is already created, so these are the locked details used for this purchase."}
          </div>
        </div>
      </header>

      <div className="checkout-completed-view__facts">
        <article>
          <p>{ar ? "المستلم" : "Recipient"}</p>
          <strong>{snapshot.address.receiverName}</strong>
          <span>{snapshot.address.phone}</span>
        </article>
        <article className="checkout-completed-view__fact--wide">
          <p>{ar ? "وجهة التوصيل" : "Delivery destination"}</p>
          <strong>{formatAddress(snapshot.address)}</strong>
          {snapshot.notes && (
            <span>
              {ar ? "ملاحظة" : "Note"}: {snapshot.notes}
            </span>
          )}
        </article>
        <article>
          <p>{ar ? "مرجع الطلب" : "Order reference"}</p>
          <strong>{order.order.orderNumber}</strong>
          <span>{ar ? "تم تأمينه" : "Order secured"}</span>
        </article>
      </div>
    </section>
  );
}

function CompletedReviewView({
  snapshot,
  order,
  locale,
}: {
  snapshot: CompletedCheckoutSnapshot;
  order: CheckoutResult;
  locale: "en" | "ar";
}) {
  const ar = locale === "ar";
  const total = completedOrderTotal(snapshot, order);

  return (
    <section className="checkout-completed-view" aria-labelledby="completed-review-title">
      <header className="checkout-completed-view__header">
        <span aria-hidden="true">03</span>
        <div>
          <p>{ar ? "نسخة الطلب المؤكدة" : "Confirmed order snapshot"}</p>
          <h2 id="completed-review-title">{ar ? "مراجعة طلبك." : "Review your secured order."}</h2>
          <div>
            {ar
              ? "تبقى هذه النسخة مستقلة عن الحقيبة بعد إنشاء الطلب."
              : "This snapshot stays available even though purchased items have left your bag."}
          </div>
        </div>
      </header>

      <div className="checkout-completed-view__summary">
        <dl>
          <div>
            <dt>{ar ? "مرجع الطلب" : "Order reference"}</dt>
            <dd>{order.order.orderNumber}</dd>
          </div>
          <div>
            <dt>{ar ? "التوصيل إلى" : "Delivering to"}</dt>
            <dd>{snapshot.address.receiverName}</dd>
          </div>
          <div>
            <dt>{ar ? "طريقة الدفع" : "Payment method"}</dt>
            <dd>{paymentMethodName(snapshot.method, locale)}</dd>
          </div>
          <div>
            <dt>{ar ? "الإجمالي النهائي" : "Final total"}</dt>
            <dd>{formatPrice(total)}</dd>
          </div>
        </dl>
      </div>

      <div className="checkout-review-products checkout-completed-view__products">
        <header>
          <p>{ar ? "المنتجات المؤكدة" : "Confirmed products"}</p>
          <span>
            {snapshot.lines.reduce((count, line) => count + line.qty, 0)} {ar ? "قطعة" : "items"}
          </span>
        </header>
        <ul>
          {snapshot.lines.map((line) => (
            <li key={line.variantId}>
              <PolishedImage
                src={line.image}
                alt=""
                loading="lazy"
                width={56}
                height={68}
                sizes="56px"
                wrapperClassName="checkout-review-products__image"
                className="size-full object-cover"
              />
              <span>
                <strong>{line.name}</strong>
                <small>
                  {line.size} · {ar ? "الكمية" : "Qty"} {line.qty}
                </small>
              </span>
              <b>{formatPrice(line.price * line.qty)}</b>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function CompletedPaymentView({
  snapshot,
  order,
  locale,
}: {
  snapshot: CompletedCheckoutSnapshot;
  order: CheckoutResult;
  locale: "en" | "ar";
}) {
  const ar = locale === "ar";
  const selectedMethod = paymentMethods.find((candidate) => candidate.value === snapshot.method)!;

  return (
    <section className="checkout-completed-view" aria-labelledby="completed-payment-title">
      <header className="checkout-completed-view__header">
        <span aria-hidden="true">02</span>
        <div>
          <p>{ar ? "طريقة الدفع المحفوظة" : "Secured payment method"}</p>
          <h2 id="completed-payment-title">
            {ar ? "الدفع لهذا الطلب." : "Payment for this order."}
          </h2>
          <div>
            {ar
              ? "تم تثبيت طريقة الدفع عند إنشاء الطلب. يمكنك مراجعتها هنا، ثم العودة إلى التأكيد لإرسال الإثبات."
              : "This method was locked when the order was created. Review it here, then return to Confirmation to send your proof."}
          </div>
        </div>
      </header>

      <div className="checkout-completed-payment">
        <div className="checkout-completed-payment__method">
          <span className="checkout-completed-payment__icon">
            <img src={selectedMethod.icon} alt="" />
          </span>
          <span>
            <small>{ar ? "طريقة الدفع المختارة" : "Selected payment method"}</small>
            <strong>{ar ? selectedMethod.titleAr : selectedMethod.title}</strong>
            <p>{ar ? selectedMethod.descriptionAr : selectedMethod.description}</p>
          </span>
          <span className="checkout-completed-payment__locked">
            <LockKeyhole aria-hidden="true" />
            {ar ? "محفوظة" : "Secured"}
          </span>
        </div>

        <dl>
          <div>
            <dt>{ar ? "مرجع الطلب" : "Order reference"}</dt>
            <dd>{order.order.orderNumber}</dd>
          </div>
          <div>
            <dt>{ar ? "المبلغ" : "Amount"}</dt>
            <dd>{formatPrice(completedOrderTotal(snapshot, order))}</dd>
          </div>
          <div>
            <dt>{ar ? "الحالة" : "Status"}</dt>
            <dd>{ar ? "بانتظار إثبات التحويل" : "Awaiting transfer proof"}</dd>
          </div>
        </dl>

        <p className="checkout-completed-payment__notice">
          <LockKeyhole aria-hidden="true" />
          <span>
            {ar
              ? "لا يمكن تغيير طريقة الدفع بعد إنشاء الطلب، لأن رقم الطلب ومراجعة التحويل مرتبطان بها."
              : "Payment method cannot change after order creation because the order and transfer review are already linked to it."}
          </span>
        </p>
      </div>
    </section>
  );
}

function PaymentProof({
  payment,
  order,
  locale,
}: {
  payment: Payment;
  order: CheckoutResult;
  locale: "en" | "ar";
}) {
  const navigate = useNavigate();
  const submittingProof = useRef(false);
  const [file, setFile] = useState<File | null>(null);
  const [sender, setSender] = useState("");
  const [reference, setReference] = useState("");
  const [fileError, setFileError] = useState("");
  const [errors, setErrors] = useState<Partial<Record<"sender" | "reference" | "file", string>>>(
    {},
  );
  const senderRef = useRef<HTMLInputElement>(null);
  const referenceRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const ar = locale === "ar";
  const instruction = payment.instructions;
  const legacyDestination =
    order.paymentInstructions?.instapayAddress ??
    order.paymentInstructions?.vodafoneCashNumber ??
    "";
  const destination = instruction?.accountNumber ?? instruction?.phoneNumber ?? legacyDestination;
  const recipient = instruction?.receiverName ?? instruction?.accountName;
  const transferNote = instruction?.notes ?? order.paymentInstructions?.transferNote;
  const methodLabel = paymentMethodName(payment.method as PaymentMethod, locale);
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
    <section className="checkout-proof" aria-labelledby="proof-title">
      <header>
        <span>
          <Check aria-hidden="true" />
        </span>
        <div>
          <p>
            {ar ? "تم تثبيت الطلب" : "Order secured"} · {order.order.orderNumber}
          </p>
          <h2 id="proof-title">{ar ? "طلبك محفوظ." : "Your order is secured."}</h2>
          <div>
            {ar
              ? "حوّلي المبلغ بدقة، ثم أرسلي الإيصال لنبدأ المراجعة."
              : "Transfer the exact amount, then send the receipt to begin review."}
          </div>
        </div>
        <div className="checkout-proof__status">
          <span>{ar ? "حالة الدفع" : "Payment status"}</span>
          <strong>{ar ? "بانتظار الإثبات" : "Awaiting proof"}</strong>
          <i aria-hidden="true" />
        </div>
      </header>

      <div className="checkout-proof__grid">
        <aside
          className="checkout-proof__instruction"
          aria-label={ar ? "بيانات التحويل" : "Transfer details"}
        >
          <div className="checkout-proof__method">
            <p>{ar ? "التحويل عبر" : "Transfer via"}</p>
            <strong>{methodLabel}</strong>
          </div>

          <div className="checkout-proof__amount">
            <span>{ar ? "المبلغ المطلوب" : "Exact amount"}</span>
            <strong>{formatPrice(payment.amount / 100)}</strong>
            <small>{ar ? "حوّلي هذا المبلغ بالضبط" : "Transfer this amount exactly"}</small>
          </div>

          <dl className="checkout-proof__details">
            {destination && (
              <div>
                <dt>{ar ? "إرسال إلى" : "Send to"}</dt>
                <dd>
                  <CopyValue value={destination} locale={locale} />
                </dd>
              </div>
            )}
            {recipient && (
              <div>
                <dt>{ar ? "اسم المستلم" : "Recipient"}</dt>
                <dd>{recipient}</dd>
              </div>
            )}
            <div>
              <dt>{ar ? "مرجع الطلب" : "Order reference"}</dt>
              <dd>
                <CopyValue value={order.order.orderNumber} locale={locale} />
              </dd>
            </div>
          </dl>

          {transferNote && <p className="checkout-proof__note">{transferNote}</p>}
          <div className="checkout-proof__secure-note">
            <LockKeyhole aria-hidden="true" />
            <span>
              {ar
                ? "لن نطلب رمزك السري أو كلمة مرورك."
                : "We will never ask for your PIN or password."}
            </span>
          </div>
        </aside>

        <form
          id="payment-proof-form"
          aria-labelledby="proof-form-title"
          noValidate
          onSubmit={(event) => {
            event.preventDefault();
            if (submittingProof.current || mutation.isPending) return;
            const nextErrors: typeof errors = {};
            if (sender.trim().length < 3) {
              nextErrors.sender = ar
                ? "أدخلي رقم الهاتف أو حساب InstaPay الذي تم التحويل منه."
                : "Enter the phone number or InstaPay handle you sent from.";
            }
            if (reference.trim().length < 4) {
              nextErrors.reference = ar
                ? "أدخلي رقم العملية الموجود في الإيصال."
                : "Enter the transaction reference shown on your receipt.";
            }
            if (!file) {
              nextErrors.file = ar
                ? "أضيفي لقطة واضحة لإيصال التحويل."
                : "Add a clear screenshot of the transfer receipt.";
            }
            setErrors(nextErrors);
            if (nextErrors.sender) senderRef.current?.focus();
            else if (nextErrors.reference) referenceRef.current?.focus();
            else if (nextErrors.file) fileRef.current?.focus();
            if (Object.keys(nextErrors).length) return;
            submittingProof.current = true;
            mutation.mutate(undefined, {
              onSettled: () => {
                submittingProof.current = false;
              },
            });
          }}
        >
          <div className="checkout-proof__form-heading">
            <p>{ar ? "الخطوة الأخيرة" : "Final step"}</p>
            <h3 id="proof-form-title">{ar ? "أرسلي إيصال التحويل." : "Send the receipt."}</h3>
            <span>
              {ar
                ? "صورة واضحة ورقما العملية والمرسل يكفيان للمراجعة."
                : "A clear receipt, sender, and transaction reference are all we need."}
            </span>
          </div>
          <div className="checkout-proof__field-grid">
            <label>
              <span>{ar ? "هاتف أو حساب المرسل" : "Sender phone or handle"}</span>
              <input
                ref={senderRef}
                type="text"
                inputMode="text"
                autoComplete="off"
                placeholder={ar ? "مثال: 01012345678" : "e.g. 01012345678 or your handle"}
                value={sender}
                aria-invalid={Boolean(errors.sender)}
                aria-describedby={errors.sender ? "proof-sender-error" : undefined}
                onChange={(event) => {
                  setSender(event.target.value);
                  if (errors.sender) setErrors((current) => ({ ...current, sender: "" }));
                }}
              />
              {errors.sender && (
                <small id="proof-sender-error" className="checkout-proof__field-error">
                  {errors.sender}
                </small>
              )}
            </label>
            <label>
              <span>{ar ? "رقم العملية" : "Transaction reference"}</span>
              <input
                ref={referenceRef}
                autoComplete="off"
                placeholder={
                  ar ? "الرقم الموجود في إيصال التحويل" : "Shown on your transfer receipt"
                }
                value={reference}
                aria-invalid={Boolean(errors.reference)}
                aria-describedby={errors.reference ? "proof-reference-error" : undefined}
                onChange={(event) => {
                  setReference(event.target.value);
                  if (errors.reference) setErrors((current) => ({ ...current, reference: "" }));
                }}
              />
              {errors.reference && (
                <small id="proof-reference-error" className="checkout-proof__field-error">
                  {errors.reference}
                </small>
              )}
            </label>
          </div>
          <label className="checkout-proof__file" data-selected={Boolean(file) || undefined}>
            <input
              ref={fileRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={(event) => {
                const selected = event.target.files?.[0] ?? null;
                if (selected && selected.size > 5 * 1024 * 1024) {
                  setFile(null);
                  setFileError(
                    ar
                      ? "اختاري صورة بحجم 5 ميجابايت أو أقل."
                      : "Choose an image that is 5 MB or smaller.",
                  );
                  event.target.value = "";
                  return;
                }
                setFile(selected);
                setFileError("");
                if (selected && errors.file) setErrors((current) => ({ ...current, file: "" }));
              }}
              aria-invalid={Boolean(errors.file || fileError)}
              aria-describedby={errors.file ? "proof-file-error" : "proof-help"}
            />
            <span className="checkout-proof__file-icon" aria-hidden="true">
              {file ? <FileCheck2 /> : <Upload />}
            </span>
            <span className="checkout-proof__file-copy">
              <strong>
                {file ? file.name : ar ? "أضيفي لقطة الإيصال" : "Add receipt screenshot"}
              </strong>
              <small id="proof-help">
                {file
                  ? `${(file.size / 1024 / 1024).toFixed(1)} MB · ${ar ? "اضغطي للاستبدال" : "Click to replace"}`
                  : `JPG, PNG or WebP · ${ar ? "حتى 5 ميجابايت" : "up to 5 MB"}`}
              </small>
            </span>
          </label>
          {errors.file && (
            <small id="proof-file-error" className="checkout-proof__field-error">
              {errors.file}
            </small>
          )}
          {fileError && (
            <p className="checkout-inline-error" role="alert">
              {fileError}
            </p>
          )}
          {mutation.error && (
            <p className="checkout-inline-error" role="alert">
              {apiErrorMessage(mutation.error, locale)}
            </p>
          )}
          <button className="checkout-primary-action" type="submit" disabled={mutation.isPending}>
            <Upload aria-hidden="true" />
            {mutation.isPending
              ? ar
                ? "جارٍ إرسال الإثبات…"
                : "Submitting proof…"
              : ar
                ? "إرسال للمراجعة"
                : "Submit for review"}
          </button>
        </form>
      </div>
    </section>
  );
}

function CopyValue({ value, locale }: { value: string; locale: "en" | "ar" }) {
  const [copied, setCopied] = useState(false);
  if (!value) return null;
  return (
    <button
      type="button"
      className="checkout-copy-value"
      onClick={() =>
        void navigator.clipboard.writeText(value).then(() => {
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1400);
        })
      }
    >
      <strong>{value}</strong>
      <Clipboard aria-hidden="true" />
      <span aria-live="polite">
        {copied ? (locale === "ar" ? "تم النسخ" : "Copied") : locale === "ar" ? "نسخ" : "Copy"}
      </span>
    </button>
  );
}

function PaymentSetup({
  locale,
  pending,
  error,
  retry,
}: {
  locale: "en" | "ar";
  pending: boolean;
  error: unknown;
  retry: () => void;
}) {
  const ar = locale === "ar";
  return (
    <section className="checkout-payment-setup" aria-live="polite">
      {pending ? (
        <>
          <span className="checkout-processing-line" aria-hidden="true">
            <i />
          </span>
          <p>{ar ? "تم تثبيت الطلب" : "Your order is secured"}</p>
          <h2>{ar ? "نجهّز بيانات التحويل." : "Preparing transfer details."}</h2>
          <div>
            {ar
              ? "أبقي هذه الصفحة مفتوحة. لن يتم إنشاء طلب ثانٍ."
              : "Keep this page open. No duplicate order will be created."}
          </div>
        </>
      ) : (
        <>
          <p>{ar ? "الطلب محفوظ" : "Order safely created"}</p>
          <h2>{ar ? "تعذر تجهيز بيانات التحويل." : "Transfer setup needs another try."}</h2>
          <div role="alert">{apiErrorMessage(error, locale)}</div>
          <button type="button" className="checkout-primary-action" onClick={retry}>
            {ar ? "إعادة تجهيز الدفع" : "Retry payment setup"}
          </button>
        </>
      )}
    </section>
  );
}

function CheckoutLoading({ locale }: { locale: "en" | "ar" }) {
  return (
    <div
      className="checkout-loading"
      aria-label={locale === "ar" ? "جارٍ تحميل إتمام الطلب" : "Loading checkout"}
    >
      <span />
      <span />
      <span />
    </div>
  );
}

function CheckoutGate({
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
    <div className="checkout-gate">
      <p>Secure checkout</p>
      <h1>{title}</h1>
      <div>{copy}</div>
      <Button asChild variant="solid" size="pill">
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
