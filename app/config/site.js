// Site configuration for LandmarkPlots and Landmark Properties
export const siteConfig = {
  // Basic site information
  name: "LandmarkPlots",
  businessName: "Landmark Properties",
  fullBusinessName: "Landmark Properties - Real Estate Broker & Builders",
  url: "https://landmarkplots.com",
  description: "Discover your dream property with LandmarkPlots.com, a premier platform offering exclusive land and real estate opportunities. Explore a curated selection of prime plots, residential, and commercial properties tailored to your needs.",
  
  // Contact information
  contact: {
    phone: "+91-999-671-6787",
    secondaryPhone: "+91-905-004-8884",
    email: "info@landmarkplots.com",
    whatsapp: "https://wa.me/919996716787?text=https://landmarkplots.com/",
    shareWhatsapp: "https://api.whatsapp.com/send?text=https://landmarkplots.com/"
  },
  
  // Business information
  business: {
    type: "RealEstateAgent",
    alternateName: "Landmark Properties",
    legalName: "Landmark Properties - Real Estate Broker & Builders",
    services: [
      "Property Sales",
      "Property Rentals",
      "Land Sales", 
      "Commercial Properties",
      "Residential Properties",
      "Construction Services",
      "Property Development",
      "Real Estate Brokerage"
    ],
    areaServed: "India",
    primaryArea: "Kurukshetra, Haryana",
    address: {
      country: "IN",
      region: "Haryana",
      city: "Kurukshetra",
      streetAddress: "1st Floor, Cabin 2, SCO 32, beside New Bus Stand, Sector 10",
      postalCode: "136118",
      fullAddress: "1st Floor, Cabin 2, SCO 32, beside New Bus Stand, Sector 10, Kurukshetra, Haryana 136118"
    },
    foundingDate: "2020",
    hasMap: "https://maps.google.com/?q=1st+Floor+Cabin+2+SCO+32+beside+New+Bus+Stand+Sector+10+Kurukshetra+Haryana+136118",
    priceRange: "₹₹",
    openingHours: "Mo-Su 09:00-18:00",
    paymentAccepted: ["Cash", "Bank Transfer", "Cheque"],
    currenciesAccepted: "INR"
  },
  
  // Social media and external links
  social: {
    website: "https://landmarkplots.com",
    instagram: "https://www.instagram.com/reel/DMUs1fbBPIq/"
  },
  
  // SEO settings
  seo: {
    defaultImage: "/images/property-banner-img.jpg",
    logo: "/favicon.png",
    businessImage: "/uploads/default.jpg",
    languages: ["English", "Hindi"],
    keywords: [
      "LandmarkPlots",
      "Landmark Properties", 
      "real estate Kurukshetra",
      "property broker Haryana",
      "land for sale Kurukshetra",
      "residential properties Haryana",
      "commercial properties Kurukshetra",
      "construction company Haryana",
      "SCO 32 Sector 10 Kurukshetra",
      "New Bus Stand Kurukshetra",
      "property dealer Kurukshetra"
    ]
  },
  
  // Default images mapping based on property type/subcategory
  defaultImages: {
    // Main property types (fallback)
    "Residential": "/images/default_images/residential.webp",
    "Commercial": "/images/default_images/commercial.webp",
    "Land": "/images/default_images/land.webp",
    // Residential subcategories
    "Apartment": "/images/default_images/apartment.webp",
    "Independent House": "/images/default_images/independent-house.webp",
    "Builder Floor": "/images/default_images/builder-floor.webp",
    "Farm House": "/images/default_images/farm-house.webp",
    "Raw House": "/images/default_images/raw-house.webp",
    "Retirement Community": "/images/default_images/retirement-community.webp",
    "Studio Apartment": "/images/default_images/studio-apartment.webp",
    "RK": "/images/default_images/residential.webp",
    // Land subcategories
    "Residential Land": "/images/default_images/land.webp",
    "Commercial Land": "/images/default_images/commercial-land.webp",
    "Industrial Land": "/images/default_images/industrial-land.webp",
    "Agricultural Land": "/images/default_images/agricultural-land.webp",
    "Farm House Land": "/images/default_images/farm-house-land.webp",
    "Institutional Land": "/images/default_images/institutional-land.webp",
    // Commercial subcategories
    "Retail Showroom": "/images/default_images/retail-showroom.webp",
    "Commercial Building": "/images/default_images/commercial-building.webp",
    "Office Complex": "/images/default_images/office-complex.webp",
    "Software Technology Park": "/images/default_images/software-technology-park.webp",
    "Warehouse": "/images/default_images/warehouse.webp",
    "Industrial Estate": "/images/default_images/industrial-estate.webp",
    "Institutional Building": "/images/default_images/institutional-building.webp",
    "Petrol Pump": "/images/default_images/petrol-pump.webp",
    "Cold Store": "/images/default_images/cold-store.webp",
    "Commercial": "/images/default_images/commercial.webp",
    // Fallback
    "default": "/images/default_images/residential.webp"
  },
  assets: {
    galleryFallback: "/images/default_images/residential.webp"
  }
};

const ensureLeadingSlash = (path = "") => {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return path.startsWith("/") ? path : `/${path}`;
};

export const getSiteImagePath = (path = siteConfig.seo.defaultImage) => {
  if (!path) return siteConfig.seo.defaultImage;
  if (path.startsWith("http")) return path;
  return ensureLeadingSlash(path);
};

export const getSiteImageUrl = (path = siteConfig.seo.defaultImage) => {
  if (!path) return `${siteConfig.url}${siteConfig.seo.defaultImage}`;
  if (path.startsWith("http")) return path;
  return `${siteConfig.url}${ensureLeadingSlash(path)}`;
};

export const getBusinessImageUrl = () => getSiteImageUrl(siteConfig.seo.businessImage);
export const getDefaultSeoImageUrl = () => getSiteImageUrl(siteConfig.seo.defaultImage);

/**
 * Get default image based on property type and subcategory
 * @param {string} proType - Property type (e.g., "Residential", "Commercial", "Land")
 * @param {string} proSubCat - Property subcategory (e.g., "Apartment,Residential")
 * @returns {string} Default image filename
 */
export function getDefaultImage(proType, proSubCat) {
  if (!proType && !proSubCat) {
    return siteConfig.defaultImages.default;
  }
  
  // First try to match subcategory (more specific)
  if (proSubCat) {
    // proSubCat format is usually "SubCategory,Type" (e.g., "Apartment,Residential")
    const subCatParts = proSubCat.split(",");
    const subCategory = subCatParts[0]?.trim();
    
    if (subCategory && siteConfig.defaultImages[subCategory]) {
      return siteConfig.defaultImages[subCategory];
    }
  }
  
  // Fallback to property type
  if (proType && siteConfig.defaultImages[proType]) {
    return siteConfig.defaultImages[proType];
  }
  
  // Final fallback
  return siteConfig.defaultImages.default;
}

export const getUploadImagePath = (fileName) => {
  if (!fileName) {
    return getSiteImagePath(siteConfig.seo.businessImage);
  }
  if (fileName.startsWith("http")) {
    return fileName;
  }
  if (fileName.startsWith("/")) {
    return fileName;
  }
  return `/uploads/${fileName}`;
};

export const getUploadImageUrl = (fileName) => {
  if (!fileName) {
    return getBusinessImageUrl();
  }
  if (fileName.startsWith("http")) {
    return fileName;
  }
  if (fileName.startsWith("/")) {
    return `${siteConfig.url}${fileName}`;
  }
  return `${siteConfig.url}/uploads/${fileName}`;
};

export const getDefaultImageFile = (proType, proSubCat) =>
  getDefaultImage(proType, proSubCat);

const buildImagePath = (value) => {
  if (!value) {
    return getSiteImagePath(siteConfig.seo.defaultImage);
  }
  if (value.startsWith("http")) {
    return value;
  }
  if (value.startsWith("/")) {
    return value;
  }
  return getUploadImagePath(value);
};

const buildImageUrl = (value) => {
  if (!value) {
    return getBusinessImageUrl();
  }
  if (value.startsWith("http")) {
    return value;
  }
  if (value.startsWith("/")) {
    return `${siteConfig.url}${value}`;
  }
  return getUploadImageUrl(value);
};

export function getDefaultImagePath(proType, proSubCat) {
  const fileName = getDefaultImageFile(proType, proSubCat);
  return buildImagePath(fileName);
}

export function getDefaultImageUrl(proType, proSubCat) {
  const fileName = getDefaultImageFile(proType, proSubCat);
  return buildImageUrl(fileName);
}

export const getGalleryFallbackImageFile = () =>
  siteConfig.assets?.galleryFallback || siteConfig.defaultImages.default;

export const getGalleryFallbackImagePath = () =>
  buildImagePath(getGalleryFallbackImageFile());

export const getGalleryFallbackImageUrl = () =>
  buildImageUrl(getGalleryFallbackImageFile());

export default siteConfig;
