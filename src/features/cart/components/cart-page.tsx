'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ArrowRight, Loader2, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import type { CartItemResponse } from '@cosmetics/contracts';
import { Button } from '@/components/ui/button';
import { LuxuryCard } from '@/components/ui/luxury-card';
import {
  cartQueryKey,
  clearCart,
  getCart,
  removeCartItem,
  updateCartItem,
} from '@/features/cart/api/cart.api';
import { ProductFallbackIcon, SiteFooter, SiteHeader } from '@/features/catalog/components/site-chrome';
import type { ApiErrorBody } from '@/lib/http/client';
import { cn } from '@/lib/utils/cn';

export function CartPage() {
  const queryClient = useQueryClient();
  const cartQuery = useQuery({
    queryKey: cartQueryKey,
    queryFn: getCart,
  });

  const clearMutation = useMutation({
    mutationFn: clearCart,
    onSuccess: async () => queryClient.invalidateQueries({ queryKey: cartQueryKey }),
  });

  const error = cartQuery.error as ApiErrorBody | null;
  const cart = cartQuery.data;
  const items = cart?.items ?? [];

  return (
    <main className="min-h-screen bg-background text-ink">
      <SiteHeader />
      <section className="border-b border-black/[.08] bg-[#F5E8D9]">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-12 sm:px-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.24em] text-sage-dark">Shopping cart</p>
            <h1 className="mt-4 font-serif text-6xl leading-none">Your Cart</h1>
            <p className="mt-5 max-w-2xl leading-7 text-muted">
              Review quantities before checkout. Prices and stock are validated by the backend every time the cart changes.
            </p>
          </div>
          <Button asChild variant="secondary">
            <Link href="/products">Continue shopping</Link>
          </Button>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-10 sm:px-8 lg:grid-cols-[1fr_360px]">
        <LuxuryCard className="min-h-[26rem] border-black/[.08] bg-[#fffdf8] p-5 sm:p-7">
          {cartQuery.isLoading ? (
            <div className="grid min-h-[20rem] place-items-center">
              <Loader2 className="animate-spin text-sage" size={30} />
            </div>
          ) : null}

          {!cartQuery.isLoading && error ? (
            <CartState
              title="Cart is unavailable"
              text={error.message || 'The backend could not load the cart right now.'}
            />
          ) : null}

          {!cartQuery.isLoading && !error && items.length === 0 ? (
            <CartState
              title="Your cart is empty"
              text="Add products from the catalogue, then come back here to review stock and checkout."
            />
          ) : null}

          {!cartQuery.isLoading && !error && items.length > 0 ? (
            <div className="space-y-4">
              {items.map((item) => (
                <CartLine key={item.variantId} item={item} />
              ))}
              <div className="flex justify-end pt-3">
                <Button
                  type="button"
                  variant="ghost"
                  disabled={clearMutation.isPending}
                  onClick={() => clearMutation.mutate()}
                >
                  <Trash2 size={16} />
                  Clear cart
                </Button>
              </div>
            </div>
          ) : null}
        </LuxuryCard>

        <LuxuryCard className="h-fit border-black/[.08] bg-[#fffdf8] p-6">
          <p className="text-xs font-semibold uppercase tracking-[.18em] text-sage-dark">Summary</p>
          <div className="mt-6 space-y-4 text-sm">
            <SummaryRow label="Items" value={`${cart?.totalQuantity ?? 0}`} />
            <SummaryRow label="Subtotal" value={formatPiastres(cart?.subtotal ?? 0)} />
            <SummaryRow label="Stock status" value={cart?.hasIssues ? 'Needs review' : 'Ready'} tone={cart?.hasIssues ? 'danger' : 'ok'} />
          </div>
          <Button asChild className="mt-7 w-full" disabled={!cart || items.length === 0 || cart.hasIssues}>
            <Link href="/checkout">
              Checkout
              <ArrowRight size={16} />
            </Link>
          </Button>
          {cart?.hasIssues ? (
            <p className="mt-3 text-sm leading-6 text-red-700">
              Some items are out of stock or no longer sellable. Update the cart before checkout.
            </p>
          ) : null}
        </LuxuryCard>
      </section>
      <SiteFooter />
    </main>
  );
}

function CartLine({ item }: { item: CartItemResponse }) {
  const queryClient = useQueryClient();
  const updateMutation = useMutation({
    mutationFn: (quantity: number) => updateCartItem(item.variantId, { quantity }),
    onSuccess: async () => queryClient.invalidateQueries({ queryKey: cartQueryKey }),
  });
  const removeMutation = useMutation({
    mutationFn: () => removeCartItem(item.variantId),
    onSuccess: async () => queryClient.invalidateQueries({ queryKey: cartQueryKey }),
  });

  const nextQuantity = Math.min(item.quantity + 1, item.maxAvailable || item.quantity);
  const canIncrease = item.status === 'AVAILABLE' && item.quantity < item.maxAvailable;
  const isBusy = updateMutation.isPending || removeMutation.isPending;

  return (
    <div className={cn('grid gap-4 rounded-md border p-4 sm:grid-cols-[96px_1fr_auto]', item.status === 'AVAILABLE' ? 'border-sage/15' : 'border-red-200 bg-red-50/60')}>
      <Link href={`/products/${item.slug}`} className="relative h-24 overflow-hidden rounded-md bg-cream">
        {item.imageUrl ? (
          <Image src={item.imageUrl} alt={item.productNameEn} fill className="object-contain p-3 mix-blend-multiply" sizes="96px" />
        ) : (
          <ProductFallbackIcon />
        )}
      </Link>
      <div>
        <p className="text-xs text-muted">{item.sku}</p>
        <Link href={`/products/${item.slug}`} className="mt-1 block font-semibold text-sage-dark hover:text-sage">
          {item.productNameEn}
        </Link>
        <p className="mt-1 text-sm text-muted">{item.variantNameEn}</p>
        <p className="mt-3 text-sm font-semibold">{formatPiastres(item.unitPrice)}</p>
        {item.issues.length > 0 ? (
          <div className="mt-3 space-y-1">
            {item.issues.map((issue) => (
              <p key={issue} className="text-xs font-medium text-red-700">{issue}</p>
            ))}
          </div>
        ) : (
          <p className="mt-3 text-xs text-muted">{item.available} available</p>
        )}
      </div>
      <div className="flex items-center justify-between gap-5 sm:flex-col sm:items-end">
        <div className="flex h-10 items-center rounded-md border border-sage/20 bg-white">
          <button
            type="button"
            className="grid h-10 w-10 place-items-center text-sage-dark disabled:opacity-40"
            disabled={isBusy || item.quantity <= 1}
            onClick={() => updateMutation.mutate(item.quantity - 1)}
            aria-label="Decrease quantity"
          >
            <Minus size={15} />
          </button>
          <span className="min-w-8 text-center text-sm font-semibold">{item.quantity}</span>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center text-sage-dark disabled:opacity-40"
            disabled={isBusy || !canIncrease}
            onClick={() => updateMutation.mutate(nextQuantity)}
            aria-label="Increase quantity"
          >
            <Plus size={15} />
          </button>
        </div>
        <div className="text-right">
          <p className="text-base font-semibold">{formatPiastres(item.lineTotal)}</p>
          <button
            type="button"
            className="mt-2 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[.08em] text-red-700 disabled:opacity-40"
            disabled={isBusy}
            onClick={() => removeMutation.mutate()}
          >
            <Trash2 size={14} />
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

function CartState({ title, text }: { title: string; text: string }) {
  return (
    <div className="grid min-h-[20rem] place-items-center text-center">
      <div>
        <ShoppingBag className="mx-auto text-sage" size={34} />
        <h2 className="mt-6 font-serif text-3xl text-sage-dark">{title}</h2>
        <p className="mx-auto mt-3 max-w-md leading-7 text-muted">{text}</p>
        <Button asChild className="mt-6">
          <Link href="/products">Browse products</Link>
        </Button>
      </div>
    </div>
  );
}

function SummaryRow({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: 'ok' | 'danger';
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-muted">{label}</span>
      <span className={cn('font-semibold', tone === 'ok' ? 'text-sage-dark' : undefined, tone === 'danger' ? 'text-red-700' : undefined)}>
        {value}
      </span>
    </div>
  );
}

function formatPiastres(value: number) {
  return new Intl.NumberFormat('en-EG', {
    style: 'currency',
    currency: 'EGP',
  }).format(value / 100);
}
