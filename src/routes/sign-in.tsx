import { useState, type FormEvent } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { LoaderCircle } from "lucide-react";
import { AuthShell, AuthField } from "@/components/layout/AuthShell";
import { Button } from "@/components/ui/button";
import { apiErrorMessage, login } from "@/lib/api";
import { useStore } from "@/lib/store";
export const Route = createFileRoute("/sign-in")({
  head: () => ({ meta: [{ title: "Sign in — BIOREZA" }] }),
  component: SignIn,
});
function SignIn() {
  const navigate = useNavigate();
  const { setSession } = useStore();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError("");
    const data = new FormData(event.currentTarget);
    try {
      const session = await login(String(data.get("identifier")), String(data.get("password")));
      setSession(session);
      await navigate({ to: "/account" });
    } catch (problem) {
      setError(apiErrorMessage(problem));
    } finally {
      setPending(false);
    }
  }
  return (
    <AuthShell
      label="Account"
      title="Welcome back."
      intro="Sign in with your email or Egyptian mobile number to manage orders and delivery addresses."
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
        <AuthField id="identifier" label="Email or mobile number" autoComplete="username" />
        <AuthField id="password" label="Password" type="password" autoComplete="current-password" />
        <div className="text-end">
          <Link to="/forgot-password" className="label-xs text-taupe hover:text-gold">
            Forgot password
          </Link>
        </div>
        {error && (
          <p role="alert" className="border border-destructive/30 p-4 text-sm text-destructive">
            {error}
          </p>
        )}
        <Button type="submit" variant="solid" size="wide" loading={pending}>
          Sign in
        </Button>
      </form>
    </AuthShell>
  );
}
