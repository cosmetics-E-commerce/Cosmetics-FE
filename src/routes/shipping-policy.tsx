import { createFileRoute } from "@tanstack/react-router";
import { PolicyPage } from "@/components/legal/PolicyPage";
export const Route = createFileRoute("/shipping-policy")({
  head: () => ({ meta: [{ title: "Shipping policy — BIOREZA Cosmetics" }] }),
  component: ShippingPolicy,
});
function ShippingPolicy() {
  return (
    <PolicyPage
      eyebrow="Customer care"
      title="Shipping policy"
      intro="Delivery cost and estimate are calculated from the active shipping zone shown during checkout."
      sections={[
        {
          heading: "Processing and estimates",
          body: [
            "Orders are processed after payment is confirmed, or immediately for accepted cash-on-delivery orders. The checkout estimate is not a guaranteed appointment; weekends, holidays, address verification, carrier conditions, and remote areas can affect delivery.",
          ],
        },
        {
          heading: "Tracking and delivery",
          body: [
            "We provide tracking when the carrier accepts the shipment. Please provide a reachable Egyptian phone number and inspect the parcel before accepting it when the carrier permits.",
          ],
        },
        {
          heading: "Failed delivery",
          body: [
            "A carrier may retry delivery. Repeated refusal, an unreachable recipient, or an incorrect address can result in return to sender and a new delivery charge before reshipment.",
          ],
        },
      ]}
      arabic={{
        eyebrow: "خدمة العملاء",
        title: "سياسة الشحن",
        intro: "تُحسب تكلفة ومدة التوصيل وفق منطقة الشحن النشطة الظاهرة أثناء إتمام الطلب.",
        sections: [
          {
            heading: "التجهيز والمدة المتوقعة",
            body: [
              "يبدأ تجهيز الطلب بعد تأكيد الدفع، أو فوراً لطلبات الدفع عند الاستلام المقبولة. المدة المعروضة تقديرية وقد تتأثر بالعطلات والتحقق من العنوان وظروف شركة الشحن والمناطق البعيدة.",
            ],
          },
          {
            heading: "التتبع والتسليم",
            body: [
              "نوفر التتبع عند استلام شركة الشحن للطلب. يرجى تقديم رقم هاتف مصري متاح وفحص الطرد قبل الاستلام عندما تسمح الشركة.",
            ],
          },
          {
            heading: "تعذر التسليم",
            body: [
              "قد تعيد شركة الشحن المحاولة. قد يؤدي رفض الطلب أو تعذر التواصل أو خطأ العنوان إلى إرجاعه وفرض تكلفة جديدة قبل إعادة الشحن.",
            ],
          },
        ],
      }}
    />
  );
}
