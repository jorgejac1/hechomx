import { NextResponse } from 'next/server';
import buyerOrdersData from '@/lib/data/buyer-orders.json';

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
    console.error('API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch buyer orders' },
      { status: 500 }
    );
  }
}
