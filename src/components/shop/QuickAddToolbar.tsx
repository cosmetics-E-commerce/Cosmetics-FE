import { useEffect, useRef, useState, type MouseEvent } from "react";
import { Link } from "@tanstack/react-router";
import { Check, LoaderCircle, Minus, Plus, ShoppingBag, SlidersHorizontal } from "lucide-react";
import type { Product } from "@/lib/products";
import { useStore } from "@/lib/store";

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
    out: "نفد المخزون",
    choose: "اختر الخيارات",
    unavailable: "غير متاح",
    decrease: "تقليل الكمية",
    increase: "زيادة الكمية",
    quantity: "الكمية",
  },
} as const;

export function QuickAddToolbar({
  product,
  variant,
  outOfStock,
}: {
  product: Product;
  variant: ProductVariant | undefined;
  outOfStock: boolean;
}) {
  const { add, locale, pendingVariants } = useStore();
  const labels = copy[locale];
  const [quantity, setQuantity] = useState(1);
  const [state, setState] = useState<AddState>("idle");
  const feedbackTimer = useRef<number | null>(null);
  const availableVariants = product.sizes.filter(
    (item) => item.id && (item.stock === undefined || item.stock > 0),
  );
  const requiresSelection = availableVariants.length > 1;
  const maximum = Math.max(1, variant?.stock ?? product.stock ?? 99);
  const externallyPending = Boolean(variant?.id && pendingVariants.includes(variant.id));
  const busy = state === "adding" || externallyPending;

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
    if (!variant?.id || !product.id || busy || outOfStock || requiresSelection) return;
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

  const disabled = busy || outOfStock || !variant?.id || !product.id;

  return (
    <div className="quick-add" aria-label={`${labels.quantity}: ${quantity}`} onClick={stop}>
      <div className="quick-add__content">
        <div className="quick-add__quantity" aria-label={labels.quantity} role="group" dir="ltr">
          <button
            type="button"
            aria-label={`${labels.decrease}: ${product.name}`}
            disabled={disabled || requiresSelection || quantity <= 1}
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
            disabled={disabled || requiresSelection || quantity >= maximum}
            onClick={(event) => changeQuantity(event, 1)}
          >
            <Plus aria-hidden="true" />
          </button>
        </div>

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
            aria-label={`${outOfStock ? labels.out : labels.add}: ${product.name}`}
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
              {outOfStock
                ? labels.out
                : !variant?.id || !product.id
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
