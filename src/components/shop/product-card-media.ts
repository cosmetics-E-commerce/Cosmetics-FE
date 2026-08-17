import type { Product } from "@/lib/products";

export type ProductCardImages = {
  primary: string;
  secondary: string | null;
};

/**
 * Product records can mix a legacy primary image with uploaded, storage-key,
 * and external gallery references. The API/catalog layer resolves those
 * references; the card only removes empty and duplicate renderable values.
 */
export function selectProductCardImages(
  product: Pick<Product, "image" | "gallery">,
): ProductCardImages {
  const uniqueImages: string[] = [];
  const seen = new Set<string>();

  for (const candidate of [product.image, ...product.gallery]) {
    const image = candidate?.trim();
    if (!image || seen.has(image)) continue;
    seen.add(image);
    uniqueImages.push(image);
  }

  return {
    primary: uniqueImages[0] ?? "",
    secondary: uniqueImages[1] ?? null,
  };
}
