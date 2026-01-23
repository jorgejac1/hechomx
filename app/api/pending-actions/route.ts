/**
 * @fileoverview Pending Actions API endpoint
 * Retrieves pending action items for users such as required profile updates, verifications, or tasks.
 * Requires email parameter to identify the user.
 * @module app/api/pending-actions/route
 */

import { NextResponse } from 'next/server';
import pendingActionsData from '@/lib/data/pending-actions.json';

/**
 * @interface PendingActionsResponse
 * @property {boolean} success - Indicates if the request was successful
 * @property {object} data - The pending actions data object
 * @property {string} [error] - Error message if request fails
 */

/**
 * Retrieves pending actions for a specific user
 * @param {Request} request - The incoming HTTP request object
 * @param {string} request.url - URL containing email query parameter
 * @returns {Promise<NextResponse>} JSON response containing pending actions data
 * @returns {boolean} response.success - Success status of the request
 * @returns {object} response.data - Pending actions for the specified user
 * @returns {string} [response.error] - Error message if email is missing or not found
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

    const userActions = pendingActionsData[email as keyof typeof pendingActionsData];

    if (!userActions) {
      return NextResponse.json(
        { success: false, error: 'No pending actions found for this user' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: userActions,
    });
  } catch (error) {
    console.error('[api/pending-actions] Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch pending actions' },
      { status: 500 }
    );
  }
}
