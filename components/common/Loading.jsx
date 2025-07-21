import React from "react";

export default function Loading() {
  return (
    <>
      <div className="loading-backdrop">
        <div className="loading-modal">
          <div className="spinner" />
          <div className="loading-text">Loading...</div>
        </div>
      </div>
      <style jsx>{`
        .loading-backdrop {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(255,255,255,0.85);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
        }
        .loading-modal {
          background: linear-gradient(135deg, #fff 80%, #eaf1fa 100%);
          border-radius: 22px;
          box-shadow: 0 12px 48px 0 rgba(31,38,135,0.22), 0 1.5px 8px 0 rgba(31,38,135,0.08);
          min-width: 220px;
          max-width: 90vw;
          width: 320px;
          padding: 2.2rem 2.2rem 1.7rem 2.2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .spinner {
          width: 54px;
          height: 54px;
          border: 6px solid #e0e0e0;
          border-top: 6px solid #0a3d2c;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 1.3rem;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .loading-text {
          font-size: 1.18rem;
          font-weight: 700;
          color: #0a3d2c;
          letter-spacing: 1px;
        }
      `}</style>
    </>
  );
}
