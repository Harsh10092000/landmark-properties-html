import { NextResponse } from 'next/server';
import { sendEmail, sendSubscriptionEmail, sendBulkEmail } from '@/app/libs/email';

export async function GET(req) {
  try {
    console.log('Testing email functions...');
    
    // Test basic email configuration
    const emailConfig = {
      host: process.env.EMAIL_SERVER,
      port: process.env.EMAIL_PORT,
      adminUser: process.env.EMAIL_ADMIN_USER ? 'Set' : 'Not set',
      adminPass: process.env.EMAIL_ADMIN_PASSWORD ? 'Set' : 'Not set',
      subscribeUser: process.env.EMAIL_SUBSCRIBE_USER ? 'Set' : 'Not set',
      subscribePass: process.env.EMAIL_SUBSCRIBE_PASSWORD ? 'Set' : 'Not set',
      bulkUser: process.env.EMAIL_BULK_USER ? 'Set' : 'Not set',
      bulkPass: process.env.EMAIL_BULK_PASSWORD ? 'Set' : 'Not set'
    };
    
    console.log('Email configuration:', emailConfig);
    
    return NextResponse.json({
      success: true,
      message: 'Email test endpoint working',
      config: emailConfig
    });
    
  } catch (error) {
    console.error('Email test error:', error);
    return NextResponse.json(
      { error: 'Email test failed', details: error.message },
      { status: 500 }
    );
  }
}
