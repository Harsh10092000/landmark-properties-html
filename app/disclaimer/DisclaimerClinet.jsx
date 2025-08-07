"use client"
import React from 'react';
import Link from 'next/link';


const DisclaimerClinet = () => {
  return (
    <>
      <div className="disclaimer-page">
        <div className="container">
          <div className="disclaimer-content">
            <div className="disclaimer-header">
              <h1 className="disclaimer-title">Disclaimer</h1>
              <div className="disclaimer-divider"></div>
            </div>
            
            <div className="disclaimer-text">
              <p>
                All images/information provided in this listing given by its owner, brokers or builders may be actual or used for illustrative purposes only and may not represent real individuals, places, or events. In real, images/information about this property may vary.
              </p>
              
              <p>
                Kindly verify the physical possession of the property and its owners and property documents and cross-check everything before any transaction. The company is not responsible for discrepancies found at any stage.
              </p>
              
              <p>
                Any resemblance to actual persons or copyrighted materials is purely coincidental. Unauthorized use or reproduction of these images/information is prohibited.
              </p>
              
              <p>
                If you believe any image/information violates your rights, don't hesitate to get in touch with us for prompt resolution.
              </p>
            </div>
            
            <div className="disclaimer-footer">
              <Link href="/" className="back-home-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 12H5M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .disclaimer-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          padding: 60px 0;
        }

        .disclaimer-content {
          max-width: 800px;
          margin: 0 auto;
          background: white;
          border-radius: 20px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          padding: 50px;
          position: relative;
          overflow: hidden;
        }

        .disclaimer-content::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #16A34A, #22C55E, #4ADE80);
        }

        .disclaimer-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .disclaimer-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 20px;
          position: relative;
        }

        .disclaimer-divider {
          width: 80px;
          height: 4px;
          background: linear-gradient(90deg, #16A34A, #22C55E);
          margin: 0 auto;
          border-radius: 2px;
        }

        .disclaimer-text {
          line-height: 1.8;
          color: #4b5563;
          font-size: 1.1rem;
        }

        .disclaimer-text p {
          margin-bottom: 20px;
          text-align: justify;
        }

        .disclaimer-text p:last-of-type {
          margin-bottom: 0;
        }

        .disclaimer-footer {
          margin-top: 40px;
          text-align: center;
          padding-top: 30px;
          border-top: 1px solid #e5e7eb;
        }

        .back-home-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 12px 24px;
          background: linear-gradient(135deg, #16A34A, #22C55E);
          color: white;
          text-decoration: none;
          border-radius: 50px;
          font-weight: 600;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(22, 163, 74, 0.3);
        }

        .back-home-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(22, 163, 74, 0.4);
        }

        .back-home-btn svg {
          transition: transform 0.3s ease;
        }

        .back-home-btn:hover svg {
          transform: translateX(-3px);
        }

        @media (max-width: 768px) {
          .disclaimer-page {
            padding: 40px 20px;
          }

          .disclaimer-content {
            padding: 30px 20px;
            margin: 0 10px;
          }

          .disclaimer-title {
            font-size: 2rem;
          }

          .disclaimer-text {
            font-size: 1rem;
          }
        }

        @media (max-width: 480px) {
          .disclaimer-content {
            padding: 25px 15px;
          }

          .disclaimer-title {
            font-size: 1.75rem;
          }

          .disclaimer-text {
            font-size: 0.95rem;
          }
        }
      `}</style>
    </>
  );
};

export default DisclaimerClinet;
