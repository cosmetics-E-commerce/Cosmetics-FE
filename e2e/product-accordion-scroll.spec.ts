import { expect, test, type Locator, type Page } from "@playwright/test";

const productPath = "/product/acm-depiwhite-eye-contour-gel-15ml";
const transitionMs = 280;

test("opening How to use keeps its trigger anchored while every section starts closed", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(productPath, { waitUntil: "networkidle" });

  const description = page.getByRole("button", { name: "Description" });
  const howToUse = page.getByRole("button", { name: "How to use" });
  await expect(description).toHaveAttribute("aria-expanded", "false");
  await expect(page.locator(".product-reference-description-copy")).toHaveCSS(
    "white-space",
    "pre-line",
  );

  await installScrollProbe(page);
  const { before, after } = await toggleAndMeasure(page, howToUse, "true");

  await expect(description).toHaveAttribute("aria-expanded", "false");
  expectStableInteraction(before, after);
  expect(after.footerTop).toBeGreaterThan(after.viewportHeight * 0.8);
});

test("every product detail disclosure opens and closes without navigation or scroll side effects", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(productPath, { waitUntil: "networkidle" });
  await installScrollProbe(page);

  const sections = [
    { name: "Description", initial: "false" },
    { name: "How to use", initial: "false" },
    { name: "Delivery policy", initial: "false" },
    { name: "Shipping & Return", initial: "false" },
  ] as const;

  for (const section of sections) {
    const trigger = page.getByRole("button", { name: section.name });
    await expect(trigger).toHaveAttribute("type", "button");
    await expect(trigger).toHaveAttribute("aria-expanded", section.initial);
    await expect(trigger).toHaveAttribute("aria-controls", /.+/);

    const closedState = await toggleAndMeasure(
      page,
      trigger,
      section.initial === "true" ? "false" : "true",
    );
    expectStableInteraction(closedState.before, closedState.after);

    const restoredState = await toggleAndMeasure(page, trigger, section.initial);
    expectStableInteraction(restoredState.before, restoredState.after);
  }

  const howToUse = page.getByRole("button", { name: "How to use" });
  const enterState = await toggleWithKeyboardAndMeasure(page, howToUse, "Enter", "true");
  expectStableInteraction(enterState.before, enterState.after, "Enter key");
  const spaceState = await toggleWithKeyboardAndMeasure(page, howToUse, "Space", "false");
  expectStableInteraction(spaceState.before, spaceState.after, "Space key");
});

test("rapid disclosure changes do not reset product state or desynchronize open states", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(productPath, { waitUntil: "networkidle" });

  await page.getByRole("button", { name: "Increase quantity", exact: true }).click();
  const quantity = page.locator(".product-reference-quantity .count-change");
  await expect(quantity).toHaveText("2");
  const productImageSrc = await page
    .locator(".product-reference-gallery img")
    .first()
    .getAttribute("src");
  const pathBefore = new URL(page.url()).pathname;

  const description = page.getByRole("button", { name: "Description" });
  const howToUse = page.getByRole("button", { name: "How to use" });
  const delivery = page.getByRole("button", { name: "Delivery policy" });
  const returns = page.getByRole("button", { name: "Shipping & Return" });

  for (const trigger of [description, howToUse, delivery, returns, howToUse, description]) {
    await trigger.evaluate((element) => (element as HTMLButtonElement).click());
  }

  await expect(description).toHaveAttribute("aria-expanded", "false");
  await expect(howToUse).toHaveAttribute("aria-expanded", "false");
  await expect(delivery).toHaveAttribute("aria-expanded", "true");
  await expect(returns).toHaveAttribute("aria-expanded", "true");
  await expect(quantity).toHaveText("2");
  await expect(page.locator(".product-reference-gallery img").first()).toHaveAttribute(
    "src",
    productImageSrc ?? "",
  );
  expect(new URL(page.url()).pathname).toBe(pathBefore);
  expect(new URL(page.url()).hash).toBe("");
});

test("the anchored interaction remains stable across supported responsive widths", async ({
  page,
}) => {
  test.setTimeout(120_000);

  for (const width of [320, 360, 375, 390, 412, 430, 768, 1024, 1366, 1440, 1920]) {
    await page.setViewportSize({ width, height: width < 768 ? 720 : 900 });
    await page.goto(productPath, { waitUntil: "networkidle" });
    await installScrollProbe(page);

    const description = page.getByRole("button", { name: "Description" });
    const howToUse = page.getByRole("button", { name: "How to use" });
    await expect(description).toHaveAttribute("aria-expanded", "false");
    const result = await toggleAndMeasure(page, howToUse, "true");

    await expect(description, `Description unexpectedly opened at ${width}px`).toHaveAttribute(
      "aria-expanded",
      "false",
    );
    expectStableInteraction(result.before, result.after, `${width}px`);
  }
});

test("RTL keeps document direction and the clicked Arabic trigger anchored", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto(`${productPath}?lang=ar`, { waitUntil: "networkidle" });
  await installScrollProbe(page);

  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  const description = page.getByRole("button", { name: "الوصف" });
  const howToUse = page.getByRole("button", { name: "طريقة الاستخدام" });
  await expect(description).toHaveAttribute("aria-expanded", "false");

  const result = await toggleAndMeasure(page, howToUse, "true");
  await expect(description).toHaveAttribute("aria-expanded", "false");
  expectStableInteraction(result.before, result.after, "RTL");
});

type InteractionMeasurement = Awaited<ReturnType<typeof measure>>;

async function centerTrigger(trigger: Locator) {
  await trigger.evaluate((element) => {
    const root = document.documentElement;
    const previousBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    element.scrollIntoView({ block: "center" });
    root.style.scrollBehavior = previousBehavior;
  });
}

async function installScrollProbe(page: Page) {
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all(
      [...document.images]
        .filter((image) => image.loading !== "lazy" || image.complete)
        .map((image) => image.decode().catch(() => undefined)),
    );
    await new Promise<void>((resolve) => {
      requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
    });
  });

  await page.evaluate(() => {
    const state = window as typeof window & ProductAccordionProbe;
    if (state.__productAccordionProbeInstalled) return;

    state.__productAccordionProbeInstalled = true;
    state.__productAccordionScrollCalls = [];
    const originalScrollTo = window.scrollTo.bind(window);
    const originalScrollBy = window.scrollBy.bind(window);
    const originalScrollIntoView = Element.prototype.scrollIntoView;

    window.scrollTo = ((...args: Parameters<typeof window.scrollTo>) => {
      state.__productAccordionScrollCalls?.push("window.scrollTo");
      return originalScrollTo(...args);
    }) as typeof window.scrollTo;
    window.scrollBy = ((...args: Parameters<typeof window.scrollBy>) => {
      state.__productAccordionScrollCalls?.push("window.scrollBy");
      return originalScrollBy(...args);
    }) as typeof window.scrollBy;
    Element.prototype.scrollIntoView = function scrollIntoView(
      ...args: Parameters<typeof Element.prototype.scrollIntoView>
    ) {
      state.__productAccordionScrollCalls?.push("Element.scrollIntoView");
      return originalScrollIntoView.apply(this, args);
    };
  });
}

async function toggleAndMeasure(page: Page, trigger: Locator, expanded: "true" | "false") {
  // Product controls are intentionally disabled in the SSR shell until React
  // has attached handlers. Wait for that contract before measuring scroll so
  // hydration cannot reset the document between centering and activation.
  await expect(trigger).toBeEnabled();
  await centerTrigger(trigger);
  await trigger.evaluate((element) => {
    const state = window as typeof window & ProductAccordionProbe;
    state.__productAccordionTrigger = element;
    state.__productAccordionScrollCalls = [];
  });
  const before = await measure(trigger);
  await trigger.click();
  await expect(trigger).toHaveAttribute("aria-expanded", expanded);
  await page.waitForTimeout(transitionMs);

  return { before, after: await measure(trigger) };
}

async function toggleWithKeyboardAndMeasure(
  page: Page,
  trigger: Locator,
  key: "Enter" | "Space",
  expanded: "true" | "false",
) {
  await expect(trigger).toBeEnabled();
  await centerTrigger(trigger);
  await trigger.focus();
  await trigger.evaluate((element) => {
    const state = window as typeof window & ProductAccordionProbe;
    state.__productAccordionTrigger = element;
    state.__productAccordionScrollCalls = [];
  });
  const before = await measure(trigger);

  await page.keyboard.press(key);
  await expect(trigger).toHaveAttribute("aria-expanded", expanded);
  await page.waitForTimeout(transitionMs);

  return { before, after: await measure(trigger) };
}

async function measure(trigger: Locator) {
  return trigger.evaluate((element) => {
    const state = window as typeof window & ProductAccordionProbe;
    const footer = document.querySelector("footer");
    return {
      scrollY: window.scrollY,
      triggerTop: element.getBoundingClientRect().top,
      footerTop: footer?.getBoundingClientRect().top ?? Number.POSITIVE_INFINITY,
      viewportHeight: window.innerHeight,
      hash: window.location.hash,
      path: `${window.location.pathname}${window.location.search}`,
      focused: document.activeElement === element,
      sameNode: state.__productAccordionTrigger === element,
      scrollApiCalls: [...(state.__productAccordionScrollCalls ?? [])],
    };
  });
}

function expectStableInteraction(
  before: InteractionMeasurement,
  after: InteractionMeasurement,
  context = "",
) {
  const evidence = JSON.stringify({ context, before, after });
  expect(after.hash, evidence).toBe(before.hash);
  expect(after.path, evidence).toBe(before.path);
  expect(after.sameNode, evidence).toBe(true);
  expect(after.focused, evidence).toBe(true);
  expect(after.scrollApiCalls, evidence).toEqual([]);
  expect(Math.abs(after.triggerTop - before.triggerTop), evidence).toBeLessThan(3);
  expect(Math.abs(after.scrollY - before.scrollY), evidence).toBeLessThan(3);
}

type ProductAccordionProbe = {
  __productAccordionProbeInstalled?: boolean;
  __productAccordionTrigger?: Element;
  __productAccordionScrollCalls?: string[];
};
