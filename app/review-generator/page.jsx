"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/app/data/siteConfig";
import PlatformCard from "@/components/PlatformCard";
import { staticReviewsByPlatform } from "@/app/data/reviewsData";

export default function ReviewGeneratorPage() {
    const [reviews, setReviews] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                // Initial load with static data
                setReviews(staticReviewsByPlatform);

                // Fetch AI reviews
                const response = await fetch('/api/generate-reviews');
                if (response.ok) {
                    const data = await response.json();
                    setReviews(prev => ({ ...prev, ...data }));
                }
            } catch (error) {
                console.error("Error fetching reviews:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, []);

    return (
        <div className="min-h-screen bg-[#F9FAFB] text-gray-900 font-sans">
            {/* Hero Section */}
            <div className="rg-hero-container px-4 py-8 md:py-16">
                <div className="rg-hero-content text-center max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-8 animate-fade-in-up">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        QR SCANNED SUCCESSFULLY
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight animate-fade-in-up delay-100">
                        We Value Your <span className="text-[#16A34A] relative inline-block">
                            Feedback
                            <svg className="absolute -bottom-2 left-0 w-full h-3 text-green-200 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                            </svg>
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto animate-fade-in-up delay-200">
                        Thank you for visiting Landmark Properties! Choose a platform below to share your experience. We've prepared some reviews to make it easy.
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="rg-reviews-section border-t border-gray-200 bg-white">
                <div className="rg-reviews-container px-4 py-12 md:py-16">
                    {loading ? (
                        <div className="rg-loading">
                            <div className="rg-spinner"></div>
                            <p className="rg-loading-text">Generating personalized reviews...</p>
                            <p className="rg-loading-subtext">Curating the best experience for you</p>
                        </div>
                    ) : (
                        <div className="rg-platforms-list max-w-5xl mx-auto">
                            {siteConfig.platforms.map((platform, index) => (
                                <div key={platform.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 150}ms` }}>
                                    <PlatformCard
                                        platform={platform}
                                        reviews={reviews[platform.id] || []}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
