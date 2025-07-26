import BreadcrumbSection from '@/components/common/BreadcrumbSection'
import Address from '@/components/contact/Address'
import ContactForm from '@/components/contact/ContactForm'
import React from 'react'
import Head from 'next/head'
const page = () => {  
  return (
    <main class="main__content_wrapper">
      <Head>
        <title>Contact Us | Landmark Plots</title>
        <meta name="description" content="Contact Us | Landmark Plots" />
        <meta name="keywords" content="Contact Us, Landmark Plots" />
        <meta name="author" content="Landmark Plots" />
        <meta name='canonical' content='https://landmarkplots.com/contactus' />
        <meta property="og:title" content="Contact Us | Landmark Plots" />
        <meta property="og:description" content="Contact Us | Landmark Plots" />
        <meta property="og:image" content="https://landmarkplots.com/uploads/default.jpg" />
        <meta property="og:url" content="https://landmarkplots.com/contactus" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Landmark Plots" />
      </Head>
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
