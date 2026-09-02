import { defineConfig, devices } from "@playwright/test";

const chromiumExecutablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH;

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
      // Never reuse an arbitrary process on the mock API port. A Vite SPA
      // responds 200 for unknown paths, so a stale preview server can satisfy
      // this readiness probe and turn every API call into a misleading 404.
      reuseExistingServer: false,
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
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        launchOptions: chromiumExecutablePath
          ? { executablePath: chromiumExecutablePath }
          : undefined,
      },
    },
    { name: "firefox", use: { ...devices["Desktop Firefox"] } },
    { name: "webkit", use: { ...devices["Desktop Safari"] } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
    { name: "mobile-webkit", use: { ...devices["iPhone 13"] } },
  ],
});
