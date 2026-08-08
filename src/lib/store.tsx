import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { trackCommerceEvent } from "@/lib/analytics";
import type { AppliedPromotion, AuthSession, AuthUser, CommerceCartResponse, WishlistResponse } from "@/lib/api";
import {
  addCartItem,
  applyCartCoupon,
  addWishlist,
  apiErrorMessage,
  clearCartRequest,
  clearSession,
  getCart,
  getWishlist,
  hasRefreshSession,
  logoutRequest,
  refreshSession,
  removeCartItem,
  removeCartCoupon,
  removeWishlist,
  rememberSession,
  updateCartItem,
} from "@/lib/api";

export type CartLine = {
  variantId: string;
  productId: string;
  slug: string;
  name: string;
  image: string;
  size: string;
  price: number;
  originalPrice: number;
  discount: number;
  qty: number;
  maxAvailable: number;
  status: string;
  issues: string[];
};

type Locale = "ar" | "en";
type AddLine = {
  variantId?: string | undefined;
  productId?: string | undefined;
  slug?: string | undefined;
  name?: string | undefined;
  image?: string | undefined;
  size?: string | undefined;
  price?: number | undefined;
  qty: number;
  [key: string]: unknown;
};
type StoreValue = {
  lines: CartLine[];
  wishlist: string[];
  cartOpen: boolean;
  searchOpen: boolean;
  count: number;
  subtotal: number;
  discountTotal: number;
  estimatedTotal: number;
  totalSavings: number;
  couponCode: string | null;
  appliedPromotions: AppliedPromotion[];
  promotionMessages: string[];
  giftOptions: Array<{ variantId: string; quantity: number; customerChooses: boolean; promotionId: string }>;
  cartLoading: boolean;
  pendingVariants: string[];
  authHydrated: boolean;
  user: AuthUser | null;
  locale: Locale;
  add: (line: AddLine) => Promise<boolean>;
  remove: (variantId: string, size?: string) => Promise<void>;
  setQty: (variantId: string, sizeOrQty: string | number, qty?: number) => Promise<void>;
  clear: () => Promise<void>;
  applyCoupon: (code: string) => Promise<boolean>;
  removeCoupon: () => Promise<void>;
  toggleWish: (productId: string, slug: string) => Promise<void>;
  setCartOpen: (value: boolean) => void;
  setSearchOpen: (value: boolean) => void;
  setSession: (session: AuthSession) => void;
  signOut: () => Promise<void>;
  setLocale: (locale: Locale) => void;
};

const StoreContext = createContext<StoreValue | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [authHydrated, setAuthHydrated] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [locale, setLocaleState] = useState<Locale>("en");
  const [pendingVariants, setPendingVariants] = useState<string[]>([]);
  const [wishOverrides, setWishOverrides] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setReady(true);
    const saved = window.localStorage.getItem("bioreza.locale") === "ar" ? "ar" : "en";
    setLocaleState(saved);
    document.documentElement.lang = saved;
    document.documentElement.dir = saved === "ar" ? "rtl" : "ltr";
    if (!hasRefreshSession()) {
      setAuthHydrated(true);
      return;
    }
    void refreshSession()
      .then((session) => setUser(session.user))
      .catch(() => setUser(null))
      .finally(() => setAuthHydrated(true));
  }, []);

  const cartQuery = useQuery({ queryKey: ["cart"], queryFn: getCart, enabled: ready });
  const wishlistQuery = useQuery({
    queryKey: ["wishlist"],
    queryFn: getWishlist,
    enabled: ready && Boolean(user),
    retry: false,
  });
  const cart = cartQuery.data;
  const wishlistData = wishlistQuery.data;

  const commitCart = useCallback(
    (next: CommerceCartResponse) => queryClient.setQueryData(["cart"], next),
    [queryClient],
  );
  const commitWishlist = useCallback(
    (next: WishlistResponse) => queryClient.setQueryData(["wishlist"], next),
    [queryClient],
  );
  const fail = useCallback((error: unknown) => toast.error(apiErrorMessage(error)), []);
  const markPending = useCallback((variantId: string, pending: boolean) => {
    setPendingVariants((current) =>
      pending
        ? current.includes(variantId)
          ? current
          : [...current, variantId]
        : current.filter((id) => id !== variantId),
    );
  }, []);

  const add = useCallback(
    async (line: AddLine) => {
      if (!line.variantId) {
        toast.error("This item is not available from the live catalog yet.");
        return false;
      }
      const variantId = line.variantId;
      const previous = queryClient.getQueryData<CommerceCartResponse>(["cart"]);
      if (previous && line.productId && line.slug && line.name && line.price !== undefined) {
        const current = previous.items.find((item) => item.variantId === variantId);
        const quantity = Math.min(99, (current?.quantity ?? 0) + line.qty);
        const unitPrice = Math.round(line.price * 100);
        const optimisticItem = current
          ? { ...current, quantity, lineTotal: unitPrice * quantity }
          : {
              variantId,
              productId: line.productId,
              slug: line.slug,
              productNameEn: line.name,
              productNameAr: line.name,
              variantNameEn: line.size ?? "Standard",
              variantNameAr: line.size ?? "Standard",
              sku: "",
              imageUrl: line.image ?? null,
              unitPrice,
              quantity,
              lineTotal: unitPrice * quantity,
              discount: 0,
              discountedLineTotal: unitPrice * quantity,
              available: 99,
              maxAvailable: 99,
              status: "AVAILABLE" as const,
              issues: [],
            };
        const items = current
          ? previous.items.map((item) => (item.variantId === variantId ? optimisticItem : item))
          : [...previous.items, optimisticItem];
        commitCart(recalculateCart(previous, items));
      }
      markPending(variantId, true);
      try {
        commitCart(await addCartItem(variantId, line.qty));
        trackCommerceEvent("product_added_to_cart", { productId: line.productId, variantId, metadata: { quantity: line.qty } });
        return true;
      } catch (error) {
        if (previous) commitCart(previous);
        fail(error);
        return false;
      } finally {
        markPending(variantId, false);
      }
    },
    [commitCart, fail, markPending, queryClient],
  );

  const remove = useCallback(
    async (variantId: string) => {
      const previous = queryClient.getQueryData<CommerceCartResponse>(["cart"]);
      if (previous) {
        commitCart(
          recalculateCart(
            previous,
            previous.items.filter((item) => item.variantId !== variantId),
          ),
        );
      }
      markPending(variantId, true);
      try {
        commitCart(await removeCartItem(variantId));
        trackCommerceEvent("product_removed_from_cart", { variantId });
        toast("Removed from your bag");
      } catch (error) {
        if (previous) commitCart(previous);
        fail(error);
      } finally {
        markPending(variantId, false);
      }
    },
    [commitCart, fail, markPending, queryClient],
  );

  const setQty = useCallback(
    async (variantId: string, sizeOrQty: string | number, optionalQty?: number) => {
      const quantity = typeof sizeOrQty === "number" ? sizeOrQty : (optionalQty ?? 1);
      const previous = queryClient.getQueryData<CommerceCartResponse>(["cart"]);
      if (previous) {
        const items =
          quantity <= 0
            ? previous.items.filter((item) => item.variantId !== variantId)
            : previous.items.map((item) =>
                item.variantId === variantId
                  ? { ...item, quantity, lineTotal: item.unitPrice * quantity }
                  : item,
              );
        commitCart(recalculateCart(previous, items));
      }
      markPending(variantId, true);
      try {
        commitCart(
          quantity <= 0
            ? await removeCartItem(variantId)
            : await updateCartItem(variantId, quantity),
        );
      } catch (error) {
        if (previous) commitCart(previous);
        fail(error);
      } finally {
        markPending(variantId, false);
      }
    },
    [commitCart, fail, markPending, queryClient],
  );

  const clear = useCallback(async () => {
    const previous = queryClient.getQueryData<CommerceCartResponse>(["cart"]);
    if (previous) commitCart(recalculateCart(previous, []));
    try {
      commitCart(await clearCartRequest());
    } catch (error) {
      if (previous) commitCart(previous);
      fail(error);
    }
  }, [commitCart, fail, queryClient]);

  const applyCoupon = useCallback(async (code: string) => {
    try {
      commitCart(await applyCartCoupon(code));
      return true;
    } catch (error) {
      fail(error);
      return false;
    }
  }, [commitCart, fail]);

  const removeCoupon = useCallback(async () => {
    try {
      commitCart(await removeCartCoupon());
    } catch (error) {
      fail(error);
    }
  }, [commitCart, fail]);

  const baseWishlist = useMemo(
    () => (wishlistData?.items ?? []).map((item) => item.product.slug),
    [wishlistData],
  );
  const wishlist = useMemo(() => {
    const slugs = new Set(baseWishlist);
    Object.entries(wishOverrides).forEach(([slug, included]) => {
      if (included) slugs.add(slug);
      else slugs.delete(slug);
    });
    return [...slugs];
  }, [baseWishlist, wishOverrides]);

  const toggleWish = useCallback(
    async (productId: string, slug: string) => {
      if (!user) {
        toast("Sign in to save a wishlist");
        return;
      }
      const desired = !wishlist.includes(slug);
      setWishOverrides((current) => ({ ...current, [slug]: desired }));
      try {
        const next = desired ? await addWishlist(productId) : await removeWishlist(productId);
        commitWishlist(next);
        trackCommerceEvent(desired ? "wishlist_added" : "wishlist_removed", { productId });
        toast(desired ? "Saved to your wishlist" : "Removed from your wishlist");
      } catch (error) {
        fail(error);
      } finally {
        setWishOverrides((current) => {
          const next = { ...current };
          delete next[slug];
          return next;
        });
      }
    },
    [commitWishlist, fail, user, wishlist],
  );

  const setSession = useCallback(
    (session: AuthSession) => {
      rememberSession(session);
      setUser(session.user);
      setAuthHydrated(true);
      void queryClient.invalidateQueries();
    },
    [queryClient],
  );

  const signOut = useCallback(async () => {
    await logoutRequest().catch(() => clearSession());
    setUser(null);
    queryClient.removeQueries({ queryKey: ["wishlist"] });
    void queryClient.invalidateQueries({ queryKey: ["cart"] });
  }, [queryClient]);

  const setLocale = useCallback(
    (next: Locale) => {
      setLocaleState(next);
      window.localStorage.setItem("bioreza.locale", next);
      document.documentElement.lang = next;
      document.documentElement.dir = next === "ar" ? "rtl" : "ltr";
      void queryClient.invalidateQueries({ queryKey: ["catalog"] });
    },
    [queryClient],
  );

  const lines = useMemo<CartLine[]>(
    () =>
      (cart?.items ?? []).map((item) => ({
        variantId: item.variantId,
        productId: item.productId,
        slug: item.slug,
        name: locale === "ar" ? item.productNameAr : item.productNameEn,
        image: item.imageUrl ?? "",
        size: locale === "ar" ? item.variantNameAr : item.variantNameEn,
        price: item.unitPrice / 100,
        originalPrice: item.unitPrice / 100,
        discount: item.discount / 100,
        qty: item.quantity,
        maxAvailable: item.maxAvailable,
        status: item.status,
        issues: item.issues,
      })),
    [cart, locale],
  );

  const value = useMemo<StoreValue>(
    () => ({
      lines,
      wishlist,
      cartOpen,
      searchOpen,
      count: cart?.totalQuantity ?? 0,
      subtotal: (cart?.subtotal ?? 0) / 100,
      discountTotal: (cart?.discountTotal ?? 0) / 100,
      estimatedTotal: (cart?.estimatedTotal ?? cart?.subtotal ?? 0) / 100,
      totalSavings: (cart?.totalSavings ?? 0) / 100,
      couponCode: cart?.couponCode ?? null,
      appliedPromotions: cart?.appliedPromotions ?? [],
      promotionMessages: cart?.promotionMessages ?? [],
      giftOptions: cart?.giftOptions ?? [],
      cartLoading: cartQuery.isLoading,
      pendingVariants,
      authHydrated,
      user,
      locale,
      add,
      remove,
      setQty,
      clear,
      applyCoupon,
      removeCoupon,
      toggleWish,
      setCartOpen,
      setSearchOpen,
      setSession,
      signOut,
      setLocale,
    }),
    [
      add,
      applyCoupon,
      authHydrated,
      cart,
      cartOpen,
      cartQuery.isLoading,
      clear,
      lines,
      locale,
      pendingVariants,
      remove,
      removeCoupon,
      searchOpen,
      setLocale,
      setQty,
      signOut,
      toggleWish,
      user,
      wishlist,
    ],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

function recalculateCart(cart: CommerceCartResponse, items: CommerceCartResponse["items"]): CommerceCartResponse {
  return {
    ...cart,
    items,
    subtotal: items.reduce((total, item) => total + item.lineTotal, 0),
    discountTotal: 0,
    estimatedTotal: items.reduce((total, item) => total + item.lineTotal, 0),
    totalSavings: 0,
    appliedPromotions: [],
    promotionMessages: [],
    giftOptions: [],
    totalQuantity: items.reduce((total, item) => total + item.quantity, 0),
    hasIssues: items.some((item) => item.issues.length > 0 || item.status !== "AVAILABLE"),
    updatedAt: new Date().toISOString(),
  };
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used within StoreProvider");
  return context;
}
