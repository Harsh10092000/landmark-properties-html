const NewPropertyAdminTemplate = ({ user, property }) => (
  <div
    style={{
      fontFamily: '"Inter", "Arial", sans-serif',
      background: 'linear-gradient(to bottom, #f7fafc 0%, #e6f0fa 100%)',
      padding: '40px 16px',
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
        borderRadius: '16px',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
        padding: '40px 32px',
      textAlign: 'left',
        border: '1px solid #dfe6e9',
      boxSizing: 'border-box',
      }}
    >
      <img
        src="https://landmarkplots.com/assets/img/logo/nav-log2.png"
        alt="Landmark Logo"
        style={{
          width: '200px',
          margin: '0 auto 32px',
          display: 'block',
          borderRadius: '10px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        }}
      />
      <div
        style={{
          fontSize: '16px',
          color: '#2d3748',
          marginBottom: '40px',
          lineHeight: '1.6',
        }}
      >
        <div style={{ marginBottom: '20px', fontWeight: '500' }}>
          Dear Admin,
        </div>
        <div style={{ marginBottom: '20px' }}>
          A new property (ID: <strong style={{ color: '#1a202c' }}>{property?.id}</strong>) has been listed by{' '}
          <strong style={{ color: '#1a202c' }}>{user?.email}</strong>.
        </div>
        <div
          style={{
            background: '#f1f5f9',
            borderRadius: '10px',
            padding: '20px',
            marginBottom: '20px',
            border: '1px solid #dfe6e9',
          }}
        >
          <div style={{ marginBottom: '16px', fontWeight: '600', color: '#1a9050' }}>
            Property Details
          </div>
          <div style={{ marginBottom: '12px' }}>
            <strong>Title:</strong>{' '}
            <a
              href={`${property?.url}`}
              style={{
                color: '#1a9050',
                textDecoration: 'none',
                fontWeight: '600',
                borderBottom: '1px solid #1a9050',
                transition: 'color 0.2s ease',
              }}
            >
              {property?.title || property?.slug || property?.id}
            </a>
          </div>
          <div style={{ marginBottom: '12px' }}>
            <strong>Location:</strong>{' '}
            {property?.city}{property?.subDistrict ? `, ${property?.subDistrict}` : ''}
          </div>
          <div style={{ marginBottom: '12px' }}>
            <strong>Property Type:</strong>{' '}
            {property?.propertyType}
          </div>
          <div style={{ marginBottom: '12px' }}>
            <strong>Ad Type:</strong>{' '}
            {property?.adType}
          </div>
          <div style={{ marginBottom: '12px' }}>
            <strong>Price:</strong>{' '}
            {property?.price ? (
              <span style={{
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: 'white',
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '700',
                display: 'inline-block'
              }}>
                ₹{property.price.toLocaleString('en-IN')}
              </span>
            ) : (
              <span style={{ color: '#6b7280', fontStyle: 'italic' }}>Price not specified</span>
            )}
          </div>
          {property?.area && (
            <div style={{ marginBottom: '12px' }}>
              <strong>Area:</strong>{' '}
              {property?.area} {property?.areaUnit}
            </div>
          )}
        </div>
        <div style={{ marginBottom: '20px' }}>
          For any inquiries, contact the user at{' '}
          <strong style={{ color: '#1a202c' }}>{user?.phone}</strong>.
        </div>
        <div style={{ marginBottom: '20px' }}>
          <a
            href={`${property?.url}`}
            style={{
              display: 'inline-block',
              background: 'linear-gradient(90deg, #1a9050 0%, #2d3748 100%)',
              color: '#ffffff',
              padding: '14px 28px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '15px',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.6px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}
          >
            View Property Listing
          </a>
        </div>
        <div
          style={{
            background: '#fffaf0',
            borderRadius: '10px',
            padding: '20px',
            marginBottom: '20px',
            border: '1px solid #feebc8',
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
            💡 <strong>Note:</strong> This is an automated notification to inform you of the new property listing. For any clarifications, please contact the user directly.
          </p>
        </div>
        <div
          style={{
            margin: '40px 0 0 0',
            color: '#4a5568',
            fontSize: '15px',
            fontWeight: '500',
          }}
        >
          Thank you,<br />
          Landmark Properties Team
        </div>
      </div>
    </div>
  </div>
);

export default NewPropertyAdminTemplate;