import { expect, test, type Page, type Route } from "@playwright/test";

const response = {
  success: false,
  error: {
    code: "INVALID_CREDENTIALS",
    message: "Invalid credentials.",
    details: null,
    fieldErrors: {},
    retryable: false,
    requestId: "store-auth-e2e-42",
  },
};

async function submitInvalidLogin(page: Page, arabic = false) {
  await page.route("**/api/v1/auth/login", (route: Route) =>
    route.fulfill({ status: 401, json: response }),
  );
  await page.goto(arabic ? "/login?lang=ar" : "/login");
  await expect(page.locator("html")).toHaveAttribute("data-hydrated", "true");
  if (arabic) {
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  }
  await page.getByLabel("Email or mobile number").fill("customer@example.com");
  await page.locator('input[name="password"]').fill("wrong-password");
  const submit = page.getByRole("button", { name: "Sign in" });
  await expect(submit).toBeEnabled();
  await submit.click();
}

test("storefront auth explains a known failure without exposing internals", async ({ page }) => {
  await submitInvalidLogin(page);
  const alert = page.getByRole("alert");
  await expect(alert).toContainText("Couldn’t sign in");
  await expect(alert).toContainText("email or password is incorrect");
  await expect(alert).toContainText("reset your password");
  await expect(alert).not.toContainText(/INVALID_CREDENTIALS|401|Prisma/i);
});

test("storefront auth presents the same failure in Arabic", async ({ page }) => {
  await submitInvalidLogin(page, true);
  const alert = page.getByRole("alert");
  await expect(alert).toContainText("تعذر تسجيل الدخول");
  await expect(alert).toContainText("البريد الإلكتروني أو كلمة المرور غير صحيحة");
  await expect(alert).not.toContainText(/INVALID_CREDENTIALS|Invalid credentials|401/i);
});

test("human error copy remains readable without overflow across phone widths", async ({ page }) => {
  await page.route("**/api/v1/auth/login", (route: Route) =>
    route.fulfill({ status: 401, json: response }),
  );
  for (const width of [320, 360, 375, 390, 414, 430]) {
    await page.setViewportSize({ width, height: 780 });
    await page.goto("/login");
    await expect(page.locator("html")).toHaveAttribute("data-hydrated", "true");
    await page.getByLabel("Email or mobile number").fill("customer@example.com");
    await page.locator('input[name="password"]').fill("wrong-password");
    await page.getByRole("button", { name: "Sign in" }).click();
    const alert = page.getByRole("alert");
    await expect(alert).toContainText("Check both fields");
    const bounds = await alert.boundingBox();
    expect(bounds).not.toBeNull();
    expect(bounds!.x).toBeGreaterThanOrEqual(0);
    expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(width);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      ),
    ).toBeLessThanOrEqual(1);
  }
});
