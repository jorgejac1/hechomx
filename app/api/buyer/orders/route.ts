/**
 * @fileoverview Buyer Orders API endpoint
 * Retrieves order history and details for buyers.
 * Requires email parameter to identify the buyer.
 * @module app/api/buyer/orders/route
 */

import { NextResponse } from 'next/server';
import buyerOrdersData from '@/lib/data/buyer-orders.json';

/**
 * @interface BuyerOrdersResponse
 * @property {boolean} success - Indicates if the request was successful
 * @property {Array<object>} data - Array of order objects
 * @property {string} [error] - Error message if request fails
 */

/**
 * Retrieves all orders for a specific buyer
 * @param {Request} request - The incoming HTTP request object
 * @param {string} request.url - URL containing email query parameter
 * @returns {Promise<NextResponse>} JSON response containing buyer orders data
 * @returns {boolean} response.success - Success status of the request
 * @returns {Array<object>} response.data - Array of orders for the specified buyer (empty array if none found)
 * @returns {string} [response.error] - Error message if email is missing
 */
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

    const userOrders = buyerOrdersData[email as keyof typeof buyerOrdersData];

    if (!userOrders) {
      return NextResponse.json({
        success: true,
        data: [],
      });
    }

    return NextResponse.json({
      success: true,
      data: userOrders,
    });
  } catch (error) {
    console.error('[api/buyer/orders] Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch buyer orders' },
      { status: 500 }
    );
  }
}
