'use client'; // Required for client-side components in Next.js

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const MostPopularCities = () => {

    const mostPopularCitiesList = [
        { id: 1, title: "California", img: "assets/img/property/popular-properties1.png", details: "13 properties" },
        { id: 2, title: "Switzerland", img: "assets/img/property/popular-properties2.png", details: "More DETAILS" },
        { id: 3, title: "New Jersey", img: "assets/img/property/popular-properties3.png", details: "13 properties" },
        { id: 4, title: "New York", img: "assets/img/property/popular-properties4.png", details: "13 properties" },
        { id: 5, title: "Washington", img: "assets/img/property/popular-properties5.png", details: "13 properties" },
        { id: 5, title: "Delhi", img: "assets/img/property/popular-properties2.png", details: "143 properties" },
      ];

  return (
    <section className="popular__featured--section section--padding">
      <div className="container-fluid p-0">
        <div 
          className="section__heading text-center mb-50" 
          data-aos="fade-up" 
          data-aos-duration="1200" 
          data-aos-delay="100"
        >
          <h3 className="section__heading--subtitle color__white h5">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_15_6)">
                <path d="M9.00021 4.72925L2.5806 10.0215C2.5806 10.029 2.57872 10.04 2.57497 10.055C2.57129 10.0698 2.56934 10.0806 2.56934 10.0883V15.4473C2.56934 15.6408 2.64008 15.8085 2.78152 15.9497C2.92292 16.091 3.09037 16.1621 3.2839 16.1621H7.571V11.8747H10.4295V16.1622H14.7165C14.91 16.1622 15.0777 16.0913 15.2189 15.9497C15.3603 15.8086 15.4313 15.6408 15.4313 15.4473V10.0883C15.4313 10.0586 15.4272 10.0361 15.4201 10.0215L9.00021 4.72925Z" fill="#16A34A"/>
                <path d="M17.8758 8.81572L15.4309 6.78374V2.2285C15.4309 2.12437 15.3974 2.03872 15.3302 1.9717C15.2636 1.90475 15.178 1.87128 15.0736 1.87128H12.93C12.8258 1.87128 12.7401 1.90475 12.6731 1.9717C12.6062 2.03872 12.5727 2.1244 12.5727 2.2285V4.4056L9.8486 2.12792C9.61069 1.93439 9.3278 1.83765 9.00026 1.83765C8.67275 1.83765 8.3899 1.93439 8.15175 2.12792L0.124063 8.81572C0.0496462 8.87516 0.00885955 8.95517 0.00127316 9.05567C-0.00627412 9.15609 0.0197308 9.2438 0.079366 9.31818L0.771565 10.1444C0.831201 10.2113 0.909254 10.2523 1.00604 10.2673C1.09539 10.2748 1.18475 10.2486 1.27411 10.1891L9.00002 3.74687L16.726 10.1891C16.7857 10.241 16.8637 10.2669 16.9605 10.2669H16.994C17.0907 10.2522 17.1686 10.211 17.2285 10.1442L17.9208 9.31814C17.9803 9.2436 18.0064 9.15605 17.9987 9.05551C17.991 8.95528 17.9501 8.87527 17.8758 8.81572Z" fill="#16A34A"/>
              </g>
              <defs>
                <clipPath>
                  <rect width="18" height="18" fill="white"/>
                </clipPath>
              </defs>
            </svg>
            <span>Trusted</span> Real estate Care
          </h3>
          <h2 className="section__heading--title color__white">
            Most <span>Popular</span> Cities
          </h2>
        </div>
        <div 
          className="popular__featured--inner" 
          data-aos="fade-up" 
          data-aos-duration="1200" 
          data-aos-delay="150"
        >
          <Swiper
            modules={[Navigation, Pagination,Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            loop= {true}
            autoplay={{
                delay: 1500, 
                disableOnInteraction: false,
            }}
            navigation={{
              prevEl: '.swiper-button-prev',
              nextEl: '.swiper-button-next',
            }}
            pagination={{ 
              el: '.swiper-pagination',
              clickable: true 
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
              1200: {
                slidesPerView: 5,
                spaceBetween: 30,
              },
            }}
            className="popular__featured--column5"
          >
             {mostPopularCitiesList.map((property) => (
        <SwiperSlide key={property.id}>
          <article className="popular__featured--card">
            <div className="popular__featured--thumbnail position-relative">
              <a className="popular__featured--link" href="listing-details.html">
                <img className="popular__featured--img" src={property.img} alt="popular-properties" />
              </a>
              <span className="popular__featured--badge">13</span>
              <div className="popular__featured--content">
                <h3 className="popular__featured--title">{property.title}</h3>
                <h5 className="popular__featured--subtitle">
                  {property.details}
                  <span>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.4219 1.67528L17.3926 13.422C17.3918 13.7573 17.2595 14.0725 17.0207 14.3101C16.7816 14.548 16.4657 14.6784 16.1306 14.6777L15.0639 14.6749C14.729 14.6742 14.4135 14.5421 14.1757 14.3031C13.938 14.0643 13.8 13.7405 13.801 13.4056L13.8106 6.54525L2.89752 17.4038C2.40548 17.8934 1.63343 17.895 1.14372 17.4028L0.391553 16.6469C-0.098156 16.1547 -0.131297 15.3438 0.360739 14.8543L11.3128 3.95695L4.39453 3.95165C4.05934 3.95068 3.74986 3.82469 3.51207 3.5857C3.27453 3.34697 3.14693 3.03368 3.14777 2.69863L3.15202 1.63372C3.15286 1.29841 3.28561 0.984048 3.52473 0.746117C3.76359 0.50845 4.07993 0.378344 4.41525 0.379184L16.1618 0.408607C16.4981 0.40958 16.8147 0.542466 17.0521 0.782382C17.2914 1.02191 17.423 1.33917 17.4219 1.67528Z" fill="currentColor"/>
                    </svg>
                  </span>
                </h5>
              </div>
            </div>
          </article>
        </SwiperSlide>
      ))}

          </Swiper>

          {/* Navigation Buttons */}
          <div className="swiper__nav--btn swiper-button-prev">
            <svg width="16" height="13" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.223772 5.27955L5.27967 0.223543C5.42399 0.0792188 5.61635 0 5.82145 0C6.02678 0 6.21902 0.0793326 6.36335 0.223543L6.82238 0.682693C6.96659 0.82679 7.04604 1.01926 7.04604 1.22448C7.04604 1.42958 6.96659 1.62854 6.82238 1.77264L3.87285 4.72866H13.2437C13.6662 4.72866 14 5.05942 14 5.48203V6.13115C14 6.55376 13.6662 6.91788 13.2437 6.91788H3.83939L6.82227 9.8904C6.96648 10.0347 7.04593 10.222 7.04593 10.4272C7.04593 10.6322 6.96648 10.8221 6.82227 10.9663L6.36323 11.424C6.21891 11.5683 6.02667 11.647 5.82134 11.647C5.61623 11.647 5.42388 11.5673 5.27955 11.423L0.223659 6.3671C0.0789928 6.22232 -0.000566483 6.02905 1.90735e-06 5.82361C-0.000452995 5.61748 0.0789928 5.4241 0.223772 5.27955Z" fill="currentColor"/>
            </svg>
          </div>
          <div className="swiper__nav--btn swiper-button-next">
            <svg width="16" height="13" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.7762 5.27955L8.72033 0.223543C8.57601 0.0792188 8.38365 0 8.17855 0C7.97322 0 7.78098 0.0793326 7.63665 0.223543L7.17762 0.682693C7.03341 0.82679 6.95396 1.01926 6.95396 1.22448C6.95396 1.42958 7.03341 1.62854 7.17762 1.77264L10.1272 4.72866H0.756335C0.333835 4.72866 0 5.05942 0 5.48203V6.13115C0 6.55376 0.333835 6.91788 0.756335 6.91788H10.1606L7.17773 9.8904C7.03352 10.0347 6.95407 10.222 6.95407 10.4272C6.95407 10.6322 7.03352 10.8221 7.17773 10.9663L7.63677 11.424C7.78109 11.5683 7.97333 11.647 8.17866 11.647C8.38377 11.647 8.57612 11.5673 8.72045 11.423L13.7763 6.3671C13.921 6.22232 14.0006 6.02905 14 5.82361C14.0005 5.61748 13.921 5.4241 13.7762 5.27955Z" fill="currentColor"/>
            </svg>
          </div>

          {/* Pagination */}
          <div className="swiper-pagination"></div>

          <p className="featured__support--desc text-center">
            Enjoy discounts, eBox, pickup and <a href="javascript:void(0)">delivery</a> with 24 hour support.
          </p>
        </div>
      </div>
    </section>
  );
};

export default MostPopularCities;