'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Loader2, LogOut, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { LuxuryCard } from '@/components/ui/luxury-card';
import { getMyProfile } from '@/features/account/api/account.api';
import { AddressBook } from '@/features/account/components/address-book';
import { ChangePasswordPanel } from '@/features/account/components/change-password-panel';
import { logout } from '@/features/auth/api/auth.api';
import { useAuthStore } from '@/stores/auth-store';

export function AccountDashboard() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user);
  const hydrated = useAuthStore((state) => state.hydrated);
  const clearSession = useAuthStore((state) => state.logout);

  useEffect(() => {
    if (hydrated && !user) router.replace('/auth/login');
  }, [hydrated, router, user]);

  const profileQuery = useQuery({
    queryKey: ['account', 'profile'],
    queryFn: getMyProfile,
    enabled: Boolean(user),
  });
  const logoutMutation = useMutation({
    mutationFn: logout,
    onSettled: () => {
      clearSession();
      queryClient.clear();
      router.push('/');
    },
  });

  if (!hydrated || !user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background text-white">
        <Loader2 className="animate-spin text-gold" size={28} />
      </main>
    );
  }

  const profile = profileQuery.data;

  return (
    <main className="min-h-screen bg-background px-5 py-8 text-white sm:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col gap-5 border-b border-gold/10 pb-8 md:flex-row md:items-center md:justify-between">
          <div>
            <Link href="/" className="font-serif text-xl tracking-[.24em] text-cream">LUMIERE</Link>
            <h1 className="mt-8 font-serif text-4xl text-white">Client account</h1>
            <p className="mt-3 text-muted">Profile, account security, and checkout delivery details.</p>
          </div>
          <Button variant="secondary" onClick={() => logoutMutation.mutate()} disabled={logoutMutation.isPending}>
            {logoutMutation.isPending ? <Loader2 className="animate-spin" size={18} /> : <LogOut size={18} />}
            Sign out
          </Button>
        </header>

        <section className="grid gap-6 py-10 lg:grid-cols-[.92fr_1.08fr]">
          <LuxuryCard className="p-7">
            <ShieldCheck className="mb-8 text-gold" size={28} />
            <p className="text-sm uppercase tracking-[.28em] text-gold">Verified session</p>
            <h2 className="mt-4 font-serif text-3xl text-cream">
              {profile ? `${profile.firstName} ${profile.lastName}` : `${user.firstName} ${user.lastName}`}
            </h2>
            <div className="mt-7 space-y-3 text-sm text-muted">
              <p>Phone: {profile?.phone ?? user.phone}</p>
              <p>Email: {profile?.email ?? user.email ?? 'Not provided'}</p>
              <p>Phone verified: {profile?.phoneVerified ? 'Yes' : 'No'}</p>
              <p>Email verified: {profile?.emailVerified ? 'Yes' : 'No'}</p>
              <p>Status: {profile?.status ?? 'Active session'}</p>
            </div>
          </LuxuryCard>
          <ChangePasswordPanel />
        </section>

        <AddressBook />
      </div>
    </main>
  );
}
