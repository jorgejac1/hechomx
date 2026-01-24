/**
 * @fileoverview Artisan Stories API endpoint
 * Retrieves stories and profiles of artisans, showcasing their craft traditions,
 * backgrounds, and cultural heritage.
 * @module app/api/artisan-stories/route
 */

import { NextResponse } from 'next/server';
import artisanStoriesData from '@/lib/data/artisan-stories.json';
import { CACHE_HEADERS } from '@/lib/utils/cache';

/**
 * @interface ArtisanStoriesResponse
 * @property {Array<object>} stories - Array of artisan story objects
 * @property {string} [error] - Error message if request fails
 */

/**
 * Retrieves all artisan stories and profiles
 * @param {void} - No parameters required
 * @returns {Promise<NextResponse>} JSON response containing artisan stories data
 */
export async function GET() {
  try {
    return NextResponse.json(artisanStoriesData, {
      headers: CACHE_HEADERS.PUBLIC_LISTINGS,
    });
  } catch (error) {
    console.error('[api/artisan-stories] Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch artisan stories' },
      { status: 500 }
    );
  }
}
