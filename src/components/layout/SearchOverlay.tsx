import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Link, useNavigate } from "@tanstack/react-router";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import "@/search-overlay.css";
import { ArrowRight, ChevronRight, Clock, Search, X } from "lucide-react";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import { trackCommerceEvent } from "@/lib/analytics";
import { searchPreviewQuery, useCategories } from "@/lib/catalog";
import { formatPrice, type Product } from "@/lib/products";
import { useSearchOpen, useStore } from "@/lib/store";

const copy = {
  en: {
    label: "Search BIOREZA",
    description: "Search products, brands and categories.",
    placeholder: "Search products, brands, categories",
    close: "Close search",
    clear: "Clear search",
    error: "Search is unavailable right now.",
    retry: "Try again",
    empty: (query: string) => `No results for “${query}”`,
    emptyHint: "Check the spelling, or try a brand or product type.",
    recent: "Recent searches",
    clearRecent: "Clear",
    suggestions: "Try searching for",
    suggestionTerms: ["serum", "sunscreen", "moisturizer", "cleanser", "fragrance"],
    categories: "Browse by category",
    allProducts: "All products",
    matchingCategories: "Categories",
    products: "Products",
    results: (count: number) => `${count} ${count === 1 ? "result" : "results"}`,
    viewAll: (count: number) => `See all ${count} ${count === 1 ? "result" : "results"}`,
  },
  ar: {
    label: "البحث في بيوريزا",
    description: "ابحثي عن المنتجات والعلامات والفئات.",
    placeholder: "ابحثي عن منتج أو علامة أو فئة",
    close: "إغلاق البحث",
    clear: "مسح البحث",
    error: "البحث غير متاح حاليًا.",
    retry: "حاولي مرة أخرى",
    empty: (query: string) => `لا توجد نتائج لـ «${query}»`,
    emptyHint: "تأكدي من الكتابة، أو جربي اسم علامة أو نوع منتج.",
    recent: "عمليات البحث الأخيرة",
    clearRecent: "مسح",
    suggestions: "جربي البحث عن",
    suggestionTerms: ["سيروم", "واقي شمس", "مرطب", "غسول", "عطر"],
    categories: "تصفحي حسب الفئة",
    allProducts: "كل المنتجات",
    matchingCategories: "الفئات",
    products: "المنتجات",
    results: (count: number) =>
      `${count.toLocaleString("ar-EG")} ${count === 1 ? "نتيجة" : "نتائج"}`,
    viewAll: (count: number) => `عرض كل النتائج (${count.toLocaleString("ar-EG")})`,
  },
} as const;

const RECENT_KEY = "bioreza.search.recent";
const RECENT_LIMIT = 5;

function readRecent(): string[] {
  try {
    const parsed: unknown = JSON.parse(window.localStorage.getItem(RECENT_KEY) ?? "[]");
    return Array.isArray(parsed)
      ? parsed.filter((term): term is string => typeof term === "string").slice(0, RECENT_LIMIT)
      : [];
  } catch {
    return [];
  }
}

function writeRecent(terms: string[]) {
  try {
    window.localStorage.setItem(RECENT_KEY, JSON.stringify(terms));
  } catch {
    // Storage can be unavailable (private mode, blocked site data); recents are a convenience.
  }
}

function rememberSearch(term: string) {
  const key = term.toLocaleLowerCase();
  writeRecent(
    [term, ...readRecent().filter((item) => item.toLocaleLowerCase() !== key)].slice(
      0,
      RECENT_LIMIT,
    ),
  );
}

export function SearchOverlay() {
  const { searchTriggerRef, setSearchOpen, locale } = useStore();
  const searchOpen = useSearchOpen();
  const navigate = useNavigate();
  const labels = copy[locale];
  const listId = useId();
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [anchorStyle, setAnchorStyle] = useState<CSSProperties>();
  const [query, setQuery] = useState("");
  const [recent, setRecent] = useState<string[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const trimmed = query.trim();
  const deferred = useDebouncedValue(trimmed, 120);

  const results = useQuery({
    ...searchPreviewQuery(deferred, locale),
    enabled: Boolean(deferred),
    // Keep the previous results on screen while the next term loads instead of
    // flashing a skeleton on every keystroke.
    placeholderData: keepPreviousData,
  });
  const categories = useCategories();

  const products = deferred ? (results.data?.items ?? []) : [];
  const total = results.data?.total ?? 0;
  const pending = Boolean(trimmed) && (trimmed !== deferred || results.isFetching);
  const firstLoad = Boolean(deferred) && !results.data && results.isPending;
  const allCategories = categories.data ?? [];
  const topCategories = (() => {
    const roots = allCategories.filter((category) => !category.parentId);
    return (roots.length >= 4 ? roots : allCategories).slice(0, 8);
  })();
  const needle = deferred.toLocaleLowerCase();
  const matchingCategories = needle
    ? allCategories
        .filter((category) =>
          [category.nameEn, category.nameAr].some((name) =>
            name?.toLocaleLowerCase().includes(needle),
          ),
        )
        .slice(0, 4)
    : [];
  const optionId = (index: number) => `${listId}-option-${index}`;

  const updateAnchorPosition = useCallback(() => {
    const gutter = 12;
    const width = Math.min(600, window.innerWidth - gutter * 2);
    const rect = searchTriggerRef.current?.getBoundingClientRect();
    const top = rect ? rect.bottom + 10 : 76;
    const preferredLeft = rect ? rect.right + 12 - width : window.innerWidth - width - gutter;
    const left = Math.min(Math.max(gutter, preferredLeft), window.innerWidth - width - gutter);
    setAnchorStyle({
      "--search-top": `${Math.max(gutter, top)}px`,
      "--search-left": `${left}px`,
      "--search-width": `${width}px`,
    } as CSSProperties);
  }, [searchTriggerRef]);

  useEffect(() => {
    if (!searchOpen) {
      setQuery("");
      return;
    }
    setRecent(readRecent());
    updateAnchorPosition();
    // The dialog locks page scroll, so only a resize can move the trigger.
    window.addEventListener("resize", updateAnchorPosition);
    return () => window.removeEventListener("resize", updateAnchorPosition);
  }, [searchOpen, updateAnchorPosition]);

  useEffect(() => setActiveIndex(-1), [deferred]);

  const close = useCallback(() => setSearchOpen(false), [setSearchOpen]);

  const goToResults = () => {
    if (!trimmed) return;
    rememberSearch(trimmed);
    close();
    void navigate({ to: "/shop", search: { search: trimmed } });
  };

  const chooseProduct = (product: Product) => {
    rememberSearch(deferred);
    trackCommerceEvent("search_performed", { searchTerm: deferred, resultCount: total });
    close();
    void navigate({ to: "/product/$slug", params: { slug: product.slug } });
  };

  const pickTerm = (term: string) => {
    setQuery(term);
    inputRef.current?.focus({ preventScroll: true });
  };

  const clearRecent = () => {
    writeRecent([]);
    setRecent([]);
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const active = products[activeIndex];
    if (active) chooseProduct(active);
    else goToResults();
  };

  const onInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!products.length || (event.key !== "ArrowDown" && event.key !== "ArrowUp")) return;
    event.preventDefault();
    const last = products.length - 1;
    const next =
      event.key === "ArrowDown"
        ? activeIndex >= last
          ? 0
          : activeIndex + 1
        : activeIndex <= 0
          ? last
          : activeIndex - 1;
    setActiveIndex(next);
    document.getElementById(optionId(next))?.scrollIntoView({ block: "nearest" });
  };

  return (
    <DialogPrimitive.Root open={searchOpen} onOpenChange={setSearchOpen}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="search-overlay__backdrop" />
        <DialogPrimitive.Content
          id="storefront-search-dialog"
          aria-modal="true"
          className="bz-search"
          style={anchorStyle}
          onOpenAutoFocus={(event) => {
            event.preventDefault();
            const activeElement = document.activeElement;
            returnFocusRef.current =
              activeElement instanceof HTMLElement && activeElement !== document.body
                ? activeElement
                : searchTriggerRef.current;
            inputRef.current?.focus({ preventScroll: true });
          }}
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            (returnFocusRef.current ?? searchTriggerRef.current)?.focus({ preventScroll: true });
            returnFocusRef.current = null;
          }}
        >
          <DialogPrimitive.Title className="sr-only">{labels.label}</DialogPrimitive.Title>
          <DialogPrimitive.Description className="sr-only">
            {labels.description}
          </DialogPrimitive.Description>

          <form className="bz-search__bar" onSubmit={submit} role="search">
            <Search className="bz-search__icon" strokeWidth={1.6} aria-hidden="true" />
            <input
              ref={inputRef}
              data-form-control="search-input"
              type="search"
              inputMode="search"
              enterKeyHint="search"
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={onInputKeyDown}
              placeholder={labels.placeholder}
              aria-label={labels.label}
              aria-controls={products.length ? `${listId}-list` : undefined}
              aria-activedescendant={activeIndex >= 0 ? optionId(activeIndex) : undefined}
            />
            {query && (
              <button
                type="button"
                className="bz-search__clear"
                onClick={() => pickTerm("")}
                aria-label={labels.clear}
              >
                {labels.clearRecent}
              </button>
            )}
            <DialogPrimitive.Close asChild>
              <button type="button" className="bz-search__close" aria-label={labels.close}>
                <X strokeWidth={1.6} aria-hidden="true" />
              </button>
            </DialogPrimitive.Close>
            <span className="bz-search__progress" data-active={pending || undefined} />
          </form>

          <div className="bz-search__body">
            {!deferred ? (
              <>
                {recent.length > 0 && (
                  <section className="bz-search__section">
                    <div className="bz-search__label-row">
                      <p className="bz-search__label">{labels.recent}</p>
                      <button type="button" className="bz-search__text-btn" onClick={clearRecent}>
                        {labels.clearRecent}
                      </button>
                    </div>
                    <ul className="bz-search__recent">
                      {recent.map((term) => (
                        <li key={term}>
                          <button type="button" onClick={() => pickTerm(term)}>
                            <Clock strokeWidth={1.6} aria-hidden="true" />
                            <span>{term}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                <section className="bz-search__section">
                  <p className="bz-search__label">{labels.suggestions}</p>
                  <div className="bz-search__chips">
                    {labels.suggestionTerms.map((term) => (
                      <button key={term} type="button" onClick={() => pickTerm(term)}>
                        {term}
                      </button>
                    ))}
                  </div>
                </section>

                <section className="bz-search__section">
                  <p className="bz-search__label">{labels.categories}</p>
                  <ul className="bz-search__categories">
                    {topCategories.map((category) => (
                      <li key={category.id}>
                        <Link
                          to="/categories/$slug"
                          params={{ slug: category.slug }}
                          onClick={close}
                        >
                          <span>{locale === "ar" ? category.nameAr : category.nameEn}</span>
                          <ChevronRight strokeWidth={1.6} aria-hidden="true" />
                        </Link>
                      </li>
                    ))}
                    <li>
                      <Link to="/shop" onClick={close} className="bz-search__all-link">
                        <span>{labels.allProducts}</span>
                        <ChevronRight strokeWidth={1.6} aria-hidden="true" />
                      </Link>
                    </li>
                  </ul>
                </section>
              </>
            ) : results.isError && !results.data ? (
              <div className="bz-search__state" role="alert">
                <p>{labels.error}</p>
                <button
                  type="button"
                  className="bz-search__text-btn"
                  onClick={() => void results.refetch()}
                >
                  {labels.retry}
                </button>
              </div>
            ) : firstLoad ? (
              <ResultsSkeleton />
            ) : (
              <>
                {matchingCategories.length > 0 && (
                  <section className="bz-search__section">
                    <p className="bz-search__label">{labels.matchingCategories}</p>
                    <div className="bz-search__chips">
                      {matchingCategories.map((category) => (
                        <Link
                          key={category.id}
                          to="/categories/$slug"
                          params={{ slug: category.slug }}
                          onClick={close}
                        >
                          <span>
                            <Highlight
                              text={(locale === "ar" ? category.nameAr : category.nameEn) ?? ""}
                              query={deferred}
                            />
                          </span>
                        </Link>
                      ))}
                    </div>
                  </section>
                )}

                {products.length > 0 ? (
                  <section className="bz-search__section bz-search__section--flush">
                    <div className="bz-search__label-row">
                      <p className="bz-search__label">{labels.products}</p>
                      <p className="bz-search__count" aria-live="polite">
                        {labels.results(total)}
                      </p>
                    </div>
                    <ul id={`${listId}-list`} className="bz-search__results">
                      {products.map((product, index) => (
                        <li key={product.slug}>
                          <ResultRow
                            id={optionId(index)}
                            product={product}
                            query={deferred}
                            active={index === activeIndex}
                            onChoose={() => chooseProduct(product)}
                          />
                        </li>
                      ))}
                    </ul>
                  </section>
                ) : (
                  !pending && (
                    <div className="bz-search__state">
                      <p className="bz-search__state-title" aria-live="polite">
                        {labels.empty(deferred)}
                      </p>
                      <p>{labels.emptyHint}</p>
                      <div className="bz-search__chips bz-search__chips--center">
                        {labels.suggestionTerms.slice(0, 4).map((term) => (
                          <button key={term} type="button" onClick={() => pickTerm(term)}>
                            {term}
                          </button>
                        ))}
                      </div>
                    </div>
                  )
                )}
              </>
            )}
          </div>

          {deferred && products.length > 0 && (
            <button type="button" className="bz-search__footer" onClick={goToResults}>
              <span>{labels.viewAll(total)}</span>
              <kbd aria-hidden="true">↵</kbd>
              <ArrowRight
                className="bz-search__footer-arrow"
                strokeWidth={1.6}
                aria-hidden="true"
              />
            </button>
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

function ResultRow({
  id,
  product,
  query,
  active,
  onChoose,
}: {
  id: string;
  product: Product;
  query: string;
  active: boolean;
  onChoose: () => void;
}) {
  const size = product.sizes[0];
  const price = size?.price ?? product.price;
  const original = size?.originalPrice ?? product.originalPrice;
  const onSale = original !== undefined && original > price;
  const meta = product.brand?.name ?? product.type;

  return (
    <Link
      id={id}
      to="/product/$slug"
      params={{ slug: product.slug }}
      className="bz-search__result"
      data-active={active || undefined}
      onClick={(event) => {
        // Let modified clicks open a new tab; plain clicks go through the panel's handler.
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
        event.preventDefault();
        onChoose();
      }}
    >
      <span className="bz-search__thumb">
        {product.image ? (
          <img src={product.image} alt="" width={56} height={56} loading="lazy" decoding="async" />
        ) : null}
      </span>
      <span className="bz-search__result-copy">
        {meta && <span className="bz-search__result-meta">{meta}</span>}
        <span className="bz-search__result-name">
          <Highlight text={product.name} query={query} />
        </span>
      </span>
      <span className="bz-search__price">
        <span>{formatPrice(price)}</span>
        {onSale && <s>{formatPrice(original)}</s>}
      </span>
    </Link>
  );
}

function Highlight({ text, query }: { text: string; query: string }) {
  const index = query ? text.toLocaleLowerCase().indexOf(query.toLocaleLowerCase()) : -1;
  if (index < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, index)}
      <mark>{text.slice(index, index + query.length)}</mark>
      {text.slice(index + query.length)}
    </>
  );
}

function ResultsSkeleton() {
  return (
    <div className="bz-search__skeleton" aria-hidden="true">
      {Array.from({ length: 4 }, (_, index) => (
        <span key={index}>
          <i />
          <b />
        </span>
      ))}
    </div>
  );
}
