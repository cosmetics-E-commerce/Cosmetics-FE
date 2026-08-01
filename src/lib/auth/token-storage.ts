import type { AuthTokens } from '@contracts/auth/auth.schema';

const ACCESS_TOKEN_KEY = 'cosmetics.accessToken';
const REFRESH_TOKEN_KEY = 'cosmetics.refreshToken';
const EXPIRES_AT_KEY = 'cosmetics.expiresAt';

export const authTokenStorage = {
  getAccessToken() {
    if (typeof window === 'undefined') return null;
    return window.localStorage.getItem(ACCESS_TOKEN_KEY);
  },

  getRefreshToken() {
    if (typeof window === 'undefined') return null;
    return window.localStorage.getItem(REFRESH_TOKEN_KEY);
  },

  setTokens(tokens: AuthTokens) {
    if (typeof window === 'undefined') return;

    window.localStorage.setItem(ACCESS_TOKEN_KEY, tokens.accessToken);
    window.localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken);
    window.localStorage.setItem(EXPIRES_AT_KEY, String(Date.now() + tokens.expiresIn * 1000));
  },

  clear() {
    if (typeof window === 'undefined') return;

    window.localStorage.removeItem(ACCESS_TOKEN_KEY);
    window.localStorage.removeItem(REFRESH_TOKEN_KEY);
    window.localStorage.removeItem(EXPIRES_AT_KEY);
  },
};
