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
      console.error('Failed to fetch favorites:', result.error);
      return [];
    }

    return result.data;
  } catch (error) {
    console.error('Error loading favorites:', error);
    return [];
  }
}
