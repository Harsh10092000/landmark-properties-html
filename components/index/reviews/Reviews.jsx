"use client"
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Dummy data
const testimonialData = [
  {
    id: 1,
    thumbnail: "assets/img/other/testimonial-thumb2.png",
    quote: "Level has transformed our business operations. The efficiency and time-saving features are unmatched.",
    rating: 5,
    authorImg: "assets/img/other/testimonial-author-thumb3.png",
    authorName: "Yunus Seyhan",
    authorTitle: "CEO & Founder"
  },
  {
    id: 2,
    thumbnail: "assets/img/other/testimonial-thumb3.png",
    quote: "An incredible tool that has boosted our productivity significantly. Highly recommended!",
    rating: 5,
    authorImg: "assets/img/other/testimonial-author-thumb2.png",
    authorName: "Cameron Williamson",
    authorTitle: "CEO & Founder"
  },
  {
    id: 3,
    thumbnail: "assets/img/other/testimonial-thumb4.png",
    quote: "The support and features provided by Level are exactly what our company needed to grow.",
    rating: 5,
    authorImg: "assets/img/other/testimonial-author-thumb3.png",
    authorName: "Sarah Johnson",
    authorTitle: "Marketing Director"
  }
];


const Reviews = () => {
    
  return (
    <section className="testimonial__section4 section--padding color-accent-2">
      <div className="container">
        <div 
          className="section__heading text-center mb-50" 
          data-aos="fade-up" 
          data-aos-duration="1200" 
          data-aos-delay="100"
        >
          <h2 className="section__heading--title">What our customers are saying</h2>
          <p className="section__heading--desc">
            We make sure you have a fine distance with the <br /> sickness. We make you never lose hope.
          </p>
        </div>
        <div className="testimonial__container position-relative" data-aos="fade-up" data-aos-duration="1200" data-aos-delay="150">
        <div className="testimonial__inner testimonial__style4--column1 swiper">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          className="testimonial__container position-relative"
          data-aos="fade-up"
          data-aos-duration="1200"
          data-aos-delay="150"
        >
          {testimonialData.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div className="testimonial__items">
                <div className="testimonial__items--thumbnail">
                <picture><img src={testimonial.thumbnail} alt="testimonial" /></picture>
                </div>
                <div className="testimonial__items--content">
                  <span className="testimonial__items--content__icon mb-20">
                    <svg width="40" height="28" viewBox="0 0 40 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g opacity="0.5">
                        <path d="M23.8318 23.9751C25.3894 26.2251 27.8505 27.3501 31.2149 27.3501C33.8318 27.3501 35.9501 26.6508 37.5701 25.2521C39.19 23.7927 40 21.8771 40 19.5055C40 17.0123 39.2523 15.0967 37.757 13.7589C36.2617 12.3602 34.2679 11.6609 31.7757 11.6609C28.8473 11.6609 26.5732 12.6035 24.9533 14.4886C24.8287 14.0629 24.7664 13.394 24.7664 12.4819C24.7664 11.3264 24.9221 10.3231 25.2336 9.47172C25.7321 7.95145 26.6044 6.52239 27.8505 5.18455C29.1589 3.78591 30.623 2.72172 32.243 1.99199L31.4019 0.350098C28.162 1.80956 25.7009 3.87712 24.0187 6.5528C22.3364 9.22847 21.4953 12.1474 21.4953 15.3096C21.4953 17.1339 21.7134 18.8062 22.1495 20.3264C22.5857 21.8467 23.1464 23.0629 23.8318 23.9751Z" fill="#16A34A"/>
                        <path d="M2.33645 23.9751C3.89408 26.2251 6.35514 27.3501 9.71963 27.3501C12.3364 27.3501 14.4548 26.6508 16.0748 25.2521C17.6947 23.7927 18.5047 21.8771 18.5047 19.5055C18.5047 17.0123 17.757 15.0967 16.2617 13.7589C14.7664 12.3602 12.7726 11.6609 10.2804 11.6609C7.35202 11.6609 5.07788 12.6035 3.45794 14.4886C3.33333 14.0629 3.27103 13.394 3.27103 12.4819C3.27103 11.3264 3.42679 10.3231 3.73832 9.47172C4.23676 7.95145 5.10903 6.52239 6.35514 5.18455C7.66355 3.78591 9.12772 2.72172 10.7477 1.99199L9.90654 0.350098C6.66667 1.80956 4.20561 3.87712 2.52336 6.5528C0.841121 9.22847 0 12.1474 0 15.3096C0 17.1339 0.218069 18.8062 0.654206 20.3264C1.09034 21.8467 1.65109 23.0629 2.33645 23.9751Z" fill="#16A34A"/>
                      </g>
                    </svg>
                  </span>
                  <p className="testimonial__desc mb-20">{testimonial.quote}</p>
                  <ul className="testimonial__rating mb-25">
                    {[...Array(testimonial.rating)].map((_, index) => (
                      <li key={index}>
                        <span>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.6397 14.9108L19.416 23.3501L12 19.0398V13.0642L17.6397 14.9108Z" fill="#FEE25D"/>
                            <path d="M19.416 23.3501L17.6397 14.9108L12 13.0642L19.416 23.3501Z" fill="#FAC030"/>
                            <path d="M12 19.0398L4.58398 23.3501L6.3603 14.9108L12 13.0642V19.0398Z" fill="#FFF277"/>
                            <path d="M4.58398 23.3501L12 19.0398V13.0642L4.58398 23.3501Z" fill="#FED835"/>
                            <path d="M15.4865 8.22974L24.0004 9.13525L17.6407 14.9107L12.001 13.0641L15.4865 8.22974Z" fill="#FED839"/>
                            <path d="M17.6397 14.9108L23.9994 9.13538L12 13.0642L17.6397 14.9108Z" fill="#FAA922"/>
                            <path d="M6.35967 14.9107L0 9.13525L8.51384 8.22974L11.9994 13.0641L6.35967 14.9107Z" fill="#FDF5A3"/>
                            <path d="M0 9.13538L6.35967 14.9108L11.9994 13.0642L0 9.13538Z" fill="#FBDA37"/>
                            <path d="M11.9992 0.350098L15.4847 8.2298L11.9992 13.0642L8.51367 8.2298L11.9992 0.350098Z" fill="#FEF278"/>
                            <path d="M15.4846 8.2298L11.999 0.350098V13.0642L15.4846 8.2298Z" fill="#FCC02C"/>
                          </svg>
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="testimonial__author d-flex align-items-center">
                    <div className="testimonial__author--thumbnail">
                    <picture><img src={testimonial.authorImg} alt="author" /></picture>
                    </div>
                    <div className="testimonial__author--content">
                      <h3 className="testimonial__author--name">{testimonial.authorName}</h3>
                      <span className="testimonial__author--subtitle">{testimonial.authorTitle}</span>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;