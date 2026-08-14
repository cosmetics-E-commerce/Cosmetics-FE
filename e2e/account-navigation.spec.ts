import { expect, test } from "@playwright/test";

const user = {
  id: "11111111-1111-4111-8111-111111111111",
  firstName: "Sara",
  lastName: "Ali",
  phone: "01012345678",
  email: "sara@example.com",
  role: "CLIENT",
  permissions: [],
};

test("mobile account navigation is a native horizontal-only rail", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "This regression is specific to mobile gestures");

  await page.addInitScript(() => {
    window.localStorage.setItem("bioreza.csrf", "x".repeat(32));
  });
  await page.route("**/api/v1/**", async (route) => {
    const request = route.request();
    const path = new URL(request.url()).pathname;
    const fulfill = (data: unknown) => route.fulfill({ json: { success: true, data } });

    if (path.endsWith("/auth/refresh")) {
      return fulfill({
        user,
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
    if (path.endsWith("/users/me")) return fulfill(user);
    if (path.endsWith("/users/addresses") || path.endsWith("/orders")) return fulfill([]);
    if (path.endsWith("/wishlist")) {
      return fulfill({ items: [], collections: [], totalItems: 0, updatedAt: null });
    }
    if (path.endsWith("/reviews/mine")) return fulfill({ items: [], total: 0 });

    return route.fulfill({ status: 404, json: { code: "NOT_MOCKED", message: path } });
  });

  await page.goto("/account");
  await expect(page.getByRole("heading", { name: "Hello, Sara." })).toBeVisible();

  const nav = page.getByRole("navigation", { name: "Account sections" });
  const rail = nav.locator("ul");
  const initial = await rail.evaluate((element) => {
    const style = getComputedStyle(element);
    const navElement = element.closest<HTMLElement>(".account-nav")!;
    const navStyle = getComputedStyle(navElement);
    return {
      flexWrap: style.flexWrap,
      navTransform: navStyle.transform,
      overflowX: style.overflowX,
      overflowY: style.overflowY,
      scrollTop: element.scrollTop,
      touchAction: style.touchAction,
      childrenDoNotShrink: [...element.children].every(
        (child) => getComputedStyle(child).flexShrink === "0",
      ),
    };
  });
  expect(initial).toMatchObject({
    flexWrap: "nowrap",
    navTransform: "none",
    overflowX: "auto",
    overflowY: "hidden",
    scrollTop: 0,
    childrenDoNotShrink: true,
  });
  expect(initial.touchAction).toBe("manipulation");

  const navDocumentTop = await nav.evaluate(
    (element) => element.getBoundingClientRect().top + window.scrollY,
  );
  const navViewportTop = await nav.evaluate((element) => element.getBoundingClientRect().top);
  const pageYBeforeGesture = await page.evaluate(() => window.scrollY);
  const railBox = await rail.boundingBox();
  if (!railBox) throw new Error("Account navigation rail is not visible");

  const touch = await page.context().newCDPSession(page);
  const startX = railBox.x + railBox.width - 30;
  const startY = railBox.y + railBox.height / 2;
  const navTopsDuringDiagonalSwipe = [navViewportTop];
  await touch.send("Input.dispatchTouchEvent", {
    type: "touchStart",
    touchPoints: [{ x: startX, y: startY, radiusX: 2, radiusY: 2, force: 1 }],
  });
  for (let step = 1; step <= 5; step += 1) {
    await touch.send("Input.dispatchTouchEvent", {
      type: "touchMove",
      touchPoints: [
        {
          x: startX - step * 32,
          y: startY + step * 4,
          radiusX: 2,
          radiusY: 2,
          force: 1,
        },
      ],
    });
    navTopsDuringDiagonalSwipe.push(
      await nav.evaluate((element) => element.getBoundingClientRect().top),
    );
  }
  await touch.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });

  await expect.poll(() => rail.evaluate((element) => element.scrollLeft)).not.toBe(0);
  expect(await rail.evaluate((element) => element.scrollTop)).toBe(0);
  expect(await page.evaluate(() => window.scrollY)).toBe(pageYBeforeGesture);
  expect(
    Math.max(...navTopsDuringDiagonalSwipe) - Math.min(...navTopsDuringDiagonalSwipe),
  ).toBeLessThan(0.5);
  expect(
    await nav.evaluate((element) => element.getBoundingClientRect().top + window.scrollY),
  ).toBeCloseTo(navDocumentTop, 4);

  await page.waitForTimeout(250);
  const railXBeforeVerticalSwipe = await rail.evaluate((element) => element.scrollLeft);
  const pageYBeforeVerticalSwipe = await page.evaluate(() => window.scrollY);
  await touch.send("Input.dispatchTouchEvent", {
    type: "touchStart",
    touchPoints: [{ x: startX - 80, y: startY, radiusX: 2, radiusY: 2, force: 1 }],
  });
  for (let step = 1; step <= 4; step += 1) {
    await touch.send("Input.dispatchTouchEvent", {
      type: "touchMove",
      touchPoints: [
        {
          x: startX - 80,
          y: startY - step * 34,
          radiusX: 2,
          radiusY: 2,
          force: 1,
        },
      ],
    });
  }
  await touch.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
  await expect
    .poll(() => page.evaluate(() => window.scrollY))
    .toBeGreaterThan(pageYBeforeVerticalSwipe);
  expect(await rail.evaluate((element) => element.scrollTop)).toBe(0);
  expect(await rail.evaluate((element) => element.scrollLeft)).toBeCloseTo(
    railXBeforeVerticalSwipe,
    0,
  );
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "auto" }));

  await page.getByRole("button", { name: "Overview" }).click();
  await rail.evaluate((element) => element.scrollTo({ left: 0, behavior: "auto" }));
  const pageYBeforeSelection = await page.evaluate(() => window.scrollY);
  // Dispatch directly so Playwright does not call its own two-axis
  // scroll-into-view routine before clicking the horizontally hidden tab.
  await page.getByRole("button", { name: "Settings" }).dispatchEvent("click");
  await expect(page).toHaveURL(/section=settings/);
  await expect(page.getByRole("button", { name: "Settings" })).toHaveAttribute(
    "aria-current",
    "page",
  );
  await expect
    .poll(() => rail.evaluate((element) => element.scrollLeft), { timeout: 3_000 })
    .not.toBe(0);
  expect(await page.evaluate(() => window.scrollY)).toBe(pageYBeforeSelection);
  expect(await rail.evaluate((element) => element.scrollTop)).toBe(0);

  await page.goto("/account?section=settings&lang=ar");
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  const rtlNav = page.getByRole("navigation", { name: "أقسام الحساب" });
  const rtlRail = rtlNav.locator("ul");
  const rtlActive = rtlRail.getByRole("button", { name: "الإعدادات" });
  await expect(rtlActive).toHaveAttribute("aria-current", "page");
  await expect
    .poll(async () => {
      const [container, active] = await Promise.all([
        rtlRail.boundingBox(),
        rtlActive.boundingBox(),
      ]);
      return Boolean(
        container &&
        active &&
        active.x >= container.x - 1 &&
        active.x + active.width <= container.x + container.width + 1,
      );
    })
    .toBe(true);
  expect(await rtlRail.evaluate((element) => element.scrollTop)).toBe(0);
  expect(await rtlNav.evaluate((element) => getComputedStyle(element).transform)).toBe("none");
});
