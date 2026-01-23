/**
 * @fileoverview Buyer Impact API endpoint
 * Retrieves impact metrics showing how buyer purchases support artisans and communities.
 * Provides statistics on social and economic impact of fair trade purchases.
 * @module app/api/buyer/impact/route
 */

import { NextResponse } from 'next/server';
import impactData from '@/lib/data/buyer-impact.json';

/**
 * @interface BuyerImpactResponse
 * @property {boolean} success - Indicates if the request was successful
 * @property {object} data - The buyer impact data object
 * @property {string} [error] - Error message if request fails
 */

/**
 * Retrieves buyer impact metrics and statistics
 * @param {void} - No parameters required
 * @returns {Promise<NextResponse>} JSON response containing buyer impact data
 * @returns {boolean} response.success - Success status of the request
 * @returns {object} response.data - Impact metrics and statistics
 */
export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: impactData,
    });
  } catch (error) {
    console.error('[api/buyer/impact] Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch buyer impact' },
      { status: 500 }
    );
  }
}
