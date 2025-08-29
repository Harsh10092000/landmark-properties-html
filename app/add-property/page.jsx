"use client";
import React, { useState } from "react";
import Step1 from "@/components/addProperty/step1";
import Step2 from "@/components/addProperty/step2";

// import "bootstrap/dist/css/bootstrap.min.css";
import "@/components/addProperty/step-form.css";
import Step3 from "@/components/addProperty/step3";
import Step4 from "@/components/addProperty/step4";
import Step5 from "@/components/addProperty/step5";
import Step6 from "@/components/addProperty/step6";
//import { LoadScript } from "@react-google-maps/api";
import { SessionProvider, useSession } from "next-auth/react";
import { useEffect } from "react";
import Link from "next/link";
import RequiredLogin from "@/components/common/RequiredLogin";
import Loading from "@/components/common/Loading";
import Error from "@/components/common/Error";


const GREEN = "#1dbf73";
const BLUE = "#ec161e";
const GRAY = "#e0e0e0";
const DARK_GRAY = "#b0b0b0";
const BG_GRADIENT = "linear-gradient(135deg, #f7faff 60%, #eaf1fa 100%)";

const STEPS = [
  { label: "Basic Details" },
  { label: "Location Details" },
  { label: "Property Details" },
  { label: "Property Images" },
  { label: "Pricing & Others" },

];
const libraries = ["places"];

export default function StepperCardOnly() {
  return (
    <SessionProvider>
      <StepperCardContent />
    </SessionProvider>
  );
}

function StepperCardContent() {
  // All hooks must be called unconditionally at the top
  let sessionError = null;
  let sessionStatus;
  let sessionData;
  try {
    const { status, data: session } = useSession();
    sessionStatus = status;
    sessionData = session;
  } catch (err) {
    sessionError = err;
  }
  //const [showLoginModal, setShowLoginModal] = useState(false);

  const [step, setStep] = useState(1);
  const [propertyId, setPropertyId] = useState(null);
  const [listingId, setListingId] = useState(null);
  const [proAdType, setProAdType] = useState(null);
  const [proType, setProType] = useState(null);
  const [propertyType, setPropertyType] = useState(null);
  const [proArea, setProArea] = useState(null);
  const [proAreaUnit, setProAreaUnit] = useState(null);
  const [proCity, setProCity] = useState(null);
  const [proSubDistrict, setProSubDistrict] = useState(null);
  const [propertyUrl, setPropertyUrl] = useState(null);
 
  const [formData, setFormData] = useState({
    step1: {},
    step2: {},
    step3: {},
    step4: {},
    step5: {}
  });
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   if (sessionStatus === "unauthenticated") {
  //     setShowLoginModal(true);
  //   } else {
  //     setShowLoginModal(false);
  //   }
  // }, [sessionStatus]);

  if (sessionError) {
    return <Error message={sessionError.message || "Session error. Please try again."} />;
  }
  console.log("sessionStatus : ", sessionStatus);
  // if (sessionStatus === "loading" || !sessionStatus) {
  if (sessionStatus === "loading") {
    return <Loading />;
  }
  if (sessionStatus === "error") {
    return <Error message="Authentication error. Please try again." />;
  }

  // Show login modal if not authenticated
 

  const handleStepChange = (idx) => {
    setStep(idx);
  };

  const saveStepData = async (stepNumber, data) => {
    setLoading(true);
    try {
      const response = await fetch('/api/property/save-step', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          step: stepNumber,
          data: data,
          propertyId: propertyId
        }),
      });

      const result = await response.json();

      if (result.success) {
        setFormData(prev => ({
          ...prev,
          [`step${stepNumber}`]: data
        }));
        if (stepNumber === 1 && result.propertyId) {
          setPropertyId(result.propertyId);
        }
        if (stepNumber === 1 && result.listingId) {
          setListingId(result.listingId);
        }

        return { success: true, propertyId: result.propertyId, listingId: result.listingId };
      } else {
        throw new Error(result.error || 'Failed to save data');
      }
    } catch (error) {
      console.error('Error saving step data:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const handleStepSubmit = async (stepNumber, data) => {
    console.log("stepNumber : ", stepNumber);
    if (stepNumber == 1) {
      setListingId(data.listingId);
      setProAdType(data.adType);
      setProType(data.propertySubType.split(",")[0]);
      setPropertyType(data.propertySubType.split(",")[1]);
      console.log("proType : ", proType, listingId, proAdType, data.adType);
    }

    if (stepNumber == 2) {
      setProCity(data.city);
      setProSubDistrict(data.subDistrict);
    }
    console.log("stepNumber : ", stepNumber);

    if (stepNumber == 3) {
      setProArea(data.areaSize);
      setProAreaUnit(data.areaUnit);
    }
    const result = await saveStepData(stepNumber, data);
    if (result.success) {
      if (stepNumber === 1 && result.listingId) {
        setListingId(result.listingId);
      }
      if (stepNumber == 5) {
        const sanitize = (input) => input.toLowerCase().replace(/[\s.,]+/g, "-");
        const url =
        sanitize(proArea) +
          "-" +
          sanitize(proAreaUnit) +
          "-" +
          sanitize(proType) +
          "-for-" +
          sanitize(proAdType) +
          "-in-" +
          sanitize(proCity) +
          "-" +
          listingId;

        // Store the property URL in state
        setPropertyUrl(url);

        // Update the property URL in the database
        console.log("propertyId : ", propertyId);
        console.log("Constructed URL: ", url);
        console.log("Property URL state: ", propertyUrl);
        if (propertyId && url) {

          await fetch('/api/property/update-url', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ propertyId, url })
          });
        }

        // Send notification emails after successful form completion
        if (sessionData?.user) {
          try {
            console.log('Sending notification emails from page...');
            
            // Prepare property data for email
            const propertyData = {
              id: listingId,
              title: `${proType || 'Property'} for ${proAdType || 'Sale'} in ${proCity || 'Haryana'}`,
              slug: listingId,
              price: data.amount,
              area: proArea,
              areaUnit: proAreaUnit,
              city: proCity,
              subDistrict: proSubDistrict,
              propertyType: proType,
              adType: proAdType,
              url: `https://landmarkplots.com/${url}`
            };

            //console.log('Sending email with property data:', propertyData);

            // Send notification emails
            const emailResponse = await fetch('/api/property/send-notification', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                user: sessionData.user,
                property: propertyData
              }),
            });

            if (emailResponse.ok) {
              console.log('Notification emails sent successfully');
            } else {
              console.error('Failed to send notification emails');
            }
          } catch (error) {
            console.error('Failed to send notification emails:', error);
            // Don't block the form submission if email fails
          }
        }
      }



      handleStepChange(stepNumber + 1);
      return result; // Return result for step5 to use
    } else {
      alert(`Error: ${result.error}`);
      return result;
    }
  };

  return (
  <>
  
    <title>Add Property | Landmark Plots</title>
    <meta name="description" content="Add Property | Landmark Plots" />
    <meta name="canonical" content="https://landmarkplots.com/add-property" />
    <meta name="keywords" content="Add Property, Landmark Plots" />
    <meta name="author" content="Landmark Plots" />
    <meta property="og:title" content="Add Property | Landmark Plots" />
    <meta property="og:description" content="Add Property | Landmark Plots" />
    <meta property="og:image" content="https://landmarkplots.com/uploads/default.jpg" />
 
    {sessionStatus === "unauthenticated" && <RequiredLogin />}
    <div style={{ minHeight: "100vh", background: BG_GRADIENT, padding: 0, filter: sessionStatus === "unauthenticated" ? 'blur(2px) grayscale(0.5)' : 'none', pointerEvents: sessionStatus === "unauthenticated" === "unauthenticated" ? 'none' : 'auto', opacity: sessionStatus === "unauthenticated" ? 0.5 : 1, transition: 'filter 0.2s, opacity 0.2s' }}>
      <div className="container h-100">
        <div className="row h-100">
          <div className="col-md-4 h-100">
            <div className="stepper-card p-4" >
              {/* Top Icon */}
              <div className="top-icon">
                {/* Placeholder for app icon */}
                <svg width="28" height="28" fill="#fff" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="4" /></svg>
              </div>
              {/* Stepper */}
              <ul className="custom-stepper">
                {STEPS.map((s, idx) => (
                  <li key={s.label} className="stepper-list-item">
                    <div className="stepper-icon-wrap">
                      {idx < step - 1 ? (
                        <span className="stepper-icon stepper-completed">
                          <svg width="18" height="18" fill="none" viewBox="0 0 20 20"><circle cx="10" cy="10" r="10" fill={GREEN} /><path d="M6 10.5l2.5 2.5L14 7.5" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </span>
                      ) : idx === step - 1 ? (
                        <span className="stepper-icon stepper-current">
                          <svg width="18" height="18" fill="#fff" viewBox="0 0 20 20"><rect x="3" y="3" width="14" height="14" rx="4" /></svg>
                        </span>
                      ) : (
                        <span className="stepper-icon stepper-upcoming">
                          {idx === 3 ? 'S' : idx + 1}
                        </span>
                      )}
                      {idx < STEPS.length - 1 && (
                        <span className="stepper-line" data-status={idx < step - 1 ? 'completed' : idx === step - 1 ? 'current' : 'upcoming'}></span>
                      )}
                    </div>
                    <div className="stepper-label">
                      <div className="stepper-step">STEP {idx + 1}</div>
                      <div className="stepper-title">{s.label}</div>
                    </div>
                  </li>
                ))}
              </ul>
              {/* Bottom Card: Help */}
              <div className="stepper-footer">
                <span className="stepper-footer-icon">
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#eaf1fa" /><text x="12" y="17" textAnchor="middle" fontSize="16" fill={BLUE} fontWeight="bold">?</text></svg>
                </span>
                <span className="stepper-footer-text">Having troubles?</span>
                <a href="/contactus" className="stepper-footer-link">Contact us</a>
              </div>
              {/* Bottom right: geometric/abstract image placeholder */}
              <div style={{ position: 'absolute', right: 0, bottom: 0, width: 90, height: 70, zIndex: 0 }}>
                <svg width="90" height="70" viewBox="0 0 90 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <polygon points="0,70 90,0 90,70" fill="#eaf1fa" />
                  <polygon points="60,70 90,40 90,70" fill="#d0e3fa" />
                </svg>
              </div>
            </div>
          </div>

          <div className="col-md-8">
            <div className="row">
              <div className="col-md-12">
                {step === 1 && (
                  <Step1
                    handleStepChange={handleStepChange}
                    onSubmit={handleStepSubmit}
                    loading={loading}
                    initialData={formData.step1}
                  />
                )}
                {/* <LoadScript
                  googleMapsApiKey="AIzaSyDLzo_eOh509ONfCjn1XQp0ZM2pacPdnWc"
                  libraries={libraries}
                > */}
                  {step === 2 &&
                    <Step2
                      handleStepChange={handleStepChange}
                      onSubmit={handleStepSubmit}
                      loading={loading}
                      initialData={formData.step2}
                    />
                  }
                {/* </LoadScript> */}
                {step === 3 && (
                  <Step3
                    handleStepChange={handleStepChange}
                    onSubmit={handleStepSubmit}
                    loading={loading}
                    initialData={formData.step3}
                    propertyType={propertyType}
                  />
                )}
                {step === 4 && (
                  <Step4
                    handleStepChange={handleStepChange}
                    onSubmit={handleStepSubmit}
                    loading={loading}
                    initialData={formData.step4}
                    
                  />
                )}
                {step === 5 && (
                  <Step5
                    handleStepChange={handleStepChange}
                    onSubmit={handleStepSubmit}
                    loading={loading}
                    initialData={formData.step5}
                    propertyType={propertyType}
                  />
                )}
                {step === 6 && (
                  <Step6 
                    listingId={listingId} 
                    proUrl={`https://landmarkplots.com/${propertyUrl}`}  
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .stepper-card {
          background: ${BG_GRADIENT};
          border-radius: 32px;
          box-shadow: 0 12px 40px 0 rgba(31,38,135,0.13);
          min-width: 370px;
          max-width: 400px;
          width: 100%;
          height: 90vh;
          position: relative;
          overflow: visible;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
          .stepper-card .top-icon {
            width: 54px;
            height: 54px;
            border-radius: 16px;
            background: ${BLUE};
            box-shadow: 0 4px 16px #ec161e40;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 1.5rem;
          }
        .custom-stepper {
          list-style: none;
          margin: 0;
          padding: 0;
          width: 100%;
          position: relative;
          z-index: 2;
        }
        .stepper-list-item {
          display: flex;
          align-items: center;
          min-height: 60px;
          margin-bottom: 1.5rem;
        }
        .stepper-icon-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          min-width: 44px;
          position: relative;
        }
        .stepper-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 0.25rem;
          border-radius: 50%;
          width: 36px;
          height: 36px;
          font-weight: 700;
          font-size: 20px;
        }
        .stepper-completed {
          background: #1dbf73;
          color: #fff;
          box-shadow: 0 2px 8px #1dbf7340;
          border: 2.5px solid #1dbf73;
        }
        .stepper-current {
          background: #ec161e;
          color: #fff;
          box-shadow: 0 2px 8px #ec161e40;
          border: 2.5px solid #ec161e;
          font-weight: 800;
        }
        .stepper-upcoming {
          background: #fff;
          border: 2.5px solid #e0e0e0;
          color: #b0b0b0;
        }
        .stepper-line {
          width: 4px;
          height: 36px;
          border-radius: 2px;
          z-index: 0;
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
        }
        .stepper-line[data-status="completed"] {
          background: #1dbf73;
        }
        .stepper-line[data-status="current"] {
          background: #ec161e;
        }
        .stepper-line[data-status="upcoming"] {
          background: #e0e0e0;
        }
        .stepper-label {
          margin-left: 1.5rem;
          flex: 1;
        }
        .stepper-step {
          font-weight: 600;
          font-size: 14px;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }
        .stepper-title {
          font-weight: 700;
          font-size: 18px;
          margin-bottom: 2px;
        }
        .stepper-list-item .stepper-step {
          color: #b0b0b0;
        }
        .stepper-list-item .stepper-title {
          color:rgb(0, 0, 0);
        }
        .stepper-list-item:nth-child(-n+${step + 1}) .stepper-step {
          color: #1dbf73;
        }
        .stepper-list-item:nth-child(${step + 1}) .stepper-step {
          color: #ec161e;
        }
        .stepper-list-item:nth-child(-n+${step + 1}) .stepper-title {
          color: #222;
        }
        .stepper-list-item:nth-child(${step + 1}) .stepper-title {
          color: #ec161e;
        }
        .stepper-footer {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem;
          margin-top: auto;
          width: 100%;
          background: #fff;
          border-radius: 14px;
          box-shadow: 0 2px 8px #ec161e20;
          font-weight: 600;
          font-size: 15px;
        }
        .stepper-footer-icon {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #f4f7ff;
          color: #ec161e;
          font-weight: 700;
          font-size: 18px;
          margin-right: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .stepper-footer-text {
          color: #888;
          font-weight: 500;
        }
        .stepper-footer-link {
          color: #ec161e;
          font-weight: 700;
          text-decoration: underline;
          margin-left: 4px;
        }
        @media (max-width: 600px) {
          .stepper-card {
            border-radius: 2.5rem !important;
            min-width: 98vw !important;
            max-width: 99vw !important;
            padding: 1.5rem 0.5rem !important;
          }
        }
      `}</style>
    </div>
  </>
  );
}
