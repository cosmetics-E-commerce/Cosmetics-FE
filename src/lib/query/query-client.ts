'use client';

import { QueryClient } from '@tanstack/react-query';

export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60_000,
        retry: (failureCount, error) => {
          const statusCode = typeof error === 'object' && error && 'statusCode' in error
            ? Number(error.statusCode)
            : 0;

          if (statusCode >= 400 && statusCode < 500) return false;
          return failureCount < 2;
        },
      },
      mutations: {
        retry: false,
      },
    },
  });
}
