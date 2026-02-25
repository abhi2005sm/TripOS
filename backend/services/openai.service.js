import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Generate a trip itinerary based on user input
 * @param {Object} details - { destination, days, budget, style }
 * @returns {Promise<Object>} - Parsed JSON itinerary
 */
export const generateItinerary = async ({ destination, days, budget, style }) => {
    const prompt = `
    Generate a detailed travel itinerary for a ${days}-day trip to ${destination}.
    Budget: ${budget}
    Travel Style: ${style}
    
    Return the response ONLY as a JSON object with the following structure:
    {
      "title": "Trip Title",
      "itinerary": [
        {
          "dayNumber": 1,
          "activities": [
            {
              "title": "Activity Name",
              "startTime": "09:00",
              "endTime": "11:00",
              "description": "Short description",
              "location": { "name": "Place Name", "lat": 0, "lng": 0 },
              "type": "sightseeing"
            }
          ]
        }
      ]
    }
  `;

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo-1106',
            messages: [{ role: 'user', content: prompt }],
            response_format: { type: 'json_object' },
        });

        return JSON.parse(response.choices[0].message.content);
    } catch (error) {
        console.error('OpenAI Error:', error);
        throw new Error('Failed to generate itinerary with AI');
    }
};
