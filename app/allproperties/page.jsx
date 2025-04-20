import PropertyCard from "@/components/propertyListingPage/PropertyCard";
import React from "react";
import pool from "../libs/mysql";
import Test1 from "./test1";
const getData = async () => {
  try {
    const db = await pool;
    const q = `SELECT DISTINCT property_module_images.* ,property_module.* ,agent_data.agent_type as user_type, agent_data.agent_name , agent_data.agent_sub_district, agent_data.agent_city, agent_data.agent_state FROM property_module left join property_module_images on 
    property_module.pro_id = property_module_images.img_cnct_id left join (SELECT agent_type,user_cnct_id,agent_name ,agent_sub_district, agent_city, agent_state FROM agent_module) as agent_data on 
    property_module.pro_user_id = agent_data.user_cnct_id where pro_listed = 1 group by pro_id ORDER BY pro_id DESC`;
    const q1 =
      "SELECT COUNT(*) as total from property_module where pro_listed = 1";
    const [rows] = await db.query(q);
    const [total] = await db.query(q1);

    return { row: rows, total: total };
  } catch (err) {
    return err;
  }
};

const page = async ({ searchParams }) => {
  const currentUser = "";
  
  let currentPage = searchParams["page"] || 1;
  const res = await getData(currentPage);
  const data = res.row;
  const recordsPerPage = 12;
  return (
    <div className="container">
      <title>Landmark Plots - View All Properties</title>
      <meta
        name="description"
        content="Discover your perfect property with LandmarkPlots.com, your trusted platform for buying, renting, and selling prime real estate. Explore a curated selection of exclusive plots, residential, and commercial properties tailored to your needs."
      />
      <meta name="author" content="Landmark Plots" />
      <link rel="canonical" href="https://landmarkplots.com/allproperties" />
      

      <div style={{ display: "none" }}>
        {data.map((item, index) => (
          <a key={index} href={`/${item.pro_url}`}>
            {item.pro_url}
          </a>
        ))}
      </div>

      <Test1 data={data}  currentUser={currentUser} recordsPerPage={recordsPerPage} currentPage={currentPage}/>
    </div>
  );
};

export default page;
