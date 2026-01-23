/**
 * @fileoverview Seller Analytics API endpoint
 * Retrieves analytics data for sellers including sales metrics, performance statistics, and trends.
 * Requires email parameter to identify the seller.
 * @module app/api/seller/analytics/route
 */

import { NextResponse } from 'next/server';
import analyticsData from '@/lib/data/seller-analytics.json';

/**
 * @interface AnalyticsResponse
 * @property {boolean} success - Indicates if the request was successful
 * @property {object} data - The analytics data object
 * @property {string} [error] - Error message if request fails
 */

/**
 * Retrieves analytics data for a specific seller
 * @param {Request} request - The incoming HTTP request object
 * @param {string} request.url - URL containing email query parameter
 * @returns {Promise<NextResponse>} JSON response containing seller analytics data
 * @returns {boolean} response.success - Success status of the request
 * @returns {object} response.data - Analytics data for the specified seller
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

    const userAnalytics = analyticsData[email as keyof typeof analyticsData];

    if (!userAnalytics) {
      return NextResponse.json(
        { success: false, error: 'No analytics found for this user' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: userAnalytics,
    });
  } catch (error) {
    console.error('[api/seller/analytics] Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch seller analytics' },
      { status: 500 }
    );
  }
}
