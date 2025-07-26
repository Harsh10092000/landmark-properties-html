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
    <div className="login-theme-container">
      <div className="login-theme-card">
        <div className="login-theme-header">
          <img src="https://user.landmarkplots.com/favicon.png" alt="Landmark Properties" className="login-theme-logo" />
          <h1 className="login-theme-title">Landmark Properties</h1>
          <p className="login-theme-subtitle">Sign in to continue</p>
        </div>
        {error && (
          <div className="login-theme-error">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="12" fill="#fee2e2"/>
              <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="#e53e3e" strokeWidth="1.5"/>
            </svg>
            <span>{error}</span>
          </div>
        )}
        <form onSubmit={otpSent ? handleSubmit : handleSendOTP} className="login-theme-form">
          <div className="login-theme-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={otpSent}
              className="login-theme-input"
            />
          </div>
          {otpSent && !userExists && (
            <>
              <div className="login-theme-group">
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="login-theme-input"
                />
              </div>
              <div className="login-theme-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="login-theme-input"
                />
              </div>
            </>
          )}
          {otpSent && (
            <div className="login-theme-group">
              <label>OTP Code</label>
              <input
                type="text"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                maxLength={6}
                className="login-theme-input otp-input"
              />
              <div className="login-theme-otp-info">
                <span style={{ color: '#38a169', fontWeight: 500 }}>Check your email for the OTP code</span>
              </div>
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="login-theme-btn"
          >
            {loading ? (
              <span className="login-theme-spinner"></span>
            ) : (
              otpSent ? 'Verify & Continue' : 'Send OTP'
            )}
          </button>
          <div className="login-theme-footer">
            <a href="/" className="login-theme-link">Back to Home</a>
          </div>
        </form>
      </div>
      <style jsx>{`
        .login-theme-container {
          min-height: 100vh;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem 1rem;
        }
        .login-theme-card {
          background: #fff;
          border-radius: 18px;
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.10);
          padding: 2.5rem 2rem 2rem 2rem;
          max-width: 370px;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .login-theme-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 1.5rem;
        }
        .login-theme-logo {
          width: 54px;
          height: 54px;
          border-radius: 12px;
          margin-bottom: 0.5rem;
        }
                 .login-theme-title {
           font-size: 1.8rem;
           font-weight: 800;
           color: #111;
           margin: 0 0 0.2rem 0;
         }
         .login-theme-subtitle {
           color: #e53e3e;
           font-size: 1.3rem;
           font-weight: 600;
           margin-bottom: 0.2rem;
         }
                 .login-theme-error {
           display: flex;
           align-items: center;
           gap: 8px;
           background: #fff5f5;
           color: #e53e3e;
           padding: 10px 14px;
           border-radius: 8px;
           margin-bottom: 1.2rem;
           font-size: 1.1rem;
           font-weight: 500;
         }
        .login-theme-form {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }
        .login-theme-group {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
                 .login-theme-group label {
           font-weight: 700;
           color: #222;
           font-size: 1.1rem;
         }
                 .login-theme-input {
           width: 100%;
           padding: 12px 14px;
           border: 2px solid #e0e0e0;
           border-radius: 8px;
           font-size: 1.1rem;
           background: #fafafa;
           color: #111;
           font-weight: 500;
           transition: border 0.18s;
         }
        .login-theme-input:focus {
          outline: none;
          border-color: #e53e3e;
          background: #fff;
        }
                 .otp-input {
           letter-spacing: 4px;
           text-align: center;
           font-size: 1.4rem;
         }
                 .login-theme-otp-info {
           margin-top: 0.4rem;
           color: #38a169;
           font-size: 1.05rem;
         }
                 .login-theme-btn {
           width: 100%;
           background: #e53e3e;
           color: #fff;
           border: none;
           border-radius: 8px;
           padding: 13px 0;
           font-size: 1.2rem;
           font-weight: 700;
           letter-spacing: 1px;
           margin-top: 0.5rem;
           cursor: pointer;
           transition: background 0.18s;
         }
        .login-theme-btn:hover:not(:disabled) {
          background: #b91c1c;
        }
        .login-theme-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        .login-theme-spinner {
          width: 18px;
          height: 18px;
          border: 2.5px solid #fff;
          border-top: 2.5px solid #e53e3e;
          border-radius: 50%;
          display: inline-block;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .login-theme-footer {
          text-align: center;
          margin-top: 1.1rem;
        }
                 .login-theme-link {
           color: #111;
           text-decoration: underline;
           font-weight: 600;
           font-size: 1.1rem;
           transition: color 0.18s;
         }
        .login-theme-link:hover {
          color: #e53e3e;
        }
        @media (max-width: 600px) {
          .login-theme-card {
            padding: 1.2rem 0.5rem 1.2rem 0.5rem;
            max-width: 98vw;
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