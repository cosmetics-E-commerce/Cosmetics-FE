import type {
  PublicCategoryResponse,
  PublicProductResponse,
} from '@cosmetics/contracts';

import { request } from '@/lib/http/client';

type MaybePaginated<T> = T[] | { items?: T[]; data?: T[] };

export type PublicProductQueryParams = {
  page?: number;
  limit?: number;
  search?: string;
  categorySlug?: string;
  brandSlug?: string;
  skinType?: string | string[];
  minPrice?: number;
  maxPrice?: number;
  sortBy?: 'createdAt' | 'basePrice' | 'nameEn';
  sortOrder?: 'asc' | 'desc';
};

export type PublicCategoryQueryParams = {
  page?: number;
  limit?: number;
  search?: string;
  sortOrder?: 'asc' | 'desc';
};

export async function listPublicProducts(params: PublicProductQueryParams = {}) {
  const response = await request<MaybePaginated<PublicProductResponse>>({
    method: 'GET',
    url: '/products',
    params: cleanParams(params),
  });

  return normalizeList(response);
}

export async function listPublicCategories(params: PublicCategoryQueryParams = {}) {
  const response = await request<MaybePaginated<PublicCategoryResponse>>({
    method: 'GET',
    url: '/categories',
    params: cleanParams(params),
  });

  return normalizeList(response);
}

function normalizeList<T>(value: MaybePaginated<T>) {
  if (Array.isArray(value)) return value;
  return value.items ?? value.data ?? [];
}

function cleanParams<T extends Record<string, unknown>>(params: T) {
  return Object.fromEntries(
    Object.entries(params).filter(([, value]) => {
      if (value === undefined || value === null) return false;
      if (typeof value === 'string') return value.trim().length > 0;
      if (Array.isArray(value)) return value.length > 0;
      return true;
    }),
  );
}
