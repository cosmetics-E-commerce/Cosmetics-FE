import { describe, expect, it } from "vitest";

import type { Product } from "./products";
import {
  isOptionValueAvailable,
  optionValueState,
  resolveVariant,
  selectionForVariant,
} from "./variant-selection";

const options: NonNullable<Product["options"]> = [
  {
    id: "size",
    label: "Size",
    values: [
      { id: "30", label: "30 ml" },
      { id: "60", label: "60 ml" },
    ],
  },
  {
    id: "color",
    label: "Color",
    values: [
      { id: "black", label: "Black" },
      { id: "gold", label: "Gold" },
    ],
  },
];

const variants: Product["sizes"] = [
  {
    id: "30-black",
    label: "30 ml / Black",
    price: 450,
    stock: 10,
    optionValueIds: ["30", "black"],
  },
  {
    id: "30-gold",
    label: "30 ml / Gold",
    price: 470,
    stock: 3,
    optionValueIds: ["30", "gold"],
  },
  {
    id: "60-black",
    label: "60 ml / Black",
    price: 750,
    stock: 4,
    optionValueIds: ["60", "black"],
  },
];

describe("variant selection", () => {
  it("resolves the exact selected purchasable variant", () => {
    expect(resolveVariant(options, variants, { size: "60", color: "black" })?.id).toBe("60-black");
  });

  it("does not resolve an impossible combination", () => {
    expect(resolveVariant(options, variants, { size: "60", color: "gold" })).toBeUndefined();
  });

  it("disables a value that cannot complete the current selection", () => {
    expect(
      isOptionValueAvailable({
        optionId: "color",
        valueId: "gold",
        options,
        variants,
        selection: { size: "60", color: "black" },
      }),
    ).toBe(false);
  });

  it("creates selector state from the first available variant", () => {
    expect(selectionForVariant(options, variants[0])).toEqual({
      size: "30",
      color: "black",
    });
  });

  it("distinguishes sold-out values from impossible combinations", () => {
    const soldOutVariants: Product["sizes"] = [
      ...variants,
      {
        id: "60-gold",
        label: "60 ml / Gold",
        price: 770,
        stock: 0,
        optionValueIds: ["60", "gold"],
      },
    ];

    expect(
      optionValueState({
        optionId: "color",
        valueId: "gold",
        options,
        variants: soldOutVariants,
        selection: { size: "60", color: "black" },
      }),
    ).toBe("sold-out");
    expect(
      optionValueState({
        optionId: "color",
        valueId: "gold",
        options,
        variants,
        selection: { size: "60", color: "black" },
      }),
    ).toBe("unavailable");
  });
});
