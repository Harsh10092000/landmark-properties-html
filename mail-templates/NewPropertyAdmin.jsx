const NewPropertyAdminTemplate = ({ user, property }) => (
  <div style={{
    fontFamily: 'Segoe UI, Arial, sans-serif',
    background: '#fff',
    padding: '32px 16px',
    minHeight: '100vh',
    margin: 0,
    boxSizing: 'border-box',
  }}>
    <div style={{
      maxWidth: '540px',
      width: '100%',
      margin: '0 auto',
      background: '#fff',
      borderRadius: '12px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
      padding: '32px 24px',
      textAlign: 'left',
      border: '1px solid #6b6e87',
      boxSizing: 'border-box',
    }}>
      <img
        src="https://landmarkplots.com/assets/img/logo/nav-log2.png"
        alt="Landmark Logo"
        style={{ width: '180px', margin: '0 auto 24px', display: 'block' }}
      />
      <div style={{ fontSize: '15px', color: '#222', marginBottom: '32px', lineHeight: '1.7' }}>
        <div style={{ marginBottom: '18px' }}>Dear Admin,</div>
        <div style={{ marginBottom: '18px' }}>
          A new property has been listed by <strong>{user?.email}</strong> (Property ID: <strong>{property?.id}</strong>).
        </div>
        <div style={{ marginBottom: '18px' }}>
          Property details: <a href={`${process.env.NEXTAUTH_URL}/property/${property?.slug || property?.id}`} style={{ color: '#02a550', textDecoration: 'underline' }}>{property?.title || property?.slug || property?.id}</a>
        </div>
        <div style={{ marginBottom: '18px' }}>
          Contact the user at: <strong>{user?.phone}</strong>
        </div>
        <div style={{ margin: '32px 0 0 0', color: '#666' }}>
          Thank you,<br/>
          Landmark Properties Team
        </div>
      </div>
    </div>
  </div>
);

export default NewPropertyAdminTemplate;
