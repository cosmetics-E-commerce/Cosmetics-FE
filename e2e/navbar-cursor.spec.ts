import { expect, test, type Locator } from "@playwright/test";

async function expectVisibleControlsToUsePointer(controls: Locator) {
  const count = await controls.count();

  for (let index = 0; index < count; index += 1) {
    const control = controls.nth(index);
    if (!(await control.isVisible()) || (await control.isDisabled())) continue;
    await expect(control).toHaveCSS("cursor", "pointer");
  }
}

test("desktop navbar exposes a pointer cursor on every visible interactive root", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "chromium", "The primary navigation is desktop-only");

  await page.goto("/about");
  await expect(page.locator('section[aria-label^="Notifications"]')).toBeAttached();

  const headerControls = page.locator(".store-header a, .store-header button");
  await expectVisibleControlsToUsePointer(headerControls);

  const primaryNavigation = page.getByRole("navigation", { name: "Primary" });
  await primaryNavigation.getByRole("button", { name: "Brands", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Brands", exact: true })).toBeVisible();
  await expectVisibleControlsToUsePointer(headerControls);

  await primaryNavigation.getByRole("button", { name: "Categories", exact: true }).click();
  await expect(page.getByText("All Categories")).toBeVisible();
  await expectVisibleControlsToUsePointer(headerControls);
});

test("mobile and RTL navbar controls preserve the same cursor contract", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "This assertion targets the mobile drawer");

  await page.goto("/about?lang=ar");
  await expect(page.locator('section[aria-label^="Notifications"]')).toBeAttached();
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");

  const menuTrigger = page.locator(".store-header .header-brand-slot > button");
  await expect(menuTrigger).toHaveCSS("cursor", "pointer");
  await menuTrigger.click();

  const mobileNavigation = page.locator(".mobile-nav");
  await expect(mobileNavigation).toBeVisible();
  await expectVisibleControlsToUsePointer(mobileNavigation.locator("a, button"));
});
