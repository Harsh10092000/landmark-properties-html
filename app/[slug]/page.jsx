import Address from "@/components/propertyDetailPage/Address";
import Detail2 from "@/components/propertyDetailPage/Detail2";
import ProDetail from "@/components/propertyDetailPage/ProDetail";
import ProHero from "@/components/propertyDetailPage/ProHero";
import React from "react";
import pool from "../libs/mysql";
import TrendingProperties from "@/components/index/trendingProperties/TrendingProperties";
import Disclaimer from "@/components/disclaimer/Disclaimer";
import FeaturedProperties from "@/components/propertyDetailPage/FeaturedProperties";
import FeaturedItems from "@/components/propertyDetailPage/FeaturedItems";
import MoreProperties from "@/components/propertyDetailPage/MoreProperties";
import DynmaicDesc from "@/components/propertyDetailPage/DynmaicDesc";


const getData = async (slug, proId) => {
    try {
      const db = await pool;
      const q = "SELECT * from property_module where pro_id = ?";
      const [rows] = await db.query(q, proId);
  
      const q1 = "SELECT * from property_module_images WHERE img_cnct_id = ?";
      const [images] = await db.query(q1, proId);
      const updatedImages = [...images, { img_link: "default.webp" }];
  
      const q2 = `SELECT DISTINCT property_module_images.* , property_module.* , agent_data.agent_type as user_type, agent_data.agent_name , agent_data.agent_sub_district, agent_data.agent_city, agent_data.agent_state FROM property_module left join property_module_images on 
      property_module.pro_id = property_module_images.img_cnct_id left join (SELECT agent_type,user_cnct_id,agent_name ,agent_sub_district, agent_city, agent_state, agent_image FROM agent_module) as agent_data on 
      property_module.pro_user_id = agent_data.user_cnct_id where pro_listed = 1 group by pro_id ORDER BY pro_id DESC limit 6`;
      const [latestProperty] = await db.query(q2);
  
      const q3 =
        "SELECT agent_name ,agent_sub_district, agent_city, agent_state FROM agent_module where user_cnct_id = ?";
      const [agentData] = await db.query(q3, rows[0].pro_user_id);
  
      const q4 =
      "SELECT agent_type FROM agent_module where user_cnct_id = ?";
      const [userType] = await db.query(q4, rows[0].pro_user_id);
  
      return {
        row: rows[0],
        images: updatedImages,
        latestProperty: latestProperty,
        agentData: agentData[0],
        userType: userType[0]
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
      userType: userType
    } = await getData(slug, proId1);
    
  return (
    <>
     <div class="container-fluid">
          <div class="row">
            <div class="col-lg-7">
      <ProHero images={images} propertyData={propertyData} />
      </div>
      <div  class="col-lg-5">
      <ProDetail propertyData={propertyData} proSlug={arrproId}/>
      <Detail2 propertyData={propertyData} />
      {/* <Address mapdata={propertyData} /> */}
      </div>
      </div>
      </div>
      <section class="listing__details--section section--padding">
        <div class="container">
          <div class="row">
            <div class="col-lg-8">
              <div class="listing__details--wrapper">
               <ProDetail propertyData={propertyData} proSlug={arrproId}/>
               <div class="listing__details--main__content">
               <div className="listing__details--content__step mb-80">
                
               <DynmaicDesc data={propertyData}/>
               </div>
              
               {propertyData !== null && <>
                <Detail2 propertyData={propertyData} />
                    <Address mapdata={propertyData} />
               </>}
                   
                </div>
              </div>
            </div>
            <div class="col-lg-4">
            <MoreProperties />
              <div class="pt-5 listing__widget">
                <FeaturedProperties />
                <FeaturedItems />
                
              </div>
              
            </div>

            
          </div>
        </div>
        {/* <TrendingProperties data={latestProperty}  /> */}
        <Disclaimer />
      </section>
    </>
  );
};

export default page;
