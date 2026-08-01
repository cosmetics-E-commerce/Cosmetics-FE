'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useEffect, useState, type ReactNode } from 'react';

import { getCurrentAuthUser } from '@/features/auth/api/auth.api';
import { makeQueryClient } from '@/lib/query/query-client';
import { authTokenStorage } from '@/lib/auth/token-storage';
import { useAuthStore } from '@/stores/auth-store';

export function AppProviders({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => makeQueryClient());
  const setUser = useAuthStore((state) => state.setUser);
  const markHydrated = useAuthStore((state) => state.markHydrated);

  useEffect(() => {
    if (!authTokenStorage.getAccessToken()) {
      markHydrated();
      return;
    }

    getCurrentAuthUser()
      .then((user) => setUser(user))
      .catch(() => {
        authTokenStorage.clear();
        setUser(null);
      });
  }, [markHydrated, setUser]);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
