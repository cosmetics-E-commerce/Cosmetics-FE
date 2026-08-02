'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useEffect, useState, type ReactNode } from 'react';

import { makeQueryClient } from '@/lib/query/query-client';
import { authTokenStorage } from '@/lib/auth/token-storage';
import { bootstrapAuthSession } from '@/lib/http/client';
import { useAuthStore } from '@/stores/auth-store';

export function AppProviders({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => makeQueryClient());
  const setSession = useAuthStore((state) => state.setSession);
  const setUser = useAuthStore((state) => state.setUser);
  const markHydrated = useAuthStore((state) => state.markHydrated);

  useEffect(() => {
    if (!authTokenStorage.getCsrfToken()) {
      markHydrated();
      return;
    }

    bootstrapAuthSession()
      .then((session) => setSession(session))
      .catch(() => {
        authTokenStorage.clear();
        setUser(null);
      });
  }, [markHydrated, setSession, setUser]);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
