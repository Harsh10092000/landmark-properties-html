import React, { useState } from "react";

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

export default function Step1({handleStepChange}) {
  const [adType, setAdType] = useState("Sale");
  const [userType, setUserType] = useState("Broker");
  const [propertyType, setPropertyType] = useState("Residential");
  const [propertySubType, setPropertySubType] = useState("");

  let subTypes = [];
  if (propertyType === "Residential") subTypes = proResSubTypes;
  else if (propertyType === "Land") subTypes = proLandSubTypes;
  else if (propertyType === "Commercial") subTypes = proCommercialSubTypes;

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
              <div className="step1-label">📢 Ad Type</div>
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
            </div>
            <div className="col-md-12">
              <div className="step1-label">👤 Are you a...?</div>
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
            </div>
            <div className="step1-section col-md-12">
              <div className="step1-label">🏠 Property Type</div>
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
            </div>
            <div className="step1-section col-md-12">
              <div className="step1-label">🏷️ Property Sub Type</div>
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
            </div>
          </div>
        </div>
      </div>
      <div className="step1-footer">
        <button className="step1-skip-btn" onClick={() => handleStepChange(2)}>Skip</button>
        <button className="step1-next-btn">Save & Next</button>
      </div>
     
    </div>
  );
}