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
    "Residential": "default.jpg",
    "Commercial": "default.jpg",
    "Land": "default.jpg",
    // Residential subcategories
    "Apartment": "default.jpg",
    "Independent House": "default.jpg",
    "Builder Floor": "default.jpg",
    "Farm House": "default.jpg",
    "Raw House": "default.jpg",
    "Retirement Community": "default.jpg",
    "Studio Apartment": "default.jpg",
    "RK": "default.jpg",
    // Land subcategories
    "Residential Land": "default.jpg",
    "Commercial Land": "default.jpg",
    "Industrial Land": "default.jpg",
    "Agricultural Land": "default.jpg",
    "Farm House Land": "default.jpg",
    "Institutional Land": "default.jpg",
    // Commercial subcategories
    "Retail Showroom": "default.jpg",
    "Commercial Building": "default.jpg",
    "Office Complex": "default.jpg",
    "Software Technology Park": "default.jpg",
    "Warehouse": "default.jpg",
    "Industrial Estate": "default.jpg",
    "Institutional Building": "default.jpg",
    "Petrol Pump": "default.jpg",
    "Cold Store": "default.jpg",
    // Fallback
    "default": "default.jpg"
  }
};

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

export default siteConfig;
