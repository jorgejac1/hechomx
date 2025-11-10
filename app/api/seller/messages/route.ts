import { NextResponse } from 'next/server';
import messagesData from '@/lib/data/seller-messages.json';

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: messagesData,
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch seller messages' },
      { status: 500 }
    );
  }
}
