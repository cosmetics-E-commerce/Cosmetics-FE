import { expect, test, type Page } from "@playwright/test";

const authUser = {
  id: "11111111-1111-4111-8111-111111111111",
  firstName: "Nehad",
  lastName: "Moghrabi",
  phone: "01012345678",
  email: "nehad@example.com",
  role: "CLIENT",
  permissions: [],
};

const baseProfile = {
  ...authUser,
  status: "ACTIVE",
  isVip: false,
  profileImage: null as string | null,
  gender: null,
  dateOfBirth: null,
  phoneVerified: true,
  emailVerified: true,
  createdAt: "2026-08-01T00:00:00.000Z",
  updatedAt: "2026-08-17T00:00:00.000Z",
  deletedAt: null,
};

async function mockAuthenticatedAccount(page: Page, initialProfile = baseProfile) {
  let profile = { ...initialProfile };

  await page.addInitScript(() => {
    window.localStorage.setItem("bioreza.csrf", "x".repeat(32));
  });
  await page.route("**/profile-photo.webp", (route) =>
    route.fulfill({
      contentType: "image/png",
      body: Buffer.from(
        "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAusB9Y9Z7xkAAAAASUVORK5CYII=",
        "base64",
      ),
    }),
  );
  await page.route("**/missing-profile.webp", (route) => route.fulfill({ status: 404 }));
  await page.route("**/api/v1/**", async (route) => {
    const request = route.request();
    const path = new URL(request.url()).pathname;
    const fulfill = (data: unknown) => route.fulfill({ json: { success: true, data } });

    if (path.endsWith("/auth/refresh")) {
      return fulfill({
        user: authUser,
        tokens: { accessToken: "test-access-token", expiresIn: 900 },
        csrfToken: "y".repeat(32),
      });
    }
    if (path.endsWith("/cart/merge") || path.endsWith("/cart")) {
      return fulfill({
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
    if (path.endsWith("/users/me/profile-image") && request.method() === "POST") {
      profile = { ...profile, profileImage: "https://assets.example.com/profile-photo.webp" };
      return fulfill(profile);
    }
    if (path.endsWith("/users/me") && request.method() === "PATCH") {
      const body = request.postDataJSON() as { profileImage?: string | null };
      profile = { ...profile, ...body };
      return fulfill(profile);
    }
    if (path.endsWith("/users/me")) return fulfill(profile);
    if (path.endsWith("/users/addresses") || path.endsWith("/orders")) return fulfill([]);
    if (path.endsWith("/wishlist")) {
      return fulfill({ items: [], collections: [], totalItems: 0, updatedAt: null });
    }
    if (path.endsWith("/reviews/mine")) return fulfill({ items: [], total: 0 });

    return route.fulfill({ status: 404, json: { code: "NOT_MOCKED", message: path } });
  });
}

test("uses one initials identity and switches cleanly through upload and removal", async ({
  page,
}) => {
  await mockAuthenticatedAccount(page);
  await page.goto("/account?section=settings");
  await expect(page.getByRole("heading", { name: "Hello, Nehad." })).toBeVisible();

  const initials = page.locator(".customer-avatar__initials");
  await expect(initials.first()).toHaveText("NM");
  expect(await initials.allTextContents()).toEqual(expect.arrayContaining(["NM", "NM"]));
  await expect(page.locator(".customer-avatar__image")).toHaveCount(0);

  await page
    .getByLabel("Choose a new profile photo")
    .setInputFiles({ name: "profile.png", mimeType: "image/png", buffer: Buffer.from("image") });
  await expect(page.getByRole("button", { name: "Remove profile photo" })).toBeVisible();
  await expect(page.locator(".account-settings__avatar .customer-avatar__image")).toHaveAttribute(
    "data-loaded",
    "true",
  );

  await page.getByRole("button", { name: "Remove profile photo" }).click();
  await expect(page.locator(".account-settings__avatar .customer-avatar__initials")).toHaveText(
    "NM",
  );
  await expect(page.getByRole("button", { name: "Remove profile photo" })).toHaveCount(0);

  for (const width of [320, 375, 430]) {
    await page.setViewportSize({ width, height: 820 });
    await expect
      .poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth))
      .toBe(true);
    const box = await page.locator(".account-settings__avatar").boundingBox();
    expect(box?.width).toBeCloseTo(box?.height ?? 0, 1);
  }
});

test("broken legacy imagery falls back to Arabic initials without a broken icon", async ({
  page,
}) => {
  await mockAuthenticatedAccount(page, {
    ...baseProfile,
    firstName: "محمد",
    lastName: "أحمد",
    profileImage: "https://assets.example.com/missing-profile.webp",
  });
  await page.goto("/account?lang=ar");

  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  await expect(page.locator(".account-profile-avatar .customer-avatar__initials")).toHaveText("مأ");
  await expect(page.locator(".account-profile-avatar img")).toHaveCount(0);
});
