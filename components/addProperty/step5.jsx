import React, { useState, useEffect } from "react";
import "./step-form.css";

const ownershipOptions = ["Ownership", "Power of Attorney"];
const authorityOptions = ["HSVP", "MC", "DTP", "Other"];
const otherRoomsOptions = ["Puja Room", "Store Room", "Study Room"];
const facilitiesOptions = [
  "Schools",
  "Hospitals",
  "Public Transportation",
  "Shops/Malls",
  "Restaurants",
  "Parks/Green Spaces",
];

function priceFormat(val) {
  if (!val) return "e.g. ₹ 10,00,000";
  let num = val.toString().replace(/[^0-9]/g, "");
  if (!num) return "e.g. ₹ 10,00,000";
  return (
    "₹ " +
    num.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  );
}

export default function Step5({handleStepChange, onSubmit, loading, initialData}) {
  const [ownership, setOwnership] = useState(initialData?.ownership || "");
  const [authority, setAuthority] = useState(initialData?.authority || "");
  const [otherRooms, setOtherRooms] = useState(initialData?.otherRooms || []);
  const [facilities, setFacilities] = useState(initialData?.facilities || []);
  const [amount, setAmount] = useState(initialData?.amount || "");
  const [negotiable, setNegotiable] = useState(initialData?.negotiable !== undefined ? initialData.negotiable : true);
  const [rented, setRented] = useState(initialData?.rented !== undefined ? initialData.rented : false);
  const [corner, setCorner] = useState(initialData?.corner !== undefined ? initialData.corner : false);
  const [desc, setDesc] = useState(initialData?.desc || "");
  const [formSubmit, setFormSubmit] = useState(false);

  // Load initial data when component mounts
  useEffect(() => {
    if (initialData) {
      setOwnership(initialData.ownership || "");
      setAuthority(initialData.authority || "");
      setOtherRooms(initialData.otherRooms || []);
      setFacilities(initialData.facilities || []);
      setAmount(initialData.amount || "");
      setNegotiable(initialData.negotiable !== undefined ? initialData.negotiable : true);
      setRented(initialData.rented !== undefined ? initialData.rented : false);
      setCorner(initialData.corner !== undefined ? initialData.corner : false);
      setDesc(initialData.desc || "");
    }
  }, [initialData]);

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
      authority,
      otherRooms,
      facilities,
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

    await onSubmit(5, formData);
  };

  return (
    <div className="step1-form">
      <div className="step1-scrollable">
        <div className="container">
          <div className="col-md-12">
            <div className="step-info">
              <strong>Why pricing and other details?</strong><br />
              Accurate pricing and extra details (like authority, rooms, facilities) help buyers compare properties and make informed decisions. The more info you provide, the more attractive and trustworthy your listing will be.
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

          {/* Authority Approved */}
          <div className="step1-label" style={{ marginTop: 16 }}>Authority Approved</div>
          <div className="step1-pill-group">
            {authorityOptions.map((opt) => (
              <button
                key={opt}
                className={`step1-pill${authority === opt ? " selected" : ""}`}
                type="button"
                onClick={() => setAuthority(opt)}
              >
                {opt}
              </button>
            ))}
          </div>

          {/* Other Rooms */}
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

          {/* Near By Facilities */}
          <div className="step1-label" style={{ marginTop: 16 }}>Near By Facilities</div>
          <div className="step1-pill-group step1-pill-group-wrap">
            {facilitiesOptions.map((opt) => (
              <button
                key={opt}
                className={`step1-pill${facilities.includes(opt) ? " selected" : ""}`}
                type="button"
                onClick={() => handleMultiSelect(facilities, setFacilities, opt)}
              >
                {opt}
              </button>
            ))}
          </div>

          {/* Expected Amount */}
          <div style={{ marginTop: 24 }}>
            <input
              className="step-input"
              placeholder="Expected Amount"
              value={amount}
              onChange={e => setAmount(e.target.value.replace(/[^0-9]/g, ""))}
            />
            {formSubmit && !amount && (
              <div className="step-error-msg">Expected Amount is required</div>
            )}
            <div className="price-in-words" style={{ background: '#f6fbf6', color: '#388e3c', padding: '6px 12px', borderRadius: 4, fontSize: '1em', marginTop: 2 }}>
              {priceFormat(amount)}
            </div>
          </div>

          {/* Checkboxes */}
          <div className="step-checkbox-row" style={{ marginTop: 20, marginBottom: 8, display: 'flex', gap: 32, flexWrap: 'wrap' }}>
            <label className="step-checkbox-label">
              <input
                type="checkbox"
                checked={negotiable}
                onChange={() => setNegotiable(!negotiable)}
              />
              Price Negotiable
            </label>
            <label className="step-checkbox-label">
              <input
                type="checkbox"
                checked={rented}
                onChange={() => setRented(!rented)}
              />
              Already on Rented
            </label>
            <label className="step-checkbox-label">
              <input
                type="checkbox"
                checked={corner}
                onChange={() => setCorner(!corner)}
              />
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
          </div>

          {/* Summary Section */}
          <div className="summary-section">
            <div className="summary-header">
              <div className="summary-icon">🎉</div>
              <div className="summary-title">You're Almost Done!</div>
              <div className="summary-subtitle">Review your property details and publish your listing</div>
            </div>
            
            <div className="summary-content">
              <div className="summary-item">
                <div className="summary-item-icon">✅</div>
                <div className="summary-item-text">
                  <strong>Property Details Complete</strong>
                  <span>All basic information has been filled</span>
                </div>
              </div>
              
              <div className="summary-item">
                <div className="summary-item-icon">📍</div>
                <div className="summary-item-text">
                  <strong>Location Added</strong>
                  <span>Property location and address details saved</span>
                </div>
              </div>
              
              <div className="summary-item">
                <div className="summary-item-icon">🏠</div>
                <div className="summary-item-text">
                  <strong>Property Specifications</strong>
                  <span>Rooms, area, and amenities details completed</span>
                </div>
              </div>
              
              <div className="summary-item">
                <div className="summary-item-icon">📸</div>
                <div className="summary-item-text">
                  <strong>Images Ready</strong>
                  <span>Property photos uploaded and ready</span>
                </div>
              </div>
              
              <div className="summary-item">
                <div className="summary-item-icon">💰</div>
                <div className="summary-item-text">
                  <strong>Pricing Set</strong>
                  <span>Price and additional details configured</span>
                </div>
              </div>
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
    </div>
  );
}
