import { describe, expect, it } from "vitest";
import { selectProductCardImages } from "./product-card-media";

describe("selectProductCardImages", () => {
  it("keeps a resolved primary and chooses the first distinct gallery image", () => {
    expect(
      selectProductCardImages({
        image: " https://cdn.example.com/front.webp ",
        gallery: [
          "https://cdn.example.com/front.webp",
          "products/serum/back.webp",
          "https://cdn.example.com/detail.webp?width=900",
        ],
      }),
    ).toEqual({
      primary: "https://cdn.example.com/front.webp",
      secondary: "products/serum/back.webp",
    });
  });

  it("does not create a hover image from blanks or duplicate references", () => {
    expect(
      selectProductCardImages({
        image: "products/serum/front.webp",
        gallery: ["", " products/serum/front.webp ", "   "],
      }),
    ).toEqual({
      primary: "products/serum/front.webp",
      secondary: null,
    });
  });

  it("falls back to the first valid gallery image for a sparse legacy product", () => {
    expect(
      selectProductCardImages({
        image: "",
        gallery: [" ", "https://assets.example.com/product.png"],
      }),
    ).toEqual({
      primary: "https://assets.example.com/product.png",
      secondary: null,
    });
  });
});
