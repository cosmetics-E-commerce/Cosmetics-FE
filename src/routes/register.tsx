import { useState, type FormEvent } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { AuthShell, AuthField } from "@/components/layout/AuthShell";
import { InternationalPhoneField } from "@/components/forms/InternationalPhoneField";
import { Button } from "@/components/ui/button";
import { apiErrorCode, apiErrorMessage, register } from "@/lib/api";
import {
  savePendingEmailAfterDeliveryFailure,
  savePendingVerification,
} from "@/lib/pending-verification";
import { createNoindexHead } from "@/lib/seo";
import { useStore } from "@/lib/store";
export const Route = createFileRoute("/register")({
  head: ({ match }) =>
    createNoindexHead(
      match.search.lang === "ar" ? "إنشاء حساب" : "Create Account",
      "/register",
      match.search.lang === "ar" ? "ar" : "en",
    ),
  component: Register,
});
function Register() {
  const navigate = useNavigate();
  const { locale } = useStore();
  const ar = locale === "ar";
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email"));
    const password = String(data.get("password"));
    const rePassword = String(data.get("rePassword"));
    if (password !== rePassword) {
      setError(
        ar
          ? "كلمتا المرور غير متطابقتين. أعيدي إدخال كلمة المرور للتأكيد."
          : "The passwords do not match. Re-enter the confirmation password.",
      );
      const confirmation = event.currentTarget.elements.namedItem("rePassword");
      if (confirmation instanceof HTMLElement) confirmation.focus();
      return;
    }
    setPending(true);
    setError("");
    try {
      const result = await register({
        firstName: data.get("firstName"),
        lastName: data.get("lastName"),
        phone: String(data.get("phone")),
        email,
        password,
        rePassword,
        otpChannel: "EMAIL",
      });
      savePendingVerification(result);
      toast("Verification code sent", {
        description: `Enter the 6-digit code sent to ${result.maskedEmail}.`,
      });
      await navigate({ to: "/verify-email" });
    } catch (problem) {
      if (
        [
          "EMAIL_DELIVERY_FAILED",
          "EMAIL_PROVIDER_UNAVAILABLE",
          "EMAIL_PROVIDER_NOT_CONFIGURED",
          "REDIS_REQUIRED",
          "REDIS_UNAVAILABLE",
        ].includes(apiErrorCode(problem))
      ) {
        savePendingEmailAfterDeliveryFailure(email);
        toast.error("Your account is pending verification", {
          description: "Request a new code when email delivery is available.",
        });
        await navigate({ to: "/verify-email" });
        return;
      }
      setError(apiErrorMessage(problem));
    } finally {
      setPending(false);
    }
  }
  return (
    <AuthShell
      label={ar ? "العضوية" : "Membership"}
      title={ar ? "انضمي إلى بيوريزا." : "Join BIOREZA."}
      intro={
        ar
          ? "أنشئي حسابك لحفظ العناوين وتتبع الطلبات والاحتفاظ بقائمة مفضلة خاصة."
          : "Create your account for saved addresses, order tracking and a private wishlist."
      }
      footer={
        <>
          {ar ? "لديك حساب بالفعل؟ " : "Already a member? "}
          <Link
            to="/sign-in"
            search={{ returnTo: undefined }}
            className="text-gold hover:underline"
          >
            {ar ? "تسجيل الدخول" : "Sign in"}
          </Link>
        </>
      }
    >
      <form className="space-y-5" onSubmit={submit}>
        <div className="grid gap-5 sm:grid-cols-2">
          <AuthField
            id="firstName"
            label={ar ? "الاسم الأول" : "First name"}
            autoComplete="given-name"
          />
          <AuthField
            id="lastName"
            label={ar ? "اسم العائلة" : "Last name"}
            autoComplete="family-name"
          />
        </div>
        <InternationalPhoneField
          label={ar ? "رقم الهاتف" : "Phone Number"}
          locale={locale}
          hint={
            ar
              ? "أدخلي رقم هاتفك باستخدام رمز الدولة المحدد."
              : "Enter your phone number using the selected country code."
          }
        />
        <AuthField
          id="email"
          label={ar ? "البريد الإلكتروني" : "Email"}
          type="email"
          autoComplete="email"
        />
        <AuthField
          id="password"
          label={ar ? "كلمة المرور" : "Password"}
          type="password"
          autoComplete="new-password"
          minLength={8}
          pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}"
          hint={
            ar
              ? "استخدمي 8 أحرف أو أكثر تتضمن حرفاً كبيراً وصغيراً ورقماً."
              : "Use 8+ characters with uppercase, lowercase and a number."
          }
        />
        <AuthField
          id="rePassword"
          label={ar ? "تأكيد كلمة المرور" : "Confirm password"}
          type="password"
          autoComplete="new-password"
        />
        {error && (
          <p role="alert" className="border border-destructive/30 p-4 text-sm text-destructive">
            {error}
          </p>
        )}
        <Button type="submit" variant="solid" size="wide" loading={pending}>
          {ar ? "إنشاء الحساب" : "Create account"}
        </Button>
      </form>
    </AuthShell>
  );
}
