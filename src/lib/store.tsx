import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type RefObject,
  type ReactNode,
} from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { trackCommerceEvent } from "@/lib/analytics";
import type {
  AppliedPromotion,
  AuthSession,
  AuthUser,
  CommerceCartResponse,
  WishlistResponse,
} from "@/lib/api";
import {
  addCartItem,
  applyCartCoupon,
  addWishlist,
  apiErrorMessage,
  clearCartRequest,
  getCart,
  getWishlist,
  hasRefreshSession,
  logoutRequest,
  mergeGuestCart,
  moveAvailableSavedItemsToCart,
  moveSavedItemToCart,
  refreshSession,
  removeCartItem,
  removeCartCoupon,
  removeSavedForLaterItem,
  removeWishlist,
  rememberSession,
  saveCartItemForLater,
  breakCartBundle,
  removeCartBundle,
  updateCartItem,
} from "@/lib/api";

export type CartLine = {
  variantId: string;
  productId: string;
  categoryId: string;
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

export type SavedForLaterLine = {
  id: string;
  productId: string | null;
  variantId: string | null;
  slug: string;
  name: string;
  variant: string;
  brand: string | null;
  image: string;
  desiredQuantity: number;
  priceWhenSaved: number;
  currentPrice: number | null;
  priceChange: string;
  available: number;
  status: string;
  savedAt: string;
};

type Locale = "ar" | "en";
export type CouponMutationResult = { ok: true } | { ok: false; error: string };
export type AddLine = {
  variantId?: string | undefined;
  productId?: string | undefined;
  categoryId?: string | undefined;
  brandId?: string | null | undefined;
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
  bundleInstances: CommerceCartResponse["bundleInstances"];
  savedForLater: SavedForLaterLine[];
  wishlist: string[];
  cartOpen: boolean;
  searchOpen: boolean;
  searchTriggerRef: RefObject<HTMLButtonElement | null>;
  count: number;
  cartFeedbackKey: number;
  subtotal: number;
  discountTotal: number;
  estimatedTotal: number;
  totalSavings: number;
  couponCode: string | null;
  couponInvalidation: CommerceCartResponse["couponInvalidation"];
  appliedPromotions: AppliedPromotion[];
  promotionMessages: string[];
  giftOptions: Array<{
    variantId: string;
    quantity: number;
    customerChooses: boolean;
    promotionId: string;
  }>;
  cartLoading: boolean;
  pendingVariants: string[];
  pendingSavedItems: string[];
  authHydrated: boolean;
  user: AuthUser | null;
  locale: Locale;
  add: (line: AddLine) => Promise<boolean>;
  acceptCart: (cart: CommerceCartResponse) => void;
  remove: (variantId: string, size?: string) => Promise<void>;
  saveForLater: (variantId: string) => Promise<void>;
  moveSavedToCart: (itemId: string) => Promise<void>;
  removeSaved: (itemId: string) => Promise<void>;
  moveAllSaved: () => Promise<void>;
  breakBundle: (instanceId: string) => Promise<void>;
  removeBundle: (instanceId: string) => Promise<void>;
  setQty: (variantId: string, sizeOrQty: string | number, qty?: number) => Promise<void>;
  clear: () => Promise<void>;
  applyCoupon: (code: string) => Promise<CouponMutationResult>;
  removeCoupon: () => Promise<CouponMutationResult>;
  toggleWish: (productId: string, slug: string) => Promise<void>;
  setCartOpen: (value: boolean) => void;
  setSearchOpen: (value: boolean) => void;
  setSession: (session: AuthSession) => Promise<void>;
  signOut: () => Promise<void>;
  setLocale: (locale: Locale) => void;
};

const StoreContext = createContext<StoreValue | null>(null);
type ProductCardStoreValue = Pick<StoreValue, "locale" | "wishlist" | "toggleWish" | "add">;
const ProductCardStoreContext = createContext<ProductCardStoreValue | null>(null);

export function StoreProvider({
  children,
  initialLocale = "en",
}: {
  children: ReactNode;
  initialLocale?: Locale;
}) {
  const queryClient = useQueryClient();
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [authHydrated, setAuthHydrated] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartFeedbackKey, setCartFeedbackKey] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchTriggerRef = useRef<HTMLButtonElement>(null);
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const [pendingVariants, setPendingVariants] = useState<string[]>([]);
  const [pendingSavedItems, setPendingSavedItems] = useState<string[]>([]);
  const pendingVariantIds = useRef(new Set<string>());
  const [wishOverrides, setWishOverrides] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setReady(true);
    const saved = initialLocale;
    setLocaleState(saved);
    window.localStorage.setItem("bioreza.locale", saved);
    if (!hasRefreshSession()) {
      setAuthHydrated(true);
      return;
    }
    void refreshSession()
      .then(async (session) => {
        setUser(session.user);
        try {
          queryClient.setQueryData(["cart"], await mergeGuestCart());
        } catch {
          void queryClient.invalidateQueries({ queryKey: ["cart"] });
        }
      })
      .catch(() => setUser(null))
      .finally(() => setAuthHydrated(true));
  }, [initialLocale, queryClient]);

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
  const fail = useCallback(
    (error: unknown) => toast.error(apiErrorMessage(error, locale)),
    [locale],
  );
  const markPending = useCallback((variantId: string, pending: boolean) => {
    if (pending) pendingVariantIds.current.add(variantId);
    else pendingVariantIds.current.delete(variantId);
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
        toast.error(
          locale === "ar"
            ? "هذا المنتج غير متاح في المتجر حالياً."
            : "This item is not available from the live catalog yet.",
        );
        return false;
      }
      const variantId = line.variantId;
      if (pendingVariantIds.current.has(variantId)) return false;
      markPending(variantId, true);
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
              categoryId: line.categoryId ?? "",
              categoryIds: line.categoryId ? [line.categoryId] : [],
              brandId: line.brandId ?? null,
              slug: line.slug,
              productNameEn: line.name,
              productNameAr: line.name,
              variantNameEn: line.size ?? "Standard",
              variantNameAr: line.size ?? "Standard",
              variantOptions: [],
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
      try {
        commitCart(await addCartItem(variantId, line.qty));
        setCartFeedbackKey((current) => current + 1);
        if (
          typeof navigator !== "undefined" &&
          navigator.maxTouchPoints > 0 &&
          typeof navigator.vibrate === "function"
        ) {
          navigator.vibrate(18);
        }
        trackCommerceEvent("product_added_to_cart", {
          productId: line.productId,
          categoryId: line.categoryId,
          variantId,
          productSlug: line.slug,
          productName: line.name,
          metadata: { quantity: line.qty },
        });
        return true;
      } catch (error) {
        if (previous) commitCart(previous);
        fail(error);
        return false;
      } finally {
        markPending(variantId, false);
      }
    },
    [commitCart, fail, locale, markPending, queryClient],
  );

  const remove = useCallback(
    async (variantId: string) => {
      if (pendingVariantIds.current.has(variantId)) return;
      markPending(variantId, true);
      const previous = queryClient.getQueryData<CommerceCartResponse>(["cart"]);
      const removedItem = previous?.items.find((item) => item.variantId === variantId);
      if (previous) {
        commitCart(
          recalculateCart(
            previous,
            previous.items.filter((item) => item.variantId !== variantId),
          ),
        );
      }
      try {
        commitCart(await removeCartItem(variantId));
        trackCommerceEvent("product_removed_from_cart", {
          variantId,
          productId: removedItem?.productId,
          categoryId: removedItem?.categoryId,
          productSlug: removedItem?.slug,
          productName: removedItem?.productNameEn,
        });
        toast(locale === "ar" ? "تمت الإزالة من حقيبتك" : "Removed from your bag", {
          action: removedItem
            ? {
                label: locale === "ar" ? "تراجع" : "Undo",
                onClick: () => {
                  markPending(variantId, true);
                  void addCartItem(variantId, removedItem.quantity)
                    .then(commitCart)
                    .catch(fail)
                    .finally(() => markPending(variantId, false));
                },
              }
            : undefined,
        });
      } catch (error) {
        if (previous) commitCart(previous);
        fail(error);
      } finally {
        markPending(variantId, false);
      }
    },
    [commitCart, fail, locale, markPending, queryClient],
  );

  const setQty = useCallback(
    async (variantId: string, sizeOrQty: string | number, optionalQty?: number) => {
      const quantity = typeof sizeOrQty === "number" ? sizeOrQty : (optionalQty ?? 1);
      if (quantity <= 0) {
        await remove(variantId);
        return;
      }
      if (pendingVariantIds.current.has(variantId)) return;
      markPending(variantId, true);
      const previous = queryClient.getQueryData<CommerceCartResponse>(["cart"]);
      if (previous) {
        const items = previous.items.map((item) =>
          item.variantId === variantId
            ? { ...item, quantity, lineTotal: item.unitPrice * quantity }
            : item,
        );
        commitCart(recalculateCart(previous, items));
      }
      try {
        commitCart(await updateCartItem(variantId, quantity));
      } catch (error) {
        if (previous) commitCart(previous);
        fail(error);
      } finally {
        markPending(variantId, false);
      }
    },
    [commitCart, fail, markPending, queryClient, remove],
  );

  const saveForLater = useCallback(
    async (variantId: string) => {
      if (pendingVariantIds.current.has(variantId)) return;
      markPending(variantId, true);
      try {
        commitCart(await saveCartItemForLater(variantId));
        trackCommerceEvent("save_for_later_clicked", { variantId });
        toast(locale === "ar" ? "تم الحفظ لوقت لاحق" : "Saved for later");
      } catch (error) {
        fail(error);
      } finally {
        markPending(variantId, false);
      }
    },
    [commitCart, fail, locale, markPending],
  );

  const withSavedPending = useCallback(
    async (itemId: string, action: () => Promise<CommerceCartResponse>) => {
      if (pendingSavedItems.includes(itemId)) return;
      setPendingSavedItems((current) => [...current, itemId]);
      try {
        commitCart(await action());
      } catch (error) {
        fail(error);
        throw error;
      } finally {
        setPendingSavedItems((current) => current.filter((id) => id !== itemId));
      }
    },
    [commitCart, fail, pendingSavedItems],
  );

  const moveSavedToCart = useCallback(
    async (itemId: string) => {
      try {
        await withSavedPending(itemId, () => moveSavedItemToCart(itemId));
        trackCommerceEvent("saved_item_moved_to_cart", { metadata: { itemId } });
        toast(locale === "ar" ? "تم النقل إلى حقيبتك" : "Moved to your bag");
      } catch {
        // withSavedPending already restores authoritative state and reports the error.
      }
    },
    [locale, withSavedPending],
  );

  const removeSaved = useCallback(
    async (itemId: string) => {
      try {
        await withSavedPending(itemId, () => removeSavedForLaterItem(itemId));
        trackCommerceEvent("saved_item_removed", { metadata: { itemId } });
        toast(locale === "ar" ? "تمت الإزالة من المحفوظات" : "Removed from saved items");
      } catch {
        // Error feedback is centralized in withSavedPending.
      }
    },
    [locale, withSavedPending],
  );

  const moveAllSaved = useCallback(async () => {
    if (pendingSavedItems.includes("bulk")) return;
    setPendingSavedItems((current) => [...current, "bulk"]);
    try {
      const result = await moveAvailableSavedItemsToCart();
      commitCart(result.cart as CommerceCartResponse);
      trackCommerceEvent("move_all_saved_to_cart", {
        metadata: { movedCount: result.movedCount },
      });
      const blocked = result.results.length - result.movedCount;
      toast(
        locale === "ar"
          ? `تم نقل ${result.movedCount} إلى حقيبتك${blocked ? `، وبقي ${blocked}` : ""}`
          : `${result.movedCount} moved to your bag${blocked ? `; ${blocked} remained saved` : ""}`,
      );
    } catch (error) {
      fail(error);
    } finally {
      setPendingSavedItems((current) => current.filter((id) => id !== "bulk"));
    }
  }, [commitCart, fail, locale, pendingSavedItems]);

  const breakBundle = useCallback(
    async (instanceId: string) => {
      try {
        await withSavedPending(`bundle:${instanceId}`, () => breakCartBundle(instanceId));
        toast(
          locale === "ar"
            ? "تم الاحتفاظ بالمنتجات دون المجموعة"
            : "Products kept without bundle pricing",
        );
      } catch {
        // The authoritative cart and error feedback are handled centrally.
      }
    },
    [locale, withSavedPending],
  );

  const removeBundle = useCallback(
    async (instanceId: string) => {
      try {
        await withSavedPending(`bundle:${instanceId}`, () => removeCartBundle(instanceId));
        toast(locale === "ar" ? "تمت إزالة المجموعة" : "Bundle removed");
      } catch {
        // The authoritative cart and error feedback are handled centrally.
      }
    },
    [locale, withSavedPending],
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

  const applyCoupon = useCallback(
    async (code: string) => {
      try {
        commitCart(await applyCartCoupon(code));
        return { ok: true } as const;
      } catch (error) {
        return { ok: false, error: apiErrorMessage(error, locale) } as const;
      }
    },
    [commitCart, locale],
  );

  const removeCoupon = useCallback(async () => {
    try {
      commitCart(await removeCartCoupon());
      return { ok: true } as const;
    } catch (error) {
      fail(error);
      return { ok: false, error: apiErrorMessage(error, locale) } as const;
    }
  }, [commitCart, fail, locale]);

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
        toast(locale === "ar" ? "سجّلي الدخول لحفظ قائمة المفضلة" : "Sign in to save a wishlist");
        return;
      }
      const desired = !wishlist.includes(slug);
      setWishOverrides((current) => ({ ...current, [slug]: desired }));
      try {
        const next = desired ? await addWishlist(productId) : await removeWishlist(productId);
        commitWishlist(next);
        trackCommerceEvent(desired ? "wishlist_added" : "wishlist_removed", { productId });
        toast(
          locale === "ar"
            ? desired
              ? "تم الحفظ في المفضلة"
              : "تمت الإزالة من المفضلة"
            : desired
              ? "Saved to your wishlist"
              : "Removed from your wishlist",
        );
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
    [commitWishlist, fail, locale, user, wishlist],
  );

  const setSession = useCallback(
    async (session: AuthSession) => {
      rememberSession(session);
      setUser(session.user);
      setAuthHydrated(true);
      try {
        commitCart(await mergeGuestCart());
      } catch {
        void queryClient.invalidateQueries({ queryKey: ["cart"] });
      }
      void queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] !== "cart",
      });
    },
    [commitCart, queryClient],
  );

  const signOut = useCallback(async () => {
    await logoutRequest();
    setUser(null);
    const isPrivateCustomerQuery = (query: { queryKey: readonly unknown[] }) =>
      [
        "wishlist",
        "account",
        "orders",
        "addresses",
        "profile",
        "shipping",
        "payment-instructions",
      ].includes(String(query.queryKey[0]));
    await queryClient.cancelQueries({ predicate: isPrivateCustomerQuery }).catch(() => undefined);
    queryClient.removeQueries({
      predicate: isPrivateCustomerQuery,
    });
    void queryClient.invalidateQueries({ queryKey: ["cart"] });
  }, [queryClient]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    window.localStorage.setItem("bioreza.locale", next);
    document.cookie = `bioreza.locale=${next}; Path=/; Max-Age=31536000; SameSite=Lax`;
    document.documentElement.lang = next;
    document.documentElement.dir = next === "ar" ? "rtl" : "ltr";
    const url = new URL(window.location.href);
    if (next === "ar") url.searchParams.set("lang", "ar");
    else url.searchParams.delete("lang");
    window.location.assign(`${url.pathname}${url.search}${url.hash}`);
  }, []);

  const lines = useMemo<CartLine[]>(
    () =>
      (cart?.items ?? []).map((item) => ({
        variantId: item.variantId,
        productId: item.productId,
        categoryId: item.categoryId,
        slug: item.slug,
        name: locale === "ar" ? item.productNameAr : item.productNameEn,
        image: item.imageUrl ?? "",
        size: item.variantOptions.length
          ? item.variantOptions
              .map((option) => (locale === "ar" ? option.valueAr : option.valueEn))
              .join(" / ")
          : locale === "ar"
            ? item.variantNameAr
            : item.variantNameEn,
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
  const savedForLater = useMemo<SavedForLaterLine[]>(
    () =>
      (cart?.savedForLater ?? []).map((item) => ({
        id: item.id,
        productId: item.productId,
        variantId: item.variantId,
        slug: item.slug,
        name: locale === "ar" ? item.productNameAr : item.productNameEn,
        variant: locale === "ar" ? item.variantNameAr : item.variantNameEn,
        brand: item.brandName,
        image: item.imageUrl ?? "",
        desiredQuantity: item.desiredQuantity,
        priceWhenSaved: item.priceWhenSaved / 100,
        currentPrice: item.currentPrice === null ? null : item.currentPrice / 100,
        priceChange: item.priceChange,
        available: item.available,
        status: item.status,
        savedAt: item.savedAt,
      })),
    [cart?.savedForLater, locale],
  );

  const value = useMemo<StoreValue>(
    () => ({
      lines,
      bundleInstances: cart?.bundleInstances ?? [],
      savedForLater,
      wishlist,
      cartOpen,
      searchOpen,
      searchTriggerRef,
      count: cart?.totalQuantity ?? 0,
      cartFeedbackKey,
      subtotal: (cart?.subtotal ?? 0) / 100,
      discountTotal: (cart?.discountTotal ?? 0) / 100,
      estimatedTotal: (cart?.estimatedTotal ?? cart?.subtotal ?? 0) / 100,
      totalSavings: (cart?.totalSavings ?? 0) / 100,
      couponCode: cart?.couponCode ?? null,
      couponInvalidation: cart?.couponInvalidation ?? null,
      appliedPromotions: cart?.appliedPromotions ?? [],
      promotionMessages: cart?.promotionMessages ?? [],
      giftOptions: cart?.giftOptions ?? [],
      cartLoading: cartQuery.isLoading,
      pendingVariants,
      pendingSavedItems,
      authHydrated,
      user,
      locale,
      add,
      acceptCart: commitCart,
      remove,
      saveForLater,
      moveSavedToCart,
      removeSaved,
      moveAllSaved,
      breakBundle,
      removeBundle,
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
      commitCart,
      add,
      applyCoupon,
      authHydrated,
      cart,
      cartFeedbackKey,
      cartOpen,
      cartQuery.isLoading,
      clear,
      lines,
      savedForLater,
      locale,
      pendingVariants,
      pendingSavedItems,
      remove,
      saveForLater,
      moveSavedToCart,
      removeSaved,
      moveAllSaved,
      breakBundle,
      removeBundle,
      removeCoupon,
      searchOpen,
      searchTriggerRef,
      setSession,
      setLocale,
      setQty,
      signOut,
      toggleWish,
      user,
      wishlist,
    ],
  );

  const productCardValue = useMemo<ProductCardStoreValue>(
    () => ({ locale, wishlist, toggleWish, add }),
    [add, locale, toggleWish, wishlist],
  );

  return (
    <StoreContext.Provider value={value}>
      <ProductCardStoreContext.Provider value={productCardValue}>
        {children}
      </ProductCardStoreContext.Provider>
    </StoreContext.Provider>
  );
}

function recalculateCart(
  cart: CommerceCartResponse,
  items: CommerceCartResponse["items"],
): CommerceCartResponse {
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

export function useProductCardStore() {
  const context = useContext(ProductCardStoreContext);
  if (!context) throw new Error("useProductCardStore must be used within StoreProvider");
  return context;
}
