import { createFileRoute } from "@tanstack/react-router";
import { PolicyPage } from "@/components/legal/PolicyPage";
export const Route = createFileRoute("/cookies")({
  head: () => ({ meta: [{ title: "Cookie policy — BIOREZA Cosmetics" }] }),
  component: Cookies,
});
function Cookies() {
  return (
    <PolicyPage
      eyebrow="Legal"
      title="Cookie policy"
      intro="BIOREZA currently uses only essential cookies and first-party browser storage needed for language, cart, security, and sign-in continuity."
      sections={[
        {
          heading: "Essential storage",
          body: [
            "Security and refresh-session cookies keep signed-in sessions safe. A cart identifier preserves a guest basket. A locale preference renders the correct language and direction. Disabling these can prevent checkout or sign-in from working.",
          ],
        },
        {
          heading: "Analytics",
          body: [
            "Commerce events are sent directly to BIOREZA with a random session identifier. They do not use third-party advertising cookies and are not sold. If optional advertising or cross-site analytics are introduced, we will request consent before setting them.",
          ],
        },
        {
          heading: "Control",
          body: [
            "You can clear cookies and site storage in your browser. Essential records will be recreated when required for a requested feature.",
          ],
        },
      ]}
      arabic={{
        eyebrow: "قانوني",
        title: "سياسة ملفات الارتباط",
        intro:
          "تستخدم بيوريزا حالياً ملفات ضرورية وتخزيناً محلياً فقط للغة والسلة والأمان واستمرار تسجيل الدخول.",
        sections: [
          {
            heading: "التخزين الضروري",
            body: [
              "تحافظ ملفات الأمان والجلسة على تسجيل الدخول، ويحفظ معرف السلة مشتريات الزائر، ويحفظ تفضيل اللغة اتجاه الصفحة. قد يؤدي تعطيلها إلى توقف إتمام الطلب أو تسجيل الدخول.",
            ],
          },
          {
            heading: "التحليلات",
            body: [
              "تُرسل أحداث التجارة مباشرة إلى بيوريزا بمعرف جلسة عشوائي، دون ملفات إعلانية من أطراف أخرى ودون بيع البيانات. سنطلب الموافقة قبل إضافة أي تتبع اختياري مستقبلاً.",
            ],
          },
          {
            heading: "التحكم",
            body: [
              "يمكنك مسح ملفات الارتباط وبيانات الموقع من المتصفح، وستُنشأ السجلات الضرورية مجدداً عند طلب ميزة تحتاجها.",
            ],
          },
        ],
      }}
    />
  );
}
