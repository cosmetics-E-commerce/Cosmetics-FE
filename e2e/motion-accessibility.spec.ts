import { expect, test } from "@playwright/test";

test("motion never hides content in reduced-motion mode", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/privacy-policy");

  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect
    .poll(() => page.evaluate(() => document.documentElement.dataset["smoothScroll"] ?? null))
    .toBeNull();
  await expect
    .poll(() =>
      page.evaluate(
        () =>
          [
            ...document.querySelectorAll<HTMLElement>(
              "[data-motion-state='hidden'], [data-motion-state='hidden'] > *",
            ),
          ].filter((element) => {
            const bounds = element.getBoundingClientRect();
            const style = getComputedStyle(element);
            return (
              bounds.bottom > 0 &&
              bounds.top < window.innerHeight &&
              (style.opacity === "0" || style.visibility === "hidden" || style.display === "none")
            );
          }).length,
      ),
    )
    .toBe(0);
});

test("touch projects keep native scrolling", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "Native touch behavior is a mobile assertion");
  await page.goto("/privacy-policy");
  await expect
    .poll(() => page.evaluate(() => document.documentElement.dataset["smoothScroll"] ?? null))
    .toBeNull();
});
