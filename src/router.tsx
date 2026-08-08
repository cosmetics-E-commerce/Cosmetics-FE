import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60_000,
        retry: (count, error) => {
          const status =
            typeof error === "object" && error && "statusCode" in error
              ? Number(error.statusCode)
              : 0;
          return !(status >= 400 && status < 500) && count < 2;
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
    defaultPreloadStaleTime: 0,
    defaultViewTransition:
      typeof document !== "undefined" &&
      typeof document.startViewTransition === "function" &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  });

  return router;
};
