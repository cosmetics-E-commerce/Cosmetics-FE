import type { AuthSession } from '@cosmetics/contracts';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { authTokenStorage } from './token-storage';

describe('storefront token storage', () => {
  afterEach(() => {
    authTokenStorage.clear();
    vi.unstubAllGlobals();
  });

  it('keeps the access token in memory and persists only the CSRF value', () => {
    const stored = new Map<string, string>();
    vi.stubGlobal('window', {
      localStorage: {
        getItem: (key: string) => stored.get(key) ?? null,
        setItem: (key: string, value: string) => stored.set(key, value),
        removeItem: (key: string) => stored.delete(key),
      },
    });

    const session: AuthSession = {
      user: {
        id: '14cf9f4c-f5bd-46f2-9e67-ddf7bc71bd40',
        firstName: 'Sara',
        lastName: 'Ahmed',
        phone: '01012345678',
        email: 'sara@example.com',
        role: 'CLIENT',
        permissions: [],
      },
      tokens: { accessToken: 'access-token', expiresIn: 900 },
      csrfToken: 'csrf-token-at-least-32-characters-long',
    };

    authTokenStorage.setSession(session);

    expect(authTokenStorage.getAccessToken()).toBe('access-token');
    expect(authTokenStorage.getCsrfToken()).toBe(session.csrfToken);
    expect([...stored.values()]).toEqual([session.csrfToken]);
  });
});
