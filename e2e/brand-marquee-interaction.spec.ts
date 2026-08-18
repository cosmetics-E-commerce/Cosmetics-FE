import { expect, test } from "@playwright/test";

async function translateX(locator: import("@playwright/test").Locator) {
  return locator.evaluate((element) => {
    const transform = getComputedStyle(element).transform;
    return transform === "none" ? 0 : new DOMMatrixReadOnly(transform).m41;
  });
}

async function centerInViewport(locator: import("@playwright/test").Locator) {
  await expect
    .poll(() =>
      locator.evaluate((element) => {
        const rect = element.getBoundingClientRect();
        const delta = rect.top + rect.height / 2 - window.innerHeight / 2;
        window.scrollTo({ top: window.scrollY + delta, behavior: "instant" });
        const centered = element.getBoundingClientRect();
        return Math.abs(centered.top + centered.height / 2 - window.innerHeight / 2);
      }),
    )
    .toBeLessThan(4);
}

test.describe("brand presentation", () => {
  test("the homepage rail stays sharp, draggable, seamless, and vertically scrollable", async ({
    page,
    context,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/", { waitUntil: "domcontentloaded" });

    const marquee = page.locator(".sf-brand-marquee");
    const viewport = marquee.locator(".sf-brand-marquee__viewport");
    const track = marquee.locator(".sf-brand-marquee__track");
    await expect(marquee).toBeVisible();
    await expect(marquee).toHaveAttribute("data-enhanced", "true");
    await centerInViewport(marquee);

    const sizing = await marquee.evaluate((element) => {
      const original = element.querySelector(".sf-brand-marquee__group:not([aria-hidden])");
      const clone = element.querySelector(".sf-brand-marquee__group--clone");
      const image = original?.querySelector("img");
      const imageRect = image?.getBoundingClientRect();
      const originalRect = original?.getBoundingClientRect();
      const cloneRect = clone?.getBoundingClientRect();
      return {
        pageOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        touchAction: getComputedStyle(element.querySelector(".sf-brand-marquee__viewport")!)
          .touchAction,
        intrinsicWidth: image instanceof HTMLImageElement ? image.naturalWidth : 0,
        intrinsicHeight: image instanceof HTMLImageElement ? image.naturalHeight : 0,
        renderedWidth: imageRect?.width ?? 0,
        renderedHeight: imageRect?.height ?? 0,
        groupJoinGap:
          originalRect && cloneRect ? Math.abs(originalRect.right - cloneRect.left) : Infinity,
      };
    });
    expect(sizing.pageOverflow).toBeLessThanOrEqual(1);
    expect(sizing.touchAction).toBe("pan-y");
    expect(sizing.intrinsicWidth).toBeGreaterThanOrEqual(sizing.renderedWidth);
    expect(sizing.intrinsicHeight).toBeGreaterThanOrEqual(sizing.renderedHeight);
    expect(sizing.groupJoinGap).toBeLessThanOrEqual(1);

    await page.mouse.move(1, 1);
    const automaticStart = await translateX(track);
    await page.waitForTimeout(450);
    const automaticEnd = await translateX(track);
    expect(Math.abs(automaticEnd - automaticStart)).toBeGreaterThan(1);

    const box = await viewport.boundingBox();
    expect(box).not.toBeNull();
    const x = box!.x + box!.width / 2;
    const y = box!.y + box!.height / 2;
    const urlBeforeDrag = page.url();
    const dragStart = await translateX(track);
    const client = await context.newCDPSession(page);
    await client.send("Input.dispatchTouchEvent", {
      type: "touchStart",
      touchPoints: [{ x, y }],
    });
    await client.send("Input.dispatchTouchEvent", {
      type: "touchMove",
      touchPoints: [{ x: x - 76, y: y + 2 }],
    });
    const duringDrag = await translateX(track);
    await client.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
    expect(Math.abs(duringDrag - dragStart)).toBeGreaterThan(50);
    expect(page.url()).toBe(urlBeforeDrag);

    const released = await translateX(track);
    await page.waitForTimeout(250);
    const afterMomentum = await translateX(track);
    expect(Math.abs(afterMomentum - released)).toBeGreaterThan(0.5);
    await page.waitForTimeout(1_750);
    const resumed = await translateX(track);
    await page.waitForTimeout(350);
    expect(Math.abs((await translateX(track)) - resumed)).toBeGreaterThan(0.5);

    const scrollBefore = await page.evaluate(() => scrollY);
    await client.send("Input.dispatchTouchEvent", {
      type: "touchStart",
      touchPoints: [{ x, y }],
    });
    await client.send("Input.dispatchTouchEvent", {
      type: "touchMove",
      touchPoints: [{ x: x + 2, y: y - 100 }],
    });
    await client.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
    await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(scrollBefore);
  });

  test("a short touch still opens the underlying semantic brand link", async ({
    page,
    context,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/", { waitUntil: "domcontentloaded" });
    const marquee = page.locator(".sf-brand-marquee");
    const viewport = marquee.locator(".sf-brand-marquee__viewport");
    await expect(marquee).toHaveAttribute("data-enhanced", "true");
    await centerInViewport(marquee);
    const tapBox = await viewport.boundingBox();
    const tapX = tapBox!.x + tapBox!.width / 2;
    const tapY = tapBox!.y + tapBox!.height / 2;
    const expectedHref = await page.evaluate(
      ({ x, y }) => document.elementFromPoint(x, y)?.closest("a")?.getAttribute("href"),
      { x: tapX, y: tapY },
    );
    expect(expectedHref).toMatch(/^\/brands\//);
    const client = await context.newCDPSession(page);
    await client.send("Input.dispatchTouchEvent", {
      type: "touchStart",
      touchPoints: [{ x: tapX, y: tapY }],
    });
    await client.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
    await expect(page).toHaveURL(new RegExp(`${expectedHref!.replaceAll("-", "\\-")}$`));
  });

  test("reduced motion stops auto movement but preserves direct dragging", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/", { waitUntil: "domcontentloaded" });
    const marquee = page.locator(".sf-brand-marquee");
    const viewport = marquee.locator(".sf-brand-marquee__viewport");
    const track = marquee.locator(".sf-brand-marquee__track");
    await expect(marquee).toHaveAttribute("data-enhanced", "true");
    await centerInViewport(marquee);

    const before = await translateX(track);
    await page.waitForTimeout(500);
    expect(Math.abs((await translateX(track)) - before)).toBeLessThanOrEqual(0.5);

    const box = await viewport.boundingBox();
    expect(box).not.toBeNull();
    await page.mouse.move(box!.x + box!.width / 2, box!.y + box!.height / 2);
    await page.mouse.down();
    await page.mouse.move(box!.x + box!.width / 2 + 64, box!.y + box!.height / 2, {
      steps: 4,
    });
    await page.mouse.up();
    expect(Math.abs((await translateX(track)) - before)).toBeGreaterThan(40);
  });

  test("the mobile brand landing page gives transparent square logos a larger display area", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/brands/la-roche-posay", { waitUntil: "domcontentloaded" });
    const shell = page.locator(".sf-brand-landing-logo-shell");
    const logo = shell.locator("img");
    await expect(shell).toBeVisible();
    await expect(logo).toBeVisible();
    const dimensions = await shell.evaluate((element) => {
      const image = element.querySelector("img")!;
      const rect = element.getBoundingClientRect();
      return {
        width: rect.width,
        height: rect.height,
        transform: getComputedStyle(image).transform,
        objectFit: getComputedStyle(image).objectFit,
      };
    });
    expect(dimensions.width).toBeGreaterThanOrEqual(230);
    expect(dimensions.height).toBeGreaterThanOrEqual(120);
    expect(dimensions.transform).toBe("none");
    expect(dimensions.objectFit).toBe("contain");

    await page.setViewportSize({ width: 1440, height: 900 });
    const desktopDimensions = await shell.evaluate((element) => {
      const rect = element.getBoundingClientRect();
      return { width: rect.width, height: rect.height };
    });
    expect(desktopDimensions.width).toBeGreaterThanOrEqual(340);
    expect(desktopDimensions.height).toBeGreaterThanOrEqual(170);
  });
});
