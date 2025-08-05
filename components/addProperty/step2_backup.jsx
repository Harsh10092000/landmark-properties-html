import React, { useState, useRef, useEffect } from "react";
import { Autocomplete } from "@react-google-maps/api";

const PINCODE_PATTERN = /^[1-9][0-9]{5}$/;

const Step2 = ({handleStepChange, onSubmit, loading, initialData}) => {
    const [location, setLocation] = useState(initialData.location || "");
    const [showManualFields, setShowManualFields] = useState(false);
    const [plotNumber, setPlotNumber] = useState(initialData.plotNumber || "");
    const [state, setState] = useState(initialData.state || "");
    const [city, setCity] = useState(initialData.city || "");
    const [subDistrict, setSubDistrict] = useState(initialData.subDistrict || "");
    const [locality, setLocality] = useState(initialData.locality || "");
    const [completeAddress, setCompleteAddress] = useState(initialData.completeAddress || "");
    const [pinCode, setPinCode] = useState(initialData.pinCode || "");
    const autocompleteRef = useRef(null);
    const [formSubmit, setFormSubmit] = useState(false);

    // Load initial data when component mounts
    useEffect(() => {
        if (initialData) {
            setLocation(initialData.location || "");
            setPlotNumber(initialData.plotNumber || "");
            setState(initialData.state || "");
            setCity(initialData.city || "");
            setSubDistrict(initialData.subDistrict || "");
            setLocality(initialData.locality || "");
            setCompleteAddress(initialData.completeAddress || "");
            setPinCode(initialData.pinCode || "");
        }
    }, [initialData]);

    const onLoad = (autocomplete) => {
        autocompleteRef.current = autocomplete;
    };

    const onPlaceChanged = () => {
        if (autocompleteRef.current) {
            const place = autocompleteRef.current.getPlace();
            if (place && place.address_components) {
                setShowManualFields(false); // Ensure manual fields are hidden on auto-fill
                setPlotNumber("");
                setState("");
                setCity("");
                setSubDistrict("");
                setLocality("");
                setCompleteAddress("");
                setPinCode("");

                place.address_components.forEach((component) => {
                    const type = component.types[0];
                    console.log(place);
                    switch (type) {
                        case "street_number":
                            setPlotNumber(component.long_name);
                            break;
                        case "administrative_area_level_1":
                            console.log(component.long_name)
                            setState(component.long_name);
                            break;
                        case "administrative_area_level_3":
                            setCity(component.long_name);
                            break;
                        case "locality":
                            setSubDistrict(component.long_name);
                            break;
                        case "sublocality_level_1":
                        case "neighborhood":
                            setLocality(component.long_name);
                            break;
                        case "postal_code":
                            setPinCode(component.long_name);
                            break;
                        default:
                            break;
                    }
                });
                setCompleteAddress(place.formatted_address || "");
            }
        }
    };

    const handleUnableToFind = () => {
        setShowManualFields(true);
        setLocation("");
        setState("");
        setCity("");
        setSubDistrict("");
        setLocality("");
        setCompleteAddress("");
        setPinCode("");
    };

    const handleSaveAndNext = async () => {
        setFormSubmit(true);
        // All fields required
        if (!plotNumber || !state || !city || !subDistrict || !locality || !completeAddress || !pinCode || !PINCODE_PATTERN.test(pinCode)) {
            return;
        }
        const formData = {
            location,
            plotNumber,
            state,
            city,
            subDistrict,
            locality,
            completeAddress,
            pinCode
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
                            <div className="step1-label">�� Location Details <span style={{color:'#ec161e'}}>*</span></div>
                            <div className="location-input-group">
                                <Autocomplete
                                    onLoad={onLoad}
                                    onPlaceChanged={onPlaceChanged}
                                    options={{
                                        types: ["geocode"],
                                        componentRestrictions: { country: "in" },
                                    }}
                                >
                                    <input
                                        id="location-input"
                                        type="text"
                                        className="step-input"
                                        placeholder="Enter location"
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                    />
                                </Autocomplete>
                                <div className="step-or-divider">
                                <span>Or</span>
                            </div>
                            </div>
                            
                        </div>
                        <div className="auto-filled-fields">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-12" style={{padding: "0px"}}>
                                        <input
                                            type="text"
                                            className="step-input"
                                            placeholder="Plot Number"
                                            value={plotNumber}
                                            onChange={(e) => setPlotNumber(e.target.value)}
                                        />
                                        {formSubmit && !plotNumber && <div className="step-error-msg">Plot Number is required</div>}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 remove-padding-left">
                                        <input
                                            type="text"
                                            className="step-input "
                                            placeholder="State"
                                            value={state}
                                            onChange={(e) => setState(e.target.value)}
                                        />
                                        {formSubmit && !state && <div className="step-error-msg">State is required</div>}
                                    </div>
                                    <div className="col-md-6 remove-padding-right">
                                        <input
                                            type="text"
                                            className="step-input"
                                            placeholder="City"
                                            value={city}
                                            onChange={(e) => setCity(e.target.value)}
                                        />
                                        {formSubmit && !city && <div className="step-error-msg">City is required</div>}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 remove-padding-left">
                                        <input
                                            type="text"
                                            className="step-input"
                                            placeholder="Sub District"
                                            value={subDistrict}
                                            onChange={(e) => setSubDistrict(e.target.value)}
                                        />
                                        {formSubmit && !subDistrict && <div className="step-error-msg">Sub District is required</div>}
                                    </div>
                                    <div className="col-md-6 remove-padding-right">
                                        <input
                                            type="text"
                                            className="step-input"
                                            placeholder="Locality"
                                            value={locality}
                                            onChange={(e) => setLocality(e.target.value)}
                                        />
                                        {formSubmit && !locality && <div className="step-error-msg">Locality is required</div>}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12" style={{padding: "0px"}}>
                                        <input
                                            type="text"
                                            className="step-input"
                                            placeholder="Complete Address"
                                            value={completeAddress}
                                            onChange={(e) => setCompleteAddress(e.target.value)}
                                        />
                                        {formSubmit && !completeAddress && <div className="step-error-msg">Complete Address is required</div>}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12" style={{padding: "0px"}}>
                                        <input
                                            type="text"
                                            className="step-input"
                                            placeholder="Pin Code"
                                            value={pinCode}
                                            onChange={(e) => setPinCode(e.target.value)}
                                            maxLength={6}
                                        />
                                        {formSubmit && !pinCode && <div className="step-error-msg">Pin Code is required</div>}
                                        {formSubmit && pinCode && !PINCODE_PATTERN.test(pinCode) && <div className="step-error-msg">Pin Code must be a valid 6-digit number</div>}
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