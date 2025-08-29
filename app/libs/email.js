import nodemailer from 'nodemailer';

// Create email transporter for admin emails
const adminTransporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_ADMIN_USER,
    pass: process.env.EMAIL_ADMIN_PASSWORD,
  },
});

// Create email transporter for subscription notifications
const subscribeTransporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_SUBSCRIBE_USER,
    pass: process.env.EMAIL_SUBSCRIBE_PASSWORD,
  },
});

// Create email transporter for bulk emails
const bulkTransporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_BULK_USER,
    pass: process.env.EMAIL_BULK_PASSWORD,
  },
});

// Check email configuration
console.log('Email configuration:', {
  host: process.env.EMAIL_SERVER,
  port: process.env.EMAIL_PORT,
  adminUser: process.env.EMAIL_ADMIN_USER ? 'Set' : 'Not set',
  adminPass: process.env.EMAIL_ADMIN_PASSWORD ? 'Set' : 'Not set',
  subscribeUser: process.env.EMAIL_SUBSCRIBE_USER ? 'Set' : 'Not set',
  subscribePass: process.env.EMAIL_SUBSCRIBE_PASSWORD ? 'Set' : 'Not set',
  bulkUser: process.env.EMAIL_BULK_USER ? 'Set' : 'Not set',
  bulkPass: process.env.EMAIL_BULK_PASSWORD ? 'Set' : 'Not set'
});

/**
 * Send a single email using admin transporter
 * @param {Object} mailOptions - Nodemailer mail options
 * @returns {Promise} - Send result
 */
export const sendEmail = async (mailOptions) => {
  try {
    const result = await adminTransporter.sendMail(mailOptions);
    console.log('Email sent successfully:', {
      to: mailOptions.to,
      subject: mailOptions.subject,
      messageId: result.messageId
    });
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('Failed to send email:', {
      to: mailOptions.to,
      subject: mailOptions.subject,
      error: error.message
    });
    return { success: false, error: error.message };
  }
};

/**
 * Send subscription notification emails
 * @param {Object} mailOptions - Nodemailer mail options
 * @returns {Promise} - Send result
 */
export const sendSubscriptionEmail = async (mailOptions) => {
  try {
    const result = await subscribeTransporter.sendMail(mailOptions);
    console.log('Subscription email sent successfully:', {
      to: mailOptions.to,
      subject: mailOptions.subject,
      messageId: result.messageId
    });
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('Failed to send subscription email:', {
      to: mailOptions.to,
      subject: mailOptions.subject,
      error: error.message
    });
    return { success: false, error: error.message };
  }
};

/**
 * Send bulk emails using bulk transporter
 * @param {Object} mailOptions - Nodemailer mail options
 * @returns {Promise} - Send result
 */
export const sendBulkEmail = async (mailOptions) => {
  try {
    const result = await bulkTransporter.sendMail(mailOptions);
    console.log('Bulk email sent successfully:', {
      to: mailOptions.to,
      subject: mailOptions.subject,
      messageId: result.messageId
    });
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('Failed to send bulk email:', {
      to: mailOptions.to,
      subject: mailOptions.subject,
      error: error.message
    });
    return { success: false, error: error.message };
  }
};

/**
 * Send emails in batches with concurrency control
 * @param {Array} recipients - Array of recipient objects with email and name
 * @param {Function} buildMessage - Function to build mail options for each recipient
 * @param {Object} options - Options for batch sending
 * @returns {Object} - Results summary
 */
export const sendBulkEmails = async (recipients, buildMessage, options = {}) => {
  const {
    batchSize = 50,
    concurrency = 5,
    delayBetweenBatches = 1000 // 1 second delay between batches
  } = options;

  if (!recipients || recipients.length === 0) {
    console.log('No recipients to send emails to');
    return { sent: 0, failed: 0, total: 0 };
  }

  console.log(`Starting bulk email send to ${recipients.length} recipients`);

  const results = {
    sent: 0,
    failed: 0,
    total: recipients.length,
    errors: []
  };

  // Process in batches
  for (let i = 0; i < recipients.length; i += batchSize) {
    const batch = recipients.slice(i, i + batchSize);
    console.log(`Processing batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(recipients.length / batchSize)} (${batch.length} recipients)`);

    // Process batch with concurrency control
    const batchPromises = batch.map(async (recipient, index) => {
      // Add small delay between emails in same batch to avoid rate limiting
      if (index > 0 && index % concurrency === 0) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      try {
        const mailOptions = await buildMessage(recipient);
        const result = await sendBulkEmail(mailOptions);
        
        if (result.success) {
          results.sent++;
        } else {
          results.failed++;
          results.errors.push({
            email: recipient.email,
            error: result.error
          });
        }
      } catch (error) {
        results.failed++;
        results.errors.push({
          email: recipient.email,
          error: error.message
        });
      }
    });

    // Wait for current batch to complete
    await Promise.allSettled(batchPromises);

    // Add delay between batches (except for the last batch)
    if (i + batchSize < recipients.length) {
      await new Promise(resolve => setTimeout(resolve, delayBetweenBatches));
    }
  }

  console.log(`Bulk email send completed: ${results.sent} sent, ${results.failed} failed out of ${results.total} total`);
  return results;
};

export default adminTransporter;
