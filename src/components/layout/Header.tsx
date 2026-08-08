import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { Search, User, Heart, ShoppingBag, Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { useStore } from "@/lib/store";
import { GlobalBannerSlot } from "@/components/banner/GlobalBannerSlot";

const nav = [
  { label: "Skincare", category: "Skincare" },
  { label: "Makeup", category: "Makeup" },
  { label: "Haircare", category: "Haircare" },
  { label: "Fragrance", category: "Fragrance" },
  { label: "Collections", category: undefined },
  { label: "New Arrivals", category: undefined },
  { label: "Offers", category: undefined, offers: true },
];

export function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const { count, setCartOpen, setSearchOpen, wishlist, user, locale, setLocale } = useStore();
  const { pathname, search } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menu, setMenu] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 24);
        setHidden(y > 160 && y > lastY.current + 6);
        lastY.current = y;
        frame = 0;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

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

  const isShopActive = (category?: string) =>
    pathname === "/shop" && !!category && search.category === category;

  return (
    <header
      ref={headerRef}
      className={`fixed inset-x-0 top-0 z-40 transition-transform duration-500 motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)] ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <GlobalBannerSlot position="TOP" />

      <div
        className={`border-b transition-colors duration-700 ${
          scrolled
            ? "border-border bg-ivory shadow-soft"
            : "border-transparent bg-warm-white/70 backdrop-blur-sm"
        }`}
      >
        <div className="mx-auto grid max-w-[1560px] grid-cols-[1fr_auto_1fr] items-center gap-1 px-3 py-4 sm:gap-4 sm:px-5 md:px-10 xl:flex xl:gap-6">
          <div className="flex shrink-0 items-center justify-self-start">
            <button
              type="button"
              onClick={() => setMenu(true)}
              aria-label="Open menu"
              className="grid h-11 w-11 place-items-center text-foreground transition-colors duration-500 hover:text-gold xl:hidden"
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

          <nav aria-label="Primary" className="hidden min-w-0 flex-1 xl:block">
            <ul className="grid grid-cols-8 items-center">
              {nav.map((n) => (
                <li key={n.label}>
                  <a
                    href={
                      n.offers
                        ? "/offers"
                        : n.category
                          ? `/shop?category=${encodeURIComponent(n.category)}`
                          : "/shop"
                    }
                    data-active={isShopActive(n.category)}
                    className="nav-link label-xs inline-flex min-h-11 w-full items-center justify-center px-1 text-center text-foreground"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
              <li>
                <Link
                  to="/journal"
                  data-active={pathname === "/journal"}
                  className="nav-link label-xs inline-flex min-h-11 w-full items-center justify-center px-1 text-center text-foreground"
                >
                  About
                </Link>
              </li>
            </ul>
          </nav>

          <div className="flex shrink-0 items-center justify-self-end gap-0.5">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="grid h-11 w-11 place-items-center text-foreground transition-colors duration-500 hover:text-gold"
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
              className="label-xs hidden min-h-11 px-2 text-taupe transition-colors hover:text-gold xl:block"
            >
              {locale === "ar" ? "EN" : "ع"}
            </button>
            <Link
              to={user ? "/account" : "/sign-in"}
              aria-label="Account"
              className="hidden h-11 w-11 place-items-center text-foreground transition-colors duration-500 hover:text-gold sm:grid"
            >
              <User strokeWidth={1} className="size-[18px]" aria-hidden="true" />
            </Link>
            <Link
              to={user ? "/account" : "/sign-in"}
              hash="wishlist"
              aria-label={`Wishlist, ${wishlist.length} items`}
              className="relative hidden h-11 w-11 place-items-center text-foreground transition-colors duration-500 hover:text-gold sm:grid"
            >
              <Heart strokeWidth={1} className="size-[18px]" aria-hidden="true" />
              {wishlist.length > 0 && (
                <span className="absolute right-1.5 top-2 size-1.5 rounded-full bg-gold" />
              )}
            </Link>
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              aria-label={`Shopping bag, ${count} items`}
              className="relative grid h-11 w-11 place-items-center text-foreground transition-colors duration-500 hover:text-gold"
            >
              <ShoppingBag strokeWidth={1} className="size-[18px]" aria-hidden="true" />
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
          side="left"
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
              {nav.map((n, i) => (
                <li
                  key={n.label}
                  className="rise-in"
                  style={{ animationDelay: `${80 + i * 60}ms` }}
                >
                  <a
                    href={
                      n.offers
                        ? "/offers"
                        : n.category
                          ? `/shop?category=${encodeURIComponent(n.category)}`
                          : "/shop"
                    }
                    onClick={() => setMenu(false)}
                    className="block font-serif text-3xl leading-tight transition-colors duration-300 hover:text-gold"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="rule-gold my-8" />
            <ul className="space-y-4">
              {[
                { to: "/journal", label: "Journal" },
                { to: "/offers", label: "Offers" },
                { to: "/account", label: "Account" },
                { to: "/cart", label: "Shopping Bag" },
              ].map((l, i) => (
                <li key={l.to} className="rise-in" style={{ animationDelay: `${420 + i * 60}ms` }}>
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
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
}
