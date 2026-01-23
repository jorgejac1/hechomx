/**
 * @fileoverview User favorites API client functions.
 * Provides async functions for fetching user's favorite/wishlisted
 * products with metadata like notes and added date.
 * @module lib/api/favorites
 */

import type { Product } from '@/types';

export interface FavoriteProduct extends Product {
  addedAt: string;
  notes: string;
}

export async function getUserFavorites(userEmail: string): Promise<FavoriteProduct[]> {
  try {
    const response = await fetch(`/api/favorites?email=${encodeURIComponent(userEmail)}`);
    const result = await response.json();

    if (!result.success) {
      console.error('[favorites] Failed to fetch favorites:', result.error);
      return [];
    }

    return result.data;
  } catch (error) {
    console.error('[favorites] Error loading favorites:', error);
    return [];
  }
}
