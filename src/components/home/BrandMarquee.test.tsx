import { fireEvent, render } from "@testing-library/react";
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
            id: "empty",
            name: "Empty Brand",
            slug: "empty-brand",
            logoUrl: "https://cdn.example.com/empty-brand.png",
            productCount: 0,
          },
          {
            id: "one",
            name: "Brand One",
            slug: "brand-one",
            logoUrl: "https://cdn.example.com/brand-one.png",
            productCount: 4,
          },
          { id: "two", name: "Brand Two", slug: "brand-two", logoUrl: null, productCount: 7 },
        ]}
      />,
    );

    expect(container.querySelectorAll('a[href="/brands/brand-one"]')).toHaveLength(2);
    expect(container.querySelectorAll('a[href="/brands/brand-two"]')).toHaveLength(2);
    expect(container.querySelectorAll('a[href="/brands/empty-brand"]')).toHaveLength(2);
    expect(
      container.querySelector('img[src="https://cdn.example.com/brand-one.png"]'),
    ).toHaveAttribute("alt", "Brand One");
    expect(container.querySelector('a[href="/brands/brand-one"]')).toHaveAttribute(
      "aria-label",
      "Brand One",
    );
    expect(container.querySelectorAll(".sf-brand-marquee__logo")).toHaveLength(6);
    expect(
      Array.from(
        container.querySelectorAll(
          ".sf-brand-marquee__group:not(.sf-brand-marquee__group--clone) a",
        ),
        (link) => link.getAttribute("aria-label"),
      ),
    ).toEqual(["Brand One", "Brand Two", "Empty Brand"]);
    expect(
      container.querySelector(".sf-brand-marquee__group:not(.sf-brand-marquee__group--clone) img"),
    ).toHaveAttribute("loading", "eager");

    const clonedLinks = container.querySelectorAll(".sf-brand-marquee__group--clone a");
    expect(clonedLinks).toHaveLength(3);
    clonedLinks.forEach((link) => expect(link).toHaveAttribute("tabindex", "-1"));
    expect(container.querySelector(".sf-brand-marquee__group--clone img")).toHaveAttribute(
      "loading",
      "lazy",
    );
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

  it("keeps a calm per-brand velocity as the admin-managed catalog grows", () => {
    const { container } = render(
      <BrandMarquee
        initialBrands={Array.from({ length: 20 }, (_, index) => ({
          id: `brand-${index}`,
          name: `Brand ${index}`,
          slug: `brand-${index}`,
          logoUrl: null,
          productCount: index,
        }))}
      />,
    );

    expect(
      container
        .querySelector<HTMLElement>(".sf-brand-marquee")
        ?.style.getPropertyValue("--brand-marquee-duration"),
    ).toBe("92s");
  });

  it("falls back to the brand name when an admin-managed logo cannot load", () => {
    const { container, getByText } = render(
      <BrandMarquee
        initialBrands={[
          {
            id: "one",
            name: "Resilient Beauty",
            slug: "resilient-beauty",
            logoUrl: "https://cdn.example.com/missing.png",
            productCount: 0,
          },
        ]}
      />,
    );

    fireEvent.error(container.querySelector("img")!);

    expect(getByText("Resilient Beauty")).toHaveClass("sf-brand-marquee__name");
  });
});
