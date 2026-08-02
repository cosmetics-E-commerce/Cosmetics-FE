'use client';

import { create } from 'zustand';

import type { AuthSession, AuthUser } from '@cosmetics/contracts';
import { authTokenStorage } from '@/lib/auth/token-storage';

type AuthState = {
  user: AuthUser | null;
  hydrated: boolean;
  setSession: (session: AuthSession) => void;
  setUser: (user: AuthUser | null) => void;
  logout: () => void;
  markHydrated: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  hydrated: false,
  setSession: (session) => {
    authTokenStorage.setSession(session);
    set({ user: session.user, hydrated: true });
  },
  setUser: (user) => set({ user, hydrated: true }),
  logout: () => {
    authTokenStorage.clear();
    set({ user: null, hydrated: true });
  },
  markHydrated: () => set({ hydrated: true }),
}));
