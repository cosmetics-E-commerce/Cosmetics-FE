// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { loadEnv, type ConfigEnv } from "vite";

export default (configEnv: ConfigEnv) => {
  const env = loadEnv(configEnv.mode, process.cwd(), "VITE_");
  const apiProxyTarget = env["VITE_API_PROXY_TARGET"]?.trim() || "http://127.0.0.1:3000";

  return defineConfig({
    vite: {
      environments: {
        client: {
          build: {
            rolldownOptions: {
              output: {
                // Keep the initial browser payload cacheable and below the
                // release threshold. Nitro already emits its own server-side
                // module graph and is not governed by these group sizes.
                codeSplitting: {
                  groups: [
                    {
                      name: "initial",
                      tags: ["$initial"],
                      entriesAware: true,
                      maxSize: 450_000,
                      minSize: 20_000,
                    },
                  ],
                },
              },
            },
          },
        },
      },
      server: {
        host: "127.0.0.1",
        port: 5173,
        strictPort: true,
        // Local phones and browsers cannot call the production API directly
        // because its CORS policy only trusts deployed storefront origins.
        // Keep development requests same-origin and let Vite forward them.
        proxy: {
          "/api/v1": {
            target: apiProxyTarget,
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
  })(configEnv);
};
