import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);

export async function generateAIReviews() {
    try {
        const prompt = `
Generate 9 UNIQUE and DIFFERENT 5-star Google reviews for "Landmark Properties" - a real estate dealer in Kurukshetra, Haryana, India.

IMPORTANT: Each review must be COMPLETELY DIFFERENT from others. Do NOT repeat same phrases or structure.

CUSTOMER TYPES TO MIX (use different ones for each review):
- First-time home buyer (nervous, asking many questions)
- Investor looking for land/plot
- Business owner needing commercial space
- Family relocating to Kurukshetra
- NRI investing from abroad
- Young professional renting apartment
- Retired person buying peaceful home
- Shop owner looking for showroom
- Someone who bought through friend's reference

REVIEW ELEMENTS TO VARY:
- Some start with greeting ("Great service!")
- Some start with their situation ("Was looking for...")
- Some mention staff by name or title ("The owner himself...")
- Some mention time taken ("Got deal done in 2 weeks")
- Some mention comparison ("Tried other dealers but...")
- Some are short and direct (3 lines)
- Some are detailed (5 lines)

PROPERTY TYPES: Plot, Flat, Apartment, House, Builder Floor, Shop, Office, Warehouse, Land, Commercial Space

KURUKSHETRA AREAS: Sector 7, Sector 13, Sector 3, Sector 30, Sector 4, Sector 5, Pipli Road, Thanesar, Urban Estate, Near University

LANGUAGE:
- 6-7 reviews in simple English
- 2-3 can have Hindi words like "bahut accha", "sahi deal", "mast", "theek hai"
- Keep it casual, not formal corporate language

WHAT TO MENTION:
- Specific location where they bought/rented
- What property type
- What staff did (showed options, helped with loan, paperwork)
- Their satisfaction

BANNED WORDS (sound fake):
- exceptional, outstanding, seamless, comprehensive, exemplary
- transparent dealings, professional approach
- papa/mummy/wife ke liye
- highly recommended (at end of every review)

CRITICAL: Generate FRESH content. Do NOT reuse any phrases. Each review should feel like a different person wrote it on a different day.

OUTPUT: Valid JSON array of 9 unique strings only. No markdown, no explanation.
`;

        // --- TRY GEMINI MODELS IN ORDER ---
        if (process.env.GOOGLE_GEMINI_API_KEY) {
            const modelsToTry = [
                "gemini-2.5-flash-lite-preview-09-2025",
                "gemini-3-flash-preview",
                "gemini-1.5-flash",
                "gemini-1.5-flash-latest",
                "gemini-2.0-flash-exp",
                "gemini-1.5-pro",
                "gemini-1.5-pro-latest",
                "gemini-pro",
                "gemini-1.0-pro",
                "gemini-3-flash-preview",
                "gemini-3-pro-preview"
            ];

            for (const modelName of modelsToTry) {
                try {
                    console.log(`AI Review Generation: Trying Gemini (${modelName})...`);
                    const model = genAI.getGenerativeModel({ model: modelName });
                    const result = await model.generateContent(prompt);
                    const response = await result.response;
                    const responseText = response.text();

                    if (responseText) {
                        const strResponse = String(responseText);
                        const jsonMatch = strResponse.match(/\[.*\]/s);
                        if (jsonMatch) {
                            console.log(`AI Review Generation: Success with ${modelName} (JSON Found)!`);
                            const reviews = JSON.parse(jsonMatch[0]);
                            return reviews.map((text, index) => ({
                                id: `ai-${index}-${Date.now()}`,
                                review_text: text,
                                is_ai: true
                            }));
                        }
                    }
                } catch (err) {
                    console.warn(`AI Review Generation: ${modelName} failed.`, err.message);
                }
            }
        }

        // --- TRY PUTER.JS IF GEMINI FAILS ---
        try {
            console.log("AI Review Generation: Trying Puter.js...");

            const puter = await import('@heyputer/puter.js').then(m => m.default).catch(() => null);

            if (puter && puter.ai && typeof puter.ai.chat === 'function') {
                const puterResponse = await puter.ai.chat(prompt);

                let responseText;
                if (typeof puterResponse === 'string') {
                    responseText = puterResponse;
                } else if (puterResponse?.message?.content) {
                    responseText = puterResponse.message.content;
                } else if (puterResponse?.text) {
                    responseText = puterResponse.text;
                } else if (puterResponse?.content) {
                    responseText = puterResponse.content;
                } else {
                    responseText = JSON.stringify(puterResponse);
                }

                if (responseText) {
                    const strResponse = String(responseText);
                    const jsonMatch = strResponse.match(/\[.*\]/s);
                    if (jsonMatch) {
                        console.log("AI Review Generation: Success with Puter.js (JSON Found)!");
                        const reviews = JSON.parse(jsonMatch[0]);
                        return reviews.map((text, index) => ({
                            id: `ai-${index}-${Date.now()}`,
                            review_text: text,
                            is_ai: true
                        }));
                    }
                }
            } else {
                console.log("AI Review Generation: Puter.js not available in this environment.");
            }
        } catch (err) {
            console.warn("AI Review Generation: Puter.js failed.", err.message);
        }

        console.error("AI Review Generation: All AI options failed. Using database fallback.");
        return null;
    } catch (error) {
        console.error("AI Review Generation Final Error:", error);
        return null;
    }
}
