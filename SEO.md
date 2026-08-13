# BIOREZA technical SEO operations

## Production configuration

Set `VITE_SITE_URL` to the one public HTTPS origin. The SEO engine falls back to
`https://bioreza.com` and refuses localhost as a production metadata origin. After the final DNS
and TLS setup is confirmed, set `VITE_ENFORCE_CANONICAL_HOST=true` to issue 308 redirects from
alternate host/protocol requests. The same origin feeds canonicals, Open Graph URLs, JSON-LD,
robots.txt, and every sitemap.

Set `VITE_GOOGLE_SITE_VERIFICATION` and `VITE_BING_SITE_VERIFICATION` to the public HTML verification
tokens supplied by the respective webmaster tools. Submit `/sitemap.xml` in both tools.

Set `VITE_API_BASE_URL` to the public HTTPS API endpoint. In `Cosmetics-BE`, set
`S3_PUBLIC_URL` to the public HTTPS media/CDN origin; the development value points to local MinIO
and must never be reused in production. These values keep crawlable product and brand images free
of localhost or private-network URLs.

## Indexing policy

Indexable routes:

- `/`, `/shop`, and valid `?page=N` catalog pages
- `/product/:slug`
- non-empty `/categories/:slug` and `/brands/:slug` pages, including valid pagination
- `/offers` only while active offers exist
- `/journal`, `/contact`, and the public policy pages
- the English URL and its Arabic equivalent (`?lang=ar`) independently

Intentionally noindex:

- search, sort, view, concern, and legacy category/brand query combinations on `/shop`
- cart, checkout, authentication, account, order-confirmation, and shared-wishlist URLs
- empty offers, missing products/collections, and all error responses

Robots exclusions reduce crawler noise, while HTML and `X-Robots-Tag` directives enforce the
actual indexing decision. Authentication remains the security boundary; robots.txt is not treated
as access control.

## Canonicals and languages

English uses the clean URL. Arabic uses the same route with the stable `?lang=ar` language key.
Every indexable page self-canonicalizes and emits reciprocal `en`, `ar`, and `x-default`
alternates. UI-only/filter/tracking parameters are excluded from canonicals. Paginated catalog,
category, and brand pages self-canonicalize and expose crawlable previous/next links.

The server normalizes trailing slashes with 308 redirects. Host and HTTPS normalization is guarded
by `VITE_ENFORCE_CANONICAL_HOST` so an incorrect environment value cannot redirect production
traffic accidentally.

## Sitemaps and monitoring

`/sitemap.xml` is a sitemap index. Page, category, and brand maps are separate; products are
automatically sharded at 5,000 products per child map. Each content URL includes reciprocal
English/Arabic alternates. Inventory is read through every API pagination page; no artificial
`lastmod` is published because the current public contracts do not expose trustworthy update
timestamps. Empty categories/brands and private/noindex routes are excluded.

Generation failures return 503 with `Retry-After` and are logged once by the server instead of
serving incomplete XML. Monitor sitemap endpoints for non-200 responses and alert on a sudden URL
count drop.

## Structured data

The root graph describes the real Organization and WebSite/SearchAction. Product pages use actual
catalog images, SKUs, brand, variants, prices, currency, per-variant stock, and approved reviews.
BreadcrumbList and ItemList markup mirror visible links. Category/brand pages use CollectionPage;
no ratings, biographies, sellers, dates, addresses, or local-business details are fabricated.

## Deployment checks

After deployment, inspect the raw response (not only the hydrated DOM) for `/`, `/shop`, a product,
a category, a brand, their `?lang=ar` equivalents, a bad product slug, and a filtered search URL.
Confirm response status, `Content-Language`, `X-Robots-Tag`, canonical, alternates, product links,
and JSON-LD. Validate representative JSON-LD in Google Rich Results Test and Schema.org Validator.

Ensure the edge/CDN honors the storefront's `s-maxage` and `stale-while-revalidate` directives for
anonymous public HTML. Never apply that cache rule to account, authentication, cart, checkout,
orders, shared lists, or API responses. Load-test a cold catalog crawl after deployment and tune
the backend request throttle only from measured traffic; do not weaken authentication or mutation
limits to accommodate crawler bursts.

Monitor field Core Web Vitals by template (home, catalog, product, category, and brand), because
lab measurements cannot reproduce every production device, network, CDN, and third-party script.
Alert on sitemap failures, unexpected URL-count drops, and sustained increases in 404/5xx reports.

IndexNow was intentionally not added: there is no reliable publish/update hook in the current
catalog workflow, so an endpoint alone would not provide correct notifications. Add it only when a
product lifecycle event can submit changed canonical URLs and securely retain the IndexNow key.
