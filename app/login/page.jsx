"use client";

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  //const callbackUrl = "/";
  const callbackUrl = searchParams.get('callbackUrl') || "/";
  console.log("callbackUrl : ", callbackUrl);

  //const [callbackUrl, setCallbackUrl] = useState("/");
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
        redirect: true,
        callbackUrl: callbackUrl,
      });
      if (result?.error) {
        throw new Error(result.error);
      }
      //router.push(callbackUrl);
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
      <style jsx>{`
        .modern-login-bg {
          min-height: 100vh;
          background: linear-gradient(120deg, #fff 0%, #f8f8f8 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
        }
                 .modern-login-card {
           display: flex;
           background: #fff;
           border-radius: 2.5rem;
           box-shadow: 0 12px 50px 0 rgba(31,38,135,0.15);
           overflow: hidden;
           max-width: 820px;
           width: 100%;
           min-height: 520px;
           position: relative;
         }
                 .modern-login-left {
           background: linear-gradient(135deg, #00a147 0%, #111 100%);
           color: #fff;
           flex: 1.1;
           display: flex;
           flex-direction: column;
           align-items: center;
           justify-content: center;
           padding: 2.5rem 2rem 2rem 2rem;
           position: relative;
           position: relative;
         }
         .modern-login-left::before {
           content: '';
           position: absolute;
           top: 0;
           left: 0;
           right: 0;
           bottom: 0;
     
           opacity: 0.3;
         }
                 .modern-login-logo-wrap {
           background: #fff;
           border-radius: 1.2rem;
           padding: 0.7rem;
           margin-bottom: 1.2rem;
           box-shadow: 0 2px 12px 0 rgba(229,62,62,0.08);
           position: relative;
           z-index: 1;
         }
        .modern-login-logo {
          width: 54px;
          height: 54px;
          border-radius: 10px;
          display: block;
        }
                 .modern-login-brand-title {
           font-size: 2.1rem;
           font-weight: 900;
           letter-spacing: 1px;
           margin-bottom: 0.7rem;
           color: #fff;
           text-shadow: 0 2px 8px rgba(0,0,0,0.10);
           position: relative;
           z-index: 1;
         }
                 .modern-login-brand-desc {
           font-size: 13px;
           font-weight: 500;
           margin-bottom: 2.2rem;
           color: #fff;
           opacity: 0.97;
           text-align: center;
           position: relative;
           z-index: 1;
         }
                 .modern-login-brand-footer {
           font-size: 11px;
           color: #fff;
           opacity: 0.7;
           position: absolute;
           bottom: 1.2rem;
           left: 0;
           right: 0;
           text-align: center;
           position: relative;
           z-index: 1;
         }
        .modern-login-right {
          flex: 1.3;
          background: #fff;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 2.5rem 2.2rem 2rem 2.2rem;
          min-width: 320px;
        }
                 .modern-login-form-title {
           font-size: 2rem;
           font-weight: 800;
           color: #111;
           margin-bottom: 1.8rem;
           letter-spacing: 0.5px;
         }
                 .modern-login-error {
           display: flex;
           align-items: center;
           gap: 8px;
           background: #fff5f5;
           color: #e53e3e;
           padding: 14px 18px;
           border-radius: 10px;
           margin-bottom: 1.2rem;
           font-size: 1.2rem;
           font-weight: 500;
         }
        .modern-login-form {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .modern-login-group {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
                 .modern-login-group label {
           font-weight: 700;
           color: #111;
           font-size: 1.25rem;
         }
                 .modern-login-input {
           width: 100%;
           padding: 15px 18px;
           border: 2px solid #e0e0e0;
           border-radius: 12px;
           font-size: 1.2rem;
           background: #fafafa;
           color: #111;
           font-weight: 500;
           transition: border 0.18s, box-shadow 0.18s;
           box-shadow: 0 1px 4px 0 rgba(31,38,135,0.04);
         }
        .modern-login-input:focus {
          outline: none;
          border-color: #00a147;
          background: #fff;
          box-shadow: 0 2px 8px 0 rgba(229,62,62,0.08);
        }
        .otp-input {
          letter-spacing: 4px;
          text-align: center;
          font-size: 1.3rem;
        }
                 .modern-login-otp-info {
           margin-top: 0.4rem;
           color: #38a169;
           font-size: 1.15rem;
         }
                 .modern-login-btn {
           width: 100%;
           background: linear-gradient(90deg, #00a147 0%, #111 100%);
           color: #fff;
           border: none;
           border-radius: 12px;
           padding: 18px 0;
           font-size: 1.3rem;
           font-weight: 800;
           letter-spacing: 1px;
           margin-top: 0.5rem;
           cursor: pointer;
           transition: background 0.18s, box-shadow 0.18s;
           box-shadow: 0 2px 8px 0 rgba(229,62,62,0.08);
         }
        .modern-login-btn:hover:not(:disabled) {
          background: linear-gradient(90deg, #00a147 0%, #111 100%);
        }
        .modern-login-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        .modern-login-spinner {
          width: 20px;
          height: 20px;
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
        .modern-login-footer {
          text-align: center;
          margin-top: 1.1rem;
        }
                 .modern-login-link {
           color: #111;
           text-decoration: underline;
           font-weight: 700;
           font-size: 1.2rem;
           transition: color 0.18s;
         }
        .modern-login-link:hover {
          color: #e53e3e;
        }
        @media (max-width: 900px) {
         .modern-login-bg {
            min-height: auto !important;
         }
          .modern-login-card {
          
          margin: 20px 30px;
        padding: 10px;
            flex-direction: column;
            // min-width: 90vw;
            // max-width: 98vw;
            border-radius: 1.2rem;
          }
          .modern-login-left, .modern-login-right {
            border-radius: 1.2rem;
            // min-width: 90vw;
            // max-width: 98vw;
            margin-bottom: 1.5rem;
            padding: 2rem 1.2rem 1.5rem 1.2rem;
          }
          .modern-login-left {
            min-height: 180px;
            padding-bottom: 1.2rem;
          }
        }
        @media (max-width: 600px) {
          .modern-login-card {
            // padding: 0;
            // min-width: 98vw;
            // max-width: 100vw;
          }
          .modern-login-left, .modern-login-right {
            padding: 1.2rem 0.5rem 1.2rem 0.5rem;
            // min-width: 98vw;
            // max-width: 100vw;
          }
        }
      `}</style>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div></div>}>
      <LoginForm />
    </Suspense>
  );
}   