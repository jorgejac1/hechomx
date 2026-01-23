/**
 * @fileoverview Fair Trade Rates API endpoint
 * Retrieves fair trade pricing rates and guidelines for artisan products.
 * Provides pricing information to ensure equitable compensation for artisans.
 * @module app/api/pricing/fair-trade-rates/route
 */

import { NextResponse } from 'next/server';
import ratesData from '@/lib/data/fair-trade-rates.json';

/**
 * @interface FairTradeRatesResponse
 * @property {boolean} success - Indicates if the request was successful
 * @property {object} data - The fair trade rates data object
 * @property {string} [error] - Error message if request fails
 */

/**
 * Retrieves all fair trade rate information
 * @param {void} - No parameters required
 * @returns {Promise<NextResponse>} JSON response containing fair trade rates data
 * @returns {boolean} response.success - Success status of the request
 * @returns {object} response.data - Fair trade rates and pricing guidelines
 */
export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: ratesData,
    });
  } catch (error) {
    console.error('[api/pricing/fair-trade-rates] Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch fair trade rates' },
      { status: 500 }
    );
  }
}
