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


export async function generateMetadata({ params }, parent) {
  

  const { slug } = params;
  if (!slug) {
    return <div>Invalid Property ID</div>;
  }
  const arrproId = slug.split("-");
  const proId = arrproId[arrproId.length - 1];

  const db = await pool;
  const q1 = "SELECT * from property_module_images WHERE img_cnct_id = ?";
  const [images] = await db.query(q1, proId);
 // console.log("images : " , images[0].img_link);
  //const updatedImages = [...images, { img_link: "default.webp" }];


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
    .slice(0, arrproId.length - 1)
    .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
    .join(" ");


    const [propertyData] = await db.query(
      "SELECT pro_url, pro_creation_date, pro_ad_type, pro_type FROM property_module WHERE pro_id = ?",
      proId
    );
    const data = propertyData[0] || {}; 
  
    const schema = {
      "@context": "https://schema.org",
      "@type": "RealEstateListing",
      "name": capitalizedName1, 
      "url": data.pro_url || `https://landmarkplots.com/${slug}`, 
      "datePosted": data.pro_creation_date || new Date().toISOString().split('T')[0], 
      "author": {
        "@type": "Person",
        "name": data.pro_ad_type || "Unknown" 
      },
      "description": desc,
      "relatedLink": [
        `https://landmarkplots.com/properties/residential-properties`
      ].filter(Boolean), 
      "significantLink": [
        "https://landmarkplots.com/allproperties",
        "https://landmarkplots.com/contactus",
        "https://landmarkplots.com/aboutus",
        "https://landmarkplots.com/properties/properties-for-sale",
        "https://landmarkplots.com/properties/properties-for-rent",
      ]
    };

  return {
    title: capitalizedName1,
    description: desc,
    openGraph: {
      type: 'website',  
      url: `https://landmarkplots.com/${slug}`,
      title: capitalizedName1,
      description: desc,
      images: [{
        url: images[0] !== undefined ? `https://api.propertyease.in//propertyImages/watermark/${images[0].img_link}` : 'https://landmarkplots.com/images/property-banner-img.jpg',
        width: 1200,
        height: 630,
        alt: capitalizedName1
      }]
    },
    metadataBase: new URL('https://landmarkplots.com'),
    alternates: {
      canonical: `https://landmarkplots.com/${slug}`
    },
    other: {
      'schema.org': JSON.stringify(schema)
    }
  };
}

const getData = async (slug, proId) => {
  try {
    const db = await pool;
    const q = "SELECT * from property_module where pro_id = ?";
    const [rows] = await db.query(q, proId);

    const q1 = "SELECT * from property_module_images WHERE img_cnct_id = ?";
    const [images] = await db.query(q1, proId);
    const updatedImages = [...images, { img_link: "property-banner-img.jpg" }];

    const q2 = `SELECT DISTINCT property_module_images.* , property_module.* , agent_data.agent_type as user_type, agent_data.agent_name , agent_data.agent_sub_district, agent_data.agent_city, agent_data.agent_state FROM property_module left join property_module_images on 
      property_module.pro_id = property_module_images.img_cnct_id left join (SELECT agent_type,user_cnct_id,agent_name ,agent_sub_district, agent_city, agent_state, agent_image FROM agent_module) as agent_data on 
      property_module.pro_user_id = agent_data.user_cnct_id where pro_listed = 1 group by pro_id ORDER BY pro_id DESC limit 6`;
    const [latestProperty] = await db.query(q2);

    const q3 =
      "SELECT agent_name ,agent_sub_district, agent_city, agent_state FROM agent_module where user_cnct_id = ?";
    const [agentData] = await db.query(q3, rows[0].pro_user_id);

    const q4 = "SELECT agent_type FROM agent_module where user_cnct_id = ?";
    const [userType] = await db.query(q4, rows[0].pro_user_id);

    return {
      row: rows[0],
      images: updatedImages,
      latestProperty: latestProperty,
      agentData: agentData[0],
      userType: userType[0],
    };
  } catch (err) {
    console.log("err : ", err);
    return err;
  }
};

const page = async ({ params }) => {
  const currentUser = "";
  const { slug } = params;
  if (!slug) {
    return <div>Invalid Property ID</div>;
  }

  const arrproId = slug.split("-");
  const proId1 = arrproId[arrproId.length - 1];

  const {
    row: propertyData,
    images,
    latestProperty: latestProperty,
    agentData: agentData,
    userType: userType,
  } = await getData(slug, proId1);

  return (
    <>
      <section className="listing__page--section section--padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <PropertyHeader propertyData={propertyData} />
            </div>
            <div className="col-lg-6">
              <ProHero images={images} propertyData={propertyData} />
            </div>
            <div className="col-lg-6">
              <ProDetail propertyData={propertyData} proSlug={arrproId} />
              <Detail2 propertyData={propertyData} />
              <div className="property-details-wrapper">
                <PropertiesDetails />
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
                    <div className="listing__details--content__step mb-80">
                      <DynmaicDesc data={propertyData} />
                    </div>

                    {propertyData !== null && (
                      <>
                       
                        <PropertiesDetails />
                        <PropertiesAmenities />
                        <Address mapdata={propertyData} />
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <MoreProperties />
                <div className="pt-5 listing__widget">
                  <FeaturedProperties />
                  <FeaturedProperties />
                  {/* <FeaturedItems /> */}
                </div>
              </div>
            </div>
          </div>
          {/* <TrendingProperties data={latestProperty}  /> */}
          <Disclaimer />
        </section>
      </section>
    </>
  );
};

export default page;
