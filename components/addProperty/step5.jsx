import React, { useState, useEffect, useMemo } from "react";
import "./step-form.css";

const ownershipOptions = ["Ownership", "Power of Attorney"];

const otherRoomsOptions = ["Puja Room", "Store Room", "Study Room"];

export default function Step5({handleStepChange, onSubmit, loading, initialData, propertyType}) {
  const [ownership, setOwnership] = useState(initialData?.ownership || "");
  const [otherRooms, setOtherRooms] = useState(initialData?.otherRooms || []);
  const [amount, setAmount] = useState(initialData?.amount || "");
  const [negotiable, setNegotiable] = useState(initialData?.negotiable !== undefined ? initialData.negotiable : true);
  const [rented, setRented] = useState(initialData?.rented !== undefined ? initialData.rented : false);
  const [corner, setCorner] = useState(initialData?.corner !== undefined ? initialData.corner : false);
  const [desc, setDesc] = useState(initialData?.desc || "");
  const [formSubmit, setFormSubmit] = useState(false);

  const priceFormat = (val) => {
    if (!val) return "e.g. ₹ 10,00,000";
    let num = parseInt(val.toString().replace(/[^0-9]/g, ""));
    if (!num) return "e.g. ₹ 10,00,000";
    
    // Format in Indian currency style
    const formatted = num.toLocaleString('en-IN');
    
    // Add denomination
    let denomination = '';
    if (num >= 10000000) {
        denomination = ` (${(num / 10000000).toFixed(2)} Crore)`;
    } else if (num >= 100000) {
        denomination = ` (${(num / 100000).toFixed(2)} Lac)`;
    } else if (num >= 1000) {
        denomination = ` (${(num / 1000).toFixed(2)} Thousand)`;
    }
    
    return `₹ ${formatted}${denomination}`;
};
  // Load initial data when component mounts
  useEffect(() => {
    if (initialData) {
      setOwnership(initialData.ownership || "");
      setOtherRooms(initialData.otherRooms || []);
      setAmount(initialData.amount || "");
      setNegotiable(initialData.negotiable !== undefined ? initialData.negotiable : true);
      setRented(initialData.rented !== undefined ? initialData.rented : false);
      setCorner(initialData.corner !== undefined ? initialData.corner : false);
      setDesc(initialData.desc || "");
    }
  }, [initialData]);

  // Dynamic, human-like description generator (inspired by DynmaicDesc.jsx)
  const generateDynamicDescription = useMemo(() => {
    // Gather all possible fields from all steps
    const type = initialData?.propertySubType || propertyType || "Property";
    const area = initialData?.areaSize || amount || "";
    const areaUnit = initialData?.areaUnit || "";
    const adType = initialData?.adType || "Sale";
    const locality = initialData?.locality || "";
    const subDistrict = initialData?.subDistrict || "";
    const city = initialData?.city || "";
    const price = amount ? priceFormat(amount) : "";

    const ownershipText = ownership ? `${ownership} property. ` : '';
    const otherRoomsText = otherRooms.length > 0 ? `Includes ${otherRooms.join(", ")}. ` : '';
    const cornerText = corner ? "Corner property. " : "";
    const rentalStatusText = rented ? "Currently rented. " : "Available for immediate possession. ";
    const negotiableText = negotiable ? "Price is negotiable. " : "";
    const locationText = [locality, subDistrict, city].filter(Boolean).join(", ");
    const bedrooms = initialData?.bedrooms || "";
    const washrooms = initialData?.washrooms || "";
    const balconies = initialData?.balconies || "";
    const parking = initialData?.parking || "";
    const facing = initialData?.facing || "";
    const furnishing = initialData?.furnishing || "";
    const possession = initialData?.possession || "";
    const age = initialData?.age || "";
    const facilities = initialData?.facilities || [];

    // SEO-optimized property descriptions for high Google ranking
    let desc = "";
    if (type.includes("Apartment")) {
      desc = `Looking for ${bedrooms ? `${bedrooms} BHK` : ''} apartments for ${adType === "Rent" ? "rent" : "sale"} in ${locationText || "Haryana"}? Discover this exceptional${bedrooms ? ` ${bedrooms} BHK` : ''} apartment${area ? ` spanning ${area} ${areaUnit}` : ''}${locationText ? ` in the prime location of ${locationText}` : ''}. ${ownershipText}This modern apartment${furnishing ? ` is ${furnishing.toLowerCase()}` : ''}${facing ? ` and faces ${facing}` : ''}, offering the perfect blend of comfort and style. ${balconies ? `Enjoy ${balconies} balconies` : ''}${parking ? `, dedicated parking space` : ''}. ${otherRoomsText}The open floor plan is bright and airy, with large windows that flood the space with natural light throughout the day. The contemporary design features high-quality finishes and thoughtful details that make everyday living a pleasure. ${facilities.length ? `Conveniently located near ${facilities.join(", ")}. ` : ''}${price ? `Available for ${adType === "Rent" ? "rent" : "sale"} at ${price}. ` : ''}${negotiableText}${cornerText}${rentalStatusText}This is an excellent opportunity for families and professionals looking for a comfortable and well-connected home in ${locationText || "Haryana"}. Contact us now to schedule a viewing and make this apartment yours!`;
    } else if (type.includes("Independent House")) {
      desc = `Searching for independent houses for ${adType === "Rent" ? "rent" : "sale"} in ${locationText || "Haryana"}? This stunning independent house${area ? ` of ${area} ${areaUnit}` : ''}${locationText ? ` in the prestigious area of ${locationText}` : ''} is a true architectural masterpiece. ${ownershipText}${bedrooms ? `It features ${bedrooms} spacious bedrooms` : ''}${washrooms ? `, ${washrooms} modern washrooms` : ''}${balconies ? `, ${balconies} balconies` : ''}${parking ? `, and ample parking space` : ''}. ${otherRoomsText}The open layout is perfect for entertaining guests and family gatherings, with huge windows that flood every room with natural light. The house boasts premium construction quality with attention to detail in every corner. ${furnishing ? `The house is ${furnishing.toLowerCase()}. ` : ''}${facilities.length ? `Located near ${facilities.join(", ")}. ` : ''}${price ? `Available for ${adType === "Rent" ? "rent" : "sale"} at ${price}. ` : ''}${negotiableText}${cornerText}${rentalStatusText}This property offers the perfect combination of luxury, comfort, and functionality in ${locationText || "Haryana"}. Contact us to schedule a visit and experience the grandeur of this exceptional home!`;
    } else if (type.includes("Builder Floor")) {
      desc = `Find builder floors for ${adType === "Rent" ? "rent" : "sale"} in ${locationText || "Haryana"}. This builder floor${area ? ` of ${area} ${areaUnit}` : ''}${locationText ? ` in the vibrant locality of ${locationText}` : ''} is a blank canvas ready for your creative vision. ${ownershipText}${bedrooms ? `It has ${bedrooms} well-proportioned bedrooms` : ''}${washrooms ? `, ${washrooms} functional washrooms` : ''}${balconies ? `, ${balconies} balconies` : ''}${parking ? `, and parking space` : ''}. ${otherRoomsText}The open layout is perfect for customization and creativity, and oversized windows bring in abundant natural light. The structure is solid and ready for your personal touch. ${furnishing ? `Currently ${furnishing.toLowerCase()}. ` : ''}${facilities.length ? `Conveniently located near ${facilities.join(", ")}. ` : ''}${price ? `Available for ${adType === "Rent" ? "rent" : "sale"} at ${price}. ` : ''}${negotiableText}${cornerText}${rentalStatusText}This is an excellent opportunity for those who want to create their dream space from scratch in ${locationText || "Haryana"}. Don't miss this chance to build something truly special!`;
    } else if (type.includes("Farm House") || type.includes("Raw House")) {
      desc = `Explore ${type.toLowerCase()} properties for ${adType === "Rent" ? "rent" : "sale"} in ${locationText || "Haryana"}. Check out this unique ${type.toLowerCase()}${area ? ` of ${area} ${areaUnit}` : ''}${locationText ? ` in the peaceful surroundings of ${locationText}` : ''}. ${ownershipText}${otherRoomsText}This property needs some tender loving care, but imagine the possibilities of making it exactly how you want. The potential here is enormous - you can transform this into your perfect retreat, whether it's a weekend getaway or a permanent residence. The location offers tranquility and privacy while still being accessible. ${facilities.length ? `Nearby amenities include ${facilities.join(", ")}. ` : ''}${price ? `Available for ${adType === "Rent" ? "rent" : "sale"} at ${price}. ` : ''}${negotiableText}${cornerText}${rentalStatusText}This is a rare opportunity for those who love projects and want to create something truly unique in ${locationText || "Haryana"}. Roll up your sleeves and make this place your masterpiece!`;
    } else if (type.includes("Studio Apartment")) {
      desc = `Discover studio apartments for ${adType === "Rent" ? "rent" : "sale"} in ${locationText || "Haryana"}. A thoughtfully designed studio apartment${area ? ` of ${area} ${areaUnit}` : ''}${locationText ? ` in the heart of ${locationText}` : ''} that maximizes functionality in a compact space. ${ownershipText}${otherRoomsText}This modern studio features clever space utilization with built-in storage solutions and a flexible layout that can adapt to your lifestyle. ${furnishing ? `It is ${furnishing.toLowerCase()}. ` : ''}Perfect for young professionals, students, or anyone who values convenience and low maintenance living. ${facilities.length ? `Located near ${facilities.join(", ")}. ` : ''}${price ? `Available for ${adType === "Rent" ? "rent" : "sale"} at ${price}. ` : ''}${negotiableText}${cornerText}${rentalStatusText}This studio offers the perfect balance of comfort, style, and practicality in ${locationText || "Haryana"}. Contact us for more details and to schedule a viewing!`;
    } else if (type.includes("Residential Land")) {
      desc = `Find residential land for ${adType === "Rent" ? "rent" : "sale"} in ${locationText || "Haryana"}. Check out this prime residential land${area ? ` of ${area} ${areaUnit}` : ''}${locationText ? ` in the developing area of ${locationText}` : ''}. ${ownershipText}This plot is perfect for building your dream home from the ground up. The location offers excellent connectivity and is in a rapidly developing area with great potential for appreciation. The land is well-drained and ready for construction. ${facilities.length ? `Nearby amenities include ${facilities.join(", ")}. ` : ''}${price ? `Available for ${adType === "Rent" ? "rent" : "sale"} at ${price}. ` : ''}${negotiableText}${cornerText}${rentalStatusText}This is an excellent investment opportunity for those who want to create their perfect home or for investors looking for long-term appreciation in ${locationText || "Haryana"}. Don't miss this chance to secure your piece of land in this promising location!`;
    } else if (type.includes("Commercial Land")) {
      desc = `Search for commercial land for ${adType === "Rent" ? "rent" : "sale"} in ${locationText || "Haryana"}. Great commercial land${area ? ` of ${area} ${areaUnit}` : ''}${locationText ? ` in the strategic location of ${locationText}` : ''}. ${ownershipText}This prime commercial plot is ideal for various business ventures including retail stores, offices, restaurants, or any commercial development. The location offers excellent visibility and foot traffic potential. ${facilities.length ? `Surrounded by ${facilities.join(", ")}. ` : ''}${price ? `Available for ${adType === "Rent" ? "rent" : "sale"} at ${price}. ` : ''}${negotiableText}${cornerText}${rentalStatusText}This is a fantastic opportunity for entrepreneurs and investors looking to establish or expand their business presence in ${locationText || "Haryana"}. The commercial potential of this location is exceptional. Contact us to explore the possibilities!`;
    } else if (type.includes("Industrial Land")) {
      desc = `Explore industrial land for ${adType === "Rent" ? "rent" : "sale"} in ${locationText || "Haryana"}. Check out this industrial land${area ? ` of ${area} ${areaUnit}` : ''}${locationText ? ` in the industrial zone of ${locationText}` : ''}. ${ownershipText}This well-located industrial plot is perfect for setting up factories, warehouses, manufacturing units, or any industrial facility. The area has proper infrastructure and connectivity for industrial operations. ${facilities.length ? `Nearby facilities include ${facilities.join(", ")}. ` : ''}${price ? `Available for ${adType === "Rent" ? "rent" : "sale"} at ${price}. ` : ''}${negotiableText}${cornerText}${rentalStatusText}This is an excellent opportunity for industrialists and manufacturers looking to expand their operations in ${locationText || "Haryana"}. The location offers all the necessary amenities for successful industrial development. Perfect for factories, warehouses, and more!`;
    } else if (type.includes("Retail Showroom")) {
      desc = `Find retail showrooms for ${adType === "Rent" ? "rent" : "sale"} in ${locationText || "Haryana"}. A premium retail showroom${area ? ` of ${area} ${areaUnit}` : ''}${locationText ? ` in the bustling commercial area of ${locationText}` : ''} is perfect for your business expansion. ${ownershipText}This showroom offers excellent visibility and high foot traffic potential, making it ideal for retail businesses. The space is well-designed with proper lighting and ventilation. ${facilities.length ? `Located near ${facilities.join(", ")}. ` : ''}${price ? `Available for ${adType === "Rent" ? "rent" : "sale"} at ${price}. ` : ''}${negotiableText}${cornerText}${rentalStatusText}This is a fantastic opportunity for retailers looking to establish a strong market presence in ${locationText || "Haryana"}. The location and design make it perfect for showcasing your products and attracting customers. Contact us for more details and to schedule a visit!`;
    } else {
      // Fallback generic with SEO optimization
      desc = `Search for properties for ${adType === "Rent" ? "rent" : "sale"} in ${locationText || "Haryana"}. Explore this exceptional property${type ? ` (${type})` : ''}${area ? ` of ${area} ${areaUnit}` : ''}${locationText ? ` in the desirable location of ${locationText}` : ''}. ${ownershipText}${otherRoomsText}This property offers excellent potential and is perfect for various purposes. ${facilities.length ? `Conveniently located near ${facilities.join(", ")}. ` : ''}${price ? `Available for ${adType === "Rent" ? "rent" : "sale"} at ${price}. ` : ''}${negotiableText}${cornerText}${rentalStatusText}This is a great opportunity that shouldn't be missed in ${locationText || "Haryana"}. Contact us for more information and to schedule a viewing!`;
    }
    return desc;
  }, [initialData, propertyType, amount, ownership, otherRooms, corner, rented, negotiable]);

  // Auto-fill description if empty on mount
  useEffect(() => {
    if (!desc && generateDynamicDescription) {
      setDesc(generateDynamicDescription);
    }
    // eslint-disable-next-line
  }, [generateDynamicDescription]);

  const handleMultiSelect = (arr, setArr, val) => {
    if (arr.includes(val)) {
      setArr(arr.filter((v) => v !== val));
    } else {
      setArr([...arr, val]);
    }
  };

  const handleSaveAndNext = async () => {
    setFormSubmit(true);
    if (!amount) {
      alert("Please enter the expected amount");
      return;
    }

    const formData = {
      ownership,
      otherRooms,
      amount,
      negotiable,
      rented,
      corner,
      desc,
      price: amount,
      priceUnit: "Lakh",
      negotiable: negotiable ? "Yes" : "No",
      rentalStatus: rented ? "Rented" : "Available",
      isComplete: true
    };

            const result = await onSubmit(5, formData);
    
    console.log('Step 5 result:', result);
  };

  return (
    <div className="step1-form">
      <div className="step1-scrollable">
        <div className="container">
          <div className="col-md-12">
            <div className="step-info">
              <strong>Why pricing and other details?</strong><br />
              Accurate pricing and extra details (like ownership, rooms, facilities) help buyers compare properties and make informed decisions. The more info you provide, the more attractive and trustworthy your listing will be.
            </div>
          </div>
          

          {/* Ownership */}
          <div className="step1-label">Ownership</div>
          <div className="step1-pill-group">
            {ownershipOptions.map((opt) => (
              <button
                key={opt}
                className={`step1-pill${ownership === opt ? " selected" : ""}`}
                type="button"
                onClick={() => setOwnership(opt)}
              >
                {opt}
              </button>
            ))}
          </div>



          {/* Other Rooms */}
          {propertyType !== "Land" && <>
          <div className="step1-label" style={{ marginTop: 16 }}>Other Rooms</div>
          <div className="step1-pill-group">
            {otherRoomsOptions.map((opt) => (
              <button
                key={opt}
                className={`step1-pill${otherRooms.includes(opt) ? " selected" : ""}`}
                type="button"
                onClick={() => handleMultiSelect(otherRooms, setOtherRooms, opt)}
              >
                {opt}
              </button>
            ))}
          </div>
          </>
}

          {/* Expected Amount */}
          <div style={{ marginTop: 24 }}>
            <input
              className="step-input"
              placeholder="e.g. ₹ 10,00,000 (10 Lac)"
              value={amount}
              onChange={e => setAmount(e.target.value.replace(/[^0-9]/g, ""))}
            />
            {formSubmit && !amount && (
              <div className="step-error-msg">Expected Amount is required</div>
            )}
            {amount && (
              <div className="price-formatted">{priceFormat(amount)}</div>
            )}
          </div>

          {/* Checkboxes */}
          <div className="step-checkbox-row">
            <label className="step-checkbox-label">
              <input
                type="checkbox"
                checked={negotiable}
                onChange={() => setNegotiable(!negotiable)}
              />
              <span className="step-checkbox-custom"></span>
              Price Negotiable
            </label>
            <label className="step-checkbox-label">
              <input
                type="checkbox"
                checked={rented}
                onChange={() => setRented(!rented)}
              />
              <span className="step-checkbox-custom"></span>
              Already on Rented
            </label>
            <label className="step-checkbox-label">
              <input
                type="checkbox"
                checked={corner}
                onChange={() => setCorner(!corner)}
              />
              <span className="step-checkbox-custom"></span>
              Corner Property
            </label>
          </div>

          {/* Description */}
          <div style={{ marginTop: 12 }}>
            <textarea
              className="step-input"
              style={{ minHeight: 80, resize: 'vertical' }}
              placeholder="Property Description"
              value={desc}
              onChange={e => setDesc(e.target.value)}
            />
            <div style={{fontSize: '0.9em', color: '#888', marginTop: 4}}>
              <span>SEO Tip: Edit or add more details for better ranking!</span>
            </div>
          </div>

        </div>
      </div>
      <div className="step1-footer d-flex justify-content-between">
        <div>
          <button className="step1-back-btn" onClick={() => handleStepChange(4)}>Back</button>
        </div>
        <div>
          <button 
            className="step1-next-btn" 
            type="button" 
            onClick={handleSaveAndNext}
            disabled={loading}
          >
            {loading ? "Publishing..." : "Finish & Publish"}
          </button>
        </div>
      </div>

      <style jsx>{`
        .summary-section {
          margin-top: 40px;
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          border-radius: 16px;
          padding: 32px;
          border: 1px solid #dee2e6;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        .summary-header {
          text-align: center;
          margin-bottom: 32px;
        }

        .summary-icon {
          font-size: 48px;
          margin-bottom: 16px;
        }

        .summary-title {
          font-size: 28px;
          font-weight: 700;
          color: #2c3e50;
          margin-bottom: 8px;
        }

        .summary-subtitle {
          font-size: 16px;
          color: #6c757d;
          font-weight: 500;
        }

        .summary-content {
          margin-bottom: 32px;
        }

        .summary-item {
          display: flex;
          align-items: center;
          padding: 16px 0;
          border-bottom: 1px solid #e9ecef;
        }

        .summary-item:last-child {
          border-bottom: none;
        }

        .summary-item-icon {
          font-size: 24px;
          margin-right: 16px;
          width: 40px;
          text-align: center;
        }

        .summary-item-text {
          flex: 1;
        }

        .summary-item-text strong {
          display: block;
          font-size: 16px;
          font-weight: 600;
          color: #2c3e50;
          margin-bottom: 4px;
        }

        .summary-item-text span {
          font-size: 14px;
          color: #6c757d;
        }

        .summary-tips {
          background: white;
          border-radius: 12px;
          padding: 24px;
          border: 1px solid #e9ecef;
          margin-top: 32px;
        }

        .tips-header {
          display: flex;
          align-items: center;
          margin-bottom: 20px;
        }

        .tips-icon {
          font-size: 24px;
          margin-right: 12px;
        }

        .tips-title {
          font-size: 18px;
          font-weight: 600;
          color: #2c3e50;
        }

        .tips-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .tip-item {
          font-size: 15px;
          color: #495057;
          padding: 14px 18px;
          border-left: 4px solid #ffd600;
          background: #f9fafb;
          border-radius: 8px;
          transition: background 0.2s, border-color 0.2s;
          margin-bottom: 0;
          box-shadow: 0 1px 4px rgba(44,62,80,0.03);
        }

        .tip-item:hover {
          background: #fffde7;
          border-left-color: #ffe082;
        }

        @media (max-width: 768px) {
          .summary-section {
            padding: 24px;
            margin-top: 24px;
          }

          .summary-title {
            font-size: 24px;
          }

          .summary-item {
            padding: 12px 0;
          }

          .summary-item-icon {
            font-size: 20px;
            width: 32px;
          }
        }
      `}</style>
      <style>{`
.price-formatted {
  color: #388e3c;
 padding: '6px 12px'
  margin-top: -10px;
  margin-bottom: 10px;
  font-size: 1em;
  letter-spacing: 0.5px;
  
}
`}</style>
    </div>
  );
}
