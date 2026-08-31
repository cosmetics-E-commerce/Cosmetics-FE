import { useEffect, useMemo, useState } from "react";
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BellOff, Clock3, PackageOpen, RotateCcw, ShoppingBag } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  addReorderItems,
  apiErrorMessage,
  disableReorderItem,
  getBuyAgain,
  getReorderOpportunities,
  getOrderReorderPreview,
  recordReorderEvent,
  restoreReorderItem,
  snoozeReorderItem,
  updateReorderPreference,
  type ReorderItem,
} from "@/lib/api";
import { formatPrice } from "@/lib/products";
import { useStore } from "@/lib/store";

export function ReorderCenter({ locale }: { locale: "en" | "ar" }) {
  const ar = locale === "ar";
  const client = useQueryClient();
  const { acceptCart, setCartOpen } = useStore();
  const history = useInfiniteQuery({
    queryKey: ["reorder", "buy-again"],
    queryFn: ({ pageParam }) => getBuyAgain(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => (lastPage.meta.hasNext ? lastPage.meta.page + 1 : undefined),
  });
  const opportunities = useQuery({
    queryKey: ["reorder", "opportunities"],
    queryFn: getReorderOpportunities,
  });
  const refresh = () =>
    Promise.all([
      client.invalidateQueries({ queryKey: ["reorder"] }),
      client.invalidateQueries({ queryKey: ["cart"] }),
    ]);
  const add = useMutation({
    mutationFn: ({ items }: { items: ReorderItem[]; source: "BUY_AGAIN" | "SMART_REORDER" }) =>
      addReorderItems(items.map((item) => ({ variantId: item.variantId, quantity: 1 }))),
    onSuccess: async ({ cart, sessionId }, variables) => {
      acceptCart(cart);
      setCartOpen(true);
      await Promise.allSettled(
        variables.items.map((item) =>
          recordReorderEvent({
            eventKey: `${variables.source.toLowerCase()}:clicked:${sessionId}:${item.variantId}`,
            eventType:
              variables.source === "SMART_REORDER" ? "REORDER_CLICKED" : "BUY_AGAIN_CLICKED",
            productId: item.productId,
            variantId: item.variantId,
            sessionId,
          }),
        ),
      );
      await refresh();
      toast.success(ar ? "تمت الإضافة إلى حقيبتك" : "Added to your bag");
    },
    onError: (error) => toast.error(apiErrorMessage(error, locale)),
  });
  const snooze = useMutation({
    mutationFn: (variantId: string) =>
      snoozeReorderItem(
        variantId,
        opportunities.data?.snoozeOptionsDays?.[1] ??
          opportunities.data?.snoozeOptionsDays?.[0] ??
          14,
      ),
    onSuccess: async () => {
      await refresh();
      toast.success(ar ? "سنؤجل التذكير" : "We'll hold this reminder for now");
    },
    onError: (error) => toast.error(apiErrorMessage(error, locale)),
  });
  const disable = useMutation({
    mutationFn: disableReorderItem,
    onSuccess: async () => {
      await refresh();
      toast.success(ar ? "لن نذكّرك بهذا المنتج" : "Reminders disabled for this item");
    },
    onError: (error) => toast.error(apiErrorMessage(error, locale)),
  });
  const restore = useMutation({
    mutationFn: restoreReorderItem,
    onSuccess: async () => {
      await refresh();
      toast.success(ar ? "تمت استعادة التذكيرات" : "Reminders restored");
    },
    onError: (error) => toast.error(apiErrorMessage(error, locale)),
  });
  const preference = useMutation({
    mutationFn: (enabled: boolean) =>
      updateReorderPreference(enabled, history.data?.pages[0]?.preference.version),
    onSuccess: async () => {
      await refresh();
    },
    onError: (error) => toast.error(apiErrorMessage(error, locale)),
  });
  const ready = opportunities.data?.items ?? [];
  const historyData = history.data?.pages[0];
  const historyItems = useMemo(
    () => history.data?.pages.flatMap((page) => page.items) ?? [],
    [history.data],
  );
  const disabled = useMemo(
    () => historyItems.filter((item) => item.reminder.state !== "ACTIVE"),
    [historyItems],
  );

  useEffect(() => {
    if (!historyData) return;
    const today = new Date().toISOString().slice(0, 10);
    void recordReorderEvent({
      eventKey: `buy-again:view:${today}`,
      eventType: "BUY_AGAIN_VIEWED",
    }).catch(() => undefined);
  }, [historyData]);

  useEffect(() => {
    if (!opportunities.data) return;
    void Promise.allSettled(
      opportunities.data.items.map((item) =>
        recordReorderEvent({
          eventKey: `opportunity:shown:${item.profileId}:${opportunities.data.configVersion}:${item.replenishmentWindow.start ?? "open"}`,
          eventType: "REORDER_OPPORTUNITY_SHOWN",
          productId: item.productId,
          variantId: item.variantId,
        }),
      ),
    );
  }, [opportunities.data]);

  if (history.isLoading || opportunities.isLoading)
    return (
      <div
        className="reorder-center"
        aria-busy="true"
        aria-label={ar ? "جارٍ تحميل مشترياتك السابقة" : "Loading your repeat purchases"}
      >
        <div className="reorder-skeleton">
          <span />
          <span />
          <span />
        </div>
      </div>
    );
  if (history.isError || opportunities.isError)
    return (
      <div className="reorder-state" role="alert">
        <PackageOpen aria-hidden="true" />
        <h2>{ar ? "تعذر تحميل إعادة الطلب" : "Buy Again couldn't be loaded"}</h2>
        <p>
          {ar
            ? "مشترياتك محفوظة. حاولي مرة أخرى."
            : "Your order history is safe. Try loading it again."}
        </p>
        <Button variant="line" size="pill" onClick={() => void refresh()}>
          {ar ? "إعادة المحاولة" : "Try again"}
        </Button>
      </div>
    );
  if (!historyItems.length)
    return (
      <div className="reorder-state">
        <RotateCcw aria-hidden="true" />
        <h2>{ar ? "ستظهر مشترياتك المتكررة هنا" : "Your repeat purchases will appear here"}</h2>
        <p>
          {ar
            ? "بعد استلام طلبك الأول، يمكنك العودة لطلب المنتجات نفسها بسهولة."
            : "After your first delivered order, you can return here to buy the same products again."}
        </p>
      </div>
    );

  return (
    <div className="reorder-center" dir={ar ? "rtl" : "ltr"}>
      <header className="reorder-hero">
        <div>
          <span className="reorder-eyebrow">
            {ar ? "إعادة الطلب بذكاء" : "REORDER, ON YOUR TERMS"}
          </span>
          <h2>{ar ? "منتجاتك المألوفة، عندما تريدينها" : "The things you return to"}</h2>
          <p>
            {ar
              ? "نستخدم سجل طلباتك فقط لاقتراح توقيت محتمل—ولن ندّعي أنك أوشكت على النفاد."
              : "We use only your purchase history to suggest a likely window—we never claim you are running out."}
          </p>
        </div>
        <label className="reorder-toggle">
          <input
            type="checkbox"
            checked={historyData?.preference.smartEnabled ?? true}
            disabled={preference.isPending}
            onChange={(event) => preference.mutate(event.target.checked)}
          />
          <span>
            <strong>{ar ? "اقتراحات ذكية" : "Smart suggestions"}</strong>
            <small>{ar ? "يمكنك إيقافها في أي وقت" : "You can turn these off anytime"}</small>
          </span>
        </label>
      </header>

      {ready.length > 0 && (historyData?.preference.smartEnabled ?? true) && (
        <section className="reorder-section" aria-labelledby="ready-reorder-title">
          <div className="reorder-section__heading">
            <div>
              <span>{ar ? "استناداً إلى إيقاع طلباتك" : "Based on your rhythm"}</span>
              <h3 id="ready-reorder-title">
                {ar ? "قد يكون الوقت مناسباً" : "Ready for another?"}
              </h3>
            </div>
            {ready.length > 1 ? (
              <Button
                variant="line"
                size="pill"
                disabled={add.isPending}
                onClick={() => add.mutate({ items: ready, source: "SMART_REORDER" })}
              >
                {ar ? `أضيفي ${ready.length} للحقيبة` : `Add all ${ready.length} to bag`}
              </Button>
            ) : (
              <Clock3 aria-hidden="true" />
            )}
          </div>
          <div className="reorder-grid reorder-grid--featured">
            {ready.map((item) => (
              <ReorderCard
                key={item.variantId}
                item={item}
                locale={locale}
                smart
                onAdd={() => add.mutate({ items: [item], source: "SMART_REORDER" })}
                onSnooze={() => snooze.mutate(item.variantId)}
                onDisable={() => disable.mutate(item.variantId)}
                busy={add.isPending || snooze.isPending || disable.isPending}
              />
            ))}
          </div>
        </section>
      )}

      <section className="reorder-section" aria-labelledby="buy-again-title">
        <div className="reorder-section__heading">
          <div>
            <span>{ar ? "كل مشترياتك المؤهلة" : "Your delivered purchase history"}</span>
            <h3 id="buy-again-title">{ar ? "اشتريها مرة أخرى" : "Buy again"}</h3>
          </div>
          <RotateCcw aria-hidden="true" />
        </div>
        <div className="reorder-grid">
          {historyItems.map((item) => (
            <ReorderCard
              key={item.variantId}
              item={item}
              locale={locale}
              onAdd={() => add.mutate({ items: [item], source: "BUY_AGAIN" })}
              busy={add.isPending}
            />
          ))}
        </div>
        {history.hasNextPage && (
          <div className="reorder-load-more">
            <Button
              variant="line"
              size="pill"
              disabled={history.isFetchingNextPage}
              onClick={() => void history.fetchNextPage()}
            >
              {history.isFetchingNextPage
                ? ar
                  ? "جارٍ التحميل…"
                  : "Loading…"
                : ar
                  ? "عرض مشتريات أكثر"
                  : "Load more purchases"}
            </Button>
          </div>
        )}
      </section>

      {disabled.length > 0 && (
        <section className="reorder-reminders" aria-labelledby="reminder-settings-title">
          <div>
            <BellOff aria-hidden="true" />
            <h3 id="reminder-settings-title">
              {ar ? "التذكيرات المؤجلة والمتوقفة" : "Paused reminder settings"}
            </h3>
          </div>
          {disabled.map((item) => (
            <button
              type="button"
              key={item.variantId}
              onClick={() => restore.mutate(item.variantId)}
              disabled={restore.isPending}
            >
              <span>{ar ? item.productNameAr : item.productNameEn}</span>
              <strong>{ar ? "استعادة" : "Restore"}</strong>
            </button>
          ))}
        </section>
      )}
    </div>
  );
}

export function OrderReorderAction({ orderId, locale }: { orderId: string; locale: "en" | "ar" }) {
  const ar = locale === "ar";
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const { acceptCart, setCartOpen } = useStore();
  const query = useQuery({
    queryKey: ["reorder", "order", orderId],
    queryFn: () => getOrderReorderPreview(orderId),
    enabled: open,
  });
  const add = useMutation({
    mutationFn: () =>
      addReorderItems(
        (query.data?.items ?? [])
          .filter((item) => selected.has(item.variantId) && item.selectable)
          .map((item) => ({ variantId: item.variantId, quantity: item.quantity })),
      ),
    onSuccess: ({ cart }) => {
      acceptCart(cart);
      setOpen(false);
      setCartOpen(true);
      toast.success(ar ? "تمت إضافة المنتجات المتاحة" : "Available items added to your bag");
    },
    onError: (error) => toast.error(apiErrorMessage(error, locale)),
  });
  const initialize = () => {
    setOpen(true);
    void getOrderReorderPreview(orderId)
      .then((data) =>
        setSelected(
          new Set(data.items.filter((item) => item.selectable).map((item) => item.variantId)),
        ),
      )
      .catch(() => undefined);
  };
  return (
    <>
      <button type="button" className="account-orders__reorder-button" onClick={initialize}>
        <RotateCcw aria-hidden="true" />
        {ar ? "إعادة الطلب" : "Reorder items"}
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="order-reorder-dialog">
          <DialogHeader>
            <DialogTitle>
              {ar ? "إعادة طلب المنتجات المتاحة" : "Reorder available items"}
            </DialogTitle>
            <DialogDescription>
              {ar
                ? "نراجع السعر والمقاس والمخزون الحالي قبل الإضافة."
                : "Current variant, price, and stock are revalidated before anything enters your bag."}
            </DialogDescription>
          </DialogHeader>
          {query.isLoading ? (
            <div className="reorder-skeleton">
              <span />
              <span />
              <span />
            </div>
          ) : query.isError ? (
            <p role="alert">{ar ? "تعذر فحص هذا الطلب." : "This order couldn't be checked."}</p>
          ) : (
            <div className="order-reorder-list">
              {query.data?.items.map((item) => (
                <label key={item.variantId} data-unavailable={!item.selectable}>
                  <input
                    type="checkbox"
                    checked={selected.has(item.variantId)}
                    disabled={!item.selectable}
                    onChange={(event) =>
                      setSelected((current) => {
                        const next = new Set(current);
                        if (event.target.checked) next.add(item.variantId);
                        else next.delete(item.variantId);
                        return next;
                      })
                    }
                  />
                  <span>
                    <strong>{ar ? item.productNameAr : item.productNameEn}</strong>
                    <small>{ar ? item.variantNameAr : item.variantNameEn}</small>
                  </span>
                  <span>
                    <strong>
                      {item.currentPrice == null ? "—" : formatPrice(item.currentPrice / 100)}
                    </strong>
                    <small>
                      {item.selectable
                        ? ar
                          ? "متاح"
                          : "Available"
                        : availabilityCopy(item.availability, ar)}
                    </small>
                  </span>
                </label>
              ))}
            </div>
          )}
          <Button disabled={!selected.size || add.isPending} onClick={() => add.mutate()}>
            {add.isPending
              ? ar
                ? "جارٍ التحقق…"
                : "Revalidating…"
              : ar
                ? `أضيفي ${selected.size} للحقيبة`
                : `Add ${selected.size} to bag`}
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}

function availabilityCopy(value: string, ar: boolean) {
  if (value === "OUT_OF_STOCK") return ar ? "غير متوفر" : "Out of stock";
  if (value === "PREVIOUS_VARIANT_UNAVAILABLE")
    return ar ? "المقاس السابق غير متاح" : "Previous variant unavailable";
  return ar ? "لم يعد المنتج متاحاً" : "No longer available";
}

function ReorderCard({
  item,
  locale,
  smart = false,
  onAdd,
  onSnooze,
  onDisable,
  busy,
}: {
  item: ReorderItem;
  locale: "en" | "ar";
  smart?: boolean;
  onAdd: () => void;
  onSnooze?: () => void;
  onDisable?: () => void;
  busy: boolean;
}) {
  const ar = locale === "ar";
  const available = item.availability === "AVAILABLE";
  const name = ar ? item.productNameAr : item.productNameEn;
  const variant = ar ? item.variantNameAr : item.variantNameEn;
  const lastBought = item.lastPurchaseAt
    ? new Intl.RelativeTimeFormat(ar ? "ar-EG" : "en", { numeric: "auto" }).format(
        -Math.max(
          1,
          Math.round((Date.now() - new Date(item.lastPurchaseAt).getTime()) / 604_800_000),
        ),
        "week",
      )
    : null;
  const unavailable =
    item.availability === "PREVIOUS_VARIANT_UNAVAILABLE"
      ? ar
        ? "المقاس السابق لم يعد متاحاً"
        : "Your previous size is no longer available"
      : item.availability === "OUT_OF_STOCK"
        ? ar
          ? "غير متوفر حالياً"
          : "Out of stock"
        : ar
          ? "المنتج لم يعد متاحاً"
          : "Product no longer available";
  return (
    <article className={`reorder-card${smart ? " reorder-card--smart" : ""}`}>
      <div className="reorder-card__media">
        {item.imageUrl ? (
          <img src={item.imageUrl} alt="" loading="lazy" />
        ) : (
          <ShoppingBag aria-hidden="true" />
        )}
        {smart && <span>{ar ? "موعد محتمل" : "LIKELY WINDOW"}</span>}
      </div>
      <div className="reorder-card__body">
        <div>
          <p className="reorder-card__brand">
            {item.purchaseCount > 1
              ? ar
                ? `تم شراؤه ${item.purchaseCount} مرات`
                : `Bought ${item.purchaseCount} times`
              : ar
                ? "تم شراؤه مرة واحدة"
                : "Bought once"}
          </p>
          <h4>{name}</h4>
          {variant && <p className="reorder-card__variant">{variant}</p>}
        </div>
        <div className="reorder-card__facts">
          {lastBought && (
            <span>
              {ar ? "آخر شراء " : "Last bought "}
              {lastBought}
            </span>
          )}
          {smart && item.estimatedIntervalDays && (
            <span>
              {ar
                ? `تكررين الشراء عادةً كل نحو ${item.estimatedIntervalDays} يوماً`
                : `You tend to repurchase around every ${item.estimatedIntervalDays} days`}
            </span>
          )}
        </div>
        <div className="reorder-card__footer">
          <div>
            {item.currentPrice != null && <strong>{formatPrice(item.currentPrice / 100)}</strong>}
            <small>{available ? (ar ? "السعر الحالي" : "Current price") : unavailable}</small>
          </div>
          <Button size="pill" disabled={!available || busy} onClick={onAdd}>
            {available ? (ar ? "أضيفي للحقيبة" : "Add to bag") : ar ? "غير متاح" : "Unavailable"}
          </Button>
        </div>
        {smart && (
          <div className="reorder-card__controls">
            <button type="button" onClick={onSnooze} disabled={busy}>
              {ar ? "ليس الآن" : "Not yet"}
            </button>
            <button type="button" onClick={onDisable} disabled={busy}>
              {ar ? "لا تذكّريني" : "Don't remind me"}
            </button>
          </div>
        )}
      </div>
    </article>
  );
}
