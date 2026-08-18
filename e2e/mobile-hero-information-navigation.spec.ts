import { expect, test, type Page } from "@playwright/test";

async function expectNoPageOverflow(page: Page) {
  await expect
    .poll(() =>
      page.evaluate(
        () => document.documentElement.scrollWidth <= document.documentElement.clientWidth,
      ),
    )
    .toBe(true);
}

test("the mobile homepage hero owns the complete first viewport", async ({ page }) => {
  await page.setViewportSize({ width: 430, height: 932 });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.locator(".sf-hero")).toBeVisible();

  const viewports = [
    { width: 320, height: 568 },
    { width: 360, height: 640 },
    { width: 375, height: 667 },
    { width: 390, height: 844 },
    { width: 414, height: 896 },
    { width: 430, height: 932 },
  ];

  for (const viewport of viewports) {
    await page.setViewportSize(viewport);
    await page.evaluate(() => window.scrollTo(0, 0));

    const bounds = await page.evaluate(() => {
      const hero = document.querySelector<HTMLElement>(".sf-hero");
      const nextSection = hero?.nextElementSibling as HTMLElement | null;
      const copy = document.querySelector<HTMLElement>(".sf-hero__copy");
      const controls = document.querySelector<HTMLElement>(".sf-hero__controls");
      if (!hero || !nextSection || !copy || !controls) return null;
      return {
        hero: hero.getBoundingClientRect().toJSON(),
        next: nextSection.getBoundingClientRect().toJSON(),
        copy: copy.getBoundingClientRect().toJSON(),
        controls: controls.getBoundingClientRect().toJSON(),
        viewportHeight: window.innerHeight,
      };
    });

    expect(bounds).not.toBeNull();
    expect(Math.abs((bounds?.hero.bottom ?? 0) - viewport.height)).toBeLessThanOrEqual(1);
    expect(bounds?.next.top).toBeGreaterThanOrEqual(viewport.height - 0.5);
    expect(bounds?.copy.top).toBeGreaterThanOrEqual(0);
    expect(bounds?.copy.bottom).toBeLessThan(bounds?.controls.top ?? 0);
    expect(bounds?.controls.bottom).toBeLessThanOrEqual(viewport.height);
    await expectNoPageOverflow(page);
  }

  const positions = ["52% 50%", "66% 50%", "69% 50%"];
  for (let index = 0; index < positions.length; index += 1) {
    await page.getByRole("tab", { name: `Slide ${index + 1}` }).click();
    const slide = page.locator(".sf-hero__media").nth(index);
    await expect(slide).toHaveAttribute("data-active", "true");
    await expect(slide.locator("img")).toHaveCSS("object-position", positions[index]);
  }
});

test("mobile information pages use one accessible, scroll-aware section selector", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/privacy-policy", { waitUntil: "networkidle" });

  const contents = page.getByRole("navigation", { name: "Privacy policy sections" });
  const trigger = contents.getByRole("button");
  await expect(trigger).toBeVisible();
  await expect(trigger).toHaveText(/Introduction/);
  await expect(contents.locator("ol")).toBeHidden();
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await expectNoPageOverflow(page);

  await trigger.click();
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  const securityOption = page.getByRole("menuitem", { name: /Data security/ });
  await expect(securityOption).toBeVisible();
  await securityOption.click();
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await expect(page).toHaveURL(/#security$/);
  await expect(trigger).toHaveText(/Data security/);

  await expect
    .poll(() =>
      page.evaluate(() => {
        const section = document.getElementById("security");
        const header = document.querySelector<HTMLElement>(".store-header");
        const selector = document.querySelector<HTMLElement>(".bio-information-page__contents");
        if (!section || !header || !selector) return false;
        return (
          section.getBoundingClientRect().top >=
          header.getBoundingClientRect().height + selector.getBoundingClientRect().height
        );
      }),
    )
    .toBe(true);

  await page.evaluate(() => document.getElementById("rights")?.scrollIntoView());
  await expect(trigger).toHaveText(/Your rights/);

  await trigger.click();
  await page.getByRole("menuitem", { name: /Policy updates/ }).click();
  await expect(page).toHaveURL(/#updates$/);
  await page.goBack();
  await expect(page).toHaveURL(/#security$/);
  await expect(trigger).toHaveText(/Data security/);

  await trigger.focus();
  await page.keyboard.press("Enter");
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Escape");
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await expect(trigger).toBeFocused();
  await expectNoPageOverflow(page);
});

test("information-page deep links and desktop navigation retain their intended modes", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/returns#process", { waitUntil: "networkidle" });
  const mobileContents = page.getByRole("navigation", { name: "Returns & exchanges sections" });
  await expect(mobileContents.getByRole("button")).toHaveText(/Return process/);
  await expect
    .poll(() =>
      page.evaluate(() => document.getElementById("process")?.getBoundingClientRect().top),
    )
    .toBeGreaterThan(0);
  await expectNoPageOverflow(page);

  await page.goto("/shipping-policy", { waitUntil: "networkidle" });
  const mobileShippingContents = page.getByRole("navigation", {
    name: "Shipping & delivery sections",
  });
  await expect(mobileShippingContents.getByRole("button")).toBeVisible();
  await expect(mobileShippingContents.locator("ol")).toBeHidden();
  await expectNoPageOverflow(page);

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/shipping-policy", { waitUntil: "networkidle" });
  const desktopContents = page.getByRole("navigation", {
    name: "Shipping & delivery sections",
  });
  await expect(desktopContents.locator("ol")).toBeVisible();
  await expect(desktopContents.getByRole("button")).toBeHidden();
  await expect(desktopContents.getByRole("link", { name: "Order confirmation" })).toHaveAttribute(
    "aria-current",
    "location",
  );
});
