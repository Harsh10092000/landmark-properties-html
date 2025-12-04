import React from 'react'
import { siteConfig } from '@/app/config/site'

const QuickListingFaq = () => {
  const {
    contact: { phone, email },
  } = siteConfig;

  return (
    <>
      <section className="sect-padding">
        <div className="container">
          <h2 className="mb-3 hsvp-h2">Quick Listing – Frequently Asked Questions</h2>
          <div className="row">
            <div className="col-lg-6">
              <div className="accordion__wrapper">
                {[
                  {
                    q: "How do I list my property fast in Haryana?",
                    a: "Open Quick Listing, add price, area and location, upload photos and submit. Your LM‑ID URL is created instantly and the page goes live."
                  },
                  {
                    q: "Do I need to login to submit?",
                    a: "You can fill the form without login. On submit, we prompt login and auto-submit with your saved data."
                  },
                  {
                    q: "What images are supported?",
                    a: "JPG, PNG, and WEBP up to 1MB each. Add a cover image and up to 10 other photos."
                  },
                  {
                    q: "Can I set price as negotiable?",
                    a: "Yes, you can toggle 'Price Negotiable' in the form before publishing."
                  },
                  {
                    q: "Will my listing have an SEO/RAO‑friendly URL?",
                    a: "Yes. We generate a clean city/location URL and append your unique LM‑XXXXXXX ID to make sharing and tracking easy."
                  },
                  {
                    q: "Which locations are supported?",
                    a: "Haryana cities, sub‑districts and HSVP sectors with PIN code and locality support."
                  }
                ].map((item, idx) => (
                  <details key={idx} className="hsvp-faq">
                    <summary className="hsvp-faq-q">{item.q}</summary>
                    <div className="hsvp-faq-a">{item.a}</div>
                  </details>
                ))}
              </div>
            </div>
            <div className="col-lg-6">
              <div className="accordion__wrapper">
                {[
                  {
                    q: "How long does publishing take?",
                    a: "It’s instant after successful submission. You receive a public, shareable LM‑ID URL."
                  },
                  {
                    q: "Can I edit my listing after publishing?",
                    a: "Yes, after publishing you can request edits or updates to price, images, and description by contacting our support."
                  },
                  {
                    q: "What happens if I’m not logged in?",
                    a: "We save your form locally. After login/registration, your data is restored and auto‑submitted."
                  },
                  {
                    q: "How do I get more leads?",
                    a: "Add high-quality photos, set competitive pricing, choose accurate location, and write a detailed description."
                  },
                  {
                    q: "Is there a mobile app?",
                    a: "Our responsive web app works great on mobile. Native apps are planned."
                  },
                  {
                    q: "How do I contact support?",
                    a: `Reach us at ${phone} or ${email} for any assistance with your listing.`
                  }
                  ].map((item, idx) => (
                  <details key={idx} className="hsvp-faq">
                    <summary className="hsvp-faq-q">{item.q}</summary>
                    <div className="hsvp-faq-a">{item.a}</div>
                    </details>
                  ))}
                </div>
            </div>
            </div>
          </div>
      </section>

      <style jsx>{`
        .sect-padding {
          padding-top: 20px;
          padding-bottom: 20px;
        }
        .hsvp-h2 {
          font-weight: 800;
          font-size: clamp(18px, 2.4vw, 26px);
          margin-top: 22px;
          margin-bottom: 10px;
          color: #0f172a;
        }
        .hsvp-faq {
          margin-bottom: 10px;
          padding: 14px 16px;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          background: #fff;
          box-shadow: 0 4px 16px rgba(2, 6, 23, 0.05);
          transition: all 0.2s ease;
        }
        .hsvp-faq:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(2, 6, 23, 0.08);
        }
        .hsvp-faq summary::-webkit-details-marker {
          display: none;
        }
        .hsvp-faq summary::before {
          content: "▶";
          color: #1a9050;
          margin-right: 8px;
          font-size: 12px;
          transition: transform 0.2s ease;
        }
        /* Remove default marker in Firefox/others to avoid double arrows */
        .hsvp-faq summary { list-style: none; }
        .hsvp-faq[open] summary::before {
          transform: rotate(90deg);
        }
        .hsvp-faq-q {
          cursor: pointer;
          font-weight: 700;
          color: #0f172a;
          font-size: 15px;
          line-height: 1.4;
        }
        .hsvp-faq-a {
          margin-top: 8px;
          color: #475569;
          font-size: 14px;
          line-height: 1.5;
        }
        @media (max-width: 768px) {
          .col-lg-6 {
            margin-bottom: 1rem;
          }
        }
      `}</style>
    </>
  )
}

export default QuickListingFaq