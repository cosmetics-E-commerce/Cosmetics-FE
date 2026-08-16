import { render } from "@testing-library/react";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";

import { BrandMarquee } from "./BrandMarquee";

vi.mock("@tanstack/react-router", () => ({
  Link: ({
    to,
    params,
    children,
    ...props
  }: AnchorHTMLAttributes<HTMLAnchorElement> & {
    to: string;
    params?: { slug: string };
    children: ReactNode;
  }) => (
    <a href={to.replace("$slug", params?.slug ?? "")} {...props}>
      {children}
    </a>
  ),
}));

vi.mock("@/lib/catalog", () => ({
  useAllBrands: (initialBrands: unknown) => ({ data: initialBrands }),
}));

vi.mock("@/lib/store", () => ({
  useStore: () => ({ locale: "en" }),
}));

describe("BrandMarquee", () => {
  it("links every active brand, including a newly added empty brand, to its product page", () => {
    const { container } = render(
      <BrandMarquee
        initialBrands={[
          {
            id: "one",
            name: "Brand One",
            slug: "brand-one",
            logoUrl: "https://cdn.example.com/brand-one.png",
            productCount: 4,
          },
          { id: "two", name: "Brand Two", slug: "brand-two", logoUrl: null, productCount: 7 },
          {
            id: "empty",
            name: "Empty Brand",
            slug: "empty-brand",
            logoUrl: "https://cdn.example.com/empty-brand.png",
            productCount: 0,
          },
        ]}
      />,
    );

    expect(container.querySelectorAll('a[href="/brands/brand-one"]')).toHaveLength(2);
    expect(container.querySelectorAll('a[href="/brands/brand-two"]')).toHaveLength(2);
    expect(container.querySelectorAll('a[href="/brands/empty-brand"]')).toHaveLength(2);
    expect(
      container.querySelector('img[src="https://cdn.example.com/brand-one.png"]'),
    ).toHaveAttribute("alt", "Brand One");

    const clonedLinks = container.querySelectorAll(".sf-brand-marquee__group--clone a");
    expect(clonedLinks).toHaveLength(3);
    clonedLinks.forEach((link) => expect(link).toHaveAttribute("tabindex", "-1"));
  });

  it("does not animate or duplicate a single brand", () => {
    const { container } = render(
      <BrandMarquee
        initialBrands={[
          { id: "one", name: "Brand One", slug: "brand-one", logoUrl: null, productCount: 0 },
        ]}
      />,
    );

    expect(container.querySelector(".sf-brand-marquee__track")).toHaveAttribute("data-static");
    expect(container.querySelector(".sf-brand-marquee__group--clone")).not.toBeInTheDocument();
  });
});
