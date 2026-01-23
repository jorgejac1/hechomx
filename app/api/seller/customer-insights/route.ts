/**
 * @fileoverview Seller Customer Insights API endpoint
 * Retrieves customer insights data for sellers including customer behavior, preferences, and engagement metrics.
 * Requires email parameter to identify the seller.
 * @module app/api/seller/customer-insights/route
 */

import { NextResponse } from 'next/server';
import customerInsightsData from '@/lib/data/customer-insights.json';

/**
 * @interface CustomerInsightsResponse
 * @property {boolean} success - Indicates if the request was successful
 * @property {object} data - The customer insights data object
 * @property {string} [error] - Error message if request fails
 */

/**
 * Retrieves customer insights data for a specific seller
 * @param {Request} request - The incoming HTTP request object
 * @param {string} request.url - URL containing email query parameter
 * @returns {Promise<NextResponse>} JSON response containing customer insights data
 * @returns {boolean} response.success - Success status of the request
 * @returns {object} response.data - Customer insights data for the specified seller
 * @returns {string} [response.error] - Error message if email is missing or not found
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

    const userInsights = customerInsightsData[email as keyof typeof customerInsightsData];

    if (!userInsights) {
      return NextResponse.json(
        { success: false, error: 'No insights found for this user' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: userInsights,
    });
  } catch (error) {
    console.error('[api/seller/customer-insights] Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch customer insights' },
      { status: 500 }
    );
  }
}
