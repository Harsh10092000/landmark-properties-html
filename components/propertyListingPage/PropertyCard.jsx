
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ShowPrice } from "../HelperComponents";
import moment from "moment";

const PropertyCard = ({ item, index }) => {
  return (
    <div key={index} className="listing__page--wrapper">
      <div className="listing__main--content">
        <div className="tab-content">
          <div className="tab-pane fade show active" id="list">
            <div className="listing__featured--list">
              <article className="featured__card--list d-flex align-items-center mb-30">
                <div className="listing__featured--thumbnail position-relative">
                  <div className="media">
                    <Link
                      className="featured__thumbnail--link"
                      href={`/${item.pro_url}`}
                    >
                      {item.pro_cover_image ? (
                        <img
                          src={`${process.env.webURL}/uploads/${item.pro_cover_image}`}
                          alt={`Property For ${
                            item.pro_ad_type === "Rent" ? "Rent" : "Sale"
                          } in ${
                            item.pro_city
                              ? item.pro_city + ", " + item.pro_state
                              : item.pro_state
                          }`}
                          className="featured__thumbnail--img"
                          width={380}
                          height={220}
                          loading="lazy"
                        />
                      ) : (
                        <Image
                          src={`/uploads/${process.env.NEXT_PUBLIC_DEFAULT_IMAGE}`}
                          alt={`${item.pro_type.split(",")[0]} in ${
                            item.pro_city
                          }`}
                          className="featured__thumbnail--img"
                          width={380}
                          height={220}
                          loading="lazy"
                        />
                      )}
                    </Link>
                  </div>
                  <div className="featured__badge">
                    <span className="badge__field style2">
                      For {item.pro_ad_type}
                    </span>
                  </div>
                  <span className="featured__author--img__style2">
                    <img
                      src="/assets/img/property/properties-author.png"
                      alt="img"
                    />
                  </span>
                </div>
                <div className="listing__featured--content">
                  <div className="featured__content--list__top d-flex justify-content-between">
                    <h3 className="featured__card--title">
                      <Link href={`/${item.pro_url}`}>
                        {" "}
                        {item.pro_area_size +
                          " " +
                          item.pro_area_size_unit +
                          " " +
                          item.pro_type.split(",")[0] +
                          " "}
                        for {item.pro_ad_type === "Rent" ? "Rent" : "Sale"} in{" "}
                        <span className="text-capitalize">
                          {item.pro_locality}
                        </span>
                        ,&nbsp;
                        {item.pro_sub_district
                          ? item.pro_sub_district + ", "
                          : ""}
                        {item.pro_city},&nbsp;
                        {item.pro_state}
                      </Link>
                    </h3>
                    <ul className="featured__list--action d-flex">
                      <li className="featured__share--btn__list">
                        <a className="featured__share--btn" href="#">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-telephone"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fill="currentColor"
                              d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"
                            />
                          </svg>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="featured__content--list__middle">
                    <div className="featured__content--list__price">
                      <ShowPrice price={item.pro_price} />
                    </div>
                    <ul className="listing__featured--info d-flex">
                      <li className="listing__featured--info__items">
                        <span className="listing__featured--info__icon">
                          <svg
                            width="19"
                            height="20"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M17.8417 17.2754L0.685046 0.116923C0.569917 0.00263286 0.39646 -0.0311375 0.247421 0.0301228C0.097685 0.0938982 0 0.239308 0 0.401336L0.00181414 17.593C0.00181414 17.8144 0.178622 17.994 0.400928 17.994H17.5973C17.8196 17.994 18 17.8145 18 17.593C17.9997 17.4634 17.9371 17.3485 17.8419 17.2756L17.8417 17.2754ZM0.80258 17.1915V1.36951L2.73813 3.30506L1.77607 4.26741C1.62006 4.42384 1.62006 4.67906 1.77607 4.83525C1.85366 4.91284 1.95735 4.95289 2.06019 4.95289C2.16207 4.95289 2.26491 4.91284 2.3425 4.83525L3.30595 3.87265L5.02184 5.58868L4.0602 6.55113C3.90419 6.70854 3.90419 6.96168 4.0602 7.11783C4.13779 7.19639 4.24064 7.23547 4.34433 7.23547C4.44717 7.23547 4.55002 7.19625 4.62761 7.11783L5.58996 6.15677L7.29369 7.86011L6.33135 8.82396C6.17547 8.97956 6.17547 9.23407 6.33135 9.39094C6.41061 9.46937 6.5136 9.50858 6.61547 9.50858C6.71832 9.50858 6.82116 9.46937 6.89959 9.39094L7.86194 8.42835L9.56639 10.1331L8.60351 11.0957C8.4493 11.2517 8.4493 11.5062 8.60351 11.6631C8.68277 11.7415 8.78576 11.7807 8.88944 11.7807C8.99229 11.7807 9.09248 11.7415 9.17273 11.6621L10.1339 10.7001L11.8393 12.4053L10.8773 13.3677C10.7203 13.5237 10.7203 13.7782 10.8773 13.9342C10.9549 14.0136 11.0576 14.0531 11.1611 14.0531C11.2641 14.0531 11.3658 14.0139 11.4434 13.9342L12.4063 12.9726L14.1117 14.6779L13.1491 15.6395C12.9921 15.7945 12.9921 16.0492 13.1491 16.2083C13.2267 16.2859 13.3301 16.3241 13.433 16.3241C13.535 16.3241 13.6373 16.2859 13.7154 16.2083L14.6787 15.2454L16.625 17.1917L0.80258 17.1915Z"
                              fill="black"
                            />
                            <path
                              d="M3.52378 9.14585C3.40949 9.02946 3.23715 8.99583 3.08726 9.05821C2.93823 9.11961 2.83984 9.26544 2.83984 9.42871V14.7534C2.83984 14.9755 3.0193 15.1552 3.2416 15.1552H8.5717C8.794 15.1552 8.97442 14.9757 8.97442 14.7534C8.97442 14.6242 8.91176 14.5098 8.81673 14.4365L3.52378 9.14585ZM3.64324 14.353L3.64142 10.3976L7.59863 14.3534L3.64324 14.353Z"
                              fill="black"
                            />
                          </svg>
                        </span>
                        <span className="listing__featured--info__text">
                          {" "}
                          {item.pro_bedrooms} Beds
                        </span>
                      </li>
                      <li className="listing__featured--info__items">
                        <span className="listing__featured--info__icon">
                          <svg
                            width="19"
                            height="20"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5.13137 7.14457L4.58925 8.12975C4.50242 8.28753 4.56011 8.48611 4.7179 8.57295C4.87568 8.65993 5.07426 8.60238 5.1611 8.4446L5.70352 7.45927C5.79035 7.30149 5.73266 7.10291 5.57487 7.01607C5.41694 6.92924 5.21822 6.98664 5.13152 7.14472L5.13137 7.14457Z"
                              fill="black"
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M8.83241 7.45932L9.37453 8.44464C9.46136 8.60243 9.65994 8.65998 9.81773 8.573C9.97552 8.48617 10.0331 8.28759 9.94638 8.12979L9.40426 7.14462C9.31743 6.98669 9.11885 6.92929 8.96091 7.01598C8.80312 7.10281 8.74557 7.30139 8.83255 7.45918L8.83241 7.45932Z"
                              fill="black"
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M6.93945 7.30194V8.28711C6.93945 8.46719 7.08573 8.61346 7.26581 8.61346C7.44574 8.61346 7.59216 8.46719 7.59216 8.28711V7.30194C7.59216 7.12186 7.44574 6.97559 7.26581 6.97559C7.08573 6.97559 6.93945 7.12186 6.93945 7.30194Z"
                              fill="black"
                            />
                          </svg>
                        </span>
                        <span className="listing__featured--info__text">
                          {" "}
                          {item.pro_washrooms} Baths
                        </span>
                      </li>
                      <li className="listing__featured--info__items">
                        <span className="listing__featured--info__icon">
                          <svg
                            width="19"
                            height="20"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M17.8417 17.2754L0.685046 0.116923C0.569917 0.00263286 0.39646 -0.0311375 0.247421 0.0301228C0.097685 0.0938982 0 0.239308 0 0.401336L0.00181414 17.593C0.00181414 17.8144 0.178622 17.994 0.400928 17.994H17.5973C17.8196 17.994 18 17.8145 18 17.593C17.9997 17.4634 17.9371 17.3485 17.8419 17.2756L17.8417 17.2754ZM0.80258 17.1915V1.36951L2.73813 3.30506L1.77607 4.26741C1.62006 4.42384 1.62006 4.67906 1.77607 4.83525C1.85366 4.91284 1.95735 4.95289 2.06019 4.95289C2.16207 4.95289 2.26491 4.91284 2.3425 4.83525L3.30595 3.87265L5.02184 5.58868L4.0602 6.55113C3.90419 6.70854 3.90419 6.96168 4.0602 7.11783C4.13779 7.19639 4.24064 7.23547 4.34433 7.23547C4.44717 7.23547 4.55002 7.19625 4.62761 7.11783L5.58996 6.15677L7.29369 7.86011L6.33135 8.82396C6.17547 8.97956 6.17547 9.23407 6.33135 9.39094C6.41061 9.46937 6.5136 9.50858 6.61547 9.50858C6.71832 9.50858 6.82116 9.46937 6.89959 9.39094L7.86194 8.42835L9.56639 10.1331L8.60351 11.0957C8.4493 11.2517 8.4493 11.5062 8.60351 11.6631C8.68277 11.7415 8.78576 11.7807 8.88944 11.7807C8.99229 11.7807 9.09248 11.7415 9.17273 11.6621L10.1339 10.7001L11.8393 12.4053L10.8773 13.3677C10.7203 13.5237 10.7203 13.7782 10.8773 13.9342C10.9549 14.0136 11.0576 14.0531 11.1611 14.0531C11.2641 14.0531 11.3658 14.0139 11.4434 13.9342L12.4063 12.9726L14.1117 14.6779L13.1491 15.6395C12.9921 15.7945 12.9921 16.0492 13.1491 16.2083C13.2267 16.2859 13.3301 16.3241 13.433 16.3241C13.535 16.3241 13.6373 16.2859 13.7154 16.2083L14.6787 15.2454L16.625 17.1917L0.80258 17.1915Z"
                              fill="black"
                            />
                            <path
                              d="M3.52378 9.14585C3.40949 9.02946 3.23715 8.99583 3.08726 9.05821C2.93823 9.11961 2.83984 9.26544 2.83984 9.42871V14.7534C2.83984 14.9755 3.0193 15.1552 3.2416 15.1552H8.5717C8.794 15.1552 8.97442 14.9757 8.97442 14.7534C8.97442 14.6242 8.91176 14.5098 8.81673 14.4365L3.52378 9.14585ZM3.64324 14.353L3.64142 10.3976L7.59863 14.3534L3.64324 14.353Z"
                              fill="black"
                            />
                          </svg>
                        </span>
                        <span className="listing__featured--info__text">
                          {" "}
                          {item.pro_area_size} {item.pro_area_size_unit}
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="featured__content--list__footer d-flex justify-content-between align-items-center">
                    <div className="featured__content--desc listing__style">
                      <div className="location-info d-flex align-items-center">
                        <svg
                          width="11"
                          height="17"
                          viewBox="0 0 11 17"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="me-2"
                        >
                          <path
                            d="M5.48287 0C2.45013 0 0 2.4501 0 5.48288C0 5.85982 0.0343013 6.21958 0.102785 6.57945C0.514031 9.69783 4.42055 11.9767 5.51712 16.4144C6.5966 12.0452 11 8.824 11 5.48288H10.9657C10.9657 2.45013 8.51548 0 5.48282 0H5.48287ZM5.48287 2.17592C7.21338 2.17592 8.61839 3.58097 8.61839 5.31144C8.61839 7.04191 7.21335 8.44696 5.48287 8.44696C3.7524 8.44696 2.34736 7.04191 2.34736 5.31144C2.34736 3.58097 3.75228 2.17592 5.48287 2.17592Z"
                            fill="#16A34A"
                          />
                        </svg>
                        <span>
                          {item.pro_locality}, {item.pro_city}
                        </span>
                      </div>
                      <div className="time-info text-muted small mt-1">
                        {moment(item.pro_creation_date).fromNow()}
                      </div>
                    </div>
                    <Link className="listing__details--btn" href={`/${item.pro_url}`}>
                      View Details
                    </Link>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
