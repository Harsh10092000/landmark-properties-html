import { NextResponse } from 'next/server';
import pool from '@/app/libs/mysql';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET(req) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    console.log('Admin fetching subscribers for user:', session.user.id);

    let subscribers = [];
    
    try {
      // First, try to get from subscribers table
      const [subscriberRows] = await pool.query(
        'SELECT id, email, name, is_unsubscribed, created_at, updated_at FROM subscribers ORDER BY created_at DESC'
      );
      
      if (subscriberRows.length > 0) {
        subscribers = subscriberRows;
        console.log(`Found ${subscribers.length} subscribers from subscribers table`);
      } else {
        // Fallback to users table with isSubscribed field
        const [userRows] = await pool.query(
          'SELECT id, email, name, isSubscribed as is_unsubscribed, created_at, updated_at FROM users WHERE isSubscribed = 1 ORDER BY created_at DESC'
        );
        
        subscribers = userRows;
        console.log(`Found ${subscribers.length} subscribers from users table`);
      }
    } catch (error) {
      console.error('Error fetching subscribers:', error);
      // If table doesn't exist, try users table
      try {
        const [userRows] = await pool.query(
          'SELECT id, email, name, isSubscribed as is_unsubscribed, created_at, updated_at FROM users WHERE isSubscribed = 1 ORDER BY created_at DESC'
        );
        subscribers = userRows;
        console.log(`Found ${subscribers.length} subscribers from users table (fallback)`);
      } catch (fallbackError) {
        console.error('Error fetching subscribers from users table:', fallbackError);
        subscribers = [];
      }
    }

    return NextResponse.json({
      success: true,
      subscribers: subscribers,
      total: subscribers.length
    });

  } catch (error) {
    console.error('Admin subscribers fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch subscribers' },
      { status: 500 }
    );
  }
}
