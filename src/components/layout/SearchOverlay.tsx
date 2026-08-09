import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, CornerDownLeft, LoaderCircle, Search, X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { PolishedImage } from "@/components/ui/polished-image";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import { useCatalog, useCategories } from "@/lib/catalog";
import { formatPrice, type Product } from "@/lib/products";
import { useStore } from "@/lib/store";

const copy = {
  en: {
    eyebrow: "Search BIOREZA",
    title: "Find your next essential.",
    placeholder: "Product, brand, category or concern",
    close: "Close search",
    submit: "Search the collection",
    loading: "Searching the collection…",
    error: "Search is temporarily unavailable. Try again in a moment.",
    emptyTitle: (query: string) => `Nothing matched “${query}”`,
    emptyCopy: "Try a shorter product name, another brand, or browse by category.",
    browse: "Browse the collection",
    categories: "Browse by category",
    selected: "Selected from the collection",
    results: (count: number) => `${count} ${count === 1 ? "result" : "results"}`,
    all: (query: string) => `View every result for “${query}”`,
    enter: "Enter to view all",
    escape: "Esc to close",
  },
  ar: {
    eyebrow: "البحث في بيوريزا",
    title: "اعثري على اختيارك القادم.",
    placeholder: "منتج أو علامة تجارية أو فئة أو احتياج",
    close: "إغلاق البحث",
    submit: "البحث في المجموعة",
    loading: "جارٍ البحث في المجموعة…",
    error: "البحث غير متاح مؤقتًا. حاولي مرة أخرى بعد قليل.",
    emptyTitle: (query: string) => `لا توجد نتائج مطابقة لـ «${query}»`,
    emptyCopy: "جرّبي اسمًا أقصر، أو علامة أخرى، أو تصفحي حسب الفئة.",
    browse: "تصفح المجموعة",
    categories: "تصفحي حسب الفئة",
    selected: "مختارات من المجموعة",
    results: (count: number) => `${count} ${count === 1 ? "نتيجة" : "نتائج"}`,
    all: (query: string) => `عرض كل نتائج «${query}»`,
    enter: "Enter لعرض الكل",
    escape: "Esc للإغلاق",
  },
} as const;

export function SearchOverlay() {
  const { searchOpen, setSearchOpen, locale } = useStore();
  const navigate = useNavigate();
  const labels = copy[locale];
  const [query, setQuery] = useState("");
  const trimmed = query.trim();
  const deferred = useDebouncedValue(trimmed, 140);
  const results = useCatalog(deferred ? { search: deferred, limit: 6 } : { limit: 4 }, locale);
  const categories = useCategories();
  const waitingForQuery = Boolean(trimmed) && trimmed !== deferred;
  const searching = waitingForQuery || (results.isFetching && Boolean(deferred));

  useEffect(() => {
    if (!searchOpen) setQuery("");
  }, [searchOpen]);

  const goToResults = () => {
    if (!trimmed) return;
    setSearchOpen(false);
    void navigate({ to: "/shop", search: { search: trimmed } });
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    goToResults();
  };

  return (
    <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
      <DialogContent showCloseButton={false} className="search-overlay">
        <DialogTitle className="sr-only">{labels.eyebrow}</DialogTitle>
        <div className="search-overlay-content">
          <header className="search-overlay__header">
            <div>
              <p className="label-xs text-gold">{labels.eyebrow}</p>
              <h2 className="mt-2 font-serif text-[clamp(1.65rem,3vw,2.45rem)] leading-tight">
                {labels.title}
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setSearchOpen(false)}
              aria-label={labels.close}
              className="search-overlay__close"
            >
              <X strokeWidth={1.25} aria-hidden="true" />
            </button>
          </header>

          <form className="search-command" onSubmit={submit} role="search">
            <Search strokeWidth={1.25} className="search-command__icon" aria-hidden="true" />
            <input
              type="search"
              inputMode="search"
              enterKeyHint="search"
              autoComplete="off"
              spellCheck={false}
              autoFocus
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={labels.placeholder}
              aria-label={labels.eyebrow}
              aria-controls="search-results"
            />
            <button
              type="submit"
              disabled={!trimmed}
              aria-label={labels.submit}
              className="search-command__submit"
            >
              <ArrowRight className="rtl:rotate-180" aria-hidden="true" />
            </button>
          </form>

          <div className="search-overlay__meta" aria-live="polite">
            <span>
              {searching ? (
                <span className="inline-flex items-center gap-2">
                  <LoaderCircle className="size-3.5 animate-spin" aria-hidden="true" />
                  {labels.loading}
                </span>
              ) : deferred && results.data ? (
                labels.results(results.data.length)
              ) : (
                labels.selected
              )}
            </span>
            <span className="search-overlay__keys" aria-hidden="true">
              <kbd>
                <CornerDownLeft />
              </kbd>
              {labels.enter}
              <i />
              <kbd>Esc</kbd>
              {labels.escape.replace("Esc ", "")}
            </span>
          </div>

          <div
            id="search-results"
            className="search-overlay__body"
            aria-busy={searching || undefined}
          >
            {!deferred && (
              <aside className="search-discovery">
                <p className="label-xs text-taupe">{labels.categories}</p>
                <ul>
                  {(categories.data ?? []).map((category) => (
                    <li key={category.id}>
                      <Link
                        to="/shop"
                        search={{ category: category.slug }}
                        onClick={() => setSearchOpen(false)}
                      >
                        <span>{locale === "ar" ? category.nameAr : category.nameEn}</span>
                        <small>{category.productCount}</small>
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/shop"
                  onClick={() => setSearchOpen(false)}
                  className="search-discovery__all"
                >
                  {labels.browse}
                  <ArrowRight className="rtl:rotate-180" aria-hidden="true" />
                </Link>
              </aside>
            )}

            <section
              className={
                !deferred ? "search-products search-products--with-discovery" : "search-products"
              }
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
                <div className="search-state">
                  <h3>{labels.emptyTitle(deferred)}</h3>
                  <p>{labels.emptyCopy}</p>
                  <Link to="/shop" onClick={() => setSearchOpen(false)}>
                    {labels.browse}
                  </Link>
                </div>
              ) : (
                <SearchProductGrid
                  products={results.data ?? []}
                  onNavigate={() => setSearchOpen(false)}
                />
              )}

              {deferred && Boolean(results.data?.length) && !searching && (
                <button type="button" onClick={goToResults} className="search-view-all">
                  <span>{labels.all(deferred)}</span>
                  <ArrowRight className="rtl:rotate-180" aria-hidden="true" />
                </button>
              )}
            </section>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function SearchProductGrid({
  products,
  onNavigate,
}: {
  products: Product[];
  onNavigate: () => void;
}) {
  return (
    <ul className="search-product-grid">
      {products.map((product) => (
        <li key={product.slug}>
          <Link
            to="/product/$slug"
            params={{ slug: product.slug }}
            onClick={onNavigate}
            className="search-product-card"
          >
            <PolishedImage
              src={product.image}
              alt=""
              loading="lazy"
              sizes="72px"
              wrapperClassName="search-product-card__image"
              className="size-full object-cover"
            />
            <span className="search-product-card__copy">
              <span className="label-xs">{product.category}</span>
              <strong>{product.name}</strong>
              <small>{formatPrice(product.sizes[0]?.price ?? product.price)}</small>
            </span>
            <ArrowRight className="search-product-card__arrow rtl:rotate-180" aria-hidden="true" />
          </Link>
        </li>
      ))}
    </ul>
  );
}

function SearchResultsSkeleton() {
  return (
    <div className="search-results-skeleton" aria-hidden="true">
      {Array.from({ length: 4 }, (_, index) => (
        <span key={index} />
      ))}
    </div>
  );
}
