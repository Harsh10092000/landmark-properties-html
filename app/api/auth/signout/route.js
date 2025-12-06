import { getServerSession } from 'next-auth/next';
import { authOptions } from '../[...nextauth]/route';
import pool from '@/app/libs/mysql';
import { cookies } from 'next/headers';

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (session && session.user && session.user.id) {
      // Delete session from database
      try {
        await pool.query(
          'DELETE FROM sessions WHERE user_id = ?',
          [session.user.id]
        );
        console.log('Deleted sessions for user:', session.user.id);
      } catch (dbError) {
        console.error('Error deleting session from database:', dbError);
      }
    }

    // Clear NextAuth cookies
    const cookieStore = await cookies();
    const isLocal = (process.env.NEXTAUTH_URL || '').includes('localhost') || process.env.NODE_ENV !== 'production';
    const cookieName = isLocal ? 'next-auth.session-token' : '__Secure-next-auth.session-token';
    
    // Delete the session cookie with proper options
    cookieStore.set(cookieName, '', {
      expires: new Date(0),
      path: '/',
      domain: isLocal ? undefined : '.landmarkplots.com',
      httpOnly: true,
      secure: !isLocal,
      sameSite: isLocal ? 'lax' : 'none',
    });
    
    // Also try to delete CSRF token if it exists
    cookieStore.set('next-auth.csrf-token', '', {
      expires: new Date(0),
      path: '/',
    });
    cookieStore.set('__Secure-next-auth.csrf-token', '', {
      expires: new Date(0),
      path: '/',
      secure: true,
    });

    return Response.json({ 
      success: true,
      message: "Logged out successfully" 
    });
  } catch (error) {
    console.error('Signout error:', error);
    // Even if there's an error, try to clear cookies
    try {
      const cookieStore = await cookies();
      const isLocal = (process.env.NEXTAUTH_URL || '').includes('localhost') || process.env.NODE_ENV !== 'production';
      const cookieName = isLocal ? 'next-auth.session-token' : '__Secure-next-auth.session-token';
      cookieStore.set(cookieName, '', {
        expires: new Date(0),
        path: '/',
        domain: isLocal ? undefined : '.landmarkplots.com',
        httpOnly: true,
        secure: !isLocal,
        sameSite: isLocal ? 'lax' : 'none',
      });
    } catch (cookieError) {
      console.error('Error clearing cookies:', cookieError);
    }
    
    return Response.json({ 
      success: true,
      message: "Logged out successfully" 
    }, { status: 200 });
  }
}

export async function POST(request) {
  // Handle POST requests the same way
  return GET(request);
}