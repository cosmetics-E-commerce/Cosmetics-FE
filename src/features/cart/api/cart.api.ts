import {
  addCartItemSchema,
  cartSchema,
  updateCartItemSchema,
  type AddCartItemInput,
  type CartResponse,
  type UpdateCartItemInput,
} from '@cosmetics/contracts';

import { request } from '@/lib/http/client';

const GUEST_CART_ID_KEY = 'cosmetics.guestCartId';

export const cartQueryKey = ['cart'] as const;

export function getCart() {
  return requestCart({
    method: 'GET',
    url: '/cart',
  });
}

export function addCartItem(input: AddCartItemInput) {
  return requestCart({
    method: 'POST',
    url: '/cart/items',
    data: addCartItemSchema.parse(input),
  });
}

export function updateCartItem(variantId: string, input: UpdateCartItemInput) {
  return requestCart({
    method: 'PATCH',
    url: `/cart/items/${variantId}`,
    data: updateCartItemSchema.parse(input),
  });
}

export function removeCartItem(variantId: string) {
  return requestCart({
    method: 'DELETE',
    url: `/cart/items/${variantId}`,
  });
}

export function clearCart() {
  return requestCart({
    method: 'DELETE',
    url: '/cart',
  });
}

async function requestCart(config: Parameters<typeof request<CartResponse>>[0]) {
  const cart = await request<CartResponse>({
    ...config,
    headers: {
      ...(config.headers ?? {}),
      'X-Cart-Id': getOrCreateGuestCartId(),
    },
  });

  return cartSchema.parse(cart);
}

function getOrCreateGuestCartId() {
  if (typeof window === 'undefined') return '00000000-0000-4000-8000-000000000000';

  const existing = window.localStorage.getItem(GUEST_CART_ID_KEY);
  if (existing) return existing;

  const next = crypto.randomUUID();
  window.localStorage.setItem(GUEST_CART_ID_KEY, next);
  return next;
}
