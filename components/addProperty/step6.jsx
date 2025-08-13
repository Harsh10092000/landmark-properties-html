// landmark-properties-html/components/addProperty/step6.jsx
import React from "react";

export default function Step6({ listingId, proUrl }) {
  return (
    <div
      className="step1-form"
      style={{
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #f7faff 60%, #eaf1fa 100%)",
      }}
    >
      <div
        style={{
          background: "linear-gradient(135deg, #fff 80%, #eaf1fa 100%)",
          borderRadius: 32,
          boxShadow: "0 8px 32px 0 rgba(31,38,135,0.13)",
          padding: "3.5rem 2.5rem 2.5rem 2.5rem",
          maxWidth: 440,
          width: "100%",
          textAlign: "center",
          margin: "0 auto",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Confetti SVG */}
        <div style={{ position: "absolute", left: 0, top: 0, width: "100%", zIndex: 0, pointerEvents: "none" }}>
          <svg width="100%" height="60" viewBox="0 0 440 60" fill="none">
            <circle cx="30" cy="30" r="6" fill="#1dbf73" />
            <circle cx="80" cy="20" r="4" fill="#ec161e" />
            <circle cx="120" cy="40" r="5" fill="#f7c948" />
            <circle cx="200" cy="15" r="3" fill="#1dbf73" />
            <circle cx="300" cy="35" r="6" fill="#ec161e" />
            <circle cx="400" cy="25" r="5" fill="#f7c948" />
            <circle cx="370" cy="50" r="4" fill="#1dbf73" />
            <circle cx="220" cy="50" r="3" fill="#ec161e" />
          </svg>
        </div>
        {/* Big checkmark */}
        <div style={{ marginBottom: 18, zIndex: 1, position: "relative" }}>
          <svg width="70" height="70" viewBox="0 0 70 70" fill="none">
            <circle cx="35" cy="35" r="35" fill="#1dbf73" />
            <path
              d="M22 37l10 10 18-18"
              stroke="#fff"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h2
          style={{
            color: "#1dbf73",
            fontWeight: 900,
            marginBottom: 10,
            fontSize: 32,
            letterSpacing: 1,
            zIndex: 1,
            position: "relative",
          }}
        >
          Thank you!
        </h2>
        <div
          style={{
            color: "#333",
            fontSize: 18,
            marginBottom: 22,
            background: "#f7faff",
            borderRadius: 12,
            padding: "12px 0",
            fontWeight: 500,
            zIndex: 1,
            position: "relative",
          }}
        >
          Your property has been submitted.<br />
          <span style={{ color: "#1dbf73", fontWeight: 700 }}>Our team will review your listing soon.</span>
        </div>
        {listingId && (
          <div
            style={{
              background: "#fff",
              border: "2.5px solid #1dbf73",
              borderRadius: 16,
              padding: "1.1rem 0.5rem",
              marginBottom: 18,
              fontSize: 22,
              fontWeight: 800,
              color: "#1dbf73",
              letterSpacing: 2,
              boxShadow: "0 2px 8px #1dbf7340",
              display: "inline-block",
              width: "100%",
              zIndex: 1,
              position: "relative",
              fontFamily: "monospace",
              animation: "pulse 1.2s infinite alternate",
            }}
          >
            <span
              style={{
                fontSize: 15,
                color: "#888",
                fontWeight: 500,
                display: "block",
                marginBottom: 2,
                letterSpacing: 1,
              }}
            >
              Your Listing ID
            </span>
            {listingId}
          </div>
        )}
        <div style={{ color: "#888", fontSize: 15, marginBottom: 8, zIndex: 1, position: "relative" }}>
          Please save this ID for future reference.
        </div>

        {/* View Listing Button */}
        {proUrl && (
          <div style={{ marginTop: 24, zIndex: 1, position: "relative" }}>
            <div style={{ 
              marginBottom: 12, 
              padding: '8px 12px', 
              background: '#f8f9fa', 
              borderRadius: '6px', 
              fontSize: '12px', 
              color: '#666',
              wordBreak: 'break-all'
            }}>
              <strong>Property URL:</strong> {proUrl}
            </div>
            <a
              href={proUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                background: 'linear-gradient(135deg, #02a550 0%, #3d787a 100%)',
                color: '#fff',
                padding: '14px 28px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                boxShadow: '0 4px 12px rgba(2, 165, 80, 0.3)',
                transition: 'all 0.3s ease',
                border: 'none',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 16px rgba(2, 165, 80, 0.4)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 12px rgba(2, 165, 80, 0.3)';
              }}
            >
              🏠 View Your Listing
            </a>
          </div>
        )}
      
        <style>{`
          @keyframes pulse {
            0% { box-shadow: 0 0 0 0 #1dbf7340; }
            100% { box-shadow: 0 0 16px 4px #1dbf7340; }
          }
        `}</style>
      </div>
    </div>
  );
}
