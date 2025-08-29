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
} from '@react-email/components';

export const UnsubscriptionNotificationEmail = ({
  subscriberName = 'User',
  subscriberEmail = 'user@example.com',
  unsubscriptionDate = new Date().toLocaleDateString(),
}) => (
  <Html>
    <Head />
    <Preview>Newsletter Unsubscription - {subscriberEmail}</Preview>
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
        
        <Heading style={h1}>📧 Newsletter Unsubscription</Heading>
        
        <div style={contentSection}>
          <Text style={text}>
            A user has unsubscribed from your property newsletter.
          </Text>
          
          <div style={infoBox}>
            <Text style={label}>Unsubscriber Details:</Text>
            <Text style={detail}>
              <strong>Name:</strong> {subscriberName}
            </Text>
            <Text style={detail}>
              <strong>Email:</strong> {subscriberEmail}
            </Text>
            <Text style={detail}>
              <strong>Unsubscription Date:</strong> {unsubscriptionDate}
            </Text>
          </div>
          
          <Text style={text}>
            This user will no longer receive notifications about new properties added to your platform.
          </Text>
          
          <div style={tipBox}>
            <Text style={tipText}>
              💡 <strong>Note:</strong> This is an automated notification from your Landmark Properties newsletter system.
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
};

const text = {
  color: '#4a5568',
  fontSize: '17px',
  margin: '0 0 24px 0',
  lineHeight: '1.6',
};

const infoBox = {
  background: '#f1f5f9',
  borderRadius: '10px',
  padding: '20px',
  marginBottom: '24px',
  border: '1px solid #dfe6e9',
  textAlign: 'left',
};

const label = {
  color: '#1a9050',
  fontSize: '18px',
  fontWeight: '600',
  margin: '0 0 16px 0',
  display: 'block',
};

const detail = {
  color: '#4a5568',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '0 0 12px 0',
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

export default UnsubscriptionNotificationEmail;
