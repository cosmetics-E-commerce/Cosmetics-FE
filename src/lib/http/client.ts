import { authSessionSchema, type AuthSession } from '@cosmetics/contracts';
import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
} from 'axios';

import { authTokenStorage } from '@/lib/auth/token-storage';
import { createSingleFlight } from '@/lib/http/single-flight';

type ApiEnvelope<T> = {
  success: boolean;
  data: T;
  meta?: unknown;
};

export type ApiErrorBody = {
  statusCode: number;
  code: string;
  message: string;
  details?: unknown;
  path?: string;
  timestamp?: string;
};

type AuthRequestConfig = AxiosRequestConfig & {
  skipRefresh?: boolean;
};

type RetryableRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
  skipRefresh?: boolean;
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3000/api/v1';

export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept-Language': 'ar',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = authTokenStorage.getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

const runRefresh = createSingleFlight(async (): Promise<AuthSession> => {
  const csrfToken = authTokenStorage.getCsrfToken();
  if (!csrfToken) throw new Error('No refreshable session is available.');

  const response = await axios.post<ApiEnvelope<unknown>>(
    `${API_BASE_URL}/auth/refresh`,
    {},
    {
      timeout: 15000,
      withCredentials: true,
      headers: { 'X-CSRF-Token': csrfToken },
    },
  );
  const session = authSessionSchema.parse(response.data.data);
  authTokenStorage.setSession(session);
  return session;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ApiErrorBody>) => {
    const originalRequest = error.config as RetryableRequestConfig | undefined;
    const canRefresh = Boolean(
      originalRequest &&
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.skipRefresh &&
      authTokenStorage.getCsrfToken(),
    );

    if (!canRefresh || !originalRequest) {
      return Promise.reject(normalizeApiError(error));
    }

    originalRequest._retry = true;
    try {
      await runRefresh();
      return apiClient(originalRequest);
    } catch {
      authTokenStorage.clear();
      return Promise.reject(normalizeApiError(error));
    }
  },
);

export async function request<T>(config: AuthRequestConfig): Promise<T> {
  const response = await apiClient.request<ApiEnvelope<T>>(config);
  return response.data.data;
}

export async function bootstrapAuthSession(): Promise<AuthSession> {
  try {
    return await runRefresh();
  } catch (error) {
    authTokenStorage.clear();
    if (axios.isAxiosError<ApiErrorBody>(error)) throw normalizeApiError(error);
    throw error;
  }
}

export function createAbortController() {
  return new AbortController();
}

function normalizeApiError(error: AxiosError<ApiErrorBody>): ApiErrorBody {
  return {
    statusCode: error.response?.status ?? 0,
    code: error.response?.data?.code ?? error.code ?? 'NETWORK_ERROR',
    message: error.response?.data?.message ?? error.message ?? 'Something went wrong.',
    details: error.response?.data?.details,
    path: error.response?.data?.path,
    timestamp: error.response?.data?.timestamp,
  };
}
