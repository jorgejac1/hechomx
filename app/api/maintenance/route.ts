/**
 * @fileoverview Maintenance status API endpoint
 * Returns and updates the current maintenance mode status.
 * Uses a simple file-based storage for demo purposes.
 * In production, this would use a database or Redis.
 * @module app/api/maintenance/route
 */

import { NextResponse } from 'next/server';

// In-memory storage for maintenance mode (resets on server restart)
// In production, use database or Redis
let maintenanceMode = false;

/**
 * Get maintenance mode status
 */
export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      maintenanceMode,
    });
  } catch (error) {
    console.error('[api/maintenance] Error:', error);
    return NextResponse.json({
      success: true,
      maintenanceMode: false,
    });
  }
}

/**
 * Update maintenance mode status (admin only)
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { enabled } = body;

    if (typeof enabled !== 'boolean') {
      return NextResponse.json({ success: false, error: 'Invalid request body' }, { status: 400 });
    }

    maintenanceMode = enabled;

    return NextResponse.json({
      success: true,
      maintenanceMode,
      message: enabled ? 'Modo mantenimiento activado' : 'Modo mantenimiento desactivado',
    });
  } catch (error) {
    console.error('[api/maintenance] Error updating:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update maintenance mode' },
      { status: 500 }
    );
  }
}
