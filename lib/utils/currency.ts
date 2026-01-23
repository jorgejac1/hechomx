/**
 * @fileoverview Currency formatting utilities for Mexican Peso (MXN).
 * Provides functions for formatting currency values, parsing currency strings,
 * compact notation, and discount calculations with Mexican locale support.
 * @module lib/utils/currency
 */

/**
 * Format a number as currency
 * @param amount - The amount to format
 * @param currency - Currency code (default: MXN)
 * @returns Formatted currency string
 */
export function formatCurrency(amount: number, currency: string = 'MXN'): string {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format currency with decimals
 */
export function formatCurrencyWithDecimals(amount: number, currency: string = 'MXN'): string {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Parse currency string to number
 * @param value - Currency string (e.g., "$1,234.56")
 * @returns Parsed number
 */
export function parseCurrency(value: string): number {
  return parseFloat(value.replace(/[^0-9.-]+/g, ''));
}

/**
 * Format as compact currency (e.g., $1.2K, $3.4M)
 */
export function formatCompactCurrency(amount: number, currency: string = 'MXN'): string {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency,
    notation: 'compact',
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  }).format(amount);
}

/**
 * Calculate discount percentage
 */
export function calculateDiscount(originalPrice: number, discountedPrice: number): number {
  return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
}

/**
 * Format discount percentage
 */
export function formatDiscount(percentage: number): string {
  return `${percentage}% OFF`;
}
