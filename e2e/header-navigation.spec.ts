import { expect, test } from "@playwright/test";

test("desktop navigation keeps exactly one active item through menus and routes", async ({
  page,
}, testInfo) => {
  test.setTimeout(60_000);
  test.skip(testInfo.project.name !== "chromium", "The primary navigation is desktop-only");

  // Let Vite finish transforming the route chunks before testing interactions.
  await page.goto("/about", { waitUntil: "networkidle" });
  const nav = page.getByRole("navigation", { name: "Primary" });
  const categories = nav.getByRole("button", { name: "Categories", exact: true });
  const brands = nav.getByRole("button", { name: "Brands", exact: true });
  const about = nav.getByRole("link", { name: "About" });
  const contact = nav.getByRole("link", { name: "Contact us" });

  await expect(nav.locator('.nav-link[data-active="true"]')).toHaveCount(1);
  await expect(about).toHaveAttribute("aria-current", "page");

  await brands.hover();
  await expect(brands).toHaveAttribute("data-state", "open");
  await expect(page.getByRole("heading", { name: "Brands", exact: true })).toBeVisible();

  await categories.hover();
  await expect(categories).toHaveAttribute("data-state", "open");
  await expect(page.getByText("All Categories")).toBeVisible();
  await contact.hover();
  await expect(nav.locator('.nav-link[data-active="true"]')).toHaveCount(1);
  await expect(about).toHaveAttribute("aria-current", "page");

  await page.mouse.move(1200, 900);
  await expect(about).toHaveAttribute("aria-current", "page");

  await brands.focus();
  await page.keyboard.press("Escape");
  await page.locator("main").focus();
  await expect(about).toHaveAttribute("aria-current", "page");

  await page.goto("/contact");
  await expect(page).toHaveURL(/\/contact$/);
  await expect(nav.locator('.nav-link[data-active="true"]')).toHaveCount(1);
  await expect(contact).toHaveAttribute("aria-current", "page");

  await page.reload();
  await expect(nav.locator('.nav-link[data-active="true"]')).toHaveCount(1);
  await expect(contact).toHaveAttribute("aria-current", "page");
});
