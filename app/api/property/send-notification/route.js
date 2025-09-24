import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import NewPropertyTemplate from '../../../../mail-templates/NewProperty';
import NewPropertyAdminTemplate from '../../../../mail-templates/NewPropertyAdmin';
import { render } from '@react-email/components';

// Create email transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_ADMIN_USER,
    pass: process.env.EMAIL_ADMIN_PASSWORD,
  },
});

// Check email configuration
console.log('Email configuration:', {
  host: process.env.EMAIL_SERVER,
  port: process.env.EMAIL_PORT,
  user: process.env.EMAIL_USER ? 'Set' : 'Not set',
  pass: process.env.EMAIL_PASSWORD ? 'Set' : 'Not set'
});

export async function POST(req) {
  try {
    console.log('Email notification API called');
    const { user, property } = await req.json();
    
    console.log('Received data:', { user, property });

    if (!user || !property) {
      console.log('Missing user or property data');
      return NextResponse.json(
        { error: 'User and property data are required' },
        { status: 400 }
      );
    }

    // Send email to user
    const userHtml = await render(<NewPropertyTemplate user={user} property={property} />);
    const userMailOptions = {
      from: `${process.env.EMAIL_USER_NAME} <${process.env.EMAIL_ADMIN_USER}>`,
      to: user.email,
      subject: 'Property Successfully Listed - Landmark Properties',
      html: userHtml
    };

    // Send email to admin
    const adminHtml = await render(<NewPropertyAdminTemplate user={user} property={property} />);
    const adminMailOptions = {
      from: `${process.env.EMAIL_USER_NAME} <${process.env.EMAIL_ADMIN_USER}>`,
      to: process.env.ADMIN_EMAIL || 'admin@landmarkplots.com',
      bcc: process.env.ADMIN_BCC_EMAIL || 'dhamija.piyush7@gmail.com',
      subject: `New Property Listed (${user.email}) - Landmark Properties`,
      html: adminHtml
    };

    console.log('Sending emails...');
    console.log('User email options:', userMailOptions);
    console.log('Admin email options:', adminMailOptions);

    // Send both emails
    await Promise.all([
      transporter.sendMail(userMailOptions),
      transporter.sendMail(adminMailOptions)
    ]);

    console.log('Property notification emails sent successfully');
    return NextResponse.json({ success: true, message: 'Emails sent successfully' });

  } catch (error) {
    console.error('Failed to send property notification emails:', error);
    return NextResponse.json(
      { error: 'Failed to send emails' },
      { status: 500 }
    );
  }
}
