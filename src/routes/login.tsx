import { createFileRoute } from "@tanstack/react-router";

import { SignInPage } from "@/components/auth/SignInPage";

type LoginSearch = {
  returnTo?: "/checkout" | undefined;
  verified?: boolean | undefined;
};

export const Route = createFileRoute("/login")({
  validateSearch: (raw: Record<string, unknown>): LoginSearch => ({
    returnTo: raw["returnTo"] === "/checkout" ? ("/checkout" as const) : undefined,
    verified: raw["verified"] === true || raw["verified"] === "true" || undefined,
  }),
  head: () => ({ meta: [{ title: "Sign in — BIOREZA" }] }),
  component: Login,
});

function Login() {
  const search = Route.useSearch();
  return <SignInPage returnTo={search.returnTo} verified={search.verified} />;
}
