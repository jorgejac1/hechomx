import { NextResponse } from 'next/server';
import analyticsData from '@/lib/data/seller-analytics.json';

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

    const userAnalytics = analyticsData[email as keyof typeof analyticsData];

    if (!userAnalytics) {
      return NextResponse.json(
        { success: false, error: 'No analytics found for this user' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: userAnalytics,
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch seller analytics' },
      { status: 500 }
    );
  }
}
