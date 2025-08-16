import { NextResponse } from 'next/server';
import pool from '@/app/libs/mysql';

export async function POST(request) {
  try {
    const { propertyId, userId, action } = await request.json();

    if (!propertyId || !userId) {
      return NextResponse.json(
        { error: 'Property ID and User ID are required' },
        { status: 400 }
      );
    }

    const db = await pool;

    if (action === 'add') {
      // Check if already favorited
      const [existing] = await db.query(
        'SELECT * FROM user_favorites WHERE user_id = ? AND property_id = ?',
        [userId, propertyId]
      );

      if (existing.length > 0) {
        return NextResponse.json(
          { error: 'Property already in favorites' },
          { status: 400 }
        );
      }

      // Add to favorites
      await db.query(
        'INSERT INTO user_favorites (user_id, property_id, created_at) VALUES (?, ?, NOW())',
        [userId, propertyId]
      );

      return NextResponse.json(
        { message: 'Added to favorites successfully' },
        { status: 200 }
      );

    } else if (action === 'remove') {
      // Remove from favorites
      const [result] = await db.query(
        'DELETE FROM user_favorites WHERE user_id = ? AND property_id = ?',
        [userId, propertyId]
      );

      if (result.affectedRows === 0) {
        return NextResponse.json(
          { error: 'Property not found in favorites' },
          { status: 404 }
        );
      }

      return NextResponse.json(
        { message: 'Removed from favorites successfully' },
        { status: 200 }
      );

    } else {
      return NextResponse.json(
        { error: 'Invalid action. Use "add" or "remove"' },
        { status: 400 }
      );
    }

  } catch (error) {
    console.error('Error in favorites toggle:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const propertyId = searchParams.get('propertyId');

    if (!userId || !propertyId) {
      return NextResponse.json(
        { error: 'User ID and Property ID are required' },
        { status: 400 }
      );
    }

    const db = await pool;
    const [favorites] = await db.query(
      'SELECT * FROM user_favorites WHERE user_id = ? AND property_id = ?',
      [userId, propertyId]
    );

    const isFavorited = favorites.length > 0;

    return NextResponse.json(
      { isFavorited },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error checking favorite status:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
