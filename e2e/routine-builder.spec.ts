import { expect, test, type Page } from "@playwright/test";

const sessionId = "10000000-0000-4000-8000-000000000001";
const stepId = "20000000-0000-4000-8000-000000000001";
const primary = {
  productId: "30000000-0000-4000-8000-000000000001",
  variantId: "40000000-0000-4000-8000-000000000001",
  slug: "cleanser-a",
  name: "Balanced Cleanser",
  variantName: "50ml",
  imageUrl: null,
  price: 12500,
  compareAtPrice: null,
  stock: 10,
  brandName: "Bio Test",
  explanation: "Selected because it matches the priorities you chose.",
};
const alternative = {
  ...primary,
  productId: "30000000-0000-4000-8000-000000000002",
  variantId: "40000000-0000-4000-8000-000000000002",
  slug: "cleanser-b",
  name: "Gentle Cleanser",
  price: 14500,
};

test.beforeEach(async ({ page }) => mockRoutineApi(page));

test("completes, swaps and revalidates a routine before cart insertion", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "chromium", "Desktop workflow");
  await page.goto("/routine");
  await expect(page.getByRole("heading", { name: "Build Your Routine" })).toBeVisible();
  await page.getByRole("button", { name: /Build my routine/ }).click();
  await page.getByRole("button", { name: /Simple/ }).click();
  await page.getByRole("button", { name: /Build my routine/ }).click();
  await expect(page.getByRole("heading", { name: "Your BioReza Routine" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Balanced Cleanser" })).toBeVisible();
  await page.getByText("Swap product").click();
  await page.getByRole("button", { name: /Gentle Cleanser/ }).click();
  await expect(page.getByRole("heading", { name: "Gentle Cleanser" })).toBeVisible();
  await page.getByRole("button", { name: /Add selected to bag/ }).click();
  await expect
    .poll(async () =>
      Number(await page.evaluate(() => sessionStorage.getItem("routine-cart-adds") ?? "0")),
    )
    .toBe(1);
});

test("keeps the guided journey readable and RTL-native on mobile Arabic", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "Mobile RTL workflow");
  await page.goto("/routine?lang=ar");
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  await expect(page.getByRole("heading", { name: "ابني روتينك" })).toBeVisible();
  await page.getByRole("button", { name: /ابدئي بناء روتينك/ }).click();
  await expect(page.getByText("1 / 1")).toBeVisible();
  await page.getByRole("button", { name: /بسيط/ }).click();
  await page.getByRole("button", { name: /كوّني روتيني/ }).click();
  await expect(page.getByRole("heading", { name: "روتين BioReza الخاص بك" })).toBeVisible();
});

async function mockRoutineApi(page: Page) {
  await page.route("**/api/v1/routine-builder**", async (route) => {
    const request = route.request();
    const path = new URL(request.url()).pathname;
    if (path.endsWith("/events")) return route.fulfill({ status: 201, json: { ok: true } });
    if (path.endsWith("/sessions"))
      return route.fulfill({ status: 201, json: envelope({ sessionId, ...snapshot() }) });
    if (path.endsWith("/evaluate")) {
      const payload = request.postDataJSON() as {
        locale: "en" | "ar";
        selectedVariants?: Record<string, string>;
      };
      const swapped = payload.selectedVariants?.[stepId] === alternative.variantId;
      return route.fulfill({ status: 201, json: envelope(result(payload.locale, swapped)) });
    }
    return route.fulfill({ status: 200, json: envelope(snapshot()) });
  });
  await page.route("**/api/v1/cart/items", async (route) => {
    await page.evaluate(() =>
      sessionStorage.setItem(
        "routine-cart-adds",
        String(Number(sessionStorage.getItem("routine-cart-adds") ?? "0") + 1),
      ),
    );
    const body = route.request().postDataJSON() as { variantId: string; quantity: number };
    const product = body.variantId === alternative.variantId ? alternative : primary;
    await route.fulfill({
      status: 201,
      json: envelope({
        id: "50000000-0000-4000-8000-000000000001",
        items: [
          {
            variantId: product.variantId,
            productId: product.productId,
            categoryId: "",
            categoryIds: [],
            brandId: null,
            slug: product.slug,
            productNameEn: product.name,
            productNameAr: product.name,
            variantNameEn: product.variantName,
            variantNameAr: product.variantName,
            variantOptions: [],
            sku: "TEST",
            imageUrl: null,
            unitPrice: product.price,
            quantity: 1,
            lineTotal: product.price,
            discount: 0,
            discountedLineTotal: product.price,
            available: 10,
            maxAvailable: 10,
            status: "AVAILABLE",
            issues: [],
          },
        ],
        subtotal: product.price,
        discountTotal: 0,
        estimatedTotal: product.price,
        totalSavings: 0,
        couponCode: null,
        appliedPromotions: [],
        promotionMessages: [],
        giftOptions: [],
        totalQuantity: 1,
        hasIssues: false,
        updatedAt: new Date().toISOString(),
      }),
    });
  });
}

function snapshot() {
  return {
    versionId: "60000000-0000-4000-8000-000000000001",
    version: 3,
    publishedAt: "2026-08-28T00:00:00.000Z",
    config: {
      schemaVersion: 1,
      title: { en: "Build Your Routine", ar: "ابني روتينك" },
      introduction: {
        en: "A personalized routine built around your preferences.",
        ar: "روتين مخصص مبني على تفضيلاتك.",
      },
      estimatedMinutes: 2,
      startLabel: { en: "Build my routine", ar: "ابدئي بناء روتينك" },
      resultTitle: { en: "Your BioReza Routine", ar: "روتين BioReza الخاص بك" },
      disclaimer: { en: "Guidance only", ar: "إرشاد فقط" },
      noResult: { en: "No result", ar: "لا نتيجة" },
      questions: [
        {
          id: "70000000-0000-4000-8000-000000000001",
          key: "complexity",
          type: "SINGLE_CHOICE",
          label: { en: "How much time would you like?", ar: "كم من الوقت تفضلين؟" },
          description: { en: "Choose a routine size.", ar: "اختاري حجم الروتين." },
          helpText: { en: "You can change this later.", ar: "يمكنك تغيير ذلك لاحقاً." },
          required: true,
          enabled: true,
          order: 0,
          visibility: null,
          minSelections: 0,
          maxSelections: 1,
          scale: null,
          answers: [
            {
              id: "80000000-0000-4000-8000-000000000001",
              key: "simple",
              label: { en: "Simple", ar: "بسيط" },
              description: { en: "A concise routine", ar: "روتين مختصر" },
              order: 0,
              enabled: true,
            },
          ],
        },
      ],
      concerns: [],
      roles: [
        {
          id: "90000000-0000-4000-8000-000000000001",
          key: "cleanse",
          label: { en: "Cleanse", ar: "تنظيف" },
        },
      ],
    },
  };
}
function result(locale: "en" | "ar", swapped: boolean) {
  const product = swapped ? alternative : primary;
  const localized =
    locale === "ar"
      ? {
          ...product,
          name: swapped ? "منظف لطيف" : "منظف متوازن",
          variantName: "٥٠ مل",
          explanation: "تم اختياره وفقاً لأولوياتك.",
        }
      : product;
  return {
    sessionId,
    version: 3,
    templateKey: "simple",
    answers: { complexity: "simple" },
    profileSummary: [locale === "ar" ? "التعقيد: بسيط" : "complexity: simple"],
    morningSteps: [
      {
        id: stepId,
        roleKey: "cleanse",
        roleLabel: locale === "ar" ? "تنظيف" : "Cleanse",
        period: "AM",
        order: 0,
        required: true,
        product: localized,
        alternatives: [swapped ? primary : alternative],
        warnings: [],
      },
    ],
    eveningSteps: [],
    warnings: [],
    noResult: false,
    noResultMessage: null,
    total: localized.price,
  };
}
function envelope<T>(data: T) {
  return {
    success: true,
    data,
    meta: { requestId: "routine-e2e", timestamp: new Date().toISOString() },
  };
}
