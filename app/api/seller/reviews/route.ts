import { NextResponse } from 'next/server';
import reviewsData from '@/lib/data/seller-reviews.json';

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: reviewsData,
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch seller reviews' },
      { status: 500 }
    );
  }
}
