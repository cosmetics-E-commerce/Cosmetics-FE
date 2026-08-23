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
