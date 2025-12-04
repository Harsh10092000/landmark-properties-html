import React from 'react';
import FaqClinet from './FaqClinet';
import { getBusinessImageUrl } from '@/app/config/site';

const BUSINESS_IMAGE = getBusinessImageUrl();

// SEO Metadata
export const metadata = {
  title: 'FAQ - Frequently Asked Questions | Landmark Plots',
  description: 'Find answers to common questions about property buying, selling, and real estate investment in India. Expert guidance on property deals, legal documents, and investment strategies.',
  keywords: 'FAQ, property questions, real estate India, property buying guide, property investment, Landmark Plots FAQ',
  openGraph: {
    title: 'FAQ - Frequently Asked Questions | Landmark Plots',
    description: 'Find answers to common questions about property buying, selling, and real estate investment in India. Expert guidance on property deals, legal documents, and investment strategies.',
    url: 'https://landmarkplots.com/faq',
    siteName: 'Landmark Plots',
    images: [
      {
        url: BUSINESS_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Landmark Plots FAQ',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FAQ - Frequently Asked Questions | Landmark Plots',
    description: 'Find answers to common questions about property buying, selling, and real estate investment in India. Expert guidance on property deals, legal documents, and investment strategies.',
    images: [BUSINESS_IMAGE],
  },
  alternates: {
    canonical: 'https://landmarkplots.com/faq',
  },
};

// FAQ Schema for this specific page
const generateFAQSchema = () => {
  return {
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
};

const FAQPage = () => {
  const faqSchema = generateFAQSchema();

  return (
    <>
      {/* FAQ Schema for this specific page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema)
        }}
      />
      <FaqClinet />
    </>
  );
};

export default FAQPage;

