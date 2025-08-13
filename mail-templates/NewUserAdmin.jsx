const NewUserAdminTemplate = ({ user }) => (
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
          transition: 'transform 0.3s ease',
        }}
        //onMouseOver={(e) => (e.target.style.transform = 'scale(1.05)')}
        //onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
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
          A new user (ID: <strong style={{ color: '#1a202c' }}>{user?.id}</strong>) has registered: <strong style={{ color: '#1a202c' }}>{user?.email}</strong>.
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
            User Details
          </div>
          <div style={{ marginBottom: '12px' }}>
            <strong>Name:</strong>{' '}
            {user?.name || 'Not specified'}
          </div>
          <div style={{ marginBottom: '12px' }}>
            <strong>Email:</strong>{' '}
            {user?.email}
          </div>
          <div style={{ marginBottom: '12px' }}>
            <strong>Phone:</strong>{' '}
            {user?.phone || 'Not specified'}
          </div>
          <div style={{ marginBottom: '12px' }}>
            <strong>Registration Date:</strong>{' '}
            {user?.createdAt
              ? new Date(user.createdAt).toLocaleDateString('en-IN', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                })
              : 'Not specified'}
          </div>
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
            💡 <strong>Note:</strong> This is an automated notification to inform you of the new user registration. For any clarifications, please contact the user directly.
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

export default NewUserAdminTemplate;