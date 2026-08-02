'use client';

import { Loader2, LockKeyhole, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { LuxuryCard } from '@/components/ui/luxury-card';
import { AddressBook } from '@/features/account/components/address-book';
import { useAuthStore } from '@/stores/auth-store';

export function CheckoutGate() {
  const user = useAuthStore((state) => state.user);
  const hydrated = useAuthStore((state) => state.hydrated);
  const searchParams = useSearchParams();
  const redirect = searchParams.get('next') ?? '/checkout';

  if (!hydrated) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background text-white">
        <Loader2 className="animate-spin text-gold" size={28} />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background px-5 py-8 text-white sm:px-8">
      <div className="mx-auto max-w-4xl">
        <Link href="/" className="font-serif text-xl tracking-[.24em] text-cream">
          LUMIERE
        </Link>

        {!user ? (
          <LuxuryCard className="mt-12 p-8 text-center sm:p-12">
            <LockKeyhole className="mx-auto text-gold" size={38} />
            <p className="mt-8 text-sm uppercase tracking-[.3em] text-gold">Account required</p>
            <h1 className="mt-4 font-serif text-4xl text-cream">Create an account to make an order.</h1>
            <p className="mx-auto mt-5 max-w-2xl leading-8 text-muted">
              Customers can browse products and categories without signing in. When they
              place an order, the app requires a client account so addresses, order history,
              payment review, and support can be tied to the right customer.
            </p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild>
                <Link href={`/auth/register?next=${encodeURIComponent(redirect)}`}>Create account</Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href={`/auth/login?next=${encodeURIComponent(redirect)}`}>Sign in</Link>
              </Button>
            </div>
          </LuxuryCard>
        ) : (
          <div className="mt-12 space-y-6">
            <LuxuryCard className="p-8 sm:p-12">
              <ShoppingBag className="text-gold" size={38} />
              <p className="mt-8 text-sm uppercase tracking-[.3em] text-gold">Delivery details</p>
              <h1 className="mt-4 font-serif text-4xl text-cream">Choose or add your address.</h1>
              <p className="mt-5 max-w-2xl leading-8 text-muted">
                Your default saved address will be ready for the order flow. You can add,
                edit, remove, or change the default delivery address here.
              </p>
            </LuxuryCard>
            <AddressBook />
          </div>
        )}
      </div>
    </main>
  );
}
