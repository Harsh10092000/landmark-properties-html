/**
 * AI Review Generator
 * Generates reviews using multiple AI providers with automatic fallback
 * 
 * Provider Order:
 * 1. Gemini (Primary - needs API key)
 * 2. Groq (Fallback 1 - ultra fast, needs API key)
 * 3. OpenRouter (Fallback 2 - FREE models available)
 * 4. Static reviews (Final fallback)
 */

import { generateWithGemini } from "./ai/gemini";
import { generateWithGroq } from "./ai/groq";
import { generateWithOpenRouter } from "./ai/openrouter";

/**
 * Build dynamic prompt based on business configuration
 */
/**
 * Build dynamic prompt based on business configuration and platform
 */
export function buildPrompt(config, platform = "Google") {
    const {
        businessName = "Landmark Properties",
        businessType = "real estate",
        location = "Kurukshetra, Haryana",
        areas = ["Sector 7", "Sector 13", "Sector 3", "Pipli Road", "Thanesar"],
        propertyTypes = ["Plot", "Flat", "House", "Shop", "Office"],
        reviewCount = 9,
    } = config;

    let platformInstruction = "";
    switch (platform.toLowerCase()) {
        case "facebook":
            platformInstruction = `
            STYLE: Casual, friendly, can use emojis (Not too many). 
            Mention "recommend" or "recommendation". 
            Examples: "Highly recommend!", "Great experience 🏠"
            `;
            break;
        case "trustpilot":
            platformInstruction = `
            STYLE: Professional, service-oriented, detailed. 
            Focus on trust, transparency, and process.
            `;
            break;
        case "google":
        default:
            platformInstruction = `
            STYLE: Balanced mix of professional and casual. 
            Standard Google Review format.
            `;
            break;
    }

    return `
Generate ${reviewCount} UNIQUE and DIFFERENT 5-star ${platform} reviews for "${businessName}" - a ${businessType} dealer in ${location}, India.

PLATFORM CONTEXT: ${platform}
${platformInstruction}

IMPORTANT: Each review must be COMPLETELY DIFFERENT from others. Do NOT repeat same phrases or structure.

CUSTOMER TYPES TO MIX:
- First-time home buyer
- Investor
- Business owner
- Family relocating
- NRI
- Young professional
- Retired person

REVIEW ELEMENTS TO VARY:
- Greetings/Situations/Staff names/Time taken/Specific locations

PROPERTY TYPES: ${propertyTypes.join(", ")}
LOCAL AREAS: ${areas.join(", ")}

LANGUAGE:
- 6-7 reviews in simple English
- 2-3 can have Hinglish words (bahut accha, sahi deal, mast)

BANNED WORDS: exceptional, outstanding, seamless, comprehensive, exemplary, transparent dealings.

OUTPUT: Return ONLY a valid JSON array of ${reviewCount} strings.
Example: ["Review 1...", "Review 2..."]
`;
}

/**
 * Parse AI response to extract JSON array
 */
export function parseResponse(responseText) {
    if (!responseText) return null;

    const text = String(responseText).trim();

    // Try direct JSON parse first
    try {
        const parsed = JSON.parse(text);
        if (Array.isArray(parsed)) return parsed;
    } catch (e) {
        // Continue to regex extraction
    }

    // Extract JSON array using regex
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
        try {
            const parsed = JSON.parse(jsonMatch[0]);
            if (Array.isArray(parsed)) return parsed;
        } catch (e) {
            console.error("JSON parse error:", e.message);
        }
    }

    return null;
}

/**
 * Format reviews into standard structure
 */
function formatReviews(reviews, source) {
    return reviews.map((text, index) => ({
        id: `${source}-${index + 1}-${Date.now()}`,
        text: typeof text === "string" ? text : String(text),
        rating: 5,
        isAI: true,
        source: source,
    }));
}

/**
 * Generate reviews using AI providers with automatic fallback
 * 
 * @param {object} config - Business configuration
 * @returns {array|null} - Array of reviews or null if all providers fail
 */
export async function generateAIReviews(config = {}, platform = "Google") {
    const prompt = buildPrompt(config, platform);

    // Provider chain: Gemini → Groq → OpenRouter
    const providers = [
        { name: "gemini", fn: generateWithGemini },
        { name: "groq", fn: generateWithGroq },
        { name: "openrouter", fn: generateWithOpenRouter },
    ];

    for (const provider of providers) {
        try {
            console.log(`\n🤖 Trying ${provider.name}...`);

            const response = await provider.fn(prompt);
            const reviews = parseResponse(response);

            if (reviews && reviews.length > 0) {
                console.log(`✅ ${provider.name}: Generated ${reviews.length} reviews!`);
                return formatReviews(reviews, provider.name);
            }
        } catch (err) {
            console.warn(`❌ ${provider.name}: Failed -`, err.message);
        }
    }

    console.error("❌ All AI providers failed");
    return null;
}
