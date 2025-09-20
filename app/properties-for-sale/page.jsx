"use server";
import React from "react";
import pool from "@/app/libs/mysql";

import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import ClientComp from "./client-comp";

export async function generateMetadata() {
  // Generate high-impact SEO content for better rankings
  let desc = "Properties for Sale | 1-4 BHK Houses & Flats | Furnished & Unfurnished | Family & Bachelor | Starting ₹8,000/month | Zero Brokerage | Immediate Possession Available!";
  let capitalizedName1 = "Properties for Sale | Houses & Flats | Zero Brokerage";
  
  const schema = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: capitalizedName1,
    url: `https://landmarkplots.com/properties-for-sale`,
    datePosted: new Date().toISOString().split("T")[0],
    author: {
      "@type": "Organization",
      name: "Landmark Plots",
    },
    description: desc,
    relatedLink: [
      "https://landmarkplots.com/residential-properties",
      "https://landmarkplots.com/commercial-properties",
      "https://landmarkplots.com/land-properties",
    ].filter(Boolean),
    significantLink: [
      "https://landmarkplots.com/allproperties",
      "https://landmarkplots.com/contactus",
      "https://landmarkplots.com/aboutus",
      "https://landmarkplots.com/properties-for-sale",
      "https://landmarkplots.com/properties-for-rent",
    ],
  };

  return {
    title: capitalizedName1,
    description: desc,
    openGraph: {
      type: "website",
      url: `https://landmarkplots.com/properties-for-sale`,
      title: capitalizedName1,
      description: desc,
      images: [
        {
          url: "https://landmarkplots.com/images/property-banner-img.jpg",
          width: 1200,
          height: 630,
          alt: capitalizedName1,
        },
      ],
    },
    metadataBase: new URL("https://landmarkplots.com"),
    alternates: {
      canonical: `https://landmarkplots.com/properties-for-sale`,
    },
    other: {
      "schema.org": JSON.stringify(schema),
    },
  };
}

const getData = async (page = 1) => {
  try {
    const db = await pool;
    const recordsPerPage = 12;
    const offset = (page - 1) * recordsPerPage;
    
    const q = `SELECT * FROM property_module where pro_listed = 1 and pro_ad_type = 'Sale' ORDER BY pro_id DESC LIMIT ${recordsPerPage} OFFSET ${offset}`;
    const q1 = "SELECT COUNT(*) as total from property_module where pro_listed = 1 and pro_ad_type = 'Sale'";
    
    const [rows] = await db.query(q);
    const [total] = await db.query(q1);

    return { 
      row: rows, 
      total: total[0].total,
      currentPage: page,
      totalPages: Math.ceil(total[0].total / recordsPerPage)
    };
  } catch (err) {
    console.error('Database error:', err);
    return { row: [], total: 0, currentPage: 1, totalPages: 0 };
  }
};

const page = async ({searchParams}) => {
  // Get user session
  const session = await getServerSession(authOptions);
  const currentUser = session?.user?.id || "";

  let currentPage = parseInt((await searchParams["page"]) || 1);
  
  // Validate page number
  if (currentPage < 1) {
    currentPage = 1;
  }
  
  const res = await getData(currentPage);
  const data = res.row;
  const totalRecords = res.total;
  const totalPages = res.totalPages;

  const recordsPerPage = 12;
  
  // If page number is greater than total pages, redirect to last page
  if (currentPage > totalPages && totalPages > 0) {
    return {
      redirect: {
        destination: `/properties-for-sale?page=${totalPages}`,
        permanent: false,
      },
    };
  }
  
  

  return (
    <div className="container">
      <title>Properties for Sale | 1-4 BHK Houses & Flats | Furnished & Unfurnished | Family & Bachelor | Starting ₹8,000/month | Zero Brokerage | Immediate Possession Available!</title>
      <meta name="description" content="Properties for Sale | 1-4 BHK Houses & Flats | Furnished & Unfurnished | Family & Bachelor | Starting ₹8,000/month | Zero Brokerage | Immediate Possession Available!" />
      <meta name="keywords" content="Properties for Sale, 1-4 BHK Houses & Flats, Furnished & Unfurnished, Family & Bachelor, Starting ₹8,000/month, Zero Brokerage, Immediate Possession Available!" />
      <meta name="author" content="Landmark Plots" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href="https://landmarkplots.com/properties-for-sale" />
      
      {/* Open Graph Tags */}
      <meta property="og:title" content="Properties for Sale | 1-4 BHK Houses & Flats | Furnished & Unfurnished | Family & Bachelor | Starting ₹8,000/month | Zero Brokerage | Immediate Possession Available!" />
      <meta property="og:description" content="Properties for Sale | 1-4 BHK Houses & Flats | Furnished & Unfurnished | Family & Bachelor | Starting ₹8,000/month | Zero Brokerage | Immediate Possession Available!" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://landmarkplots.com/properties-for-sale" />
      <meta property="og:image" content="https://landmarkplots.com/images/property-banner-img.jpg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Landmark Plots" />
      <meta property="og:locale" content="en_IN" />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Properties for Sale | 1-4 BHK Houses & Flats | Furnished & Unfurnished | Family & Bachelor | Starting ₹8,000/month | Zero Brokerage | Immediate Possession Available!" />
      <meta name="twitter:description" content="Properties for Sale | 1-4 BHK Houses & Flats | Furnished & Unfurnished | Family & Bachelor | Starting ₹8,000/month | Zero Brokerage | Immediate Possession Available!" />
      <meta name="twitter:image" content="https://landmarkplots.com/images/property-banner-img.jpg" />
      <meta name="twitter:site" content="@landmarkplots" />
      
      {/* Additional SEO Tags */}
      <meta name="geo.region" content="IN-HR" />
      <meta name="geo.placename" content="Kurukshetra, Haryana" />
      <meta name="geo.position" content="29.9695;76.8783" />
      <meta name="ICBM" content="29.9695, 76.8783" />

      <div style={{ display: "none" }}>
        {data.map((item, index) => (
          <a key={index} href={`/${item.pro_url}`}>
            {item.pro_url}
          </a>
        ))}
      </div>

      <ClientComp
        data={data}
        currentUser={currentUser}
        recordsPerPage={recordsPerPage}
        currentPage={currentPage}
        totalRecords={totalRecords}
        totalPages={totalPages}
        adType="Sale"
      />
    </div>
  );
};

export default page;
