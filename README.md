# Cosmetics-FE

Frontend workspace for the cosmetics e-commerce platform. This repository is
currently a **structure-only foundation**: no Vite package, dependencies, or
application code have been generated yet.

Read [`../PROJECT_CONTEXT.md`](../PROJECT_CONTEXT.md) before implementation and
use [`../Cosmetics-Docs/PLAN.md`](../Cosmetics-Docs/PLAN.md) for the full product
and architecture proposal.

## Intended stack

- React + TypeScript + Vite
- React Router with lazy storefront/admin route groups
- TanStack Query for server state and TanStack Table for admin tables
- Zustand only for small client-owned state such as session, locale, and cart UI
- React Hook Form consuming the backend-owned Zod contracts
- Tailwind CSS + editable shadcn/ui primitives
- i18next/react-i18next, Arabic first, English fallback, RTL at the document root
- Axios with refresh coordination and per-attempt idempotency keys
- Vitest + React Testing Library + MSW; Playwright for end-to-end coverage

Versions must be chosen when the app is scaffolded. Do not assume versions in
the 2026 plan still match the current ecosystem without checking compatibility.

## Structure

```text
Cosmetics-FE/
├── public/
│   ├── images/                  static public images only
│   └── locales/{ar,en}/         translation resources
├── src/
│   ├── app/
│   │   ├── layouts/             Storefront, Auth, Account, Dashboard shells
│   │   ├── providers/           Query, auth, ability, i18n, theme, errors
│   │   └── router/              lazy routes and auth/permission guards
│   ├── assets/{fonts,icons,images}/
│   ├── components/
│   │   ├── ui/                  low-level shadcn-style primitives
│   │   ├── common/              reusable domain-neutral composites
│   │   ├── feedback/            error, loading, empty, toast states
│   │   ├── forms/               shared form controls
│   │   └── seo/                 metadata and JSON-LD helpers
│   ├── config/                  environment, route, and nav configuration
│   ├── features/
│   │   ├── auth/                login, registration, refresh, recovery
│   │   ├── catalog/             search, product list/detail, filters
│   │   ├── cart/                guest/user cart and merge-on-login
│   │   ├── checkout/            address, payment method, review, proof upload
│   │   ├── orders/              client history and tracking
│   │   ├── account/             profile and addresses
│   │   ├── reviews/             customer review creation/editing
│   │   └── admin/               one shared, capability-gated dashboard
│   │       ├── dashboard/
│   │       ├── products/        includes variant and image management
│   │       ├── categories/
│   │       ├── brands/
│   │       ├── inventory/       batches, expiry, receive/adjust/write-off
│   │       ├── orders/
│   │       ├── payments/        manual verification queue
│   │       ├── coupons/
│   │       ├── reviews/
│   │       ├── customers/
│   │       ├── admins/          Super Admin account/permission matrix
│   │       ├── reports/
│   │       ├── settings/
│   │       └── audit/
│   ├── hooks/                   truly cross-feature React hooks
│   ├── lib/
│   │   ├── auth/                token/session primitives
│   │   ├── http/                API client, refresh queue, idempotency
│   │   ├── i18n/                locale and direction setup
│   │   ├── permissions/         CASL ability and gates
│   │   ├── query/               QueryClient and query-key helpers
│   │   ├── seo/                 canonical/hreflang/structured data
│   │   └── utils/               money, dates, exhaustive checks
│   ├── stores/                  minimal global Zustand stores
│   ├── styles/                  Tailwind entry and global direction-safe CSS
│   ├── test/{fixtures,mocks}/    shared unit/integration test support
│   └── types/                   app types and contract re-exports only
└── tests/{e2e,fixtures}/         Playwright suites and stable E2E data
```

## Dependency rules

1. `app` composes the application; it may import features and shared code.
2. A feature owns its API hooks, UI, pages, and feature-specific state.
3. Features should not reach into another feature's internals. Export a small
   public surface from that feature when cross-feature reuse is unavoidable.
4. `components`, `hooks`, and `lib` must remain domain-neutral. Domain code
   belongs under `features`.
5. Server data lives in TanStack Query. Zustand must not mirror API caches.
6. Contracts are authored once in `Cosmetics-BE/src/contracts`; the frontend
   consumes built/published output. Never copy and edit those schemas here.
7. Use logical CSS (`ms`, `me`, `ps`, `pe`, `start`, `end`) and test every
   directional icon under both RTL and LTR.
8. Admin visibility is capability-driven at navigation, route, and element
   levels. Frontend checks improve UX; the API remains the security boundary.

## Before scaffolding

Confirm the shared-contract distribution strategy (private package versus CI
sync), the API's final versioned base URL, and auth token storage/refresh-cookie
contract. Those backend details are not implemented yet and should not be
invented independently in this repository.

