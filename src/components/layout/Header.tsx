import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { ChevronDown, Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { Logo } from "@/components/brand/Logo";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { useBrands, useCategories } from "@/lib/catalog";
import type { PublicBrandListItemResponse, PublicCategoryResponse } from "@/lib/api";
import { useStore } from "@/lib/store";
import { GlobalBannerSlot } from "@/components/banner/GlobalBannerSlot";
import { useI18n, type MessageKey } from "@/lib/i18n";

const utilityNav = [
  { id: "new", label: "nav.new" as MessageKey, to: "/shop" as const },
  { id: "offers", label: "nav.offers" as MessageKey, to: "/offers" as const },
  { id: "about", label: "nav.about" as MessageKey, to: "/journal" as const },
  { id: "contact", label: "footer.contact" as MessageKey, to: "/contact" as const },
];

type MegaMenuValue = "brands" | "categories";

export function Header() {
  const { t } = useI18n();
  const headerRef = useRef<HTMLElement>(null);
  const { count, cartFeedbackKey, setCartOpen, setSearchOpen, wishlist, user, locale, setLocale } =
    useStore();
  const { pathname, search } = useLocation();
  const categories = useCategories();
  const brands = useBrands();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [megaMenu, setMegaMenu] = useState<MegaMenuValue | "">("");
  const [navIndicator, setNavIndicator] = useState({ x: 0, width: 0, visible: false });
  const scrolledRef = useRef(false);
  const primaryNavRef = useRef<HTMLElement>(null);
  const hoveredNavIdRef = useRef<string | null>(null);

  const activeCategory = typeof search.category === "string" ? search.category : undefined;
  const activeBrand = typeof search.brand === "string" ? search.brand : undefined;
  const activeNavId =
    pathname === "/offers"
      ? "offers"
      : pathname === "/journal"
        ? "about"
        : pathname === "/contact"
          ? "contact"
          : pathname === "/shop"
            ? activeBrand
              ? "brands"
              : "categories"
            : null;
  const visibleBrands = useMemo(
    () =>
      (brands.data ?? [])
        .filter((brand) => brand.productCount > 0)
        .sort((a, b) => a.name.localeCompare(b.name, locale)),
    [brands.data, locale],
  );

  const moveNavIndicator = useCallback((id: string | null) => {
    const primaryNav = primaryNavRef.current;
    const label = id
      ? primaryNav?.querySelector<HTMLElement>(`[data-nav-id="${id}"] [data-nav-label]`)
      : null;
    if (!primaryNav || !label || primaryNav.getBoundingClientRect().width === 0) {
      setNavIndicator((current) => ({ ...current, visible: false }));
      return;
    }
    const navBounds = primaryNav.getBoundingClientRect();
    const labelBounds = label.getBoundingClientRect();
    setNavIndicator({
      x: labelBounds.left - navBounds.left,
      width: labelBounds.width,
      visible: true,
    });
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const next = window.scrollY > 24;
      if (next === scrolledRef.current) return;
      scrolledRef.current = next;
      setScrolled(next);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMegaMenu("");
  }, [pathname, activeBrand, activeCategory]);

  useLayoutEffect(() => {
    const primaryNav = primaryNavRef.current;
    const sync = () => moveNavIndicator(activeNavId);
    const frame = window.requestAnimationFrame(sync);
    const observer =
      primaryNav && typeof ResizeObserver !== "undefined" ? new ResizeObserver(sync) : null;
    if (primaryNav) observer?.observe(primaryNav);
    void document.fonts?.ready.then(sync);
    return () => {
      window.cancelAnimationFrame(frame);
      observer?.disconnect();
    };
  }, [activeNavId, moveNavIndicator]);

  useEffect(() => {
    const header = headerRef.current;
    if (!header || typeof ResizeObserver === "undefined") return;
    const update = () =>
      document.documentElement.style.setProperty(
        "--store-header-offset",
        `${Math.ceil(header.getBoundingClientRect().height)}px`,
      );
    const observer = new ResizeObserver(update);
    observer.observe(header);
    update();
    return () => {
      observer.disconnect();
      document.documentElement.style.removeProperty("--store-header-offset");
    };
  }, []);

  const navInteractionProps = (id: string) => ({
    "data-nav-id": id,
    onPointerEnter: () => {
      hoveredNavIdRef.current = id;
      moveNavIndicator(id);
    },
    onFocus: () => moveNavIndicator(id),
  });

  return (
    <header ref={headerRef} className="store-header fixed inset-x-0 top-0 z-40">
      <GlobalBannerSlot position="TOP" />

      <div
        className={`border-b transition-[background-color,border-color,box-shadow] duration-200 ${
          scrolled ? "border-border bg-ivory shadow-soft" : "border-transparent bg-warm-white/95"
        }`}
      >
        <div className="mx-auto grid max-w-[1560px] grid-cols-[1fr_auto_1fr] items-center gap-1 px-3 py-4 sm:gap-4 sm:px-5 md:px-10 xl:flex xl:gap-6">
          <div className="flex shrink-0 items-center justify-self-start">
            <button
              type="button"
              onClick={() => setMenu(true)}
              aria-label={t("nav.menu")}
              className="header-action grid h-11 w-11 place-items-center text-foreground xl:hidden"
            >
              <Menu strokeWidth={1} className="size-5" aria-hidden="true" />
            </button>
            <div className="hidden xl:block">
              <Logo />
            </div>
          </div>

          <div className="justify-self-center xl:hidden">
            <Logo />
          </div>

          <nav
            ref={primaryNavRef}
            aria-label="Primary"
            className="header-primary-nav hidden min-w-0 flex-1 xl:block"
            onPointerLeave={() => {
              hoveredNavIdRef.current = null;
              const focusedId = primaryNavRef.current
                ?.querySelector<HTMLElement>(".nav-link:focus-visible")
                ?.getAttribute("data-nav-id");
              moveNavIndicator(focusedId || megaMenu || activeNavId);
            }}
            onBlurCapture={(event) => {
              if (event.currentTarget.contains(event.relatedTarget as Node | null)) return;
              window.requestAnimationFrame(() =>
                moveNavIndicator(hoveredNavIdRef.current || activeNavId),
              );
            }}
          >
            <NavigationMenuPrimitive.Root
              value={megaMenu}
              onValueChange={(value) => {
                const next = value as MegaMenuValue | "";
                setMegaMenu(next);
                moveNavIndicator(next || activeNavId);
              }}
              delayDuration={70}
              skipDelayDuration={120}
              className="header-navigation-menu"
            >
              <NavigationMenuPrimitive.List className="grid grid-cols-6 items-center">
                <NavigationMenuPrimitive.Item value="brands" className="header-nav-item">
                  <NavigationMenuPrimitive.Trigger
                    {...navInteractionProps("brands")}
                    data-active={activeNavId === "brands"}
                    className="nav-link label-xs inline-flex min-h-11 w-full items-center justify-center gap-1.5 px-1 text-center text-foreground"
                  >
                    <span data-nav-label>{t("nav.brands")}</span>
                    <ChevronDown className="nav-chevron size-3" aria-hidden="true" />
                  </NavigationMenuPrimitive.Trigger>
                  <NavigationMenuPrimitive.Content className="header-mega-content">
                    <BrandsMegaMenu
                      brands={visibleBrands}
                      loading={brands.isLoading}
                      locale={locale}
                      onNavigate={() => setMegaMenu("")}
                    />
                  </NavigationMenuPrimitive.Content>
                </NavigationMenuPrimitive.Item>

                <NavigationMenuPrimitive.Item value="categories" className="header-nav-item">
                  <NavigationMenuPrimitive.Trigger
                    {...navInteractionProps("categories")}
                    data-active={activeNavId === "categories"}
                    className="nav-link label-xs inline-flex min-h-11 w-full items-center justify-center gap-1.5 px-1 text-center text-foreground"
                  >
                    <span data-nav-label>{t("nav.categories")}</span>
                    <ChevronDown className="nav-chevron size-3" aria-hidden="true" />
                  </NavigationMenuPrimitive.Trigger>
                  <NavigationMenuPrimitive.Content className="header-mega-content">
                    <CategoriesMegaMenu
                      categories={categories.data ?? []}
                      loading={categories.isLoading}
                      locale={locale}
                      onNavigate={() => setMegaMenu("")}
                    />
                  </NavigationMenuPrimitive.Content>
                </NavigationMenuPrimitive.Item>

                {utilityNav.map((item) => (
                  <NavigationMenuPrimitive.Item key={item.id} className="header-nav-item">
                    <NavigationMenuPrimitive.Link asChild>
                      <Link
                        to={item.to}
                        {...navInteractionProps(item.id)}
                        data-active={activeNavId === item.id}
                        aria-current={activeNavId === item.id ? "page" : undefined}
                        className="nav-link label-xs inline-flex min-h-11 w-full items-center justify-center px-1 text-center text-foreground"
                      >
                        <span data-nav-label>{t(item.label)}</span>
                      </Link>
                    </NavigationMenuPrimitive.Link>
                  </NavigationMenuPrimitive.Item>
                ))}
              </NavigationMenuPrimitive.List>

              <div className="header-mega-position">
                <NavigationMenuPrimitive.Viewport className="header-mega-viewport" />
              </div>
            </NavigationMenuPrimitive.Root>
            <span
              className="header-nav-indicator"
              data-visible={navIndicator.visible || undefined}
              aria-hidden="true"
              style={
                {
                  "--nav-indicator-x": `${navIndicator.x}px`,
                  "--nav-indicator-width": `${navIndicator.width}px`,
                } as CSSProperties
              }
            />
          </nav>

          <div className="flex shrink-0 items-center justify-self-end gap-0.5">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label={t("nav.search")}
              className="header-action grid h-11 w-11 place-items-center text-foreground"
            >
              <Search strokeWidth={1} className="size-[18px]" aria-hidden="true" />
            </button>
            <span className="label-xs hidden items-center gap-1 border border-border px-2 py-1.5 text-[0.55rem] text-taupe 2xl:inline-flex">
              <kbd>⌘</kbd>
              <kbd>K</kbd>
            </span>
            <button
              type="button"
              onClick={() => setLocale(locale === "ar" ? "en" : "ar")}
              aria-label={locale === "ar" ? "Switch to English" : "التبديل إلى العربية"}
              lang={locale === "ar" ? "en" : "ar"}
              dir={locale === "ar" ? "ltr" : "rtl"}
              className={`label-xs hidden min-h-11 min-w-11 items-center justify-center px-2 text-taupe transition-colors hover:text-gold xl:flex ${
                locale === "ar" ? "" : "font-arabic text-sm normal-case tracking-normal"
              }`}
            >
              {locale === "ar" ? "EN" : "ع"}
            </button>
            <Link
              to={user ? "/account" : "/sign-in"}
              search={user ? { section: undefined } : { returnTo: undefined }}
              aria-label="Account"
              className="header-action hidden h-11 w-11 place-items-center text-foreground sm:grid"
            >
              <User strokeWidth={1} className="size-[18px]" aria-hidden="true" />
            </Link>
            <Link
              to={user ? "/account" : "/sign-in"}
              search={user ? { section: "wishlist" } : { returnTo: undefined }}
              aria-label={`Wishlist, ${wishlist.length} items`}
              className="header-action relative hidden h-11 w-11 place-items-center text-foreground sm:grid"
            >
              <Heart strokeWidth={1} className="size-[18px]" aria-hidden="true" />
              {wishlist.length > 0 && (
                <span className="absolute right-1.5 top-2 size-1.5 rounded-full bg-gold" />
              )}
            </Link>
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              aria-label={`${t("nav.bag")}, ${count}`}
              className="header-action relative grid h-11 w-11 place-items-center text-foreground"
            >
              <span key={cartFeedbackKey} className={cartFeedbackKey ? "bag-feedback" : undefined}>
                <ShoppingBag strokeWidth={1} className="size-[18px]" aria-hidden="true" />
              </span>
              {count > 0 && (
                <span
                  key={count}
                  className="count-change label-xs absolute -right-0.5 top-1.5 grid size-4 place-items-center rounded-full bg-gold text-[0.55rem] text-warm-white"
                >
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      <GlobalBannerSlot position="BELOW_HEADER" />

      <Sheet open={menu} onOpenChange={setMenu}>
        <SheetContent
          side={locale === "ar" ? "right" : "left"}
          showCloseButton={false}
          className="w-full border-r border-border bg-warm-white p-0 sm:max-w-sm"
        >
          <SheetTitle className="sr-only">Menu</SheetTitle>
          <div className="flex items-center justify-between border-b border-border px-6 py-5">
            <Logo size="sm" tagline={false} />
            <button
              type="button"
              onClick={() => setMenu(false)}
              aria-label="Close menu"
              className="grid h-11 w-11 place-items-center text-taupe"
            >
              <X strokeWidth={1} className="size-5" aria-hidden="true" />
            </button>
          </div>
          <nav aria-label="Mobile" className="px-6 py-8">
            <ul className="space-y-5">
              <li className="rise-in" style={{ animationDelay: "40ms" }}>
                <Link
                  to="/shop"
                  onClick={() => setMenu(false)}
                  className="block font-serif text-3xl leading-tight transition-colors duration-200 hover:text-gold"
                >
                  {t("nav.shop")}
                </Link>
              </li>
              {utilityNav.slice(0, 2).map((item, index) => (
                <li
                  key={item.id}
                  className="rise-in"
                  style={{ animationDelay: `${70 + index * 30}ms` }}
                >
                  <Link
                    to={item.to}
                    onClick={() => setMenu(false)}
                    className="block font-serif text-3xl leading-tight transition-colors duration-200 hover:text-gold"
                  >
                    {t(item.label)}
                  </Link>
                </li>
              ))}
            </ul>

            <MobileCatalogGroup label={t("nav.categories")}>
              {(categories.data ?? []).map((category) => (
                <Link
                  key={category.id}
                  to="/shop"
                  search={{ category: category.slug }}
                  onClick={() => setMenu(false)}
                  className="inline-flex min-h-11 items-center text-sm transition-colors hover:text-gold"
                >
                  {locale === "ar" ? category.nameAr : category.nameEn}
                </Link>
              ))}
            </MobileCatalogGroup>

            <MobileCatalogGroup label={t("nav.brands")}>
              {visibleBrands.map((brand) => (
                <Link
                  key={brand.id}
                  to="/shop"
                  search={{ brand: brand.slug }}
                  onClick={() => setMenu(false)}
                  className="inline-flex min-h-11 items-center text-sm transition-colors hover:text-gold"
                >
                  {brand.name}
                </Link>
              ))}
            </MobileCatalogGroup>

            <div className="rule-gold my-7" />
            <ul className="space-y-4">
              {[
                { to: "/journal", label: t("nav.about") },
                { to: "/contact", label: t("footer.contact") },
                { to: "/account", label: t("nav.account") },
                { to: "/cart", label: t("nav.bag") },
              ].map((l, i) => (
                <li key={l.to} className="rise-in" style={{ animationDelay: `${200 + i * 25}ms` }}>
                  <Link
                    to={l.to}
                    onClick={() => setMenu(false)}
                    className="label-sm text-taupe hover:text-gold"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
              <span className="label-xs text-taupe">Language</span>
              <button
                type="button"
                onClick={() => setLocale(locale === "ar" ? "en" : "ar")}
                lang={locale === "ar" ? "en" : "ar"}
                dir={locale === "ar" ? "ltr" : "rtl"}
                className={`label-xs inline-flex min-h-11 min-w-20 items-center justify-center border border-border px-4 py-2 text-center text-gold ${
                  locale === "ar" ? "" : "font-arabic text-sm normal-case tracking-normal"
                }`}
              >
                {locale === "ar" ? "English" : "العربية"}
              </button>
            </div>
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
}

function BrandsMegaMenu({
  brands,
  loading,
  locale,
  onNavigate,
}: {
  brands: PublicBrandListItemResponse[];
  loading: boolean;
  locale: "ar" | "en";
  onNavigate: () => void;
}) {
  const groups = useMemo(() => {
    const grouped = new Map<string, PublicBrandListItemResponse[]>();
    for (const brand of brands) {
      const first = brand.name.trim().charAt(0).toLocaleUpperCase(locale);
      const key = /[A-Z0-9]/i.test(first) ? first : "#";
      grouped.set(key, [...(grouped.get(key) ?? []), brand]);
    }
    return Array.from(grouped.entries()).sort(([a], [b]) => a.localeCompare(b, locale));
  }, [brands, locale]);

  return (
    <div
      className="header-mega-panel header-mega-panel--brands"
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      <div className="header-mega-heading">
        <div>
          <p className="label-xs text-gold">
            {locale === "ar" ? "دليل العلامات" : "Brand directory"}
          </p>
          <p className="mt-2 text-sm text-taupe">
            {locale === "ar"
              ? "اكتشفي مجموعتنا حسب العلامة التجارية"
              : "Explore the collection by beauty house."}
          </p>
        </div>
        <Link to="/shop" onClick={onNavigate} className="header-mega-all label-xs">
          {locale === "ar" ? "عرض كل المنتجات" : "View all products"}
        </Link>
      </div>

      {loading ? (
        <MegaMenuSkeleton columns={4} />
      ) : groups.length ? (
        <div className="brand-directory">
          {groups.map(([letter, entries]) => (
            <section
              key={letter}
              className="brand-directory__group"
              aria-labelledby={`brand-${letter}`}
            >
              <h3 id={`brand-${letter}`} className="brand-directory__letter">
                {letter}
              </h3>
              <ul>
                {entries.map((brand) => (
                  <li key={brand.id}>
                    <Link
                      to="/shop"
                      search={{ brand: brand.slug }}
                      onClick={onNavigate}
                      className="brand-directory__link"
                    >
                      {brand.logoUrl ? (
                        <img
                          src={brand.logoUrl}
                          alt=""
                          loading="lazy"
                          className="brand-directory__logo"
                        />
                      ) : (
                        <span className="brand-directory__monogram" aria-hidden="true">
                          {brand.name.charAt(0)}
                        </span>
                      )}
                      <span>{brand.name}</span>
                      <small>{brand.productCount}</small>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      ) : (
        <p className="header-mega-empty">
          {locale === "ar"
            ? "ستظهر العلامات المتاحة هنا قريباً."
            : "Available brands will appear here soon."}
        </p>
      )}
    </div>
  );
}

function CategoriesMegaMenu({
  categories,
  loading,
  locale,
  onNavigate,
}: {
  categories: PublicCategoryResponse[];
  loading: boolean;
  locale: "ar" | "en";
  onNavigate: () => void;
}) {
  return (
    <div
      className="header-mega-panel header-mega-panel--categories"
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      <div className="header-mega-heading">
        <div>
          <p className="label-xs text-gold">
            {locale === "ar" ? "تسوقي حسب الفئة" : "Shop by category"}
          </p>
          <p className="mt-2 text-sm text-taupe">
            {locale === "ar"
              ? "اعثري على ما يناسب روتينك بسرعة"
              : "Find the right edit for your ritual."}
          </p>
        </div>
        <Link to="/shop" onClick={onNavigate} className="header-mega-all label-xs">
          {locale === "ar" ? "المجموعة الكاملة" : "The full collection"}
        </Link>
      </div>

      {loading ? (
        <MegaMenuSkeleton columns={5} />
      ) : categories.length ? (
        <ul className="category-directory">
          {categories.map((category) => (
            <li key={category.id}>
              <Link
                to="/shop"
                search={{ category: category.slug }}
                onClick={onNavigate}
                className="category-directory__link"
              >
                <span>{locale === "ar" ? category.nameAr : category.nameEn}</span>
                <small>
                  {category.productCount}{" "}
                  {locale === "ar" ? "منتج" : category.productCount === 1 ? "product" : "products"}
                </small>
                <ChevronDown className="size-3 -rotate-90 rtl:rotate-90" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="header-mega-empty">
          {locale === "ar"
            ? "ستظهر الفئات المتاحة هنا قريباً."
            : "Available categories will appear here soon."}
        </p>
      )}
    </div>
  );
}

function MegaMenuSkeleton({ columns }: { columns: number }) {
  return (
    <div
      className="mega-menu-skeleton"
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
      aria-hidden="true"
    >
      {Array.from({ length: columns }, (_, index) => (
        <span key={index} />
      ))}
    </div>
  );
}

function MobileCatalogGroup({ label, children }: { label: string; children: ReactNode }) {
  return (
    <details className="mobile-catalog-group border-b border-border py-2">
      <summary className="label-sm flex min-h-12 cursor-pointer list-none items-center justify-between">
        {label}
        <ChevronDown className="size-4 transition-transform duration-200" aria-hidden="true" />
      </summary>
      <div className="grid max-h-64 grid-cols-2 gap-x-4 overflow-y-auto pb-4 pt-2">{children}</div>
    </details>
  );
}
