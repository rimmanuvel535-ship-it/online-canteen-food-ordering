import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcrypt';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { 
          error: 'Email and password are required',
          code: 'MISSING_FIELDS'
        },
        { status: 400 }
      );
    }

    // Trim and normalize email
    const normalizedEmail = email.trim().toLowerCase();

    // Find user by email
    const userRecord = await db.select()
      .from(users)
      .where(eq(users.email, normalizedEmail))
      .limit(1);

    // User not found - return generic error message for security
    if (userRecord.length === 0) {
      return NextResponse.json(
        { 
          error: 'Invalid email or password',
          code: 'INVALID_CREDENTIALS'
        },
        { status: 401 }
      );
    }

    const user = userRecord[0];

    // Verify password using bcrypt
    const passwordMatch = await bcrypt.compare(password, user.password);

    // Password doesn't match - return generic error message for security
    if (!passwordMatch) {
      return NextResponse.json(
        { 
          error: 'Invalid email or password',
          code: 'INVALID_CREDENTIALS'
        },
        { status: 401 }
      );
    }

    // Authentication successful - return user object without password
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json(userWithoutPassword, { status: 200 });

  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error')
      },
      { status: 500 }
    );
  }
}