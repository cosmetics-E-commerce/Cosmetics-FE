import { Suspense } from 'react';

import { AuthShell } from '@/features/auth/components/auth-shell';
import { RegisterForm } from '@/features/auth/components/register-form';

export default function RegisterPage() {
  return (
    <AuthShell
      title="Create your account"
      subtitle="Create your profile, then verify your email with a 6-digit code."
      switchHref="/auth/login"
      switchLabel="Already have an account?"
    >
      <Suspense fallback={null}>
        <RegisterForm />
      </Suspense>
    </AuthShell>
  );
}
