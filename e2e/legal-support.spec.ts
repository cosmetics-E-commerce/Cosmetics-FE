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

  await page.goto("/privacy-policy");
  await expect(page.getByRole("heading", { name: "Privacy policy" })).toBeVisible();
  await expect(page.getByText(/BioReza never sells, rents, or shares/)).toBeVisible();
});

test("official customer-care pages are discoverable and interactive", async ({ page }) => {
  await page.goto("/faq");
  const paymentQuestion = page.getByRole("button", {
    name: "What are the available payment methods?",
  });
  await expect(paymentQuestion).toHaveAttribute("aria-expanded", "false");
  await paymentQuestion.click();
  await expect(paymentQuestion).toHaveAttribute("aria-expanded", "true");
  await expect(page.getByText("Vodafone Cash")).toBeVisible();

  const faqSchema = await page.locator('script[type="application/ld+json"]').allTextContents();
  expect(faqSchema.some((schema) => schema.includes('"@type":"FAQPage"'))).toBe(true);

  await page.goto("/shipping-policy");
  await expect(page.getByText("1–3 business days")).toBeVisible();
  await expect(page.getByText("3–5 business days")).toBeVisible();
  await expect(page.locator('a[href="tel:+201036836683"]').first()).toBeVisible();

  const footer = page.locator("footer");
  await expect(footer.getByRole("link", { name: "FAQ" })).toHaveAttribute("href", "/faq");
  await expect(footer.getByRole("link", { name: "Returns & exchanges" })).toHaveAttribute(
    "href",
    "/returns",
  );
  await expect(footer.getByRole("link", { name: "Privacy policy" })).toHaveAttribute(
    "href",
    "/privacy-policy",
  );
});

test("legacy public content URLs permanently redirect", async ({ request }) => {
  const privacy = await request.get("/privacy", { maxRedirects: 0 });
  expect(privacy.status()).toBe(308);
  expect(privacy.headers()["location"]).toBe("/privacy-policy");

  const journal = await request.get("/journal", { maxRedirects: 0 });
  expect(journal.status()).toBe(308);
  expect(journal.headers()["location"]).toBe("/about");
});
