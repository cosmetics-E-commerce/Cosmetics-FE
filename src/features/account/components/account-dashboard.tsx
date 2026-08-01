'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Home, Loader2, LogOut, MapPin, ShieldCheck, Star } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm, type UseFormRegisterReturn } from 'react-hook-form';

import { createAddressSchema, type CreateAddressInput } from '@contracts/users/user.schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LuxuryCard } from '@/components/ui/luxury-card';
import { createAddress, getMyProfile, listAddresses, setDefaultAddress } from '@/features/account/api/account.api';
import { logout } from '@/features/auth/api/auth.api';
import { authTokenStorage } from '@/lib/auth/token-storage';
import type { ApiErrorBody } from '@/lib/http/client';
import { useAuthStore } from '@/stores/auth-store';

export function AccountDashboard() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user);
  const hydrated = useAuthStore((state) => state.hydrated);
  const clearSession = useAuthStore((state) => state.logout);

  useEffect(() => {
    if (hydrated && !user) {
      router.replace('/auth/login');
    }
  }, [hydrated, router, user]);

  const profileQuery = useQuery({
    queryKey: ['account', 'profile'],
    queryFn: getMyProfile,
    enabled: Boolean(user),
  });

  const addressesQuery = useQuery({
    queryKey: ['account', 'addresses'],
    queryFn: listAddresses,
    enabled: Boolean(user),
  });

  const addressForm = useForm<CreateAddressInput>({
    resolver: zodResolver(createAddressSchema),
    defaultValues: {
      label: 'HOME',
      receiverName: '',
      phone: '',
      country: 'EG',
      city: '',
      area: '',
      street: '',
      building: '',
      floor: '',
      apartment: '',
      postalCode: '',
      notes: '',
      isDefault: false,
    },
  });

  const createAddressMutation = useMutation({
    mutationFn: createAddress,
    onSuccess: () => {
      addressForm.reset();
      queryClient.invalidateQueries({ queryKey: ['account', 'addresses'] });
    },
  });

  const setDefaultMutation = useMutation({
    mutationFn: setDefaultAddress,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['account', 'addresses'] }),
  });

  const logoutMutation = useMutation({
    mutationFn: () => logout({ refreshToken: authTokenStorage.getRefreshToken() ?? undefined }),
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
  const addresses = addressesQuery.data ?? [];
  const apiError = createAddressMutation.error as ApiErrorBody | null;

  return (
    <main className="min-h-screen bg-background px-5 py-8 text-white sm:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col gap-5 border-b border-gold/10 pb-8 md:flex-row md:items-center md:justify-between">
          <div>
            <Link href="/" className="font-serif text-xl tracking-[.24em] text-cream">
              LUMIERE
            </Link>
            <h1 className="mt-8 font-serif text-4xl text-white">Client account</h1>
            <p className="mt-3 text-muted">Profile and delivery details served by the production backend.</p>
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
              <p>Role: {profile?.role ?? user.role}</p>
              <p>Status: {profile?.status ?? 'Active session'}</p>
            </div>
          </LuxuryCard>

          <LuxuryCard className="p-7">
            <MapPin className="mb-8 text-gold" size={28} />
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[.28em] text-gold">Delivery book</p>
                <h2 className="mt-3 font-serif text-3xl text-cream">Addresses</h2>
              </div>
              {addressesQuery.isFetching ? <Loader2 className="animate-spin text-gold" size={20} /> : null}
            </div>

            <div className="space-y-4">
              {addresses.map((address) => (
                <div key={address.id} className="rounded-3xl border border-gold/10 bg-white/[0.03] p-5">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="flex items-center gap-2 font-medium text-cream">
                        <Home size={16} />
                        {address.receiverName}
                        {address.isDefault ? <Star className="fill-gold text-gold" size={15} /> : null}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-muted">
                        {address.street}, {address.area}, {address.city}
                      </p>
                      <p className="mt-1 text-sm text-muted">{address.phone}</p>
                    </div>
                    {!address.isDefault ? (
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => setDefaultMutation.mutate(address.id)}
                        disabled={setDefaultMutation.isPending}
                      >
                        Set default
                      </Button>
                    ) : null}
                  </div>
                </div>
              ))}

              {!addressesQuery.isLoading && addresses.length === 0 ? (
                <p className="rounded-3xl border border-gold/10 bg-white/[0.03] p-5 text-sm text-muted">
                  No saved addresses yet.
                </p>
              ) : null}
            </div>
          </LuxuryCard>
        </section>

        <LuxuryCard className="p-7">
          <p className="text-sm uppercase tracking-[.28em] text-gold">Add address</p>
          <form
            className="mt-7 grid gap-5 md:grid-cols-2"
            onSubmit={addressForm.handleSubmit((input) => createAddressMutation.mutate(input))}
          >
            <Field id="receiverName" label="Receiver name" register={addressForm.register('receiverName')} error={addressForm.formState.errors.receiverName?.message} />
            <Field id="addressPhone" label="Phone" register={addressForm.register('phone')} error={addressForm.formState.errors.phone?.message} />
            <Field id="city" label="City" register={addressForm.register('city')} error={addressForm.formState.errors.city?.message} />
            <Field id="area" label="Area" register={addressForm.register('area')} error={addressForm.formState.errors.area?.message} />
            <Field id="street" label="Street" register={addressForm.register('street')} error={addressForm.formState.errors.street?.message} className="md:col-span-2" />
            <Field id="building" label="Building" register={addressForm.register('building')} error={addressForm.formState.errors.building?.message} />
            <Field id="floor" label="Floor" register={addressForm.register('floor')} error={addressForm.formState.errors.floor?.message} />

            {apiError ? <p className="rounded-2xl border border-red-300/20 bg-red-500/10 p-3 text-sm text-red-200 md:col-span-2">{apiError.message}</p> : null}

            <div className="md:col-span-2">
              <Button type="submit" disabled={createAddressMutation.isPending}>
                {createAddressMutation.isPending ? <Loader2 className="animate-spin" size={18} /> : <MapPin size={18} />}
                Save address
              </Button>
            </div>
          </form>
        </LuxuryCard>
      </div>
    </main>
  );
}

function Field({
  id,
  label,
  register,
  error,
  className,
}: {
  id: string;
  label: string;
  register: UseFormRegisterReturn;
  error?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} className="mt-2" {...register} />
      {error ? <p className="mt-2 text-sm text-red-300">{error}</p> : null}
    </div>
  );
}
