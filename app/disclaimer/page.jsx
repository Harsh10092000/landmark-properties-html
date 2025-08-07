
import React from 'react';
import DisclaimerClinet from './DisclaimerClinet';

// SEO Metadata
export const metadata = {
  title: 'Disclaimer - Landmark Plots | Legal Information & Terms',
  description: 'Read our comprehensive disclaimer for Landmark Plots. Important legal information about property listings, images, and transaction guidelines. Verify all details before proceeding.',
  keywords: 'Landmark Plots disclaimer, property legal information, real estate terms, property verification, transaction guidelines',
  openGraph: {
    title: 'Disclaimer - Landmark Plots | Legal Information & Terms',
    description: 'Read our comprehensive disclaimer for Landmark Plots. Important legal information about property listings, images, and transaction guidelines.',
    url: 'https://landmarkplots.com/disclaimer',
    siteName: 'Landmark Plots',
    images: [
      {
        url: 'https://landmarkplots.com/uploads/default.jpg',
        width: 1200,
        height: 630,
        alt: 'Landmark Plots Disclaimer',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Disclaimer - Landmark Plots | Legal Information & Terms',
    description: 'Read our comprehensive disclaimer for Landmark Plots. Important legal information about property listings, images, and transaction guidelines.',
    images: ['https://landmarkplots.com/uploads/default.jpg'],
  },
  alternates: {
    canonical: 'https://landmarkplots.com/disclaimer',
  },
};

const Disclaimer = () => {
  return (
    <DisclaimerClinet />
  );
};

export default Disclaimer;
