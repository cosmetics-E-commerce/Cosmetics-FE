import { createFileRoute } from "@tanstack/react-router";
import { SignInPage } from "@/components/auth/SignInPage";
import { createNoindexHead } from "@/lib/seo";

type SignInSearch = {
  returnTo?: "/checkout" | undefined;
  verified?: boolean | undefined;
};

export const Route = createFileRoute("/sign-in")({
  validateSearch: (raw: Record<string, unknown>): SignInSearch => ({
    returnTo: raw["returnTo"] === "/checkout" ? ("/checkout" as const) : undefined,
    verified: raw["verified"] === true || raw["verified"] === "true" || undefined,
  }),
  head: ({ match }) =>
    createNoindexHead(
      match.search.lang === "ar" ? "تسجيل الدخول" : "Sign In",
      "/sign-in",
      match.search.lang === "ar" ? "ar" : "en",
    ),
  component: SignIn,
});
function SignIn() {
  const search = Route.useSearch();
  return <SignInPage returnTo={search.returnTo} verified={search.verified} />;
}
