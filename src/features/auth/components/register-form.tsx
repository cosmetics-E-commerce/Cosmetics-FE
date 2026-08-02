'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Loader2, MailCheck, RotateCcw, Sparkles } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  registerSchema,
  type AuthSession,
} from '@cosmetics/contracts';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  register as registerClient,
  resendOtp,
  verifyOtp,
} from '@/features/auth/api/auth.api';
import { updateMyProfile } from '@/features/account/api/account.api';
import type { ApiErrorBody } from '@/lib/http/client';
import { useAuthStore } from '@/stores/auth-store';

const registerFormSchema = registerSchema.and(z.object({
  rePassword: z.string().min(8, 'Repeat your password'),
  gender: z.enum(['FEMALE', 'MALE', 'OTHER']),
})).refine((input) => input.password === input.rePassword, {
  message: 'Passwords do not match',
  path: ['rePassword'],
});
type RegisterFormInput = z.infer<typeof registerFormSchema>;

export function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('next') ?? '/account';
  const setSession = useAuthStore((state) => state.setSession);
  const [verificationEmail, setVerificationEmail] = useState<string | null>(null);
  const [pendingSession, setPendingSession] = useState<AuthSession | null>(null);
  const [otp, setOtp] = useState('');
  const form = useForm<RegisterFormInput>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      password: '',
      rePassword: '',
      gender: 'FEMALE',
      otpChannel: 'EMAIL',
    },
  });

  const registerMutation = useMutation({
    mutationFn: (input: RegisterFormInput) => registerClient(registerSchema.parse(input)),
    onSuccess: (session, input) => {
      setSession(session);
      void updateMyProfile({ gender: input.gender }).catch(() => undefined);
      setPendingSession(session);
      setVerificationEmail(input.email ?? null);
      setOtp('');
    },
  });

  const verifyMutation = useMutation({
    mutationFn: async (code: string) => {
      if (!pendingSession || !verificationEmail) {
        throw {
          statusCode: 400,
          code: 'OTP_SESSION_MISSING',
          message: 'Submit your account details again to request a fresh OTP.',
        } satisfies ApiErrorBody;
      }

      await verifyOtp({
        identifier: verificationEmail,
        channel: 'EMAIL',
        purpose: 'EMAIL_VERIFICATION',
        otp: code,
      });

      return pendingSession;
    },
    onSuccess: (session) => {
      setSession(session);
      router.push(redirectTo);
    },
  });

  const resendMutation = useMutation({
    mutationFn: () => {
      if (!verificationEmail) {
        throw {
          statusCode: 400,
          code: 'OTP_SESSION_MISSING',
          message: 'Submit your account details again to request a fresh OTP.',
        } satisfies ApiErrorBody;
      }

      return resendOtp({
        identifier: verificationEmail,
        channel: 'EMAIL',
        purpose: 'EMAIL_VERIFICATION',
      });
    },
  });

  const apiError =
    (registerMutation.error as ApiErrorBody | null) ??
    (verifyMutation.error as ApiErrorBody | null) ??
    (resendMutation.error as ApiErrorBody | null);

  if (verificationEmail) {
    return (
      <form
        className="space-y-5"
        onSubmit={(event) => {
          event.preventDefault();
          verifyMutation.mutate(otp);
        }}
      >
        <div className="rounded-2xl border border-gold/20 bg-gold/10 p-4 text-sm text-cream">
          <div className="mb-2 flex items-center gap-2 font-medium text-gold">
            <MailCheck size={18} />
            Verify your email
          </div>
          <p className="text-muted">
            Enter the 6-digit code sent to <span className="text-cream">{verificationEmail}</span>.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="otp">Email OTP</Label>
          <Input
            id="otp"
            inputMode="numeric"
            maxLength={6}
            pattern="[0-9]{6}"
            placeholder="123456"
            value={otp}
            onChange={(event) => setOtp(event.target.value.replace(/\D/g, '').slice(0, 6))}
          />
        </div>

        {apiError ? <p className="rounded-2xl border border-red-300/20 bg-red-500/10 p-3 text-sm text-red-200">{apiError.message}</p> : null}
        {resendMutation.isSuccess ? <p className="text-sm text-gold">A new code was sent.</p> : null}

        <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
          <Button type="submit" disabled={verifyMutation.isPending || otp.length !== 6}>
            {verifyMutation.isPending ? <Loader2 className="animate-spin" size={18} /> : <MailCheck size={18} />}
            Verify account
          </Button>
          <Button
            type="button"
            variant="secondary"
            disabled={resendMutation.isPending}
            onClick={() => resendMutation.mutate()}
          >
            {resendMutation.isPending ? <Loader2 className="animate-spin" size={18} /> : <RotateCcw size={18} />}
            Resend
          </Button>
        </div>
      </form>
    );
  }

  return (
    <form className="space-y-5" onSubmit={form.handleSubmit((input) => registerMutation.mutate(input))}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="firstName">First name</Label>
          <Input
            id="firstName"
            autoComplete="given-name"
            {...form.register('firstName')}
            value={form.watch('firstName') ?? ''}
          />
          {form.formState.errors.firstName ? <p className="text-sm text-red-300">{form.formState.errors.firstName.message}</p> : null}
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last name</Label>
          <Input
            id="lastName"
            autoComplete="family-name"
            {...form.register('lastName')}
            value={form.watch('lastName') ?? ''}
          />
          {form.formState.errors.lastName ? <p className="text-sm text-red-300">{form.formState.errors.lastName.message}</p> : null}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Mobile number</Label>
        <Input
          id="phone"
          autoComplete="tel"
          placeholder="01012345678"
          {...form.register('phone')}
          value={form.watch('phone') ?? ''}
        />
        {form.formState.errors.phone ? <p className="text-sm text-red-300">{form.formState.errors.phone.message}</p> : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          {...form.register('email')}
          value={form.watch('email') ?? ''}
        />
        {form.formState.errors.email ? <p className="text-sm text-red-300">{form.formState.errors.email.message}</p> : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          autoComplete="new-password"
          {...form.register('password')}
          value={form.watch('password') ?? ''}
        />
        {form.formState.errors.password ? <p className="text-sm text-red-300">{form.formState.errors.password.message}</p> : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="rePassword">Repeat password</Label>
        <Input
          id="rePassword"
          type="password"
          autoComplete="new-password"
          {...form.register('rePassword')}
          value={form.watch('rePassword') ?? ''}
        />
        {form.formState.errors.rePassword ? <p className="text-sm text-red-300">{form.formState.errors.rePassword.message}</p> : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="gender">Gender</Label>
        <select
          id="gender"
          className="h-12 w-full rounded-2xl border border-gold/15 bg-black/40 px-4 text-sm text-white outline-none transition focus:border-gold/60"
          {...form.register('gender')}
        >
          <option value="FEMALE">Female</option>
          <option value="MALE">Male</option>
          <option value="OTHER">Other</option>
        </select>
        {form.formState.errors.gender ? <p className="text-sm text-red-300">{form.formState.errors.gender.message}</p> : null}
      </div>

      {apiError ? <p className="rounded-2xl border border-red-300/20 bg-red-500/10 p-3 text-sm text-red-200">{apiError.message}</p> : null}

      <Button type="submit" className="w-full" disabled={registerMutation.isPending}>
        {registerMutation.isPending ? <Loader2 className="animate-spin" size={18} /> : <Sparkles size={18} />}
        Send email code
      </Button>
    </form>
  );
}
