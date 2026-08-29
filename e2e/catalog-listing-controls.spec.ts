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
