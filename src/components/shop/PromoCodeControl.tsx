import { Check, Tag } from "lucide-react";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";

import { formatPrice } from "@/lib/products";
import { useI18n } from "@/lib/i18n";
import { useStore } from "@/lib/store";
import { normalizeStoreApiError } from "@/lib/error-system";

export function PromoCodeControl() {
  const { t, locale } = useI18n();
  const instanceId = useId();
  const inputId = `${instanceId}-promo-code`;
  const errorId = `${instanceId}-promo-code-error`;
  const { couponCode, couponInvalidation, appliedPromotions, applyCoupon, removeCoupon } =
    useStore();
  const [code, setCode] = useState("");
  const [editing, setEditing] = useState(!couponCode);
  const [replacement, setReplacement] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [pending, setPending] = useState(false);
  const requestPending = useRef(false);

  useEffect(() => {
    if (!couponCode) setEditing(true);
  }, [couponCode]);

  const couponPromotion = appliedPromotions.find(
    (promotion) => promotion.couponCode?.toUpperCase() === couponCode?.toUpperCase(),
  );
  const couponSavings = couponPromotion
    ? (couponPromotion.discountAmount + couponPromotion.shippingDiscount) / 100
    : 0;
  const invalidationMessage = (() => {
    if (!couponInvalidation) return "";
    const minimum = couponInvalidation.details?.["minimumSubtotal"];
    if (couponInvalidation.code === "PROMO_MIN_SPEND_NOT_MET" && typeof minimum === "number") {
      return locale === "ar"
        ? `لم يعد رمز الخصم صالحاً لأن حقيبتك أقل من الحد الأدنى ${formatPrice(minimum / 100)}.`
        : `no longer applies because your cart is below the ${formatPrice(minimum / 100)} minimum.`;
    }
    if (couponInvalidation.code === "PROMO_NOT_APPLICABLE") {
      return t("cart.promoNoLongerApplicable");
    }
    return normalizeStoreApiError(couponInvalidation, 409, locale).message;
  })();

  const apply = async (nextCode: string) => {
    if (requestPending.current) return;
    requestPending.current = true;
    setPending(true);
    setError("");
    setStatus("");
    const result = await applyCoupon(nextCode);
    if (result.ok) {
      setCode("");
      setReplacement(null);
      setEditing(false);
      setStatus(
        locale === "ar"
          ? `تم تطبيق رمز الخصم ${nextCode.toUpperCase()}.`
          : `Promo code ${nextCode.toUpperCase()} applied.`,
      );
    } else {
      setError(
        result.code === "NETWORK_UNAVAILABLE" || result.code === "NETWORK_ERROR"
          ? locale === "ar"
            ? "تعذر تطبيق رمز الخصم. حاولي مرة أخرى."
            : "Couldn't apply the promo code. Try again."
          : result.error,
      );
    }
    setPending(false);
    requestPending.current = false;
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalized = code.trim().toUpperCase();
    if (!normalized) {
      setError(locale === "ar" ? "أدخلي رمز الخصم أولاً." : "Enter a promo code first.");
      return;
    }
    if (couponCode && normalized === couponCode.toUpperCase()) {
      setError(
        locale === "ar" ? "رمز الخصم هذا مطبق بالفعل." : "This promo code is already applied.",
      );
      return;
    }
    if (couponCode) {
      setReplacement(normalized);
      setError("");
      return;
    }
    void apply(normalized);
  };

  const remove = async () => {
    if (requestPending.current) return;
    requestPending.current = true;
    setPending(true);
    const removedCode = couponCode;
    const result = await removeCoupon();
    setPending(false);
    requestPending.current = false;
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setEditing(true);
    setStatus(
      locale === "ar"
        ? `تمت إزالة رمز الخصم ${removedCode ?? ""}.`
        : `Promo code ${removedCode ?? ""} removed.`,
    );
  };

  return (
    <section className="sf-promo-code">
      <div className="sf-promo-code__heading">
        <span className="sf-promo-code__icon" aria-hidden="true">
          <Tag />
        </span>
        <h3>{t("cart.promo")}</h3>
      </div>

      {couponInvalidation ? (
        <p className="sf-promo-code__notice" role="status">
          <bdi>{couponInvalidation.promoCode}</bdi> {invalidationMessage}
        </p>
      ) : null}

      {couponCode && !editing ? (
        <div className="sf-promo-code__applied" role="status">
          <div className="sf-promo-code__applied-copy">
            <strong>
              <bdi>{couponCode}</bdi> <Check aria-hidden="true" />
            </strong>
            <span>{couponPromotion?.title || t("cart.promoApplied")}</span>
            {couponSavings > 0 ? (
              <small>
                {t("cart.youSaved")} {formatPrice(couponSavings)}
              </small>
            ) : null}
          </div>
          <div className="sf-promo-code__actions">
            <button type="button" disabled={pending} onClick={() => setEditing(true)}>
              {t("cart.changePromo")}
            </button>
            <button type="button" disabled={pending} onClick={() => void remove()}>
              {t("cart.removePromo")}
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={submit} aria-busy={pending || undefined} noValidate>
          <label htmlFor={inputId}>{t("cart.promo")}</label>
          <div className="sf-promo-code__form-row">
            <input
              id={inputId}
              value={code}
              disabled={pending}
              onChange={(event) => {
                setCode(event.target.value);
                setError("");
                setReplacement(null);
              }}
              placeholder={t("cart.promoPlaceholder")}
              autoComplete="off"
              autoCapitalize="characters"
              spellCheck={false}
              aria-invalid={Boolean(error)}
              aria-describedby={error ? errorId : undefined}
            />
            <button type="submit" disabled={pending || !code.trim()}>
              {pending ? t("cart.applyingPromo") : t("cart.applyPromo")}
            </button>
          </div>
          {replacement && couponCode ? (
            <div className="sf-promo-code__replace" role="alert" aria-live="polite">
              <p>
                {locale === "ar" ? "هل تريدين استبدال" : "Replace"} <bdi>{couponCode}</bdi>{" "}
                {locale === "ar" ? "بالرمز" : "with"} <bdi>{replacement}</bdi>?
              </p>
              <div>
                <button type="button" disabled={pending} onClick={() => void apply(replacement)}>
                  {t("cart.confirmReplacePromo")}
                </button>
                <button type="button" disabled={pending} onClick={() => setReplacement(null)}>
                  {t("cart.cancelReplacePromo")}
                </button>
              </div>
            </div>
          ) : null}
          {error ? (
            <p id={errorId} role="alert" className="sf-promo-code__error">
              {error}
            </p>
          ) : null}
        </form>
      )}
      <span className="sr-only" aria-live="polite" aria-atomic="true">
        {pending ? t("cart.applyingPromo") : status}
      </span>
    </section>
  );
}
