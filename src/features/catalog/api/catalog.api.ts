import type {
  PublicCategoryResponse,
  PublicProductResponse,
} from '@cosmetics/contracts';

import { request } from '@/lib/http/client';

type MaybePaginated<T> = T[] | { items?: T[]; data?: T[] };

export async function listPublicProducts() {
  const response = await request<MaybePaginated<PublicProductResponse>>({
    method: 'GET',
    url: '/products',
  });

  return normalizeList(response);
}

export async function listPublicCategories() {
  const response = await request<MaybePaginated<PublicCategoryResponse>>({
    method: 'GET',
    url: '/categories',
  });

  return normalizeList(response);
}

function normalizeList<T>(value: MaybePaginated<T>) {
  if (Array.isArray(value)) return value;
  return value.items ?? value.data ?? [];
}
