import { fireEvent, render, screen } from "@testing-library/react";
import type { ComponentType, ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { Concerns } from "./Sections";

type QueryResult = {
  data: unknown;
  error: unknown;
  isError: boolean;
  isPending: boolean;
  isFetching?: boolean;
  refetch: () => void;
};

const queryMock = vi.hoisted(() => ({
  refetch: vi.fn(),
  concerns: null as unknown as QueryResult,
  products: vi.fn(),
}));

vi.mock("@tanstack/react-query", () => ({
  keepPreviousData: (previous: unknown) => previous,
  useQueryClient: () => ({ prefetchQuery: vi.fn() }),
  useQuery: ({ queryKey }: { queryKey: unknown[] }) =>
    queryKey[0] === "concerns" ? queryMock.concerns : queryMock.products(queryKey[1]),
}));

vi.mock("@tanstack/react-router", () => ({
  Link: ({
    children,
    params,
    to,
    ...props
  }: {
    children: ReactNode;
    params?: { slug?: string };
    to: string;
  }) => (
    <a href={to.replace("$slug", params?.slug ?? "")} {...props}>
      {children}
    </a>
  ),
}));

vi.mock("@/components/motion/Primitives", () => ({
  ImageReveal: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  Magnetic: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  ParallaxMedia: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  Reveal: ({
    as: Element = "div",
    children,
    className,
  }: {
    as?: ComponentType<{ children: ReactNode; className?: string }> | "div" | "ul";
    children: ReactNode;
    className?: string;
  }) => <Element {...(className ? { className } : {})}>{children}</Element>,
  TextReveal: ({ className, lines }: { className?: string; lines: string[] }) => (
    <h2 className={className}>{lines.join(" ")}</h2>
  ),
}));

vi.mock("@/components/motion/motion-context", () => ({
  useMotionPreferences: () => ({ finePointer: true, reducedMotion: false }),
}));

vi.mock("@/components/shop/ProductCard", () => ({
  ProductCard: ({ product }: { product: { name: string } }) => <p>{product.name}</p>,
}));

vi.mock("@/lib/catalog", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@/lib/catalog")>()),
  mapProduct: (product: unknown) => product,
}));

vi.mock("@/lib/api", () => ({
  apiErrorMessage: () => "The concern service did not respond.",
  getConcernProducts: vi.fn(),
  listConcerns: vi.fn(),
  subscribeNewsletter: vi.fn(),
}));

vi.mock("@/lib/store", () => ({
  useStore: () => ({ locale: "en" }),
}));

const concerns = [
  {
    id: "c-dry",
    slug: "dry-skin",
    name: { en: "Dry Skin", ar: "البشرة الجافة" },
    productCount: 24,
  },
  { id: "c-acne", slug: "acne", name: { en: "Acne-Prone Skin", ar: "حب الشباب" }, productCount: 0 },
  {
    id: "c-oily",
    slug: "oily-skin",
    name: { en: "Oily Skin", ar: "البشرة الدهنية" },
    productCount: 67,
  },
];

const productsFor: Record<string, Array<{ slug: string; name: string }>> = {
  "dry-skin": [{ slug: "rich-cream", name: "Rich Cream" }],
  "oily-skin": [{ slug: "clay-wash", name: "Clay Wash" }],
};

function concernsResult(data: unknown, overrides: Partial<QueryResult> = {}): QueryResult {
  return {
    data,
    error: null,
    isError: false,
    isPending: false,
    refetch: queryMock.refetch,
    ...overrides,
  };
}

describe("homepage Concerns", () => {
  beforeEach(() => {
    queryMock.refetch.mockReset();
    queryMock.products.mockReset();
    queryMock.products.mockImplementation((slug: string) => ({
      data: { data: productsFor[slug] ?? [] },
      isPending: false,
      isFetching: false,
    }));
  });

  it("lists skin types with counts and shows the first type's products", () => {
    queryMock.concerns = concernsResult(concerns);

    render(<Concerns />);

    const tabs = screen.getAllByRole("tab");
    expect(tabs.map((tab) => tab.textContent)).toEqual([
      "Dry Skin24 products",
      "Oily Skin67 products",
    ]);
    expect(screen.getByRole("tab", { name: /Dry Skin/ })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByText("Rich Cream")).toBeVisible();
    expect(screen.getByRole("link", { name: /Shop all 24 for Dry Skin/ })).toHaveAttribute(
      "href",
      "/skin-concerns/dry-skin",
    );
  });

  it("switches products and the shop-all link when another skin type is chosen", () => {
    queryMock.concerns = concernsResult(concerns);

    render(<Concerns />);
    fireEvent.click(screen.getByRole("tab", { name: /Oily Skin/ }));

    expect(screen.getByRole("tab", { name: /Oily Skin/ })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByText("Clay Wash")).toBeVisible();
    expect(screen.queryByText("Rich Cream")).toBeNull();
    expect(screen.getByRole("link", { name: /Shop all 67 for Oily Skin/ })).toHaveAttribute(
      "href",
      "/skin-concerns/oily-skin",
    );
  });

  it("moves between skin types with the arrow keys", () => {
    queryMock.concerns = concernsResult(concerns);

    render(<Concerns />);
    fireEvent.keyDown(screen.getByRole("tab", { name: /Dry Skin/ }), { key: "ArrowDown" });

    const oily = screen.getByRole("tab", { name: /Oily Skin/ });
    expect(oily).toHaveAttribute("aria-selected", "true");
    expect(oily).toHaveFocus();
  });

  it("offers the shop when no skin type has products yet", () => {
    queryMock.concerns = concernsResult([{ ...concerns[1] }]);

    render(<Concerns />);

    expect(screen.getByText("Skin type guides are on their way.")).toBeVisible();
    expect(screen.getByRole("link", { name: /Shop skincare/ })).toHaveAttribute("href", "/shop");
  });

  it("offers an in-place retry when the public Concern request fails", () => {
    queryMock.concerns = concernsResult(undefined, { error: new Error("offline"), isError: true });

    render(<Concerns />);
    fireEvent.click(screen.getByRole("button", { name: /Try again/ }));

    expect(screen.getByText("The concern service did not respond.")).toBeVisible();
    expect(queryMock.refetch).toHaveBeenCalledTimes(1);
  });
});
