"use client"; // Required for client-side components in Next.js

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Sample reviews data array
const reviewsData = [
  {
    id: 1,
    authorImage: "assets/img/other/testimonial-author-thumb3.png",
    authorName: "Cameron Williamson",
    authorTitle: "CEO & Founder",
    description:
      "The most advanced revenue than this. I will refer everyone I like Level more and more each day because it makes my life easier. It really saves me time and effort.",
  },
  {
    id: 2,
    authorImage: "assets/img/other/testimonial-author-thumb2.png",
    authorName: "Sarah Johnson",
    authorTitle: "Marketing Director",
    description:
      "Level has transformed our workflow. The intuitive interface and powerful features have made our marketing campaigns more effective than ever.",
  },
  {
    id: 3,
    authorImage: "assets/img/other/testimonial-author-thumb.png",
    authorName: "Michael Chen",
    authorTitle: "Product Manager",
    description:
      "I can’t imagine managing our products without Level. It’s streamlined our processes and improved our team’s productivity significantly.",
  },
  {
    id: 4,
    authorImage: "assets/img/other/testimonial-author-thumb3.png",
    authorName: "Emily Davis",
    authorTitle: "Freelance Designer",
    description:
      "As a freelancer, Level helps me stay organized and deliver projects on time. It’s streamlined our processes and improved our team’s productivity significantly.",
  },
  {
    id: 5,
    authorImage: "assets/img/other/testimonial-author-thumb2.png",
    authorName: "Robert Taylor",
    authorTitle: "Small Business Owner",
    description:
      "Level’s features are exactly what I needed to grow my business. It’s streamlined our processes and improved our team’s productivity significantly.",
  },
];

const Reviews = () => {
  return (
    <section className="testimonial__section section--padding">
      <div className="container">
        <div
          className="section__heading text-center mb-20"
          data-aos="fade-up"
          data-aos-duration="1200"
          data-aos-delay="100"
        >
          <h3 className="section__heading--subtitle h5">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_15_6)">
                <path
                  d="M9.00021 4.72925L2.5806 10.0215C2.5806 10.029 2.57872 10.04 2.57497 10.055C2.57129 10.0698 2.56934 10.0806 2.56934 10.0883V15.4473C2.56934 15.6408 2.64008 15.8085 2.78152 15.9497C2.92292 16.091 3.09037 16.1621 3.2839 16.1621H7.571V11.8747H10.4295V16.1622H14.7165C14.91 16.1622 15.0777 16.0913 15.2189 15.9497C15.3603 15.8086 15.4313 15.6408 15.4313 15.4473V10.0883C15.4313 10.0586 15.4272 10.0361 15.4201 10.0215L9.00021 4.72925Z"
                  fill="#16A34A"
                />
                <path
                  d="M17.8758 8.81572L15.4309 6.78374V2.2285C15.4309 2.12437 15.3974 2.03872 15.3302 1.9717C15.2636 1.90475 15.178 1.87128 15.0736 1.87128H12.93C12.8258 1.87128 12.7401 1.90475 12.6731 1.9717C12.6062 2.03872 12.5727 2.1244 12.5727 2.2285V4.4056L9.8486 2.12792C9.61069 1.93439 9.3278 1.83765 9.00026 1.83765C8.67275 1.83765 8.3899 1.93439 8.15175 2.12792L0.124063 8.81572C0.0496462 8.87516 0.00885955 8.95517 0.00127316 9.05567C-0.00627412 9.15609 0.0197308 9.2438 0.079366 9.31818L0.771565 10.1444C0.831201 10.2113 0.909254 10.2523 1.00604 10.2673C1.09539 10.2748 1.18475 10.2486 1.27411 10.1891L9.00002 3.74687L16.726 10.1891C16.7857 10.241 16.8637 10.2669 16.9605 10.2669H16.994C17.0907 10.2522 17.1686 10.211 17.2285 10.1442L17.9208 9.31814C17.9803 9.2436 18.0064 9.15605 17.9987 9.05551C17.991 8.95528 17.9501 8.87527 17.8758 8.81572Z"
                  fill="#16A34A"
                />
              </g>
              <defs>
                <clipPath>
                  <rect width="18" height="18" fill="white" />
                </clipPath>
              </defs>
            </svg>
            Trusted Real estate Care
          </h3>
          <h2 className="section__heading--title">Find Client’s Feedback</h2>
        </div>
        <div
          className="testimonial__container position-relative"
          data-aos="fade-up"
          data-aos-duration="1200"
          data-aos-delay="150"
        >
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation={{
              prevEl: ".swiper-button-prev",
              nextEl: ".swiper-button-next",
            }}
            loop={true}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            pagination={{
              el: ".swiper-pagination",
              clickable: true,
            }}
            breakpoints={{
              768: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
            }}
            className="testimonial__inner testimonial__swiper--column2"
          >
            {reviewsData.map((review) => (
              <SwiperSlide key={review.id}>
                <div className="testimonial__card">
                  <div className="testimonial__card--top d-flex justify-content-between">
                    <div className="testimonial__author d-flex align-items-center">
                      <div className="testimonial__author--thumbnail">
                        <img src={review.authorImage} alt={review.authorName} />
                      </div>
                      <div className="testimonial__author--content">
                        <h3 className="testimonial__author--name">
                          {review.authorName}
                        </h3>
                        <span className="testimonial__author--subtitle">
                          {review.authorTitle}
                        </span>
                      </div>
                    </div>
                    <span className="testimonial__icon">
                      <svg
                        width="56"
                        height="41"
                        viewBox="0 0 56 41"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M17.8311 21.1016C17.9536 21.1016 18.0759 21.1354 18.1817 21.2039C18.3821 21.3311 18.4933 21.5575 18.4689 21.7902C18.1183 25.181 17.2177 28.3412 15.7918 31.1837C14.5318 33.6944 12.8821 35.8983 10.864 37.7716C20.7152 32.6251 24.7246 21.6445 23.3721 12.7732C22.5228 7.20455 19.1356 1.25311 12.1763 1.25311C6.17002 1.25308 1.28225 6.02976 1.28225 11.9008C1.28236 17.7707 6.16997 22.5474 12.1763 22.5474C14.0486 22.5473 15.8941 22.0753 17.5159 21.1821C17.6139 21.1277 17.723 21.1017 17.8311 21.1016L17.8311 21.1016ZM6.69995 40.7565C6.45388 40.7565 6.22235 40.6173 6.11549 40.39C5.98301 40.1038 6.08656 39.7655 6.35926 39.598C13.747 35.0813 16.2827 28.1824 17.053 22.8063C15.5225 23.4589 13.8584 23.8006 12.1765 23.8006C5.46212 23.8005 0 18.4615 0 11.9008C0.00010793 5.33901 5.4621 2.89626e-09 12.1765 2.89626e-09C15.527 -7.02862e-05 18.4723 1.27924 20.694 3.6986C22.7266 5.91116 24.0913 8.98545 24.64 12.5894C26.2563 23.1859 20.5827 36.6501 6.88693 40.7294C6.82457 40.7478 6.7611 40.7566 6.69997 40.7565L6.69995 40.7565Z"
                          fill="#16a34a"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M48.9217 21.1017C49.0442 21.1017 49.1666 21.1354 49.2735 21.2039C49.4739 21.3311 49.584 21.5575 49.5607 21.7902C49.21 25.181 48.3084 28.3412 46.8825 31.1837C45.6226 33.6944 43.9739 35.8984 41.9558 37.7716C51.8048 32.6251 55.8152 21.6445 54.4628 12.7732C53.6136 7.20455 50.2274 1.25311 43.2682 1.25311C37.2607 1.25308 32.3741 6.02976 32.3741 11.9008C32.3742 17.7707 37.2607 22.5474 43.2682 22.5474C45.1394 22.5473 46.986 22.0753 48.6079 21.1821C48.7059 21.1277 48.8137 21.1017 48.9217 21.1017L48.9217 21.1017ZM37.7906 40.7565C37.5446 40.7565 37.313 40.6173 37.2073 40.39C37.0738 40.1039 37.1783 39.7656 37.4499 39.5981C44.8389 35.0814 47.3734 28.1824 48.1436 22.8063C46.6132 23.4589 44.9501 23.8006 43.2682 23.8006C36.5539 23.8005 31.0918 18.4615 31.0918 11.9008C31.0919 5.33901 36.5539 2.89626e-09 43.2682 2.89626e-09C46.6176 -7.02862e-05 49.5629 1.27924 51.7847 3.6986C53.8173 5.91116 55.1819 8.98545 55.7318 12.5883C57.347 23.1859 51.6734 36.6501 37.9776 40.7294C37.9153 40.7478 37.8529 40.7566 37.7906 40.7565V40.7565Z"
                          fill="#16a34a"
                        />
                      </svg>
                    </span>
                  </div>
                  <p className="testimonial__desc">{review.description}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Buttons */}
          <div className="swiper__nav--btn swiper-button-prev">
            <svg
              width="16"
              height="13"
              viewBox="0 0 14 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.223772 5.27955L5.27967 0.223543C5.42399 0.0792188 5.61635 0 5.82145 0C6.02678 0 6.21902 0.0793326 6.36335 0.223543L6.82238 0.682693C6.96659 0.82679 7.04604 1.01926 7.04604 1.22448C7.04604 1.42958 6.96659 1.62854 6.82238 1.77264L3.87285 4.72866H13.2437C13.6662 4.72866 14 5.05942 14 5.48203V6.13115C14 6.55376 13.6662 6.91788 13.2437 6.91788H3.83939L6.82227 9.8904C6.96648 10.0347 7.04593 10.222 7.04593 10.4272C7.04593 10.6322 6.96648 10.8221 6.82227 10.9663L6.36323 11.424C6.21891 11.5683 6.02667 11.647 5.82134 11.647C5.61623 11.647 5.42388 11.5673 5.27955 11.423L0.223659 6.3671C0.0789928 6.22232 -0.000566483 6.02905 1.90735e-06 5.82361C-0.000452995 5.61748 0.0789928 5.4241 0.223772 5.27955Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <div className="swiper__nav--btn swiper-button-next">
            <svg
              width="16"
              height="13"
              viewBox="0 0 14 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.7762 5.27955L8.72033 0.223543C8.57601 0.0792188 8.38365 0 8.17855 0C7.97322 0 7.78098 0.0793326 7.63665 0.223543L7.17762 0.682693C7.03341 0.82679 6.95396 1.01926 6.95396 1.22448C6.95396 1.42958 7.03341 1.62854 7.17762 1.77264L10.1272 4.72866H0.756335C0.333835 4.72866 0 5.05942 0 5.48203V6.13115C0 6.55376 0.333835 6.91788 0.756335 6.91788H10.1606L7.17773 9.8904C7.03352 10.0347 6.95407 10.222 6.95407 10.4272C6.95407 10.6322 7.03352 10.8221 7.17773 10.9663L7.63677 11.424C7.78109 11.5683 7.97333 11.647 8.17866 11.647C8.38377 11.647 8.57612 11.5673 8.72045 11.423L13.7763 6.3671C13.921 6.22232 14.0006 6.02905 14 5.82361C14.0005 5.61748 13.921 5.4241 13.7762 5.27955Z"
                fill="currentColor"
              />
            </svg>
          </div>

          {/* Pagination */}
          <div className="swiper-pagination"></div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;