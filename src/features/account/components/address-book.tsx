'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Home, Loader2, MapPin, Pencil, Star, Trash2, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useForm, type UseFormRegisterReturn } from 'react-hook-form';
import {
  createAddressSchema,
  type AddressResponse,
  type CreateAddressInput,
} from '@cosmetics/contracts';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LuxuryCard } from '@/components/ui/luxury-card';
import {
  createAddress,
  deleteAddress,
  listAddresses,
  setDefaultAddress,
  updateAddress,
} from '@/features/account/api/account.api';
import type { ApiErrorBody } from '@/lib/http/client';
import { egyptGovernorates, locationsForGovernorate } from '@/lib/egypt/locations';

const selectClassName = 'h-12 w-full rounded-md border border-sage/20 bg-white px-4 text-sm text-ink outline-none transition focus:border-sage/60';
const textAreaClassName = 'min-h-28 w-full rounded-md border border-sage/20 bg-white px-4 py-3 text-sm text-ink outline-none transition placeholder:text-muted/70 focus:border-sage/60';

export function AddressBook() {
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState<string | null>(null);
  const addressesQuery = useQuery({
    queryKey: ['account', 'addresses'],
    queryFn: listAddresses,
  });
  const form = useForm<CreateAddressInput>({
    resolver: zodResolver(createAddressSchema),
    defaultValues: emptyAddress(),
  });
  const governorate = form.watch('governorate');
  const availableLocations = useMemo(
    () => locationsForGovernorate(governorate),
    [governorate],
  );

  const saveMutation = useMutation({
    mutationFn: (input: CreateAddressInput) => editingId
      ? updateAddress(editingId, input)
      : createAddress(input),
    onSuccess: () => {
      finishEditing();
      void queryClient.invalidateQueries({ queryKey: ['account', 'addresses'] });
    },
  });
  const defaultMutation = useMutation({
    mutationFn: setDefaultAddress,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['account', 'addresses'] }),
  });
  const deleteMutation = useMutation({
    mutationFn: deleteAddress,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['account', 'addresses'] }),
  });

  const addresses = addressesQuery.data ?? [];
  const apiError = (saveMutation.error ?? deleteMutation.error ?? defaultMutation.error) as ApiErrorBody | null;

  function beginEditing(address: AddressResponse) {
    setEditingId(address.id);
    form.reset({
      label: address.label ?? 'HOME',
      receiverName: address.receiverName,
      phone: address.phone,
      country: address.country,
      governorate: address.governorate,
      city: address.city,
      area: address.area,
      street: address.street,
      building: address.building,
      floor: address.floor,
      apartment: address.apartment,
      postalCode: address.postalCode,
      landmark: address.landmark,
      deliveryInstructions: address.deliveryInstructions,
      isDefault: address.isDefault,
    });
    document.getElementById('address-editor')?.scrollIntoView({ behavior: 'smooth' });
  }

  function finishEditing() {
    setEditingId(null);
    form.reset(emptyAddress());
  }

  return (
    <section className="space-y-6">
      <LuxuryCard className="p-7">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[.28em] text-gold">Delivery book</p>
            <h2 className="mt-3 font-serif text-3xl text-cream">Saved addresses</h2>
          </div>
          {addressesQuery.isFetching ? <Loader2 className="animate-spin text-gold" size={20} /> : <MapPin className="text-gold" size={26} />}
        </div>

        <div className="space-y-4">
          {addresses.map((address) => (
            <article key={address.id} className="rounded-3xl border border-gold/10 bg-white/[0.03] p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="flex items-center gap-2 font-medium text-cream">
                    <Home size={16} />
                    {address.label ?? 'Address'} · {address.receiverName}
                    {address.isDefault ? <Star className="fill-gold text-gold" size={15} /> : null}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    Building {address.building}, {address.street}, {address.area}, {address.city}, {address.governorate}
                  </p>
                  {address.landmark ? <p className="mt-1 text-sm text-muted">Landmark: {address.landmark}</p> : null}
                  <p className="mt-1 text-sm text-muted">{address.phone}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {!address.isDefault ? (
                    <Button size="sm" variant="secondary" onClick={() => defaultMutation.mutate(address.id)} disabled={defaultMutation.isPending}>
                      <Star size={14} /> Default
                    </Button>
                  ) : null}
                  <Button size="sm" variant="secondary" onClick={() => beginEditing(address)}>
                    <Pencil size={14} /> Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => {
                      if (window.confirm('Delete this saved address?')) deleteMutation.mutate(address.id);
                    }}
                    disabled={deleteMutation.isPending}
                  >
                    <Trash2 size={14} /> Delete
                  </Button>
                </div>
              </div>
            </article>
          ))}
          {!addressesQuery.isLoading && addresses.length === 0 ? (
            <p className="rounded-3xl border border-gold/10 bg-white/[0.03] p-5 text-sm text-muted">
              No saved addresses yet. Add the first checkout address below.
            </p>
          ) : null}
        </div>
      </LuxuryCard>

      <LuxuryCard id="address-editor" className="p-7">
        <div className="mb-7 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[.28em] text-gold">{editingId ? 'Update address' : 'Add address'}</p>
            <h2 className="mt-3 font-serif text-3xl text-cream">Checkout delivery details</h2>
          </div>
          {editingId ? (
            <Button type="button" size="sm" variant="secondary" onClick={finishEditing}>
              <X size={15} /> Cancel edit
            </Button>
          ) : null}
        </div>

        <form className="grid gap-5 md:grid-cols-2" onSubmit={form.handleSubmit((input) => saveMutation.mutate(input))}>
          <div>
            <Label htmlFor="addressLabel">Label</Label>
            <select id="addressLabel" className={`${selectClassName} mt-2`} {...form.register('label')}>
              <option value="HOME">Home</option>
              <option value="WORK">Work</option>
              <option value="OTHER">Other</option>
            </select>
          </div>
          <Field id="receiverName" label="Receiver name" register={form.register('receiverName')} error={form.formState.errors.receiverName?.message} />
          <Field id="addressPhone" label="Phone" register={form.register('phone')} error={form.formState.errors.phone?.message} />
          <div>
            <Label htmlFor="governorate">Governorate</Label>
            <select
              id="governorate"
              className={`${selectClassName} mt-2`}
              {...form.register('governorate', {
                onChange: () => form.setValue('city', '', { shouldValidate: false }),
              })}
            >
              <option value="">Choose governorate</option>
              {egyptGovernorates.map((entry) => <option key={entry.code} value={entry.value}>{entry.label}</option>)}
            </select>
            {form.formState.errors.governorate ? <p className="mt-2 text-sm text-red-300">{form.formState.errors.governorate.message}</p> : null}
          </div>
          <div>
            <Label htmlFor="city">City / district</Label>
            <select id="city" className={`${selectClassName} mt-2`} disabled={!governorate} {...form.register('city')}>
              <option value="">Choose city or district</option>
              {availableLocations.map((location) => (
                <option key={location.id} value={location.nameEn}>{location.name} — {location.nameEn}</option>
              ))}
            </select>
            {form.formState.errors.city ? <p className="mt-2 text-sm text-red-300">{form.formState.errors.city.message}</p> : null}
          </div>
          <Field id="area" label="Area / neighborhood" register={form.register('area')} error={form.formState.errors.area?.message} />
          <Field id="street" label="Street" register={form.register('street')} error={form.formState.errors.street?.message} className="md:col-span-2" />
          <Field id="building" label="Building number" register={form.register('building')} error={form.formState.errors.building?.message} />
          <Field id="floor" label="Floor (optional)" register={form.register('floor')} error={form.formState.errors.floor?.message} />
          <Field id="apartment" label="Apartment (optional)" register={form.register('apartment')} error={form.formState.errors.apartment?.message} />
          <Field id="postalCode" label="Postal code (optional)" register={form.register('postalCode')} error={form.formState.errors.postalCode?.message} />
          <Field id="landmark" label="Nearby landmark (optional)" register={form.register('landmark')} error={form.formState.errors.landmark?.message} className="md:col-span-2" />
          <div className="md:col-span-2">
            <Label htmlFor="deliveryInstructions">Delivery instructions (optional)</Label>
            <textarea
              id="deliveryInstructions"
              className={`${textAreaClassName} mt-2`}
              placeholder="Call before arrival, leave with reception, or another useful instruction."
              {...form.register('deliveryInstructions')}
            />
            {form.formState.errors.deliveryInstructions ? <p className="mt-2 text-sm text-red-300">{form.formState.errors.deliveryInstructions.message}</p> : null}
          </div>
          <label className="flex items-center gap-3 text-sm text-cream md:col-span-2">
            <input type="checkbox" className="h-4 w-4 accent-[#8b774d]" {...form.register('isDefault')} />
            Use as my default checkout address
          </label>

          {apiError ? <p className="rounded-md border border-red-300/20 bg-red-500/10 p-3 text-sm text-red-200 md:col-span-2">{apiError.message}</p> : null}
          <div className="md:col-span-2">
            <Button type="submit" disabled={saveMutation.isPending}>
              {saveMutation.isPending ? <Loader2 className="animate-spin" size={18} /> : <MapPin size={18} />}
              {editingId ? 'Save address changes' : 'Save address'}
            </Button>
          </div>
        </form>
      </LuxuryCard>
    </section>
  );
}

function emptyAddress(): CreateAddressInput {
  return {
    label: 'HOME',
    receiverName: '',
    phone: '',
    country: 'EG',
    governorate: '',
    city: '',
    area: '',
    street: '',
    building: '',
    floor: null,
    apartment: null,
    postalCode: null,
    landmark: null,
    deliveryInstructions: null,
    isDefault: false,
  };
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
