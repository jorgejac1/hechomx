/**
 * @fileoverview Seller Messages API endpoint
 * Retrieves message data for sellers including customer inquiries and notifications.
 * @module app/api/seller/messages/route
 */

import { NextResponse } from 'next/server';
import messagesData from '@/lib/data/seller-messages.json';

/**
 * @interface MessagesResponse
 * @property {boolean} success - Indicates if the request was successful
 * @property {object} data - The messages data object
 */

/**
 * Retrieves all seller messages
 * @param {void} - No parameters required
 * @returns {Promise<NextResponse>} JSON response containing seller messages data
 * @returns {boolean} response.success - Success status of the request
 * @returns {object} response.data - Messages data from the data source
 */
export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: messagesData,
    });
  } catch (error) {
    console.error('[api/seller/messages] Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch seller messages' },
      { status: 500 }
    );
  }
}
