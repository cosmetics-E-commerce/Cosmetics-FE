#!/usr/bin/env bash
set -Eeuo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"
PLAYWRIGHT_VERSION="$(node -p "require('${PROJECT_DIR}/node_modules/@playwright/test/package.json').version")"
IMAGE="mcr.microsoft.com/playwright:v${PLAYWRIGHT_VERSION}-noble"

docker image inspect "${IMAGE}" >/dev/null 2>&1 || docker pull "${IMAGE}"

exec docker run --rm --init --ipc=host --network=host \
  --user "$(id -u):$(id -g)" \
  --env HOME=/tmp \
  --env CI="${CI:-true}" \
  --volume "${PROJECT_DIR}:/work" \
  --workdir /work \
  "${IMAGE}" \
  bash -lc './node_modules/.bin/playwright test --project=webkit --project=mobile-webkit "$@"' playwright "$@"
