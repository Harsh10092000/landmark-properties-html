import React, { useState, useEffect } from "react";

const adTypes = [
  { label: "Sale", icon: "🟢" },
  { label: "Rent", icon: "🔴" },
];
const userTypes = [
  { label: "Broker", icon: "🧑‍💼" },
  { label: "Owner", icon: "👤" },
];
const proTypes = [
  { value: "Residential", icon: "🏠" },
  { value: "Land", icon: "🌱" },
  { value: "Commercial", icon: "🏢" },
];
const proResSubTypes = [
  { value: "Apartment,Residential", item: "Apartment" },
  { value: "Independent House,Residential", item: "Independent House" },
  { value: "Builder Floor,Residential", item: "Builder Floor" },
  { value: "Farm House,Residential", item: "Farm House" },
  { value: "Raw House,Residential", item: "Raw House" },
  { value: "Retirement Community,Residential", item: "Retirement Community" },
  { value: "Studio Apartment,Residential", item: "Studio Apartment" },
  { value: "RK,Residential", item: "RK" },
];
const proLandSubTypes = [
  { value: "Residential Land,Land", item: "Residential Land" },
  { value: "Commercial Land,Land", item: "Commercial Land" },
  { value: "Industrial Land,Land", item: "Industrial Land" },
  { value: "Agricultural Land,Land", item: "Agricultural Land" },
  { value: "Farm House Land,Land", item: "Farm House Land"},
  { value: "Institutional Land,Land", item: "Institutional Land" },
];
const proCommercialSubTypes = [
  { value: "Retail Showroom,Commercial", item: "Retail Showroom" },
  { value: "Commercial Building,Commercial", item: "Commercial Building" },
  { value: "Office Complex,Commercial", item: "Office Complex" },
  { value: "Software Technology Park,Commercial", item: "Software Technology Park" },
  { value: "Warehouse,Commercial", item: "Warehouse" },
  { value: "Industrial Estate,Commercial", item: "Industrial Estate" },
  { value: "Institutional Building,Commercial", item: "Institutional Building" },
  { value: "Petrol Pump,Commercial", item: "Petrol Pump" },
  { value: "Cold Store,Commercial", item: "Cold Store" },
];

export default function Step1({handleStepChange, onSubmit, loading, initialData}) {
  const [adType, setAdType] = useState(initialData.adType || "Sale");
  const [userType, setUserType] = useState(initialData.userType || "Broker");
  const [propertyType, setPropertyType] = useState(initialData.propertyType || "Residential");
  const [propertySubType, setPropertySubType] = useState(initialData.propertySubType || "");
  const [formSubmit, setFormSubmit] = useState(false);

  // Load initial data when component mounts
  useEffect(() => {
    if (initialData) {
      setAdType(initialData.adType || "Sale");
      setUserType(initialData.userType || "Broker");
      setPropertyType(initialData.propertyType || "Residential");
      setPropertySubType(initialData.propertySubType || "");
    }
  }, [initialData]);

  let subTypes = [];
  if (propertyType === "Residential") subTypes = proResSubTypes;
  else if (propertyType === "Land") subTypes = proLandSubTypes;
  else if (propertyType === "Commercial") subTypes = proCommercialSubTypes;

  const handleSaveAndNext = async () => {
    setFormSubmit(true);
    if (!adType || !userType || !propertyType || !propertySubType) {
      return;
    }

    const formData = {
      adType,
      userType,
      propertyType,
      propertySubType
    };

    await onSubmit(1, formData);
  };

  return (
    <div className="step1-form">
      <div className="step1-scrollable">
        <div className="container">
          <div className="row">
            
            <div className="col-md-12">
              <div className="step-info">
                <strong>Why provide these details?</strong><br/>
                Choosing the right ad type, user type, and property type helps us show your listing to the most relevant audience. Accurate basic details ensure your property appears in the right searches and attracts serious buyers or renters.
              </div>
            </div>
            <div className="col-md-12">
              <div className="step1-label">📢 Ad Type <span style={{color:'#ec161e'}}>*</span></div>
              <div className="step1-pill-group">
                {adTypes.map((type) => (
                  <button
                    key={type.label}
                    className={`step1-pill${adType === type.label ? " selected" : ""}`}
                    onClick={() => setAdType(type.label)}
                    type="button"
                  >
                    {type.label}
                  </button>
                ))}
              </div>
              {formSubmit && !adType && <div className="step-error-msg">Ad Type is required</div>}
            </div>
            <div className="col-md-12">
              <div className="step1-label">👤 Are you a...? <span style={{color:'#ec161e'}}>*</span></div>
              <div className="step1-pill-group">
                {userTypes.map((type) => (
                  <button
                    key={type.label}
                    className={`step1-pill${userType === type.label ? " selected" : ""}`}
                    onClick={() => setUserType(type.label)}
                    type="button"
                  >
                    {type.label}
                  </button>
                ))}
              </div>
              {formSubmit && !userType && <div className="step-error-msg">User Type is required</div>}
            </div>
            <div className="step1-section col-md-12">
              <div className="step1-label">🏠 Property Type <span style={{color:'#ec161e'}}>*</span></div>
              <div className="step1-pill-group">
                {proTypes.map((type) => (
                  <button
                    key={type.value}
                    className={`step1-pill${propertyType === type.value ? " selected" : ""}`}
                    onClick={() => {
                      setPropertyType(type.value);
                      setPropertySubType("");
                    }}
                    type="button"
                  >
                    {type.value}
                  </button>
                ))}
              </div>
              {formSubmit && !propertyType && <div className="step-error-msg">Property Type is required</div>}
            </div>
            <div className="step1-section col-md-12">
              <div className="step1-label">🏷️ Property Sub Type <span style={{color:'#ec161e'}}>*</span></div>
              <div className="step1-pill-group step1-pill-group-wrap">
                {subTypes.map((type) => (
                  <button
                    key={type.value}
                    className={`step1-pill${propertySubType === type.value ? " selected" : ""}`}
                    onClick={() => setPropertySubType(type.value)}
                    type="button"
                  >
                    {type.item}
                  </button>
                ))}
              </div>
              {formSubmit && !propertySubType && <div className="step-error-msg">Property Sub Type is required</div>}
            </div>
          </div>
        </div>
      </div>
      <div className="step1-footer">
        {/* <button className="step1-skip-btn" onClick={() => handleStepChange(2)}>Skip</button> */}
        <button 
          className="step1-next-btn" 
          onClick={handleSaveAndNext}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save & Next"}
        </button>
      </div>
     
    </div>
  );
}