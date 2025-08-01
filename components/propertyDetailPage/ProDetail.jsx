import React from 'react'
import { ShowPrice } from '../HelperComponents'
import moment from 'moment';

const ProDetail = ({ propertyData, proSlug }) => {
  return (
    <div className="listing__details--content">
   
    <div className="listing__details--content__step">
        <h2 className="listing__details--title mb-25">{proSlug
                                .slice(0, proSlug.length - 2)
                                .map((item, index) => (
                                  <span className="pro-slug-space pl-1" key={index}>
                                    {item[0].toUpperCase() + item.slice(1)}
                                  </span>
                                ))}</h2>
        <div className="listing__details--price__id d-flex align-items-center">
            <div className="listing__details--price d-flex">
                <span className="listing__details--price__new">{propertyData.pro_amt
                                  ? ShowPrice(propertyData.pro_ad_type, propertyData.pro_amt)
                                  : "Ask Price"}</span>
               
            </div>
            {/* <span className="listing__details--property__id">Property ID: HZ24</span> */}
        </div>
        {/* <p className="listing__details--location__text"><svg width="11" height="17" viewBox="0 0 11 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.48287 0C2.45013 0 0 2.4501 0 5.48288C0 5.85982 0.0343013 6.21958 0.102785 6.57945C0.514031 9.69783 4.42055 11.9767 5.51712 16.4144C6.5966 12.0452 11 8.824 11 5.48288H10.9657C10.9657 2.45013 8.51548 0 5.48282 0H5.48287ZM5.48287 2.17592C7.21338 2.17592 8.61839 3.58097 8.61839 5.31144C8.61839 7.04191 7.21335 8.44696 5.48287 8.44696C3.7524 8.44696 2.34736 7.04191 2.34736 5.31144C2.34736 3.58097 3.75228 2.17592 5.48287 2.17592Z" fill="#FA4B4A"/>
            </svg>
            &nbsp;{propertyData.pro_locality},&nbsp;
                              {propertyData.pro_sub_district
                                ? propertyData.pro_sub_district + ", "
                                : ""}
                              {propertyData.pro_city},&nbsp;
                              {propertyData.pro_state} | <a href='#'>
Listed by Landmark Properties</a></p> */}
                            
    </div>
</div>
  )
}

export default ProDetail
