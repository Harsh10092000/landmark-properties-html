"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import './unsubscribe.css';

const UnsubscribeContent = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const token = searchParams.get('token');
  
  const [status, setStatus] = useState('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!email) {
      setStatus('error');
      setMessage('Email parameter is required');
      return;
    }

    const unsubscribe = async () => {
      try {
        const response = await fetch('/api/subscribers/unsubscribe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, token }),
        });

        const data = await response.json();

        if (response.ok) {
          setStatus('success');
          setMessage(data.message || 'Successfully unsubscribed from notifications');
        } else {
          setStatus('error');
          setMessage(data.error || 'Failed to unsubscribe');
        }
      } catch (error) {
        setStatus('error');
        setMessage('An error occurred while processing your request');
      }
    };

    unsubscribe();
  }, [email, token]);

  return (
    <section className="unsub-wrap">
      <div className="unsub-backdrop" />
      <div className="unsub-card">
        <div className="unsub-badge">Unsubscribe</div>

        {status === 'loading' && (
          <div className="unsub-center">
            <div className="unsub-spinner" aria-hidden="true" />
            <p className="unsub-note">Processing your unsubscribe request...</p>
          </div>
        )}

        {status === 'success' && (
          <div className="unsub-center">
            
            <h1 className="unsub-title success">You're unsubscribed</h1>
            <p className="unsub-text">{message}</p>
            <p className="unsub-muted">You will no longer receive property notifications from Landmark Plots.</p>
            <a href="/" className="unsub-btn">Return to Homepage</a>
          </div>
        )}

        {status === 'error' && (
          <div className="unsub-center">
            <div className="unsub-emoji" aria-hidden>⚠️</div>
            <h1 className="unsub-title error">We couldn't process that</h1>
            <p className="unsub-text">{message}</p>
            <p className="unsub-muted">If you continue to receive emails, please contact our support team.</p>
            <a href="/" className="unsub-btn">Return to Homepage</a>
          </div>
        )}
      </div>
    </section>
  );
};

export default function UnsubscribePage() {
  return (
    <Suspense fallback={
      <section className="unsub-wrap">
        <div className="unsub-backdrop" />
        <div className="unsub-card">
          <div className="unsub-badge">Unsubscribe</div>
          <div className="unsub-center">
            <div className="unsub-spinner" aria-hidden="true" />
            <p className="unsub-note">Loading...</p>
          </div>
        </div>
      </section>
    }>
      <UnsubscribeContent />
    </Suspense>
  );
}
