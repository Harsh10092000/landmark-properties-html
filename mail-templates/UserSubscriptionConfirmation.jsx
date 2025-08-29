import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Hr,
  Link,
  Button,
} from '@react-email/components';

export const UserSubscriptionConfirmationEmail = ({
  subscriberName = 'User',
  isResubscription = false,
  unsubscribeUrl = '#',
}) => (
  <Html>
    <Head />
    <Preview>
      {isResubscription 
        ? 'Welcome Back to Landmark Properties Newsletter!' 
        : 'Welcome to Landmark Properties Newsletter!'
      }
    </Preview>
    <Body style={main}>
      <Container style={container}>
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
        
        <Heading style={h1}>
          {isResubscription ? '🎉 Welcome Back!' : '🎉 Welcome!'}
        </Heading>
        
        <div style={contentSection}>
          <Text style={text}>
            Dear {subscriberName},
          </Text>
          
          {isResubscription ? (
            <Text style={text}>
              Great news! You have been re-subscribed to our property newsletter. We're excited to have you back!
            </Text>
          ) : (
            <Text style={text}>
              Thank you for subscribing to our property newsletter! We're excited to keep you updated on the latest properties.
            </Text>
          )}
          
          <Text style={text}>
            You will now receive updates about new properties as soon as they are added to our platform, including:
          </Text>
          
          <div style={featureList}>
            <Text style={featureItem}>🏠 New residential properties</Text>
            <Text style={featureItem}>🏢 Commercial properties</Text>
            <Text style={featureItem}>🌍 Land properties</Text>
            <Text style={featureItem}>💰 Properties for sale and rent</Text>
            <Text style={featureItem}>📍 Properties in your preferred locations</Text>
          </div>
          
          <Text style={text}>
            If you ever want to unsubscribe, you can use the button below:
          </Text>
          
          <div style={buttonContainer}>
            <Button 
              href={unsubscribeUrl}
              style={unsubscribeButton}
            >
              🚫 Unsubscribe from Newsletter
            </Button>
          </div>
          
          <div style={tipBox}>
            <Text style={tipText}>
              💡 <strong>Tip:</strong> Make sure to add our email address to your contacts to ensure you don't miss any updates!
            </Text>
          </div>
        </div>
        
        <div style={footer}>
          <Text style={footerText}>
            &copy; {new Date().getFullYear()} Landmark Properties. All rights reserved.
          </Text>
          <Text style={footerText}>
            Your trusted partner in real estate since 2025
          </Text>
        </div>
      </Container>
    </Body>
  </Html>
);

const main = {
  fontFamily: '"Inter", "Arial", sans-serif',
  background: 'linear-gradient(to bottom, #f7fafc 0%, #e6f0fa 100%)',
  padding: '40px 16px',
  minHeight: '100vh',
  margin: 0,
  boxSizing: 'border-box',
};

const container = {
  maxWidth: '840px',
  width: '100%',
  margin: '0 auto',
  background: '#ffffff',
  borderRadius: '16px',
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
  padding: '40px 32px',
  textAlign: 'center',
  border: '1px solid #dfe6e9',
  boxSizing: 'border-box',
};

const h1 = {
  color: '#1a9050',
  marginBottom: '20px',
  fontWeight: '700',
  fontSize: '28px',
  letterSpacing: '0.4px',
  lineHeight: '1.3',
};

const contentSection = {
  fontSize: '16px',
  color: '#2d3748',
  marginBottom: '40px',
  lineHeight: '1.6',
  textAlign: 'left',
};

const text = {
  color: '#4a5568',
  fontSize: '17px',
  margin: '0 0 24px 0',
  lineHeight: '1.6',
};

const featureList = {
  background: '#f1f5f9',
  borderRadius: '10px',
  padding: '20px',
  marginBottom: '24px',
  border: '1px solid #dfe6e9',
};

const featureItem = {
  color: '#4a5568',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '0 0 12px 0',
  paddingLeft: '20px',
  position: 'relative',
};

const buttonContainer = {
  textAlign: 'center',
  marginBottom: '24px',
};

const unsubscribeButton = {
  backgroundColor: '#dc3545',
  color: '#ffffff',
  padding: '12px 24px',
  borderRadius: '8px',
  textDecoration: 'none',
  fontSize: '16px',
  fontWeight: '600',
  border: 'none',
  cursor: 'pointer',
  display: 'inline-block',
  boxShadow: '0 4px 12px rgba(220, 53, 69, 0.3)',
};

const tipBox = {
  background: '#fffaf0',
  borderRadius: '10px',
  padding: '20px',
  marginBottom: '20px',
  border: '1px solid #feebc8',
};

const tipText = {
  color: '#744210',
  fontSize: '15px',
  margin: '0',
  lineHeight: '1.6',
};

const footer = {
  borderTop: '1px solid #dfe6e9',
  paddingTop: '20px',
  marginTop: '20px',
  textAlign: 'center',
};

const footerText = {
  color: '#4a5568',
  fontSize: '13px',
  margin: '4px 0 0 0',
  lineHeight: '1.5',
};

export default UserSubscriptionConfirmationEmail;
