import { fireEvent, render, screen, within } from "@testing-library/react";
import {
  createElement,
  type ComponentProps,
  type ComponentType,
  type ElementType,
  type ReactNode,
} from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const actions = {
  saveForLater: vi.fn(),
  moveSavedToCart: vi.fn(),
  removeSaved: vi.fn(),
  moveAllSaved: vi.fn(),
};

let locale: "en" | "ar" = "en";
let storeState: Record<string, unknown>;

vi.mock("@tanstack/react-router", () => ({
  createFileRoute: () => (configuration: unknown) => configuration,
  Link: ({ children, to, ...props }: { children: ReactNode; to: string }) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
}));

vi.mock("@/components/motion/Primitives", () => ({
  Reveal: ({
    as = "div",
    children,
    stagger: _stagger,
    staggerMs: _staggerMs,
    distance: _distance,
    ...props
  }: {
    as?: ElementType;
    children: ReactNode;
    stagger?: boolean;
    staggerMs?: number;
    distance?: number;
  }) => createElement(as, props, children),
}));

vi.mock("@/components/ui/polished-image", () => ({
  PolishedImage: ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} />,
}));

vi.mock("@/components/ui/button", () => ({
  Button: ({
    asChild,
    children,
    variant: _variant,
    size: _size,
    ...props
  }: ComponentProps<"button"> & {
    asChild?: boolean;
    variant?: string;
    size?: string;
  }) => (asChild ? children : <button {...props}>{children}</button>),
}));

vi.mock("@/lib/store", () => ({ useStore: () => storeState }));
vi.mock("@/lib/i18n", () => ({
  useI18n: () => ({
    locale,
    t: (key: string) => {
      const ar: Record<string, string> = {
        "cart.emptyTitle": "حقيبتك فارغة",
        "cart.savedForLater": "محفوظ لوقت لاحق",
        "cart.moveToBag": "انقلي إلى الحقيبة",
        "cart.removeSaved": "إزالة",
        "cart.savedRemain": "منتجات محفوظة لوقت لاحق",
      };
      const en: Record<string, string> = {
        "cart.emptyTitle": "Your bag is empty",
        "cart.savedForLater": "Saved for later",
        "cart.moveToBag": "Move to bag",
        "cart.removeSaved": "Remove",
        "cart.savedRemain": "items saved for later",
        "cart.summary": "Order summary",
        "cart.saveForLater": "Save for later",
      };
      return (locale === "ar" ? ar[key] : en[key]) ?? key;
    },
  }),
}));

import { Route } from "./cart";

const CartPage = (Route as unknown as { component: ComponentType }).component;

const availableSaved = {
  id: "saved-1",
  productId: "product-1",
  variantId: "variant-1",
  slug: "cerave-cleanser",
  name: "CeraVe Cleanser",
  brand: "CeraVe",
  variant: "473ml",
  image: "/cleanser.webp",
  desiredQuantity: 2,
  priceWhenSaved: 50_000,
  currentPrice: 60_000,
  priceChange: "INCREASED",
  available: 4,
  status: "AVAILABLE",
  issues: [],
  savedAt: "2026-09-02T00:00:00.000Z",
};

function defaultStore() {
  return {
    lines: [],
    savedForLater: [availableSaved],
    subtotal: 0,
    discountTotal: 0,
    estimatedTotal: 0,
    totalSavings: 0,
    couponCode: null,
    appliedPromotions: [],
    promotionMessages: [],
    cartLoading: false,
    setQty: vi.fn(),
    remove: vi.fn(),
    saveForLater: actions.saveForLater,
    moveSavedToCart: actions.moveSavedToCart,
    removeSaved: actions.removeSaved,
    moveAllSaved: actions.moveAllSaved,
    pendingVariants: [],
    pendingSavedItems: [],
    applyCoupon: vi.fn(),
    removeCoupon: vi.fn(),
  };
}

describe("Cart Saved for Later experience", () => {
  beforeEach(() => {
    locale = "en";
    storeState = defaultStore();
    Object.values(actions).forEach((action) => action.mockReset());
  });

  it("keeps a saved-only bag useful without rendering checkout totals", () => {
    render(<CartPage />);

    expect(screen.getByRole("heading", { name: "Your bag is empty" })).toBeInTheDocument();
    const saved = screen.getByRole("region", { name: /Saved for later/ });
    expect(within(saved).getByText("CeraVe Cleanser")).toBeInTheDocument();
    expect(screen.queryByText("Order summary")).not.toBeInTheDocument();
    fireEvent.click(within(saved).getByRole("button", { name: "Move to bag" }));
    expect(actions.moveSavedToCart).toHaveBeenCalledWith("saved-1");
  });

  it("renders active and deferred intent separately and exposes one-click Save", () => {
    storeState = {
      ...defaultStore(),
      lines: [
        {
          variantId: "active-1",
          productId: "product-active",
          slug: "active-product",
          name: "Active Product",
          size: "Default",
          image: "/active.webp",
          price: 500,
          qty: 1,
          maxAvailable: 5,
          available: 5,
          status: "AVAILABLE",
          issues: [],
        },
      ],
      subtotal: 500,
      estimatedTotal: 500,
    };
    render(<CartPage />);

    expect(screen.getByText("Order summary")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Save for later" }));
    expect(actions.saveForLater).toHaveBeenCalledWith("active-1");
    expect(screen.getByRole("region", { name: /Saved for later/ })).toBeInTheDocument();
  });

  it("renders Arabic actions and blocks moving unavailable intent", () => {
    locale = "ar";
    storeState = {
      ...defaultStore(),
      savedForLater: [{ ...availableSaved, status: "OUT_OF_STOCK", available: 0 }],
    };
    render(<CartPage />);

    expect(screen.getByRole("heading", { name: "حقيبتك فارغة" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /محفوظ لوقت لاحق/ })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "انقلي إلى الحقيبة" })).toBeDisabled();
    fireEvent.click(screen.getByRole("button", { name: "إزالة" }));
    expect(actions.removeSaved).toHaveBeenCalledWith("saved-1");
  });
});
