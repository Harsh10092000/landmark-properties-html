import BreadcrumbSection from '@/components/common/BreadcrumbSection'
import Address from '@/components/contact/Address'
import ContactForm from '@/components/contact/ContactForm'
import React from 'react'

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
