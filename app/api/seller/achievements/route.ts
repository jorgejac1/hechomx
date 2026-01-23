/**
 * @fileoverview Seller Achievements API endpoint
 * Retrieves seller achievements with progress data.
 * @module app/api/seller/achievements/route
 */

import { NextResponse } from 'next/server';
import achievementsData from '@/lib/data/seller-achievements.json';

/**
 * Retrieves seller achievements data
 * @returns {Promise<NextResponse>} JSON response containing seller achievements
 */
export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: achievementsData,
    });
  } catch (error) {
    console.error('[api/seller/achievements] Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch seller achievements' },
      { status: 500 }
    );
  }
}
