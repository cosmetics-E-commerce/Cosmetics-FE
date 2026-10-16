import { useEffect, useRef, useState, type ReactNode } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Banknote,
  Check,
  CheckCircle2,
  ChevronDown,
  Clipboard,
  LoaderCircle,
  Lock,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Truck,
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PolishedImage } from "@/components/ui/polished-image";
import { AddressForm, type AddressDraft } from "@/components/forms/AddressForm";
import { Logo } from "@/components/brand/Logo";
import { StatePanel } from "@/components/feedback/StatePanel";
import { PromoCodeControl } from "@/components/shop/PromoCodeControl";
import {
  apiErrorCode,
  apiErrorMessage,
  checkout,
  createAddress,
  createPayment,
  getCheckoutPreview,
  getGuestCheckoutPreview,
  listAddresses,
  listGuestPaymentInstructions,
  listPaymentInstructions,
  placeGuestOrder,
  rememberGuestOrder,
  startGuestCheckout,
  type AddressResponse,
  type GuestCheckoutSession,
  type GuestContact,
  uploadGuestPaymentProof,
  uploadPaymentProof,
  type CheckoutResult,
  type CreateAddressInput,
  type Payment,
} from "@/lib/api";
import { formatPrice } from "@/lib/products";
import { useStore } from "@/lib/store";
import { trackCommerceEvent } from "@/lib/analytics";
import { Reveal } from "@/components/motion/Primitives";
import { useI18n } from "@/lib/i18n";
import { createNoindexHead } from "@/lib/seo";
import { randomUuid } from "@/lib/uuid";
export const Route = createFileRoute("/checkout")({
  head: ({ match }) =>
    createNoindexHead(
      match.search.lang === "ar" ? "إتمام الطلب" : "Checkout",
      "/checkout",
      match.search.lang === "ar" ? "ar" : "en",
    ),
  component: Checkout,
});

const ADDRESS_FORM_ID = "checkout-address-form";
/** Quiet period after the last edit before a guest session is opened for the address. */
const GUEST_SESSION_DEBOUNCE_MS = 900;

const checkoutPaymentOptions = {
  en: [
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
  ],
  ar: [
    {
      value: "CASH_ON_DELIVERY",
      title: "الدفع عند الاستلام",
      copy: "ادفعي للمندوب عند وصول طلبك.",
      logo: null,
      logoClassName: "",
    },
    {
      value: "INSTAPAY",
      title: "إنستا باي",
      copy: "حوّلي المبلغ، ثم ارفعي صورة إثبات الدفع.",
      logo: "/payment-methods/instapay-logo.png",
      logoClassName: "sf-checkout-payment-logo--instapay",
    },
    {
      value: "VODAFONE_CASH",
      title: "فودافون كاش",
      copy: "حوّلي المبلغ، ثم ارفعي صورة إثبات الدفع.",
      logo: "/payment-methods/vodafone-icon.svg",
      logoClassName: "sf-checkout-payment-logo--vodafone",
    },
  ],
} as const;

const paymentCopy = {
  en: {
    notes: "Order notes",
    notesPlaceholder: "Optional delivery instructions",
    finalTotal: "Final total",
    place: "Place order",
    placing: "Placing order…",
  },
  ar: {
    notes: "ملاحظات الطلب",
    notesPlaceholder: "تعليمات توصيل اختيارية",
    finalTotal: "الإجمالي النهائي",
    place: "تأكيد الطلب",
    placing: "جارٍ تأكيد الطلب…",
  },
} as const;

function Checkout() {
  const { t } = useI18n();
  const {
    user,
    authHydrated,
    lines,
    subtotal,
    discountTotal,
    estimatedTotal,
    couponCode,
    appliedPromotions,
    giftOptions,
    locale,
  } = useStore();
  const navigate = useNavigate();
  const client = useQueryClient();
  const paymentLabels = paymentCopy[locale];
  const addresses = useQuery({
    queryKey: ["account", "addresses"],
    queryFn: listAddresses,
    enabled: Boolean(user),
  });
  const instructions = useQuery({
    queryKey: ["payment-instructions", user ? "customer" : "guest"],
    queryFn: user ? listPaymentInstructions : listGuestPaymentInstructions,
    enabled: authHydrated,
  });
  const [guestSession, setGuestSession] = useState<GuestCheckoutSession | null>(null);
  // Guests never press "continue": once their address is complete, a checkout session is
  // opened quietly so delivery is priced live. Signatures tie the session to the exact
  // address on screen; a failed address is not retried until it changes or they submit.
  const [guestDraft, setGuestDraft] = useState<AddressDraft | null>(null);
  const [guestSessionSignature, setGuestSessionSignature] = useState<string | null>(null);
  const [guestFailedSignature, setGuestFailedSignature] = useState<string | null>(null);
  const [guestRestored, setGuestRestored] = useState(false);
  const [editingRestoredGuest, setEditingRestoredGuest] = useState(false);
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [guestOrderToken, setGuestOrderToken] = useState<string | null>(null);
  // Guests have one address: the one their checkout session was opened with.
  const addressData = user ? addresses.data : guestSession ? [guestSession.address] : [];
  const addressesReady = user ? addresses.isSuccess : true;
  const [addressId, setAddressId] = useState("");
  const [method, setMethod] = useState("CASH_ON_DELIVERY");
  const [notes, setNotes] = useState("");
  const [giftVariantIds, setGiftVariantIds] = useState<string[]>([]);
  const [result, setResult] = useState<CheckoutResult | null>(null);
  const [payment, setPayment] = useState<Payment | null>(null);
  const [proofSubmitted, setProofSubmitted] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addressStatus, setAddressStatus] = useState("");
  const [addressRecoveryMessage, setAddressRecoveryMessage] = useState("");
  const [draftLoaded, setDraftLoaded] = useState(false);
  const [purchaseBarDocked, setPurchaseBarDocked] = useState(false);
  const deliverySection = useRef<HTMLElement>(null);
  const paymentSection = useRef<HTMLElement>(null);
  // Bring payment into view once delivery is settled, so the next action is
  // always on screen. Scrolled from an effect so it measures the layout after
  // the address form has collapsed, not before.
  const [paymentRevealRequest, setPaymentRevealRequest] = useState(0);
  const revealPayment = () => setPaymentRevealRequest((count) => count + 1);
  useEffect(() => {
    if (!paymentRevealRequest) return;
    paymentSection.current?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "start",
    });
  }, [paymentRevealRequest]);
  const initialLineCount = useRef(lines.length);
  const checkoutIdempotencyKey = useRef<string | null>(null);
  const paymentIdempotencyKey = useRef<string | null>(null);
  const placingOrder = useRef(false);
  const preparingPayment = useRef(false);
  const checkoutEndSentinel = useRef<HTMLSpanElement>(null);
  const idempotencyKey = (ref: { current: string | null }) => {
    ref.current ??= randomUuid();
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
  const guestStart = useMutation({
    mutationFn: ({
      contact,
      address,
    }: {
      contact: GuestContact;
      address: CreateAddressInput;
      signature: string;
    }) => startGuestCheckout(contact, address),
    onSuccess: (session, { signature }) => {
      setGuestSession(session);
      setGuestSessionSignature(signature);
      setGuestFailedSignature(null);
      window.sessionStorage.setItem("bioreza.guest-checkout", JSON.stringify(session));
      setAddressId(session.address.id);
      setAddressRecoveryMessage("");
      setAddressStatus(
        locale === "ar" ? "تم حساب التوصيل لعنوانك." : "Delivery is calculated for your address.",
      );
    },
    onError: (_error, { signature }) => setGuestFailedSignature(signature),
  });
  const addressMutation = useMutation({
    mutationFn: createAddress,
    onSuccess: (address) => {
      client.setQueryData<Awaited<ReturnType<typeof listAddresses>>>(
        ["account", "addresses"],
        (current = []) => [...current, address],
      );
      setAddressId(address.id);
      setShowAddressForm(false);
      setAddressRecoveryMessage("");
      setAddressStatus(
        locale === "ar"
          ? "تم حفظ العنوان واختياره لهذا الطلب."
          : "Address saved and selected for this order.",
      );
      revealPayment();
    },
  });
  useEffect(() => {
    trackCommerceEvent("checkout_started", {
      metadata: { lineCount: initialLineCount.current },
    });
  }, []);
  useEffect(() => {
    try {
      const savedGuest = window.sessionStorage.getItem("bioreza.guest-checkout");
      if (savedGuest) {
        const session = JSON.parse(savedGuest) as GuestCheckoutSession;
        if (new Date(session.expiresAt).getTime() > Date.now() + 60_000) {
          setGuestSession(session);
          setGuestRestored(true);
        } else {
          window.sessionStorage.removeItem("bioreza.guest-checkout");
        }
      }
    } catch {
      window.sessionStorage.removeItem("bioreza.guest-checkout");
    }
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
  const selectedAddressRecord = selectedUsableAddress(addressData, addressId);
  const selectedAddress = selectedAddressRecord?.id ?? "";
  const requestedAddressIsInvalid = Boolean(
    addressId &&
    addressesReady &&
    addressData &&
    !addressData.some((address) => address.id === addressId && isAddressDeliveryReady(address)),
  );
  const draftSignature = guestDraft ? JSON.stringify(guestDraft) : null;
  const guestReady =
    !user &&
    Boolean(guestSession) &&
    ((guestRestored && !editingRestoredGuest) ||
      (draftSignature !== null && draftSignature === guestSessionSignature));
  const deliveryReady = user ? Boolean(selectedAddress) : guestReady;
  const cartSignature = lines
    .map((line) => `${line.variantId}:${line.qty}:${line.price}:${line.discount}`)
    .join("|");
  const shippingRate = useQuery({
    queryKey: [
      "checkout",
      "preview",
      selectedAddress,
      method,
      cartSignature,
      couponCode,
      guestSession?.sessionId ?? null,
    ],
    queryFn: () =>
      user
        ? getCheckoutPreview(selectedAddress, method)
        : getGuestCheckoutPreview(guestSession!.sessionId, method),
    enabled: Boolean(authHydrated && deliveryReady && selectedAddress && lines.length && !result),
    retry: 1,
    staleTime: 0,
  });
  const shippingFee = shippingRate.data ? shippingRate.data.shippingCost / 100 : 0;
  const checkoutPreviewTotal = shippingRate.data
    ? shippingRate.data.total / 100
    : estimatedTotal + shippingFee;
  const previewSubtotal = shippingRate.data ? shippingRate.data.subtotal / 100 : subtotal;
  const previewDiscount = shippingRate.data ? shippingRate.data.discount / 100 : discountTotal;
  const previewAfterPromotions = previewSubtotal - previewDiscount;
  const previewPromotions = shippingRate.data?.appliedPromotions ?? appliedPromotions;
  const selectableGifts = giftOptions.filter((gift) => gift.customerChooses);
  const requiredGiftPromotions = new Set(selectableGifts.map((gift) => gift.promotionId));
  const selectedGiftPromotions = new Set(
    selectableGifts
      .filter((gift) => giftVariantIds.includes(gift.variantId))
      .map((gift) => gift.promotionId),
  );
  const requiresGift = requiredGiftPromotions.size > 0;
  const giftReady = [...requiredGiftPromotions].every((id) => selectedGiftPromotions.has(id));
  const canPlaceOrder = deliveryReady && giftReady && shippingRate.isSuccess;
  const manualPaymentSelected = isManualPayment(method);
  const startGuestSession = (draft: AddressDraft, force = false) => {
    if (!draft.contact) return Promise.resolve();
    const signature = JSON.stringify(draft);
    if (guestSession && signature === guestSessionSignature) return Promise.resolve();
    if (!force && signature === guestFailedSignature) return Promise.resolve();
    return guestStart
      .mutateAsync({
        contact: { ...draft.contact, phone: draft.address.phone },
        address: draft.address,
        signature,
      })
      .then(() => undefined)
      .catch(() => undefined);
  };
  const startGuestSessionRef = useRef(startGuestSession);
  startGuestSessionRef.current = startGuestSession;
  useEffect(() => {
    if (user || result || !guestDraft?.contact || guestStart.isPending) return;
    if (draftSignature === guestFailedSignature) return;
    if (guestSession && draftSignature === guestSessionSignature) return;
    const timer = window.setTimeout(
      () => void startGuestSessionRef.current(guestDraft),
      GUEST_SESSION_DEBOUNCE_MS,
    );
    return () => window.clearTimeout(timer);
  }, [
    draftSignature,
    guestDraft,
    guestFailedSignature,
    guestSession,
    guestSessionSignature,
    guestStart.isPending,
    result,
    user,
  ]);
  useEffect(() => {
    if (!requestedAddressIsInvalid) return;
    setAddressId("");
    setAddressRecoveryMessage(
      locale === "ar"
        ? "لم يعد عنوان التوصيل الذي اخترته متاحًا. اختاري عنوانًا صالحًا أو أضيفي عنوانًا جديدًا."
        : "Your previously selected delivery address is no longer available. Select a valid address or add a new one.",
    );
  }, [locale, requestedAddressIsInvalid]);
  useEffect(() => {
    if (!shippingRate.isError) return;
    const code = apiErrorCode(shippingRate.error);
    if (code === "GUEST_CHECKOUT_SESSION_EXPIRED") {
      window.sessionStorage.removeItem("bioreza.guest-checkout");
      setGuestSession(null);
      setGuestSessionSignature(null);
      setGuestRestored(false);
      setAddressId("");
      setAddressRecoveryMessage(
        locale === "ar"
          ? "انتهت جلسة الدفع. أدخلي بياناتك مرة أخرى."
          : "Your checkout session expired. Enter your details again.",
      );
      deliverySection.current?.scrollIntoView({ block: "start" });
      return;
    }
    if (code.startsWith("PROMO_") || code.startsWith("COUPON_")) {
      void client.invalidateQueries({ queryKey: ["cart"] });
    }
  }, [client, locale, shippingRate.error, shippingRate.isError]);
  const place = useMutation({
    mutationFn: async (): Promise<CheckoutResult & { guestOrderToken?: string }> =>
      user
        ? checkout(
            selectedAddress,
            method,
            notes.trim() || undefined,
            giftVariantIds,
            idempotencyKey(checkoutIdempotencyKey),
          )
        : placeGuestOrder(
            guestSession!.sessionId,
            method,
            notes.trim() || undefined,
            giftVariantIds,
            idempotencyKey(checkoutIdempotencyKey),
          ),
    onSuccess: (order) => {
      trackCommerceEvent("purchase_completed", { orderId: order.order.id });
      setResult(order);
      window.sessionStorage.removeItem("bioreza.checkout-draft");
      if (order.guestOrderToken) {
        window.sessionStorage.removeItem("bioreza.guest-checkout");
        setGuestOrderToken(order.guestOrderToken);
        rememberGuestOrder({
          token: order.guestOrderToken,
          orderNumber: order.order.orderNumber,
          placedAt: new Date().toISOString(),
          total: order.order.total ?? order.order.grandTotal ?? 0,
        });
      }
      void client.invalidateQueries({ queryKey: ["cart"] });
      if (method === "INSTAPAY" || method === "VODAFONE_CASH") {
        // Guests upload proof through their order link; the payment is resolved there.
        if (!order.guestOrderToken) startPaymentSetup(order.order.id, method);
      } else {
        void navigate({
          to: "/order-confirmed",
          search: {
            order: order.order.orderNumber,
            status: order.order.status,
            payment: order.order.paymentMethod,
            ...(order.guestOrderToken ? { token: order.guestOrderToken } : {}),
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
      if (code === "GUEST_CHECKOUT_SESSION_EXPIRED") {
        window.sessionStorage.removeItem("bioreza.guest-checkout");
        setGuestSession(null);
        setGuestSessionSignature(null);
        setGuestRestored(false);
        setAddressId("");
        deliverySection.current?.scrollIntoView({ block: "start" });
      }
      if (code.startsWith("PROMO_") || code.startsWith("COUPON_")) {
        void client.invalidateQueries({ queryKey: ["cart"] });
        void client.invalidateQueries({ queryKey: ["checkout", "preview"] });
      }
    },
  });
  const submitOrder = () => {
    if (!canPlaceOrder || result || placingOrder.current) return;
    placingOrder.current = true;
    place.mutate(undefined, {
      onSettled: () => {
        placingOrder.current = false;
      },
    });
  };
  // Like a hosted checkout's "Pay now": always pressable. Before delivery is ready it
  // validates the address form (and starts pricing) instead of placing anything.
  const requestPlaceOrder = () => {
    if (canPlaceOrder) return submitOrder();
    if (deliveryReady) return;
    const form = document.getElementById(ADDRESS_FORM_ID);
    if (form instanceof HTMLFormElement) form.requestSubmit();
    else deliverySection.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  // Only once the checkout itself is on screen (not the loading or empty-bag states),
  // so the docking observer below attaches to a rendered sentinel.
  const showPurchaseBar = !result && authHydrated && lines.length > 0;
  useEffect(() => {
    const sentinel = checkoutEndSentinel.current;
    if (!sentinel || !showPurchaseBar) {
      setPurchaseBarDocked(false);
      return;
    }

    const updateDockedState = (top: number) => setPurchaseBarDocked(top <= window.innerHeight);
    const observer = new IntersectionObserver(([entry]) => {
      if (entry) updateDockedState(entry.boundingClientRect.top);
    });
    observer.observe(sentinel);
    updateDockedState(sentinel.getBoundingClientRect().top);

    // WebKit can skip intersection callbacks after a resize, leaving the bar docked
    // off-screen; a frame-throttled scroll check keeps the state honest.
    let frame = 0;
    const handleViewportChange = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        updateDockedState(sentinel.getBoundingClientRect().top);
      });
    };
    window.addEventListener("resize", handleViewportChange, { passive: true });
    window.addEventListener("scroll", handleViewportChange, { passive: true });
    return () => {
      observer.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", handleViewportChange);
      window.removeEventListener("scroll", handleViewportChange);
    };
  }, [showPurchaseBar]);
  if (!authHydrated)
    return (
      <CheckoutFrame>
        <Loading />
      </CheckoutFrame>
    );
  if (!lines.length && !result)
    return (
      <CheckoutFrame>
        <Gate
          title={locale === "ar" ? "حقيبتك فارغة" : "Your bag is empty"}
          copy={
            locale === "ar"
              ? "أضيفي منتجًا متاحًا واحدًا على الأقل قبل إتمام الطلب."
              : "Add at least one available product before checkout."
          }
          to="/shop"
          action={locale === "ar" ? "تصفّحي المنتجات" : "Browse products"}
        />
      </CheckoutFrame>
    );
  const ar = locale === "ar";
  const itemCount = lines.reduce((sum, line) => sum + line.qty, 0);
  // A complete address that is not priced yet (typing pause or request in flight) reads
  // as "calculating", never as "enter your address".
  const deliveryPricing =
    guestStart.isPending ||
    addressMutation.isPending ||
    (!user && guestDraft !== null && draftSignature !== guestFailedSignature);
  const placeLabel = place.isPending
    ? paymentLabels.placing
    : deliveryReady && shippingRate.isSuccess
      ? `${paymentLabels.place} · ${formatPrice(checkoutPreviewTotal)}`
      : paymentLabels.place;
  // One plain sentence for why the order cannot be placed yet, shown under the button.
  const placeBlocker = !deliveryReady
    ? deliveryPricing
      ? ar
        ? "جارٍ حساب التوصيل…"
        : "Calculating delivery…"
      : ar
        ? "أكملي بيانات التوصيل بالأعلى."
        : "Complete your delivery details above."
    : shippingRate.isError
      ? null
      : !shippingRate.isSuccess
        ? ar
          ? "جارٍ حساب التوصيل…"
          : "Calculating delivery…"
        : requiresGift && !giftReady
          ? ar
            ? "اختاري هديتك المجانية للمتابعة."
            : "Choose your complimentary gift to continue."
          : null;
  const shippingStatus = !deliveryReady
    ? deliveryPricing
      ? "loading"
      : "waiting"
    : shippingRate.isError
      ? "error"
      : shippingRate.isSuccess
        ? "ready"
        : "loading";

  if (result && (payment || guestOrderToken) && manualPaymentSelected) {
    return (
      <CheckoutFrame>
        <div className="ck-after">
          <Proof
            payment={payment}
            guestToken={guestOrderToken}
            order={result}
            submitted={proofSubmitted}
            onSubmitted={() => setProofSubmitted(true)}
          />
        </div>
      </CheckoutFrame>
    );
  }
  if (result && manualPaymentSelected) {
    return (
      <CheckoutFrame>
        <div className="ck-after">
          <PaymentSetup
            pending={paymentSetup.isPending}
            error={paymentSetup.error}
            retry={() => startPaymentSetup(result.order.id, method)}
          />
        </div>
      </CheckoutFrame>
    );
  }

  return (
    <CheckoutFrame withMobileAction={showPurchaseBar}>
      <h1 className="sr-only">{ar ? "إتمام الطلب" : "Checkout"}</h1>
      <div className="ck-layout">
        <aside
          className="ck-summary"
          data-open={summaryOpen || undefined}
          aria-label={t("checkout.summary")}
        >
          <button
            type="button"
            className="ck-summary__toggle"
            aria-expanded={summaryOpen}
            aria-controls="ck-summary-body"
            onClick={() => setSummaryOpen((open) => !open)}
          >
            <span className="ck-summary__toggle-label">
              <ShoppingBag aria-hidden="true" />
              {summaryOpen
                ? ar
                  ? "إخفاء ملخص الطلب"
                  : "Hide order summary"
                : ar
                  ? "عرض ملخص الطلب"
                  : "Show order summary"}
              <ChevronDown aria-hidden="true" className="ck-summary__chevron" />
            </span>
            <strong>{formatPrice(checkoutPreviewTotal)}</strong>
          </button>
          <div id="ck-summary-body" className="ck-summary__body">
            <ul className="ck-items" aria-label={ar ? "منتجات الطلب" : "Order products"}>
              {lines.map((line) => (
                <li key={line.variantId} className="ck-item">
                  <span className="ck-item__thumb">
                    <PolishedImage
                      src={line.image}
                      alt=""
                      width={128}
                      height={128}
                      loading="lazy"
                      decoding="async"
                      wrapperClassName="ck-item__image"
                      className="size-full object-contain"
                    />
                    <span className="ck-item__qty" aria-label={ar ? "الكمية" : "Quantity"}>
                      {line.qty}
                    </span>
                  </span>
                  <span className="ck-item__copy">
                    <span className="ck-item__name">{line.name}</span>
                    {line.size && line.size !== line.name ? (
                      <span className="ck-item__meta">{line.size}</span>
                    ) : null}
                  </span>
                  <strong className="ck-item__price">{formatPrice(line.price * line.qty)}</strong>
                </li>
              ))}
            </ul>
            <div className="ck-promo sf-checkout-review-promo-control">
              <PromoCodeControl />
            </div>
            <dl className="ck-totals">
              <div>
                <dt>
                  {t("checkout.subtotal")}
                  <span className="ck-totals__count">
                    {ar
                      ? ` · ${itemCount} منتج`
                      : ` · ${itemCount} item${itemCount === 1 ? "" : "s"}`}
                  </span>
                </dt>
                <dd>{formatPrice(previewSubtotal)}</dd>
              </div>
              {previewPromotions.map((promotion) => (
                <div key={promotion.id} className="ck-totals__saving">
                  <dt>
                    {promotion.couponCode ? (
                      <bdi>{promotion.couponCode}</bdi>
                    ) : (
                      `${t("checkout.automaticOffer")}: ${promotion.title}`
                    )}
                  </dt>
                  <dd>
                    -{formatPrice((promotion.discountAmount + promotion.shippingDiscount) / 100)}
                  </dd>
                </div>
              ))}
              {previewDiscount > 0 && (
                <div>
                  <dt>{t("checkout.afterPromotions")}</dt>
                  <dd>{formatPrice(previewAfterPromotions)}</dd>
                </div>
              )}
              <div>
                <dt>{t("checkout.shipping")}</dt>
                <dd className={shippingStatus === "ready" ? undefined : "ck-totals__muted"}>
                  {shippingStatus === "ready"
                    ? shippingFee > 0
                      ? formatPrice(shippingFee)
                      : ar
                        ? "مجاني"
                        : "Free"
                    : shippingStatus === "loading"
                      ? ar
                        ? "جارٍ الحساب…"
                        : "Calculating…"
                      : ar
                        ? "يُحسب بعد العنوان"
                        : "Enter address"}
                </dd>
              </div>
              {shippingRate.data && shippingRate.data.codFee > 0 && (
                <div>
                  <dt>{t("checkout.codFee")}</dt>
                  <dd>{formatPrice(shippingRate.data.codFee / 100)}</dd>
                </div>
              )}
              <div className="ck-totals__total">
                <dt>{t("checkout.total")}</dt>
                <dd>{formatPrice(checkoutPreviewTotal)}</dd>
              </div>
            </dl>
            <Link to="/cart" className="ck-summary__edit">
              {ar ? "تعديل الحقيبة" : "Edit bag"}
            </Link>
          </div>
        </aside>

        <div className="ck-main">
          <section ref={deliverySection} className="ck-section" aria-labelledby="ck-delivery-title">
            <header className="ck-section__head">
              <h2 id="ck-delivery-title">{ar ? "التوصيل" : "Delivery"}</h2>
              {user ? (
                <span className="ck-section__aside">
                  {ar ? `مسجّلة باسم ${user.firstName}` : `Signed in as ${user.firstName}`}
                </span>
              ) : (
                <Link to="/sign-in" search={{ returnTo: "/checkout" }} className="ck-section__link">
                  {ar ? "تسجيل الدخول" : "Sign in"}
                </Link>
              )}
            </header>
            {!user && (
              <p className="ck-section__lede">
                {ar
                  ? "لا حاجة لحساب — سنرسل الفاتورة ورابط التتبع إلى بريدك."
                  : "No account needed — we'll email your receipt and tracking link."}
              </p>
            )}
            {user && addresses.isLoading ? (
              <div
                className="ck-skeletons"
                aria-label={ar ? "جارٍ تحميل عناوين التوصيل" : "Loading delivery addresses"}
              >
                <div />
                <div />
              </div>
            ) : user && addresses.isError ? (
              <StatePanel
                kind="error"
                title={ar ? "تعذر تحميل العناوين" : "Addresses did not load"}
                description={
                  ar
                    ? "تفاصيل طلبك محفوظة. حاولي تحميل عناوينك مرة أخرى."
                    : "Your checkout details are still here. Try loading your saved addresses again."
                }
                action={() => void addresses.refetch()}
                actionLabel={ar ? "حاولي مرة أخرى" : "Try again"}
                className="py-10"
              />
            ) : !user && guestRestored && guestSession && !editingRestoredGuest ? (
              <div className="ck-choice-list">
                <div className="ck-choice" data-active>
                  <span className="ck-choice__copy">
                    <strong>{guestSession.address.receiverName}</strong>
                    <span>
                      {guestSession.address.building} {guestSession.address.street},{" "}
                      {guestSession.address.area}, {guestSession.address.city},{" "}
                      {guestSession.address.governorate}
                    </span>
                    <span className="ck-choice__meta">{guestSession.address.phone}</span>
                  </span>
                  <button
                    type="button"
                    className="ck-section__link"
                    onClick={() => setEditingRestoredGuest(true)}
                  >
                    {ar ? "تغيير" : "Change"}
                  </button>
                </div>
              </div>
            ) : (
              <div>
                {user && Boolean(addressData?.length) && (
                  <div
                    className="ck-choice-list"
                    role="radiogroup"
                    aria-label={ar ? "عنوان التوصيل" : "Delivery address"}
                  >
                    {addressData?.map((address) => {
                      const ready = isAddressDeliveryReady(address);
                      return (
                        <label
                          key={address.id}
                          className="ck-choice"
                          data-active={selectedAddress === address.id || undefined}
                          data-disabled={!ready || undefined}
                        >
                          <input
                            type="radio"
                            data-form-control="choice-input"
                            name="delivery-address"
                            checked={selectedAddress === address.id}
                            disabled={!ready}
                            onChange={() => {
                              if (!ready) return;
                              setAddressId(address.id);
                              setAddressRecoveryMessage("");
                              setAddressStatus(
                                ar
                                  ? `تم اختيار ${address.receiverName} للتوصيل.`
                                  : `${address.receiverName} selected for delivery.`,
                              );
                            }}
                          />
                          <span className="ck-choice__copy">
                            <strong>{address.receiverName}</strong>
                            <span>
                              {address.building} {address.street}, {address.area}, {address.city},{" "}
                              {address.governorate}
                            </span>
                            <span className="ck-choice__meta">{address.phone}</span>
                            {!ready && (
                              <span className="ck-choice__warning">
                                {ar
                                  ? "يجب تحديث هذا العنوان قبل استخدامه للتوصيل."
                                  : "This address needs to be updated before it can be used for delivery."}
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
                {addressRecoveryMessage && (
                  <div className="ck-notice" role="alert">
                    {addressRecoveryMessage}
                  </div>
                )}
                {(!user || showAddressForm || !addressData?.length) && (
                  <div className={user && addressData?.length ? "ck-inline-form" : "ck-form"}>
                    {user && Boolean(addressData?.length) && (
                      <h3>{ar ? "عنوان جديد" : "New address"}</h3>
                    )}
                    <AddressForm
                      locale={locale}
                      formId={ADDRESS_FORM_ID}
                      foldOptional
                      initialName={user ? `${user.firstName} ${user.lastName}`.trim() : ""}
                      initialPhone={user?.phone ?? ""}
                      collectGuestContact={!user}
                      hideActions={!user}
                      pending={addressMutation.isPending}
                      {...(user
                        ? { submitLabel: ar ? "استخدمي هذا العنوان" : "Use this address" }
                        : {})}
                      {...(user && addressData?.length
                        ? { onCancel: () => setShowAddressForm(false) }
                        : {})}
                      {...(user ? {} : { onDraftChange: setGuestDraft })}
                      onSubmit={(input, contact) =>
                        user || !contact
                          ? addressMutation
                              .mutateAsync({
                                ...input,
                                isDefault: !addressData?.length,
                              })
                              .then(() => undefined)
                          : startGuestSession({ address: input, contact }, true)
                      }
                    />
                    {addressMutation.error && (
                      <p role="alert" className="ck-error">
                        {apiErrorMessage(addressMutation.error, locale)}
                      </p>
                    )}
                    {guestStart.error && (
                      <p role="alert" className="ck-error">
                        {apiErrorMessage(guestStart.error, locale)}{" "}
                        {apiErrorCode(guestStart.error) === "GUEST_CHECKOUT_ACCOUNT_EXISTS" && (
                          <Link
                            to="/sign-in"
                            search={{ returnTo: "/checkout" }}
                            className="underline"
                          >
                            {ar ? "تسجيل الدخول" : "Sign in"}
                          </Link>
                        )}
                      </p>
                    )}
                  </div>
                )}
                {user && Boolean(addressData?.length) && !showAddressForm && (
                  <button
                    type="button"
                    className="ck-text-action"
                    onClick={() => setShowAddressForm(true)}
                  >
                    <Plus aria-hidden="true" />
                    {ar
                      ? selectedAddress
                        ? "إضافة عنوان آخر"
                        : "إضافة عنوان محدّث"
                      : selectedAddress
                        ? "Add another address"
                        : "Add updated address"}
                  </button>
                )}
              </div>
            )}
          </section>

          <section className="ck-section" aria-labelledby="ck-shipping-title">
            <header className="ck-section__head">
              <h2 id="ck-shipping-title">{ar ? "طريقة الشحن" : "Shipping method"}</h2>
            </header>
            <div className="ck-shipping" data-status={shippingStatus} aria-live="polite">
              {shippingStatus === "ready" && shippingRate.data ? (
                <>
                  <span className="ck-shipping__icon">
                    <Truck aria-hidden="true" />
                  </span>
                  <span className="ck-shipping__copy">
                    <strong>{ar ? "توصيل قياسي" : "Standard delivery"}</strong>
                    <span>
                      {ar
                        ? `يصل خلال ${shippingRate.data.estimatedDays} يوم تقريبًا`
                        : `Arrives in about ${shippingRate.data.estimatedDays} day${
                            shippingRate.data.estimatedDays === 1 ? "" : "s"
                          }`}
                    </span>
                  </span>
                  <strong className="ck-shipping__price">
                    {shippingFee > 0 ? formatPrice(shippingFee) : ar ? "مجاني" : "Free"}
                  </strong>
                </>
              ) : shippingStatus === "loading" ? (
                <>
                  <LoaderCircle className="ck-spin" aria-hidden="true" />
                  <span className="ck-shipping__copy">
                    {ar ? "جارٍ حساب التوصيل لعنوانك…" : "Calculating delivery for your address…"}
                  </span>
                </>
              ) : shippingStatus === "error" ? (
                <span className="ck-shipping__copy" role="alert">
                  {apiErrorMessage(shippingRate.error, locale)}
                  <button
                    type="button"
                    className="ck-section__link"
                    onClick={() => void shippingRate.refetch()}
                  >
                    {ar ? "حاولي مرة أخرى" : "Try again"}
                  </button>
                </span>
              ) : (
                <span className="ck-shipping__copy">
                  {ar
                    ? "أدخلي عنوان التوصيل لعرض سعر وموعد الشحن."
                    : "Enter your delivery address to see shipping price and timing."}
                </span>
              )}
            </div>
          </section>

          <section ref={paymentSection} className="ck-section" aria-labelledby="ck-payment-title">
            <header className="ck-section__head">
              <h2 id="ck-payment-title">{ar ? "الدفع" : "Payment"}</h2>
            </header>
            <p className="ck-section__lede">
              <ShieldCheck aria-hidden="true" />
              {ar
                ? "مدفوعاتك آمنة. التحويلات تُراجع من فريقنا قبل التأكيد."
                : "Secure payment. Transfers are confirmed once our team reviews them."}
            </p>
            <div
              className="ck-payments"
              role="radiogroup"
              aria-label={ar ? "طريقة الدفع" : "Payment method"}
            >
              {checkoutPaymentOptions[locale].map((option) => {
                const active = method === option.value;
                const instruction = instructions.data?.find((item) => item.method === option.value);
                return (
                  <div key={option.value} className="ck-payment" data-active={active || undefined}>
                    <label className="ck-payment__row">
                      <input
                        type="radio"
                        name="payment-method"
                        data-form-control="choice-input"
                        checked={active}
                        onChange={() => setMethod(option.value)}
                      />
                      <strong>{option.title}</strong>
                      {option.logo ? (
                        <span
                          className={`ck-payment__logo ${option.logoClassName}`}
                          aria-hidden="true"
                        >
                          <img src={option.logo} alt="" width={48} height={32} />
                        </span>
                      ) : (
                        <span
                          className="ck-payment__logo ck-payment__logo--icon"
                          aria-hidden="true"
                        >
                          <Banknote />
                        </span>
                      )}
                    </label>
                    {active ? (
                      <div className="ck-payment__detail">
                        <p>{option.copy}</p>
                        {instruction ? <Instruction locale={locale} data={instruction} /> : null}
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
            {requiresGift && (
              <div className="ck-gifts">
                <p className="ck-subheading">
                  {ar ? "اختاري هديتك المجانية" : "Choose your complimentary gift"}
                </p>
                <div className="ck-choice-list">
                  {selectableGifts.map((gift) => (
                    <label
                      key={gift.variantId}
                      className="ck-choice"
                      data-active={giftVariantIds.includes(gift.variantId) || undefined}
                    >
                      <input
                        type="radio"
                        data-form-control="choice-input"
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
                      />
                      <span className="ck-choice__copy">
                        <strong>{ar ? "هدية العرض" : "Promotional gift"}</strong>
                        <span>{ar ? `الكمية ${gift.quantity}` : `Quantity ${gift.quantity}`}</span>
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}
            <details className="ck-notes" open={notes.length > 0 || undefined}>
              <summary>
                {ar ? "إضافة ملاحظة للطلب (اختياري)" : "Add a note to your order (optional)"}
              </summary>
              <textarea
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                maxLength={500}
                aria-label={paymentLabels.notes}
                placeholder={paymentLabels.notesPlaceholder}
              />
            </details>
          </section>

          <div className="ck-place">
            <Button
              type="button"
              variant="solid"
              size="wide"
              className="sf-checkout-place-order sf-checkout-place-order--inline ck-place__button"
              disabled={place.isPending}
              loading={place.isPending}
              onClick={requestPlaceOrder}
            >
              {placeLabel}
            </Button>
            {place.error ? (
              <p role="alert" className="ck-error">
                {apiErrorMessage(place.error, locale)}
              </p>
            ) : placeBlocker ? (
              <p className="ck-place__hint" role="status">
                {placeBlocker}
              </p>
            ) : (
              <p className="ck-place__hint ck-place__hint--secure">
                <Lock aria-hidden="true" />
                {ar
                  ? "سنؤكد طلبك فورًا ونرسل لك رابط التتبع."
                  : "We confirm your order right away and send you a tracking link."}
              </p>
            )}
          </div>
        </div>
      </div>
      {showPurchaseBar && (
        <div className="sf-checkout-purchase-boundary">
          <span ref={checkoutEndSentinel} className="sf-checkout-end-sentinel" aria-hidden="true" />
          <div
            className="mobile-primary-bar sf-checkout-mobile-purchase ck-mobile-bar"
            data-position={purchaseBarDocked ? "docked" : "fixed"}
          >
            <div className="ck-mobile-bar__inner">
              <div className="ck-mobile-bar__total">
                <p>{paymentLabels.finalTotal}</p>
                <strong>{formatPrice(checkoutPreviewTotal)}</strong>
              </div>
              <Button
                type="button"
                variant="solid"
                size="pill"
                className="sf-checkout-place-order sf-checkout-place-order--sticky ck-mobile-bar__button"
                aria-label={place.isPending ? paymentLabels.placing : paymentLabels.place}
                disabled={place.isPending}
                loading={place.isPending}
                onClick={requestPlaceOrder}
              >
                {place.isPending ? paymentLabels.placing : paymentLabels.place}
              </Button>
            </div>
          </div>
        </div>
      )}
    </CheckoutFrame>
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
  done = false,
}: {
  icon: ReactNode;
  eyebrow: string;
  title: string;
  copy: string;
  done?: boolean;
}) {
  return (
    <header className="sf-checkout-card__header" data-done={done || undefined}>
      <span className="sf-checkout-card__icon">{done ? <Check /> : icon}</span>
      <span>
        <span className="sf-checkout-eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
        <p>{copy}</p>
      </span>
    </header>
  );
}

function Proof({
  payment,
  guestToken,
  order,
  submitted,
  onSubmitted,
}: {
  payment: Payment | null;
  /** Guests have no payment record yet; their proof goes through the order link. */
  guestToken: string | null;
  order: CheckoutResult;
  submitted: boolean;
  onSubmitted: () => void;
}) {
  const amount =
    payment?.amount ??
    order.paymentInstructions?.amountDue ??
    order.order.total ??
    order.order.grandTotal ??
    0;
  const methodLabel = (payment?.method ?? order.order.paymentMethod).replaceAll("_", " ");
  const submittingProof = useRef(false);
  const [file, setFile] = useState<File | null>(null);
  const [sender, setSender] = useState("");
  const [reference, setReference] = useState("");
  const [fileError, setFileError] = useState("");
  const mutation = useMutation({
    mutationFn: async () => {
      if (!file) throw new Error("Choose a payment screenshot.");
      if (guestToken) {
        await uploadGuestPaymentProof(guestToken, file, sender, reference, amount);
        return;
      }
      if (!payment) throw new Error("Payment details are still loading.");
      await uploadPaymentProof(payment.id, file, sender, reference, amount);
    },
    onSuccess: onSubmitted,
  });
  if (submitted) {
    return (
      <section className="sf-checkout-pending" aria-live="polite">
        <span className="sf-checkout-pending__icon">
          <LoaderCircle />
        </span>
        <p className="sf-checkout-eyebrow">Payment</p>
        <h2>Payment pending</h2>
        <p>
          Your transfer proof was received. We will confirm the order as soon as our team approves
          the payment — you can follow it from your order page.
        </p>
        <dl>
          <div>
            <dt>Order</dt>
            <dd>{order.order.orderNumber}</dd>
          </div>
          <div>
            <dt>Payment</dt>
            <dd>{methodLabel}</dd>
          </div>
          <div>
            <dt>Status</dt>
            <dd>Pending</dd>
          </div>
        </dl>
        <div className="sf-checkout-pending__actions">
          {guestToken ? (
            <Button asChild variant="solid" size="pill" className="sf-checkout-black-button">
              <Link to="/order/$token" params={{ token: guestToken }}>
                View my order
              </Link>
            </Button>
          ) : (
            <>
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
            </>
          )}
        </div>
      </section>
    );
  }
  return (
    <div className="sf-checkout-proof">
      <div className="sf-checkout-card">
        <CheckoutCardHeader
          icon={<CheckCircle2 />}
          eyebrow="Payment"
          title="Transfer details"
          copy={`Order ${order.order.orderNumber} is created and waiting for proof.`}
        />
        <p className="sf-checkout-proof__amount">
          Transfer exactly {formatPrice(amount / 100)} and keep the transaction reference.
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
                if (selected && selected.size > 5 * 1024 * 1024) {
                  setFile(null);
                  setFileError("Choose an image smaller than 5 MB.");
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
              JPG, PNG or WebP, up to 5 MB.
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
  locale,
  data,
}: {
  locale: "ar" | "en";
  data: {
    accountName: string;
    accountNumber: string | null;
    phoneNumber: string | null;
    notes: string | null;
  };
}) {
  return (
    <div className="mt-5 border border-gold/30 bg-ivory p-5 text-sm">
      <p className="font-medium">
        {locale === "ar" ? `حوّلي إلى ${data.accountName}` : `Transfer to ${data.accountName}`}
      </p>
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
          <p className="sf-checkout-eyebrow">Payment</p>
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

function CheckoutFrame({
  children,
  withMobileAction = false,
}: {
  children: ReactNode;
  withMobileAction?: boolean;
}) {
  const { locale, setLocale, lines } = useStore();
  const ar = locale === "ar";
  // The bag is restored in the browser; the server always renders it empty, so the
  // count appears only after mount to keep server and first client markup identical.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const count = mounted ? lines.reduce((sum, line) => sum + line.qty, 0) : 0;
  return (
    <div
      className={`sf-checkout-page ck${withMobileAction ? " sf-checkout-page--with-mobile-action" : ""}`}
    >
      <header className="ck-header">
        <div className="ck-header__inner">
          <span className="ck-header__logo">
            <Logo size="sm" />
          </span>
          <span className="ck-header__secure">
            <Lock aria-hidden="true" />
            {ar ? "دفع آمن" : "Secure checkout"}
          </span>
          <div className="ck-header__actions">
            <button
              type="button"
              className="ck-header__locale"
              onClick={() => setLocale(ar ? "en" : "ar")}
              aria-label={ar ? "Switch to English" : "التبديل إلى العربية"}
            >
              {ar ? "EN" : "ع"}
            </button>
            <Link
              to="/cart"
              className="ck-header__bag"
              aria-label={
                ar ? `الحقيبة، ${count} منتج` : `Bag, ${count} item${count === 1 ? "" : "s"}`
              }
            >
              <ShoppingBag aria-hidden="true" />
              {count > 0 ? <span>{count}</span> : null}
            </Link>
          </div>
        </div>
      </header>
      {children}
      <footer className="ck-footer">
        <nav aria-label={ar ? "سياسات المتجر" : "Store policies"}>
          <Link to="/returns">{ar ? "سياسة الاسترجاع" : "Refund policy"}</Link>
          <Link to="/shipping-policy">{ar ? "الشحن" : "Shipping"}</Link>
          <Link to="/privacy-policy">{ar ? "الخصوصية" : "Privacy policy"}</Link>
          <Link to="/terms">{ar ? "الشروط" : "Terms of service"}</Link>
          <Link to="/contact">{ar ? "تواصلي معنا" : "Contact"}</Link>
        </nav>
      </footer>
    </div>
  );
}
