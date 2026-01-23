/**
 * @fileoverview Seller Orders API endpoint
 * Retrieves order data for sellers including order history, status, and details.
 * @module app/api/seller/orders/route
 */

import { NextResponse } from 'next/server';
import ordersData from '@/lib/data/seller-orders.json';

/**
 * @interface OrdersResponse
 * @property {boolean} success - Indicates if the request was successful
 * @property {object} data - The orders data object
 */

/**
 * Retrieves all seller orders
 * @param {void} - No parameters required
 * @returns {Promise<NextResponse>} JSON response containing seller orders data
 * @returns {boolean} response.success - Success status of the request
 * @returns {object} response.data - Orders data from the data source
 */
export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: ordersData,
    });
  } catch (error) {
    console.error('[api/seller/orders] Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch seller orders' },
      { status: 500 }
    );
  }
}
