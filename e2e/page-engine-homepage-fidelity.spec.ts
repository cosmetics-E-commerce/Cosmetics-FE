import { expect, test, type Page } from "@playwright/test";

const viewports = [
  { width: 375, height: 844 },
  { width: 430, height: 932 },
  { width: 1440, height: 900 },
  { width: 1920, height: 1080 },
];
const selectors = [
  ".sf-brand-marquee",
  ".sf-proof",
  ".sf-category-showcase",
  ".sf-products-section",
  ".sf-editorial-grid",
  ".sf-concerns",
  ".sf-bestsellers",
  ".sf-story",
  ".sf-beauty-difference",
];

async function stabilize(page: Page) {
  await page.addStyleTag({
    content:
      "*,*::before,*::after{animation:none!important;transition:none!important;caret-color:transparent!important}.sf-brand-marquee__track,.motion-reveal,.motion-reveal>*,.motion-text-line,.motion-image-reveal,.motion-image-reveal__inner{opacity:1!important;transform:none!important;clip-path:none!important}",
  });
  await page.evaluate(async () => {
    await document.fonts.ready;
  });
}

async function captureSection(page: Page, selector: string) {
  const section = page.locator(selector);
  await expect(section).toHaveCount(1);
  await page.evaluate((target) => {
    document.querySelector(target)?.scrollIntoView({ block: "center" });
  }, selector);
  await page.waitForTimeout(80);
  await section.locator("img").evaluateAll(async (images) => {
    await Promise.race([
      Promise.all(
        images.map((image) =>
          (image as HTMLImageElement).complete
            ? Promise.resolve()
            : new Promise<void>((resolve) => {
                image.addEventListener("load", () => resolve(), { once: true });
                image.addEventListener("error", () => resolve(), {
                  once: true,
                });
              }),
        ),
      ),
      new Promise<void>((resolve) => setTimeout(resolve, 350)),
    ]);
  });
  return section.screenshot({ animations: "disabled" });
}

async function imageDifference(page: Page, first: Buffer, second: Buffer) {
  return page.evaluate(
    async ({ firstImage, secondImage }) => {
      const decode = async (encoded: string) => {
        const binary = atob(encoded);
        const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
        return createImageBitmap(new Blob([bytes], { type: "image/png" }));
      };
      const [firstBitmap, secondBitmap] = await Promise.all([
        decode(firstImage),
        decode(secondImage),
      ]);
      if (firstBitmap.width !== secondBitmap.width || firstBitmap.height !== secondBitmap.height) {
        return {
          heightMatches: false,
          mismatchRatio: 1,
          widthMatches: false,
        };
      }
      const canvas = new OffscreenCanvas(firstBitmap.width, firstBitmap.height);
      const context = canvas.getContext("2d", { willReadFrequently: true });
      if (!context) throw new Error("Unable to create screenshot comparison canvas");
      context.drawImage(firstBitmap, 0, 0);
      const firstPixels = context.getImageData(0, 0, firstBitmap.width, firstBitmap.height).data;
      context.clearRect(0, 0, firstBitmap.width, firstBitmap.height);
      context.drawImage(secondBitmap, 0, 0);
      const secondPixels = context.getImageData(0, 0, secondBitmap.width, secondBitmap.height).data;
      let mismatchedPixels = 0;
      for (let index = 0; index < firstPixels.length; index += 4) {
        const channelDifference = Math.max(
          Math.abs(firstPixels[index] - secondPixels[index]),
          Math.abs(firstPixels[index + 1] - secondPixels[index + 1]),
          Math.abs(firstPixels[index + 2] - secondPixels[index + 2]),
          Math.abs(firstPixels[index + 3] - secondPixels[index + 3]),
        );
        if (channelDifference > 12) mismatchedPixels += 1;
      }
      return {
        heightMatches: true,
        mismatchRatio: mismatchedPixels / (firstBitmap.width * firstBitmap.height),
        widthMatches: true,
      };
    },
    {
      firstImage: first.toString("base64"),
      secondImage: second.toString("base64"),
    },
  );
}

test("BioReza Default Homepage modules preserve the live below-fold rendering", async ({
  page,
}) => {
  test.setTimeout(300_000);
  for (const locale of ["en", "ar"] as const) {
    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      await page.goto(locale === "ar" ? "/?lang=ar" : "/", {
        waitUntil: "networkidle",
      });
      await stabilize(page);
      const baseline = new Map<string, Buffer>();
      for (const selector of selectors) {
        baseline.set(selector, await captureSection(page, selector));
      }

      await page.goto(`/page-builder-signature-home-test${locale === "ar" ? "?lang=ar" : ""}`, {
        waitUntil: "networkidle",
      });
      await stabilize(page);
      for (const selector of selectors) {
        const expected = baseline.get(selector);
        if (!expected) throw new Error(`Missing baseline for ${selector}`);
        const difference = await imageDifference(
          page,
          expected,
          await captureSection(page, selector),
        );
        expect(
          difference.widthMatches && difference.heightMatches,
          `${selector} dimensions changed at ${viewport.width}px (${locale})`,
        ).toBe(true);
        expect(
          difference.mismatchRatio,
          `${selector} visual mismatch at ${viewport.width}px (${locale})`,
        ).toBeLessThanOrEqual(selector === ".sf-category-showcase" ? 0.04 : 0.005);
      }
      await expect
        .poll(() =>
          page.evaluate(
            () => document.documentElement.scrollWidth <= document.documentElement.clientWidth,
          ),
        )
        .toBe(true);
    }
  }
});
