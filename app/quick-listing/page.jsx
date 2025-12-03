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
import QuickListingFaq from "@/components/quickListing/QuickListingFaq";
import WhyQuickListing from "@/components/quickListing/WhyQuickListing";

const GREEN = "#1dbf73";
const BLUE = "#ec161e";
const GRAY = "#e0e0e0";
const DARK_GRAY = "#b0b0b0";
const BG_GRADIENT = "linear-gradient(135deg, #f7faff 60%, #eaf1fa 100%)";
const STORAGE_KEY = 'quickListingDraftV1';
const AUTOSUBMIT_KEY = 'quickListingAutoSubmit';

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

// File upload constants
const MAX_OTHER_IMAGES = 10;
const MAX_FILE_SIZE = 5242880; // 5MB (5 * 1024 * 1024 bytes)
const MIN_FILE_SIZE = 10240;   // 10KB
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/jpg", "image/webp"];

// File validation helper
const validateImageFile = (file) => {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return "Invalid format (only JPG, PNG, WEBP allowed)";
  }
  if (file.size < MIN_FILE_SIZE) {
    return `File too small (minimum: ${(MIN_FILE_SIZE / 1024).toFixed(0)}KB)`;
  }
  if (file.size > MAX_FILE_SIZE) {
    return `File too large (maximum: ${(MAX_FILE_SIZE / 1024 / 1024).toFixed(0)}MB, current: ${(file.size / 1024 / 1024).toFixed(2)}MB)`;
  }
  return "";
};

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
  const [userEditedDescription, setUserEditedDescription] = useState(false);
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

  // Ensure description has at least 400 words by appending helpful, relevant copy
  const ensureMinWords = (baseText, context) => {
    try {
      const countWords = (t) => (t || '').trim().split(/\s+/).filter(Boolean).length;
      const trimToMax = (t, max) => {
        const words = (t || '').trim().split(/\s+/).filter(Boolean);
        if (words.length <= max) return (t || '').trim();
        return words.slice(0, max).join(' ').trim();
      };
      let text = (baseText || '').trim();
      const minWords = 80;
      if (countWords(text) >= minWords) return text;

      const { type, locationText, area, areaUnitText, adType, price, ownership, facing, otherRooms, negotiable, corner, rented } = context || {};
      const genericPara = `This ${type ? type.toLowerCase() : 'property'} is positioned to serve everyday needs with reliable access to key roads, markets, healthcare and education. The neighbourhood around ${locationText || 'the locality'} supports a comfortable lifestyle with a calm residential feel and the convenience of daily essentials within short reach. ${area ? `The ${area} ${areaUnitText} layout supports practical planning with room for functional zoning and furnishing.` : ''} The broader ${locationText || 'Haryana'} region has seen consistent demand from end users and investors, supported by improving infrastructure and steady buyer interest across ${adType === 'Rent' ? 'rental' : 'sale'} segments.`;

      const usabilityPara = `For day-to-day life, this ${type ? type.toLowerCase() : 'home'} offers a straightforward setup that is easy to maintain. ${facing ? `The ${facing.toLowerCase()} facing helps with light and ventilation,` : 'Natural light and ventilation have been considered,'} supporting relaxed living during most hours. ${otherRooms && otherRooms.length ? `Additional rooms such as ${otherRooms.join(', ')} allow flexible use for prayer, storage or study.` : ''} ${ownership ? `Ownership type is ${ownership.toLowerCase()},` : ''} and ${corner ? 'corner placement adds visibility and ease of access,' : 'the placement offers balanced privacy and access,'} which is appreciated by practical home seekers.`;

      const connectivityPara = `${locationText ? `Connectivity in ${locationText}` : 'Connectivity in the area'} links you with routine needs and employment hubs through local streets and main corridors. Nearby facilities for shopping, healthcare and daily services reduce commute time and improve convenience. The wider real estate micro-market has stable movement, indicating balanced availability and buyer activity for ${adType === 'Rent' ? 'rental' : 'purchase'} decisions.`;

      const clarityPara = `${price ? `The current asking price is ${price}. ` : ''}${negotiable ? 'Price is negotiable subject to discussion with genuine buyers. ' : ''}${rented ? 'The property is currently on rent; timelines and handover can be planned accordingly. ' : ''}Clear, complete details are provided to support an informed decision. You can request a site visit to review the space, surroundings and approach roads in person before taking the next step.`;

      const callToAction = `If you are exploring options in ${locationText || 'Haryana'}, this listing is a practical fit for buyers and tenants who value location, straightforward planning and long-term usability. For more information or to schedule a visit, please share your preferred time and we will coordinate accordingly.`;

      const blocks = [genericPara, usabilityPara, connectivityPara, clarityPara, callToAction];
      for (const block of blocks) {
        if (countWords(text) >= minWords) break;
        text = `${text} ${block}`.trim();
      }
      // If still short, repeat generic context until threshold
      while (countWords(text) < minWords) {
        text = `${text} ${genericPara}`.trim();
      }
      // Cap to ~200 words
      return trimToMax(text, 100);
    } catch {
      return (baseText || '').trim();
    }
  };

  // Generate description based on form data
  const generateDescription = useMemo(() => {
    const [subTypeName = propertyType, mainTypeName = propertyType] = propertySubType ? propertySubType.split(",") : [propertyType, propertyType];
    const type = subTypeName || propertyType || "Property";
    const area = areaSize || "";
    const areaUnitText = areaUnit || "";
    const locationText = [subDistrict, city, state].filter(Boolean).join(", ");
    const price = amount ? priceFormat(amount) : "";

    const ownershipText = ownership ? `Ownership: ${ownership}. ` : "";
    const otherRoomsText = otherRooms && otherRooms.length ? `Includes ${otherRooms.join(", ")}. ` : "";
    const cornerText = corner ? "Corner property. " : "";
    const rentalStatusText = rented ? "Currently rented. " : "";
    const negotiableText = negotiable ? "Price is negotiable. " : "";

    let desc = "";
    
    if (type.includes("Apartment")) {
      desc = `Looking for apartments for ${adType === "Rent" ? "rent" : "sale"} in ${locationText || "Haryana"}? Discover this apartment${area ? ` spanning ${area} ${areaUnitText}` : ''}${locationText ? ` in ${locationText}` : ''}. ${ownershipText}${facing ? `Facing: ${facing}. ` : ''}${otherRoomsText}${price ? `Available for ${adType === "Rent" ? "rent" : "sale"} at ${price}. ` : ''}${negotiableText}${cornerText}${rentalStatusText}Contact us to schedule a visit.`;

    } else if (type.includes("Independent House")) {
      desc = `Searching for an independent house for ${adType === "Rent" ? "rent" : "sale"} in ${locationText || "Haryana"}? This house${area ? ` of ${area} ${areaUnitText}` : ''}${locationText ? ` in ${locationText}` : ''} offers a balanced lifestyle. ${ownershipText}${facing ? `Facing: ${facing}. ` : ''}${otherRoomsText}${price ? `Available for ${adType === "Rent" ? "rent" : "sale"} at ${price}. ` : ''}${negotiableText}${cornerText}${rentalStatusText}Schedule a site visit today.`;

    } else if (type.includes("Builder Floor")) {
      desc = `Find builder floors for ${adType === "Rent" ? "rent" : "sale"} in ${locationText || "Haryana"}. This builder floor${area ? ` of ${area} ${areaUnitText}` : ''}${locationText ? ` in ${locationText}` : ''} is a smart choice. ${ownershipText}${facing ? `Facing: ${facing}. ` : ''}${otherRoomsText}${price ? `Offered for ${adType === "Rent" ? "rent" : "sale"} at ${price}. ` : ''}${negotiableText}${cornerText}${rentalStatusText}`;

    } else if (type.includes("Farm House")) {
      desc = `Explore farm houses for ${adType === "Rent" ? "rent" : "sale"} in ${locationText || "Haryana"}. This property${area ? ` of ${area} ${areaUnitText}` : ''}${locationText ? ` in ${locationText}` : ''} offers open spaces and privacy. ${ownershipText}${facing ? `Facing: ${facing}. ` : ''}${otherRoomsText}${price ? `Asking ${price}. ` : ''}${negotiableText}${cornerText}`;

    } else if (type === "RK" || type.includes("Studio Apartment")) {
      desc = `Discover compact ${type.toLowerCase()} options for ${adType === "Rent" ? "rent" : "sale"} in ${locationText || "Haryana"}. Area${area ? `: ${area} ${areaUnitText}. ` : ': N/A. '}${ownershipText}${price ? `Available at ${price}. ` : ''}${negotiableText}${cornerText}`;

    } else if (type.includes("Retirement Community")) {
      desc = `Find homes in retirement communities for ${adType === "Rent" ? "rent" : "sale"} in ${locationText || "Haryana"}. ${area ? `Area: ${area} ${areaUnitText}. ` : ''}${ownershipText}${price ? `Asking ${price}. ` : ''}${negotiableText}${cornerText}`;

    } else if (type.includes("Residential Land")) {
      desc = `Find residential land for ${adType === "Rent" ? "rent" : "sale"} in ${locationText || "Haryana"}. This plot${area ? ` of ${area} ${areaUnitText}` : ''}${locationText ? ` in ${locationText}` : ''} is ideal for your home. ${ownershipText}${price ? `Offered for ${adType === "Rent" ? "rent" : "sale"} at ${price}. ` : ''}${negotiableText}${cornerText}`;

    } else if (type.includes("Agricultural Land") || type.includes("Farm House Land") || type.includes("Institutional Land")) {
      desc = `Explore ${type.toLowerCase()} for ${adType === "Rent" ? "rent" : "sale"} in ${locationText || "Haryana"}. Parcel${area ? ` size: ${area} ${areaUnitText}. ` : ': N/A. '}${ownershipText}${price ? `Available at ${price}. ` : ''}${negotiableText}${cornerText}`;

    } else if (type.includes("Commercial Land") || type.includes("Industrial Land")) {
      desc = `Explore ${type.toLowerCase()} for ${adType === "Rent" ? "rent" : "sale"} in ${locationText || "Haryana"}. This land${area ? ` of ${area} ${areaUnitText}` : ''}${locationText ? ` in ${locationText}` : ''} suits business growth. ${ownershipText}${price ? `Available at ${price}. ` : ''}${negotiableText}${cornerText}`;

    } else if (type.includes("Retail Showroom") || type.includes("Office") || type.includes("Office Complex") || type.includes("Warehouse")) {
      desc = `Find ${type.toLowerCase()} spaces for ${adType === "Rent" ? "rent" : "sale"} in ${locationText || "Haryana"}. Area${area ? `: ${area} ${areaUnitText}. ` : ': N/A. '}${ownershipText}${price ? `Asking ${price}. ` : ''}${negotiableText}${cornerText}`;

    } else if (type.includes("Commercial Building") || type.includes("Institutional Building")) {
      desc = `Discover ${type.toLowerCase()} options for ${adType === "Rent" ? "rent" : "sale"} in ${locationText || "Haryana"}. Built-up${area ? `: ${area} ${areaUnitText}. ` : ': N/A. '}${ownershipText}${price ? `Quoted ${price}. ` : ''}${negotiableText}${cornerText}`;

    } else if (type.includes("Software Technology Park") || type.includes("Industrial Estate")) {
      desc = `Explore ${type.toLowerCase()} properties in ${locationText || "Haryana"}. ${area ? `Area: ${area} ${areaUnitText}. ` : ''}${ownershipText}${price ? `Asking ${price}. ` : ''}${negotiableText}${cornerText}`;

    } else if (type.includes("Petrol Pump") || type.includes("Cold Store")) {
      desc = `Special-use property: ${type.toLowerCase()} in ${locationText || "Haryana"}. ${area ? `Area: ${area} ${areaUnitText}. ` : ''}${ownershipText}${price ? `Price ${price}. ` : ''}${negotiableText}${cornerText}`;

    } else {
      desc = `Search properties for ${adType === "Rent" ? "rent" : "sale"} in ${locationText || "Haryana"}. This property${type ? ` (${type})` : ''}${area ? ` of ${area} ${areaUnitText}` : ''}${locationText ? ` in ${locationText}` : ''} offers potential. ${ownershipText}${facing ? `Facing: ${facing}. ` : ''}${otherRoomsText}${price ? `Available at ${price}. ` : ''}${negotiableText}${cornerText}${rentalStatusText}`;
    }

    const compact = desc.replace(/\s+/g, ' ').trim();
    return ensureMinWords(compact, { type, locationText, area, areaUnitText, adType, price, ownership, facing, otherRooms, negotiable, corner, rented });
  }, [propertySubType, propertyType, areaSize, areaUnit, subDistrict, city, state, amount, adType, ownership, facing, otherRooms, negotiable, rented, corner]);

  // Auto-generate description when form fields change, unless user edited manually
  useEffect(() => {
    if (generateDescription && !userEditedDescription) {
      setDescription(generateDescription);
    }
  }, [generateDescription, userEditedDescription]);

  // Load draft from localStorage on mount (if user returned from login)
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const draft = JSON.parse(saved);
        if (draft) {
          setAdType(draft.adType || "Sale");
          setUserType(draft.userType || "Owner");
          setPropertyType(draft.propertyType || "Residential");
          // Reconstruct combined subType value
          if (draft.propertySubType && draft.propertyType) {
            setPropertySubType(`${draft.propertySubType},${draft.propertyType}`);
          }
          setAmount(draft.amount || "");
          setAreaSize(draft.areaSize || "");
          setAreaUnit(draft.areaUnit || "Marla");
          setState(draft.state || "Haryana");
          setCity(draft.city || "");
          setCitySearch(draft.city || "");
          setSubDistrict(draft.subDistrict || "");
          setSubDistrictSearch(draft.subDistrict || "");
          setLocality(draft.locality || "");
          setPinCode(draft.pinCode || "");
          setFacing(draft.facing || "");
          setOwnership(draft.ownership || "");
          setOtherRooms(Array.isArray(draft.otherRooms) ? draft.otherRooms : []);
          setNegotiable(typeof draft.negotiable === 'boolean' ? draft.negotiable : true);
          setRented(typeof draft.rented === 'boolean' ? draft.rented : false);
          setCorner(typeof draft.corner === 'boolean' ? draft.corner : false);
          setDescription(draft.description || "");
          setUserEditedDescription(!!draft.description);
          // We can't restore File blobs reliably; keep image names if any
          if (draft.coverImage) setCoverImage({ uploadedName: draft.coverImage });
          if (Array.isArray(draft.otherImages)) setOtherImages(draft.otherImages.map(name => ({ uploadedName: name })));

          setPendingFormData(draft);
        }
      }
    } catch (e) {
      // ignore
    }
  }, []);

  // If logged in and autosubmit requested (from a previous attempt), auto-submit restored draft
  useEffect(() => {
    if (session) {
      const shouldAuto = typeof window !== 'undefined' && localStorage.getItem(AUTOSUBMIT_KEY) === '1';
      if (shouldAuto) {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          try {
            const draft = JSON.parse(saved);
            if (draft) {
              submitFormData(draft);
              localStorage.removeItem(AUTOSUBMIT_KEY);
            }
          } catch {}
        } else {
          localStorage.removeItem(AUTOSUBMIT_KEY);
        }
      }
    }
  }, [session]);

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

  // Remove loading state - not needed since we handle login flow differently
  // if (status === "loading") {
  //   return <Loading />;
  // }

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
    
    // Validate images
    if (coverImage && coverImage.error) {
      newErrors.coverImage = coverImage.error;
    }
    const invalidOtherImages = otherImages.filter(img => img.error);
    if (invalidOtherImages.length > 0) {
      newErrors.otherImages = `Some images have errors. Please fix them before submitting.`;
    }
    
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
        // Clear any saved draft on success
        try {
          localStorage.removeItem(STORAGE_KEY);
          localStorage.removeItem(AUTOSUBMIT_KEY);
        } catch {}
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
      // Persist draft to localStorage for post-login restore
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
        localStorage.setItem(AUTOSUBMIT_KEY, '1');
      } catch {}

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
      <title>Quick Property Listing in Haryana | Landmark Plots</title>
      <meta name="description" content="List your property fast in Haryana. Quick Listing by Landmark Plots creates a professional page with photos, price, locality and LM-ID URL—built to rank and convert." />
      <meta name="canonical" content="https://landmarkplots.com/quick-listing" />
      <meta name="keywords" content="quick property listing Haryana, HSVP sectors listing, list property fast, sell house online, rent property Haryana, Landmark Plots listing, post property free" />
      <meta name="robots" content="index,follow,max-image-preview:large" />
      <meta name="author" content="Landmark Plots" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Quick Property Listing in Haryana | Landmark Plots" />
      <meta property="og:description" content="Create a professional, SEO‑ready property page in minutes. Photos, price, location and LM‑ID link—optimised for buyers in Haryana and HSVP sectors." />
      <meta property="og:url" content="https://landmarkplots.com/quick-listing" />
      <meta property="og:image" content="https://landmarkplots.com/uploads/default.jpg" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Quick Property Listing in Haryana | Landmark Plots" />
      <meta name="twitter:description" content="Launch your listing fast. Structured data and intent‑based copy help buyers find and contact you sooner." />
      <meta name="twitter:image" content="https://landmarkplots.com/uploads/default.jpg" />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Quick Property Listing in Haryana | Landmark Plots',
        url: 'https://landmarkplots.com/quick-listing',
        inLanguage: 'en-IN',
        description: 'List your property fast in Haryana. Professional page with photos, price, locality and LM‑ID URL—built to rank and convert.',
        about: [{ '@type': 'Place', name: 'Haryana' }, { '@type': 'Organization', name: 'Landmark Plots' }],
        isPartOf: { '@type': 'WebSite', name: 'Landmark Plots', url: 'https://landmarkplots.com' },
        primaryImageOfPage: { '@type': 'ImageObject', url: 'https://landmarkplots.com/uploads/default.jpg' },
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://landmarkplots.com/' },
            { '@type': 'ListItem', position: 2, name: 'Quick Listing', item: 'https://landmarkplots.com/quick-listing' }
          ]
        },
        potentialAction: [{
          '@type': 'ContactAction',
          target: 'https://landmarkplots.com/contactus',
          name: 'Contact Listing Expert'
        }],
        speakable: {
          '@type': 'SpeakableSpecification',
          cssSelector: ['.support-title', '.hsvp-faq-q']
        }
      })}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'How do I list my property fast in Haryana?', acceptedAnswer: { '@type': 'Answer', text: 'Open Quick Listing, add price, area and location, upload photos and submit. Your LM‑ID URL is created instantly and the page goes live.' } },
          { '@type': 'Question', name: 'Do I need to create an account first?', acceptedAnswer: { '@type': 'Answer', text: 'No. Fill the form freely. When you press submit we prompt login/registration and auto‑restore your data to publish.' } },
          { '@type': 'Question', name: 'What photo formats are supported?', acceptedAnswer: { '@type': 'Answer', text: 'Upload JPG, PNG or WEBP. Add one cover photo and up to 10 gallery images for best results.' } },
          { '@type': 'Question', name: 'How is the property URL formed?', acceptedAnswer: { '@type': 'Answer', text: 'We generate a clean city/location URL and append your unique LM‑XXXXXXX listing ID for sharing and tracking.' } },
          { '@type': 'Question', name: 'Can I edit details after publishing?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. You can request updates to price, photos and description via our support team.' } },
          { '@type': 'Question', name: 'Does this work for HSVP sector properties?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Quick Listing supports Haryana cities and HSVP sectors with locality and PIN code inputs.' } }
        ]
      })}} />
      
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
                {/* <div className="top-icon">
                  <svg width="28" height="28" fill="#fff" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="4" /></svg>
                </div> */}
                
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

                {/* Useful Information Section (Add Property style) */}
                <div className="sidebar-info-section">
                  <div className="ql-aside-card">
                    <div className="ql-aside-header">
                      <div className="ql-aside-ico" aria-hidden>💡</div>
                      <div>
                        <div className="ql-aside-title">Quick Tips</div>
                        <div className="ql-aside-sub">Make your listing stand out</div>
                      </div>
                    </div>
                    <ul className="ql-aside-list">
                      <li>
                        <span className="ql-dot">●</span>
                        Add a clear cover photo and 6–10 gallery images
                      </li>
                      <li>
                        <span className="ql-dot">●</span>
                        Enter realistic price and keep “Negotiable” on if flexible
                      </li>
                      <li>
                        <span className="ql-dot">●</span>
                        Pick exact locality and sub‑district for better reach
                      </li>
                    </ul>
                  </div>

                  <div className="ql-aside-card">
                    <div className="ql-aside-header">
                      <div className="ql-aside-ico" aria-hidden>🧭</div>
                      <div>
                        <div className="ql-aside-title">Pro Tip</div>
                        <div className="ql-aside-sub">Answers that buyers look for</div>
                      </div>
                    </div>
                    <div className="ql-aside-note">Mention plot size + unit, facing, proximity to main road and nearby landmarks. Keep description simple and factual.</div>
                  </div>

                  {/* <div className="ql-aside-card">
                    <div className="ql-aside-header">
                      <div className="ql-aside-ico" aria-hidden>📞</div>
                      <div>
                        <div className="ql-aside-title">Need Help?</div>
                        <div className="ql-aside-sub">Talk to a listing expert</div>
                      </div>
                    </div>
                    <div className="ql-contact">
                      <div className="ql-contact-row">📱 +91 99967 16787</div>
                      <div className="ql-contact-row">📧 info@landmarkplots.com</div>
                    </div>
                  </div> */}
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
                      <div className="step1-label">📝 Property Description</div>
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
                              const error = validateImageFile(file);
                              setCoverImage({ 
                                file, 
                                url: URL.createObjectURL(file), 
                                uploadedName: file.name,
                                error: error || ""
                              });
                            }
                            e.target.value = "";
                          }}
                        />
                        {!coverImage && (
                          <div className="image-upload-content">
                            <strong>Click to upload cover image</strong>
                            <div className="image-upload-note">(JPG, PNG, WEBP, 10KB - 5MB)</div>
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
                            <div className={coverImage.error ? "image-error-msg" : "image-success-msg"}>
                              {coverImage.error ? coverImage.error : (coverImage.file ? `${(coverImage.file.size / 1024).toFixed(0)} KB` : 'Uploaded')}
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
                              uploadedName: file.name,
                              error: validateImageFile(file) || ""
                            }));
                            setOtherImages(prev => [...prev, ...newImages].slice(0, MAX_OTHER_IMAGES)); // Max 10 images
                            e.target.value = "";
                          }}
                        />
                        <div className="image-upload-content">
                          <strong>Click to upload other images</strong>
                          <div className="image-upload-note">(JPG, PNG, WEBP, 10KB - 5MB, up to {MAX_OTHER_IMAGES} images)</div>
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
                              <div className={img.error ? "image-error-msg" : "image-success-msg"}>
                                {img.error ? img.error : (img.file ? `${(img.file.size / 1024).toFixed(0)} KB` : 'Uploaded')}
                              </div>
                              <div className="image-filename">{img?.file?.name || img?.uploadedName}</div>
                            </div>
                          ))}
                        </div>
                      )}
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
                    disabled={loading || (coverImage && coverImage.error) || otherImages.some(img => img.error)}
                    style={{
                      background: (loading || (coverImage && coverImage.error) || otherImages.some(img => img.error)) ? '#ccc' : '#1dbf73',
                      cursor: (loading || (coverImage && coverImage.error) || otherImages.some(img => img.error)) ? 'not-allowed' : 'pointer'
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
          {/* Supporting Sections below the form */}
          <WhyQuickListing />

          {/* CTA Section */}
          <section className="sect-padding">
            <div className="container">
              <div className="hsvp-super-cta">
                <div className="hsvp-super-cta__left">
                  <div className="hsvp-super-cta__icon" aria-hidden>📣</div>
                  <div>
                    <h3 className="hsvp-super-cta__title">Need help listing your property in Haryana?</h3>
                    <p className="hsvp-super-cta__text">Talk to Landmark Plots specialists for pricing strategy, documents, HSVP guidance and buyer outreach.</p>
                  </div>
                </div>
                <div className="hsvp-super-cta__actions">
                  <a className="btn hsvp-btn" href="/contactus">Contact Us</a>
                  <a className="btn hsvp-btn-alt" href="/allproperties">Browse Properties</a>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
         <QuickListingFaq  />
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
        /* Add-Property style aside cards */
        .ql-aside-card{background:#fff;border:1px solid #e2e8f0;border-radius:16px;box-shadow:0 6px 22px rgba(2,6,23,.06);padding:16px;margin-bottom:12px}
        .ql-aside-header{display:flex;align-items:center;gap:10px;margin-bottom:8px}
        .ql-aside-ico{width:34px;height:34px;border-radius:10px;background:#0f172a;color:#fff;display:flex;align-items:center;justify-content:center;font-size:18px}
        .ql-aside-title{font-weight:800}
        .ql-aside-sub{color:#64748b;font-size:14px}
        .ql-aside-list{list-style:none;padding-left:0;margin:0}
        .ql-aside-list li{display:flex;gap:8px;align-items:flex-start;padding:8px 0;border-top:1px dashed #e2e8f0}
        .ql-aside-list li:first-child{border-top:0}
        .ql-dot{color:#1dbf73;margin-top:2px}
        .ql-aside-note{background:#f8fafc;border:1px dashed #cbd5e1;border-radius:12px;padding:12px;color:#475569}
        .ql-contact{display:flex;flex-direction:column;gap:6px}
        .ql-contact-row{font-weight:600;color:#0f172a}
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
        
        /* Support sections styling */
        .support-card {
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 8px 24px rgba(31,38,135,0.08);
          padding: 1.5rem;
        }
        .support-title {
          font-size: 22px;
          font-weight: 800;
          color: #1f2937;
          margin-bottom: 0.75rem;
        }
        .support-subtitle { 
          color: #4b5563; 
          margin-bottom: 1rem; 
        }
        .support-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
        }
        .support-item { 
          background: #f9fafb; 
          border-radius: 12px; 
          padding: 1rem; 
        }
        .support-item h3 {
          font-size: 16px;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 0.5rem;
        }
        .support-item p {
          font-size: 14px;
          color: #6b7280;
          margin: 0;
        }
        .how-list { 
          padding-left: 1.25rem; 
          margin: 0 0 1rem 0; 
          color: #374151; 
        }
        .support-cta {
          display: inline-block;
          background: #1dbf73;
          color: #fff;
          padding: 8px 16px;
          border-radius: 999px;
          font-weight: 700;
          text-decoration: none;
        }
        .faq-card { 
          background: #fff; 
          border-radius: 16px; 
          box-shadow: 0 8px 24px rgba(31,38,135,0.08); 
          padding: 1.5rem; 
        }
        .faq-grid { 
          display: grid; 
          grid-template-columns: repeat(2, 1fr); 
          gap: 0.75rem 1.5rem; 
        }
        .faq-item { 
          background: #f9fafb; 
          border-radius: 12px; 
          padding: 0.75rem 1rem; 
        }
        .faq-item summary { 
          cursor: pointer; 
          font-weight: 700; 
          color: #111827; 
        }
        .faq-answer { 
          margin-top: 0.5rem; 
          color: #374151; 
        }
        @media (max-width: 768px){ 
          .support-grid{ grid-template-columns: 1fr; } 
          .faq-grid{ grid-template-columns: 1fr; } 
        }
        
        /* HSVP-style FAQ and CTA */
        .sect-padding{padding-top:20px;padding-bottom:20px;}
        .hsvp-h2{font-weight:800;font-size:clamp(18px,2.4vw,26px);margin-top:22px;margin-bottom:10px;color:#0f172a}
        .hsvp-faq{margin-bottom:10px;padding:14px 16px;border:1px solid #e2e8f0;border-radius:12px;background:#fff;box-shadow:0 4px 16px rgba(2,6,23,.05);transition:all 0.2s ease}
        .hsvp-faq:hover{transform:translateY(-1px);box-shadow:0 6px 20px rgba(2,6,23,.08)}
        .hsvp-faq summary::-webkit-details-marker{display:none}
        .hsvp-faq summary::before{content:"▶";color:#1a9050;margin-right:8px;font-size:12px;transition:transform 0.2s ease}
        .hsvp-faq[open] summary::before{transform:rotate(90deg)}
        .hsvp-faq-q{cursor:pointer;font-weight:700;color:#0f172a;font-size:15px;line-height:1.4}
        .hsvp-faq-a{margin-top:8px;color:#475569;font-size:14px;line-height:1.5}
        .hsvp-super-cta{display:flex;align-items:center;justify-content:space-between;gap:16px;border:1px solid #e2e8f0;border-radius:18px;padding:18px 20px;background:linear-gradient(90deg,#f7fafc,#eef2ff)}
        .hsvp-super-cta__left{display:flex;align-items:center;gap:12px}
        .hsvp-super-cta__icon{width:44px;height:44px;border-radius:12px;background:#0f172a;color:#fff;display:flex;align-items:center;justify-content:center;font-size:22px}
        .hsvp-super-cta__title{margin:0;font-weight:800}
        .hsvp-super-cta__text{margin:2px 0 0 0;color:#475569}
        .hsvp-super-cta__actions{display:flex;gap:10px}
        .hsvp-btn{background:linear-gradient(90deg,#1a9050,#2d3748);color:#fff;border:none;border-radius:12px;padding:12px 18px;font-weight:800; font-size: 15px;text-decoration:none;}
        .hsvp-btn-alt{background:#0f172a;color:#fff;border:none;border-radius:12px;padding:12px 18px;font-weight:800; font-size: 15px;text-decoration:none;}
        .hsvp-btn:hover{opacity:.92}
        .hsvp-btn-alt:hover{opacity:.92}
        @media (max-width: 768px){
          .hsvp-super-cta{flex-direction:column;text-align:center;}
          .hsvp-super-cta__actions{justify-content:center;}
        }
      `}</style>
  
    </>
  );
}