'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import './newsletter-section.css';

const NewsletterSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const router = useRouter();



  // Local fallbacks
  const localValidateName = (value) => {
    const trimmed = (value || '').trim();
    if (!trimmed) return { ok: false, message: 'Name is required.' };
    if (trimmed.length < 2) return { ok: false, message: 'Name must be at least 2 characters.' };
    if (trimmed.length > 50) return { ok: false, message: 'Name must be at most 50 characters.' };
    if (!/^[a-zA-Z\s]+$/.test(trimmed)) return { ok: false, message: 'Name can contain only letters and spaces.' };
    return { ok: true, message: null };
  };

  const localValidateEmail = (value) => {
    const trimmed = (value || '').trim();
    if (!trimmed) return { ok: false, message: 'Email is required.' };
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9\-]+(\.[a-zA-Z0-9\-]+)+$/;
    if (!emailRegex.test(trimmed)) return { ok: false, message: 'Enter a valid email address.' };
    if (trimmed.length > 320) return { ok: false, message: 'Email is too long.' };
    return { ok: true, message: null };
  };

  const validateField = async (name, value) => {
    const fb = name === 'name' ? localValidateName(value) : localValidateEmail(value);
    setErrors(prev => ({ ...prev, [name]: fb.ok ? null : fb.message }));
    return fb.ok;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const handleBlur = async (e) => {
    const { name, value } = e.target;
    await validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    setMessageType('');
    setErrors({});

    const nameValid = await validateField('name', formData.name);
    const emailValid = await validateField('email', formData.email);
    if (!nameValid || !emailValid) { setIsLoading(false); return; }

    try {
      const response = await fetch('/api/subscribers/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        setMessageType('success');
        setFormData({ name: '', email: '' });
        setErrors({});
      } else {
        setMessage(data.error || 'Subscription failed.');
        setMessageType('error');
      }
    } catch (error) {
      setMessage('Something went wrong. Please try again.');
      setMessageType('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="ns-wrap">
      <div className="ns-backdrop" />
      <div className="ns-container">
        <div className="ns-header">
          <div className="ns-emoji" aria-hidden>🏠</div>
          <h2 className="ns-title">Stay Updated with New Properties!</h2>
          <p className="ns-subtitle">Subscribe to our newsletter and be the first to know about new residential, commercial, and land properties in your area.</p>
        </div>

        <div className="ns-card">
          <form onSubmit={handleSubmit} className="ns-form">
            <div className="ns-grid">
              <div className="ns-field">
                <label htmlFor="name" className="ns-label">Full Name <span className="ns-required">*</span></label>
                <div className="ns-input-wrap">
                  <span className="ns-input-icon" aria-hidden>👤</span>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    required
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'ns-name-error' : undefined}
                    className={`ns-input ${errors.name ? 'ns-input-error' : ''}`}
                    placeholder="Enter your full name"
                  />
                </div>
                {errors.name && (
                  <p id="ns-name-error" role="alert" className="ns-error-chip"><span>⚠️</span><span>{errors.name}</span></p>
                )}
              </div>

              <div className="ns-field">
                <label htmlFor="email" className="ns-label">Email Address <span className="ns-required">*</span></label>
                <div className="ns-input-wrap">
                  <span className="ns-input-icon" aria-hidden>✉️</span>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    required
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'ns-email-error' : undefined}
                    className={`ns-input ${errors.email ? 'ns-input-error' : ''}`}
                    placeholder="Enter your email address"
                  />
                </div>
                {errors.email && (
                  <p id="ns-email-error" role="alert" className="ns-error-chip"><span>⚠️</span><span>{errors.email}</span></p>
                )}
              </div>
            </div>

            <button type="submit" disabled={isLoading} className="ns-button">
              {isLoading ? (
                <span className="ns-loading"><span className="ns-spinner" /> Subscribing...</span>
              ) : (
                <span className="ns-button-label">Subscribe to Newsletter</span>
              )}
            </button>

            {message && (
              <div role="status" className={`ns-status ${messageType === 'success' ? 'ns-status-success' : 'ns-status-error'}`}>
                {messageType === 'success' ? '✅ ' : '❌ '}{message}
              </div>
            )}

            <p className="ns-privacy">🔒 We respect your privacy. You can unsubscribe at any time.</p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
