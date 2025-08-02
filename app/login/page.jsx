"use client";

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = "/";

  const [isNewUser, setIsNewUser] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [userExists, setUserExists] = useState(false);

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const checkUser = await fetch('/api/auth/check-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const userData = await checkUser.json();
      setUserExists(userData.exists);
      setIsNewUser(!userData.exists);
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send OTP');
      setOtpSent(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (!userExists && (!name || !phone)) {
        throw new Error('Name and phone number are required for new users');
      }
      const result = await signIn('credentials', {
        email,
        phone: !userExists ? phone : undefined,
        name: !userExists ? name : undefined,
        otp,
        isNewUser: !userExists,
        redirect: false
      });
      if (result?.error) {
        throw new Error(result.error);
      }
      router.push(callbackUrl);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modern-login-bg">
      <div className="modern-login-card">
        {/* Left Branding Panel */}
        <div className="modern-login-left">
          <div className="modern-login-logo-wrap">
            <img src="https://user.landmarkplots.com/favicon.png" alt="Landmark Properties" className="modern-login-logo" />
          </div>
          <div className="modern-login-brand-title">Landmark Properties</div>
          <div className="modern-login-brand-desc">Find your dream property.<br/>Buy, sell, and manage with confidence.</div>
          <div className="modern-login-brand-footer">&copy; {new Date().getFullYear()} Landmark</div>
        </div>
        {/* Right Form Panel */}
        <div className="modern-login-right">
          <div className="modern-login-form-title">Sign in to your account</div>
          {error && (
            <div className="modern-login-error">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="12" fill="#fee2e2"/>
                <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="#e53e3e" strokeWidth="1.5"/>
              </svg>
              <span>{error}</span>
            </div>
          )}
          <form onSubmit={otpSent ? handleSubmit : handleSendOTP} className="modern-login-form">
            <div className="modern-login-group">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={otpSent}
                className="modern-login-input"
              />
            </div>
            {otpSent && !userExists && (
              <>
                <div className="modern-login-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="modern-login-input"
                  />
                </div>
                <div className="modern-login-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    placeholder="Enter your phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="modern-login-input"
                  />
                </div>
              </>
            )}
            {otpSent && (
              <div className="modern-login-group">
                <label>OTP Code</label>
                <input
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  maxLength={6}
                  className="modern-login-input otp-input"
                />
                <div className="modern-login-otp-info">
                  <span style={{ color: '#38a169', fontWeight: 600 }}>Check your email for the OTP code</span>
                </div>
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="modern-login-btn"
            >
              {loading ? (
                <span className="modern-login-spinner"></span>
              ) : (
                otpSent ? 'Verify & Continue' : 'Send OTP'
              )}
            </button>
            <div className="modern-login-footer">
              <a href="/" className="modern-login-link">Back to Home</a>
            </div>
          </form>
        </div>
      </div>
      <style jsx global>{`
        .modern-login-bg {
          min-height: 100vh !important;
          background: linear-gradient(120deg, #f0f9ff 0%, #ecfdf5 100%) !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          font-family: 'Inter', 'Segoe UI', Arial, sans-serif !important;
          padding: 1rem !important;
          box-sizing: border-box !important;
        }
        
        .modern-login-card {
          display: flex !important;
          background: #fff !important;
          border-radius: 2.5rem !important;
          box-shadow: 0 12px 50px 0 rgba(34,197,94,0.15) !important;
          overflow: hidden !important;
          max-width: 820px !important;
          width: 100% !important;
          min-height: 520px !important;
          position: relative !important;
        }
        
        .modern-login-left {
          background: linear-gradient(135deg, #22c55e 0%, #15803d 100%) !important;
          color: #fff !important;
          flex: 1.1 !important;
          display: flex !important;
          flex-direction: column !important;
          align-items: center !important;
          justify-content: center !important;
          padding: 2.5rem 2rem 2rem 2rem !important;
          position: relative !important;
        }
        
        .modern-login-left::before {
          content: '' !important;
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          right: 0 !important;
          bottom: 0 !important;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.1"/><circle cx="50" cy="10" r="0.5" fill="white" opacity="0.1"/><circle cx="10" cy="60" r="0.5" fill="white" opacity="0.1"/><circle cx="90" cy="40" r="0.5" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>') !important;
          opacity: 0.3 !important;
        }
        
        .modern-login-logo-wrap {
          background: #fff !important;
          border-radius: 1.2rem !important;
          padding: 0.7rem !important;
          margin-bottom: 1.2rem !important;
          box-shadow: 0 2px 12px 0 rgba(34,197,94,0.08) !important;
          position: relative !important;
          z-index: 1 !important;
        }
        
        .modern-login-logo {
          width: 54px !important;
          height: 54px !important;
          border-radius: 10px !important;
          display: block !important;
        }
        
        .modern-login-brand-title {
          font-size: 2.1rem !important;
          font-weight: 900 !important;
          letter-spacing: 1px !important;
          margin-bottom: 0.7rem !important;
          color: #fff !important;
          text-shadow: 0 2px 8px rgba(0,0,0,0.10) !important;
          position: relative !important;
          z-index: 1 !important;
        }
        
        .modern-login-brand-desc {
          font-size: 1.18rem !important;
          font-weight: 500 !important;
          margin-bottom: 2.2rem !important;
          color: #fff !important;
          opacity: 0.97 !important;
          text-align: center !important;
          position: relative !important;
          z-index: 1 !important;
        }
        
        .modern-login-brand-footer {
          font-size: 1.02rem !important;
          color: #fff !important;
          opacity: 0.7 !important;
          position: absolute !important;
          bottom: 1.2rem !important;
          left: 0 !important;
          right: 0 !important;
          text-align: center !important;
          position: relative !important;
          z-index: 1 !important;
        }
        
        .modern-login-right {
          flex: 1.3 !important;
          background: #fff !important;
          display: flex !important;
          flex-direction: column !important;
          justify-content: center !important;
          align-items: center !important;
          padding: 2.5rem 2.2rem 2rem 2.2rem !important;
          min-width: 320px !important;
        }
        
        .modern-login-form-title {
          font-size: 2rem !important;
          font-weight: 800 !important;
          color: #111 !important;
          margin-bottom: 1.8rem !important;
          letter-spacing: 0.5px !important;
        }
        
        .modern-login-error {
          display: flex !important;
          align-items: center !important;
          gap: 8px !important;
          background: #fef2f2 !important;
          color: #dc2626 !important;
          padding: 14px 18px !important;
          border-radius: 10px !important;
          margin-bottom: 1.2rem !important;
          font-size: 1.2rem !important;
          font-weight: 500 !important;
        }
        
        .modern-login-form {
          width: 100% !important;
          display: flex !important;
          flex-direction: column !important;
          gap: 1.25rem !important;
        }
        
        .modern-login-group {
          display: flex !important;
          flex-direction: column !important;
          gap: 0.4rem !important;
        }
        
        .modern-login-group label {
          font-weight: 700 !important;
          color: #111 !important;
          font-size: 1.25rem !important;
        }
        
        .modern-login-input {
          width: 100% !important;
          padding: 15px 18px !important;
          border: 2px solid #e0e0e0 !important;
          border-radius: 12px !important;
          font-size: 1.2rem !important;
          background: #fafafa !important;
          color: #111 !important;
          font-weight: 500 !important;
          transition: border 0.18s, box-shadow 0.18s !important;
          box-shadow: 0 1px 4px 0 rgba(31,38,135,0.04) !important;
          box-sizing: border-box !important;
        }
        
        .modern-login-input:focus {
          outline: none !important;
          border-color: #22c55e !important;
          background: #fff !important;
          box-shadow: 0 2px 8px 0 rgba(34,197,94,0.08) !important;
        }
        
        .otp-input {
          letter-spacing: 4px !important;
          text-align: center !important;
          font-size: 1.3rem !important;
        }
        
        .modern-login-otp-info {
          margin-top: 0.4rem !important;
          color: #16a34a !important;
          font-size: 1.15rem !important;
        }
        
        .modern-login-btn {
          width: 100% !important;
          background: linear-gradient(90deg, #22c55e 0%, #15803d 100%) !important;
          color: #fff !important;
          border: none !important;
          border-radius: 12px !important;
          padding: 18px 0 !important;
          font-size: 1.3rem !important;
          font-weight: 800 !important;
          letter-spacing: 1px !important;
          margin-top: 0.5rem !important;
          cursor: pointer !important;
          transition: background 0.18s, box-shadow 0.18s !important;
          box-shadow: 0 2px 8px 0 rgba(34,197,94,0.08) !important;
        }
        
        .modern-login-btn:hover:not(:disabled) {
          background: linear-gradient(90deg, #16a34a 0%, #15803d 100%) !important;
        }
        
        .modern-login-btn:disabled {
          opacity: 0.7 !important;
          cursor: not-allowed !important;
        }
        
        .modern-login-spinner {
          width: 20px !important;
          height: 20px !important;
          border: 2.5px solid #fff !important;
          border-top: 2.5px solid #22c55e !important;
          border-radius: 50% !important;
          display: inline-block !important;
          animation: spin 1s linear infinite !important;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .modern-login-footer {
          text-align: center !important;
          margin-top: 1.1rem !important;
        }
        
        .modern-login-link {
          color: #111 !important;
          text-decoration: underline !important;
          font-weight: 700 !important;
          font-size: 1.2rem !important;
          transition: color 0.18s !important;
        }
        
        .modern-login-link:hover {
          color: #22c55e !important;
        }
        
        /* Mobile Responsive Styles */
        @media (max-width: 1024px) {
          .modern-login-bg {
            padding: 1rem !important;
          }
          
          .modern-login-card {
            max-width: 90vw !important;
            width: 90vw !important;
          }
        }
        
        @media (max-width: 768px) {
          .modern-login-bg {
            padding: 0.5rem !important;
            align-items: flex-start !important;
            padding-top: 2rem !important;
          }
          
          .modern-login-card {
            flex-direction: column !important;
            width: 95vw !important;
            max-width: 95vw !important;
            min-height: auto !important;
            border-radius: 1.5rem !important;
          }
          
          .modern-login-left, .modern-login-right {
            width: 100% !important;
            flex: none !important;
            border-radius: 1.5rem !important;
          }
          
          .modern-login-left {
            min-height: 180px !important;
            padding: 2rem 1.5rem 1.5rem 1.5rem !important;
            order: 1 !important;
          }
          
          .modern-login-right {
            order: 2 !important;
            padding: 2rem 1.5rem 2rem 1.5rem !important;
            min-width: auto !important;
          }
          
          .modern-login-brand-title {
            font-size: 1.8rem !important;
          }
          
          .modern-login-brand-desc {
            font-size: 1rem !important;
            margin-bottom: 1.5rem !important;
          }
          
          .modern-login-form-title {
            font-size: 1.6rem !important;
            margin-bottom: 1.5rem !important;
          }
          
          .modern-login-input {
            padding: 14px 16px !important;
            font-size: 1.1rem !important;
          }
          
          .modern-login-btn {
            padding: 16px 0 !important;
            font-size: 1.2rem !important;
          }
          
          .modern-login-group label {
            font-size: 1.1rem !important;
          }
        }
        
        @media (max-width: 480px) {
          .modern-login-bg {
            padding: 0.25rem !important;
            padding-top: 1rem !important;
          }
          
          .modern-login-card {
            width: 98vw !important;
            max-width: 98vw !important;
            border-radius: 1rem !important;
            box-shadow: 0 8px 30px 0 rgba(34,197,94,0.12) !important;
          }
          
          .modern-login-left, .modern-login-right {
            border-radius: 1rem !important;
            padding: 1.5rem 1rem 1.5rem 1rem !important;
          }
          
          .modern-login-left {
            min-height: 140px !important;
            padding: 1.5rem 1rem 1rem 1rem !important;
          }
          
          .modern-login-logo-wrap {
            padding: 0.5rem !important;
            margin-bottom: 1rem !important;
          }
          
          .modern-login-logo {
            width: 45px !important;
            height: 45px !important;
          }
          
          .modern-login-brand-title {
            font-size: 1.5rem !important;
            margin-bottom: 0.5rem !important;
          }
          
          .modern-login-brand-desc {
            font-size: 0.9rem !important;
            margin-bottom: 1rem !important;
          }
          
          .modern-login-form-title {
            font-size: 1.4rem !important;
            margin-bottom: 1.2rem !important;
          }
          
          .modern-login-input {
            padding: 12px 14px !important;
            font-size: 1rem !important;
            border-radius: 10px !important;
          }
          
          .modern-login-btn {
            padding: 14px 0 !important;
            font-size: 1.1rem !important;
            border-radius: 10px !important;
          }
          
          .modern-login-group {
            gap: 0.3rem !important;
          }
          
          .modern-login-group label {
            font-size: 1rem !important;
          }
          
          .modern-login-error {
            padding: 12px 14px !important;
            font-size: 1rem !important;
            margin-bottom: 1rem !important;
          }
          
          .modern-login-otp-info {
            font-size: 1rem !important;
          }
          
          .modern-login-link {
            font-size: 1rem !important;
          }
          
          .modern-login-form {
            gap: 1rem !important;
          }
        }
        
        @media (max-width: 360px) {
          .modern-login-bg {
            padding: 0.1rem !important;
            padding-top: 0.5rem !important;
          }
          
          .modern-login-card {
            width: 99vw !important;
            max-width: 99vw !important;
            border-radius: 0.8rem !important;
          }
          
          .modern-login-left, .modern-login-right {
            padding: 1.2rem 0.8rem 1.2rem 0.8rem !important;
            border-radius: 0.8rem !important;
          }
          
          .modern-login-left {
            min-height: 120px !important;
            padding: 1.2rem 0.8rem 0.8rem 0.8rem !important;
          }
          
          .modern-login-brand-title {
            font-size: 1.3rem !important;
          }
          
          .modern-login-brand-desc {
            font-size: 0.85rem !important;
          }
          
          .modern-login-form-title {
            font-size: 1.2rem !important;
          }
          
          .modern-login-input {
            padding: 10px 12px !important;
            font-size: 0.95rem !important;
          }
          
          .modern-login-btn {
            padding: 12px 0 !important;
            font-size: 1rem !important;
          }
          
          .modern-login-group label {
            font-size: 0.95rem !important;
          }
        }
        
        @media (max-width: 320px) {
          .modern-login-bg {
            padding: 0 !important;
            padding-top: 0.25rem !important;
          }
          
          .modern-login-card {
            width: 100vw !important;
            max-width: 100vw !important;
            border-radius: 0 !important;
            margin: 0 !important;
          }
          
          .modern-login-left, .modern-login-right {
            padding: 1rem 0.6rem 1rem 0.6rem !important;
            border-radius: 0 !important;
          }
          
          .modern-login-left {
            min-height: 100px !important;
            padding: 1rem 0.6rem 0.6rem 0.6rem !important;
          }
          
          .modern-login-brand-title {
            font-size: 1.2rem !important;
          }
          
          .modern-login-brand-desc {
            font-size: 0.8rem !important;
          }
          
          .modern-login-form-title {
            font-size: 1.1rem !important;
          }
          
          .modern-login-input {
            padding: 8px 10px !important;
            font-size: 0.9rem !important;
          }
          
          .modern-login-btn {
            padding: 10px 0 !important;
            font-size: 0.95rem !important;
          }
          
          .modern-login-group label {
            font-size: 0.9rem !important;
          }
        }
      `}</style>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}   