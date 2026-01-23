/**
 * @fileoverview Centralized error handling utilities.
 * Provides consistent error message formatting and logging for the application.
 * @module lib/utils/error-handling
 */

/**
 * Standard API error response type
 */
export interface ApiErrorResponse {
  success: false;
  error: string;
  code?: string;
  details?: Record<string, unknown>;
}

/**
 * Standard API success response type
 */
export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
}

/**
 * Union type for API responses
 */
export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

/**
 * Error messages in Spanish for user-facing errors
 */
export const ERROR_MESSAGES = {
  // Network errors
  NETWORK_ERROR: 'Error de conexión. Por favor, verifica tu conexión a internet.',
  SERVER_ERROR: 'Error del servidor. Por favor, intenta de nuevo más tarde.',
  TIMEOUT: 'La solicitud tardó demasiado. Por favor, intenta de nuevo.',

  // Auth errors
  SESSION_EXPIRED: 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.',
  INVALID_CREDENTIALS: 'Credenciales inválidas. Por favor, verifica tus datos.',
  SESSION_LOAD_FAILED: 'No pudimos cargar tu sesión. Por favor, inicia sesión nuevamente.',

  // Data errors
  LOAD_FAILED: 'No pudimos cargar los datos. Por favor, intenta de nuevo.',
  SAVE_FAILED: 'No pudimos guardar los cambios. Por favor, intenta de nuevo.',
  DELETE_FAILED: 'No pudimos eliminar el elemento. Por favor, intenta de nuevo.',

  // Storage errors
  STORAGE_LOAD_FAILED: 'Error al cargar datos guardados.',
  STORAGE_SAVE_FAILED: 'Error al guardar datos localmente.',
  STORAGE_QUOTA_EXCEEDED: 'Almacenamiento local lleno. Libera espacio e intenta de nuevo.',

  // Cart errors
  CART_LOAD_FAILED: 'No pudimos cargar tu carrito. Tus productos podrían no aparecer.',
  CART_SAVE_FAILED: 'Error al actualizar el carrito.',

  // Comparison errors
  COMPARISON_LOAD_FAILED: 'No pudimos cargar tus productos en comparación.',
  COMPARISON_SAVE_FAILED: 'Error al guardar productos en comparación.',

  // Favorites errors
  FAVORITES_LOAD_FAILED: 'No pudimos cargar tus favoritos.',
  FAVORITES_SAVE_FAILED: 'Error al actualizar favoritos.',

  // Order errors
  ORDERS_LOAD_FAILED: 'No pudimos cargar tus pedidos.',
  ORDER_CREATE_FAILED: 'Error al crear el pedido. Por favor, intenta de nuevo.',

  // Settings errors
  SETTINGS_LOAD_FAILED: 'No pudimos cargar la configuración.',
  SETTINGS_SAVE_FAILED: 'Error al guardar la configuración.',

  // Generic
  UNKNOWN_ERROR: 'Ocurrió un error inesperado. Por favor, intenta de nuevo.',
} as const;

export type ErrorMessageKey = keyof typeof ERROR_MESSAGES;

/**
 * Get error message from error object
 * @param error - The error object
 * @param fallbackKey - Fallback error message key
 * @returns User-friendly error message
 */
export function getErrorMessage(
  error: unknown,
  fallbackKey: ErrorMessageKey = 'UNKNOWN_ERROR'
): string {
  if (error instanceof Error) {
    // Check for specific error types
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      return ERROR_MESSAGES.NETWORK_ERROR;
    }
    if (error.message.includes('timeout')) {
      return ERROR_MESSAGES.TIMEOUT;
    }
    // Return the error message if it looks user-friendly (Spanish)
    if (/^[A-ZÁÉÍÓÚÜÑ]/.test(error.message) && error.message.length < 200) {
      return error.message;
    }
  }

  return ERROR_MESSAGES[fallbackKey];
}

/**
 * Log error with context for debugging
 * @param context - Where the error occurred
 * @param error - The error object
 * @param additionalInfo - Extra debugging info
 */
export function logError(
  context: string,
  error: unknown,
  additionalInfo?: Record<string, unknown>
): void {
  const errorInfo = {
    context,
    timestamp: new Date().toISOString(),
    error:
      error instanceof Error
        ? {
            name: error.name,
            message: error.message,
            stack: error.stack,
          }
        : error,
    ...additionalInfo,
  };

  console.error(`[${context}]`, errorInfo);

  // In production, you could send this to an error tracking service
  // if (process.env.NODE_ENV === 'production') {
  //   sendToErrorTracking(errorInfo);
  // }
}

/**
 * Check if error is a quota exceeded error (localStorage full)
 */
export function isQuotaExceededError(error: unknown): boolean {
  return (
    error instanceof DOMException &&
    (error.code === 22 || // Legacy quota exceeded code
      error.code === 1014 || // Firefox
      error.name === 'QuotaExceededError' ||
      error.name === 'NS_ERROR_DOM_QUOTA_REACHED')
  );
}

/**
 * Create a typed API error response
 */
export function createErrorResponse(
  error: string,
  code?: string,
  details?: Record<string, unknown>
): ApiErrorResponse {
  return {
    success: false,
    error,
    code,
    details,
  };
}

/**
 * Create a typed API success response
 */
export function createSuccessResponse<T>(data: T): ApiSuccessResponse<T> {
  return {
    success: true,
    data,
  };
}
