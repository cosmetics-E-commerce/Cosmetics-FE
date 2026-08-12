export const checkoutSteps = ["delivery", "payment", "review", "confirmation"] as const;

export type CheckoutStep = (typeof checkoutSteps)[number];
export type CheckoutRouteStep = Exclude<CheckoutStep, "confirmation">;

export type CheckoutSuccessSnapshot = {
  orderNumber: string;
  amount: number;
  paymentMethod: string;
  recipient: string;
  destination: string;
  deliveryEstimate: string;
};

const SUCCESS_KEY = "bioreza.checkout-success";

export function parseCheckoutStep(value: unknown): CheckoutRouteStep | undefined {
  return value === "delivery" || value === "payment" || value === "review" ? value : undefined;
}

export function checkoutStepIndex(step: CheckoutStep) {
  return checkoutSteps.indexOf(step);
}

export function isStepComplete(step: CheckoutStep, current: CheckoutStep) {
  return checkoutStepIndex(step) < checkoutStepIndex(current);
}

export function canVisitCheckoutStep(
  step: CheckoutRouteStep,
  state: { hasDelivery: boolean; hasPayment: boolean },
) {
  if (step === "delivery") return true;
  if (step === "payment") return state.hasDelivery;
  return state.hasDelivery && state.hasPayment;
}

export function isAddressDeliveryReady(address: {
  bostaGovernorateId: string | null;
  bostaCityId: string | null;
  bostaZoneId: string | null;
}) {
  return Boolean(address.bostaGovernorateId && address.bostaCityId && address.bostaZoneId);
}

export function saveCheckoutSuccess(snapshot: CheckoutSuccessSnapshot) {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(SUCCESS_KEY, JSON.stringify(snapshot));
}

export function readCheckoutSuccess(orderNumber?: string) {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(SUCCESS_KEY);
    if (!raw) return null;
    const value = JSON.parse(raw) as CheckoutSuccessSnapshot;
    return !orderNumber || value.orderNumber === orderNumber ? value : null;
  } catch {
    window.sessionStorage.removeItem(SUCCESS_KEY);
    return null;
  }
}
