import React from 'react'
//import DynmaicDesc from './DynmaicDesc'

const Detail2 = ({propertyData}) => {
  
  return (
    <>
    
       <div className="listing__details--content__step mt-30">
                                
                                    
                                    <div className="apartment__info listing__d--info">
                                        <div className="apartment__info--wrapper d-flex">
                                            <div className="apartment__info--list">
                                                <span className="apartment__info--icon"><img src="assets/img/icon/bed-realistic.png" alt="img" /></span>
                                                <p>
                                                    <span className="apartment__info--count">{propertyData.pro_bedroom}</span>
                                                    <span className="apartment__info--title">Bedrooms</span>
                                                </p>
                                            </div>
                                            <div className="apartment__info--list">
                                                <span className="apartment__info--icon"><img src="assets/img/icon/modern-car.png" alt="img" /></span>
                                                <p>
                                                    <span className="apartment__info--count">{propertyData.pro_parking}</span>
                                                    <span className="apartment__info--title"> Car Parking</span>
                                                </p>
                                            </div>
                                            <div className="apartment__info--list">
                                                <span className="apartment__info--icon"><img src="assets/img/icon/set-square.png" alt="img" /></span>
                                                <p>
                                                    <span className="apartment__info--count">{propertyData.pro_floor}</span>
                                                    <span className="apartment__info--title">Floors</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                              
                               
    </>
  )
}

export default Detail2
