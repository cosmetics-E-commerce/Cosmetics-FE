import type {
  AuthSession,
  AuthUser,
  CompletePasswordChangeInput,
  ForgotPasswordInput,
  LoginInput,
  RegisterInput,
  RequestPasswordChangeInput,
  ResetPasswordInput,
  SendOtpInput,
  VerifyOtpInput,
  VerifyPasswordChangeOtpInput,
  VerifyPasswordResetOtpInput,
} from '@cosmetics/contracts';

import { request } from '@/lib/http/client';
import { authTokenStorage } from '@/lib/auth/token-storage';

export function login(input: LoginInput) {
  return request<AuthSession>({
    method: 'POST',
    url: '/auth/login',
    data: input,
    skipRefresh: true,
  });
}

export function register(input: RegisterInput) {
  return request<AuthSession>({
    method: 'POST',
    url: '/auth/register',
    data: input,
    skipRefresh: true,
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

export function logout() {
  return request<{ success: true }>({
    method: 'POST',
    url: '/auth/logout',
    data: {},
    headers: { 'X-CSRF-Token': authTokenStorage.getCsrfToken() ?? '' },
    skipRefresh: true,
  });
}

export function forgotPassword(input: ForgotPasswordInput) {
  return request<{ ttlSeconds: number }>({
    method: 'POST',
    url: '/auth/password/forgot',
    data: input,
    skipRefresh: true,
  });
}

export function verifyPasswordResetOtp(input: VerifyPasswordResetOtpInput) {
  return request<{ token: string; expiresIn: number }>({
    method: 'POST',
    url: '/auth/password/verify-otp',
    data: input,
    skipRefresh: true,
  });
}

export function resetPassword(input: ResetPasswordInput) {
  return request<{ reset: true }>({
    method: 'POST',
    url: '/auth/password/reset',
    data: input,
    skipRefresh: true,
  });
}

export function requestPasswordChange(input: RequestPasswordChangeInput) {
  return request<{ ttlSeconds: number; destination: string }>({
    method: 'POST',
    url: '/auth/password/change/request',
    data: input,
  });
}

export function verifyPasswordChangeOtp(input: VerifyPasswordChangeOtpInput) {
  return request<{ token: string; expiresIn: number }>({
    method: 'POST',
    url: '/auth/password/change/verify-otp',
    data: input,
  });
}

export function completePasswordChange(input: CompletePasswordChangeInput) {
  return request<{ changed: true }>({
    method: 'POST',
    url: '/auth/password/change/complete',
    data: input,
    skipRefresh: true,
  });
}
