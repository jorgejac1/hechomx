/**
 * @fileoverview User Favorites API endpoint
 * Retrieves user's favorite products with enriched product data.
 * Requires email parameter to identify the user.
 * @module app/api/favorites/route
 */

import { NextResponse } from 'next/server';
import favoritesData from '@/lib/data/user-favorites.json';
import productsData from '@/lib/data/products.json';

/**
 * @interface FavoritesResponse
 * @property {boolean} success - Indicates if the request was successful
 * @property {Array<object>} data - Array of favorite products with enriched data
 * @property {string} [error] - Error message if request fails
 */

/**
 * @interface EnrichedFavorite
 * @property {string} id - Product ID
 * @property {string} addedAt - Timestamp when the product was added to favorites
 * @property {string} [notes] - Optional user notes about the favorite
 */

/**
 * Retrieves all favorite products for a specific user with enriched product details
 * @param {Request} request - The incoming HTTP request object
 * @param {string} request.url - URL containing email query parameter
 * @returns {Promise<NextResponse>} JSON response containing enriched favorites data
 * @returns {boolean} response.success - Success status of the request
 * @returns {Array<object>} response.data - Array of favorite products with full product details
 * @returns {string} [response.error] - Error message if email is missing
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email parameter is required' },
        { status: 400 }
      );
    }

    const userFavorites = favoritesData[email as keyof typeof favoritesData] || [];

    // Enrich favorites with full product data
    const enrichedFavorites = userFavorites
      .map((fav) => {
        const product = productsData.find((p) => p.id === fav.id);
        if (!product) return null;
        return {
          ...product,
          addedAt: fav.addedAt,
          notes: fav.notes,
        };
      })
      .filter(Boolean);

    return NextResponse.json({
      success: true,
      data: enrichedFavorites,
    });
  } catch (error) {
    console.error('[api/favorites] Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch favorites' },
      { status: 500 }
    );
  }
}
