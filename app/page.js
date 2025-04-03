import About from '@/components/index/about/About'
import ChooseUs from '@/components/index/chooseUs/ChooseUs'
import CityBanner from '@/components/index/cityBanner/CityBanner'
import Hero from '@/components/index/hero/Hero'
import PropertyByType from '@/components/index/propertyByType/PropertyByType'
//import Reviews from '@/components/index/reviews/Reviews'
import Services from '@/components/index/services/Services'
import TrendingProperties from '@/components/index/trendingProperties/TrendingProperties'
import React from 'react'
import pool from './libs/mysql'
import Reviews from '@/components/common/Reviews'
import PropertiesCategories from '@/components/about/PropertiesCategories'

const getData = async () => {
  try {
    const db = await pool;
    const q = `SELECT DISTINCT property_module_images.* , property_module.* , agent_data.agent_type as user_type, agent_data.agent_name , agent_data.agent_sub_district, agent_data.agent_city, agent_data.agent_state FROM property_module left join property_module_images on 
      property_module.pro_id = property_module_images.img_cnct_id left join (SELECT agent_type,user_cnct_id,agent_name ,agent_sub_district, agent_city, agent_state, agent_image FROM agent_module) as agent_data on 
      property_module.pro_user_id = agent_data.user_cnct_id where pro_listed = 1 group by pro_id ORDER BY pro_id DESC limit 6`;

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
  const { data, subData, cityCount } = await getData();
  return (
    <>
      <Hero propertyTypeOptions={propertyTypeOptions} propertyAdTypeOptions={propertyAdTypeOptions}/>
      <About />
      <TrendingProperties data={data}  />
      <Services />
      <PropertiesCategories />
      <ChooseUs />
      <PropertyByType subData={subData} />
      <CityBanner cityCount={cityCount} />
     <Reviews />
    </>
  )
}

export default page
