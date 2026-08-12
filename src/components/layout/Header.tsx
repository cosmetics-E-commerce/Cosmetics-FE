import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type RefObject,
  type ReactNode,
} from "react";
import { Link, useLocation } from "@tanstack/react-router";
import {
  ChevronDown,
  ChevronRight,
  Droplets,
  Grid2X2,
  Heart,
  Menu,
  PackageCheck,
  Search,
  ShoppingBag,
  Sparkles,
  Star,
  Tags,
  User,
  X,
} from "lucide-react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { Logo } from "@/components/brand/Logo";
import promoProductImage from "@/assets/product-serum.jpg";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { useBrands, useCategories } from "@/lib/catalog";
import type { PublicBrandListItemResponse, PublicCategoryResponse } from "@/lib/api";
import { useStore } from "@/lib/store";
import { GlobalBannerSlot } from "@/components/banner/GlobalBannerSlot";
import { useI18n, type MessageKey } from "@/lib/i18n";

const homeNavItem = { id: "home", label: "common.home" as MessageKey, to: "/" as const };

const utilityNav = [
  { id: "new", label: "nav.new" as MessageKey, to: "/shop" as const },
  { id: "offers", label: "nav.offers" as MessageKey, to: "/offers" as const },
  { id: "about", label: "nav.about" as MessageKey, to: "/journal" as const },
  { id: "contact", label: "footer.contact" as MessageKey, to: "/contact" as const },
];

/* Directory copy stays local to the header so the shared message catalogue keeps
   holding navigation labels only. */
const headerCopy = {
  en: {
    brandDirectory: "Brand directory",
    popular: "Popular",
    viewAllBrands: "View all brands",
    categoryDirectory: "Shop by category",
    viewAllProducts: "View all products",
    allCategories: "All Categories",
    faceCare: "Face Care",
    bodyCare: "Body Care",
    skinConcerns: "Skin Concerns",
    featuredBrands: "Featured Brands",
    promoTitle: "Skincare That Cares",
    promoText: "Discover products that love your skin.",
    shopNow: "Shop Now",
    chooseCategory: "Choose a category",
    categoryHighlights: "Featured paths",
    categoryChildren: "Subcategories",
    browseCategory: "All products",
    categoryNew: "New arrivals",
    categoryBest: "Best sellers",
    categoryOffers: "Current offers",
    categoryLow: "Price: low to high",
    categoryHigh: "Price: high to low",
    brandsEmpty: "Available brands will appear here soon.",
    categoriesEmpty: "Available categories will appear here soon.",
    wishlist: "Wishlist",
    language: "Language",
    close: "Close menu",
    products: (count: number) => `${count} ${count === 1 ? "product" : "products"}`,
  },
  ar: {
    brandDirectory: "دليل العلامات",
    popular: "الأكثر رواجاً",
    viewAllBrands: "عرض كل العلامات",
    categoryDirectory: "تسوقي حسب الفئة",
    viewAllProducts: "عرض كل المنتجات",
    allCategories: "كل الفئات",
    faceCare: "العناية بالوجه",
    bodyCare: "العناية بالجسم",
    skinConcerns: "مشاكل البشرة",
    featuredBrands: "علامات مميزة",
    promoTitle: "عناية بالبشرة تهتم بك",
    promoText: "اكتشفي منتجات تمنح بشرتك عناية يومية هادئة.",
    shopNow: "تسوقي الآن",
    chooseCategory: "اختاري الفئة",
    categoryHighlights: "مسارات مميزة",
    categoryChildren: "الفئات الفرعية",
    browseCategory: "كل المنتجات",
    categoryNew: "وصل حديثاً",
    categoryBest: "الأكثر مبيعاً",
    categoryOffers: "العروض الحالية",
    categoryLow: "السعر: من الأقل للأعلى",
    categoryHigh: "السعر: من الأعلى للأقل",
    brandsEmpty: "ستظهر العلامات المتاحة هنا قريباً.",
    categoriesEmpty: "ستظهر الفئات المتاحة هنا قريباً.",
    wishlist: "المفضلة",
    language: "اللغة",
    close: "إغلاق القائمة",
    products: (count: number) => `${count} منتج`,
  },
} as const;

type MegaMenuValue = "brands" | "categories";

export function Header({
  scrollSentinelRef,
}: {
  scrollSentinelRef: RefObject<HTMLSpanElement | null>;
}) {
  const { t } = useI18n();
  const headerRef = useRef<HTMLElement>(null);
  const { count, setCartOpen, setSearchOpen, wishlist, user, locale, setLocale } = useStore();
  const { pathname, search } = useLocation();
  const categories = useCategories();
  const brands = useBrands();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [megaMenu, setMegaMenu] = useState<MegaMenuValue | "">("");
  const scrolledRef = useRef(false);
  const copy = headerCopy[locale];

  const activeCategory = typeof search.category === "string" ? search.category : undefined;
  const activeBrand = typeof search.brand === "string" ? search.brand : undefined;
  const activeNavId =
    pathname === "/"
      ? "home"
      : pathname === "/offers"
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
  const transparentHeader = pathname === "/" && !scrolled;
  const visibleBrands = useMemo(
    () =>
      (brands.data ?? [])
        .filter((brand) => brand.productCount > 0)
        .sort((a, b) => a.name.localeCompare(b.name, locale)),
    [brands.data, locale],
  );

  useEffect(() => {
    let observer: IntersectionObserver | undefined;
    const frame = window.requestAnimationFrame(() => {
      const sentinel = scrollSentinelRef.current;
      if (!sentinel || typeof IntersectionObserver === "undefined") return;
      observer = new IntersectionObserver(([entry]) => {
        const next = !entry?.isIntersecting;
        if (next === scrolledRef.current) return;
        scrolledRef.current = next;
        setScrolled(next);
      });
      observer.observe(sentinel);
    });
    return () => {
      window.cancelAnimationFrame(frame);
      observer?.disconnect();
    };
  }, [scrollSentinelRef]);

  useEffect(() => {
    setMegaMenu("");
    setMenu(false);
  }, [pathname, activeBrand, activeCategory]);

  useEffect(() => {
    const header = headerRef.current;
    if (!header || typeof ResizeObserver === "undefined") return;
    const root = document.documentElement;
    const update = () => {
      const height = Math.ceil(header.getBoundingClientRect().height);
      root.style.setProperty("--store-header-height", `${height}px`);
      // The layout offset stays pinned to the resting height so the compact
      // scrolled header never shifts the page content underneath it.
      if (!scrolledRef.current) root.style.setProperty("--store-header-offset", `${height}px`);
    };
    const observer = new ResizeObserver(update);
    observer.observe(header);
    update();
    return () => {
      observer.disconnect();
      root.style.removeProperty("--store-header-offset");
      root.style.removeProperty("--store-header-height");
    };
  }, []);

  const accountTo = user ? ("/account" as const) : ("/sign-in" as const);
  const closeMegaMenu = useCallback(() => setMegaMenu(""), []);
  const closeMobileMenu = useCallback(() => setMenu(false), []);
  const navInteractionProps = (id: string) => ({ "data-nav-id": id });

  return (
    <header
      ref={headerRef}
      className="store-header fixed inset-x-0 top-0 z-40"
      data-transparent={transparentHeader || undefined}
      data-scrolled={scrolled || undefined}
    >
      <GlobalBannerSlot position="TOP" />

      <div className="store-header__bar">
        <div className="store-header__inner">
          <div className="header-brand-slot flex shrink-0 items-center justify-self-start">
            <button
              type="button"
              onClick={() => setMenu(true)}
              aria-label={t("nav.menu")}
              aria-expanded={menu}
              className="header-action grid h-11 w-11 place-items-center xl:hidden"
            >
              <Menu strokeWidth={1.25} className="size-5" aria-hidden="true" />
            </button>
            <div className="hidden xl:block">
              <Logo />
            </div>
          </div>

          <div className="header-mobile-logo justify-self-center xl:hidden">
            <Logo />
          </div>

          <nav
            aria-label="Primary"
            className="header-primary-nav hidden min-w-0 justify-self-center xl:block"
          >
            <NavigationMenuPrimitive.Root
              value={megaMenu}
              onValueChange={(value) => setMegaMenu(value as MegaMenuValue | "")}
              delayDuration={70}
              skipDelayDuration={120}
              className="header-navigation-menu"
            >
              <NavigationMenuPrimitive.List className="flex items-center justify-center gap-1 2xl:gap-3">
                <NavigationMenuPrimitive.Item className="header-nav-item">
                  <NavigationMenuPrimitive.Link asChild>
                    <Link
                      to={homeNavItem.to}
                      {...navInteractionProps(homeNavItem.id)}
                      data-active={activeNavId === homeNavItem.id}
                      aria-current={activeNavId === homeNavItem.id ? "page" : undefined}
                      className="nav-link inline-flex min-h-11 w-full items-center justify-center px-3 text-center"
                    >
                      <span data-nav-label>{t(homeNavItem.label)}</span>
                    </Link>
                  </NavigationMenuPrimitive.Link>
                </NavigationMenuPrimitive.Item>

                <NavigationMenuPrimitive.Item value="brands" className="header-nav-item">
                  <NavigationMenuPrimitive.Trigger
                    {...navInteractionProps("brands")}
                    data-active={activeNavId === "brands"}
                    className="nav-link inline-flex min-h-11 w-full items-center justify-center gap-1.5 px-3 text-center"
                  >
                    <span data-nav-label>{t("nav.brands")}</span>
                    <ChevronDown className="nav-chevron size-3" aria-hidden="true" />
                  </NavigationMenuPrimitive.Trigger>
                  <NavigationMenuPrimitive.Content className="header-mega-content">
                    <BrandsMegaMenu
                      brands={visibleBrands}
                      loading={brands.isLoading}
                      locale={locale}
                      onNavigate={closeMegaMenu}
                    />
                  </NavigationMenuPrimitive.Content>
                </NavigationMenuPrimitive.Item>

                <NavigationMenuPrimitive.Item value="categories" className="header-nav-item">
                  <NavigationMenuPrimitive.Trigger
                    {...navInteractionProps("categories")}
                    data-active={activeNavId === "categories"}
                    className="nav-link inline-flex min-h-11 w-full items-center justify-center gap-1.5 px-3 text-center"
                  >
                    <span data-nav-label>{t("nav.categories")}</span>
                    <ChevronDown className="nav-chevron size-3" aria-hidden="true" />
                  </NavigationMenuPrimitive.Trigger>
                  <NavigationMenuPrimitive.Content className="header-mega-content">
                    <CategoriesMegaMenu
                      brands={visibleBrands}
                      categories={categories.data ?? []}
                      loading={categories.isLoading}
                      locale={locale}
                      onNavigate={closeMegaMenu}
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
                        className="nav-link inline-flex min-h-11 w-full items-center justify-center px-3 text-center"
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
          </nav>

          <div className="header-actions justify-self-end">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label={t("nav.search")}
              className="header-action grid h-11 w-11 place-items-center"
            >
              <Search strokeWidth={1.25} className="size-[18px]" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => setLocale(locale === "ar" ? "en" : "ar")}
              aria-label={locale === "ar" ? "Switch to English" : "التبديل إلى العربية"}
              lang={locale === "ar" ? "en" : "ar"}
              dir={locale === "ar" ? "ltr" : "rtl"}
              className={`header-action header-locale hidden h-11 min-w-11 place-items-center sm:grid ${
                locale === "ar" ? "" : "font-arabic"
              }`}
            >
              {locale === "ar" ? "EN" : "ع"}
            </button>

            <span className="header-actions__divider" aria-hidden="true" />

            <Link
              to={accountTo}
              search={user ? { section: undefined } : { returnTo: undefined }}
              aria-label={t("nav.account")}
              className="header-action hidden h-11 w-11 place-items-center sm:grid"
            >
              <User strokeWidth={1.25} className="size-[18px]" aria-hidden="true" />
            </Link>
            <Link
              to={accountTo}
              search={user ? { section: "wishlist" } : { returnTo: undefined }}
              aria-label={`${copy.wishlist}, ${wishlist.length}`}
              className="header-action relative hidden h-11 w-11 place-items-center sm:grid"
            >
              <Heart strokeWidth={1.25} className="size-[18px]" aria-hidden="true" />
              {wishlist.length > 0 && <span className="header-dot" aria-hidden="true" />}
            </Link>
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              aria-label={`${t("nav.bag")}, ${count}`}
              className="header-action relative grid h-11 w-11 place-items-center"
            >
              <ShoppingBag strokeWidth={1.25} className="size-[18px]" aria-hidden="true" />
              {count > 0 && (
                <span key={count} className="count-change header-badge" aria-hidden="true">
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
          className="mobile-nav w-full p-0 sm:max-w-sm"
        >
          <SheetTitle className="sr-only">{t("nav.menu")}</SheetTitle>
          <div className="mobile-nav__head">
            <Logo size="sm" tagline={false} />
            <button
              type="button"
              onClick={closeMobileMenu}
              aria-label={copy.close}
              className="header-action grid h-11 w-11 place-items-center"
            >
              <X strokeWidth={1.25} className="size-5" aria-hidden="true" />
            </button>
          </div>

          <div className="mobile-nav__body">
            <nav aria-label="Mobile">
              <ul className="mobile-nav__list">
                <li>
                  <Link
                    to={homeNavItem.to}
                    onClick={closeMobileMenu}
                    aria-current={activeNavId === homeNavItem.id ? "page" : undefined}
                    className="mobile-nav__link"
                  >
                    {t(homeNavItem.label)}
                  </Link>
                </li>

                <li>
                  <MobileCatalogGroup id="brands" label={t("nav.brands")}>
                    {visibleBrands.length ? (
                      <ul className="mobile-nav__sublist">
                        {visibleBrands.map((brand) => (
                          <li key={brand.id}>
                            <Link
                              to="/shop"
                              search={{ brand: brand.slug }}
                              onClick={closeMobileMenu}
                              className="mobile-nav__sublink"
                            >
                              <span>{brand.name}</span>
                              <small>{brand.productCount}</small>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="mobile-nav__empty">{copy.brandsEmpty}</p>
                    )}
                    <Link to="/shop" onClick={closeMobileMenu} className="mobile-nav__subaction">
                      {copy.viewAllBrands}
                    </Link>
                  </MobileCatalogGroup>
                </li>

                <li>
                  <MobileCatalogGroup id="categories" label={t("nav.categories")}>
                    {categories.data?.length ? (
                      <MobileCategoryAccordion
                        categories={categories.data}
                        locale={locale}
                        onNavigate={closeMobileMenu}
                      />
                    ) : (
                      <p className="mobile-nav__empty">{copy.categoriesEmpty}</p>
                    )}
                    <Link to="/shop" onClick={closeMobileMenu} className="mobile-nav__subaction">
                      {copy.viewAllProducts}
                    </Link>
                  </MobileCatalogGroup>
                </li>

                {utilityNav.map((item) => (
                  <li key={item.id}>
                    <Link
                      to={item.to}
                      onClick={closeMobileMenu}
                      aria-current={activeNavId === item.id ? "page" : undefined}
                      className="mobile-nav__link"
                    >
                      {t(item.label)}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mobile-nav__foot">
              <ul className="mobile-nav__utility">
                <li>
                  <Link
                    to={accountTo}
                    search={user ? { section: undefined } : { returnTo: undefined }}
                    onClick={closeMobileMenu}
                    className="mobile-nav__utility-link"
                  >
                    <User strokeWidth={1.25} className="size-4" aria-hidden="true" />
                    {t("nav.account")}
                  </Link>
                </li>
                <li>
                  <Link
                    to={accountTo}
                    search={user ? { section: "wishlist" } : { returnTo: undefined }}
                    onClick={closeMobileMenu}
                    className="mobile-nav__utility-link"
                  >
                    <Heart strokeWidth={1.25} className="size-4" aria-hidden="true" />
                    {copy.wishlist}
                  </Link>
                </li>
                <li>
                  <Link to="/cart" onClick={closeMobileMenu} className="mobile-nav__utility-link">
                    <ShoppingBag strokeWidth={1.25} className="size-4" aria-hidden="true" />
                    {t("nav.bag")}
                  </Link>
                </li>
              </ul>

              <div className="mobile-nav__locale">
                <span className="label-xs text-taupe">{copy.language}</span>
                <button
                  type="button"
                  onClick={() => setLocale(locale === "ar" ? "en" : "ar")}
                  lang={locale === "ar" ? "en" : "ar"}
                  dir={locale === "ar" ? "ltr" : "rtl"}
                  className={`label-xs inline-flex min-h-11 min-w-24 items-center justify-center border border-border px-4 text-center text-gold ${
                    locale === "ar" ? "" : "font-arabic text-sm normal-case tracking-normal"
                  }`}
                >
                  {locale === "ar" ? "English" : "العربية"}
                </button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}

type BrandGroup = [letter: string, brands: PublicBrandListItemResponse[]];

/** Columns are derived from the catalogue size so the panel never opens wider —
 *  or emptier — than the number of brands justifies. */
function directoryColumns(entries: number, groups: number) {
  return Math.min(4, Math.max(2, Math.ceil(entries / 5)), Math.max(1, groups));
}

const BrandsMegaMenu = memo(function BrandsMegaMenu({
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
  const copy = headerCopy[locale];
  const groups = useMemo<BrandGroup[]>(() => {
    const grouped = new Map<string, PublicBrandListItemResponse[]>();
    for (const brand of brands) {
      const first = brand.name.trim().charAt(0).toLocaleUpperCase(locale);
      const key = /[A-Z0-9]/i.test(first) ? first : "#";
      grouped.set(key, [...(grouped.get(key) ?? []), brand]);
    }
    return Array.from(grouped.entries()).sort(([a], [b]) => a.localeCompare(b, locale));
  }, [brands, locale]);

  // Only surface a shortlist when it is genuinely a shortlist of the catalogue.
  const popular = useMemo(
    () =>
      brands.length >= 6
        ? [...brands].sort((a, b) => b.productCount - a.productCount).slice(0, 5)
        : [],
    [brands],
  );

  const columns = directoryColumns(brands.length, groups.length);

  // Fill the shortest column first so the directory stays balanced instead of
  // leaving one column empty when a letter carries most of the catalogue.
  const columnGroups = useMemo(() => {
    const filled: BrandGroup[][] = Array.from({ length: columns }, () => []);
    const weights = new Array<number>(columns).fill(0);
    for (const group of groups) {
      let target = 0;
      for (let index = 1; index < columns; index += 1) {
        if ((weights[index] ?? 0) < (weights[target] ?? 0)) target = index;
      }
      filled[target]?.push(group);
      weights[target] = (weights[target] ?? 0) + group[1].length + 1.5;
    }
    return filled.filter((column) => column.length > 0);
  }, [columns, groups]);

  return (
    <div
      className="header-mega-panel"
      dir={locale === "ar" ? "rtl" : "ltr"}
      style={{ "--mega-columns": columnGroups.length || 1 } as CSSProperties}
    >
      <div className="header-mega-heading">
        <p className="header-mega-eyebrow">{copy.brandDirectory}</p>
        <Link to="/shop" onClick={onNavigate} className="header-mega-all">
          {copy.viewAllBrands}
          <ChevronDown className="size-3 -rotate-90 rtl:rotate-90" aria-hidden="true" />
        </Link>
      </div>

      {loading ? (
        <MegaMenuSkeleton rows={6} />
      ) : groups.length ? (
        <>
          {popular.length > 0 && (
            <section className="header-mega-popular" aria-label={copy.popular}>
              <h3>{copy.popular}</h3>
              <ul>
                {popular.map((brand) => (
                  <li key={brand.id}>
                    <Link to="/shop" search={{ brand: brand.slug }} onClick={onNavigate}>
                      {brand.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <div className="brand-directory">
            {columnGroups.map((column, index) => (
              <div key={column[0]?.[0] ?? index} className="brand-directory__column">
                {column.map(([letter, entries]) => (
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
                            <span>{brand.name}</span>
                            <small>{brand.productCount}</small>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="header-mega-empty">{copy.brandsEmpty}</p>
      )}
    </div>
  );
});

const CategoriesMegaMenu = memo(function CategoriesMegaMenu({
  brands,
  categories,
  loading,
  locale,
  onNavigate,
}: {
  brands: PublicBrandListItemResponse[];
  categories: PublicCategoryResponse[];
  loading: boolean;
  locale: "ar" | "en";
  onNavigate: () => void;
}) {
  const copy = headerCopy[locale];
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const categoryTree = useMemo(() => buildCategoryTree(categories), [categories]);
  const parentCategories = categoryTree.roots;

  useEffect(() => {
    if (!parentCategories.length) {
      setSelectedCategoryId(null);
      return;
    }
    setSelectedCategoryId((current) =>
      current && parentCategories.some((category) => category.id === current)
        ? current
        : (parentCategories[0]?.id ?? null),
    );
  }, [parentCategories]);

  const selectedCategory =
    parentCategories.find((category) => category.id === selectedCategoryId) ?? parentCategories[0];
  const childCategories = selectedCategory
    ? (categoryTree.children.get(selectedCategory.id) ?? [])
    : [];
  const selectedName = selectedCategory
    ? locale === "ar"
      ? selectedCategory.nameAr
      : selectedCategory.nameEn
    : copy.chooseCategory;
  const shopGroups = useMemo(
    () => buildCategoryShopGroups(locale, selectedCategory),
    [locale, selectedCategory],
  );
  const featuredBrands = brands.slice(0, 4);
  const visibleParentCategories = parentCategories.slice(0, 8);

  return (
    <div className="header-mega-panel category-mega" dir={locale === "ar" ? "rtl" : "ltr"}>
      <div className="category-mega__toolbar">
        <span className="category-mega__all-pill">
          <Menu className="size-4" aria-hidden="true" />
          {copy.allCategories}
        </span>
        <Link to="/shop" onClick={onNavigate} className="header-mega-all">
          {copy.viewAllProducts}
          <ChevronDown className="size-3 -rotate-90 rtl:rotate-90" aria-hidden="true" />
        </Link>
      </div>

      {loading ? (
        <MegaMenuSkeleton rows={5} />
      ) : categories.length ? (
        <div className="category-mega__market">
          <nav className="category-mega__rail" aria-label={copy.chooseCategory}>
            {visibleParentCategories.map((category, index) => {
              const label = locale === "ar" ? category.nameAr : category.nameEn;
              const Icon = categoryIcon(category.slug, index);
              return (
                <Link
                  key={category.id}
                  to="/shop"
                  search={{ category: category.slug }}
                  onClick={onNavigate}
                  onPointerEnter={() => setSelectedCategoryId(category.id)}
                  onFocus={() => setSelectedCategoryId(category.id)}
                  className="category-mega__parent"
                  data-active={selectedCategory?.id === category.id || undefined}
                >
                  <span className="category-mega__icon" aria-hidden="true">
                    <Icon className="size-4" strokeWidth={1.45} />
                  </span>
                  <span className="category-mega__parent-copy">
                    <strong>{label}</strong>
                    <small>{copy.products(category.productCount)}</small>
                  </span>
                  <ChevronRight
                    className="category-mega__chevron size-4 rtl:rotate-180"
                    aria-hidden="true"
                  />
                </Link>
              );
            })}
            {parentCategories.length > visibleParentCategories.length && (
              <Link to="/shop" onClick={onNavigate} className="category-mega__rail-all">
                <Grid2X2 className="size-4" aria-hidden="true" />
                {copy.viewAllProducts}
              </Link>
            )}
          </nav>

          <section className="category-mega__columns" aria-live="polite">
            {childCategories.length ? (
              <div className="category-mega__column category-mega__column--wide">
                <h3>{selectedName}</h3>
                <div className="category-mega__column-links">
                  {childCategories.slice(0, 8).map((child) => (
                    <Link
                      key={child.id}
                      to="/shop"
                      search={{ category: child.slug }}
                      onClick={onNavigate}
                    >
                      {locale === "ar" ? child.nameAr : child.nameEn}
                    </Link>
                  ))}
                  {selectedCategory && (
                    <Link
                      to="/shop"
                      search={{ category: selectedCategory.slug }}
                      onClick={onNavigate}
                    >
                      {copy.browseCategory}
                    </Link>
                  )}
                </div>
              </div>
            ) : (
              shopGroups.map((group) => (
                <div className="category-mega__column" key={group.title}>
                  <h3>{group.title}</h3>
                  <div className="category-mega__column-links">
                    {group.links.map((link) => (
                      <Link key={link.label} to="/shop" search={link.search} onClick={onNavigate}>
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))
            )}
          </section>

          <aside className="category-mega__brands" aria-label={copy.featuredBrands}>
            <h3>{copy.featuredBrands}</h3>
            <div className="category-mega__brand-list">
              {featuredBrands.length ? (
                featuredBrands.map((brand) => (
                  <Link
                    key={brand.id}
                    to="/shop"
                    search={{ brand: brand.slug }}
                    onClick={onNavigate}
                    className="category-mega__brand"
                  >
                    {brand.name}
                  </Link>
                ))
              ) : (
                <span>{copy.brandsEmpty}</span>
              )}
            </div>
            <Link to="/shop" onClick={onNavigate} className="category-mega__brands-all">
              {copy.viewAllBrands}
            </Link>
          </aside>

          <aside className="category-mega__promo">
            <div>
              <p>{copy.categoryDirectory}</p>
              <h3>{copy.promoTitle}</h3>
              <span>{copy.promoText}</span>
              <Link to="/shop" onClick={onNavigate}>
                {copy.shopNow}
              </Link>
            </div>
            <img src={promoProductImage} alt="" aria-hidden="true" />
          </aside>
        </div>
      ) : (
        <p className="header-mega-empty">{copy.categoriesEmpty}</p>
      )}
    </div>
  );
});

function buildCategoryTree(categories: PublicCategoryResponse[]) {
  const children = new Map<string, PublicCategoryResponse[]>();
  const knownIds = new Set(categories.map((category) => category.id));
  const sorted = [...categories].sort(
    (left, right) =>
      left.sortOrder - right.sortOrder || left.nameEn.localeCompare(right.nameEn, "en"),
  );
  const roots: PublicCategoryResponse[] = [];

  for (const category of sorted) {
    if (category.parentId && knownIds.has(category.parentId)) {
      children.set(category.parentId, [...(children.get(category.parentId) ?? []), category]);
    } else {
      roots.push(category);
    }
  }

  return { roots, children };
}

function buildCategoryShopGroups(locale: "ar" | "en", category?: PublicCategoryResponse) {
  const baseSearch = category?.slug ? { category: category.slug } : {};
  const english = [
    {
      title: "Face Care",
      links: ["Cleansers", "Moisturizers", "Serums", "Toners", "Face Masks", "Sunscreen"],
    },
    {
      title: "Body Care",
      links: ["Body Lotions", "Body Wash", "Body Scrubs", "Hand Care", "Foot Care", "Body Oils"],
    },
    {
      title: "Skin Concerns",
      links: ["Acne & Blemishes", "Anti-Aging", "Brightening", "Hydrating", "Sensitive Skin"],
    },
  ];
  const arabic = [
    {
      title: "العناية بالوجه",
      links: ["غسول", "مرطب", "سيروم", "تونر", "ماسك", "واقي شمس"],
    },
    {
      title: "العناية بالجسم",
      links: ["لوشن الجسم", "غسول الجسم", "سكراب", "عناية اليد", "عناية القدم", "زيوت الجسم"],
    },
    {
      title: "مشاكل البشرة",
      links: ["حب الشباب", "علامات التقدم", "تفتيح", "ترطيب", "بشرة حساسة"],
    },
  ];

  return (locale === "ar" ? arabic : english).map((group) => ({
    title: group.title,
    links: group.links.map((label) => ({
      label,
      search: { ...baseSearch, search: label },
    })),
  }));
}

function categoryIcon(slug: string, index: number) {
  const normalized = slug.toLowerCase();
  if (normalized.includes("body") || normalized.includes("bath")) return Droplets;
  if (normalized.includes("hair") || normalized.includes("care")) return PackageCheck;
  if (normalized.includes("skin")) return Sparkles;
  if (normalized.includes("make")) return Star;
  if (normalized.includes("fragrance") || normalized.includes("perfume")) return Tags;
  return [Grid2X2, Sparkles, Star, Tags, Droplets, PackageCheck][index % 6] ?? Grid2X2;
}

function MobileCategoryAccordion({
  categories,
  locale,
  onNavigate,
}: {
  categories: PublicCategoryResponse[];
  locale: "ar" | "en";
  onNavigate: () => void;
}) {
  const copy = headerCopy[locale];
  const categoryTree = useMemo(() => buildCategoryTree(categories), [categories]);

  return (
    <Accordion type="single" collapsible className="mobile-category-nav">
      {categoryTree.roots.map((category, index) => {
        const label = locale === "ar" ? category.nameAr : category.nameEn;
        const children = categoryTree.children.get(category.id) ?? [];
        const Icon = categoryIcon(category.slug, index);

        return (
          <AccordionItem
            key={category.id}
            value={category.id}
            className="mobile-category-nav__item"
          >
            <AccordionTrigger className="mobile-category-nav__trigger">
              <span className="mobile-category-nav__icon" aria-hidden="true">
                <Icon className="size-4" strokeWidth={1.45} />
              </span>
              <span>
                <strong>{label}</strong>
                <small>{copy.products(category.productCount)}</small>
              </span>
            </AccordionTrigger>
            <AccordionContent className="mobile-category-nav__content">
              <Link
                to="/shop"
                search={{ category: category.slug }}
                onClick={onNavigate}
                className="mobile-nav__sublink mobile-category-nav__all"
              >
                <span>{copy.browseCategory}</span>
                <ChevronRight className="size-4 rtl:rotate-180" aria-hidden="true" />
              </Link>
              {children.length ? (
                <ul className="mobile-nav__sublist mobile-category-nav__children">
                  {children.map((child) => (
                    <li key={child.id}>
                      <Link
                        to="/shop"
                        search={{ category: child.slug }}
                        onClick={onNavigate}
                        className="mobile-nav__sublink"
                      >
                        <span>{locale === "ar" ? child.nameAr : child.nameEn}</span>
                        <small>{child.productCount}</small>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="mobile-category-nav__quick">
                  <Link
                    to="/shop"
                    search={{ category: category.slug, sort: "newest" }}
                    onClick={onNavigate}
                    className="mobile-nav__sublink"
                  >
                    <span>{copy.categoryNew}</span>
                  </Link>
                  <Link to="/offers" onClick={onNavigate} className="mobile-nav__sublink">
                    <span>{copy.categoryOffers}</span>
                  </Link>
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}

function MegaMenuSkeleton({ rows }: { rows: number }) {
  return (
    <div className="mega-menu-skeleton" aria-hidden="true">
      {Array.from({ length: rows }, (_, index) => (
        <span key={index} />
      ))}
    </div>
  );
}

function MobileCatalogGroup({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <Accordion type="single" collapsible className="mobile-nav__group">
      <AccordionItem value={id} className="border-0">
        <AccordionTrigger className="mobile-nav__link">{label}</AccordionTrigger>
        <AccordionContent className="pb-5 pt-0">{children}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
