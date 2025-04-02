import React from 'react'
//import DynmaicDesc from './DynmaicDesc'

const Detail2 = ({propertyData}) => {
    
  return (
    <>
       <div className="listing__details--content__step mb-80">
                                
                                    
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
                                                    <span className="apartment__info--count">3</span>
                                                    <span className="apartment__info--title">1249 Sqft</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="listing__details--content__step properties__info mb-80">
                                    <h3 className="listing__details--content__title mb-40">Properties Details:</h3>
                                    <ul className="properties__details--info__wrapper d-flex">
                                        <li className="properties__details--info__list d-flex justify-content-between">
                                            <span className="properties__details--info__title">Price:</span>
                                            <span className="properties__details--info__subtitle">$268,000</span>
                                        </li>
                                        <li className="properties__details--info__list d-flex justify-content-between">
                                            <span className="properties__details--info__title">Property ID:</span>
                                            <span className="properties__details--info__subtitle">Th26157096</span>
                                        </li>
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
                                <div className="listing__details--content__step properties__amenities mb-80">
                                    <h3 className="listing__details--content__title mb-40">Properties Amenities</h3>
                                    <div className="properties__amenities--wrapper d-flex">
                                        <ul className="properties__amenities--step">
                                            <li className="properties__amenities--list d-flex align-items-center">
                                                <span className="properties__amenities--mark__icon"><svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M15.794 2.174C14.426 3.422 13.094 4.874 11.798 6.53C10.67 7.958 9.656 9.422 8.756 10.922C7.94 12.266 7.346 13.418 6.974 14.378C6.962 14.414 6.938 14.444 6.902 14.468C6.866 14.504 6.824 14.522 6.776 14.522C6.764 14.534 6.752 14.54 6.74 14.54C6.656 14.54 6.596 14.516 6.56 14.468L0.134 7.934C0.122 7.922 0.278 7.766 0.602 7.466C0.926 7.154 1.244 6.872 1.556 6.62C1.904 6.332 2.09 6.2 2.114 6.224L5.642 8.996C6.674 7.784 7.832 6.584 9.116 5.396C11.048 3.62 13.04 2.108 15.092 0.86C15.128 0.86 15.266 1.028 15.506 1.364L15.866 1.886C15.878 1.934 15.878 1.988 15.866 2.048C15.854 2.096 15.83 2.138 15.794 2.174Z" fill="currentColor"/>
                                                    </svg>
                                                </span>
                                                <span className="properties__amenities--text">Air Conditioning</span>
                                            </li>
                                            <li className="properties__amenities--list d-flex align-items-center">
                                                <span className="properties__amenities--mark__icon"><svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M15.794 2.174C14.426 3.422 13.094 4.874 11.798 6.53C10.67 7.958 9.656 9.422 8.756 10.922C7.94 12.266 7.346 13.418 6.974 14.378C6.962 14.414 6.938 14.444 6.902 14.468C6.866 14.504 6.824 14.522 6.776 14.522C6.764 14.534 6.752 14.54 6.74 14.54C6.656 14.54 6.596 14.516 6.56 14.468L0.134 7.934C0.122 7.922 0.278 7.766 0.602 7.466C0.926 7.154 1.244 6.872 1.556 6.62C1.904 6.332 2.09 6.2 2.114 6.224L5.642 8.996C6.674 7.784 7.832 6.584 9.116 5.396C11.048 3.62 13.04 2.108 15.092 0.86C15.128 0.86 15.266 1.028 15.506 1.364L15.866 1.886C15.878 1.934 15.878 1.988 15.866 2.048C15.854 2.096 15.83 2.138 15.794 2.174Z" fill="currentColor"/>
                                                    </svg>
                                                </span>
                                                <span className="properties__amenities--text">Microwave</span>
                                            </li>
                                            <li className="properties__amenities--list d-flex align-items-center">
                                                <span className="properties__amenities--mark__icon"><svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M15.794 2.174C14.426 3.422 13.094 4.874 11.798 6.53C10.67 7.958 9.656 9.422 8.756 10.922C7.94 12.266 7.346 13.418 6.974 14.378C6.962 14.414 6.938 14.444 6.902 14.468C6.866 14.504 6.824 14.522 6.776 14.522C6.764 14.534 6.752 14.54 6.74 14.54C6.656 14.54 6.596 14.516 6.56 14.468L0.134 7.934C0.122 7.922 0.278 7.766 0.602 7.466C0.926 7.154 1.244 6.872 1.556 6.62C1.904 6.332 2.09 6.2 2.114 6.224L5.642 8.996C6.674 7.784 7.832 6.584 9.116 5.396C11.048 3.62 13.04 2.108 15.092 0.86C15.128 0.86 15.266 1.028 15.506 1.364L15.866 1.886C15.878 1.934 15.878 1.988 15.866 2.048C15.854 2.096 15.83 2.138 15.794 2.174Z" fill="currentColor"/>
                                                    </svg>
                                                </span>
                                                <span className="properties__amenities--text">Central Heating</span>
                                            </li>
                                            <li className="properties__amenities--list d-flex align-items-center">
                                                <span className="properties__amenities--mark__icon"><svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M15.794 2.174C14.426 3.422 13.094 4.874 11.798 6.53C10.67 7.958 9.656 9.422 8.756 10.922C7.94 12.266 7.346 13.418 6.974 14.378C6.962 14.414 6.938 14.444 6.902 14.468C6.866 14.504 6.824 14.522 6.776 14.522C6.764 14.534 6.752 14.54 6.74 14.54C6.656 14.54 6.596 14.516 6.56 14.468L0.134 7.934C0.122 7.922 0.278 7.766 0.602 7.466C0.926 7.154 1.244 6.872 1.556 6.62C1.904 6.332 2.09 6.2 2.114 6.224L5.642 8.996C6.674 7.784 7.832 6.584 9.116 5.396C11.048 3.62 13.04 2.108 15.092 0.86C15.128 0.86 15.266 1.028 15.506 1.364L15.866 1.886C15.878 1.934 15.878 1.988 15.866 2.048C15.854 2.096 15.83 2.138 15.794 2.174Z" fill="currentColor"/>
                                                    </svg>
                                                </span>
                                                <span className="properties__amenities--text">Washer</span>
                                            </li>
                                        </ul>
                                        <ul className="properties__amenities--step">
                                            <li className="properties__amenities--list d-flex align-items-center">
                                                <span className="properties__amenities--mark__icon"><svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M15.794 2.174C14.426 3.422 13.094 4.874 11.798 6.53C10.67 7.958 9.656 9.422 8.756 10.922C7.94 12.266 7.346 13.418 6.974 14.378C6.962 14.414 6.938 14.444 6.902 14.468C6.866 14.504 6.824 14.522 6.776 14.522C6.764 14.534 6.752 14.54 6.74 14.54C6.656 14.54 6.596 14.516 6.56 14.468L0.134 7.934C0.122 7.922 0.278 7.766 0.602 7.466C0.926 7.154 1.244 6.872 1.556 6.62C1.904 6.332 2.09 6.2 2.114 6.224L5.642 8.996C6.674 7.784 7.832 6.584 9.116 5.396C11.048 3.62 13.04 2.108 15.092 0.86C15.128 0.86 15.266 1.028 15.506 1.364L15.866 1.886C15.878 1.934 15.878 1.988 15.866 2.048C15.854 2.096 15.83 2.138 15.794 2.174Z" fill="currentColor"/>
                                                    </svg>
                                                </span>
                                                <span className="properties__amenities--text">Laundry</span>
                                            </li>
                                            <li className="properties__amenities--list d-flex align-items-center">
                                                <span className="properties__amenities--mark__icon"><svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M15.794 2.174C14.426 3.422 13.094 4.874 11.798 6.53C10.67 7.958 9.656 9.422 8.756 10.922C7.94 12.266 7.346 13.418 6.974 14.378C6.962 14.414 6.938 14.444 6.902 14.468C6.866 14.504 6.824 14.522 6.776 14.522C6.764 14.534 6.752 14.54 6.74 14.54C6.656 14.54 6.596 14.516 6.56 14.468L0.134 7.934C0.122 7.922 0.278 7.766 0.602 7.466C0.926 7.154 1.244 6.872 1.556 6.62C1.904 6.332 2.09 6.2 2.114 6.224L5.642 8.996C6.674 7.784 7.832 6.584 9.116 5.396C11.048 3.62 13.04 2.108 15.092 0.86C15.128 0.86 15.266 1.028 15.506 1.364L15.866 1.886C15.878 1.934 15.878 1.988 15.866 2.048C15.854 2.096 15.83 2.138 15.794 2.174Z" fill="currentColor"/>
                                                    </svg>
                                                </span>
                                                <span className="properties__amenities--text">Outdoor Shower</span>
                                            </li>
                                            <li className="properties__amenities--list d-flex align-items-center">
                                                <span className="properties__amenities--mark__icon"><svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M15.794 2.174C14.426 3.422 13.094 4.874 11.798 6.53C10.67 7.958 9.656 9.422 8.756 10.922C7.94 12.266 7.346 13.418 6.974 14.378C6.962 14.414 6.938 14.444 6.902 14.468C6.866 14.504 6.824 14.522 6.776 14.522C6.764 14.534 6.752 14.54 6.74 14.54C6.656 14.54 6.596 14.516 6.56 14.468L0.134 7.934C0.122 7.922 0.278 7.766 0.602 7.466C0.926 7.154 1.244 6.872 1.556 6.62C1.904 6.332 2.09 6.2 2.114 6.224L5.642 8.996C6.674 7.784 7.832 6.584 9.116 5.396C11.048 3.62 13.04 2.108 15.092 0.86C15.128 0.86 15.266 1.028 15.506 1.364L15.866 1.886C15.878 1.934 15.878 1.988 15.866 2.048C15.854 2.096 15.83 2.138 15.794 2.174Z" fill="currentColor"/>
                                                    </svg>
                                                </span>
                                                <span className="properties__amenities--text">Swimming Pool</span>
                                            </li>
                                            <li className="properties__amenities--list d-flex align-items-center">
                                                <span className="properties__amenities--mark__icon"><svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M15.794 2.174C14.426 3.422 13.094 4.874 11.798 6.53C10.67 7.958 9.656 9.422 8.756 10.922C7.94 12.266 7.346 13.418 6.974 14.378C6.962 14.414 6.938 14.444 6.902 14.468C6.866 14.504 6.824 14.522 6.776 14.522C6.764 14.534 6.752 14.54 6.74 14.54C6.656 14.54 6.596 14.516 6.56 14.468L0.134 7.934C0.122 7.922 0.278 7.766 0.602 7.466C0.926 7.154 1.244 6.872 1.556 6.62C1.904 6.332 2.09 6.2 2.114 6.224L5.642 8.996C6.674 7.784 7.832 6.584 9.116 5.396C11.048 3.62 13.04 2.108 15.092 0.86C15.128 0.86 15.266 1.028 15.506 1.364L15.866 1.886C15.878 1.934 15.878 1.988 15.866 2.048C15.854 2.096 15.83 2.138 15.794 2.174Z" fill="currentColor"/>
                                                    </svg>
                                                </span>
                                                <span className="properties__amenities--text">Wifi</span>
                                            </li>
                                        </ul>
                                        <ul className="properties__amenities--step">
                                            <li className="properties__amenities--list d-flex align-items-center">
                                                <span className="properties__amenities--mark__icon"><svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M15.794 2.174C14.426 3.422 13.094 4.874 11.798 6.53C10.67 7.958 9.656 9.422 8.756 10.922C7.94 12.266 7.346 13.418 6.974 14.378C6.962 14.414 6.938 14.444 6.902 14.468C6.866 14.504 6.824 14.522 6.776 14.522C6.764 14.534 6.752 14.54 6.74 14.54C6.656 14.54 6.596 14.516 6.56 14.468L0.134 7.934C0.122 7.922 0.278 7.766 0.602 7.466C0.926 7.154 1.244 6.872 1.556 6.62C1.904 6.332 2.09 6.2 2.114 6.224L5.642 8.996C6.674 7.784 7.832 6.584 9.116 5.396C11.048 3.62 13.04 2.108 15.092 0.86C15.128 0.86 15.266 1.028 15.506 1.364L15.866 1.886C15.878 1.934 15.878 1.988 15.866 2.048C15.854 2.096 15.83 2.138 15.794 2.174Z" fill="currentColor"/>
                                                    </svg>
                                                </span>
                                                <span className="properties__amenities--text">Window Covering</span>
                                            </li>
                                            <li className="properties__amenities--list d-flex align-items-center">
                                                <span className="properties__amenities--mark__icon"><svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M15.794 2.174C14.426 3.422 13.094 4.874 11.798 6.53C10.67 7.958 9.656 9.422 8.756 10.922C7.94 12.266 7.346 13.418 6.974 14.378C6.962 14.414 6.938 14.444 6.902 14.468C6.866 14.504 6.824 14.522 6.776 14.522C6.764 14.534 6.752 14.54 6.74 14.54C6.656 14.54 6.596 14.516 6.56 14.468L0.134 7.934C0.122 7.922 0.278 7.766 0.602 7.466C0.926 7.154 1.244 6.872 1.556 6.62C1.904 6.332 2.09 6.2 2.114 6.224L5.642 8.996C6.674 7.784 7.832 6.584 9.116 5.396C11.048 3.62 13.04 2.108 15.092 0.86C15.128 0.86 15.266 1.028 15.506 1.364L15.866 1.886C15.878 1.934 15.878 1.988 15.866 2.048C15.854 2.096 15.83 2.138 15.794 2.174Z" fill="currentColor"/>
                                                    </svg>
                                                </span>
                                                <span className="properties__amenities--text">Refrigerator</span>
                                            </li>
                                            <li className="properties__amenities--list d-flex align-items-center">
                                                <span className="properties__amenities--mark__icon"><svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M15.794 2.174C14.426 3.422 13.094 4.874 11.798 6.53C10.67 7.958 9.656 9.422 8.756 10.922C7.94 12.266 7.346 13.418 6.974 14.378C6.962 14.414 6.938 14.444 6.902 14.468C6.866 14.504 6.824 14.522 6.776 14.522C6.764 14.534 6.752 14.54 6.74 14.54C6.656 14.54 6.596 14.516 6.56 14.468L0.134 7.934C0.122 7.922 0.278 7.766 0.602 7.466C0.926 7.154 1.244 6.872 1.556 6.62C1.904 6.332 2.09 6.2 2.114 6.224L5.642 8.996C6.674 7.784 7.832 6.584 9.116 5.396C11.048 3.62 13.04 2.108 15.092 0.86C15.128 0.86 15.266 1.028 15.506 1.364L15.866 1.886C15.878 1.934 15.878 1.988 15.866 2.048C15.854 2.096 15.83 2.138 15.794 2.174Z" fill="currentColor"/>
                                                    </svg>
                                                </span>
                                                <span className="properties__amenities--text">Alarm System</span>
                                            </li>
                                            <li className="properties__amenities--list d-flex align-items-center">
                                                <span className="properties__amenities--mark__icon"><svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M15.794 2.174C14.426 3.422 13.094 4.874 11.798 6.53C10.67 7.958 9.656 9.422 8.756 10.922C7.94 12.266 7.346 13.418 6.974 14.378C6.962 14.414 6.938 14.444 6.902 14.468C6.866 14.504 6.824 14.522 6.776 14.522C6.764 14.534 6.752 14.54 6.74 14.54C6.656 14.54 6.596 14.516 6.56 14.468L0.134 7.934C0.122 7.922 0.278 7.766 0.602 7.466C0.926 7.154 1.244 6.872 1.556 6.62C1.904 6.332 2.09 6.2 2.114 6.224L5.642 8.996C6.674 7.784 7.832 6.584 9.116 5.396C11.048 3.62 13.04 2.108 15.092 0.86C15.128 0.86 15.266 1.028 15.506 1.364L15.866 1.886C15.878 1.934 15.878 1.988 15.866 2.048C15.854 2.096 15.83 2.138 15.794 2.174Z" fill="currentColor"/>
                                                    </svg>
                                                </span>
                                                <span className="properties__amenities--text">Window Coverings</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
    </>
  )
}

export default Detail2
