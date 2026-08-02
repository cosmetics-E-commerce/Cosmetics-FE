import {
  addWishlistItemSchema,
  wishlistSchema,
  type AddWishlistItemInput,
  type WishlistResponse,
} from '@cosmetics/contracts';

import { request } from '@/lib/http/client';

export const wishlistQueryKey = ['wishlist'] as const;

export async function getWishlist(): Promise<WishlistResponse> {
  const response = await request<unknown>({
    method: 'GET',
    url: '/wishlist',
  });

  return wishlistSchema.parse(response);
}

export async function addWishlistItem(input: AddWishlistItemInput): Promise<WishlistResponse> {
  const response = await request<unknown>({
    method: 'POST',
    url: '/wishlist/items',
    data: addWishlistItemSchema.parse(input),
  });

  return wishlistSchema.parse(response);
}

export async function removeWishlistItem(productId: string): Promise<WishlistResponse> {
  const response = await request<unknown>({
    method: 'DELETE',
    url: `/wishlist/items/${productId}`,
  });

  return wishlistSchema.parse(response);
}

export async function clearWishlist(): Promise<WishlistResponse> {
  const response = await request<unknown>({
    method: 'DELETE',
    url: '/wishlist',
  });

  return wishlistSchema.parse(response);
}
