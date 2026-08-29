import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60_000,
        retry: (count, error) => {
          const retryable =
            typeof error === "object" && error && "retryable" in error
              ? Boolean(error.retryable)
              : undefined;
          const status =
            typeof error === "object" && error && "statusCode" in error
              ? Number(error.statusCode)
              : 0;
          return (retryable ?? !(status >= 400 && status < 500)) && count < 2;
        },
        refetchOnWindowFocus: false,
      },
      mutations: { retry: false },
    },
  });

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    trailingSlash: "never",
    // Intent-preloaded route data should still be fresh when the user completes the click.
    defaultPreloadStaleTime: 30_000,
    // Full-document snapshots are expensive for long catalog/home pages. The
    // compositor-only page-enter animation in the root layout preserves motion.
    defaultViewTransition: false,
  });

  return router;
};
