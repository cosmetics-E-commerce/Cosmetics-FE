import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useLocation,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useRef, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { StoreProvider, useStore } from "@/lib/store";
import { Header } from "@/components/layout/Header";
import { GlobalBannerSlot } from "@/components/banner/GlobalBannerSlot";
import { Footer } from "@/components/layout/Footer";
import { BackToTop } from "@/components/layout/BackToTop";
import { CartDrawer } from "@/components/shop/CartDrawer";
import { SearchOverlay } from "@/components/layout/SearchOverlay";
import { Toaster } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
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
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-background px-5">
      <div className="max-w-md text-center">
        <p className="label-xs text-gold">Something went wrong</p>
        <h1 className="display mt-5 text-[clamp(2.6rem,5vw,4rem)]">This page didn't load.</h1>
        <div className="rule-gold mx-auto my-8 max-w-[180px]" />
        <p className="text-sm leading-relaxed text-muted-foreground">
          Something went wrong on our end. You can try refreshing, or head back to the collection.
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
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "BIOREZA Cosmetics — Science. Beauty. Confidence." },
      {
        name: "description",
        content:
          "Advanced skincare and curated beauty essentials, selected for visible results and everyday confidence.",
      },
      { name: "author", content: "BIOREZA Cosmetics" },
      { property: "og:title", content: "BIOREZA Cosmetics" },
      {
        property: "og:description",
        content: "Advanced skincare and curated beauty essentials from BIOREZA.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@bioreza" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300&family=Jost:wght@200;300;400;500&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
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

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const { pathname } = useLocation();
  const pageRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const el = pageRef.current;
    if (!el) return;
    if (typeof document !== "undefined" && typeof document.startViewTransition === "function") {
      return;
    }
    el.classList.remove("page-enter");
    void el.offsetWidth;
    el.classList.add("page-enter");
  }, [pathname]);

  return (
    <QueryClientProvider client={queryClient}>
      <StoreProvider>
        <div className="flex min-h-dvh flex-col bg-background">
          <Header />
          {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
          <main className="flex-1" style={{ paddingTop: "var(--store-header-offset, 106px)" }}>
            <div ref={pageRef} key={pathname}>
              <Outlet />
            </div>
          </main>
          <Footer />
          <GlobalBannerSlot position="BOTTOM" />
        </div>
        <BackToTop />
        <CartDrawer />
        <SearchOverlay />
        <Toaster position="bottom-right" />
        <GlobalShortcuts />
      </StoreProvider>
    </QueryClientProvider>
  );
}
