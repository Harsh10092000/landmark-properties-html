"use client"
import React, { useState } from 'react';
import Link from 'next/link';


const FaqClinet = () => {
  const [openItems, setOpenItems] = useState(new Set());

  const toggleItem = (index) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  const faqData = [
    {
      question: "How do I find the best property deals on LandmarkPlots?",
      answer: "LandmarkPlots offers multiple ways to discover exceptional property deals. Use our advanced search filters to narrow down properties by location, price range, property type, and amenities. Set up property alerts to receive notifications about new listings matching your criteria. Our featured properties section showcases premium deals, while our 'Hot Deals' category highlights time-sensitive opportunities. Additionally, our expert property consultants can provide personalized recommendations based on your specific requirements and budget."
    },
    {
      question: "What documents do I need to buy a property in India?",
      answer: "When purchasing property in India, you'll need several essential documents: Sale Deed or Title Deed proving ownership, Encumbrance Certificate showing no pending loans, Property Tax Receipts, Building Approval Plans, Completion Certificate for constructed properties, and No Objection Certificates (NOCs) from relevant authorities. For financing, prepare income proof, bank statements, and identity documents. Always verify document authenticity through legal professionals and conduct thorough due diligence before finalizing any property transaction."
    },
    {
      question: "How can I verify if a property is legally clear?",
      answer: "Property verification involves multiple steps: Check the Sale Deed for clear title transfer history, obtain an Encumbrance Certificate from the Sub-Registrar's office, verify building approvals and completion certificates with local authorities, confirm property tax payments are up-to-date, and check for any pending litigation. Our platform provides property verification services, and we recommend consulting with legal experts for comprehensive due diligence. Always verify seller credentials and cross-check all documents with government records."
    },
    {
      question: "What are the hidden costs when buying property?",
      answer: "Beyond the property price, consider these additional costs: Stamp Duty and Registration charges (typically 5-8% of property value), Legal fees for documentation and verification, Property tax and maintenance charges, Home loan processing fees and insurance, Interior decoration and furnishing costs, Utility connection charges, and Society maintenance fees for apartments. Budget an additional 10-15% of the property value for these expenses. Our property cost calculator helps estimate total investment requirements accurately."
    },
    {
      question: "How do I choose between buying and renting?",
      answer: "Consider these factors: Buying offers long-term investment benefits, equity building, and stability, while renting provides flexibility and lower upfront costs. Calculate the price-to-rent ratio in your area - if it's below 15, buying might be favorable. Consider your financial stability, job security, and long-term plans. Factor in maintenance costs, property appreciation potential, and tax benefits. Our financial advisors can help analyze your specific situation and provide personalized recommendations for optimal decision-making."
    },
    {
      question: "What are the best areas for property investment in major cities?",
      answer: "Prime investment areas vary by city: In Mumbai, consider Bandra Kurla Complex, Powai, and Thane for high returns. Delhi NCR offers opportunities in Dwarka Expressway, Noida Extension, and Greater Noida. Bangalore's tech corridors like Whitefield, Electronic City, and Sarjapur Road show strong growth. Hyderabad's HITEC City, Gachibowli, and Financial District are emerging hotspots. Look for areas with upcoming infrastructure projects, good connectivity, and planned developments. Our market analysis reports provide detailed insights into emerging investment opportunities."
    },
    {
      question: "How do I negotiate the best property price?",
      answer: "Effective negotiation requires preparation: Research recent sales in the area to understand market rates, identify property issues that can justify lower offers, get pre-approved financing to show serious intent, and be ready to walk away if terms aren't favorable. Consider asking for seller concessions like covering closing costs or repairs. Our negotiation experts can guide you through the process and help you secure the best possible deal while maintaining professional relationships."
    },
    {
      question: "What should I check before buying a resale property?",
      answer: "Thorough inspection is crucial: Check structural integrity and signs of water damage, verify all electrical and plumbing systems, inspect for pest infestations, review society rules and pending dues for apartments, verify parking allocation and storage spaces, check neighborhood safety and amenities, review maintenance history and upcoming repairs, and confirm utility connections and meter readings. Our property inspection services provide comprehensive evaluation reports to help you make informed decisions."
    },
    {
      question: "How do I calculate property appreciation potential?",
      answer: "Property appreciation depends on multiple factors: Location development plans and infrastructure projects, economic growth in the area, supply and demand dynamics, government policies and regulations, and overall market trends. Research historical price trends in the locality, upcoming infrastructure developments, and planned commercial projects. Consider factors like proximity to transportation hubs, educational institutions, and healthcare facilities. Our market analysis tools provide detailed appreciation projections based on comprehensive data analysis."
    },
    {
      question: "What are the tax benefits of property investment?",
      answer: "Property investment offers several tax advantages: Home loan interest deduction up to ₹2 lakhs annually under Section 24(b), principal repayment deduction up to ₹1.5 lakhs under Section 80C, additional deduction of ₹1.5 lakhs for first-time homebuyers under Section 80EE, property tax deductions, and capital gains benefits for long-term investments. Consult with tax professionals to maximize your benefits and ensure compliance with all applicable regulations."
    },
    {
      question: "How do I list my property for sale on LandmarkPlots?",
      answer: "Listing your property is simple: Create an account on LandmarkPlots, click 'Add Listing' in the header, fill in detailed property information including location, price, amenities, and high-quality photographs, provide accurate contact details, and submit for review. Our team verifies all information before publishing. Premium listings with professional photography and virtual tours receive higher visibility. We also offer marketing support to maximize your property's exposure to potential buyers."
    },
    {
      question: "What makes LandmarkPlots different from other property websites?",
      answer: "LandmarkPlots stands out through our comprehensive approach: We offer verified property listings with detailed documentation, personalized consultation services, advanced search and filtering options, market analysis and investment guidance, professional photography and virtual tour services, legal verification support, and post-sale assistance. Our platform combines technology with human expertise to provide a seamless property buying and selling experience. We prioritize transparency, accuracy, and customer satisfaction in all our services."
    }
  ];

  return (
    <>
      <div className="faq-page">
        <div className="hero-section">
          <div className="hero-content">
            <div className="hero-badge">FAQ</div>
            <h1 className="hero-title">Frequently Asked Questions</h1>
            <p className="hero-subtitle">
              Everything you need to know about property buying, selling, and real estate investment in India
            </p>
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">12</span>
                <span className="stat-label">Common Questions</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">24/7</span>
                <span className="stat-label">Expert Support</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">100%</span>
                <span className="stat-label">Verified Answers</span>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="floating-card card-1">
              <div className="card-icon">🏠</div>
              <div className="card-text">Property Search</div>
            </div>
            <div className="floating-card card-2">
              <div className="card-icon">📋</div>
              <div className="card-text">Legal Docs</div>
            </div>
            <div className="floating-card card-3">
              <div className="card-icon">💰</div>
              <div className="card-text">Investment</div>
            </div>
          </div>
        </div>

        <div className="faq-container">
          <div className="faq-header">
            <h2 className="faq-section-title">Find Your Answers</h2>
            <p className="faq-section-subtitle">
              Browse through our comprehensive FAQ section to get answers to all your property-related queries
            </p>
          </div>

          <div className="faq-grid">
            {faqData.map((item, index) => (
              <div key={index} className={`faq-card ${openItems.has(index) ? 'active' : ''}`}>
                <button 
                  className="faq-card-header"
                  onClick={() => toggleItem(index)}
                  aria-expanded={openItems.has(index)}
                >
                  <div className="faq-card-content">
                    <span className="faq-number">{(index + 1).toString().padStart(2, '0')}</span>
                    <h3 className="faq-question-text">{item.question}</h3>
                  </div>
                  <div className="faq-toggle">
                    <svg 
                      className={`toggle-icon ${openItems.has(index) ? 'rotated' : ''}`}
                      width="24" 
                      height="24" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </button>
                <div className={`faq-card-body ${openItems.has(index) ? 'show' : ''}`}>
                  <div className="faq-answer-content">
                    <p>{item.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="cta-section">
            <div className="cta-card">
              <div className="cta-header">
                <div className="cta-icon">💬</div>
                <h3 className="cta-title">Still Have Questions?</h3>
                <p className="cta-description">
                  Our expert team is here to help you with all your property-related queries. 
                  Get personalized assistance from our real estate professionals.
                </p>
              </div>
              <div className="cta-actions">
                <Link href="/contactus" className="cta-button primary">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Contact Our Experts
                </Link>
                <Link href="/allproperties" className="cta-button secondary">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <polyline points="9,22 9,12 15,12 15,22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Browse Properties
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .faq-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #02a550 0%, #764ba2 100%);
          color: #1a1a1a;
        }

        .hero-section {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 80px 5% 120px;
          position: relative;
          overflow: hidden;
        }

        .hero-content {
          flex: 1;
          max-width: 600px;
          z-index: 2;
        }

        .hero-badge {
          display: inline-block;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: white;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 24px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .hero-title {
          font-size: 4rem;
          font-weight: 900;
          color: white;
          margin-bottom: 24px;
          line-height: 1.1;
          text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }

        .hero-subtitle {
          font-size: 1.3rem;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 40px;
          line-height: 1.6;
        }

        .hero-stats {
          display: flex;
          gap: 40px;
          margin-top: 40px;
        }

        .stat-item {
          text-align: center;
        }

        .stat-number {
          display: block;
          font-size: 2.5rem;
          font-weight: 800;
          color: white;
          margin-bottom: 8px;
        }

        .stat-label {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.8);
          font-weight: 500;
        }

        .hero-visual {
          flex: 1;
          position: relative;
          height: 400px;
        }

        .floating-card {
          position: absolute;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-radius: 16px;
          padding: 20px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          animation: float 6s ease-in-out infinite;
        }

        .card-1 {
          top: 20px;
          right: 20px;
          animation-delay: 0s;
        }

        .card-2 {
          top: 120px;
          right: 120px;
          animation-delay: 2s;
        }

        .card-3 {
          top: 220px;
          right: 60px;
          animation-delay: 4s;
        }

        .card-icon {
          font-size: 24px;
          margin-bottom: 8px;
        }

        .card-text {
          font-size: 14px;
          font-weight: 600;
          color: #333;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        .faq-container {
          background: white;
          border-radius: 40px 40px 0 0;
          padding: 80px 5% 60px;
          margin-top: -40px;
          position: relative;
          z-index: 1;
        }

        .faq-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .faq-section-title {
          font-size: 3rem;
          font-weight: 800;
          color: #1a1a1a;
          margin-bottom: 16px;
        //   background: linear-gradient(135deg, #02a550, #764ba2);
        linear-gradient(135deg, #02a550 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .faq-section-subtitle {
          font-size: 1.2rem;
          color: #666;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .faq-grid {
          display: grid;
          gap: 24px;
          max-width: 1000px;
          margin: 0 auto 80px;
        }

        .faq-card {
          background: white;
          border-radius: 20px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          border: 1px solid #f0f0f0;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .faq-card:hover {
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
          transform: translateY(-2px);
        }

        .faq-card.active {
          box-shadow: 0 12px 40px rgba(102, 126, 234, 0.15);
          border-color: #02a550;
        }

        .faq-card-header {
          width: 100%;
          padding: 24px 30px;
          background: none;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: all 0.3s ease;
        }

        .faq-card-header:hover {
          background: #f8f9ff;
        }

        .faq-card-content {
          display: flex;
          align-items: center;
          gap: 20px;
          flex: 1;
        }

        .faq-number {
          background: #02a550;
          color: white;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 14px;
          flex-shrink: 0;
        }

        .faq-question-text {
          font-size: 16px;
          font-weight: 600;
          color: #1a1a1a;
          line-height: 1.4;
          margin: 0;
          text-align: left;
        }

        .faq-toggle {
          flex-shrink: 0;
        }

        .toggle-icon {
          color: #02a550;
          transition: transform 0.3s ease;
        }

        .toggle-icon.rotated {
          transform: rotate(180deg);
        }

        .faq-card-body {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s ease;
          background: #f8f9ff;
        }

        .faq-card-body.show {
          max-height: 500px;
        }

        .faq-answer-content {
          padding: 0 30px 24px;
        }

        .faq-answer-content p {
          margin: 0;
          line-height: 1.7;
          color: #555;
          font-size: 15px;
        }

        .cta-section {
          margin-top: 80px;
        }

        .cta-card {
          background: linear-gradient(135deg, #02a550, #3d787a);
          border-radius: 24px;
          padding: 60px;
          text-align: center;
          color: white;
          position: relative;
          overflow: hidden;
        }

        .cta-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.1"/><circle cx="50" cy="10" r="0.5" fill="white" opacity="0.1"/><circle cx="10" cy="60" r="0.5" fill="white" opacity="0.1"/><circle cx="90" cy="40" r="0.5" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
          opacity: 0.3;
        }

        .cta-header {
          position: relative;
          z-index: 1;
        }

        .cta-icon {
          font-size: 48px;
          margin-bottom: 20px;
        }

        .cta-title {
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 16px;
          color: white;
        }

        .cta-description {
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.9);
          max-width: 600px;
          margin: 0 auto 40px;
          line-height: 1.6;
        }

        .cta-actions {
          display: flex;
          gap: 20px;
          justify-content: center;
          flex-wrap: wrap;
          position: relative;
          z-index: 1;
        }

        .cta-button {
          display: inline-flex;
          align-items: center;
          gap: 16px;
          padding: 20px 40px;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 700;
          font-size: 18px;
          text-transform: uppercase;
          letter-spacing: 1px;
          transition: all 0.3s ease;
          border: 3px solid transparent;
          min-width: 220px;
          justify-content: center;
          position: relative;
          overflow: hidden;
          cursor: pointer;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
        }

        .cta-button.primary {
          background: linear-gradient(135deg, #ff4757 0%, #ff3742 100%);
          color: white;
          border-color: #ff4757;
        }

        .cta-button.primary:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 12px 30px rgba(255, 71, 87, 0.4);
          background: linear-gradient(135deg, #ff3742 0%, #ff4757 100%);
        }

        .cta-button.primary:active {
          transform: translateY(-2px) scale(0.98);
        }

        .cta-button.secondary {
          background: linear-gradient(135deg, #2f3542 0%, #3742fa 100%);
          color: white;
          border-color: #2f3542;
        }

        .cta-button.secondary:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 12px 30px rgba(55, 66, 250, 0.4);
          background: linear-gradient(135deg, #3742fa 0%, #2f3542 100%);
        }

        .cta-button.secondary:active {
          transform: translateY(-2px) scale(0.98);
        }

        .cta-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s ease;
        }

        .cta-button:hover::before {
          left: 100%;
        }

        @media (max-width: 768px) {
          .hero-section {
            flex-direction: column;
            text-align: center;
            padding: 60px 20px 80px;
          }

          .hero-title {
            font-size: 2.5rem;
          }

          .hero-subtitle {
            font-size: 1.1rem;
          }

          .hero-stats {
            justify-content: center;
            gap: 30px;
          }

          .hero-visual {
            height: 300px;
            margin-top: 40px;
          }

          .faq-container {
            padding: 60px 20px 40px;
          }

          .faq-section-title {
            font-size: 2.2rem;
          }

          .faq-card-header {
            padding: 20px 24px;
          }

          .faq-question-text {
            font-size: 15px;
          }

          .faq-answer-content {
            padding: 0 24px 20px;
          }

          .cta-card {
            padding: 40px 24px;
          }

          .cta-title {
            font-size: 2rem;
          }

          .cta-actions {
            flex-direction: column;
            align-items: center;
          }

          .cta-button {
            width: 100%;
            max-width: 300px;
          }
        }

        @media (max-width: 480px) {
          .hero-title {
            font-size: 2rem;
          }

          .hero-stats {
            flex-direction: column;
            gap: 20px;
          }

          .faq-section-title {
            font-size: 1.8rem;
          }

          .faq-card-content {
            gap: 15px;
          }

          .faq-number {
            width: 35px;
            height: 35px;
            font-size: 12px;
          }

          .faq-question-text {
            font-size: 14px;
          }
        }
      `}</style>
    </>
  );
};

export default FaqClinet;

