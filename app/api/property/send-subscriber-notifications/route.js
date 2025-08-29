import { NextResponse } from 'next/server';
import pool from '@/app/libs/mysql';
import { sendBulkEmails } from '@/app/libs/email';
import { render } from '@react-email/components';
import NewPropertySubscriber from '../../../../mail-templates/NewPropertySubscriber';

export async function POST(req) {
  try {
    console.log('Subscriber notification API called');
    const { property, excludeEmail } = await req.json();
    
    console.log('Received property data:', property);

    if (!property) {
      console.log('Missing property data');
      return NextResponse.json(
        { error: 'Property data is required' },
        { status: 400 }
      );
    }

    // Fetch all subscribed users from the database
    let subscribers = [];
    
    try {
      const [subscriberRows] = await pool.query(
        'SELECT email, name FROM subscribers WHERE is_unsubscribed = 0'
      );
      if (subscriberRows.length > 0) {
        subscribers = subscriberRows;
        console.log(`Found ${subscribers.length} subscribers from subscribers table`);
      } else {
        const [userRows] = await pool.query(
          'SELECT email, name FROM users WHERE isSubscribed = 1'
        );
        subscribers = userRows;
        console.log(`Found ${subscribers.length} subscribers from users table`);
      }
    } catch (error) {
      console.error('Error fetching subscribers:', error);
      try {
        const [userRows] = await pool.query(
          'SELECT email, name FROM users WHERE isSubscribed = 1'
        );
        subscribers = userRows;
        console.log(`Found ${subscribers.length} subscribers from users table (fallback)`);
      } catch (fallbackError) {
        console.error('Error fetching subscribers from users table:', fallbackError);
        subscribers = [];
      }
    }

    // Exclude the lister email if provided
    let excludedCount = 0;
    if (excludeEmail) {
      const before = subscribers.length;
      subscribers = subscribers.filter((s) => (s.email || '').toLowerCase() !== String(excludeEmail).toLowerCase());
      excludedCount = before - subscribers.length;
      console.log(`Excluded ${excludedCount} recipient(s) matching ${excludeEmail}`);
    }

    if (subscribers.length === 0) {
      console.log('No subscribers found after filtering');
      return NextResponse.json({ 
        success: true, 
        message: 'No subscribers to notify',
        sent: 0,
        total: 0,
        excluded: excludedCount
      });
    }

    console.log(`Preparing to send notifications to ${subscribers.length} subscribers`);

    const buildMessage = async (subscriber) => {
      const html = await render(
        <NewPropertySubscriber 
          subscriber={subscriber} 
          property={property} 
        />
      );

      return {
        from: `${process.env.EMAIL_USER_NAME} <${process.env.EMAIL_BULK_USER}>`,
        to: subscriber.email,
        subject: `New Property Added! - ${property.title}`,
        html: html
      };
    };

    const results = await sendBulkEmails(subscribers, buildMessage, {
      batchSize: 50,
      concurrency: 5,
      delayBetweenBatches: 1000
    });

    console.log('Subscriber notification results:', results);

    return NextResponse.json({
      success: true,
      message: 'Subscriber notifications sent',
      sent: results.sent,
      failed: results.failed,
      total: results.total,
      excluded: excludedCount,
      errors: results.errors
    });

  } catch (error) {
    console.error('Failed to send subscriber notifications:', error);
    return NextResponse.json(
      { 
        error: 'Failed to send subscriber notifications',
        details: error.message 
      },
      { status: 500 }
    );
  }
}
