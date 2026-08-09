import { useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthShell, AuthField } from "@/components/layout/AuthShell";
import { Button } from "@/components/ui/button";
import { apiErrorMessage, forgotPassword, resetPassword, verifyResetOtp } from "@/lib/api";
export const Route = createFileRoute("/forgot-password")({
  head: () => ({ meta: [{ title: "Reset password — BIOREZA" }] }),
  component: Forgot,
});
function Forgot() {
  const [step, setStep] = useState<"request" | "verify" | "reset" | "done">("request");
  const [identifier, setIdentifier] = useState("");
  const [channel, setChannel] = useState<"EMAIL" | "SMS">("EMAIL");
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setPending(true);
    setError("");
    try {
      if (step === "request") {
        const value = String(data.get("identifier"));
        const delivery = data.get("channel") as "EMAIL" | "SMS";
        await forgotPassword(value, delivery);
        setIdentifier(value);
        setChannel(delivery);
        setStep("verify");
      } else if (step === "verify") {
        const result = await verifyResetOtp(identifier, channel, String(data.get("otp")));
        setToken(result.token);
        setStep("reset");
      } else if (step === "reset") {
        await resetPassword(
          identifier,
          token,
          String(data.get("password")),
          String(data.get("confirmPassword")),
        );
        setStep("done");
      }
    } catch (problem) {
      setError(apiErrorMessage(problem));
    } finally {
      setPending(false);
    }
  }
  return (
    <AuthShell
      label="Account recovery"
      title={step === "done" ? "Password updated." : "Reset your password."}
      intro="We verify every reset with a one-time code before accepting a new password."
      footer={
        <Link to="/sign-in" search={{ returnTo: undefined }} className="text-gold hover:underline">
          Return to sign in
        </Link>
      }
    >
      {step === "done" ? (
        <div className="border border-gold/40 bg-ivory p-6">
          <p>Your password is ready. You can now sign in securely.</p>
          <Button asChild variant="solid" size="wide" className="mt-6">
            <Link to="/sign-in" search={{ returnTo: undefined }}>
              Sign in
            </Link>
          </Button>
        </div>
      ) : (
        <form className="space-y-6" onSubmit={submit}>
          {step === "request" && (
            <>
              <AuthField id="identifier" label="Email or Egyptian mobile number" />
              <div>
                <label htmlFor="channel" className="label-xs text-taupe">
                  Send code by
                </label>
                <select
                  id="channel"
                  name="channel"
                  className="mt-2 h-12 w-full border border-input bg-warm-white px-4"
                >
                  <option value="EMAIL">Email</option>
                  <option value="SMS">SMS</option>
                </select>
              </div>
            </>
          )}
          {step === "verify" && (
            <>
              <p className="text-sm text-muted-foreground">
                Enter the six-digit code sent to {identifier}.
              </p>
              <AuthField id="otp" label="Verification code" autoComplete="one-time-code" />
            </>
          )}
          {step === "reset" && (
            <>
              <AuthField
                id="password"
                label="New password"
                type="password"
                autoComplete="new-password"
              />
              <AuthField
                id="confirmPassword"
                label="Confirm new password"
                type="password"
                autoComplete="new-password"
              />
            </>
          )}
          {error && (
            <p role="alert" className="border border-destructive/30 p-4 text-sm text-destructive">
              {error}
            </p>
          )}
          <Button type="submit" variant="solid" size="wide" disabled={pending}>
            {pending
              ? "Please wait..."
              : step === "request"
                ? "Send verification code"
                : step === "verify"
                  ? "Verify code"
                  : "Update password"}
          </Button>
        </form>
      )}
    </AuthShell>
  );
}
