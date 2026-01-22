"use client";

import { useState } from "react";
import { siteConfig } from "@/app/data/siteConfig";

export default function ReviewCard({ review, colors, redirectUrl }) {
    const [copied, setCopied] = useState(false);

    // Use platform colors or defaults
    const theme = colors || {
        primary: "#16A34A",
        stars: "#F59E0B"
    };

    const handleCopyAndRedirect = async () => {
        try {
            await navigator.clipboard.writeText(review.text);
            setCopied(true);

            setTimeout(() => {
                setCopied(false);
                // Redirect to specific platform URL if provided, otherwise fallback to Google
                const urlToOpen = redirectUrl || siteConfig.googleReviewUrl;
                if (urlToOpen) {
                    window.open(urlToOpen, "_blank");
                }
            }, 800);
        } catch (err) {
            console.error("Failed to copy text:", err);
        }
    };

    return (
        <div
            className={`review-card ${copied ? 'copied' : ''}`}
            style={{ '--platform-color': theme.primary }}
        >
            {/* Gradient accent - uses platform gradient class or primary color fallback */}
            <div
                className={`review-card-accent bg-gradient-to-r ${theme.gradient || ''}`}
                style={!theme.gradient ? { background: `linear-gradient(to right, ${theme.primary}, ${theme.primary}dd)` } : {}}
            ></div>

            {/* Quote icon - uses platform color */}
            <div
                className="review-quote-icon"
                style={{ backgroundColor: theme.primary }}
            >
                <svg fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
            </div>

            {/* Stars - uses platform star color or golden */}
            <div className="review-stars">
                {Array(5).fill(0).map((_, i) => (
                    <svg
                        key={i}
                        className="review-star"
                        fill={theme.stars || "#F59E0B"}
                        viewBox="0 0 20 20"
                    >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                ))}
            </div>

            {/* Review Text */}
            <p className="review-text-content">
                {review.text}
            </p>

            {/* Copy Button - uses platform color */}
            <button
                onClick={handleCopyAndRedirect}
                disabled={copied}
                className={`review-copy-btn ${copied ? 'copied' : ''}`}
                style={{
                    backgroundColor: copied ? '#10B981' : theme.primary,
                    boxShadow: `0 4px 12px ${theme.primary}40`
                }}
            >
                {copied ? (
                    <>
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Copied! Redirecting...
                    </>
                ) : (
                    <>
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        Copy Review
                    </>
                )}
            </button>
        </div>
    );
}
