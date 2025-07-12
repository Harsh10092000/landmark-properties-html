// import React, { useState } from "react";



// export default function Step1() {



//   return (
//     <div className="step1-form">
//       <div className="step1-scrollable">
//         <div className="container">
//           <div className="row">
//             <div className="col-md-12">
//               <div className="step-content">
//                 Ready to get your property noticed? With our Quick Property Listing form, you can easily submit your property details and have it listed in no time! Our streamlined process is designed to get your property on the market quickly, allowing you to reach potential buyers or renters with minimal effort.
//               </div>
//             </div>
//             <div className="col-md-12">
//               <div className="step1-label">📢 Location Details</div>
//                 <div>

//                 </div>
//             </div>

//           </div>
//         </div>
//       </div>
//       <div className="step1-footer">
//         <button className="step1-next-btn">Save & Next</button>
//       </div>

//     </div>
//   );
// }


import React, { useState, useRef } from "react";
import {  Autocomplete } from "@react-google-maps/api";



const Step2 = ({handleStepChange}) => {
    const [location, setLocation] = useState("");
    const [showManualFields, setShowManualFields] = useState(false);
    const [plotNumber, setPlotNumber] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [subDistrict, setSubDistrict] = useState("");
    const [locality, setLocality] = useState("");
    const [completeAddress, setCompleteAddress] = useState("");
    const [pinCode, setPinCode] = useState("");
    const autocompleteRef = useRef(null);

    const libraries = ["places"];

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
                                <div className="step1-label">📢 Location Details</div>
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
                                    {/* <button
                                        className="step1-unable-btn"
                                        onClick={handleUnableToFind}
                                        type="button"
                                    >
                                        Unable to find
                                    </button> */}
                                </div>
                                

                                <div className="step-or-divider">
                                    <span>Or</span>
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
                                            </div>
                                            <div className="col-md-6 remove-padding-right">
                                                <input
                                                    type="text"
                                                    className="step-input"
                                                    placeholder="City"
                                                    value={city}
                                                    onChange={(e) => setCity(e.target.value)}

                                                />
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
                                            </div>
                                            <div className="col-md-6 remove-padding-right">
                                                <input
                                                    type="text"
                                                    className="step-input "
                                                    placeholder="Locality"
                                                    value={locality}
                                                    onChange={(e) => setLocality(e.target.value)}

                                                />
                                            </div>
                                        </div>

                                    </div>

                                    <div className="row">
                                        <div className="col-md-12">

                                            <textarea
                                                className="step-textarea"
                                                placeholder="Complete Address"
                                                value={completeAddress}
                                                onChange={(e) => setCompleteAddress(e.target.value)}


                                                rows={4}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <input
                                                type="text"
                                                className="step-input"
                                                placeholder="Pin Code *"
                                                value={pinCode}
                                                onChange={(e) => setPinCode(e.target.value)}

                                            />
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
                    <button className="step1-skip-btn" onClick={() => handleStepChange(3)}>Skip</button>
                    <button className="step1-next-btn">Save & Next</button>
                    </div>
                    
                </div>
            </div>

        
    );
};

export default Step2;