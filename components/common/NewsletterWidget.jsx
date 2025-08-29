'use client';

import { useEffect, useState } from 'react';

import styles from './newsletter-widget.module.css';

const NewsletterWidget = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  

  const localValidateName = (value) => {
    const v = (value || '').trim();
    if (!v) return { ok: false, message: 'Name is required.' };
    if (v.length < 2) return { ok: false, message: 'Name must be at least 2 characters.' };
    if (v.length > 50) return { ok: false, message: 'Name must be at most 50 characters.' };
    if (!/^[a-zA-Z\s]+$/.test(v)) return { ok: false, message: 'Name can contain only letters and spaces.' };
    return { ok: true };
  };
  const localValidateEmail = (value) => {
    const v = (value || '').trim();
    if (!v) return { ok: false, message: 'Email is required.' };
    const rx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9\-]+(\.[a-zA-Z0-9\-]+)+$/;
    if (!rx.test(v)) return { ok: false, message: 'Enter a valid email address.' };
    if (v.length > 320) return { ok: false, message: 'Email is too long.' };
    return { ok: true };
  };

  const validateField = async (name, value) => {
    const fb = name === 'name' ? localValidateName(value) : localValidateEmail(value);
    setErrors(p => ({ ...p, [name]: fb.ok ? null : fb.message }));
    return !!fb.ok;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };
  const handleBlur = async (e) => { const { name, value } = e.target; await validateField(name, value); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); setMessage(''); setMessageType(''); setErrors({});
    const okName = await validateField('name', formData.name);
    const okEmail = await validateField('email', formData.email);
    if (!okName || !okEmail) { setIsLoading(false); return; }
    try {
      const response = await fetch('/api/subscribers/subscribe', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) });
      const data = await response.json();
      if (response.ok) { setMessage(data.message); setMessageType('success'); setFormData({ name: '', email: '' }); setErrors({}); }
      else { setMessage(data.error || 'Subscription failed.'); setMessageType('error'); }
    } catch { setMessage('Something went wrong. Please try again.'); setMessageType('error'); } finally { setIsLoading(false); }
  };

  return (
    <div className={styles.nwWrapper}>
      <div className={styles.nwGradientBorder}></div>
      <div className={styles.nwCard}>
        <div className={styles.nwBadge}>Newsletter</div>
        <p className={styles.nwSubtitle}>Subscribe to get property alerts and updates in your inbox.</p>

        <form onSubmit={handleSubmit} className={styles.nwForm}>
          <div className={styles.nwField}>
            <label htmlFor="widget-name" className={styles.nwLabel}>Name <span className={styles.nwRequired}>*</span></label>
            <div className={styles.nwInputWrap}>
              <span className={styles.nwInputIcon} aria-hidden>👤</span>
              <input type="text" id="widget-name" name="name" value={formData.name} onChange={handleInputChange} onBlur={handleBlur} required aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-error' : undefined} className={`${styles.nwInput} ${errors.name ? styles.nwInputError : ''}`} placeholder="Your full name" />
            </div>
            {errors.name && (<p id="name-error" role="alert" className={styles.nwErrorChip}><span className={styles.nwErrorIco}>⚠️</span><span>{errors.name}</span></p>)}
          </div>

          <div className={styles.nwField}>
            <label htmlFor="widget-email" className={styles.nwLabel}>Email <span className={styles.nwRequired}>*</span></label>
            <div className={styles.nwInputWrap}>
              <span className={styles.nwInputIcon} aria-hidden>✉️</span>
              <input type="email" id="widget-email" name="email" value={formData.email} onChange={handleInputChange} onBlur={handleBlur} required aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-error' : undefined} className={`${styles.nwInput} ${errors.email ? styles.nwInputError : ''}`} placeholder="you@example.com" />
            </div>
            {errors.email && (<p id="email-error" role="alert" className={styles.nwErrorChip}><span className={styles.nwErrorIco}>⚠️</span><span>{errors.email}</span></p>)}
          </div>

          <button type="submit" disabled={isLoading} className={styles.nwButton}>
            {isLoading ? (<span className={styles.nwLoading}><span className={styles.nwSpinner} aria-hidden></span> Subscribing...</span>) : (<span className={styles.nwButtonLabel}>Subscribe Now</span>)}
          </button>

          {message && (<div role="status" className={`${styles.nwStatus} ${messageType === 'success' ? styles.nwStatusSuccess : styles.nwStatusError}`}>{messageType === 'success' ? '✅ ' : '❌ '}{message}</div>)}

          <p className={styles.nwPrivacy}>🔒 We respect your privacy. Unsubscribe anytime.</p>
        </form>
      </div>
    </div>
  );
};

export default NewsletterWidget;
