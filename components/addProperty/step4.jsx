import React, { useRef, useState } from "react";
import "./step-form.css";

const MAX_IMAGES = 10;
const MAX_SIZE = 1000000; // 1MB
const MIN_SIZE = 10000;   // 10KB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/jpg", "image/webp"];

export default function Step4({ handleStepChange }) {
    const [images, setImages] = useState([]); // {file, url, error}
    const fileInputRef = useRef();

    // Handle file selection (append, not replace)
    const handleFiles = (fileList) => {
        let newImages = [...images];
        let errorCount = 0;

        Array.from(fileList).forEach((file) => {
            let error = "";
            if (!ALLOWED_TYPES.includes(file.type)) {
                error = "Invalid format (only JPG, PNG, WEBP)";
                errorCount++;
            } else if (file.size > MAX_SIZE || file.size < MIN_SIZE) {
                error = "File size must be 10KB - 1MB";
                errorCount++;
            }
            // Prevent duplicate files by name+size
            if (
                newImages.some(
                    (img) => img.file.name === file.name && img.file.size === file.size
                )
            ) {
                error = "Already selected";
                errorCount++;
            }
            newImages.push({
                file,
                url: URL.createObjectURL(file),
                error,
            });
        });

        // Limit to MAX_IMAGES
        if (newImages.length > MAX_IMAGES) {
            newImages = newImages.slice(0, MAX_IMAGES);
        }
        setImages(newImages);
    };

    // Remove image by index
    const removeImage = (idx) => {
        const newImages = images.filter((_, i) => i !== idx);
        setImages(newImages);
    };

    // Open file dialog
    const openFileDialog = () => {
        if (images.length < MAX_IMAGES) {
            fileInputRef.current.click();
        }
    };

    // Drag & drop handlers
    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };
    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer.files) {
            handleFiles(e.dataTransfer.files);
        }
    };

    return (
        <div className="step1-form">
            <div className="step1-scrollable">
                <div className="container">
                    {/* <div className="col-md-12">
              <div className="step-content">
                Ready to get your property noticed? With our Quick Property Listing form, you can easily submit your property details and have it listed in no time! Our streamlined process is designed to get your property on the market quickly, allowing you to reach potential buyers or renters with minimal effort.
              </div>
            </div> */}
                    <div className="col-md-12">
                        <div className="step-info">
                            <strong>Why upload property images?</strong><br />
                            Listings with high-quality images get much more attention and trust from buyers and renters. Good photos make your property stand out, help people imagine living there, and can lead to faster, better offers. Properties without images are often ignored or get fewer inquiries.
                        </div>
                    </div>
                    <div className="step1-label">Upload Property Images</div>
                    <div
                        className="image-upload-dropzone"
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                        onClick={openFileDialog}
                        style={{
                            cursor: images.length < MAX_IMAGES ? "pointer" : "not-allowed",
                            opacity: images.length < MAX_IMAGES ? 1 : 0.6,
                        }}
                    >
                        <input
                            type="file"
                            accept="image/jpeg,image/png,image/webp"
                            multiple
                            ref={fileInputRef}
                            style={{ display: "none" }}
                            onChange={(e) => {
                                handleFiles(e.target.files);
                                e.target.value = ""; // allow re-selecting same file
                            }}
                            disabled={images.length >= MAX_IMAGES}
                        />
                        <div className="image-upload-content">
                            <div>
                                <strong>Drag & drop images here</strong>
                            </div>
                            <div>or</div>
                            <button
                                type="button"
                                className="step1-pill"
                                style={{ marginTop: 8 }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    openFileDialog();
                                }}
                                disabled={images.length >= MAX_IMAGES}
                            >
                                Add {images.length === 0 ? "Images" : "More Images"}
                            </button>
                            <div className="image-upload-note">
                                (JPG, PNG, WEBP, 10KB - 1MB, up to {MAX_IMAGES} images)
                            </div>
                        </div>
                    </div>

                    {/* Image preview grid */}
                    {images.length > 0 && (
                        <div className="image-preview-grid">
                            {images.map((img, idx) => (
                                <div className="image-preview-item" key={idx}>
                                    <div className="image-preview-thumb">
                                        <img src={img.url} alt={`preview-${idx}`} />
                                        <button
                                            type="button"
                                            className="remove-image-btn"
                                            onClick={() => removeImage(idx)}
                                            title="Remove"
                                        >
                                            ×
                                        </button>
                                    </div>
                                    <div
                                        className={
                                            img.error
                                                ? "image-error-msg"
                                                : "image-success-msg"
                                        }
                                    >
                                        {img.error
                                            ? img.error
                                            : `${(img.file.size / 1024).toFixed(0)} KB`}
                                    </div>
                                    <div className="image-filename">{img.file.name}</div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <div className="step1-footer d-flex justify-content-between">

                <div>
                <button className="step1-back-btn" onClick={() => handleStepChange(3)}>Back</button>
                </div>
                <div>
                <button className="step1-skip-btn" onClick={() => handleStepChange(5)}>Skip</button>
                
                <button
                    className="step1-next-btn"
                    type="button"
                    disabled={
                        images.length === 0 ||
                        images.some((img) => img.error) // block if any error
                    }
                    onClick={() => {
                        // TODO: handle next step or upload
                        alert("Images ready for upload!");
                    }}
                >
                    Save & Next
                </button>
                </div>
            </div>
        </div>
    );
}
