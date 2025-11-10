import { NextResponse } from 'next/server';
import ratesData from '@/lib/data/fair-trade-rates.json';

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: ratesData,
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch fair trade rates' },
      { status: 500 }
    );
  }
}
