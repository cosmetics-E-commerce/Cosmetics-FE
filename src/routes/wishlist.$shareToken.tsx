import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Globe2, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PolishedImage } from "@/components/ui/polished-image";
import { getSharedWishlist } from "@/lib/api";
import { mapProduct } from "@/lib/catalog";
import { formatPrice } from "@/lib/products";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/wishlist/$shareToken")({
  head: () => ({ meta: [{ title: "Shared wishlist | BIOREZA" }] }),
  component: SharedWishlistPage,
});

function SharedWishlistPage() {
  const { shareToken } = Route.useParams();
  const { locale } = useStore();
  const ar = locale === "ar";
  const query = useQuery({
    queryKey: ["shared-wishlist", shareToken],
    queryFn: () => getSharedWishlist(shareToken),
    retry: false,
  });
  if (query.isLoading)
    return (
      <div className="shared-wishlist-loading">
        <span />
        <span />
        <span />
      </div>
    );
  if (!query.data || query.isError) {
    return (
      <main className="shared-wishlist-error">
        <Heart aria-hidden="true" />
        <h1>{ar ? "هذه القائمة غير متاحة" : "This collection is unavailable"}</h1>
        <p>
          {ar
            ? "ربما أصبحت خاصة أو تم حذفها."
            : "It may have been made private or removed by its owner."}
        </p>
        <Button asChild variant="solid" size="pill">
          <Link to="/shop">{ar ? "تصفح المنتجات" : "Explore products"}</Link>
        </Button>
      </main>
    );
  }
  const { owner, collection } = query.data;
  return (
    <main className="shared-wishlist-page">
      <header className="shared-wishlist-hero">
        <div>
          <span>
            <Globe2 aria-hidden="true" />
            {ar ? "قائمة عامة" : "Public collection"}
          </span>
          <p>{ar ? `اختيارات ${owner.firstName}` : `${owner.firstName}'s edit`}</p>
          <h1>{collection.name}</h1>
        </div>
        <dl>
          <div>
            <dt>{ar ? "المنتجات" : "Pieces"}</dt>
            <dd>{String(collection.totalItems).padStart(2, "0")}</dd>
          </div>
          <div>
            <dt>{ar ? "آخر تحديث" : "Updated"}</dt>
            <dd>
              {new Intl.DateTimeFormat(ar ? "ar-EG" : "en-EG", {
                month: "short",
                day: "numeric",
              }).format(new Date(collection.updatedAt))}
            </dd>
          </div>
        </dl>
      </header>
      {collection.items.length ? (
        <ol className="shared-wishlist-grid">
          {collection.items.map((item, index) => {
            const product = mapProduct(item.product, locale);
            return (
              <li key={item.id}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <Link
                  to="/product/$slug"
                  params={{ slug: product.slug }}
                  className="shared-wishlist-grid__media"
                >
                  <PolishedImage
                    src={product.image}
                    alt={product.name}
                    className="size-full object-cover"
                  />
                </Link>
                <div>
                  <p>{product.type}</p>
                  <h2>
                    <Link to="/product/$slug" params={{ slug: product.slug }}>
                      {product.name}
                    </Link>
                  </h2>
                  <strong>{formatPrice(product.price)}</strong>
                  <Link
                    to="/product/$slug"
                    params={{ slug: product.slug }}
                    className="shared-wishlist-grid__open"
                  >
                    {ar ? "عرض المنتج" : "View product"}
                    <ArrowRight aria-hidden="true" />
                  </Link>
                </div>
              </li>
            );
          })}
        </ol>
      ) : (
        <div className="shared-wishlist-empty">
          <Heart />
          <h2>{ar ? "لا توجد منتجات بعد" : "Nothing has been added yet"}</h2>
        </div>
      )}
    </main>
  );
}
