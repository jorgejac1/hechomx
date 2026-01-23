/**
 * @fileoverview Buyer Achievements API endpoint
 * Retrieves buyer achievements with progress data.
 * @module app/api/buyer/achievements/route
 */

import { NextResponse } from 'next/server';
import achievementsData from '@/lib/data/buyer-achievements.json';

/**
 * Retrieves buyer achievements data
 * @returns {Promise<NextResponse>} JSON response containing buyer achievements
 */
export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: achievementsData,
    });
  } catch (error) {
    console.error('[api/buyer/achievements] Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch buyer achievements' },
      { status: 500 }
    );
  }
}
