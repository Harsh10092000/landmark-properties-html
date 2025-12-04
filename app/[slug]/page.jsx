import Address from "@/components/propertyDetailPage/Address";
import Detail2 from "@/components/propertyDetailPage/Detail2";
import ProDetail from "@/components/propertyDetailPage/ProDetail";
import ProHero from "@/components/propertyDetailPage/ProHero";
import React from "react";
import pool from "../libs/mysql";
import TrendingProperties from "@/components/index/trendingProperties/TrendingProperties";
import Disclaimer from "@/components/disclaimer/Disclaimer";
import FeaturedProperties from "@/components/propertyDetailPage/FeaturedProperties";
import MoreProperties from "@/components/propertyDetailPage/MoreProperties";
import DynmaicDesc from "@/components/propertyDetailPage/DynmaicDesc";
import PropertiesAmenities from "@/components/propertyDetailPage/PropertiesAmenities";
import PropertiesDetails from "@/components/propertyDetailPage/PropertiesDetails";
import PropertyHeader from "@/components/propertyDetailPage/PropertyHeader";
import PropertiesDetails2 from "@/components/propertyDetailPage/PropertiesDetails2";
import FavoriteStar from "@/components/common/FavoriteStar";
import PropertyNotFound from "@/components/common/PropertyNotFound";
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { siteConfig, getDefaultImage } from '@/app/config/site';
import { notFound } from 'next/navigation';

const MIN_SLUG_PARTS = 5;

const buildSafeSlugParts = (slug) => {
  if (!slug) return null;
  const parts = slug.split("-").filter(Boolean);
  if (parts.length < MIN_SLUG_PARTS) return null;
  return parts;
};

const buildRelatedLinks = () => [
  `${siteConfig.url}/residential-properties`,
  `${siteConfig.url}/commercial-properties`,
  `${siteConfig.url}/land-properties`,
];

const buildSignificantLinks = () => [
  `${siteConfig.url}/allproperties`,
  `${siteConfig.url}/contactus`,
  `${siteConfig.url}/aboutus`,
  `${siteConfig.url}/properties-for-sale`,
  `${siteConfig.url}/properties-for-rent`,
];

export async function generateMetadata({ params }) {
  const { slug } = params;
  const arrproId = buildSafeSlugParts(slug);
  if (!arrproId) {
    return {
      title: "Property not found",
      description: "Invalid property URL.",
    };
  }
  const proId = arrproId[arrproId.length - 1];
  const listingId = "LM-" + proId;
  const db = await pool;
  const q1 = "SELECT pro_cover_image from property_module WHERE listing_id = ?";
  const [images] = await db.query(q1, listingId);
  const imageData = Array.isArray(images) && images.length > 0 ? images[0] : null;

  //const proId1 = arrproId[arrproId.length - 1];
  //const { row : propertyData} = await getData(slug, proId1);

  const desc = `Check out this ${
    arrproId[0] + " " + arrproId[1] + " " + arrproId[2] + " "
  }${arrproId[3] !== "for" ? arrproId[3] : ""}
for ${
    arrproId[3] === "for" ? arrproId[4] : arrproId[5]
  }. It is an ideal investment opportunity in a prime${
    arrproId[3] !== "for"
      ? " " + arrproId[2] + " " + arrproId[3]
      : " " + arrproId[2] + ""
  } area with verified property assurance.`;

  const capitalizedName1 = arrproId
    .slice(0, arrproId.length - 2)
    .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
    .join(" ");

  const [propertyData] = await db.query(
    "SELECT pro_url, pro_creation_date, pro_ad_type, pro_type, pro_sub_cat, pro_amt, pro_area_size, pro_area_size_unit, pro_bedroom, pro_washrooms, pro_locality, pro_city, pro_state FROM property_module WHERE listing_id = ?",
    listingId
  );
  const data = propertyData[0] || {};

  // Enhanced RealEstateListing schema
  const realEstateListingSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "name": capitalizedName1,
    "url": data.pro_url || `https://landmarkplots.com/${slug}`,
    "datePosted": data.pro_creation_date || new Date().toISOString().split("T")[0],
    "image": {
      "@type": "ImageObject",
      "url": `${siteConfig.url}${siteConfig.seo.businessImage}`,
      "width": 800,
      "height": 600
    },
    "author": {
      "@type": "Organization",
      "name": siteConfig.businessName,
      "alternateName": siteConfig.name,
      "legalName": siteConfig.business.fullBusinessName,
      "url": siteConfig.url,
      "telephone": siteConfig.contact.phone,
      "email": siteConfig.contact.email,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": siteConfig.business.address.streetAddress,
        "addressLocality": siteConfig.business.address.city,
        "addressRegion": siteConfig.business.address.region,
        "addressCountry": siteConfig.business.address.country,
        "postalCode": "136118"
      }
    },
    "description": desc,
    "offers": {
      "@type": "Offer",
      "price": data.pro_amt || "Contact for price",
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": siteConfig.businessName,
        "url": siteConfig.url
      }
    },
    "itemOffered": {
      "@type": "Property",
      "name": capitalizedName1,
      "description": desc,
      "floorSize": {
        "@type": "QuantitativeValue",
        "value": data.pro_area_size || "",
        "unitText": data.pro_area_size_unit || "sq ft"
      },
      "numberOfRooms": data.pro_bedroom || "",
      "numberOfBathroomsTotal": data.pro_washrooms || "",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": data.pro_locality || data.pro_city || "",
        "addressRegion": data.pro_state || "",
        "addressCountry": "IN"
      },
      "propertyType": data.pro_type || "Property"
    },
    "relatedLink": buildRelatedLinks(),
    "significantLink": buildSignificantLinks(),
  };

  // LocalBusiness schema for regional focus
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": siteConfig.businessName,
    "alternateName": siteConfig.name,
    "legalName": siteConfig.business.fullBusinessName,
    "url": siteConfig.url,
    "description": "Landmark Properties is a real estate company specializing in buying, selling, and renting various types of properties across Haryana, with a strong focus on Kurukshetra and surrounding areas.",
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
    "areaServed": [
      {
        "@type": "Place",
        "name": "Kurukshetra, Haryana"
      },
      {
        "@type": "Place",
        "name": "Haryana, India"
      }
    ],
    "serviceType": [
      "Property Sales",
      "Property Rentals", 
      "Land Sales",
      "Commercial Properties",
      "Residential Properties",
      "Premium Villa Plots",
      "Agricultural Land",
      "Property Consultation",
      "Expert Guidance"
    ],
    "foundingDate": siteConfig.business.foundingDate,
    "sameAs": [
      siteConfig.url,
      siteConfig.social.instagram
    ]
  };

  // Organization schema for company information
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": siteConfig.businessName,
    "alternateName": siteConfig.name,
    "legalName": siteConfig.business.fullBusinessName,
    "url": siteConfig.url,
    "description": "Landmark Properties is a premier real estate company specializing in buying, selling, and renting various types of properties. We offer expert guidance and consultation services for property transactions across Haryana, with a strong regional focus on Kurukshetra and surrounding areas.",
    "priceRange": siteConfig.business.priceRange,
    "paymentAccepted": siteConfig.business.paymentAccepted,
    "currenciesAccepted": siteConfig.business.currenciesAccepted,
    "logo": {
      "@type": "ImageObject",
      "url": `${siteConfig.url}${siteConfig.seo.logo}`,
      "width": 32,
      "height": 32
    },
    "image": {
      "@type": "ImageObject",
      "url": `${siteConfig.url}${siteConfig.seo.businessImage}`,
      "width": 800,
      "height": 600
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": siteConfig.contact.phone,
      "contactType": "customer service",
      "availableLanguage": siteConfig.seo.languages
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": siteConfig.business.address.streetAddress,
      "addressLocality": siteConfig.business.address.city,
      "addressRegion": siteConfig.business.address.region,
      "addressCountry": siteConfig.business.address.country,
      "postalCode": "136118"
    },
    "sameAs": [
      siteConfig.url,
      siteConfig.social.instagram
    ]
  };

  return {
    title: capitalizedName1,
    description: desc,
    openGraph: {
      type: "website",
      url: `https://landmarkplots.com/${slug}`,
      title: capitalizedName1,
      description: desc,
      images: [
        {
          url:
            imageData?.pro_cover_image
              ? `${siteConfig.url}/uploads/${imageData.pro_cover_image}`
              : `${siteConfig.url}/uploads/${getDefaultImage(data.pro_type, data.pro_sub_cat)}`,
          width: 1200,
          height: 630,
          alt: capitalizedName1,
        },
      ],
    },
    metadataBase: new URL("https://landmarkplots.com"),
    alternates: {
      canonical: `https://landmarkplots.com/${slug}`,
    },
  };
}

const getData = async (slug, proId) => {
  try {
    const listingId = "LM-" + proId;
    const db = await pool;
    // Increment view counter safely (pro_views is stored as VARCHAR)
    const incQuery = `
      UPDATE property_module
      SET pro_views = (
        CASE
          WHEN pro_views REGEXP '^[0-9]+'
            THEN CAST(pro_views AS UNSIGNED) + 1
          ELSE 1
        END
      )
      WHERE listing_id = ?
    `;
    await db.query(incQuery, [listingId]);

    const q = "SELECT * from property_module where listing_id = ?";
    const [rows] = await db.query(q, listingId);

    // const q1 = "SELECT * from property_module_images WHERE img_cnct_id = ?";
    // const [images] = await db.query(q1, proId);
    // const updatedImages = [...images, { img_link: "property-banner-img.jpg" }];

    // const q2 = `SELECT DISTINCT property_module_images.* , property_module.* , agent_data.agent_type as user_type, agent_data.agent_name , agent_data.agent_sub_district, agent_data.agent_city, agent_data.agent_state FROM property_module left join property_module_images on
    //   property_module.pro_id = property_module_images.img_cnct_id left join (SELECT agent_type,user_cnct_id,agent_name ,agent_sub_district, agent_city, agent_state, agent_image FROM agent_module) as agent_data on
    //   property_module.pro_user_id = agent_data.user_cnct_id where pro_listed = 1 group by pro_id ORDER BY pro_id DESC limit 6`;
    // const [latestProperty] = await db.query(q2);

    const q2 = `SELECT pro_ad_type, pro_amt, pro_locality, pro_washrooms, pro_bedroom, pro_area_size , pro_area_size_unit, pro_user_id, pro_user_type, pro_url, listing_id, pro_type, pro_city, pro_state, pro_cover_image, pro_creation_date, pro_views FROM property_module where pro_listed = 1 ORDER BY pro_id DESC limit 6`;
    const [latestProperty] = await db.query(q2);

    // const q3 =
    //   "SELECT agent_name ,agent_sub_district, agent_city, agent_state FROM agent_module where user_cnct_id = ?";
    // const [agentData] = await db.query(q3, rows[0].pro_user_id);

    // const q4 = "SELECT agent_type FROM agent_module where user_cnct_id = ?";
    // const [userType] = await db.query(q4, rows[0].pro_user_id);

    if (!rows || rows.length === 0) {
      return {
        row: null,
        latestProperty: latestProperty,
        error: "Property not found"
      };
    }

    return {
      row: rows[0],
      // images: updatedImages,
      latestProperty: latestProperty,
      // agentData: agentData[0],
      // userType: userType[0],
    };
  } catch (err) {
    console.log("Something went wrong: ", err);
    return {
      row: null,
      latestProperty: [],
      error: "Something went wrong"
    };
  }
};

const page = async ({ params }) => {
  // Get user session
  const session = await getServerSession(authOptions);
  const currentUser = session?.user?.id || "";

  const { slug } = params;
  const arrproId = buildSafeSlugParts(slug);
  if (!arrproId) {
    notFound();
  }

  const proId1 = arrproId[arrproId.length - 1];

  const {
    row: propertyData,
    latestProperty: latestProperty,
    error: dbError,
    // agentData: agentData,
    // userType: userType,
  } = await getData(slug, proId1);

  const handleNullString = (value) => {
    if (value === null || value === undefined || value === "") {
      return "-";
    }
    return value;
  };

    // Check if property exists
  if (!propertyData) {
    return (
      <>
        <PropertyNotFound latestProperty={latestProperty} currentUser={currentUser} />
        <TrendingProperties data={latestProperty} currentUser={currentUser} />
      </>
    );
  }

  // Check if there's an unexpected error
  if (propertyData && propertyData.error) {
    return (
      <>
        <PropertyNotFound latestProperty={latestProperty} currentUser={currentUser} />
        <TrendingProperties data={latestProperty} currentUser={currentUser} />
      </>
    );
  }

    // Generate structured data for this specific property
  const generatePropertyStructuredData = () => {
    const capitalizedName1 = arrproId
      .slice(0, arrproId.length - 2)
      .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
      .join(" ");

    const desc = `Check out this ${
      arrproId[0] + " " + arrproId[1] + " " + arrproId[2] + " "
    }${arrproId[3] !== "for" ? arrproId[3] : ""}
for ${
      arrproId[3] === "for" ? arrproId[4] : arrproId[5]
    }. It is an ideal investment opportunity in a prime${
      arrproId[3] !== "for"
        ? " " + arrproId[2] + " " + arrproId[3]
        : " " + arrproId[2] + ""
    } area with verified property assurance.`;

    // RealEstateListing schema for this specific property
    const realEstateListingSchema = {
      "@context": "https://schema.org",
      "@type": "RealEstateListing",
      "name": capitalizedName1,
      "url": `https://landmarkplots.com/${slug}`,
      "datePosted": propertyData?.pro_creation_date || new Date().toISOString().split("T")[0],
      "author": {
        "@type": "Organization",
        "name": siteConfig.businessName,
        "alternateName": siteConfig.name,
        "legalName": siteConfig.business.fullBusinessName,
        "url": siteConfig.url,
        "telephone": siteConfig.contact.phone,
        "email": siteConfig.contact.email,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": siteConfig.business.address.streetAddress,
          "addressLocality": siteConfig.business.address.city,
          "addressRegion": siteConfig.business.address.region,
          "addressCountry": siteConfig.business.address.country,
          "postalCode": "136118"
        }
      },
      "description": desc,
      "offers": {
        "@type": "Offer",
        "price": propertyData?.pro_amt || "Contact for price",
        "priceCurrency": "INR",
        "availability": "https://schema.org/InStock",
        "seller": {
          "@type": "Organization",
          "name": siteConfig.businessName,
          "url": siteConfig.url
        }
      },
      "itemOffered": {
        "@type": "Property",
        "name": capitalizedName1,
        "description": desc,
        "floorSize": {
          "@type": "QuantitativeValue",
          "value": propertyData?.pro_area_size || "",
          "unitText": propertyData?.pro_area_size_unit || "sq ft"
        },
        "numberOfRooms": propertyData?.pro_bedroom || "",
        "numberOfBathroomsTotal": propertyData?.pro_washrooms || "",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": propertyData?.pro_locality || propertyData?.pro_city || "",
          "addressRegion": propertyData?.pro_state || "",
          "addressCountry": "IN"
        },
        "propertyType": propertyData?.pro_type || "Property"
      },
    "relatedLink": buildRelatedLinks(),
    "significantLink": buildSignificantLinks(),
    };

    // LocalBusiness schema for regional focus - Property Detail Page specific
    const localBusinessSchema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": siteConfig.businessName,
      "alternateName": siteConfig.name,
      "legalName": siteConfig.business.fullBusinessName,
      "url": siteConfig.url,
      "description": "Landmark Properties is a real estate company specializing in buying, selling, and renting various types of properties across Haryana, with a strong focus on Kurukshetra and surrounding areas.",
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
      "areaServed": [
        {
          "@type": "Place",
          "name": "Kurukshetra, Haryana"
        },
        {
          "@type": "Place",
          "name": "Haryana, India"
        }
      ],
      "serviceType": [
        "Property Sales",
        "Property Rentals", 
        "Land Sales",
        "Commercial Properties",
        "Residential Properties",
        "Premium Villa Plots",
        "Agricultural Land",
        "Property Consultation",
        "Expert Guidance"
      ],
      "foundingDate": siteConfig.business.foundingDate,
      "sameAs": [
        siteConfig.url,
        siteConfig.social.instagram
      ]
    };

    return { realEstateListingSchema, localBusinessSchema };
  };

  const { realEstateListingSchema, localBusinessSchema } = generatePropertyStructuredData();

    return (
    <>
      {/* Structured Data for Property Detail Page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(realEstateListingSchema)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema)
        }}
      />

      
      <section className="listing__page--section section--padding">
        <div className="container">
          
          <div className="bg-box">
             <div className="bread-crm">
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <a href="#">All Property</a>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">
                    {propertyData?.pro_type}
                  </li>
                </ol>
              </nav>
            </div>
           <div className="spaceing-outer">
            <div className="row">
              <div className="col-lg-8">
                <ProDetail propertyData={propertyData} proSlug={arrproId} />
              </div>
              <div className="col-lg-4">
                <div className="property-id">
                  Property ID <span class="listing__details--badge">{propertyData?.listing_id}</span>
                </div>
              </div>
              <div className="col-lg-12">
                <PropertyHeader propertyData={propertyData} />
              </div>
              <div className="col-lg-6">
                <div className="position-relative">
                  {/* Favorite Star */}
                  <FavoriteStar 
                    propertyId={propertyData?.listing_id || propertyData?.pro_id} 
                    userId={currentUser?.login_id || currentUser}
                    propertyUserId={propertyData?.pro_user_id}
                    size={24}
                  />
                  <ProHero propertyData={propertyData} />
                  
                  {/* Listed By Information */}
                  {/* <div style={{ 
                    position: 'absolute',
                    top: '10px',
                    right: '50px',
                    background: 'rgba(255, 255, 255, 0.9)',
                    padding: '6px 12px',
                    borderRadius: '20px',
                    fontSize: '13px',
                    color: '#666',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    zIndex: 10
                  }}>
                    <span>📋</span>
                    <span>
                      {(() => {
                        const userId = currentUser?.login_id || currentUser;
                        const propertyUserId = propertyData?.pro_user_id;
                        const isOwnProperty = userId && propertyUserId && String(userId) === String(propertyUserId);
                        
                        return isOwnProperty ? "Listed by me" : `Listed by ${propertyData?.pro_user_type || 'Owner'}`;
                      })()}
                    </span>
                  </div> */}
                </div>
              </div>
              <div className="col-lg-6">
                {/* <Detail2 propertyData={propertyData} /> */}
                <div className="property-details-wrapper">
                  <PropertiesDetails
                    propertyData={propertyData}
                    handleNullString={handleNullString}
                  />
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
        <section className="listing__details--section section--padding">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <div className="listing__details--wrapper">
                  {/* <ProDetail propertyData={propertyData} proSlug={arrproId} /> */}
                  <div className="listing__details--main__content">
                    <div className="listing__details--content__step mb-30">
                      {propertyData !== null && (
                        <DynmaicDesc propertyData={propertyData} />
                      )}
                    </div>

                    {propertyData !== null && (
                      <>
                        {/* <PropertiesDetails2 propertyData={propertyData} handleNullString={handleNullString}/> */}
                        <PropertiesAmenities data={propertyData} />
                        <Address mapdata={propertyData} />
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="bg-box p-3">
                <MoreProperties />
                <div className="listing__widget">
                  {/* <FeaturedProperties />
                  <FeaturedProperties /> */}
                  {/* <FeaturedItems /> */}
                </div>
                </div>
              </div>
            </div>
          </div>
          {/* <TrendingProperties data={latestProperty}  /> */}
          

          <div className="mt-5 mb-5">
           
                  <TrendingProperties data={latestProperty} currentUser={currentUser} />
             
          </div>
          
          <Disclaimer />
        </section>
      </section>
    </>
    );
};

export default page;
