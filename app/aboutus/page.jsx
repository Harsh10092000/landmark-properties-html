import MostPopularCities from '@/components/about/MostPopularCities'
import PropertiesCategories from '@/components/about/PropertiesCategories'
import Section1 from '@/components/about/Section1'
import BreadcrumbSection from '@/components/common/BreadcrumbSection'
import Reviews from '@/components/common/Reviews'
import React from 'react'
import { getBusinessImageUrl } from '@/app/config/site'

const BUSINESS_IMAGE = getBusinessImageUrl()

const page = () => {
  return (
    <main class="main__content_wrapper">
    
          <title>About Us | Landmark Plots</title>
          <meta name="description" content="Landmark Plots is a leading real estate company in India. We are a team of experienced professionals who are dedicated to providing the best possible service to our clients." />
          <meta name="keywords" content="Landmark Plots, real estate, properties, apartments, villas, plots, flats, houses, commercial spaces, investment, property management, property development, property consultancy, property valuation, property marketing, property sales, property rentals, property auctions, property transactions, property agreements, property laws, property regulations, property policies, property guidelines, property tips, property advice, property news, property updates, property trends, property analysis, property research, property surveys, property reports, property studies, property analysis, property research, property surveys, property reports, property studies" />
          <meta name="author" content="Landmark Plots" />
          <meta property="og:title" content="About Us | Landmark Plots" />
          <meta property="og:description" content="Landmark Plots is a leading real estate company in India. We are a team of experienced professionals who are dedicated to providing the best possible service to our clients." />
          <meta property="og:image" content={BUSINESS_IMAGE} />
          <meta property="og:url" content="https://landmarkplots.com/aboutus" />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="Landmark Plots" />
      
        <BreadcrumbSection val1={"About"} val2={"Us"} />
        <Section1 />
        <PropertiesCategories />
        <MostPopularCities />
        <Reviews />
    </main>
  )
}

export default page
