import React from 'react';
import FaqClinet from './FaqClinet';

// SEO Metadata
export const metadata = {
  title: 'FAQ - Frequently Asked Questions | Landmark Plots',
  description: 'Find answers to common questions about property buying, selling, and real estate investment in India. Expert guidance on property deals, legal documents, and investment strategies.',
  keywords: 'FAQ, property questions, real estate India, property buying guide, property investment, Landmark Plots FAQ',
  openGraph: {
    title: 'FAQ - Frequently Asked Questions | Landmark Plots',
    description: 'Find answers to common questions about property buying, selling, and real estate investment in India. Expert guidance on property deals, legal documents, and investment strategies.',
    url: 'https://landmarkplots.com/faq',
    siteName: 'Landmark Plots',
    images: [
      {
        url: 'https://landmarkplots.com/uploads/default.jpg',
        width: 1200,
        height: 630,
        alt: 'Landmark Plots FAQ',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FAQ - Frequently Asked Questions | Landmark Plots',
    description: 'Find answers to common questions about property buying, selling, and real estate investment in India. Expert guidance on property deals, legal documents, and investment strategies.',
    images: ['https://landmarkplots.com/uploads/default.jpg'],
  },
  alternates: {
    canonical: 'https://landmarkplots.com/faq',
  },
};

const FAQPage = () => {


  return (
   <FaqClinet />
  );
};

export default FAQPage;

