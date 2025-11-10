import { NextResponse } from 'next/server';
import tasksData from '@/lib/data/seller-tasks.json';

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: tasksData,
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch seller tasks' },
      { status: 500 }
    );
  }
}
