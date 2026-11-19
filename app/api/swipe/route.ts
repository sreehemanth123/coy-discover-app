import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { profileId, action } = body;

    if (!profileId || (action !== 'like' && action !== 'pass')) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid payload. profileId (string) and action ("like" | "pass") are required.',
        },
        { status: 400 }
      );
    }

    const result = db.recordSwipe(profileId, action);

    return NextResponse.json({
      success: true,
      matched: result.matched,
      match: result.match || null,
      message: result.matched
        ? "It's a Match! Both of you liked each other."
        : action === 'like'
        ? 'Profile liked successfully.'
        : 'Profile passed.',
    });
  } catch (error: any) {
    console.error('Error processing swipe:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
