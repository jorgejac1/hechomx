/**
 * Custom hook for managing URL state
 */

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export const useUrlState = (baseUrl: string = '/productos') => {
  const router = useRouter();
  const searchParams = useSearchParams();

  /**
   * Updates URL parameters
   */
  const setUrlParams = useCallback(
    (
      params: Record<string, string | number | boolean | undefined | null>,
      options: { scroll?: boolean } = { scroll: false }
    ) => {
      const urlParams = new URLSearchParams(searchParams?.toString() || '');

      Object.entries(params).forEach(([key, value]) => {
        if (value === undefined || value === null || value === '') {
          urlParams.delete(key);
        } else {
          urlParams.set(key, String(value));
        }
      });

      const queryString = urlParams.toString();
      const newUrl = queryString ? `${baseUrl}?${queryString}` : baseUrl;

      router.push(newUrl, options);
    },
    [router, searchParams, baseUrl]
  );

  /**
   * Gets a single URL parameter
   */
  const getUrlParam = useCallback(
    (key: string): string | null => {
      return searchParams?.get(key) || null;
    },
    [searchParams]
  );

  /**
   * Removes specific URL parameters
   */
  const removeUrlParams = useCallback(
    (keys: string[], options: { scroll?: boolean } = { scroll: false }) => {
      const urlParams = new URLSearchParams(searchParams?.toString() || '');

      keys.forEach((key) => {
        urlParams.delete(key);
      });

      const queryString = urlParams.toString();
      const newUrl = queryString ? `${baseUrl}?${queryString}` : baseUrl;

      router.push(newUrl, options);
    },
    [router, searchParams, baseUrl]
  );

  /**
   * Clears all URL parameters
   */
  const clearUrlParams = useCallback(
    (options: { scroll?: boolean } = { scroll: false }) => {
      router.push(baseUrl, options);
    },
    [router, baseUrl]
  );

  return {
    searchParams: searchParams || new URLSearchParams(),
    setUrlParams,
    getUrlParam,
    removeUrlParams,
    clearUrlParams,
  };
};
