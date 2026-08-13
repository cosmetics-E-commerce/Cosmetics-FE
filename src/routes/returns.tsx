import { createFileRoute } from "@tanstack/react-router";
import { PolicyPage } from "@/components/legal/PolicyPage";
import { createSeoHead } from "@/lib/seo";

export const Route = createFileRoute("/returns")({
  head: ({ match }) =>
    createSeoHead({
      title: match.search.lang === "ar" ? "الاسترجاع واسترداد الأموال" : "Returns & Refunds",
      description:
        match.search.lang === "ar"
          ? "شروط ومواعيد استرجاع منتجات بيوريزا واسترداد الأموال للمنتجات المؤهلة أو المعيبة."
          : "BIOREZA return windows, eligibility and refund process for eligible, faulty or incorrect products.",
      path: "/returns",
      locale: match.search.lang === "ar" ? "ar" : "en",
    }),
  component: Returns,
});
function Returns() {
  return (
    <PolicyPage
      eyebrow="Customer care"
      title="Returns & refunds"
      intro="We want every order to arrive correct, intact, and suitable for use. These terms do not limit mandatory consumer rights."
      sections={[
        {
          heading: "Change-of-mind returns",
          body: [
            "Contact us within 14 days of receiving an eligible item. It must be unused, unopened, sealed, and in its original saleable packaging. For health and hygiene reasons, opened cosmetics and personal-care products cannot be returned unless defective.",
          ],
        },
        {
          heading: "Faulty or incorrect items",
          body: [
            "Tell us within 30 days if an item is defective, damaged, expired, or different from what you ordered. Keep the item, packaging, batch number, and invoice while we investigate. We will arrange replacement or refund without additional cost where the claim is confirmed.",
          ],
        },
        {
          heading: "Refunds",
          body: [
            "Approved refunds are returned through the original payment method where possible. Manual-transfer refunds require verification of the receiving account. Bank processing times are outside our control; we will confirm when the refund is issued.",
          ],
        },
      ]}
      arabic={{
        eyebrow: "خدمة العملاء",
        title: "الاسترجاع واسترداد الأموال",
        intro:
          "نحرص على وصول كل طلب صحيحاً وسليماً ومناسباً للاستخدام، ولا تنتقص هذه الشروط من حقوق المستهلك الإلزامية.",
        sections: [
          {
            heading: "الاسترجاع دون عيب",
            body: [
              "تواصلي معنا خلال 14 يوماً من الاستلام. يجب أن يكون المنتج مؤهلاً وغير مستخدم أو مفتوح، مع سلامة الختم والعبوة الأصلية. لأسباب صحية لا يمكن إرجاع مستحضرات التجميل المفتوحة إلا إذا كانت معيبة.",
            ],
          },
          {
            heading: "المنتج المعيب أو الخاطئ",
            body: [
              "أبلغينا خلال 30 يوماً إذا كان المنتج معيباً أو تالفاً أو منتهي الصلاحية أو مختلفاً عن الطلب. احتفظي بالمنتج والعبوة ورقم التشغيلة والفاتورة حتى انتهاء الفحص.",
            ],
          },
          {
            heading: "رد المبلغ",
            body: [
              "يُعاد المبلغ بالطريقة الأصلية متى أمكن. يتطلب رد التحويل اليدوي التحقق من الحساب المستلم، وسنؤكد لك عند إصدار المبلغ.",
            ],
          },
        ],
      }}
    />
  );
}
