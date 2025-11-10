import { NextResponse } from 'next/server';
import impactData from '@/lib/data/buyer-impact.json';

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: impactData,
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch buyer impact' },
      { status: 500 }
    );
  }
}
