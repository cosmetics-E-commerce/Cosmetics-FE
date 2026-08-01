# Library boundaries

This directory contains application-wide infrastructure, not feature business
logic. Keep these invariants visible during implementation:

- `http`: unwrap the backend `{ success, data, meta? }` envelope, normalize the
  documented error body, coordinate one access-token refresh, and attach one
  UUID per logical idempotent mutation attempt. Network retries reuse that UUID.
- `permissions`: rebuild the CASL ability from `/auth/me`; Super Admin receives
  the wildcard and Admin receives only resolved `resource:action` grants.
- `i18n`: Arabic is primary, English is fallback, and locale changes update
  `document.documentElement.lang` and `dir` together.
- `utils`: all API money values are integer piastres. Convert only for display
  or controlled form input; never send floating-point EGP to the API.
- `query`: query keys are factories owned by their features; global defaults
  should not blindly retry deterministic 4xx responses.

