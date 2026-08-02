'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ArrowRight, CheckCircle2, Clipboard, Loader2, LockKeyhole, ReceiptText, ShoppingBag, Upload } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useMemo, useState, type ChangeEvent, type FormEvent } from 'react';

import { Button } from '@/components/ui/button';
import { LuxuryCard } from '@/components/ui/luxury-card';
import { listAddresses } from '@/features/account/api/account.api';
import { getCart, cartQueryKey } from '@/features/cart/api/cart.api';
import { AddressBook } from '@/features/account/components/address-book';
import { checkoutFromCart, type CheckoutPaymentMethod, type CheckoutResponse } from '@/features/checkout/api/orders.api';
import { createPayment, listPaymentInstructions, submitPaymentProof, type ManualPaymentMethod, type PaymentResponse } from '@/features/payments/api/payments.api';
import type { ApiErrorBody } from '@/lib/http/client';
import { useAuthStore } from '@/stores/auth-store';

type ProofForm = {
  senderRef: string;
  txnReference: string;
  proofImageKey: string;
  contentType: 'image/jpeg' | 'image/png' | 'image/webp';
  contentLength: number;
};

const manualMethods: ManualPaymentMethod[] = ['INSTAPAY', 'VODAFONE_CASH'];

export function CheckoutGate() {
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user);
  const hydrated = useAuthStore((state) => state.hydrated);
  const searchParams = useSearchParams();
  const redirect = searchParams.get('next') ?? '/checkout';
  const [selectedAddressId, setSelectedAddressId] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<CheckoutPaymentMethod>('INSTAPAY');
  const [notes, setNotes] = useState('');
  const [checkoutResult, setCheckoutResult] = useState<CheckoutResponse | null>(null);
  const [payment, setPayment] = useState<PaymentResponse | null>(null);
  const [proofForm, setProofForm] = useState<ProofForm>({
    senderRef: '',
    txnReference: '',
    proofImageKey: '',
    contentType: 'image/jpeg',
    contentLength: 0,
  });

  const cartQuery = useQuery({
    queryKey: cartQueryKey,
    queryFn: getCart,
    enabled: Boolean(user),
  });
  const addressesQuery = useQuery({
    queryKey: ['account', 'addresses'],
    queryFn: listAddresses,
    enabled: Boolean(user),
  });
  const instructionsQuery = useQuery({
    queryKey: ['payments', 'instructions'],
    queryFn: listPaymentInstructions,
    enabled: Boolean(user),
  });

  const addresses = addressesQuery.data ?? [];
  const defaultAddressId = useMemo(
    () => selectedAddressId || addresses.find((address) => address.isDefault)?.id || addresses[0]?.id || '',
    [addresses, selectedAddressId],
  );
  const cart = cartQuery.data;
  const activeInstructions = instructionsQuery.data?.find((item) => item.method === paymentMethod);
  const canPlaceOrder = Boolean(defaultAddressId && cart && cart.items.length > 0 && !cart.hasIssues);

  const checkoutMutation = useMutation({
    mutationFn: async () => {
      const result = await checkoutFromCart({
        shippingAddressId: defaultAddressId,
        paymentMethod,
        ...(notes.trim() ? { notes: notes.trim() } : {}),
      });
      const activePayment = manualMethods.includes(paymentMethod as ManualPaymentMethod)
        ? await createPayment({
            orderId: result.order.id,
            method: paymentMethod as ManualPaymentMethod,
          })
        : null;

      return { result, activePayment };
    },
    onSuccess: async ({ result, activePayment }) => {
      setCheckoutResult(result);
      setPayment(activePayment);
      await queryClient.invalidateQueries({ queryKey: cartQueryKey });
    },
  });

  const proofMutation = useMutation({
    mutationFn: () => {
      if (!payment) throw new Error('Payment is not ready yet.');
      return submitPaymentProof(payment.id, {
        senderRef: proofForm.senderRef.trim(),
        txnReference: proofForm.txnReference.trim(),
        amountClaimed: payment.amount,
        proofImageKey: proofForm.proofImageKey,
        contentType: proofForm.contentType,
        contentLength: proofForm.contentLength,
      });
    },
    onSuccess: (updated) => setPayment(updated),
  });

  if (!hydrated) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background text-white">
        <Loader2 className="animate-spin text-gold" size={28} />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background px-5 py-8 text-white sm:px-8">
      <div className="mx-auto max-w-5xl">
        <Link href="/" className="font-serif text-xl tracking-[.24em] text-cream">
          LUMIERE
        </Link>

        {!user ? (
          <LuxuryCard className="mt-12 p-8 text-center sm:p-12">
            <LockKeyhole className="mx-auto text-gold" size={38} />
            <p className="mt-8 text-sm uppercase tracking-[.3em] text-gold">Account required</p>
            <h1 className="mt-4 font-serif text-4xl text-cream">Create an account to make an order.</h1>
            <p className="mx-auto mt-5 max-w-2xl leading-8 text-muted">
              Customers can browse products and categories without signing in. Checkout needs a client account for address, payment review, and support.
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
          <div className="mt-12 grid gap-6">
            <LuxuryCard className="p-8 sm:p-10">
              <ShoppingBag className="text-gold" size={38} />
              <p className="mt-8 text-sm uppercase tracking-[.3em] text-gold">Checkout</p>
              <h1 className="mt-4 font-serif text-4xl text-cream">Confirm your order and payment.</h1>
              <p className="mt-5 max-w-2xl leading-8 text-muted">
                Transfer details are loaded from the backend, then your proof goes to admin review before shipment.
              </p>
            </LuxuryCard>

            <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
              <LuxuryCard className="p-7">
                <form className="space-y-6" onSubmit={(event) => submitCheckout(event, canPlaceOrder, checkoutMutation.mutate)}>
                  <section>
                    <p className="text-sm uppercase tracking-[.22em] text-gold">Delivery</p>
                    <div className="mt-4 grid gap-3">
                      {addressesQuery.isLoading ? <p className="text-sm text-muted">Loading addresses...</p> : null}
                      {addresses.map((address) => (
                        <label key={address.id} className="flex cursor-pointer gap-3 rounded-md border border-gold/10 bg-white/[0.03] p-4">
                          <input
                            type="radio"
                            name="address"
                            checked={defaultAddressId === address.id}
                            onChange={() => setSelectedAddressId(address.id)}
                            className="mt-1 accent-[#d9b85f]"
                          />
                          <span>
                            <span className="block font-semibold text-cream">
                              {address.receiverName} {address.isDefault ? '(Default)' : ''}
                            </span>
                            <span className="mt-1 block text-sm leading-6 text-muted">
                              {address.building}, {address.street}, {address.area}, {address.city}, {address.governorate}
                            </span>
                          </span>
                        </label>
                      ))}
                      {!addressesQuery.isLoading && addresses.length === 0 ? (
                        <p className="rounded-md border border-gold/10 bg-white/[0.03] p-4 text-sm text-muted">
                          Add an address below before placing the order.
                        </p>
                      ) : null}
                    </div>
                  </section>

                  <section>
                    <p className="text-sm uppercase tracking-[.22em] text-gold">Payment</p>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      <PaymentOption method="INSTAPAY" current={paymentMethod} label="InstaPay" onChange={setPaymentMethod} />
                      <PaymentOption method="VODAFONE_CASH" current={paymentMethod} label="Vodafone Cash" onChange={setPaymentMethod} />
                      <PaymentOption method="CASH_ON_DELIVERY" current={paymentMethod} label="Cash on delivery" onChange={setPaymentMethod} />
                    </div>
                    {activeInstructions ? <InstructionCard instructions={activeInstructions} /> : null}
                  </section>

                  <section>
                    <label className="text-sm font-semibold text-cream">
                      Order notes
                      <textarea
                        className="mt-2 min-h-24 w-full rounded-md border border-gold/15 bg-white px-4 py-3 text-sm text-ink outline-none"
                        value={notes}
                        onChange={(event) => setNotes(event.target.value)}
                      />
                    </label>
                  </section>

                  <div className="flex flex-wrap items-center gap-3">
                    <Button type="submit" disabled={!canPlaceOrder || checkoutMutation.isPending || Boolean(checkoutResult)}>
                      {checkoutMutation.isPending ? <Loader2 className="animate-spin" size={18} /> : <ReceiptText size={18} />}
                      Place order
                    </Button>
                    {checkoutMutation.error ? <p className="text-sm text-red-300">{errorMessage(checkoutMutation.error)}</p> : null}
                  </div>
                </form>
              </LuxuryCard>

              <LuxuryCard className="h-fit p-6">
                <p className="text-sm uppercase tracking-[.22em] text-gold">Summary</p>
                <div className="mt-5 space-y-3 text-sm">
                  <SummaryRow label="Items" value={`${cart?.totalQuantity ?? 0}`} />
                  <SummaryRow label="Subtotal" value={formatPiastres(cart?.subtotal ?? 0)} />
                  <SummaryRow label="Status" value={cart?.hasIssues ? 'Needs review' : 'Ready'} />
                </div>
                {cartQuery.isLoading ? <p className="mt-4 text-sm text-muted">Loading cart...</p> : null}
                {cartQuery.error ? <p className="mt-4 text-sm text-red-300">{errorMessage(cartQuery.error)}</p> : null}
              </LuxuryCard>
            </div>

            {checkoutResult ? (
              <LuxuryCard className="p-7">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[.22em] text-gold">Order created</p>
                    <h2 className="mt-3 font-serif text-3xl text-cream">{checkoutResult.order.orderNumber}</h2>
                    <p className="mt-2 text-muted">{formatPiastres(checkoutResult.order.total)} · {checkoutResult.order.status}</p>
                  </div>
                  <CheckCircle2 className="text-gold" size={32} />
                </div>

                {payment ? (
                  <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_1fr]">
                    <InstructionCard instructions={payment.instructions ?? activeInstructions ?? undefined} reference={payment.referenceNumber ?? checkoutResult.order.orderNumber} />
                    <form className="rounded-md border border-gold/10 bg-white/[0.03] p-5" onSubmit={(event) => submitProof(event, proofMutation.mutate)}>
                      <p className="font-semibold text-cream">Upload payment proof</p>
                      <div className="mt-4 grid gap-3">
                        <input
                          className="rounded-md border border-gold/15 bg-white px-4 py-3 text-sm text-ink"
                          placeholder="Sender phone / InstaPay handle"
                          required
                          value={proofForm.senderRef}
                          onChange={(event) => setProofForm((current) => ({ ...current, senderRef: event.target.value }))}
                        />
                        <input
                          className="rounded-md border border-gold/15 bg-white px-4 py-3 text-sm text-ink"
                          placeholder="Transaction reference"
                          required
                          value={proofForm.txnReference}
                          onChange={(event) => setProofForm((current) => ({ ...current, txnReference: event.target.value }))}
                        />
                        <input
                          accept="image/jpeg,image/png,image/webp"
                          className="rounded-md border border-gold/15 bg-white px-4 py-3 text-sm text-ink"
                          required
                          type="file"
                          onChange={(event) => setProofFile(payment.id, event, setProofForm)}
                        />
                      </div>
                      <div className="mt-5 flex flex-wrap items-center gap-3">
                        <Button type="submit" disabled={proofMutation.isPending || payment.status === 'UNDER_REVIEW' || payment.status === 'APPROVED'}>
                          {proofMutation.isPending ? <Loader2 className="animate-spin" size={18} /> : <Upload size={18} />}
                          Submit proof
                        </Button>
                        <p className="text-sm text-muted">{payment.status}</p>
                      </div>
                      {proofMutation.error ? <p className="mt-3 text-sm text-red-300">{errorMessage(proofMutation.error)}</p> : null}
                    </form>
                  </div>
                ) : (
                  <p className="mt-5 rounded-md border border-gold/10 bg-white/[0.03] p-4 text-sm text-muted">
                    Cash on delivery order is ready. Shipment will be prepared by the team.
                  </p>
                )}
              </LuxuryCard>
            ) : null}

            <AddressBook />
          </div>
        )}
      </div>
    </main>
  );
}

function PaymentOption({
  method,
  current,
  label,
  onChange,
}: {
  method: CheckoutPaymentMethod;
  current: CheckoutPaymentMethod;
  label: string;
  onChange: (method: CheckoutPaymentMethod) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3 rounded-md border border-gold/10 bg-white/[0.03] p-4 text-sm font-semibold text-cream">
      <input
        checked={current === method}
        className="accent-[#d9b85f]"
        name="paymentMethod"
        type="radio"
        onChange={() => onChange(method)}
      />
      {label}
    </label>
  );
}

function InstructionCard({
  instructions,
  reference,
}: {
  instructions?: {
    method: string;
    accountName: string;
    accountNumber?: string | null;
    bank?: string | null;
    phoneNumber?: string | null;
    receiverName?: string | null;
    notes?: string | null;
  } | null;
  reference?: string;
}) {
  if (!instructions) return null;

  return (
    <div className="mt-4 rounded-md border border-gold/10 bg-white/[0.03] p-5">
      <p className="font-semibold text-cream">{formatMethod(instructions.method)} instructions</p>
      <div className="mt-3 space-y-2 text-sm text-muted">
        <CopyLine label="Account" value={instructions.accountName} />
        <CopyLine label="Phone" value={instructions.phoneNumber} />
        <CopyLine label="Account number" value={instructions.accountNumber} />
        <CopyLine label="Bank" value={instructions.bank} />
        <CopyLine label="Receiver" value={instructions.receiverName} />
        <CopyLine label="Notes" value={instructions.notes} />
        <CopyLine label="Reference" value={reference} />
      </div>
    </div>
  );
}

function CopyLine({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null;
  return (
    <div className="flex items-center justify-between gap-3">
      <span>{label}</span>
      <button
        type="button"
        className="inline-flex items-center gap-2 font-semibold text-cream"
        onClick={() => void navigator.clipboard?.writeText(value)}
      >
        {value}
        <Clipboard size={14} />
      </button>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-muted">{label}</span>
      <span className="font-semibold text-cream">{value}</span>
    </div>
  );
}

function submitCheckout(
  event: FormEvent<HTMLFormElement>,
  canPlaceOrder: boolean,
  submit: () => void,
) {
  event.preventDefault();
  if (canPlaceOrder) submit();
}

function submitProof(event: FormEvent<HTMLFormElement>, submit: () => void) {
  event.preventDefault();
  submit();
}

function setProofFile(
  paymentId: string,
  event: ChangeEvent<HTMLInputElement>,
  setProofForm: (update: (current: ProofForm) => ProofForm) => void,
) {
  const file = event.target.files?.[0];
  if (!file) return;

  const contentType: ProofForm['contentType'] =
    file.type === 'image/png' || file.type === 'image/webp' ? file.type : 'image/jpeg';
  const safeName = file.name.replace(/[^a-zA-Z0-9_.-]/g, '-');
  setProofForm((current) => ({
    ...current,
    proofImageKey: `payment-proofs/${paymentId}/${Date.now()}-${safeName}`,
    contentType,
    contentLength: file.size,
  }));
}

function errorMessage(error: unknown) {
  const apiError = error as ApiErrorBody | Error | null;
  return apiError?.message ?? 'Something went wrong.';
}

function formatMethod(method: string) {
  if (method === 'VODAFONE_CASH') return 'Vodafone Cash';
  if (method === 'INSTAPAY') return 'InstaPay';
  if (method === 'CASH_ON_DELIVERY' || method === 'COD') return 'Cash on delivery';
  return method;
}

function formatPiastres(value: number) {
  return new Intl.NumberFormat('en-EG', {
    style: 'currency',
    currency: 'EGP',
  }).format(value / 100);
}
