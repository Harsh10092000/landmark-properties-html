import React from 'react'
import Map3 from '../googleMap/GoogleMap'
import Map from './Map'

const Address = ({ mapdata }) => {
    // const formatted_address = `${mapdata.pro_locality}, ${mapdata.pro_city}, ${mapdata.pro_state}, India`;
    const formatted_address = mapdata.pro_street;
  return (
    <div className="listing__details--content__step mb-80">
                                    <div className="listing__details--location__header d-flex justify-content-between mb-40">
                                        <div className="listing__details--location__header--left">
                                            <h3 className="listing__details--content__title m-0">Location & Google Maps</h3>
                                        </div>
                                        {/* <div className="location__google--maps">
                                            <details>
                                                <summary>Open on Google Maps</summary>
                                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d20227915.86434928!2d1.2189515269861546!3d38.76296158058813!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6f73e994d3fb5891%3A0x783ff0a076fdb99!2sCosing%20Connect%20Ltd%2C%20United%20Kingdom!5e0!3m2!1sen!2sbd!4v1699676848803!5m2!1sen!2sbd" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                                            </details>
                                        </div> */}
                                    </div>
                                    <div className='google-map'>
                                    {/* <Map3 data={mapdata} /> */}
                                    <Map formatted_address={formatted_address} />
                                    </div>
                                    <div className="location__google--maps__info d-flex">
                                        <ul className="location__google--maps__info--step">
                                           
                                            <li className="location__google--maps__info--list d-flex">
                                                <span className="location__google--maps__info--title">Country: </span>
                                                <span className="location__google--maps__info--subtitle">India</span>
                                            </li>
                                            <li className="location__google--maps__info--list d-flex">
                                                <span className="location__google--maps__info--title">Province/State: </span>
                                                <span className="location__google--maps__info--subtitle">{mapdata.pro_state}</span>
                                            </li>
                                        </ul>
                                        <ul className="location__google--maps__info--step">
                                            <li className="location__google--maps__info--list d-flex">
                                                <span className="location__google--maps__info--title">City/Town:</span>
                                                <span className="location__google--maps__info--subtitle">{mapdata.pro_city}</span>
                                            </li>

                                            <li className="location__google--maps__info--list d-flex">
                                                <span className="location__google--maps__info--title">Pin Code:</span>
                                                <span className="location__google--maps__info--subtitle">{mapdata.pro_pincode}</span>
                                            </li>
                                            
                                        </ul>
                                    </div>
                                </div>
  )
}

export default Address
