import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Minus, Plus, X } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { PolishedImage } from "@/components/ui/polished-image";
import { formatPrice } from "@/lib/products";
import { useStore } from "@/lib/store";
import { useMotionPreferences } from "@/components/motion/motion-context";
import { useI18n } from "@/lib/i18n";

export function CartDrawer() {
  const { t } = useI18n();
  const [removingVariant, setRemovingVariant] = useState<string | null>(null);
  const { reducedMotion } = useMotionPreferences();
  const {
    cartOpen,
    setCartOpen,
    lines,
    count,
    subtotal,
    estimatedTotal,
    discountTotal,
    appliedPromotions,
    setQty,
    remove,
    cartLoading,
    pendingVariants,
  } = useStore();
  const hasIssues = lines.some((line) => line.status !== "AVAILABLE" || line.issues.length > 0);
  const removeLine = async (variantId: string) => {
    setRemovingVariant(variantId);
    if (!reducedMotion) await new Promise((resolve) => window.setTimeout(resolve, 260));
    try {
      await remove(variantId);
    } finally {
      setRemovingVariant(null);
    }
  };

  return (
    <Sheet open={cartOpen} onOpenChange={setCartOpen}>
      <SheetContent
        side="right"
        className="flex w-full flex-col gap-0 border-l border-border bg-warm-white p-0 sm:max-w-md"
      >
        <SheetHeader className="border-b border-border px-6 py-5 text-start">
          <SheetTitle className="label-sm font-normal">
            {t("cart.title")} ({count})
          </SheetTitle>
        </SheetHeader>

        {cartLoading ? (
          <div className="space-y-5 p-6" aria-label="Loading shopping bag">
            {[0, 1].map((item) => (
              <div key={item} className="flex gap-4">
                <div className="h-28 w-20 animate-pulse bg-stone" />
                <div className="flex-1 space-y-3 py-2">
                  <div className="h-5 w-3/4 animate-pulse bg-stone" />
                  <div className="h-3 w-1/3 animate-pulse bg-stone" />
                </div>
              </div>
            ))}
          </div>
        ) : lines.length === 0 ? (
          <div className="rise-in flex flex-1 flex-col items-center justify-center gap-4 px-10 text-center">
            <p className="font-serif text-2xl">{t("cart.emptyTitle")}</p>
            <p className="text-sm text-muted-foreground">{t("cart.drawerEmptyCopy")}</p>
            <Button asChild variant="line" size="pill">
              <Link to="/shop" onClick={() => setCartOpen(false)}>
                {t("cart.emptyAction")}
              </Link>
            </Button>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-border overflow-y-auto px-6" aria-live="polite">
              {lines.map((line, index) => {
                const pending = pendingVariants.includes(line.variantId);
                return (
                  <li
                    key={line.variantId}
                    className="cart-line rise-in flex gap-4 py-6"
                    style={{ animationDelay: `${Math.min(index * 35, 140)}ms` }}
                    aria-busy={pending || undefined}
                    data-removing={removingVariant === line.variantId || undefined}
                  >
                    <PolishedImage
                      src={line.image}
                      alt={line.name}
                      loading="lazy"
                      wrapperClassName="h-28 w-20 shrink-0"
                      className="size-full object-cover"
                    />
                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <h3 className="truncate font-serif text-lg">
                            <Link
                              to="/product/$slug"
                              params={{ slug: line.slug }}
                              preload="intent"
                              onClick={() => setCartOpen(false)}
                              className="hover:text-gold"
                            >
                              {line.name}
                            </Link>
                          </h3>
                          <p className="label-xs mt-1 text-taupe">{line.size}</p>
                        </div>
                        <button
                          type="button"
                          disabled={pending}
                          onClick={() => void removeLine(line.variantId)}
                          aria-label={`Remove ${line.name}`}
                          className="grid size-9 shrink-0 place-items-center text-taupe transition-[color,transform] duration-200 hover:text-foreground active:scale-90 disabled:opacity-40"
                        >
                          <X className="size-4" />
                        </button>
                      </div>
                      {line.issues.length > 0 && (
                        <p role="alert" className="mt-2 text-xs text-destructive">
                          {line.issues.join(" · ")}
                        </p>
                      )}
                      <div className="mt-auto flex items-center justify-between gap-3">
                        <div className="flex border border-border">
                          <button
                            type="button"
                            disabled={pending || line.qty <= 1}
                            onClick={() => void setQty(line.variantId, line.qty - 1)}
                            aria-label={`Decrease quantity of ${line.name}`}
                            className="grid size-9 place-items-center text-taupe hover:text-gold disabled:opacity-40"
                          >
                            <Minus className="size-3" />
                          </button>
                          <span
                            key={line.qty}
                            className="count-change grid w-8 place-items-center text-sm"
                          >
                            {line.qty}
                          </span>
                          <button
                            type="button"
                            disabled={pending || line.qty >= line.maxAvailable}
                            onClick={() => void setQty(line.variantId, line.qty + 1)}
                            aria-label={`Increase quantity of ${line.name}`}
                            className="grid size-9 place-items-center text-taupe hover:text-gold disabled:opacity-40"
                          >
                            <Plus className="size-3" />
                          </button>
                        </div>
                        <span
                          key={`${line.qty}-${line.price}`}
                          className="count-change font-serif text-lg text-gold"
                        >
                          {formatPrice(line.price * line.qty)}
                        </span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="border-t border-border px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-6">
              <div className="flex items-baseline justify-between">
                <span className="label-sm text-taupe">{t("cart.subtotal")}</span>
                <span key={subtotal} className="count-change font-serif text-2xl">
                  {formatPrice(subtotal)}
                </span>
              </div>
              {appliedPromotions.map((promotion) => (
                <div key={promotion.id} className="mt-2 flex justify-between text-xs text-gold">
                  <span>{promotion.title}</span>
                  <span>-{formatPrice(promotion.discountAmount / 100)}</span>
                </div>
              ))}
              {discountTotal > 0 && (
                <div className="mt-4 flex items-baseline justify-between border-t border-border pt-4">
                  <span className="label-sm text-taupe">{t("cart.afterOffers")}</span>
                  <span className="font-serif text-2xl">{formatPrice(estimatedTotal)}</span>
                </div>
              )}
              <p className="mt-3 text-xs text-muted-foreground">{t("cart.deliveryNote")}</p>
              {hasIssues && (
                <p
                  role="alert"
                  className="mt-4 border-s-2 border-destructive ps-3 text-xs text-destructive"
                >
                  {t("cart.issue")}
                </p>
              )}
              <div className="mt-6 grid gap-3">
                {hasIssues ? (
                  <Button variant="solid" size="wide" disabled>
                    {t("cart.checkout")}
                  </Button>
                ) : (
                  <Button asChild variant="solid" size="wide">
                    <Link to="/checkout" onClick={() => setCartOpen(false)}>
                      {t("cart.checkout")}
                    </Link>
                  </Button>
                )}
                <Button asChild variant="quiet" size="wide">
                  <Link to="/cart" onClick={() => setCartOpen(false)}>
                    {t("cart.view")}
                  </Link>
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
