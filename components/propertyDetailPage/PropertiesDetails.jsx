import React from 'react'

const PropertiesDetails = ({propertyData, handleNullString}) => {
  return (
    <div className="listing__details--content__step properties__info mb-80">
    <h3 className="listing__details--content__title mb-40">Property Details:</h3>
    <ul className="properties__details--info__wrapper d-flex">
       
        <li className="properties__details--info__list d-flex justify-content-between">
            <span className="properties__details--info__title">Area Size</span>
            <span className="properties__details--info__subtitle">{propertyData.pro_area_size + " " + propertyData.pro_area_size_unit}</span>
        </li>
        <li className="properties__details--info__list d-flex justify-content-between">
            <span className="properties__details--info__title">Plot Size</span>
            <span className="properties__details--info__subtitle">{propertyData.pro_width && propertyData.pro_length ? propertyData.pro_width + " * " + propertyData.pro_length + " " + "feet" : "-"} </span>
        </li>
        <li className="properties__details--info__list d-flex justify-content-between">
            <span className="properties__details--info__title">Property Age</span>
            <span className="properties__details--info__subtitle">{handleNullString(propertyData.pro_age)}</span>
        </li>
        <li className="properties__details--info__list d-flex justify-content-between">
            <span className="properties__details--info__title">Possession Available</span>
            <span className="properties__details--info__subtitle">{handleNullString(propertyData.pro_possession)}</span>
        </li>
        <li className="properties__details--info__list d-flex justify-content-between">
            <span className="properties__details--info__title">Side Open(s)</span>
            <span className="properties__details--info__subtitle">{handleNullString(propertyData.pro_open_sides)}</span>
        </li>
    </ul>
</div>
  )
}

export default PropertiesDetails
