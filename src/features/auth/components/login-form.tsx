'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Eye, Loader2, LogIn } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { loginSchema, type LoginInput } from '@contracts/auth/auth.schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { login } from '@/features/auth/api/auth.api';
import type { ApiErrorBody } from '@/lib/http/client';
import { useAuthStore } from '@/stores/auth-store';

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('next') ?? '/account';
  const setSession = useAuthStore((state) => state.setSession);
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: '',
      password: '',
    },
  });

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (session) => {
      setSession(session);
      router.push(redirectTo);
    },
  });

  const apiError = mutation.error as ApiErrorBody | null;

  return (
    <form className="space-y-5" onSubmit={form.handleSubmit((input) => mutation.mutate(input))}>
      <div className="space-y-2">
        <Label htmlFor="identifier">Phone or email</Label>
        <Input id="identifier" autoComplete="username" {...form.register('identifier')} />
        {form.formState.errors.identifier ? (
          <p className="text-sm text-red-300">{form.formState.errors.identifier.message}</p>
        ) : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            className="pe-12"
            {...form.register('password')}
          />
          <button
            type="button"
            className="absolute end-4 top-1/2 -translate-y-1/2 text-muted transition hover:text-white"
            onClick={() => setShowPassword((value) => !value)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            <Eye size={18} />
          </button>
        </div>
        {form.formState.errors.password ? (
          <p className="text-sm text-red-300">{form.formState.errors.password.message}</p>
        ) : null}
      </div>

      {apiError ? <p className="rounded-2xl border border-red-300/20 bg-red-500/10 p-3 text-sm text-red-200">{apiError.message}</p> : null}

      <Button type="submit" className="w-full" disabled={mutation.isPending}>
        {mutation.isPending ? <Loader2 className="animate-spin" size={18} /> : <LogIn size={18} />}
        Sign in
      </Button>
    </form>
  );
}
