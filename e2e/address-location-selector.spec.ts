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

async function mockAddressAccount(page: Page) {
  await page.addInitScript(() => {
    window.localStorage.setItem("bioreza.csrf", "x".repeat(32));
  });
  await page.route("**/api/v1/**", (route) => {
    const request = route.request();
    const url = new URL(request.url());
    const path = url.pathname;
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
    if (path.endsWith("/users/me")) {
      return fulfill({
        ...authUser,
        status: "ACTIVE",
        isVip: false,
        profileImage: null,
        gender: null,
        dateOfBirth: null,
        phoneVerified: true,
        emailVerified: true,
        createdAt: "2026-08-01T00:00:00.000Z",
        updatedAt: "2026-08-17T00:00:00.000Z",
        deletedAt: null,
      });
    }
    if (path.endsWith("/users/addresses") || path.endsWith("/orders")) return fulfill([]);
    if (path.endsWith("/wishlist")) {
      return fulfill({ items: [], collections: [], totalItems: 0, updatedAt: null });
    }
    if (path.endsWith("/reviews/mine")) return fulfill({ items: [], total: 0 });
    if (path.endsWith("/shipping/locations/governorates")) {
      return fulfill([
        { id: "EG01", code: "EG01", name: "Cairo", nameAr: "القاهرة" },
        { id: "EG21", code: "EG21", name: "Giza", nameAr: "الجيزة" },
      ]);
    }
    if (path.endsWith("/shipping/locations/cities")) {
      return fulfill(
        url.searchParams.get("governorate") === "EG01"
          ? [{ id: "EG0126", name: "Nasr City", nameAr: "مدينة نصر" }]
          : [{ id: "EG2102", name: "Al-Aguza", nameAr: "العجوزة" }],
      );
    }
    if (path.endsWith("/shipping/locations/areas")) {
      return fulfill(
        url.searchParams.get("city") === "EG0126"
          ? [
              { id: "EG012601", name: "El-Tawfiq", nameAr: "التوفيق" },
              { id: "EG012602", name: "El-Wafaa and El-Amal", nameAr: "الوفاء والأمل" },
            ]
          : [{ id: "EG210201", name: "Mit Akaba", nameAr: "ميت عقبة" }],
      );
    }

    return route.fulfill({ status: 404, json: { code: "NOT_MOCKED", message: path } });
  });
}

test("uses a searchable dependent location sheet on an iPhone-sized viewport", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await mockAddressAccount(page);
  await page.goto("/account?section=addresses&lang=ar");

  await expect(page.locator('select[name="bostaGovernorateId"]')).toHaveCount(0);
  const governorate = page.getByRole("combobox", { name: "المحافظة" });
  await expect(governorate).toBeEnabled();
  await governorate.click();

  const dialog = page.getByRole("dialog", { name: "المحافظة" });
  await expect(dialog).toBeVisible();
  const sheet = await dialog.boundingBox();
  expect(sheet?.x).toBe(0);
  expect(sheet?.width).toBeGreaterThanOrEqual(380);
  expect((sheet?.y ?? 0) + (sheet?.height ?? 0)).toBeGreaterThanOrEqual(842);

  await page.getByPlaceholder(/ابحث عن المحافظة/).fill("قاهره");
  await page.getByText("القاهرة", { exact: true }).click();

  const city = page.getByRole("combobox", { name: "المدينة / المركز" });
  await expect(city).toBeEnabled();
  await city.click();
  await page.getByText("مدينة نصر", { exact: true }).click();

  const area = page.getByRole("combobox", { name: "المنطقة / الحي" });
  await expect(area).toBeEnabled();
  await area.click();
  await page.getByPlaceholder(/ابحث عن المنطقة/).fill("توفيق");
  await expect(page.getByText("التوفيق", { exact: true })).toBeVisible();
  await page.getByText("التوفيق", { exact: true }).click();

  await governorate.click();
  await page.getByText("الجيزة", { exact: true }).click();
  await expect(city).toContainText("اختر المدينة");
  await expect(area).toBeDisabled();
});
