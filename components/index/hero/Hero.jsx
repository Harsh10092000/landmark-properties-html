"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { IconBuilding, IconHome, IconHomeCheck, IconHomeEco, IconHomeMinus, IconHomePlus, IconHomeSearch, IconHomeStar } from "@tabler/icons-react";
const Hero = ({ propertyTypeOptions, propertyAdTypeOptions, data }) => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const [suggestions, setSuggestions] = useState();
  const [openSuggestions, setOpenSuggestions] = useState(false);
  const [propertyAdTypeFilter, setPropertyAdTypeFilter] = useState("Sale");
  const [propertyTypeFilter, setPropertyTypeFilter] =
    useState("All Properties ");

  const handleClick = () => {
    const url = `/allproperties?search=${searchValue}&proadtype=${propertyAdTypeFilter}&procat=${propertyTypeFilter}`;
    router.push(url);
  };

  const handleSearch = ({ data }) => {
    setOpenSuggestions(false);
    let searchWords = searchValue?.toLowerCase().split(",");
    setSearchValue1(searchValue);

    currentPage = 1;
    router.push(`/allproperties?page=1`);

    const filteredData = (data && data.length > 0 ? data : sortedUsers).filter(
      (item) => {
        const itemValues =
          item.pro_locality +
          " " +
          item.pro_city +
          " " +
          item.pro_sub_district +
          " " +
          item.pro_street +
          " " +
          item.pro_state;

        return searchWords.every((word) =>
          itemValues.toLowerCase().includes(word)
        );
      }
    );

    // console.log("filteredData : " , filteredData);
    setResults(filteredData);
    //setCurrentPage(1);
  };

  useEffect(() => {
    const unique1 = Array.from(
      new Set(data?.slice(0, 60).map((item) => item.pro_city.trim()))
    );
    const uniqueState = Array.from(
      new Set(data?.slice(0, 60).map((item) => item.pro_state.trim()))
    );

    const unique2 = Array.from(
      new Set(
        data
          ?.slice(0, 60)
          .map(
            (item) =>
              (item.pro_sub_district
                ? item.pro_sub_district.trim() + ", "
                : "") + item.pro_city.trim()
          )
      )
    );
    const unique3 = Array.from(
      new Set(
        data
          ?.slice(0, 60)
          .map(
            (item) =>
              (item.pro_locality ? item.pro_locality.trim() + ", " : "") +
              (item.pro_sub_district
                ? item.pro_sub_district.trim() + ", "
                : "") +
              item.pro_city.trim()
          )
      )
    );

    const arr = [
      ...unique1,
      ...uniqueState,
      ...unique2,
      ...unique3,
      searchValue,
    ];

    const unique4 = Array.from(
      new Set(arr.slice(0, 200).map((item) => item.trim()))
    );
    const unique = unique4.filter((i) =>
      i.toLowerCase().startsWith(searchValue.toLowerCase())
    );

    if (searchValue === "") {
      setOpenSuggestions(false);
    }

    setSuggestions(unique);
  }, [searchValue]);

  return (
    <div>
    <div className="hero__section hero__section--bg4 color-accent-2">
      <div className="container-fluid">
        <div className="hero__section--inner__style4">
          <div
            className="hero__section--wrapper"
            data-aos="fade-up"
            data-aos-duration="1200"
            data-aos-delay="100"
          >
            <div className="hero__content text-center">
              <p className="hero__content--desc">
                Where Homes Are, There’s a Landmark{" "}
                <span className="color-hover">Landmark</span>
              </p>
              <h2 className="hero__content--title h1">
                Find Your <span className="color-hover">Dream</span> Home
              </h2>
            </div>

            <div className="advance__search--filter">
              <ul className="nav advance__tab--btn justify-content-center">

              <li className="nav-item advance__tab--btn__list">
                  <button
                    onClick={() => {
                      setPropertyAdTypeFilter("Buy");
                    }}
                    className="advance__tab--btn__field active"
                    data-bs-toggle="tab"
                    data-bs-target="#buy"
                    type="button"
                  >
                    Buy
                  </button>
                </li>
                <li className="nav-item advance__tab--btn__list">
                  <button
                    onClick={() => {
                      setPropertyAdTypeFilter("Rent");
                    }}
                    className="advance__tab--btn__field"
                    data-bs-toggle="tab"
                    data-bs-target="#buy"
                    type="button"
                  >
                    Rent
                  </button>
                </li>

                <li className="nav-item advance__tab--btn__list">
                  <Link href="/properties/residential-properties">
                  <button
                    // onClick={() => {
                    //   setPropertyAdTypeFilter("All Properties");
                    // }}
                    className="advance__tab--btn__field"
                    // data-bs-toggle="tab"
                    // data-bs-target="#buy"
                    // type="button"
                  >
                    Residential
                  </button>
                  </Link>
                </li>
                <li className="nav-item advance__tab--btn__list">
                  <Link href="/properties/commercial-properties">
                  <button
                    // onClick={() => {
                    //   setPropertyAdTypeFilter("Sale");
                    // }}
                    className="advance__tab--btn__field "
                    // data-bs-toggle="tab"
                    // data-bs-target="#buy"
                    // type="button"
                  >
                    {" "}
                    Commercial
                  </button>
                  </Link>
                </li>
                <li className="nav-item advance__tab--btn__list">
                  <Link href="/properties/agricultural-properties">
                  <button
                    // onClick={() => {
                    //   setPropertyAdTypeFilter("Rent");
                    // }}
                    className="advance__tab--btn__field"
                    // data-bs-toggle="tab"
                    // data-bs-target="#buy"
                    // type="button"
                  >
                    Agricultural
                  </button>
                  </Link>
                </li>
                

                <li className="nav-item advance__tab--btn__list">
                  <Link href="/add-property">
                  <button
                    onClick={() => {
                      setPropertyAdTypeFilter("Rent");
                    }}
                    className="advance__tab--btn__field"
                    // data-bs-toggle="tab"
                    // data-bs-target="#buy"
                    // type="button"
                  >
                    Post Property
                    <span className="badge bg-danger ms-2">Free</span>
                  </button>
                 </Link>

                </li>
              </ul>
              <div className="tab-content">
                <div className="tab-pane fade show active" id="buy">
                  <div className="advance__search--inner d-flex">
                    {/* <div className="advance__search--items">
                                            <input className="advance__search--input" placeholder="Enter Keyword..." type="text" />
                                        </div> */}

                    <div className="advance__search--items">
                      <select
                        className="advance__search--select"
                        onClick={(e) => {
                          setPropertyTypeFilter(e.target.value);
                        }}
                      >
                        <option selected value="All Properties">
                          All Properties
                        </option>
                        <option value="Residential">Residential</option>
                        <option value="Commercial">Commercial</option>
                        <option value="Land">Land</option>
                      </select>
                    </div>
                    <div className="advance__search--items position-relative">
                      <input
                        className="advance__search--input"
                        placeholder="Which Place?"
                        type="text"
                        value={searchValue}
                        onChange={(e) => {
                          setSearchValue(e.target.value),
                            setOpenSuggestions(true);
                        }}
                      />
                      <span className="advance__location--icon">
                        <svg
                          width="11"
                          height="17"
                          viewBox="0 0 11 17"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5.48287 0C2.45013 0 0 2.4501 0 5.48288C0 5.85982 0.0343013 6.21958 0.102785 6.57945C0.514031 9.69783 4.42055 11.9767 5.51712 16.4144C6.5966 12.0452 11 8.824 11 5.48288H10.9657C10.9657 2.45013 8.51548 0 5.48282 0H5.48287ZM5.48287 2.17592C7.21338 2.17592 8.61839 3.58097 8.61839 5.31144C8.61839 7.04191 7.21335 8.44696 5.48287 8.44696C3.7524 8.44696 2.34736 7.04191 2.34736 5.31144C2.34736 3.58097 3.75228 2.17592 5.48287 2.17592Z"
                            fill="#8B8B8B"
                          />
                        </svg>
                      </span>

                      {openSuggestions && (
                        <div className=" search-suggestions-2 pt-2 shadow pb-2">
                          {suggestions.map((item) => (
                            <div
                              className="py-2 pl-2 suggesion-item-2 pointer"
                              onClick={() => {
                                setSearchValue(item), setOpenSuggestions(false);
                              }}
                            >
                              {item}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    {/* <div className="advance__search--items price">
                                            <div className="advance__search--price d-flex align-items-center justify-content-between">
                                                <span>Price</span>
                                                <label><svg width="9" height="18" viewBox="0 0 9 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M5.34376 8.4373H5.06244V3.37489H8.43733C8.74808 3.37489 8.99977 3.1228 8.99977 2.81245C8.99977 2.50189 8.74807 2.25001 8.43733 2.25001H5.06244V0.56244C5.06244 0.251885 4.81074 0 4.5 0C4.18926 0 3.93756 0.252091 3.93756 0.56244V2.25001H3.65623C1.64026 2.25001 0 3.89027 0 5.90624C0 7.92222 1.64026 9.56248 3.65623 9.56248H3.93756V14.6249L0.562671 14.6247C0.251921 14.6247 0.000231432 14.8768 0.000231432 15.1871C0.000231432 15.4977 0.251931 15.7496 0.562671 15.7496H3.93756V17.4371C3.93756 17.7477 4.18926 17.9996 4.5 17.9996C4.81074 17.9996 5.06244 17.7475 5.06244 17.4371V15.7496H5.34376C7.35974 15.7496 9 14.1093 9 12.0933C9 10.0776 7.35974 8.4373 5.34376 8.4373V8.4373ZM3.93754 8.4373H3.65621C2.26039 8.4373 1.12511 7.30202 1.12511 5.90619C1.12511 4.51037 2.26039 3.37509 3.65621 3.37509H3.93754V8.4373ZM5.34376 14.6247H5.06244V9.56228H5.34376C6.73959 9.56228 7.87487 10.6976 7.87487 12.0934C7.87487 13.4894 6.73959 14.6247 5.34376 14.6247Z" fill="#8B8B8B"/>
                                                    </svg>
                                                </label>
                                            </div>
                                        </div> */}
                    <button
                      onClick={handleClick}
                      className="advance__search--btn solid__btn"
                    >
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6.60519 0C2.96319 0 0 2.96338 0 6.60562C0 10.2481 2.96319 13.2112 6.60519 13.2112C10.2474 13.2112 13.2104 10.2481 13.2104 6.60562C13.2104 2.96338 10.2474 0 6.60519 0ZM6.60519 11.9918C3.6355 11.9918 1.21942 9.57553 1.21942 6.60565C1.21942 3.63576 3.6355 1.2195 6.60519 1.2195C9.57487 1.2195 11.991 3.63573 11.991 6.60562C11.991 9.5755 9.57487 11.9918 6.60519 11.9918Z"
                          fill="white"
                        />
                        <path
                          d="M14.8206 13.9597L11.325 10.4638C11.0868 10.2256 10.701 10.2256 10.4628 10.4638C10.2246 10.7018 10.2246 11.088 10.4628 11.326L13.9585 14.8219C14.0776 14.941 14.2335 15.0006 14.3896 15.0006C14.5454 15.0006 14.7015 14.941 14.8206 14.8219C15.0588 14.5839 15.0588 14.1977 14.8206 13.9597Z"
                          fill="white"
                        />
                      </svg>{" "}
                      Search Now
                    </button>
                  </div>
                </div>
                {/* <div className="tab-pane fade" id="rent">
                                    <div className="advance__search--inner d-flex">
                                        <div className="advance__search--items">
                                            <input className="advance__search--input" placeholder="Enter Keyword..." type="text" />
                                        </div>
                                        <div className="advance__search--items">
                                            <select className="advance__search--select">
                                                <option selected value="1">Property Type</option>
                                                <option value="2">Bungalow</option>
                                                <option value="3">Condo</option>
                                                <option value="4">Apartment</option>
                                                <option value="5">House</option>
                                                <option value="6">Single Family</option>
                                                <option value="7">Land</option>
                                            </select>
                                        </div>
                                        <div className="advance__search--items position-relative">
                                            <input className="advance__search--input" placeholder="Which Place?" type="text" />
                                            <span className="advance__location--icon"><svg width="11" height="17" viewBox="0 0 11 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M5.48287 0C2.45013 0 0 2.4501 0 5.48288C0 5.85982 0.0343013 6.21958 0.102785 6.57945C0.514031 9.69783 4.42055 11.9767 5.51712 16.4144C6.5966 12.0452 11 8.824 11 5.48288H10.9657C10.9657 2.45013 8.51548 0 5.48282 0H5.48287ZM5.48287 2.17592C7.21338 2.17592 8.61839 3.58097 8.61839 5.31144C8.61839 7.04191 7.21335 8.44696 5.48287 8.44696C3.7524 8.44696 2.34736 7.04191 2.34736 5.31144C2.34736 3.58097 3.75228 2.17592 5.48287 2.17592Z" fill="#8B8B8B"/>
                                                </svg>
                                            </span>
                                        </div>
                                        
                                        <button className="advance__search--btn solid__btn">Search Now <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6.60519 0C2.96319 0 0 2.96338 0 6.60562C0 10.2481 2.96319 13.2112 6.60519 13.2112C10.2474 13.2112 13.2104 10.2481 13.2104 6.60562C13.2104 2.96338 10.2474 0 6.60519 0ZM6.60519 11.9918C3.6355 11.9918 1.21942 9.57553 1.21942 6.60565C1.21942 3.63576 3.6355 1.2195 6.60519 1.2195C9.57487 1.2195 11.991 3.63573 11.991 6.60562C11.991 9.5755 9.57487 11.9918 6.60519 11.9918Z" fill="white"/>
                                            <path d="M14.8206 13.9597L11.325 10.4638C11.0868 10.2256 10.701 10.2256 10.4628 10.4638C10.2246 10.7018 10.2246 11.088 10.4628 11.326L13.9585 14.8219C14.0776 14.941 14.2335 15.0006 14.3896 15.0006C14.5454 15.0006 14.7015 14.941 14.8206 14.8219C15.0588 14.5839 15.0588 14.1977 14.8206 13.9597Z" fill="white"/>
                                            </svg>
                                        </button>
                                    </div>
                                </div> */}
              </div>
              {/* <div className="advance__wrapper position-relative text-center">
                                <button className="advance__option--btn position-relative" data-bs-toggle="modal" data-bs-target="#advanceModal"><svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 17.9991C13.9624 17.9991 18 13.9618 18 8.99957C18 4.03734 13.9624 0 9 0C4.03764 0 0 4.03734 0 8.99957C0 13.9618 4.03764 17.9991 9 17.9991ZM4.71946 8.51799H8.51846V4.71869C8.51846 4.45281 8.73429 4.23715 9 4.23715C9.26589 4.23715 9.48154 4.45298 9.48154 4.71869V8.51799H13.2805C13.5464 8.51799 13.7621 8.73382 13.7621 8.99953C13.7621 9.26541 13.5462 9.48107 13.2805 9.48107H9.48154V13.2802C9.48154 13.5461 9.26571 13.7617 9 13.7617C8.73412 13.7617 8.51846 13.5459 8.51846 13.2802V9.48107H4.71946C4.45358 9.48107 4.23792 9.26524 4.23792 8.99953C4.23792 8.73364 4.45342 8.51799 4.71946 8.51799Z" fill="#16A34A"/>
                                    </svg>                                    
                                     Advance Option
                                    <svg className="advance__shape--icon" width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M35.1335 1.00117C37.5698 7.52851 36.9751 16.244 30.2919 19.7218C27.1872 21.3439 23.1141 20.9661 20.5302 18.4331C18.5253 16.4666 18.4255 13.0725 21.3194 12.1057H21.3198C23.382 11.5055 25.5918 11.996 27.2502 13.4224C33.5175 18.7384 28.0082 27.4659 22.5615 30.4041C16.2468 33.8206 8.63233 33.5036 2.39647 30.1263C1.49127 29.6372 0.691372 31.076 1.59661 31.565C8.35881 35.2256 16.536 35.548 23.362 31.8429C28.9242 28.832 33.5239 22.0715 30.6557 15.3661C30.0438 13.9374 29.0806 12.7074 27.8667 11.8038C26.6527 10.9002 25.2318 10.3561 23.7514 10.2275C21.3519 10.0163 18.289 11.0052 17.4367 13.6606C16.4419 16.6935 18.9839 19.6768 21.3203 21.0377C23.9544 22.5401 27.0702 22.7865 29.8874 21.7154C38.0807 18.5713 39.5071 8.18381 36.6548 0.556465C36.2862 -0.426609 34.7603 0.000793457 35.1339 1.00092L35.1335 1.00117Z" fill="#16A34A"/>
                                        <path d="M7.22445 36.5582C5.15269 34.6297 3.18993 32.5744 1.34614 30.4033L1.18316 31.7087C4.07791 30.1324 6.83528 28.2902 9.42388 26.2036C10.2186 25.5592 9.42388 24.1092 8.62403 24.7648C6.03797 26.8527 3.28201 28.6948 0.388387 30.2699C0.179519 30.4025 0.0389309 30.6284 0.00699902 30.8837C-0.0245686 31.1391 0.0558214 31.3956 0.225407 31.5808C2.06262 33.7512 4.01795 35.8065 6.08238 37.7358C6.84002 38.4414 7.96621 37.2634 7.19791 36.5582L7.22445 36.5582Z" fill="#16A34A"/>
                                        </svg>
                                         
                                </button>


                            </div> */}
            </div>

            <div className="search-box">
               <div className="advance__search--items position-relative">
                      <input
                        className="advance__search--input"
                        placeholder="Which Place?"
                        type="text"
                        value={searchValue}
                        onChange={(e) => {
                          setSearchValue(e.target.value),
                            setOpenSuggestions(true);
                        }}
                      />
                      <span className="advance__location--icon">
                        <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-search"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M21 21l-6 -6" /></svg>
                      </span>

                      {openSuggestions && (
                        <div className=" search-suggestions-2 pt-2 shadow pb-2">
                          {suggestions.map((item) => (
                            <div
                              className="py-2 pl-2 suggesion-item-2 pointer"
                              onClick={() => {
                                setSearchValue(item), setOpenSuggestions(false);
                              }}
                            >
                              {item}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
            </div>

                    



          </div>
        </div>
      </div>
    </div>

     <div className="get-started">
      <div className="container">
              <h3>Get started with</h3>
              <p>Explore real estate options in top cities</p>

              <ul>
                <li><span><IconHome height={30} width={30} /></span>Residential</li>
                <li><span><IconBuilding height={30} width={30} /></span>Commercial</li>
                <li><span><IconHomeEco height={30} width={30}  /></span>Agricultural</li>
                <li><span><IconHomePlus height={30} width={30} /></span>Buy</li>
                <li><span><IconHomeMinus height={30} width={30} /></span>Rent</li>   
                <li><span><IconHomeCheck height={30} width={30} /></span>Sell</li>
                 <li><span><IconHomeSearch height={30} width={30} /></span>List Property</li>
                <li><span><IconHomeStar height={30} width={30} /></span>Post Property FREE</li>
               


               


              </ul>
              </div>
            </div> 
    </div>
  );
};

export default Hero;
