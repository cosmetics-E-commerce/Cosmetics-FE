import { ChevronDown } from "lucide-react";
import { PolishedImage } from "@/components/ui/polished-image";
import type { AppliedPromotion, ShippingRate } from "@/lib/api";
import { formatDeliveryEstimate } from "@/lib/checkout-presentation";
import { formatPrice } from "@/lib/products";
import type { CartLine } from "@/lib/store";

type CheckoutSummaryProps = {
  lines: CartLine[];
  subtotal: number;
  discountTotal: number;
  estimatedTotal: number;
  promotions: AppliedPromotion[];
  shippingFee: number;
  shippingRate?: ShippingRate | undefined;
  shippingPending: boolean;
  shippingError?: unknown;
  onRetryShipping: () => void;
  locale: "en" | "ar";
};

export function CheckoutSummary(props: CheckoutSummaryProps) {
  const total = props.estimatedTotal + props.shippingFee;
  const title = props.locale === "ar" ? "ملخص الطلب" : "Order summary";

  return (
    <>
      <details className="checkout-summary-mobile">
        <summary>
          <span>
            <small>{title}</small>
            <strong>{formatPrice(total)}</strong>
          </span>
          <span className="checkout-summary-mobile__toggle">
            {props.locale === "ar" ? "التفاصيل" : "Details"}
            <ChevronDown aria-hidden="true" />
          </span>
        </summary>
        <SummaryContent {...props} />
      </details>
      <aside className="checkout-summary" aria-label={title}>
        <SummaryContent {...props} />
      </aside>
    </>
  );
}

function SummaryContent({
  lines,
  subtotal,
  discountTotal,
  estimatedTotal,
  promotions,
  shippingFee,
  shippingRate,
  shippingPending,
  shippingError,
  onRetryShipping,
  locale,
}: CheckoutSummaryProps) {
  const ar = locale === "ar";
  const total = estimatedTotal + shippingFee;

  return (
    <div className="checkout-summary__content">
      <header>
        <p>{ar ? "طلبك" : "Your order"}</p>
        <span>
          {lines.reduce((count, line) => count + line.qty, 0)} {ar ? "قطعة" : "items"}
        </span>
      </header>

      <ul className="checkout-summary__products">
        {lines.map((line) => (
          <li key={line.variantId}>
            <PolishedImage
              src={line.image}
              alt=""
              loading="lazy"
              width={58}
              height={72}
              sizes="58px"
              wrapperClassName="checkout-summary__image"
              className="size-full object-cover"
            />
            <span className="checkout-summary__product-copy">
              <strong title={line.name}>{line.name}</strong>
              <small>
                {line.size} · {ar ? "الكمية" : "Qty"} {line.qty}
              </small>
            </span>
            <span className="checkout-summary__line-price">
              {formatPrice(line.price * line.qty)}
            </span>
          </li>
        ))}
      </ul>

      <dl className="checkout-summary__totals">
        <div>
          <dt>{ar ? "المجموع الفرعي" : "Subtotal"}</dt>
          <dd>{formatPrice(subtotal)}</dd>
        </div>
        {promotions.map((promotion) => (
          <div className="checkout-summary__saving" key={promotion.id}>
            <dt>{promotion.title}</dt>
            <dd>−{formatPrice(promotion.discountAmount / 100)}</dd>
          </div>
        ))}
        {discountTotal > 0 && (
          <div>
            <dt>{ar ? "بعد العروض" : "After offers"}</dt>
            <dd>{formatPrice(estimatedTotal)}</dd>
          </div>
        )}
        <div>
          <dt>{ar ? "التوصيل" : "Delivery"}</dt>
          <dd aria-live="polite">
            {shippingPending
              ? ar
                ? "جارٍ الحساب…"
                : "Calculating…"
              : shippingRate
                ? formatPrice(shippingFee)
                : "—"}
          </dd>
        </div>
      </dl>

      {shippingRate && (
        <p className="checkout-summary__estimate">
          {ar ? "التوصيل المتوقع" : "Estimated delivery"}:{" "}
          {formatDeliveryEstimate(shippingRate, locale)}
        </p>
      )}

      {Boolean(shippingError) && (
        <div className="checkout-summary__error" role="alert">
          <span>{ar ? "تعذر حساب تكلفة التوصيل." : "We couldn't calculate delivery."}</span>
          <button type="button" onClick={onRetryShipping}>
            {ar ? "حاولي مرة أخرى" : "Try again"}
          </button>
        </div>
      )}

      <div className="checkout-summary__grand-total">
        <span>{ar ? "الإجمالي" : "Total"}</span>
        <strong>{formatPrice(total)}</strong>
      </div>
      <p className="checkout-summary__assurance">
        {ar
          ? "يتم تأكيد المخزون والعروض والتوصيل بأمان عند إنشاء الطلب."
          : "Stock, offers and delivery are securely confirmed when the order is placed."}
      </p>
    </div>
  );
}
