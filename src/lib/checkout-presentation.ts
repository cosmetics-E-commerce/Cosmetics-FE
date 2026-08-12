import type { ShippingRate } from "@/lib/api";

export type PaymentMethod = "CASH_ON_DELIVERY" | "INSTAPAY" | "VODAFONE_CASH";

export const paymentMethods: Array<{
  value: PaymentMethod;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  icon: string;
}> = [
  {
    value: "CASH_ON_DELIVERY",
    title: "Cash on delivery",
    titleAr: "الدفع عند الاستلام",
    description: "Pay the courier when your order arrives.",
    descriptionAr: "ادفعي للمندوب عند وصول طلبك.",
    icon: "/payment-methods/cash-sharp-svgrepo-com.svg",
  },
  {
    value: "INSTAPAY",
    title: "InstaPay",
    titleAr: "إنستاباي",
    description: "Secure your order, transfer, then submit proof.",
    descriptionAr: "ثبّتي طلبك ثم حوّلي المبلغ وأرسلي الإثبات.",
    icon: "/payment-methods/instapay.png",
  },
  {
    value: "VODAFONE_CASH",
    title: "Vodafone Cash",
    titleAr: "فودافون كاش",
    description: "Secure your order, transfer, then submit proof.",
    descriptionAr: "ثبّتي طلبك ثم حوّلي المبلغ وأرسلي الإثبات.",
    icon: "/payment-methods/vodafone-svgrepo-com.svg",
  },
];

export function paymentMethodName(method: PaymentMethod, locale: "en" | "ar") {
  const option = paymentMethods.find((item) => item.value === method)!;
  return locale === "ar" ? option.titleAr : option.title;
}

export function formatDeliveryEstimate(rate: ShippingRate, locale: "en" | "ar") {
  const parsed = new Date(rate.estimatedDeliveryDate);
  if (!Number.isNaN(parsed.getTime())) {
    return new Intl.DateTimeFormat(locale === "ar" ? "ar-EG" : "en-EG", {
      weekday: "short",
      day: "numeric",
      month: "short",
    }).format(parsed);
  }
  return locale === "ar"
    ? `خلال ${rate.estimatedDays} يوم`
    : `${rate.estimatedDays} business day${rate.estimatedDays === 1 ? "" : "s"}`;
}
