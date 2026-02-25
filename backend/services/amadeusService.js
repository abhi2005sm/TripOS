import Amadeus from 'amadeus';

const amadeus = new Amadeus({
    clientId: process.env.AMADEUS_CLIENT_ID,
    clientSecret: process.env.AMADEUS_CLIENT_SECRET,
});

export const searchFlights = async ({
    originLocationCode,
    destinationLocationCode,
    departureDate,
    returnDate = null,
    adults = 1,
}) => {
    try {
        const params = {
            originLocationCode,
            destinationLocationCode,
            departureDate,
            adults,
        };

        if (returnDate) {
            params.returnDate = returnDate;
        }

        const { data } = await amadeus.shopping.flightOffersSearch.get(params);
        return data;
    } catch (error) {
        if (error.response) {
            throw new Error(
                error.response.data?.errors?.[0]?.detail || 'Flight search failed'
            );
        }
        throw error;
    }
};

export const searchHotels = async ({
    cityCode,
    checkInDate,
    checkOutDate,
    adults = 1,
}) => {
    try {
        const { data } = await amadeus.shopping.hotelOffersSearch.get({
            cityCode,
            checkInDate,
            checkOutDate,
            adults,
        });
        return data;
    } catch (error) {
        if (error.response) {
            throw new Error(
                error.response.data?.errors?.[0]?.detail || 'Hotel search failed'
            );
        }
        throw error;
    }
};
