import { Check } from "lucide-react";
import {
  checkoutSteps,
  checkoutStepIndex,
  isStepComplete,
  type CheckoutStep,
} from "@/lib/checkout-flow";

const labels = {
  en: {
    delivery: "Delivery",
    payment: "Payment",
    review: "Review",
    confirmation: "Confirmation",
  },
  ar: {
    delivery: "التوصيل",
    payment: "الدفع",
    review: "المراجعة",
    confirmation: "التأكيد",
  },
} as const;

export function CheckoutStepper({
  current,
  locale,
  furthest = current,
  completedThrough = current,
  allowConfirmationNavigation = false,
  onNavigate,
}: {
  current: CheckoutStep;
  locale: "en" | "ar";
  furthest?: CheckoutStep;
  completedThrough?: CheckoutStep;
  allowConfirmationNavigation?: boolean;
  onNavigate?: ((step: CheckoutStep) => void) | undefined;
}) {
  const furthestIndex = checkoutStepIndex(furthest);
  const completedThroughIndex = checkoutStepIndex(completedThrough);

  return (
    <nav
      className="checkout-stepper"
      aria-label={locale === "ar" ? "مراحل إتمام الطلب" : "Checkout progress"}
    >
      <ol>
        {checkoutSteps.map((step, index) => {
          const complete = isStepComplete(step, completedThrough);
          const active = step === current;
          const routeStep = step === "confirmation" && !allowConfirmationNavigation ? null : step;
          const navigable = Boolean(onNavigate && routeStep && !active && index <= furthestIndex);
          const content = (
            <>
              <span className="checkout-stepper__number" aria-hidden="true">
                {complete ? <Check /> : String(index + 1).padStart(2, "0")}
              </span>
              <span className="checkout-stepper__label">{labels[locale][step]}</span>
            </>
          );

          return (
            <li
              key={step}
              data-active={active || undefined}
              data-complete={complete || undefined}
              data-upcoming={index > completedThroughIndex || undefined}
              data-visited={index <= furthestIndex || undefined}
            >
              {navigable && routeStep ? (
                <button type="button" onClick={() => onNavigate?.(routeStep)}>
                  {content}
                </button>
              ) : (
                <span aria-current={active ? "step" : undefined}>{content}</span>
              )}
              {index < checkoutSteps.length - 1 && <i aria-hidden="true" />}
            </li>
          );
        })}
      </ol>
      <p className="sr-only" aria-live="polite">
        {locale === "ar" ? "الخطوة الحالية" : "Current step"}: {labels[locale][current]}
      </p>
    </nav>
  );
}
