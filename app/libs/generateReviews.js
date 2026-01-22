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

    // Define distinct personas and styles per platform
    switch (platform.toLowerCase()) {
        case "instagram":
            platformInstruction = `
            STYLE: "Instagram Comment" style. VERY SHORT (1-2 sentences). 
            TONE: Enthusiastic, visual, trendy.
            FORMAT: purely casual, NO formal greeting.
            MUST USE: Emojis (🔥, 🏠, ❤️, ✨, 🙌), Hashtags (#DreamHome, #Kurukshetra, #LandmarkProperties, #NewBeginnings).
            FOCUS: The "look" of the property, the "vibe", personal excitement.
            Examples: "Obsessed with our new view! 😍 Thanks @Landmark for finding this gem. #HomeSweetHome", "Best decision ever! 🔥"
            `;
            break;

        case "facebook":
            platformInstruction = `
            STYLE: "Community Recommendation" style. Conversational, story-telling.
            TONE: Trustworthy, neighborly, helpful.
            FORMAT: 2-4 sentences. Can use simple emojis (👍, 🏡).
            MUST MENTION: "Friends", "Family", "Recommendation", "Trust".
            FOCUS: The experience, the helpfulness of staff, recommending to others in the social circle.
            Examples: "Start with: 'If anyone is looking for...'", "Highly recommend Landmark for their honest dealing."
            `;
            break;

        case "trustpilot":
            platformInstruction = `
            STYLE: "Verified Customer" style. Professional, objective, detailed.
            TONE: Serious, grateful, transparent.
            FORMAT: 3-5 sentences. NO emojis.
            FOCUS: Process transparency, documentation, legality, specific names of staff, price fairness.
            Examples: "The documentation process was seamless.", "Mr. [Name] guided us well regarding legalities."
            `;
            break;

        case "google":
        default:
            platformInstruction = `
            STYLE: "Standard Local Guide" style. Balanced (Professional yet personal).
            TONE: Informative, direct.
            FORMAT: 3-4 lines. Standard punctuation.
            FOCUS: Location specific (Sector numbers), Price, Time taken, Property specs.
            Examples: "Bought a 250 sq yard plot in Sector 7.", "Good dealing for commercial properties."
            `;
            break;
    }

    return `
    Generate ${reviewCount} COMPLETELY UNIQUE ${platform} reviews for "${businessName}" - a ${businessType} dealer in ${location}.

    STRICT PLATFORM RULES:
    ${platformInstruction}

    GENERAL REQUIREMENTS:
    - VARY the customer persona (Investor, First-time buyer, Shop owner, NRI, Retired couple).
    - VARY the specific location (${areas.join(", ")}) and property type (${propertyTypes.join(", ")}).
    - VARY the tone (some excited, some calm/professional, some grateful).

    LANGUAGE MIX:
    - Mostly English.
    - 2-3 reviews can be "Hinglish" (casual Indian English) using words like "Sahi deal", "Bahut badhiya", "Mast location", "Theek daam".

    ANTIPATTERNS (DO NOT DO THIS):
    - DO NOT start every review with "I recently...".
    - DO NOT use robotic words: "seamless", "exemplary", "top-notch", "impeccable", "beacon".
    - DO NOT repeat the same structure.

    OUTPUT FORMAT:
    Return ONLY a valid JSON array of strings. 
    Example: ["Review text 1", "Review text 2"]
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
