import { fireEvent, render, screen } from "@testing-library/react";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";

import type { PublicBrandListItemResponse } from "@/lib/api";

import { BrandDirectory, type BrandDirectoryCopy } from "./BrandDirectory";

const logoDisplay = {
  scale: "STANDARD",
  padding: "STANDARD",
  alignX: "CENTER",
  alignY: "CENTER",
} as const;

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

const copy: BrandDirectoryCopy = {
  brandDirectory: "Brands",
  viewAllBrands: "View all brands",
  searchBrands: "Search brands…",
  clearSearch: "Clear brand search",
  noBrandMatches: "No brands match your search.",
  brandsEmpty: "No brands yet.",
  brandsUnavailable: "Brands unavailable.",
  products: (count) => `${count} products`,
};

function brands(count: number): PublicBrandListItemResponse[] {
  return Array.from({ length: count }, (_, index) => ({
    id: `brand-${index + 1}`,
    name: index === count - 1 ? "Avène Long Editorial Beauty House" : `Brand ${index + 1}`,
    slug: `brand-${index + 1}`,
    logoUrl: null,
    logoDisplay,
    productCount: count - index,
  })).reverse();
}

describe("BrandDirectory navigation surfaces", () => {
  it("renders a small catalogue as compact sorted alphabet groups", () => {
    const { container } = render(
      <BrandDirectory
        brands={brands(6)}
        loading={false}
        locale="en"
        onNavigate={vi.fn()}
        copy={copy}
        surface="mega"
      />,
    );

    expect(container.querySelectorAll(".brand-menu__alphabet-link")).toHaveLength(6);
    expect(
      Array.from(container.querySelectorAll(".brand-menu__alphabet-group h3"), (node) =>
        node.textContent?.trim(),
      ),
    ).toEqual(["A", "B"]);
    expect(
      Array.from(container.querySelectorAll(".brand-menu__alphabet-link"), (node) =>
        node.textContent?.trim(),
      ),
    ).toEqual([
      "Avène Long Editorial Beauty House",
      "Brand 1",
      "Brand 2",
      "Brand 3",
      "Brand 4",
      "Brand 5",
    ]);
    expect(screen.queryByPlaceholderText("Search brands…")).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: /View all brands/ })).toHaveAttribute(
      "href",
      "/brands",
    );
  });

  it("shows every large-catalogue brand in grouped search results", () => {
    const { container } = render(
      <BrandDirectory
        brands={brands(100)}
        loading={false}
        locale="en"
        onNavigate={vi.fn()}
        copy={copy}
        surface="mega"
      />,
    );

    expect(container.querySelectorAll(".brand-menu__alphabet-link")).toHaveLength(100);
    const input = screen.getByPlaceholderText("Search brands…");
    fireEvent.change(input, { target: { value: "brand" } });
    expect(container.querySelectorAll(".brand-menu__alphabet-link")).toHaveLength(100);

    fireEvent.change(input, { target: { value: "missing" } });
    expect(screen.getByText("No brands match your search.")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Clear brand search" }));
    expect(input).toHaveValue("");
  });

  it("keeps alphabet groups in row-major DOM order regardless of API order", () => {
    const records = [
      { ...brands(1)[0]!, id: "d", slug: "dermactive", name: "Dermactive" },
      { ...brands(1)[0]!, id: "b", slug: "bioderma", name: "Bioderma" },
      { ...brands(1)[0]!, id: "a", slug: "anua", name: "Anua" },
      { ...brands(1)[0]!, id: "c", slug: "cosrx", name: "COSRX" },
      { ...brands(1)[0]!, id: "e", slug: "eucerin", name: "Eucerin" },
    ];
    const { container } = render(
      <BrandDirectory
        brands={records}
        loading={false}
        locale="en"
        onNavigate={vi.fn()}
        copy={copy}
        surface="mega"
      />,
    );

    expect(
      Array.from(container.querySelectorAll(".brand-menu__alphabet-group h3"), (node) =>
        node.textContent?.trim(),
      ),
    ).toEqual(["A", "B", "C", "D", "E"]);
    expect(container.querySelector(".brand-menu--mega")).toHaveAttribute("data-columns", "4");
  });

  it("uses a separate capped mobile list and keeps failure local to brand discovery", () => {
    const { container, rerender } = render(
      <BrandDirectory
        brands={brands(30)}
        loading={false}
        locale="ar"
        onNavigate={vi.fn()}
        copy={copy}
        surface="mobile"
      />,
    );

    expect(
      container.querySelectorAll(".brand-menu__mobile-list .brand-menu__brand-link"),
    ).toHaveLength(8);
    expect(container.querySelector(".brand-menu--mobile")).toHaveAttribute("dir", "rtl");

    rerender(
      <BrandDirectory
        brands={[]}
        loading={false}
        error
        locale="en"
        onNavigate={vi.fn()}
        copy={copy}
        surface="mobile"
      />,
    );
    expect(screen.getByText("Brands unavailable.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /View all brands/ })).toBeInTheDocument();
  });
});
