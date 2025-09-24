import { NextResponse } from 'next/server';
import pool from '@/app/libs/mysql';
import { sendSubscriptionEmail } from '@/app/libs/email';
import { render } from '@react-email/components';
import UnsubscriptionNotificationEmail from '@/mail-templates/UnsubscriptionNotification';

export async function POST(req) {
  try {
    const { email, token } = await req.json();
    
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    console.log('Unsubscribe request for:', email);

    // Helper function to get subscriber name
    const getSubscriberName = async (email) => {
      try {
        // Try to get name from subscribers table first
        const [subscriberRows] = await pool.query(
          'SELECT name FROM subscribers WHERE email = ?',
          [email]
        );
        
        if (subscriberRows.length > 0) {
          return subscriberRows[0].name || 'Unknown';
        }
        
        // Fallback to users table
        const [userRows] = await pool.query(
          'SELECT name FROM users WHERE email = ?',
          [email]
        );
        
        if (userRows.length > 0) {
          return userRows[0].name || 'Unknown';
        }
        
        return 'Unknown';
      } catch (error) {
        console.error('Error getting subscriber name:', error);
        return 'Unknown';
      }
    };

    // Try to unsubscribe from subscribers table first
    let result;
    let unsubscribed = false;
    try {
      if (token) {
        // If token provided, use it for verification
        result = await pool.query(
          'UPDATE subscribers SET is_unsubscribed = 1 WHERE email = ? AND unsubscribe_token = ?',
          [email, token]
        );
      } else {
        // Simple email-based unsubscribe
        result = await pool.query(
          'UPDATE subscribers SET is_unsubscribed = 1 WHERE email = ?',
          [email]
        );
      }
      
      if (result[0].affectedRows > 0) {
        console.log('Successfully unsubscribed from subscribers table:', email);
        unsubscribed = true;
      }
    } catch (error) {
      console.error('Error unsubscribing from subscribers table:', error);
    }

    // Fallback to users table
    if (!unsubscribed) {
      try {
        result = await pool.query(
          'UPDATE users SET isSubscribed = 0 WHERE email = ?',
          [email]
        );
        
        if (result[0].affectedRows > 0) {
          console.log('Successfully unsubscribed from users table:', email);
          unsubscribed = true;
        }
      } catch (error) {
        console.error('Error unsubscribing from users table:', error);
      }
    }

    // Send admin notification if unsubscribed successfully
    if (unsubscribed) {
      try {
        const subscriberName = await getSubscriberName(email);
        const emailHtml = await render(UnsubscriptionNotificationEmail({
          subscriberName: subscriberName,
          subscriberEmail: email,
          unsubscriptionDate: new Date().toLocaleDateString()
        }));

        await sendSubscriptionEmail({
          from: process.env.EMAIL_SUBSCRIBE_USER,
          to: process.env.EMAIL_SUBSCRIBE_USER,
          cc: process.env.ADMIN_EMAIL,
          bcc: process.env.ADMIN_BCC_EMAIL || 'dhamija.piyush7@gmail.com',
          subject: `Newsletter Unsubscription - ${email}`,
          html: emailHtml,
        });

        console.log('Admin notification email sent for unsubscription:', email);
      } catch (emailError) {
        console.error('Failed to send admin notification email:', emailError);
        // Don't fail the unsubscription if email fails
      }
      
      return NextResponse.json({ 
        success: true, 
        message: 'Successfully unsubscribed from notifications' 
      });
    }

    // If no records were updated, the email might not exist
    return NextResponse.json(
      { error: 'Email not found or already unsubscribed' },
      { status: 404 }
    );

  } catch (error) {
    console.error('Unsubscribe error:', error);
    return NextResponse.json(
      { error: 'Failed to unsubscribe' },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');
    const token = searchParams.get('token');
    
    if (!email) {
      return NextResponse.json(
        { error: 'Email parameter is required' },
        { status: 400 }
      );
    }

    console.log('Unsubscribe request via GET for:', email);

    // Helper function to get subscriber name
    const getSubscriberName = async (email) => {
      try {
        // Try to get name from subscribers table first
        const [subscriberRows] = await pool.query(
          'SELECT name FROM subscribers WHERE email = ?',
          [email]
        );
        
        if (subscriberRows.length > 0) {
          return subscriberRows[0].name || 'Unknown';
        }
        
        // Fallback to users table
        const [userRows] = await pool.query(
          'SELECT name FROM users WHERE email = ?',
          [email]
        );
        
        if (userRows.length > 0) {
          return userRows[0].name || 'Unknown';
        }
        
        return 'Unknown';
      } catch (error) {
        console.error('Error getting subscriber name:', error);
        return 'Unknown';
      }
    };

    // Try to unsubscribe from subscribers table first
    let result;
    let unsubscribed = false;
    try {
      if (token) {
        result = await pool.query(
          'UPDATE subscribers SET is_unsubscribed = 1 WHERE email = ? AND unsubscribe_token = ?',
          [email, token]
        );
      } else {
        result = await pool.query(
          'UPDATE subscribers SET is_unsubscribed = 1 WHERE email = ?',
          [email]
        );
      }
      
      if (result[0].affectedRows > 0) {
        console.log('Successfully unsubscribed from subscribers table:', email);
        unsubscribed = true;
      }
    } catch (error) {
      console.error('Error unsubscribing from subscribers table:', error);
    }

    // Fallback to users table
    if (!unsubscribed) {
      try {
        result = await pool.query(
          'UPDATE users SET isSubscribed = 0 WHERE email = ?',
          [email]
        );
        
        if (result[0].affectedRows > 0) {
          console.log('Successfully unsubscribed from users table:', email);
          unsubscribed = true;
        }
      } catch (error) {
        console.error('Error unsubscribing from users table:', error);
      }
    }

    // Send admin notification if unsubscribed successfully
    if (unsubscribed) {
      try {
        const subscriberName = await getSubscriberName(email);
        const emailHtml = await render(UnsubscriptionNotificationEmail({
          subscriberName: subscriberName,
          subscriberEmail: email,
          unsubscriptionDate: new Date().toLocaleDateString()
        }));

        await sendSubscriptionEmail({
          from: process.env.EMAIL_SUBSCRIBE_USER,
          to: process.env.EMAIL_SUBSCRIBE_USER,
          cc: process.env.ADMIN_EMAIL,
          bcc: process.env.ADMIN_BCC_EMAIL || 'dhamija.piyush7@gmail.com',
          subject: `Newsletter Unsubscribes - ${email}`,
          html: emailHtml,
        });

        console.log('Admin notification email sent for unsubscription:', email);
      } catch (emailError) {
        console.error('Failed to send admin notification email:', emailError);
        // Don't fail the unsubscription if email fails
      }
      
      return NextResponse.json({ 
        success: true, 
        message: 'Successfully unsubscribed from notifications' 
      });
    }

    return NextResponse.json(
      { error: 'Email not found or already unsubscribed' },
      { status: 404 }
    );

  } catch (error) {
    console.error('Unsubscribe error:', error);
    return NextResponse.json(
      { error: 'Failed to unsubscribe' },
      { status: 500 }
    );
  }
}
