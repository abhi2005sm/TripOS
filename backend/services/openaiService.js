import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export const generateItinerary = async ({
    destination,
    days,
    budget,
    travelStyle = 'moderate',
    currency = 'INR',
}) => {
    const prompt = `You are a professional travel planner. Create a detailed day-by-day itinerary for a trip.

Destination: ${destination}
Number of days: ${days}
Budget: ${budget} ${currency}
Travel style: ${travelStyle}

Respond with a valid JSON array of days. Each day object should have:
- dayNumber: number
- date: null (client will set)
- activities: array of objects with: title, startTime, endTime, description, type (sightseeing/dining/transport/leisure/hotel), order, location (object with name, address)
- notes: optional string

Example structure:
[{"dayNumber":1,"date":null,"activities":[{"title":"Arrival","startTime":"09:00","endTime":"12:00","description":"Check-in and explore","type":"hotel","order":0,"location":{"name":"Hotel"}}],"notes":"Relax after travel"}]

Return ONLY the JSON array, no markdown or extra text.`;

    const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
        throw new Error('No response from AI');
    }

    const cleaned = content.replace(/```json\n?|\n?```/g, '').trim();
    return JSON.parse(cleaned);
};
