import { expect, test } from "@playwright/test";

const productPath = "/product/acm-depiwhite-eye-contour-gel-15ml";

test("switching locale remaps product fields and detail copy without stale English content", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "chromium", "The desktop locale control is used here.");
  await page.goto(productPath, { waitUntil: "networkidle" });

  await expect(page.locator("h1")).toHaveText(/ACM Depiwhite Advanced/);
  await page.getByRole("button", { name: "التبديل إلى العربية" }).click();

  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  await expect(page.locator("h1")).toHaveText(/كريم ACM ديبي وايت/);
  await page.waitForLoadState("networkidle");
  await expect(
    page.getByRole("definition").filter({ hasText: "مناسب لجميع أنواع البشرة" }),
  ).toBeVisible();
  const howToUse = page.getByRole("button", { name: "طريقة الاستخدام" });
  await expect(howToUse).toHaveAttribute("aria-expanded", "false");
  await howToUse.click();
  await expect(howToUse).toHaveAttribute("aria-expanded", "true");
  await expect(page.getByText(/ضعي كمية صغيرة حول محيط العين/)).toBeVisible();
  await expect(page.getByText(/Apply\s+a small amount around the eye contour/)).toBeHidden();

  await page.getByRole("button", { name: "Switch to English" }).click();
  await expect(page.locator("html")).toHaveAttribute("dir", "ltr");
  await expect(page.locator("h1")).toHaveText(/ACM Depiwhite Advanced/);
  await page.waitForLoadState("networkidle");
  await expect(page.getByRole("button", { name: "How to use" })).toHaveAttribute(
    "aria-expanded",
    "false",
  );
  await page.getByRole("button", { name: "How to use" }).click();
  await expect(page.getByText(/Apply\s+a small amount around the eye contour/)).toBeVisible();
});
