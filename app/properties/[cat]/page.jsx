import React from "react";
import pool from "@/app/libs/mysql";
import Page2 from "./page2";
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function generateMetadata({ params }, parent) {
  const { cat } = await params;
  if (!cat) {
    return <div>Invalid Property ID</div>;
  }

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  let location = "";
  let adType = "All Properties";
  let catType = "";
 
  if (
    cat === "commercial-properties" ||
    cat === "land-properties" ||
    cat === "residential-properties"
  ) {
    catType = capitalizeFirstLetter(cat.split("-")[0]);
  } else if (cat.startsWith("properties-for-sale-in")) {
    const location_len = cat.substring("properties-for-sale-in-".length);
    adType = "Sale";
    if (location_len.includes("-")) {
      location = location_len
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    } else {
      location = location_len.charAt(0).toUpperCase() + location_len.slice(1);
    }
  } else if (cat.startsWith("properties-for-rent-in")) {
    const location_len = cat.substring("properties-for-rent-in-".length);
    adType = "Rent";
    if (location_len.includes("-")) {
      location = location_len
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    } else {
      location = location_len.charAt(0).toUpperCase() + location_len.slice(1);
    }
  } else if (cat.startsWith("properties-for-sale")) {
    adType = "Sale";
  } else if (cat.startsWith("properties-for-rent")) {
    adType = "Rent";
  }

  




  // Generate high-impact SEO content for better rankings
  let desc = "";
  let capitalizedName1 = "";
  
  if (cat === "commercial-properties") {
    desc = `🏢 Commercial Properties for Sale & Rent | Best Investment Opportunities | Shops, Offices, Warehouses | Prime Locations | Verified Listings | Expert Guidance | Starting ₹10 Lakh | Call Now!`;
    capitalizedName1 = `Commercial Properties for Sale & Rent | Best Investment Deals`;
  } else if (cat === "residential-properties") {
    desc = `🏡 Residential Properties | Independent Houses, Flats, Villas for Sale & Rent | 1-5 BHK | Prime Locations | Verified Owners | No Brokerage | Starting ₹15 Lakh | Book Site Visit Today!`;
    capitalizedName1 = `Residential Properties | Houses, Flats, Villas for Sale & Rent`;
  } else if (cat === "land-properties") {
    desc = `🌾 Agricultural & Residential Land for Sale | Plot Sizes: 100 Sq Yard to 10+ Acres | Clear Title | Registry Ready | Investment Grade Land | Starting ₹5 Lakh | Free Site Visit & Documentation!`;
    capitalizedName1 = `Land for Sale | Agricultural & Residential Plots | Clear Title`;
  } else if (cat.startsWith("properties-for-sale-in")) {
    desc = `🏠 Properties for Sale in ${location}, Kurukshetra | Houses, Flats, Land, Commercial | Ready to Move & Under Construction | Loan Assistance | Verified Owners | No Hidden Charges | Best Deals Starting ₹10 Lakh!`;
    capitalizedName1 = `Properties for Sale in ${location}, Kurukshetra | Houses, Flats, Land, Commercial`;
  } else if (cat.startsWith("properties-for-rent-in")) {
    desc = `🏘️ Properties for Rent in ${location}, Kurukshetra | 1-4 BHK Houses & Flats | Furnished & Unfurnished | Family & Bachelor | Starting ₹8,000/month | Zero Brokerage | Immediate Possession Available!`;
    capitalizedName1 = `Properties for Rent in ${location}, Kurukshetra | Houses & Flats | Zero Brokerage`;
  } else if (cat.startsWith("properties-for-sale")) {
    desc = `💰 Properties for Sale | 5000+ Verified Listings | Houses, Flats, Land, Commercial | Best Investment Options | EMI Starting ₹8,000/month | Expert Property Consultants | Free Legal Assistance!`;
    capitalizedName1 = `Properties for Sale | 5000+ Verified Listings | Best Investment Options`;
  } else if (cat.startsWith("properties-for-rent")) {
    desc = `🏡 Properties for Rent | 2000+ Rental Options | 1-5 BHK Houses & Flats | Furnished/Unfurnished | PG & Family | Starting ₹5,000/month | Zero Brokerage | Instant Booking Available!`;
    capitalizedName1 = `Properties for Rent | 2000+ Rental Options | Zero Brokerage`;
  } else {
    desc = `🏆 #1 Real Estate in Kurukshetra | 10,000+ Properties | Sale & Rent | Houses, Flats, Land, Commercial | Best Prices Guaranteed | Expert Guidance | Free Site Visits | Trusted by 50,000+ Customers!`;
    capitalizedName1 = `#1 Real Estate in Kurukshetra | 10,000+ Properties | Sale & Rent | Best Prices`;
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: capitalizedName1,
    url: `https://landmarkplots.com/properties/${cat}`,
    datePosted: new Date().toISOString().split("T")[0],
    author: {
      "@type": "Organization",
      name: "Landmark Plots",
    },
    description: desc,
    relatedLink: [
      "https://landmarkplots.com/properties/residential-properties",
      "https://landmarkplots.com/properties/commercial-properties",
      "https://landmarkplots.com/properties/land-properties",
    ].filter(Boolean),
    significantLink: [
      "https://landmarkplots.com/allproperties",
      "https://landmarkplots.com/contactus",
      "https://landmarkplots.com/aboutus",
      "https://landmarkplots.com/properties/properties-for-sale",
      "https://landmarkplots.com/properties/properties-for-rent",
    ],
  };

  return {
    title: capitalizedName1,
    description: desc,
    openGraph: {
      type: "website",
      url: `https://landmarkplots.com/properties/${cat}`,
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
      canonical: `https://landmarkplots.com/properties/${cat}`,
    },
    other: {
      "schema.org": JSON.stringify(schema),
    },
  };
}

const getData = async () => {
  try {
    const db = await pool;
    const q = `SELECT * FROM property_module where pro_listed = 1 ORDER BY pro_id DESC`;
    const q1 =
      "SELECT COUNT(*) as total from property_module where pro_listed = 1";
    const [rows] = await db.query(q);
    const [total] = await db.query(q1);

    return { row: rows, total: total };
  } catch (err) {
    return err;
  }
};

const page = async ({ params, searchParams }) => {
  // Get user session
  const session = await getServerSession(authOptions);
  const currentUser = session?.user?.id || "";
  
  const { cat } = await params;
  if (!cat) {
    return <div>Invalid Property ID</div>;
  }

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  //const arrproId = cat.split("-");
  let arrproId = [];
  let location = "";
  let adType = "All Properties";
  let location_len = "";
  let catType = "";
 
  if (
    cat === "commercial-properties" ||
    cat === "land-properties" ||
    cat === "residential-properties"
  ) {
    arrproId = cat.split("-");
    catType = capitalizeFirstLetter(arrproId[0]);
  } else if (cat.startsWith("properties-for-sale-in")) {
    location_len = cat.substring("properties-for-sale-in-".length);

    adType = "Sale";
    if (location_len.includes("-")) {
      location = location_len
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    } else {
      location = location_len.charAt(0).toUpperCase() + location_len.slice(1);
    }
  } else if (cat.startsWith("properties-for-rent-in")) {
    adType = "Rent";
    location_len = cat.substring("properties-for-rent-in-".length);
    if (location_len.includes("-")) {
      location = location_len
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    } else {
      location = location_len.charAt(0).toUpperCase() + location_len.slice(1);
    }
  } else if (cat.startsWith("properties-for-sale")) {
    adType = "Sale";
  } else if (cat.startsWith("properties-for-rent")) {
    adType = "Rent";
  }

  let currentPage = (await searchParams["page"]) || 1;
  const res = await getData(currentPage);
  const data = res.row;

  const recordsPerPage = 12;
  // Generate high-converting SEO content for maximum rankings
  let seoTitle = "";
  let seoDescription = "";
  let canonicalUrl = "";
  
  if (cat === "commercial-properties") {
    seoTitle = `Commercial Properties for Sale & Rent | Best Investment Deals - Landmark Plots`;
    seoDescription = `🏢 Commercial Properties for Sale & Rent | Best Investment Opportunities | Shops, Offices, Warehouses | Prime Locations | Verified Listings | Expert Guidance | Starting ₹10 Lakh | Call Now!`;
    canonicalUrl = `https://landmarkplots.com/properties/${cat}`;
  } else if (cat === "residential-properties") {
    seoTitle = `Residential Properties | Houses, Flats, Villas for Sale & Rent - Landmark Plots`;
    seoDescription = `🏡 Residential Properties | Independent Houses, Flats, Villas for Sale & Rent | 1-5 BHK | Prime Locations | Verified Owners | No Brokerage | Starting ₹15 Lakh | Book Site Visit Today!`;
    canonicalUrl = `https://landmarkplots.com/properties/${cat}`;
  } else if (cat === "land-properties") {
    seoTitle = `Land for Sale | Agricultural & Residential Plots | Clear Title - Landmark Plots`;
    seoDescription = `🌾 Agricultural & Residential Land for Sale | Plot Sizes: 100 Sq Yard to 10+ Acres | Clear Title | Registry Ready | Investment Grade Land | Starting ₹5 Lakh | Free Site Visit & Documentation!`;
    canonicalUrl = `https://landmarkplots.com/properties/${cat}`;
  } else if (cat.startsWith("properties-for-sale-in")) {
    seoTitle = `Properties for Sale in ${location}, Kurukshetra | Houses, Flats, Land, Commercial - Landmark Plots`;
    seoDescription = `🏠 Properties for Sale in ${location}, Kurukshetra | Houses, Flats, Land, Commercial | Ready to Move & Under Construction | Loan Assistance | Verified Owners | No Hidden Charges | Best Deals Starting ₹10 Lakh!`;
    canonicalUrl = `https://landmarkplots.com/properties/${cat}`;
  } else if (cat.startsWith("properties-for-rent-in")) {
    seoTitle = `Properties for Rent in ${location}, Kurukshetra | Houses & Flats | Zero Brokerage - Landmark Plots`;
    seoDescription = `🏘️ Properties for Rent in ${location}, Kurukshetra | 1-4 BHK Houses & Flats | Furnished & Unfurnished | Family & Bachelor | Starting ₹8,000/month | Zero Brokerage | Immediate Possession Available!`;
    canonicalUrl = `https://landmarkplots.com/properties/${cat}`;
  } else if (cat.startsWith("properties-for-sale")) {
    seoTitle = `Properties for Sale | 5000+ Verified Listings | Best Investment Options - Landmark Plots`;
    seoDescription = `💰 Properties for Sale | 5000+ Verified Listings | Houses, Flats, Land, Commercial | Best Investment Options | EMI Starting ₹8,000/month | Expert Property Consultants | Free Legal Assistance!`;
    canonicalUrl = `https://landmarkplots.com/properties/${cat}`;
  } else if (cat.startsWith("properties-for-rent")) {
    seoTitle = `Properties for Rent | 2000+ Rental Options | Zero Brokerage - Landmark Plots`;
    seoDescription = `🏡 Properties for Rent | 2000+ Rental Options | 1-5 BHK Houses & Flats | Furnished/Unfurnished | PG & Family | Starting ₹5,000/month | Zero Brokerage | Instant Booking Available!`;
    canonicalUrl = `https://landmarkplots.com/properties/${cat}`;
  } else {
    seoTitle = `#1 Real Estate in Kurukshetra | 10,000+ Properties | Sale & Rent | Best Prices - Landmark Plots`;
    seoDescription = `🏆 #1 Real Estate in Kurukshetra | 10,000+ Properties | Sale & Rent | Houses, Flats, Land, Commercial | Best Prices Guaranteed | Expert Guidance | Free Site Visits | Trusted by 50,000+ Customers!`;
    canonicalUrl = `https://landmarkplots.com/properties/${cat}`;
  }

  return (
    <div className="container">
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <meta name="keywords" content={`${catType || 'properties'} Kurukshetra, ${adType.toLowerCase()} property, ${location || 'Kurukshetra'} real estate, property dealer, land broker, house for sale, flat for rent, commercial property, investment property, property prices, real estate agent, verified properties, no brokerage, EMI calculator, home loan, property registration, Landmark Plots`} />
      <meta name="author" content="Landmark Plots" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph Tags */}
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content="https://landmarkplots.com/images/property-banner-img.jpg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Landmark Plots" />
      <meta property="og:locale" content="en_IN" />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content="https://landmarkplots.com/images/property-banner-img.jpg" />
      <meta name="twitter:site" content="@landmarkplots" />
      
      {/* Additional SEO Tags */}
      <meta name="geo.region" content="IN-HR" />
      <meta name="geo.placename" content={location || "Kurukshetra"} />
      <meta name="geo.position" content="29.9695;76.8783" />
      <meta name="ICBM" content="29.9695, 76.8783" />

      <div style={{ display: "none" }}>
        {data.map((item, index) => (
          <a key={index} href={`/${item.pro_url}`}>
            {item.pro_url}
          </a>
        ))}
      </div>

      <Page2
        data={data}
        currentUser={currentUser}
        recordsPerPage={recordsPerPage}
        currentPage={currentPage}
        catType={catType}
        cat={cat}
        adType={adType}
        location={location}
      />
    </div>
  );
};

export default page;
