import { chromium } from "@playwright/test";
import { writeFile } from "node:fs/promises";

const baseURL = process.env.PERF_BASE_URL ?? "http://127.0.0.1:4180";
const outputPath = process.env.PERF_OUTPUT ?? "/tmp/storefront-performance.json";
const throttled = process.env.PERF_THROTTLE !== "0";

const round = (value) => Math.round((value ?? 0) * 10) / 10;
const sleep = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

async function installPerformanceObservers(context) {
  await context.addInitScript(() => {
    localStorage.setItem("bioreza.locale", "en");
    window.__storefrontPerf = {
      lcp: 0,
      cls: 0,
      longTasks: [],
      events: [],
    };

    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const last = entries.at(-1);
      if (last) window.__storefrontPerf.lcp = last.startTime;
    }).observe({ type: "largest-contentful-paint", buffered: true });

    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) window.__storefrontPerf.cls += entry.value;
      }
    }).observe({ type: "layout-shift", buffered: true });

    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        window.__storefrontPerf.longTasks.push({
          startTime: entry.startTime,
          duration: entry.duration,
        });
      }
    }).observe({ type: "longtask", buffered: true });

    try {
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.interactionId) {
            window.__storefrontPerf.events.push({
              name: entry.name,
              duration: entry.duration,
              interactionId: entry.interactionId,
            });
          }
        }
      }).observe({ type: "event", buffered: true, durationThreshold: 16 });
    } catch {
      // Event Timing is not available in every Playwright Chromium build.
    }
  });
}

async function attachNetworkRecorder(page) {
  const requests = [];
  page.on("requestfinished", async (request) => {
    const response = await request.response();
    if (!response) return;
    const timing = request.timing();
    const headers = await response.allHeaders().catch(() => ({}));
    requests.push({
      url: response.url(),
      method: request.method(),
      status: response.status(),
      resourceType: request.resourceType(),
      duration: timing.responseEnd >= 0 ? round(timing.responseEnd) : null,
      contentLength: Number(headers["content-length"] ?? 0),
    });
  });
  return requests;
}

async function measureTransition(page, name, action, ready) {
  const beforeTasks = await page.evaluate(() => window.__storefrontPerf.longTasks.length);
  const startedAt = performance.now();
  await action();
  await ready();
  const contentReady = round(performance.now() - startedAt);
  await page.waitForLoadState("networkidle", { timeout: 8_000 }).catch(() => undefined);
  const interactionTasks = await page.evaluate((startIndex) => {
    const tasks = window.__storefrontPerf.longTasks.slice(startIndex);
    return {
      count: tasks.length,
      total: tasks.reduce((sum, task) => sum + task.duration, 0),
      longest: Math.max(0, ...tasks.map((task) => task.duration)),
    };
  }, beforeTasks);
  return {
    name,
    contentReady,
    settled: round(performance.now() - startedAt),
    mainThread: Object.fromEntries(
      Object.entries(interactionTasks).map(([key, value]) => [key, round(value)]),
    ),
    url: page.url(),
  };
}

async function readPageMetrics(page) {
  return page.evaluate(() => {
    const navigation = performance.getEntriesByType("navigation")[0];
    const resources = performance.getEntriesByType("resource");
    const paints = performance.getEntriesByType("paint");
    const state = window.__storefrontPerf;
    const longTasks = state.longTasks;
    const totalBlockingTime = longTasks.reduce(
      (total, entry) => total + Math.max(0, entry.duration - 50),
      0,
    );
    const byType = resources.reduce((totals, resource) => {
      const type = resource.initiatorType || "other";
      const current = totals[type] ?? { requests: 0, transferSize: 0, decodedSize: 0 };
      current.requests += 1;
      current.transferSize += resource.transferSize || 0;
      current.decodedSize += resource.decodedBodySize || 0;
      totals[type] = current;
      return totals;
    }, {});

    return {
      ttfb: navigation ? navigation.responseStart : 0,
      domContentLoaded: navigation ? navigation.domContentLoadedEventEnd : 0,
      load: navigation ? navigation.loadEventEnd : 0,
      fcp: paints.find((entry) => entry.name === "first-contentful-paint")?.startTime ?? 0,
      lcp: state.lcp,
      cls: state.cls,
      inp: Math.max(0, ...state.events.map((entry) => entry.duration)),
      longTaskCount: longTasks.length,
      longestTask: Math.max(0, ...longTasks.map((entry) => entry.duration)),
      totalBlockingTime,
      resources: byType,
      largestResources: resources
        .map((resource) => ({
          url: resource.name,
          type: resource.initiatorType || "other",
          transferSize: resource.transferSize || 0,
          decodedSize: resource.decodedBodySize || 0,
          duration: resource.duration,
        }))
        .sort((left, right) => right.transferSize - left.transferSize)
        .slice(0, 20),
    };
  });
}

async function run() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    deviceScaleFactor: 1,
    serviceWorkers: "block",
  });
  await installPerformanceObservers(context);
  const page = await context.newPage();
  const client = await context.newCDPSession(page);

  if (throttled) {
    await client.send("Network.enable");
    await client.send("Network.emulateNetworkConditions", {
      offline: false,
      latency: 100,
      downloadThroughput: (4 * 1024 * 1024) / 8,
      uploadThroughput: (1 * 1024 * 1024) / 8,
      connectionType: "cellular4g",
    });
    await client.send("Emulation.setCPUThrottlingRate", { rate: 4 });
  }

  const requests = await attachNetworkRecorder(page);
  const consoleErrors = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("pageerror", (error) => consoleErrors.push(error.message));

  await page.goto(baseURL, { waitUntil: "networkidle", timeout: 45_000 });
  await sleep(1_000);

  const initial = await readPageMetrics(page);
  const transitions = [];
  const nav = page.getByRole("navigation", { name: "Primary" });

  transitions.push(
    await measureTransition(
      page,
      "home-to-offers",
      () => nav.getByRole("link", { name: "Offers", exact: true }).click(),
      () => page.getByRole("heading", { name: /Offers, thoughtfully applied/i }).waitFor(),
    ),
  );

  await page.goto(baseURL, { waitUntil: "networkidle" });
  const categoriesTrigger = page
    .getByRole("navigation", { name: "Primary" })
    .getByRole("button", { name: "Categories", exact: true });
  const openedAt = performance.now();
  await categoriesTrigger.hover();
  await page.locator(".published-mega").waitFor({ state: "visible" });
  const megaMenuOpen = round(performance.now() - openedAt);
  const validCategoryHrefs = await page.evaluate(async () => {
    const response = await fetch("/api/v1/categories?includeProductCount=true");
    if (!response.ok) return [];
    const payload = await response.json();
    return (payload.data ?? []).map((category) => `/categories/${category.slug}`);
  });
  const categoryLinks = page.locator('.published-mega a[href^="/categories/"]');
  const categoryTargets = await categoryLinks.evaluateAll((links, allowedHrefs) => {
    const allowed = new Set(allowedHrefs);
    const seen = new Set();
    return links
      .map((link) => {
        const label = link.cloneNode(true);
        if (label instanceof HTMLElement)
          label.querySelectorAll("small").forEach((node) => node.remove());
        return { href: link.getAttribute("href"), name: label.textContent?.trim() };
      })
      .filter((target) => {
        if (!target.href || !target.name || !allowed.has(target.href) || seen.has(target.href))
          return false;
        seen.add(target.href);
        return true;
      })
      .slice(0, 2);
  }, validCategoryHrefs);
  if (categoryTargets.length < 1)
    throw new Error("The mega menu did not expose a category link backed by the catalog fixture");
  const firstCategory = categoryTargets[0];
  const secondCategory =
    categoryTargets[1] ??
    validCategoryHrefs
      .filter((href) => href !== firstCategory.href)
      .map((href) => ({ href, name: href.split("/").at(-1) }))[0];
  if (!secondCategory) throw new Error("The catalog did not expose a second category route");
  const secondCategoryInMenu = categoryTargets.some(
    (category) => category.href === secondCategory.href,
  );

  transitions.push(
    await measureTransition(
      page,
      "home-to-category",
      () => page.locator(`.published-mega a[href="${firstCategory.href}"]`).first().click(),
      async () => {
        await page.waitForURL((url) => url.pathname === firstCategory.href);
        await page.locator(".sf-shop-page h1").first().waitFor();
      },
    ),
  );
  await page.locator(".sf-product-card").first().waitFor({ state: "visible" });

  const categoryNav = page.getByRole("navigation", { name: "Primary" });
  await categoryNav.getByRole("button", { name: "Categories", exact: true }).hover();
  await page.locator(".published-mega").waitFor({ state: "visible" });
  transitions.push(
    await measureTransition(
      page,
      "category-to-category",
      () =>
        secondCategoryInMenu
          ? page.locator(`.published-mega a[href="${secondCategory.href}"]`).first().click()
          : page.goto(`${baseURL}${secondCategory.href}`),
      async () => {
        await page.waitForURL((url) => url.pathname === secondCategory.href);
        await page.locator(".sf-shop-page h1").first().waitFor();
      },
    ),
  );
  await page.locator(".sf-product-card").first().waitFor({ state: "visible" });

  const productHref = await page
    .locator('.sf-product-card a[href^="/product/"]')
    .first()
    .getAttribute("href");
  if (!productHref) throw new Error("The category page did not expose a product link");
  const productName = (await page.locator(".sf-product-card__title").first().innerText()).trim();
  transitions.push(
    await measureTransition(
      page,
      "category-to-product",
      () => page.locator(`.sf-product-card a[href="${productHref}"]`).first().click(),
      () => page.getByRole("heading", { name: productName, exact: true }).first().waitFor(),
    ),
  );
  transitions.push(
    await measureTransition(
      page,
      "product-back-to-category",
      () => page.goBack(),
      async () => {
        await page.waitForURL((url) => url.pathname === secondCategory.href);
        await page.locator(".sf-shop-page h1").first().waitFor();
      },
    ),
  );
  await page.locator(".sf-product-card").first().waitFor({ state: "visible" });

  const scrollStartedAt = performance.now();
  await page.evaluate(async () => {
    for (let y = 0; y <= document.body.scrollHeight; y += 250) {
      window.scrollTo(0, y);
      await new Promise((resolve) => requestAnimationFrame(() => resolve()));
    }
  });
  const gridScroll = round(performance.now() - scrollStartedAt);

  await page.goto(`${baseURL}/shop`, { waitUntil: "networkidle" });
  transitions.push(
    await measureTransition(
      page,
      "sorting",
      () => page.locator(".catalog-listing-toolbar__sort select").selectOption("price-asc"),
      async () => {
        await page.waitForURL(/sort=price-asc/);
        await page.waitForTimeout(500);
      },
    ),
  );
  await page.locator(".sf-shop-filter-button").waitFor({ state: "visible" });
  const filtersButton = page.locator(".sf-shop-filter-button");
  await filtersButton.click();
  const inStock = page.getByRole("button", { name: "In stock", exact: true });
  if (await inStock.count()) {
    transitions.push(
      await measureTransition(
        page,
        "filtering",
        () => inStock.click(),
        async () => {
          await page.waitForURL(/stock=in-stock/);
          await page.waitForTimeout(500);
        },
      ),
    );
  }

  await sleep(750);
  const finalMetrics = await readPageMetrics(page);
  const apiRequests = requests.filter((request) => request.url.includes("/api/v1/"));
  const repeated = Object.entries(
    apiRequests.reduce((counts, request) => {
      const url = new URL(request.url);
      const key = `${request.method} ${url.pathname}${url.search}`;
      counts[key] = (counts[key] ?? 0) + 1;
      return counts;
    }, {}),
  )
    .filter(([, count]) => count > 1)
    .sort((left, right) => right[1] - left[1]);

  const report = {
    capturedAt: new Date().toISOString(),
    baseURL,
    throttling: throttled
      ? { latencyMs: 100, downloadMbps: 4, uploadMbps: 1, cpuSlowdown: 4 }
      : null,
    initial: Object.fromEntries(
      Object.entries(initial).map(([key, value]) => [
        key,
        typeof value === "number" ? round(value) : value,
      ]),
    ),
    finalMetrics: Object.fromEntries(
      Object.entries(finalMetrics).map(([key, value]) => [
        key,
        typeof value === "number" ? round(value) : value,
      ]),
    ),
    interactions: { megaMenuOpen, gridScroll, transitions },
    network: {
      requestCount: requests.length,
      apiRequestCount: apiRequests.length,
      imageRequestCount: requests.filter((request) => request.resourceType === "image").length,
      imageContentLength: requests
        .filter((request) => request.resourceType === "image")
        .reduce((sum, request) => sum + request.contentLength, 0),
      jsRequestCount: requests.filter((request) => request.resourceType === "script").length,
      apiDuration: apiRequests.map(({ url, status, duration }) => ({ url, status, duration })),
      repeated,
    },
    consoleErrors,
  };

  await writeFile(outputPath, `${JSON.stringify(report, null, 2)}\n`);
  console.log(JSON.stringify(report, null, 2));
  await browser.close();
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
