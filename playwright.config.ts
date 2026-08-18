import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  timeout: 60_000,
  workers: 2,
  expect: { timeout: 15_000 },
  use: { baseURL: "http://127.0.0.1:4173", trace: "retain-on-failure" },
  webServer: [
    {
      command: "node e2e/mock-storefront-api.mjs",
      url: "http://127.0.0.1:4174/health",
      reuseExistingServer: !process.env.CI,
    },
    {
      command: "./node_modules/.bin/vite --host 127.0.0.1 --port 4173",
      env: {
        VITE_API_BASE_URL: "http://127.0.0.1:4173/api/v1",
        VITE_API_PROXY_TARGET: "http://127.0.0.1:4174",
      },
      // The home route waits for catalog data during SSR. A static legal route
      // remains the readiness probe while the mock API owns catalog fixtures.
      url: "http://127.0.0.1:4173/privacy-policy",
      reuseExistingServer: !process.env.CI,
    },
  ],
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
});
