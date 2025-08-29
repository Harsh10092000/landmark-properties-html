const NewPropertySubscriber = ({ subscriber = {}, property = {} }) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://landmarkplots.com';
  const coverSrc = property?.coverImage ? `${baseUrl}/uploads/${property.coverImage}` : '';
  const priceText = typeof property?.price === 'number'
    ? new Intl.NumberFormat('en-IN').format(property.price)
    : (property?.price || '');
  const safeTitle = property?.title || `${property?.propertyType || 'Property'} in ${property?.city || ''}`.trim();
  const viewUrl = property?.url ? String(property.url) : baseUrl;

  return (
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
            display: 'block',
          }}
        />

        <h2
          style={{
            color: '#1a9050',
            margin: '0 0 10px',
            fontWeight: '700',
            fontSize: '28px',
            letterSpacing: '0.4px',
            lineHeight: '1.3',
          }}
        >
          🏠 New Property Just Listed!
        </h2>
        <p
          style={{
            color: '#2d3748',
            fontSize: '16px',
            margin: '0 0 28px 0',
            lineHeight: '1.5',
          }}
        >
          Hi {subscriber?.name || 'there'}, a new property has been listed on Landmark Properties that matches your interests. Check out the details below.
        </p>

        <div
          style={{
            background: '#f1f5f9',
            borderRadius: '14px',
            padding: '16px',
            border: '1px solid #dfe6e9',
            textAlign: 'left',
            margin: '0 0 24px 0',
          }}
        >
          {coverSrc && (
            <img 
              src={coverSrc} 
              alt={safeTitle} 
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '10px',
                marginBottom: '16px',
              }} 
            />
          )}
          <h3
            style={{
              color: '#1a202c',
              fontSize: '20px',
              fontWeight: '700',
              margin: '0 0 12px 0',
            }}
          >
            {safeTitle}
          </h3>
          <p
            style={{
              color: '#4a5568',
              fontSize: '16px',
              margin: '0 0 12px 0',
              lineHeight: '1.6',
            }}
          >
            <strong>Location:</strong> {property?.city || ''}{property?.subDistrict ? `, ${property.subDistrict}` : ''}{property?.state ? `, ${property.state}` : ''}
          </p>
          {property?.area && (
            <p
              style={{
                color: '#4a5568',
                fontSize: '16px',
                margin: '0 0 12px 0',
                lineHeight: '1.6',
              }}
            >
              <strong>Area:</strong> {property.area} {property?.areaUnit || ''}
            </p>
          )}
          {property?.price && (
            <p
              style={{
                color: '#4a5568',
                fontSize: '16px',
                margin: '0 0 12px 0',
                lineHeight: '1.6',
              }}
            >
              <strong>Price:</strong> <span
                style={{
                  background: 'linear-gradient(135deg,#10b981 0%, #059669 100%)',
                  color: '#ffffff',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '700',
                  display: 'inline-block',
                }}
              >₹{priceText}</span> {property?.priceUnit || 'Lakh'}
            </p>
          )}
          <p
            style={{
              color: '#4a5568',
              fontSize: '16px',
              margin: '0 0 10px 0',
              lineHeight: '1.6',
            }}
          >
            <strong>Type:</strong> {property?.propertyType || ''} for {property?.adType || ''}
          </p>
          {(property?.propertyType || property?.adType) && (
            <div style={{ margin: '8px 0 0' }}>
              {property?.propertyType && (
                <span
                  style={{
                    display: 'inline-block',
                    background: '#e8fff5',
                    color: '#065f46',
                    border: '1px solid #a7f3d0',
                    borderRadius: '999px',
                    padding: '6px 10px',
                    fontSize: '12px',
                    fontWeight: '700',
                    marginRight: '6px',
                  }}
                >
                  {property.propertyType}
                </span>
              )}
              {property?.adType && (
                <span
                  style={{
                    display: 'inline-block',
                    background: '#eef2ff',
                    color: '#1e3a8a',
                    border: '1px solid #c7d2fe',
                    borderRadius: '999px',
                    padding: '6px 10px',
                    fontSize: '12px',
                    fontWeight: '700',
                  }}
                >
                  {property.adType}
                </span>
              )}
            </div>
          )}
          {(property?.id || property?.slug) && (
            <p
              style={{
                color: '#64748b',
                fontSize: '13px',
                margin: '10px 0 0',
              }}
            >
              Ref: {property?.id ? `#${property.id}` : ''}{property?.id && property?.slug ? ' • ' : ''}{property?.slug || ''}
            </p>
          )}
        </div>

        <div style={{ margin: '0 0 16px 0' }}>
          <a
            href={viewUrl}
            style={{
              display: 'inline-block',
              background: 'linear-gradient(90deg,#1a9050 0%,#2d3748 100%)',
              color: '#ffffff',
              padding: '16px 32px',
              borderRadius: '10px',
              textDecoration: 'none',
              fontSize: '16px',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.6px',
              boxShadow: '0 4px 12px rgba(0,0,0,.25)',
            }}
          >
            View Property Listing
          </a>
        </div>
        <div>
          <a
            href={`${baseUrl}/allproperties`}
            style={{
              display: 'inline-block',
              background: '#ffffff',
              color: '#1a9050',
              border: '1px solid #1a9050',
              padding: '12px 22px',
              borderRadius: '10px',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '700',
            }}
          >
            Browse More Properties
          </a>
        </div>

        <div
          style={{
            background: '#fffaf0',
            borderRadius: '12px',
            padding: '24px',
            margin: '28px 0',
            border: '1px solid #feebc8',
            boxShadow: '0 4px 12px rgba(0,0,0,.05)',
            textAlign: 'left',
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
            💡 <strong>Tip:</strong> Set your preferences on the website to receive more tailored property alerts.
          </p>
        </div>

        <div
          style={{
            margin: '28px 0 0',
            borderTop: '1px solid #dfe6e9',
            paddingTop: '20px',
            textAlign: 'center',
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
              margin: '4px 0 0',
              lineHeight: '1.5',
            }}
          >
            Your trusted partner in real estate since 2025
          </p>
          <p
            style={{
              color: '#4a5568',
              fontSize: '13px',
              margin: '8px 0 0',
              lineHeight: '1.5',
            }}
          >
            <a
              href={`${baseUrl}/unsubscribe?email=${encodeURIComponent(subscriber?.email || '')}`}
              style={{
                color: '#1a9050',
                textDecoration: 'underline',
              }}
            >
              Unsubscribe from notifications
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewPropertySubscriber;