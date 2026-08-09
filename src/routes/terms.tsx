import { createFileRoute } from "@tanstack/react-router";
import { PolicyPage } from "@/components/legal/PolicyPage";
export const Route = createFileRoute("/terms")({
  head: () => ({ meta: [{ title: "Terms & conditions — BIOREZA Cosmetics" }] }),
  component: Terms,
});
function Terms() {
  return (
    <PolicyPage
      eyebrow="Legal"
      title="Terms & conditions"
      intro="These terms govern use of the BIOREZA storefront and purchases delivered in Egypt."
      sections={[
        {
          heading: "Orders",
          body: [
            "Submitting checkout is an offer to purchase. An order is accepted when we confirm it for fulfilment. We may cancel and refund an order affected by stock, pricing, fraud, delivery, or legal restrictions.",
          ],
        },
        {
          heading: "Payments",
          body: [
            "Manual transfers must match the order amount and arrive before the displayed deadline. Uploaded proof does not itself confirm payment; staff verification does. Cash on delivery remains subject to zone and risk eligibility.",
          ],
        },
        {
          heading: "Products and use",
          body: [
            "Images may vary slightly by screen and packaging cycle. Ingredient lists can change; always read the product label and stop use if irritation occurs. Store content is general information, not medical advice.",
          ],
        },
        {
          heading: "Liability and disputes",
          body: [
            "Nothing in these terms excludes rights or liabilities that cannot lawfully be excluded. Contact customer care first so we can investigate. Egyptian law governs where applicable.",
          ],
        },
      ]}
      arabic={{
        eyebrow: "قانوني",
        title: "الشروط والأحكام",
        intro: "تحكم هذه الشروط استخدام متجر بيوريزا والمشتريات التي يتم توصيلها داخل مصر.",
        sections: [
          {
            heading: "الطلبات",
            body: [
              "إرسال الطلب عرض للشراء، ويُقبل عند تأكيد تجهيزه. قد نلغي الطلب ونرد قيمته عند وجود مشكلة مخزون أو سعر أو احتيال أو توصيل أو قيد قانوني.",
            ],
          },
          {
            heading: "الدفع",
            body: [
              "يجب أن يطابق التحويل اليدوي قيمة الطلب وأن يصل قبل الموعد الظاهر. رفع الإثبات لا يعني تأكيد الدفع؛ التأكيد يتم بعد المراجعة. الدفع عند الاستلام يخضع لأهلية المنطقة والمخاطر.",
            ],
          },
          {
            heading: "المنتجات والاستخدام",
            body: [
              "قد تختلف الصور قليلاً حسب الشاشة ودورة التغليف. قد تتغير المكونات؛ اقرئي الملصق دائماً وتوقفي عند حدوث تهيج. المحتوى معلومات عامة وليس نصيحة طبية.",
            ],
          },
          {
            heading: "المسؤولية والنزاعات",
            body: [
              "لا تستبعد هذه الشروط الحقوق أو المسؤوليات التي لا يجوز استبعادها قانوناً. تواصلي أولاً مع خدمة العملاء للتحقيق، ويطبق القانون المصري حيث يلزم.",
            ],
          },
        ],
      }}
    />
  );
}
