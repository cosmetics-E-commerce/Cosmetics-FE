import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  timeout: 60_000,
  workers: 2,
  expect: { timeout: 15_000 },
  use: { baseURL: "http://127.0.0.1:4173", trace: "retain-on-failure" },
  webServer: {
    command: "./node_modules/.bin/vite --host 127.0.0.1 --port 4173",
    env: { VITE_API_BASE_URL: "http://127.0.0.1:4173/api/v1" },
    // The home route intentionally waits for the catalog API during SSR; use a
    // static legal route for server readiness so API outages cannot stall CI.
    url: "http://127.0.0.1:4173/privacy",
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
});
