import BreadcrumbSection from '@/components/common/BreadcrumbSection'
import Address from '@/components/contact/Address'
import ContactForm from '@/components/contact/ContactForm'
import React from 'react'
import { getBusinessImageUrl } from '@/app/config/site'

const BUSINESS_IMAGE = getBusinessImageUrl()

// SEO Metadata
export const metadata = {
  title: 'Contact Us - Get in Touch | Landmark Plots',
  description: 'Contact Landmark Plots for all your real estate needs. Get expert guidance on property buying, selling, and investment. Call us or fill our contact form for immediate assistance.',
  keywords: 'contact Landmark Plots, real estate contact, property consultation, property expert, Landmark Plots contact details',
    openGraph: {
    title: 'Contact Us - Get in Touch | Landmark Plots',
    description: 'Contact Landmark Plots for all your real estate needs. Get expert guidance on property buying, selling, and investment. Call us or fill our contact form for immediate assistance.',
    url: 'https://landmarkplots.com/contactus',
    siteName: 'Landmark Plots',
      images: [
        {
        url: BUSINESS_IMAGE,
          width: 1200,
          height: 630,
        alt: 'Contact Landmark Plots',
        },
      ],
    locale: 'en_IN',
    type: 'website',
    },
    twitter: {
    card: 'summary_large_image',
    title: 'Contact Us - Get in Touch | Landmark Plots',
    description: 'Contact Landmark Plots for all your real estate needs. Get expert guidance on property buying, selling, and investment. Call us or fill our contact form for immediate assistance.',
    images: [BUSINESS_IMAGE],
  },
  alternates: {
    canonical: 'https://landmarkplots.com/contactus',
  },
};

const page = () => {  
  return (
    <main class="main__content_wrapper">
      <BreadcrumbSection val1={"Contact"} val2={"Us"} />
      <section class="contact__section section--padding">
            <div class="container">
                <div class="contact__inner">
                    <Address />
                    <ContactForm />
                </div>
            </div>
      </section>
    </main>
  )
}

export default page
