"use client";

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

// Separate component to handle useSearchParams
function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  
  console.log("callbackUrl : ", callbackUrl);

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
      // First check if user exists
      const checkUser = await fetch('/api/auth/check-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const userData = await checkUser.json();
      setUserExists(userData.exists);
      setIsNewUser(!userData.exists);

      // Then send OTP
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
      // Validate required fields for new users
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
    <div
      className="tu-main-login"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--color-offwhite, #f8f9fa)', // fallback if variable not set
        padding: '2rem 0',
      }}
    >
      <div
        className="tu-login-left"
        style={{
          background: 'linear-gradient(135deg, var(--color-accent-2, #4e54c8) 0%, var(--color-accent-2, #8f94fb) 100%)',
          color: '#fff',
          borderRadius: '1.5rem 0 0 1.5rem',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
          padding: '3rem 2.5rem',
          minWidth: 340,
          maxWidth: 400,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <figure style={{ marginBottom: 24 }}>
          <img
            src="/images/login-img.png"
            alt="Login"
            style={{ width: 180, height: 'auto', borderRadius: 12, boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}
          />
        </figure>
        <div className="tu-login-left_title" style={{ textAlign: 'center' }}>
          <h2 style={{ fontWeight: 700, fontSize: 28, marginBottom: 8 }}>Welcome to <span style={{ color: 'var(--color-accent-2, #8f94fb)' }}>Landmark Properties</span></h2>
          <span style={{ fontSize: 16, opacity: 0.95 }}>Find your perfect property and start your journey today!</span>
        </div>
      </div>
      <div
        className="tu-login-right"
        style={{
          background: '#fff',
          borderRadius: '0 1.5rem 1.5rem 0',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.10)',
          padding: '3rem 2.5rem',
          minWidth: 340,
          maxWidth: 400,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <div className="tu-login-right_title" style={{ marginBottom: 24, textAlign: 'center' }}>
          <h2 style={{ fontWeight: 700, fontSize: 24, marginBottom: 4 }}>{!userExists ? 'Create Account' : 'Login'}</h2>
          {!otpSent && (
            <p style={{ color: 'var(--color-accent-2, #4e54c8)', fontWeight: 500, fontSize: 15, margin: 0 }}>Enter your email to continue</p>
          )}
        </div>

        {error && (
          <div className="tu-alert tu-alert-danger" style={{ marginBottom: 16, borderRadius: 8, background: '#ffeaea', color: '#d32f2f', padding: '0.75rem 1rem', fontWeight: 500, fontSize: 15 }}>
            <p style={{ margin: 0 }}>{error}</p>
          </div>
        )}

        <form onSubmit={otpSent ? handleSubmit : handleSendOTP}>
          <div className="tu-login-form">
            <div className="form-group" style={{ marginBottom: 18 }}>
              <label style={{ fontWeight: 600, marginBottom: 6, display: 'block' }}>Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={otpSent}
                style={{ borderRadius: 8, border: '1px solid #e0e0e0', padding: '0.75rem 1rem', fontSize: 15 }}
              />
            </div>

            {otpSent && !userExists && (
              <>
                <div className="form-group" style={{ marginBottom: 18 }}>
                  <label style={{ fontWeight: 600, marginBottom: 6, display: 'block' }}>Full name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    style={{ borderRadius: 8, border: '1px solid #e0e0e0', padding: '0.75rem 1rem', fontSize: 15 }}
                  />
                </div>
                <div className="form-group" style={{ marginBottom: 18 }}>
                  <label style={{ fontWeight: 600, marginBottom: 6, display: 'block' }}>Phone number</label>
                  <input
                    type="tel"
                    className="form-control"
                    placeholder="Enter phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    style={{ borderRadius: 8, border: '1px solid #e0e0e0', padding: '0.75rem 1rem', fontSize: 15 }}
                  />
                </div>
              </>
            )}

            {otpSent && (
              <div className="form-group" style={{ marginBottom: 18 }}>
                <label style={{ fontWeight: 600, marginBottom: 6, display: 'block' }}>Enter OTP</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter OTP sent to your email"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  style={{ borderRadius: 8, border: '1px solid #e0e0e0', padding: '0.75rem 1rem', fontSize: 15, letterSpacing: 2, textAlign: 'center' }}
                />
              </div>
            )}

            <button
              type="submit"
              className="tu-primbtn-lg"
              disabled={loading}
              style={{
                width: '100%',
                background: 'linear-gradient(90deg, var(--color-accent-2, #4e54c8) 0%, var(--color-accent-2, #8f94fb) 100%)',
                color: '#fff',
                fontWeight: 700,
                fontSize: 17,
                border: 'none',
                borderRadius: 8,
                padding: '0.85rem 0',
                marginTop: 8,
                marginBottom: 10,
                boxShadow: '0 2px 8px rgba(78,84,200,0.10)',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'background 0.2s',
              }}
            >
              {loading ? 'Please wait...' : otpSent ? 'Verify OTP' : 'Continue'}
            </button>

            <div className="tu-lost-password form-group" style={{ textAlign: 'center', marginTop: 10 }}>
              <a href="/" className="tu-password-clr_light" style={{ color: 'var(--color-accent-2, #4e54c8)', textDecoration: 'underline', fontWeight: 500 }}>Back to Home</a>
            </div>
          </div>
        </form>
      </div>
      {/* Responsive stacking for mobile */}
      <style jsx>{`
        @media (max-width: 900px) {
          .tu-main-login {
            flex-direction: column !important;
            padding: 1.5rem 0 !important;
          }
          .tu-login-left, .tu-login-right {
            border-radius: 1.5rem !important;
            min-width: 90vw !important;
            max-width: 98vw !important;
            margin-bottom: 1.5rem;
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