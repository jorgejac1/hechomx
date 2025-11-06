/**
 * Validation utility functions
 */

import { ZodError, ZodSchema, ZodIssue } from 'zod';

export interface ValidationResult<T> {
  success: boolean;
  data?: T;
  errors?: Record<string, string>;
}

/**
 * Validate data against a Zod schema
 */
export function validate<T>(schema: ZodSchema<T>, data: unknown): ValidationResult<T> {
  try {
    const validData = schema.parse(data);
    return {
      success: true,
      data: validData,
    };
  } catch (error) {
    if (error instanceof ZodError) {
      const errors: Record<string, string> = {};
      error.issues.forEach((issue: ZodIssue) => {
        const path = issue.path.join('.');
        errors[path] = issue.message;
      });
      return {
        success: false,
        errors,
      };
    }
    return {
      success: false,
      errors: { _form: 'Error de validación desconocido' },
    };
  }
}

/**
 * Validate data and throw on error
 */
export function validateOrThrow<T>(schema: ZodSchema<T>, data: unknown): T {
  return schema.parse(data);
}

/**
 * Safe parse (returns result without throwing)
 */
export function safeParse<T>(schema: ZodSchema<T>, data: unknown): ValidationResult<T> {
  const result = schema.safeParse(data);
  if (result.success) {
    return {
      success: true,
      data: result.data,
    };
  }
  const errors: Record<string, string> = {};
  result.error.issues.forEach((issue: ZodIssue) => {
    const path = issue.path.join('.');
    errors[path] = issue.message;
  });
  return {
    success: false,
    errors,
  };
}

/**
 * Format Zod errors for display
 */
export function formatZodErrors(error: ZodError): Record<string, string> {
  const errors: Record<string, string> = {};
  error.issues.forEach((issue: ZodIssue) => {
    const path = issue.path.join('.');
    errors[path] = issue.message;
  });
  return errors;
}

/**
 * Get first error message
 */
export function getFirstError(errors: Record<string, string>): string | null {
  const keys = Object.keys(errors);
  return keys.length > 0 ? errors[keys[0]] : null;
}

/**
 * Check if validation result has errors
 */
export function hasErrors(result: ValidationResult<unknown>): boolean {
  return !result.success && !!result.errors && Object.keys(result.errors).length > 0;
}

/**
 * Get all error messages as array
 */
export function getErrorMessages(errors: Record<string, string>): string[] {
  return Object.values(errors);
}

/**
 * Merge multiple validation results
 */
export function mergeValidationResults<T>(results: ValidationResult<T>[]): ValidationResult<T[]> {
  const allErrors: Record<string, string> = {};
  const allData: T[] = [];

  results.forEach((result, index) => {
    if (!result.success && result.errors) {
      Object.entries(result.errors).forEach(([key, value]) => {
        allErrors[`${index}.${key}`] = value;
      });
    } else if (result.success && result.data) {
      allData.push(result.data);
    }
  });

  if (Object.keys(allErrors).length > 0) {
    return {
      success: false,
      errors: allErrors,
    };
  }

  return {
    success: true,
    data: allData,
  };
}
