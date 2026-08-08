import { useState, type FormEvent } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { AuthShell, AuthField } from "@/components/layout/AuthShell";
import { Button } from "@/components/ui/button";
import { apiErrorMessage, register } from "@/lib/api";
import { useStore } from "@/lib/store";
export const Route = createFileRoute("/register")({
  head: () => ({ meta: [{ title: "Create account — BIOREZA" }] }),
  component: Register,
});
function Register() {
  const navigate = useNavigate();
  const { setSession } = useStore();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setPending(true);
    setError("");
    try {
      const result = await register({
        firstName: data.get("firstName"),
        lastName: data.get("lastName"),
        phone: data.get("phone"),
        email: data.get("email"),
        gender: data.get("gender"),
        password: data.get("password"),
        rePassword: data.get("rePassword"),
        otpChannel: "EMAIL",
      });
      if ("tokens" in result) {
        setSession(result);
        await navigate({ to: "/account" });
      } else {
        toast("Account created", {
          description: "Check your email for the verification code, then sign in.",
        });
        await navigate({ to: "/sign-in" });
      }
    } catch (problem) {
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
          <Link to="/sign-in" className="text-gold hover:underline">
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
        <AuthField id="phone" label="Egyptian mobile number" type="tel" autoComplete="tel" />
        <AuthField id="email" label="Email" type="email" autoComplete="email" />
        <div>
          <label htmlFor="gender" className="label-xs text-taupe">
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            required
            className="mt-2 h-12 w-full border border-input bg-warm-white px-4 text-sm"
          >
            <option value="FEMALE">Female</option>
            <option value="MALE">Male</option>
            <option value="OTHER">Prefer not to say</option>
          </select>
        </div>
        <AuthField id="password" label="Password" type="password" autoComplete="new-password" />
        <AuthField
          id="rePassword"
          label="Confirm password"
          type="password"
          autoComplete="new-password"
        />
        <p className="text-xs leading-relaxed text-muted-foreground">
          Use 8+ characters with uppercase, lowercase and a number.
        </p>
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
