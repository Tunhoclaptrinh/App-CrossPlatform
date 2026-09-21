import { AppConfig } from '@/constants/config';
import { appStorage, STORAGE_KEYS } from '@/services/storage/appStorage';

export interface ApiResponse<T = any> {
  data: T | null;
  error: string | null;
  status: number;
  ok: boolean;
}

export interface RequestOptions extends RequestInit {
  timeout?: number;
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean>;
}

async function request<T = any>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<ApiResponse<T>> {
  const { timeout = AppConfig.TIMEOUT_MS, headers = {}, params, ...rest } = options;

  let url = endpoint.startsWith('http') ? endpoint : `${AppConfig.API_BASE_URL}${endpoint}`;

  if (params) {
    const query = new URLSearchParams(
      Object.entries(params).map(([k, v]) => [k, String(v)])
    ).toString();
    url += (url.includes('?') ? '&' : '?') + query;
  }

  const token = await appStorage.getItem<string>(STORAGE_KEYS.AUTH_TOKEN);

  const defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  if (token) {
    defaultHeaders.Authorization = `Bearer ${token}`;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...rest,
      headers: { ...defaultHeaders, ...headers },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const contentType = response.headers.get('content-type');
    const isJson = contentType && contentType.includes('application/json');
    const responseData = isJson ? await response.json() : await response.text();

    if (!response.ok) {
      return {
        data: null,
        error: (responseData && responseData.message) || response.statusText || 'Request failed',
        status: response.status,
        ok: false,
      };
    }

    return {
      data: responseData as T,
      error: null,
      status: response.status,
      ok: true,
    };
  } catch (err: any) {
    clearTimeout(timeoutId);
    const isAbort = err.name === 'AbortError';
    return {
      data: null,
      error: isAbort ? 'Request timeout' : err.message || 'Network error',
      status: isAbort ? 408 : 0,
      ok: false,
    };
  }
}

export const apiClient = {
  get<T = any>(endpoint: string, options?: RequestOptions) {
    return request<T>(endpoint, { ...options, method: 'GET' });
  },

  post<T = any>(endpoint: string, body?: any, options?: RequestOptions) {
    return request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    });
  },

  put<T = any>(endpoint: string, body?: any, options?: RequestOptions) {
    return request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
    });
  },

  delete<T = any>(endpoint: string, options?: RequestOptions) {
    return request<T>(endpoint, { ...options, method: 'DELETE' });
  },
};