import { useEffect, useRef, useState, type ChangeEvent, type ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ImagePlus, Paperclip, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { apiErrorMessage, createSupportRequest } from "@/lib/api";
import { useStore } from "@/lib/store";

const MAX_ATTACHMENT_BYTES = 5 * 1024 * 1024;
const ACCEPTED_ATTACHMENT_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact customer care - BIOREZA Cosmetics" },
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
  const [attachment, setAttachment] = useState<File | null>(null);
  const attachmentInput = useRef<HTMLInputElement>(null);
  const ar = locale === "ar";
  useEffect(() => setHydrated(true), []);

  const selectAttachment = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    if (!file) return;
    if (!ACCEPTED_ATTACHMENT_TYPES.has(file.type) || file.size > MAX_ATTACHMENT_BYTES) {
      event.target.value = "";
      setAttachment(null);
      toast.error(
        ar
          ? "اختاري صورة JPG أو PNG أو WebP بحجم لا يتجاوز 5 ميجابايت."
          : "Choose a JPG, PNG, or WebP image no larger than 5 MB.",
      );
      return;
    }
    setAttachment(file);
  };

  const removeAttachment = () => {
    setAttachment(null);
    if (attachmentInput.current) attachmentInput.current.value = "";
  };

  return (
    <main className="sf-contact-page">
      <div className="sf-contact-shell">
        <aside className="sf-contact-intro">
          <p className="sf-contact-kicker">{ar ? "خدمة العملاء" : "Customer care"}</p>
          <h1>{ar ? "تواصلي معنا" : "Contact us"}</h1>
          <p className="sf-contact-intro__copy">
            {ar
              ? "للاستفسار عن طلب أو منتج أو إرجاع أو دفع، أرسلي التفاصيل وسيرد عليك فريقنا."
              : "For questions about an order, product, return, or payment, send the details and our team will reply."}
          </p>
          <div className="sf-contact-details">
            <div className="sf-contact-detail">
              <span>{ar ? "البريد الإلكتروني" : "Email"}</span>
              <a href="mailto:hello@bioreza.com">hello@bioreza.com</a>
            </div>
            <div className="sf-contact-detail">
              <span>{ar ? "ساعات العمل" : "Hours"}</span>
              <p>
                {ar ? "السبت - الخميس، 9:00 - 19:00" : "Saturday - Thursday, 09:00 - 19:00"}
                <small>{ar ? "بتوقيت القاهرة" : "Cairo time"}</small>
              </p>
            </div>
            <p className="sf-contact-order-note">
              {ar
                ? "إذا كان استفسارك عن طلب، أضيفي رقم الطلب لتسريع المراجعة."
                : "For order questions, include the order number so we can review it faster."}
            </p>
          </div>
        </aside>

        <section className="sf-contact-form-panel">
          <form
            className="sf-contact-form"
            onSubmit={async (event) => {
              event.preventDefault();
              const form = event.currentTarget;
              const values = Object.fromEntries(new FormData(form));
              setSending(true);
              try {
                const result = await createSupportRequest(
                  {
                    name: String(values["name"] ?? ""),
                    email: String(values["email"] ?? ""),
                    ...(values["orderNumber"]
                      ? { orderNumber: String(values["orderNumber"]) }
                      : {}),
                    subject: String(values["subject"] ?? ""),
                    message: String(values["message"] ?? ""),
                    locale,
                  },
                  attachment ?? undefined,
                );
                form.reset();
                removeAttachment();
                toast.success(
                  ar
                    ? `تم استلام طلبك: ${result.id.slice(0, 8)}`
                    : `Request received: ${result.id.slice(0, 8)}`,
                );
              } catch (error) {
                toast.error(apiErrorMessage(error, locale));
              } finally {
                setSending(false);
              }
            }}
          >
            <header className="sf-contact-form__header">
              <h2>{ar ? "أرسلي رسالة" : "Send a message"}</h2>
              <p>
                {ar ? "نرد عادة خلال يوم عمل واحد." : "We usually reply within one business day."}
              </p>
            </header>

            <div className="sf-contact-form__grid">
              <Field label={ar ? "الاسم" : "Name"}>
                <Input
                  name="name"
                  autoComplete="name"
                  placeholder={ar ? "الاسم بالكامل" : "Your full name"}
                  required
                  minLength={2}
                />
              </Field>
              <Field label={ar ? "البريد الإلكتروني" : "Email"}>
                <Input
                  name="email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  placeholder="you@example.com"
                  required
                />
              </Field>
              <Field label={ar ? "رقم الطلب (اختياري)" : "Order number (optional)"}>
                <Input name="orderNumber" autoComplete="off" placeholder="BRZ-10482" />
              </Field>
              <Field label={ar ? "الموضوع" : "Subject"}>
                <Input
                  name="subject"
                  placeholder={ar ? "كيف يمكننا مساعدتك؟" : "What can we help with?"}
                  required
                  minLength={3}
                />
              </Field>
            </div>
            <Field label={ar ? "الرسالة" : "Message"} className="sf-contact-field--message">
              <Textarea
                name="message"
                placeholder={
                  ar
                    ? "شاركي التفاصيل التي ستساعدنا في خدمتك."
                    : "Share the details that will help us assist you."
                }
                required
                minLength={20}
                rows={6}
              />
            </Field>

            <div className="sf-contact-attachment">
              <span className="sf-contact-attachment__icon" aria-hidden="true">
                <ImagePlus />
              </span>
              <div className="sf-contact-attachment__heading">
                <span>
                  {ar ? "إضافة صورة" : "Add a photo"}
                  <small>{ar ? "اختياري" : "Optional"}</small>
                </span>
                <p>
                  {ar
                    ? "JPG أو PNG أو WebP، بحد أقصى 5 ميجابايت."
                    : "JPG, PNG, or WebP. Maximum 5 MB."}
                </p>
              </div>

              {attachment ? (
                <div className="sf-contact-attachment__selected">
                  <Paperclip aria-hidden="true" />
                  <span>
                    <strong>{attachment.name}</strong>
                    <small>{formatFileSize(attachment.size)}</small>
                  </span>
                  <button type="button" onClick={removeAttachment}>
                    <X aria-hidden="true" />
                    <span className="sr-only">{ar ? "إزالة الصورة" : "Remove photo"}</span>
                  </button>
                </div>
              ) : (
                <label className="sf-contact-attachment__picker">
                  <Paperclip aria-hidden="true" />
                  <span>{ar ? "اختيار صورة" : "Choose photo"}</span>
                  <input
                    ref={attachmentInput}
                    type="file"
                    name="attachment"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={selectAttachment}
                  />
                </label>
              )}
            </div>

            <div className="sf-contact-form__footer">
              <p>
                {ar
                  ? "لا ترسلي أرقام البطاقات أو كلمات المرور."
                  : "Please don’t include card numbers or passwords."}
              </p>
              <Button
                type="submit"
                variant="solid"
                size="lg"
                disabled={!hydrated}
                loading={sending}
                className="sf-contact-submit"
              >
                {ar ? "إرسال الطلب" : "Send request"}
              </Button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}

function formatFileSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
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
    <label className={["sf-contact-field", className].filter(Boolean).join(" ")}>
      <span>{label}</span>
      {children}
    </label>
  );
}
