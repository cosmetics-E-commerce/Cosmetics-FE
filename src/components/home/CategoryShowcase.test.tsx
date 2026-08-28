import { act, fireEvent, render, screen } from "@testing-library/react";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { CategoryShowcase } from "./CategoryShowcase";
import { getCategoryCoverflowState } from "./category-coverflow";

const emblaMock = vi.hoisted(() => ({ useEmblaCarousel: vi.fn() }));
const motionMock = vi.hoisted(() => ({ reducedMotion: false }));

vi.mock("embla-carousel-react", () => ({ default: emblaMock.useEmblaCarousel }));

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
  useMotionPreferences: () => ({
    reducedMotion: motionMock.reducedMotion,
    finePointer: true,
  }),
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
  beforeEach(() => {
    motionMock.reducedMotion = false;
    emblaMock.useEmblaCarousel.mockReset();
    emblaMock.useEmblaCarousel.mockReturnValue([() => undefined, undefined]);
  });

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

  it("renders every root category and excludes child categories from the homepage rail", () => {
    const categories = Array.from({ length: 10 }, (_, index) =>
      category(
        index,
        index === 5 ? { imageUrl: "/missing.jpg", nameEn: "Long Body Care Name" } : {},
      ),
    );
    categories.splice(
      3,
      0,
      category(20, {
        parentId: categories[0]!.id,
        nameEn: "Child Category",
        slug: "child-category",
      }),
    );
    const { container } = render(<CategoryShowcase initialCategories={categories} />);

    expect(container.querySelectorAll(".sf-category-showcase__slide")).toHaveLength(10);
    expect(container.querySelectorAll('a[href^="/categories/"]')).toHaveLength(10);
    expect(screen.queryByText("Child Category")).not.toBeInTheDocument();
    expect(container.querySelector('a[href="/categories/child-category"]')).not.toBeInTheDocument();
    fireEvent.error(container.querySelector('img[src="/missing.jpg"]')!);
    expect(screen.getByText("BIOREZA")).toBeInTheDocument();
    expect(screen.getByText("Long Body Care Name")).toBeInTheDocument();
  });

  it("retargets rapid arrow input without forcing a jump after selection", () => {
    let selectedIndex = 2;
    const listeners = new Map<string, (...args: unknown[]) => void>();
    const api = {
      canScrollNext: vi.fn(() => true),
      canScrollPrev: vi.fn(() => true),
      off: vi.fn(),
      on: vi.fn((event: string, listener: (...args: unknown[]) => void) => {
        listeners.set(event, listener);
        return api;
      }),
      scrollNext: vi.fn(),
      scrollPrev: vi.fn(),
      scrollTo: vi.fn(),
      selectedScrollSnap: vi.fn(() => selectedIndex),
      slideNodes: vi.fn(() => []),
    };
    emblaMock.useEmblaCarousel.mockReturnValue([() => undefined, api]);

    render(
      <CategoryShowcase
        initialCategories={Array.from({ length: 5 }, (_, index) => category(index))}
      />,
    );

    api.scrollTo.mockClear();
    fireEvent.click(screen.getByRole("button", { name: "Next category" }));
    fireEvent.click(screen.getByRole("button", { name: "Next category" }));
    fireEvent.click(screen.getByRole("button", { name: "Previous category" }));

    expect(api.scrollNext).toHaveBeenCalledTimes(2);
    expect(api.scrollPrev).toHaveBeenCalledTimes(1);

    selectedIndex = 3;
    act(() => listeners.get("select")?.(api));
    expect(api.scrollTo).not.toHaveBeenCalledWith(3, true);
    expect(screen.getByRole("button", { name: "Choose Category 3" })).toHaveAttribute(
      "aria-current",
      "true",
    );
  });

  it("uses immediate semantic navigation for reduced-motion users", () => {
    motionMock.reducedMotion = true;
    const api = {
      canScrollNext: vi.fn(() => true),
      canScrollPrev: vi.fn(() => true),
      off: vi.fn(),
      on: vi.fn(() => api),
      scrollNext: vi.fn(),
      scrollPrev: vi.fn(),
      scrollTo: vi.fn(),
      selectedScrollSnap: vi.fn(() => 1),
      slideNodes: vi.fn(() => []),
    };
    emblaMock.useEmblaCarousel.mockReturnValue([() => undefined, api]);

    render(
      <CategoryShowcase
        initialCategories={Array.from({ length: 3 }, (_, index) => category(index))}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Next category" }));

    expect(api.scrollNext).toHaveBeenCalledWith(true);
    expect(emblaMock.useEmblaCarousel).toHaveBeenCalledWith(
      expect.objectContaining({ duration: 20 }),
    );
  });
});
