import { expect, test } from "@playwright/test";

const productPath = "/product/acm-depiwhite-eye-contour-gel-15ml";

test("product image stays calm on hover and opens the selected image in an accessible viewer", async ({
  page,
}, testInfo) => {
  await page.goto(productPath, { waitUntil: "networkidle" });

  const triggerImage = page.locator(".product-viewer-trigger__image");
  await expect(triggerImage).toHaveCSS("transform", "none");
  await page.locator(".product-viewer-trigger").hover();
  await expect(triggerImage).toHaveCSS("transform", "none");

  await page.getByRole("button", { name: "View product image 2" }).click();
  const trigger = page.getByRole("button", {
    name: /Open ACM Depiwhite eye contour cream packaging in image viewer/,
  });
  await trigger.click();

  const viewer = page.getByRole("dialog", { name: "Product image viewer" });
  await expect(viewer).toBeVisible();
  const viewport = page.viewportSize()!;
  const viewerBox = (await viewer.boundingBox())!;
  expect(viewerBox.x).toBeCloseTo(0, 0);
  expect(viewerBox.y).toBeCloseTo(0, 0);
  expect(viewerBox.width).toBeCloseTo(viewport.width, 0);
  expect(viewerBox.height).toBeCloseTo(viewport.height, 0);
  await expect(viewer).toHaveCSS("position", "fixed");
  await expect(page.locator("body")).toHaveCSS("overflow", "hidden");
  await expect(
    viewer.getByRole("img", { name: "ACM Depiwhite eye contour cream packaging" }),
  ).toBeVisible();
  await expect
    .poll(() =>
      viewer
        .getByRole("img", { name: "ACM Depiwhite eye contour cream packaging" })
        .evaluate((image: HTMLImageElement) => image.naturalWidth),
    )
    .toBeGreaterThan(0);
  await expect(viewer.getByText("2 / 2")).toBeVisible();

  await viewer.getByRole("button", { name: "Zoom in" }).click();
  await viewer.getByRole("button", { name: "Zoom in" }).click();
  await expect(viewer.getByText("200%")).toBeVisible();
  await expect(viewer.locator(".product-viewer__image")).toHaveCSS("transform", /matrix\(2,/);

  if (testInfo.project.name === "chromium") {
    const stage = viewer.locator(".product-viewer__stage");
    const stageBox = (await stage.boundingBox())!;
    await page.mouse.move(stageBox.x + stageBox.width / 2, stageBox.y + stageBox.height / 2);
    await page.mouse.down();
    await page.mouse.move(stageBox.x + stageBox.width / 2, stageBox.y + stageBox.height / 2 + 90, {
      steps: 4,
    });
    await page.mouse.up();
    await expect
      .poll(() =>
        viewer.locator(".product-viewer__media").evaluate((element) => {
          const matrix = new DOMMatrixReadOnly(getComputedStyle(element).transform);
          return Math.abs(matrix.m41) + Math.abs(matrix.m42);
        }),
      )
      .toBeGreaterThan(1);
  }

  await viewer.getByRole("button", { name: "Reset zoom" }).click();
  await expect(viewer.getByText("100%")).toBeVisible();
  await expect
    .poll(() =>
      viewer.locator(".product-viewer__media").evaluate((element) => {
        const matrix = new DOMMatrixReadOnly(getComputedStyle(element).transform);
        return Math.abs(matrix.m41) + Math.abs(matrix.m42);
      }),
    )
    .toBeLessThan(0.5);

  await viewer.getByRole("button", { name: "Zoom in" }).click();
  await viewer.getByRole("button", { name: "Zoom in" }).click();
  await expect(viewer.getByText("200%")).toBeVisible();

  await page.keyboard.press("ArrowLeft");
  await expect(viewer.getByRole("img", { name: "ACM Depiwhite eye contour cream" })).toBeVisible();
  await expect(viewer.getByText("100%")).toBeVisible();
  await expect
    .poll(() =>
      viewer.locator(".product-viewer__media").evaluate((element) => {
        const matrix = new DOMMatrixReadOnly(getComputedStyle(element).transform);
        return Math.abs(matrix.m41) + Math.abs(matrix.m42);
      }),
    )
    .toBeLessThan(0.5);
  await page.keyboard.press("ArrowRight");
  await expect(
    viewer.getByRole("img", { name: "ACM Depiwhite eye contour cream packaging" }),
  ).toBeVisible();

  await page.keyboard.press("Escape");
  await expect(viewer).toBeHidden();
  await expect(trigger).toBeFocused();
});

test("product image viewer closes only through its explicit dismiss paths", async ({ page }) => {
  await page.goto(productPath, { waitUntil: "networkidle" });

  const trigger = page.locator(".product-viewer-trigger");
  const viewer = page.getByRole("dialog", { name: "Product image viewer" });
  const body = page.locator("body");

  const openViewer = async () => {
    await trigger.click();
    await expect(viewer).toBeVisible();
    await expect(body).toHaveCSS("overflow", "hidden");
  };
  const expectClosed = async () => {
    await expect(viewer).toBeHidden();
    await expect(body).not.toHaveCSS("overflow", "hidden");
    await expect(trigger).toBeFocused();
  };

  await openViewer();
  await viewer.getByRole("img", { name: "ACM Depiwhite eye contour cream" }).click();
  await expect(viewer).toBeVisible();
  await viewer.getByRole("button", { name: "Next product image" }).click();
  await expect(viewer).toBeVisible();
  await viewer.getByRole("button", { name: "Previous product image" }).click();
  await expect(viewer).toBeVisible();
  await viewer.getByRole("button", { name: "View product image 2" }).click();
  await expect(viewer).toBeVisible();
  await viewer.getByRole("button", { name: "Zoom in" }).click();
  await expect(viewer).toBeVisible();

  await viewer.locator(".product-viewer__canvas").click({ position: { x: 2, y: 2 } });
  await expectClosed();

  await openViewer();
  await viewer.getByRole("button", { name: "Close image viewer" }).click();
  await expectClosed();

  await openViewer();
  await page.keyboard.press("Escape");
  await expectClosed();
});

test("100% is the independently fitted baseline for every image size", async ({ page }) => {
  await page.goto("/product/viewer-fit-product", { waitUntil: "networkidle" });
  await page.locator(".product-viewer-trigger").click();

  const viewer = page.getByRole("dialog", { name: "Product image viewer" });
  const portrait = viewer.getByRole("img", { name: "Large portrait fixture" });
  const portraitFit = await expectFitted(viewer, portrait);
  await expect(viewer.getByText("100%")).toBeVisible();

  await viewer.getByRole("button", { name: "Zoom in" }).click();
  await expect(viewer.getByText("150%")).toBeVisible();
  await expect
    .poll(() => portrait.evaluate((image) => image.getBoundingClientRect().height))
    .toBeCloseTo(portraitFit.height * 1.5, 0);

  await viewer.getByRole("button", { name: "Reset zoom" }).click();
  await expect(viewer.getByText("100%")).toBeVisible();
  await expectFitted(viewer, portrait, portraitFit);

  for (const name of [
    "Large landscape fixture",
    "Small image fixture",
    "High-resolution square fixture",
  ]) {
    await viewer.getByRole("button", { name: "Next product image" }).click();
    const image = viewer.getByRole("img", { name });
    await expectFitted(viewer, image);
    await expect(viewer.getByText("100%")).toBeVisible();
  }

  const resizedViewport =
    page.viewportSize()!.width > 720 ? { width: 900, height: 650 } : { width: 360, height: 700 };
  await page.setViewportSize(resizedViewport);
  await expectFitted(viewer, viewer.getByRole("img", { name: "High-resolution square fixture" }));
});

async function expectFitted(
  viewer: import("@playwright/test").Locator,
  image: import("@playwright/test").Locator,
  expected?: { width: number; height: number },
) {
  await expect(image).toBeVisible();
  await expect
    .poll(() => image.evaluate((element: HTMLImageElement) => element.naturalWidth))
    .toBeGreaterThan(0);
  await expect(viewer.locator(".product-viewer__stage")).toHaveAttribute("data-fit-ready", "true");
  const readGeometry = async () => {
    const [stageBox, imageBox, naturalSize] = await Promise.all([
      viewer.locator(".product-viewer__stage").boundingBox(),
      image.boundingBox(),
      image.evaluate((element: HTMLImageElement) => ({
        width: element.naturalWidth,
        height: element.naturalHeight,
      })),
    ]);
    if (!stageBox || !imageBox) return null;
    return {
      width: imageBox.width,
      height: imageBox.height,
      naturalSize,
      contained:
        imageBox.x >= stageBox.x - 0.5 &&
        imageBox.y >= stageBox.y - 0.5 &&
        imageBox.x + imageBox.width <= stageBox.x + stageBox.width + 0.5 &&
        imageBox.y + imageBox.height <= stageBox.y + stageBox.height + 0.5,
      centeredX: Math.abs(imageBox.x + imageBox.width / 2 - (stageBox.x + stageBox.width / 2)),
      centeredY: Math.abs(imageBox.y + imageBox.height / 2 - (stageBox.y + stageBox.height / 2)),
    };
  };
  await expect
    .poll(async () => {
      const value = await readGeometry();
      if (!value) return false;
      const expectedSizeMatches = expected
        ? Math.abs(value.width - expected.width) < 1 && Math.abs(value.height - expected.height) < 1
        : true;
      return value.contained && value.centeredX < 1 && value.centeredY < 1 && expectedSizeMatches;
    })
    .toBe(true);
  const result = (await readGeometry())!;
  expect(result.contained).toBe(true);
  expect(result.centeredX).toBeLessThan(1);
  expect(result.centeredY).toBeLessThan(1);
  expect(result.width).toBeLessThanOrEqual(result.naturalSize.width);
  expect(result.height).toBeLessThanOrEqual(result.naturalSize.height);
  if (expected) {
    expect(result.width).toBeCloseTo(expected.width, 0);
    expect(result.height).toBeCloseTo(expected.height, 0);
  }
  return { width: result.width, height: result.height };
}
