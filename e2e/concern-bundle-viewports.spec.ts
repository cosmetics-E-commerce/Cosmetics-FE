import { expect, test } from "@playwright/test";

const viewports = [320, 360, 375, 390, 414, 430, 768, 1024, 1366, 1440, 1920];

async function expectNoHorizontalOverflow(page: import("@playwright/test").Page) {
  await expect
    .poll(() =>
      page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      ),
    )
    .toBeLessThanOrEqual(1);
}

for (const width of viewports) {
  test(`Concern Hub and Dynamic Bundle remain usable at ${width}px in EN and RTL`, async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== "chromium", "Chromium owns the exact viewport matrix");
    const height = width <= 430 ? 844 : width <= 1024 ? 900 : 1000;
    await page.setViewportSize({ width, height });

    const pageErrors: string[] = [];
    page.on("pageerror", (error) => pageErrors.push(error.message));

    await page.goto("/skin-concerns/dry-skin", { waitUntil: "networkidle" });
    await expect(page.getByRole("heading", { level: 1, name: "Dry Skin" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Build my routine" })).toBeVisible();
    await expect(page.getByText("Glycerin", { exact: true })).toBeVisible();
    await expectNoHorizontalOverflow(page);

    await page.goto("/skin-concerns/dry-skin?lang=ar", { waitUntil: "networkidle" });
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
    await expect(page.getByRole("heading", { level: 1, name: "البشرة الجافة" })).toBeVisible();
    await expect(page.getByRole("link", { name: "ابني روتيني" })).toBeVisible();
    await expectNoHorizontalOverflow(page);

    await page.goto("/bundles/build-your-routine", { waitUntil: "networkidle" });
    await expect(
      page.getByRole("heading", { level: 1, name: "Build Your Skincare Routine" }),
    ).toBeVisible();
    await expect(page.getByRole("heading", { name: "Choose your Cleanser" })).toBeVisible();
    await page.getByRole("button", { name: /Choose your Serum/ }).click();
    await expect(page.getByRole("heading", { name: "Choose your Serum" })).toBeVisible();
    await expectNoHorizontalOverflow(page);
    if (width < 1024) {
      const stickyAction = page.getByRole("button", { name: "Complete selections" });
      await expect(stickyAction).toBeVisible();
      const bounds = await stickyAction.boundingBox();
      expect(bounds).not.toBeNull();
      expect(bounds!.x).toBeGreaterThanOrEqual(0);
      expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(width + 1);
      expect(bounds!.y + bounds!.height).toBeLessThanOrEqual(height + 1);
    }

    await page.goto("/bundles/build-your-routine?lang=ar", { waitUntil: "networkidle" });
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
    await expect(
      page.getByRole("heading", { level: 1, name: "ابني مجموعة العناية ببشرتك" }),
    ).toBeVisible();
    await page.getByRole("button", { name: /اختاري السيروم/ }).click();
    await expect(page.getByRole("heading", { name: "اختاري السيروم" })).toBeVisible();
    await expectNoHorizontalOverflow(page);

    expect(pageErrors).toEqual([]);
  });
}
