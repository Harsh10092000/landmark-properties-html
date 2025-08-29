"use client";

import { useState } from 'react';

const NewsletterSubscription = ({ variant = 'default' }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  const validate = () => {
    const errs = {};
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName) errs.name = 'Name is required.';
    else if (trimmedName.length < 2) errs.name = 'Name must be at least 2 characters.';
    else if (trimmedName.length > 50) errs.name = 'Name must be at most 50 characters.';

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9\-]+(\.[a-zA-Z0-9\-]+)+$/;
    if (!trimmedEmail) errs.email = 'Email is required.';
    else if (!emailRegex.test(trimmedEmail)) errs.email = 'Enter a valid email address.';

    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setStatus('');

    if (!validate()) return;

    setLoading(true);
    try {
      const response = await fetch('/api/subscribers/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage(data.message || 'Successfully subscribed!');
        setEmail('');
        setName('');
        setFieldErrors({});
      } else {
        setStatus('error');
        setMessage(data.error || 'Failed to subscribe. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderAlerts = () => (
    <>
      {status === 'success' && (
        <div className="alert alert-success alert-sm" role="alert">
          {message}
        </div>
      )}
      {status === 'error' && (
        <div className="alert alert-danger alert-sm" role="alert">
          {message}
        </div>
      )}
    </>
  );

  if (variant === 'footer') {
    return (
      <div className="newsletter-subscription-footer">
        <h5 className="text-white mb-3">Subscribe to Property Updates</h5>
        <p className="text-light mb-3">Get notified about new properties in your area</p>
        {renderAlerts()}
        <form onSubmit={handleSubmit} className="d-flex flex-column gap-2">
          <input
            type="text"
            className={`form-control form-control-sm ${fieldErrors.name ? 'is-invalid' : ''}`}
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {fieldErrors.name && <div className="invalid-feedback d-block">{fieldErrors.name}</div>}
          <input
            type="email"
            className={`form-control form-control-sm ${fieldErrors.email ? 'is-invalid' : ''}`}
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {fieldErrors.email && <div className="invalid-feedback d-block">{fieldErrors.email}</div>}
          <button type="submit" className="btn btn-primary btn-sm" disabled={loading}>
            {loading ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>
      </div>
    );
  }

  if (variant === 'sidebar') {
    return (
      <div className="card">
        <div className="card-body">
          <h6 className="card-title">Property Notifications</h6>
          <p className="card-text small text-muted">Get notified about new properties</p>
          {renderAlerts()}
          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <input
                type="text"
                className={`form-control form-control-sm ${fieldErrors.name ? 'is-invalid' : ''}`}
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {fieldErrors.name && <div className="invalid-feedback d-block">{fieldErrors.name}</div>}
            </div>
            <div className="mb-3">
              <input
                type="email"
                className={`form-control form-control-sm ${fieldErrors.email ? 'is-invalid' : ''}`}
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {fieldErrors.email && <div className="invalid-feedback d-block">{fieldErrors.email}</div>}
            </div>
            <button type="submit" className="btn btn-primary btn-sm w-100" disabled={loading}>
              {loading ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div className="newsletter-subscription">
      <div className="text-center mb-4">
        <h4>Stay Updated with New Properties</h4>
        <p className="text-muted">Subscribe to get notified about new properties in your area</p>
      </div>
      {renderAlerts()}
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <input
            type="text"
            className={`form-control ${fieldErrors.name ? 'is-invalid' : ''}`}
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {fieldErrors.name && <div className="invalid-feedback d-block">{fieldErrors.name}</div>}
        </div>
        <div className="col-md-6">
          <input
            type="email"
            className={`form-control ${fieldErrors.email ? 'is-invalid' : ''}`}
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {fieldErrors.email && <div className="invalid-feedback d-block">{fieldErrors.email}</div>}
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? 'Subscribing...' : 'Subscribe to Notifications'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewsletterSubscription;
