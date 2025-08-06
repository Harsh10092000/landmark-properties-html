const NewPropertyTemplate = ({ user, property }) => (
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
          Thank You for Your Property Listing!
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
            🎉 Property Successfully Listed!
          </p>
          <p style={{ 
            color: '#fff', 
            color: '#4e4b4b', 
            fontSize: '16px', 
            margin: '0',
            lineHeight: '1.4'
          }}>
            Your property has been successfully added to our platform and is now live for potential buyers and renters to view. Your listing will be visible to thousands of users searching for properties in your area.
          </p>
        </div>
  
        <div style={{
          background: '#fff',
          borderRadius: '8px',
          padding: '10px',
          paddingTop: '10px',
          marginBottom: '20px',
          //border: '2px solid #02a550',
          //boxShadow: '0 4px 12px rgba(2, 165, 80, 0.15)',
        }}>
          {/* <p style={{
            color: '#02a550',
            fontSize: '16px',
            margin: '0 0 12px 0',
            fontWeight: '600'
          }}>
            🔗 View Your Property
          </p> */}
          <a
            href={`${process.env.NEXTAUTH_URL}/property/${property?.id}`}
            style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, #02a550 0%, #3d787a 100%)',
              color: '#fff',
              padding: '12px 24px',
              borderRadius: '6px',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              boxShadow: '0 2px 8px rgba(2, 165, 80, 0.3)',
              transition: 'all 0.3s ease'
            }}
          >
            View Property Listing
          </a>
        </div>
  
        {/* <div style={{ 
         // background: '#e8f5e8', 
          borderRadius: '6px', 
          padding: '16px', 
          marginBottom: '20px' 
        }}>
          <p style={{ 
            color: '#02a550', 
            fontSize: '16px', 
            margin: '0 0 8px 0',
            fontWeight: '600'
          }}>
            🚀 What Happens Next?
          </p>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            textAlign: 'left'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: '#02a550',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '12px',
                fontWeight: 'bold'
              }}>
                1
              </div>
              <span style={{ color: '#666', fontSize: '14px', lineHeight: '1.4' }}>
                Your property is now live and visible to all users
              </span>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: '#02a550',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '12px',
                fontWeight: 'bold'
              }}>
                2
              </div>
              <span style={{ color: '#666', fontSize: '14px', lineHeight: '1.4' }}>
                You'll receive notifications for any inquiries
              </span>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: '#02a550',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '12px',
                fontWeight: 'bold'
              }}>
                3
              </div>
              <span style={{ color: '#666', fontSize: '14px', lineHeight: '1.4' }}>
                You can edit or update your listing anytime
              </span>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: '#02a550',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '12px',
                fontWeight: 'bold'
              }}>
                4
              </div>
              <span style={{ color: '#666', fontSize: '14px', lineHeight: '1.4' }}>
                Share your property link on social media for more exposure
              </span>
            </div>
          </div>
        </div>
   */}
        <div style={{ 
          // background: '#fff3cd', 
          borderRadius: '6px', 
          padding: '16px', 
          marginBottom: '20px' 
        }}>
          <p style={{ 
            color: '#856404', 
            fontSize: '14px', 
            margin: '0',
            lineHeight: '1.4'
          }}>
            💡 <strong>Pro Tip:</strong> Keep your contact information updated and respond quickly to inquiries to increase your chances of a successful sale or rental. Share your property link on social media for more exposure
          </p>
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
  
  export default NewPropertyTemplate;