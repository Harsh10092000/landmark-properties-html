import nodemailer from 'nodemailer';
import Otp from '../../mail-templates/Otp';
import { render } from '@react-email/components';


// Create email transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Generate OTP
export function generateOTP() {
  // Generate a 6-digit number
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  console.log('Generated new OTP:', otp);
  return otp;
}

// Send OTP via email
export async function sendOTPEmail(email, otp) {
  console.log('Sending OTP email:', {
    to: email,
    otp: otp
  });

  // Use a React element, not a function call
  const html = await render(<Otp otp={otp} contactEmail={process.env.contactEmail || 'support@landmarkplots.com'} />);

  const mailOptions = {
    from: `${process.env.EMAIL_USER_NAME} <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Your Login OTP - ' + otp,
    html: html
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('OTP email sent successfully');
  } catch (error) {
    console.error('Failed to send OTP email:', error);
    throw error;
  }
} 