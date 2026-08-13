import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";
import { siteOrigin } from "./lib/seo";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

function canonicalRedirect(request: Request) {
  if (request.method !== "GET" && request.method !== "HEAD") return null;
  const incoming = new URL(request.url);
  let changed = false;

  if (incoming.pathname.length > 1 && incoming.pathname.endsWith("/")) {
    incoming.pathname = incoming.pathname.replace(/\/+$/, "");
    changed = true;
  }

  const enforceOrigin =
    (import.meta.env["VITE_ENFORCE_CANONICAL_HOST"] as string | undefined) === "true";
  if (enforceOrigin) {
    const canonical = new URL(siteOrigin());
    if (incoming.protocol !== canonical.protocol || incoming.host !== canonical.host) {
      incoming.protocol = canonical.protocol;
      incoming.host = canonical.host;
      changed = true;
    }
  }

  return changed
    ? new Response(null, {
        status: 308,
        headers: {
          Location: incoming.toString(),
          "Cache-Control": "public, max-age=3600",
        },
      })
    : null;
}

function applyResponsePolicy(request: Request, response: Response) {
  const url = new URL(request.url);
  const headers = new Headers(response.headers);
  const contentType = headers.get("content-type") ?? "";
  const privatePath =
    /^\/(?:account|cart|checkout|forgot-password|login|order-confirmed|register|sign-in|verify-email|wishlist)(?:\/|$)/.test(
      url.pathname,
    );
  const noisyCatalog =
    url.pathname === "/shop" &&
    ["brand", "category", "concern", "search", "sort", "view"].some((key) =>
      url.searchParams.has(key),
    );

  if (privatePath || response.status >= 400) {
    headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  } else if (noisyCatalog) {
    headers.set("X-Robots-Tag", "noindex, follow");
  }

  if (contentType.includes("text/html")) {
    headers.set("Content-Language", url.searchParams.get("lang") === "ar" ? "ar" : "en");
    if (privatePath) {
      headers.set("Cache-Control", "private, no-store");
    } else if (response.status >= 400) {
      headers.set("Cache-Control", "public, max-age=0, s-maxage=60");
    } else if (
      /^\/(?:privacy|terms|returns|shipping-policy|cookies|journal|contact)\/?$/.test(url.pathname)
    ) {
      headers.set(
        "Cache-Control",
        "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
      );
    } else {
      headers.set("Cache-Control", "public, max-age=0, s-maxage=60, stale-while-revalidate=300");
    }
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const redirect = canonicalRedirect(request);
      if (redirect) return redirect;
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return applyResponsePolicy(request, await normalizeCatastrophicSsrResponse(response));
    } catch (error) {
      console.error(error);
      return applyResponsePolicy(
        request,
        new Response(renderErrorPage(), {
          status: 500,
          headers: { "content-type": "text/html; charset=utf-8" },
        }),
      );
    }
  },
};
