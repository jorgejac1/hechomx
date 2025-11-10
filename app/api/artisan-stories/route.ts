import { NextResponse } from 'next/server';
import artisanStoriesData from '@/lib/data/artisan-stories.json';

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: artisanStoriesData,
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch artisan stories',
      },
      { status: 500 }
    );
  }
}
