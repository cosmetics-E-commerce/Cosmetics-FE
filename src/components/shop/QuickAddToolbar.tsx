import { useEffect, useRef, useState, type MouseEvent } from "react";
import { Link } from "@tanstack/react-router";
import { Check, LoaderCircle, Minus, Plus, ShoppingBag, SlidersHorizontal } from "lucide-react";
import type { Product } from "@/lib/products";
import { useProductCardStore } from "@/lib/store";

type ProductVariant = Product["sizes"][number];
type AddState = "idle" | "adding" | "added";

const copy = {
  en: {
    add: "Add to bag",
    adding: "Adding",
    added: "Added",
    out: "Out of stock",
    choose: "Choose options",
    unavailable: "Unavailable",
    decrease: "Decrease quantity",
    increase: "Increase quantity",
    quantity: "Quantity",
  },
  ar: {
    add: "أضف إلى الحقيبة",
    adding: "جارٍ الإضافة",
    added: "تمت الإضافة",
    out: "غير متوفر",
    choose: "اختر الخيارات",
    unavailable: "غير متاح",
    decrease: "تقليل الكمية",
    increase: "زيادة الكمية",
    quantity: "الكمية",
  },
} as const;

type QuickAddLabels = (typeof copy)[keyof typeof copy];

export function QuickAddToolbar({
  product,
  variant,
  outOfStock,
}: {
  product: Product;
  variant: ProductVariant | undefined;
  outOfStock: boolean;
}) {
  const { locale } = useProductCardStore();
  const labels = copy[locale];

  if (outOfStock) return <OutOfStockAction product={product} label={labels.out} />;

  return <PurchasableProductAction product={product} variant={variant} labels={labels} />;
}

function OutOfStockAction({ product, label }: { product: Product; label: string }) {
  return (
    <div
      className="quick-add quick-add--unavailable"
      aria-label={`${label}: ${product.name}`}
      onClick={(event) => event.stopPropagation()}
    >
      <button
        type="button"
        className="quick-add__unavailable"
        aria-label={`${label}: ${product.name}`}
        disabled
      >
        {label}
      </button>
    </div>
  );
}

function PurchasableProductAction({
  product,
  variant,
  labels,
}: {
  product: Product;
  variant: ProductVariant | undefined;
  labels: QuickAddLabels;
}) {
  const { add } = useProductCardStore();
  const [quantity, setQuantity] = useState(1);
  const [state, setState] = useState<AddState>("idle");
  const feedbackTimer = useRef<number | null>(null);
  const availableVariants = product.sizes.filter(
    (item) => item.id && (item.stock === undefined || item.stock > 0),
  );
  const requiresSelection = availableVariants.length > 1;
  const maximum = Math.max(1, variant?.stock ?? product.stock ?? 99);
  const busy = state === "adding";

  useEffect(() => {
    setQuantity((current) => Math.min(current, maximum));
  }, [maximum]);

  useEffect(
    () => () => {
      if (feedbackTimer.current !== null) window.clearTimeout(feedbackTimer.current);
    },
    [],
  );

  const stop = (event: MouseEvent<HTMLElement>) => event.stopPropagation();
  const changeQuantity = (event: MouseEvent<HTMLButtonElement>, direction: -1 | 1) => {
    stop(event);
    setQuantity((current) => Math.min(maximum, Math.max(1, current + direction)));
  };

  const addToCart = async (event: MouseEvent<HTMLButtonElement>) => {
    stop(event);
    if (!variant?.id || !product.id || busy || requiresSelection) return;
    setState("adding");
    const added = await add({
      variantId: variant.id,
      productId: product.id,
      categoryId: product.categoryId,
      brandId: product.brandId,
      slug: product.slug,
      name: product.name,
      image: product.image,
      size: variant.label,
      price: variant.price,
      qty: quantity,
    });
    setState(added ? "added" : "idle");
    if (added) {
      feedbackTimer.current = window.setTimeout(() => {
        setState("idle");
        feedbackTimer.current = null;
      }, 1200);
    }
  };

  const disabled = busy || !variant?.id || !product.id;

  return (
    <div
      className={`quick-add${requiresSelection ? " quick-add--selection" : ""}`}
      aria-label={
        requiresSelection ? `${labels.choose}: ${product.name}` : `${labels.quantity}: ${quantity}`
      }
      onClick={stop}
    >
      <div className="quick-add__content">
        {!requiresSelection ? (
          <div className="quick-add__quantity" aria-label={labels.quantity} role="group" dir="ltr">
            <button
              type="button"
              aria-label={`${labels.decrease}: ${product.name}`}
              disabled={disabled || quantity <= 1}
              onClick={(event) => changeQuantity(event, -1)}
            >
              <Minus aria-hidden="true" />
            </button>
            <output aria-live="polite" aria-label={`${labels.quantity} ${quantity}`}>
              {quantity}
            </output>
            <button
              type="button"
              aria-label={`${labels.increase}: ${product.name}`}
              disabled={disabled || quantity >= maximum}
              onClick={(event) => changeQuantity(event, 1)}
            >
              <Plus aria-hidden="true" />
            </button>
          </div>
        ) : null}

        {requiresSelection ? (
          product.id ? (
            <Link
              className="quick-add__action"
              to="/product/$slug"
              params={{ slug: product.slug }}
              preload="intent"
              aria-label={`${labels.choose}: ${product.name}`}
              onClick={stop}
            >
              <SlidersHorizontal aria-hidden="true" />
              <span>{labels.choose}</span>
            </Link>
          ) : (
            <Link
              className="quick-add__action"
              to="/shop"
              search={{ search: product.name }}
              aria-label={`${labels.choose}: ${product.name}`}
              onClick={stop}
            >
              <SlidersHorizontal aria-hidden="true" />
              <span>{labels.choose}</span>
            </Link>
          )
        ) : (
          <button
            type="button"
            className="quick-add__action"
            aria-label={`${labels.add}: ${product.name}`}
            aria-busy={busy || undefined}
            disabled={disabled}
            onClick={addToCart}
          >
            {state === "added" ? (
              <Check aria-hidden="true" />
            ) : busy ? (
              <LoaderCircle className="quick-add__spinner" aria-hidden="true" />
            ) : (
              <ShoppingBag aria-hidden="true" />
            )}
            <span>
              {!variant?.id || !product.id
                ? labels.unavailable
                : state === "added"
                  ? labels.added
                  : busy
                    ? labels.adding
                    : labels.add}
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
