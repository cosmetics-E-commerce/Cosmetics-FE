import { AuthShell } from '@/features/auth/components/auth-shell';
import { PasswordRecoveryForm } from '@/features/auth/components/password-recovery-form';

export default function ForgotPasswordPage() {
  return (
    <AuthShell
      title="Reset your password"
      subtitle="Choose email or SMS, verify the six-digit code, then create a new password."
      switchHref="/auth/login"
      switchLabel="Return to sign in"
    >
      <PasswordRecoveryForm />
    </AuthShell>
  );
}
