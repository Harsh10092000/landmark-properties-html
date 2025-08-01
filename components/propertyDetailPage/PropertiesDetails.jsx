import { IconBarcode, IconBath, IconBed, IconBorderInner, IconBraces, IconCake, IconDimensions, IconMapPinCheck, IconPhotoSensor3, IconResize, IconStairsUp, IconTrademark, IconZoomInArea } from '@tabler/icons-react'
import React from 'react'

const PropertiesDetails = ({propertyData, handleNullString}) => {
  return (
    <div className="listing__details--content__step properties__info mb-30">
    {/* <h3 className="listing__details--content__title mb-40">Property Details:</h3> */}

    <ul className="properties__details--info__wrapper d-flex">
       
        <li className="properties__details--info__list ">
            <span className="properties__details--info__title"><span className='pro-icon'><IconResize /></span> Area Size</span>
            <span className="properties__details--info__subtitle">{propertyData.pro_area_size + " " + propertyData.pro_area_size_unit}</span>
        </li>
        <li className="properties__details--info__list ">
            <span className="properties__details--info__title"><span className='pro-icon'><IconZoomInArea  /></span> Plot Size</span>
            <span className="properties__details--info__subtitle">{propertyData.pro_width && propertyData.pro_length ? propertyData.pro_width + " * " + propertyData.pro_length + " " + "feet" : "-"} </span>
        </li>
        <li className="properties__details--info__list">
            <span className="properties__details--info__title"><span className='pro-icon'><IconCake /></span> Property Age</span>
            <span className="properties__details--info__subtitle">{handleNullString(propertyData.pro_age)}</span>
        </li>
        <li className="properties__details--info__list ">
            <span className="properties__details--info__title"><span className='pro-icon'><IconBorderInner /></span> Possession Available</span>
            <span className="properties__details--info__subtitle">{handleNullString(propertyData.pro_possession)}</span>
        </li>
        <li className="properties__details--info__list ">
            <span className="properties__details--info__title"><span className='pro-icon'><IconBorderInner /></span>Facing</span>
            <span className="properties__details--info__subtitle">{handleNullString(propertyData.pro_open_sides)}</span>
        </li>
         <li className="properties__details--info__list ">
            <span className="properties__details--info__title"><span className='pro-icon'><IconTrademark /></span> Type Of Ownership</span> 
            <span className="properties__details--info__subtitle">{handleNullString(propertyData.pro_open_sides)}</span>
        </li>
         <li className="properties__details--info__list">
            <span className="properties__details--info__title"><span className='pro-icon'><IconMapPinCheck /></span> Authority Approval</span>
            <span className="properties__details--info__subtitle">{handleNullString(propertyData.pro_open_sides)}</span>
        </li>
         <li className="properties__details--info__list ">
            <span className="properties__details--info__title"><span className='pro-icon'><IconBed /></span>Furnishing</span>
            <span className="properties__details--info__subtitle">{handleNullString(propertyData.pro_open_sides)}</span>
        </li>
         <li className="properties__details--info__list ">
            <span className="properties__details--info__title"><span className='pro-icon'><IconBath /></span>Washrooms</span>
            <span className="properties__details--info__subtitle">{handleNullString(propertyData.pro_open_sides)}</span>
        </li> 
        <li className="properties__details--info__list ">
            <span className="properties__details--info__title"><span className='pro-icon'><IconBarcode /></span>Balconies</span>
            <span className="properties__details--info__subtitle">{handleNullString(propertyData.pro_open_sides)}</span>
        </li>
          <li className="properties__details--info__list">
            <span className="properties__details--info__title"><span className='pro-icon'><IconDimensions /></span>Facing Road Width</span>
            <span className="properties__details--info__subtitle">{handleNullString(propertyData.pro_open_sides)}</span>
        </li>
        <li className="properties__details--info__list ">
            <span className="properties__details--info__title"><span className='pro-icon'><IconStairsUp /></span> Floor Number</span>
            <span className="properties__details--info__subtitle">{handleNullString(propertyData.pro_open_sides)}</span>
        </li>
    </ul>
</div>
  )
}

export default PropertiesDetails
