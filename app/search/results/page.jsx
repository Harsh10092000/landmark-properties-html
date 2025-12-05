"use client";
import PaginationComp from "@/components/propertyListingPage/PaginationComp";
import PropertyCard from "@/components/propertyListingPage/PropertyCard";
import React, { useEffect, useState, Suspense } from "react";
import { Checkbox, Switch } from "@mui/material";
import { IconSquareCheckFilled, IconSquare } from "@tabler/icons-react";
import { useRouter, useSearchParams } from "next/navigation";

const SearchResultsContent = () => {
  const searchParams = useSearchParams();
  const searchVal = searchParams.get("search") || null;
  const proadtype = searchParams.get("proadtype") || null;
  const procat = searchParams.get("procat") || null;
  const page = searchParams.get("page") || 1;

  const [openSortByOptions, setOpenSortByOptions] = useState(false);
  const [sortBy, setSortBy] = useState("Recent Listed");
  const [searchValue1, setSearchValue1] = useState("");
  const [openPropertyAdTypeOptions, setOpenPropertyAdTypeOptions] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [openSuggestions, setOpenSuggestions] = useState(false);
  const [sortedUsers, setSortedUsers] = useState([]);
  const [results, setResults] = useState([]);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(12);
  const [isLoading, setIsLoading] = useState(true);
  
  const icon = <IconSquare fontSize="small" height={20} width={20} />;
  const checkedIcon = <IconSquareCheckFilled fontSize="small" height={20} width={20} />;

  const router = useRouter();

  // Fetch property data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        console.log('Search Results: Starting to fetch property data...');
        const response = await fetch('/api/pro/fetchPropertyData');
        
        console.log('Search Results: Response status:', response.status);
        console.log('Search Results: Response ok:', response.ok);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        console.log('Search Results: Fetched data type:', typeof result);
        
        if (Array.isArray(result)) {
          setData(result);
          setSortedUsers(result);
          setResults(result);
        } else {
          setData([]);
          setSortedUsers([]);
          setResults([]);
        }
      } catch (error) {
        console.error('Search Results: Error fetching data:', error);
        setData([]);
        setSortedUsers([]);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);


  // reflect url page param
  useEffect(() => {
    setCurrentPage(parseInt(page));
  }, [page]);

  const [propertyAdTypeFilter, setPropertyAdTypeFilter] = useState("All Properties");
  const [furnishingStatusFilter, setFurnishingStatusFilter] = useState([]);
  const [openFurnishingOptions, setOpenFurnishingOptions] = useState(false);
  const [possessionAvailableFilter, setPossessionAvailableFilter] = useState([]);
  const [openPossessionOptions, setOpenPossessionOptions] = useState(false);
  const [authorityApprovedFilter, setAuthorityApprovedFilter] = useState([]);
  const [openAuthorityOptions, setOpenAuthorityOptions] = useState(false);
  const [proCategoryFilter, setProCategoryFilter] = useState(["Residential", "Commercial", "Land"]);
  const [openProCategoryOptions, setOpenProCategoryOptions] = useState(false);
  const [proWithPhotos, setProWithPhotos] = useState(false);
  const [proWithParking, setProWithParking] = useState(false);
  const [selectedSubTypeFilter, setSelectedSubTypeFilter] = useState([]);
  const [openProSubOptions, setOpenProSubOptions] = useState(false);

  // options
  const propertyAdTypeOptions = [
    { type: "All Properties" },
    { type: "Sale" },
    { type: "Rent" },
  ];
  const furnishingStatusOptions = [
    { type: "Fully Furnished" },
    { type: "Semi Furnished" },
    { type: "Unfurnished" },
  ];
  const possessionAvailableOptions = [
    { type: "Immediate" },
    { type: "0-3 Month" },
    { type: "3-6 Month" },
    { type: "After 6 Months" },
  ];
  const authorityApprovedOptions = [
    { type: "HSVP" },
    { type: "MC" },
    { type: "DTP" },
    { type: "Other" },
  ];
  const proCategoryOptions = [
    { type: "Residential" },
    { type: "Commercial" },
    { type: "Land" },
  ];
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

  // url param -> filters
  useEffect(() => {
    if (searchVal != null) {
      setSearchValue(searchVal);
      if (procat === "All Properties") {
        setProCategoryFilter(["Residential", "Commercial", "Land"]);
      } else if (procat) {
        setProCategoryFilter([procat]);
      }
      if (proadtype) setPropertyAdTypeFilter(proadtype);
    }
  }, [searchVal, proadtype, procat]);

  // suggestions
  useEffect(() => {
    const unique1 = Array.from(new Set(data?.slice(0, 60).map((i) => (i.pro_city || "").trim())));
    const uniqueState = Array.from(new Set(data?.slice(0, 60).map((i) => (i.pro_state || "").trim())));
    const unique2 = Array.from(new Set(data?.slice(0, 60).map((i) => ((i.pro_sub_district ? i.pro_sub_district.trim() + ", " : "") + (i.pro_city || "").trim()))));
    const unique3 = Array.from(new Set(data?.slice(0, 60).map((i) => ((i.pro_locality ? i.pro_locality.trim() + ", " : "") + (i.pro_sub_district ? i.pro_sub_district.trim() + ", " : "") + (i.pro_city || "").trim()))));
    const arr = [...unique1, ...uniqueState, ...unique2, ...unique3, searchValue];
    const unique4 = Array.from(new Set(arr.slice(0, 200).map((item) => (item || "").trim())));
    const unique = unique4.filter((i) => i.toLowerCase().startsWith((searchValue || "").toLowerCase()));
    if (searchValue === "") setOpenSuggestions(false);
    setSuggestions(unique);
  }, [searchValue, data]);

  // handlers
  // const updateUrlToFirstPage = () => {
  //   const newUrl = `/search/results?page=1&search=${encodeURIComponent(searchValue)}&proadtype=${encodeURIComponent(propertyAdTypeFilter)}&procat=${encodeURIComponent(proCategoryFilter.join(','))}`;
  //   router.push(newUrl);
  //   setCurrentPage(1);
  // };

  const handleSearch = () => {
    setOpenSuggestions(false);
    setSearchValue1(searchValue);
    updateUrlToFirstPage();
  };

  const handleProSubTypeToggle = (type) => {
    if (selectedSubTypeFilter.includes(type)) {
      setSelectedSubTypeFilter(selectedSubTypeFilter.filter((item) => item !== type));
    } else {
      setSelectedSubTypeFilter([...selectedSubTypeFilter, type]);
    }
    updateUrlToFirstPage();
  };

  const handleAllSubTypes = () => {
    setSelectedSubTypeFilter((prev) => {
      const all = propertySubTypeOptions.map((p) => p.type);
      const updated = all.filter((t) => !prev.includes(t));
      return [...prev, ...updated];
    });
    updateUrlToFirstPage();
  };

  const handleToggleFurnishing = (type) => {
    if (furnishingStatusFilter.includes(type)) {
      setFurnishingStatusFilter(furnishingStatusFilter.filter((i) => i !== type));
    } else {
      setFurnishingStatusFilter([...furnishingStatusFilter, type]);
    }
    updateUrlToFirstPage();
  };

  const handleToggleAuthority = (type) => {
    if (authorityApprovedFilter.includes(type)) {
      setAuthorityApprovedFilter(authorityApprovedFilter.filter((i) => i !== type));
    } else {
      setAuthorityApprovedFilter([...authorityApprovedFilter, type]);
    }
    updateUrlToFirstPage();
  };

  const handleTogglePossession = (type) => {
    if (possessionAvailableFilter.includes(type)) {
      setPossessionAvailableFilter(possessionAvailableFilter.filter((i) => i !== type));
    } else {
      setPossessionAvailableFilter([...possessionAvailableFilter, type]);
    }
    updateUrlToFirstPage();
  };

  const handleToggleProCategory = (type) => {
    if (proCategoryFilter.includes(type)) {
      setProCategoryFilter(proCategoryFilter.filter((i) => i !== type));
    } else {
      setProCategoryFilter([...proCategoryFilter, type]);
    }
    updateUrlToFirstPage();
  };

  // main filtering effect
  useEffect(() => {
    const searchWords = (searchValue1 || "").toLowerCase().split(",").filter(Boolean);
    let filtered = [...sortedUsers];

    if (proWithPhotos) {
      // Check if property has cover image or other images
      filtered = filtered.filter((i) => {
        const hasCover = i.pro_cover_image && i.pro_cover_image.trim() !== "";
        let hasOtherImages = false;
        if (i.pro_other_images) {
          if (Array.isArray(i.pro_other_images) && i.pro_other_images.length > 0) {
            hasOtherImages = true;
          } else if (typeof i.pro_other_images === 'string') {
            try {
              const parsed = JSON.parse(i.pro_other_images);
              if (Array.isArray(parsed) && parsed.length > 0) {
                hasOtherImages = true;
              }
            } catch {
              const images = i.pro_other_images.split(',').map(img => img.trim()).filter(Boolean);
              if (images.length > 0) {
                hasOtherImages = true;
              }
            }
          }
        }
        return hasCover || hasOtherImages;
      });
    }
    if (proWithParking) {
      filtered = filtered.filter((i) => Number(i.pro_parking) > 0);
    }

    if (propertyAdTypeFilter === "Sale") {
      filtered = filtered.filter((i) => i.pro_ad_type === "Sale");
    } else if (propertyAdTypeFilter === "Rent") {
      filtered = filtered.filter((i) => i.pro_ad_type === "Rent");
    }

    if (furnishingStatusFilter.length > 0) {
      filtered = filtered.filter((i) => furnishingStatusFilter.includes(i.pro_furnishing));
    }
    if (proCategoryFilter.length > 0) {
      filtered = filtered.filter((i) => proCategoryFilter.includes(i.pro_type));
    }
    if (selectedSubTypeFilter.length > 0) {
      filtered = filtered.filter((i) => selectedSubTypeFilter.includes((i.pro_sub_cat || '').split(',')[0]));
    }
    if (authorityApprovedFilter.length > 0) {
      filtered = filtered.filter((i) => authorityApprovedFilter.includes(i.pro_approval));
    }
    if (possessionAvailableFilter.length > 0) {
      filtered = filtered.filter((i) => possessionAvailableFilter.includes(i.pro_possession));
    }

    if (searchWords.length > 0) {
      filtered = filtered.filter((i) => {
        const itemValues = `${i.pro_locality || ''} ${i.pro_city || ''} ${i.pro_sub_district || ''} ${i.pro_street || ''} ${i.pro_state || ''}`.toLowerCase();
        return searchWords.every((w) => itemValues.includes(w));
      });
    }

    // sort
    if (sortBy === "Recent Listed") {
      filtered.sort((a, b) => Number(b.pro_id) - Number(a.pro_id));
    } else if (sortBy === "Most Popular") {
      filtered.sort((a, b) => Number(b.pro_views) - Number(a.pro_views));
    }

    setResults(filtered);
  }, [sortedUsers, sortBy, searchValue1, propertyAdTypeFilter, furnishingStatusFilter, proCategoryFilter, selectedSubTypeFilter, possessionAvailableFilter, authorityApprovedFilter, proWithPhotos, proWithParking]);

  const lastIndex = currentPage * recordsPerPage;
  let firstIndex = lastIndex - recordsPerPage;
  const records = results?.slice(firstIndex, lastIndex);
  const nPages = Math.ceil((results?.length || 0) / recordsPerPage);

  return (
    <section className="listing__page--section section--padding">
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <div className="widget__search mb-30">
              <div className="widget__search--input position-relative">
                <input
                  placeholder="Search for a property"
                  value={searchValue}
                  onChange={(e) => { setSearchValue(e.target.value); setOpenSuggestions(true); }}
                  className="widget__search--input__field"
                  type="text"
                />
                <button onClick={handleSearch} className="widget__search--btn">
                  <svg width="16" height="17" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.10714 9.54464C9.89286 8.75893 10.2857 7.81548 10.2857 6.71429C10.2857 5.61309 9.89286 4.67262 9.10714 3.89286C8.32738 3.10714 7.38691 2.71428 6.28571 2.71428C5.18452 2.71428 4.24107 3.10714 3.45536 3.89286C2.6756 4.67262 2.28571 5.61309 2.28571 6.71429C2.28571 7.81548 2.6756 8.75893 3.45536 9.54464C4.24107 10.3244 5.18452 10.7143 6.28571 10.7143C7.38691 10.7143 8.32738 10.3244 9.10714 9.54464ZM14.8571 14.1429C14.8571 14.4524 14.744 14.7202 14.5179 14.9464C14.2917 15.1726 14.0238 15.2857 13.7143 15.2857C13.3929 15.2857 13.125 15.1726 12.9107 14.9464L9.84822 11.8929C8.78274 12.631 7.59524 13 6.28571 13C5.43452 13 4.61905 12.8363 3.83929 12.5089C3.06548 12.1756 2.39583 11.7292 1.83036 11.1696C1.27083 10.6042 0.824405 9.93452 0.491071 9.16071C0.16369 8.38095 0 7.56548 0 6.71429C0 5.86309 0.16369 5.05059 0.491071 4.27678C0.824405 3.49702 1.27083 2.82738 1.83036 2.26786C2.39583 1.70238 3.06548 1.25595 3.83929 0.928571C4.61905 0.595237 5.43452 0.428571 6.28571 0.428571C7.13691 0.428571 7.94941 0.595237 8.72322 0.928571C9.50298 1.25595 10.1726 1.70238 10.7321 2.26786C11.2976 2.82738 11.744 3.49702 12.0714 4.27678C12.4048 5.05059 12.5714 5.86309 12.5714 6.71429C12.5714 8.02381 12.2024 9.21131 11.4643 10.2768L14.5268 13.3393C14.747 13.5595 14.8571 13.8274 14.8571 14.1429Z" fill="currentColor"/></svg>
                </button>
                {openSuggestions && (
                  <div className="search-suggestions-2 pt-2 shadow pb-2">
                    {suggestions?.map((item, index) => (
                      <div key={index} className="py-2 pl-2 suggesion-item-2 pointer" onClick={() => { setSearchValue(item); setOpenSuggestions(false); }}>
                        {item}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="listing__widget--inner">
              <div className="widget__list mb-30">
                <div className={`property-type-filter pointer position-relative ${openPropertyAdTypeOptions ? "arrow-up" : "arrow-down"}`} onClick={() => setOpenPropertyAdTypeOptions(!openPropertyAdTypeOptions)}>
                  <div>Purchase Type</div>
                  <span className="selected">{propertyAdTypeFilter}</span>
                </div>
                {openPropertyAdTypeOptions && propertyAdTypeOptions.map((item, index) => (
                  <div key={index} className={`${propertyAdTypeFilter === item.type ? "selected-option pointer" : "options pointer"}`} onClick={() => { setPropertyAdTypeFilter(item.type); updateUrlToFirstPage(); }}>
                    {item.type}
                  </div>
                ))}

                <div className={`property-type-filter pointer position-relative border-top ${openProCategoryOptions ? "arrow-up" : "arrow-down"}`} onClick={() => setOpenProCategoryOptions(!openProCategoryOptions)}>
                  <div>Property Types</div>
                  <span className="selected">{proCategoryFilter.length > 0 ? (proCategoryFilter[0] + (proCategoryFilter.length > 1 ? " + " + (proCategoryFilter.length - 1) + " more" : "")) : (<span className="text-danger ml-0"></span>)}</span>
                </div>
                {openProCategoryOptions && proCategoryOptions.map((item, index) => (
                  <div key={index} className={`${proCategoryFilter.includes(item.type) ? "selected-check-box-option pointer" : "check-box-options pointer"}`} onClick={() => handleToggleProCategory(item.type)}>
                    <Checkbox icon={icon} checkedIcon={checkedIcon} checked={proCategoryFilter.includes(item.type)} />
                    {item.type}
                  </div>
                ))}

                <div className={`property-type-filter pointer position-relative border-top ${openProSubOptions ? "arrow-up" : "arrow-down"}`} onClick={() => setOpenProSubOptions(!openProSubOptions)}>
                  <div>Property Sub Type</div>
                  <span className="selected">{selectedSubTypeFilter.length > 0 ? (selectedSubTypeFilter[0] + (selectedSubTypeFilter.length > 1 ? " + " + (selectedSubTypeFilter.length - 1) + " more" : "")) : (<span className="text-danger ml-0"></span>)}</span>
                </div>
                {openProSubOptions && (
                  <div className="sub-pro-type-wrapper" style={{ height: openProSubOptions ? "400px" : "auto" }}>
                    {selectedSubTypeFilter.length === propertySubTypeOptions.length ? (
                      <div onClick={() => setSelectedSubTypeFilter([])} className="selected-check-box-option pointer">
                        <Checkbox icon={icon} checkedIcon={checkedIcon} checked={true} />
                        Deselect All
                      </div>
                    ) : (
                      <div onClick={handleAllSubTypes} className="check-box-options pointer">
                        <Checkbox icon={icon} checkedIcon={checkedIcon} checked={false} />
                        Select All
                      </div>
                    )}
                    {propertySubTypeOptions.map((item, index) => (
                      proCategoryFilter.includes(item.parent_type) || proCategoryFilter.length === 0 ? (
                        <div key={index} className={`${selectedSubTypeFilter.includes(item.type) ? "selected-check-box-option pointer" : "check-box-options pointer"}`} onClick={() => handleProSubTypeToggle(item.type)}>
                          <Checkbox icon={icon} checkedIcon={checkedIcon} checked={selectedSubTypeFilter.includes(item.type)} />
                          {item.type}
                        </div>
                      ) : (
                        <div key={index} className={`${selectedSubTypeFilter.includes(item.type) ? "selected-check-box-option blocked-pointer dis-color " : "check-box-options blocked-pointer dis-color"}`}>
                          <Checkbox disabled icon={icon} checkedIcon={checkedIcon} checked={selectedSubTypeFilter.includes(item.type)} />
                          {item.type}
                        </div>
                      )
                    ))}
                  </div>
                )}

                <div className={`property-type-filter pointer position-relative border-top ${openFurnishingOptions ? "arrow-up" : "arrow-down"}`} onClick={() => setOpenFurnishingOptions(!openFurnishingOptions)}>
                  <div>Furnishing Status</div>
                  <span className="selected">{furnishingStatusFilter.length > 0 ? (furnishingStatusFilter[0] + (furnishingStatusFilter.length > 1 ? " + " + (furnishingStatusFilter.length - 1) + " more" : "")) : (<span className="text-danger ml-0"></span>)}</span>
                </div>
                {openFurnishingOptions && furnishingStatusOptions.map((item, index) => (
                  <div key={index} className={`${furnishingStatusFilter.includes(item.type) ? "selected-check-box-option pointer" : "check-box-options pointer"}`} onClick={() => handleToggleFurnishing(item.type)}>
                    <Checkbox icon={icon} checkedIcon={checkedIcon} checked={furnishingStatusFilter.includes(item.type)} />
                    {item.type}
                  </div>
                ))}

                <div className={`property-type-filter pointer position-relative border-top ${openAuthorityOptions ? "arrow-up" : "arrow-down"}`} onClick={() => setOpenAuthorityOptions(!openAuthorityOptions)}>
                  <div>Authority Approved</div>
                  <span className="selected">{authorityApprovedFilter.length > 0 ? (authorityApprovedFilter[0] + (authorityApprovedFilter.length > 1 ? " + " + (authorityApprovedFilter.length - 1) + " more" : "")) : (<span className="text-danger ml-0"></span>)}</span>
                </div>
                {openAuthorityOptions && authorityApprovedOptions.map((item, index) => (
                  <div key={index} className={`${authorityApprovedFilter.includes(item.type) ? "selected-check-box-option pointer" : "check-box-options pointer"}`} onClick={() => handleToggleAuthority(item.type)}>
                    <Checkbox icon={icon} checkedIcon={checkedIcon} checked={authorityApprovedFilter.includes(item.type)} />
                    {item.type}
                  </div>
                ))}

                <div className={`property-type-filter pointer position-relative border-top ${openPossessionOptions ? "arrow-up" : "arrow-down"}`} onClick={() => setOpenPossessionOptions(!openPossessionOptions)}>
                  <div>Possession availability</div>
                  <span className="selected">{possessionAvailableFilter.length > 0 ? (possessionAvailableFilter[0] + (possessionAvailableFilter.length > 1 ? " + " + (possessionAvailableFilter.length - 1) + " more" : "")) : (<span className="text-danger ml-0"></span>)}</span>
                </div>
                {openPossessionOptions && possessionAvailableOptions.map((item, index) => (
                  <div key={index} className={`${possessionAvailableFilter.includes(item.type) ? "selected-check-box-option pointer" : "check-box-options pointer"}`} onClick={() => handleTogglePossession(item.type)}>
                    <Checkbox icon={icon} checkedIcon={checkedIcon} checked={possessionAvailableFilter.includes(item.type)} />
                    {item.type}
                  </div>
                ))}

                <div className="switch-filter pointer position-relative border-top">
                  <div>Properties With Photos</div>
                  <div>
                    <Switch size="small" onClick={() => { setProWithPhotos(!proWithPhotos); updateUrlToFirstPage(); }} />
                  </div>
                </div>

                <div className="switch-filter pointer position-relative border-top">
                  <div>Parking Available</div>
                  <div>
                    <Switch size="small" onClick={() => { setProWithParking(!proWithParking); updateUrlToFirstPage(); }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-9">
            <div className="listing__header d-flex justify-content-between align-items-center">
              <div className="listing__header--left">
                <p className="results__cout--text">
                  {isLoading ? 'Loading...' : `Showing ${records?.length || 0} of ${results?.length || 0} Results`}
                </p>
              </div>
              <div className="listing__header--right d-flex align-items-center">
                <div className="recently__select d-flex align-items-center">
                  <span className="recently__select--icon">
                    <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M7.42426 9.76048L10.1339 12.6088C10.3985 12.8869 10.8273 12.8869 11.0919 12.6088L13.8016 9.76048C14.0661 9.48239 14.0661 9.03159 13.8016 8.7535C13.537 8.47541 13.1082 8.47541 12.8436 8.7535L11.2903 10.3862V0.712076C11.2903 0.318811 10.987 0 10.6129 0C10.2388 0 9.9355 0.318811 9.9355 0.712076V10.3862L8.38222 8.7535C8.11766 8.47541 7.68881 8.47541 7.42426 8.7535C7.1597 9.03159 7.1597 9.48239 7.42426 9.76048ZM3.86611 0.208562C3.60156 -0.0695178 3.17264 -0.0695178 2.90809 0.208562L0.19841 3.05687C-0.0661366 3.33495 -0.0661366 3.78581 0.19841 4.06389C0.462956 4.34197 0.891881 4.34197 1.15643 4.06389L2.70968 2.43118V12.1053C2.70968 12.4985 3.01297 12.8174 3.3871 12.8174C3.76123 12.8174 4.06452 12.4985 4.06452 12.1053V2.43118L5.6178 4.06389C5.88236 4.34197 6.31121 4.34197 6.57576 4.06389C6.84032 3.78581 6.84032 3.33495 6.57576 3.05687L3.86611 0.208562Z" fill="currentColor"/></svg>
                  </span>
                  <div className="select">
                    <select value={sortBy} onChange={(e) => { setSortBy(e.target.value); }} disabled={isLoading}>
                      <option value="Recent Listed">Recently Listed</option>
                      <option value="Most Popular">Most Popular</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {isLoading ? (
              <div className="text-center py-5">
                <h4>Loading properties...</h4>
                <p>Please wait while we fetch the data.</p>
              </div>
            ) : records?.length > 0 ? (
              records.map((item, index) => (
                <PropertyCard key={index} item={item} index={index} currentUser="" />
              ))
            ) : (
              <div className="text-center py-5">
                <h4>No properties found</h4>
                <p>Try adjusting your search criteria</p>
                <div className="mt-3 p-3 bg-light rounded">
                  <small className="text-muted">Debug Info: Data count: {data?.length || 0}, Results: {results?.length || 0}, Records: {records?.length || 0}</small>
                </div>
              </div>
            )}

            {results?.length > 0 && (
              <div className="row mt-4">
                <div className="col-12">
                  {currentPage > 1 && (
                    <a className="next-prev-link" href={`/search/results?page=${parseInt(currentPage) - 1}&search=${searchValue}&proadtype=${propertyAdTypeFilter}&procat=${proCategoryFilter.join(',')}`}>Prev</a>
                  )}
                  <PaginationComp Pages={nPages} currentPage={currentPage} />
                  {currentPage < nPages && (
                    <a className="next-prev-link" href={`/search/results?page=${parseInt(currentPage) + 1}&search=${searchValue}&proadtype=${propertyAdTypeFilter}&procat=${proCategoryFilter.join(',')}`}>Next</a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const SearchResultsPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchResultsContent />
    </Suspense>
  );
};

export default SearchResultsPage;
