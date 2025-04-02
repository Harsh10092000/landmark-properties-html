import React from 'react'

const CityBanner = ({cityCount}) => {
  return (
    <section className="banner__section mb--n30">
    <div className="banner__step d-flex">
        <div className="banner__items mb-25" data-aos="fade-up" data-aos-duration="1200" data-aos-delay="50">
            <div className="banner__thumbnail position-relative">
                <a className="banner__thumbnail--link" href="listing-details.html"><picture><img className="banner__thumbnail--media" src="assets/img/banner/banner1.png" alt="img" /></picture></a>
                <div className="banner__content">
                    <h3 className="banner__content--title">{cityCount[0].pro_city}</h3>
                    <span className="banner__content--subtitle"> {cityCount[0].pro_city_number} Properties</span>
                </div>
            </div>
        </div>
        <div className="banner__items mb-25" data-aos="fade-up" data-aos-duration="1200" data-aos-delay="100">
            <div className="banner__thumbnail position-relative">
                <a className="banner__thumbnail--link" href="listing-details.html"><picture><img className="banner__thumbnail--media" src="assets/img/banner/banner2.png" alt="img" /></picture></a>
                <div className="banner__content">
                    <h3 className="banner__content--title">{cityCount[1].pro_city}</h3>
                    <span className="banner__content--subtitle"> {cityCount[1].pro_city_number} Properties</span>
                </div>
            </div>
        </div>
    </div>
    <div className="banner__step d-flex">
        <div className="banner__items mb-25" data-aos="fade-up" data-aos-duration="1200" data-aos-delay="150">
            <div className="banner__thumbnail position-relative">
                <a className="banner__thumbnail--link" href="listing-details.html"><picture><img className="banner__thumbnail--media" src="assets/img/banner/banner3.png" alt="img" /></picture></a>
                <div className="banner__content">
                    <h3 className="banner__content--title">{cityCount[2].pro_city}</h3>
                    <span className="banner__content--subtitle"> {cityCount[2].pro_city_number} Properties</span>
                </div>
            </div>
        </div>
        <div className="banner__items mb-15" data-aos="fade-up" data-aos-duration="1200" data-aos-delay="200">
            <div className="banner__thumbnail position-relative">
                <a className="banner__thumbnail--link" href="listing-details.html"><picture><img className="banner__thumbnail--media" src="assets/img/banner/banner4.png" alt="img" /></picture></a>
                <div className="banner__content">
                    <h3 className="banner__content--title">{cityCount[3].pro_city}</h3>
                    <span className="banner__content--subtitle"> {cityCount[3].pro_city_number} Properties</span>
                </div>
            </div>
        </div>
    </div>
</section>
  )
}

export default CityBanner
