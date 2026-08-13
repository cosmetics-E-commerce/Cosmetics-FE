import { useEffect, useState, type FormEvent } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { MailCheck, ShieldCheck } from "lucide-react";
import { REGEXP_ONLY_DIGITS } from "input-otp";

import { AuthShell } from "@/components/layout/AuthShell";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import {
  apiErrorCode,
  apiRetryAfter,
  resendRegistrationOtp,
  verifyRegistrationEmail,
} from "@/lib/api";
import {
  clearPendingVerification,
  pendingResendSeconds,
  readPendingVerification,
  savePendingVerification,
  type PendingEmailVerification,
} from "@/lib/pending-verification";
import { verificationErrorMessage } from "@/lib/verification-errors";
import { createNoindexHead } from "@/lib/seo";

export const Route = createFileRoute("/verify-email")({
  head: ({ match }) =>
    createNoindexHead(
      match.search.lang === "ar" ? "تأكيد البريد الإلكتروني" : "Verify Email",
      "/verify-email",
      match.search.lang === "ar" ? "ar" : "en",
    ),
  component: VerifyEmail,
});

function VerifyEmail() {
  const navigate = useNavigate();
  const [hydrated, setHydrated] = useState(false);
  const [context, setContext] = useState<PendingEmailVerification | null>(null);
  const [otp, setOtp] = useState("");
  const [pending, setPending] = useState(false);
  const [resending, setResending] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [error, setError] = useState("");
  const [expired, setExpired] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const stored = readPendingVerification();
    setContext(stored);
    setSeconds(stored ? pendingResendSeconds(stored) : 0);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!context || seconds <= 0) return;
    const timer = window.setInterval(() => setSeconds(pendingResendSeconds(context)), 500);
    return () => window.clearInterval(timer);
  }, [context, seconds]);

  useEffect(() => {
    if (!success) return;
    const timer = window.setTimeout(() => {
      void navigate({
        to: "/login",
        search: { verified: true, returnTo: undefined },
      });
    }, 900);
    return () => window.clearTimeout(timer);
  }, [navigate, success]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!context || otp.length !== 6 || pending) return;
    setPending(true);
    setError("");
    try {
      await verifyRegistrationEmail(context.email, otp);
      clearPendingVerification();
      setSuccess(true);
    } catch (problem) {
      const code = apiErrorCode(problem);
      if (code === "EMAIL_ALREADY_VERIFIED") {
        clearPendingVerification();
        setSuccess(true);
        return;
      }
      if (code === "VERIFICATION_SESSION_EXPIRED") {
        clearPendingVerification();
        setExpired(true);
      }
      if (code === "OTP_TOO_MANY_ATTEMPTS" || code === "OTP_EXPIRED") {
        setOtp("");
      }
      setError(verificationErrorMessage(code));
    } finally {
      setPending(false);
    }
  }

  async function resend() {
    if (!context || seconds > 0 || resending) return;
    setResending(true);
    setError("");
    try {
      const result = await resendRegistrationOtp(context.email);
      const updated = savePendingVerification({
        email: context.email,
        maskedEmail: context.maskedEmail,
        resendAvailableInSeconds: result.resendAvailableInSeconds,
      });
      setContext(updated);
      setSeconds(result.resendAvailableInSeconds);
      setOtp("");
    } catch (problem) {
      const code = apiErrorCode(problem);
      const retryAfter = apiRetryAfter(problem);
      if (code === "OTP_RESEND_COOLDOWN" && retryAfter > 0) {
        const updated = savePendingVerification({
          email: context.email,
          maskedEmail: context.maskedEmail,
          resendAvailableInSeconds: retryAfter,
        });
        setContext(updated);
        setSeconds(retryAfter);
      }
      if (code === "EMAIL_ALREADY_VERIFIED") {
        clearPendingVerification();
        setSuccess(true);
        return;
      }
      if (code === "VERIFICATION_SESSION_EXPIRED") {
        clearPendingVerification();
        setExpired(true);
      }
      setError(verificationErrorMessage(code));
    } finally {
      setResending(false);
    }
  }

  if (!hydrated) {
    return (
      <AuthShell
        label="Verification"
        title="Preparing verification."
        intro="Loading your pending registration securely."
        footer={<span>Please wait.</span>}
      >
        <div className="h-40 animate-pulse bg-ivory" aria-label="Loading verification" />
      </AuthShell>
    );
  }

  if (!context || expired) {
    return (
      <AuthShell
        label="Verification"
        title="Start with registration."
        intro={
          expired
            ? "Your 12-hour verification window has expired. Create your account again to receive a new code."
            : "There is no pending email verification in this browser session."
        }
        footer={
          <Link
            to="/login"
            search={{ verified: undefined, returnTo: undefined }}
            className="text-gold hover:underline"
          >
            Already verified? Sign in
          </Link>
        }
      >
        {error && (
          <p
            role="alert"
            className="mb-6 border border-destructive/30 p-4 text-sm text-destructive"
          >
            {error}
          </p>
        )}
        <Button asChild variant="solid" size="wide">
          <Link to="/register">Create account</Link>
        </Button>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      label="Email verification"
      title={success ? "Email verified." : "Check your email."}
      intro={
        success
          ? "Your BIOREZA account is active. Continue to sign in with your password."
          : `We sent a 6-digit verification code to ${context.maskedEmail}.`
      }
      footer={
        <Link to="/register" className="text-gold hover:underline">
          Use a different email
        </Link>
      }
    >
      {success ? (
        <div role="status" className="border border-gold/40 bg-ivory p-6 text-center">
          <ShieldCheck className="mx-auto size-8 text-gold" strokeWidth={1} aria-hidden="true" />
          <p className="mt-4 text-sm">Email verified successfully. Redirecting to login…</p>
        </div>
      ) : (
        <form className="space-y-7" onSubmit={submit}>
          <div>
            <label htmlFor="verification-code" className="label-xs text-taupe">
              Verification code
            </label>
            <InputOTP
              id="verification-code"
              name="otp"
              maxLength={6}
              value={otp}
              onChange={setOtp}
              pattern={REGEXP_ONLY_DIGITS}
              inputMode="numeric"
              autoComplete="one-time-code"
              disabled={pending}
              containerClassName="mt-3 w-full"
              aria-describedby={error ? "verification-error" : "verification-help"}
            >
              <InputOTPGroup className="grid w-full grid-cols-6 gap-2">
                {Array.from({ length: 6 }, (_, index) => (
                  <InputOTPSlot
                    key={index}
                    index={index}
                    className="h-12 w-full border border-input bg-warm-white font-serif text-lg first:rounded-none first:border last:rounded-none"
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>
            <p id="verification-help" className="mt-3 text-xs text-muted-foreground">
              The code expires after 10 minutes and can only be used once.
            </p>
          </div>

          {error && (
            <p
              id="verification-error"
              role="alert"
              aria-live="polite"
              className="border border-destructive/30 p-4 text-sm text-destructive"
            >
              {error}
            </p>
          )}

          <Button
            type="submit"
            variant="solid"
            size="wide"
            loading={pending}
            disabled={otp.length !== 6 || pending}
          >
            Verify email
          </Button>

          <div className="border-t border-border pt-6 text-center">
            <MailCheck className="mx-auto size-5 text-gold" strokeWidth={1} aria-hidden="true" />
            <p className="mt-3 text-sm text-muted-foreground">Didn&apos;t receive the code?</p>
            <button
              type="button"
              onClick={() => void resend()}
              disabled={seconds > 0 || resending}
              className="label-xs mt-3 min-h-11 text-gold disabled:cursor-not-allowed disabled:text-taupe"
            >
              {resending
                ? "Sending code…"
                : seconds > 0
                  ? `Resend code in ${seconds}s`
                  : "Resend code"}
            </button>
          </div>
        </form>
      )}
    </AuthShell>
  );
}
