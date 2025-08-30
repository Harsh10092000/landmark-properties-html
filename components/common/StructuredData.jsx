import React from 'react';
import { siteConfig } from '@/app/config/site';

const StructuredData = () => {
  // Website schema data
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": siteConfig.name,
    "alternateName": siteConfig.businessName,
    "url": siteConfig.url,
    "description": siteConfig.description,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${siteConfig.url}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": siteConfig.businessName,
      "url": siteConfig.url
    }
  };

  // Real Estate Agent schema data
  const realEstateAgentSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": siteConfig.businessName,
    "alternateName": siteConfig.name,
    "legalName": siteConfig.business.fullBusinessName,
    "url": siteConfig.url,
    "description": siteConfig.description,
    "telephone": siteConfig.contact.phone,
    "email": siteConfig.contact.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": siteConfig.business.address.streetAddress,
      "addressLocality": siteConfig.business.address.city,
      "addressRegion": siteConfig.business.address.region,
      "addressCountry": siteConfig.business.address.country,
      "postalCode": siteConfig.business.address.postalCode
    },
    "areaServed": {
      "@type": "Place",
      "name": siteConfig.business.primaryArea
    },
    "serviceType": siteConfig.business.services,
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Property Listings",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Property Sales",
            "description": "Buy and sell residential, commercial, and land properties"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Service",
            "name": "Property Rentals",
            "description": "Rent residential and commercial properties"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Construction Services",
            "description": "Professional construction and development services"
          }
        }
      ]
    },
    "sameAs": [
      siteConfig.url,
      siteConfig.social.instagram
    ]
  };

  // Local Business schema for better local SEO
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": siteConfig.businessName,
    "alternateName": siteConfig.name,
    "legalName": siteConfig.business.fullBusinessName,
    "url": siteConfig.url,
    "description": siteConfig.description,
    "telephone": siteConfig.contact.phone,
    "email": siteConfig.contact.email,
    "image": `${siteConfig.url}${siteConfig.seo.businessImage}`,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": siteConfig.business.address.streetAddress,
      "addressLocality": siteConfig.business.address.city,
      "addressRegion": siteConfig.business.address.region,
      "addressCountry": siteConfig.business.address.country,
      "postalCode": "136118"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "29.9695",
      "longitude": "76.8783"
    },
    "hasMap": siteConfig.business.hasMap,
    "openingHours": siteConfig.business.openingHours,
    "priceRange": siteConfig.business.priceRange,
    "paymentAccepted": siteConfig.business.paymentAccepted,
    "currenciesAccepted": siteConfig.business.currenciesAccepted,
    "areaServed": {
      "@type": "Place",
      "name": siteConfig.business.primaryArea
    },
    "serviceType": siteConfig.business.services,
    "foundingDate": siteConfig.business.foundingDate,
    "sameAs": [
      siteConfig.url,
      siteConfig.social.instagram
    ]
  };

  // Organization schema for additional SEO benefits
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": siteConfig.businessName,
    "alternateName": siteConfig.name,
    "legalName": siteConfig.business.fullBusinessName,
    "url": siteConfig.url,
    "logo": {
      "@type": "ImageObject",
      "url": `${siteConfig.url}${siteConfig.seo.logo}`,
      "width": 32,
      "height": 32
    },
    "image": {
      "@type": "ImageObject",
      "url": `${siteConfig.url}${siteConfig.seo.businessImage}`,
      "width": 800,
      "height": 600
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": siteConfig.contact.phone,
      "contactType": "customer service",
      "availableLanguage": siteConfig.seo.languages
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": siteConfig.business.address.streetAddress,
      "addressLocality": siteConfig.business.address.city,
      "addressRegion": siteConfig.business.address.region,
      "addressCountry": siteConfig.business.address.country
    },
    "sameAs": [
      siteConfig.url,
      siteConfig.social.instagram
    ]
  };

  // Customer Reviews Schema for social proof and SEO boost
  const reviewsSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": siteConfig.businessName,
    "alternateName": siteConfig.name,
    "legalName": siteConfig.business.fullBusinessName,
    "url": siteConfig.url,
    "description": siteConfig.description,
    "telephone": siteConfig.contact.phone,
    "email": siteConfig.contact.email,
    "image": `${siteConfig.url}${siteConfig.seo.businessImage}`,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": siteConfig.business.address.streetAddress,
      "addressLocality": siteConfig.business.address.city,
      "addressRegion": siteConfig.business.address.region,
      "addressCountry": siteConfig.business.address.country,
      "postalCode": siteConfig.business.address.postalCode
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "25",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": [
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Anonymous Customer"
        },
        "reviewBody": "I had an amazing experience with Landmark Properties in Kurukshetra. They truly understand the local real estate market and helped me buy a perfect residential plot in a gated society. Highly professional and trustworthy team!",
        "datePublished": "2024-12-20"
      },
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Sahil Gaba"
        },
        "reviewBody": "I was searching for a residential plot in Kurukshetra. A friend recommended Landmark Properties. They really helped me find a good plot within my budget. Very professional and supportive team. If you're looking for plots or any property in Kurukshetra, Karnal, or Ambala, definitely give them a call.",
        "datePublished": "2024-10-15"
      },
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": "DHRUV YADAV"
        },
        "reviewBody": "I recently got my dream home in Ansal, Karnal, all thanks to Landmark Properties. I'm extremely grateful to my friend Deepak, who helped me in the entire process—from property visit to final paperwork—was smooth, transparent, and professional. If you're looking for a house for Sale, Rent or Buy in Kurukshetra, Karnal, or in nearby areas, Landmark Properties is the name to trust.",
        "datePublished": "2024-10-10"
      },
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Siddharth Kabir"
        },
        "reviewBody": "Landmark Properties helped quickly and smoothly. Really good experience. They also have the widest range of plots and properties in Kurukshetra, Karnal, and Ambala. If you're looking to rent or buy, definitely check them out.",
        "datePublished": "2024-10-08"
      },
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Varun Kaushik"
        },
        "reviewBody": "Had a 10x40 SCO in Kurukshetra that I wanted to sell. Tried through local contacts, but nothing worked. Then got in touch with Landmark Properties. They understood the requirement and found a serious buyer quickly. Very smooth dealing, no time waste. Best if you want to sell commercial property in Kurukshetra or nearby.",
        "datePublished": "2024-10-05"
      },
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Mohit Khurana"
        },
        "reviewBody": "1 of my relative was looking for a rental house in Kurukshetra, tried many places but nothing worked. Someone suggested Landmark Properties. They showed me a good house the next day. No hassle, smooth process. Genuine property dealers – highly recommend if you're searching for rental properties in Kurukshetra.",
        "datePublished": "2024-10-03"
      }
    ]
  };

  // FAQ Schema for better Google rankings and featured snippets
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do I find the best property deals on LandmarkPlots?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "LandmarkPlots offers multiple ways to discover exceptional property deals. Use our advanced search filters to narrow down properties by location, price range, property type, and amenities. Set up property alerts to receive notifications about new listings matching your criteria. Our featured properties section showcases premium deals, while our 'Hot Deals' category highlights time-sensitive opportunities. Additionally, our expert property consultants can provide personalized recommendations based on your specific requirements and budget."
        }
      },
      {
        "@type": "Question",
        "name": "What documents do I need to buy a property in India?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "When purchasing property in India, you'll need several essential documents: Sale Deed or Title Deed proving ownership, Encumbrance Certificate showing no pending loans, Property Tax Receipts, Building Approval Plans, Completion Certificate for constructed properties, and No Objection Certificates (NOCs) from relevant authorities. For financing, prepare income proof, bank statements, and identity documents. Always verify document authenticity through legal professionals and conduct thorough due diligence before finalizing any property transaction."
        }
      },
      {
        "@type": "Question",
        "name": "How can I verify if a property is legally clear?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Property verification involves multiple steps: Check the Sale Deed for clear title transfer history, obtain an Encumbrance Certificate from the Sub-Registrar's office, verify building approvals and completion certificates with local authorities, confirm property tax payments are up-to-date, and check for any pending litigation. Our platform provides property verification services, and we recommend consulting with legal experts for comprehensive due diligence. Always verify seller credentials and cross-check all documents with government records."
        }
      },
      {
        "@type": "Question",
        "name": "What are the hidden costs when buying property?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Beyond the property price, consider these additional costs: Stamp Duty and Registration charges (typically 5-8% of property value), Legal fees for documentation and verification, Property tax and maintenance charges, Home loan processing fees and insurance, Interior decoration and furnishing costs, Utility connection charges, and Society maintenance fees for apartments. Budget an additional 10-15% of the property value for these expenses. Our property cost calculator helps estimate total investment requirements accurately."
        }
      },
      {
        "@type": "Question",
        "name": "How do I choose between buying and renting?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Consider these factors: Buying offers long-term investment benefits, equity building, and stability, while renting provides flexibility and lower upfront costs. Calculate the price-to-rent ratio in your area - if it's below 15, buying might be favorable. Consider your financial stability, job security, and long-term plans. Factor in maintenance costs, property appreciation potential, and tax benefits. Our financial advisors can help analyze your specific situation and provide personalized recommendations for optimal decision-making."
        }
      },
      {
        "@type": "Question",
        "name": "What are the best areas for property investment in major cities?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Prime investment areas vary by city: In Mumbai, consider Bandra Kurla Complex, Powai, and Thane for high returns. Delhi NCR offers opportunities in Dwarka Expressway, Noida Extension, and Greater Noida. Bangalore's tech corridors like Whitefield, Electronic City, and Sarjapur Road show strong growth. Hyderabad's HITEC City, Gachibowli, and Financial District are emerging hotspots. Look for areas with upcoming infrastructure projects, good connectivity, and planned developments. Our market analysis reports provide detailed insights into emerging investment opportunities."
        }
      },
      {
        "@type": "Question",
        "name": "How do I negotiate the best property price?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Effective negotiation requires preparation: Research recent sales in the area to understand market rates, identify property issues that can justify lower offers, get pre-approved financing to show serious intent, and be ready to walk away if terms aren't favorable. Consider asking for seller concessions like covering closing costs or repairs. Our negotiation experts can guide you through the process and help you secure the best possible deal while maintaining professional relationships."
        }
      },
      {
        "@type": "Question",
        "name": "What should I check before buying a resale property?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Thorough inspection is crucial: Check structural integrity and signs of water damage, verify all electrical and plumbing systems, inspect for pest infestations, review society rules and pending dues for apartments, verify parking allocation and storage spaces, check neighborhood safety and amenities, review maintenance history and upcoming repairs, and confirm utility connections and meter readings. Our property inspection services provide comprehensive evaluation reports to help you make informed decisions."
        }
      },
      {
        "@type": "Question",
        "name": "How do I calculate property appreciation potential?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Property appreciation depends on multiple factors: Location development plans and infrastructure projects, economic growth in the area, supply and demand dynamics, government policies and regulations, and overall market trends. Research historical price trends in the locality, upcoming infrastructure developments, and planned commercial projects. Consider factors like proximity to transportation hubs, educational institutions, and healthcare facilities. Our market analysis tools provide detailed appreciation projections based on comprehensive data analysis."
        }
      },
      {
        "@type": "Question",
        "name": "What are the tax benefits of property investment?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Property investment offers several tax advantages: Home loan interest deduction up to ₹2 lakhs annually under Section 24(b), principal repayment deduction up to ₹1.5 lakhs under Section 80C, additional deduction of ₹1.5 lakhs for first-time homebuyers under Section 80EE, property tax deductions, and capital gains benefits for long-term investments. Consult with tax professionals to maximize your benefits and ensure compliance with all applicable regulations."
        }
      },
      {
        "@type": "Question",
        "name": "How do I list my property for sale on LandmarkPlots?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Listing your property is simple: Create an account on LandmarkPlots, click 'Add Listing' in the header, fill in detailed property information including location, price, amenities, and high-quality photographs, provide accurate contact details, and submit for review. Our team verifies all information before publishing. Premium listings with professional photography and virtual tours receive higher visibility. We also offer marketing support to maximize your property's exposure to potential buyers."
        }
      },
      {
        "@type": "Question",
        "name": "What makes LandmarkPlots different from other property websites?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "LandmarkPlots stands out through our comprehensive approach: We offer verified property listings with detailed documentation, personalized consultation services, advanced search and filtering options, market analysis and investment guidance, professional photography and virtual tour services, legal verification support, and post-sale assistance. Our platform combines technology with human expertise to provide a seamless property buying and selling experience. We prioritize transparency, accuracy, and customer satisfaction in all our services."
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(realEstateAgentSchema)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(reviewsSchema)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema)
        }}
      />
    </>
  );
};

export default StructuredData;
