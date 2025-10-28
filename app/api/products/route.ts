import { NextResponse } from 'next/server';
import { getAllProducts, getProductsByCategory, getProductsByState, searchProducts } from '@/lib/products';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  
  const category = searchParams.get('category');
  const state = searchParams.get('state');
  const query = searchParams.get('q');

  try {
    let products;

    if (query) {
      products = searchProducts(query);
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
    return NextResponse.json(
      {
        success: false,
        error: 'Error fetching products',
      },
      { status: 500 }
    );
  }
}
