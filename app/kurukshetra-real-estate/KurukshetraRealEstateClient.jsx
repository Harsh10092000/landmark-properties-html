"use client";
import React from 'react';
import BreadcrumbSection from '@/components/common/BreadcrumbSection';
import TrendingProperties from '@/components/index/trendingProperties/TrendingProperties';
import Reviews from '@/components/common/Reviews';

const KurukshetraRealEstateClient = ({ currentUser, kurukshetraProperties, pageStructuredData }) => {
  return (
    <main className="main__content_wrapper">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(pageStructuredData)
        }}
      />
      
      {/* Breadcrumb */}
      <BreadcrumbSection val1={"Kurukshetra"} val2={"Real Estate"} />

      {/* Hero Section - HSVP Style */}
      <section className="pt-50 pb-40 kurukshetra-hero sect-padding">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-8">
              <article className="kurukshetra-heroCard">
                <span className="kurukshetra-badge">Premium Properties • Kurukshetra</span>
                <h1 className="kurukshetra-title">Real Estate in Kurukshetra</h1>
                <p className="kurukshetra-lead">Discover the best real estate opportunities in Kurukshetra with Landmark Properties. We specialize in residential, commercial properties, and land plots with expert consultation services.</p>
                <p className="kurukshetra-lead">Whether you're looking to buy, sell, or rent properties in Kurukshetra, our experienced team provides comprehensive real estate solutions tailored to your needs. From modern apartments to commercial spaces and investment plots.</p>

                <div className="kurukshetra-card mt-2">
                  <h2 className="kurukshetra-h2">Why Choose Kurukshetra for Real Estate?</h2>
                  <ul className="kurukshetra-bullets">
                    <li><span className="kurukshetra-bullet-ico" aria-hidden>1</span><span>Strategic location with excellent connectivity to Delhi and Chandigarh</span></li>
                    <li><span className="kurukshetra-bullet-ico" aria-hidden>2</span><span>Growing infrastructure and development projects</span></li>
                    <li><span className="kurukshetra-bullet-ico" aria-hidden>3</span><span>Affordable property prices compared to major cities</span></li>
                    <li><span className="kurukshetra-bullet-ico" aria-hidden>4</span><span>Educational institutions and healthcare facilities nearby</span></li>
                    <li><span className="kurukshetra-bullet-ico" aria-hidden>5</span><span>Strong rental yield potential for investors</span></li>
                  </ul>
                </div>

                <div className="kurukshetra-card mt-3">
                  <h2 className="kurukshetra-h2">Property Types Available</h2>
                  <div className="row g-3 kurukshetra-stack">
                    <div className="col-sm-6">
                      <div className="kurukshetra-chip h-100">
                        <div className="kurukshetra-chip-title">Residential Properties</div>
                        <ul className="kurukshetra-mini">
                          <li>2BHK, 3BHK, 4BHK apartments</li>
                          <li>Independent houses and villas</li>
                          <li>Builder floors and duplexes</li>
                          <li>Residential plots for construction</li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="kurukshetra-chip h-100">
                        <div className="kurukshetra-chip-title">Commercial Properties</div>
                        <ul className="kurukshetra-mini">
                          <li>Shops and retail spaces</li>
                          <li>Office spaces and IT parks</li>
                          <li>Warehouses and godowns</li>
                          <li>Commercial plots for development</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="d-flex gap-2 flex-wrap mt-2">
                  <a className="btn kurukshetra-btn" href="/properties-for-sale">View Properties for Sale</a>
                  <a className="btn kurukshetra-btn-alt" href="/properties-for-rent">View Properties for Rent</a>
                </div>
              </article>
            </div>

            <div className="col-lg-4">
            
              <div className="kurukshetra-aside-card mt-3">
                <div className="kurukshetra-aside-header">
                  <div className="kurukshetra-aside-ico" aria-hidden>📞</div>
                  <div>
                    <div className="kurukshetra-aside-title">Get Expert Consultation</div>
                    <div className="kurukshetra-aside-sub">Free property consultation in Kurukshetra</div>
                  </div>
                </div>
                <div className="kurukshetra-aside-actions">
                  <a className="btn kurukshetra-btn" href="/contactus">Contact Us</a>
                </div>
              </div>
              <div className="kurukshetra-aside-card mt-3">
                <div className="kurukshetra-aside-header">
                  <div className="kurukshetra-aside-ico" aria-hidden>🏠</div>
                  <div>
                    <div className="kurukshetra-aside-title">Popular Areas</div>
                    <div className="kurukshetra-aside-sub">Top locations in Kurukshetra</div>
                  </div>
                </div>
                <ul className="kurukshetra-area-list">
                  <li className="kurukshetra-area-item"><span className="kurukshetra-area-name">Sector 7</span><span className="kurukshetra-area-pill">Premium</span></li>
                  <li className="kurukshetra-area-item"><span className="kurukshetra-area-name">Sector 13</span><span className="kurukshetra-area-pill">Residential</span></li>
                  <li className="kurukshetra-area-item"><span className="kurukshetra-area-name">Pehowa Road</span><span className="kurukshetra-area-pill">Commercial</span></li>
                  <li className="kurukshetra-area-item"><span className="kurukshetra-area-name">Railway Road</span><span className="kurukshetra-area-pill">Mixed</span></li>
                  <li className="kurukshetra-area-item"><span className="kurukshetra-area-name">Thanesar</span><span className="kurukshetra-area-pill">Heritage</span></li>
                </ul>
              </div>
              <div className="kurukshetra-aside-card mt-3">
                <div className="kurukshetra-aside-header">
                  <div className="kurukshetra-aside-ico" aria-hidden>🗺️</div>
                  <div>
                    <div className="kurukshetra-aside-title">Kurukshetra Maps</div>
                    <div className="kurukshetra-aside-sub">Explore property locations</div>
                  </div>
                </div>
                <div className="kurukshetra-aside-actions">
                  <a className="btn kurukshetra-btn" href="/kurukshetra-maps">View Maps</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-box bg-white p-3">
                <TrendingProperties data={kurukshetraProperties} currentUser={currentUser} />
              </div>

      {/* Services Section - HSVP Style */}
      <section className="sect-padding">
        <div className="container">
          <h2 className="mb-3 kurukshetra-h2">Our Services in Kurukshetra</h2>
          <div className="row g-3 kurukshetra-stack">
            <div className="col-md-4 col-sm-6">
              <div className="kurukshetra-feature">
                <div className="kurukshetra-feature-ico">🏠</div>
                <div className="kurukshetra-feature-title">Property Buying</div>
              </div>
            </div>
            <div className="col-md-4 col-sm-6">
              <div className="kurukshetra-feature">
                <div className="kurukshetra-feature-ico">💰</div>
                <div className="kurukshetra-feature-title">Property Selling</div>
              </div>
            </div>
            <div className="col-md-4 col-sm-6">
              <div className="kurukshetra-feature">
                <div className="kurukshetra-feature-ico">🔑</div>
                <div className="kurukshetra-feature-title">Property Renting</div>
              </div>
            </div>
            <div className="col-md-4 col-sm-6">
              <div className="kurukshetra-feature">
                <div className="kurukshetra-feature-ico">📋</div>
                <div className="kurukshetra-feature-title">Legal Documentation</div>
              </div>
            </div>
            <div className="col-md-4 col-sm-6">
              <div className="kurukshetra-feature">
                <div className="kurukshetra-feature-ico">🏢</div>
                <div className="kurukshetra-feature-title">Commercial Properties</div>
              </div>
            </div>
            <div className="col-md-4 col-sm-6">
              <div className="kurukshetra-feature">
                <div className="kurukshetra-feature-title">Investment Consultation</div>
              </div>
            </div>
          </div>
        </div>
      </section>

    

      {/* CTA Section - HSVP Style */}
      <section className="sect-padding">
        <div className="container">
          <div className="kurukshetra-super-cta">
            <div className="kurukshetra-super-cta__left">
              <div className="kurukshetra-super-cta__icon" aria-hidden>📞</div>
              <div>
                <h3 className="kurukshetra-super-cta__title">Need help with Kurukshetra Real Estate?</h3>
                <p className="kurukshetra-super-cta__text">Talk to our Kurukshetra specialists for buying, selling, and renting properties.</p>
              </div>
            </div>
            <div className="kurukshetra-super-cta__actions">
              <a className="btn kurukshetra-btn" href="/contactus">Contact Us</a>
              <a className="btn kurukshetra-btn-alt" href="/allproperties">Browse All Properties</a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="sect-padding">
        <div className="container">
          <h2 className="mb-3 kurukshetra-h2">Frequently Asked Questions</h2>
          <div className="row">
            <div className="col-lg-6">
              <div className="accordion__wrapper">
                {[
                  {
                    q: "What types of properties are available in Kurukshetra?",
                    a: "Kurukshetra offers a wide range of properties including residential apartments (2BHK, 3BHK, 4BHK), independent houses, villas, commercial spaces, shops, office spaces, and both residential and commercial plots for investment and development."
                  },
                  {
                    q: "Is Kurukshetra a good place for real estate investment?",
                    a: "Yes, Kurukshetra is an excellent choice for real estate investment due to its strategic location between Delhi and Chandigarh, growing infrastructure, affordable property prices compared to major cities, and strong rental yield potential."
                  },
                  {
                    q: "What are the popular areas in Kurukshetra for property investment?",
                    a: "Popular areas include Sector 7 (premium), Sector 13 (residential), Pehowa Road (commercial), Railway Road (mixed use), and Thanesar (heritage area). Each area offers unique advantages for different types of investments."
                  },
                  {
                    q: "How can Landmark Properties help me buy/sell property in Kurukshetra?",
                    a: "We provide comprehensive services including property search and verification, legal documentation assistance, market analysis, negotiation support, and end-to-end transaction management to ensure a smooth buying or selling experience."
                  },
                  {
                    q: "What are the current property prices in Kurukshetra?",
                    a: "Property prices in Kurukshetra vary by location and type. Residential properties typically range from ₹3,000-8,000 per sq ft, while commercial properties range from ₹5,000-12,000 per sq ft. Contact us for current market rates and specific property valuations."
                  },
                  {
                    q: "Are there any upcoming infrastructure projects in Kurukshetra?",
                    a: "Yes, Kurukshetra is witnessing several infrastructure developments including road connectivity improvements, educational institutions, healthcare facilities, and commercial complexes that are enhancing the city's real estate value."
                  }
                ].map((item, idx) => (
                  <details key={idx} className="kurukshetra-faq">
                    <summary className="kurukshetra-faq-q">{item.q}</summary>
                    <div className="kurukshetra-faq-a">{item.a}</div>
                  </details>
                ))}
              </div>
            </div>
            <div className="col-lg-6">
              <div className="accordion__wrapper">
                {[
                  {
                    q: "What documents are required for property registration in Kurukshetra?",
                    a: "Essential documents include sale deed, property papers, NOC from concerned authorities, property tax receipts, encumbrance certificate, and identity proof. Our team assists with all documentation requirements."
                  },
                  {
                    q: "Do you provide home loan assistance in Kurukshetra?",
                    a: "Yes, we have partnerships with leading banks and financial institutions to help you secure the best home loan rates and terms for your property purchase in Kurukshetra."
                  },
                  {
                    q: "How do I verify the legal status of a property in Kurukshetra?",
                    a: "We conduct thorough due diligence including title verification, checking for any legal disputes, verifying ownership documents, and ensuring all clearances are in place before finalizing any property transaction."
                  },
                  {
                    q: "What are the rental yields in Kurukshetra?",
                    a: "Rental yields in Kurukshetra typically range from 4-7% annually for residential properties and 6-10% for commercial properties, making it an attractive option for rental income generation."
                  },
                  {
                    q: "Can I get property management services in Kurukshetra?",
                    a: "Yes, we offer comprehensive property management services including tenant screening, rent collection, property maintenance, and regular property inspections to ensure your investment is well-maintained."
                  },
                  {
                    q: "How can I schedule a property visit in Kurukshetra?",
                    a: "You can contact us directly through our website, call our Kurukshetra office, or visit our office. We'll arrange property visits at your convenience and provide detailed information about each property."
                  }
                ].map((item, idx) => (
                  <details key={idx} className="kurukshetra-faq">
                    <summary className="kurukshetra-faq-q">{item.q}</summary>
                    <div className="kurukshetra-faq-a">{item.a}</div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <Reviews />

      <style jsx>{`
        .sect-padding{padding-top:20px;padding-bottom:20px;}
        .kurukshetra-hero{background: linear-gradient(135deg, #f6f8fb 0%, #f6f8fb 100%); border-top: 1px solid #c7cfdb; padding-top: 60px;}
        .kurukshetra-heroCard{background:#ffffff;border:1px solid #e2e8f0;border-radius:18px;box-shadow:0 16px 40px rgba(2,6,23,.08);padding:26px}
        .kurukshetra-badge{display:inline-block;background:#e8fff5;color:#065f46;border:1px solid #a7f3d0;border-radius:999px;font-weight:800;font-size:12px;padding:6px 10px;margin-bottom:8px}
        .kurukshetra-title{font-weight:700;letter-spacing:-0.3px;font-size:clamp(28px,4vw,36px);line-height:1.15;margin-bottom:8px}
        .kurukshetra-h2{font-weight:800;font-size:clamp(18px,2.4vw,26px);margin-top:22px;margin-bottom:10px}
        .kurukshetra-lead{color:#334155;max-width:920px}
        .kurukshetra-card{display:block;padding:16px;border:1px solid #e2e8f0;border-radius:16px;background:#fff;box-shadow:0 6px 22px rgba(2,6,23,.06);transition:transform .15s ease, box-shadow .15s ease}
        .kurukshetra-card:hover{transform:translateY(-2px);box-shadow:0 10px 26px rgba(2,6,23,.09)}
        .kurukshetra-chip{padding:16px 18px;border:1px dashed #cbd5e1;border-radius:14px;background:#fff;min-height:60px;display:flex; flex-direction: column;}
        .kurukshetra-btn{background:linear-gradient(90deg,#1a9050,#2d3748);color:#fff;border:none;border-radius:12px;padding:12px 18px;font-weight:800; font-size: 15px;}
        .kurukshetra-btn-alt{background:#0f172a;color:#fff;border:none;border-radius:12px;padding:12px 18px;font-weight:800; font-size: 15px;}
        .kurukshetra-btn:hover{opacity:.92}
        .kurukshetra-ico{font-size:20px}
        .kurukshetra-feature{display:flex;align-items:center;gap:14px;padding:16px 18px;border:1px solid #e2e8f0;border-radius:16px;background:#ffffff;box-shadow:0 6px 22px rgba(2,6,23,.06);transition:transform .15s ease, box-shadow .15s ease, border-color .15s ease}
        .kurukshetra-feature:hover{transform:translateY(-2px);box-shadow:0 12px 28px rgba(2,6,23,.10);border-color:#dbe2ea}
        .kurukshetra-feature-ico{width:36px;height:36px;border-radius:12px;background:linear-gradient(135deg,#eafaf5,#d7f3ea);color:#065f46;display:flex;align-items:center;justify-content:center;font-size:18px;box-shadow:inset 0 0 0 1px #a7f3d0}
        .kurukshetra-feature-title{font-weight:800;color:#0f172a;letter-spacing:-.2px}
        .kurukshetra-bullets{list-style:none;margin:0;padding:0}
        .kurukshetra-bullets li{display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px dashed #e2e8f0}
        .kurukshetra-bullets li:first-child{border-top:0}
        .kurukshetra-bullet-ico{width:26px;height:26px;border-radius:50%;background:#eef2ff;color:#1e3a8a;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:12px}
        .kurukshetra-mini{margin:8px 0 0 0;padding-left:18px}
        .kurukshetra-mini li{list-style:disc;margin:4px 0}
        .kurukshetra-chip-title{font-weight:800;margin-bottom:6px}
        .kurukshetra-stack>[class*='col-']{margin-bottom:12px}
        .kurukshetra-super-cta{display:flex;align-items:center;justify-content:space-between;gap:16px;border:1px solid #e2e8f0;border-radius:18px;padding:18px 20px;background:linear-gradient(90deg,#f7fafc,#eef2ff)}
        .kurukshetra-super-cta__left{display:flex;align-items:center;gap:12px}
        .kurukshetra-super-cta__icon{width:44px;height:44px;border-radius:12px;background:#0f172a;color:#fff;display:flex;align-items:center;justify-content:center;font-size:22px}
        .kurukshetra-super-cta__title{margin:0;font-weight:800}
        .kurukshetra-super-cta__text{margin:2px 0 0 0;color:#475569}
        .kurukshetra-super-cta__actions{display:flex;gap:10px}
        .kurukshetra-aside-card{background:#fff;border:1px solid #e2e8f0;border-radius:16px;box-shadow:0 6px 22px rgba(2,6,23,.06);padding:16px}
        .kurukshetra-aside-header{display:flex;align-items:center;gap:10px;margin-bottom:10px}
        .kurukshetra-aside-ico{width:34px;height:34px;border-radius:10px;background:#0f172a;color:#fff;display:flex;align-items:center;justify-content:center;font-size:18px}
        .kurukshetra-aside-title{font-weight:800}
        .kurukshetra-aside-sub{color:#64748b;font-size:14px}
        .kurukshetra-aside-actions{display:flex;gap:10px}
        .kurukshetra-area-list{list-style:none;margin:0;padding:0}
        .kurukshetra-area-item{display:flex;align-items:center;justify-content:space-between;padding:8px 0;border-top:1px dashed #e2e8f0}
        .kurukshetra-area-item:first-child{border-top:0}
        .kurukshetra-area-name{font-weight:700}
        .kurukshetra-area-pill{background:#eef2ff;color:#1e3a8a;border:1px solid #c7d2fe;border-radius:999px;padding:4px 10px;font-weight:700;font-size:12px}
        .kurukshetra-faq{margin-bottom:10px;padding:14px 16px;border:1px solid #e2e8f0;border-radius:12px;background:#fff;box-shadow:0 4px 16px rgba(2,6,23,.05)}
        .kurukshetra-faq summary::-webkit-details-marker{display:none}
        .kurukshetra-faq-q{cursor:pointer;font-weight:700}
        .kurukshetra-faq-a{margin-top:8px;color:#475569}
      `}</style>
    </main>
  );
};

export default KurukshetraRealEstateClient;
