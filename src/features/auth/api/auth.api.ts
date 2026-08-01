import type {
  AuthSession,
  AuthUser,
  LoginInput,
  LogoutInput,
  RegistrationOtpChallenge,
  RegisterInput,
  SendOtpInput,
  VerifyOtpInput,
} from '@contracts/auth/auth.schema';

import { request } from '@/lib/http/client';

export function login(input: LoginInput) {
  return request<AuthSession>({
    method: 'POST',
    url: '/auth/login',
    data: input,
  });
}

export function register(input: RegisterInput) {
  return request<RegistrationOtpChallenge>({
    method: 'POST',
    url: '/auth/register',
    data: input,
  });
}

export function verifyOtp(input: VerifyOtpInput) {
  return request<{ verified: true }>({
    method: 'POST',
    url: '/auth/otp/verify',
    data: input,
  });
}

export function resendOtp(input: SendOtpInput) {
  return request<{ ttlSeconds: number }>({
    method: 'POST',
    url: '/auth/otp/resend',
    data: input,
  });
}

export function getCurrentAuthUser() {
  return request<AuthUser>({
    method: 'GET',
    url: '/auth/me',
  });
}

export function logout(input: LogoutInput) {
  return request<{ revoked: boolean }>({
    method: 'POST',
    url: '/auth/logout',
    data: input,
  });
}
