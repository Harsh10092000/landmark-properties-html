import React, { useState, useEffect } from "react";
import "./step-form.css";

const propertyAge = [
  { value: "0" },
  { value: "0-1" },
  { value: "1-3" },
  { value: "3-5" },
  { value: "5-10" },
  { value: "10+" },
];

const propertyBedrooms = [
  { value: "0" },
  { value: "1" },
  { value: "2" },
  { value: "3" },
  { value: "4" },
  { value: "5+" },
];

const propertyWashrooms = [
  { value: "0" },
  { value: "1" },
  { value: "2" },
  { value: "3" },
  { value: "4" },
  { value: "5+" },
];

const propertyBalconies = [
  { value: "0" },
  { value: "1" },
  { value: "2" },
  { value: "3" },
  { value: "4" },
  { value: "5+" },
];

const propertyParking = [
  { value: "0" },
  { value: "1" },
  { value: "2" },
  { value: "3" },
  { value: "4" },
  { value: "5+" },
];

const propertyFacing = [
  { value: "North" },
  { value: "North-East" },
  { value: "East" },
  { value: "South-East" },
  { value: "South" },
  { value: "South-West" },
  { value: "West" },
  { value: "North-West" },
];

const propertyFurnishing = [
  { value: "Fully Furnished" },
  { value: "Semi Furnished" },
  { value: "Unfurnished" },
];

const propertyPossession = [
  { value: "Immediate" },
  { value: "0-3 Month" },
  { value: "3-6 Month" },
  { value: "After 6 Months" },
];

const propertyFloors = [
  { value: "0" },
  { value: "1" },
  { value: "2" },
  { value: "3" },
  { value: "4" },
  { value: "5+" },
];

const propertySides = [
  { value: "1" },
  { value: "2" },
  { value: "3" },
  { value: "4" },
];

const facilitiesOptions = [
  "Schools",
  "Hospitals",
  "Public Transportation",
  "Shops/Malls",
  "Restaurants",
  "Parks/Green Spaces",
];

export default function Step3({handleStepChange, onSubmit, loading, initialData, propertyType}) {
  // State for each field
  const [age, setAge] = useState(initialData?.age || "");
  const [bedrooms, setBedrooms] = useState(initialData?.bedrooms || "");
  const [washrooms, setWashrooms] = useState(initialData?.washrooms || "");
  const [balconies, setBalconies] = useState(initialData?.balconies || "");
  const [parking, setParking] = useState(initialData?.parking || "");
  const [facing, setFacing] = useState(initialData?.facing || "");
  const [furnishing, setFurnishing] = useState(initialData?.furnishing || "");
  const [possession, setPossession] = useState(initialData?.possession || "");
  const [floors, setFloors] = useState(initialData?.floors || "");
  const [sides, setSides] = useState(initialData?.sides || "");
  const [plotSize, setPlotSize] = useState(initialData?.plotSize || "");
  const [plotSizeUnit, setPlotSizeUnit] = useState(initialData?.plotSizeUnit || "Marla");
  const [roadWidth, setRoadWidth] = useState(initialData?.roadWidth || "");
  const [roadWidthUnit, setRoadWidthUnit] = useState(initialData?.roadWidthUnit || "Feet");
  const [plotWidth, setPlotWidth] = useState(initialData?.plotWidth || "");
  const [plotLength, setPlotLength] = useState(initialData?.plotLength || "");
  const [facilities, setFacilities] = useState(initialData?.facilities || []);
  const [errors, setErrors] = useState({});

  // Load initial data when component mounts
  useEffect(() => {
    if (initialData) {
      setAge(initialData.age || "");
      setBedrooms(initialData.bedrooms || "");
      setWashrooms(initialData.washrooms || "");
      setBalconies(initialData.balconies || "");
      setParking(initialData.parking || "");
      setFacing(initialData.facing || "");
      setFurnishing(initialData.furnishing || "");
      setPossession(initialData.possession || "");
      setFloors(initialData.floors || "");
      setSides(initialData.sides || "");
      setPlotSize(initialData.plotSize || "");
      setPlotSizeUnit(initialData.plotSizeUnit || "Marla");
      setRoadWidth(initialData.roadWidth || "");
      setRoadWidthUnit(initialData.roadWidthUnit || "Feet");
      setPlotWidth(initialData.plotWidth || "");
      setPlotLength(initialData.plotLength || "");
      setFacilities(initialData.facilities || []);
    }
  }, [initialData]);

  const handleMultiSelect = (arr, setArr, val) => {
    if (arr.includes(val)) {
      setArr(arr.filter((v) => v !== val));
    } else {
      setArr([...arr, val]);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate Area Plot Size
    if (!plotSize || plotSize.trim() === "") {
      newErrors.plotSize = "Area Plot Size is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlotSizeChange = (e) => {
    setPlotSize(e.target.value);
    // Clear error when user starts typing
    if (errors.plotSize) {
      setErrors(prev => ({ ...prev, plotSize: "" }));
    }
  };

  const handleSaveAndNext = async () => {
    if (!validateForm()) {
      return;
    }

    const formData = {
      age,
      bedrooms,
      washrooms,
      balconies,
      parking,
      facing,
      furnishing,
      possession,
      floors,
      sides,
      plotSize,
      plotSizeUnit,
      roadWidth,
      roadWidthUnit,
      plotWidth,
      plotLength,
      facilities,
      areaSize: plotSize,
      areaUnit: plotSizeUnit
    };

    await onSubmit(3, formData);
  };

  return (
    <div className="step1-form">
      <div className="step1-scrollable">
        <div className="container">
          <div className="col-md-12">
            <div className="step-info">
              <strong>Why provide property details?</strong><br/>
              Detailed property information (like rooms, area, facing, etc.) helps buyers and renters understand what makes your property unique. The more details you provide, the more attractive and trustworthy your listing will be.
            </div>
          </div>
          <div className="row">

          <div className="col-md-12 padding-bottom">
              <div className="step1-label">Plot & Road Details</div>
              <div className="row">
                <div className="col-md-4 remove-padding-right-with-dropdown">
                  <input
                    className={`step-input ${errors.plotSize ? 'error-input' : ''}`}
                    placeholder="Area Plot Size *"
                    value={plotSize}
                    onChange={handlePlotSizeChange}
                    required
                  />
                  {errors.plotSize && (
                    <div className="error-message">{errors.plotSize}</div>
                  )}
                </div>
                <div className="col-md-2 remove-padding-left-with-dropdown ">
                  <select
                    className="step-select cursor-pointer"
                    value={plotSizeUnit}
                    onChange={(e) => setPlotSizeUnit(e.target.value)}
                  >
                    <option>Marla</option>
                    <option>Sq. Yards</option>
                    <option>Sq. Meters</option>
                    <option>Sq. Feet</option>
                  </select>
                </div>
                <div className="col-md-4 remove-padding-right-with-dropdown">
                  <input
                    className="step-input"
                    placeholder="Facing road Width"
                    value={roadWidth}
                    onChange={(e) => setRoadWidth(e.target.value)}
                  />
                </div>
                <div className="col-md-2 remove-padding-left-with-dropdown ">
                  <select
                    className="step-select cursor-pointer"
                    value={roadWidthUnit}
                    onChange={(e) => setRoadWidthUnit(e.target.value)}
                  >
                    <option>Feet</option>
                    <option>Meters</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <input
                    className="step-input"
                    placeholder="Plot Width (in Feet)"
                    value={plotWidth}
                    onChange={(e) => setPlotWidth(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <input
                    className="step-input"
                    placeholder="Plot Length (in Feet)"
                    value={plotLength}
                    onChange={(e) => setPlotLength(e.target.value)}
                  />
                </div>
              </div>
            </div>


{propertyType !== "Land" &&

<>
            <div className="col-md-12">
              <div className="step1-label">Age of Property (in year)</div>
              <div className="step1-pill-group">
                {propertyAge.map((item) => (
                  <button
                    key={item.value}
                    className={`step1-pill${age === item.value ? " selected" : ""}`}
                    onClick={() => setAge(item.value)}
                    type="button"
                  >
                    {item.value}
                  </button>
                ))}
              </div>
            </div>
            <div className="col-md-6 padding-bottom">
              <div className="step1-label">Number of Bedrooms</div>
              <div className="step1-pill-group">
                {propertyBedrooms.map((item) => (
                  <button
                    key={item.value}
                    className={`step1-pill${bedrooms === item.value ? " selected" : ""}`}
                    onClick={() => setBedrooms(item.value)}
                    type="button"
                  >
                    {item.value}
                  </button>
                ))}
              </div>
            </div>
            <div className="col-md-6 padding-bottom">
              <div className="step1-label">Number of Washrooms</div>
              <div className="step1-pill-group">
                {propertyWashrooms.map((item) => (
                  <button
                    key={item.value}
                    className={`step1-pill${washrooms === item.value ? " selected" : ""}`}
                    onClick={() => setWashrooms(item.value)}
                    type="button"
                  >
                    {item.value}
                  </button>
                ))}
              </div>
            </div>
            <div className="col-md-6 padding-bottom">
              <div className="step1-label">Number of Balconies</div>
              <div className="step1-pill-group">
                {propertyBalconies.map((item) => (
                  <button
                    key={item.value}
                    className={`step1-pill${balconies === item.value ? " selected" : ""}`}
                    onClick={() => setBalconies(item.value)}
                    type="button"
                  >
                    {item.value}
                  </button>
                ))}
              </div>
            </div>
            <div className="col-md-6 padding-bottom">
              <div className="step1-label">Car Parking</div>
              <div className="step1-pill-group">
                {propertyParking.map((item) => (
                  <button
                    key={item.value}
                    className={`step1-pill${parking === item.value ? " selected" : ""}`}
                    onClick={() => setParking(item.value)}
                    type="button"
                  >
                    {item.value}
                  </button>
                ))}
              </div>
            </div>
            </>
}
            <div className="col-md-12 padding-bottom">
              <div className="step1-label">Property Facing</div>
              <div className="step1-pill-group">
                {propertyFacing.map((item) => (
                  <button
                    key={item.value}
                    className={`step1-pill${facing === item.value ? " selected" : ""}`}
                    onClick={() => setFacing(item.value)}
                    type="button"
                  >
                    {item.value}
                  </button>
                ))}
              </div>
            </div>
            {propertyType !== "Land" &&
            <div className="col-md-12 padding-bottom">
              <div className="step1-label">Furnishing</div>
              <div className="step1-pill-group">
                {propertyFurnishing.map((item) => (
                  <button
                    key={item.value}
                    className={`step1-pill${furnishing === item.value ? " selected" : ""}`}
                    onClick={() => setFurnishing(item.value)}
                    type="button"
                  >
                    {item.value}
                  </button>
                ))}
              </div>
            </div>
}
            <div className="col-md-12 padding-bottom">
              <div className="step1-label">Possession Available</div>
              <div className="step1-pill-group">
                {propertyPossession.map((item) => (
                  <button
                    key={item.value}
                    className={`step1-pill${possession === item.value ? " selected" : ""}`}
                    onClick={() => setPossession(item.value)}
                    type="button"
                  >
                    {item.value}
                  </button>
                ))}
              </div>
            </div>
            {propertyType !== "Land" &&
            <div className="col-md-6 padding-bottom">
              <div className="step1-label">Number of Floors</div>
              <div className="step1-pill-group">
                {propertyFloors.map((item) => (
                  <button
                    key={item.value}
                    className={`step1-pill${floors === item.value ? " selected" : ""}`}
                    onClick={() => setFloors(item.value)}
                    type="button"
                  >
                    {item.value}
                  </button>
                ))}
              </div>
            </div>
}
            <div className="col-md-6 padding-bottom">
              <div className="step1-label">Number of Open Sides</div>
              <div className="step1-pill-group">
                {propertySides.map((item) => (
                  <button
                    key={item.value}
                    className={`step1-pill${sides === item.value ? " selected" : ""}`}
                    onClick={() => setSides(item.value)}
                    type="button"
                  >
                    {item.value}
                  </button>
                ))}
              </div>
            </div>

            {/* Near By Facilities */}
            <div className="col-md-12 padding-bottom">
              <div className="step1-label">Near By Facilities</div>
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
            </div>
           
          </div>
        </div>
      </div>
      <div className="step1-footer d-flex justify-content-between">
        <div>
          <button className="step1-back-btn" onClick={() => handleStepChange(2)}>Back</button>
        </div>
        <div>
          {/* <button className="step1-skip-btn" onClick={() => handleStepChange(4)}>Skip</button> */}
          <button 
            className="step1-next-btn" 
            onClick={handleSaveAndNext}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save & Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
