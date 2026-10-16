import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
  retainSearchParams,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useMemo, useRef, useState, type ReactNode } from "react";

import appCss from "../app.css?url";
import { StoreProvider, useSearchOpen, useStore } from "@/lib/store";
import { Header } from "@/components/layout/Header";
import { GlobalBannerSlot } from "@/components/banner/GlobalBannerSlot";
import { getInitialBanners } from "@/lib/banner-api";
import { Footer } from "@/components/layout/Footer";
import { BackToTop } from "@/components/layout/BackToTop";
import { Button } from "@/components/ui/button";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { jsonLd, organizationGraph, verificationMeta } from "@/lib/seo";
import { publishedNavigationQuery } from "@/lib/navigation";

const LazyCartDrawer = lazy(() =>
  import("@/components/shop/CartDrawer").then((module) => ({ default: module.CartDrawer })),
);
const loadSearchOverlay = () => import("@/components/layout/SearchOverlay");
const LazySearchOverlay = lazy(() =>
  loadSearchOverlay().then((module) => ({ default: module.SearchOverlay })),
);
const LazyToaster = lazy(() =>
  import("@/components/ui/sonner").then((module) => ({ default: module.Toaster })),
);
const LazyCampaignEngine = lazy(() => import("@/components/campaign/CampaignEngine"));

function NotFoundComponent() {
  return (
    <>
      <title>Page Not Found | BIOREZA Cosmetics</title>
      <meta name="robots" content="noindex,nofollow" />
      <div className="flex min-h-[70vh] items-center justify-center bg-background px-5">
        <div className="max-w-md text-center">
          <p className="label-xs text-gold">Error 404</p>
          <h1 className="display mt-5 text-[clamp(2.6rem,5vw,4rem)]">Page not found.</h1>
          <div className="rule-gold mx-auto my-8 max-w-[180px]" />
          <p className="text-sm leading-relaxed text-muted-foreground">
            The page you're looking for doesn't exist or has been moved. Let us take you back to the
            collection.
          </p>
          <div className="mt-10">
            <Button asChild variant="solid" size="pill">
              <Link to="/">Return Home</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

function ErrorComponent({ error: thrown, reset }: ErrorComponentProps) {
  // The router passes whatever was thrown; keep a stable Error for reporting.
  const error = useMemo(
    () => (thrown instanceof Error ? thrown : new Error(String(thrown))),
    [thrown],
  );
  console.error(error);
  const router = useRouter();
  const reference = uiErrorReference(error);
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <>
      <title>Page Error | BIOREZA Cosmetics</title>
      <meta name="robots" content="noindex,nofollow" />
      <div className="flex min-h-[70vh] items-center justify-center bg-background px-5">
        <div className="max-w-md text-center">
          <p className="label-xs text-gold">Page unavailable</p>
          <h1 className="display mt-5 text-[clamp(2.6rem,5vw,4rem)]">This page didn't load.</h1>
          <div className="rule-gold mx-auto my-8 max-w-[180px]" />
          <p className="text-sm leading-relaxed text-muted-foreground">
            A rendering problem prevented this page from opening. Try loading it again; if the
            problem continues, share reference {reference} with BioReza support.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button
              variant="solid"
              size="pill"
              onClick={() => {
                router.invalidate();
                reset();
              }}
            >
              Try again
            </Button>
            <Button asChild variant="quiet" size="pill">
              <Link to="/">Go home</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

function uiErrorReference(error: Error): string {
  const input = `${error.name}:${error.message}`;
  let hash = 2166136261;
  for (let index = 0; index < input.length; index += 1) {
    hash ^= input.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return `BRZ-UI-${(hash >>> 0).toString(16).toUpperCase().padStart(8, "0")}`;
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  validateSearch: (raw: Record<string, unknown>): { lang?: "ar" } =>
    raw["lang"] === "ar" ? { lang: "ar" } : {},
  search: {
    middlewares: [retainSearchParams(["lang"])],
  },
  beforeLoad: ({ search }) => ({
    locale: search.lang === "ar" ? ("ar" as const) : ("en" as const),
  }),
  loader: async ({ context, location }) => {
    const [navigation, banners] = await Promise.all([
      context.queryClient.ensureQueryData(publishedNavigationQuery()).catch(() => null),
      // Only the server render needs them: in the browser the banner slot keeps its
      // own query, and a root loader fetch would delay every client navigation.
      typeof window === "undefined"
        ? getInitialBanners(`${location.pathname}${location.searchStr || ""}`, context.locale)
        : Promise.resolve(null),
    ]);
    return { navigation, banners };
  },
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "author", content: "BIOREZA Cosmetics" },
      { name: "theme-color", content: "#f5f0e8" },
      ...verificationMeta(),
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.png", type: "image/png", sizes: "64x64" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png", sizes: "180x180" },
      { rel: "manifest", href: "/site.webmanifest" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Manrope:wght@400..700&family=Noto+Sans+Arabic:wght@400..700&family=Noto+Serif+Arabic:wght@400..700&family=Playfair+Display:wght@400..700&display=swap",
      },
    ],
    scripts: [jsonLd(organizationGraph())],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  const { locale } = Route.useRouteContext();
  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function GlobalShortcuts() {
  const { setSearchOpen } = useStore();

  useEffect(() => {
    const isTyping = (t: EventTarget | null) => {
      const el = t as HTMLElement | null;
      if (!el) return false;
      const tag = el.tagName;
      return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || el.isContentEditable;
    };

    const onKey = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSearchOpen(true);
      } else if (e.key === "/" && !isTyping(e.target)) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setSearchOpen]);

  return null;
}

function DeferredInteractiveLayers() {
  const { cartOpen } = useStore();
  const searchOpen = useSearchOpen();
  const [cartMounted, setCartMounted] = useState(cartOpen);
  const [searchMounted, setSearchMounted] = useState(searchOpen);
  const [campaignsMounted, setCampaignsMounted] = useState(false);

  useEffect(() => {
    if (cartOpen) setCartMounted(true);
  }, [cartOpen]);
  useEffect(() => {
    if (searchOpen) setSearchMounted(true);
  }, [searchOpen]);
  useEffect(() => {
    const mount = () => {
      setCampaignsMounted(true);
      // Load and mount the (closed) search panel while idle. Mounting it only on the
      // first click would suspend there, and React holds a revealed Suspense
      // boundary for ~300ms, which made the first open feel sluggish.
      void loadSearchOverlay().then(() => setSearchMounted(true));
    };
    let idleId: number | undefined;
    let timer: ReturnType<typeof globalThis.setTimeout> | undefined;
    const schedule = () => {
      if ("requestIdleCallback" in window) {
        idleId = window.requestIdleCallback(mount, { timeout: 2_000 });
      } else {
        timer = globalThis.setTimeout(mount, 600);
      }
    };
    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });
    window.addEventListener("pointerdown", mount, { once: true, passive: true });
    window.addEventListener("keydown", mount, { once: true });
    return () => {
      window.removeEventListener("load", schedule);
      if (idleId !== undefined && "cancelIdleCallback" in window) window.cancelIdleCallback(idleId);
      if (timer !== undefined) globalThis.clearTimeout(timer);
      window.removeEventListener("pointerdown", mount);
      window.removeEventListener("keydown", mount);
    };
  }, []);

  return (
    <>
      <Suspense fallback={null}>{cartMounted ? <LazyCartDrawer /> : null}</Suspense>
      <Suspense fallback={null}>{searchMounted ? <LazySearchOverlay /> : null}</Suspense>
      <Suspense fallback={null}>
        <LazyToaster position="bottom-right" />
      </Suspense>
      <Suspense fallback={null}>{campaignsMounted ? <LazyCampaignEngine /> : null}</Suspense>
    </>
  );
}

/** A thin bar for navigations that take long enough to notice; quick ones show nothing. */
function NavigationProgress() {
  const loading = useRouterState({ select: (state) => state.status === "pending" });
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!loading) {
      setVisible(false);
      return;
    }
    const timer = window.setTimeout(() => setVisible(true), 150);
    return () => window.clearTimeout(timer);
  }, [loading]);
  return <div className="nav-progress" data-active={visible || undefined} aria-hidden="true" />;
}

function RootComponent() {
  const { queryClient, locale } = Route.useRouteContext();
  const { navigation: initialNavigation } = Route.useLoaderData();
  // Layout follows the page on screen, not the one being loaded: `useLocation()` switches
  // at navigation start, which gave the outgoing homepage the inner pages' top padding.
  const pathname = useRouterState({
    select: (state) => (state.resolvedLocation ?? state.location).pathname,
  });
  const headerScrollSentinelRef = useRef<HTMLSpanElement>(null);
  const isHome = pathname === "/";
  // Checkout is a focused flow: the page renders its own minimal header and policy footer.
  const isCheckout = pathname === "/checkout";

  useEffect(() => {
    // Expose an explicit, non-visual readiness boundary for browser automation
    // and integrations that must not mutate SSR markup before React owns it.
    // The attribute is applied after hydration, so server and first-client
    // markup remain identical.
    document.documentElement.dataset["hydrated"] = "true";
    return () => {
      delete document.documentElement.dataset["hydrated"];
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <MotionProvider>
        <StoreProvider initialLocale={locale === "ar" ? "ar" : "en"}>
          <div className="storefront-shell flex min-h-dvh flex-col bg-background">
            <a href="#main-content" className="skip-link">
              Skip to content
            </a>
            <span
              ref={headerScrollSentinelRef}
              className="header-scroll-sentinel"
              aria-hidden="true"
            />
            {isCheckout ? null : (
              <Header
                scrollSentinelRef={headerScrollSentinelRef}
                initialNavigation={initialNavigation}
              />
            )}
            {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
            <main
              id="main-content"
              tabIndex={-1}
              className="storefront-main flex-1 outline-none"
              style={{
                paddingTop: isHome || isCheckout ? 0 : "var(--store-header-offset, 103px)",
              }}
            >
              {/* No route fade: `pathname` changes when a navigation starts, so animating
                  here faded the outgoing page while the next one was still loading. */}
              <div className="motion-page">
                <Outlet />
              </div>
            </main>
            {isCheckout ? null : (
              <>
                <Footer />
                <GlobalBannerSlot position="BOTTOM" />
              </>
            )}
          </div>
          <NavigationProgress />
          {isCheckout ? null : <BackToTop />}
          <DeferredInteractiveLayers />
          <GlobalShortcuts />
        </StoreProvider>
      </MotionProvider>
    </QueryClientProvider>
  );
}
