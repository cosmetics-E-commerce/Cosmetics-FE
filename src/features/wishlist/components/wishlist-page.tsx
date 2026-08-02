'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Heart, Loader2, ShoppingBag, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { LuxuryCard } from '@/components/ui/luxury-card';
import { AddToCartButton } from '@/features/cart/components/add-to-cart-button';
import { ProductFallbackIcon, SiteFooter, SiteHeader } from '@/features/catalog/components/site-chrome';
import {
  clearWishlist,
  getWishlist,
  removeWishlistItem,
  wishlistQueryKey,
} from '@/features/wishlist/api/wishlist.api';
import type { ApiErrorBody } from '@/lib/http/client';
import { useAuthStore } from '@/stores/auth-store';

export function WishlistPage() {
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user);
  const hydrated = useAuthStore((state) => state.hydrated);

  const wishlistQuery = useQuery({
    queryKey: wishlistQueryKey,
    queryFn: getWishlist,
    enabled: Boolean(user),
  });

  const clearMutation = useMutation({
    mutationFn: clearWishlist,
    onSuccess: async () => queryClient.invalidateQueries({ queryKey: wishlistQueryKey }),
  });

  const items = wishlistQuery.data?.items ?? [];
  const error = wishlistQuery.error as ApiErrorBody | null;

  return (
    <main className="min-h-screen bg-background text-ink">
      <SiteHeader />
      <section className="border-b border-black/[.08] bg-[#F5E8D9]">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-12 sm:px-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.24em] text-sage-dark">Saved beauty</p>
            <h1 className="mt-4 font-serif text-6xl leading-none">Wishlist</h1>
            <p className="mt-5 max-w-2xl leading-7 text-muted">
              Keep products you love in one place, then add them to cart when you are ready.
            </p>
          </div>
          <Button asChild variant="secondary">
            <Link href="/products">Continue shopping</Link>
          </Button>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
        <LuxuryCard className="min-h-[28rem] border-black/[.08] bg-[#fffdf8] p-5 sm:p-7">
          {!hydrated ? (
            <div className="grid min-h-[20rem] place-items-center">
              <Loader2 className="animate-spin text-sage" size={30} />
            </div>
          ) : null}

          {hydrated && !user ? (
            <WishlistState
              title="Sign in to save products"
              text="Wishlist is linked to your account so your saved products stay available across devices."
              actionHref="/auth/login"
              actionLabel="Login"
            />
          ) : null}

          {hydrated && user && wishlistQuery.isLoading ? (
            <div className="grid min-h-[20rem] place-items-center">
              <Loader2 className="animate-spin text-sage" size={30} />
            </div>
          ) : null}

          {hydrated && user && !wishlistQuery.isLoading && error ? (
            <WishlistState
              title="Wishlist is unavailable"
              text={error.message || 'The backend could not load your wishlist right now.'}
              actionHref="/products"
              actionLabel="Browse products"
            />
          ) : null}

          {hydrated && user && !wishlistQuery.isLoading && !error && items.length === 0 ? (
            <WishlistState
              title="Your wishlist is empty"
              text="Tap the heart on any product to save it here."
              actionHref="/products"
              actionLabel="Browse products"
            />
          ) : null}

          {hydrated && user && !wishlistQuery.isLoading && !error && items.length > 0 ? (
            <div className="space-y-5">
              <div className="flex flex-col gap-3 border-b border-sage/15 pb-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm font-semibold text-sage-dark">{items.length} saved product{items.length === 1 ? '' : 's'}</p>
                <Button
                  type="button"
                  variant="ghost"
                  disabled={clearMutation.isPending}
                  onClick={() => clearMutation.mutate()}
                >
                  <Trash2 size={16} />
                  Clear wishlist
                </Button>
              </div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {items.map((item) => (
                  <WishlistCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          ) : null}
        </LuxuryCard>
      </section>
      <SiteFooter />
    </main>
  );
}

function WishlistCard({ item }: { item: Awaited<ReturnType<typeof getWishlist>>['items'][number] }) {
  const queryClient = useQueryClient();
  const removeMutation = useMutation({
    mutationFn: () => removeWishlistItem(item.productId),
    onSuccess: async () => queryClient.invalidateQueries({ queryKey: wishlistQueryKey }),
  });
  const variantId = item.product.variants[0]?.id;

  return (
    <div className="overflow-hidden rounded-lg border border-sage/15 bg-white">
      <Link href={`/products/${item.product.slug}`} className="relative block aspect-square bg-cream">
        {item.product.imageUrl ? (
          <Image src={item.product.imageUrl} alt={item.product.nameEn} fill className="object-contain p-6 mix-blend-multiply" sizes="25vw" />
        ) : (
          <ProductFallbackIcon />
        )}
      </Link>
      <div className="p-4">
        <p className="text-xs text-muted">{item.product.brand?.name ?? item.product.category.nameEn}</p>
        <Link href={`/products/${item.product.slug}`} className="mt-1 block min-h-10 text-sm font-semibold leading-5 hover:text-sage-dark">
          {item.product.nameEn}
        </Link>
        <p className="mt-3 text-base font-semibold text-sage-dark">{formatPiastres(item.product.basePrice)}</p>
        <div className="mt-4 flex items-center justify-between gap-2">
          <AddToCartButton size="sm" variantId={variantId} />
          <Button
            type="button"
            variant="secondary"
            size="sm"
            className="px-3"
            disabled={removeMutation.isPending}
            onClick={() => removeMutation.mutate()}
          >
            <Trash2 size={15} />
          </Button>
        </div>
      </div>
    </div>
  );
}

function WishlistState({
  title,
  text,
  actionHref,
  actionLabel,
}: {
  title: string;
  text: string;
  actionHref: string;
  actionLabel: string;
}) {
  return (
    <div className="grid min-h-[20rem] place-items-center text-center">
      <div>
        <Heart className="mx-auto text-sage" size={34} />
        <h2 className="mt-6 font-serif text-3xl text-sage-dark">{title}</h2>
        <p className="mx-auto mt-3 max-w-md leading-7 text-muted">{text}</p>
        <Button asChild className="mt-6">
          <Link href={actionHref}>
            <ShoppingBag size={16} />
            {actionLabel}
          </Link>
        </Button>
      </div>
    </div>
  );
}

function formatPiastres(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EGP',
    maximumFractionDigits: 0,
  }).format(value / 100);
}
