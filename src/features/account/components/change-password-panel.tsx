'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { KeyRound, Loader2, ShieldCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  completePasswordChangeSchema,
  requestPasswordChangeSchema,
  type CompletePasswordChangeInput,
  type OtpDeliveryChannel,
  type RequestPasswordChangeInput,
} from '@cosmetics/contracts';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LuxuryCard } from '@/components/ui/luxury-card';
import {
  completePasswordChange,
  requestPasswordChange,
  verifyPasswordChangeOtp,
} from '@/features/auth/api/auth.api';
import { OtpChannelPicker } from '@/features/auth/components/otp-channel-picker';
import type { ApiErrorBody } from '@/lib/http/client';
import { useAuthStore } from '@/stores/auth-store';

type ChangeStep = 'current' | 'otp' | 'password';

export function ChangePasswordPanel() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const clearSession = useAuthStore((state) => state.logout);
  const [step, setStep] = useState<ChangeStep>('current');
  const [channel, setChannel] = useState<OtpDeliveryChannel>('EMAIL');
  const [destination, setDestination] = useState('');
  const [otp, setOtp] = useState('');

  const requestForm = useForm<RequestPasswordChangeInput>({
    resolver: zodResolver(requestPasswordChangeSchema),
    defaultValues: { currentPassword: '', channel: 'EMAIL' },
  });
  const passwordForm = useForm<CompletePasswordChangeInput>({
    resolver: zodResolver(completePasswordChangeSchema),
    defaultValues: { token: '', newPassword: '', confirmPassword: '' },
  });

  const requestMutation = useMutation({
    mutationFn: requestPasswordChange,
    onSuccess: (result, input) => {
      setChannel(input.channel);
      setDestination(result.destination);
      requestForm.reset({ currentPassword: '', channel: input.channel });
      setOtp('');
      setStep('otp');
    },
  });
  const verifyMutation = useMutation({
    mutationFn: () => verifyPasswordChangeOtp({ channel, otp }),
    onSuccess: (grant) => {
      passwordForm.reset({ token: grant.token, newPassword: '', confirmPassword: '' });
      setStep('password');
    },
  });
  const completeMutation = useMutation({
    mutationFn: completePasswordChange,
    onSuccess: () => {
      clearSession();
      queryClient.clear();
      router.replace('/auth/login?passwordChanged=1');
    },
  });

  return (
    <LuxuryCard className="p-7">
      <div className="mb-7 flex items-start gap-4">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gold/10 text-gold">
          <KeyRound size={21} />
        </span>
        <div>
          <p className="text-sm uppercase tracking-[.24em] text-gold">Account security</p>
          <h2 className="mt-2 font-serif text-3xl text-cream">Change password</h2>
          <p className="mt-2 text-sm leading-6 text-muted">
            Confirm your current password and a code. Every session will be signed out afterward.
          </p>
        </div>
      </div>

      {step === 'current' ? (
        <form className="space-y-5" onSubmit={requestForm.handleSubmit((input) => requestMutation.mutate(input))}>
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current password</Label>
            <Input id="currentPassword" type="password" autoComplete="current-password" {...requestForm.register('currentPassword')} />
            {requestForm.formState.errors.currentPassword ? <p className="text-sm text-red-300">{requestForm.formState.errors.currentPassword.message}</p> : null}
          </div>
          <div className="space-y-2">
            <Label>Receive the verification code by</Label>
            <OtpChannelPicker
              value={requestForm.watch('channel')}
              onChange={(value) => requestForm.setValue('channel', value, { shouldValidate: true })}
            />
          </div>
          <MutationError error={requestMutation.error} />
          <Button type="submit" disabled={requestMutation.isPending}>
            {requestMutation.isPending ? <Loader2 className="animate-spin" size={18} /> : <ShieldCheck size={18} />}
            Confirm and send code
          </Button>
        </form>
      ) : null}

      {step === 'otp' ? (
        <form
          className="space-y-5"
          onSubmit={(event) => {
            event.preventDefault();
            verifyMutation.mutate();
          }}
        >
          <p className="rounded-md border border-gold/20 bg-gold/10 p-4 text-sm text-cream">
            Enter the code sent to {destination}.
          </p>
          <div className="space-y-2">
            <Label htmlFor="changePasswordOtp">Verification code</Label>
            <Input
              id="changePasswordOtp"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              value={otp}
              onChange={(event) => setOtp(event.target.value.replace(/\D/g, '').slice(0, 6))}
            />
          </div>
          <MutationError error={verifyMutation.error} />
          <div className="flex flex-wrap gap-3">
            <Button type="submit" disabled={verifyMutation.isPending || otp.length !== 6}>
              {verifyMutation.isPending ? <Loader2 className="animate-spin" size={18} /> : <ShieldCheck size={18} />}
              Verify code
            </Button>
            <Button type="button" variant="secondary" onClick={() => setStep('current')}>
              Start again
            </Button>
          </div>
        </form>
      ) : null}

      {step === 'password' ? (
        <form className="space-y-5" onSubmit={passwordForm.handleSubmit((input) => completeMutation.mutate(input))}>
          <div className="space-y-2">
            <Label htmlFor="changedPassword">New password</Label>
            <Input id="changedPassword" type="password" autoComplete="new-password" {...passwordForm.register('newPassword')} />
            {passwordForm.formState.errors.newPassword ? <p className="text-sm text-red-300">{passwordForm.formState.errors.newPassword.message}</p> : null}
          </div>
          <div className="space-y-2">
            <Label htmlFor="changedPasswordConfirm">Repeat new password</Label>
            <Input id="changedPasswordConfirm" type="password" autoComplete="new-password" {...passwordForm.register('confirmPassword')} />
            {passwordForm.formState.errors.confirmPassword ? <p className="text-sm text-red-300">{passwordForm.formState.errors.confirmPassword.message}</p> : null}
          </div>
          <MutationError error={completeMutation.error} />
          <Button type="submit" disabled={completeMutation.isPending}>
            {completeMutation.isPending ? <Loader2 className="animate-spin" size={18} /> : <KeyRound size={18} />}
            Change password and sign out
          </Button>
        </form>
      ) : null}
    </LuxuryCard>
  );
}

function MutationError({ error }: { error: unknown }) {
  const apiError = error as ApiErrorBody | null;
  return apiError ? (
    <p className="rounded-md border border-red-300/20 bg-red-500/10 p-3 text-sm text-red-200">
      {apiError.message ?? 'The request could not be completed.'}
    </p>
  ) : null;
}
