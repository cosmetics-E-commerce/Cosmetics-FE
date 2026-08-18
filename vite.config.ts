// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: {
    server: {
      host: "127.0.0.1",
      port: 5173,
      strictPort: true,
      // Local phones and browsers cannot call the production API directly
      // because its CORS policy only trusts deployed storefront origins.
      // Keep development requests same-origin and let Vite forward them.
      proxy: {
        "/api/v1": {
          target: "https://api.bioreza.com",
          changeOrigin: true,
          secure: true,
        },
      },
    },
    // The shared contracts package is emitted as CommonJS. It is a local file
    // dependency, so Vite otherwise treats it as source and evaluates its
    // `exports` calls inside the ESM SSR runner. Let Node load it through the
    // package boundary instead; browser builds still use Vite's dependency
    // optimizer.
    ssr: {
      external: ["@cosmetics/contracts"],
    },
  },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
});
