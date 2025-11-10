import { NextResponse } from 'next/server';
import ordersData from '@/lib/data/seller-orders.json';

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: ordersData,
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch seller orders' },
      { status: 500 }
    );
  }
}
