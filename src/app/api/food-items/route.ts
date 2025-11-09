import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { foodItems } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '50'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');

    // Validate category parameter if provided
    if (category && !['veg', 'non-veg', 'combo'].includes(category)) {
      return NextResponse.json(
        { 
          error: 'Invalid category. Must be one of: veg, non-veg, combo',
          code: 'INVALID_CATEGORY'
        },
        { status: 400 }
      );
    }

    // Build query based on category filter
    let query = db.select().from(foodItems);

    if (category) {
      query = query.where(eq(foodItems.category, category));
    }

    // Apply pagination
    const results = await query.limit(limit).offset(offset);

    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error') },
      { status: 500 }
    );
  }
}