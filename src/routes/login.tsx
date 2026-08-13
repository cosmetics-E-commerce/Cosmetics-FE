import { createFileRoute } from "@tanstack/react-router";

import { SignInPage } from "@/components/auth/SignInPage";
import { createNoindexHead } from "@/lib/seo";

type LoginSearch = {
  returnTo?: "/checkout" | undefined;
  verified?: boolean | undefined;
};

export const Route = createFileRoute("/login")({
  validateSearch: (raw: Record<string, unknown>): LoginSearch => ({
    returnTo: raw["returnTo"] === "/checkout" ? ("/checkout" as const) : undefined,
    verified: raw["verified"] === true || raw["verified"] === "true" || undefined,
  }),
  head: ({ match }) =>
    createNoindexHead(
      match.search.lang === "ar" ? "تسجيل الدخول" : "Sign In",
      "/sign-in",
      match.search.lang === "ar" ? "ar" : "en",
    ),
  component: Login,
});

function Login() {
  const search = Route.useSearch();
  return <SignInPage returnTo={search.returnTo} verified={search.verified} />;
}
