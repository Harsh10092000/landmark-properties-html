import React, { useState } from "react";
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

export default function Step5() {
  const [ownership, setOwnership] = useState("");
  const [authority, setAuthority] = useState("");
  const [otherRooms, setOtherRooms] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [amount, setAmount] = useState("");
  const [negotiable, setNegotiable] = useState(true);
  const [rented, setRented] = useState(false);
  const [corner, setCorner] = useState(false);
  const [desc, setDesc] = useState("");
  const [formSubmit, setFormSubmit] = useState(false);

  const handleMultiSelect = (arr, setArr, val) => {
    if (arr.includes(val)) {
      setArr(arr.filter((v) => v !== val));
    } else {
      setArr([...arr, val]);
    }
  };

  const handleSave = () => {
    setFormSubmit(true);
    if (!amount) return;
    // TODO: submit or go to next step
    alert("Saved!");
  };

  return (
    <div className="step1-form">
      <div className="step1-scrollable">
        <div className="container">
          <div className="col-md-12">
            <div className="step-info">
              <strong>Why pricing and other details?</strong><br/>
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
          <div className="step1-label" style={{marginTop:16}}>Authority Approved</div>
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
          <div className="step1-label" style={{marginTop:16}}>Other Rooms</div>
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
          <div className="step1-label" style={{marginTop:16}}>Near By Facilities</div>
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
          <div style={{marginTop:24}}>
            <input
              className="step-input"
              placeholder="Expected Amount"
              value={amount}
              onChange={e => setAmount(e.target.value.replace(/[^0-9]/g, ""))}
            />
            {formSubmit && !amount && (
              <div className="step-error-msg">Expected Amount is required</div>
            )}
            <div className="price-in-words" style={{background:'#f6fbf6', color:'#388e3c', padding:'6px 12px', borderRadius:4, fontSize:'1em', marginTop:2}}>
              {priceFormat(amount)}
            </div>
          </div>

          {/* Checkboxes */}
          <div className="step-checkbox-row" style={{marginTop:20, marginBottom:8, display:'flex', gap:32, flexWrap:'wrap'}}>
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
          <div style={{marginTop:12}}>
            <textarea
              className="step-input"
              style={{minHeight:80, resize:'vertical'}}
              placeholder="Property Description"
              value={desc}
              onChange={e => setDesc(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="step1-footer">
        <button className="step1-next-btn" type="button" onClick={handleSave}>
          Save & Next
        </button>
      </div>
    </div>
  );
}
