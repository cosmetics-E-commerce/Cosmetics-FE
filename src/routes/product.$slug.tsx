import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Heart, Minus, Plus, RotateCcw, Truck } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { PolishedImage } from "@/components/ui/polished-image";
import { IngredientExplorer } from "@/components/shop/IngredientExplorer";
import { formatPrice } from "@/lib/products";
import { useProduct } from "@/lib/catalog";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/product/$slug")({
  head: () => ({ meta: [{ title: "Product — BIOREZA Cosmetics" }] }),
  component: ProductPage,
});

function ProductPage() {
  const { slug } = Route.useParams();
  const { locale, add, wishlist, toggleWish, pendingVariants } = useStore();
  const query = useProduct(slug, locale);
  const product = query.data;
  const [variantIndex, setVariantIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    setVariantIndex(0);
    setImageIndex(0);
  }, [slug]);

  if (query.isLoading) {
    return (
      <div className="mx-auto min-h-[70vh] max-w-[1560px] px-5 py-14 md:px-10">
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="aspect-[4/5] animate-pulse bg-stone" />
          <div className="space-y-6 pt-10">
            <div className="h-4 w-28 animate-pulse bg-stone" />
            <div className="h-14 w-3/4 animate-pulse bg-stone" />
            <div className="h-24 animate-pulse bg-stone" />
          </div>
        </div>
      </div>
    );
  }

  if (!product || query.error) {
    return (
      <div className="mx-auto max-w-xl px-5 py-28 text-center">
        <h1 className="font-serif text-4xl">Product unavailable</h1>
        <p className="mt-4 text-muted-foreground">
          This product may be unpublished or the store API may be offline.
        </p>
        <Button asChild variant="line" size="pill" className="mt-8">
          <Link to="/shop">Return to shop</Link>
        </Button>
      </div>
    );
  }

  const variant = product.sizes[variantIndex] ?? product.sizes[0];
  const variantStock = variant?.stock;
  const outOfStock = variantStock === 0;
  const lowStock = variantStock !== undefined && variantStock > 0 && variantStock < 10;
  const wished = wishlist.includes(product.slug);
  const adding = Boolean(variant?.id && pendingVariants.includes(variant.id));
  const activeImage = product.gallery[imageIndex] ?? product.image;

  const addToBag = () => {
    if (!variant?.id || outOfStock) return;
    void add({
      variantId: variant.id,
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: product.image,
      size: variant.label,
      price: variant.price,
      qty: quantity,
    });
  };

  return (
    <div>
      <div className="mx-auto max-w-[1560px] px-5 py-10 md:px-10">
        <nav className="label-xs text-taupe" aria-label="Breadcrumb">
          <Link to="/">Home</Link> / <Link to="/shop">Shop</Link> / {product.name}
        </nav>

        <div className="mt-10 grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <div className="grid gap-5 md:grid-cols-[84px_1fr]">
            <div className="no-scrollbar order-2 flex gap-3 overflow-x-auto md:order-1 md:flex-col">
              {product.gallery.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  onClick={() => setImageIndex(index)}
                  aria-label={`View product image ${index + 1}`}
                  aria-current={imageIndex === index}
                  className={`shrink-0 border transition-colors duration-200 ${
                    imageIndex === index ? "border-gold" : "border-border hover:border-taupe"
                  }`}
                >
                  <PolishedImage
                    src={image}
                    alt=""
                    loading="lazy"
                    wrapperClassName="aspect-[3/4] w-20"
                    className="size-full object-cover"
                  />
                </button>
              ))}
            </div>
            <div key={activeImage} className="order-1 bg-ivory md:order-2">
              <PolishedImage
                src={activeImage}
                alt={product.name}
                fetchPriority="high"
                wrapperClassName="aspect-[4/5] w-full"
                className="size-full object-cover"
              />
            </div>
          </div>

          <div className="lg:pt-6">
            <p className="label-xs text-gold">BIOREZA · {product.type}</p>
            <h1 className="display mt-5 text-[clamp(2.2rem,4vw,3.4rem)]">{product.name}</h1>
            <p className="mt-7 max-w-md leading-relaxed text-muted-foreground">
              {product.description}
            </p>
            <div
              key={variant?.price}
              className="count-change mt-8 flex flex-wrap items-baseline gap-3"
            >
              <p className="font-serif text-3xl text-gold">
                {formatPrice(variant?.price ?? product.price)}
              </p>
              {variant?.originalPrice && variant.originalPrice > variant.price && (
                <>
                  <p className="font-serif text-xl text-taupe line-through">
                    {formatPrice(variant.originalPrice)}
                  </p>
                  <span className="label-xs border border-gold px-2 py-1 text-gold">
                    Save {Math.round((1 - variant.price / variant.originalPrice) * 100)}%
                  </span>
                </>
              )}
            </div>
            {variant?.promotionTitle && (
              <p className="mt-4 border-s-2 border-gold bg-ivory px-4 py-3 text-sm">
                <strong>{variant.promotionTitle}</strong>
                <span className="mt-1 block text-muted-foreground">
                  Applied automatically in your bag while eligible.
                </span>
              </p>
            )}
            {outOfStock && (
              <p className="label-xs mt-4 inline-flex border border-red-300 bg-red-50 px-3 py-2 text-red-700">
                Out of stock
              </p>
            )}
            {lowStock && (
              <p className="label-xs mt-4 inline-flex border border-amber-300 bg-amber-50 px-3 py-2 text-amber-800">
                Low stock · {variantStock} remaining
              </p>
            )}

            <fieldset className="mt-10">
              <legend className="label-xs text-taupe">Variant</legend>
              <div className="mt-4 flex flex-wrap gap-3">
                {product.sizes.map((item, index) => (
                  <button
                    key={item.id ?? item.label}
                    type="button"
                    onClick={() => {
                      setVariantIndex(index);
                      setQuantity(1);
                    }}
                    aria-pressed={variantIndex === index}
                    className={`label-xs min-h-11 border px-5 transition-[border-color,color,background-color] duration-200 ${
                      variantIndex === index
                        ? "border-gold text-gold"
                        : "border-border hover:border-taupe"
                    }`}
                  >
                    {item.shadeHex && (
                      <span
                        className="me-2 inline-block size-3 rounded-full border"
                        style={{ backgroundColor: item.shadeHex ?? undefined }}
                        aria-hidden="true"
                      />
                    )}
                    {item.label}
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <div className="flex items-center border border-border">
                <button
                  type="button"
                  disabled={outOfStock}
                  onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                  aria-label="Decrease quantity"
                  className="grid size-12 place-items-center text-taupe hover:text-gold disabled:cursor-not-allowed disabled:opacity-35"
                >
                  <Minus className="size-4" />
                </button>
                <span key={quantity} className="count-change w-10 text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  disabled={outOfStock}
                  onClick={() => setQuantity((value) => Math.min(variantStock ?? 99, value + 1))}
                  aria-label="Increase quantity"
                  className="grid size-12 place-items-center text-taupe hover:text-gold disabled:cursor-not-allowed disabled:opacity-35"
                >
                  <Plus className="size-4" />
                </button>
              </div>
              <Button
                variant="solid"
                size="pill"
                className="min-w-[220px] flex-1"
                disabled={!variant?.id || outOfStock}
                loading={adding}
                onClick={addToBag}
              >
                {outOfStock ? "Out of stock" : "Add to bag"}
              </Button>
              {product.id && (
                <button
                  type="button"
                  onClick={() => void toggleWish(product.id!, product.slug)}
                  className="grid size-12 place-items-center border border-border text-taupe transition-[border-color,color,transform] duration-200 hover:border-gold hover:text-gold active:scale-95"
                  aria-pressed={wished}
                  aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
                >
                  <Heart className={wished ? "pop fill-gold text-gold" : ""} />
                </button>
              )}
            </div>

            <ul className="mt-8 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-3">
                <Check className="size-4 text-gold" />
                Live catalog item
              </li>
              <li className="flex items-center gap-3">
                <Truck className="size-4 text-gold" />
                Delivery calculated for your Egyptian address
              </li>
              <li className="flex items-center gap-3">
                <RotateCcw className="size-4 text-gold" />
                Cash on delivery and manual transfer available
              </li>
            </ul>

            <Accordion type="single" collapsible className="mt-12 border-t border-border">
              {[
                ["Product details", product.details],
                ["Ingredients", product.ingredients],
                ["How to use", product.howToUse],
              ].map(([title, content]) => (
                <AccordionItem key={title} value={title ?? "details"}>
                  <AccordionTrigger>{title}</AccordionTrigger>
                  <AccordionContent className="leading-relaxed text-muted-foreground">
                    {title === "Ingredients" ? (
                      <IngredientExplorer
                        ingredients={product.ingredientDetails}
                        fallback={content}
                      />
                    ) : (
                      content
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-warm-white/95 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-sm lg:hidden">
        <div className="mx-auto flex max-w-lg items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate font-serif text-lg">{product.name}</p>
            <p className="font-serif text-gold">
              {formatPrice(variant?.price ?? product.price)}
              {variant?.originalPrice && variant.originalPrice > variant.price && (
                <span className="ms-2 text-sm text-taupe line-through">
                  {formatPrice(variant.originalPrice)}
                </span>
              )}
            </p>
          </div>
          <Button
            variant="solid"
            size="pill"
            className="h-12 shrink-0 px-6"
            loading={adding}
            disabled={!variant?.id || outOfStock}
            onClick={addToBag}
          >
            {outOfStock ? "Out of stock" : "Add to bag"}
          </Button>
        </div>
      </div>
    </div>
  );
}
