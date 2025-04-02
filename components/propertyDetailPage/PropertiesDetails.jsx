import React from 'react'

const PropertiesDetails = () => {
  return (
    <div className="listing__details--content__step properties__info mb-80">
    <h3 className="listing__details--content__title mb-40">Properties Details:</h3>
    <ul className="properties__details--info__wrapper d-flex">
       
        <li className="properties__details--info__list d-flex justify-content-between">
            <span className="properties__details--info__title">Area Size:</span>
            <span className="properties__details--info__subtitle">400 SqFt</span>
        </li>
        <li className="properties__details--info__list d-flex justify-content-between">
            <span className="properties__details--info__title">Land Area Size:</span>
            <span className="properties__details--info__subtitle">1300 Sq Ft</span>
        </li>
        <li className="properties__details--info__list d-flex justify-content-between">
            <span className="properties__details--info__title">Rooms:</span>
            <span className="properties__details--info__subtitle">03</span>
        </li>
        <li className="properties__details--info__list d-flex justify-content-between">
            <span className="properties__details--info__title">Washroom:</span>
            <span className="properties__details--info__subtitle">03</span>
        </li>
        <li className="properties__details--info__list d-flex justify-content-between">
            <span className="properties__details--info__title">Garage:</span>
            <span className="properties__details--info__subtitle">04</span>
        </li>
    </ul>
</div>
  )
}

export default PropertiesDetails
