import { fireEvent, render, screen } from "@testing-library/react";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";

import { CategoryShowcase } from "./CategoryShowcase";
import { getCategoryCoverflowState } from "./category-coverflow";

vi.mock("embla-carousel-react", () => ({
  default: () => [() => undefined, undefined],
}));

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

vi.mock("@/components/motion/Primitives", () => ({
  Reveal: ({ children, className }: { children: ReactNode; className?: string }) => (
    <div className={className}>{children}</div>
  ),
}));

vi.mock("@/components/motion/motion-context", () => ({
  useMotionPreferences: () => ({ reducedMotion: false, finePointer: true }),
}));

vi.mock("@/lib/catalog", () => ({
  useCategories: (initialCategories: unknown) => ({ data: initialCategories }),
}));

vi.mock("@/lib/store", () => ({
  useStore: () => ({ locale: "en" }),
}));

function category(index: number, overrides: Record<string, unknown> = {}) {
  return {
    id: `category-${index}`,
    parentId: null,
    slug: `category-${index}`,
    nameEn: `Category ${index}`,
    nameAr: `الفئة ${index}`,
    imageUrl: "/bioreza-logo.png",
    sortOrder: index,
    productCount: index + 1,
    ...overrides,
  };
}

describe("CategoryShowcase", () => {
  it("derives restrained mirrored coverflow states from the active index", () => {
    expect(getCategoryCoverflowState(3, 3)).toEqual({
      depth: "active",
      opacity: 1,
      rotation: 0,
      scale: 1,
      zIndex: 4,
    });
    expect(getCategoryCoverflowState(2, 3)).toMatchObject({
      depth: "near",
      rotation: 10,
      scale: 0.92,
    });
    expect(getCategoryCoverflowState(4, 3)).toMatchObject({
      depth: "near",
      rotation: -10,
      scale: 0.92,
    });
    expect(getCategoryCoverflowState(2, 3, true).rotation).toBe(-10);
    expect(getCategoryCoverflowState(0, 3).depth).toBe("outer");
  });

  it("hides the section for an empty category response", () => {
    const { container } = render(<CategoryShowcase initialCategories={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("centers a single real category without carousel controls or synthetic duplicates", () => {
    const { container } = render(<CategoryShowcase initialCategories={[category(0)]} />);

    expect(container.querySelectorAll(".sf-category-showcase__slide")).toHaveLength(1);
    expect(container.querySelector(".sf-category-showcase")).toHaveAttribute(
      "data-category-count",
      "1",
    );
    expect(screen.queryByRole("button", { name: "Next category" })).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Shop now: Category 0" })).toHaveAttribute(
      "href",
      "/categories/category-0",
    );
  });

  it("keeps two categories distinct and enables finite navigation", () => {
    const { container } = render(
      <CategoryShowcase initialCategories={[category(0), category(1)]} />,
    );

    expect(container.querySelectorAll(".sf-category-showcase__slide")).toHaveLength(2);
    expect(screen.getByRole("button", { name: "Previous category" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Next category" })).toBeInTheDocument();
    expect(container.querySelectorAll('a[href^="/categories/"]')).toHaveLength(2);
  });

  it("renders every admin-managed category and exposes a branded failed-image fallback", () => {
    const categories = Array.from({ length: 10 }, (_, index) =>
      category(
        index,
        index === 5 ? { imageUrl: "/missing.jpg", nameEn: "Long Body Care Name" } : {},
      ),
    );
    const { container } = render(<CategoryShowcase initialCategories={categories} />);

    expect(container.querySelectorAll(".sf-category-showcase__slide")).toHaveLength(10);
    expect(container.querySelectorAll('a[href^="/categories/"]')).toHaveLength(10);
    fireEvent.error(container.querySelector('img[src="/missing.jpg"]')!);
    expect(screen.getByText("BIOREZA")).toBeInTheDocument();
    expect(screen.getByText("Long Body Care Name")).toBeInTheDocument();
  });
});
