import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const feed = db.getFeed();
    return NextResponse.json({
      success: true,
      count: feed.length,
      profiles: feed,
    });
  } catch (error: any) {
    console.error('Error fetching feed:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
