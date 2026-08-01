import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
} from 'axios';

import { authTokenStorage } from '@/lib/auth/token-storage';

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

type RetryableRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3000/api/v1';

let refreshPromise: Promise<string | null> | null = null;

export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    'Accept-Language': 'en',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = authTokenStorage.getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ApiErrorBody>) => {
    const originalRequest = error.config as RetryableRequestConfig | undefined;

    if (!originalRequest || error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(normalizeApiError(error));
    }

    const refreshToken = authTokenStorage.getRefreshToken();

    if (!refreshToken) {
      authTokenStorage.clear();
      return Promise.reject(normalizeApiError(error));
    }

    originalRequest._retry = true;
    refreshPromise ??= refreshAccessToken(refreshToken).finally(() => {
      refreshPromise = null;
    });

    const nextAccessToken = await refreshPromise;

    if (!nextAccessToken) {
      authTokenStorage.clear();
      return Promise.reject(normalizeApiError(error));
    }

    originalRequest.headers.Authorization = `Bearer ${nextAccessToken}`;
    return apiClient(originalRequest);
  },
);

export async function request<T>(config: AxiosRequestConfig): Promise<T> {
  const response = await apiClient.request<ApiEnvelope<T>>(config);
  return response.data.data;
}

export function createAbortController() {
  return new AbortController();
}

async function refreshAccessToken(refreshToken: string): Promise<string | null> {
  try {
    const response = await axios.post<ApiEnvelope<{ tokens: { accessToken: string; refreshToken: string; expiresIn: number } }>>(
      `${API_BASE_URL}/auth/refresh`,
      { refreshToken },
      { timeout: 15000 },
    );

    authTokenStorage.setTokens(response.data.data.tokens);
    return response.data.data.tokens.accessToken;
  } catch {
    return null;
  }
}

function normalizeApiError(error: AxiosError<ApiErrorBody>) {
  const fallback: ApiErrorBody = {
    statusCode: error.response?.status ?? 0,
    code: error.code ?? 'NETWORK_ERROR',
    message: error.response?.data?.message ?? error.message ?? 'Something went wrong.',
    details: error.response?.data?.details,
    path: error.response?.data?.path,
    timestamp: error.response?.data?.timestamp,
  };

  return fallback;
}
