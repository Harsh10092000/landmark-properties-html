import React from "react";

export const generateMetadata = () => ({
  title: "Kurukshetra University PIN Code – KUK Sub Office | Landmark Plots",
  description:
    "Kurukshetra University (KUK) Sub Office PIN. Quick answers: address format, phone, delivery status, taluk/division/region and nearby areas.",
  keywords: [
    "Kurukshetra University pin code",
    "KUK pin code 136119",
    "Kurukshetra University postal code",
    "Kurukshetra Haryana 136119",
    "Kurukshetra pin code list",
    "Thanesar pin code",
  ],
  openGraph: {
    type: "website",
    url: "https://landmarkplots.com/kurukshetra-university-pin-code",
    title: "Kurukshetra University PIN – Postal Details | Landmark Plots",
    description:
      "KUK Sub Office – delivery status, address format, telephone, taluk, division, region and nearby campus areas.",
  },
  twitter: {
    card: "summary_large_image",
    title: "KUK PIN – Sub Office details",
    description: "Address format, delivery status, taluk/division/region and helpline for Kurukshetra University S.O.",
  },
  robots: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
  alternates: { canonical: "https://landmarkplots.com/kurukshetra-university-pin-code" },
});

const page = async () => {
  return (
    <main className="main__content_wrapper" style={{ background: "#f6f8fb" }}>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Kurukshetra University PIN Code 136119',
            url: 'https://landmarkplots.com/kurukshetra-university-pin-code',
            description: 'Kurukshetra University (KUK) Sub Office PIN 136119 with postal details and nearby areas.',
            breadcrumb: {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://landmarkplots.com/' },
                { '@type': 'ListItem', position: 2, name: 'KUK PIN 136119', item: 'https://landmarkplots.com/kurukshetra-university-pin-code' }
              ]
            }
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'PostOffice',
            name: 'Kurukshetra University Sub Post Office',
            telephone: '+91-1744-238034',
            areaServed: 'Kurukshetra University, Thanesar, Haryana',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Kurukshetra University',
              addressRegion: 'Haryana',
              postalCode: '136119',
              addressCountry: 'IN'
            }
          })
        }}
      />
      <div className="container" style={{ padding: "40px 0" }}>
        {/* Hero Card (HSVP style) */}
        <section style={{ marginBottom: 16 }}>
          <article
            style={{
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: 18,
              boxShadow: "0 16px 40px rgba(2,6,23,.08)",
              padding: 24,
            }}
          >
            <span
              style={{
                display: "inline-block",
                background: "#e8fff5",
                color: "#065f46",
                border: "1px solid #a7f3d0",
                borderRadius: 999,
                fontWeight: 800,
                fontSize: 12,
                padding: "6px 10px",
                marginBottom: 8,
              }}
            >
              Postal Info • Kurukshetra
            </span>
            <h1
              style={{
                fontWeight: 700,
                letterSpacing: -0.3,
                fontSize: "clamp(28px,4vw,36px)",
                lineHeight: 1.15,
                marginBottom: 8,
                color: "#0f172a",
                textAlign: "left",
              }}
            >
              Kurukshetra University PIN Code — Haryana (136119)
            </h1>
            <p style={{ color: "#334155", margin: 0 }}>
              The official PIN code for the Kurukshetra University (KUK) Sub Office is
              <strong> 136119</strong>. Delivery status: Delivery. Postal Taluk: Thanesar.
              Division: Kurukshetra. Region: Ambala HQ. Circle: Haryana.
            </p>
            <div style={{ display: "flex", gap: 10, marginTop: 12, flexWrap: "wrap" }}>
              <a
                className="btn btn-dark"
                href="https://www.google.com/maps/place/Kurukshetra+University/@29.9555953,76.8194516,17z/data=!3m1!4b1!4m6!3m5!1s0x390e38b040ffffff:0x73873280de79b74b!8m2!3d29.9555953!4d76.8194516!16zL20vMGgycWwz?entry=ttu&g_ep=EgoyMDI1MDkwOS4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener"
              >
                View on Google Maps
              </a>
            </div>
          </article>
        </section>

        {/* Quick facts card */}
        <section style={{ marginBottom: 16 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: 12,
            }}
          >
            {[
              { label: "Post Office", value: "Kurukshetra University (Sub Office)" },
              { label: "PIN Code", value: "136119" },
              { label: "District", value: "Kurukshetra" },
              { label: "State", value: "Haryana" },
              { label: "Taluk", value: "Thanesar" },
              { label: "Division", value: "Kurukshetra" },
              { label: "Region", value: "Ambala HQ" },
              { label: "Circle", value: "Haryana" },
              { label: "Delivery Status", value: "Delivery" },
              { label: "Office Type", value: "S.O (Sub Office)" },
              { label: "Telephone No.", value: "01744-238034" },
              { label: "Related Sub Office", value: "NA" },
              { label: "Related Head Office", value: "Kurukshetra H.O" },
            ].map((fact, i) => (
              <div
                key={i}
                style={{
                  border: "1px solid #e2e8f0",
                  borderRadius: 14,
                  background: "#fff",
                  padding: 16,
                  boxShadow: "0 6px 22px rgba(2,6,23,.06)",
                }}
              >
                <div style={{ fontSize: 12, color: "#64748b" }}>{fact.label}</div>
                <div style={{ fontWeight: 800, color: "#0f172a" }}>{fact.value}</div>
              </div>
            ))}
          </div>
        </section>

        {/* About section */}
        <section style={{ marginBottom: 16 }}>
          <div
            style={{
              border: "1px solid #e2e8f0",
              borderRadius: 16,
              background: "#ffffff",
              padding: 16,
              boxShadow: "0 6px 22px rgba(2,6,23,.06)",
            }}
          >
            <h2 style={{ fontWeight: 800, fontSize: 20, marginBottom: 8, color: "#0f172a" }}>About Kurukshetra University</h2>
            <p style={{ color: "#334155", margin: 0 }}>
              Kurukshetra University (KUK) is a renowned public university located in Thanesar,
              Kurukshetra, Haryana. Established in 1956, it offers undergraduate, postgraduate and
              doctoral programs across disciplines including arts, sciences, engineering, management,
              law, education and social sciences. The green, self-contained campus hosts academic
              departments, libraries, research centers, sports complexes, student hostels and
              administrative blocks, with convenient access via University Road and NH-44. The
              official postal PIN for the university Sub Office is 136119.
            </p>
            <ul
              style={{
                margin: '12px 0 0 0',
                padding: 0,
                color: '#475569',
                listStyle: 'none',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: 10,
              }}
            >
              <li style={{border:'1px dashed #cbd5e1', borderRadius:12, padding:'10px 12px', background:'#fff'}}>NAAC-accredited public university serving the Kurukshetra region</li>
              <li style={{border:'1px dashed #cbd5e1', borderRadius:12, padding:'10px 12px', background:'#fff'}}>Diverse programs with strong focus on research and student outcomes</li>
              <li style={{border:'1px dashed #cbd5e1', borderRadius:12, padding:'10px 12px', background:'#fff'}}>Good city connectivity; nearest railhead: Kurukshetra Jn. (approx. 6–8 km)</li>
              <li style={{border:'1px dashed #cbd5e1', borderRadius:12, padding:'10px 12px', background:'#fff'}}>Campus amenities: libraries, labs, hostels, sports and cultural facilities</li>
              <li style={{border:'1px dashed #cbd5e1', borderRadius:12, padding:'10px 12px', background:'#fff'}}>Administrative and academic blocks spread across a well-planned campus</li>
            </ul>
          </div>
        </section>

        {/* Areas grid */}
        <section style={{ marginBottom: 16 }}>
          <h2 style={{ fontWeight: 800, fontSize: 20, marginBottom: 8, color: "#0f172a" }}>
            Campus & Nearby Areas (PIN 136119)
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
              gap: 12,
            }}
          >
            {[
              { name: "Kurukshetra University (Main Gate)", pin: "136119" },
              { name: "KU Hostels / Residential Blocks", pin: "136119" },
              { name: "Department Clusters / Academic Area", pin: "136119" },
              { name: "University Road Localities", pin: "136119" },
            ].map((x, i) => (
              <div
                key={i}
                style={{
                  border: "1px solid #e2e8f0",
                  borderRadius: 12,
                  padding: 14,
                  background: "#fff",
                }}
              >
                <div style={{ fontWeight: 800 }}>{x.name}</div>
                <div style={{ color: "#334155" }}>PIN Code: {x.pin}</div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA bar */}
        <section style={{ marginBottom: 16 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 16,
              border: "1px solid #e2e8f0",
              borderRadius: 18,
              padding: "18px 20px",
              background: "linear-gradient(90deg,#f7fafc,#eef2ff)",
              boxShadow: "0 6px 22px rgba(2,6,23,.06)",
              flexWrap: "wrap",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                aria-hidden
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: "#0f172a",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                }}
              >
                📞
              </div>
              <div>
                <h3 style={{ margin: 0, fontWeight: 800, color: "#0f172a" }}>
                  Need help near Kurukshetra University (136119)?
                </h3>
                <p style={{ margin: "2px 0 0 0", color: "#475569" }}>
                  Talk to our Kurukshetra specialists for buying, selling and renting.
                </p>
              </div>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <a
                href="/contactus"
                style={{
                  background: "linear-gradient(90deg,#1a9050,#2d3748)",
                  color: "#fff",
                  border: "none",
                  borderRadius: 12,
                  padding: "12px 18px",
                  fontWeight: 800,
                  fontSize: 15,
                  textDecoration: "none",
                }}
              >
                Contact Us
              </a>
              <a
                href="/allproperties"
                style={{
                  background: "#0f172a",
                  color: "#fff",
                  border: "none",
                  borderRadius: 12,
                  padding: "12px 18px",
                  fontWeight: 800,
                  fontSize: 15,
                  textDecoration: "none",
                }}
              >
                Browse All Properties
              </a>
            </div>
          </div>
        </section>

        {/* FAQ (6 items, 3 + 3) */}
        <section style={{ marginBottom: 8 }}>
          <h2 style={{ fontWeight: 800, fontSize: 20, marginBottom: 8, color: "#0f172a" }}>Frequently Asked Questions</h2>
          <div className="row">
            <div className="col-lg-6">
              {[
                { q: "What is the official PIN of Kurukshetra University?", a: "136119 is the official PIN for Kurukshetra University Sub Office (Delivery). You may see 136118 for nearby localities, but the KUK S.O uses 136119." },
                { q: "How should I write the complete postal address?", a: "Example: 'Recipient Name, Department/Block, Kurukshetra University (KUK), Thanesar, Kurukshetra – 136119, Haryana, India'. Add phone number for faster delivery." },
                { q: "What are the counter timings?", a: "Typical India Post timings are Mon–Sat ~9:30 AM to ~5:30 PM (lunch break varies). Sundays/Postal holidays closed. Timings can vary locally—call the office to confirm." }
              ].map((f, i) => (
                <details key={i} style={{ border: '1px solid #e2e8f0', borderRadius: 12, padding: 14, background: '#fff', marginBottom: 10 }}>
                  <summary style={{ fontWeight: 700, cursor: 'pointer' }}>{f.q}</summary>
                  <div style={{ color: '#475569', marginTop: 6 }}>{f.a}</div>
                </details>
              ))}
            </div>
            <div className="col-lg-6">
              {[
                { q: "Does COD/parcel delivery work at KUK S.O?", a: "Yes. Registered, Speed Post and parcels are delivered as per India Post serviceability for PIN 136119. Check specific service availability before dispatch." },
                { q: "Who to contact for queries?", a: "Kurukshetra University S.O phone: 01744-238034. Related Head Office: Kurukshetra H.O. You can also track consignments at www.indiapost.gov.in." },
                { q: "Which areas share PIN 136119?", a: "Examples include Gurukul, Jyotisar, Bagthala, Barna, Dhurala and more localities in Kurukshetra district." }
              ].map((f, i) => (
                <details key={i} style={{ border: '1px solid #e2e8f0', borderRadius: 12, padding: 14, background: '#fff', marginBottom: 10 }}>
                  <summary style={{ fontWeight: 700, cursor: 'pointer' }}>{f.q}</summary>
                  <div style={{ color: '#475569', marginTop: 6 }}>{f.a}</div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Sources */}
        <section>
          <div style={{ fontSize: 12, color: "#64748b" }}>
            Sources: Public PIN code directories and government-linked datasets.
          </div>
        </section>
      </div>
    </main>
  );
};

export default page;


