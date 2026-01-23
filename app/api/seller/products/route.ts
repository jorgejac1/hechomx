/**
 * @fileoverview Seller products API endpoint
 * Handles CRUD operations for seller products using localStorage for persistence.
 * @module app/api/seller/products/route
 */

import { NextResponse } from 'next/server';

// localStorage keys (must match lib/utils/products.ts)
const SELLER_PRODUCTS_KEY = 'papalote-seller-products';
const DRAFT_PRODUCTS_KEY = 'papalote-draft-products';

/**
 * Note: This API uses localStorage which only works on the client side.
 * For server-side operations, we return instructions for the client to handle.
 * In production, this would connect to a real database.
 */

/**
 * GET /api/seller/products
 * Returns seller products (client should pass sellerId)
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sellerId = searchParams.get('sellerId');
  const status = searchParams.get('status'); // 'draft', 'published', or 'all'

  if (!sellerId) {
    return NextResponse.json(
      {
        success: false,
        error: 'sellerId is required',
      },
      { status: 400 }
    );
  }

  // Since localStorage is client-side only, we return a message indicating
  // the client should use the utility functions directly
  return NextResponse.json({
    success: true,
    message: 'Use client-side localStorage utilities for product data',
    instructions: {
      drafts: `localStorage.getItem('${DRAFT_PRODUCTS_KEY}')`,
      published: `localStorage.getItem('${SELLER_PRODUCTS_KEY}')`,
    },
    sellerId,
    status: status || 'all',
  });
}

/**
 * POST /api/seller/products
 * Creates a new product
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { product, sellerId, sellerName } = body;

    if (!product || !sellerId) {
      return NextResponse.json(
        {
          success: false,
          error: 'product and sellerId are required',
        },
        { status: 400 }
      );
    }

    // Generate ID if not provided
    const productId =
      product.id ||
      `PROD-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 8)}`.toUpperCase();
    const now = new Date().toISOString();

    const newProduct = {
      ...product,
      id: productId,
      sellerId,
      sellerName: sellerName || 'Vendedor',
      createdAt: product.createdAt || now,
      updatedAt: now,
      status: product.status || 'published',
    };

    // Return the product data for client to save to localStorage
    return NextResponse.json({
      success: true,
      data: newProduct,
      message: 'Product created. Save to localStorage using savePublishedProduct()',
      storageKey: newProduct.status === 'draft' ? DRAFT_PRODUCTS_KEY : SELLER_PRODUCTS_KEY,
    });
  } catch (error) {
    console.error('[api/seller/products] POST error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create product',
      },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/seller/products
 * Updates an existing product
 */
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { product, sellerId } = body;

    if (!product?.id || !sellerId) {
      return NextResponse.json(
        {
          success: false,
          error: 'product.id and sellerId are required',
        },
        { status: 400 }
      );
    }

    const updatedProduct = {
      ...product,
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      data: updatedProduct,
      message: 'Product updated. Update localStorage accordingly.',
    });
  } catch (error) {
    console.error('[api/seller/products] PUT error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update product',
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/seller/products
 * Deletes a product
 */
export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get('productId');
  const sellerId = searchParams.get('sellerId');

  if (!productId || !sellerId) {
    return NextResponse.json(
      {
        success: false,
        error: 'productId and sellerId are required',
      },
      { status: 400 }
    );
  }

  return NextResponse.json({
    success: true,
    message: 'Product marked for deletion. Remove from localStorage.',
    productId,
    sellerId,
  });
}
