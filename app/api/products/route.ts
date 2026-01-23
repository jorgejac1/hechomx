/**
 * @fileoverview Products API endpoint
 * Retrieves product listings with support for filtering by category, state, or search query.
 * Supports optional query parameters for filtering results.
 * @module app/api/products/route
 */

import { NextResponse } from 'next/server';
import {
  getAllProducts,
  getProductsByCategory,
  getProductsByState,
  searchProducts,
} from '@/lib/server';

/**
 * @interface ProductsResponse
 * @property {boolean} success - Indicates if the request was successful
 * @property {number} count - Total number of products returned
 * @property {Array<object>} data - Array of product objects
 * @property {string} [error] - Error message if request fails
 */

/**
 * Retrieves products with optional filtering by category, state, or search query
 * @param {Request} request - The incoming HTTP request object
 * @param {string} request.url - URL containing optional query parameters
 * @param {string} [request.url.category] - Optional category filter
 * @param {string} [request.url.state] - Optional state/region filter
 * @param {string} [request.url.search] - Optional search query
 * @returns {Promise<NextResponse>} JSON response containing filtered products
 * @returns {boolean} response.success - Success status of the request
 * @returns {number} response.count - Number of products in the response
 * @returns {Array<object>} response.data - Array of product objects matching the filters
 * @returns {string} [response.error] - Error message if request fails
 */
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
    console.error('[api/products] Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch products',
      },
      { status: 500 }
    );
  }
}
