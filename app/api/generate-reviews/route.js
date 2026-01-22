import { NextResponse } from "next/server";
import { generateAIReviews } from "@/app/libs/generateReviews";
import { siteConfig } from "@/app/data/siteConfig";

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const platform = searchParams.get("platform") || "Google";

        // Build config from siteConfig
        const config = {
            businessName: siteConfig.business.name,
            businessType: siteConfig.business.type === "real_estate" ? "real estate" : siteConfig.business.type,
            location: "Kurukshetra, Haryana",
            areas: siteConfig.business.areas || [
                "Sector 7", "Sector 13", "Sector 3", "Sector 30",
                "Sector 4", "Pipli Road", "Thanesar", "Urban Estate"
            ],
            propertyTypes: siteConfig.business.propertyTypes || [
                "Plot", "Flat", "Apartment", "House", "Builder Floor",
                "Shop", "Office", "Commercial Space"
            ],
            reviewCount: 9,
        };

        // Generate AI reviews
        const reviews = await generateAIReviews(config, platform);

        if (reviews && reviews.length > 0) {
            return NextResponse.json({
                success: true,
                source: "ai",
                reviews,
            });
        }

        // Return empty if AI fails (frontend will use static fallback)
        return NextResponse.json({
            success: false,
            source: "none",
            message: "AI generation failed, use static reviews",
            reviews: [],
        });

    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
