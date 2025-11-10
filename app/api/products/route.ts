import { NextResponse } from 'next/server';
import {
  getAllProducts,
  getProductsByCategory,
  getProductsByState,
  searchProducts,
} from '@/lib/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const state = searchParams.get('state');
  const search = searchParams.get('search');

  try {
    let products;

    if (search) {
      products = searchProducts(search);
    } else if (category) {
      products = getProductsByCategory(category);
    } else if (state) {
      products = getProductsByState(state);
    } else {
      products = getAllProducts();
    }

    return NextResponse.json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch products',
      },
      { status: 500 }
    );
  }
}
