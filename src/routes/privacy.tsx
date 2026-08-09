import { createFileRoute } from "@tanstack/react-router";
import { PolicyPage } from "@/components/legal/PolicyPage";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy policy — BIOREZA Cosmetics" },
      {
        name: "description",
        content: "How BIOREZA collects, uses, retains and protects personal data.",
      },
    ],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <PolicyPage
      eyebrow="Legal"
      title="Privacy policy"
      intro="This policy explains what personal data BIOREZA processes when you browse, create an account, order, submit payment proof, or contact us."
      sections={[
        {
          heading: "Data we collect",
          body: [
            "We process identity and contact details, delivery addresses, order and support history, device and security logs, and the minimum payment information needed to reconcile an order. We never ask you to upload card credentials.",
            "Manual-transfer proof images can contain financial identifiers. Please obscure unrelated balances and transactions before uploading.",
          ],
        },
        {
          heading: "Why we use it",
          body: [
            "We use data to fulfil orders, prevent fraud, provide support, meet accounting and legal duties, and—only with consent—send newsletter messages. First-party commerce events help us understand product and checkout performance without selling your data.",
          ],
        },
        {
          heading: "Retention",
          body: [
            "Payment-proof images and the related transaction record are retained for five years after the end of the relevant fiscal year, then securely deleted or irreversibly anonymised, unless an unresolved dispute or applicable law requires longer retention.",
            "Support requests are retained for two years after closure. Inactive newsletter records are deleted within 90 days after unsubscribe. Security logs are normally retained for 180 days.",
          ],
        },
        {
          heading: "Sharing and storage",
          body: [
            "Data is shared only with processors needed to operate the store, such as hosting, private object storage, delivery carriers, email delivery, and error monitoring. Access is restricted by role and audited. Cross-border processing is subject to contractual and legal safeguards.",
          ],
        },
        {
          heading: "Your choices",
          body: [
            "You may request access, correction, deletion, restriction, or withdrawal of newsletter consent by contacting privacy@bioreza.com. Some transaction records cannot be deleted before mandatory retention ends. We verify identity before fulfilling a request.",
          ],
        },
      ]}
      arabic={{
        eyebrow: "قانوني",
        title: "سياسة الخصوصية",
        intro:
          "توضح هذه السياسة البيانات الشخصية التي تعالجها بيوريزا عند التصفح أو إنشاء حساب أو الطلب أو رفع إثبات الدفع أو التواصل معنا.",
        sections: [
          {
            heading: "البيانات التي نجمعها",
            body: [
              "نعالج بيانات الهوية والتواصل وعناوين التوصيل وسجل الطلبات والدعم وسجلات الجهاز والأمان والحد الأدنى من معلومات الدفع اللازمة لمطابقة الطلب. لا نطلب مطلقاً بيانات بطاقتك السرية.",
              "قد يحتوي إثبات التحويل على بيانات مالية. يرجى إخفاء الأرصدة والمعاملات غير المرتبطة قبل الرفع.",
            ],
          },
          {
            heading: "أغراض الاستخدام",
            body: [
              "نستخدم البيانات لتنفيذ الطلبات ومنع الاحتيال وتقديم الدعم والوفاء بالالتزامات المحاسبية والقانونية، ولإرسال النشرة البريدية بموافقتك فقط.",
            ],
          },
          {
            heading: "مدة الاحتفاظ",
            body: [
              "نحتفظ بصور إثبات الدفع وسجل المعاملة المرتبط لمدة خمس سنوات من نهاية السنة المالية المعنية، ثم نحذفها بأمان أو نخفي هويتها نهائياً، ما لم يتطلب نزاع قائم أو قانون واجب التطبيق مدة أطول.",
              "نحتفظ بطلبات الدعم لعامين بعد إغلاقها، ونحذف سجلات النشرة غير النشطة خلال 90 يوماً من إلغاء الاشتراك، وسجلات الأمان عادة لمدة 180 يوماً.",
            ],
          },
          {
            heading: "المشاركة والتخزين",
            body: [
              "نشارك البيانات فقط مع مقدمي الخدمات اللازمين لتشغيل المتجر مثل الاستضافة والتخزين الخاص وشركات الشحن والبريد ومراقبة الأخطاء. الوصول مقيد حسب الصلاحية وخاضع للتدقيق.",
            ],
          },
          {
            heading: "حقوقك",
            body: [
              "يمكنك طلب الوصول أو التصحيح أو الحذف أو التقييد أو سحب موافقة النشرة عبر privacy@bioreza.com. قد يتعذر حذف بعض سجلات المعاملات قبل انتهاء مدة الاحتفاظ الإلزامية.",
            ],
          },
        ],
      }}
    />
  );
}
