"use client";
import React, { useState, useEffect, useMemo } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import RequiredLogin from "@/components/common/RequiredLogin";
import Loading from "@/components/common/Loading";
import Error from "@/components/common/Error";
import Step6 from "@/components/addProperty/step6";
import { haryanaCities } from '@/components/addProperty/city.jsx';
import { getSubDistrictsByCity } from '@/components/addProperty/subdistrict.jsx';
import "@/components/addProperty/step-form.css";

const GREEN = "#1dbf73";
const BLUE = "#ec161e";
const GRAY = "#e0e0e0";
const DARK_GRAY = "#b0b0b0";
const BG_GRADIENT = "linear-gradient(135deg, #f7faff 60%, #eaf1fa 100%)";

// Data from step1.jsx
const adTypes = [
  { label: "Sale", icon: "🟢" },
  { label: "Rent", icon: "🔴" },
];
const userTypes = [
  { label: "Broker", icon: "🧑‍💼" },
  { label: "Owner", icon: "👤" },
];
const proTypes = [
  { value: "Residential", icon: "🏠" },
  { value: "Land", icon: "🌱" },
  { value: "Commercial", icon: "🏢" },
];
const proResSubTypes = [
  { value: "Apartment,Residential", item: "Apartment" },
  { value: "Independent House,Residential", item: "Independent House" },
  { value: "Builder Floor,Residential", item: "Builder Floor" },
  { value: "Farm House,Residential", item: "Farm House" },
  { value: "Raw House,Residential", item: "Raw House" },
  { value: "Retirement Community,Residential", item: "Retirement Community" },
  { value: "Studio Apartment,Residential", item: "Studio Apartment" },
  { value: "RK,Residential", item: "RK" },
];
const proLandSubTypes = [
  { value: "Residential Land,Land", item: "Residential Land" },
  { value: "Commercial Land,Land", item: "Commercial Land" },
  { value: "Industrial Land,Land", item: "Industrial Land" },
  { value: "Agricultural Land,Land", item: "Agricultural Land" },
  { value: "Farm House Land,Land", item: "Farm House Land"},
  { value: "Institutional Land,Land", item: "Institutional Land" },
];
const proCommercialSubTypes = [
  { value: "Retail Showroom,Commercial", item: "Retail Showroom" },
  { value: "Commercial Building,Commercial", item: "Commercial Building" },
  { value: "Office Complex,Commercial", item: "Office Complex" },
  { value: "Software Technology Park,Commercial", item: "Software Technology Park" },
  { value: "Warehouse,Commercial", item: "Warehouse" },
  { value: "Industrial Estate,Commercial", item: "Industrial Estate" },
  { value: "Institutional Building,Commercial", item: "Institutional Building" },
  { value: "Petrol Pump,Commercial", item: "Petrol Pump" },
  { value: "Cold Store,Commercial", item: "Cold Store" },
];

// Data from step3.jsx
const propertyFacing = [
  { value: "North" },
  { value: "North-East" },
  { value: "East" },
  { value: "South-East" },
  { value: "South" },
  { value: "South-West" },
  { value: "West" },
  { value: "North-West" },
];

const ownershipOptions = ["Ownership", "Power of Attorney"];
const otherRoomsOptions = ["Puja Room", "Store Room", "Study Room"];

export default function QuickListingPage() {
  return <QuickListingContent />;
}

function QuickListingContent() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formSubmit, setFormSubmit] = useState(false);
  const [description, setDescription] = useState("");
  const [pendingFormData, setPendingFormData] = useState(null);
  const [autoSubmitAfterLogin, setAutoSubmitAfterLogin] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [successData, setSuccessData] = useState(null);
  
  // Form states
  const [adType, setAdType] = useState("Sale");
  const [userType, setUserType] = useState("Owner");
  const [propertyType, setPropertyType] = useState("Residential");
  const [propertySubType, setPropertySubType] = useState("");
  const [amount, setAmount] = useState("");
  const [areaSize, setAreaSize] = useState("");
  const [areaUnit, setAreaUnit] = useState("Marla");
  const [state, setState] = useState("Haryana");
  const [city, setCity] = useState("");
  const [subDistrict, setSubDistrict] = useState("");
  const [locality, setLocality] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [facing, setFacing] = useState("");
  const [ownership, setOwnership] = useState("");
  const [otherRooms, setOtherRooms] = useState([]);
  const [negotiable, setNegotiable] = useState(true);
  const [rented, setRented] = useState(false);
  const [corner, setCorner] = useState(false);
  const [coverImage, setCoverImage] = useState(null);
  const [otherImages, setOtherImages] = useState([]);

  // Location autocomplete states
  const [citySearch, setCitySearch] = useState("");
  const [subDistrictSearch, setSubDistrictSearch] = useState("");
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [showSubDistrictDropdown, setShowSubDistrictDropdown] = useState(false);
  const [filteredCities, setFilteredCities] = useState([]);
  const [filteredSubDistricts, setFilteredSubDistricts] = useState([]);
  const [availableSubDistricts, setAvailableSubDistricts] = useState([]);
  const [errors, setErrors] = useState({});

  // Price formatting function
  const priceFormat = (val) => {
    if (!val) return "e.g. ₹ 10,00,000";
    let num = parseInt(val.toString().replace(/[^0-9]/g, ""));
    if (!num) return "e.g. ₹ 10,00,000";

    // Format in Indian currency style
    const formatted = num.toLocaleString('en-IN');

    // Add denomination
    let denomination = '';
    if (num >= 10000000) {
      denomination = ` (${(num / 10000000).toFixed(2)} Crore)`;
    } else if (num >= 100000) {
      denomination = ` (${(num / 100000).toFixed(2)} Lac)`;
    } else if (num >= 1000) {
      denomination = ` (${(num / 1000).toFixed(2)} Thousand)`;
    }

    return `₹ ${formatted}${denomination}`;
  };

  // Generate description based on form data
  const generateDescription = useMemo(() => {
    const type = propertySubType || propertyType || "Property";
    const area = areaSize || "";
    const areaUnitText = areaUnit || "";
    const locationText = [subDistrict, city, state].filter(Boolean).join(", ");
    const price = amount ? priceFormat(amount) : "";

    let desc = "";
    
    if (type.includes("Apartment")) {
      desc = `Looking for apartments for ${adType === "Rent" ? "rent" : "sale"} in ${locationText || "Haryana"}? Discover this exceptional apartment${area ? ` spanning ${area} ${areaUnitText}` : ''}${locationText ? ` in the prime location of ${locationText}` : ''}. This modern apartment offers the perfect blend of comfort, convenience, and contemporary living. Designed with an open floor plan, the interiors are bright and airy, with large windows that fill every corner with natural light throughout the day. The layout ensures maximum space utilization and a smooth flow between rooms. The home is finished with modern fittings, premium flooring, and thoughtful details that elevate everyday living. Whether you are a family looking for comfort or a working professional seeking connectivity, this apartment offers an ideal lifestyle. ${price ? `Currently available for ${adType === "Rent" ? "rent" : "sale"} at ${price}. ` : ''}This is an excellent opportunity to own${adType === "Rent" ? " or rent" : ""} a well-connected, spacious home in ${locationText || "Haryana"}. Contact us today to schedule a site visit and make this premium apartment yours!`;
    } else if (type.includes("Independent House")) {
      desc = `Searching for independent houses for ${adType === "Rent" ? "rent" : "sale"} in ${locationText || "Haryana"}? This stunning independent house${area ? ` of ${area} ${areaUnitText}` : ''}${locationText ? ` in the prestigious area of ${locationText}` : ''} is a true architectural masterpiece. The open layout is perfect for family gatherings and entertaining, with large windows that bring in natural light to every room. The design balances functionality with elegance, ensuring a lifestyle that is both practical and luxurious. Built with premium construction standards, this home offers timeless appeal. ${price ? `Available now for ${adType === "Rent" ? "rent" : "sale"} at ${price}. ` : ''}If you are seeking a well-connected, spacious, and comfortable independent house in ${locationText || "Haryana"}, this property is an excellent choice. Schedule a visit today and experience the grandeur of this home for yourself!`;
    } else if (type.includes("Residential Land")) {
      desc = `Find residential land for ${adType === "Rent" ? "rent" : "sale"} in ${locationText || "Haryana"}. This prime residential plot${area ? ` of ${area} ${areaUnitText}` : ''}${locationText ? ` located in the developing area of ${locationText}` : ''} is a great choice for building your dream home. The location ensures excellent connectivity, making it a promising investment for the future. The plot is well-drained, ready for construction, and offers flexibility for various architectural designs. ${price ? `Offered for ${adType === "Rent" ? "rent" : "sale"} at ${price}. ` : ''}Secure your piece of land in ${locationText || "Haryana"} today and turn it into the home you've always envisioned. This is an opportunity you should not miss!`;
    } else if (type.includes("Commercial Land")) {
      desc = `Search for commercial land for ${adType === "Rent" ? "rent" : "sale"} in ${locationText || "Haryana"}. This commercial plot${area ? ` of ${area} ${areaUnitText}` : ''}${locationText ? ` located in the prime commercial hub of ${locationText}` : ''} is an excellent choice for business growth. With high visibility and accessibility, it is ideal for setting up offices, retail stores, restaurants, or other commercial establishments. The location guarantees strong foot traffic and business potential. ${price ? `Available now for ${adType === "Rent" ? "rent" : "sale"} at ${price}. ` : ''}Don't miss this opportunity to establish or expand your business in ${locationText || "Haryana"}. This land offers long-term commercial growth potential!`;
    } else {
      desc = `Search for properties for ${adType === "Rent" ? "rent" : "sale"} in ${locationText || "Haryana"}. This property${type ? ` (${type})` : ''}${area ? ` of ${area} ${areaUnitText}` : ''}${locationText ? ` located in ${locationText}` : ''} offers excellent potential. It can serve a variety of purposes depending on your needs. ${price ? `Available for ${adType === "Rent" ? "rent" : "sale"} at ${price}. ` : ''}Don't miss this chance to secure a valuable property in ${locationText || "Haryana"}. Contact us today for more information and a site visit!`;
    }

    return desc.replace(/\s+/g, ' ').trim();
  }, [propertySubType, propertyType, areaSize, areaUnit, subDistrict, city, state, amount, adType]);

  // Auto-generate description when form fields change
  useEffect(() => {
    if (generateDescription && !description) {
      setDescription(generateDescription);
    }
  }, [generateDescription, description]);

  // Price formatting function (from step5.jsx)
 

  // Handle auto-submit after login
  useEffect(() => {
    if (session && autoSubmitAfterLogin && pendingFormData) {
      // User logged in and we have pending form data, auto-submit
      submitFormData(pendingFormData);
      setAutoSubmitAfterLogin(false);
      setPendingFormData(null);
    }
  }, [session, autoSubmitAfterLogin, pendingFormData]);

  // Update sub-districts when city changes
  useEffect(() => {
    if (city) {
      const subDistricts = getSubDistrictsByCity(city);
      setAvailableSubDistricts(subDistricts);
      setFilteredSubDistricts(subDistricts);
      if (!subDistricts.includes(subDistrict)) {
        setSubDistrict("");
        setSubDistrictSearch("");
      }
    } else {
      setAvailableSubDistricts([]);
      setFilteredSubDistricts([]);
      setSubDistrict("");
      setSubDistrictSearch("");
    }
  }, [city, subDistrict]);

  // Filter cities based on search
  useEffect(() => {
    if (citySearch.trim() === "") {
      setFilteredCities(haryanaCities);
    } else {
      const filtered = haryanaCities.filter(city => 
        city.name.toLowerCase().includes(citySearch.toLowerCase())
      );
      setFilteredCities(filtered);
    }
  }, [citySearch]);

  // Filter sub-districts based on search
  useEffect(() => {
    if (subDistrictSearch.trim() === "") {
      setFilteredSubDistricts(availableSubDistricts);
    } else {
      const filtered = availableSubDistricts.filter(district => 
        district.toLowerCase().includes(subDistrictSearch.toLowerCase())
      );
      setFilteredSubDistricts(filtered);
    }
  }, [subDistrictSearch, availableSubDistricts]);

  if (status === "loading") {
    return <Loading />;
  }

  if (status === "error") {
    return <Error message="Authentication error. Please try again." />;
  }

  let subTypes = [];
  if (propertyType === "Residential") subTypes = proResSubTypes;
  else if (propertyType === "Land") subTypes = proLandSubTypes;
  else if (propertyType === "Commercial") subTypes = proCommercialSubTypes;

  const handleCitySelect = (selectedCity) => {
    setCity(selectedCity);
    setCitySearch(selectedCity);
    setShowCityDropdown(false);
    setSubDistrict("");
    setSubDistrictSearch("");
    if (errors.city) {
      setErrors(prev => ({ ...prev, city: "" }));
    }
  };

  const handleSubDistrictSelect = (selectedDistrict) => {
    setSubDistrict(selectedDistrict);
    setSubDistrictSearch(selectedDistrict);
    setShowSubDistrictDropdown(false);
    if (errors.subDistrict) {
      setErrors(prev => ({ ...prev, subDistrict: "" }));
    }
  };

  const handleCityInputChange = (e) => {
    const value = e.target.value;
    setCitySearch(value);
    setCity(value);
    setShowCityDropdown(true);
    if (errors.city) {
      setErrors(prev => ({ ...prev, city: "" }));
    }
  };

  const handleSubDistrictInputChange = (e) => {
    const value = e.target.value;
    setSubDistrictSearch(value);
    setShowSubDistrictDropdown(true);
    if (errors.subDistrict) {
      setErrors(prev => ({ ...prev, subDistrict: "" }));
    }
  };

  const handleMultiSelect = (arr, setArr, val) => {
    if (arr.includes(val)) {
      setArr(arr.filter((v) => v !== val));
    } else {
      setArr([...arr, val]);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!adType) newErrors.adType = "Ad Type is required";
    if (!userType) newErrors.userType = "User Type is required";
    if (!propertyType) newErrors.propertyType = "Property Type is required";
    if (!propertySubType) newErrors.propertySubType = "Property Sub Type is required";
    if (!amount) newErrors.amount = "Expected Amount is required";
    if (!areaSize) newErrors.areaSize = "Area Plot Size is required";
    if (!locality.trim()) newErrors.locality = "Locality is required";
    if (!city.trim()) newErrors.city = "City is required";
    if (!subDistrict.trim()) newErrors.subDistrict = "Sub District is required";
    if (!pinCode.trim()) newErrors.pinCode = "Pin Code is required";
    else if (!/^[1-9][0-9]{5}$/.test(pinCode)) newErrors.pinCode = "Please enter a valid 6-digit pin code";
    if (!description.trim()) newErrors.description = "Property Description is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Function to submit form data
  const submitFormData = async (formData) => {
    setLoading(true);
    try {
      // Generate listing ID
      const listingId = Date.now().toString();
      
      // Create property URL
      const sanitize = (input) => input.toLowerCase().replace(/[\s.,]+/g, "-");
      const url = sanitize(formData.areaSize) + "-" + 
                  sanitize(formData.areaUnit) + "-" + 
                  sanitize(formData.propertyType) + "-for-" + 
                  sanitize(formData.adType) + "-in-" + 
                  sanitize(formData.city) + "-" + listingId;

      // Combine address fields
      const addressParts = [formData.locality, formData.subDistrict, formData.city, formData.state, formData.pinCode].filter(Boolean);
      const completeAddress = addressParts.join(", ");

      // Submit to API
      const response = await fetch('/api/property/quick-listing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          completeAddress,
          listingId,
          url,
          userId: session.user.id,
          userEmail: session.user.email
        })
      });

      if (response.ok) {
        const result = await response.json();
        setSuccessData({
          listingId: result.listingId,
          url: result.url,
          propertyUrl: `https://landmarkplots.com/${result.url}`
        });
        setShowThankYou(true);
      } else {
        const error = await response.json();
        alert(`Error: ${error.message || 'Failed to list property'}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while submitting the form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setFormSubmit(true);
    if (!validateForm()) {
      return;
    }

    // If user is not logged in, save form data and show login prompt
    if (!session) {
      // Combine address fields
      const addressParts = [locality, subDistrict, city, state, pinCode].filter(Boolean);
      const completeAddress = addressParts.join(", ");

      const formData = {
        adType,
        userType,
        propertyType: propertySubType.split(",")[1],
        propertySubType: propertySubType.split(",")[0],
        amount,
        areaSize,
        areaUnit,
        state,
        city,
        subDistrict,
        locality,
        pinCode,
        completeAddress,
        facing,
        ownership,
        otherRooms,
        negotiable,
        rented,
        corner,
        description,
        coverImage: coverImage?.uploadedName || "",
        otherImages: otherImages.map(img => img.uploadedName).filter(Boolean)
      };
      
      setPendingFormData(formData);
      setAutoSubmitAfterLogin(true);
      setShowAuthPrompt(true);
      return;
    }

    // User is logged in, submit directly
    // Combine address fields
    const addressParts = [locality, subDistrict, city, state, pinCode].filter(Boolean);
    const completeAddress = addressParts.join(", ");

    const formData = {
      adType,
      userType,
      propertyType: propertySubType.split(",")[1],
      propertySubType: propertySubType.split(",")[0],
      amount,
      areaSize,
      areaUnit,
      state,
      city,
      subDistrict,
      locality,
      pinCode,
      completeAddress,
      facing,
      ownership,
      otherRooms,
      negotiable,
      rented,
      corner,
      description,
      coverImage: coverImage?.uploadedName || "",
      otherImages: otherImages.map(img => img.uploadedName).filter(Boolean)
    };
    
    await submitFormData(formData);
  };

  return (
    <>
      <title>Quick Property Listing | Landmark Plots</title>
      <meta name="description" content="Quick Property Listing | Landmark Plots" />
      <meta name="canonical" content="https://landmarkplots.com/quick-listing" />
      
      {showAuthPrompt && <RequiredLogin />}
      
      {showThankYou ? (
        <Step6 
          listingId={successData?.listingId} 
          proUrl={successData?.propertyUrl}  
        />
      ) : (
        <div style={{ 
          minHeight: "100vh", 
          background: BG_GRADIENT, 
          padding: "2rem 0"
        }}>
        <div className="container h-100">
          <div className="row h-100">
            <div className="col-md-4 h-100">
              <div className="stepper-card p-4">
                {/* Top Icon */}
                <div className="top-icon">
                  <svg width="28" height="28" fill="#fff" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="4" /></svg>
                </div>
                
                {/* Quick Listing Steps */}
                <ul className="custom-stepper">
                  <li className="stepper-list-item">
                    <div className="stepper-icon-wrap">
                      <span className="stepper-icon stepper-current">
                        <svg width="18" height="18" fill="#fff" viewBox="0 0 20 20"><rect x="3" y="3" width="14" height="14" rx="4" /></svg>
                      </span>
                    </div>
                    <div className="stepper-label">
                      <div className="stepper-step">QUICK LISTING</div>
                      <div className="stepper-title">Property Details</div>
                    </div>
                  </li>
                </ul>

                {/* Useful Information Section */}
                <div className="sidebar-info-section">
                  <div className="info-card">
                    <h4>💡 Quick Tips</h4>
                    <ul>
                      <li>Add high-quality images</li>
                      <li>Set competitive pricing</li>
                      <li>Choose accurate location</li>
                    </ul>
                  </div>

                  <div className="info-card">
                    <h4>📞 Need Help?</h4>
                    <p>Our team is here to assist you.</p>
                    <div className="contact-info">
                      <div>📱 +91 99967 16787</div>
                      <div>📧 info@landmarkplots.com</div>
                    </div>
                  </div>
                </div>

                {/* Bottom Card: Help */}
                <div className="stepper-footer">
                  <span className="stepper-footer-icon">
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#eaf1fa" /><text x="12" y="17" textAnchor="middle" fontSize="16" fill={BLUE} fontWeight="bold">?</text></svg>
                  </span>
                  <span className="stepper-footer-text">Having troubles?</span>
                  <a href="/contactus" className="stepper-footer-link">Contact us</a>
                </div>
                
                {/* Bottom right: geometric/abstract image placeholder */}
                <div style={{ position: 'absolute', right: 0, bottom: 0, width: 90, height: 70, zIndex: 0 }}>
                  <svg width="90" height="70" viewBox="0 0 90 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <polygon points="0,70 90,0 90,70" fill="#eaf1fa" />
                    <polygon points="60,70 90,40 90,70" fill="#d0e3fa" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="col-md-8">
              <div className="row">
                <div className="col-md-12">

              {/* Form Card */}
              <div className="step1-form">
                <div className="step1-scrollable">
                  <form id="quick-listing-form" onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="step-info">
                        <strong>Why provide these details?</strong><br/>
                        Choosing the right ad type, user type, and property type helps us show your listing to the most relevant audience. Accurate basic details ensure your property appears in the right searches and attracts serious buyers or renters.
                      </div>
                    </div>

                    {/* Ad Type */}
                    <div className="col-md-12">
                      <div className="step1-label">📢 Ad Type <span style={{color:'#ec161e'}}>*</span></div>
                      <div className="step1-pill-group">
                        {adTypes.map((type) => (
                          <button
                            key={type.label}
                            className={`step1-pill${adType === type.label ? " selected" : ""}`}
                            onClick={() => setAdType(type.label)}
                            type="button"
                          >
                            {type.label}
                          </button>
                        ))}
                      </div>
                      {formSubmit && errors.adType && <div className="step-error-msg">{errors.adType}</div>}
                    </div>

                    {/* User Type */}
                    <div className="col-md-12">
                      <div className="step1-label">👤 Are you a...? <span style={{color:'#ec161e'}}>*</span></div>
                      <div className="step1-pill-group">
                        {userTypes.map((type) => (
                          <button
                            key={type.label}
                            className={`step1-pill${userType === type.label ? " selected" : ""}`}
                            onClick={() => setUserType(type.label)}
                            type="button"
                          >
                            {type.label}
                          </button>
                        ))}
                      </div>
                      {formSubmit && errors.userType && <div className="step-error-msg">{errors.userType}</div>}
                    </div>

                    {/* Property Type */}
                    <div className="col-md-12">
                      <div className="step1-label">🏠 Property Type <span style={{color:'#ec161e'}}>*</span></div>
                      <div className="step1-pill-group">
                        {proTypes.map((type) => (
                          <button
                            key={type.value}
                            className={`step1-pill${propertyType === type.value ? " selected" : ""}`}
                            onClick={() => {
                              setPropertyType(type.value);
                              setPropertySubType("");
                            }}
                            type="button"
                          >
                            {type.value}
                          </button>
                        ))}
                      </div>
                      {formSubmit && errors.propertyType && <div className="step-error-msg">{errors.propertyType}</div>}
                    </div>

                    {/* Property Sub Type */}
                    <div className="col-md-12">
                      <div className="step1-label">🏷️ Property Sub Type <span style={{color:'#ec161e'}}>*</span></div>
                      <div className="step1-pill-group step1-pill-group-wrap">
                        {subTypes.map((type) => (
                          <button
                            key={type.value}
                            className={`step1-pill${propertySubType === type.value ? " selected" : ""}`}
                            onClick={() => setPropertySubType(type.value)}
                            type="button"
                          >
                            {type.item}
                          </button>
                        ))}
                      </div>
                      {formSubmit && errors.propertySubType && <div className="step-error-msg">{errors.propertySubType}</div>}
                    </div>

                    {/* Expected Amount */}
                    <div className="col-md-6">
                      <div className="step1-label">💰 Expected Amount <span style={{color:'#ec161e'}}>*</span></div>
                      <input
                        type="text"
                        className="step-input"
                        placeholder="e.g. ₹ 10,00,000"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value.replace(/[^0-9]/g, ""))}
                        required
                      />
                      {formSubmit && errors.amount && <div className="step-error-msg">{errors.amount}</div>}
                      {amount && (
                        <div className="price-formatted">{priceFormat(amount)}</div>
                      )}
                    </div>

                    {/* Area Size */}
                    <div className="col-md-6">
                      <div className="step1-label">📏 Area Plot Size <span style={{color:'#ec161e'}}>*</span></div>
                      <div className="row">
                        <div className="col-md-8 remove-padding-right-with-dropdown">
                          <input
                            type="text"
                            className={`step-input ${formSubmit && errors.areaSize ? 'error-input' : ''}`}
                            placeholder="e.g. 6"
                            value={areaSize}
                            onChange={(e) => setAreaSize(e.target.value)}
                            required
                          />
                          {formSubmit && errors.areaSize && <div className="error-message">{errors.areaSize}</div>}
                        </div>
                        <div className="col-md-4 remove-padding-left-with-dropdown">
                          <select
                            className="step-select cursor-pointer"
                            value={areaUnit}
                            onChange={(e) => setAreaUnit(e.target.value)}
                          >
                            <option value="Marla">Marla</option>
                            <option value="Sq Yards">Sq Yards</option>
                            <option value="Sq Feet">Sq Feet</option>
                            <option value="Acres">Acres</option>
                            <option value="Sq Mts">Sq Mts</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Location Details */}
                    <div className="col-md-12">
                      <div className="step1-label">📍 Location Details <span style={{color:'#ec161e'}}>*</span></div>
                    </div>

                    <div className="col-md-6">
                      <input
                        type="text"
                        className="step-input"
                        placeholder="State"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        readOnly
                      />
                    </div>

                    <div className="col-md-6" style={{position: "relative"}}>
                      <input
                        type="text"
                        className={`step-input ${formSubmit && errors.city ? 'error-input' : ''}`}
                        placeholder="Search City"
                        value={citySearch}
                        onChange={handleCityInputChange}
                        onFocus={() => setShowCityDropdown(true)}
                        onBlur={() => {
                          setTimeout(() => {
                            setShowCityDropdown(false);
                            if (!haryanaCities.some(c => c.name === citySearch)) {
                              setCity("");
                              setCitySearch("");
                            }
                          }, 200);
                        }}
                      />
                      {formSubmit && errors.city && <div className="error-message">{errors.city}</div>}
                      {showCityDropdown && (
                        <div className="autocomplete-dropdown">
                          {filteredCities.length === 0 ? (
                            <div className="dropdown-item no-result">No results found</div>
                          ) : (
                            filteredCities.map((cityItem) => (
                              <div
                                key={cityItem.id}
                                className="dropdown-item"
                                onMouseDown={() => handleCitySelect(cityItem.name)}
                              >
                                {cityItem.name}
                              </div>
                            ))
                          )}
                        </div>
                      )}
                    </div>

                    <div className="col-md-6" style={{position: "relative"}}>
                      <input
                        type="text"
                        className={`step-input ${formSubmit && errors.subDistrict ? 'error-input' : ''}`}
                        placeholder="Search Sub District"
                        value={subDistrictSearch}
                        onChange={handleSubDistrictInputChange}
                        onFocus={() => city && setShowSubDistrictDropdown(true)}
                        onBlur={() => {
                          setTimeout(() => {
                            setShowSubDistrictDropdown(false);
                            if (!availableSubDistricts.includes(subDistrictSearch)) {
                              setSubDistrict("");
                              setSubDistrictSearch("");
                            }
                          }, 200);
                        }}
                        disabled={!city}
                      />
                      {formSubmit && errors.subDistrict && <div className="error-message">{errors.subDistrict}</div>}
                      {showSubDistrictDropdown && city && (
                        <div className="autocomplete-dropdown">
                          {filteredSubDistricts.length === 0 ? (
                            <div className="dropdown-item no-result">No results found</div>
                          ) : (
                            filteredSubDistricts.map((district, index) => (
                              <div
                                key={index}
                                className="dropdown-item"
                                onMouseDown={() => handleSubDistrictSelect(district)}
                              >
                                {district}
                              </div>
                            ))
                          )}
                        </div>
                      )}
                    </div>

                    <div className="col-md-6">
                      <input
                        type="text"
                        className={`step-input ${formSubmit && errors.pinCode ? 'error-input' : ''}`}
                        placeholder="Pin Code"
                        value={pinCode}
                        onChange={(e) => setPinCode(e.target.value)}
                        maxLength={6}
                      />
                      {formSubmit && errors.pinCode && <div className="error-message">{errors.pinCode}</div>}
                    </div>

                    <div className="col-md-12">
                      <input
                        type="text"
                        className={`step-input ${formSubmit && errors.locality ? 'error-input' : ''}`}
                        placeholder="Enter Locality"
                        value={locality}
                        onChange={(e) => setLocality(e.target.value)}
                        required
                      />
                      {formSubmit && errors.locality && <div className="error-message">{errors.locality}</div>}
                    </div>

                    {/* Property Facing */}
                    <div className="col-md-12">
                      <div className="step1-label">🧭 Property Facing</div>
                      <div className="step1-pill-group">
                        {propertyFacing.map((item) => (
                          <button
                            key={item.value}
                            className={`step1-pill${facing === item.value ? " selected" : ""}`}
                            onClick={() => setFacing(item.value)}
                            type="button"
                          >
                            {item.value}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Ownership */}
                    <div className="col-md-12">
                      <div className="step1-label">📋 Ownership</div>
                      <div className="step1-pill-group">
                        {ownershipOptions.map((opt) => (
                          <button
                            key={opt}
                            className={`step1-pill${ownership === opt ? " selected" : ""}`}
                            type="button"
                            onClick={() => setOwnership(opt)}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Other Rooms */}
                    {propertyType !== "Land" && (
                      <div className="col-md-12">
                        <div className="step1-label">🏠 Other Rooms</div>
                        <div className="step1-pill-group">
                          {otherRoomsOptions.map((opt) => (
                            <button
                              key={opt}
                              className={`step1-pill${otherRooms.includes(opt) ? " selected" : ""}`}
                              type="button"
                              onClick={() => handleMultiSelect(otherRooms, setOtherRooms, opt)}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Checkboxes */}
                    <div className="col-md-12">
                      <div className="step-checkbox-row">
                        <label className="step-checkbox-label">
                          <input
                            type="checkbox"
                            checked={negotiable}
                            onChange={() => setNegotiable(!negotiable)}
                          />
                          <span className="step-checkbox-custom"></span>
                          Price Negotiable
                        </label>
                        <label className="step-checkbox-label">
                          <input
                            type="checkbox"
                            checked={rented}
                            onChange={() => setRented(!rented)}
                          />
                          <span className="step-checkbox-custom"></span>
                          Already on Rented
                        </label>
                        <label className="step-checkbox-label">
                          <input
                            type="checkbox"
                            checked={corner}
                            onChange={() => setCorner(!corner)}
                          />
                          <span className="step-checkbox-custom"></span>
                          Corner Property
                        </label>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="col-md-12">
                      <div className="step1-label">📝 Property Description <span style={{color:'#ec161e'}}>*</span></div>
                      <textarea
                        className="step-input"
                        placeholder="Describe your property in detail..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        rows={4}
                        style={{ resize: 'vertical', minHeight: '100px' }}
                      />
                      {formSubmit && errors.description && <div className="step-error-msg">{errors.description}</div>}
                      <div style={{ fontSize: '12px', color: '#666', marginTop: '8px' }}>
                        💡 Description is auto-generated based on your property details. You can edit it as needed.
                      </div>
                    </div>

                    {/* Image Upload */}
                    <div className="col-md-12">
                      <div className="step1-label">📸 Property Images</div>
                      
                      {/* Cover Image Upload */}
                      <div className="image-upload-dropzone" style={{marginBottom: 24}} onClick={() => document.getElementById('cover-upload').click()}>
                        <input
                          type="file"
                          accept="image/jpeg,image/png,image/webp"
                          id="cover-upload"
                          style={{ display: "none" }}
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              setCoverImage({ file, url: URL.createObjectURL(file), uploadedName: file.name });
                            }
                            e.target.value = "";
                          }}
                        />
                        {!coverImage && (
                          <div className="image-upload-content">
                            <strong>Click to upload cover image</strong>
                            <div className="image-upload-note">(JPG, PNG, WEBP, 10KB - 1MB)</div>
                          </div>
                        )}
                        {coverImage && (
                          <div className="image-preview-item" style={{maxWidth: 220}}>
                            <div className="image-preview-thumb">
                              <img src={coverImage.url} alt="cover-preview" />
                              <button
                                type="button"
                                className="remove-image-btn"
                                onClick={e => {e.stopPropagation(); setCoverImage(null);}}
                                title="Remove"
                              >×</button>
                            </div>
                            <div className="image-success-msg">
                              {coverImage.file ? `${(coverImage.file.size / 1024).toFixed(0)} KB` : 'Uploaded'}
                            </div>
                            <div className="image-filename">{coverImage?.file?.name || coverImage?.uploadedName}</div>
                          </div>
                        )}
                      </div>

                      {/* Other Images Upload */}
                      <div className="image-upload-dropzone" onClick={() => document.getElementById('other-upload').click()}>
                        <input
                          type="file"
                          accept="image/jpeg,image/png,image/webp"
                          multiple
                          id="other-upload"
                          style={{ display: "none" }}
                          onChange={(e) => {
                            const files = Array.from(e.target.files);
                            const newImages = files.map(file => ({
                              file,
                              url: URL.createObjectURL(file),
                              uploadedName: file.name
                            }));
                            setOtherImages(prev => [...prev, ...newImages].slice(0, 10)); // Max 10 images
                            e.target.value = "";
                          }}
                        />
                        <div className="image-upload-content">
                          <strong>Click to upload other images</strong>
                          <div className="image-upload-note">(JPG, PNG, WEBP, 10KB - 1MB, up to 10 images)</div>
                        </div>
                      </div>
                      
                      {otherImages.length > 0 && (
                        <div className="image-preview-grid">
                          {otherImages.map((img, idx) => (
                            <div className="image-preview-item" key={idx}>
                              <div className="image-preview-thumb">
                                <img src={img.url} alt={`preview-${idx}`} />
                                <button
                                  type="button"
                                  className="remove-image-btn"
                                  onClick={e => {e.stopPropagation(); setOtherImages(prev => prev.filter((_, i) => i !== idx));}}
                                  title="Remove"
                                >×</button>
                              </div>
                              <div className="image-success-msg">
                                {img.file ? `${(img.file.size / 1024).toFixed(0)} KB` : 'Uploaded'}
                              </div>
                              <div className="image-filename">{img?.file?.name || img?.uploadedName}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Description */}
                    <div className="col-md-12">
                      <div className="step1-label">📝 Property Description</div>
                      <textarea
                        className="step-input"
                        style={{ minHeight: 90, resize: 'vertical' }}
                        placeholder="Describe your property in detail..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  </form>
                </div>
                
                {/* Sticky Footer */}
                <div className="step1-footer">
                  <button
                    type="submit"
                    form="quick-listing-form"
                    className="step1-next-btn"
                    disabled={loading}
                    style={{
                      background: loading ? '#ccc' : '#1dbf73',
                      cursor: loading ? 'not-allowed' : 'pointer'
                    }}
                  >
                    {loading ? "Publishing..." : "Finish & Publish"}
                  </button>
                </div>
              </div>

            
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      )}

      <style jsx>{`
        .stepper-card {
          background: ${BG_GRADIENT};
          border-radius: 32px;
          box-shadow: 0 12px 40px 0 rgba(31,38,135,0.13);
          min-width: 400px;
          max-width: 450px;
          width: 100%;
          height: 90vh;
          position: relative;
          overflow: visible;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .step1-form {
          height: 88vh;
          display: flex;
          flex-direction: column;
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 8px 32px rgba(31, 38, 135, 0.1);
          margin: 2rem auto;
          transition: all 0.3s ease-in-out;
          position: relative;
          background: linear-gradient(135deg, #f7faff 60%, #eaf1fa 100%);
        }
        .step1-scrollable {
          flex: 1;
          overflow-y: auto;
          padding: 2.5rem 1.5rem 1rem 1.5rem;
        }
        .step1-footer {
          position: sticky;
          bottom: 0;
          left: 0;
          width: 100%;
          background: #fff;
          border-bottom-left-radius: 16px;
          border-bottom-right-radius: 16px;
          box-shadow: 0 -2px 12px rgba(31,38,135,0.06);
          padding: 1.2rem 1.5rem;
          display: flex;
          justify-content: flex-end;
          z-index: 2;
        }
        .step1-next-btn {
          background: #1dbf73;
          color: #fff;
          font-weight: 700;
          padding: 9px 25px;
          font-size: 14px;
          border: none;
          border-radius: 2rem;
          box-shadow: 0 2px 8px #1dbf7320;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .step1-next-btn:hover {
          background: #17a85f;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px #1dbf7340;
        }
        
        .remove-padding-right-with-dropdown {
          padding-right: 0.5rem !important;
        }
        .remove-padding-left-with-dropdown {
          padding-left: 0.5rem !important;
        }
        .cursor-pointer {
          cursor: pointer;
        }
        .stepper-card .top-icon {
          width: 54px;
          height: 54px;
          border-radius: 16px;
          background: ${BLUE};
          box-shadow: 0 4px 16px #ec161e40;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 1.5rem;
        }
        .custom-stepper {
          list-style: none;
          margin: 0;
          padding: 0;
          width: 100%;
          position: relative;
          z-index: 2;
        }
        .stepper-list-item {
          display: flex;
          align-items: center;
          min-height: 60px;
          margin-bottom: 1.5rem;
        }
        .stepper-icon-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          min-width: 44px;
          position: relative;
        }
        .stepper-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 0.25rem;
          border-radius: 50%;
          width: 36px;
          height: 36px;
          font-weight: 700;
          font-size: 20px;
        }
        .stepper-current {
          background: #ec161e;
          color: #fff;
          box-shadow: 0 2px 8px #ec161e40;
          border: 2.5px solid #ec161e;
          font-weight: 800;
        }
        .stepper-label {
          margin-left: 1.5rem;
          flex: 1;
        }
        .stepper-step {
          font-weight: 600;
          font-size: 16px;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          color: #ec161e;
        }
        .stepper-title {
          font-weight: 700;
          font-size: 22px;
          margin-bottom: 2px;
          color: #ec161e;
        }
        .stepper-footer {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem;
          margin-top: auto;
          width: 100%;
          background: #fff;
          border-radius: 14px;
          box-shadow: 0 2px 8px #ec161e20;
          font-weight: 600;
          font-size: 15px;
        }
        .stepper-footer-icon {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #f4f7ff;
          color: #ec161e;
          font-weight: 700;
          font-size: 18px;
          margin-right: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .stepper-footer-text {
          color: #888;
          font-weight: 500;
        }
        .stepper-footer-link {
          color: #ec161e;
          font-weight: 700;
          text-decoration: underline;
          margin-left: 4px;
        }
        .sidebar-info-section {
          flex: 1;
          width: 100%;
          margin: 1rem 0;
          overflow-y: visible;
        }
        .info-card {
          background: #fff;
          border-radius: 12px;
          padding: 1rem;
          margin-bottom: 1rem;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        }
        .info-card h4 {
          font-size: 16px;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 0.75rem;
        }
        .info-card ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .info-card li {
          font-size: 14px;
          color: #374151;
          padding: 0.5rem 0;
          border-bottom: 1px solid #e5e7eb;
          font-weight: 500;
        }
        .info-card li:last-child {
          border-bottom: none;
        }
        .info-card p {
          font-size: 14px;
          color: #374151;
          margin-bottom: 0.75rem;
          line-height: 1.4;
        }
        .contact-info {
          font-size: 14px;
          color: #374151;
        }
        .contact-info div {
          padding: 0.25rem 0;
          font-weight: 500;
        }
        .price-formatted {
          color: #388e3c;
          padding: 6px 12px;
          margin-top: -10px;
          margin-bottom: 10px;
          font-size: 1em;
          letter-spacing: 0.5px;
        }
        .unit-chip {
          background: #eef2ff;
          color: #1e3a8a;
          border: 1px solid #c7d2fe;
          border-radius: 10px;
          padding: 8px 20px;
          font-size: 14px;
          font-weight: 700;
          white-space: nowrap;
          margin-bottom: 1rem;
        }
        @media (max-width: 600px) {
          .stepper-card {
            border-radius: 2.5rem !important;
            min-width: 98vw !important;
            max-width: 99vw !important;
            padding: 1.5rem 0.5rem !important;
          }
        }
      `}</style>
    </>
  );
}