import About from '@/components/index/about/About'
import ChooseUs from '@/components/index/chooseUs/ChooseUs'
import CityBanner from '@/components/index/cityBanner/CityBanner'
import Hero from '@/components/index/hero/Hero'
import PropertyByType from '@/components/index/propertyByType/PropertyByType'
//import Reviews from '@/components/index/reviews/Reviews'
import Services from '@/components/index/services/Services'

import dynamic from 'next/dynamic'
import TrendingProperties from '@/components/index/trendingProperties/TrendingProperties'

import React from 'react'
import pool from './libs/mysql'
import Reviews from '@/components/common/Reviews'
import PropertiesCategories from '@/components/about/PropertiesCategories'
//import NewsletterSection from '@/components/common/NewsletterSection'
import { getServerSession } from 'next-auth/next';
import { authOptions } from './api/auth/[...nextauth]/route';
import { siteConfig } from '@/app/config/site';

// const TrendingProperties = dynamic(() => import('@/components/index/trendingProperties/TrendingProperties'), {
//   loading: () => <div>Loading...</div>,
// })

export async function generateMetadata({ params }, parent) {
  const desc = siteConfig.description;
  const title = "LandmarkPlots - Buy, Rent, Sell Your Ideal Property Today";
  const ogImage = `${siteConfig.url}${siteConfig.seo.defaultImage}`;

  return {
    title,
    description: desc,
    openGraph: {
      type: 'website',
      url: siteConfig.url + '/',
      title,
      description: desc,
      images: [{
        url: ogImage,
        width: 1200,
        height: 630,
        alt: title
      }]
    },
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: siteConfig.url + '/'
    },
  };
}

const getData = async () => {
  try {
    const db = await pool;
    // const q = `SELECT DISTINCT property_module_images.* , property_module.* , agent_data.agent_type as user_type, agent_data.agent_name , agent_data.agent_sub_district, agent_data.agent_city, agent_data.agent_state FROM property_module left join property_module_images on 
    //   property_module.pro_id = property_module_images.img_cnct_id left join (SELECT agent_type,user_cnct_id,agent_name ,agent_sub_district, agent_city, agent_state, agent_image FROM agent_module) as agent_data on 
    //   property_module.pro_user_id = agent_data.user_cnct_id where pro_listed = 1 group by pro_id ORDER BY pro_id DESC limit 6`;


    const q = `SELECT pro_ad_type, pro_amt, pro_locality, pro_washrooms, pro_bedroom, pro_area_size , pro_area_size_unit, pro_user_id, pro_user_type, pro_url, listing_id, pro_type, pro_city, pro_state, pro_cover_image, pro_creation_date, pro_views FROM property_module where pro_listed = 1 ORDER BY pro_id DESC limit 6`;

      const q1 =
      "SELECT COUNT(pro_type) AS pro_sub_cat_number, pro_type FROM property_module WHERE pro_listed = 1 GROUP BY pro_type ORDER BY COUNT(pro_type) DESC;";

      const q2 = 
      "SELECT COUNT(pro_city) AS pro_city_number, pro_city FROM property_module WHERE pro_listed = 1 GROUP BY pro_city ORDER BY COUNT(pro_city) DESC limit 4;"
    
      const [rows] = await db.query(q);
      const [subCatCount] = await db.query(q1);
      const [cityCount] = await db.query(q2);

    return { data: rows, subData: subCatCount , cityCount: cityCount};
  } catch (err) {
    console.log("err : ", err);
    return err;
  }
};

const propertyTypeOptions = [
  { type: "All Properties" },
  { type: "Residential" },
  { type: "Commercial" },
  { type: "Land" },
];

const propertyAdTypeOptions = [
  { type: "All Properties" },
  { type: "Sale" },
  { type: "Rent" },
];


const page = async () => {
  // Get user session
  const session = await getServerSession(authOptions);
  const currentUser = session?.user?.id || "";
  
  const { data, subData, cityCount } = await getData();
  console.log("subData : ", subData);
  return (
    <>
      <Hero propertyTypeOptions={propertyTypeOptions} propertyAdTypeOptions={propertyAdTypeOptions} data={data}  />  
      <TrendingProperties data={data} currentUser={currentUser} />
          <About />
      <Services />
      <PropertiesCategories />
      <ChooseUs />
      {subData[0] &&
      <PropertyByType subData={subData} />
      }
      <CityBanner cityCount={cityCount} />
      {/* <NewsletterSection /> */}
      <Reviews />
    </>
  )
}

export default page
