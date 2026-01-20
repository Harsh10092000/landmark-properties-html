'use client';
import React, { useState } from 'react';
import { IconCopy, IconCheck } from '@tabler/icons-react';

export default function FeedbackList({ reviews }) {
    const [copiedId, setCopiedId] = useState(null);

    const handleCopy = async (review) => {
        try {
            await navigator.clipboard.writeText(review.review_text);
            setCopiedId(review.id);

            // Open Google Reviews immediately to avoid popup blockers
            window.open("https://www.google.com/search?q=Landmark+Properties+-+Real+Estate+Broker+%26+Builders+Reviews&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOeYvDubAqwXKwXZrOwuYzyuk73q3OWZq5V5gp3uIzl5-MjCycsMtPpGtjn1VuVvdj4txgVO-qfCAGMl4FoDm1LBj2lAJZI3OGdZegucHajhm9yUvWpp-9AaS7O7djWo0Ol6xlORBgrnUxC6KyM3LvAXCJpVt&sa=X&ved=2ahUKEwj1ocnsrZmSAxVvWnADHTa-Ei8Q0bkNegQIHxAH#lrd=0x390e470336eef35d:0xd98da635dd8ae2b4,3,,,,", "_blank");

            // Reset the button state after 3 seconds so it doesn't stay "Copied" forever
            setTimeout(() => {
                setCopiedId(null);
            }, 3000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    return (
        <div className="row g-4">
            {reviews.map((review) => (
                <div key={review.id} className="col-md-6 col-lg-4">
                    <div className="feedback-card h-100 d-flex flex-column justify-content-between p-4">
                        <div className="mb-4">
                            <p className="review-text">
                                "{review.review_text}"
                            </p>
                        </div>

                        <button
                            onClick={() => handleCopy(review)}
                            className={`btn w-100 d-flex align-items-center justify-content-center gap-2 copy-btn ${copiedId === review.id ? 'copy-btn-success' : 'copy-btn-primary'}`}
                            disabled={copiedId === review.id}
                        >
                            {copiedId === review.id ? (
                                <>
                                    <IconCheck size={20} /> Copied & Redirecting...
                                </>
                            ) : (
                                <>
                                    <IconCopy size={20} /> Copy Review
                                </>
                            )}
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
