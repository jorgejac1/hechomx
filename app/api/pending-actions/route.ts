import { NextResponse } from 'next/server';
import pendingActionsData from '@/lib/data/pending-actions.json';

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

    const userActions = pendingActionsData[email as keyof typeof pendingActionsData];

    if (!userActions) {
      return NextResponse.json(
        { success: false, error: 'No pending actions found for this user' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: userActions,
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch pending actions' },
      { status: 500 }
    );
  }
}
