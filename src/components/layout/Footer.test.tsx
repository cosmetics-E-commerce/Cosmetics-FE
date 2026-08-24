import { render, screen } from "@testing-library/react";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { Footer } from "./Footer";

const i18nMock = vi.hoisted(() => ({ locale: "en" as "en" | "ar" }));

const translations = {
  en: {
    "footer.createdBy": "Website created by",
    "footer.rights": "All rights reserved.",
  },
  ar: {
    "footer.createdBy": "تم إنشاء الموقع بواسطة",
    "footer.rights": "جميع الحقوق محفوظة.",
  },
} as const;

vi.mock("@tanstack/react-router", () => ({
  Link: ({
    to,
    children,
    ...props
  }: AnchorHTMLAttributes<HTMLAnchorElement> & {
    to: string;
    children: ReactNode;
  }) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
}));

vi.mock("@/components/motion/Primitives", () => ({
  Reveal: ({ children, className }: { children: ReactNode; className?: string }) => (
    <div className={className}>{children}</div>
  ),
}));

vi.mock("@/lib/i18n", () => ({
  useI18n: () => ({
    locale: i18nMock.locale,
    t: (key: keyof (typeof translations)["en"]) => translations[i18nMock.locale][key] ?? key,
  }),
}));

describe("Footer developer credit", () => {
  beforeEach(() => {
    i18nMock.locale = "en";
  });

  it("renders one subtle external Hammerload credit in the shared legal area", () => {
    render(<Footer />);

    const links = screen.getAllByRole("link", { name: "Hammerload" });
    expect(links).toHaveLength(1);
    const link = links[0]!;
    expect(link).toHaveAttribute("href", "https://hammerload.com/");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    expect(link.closest(".site-footer__credit")).toHaveTextContent("Website created by Hammerload");
  });

  it("localizes the credit sentence while preserving the Hammerload brand in Arabic", () => {
    i18nMock.locale = "ar";
    render(<Footer />);

    expect(screen.getByText("تم إنشاء الموقع بواسطة")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Hammerload" })).toHaveTextContent("Hammerload");
  });
});
