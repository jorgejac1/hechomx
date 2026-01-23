/**
 * @fileoverview localStorage state persistence hook
 * Provides useState-like API with automatic localStorage synchronization and SSR support
 * @module hooks/common/useLocalStorage
 */

import { useState } from 'react';

/**
 * Persistent state in localStorage with SSR support
 *
 * @param key - localStorage key
 * @param initialValue - Initial value if key doesn't exist
 * @returns [value, setValue] - Tuple like useState
 *
 * @example
 * const [theme, setTheme] = useLocalStorage('theme', 'light');
 * const [cart, setCart] = useLocalStorage<Product[]>('cart', []);
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
  // State to store our value
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`[useLocalStorage] Failed to read key "${key}" - data corrupted:`, error);
      // Attempt to clean up corrupted data
      try {
        window.localStorage.removeItem(key);
      } catch {
        // Ignore cleanup errors
      }
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that persists to localStorage
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;

      setStoredValue(valueToStore);

      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      // Check for quota exceeded error
      const isQuotaError =
        error instanceof DOMException && (error.code === 22 || error.name === 'QuotaExceededError');
      console.error(
        `[useLocalStorage] Failed to save key "${key}"${isQuotaError ? ' - storage quota exceeded' : ''}:`,
        error
      );
      // State is still updated even if persistence fails
    }
  };

  return [storedValue, setValue];
}
