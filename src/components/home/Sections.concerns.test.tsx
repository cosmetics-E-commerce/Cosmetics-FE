import { fireEvent, render, screen } from "@testing-library/react";
import type { ComponentType, ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { Concerns } from "./Sections";

const queryMock = vi.hoisted(() => ({
  refetch: vi.fn(),
  useQuery: vi.fn(),
}));

vi.mock("@tanstack/react-query", () => ({
  useQuery: queryMock.useQuery,
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

vi.mock("@/lib/api", () => ({
  apiErrorMessage: () => "The concern service did not respond.",
  listConcerns: vi.fn(),
  subscribeNewsletter: vi.fn(),
}));

vi.mock("@/lib/store", () => ({
  useStore: () => ({ locale: "en" }),
}));

describe("homepage Concerns", () => {
  beforeEach(() => {
    queryMock.refetch.mockReset();
    queryMock.useQuery.mockReset();
  });

  it("renders canonical public Concern links", () => {
    queryMock.useQuery.mockReturnValue({
      data: [
        {
          id: "concern-dry",
          slug: "dry-skin",
          name: { en: "Dry Skin", ar: "البشرة الجافة" },
        },
        {
          id: "concern-sensitive",
          slug: "sensitive-skin",
          name: { en: "Sensitive Skin", ar: "البشرة الحساسة" },
        },
      ],
      error: null,
      isError: false,
      isPending: false,
      refetch: queryMock.refetch,
    });

    render(<Concerns />);

    expect(screen.getByRole("link", { name: "Dry Skin" })).toHaveAttribute(
      "href",
      "/skin-concerns/dry-skin",
    );
    expect(screen.getByRole("link", { name: "Sensitive Skin" })).toHaveAttribute(
      "href",
      "/skin-concerns/sensitive-skin",
    );
  });

  it("shows a composed commerce path instead of a blank column when nothing is published", () => {
    queryMock.useQuery.mockReturnValue({
      data: [],
      error: null,
      isError: false,
      isPending: false,
      refetch: queryMock.refetch,
    });

    render(<Concerns />);

    expect(screen.getByText("New guides in preparation")).toBeVisible();
    expect(screen.getByRole("link", { name: /Shop skincare/ })).toHaveAttribute("href", "/shop");
  });

  it("offers an in-place retry when the public Concern request fails", () => {
    queryMock.useQuery.mockReturnValue({
      data: undefined,
      error: new Error("offline"),
      isError: true,
      isPending: false,
      refetch: queryMock.refetch,
    });

    render(<Concerns />);
    fireEvent.click(screen.getByRole("button", { name: /Try again/ }));

    expect(screen.getByText("The concern service did not respond.")).toBeVisible();
    expect(queryMock.refetch).toHaveBeenCalledTimes(1);
  });
});
