import { createFileRoute, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Check, ChevronLeft, ChevronRight, LoaderCircle, Search, ShoppingBag } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { PolishedImage } from "@/components/ui/polished-image";
import { Button } from "@/components/ui/button";
import {
  addDynamicBundleToCart,
  apiErrorMessage,
  getBundleSlotProducts,
  getDynamicBundle,
  previewDynamicBundle,
  type BundleSelection,
  type PublicDynamicBundle,
  type PublicProductResponse,
} from "@/lib/api";
import { mapProduct } from "@/lib/catalog";
import { formatPrice } from "@/lib/products";
import { createSeoHead } from "@/lib/seo";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/bundles/$slug")({
  loader: async ({ params, context }) => {
    const bundle = await context.queryClient
      .ensureQueryData({
        queryKey: ["dynamic-bundle", params.slug],
        queryFn: ({ signal }) => getDynamicBundle(params.slug, signal),
        staleTime: 60_000,
      })
      .catch(() => null);
    if (!bundle) throw notFound();
    return bundle;
  },
  head: ({ loaderData, params, match }) => {
    const locale = match.search.lang === "ar" ? "ar" : "en";
    return createSeoHead({
      title: loaderData?.name[locale] || params.slug,
      description: loaderData?.description[locale] || "",
      path: `/bundles/${params.slug}`,
      locale,
      index: false,
      follow: true,
    });
  },
  component: BundleBuilder,
});

function BundleBuilder() {
  const bundle = Route.useLoaderData();
  const { locale, acceptCart, setCartOpen } = useStore();
  const [slotIndex, setSlotIndex] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selections, setSelections] = useState<Record<string, BundleSelection[]>>({});
  const [adding, setAdding] = useState(false);
  const slot = bundle.slots[slotIndex]!;
  const allSelections = useMemo(() => Object.values(selections).flat(), [selections]);
  const products = useQuery({
    queryKey: ["bundle-slot-products", bundle.slug, slot.key, page, search],
    queryFn: ({ signal }) =>
      getBundleSlotProducts(
        bundle.slug,
        slot.key,
        { page, limit: 24, search, inStock: true },
        signal,
      ),
    placeholderData: (previous) => previous,
  });
  const preview = useQuery({
    queryKey: ["bundle-preview", bundle.slug, bundle.version, allSelections],
    queryFn: ({ signal }) =>
      previewDynamicBundle(bundle.slug, bundle.version, allSelections, signal),
    enabled: allSelections.length > 0,
    retry: false,
  });
  useEffect(() => setPage(1), [search, slot.key]);
  const completeSlots = bundle.slots.filter((item) => {
    const quantity = (selections[item.key] ?? []).reduce((sum, row) => sum + row.quantity, 0);
    return quantity >= item.quantity.minimum;
  }).length;
  const choose = (selection: BundleSelection) => {
    setSelections((current) => ({
      ...current,
      [slot.key]:
        slot.quantity.maximum === 1
          ? [selection]
          : [
              ...(current[slot.key] ?? []).filter((item) => item.variantId !== selection.variantId),
              selection,
            ].slice(0, slot.quantity.maximum),
    }));
    if (slotIndex < bundle.slots.length - 1 && slot.quantity.maximum === 1)
      setSlotIndex((current) => current + 1);
  };
  const add = async () => {
    if (!preview.data?.valid || adding) return;
    setAdding(true);
    try {
      acceptCart(await addDynamicBundleToCart(bundle.slug, bundle.version, allSelections));
      toast.success(
        locale === "ar" ? "تمت إضافة المجموعة إلى حقيبتك." : "Bundle added to your bag.",
      );
      setCartOpen(true);
    } catch (error) {
      toast.error(apiErrorMessage(error, locale));
    } finally {
      setAdding(false);
    }
  };
  return (
    <main className="bundle-builder min-w-0 pb-32">
      <header className="border-b border-border bg-foreground text-warm-white">
        <div className="mx-auto max-w-[1500px] px-5 py-10 sm:px-8 lg:px-12 lg:py-14">
          <p className="label-xs text-gold">{bundle.discountLabel[locale]}</p>
          <div className="mt-4 flex flex-wrap items-end justify-between gap-8">
            <div className="max-w-4xl">
              <h1 className="font-serif text-[clamp(2.8rem,7vw,6.5rem)] leading-[0.92]">
                {bundle.name[locale]}
              </h1>
              <p className="mt-5 max-w-2xl text-sm leading-6 text-stone-300">
                {bundle.description[locale]}
              </p>
            </div>
            <div aria-live="polite" className="text-end">
              <p className="font-serif text-4xl">
                {completeSlots}/{bundle.slots.length}
              </p>
              <p className="label-xs mt-2 text-stone-400">
                {locale === "ar" ? "خطوات مكتملة" : "STEPS COMPLETE"}
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1500px] min-w-0 gap-8 px-5 py-8 sm:px-8 lg:grid-cols-[15rem_minmax(0,1fr)_21rem] lg:px-12">
        <nav
          aria-label={locale === "ar" ? "خطوات المجموعة" : "Bundle steps"}
          className="min-w-0 lg:sticky lg:top-28 lg:h-fit"
        >
          <ol className="flex gap-2 overflow-x-auto pb-2 lg:block lg:space-y-2">
            {bundle.slots.map((item, index) => {
              const selected = selections[item.key] ?? [];
              const done =
                selected.reduce((sum, row) => sum + row.quantity, 0) >= item.quantity.minimum;
              return (
                <li key={item.key} className="shrink-0 lg:w-full">
                  <button
                    type="button"
                    onClick={() => setSlotIndex(index)}
                    aria-current={index === slotIndex ? "step" : undefined}
                    className={`flex min-h-14 w-full items-center gap-3 border px-4 text-start text-sm ${index === slotIndex ? "border-gold bg-ivory" : "border-border"}`}
                  >
                    <span
                      className={`grid size-6 shrink-0 place-items-center rounded-full text-xs ${done ? "bg-gold text-foreground" : "border border-border"}`}
                    >
                      {done ? <Check className="size-3" /> : index + 1}
                    </span>
                    <span className="min-w-0 truncate">{item.label[locale]}</span>
                  </button>
                </li>
              );
            })}
          </ol>
        </nav>

        <section className="min-w-0" aria-labelledby="slot-heading">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-5">
            <div>
              <p className="label-xs text-gold">
                {locale === "ar" ? `الخطوة ${slotIndex + 1}` : `STEP ${slotIndex + 1}`}
              </p>
              <h2 id="slot-heading" className="mt-2 font-serif text-3xl sm:text-4xl">
                {slot.label[locale]}
              </h2>
              {slot.description[locale] ? (
                <p className="mt-2 text-sm text-taupe">{slot.description[locale]}</p>
              ) : null}
            </div>
            <label className="relative min-w-0 sm:w-64">
              <span className="sr-only">
                {locale === "ar" ? "ابحثي في المنتجات المؤهلة" : "Search eligible products"}
              </span>
              <Search className="pointer-events-none absolute start-3 top-3.5 size-4 text-taupe" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={locale === "ar" ? "ابحثي…" : "Search eligible…"}
                className="min-h-11 w-full border border-border bg-transparent pe-3 ps-10 text-sm"
              />
            </label>
          </div>
          {products.isLoading ? (
            <div className="grid min-h-64 place-items-center">
              <LoaderCircle className="size-6 animate-spin text-gold" />
            </div>
          ) : products.isError || !products.data ? (
            <p role="alert" className="my-16 text-center text-destructive">
              {locale === "ar"
                ? "تعذر تحميل المنتجات المؤهلة."
                : "Eligible products could not be loaded."}
            </p>
          ) : (
            <>
              <div className="mt-7 grid grid-cols-2 gap-x-3 gap-y-8 xl:grid-cols-3">
                {products.data.data.map((record) => (
                  <SelectableProduct
                    key={record.id}
                    record={record}
                    locale={locale}
                    selected={selections[slot.key] ?? []}
                    onSelect={choose}
                    slotKey={slot.key}
                  />
                ))}
              </div>
              {products.data.meta.totalPages > 1 ? (
                <div className="mt-10 flex items-center justify-center gap-4">
                  <button
                    type="button"
                    disabled={!products.data.meta.hasPrev}
                    onClick={() => setPage((value) => value - 1)}
                    className="grid size-11 place-items-center border border-border disabled:opacity-30"
                  >
                    <ChevronLeft className="size-4" />
                  </button>
                  <span className="text-sm">
                    {products.data.meta.page}/{products.data.meta.totalPages}
                  </span>
                  <button
                    type="button"
                    disabled={!products.data.meta.hasNext}
                    onClick={() => setPage((value) => value + 1)}
                    className="grid size-11 place-items-center border border-border disabled:opacity-30"
                  >
                    <ChevronRight className="size-4" />
                  </button>
                </div>
              ) : null}
            </>
          )}
        </section>

        <aside className="hidden h-fit border border-border bg-ivory p-6 lg:sticky lg:top-28 lg:block">
          <Summary
            bundle={bundle}
            selections={selections}
            preview={preview.data}
            locale={locale}
            adding={adding}
            onAdd={add}
          />
        </aside>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-warm-white/95 p-3 pb-[max(.75rem,env(safe-area-inset-bottom))] backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-2xl items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-sm font-medium">
              {completeSlots}/{bundle.slots.length} {locale === "ar" ? "مكتمل" : "complete"}
            </p>
            {preview.data ? (
              <p className="text-xs text-taupe">{formatPrice(preview.data.finalTotal / 100)}</p>
            ) : null}
          </div>
          <Button
            disabled={!preview.data?.valid || adding}
            onClick={() => void add()}
            className="min-w-44"
          >
            {adding ? (
              <LoaderCircle className="me-2 size-4 animate-spin" />
            ) : (
              <ShoppingBag className="me-2 size-4" />
            )}
            {preview.data?.valid
              ? locale === "ar"
                ? "أضيفي المجموعة"
                : "Add bundle"
              : locale === "ar"
                ? "أكملي الاختيارات"
                : "Complete selections"}
          </Button>
        </div>
      </div>
    </main>
  );
}

function SelectableProduct({
  record,
  locale,
  selected,
  onSelect,
  slotKey,
}: {
  record: PublicProductResponse;
  locale: "en" | "ar";
  selected: BundleSelection[];
  onSelect: (selection: BundleSelection) => void;
  slotKey: string;
}) {
  const product = mapProduct(record, locale);
  const available = product.sizes.filter((variant) => variant.id && variant.stock !== 0);
  const [variantId, setVariantId] = useState(available[0]?.id ?? "");
  const active = selected.some((item) => item.variantId === variantId);
  return (
    <article className={`min-w-0 border p-2 ${active ? "border-gold" : "border-transparent"}`}>
      <PolishedImage
        src={product.image}
        alt={product.imageAlt || product.name}
        width={480}
        height={600}
        wrapperClassName="aspect-[4/5] bg-ivory"
        className="size-full object-cover"
      />
      <h3 className="mt-4 line-clamp-2 min-h-12 font-serif text-lg">{product.name}</h3>
      <p className="mt-1 text-sm text-gold">
        {formatPrice(available.find((item) => item.id === variantId)?.price ?? product.price)}
      </p>
      {available.length > 1 ? (
        <select
          value={variantId}
          onChange={(event) => setVariantId(event.target.value)}
          className="mt-3 min-h-10 w-full border border-border bg-transparent px-2 text-xs"
          aria-label={
            locale === "ar" ? `اختاري خيار ${product.name}` : `Choose ${product.name} option`
          }
        >
          {available.map((variant) => (
            <option key={variant.id} value={variant.id}>
              {variant.label}
            </option>
          ))}
        </select>
      ) : null}
      <button
        type="button"
        disabled={!variantId}
        onClick={() => onSelect({ slotKey, productId: record.id, variantId, quantity: 1 })}
        className={`mt-3 min-h-11 w-full text-sm font-medium ${active ? "bg-gold text-foreground" : "bg-foreground text-warm-white"}`}
      >
        {active
          ? locale === "ar"
            ? "تم الاختيار"
            : "Selected"
          : locale === "ar"
            ? "اختاري"
            : "Select"}
      </button>
    </article>
  );
}

function Summary({
  bundle,
  selections,
  preview,
  locale,
  adding,
  onAdd,
}: {
  bundle: PublicDynamicBundle;
  selections: Record<string, BundleSelection[]>;
  preview: Awaited<ReturnType<typeof previewDynamicBundle>> | undefined;
  locale: "en" | "ar";
  adding: boolean;
  onAdd: () => Promise<void>;
}) {
  return (
    <>
      <p className="label-xs text-gold">{locale === "ar" ? "ملخص المجموعة" : "BUNDLE SUMMARY"}</p>
      <ul className="mt-5 divide-y divide-border">
        {bundle.slots.map((slot) => (
          <li key={slot.key} className="flex justify-between gap-3 py-3 text-sm">
            <span>{slot.label[locale]}</span>
            <span className={(selections[slot.key]?.length ?? 0) ? "text-gold" : "text-taupe"}>
              {(selections[slot.key]?.length ?? 0) ? "✓" : "—"}
            </span>
          </li>
        ))}
      </ul>
      {preview ? (
        <dl className="mt-6 space-y-3 border-t border-border pt-5 text-sm">
          <div className="flex justify-between">
            <dt>{locale === "ar" ? "السعر قبل الخصم" : "Retail"}</dt>
            <dd>{formatPrice(preview.retailTotal / 100)}</dd>
          </div>
          <div className="flex justify-between text-gold">
            <dt>{locale === "ar" ? "التوفير" : "Bundle saving"}</dt>
            <dd>-{formatPrice(preview.discountTotal / 100)}</dd>
          </div>
          <div className="flex items-baseline justify-between border-t border-border pt-4">
            <dt>{locale === "ar" ? "الإجمالي" : "Bundle total"}</dt>
            <dd className="font-serif text-2xl">{formatPrice(preview.finalTotal / 100)}</dd>
          </div>
        </dl>
      ) : null}
      {preview?.errors.length ? (
        <p role="alert" className="mt-4 text-xs leading-5 text-destructive">
          {preview.errors.map((error) => error.message[locale]).join(" ")}
        </p>
      ) : null}
      <Button
        disabled={!preview?.valid || adding}
        onClick={() => void onAdd()}
        className="mt-6 w-full"
      >
        {adding
          ? locale === "ar"
            ? "جارٍ الإضافة…"
            : "Adding…"
          : preview?.valid
            ? locale === "ar"
              ? "أضيفي المجموعة"
              : "Add bundle to bag"
            : locale === "ar"
              ? "أكملي الاختيارات"
              : "Complete selections"}
      </Button>
    </>
  );
}
