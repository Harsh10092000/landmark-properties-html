"use client";
import React from 'react'
import BreadcrumbSection from '@/components/common/BreadcrumbSection'
import MoreProperties from '@/components/propertyDetailPage/MoreProperties';

// Static SEO tags (Next App Router supports metadata export too, but matching project pattern with inline tags)
const Page = () => {
    return (
        <main class="main__content_wrapper">
            <title>HSVP Private Property Sale–Purchase Portal | Guide, Policy PDF, Highlights</title>
            <meta name="description" content="Know about HSVP (Haryana Shehri Vikas Pradhikaran) Private Property Sale–Purchase Portal: policy, process handbook (valid till 31.12.2025), benefits, who can use, and how Landmark Plots can help you sell/buy in HSVP sectors." />
            <meta name="keywords" content="HSVP private property sale purchase, HSVP policy PDF, Haryana Shehri Vikas Pradhikaran portal, HSVP auction, HSVP e-auction, HSVP portal handbook, HSVP Panchkula policy" />
            <meta name="author" content="Landmark Plots" />
            <meta property="og:title" content="HSVP Private Property Sale–Purchase Portal | Guide, Policy PDF, Highlights" />
            <meta property="og:description" content="Official initiative by HSVP for transparent sale-purchase of private properties in HSVP sectors. Read the highlights, benefits and download the policy handbook." />
            <meta property="og:image" content="https://landmarkplots.com/uploads/default.jpg" />
            <meta property="og:url" content="https://landmarkplots.com/hsvp-private-property-sale-purpose-portal" />
            <meta property="og:type" content="article" />
            <meta property="og:site_name" content="Landmark Plots" />
            <link rel="canonical" href="https://landmarkplots.com/hsvp-private-property-sale-purpose-portal" />

            <BreadcrumbSection val1={"HSVP"} val2={"Private Property Portal"} />

            <section className="pt-50 pb-40 hsvp-hero sect-padding">
                <div className="container">
                    <div className="row g-4 ">
                        <div className="col-lg-8">
                            <article className="hsvp-heroCard">
                                <span className="hsvp-badge">Official Info • HSVP Sectors</span>
                                <h1 className="hsvp-title">HSVP Private Property Sale – Purchase Portal</h1>
                                <p className="hsvp-lead">Haryana Shehri Vikas Pradhikaran (HSVP) has introduced a transparent, digital and policy‑compliant portal for sale and purchase of private properties located in HSVP sectors. Below, you’ll find the official policy PDF, key highlights, and a quick seller/buyer journey so you can understand how the process works end‑to‑end.</p>
                                <p className="hsvp-lead">In short, allottees can list their properties after verification by the Estate Office. Buyers register on the portal, complete KYC, and participate in digital bidding. The seller remains in control as per the policy and may accept or reject the highest bid within the defined timelines. All payments are digital and traceable to maintain a clean audit trail.</p>

                                <div className="hsvp-card mt-2">
                                    <h2 className="hsvp-h2">How the Portal Works (at a glance)</h2>
                                    <ul className="hsvp-bullets">
                                        <li><span className="hsvp-bullet-ico" aria-hidden>1</span><span>Allottee files an Expression of Interest (EOI) with accurate ownership and property details.</span></li>
                                        <li><span className="hsvp-bullet-ico" aria-hidden>2</span><span>Estate Office scrutinises and approves the EOI through the PPM workflow.</span></li>
                                        <li><span className="hsvp-bullet-ico" aria-hidden>3</span><span>Listing is published; buyers register, complete KYC and follow the handbook rules.</span></li>
                                        <li><span className="hsvp-bullet-ico" aria-hidden>4</span><span>Time‑bound digital bidding/e‑auction takes place; the seller evaluates the best offer.</span></li>
                                        <li><span className="hsvp-bullet-ico" aria-hidden>5</span><span>Once accepted, token and balance consideration are paid per schedule and transfer permission is granted.</span></li>
                                    </ul>
                                </div>

                                <div className="hsvp-card mt-3">
                                    <h2 className="hsvp-h2">Benefits</h2>
                                    <div className="row g-3 hsvp-stack">
                                        <div className="col-sm-6">
                                            <div className="hsvp-chip h-100">
                                                <div className="hsvp-chip-title">For Sellers</div>
                                                <ul className="hsvp-mini">
                                                    <li>Policy‑aligned, verified process</li>
                                                    <li>Broader reach to qualified buyers</li>
                                                    <li>Seller discretion on accepting the top bid</li>
                                                    <li>End‑to‑end digital trail; fewer disputes</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="hsvp-chip h-100">
                                                <div className="hsvp-chip-title">For Buyers</div>
                                                <ul className="hsvp-mini">
                                                    <li>Verified inventory within HSVP sectors</li>
                                                    <li>Transparent rules and timelines</li>
                                                    <li>Secure digital bidding and payments</li>
                                                    <li>Clear next steps after acceptance</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="hsvp-card mt-3">
                                    <h2 className="hsvp-h2">What you should know before you start</h2>
                                    <div className="row g-3 hsvp-stack">
                                        <div className="col-md-6">
                                            <div className="hsvp-chip h-100">
                                                <div className="hsvp-chip-title">Seller responsibilities</div>
                                                <ul className="hsvp-mini">
                                                    <li>Ensure ownership records and plot details are accurate.</li>
                                                    <li>Respond to Estate Office queries during EOI scrutiny.</li>
                                                    <li>Clearly disclose reserve price/ask and property condition.</li>
                                                    <li>Follow the acceptance timeline defined in the handbook.</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="hsvp-chip h-100">
                                                <div className="hsvp-chip-title">Buyer safeguards</div>
                                                <ul className="hsvp-mini">
                                                    <li>Bid only after completing KYC and reading policy clauses.</li>
                                                    <li>Keep sufficient wallet/escrow balance before bidding.</li>
                                                    <li>Make payments only through approved digital modes.</li>
                                                    <li>Track deadlines for token and final consideration.</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row g-3 hsvp-stack mt-1">
                                        <div className="col-md-6">
                                            <div className="hsvp-chip h-100">
                                                <div className="hsvp-chip-title">Key timelines</div>
                                                <ul className="hsvp-mini">
                                                    <li>EOI scrutiny: typically ~4 working days (PPM workflow).</li>
                                                    <li>Bidding window: as notified on the portal.</li>
                                                    <li>Post‑acceptance payments: as per schedule in policy.</li>
                                                    <li>Transfer permission: issued after compliance verification.</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="hsvp-chip h-100">
                                                <div className="hsvp-chip-title">Fees & notices</div>
                                                <ul className="hsvp-mini">
                                                    <li>Registration/participation and commission may apply.</li>
                                                    <li>Some fee relaxations may be time‑bound; check the PDF.</li>
                                                    <li>Non‑compliance with timelines can lead to forfeiture/cancellation.</li>
                                                    <li>Always keep email/SMS notifications enabled on the portal.</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="hsvp-note mt-2">For authoritative details, always refer to the latest HSVP handbook/circular and your Estate Office guidance. This page is a quick orientation for convenience.</div>
                                </div>
                                <div className="d-flex gap-2 flex-wrap mt-2">
                                    <a className="btn hsvp-btn" target="_blank" rel="noopener" href="https://hsvphry.org.in/documents/home/news_updates/newsUpdate_202509071938_638928707054106094.pdf">Open Policy PDF</a>
                                    <a className="btn hsvp-btn-alt" rel="noopener" href="/properties-for-sale">Browse Sale Listings</a>
                                </div>

                                <h2 className="mt-4 hsvp-h2">Official Documents</h2>
                                <div className="row g-3 mt-1 hsvp-stack">
                                    <div className="col-sm-6">
                                        <a className="hsvp-card h-100" target="_blank" rel="noopener" href="https://hsvphry.org.in/documents/home/news_updates/newsUpdate_202509071938_638928707054106094.pdf">
                                            <div className="d-flex align-items-center">
                                                <span className="me-2 hsvp-ico" aria-hidden>📄</span>
                                                <div>
                                                    <div className="fw-bold">Policy Handbook (Valid till 31.12.2025)</div>
                                                    <small>Official PDF • HSVP</small>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    {/* <div className="col-sm-6">
                                        <a className="hsvp-card h-100" target="_blank" rel="noopener" href="https://www.tribuneindia.com/news/haryana/hsvp-launches-digital-portal-for-property-sale-purchase/">
                                            <div className="d-flex align-items-center">
                                                <span className="me-2 hsvp-ico" aria-hidden>📰</span>
                                                <div>
                                                    <div className="fw-bold">News Coverage</div>
                                                    <small>Tribune India</small>
                                                </div>
                                            </div>
                                        </a>
                                    </div> */}
                                </div>

                                <h2 className="mt-4 hsvp-h2">Key Highlights</h2>
                                <div className="row g-3 hsvp-stack">
                                    <div className="col-md-4 col-sm-6">
                                        <div className="hsvp-feature">
                                            <div className="hsvp-feature-ico">🛡️</div>
                                            <div className="hsvp-feature-title">Transparent & verified workflow</div>
                                        </div>
                                    </div>
                                    <div className="col-md-4 col-sm-6">
                                        <div className="hsvp-feature">
                                            <div className="hsvp-feature-ico">⚙️</div>
                                            <div className="hsvp-feature-title">Digital bidding / e‑auction</div>
                                        </div>
                                    </div>
                                    <div className="col-md-4 col-sm-6">
                                        <div className="hsvp-feature">
                                            <div className="hsvp-feature-ico">✅</div>
                                            <div className="hsvp-feature-title">Seller control on acceptance</div>
                                        </div>
                                    </div>
                                    <div className="col-md-4 col-sm-6">
                                        <div className="hsvp-feature">
                                            <div className="hsvp-feature-ico">🔐</div>
                                            <div className="hsvp-feature-title">Secure, auditable payments</div>
                                        </div>
                                    </div>
                                    <div className="col-md-4 col-sm-6">
                                        <div className="hsvp-feature">
                                            <div className="hsvp-feature-ico">📷</div>
                                            <div className="hsvp-feature-title">Photos/videos & inspections</div>
                                        </div>
                                    </div>
                                    <div className="col-md-4 col-sm-6">
                                        <div className="hsvp-feature">
                                            <div className="hsvp-feature-ico">📣</div>
                                            <div className="hsvp-feature-title">Wider reach for buyers</div>
                                        </div>
                                    </div>
                                </div>

                                <h2 className="mt-4 hsvp-h2">Who can use this portal?</h2>
                                <p>
                                    HSVP allottees/plot holders wishing to sell their property in notified sectors, and buyers who
                                    seek verified, policy-compliant transactions. Participation is voluntary per the handbook.
                                </p>

                                <h2 className="mt-4 hsvp-h2">How it works (Seller Journey)</h2>
                                <ol className="mt-2 hsvp-steps">
                                    <li>Submit Expression of Interest (EOI) via Allottee Corner on HSVP portal.</li>
                                    <li>Estate Office verifies EOI (PPM workflow ~ four working days).</li>
                                    <li>Verified properties are listed for buyer registrations & bidding.</li>
                                    <li>Seller may accept/reject highest bid as per policy and timelines.</li>
                                    <li>On acceptance, token/consideration and transfer permission follow policy.</li>
                                </ol>

                                <h2 className="mt-4 hsvp-h2">How Landmark Plots helps</h2>
                                <div className="row g-3 hsvp-stack">
                                    {[
                                        { t: 'Listing & creative marketing' },
                                        { t: 'HSVP sector focused buyer reach' },
                                        { t: 'Documentation assistance' },
                                        { t: 'Guided onboarding & support' }
                                    ].map((it, idx) => (
                                        <div className="col-sm-6" key={idx}>
                                            <div className="hsvp-service h-100">
                                                <div className="fw-semibold">{it.t}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>


                            </article>
                        </div>

                        <div className="col-lg-4">
                            <div className="bg-box bg-white p-3">
                                <MoreProperties />
                            </div>
                            <div className="hsvp-aside-card mt-3">
                                <div className="hsvp-aside-header">
                                    <div className="hsvp-aside-ico" aria-hidden>📄</div>
                                    <div>
                                        <div className="hsvp-aside-title">Download Policy PDF</div>
                                        <div className="hsvp-aside-sub">HSVP Private Property Sale–Purchase Handbook</div>
                                    </div>
                                </div>
                                <div className="hsvp-aside-actions">
                                    <a className="btn hsvp-btn" target="_blank" rel="noopener" href="https://hsvphry.org.in/documents/home/news_updates/newsUpdate_202509071938_638928707054106094.pdf">Open PDF</a>
                                </div>
                            </div>
                            <div className="hsvp-aside-card mt-3">
                                <div className="hsvp-aside-header">
                                    <div className="hsvp-aside-ico" aria-hidden>🗓️</div>
                                    <div>
                                        <div className="hsvp-aside-title">Auction Schedule (Sep 2025)</div>
                                        <div className="hsvp-aside-sub">Zone‑wise e‑auction calendar</div>
                                    </div>
                                </div>
                                <ul className="hsvp-date-list">
                                    <li className="hsvp-date-item"><span className="hsvp-date-city">Rohtak</span><span className="hsvp-date-pill">24.09.2025</span></li>
                                    <li className="hsvp-date-item"><span className="hsvp-date-city">Hisar</span><span className="hsvp-date-pill">25.09.2025</span></li>
                                    <li className="hsvp-date-item"><span className="hsvp-date-city">Panchkula</span><span className="hsvp-date-pill">26.09.2025</span></li>
                                    <li className="hsvp-date-item"><span className="hsvp-date-city">Faridabad</span><span className="hsvp-date-pill">27.09.2025</span></li>
                                    <li className="hsvp-date-item"><span className="hsvp-date-city">Gurugram</span><span className="hsvp-date-pill">28.09.2025</span></li>
                                </ul>
                            </div>
                        </div>
                        {/* <div className="col-lg-4">
              <aside className="sidebar__widgets hsvp-sticky">
                <div className="widgets__single hsvp-card mb-4">
                  <h4 className="widgets__title">Download Policy PDF</h4>
                  <p className="mb-2">HSVP Private Property Sale–Purchase Process Handbook.</p>
                  <a className="btn hsvp-btn" target="_blank" rel="noopener" href="https://hsvphry.org.in/documents/home/news_updates/newsUpdate_202509071938_638928707054106094.pdf">Open PDF</a>
                </div>
                <div className="widgets__single hsvp-card mb-4">
                  <h4 className="widgets__title">Auction Schedule (Sep 2025)</h4>
                  <ul className="list-unstyled mb-0" style={{lineHeight:1.8}}>
                    <li>Rohtak – 24.09.2025</li>
                    <li>Hisar – 25.09.2025</li>
                    <li>Panchkula – 26.09.2025</li>
                    <li>Faridabad – 27.09.2025</li>
                    <li>Gurugram – 28.09.2025</li>
                  </ul>
                </div>
                <div className="sb-card">
                  <div className="sb-title">Explore Properties</div>
                  <ul className="sb-list">
                    <li><a href="/properties">🏷️ All Properties</a></li>
                    <li><a href="/properties-for-sale">🛒 For Sale</a></li>
                    <li><a href="/properties-for-rent">🔑 For Rent</a></li>
                    <li><a href="/land-properties">📐 Land / Plots</a></li>
                    <li><a href="/residential-properties">🏠 Residential</a></li>
                    <li><a href="/commercial-properties">🏢 Commercial</a></li>
                  </ul>
                </div>
                <div className="sb-card mt-3">
                  <div className="sb-title">Quick Links</div>
                  <ul className="sb-list">
                    <li><a href="/aboutus">ℹ️ About Landmark</a></li>
                    <li><a href="/contactus">☎️ Contact Support</a></li>
                    <li><a href="/faq">❓ FAQs</a></li>
                  </ul>
                </div>
                <div className="sb-cta mt-3">
                  <div>
                    <div className="sb-cta-title">Need Assistance?</div>
                    <div className="sb-cta-text">Talk to our HSVP specialists for guidance.</div>
                  </div>
                  <a className="btn hsvp-btn" href="/contactus">Get Help</a>
                </div>
              </aside>
            </div> */}
                    </div>
                </div>
            </section>

            <section className="sect-padding">
                <div className="container">
                    <div className="hsvp-super-cta">
                        <div className="hsvp-super-cta__left">
                            <div className="hsvp-super-cta__icon" aria-hidden>📣</div>
                            <div>
                                <h3 className="hsvp-super-cta__title">Need help with HSVP Sector Property?</h3>
                                <p className="hsvp-super-cta__text">Talk to our HSVP specialists for listing, documentation and buyer outreach.</p>
                            </div>
                        </div>
                        <div className="hsvp-super-cta__actions">
                            <a className="btn hsvp-btn" href="/contactus">Contact Us</a>
                            <a className="btn hsvp-btn-alt" href="/allproperties">Browse Properties</a>
                        </div>
                    </div>
                </div>
            </section>


            <section className="sect-padding">
                <div className="container">
                    <h2 className="mb-3 hsvp-h2">Frequently Asked Questions</h2>
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="accordion__wrapper">
                                {[
                                    {
                                        q: "Who can list on the HSVP portal?",
                                        a: "HSVP allottees/plot holders who wish to sell their private property in notified HSVP sectors."
                                    },
                                    {
                                        q: "Is participation compulsory?",
                                        a: "No. As per the handbook, it is completely voluntary. The seller can accept or reject the highest bid."
                                    },
                                    {
                                        q: "What is the bidding/e-auction process?",
                                        a: "After verification, the property is listed on the portal. Buyers register and participate in digital bidding. Payments and the process trail are transparent."
                                    },
                                    {
                                        q: "How are documents and timelines managed?",
                                        a: "The Estate Office scrutinizes the Expression of Interest (EOI) through the PPM workflow. Post-acceptance, token/consideration and transfer permissions follow the policy."
                                    },
                                    {
                                        q: "What is the role of Landmark Plots?",
                                        a: "They provide listing, marketing, buyer outreach, documentation assistance, and guided onboarding for HSVP sector properties."
                                    },
                                    {
                                        q: "Where can I get help/support?",
                                        a: "For official queries, contact HSVP through the contact points (telephone/toll-free listed on the website) or the Estate Office. For listing/marketing/handholding, contact the Landmark Plots team at /contactus."
                                    }
                                ].map((item, idx) => (
                                    <details key={idx} className="hsvp-faq">
                                        <summary className="hsvp-faq-q">{item.q}</summary>
                                        <div className="hsvp-faq-a">{item.a}</div>
                                    </details>
                                ))}
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="accordion__wrapper">
                                {[
                                    {
                                        q: "What documents are required to file an EOI (Expression of Interest)?",
                                        a: "Basic owner details, allotment/ownership proof, plot details (sector, size, location), ID proof (Aadhaar/PAN), and contact details. The Estate Office may request additional documents during verification."
                                    },
                                    {
                                        q: "What are the fees/charges? Are there any exemptions?",
                                        a: "Registration/participation and commission fees apply as per the policy. Some exemptions may be applicable until 31.12.2025 as per the circular/handbook. Check the official handbook/PDF for the latest updates."
                                    },
                                    {
                                        q: "Can a seller reject/withdraw the highest bid?",
                                        a: "Yes. The policy allows the seller to accept or reject the highest bid within the policy timelines. Participation is on a voluntary basis."
                                    },
                                    {
                                        q: "How are buyer payments handled? Token/consideration rules?",
                                        a: "Payments are made through digital/traceable modes. Post-acceptance, token and final consideration must be deposited as per the policy schedule. Non-compliance may lead to bid cancellation/forfeiture as per rules."
                                    },
                                    {
                                        q: "How long does verification take? Is there a FIFO rule?",
                                        a: "EOI scrutiny generally takes ~4 working days through the PPM workflow. Applications are processed on a First-In-First-Out (FIFO) basis as per the policy."
                                    },
                                    {
                                        q: "What are the buyer participation requirements?",
                                        a: "Buyers must register and complete KYC on the portal. Before bidding, the required amount must be blocked in the wallet/escrow as per the percentage rules in the policy/handbook. All payments are digital."
                                    }
                                ].map((item, idx) => (
                                    <details key={idx} className="hsvp-faq">
                                        <summary className="hsvp-faq-q">{item.q}</summary>
                                        <div className="hsvp-faq-a">{item.a}</div>
                                    </details>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <style jsx>{`
        .sect-padding{padding-top:20px;padding-bottom:20px;}
        .hsvp-hero{background: linear-gradient(135deg, #f6f8fb 0%, #f6f8fb 100%); border-top: 1px solid #c7cfdb; padding-top: 60px;}
        .hsvp-heroCard{background:#ffffff;border:1px solid #e2e8f0;border-radius:18px;box-shadow:0 16px 40px rgba(2,6,23,.08);padding:26px}
        .hsvp-badge{display:inline-block;background:#e8fff5;color:#065f46;border:1px solid #a7f3d0;border-radius:999px;font-weight:800;font-size:12px;padding:6px 10px;margin-bottom:8px}
        .hsvp-title{font-weight:700;letter-spacing:-0.3px;font-size:clamp(28px,4vw,36px);line-height:1.15;margin-bottom:8px}
        .hsvp-h2{font-weight:800;font-size:clamp(18px,2.4vw,26px);margin-top:22px;margin-bottom:10px}
        .hsvp-lead{color:#334155;max-width:920px}
        .hsvp-card{display:block;padding:16px;border:1px solid #e2e8f0;border-radius:16px;background:#fff;box-shadow:0 6px 22px rgba(2,6,23,.06);transition:transform .15s ease, box-shadow .15s ease}
        .hsvp-card:hover{transform:translateY(-2px);box-shadow:0 10px 26px rgba(2,6,23,.09)}
        .hsvp-chip{padding:16px 18px;border:1px dashed #cbd5e1;border-radius:14px;background:#fff;min-height:60px;display:flex; flex-direction: column;}
        .hsvp-btn{background:linear-gradient(90deg,#1a9050,#2d3748);color:#fff;border:none;border-radius:12px;padding:12px 18px;font-weight:800; font-size: 15px;}
        .hsvp-btn-alt{background:#0f172a;color:#fff;border:none;border-radius:12px;padding:12px 18px;font-weight:800; font-size: 15px;}
        .hsvp-btn:hover{opacity:.92}
        .hsvp-ico{font-size:20px}
        /* Redesigned highlight cards (6) */
        .hsvp-feature{display:flex;align-items:center;gap:14px;padding:16px 18px;border:1px solid #e2e8f0;border-radius:16px;background:#ffffff;box-shadow:0 6px 22px rgba(2,6,23,.06);transition:transform .15s ease, box-shadow .15s ease, border-color .15s ease}
        .hsvp-feature:hover{transform:translateY(-2px);box-shadow:0 12px 28px rgba(2,6,23,.10);border-color:#dbe2ea}
        .hsvp-feature-ico{width:36px;height:36px;border-radius:12px;background:linear-gradient(135deg,#eafaf5,#d7f3ea);color:#065f46;display:flex;align-items:center;justify-content:center;font-size:18px;box-shadow:inset 0 0 0 1px #a7f3d0}
        .hsvp-feature-title{font-weight:800;color:#0f172a;letter-spacing:-.2px}
        .hsvp-service{display:block;padding:16px;border:1px solid #e2e8f0;border-radius:16px;background:#fff;box-shadow:0 6px 22px rgba(2,6,23,.06)}
        .hsvp-faq{margin-bottom:10px;padding:14px 16px;border:1px solid #e2e8f0;border-radius:12px;background:#fff;box-shadow:0 4px 16px rgba(2,6,23,.05)}
        .hsvp-faq summary::-webkit-details-marker{display:none}
        .hsvp-faq-q{cursor:pointer;font-weight:700}
        .hsvp-faq-a{margin-top:8px;color:#475569}
        .hsvp-bullets{list-style:none;margin:0;padding:0}
        .hsvp-bullets li{display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-top:1px dashed #e2e8f0}
        .hsvp-bullets li:first-child{border-top:0}
        .hsvp-bullet-ico{width:26px;height:26px;border-radius:50%;background:#eef2ff;color:#1e3a8a;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:12px}
        .hsvp-mini{margin:8px 0 0 0;padding-left:18px}
        .hsvp-mini li{list-style:disc;margin:4px 0}
        .hsvp-chip-title{font-weight:800;margin-bottom:6px}
        .hsvp-note{font-size:14px;color:#475569}
        .hsvp-stack>[class*='col-']{margin-bottom:12px}
        .hsvp-cta{display:flex;align-items:center;justify-content:space-between;gap:12px}
        .hsvp-steps{counter-reset:step;list-style:none;padding-left:0;margin-left:0}
        .hsvp-steps li{position:relative;padding-left:42px;margin:8px 0;line-height:1.7}
        .hsvp-steps li:before{counter-increment:step;content:counter(step);position:absolute;left:0;top:0;width:28px;height:28px;border-radius:50%;background:#1a9050;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:800}
        .hsvp-sticky{position:sticky;top:90px}
        .sb-card{background:#fff;border:1px solid #e2e8f0;border-radius:16px;box-shadow:0 6px 22px rgba(2,6,23,.06);padding:16px}
        .sb-title{font-weight:800;font-size:18px;margin-bottom:10px}
        .sb-list{list-style:none;padding-left:0;margin:0}
        .sb-list li{padding:10px 0;border-top:1px dashed #e2e8f0}
        .sb-list li:first-child{border-top:0}
        .sb-list a{display:flex;gap:8px;align-items:center;font-weight:600;color:#0f172a}
        .sb-list a:hover{color:#1a9050}
        .sb-cta{display:flex;align-items:center;justify-content:space-between;gap:12px;background:#0f172a;color:#fff;border-radius:16px;padding:16px}
        .sb-cta-title{font-weight:800}
        .sb-cta-text{opacity:.9}
        .hsvp-super-cta{display:flex;align-items:center;justify-content:space-between;gap:16px;border:1px solid #e2e8f0;border-radius:18px;padding:18px 20px;background:linear-gradient(90deg,#f7fafc,#eef2ff)}
        .hsvp-super-cta__left{display:flex;align-items:center;gap:12px}
        .hsvp-super-cta__icon{width:44px;height:44px;border-radius:12px;background:#0f172a;color:#fff;display:flex;align-items:center;justify-content:center;font-size:22px}
        .hsvp-super-cta__title{margin:0;font-weight:800}
        .hsvp-super-cta__text{margin:2px 0 0 0;color:#475569}
        .hsvp-super-cta__actions{display:flex;gap:10px}
        .hsvp-aside-card{background:#fff;border:1px solid #e2e8f0;border-radius:16px;box-shadow:0 6px 22px rgba(2,6,23,.06);padding:16px}
        .hsvp-aside-header{display:flex;align-items:center;gap:10px;margin-bottom:10px}
        .hsvp-aside-ico{width:34px;height:34px;border-radius:10px;background:#0f172a;color:#fff;display:flex;align-items:center;justify-content:center;font-size:18px}
        .hsvp-aside-title{font-weight:800}
        .hsvp-aside-sub{color:#64748b;font-size:14px}
        .hsvp-aside-actions{display:flex;gap:10px}
        .hsvp-date-list{list-style:none;margin:0;padding:0}
        .hsvp-date-item{display:flex;align-items:center;justify-content:space-between;padding:8px 0;border-top:1px dashed #e2e8f0}
        .hsvp-date-item:first-child{border-top:0}
        .hsvp-date-city{font-weight:700}
        .hsvp-date-pill{background:#eef2ff;color:#1e3a8a;border:1px solid #c7d2fe;border-radius:999px;padding:4px 10px;font-weight:700;font-size:12px}
      `}</style>
        </main>
    )
}

export default Page