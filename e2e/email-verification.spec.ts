import { expect, test } from "@playwright/test";

const pendingRegistration = {
  email: "sara@example.com",
  maskedEmail: "sa**@example.com",
  resendAvailableAt: 0,
};

test.beforeEach(async ({ page }) => {
  await page.addInitScript((pending) => {
    window.sessionStorage.setItem("bioreza.pending-email-verification", JSON.stringify(pending));
  }, pendingRegistration);
});

test("verifies the pending account, clears temporary state, and returns to login", async ({
  page,
}) => {
  await page.route("**/api/v1/auth/verify-email", async (route) => {
    expect(route.request().postDataJSON()).toEqual({
      email: pendingRegistration.email,
      otp: "482193",
    });
    await route.fulfill({
      json: { success: true, data: { verified: true } },
    });
  });

  await page.goto("/verify-email");
  await expect(page.getByRole("heading", { name: "Check your email." })).toBeVisible({
    timeout: 15_000,
  });
  await expect(page.getByText(pendingRegistration.maskedEmail, { exact: false })).toBeVisible();
  await page.getByLabel("Verification code").fill("482193");
  await page.getByRole("button", { name: "Verify email" }).click();

  await expect(page.getByText("Email verified successfully.", { exact: false })).toBeVisible();
  await expect(page).toHaveURL(/\/login\?verified=true/);
  await expect(page.getByText("Email verified successfully. You can now sign in.")).toBeVisible();
  await expect
    .poll(() =>
      page.evaluate(() => window.sessionStorage.getItem("bioreza.pending-email-verification")),
    )
    .toBeNull();
});

test("keeps the verification page open after an incorrect code", async ({ page }) => {
  await page.route("**/api/v1/auth/verify-email", async (route) =>
    route.fulfill({
      status: 400,
      json: {
        statusCode: 400,
        code: "OTP_INVALID",
        message: "Invalid verification code.",
      },
    }),
  );

  await page.goto("/verify-email");
  await page.getByLabel("Verification code").fill("000000");
  await page.getByRole("button", { name: "Verify email" }).click();

  await expect(page.getByRole("alert")).toHaveText("The verification code is incorrect.");
  await expect(page).toHaveURL(/\/verify-email$/);
});
