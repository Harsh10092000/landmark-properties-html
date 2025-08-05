const OtpTemplate = ({ otp = "123456" }) => (
    <div
      style={{
        fontFamily: 'Segoe UI, Arial, sans-serif',
        background: '#fff',
        padding: '20px 16px',
        minHeight: '100vh',
        margin: 0,
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          maxWidth: '480px',
          width: '100%',
          margin: '0 auto',
          background: '#fff',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          padding: '32px 24px',
          textAlign: 'center',
          border: '1px solid #e6e8f0',
          boxSizing: 'border-box',
        }}
      >
        <img
          src="/favicon.ico"
          alt="Landmark Logo"
          style={{ 
            width: '48px', 
            marginBottom: '16px', 
            borderRadius: '8px', 
            boxShadow: '0 2px 8px rgba(2, 165, 80, 0.15)' 
          }}
        />
        <h2 style={{ 
          color: '#02a550', 
          marginBottom: '6px', 
          fontWeight: '700', 
          fontSize: '24px', 
          letterSpacing: '0.5px',
          lineHeight: '1.2'
        }}>
          Welcome to Landmark Properties
        </h2>
        <p style={{ 
          color: '#3d787a', 
          fontSize: '14px', 
          marginBottom: '20px', 
          marginTop: '0',
          fontWeight: '500',
          lineHeight: '1.3'
        }}>
          Your trusted partner in real estate
        </p>
        <div
          style={{
            background: 'linear-gradient(135deg, #02a550 0%, #3d787a 100%)',
            borderRadius: '8px',
            padding: '20px 24px',
            marginBottom: '20px',
            boxShadow: '0 2px 12px rgba(2, 165, 80, 0.15)',
          }}
        >
          <p style={{ 
            color: '#fff', 
            fontSize: '13px', 
            marginBottom: '12px', 
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.5px' 
          }}>
            Your One-Time Password
          </p>
          <div
            style={{
              display: 'inline-block',
              background: '#fff',
              borderRadius: '6px',
              padding: '12px 24px',
              fontSize: '28px',
              letterSpacing: '6px',
              fontWeight: '800',
              color: '#02a550',
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
              wordBreak: 'break-all',
              maxWidth: '100%',
              overflow: 'hidden',
            }}
          >
            {otp}
          </div>
        </div>
        <div style={{ 
          background: '#f8f9fa', 
          borderRadius: '6px', 
          padding: '16px', 
          marginBottom: '20px' 
        }}>
          <p style={{ 
            color: '#666', 
            fontSize: '13px', 
            margin: '0 0 8px 0',
            fontWeight: '500',
            lineHeight: '1.3'
          }}>
            ⏰ This code expires in <b style={{ color: '#e74c3c' }}>10 minutes</b>
          </p>
          <p style={{ 
            color: '#888', 
            fontSize: '12px', 
            margin: '0',
            lineHeight: '1.3' 
          }}>
            For your security, never share this OTP with anyone
          </p>
        </div>
        <div style={{ 
          borderTop: '1px solid #eee', 
          paddingTop: '16px', 
          marginTop: '20px' 
        }}>
          <p style={{ 
            color: '#999', 
            fontSize: '11px', 
            margin: '0 0 6px 0',
            lineHeight: '1.3'
          }}>
            Need help? Contact our support team
          </p>
          <p style={{ 
            color: '#02a550', 
            fontSize: '11px', 
            margin: '0',
            fontWeight: '600',
            wordBreak: 'break-all'
          }}>
            support@landmarkproperties.com
          </p>
        </div>
        <div style={{ 
          margin: '20px 0 0', 
          borderTop: '1px solid #eee', 
          paddingTop: '12px' 
        }}>
          <p style={{ 
            color: '#b0b3c6', 
            fontSize: '10px', 
            margin: '0',
            lineHeight: '1.3'
          }}>
            &copy; {new Date().getFullYear()} Landmark Properties. All rights reserved.
          </p>
          <p style={{ 
            color: '#b0b3c6', 
            fontSize: '10px', 
            margin: '2px 0 0 0',
            lineHeight: '1.3'
          }}>
            Your trusted partner in real estate since 2025
          </p>
        </div>
      </div>
    </div>
  );
  
  export default OtpTemplate;