import React from 'react'

const About = () => {
  return (
    <section className="about__section--style4 section--padding color-accent-2">
            <div className="container">
                <div className="about__inner d-flex">
                    <div className="about__thumbnail--style4 d-flex" data-aos="fade-up" data-aos-duration="1200" data-aos-delay="100">
                        <div className="about__thumbnail--items one">
                        <picture> <img src="assets/img/other/about-items1.png" alt="about-thumb" /></picture>
                        </div>
                        <div className="about__thumbnail--items two">
                        <picture> <img src="assets/img/other/about-items2.png" alt="about-thumb" /></picture>
                            <div className="bideo__play style3">
                                <a className="bideo__play--icon glightbox" href="https://vimeo.com/115041822" data-gallery="video">
                                    <svg width="13" height="17" viewBox="0 0 13 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11.9358 7.28498C12.5203 7.67662 12.5283 8.53339 11.9512 8.93591L1.99498 15.8809C1.33555 16.3409 0.430441 15.8741 0.422904 15.0701L0.294442 1.36797C0.286904 0.563996 1.1831 0.0802964 1.85104 0.527837L11.9358 7.28498Z" fill="currentColor"/>
                                    </svg>                                        
                                    <span className="visually-hidden">Video Play</span>
                                </a>
                            </div>
                        </div>
                        <picture><img className="about__thumbnail--shape" src="assets/img/other/about-thumbnail-shape.png" alt="img" /></picture>
                        <div className="about__thumbnail--badge__style4">
                            <span className="about__thumbnail--badge__style4--count">13</span> 
                            <span className="about__thumbnail--badge__style4--text">Years of experience</span>    
                        </div>
                    </div>
                    <div className="about__content--style4" data-aos="fade-up" data-aos-duration="1200" data-aos-delay="150">
                        <div className="section__heading">
                            <h3 className="section__heading--subtitle h5">
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0_15_6)">
                                        <path d="M9.00021 4.72925L2.5806 10.0215V15.4473C2.5806 15.6408 2.65134 15.8085 2.79278 15.9497C2.93418 16.091 3.10163 16.1621 3.29516 16.1621H7.58226V11.8747H10.4407V16.1622H14.7277C14.9212 16.1622 15.0889 16.0913 15.2301 15.9497C15.3715 15.8086 15.4425 15.6408 15.4425 15.4473V10.0883L9.00021 4.72925Z" fill="#16A34A"/>
                                    </g>
                                </svg>
                                Your Trusted Real Estate Partner
                            </h3>
                            <h2 className="section__heading--title">Building Dreams, Creating Homes</h2>
                            <p className="section__heading--desc">LandMark Properties is dedicated to crafting luxurious, sustainable, and modern living spaces. We bring innovative designs and superior craftsmanship to every home we build.</p>
                        </div>
                        <div className="about__content--info d-flex">
                            <div className="about__content--info__list d-flex align-items-center">
                                <div className="about__content--info__icon">
                                <picture><img src="assets/img/other/about-info-icon3.png" alt="icon" /></picture>
                                </div>
                                <h3 className="about__content--info__title">Elegant & Spacious Homes</h3>
                            </div>
                            <div className="about__content--info__list d-flex align-items-center">
                                <div className="about__content--info__icon">
                                <picture><img src="assets/img/other/about-info-icon4.png" alt="icon" /></picture>
                                </div>
                                <h3 className="about__content--info__title">Dedicated Customer Support</h3>
                            </div>
                        </div>
                        <div className="about__content--details">
                            <div className="living__details--content__wrapper">
                                <p className="living__details--content__list">
                                    <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M15.794 2.174C14.426 3.422 13.094 4.874 11.798 6.53C10.67 7.958 9.656 9.422 8.756 10.922C7.94 12.266 7.346 13.418 6.974 14.378C6.962 14.414 6.938 14.444 6.902 14.468C6.866 14.504 6.824 14.522 6.776 14.522C6.764 14.534 6.752 14.54 6.74 14.54C6.656 14.54 6.596 14.516 6.56 14.468L0.134 7.934C0.122 7.922 0.278 7.766 0.602 7.466C0.926 7.154 1.244 6.872 1.556 6.62C1.904 6.332 2.09 6.2 2.114 6.224L5.642 8.996C6.674 7.784 7.832 6.584 9.116 5.396C11.048 3.62 13.04 2.108 15.092 0.86C15.128 0.86 15.266 1.028 15.506 1.364L15.866 1.886C15.878 1.934 15.878 1.988 15.866 2.048C15.854 2.096 15.83 2.138 15.794 2.174Z" fill="#16A34A"/>
                                    </svg>
                                    Sustainable and eco-friendly construction.
                                </p>
                                <p className="living__details--content__list">
                                    <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M15.794 2.174C14.426 3.422 13.094 4.874 11.798 6.53C10.67 7.958 9.656 9.422 8.756 10.922C7.94 12.266 7.346 13.418 6.974 14.378C6.962 14.414 6.938 14.444 6.902 14.468C6.866 14.504 6.824 14.522 6.776 14.522C6.764 14.534 6.752 14.54 6.74 14.54C6.656 14.54 6.596 14.516 6.56 14.468L0.134 7.934C0.122 7.922 0.278 7.766 0.602 7.466C0.926 7.154 1.244 6.872 1.556 6.62C1.904 6.332 2.09 6.2 2.114 6.224L5.642 8.996C6.674 7.784 7.832 6.584 9.116 5.396C11.048 3.62 13.04 2.108 15.092 0.86C15.128 0.86 15.266 1.028 15.506 1.364L15.866 1.886C15.878 1.934 15.878 1.988 15.866 2.048C15.854 2.096 15.83 2.138 15.794 2.174Z" fill="#16A34A"/>
                                    </svg>
                                    Modern designs with high-end amenities.
                                </p>
                            </div>
                        </div>
                        <div className="about__content--footer">
                            <a className="solid__btn" href="about.html">Learn More</a>
                        </div>
                    </div>
                    
                </div>
            </div>
        </section>
  )
}

export default About
