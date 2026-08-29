import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: { alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) } },
  test: {
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    // Keep async UI tests deterministic on smaller CI runners. Unbounded
    // worker fan-out previously starved AddressForm's real async query flow
    // and produced a false five-second timeout under parallel release jobs.
    maxWorkers: 4,
    coverage: {
      reporter: ["text", "lcov"],
      thresholds: { statements: 60, lines: 60, functions: 55, branches: 50 },
    },
  },
});
