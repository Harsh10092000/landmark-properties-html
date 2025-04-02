"use client";
import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { Autoplay } from 'swiper/modules';

// Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';

const ProHero = ({ images, propertyData }) => {
    //console.log("images : " , images);
  const mainImages = [
    { src: "assets/img/hero/listing-details-hero.png", alt: "img1" },
    { src: "assets/img/hero/listing-details-hero.png", alt: "img2" },
   // { src: "assets/img/hero/listing-details-hero.png", alt: "img3" },
  ];

  const thumbnailImages = [
    { src: "assets/img/hero/slider-small1.png", alt: "img1" },
    { src: "assets/img/hero/slider-small2.png", alt: "img2" },
    { src: "assets/img/hero/slider-small3.png", alt: "img3" },
     { src: "assets/img/hero/slider-small2.png", alt: "img2" },
    // { src: "assets/img/hero/slider-small3.png", alt: "img3" },
    
  ];

  const renderMainContent = () => {
    if (images.length > 1) {
      return (
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          navigation={{
            prevEl: '.swiper-button-prev',
            nextEl: '.swiper-button-next',
          }}
          loop= {true}
          autoplay={{
            delay: 3000, 
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          className="hero__swiper--column1"
        >
          {images.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="listing__hero--slider__items position-relative">
              <img
                title="Click to Enlarge Image"
                decoding="async"
                width="438px"
                height="304px"
                className=" coursor-pointer bg-img"
                src={
                  process.env.webURL+
                  "/propertyImages/watermark/" +
                  item.img_link
                }
                alt={`/${
                  propertyData.pro_area_size + " " + propertyData.pro_area_size_unit + " "
                }
                ${propertyData.pro_type ? propertyData.pro_type.split(",")[0] : ""} For ${
                  " " + propertyData.pro_ad_type + " in " + propertyData.pro_city
                }}`}
              />
                <img 
                  className="listing__hero--slider__media" 
                  //src={image.img_link}
                  src={
                    process.env.webURL+
                    "/propertyImages/watermark/" +
                    item.img_link
                  } 
                 // alt={image.alt} 
                />
                <div className="listing__hero--slider__container">
                  <div className="container">
                    <div className="listing__hero--slider__content">
                      <div className="listing__hero--slider__content--top d-flex align-items-center justify-content-between">
                        <h3 className="listing__hero--slider__title">Luxury Family Home</h3>
                        <span className="listing__hero--slider__price">$13000</span>
                      </div>
                      <p className="listing__hero--slider__text">
                        <svg width="11" height="17" viewBox="0 0 11 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5.48287 0C2.45013 0 0 2.4501 0 5.48288C0 5.85982 0.0343013 6.21958 0.102785 6.57945C0.514031 9.69783 4.42055 11.9767 5.51712 16.4144C6.5966 12.0452 11 8.824 11 5.48288H10.9657C10.9657 2.45013 8.51548 0 5.48282 0H5.48287ZM5.48287 2.17592C7.21338 2.17592 8.61839 3.58097 8.61839 5.31144C8.61839 7.04191 7.21335 8.44696 5.48287 8.44696C3.7524 8.44696 2.34736 7.04191 2.34736 5.31144C2.34736 3.58097 3.75228 2.17592 5.48287 2.17592Z" fill="#FA4B4A"/>
                        </svg>
                        1421 San Pedro St, Los Angeles, CA
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      );
    } else {
      return (
        <div className="listing__hero--slider__items position-relative">
             <img
                title="Click to Enlarge Image"
                decoding="async"
                width="438px"
                height="304px"
                className=" coursor-pointer bg-img"
                src={
                  process.env.webURL+
                  "/propertyImages/watermark/" +
                  images[0].img_link
                }
                alt={`/${
                  propertyData.pro_area_size + " " + propertyData.pro_area_size_unit + " "
                }
                ${propertyData.pro_type ? propertyData.pro_type.split(",")[0] : ""} For ${
                  " " + propertyData.pro_ad_type + " in " + propertyData.pro_city
                }}`}
              />
            <img
                title="Click to Enlarge Image"
                decoding="async"
                width="438px"
                height="304px"
                className=" coursor-pointer bg-img"
                src={
                  process.env.webURL+
                  "/propertyImages/watermark/" +
                  images[0].img_link
                }
                alt={`/${
                  propertyData.pro_area_size + " " + propertyData.pro_area_size_unit + " "
                }
                ${propertyData.pro_type ? propertyData.pro_type.split(",")[0] : ""} For ${
                  " " + propertyData.pro_ad_type + " in " + propertyData.pro_city
                }}`}
              />
          <img 
            className="listing__hero--slider__media" 
           // src={images[0].img_link} 
            src={
                process.env.webURL+
                "/propertyImages/watermark/" +
                images[0].img_link
              }
           // alt={mainImages[0].alt} 
          />
          <div className="listing__hero--slider__container">
            <div className="container">
              <div className="listing__hero--slider__content">
                <div className="listing__hero--slider__content--top d-flex align-items-center justify-content-between">
                  <h3 className="listing__hero--slider__title">Luxury Family Home</h3>
                  <span className="listing__hero--slider__price">$13000</span>
                </div>
                <p className="listing__hero--slider__text">
                  <svg width="11" height="17" viewBox="0 0 11 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.48287 0C2.45013 0 0 2.4501 0 5.48288C0 5.85982 0.0343013 6.21958 0.102785 6.57945C0.514031 9.69783 4.42055 11.9767 5.51712 16.4144C6.5966 12.0452 11 8.824 11 5.48288H10.9657C10.9657 2.45013 8.51548 0 5.48282 0H5.48287ZM5.48287 2.17592C7.21338 2.17592 8.61839 3.58097 8.61839 5.31144C8.61839 7.04191 7.21335 8.44696 5.48287 8.44696C3.7524 8.44696 2.34736 7.04191 2.34736 5.31144C2.34736 3.58097 3.75228 2.17592 5.48287 2.17592Z" fill="#FA4B4A"/>
                  </svg>
                  1421 San Pedro St, Los Angeles, CA
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  const renderThumbnailContent = () => {
    if (images.length > 1) {
      return (
        <div className="listing__small--hero__slider listing__small--hero__slider{
">
          <Swiper
            modules={[Navigation]}
            spaceBetween={10}
            slidesPerView={2}
            navigation={{
              prevEl: '.swiper-button-prev',
              nextEl: '.swiper-button-next',
            }}
            
            className="hero__swiper--column3"
          >
            {images.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="listing__small--hero__slider--items">
                  <img 
                  
                  src={
                    process.env.webURL+
                    "/propertyImages/watermark/" +
                    item.img_link
                  }
                  //alt={image.alt}
                   />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div class="swiper__nav--btn swiper-button-disabled swiper-button-prev">
                        <svg width="16" height="13" style={{ width: "16px", height: "13px" }} viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.223772 5.27955L5.27967 0.223543C5.42399 0.0792188 5.61635 0 5.82145 0C6.02678 0 6.21902 0.0793326 6.36335 0.223543L6.82238 0.682693C6.96659 0.82679 7.04604 1.01926 7.04604 1.22448C7.04604 1.42958 6.96659 1.62854 6.82238 1.77264L3.87285 4.72866H13.2437C13.6662 4.72866 14 5.05942 14 5.48203V6.13115C14 6.55376 13.6662 6.91788 13.2437 6.91788H3.83939L6.82227 9.8904C6.96648 10.0347 7.04593 10.222 7.04593 10.4272C7.04593 10.6322 6.96648 10.8221 6.82227 10.9663L6.36323 11.424C6.21891 11.5683 6.02667 11.647 5.82134 11.647C5.61623 11.647 5.42388 11.5673 5.27955 11.423L0.223659 6.3671C0.0789928 6.22232 -0.000566483 6.02905 1.90735e-06 5.82361C-0.000452995 5.61748 0.0789928 5.4241 0.223772 5.27955Z" fill="currentColor"/>
                        </svg>
                    </div>
                    <div class="swiper__nav--btn swiper-button-next">
                        <svg width="16" height="13" style={{ width: "16px", height: "13px" }} viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.7762 5.27955L8.72033 0.223543C8.57601 0.0792188 8.38365 0 8.17855 0C7.97322 0 7.78098 0.0793326 7.63665 0.223543L7.17762 0.682693C7.03341 0.82679 6.95396 1.01926 6.95396 1.22448C6.95396 1.42958 7.03341 1.62854 7.17762 1.77264L10.1272 4.72866H0.756335C0.333835 4.72866 0 5.05942 0 5.48203V6.13115C0 6.55376 0.333835 6.91788 0.756335 6.91788H10.1606L7.17773 9.8904C7.03352 10.0347 6.95407 10.222 6.95407 10.4272C6.95407 10.6322 7.03352 10.8221 7.17773 10.9663L7.63677 11.424C7.78109 11.5683 7.97333 11.647 8.17866 11.647C8.38377 11.647 8.57612 11.5673 8.72045 11.423L13.7763 6.3671C13.921 6.22232 14.0006 6.02905 14 5.82361C14.0005 5.61748 13.921 5.4241 13.7762 5.27955Z" fill="currentColor"/>
                        </svg>
                    </div>
        </div>
      );
    }
    return null; // Don't show thumbnails if only one image
  };

  return (
    <section className="listing__hero--section">
      <div className="listing__hero--section__inner position-relative">
        <div className="listing__hero--slider">
          {renderMainContent()}
        </div>
        {renderThumbnailContent()}
      </div>
    </section>
  );
};

export default ProHero;