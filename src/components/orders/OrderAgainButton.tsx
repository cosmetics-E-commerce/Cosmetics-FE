import { useMutation } from "@tanstack/react-query";
import { RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { addAvailableCartItems, apiErrorMessage } from "@/lib/api";
import { useStore } from "@/lib/store";

type OrderLine = { variantId: string; quantity: number; subtotal?: number };

/**
 * One tap: everything from a past order that can still be bought goes into the
 * bag (capped to stock), the bag opens, and anything unavailable is reported.
 */
export function OrderAgainButton({
  items,
  loadItems,
  locale,
  className,
  variant = "line",
}: {
  items?: OrderLine[];
  /** For list rows that do not carry their lines; called on tap. */
  loadItems?: () => Promise<OrderLine[]>;
  locale: "ar" | "en";
  className?: string;
  variant?: "line" | "solid" | "quiet";
}) {
  const ar = locale === "ar";
  const { acceptCart, setCartOpen } = useStore();
  const orderAgain = useMutation({
    mutationFn: async () => {
      const lines = items ?? (await loadItems?.()) ?? [];
      // Free promotional gifts are not part of a repeat purchase.
      const paid = lines
        .filter((line) => line.subtotal === undefined || line.subtotal > 0)
        .map(({ variantId, quantity }) => ({ variantId, quantity }));
      return addAvailableCartItems(paid);
    },
    onSuccess: ({ cart, added, skipped }) => {
      acceptCart(cart);
      if (added.length) {
        setCartOpen(true);
        toast.success(
          ar
            ? `أضفنا ${added.length} ${added.length === 1 ? "منتجًا" : "منتجات"} إلى حقيبتك`
            : `${added.length} ${added.length === 1 ? "item" : "items"} added to your bag`,
        );
      }
      if (skipped.length) {
        toast(
          ar
            ? `${skipped.length} غير متاح حاليًا`
            : `${skipped.length} ${skipped.length === 1 ? "item is" : "items are"} unavailable right now`,
        );
      }
    },
    onError: (error) => toast.error(apiErrorMessage(error, locale)),
  });
  return (
    <Button
      type="button"
      variant={variant}
      size="pill"
      className={className}
      loading={orderAgain.isPending}
      onClick={() => orderAgain.mutate()}
    >
      <RotateCcw aria-hidden="true" />
      {ar ? "اطلبي مرة أخرى" : "Order again"}
    </Button>
  );
}
