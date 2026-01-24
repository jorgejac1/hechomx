/**
 * @fileoverview User favorites API client functions.
 * Provides async functions for fetching user's favorite/wishlisted
 * products with metadata like notes and added date.
 * @module lib/api/favorites
 */

import type { Product } from '@/types';
import { api, isSuccess } from '@/lib/utils/api-client';

export interface FavoriteProduct extends Product {
  addedAt: string;
  notes: string;
}

/**
 * Fetch user's favorite products
 * @param userEmail - The user's email address
 * @returns Array of favorite products or empty array on error
 */
export async function getUserFavorites(userEmail: string): Promise<FavoriteProduct[]> {
  const result = await api.get<FavoriteProduct[]>(
    `/api/favorites?email=${encodeURIComponent(userEmail)}`,
    {
      context: 'favorites/getUserFavorites',
      errorKey: 'FAVORITES_LOAD_FAILED',
    }
  );

  if (isSuccess(result)) {
    return result.data;
  }

  // Return empty array as fallback (graceful degradation)
  return [];
}

/**
 * Get user favorites with error information
 * Use this when you need to show error state in UI
 */
export async function getUserFavoritesWithError(userEmail: string) {
  return api.get<FavoriteProduct[]>(`/api/favorites?email=${encodeURIComponent(userEmail)}`, {
    context: 'favorites/getUserFavoritesWithError',
    errorKey: 'FAVORITES_LOAD_FAILED',
  });
}
