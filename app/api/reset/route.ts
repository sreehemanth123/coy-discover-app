import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST() {
  try {
    db.reset();
    return NextResponse.json({
      success: true,
      message: 'Database reset successfully to initial seed profiles.',
    });
  } catch (error: any) {
    console.error('Error resetting database:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
