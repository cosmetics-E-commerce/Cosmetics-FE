import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

let locale: "en" | "ar" = "en";
let storeState: Record<string, unknown>;

const copy: Record<string, Record<string, string>> = {
  en: {
    "cart.promo": "Promo code",
    "cart.promoPlaceholder": "Enter promo code",
    "cart.applyPromo": "Apply",
    "cart.applyingPromo": "Applying…",
    "cart.promoApplied": "Promo code applied",
    "cart.removePromo": "Remove",
    "cart.changePromo": "Change",
    "cart.youSaved": "You saved",
    "cart.confirmReplacePromo": "Replace code",
    "cart.cancelReplacePromo": "Cancel",
    "cart.promoNoLongerApplicable":
      "is no longer applicable because your cart no longer meets the offer requirements.",
  },
  ar: {
    "cart.promo": "رمز الخصم",
    "cart.promoPlaceholder": "أدخلي رمز الخصم",
    "cart.applyPromo": "تطبيق",
    "cart.applyingPromo": "جارٍ التطبيق…",
    "cart.promoApplied": "تم تطبيق رمز الخصم",
    "cart.removePromo": "إزالة",
    "cart.changePromo": "تغيير",
    "cart.youSaved": "وفّرتِ",
    "cart.confirmReplacePromo": "استبدال الرمز",
    "cart.cancelReplacePromo": "إلغاء",
    "cart.promoNoLongerApplicable": "لم يعد قابلاً للتطبيق لأن الحقيبة لم تعد تستوفي شروط العرض.",
  },
};

vi.mock("@/lib/store", () => ({ useStore: () => storeState }));
vi.mock("@/lib/i18n", () => ({
  useI18n: () => ({ locale, t: (key: string) => copy[locale]?.[key] ?? key }),
}));

import { PromoCodeControl } from "./PromoCodeControl";

function baseStore() {
  return {
    couponCode: null,
    couponInvalidation: null,
    appliedPromotions: [],
    applyCoupon: vi.fn().mockResolvedValue({ ok: true }),
    removeCoupon: vi.fn().mockResolvedValue({ ok: true }),
  };
}

describe("PromoCodeControl", () => {
  beforeEach(() => {
    locale = "en";
    storeState = baseStore();
  });

  it("normalizes a code, submits once, and supports Enter", async () => {
    const applyCoupon = vi.fn().mockResolvedValue({ ok: true });
    storeState = { ...baseStore(), applyCoupon };
    render(<PromoCodeControl />);

    fireEvent.change(screen.getByLabelText("Promo code"), { target: { value: "  bioreza20 " } });
    fireEvent.submit(screen.getByLabelText("Promo code").closest("form")!);
    fireEvent.submit(screen.getByLabelText("Promo code").closest("form")!);

    await waitFor(() => expect(applyCoupon).toHaveBeenCalledTimes(1));
    expect(applyCoupon).toHaveBeenCalledWith("BIOREZA20");
  });

  it("associates the actionable backend error with the input", async () => {
    storeState = {
      ...baseStore(),
      applyCoupon: vi.fn().mockResolvedValue({
        ok: false,
        error: "Add EGP 250 more to use this promo code.",
      }),
    };
    render(<PromoCodeControl />);

    fireEvent.change(screen.getByLabelText("Promo code"), { target: { value: "BIOREZA20" } });
    fireEvent.click(screen.getByRole("button", { name: "Apply" }));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Add EGP 250 more to use this promo code.",
    );
    expect(screen.getByLabelText("Promo code")).toHaveAttribute("aria-describedby", "coupon-error");
  });

  it("shows authoritative savings and confirms replacing the single supported code", async () => {
    const applyCoupon = vi.fn().mockResolvedValue({ ok: true });
    storeState = {
      ...baseStore(),
      couponCode: "BIOREZA20",
      appliedPromotions: [
        {
          id: "promotion-id",
          couponCode: "BIOREZA20",
          title: "20% discount applied",
          discountAmount: 30_000,
          shippingDiscount: 0,
        },
      ],
      applyCoupon,
    };
    render(<PromoCodeControl />);

    expect(screen.getByText("20% discount applied")).toBeInTheDocument();
    expect(screen.getByText(/You saved/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Change" }));
    fireEvent.change(screen.getByLabelText("Promo code"), { target: { value: "summer25" } });
    fireEvent.click(screen.getByRole("button", { name: "Apply" }));
    expect(screen.getByRole("alert")).toHaveTextContent("Replace BIOREZA20 with SUMMER25?");
    fireEvent.click(screen.getByRole("button", { name: "Replace code" }));
    await waitFor(() => expect(applyCoupon).toHaveBeenCalledWith("SUMMER25"));
  });

  it("renders Arabic controls and a stale-cart explanation", () => {
    locale = "ar";
    storeState = {
      ...baseStore(),
      couponInvalidation: { code: "PROMO_NOT_APPLICABLE", promoCode: "BIOREZA20" },
    };
    render(<PromoCodeControl />);

    expect(screen.getByLabelText("رمز الخصم")).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent("BIOREZA20");
    expect(screen.getByRole("button", { name: "تطبيق" })).toBeInTheDocument();
  });
});
