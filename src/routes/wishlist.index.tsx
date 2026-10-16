import { useEffect } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Heart, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/shop/ProductCard";
import { listProductsByIds } from "@/lib/api";
import { mapProduct } from "@/lib/catalog";
import { createNoindexHead } from "@/lib/seo";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/wishlist/")({
  head: ({ match }) =>
    createNoindexHead(
      match.search.lang === "ar" ? "المفضلة" : "Wishlist",
      "/wishlist",
      match.search.lang === "ar" ? "ar" : "en",
    ),
  component: WishlistPage,
});

/** The signed-out wishlist. Signed-in shoppers keep theirs in the account. */
function WishlistPage() {
  const { locale, user, authHydrated, guestWishlist } = useStore();
  const ar = locale === "ar";
  const navigate = useNavigate();
  useEffect(() => {
    if (authHydrated && user) {
      void navigate({ to: "/account", search: { section: "wishlist" }, replace: true });
    }
  }, [authHydrated, navigate, user]);

  const ids = guestWishlist.map((item) => item.productId);
  const products = useQuery({
    queryKey: ["guest-wishlist", ids.join(",")],
    queryFn: ({ signal }) => listProductsByIds(ids, signal),
    enabled: !user && ids.length > 0,
  });
  // Keep the order the shopper saved them in.
  const order = new Map(ids.map((id, index) => [id, index]));
  const items = (products.data ?? [])
    .slice()
    .sort((a, b) => (order.get(a.id) ?? 0) - (order.get(b.id) ?? 0))
    .map((product) => mapProduct(product, locale));

  return (
    <main className="mx-auto max-w-6xl px-5 py-16 md:px-10 md:py-20">
      <p className="label-xs text-gold">{ar ? "محفوظ على هذا الجهاز" : "Saved on this device"}</p>
      <h1 className="display mt-3 text-[clamp(2rem,4vw,3rem)]">{ar ? "المفضلة" : "Wishlist"}</h1>
      {guestWishlist.length > 0 && (
        <p className="mt-3 text-sm text-muted-foreground">
          {ar
            ? "سجّلي الدخول لحفظها في حسابك على كل أجهزتك. "
            : "Sign in to keep it on every device. "}
          <Link to="/sign-in" search={{ returnTo: undefined }} className="underline">
            {ar ? "تسجيل الدخول" : "Sign in"}
          </Link>
        </p>
      )}
      {!guestWishlist.length ? (
        <div className="mt-16 grid justify-items-center gap-4 text-center">
          <Heart className="size-8 text-gold" aria-hidden="true" />
          <h2 className="text-xl font-semibold">
            {ar ? "لم تحفظي أي منتج بعد" : "Nothing saved yet"}
          </h2>
          <p className="max-w-sm text-sm text-muted-foreground">
            {ar
              ? "اضغطي على القلب في أي منتج لحفظه هنا — بدون حساب."
              : "Tap the heart on any product to save it here — no account needed."}
          </p>
          <Button asChild variant="solid" size="pill">
            <Link to="/shop">{ar ? "تصفحي المنتجات" : "Explore products"}</Link>
          </Button>
        </div>
      ) : products.isLoading ? (
        <div className="grid min-h-[30vh] place-items-center">
          <LoaderCircle className="animate-spin text-gold" />
        </div>
      ) : (
        <div className="sf-shop-products sf-shop-products--grid mt-10">
          {items.map((product) => (
            <ProductCard key={product.slug} product={product} compact />
          ))}
        </div>
      )}
    </main>
  );
}
