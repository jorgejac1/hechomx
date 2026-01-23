/**
 * @fileoverview Seller Reviews API endpoint
 * Retrieves review data for sellers including customer feedback, ratings, and comments.
 * @module app/api/seller/reviews/route
 */

import { NextResponse } from 'next/server';
import reviewsData from '@/lib/data/seller-reviews.json';

/**
 * @interface ReviewsResponse
 * @property {boolean} success - Indicates if the request was successful
 * @property {object} data - The reviews data object
 */

/**
 * Retrieves all seller reviews
 * @param {void} - No parameters required
 * @returns {Promise<NextResponse>} JSON response containing seller reviews data
 * @returns {boolean} response.success - Success status of the request
 * @returns {object} response.data - Reviews data from the data source
 */
export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: reviewsData,
    });
  } catch (error) {
    console.error('[api/seller/reviews] Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch seller reviews' },
      { status: 500 }
    );
  }
}
