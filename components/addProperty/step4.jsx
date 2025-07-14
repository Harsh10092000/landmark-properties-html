import React, { useRef, useState, useEffect } from "react";
import "./step-form.css";

const MAX_OTHER_IMAGES = 10;
const MAX_SIZE = 1000000; // 1MB
const MIN_SIZE = 10000;   // 10KB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/jpg", "image/webp"];

const DEFAULT_IMAGE = process.env.NEXT_PUBLIC_DEFAULT_IMAGE || "default.jpg";

// Helper to normalize image object for preview (for both uploaded and selected images)
function normalizeImage(img) {
    if (!img) return null;
    if (typeof img === 'object' && img.file) return img;
    if (typeof img === 'string') {
        return {
            file: { name: img },
            url: `/uploads/${img}`,
            error: '',
            uploadedName: img
        };
    }
    return img;
}

export default function Step4({ handleStepChange, onSubmit, loading, initialData }) {
    // Cover image state
    const [coverImage, setCoverImage] = useState(null);
    const coverInputRef = useRef();
    // Other images state
    const [otherImages, setOtherImages] = useState([]);
    const otherInputRef = useRef();

    // Load initial data when component mounts or initialData changes
    useEffect(() => {
        if (initialData) {
            // For cover image
            if (initialData.coverImage) {
                setCoverImage(normalizeImage(initialData.coverImage));
            } else {
                setCoverImage(null);
            }
            // For other images
            if (Array.isArray(initialData.otherImages)) {
                setOtherImages(initialData.otherImages.map(normalizeImage));
            } else {
                setOtherImages([]);
            }
        }
    }, [initialData]);

    // Handle cover image selection (only preview, no upload)
    const handleCoverFile = (fileList) => {
        const file = fileList[0];
        if (!file) return;
        let error = "";
        if (!ALLOWED_TYPES.includes(file.type)) {
            error = "Invalid format (only JPG, PNG, WEBP)";
        } else if (file.size > MAX_SIZE || file.size < MIN_SIZE) {
            error = "File size must be 10KB - 1MB";
        }
        setCoverImage({ file, url: URL.createObjectURL(file), error });
    };

    // Remove cover image
    const removeCoverImage = () => setCoverImage(null);

    // Handle other images selection (only preview, no upload)
    const handleOtherFiles = (fileList) => {
        let newImages = [...otherImages];
        for (const file of Array.from(fileList)) {
            let error = "";
            if (!ALLOWED_TYPES.includes(file.type)) {
                error = "Invalid format (only JPG, PNG, WEBP)";
            } else if (file.size > MAX_SIZE || file.size < MIN_SIZE) {
                error = "File size must be 10KB - 1MB";
            }
            // Prevent duplicate files by name+size
            if (
                newImages.some(
                    (img) => img.file.name === file.name && img.file.size === file.size
                )
            ) {
                error = "Already selected";
            }
            let imgObj = { file, url: URL.createObjectURL(file), error };
            newImages.push(imgObj);
        }
        // Limit to MAX_OTHER_IMAGES
        if (newImages.length > MAX_OTHER_IMAGES) {
            newImages = newImages.slice(0, MAX_OTHER_IMAGES);
        }
        setOtherImages(newImages);
    };

    // Remove other image by index
    const removeOtherImage = (idx) => {
        const newImages = otherImages.filter((_, i) => i !== idx);
        setOtherImages(newImages);
    };

    // Save and next: upload images, then call onSubmit
    const handleSaveAndNext = async () => {
        let coverImageName = DEFAULT_IMAGE;
        let otherImageNames = [DEFAULT_IMAGE];

        // Prepare unique files array: cover first, then others (excluding cover)
        let filesToUpload = [];
        let coverFile = coverImage && !coverImage.error && coverImage.file && coverImage.file instanceof File ? coverImage.file : null;
        if (coverFile) {
            filesToUpload.push(coverFile);
        }
        // Add other images, excluding any that match cover by name+size
        otherImages.forEach(img => {
            if (img.file && img.file instanceof File) {
                if (!coverFile || !(img.file.name === coverFile.name && img.file.size === coverFile.size)) {
                    filesToUpload.push(img.file);
                }
            }
        });

        // Upload if there are files
        let filenames = [];
        if (filesToUpload.length > 0) {
            const formData = new FormData();
            filesToUpload.forEach((file, idx) => {
                formData.append(`file${idx}`, file);
            });
            const res = await fetch('/api/property/upload-image', {
                method: 'POST',
                body: formData,
            });
            const data = await res.json();
            if (data.success && Array.isArray(data.filenames)) {
                filenames = data.filenames;
            }
        }

        // Assign filenames: first is cover, rest are others
        if (coverFile && filenames.length > 0) {
            coverImageName = filenames[0];
            otherImageNames = filenames.slice(1).length > 0 ? filenames.slice(1) : [DEFAULT_IMAGE];
        } else if (!coverFile && filenames.length > 0) {
            // No cover, all go to other images
            otherImageNames = filenames;
            coverImageName = DEFAULT_IMAGE;
        } else {
            // If no new upload, use already uploaded names if present
            if (coverImage && coverImage.uploadedName) coverImageName = coverImage.uploadedName;
            if (otherImages.map(img => img.uploadedName).filter(Boolean).length > 0) {
                otherImageNames = otherImages.map(img => img.uploadedName).filter(Boolean);
            }
        }

        const submitData = {
            coverImage: coverImageName,
            otherImages: otherImageNames,
        };
        await onSubmit(4, submitData);
    };

    return (
        <div className="step1-form">
            <div className="step1-scrollable">
                <div className="container">
                    <div className="col-md-12">
                        <div className="step-info">
                            <strong>Why upload property images?</strong><br />
                            Listings with high-quality images get much more attention and trust from buyers and renters. Good photos make your property stand out, help people imagine living there, and can lead to faster, better offers. Properties without images are often ignored or get fewer inquiries.
                        </div>
                    </div>

                    {/* Cover Image Uploader */}
                    <div className="step1-label" style={{marginTop: 24}}>Cover Image <span style={{color:'#ec161e'}}>*</span></div>
                    <div className="image-upload-dropzone" style={{marginBottom: 24}} onClick={() => coverInputRef.current.click()}>
                        <input
                            type="file"
                            accept="image/jpeg,image/png,image/webp"
                            ref={coverInputRef}
                            style={{ display: "none" }}
                            onChange={(e) => {
                                handleCoverFile(e.target.files);
                                e.target.value = "";
                            }}
                        />
                        {!coverImage && (
                            <div className="image-upload-content">
                                <strong>Click to upload cover image</strong>
                                <div className="image-upload-note">(JPG, PNG, WEBP, 10KB - 1MB)</div>
                            </div>
                        )}
                        {coverImage && (
                            <div className="image-preview-item" style={{maxWidth: 220}}>
                                <div className="image-preview-thumb">
                                    <img src={coverImage.url} alt="cover-preview" />
                                    <button
                                        type="button"
                                        className="remove-image-btn"
                                        onClick={e => {e.stopPropagation(); removeCoverImage();}}
                                        title="Remove"
                                    >×</button>
                                </div>
                                <div className={coverImage.error ? "image-error-msg" : "image-success-msg"}>
                                    {coverImage.error ? coverImage.error : `${(coverImage.file.size / 1024).toFixed(0)} KB`}
                                </div>
                                <div className="image-filename">{coverImage?.file?.name || coverImage?.uploadedName}</div>
                            </div>
                        )}
                    </div>

                    {/* Other Images Uploader */}
                    <div className="step1-label">Other Images</div>
                    <div className="image-upload-dropzone" onClick={() => otherInputRef.current.click()}>
                        <input
                            type="file"
                            accept="image/jpeg,image/png,image/webp"
                            multiple
                            ref={otherInputRef}
                            style={{ display: "none" }}
                            onChange={(e) => {
                                handleOtherFiles(e.target.files);
                                e.target.value = "";
                            }}
                        />
                        <div className="image-upload-content">
                            <strong>Click to upload other images</strong>
                            <div className="image-upload-note">(JPG, PNG, WEBP, 10KB - 1MB, up to {MAX_OTHER_IMAGES} images)</div>
                        </div>
                    </div>
                    {otherImages.length > 0 && (
                        <div className="image-preview-grid">
                            {otherImages.map((img, idx) => (
                                <div className="image-preview-item" key={idx}>
                                    <div className="image-preview-thumb">
                                        <img src={img.url} alt={`preview-${idx}`} />
                                        <button
                                            type="button"
                                            className="remove-image-btn"
                                            onClick={e => {e.stopPropagation(); removeOtherImage(idx);}}
                                            title="Remove"
                                        >×</button>
                                    </div>
                                    <div className={img.error ? "image-error-msg" : "image-success-msg"}>
                                        {img.error ? img.error : `${(img.file.size / 1024).toFixed(0)} KB`}
                                    </div>
                                    <div className="image-filename">{img?.file?.name || img?.uploadedName}</div>
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
                        disabled={loading || (coverImage && coverImage.error) || otherImages.some(img => img.error)}
                        onClick={handleSaveAndNext}
                    >
                        {loading ? "Saving..." : "Save & Next"}
                    </button>
                </div>
            </div>
        </div>
    );
}
