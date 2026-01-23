/**
 * @fileoverview Seller Tasks API endpoint
 * Retrieves task data for sellers including pending tasks, reminders, and action items.
 * @module app/api/seller/tasks/route
 */

import { NextResponse } from 'next/server';
import tasksData from '@/lib/data/seller-tasks.json';

/**
 * @interface TasksResponse
 * @property {boolean} success - Indicates if the request was successful
 * @property {object} data - The tasks data object
 */

/**
 * Retrieves all seller tasks
 * @param {void} - No parameters required
 * @returns {Promise<NextResponse>} JSON response containing seller tasks data
 * @returns {boolean} response.success - Success status of the request
 * @returns {object} response.data - Tasks data from the data source
 */
export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: tasksData,
    });
  } catch (error) {
    console.error('[api/seller/tasks] Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch seller tasks' },
      { status: 500 }
    );
  }
}
