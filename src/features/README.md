# Feature conventions

Each feature is a vertical slice. Add only the folders a slice needs:

```text
feature/
├── api/          request functions, query keys, query/mutation hooks
├── components/   feature-owned UI
├── hooks/        feature orchestration hooks
├── pages/        route-level components
├── store.ts      optional ephemeral client state only
├── types.ts      feature-only types not supplied by shared contracts
└── index.ts      deliberately small public API
```

Do not create all of these mechanically. Keep code close to its only consumer,
then extract after a real reuse boundary appears.

The `admin` tree is one dashboard for both `ADMIN` and `SUPER_ADMIN`. Never fork
it by role. Filter navigation, routes, and controls using permission keys from
`/auth/me`; retain server-side permission enforcement for every action.

