import { useEffect, useState, type ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Send } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { apiErrorMessage, createSupportRequest } from "@/lib/api";
import { useStore } from "@/lib/store";
import { Reveal } from "@/components/motion/Primitives";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact customer care — BIOREZA Cosmetics" },
      {
        name: "description",
        content:
          "Contact BIOREZA customer care about an order, product, payment, return, or privacy request.",
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  const { locale } = useStore();
  const [sending, setSending] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const ar = locale === "ar";
  useEffect(() => setHydrated(true), []);
  return (
    <div className="mx-auto grid max-w-[1200px] gap-14 px-5 py-16 md:px-10 lg:grid-cols-[0.72fr_1.28fr] lg:py-24">
      <Reveal stagger staggerMs={76} distance={22}>
        <p className="label-xs text-gold">{ar ? "خدمة العملاء" : "Customer care"}</p>
        <h1 className="display mt-5 text-[clamp(2.5rem,5vw,4rem)]">
          {ar ? "كيف يمكننا مساعدتك؟" : "How can we help?"}
        </h1>
        <p className="mt-8 leading-relaxed text-muted-foreground">
          {ar
            ? "أرسلي تفاصيل طلبك وسيراجعها فريق خدمة العملاء. لا ترسلي بيانات بطاقتك أو كلمات المرور."
            : "Send the details below and our customer-care team will review your request. Never include card credentials or passwords."}
        </p>
        <div className="mt-10 space-y-3 text-sm">
          <p>hello@bioreza.com</p>
          <p>
            {ar
              ? "السبت–الخميس، 9:00–19:00 بتوقيت القاهرة"
              : "Saturday–Thursday, 09:00–19:00 Cairo"}
          </p>
        </div>
      </Reveal>
      <Reveal variant="scale" delay={100} duration={720}>
        <form
          className="border border-border bg-ivory p-6 md:p-10"
          onSubmit={async (event) => {
            event.preventDefault();
            const form = event.currentTarget;
            const values = Object.fromEntries(new FormData(form));
            setSending(true);
            try {
              const result = await createSupportRequest({
                name: String(values["name"] ?? ""),
                email: String(values["email"] ?? ""),
                ...(values["orderNumber"] ? { orderNumber: String(values["orderNumber"]) } : {}),
                subject: String(values["subject"] ?? ""),
                message: String(values["message"] ?? ""),
                locale,
              });
              form.reset();
              toast.success(
                ar
                  ? `تم استلام طلبك: ${result.id.slice(0, 8)}`
                  : `Request received: ${result.id.slice(0, 8)}`,
              );
            } catch (error) {
              toast.error(apiErrorMessage(error));
            } finally {
              setSending(false);
            }
          }}
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <Field label={ar ? "الاسم" : "Name"}>
              <Input name="name" required minLength={2} />
            </Field>
            <Field label={ar ? "البريد الإلكتروني" : "Email"}>
              <Input name="email" type="email" required />
            </Field>
            <Field label={ar ? "رقم الطلب (اختياري)" : "Order number (optional)"}>
              <Input name="orderNumber" />
            </Field>
            <Field label={ar ? "الموضوع" : "Subject"}>
              <Input name="subject" required minLength={3} />
            </Field>
          </div>
          <Field label={ar ? "الرسالة" : "Message"} className="mt-6">
            <Textarea name="message" required minLength={20} rows={7} />
          </Field>
          <Button
            type="submit"
            variant="solid"
            size="pill"
            disabled={!hydrated || sending}
            className="mt-8"
          >
            <Send className="size-4" aria-hidden="true" />{" "}
            {sending ? (ar ? "جارٍ الإرسال…" : "Sending…") : ar ? "إرسال الطلب" : "Send request"}
          </Button>
        </form>
      </Reveal>
    </div>
  );
}

function Field({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <label className={className}>
      <span className="label-xs mb-2 block text-taupe">{label}</span>
      {children}
    </label>
  );
}
