/**
 * @fileoverview Centralized API client with consistent error handling.
 * Provides typed fetch wrapper with automatic error handling, retries, and toast notifications.
 * @module lib/utils/api-client
 */

import {
  ApiResponse,
  ApiErrorResponse,
  ERROR_MESSAGES,
  ErrorMessageKey,
  logError,
  getErrorMessage,
} from './error-handling';

/**
 * Configuration options for API requests
 */
interface ApiClientOptions {
  /** Base URL for API requests (defaults to '') */
  baseUrl?: string;
  /** Default timeout in milliseconds (defaults to 10000) */
  timeout?: number;
  /** Number of retry attempts for failed requests (defaults to 0) */
  retries?: number;
  /** Delay between retries in milliseconds (defaults to 1000) */
  retryDelay?: number;
  /** Whether to show toast notifications on errors (defaults to false) */
  showToast?: boolean;
  /** Custom headers to include in all requests */
  headers?: Record<string, string>;
}

/**
 * Options for individual fetch requests
 */
interface FetchOptions extends Omit<RequestInit, 'body' | 'headers'> {
  /** Request body (will be JSON stringified if object) */
  body?: unknown;
  /** Override default timeout for this request */
  timeout?: number;
  /** Override default retries for this request */
  retries?: number;
  /** Context for error logging */
  context?: string;
  /** Fallback error message key */
  errorKey?: ErrorMessageKey;
  /** Whether to show toast on error for this request */
  showToast?: boolean;
  /** Custom headers for this request */
  headers?: Record<string, string>;
}

/**
 * Result type for API client methods
 */
type ApiResult<T> = { success: true; data: T } | { success: false; error: string; code?: string };

/**
 * Create an API client instance with consistent error handling
 */
export function createApiClient(options: ApiClientOptions = {}) {
  const {
    baseUrl = '',
    timeout = 10000,
    retries = 0,
    retryDelay = 1000,
    showToast = false,
    headers: defaultHeaders = {},
  } = options;

  /**
   * Sleep utility for retry delays
   */
  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  /**
   * Fetch with timeout support
   */
  async function fetchWithTimeout(
    url: string,
    init: RequestInit,
    timeoutMs: number
  ): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(url, {
        ...init,
        signal: controller.signal,
      });
      return response;
    } finally {
      clearTimeout(timeoutId);
    }
  }

  /**
   * Core fetch method with error handling and retries
   */
  async function apiFetch<T>(
    endpoint: string,
    fetchOptions: FetchOptions = {}
  ): Promise<ApiResult<T>> {
    const {
      body,
      timeout: requestTimeout = timeout,
      retries: requestRetries = retries,
      context = endpoint,
      errorKey = 'UNKNOWN_ERROR',
      showToast: requestShowToast = showToast,
      headers: requestHeaders = {},
      ...restOptions
    } = fetchOptions;

    const url = `${baseUrl}${endpoint}`;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...defaultHeaders,
      ...requestHeaders,
    };

    const init: RequestInit = {
      ...restOptions,
      headers,
    };

    if (body !== undefined) {
      init.body = typeof body === 'string' ? body : JSON.stringify(body);
    }

    let lastError: Error | null = null;
    let attempt = 0;

    while (attempt <= requestRetries) {
      try {
        const response = await fetchWithTimeout(url, init, requestTimeout);

        // Handle HTTP errors
        if (!response.ok) {
          // Try to parse error response
          let errorData: ApiErrorResponse | null = null;
          try {
            errorData = await response.json();
          } catch {
            // Response is not JSON
          }

          const errorMessage = errorData?.error || getHttpErrorMessage(response.status);

          logError(context, new Error(errorMessage), {
            status: response.status,
            url,
          });

          return {
            success: false,
            error: errorMessage,
            code: errorData?.code || `HTTP_${response.status}`,
          };
        }

        // Parse successful response
        const data = await response.json();

        // Check for API-level errors (success: false in body)
        if (data && typeof data === 'object' && 'success' in data) {
          const apiResponse = data as ApiResponse<T>;
          if (!apiResponse.success) {
            return {
              success: false,
              error: apiResponse.error,
              code: (apiResponse as ApiErrorResponse).code,
            };
          }
          return { success: true, data: apiResponse.data };
        }

        // Direct data response (no success wrapper)
        return { success: true, data: data as T };
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));

        // Don't retry on abort (timeout)
        if (lastError.name === 'AbortError') {
          logError(context, lastError, { url, attempt });
          return {
            success: false,
            error: ERROR_MESSAGES.TIMEOUT,
            code: 'TIMEOUT',
          };
        }

        // Network errors - retry if attempts remaining
        if (attempt < requestRetries) {
          attempt++;
          await sleep(retryDelay * attempt); // Exponential backoff
          continue;
        }

        // All retries exhausted
        const userMessage = getErrorMessage(lastError, errorKey);
        logError(context, lastError, { url, attempt });

        // Optionally show toast (requires ToastContext to be available)
        if (requestShowToast && typeof window !== 'undefined') {
          // Toast will be triggered by the component using the result
        }

        return {
          success: false,
          error: userMessage,
          code: 'NETWORK_ERROR',
        };
      }
    }

    // Should never reach here, but TypeScript needs it
    return {
      success: false,
      error: ERROR_MESSAGES.UNKNOWN_ERROR,
      code: 'UNKNOWN',
    };
  }

  /**
   * GET request helper
   */
  function get<T>(endpoint: string, options?: Omit<FetchOptions, 'method' | 'body'>) {
    return apiFetch<T>(endpoint, { ...options, method: 'GET' });
  }

  /**
   * POST request helper
   */
  function post<T>(endpoint: string, body?: unknown, options?: Omit<FetchOptions, 'method'>) {
    return apiFetch<T>(endpoint, { ...options, method: 'POST', body });
  }

  /**
   * PUT request helper
   */
  function put<T>(endpoint: string, body?: unknown, options?: Omit<FetchOptions, 'method'>) {
    return apiFetch<T>(endpoint, { ...options, method: 'PUT', body });
  }

  /**
   * PATCH request helper
   */
  function patch<T>(endpoint: string, body?: unknown, options?: Omit<FetchOptions, 'method'>) {
    return apiFetch<T>(endpoint, { ...options, method: 'PATCH', body });
  }

  /**
   * DELETE request helper
   */
  function del<T>(endpoint: string, options?: Omit<FetchOptions, 'method' | 'body'>) {
    return apiFetch<T>(endpoint, { ...options, method: 'DELETE' });
  }

  return {
    fetch: apiFetch,
    get,
    post,
    put,
    patch,
    delete: del,
  };
}

/**
 * Get user-friendly error message for HTTP status codes
 */
function getHttpErrorMessage(status: number): string {
  switch (status) {
    case 400:
      return 'Solicitud inválida. Por favor, verifica los datos enviados.';
    case 401:
      return ERROR_MESSAGES.SESSION_EXPIRED;
    case 403:
      return 'No tienes permisos para realizar esta acción.';
    case 404:
      return 'El recurso solicitado no fue encontrado.';
    case 409:
      return 'Conflicto con el estado actual. Por favor, recarga e intenta de nuevo.';
    case 422:
      return 'Los datos enviados no son válidos.';
    case 429:
      return 'Demasiadas solicitudes. Por favor, espera un momento.';
    case 500:
    case 502:
    case 503:
    case 504:
      return ERROR_MESSAGES.SERVER_ERROR;
    default:
      return ERROR_MESSAGES.UNKNOWN_ERROR;
  }
}

/**
 * Default API client instance for internal API calls
 */
export const api = createApiClient({
  baseUrl: '',
  timeout: 10000,
  retries: 1,
  retryDelay: 1000,
});

/**
 * Type guard to check if result is successful
 */
export function isSuccess<T>(result: ApiResult<T>): result is { success: true; data: T } {
  return result.success === true;
}

/**
 * Type guard to check if result is an error
 */
export function isError<T>(
  result: ApiResult<T>
): result is { success: false; error: string; code?: string } {
  return result.success === false;
}
