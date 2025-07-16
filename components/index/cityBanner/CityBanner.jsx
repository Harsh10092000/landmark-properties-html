import Link from 'next/link'
import React from 'react'


const CityBannerCard = ({city_name, city_number, delay, banner_img}) => {
    return (
        <div className="banner__items mb-25" data-aos="fade-up" data-aos-duration="1200" data-aos-delay={delay}>
        <div className="banner__thumbnail position-relative">
             <Link className="banner__thumbnail--link pointer" href={`/properties/properties-for-sale-in-${city_name}`}>
                <picture><img className="banner__thumbnail--media" src={`assets/img/banner/${banner_img}`} alt="img" /></picture>
                 </Link> 
            <div className="banner__content">
                <h3 className="banner__content--title"> <Link className="banner__content--title mb-0" href={`/properties/properties-for-sale-in-${city_name}`}>{city_name}</Link></h3>
                <span className="banner__content--subtitle"> {city_number} Properties</span>
            </div>
        </div>
    </div>
    )
}

const CityBanner = ({cityCount}) => {
  return (

    <section className="banner__section mb--n30">
    <div className="banner__step d-flex">
        {cityCount[1] &&
        <>
        <CityBannerCard city_name={cityCount[0].pro_city} city_number={cityCount[0].pro_city_number} delay={"50"} banner_img={"banner1.png"} />
        <CityBannerCard city_name={cityCount[1].pro_city} city_number={cityCount[1].pro_city_number} delay={"100"} banner_img={"banner2.png"} />
        </>
}
        {/* <div className="banner__items mb-25" data-aos="fade-up" data-aos-duration="1200" data-aos-delay="50">
            <div className="banner__thumbnail position-relative">
                 <Link className="banner__thumbnail--link pointer" href={`/properties/properties-for-sale-in-${cityCount[0].pro_city}`}>
                    <picture><img className="banner__thumbnail--media" src="assets/img/banner/banner1.png" alt="img" /></picture>
                     </Link> 
                <div className="banner__content">
                    <h3 className="banner__content--title">{cityCount[0].pro_city}</h3>
                    <span className="banner__content--subtitle"> {cityCount[0].pro_city_number} Properties</span>
                </div>
            </div>
        </div>
        <div className="banner__items mb-25" data-aos="fade-up" data-aos-duration="1200" data-aos-delay="100">
            <div className="banner__thumbnail position-relative">
                 <Link className="banner__thumbnail--link pointer" href={`/properties/properties-for-sale-in-${cityCount[1].pro_city}`}> 
                    <picture><img className="banner__thumbnail--media" src="assets/img/banner/banner2.png" alt="img" /></picture>
                     </Link> 
                <div className="banner__content">
                    <h3 className="banner__content--title">{cityCount[1].pro_city}</h3>
                    <span className="banner__content--subtitle"> {cityCount[1].pro_city_number} Properties</span>
                </div>
            </div>
        </div> */}
    </div>
    <div className="banner__step d-flex">
        {cityCount[3] &&
        <>
    <CityBannerCard city_name={cityCount[2].pro_city} city_number={cityCount[2].pro_city_number} delay={"150"} banner_img={"banner3.png"} />
    <CityBannerCard city_name={cityCount[3].pro_city} city_number={cityCount[3].pro_city_number} delay={"200"} banner_img={"banner4.png"} />
    </>
        }
        {/* <div className="banner__items mb-25" data-aos="fade-up" data-aos-duration="1200" data-aos-delay="150">
            <div className="banner__thumbnail position-relative">
                <Link className="banner__thumbnail--link pointer" href={`/properties/properties-for-sale-in-${cityCount[2].pro_city}`}> 
                    <picture><img className="banner__thumbnail--media" src="assets/img/banner/banner3.png" alt="img" /></picture>
                     </Link>
                <div className="banner__content">
                    <h3 className="banner__content--title">{cityCount[2].pro_city}</h3>
                    <span className="banner__content--subtitle"> {cityCount[2].pro_city_number} Properties</span>
                </div>
            </div>
        </div>
        <div className="banner__items mb-15" data-aos="fade-up" data-aos-duration="1200" data-aos-delay="200">
            <div className="banner__thumbnail position-relative">
                <Link className="banner__thumbnail--link" href={`/properties/properties-for-sale-in-${cityCount[3].pro_city}`}>
                    <picture><img className="banner__thumbnail--media pointer" src="assets/img/banner/banner4.png" alt="img" /></picture>
                    </Link>
                <div className="banner__content">
                 <h3 className="banner__content--title"><Link  className="banner__content--title mb-0" href={`/properties/properties-for-sale-in-${cityCount[3].pro_city}`}>{cityCount[3].pro_city}</Link></h3> 
                    <span className="banner__content--subtitle"> {cityCount[3].pro_city_number} Properties</span>
                </div>
            </div>
        </div> */}
    </div>
</section>

  )
}

export default CityBanner
