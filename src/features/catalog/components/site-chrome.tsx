'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import {
  ChevronDown,
  Heart,
  LogIn,
  Mail,
  Package,
  Search,
  ShoppingBag,
  Truck,
  UserPlus,
  UserRound,
} from 'lucide-react';
import Link from 'next/link';
import { type ReactNode, useState } from 'react';

import { cartQueryKey, getCart } from '@/features/cart/api/cart.api';
import { useAuthStore } from '@/stores/auth-store';

const shopMenu = [
  { href: '/products', label: 'All products', text: 'Browse the complete public catalogue.' },
  { href: '/products', label: 'New arrivals', text: 'Fresh skincare, makeup and fragrance.' },
  { href: '/products', label: 'Best sellers', text: 'Customer-loved beauty essentials.' },
];

const categoryMenu = [
  { href: '/categories', label: 'Skincare', text: 'Cleansers, serums, creams and SPF.' },
  { href: '/categories', label: 'Makeup', text: 'Complexion, lips, eyes and tools.' },
  { href: '/categories', label: 'Hair care', text: 'Treatments, oils and daily care.' },
];

export function SiteHeader() {
  const user = useAuthStore((state) => state.user);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -18, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-50 border-b border-black/[.06] bg-white/76 shadow-[0_18px_55px_rgba(31,31,31,.07)] backdrop-blur-2xl"
    >
      <motion.div
        initial={{ y: -18 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.14, duration: 0.45, ease: 'easeOut' }}
        className="flex h-9 items-center justify-center bg-sage text-xs font-semibold uppercase tracking-[.08em] text-white"
      >
        <Truck size={14} className="me-2" />
        Free shipping on orders over $50 +
      </motion.div>

      <div className="mx-auto flex h-24 max-w-7xl items-center gap-8 px-5 sm:px-8">
        <Link href="/" className="me-5 flex min-w-52 items-center gap-3">
          <span className="font-serif text-5xl leading-none text-sage-dark">SB</span>
          <span className="block">
            <span className="block font-serif text-3xl uppercase tracking-[.14em] text-sage-dark">Seniora</span>
            <span className="block text-center text-xs uppercase tracking-[.32em] text-sage">Beauty</span>
          </span>
        </Link>

        <nav className="hidden flex-1 items-center gap-8 text-sm font-medium uppercase text-ink lg:flex">
          <NavDropdown label="Shop" href="/products" items={shopMenu} />
          <NavDropdown label="Categories" href="/categories" items={categoryMenu} />
          <NavLink href="/products">New arrivals</NavLink>
          <NavLink href="#brands">Brands</NavLink>
          <NavLink href="#offers">Offers</NavLink>
          <NavLink href="#about">About us</NavLink>
        </nav>

        <motion.div
          animate={{ width: searchOpen ? 292 : 236 }}
          transition={{ duration: 0.32, ease: 'easeOut' }}
          className="ms-auto hidden h-12 items-center rounded-full border border-black/[.08] bg-white px-4 shadow-[0_10px_28px_rgba(31,31,31,.05)] md:flex"
          onFocus={() => setSearchOpen(true)}
          onBlur={() => setSearchOpen(false)}
          onMouseEnter={() => setSearchOpen(true)}
          onMouseLeave={() => setSearchOpen(false)}
        >
          <input
            aria-label="Search products"
            placeholder="Search for products..."
            className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-muted"
          />
          <Search size={19} className="text-ink" />
        </motion.div>

        <div className="flex items-center gap-4 text-ink">
          <IconLink href="/products" label="Wishlist" className="hidden sm:grid" badge="2">
            <Heart size={22} />
          </IconLink>
          <CartIconLink />
          {user ? (
            <IconLink href="/account" label="Account">
              <UserRound size={23} />
            </IconLink>
          ) : (
            <>
              <IconLink href="/auth/login" label="Login">
                <LogIn size={23} />
              </IconLink>
              <IconLink href="/auth/register" label="Register">
                <UserPlus size={23} />
              </IconLink>
            </>
          )}
        </div>
      </div>
    </motion.header>
  );
}

function CartIconLink() {
  const cartQuery = useQuery({
    queryKey: cartQueryKey,
    queryFn: getCart,
    staleTime: 15_000,
  });
  const totalQuantity = cartQuery.data?.totalQuantity ?? 0;

  return (
    <IconLink href="/cart" label="Cart" badge={totalQuantity > 0 ? String(totalQuantity) : undefined}>
            <ShoppingBag size={22} />
    </IconLink>
  );
}

function NavLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="group relative py-2 transition hover:text-sage-dark">
      {children}
      <span className="absolute inset-x-0 -bottom-1 h-px origin-left scale-x-0 bg-sage transition-transform duration-300 group-hover:scale-x-100" />
    </Link>
  );
}

function NavDropdown({
  label,
  href,
  items,
}: {
  label: string;
  href: string;
  items: { href: string; label: string; text: string }[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative py-2" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <Link
        href={href}
        aria-haspopup="menu"
        aria-expanded={open}
        onFocus={() => setOpen(true)}
        className="group flex items-center gap-1 transition hover:text-sage-dark"
      >
        {label}
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.24 }}>
          <ChevronDown size={14} />
        </motion.span>
        <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-sage transition-transform duration-300 group-hover:scale-x-100" />
      </Link>
      <AnimatePresence>
        {open ? (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
            className="absolute left-0 top-full mt-4 w-72 rounded-md border border-black/[.08] bg-white/94 p-3 normal-case text-ink shadow-[0_24px_70px_rgba(31,31,31,.14)] backdrop-blur-xl"
          >
            {items.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                role="menuitem"
                className="block rounded-md px-4 py-3 transition hover:bg-cream hover:text-sage-dark"
              >
                <span className="block text-sm font-semibold uppercase tracking-[.08em]">{item.label}</span>
                <span className="mt-1 block text-xs leading-5 text-muted">{item.text}</span>
              </Link>
            ))}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function IconLink({
  href,
  label,
  badge,
  className,
  children,
}: {
  href: string;
  label: string;
  badge?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <motion.div whileHover={{ y: -2, scale: 1.04 }} whileTap={{ scale: 0.94 }} tabIndex={-1} className={className}>
      <Link href={href} aria-label={label} title={label} className="relative grid h-9 w-9 place-items-center transition hover:text-sage">
        {children}
        {badge ? (
          <motion.span
            initial={{ scale: 0.8 }}
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 2.5 }}
            className="absolute -right-1 -top-1 grid h-4 w-4 place-items-center rounded-full bg-sage text-[10px] text-white"
          >
            {badge}
          </motion.span>
        ) : null}
      </Link>
    </motion.div>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-sage/15 bg-[#f2ecdf] text-ink">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 md:grid-cols-[1.35fr_1fr_1fr_1fr_1.45fr]">
        <div>
          <Link href="/" className="flex items-center gap-3">
            <span className="font-serif text-5xl leading-none text-sage-dark">SB</span>
            <span>
              <span className="block font-serif text-2xl uppercase tracking-[.14em] text-sage-dark">Seniora</span>
              <span className="block text-center text-xs uppercase tracking-[.28em] text-sage">Beauty</span>
            </span>
          </Link>
          <p className="mt-5 max-w-xs text-sm leading-6 text-muted">
            Your beauty, elevated. Discover premium skincare and beauty from the world&apos;s most loved brands.
          </p>
          <div className="mt-6 flex gap-3">
            {['ig', 'f', 't', 'yt'].map((item) => (
              <span key={item} className="grid h-8 w-8 place-items-center rounded-full border border-sage/20 text-xs font-semibold text-sage-dark">
                {item}
              </span>
            ))}
          </div>
        </div>

        <FooterColumn title="Shop" items={['All Products', 'New Arrivals', 'Best Sellers', 'Offers', 'Gift Cards']} />
        <FooterColumn title="Customer care" items={['FAQs', 'Shipping & Delivery', 'Returns & Refunds', 'Track Order', 'Contact Us']} />
        <FooterColumn title="About us" items={['Our Story', 'Ingredients', 'Sustainability', 'Blog', 'Careers']} />

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[.12em]">Newsletter</h3>
          <p className="mt-5 text-sm leading-6 text-muted">Subscribe to get special offers, beauty tips and more.</p>
          <form className="mt-7 flex overflow-hidden rounded-md border border-sage/15 bg-white">
            <input className="min-w-0 flex-1 px-4 text-sm outline-none" placeholder="Enter your email" />
            <button className="grid w-14 place-items-center bg-sage text-white" type="button" aria-label="Subscribe">
              <Mail size={18} />
            </button>
          </form>
        </div>
      </div>
      <div className="border-t border-sage/15 py-5 text-center text-xs text-muted">
        © 2024 Seniora Beauty. All Rights Reserved.
      </div>
    </footer>
  );
}

function FooterColumn({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="text-sm font-semibold uppercase tracking-[.12em]">{title}</h3>
      <ul className="mt-5 space-y-3 text-sm text-muted">
        {items.map((item) => (
          <li key={item}>
            <Link href="/products" className="transition hover:text-sage-dark">
              {item}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ProductFallbackIcon() {
  return (
    <div className="grid h-full w-full place-items-center bg-cream">
      <Package className="text-sage" size={34} />
    </div>
  );
}
