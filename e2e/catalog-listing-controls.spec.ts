import { expect, test } from "@playwright/test";

test("listing view, sort, filters and pagination share durable URL state", async ({ page }) => {
  await page.goto("/shop", { waitUntil: "networkidle" });

  await page.getByRole("button", { name: "List view" }).click();
  await expect(page.locator(".sf-shop-products")).toHaveClass(/sf-shop-products--list/);

  await page.getByRole("combobox", { name: "Sort products" }).selectOption("price-asc");
  await page.getByRole("button", { name: "Filters" }).click();
  await page.getByRole("button", { name: "In stock" }).click();
  await page.getByRole("button", { name: /Sensitive Skin/ }).click();
  await page.getByRole("button", { name: /Show \d+ results/ }).click();

  await expect(page.getByRole("button", { name: /In stock/ }).first()).toBeVisible();
  await expect(page.getByRole("button", { name: /Sensitive Skin/ }).first()).toBeVisible();
  await page.getByRole("button", { name: "2", exact: true }).click();

  await expect.poll(() => new URL(page.url()).searchParams.get("page")).toBe("2");
  const query = new URL(page.url()).searchParams;
  expect(query.get("view")).toBe("list");
  expect(query.get("sort")).toBe("price-asc");
  expect(query.get("stock")).toBe("in-stock");
  expect(query.get("tags")).toBe("sensitive-skin");

  await page.getByRole("button", { name: "Clear all" }).click();
  await expect.poll(() => new URL(page.url()).searchParams.has("stock")).toBe(false);
  const cleared = new URL(page.url()).searchParams;
  expect(cleared.has("tags")).toBe(false);
  expect(cleared.has("page")).toBe(false);
  expect(cleared.get("view")).toBe("list");
  expect(cleared.get("sort")).toBe("price-asc");
});

test("category navigation stays lightweight, canonical, scrollable, and RTL-safe", async ({
  page,
}) => {
  await page.goto("/shop", { waitUntil: "networkidle" });
  const strip = page.getByRole("tablist", { name: "Category" });
  const allProducts = strip.getByRole("tab", { name: "All products" });
  const bodyCare = strip.getByRole("tab", {
    name: "Body Moisturizer and Intensive Daily Care (9)",
  });
  const toolbar = page.locator(".catalog-listing-toolbar");
  const sort = toolbar.getByRole("combobox", { name: "Sort products" });
  await sort.selectOption("price-desc");
  await expect(sort).toHaveValue("price-desc");

  for (const width of [320, 360, 375, 390, 414, 430, 1280]) {
    await page.setViewportSize({ width, height: width < 700 ? 820 : 900 });
    await expect(allProducts).toBeVisible();
    const geometry = await strip.evaluate((element) => ({
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      stripScrollable: element.scrollWidth > element.clientWidth,
      tabs: [...element.querySelectorAll<HTMLElement>('[role="tab"]')].map((tab) => ({
        background: getComputedStyle(tab).backgroundColor,
        height: tab.getBoundingClientRect().height,
        whiteSpace: getComputedStyle(tab).whiteSpace,
      })),
    }));
    expect(geometry.overflow).toBeLessThanOrEqual(1);
    expect(geometry.tabs.every((tab) => tab.background === "rgba(0, 0, 0, 0)")).toBe(true);
    expect(geometry.tabs.every((tab) => tab.height >= 42)).toBe(true);
    expect(geometry.tabs.every((tab) => tab.whiteSpace === "nowrap")).toBe(true);
    if (width <= 430) expect(geometry.stripScrollable).toBe(true);

    if (width <= 430) {
      const toolbarGeometry = await toolbar.evaluate((element) => {
        const bounds = (selector: string) => {
          const target = element.querySelector<HTMLElement>(selector)!;
          const rect = target.getBoundingClientRect();
          return {
            top: rect.top,
            right: rect.right,
            bottom: rect.bottom,
            left: rect.left,
            height: rect.height,
          };
        };
        const count = bounds(".catalog-listing-toolbar__count");
        const filter = bounds(".sf-shop-filter-button");
        const sortControl = bounds(".catalog-listing-toolbar__sort");
        const sortPrefix = bounds(".catalog-listing-toolbar__sort-prefix");
        const views = bounds(".catalog-listing-toolbar__views");
        const viewButtons = [
          ...element.querySelectorAll<HTMLElement>(".catalog-listing-toolbar__views button"),
        ].map((button) => {
          const rect = button.getBoundingClientRect();
          return { width: rect.width, height: rect.height };
        });
        return {
          count,
          filter,
          sortControl,
          sortPrefix,
          views,
          viewButtons,
          prefixDisplay: getComputedStyle(
            element.querySelector<HTMLElement>(".catalog-listing-toolbar__sort-prefix")!,
          ).display,
        };
      });
      const countCenter = (toolbarGeometry.count.top + toolbarGeometry.count.bottom) / 2;
      const viewsCenter = (toolbarGeometry.views.top + toolbarGeometry.views.bottom) / 2;
      expect(Math.abs(countCenter - viewsCenter)).toBeLessThanOrEqual(2);
      expect(
        Math.abs(toolbarGeometry.filter.top - toolbarGeometry.sortControl.top),
      ).toBeLessThanOrEqual(2);
      expect(toolbarGeometry.filter.top).toBeGreaterThanOrEqual(toolbarGeometry.count.bottom + 8);
      expect(toolbarGeometry.sortControl.height).toBeCloseTo(toolbarGeometry.filter.height, 0);
      expect(toolbarGeometry.filter.height).toBeGreaterThanOrEqual(42);
      expect(toolbarGeometry.prefixDisplay).not.toBe("none");
      expect(toolbarGeometry.sortPrefix.left).toBeGreaterThanOrEqual(
        toolbarGeometry.sortControl.left,
      );
      expect(toolbarGeometry.sortPrefix.right).toBeLessThanOrEqual(
        toolbarGeometry.sortControl.right,
      );
      expect(
        toolbarGeometry.viewButtons.every((button) => button.width >= 40 && button.height >= 40),
      ).toBe(true);
    }
  }

  await bodyCare.click();
  await expect
    .poll(() => new URL(page.url()).searchParams.get("category"))
    .toBe("body-moisturizer");
  expect(new URL(page.url()).searchParams.has("page")).toBe(false);
  await expect(bodyCare).toHaveAttribute("aria-selected", "true");

  await page.goBack();
  await expect.poll(() => new URL(page.url()).searchParams.has("category")).toBe(false);
  await page.goForward();
  await expect
    .poll(() => new URL(page.url()).searchParams.get("category"))
    .toBe("body-moisturizer");

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/shop?lang=ar", { waitUntil: "networkidle" });
  const rtlStrip = page.getByRole("tablist", { name: "الفئة" });
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  await expect(page.locator(".catalog-listing-toolbar__sort-prefix")).toHaveText("الترتيب:");
  await expect(page.getByRole("combobox", { name: "ترتيب المنتجات" })).toBeVisible();
  await rtlStrip.getByRole("tab", { name: "مرطبات الجسم والعناية اليومية المكثفة (9)" }).click();
  await expect
    .poll(() => new URL(page.url()).searchParams.get("category"))
    .toBe("body-moisturizer");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    ),
  ).toBeLessThanOrEqual(1);
});
