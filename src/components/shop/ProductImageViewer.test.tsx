import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useState } from "react";
import { describe, expect, it } from "vitest";

import { ProductImageViewer, type ProductViewerImage } from "./ProductImageViewer";

const images: ProductViewerImage[] = [
  { id: "one", url: "/product-one.webp", altText: "Product front" },
  { id: "two", url: "/product-two.webp", altText: "Product texture" },
  { id: "three", url: "/product-three.webp", altText: "Product packaging" },
];

function ViewerHarness({
  initialIndex = 0,
  items = images,
}: {
  initialIndex?: number;
  items?: ProductViewerImage[];
}) {
  const [index, setIndex] = useState(initialIndex);
  return <ProductImageViewer images={items} index={index} onIndexChange={setIndex} locale="en" />;
}

describe("ProductImageViewer", () => {
  it("opens on the selected gallery image and supports controls and keyboard navigation", async () => {
    render(<ViewerHarness initialIndex={1} />);

    const trigger = screen.getByRole("button", { name: /Open Product texture/i });
    trigger.focus();
    fireEvent.click(trigger);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Product texture" })).toBeInTheDocument();
    expect(screen.getByText("2 / 3")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Reset zoom" })).toBeDisabled();
    fitActiveImage("Product texture", { naturalWidth: 4000, naturalHeight: 5000 });
    expect(document.querySelector(".product-viewer__stage")).toHaveAttribute(
      "data-fit-ready",
      "true",
    );
    expect(document.querySelector(".product-viewer__stage")).toHaveStyle({
      "--viewer-fit-width": "640px",
      "--viewer-fit-height": "800px",
    });

    fireEvent.click(screen.getByRole("button", { name: "Next product image" }));
    expect(screen.getByRole("img", { name: "Product packaging" })).toBeInTheDocument();

    fireEvent.keyDown(window, { key: "ArrowLeft" });
    expect(screen.getByRole("img", { name: "Product texture" })).toBeInTheDocument();
    fitActiveImage("Product texture", { naturalWidth: 4000, naturalHeight: 5000 });

    fireEvent.click(screen.getByRole("button", { name: "Zoom in" }));
    expect(screen.getByText("150%")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Product texture" })).toHaveStyle({
      transform: "scale(1.5)",
    });
    expect(screen.getByRole("button", { name: "Reset zoom" })).toBeEnabled();

    fireEvent.click(screen.getByRole("button", { name: "Next product image" }));
    expect(screen.getByText("100%")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Reset zoom" })).toBeDisabled();

    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    await waitFor(() =>
      expect(screen.getByRole("button", { name: /Open Product packaging/i })).toHaveFocus(),
    );
  });

  it("keeps a single image usable without meaningless navigation", () => {
    render(<ViewerHarness items={[images[0]!]} />);

    fireEvent.click(screen.getByRole("button", { name: /Open Product front/i }));
    expect(screen.getByRole("img", { name: "Product front" })).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Previous product image" }),
    ).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Next product image" })).not.toBeInTheDocument();
    expect(screen.queryByText("1 / 1")).not.toBeInTheDocument();
  });
});

function fitActiveImage(
  accessibleName: string,
  dimensions: { naturalWidth: number; naturalHeight: number },
) {
  const stage = document.querySelector<HTMLElement>(".product-viewer__stage")!;
  Object.defineProperties(stage, {
    clientWidth: { configurable: true, value: 1000 },
    clientHeight: { configurable: true, value: 800 },
  });
  const image = screen.getByRole("img", { name: accessibleName });
  Object.defineProperties(image, {
    naturalWidth: { configurable: true, value: dimensions.naturalWidth },
    naturalHeight: { configurable: true, value: dimensions.naturalHeight },
  });
  fireEvent.load(image);
}
