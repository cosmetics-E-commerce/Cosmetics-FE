import { useEffect, useMemo, useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, MailCheck, ShieldCheck } from "lucide-react";
import { REGEXP_ONLY_DIGITS } from "input-otp";

import { AuthShell, AuthField } from "@/components/layout/AuthShell";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import {
  apiErrorCode,
  apiErrorMessage,
  apiRetryAfter,
  forgotPassword,
  resetPassword,
  verifyResetOtp,
} from "@/lib/api";
import { createNoindexHead } from "@/lib/seo";
import { useStore } from "@/lib/store";

const OTP_LENGTH = 6;
const PASSWORD_MIN_LENGTH = 8;

type RecoveryStep = "request" | "verify" | "reset" | "done";

export const Route = createFileRoute("/forgot-password")({
  head: ({ match }) =>
    createNoindexHead(
      match.search.lang === "ar" ? "إعادة تعيين كلمة المرور" : "Reset Password",
      "/forgot-password",
      match.search.lang === "ar" ? "ar" : "en",
    ),
  component: ForgotPassword,
});

function ForgotPassword() {
  const { locale } = useStore();
  const ar = locale === "ar";
  const copy = ar ? arabicCopy : englishCopy;
  const [step, setStep] = useState<RecoveryStep>("request");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otpTtlSeconds, setOtpTtlSeconds] = useState(10 * 60);
  const [resendAvailableAt, setResendAvailableAt] = useState(0);
  const [resendSeconds, setResendSeconds] = useState(0);
  const [error, setError] = useState("");
  const [otpState, setOtpState] = useState<"idle" | "invalid" | "expired">("idle");
  const [pending, setPending] = useState(false);
  const [resending, setResending] = useState(false);

  useEffect(() => {
    if (resendAvailableAt <= Date.now()) {
      setResendSeconds(0);
      return;
    }
    const update = () =>
      setResendSeconds(Math.max(0, Math.ceil((resendAvailableAt - Date.now()) / 1_000)));
    update();
    const timer = window.setInterval(update, 500);
    return () => window.clearInterval(timer);
  }, [resendAvailableAt]);

  const passwordRequirements = useMemo(
    () => [
      { label: copy.passwordLength, met: newPassword.length >= PASSWORD_MIN_LENGTH },
      { label: copy.passwordLowercase, met: /[a-z]/.test(newPassword) },
      { label: copy.passwordUppercase, met: /[A-Z]/.test(newPassword) },
      { label: copy.passwordNumber, met: /[0-9]/.test(newPassword) },
    ],
    [copy, newPassword],
  );
  const passwordValid = passwordRequirements.every((requirement) => requirement.met);
  const passwordMismatch = confirmPassword.length > 0 && confirmPassword !== newPassword;

  function beginCooldown(seconds: number) {
    const safeSeconds = Math.max(0, Math.ceil(seconds));
    setResendAvailableAt(Date.now() + safeSeconds * 1_000);
    setResendSeconds(safeSeconds);
  }

  async function submitRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    const normalizedEmail = email.trim().toLowerCase();
    setPending(true);
    setError("");
    try {
      const result = await forgotPassword(normalizedEmail);
      setEmail(normalizedEmail);
      setOtpTtlSeconds(result.ttlSeconds);
      beginCooldown(result.resendAvailableInSeconds);
      setStep("verify");
    } catch (problem) {
      setError(recoveryError(problem, ar));
    } finally {
      setPending(false);
    }
  }

  async function submitOtp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending || otp.length !== OTP_LENGTH) return;
    setPending(true);
    setError("");
    setOtpState("idle");
    try {
      const result = await verifyResetOtp(email, otp);
      setToken(result.token);
      setStep("reset");
    } catch (problem) {
      const code = apiErrorCode(problem);
      setOtpState(code === "OTP_EXPIRED" ? "expired" : "invalid");
      setError(recoveryError(problem, ar));
    } finally {
      setPending(false);
    }
  }

  async function submitPassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending || !passwordValid || passwordMismatch || !confirmPassword) return;
    setPending(true);
    setError("");
    try {
      await resetPassword(email, token, newPassword, confirmPassword);
      setStep("done");
    } catch (problem) {
      setError(recoveryError(problem, ar));
    } finally {
      setPending(false);
    }
  }

  async function resendCode() {
    if (resending || resendSeconds > 0) return;
    setResending(true);
    setError("");
    try {
      const result = await forgotPassword(email);
      setOtp("");
      setOtpState("idle");
      setOtpTtlSeconds(result.ttlSeconds);
      beginCooldown(result.resendAvailableInSeconds);
    } catch (problem) {
      const retryAfter = apiRetryAfter(problem);
      if (retryAfter > 0) beginCooldown(retryAfter);
      setError(recoveryError(problem, ar));
    } finally {
      setResending(false);
    }
  }

  function changeEmail() {
    setStep("request");
    setOtp("");
    setToken("");
    setError("");
    setOtpState("idle");
    setResendAvailableAt(0);
  }

  const title =
    step === "done"
      ? copy.doneTitle
      : step === "verify"
        ? copy.verifyTitle
        : step === "reset"
          ? copy.resetTitle
          : copy.requestTitle;
  const intro =
    step === "done"
      ? copy.doneIntro
      : step === "verify"
        ? copy.verifyIntro
        : step === "reset"
          ? copy.resetIntro
          : copy.requestIntro;

  return (
    <AuthShell
      label={copy.label}
      title={title}
      intro={intro}
      footer={
        <Link to="/sign-in" search={{ returnTo: undefined }} className="text-gold hover:underline">
          {copy.returnToSignIn}
        </Link>
      }
    >
      {step === "request" && (
        <form className="space-y-6" onSubmit={submitRequest} noValidate={false}>
          <AuthField
            id="recovery-email"
            label={copy.emailLabel}
            type="email"
            autoComplete="email"
            placeholder="name@example.com"
            value={email}
            onChange={(event) => setEmail(event.currentTarget.value)}
            autoFocus
          />
          <RecoveryError message={error} />
          <Button type="submit" variant="solid" size="wide" loading={pending}>
            {pending ? copy.sending : copy.sendCode}
          </Button>
        </form>
      )}

      {step === "verify" && (
        <form className="space-y-7" onSubmit={submitOtp}>
          <div className="sf-recovery-destination">
            <MailCheck aria-hidden="true" />
            <div>
              <strong>{copy.codeSent}</strong>
              <span>{email}</span>
            </div>
            <button type="button" onClick={changeEmail} disabled={pending || resending}>
              {copy.change}
            </button>
          </div>

          <div className="sf-recovery-otp" data-state={otpState}>
            <label htmlFor="password-reset-code" className="label-xs text-taupe">
              {copy.otpLabel}
            </label>
            <InputOTP
              id="password-reset-code"
              name="otp"
              maxLength={OTP_LENGTH}
              value={otp}
              onChange={(value) => {
                setOtp(value);
                if (otpState !== "idle") setOtpState("idle");
                if (error) setError("");
              }}
              pattern={REGEXP_ONLY_DIGITS}
              pasteTransformer={(value) => value.replace(/\D/g, "")}
              inputMode="numeric"
              autoComplete="one-time-code"
              autoFocus
              disabled={pending}
              dir="ltr"
              containerClassName="mt-3 w-full"
              aria-label={copy.otpLabel}
              aria-invalid={otpState !== "idle"}
              aria-describedby={error ? "recovery-error" : "recovery-otp-help"}
            >
              <InputOTPGroup className="sf-recovery-otp__group" dir="ltr">
                {Array.from({ length: OTP_LENGTH }, (_, index) => (
                  <InputOTPSlot key={index} index={index} className="sf-recovery-otp__cell" />
                ))}
              </InputOTPGroup>
            </InputOTP>
            <p id="recovery-otp-help" className="sf-recovery-otp__help">
              {copy.codeHelp(Math.max(1, Math.ceil(otpTtlSeconds / 60)))}
            </p>
          </div>

          <RecoveryError message={error} />
          <Button
            type="submit"
            variant="solid"
            size="wide"
            loading={pending}
            disabled={otp.length !== OTP_LENGTH || pending}
          >
            {pending ? copy.verifying : copy.verifyCode}
          </Button>

          <div className="sf-recovery-resend">
            <p>{copy.didNotReceive}</p>
            <button
              type="button"
              onClick={() => void resendCode()}
              disabled={resendSeconds > 0 || resending || pending}
            >
              {resending
                ? copy.resending
                : resendSeconds > 0
                  ? copy.resendIn(formatCountdown(resendSeconds))
                  : copy.resend}
            </button>
          </div>
        </form>
      )}

      {step === "reset" && (
        <form className="space-y-6" onSubmit={submitPassword}>
          <AuthField
            id="new-password"
            label={copy.newPassword}
            type="password"
            autoComplete="new-password"
            value={newPassword}
            onChange={(event) => setNewPassword(event.currentTarget.value)}
            autoFocus
          />
          <ul className="sf-password-requirements" aria-label={copy.passwordRequirements}>
            {passwordRequirements.map((requirement) => (
              <li key={requirement.label} data-met={requirement.met || undefined}>
                <Check aria-hidden="true" />
                {requirement.label}
              </li>
            ))}
          </ul>
          <AuthField
            id="confirm-password"
            label={copy.confirmPassword}
            type="password"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.currentTarget.value)}
            {...(passwordMismatch ? { error: copy.passwordMismatch } : {})}
          />
          <RecoveryError message={error} />
          <Button
            type="submit"
            variant="solid"
            size="wide"
            loading={pending}
            disabled={!passwordValid || !confirmPassword || passwordMismatch || pending}
          >
            {pending ? copy.updating : copy.updatePassword}
          </Button>
        </form>
      )}

      {step === "done" && (
        <div className="sf-recovery-success" role="status">
          <ShieldCheck aria-hidden="true" />
          <p>{copy.successMessage}</p>
          <Button asChild variant="solid" size="wide">
            <Link to="/sign-in" search={{ returnTo: undefined }}>
              {copy.signIn}
            </Link>
          </Button>
        </div>
      )}
    </AuthShell>
  );
}

function RecoveryError({ message }: { message: string }) {
  if (!message) return null;
  return (
    <p id="recovery-error" role="alert" aria-live="polite" className="sf-recovery-error">
      {message}
    </p>
  );
}

function recoveryError(problem: unknown, arabic: boolean) {
  const code = apiErrorCode(problem);
  const messages: Record<string, [string, string]> = {
    OTP_INVALID: [
      "The verification code is incorrect. Check it and try again.",
      "رمز التحقق غير صحيح. راجعيه وحاولي مرة أخرى.",
    ],
    OTP_EXPIRED: [
      "This verification code has expired. Request a new code.",
      "انتهت صلاحية رمز التحقق. اطلبي رمزاً جديداً.",
    ],
    OTP_TOO_MANY_ATTEMPTS: [
      "Too many incorrect attempts. Request a new code.",
      "تم إدخال الرمز بشكل خاطئ عدة مرات. اطلبي رمزاً جديداً.",
    ],
    OTP_RESEND_COOLDOWN: [
      "Please wait before requesting another code.",
      "انتظري قليلاً قبل طلب رمز جديد.",
    ],
    RATE_LIMITED: [
      "Too many requests. Please wait and try again.",
      "عدد المحاولات كبير. انتظري قليلاً ثم حاولي مرة أخرى.",
    ],
    INVALID_RESET_TOKEN: [
      "Your reset session has expired. Request a new code.",
      "انتهت جلسة إعادة التعيين. اطلبي رمزاً جديداً.",
    ],
  };
  const message = messages[code];
  return message ? message[arabic ? 1 : 0] : apiErrorMessage(problem, arabic ? "ar" : "en");
}

function formatCountdown(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(remainder).padStart(2, "0")}`;
}

const englishCopy = {
  label: "Account recovery",
  requestTitle: "Forgot your password?",
  requestIntro:
    "Enter the email associated with your account and we’ll send you a verification code.",
  verifyTitle: "Check your email.",
  verifyIntro: "For your security, enter the one-time code before choosing a new password.",
  resetTitle: "Choose a new password.",
  resetIntro: "Create a strong password you have not used for this account before.",
  doneTitle: "Password changed successfully.",
  doneIntro: "Your account is secure and ready for you.",
  returnToSignIn: "Return to sign in",
  emailLabel: "Email address",
  sendCode: "Send verification code",
  sending: "Sending code…",
  codeSent: "Verification code sent",
  change: "Change",
  otpLabel: "Verification code",
  codeHelp: (minutes: number) =>
    `Enter the ${OTP_LENGTH}-digit code. It expires in ${minutes} minutes and can be used once.`,
  verifying: "Verifying…",
  verifyCode: "Verify code",
  didNotReceive: "Didn’t receive the code?",
  resend: "Resend code",
  resending: "Sending a new code…",
  resendIn: (time: string) => `Resend code in ${time}`,
  newPassword: "New password",
  confirmPassword: "Confirm new password",
  passwordRequirements: "Password requirements",
  passwordLength: "At least 8 characters",
  passwordLowercase: "One lowercase letter",
  passwordUppercase: "One uppercase letter",
  passwordNumber: "One number",
  passwordMismatch: "Passwords do not match.",
  updatePassword: "Update password",
  updating: "Updating password…",
  successMessage: "Your password has been changed. Sign in with your new password to continue.",
  signIn: "Sign in",
};

const arabicCopy: typeof englishCopy = {
  label: "استعادة الحساب",
  requestTitle: "نسيتِ كلمة المرور؟",
  requestIntro: "أدخلي البريد الإلكتروني المرتبط بحسابك وسنرسل إليك رمز تحقق.",
  verifyTitle: "تحققي من بريدك الإلكتروني.",
  verifyIntro: "لحماية حسابك، أدخلي الرمز لمرة واحدة قبل اختيار كلمة مرور جديدة.",
  resetTitle: "اختاري كلمة مرور جديدة.",
  resetIntro: "أنشئي كلمة مرور قوية لم تستخدميها لهذا الحساب من قبل.",
  doneTitle: "تم تغيير كلمة المرور بنجاح.",
  doneIntro: "حسابك آمن وجاهز للمتابعة.",
  returnToSignIn: "العودة إلى تسجيل الدخول",
  emailLabel: "البريد الإلكتروني",
  sendCode: "إرسال رمز التحقق",
  sending: "جارٍ إرسال الرمز…",
  codeSent: "تم إرسال رمز التحقق",
  change: "تغيير",
  otpLabel: "رمز التحقق",
  codeHelp: (minutes: number) =>
    `أدخلي الرمز المكوّن من ${OTP_LENGTH} أرقام. تنتهي صلاحيته خلال ${minutes} دقائق ويُستخدم مرة واحدة.`,
  verifying: "جارٍ التحقق…",
  verifyCode: "التحقق من الرمز",
  didNotReceive: "لم يصلك الرمز؟",
  resend: "إرسال رمز جديد",
  resending: "جارٍ إرسال رمز جديد…",
  resendIn: (time: string) => `إرسال رمز جديد خلال ${time}`,
  newPassword: "كلمة المرور الجديدة",
  confirmPassword: "تأكيد كلمة المرور الجديدة",
  passwordRequirements: "متطلبات كلمة المرور",
  passwordLength: "ثمانية أحرف على الأقل",
  passwordLowercase: "حرف إنجليزي صغير واحد",
  passwordUppercase: "حرف إنجليزي كبير واحد",
  passwordNumber: "رقم واحد",
  passwordMismatch: "كلمتا المرور غير متطابقتين.",
  updatePassword: "تحديث كلمة المرور",
  updating: "جارٍ تحديث كلمة المرور…",
  successMessage: "تم تغيير كلمة المرور. سجّلي الدخول بكلمة المرور الجديدة للمتابعة.",
  signIn: "تسجيل الدخول",
};
