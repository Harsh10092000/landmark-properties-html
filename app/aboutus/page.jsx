import MostPopularCities from '@/components/about/MostPopularCities'
import PropertiesCategories from '@/components/about/PropertiesCategories'
import Section1 from '@/components/about/Section1'
import BreadcrumbSection from '@/components/common/BreadcrumbSection'
import Reviews from '@/components/common/Reviews'
import React from 'react'

const page = () => {
  return (
    <main class="main__content_wrapper">
        <BreadcrumbSection val1={"About"} val2={"Us"} />
        <Section1 />
        <PropertiesCategories />
        <MostPopularCities />
        <Reviews />
    </main>
  )
}

export default page
