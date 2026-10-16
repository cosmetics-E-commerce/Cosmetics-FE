import { Link } from "@tanstack/react-router";
import { useQueries } from "@tanstack/react-query";
import { ArrowUpRight } from "lucide-react";
import { PolishedImage } from "@/components/ui/polished-image";
import { listProductsPage } from "@/lib/api";
import type { Product } from "@/lib/products";

export type CategoryChild = {
  id: string;
  slug: string;
  name: string;
  imageUrl: string | null;
  productCount: number;
};

const MAX_SHOTS = 3;
const PREVIEW_STALE_TIME = 5 * 60_000;

/**
 * Subcategory discovery cards. A category without its own image is illustrated
 * with packshots of its products: first from the products already on the page,
 * then (in the browser only, so SSR never fans out API calls under one IP) a
 * small request per subcategory that is still uncovered.
 */
export function CategoryChildCards({
  categories,
  products,
  locale,
}: {
  categories: CategoryChild[];
  products: Product[];
  locale: "ar" | "en";
}) {
  const pageShots = shotsFromProducts(categories, products);
  const uncovered = categories.filter(
    (category) => !category.imageUrl && (pageShots.get(category.id)?.length ?? 0) === 0,
  );
  const fetched = useQueries({
    queries: uncovered.map((category) => ({
      queryKey: ["category-preview-shots", category.slug] as const,
      queryFn: async ({ signal }: { signal: AbortSignal }) => {
        const page = await listProductsPage(
          { categorySlug: category.slug, limit: MAX_SHOTS },
          signal,
        );
        return page.items.flatMap((product) => {
          const url =
            product.imageUrl?.trim() ||
            product.images
              ?.slice()
              .sort((a, b) => a.sortOrder - b.sortOrder)[0]
              ?.url?.trim();
          return url ? [url] : [];
        });
      },
      staleTime: PREVIEW_STALE_TIME,
      retry: false,
    })),
  });
  const fetchedShots = new Map(
    uncovered.map((category, index) => [category.id, fetched[index]?.data ?? []]),
  );
  const loading = new Set(
    uncovered.filter((_, index) => fetched[index]?.isPending).map((category) => category.id),
  );
  const ar = locale === "ar";

  return (
    <section className="sf-category-children cc" aria-labelledby="category-children-title">
      <header className="cc__header">
        <div>
          <p className="label-xs text-gold">{ar ? "اكتشفي الأقسام" : "Explore the range"}</p>
          <h2 id="category-children-title">{ar ? "تسوّقي حسب الفئة" : "Shop by category"}</h2>
        </div>
        {categories.length > 1 ? (
          <p className="cc__summary">
            {ar ? `${categories.length} أقسام` : `${categories.length} collections`}
          </p>
        ) : null}
      </header>

      <div className="cc__grid">
        {categories.map((category) => {
          const shots = (
            pageShots.get(category.id)?.length
              ? pageShots.get(category.id)!
              : (fetchedShots.get(category.id) ?? [])
          ).slice(0, MAX_SHOTS);
          return (
            <Link
              key={category.id}
              to="/categories/$slug"
              params={{ slug: category.slug }}
              className="cc-card"
            >
              <span
                className="cc-card__stage"
                data-shots={category.imageUrl ? undefined : shots.length}
                data-loading={loading.has(category.id) || undefined}
                aria-hidden="true"
              >
                {category.imageUrl ? (
                  <PolishedImage
                    src={category.imageUrl}
                    alt=""
                    width={480}
                    height={360}
                    loading="lazy"
                    sizes="(min-width: 1100px) 300px, (min-width: 760px) 33vw, 50vw"
                    wrapperClassName="cc-card__cover"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  shots.map((url, index) => (
                    <span key={url} className={`cc-card__shot cc-card__shot--${index}`}>
                      <img src={url} alt="" loading="lazy" decoding="async" />
                    </span>
                  ))
                )}
              </span>
              <span className="cc-card__body">
                <span>
                  <strong dir="auto">{category.name}</strong>
                  <small>{productCountLabel(category.productCount, locale)}</small>
                </span>
                <span className="cc-card__arrow" aria-hidden="true">
                  <ArrowUpRight />
                </span>
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

function shotsFromProducts(categories: CategoryChild[], products: Product[]) {
  const ids = new Set(categories.map((category) => category.id));
  const shots = new Map<string, string[]>();
  for (const product of products) {
    // Only real product photography; mapProduct substitutes stock imagery otherwise.
    if (!product.gallery.length) continue;
    const url = product.gallery.includes(product.image) ? product.image : product.gallery[0]!;
    for (const id of product.categoryIds ?? [product.categoryId]) {
      if (!id || !ids.has(id)) continue;
      const list = shots.get(id) ?? [];
      if (list.length < MAX_SHOTS && !list.includes(url)) list.push(url);
      shots.set(id, list);
    }
  }
  return shots;
}

function productCountLabel(count: number, locale: "ar" | "en") {
  if (locale === "ar") return `${count} منتج`;
  return count === 1 ? "1 product" : `${count} products`;
}
