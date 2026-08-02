'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { KeyRound, Loader2, RotateCcw, ShieldCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  forgotPasswordSchema,
  resetPasswordSchema,
  type ForgotPasswordInput,
  type ResetPasswordInput,
} from '@cosmetics/contracts';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  forgotPassword,
  resetPassword,
  verifyPasswordResetOtp,
} from '@/features/auth/api/auth.api';
import { OtpChannelPicker } from '@/features/auth/components/otp-channel-picker';
import type { ApiErrorBody } from '@/lib/http/client';

type RecoveryStep = 'request' | 'otp' | 'password';

export function PasswordRecoveryForm() {
  const router = useRouter();
  const [step, setStep] = useState<RecoveryStep>('request');
  const [requestInput, setRequestInput] = useState<ForgotPasswordInput | null>(null);
  const [otp, setOtp] = useState('');

  const requestForm = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { identifier: '', channel: 'EMAIL' },
  });
  const passwordForm = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      identifier: '',
      token: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const requestMutation = useMutation({
    mutationFn: forgotPassword,
    onSuccess: (_, input) => {
      setRequestInput(input);
      setOtp('');
      setStep('otp');
    },
  });
  const verifyMutation = useMutation({
    mutationFn: async () => {
      if (!requestInput) throw new Error('Password recovery request is missing.');
      return verifyPasswordResetOtp({ ...requestInput, otp });
    },
    onSuccess: (grant) => {
      passwordForm.reset({
        identifier: requestInput?.identifier ?? '',
        token: grant.token,
        newPassword: '',
        confirmPassword: '',
      });
      setStep('password');
    },
  });
  const resetMutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => router.replace('/auth/login?passwordReset=1'),
  });

  if (step === 'request') {
    const channel = requestForm.watch('channel');
    return (
      <form className="space-y-5" onSubmit={requestForm.handleSubmit((input) => requestMutation.mutate(input))}>
        <div className="space-y-2">
          <Label>Receive the code by</Label>
          <OtpChannelPicker
            value={channel}
            onChange={(value) => {
              requestForm.setValue('channel', value, { shouldValidate: true });
              requestForm.setValue('identifier', '');
            }}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="recoveryIdentifier">{channel === 'EMAIL' ? 'Email address' : 'Mobile number'}</Label>
          <Input
            id="recoveryIdentifier"
            type={channel === 'EMAIL' ? 'email' : 'tel'}
            placeholder={channel === 'EMAIL' ? 'sara@example.com' : '01012345678'}
            autoComplete={channel === 'EMAIL' ? 'email' : 'tel'}
            {...requestForm.register('identifier')}
          />
          {requestForm.formState.errors.identifier ? (
            <p className="text-sm text-red-600">{requestForm.formState.errors.identifier.message}</p>
          ) : null}
        </div>
        <MutationError error={requestMutation.error} />
        <Button className="w-full" type="submit" disabled={requestMutation.isPending}>
          {requestMutation.isPending ? <Loader2 className="animate-spin" size={18} /> : <KeyRound size={18} />}
          Send recovery code
        </Button>
      </form>
    );
  }

  if (step === 'otp' && requestInput) {
    return (
      <form
        className="space-y-5"
        onSubmit={(event) => {
          event.preventDefault();
          verifyMutation.mutate();
        }}
      >
        <div className="rounded-md border border-sage/20 bg-sage-soft/60 p-4 text-sm text-ink">
          Enter the six-digit code sent to <strong>{requestInput.identifier}</strong>.
        </div>
        <div className="space-y-2">
          <Label htmlFor="recoveryOtp">Verification code</Label>
          <Input
            id="recoveryOtp"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            value={otp}
            onChange={(event) => setOtp(event.target.value.replace(/\D/g, '').slice(0, 6))}
          />
        </div>
        <MutationError error={verifyMutation.error ?? requestMutation.error} />
        <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
          <Button type="submit" disabled={verifyMutation.isPending || otp.length !== 6}>
            {verifyMutation.isPending ? <Loader2 className="animate-spin" size={18} /> : <ShieldCheck size={18} />}
            Verify code
          </Button>
          <Button
            type="button"
            variant="secondary"
            disabled={requestMutation.isPending}
            onClick={() => requestMutation.mutate(requestInput)}
          >
            <RotateCcw size={17} />
            Send again
          </Button>
        </div>
        <button type="button" className="text-sm font-medium text-sage-dark" onClick={() => setStep('request')}>
          Use another method
        </button>
      </form>
    );
  }

  return (
    <form className="space-y-5" onSubmit={passwordForm.handleSubmit((input) => resetMutation.mutate(input))}>
      <div className="space-y-2">
        <Label htmlFor="newPassword">New password</Label>
        <Input id="newPassword" type="password" autoComplete="new-password" {...passwordForm.register('newPassword')} />
        {passwordForm.formState.errors.newPassword ? <p className="text-sm text-red-600">{passwordForm.formState.errors.newPassword.message}</p> : null}
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Repeat new password</Label>
        <Input id="confirmPassword" type="password" autoComplete="new-password" {...passwordForm.register('confirmPassword')} />
        {passwordForm.formState.errors.confirmPassword ? <p className="text-sm text-red-600">{passwordForm.formState.errors.confirmPassword.message}</p> : null}
      </div>
      <MutationError error={resetMutation.error} />
      <Button className="w-full" type="submit" disabled={resetMutation.isPending}>
        {resetMutation.isPending ? <Loader2 className="animate-spin" size={18} /> : <KeyRound size={18} />}
        Save new password
      </Button>
    </form>
  );
}

function MutationError({ error }: { error: unknown }) {
  const apiError = error as ApiErrorBody | null;
  return apiError ? (
    <p className="rounded-md border border-red-300/40 bg-red-50 p-3 text-sm text-red-700">
      {apiError.message ?? 'The request could not be completed.'}
    </p>
  ) : null;
}
