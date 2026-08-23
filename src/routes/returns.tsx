import { createFileRoute } from "@tanstack/react-router";
import {
  CustomerCarePhone,
  InformationPage,
  InformationSection,
  PolicyList,
} from "@/components/content/InformationPage";
import { breadcrumbSchema, createSeoHead, jsonLd } from "@/lib/seo";
import { useStore } from "@/lib/store";

const sections = [
  { id: "accepted", label: "Accepted cases" },
  { id: "not-accepted", label: "Non-accepted cases" },
  { id: "conditions", label: "Return conditions" },
  { id: "refunds", label: "Refunds" },
  { id: "process", label: "Return process" },
  { id: "fees", label: "Return shipping fees" },
];
const sectionsAr = [
  { id: "accepted", label: "الحالات المقبولة" },
  { id: "not-accepted", label: "الحالات غير المقبولة" },
  { id: "conditions", label: "شروط الإرجاع" },
  { id: "refunds", label: "استرداد المبلغ" },
  { id: "process", label: "خطوات الإرجاع" },
  { id: "fees", label: "رسوم شحن الإرجاع" },
];

export const Route = createFileRoute("/returns")({
  head: ({ match }) => {
    const ar = match.search.lang === "ar";
    return {
      ...createSeoHead({
        title: ar ? "الإرجاع والاستبدال" : "Returns & Exchanges",
        description: ar
          ? "تعرّفي على أهلية الإرجاع والاستبدال وفترة الطلب البالغة 14 يوماً وخطوات استرداد المبلغ."
          : "Understand BioReza return and exchange eligibility, the 14-day request period, refunds, and the step-by-step return process.",
        path: "/returns",
        locale: ar ? "ar" : "en",
      }),
      scripts: [
        jsonLd(
          breadcrumbSchema([
            { name: ar ? "الرئيسية" : "Home", path: "/" },
            { name: ar ? "الإرجاع والاستبدال" : "Returns & Exchanges", path: "/returns" },
          ]),
        ),
      ],
    };
  },
  component: ReturnsAndExchanges,
});

function ReturnsAndExchanges() {
  const { locale } = useStore();
  const ar = locale === "ar";
  return (
    <InformationPage
      eyebrow={ar ? "خدمة العملاء" : "Customer care"}
      title={ar ? "الإرجاع والاستبدال" : "Returns & exchanges"}
      intro={
        ar
          ? "رضاكِ أولوية لدينا. ونظراً لطبيعة منتجات العناية بالبشرة والشعر ومستحضرات التجميل، تطبق شروط محددة على الإرجاع والاستبدال."
          : "At BioReza, customer satisfaction is our priority. Due to the nature of skincare, haircare, and cosmetic products, certain conditions apply to returns and exchanges."
      }
      sections={ar ? sectionsAr : sections}
    >
      <InformationSection
        id="accepted"
        title={ar ? "يُقبل الإرجاع أو الاستبدال عندما" : "Returns & exchanges are accepted when"}
      >
        <p>
          {ar
            ? "يمكن طلب الإرجاع أو الاستبدال في الحالات التالية:"
            : "A customer may request a return or exchange if:"}
        </p>
        <PolicyList tone="positive">
          <li>{ar ? "استلام منتج غير صحيح." : "The wrong product was received."}</li>
          <li>
            {ar ? "وصول المنتج تالفاً أو معيباً." : "The product arrived damaged or defective."}
          </li>
          <li>
            {ar
              ? "كان المنتج مفتوحاً أو مستخدماً قبل التسليم."
              : "The product was opened or used before delivery."}
          </li>
          <li>
            {ar
              ? "المنتج ناقص أو تنقصه بعض محتوياته."
              : "The product is missing items or is incomplete."}
          </li>
          <li>
            {ar
              ? "المنتج المستلم مختلف عن الطلب."
              : "The received product is different from the order."}
          </li>
        </PolicyList>
      </InformationSection>

      <InformationSection
        id="not-accepted"
        title={
          ar ? "لا يُقبل الإرجاع أو الاستبدال عندما" : "Returns & exchanges are not accepted when"
        }
      >
        <p>
          {ar
            ? "لأسباب تتعلق بالنظافة والسلامة، لا يمكن قبول الطلب في الحالات التالية:"
            : "For hygiene and safety reasons, returns or exchanges cannot be accepted if:"}
        </p>
        <PolicyList tone="restricted">
          <li>
            {ar
              ? "فُتح المنتج أو استُخدم بعد التسليم."
              : "The product has been opened or used after delivery."}
          </li>
          <li>
            {ar
              ? "أُعيد المنتج دون عبوته الأصلية."
              : "The product is returned without its original packaging."}
          </li>
          <li>
            {ar
              ? "تضرر المنتج بسبب الاستخدام أو التخزين غير السليم."
              : "The product is damaged due to improper use or storage."}
          </li>
          <li>
            {ar
              ? "قُدم الطلب بعد انتهاء فترة الإرجاع المسموح بها."
              : "The request is made after the allowed return period."}
          </li>
          <li>
            {ar
              ? "اشتُري المنتج ضمن تصفية أو بيع نهائي، ما لم يكن معيباً."
              : "The product was purchased during a final sale or clearance promotion, unless it is defective."}
          </li>
          <li>
            {ar
              ? "تغيير الرأي بعد استلام المنتج الصحيح."
              : "The customer changes their mind after receiving the correct product."}
          </li>
        </PolicyList>
      </InformationSection>

      <InformationSection id="conditions" title={ar ? "شروط الإرجاع" : "Return conditions"}>
        <p>{ar ? "لأهلية الإرجاع أو الاستبدال:" : "To be eligible for a return or exchange:"}</p>
        <p className="bio-policy-emphasis">
          {ar ? "قدمي الطلب خلال 14 يوماً" : "Request within 14 days"}
        </p>
        <PolicyList>
          <li>
            {ar
              ? "يجب تقديم الطلب خلال 14 يوماً من استلامه."
              : "The request must be submitted within 14 days of receiving the order."}
          </li>
          <li>
            {ar
              ? "يجب أن يكون المنتج غير مستخدم وغير مفتوح وبحالته الأصلية."
              : "The product must be unused, unopened, and in its original condition."}
          </li>
          <li>
            {ar
              ? "يجب أن تظل العبوة والأختام والملحقات والملصقات الأصلية سليمة."
              : "All original packaging, seals, accessories, and labels must be intact."}
          </li>
          <li>
            {ar
              ? "يلزم إيصال صالح أو إثبات شراء."
              : "A valid receipt or proof of purchase is required."}
          </li>
        </PolicyList>
      </InformationSection>

      <InformationSection id="refunds" title={ar ? "استرداد المبلغ" : "Refunds"}>
        <p>
          {ar
            ? "بعد استلام المنتج المرتجع وفحصه، سيبلغكِ فريقنا بحالة طلب الاسترداد أو الاستبدال."
            : "Once the returned product has been received and inspected, our team will notify the customer of the status of their refund or exchange request."}
        </p>
        <p>
          {ar
            ? "عند الموافقة، يُعاد المبلغ عبر طريقة الدفع الأصلية متى كان ذلك ممكناً."
            : "If approved, the refund will be processed using the original payment method whenever applicable."}
        </p>
      </InformationSection>

      <InformationSection id="process" title={ar ? "خطوات الإرجاع" : "Return process"}>
        <ol className="bio-return-steps">
          <li className="bio-return-step">
            <span className="bio-return-step__number" aria-hidden="true">
              01
            </span>
            <div>
              <h3>{ar ? "تواصلي معنا" : "Contact us"}</h3>
              <p>
                {ar
                  ? "لطلب الإرجاع أو الاستبدال، تواصلي مع فريق خدمة العملاء."
                  : "To request a return or exchange, contact our Customer Care Team."}
              </p>
              <CustomerCarePhone label={ar ? "بدء طلب الإرجاع" : "Start a return"} />
              <p>{ar ? "يجب أن يتضمن الطلب:" : "The request should include:"}</p>
              <PolicyList>
                <li>{ar ? "رقم الطلب" : "Order Number"}</li>
                <li>{ar ? "اسم المنتج" : "Product Name"}</li>
                <li>{ar ? "سبب الإرجاع أو الاستبدال" : "Reason for the return or exchange"}</li>
                <li>
                  {ar
                    ? "صور إذا كان المنتج تالفاً أو معيباً أو غير صحيح"
                    : "Photos, if the product is damaged, defective, or incorrect"}
                </li>
              </PolicyList>
            </div>
          </li>
          <li className="bio-return-step">
            <span className="bio-return-step__number" aria-hidden="true">
              02
            </span>
            <div>
              <h3>{ar ? "مراجعة الأهلية" : "Eligibility review"}</h3>
              <p>
                {ar
                  ? "يراجع فريقنا الطلب بعناية للتأكد من مطابقته لشروط سياسة الإرجاع والاستبدال."
                  : "Our team will carefully review the request to ensure it meets the conditions outlined in the Returns & Exchange Policy."}
              </p>
              <p>
                {ar
                  ? "إذا احتجنا معلومات إضافية فسنتواصل معكِ سريعاً."
                  : "If additional information is required, we will contact the customer promptly."}
              </p>
            </div>
          </li>
          <li className="bio-return-step">
            <span className="bio-return-step__number" aria-hidden="true">
              03
            </span>
            <div>
              <h3>{ar ? "الموافقة على الإرجاع" : "Return approval"}</h3>
              <p>{ar ? "عند الموافقة على الطلب:" : "If the request is approved:"}</p>
              <PolicyList>
                <li>
                  {ar
                    ? "ستصلكِ تعليمات الإرجاع بالتفصيل."
                    : "The customer will receive detailed return instructions."}
                </li>
                <li>
                  {ar
                    ? "يجب إعادة المنتج بحالته وعبوته الأصليتين."
                    : "The product must be returned in its original condition and packaging."}
                </li>
                <li>
                  {ar
                    ? "بعد الاستلام، يفحص فريق الجودة المنتج قبل إتمام الاسترداد أو الاستبدال."
                    : "Once received, our Quality Control Team will inspect the item before completing the refund or exchange."}
                </li>
              </PolicyList>
            </div>
          </li>
        </ol>
      </InformationSection>

      <InformationSection id="fees" title={ar ? "رسوم شحن الإرجاع" : "Return shipping fees"}>
        <p>
          {ar
            ? "تُعالج المبالغ المستردة بعد فحص المنتج المرتجع."
            : "Approved refunds are processed after the returned item has been inspected."}
        </p>
        <p>
          {ar
            ? "رسوم الشحن غير قابلة للاسترداد إلا إذا كان سبب الإرجاع:"
            : "Shipping fees are non-refundable unless the return is due to:"}
        </p>
        <PolicyList>
          <li>{ar ? "إرسال بيوريزا منتجاً غير صحيح." : "An incorrect item sent by BioReza."}</li>
          <li>{ar ? "منتج تالف أو معيب." : "A damaged or defective product."}</li>
          <li>{ar ? "خطأ أثناء تجهيز الطلب." : "An error during order fulfillment."}</li>
        </PolicyList>
      </InformationSection>
    </InformationPage>
  );
}
