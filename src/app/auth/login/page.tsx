import { Suspense } from 'react';

import { AuthShell } from '@/features/auth/components/auth-shell';
import { LoginForm } from '@/features/auth/components/login-form';

export default function LoginPage() {
  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in with the same phone or email stored by the production API."
      switchHref="/auth/register"
      switchLabel="Create a client account"
    >
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </AuthShell>
  );
}
