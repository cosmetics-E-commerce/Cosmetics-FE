import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Minus, Plus, Tag, X } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { PolishedImage } from "@/components/ui/polished-image";
import { formatPrice } from "@/lib/products";
import { useStore } from "@/lib/store";
import { Reveal } from "@/components/motion/Primitives";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Shopping Bag — BIOREZA" }] }),
  component: CartPage,
});

function CartPage() {
  const { t, locale } = useI18n();
  const {
    lines,
    subtotal,
    discountTotal,
    estimatedTotal,
    totalSavings,
    couponCode,
    appliedPromotions,
    promotionMessages,
    cartLoading,
    setQty,
    remove,
    pendingVariants,
    applyCoupon,
    removeCoupon,
  } = useStore();
  const [code, setCode] = useState("");
  const [applyingCode, setApplyingCode] = useState(false);
  const [codeError, setCodeError] = useState("");
  const hasIssues = lines.some((line) => line.status !== "AVAILABLE" || line.issues.length > 0);

  const submitCode = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalized = code.trim().toUpperCase();
    if (!normalized) {
      setCodeError(locale === "ar" ? "أدخلي رمز الخصم أولاً." : "Enter a promo code first.");
      return;
    }
    setCodeError("");
    setApplyingCode(true);
    const applied = await applyCoupon(normalized);
    if (applied) setCode("");
    else
      setCodeError(
        locale === "ar"
          ? "تعذر تطبيق هذا الرمز. تحققي منه وحاولي مرة أخرى."
          : "That code could not be applied. Check it and try again.",
      );
    setApplyingCode(false);
  };

  return (
    <div className="mx-auto max-w-[1400px] px-5 pb-32 pt-14 md:px-10 lg:py-20">
      <Reveal stagger distance={20}>
        <p className="label-xs text-gold">{t("cart.eyebrow")}</p>
        <h1 className="display mt-5 text-[clamp(2.2rem,4.4vw,3.4rem)]">{t("cart.title")}</h1>
      </Reveal>

      {cartLoading ? (
        <div
          className="mt-14 grid gap-8 lg:grid-cols-[1fr_380px]"
          aria-label="Loading shopping bag"
        >
          <div className="h-72 animate-pulse bg-stone" />
          <div className="h-64 animate-pulse bg-stone" />
        </div>
      ) : lines.length === 0 ? (
        <Reveal className="mt-14 border border-border px-8 py-24 text-center">
          <h2 className="font-serif text-3xl">{t("cart.emptyTitle")}</h2>
          <Button asChild variant="line" size="pill" className="mt-8">
            <Link to="/shop">{t("cart.emptyAction")}</Link>
          </Button>
        </Reveal>
      ) : (
        <Reveal stagger className="mt-14 grid gap-12 lg:grid-cols-[1fr_380px]">
          <Reveal
            as="ul"
            stagger
            staggerMs={62}
            distance={20}
            className="divide-y divide-border border-y border-border"
            aria-live="polite"
          >
            {lines.map((line) => {
              const pending = pendingVariants.includes(line.variantId);
              return (
                <li
                  key={line.variantId}
                  className="flex gap-4 py-7 sm:gap-5"
                  aria-busy={pending || undefined}
                >
                  <PolishedImage
                    src={line.image}
                    alt={line.name}
                    loading="lazy"
                    wrapperClassName="h-32 w-24 shrink-0 sm:h-36 sm:w-28"
                    className="size-full object-cover"
                  />
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h2 className="truncate font-serif text-xl sm:text-2xl">
                          <Link
                            to="/product/$slug"
                            params={{ slug: line.slug }}
                            preload="intent"
                            className="hover:text-gold"
                          >
                            {line.name}
                          </Link>
                        </h2>
                        <p className="label-xs mt-2 text-taupe">{line.size}</p>
                      </div>
                      <button
                        type="button"
                        disabled={pending}
                        onClick={() => void remove(line.variantId)}
                        aria-label={`Remove ${line.name}`}
                        className="grid size-11 place-items-center text-taupe hover:text-foreground disabled:opacity-40"
                      >
                        <X className="size-4" />
                      </button>
                    </div>
                    {line.issues.length > 0 && (
                      <p role="alert" className="mt-2 text-xs text-destructive">
                        {line.issues.join(" · ")}
                      </p>
                    )}
                    <div className="mt-auto flex flex-wrap items-center justify-between gap-3">
                      <div className="flex border border-border">
                        <button
                          type="button"
                          disabled={pending || line.qty <= 1}
                          onClick={() => void setQty(line.variantId, line.qty - 1)}
                          aria-label={`Decrease quantity of ${line.name}`}
                          className="grid size-11 place-items-center disabled:opacity-40"
                        >
                          <Minus className="size-3" />
                        </button>
                        <span key={line.qty} className="count-change grid w-10 place-items-center">
                          {line.qty}
                        </span>
                        <button
                          type="button"
                          disabled={pending || line.qty >= line.maxAvailable}
                          onClick={() => void setQty(line.variantId, line.qty + 1)}
                          aria-label={`Increase quantity of ${line.name}`}
                          className="grid size-11 place-items-center disabled:opacity-30"
                        >
                          <Plus className="size-3" />
                        </button>
                      </div>
                      <span
                        key={`${line.qty}-${line.price}`}
                        className="count-change font-serif text-xl text-gold"
                      >
                        {formatPrice(line.price * line.qty)}
                      </span>
                    </div>
                  </div>
                </li>
              );
            })}
          </Reveal>
          <aside className="h-fit border border-border bg-ivory p-8 lg:sticky lg:top-32">
            <h2 className="label-sm">{t("cart.summary")}</h2>
            <div className="rule-gold my-6" />
            {promotionMessages.length > 0 && (
              <div className="mb-5 space-y-2">
                {promotionMessages.map((message) => (
                  <p key={message} className="flex gap-2 bg-warm-white p-3 text-xs text-foreground">
                    <Check className="size-4 shrink-0 text-gold" />
                    {message}
                  </p>
                ))}
              </div>
            )}
            <div className="flex items-baseline justify-between">
              <span>{t("cart.subtotal")}</span>
              <span key={subtotal} className="count-change font-serif text-3xl">
                {formatPrice(subtotal)}
              </span>
            </div>
            {appliedPromotions.map((promotion) => (
              <div key={promotion.id} className="mt-3 flex justify-between text-sm text-gold">
                <span>{promotion.title}</span>
                <span>-{formatPrice(promotion.discountAmount / 100)}</span>
              </div>
            ))}
            {discountTotal > 0 && (
              <div className="mt-5 flex items-baseline justify-between border-t border-border pt-5">
                <span>{t("cart.estimated")}</span>
                <span className="font-serif text-3xl">{formatPrice(estimatedTotal)}</span>
              </div>
            )}
            {totalSavings > 0 && (
              <p className="mt-3 text-sm text-gold">
                {t("cart.savings")} {formatPrice(totalSavings)}
              </p>
            )}
            <form className="mt-6" onSubmit={submitCode}>
              <div className="flex">
                <label className="sr-only" htmlFor="coupon">
                  {t("cart.promo")}
                </label>
                <input
                  id="coupon"
                  value={couponCode ?? code}
                  disabled={Boolean(couponCode) || applyingCode}
                  onChange={(event) => {
                    setCode(event.target.value.toUpperCase());
                    setCodeError("");
                  }}
                  placeholder={t("cart.promo")}
                  autoComplete="off"
                  spellCheck={false}
                  aria-invalid={Boolean(codeError)}
                  aria-describedby={codeError ? "coupon-error" : undefined}
                  className="min-w-0 flex-1 border border-border bg-warm-white px-3 text-sm uppercase"
                />
                {couponCode ? (
                  <button
                    type="button"
                    onClick={() => void removeCoupon()}
                    className="min-h-11 border border-s-0 border-border px-4 text-xs"
                  >
                    {t("cart.removePromo")}
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={applyingCode}
                    className="min-h-11 border border-s-0 border-gold px-4 text-gold disabled:opacity-50"
                    aria-label="Apply promo code"
                  >
                    <Tag className="size-4" />
                  </button>
                )}
              </div>
              {codeError && (
                <p id="coupon-error" role="alert" className="mt-2 text-xs text-destructive">
                  {codeError}
                </p>
              )}
            </form>
            <p className="mt-4 text-xs text-muted-foreground">{t("cart.deliveryNote")}</p>
            {hasIssues && (
              <p
                role="alert"
                className="mt-5 border-s-2 border-destructive ps-3 text-xs text-destructive"
              >
                {t("cart.issue")}
              </p>
            )}
            {hasIssues ? (
              <Button variant="solid" size="wide" className="mt-8" disabled>
                {t("cart.checkout")}
              </Button>
            ) : (
              <Button asChild variant="solid" size="wide" className="mt-8">
                <Link to="/checkout">{t("cart.checkout")}</Link>
              </Button>
            )}
          </aside>
        </Reveal>
      )}
      {!cartLoading && lines.length > 0 && (
        <>
          <p className="sr-only" role="status" aria-live="polite">
            {lines.length} {t("common.products")}, {t("cart.estimated")}{" "}
            {formatPrice(estimatedTotal)}
          </p>
          <div className="mobile-primary-bar fixed inset-x-0 bottom-0 z-30 border-t border-border bg-warm-white/96 px-4 pb-[max(0.8rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-12px_30px_-24px_rgba(0,0,0,0.4)] backdrop-blur-sm lg:hidden">
            <div className="mx-auto flex max-w-lg items-center gap-3">
              <div className="min-w-0 flex-1">
                <p className="label-xs text-taupe">{t("cart.estimated")}</p>
                <p className="font-serif text-xl">{formatPrice(estimatedTotal)}</p>
              </div>
              {hasIssues ? (
                <Button variant="solid" size="pill" className="h-12 shrink-0 px-6" disabled>
                  {t("cart.checkout")}
                </Button>
              ) : (
                <Button asChild variant="solid" size="pill" className="h-12 shrink-0 px-6">
                  <Link to="/checkout">{t("cart.checkout")}</Link>
                </Button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
