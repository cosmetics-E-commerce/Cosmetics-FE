import { AlertCircle, Check, ChevronLeft, Clipboard, Plus } from "lucide-react";
import { useState } from "react";
import { AddressForm } from "@/components/forms/AddressForm";
import { PolishedImage } from "@/components/ui/polished-image";
import type { AddressResponse, CreateAddressInput, PaymentInstruction } from "@/lib/api";
import { isAddressDeliveryReady } from "@/lib/checkout-flow";
import { paymentMethods, type PaymentMethod } from "@/lib/checkout-presentation";
import { formatPrice } from "@/lib/products";
import type { CartLine } from "@/lib/store";

export type GiftOption = {
  variantId: string;
  quantity: number;
  customerChooses: boolean;
  promotionId: string;
};

type StepHeaderProps = {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  copy: string;
  headingRef?: React.RefObject<HTMLHeadingElement | null> | undefined;
};

function StepHeader({ id, index, eyebrow, title, copy, headingRef }: StepHeaderProps) {
  return (
    <header className="checkout-step-header">
      <span aria-hidden="true">{index}</span>
      <div>
        <p>{eyebrow}</p>
        <h2 id={id} ref={headingRef} tabIndex={-1}>
          {title}
        </h2>
        <div>{copy}</div>
      </div>
    </header>
  );
}

export function DeliveryStep({
  locale,
  addresses,
  addressesLoading,
  addressesError,
  onRetryAddresses,
  selectedId,
  onSelect,
  addressStatus,
  editingAddress,
  addingAddress,
  onEditAddress,
  onAddAddress,
  onCancelAddress,
  onSaveAddress,
  addressMutationPending,
  addressMutationError,
  userName,
  userPhone,
  notes,
  onNotesChange,
  deliveryPending,
  deliveryError,
  onRetryDelivery,
  onContinue,
  headingRef,
}: {
  locale: "en" | "ar";
  addresses?: AddressResponse[] | undefined;
  addressesLoading: boolean;
  addressesError: boolean;
  onRetryAddresses: () => void;
  selectedId: string;
  onSelect: (address: AddressResponse) => void;
  addressStatus: string;
  editingAddress: AddressResponse | null;
  addingAddress: boolean;
  onEditAddress: (address: AddressResponse) => void;
  onAddAddress: () => void;
  onCancelAddress: () => void;
  onSaveAddress: (input: CreateAddressInput, addressId?: string) => Promise<void>;
  addressMutationPending: boolean;
  addressMutationError: string;
  userName: string;
  userPhone: string;
  notes: string;
  onNotesChange: (value: string) => void;
  deliveryPending: boolean;
  deliveryError: string;
  onRetryDelivery: () => void;
  onContinue: () => void;
  headingRef?: React.RefObject<HTMLHeadingElement | null> | undefined;
}) {
  const ar = locale === "ar";
  const showingEditor = addingAddress || Boolean(editingAddress);

  if (showingEditor) {
    return (
      <section
        className="checkout-step-panel checkout-step-panel--editor"
        aria-labelledby="delivery-editor-title"
      >
        <button type="button" className="checkout-back-link" onClick={onCancelAddress}>
          <ChevronLeft aria-hidden="true" />
          {ar ? "العودة إلى العناوين" : "Back to addresses"}
        </button>
        <StepHeader
          id="delivery-editor-title"
          index="01"
          eyebrow={ar ? "تفاصيل التوصيل" : "Delivery details"}
          title={
            editingAddress
              ? ar
                ? "حدّثي عنوانك."
                : "Update your address."
              : ar
                ? "أضيفي عنواناً."
                : "Add an address."
          }
          copy={
            ar
              ? "سنحتفظ بكل اختياراتك أثناء إضافة تفاصيل التوصيل."
              : "Your checkout selections stay exactly as they are while you add delivery details."
          }
        />
        <div className="checkout-address-form">
          <AddressForm
            key={editingAddress?.id ?? "new-address"}
            initialName={userName}
            initialPhone={userPhone}
            initialAddress={editingAddress ?? undefined}
            pending={addressMutationPending}
            submitLabel={
              editingAddress ? "Update and use this address" : "Save and use this address"
            }
            onCancel={onCancelAddress}
            onSubmit={(input) => onSaveAddress(input, editingAddress?.id)}
          />
          {addressMutationError && (
            <p className="checkout-inline-error" role="alert">
              {addressMutationError}
            </p>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="checkout-step-panel" aria-labelledby="delivery-step-title">
      <StepHeader
        id="delivery-step-title"
        index="01"
        eyebrow={ar ? "مكان التوصيل" : "Where should it go?"}
        title={ar ? "اختاري عنوان التوصيل." : "Choose a delivery address."}
        copy={
          ar
            ? "اختاري عنواناً محفوظاً أو أضيفي عنواناً جديداً لهذا الطلب."
            : "Select a saved address or add a new one for this order."
        }
        headingRef={headingRef}
      />

      {addressesLoading ? (
        <div
          className="checkout-address-skeleton"
          aria-label={ar ? "جارٍ تحميل العناوين" : "Loading delivery addresses"}
        >
          <span />
          <span />
        </div>
      ) : addressesError ? (
        <div className="checkout-recovery" role="alert">
          <AlertCircle aria-hidden="true" />
          <div>
            <h3>{ar ? "تعذر تحميل العناوين" : "Your addresses didn't load."}</h3>
            <p>
              {ar
                ? "اختيارات طلبك ما زالت محفوظة. حاولي تحميل العناوين مرة أخرى."
                : "Your checkout choices are still here. Try loading your saved addresses again."}
            </p>
            <button type="button" onClick={onRetryAddresses}>
              {ar ? "حاولي مرة أخرى" : "Try again"}
            </button>
          </div>
        </div>
      ) : (
        <>
          {addresses?.length ? (
            <div
              className="checkout-address-list"
              role="radiogroup"
              aria-label={ar ? "عنوان التوصيل" : "Delivery address"}
            >
              {addresses?.map((address) => {
                const ready = isAddressDeliveryReady(address);
                if (!ready) {
                  return (
                    <article className="checkout-address-card" data-invalid key={address.id}>
                      <span className="checkout-address-card__status">
                        <AlertCircle aria-hidden="true" />
                        {ar ? "يحتاج تحديثاً" : "Needs an update"}
                      </span>
                      <AddressCopy address={address} />
                      <div className="checkout-address-card__problem">
                        <p>
                          {ar
                            ? "اختاري المنطقة والمدينة المدعومتين حتى نتمكن من حساب التوصيل."
                            : "Choose a supported city and area so we can calculate delivery."}
                        </p>
                        <button type="button" onClick={() => onEditAddress(address)}>
                          {ar ? "تحديث العنوان" : "Update address"}
                        </button>
                      </div>
                    </article>
                  );
                }
                return (
                  <label
                    className="checkout-address-card"
                    data-selected={selectedId === address.id || undefined}
                    key={address.id}
                  >
                    <input
                      type="radio"
                      name="delivery-address"
                      checked={selectedId === address.id}
                      onChange={() => onSelect(address)}
                    />
                    <span className="checkout-option-control" aria-hidden="true">
                      <i />
                    </span>
                    <AddressCopy address={address} />
                    {address.isDefault && (
                      <span className="checkout-address-card__status">
                        {ar ? "الافتراضي" : "Default"}
                      </span>
                    )}
                  </label>
                );
              })}
            </div>
          ) : (
            <div className="checkout-empty-address">
              <p>
                {ar
                  ? "أضيفي عنواناً لنحسب التوصيل ونكمل طلبك."
                  : "Add an address so we can calculate delivery and continue your order."}
              </p>
            </div>
          )}

          <button type="button" className="checkout-add-action" onClick={onAddAddress}>
            <Plus aria-hidden="true" />
            {addresses?.length
              ? ar
                ? "إضافة عنوان آخر"
                : "Add another address"
              : ar
                ? "إضافة عنوان"
                : "Add delivery address"}
          </button>

          <label className="checkout-notes-field">
            <span>
              {ar ? "ملاحظة للمندوب" : "Note for the courier"}{" "}
              <small>{ar ? "اختياري" : "optional"}</small>
            </span>
            <textarea
              value={notes}
              onChange={(event) => onNotesChange(event.target.value)}
              maxLength={500}
              placeholder={ar ? "مثال: اتصل عند الوصول" : "For example: call when you arrive"}
            />
          </label>
        </>
      )}

      <p className="sr-only" role="status" aria-live="polite">
        {addressStatus}
      </p>
      {deliveryError && (
        <div className="checkout-inline-error" role="alert">
          <span>{deliveryError}</span>
          {selectedId && (
            <button type="button" onClick={onRetryDelivery}>
              {ar ? "إعادة المحاولة" : "Retry delivery"}
            </button>
          )}
        </div>
      )}

      <div className="checkout-step-actions">
        <button
          type="button"
          className="checkout-primary-action"
          disabled={deliveryPending || addressesLoading}
          onClick={onContinue}
        >
          {deliveryPending
            ? ar
              ? "جارٍ تأكيد التوصيل…"
              : "Confirming delivery…"
            : ar
              ? "المتابعة إلى الدفع"
              : "Continue to payment"}
          <span aria-hidden="true">→</span>
        </button>
        {deliveryPending && (
          <p>
            {ar
              ? "نحسب السعر وموعد التوصيل لهذا العنوان."
              : "We're confirming the price and timing for this address."}
          </p>
        )}
      </div>
    </section>
  );
}

export function PaymentStep({
  locale,
  method,
  onMethodChange,
  instructions,
  instructionsPending,
  instructionsError,
  onRetryInstructions,
  onBack,
  onContinue,
  headingRef,
}: {
  locale: "en" | "ar";
  method: PaymentMethod;
  onMethodChange: (method: PaymentMethod) => void;
  instructions?: PaymentInstruction[] | undefined;
  instructionsPending: boolean;
  instructionsError: boolean;
  onRetryInstructions: () => void;
  onBack: () => void;
  onContinue: () => void;
  headingRef?: React.RefObject<HTMLHeadingElement | null> | undefined;
}) {
  const ar = locale === "ar";
  const selectedInstruction = instructions?.find((item) => item.method === method && item.isActive);
  const transfer = method !== "CASH_ON_DELIVERY";

  return (
    <section className="checkout-step-panel" aria-labelledby="payment-step-title">
      <StepHeader
        id="payment-step-title"
        index="02"
        eyebrow={ar ? "طريقة الدفع" : "How would you like to pay?"}
        title={ar ? "اختاري طريقة الدفع." : "Choose a payment method."}
        copy={
          ar
            ? "لن تظهر إلا التفاصيل المطلوبة للطريقة التي تختارينها."
            : "You'll only see the details needed for the method you choose."
        }
        headingRef={headingRef}
      />
      <div
        className="checkout-payment-list"
        role="radiogroup"
        aria-label={ar ? "طريقة الدفع" : "Payment method"}
      >
        {paymentMethods.map((option) => (
          <label
            className="checkout-payment-card"
            data-selected={method === option.value || undefined}
            key={option.value}
          >
            <input
              type="radio"
              name="payment-method"
              checked={method === option.value}
              onChange={() => onMethodChange(option.value)}
            />
            <span className="checkout-option-control" aria-hidden="true">
              <i />
            </span>
            <span className="checkout-payment-card__logo">
              <img src={option.icon} alt="" />
            </span>
            <span className="checkout-payment-card__copy">
              <strong>{ar ? option.titleAr : option.title}</strong>
              <small>{ar ? option.descriptionAr : option.description}</small>
            </span>
          </label>
        ))}
      </div>

      {transfer && (
        <div className="checkout-transfer-disclosure" aria-live="polite">
          {instructionsPending ? (
            <div className="checkout-transfer-skeleton">
              <span />
              <span />
            </div>
          ) : instructionsError ? (
            <div className="checkout-recovery checkout-recovery--compact" role="alert">
              <AlertCircle aria-hidden="true" />
              <div>
                <h3>{ar ? "تعذر تحميل بيانات التحويل" : "Transfer details didn't load."}</h3>
                <button type="button" onClick={onRetryInstructions}>
                  {ar ? "حاولي مرة أخرى" : "Try again"}
                </button>
              </div>
            </div>
          ) : selectedInstruction ? (
            <TransferInstruction data={selectedInstruction} locale={locale} />
          ) : (
            <p>
              {ar
                ? "ستظهر بيانات التحويل الآمنة بعد تثبيت الطلب."
                : "Secure transfer details will appear after your order is placed."}
            </p>
          )}
          <p className="checkout-transfer-disclosure__safety">
            <Check aria-hidden="true" />
            {ar
              ? "نثبّت رقم طلبك أولاً، ثم نفتح رفع صورة التحويل. لن تُطلب منك حوالة بدون طلب محفوظ."
              : "We secure your order number first, then open proof upload. You won't be asked to transfer against an uncreated order."}
          </p>
        </div>
      )}

      <div className="checkout-step-actions checkout-step-actions--split">
        <button type="button" className="checkout-secondary-action" onClick={onBack}>
          {ar ? "العودة إلى التوصيل" : "Back to delivery"}
        </button>
        <button type="button" className="checkout-primary-action" onClick={onContinue}>
          {ar ? "مراجعة الطلب" : "Review order"}
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </section>
  );
}

export function ReviewStep({
  locale,
  address,
  method,
  notes,
  lines,
  selectableGifts,
  selectedGiftIds,
  onGiftChange,
  onEditDelivery,
  onEditPayment,
  onBack,
  canPlaceOrder,
  placingOrder,
  placeError,
  blockingMessage,
  onPlaceOrder,
  headingRef,
}: {
  locale: "en" | "ar";
  address: AddressResponse;
  method: PaymentMethod;
  notes: string;
  lines: CartLine[];
  selectableGifts: GiftOption[];
  selectedGiftIds: string[];
  onGiftChange: (gift: GiftOption) => void;
  onEditDelivery: () => void;
  onEditPayment: () => void;
  onBack: () => void;
  canPlaceOrder: boolean;
  placingOrder: boolean;
  placeError: string;
  blockingMessage: string;
  onPlaceOrder: () => void;
  headingRef?: React.RefObject<HTMLHeadingElement | null> | undefined;
}) {
  const ar = locale === "ar";
  const payment = paymentMethods.find((item) => item.value === method)!;

  return (
    <section className="checkout-step-panel" aria-labelledby="review-step-title">
      <StepHeader
        id="review-step-title"
        index="03"
        eyebrow={ar ? "المراجعة النهائية" : "One last look"}
        title={ar ? "راجعي طلبك." : "Review your order."}
        copy={
          ar
            ? "تأكدي من التوصيل والدفع والمنتجات قبل إنشاء الطلب."
            : "Check delivery, payment and products before the order is created."
        }
        headingRef={headingRef}
      />

      <div className="checkout-review-facts">
        <article>
          <header>
            <p>{ar ? "التوصيل" : "Delivery"}</p>
            <button type="button" onClick={onEditDelivery}>
              {ar ? "تعديل" : "Edit"}
            </button>
          </header>
          <AddressCopy address={address} />
          {notes && (
            <small>
              {ar ? "ملاحظة" : "Note"}: {notes}
            </small>
          )}
        </article>
        <article>
          <header>
            <p>{ar ? "الدفع" : "Payment"}</p>
            <button type="button" onClick={onEditPayment}>
              {ar ? "تعديل" : "Edit"}
            </button>
          </header>
          <div className="checkout-review-payment">
            <img src={payment.icon} alt="" />
            <strong>{ar ? payment.titleAr : payment.title}</strong>
          </div>
        </article>
      </div>

      <div className="checkout-review-products">
        <header>
          <p>{ar ? "المنتجات" : "Products"}</p>
          <span>
            {lines.reduce((total, line) => total + line.qty, 0)} {ar ? "قطعة" : "items"}
          </span>
        </header>
        <ul>
          {lines.map((line) => (
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

      {selectableGifts.length > 0 && (
        <fieldset className="checkout-gift-selection">
          <legend>{ar ? "اختاري هديتك المجانية" : "Choose your complimentary gift"}</legend>
          <p>
            {ar
              ? "اختيار واحد مطلوب لكل عرض مؤهل."
              : "One selection is required for each eligible offer."}
          </p>
          <div>
            {selectableGifts.map((gift) => (
              <label
                data-selected={selectedGiftIds.includes(gift.variantId) || undefined}
                key={gift.variantId}
              >
                <input
                  type="radio"
                  name={`gift-${gift.promotionId}`}
                  checked={selectedGiftIds.includes(gift.variantId)}
                  onChange={() => onGiftChange(gift)}
                />
                <span className="checkout-option-control" aria-hidden="true">
                  <i />
                </span>
                <span>
                  {ar ? "هدية ترويجية" : "Complimentary selection"} · {ar ? "الكمية" : "quantity"}{" "}
                  {gift.quantity}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      )}

      {placeError && (
        <p className="checkout-inline-error" role="alert">
          {placeError}
        </p>
      )}
      {!canPlaceOrder && blockingMessage && (
        <p className="checkout-blocking-copy">{blockingMessage}</p>
      )}

      <div className="checkout-step-actions checkout-step-actions--split">
        <button
          type="button"
          className="checkout-secondary-action"
          disabled={placingOrder}
          onClick={onBack}
        >
          {ar ? "العودة إلى الدفع" : "Back to payment"}
        </button>
        <button
          type="button"
          className="checkout-primary-action checkout-primary-action--final"
          disabled={!canPlaceOrder || placingOrder}
          aria-disabled={!canPlaceOrder || placingOrder}
          onClick={onPlaceOrder}
        >
          {placingOrder
            ? ar
              ? "جارٍ إنشاء طلبك…"
              : "Placing your order…"
            : ar
              ? "تأكيد الطلب"
              : "Place order"}
          {!placingOrder && <span aria-hidden="true">→</span>}
        </button>
      </div>
    </section>
  );
}

function AddressCopy({ address }: { address: AddressResponse }) {
  return (
    <span className="checkout-address-copy">
      <strong>{address.receiverName}</strong>
      <span>
        {address.building} {address.street}, {address.area}, {address.city}, {address.governorate}
      </span>
      <small>{address.phone}</small>
    </span>
  );
}

function TransferInstruction({ data, locale }: { data: PaymentInstruction; locale: "en" | "ar" }) {
  const [copied, setCopied] = useState(false);
  const value = data.accountNumber ?? data.phoneNumber ?? "";
  const ar = locale === "ar";
  return (
    <div className="checkout-transfer-instruction">
      <span>{ar ? "التحويل إلى" : "Transfer destination"}</span>
      <strong>{data.accountName}</strong>
      {value && (
        <button
          type="button"
          onClick={() =>
            void navigator.clipboard.writeText(value).then(() => {
              setCopied(true);
              window.setTimeout(() => setCopied(false), 1400);
            })
          }
        >
          <b>{value}</b>
          <Clipboard aria-hidden="true" />
          <small aria-live="polite">
            {copied ? (ar ? "تم النسخ" : "Copied") : ar ? "نسخ" : "Copy"}
          </small>
        </button>
      )}
      {data.notes && <p>{data.notes}</p>}
    </div>
  );
}
