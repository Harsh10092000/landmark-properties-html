import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);

export async function generateAIReviews() {
    try {
        if (!process.env.GOOGLE_GEMINI_API_KEY) {
            console.warn("AI Review Generation: Missing GOOGLE_GEMINI_API_KEY. Using fallback.");
            return null;
        }

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt1 = `
You are a real customer who has used Landmark Properties, a real estate brokerage and builder in Kurukshetra, Haryana.

Write 9 short, natural customer reviews in English based on real buying or renting experiences.

LANGUAGE RULES:
- Use very very simple English
- It must be human written
- Sound like a normal person, not a company
- 1–3 short sentences per review
- Honest, calm, and satisfied tone
- No marketing words, no emojis, no hashtags
- Do not sound promotional

PROPERTY RULES:
- Each review must mention ONLY ONE property type
- Do not repeat the same property type in back-to-back reviews

Property Types (use naturally):
Apartment, Independent House, Builder Floor, Studio Apartment, Farm House,
Residential Land, Commercial Land, Industrial Land, Agricultural Land,
Retail Showroom, Office Space, Warehouse

Buy Type:
Mix Sale and Rent experiences

LOCAL CONTEXT (use naturally, optional per review):
Mention location like a real buyer would, such as:
- Sector 7, Sector 13, Sector 3, Sector 30, Sector 4 , Sector 5, Sector 8, Sector 17, Sector 10
- Pipli Road, New Bus Stand Road
- Thanesar, Urban Estate
- Near Brahma Sarovar, Pipli Chowk
- Kurukshetra University area

LOCATION STYLE EXAMPLES (do NOT copy exactly):
- "in Sector 13"
- "near Pipli Chowk"
- "around the University area"
- "on Pipli Road side"

EXPERIENCE (pick ONE per review):
- Clear and honest dealing
- Verified plot or papers
- Fair price as per circle rate
- Helpful for NRI or outstation buyer
- Smooth paperwork and quick deal
- Proper guidance without pressure

OUTPUT RULES (VERY IMPORTANT):
- Return ONLY valid JSON
- No markdown
- No explanation
- Format exactly like this:

[
  "Review text 1",
  "Review text 2",
  "Review text 3"
]
`;


        const prompt = `
Write 9 authentic customer reviews for Landmark Properties in Kurukshetra. Write like a REAL INDIAN PERSON who actually bought or rented.

AUTHENTIC INDIAN ENGLISH RULES:
- Use very very simple English
- Use words Indians actually say
- Not formal, just normal talking
- Short simple sentences
- Sound like friend telling experience
- All positive reviews (happy customer)

REAL INDIAN ENGLISH EXAMPLES:

NOT THIS (sounds fake):
- "They told me straight, no lies at all"
- "The process was transparent"
- "Highly recommended"

LIKE THIS (real Indian):
- "Bhai log honest the"
- "Jhunjhun nahi tha"
- "Bilkul theek tha"
- "Mast tha"
- "Achha deal tha"
- "Khatam ho gaya"
- "Mil gaya"
- "Achhha tha"
- "Satisfied hoon"
- "Paisa ka value mila"
- "Sab simple tha"

REAL INDIAN ENGLISH REVIEW EXAMPLES (IN ENGLISH):

1. "Got apartment in Sector 7. Was searching for long time. The rate was fair and the broker gave good deal. Very happy now."

2. "Rented studio apartment in Sector 13. First time having own space. Owner was very helpful, rent also affordable. Everything is good."

3. "Found farmhouse on Pipli Road. My mother liked it very much. Honest price, no cheating. It is a nice property."

4. "Builder floor near New Bus Stand Road. Good space and nice rate. Landlord is cooperative. No problems so far."

5. "Bought independent house in Thanesar. Perfect for family. All papers were correct, seller was honest. I am very satisfied."

6. "Rented office space in Sector 30. Very good location, everything is nearby. Business is running well, no issues at all."

7. "Got warehouse in Urban Estate. Needed it for business. Everything got done on time. It was a good investment."

8. "Bought residential land in Sector 5. For investment purpose. The rate was fair, no cheating involved. Money was well spent."

9. "Got showroom in Sector 17. Needed it for my business. Location is very nice, good foot traffic. Very happy with this deal."

10. I had a great experience with Landmark Properties. The team was professional, transparent, and very supportive throughout the entire process. All documentation was handled smoothly. Highly recommended for real estate services in Kurukshetra.”



11. "Excellent service and quick response. Landmark Properties helped me find the right property at a fair price. The staff is knowledgeable and guided me at every step. Very satisfied with their service."



12. "Trustworthy and reliable real estate consultants. They provided clear property details, proper verification, and timely updates. The whole process was smooth and hassle-free."



13. "Professional team with good local market knowledge. From property selection to final paperwork, everything was managed efficiently. I would definitely recommend Landmark Properties."


14. "Great service, honest guidance, and smooth property dealing. Highly recommended."

REAL INDIAN WORDS TO USE:
- Bhai, log, parivar (family)
- Theek, achhha, mast, bohot
- Milgaya, chal raha tha, khatam ho gaya
- Jhunjhun, pressure, tension
- Rate, deal, investment
- Papers, seller, owner
- Satisfied, happy, khush

AVOID (NOT HOW INDIANS TALK):
- excellent, outstanding, exceptional
- transparent, authentic, verified
- seamless, innovative, comprehensive
- highly recommend, exemplary
- opportunity, potential, investment opportunity

PROPERTY TYPES (each one different):
Apartment, Independent House, Builder Floor, Studio Apartment, Farm House, Residential Land, Commercial Land, Industrial Land, Agricultural Land, Retail Showroom, Office Space, Warehouse

LOCATIONS YOU GAVE (use all of them):
Sector 7, Sector 13, Sector 3, Sector 30, Sector 4, Sector 5, Sector 8, Sector 17, Sector 10, Pipli Road, New Bus Stand Road, Thanesar, Urban Estate, Brahma Sarovar, Pipli Chowk, University area

SPREAD LOCATIONS: Use 1-2 locations per review naturally

BUY TYPE: Mix of buying and renting

TONE:
- All positive (customer is happy)
- Like friend talking
- Real Indian English
- Personal touch
- Enthusiastic but natural

LENGTH: 2-3 sentences each, simple

NO NEGATIVES: Only good things mentioned

OUTPUT: ONLY valid JSON:

[
  "Review 1",
  "Review 2",
  "Review 3",
  "Review 4",
  "Review 5",
  "Review 6",
  "Review 7",
  "Review 8",
  "Review 9"
]
`;


        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Extract JSON if AI included markdown backticks
        const jsonMatch = text.match(/\[.*\]/s);
        if (jsonMatch) {
            const reviews = JSON.parse(jsonMatch[0]);
            // Format to match database structure for consistency
            return reviews.map((text, index) => ({
                id: `ai-${index}-${Date.now()}`,
                review_text: text,
                is_ai: true
            }));
        }

        return null;
    } catch (error) {
        console.error("AI Review Generation Error:", error);
        return null;
    }
}
