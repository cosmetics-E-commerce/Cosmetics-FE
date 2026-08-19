import { expect, test, type Page, type Route } from "@playwright/test";

const variant30 = "30000000-0000-4000-8000-000000000030";
const variant60 = "60000000-0000-4000-8000-000000000060";

type CartItem = ReturnType<typeof cartItem>;

test("cart page decrements positive quantities, removes the final unit, and stays empty after refresh", async ({
  page,
}) => {
  const api = await installCartApi(page, [cartItem(variant30, "30 ml", 5, 50_000)]);

  await page.goto("/cart", { waitUntil: "networkidle" });
  const minus = page.getByRole("button", { name: "Decrease quantity of Radiance Serum" });

  const expectedSubtotals = new Map([
    [4, "2,000"],
    [3, "1,500"],
    [2, "1,000"],
    [1, "500"],
  ]);
  for (const expected of [4, 3, 2, 1]) {
    await minus.click();
    await expect(minus.locator("..").locator("span")).toHaveText(String(expected));
    await expect(page.locator(".header-badge")).toHaveText(String(expected));
    await expect(page.locator("aside")).toContainText(expectedSubtotals.get(expected)!);
  }

  await expect(minus).toBeEnabled();
  await minus.click();
  await expect(page.getByRole("heading", { name: "Your bag is empty" })).toBeVisible();
  await expect(page.locator(".header-badge")).toHaveCount(0);
  await expect(page.getByText("EGP 0", { exact: false })).toHaveCount(0);

  expect(api.patchQuantities).toEqual([4, 3, 2, 1]);
  expect(api.patchQuantities).not.toContain(0);
  expect(api.deletedVariants).toEqual([variant30]);

  await page.reload({ waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { name: "Your bag is empty" })).toBeVisible();
  expect(api.items()).toEqual([]);
});

test("the X button and final-unit minus delete only their exact variant", async ({ page }) => {
  const api = await installCartApi(page, [
    cartItem(variant30, "30 ml", 1, 50_000),
    cartItem(variant60, "60 ml", 2, 20_000),
  ]);

  await page.goto("/cart", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Decrease quantity of Radiance Serum" }).first().click();

  await expect(page.getByText("30 ml", { exact: true })).toHaveCount(0);
  await expect(page.getByText("60 ml", { exact: true })).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Decrease quantity of Radiance Serum" }),
  ).toHaveCount(1);
  expect(api.deletedVariants).toEqual([variant30]);
  expect(api.items()).toMatchObject([{ variantId: variant60, quantity: 2 }]);
  await expect(page.locator(".header-badge")).toHaveText("2");
  await expect(page.locator("aside")).toContainText("400");

  await page.getByRole("button", { name: "Remove Radiance Serum" }).click();
  await expect(page.getByRole("heading", { name: "Your bag is empty" })).toBeVisible();
  expect(api.deletedVariants).toEqual([variant30, variant60]);
});

test("cart drawer removes its final unit for an authenticated cart", async ({ page }) => {
  const api = await installCartApi(page, [cartItem(variant30, "30 ml", 1, 50_000)], {
    authenticated: true,
  });

  await page.goto("/shop", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Shopping bag, 1" }).click();
  const drawer = page.getByRole("dialog");
  const minus = drawer.getByRole("button", { name: "Decrease quantity of Radiance Serum" });

  await expect(minus).toBeEnabled();
  await minus.click();
  await expect(drawer.getByText("Your bag is empty")).toBeVisible();
  await expect(page.locator(".header-badge")).toHaveCount(0);
  expect(api.deletedVariants).toEqual([variant30]);
  expect(api.deleteAuthorization).toEqual(["Bearer test-access-token"]);
});

test("rapid minus activation is serialized per variant", async ({ page }) => {
  const api = await installCartApi(page, [cartItem(variant30, "30 ml", 4, 50_000)], {
    patchDelayMs: 250,
  });

  await page.goto("/cart", { waitUntil: "networkidle" });
  const minus = page.getByRole("button", { name: "Decrease quantity of Radiance Serum" });
  await minus.evaluate((button: HTMLButtonElement) => {
    button.click();
    button.click();
    button.click();
    button.click();
  });

  await expect(minus.locator("..").locator("span")).toHaveText("3");
  expect(api.patchQuantities).toEqual([3]);
  expect(api.deletedVariants).toEqual([]);
  await expect.poll(() => api.items()[0]?.quantity).toBe(3);
});

test("a failed final-unit removal restores the existing cart line", async ({ page }) => {
  const api = await installCartApi(page, [cartItem(variant30, "30 ml", 1, 50_000)], {
    failDelete: true,
  });

  await page.goto("/cart", { waitUntil: "networkidle" });
  const minus = page.getByRole("button", { name: "Decrease quantity of Radiance Serum" });
  await minus.click();

  await expect(minus).toBeVisible();
  await expect(minus.locator("..").locator("span")).toHaveText("1");
  await expect(minus).toBeEnabled();
  expect(api.deletedVariants).toEqual([variant30]);
  expect(api.items()).toMatchObject([{ variantId: variant30, quantity: 1 }]);
});

test("Undo restores a successfully removed cart line", async ({ page }) => {
  const api = await installCartApi(page, [cartItem(variant30, "30 ml", 1, 50_000)]);

  await page.goto("/cart", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Decrease quantity of Radiance Serum" }).click();
  await expect(page.getByRole("heading", { name: "Your bag is empty" })).toBeVisible();

  await page.getByRole("button", { name: "Undo" }).click();
  const minus = page.getByRole("button", { name: "Decrease quantity of Radiance Serum" });
  await expect(minus).toBeVisible();
  await expect(minus.locator("..").locator("span")).toHaveText("1");
  await expect(page.locator(".header-badge")).toHaveText("1");
  expect(api.addedItems).toEqual([{ variantId: variant30, quantity: 1 }]);

  await page.reload({ waitUntil: "networkidle" });
  await expect(minus).toBeVisible();
});

test("Undo remains interactive while the cart drawer is open", async ({ page }) => {
  const api = await installCartApi(page, [cartItem(variant30, "30 ml", 1, 50_000)]);

  await page.goto("/shop", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Shopping bag, 1" }).click();
  const drawer = page.getByRole("dialog");
  await drawer.getByRole("button", { name: "Decrease quantity of Radiance Serum" }).click();
  await expect(drawer.getByText("Your bag is empty")).toBeVisible();

  await page.getByRole("button", { name: "Undo" }).click();
  await expect(
    drawer.getByRole("button", { name: "Decrease quantity of Radiance Serum" }),
  ).toBeVisible();
  expect(api.addedItems).toEqual([{ variantId: variant30, quantity: 1 }]);
});

function cartItem(variantId: string, size: string, quantity: number, unitPrice: number) {
  return {
    variantId,
    productId: "10000000-0000-4000-8000-000000000001",
    categoryId: "20000000-0000-4000-8000-000000000001",
    brandId: null,
    slug: "radiance-serum",
    productNameEn: "Radiance Serum",
    productNameAr: "سيروم الإشراقة",
    variantNameEn: size,
    variantNameAr: size,
    variantOptions: [],
    sku: `SERUM-${size.replace(/\D/g, "")}`,
    imageUrl: "/favicon.png",
    unitPrice,
    quantity,
    lineTotal: unitPrice * quantity,
    discount: 0,
    discountedLineTotal: unitPrice * quantity,
    available: 20,
    maxAvailable: 20,
    status: "AVAILABLE" as const,
    issues: [],
  };
}

async function installCartApi(
  page: Page,
  initialItems: CartItem[],
  options: { authenticated?: boolean; patchDelayMs?: number; failDelete?: boolean } = {},
) {
  let items = initialItems.map((item) => ({ ...item }));
  const itemTemplates = new Map(initialItems.map((item) => [item.variantId, { ...item }]));
  const patchQuantities: number[] = [];
  const deletedVariants: string[] = [];
  const deleteAuthorization: Array<string | null> = [];
  const addedItems: Array<{ variantId: string; quantity: number }> = [];

  if (options.authenticated) {
    await page.addInitScript(() => {
      window.localStorage.setItem("bioreza.csrf", "x".repeat(32));
    });
    await page.route("**/api/v1/auth/refresh", (route) =>
      fulfill(route, {
        user: {
          id: "11111111-1111-4111-8111-111111111111",
          firstName: "Sara",
          lastName: "Ali",
          phone: "01012345678",
          email: "sara@example.com",
          role: "CLIENT",
          permissions: [],
        },
        tokens: { accessToken: "test-access-token", expiresIn: 900 },
        csrfToken: "y".repeat(32),
      }),
    );
    await page.route("**/api/v1/wishlist", (route) =>
      fulfill(route, { items: [], totalItems: 0, updatedAt: null }),
    );
  }

  await page.route("**/api/v1/cart**", async (route) => {
    const request = route.request();
    const path = new URL(request.url()).pathname.replace(/^\/api\/v1/, "");
    const method = request.method();

    if ((path === "/cart" && method === "GET") || path === "/cart/merge") {
      return fulfill(route, cartResponse(items, options.authenticated ? "USER" : "GUEST"));
    }

    if (path === "/cart/items" && method === "POST") {
      const input = request.postDataJSON() as { variantId: string; quantity: number };
      addedItems.push(input);
      const current = items.find((item) => item.variantId === input.variantId);
      const template = current ?? itemTemplates.get(input.variantId);
      if (!template) throw new Error(`Missing fixture for ${input.variantId}`);
      const quantity = (current?.quantity ?? 0) + input.quantity;
      const next = {
        ...template,
        quantity,
        lineTotal: template.unitPrice * quantity,
        discountedLineTotal: template.unitPrice * quantity,
      };
      items = current
        ? items.map((item) => (item.variantId === input.variantId ? next : item))
        : [...items, next];
      return fulfill(route, cartResponse(items, options.authenticated ? "USER" : "GUEST"));
    }

    const itemPath = path.match(/^\/cart\/items\/(.+)$/);
    if (itemPath && method === "PATCH") {
      const quantity = Number(request.postDataJSON()["quantity"]);
      patchQuantities.push(quantity);
      if (options.patchDelayMs) await delay(options.patchDelayMs);
      items = items.map((item) =>
        item.variantId === itemPath[1]
          ? {
              ...item,
              quantity,
              lineTotal: item.unitPrice * quantity,
              discountedLineTotal: item.unitPrice * quantity,
            }
          : item,
      );
      return fulfill(route, cartResponse(items, options.authenticated ? "USER" : "GUEST"));
    }

    if (itemPath && method === "DELETE") {
      deletedVariants.push(itemPath[1]!);
      deleteAuthorization.push(request.headers()["authorization"] ?? null);
      if (options.failDelete) {
        return route.fulfill({
          status: 500,
          contentType: "application/json",
          body: JSON.stringify({
            success: false,
            error: { code: "CART_REMOVE_FAILED", message: "Could not remove cart item." },
          }),
        });
      }
      items = items.filter((item) => item.variantId !== itemPath[1]);
      return fulfill(route, cartResponse(items, options.authenticated ? "USER" : "GUEST"));
    }

    return route.continue();
  });

  return {
    patchQuantities,
    deletedVariants,
    deleteAuthorization,
    addedItems,
    items: () => items,
  };
}

function cartResponse(items: CartItem[], owner: "GUEST" | "USER") {
  const subtotal = items.reduce((total, item) => total + item.lineTotal, 0);
  return {
    cartId: owner === "GUEST" ? "40000000-0000-4000-8000-000000000001" : null,
    owner,
    items,
    subtotal,
    discountTotal: 0,
    estimatedTotal: subtotal,
    totalSavings: 0,
    couponCode: null,
    appliedPromotions: [],
    promotionMessages: [],
    giftOptions: [],
    totalQuantity: items.reduce((total, item) => total + item.quantity, 0),
    hasIssues: false,
    updatedAt: new Date().toISOString(),
  };
}

function fulfill(route: Route, data: unknown) {
  return route.fulfill({
    status: 200,
    contentType: "application/json",
    body: JSON.stringify({ success: true, data }),
  });
}

function delay(milliseconds: number) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}
