const NewUserTemplate = ({ user, property }) => (
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
          maxWidth: '780px',
          width: '100%',
          margin: '0 auto',
          background: '#fff',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          padding: '32px 24px',
          textAlign: 'center',
          border: '1px solid #6b6e87',
          boxSizing: 'border-box',
        }}
      >
        <img
          src="https://landmarkplots.com/assets/img/logo/nav-log2.png"
          alt="Landmark Logo"
          style={{ 
            width: '220px', 
            margin: '0 auto',
            marginBottom: '35px', 
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
          Welcome to Landmark Properties!
        </h2>
        <p style={{ 
          color: '#3d787a', 
          fontSize: '14px', 
          marginBottom: '20px', 
          marginTop: '0',
          fontWeight: '500',
          lineHeight: '1.3'
        }}>
          Dear {user?.name || 'Valued Customer'},
        </p>
        
        <div
          style={{
           // background: 'linear-gradient(135deg, #02a550 0%, #3d787a 100%)',
            borderRadius: '8px',
            padding: '20px 24px',
           // marginBottom: '20px',
            //boxShadow: '0 2px 12px rgba(2, 165, 80, 0.15)',
          }}
        >
          <p style={{ 
            color: '#fff', 
            color: '#3d787a', 
            fontSize: '18px', 
            //marginBottom: '12px', 
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.5px' 
          }}>
            🎉 Thank You for Choosing Us!
          </p>
          <p style={{ 
            color: '#fff', 
            color: '#4e4b4b', 
            fontSize: '16px', 
            margin: '0',
            lineHeight: '1.4'
          }}>
            Thank you for joining Landmark Properties. Your account has been successfully created and you can now explore thousands of properties, add your own listings, and connect with buyers and sellers.
          </p>
        </div>
  
          <div style={{
                background: '#e8f5e8',
                borderRadius: '8px',
                padding: '20px',
                margin: '20px 0',
                textAlign: 'left',
                
          }}>
            <h3 style={{
              color: '#02a550',
              fontSize: '16px',
              margin: '0 0 10px 0',
              fontWeight: '700',
              letterSpacing: '0.5px',
            }}>
              Why Choose Us?
            </h3>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
              textAlign: 'left',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: '#02a550',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  boxShadow: '0 1px 4px rgba(2, 165, 80, 0.10)'
                }}>✓</div>
                <span style={{ color: '#4e4b4b', fontSize: '15px', lineHeight: '1.5' }}>
                  Wide range of verified properties across all major locations
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: '#02a550',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  boxShadow: '0 1px 4px rgba(2, 165, 80, 0.10)'
                }}>✓</div>
                <span style={{ color: '#4e4b4b', fontSize: '15px', lineHeight: '1.5' }}>
                  Easy-to-use platform for listing and searching properties
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: '#02a550',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  boxShadow: '0 1px 4px rgba(2, 165, 80, 0.10)'
                }}>✓</div>
                <span style={{ color: '#4e4b4b', fontSize: '15px', lineHeight: '1.5' }}>
                  Dedicated support team to assist you at every step
                </span>
              </div>
            </div>
          </div>
  
  
   
  
        <div style={{ 
          borderTop: '1px solid #eee', 
          paddingTop: '10px', 
          marginTop: '10px',
          marginBottom: '0',
          textAlign: 'center'
        }}>
          <div style={{
            //background: '#e8f5e8',
            borderRadius: '8px',
            padding: '10px 10px',
           //marginBottom: '10px',
            //border: '1px solid #02a550',
            display: 'inline-block',
            //maxWidth: '420px',
          }}>
            <p style={{
              color: 'rgb(61 120 122);',
              color: '#4e4b4b',
              fontSize: '15px',
              margin: '0 0 8px 0',
              // fontWeight: '600',
              lineHeight: '1.5',
            }}>
              If you have any questions or need further assistance, our support team is always here to help.<br/>
              You may also contact our support at <span style={{color:'#1a1a1a',fontWeight:'bold'}}>+91-89500-40151</span> anytime for any information related to this enquiry.
            </p>
          </div>
         
        </div>
        
        <div style={{ 
          margin: '20px 0 0', 
          borderTop: '1px solid #eee', 
          paddingTop: '12px' 
        }}>
          <p style={{ 
            color: '#4e4b4b', 
            fontSize: '11px', 
            margin: '0',
            lineHeight: '1.3'
          }}>
            &copy; {new Date().getFullYear()} Landmark Properties. All rights reserved.
          </p>
          <p style={{ 
            color: '#4e4b4b', 
            fontSize: '12px', 
            margin: '2px 0 0 0',
            lineHeight: '1.3'
          }}>
            Your trusted partner in real estate since 2025
          </p>
        </div>
      </div>
    </div>
  );
  
  export default NewUserTemplate;