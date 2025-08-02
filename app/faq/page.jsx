"use client"
import React, { useState } from 'react';
import Link from 'next/link';

const FAQPage = () => {
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
        <div className="container">
          <div className="faq-header">
            <h1 className="faq-title">Frequently Asked Questions</h1>
            <p className="faq-subtitle">
              Find answers to common questions about property buying, selling, and real estate investment in India
            </p>
            <div className="faq-divider"></div>
          </div>

          <div className="faq-content">
            <div className="faq-list">
              {faqData.map((item, index) => (
                <div key={index} className={`faq-item ${openItems.has(index) ? 'active' : ''}`}>
                  <button 
                    className="faq-question"
                    onClick={() => toggleItem(index)}
                    aria-expanded={openItems.has(index)}
                  >
                    <span className="question-text">{item.question}</span>
                    <svg 
                      className={`faq-icon ${openItems.has(index) ? 'rotated' : ''}`}
                      width="28" 
                      height="28" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <div className={`faq-answer ${openItems.has(index) ? 'show' : ''}`}>
                    <p>{item.answer}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="faq-cta">
              <div className="cta-content">
                <h3>Still Have Questions?</h3>
                <p>Our expert team is here to help you with all your property-related queries</p>
                <div className="cta-buttons">
                  <Link href="/contactus" className="contact-btn">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Contact Us
                  </Link>
                  <Link href="/allproperties" className="browse-btn">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
      </div>

      <style jsx>{`
        .faq-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          padding: 80px 0 60px;
        }

        .faq-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .faq-title {
          font-size: 3.5rem;
          font-weight: 800;
          color: #1e293b;
          margin-bottom: 25px;
          background: linear-gradient(135deg, #16A34A, #22C55E);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .faq-subtitle {
          font-size: 1.4rem;
          color: #64748b;
          margin-bottom: 35px;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.6;
        }

        .faq-divider {
          width: 120px;
          height: 5px;
          background: linear-gradient(90deg, #16A34A, #22C55E);
          margin: 0 auto;
          border-radius: 3px;
          box-shadow: 0 2px 8px rgba(22, 163, 74, 0.3);
        }

        .faq-content {
          max-width: 1000px;
          margin: 0 auto;
        }

        .faq-list {
          margin-bottom: 70px;
        }

        .faq-item {
          background: white;
          border-radius: 20px;
          margin-bottom: 25px;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
          overflow: hidden;
          transition: all 0.4s ease;
          border: 1px solid rgba(22, 163, 74, 0.1);
        }

        .faq-item:hover {
          box-shadow: 0 12px 35px rgba(0, 0, 0, 0.15);
          transform: translateY(-3px);
          border-color: rgba(22, 163, 74, 0.2);
        }

        .faq-item.active {
          box-shadow: 0 15px 45px rgba(22, 163, 74, 0.2);
          border-color: rgba(22, 163, 74, 0.3);
        }

        .faq-question {
          width: 100%;
          padding: 30px 35px;
          background: none;
          border: none;
          text-align: left;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 14px;
          font-weight: 700;
          color: #1e293b;
          transition: all 0.3s ease;
        }

        .faq-question:hover {
          background: linear-gradient(135deg, #f0fdf4, #dcfce7);
        }

        .question-text {
          flex: 1;
          margin-right: 25px;
          line-height: 1.4;
        }

        .faq-icon {
          transition: transform 0.4s ease;
          color: #16A34A;
          flex-shrink: 0;
        }

        .faq-icon.rotated {
          transform: rotate(180deg);
        }

        .faq-answer {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s ease;
          background: linear-gradient(135deg, #f8fafc, #f1f5f9);
        }

        .faq-answer.show {
          max-height: 600px;
        }

        .faq-answer p {
          padding: 0 35px 30px;
          margin: 0;
          line-height: 1.8;
          color: #475569;
          font-size: 13px;
          text-align: justify;
        }

        .faq-cta {
          background: white;
          border-radius: 25px;
          padding: 50px;
          text-align: center;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.12);
          border: 1px solid rgba(22, 163, 74, 0.1);
        }

        .cta-content h3 {
          font-size: 2.5rem;
          font-weight: 800;
          color: #1e293b;
          margin-bottom: 20px;
          background: linear-gradient(135deg, #16A34A, #22C55E);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .cta-content p {
          font-size: 1.3rem;
          color: #64748b;
          margin-bottom: 40px;
          line-height: 1.6;
        }

        .cta-buttons {
          display: flex;
          gap: 25px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .contact-btn, .browse-btn {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 18px 35px;
          border-radius: 60px;
          text-decoration: none;
          font-weight: 700;
          transition: all 0.4s ease;
          font-size: 1.1rem;
          min-width: 200px;
          justify-content: center;
        }

        .contact-btn {
          background: linear-gradient(135deg, #16A34A, #22C55E);
          color: white;
          box-shadow: 0 6px 20px rgba(22, 163, 74, 0.4);
        }

        .contact-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 30px rgba(22, 163, 74, 0.5);
          background: linear-gradient(135deg, #15803d, #16a34a);
        }

        .browse-btn {
          background: white;
          color: #16A34A;
          border: 3px solid #16A34A;
          box-shadow: 0 6px 20px rgba(22, 163, 74, 0.2);
        }

        .browse-btn:hover {
          background: linear-gradient(135deg, #16A34A, #22C55E);
          color: white;
          transform: translateY(-3px);
          box-shadow: 0 12px 30px rgba(22, 163, 74, 0.4);
          border-color: transparent;
        }

        .contact-btn svg, .browse-btn svg {
          transition: transform 0.3s ease;
        }

        .contact-btn:hover svg, .browse-btn:hover svg {
          transform: scale(1.1);
        }

        @media (max-width: 768px) {
          .faq-page {
            padding: 60px 20px 40px;
          }

          .faq-title {
            font-size: 3rem;
          }

          .faq-subtitle {
            font-size: 1.2rem;
          }

          .faq-question {
            padding: 25px 30px;
            font-size: 14px;
          }

          .faq-answer p {
            padding: 0 30px 25px;
            font-size: 13px;
          }

          .faq-cta {
            padding: 40px 30px;
          }

          .cta-content h3 {
            font-size: 2.2rem;
          }

          .cta-content p {
            font-size: 1.2rem;
          }

          .cta-buttons {
            flex-direction: column;
            align-items: center;
            gap: 20px;
          }

          .contact-btn, .browse-btn {
            width: 100%;
            max-width: 350px;
            padding: 20px 30px;
            font-size: 1.2rem;
          }
        }

        @media (max-width: 480px) {
          .faq-title {
            font-size: 2.5rem;
          }

          .faq-question {
            padding: 22px 25px;
            font-size: 14px;
          }

          .faq-answer p {
            padding: 0 25px 22px;
            font-size: 13px;
          }

          .cta-content h3 {
            font-size: 2rem;
          }

          .cta-content p {
            font-size: 13px;
          }
        }
      `}</style>
    </>
  );
};

export default FAQPage;
