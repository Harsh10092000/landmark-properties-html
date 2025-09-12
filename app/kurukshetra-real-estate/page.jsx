import React from 'react';
import { siteConfig } from '@/app/config/site';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]/route';
import pool from '../libs/mysql';
import KurukshetraRealEstateClient from './KurukshetraRealEstateClient';

export const metadata = {
  title: "Real Estate in Kurukshetra - Buy, Sell, Rent Properties | Landmark Properties",
  description: "Discover the best real estate opportunities in Kurukshetra. Buy, sell, or rent residential, commercial properties, and land plots. Expert property consultation services by Landmark Properties. Call +91-999-671-6787",
  keywords: "real estate Kurukshetra, property dealer Kurukshetra, buy property Kurukshetra, sell property Kurukshetra, rent property Kurukshetra, residential properties Kurukshetra, commercial properties Kurukshetra, land plots Kurukshetra, property consultation Kurukshetra, Landmark Properties Kurukshetra",
  openGraph: {
    type: "website",
    url: "https://landmarkplots.com/kurukshetra-real-estate",
    title: "Real Estate in Kurukshetra - Buy, Sell, Rent Properties | Landmark Properties",
    description: "Discover the best real estate opportunities in Kurukshetra. Buy, sell, or rent residential, commercial properties, and land plots. Expert property consultation services by Landmark Properties.",
    siteName: "Landmark Properties",
    images: [
      {
        url: "https://landmarkplots.com/uploads/default.jpg",
        width: 1200,
        height: 630,
        alt: "Real Estate in Kurukshetra - Landmark Properties",
      },
    ],
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Real Estate in Kurukshetra - Buy, Sell, Rent Properties | Landmark Properties",
    description: "Discover the best real estate opportunities in Kurukshetra. Expert property consultation services by Landmark Properties.",
    images: ["https://landmarkplots.com/uploads/default.jpg"],
  },
  alternates: {
    canonical: "https://landmarkplots.com/kurukshetra-real-estate",
  },
};

const getData = async () => {
  try {
    const db = await pool;
    const q = `SELECT pro_ad_type, pro_amt, pro_locality, pro_washrooms, pro_bedroom, pro_area_size, pro_area_size_unit, pro_user_id, pro_user_type, pro_url, listing_id, pro_type, pro_city, pro_state, pro_cover_image, pro_creation_date FROM property_module where pro_listed = 1 AND pro_city = 'Kurukshetra' ORDER BY pro_id DESC limit 6`;
    const [rows] = await db.query(q);
    return { data: rows };
  } catch (err) {
    console.log("err : ", err);
    return { data: [] };
  }
};

const KurukshetraRealEstatePage = async () => {
  const session = await getServerSession(authOptions);
  const currentUser = session?.user?.id || "";
  const { data: kurukshetraProperties } = await getData();

  // Structured data for this page
  const pageStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Real Estate in Kurukshetra",
    "description": "Comprehensive guide to real estate opportunities in Kurukshetra. Buy, sell, or rent residential, commercial properties, and land plots with expert consultation from Landmark Properties.",
    "url": "https://landmarkplots.com/kurukshetra-real-estate",
    "mainEntity": {
      "@type": "LocalBusiness",
      "name": siteConfig.businessName,
      "alternateName": siteConfig.name,
      "legalName": siteConfig.business.fullBusinessName,
      "url": siteConfig.url,
      "description": "Landmark Properties is a premier real estate company specializing in buying, selling, and renting various types of properties in Kurukshetra and surrounding areas.",
      "telephone": siteConfig.contact.phone,
      "email": siteConfig.contact.email,
      "image": {
        "@type": "ImageObject",
        "url": `${siteConfig.url}${siteConfig.seo.businessImage}`,
        "width": 800,
        "height": 600
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": siteConfig.business.address.streetAddress,
        "addressLocality": siteConfig.business.address.city,
        "addressRegion": siteConfig.business.address.region,
        "addressCountry": siteConfig.business.address.country,
        "postalCode": "136118"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "29.9695",
        "longitude": "76.8783"
      },
      "hasMap": siteConfig.business.hasMap,
      "openingHours": siteConfig.business.openingHours,
      "priceRange": siteConfig.business.priceRange,
      "paymentAccepted": siteConfig.business.paymentAccepted,
      "currenciesAccepted": siteConfig.business.currenciesAccepted,
      "areaServed": {
        "@type": "Place",
        "name": "Kurukshetra, Haryana"
      },
      "serviceType": [
        "Property Sales",
        "Property Rentals",
        "Land Sales",
        "Commercial Properties",
        "Residential Properties",
        "Property Consultation",
        "Legal Services",
        "Home Loan Assistance"
      ],
      "foundingDate": siteConfig.business.foundingDate,
      "sameAs": [
        siteConfig.url,
        siteConfig.social.instagram
      ]
    }
  };

  return (
    <KurukshetraRealEstateClient 
      currentUser={currentUser}
      kurukshetraProperties={kurukshetraProperties}
      pageStructuredData={pageStructuredData}
    />
  );
};

export default KurukshetraRealEstatePage;







