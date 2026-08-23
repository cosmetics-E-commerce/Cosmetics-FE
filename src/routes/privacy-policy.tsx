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
  { id: "introduction", label: "Introduction" },
  { id: "information", label: "Information we collect" },
  { id: "use", label: "How we use information" },
  { id: "privacy", label: "Your privacy matters" },
  { id: "security", label: "Data security" },
  { id: "rights", label: "Your rights" },
  { id: "updates", label: "Policy updates" },
];
const sectionsAr = [
  { id: "introduction", label: "مقدمة" },
  { id: "information", label: "المعلومات التي نجمعها" },
  { id: "use", label: "كيفية استخدام المعلومات" },
  { id: "privacy", label: "خصوصيتكِ مهمة" },
  { id: "security", label: "أمن البيانات" },
  { id: "rights", label: "حقوقكِ" },
  { id: "updates", label: "تحديثات السياسة" },
];

export const Route = createFileRoute("/privacy-policy")({
  head: ({ match }) => {
    const ar = match.search.lang === "ar";
    return {
      ...createSeoHead({
        title: ar ? "سياسة الخصوصية" : "Privacy Policy",
        description: ar
          ? "تعرّفي على كيفية جمع بيوريزا لمعلوماتكِ الشخصية واستخدامها وحمايتها واحترامها."
          : "Learn how BioReza collects, uses, protects, and respects your personal information when you browse or place an order.",
        path: "/privacy-policy",
        locale: ar ? "ar" : "en",
      }),
      scripts: [
        jsonLd(
          breadcrumbSchema([
            { name: ar ? "الرئيسية" : "Home", path: "/" },
            { name: ar ? "سياسة الخصوصية" : "Privacy Policy", path: "/privacy-policy" },
          ]),
        ),
      ],
    };
  },
  component: PrivacyPolicy,
});

function PrivacyPolicy() {
  const { locale } = useStore();
  const ar = locale === "ar";
  return (
    <InformationPage
      eyebrow={ar ? "قانوني" : "Legal"}
      title={ar ? "سياسة الخصوصية" : "Privacy policy"}
      intro={
        ar
          ? "خصوصيتكِ مهمة لدينا. نلتزم بحماية معلوماتكِ الشخصية وتوفير تجربة تسوق آمنة وواضحة وموثوقة."
          : "At BioReza, your privacy is important to us. We are committed to protecting your personal information and providing a secure, transparent, and trusted shopping experience."
      }
      sections={ar ? sectionsAr : sections}
    >
      <InformationSection id="introduction" title={ar ? "مقدمة" : "Introduction"}>
        <p>
          {ar
            ? "خصوصيتكِ مهمة لدينا. نلتزم بحماية معلوماتكِ الشخصية وتوفير تجربة تسوق آمنة وواضحة وموثوقة."
            : "At BioReza, your privacy is important to us. We are committed to protecting your personal information and providing a secure, transparent, and trusted shopping experience."}
        </p>
      </InformationSection>

      <InformationSection
        id="information"
        title={ar ? "المعلومات التي نجمعها" : "Information we collect"}
      >
        <p>
          {ar
            ? "عند زيارة موقعنا أو إتمام طلب، قد نجمع المعلومات التالية:"
            : "When you visit our website or place an order, we may collect the following information:"}
        </p>
        <PolicyList>
          <li>{ar ? "الاسم بالكامل" : "Full Name"}</li>
          <li>{ar ? "البريد الإلكتروني" : "Email Address"}</li>
          <li>{ar ? "رقم الهاتف" : "Phone Number"}</li>
          <li>{ar ? "عنوان الشحن" : "Shipping Address"}</li>
          <li>
            {ar
              ? "معلومات الدفع، عند الحاجة فقط لإتمام الشراء"
              : "Payment Information, only when required to complete your purchase"}
          </li>
        </PolicyList>
      </InformationSection>

      <InformationSection
        id="use"
        title={ar ? "كيفية استخدام معلوماتكِ" : "How we use your information"}
      >
        <p>{ar ? "نجمع معلوماتكِ فقط من أجل:" : "Your information is collected solely to:"}</p>
        <PolicyList>
          <li>{ar ? "معالجة طلباتكِ وتنفيذها." : "Process and fulfill your orders."}</li>
          <li>{ar ? "تنظيم الشحن والتوصيل." : "Arrange shipping and delivery."}</li>
          <li>{ar ? "تقديم خدمة العملاء." : "Provide customer support."}</li>
          <li>
            {ar
              ? "التواصل معكِ بشأن طلبكِ أو حسابكِ."
              : "Contact you regarding your order or account."}
          </li>
          <li>{ar ? "تحسين تجربة التسوق." : "Improve your shopping experience."}</li>
          <li>
            {ar
              ? "إرسال العروض والتحديثات فقط إذا اخترتِ استلامها."
              : "Send promotional offers and updates, only if you choose to receive them."}
          </li>
        </PolicyList>
      </InformationSection>

      <InformationSection id="privacy" title={ar ? "خصوصيتكِ مهمة" : "Your privacy matters"}>
        <p>{ar ? "نحترم خصوصيتكِ." : "We respect your privacy."}</p>
        <p>
          {ar
            ? "لا تبيع بيوريزا معلوماتكِ الشخصية أو تؤجرها أو تشاركها مع أطراف أخرى لأغراض تسويقية."
            : "BioReza never sells, rents, or shares your personal information with third parties for marketing purposes."}
        </p>
        <p>
          {ar
            ? "لا نشارك المعلومات إلا مع مقدمي خدمات موثوقين عند الضرورة لإتمام طلبكِ، مثل شركات الشحن أو خدمات الدفع."
            : "Your information is only shared with trusted service providers when necessary to complete your order, such as shipping companies or payment service providers."}
        </p>
      </InformationSection>

      <InformationSection id="security" title={ar ? "أمن البيانات" : "Data security"}>
        <p>
          {ar
            ? "نطبق إجراءات أمن مناسبة لحماية معلوماتكِ من الوصول غير المصرح به أو إساءة الاستخدام أو الإفصاح."
            : "We implement appropriate security measures to protect your personal information from unauthorized access, misuse, or disclosure."}
        </p>
        <p>
          {ar
            ? "تُعامل بياناتكِ بأعلى درجات السرية والعناية."
            : "Your data is handled with the highest level of confidentiality and care."}
        </p>
      </InformationSection>

      <InformationSection id="rights" title={ar ? "حقوقكِ" : "Your rights"}>
        <p>{ar ? "يمكنكِ طلب:" : "You may request to:"}</p>
        <PolicyList>
          <li>{ar ? "الوصول إلى معلوماتكِ الشخصية." : "Access your personal information."}</li>
          <li>{ar ? "تحديث معلوماتكِ أو تصحيحها." : "Update or correct your information."}</li>
          <li>
            {ar
              ? "حذف بياناتكِ الشخصية حيثما ينطبق."
              : "Request the deletion of your personal data, where applicable."}
          </li>
        </PolicyList>
        <p>
          {ar
            ? "لأي استفسار متعلق بالخصوصية، تواصلي مع فريق خدمة العملاء."
            : "For any privacy-related inquiries, please contact our Customer Care Team."}
        </p>
        <CustomerCarePhone label={ar ? "خدمة العملاء" : "Customer care"} />
      </InformationSection>

      <InformationSection id="updates" title={ar ? "تحديثات السياسة" : "Updates to this policy"}>
        <p>
          {ar
            ? "تحتفظ بيوريزا بحق تحديث سياسة الخصوصية عند الحاجة."
            : "BioReza reserves the right to update this Privacy Policy when necessary."}
        </p>
        <p>
          {ar
            ? "ستُنشر أي تغييرات في هذه الصفحة وتصبح سارية فور نشرها."
            : "Any changes will be published on this page and become effective immediately upon posting."}
        </p>
        <p>
          {ar
            ? "باستخدام موقع بيوريزا أو إتمام طلب، فإنكِ تقرين بقراءة سياسة الخصوصية والموافقة عليها."
            : "By using the BioReza website or placing an order, you acknowledge that you have read and agree to this Privacy Policy."}
        </p>
      </InformationSection>
    </InformationPage>
  );
}
