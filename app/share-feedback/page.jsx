export const dynamic = 'force-dynamic';
import React from 'react';
import pool from '@/app/libs/mysql';
import FeedbackList from './FeedbackList';
import { generateAIReviews } from '@/app/libs/aiReviews';

export const metadata = {
    title: 'Share Your Feedback - Landmark Properties',
    description: 'Help us improve by sharing your experience using one of our pre-written reviews.',
};

async function getFallbackReviews() {
    try {
        const db = await pool;
        const [rows] = await db.query('SELECT * FROM feedback_reviews ORDER BY RAND() LIMIT 9');
        return JSON.parse(JSON.stringify(rows));
    } catch (error) {
        console.error('Error fetching fallback reviews:', error);
        return [];
    }
}

export default async function ShareFeedbackPage() {
    // Attempt AI Generation first
    let reviews = await generateAIReviews();
    let isAI = true;

    // Fallback if AI fails
    if (!reviews || reviews.length === 0) {
        reviews = await getFallbackReviews();
        isAI = false;
    }

    return (
        <div className="feedback-page">
            <div className="container">
                <div className="text-center mb-5" data-aos="fade-up" style={{ "padding-bottom": "30px" }}>
                    <div className="mb-4">
                        <span className="d-inline-block py-2 px-4 rounded-pill bg-white text-success fw-bold shadow-sm feedback-badge">
                            ✅ QR SCANNED SUCCESSFULLY
                        </span>
                    </div>

                    <h2 className="section__heading--title mb-3 feedback-header-title">
                        We Value Your Feedback
                    </h2>

                    <p className="section__heading--desc mx-auto feedback-header-desc mb-4">
                        Thank you for scanning! To make it easy, we've generated some reviews for you based on our services.
                        <strong> Select one, click "Copy Review", and paste it on our Google page.</strong>
                    </p>

                    <a
                        href="https://www.google.com/search?q=Landmark+Properties+-+Real+Estate+Broker+%26+Builders+Reviews&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOeYvDubAqwXKwXZrOwuYzyuk73q3OWZq5V5gp3uIzl5-MjCycsMtPpGtjn1VuVvdj4txgVO-qfCAGMl4FoDm1LBj2lAJZI3OGdZegucHajhm9yUvWpp-9AaS7O7djWo0Ol6xlORBgrnUxC6KyM3LvAXCJpVt&sa=X&ved=2ahUKEwj1ocnsrZmSAxVvWnADHTa-Ei8Q0bkNegQIHxAH#lrd=0x390e470336eef35d:0xd98da635dd8ae2b4,3,,,,"
                        target="_blank"
                        className="btn btn-outline-success rounded-pill px-4 fw-bold shadow-sm mb-2"
                        style={{ fontSize: '18px' }}
                    >
                        🌐 Write a Review
                    </a>
                </div>

                {reviews.length > 0 ? (
                    <FeedbackList reviews={reviews} />
                ) : (
                    <div className="text-center py-5">
                        <div className="spinner-border text-success" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="mt-3 text-muted">Loading customized reviews...</p>
                        {/* Fallback if DB is empty or error */}
                    </div>
                )}

                <div className="text-center mt-5 text-muted small">
                    <p>Thank you for choosing Landmark Properties!</p>
                </div>
            </div>
        </div>
    );
}
