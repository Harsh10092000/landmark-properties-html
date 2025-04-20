import React from "react";
import pool from "@/app/libs/mysql";
import { ShowPrice } from "../HelperComponents";
import Image from "next/image";
import Link from "next/link";
const getData = async () => {
  try {
    const db = await pool;
    const q = `SELECT DISTINCT 
    property_module_images.*, 
    property_module.*, 
    agent_data.agent_type AS user_type, 
    agent_data.agent_name, 
    agent_data.agent_sub_district, 
    agent_data.agent_city, 
    agent_data.agent_state 
FROM 
    property_module 
LEFT JOIN 
    property_module_images 
    ON property_module.pro_id = property_module_images.img_cnct_id 
LEFT JOIN (
    SELECT 
        agent_type, 
        user_cnct_id, 
        agent_name, 
        agent_sub_district, 
        agent_city, 
        agent_state 
    FROM 
        agent_module
) AS agent_data 
    ON property_module.pro_user_id = agent_data.user_cnct_id 
WHERE 
    pro_listed = 1 
GROUP BY 
    pro_id 
ORDER BY 
    RAND() 
LIMIT 1;`;

    const [rows] = await db.query(q);

    return { row: rows };
  } catch (err) {
    return err;
  }
};

const FeaturedProperties = async () => {
    const res = await getData();
    const data = res.row[0];
  return (
    <div className="widget__step mb-30">
      <h2 className="widget__step--title">Featured Properties</h2>
      <div className="widget__featured--properties">
      <Link href={data.pro_url}>
        <div className="widget__featured--properties__thumbnail position-relative">
           
        <Image
                                        src={
                                          data.img_link
                                            ? `${process.env.webURL}/propertyImages/watermark/${data.img_link}`
                                            : "/images/default4.webp"
                                        }
                                        
                                        alt={`${data.pro_type.split(",")[0]} in ${
                                          data.pro_city
                                        }`}
                                        className="featured__thumbnail--img"
                                        width={380}
                                        height={330}
                                        loading="lazy"
                                      />
                                      
          <div className="featured__badge">
            <span className="badge__field">Featured</span>
          </div>
        </div>
        </Link>
        <div className="widget__featured--properties__content">
          <div className="widget__featured--properties__content--top d-flex align-items-center justify-content-between">
            <div className="widget__featured--properties__author">
              <img src="assets/img/property/properties-author2.png" alt="img" />
            </div>
            <ul className="widget__featured--properties__share d-flex">
              <li className="widget__featured--properties__share--list position-relative">
                <Link
                  className="widget__featured--properties__share--btn"
                  href={`${process.env.queryOnWhatsapp}${data.pro_url}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-whatsapp"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill="currentColor"
                      d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"
                    />
                  </svg>
                  <span className="visually-hidden">Share</span>
                </Link>
              </li>
              <li className="widget__featured--properties__share--list">
                <a
                  className="widget__featured--properties__share--btn"
                  href="/addproperty"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.855 0C5.77166 0 3.77371 0.82758 2.30076 2.30076C0.82758 3.77375 0 5.77171 0 7.855C0 9.9383 0.82758 11.9363 2.30076 13.4092C3.77375 14.8824 5.7717 15.71 7.855 15.71C9.9383 15.71 11.9363 14.8824 13.4092 13.4092C14.8824 11.9363 15.71 9.9383 15.71 7.855C15.7073 5.77252 14.8789 3.77621 13.4062 2.30395C11.9338 0.831315 9.93743 0.00286936 7.85518 0.000182413L7.855 0ZM7.855 14.1388C6.18845 14.1388 4.59008 13.4767 3.41151 12.2983C2.23313 11.1197 1.571 9.52132 1.571 7.85482C1.571 6.18832 2.23313 4.5899 3.41151 3.41133C4.59008 2.23295 6.1885 1.57082 7.855 1.57082C9.5215 1.57082 11.1199 2.23295 12.2985 3.41133C13.4769 4.5899 14.139 6.18832 14.139 7.85482C14.1376 9.521 13.4751 11.1187 12.2969 12.2967C11.1189 13.4749 9.52118 14.1374 7.855 14.1388Z"
                      fill="currentColor"
                    ></path>
                    <path
                      d="M11.5835 7.06853H8.64034V4.12541C8.64034 3.84469 8.49072 3.58552 8.24772 3.44511C8.00471 3.30475 7.70514 3.30475 7.46213 3.44511C7.21912 3.58547 7.06951 3.84467 7.06951 4.12541V7.06853H4.12639C3.84567 7.06853 3.58649 7.21815 3.44609 7.46115C3.30573 7.70416 3.30573 8.00373 3.44609 8.24674C3.58645 8.48975 3.84564 8.63936 4.12639 8.63936H7.06951V11.5825C7.06951 11.8632 7.21912 12.1224 7.46213 12.2628C7.70513 12.4031 8.00471 12.4031 8.24772 12.2628C8.49072 12.1224 8.64034 11.8632 8.64034 11.5825V8.63936H11.5835C11.8642 8.63936 12.1234 8.48975 12.2638 8.24674C12.4041 8.00374 12.4041 7.70416 12.2638 7.46115C12.1234 7.21815 11.8642 7.06853 11.5835 7.06853Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                  <span className="visually-hidden">Add Property</span>
                </a>
              </li>
            </ul>
          </div>
          <p className="widget__featured--properties__desc">
            <svg
              width="11"
              height="17"
              viewBox="0 0 11 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.48287 0C2.45013 0 0 2.4501 0 5.48288C0 5.85982 0.0343013 6.21958 0.102785 6.57945C0.514031 9.69783 4.42055 11.9767 5.51712 16.4144C6.5966 12.0452 11 8.824 11 5.48288H10.9657C10.9657 2.45013 8.51548 0 5.48282 0H5.48287ZM5.48287 2.17592C7.21338 2.17592 8.61839 3.58097 8.61839 5.31144C8.61839 7.04191 7.21335 8.44696 5.48287 8.44696C3.7524 8.44696 2.34736 7.04191 2.34736 5.31144C2.34736 3.58097 3.75228 2.17592 5.48287 2.17592Z"
                fill="#16A34A"
              ></path>
            </svg>
            {data.pro_locality}, {data.pro_city}
          </p>
          <h3 className="widget__featured--properties__title">
          <Link href={data.pro_url}>{data.pro_type.split(",")[0]}</Link>
          </h3>
          <div className="widget__featured--propertie__price d-flex">
            <span className="new__price">{data.pro_amt
                                      ? ShowPrice(data.pro_ad_type, data.pro_amt)
                                      : "Ask Price"}</span>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProperties;
