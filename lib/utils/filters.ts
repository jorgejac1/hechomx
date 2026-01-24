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

/**
 * Filter state shape for URL building
 */
interface FilterState {
  categories: string[];
  states: string[];
  materials: string[];
  priceRange: { min: number; max: number };
  minRating: number;
  inStock: boolean | null;
  verified: boolean | null;
  featured: boolean | null;
  sortBy: string;
  searchQuery?: string;
}

/**
 * Builds URL search params from filter state
 * @param filters - Current filter state
 * @param defaultPriceMax - Default max price from product range
 * @param existingParams - Existing URL search params to preserve
 * @returns URLSearchParams with filter values
 */
export const buildFilterParams = (
  filters: FilterState,
  defaultPriceMax: number,
  existingParams?: URLSearchParams
): URLSearchParams => {
  const params = new URLSearchParams();

  // Preserve existing query and subcategory params
  if (existingParams) {
    const query = existingParams.get(FILTER_PARAM_NAMES.QUERY);
    const subcategory = existingParams.get(FILTER_PARAM_NAMES.SUBCATEGORY);
    const subsubcategory = existingParams.get(FILTER_PARAM_NAMES.SUBSUBCATEGORY);

    if (query) params.set(FILTER_PARAM_NAMES.QUERY, query);
    if (subcategory) params.set(FILTER_PARAM_NAMES.SUBCATEGORY, subcategory);
    if (subsubcategory) params.set(FILTER_PARAM_NAMES.SUBSUBCATEGORY, subsubcategory);
  }

  // Categories (single-select in this app, but supporting the array)
  if (filters.categories.length > 0) {
    params.set(FILTER_PARAM_NAMES.CATEGORY, filters.categories[0]);
  }

  // States (single value for URL)
  if (filters.states.length > 0) {
    params.set(FILTER_PARAM_NAMES.STATE, filters.states[0]);
  }

  // Materials (multi-select, use multiple params)
  filters.materials.forEach((material) => {
    params.append(FILTER_PARAM_NAMES.MATERIAL, material);
  });

  // Price range (only if below max)
  if (filters.priceRange.max < defaultPriceMax) {
    params.set(FILTER_PARAM_NAMES.PRICE, String(filters.priceRange.max));
  }

  // Sort (only if not default)
  if (filters.sortBy !== 'relevance') {
    params.set(FILTER_PARAM_NAMES.SORT, filters.sortBy);
  }

  // Boolean filters
  if (filters.inStock === true) {
    params.set(FILTER_PARAM_NAMES.IN_STOCK, 'si');
  }
  if (filters.verified === true) {
    params.set(FILTER_PARAM_NAMES.VERIFIED, 'si');
  }
  if (filters.featured === true) {
    params.set(FILTER_PARAM_NAMES.FEATURED, 'si');
  }

  return params;
};
