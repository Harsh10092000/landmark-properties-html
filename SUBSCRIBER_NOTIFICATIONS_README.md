# Subscriber Notification System

## Overview
This system automatically sends email notifications to subscribed users whenever a new property is added to Landmark Plots. The implementation is designed to be non-blocking and handles edge cases gracefully.

## Components

### 1. Email Utility (`app/libs/email.js`)
- **Centralized email configuration** using nodemailer
- **Batch sending** with concurrency control to avoid rate limiting
- **Error handling** and logging for each email send
- **Configurable batch sizes** and delays between batches

### 2. Email Template (`mail-templates/NewPropertySubscriber.jsx`)
- **Professional design** matching Landmark Plots branding
- **Property details** including image, title, location, price, and area
- **Call-to-action button** linking to the property page
- **Unsubscribe link** in the footer
- **Responsive design** for mobile and desktop

### 3. Subscriber Notification API (`app/api/property/send-subscriber-notifications/route.js`)
- **Fetches subscribers** from either `subscribers` table or `users` table with `isSubscribed` field
- **Batch processing** of emails with configurable limits
- **Error handling** that doesn't block the main property creation flow
- **Detailed logging** for monitoring and debugging

### 4. Integration with Property Creation (`app/api/property/save-step/route.js`)
- **Triggers automatically** when a property is completed (step 5 with `isComplete = true`)
- **Fire-and-forget approach** - doesn't block the main response
- **Fetches property details** for the notification
- **Error isolation** - notification failures don't affect property creation

### 5. Subscription System
- **Subscription page** (`app/subscribe/page.jsx`) - dedicated page for users to subscribe
- **Newsletter section** (`components/common/NewsletterSection.jsx`) - beautiful full-width section for homepage
- **Newsletter widget** (`components/common/NewsletterWidget.jsx`) - compact widget for sidebar/property pages
- **Subscription API** (`app/api/subscribers/subscribe/route.js`) - handles new subscriptions
- **Email validation** and duplicate handling

### 6. Unsubscribe System
- **API endpoint** (`app/api/subscribers/unsubscribe/route.js`) for handling unsubscribe requests
- **Unsubscribe page** (`app/unsubscribe/page.jsx`) for user-friendly unsubscribing
- **Token-based verification** (optional) for enhanced security
- **Fallback support** for both `subscribers` and `users` tables

### 7. Admin Management
- **Admin page** (`app/admin/subscribers/page.jsx`) - view and manage all subscribers
- **Admin API** (`app/api/admin/subscribers/route.js`) - fetch subscribers for admin
- **Unsubscribe functionality** for admins to manage users

## Database Setup

### Option 1: Dedicated Subscribers Table (Recommended)
Run the SQL commands from `subscribers_table.sql`:

```sql
CREATE TABLE IF NOT EXISTS `subscribers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL UNIQUE,
  `name` varchar(255) DEFAULT NULL,
  `is_unsubscribed` tinyint(1) DEFAULT 0,
  `unsubscribe_token` varchar(255) DEFAULT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  INDEX `idx_unsubscribed` (`is_unsubscribed`)
);
```

### Option 2: Users Table Extension
Add a column to the existing users table:

```sql
ALTER TABLE `users` ADD COLUMN `isSubscribed` tinyint(1) DEFAULT 0;
```

## Environment Variables

Add these to your `.env` file:

```env
# Email Configuration
EMAIL_SERVER=smtp.gmail.com
EMAIL_PORT=587
EMAIL_ADMIN_USER=your-email@gmail.com
EMAIL_ADMIN_PASSWORD=your-app-password
EMAIL_USER_NAME=Landmark Plots

# Base URL for links
BASE_URL=https://landmarkplots.com

# Admin email for notifications
ADMIN_EMAIL=admin@landmarkplots.com
```

## How It Works

### 1. Subscription Flow
1. Users can subscribe via:
   - **Dedicated subscription page**: `/subscribe`
   - **Homepage newsletter section**: Beautiful full-width section with professional design
   - **Sidebar newsletter widget**: Compact widget for property listing pages
2. Subscription form validates email and name
3. System stores subscriber in database (subscribers table or users table)
4. Confirmation message shown to user

### 2. Property Creation Flow
1. User completes the 5-step property creation process
2. When step 5 is completed with `isComplete = true`, the property is marked as listed (`pro_listed = 1`)
3. The system automatically triggers subscriber notifications asynchronously
4. Property creation response is returned immediately (not blocked by email sending)

### 2. Subscriber Notification Process
1. System fetches all active subscribers from the database
2. For each subscriber, generates a personalized email using the React Email template
3. Sends emails in batches of 50 with 5 concurrent sends
4. Logs success/failure for each email
5. Returns summary of sent/failed emails

### 3. Unsubscribe Process
1. Users click unsubscribe link in email footer
2. Link points to `/unsubscribe?email=user@example.com`
3. Unsubscribe page calls the unsubscribe API
4. User is marked as unsubscribed in the database
5. Confirmation message is shown

## Features

### ✅ Implemented
- **Automatic triggering** when properties are completed
- **Batch email sending** with rate limiting
- **Professional email templates** with property details
- **Unsubscribe functionality** with user-friendly interface
- **Error handling** that doesn't affect main functionality
- **Detailed logging** for monitoring
- **Fallback database queries** for different table structures
- **Non-blocking design** - property creation isn't delayed

### 🔄 Configurable
- **Batch sizes** (default: 50 emails per batch)
- **Concurrency limits** (default: 5 concurrent sends)
- **Delay between batches** (default: 1 second)
- **Email template styling** and branding
- **Database table structure** (subscribers table vs users table)

### 🚀 Future Enhancements
- **Queue system** (BullMQ) for high-volume scenarios
- **Preference-based filtering** (city, property type, price range)
- **Analytics dashboard** for email campaign tracking
- **A/B testing** for email templates
- **SMS notifications** as an alternative
- **Webhook notifications** for third-party integrations

## Testing

### Manual Testing
1. **Add test subscribers** to the database
2. **Complete a property** through the 5-step process
3. **Check logs** for notification sending
4. **Verify emails** are received by subscribers
5. **Test unsubscribe** functionality

### Unit Testing
```javascript
// Mock the email sender
jest.mock('@/app/libs/email', () => ({
  sendBulkEmails: jest.fn().mockResolvedValue({
    sent: 2,
    failed: 0,
    total: 2
  })
}));

// Test the notification API
const response = await fetch('/api/property/send-subscriber-notifications', {
  method: 'POST',
  body: JSON.stringify({ property: mockProperty })
});
```

### Integration Testing
1. **Seed database** with test subscribers
2. **Trigger property creation** via API
3. **Verify emails** are sent to all subscribers
4. **Check unsubscribe** functionality works
5. **Verify error handling** when email service is down

## Monitoring

### Logs to Watch
- `Subscriber notification API called`
- `Found X subscribers from [table]`
- `Starting bulk email send to X recipients`
- `Processing batch X/Y`
- `Bulk email send completed: X sent, Y failed`

### Metrics to Track
- **Subscriber count** over time
- **Email delivery rates** (sent vs failed)
- **Unsubscribe rates** after notifications
- **Property creation to notification delay**
- **Email open rates** (if using email analytics)

## Troubleshooting

### Common Issues

1. **No emails sent**
   - Check if subscribers exist in database
   - Verify email configuration in environment variables
   - Check SMTP server logs

2. **Emails failing**
   - Check SMTP credentials
   - Verify email server settings
   - Check for rate limiting from email provider

3. **Property creation blocked**
   - Check if notification API is responding
   - Verify database connection
   - Check for JavaScript errors in the fetch call

### Debug Commands
```sql
-- Check subscribers
SELECT * FROM subscribers WHERE is_unsubscribed = 0;
SELECT * FROM users WHERE isSubscribed = 1;

-- Check recent properties
SELECT * FROM property_module WHERE pro_listed = 1 ORDER BY pro_creation_date DESC LIMIT 5;
```

## Security Considerations

- **Email validation** on subscriber signup
- **Rate limiting** on unsubscribe requests
- **Token-based unsubscribe** (optional)
- **Input sanitization** for all user inputs
- **HTTPS enforcement** for all unsubscribe links
- **Logging without PII** (avoid logging email addresses in production)

## Performance Considerations

- **Batch processing** prevents overwhelming email servers
- **Concurrency limits** avoid rate limiting
- **Async processing** doesn't block main application
- **Database indexing** on frequently queried fields
- **Connection pooling** for database queries
- **Error isolation** prevents cascading failures
