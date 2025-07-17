import React from 'react'

const PropertiesDetails2 = ({propertyData, handleNullString}) => {
  return (
    <div className="listing__details--content__step properties__info mb-80">
    <h3 className="listing__details--content__title mb-40">Property Details:</h3>
    <ul className="properties__details--info__wrapper d-flex">
       
        <li className="properties__details--info__list d-flex justify-content-between">
            <span className="properties__details--info__title">Type Of Ownership</span>
            <span className="properties__details--info__subtitle">{handleNullString(propertyData.pro_ownership_type)}</span>
        </li>
        <li className="properties__details--info__list d-flex justify-content-between">
            <span className="properties__details--info__title">Authority Approval</span>
            <span className="properties__details--info__subtitle">{handleNullString(propertyData.pro_approval)} </span>
        </li>
        <li className="properties__details--info__list d-flex justify-content-between">
            <span className="properties__details--info__title">Furnishing</span>
            <span className="properties__details--info__subtitle">{handleNullString(propertyData.pro_furnishing)}</span>
        </li>
        <li className="properties__details--info__list d-flex justify-content-between">
            <span className="properties__details--info__title">Facing</span>
            <span className="properties__details--info__subtitle">{handleNullString(propertyData.pro_facing)}</span>
        </li>
        <li className="properties__details--info__list d-flex justify-content-between">
            <span className="properties__details--info__title">Washrooms</span>
            <span className="properties__details--info__subtitle">{handleNullString(propertyData.pro_washrooms)}</span>
        </li>
        <li className="properties__details--info__list d-flex justify-content-between">
            <span className="properties__details--info__title">Balconies</span>
            <span className="properties__details--info__subtitle">{handleNullString(propertyData.pro_balcony)}</span>
        </li>
        
        <li className="properties__details--info__list d-flex justify-content-between">
            <span className="properties__details--info__title">Facing Road Width</span>
            <span className="properties__details--info__subtitle">{handleNullString(propertyData.pro_facing_road_width)}</span>
        </li>
        
    </ul>
</div>
  )
}

export default PropertiesDetails2
