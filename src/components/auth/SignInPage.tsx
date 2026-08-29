import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "@tanstack/react-router";

import { AuthField, AuthShell } from "@/components/layout/AuthShell";
import { Button } from "@/components/ui/button";
import { apiErrorCode, apiErrorMessage, login } from "@/lib/api";
import { savePendingEmailAfterDeliveryFailure } from "@/lib/pending-verification";
import { useStore } from "@/lib/store";

export function SignInPage({
  returnTo,
  verified = false,
}: {
  returnTo?: "/checkout" | undefined;
  verified?: boolean | undefined;
}) {
  const navigate = useNavigate();
  const { locale, setSession } = useStore();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [verificationPending, setVerificationPending] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError("");
    setVerificationPending(false);
    const data = new FormData(event.currentTarget);
    const identifier = String(data.get("identifier"));
    try {
      const session = await login(identifier, String(data.get("password")));
      await setSession(session);
      await navigate({ to: returnTo ?? "/account" });
    } catch (problem) {
      if (apiErrorCode(problem) === "EMAIL_NOT_VERIFIED" && identifier.includes("@")) {
        savePendingEmailAfterDeliveryFailure(identifier);
        setVerificationPending(true);
        setError(
          locale === "ar"
            ? "تحققي من بريدك الإلكتروني قبل تسجيل الدخول."
            : "Please verify your email before signing in.",
        );
      } else {
        setError(apiErrorMessage(problem, locale));
      }
    } finally {
      setPending(false);
    }
  }

  return (
    <AuthShell
      label="Account"
      title="Welcome back."
      intro="Sign in with your email or phone number to manage orders and delivery addresses."
      footer={
        <>
          New to BIOREZA?{" "}
          <Link to="/register" className="text-gold hover:underline">
            Create an account
          </Link>
        </>
      }
    >
      <form className="space-y-6" onSubmit={submit}>
        {verified && (
          <p role="status" className="border border-gold/40 bg-ivory p-4 text-sm text-foreground">
            Email verified successfully. You can now sign in.
          </p>
        )}
        <AuthField id="identifier" label="Email or mobile number" autoComplete="username" />
        <AuthField id="password" label="Password" type="password" autoComplete="current-password" />
        <div className="text-end">
          <Link to="/forgot-password" className="label-xs text-taupe hover:text-gold">
            Forgot password
          </Link>
        </div>
        {error && (
          <div role="alert" className="border border-destructive/30 p-4 text-sm text-destructive">
            <p>{error}</p>
            {verificationPending && (
              <Link to="/verify-email" className="mt-3 inline-block text-gold underline">
                Enter verification code
              </Link>
            )}
          </div>
        )}
        <Button type="submit" variant="solid" size="wide" loading={pending}>
          Sign in
        </Button>
      </form>
    </AuthShell>
  );
}
