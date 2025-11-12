import { NextResponse } from 'next/server';
import favoritesData from '@/lib/data/user-favorites.json';
import productsData from '@/lib/data/products.json';

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

    const userFavorites = favoritesData[email as keyof typeof favoritesData] || [];

    // Enrich favorites with full product data
    const enrichedFavorites = userFavorites
      .map((fav) => {
        const product = productsData.find((p) => p.id === fav.id);
        if (!product) return null;
        return {
          ...product,
          addedAt: fav.addedAt,
          notes: fav.notes,
        };
      })
      .filter(Boolean);

    return NextResponse.json({
      success: true,
      data: enrichedFavorites,
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch favorites' },
      { status: 500 }
    );
  }
}
