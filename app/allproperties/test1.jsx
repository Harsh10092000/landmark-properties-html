"use client";
import PaginationComp from "@/components/propertyListingPage/PaginationComp";
import PropertyCard from "@/components/propertyListingPage/PropertyCard";
import React, { useEffect, useState } from "react";
import { Checkbox, Switch } from "@mui/material";
import { IconSquareCheckFilled, IconSquare, IconX } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

const Test1 = ({ data, currentUser, recordsPerPage, currentPage }) => {
  // const searchParams = useSearchParams();
  // const a = searchParams.get("page");
  // console.log("a : " , a);

  const [tempCurrPage, setTempCurrPage] = useState(currentPage);
  // useEffect(() => {
  //   setTempCurrPage(currentPage);
  // }, [currentPage]);

  //const [data , setData] = useState([]);
  const [openSortByOptions, setOpenSortByOptions] = useState(false);
  const [sortBy, setSortBy] = useState("Recent Listed");
  //const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue1, setSearchValue1] = useState("");
  const [openPropertyAdTypeOptions, setOpenPropertyAdTypeOptions] =
    useState(false);
  const [change, setChange] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [suggestions, setSuggestions] = useState();
  const [openSuggestions, setOpenSuggestions] = useState(false);
  const [sortedUsers, setSortedUsers] = useState([]);
  //const [nPages , setNPages] = useState("");
  //const [currentPage, setCurrentPage] = useState(1);
  const [results, setResults] = useState("");
  const icon = <IconSquare fontSize="small" height={20} width={20} />;
  const checkedIcon = (
    <IconSquareCheckFilled fontSize="small" height={20} width={20} />
  );

   const router = useRouter();
  // const handleForSale = (val) => {
  //   console.log(val)
  //   router.push(`/${val}`)
  // }

  // const handleForRent = (val) => {
  //   console.log(val)
  //   router.push(`/rental/${val}`)
  // }

  useEffect(() => {
    setResults(data);
  }, []);


  // useEffect(() => {
  //   //console.log("currentPage : " , currentPage);
  //   router.push(`/allproperties?page=1`)
  // }, [tempCurrPage]);

  
  // useEffect(() => {
  //     axios
  //       .get(process.env.webURL + "/api/pro/fetchPropertyData")
  //       .then((res) => {
  //         setData(res.data);
  //         setResults(res.data);
  //       });
  //     }, []);

  //useEffect(() => {
  // setCurrentPage(searchParams["page"] || 1);
  // const {page} = useParams();

  //  const {page} = searchParams;
  //  console.log("page : " , page);
  //setCurrentPage(searchParams.get("page") || 1);

  //   const ab = searchParams.get("page");
  //   setCurrentPage(ab || 1)
  // }, [searchParams]);

  //const currentUser = "";
  //const result = await getData();
  //const records = result.row;

  //const currentPage = searchParams["page"] || 1;

  //const recordsPerPage = 12;

  //   useEffect(() => {
  //     setNPages( Math.ceil(data.length/ recordsPerPage));
  //     setCurrentPage( searchParams["page"] || 1);
  //   }, [data])

    //const recordsPerPage = 12;

      const lastIndex = currentPage * recordsPerPage;
      let firstIndex = lastIndex - recordsPerPage;
      const records = results?.slice(firstIndex, lastIndex);
      const nPages = Math.ceil(results?.length / recordsPerPage);


  const [propertyAdTypeFilter, setPropertyAdTypeFilter] =
    useState("All Properties");

  const propertyAdTypeOptions = [
    { type: "All Properties" },
    { type: "Sale" },
    { type: "Rent" },
  ];

  const [furnishingStatusFilter, setFurnishingStatusFilter] = useState([]);
  const [openFurnishingOptions, setOpenFurnishingOptions] = useState(false);
  const furnishingStatusOptions = [
    { type: "Fully Furnished" },
    { type: "Semi Furnished" },
    { type: "Unfurnished" },
  ];

  const [possessionAvailableFilter, setPossessionAvailableFilter] = useState(
    []
  );
  const [openPossessionOptions, setOpenPossessionOptions] = useState(false);
  const possessionAvailableOptions = [
    { type: "Immediate" },
    { type: "0-3 Month" },
    { type: "3-6 Month" },
    { type: "After 6 Months" },
  ];

  const [authorityApprovedFilter, setAuthorityApprovedFilter] = useState([]);

  const [openAuthorityOptions, setOpenAuthorityOptions] = useState(false);
  const authorityApprovedOptions = [
    { type: "HSVP" },
    { type: "MC" },
    { type: "DTP" },
    { type: "Other" },
  ];

  const [proCategoryFilter, setProCategoryFilter] = useState([]);

  const [openProCategoryOptions, setOpenProCategoryOptions] = useState(false);
  const proCategoryOptions = [
    { type: "Residential" },
    { type: "Commercial" },
    { type: "Land" },
  ];

  const [proWithPhotos, setProWithPhotos] = useState(false);
  const [proWithParking, setProWithParking] = useState(false);

  const [selectedSubTypeFilter, setSelectedSubTypeFilter] = useState([]);

  const propertySubTypeOptions = [
    { id: "t1", type: "Apartment", parent_type: "Residential" },
    { id: "t2", type: "Independent House", parent_type: "Residential" },
    { id: "t3", type: "Builder Floor", parent_type: "Residential" },
    { id: "t4", type: "Farm HouseRaw House", parent_type: "Residential" },
    { id: "t5", type: "Retirement Community", parent_type: "Residential" },
    { id: "t6", type: "Studio Apartment", parent_type: "Residential" },
    { id: "t7", type: "Residential Land", parent_type: "Land" },
    { id: "t8", type: "Commercial Land", parent_type: "Land" },
    { id: "t9", type: "Industrial Land", parent_type: "Land" },
    { id: "t10", type: "Agricultural Land", parent_type: "Land" },
    { id: "t11", type: "Farm House Land", parent_type: "Land" },

    { id: "t12", type: "Retail Showroom", parent_type: "Commercial" },
    { id: "t13", type: "Commercial Building", parent_type: "Commercial" },
    { id: "t14", type: "Office Complex", parent_type: "Commercial" },
    { id: "t15", type: "Software Technology Park", parent_type: "Commercial" },
    { id: "t16", type: "Warehouse", parent_type: "Commercial" },
    { id: "t18", type: "Industrial Estate", parent_type: "Commercial" },
  ];
  const [openProSubOptions, setOpenProSubOptions] = useState(false);

  const handleProSubTypeToggle = (type) => {
    //console.log(type);
    //props.handleCurrentPage(1);
    currentPage= 1;
    router.push(`/allproperties?page=1`);
    if (selectedSubTypeFilter.includes(type)) {
      setSelectedSubTypeFilter(
        selectedSubTypeFilter.filter((item) => item !== type)
      );
    } else {
      setSelectedSubTypeFilter([...selectedSubTypeFilter, type]);
    }
  };

  const handleAllSubTypes = () => {
    currentPage= 1;
    router.push(`/allproperties?page=1`);
    setSelectedSubTypeFilter((prevSelectedTypes) => {
      const updatedTypes = propertySubTypeOptions
        .map((item) => item.type)
        .filter((type) => !prevSelectedTypes.includes(type));
      return [...prevSelectedTypes, ...updatedTypes];
    });
  };

  const handleToggleFurnishing = (type) => {
    //props.handleCurrentPage(1);
    currentPage= 1;
    router.push(`/allproperties?page=1`);
    if (furnishingStatusFilter.includes(type)) {
      setFurnishingStatusFilter(
        furnishingStatusFilter.filter((item) => item !== type)
      );
    } else {
      setFurnishingStatusFilter([...furnishingStatusFilter, type]);
    }
  };

  const handleToggleAuthority = (type) => {
    //props.handleCurrentPage(1);
    currentPage= 1;
    router.push(`/allproperties?page=1`);
    if (authorityApprovedFilter.includes(type)) {
      setAuthorityApprovedFilter(
        authorityApprovedFilter.filter((item) => item !== type)
      );
    } else {
      setAuthorityApprovedFilter([...authorityApprovedFilter, type]);
    }
  };

  const handleTogglePossession = (type) => {
    //props.handleCurrentPage(1);
    currentPage= 1;
    router.push(`/allproperties?page=1`);
    if (possessionAvailableFilter.includes(type)) {
      setPossessionAvailableFilter(
        possessionAvailableFilter.filter((item) => item !== type)
      );
    } else {
      setPossessionAvailableFilter([...possessionAvailableFilter, type]);
    }
  };

  const handleToggleProCategory = (type) => {
    //props.handleCurrentPage(1);
    currentPage= 1;
    router.push(`/allproperties?page=1`);
    if (proCategoryFilter.includes(type)) {
      setProCategoryFilter(proCategoryFilter.filter((item) => item !== type));
    } else {
      setProCategoryFilter([...proCategoryFilter, type]);
    }
  };
  //let sortedUsers = [...data];


  
  useEffect(() => {
    setSortedUsers(data);
    if (sortBy === "Recent Listed") {
      sortedUsers.sort((a, b) => b.pro_id - a.pro_id);
      console.log("sortedUsers : ", sortedUsers);
    } else if (sortBy === "Most Popular") {
      sortedUsers.sort((a, b) => b.pro_views - a.pro_views);
    }
  }, [data, sortBy]);

  const handleSearch = ({ data }) => {
    setOpenSuggestions(false);
    let searchWords = searchValue?.toLowerCase().split(",");
    setSearchValue1(searchValue);

    currentPage= 1;
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



  useEffect(() => {
    let searchWords = searchValue1?.toLowerCase().split(",");
    console.log(sortedUsers, searchWords);
    const filteredData = sortedUsers
      .filter((code) => {
        if (proWithPhotos === true) {
          return code.img_id !== null;
        } else if (proWithPhotos === false) {
          return true;
        }
      })
      .filter((code) => {
        if (proWithParking === true) {
          return code.pro_parking > 0;
        } else if (proWithParking === false) {
          return true;
        }
      })
      .filter((code) => {
        if (propertyAdTypeFilter === "Sale") {
          return code.pro_ad_type === "Sale";
        } else if (propertyAdTypeFilter === "Rent") {
          return code.pro_ad_type === "Rent";
        } else if (propertyAdTypeFilter === "All Properties") {
          return true;
        }
      })
      .filter((item) => {
        const result = furnishingStatusFilter.includes(item.pro_furnishing);
        if (result === true) {
          return item;
        } else if (furnishingStatusFilter.length === 0) {
          return true;
        }
      })
      .filter((item) => {
        const result = proCategoryFilter.includes(item.pro_type.split(",")[1]);
        if (result === true) {
          return item;
        } else if (proCategoryFilter.length === 0) {
          return true;
        }
      })
      .filter((item) => {
        const result = selectedSubTypeFilter.includes(
          item.pro_type.split(",")[0]
        );

        if (result === true) {
          return item;
        } else if (selectedSubTypeFilter.length === 0) {
          return true;
        }
      })
      .filter((item) => {
        const result = authorityApprovedFilter.includes(item.pro_approval);
        if (result === true) {
          return item;
        } else if (authorityApprovedFilter.length === 0) {
          return true;
        }
      })
      .filter((item) => {
        const result = possessionAvailableFilter.includes(item.pro_possession);
        if (result === true) {
          //currentPage = 1;
          // setTempCurrPage(1);
          return item;
        } else if (possessionAvailableFilter.length === 0) {
          return true;
        }
      })
      .filter((item) => {
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

        if (searchWords.length !== 0) {
          return searchWords.every((word) =>
            itemValues.toLowerCase().includes(word)
          );
        } else {
          return true;
        }
      });
    //currentPage = 1;
    //setTempCurrPage(1);
    //router.push(`/allproperties?page=${tempCurrPage}`)
    console.log("currentPage : " , currentPage);
    setResults(filteredData);
    //setTempCurrPage(1);
  }, [
    sortedUsers,
    sortBy,
    searchValue1,
    propertyAdTypeFilter,
    furnishingStatusFilter,
    proCategoryFilter,
    selectedSubTypeFilter,
    possessionAvailableFilter,
    authorityApprovedFilter,
    proWithPhotos,
    proWithParking,
  ]);

  // useEffect(() => {
  //   if (tempCurrPage !== currentPage) {
  //     router.push(`/allproperties?page=${tempCurrPage}`, undefined, { shallow: true });
  //   }
  // }, [tempCurrPage, currentPage]);


  console.log("results : " , results, records);
  return (
    <section class="listing__page--section section--padding">
      <div className="row">
        <div className="col-md-3">
          <div class="widget__search mb-30">
            <div class="widget__search--input position-relative">
              <input
                placeholder="Search for a property"
                value={searchValue}
                onChange={(e) => {
                  setSearchValue(e.target.value), setOpenSuggestions(true);
                }}
                class="widget__search--input__field"
                type="text"
              />
              <button onClick={handleSearch} class="widget__search--btn">
                <svg
                  width="16"
                  height="17"
                  viewBox="0 0 15 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.10714 9.54464C9.89286 8.75893 10.2857 7.81548 10.2857 6.71429C10.2857 5.61309 9.89286 4.67262 9.10714 3.89286C8.32738 3.10714 7.38691 2.71428 6.28571 2.71428C5.18452 2.71428 4.24107 3.10714 3.45536 3.89286C2.6756 4.67262 2.28571 5.61309 2.28571 6.71429C2.28571 7.81548 2.6756 8.75893 3.45536 9.54464C4.24107 10.3244 5.18452 10.7143 6.28571 10.7143C7.38691 10.7143 8.32738 10.3244 9.10714 9.54464ZM14.8571 14.1429C14.8571 14.4524 14.744 14.7202 14.5179 14.9464C14.2917 15.1726 14.0238 15.2857 13.7143 15.2857C13.3929 15.2857 13.125 15.1726 12.9107 14.9464L9.84822 11.8929C8.78274 12.631 7.59524 13 6.28571 13C5.43452 13 4.61905 12.8363 3.83929 12.5089C3.06548 12.1756 2.39583 11.7292 1.83036 11.1696C1.27083 10.6042 0.824405 9.93452 0.491071 9.16071C0.16369 8.38095 0 7.56548 0 6.71429C0 5.86309 0.16369 5.05059 0.491071 4.27678C0.824405 3.49702 1.27083 2.82738 1.83036 2.26786C2.39583 1.70238 3.06548 1.25595 3.83929 0.928571C4.61905 0.595237 5.43452 0.428571 6.28571 0.428571C7.13691 0.428571 7.94941 0.595237 8.72322 0.928571C9.50298 1.25595 10.1726 1.70238 10.7321 2.26786C11.2976 2.82738 11.744 3.49702 12.0714 4.27678C12.4048 5.05059 12.5714 5.86309 12.5714 6.71429C12.5714 8.02381 12.2024 9.21131 11.4643 10.2768L14.5268 13.3393C14.747 13.5595 14.8571 13.8274 14.8571 14.1429Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </div>
          </div>
          {openSuggestions && (
            <div className=" search-suggestions-2 pt-2 shadow pb-2">
              {suggestions.map((item, index) => (
                <div
                  key={index}
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
          <div class="listing__widget--inner">
            <div class="widget__list mb-30">
              <div
                className={`property-type-filter pointer position-relative ${
                  openPropertyAdTypeOptions ? "arrow-up" : "arrow-down"
                }`}
                onClick={() =>
                  setOpenPropertyAdTypeOptions(!openPropertyAdTypeOptions)
                }
              >
                <div>Purchase Type</div>
                <span className="selected">{propertyAdTypeFilter}</span>
              </div>
              {openPropertyAdTypeOptions &&
                propertyAdTypeOptions.map((item, index) => (
                  <div
                    key={index}
                    className={`${
                      propertyAdTypeFilter === item.type
                        ? "selected-option pointer"
                        : "options pointer"
                    }`}
                    onClick={() => {
                      setPropertyAdTypeFilter(item.type);
                      //,setOpenPropertyAdTypeOptions(false);
                    }}
                  >
                    {item.type}
                  </div>
                ))}

              {/* ########### filter 2 ########### */}
              <div
                className={`property-type-filter pointer position-relative border-top ${
                  openProCategoryOptions ? "arrow-up" : "arrow-down"
                }`}
                onClick={() =>
                  setOpenProCategoryOptions(!openProCategoryOptions)
                }
              >
                <div>Property Types</div>

                <span className="selected">
                  {proCategoryFilter.length > 0 ? (
                    proCategoryFilter[0] +
                    (proCategoryFilter.length > 1
                      ? " + " + (proCategoryFilter.length - 1) + " more"
                      : "")
                  ) : (
                    <span className="text-danger ml-0"></span>
                  )}
                </span>
              </div>

              {openProCategoryOptions &&
                proCategoryOptions.map((item, index) => (
                  <div
                    key={index}
                    className={`${
                      proCategoryFilter.includes(item.type)
                        ? "selected-check-box-option pointer"
                        : "check-box-options pointer"
                    }`}
                    onClick={() => handleToggleProCategory(item.type)}
                  >
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      //style={{ marginRight: 8 }}
                      checked={proCategoryFilter.includes(item.type)}
                    />

                    {item.type}
                  </div>
                ))}

              {/* ########### filter 3 ########### */}

              <div
                className={`property-type-filter pointer position-relative border-top ${
                  openProSubOptions ? "arrow-up" : "arrow-down"
                }`}
                onClick={() => setOpenProSubOptions(!openProSubOptions)}
              >
                <div>Property Sub Type</div>

                <span className="selected">
                  {selectedSubTypeFilter.length > 0 ? (
                    selectedSubTypeFilter[0] +
                    (selectedSubTypeFilter.length > 1
                      ? " + " + (selectedSubTypeFilter.length - 1) + " more"
                      : "")
                  ) : (
                    <span className="text-danger ml-0"></span>
                  )}
                </span>
              </div>

              {openProSubOptions && (
                <div
                  className="sub-pro-type-wrapper"
                  style={{ height: openProSubOptions ? "400px" : "auto" }}
                >
                  {selectedSubTypeFilter.length === 17 ? (
                    <div
                      onClick={() => setSelectedSubTypeFilter([])}
                      className="selected-check-box-option pointer"
                    >
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        //style={{ marginRight: 8 }}
                        checked={true}
                      />
                      {/* <IconMinus width={16} height={16} className="mr-1" stroke={1} /> */}
                      Deselect All
                    </div>
                  ) : (
                    <div
                      onClick={handleAllSubTypes}
                      className="check-box-options pointer"
                    >
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        //style={{ marginRight: 8 }}
                        checked={false}
                      />
                      {/* <IconPlus width={16} height={16} className="mr-1" /> */}
                      Select All
                    </div>
                  )}

                  {propertySubTypeOptions.map((item, index) =>
                    proCategoryFilter.includes(item.parent_type) ||
                    proCategoryFilter.length === 0 ? (
                      <div
                        key={index}
                        className={`${
                          selectedSubTypeFilter.includes(item.type)
                            ? "selected-check-box-option pointer"
                            : "check-box-options pointer"
                        }`}
                        onClick={() => handleProSubTypeToggle(item.type)}
                      >
                        <Checkbox
                          icon={icon}
                          checkedIcon={checkedIcon}
                          //style={{ marginRight: 8 }}
                          checked={selectedSubTypeFilter.includes(item.type)}
                        />

                        {item.type}
                      </div>
                    ) : (
                      <div
                        className={`${
                          selectedSubTypeFilter.includes(item.type)
                            ? "selected-check-box-option blocked-pointer dis-color "
                            : "check-box-options blocked-pointer dis-color"
                        }`}
                        //onClick={() => handleProSubTypeToggle(item.type)}
                      >
                        <Checkbox
                          disabled
                          icon={icon}
                          checkedIcon={checkedIcon}
                          //style={{ marginRight: 8 }}
                          checked={selectedSubTypeFilter.includes(item.type)}
                        />

                        {item.type}
                      </div>
                    )
                  )}
                </div>
              )}

              {/* ########### filter 4 ########### */}
              <div
                className={`property-type-filter pointer position-relative border-top ${
                  openFurnishingOptions ? "arrow-up" : "arrow-down"
                }`}
                onClick={() => setOpenFurnishingOptions(!openFurnishingOptions)}
              >
                <div>Furnishing Status</div>

                <span className="selected">
                  {furnishingStatusFilter.length > 0 ? (
                    furnishingStatusFilter[0] +
                    (furnishingStatusFilter.length > 1
                      ? " + " + (furnishingStatusFilter.length - 1) + " more"
                      : "")
                  ) : (
                    <span className="text-danger ml-0"></span>
                  )}
                </span>
              </div>

              {openFurnishingOptions &&
                furnishingStatusOptions.map((item, index) => (
                  <div
                    key={index}
                    className={`${
                      furnishingStatusFilter.includes(item.type)
                        ? "selected-check-box-option pointer"
                        : "check-box-options pointer"
                    }`}
                    onClick={() => handleToggleFurnishing(item.type)}
                  >
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      //style={{ marginRight: 8 }}
                      checked={furnishingStatusFilter.includes(item.type)}
                    />

                    {item.type}
                  </div>
                ))}

              {/* ########### filter 5 ########### */}

              <div
                className={`property-type-filter pointer position-relative border-top ${
                  openAuthorityOptions ? "arrow-up" : "arrow-down"
                }`}
                onClick={() => setOpenAuthorityOptions(!openAuthorityOptions)}
              >
                <div>Authority Approved</div>

                <span className="selected">
                  {authorityApprovedFilter.length > 0 ? (
                    authorityApprovedFilter[0] +
                    (authorityApprovedFilter.length > 1
                      ? " + " + (authorityApprovedFilter.length - 1) + " more"
                      : "")
                  ) : (
                    <span className="text-danger ml-0"></span>
                  )}
                </span>
              </div>

              {openAuthorityOptions &&
                authorityApprovedOptions.map((item, index) => (
                  <div
                    key={index}
                    className={`${
                      authorityApprovedFilter.includes(item.type)
                        ? "selected-check-box-option pointer"
                        : "check-box-options pointer"
                    }`}
                    onClick={() => handleToggleAuthority(item.type)}
                  >
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      //style={{ marginRight: 8 }}
                      checked={authorityApprovedFilter.includes(item.type)}
                    />

                    {item.type}
                  </div>
                ))}

              {/* ########### filter 6 ########### */}

              <div
                className={`property-type-filter pointer position-relative border-top ${
                  openPossessionOptions ? "arrow-up" : "arrow-down"
                }`}
                onClick={() => setOpenPossessionOptions(!openPossessionOptions)}
              >
                <div>Possession availability</div>

                <span className="selected">
                  {possessionAvailableFilter.length > 0 ? (
                    possessionAvailableFilter[0] +
                    (possessionAvailableFilter.length > 1
                      ? " + " + (possessionAvailableFilter.length - 1) + " more"
                      : "")
                  ) : (
                    <span className="text-danger ml-0"></span>
                  )}
                </span>
              </div>

              {openPossessionOptions &&
                possessionAvailableOptions.map((item, index) => (
                  <div
                    key={index}
                    className={`${
                      possessionAvailableFilter.includes(item.type)
                        ? "selected-check-box-option pointer"
                        : "check-box-options pointer"
                    }`}
                    onClick={() => handleTogglePossession(item.type)}
                  >
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      //style={{ marginRight: 8 }}
                      checked={possessionAvailableFilter.includes(item.type)}
                    />

                    {item.type}
                  </div>
                ))}

              {/* ########### filter 7 ########### */}
              <div
                className={`switch-filter pointer position-relative border-top `}
              >
                <div>Properties With Photos</div>
                <div>
                  <Switch
                    size="small"
                    onClick={() => setProWithPhotos(!proWithPhotos)}
                  />
                </div>
              </div>

              {/* ########### filter 8 ########### */}
              <div
                className={`switch-filter pointer position-relative border-top `}
              >
                <div>Parking Available</div>
                <div>
                  <Switch
                    size="small"
                    onClick={() => setProWithParking(!proWithParking)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-9">
          <div class="listing__header d-flex justify-content-between align-items-center">
            <div class="listing__header--left">
              <p class="results__cout--text">
                Showing {records.length} of {data.length} Results
              </p>
            </div>
            <div class="listing__header--right d-flex align-items-center">
              <div class="recently__select d-flex align-items-center">
                <span class="recently__select--icon">
                  <svg
                    width="14"
                    height="13"
                    viewBox="0 0 14 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M7.42426 9.76048L10.1339 12.6088C10.3985 12.8869 10.8273 12.8869 11.0919 12.6088L13.8016 9.76048C14.0661 9.48239 14.0661 9.03159 13.8016 8.7535C13.537 8.47541 13.1082 8.47541 12.8436 8.7535L11.2903 10.3862V0.712076C11.2903 0.318811 10.987 0 10.6129 0C10.2388 0 9.9355 0.318811 9.9355 0.712076V10.3862L8.38222 8.7535C8.11766 8.47541 7.68881 8.47541 7.42426 8.7535C7.1597 9.03159 7.1597 9.48239 7.42426 9.76048ZM3.86611 0.208562C3.60156 -0.0695178 3.17264 -0.0695178 2.90809 0.208562L0.19841 3.05687C-0.0661366 3.33495 -0.0661366 3.78581 0.19841 4.06389C0.462956 4.34197 0.891881 4.34197 1.15643 4.06389L2.70968 2.43118V12.1053C2.70968 12.4985 3.01297 12.8174 3.3871 12.8174C3.76123 12.8174 4.06452 12.4985 4.06452 12.1053V2.43118L5.6178 4.06389C5.88236 4.34197 6.31121 4.34197 6.57576 4.06389C6.84032 3.78581 6.84032 3.33495 6.57576 3.05687L3.86611 0.208562Z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
                <div class="select">
                <select
        value={sortBy}
        onChange={(e) => {
          setSortBy(e.target.value);
          setOpenSortByOptions(false);
        }}
      >
        <option value="Recent Listed">Recently Listed</option>
        {/* <option value="Newest">Newest</option> */}
        <option value="Most Popular">Most Popular</option>
        {/* <option value="Best Match">Best Match</option>
        <option value="Price Low">Price Low</option>
        <option value="Price High">Price High</option> */}
      </select>
                </div>
              </div>
            </div>
          </div>

          {records?.length > 0 &&
            records.map((item, index) => (
              <PropertyCard item={item} index={index} />
            ))}
        </div>
        {currentPage > 1 && (
          <a className="next-prev-link" href={`/allproperties?page=${parseInt(currentPage) - 1}`}>Prev</a>
        )}
        <PaginationComp Pages={nPages} currentPage={currentPage} />
        {currentPage < 16 && (
          <a className="next-prev-link" href={`/allproperties?page=${parseInt(currentPage) + 1}`}>Next</a>
        )}
      </div>
    </section>
  );
};

export default Test1;
