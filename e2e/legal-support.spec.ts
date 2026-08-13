import { expect, test } from "@playwright/test";

test("legal surface and support submission work", async ({ page }) => {
  await page.route("**/api/v1/store/support/requests", async (route) =>
    route.fulfill({
      json: {
        success: true,
        data: {
          id: "11111111-1111-4111-8111-111111111111",
          status: "OPEN",
          createdAt: new Date().toISOString(),
        },
      },
    }),
  );
  await page.goto("/contact");
  await expect(page.getByRole("heading", { name: "Send a message" })).toBeVisible();
  await page.getByLabel("Name").fill("Sara Ali");
  await page.getByLabel("Email", { exact: true }).fill("sara@example.com");
  await page.getByLabel("Subject").fill("Order delivery");
  await page.getByLabel("Message").fill("Please help me locate my order delivery.");
  await page.getByRole("button", { name: "Send request" }).click();
  await expect(page.getByText(/Request received/)).toBeVisible();

  await page.goto("/privacy");
  await expect(page.getByRole("heading", { name: "Privacy policy" })).toBeVisible();
  await expect(page.getByText(/Payment-proof images/)).toBeVisible();
});
