import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { MotionContext } from "@/components/motion/motion-context";
import { ProductImageZoom } from "./ProductImageZoom";

describe("ProductImageZoom", () => {
  const animationFrames: FrameRequestCallback[] = [];

  beforeEach(() => {
    vi.spyOn(window, "requestAnimationFrame").mockImplementation((callback) => {
      animationFrames.push(callback);
      return animationFrames.length;
    });
    vi.spyOn(window, "cancelAnimationFrame").mockImplementation(() => undefined);
  });

  afterEach(() => {
    animationFrames.length = 0;
    vi.restoreAllMocks();
  });

  it("tracks the latest fine-pointer position without React state updates per move", async () => {
    renderZoom("/serum-front.webp");
    const image = screen.getByRole("img", { name: "Glass Skin Serum" });
    const frame = image.closest<HTMLElement>(".product-detail-zoom")!;
    vi.spyOn(frame, "getBoundingClientRect").mockReturnValue(rect(10, 20, 400, 500));

    fireEvent.pointerMove(frame, { pointerType: "mouse", clientX: 210, clientY: 270 });
    expect(frame).toHaveAttribute("data-zoom-active", "false");

    markImageLoaded(image, 1200, 1500);
    await waitFor(() => expect(frame).toHaveAttribute("data-zoom-ready", "true"));

    fireEvent.pointerMove(frame, { pointerType: "mouse", clientX: 210, clientY: 270 });
    expect(frame).toHaveAttribute("data-zoom-active", "true");
    expect(frame.style.getPropertyValue("--product-zoom-x")).toBe("50.000%");
    expect(frame.style.getPropertyValue("--product-zoom-y")).toBe("50.000%");

    fireEvent.pointerMove(frame, { pointerType: "mouse", clientX: 30, clientY: 45 });
    fireEvent.pointerMove(frame, { pointerType: "mouse", clientX: 390, clientY: 495 });
    expect(animationFrames).toHaveLength(1);
    flushAnimationFrame(animationFrames);
    expect(frame.style.getPropertyValue("--product-zoom-x")).toBe("95.000%");
    expect(frame.style.getPropertyValue("--product-zoom-y")).toBe("95.000%");
  });

  it("returns to normal on leave and starts a fresh inspection on re-entry", async () => {
    renderZoom("/serum-front.webp");
    const image = screen.getByRole("img", { name: "Glass Skin Serum" });
    const frame = image.closest<HTMLElement>(".product-detail-zoom")!;
    vi.spyOn(frame, "getBoundingClientRect").mockReturnValue(rect(0, 0, 500, 500));
    markImageLoaded(image, 1000, 1000);
    await waitFor(() => expect(frame).toHaveAttribute("data-zoom-ready", "true"));

    fireEvent.pointerEnter(frame, { pointerType: "mouse", clientX: 475, clientY: 475 });
    fireEvent.pointerLeave(frame, { pointerType: "mouse" });
    expect(frame).toHaveAttribute("data-zoom-active", "false");

    fireEvent.transitionEnd(image, { propertyName: "transform" });
    expect(frame.style.getPropertyValue("--product-zoom-x")).toBe("50%");
    expect(frame.style.getPropertyValue("--product-zoom-y")).toBe("50%");

    fireEvent.pointerEnter(frame, { pointerType: "mouse", clientX: 25, clientY: 25 });
    expect(frame).toHaveAttribute("data-zoom-active", "true");
    expect(frame.style.getPropertyValue("--product-zoom-x")).toBe("5.000%");
    expect(frame.style.getPropertyValue("--product-zoom-y")).toBe("5.000%");
  });

  it("resets when the gallery source changes and ignores touch pointers", async () => {
    const view = renderZoom("/serum-front.webp");
    let image = screen.getByRole("img", { name: "Glass Skin Serum" });
    const frame = image.closest<HTMLElement>(".product-detail-zoom")!;
    vi.spyOn(frame, "getBoundingClientRect").mockReturnValue(rect(0, 0, 500, 500));
    markImageLoaded(image, 800, 1200);
    await waitFor(() => expect(frame).toHaveAttribute("data-zoom-ready", "true"));
    fireEvent.pointerEnter(frame, { pointerType: "mouse", clientX: 400, clientY: 400 });
    expect(frame).toHaveAttribute("data-zoom-active", "true");

    view.rerender(zoomTree("/serum-back.webp"));
    image = screen.getByRole("img", { name: "Glass Skin Serum" });
    await waitFor(() => expect(frame).toHaveAttribute("data-zoom-ready", "false"));
    expect(frame).toHaveAttribute("data-zoom-active", "false");
    expect(frame.style.getPropertyValue("--product-zoom-x")).toBe("50%");
    expect(image).toHaveAttribute("src", "/serum-back.webp");

    markImageLoaded(image, 1600, 900);
    await waitFor(() => expect(frame).toHaveAttribute("data-zoom-ready", "true"));
    fireEvent.pointerEnter(frame, { pointerType: "touch", clientX: 250, clientY: 250 });
    expect(frame).toHaveAttribute("data-zoom-active", "false");

    fireEvent.pointerEnter(frame, { pointerType: "mouse", clientX: 250, clientY: 250 });
    expect(frame).toHaveAttribute("data-zoom-active", "true");
    fireEvent.error(image);
    await waitFor(() => expect(frame).toHaveAttribute("data-zoom-ready", "false"));
    expect(frame).toHaveAttribute("data-zoom-active", "false");
  });

  it("resets when a variant changes even when both variants share the same image", async () => {
    const view = render(zoomTree("/shared-variant.webp", "black"));
    const image = screen.getByRole("img", { name: "Glass Skin Serum" });
    const frame = image.closest<HTMLElement>(".product-detail-zoom")!;
    vi.spyOn(frame, "getBoundingClientRect").mockReturnValue(rect(0, 0, 500, 500));
    markImageLoaded(image, 1200, 1500);
    await waitFor(() => expect(frame).toHaveAttribute("data-zoom-ready", "true"));
    fireEvent.pointerEnter(frame, { pointerType: "mouse", clientX: 450, clientY: 450 });
    expect(frame).toHaveAttribute("data-zoom-active", "true");

    view.rerender(zoomTree("/shared-variant.webp", "gold"));
    await waitFor(() => expect(frame).toHaveAttribute("data-zoom-active", "false"));
    expect(frame.style.getPropertyValue("--product-zoom-x")).toBe("50%");
    expect(frame.style.getPropertyValue("--product-zoom-y")).toBe("50%");
  });
});

function renderZoom(src: string) {
  return render(zoomTree(src));
}

function zoomTree(src: string, resetKey = src) {
  return (
    <MotionContext.Provider value={{ finePointer: true, reducedMotion: false }}>
      <ProductImageZoom src={src} alt="Glass Skin Serum" resetKey={resetKey} />
    </MotionContext.Provider>
  );
}

function markImageLoaded(image: HTMLElement, width: number, height: number) {
  Object.defineProperty(image, "naturalWidth", { configurable: true, value: width });
  Object.defineProperty(image, "naturalHeight", { configurable: true, value: height });
  fireEvent.load(image);
}

function flushAnimationFrame(queue: FrameRequestCallback[]) {
  queue.shift()?.(performance.now());
}

function rect(left: number, top: number, width: number, height: number): DOMRect {
  return {
    left,
    top,
    width,
    height,
    right: left + width,
    bottom: top + height,
    x: left,
    y: top,
    toJSON: () => ({}),
  };
}
