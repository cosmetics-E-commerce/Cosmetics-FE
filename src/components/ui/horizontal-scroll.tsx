import { useEffect, useId, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useHorizontalScroll } from "@/hooks/use-horizontal-scroll";
import { scrollElementHorizontallyIntoView } from "@/lib/horizontal-nav";
import "./horizontal-scroll.css";

type ScrollState = Pick<
  ReturnType<typeof useHorizontalScroll>,
  "scroll" | "previous" | "next" | "overflowing"
>;

function ScrollArrow({
  direction,
  locale,
  subject,
  controls,
  state,
}: {
  direction: -1 | 1;
  locale: "en" | "ar";
  subject: "categories" | "products";
  controls: string;
  state: ScrollState;
}) {
  const previous = direction === -1;
  const rtl = locale === "ar";
  const Icon = previous !== rtl ? ChevronLeft : ChevronRight;
  const text =
    subject === "categories"
      ? rtl
        ? ["الفئات السابقة", "المزيد من الفئات"]
        : ["Previous categories", "More categories"]
      : rtl
        ? ["المنتجات السابقة", "المزيد من المنتجات"]
        : ["Previous products", "More products"];
  return (
    <button
      type="button"
      className="sf-scroll-arrow"
      aria-label={text[previous ? 0 : 1]}
      title={text[previous ? 0 : 1]}
      aria-controls={controls}
      disabled={previous ? !state.previous : !state.next}
      onClick={() => state.scroll(direction)}
    >
      <Icon aria-hidden="true" />
    </button>
  );
}

export function ProductScrollControls({
  state,
  locale,
  controls,
}: {
  state: ScrollState;
  locale: "en" | "ar";
  controls: string;
}) {
  if (!state.overflowing) return null;
  return (
    <div className="sf-scroll-controls">
      <span className="sf-scroll-hint">
        {locale === "ar" ? "اسحبي لتصفح المزيد" : "Drag to explore"}
      </span>
      <ScrollArrow
        direction={-1}
        locale={locale}
        subject="products"
        controls={controls}
        state={state}
      />
      <ScrollArrow
        direction={1}
        locale={locale}
        subject="products"
        controls={controls}
        state={state}
      />
    </div>
  );
}

/** Visible arrows flank the category strip only when its contents overflow. */
export function CategoryScrollStrip({
  children,
  locale,
  label,
  className,
  viewportClassName,
  tabs = false,
  activeKey,
}: {
  children: ReactNode;
  locale: "en" | "ar";
  label: string;
  className?: string;
  viewportClassName: string;
  tabs?: boolean;
  activeKey?: string;
}) {
  const id = useId();
  const state = useHorizontalScroll<HTMLDivElement>({ rtl: locale === "ar" });
  const { element } = state;
  useEffect(() => {
    if (!element || activeKey === undefined) return;
    const frame = requestAnimationFrame(() => {
      const selected = element.querySelector<HTMLElement>('[aria-selected="true"]');
      if (selected)
        scrollElementHorizontallyIntoView(element, selected, {
          behavior: "instant",
          edgePadding: 4,
        });
    });
    return () => cancelAnimationFrame(frame);
  }, [element, activeKey, locale]);

  return (
    <div className={`sf-category-strip ${className ?? ""}`} dir={locale === "ar" ? "rtl" : "ltr"}>
      {state.overflowing && (
        <ScrollArrow
          direction={-1}
          locale={locale}
          subject="categories"
          controls={id}
          state={state}
        />
      )}
      <div
        id={id}
        ref={state.ref}
        className={`sf-drag-scroll ${viewportClassName}`}
        role={tabs ? "tablist" : "navigation"}
        aria-label={label}
      >
        {children}
      </div>
      {state.overflowing && (
        <ScrollArrow
          direction={1}
          locale={locale}
          subject="categories"
          controls={id}
          state={state}
        />
      )}
    </div>
  );
}
