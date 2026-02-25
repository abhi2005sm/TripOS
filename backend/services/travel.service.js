import Amadeus from 'amadeus';

const amadeus = new Amadeus({
    clientId: process.env.AMADEUS_CLIENT_ID,
    clientSecret: process.env.AMADEUS_CLIENT_SECRET,
});

/**
 * Search for flights
 */
export const searchFlights = async (params) => {
    try {
        const response = await amadeus.shopping.flightOffersSearch.get({
            originLocationCode: params.origin,
            destinationLocationCode: params.destination,
            departureDate: params.departureDate,
            adults: params.adults || 1,
        });
        return response.data;
    } catch (error) {
        console.error('Amadeus Flight Error:', error.response?.data || error.message);
        throw new Error('Failed to search flights');
    }
};

/**
 * Search for hotels in a city
 */
export const searchHotels = async (cityCode) => {
    try {
        const response = await amadeus.referenceData.locations.hotels.byCity.get({
            cityCode: cityCode,
        });
        return response.data;
    } catch (error) {
        console.error('Amadeus Hotel Error:', error.response?.data || error.message);
        throw new Error('Failed to search hotels');
    }
};
