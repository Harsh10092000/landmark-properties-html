import React from 'react'
import HsvpClient from './HsvpClient'
import Head from 'next/head'


export const metadata = {
  title: 'HSVP Private Property Sale–Purchase Portal | Guide, Policy PDF, Highlights',
  description: 'Know about HSVP (Haryana Shehri Vikas Pradhikaran) Private Property Sale–Purchase Portal: policy, process handbook (valid till 31.12.2025), benefits, who can use, and how Landmark Plots can help you sell/buy in HSVP sectors.',
  keywords: 'HSVP private property sale purchase, HSVP policy PDF, Haryana Shehri Vikas Pradhikaran portal, HSVP auction, HSVP e-auction, HSVP portal handbook, HSVP Panchkula policy, HSVP Gurugram, HSVP Faridabad, HSVP Hisar, HSVP Rohtak',
  robots: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
  openGraph: {
    title: 'HSVP Private Property Sale–Purchase Portal | Guide, Policy PDF, Highlights',
    description: 'Official initiative by HSVP for transparent sale-purchase of private properties in HSVP sectors. Read the highlights, benefits and download the policy handbook.',
    url: 'https://landmarkplots.com/hsvp-private-property-sale-purpose-portal',
    siteName: 'Landmark Plots',
    images: [
      {
        url: 'https://landmarkplots.com/uploads/default.jpg',
        width: 1200,
        height: 630,
        alt: 'HSVP Private Property Sale Purchase Portal',
      },
    ],
    locale: 'en_IN',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HSVP Private Property Sale–Purchase Portal | Guide, Policy PDF, Highlights',
    description: 'Transparent, digital, policy-compliant HSVP private property sale–purchase portal. Highlights, FAQs, handbook PDF, and seller/buyer journey.',
    images: ['https://landmarkplots.com/uploads/default.jpg'],
  },
  alternates: {
    canonical: 'https://landmarkplots.com/hsvp-private-property-sale-purpose-portal',
    languages: {
      'en-IN': 'https://landmarkplots.com/hsvp-private-property-sale-purpose-portal',
    },
  },
};



const page = () => {
  return (
    <>
      <Head>
        {/* Structured Data: WebSite with SearchAction */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Landmark Plots",
              "url": "https://landmarkplots.com/",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://landmarkplots.com/search/results?search={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />

        {/* Structured Data: Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Landmark Plots",
              "url": "https://landmarkplots.com/",
              "logo": "https://landmarkplots.com/uploads/default.jpg",
              "sameAs": [
                "https://landmarkplots.com/"
              ]
            })
          }}
        />

        {/* Structured Data: WebPage/Article */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              "headline": "HSVP Private Property Sale–Purchase Portal | Guide, Policy PDF, Highlights",
              "description": "Transparent, digital HSVP private property sale–purchase portal: handbook PDF, highlights, seller/buyer journey, FAQs.",
              "author": { "@type": "Organization", "name": "Landmark Plots" },
              "publisher": { 
                "@type": "Organization", 
                "name": "Landmark Plots", 
                "logo": { 
                  "@type": "ImageObject", 
                  "url": "https://landmarkplots.com/uploads/default.jpg" 
                } 
              },
              "mainEntityOfPage": { 
                "@type": "WebPage", 
                "@id": "https://landmarkplots.com/hsvp-private-property-sale-purpose-portal" 
              },
              "image": ["https://landmarkplots.com/uploads/default.jpg"],
              "url": "https://landmarkplots.com/hsvp-private-property-sale-purpose-portal",
              "datePublished": "2024-01-01",
              "dateModified": "2024-12-19"
            })
          }}
        />

        {/* Structured Data: Breadcrumb */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://landmarkplots.com/"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "HSVP Private Property Portal",
                  "item": "https://landmarkplots.com/hsvp-private-property-sale-purpose-portal"
                }
              ]
            })
          }}
        />

        {/* Structured Data: FAQPage */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "Who can list on the HSVP portal?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "HSVP allottees/plot holders who wish to sell their private property in notified HSVP sectors."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Is participation compulsory?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "No. As per the handbook, participation is voluntary. The seller can accept or reject the highest bid within policy timelines."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What is the bidding/e-auction process?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "After verification, the property is listed on the portal. Buyers register and participate in digital bidding. Payments and the process trail are transparent."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How are documents and timelines managed?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The Estate Office scrutinizes the Expression of Interest (EOI) through the PPM workflow. Post-acceptance, token/consideration and transfer permissions follow the policy."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What is the role of Landmark Plots?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "We provide listing, marketing, buyer outreach, documentation assistance, and guided onboarding for HSVP sector properties."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Where can I get help/support?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "For official queries, contact HSVP via the contact points (telephone/toll-free on the website) or the Estate Office. For listing/marketing help, contact Landmark Plots via /contactus."
                  }
                }
              ]
            })
          }}
        />

        {/* Structured Data: Service */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              "name": "HSVP Property Sale Purchase Assistance",
              "description": "Professional assistance for HSVP private property sale and purchase through the official portal",
              "provider": {
                "@type": "Organization",
                "name": "Landmark Plots",
                "url": "https://landmarkplots.com/"
              },
              "serviceType": "Real Estate Services",
              "areaServed": {
                "@type": "State",
                "name": "Haryana"
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "HSVP Property Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Property Listing Assistance"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Documentation Support"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Buyer Outreach"
                    }
                  }
                ]
              }
            })
          }}
        />
      </Head>
      <HsvpClient />
    </>
  )
}

export default page