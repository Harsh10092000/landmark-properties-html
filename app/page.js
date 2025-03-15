import About from '@/components/index/about/About'
import ChooseUs from '@/components/index/chooseUs/ChooseUs'
import CityBanner from '@/components/index/cityBanner/CityBanner'
import Hero from '@/components/index/hero/Hero'
import PropertyByType from '@/components/index/propertyByType/PropertyByType'
import Reviews from '@/components/index/reviews/Reviews'
import Services from '@/components/index/services/Services'
import TrendingProperties from '@/components/index/trendingProperties/TrendingProperties'
import React from 'react'

const page = () => {
  return (
    <>
      <Hero />
      <About />
      <TrendingProperties />
      <Services />
      <ChooseUs />
      <PropertyByType />
      <CityBanner />
      <Reviews />
    </>
  )
}

export default page
