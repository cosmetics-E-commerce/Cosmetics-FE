import { useState, type FormEvent } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { AuthShell, AuthField } from "@/components/layout/AuthShell";
import { Button } from "@/components/ui/button";
import { apiErrorCode, apiErrorMessage, register } from "@/lib/api";
import {
  savePendingEmailAfterDeliveryFailure,
  savePendingVerification,
} from "@/lib/pending-verification";
import { normalizeEgyptPhone } from "@/lib/forms";
import { createNoindexHead } from "@/lib/seo";
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
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email"));
    const password = String(data.get("password"));
    const rePassword = String(data.get("rePassword"));
    if (password !== rePassword) {
      setError("The passwords do not match. Re-enter the confirmation password.");
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
        phone: normalizeEgyptPhone(String(data.get("phone"))),
        email,
        gender: data.get("gender"),
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
      label="Membership"
      title="Join BIOREZA."
      intro="Create your account for saved addresses, order tracking and a private wishlist."
      footer={
        <>
          Already a member?{" "}
          <Link
            to="/sign-in"
            search={{ returnTo: undefined }}
            className="text-gold hover:underline"
          >
            Sign in
          </Link>
        </>
      }
    >
      <form className="space-y-5" onSubmit={submit}>
        <div className="grid gap-5 sm:grid-cols-2">
          <AuthField id="firstName" label="First name" autoComplete="given-name" />
          <AuthField id="lastName" label="Last name" autoComplete="family-name" />
        </div>
        <AuthField
          id="phone"
          label="Egyptian mobile number"
          type="tel"
          autoComplete="tel"
          pattern="01[0125][0-9]{8}"
          minLength={11}
          maxLength={11}
          hint="11 digits, such as 01012345678."
        />
        <AuthField id="email" label="Email" type="email" autoComplete="email" />
        <div>
          <label htmlFor="gender" className="label-xs text-taupe">
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            required
            data-form-control="auth-select"
            className="sf-auth-select"
          >
            <option value="FEMALE">Female</option>
            <option value="MALE">Male</option>
            <option value="OTHER">Prefer not to say</option>
          </select>
        </div>
        <AuthField
          id="password"
          label="Password"
          type="password"
          autoComplete="new-password"
          minLength={8}
          pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}"
          hint="Use 8+ characters with uppercase, lowercase and a number."
        />
        <AuthField
          id="rePassword"
          label="Confirm password"
          type="password"
          autoComplete="new-password"
        />
        {error && (
          <p role="alert" className="border border-destructive/30 p-4 text-sm text-destructive">
            {error}
          </p>
        )}
        <Button type="submit" variant="solid" size="wide" loading={pending}>
          Create account
        </Button>
      </form>
    </AuthShell>
  );
}
