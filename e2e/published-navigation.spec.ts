import { expect, test } from "@playwright/test";

test("published Brands is a searchable alphabetical directory in English and Arabic", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "chromium", "The primary menu is desktop-only");
  await page.goto("/about");
  const navigation = page.getByRole("navigation", { name: "Primary" });
  await navigation.getByRole("button", { name: "Brands", exact: true }).hover();
  const directory = page.locator(".published-brand-directory");
  await expect(directory).toBeVisible();
  await expect(directory.locator(".published-brand-directory__group > h3")).toHaveText([
    "A",
    "B",
    "C",
    "E",
  ]);
  await expect(
    directory.locator(".published-brand-directory__group").first().getByRole("link"),
  ).toHaveText(["Anua", "Atelier Nude"]);
  await directory.getByPlaceholder("Search brands…").fill("cer");
  await expect(directory.getByRole("link", { name: "CeraVe" })).toBeVisible();
  await expect(directory.getByRole("link", { name: "COSRX" })).toHaveCount(0);
  await directory.getByRole("link", { name: "CeraVe" }).click();
  await expect(page).toHaveURL(/\/brands\/cerave$/);

  await page.goto("/about?lang=ar");
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  await page
    .getByRole("navigation", { name: "Primary" })
    .getByRole("button", { name: "العلامات", exact: true })
    .hover();
  await expect(page.locator(".published-brand-directory")).toHaveAttribute("dir", "rtl");
  await expect(page.getByRole("link", { name: "Anua" })).toBeVisible();
});

test("published navigation renders resolved categories in English and Arabic", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "chromium", "The primary menu is desktop-only");
  await page.goto("/about");
  const primaryNavigation = page.getByRole("navigation", { name: "Primary" });
  const categoriesTrigger = primaryNavigation.getByRole("button", {
    name: "Categories",
    exact: true,
  });
  await categoriesTrigger.hover();
  await expect(categoriesTrigger).toHaveAttribute("data-state", "open");
  const classicMenu = page.locator('.published-mega[data-menu-style="classic"]');
  await expect(classicMenu).toBeVisible();
  await expect(classicMenu.getByText("All Categories", { exact: true })).toBeVisible();
  await expect(classicMenu.getByText("View all products", { exact: true })).toBeVisible();
  await expect(classicMenu.locator('[data-presentation="utility"]')).toHaveCount(1);
  const classicContent = classicMenu.locator('[data-separators="true"]');
  await expect(classicContent.locator(".published-mega__column")).toHaveCount(6);
  await expect(classicContent.locator(".published-mega__entity-list.is-rail")).toBeVisible();
  await expect(page.getByRole("link", { name: /Face Care/ })).toBeVisible();
  await expect(page.getByRole("link", { name: "Cleansers" })).toBeVisible();
  await expect(classicMenu).toHaveScreenshot("classic-categories-mega-menu.png", {
    animations: "disabled",
    // Playwright's Linux runners rasterize the editorial display font slightly
    // differently even after document.fonts is ready. Keep the tolerance below
    // a layout-level change while ignoring glyph-edge antialiasing noise.
    maxDiffPixelRatio: 0.01,
  });

  await page.goto("/about?lang=ar");
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  const arabicNavigation = page.getByRole("navigation", { name: "Primary" });
  const arabicCategoriesTrigger = arabicNavigation.getByRole("button", {
    name: "الفئات",
    exact: true,
  });
  await arabicCategoriesTrigger.hover();
  await expect(page.getByRole("link", { name: /العناية بالوجه/ })).toBeVisible();
  await expect(page.getByRole("link", { name: "منظفات الوجه" })).toBeVisible();
});

test("published categories remain usable in the mobile menu", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "This assertion targets the mobile drawer");
  await page.goto("/about", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Open menu", exact: true }).click();
  const mobileNavigation = page.getByRole("dialog", { name: "Open menu" });
  await mobileNavigation.getByRole("button", { name: "Categories", exact: true }).click();
  await expect(mobileNavigation.getByRole("link", { name: /Face Care/ })).toBeVisible();
  await mobileNavigation
    .locator(".published-mobile-category-group > summary")
    .filter({ hasText: "Face Care" })
    .click();
  await expect(mobileNavigation.getByRole("link", { name: "Cleansers" })).toBeVisible();
});

test("multi-category navigation stays compact, content-driven, and interactive", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "chromium", "The primary menu is desktop-only");

  for (const viewport of [
    { width: 1366, height: 768 },
    { width: 1440, height: 900 },
    { width: 1920, height: 1080 },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto("/about", { waitUntil: "networkidle" });
    const trigger = page
      .getByRole("navigation", { name: "Primary" })
      .getByRole("button", { name: "Departments", exact: true });
    await trigger.hover();
    const menu = page.locator('.published-mega[data-category-columns="3"]');
    await expect(menu).toBeVisible();
    await menu.getByRole("link", { name: "Body care 1" }).hover();
    await expect(trigger).toHaveAttribute("data-state", "open");
    await expect(menu.getByRole("link", { name: "View all" })).toHaveCount(3);
    await expect(menu.getByRole("link", { name: "View all" }).nth(0)).toHaveAttribute(
      "href",
      "/categories/body-care",
    );

    const geometry = await menu.evaluate((element) => {
      const rect = element.getBoundingClientRect();
      const columns = [...element.querySelectorAll<HTMLElement>(".published-mega__column")].map(
        (column) => {
          const bounds = column.getBoundingClientRect();
          return { top: bounds.top, bottom: bounds.bottom, height: bounds.height };
        },
      );
      return {
        width: rect.width,
        height: rect.height,
        viewportWidth: window.innerWidth,
        viewportHeight: window.innerHeight,
        overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        columns,
      };
    });
    expect(geometry.width).toBeLessThan(820);
    expect(geometry.width).toBeLessThan(geometry.viewportWidth - 40);
    expect(geometry.height).toBeLessThan(geometry.viewportHeight * 0.68);
    expect(geometry.overflow).toBeLessThanOrEqual(1);
    expect(Math.max(...geometry.columns.map((column) => column.top))).toBeCloseTo(
      Math.min(...geometry.columns.map((column) => column.top)),
      0,
    );

    await page.keyboard.press("Escape");
    await expect(menu).toBeHidden();
    await trigger.focus();
    await page.keyboard.press("Enter");
    await expect(menu).toBeVisible();
    await page.mouse.click(viewport.width - 16, viewport.height - 16);
    await expect(menu).toBeHidden();
  }

  await page.goto("/about?lang=ar", { waitUntil: "networkidle" });
  const arabicTrigger = page
    .getByRole("navigation", { name: "Primary" })
    .getByRole("button", { name: "الأقسام", exact: true });
  await arabicTrigger.hover();
  const arabicMenu = page.locator('.published-mega[data-category-columns="3"]');
  await expect(arabicMenu).toHaveAttribute("dir", "rtl");
  await expect(arabicMenu.getByRole("heading", { name: "العناية بالجسم" })).toBeVisible();
  await arabicMenu.getByRole("link", { name: "العناية بالجسم 1" }).click();
  await expect(page).toHaveURL(/\/categories\/body-care-1/);
});

test("multi-category navigation uses parent disclosures on mobile", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "This assertion targets the mobile drawer");
  for (const width of [320, 360, 375, 390, 414, 430]) {
    await page.setViewportSize({ width, height: width === 320 ? 568 : 844 });
    await page.goto("/about?lang=ar", { waitUntil: "networkidle" });
    await page.getByRole("button", { name: "فتح القائمة", exact: true }).click();
    const mobileNavigation = page.getByRole("dialog", { name: "فتح القائمة" });
    await mobileNavigation.getByRole("button", { name: "الأقسام", exact: true }).click();
    const bodyDisclosure = mobileNavigation
      .locator(".published-mobile-category-group > summary")
      .filter({ hasText: "العناية بالجسم" });
    await expect(bodyDisclosure).toBeVisible();
    await expect(mobileNavigation.getByRole("link", { name: "العناية بالجسم 1" })).toBeHidden();
    await bodyDisclosure.click();
    await expect(mobileNavigation.getByRole("link", { name: "العناية بالجسم 1" })).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      ),
    ).toBeLessThanOrEqual(1);
    if (width === 430) {
      await mobileNavigation.getByRole("link", { name: "العناية بالجسم 1" }).click();
      await expect(page).toHaveURL(/\/categories\/body-care-1/);
    }
  }
});

test("Navigation V2 renders eight real canonical columns across the required viewport matrix", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "chromium", "One browser owns the full viewport matrix");

  for (const width of [1366, 1440, 1920]) {
    await page.setViewportSize({ width, height: width === 1366 ? 768 : 900 });
    await page.goto("/about", { waitUntil: "networkidle" });
    const trigger = page
      .getByRole("navigation", { name: "Primary" })
      .getByRole("button", { name: "Shop V2", exact: true });
    await trigger.hover();
    const menu = page.locator('.published-mega[data-category-columns="8"]');
    await expect(menu).toBeVisible();
    await expect(menu.locator(".published-category-column")).toHaveCount(8);
    await expect(menu.getByRole("link", { name: "Body Care", exact: true })).toBeVisible();
    await expect(menu.getByRole("link", { name: "Wellness", exact: true })).toBeVisible();
    const geometry = await menu.evaluate((element) => {
      const bounds = element.getBoundingClientRect();
      return {
        left: bounds.left,
        right: bounds.right,
        width: bounds.width,
        viewport: window.innerWidth,
        overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      };
    });
    expect(geometry.left).toBeGreaterThanOrEqual(0);
    expect(geometry.right).toBeLessThanOrEqual(geometry.viewport + 1);
    expect(geometry.width).toBeLessThanOrEqual(geometry.viewport - 32);
    expect(geometry.overflow).toBeLessThanOrEqual(1);
  }

  for (const width of [320, 360, 375, 390, 414, 430, 768, 1024]) {
    await page.setViewportSize({ width, height: width < 500 ? 844 : 900 });
    await page.goto("/about?lang=ar", { waitUntil: "networkidle" });
    await page.getByRole("button", { name: "فتح القائمة", exact: true }).click();
    const drawer = page.getByRole("dialog", { name: "فتح القائمة" });
    await drawer.getByRole("button", { name: "تسوق V2", exact: true }).click();
    const groups = drawer.locator(".published-mobile-category-group");
    await expect(groups).toHaveCount(8);
    await expect(groups.first()).toContainText("العناية بالجسم");
    await groups.first().locator("summary").click();
    await expect(drawer.getByRole("link", { name: "العناية بالجسم 1" })).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      ),
    ).toBeLessThanOrEqual(1);
  }
});

test("published alphabetical Brands remains usable in the mobile menu", async ({
  page,
}, testInfo) => {
  test.skip(
    !testInfo.project.name.startsWith("mobile"),
    "This assertion targets the mobile drawer",
  );
  await page.goto("/about", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Open menu", exact: true }).click();
  const mobileNavigation = page.getByRole("dialog", { name: "Open menu" });
  await mobileNavigation.getByRole("button", { name: "Brands", exact: true }).click();
  const directory = mobileNavigation.locator(".published-brand-directory");
  const groups = directory.locator(".published-brand-directory__groups");
  await expect(directory.locator(".published-brand-directory__group > h3")).toHaveText([
    "A",
    "B",
    "C",
    "E",
  ]);

  for (const width of [320, 360, 375, 390, 414, 430]) {
    await page.setViewportSize({ width, height: 780 });
    const geometry = await mobileNavigation.evaluate((drawer) => {
      const measure = (element: Element) => {
        const node = element as HTMLElement;
        return {
          clientWidth: node.clientWidth,
          scrollWidth: node.scrollWidth,
        };
      };
      const body = drawer.querySelector<HTMLElement>(".mobile-nav__body")!;
      const menu = drawer.querySelector<HTMLElement>(".published-mobile-menu")!;
      const brandDirectory = drawer.querySelector<HTMLElement>(".published-brand-directory")!;
      const brandGroups = drawer.querySelector<HTMLElement>(".published-brand-directory__groups")!;
      const groupChildren = [
        ...brandGroups.querySelectorAll<HTMLElement>(
          ".published-brand-directory__group, .published-brand-directory__group a",
        ),
      ];
      const style = getComputedStyle(brandGroups);
      return {
        containers: [drawer, body, menu, brandDirectory, brandGroups].map(measure),
        children: groupChildren.map(measure),
        overflowX: style.overflowX,
        overflowY: style.overflowY,
        touchAction: style.touchAction,
        documentOverflow:
          document.documentElement.scrollWidth - document.documentElement.clientWidth,
        documentScrollLeft: document.documentElement.scrollLeft,
        bodyScrollLeft: document.body.scrollLeft,
      };
    });

    for (const container of geometry.containers) {
      expect(container.scrollWidth).toBeLessThanOrEqual(container.clientWidth + 1);
    }
    for (const child of geometry.children) {
      expect(child.scrollWidth).toBeLessThanOrEqual(child.clientWidth + 1);
    }
    expect(geometry.overflowX).toBe("hidden");
    expect(geometry.overflowY).toBe("auto");
    expect(geometry.touchAction).toBe("pan-y");
    expect(geometry.documentOverflow).toBeLessThanOrEqual(1);
    expect(geometry.documentScrollLeft).toBe(0);
    expect(geometry.bodyScrollLeft).toBe(0);
  }

  await groups.evaluate((element) => {
    element.scrollTop = 0;
    element.scrollLeft = 0;
  });
  const groupBox = await groups.boundingBox();
  expect(groupBox).not.toBeNull();
  if (testInfo.project.name === "mobile-webkit") {
    await groups.evaluate((element) => {
      element.scrollTop = 180;
    });
  } else {
    await page.mouse.move(groupBox!.x + groupBox!.width / 2, groupBox!.y + groupBox!.height / 2);
    await page.mouse.wheel(70, 180);
  }
  await expect.poll(() => groups.evaluate((element) => element.scrollTop)).toBeGreaterThan(0);
  expect(await groups.evaluate((element) => element.scrollLeft)).toBe(0);

  const search = directory.getByPlaceholder("Search brands…");
  await search.fill("cos");
  await expect(directory.getByRole("link", { name: "COSRX" })).toBeVisible();
  await expect(directory.getByRole("link", { name: "Anua" })).toHaveCount(0);
  await expect(search).toBeFocused();
  await expect
    .poll(() => groups.evaluate((element) => element.scrollWidth - element.clientWidth))
    .toBeLessThanOrEqual(1);

  await search.fill("");
  await expect(directory.getByRole("link", { name: "Anua" })).toBeVisible();
  await mobileNavigation.getByRole("button", { name: "Close menu" }).click();
  await expect(mobileNavigation).toBeHidden();
  await page.getByRole("button", { name: "Open menu", exact: true }).click();
  await mobileNavigation.getByRole("button", { name: "Brands", exact: true }).click();
  await expect(mobileNavigation.getByRole("link", { name: "Anua" })).toBeVisible();
  expect(
    await groups.evaluate((element) => element.scrollWidth - element.clientWidth),
  ).toBeLessThanOrEqual(1);

  await page.goto("/about?lang=ar", { waitUntil: "networkidle" });
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  await page.getByRole("button", { name: "فتح القائمة", exact: true }).click();
  const arabicNavigation = page.getByRole("dialog", { name: "فتح القائمة" });
  await arabicNavigation.getByRole("button", { name: "العلامات", exact: true }).click();
  const arabicGroups = arabicNavigation.locator(".published-brand-directory__groups");
  await expect(arabicGroups).toBeVisible();
  const rtlGeometry = await arabicGroups.evaluate((element) => ({
    overflow: element.scrollWidth - element.clientWidth,
    overflowX: getComputedStyle(element).overflowX,
    touchAction: getComputedStyle(element).touchAction,
    scrollLeft: element.scrollLeft,
    documentOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
  }));
  expect(rtlGeometry.overflow).toBeLessThanOrEqual(1);
  expect(rtlGeometry.overflowX).toBe("hidden");
  expect(rtlGeometry.touchAction).toBe("pan-y");
  expect(rtlGeometry.scrollLeft).toBe(0);
  expect(rtlGeometry.documentOverflow).toBeLessThanOrEqual(1);
});
