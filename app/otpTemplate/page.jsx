const NewUserTemplate = ({ user, property }) => (
  <div
    style={{
      fontFamily: '"Inter", "Arial", sans-serif',
      background: 'linear-gradient(to bottom, #f7fafc 0%, #e6f0fa 100%)',
      padding: '20px 10px',
      minHeight: '100vh',
      margin: 0,
      boxSizing: 'border-box',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <div
      style={{
        maxWidth: '840px',
        width: '90%',
        margin: '0 auto',
        background: '#ffffff',
        borderRadius: '15px',
        boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
        padding: '30px 25px',
        textAlign: 'center',
        border: '1px solid #dfe6e9',
        boxSizing: 'border-box',
      }}
    >
      <img
        src="https://landmarkplots.com/assets/img/logo/nav-log2.png"
        alt="Landmark Logo"
        style={{
          width: '180px',
          margin: '0 auto 25px',
          display: 'block',
          borderRadius: '8px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.08)',
          transition: 'transform 0.3s ease',
        }}
        //ouseOver={(e) => (e.target.style.transform = 'scale(1.05)')}
        //onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}   
      />
      <h2
        style={{
          color: '#1a9050',
          marginBottom: '8px',
          fontWeight: '700',
          fontSize: '24px',
          letterSpacing: '0.4px',
          lineHeight: '1.3',
        }}
      >
        Welcome to Landmark Properties!
      </h2>
      <p
        style={{
          color: '#2d3748',
          fontSize: '14px',
          marginBottom: '20px',
          marginTop: '0',
          fontWeight: '500',
          lineHeight: '1.5',
        }}
      >
        Dear {user?.name || 'Valued Customer'},
      </p>

      <div
        style={{
          padding: '15px',
          marginBottom: '20px',
        }}
      >
        <p
          style={{
            color: '#1a9050',
            fontSize: '18px',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.6px',
            marginBottom: '12px',
          }}
        >
          🎉 Thank You for Choosing Us!
        </p>
        <p
          style={{
            color: '#4a5568',
            fontSize: '15px',
            margin: '0',
            lineHeight: '1.6',
          }}
        >
          Thank you for joining Landmark Properties. Your account has been successfully created and you can now explore thousands of properties, add your own listings, and connect with buyers and sellers.
        </p>
      </div>

      <div
        style={{
          background: '#edf7f2',
          borderRadius: '8px',
          padding: '15px',
          margin: '20px 0',
          textAlign: 'left',
          border: '1px solid #e6ffed',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)',
        }}
      >
        <h3
          style={{
            color: '#1a9050',
            fontSize: '16px',
            margin: '0 0 10px 0',
            fontWeight: '700',
            letterSpacing: '0.5px',
          }}
        >
          Why Choose Us?
        </h3>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            textAlign: 'left',
          }}
        >
          {[
            'Wide range of verified properties across all major locations',
            'Easy-to-use platform for listing and searching properties',
            'Dedicated support team to assist you at every step',
          ].map((text, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <div
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: '#1a9050',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  boxShadow: '0 1px 4px rgba(0, 0, 0, 0.05)',
                }}
              >
                ✓
              </div>
              <span
                style={{
                  color: '#4a5568',
                  fontSize: '14px',
                  lineHeight: '1.5',
                }}
              >
                {text}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          borderTop: '1px solid #dfe6e9',
          paddingTop: '15px',
          marginTop: '15px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            background: '#f7fafc',
            borderRadius: '8px',
            padding: '15px',
            marginBottom: '15px',
            border: '1px solid #dfe6e9',
            display: 'inline-block',
            maxWidth: '100%',
          }}
        >
          <p
            style={{
              color: '#4a5568',
              fontSize: '14px',
              margin: '0 0 6px 0',
              lineHeight: '1.6',
            }}
          >
            If you have any questions or need further assistance, our support team is always here to help.<br />
            You may also contact our support at{' '}
            <span style={{ color: '#1a202c', fontWeight: 'bold' }}>
              +91-89500-40151
            </span>{' '}
            anytime for any information related to this enquiry.
          </p>
        </div>
      </div>

      <div
        style={{
          margin: '20px 0 0',
          borderTop: '1px solid #dfe6e9',
          paddingTop: '15px',
        }}
      >
        <p
          style={{
            color: '#4a5568',
            fontSize: '12px',
            margin: '0',
            lineHeight: '1.5',
          }}
        >
          &copy; {new Date().getFullYear()} Landmark Properties. All rights reserved.
        </p>
        <p
          style={{
            color: '#4a5568',
            fontSize: '12px',
            margin: '3px 0 0 0',
            lineHeight: '1.5',
          }}
        >
          Your trusted partner in real estate since 2025
        </p>
      </div>
    </div>
  </div>
);

export default NewUserTemplate;