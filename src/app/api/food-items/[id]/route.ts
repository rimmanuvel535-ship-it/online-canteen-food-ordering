import { NextResponse } from 'next/server';
import { db } from '@/db';
import { foodItems } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Validate ID is a valid integer
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { 
          error: "Valid ID is required",
          code: "INVALID_ID" 
        },
        { status: 400 }
      );
    }

    // Query database for food item by ID
    const foodItem = await db
      .select()
      .from(foodItems)
      .where(eq(foodItems.id, parseInt(id)))
      .limit(1);

    // Return 404 if food item not found
    if (foodItem.length === 0) {
      return NextResponse.json(
        { 
          error: 'Food item not found',
          code: 'NOT_FOUND' 
        },
        { status: 404 }
      );
    }

    // Return single food item object
    return NextResponse.json(foodItem[0], { status: 200 });

  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error')
      },
      { status: 500 }
    );
  }
}