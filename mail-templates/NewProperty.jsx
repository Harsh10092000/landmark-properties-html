const NewPropertyTemplate = ({ user, property }) => (
    <div
      style={{
      fontFamily: '"Inter", "Arial", sans-serif',
      background: 'linear-gradient(to bottom, #f7fafc 0%, #e6f0fa 100%)',
      padding: '32px 16px',
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
          width: '100%',
          margin: '0 auto',
        background: '#ffffff',
        borderRadius: '20px',
        boxShadow: '0 8px 28px rgba(0, 0, 0, 0.12)',
        padding: '48px 40px',
          textAlign: 'center',
        border: '1px solid #dfe6e9',
          boxSizing: 'border-box',
        }}
      >
        <img
          src="https://landmarkplots.com/assets/img/logo/nav-log2.png"
          alt="Landmark Logo"
          style={{ 
            width: '220px', 
            margin: '0 auto',
          marginBottom: '40px',
          borderRadius: '12px',
          boxShadow: '0 6px 16px rgba(0, 0, 0, 0.1)',
        }}
      />
      <h2
        style={{
          color: '#1a9050',
          marginBottom: '10px',
          fontWeight: '700', 
          fontSize: '28px',
          letterSpacing: '0.4px',
          lineHeight: '1.3',
        }}
      >
          Thank You for Your Property Listing!
        </h2>
      <p
        style={{
          color: '#2d3748',
          fontSize: '16px',
          marginBottom: '28px',
          marginTop: '0',
          fontWeight: '500',
          lineHeight: '1.5',
        }}
      >
          Dear {user?.name || 'Valued Customer'},
        </p>
        
        <div
          style={{
          padding: '28px',
          marginBottom: '28px',
        }}
      >
        <p
          style={{
            color: '#1a9050',
            fontSize: '20px',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.6px',
            marginBottom: '16px',
          }}
        >
            🎉 Property Successfully Listed!
          </p>
        <p
          style={{
            color: '#4a5568',
            fontSize: '17px',
            margin: '0 0 24px 0',
            lineHeight: '1.6',
          }}
        >
            Your property has been successfully added to our platform and is now live for potential buyers and renters to view. Your listing will be visible to thousands of users searching for properties in your area.
          </p>
        <a
          href={`https://landmarkplots.com/${property?.url}`}
            style={{
              display: 'inline-block',
            background: 'linear-gradient(90deg, #1a9050 0%, #2d3748 100%)',
            color: '#ffffff',
            padding: '16px 32px',
            borderRadius: '10px',
              textDecoration: 'none',
            fontSize: '16px',
              fontWeight: '600',
              textTransform: 'uppercase',
            letterSpacing: '0.6px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          }}
          // onMouseOver={(e) => {
          //   e.target.style.transform = 'translateY(-3px)';
          //   e.target.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.35)';
          // }}
          // onMouseOut={(e) => {
          //   e.target.style.transform = 'translateY(0)';
          //   e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.25)';
          // }}
          >
            View Property Listing
          </a>
        </div>
  
      <div
        style={{
          background: '#fffaf0',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '28px',
          border: '1px solid #feebc8',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
        }}
      >
        <p
          style={{
            color: '#744210',
            fontSize: '15px',
            margin: '0',
            lineHeight: '1.6',
          }}
        >
          💡 <strong>Pro Tip:</strong> Keep your contact information updated and respond quickly to inquiries to increase your chances of a successful sale or rental. Share your property link on social media for more exposure.
          </p>
        </div>
  
      <div
        style={{
          borderTop: '1px solid #dfe6e9',
          paddingTop: '20px',
          marginTop: '20px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            background: '#f7fafc',
            borderRadius: '12px',
            padding: '20px',
            marginBottom: '20px',
            border: '1px solid #dfe6e9',
            display: 'inline-block',
          }}
        >
          <p
            style={{
              color: '#4a5568',
              fontSize: '16px',
              margin: '0 0 8px 0',
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
          margin: '28px 0 0',
          borderTop: '1px solid #dfe6e9',
          paddingTop: '20px',
        }}
      >
        <p
          style={{
            color: '#4a5568',
            fontSize: '13px',
            margin: '0',
            lineHeight: '1.5',
          }}
        >
            &copy; {new Date().getFullYear()} Landmark Properties. All rights reserved.
          </p>
        <p
          style={{
            color: '#4a5568',
            fontSize: '13px',
            margin: '4px 0 0 0',
            lineHeight: '1.5',
          }}
        >
            Your trusted partner in real estate since 2025
          </p>
        </div>
      </div>
    </div>
  );
  
  export default NewPropertyTemplate;