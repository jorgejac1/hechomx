/**
 * @fileoverview Shops API endpoint
 * Retrieves all seller shops for the marketplace directory.
 * @module app/api/shops/route
 */

import { NextResponse } from 'next/server';
import { MOCK_SELLER_USERS } from '@/lib/data/mockUsers';
import { CACHE_HEADERS } from '@/lib/utils/cache';

/**
 * Retrieves all available shops
 * @returns {Promise<NextResponse>} JSON response containing shops data
 */
export async function GET() {
  try {
    const shops = Object.values(MOCK_SELLER_USERS)
      .filter((user) => user.makerProfile)
      .map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        makerProfile: user.makerProfile
          ? {
              shopName: user.makerProfile.shopName,
              sellerType: user.makerProfile.sellerType,
              location: user.makerProfile.location,
              description: user.makerProfile.description,
              verified: user.makerProfile.verified,
              verificationBadge: user.makerProfile.verificationBadge,
              stats: user.makerProfile.stats,
              certifications: user.makerProfile.certifications,
              specialties: user.makerProfile.specialties,
            }
          : undefined,
      }));

    return NextResponse.json(
      {
        success: true,
        data: shops,
      },
      { headers: CACHE_HEADERS.PUBLIC_LISTINGS }
    );
  } catch (error) {
    console.error('[api/shops] Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch shops' }, { status: 500 });
  }
}
