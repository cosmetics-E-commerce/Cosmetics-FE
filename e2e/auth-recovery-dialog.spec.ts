import { expect, test, type Page, type Route } from "@playwright/test";

const customer = {
  id: "11111111-1111-4111-8111-111111111111",
  firstName: "Sara",
  lastName: "Ali",
  phone: "01012345678",
  email: "sara@example.com",
  role: "CLIENT",
  permissions: [],
};

async function fulfill(route: Route, data: unknown) {
  await route.fulfill({ json: { success: true, data } });
}

async function mockAuthenticatedAccount(page: Page) {
  let logoutRequests = 0;
  await page.addInitScript(() => {
    window.localStorage.setItem("bioreza.csrf", "x".repeat(32));
  });
  await page.route("**/api/v1/**", async (route) => {
    const request = route.request();
    const path = new URL(request.url()).pathname;
    if (path.endsWith("/auth/refresh")) {
      return fulfill(route, {
        user: customer,
        tokens: { accessToken: "test-access-token", expiresIn: 900 },
        csrfToken: "y".repeat(32),
      });
    }
    if (path.endsWith("/auth/logout")) {
      logoutRequests += 1;
      return fulfill(route, { success: true });
    }
    if (path.endsWith("/cart/merge") || path.endsWith("/cart")) {
      return fulfill(route, {
        cartId: "22222222-2222-4222-8222-222222222222",
        owner: "USER",
        items: [],
        subtotal: 0,
        discountTotal: 0,
        estimatedTotal: 0,
        totalSavings: 0,
        couponCode: null,
        appliedPromotions: [],
        promotionMessages: [],
        giftOptions: [],
        totalQuantity: 0,
        hasIssues: false,
        updatedAt: new Date().toISOString(),
      });
    }
    if (path.endsWith("/users/me")) return fulfill(route, customer);
    if (path.endsWith("/users/addresses") || path.endsWith("/orders")) {
      return fulfill(route, []);
    }
    if (path.endsWith("/wishlist")) {
      return fulfill(route, { items: [], collections: [], totalItems: 0, updatedAt: null });
    }
    if (path.endsWith("/reviews/mine")) return fulfill(route, { items: [], total: 0 });
    return route.fallback();
  });
  return { logoutRequests: () => logoutRequests };
}

test("sign-out dialog stays viewport-safe, modal, and keyboard accessible", async ({ page }) => {
  // This is deliberately a ten-navigation responsive matrix. Keep its budget
  // local instead of weakening assertions or inflating the global timeout.
  test.setTimeout(120_000);
  const state = await mockAuthenticatedAccount(page);
  const viewports = [
    { width: 320, height: 568 },
    { width: 360, height: 740 },
    { width: 375, height: 812 },
    { width: 390, height: 844 },
    { width: 412, height: 860 },
    { width: 430, height: 900 },
    { width: 768, height: 900 },
    { width: 1024, height: 768 },
    { width: 1440, height: 900 },
  ];

  for (const viewport of viewports) {
    await page.setViewportSize(viewport);
    await page.goto("/account", { waitUntil: "domcontentloaded" });
    const trigger = page.getByRole("button", { name: "Sign out" });
    await expect(trigger).toBeVisible();
    await trigger.click();

    const dialog = page.getByRole("dialog", { name: "Sign out of BIOREZA?" });
    await expect(dialog).toBeVisible();
    await expect(dialog).toHaveAttribute("aria-modal", "true");
    await expect(dialog.getByRole("button", { name: "Close" })).toBeVisible();
    await expect(dialog.getByRole("button", { name: "Stay signed in" })).toBeVisible();
    await expect(dialog.getByRole("button", { name: "Yes, sign out" })).toBeVisible();
    expect(
      await page.evaluate(
        () =>
          document.body.hasAttribute("data-scroll-locked") ||
          getComputedStyle(document.body).overflow === "hidden",
      ),
    ).toBe(true);

    const bounds = await dialog.boundingBox();
    expect(bounds).not.toBeNull();
    expect(bounds!.x).toBeGreaterThanOrEqual(15);
    expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(viewport.width - 15);
    expect(bounds!.y).toBeGreaterThanOrEqual(15);
    expect(bounds!.y + bounds!.height).toBeLessThanOrEqual(viewport.height - 15);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      ),
    ).toBeLessThanOrEqual(1);

    await page.keyboard.press("Escape");
    await expect(dialog).toHaveCount(0);
    await expect(trigger).toBeFocused();
    await expect
      .poll(() =>
        page.evaluate(
          () =>
            !document.body.hasAttribute("data-scroll-locked") &&
            getComputedStyle(document.body).overflow !== "hidden",
        ),
      )
      .toBe(true);
  }

  await page.setViewportSize({ width: 568, height: 320 });
  await page.goto("/account", { waitUntil: "domcontentloaded" });
  await page.getByRole("button", { name: "Sign out" }).click();
  const landscapeDialog = page.getByRole("dialog", { name: "Sign out of BIOREZA?" });
  const landscapeBounds = await landscapeDialog.boundingBox();
  expect(landscapeBounds).not.toBeNull();
  expect(landscapeBounds!.height).toBeLessThanOrEqual(288.5);
  await expect(landscapeDialog.getByRole("button", { name: "Yes, sign out" })).toBeVisible();

  await landscapeDialog.getByRole("button", { name: "Yes, sign out" }).click();
  await expect.poll(state.logoutRequests).toBe(1);
  await expect(page).toHaveURL(/\/$/);
});

test("sign-out dialog remains centered in RTL", async ({ page }) => {
  await mockAuthenticatedAccount(page);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/account?lang=ar", { waitUntil: "domcontentloaded" });
  await page.getByRole("button", { name: "تسجيل الخروج" }).click();

  const dialog = page.getByRole("dialog", { name: "هل تريد تسجيل الخروج؟" });
  await expect(dialog).toHaveAttribute("dir", "rtl");
  const bounds = await dialog.boundingBox();
  const visibleViewportWidth = await page.evaluate(() => document.documentElement.clientWidth);
  expect(bounds).not.toBeNull();
  expect(Math.abs(bounds!.x + bounds!.width / 2 - visibleViewportWidth / 2)).toBeLessThanOrEqual(1);
  await expect(dialog.getByRole("button", { name: "إغلاق" })).toBeVisible();
});

test("sign-out dialog respects reduced-motion preferences", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await mockAuthenticatedAccount(page);
  await page.goto("/account", { waitUntil: "domcontentloaded" });
  await page.getByRole("button", { name: "Sign out" }).click();

  const dialog = page.getByRole("dialog", { name: "Sign out of BIOREZA?" });
  await expect(dialog).toBeVisible();
  const durations = await page.evaluate(() =>
    [
      document.querySelector<HTMLElement>(".mobile-adaptive-dialog"),
      document.querySelector<HTMLElement>(".storefront-dialog-overlay"),
    ].map((element) => (element ? getComputedStyle(element).animationDuration : "missing")),
  );
  expect(durations).toHaveLength(2);
  expect(durations.every((duration) => Number.parseFloat(duration) <= 0.001)).toBe(true);
});

test("email recovery supports paste, correction, resend, and a one-time reset grant", async ({
  page,
}) => {
  const forgotBodies: unknown[] = [];
  const verifyBodies: unknown[] = [];
  const resetBodies: unknown[] = [];

  await page.route("**/api/v1/auth/password/**", async (route) => {
    const request = route.request();
    const path = new URL(request.url()).pathname;
    const body = request.postDataJSON();
    if (path.endsWith("/forgot")) {
      forgotBodies.push(body);
      return fulfill(route, { ttlSeconds: 600, resendAvailableInSeconds: 1 });
    }
    if (path.endsWith("/verify-otp")) {
      verifyBodies.push(body);
      if ((body as { otp?: string }).otp !== "482193") {
        return route.fulfill({
          status: 400,
          json: { code: "OTP_INVALID", message: "Invalid verification code." },
        });
      }
      return fulfill(route, { token: "r".repeat(43), expiresIn: 900 });
    }
    if (path.endsWith("/reset")) {
      resetBodies.push(body);
      return fulfill(route, { reset: true });
    }
    return route.fallback();
  });

  await page.setViewportSize({ width: 320, height: 700 });
  await page.goto("/forgot-password", { waitUntil: "domcontentloaded" });
  await page.waitForLoadState("networkidle");
  await expect(page.getByRole("heading", { name: "Forgot your password?" })).toBeVisible();
  await expect(page.getByText(/SMS|mobile number/i)).toHaveCount(0);
  await page.getByLabel("Email address").fill("Sara@Example.com");
  await page.getByRole("button", { name: "Send verification code" }).click();
  await expect(page.getByRole("heading", { name: "Check your email." })).toBeVisible();
  expect(forgotBodies).toEqual([{ email: "sara@example.com" }]);

  const otpInput = page.locator('input[name="otp"]');
  await expect(otpInput).toHaveAttribute("inputmode", "numeric");
  await expect(otpInput).toHaveAttribute("autocomplete", "one-time-code");
  await expect(page.locator(".sf-recovery-otp__cell")).toHaveCount(6);
  await otpInput.focus();
  await page.keyboard.type("12");
  await expect(otpInput).toHaveValue("12");
  await page.keyboard.press("Backspace");
  await expect(otpInput).toHaveValue("1");
  await otpInput.fill("");
  for (const width of [320, 360, 375, 390, 412, 430, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: width < 600 ? 760 : 900 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      ),
    ).toBeLessThanOrEqual(1);
    const group = await page.locator(".sf-recovery-otp__group").boundingBox();
    expect(group).not.toBeNull();
    expect(group!.x).toBeGreaterThanOrEqual(16);
    expect(group!.x + group!.width).toBeLessThanOrEqual(width - 16);
  }

  await page.setViewportSize({ width: 390, height: 844 });
  await otpInput.evaluate((input) => {
    // Firefox intentionally strips clipboardData from script-created
    // ClipboardEvents. Attach the same read-only clipboard contract explicitly
    // so every engine exercises the application's paste transformer instead of
    // accidentally testing a browser security restriction.
    const paste = new Event("paste", { bubbles: true, cancelable: true });
    Object.defineProperty(paste, "clipboardData", {
      value: { getData: (type: string) => (type === "text/plain" ? "11 11-11" : "") },
    });
    input.dispatchEvent(paste);
  });
  await expect(otpInput).toHaveValue("111111");
  await page.getByRole("button", { name: "Verify code" }).click();
  await expect(page.getByRole("alert")).toContainText("incorrect");
  await expect(otpInput).toHaveValue("111111");

  await expect(page.getByRole("button", { name: "Resend code" })).toBeEnabled({ timeout: 2_500 });
  await page.getByRole("button", { name: "Resend code" }).click();
  expect(forgotBodies).toEqual([{ email: "sara@example.com" }, { email: "sara@example.com" }]);
  await expect(otpInput).toHaveValue("");

  await otpInput.fill("482193");
  await page.getByRole("button", { name: "Verify code" }).click();
  expect(verifyBodies.at(-1)).toEqual({ email: "sara@example.com", otp: "482193" });

  await page.getByLabel("New password", { exact: true }).fill("ChangedPass123");
  await page.getByLabel("Confirm new password").fill("ChangedPass124");
  await expect(page.getByText("Passwords do not match.")).toBeVisible();
  await page.getByLabel("Confirm new password").fill("ChangedPass123");
  await page.getByRole("button", { name: "Update password" }).click();

  expect(resetBodies).toEqual([
    {
      email: "sara@example.com",
      token: "r".repeat(43),
      newPassword: "ChangedPass123",
      confirmPassword: "ChangedPass123",
    },
  ]);
  await expect(page.getByRole("heading", { name: "Password changed successfully." })).toBeVisible();
  await expect(page.getByRole("link", { name: "Sign in", exact: true })).toBeVisible();
});

test("expired reset codes remain editable and direct the customer to resend", async ({ page }) => {
  await page.route("**/api/v1/auth/password/**", async (route) => {
    const path = new URL(route.request().url()).pathname;
    if (path.endsWith("/forgot")) {
      return fulfill(route, { ttlSeconds: 600, resendAvailableInSeconds: 1 });
    }
    if (path.endsWith("/verify-otp")) {
      return route.fulfill({
        status: 400,
        json: { code: "OTP_EXPIRED", message: "Your verification code has expired." },
      });
    }
    return route.fallback();
  });

  await page.goto("/forgot-password", { waitUntil: "domcontentloaded" });
  await page.waitForLoadState("networkidle");
  await page.getByLabel("Email address").fill("sara@example.com");
  await page.getByRole("button", { name: "Send verification code" }).click();
  await expect(page.getByRole("heading", { name: "Check your email." })).toBeVisible();
  const otpInput = page.locator('input[name="otp"]');
  await otpInput.fill("482193");
  await page.getByRole("button", { name: "Verify code" }).click();
  await expect(page.getByRole("alert")).toContainText("expired");
  await expect(otpInput).toHaveValue("482193");
  await expect(page.getByRole("button", { name: "Resend code" })).toBeEnabled({ timeout: 2_500 });
});
