"use client";
import React, { useState } from "react";
import Step1 from "@/components/addProperty/step1";
import Step2 from "@/components/addProperty/step2";

// import "bootstrap/dist/css/bootstrap.min.css";
import "@/components/addProperty/step-form.css";
import Step3 from "@/components/addProperty/step3";
import Step4 from "@/components/addProperty/step4";
import Step5 from "@/components/addProperty/step5";
import { LoadScript } from "@react-google-maps/api";

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
  // Simulate current step (0-based)
  //const step = 1;
  const [step, setStep] = useState(1);

  const handleStepChange = (idx) => {
    setStep(idx);
  };

  return (
    <div style={{ minHeight: "100vh", background: BG_GRADIENT, padding: 0 }}>
      <div className="container h-100">
        <div className="row h-100">
            <div className="col-md-4 h-100">
        <div className="stepper-card p-4" >
          {/* Top Icon */}
          <div className="top-icon">
            {/* Placeholder for app icon */}
            <svg width="28" height="28" fill="#fff" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="4"/></svg>
          </div>
          {/* Stepper */}
          <ul className="custom-stepper">
            {STEPS.map((s, idx) => (
              <li key={s.label} className="stepper-list-item">
                <div className="stepper-icon-wrap">
                  {idx < step ? (
                    <span className="stepper-icon stepper-completed">
                      <svg width="18" height="18" fill="none" viewBox="0 0 20 20"><circle cx="10" cy="10" r="10" fill={GREEN}/><path d="M6 10.5l2.5 2.5L14 7.5" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                  ) : idx === step ? (
                    <span className="stepper-icon stepper-current">
                      <svg width="18" height="18" fill="#fff" viewBox="0 0 20 20"><rect x="3" y="3" width="14" height="14" rx="4"/></svg>
                    </span>
                  ) : (
                    <span className="stepper-icon stepper-upcoming">
                      {idx === 3 ? 'S' : idx + 1}
                    </span>
                  )}
                  {idx < STEPS.length - 1 && (
                    <span className="stepper-line" data-status={idx < step ? 'completed' : idx === step ? 'current' : 'upcoming'}></span>
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
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#eaf1fa"/><text x="12" y="17" textAnchor="middle" fontSize="16" fill={BLUE} fontWeight="bold">?</text></svg>
            </span>
            <span className="stepper-footer-text">Having troubles?</span>
            <a href="#" className="stepper-footer-link">Contact us</a>
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
                  {step === 1 && <Step1 handleStepChange={handleStepChange} />}
                  <LoadScript
                   googleMapsApiKey="AIzaSyDLzo_eOh509ONfCjn1XQp0ZM2pacPdnWc"
                   libraries={libraries}
               >
                  {step === 2 &&  
                 
                  <Step2 handleStepChange={handleStepChange} />
                  
                  }</LoadScript>
                  {step === 3 && <Step3 handleStepChange={handleStepChange} />}
                  {step === 4 && <Step4 handleStepChange={handleStepChange} />}
                  {step === 5 && <Step5 handleStepChange={handleStepChange} />}
                    {/* <Step1 />
                    <Step2 />
                    <Step3 />
                    <Step4 />
                    <Step5 /> */}
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
        .stepper-list-item:nth-child(-n+${step+1}) .stepper-step {
          color: #1dbf73;
        }
        .stepper-list-item:nth-child(${step+1}) .stepper-step {
          color: #ec161e;
        }
        .stepper-list-item:nth-child(-n+${step+1}) .stepper-title {
          color: #222;
        }
        .stepper-list-item:nth-child(${step+1}) .stepper-title {
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
  );
}
  