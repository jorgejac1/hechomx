/**
 * @fileoverview Filter URL and parameter utility functions.
 * Provides functions for building product URLs with filter parameters,
 * mapping filter types to URL parameters, and managing filter state.
 * @module lib/utils/filters
 */

import { FILTER_PARAM_NAMES } from '@/lib/constants/filters';

/**
 * Builds a products URL with the given parameters
 */
export const buildProductsUrl = (
  params: Record<string, string | undefined>,
  baseUrl: string = '/productos'
): string => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.set(key, value);
    }
  });

  // Remove page param when filters change
  searchParams.delete(FILTER_PARAM_NAMES.PAGE);

  const queryString = searchParams.toString();
  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
};

/**
 * Maps filter type to URL parameter name
 */
export const getFilterParamFromType = (
  filterType: 'featured' | 'verified' | 'inStock' | 'price'
): string => {
  const map = {
    featured: FILTER_PARAM_NAMES.FEATURED,
    verified: FILTER_PARAM_NAMES.VERIFIED,
    inStock: FILTER_PARAM_NAMES.IN_STOCK,
    price: FILTER_PARAM_NAMES.PRICE,
  };
  return map[filterType];
};

/**
 * Removes a filter parameter from URLSearchParams
 */
export const removeFilterParam = (
  searchParams: URLSearchParams,
  filterType: 'featured' | 'verified' | 'inStock' | 'price'
): URLSearchParams => {
  const params = new URLSearchParams(searchParams.toString());
  const paramName = getFilterParamFromType(filterType);
  params.delete(paramName);
  return params;
};
