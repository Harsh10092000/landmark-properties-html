import Link from 'next/link'
import Image from 'next/image'
import React from 'react'


const CityBannerCard = ({city_name, city_number, delay, banner_img}) => {
    return (
        <div className="banner__items mb-25" data-aos="fade-up" data-aos-duration="1200" data-aos-delay={delay}>
        <div className="banner__thumbnail position-relative">
             <Link className="banner__thumbnail--link pointer" href={`/properties/properties-for-sale-in-${city_name}`}>
                {/* <picture><img className="banner__thumbnail--media" src={`assets/img/banner/${banner_img}`} alt="img" /></picture> */}
                <Image src={`/assets/img/banner/${banner_img}`} alt="img" fill={true} style={{objectFit: "cover"}} className='position-relative' />
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
        <CityBannerCard city_name={cityCount[0].pro_city} city_number={cityCount[0].pro_city_number} delay={"50"} banner_img={"banner1.webp"} />
        <CityBannerCard city_name={cityCount[1].pro_city} city_number={cityCount[1].pro_city_number} delay={"100"} banner_img={"banner2.webp"} />
        </>
}
   
    </div>
    <div className="banner__step d-flex">
        {cityCount[3] &&
        <>
    <CityBannerCard city_name={cityCount[2].pro_city} city_number={cityCount[2].pro_city_number} delay={"150"} banner_img={"banner3.webp"} />
    <CityBannerCard city_name={cityCount[3].pro_city} city_number={cityCount[3].pro_city_number} delay={"200"} banner_img={"banner4.webp"} />
    </>
        }
       
    </div>
</section>

  )
}

export default CityBanner
