import { render } from "@testing-library/react";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";

import { BrandMarquee } from "./BrandMarquee";

vi.mock("@tanstack/react-router", () => ({
  Link: ({
    to,
    search,
    children,
    ...props
  }: AnchorHTMLAttributes<HTMLAnchorElement> & {
    to: string;
    search: { brand: string };
    children: ReactNode;
  }) => (
    <a href={`${to}?brand=${search.brand}`} {...props}>
      {children}
    </a>
  ),
}));

vi.mock("@/lib/catalog", () => ({
  useBrands: (initialBrands: unknown) => ({ data: initialBrands }),
}));

vi.mock("@/lib/store", () => ({
  useStore: () => ({ locale: "en" }),
}));

describe("BrandMarquee", () => {
  it("links every visible marquee copy to that brand's complete shop listing", () => {
    const { container } = render(
      <BrandMarquee
        initialBrands={[
          { id: "one", name: "Brand One", slug: "brand-one", logoUrl: null, productCount: 4 },
          { id: "two", name: "Brand Two", slug: "brand-two", logoUrl: null, productCount: 7 },
        ]}
      />,
    );

    expect(container.querySelectorAll('a[href="/shop?brand=brand-one"]')).toHaveLength(2);
    expect(container.querySelectorAll('a[href="/shop?brand=brand-two"]')).toHaveLength(2);

    const clonedLinks = container.querySelectorAll(".sf-brand-marquee__group--clone a");
    expect(clonedLinks).toHaveLength(2);
    clonedLinks.forEach((link) => expect(link).toHaveAttribute("tabindex", "-1"));
  });
});
