"use client";

import { useState, useEffect } from "react";
import PlatformCard from "@/components/PlatformCard";
import { siteConfig } from "@/app/data/siteConfig";
import { staticReviewsByPlatform } from "@/app/data/reviewsData";

export default function ReviewGeneratorPage() {
    const initialPlatforms = siteConfig.platforms.map(platform => ({
        ...platform,
        reviews: staticReviewsByPlatform[platform.id] || []
    }));

    const [platforms, setPlatforms] = useState(initialPlatforms);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchAllPlatforms() {
            try {
                const platformPromises = initialPlatforms.map(async (platform) => {
                    try {
                        const response = await fetch(`/api/generate-reviews?platform=${platform.name}`);
                        const data = await response.json();

                        if (data.success && data.reviews?.length > 0) {
                            return {
                                ...platform,
                                reviews: data.reviews,
                            };
                        }
                    } catch (err) {
                        console.warn(`Failed to fetch reviews for ${platform.name}:`, err);
                    }
                    return platform;
                });

                const updatedPlatforms = await Promise.all(platformPromises);
                setPlatforms(updatedPlatforms);
                setLoading(false);

            } catch (error) {
                console.error("Global fetch error:", error);
                setLoading(false);
            }
        }

        fetchAllPlatforms();
    }, []);

    const isSinglePlatform = platforms.length === 1;

    return (
        <div className="review-generator-page">
            {/* Hero Section - Centered like share-feedback */}
            <div className="container">
                <div className="rg-hero-centered" data-aos="fade-up">
                    <div className="rg-badge-wrapper">
                        <span className="rg-success-badge">
                            ✅ QR SCANNED SUCCESSFULLY
                        </span>
                    </div>

                    <h2 className="rg-main-title">
                        We Value Your Feedback
                    </h2>

                    <p className="rg-main-desc">
                        Thank you for scanning! To make it easy, we've generated some reviews for you based on our services.
                        <strong> Select one, click "Copy Review", and paste it on our Google page.</strong>
                    </p>

                    <a
                        href="https://www.google.com/search?q=Landmark+Properties+-+Real+Estate+Broker+%26+Builders+Reviews"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rg-write-review-btn"
                    >
                        🌐 Write a Review
                    </a>
                </div>
            </div>

            {/* Reviews Section */}
            <section className="rg-reviews-section">
                <div className="container">
                    {loading ? (
                        <div className="rg-loading">
                            <div className="rg-spinner"></div>
                            <p className="rg-loading-text">Generating personalized reviews for all platforms...</p>
                            <p className="rg-loading-subtext">Please wait while we generate reviews for you</p>
                        </div>
                    ) : (
                        <div className="rg-platforms-list">
                            {platforms.map((platform) => (
                                <PlatformCard
                                    key={platform.id}
                                    platform={platform}
                                    isSinglePlatform={isSinglePlatform}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
