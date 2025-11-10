import { NextResponse } from 'next/server';
import { getAllShops, getShopSlug, getShopBySlug } from '@/lib/utils/shop';
import { MOCK_SELLER_USERS } from '@/lib/data/mockUsers';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const testSlug = searchParams.get('slug');

  const allShops = getAllShops();
  const mockUsers = Object.values(MOCK_SELLER_USERS);

  const debug = {
    totalMockUsers: mockUsers.length,
    mockUserNames: mockUsers.map((u) => u.name),

    shopsWithMakerProfile: allShops.length,
    shopDetails: allShops.map((shop) => ({
      id: shop.id,
      name: shop.name,
      email: shop.email,
      hasMakerProfile: !!shop.makerProfile,
      shopName: shop.makerProfile?.shopName,
      generatedSlug: shop.makerProfile?.shopName ? getShopSlug(shop.makerProfile.shopName) : null,
    })),
  };

  if (testSlug) {
    const foundShop = getShopBySlug(testSlug);
    return NextResponse.json({
      ...debug,
      testSlug,
      normalizedSlug: getShopSlug(testSlug),
      foundShop: foundShop
        ? {
            id: foundShop.id,
            name: foundShop.name,
            shopName: foundShop.makerProfile?.shopName,
          }
        : null,
    });
  }

  return NextResponse.json(debug);
}
