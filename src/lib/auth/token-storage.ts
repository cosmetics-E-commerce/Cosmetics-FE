import type { AuthSession, AuthTokens } from '@cosmetics/contracts';

const CSRF_TOKEN_KEY = 'cosmetics.csrfToken';
let accessToken: string | null = null;

/**
 * The access token is intentionally memory-only. The rotating refresh token is
 * never exposed to JavaScript; it is transported by the backend's HttpOnly
 * cookie. Only the double-submit CSRF value survives a page reload.
 */
export const authTokenStorage = {
  getAccessToken() {
    return accessToken;
  },

  getCsrfToken() {
    if (typeof window === 'undefined') return null;
    return window.localStorage.getItem(CSRF_TOKEN_KEY);
  },

  setSession(session: AuthSession) {
    accessToken = session.tokens.accessToken;
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(CSRF_TOKEN_KEY, session.csrfToken);
    }
  },

  setTokens(tokens: AuthTokens) {
    accessToken = tokens.accessToken;
  },

  clear() {
    accessToken = null;
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(CSRF_TOKEN_KEY);
    }
  },
};
