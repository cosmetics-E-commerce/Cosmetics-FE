import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { formatPrice } from "@/lib/products";
import { useCatalog } from "@/lib/catalog";
import { useStore } from "@/lib/store";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import { PolishedImage } from "@/components/ui/polished-image";

export function SearchOverlay() {
  const { searchOpen, setSearchOpen, locale } = useStore();
  const [query, setQuery] = useState("");
  const deferred = useDebouncedValue(query.trim(), 220);
  const results = useCatalog(deferred ? { search: deferred, limit: 6 } : { limit: 6 }, locale);
  return (
    <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
      <DialogContent
        showCloseButton={false}
        className="top-0 max-w-none translate-y-0 gap-0 rounded-none border-0 border-b border-border bg-warm-white p-0 sm:max-w-none"
      >
        <DialogTitle className="sr-only">Search BIOREZA</DialogTitle>
        <div className="mx-auto max-h-[100dvh] w-full max-w-5xl overflow-y-auto px-6 pb-12 pt-10 md:px-10">
          <div className="flex items-center gap-4 border-b border-gold/40 pb-4">
            <Search strokeWidth={1} className="size-5 shrink-0 text-gold" />
            <input
              autoFocus
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={
                locale === "ar" ? "ابحثي عن منتج أو فئة" : "Search products or categories"
              }
              className="w-full bg-transparent font-serif text-xl outline-none placeholder:text-greige md:text-3xl"
            />
            <button
              type="button"
              onClick={() => setSearchOpen(false)}
              aria-label="Close search"
              className="grid size-11 place-items-center text-taupe"
            >
              <X strokeWidth={1} className="size-5" />
            </button>
          </div>
          <div aria-live="polite" aria-atomic="true">
            {results.isFetching && deferred && (
              <p className="mt-10 text-sm text-muted-foreground">Searching the collection...</p>
            )}
            {results.error && (
              <p role="alert" className="mt-10 text-sm text-destructive">
                The catalog is temporarily unavailable.
              </p>
            )}
            {!results.isLoading && deferred && results.data?.length === 0 && (
              <p className="mt-10 text-sm text-muted-foreground">No products match “{deferred}”.</p>
            )}
            <ul className="mt-8 divide-y divide-border">
              {results.data?.map((product, index) => (
                <li
                  key={product.slug}
                  className="rise-in"
                  style={{ animationDelay: `${Math.min(index * 35, 150)}ms` }}
                >
                  <Link
                    to="/product/$slug"
                    params={{ slug: product.slug }}
                    onClick={() => setSearchOpen(false)}
                    className="flex items-center gap-5 py-4 transition-colors duration-200 hover:bg-ivory"
                  >
                    <PolishedImage
                      src={product.image}
                      alt=""
                      loading="lazy"
                      wrapperClassName="h-20 w-16 shrink-0"
                      className="size-full object-cover"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="label-xs block text-taupe">{product.category}</span>
                      <span className="mt-1 block truncate font-serif text-xl">{product.name}</span>
                    </span>
                    <span className="font-serif text-lg text-gold">
                      {formatPrice(product.sizes[0]?.price ?? product.price)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
