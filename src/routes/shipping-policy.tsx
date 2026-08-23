import { createFileRoute } from "@tanstack/react-router";
import {
  CustomerCarePhone,
  InformationPage,
  InformationSection,
  PolicyList,
} from "@/components/content/InformationPage";
import { siteConfig } from "@/lib/site-config";
import { breadcrumbSchema, createSeoHead, jsonLd } from "@/lib/seo";
import { useStore } from "@/lib/store";

const sections = [
  { id: "confirmation", label: "Order confirmation" },
  { id: "delivery", label: "Delivery" },
  { id: "support", label: "Customer support" },
  { id: "business-days", label: "Business days" },
  { id: "shipping-time", label: "Shipping time" },
  { id: "cancellation", label: "Order cancellation" },
];
const sectionsAr = [
  { id: "confirmation", label: "تأكيد الطلب" },
  { id: "delivery", label: "التوصيل" },
  { id: "support", label: "خدمة العملاء" },
  { id: "business-days", label: "أيام العمل" },
  { id: "shipping-time", label: "مدة الشحن" },
  { id: "cancellation", label: "إلغاء الطلب" },
];

export const Route = createFileRoute("/shipping-policy")({
  head: ({ match }) => {
    const ar = match.search.lang === "ar";
    return {
      ...createSeoHead({
        title: ar ? "الشحن والتوصيل" : "Shipping & Delivery",
        description: ar
          ? "معلومات تأكيد طلبات بيوريزا ومواعيد التوصيل داخل مصر وأيام العمل والإلغاء."
          : "BioReza order confirmation, delivery times across Egypt, business days, customer support, and cancellation information.",
        path: "/shipping-policy",
        locale: ar ? "ar" : "en",
      }),
      scripts: [
        jsonLd(
          breadcrumbSchema([
            { name: ar ? "الرئيسية" : "Home", path: "/" },
            { name: ar ? "الشحن والتوصيل" : "Shipping & Delivery", path: "/shipping-policy" },
          ]),
        ),
      ],
    };
  },
  component: ShippingAndDelivery,
});

function ShippingAndDelivery() {
  const { locale } = useStore();
  const ar = locale === "ar";
  return (
    <InformationPage
      eyebrow={ar ? "خدمة العملاء" : "Customer care"}
      title={ar ? "الشحن والتوصيل" : "Shipping & delivery"}
      intro={
        ar
          ? "نلتزم في بيوريزا بأن تكون تجربة تسوقكِ سلسة وموثوقة ومريحة."
          : "At BioReza, we are committed to making your shopping experience smooth, reliable, and worry-free."
      }
      sections={ar ? sectionsAr : sections}
    >
      <InformationSection id="confirmation" title={ar ? "تأكيد الطلب" : "Order confirmation"}>
        <p>
          {ar
            ? "بعد إتمام الطلب، سيتواصل معكِ فريق خدمة العملاء خلال 24 ساعة لتأكيد:"
            : "Once your order is placed, our Customer Care Team will contact you within 24 hours to confirm your:"}
        </p>
        <PolicyList>
          <li>{ar ? "تفاصيل الطلب" : "order details"}</li>
          <li>{ar ? "بيانات التوصيل" : "delivery information"}</li>
          <li>{ar ? "طريقة الدفع عند الحاجة" : "payment method, if applicable"}</li>
        </PolicyList>
      </InformationSection>

      <InformationSection id="delivery" title={ar ? "التوصيل" : "Delivery"}>
        <p>
          {ar
            ? "بعد تأكيد الطلب، يُجهز بعناية ويُسلّم إلى شركة الشحن."
            : "After your order is confirmed, it will be carefully prepared and handed over to our shipping partner."}
        </p>
        <p>
          {ar
            ? "نتابع عملية التوصيل باستمرار وسنبلغكِ بأي تأخير غير متوقع."
            : "We continuously monitor the delivery process and will keep you informed in case of any unexpected delays."}
        </p>
        <p>
          {ar
            ? "إذا تعذر الوصول إليكِ أو إتمام التوصيل، سيتواصل فريقنا معكِ لحل المشكلة بأسرع وقت."
            : "If we are unable to reach you or complete the delivery, our team will contact you to help resolve the issue as quickly as possible."}
        </p>
      </InformationSection>

      <InformationSection id="support" title={ar ? "هل تحتاجين للمساعدة؟" : "Need assistance?"}>
        <p>
          {ar
            ? "إذا كان لديكِ أي سؤال قبل استلام طلبكِ أو بعده، يسعد فريق خدمة العملاء بمساعدتكِ."
            : "If you have any questions before or after receiving your order, our Customer Care Team is always happy to help."}
        </p>
        <CustomerCarePhone label={ar ? "خدمة العملاء" : "Customer support"} />
      </InformationSection>

      <InformationSection id="business-days" title={ar ? "أيام العمل" : "Business days"}>
        <p>{ar ? "أيام العمل الرسمية لدينا:" : "Our official working days are:"}</p>
        <p className="bio-policy-emphasis">
          {ar ? "السبت إلى الخميس" : siteConfig.customerCare.businessDays}
        </p>
        <p>
          {ar
            ? "تُعد أيام الجمعة والعطلات الرسمية أياماً غير عاملة لدى بيوريزا وشركات الشحن."
            : "Fridays and official public holidays are considered non-business days for both BioReza and our shipping partners."}
        </p>
      </InformationSection>

      <InformationSection
        id="shipping-time"
        title={ar ? "مدة الشحن" : "Shipping time"}
        lead={
          ar
            ? "نعمل لضمان وصول طلبكِ بأسرع وقت ممكن وبأمان."
            : "At BioReza, we work hard to ensure your order reaches you as quickly and safely as possible."
        }
      >
        <p>
          {ar
            ? "بعد تأكيد الطلب، يُجهز بعناية ويُشحن وفقاً لموقعكِ."
            : "After your order has been confirmed, it will be carefully prepared and shipped according to your location."}
        </p>
        <div
          className="bio-delivery-windows"
          aria-label={ar ? "مواعيد التوصيل المتوقعة" : "Delivery estimates"}
        >
          <div className="bio-delivery-window">
            <span>{ar ? "القاهرة والجيزة" : "Cairo & Giza"}</span>
            <strong>{ar ? "1–3 أيام عمل" : "1–3 business days"}</strong>
          </div>
          <div className="bio-delivery-window">
            <span>{ar ? "باقي المحافظات" : "All other governorates"}</span>
            <strong>{ar ? "3–5 أيام عمل" : "3–5 business days"}</strong>
          </div>
        </div>
        <p>
          {ar
            ? "عند إرسال الطلب، ستتواصل معكِ شركة الشحن بتفاصيل التوصيل."
            : "Once your order is dispatched, the shipping company will contact you with your delivery details."}
        </p>
        <p>
          {ar
            ? "لطلبات الدفع عند الاستلام، قد تصلكِ أيضاً رسالة تأكيد تتضمن المبلغ المستحق وبيانات المندوب."
            : "For Cash on Delivery orders, you may also receive a confirmation message including the payable amount and courier information."}
        </p>
      </InformationSection>

      <InformationSection id="cancellation" title={ar ? "إلغاء الطلب" : "Order cancellation"}>
        <p>
          {ar
            ? "يمكنكِ إلغاء الطلب خلال:"
            : "If you wish to cancel your order, you may do so within:"}
        </p>
        <p className="bio-policy-emphasis">{ar ? "24 ساعة من إتمامه" : "24 hours of placing it"}</p>
        <p>
          {ar ? "بشرط ألا يكون قد شُحن بعد." : "provided that the order has not yet been shipped."}
        </p>
        <p>
          {ar
            ? "لطلب الإلغاء أو المساعدة، تواصلي مع فريق خدمة العملاء."
            : "To request a cancellation or get assistance, contact our Customer Care Team."}
        </p>
        <CustomerCarePhone label={ar ? "طلب الإلغاء" : "Request cancellation"} />
      </InformationSection>
    </InformationPage>
  );
}
