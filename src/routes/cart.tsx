import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PolishedImage } from "@/components/ui/polished-image";
import { formatPrice } from "@/lib/products";
import { useStore } from "@/lib/store";
import { Reveal } from "@/components/motion/Primitives";
import { useI18n } from "@/lib/i18n";
import { createNoindexHead } from "@/lib/seo";
import { PromoCodeControl } from "@/components/shop/PromoCodeControl";

export const Route = createFileRoute("/cart")({
  head: ({ match }) =>
    createNoindexHead(
      match.search.lang === "ar" ? "حقيبة التسوق" : "Shopping Bag",
      "/cart",
      match.search.lang === "ar" ? "ar" : "en",
    ),
  component: CartPage,
});

function CartPage() {
  const { t, locale } = useI18n();
  const {
    lines,
    bundleInstances = [],
    savedForLater,
    subtotal,
    discountTotal,
    estimatedTotal,
    totalSavings,
    appliedPromotions,
    cartLoading,
    setQty,
    remove,
    saveForLater,
    moveSavedToCart,
    removeSaved,
    moveAllSaved,
    breakBundle,
    removeBundle,
    pendingVariants,
    pendingSavedItems,
  } = useStore();
  const hasIssues = lines.some((line) => line.status !== "AVAILABLE" || line.issues.length > 0);

  return (
    <div className="sf-cart-page mx-auto max-w-[1400px] px-5 pb-32 pt-14 md:px-10 lg:py-20">
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
        <Reveal
          className={`mt-14 min-w-0 border border-border px-5 text-center sm:px-8 ${savedForLater.length ? "py-10 sm:py-12" : "py-20 sm:py-24"}`}
        >
          <h2 className="font-serif text-3xl">{t("cart.emptyTitle")}</h2>
          {savedForLater.length ? (
            <p className="mt-3 text-sm text-taupe">
              {savedForLater.length} {t("cart.savedRemain")}
            </p>
          ) : null}
          <Button asChild variant="line" size="pill" className="mt-8 max-w-full px-5 text-center">
            <Link to="/shop">{t("cart.emptyAction")}</Link>
          </Button>
        </Reveal>
      ) : (
        <Reveal stagger className="mt-14 grid min-w-0 gap-12 lg:grid-cols-[1fr_380px]">
          <div className="min-w-0">
            {bundleInstances.length > 0 ? (
              <section
                className="mb-5 space-y-3"
                aria-label={locale === "ar" ? "المجموعات في حقيبتك" : "Bundles in your bag"}
              >
                {bundleInstances.map((bundle) => {
                  const pending = pendingSavedItems.includes(`bundle:${bundle.id}`);
                  return (
                    <article
                      key={bundle.id}
                      className="border border-gold/40 bg-ivory p-4 sm:p-5"
                      aria-busy={pending || undefined}
                    >
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                          <p className="label-xs text-gold">
                            {locale === "ar" ? "مجموعة ديناميكية" : "Dynamic bundle"}
                          </p>
                          <h2 className="mt-1 font-serif text-xl">
                            {locale === "ar" ? bundle.name.ar : bundle.name.en}
                          </h2>
                          <p className="mt-2 text-xs text-taupe">
                            {bundle.lines.length} {locale === "ar" ? "خطوات" : "steps"}
                            {bundle.discountTotal > 0
                              ? ` · ${locale === "ar" ? "وفّرتِ" : "saved"} ${formatPrice(bundle.discountTotal / 100)}`
                              : ""}
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-3 text-xs">
                          <Link
                            to="/bundles/$slug"
                            params={{ slug: bundle.slug }}
                            className="font-medium text-gold underline underline-offset-4"
                          >
                            {locale === "ar" ? "بناء مجموعة أخرى" : "Build another"}
                          </Link>
                          <button
                            type="button"
                            disabled={pending}
                            onClick={() => void breakBundle(bundle.id)}
                            className="underline underline-offset-4 disabled:opacity-40"
                          >
                            {locale === "ar" ? "الاحتفاظ بالمنتجات" : "Keep products"}
                          </button>
                          <button
                            type="button"
                            disabled={pending}
                            onClick={() => void removeBundle(bundle.id)}
                            className="text-destructive underline underline-offset-4 disabled:opacity-40"
                          >
                            {pending
                              ? locale === "ar"
                                ? "جارٍ التحديث…"
                                : "Updating…"
                              : locale === "ar"
                                ? "إزالة المجموعة"
                                : "Remove bundle"}
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </section>
            ) : null}
            <Reveal
              as="ul"
              stagger
              staggerMs={40}
              distance={20}
              className="min-w-0 divide-y divide-border border-y border-border"
              aria-live="polite"
            >
              {lines.map((line) => {
                const pending = pendingVariants.includes(line.variantId);
                return (
                  <li
                    key={line.variantId}
                    className="cart-line flex min-w-0 gap-4 py-7 sm:gap-5"
                    aria-busy={pending || undefined}
                  >
                    <PolishedImage
                      src={line.image}
                      alt={line.name}
                      width={112}
                      height={144}
                      loading="lazy"
                      decoding="async"
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
                      <button
                        type="button"
                        disabled={pending}
                        onClick={() => void saveForLater(line.variantId)}
                        className="mt-4 w-fit text-sm font-medium text-taupe underline decoration-border underline-offset-4 transition-colors hover:text-gold disabled:opacity-40"
                      >
                        {pending ? t("cart.moving") : t("cart.saveForLater")}
                      </button>
                      <div className="mt-auto flex flex-wrap items-center justify-between gap-3">
                        <div className="flex border border-border">
                          <button
                            type="button"
                            disabled={pending}
                            onClick={() => void setQty(line.variantId, line.qty - 1)}
                            aria-label={`Decrease quantity of ${line.name}`}
                            className="grid size-11 place-items-center disabled:opacity-40"
                          >
                            <Minus className="size-3" />
                          </button>
                          <span
                            key={line.qty}
                            className="count-change grid w-10 place-items-center"
                          >
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
          </div>
          <aside className="min-w-0 h-fit border border-border bg-ivory p-5 sm:p-8 lg:sticky lg:top-32">
            <h2 className="label-sm">{t("cart.summary")}</h2>
            <div className="rule-gold my-6" />
            <div className="flex items-baseline justify-between">
              <span>{t("cart.subtotal")}</span>
              <span key={subtotal} className="count-change font-serif text-3xl">
                {formatPrice(subtotal)}
              </span>
            </div>
            <PromoCodeControl />
            {appliedPromotions.map((promotion) => (
              <div
                key={promotion.id}
                className="mt-3 flex items-start justify-between gap-4 text-sm text-gold"
              >
                <span>
                  <small className="block text-[0.65rem] uppercase tracking-[0.12em] text-taupe">
                    {promotion.couponCode ? t("cart.promo") : t("cart.automaticOffer")}
                  </small>
                  {promotion.couponCode || promotion.title}
                </span>
                <span>
                  -{formatPrice((promotion.discountAmount + promotion.shippingDiscount) / 100)}
                </span>
              </div>
            ))}
            <div className="mt-5 flex items-baseline justify-between border-t border-border pt-5">
              <span>{t("cart.discount")}</span>
              <span className="text-gold">-{formatPrice(discountTotal)}</span>
            </div>
            <div className="mt-3 flex items-baseline justify-between text-sm">
              <span>{t("cart.delivery")}</span>
              <span className="text-taupe">{t("cart.atCheckout")}</span>
            </div>
            <div className="mt-5 flex items-baseline justify-between border-t border-border pt-5">
              <span>{t("cart.finalTotal")}</span>
              <span className="font-serif text-3xl">{formatPrice(estimatedTotal)}</span>
            </div>
            {totalSavings > 0 && (
              <p className="mt-3 text-sm text-gold">
                {t("cart.youSaved")} {formatPrice(totalSavings)}
              </p>
            )}
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
              <Button variant="solid" size="wide" className="mt-8 hidden lg:inline-flex" disabled>
                {t("cart.checkout")}
              </Button>
            ) : (
              <Button asChild variant="solid" size="wide" className="mt-8 hidden lg:inline-flex">
                <Link to="/checkout">{t("cart.checkout")}</Link>
              </Button>
            )}
          </aside>
        </Reveal>
      )}
      {!cartLoading && savedForLater.length > 0 ? (
        <Reveal
          as="section"
          className="saved-for-later mt-16 border-t border-border pt-8 sm:mt-20 sm:pt-10"
          aria-labelledby="saved-for-later-title"
        >
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="label-xs text-taupe">{t("cart.deferredIntent")}</p>
              <h2 id="saved-for-later-title" className="mt-2 font-serif text-3xl">
                {t("cart.savedForLater")} ({savedForLater.length})
              </h2>
            </div>
            {savedForLater.some(
              (item) => item.status === "AVAILABLE" && item.available >= item.desiredQuantity,
            ) ? (
              <Button
                type="button"
                variant="line"
                size="pill"
                className="max-w-full whitespace-normal px-5 text-center"
                disabled={pendingSavedItems.includes("bulk")}
                onClick={() => void moveAllSaved()}
              >
                {pendingSavedItems.includes("bulk") ? t("cart.moving") : t("cart.moveAvailable")}
              </Button>
            ) : null}
          </div>
          <ul className="mt-7 divide-y divide-border border-y border-border" aria-live="polite">
            {savedForLater.map((item) => {
              const pending = pendingSavedItems.includes(item.id);
              const canMove = item.status === "AVAILABLE" && item.available >= item.desiredQuantity;
              const statusText =
                item.status === "PRODUCT_UNAVAILABLE"
                  ? t("cart.noLongerAvailable")
                  : item.status === "VARIANT_UNAVAILABLE"
                    ? t("cart.variantUnavailable")
                    : item.status === "OUT_OF_STOCK"
                      ? t("cart.outOfStock")
                      : item.available < item.desiredQuantity
                        ? `${t("cart.onlyAvailable")} ${item.available}`
                        : t("cart.available");
              return (
                <li
                  key={item.id}
                  className="grid min-w-0 grid-cols-[4.5rem_minmax(0,1fr)] gap-4 py-6 sm:grid-cols-[5.5rem_minmax(0,1fr)_auto] sm:items-center sm:gap-5"
                  aria-busy={pending || undefined}
                >
                  <PolishedImage
                    src={item.image}
                    alt={item.name}
                    width={88}
                    height={112}
                    loading="lazy"
                    decoding="async"
                    wrapperClassName="h-24 w-[4.5rem] shrink-0 sm:h-28 sm:w-[5.5rem]"
                    className="size-full object-cover"
                  />
                  <div className="min-w-0">
                    {item.status === "PRODUCT_UNAVAILABLE" ? (
                      <h3 className="truncate font-serif text-lg sm:text-xl">{item.name}</h3>
                    ) : (
                      <h3 className="truncate font-serif text-lg sm:text-xl">
                        <Link to="/product/$slug" params={{ slug: item.slug }}>
                          {item.name}
                        </Link>
                      </h3>
                    )}
                    <p className="mt-1 text-xs text-taupe">
                      {[item.brand, item.variant].filter(Boolean).join(" · ")}
                    </p>
                    <p className="mt-2 text-xs text-taupe">
                      {t("cart.savedQuantity")}: {item.desiredQuantity}
                    </p>
                    <div className="mt-2 flex flex-wrap items-baseline gap-2">
                      {item.currentPrice === null ? null : (
                        <span className="font-serif text-lg text-gold">
                          {formatPrice(item.currentPrice)}
                        </span>
                      )}
                      {item.priceChange !== "UNCHANGED" && item.currentPrice !== null ? (
                        <span className="text-xs text-taupe">
                          <s>{formatPrice(item.priceWhenSaved)}</s>{" "}
                          {item.priceChange === "DECREASED"
                            ? t("cart.priceDropped")
                            : t("cart.priceChanged")}
                        </span>
                      ) : null}
                    </div>
                    <p
                      className={`mt-2 text-xs ${canMove ? "text-taupe" : "text-destructive"}`}
                      role={canMove ? undefined : "status"}
                    >
                      {statusText}
                    </p>
                  </div>
                  <div className="col-span-2 flex items-center gap-4 ps-[5.5rem] sm:col-span-1 sm:flex-col sm:items-end sm:ps-0">
                    <Button
                      type="button"
                      variant="solid"
                      size="pill"
                      disabled={!canMove || pending}
                      onClick={() => void moveSavedToCart(item.id)}
                      className="min-w-[8.5rem]"
                    >
                      {pending ? t("cart.moving") : t("cart.moveToBag")}
                    </Button>
                    <button
                      type="button"
                      disabled={pending}
                      onClick={() => void removeSaved(item.id)}
                      className="min-h-11 px-2 text-sm text-taupe underline decoration-border underline-offset-4 hover:text-foreground disabled:opacity-40"
                    >
                      {t("cart.removeSaved")}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </Reveal>
      ) : null}
      {!cartLoading && lines.length > 0 && (
        <>
          <p className="sr-only" role="status" aria-live="polite">
            {lines.length} {t("common.products")}, {t("cart.estimated")}{" "}
            {formatPrice(estimatedTotal)}
          </p>
          <div className="mobile-primary-bar fixed inset-x-0 bottom-0 z-30 border-t border-border bg-warm-white px-3 pb-[max(0.8rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-12px_30px_-24px_rgba(0,0,0,0.4)] lg:hidden">
            {hasIssues ? (
              <p
                id="mobile-cart-issue"
                role="alert"
                className="mx-auto mb-2 max-w-lg text-xs text-destructive"
              >
                {t("cart.issue")}
              </p>
            ) : null}
            <div className="mx-auto grid max-w-lg grid-cols-[minmax(0,1fr)_auto] items-center gap-2">
              <div className="min-w-0 flex-1">
                <p className="label-xs truncate text-taupe">{t("cart.estimated")}</p>
                <p className="whitespace-nowrap font-serif text-[clamp(1rem,5.2vw,1.25rem)] leading-tight">
                  {formatPrice(estimatedTotal)}
                </p>
              </div>
              {hasIssues ? (
                <Button
                  variant="solid"
                  size="pill"
                  className="h-12 max-w-[11rem] shrink-0 px-3 text-[0.63rem] sm:px-6 sm:text-xs"
                  aria-describedby="mobile-cart-issue"
                  disabled
                >
                  {t("cart.checkout")}
                </Button>
              ) : (
                <Button
                  asChild
                  variant="solid"
                  size="pill"
                  className="h-12 max-w-[11rem] shrink-0 px-3 text-[0.63rem] sm:px-6 sm:text-xs"
                >
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
