import { NextResponse } from 'next/server';
import customerInsightsData from '@/lib/data/customer-insights.json';

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

    const userInsights = customerInsightsData[email as keyof typeof customerInsightsData];

    if (!userInsights) {
      return NextResponse.json(
        { success: false, error: 'No insights found for this user' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: userInsights,
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch customer insights' },
      { status: 500 }
    );
  }
}
