import React, { useState, useRef, useEffect } from "react";
import { haryanaCities } from './city.jsx';
import { getSubDistrictsByCity } from './subdistrict.jsx';

const PINCODE_PATTERN = /^[1-9][0-9]{5}$/;

const Step2 = ({handleStepChange, onSubmit, loading, initialData}) => {
    const [plotNumber, setPlotNumber] = useState(initialData.plotNumber || "");
    const [state, setState] = useState(initialData.state || "Haryana");
    const [city, setCity] = useState(initialData.city || "");
    const [subDistrict, setSubDistrict] = useState(initialData.subDistrict || "");
    const [locality, setLocality] = useState(initialData.locality || "");
    const [pinCode, setPinCode] = useState(initialData.pinCode || "");
    const [formSubmit, setFormSubmit] = useState(false);
    const [availableSubDistricts, setAvailableSubDistricts] = useState([]);
    
    // Error states
    const [errors, setErrors] = useState({});
    
    // Autocomplete states
    const [citySearch, setCitySearch] = useState("");
    const [subDistrictSearch, setSubDistrictSearch] = useState("");
    const [showCityDropdown, setShowCityDropdown] = useState(false);
    const [showSubDistrictDropdown, setShowSubDistrictDropdown] = useState(false);
    const [filteredCities, setFilteredCities] = useState([]);
    const [filteredSubDistricts, setFilteredSubDistricts] = useState([]);

    // Load initial data when component mounts
    useEffect(() => {
        if (initialData) {
            setPlotNumber(initialData.plotNumber || "");
            setState(initialData.state || "Haryana");
            setCity(initialData.city || "");
            setSubDistrict(initialData.subDistrict || "");
            setLocality(initialData.locality || "");
            setPinCode(initialData.pinCode || "");
        }
    }, [initialData]);

    // Update sub-districts when city changes
    useEffect(() => {
        if (city) {
            const subDistricts = getSubDistrictsByCity(city);
            setAvailableSubDistricts(subDistricts);
            setFilteredSubDistricts(subDistricts);
            // Reset sub-district if current selection is not available for new city
            if (!subDistricts.includes(subDistrict)) {
                setSubDistrict("");
                setSubDistrictSearch("");
            }
        } else {
            setAvailableSubDistricts([]);
            setFilteredSubDistricts([]);
            setSubDistrict("");
            setSubDistrictSearch("");
        }
    }, [city, subDistrict]);

    // Filter cities based on search
    useEffect(() => {
        if (citySearch.trim() === "") {
            setFilteredCities(haryanaCities);
        } else {
            const filtered = haryanaCities.filter(city => 
                city.name.toLowerCase().includes(citySearch.toLowerCase())
            );
            setFilteredCities(filtered);
        }
    }, [citySearch]);

    // Filter sub-districts based on search
    useEffect(() => {
        if (subDistrictSearch.trim() === "") {
            setFilteredSubDistricts(availableSubDistricts);
        } else {
            const filtered = availableSubDistricts.filter(district => 
                district.toLowerCase().includes(subDistrictSearch.toLowerCase())
            );
            setFilteredSubDistricts(filtered);
        }
    }, [subDistrictSearch, availableSubDistricts]);

    const validateForm = () => {
        const newErrors = {};
        
        if (!locality.trim()) {
            newErrors.locality = "Locality is required";
        }
        
        if (!city.trim()) {
            newErrors.city = "City is required";
        }
        
        if (!subDistrict.trim()) {
            newErrors.subDistrict = "Sub District is required";
        }
        
        if (!pinCode.trim()) {
            newErrors.pinCode = "Pin Code is required";
        } else if (!PINCODE_PATTERN.test(pinCode)) {
            newErrors.pinCode = "Please enter a valid 6-digit pin code";
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleCitySelect = (selectedCity) => {
        setCity(selectedCity);
        setCitySearch(selectedCity);
        setShowCityDropdown(false);
        setSubDistrict("");
        setSubDistrictSearch("");
        // Clear city error when valid city is selected
        if (errors.city) {
            setErrors(prev => ({ ...prev, city: "" }));
        }
    };

    const handleSubDistrictSelect = (selectedDistrict) => {
        setSubDistrict(selectedDistrict);
        setSubDistrictSearch(selectedDistrict);
        setShowSubDistrictDropdown(false);
        // Clear subDistrict error when valid district is selected
        if (errors.subDistrict) {
            setErrors(prev => ({ ...prev, subDistrict: "" }));
        }
    };

    const handleCityInputChange = (e) => {
        const value = e.target.value;
        setCitySearch(value);
        setCity(value);
        setShowCityDropdown(true);
        // Clear city error when user starts typing
        if (errors.city) {
            setErrors(prev => ({ ...prev, city: "" }));
        }
    };

    const handleSubDistrictInputChange = (e) => {
        const value = e.target.value;
        setSubDistrictSearch(value);
        setShowSubDistrictDropdown(true);
        // Clear subDistrict error when user starts typing
        if (errors.subDistrict) {
            setErrors(prev => ({ ...prev, subDistrict: "" }));
        }
    };

    const handleLocalityChange = (e) => {
        setLocality(e.target.value);
        // Clear locality error when user starts typing
        if (errors.locality) {
            setErrors(prev => ({ ...prev, locality: "" }));
        }
    };

    const handlePinCodeChange = (e) => {
        setPinCode(e.target.value);
        // Clear pinCode error when user starts typing
        if (errors.pinCode) {
            setErrors(prev => ({ ...prev, pinCode: "" }));
        }
    };

    const handleSaveAndNext = async () => {
        setFormSubmit(true);
        
        if (!validateForm()) {
            return;
        }
        
        // Combine address fields
        const addressParts = [plotNumber, locality, subDistrict, city, state, pinCode].filter(Boolean);
        const completeAddress = addressParts.join(", ");
        const formData = {
            plotNumber,
            state,
            city,
            subDistrict,
            locality,
            pinCode,
            completeAddress
        };
        await onSubmit(2, formData);
    };

    return (
        <div className="step1-form">
            <div className="step1-scrollable">
                <div className="container">
                    <div className="row">
                        
                        <div className="col-md-12">
                            <div className="step-info">
                                <strong>Why accurate location matters?</strong><br/>
                                Providing the correct address and location details helps buyers and renters find your property easily. Accurate location increases trust and ensures your listing appears in relevant local searches.
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="step1-label">📍 Location Details <span style={{color:'#ec161e'}}>*</span></div>
                        </div>
                        <div className="auto-filled-fields">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-6 remove-padding-left">
                                        <input
                                            type="text"
                                            className="step-input"
                                            placeholder="Plot Number (optional)"
                                            value={plotNumber}
                                            onChange={(e) => setPlotNumber(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-md-6 remove-padding-right">
                                        <input
                                            type="text"
                                            className={`step-input ${formSubmit && errors.locality ? 'error-input' : ''}`}
                                            placeholder="Locality"
                                            value={locality}
                                            onChange={handleLocalityChange}
                                        />
                                        {formSubmit && errors.locality && (
                                            <div className="error-message">{errors.locality}</div>
                                        )}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 remove-padding-left">
                                        <input
                                            type="text"
                                            className="step-input"
                                            placeholder="State"
                                            value={state}
                                            onChange={(e) => setState(e.target.value)}
                                            readOnly
                                        />
                                    </div>
                                    <div className="col-md-6 remove-padding-right" style={{position: "relative"}}>
                                        <input
                                            type="text"
                                            className={`step-input ${formSubmit && errors.city ? 'error-input' : ''}`}
                                            placeholder="Search City"
                                            value={citySearch}
                                            onChange={handleCityInputChange}
                                            onFocus={() => setShowCityDropdown(true)}
                                            onBlur={() => {
                                                setTimeout(() => {
                                                    setShowCityDropdown(false);
                                                    if (!haryanaCities.some(c => c.name === citySearch)) {
                                                        setCity("");
                                                        setCitySearch("");
                                                    }
                                                }, 200);
                                            }}
                                        />
                                        {formSubmit && errors.city && (
                                            <div className="error-message">{errors.city}</div>
                                        )}
                                        {showCityDropdown && (
                                            <div className="autocomplete-dropdown">
                                                {filteredCities.length === 0 ? (
                                                    <div className="dropdown-item no-result">No results found</div>
                                                ) : (
                                                    filteredCities.map((cityItem) => (
                                                        <div
                                                            key={cityItem.id}
                                                            className="dropdown-item"
                                                            onMouseDown={() => handleCitySelect(cityItem.name)}
                                                        >
                                                            {cityItem.name}
                                                        </div>
                                                    ))
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 remove-padding-left" style={{position: "relative"}}>
                                        <input
                                            type="text"
                                            className={`step-input ${formSubmit && errors.subDistrict ? 'error-input' : ''}`}
                                            placeholder="Search Sub District"
                                            value={subDistrictSearch}
                                            onChange={handleSubDistrictInputChange}
                                            onFocus={() => city && setShowSubDistrictDropdown(true)}
                                            onBlur={() => {
                                                setTimeout(() => {
                                                    setShowSubDistrictDropdown(false);
                                                    if (!availableSubDistricts.includes(subDistrictSearch)) {
                                                        setSubDistrict("");
                                                        setSubDistrictSearch("");
                                                    }
                                                }, 200);
                                            }}
                                            disabled={!city}
                                        />
                                        {formSubmit && errors.subDistrict && (
                                            <div className="error-message">{errors.subDistrict}</div>
                                        )}
                                        {showSubDistrictDropdown && city && (
                                            <div className="autocomplete-dropdown">
                                                {filteredSubDistricts.length === 0 ? (
                                                    <div className="dropdown-item no-result">No results found</div>
                                                ) : (
                                                    filteredSubDistricts.map((district, index) => (
                                                        <div
                                                            key={index}
                                                            className="dropdown-item"
                                                            onMouseDown={() => handleSubDistrictSelect(district)}
                                                        >
                                                            {district}
                                                        </div>
                                                    ))
                                                )}
                                            </div>
                                        )}
                                    </div>
                                    <div className="col-md-6 remove-padding-right">
                                        <input
                                            type="text"
                                            className={`step-input ${formSubmit && errors.pinCode ? 'error-input' : ''}`}
                                            placeholder="Pin Code"
                                            value={pinCode}
                                            onChange={handlePinCodeChange}
                                            maxLength={6}
                                        />
                                        {formSubmit && errors.pinCode && (
                                            <div className="error-message">{errors.pinCode}</div>
                                        )}
                                    </div>
                                </div>
                              
                            </div>
                        </div>
                    </div>
                </div>
            </div>
           

            <div className="step1-footer d-flex justify-content-between">
        <div>
          <button className="step1-back-btn" onClick={() => handleStepChange(1)}>Back</button>
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
};

export default Step2;