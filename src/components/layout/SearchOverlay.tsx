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
import { Link, useNavigate } from "@tanstack/react-router";
import { Search, TrendingUp, X } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { PolishedImage } from "@/components/ui/polished-image";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import { useCatalog, useCategories } from "@/lib/catalog";
import { formatPrice, type Product } from "@/lib/products";
import { useStore } from "@/lib/store";

const copy = {
  en: {
    eyebrow: "Search BIOREZA",
    title: "Find your next essential.",
    description: "Search products, brands, categories and skincare concerns.",
    placeholder: "Product, brand, category or concern",
    close: "Close search",
    submit: "Search the collection",
    loading: "Searching the collection…",
    error: "Search is temporarily unavailable. Try again in a moment.",
    emptyTitle: (query: string) => `Nothing matched “${query}”`,
    emptyCopy: "Try a shorter product name, another brand, or browse by category.",
    clear: "Clear search",
    browse: "Browse the collection",
    categories: "Browse by category",
    recent: "Recently searched",
    trending: "Trending searches",
    recentTerms: ["glass skin", "ceramide cream", "daily skincare", "body oil"],
    trendingTerms: [
      "serum",
      "moisturizer",
      "sunscreen",
      "cleanser",
      "fragrance",
      "makeup",
      "skincare",
      "l'oreal",
    ],
    selected: "Selected from the collection",
    results: (count: number) => `${count} ${count === 1 ? "result" : "results"}`,
    all: (query: string) => `View every result for “${query}”`,
    enter: "to view all",
    escape: "to close",
  },
  ar: {
    eyebrow: "البحث في بيوريزا",
    title: "اعثري على اختيارك القادم.",
    description: "ابحثي عن المنتجات والعلامات والفئات واحتياجات البشرة.",
    placeholder: "منتج أو علامة تجارية أو فئة أو احتياج",
    close: "إغلاق البحث",
    submit: "البحث في المجموعة",
    loading: "جارٍ البحث في المجموعة…",
    error: "البحث غير متاح مؤقتًا. حاولي مرة أخرى بعد قليل.",
    emptyTitle: (query: string) => `لا توجد نتائج مطابقة لـ «${query}»`,
    emptyCopy: "جرّبي اسمًا أقصر، أو علامة أخرى، أو تصفحي حسب الفئة.",
    clear: "مسح البحث",
    browse: "تصفح المجموعة",
    categories: "تصفحي حسب الفئة",
    recent: "عمليات بحث حديثة",
    trending: "الأكثر بحثًا",
    recentTerms: ["جلاس سكين", "كريم سيراميد", "روتين يومي", "زيت للجسم"],
    trendingTerms: ["سيروم", "مرطب", "واقي شمس", "غسول", "عطر", "مكياج", "عناية بالبشرة", "لوريال"],
    selected: "مختارات من المجموعة",
    results: (count: number) => `${count} ${count === 1 ? "نتيجة" : "نتائج"}`,
    all: (query: string) => `عرض كل نتائج «${query}»`,
    enter: "لعرض الكل",
    escape: "للإغلاق",
  },
} as const;

export function SearchOverlay() {
  const { searchOpen, setSearchOpen, locale } = useStore();
  const navigate = useNavigate();
  const labels = copy[locale];
  const openerRef = useRef<HTMLElement | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const statusId = useId();
  const [anchorStyle, setAnchorStyle] = useState<CSSProperties>();
  const [query, setQuery] = useState("");
  const trimmed = query.trim();
  const deferred = useDebouncedValue(trimmed, 140);
  const results = useCatalog(deferred ? { search: deferred, limit: 6 } : { limit: 4 }, locale);
  const categories = useCategories();
  const visibleCategories = (categories.data ?? []).slice(0, 9);
  const waitingForQuery = Boolean(trimmed) && trimmed !== deferred;
  const searching = waitingForQuery || (results.isFetching && Boolean(deferred));

  const updateAnchorPosition = useCallback(() => {
    if (typeof window === "undefined") return;

    const viewportPadding = 12;
    const panelWidth = Math.min(520, window.innerWidth - viewportPadding * 2);
    const anchor = openerRef.current;
    const rect = anchor?.getBoundingClientRect();
    const top = rect ? rect.bottom + 12 : 76;
    const fallbackLeft = window.innerWidth - panelWidth - viewportPadding;
    const preferredLeft = rect ? rect.left + rect.width / 2 - panelWidth + 44 : fallbackLeft;
    const left = Math.min(
      Math.max(viewportPadding, preferredLeft),
      window.innerWidth - panelWidth - viewportPadding,
    );
    const arrowLeft = rect
      ? Math.min(Math.max(rect.left + rect.width / 2 - left, 24), panelWidth - 24)
      : panelWidth - 44;

    setAnchorStyle({
      "--search-anchor-top": `${Math.max(viewportPadding, top)}px`,
      "--search-anchor-left": `${left}px`,
      "--search-anchor-arrow-left": `${arrowLeft}px`,
      "--search-panel-width": `${panelWidth}px`,
    } as CSSProperties);
  }, []);

  useEffect(() => {
    if (!searchOpen) setQuery("");
  }, [searchOpen]);

  useEffect(() => {
    if (!searchOpen || typeof window === "undefined") return;

    const { body, documentElement } = document;
    const scrollY = window.scrollY;
    const scrollbarGap = window.innerWidth - documentElement.clientWidth;
    const previousDocumentOverflow = documentElement.style.overflow;
    const previousBodyOverflow = body.style.overflow;
    const previousBodyPosition = body.style.position;
    const previousBodyTop = body.style.top;
    const previousBodyWidth = body.style.width;
    const previousBodyPaddingRight = body.style.paddingRight;

    documentElement.style.overflow = "hidden";
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";
    if (scrollbarGap > 0) {
      body.style.paddingRight = `${scrollbarGap}px`;
    }

    return () => {
      documentElement.style.overflow = previousDocumentOverflow;
      body.style.overflow = previousBodyOverflow;
      body.style.position = previousBodyPosition;
      body.style.top = previousBodyTop;
      body.style.width = previousBodyWidth;
      body.style.paddingRight = previousBodyPaddingRight;
      window.scrollTo(0, scrollY);
    };
  }, [searchOpen]);

  useEffect(() => {
    if (!searchOpen) {
      setAnchorStyle(undefined);
      return;
    }

    updateAnchorPosition();
    const syncPosition = () => updateAnchorPosition();
    window.addEventListener("resize", syncPosition);
    window.addEventListener("scroll", syncPosition, true);
    return () => {
      window.removeEventListener("resize", syncPosition);
      window.removeEventListener("scroll", syncPosition, true);
    };
  }, [searchOpen, updateAnchorPosition]);

  const close = useCallback(() => setSearchOpen(false), [setSearchOpen]);

  const goToResults = useCallback(() => {
    if (!trimmed) return;
    close();
    void navigate({ to: "/shop", search: { search: trimmed } });
  }, [close, navigate, trimmed]);

  const pickSuggestion = useCallback((term: string) => {
    setQuery(term);
    window.requestAnimationFrame(() => inputRef.current?.focus({ preventScroll: true }));
  }, []);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    goToResults();
  };

  const focusResult = (edge: "first" | "last") => {
    const links = resultsRef.current?.querySelectorAll<HTMLAnchorElement>("[data-search-result]");
    const target = edge === "first" ? links?.[0] : links?.[links.length - 1];
    target?.focus();
  };

  return (
    <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
      <DialogContent
        showCloseButton={false}
        overlayClassName="search-overlay__backdrop"
        className="search-overlay"
        style={anchorStyle}
        onOpenAutoFocus={(event) => {
          event.preventDefault();
          if (document.activeElement instanceof HTMLElement) {
            openerRef.current = document.activeElement;
          }
          updateAnchorPosition();
          window.requestAnimationFrame(() => inputRef.current?.focus({ preventScroll: true }));
        }}
        onCloseAutoFocus={(event) => {
          event.preventDefault();
          openerRef.current?.focus({ preventScroll: true });
          openerRef.current = null;
        }}
      >
        <DialogDescription className="sr-only">{labels.description}</DialogDescription>
        <div className="search-overlay-content">
          <header className="search-overlay__header">
            <div className="search-overlay__heading">
              <p className="search-overlay__eyebrow">{labels.eyebrow}</p>
              <DialogTitle asChild>
                <h2>{labels.title}</h2>
              </DialogTitle>
            </div>
            <DialogClose asChild>
              <button type="button" aria-label={labels.close} className="search-overlay__close">
                <span aria-hidden="true">
                  <X strokeWidth={1.2} />
                </span>
              </button>
            </DialogClose>
          </header>

          <form className="search-command" onSubmit={submit} role="search">
            <Search strokeWidth={1.2} className="search-command__icon" aria-hidden="true" />
            <input
              ref={inputRef}
              type="search"
              inputMode="search"
              enterKeyHint="search"
              autoComplete="off"
              spellCheck={false}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
                event.preventDefault();
                focusResult(event.key === "ArrowDown" ? "first" : "last");
              }}
              placeholder={labels.placeholder}
              aria-label={labels.eyebrow}
              aria-controls="search-results"
              aria-describedby={statusId}
            />
            <button
              type="submit"
              disabled={!trimmed}
              aria-label={labels.submit}
              className="search-command__submit"
            >
              <DirectionalArrow />
            </button>
            <span className="search-command__focus-line" aria-hidden="true" />
          </form>

          <div className="search-overlay__meta">
            <span id={statusId} className="search-overlay__status" aria-live="polite">
              {searching && <i aria-hidden="true" />}
              {searching
                ? labels.loading
                : deferred && results.data
                  ? labels.results(results.data.length)
                  : labels.selected}
            </span>
            <span className="search-overlay__keys" aria-hidden="true">
              <kbd>↵</kbd>
              <span>{labels.enter}</span>
              <i />
              <kbd>Esc</kbd>
              <span>{labels.escape}</span>
            </span>
          </div>

          <div
            ref={resultsRef}
            id="search-results"
            className="search-overlay__body"
            aria-busy={searching || undefined}
          >
            {!deferred && (
              <aside className="search-discovery" aria-labelledby="search-category-title">
                <p id="search-category-title" className="search-section-label">
                  {labels.categories}
                </p>
                <ul>
                  {visibleCategories.map((category) => (
                    <li key={category.id}>
                      <Link to="/shop" search={{ category: category.slug }} onClick={close}>
                        <span>{locale === "ar" ? category.nameAr : category.nameEn}</span>
                        <small>{String(category.productCount).padStart(2, "0")}</small>
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link to="/shop" onClick={close} className="search-discovery__all">
                  <span>{labels.browse}</span>
                  <DirectionalArrow />
                </Link>
              </aside>
            )}

            <section
              className={
                !deferred ? "search-products search-products--with-discovery" : "search-products"
              }
              aria-label={deferred ? labels.results(results.data?.length ?? 0) : labels.selected}
            >
              {!deferred && (
                <div className="search-suggestions" aria-label={labels.trending}>
                  <SearchSuggestionGroup
                    title={labels.recent}
                    terms={labels.recentTerms}
                    onPick={pickSuggestion}
                  />
                  <SearchSuggestionGroup
                    title={labels.trending}
                    terms={labels.trendingTerms}
                    onPick={pickSuggestion}
                    trending
                  />
                </div>
              )}

              <div
                className="search-results-stage"
                key={waitingForQuery ? "waiting" : deferred || "selected"}
              >
                {results.error ? (
                  <div className="search-state" role="alert">
                    <p>{labels.error}</p>
                    <button type="button" onClick={() => void results.refetch()}>
                      {locale === "ar" ? "حاولي مرة أخرى" : "Try again"}
                    </button>
                  </div>
                ) : waitingForQuery || results.isLoading ? (
                  <SearchResultsSkeleton />
                ) : deferred && results.data?.length === 0 ? (
                  <div className="search-state search-state--empty">
                    <span className="search-state__index" aria-hidden="true">
                      00
                    </span>
                    <h3>{labels.emptyTitle(deferred)}</h3>
                    <p>{labels.emptyCopy}</p>
                    <div className="search-state__actions">
                      <button type="button" onClick={() => setQuery("")}>
                        {labels.clear}
                      </button>
                      <Link to="/shop" onClick={close}>
                        {labels.browse}
                      </Link>
                    </div>
                  </div>
                ) : (
                  <SearchProductGrid
                    products={results.data ?? []}
                    query={deferred}
                    onNavigate={close}
                  />
                )}
              </div>

              {deferred && Boolean(results.data?.length) && !searching && (
                <button type="button" onClick={goToResults} className="search-view-all">
                  <span>{labels.all(deferred)}</span>
                  <DirectionalArrow />
                </button>
              )}
            </section>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function SearchSuggestionGroup({
  title,
  terms,
  onPick,
  trending = false,
}: {
  title: string;
  terms: readonly string[];
  onPick: (term: string) => void;
  trending?: boolean;
}) {
  const headingId = useId();

  return (
    <section className="search-suggestion-group" aria-labelledby={headingId}>
      <p id={headingId} className="search-section-label">
        {title}
      </p>
      <div className="search-suggestion-grid">
        {terms.map((term) => (
          <button
            key={term}
            type="button"
            className="search-suggestion-chip"
            onClick={() => onPick(term)}
          >
            {trending && <TrendingUp strokeWidth={1.6} aria-hidden="true" />}
            <span>{term}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

function SearchProductGrid({
  products,
  query,
  onNavigate,
}: {
  products: Product[];
  query: string;
  onNavigate: () => void;
}) {
  const onResultKeyDown = (event: KeyboardEvent<HTMLAnchorElement>) => {
    if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;
    const links = Array.from(
      event.currentTarget
        .closest("ul")
        ?.querySelectorAll<HTMLAnchorElement>("[data-search-result]") ?? [],
    );
    const current = links.indexOf(event.currentTarget);
    const next =
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? links.length - 1
          : event.key === "ArrowDown"
            ? (current + 1) % links.length
            : (current - 1 + links.length) % links.length;
    event.preventDefault();
    links[next]?.focus();
  };

  return (
    <ul className="search-product-grid">
      {products.map((product, index) => (
        <li key={product.slug} style={{ "--result-index": index } as CSSProperties}>
          <Link
            to="/product/$slug"
            params={{ slug: product.slug }}
            onClick={onNavigate}
            onKeyDown={onResultKeyDown}
            data-search-result
            className="search-product-card"
            aria-label={`${product.name}, ${formatPrice(product.sizes[0]?.price ?? product.price)}`}
          >
            <PolishedImage
              src={product.image}
              alt=""
              loading={index < 2 ? "eager" : "lazy"}
              fetchPriority={index < 2 ? "high" : "auto"}
              width={76}
              height={92}
              sizes="(max-width: 640px) 64px, 76px"
              wrapperClassName="search-product-card__image"
              className="size-full object-cover"
            />
            <span className="search-product-card__copy">
              <span className="search-product-card__meta">
                <HighlightMatch text={product.type} query={query} />
                {product.type !== product.category && <i aria-hidden="true" />}
                {product.type !== product.category && (
                  <HighlightMatch text={product.category} query={query} />
                )}
              </span>
              <strong title={product.name}>
                <HighlightMatch text={product.name} query={query} />
              </strong>
              <small>{formatPrice(product.sizes[0]?.price ?? product.price)}</small>
            </span>
            <DirectionalArrow className="search-product-card__arrow" />
          </Link>
        </li>
      ))}
    </ul>
  );
}

function HighlightMatch({ text, query }: { text: string; query: string }) {
  const needle = query.trim();
  if (!needle) return <>{text}</>;
  const index = text.toLocaleLowerCase().indexOf(needle.toLocaleLowerCase());
  if (index < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, index)}
      <mark>{text.slice(index, index + needle.length)}</mark>
      {text.slice(index + needle.length)}
    </>
  );
}

function DirectionalArrow({ className = "" }: { className?: string }) {
  return (
    <span className={`search-direction ${className}`} aria-hidden="true">
      <span />
      <svg viewBox="0 0 8 12" fill="none">
        <path d="m2 1 5 5-5 5" />
      </svg>
    </span>
  );
}

function SearchResultsSkeleton() {
  return (
    <div className="search-results-skeleton" aria-hidden="true">
      {Array.from({ length: 4 }, (_, index) => (
        <span className="search-results-skeleton__row" key={index}>
          <i />
          <b />
          <em />
        </span>
      ))}
    </div>
  );
}
