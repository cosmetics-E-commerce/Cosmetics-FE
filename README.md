# Cosmetics Storefront

Independent Next.js storefront for the cosmetics platform. The existing visual
design is intentionally kept separate from the Admin dashboard and consumes the
Nest API at `http://localhost:3000/api/v1` during local development.

## Run locally

Start the backend first, then:

```bash
corepack pnpm install --frozen-lockfile
corepack pnpm contracts:check
corepack pnpm dev
```

Open `http://localhost:5173`.

The backend development CORS configuration already permits that origin. Next's
default port `3000` must not be used locally because Nest owns it.

## Commands

```bash
pnpm dev
pnpm typecheck
pnpm lint
pnpm test
pnpm build
pnpm contracts:sync
pnpm contracts:check
```

## Authentication boundary

- Client login and registration use `/auth/*`; Admin sessions are rejected.
- The access token is memory-only.
- The rotating refresh token is a backend-managed HttpOnly cookie and is never
  placed in local storage or request bodies.
- The returned CSRF value is persisted per storefront origin and echoed as
  `X-CSRF-Token` for refresh/logout.
- Axios sends credentials, and concurrent `401` responses share one refresh.
- Session bootstrap rotates the existing refresh cookie after a page reload.

## Shared contracts

`@cosmetics/contracts` is generated from `../Cosmetics-BE/src/contracts` into
`vendor/cosmetics-contracts`. Schemas are authored only in the backend.

Run `pnpm contracts:sync` after backend contract changes. CI should use
`pnpm contracts:check` to reject stale artifacts.

## Current implemented screens

- Storefront home and catalogue placeholders.
- Client login and registration with email OTP verification.
- Forgot-password flow with email/SMS selection, OTP verification, confirmed
  new password, and return to login.
- Session bootstrap and logout.
- Client profile display and authenticated password change with current-password
  proof, email/SMS OTP, forced session revocation, and return to login.
- Address list, create, edit, delete, and set-default flows in both profile and
  checkout. Governorate and city/district selections use `egydata`; area,
  building, landmark, and delivery instructions are persisted by the API.
- Arabic/RTL document setup with optional English/LTR selection through
  `NEXT_PUBLIC_DEFAULT_LOCALE=en`.

Catalog, category, cart, order, and payment API implementations are still
backend roadmap work. Checkout currently manages its saved delivery address;
order submission is not yet mounted in the backend.
