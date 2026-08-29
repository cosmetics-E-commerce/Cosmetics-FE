import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  timeout: 60_000,
  workers: 1,
  expect: { timeout: 15_000 },
  use: {
    baseURL: "http://127.0.0.1:4180",
    trace: "retain-on-failure",
  },
  webServer: [
    {
      command: "node e2e/mock-storefront-api.mjs",
      url: "http://127.0.0.1:4174/health",
      reuseExistingServer: !process.env.CI,
    },
    {
      command:
        "env PORT=4180 NODE_ENV=production VITE_API_BASE_URL=http://127.0.0.1:4174/api/v1 VITE_SITE_URL=https://bioreza.com VITE_ENFORCE_CANONICAL_HOST=false node .output/server/index.mjs",
      url: "http://127.0.0.1:4180/privacy-policy",
      reuseExistingServer: !process.env.CI,
    },
  ],
  projects: [
    { name: "mobile", use: { ...devices["Pixel 7"] } },
    ...(process.env.PLAYWRIGHT_ENABLE_WEBKIT === "true"
      ? [{ name: "mobile-webkit", use: { ...devices["iPhone 13"] } }]
      : []),
  ],
});
