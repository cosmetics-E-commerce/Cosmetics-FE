import type { Product } from "@/lib/products";

export type VariantSelection = Record<string, string>;
export type OptionValueState = "available" | "sold-out" | "unavailable";
type Variant = Product["sizes"][number];
type Option = NonNullable<Product["options"]>[number];

export function selectionForVariant(
  options: Option[],
  variant: Variant | undefined,
): VariantSelection {
  const selected = new Set(variant?.optionValueIds ?? []);
  return Object.fromEntries(
    options.flatMap((option) => {
      const value = option.values.find((item) => selected.has(item.id));
      return value ? [[option.id, value.id]] : [];
    }),
  );
}

export function resolveVariant(
  options: Option[],
  variants: Variant[],
  selection: VariantSelection,
): Variant | undefined {
  if (!options.length) return variants[0];
  const selectedIds = options
    .map((option) => selection[option.id])
    .filter((value): value is string => Boolean(value));
  if (selectedIds.length !== options.length) return undefined;
  return variants.find((variant) => {
    const valueIds = variant.optionValueIds ?? [];
    return (
      valueIds.length === selectedIds.length &&
      selectedIds.every((valueId) => valueIds.includes(valueId))
    );
  });
}

export function isOptionValueAvailable(input: {
  optionId: string;
  valueId: string;
  options: Option[];
  variants: Variant[];
  selection: VariantSelection;
}): boolean {
  return optionValueState(input) === "available";
}

export function optionValueState(input: {
  optionId: string;
  valueId: string;
  options: Option[];
  variants: Variant[];
  selection: VariantSelection;
}): OptionValueState {
  const candidateSelection = { ...input.selection, [input.optionId]: input.valueId };
  const matching = input.variants.filter((variant) => {
    const ids = variant.optionValueIds ?? [];
    return input.options.every((option) => {
      const selected = candidateSelection[option.id];
      return !selected || ids.includes(selected);
    });
  });
  if (!matching.length) return "unavailable";
  return matching.some((variant) => variant.stock !== 0) ? "available" : "sold-out";
}
