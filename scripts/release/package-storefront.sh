#!/usr/bin/env bash
#
# Build and package the storefront for the native PM2 server
# (cosmetics_platform/deploy/native). Runs in CI on the server's OS, CPU
# architecture and Node version.
#
#   scripts/release/package-storefront.sh <output-dir>
#
# Build-time (public) configuration, all compiled into the browser bundle —
# never put a secret behind a VITE_ prefix:
#   VITE_API_BASE_URL               required, https://<api host>/api/v1
#   VITE_SITE_URL                   required, https://<site host>
#   VITE_MEDIA_BASE_URL             optional
#   VITE_ENFORCE_CANONICAL_HOST     optional, default false
#   VITE_GOOGLE_SITE_VERIFICATION   optional
#   VITE_BING_SITE_VERIFICATION     optional
#
# Produces <output-dir>/storefront-<sha>.tar.gz (+ .sha256) holding .output/,
# ecosystem.config.cjs and BUILD_INFO.json. The server checks BUILD_INFO's
# URLs against its configured domains before activating the release.

set -Eeuo pipefail

out="${1:?usage: package-storefront.sh <output-dir>}"
root="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$root"

sha="${GITHUB_SHA:-$(git rev-parse HEAD)}"
[[ "$sha" =~ ^[0-9a-f]{40}$ ]] || { echo "not a commit sha: $sha" >&2; exit 1; }

fail() { echo "error: $*" >&2; exit 1; }
[[ "${VITE_API_BASE_URL:-}" =~ ^https://[a-z0-9.-]+/api/v1$ ]] ||
  fail "VITE_API_BASE_URL must be https://<api host>/api/v1 (got '${VITE_API_BASE_URL:-}')"
[[ "${VITE_SITE_URL:-}" =~ ^https://[a-z0-9.-]+$ ]] ||
  fail "VITE_SITE_URL must be https://<site host> without a trailing slash (got '${VITE_SITE_URL:-}')"
[[ -z "${VITE_MEDIA_BASE_URL:-}" || "$VITE_MEDIA_BASE_URL" =~ ^https:// ]] ||
  fail "VITE_MEDIA_BASE_URL must be https"
[[ "${VITE_ENFORCE_CANONICAL_HOST:-false}" =~ ^(true|false)$ ]] ||
  fail "VITE_ENFORCE_CANONICAL_HOST must be true or false"

echo "==> Building (Nitro node-server)"
rm -rf .output
# NODE_ENV=production for the build only; the VITE_* values above are the
# whole of the configuration the bundle sees.
NITRO_PRESET=node-server NODE_ENV=production pnpm build
[[ -f .output/server/index.mjs ]] || fail ".output/server/index.mjs missing — was the node-server preset applied?"
[[ -d .output/public ]] || fail ".output/public missing"
grep -rqs "wrangler\|cloudflare" .output/nitro.json && fail ".output is a Cloudflare build, not node-server"

work="$(mktemp -d)"
trap 'rm -rf "$work"' EXIT
stage="$work/storefront"
mkdir -p "$stage" "$out"
cp -R .output "$stage/.output"
cp ecosystem.config.cjs "$stage/"

libc=""
if command -v ldd >/dev/null; then libc="$(ldd --version 2>&1 | head -n 1)"; fi
node -e '
  const [sha, ref, libc] = process.argv.slice(1);
  const e = process.env;
  process.stdout.write(JSON.stringify({
    component: "storefront",
    sha, ref,
    builtAt: new Date().toISOString(),
    node: process.version,
    platform: process.platform,
    arch: process.arch,
    libc,
    entry: ".output/server/index.mjs",
    apiBaseUrl: e.VITE_API_BASE_URL,
    siteUrl: e.VITE_SITE_URL,
    mediaBaseUrl: e.VITE_MEDIA_BASE_URL || null,
    run: e.GITHUB_RUN_ID ? `${e.GITHUB_SERVER_URL}/${e.GITHUB_REPOSITORY}/actions/runs/${e.GITHUB_RUN_ID}` : null,
  }, null, 2) + "\n");
' "$sha" "${GITHUB_REF_NAME:-local}" "$libc" >"$stage/BUILD_INFO.json"

leaks="$(find "$stage" -path "$stage/.output/server/node_modules" -prune -o \
  \( -name '.env' -o -name '.env.*' -o -name '.dev.vars' -o -name '*.pem' -o -name '*.key' \) -print)"
[[ -z "$leaks" ]] || fail "refusing to package secret-like files: $leaks"

tarball="$out/storefront-$sha.tar.gz"
tar -C "$stage" -czf "$tarball" .
(cd "$out" && sha256sum "storefront-$sha.tar.gz" >"storefront-$sha.tar.gz.sha256")
du -h "$tarball"
