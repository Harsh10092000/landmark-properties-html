import { NextResponse } from 'next/server';
import pool from '@/app/libs/mysql';
import crypto from 'crypto';
import { sendSubscriptionEmail, sendBulkEmail } from '@/app/libs/email';
import { render } from '@react-email/components';
import SubscriptionNotificationEmail from '@/mail-templates/SubscriptionNotification';
import UserSubscriptionConfirmationEmail from '@/mail-templates/UserSubscriptionConfirmation';
// Local validation functions
const validateName = (name) => {
  const trimmed = (name || '').trim();
  if (!trimmed) return { ok: false, message: 'Name is required. Please fill in your name.' };
  if (trimmed.length < 2) return { ok: false, message: 'Name must be at least 2 characters.' };
  if (trimmed.length > 50) return { ok: false, message: 'Name must be at most 50 characters.' };
  if (!/^[a-zA-Z\s]+$/.test(trimmed)) return { ok: false, message: 'Name can contain only letters and spaces.' };
  return { ok: true, message: null };
};

const validateEmail = (email) => {
  const trimmed = (email || '').trim();
  if (!trimmed) return { ok: false, message: 'Email address is required. Please fill in your email.' };
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9\-]+(\.[a-zA-Z0-9\-]+)+$/;
  if (!emailRegex.test(trimmed)) return { ok: false, message: 'Enter a valid email address.' };
  if (trimmed.length > 320) return { ok: false, message: 'Email is too long.' };
  return { ok: true, message: null };
};

export async function POST(req) {
  try {
    const { name, email } = await req.json();
    
    // Server-side validation using local functions
    let validationErrors = {};

    // Validate name
    const nameValidation = validateName(name);
    if (!nameValidation.ok) {
      validationErrors.name = nameValidation.message;
    }

    // Validate email
    const emailValidation = validateEmail(email);
    if (!emailValidation.ok) {
      validationErrors.email = emailValidation.message;
    }

    // If validation failed, return errors
    if (Object.keys(validationErrors).length > 0) {
      return NextResponse.json(
        { 
          error: 'Please fix the following errors:',
          validationErrors 
        },
        { status: 400 }
      );
    }

    console.log('Subscription request for:', { name, email });

    // Generate unsubscribe token
    const unsubscribeToken = crypto.randomBytes(32).toString('hex');
    
    // Create unsubscribe URL
    const unsubscribeUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://landmarkplots.com'}/unsubscribe?email=${encodeURIComponent(email)}&token=${unsubscribeToken}`;

    try {
      // First, try to insert into subscribers table
      const [result] = await pool.query(
        'INSERT INTO subscribers (email, name, unsubscribe_token) VALUES (?, ?, ?)',
        [email, name, unsubscribeToken]
      );

      console.log('Successfully subscribed to subscribers table:', email);
      
      // Send confirmation email to the user
      try {
        const userEmailHtml = await render(
          UserSubscriptionConfirmationEmail({
            subscriberName: name,
            isResubscription: false,
            unsubscribeUrl: unsubscribeUrl
          })
        );

        await sendBulkEmail({
          from: `${process.env.EMAIL_USER_NAME} <${process.env.EMAIL_BULK_USER}>`,
          to: email,
          subject: 'Welcome to Landmark Properties Newsletter!',
          html: userEmailHtml,
        });

        console.log('Confirmation email sent to user:', email);
      } catch (emailError) {
        console.error('Failed to send confirmation email to user:', emailError);
        // Don't fail the subscription if email fails
      }
      
      // Send admin notification email
      try {
        const emailHtml = await render(SubscriptionNotificationEmail({
          subscriberName: name,
          subscriberEmail: email,
          subscriptionDate: new Date().toLocaleDateString()
        }));

        await sendSubscriptionEmail({
          from: process.env.EMAIL_SUBSCRIBE_USER,
          to: process.env.EMAIL_SUBSCRIBE_USER,
          cc: process.env.ADMIN_EMAIL,
          subject: `New Newsletter Subscription - ${email}`,
          html: emailHtml,
        });

        console.log('Admin notification email sent for subscription:', email);
      } catch (emailError) {
        console.error('Failed to send admin notification email:', emailError);
        // Don't fail the subscription if email fails
      }
      
      return NextResponse.json({ 
        success: true, 
        message: 'Successfully subscribed to property notifications! You will receive email updates when new properties are added.',
        subscriberId: result.insertId
      });

    } catch (error) {
      // If subscribers table doesn't exist or email already exists
      if (error.code === 'ER_NO_SUCH_TABLE') {
        // Fallback to users table
        try {
          // Check if user already exists
          const [existingUser] = await pool.query(
            'SELECT id, isSubscribed FROM users WHERE email = ?',
            [email]
          );

          if (existingUser.length > 0) {
            // Update existing user to subscribe
            await pool.query(
              'UPDATE users SET isSubscribed = 1, name = COALESCE(?, name) WHERE email = ?',
              [name, email]
            );
            console.log('Updated existing user to subscribe:', email);
          } else {
            // Insert new user as subscribed
            await pool.query(
              'INSERT INTO users (email, name, isSubscribed) VALUES (?, ?, 1)',
              [email, name]
            );
            console.log('Created new subscribed user:', email);
          }

          // Send confirmation email to the user
          try {
            const userEmailHtml = await render(
              UserSubscriptionConfirmationEmail({
                subscriberName: name,
                isResubscription: false,
                unsubscribeUrl: unsubscribeUrl
              })
            );

            await sendBulkEmail({
              from: `${process.env.EMAIL_USER_NAME} <${process.env.EMAIL_BULK_USER}>`,
              to: email,
              subject: 'Welcome to Landmark Properties Newsletter!',
              html: userEmailHtml,
            });

            console.log('Confirmation email sent to user (users table):', email);
          } catch (emailError) {
            console.error('Failed to send confirmation email to user:', emailError);
            // Don't fail the subscription if email fails
          }

          // Send admin notification email for users table subscription
          try {
            const emailHtml = await render(SubscriptionNotificationEmail({
              subscriberName: name,
              subscriberEmail: email,
              subscriptionDate: new Date().toLocaleDateString()
            }));

            await sendSubscriptionEmail({
              from: process.env.EMAIL_SUBSCRIBE_USER,
              to: process.env.EMAIL_SUBSCRIBE_USER,
              cc: process.env.ADMIN_EMAIL,
              subject: `New Newsletter Subscription - ${email}`,
              html: emailHtml,
            });

            console.log('Admin notification email sent for users table subscription:', email);
          } catch (emailError) {
            console.error('Failed to send admin notification email:', emailError);
            // Don't fail the subscription if email fails
          }

          return NextResponse.json({ 
            success: true, 
            message: 'Successfully subscribed to property notifications! You will receive email updates when new properties are added.'
          });

        } catch (fallbackError) {
          console.error('Error with users table fallback:', fallbackError);
          return NextResponse.json(
            { error: 'Failed to subscribe. Please try again later.' },
            { status: 500 }
          );
        }
      } else if (error.code === 'ER_DUP_ENTRY') {
        // Email already exists in subscribers table
        // Check if already subscribed
        const [existingSubscriber] = await pool.query(
          'SELECT is_unsubscribed FROM subscribers WHERE email = ?',
          [email]
        );

        if (existingSubscriber.length > 0) {
          if (existingSubscriber[0].is_unsubscribed === 1) {
            // Re-subscribe the user
            await pool.query(
              'UPDATE subscribers SET is_unsubscribed = 0, name = ?, unsubscribe_token = ? WHERE email = ?',
              [name, unsubscribeToken, email]
            );
            console.log('Re-subscribed user:', email);
            
            // Send confirmation email to the user
            try {
              const userEmailHtml = await render(
                UserSubscriptionConfirmationEmail({
                  subscriberName: name,
                  isResubscription: true,
                  unsubscribeUrl: unsubscribeUrl
                })
              );

              await sendBulkEmail({
                from: `${process.env.EMAIL_USER_NAME} <${process.env.EMAIL_BULK_USER}>`,
                to: email,
                subject: 'Welcome Back to Landmark Properties Newsletter!',
                html: userEmailHtml,
              });

              console.log('Re-subscription confirmation email sent to user:', email);
            } catch (emailError) {
              console.error('Failed to send re-subscription confirmation email to user:', emailError);
              // Don't fail the subscription if email fails
            }
            
            // Send admin notification email for re-subscription
            try {
              const emailHtml = await render(SubscriptionNotificationEmail({
                subscriberName: name,
                subscriberEmail: email,
                subscriptionDate: new Date().toLocaleDateString()
              }));

              await sendSubscriptionEmail({
                from: process.env.EMAIL_SUBSCRIBE_USER,
                to: process.env.EMAIL_SUBSCRIBE_USER,
                cc: process.env.ADMIN_EMAIL,
                subject: `Newsletter Re-Subscription - ${email}`,
                html: emailHtml,
              });

              console.log('Admin notification email sent for re-subscription:', email);
            } catch (emailError) {
              console.error('Failed to send admin notification email:', emailError);
              // Don't fail the subscription if email fails
            }
            
            return NextResponse.json({ 
              success: true, 
              message: 'Successfully re-subscribed to property notifications! You will receive email updates when new properties are added.'
            });
          } else {
            return NextResponse.json(
              { error: 'This email is already subscribed to our property newsletter. You will receive updates when new properties are added.' },
              { status: 400 }
            );
          }
        }
      }

      throw error;
    }

  } catch (error) {
    console.error('Subscribe error:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again.' },
      { status: 500 }
    );
  }
}
